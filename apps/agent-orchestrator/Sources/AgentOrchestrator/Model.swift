import Foundation

// Swift decode of the OrchestratorView contract. Mirrors
// src/agent/team/subagent-schema.ts and src/agent/cowork/team_models.py.
// JSON keys are camelCase (emitted with by_alias), so no custom CodingKeys.

enum SessionState: String, Codable, CaseIterable {
    case working, needsInput = "needs_input", idle, completed, failed, stopped

    var label: String {
        switch self {
        case .working: return "Working"
        case .needsInput: return "Needs input"
        case .idle: return "Idle"
        case .completed: return "Completed"
        case .failed: return "Failed"
        case .stopped: return "Stopped"
        }
    }
}

enum TeamTaskState: String, Codable {
    case pending, inProgress = "in_progress", completed

    var label: String {
        switch self {
        case .pending: return "To Do"
        case .inProgress: return "In Progress"
        case .completed: return "Done"
        }
    }
}

enum TeamRole: String, Codable { case lead, teammate }

struct TeamMember: Codable, Identifiable {
    let name: String
    let agentId: String
    let agentType: String
    var role: TeamRole = .teammate
    var id: String { agentId }
}

struct TeamConfig: Codable {
    let name: String
    let members: [TeamMember]
    var teammateMode: String = "auto"
}

struct TeamTask: Codable, Identifiable {
    let id: String
    let subject: String
    var state: TeamTaskState = .pending
    var owner: String?
    var dependsOn: [String] = []
    var jiraKey: String?
}

struct AgentSession: Codable, Identifiable {
    let sessionId: String
    let name: String
    let state: SessionState
    var shape: String = "alive"
    let cwd: String
    let kind: String
    let startedAt: String
    var summary: String?
    var prNumber: Int?
    var prStatus: String?
    var pinned: Bool = false
    var id: String { sessionId }
}

struct WorkflowPhaseProgress: Codable, Identifiable {
    let title: String
    var agentCount: Int = 0
    var tokensTotal: Int = 0
    var elapsedMs: Int = 0
    var id: String { title }
}

struct WorkflowMeta: Codable {
    let name: String
    let description: String
}

struct WorkflowRun: Codable, Identifiable {
    let runId: String
    let meta: WorkflowMeta
    var state: String = "running"
    var phases: [WorkflowPhaseProgress] = []
    var id: String { runId }
}

struct OrchestratorView: Codable {
    let team: TeamConfig
    let tasks: [TeamTask]
    let sessions: [AgentSession]
    var workflows: [WorkflowRun] = []
    let generatedAt: String

    static let empty = OrchestratorView(
        team: TeamConfig(name: "knowledge-engineering", members: []),
        tasks: [], sessions: [], workflows: [], generatedAt: ""
    )
}
