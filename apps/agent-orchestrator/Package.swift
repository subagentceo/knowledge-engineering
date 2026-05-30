// swift-tools-version: 5.9
import PackageDescription

// Agent-orchestrator: SwiftUI surface that visualizes the knowledge-engineering
// agent team, its Jira-bridged task DAG, and live agent-view sessions. Decodes
// the OrchestratorView JSON emitted by src/agent/team/emit-view.ts (the same
// shape defined in subagent-schema.ts / team_models.py).
let package = Package(
    name: "AgentOrchestrator",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "AgentOrchestrator", targets: ["AgentOrchestrator"]),
    ],
    targets: [
        .executableTarget(
            name: "AgentOrchestrator",
            path: "Sources/AgentOrchestrator"
        ),
        .testTarget(
            name: "AgentOrchestratorTests",
            dependencies: ["AgentOrchestrator"],
            path: "Tests/AgentOrchestratorTests"
        ),
    ]
)
