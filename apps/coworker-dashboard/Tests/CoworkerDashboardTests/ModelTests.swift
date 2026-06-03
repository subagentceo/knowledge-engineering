import XCTest
@testable import CoworkerDashboard

// @cite docs/managed-agents-models.ts  (SessionEvent discriminated union)

final class ModelTests: XCTestCase {

    func test_sessionEvent_agentMessage_decodes() throws {
        let json = """
        {
          "id": "sevt_01abc",
          "type": "agent.message",
          "content": [{"type": "text", "text": "**Hello** from the coworker"}],
          "timestamp": "2026-06-02T12:00:00Z"
        }
        """.data(using: .utf8)!
        let event = try JSONDecoder().decode(SessionEvent.self, from: json)
        XCTAssertEqual(event.type, .agentMessage)
        XCTAssertEqual(event.id, "sevt_01abc")
        XCTAssertTrue(event.markdownBody.contains("Hello"))
    }

    func test_sessionEvent_unknown_type_does_not_crash() throws {
        let json = """
        {"id": "sevt_02", "type": "future.event.type", "timestamp": null}
        """.data(using: .utf8)!
        let event = try JSONDecoder().decode(SessionEvent.self, from: json)
        XCTAssertEqual(event.type, .unknown)
    }

    func test_connectorVote_allow_decodes() throws {
        let json = """
        {
          "coworker_id": "engineering",
          "category": "source_control",
          "vote": "allow",
          "voted_at": "2026-06-02T10:00:00Z"
        }
        """.data(using: .utf8)!
        let vote = try JSONDecoder().decode(ConnectorVote.self, from: json)
        XCTAssertEqual(vote.vote, .allow)
        XCTAssertEqual(vote.category, "source_control")
    }

    func test_connectorCategory_single_approved_when_one_allow() {
        var cat = ConnectorCategory(id: "source_control", displayName: "Source Control", consensus: .single)
        XCTAssertFalse(cat.isApproved)
        cat.votes = [ConnectorVote(coworkerId: "engineering", category: "source_control",
                                   vote: .allow, votedAt: "2026-06-02T10:00:00Z")]
        XCTAssertTrue(cat.isApproved)
    }

    func test_connectorCategory_multi_requires_quorum() {
        var cat = ConnectorCategory(id: "project_tracker", displayName: "Project Tracker",
                                    consensus: .multi(quorum: 2))
        cat.votes = [
            ConnectorVote(coworkerId: "engineering", category: "project_tracker", vote: .allow, votedAt: ""),
        ]
        XCTAssertFalse(cat.isApproved)  // only 1 of 2 required
        cat.votes.append(
            ConnectorVote(coworkerId: "product-management", category: "project_tracker", vote: .allow, votedAt: "")
        )
        XCTAssertTrue(cat.isApproved)
    }
}
