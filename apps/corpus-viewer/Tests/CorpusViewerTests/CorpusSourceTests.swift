import XCTest
@testable import CorpusViewer

// P1.1 (SCRUM-15): cross-platform CorpusSource resolution — the iOS blocker
// fix. No hardcoded host path drives resolution anymore.
final class CorpusSourceTests: XCTestCase {

    /// A missing live root resolves to .bundled on every platform.
    func testResolvesBundledWhenLiveRootMissing() {
        let missing = URL(fileURLWithPath: "/nonexistent/\(UUID().uuidString)")
        XCTAssertEqual(CorpusSource.resolve(liveRoot: missing), .bundled)
    }

    /// macOS with a present live root resolves to .live(thatRoot); iOS never
    /// reads host paths, so it stays .bundled.
    func testResolvesLiveWhenRootExistsOnMacOS() throws {
        let root = try makeTempDir()
        defer { try? FileManager.default.removeItem(at: root) }
        let resolved = CorpusSource.resolve(liveRoot: root)
        #if os(macOS)
        XCTAssertEqual(resolved, .live(root))
        #else
        XCTAssertEqual(resolved, .bundled)
        #endif
    }

    /// A bundled-path scanner over a temp corpus scans like any other root —
    /// proving the bundled branch shares the scanner unchanged, so coverage
    /// survives a no-live-root CI run.
    func testBundledRootScansLikeLiveRoot() throws {
        let root = try makeTempDir()
        defer { try? FileManager.default.removeItem(at: root) }
        let docker = root.appendingPathComponent("docker")
        let xcode = root.appendingPathComponent("xcode")
        try FileManager.default.createDirectory(at: docker, withIntermediateDirectories: true)
        try FileManager.default.createDirectory(at: xcode, withIntermediateDirectories: true)
        try "# d".write(to: docker.appendingPathComponent("a.md"), atomically: true, encoding: .utf8)
        try "# x".write(to: xcode.appendingPathComponent("b.md"), atomically: true, encoding: .utf8)

        let url = try XCTUnwrap(CorpusSource.live(root).rootURL())
        let scanner = try CorpusScanner(root: url)
        XCTAssertEqual(try scanner.listVendors().map(\.name), ["docker", "xcode"])
    }

    private func makeTempDir() throws -> URL {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent("cv-\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir
    }
}
