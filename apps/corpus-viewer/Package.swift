// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "CorpusViewer",
    defaultLocalization: "en",
    platforms: [
        .macOS(.v14)
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
            path: "Sources/CorpusViewer"
        ),
        .testTarget(
            name: "CorpusViewerTests",
            dependencies: ["CorpusViewer"],
            path: "Tests/CorpusViewerTests"
        )
    ]
)
