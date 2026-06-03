import XCTest
@testable import SubagentDashboard

// @cite docs/managed-agents-models.ts  (AgentSchema, SessionSchema enums)

final class ModelTests: XCTestCase {

    func test_agent_decodes() throws {
        let json = """
        {
          "id": "agt_01abc",
          "name": "engineering",
          "status": "active",
          "model_id": "claude-opus-4-7",
          "created_at": "2026-06-02T12:00:00Z",
          "skill_ids": ["engineering/code-review"]
        }
        """.data(using: .utf8)!
        let agent = try JSONDecoder().decode(Agent.self, from: json)
        XCTAssertEqual(agent.status, .active)
        XCTAssertEqual(agent.modelId, "claude-opus-4-7")
    }

    func test_agentCostMetrics_decodes() throws {
        let json = """
        {
          "session_id": "sesn_01xyz",
          "model": "claude-opus-4-7",
          "tokens_input": 1000,
          "tokens_output": 500,
          "cost_usd": 0.025
        }
        """.data(using: .utf8)!
        let cost = try JSONDecoder().decode(AgentCostMetrics.self, from: json)
        XCTAssertEqual(cost.tokensInput, 1000)
        XCTAssertEqual(cost.costUsd, 0.025, accuracy: 0.0001)
    }

    func test_connectorCategory_rawValues() {
        XCTAssertEqual(ConnectorCategory.sourceControl.rawValue, "source_control")
        XCTAssertEqual(ConnectorCategory.ciCd.rawValue, "ci_cd")
    }

    func test_memoryStore_decodes() throws {
        let json = """
        {
          "id": "mst_01",
          "name": "engineering-memory",
          "store_type": "kv",
          "status": "active",
          "memory_count": 42
        }
        """.data(using: .utf8)!
        let store = try JSONDecoder().decode(MemoryStore.self, from: json)
        XCTAssertEqual(store.storeType, .kv)
        XCTAssertEqual(store.memoryCount, 42)
    }
}
