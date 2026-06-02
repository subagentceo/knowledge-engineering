#if canImport(SwiftUI)
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
#else
import Foundation
// Linux entry point — no SwiftUI; type-check only
@main struct AgentOrchestratorApp {
    static func main() {
        print("AgentOrchestrator: SwiftUI not available on Linux — model layer compiled OK")
    }
}
#endif
