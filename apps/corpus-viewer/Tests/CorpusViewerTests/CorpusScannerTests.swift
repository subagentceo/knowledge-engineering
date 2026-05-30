import XCTest
@testable import CorpusViewer

final class CorpusScannerTests: XCTestCase {

    private var liveRootURL: URL { CorpusDefaults.liveRoot }

    private var liveRootAvailable: Bool {
        var isDir: ObjCBool = false
        return FileManager.default.fileExists(atPath: liveRootURL.path, isDirectory: &isDir) && isDir.boolValue
    }

    func testLiveCorpusVendorsPopulated() throws {
        try XCTSkipUnless(liveRootAvailable, "live corpus root not present: \(liveRootURL.path)")
        let scanner = try CorpusScanner(root: liveRootURL)
        let vendors = try scanner.listVendors()
        XCTAssertGreaterThanOrEqual(vendors.count, 20, "expected ≥20 vendor dirs with markdown; got \(vendors.count)")
        for v in vendors {
            XCTAssertGreaterThan(v.markdownCount, 0, "vendor \(v.name) has zero markdown files")
        }
    }

    func testChildEntriesFiltersToMdAndDirs() throws {
        try XCTSkipUnless(liveRootAvailable, "live corpus root not present")
        let scanner = try CorpusScanner(root: liveRootURL)
        let vendors = try scanner.listVendors()
        let target = try XCTUnwrap(vendors.first(where: { $0.name == "anthropics" }) ?? vendors.first)
        let children = try scanner.childEntries(of: target.root)
        XCTAssertFalse(children.isEmpty)
        for entry in children {
            if !entry.isDirectory {
                XCTAssertEqual(entry.url.pathExtension.lowercased(), "md",
                               "non-directory entry surfaced with non-md extension: \(entry.url.lastPathComponent)")
            }
        }
    }

    func testEscapeOutsideRootThrows() throws {
        try XCTSkipUnless(liveRootAvailable, "live corpus root not present")
        let scanner = try CorpusScanner(root: liveRootURL)
        let outside = URL(fileURLWithPath: "/etc/hosts")
        XCTAssertThrowsError(try scanner.readMarkdown(at: outside)) { error in
            guard case CorpusScannerError.escapesRoot = error else {
                return XCTFail("expected escapesRoot, got \(error)")
            }
        }
    }

    func testReadsArbitraryMarkdown() throws {
        try XCTSkipUnless(liveRootAvailable, "live corpus root not present")
        let scanner = try CorpusScanner(root: liveRootURL)
        let vendors = try scanner.listVendors()
        guard let pick = vendors.first else { return XCTFail("no vendors") }
        let md = try findOneMarkdown(under: pick.root)
        let text = try scanner.readMarkdown(at: md)
        XCTAssertFalse(text.isEmpty, "markdown file \(md.path) read empty")
    }

    func testRelativePathStrippingIsCorrect() throws {
        try XCTSkipUnless(liveRootAvailable, "live corpus root not present")
        let scanner = try CorpusScanner(root: liveRootURL)
        let nested = liveRootURL.appendingPathComponent("anthropics/urls.md")
        let rel = scanner.relativePath(of: nested)
        XCTAssertEqual(rel, "anthropics/urls.md")
    }

    private func findOneMarkdown(under dir: URL) throws -> URL {
        let fm = FileManager.default
        guard let enumerator = fm.enumerator(at: dir, includingPropertiesForKeys: nil, options: [.skipsHiddenFiles]) else {
            throw NSError(domain: "test", code: 1)
        }
        for case let url as URL in enumerator {
            if url.pathExtension.lowercased() == "md" { return url }
        }
        throw NSError(domain: "test", code: 2)
    }
}
