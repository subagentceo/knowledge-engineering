import Foundation

// Swift Codable models mirroring docs/managed-agents-models.ts for all managed-agents
// resource types: agents, sessions, environments, credential vaults, memory stores, memories.
// Auth is OAuth-only; ANTHROPIC_API_KEY is never used.
//
// @cite docs/managed-agents-models.ts  (AgentSchema, SessionSchema, EnvironmentSchema, etc.)
// @cite apps/coworker-dashboard/Sources/CoworkerDashboard/Model.swift  (pattern)
// @cite docs/prompts/coworker-dev-chain.v2.md  (connector categories, consensus)

// MARK: - Shared enums (reused across resource types)

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

enum ConnectorCategory: String, Codable, CaseIterable {
    case sourceControl  = "source_control"
    case projectTracker = "project_tracker"
    case ciCd           = "ci_cd"
    case monitoring     = "monitoring"
    case knowledgeBase  = "knowledge_base"

    var displayName: String {
        switch self {
        case .sourceControl:  return "Source Control"
        case .projectTracker: return "Project Tracker"
        case .ciCd:           return "CI/CD"
        case .monitoring:     return "Monitoring"
        case .knowledgeBase:  return "Knowledge Base"
        }
    }
}

// MARK: - Agent

enum AgentStatus: String, Codable, CaseIterable {
    case active, archived
}

struct Agent: Codable, Identifiable {
    let id: String          // agt_...
    let name: String
    var status: AgentStatus
    let modelId: String
    let createdAt: String
    var skillIds: [String]

    enum CodingKeys: String, CodingKey {
        case id, name, status, createdAt
        case modelId   = "model_id"
        case skillIds  = "skill_ids"
    }
}

// MARK: - Session Events (shared with coworker-dashboard pattern)

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
    let type: String
    let text: String?
}

struct SessionEvent: Codable, Identifiable {
    let id: String
    let type: SessionEventType
    let content: [ContentBlock]?
    let timestamp: String?
    let spanId: String?
    let stopReason: String?

    var markdownBody: String {
        let text = content?.compactMap(\.text).joined(separator: "\n") ?? ""
        return text.isEmpty ? "*[\(type.rawValue)]*" : text
    }

    enum CodingKeys: String, CodingKey {
        case id, type, content, timestamp
        case spanId     = "span_id"
        case stopReason = "stop_reason"
    }
}

extension SessionEvent {
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id         = try c.decode(String.self, forKey: .id)
        let rawType = try c.decode(String.self, forKey: .type)
        type       = SessionEventType(rawValue: rawType) ?? .unknown
        content    = try c.decodeIfPresent([ContentBlock].self, forKey: .content)
        timestamp  = try c.decodeIfPresent(String.self, forKey: .timestamp)
        spanId     = try c.decodeIfPresent(String.self, forKey: .spanId)
        stopReason = try c.decodeIfPresent(String.self, forKey: .stopReason)
    }
}

// MARK: - Connector Votes

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
        case category, vote
        case votedAt    = "voted_at"
    }
}

// MARK: - Agent Session

struct AgentSession: Codable, Identifiable {
    let id: String          // sesn_...
    let agentId: String
    var status: SessionStatus
    var title: String?
    let createdAt: String
    var events: [SessionEvent] = []
    var connectorVotes: [ConnectorVote] = []

    enum CodingKeys: String, CodingKey {
        case id, status, title, createdAt
        case agentId = "agent_id"
    }
}

// MARK: - Environment

enum EnvironmentType: String, Codable, CaseIterable {
    case selfHosted = "self_hosted"
    case cloud
}

enum EnvironmentStatus: String, Codable, CaseIterable {
    case active, archived, inactive
}

struct Environment: Codable, Identifiable {
    let id: String          // env_...
    let name: String
    let type: EnvironmentType
    var workerUrl: String?
    var status: EnvironmentStatus
    var agentIds: [String]

    enum CodingKeys: String, CodingKey {
        case id, name, type, status
        case workerUrl = "worker_url"
        case agentIds  = "agent_ids"
    }
}

// MARK: - Credential Vault

struct VaultCredential: Codable, Identifiable {
    let id: String          // cred_...
    let name: String
    let category: ConnectorCategory
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, name, category
        case createdAt = "created_at"
    }
}

struct CredentialVault: Codable, Identifiable {
    let id: String          // vault_...
    let name: String
    var credentials: [VaultCredential]
}

// MARK: - Memory Store

enum MemoryStoreType: String, Codable, CaseIterable {
    case kv, vector, graph
}

enum MemoryStoreStatus: String, Codable, CaseIterable {
    case active, archived
}

struct MemoryStore: Codable, Identifiable {
    let id: String          // mst_...
    let name: String
    let storeType: MemoryStoreType
    var status: MemoryStoreStatus
    var memoryCount: Int

    enum CodingKeys: String, CodingKey {
        case id, name, status
        case storeType    = "store_type"
        case memoryCount  = "memory_count"
    }
}

// MARK: - Memory

struct Memory: Codable, Identifiable {
    let id: String          // mem_...
    let storeId: String
    let key: String
    var value: String?
    let createdAt: String
    var expiresAt: String?

    enum CodingKeys: String, CodingKey {
        case id, key, value
        case storeId   = "store_id"
        case createdAt = "created_at"
        case expiresAt = "expires_at"
    }
}

// MARK: - Cost Metrics

// Mirrors AgentSessionCost from scripts/check-agent-costs.ts and
// apps/analytics-dashboard/cost/src/claude-cost-poller.ts
struct AgentCostMetrics: Codable {
    let sessionId: String
    let model: String
    let tokensInput: Int
    let tokensOutput: Int
    let costUsd: Double

    enum CodingKeys: String, CodingKey {
        case model
        case sessionId   = "session_id"
        case tokensInput  = "tokens_input"
        case tokensOutput = "tokens_output"
        case costUsd      = "cost_usd"
    }
}
