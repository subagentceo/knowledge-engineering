// swift-tools-version: 6.2
import PackageDescription

// OrchestratorIntelligence — Claude-backed summarization of the agent-team
// OrchestratorView through Apple's FoundationModels framework.
//
// Split into two targets so the pure logic is PORTABLE and builds/tests on Linux
// (swift.org/install/linux), while only the Apple-framework bridge is gated:
//
//   OrchestratorCore         — Foundation-only. Builds on Linux, macOS, Windows.
//   OrchestratorIntelligence — FoundationModels bridge (macOS 27). Apple-only;
//                              the source self-gates with #if canImport(FoundationModels)
//                              so it still COMPILES on Linux (as an empty shim),
//                              and the ClaudeForFoundationModels dependency is
//                              only pulled in on Apple platforms.
//
// @cite https://github.com/anthropics/ClaudeForFoundationModels
// @cite https://www.swift.org/install/linux/
let package = Package(
  name: "OrchestratorIntelligence",
  platforms: [.macOS("27.0")],
  products: [
    .library(name: "OrchestratorCore", targets: ["OrchestratorCore"]),
    .library(name: "OrchestratorIntelligence", targets: ["OrchestratorIntelligence"]),
  ],
  dependencies: [
    // Pulled in on Apple platforms; on Linux the bridge source compiles to an
    // empty shim and this product is simply unused.
    .package(url: "https://github.com/anthropics/ClaudeForFoundationModels.git", from: "0.1.0"),
  ],
  targets: [
    // Portable: no Apple frameworks. This is what the Linux harness builds + tests.
    .target(name: "OrchestratorCore"),

    .target(
      name: "OrchestratorIntelligence",
      dependencies: [
        "OrchestratorCore",
        // Apple-only: the product links on macOS, where FoundationModels exists.
        // On Linux the bridge compiles to its #else shim and this is never linked,
        // so a Linux `swift build` of OrchestratorCore + the shim succeeds.
        .product(
          name: "ClaudeForFoundationModels",
          package: "ClaudeForFoundationModels",
          condition: .when(platforms: [.macOS])
        ),
      ]
    ),
    .executableTarget(
      name: "OrchestratorSummary",
      dependencies: ["OrchestratorIntelligence", "OrchestratorCore"],
      path: "Sources/OrchestratorSummary"
    ),

    // Runs on Linux: pure prompt-builder assertions, no network, no FoundationModels.
    .testTarget(
      name: "OrchestratorCoreTests",
      dependencies: ["OrchestratorCore"]
    ),
  ]
)
