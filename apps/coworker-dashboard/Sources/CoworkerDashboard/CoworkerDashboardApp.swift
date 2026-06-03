import SwiftUI

// @cite apps/agent-orchestrator/Sources/AgentOrchestrator/AgentOrchestratorApp.swift

@main
struct CoworkerDashboardApp: App {
    @State private var store = Store()

    var body: some Scene {
        WindowGroup("Coworker Dashboard — knowledge-engineering") {
            CoworkerListView()
                .environment(store)
        }
        .defaultSize(width: 1100, height: 720)
    }
}
