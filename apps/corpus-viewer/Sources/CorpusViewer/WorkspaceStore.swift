import Foundation

@MainActor
final class WorkspaceStore: ObservableObject {
    @Published var vendors: [VendorDir] = []
    @Published var selectedVendor: VendorDir?
    @Published var selectedFile: CorpusEntry?
    @Published var currentMarkdown: String = ""
    @Published var status: String = "(idle)"
    @Published var rootPath: String = CorpusDefaults.liveRoot.path

    private var scanner: CorpusScanner?

    func bootstrap() {
        // Resolve the corpus root per platform: .live(host vendor/) on macOS
        // when present, .bundled (app bundle BundledData/) on iOS + CI. This
        // replaces the hardcoded liveRoot that the iOS sandbox can't read.
        let source = CorpusSource.resolve()
        guard let root = source.rootURL() else {
            // .bundled with no BundledData/ packaged → empty list, not a crash.
            status = "no corpus root (bundled data not packaged)"
            return
        }
        rootPath = root.path
        do {
            let s = try CorpusScanner(root: root)
            scanner = s
            vendors = try s.listVendors()
            let kind = { if case .live = source { return "live" } else { return "bundled" } }()
            status = "\(kind) · \(vendors.count) vendors · \(vendors.reduce(0) { $0 + $1.markdownCount }) markdown files"
            if let first = vendors.first { selectedVendor = first }
        } catch {
            status = "ERR: \(error)"
        }
    }

    func children(of dir: URL) -> [CorpusEntry] {
        (try? scanner?.childEntries(of: dir)) ?? []
    }

    func selectFile(_ entry: CorpusEntry) {
        selectedFile = entry
        guard !entry.isDirectory else { currentMarkdown = ""; return }
        do {
            currentMarkdown = try scanner?.readMarkdown(at: entry.url) ?? ""
        } catch {
            currentMarkdown = "# Error\n\n\(error)"
        }
    }
}
