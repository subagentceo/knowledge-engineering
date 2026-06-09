// swift-tools-version: 5.9
import PackageDescription

// SubagentDashboard: SwiftUI macOS app for inspecting managed-agents resources
// (agents, sessions, environments, credential vaults, memory stores, memories).
// Mirrors the managed-agents API schema from docs/managed-agents-models.ts.
//
// @cite docs/managed-agents-models.ts
// pattern precedent: apps/coworker-dashboard (retired; see git history)
let package = Package(
    name: "SubagentDashboard",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "SubagentDashboard", targets: ["SubagentDashboard"]),
    ],
    dependencies: [
        // Local path — subagentceo/swift-markdown-ui (cmark-gfm backed GFM renderer)
        .package(path: "../../../../swift-markdown-ui"),
    ],
    targets: [
        .executableTarget(
            name: "SubagentDashboard",
            dependencies: [
                .product(name: "MarkdownUI", package: "swift-markdown-ui"),
            ],
            path: "Sources/SubagentDashboard"
        ),
        .testTarget(
            name: "SubagentDashboardTests",
            dependencies: ["SubagentDashboard"],
            path: "Tests/SubagentDashboardTests"
        ),
    ]
)
