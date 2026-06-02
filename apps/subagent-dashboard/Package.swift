// swift-tools-version: 5.9
import PackageDescription

// SubagentDashboard: SwiftUI macOS app for inspecting managed-agents resources
// (agents, sessions, environments, credential vaults, memory stores, memories).
// Mirrors the managed-agents API schema from docs/managed-agents-models.ts.
//
// @cite docs/managed-agents-models.ts
// @cite apps/coworker-dashboard/Package.swift  (structural reference)
let package = Package(
    name: "SubagentDashboard",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "SubagentDashboard", targets: ["SubagentDashboard"]),
    ],
    dependencies: [],
    targets: [
        .executableTarget(
            name: "SubagentDashboard",
            dependencies: [],
            path: "Sources/SubagentDashboard"
        ),
        .testTarget(
            name: "SubagentDashboardTests",
            dependencies: ["SubagentDashboard"],
            path: "Tests/SubagentDashboardTests"
        ),
    ]
)
