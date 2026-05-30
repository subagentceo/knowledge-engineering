import XCTest
@testable import AgentOrchestrator

final class ModelTests: XCTestCase {
    // Decodes the exact camelCase JSON shape emitted by emit-view.ts.
    func testDecodeOrchestratorView() throws {
        let json = """
        {
          "team": {"name": "knowledge-engineering", "members": [
            {"name": "lead", "agentId": "a0", "agentType": "claude", "role": "lead"}
          ], "teammateMode": "auto"},
          "tasks": [
            {"id": "SCRUM-7", "subject": "pre-verify gate", "state": "in_progress",
             "owner": "pre-verify-gate", "dependsOn": [], "jiraKey": "SCRUM-7"}
          ],
          "sessions": [
            {"sessionId": "7c5dcf5d", "name": "pre-verify-gate", "state": "working",
             "shape": "alive", "cwd": ".", "kind": "session",
             "startedAt": "2026-05-30T21:00:00Z", "summary": "Edit steer.ts", "pinned": false}
          ],
          "workflows": [],
          "generatedAt": "2026-05-30T21:00:00Z"
        }
        """.data(using: .utf8)!

        let view = try JSONDecoder().decode(OrchestratorView.self, from: json)
        XCTAssertEqual(view.team.name, "knowledge-engineering")
        XCTAssertEqual(view.team.members.first?.role, .lead)
        XCTAssertEqual(view.tasks.first?.state, .inProgress)
        XCTAssertEqual(view.tasks.first?.jiraKey, "SCRUM-7")
        XCTAssertEqual(view.sessions.first?.state, .working)
        XCTAssertEqual(view.sessions.first?.summary, "Edit steer.ts")
    }

    func testStateLabels() {
        XCTAssertEqual(SessionState.needsInput.label, "Needs input")
        XCTAssertEqual(TeamTaskState.inProgress.label, "In Progress")
    }
}
