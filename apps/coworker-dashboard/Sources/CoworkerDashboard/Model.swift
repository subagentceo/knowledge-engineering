import Foundation

// Swift Codable models mirroring docs/managed-agents-models.ts enums and types.
// The self-hosted coworker runtime implements these contracts; this app is a
// read-only observer of the SSE event stream it produces.
//
// @cite docs/managed-agents-models.ts
// @cite apps/agent-orchestrator/Sources/AgentOrchestrator/Model.swift  (pattern reference)

// MARK: - Session

enum SessionStatus: String, Codable, CaseIterable {
    case idle, running, rescheduling, terminated

    var label: String {
        switch self {
        case .idle:         return "Idle"
        case .running:      return "Running"
        case .rescheduling: return "Rescheduling"
        case .terminated:   return "Terminated"
        }
    }
}

struct CoworkerSession: Codable, Identifiable {
    let id: String          // sesn_...
    let agentName: String
    var status: SessionStatus
    var title: String?
    let createdAt: String
    var events: [SessionEvent] = []
    var connectorVotes: [ConnectorVote] = []

    enum CodingKeys: String, CodingKey {
        case id, agentName, status, title, createdAt
    }
}

// MARK: - Session Events

// Discriminated union matching the managed-agents SSE event type enum.
// Subset of AnySessionEvent from managed-agents-models.ts — only the types
// the dashboard renders; unknown types are decoded as .unknown.
enum SessionEventType: String, Codable {
    case userMessage        = "user.message"
    case agentMessage       = "agent.message"
    case agentThinking      = "agent.thinking"
    case agentToolUse       = "agent.tool_use"
    case agentToolResult    = "agent.tool_result"
    case sessionStart       = "session.start"
    case sessionStop        = "session.stop"
    case sessionStatus      = "session.status"
    case spanStart          = "span.start"
    case spanStop           = "span.stop"
    case unknown
}

struct ContentBlock: Codable {
    let type: String    // "text" | "image"
    let text: String?
    // image omitted — dashboard only renders text/markdown
}

struct SessionEvent: Codable, Identifiable {
    let id: String          // sevt_... (SSE envelope id)
    let type: SessionEventType
    let content: [ContentBlock]?
    let timestamp: String?
    let spanId: String?
    let stopReason: String?

    // markdown-renderable body: agent.message text, agent.thinking text, or type label
    var markdownBody: String {
        let text = content?.compactMap(\.text).joined(separator: "\n") ?? ""
        return text.isEmpty ? "*[\(type.rawValue)]*" : text
    }

    enum CodingKeys: String, CodingKey {
        case id, type, content, timestamp, spanId = "span_id", stopReason = "stop_reason"
    }
}

// Fallback decode: unknown event types map to .unknown without crashing
extension SessionEvent {
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decode(String.self, forKey: .id)
        let rawType = try c.decode(String.self, forKey: .type)
        type = SessionEventType(rawValue: rawType) ?? .unknown
        content = try c.decodeIfPresent([ContentBlock].self, forKey: .content)
        timestamp = try c.decodeIfPresent(String.self, forKey: .timestamp)
        spanId = try c.decodeIfPresent(String.self, forKey: .spanId)
        stopReason = try c.decodeIfPresent(String.self, forKey: .stopReason)
    }
}

// MARK: - Connector Consensus

// Mirrors CoworkerConsensusBallotSchema from docs/prompts/coworker-dev-chain.md
struct ConnectorVote: Codable, Identifiable {
    var id: String { "\(coworkerId):\(category)" }
    let coworkerId: String
    let category: String
    let vote: VoteValue
    let votedAt: String

    enum VoteValue: String, Codable {
        case allow, deny, abstain
    }

    enum CodingKeys: String, CodingKey {
        case coworkerId = "coworker_id"
        case category
        case vote
        case votedAt = "voted_at"
    }
}

// MARK: - Cost Metrics

// Mirrors AgentSessionCost from scripts/check-agent-costs.ts and
// claude.tokens.*/claude.cost.usd OTel metrics from the cost poller.
// Populated by querying Prometheus HTTP API at /api/v1/query.
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
struct CostMetric: Codable, Identifiable {
    var id: String { sessionId }
    let sessionId: String
    let model: String
    let tokensInput: Int
    let tokensOutput: Int
    let costUsd: Double

    enum CodingKeys: String, CodingKey {
        case sessionId   = "session_id"
        case model
        case tokensInput  = "tokens_input"
        case tokensOutput = "tokens_output"
        case costUsd      = "cost_usd"
    }
}

// Prometheus instant-query response envelope (subset we need)
struct PrometheusQueryResult: Decodable {
    struct Data: Decodable {
        struct Result: Decodable {
            struct Metric: Decodable {
                let session_id: String?
                let model: String?
            }
            let metric: Metric
            let value: [PrometheusValue]   // [timestamp, valueString]
        }
        let result: [Result]
    }
    let data: Data
}

enum PrometheusValue: Decodable {
    case timestamp(Double), string(String)
    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let d = try? c.decode(Double.self) { self = .timestamp(d) }
        else { self = .string(try c.decode(String.self)) }
    }
}

struct ConnectorCategory: Identifiable {
    let id: String          // e.g. "source_control"
    let displayName: String
    let consensus: ConsensusType
    var votes: [ConnectorVote] = []

    enum ConsensusType {
        case single, multi(quorum: Int)

        var label: String {
            switch self {
            case .single:          return "single coworker"
            case .multi(let q):    return "quorum \(q)"
            }
        }
    }

    var isApproved: Bool {
        switch consensus {
        case .single:
            return votes.first?.vote == .allow
        case .multi(let quorum):
            return votes.filter { $0.vote == .allow }.count >= quorum
        }
    }
}
