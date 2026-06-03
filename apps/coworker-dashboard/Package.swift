// swift-tools-version: 5.9
import PackageDescription

// CoworkerDashboard: SwiftUI macOS app that visualises managed-coworker sessions
// in real time. Reads the self-hosted coworker SSE event stream and Cloudflare KV
// consensus votes. Renders agent message content as GFM markdown via MarkdownUI.
//
// @cite docs/prompts/coworker-dev-chain.md
// @cite apps/agent-orchestrator/Package.swift  (structural reference)
let package = Package(
    name: "CoworkerDashboard",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "CoworkerDashboard", targets: ["CoworkerDashboard"]),
    ],
    dependencies: [
        // Local path — subagentceo/swift-markdown-ui (cmark-gfm backed GFM renderer)
        .package(path: "../../../../swift-markdown-ui"),
    ],
    targets: [
        .executableTarget(
            name: "CoworkerDashboard",
            dependencies: [
                .product(name: "MarkdownUI", package: "swift-markdown-ui"),
            ],
            path: "Sources/CoworkerDashboard"
        ),
        .testTarget(
            name: "CoworkerDashboardTests",
            dependencies: ["CoworkerDashboard"],
            path: "Tests/CoworkerDashboardTests"
        ),
    ]
)
