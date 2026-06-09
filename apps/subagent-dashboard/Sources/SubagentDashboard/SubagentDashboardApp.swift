import SwiftUI

// pattern precedent: apps/coworker-dashboard app entry (retired; see git history)
// @cite src/mcp/lanes/telemetry.ts  (tools consumed by MCPClient)

@main
struct SubagentDashboardApp: App {
    @State private var client = MCPClient()

    var body: some Scene {
        WindowGroup("Subagent Dashboard — knowledge-engineering") {
            ContentView()
                .environment(client)
                .task { await client.refresh() }
        }
        .defaultSize(width: 1200, height: 800)
    }
}

// MARK: - Root layout

struct ContentView: View {
    @Environment(MCPClient.self) var client

    var body: some View {
        HSplitView {
            SessionListView()
                .frame(minWidth: 320)
            CachePanel()
                .frame(width: 260)
        }
        .toolbar {
            ToolbarItem {
                Button("Refresh") { Task { await client.refresh() } }
                    .disabled(client.isLoading)
            }
        }
        .overlay(alignment: .top) {
            if let err = client.lastError {
                Text("⚠ \(err)").foregroundStyle(.red).padding(6)
                    .background(.ultraThinMaterial).cornerRadius(6)
            }
        }
    }
}

// MARK: - Session list

struct SessionListView: View {
    @Environment(MCPClient.self) var client

    var body: some View {
        List(client.sessions) { s in
            SessionRow(session: s)
        }
        .listStyle(.inset)
        .navigationTitle("Sessions (\(client.sessions.count))")
    }
}

struct SessionRow: View {
    let session: MCPSessionRecord

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            HStack {
                Text(session.session_id.prefix(18)).font(.system(.caption, design: .monospaced))
                Spacer()
                Text("$\(session.cost_usd, specifier: "%.4f")").bold()
            }
            HStack {
                Text(session.model).foregroundStyle(.secondary).font(.caption)
                if let b = session.branch { Text("· \(b)").foregroundStyle(.secondary).font(.caption) }
                Spacer()
                if let eff = session.cache_efficiency {
                    Text("hit \(eff.cache_hit_rate, specifier: "%.1f")%").font(.caption2)
                        .foregroundStyle(eff.cache_hit_rate > 50 ? .green : .secondary)
                }
            }
        }
        .padding(.vertical, 2)
    }
}

// MARK: - Cache aggregate panel

struct CachePanel: View {
    @Environment(MCPClient.self) var client

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Cache Efficiency").font(.headline)
            if let agg = client.cacheAggregate {
                stat("Sessions", "\(agg.session_count)")
                stat("Hit rate", "\(agg.cache_hit_rate, specifier: "%.1f")%")
                stat("Cache reads", "\(agg.cache_read_tokens.formatted())")
                stat("Cache writes", "\(agg.cache_creation_tokens.formatted())")
                stat("Est. savings", "$\(agg.estimated_savings_usd, specifier: "%.4f")")
                stat("Total cost", "$\(agg.total_cost_usd, specifier: "%.4f")")
            } else {
                Text("No data").foregroundStyle(.secondary)
            }
            Spacer()
        }
        .padding()
    }

    @ViewBuilder
    private func stat(_ label: String, _ value: String) -> some View {
        HStack {
            Text(label).foregroundStyle(.secondary)
            Spacer()
            Text(value).bold()
        }
        .font(.caption)
    }
}
