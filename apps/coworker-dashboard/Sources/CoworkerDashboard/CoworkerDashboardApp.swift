#if canImport(SwiftUI)
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
#else
import Foundation
@main struct CoworkerDashboardApp {
    static func main() { print("CoworkerDashboard: SwiftUI not available on Linux — model layer compiled OK") }
}
#endif
