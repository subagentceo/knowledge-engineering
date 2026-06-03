import SwiftUI
import MarkdownUI

// @cite subagentceo/swift-markdown-ui/Sources/MarkdownUI/Views/  (MarkdownUI.Markdown)
// @cite docs/prompts/coworker-dev-chain.md  (session status colors)

// MARK: - CoworkerListView

struct CoworkerListView: View {
    @Environment(Store.self) private var store
    @State private var selectedSessionId: String?

    var body: some View {
        NavigationSplitView {
            List(store.sessions, selection: $selectedSessionId) { session in
                SessionRowView(session: session)
                    .tag(session.id)
            }
            .navigationTitle("Coworkers")
            .toolbar {
                ToolbarItem {
                    Button("Refresh") { Task { await store.loadSessions() } }
                }
            }
        } detail: {
            if let id = selectedSessionId,
               let session = store.sessions.first(where: { $0.id == id }) {
                SessionProgressView(session: session)
            } else {
                ContentUnavailableView("Select a session", systemImage: "person.2")
            }
        }
        .task {
            await store.loadSessions()
            await store.loadConnectorVotes()
        }
    }
}

// MARK: - SessionRowView

struct SessionRowView: View {
    let session: CoworkerSession

    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(statusColor(session.status))
                .frame(width: 8, height: 8)
                .overlay {
                    if session.status == .running {
                        Circle()
                            .stroke(statusColor(session.status).opacity(0.4), lineWidth: 2)
                            .scaleEffect(1.6)
                    }
                }
            VStack(alignment: .leading, spacing: 2) {
                Text(session.title ?? session.agentName)
                    .font(.body)
                    .lineLimit(1)
                Text(session.id)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Text(session.status.label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 2)
    }
}

// MARK: - SessionProgressView

struct SessionProgressView: View {
    @Environment(Store.self) private var store
    let session: CoworkerSession

    var body: some View {
        HSplitView {
            eventFeed
                .frame(minWidth: 400)
            ConnectorStatusView()
                .frame(width: 260)
            CostMetricsView()
                .frame(width: 220)
        }
        .navigationTitle(session.title ?? session.agentName)
        .task(id: session.id) {
            for try await event in store.streamEvents(sessionId: session.id) {
                store.appendEvent(event, to: session.id)
            }
        }
    }

    private var eventFeed: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 0) {
                    ForEach(session.events) { event in
                        EventRowView(event: event)
                            .id(event.id)
                    }
                }
                .padding(.horizontal, 12)
            }
            .onChange(of: session.events.count) { _, _ in
                if let last = session.events.last {
                    proxy.scrollTo(last.id, anchor: .bottom)
                }
            }
        }
    }
}

// MARK: - EventRowView

struct EventRowView: View {
    let event: SessionEvent

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 6) {
                eventIcon
                Text(event.type.rawValue)
                    .font(.caption.monospaced())
                    .foregroundStyle(eventColor)
                Spacer()
                if let ts = event.timestamp {
                    Text(ts.suffix(8))  // HH:MM:SS
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
            }
            if event.type == .agentMessage || event.type == .agentThinking || event.type == .userMessage {
                // Render agent/user content as GFM markdown via swift-markdown-ui (cmark-gfm)
                Markdown(event.markdownBody)
                    .markdownTheme(.gitHub)
                    .padding(.leading, 18)
                    .padding(.bottom, 4)
            }
        }
        .padding(.vertical, 6)
        .overlay(alignment: .bottom) {
            Divider()
        }
    }

    private var eventIcon: some View {
        Image(systemName: iconName(event.type))
            .font(.caption)
            .foregroundStyle(eventColor)
            .frame(width: 14)
    }

    private var eventColor: Color {
        switch event.type {
        case .userMessage:      return .blue
        case .agentMessage:     return .primary
        case .agentThinking:    return .purple
        case .agentToolUse:     return .orange
        case .agentToolResult:  return .green
        case .sessionStart:     return .teal
        case .sessionStop:      return .red
        case .sessionStatus:    return .yellow
        case .spanStart, .spanStop: return .secondary
        case .unknown:          return .secondary
        }
    }

    private func iconName(_ type: SessionEventType) -> String {
        switch type {
        case .userMessage:      return "person.fill"
        case .agentMessage:     return "bubble.left.fill"
        case .agentThinking:    return "brain"
        case .agentToolUse:     return "wrench.fill"
        case .agentToolResult:  return "checkmark.circle.fill"
        case .sessionStart:     return "play.fill"
        case .sessionStop:      return "stop.fill"
        case .sessionStatus:    return "circle.dotted"
        case .spanStart, .spanStop: return "timer"
        case .unknown:          return "questionmark.circle"
        }
    }
}

