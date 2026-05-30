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
        do {
            let s = try CorpusScanner(root: CorpusDefaults.liveRoot)
            scanner = s
            vendors = try s.listVendors()
            status = "live · \(vendors.count) vendors · \(vendors.reduce(0) { $0 + $1.markdownCount }) markdown files"
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
