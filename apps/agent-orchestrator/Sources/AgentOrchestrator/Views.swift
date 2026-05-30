import SwiftUI

struct ContentView: View {
    @StateObject private var store = OrchestratorStore()

    var body: some View {
        NavigationSplitView {
            TaskBoard(store: store)
                .navigationSplitViewColumnWidth(min: 340, ideal: 420)
        } detail: {
            AgentColumn(store: store)
        }
        .onAppear { store.start() }
        .frame(minWidth: 900, minHeight: 560)
    }
}

// ── Left: the Jira-bridged task DAG ────────────────────────────────────────
struct TaskBoard: View {
    @ObservedObject var store: OrchestratorStore

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(store.view.team.name).font(.headline)
                Spacer()
                let c = store.taskCounts
                Text("\(c.todo) to do · \(c.inProgress) active · \(c.done) done")
                    .font(.caption).foregroundStyle(.secondary)
            }
            .padding(12)
            Divider()
            List(store.view.tasks) { task in
                TaskRow(task: task)
            }
            .listStyle(.inset)
        }
    }
}

struct TaskRow: View {
    let task: TeamTask

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Circle().fill(stateColor).frame(width: 9, height: 9).padding(.top, 5)
            VStack(alignment: .leading, spacing: 3) {
                Text(task.subject).font(.body)
                HStack(spacing: 6) {
                    if let k = task.jiraKey {
                        Text(k).font(.caption2.monospaced())
                            .padding(.horizontal, 5).padding(.vertical, 1)
                            .background(Color.accentColor.opacity(0.15))
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                    }
                    Text(task.state.label).font(.caption2).foregroundStyle(.secondary)
                    if let o = task.owner {
                        Text("@\(o)").font(.caption2).foregroundStyle(.secondary)
                    }
                    if !task.dependsOn.isEmpty {
                        Text("⬑ \(task.dependsOn.joined(separator: ", "))")
                            .font(.caption2).foregroundStyle(.tertiary)
                    }
                }
            }
            Spacer()
        }
        .padding(.vertical, 3)
    }

    private var stateColor: Color {
        switch task.state {
        case .pending: return .gray
        case .inProgress: return .yellow
        case .completed: return .green
        }
    }
}

// ── Right: live agent-view sessions, grouped by state ───────────────────────
struct AgentColumn: View {
    @ObservedObject var store: OrchestratorStore

    private let order: [SessionState] = [.needsInput, .working, .idle, .completed, .failed, .stopped]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("Agents").font(.headline)
                Spacer()
                Text("\(store.view.sessions.count) sessions")
                    .font(.caption).foregroundStyle(.secondary)
            }
            .padding(12)
            Divider()
            if let err = store.lastError {
                Spacer()
                Text(err).font(.callout).foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity).padding()
                Spacer()
            } else if store.view.sessions.isEmpty {
                Spacer()
                Text("No agents dispatched yet.\nStart a team with CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1.")
                    .multilineTextAlignment(.center)
                    .font(.callout).foregroundStyle(.secondary)
                Spacer()
            } else {
                List {
                    ForEach(order, id: \.self) { state in
                        let rows = store.sessions(in: state)
                        if !rows.isEmpty {
                            Section(state.label) {
                                ForEach(rows) { SessionRow(session: $0) }
                            }
                        }
                    }
                    if !store.view.workflows.isEmpty {
                        Section("Workflows") {
                            ForEach(store.view.workflows) { WorkflowRow(run: $0) }
                        }
                    }
                }
                .listStyle(.inset)
            }
        }
    }
}

struct SessionRow: View {
    let session: AgentSession

    var body: some View {
        HStack(spacing: 10) {
            Text(icon).foregroundStyle(stateColor)
            VStack(alignment: .leading, spacing: 2) {
                Text(session.name).font(.body)
                if let s = session.summary {
                    Text(s).font(.caption).foregroundStyle(.secondary).lineLimit(1)
                }
            }
            Spacer()
            if let pr = session.prNumber {
                Text("PR #\(pr)").font(.caption2.monospaced()).foregroundStyle(prColor)
            }
        }
        .padding(.vertical, 2)
    }

    private var icon: String {
        switch session.shape {
        case "exited": return "∙"
        case "loop_sleeping": return "✢"
        default: return "✻"
        }
    }
    private var stateColor: Color {
        switch session.state {
        case .working: return .blue
        case .needsInput: return .yellow
        case .completed: return .green
        case .failed: return .red
        case .stopped, .idle: return .gray
        }
    }
    private var prColor: Color {
        switch session.prStatus {
        case "green": return .green
        case "purple": return .purple
        case "yellow": return .yellow
        default: return .gray
        }
    }
}

struct WorkflowRow: View {
    let run: WorkflowRun
    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(run.meta.name).font(.body)
            Text(run.phases.map(\.title).joined(separator: " → "))
                .font(.caption).foregroundStyle(.secondary).lineLimit(1)
        }
        .padding(.vertical, 2)
    }
}
