import Foundation
import Observation

// @cite apps/agent-orchestrator/Sources/AgentOrchestrator/Store.swift  (pattern)
// @cite docs/prompts/coworker-dev-chain.md  (SSE + CF KV contract)

@Observable
final class Store {
    var sessions: [CoworkerSession] = []
    var connectorCategories: [ConnectorCategory] = staticCategories
    var error: String?

    // Configuration — injected from environment or set via preferences UI
    var baseURL: String = ProcessInfo.processInfo.environment["COWORKER_BASE_URL"]
        ?? "http://localhost:8080"
    var cfKVBaseURL: String = ProcessInfo.processInfo.environment["CF_KV_BASE_URL"]
        ?? "https://api.cloudflare.com/client/v4"
    var cfKVNamespaceId: String = ProcessInfo.processInfo.environment["CF_KV_NS_ID"] ?? ""
    var oauthToken: String = ProcessInfo.processInfo.environment["COWORKER_OAUTH_TOKEN"] ?? ""

    // MARK: - Session list

    func loadSessions() async {
        guard let url = URL(string: "\(baseURL)/v1/sessions") else { return }
        var req = URLRequest(url: url)
        req.setValue("Bearer \(oauthToken)", forHTTPHeaderField: "Authorization")
        do {
            let (data, _) = try await URLSession.shared.data(for: req)
            let decoded = try JSONDecoder().decode(PaginatedList<CoworkerSession>.self, from: data)
            sessions = decoded.data
        } catch {
            self.error = "sessions fetch failed: \(error.localizedDescription)"
        }
    }

    // MARK: - SSE event stream

    // Opens a streaming connection to the self-hosted coworker runtime SSE endpoint.
    // The runtime implements the managed-agents event stream contract (spec: ma-m).
    func streamEvents(sessionId: String) -> AsyncThrowingStream<SessionEvent, Error> {
        let urlStr = "\(baseURL)/v1/sessions/\(sessionId)/threads/primary/events/stream"
        return AsyncThrowingStream { continuation in
            Task {
                guard let url = URL(string: urlStr) else {
                    continuation.finish(throwing: URLError(.badURL))
                    return
                }
                var req = URLRequest(url: url)
                req.setValue("text/event-stream", forHTTPHeaderField: "Accept")
                req.setValue("Bearer \(self.oauthToken)", forHTTPHeaderField: "Authorization")
                do {
                    let (bytes, _) = try await URLSession.shared.bytes(for: req)
                    for try await line in bytes.lines {
                        guard line.hasPrefix("data: ") else { continue }
                        let payload = String(line.dropFirst(6))
                        guard payload != "[DONE]",
                              let data = payload.data(using: .utf8),
                              let event = try? JSONDecoder().decode(SessionEvent.self, from: data)
                        else { continue }
                        continuation.yield(event)
                    }
                    continuation.finish()
                } catch {
                    continuation.finish(throwing: error)
                }
            }
        }
    }

    func appendEvent(_ event: SessionEvent, to sessionId: String) {
        guard let idx = sessions.firstIndex(where: { $0.id == sessionId }) else { return }
        sessions[idx].events.append(event)
        if case .sessionStatus = event.type {
            // status update — re-fetch session to get current status
            Task { await loadSessions() }
        }
    }

    // MARK: - Prometheus cost metrics

    // @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
    var prometheusURL: String = ProcessInfo.processInfo.environment["PROMETHEUS_URL"]
        ?? "http://localhost:9090"
    var costMetrics: [CostMetric] = []

    func loadCostMetrics() async {
        let queries = [
            ("claude_cost_usd", "costUsd"),
            ("claude_tokens_input_total", "tokensInput"),
            ("claude_tokens_output_total", "tokensOutput"),
        ]
        // Fetch cost_usd as primary — build CostMetric per session_id label
        let urlStr = "\(prometheusURL)/api/v1/query?query=claude_cost_usd"
        guard let url = URL(string: urlStr) else { return }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let result = try JSONDecoder().decode(PrometheusQueryResult.self, from: data)
            costMetrics = result.data.result.compactMap { r in
                guard let sid = r.metric.session_id,
                      case .string(let valStr) = r.value.last,
                      let costVal = Double(valStr) else { return nil }
                return CostMetric(sessionId: sid, model: r.metric.model ?? "unknown",
                                  tokensInput: 0, tokensOutput: 0, costUsd: costVal)
            }
        } catch {
            // non-fatal: cost panel shows empty when Prometheus unreachable
        }
    }

    // MARK: - CF KV connector votes

    func loadConnectorVotes() async {
        guard !cfKVNamespaceId.isEmpty else { return }
        for i in connectorCategories.indices {
            let category = connectorCategories[i].id
            // Read all coworker votes for this category from CF KV
            // Key pattern: /connectors/{category}/{coworker_id}
            // In practice: list keys with prefix /connectors/{category}/
            let urlStr = "\(cfKVBaseURL)/accounts/e6294e3ea89f8207af387d459824aaae/storage/kv/namespaces/\(cfKVNamespaceId)/keys?prefix=connectors%2F\(category)%2F"
            guard let url = URL(string: urlStr) else { continue }
            var req = URLRequest(url: url)
            req.setValue("Bearer \(oauthToken)", forHTTPHeaderField: "Authorization")
            do {
                let (data, _) = try await URLSession.shared.data(for: req)
                let keys = try JSONDecoder().decode(CFKVKeyList.self, from: data)
                var votes: [ConnectorVote] = []
                for key in keys.result {
                    let valueURL = "\(cfKVBaseURL)/accounts/e6294e3ea89f8207af387d459824aaae/storage/kv/namespaces/\(cfKVNamespaceId)/values/\(key.name)"
                    if let vURL = URL(string: valueURL) {
                        var vReq = URLRequest(url: vURL)
                        vReq.setValue("Bearer \(oauthToken)", forHTTPHeaderField: "Authorization")
                        if let (vData, _) = try? await URLSession.shared.data(for: vReq),
                           let vote = try? JSONDecoder().decode(ConnectorVote.self, from: vData) {
                            votes.append(vote)
                        }
                    }
                }
                connectorCategories[i].votes = votes
            } catch {
                // non-fatal: connector panel shows empty if KV unreachable
            }
        }
    }
}

// MARK: - CF KV response shapes

private struct CFKVKeyList: Decodable {
    struct Key: Decodable { let name: String }
    let result: [Key]
}

private struct PaginatedList<T: Decodable>: Decodable {
    let data: [T]
}

// MARK: - Static connector category definitions

private let staticCategories: [ConnectorCategory] = [
    ConnectorCategory(id: "source_control", displayName: "Source Control",
                      consensus: .single),
    ConnectorCategory(id: "project_tracker", displayName: "Project Tracker",
                      consensus: .multi(quorum: 2)),
    ConnectorCategory(id: "ci_cd", displayName: "CI/CD",
                      consensus: .multi(quorum: 2)),
    ConnectorCategory(id: "monitoring", displayName: "Monitoring",
                      consensus: .multi(quorum: 2)),
    ConnectorCategory(id: "knowledge_base", displayName: "Knowledge Base",
                      consensus: .multi(quorum: 3)),
]