// MARK: - ConnectorStatusView

struct ConnectorStatusView: View {
    @Environment(Store.self) private var store

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Connectors")
                .font(.headline)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            Divider()
            ScrollView {
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(store.connectorCategories) { category in
                        ConnectorCategoryRow(category: category)
                    }
                }
                .padding(12)
            }
            Divider()
            Button("Refresh Votes") { Task { await store.loadConnectorVotes() } }
                .font(.caption)
                .padding(8)
        }
        .background(.background.secondary)
    }
}

struct ConnectorCategoryRow: View {
    let category: ConnectorCategory

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Image(systemName: category.isApproved ? "checkmark.seal.fill" : "xmark.seal")
                    .foregroundStyle(category.isApproved ? .green : .red)
                Text(category.displayName)
                    .font(.subheadline.weight(.medium))
                Spacer()
                Text(category.consensus.label)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            ForEach(category.votes) { vote in
                HStack(spacing: 4) {
                    Circle()
                        .fill(voteColor(vote.vote))
                        .frame(width: 6, height: 6)
                    Text(vote.coworkerId)
                        .font(.caption.monospaced())
                        .lineLimit(1)
                    Spacer()
                    Text(vote.vote.rawValue)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                .padding(.leading, 18)
            }
            if category.votes.isEmpty {
                Text("no votes yet")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
                    .padding(.leading, 18)
            }
        }
        .padding(8)
        .background(.background)
        .clipShape(RoundedRectangle(cornerRadius: 6))
    }

    private func voteColor(_ vote: ConnectorVote.VoteValue) -> Color {
        switch vote {
        case .allow:   return .green
        case .deny:    return .red
        case .abstain: return .yellow
        }
    }
}

// MARK: - CostMetricsView

// Queries Prometheus HTTP API for claude_cost_usd metrics.
// Renders per-session cost breakdown. Populates from Store.costMetrics.
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (metric names)
struct CostMetricsView: View {
    @Environment(Store.self) private var store

    var totalCost: Double { store.costMetrics.reduce(0) { $0 + $1.costUsd } }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("Cost Metrics")
                    .font(.headline)
                Spacer()
                Text(String(format: "$%.4f total", totalCost))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            Divider()
            if store.costMetrics.isEmpty {
                Text("No cost data — is the OTel stack running?")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
                    .padding(12)
            } else {
                ScrollView {
                    VStack(alignment: .leading, spacing: 4) {
                        ForEach(store.costMetrics) { metric in
                            CostMetricRow(metric: metric)
                        }
                    }
                    .padding(12)
                }
            }
            Divider()
            Button("Refresh") { Task { await store.loadCostMetrics() } }
                .font(.caption)
                .padding(8)
        }
        .background(.background.secondary)
        .task { await store.loadCostMetrics() }
    }
}

struct CostMetricRow: View {
    let metric: CostMetric

    var body: some View {
        HStack(spacing: 6) {
            VStack(alignment: .leading, spacing: 2) {
                Text(metric.sessionId)
                    .font(.caption.monospaced())
                    .lineLimit(1)
                Text(metric.model)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Text(String(format: "$%.4f", metric.costUsd))
                .font(.caption.monospaced())
                .foregroundStyle(metric.costUsd > 0.10 ? .red : .primary)
        }
        .padding(6)
        .background(.background)
        .clipShape(RoundedRectangle(cornerRadius: 4))
    }
}

// MARK: - Helpers

func statusColor(_ status: SessionStatus) -> Color {
    switch status {
    case .idle:         return .gray
    case .running:      return .blue
    case .rescheduling: return .yellow
    case .terminated:   return .red
    }
}
