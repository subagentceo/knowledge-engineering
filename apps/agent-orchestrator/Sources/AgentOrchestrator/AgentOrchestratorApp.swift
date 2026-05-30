import SwiftUI

// Entry point. File is intentionally NOT named main.swift — a file by that name
// puts the target in top-level-code mode, which conflicts with @main.
@main
struct AgentOrchestratorApp: App {
    var body: some Scene {
        WindowGroup("Agent Orchestrator — knowledge-engineering") {
            ContentView()
        }
    }
}
