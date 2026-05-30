import Foundation

public enum CorpusScannerError: Error {
    case rootNotFound(String)
    case escapesRoot(String)
}

public struct VendorDir: Identifiable, Hashable {
    public let name: String
    public let root: URL
    public let markdownCount: Int
    public var id: String { name }
}

public struct CorpusEntry: Identifiable, Hashable {
    public let url: URL
    public let relPath: String
    public let isDirectory: Bool
    public var name: String { url.lastPathComponent }
    public var id: String { relPath }
}

public struct CorpusScanner {
    public let root: URL

    public init(root: URL) throws {
        var isDir: ObjCBool = false
        guard FileManager.default.fileExists(atPath: root.path, isDirectory: &isDir), isDir.boolValue else {
            throw CorpusScannerError.rootNotFound(root.path)
        }
        self.root = root.standardizedFileURL
    }

    public func listVendors() throws -> [VendorDir] {
        let fm = FileManager.default
        let entries = try fm.contentsOfDirectory(at: root, includingPropertiesForKeys: [.isDirectoryKey], options: [.skipsHiddenFiles])
        return entries.compactMap { url -> VendorDir? in
            guard (try? url.resourceValues(forKeys: [.isDirectoryKey]))?.isDirectory == true else { return nil }
            let count = markdownCount(under: url)
            return count > 0 ? VendorDir(name: url.lastPathComponent, root: url, markdownCount: count) : nil
        }.sorted { $0.name < $1.name }
    }

    public func childEntries(of dir: URL) throws -> [CorpusEntry] {
        try resolvedWithinRoot(dir)
        let fm = FileManager.default
        let entries = try fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: [.isDirectoryKey], options: [.skipsHiddenFiles])
        return entries.compactMap { url -> CorpusEntry? in
            let isDir = (try? url.resourceValues(forKeys: [.isDirectoryKey]))?.isDirectory ?? false
            if !isDir && url.pathExtension.lowercased() != "md" { return nil }
            return CorpusEntry(url: url, relPath: relativePath(of: url), isDirectory: isDir)
        }.sorted { a, b in
            if a.isDirectory != b.isDirectory { return a.isDirectory && !b.isDirectory }
            return a.name < b.name
        }
    }

    public func readMarkdown(at url: URL) throws -> String {
        try resolvedWithinRoot(url)
        return try String(contentsOf: url, encoding: .utf8)
    }

    public func relativePath(of url: URL) -> String {
        let rootPath = root.path
        let p = url.standardizedFileURL.path
        if p.hasPrefix(rootPath + "/") { return String(p.dropFirst(rootPath.count + 1)) }
        if p == rootPath { return "" }
        return p
    }

    private func resolvedWithinRoot(_ url: URL) throws {
        let std = url.standardizedFileURL.path
        let rootPath = root.path
        guard std == rootPath || std.hasPrefix(rootPath + "/") else {
            throw CorpusScannerError.escapesRoot(std)
        }
    }

    private func markdownCount(under dir: URL) -> Int {
        guard let enumerator = FileManager.default.enumerator(at: dir,
                                                              includingPropertiesForKeys: nil,
                                                              options: [.skipsHiddenFiles]) else { return 0 }
        var count = 0
        for case let url as URL in enumerator {
            if url.pathExtension.lowercased() == "md" { count += 1 }
        }
        return count
    }
}

public enum CorpusDefaults {
    public static let liveRoot = URL(fileURLWithPath: "/Users/alexzh/subagentmcp/subagentceo/knowledge-engineering/vendor")
}
