import Foundation

// Cross-platform corpus-root resolution (SCRUM-15, plan Phase 1.1).
//
// The iOS sandbox cannot read host paths, so the hardcoded absolute
// CorpusDefaults.liveRoot is the central blocker to running on a device.
// CorpusSource resolves the root two ways without that path driving the
// decision: .live(URL) on macOS when the host vendor/ tree exists (today's
// behavior, unchanged), else .bundled — the curated docker+xcode corpus
// copied into the app bundle under BundledData/ by sync-bundled-corpus.sh.
//
// CorpusScanner stays root-agnostic; only resolution lives here.

public extension CorpusDefaults {
    /// Subdirectory inside the app bundle holding the curated *.md corpus.
    static let bundledSubdir = "BundledData"
}

public enum CorpusSource: Equatable {
    case live(URL)
    case bundled

    /// Pick the source for the current platform + filesystem state.
    /// macOS with the host tree present → .live; everything else → .bundled.
    public static func resolve(liveRoot: URL = CorpusDefaults.liveRoot) -> CorpusSource {
        #if os(macOS)
        var isDir: ObjCBool = false
        if FileManager.default.fileExists(atPath: liveRoot.path, isDirectory: &isDir), isDir.boolValue {
            return .live(liveRoot)
        }
        #endif
        return .bundled
    }

    /// The concrete corpus-root URL, resolving the bundle for .bundled.
    /// Returns nil only if .bundled and no BundledData/ is packaged — callers
    /// degrade to an empty vendor list rather than crashing.
    /// `bundle` defaults to nil so the public signature avoids referencing the
    /// internal `Bundle.module`; nil falls back to the package resource bundle.
    public func rootURL(bundle: Bundle? = nil) -> URL? {
        switch self {
        case .live(let url):
            return url
        case .bundled:
            let resourceBundle = bundle ?? .module
            return resourceBundle.url(forResource: CorpusDefaults.bundledSubdir, withExtension: nil)
                ?? Bundle.main.url(forResource: CorpusDefaults.bundledSubdir, withExtension: nil)
        }
    }
}
