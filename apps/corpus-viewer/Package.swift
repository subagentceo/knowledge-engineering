// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "CorpusViewer",
    defaultLocalization: "en",
    platforms: [
        .macOS(.v14),
        .iOS(.v17)
    ],
    products: [
        .executable(name: "CorpusViewer", targets: ["CorpusViewer"])
    ],
    dependencies: [
        .package(path: "../../../swift-markdown-ui")
    ],
    targets: [
        .executableTarget(
            name: "CorpusViewer",
            dependencies: [
                .product(name: "MarkdownUI", package: "swift-markdown-ui")
            ],
            path: "Sources/CorpusViewer",
            // The curated docker+xcode *.md corpus, populated by
            // scripts/sync-bundled-corpus.sh. A .gitkeep keeps the dir present
            // so `swift build` works before the sync runs (BundledData/ itself
            // is gitignored — never commit the ~16MB mirror).
            resources: [.copy("BundledData")]
        ),
        .testTarget(
            name: "CorpusViewerTests",
            dependencies: ["CorpusViewer"],
            path: "Tests/CorpusViewerTests"
        )
    ]
)
