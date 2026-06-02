import SwiftUI

// @cite apps/coworker-dashboard/Sources/CoworkerDashboard/CoworkerDashboardApp.swift

@main
struct SubagentDashboardApp: App {
    var body: some Scene {
        WindowGroup("Subagent Dashboard — knowledge-engineering") {
            Text("Subagent Dashboard")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .defaultSize(width: 1200, height: 800)
    }
}
