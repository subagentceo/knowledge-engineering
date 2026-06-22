// Copyright 2026.
// SPDX-License-Identifier: Apache-2.0
//
// Portable tests — no network, no FoundationModels. Run on Linux:
//   cd apps/agent-orchestrator/Intelligence && swift test
//
// @cite apps/agent-orchestrator/Intelligence/Sources/OrchestratorCore/OrchestratorCore.swift

import Foundation
import Testing
@testable import OrchestratorCore

@Test func promptIncludesCountsAndTeam() {
  let s = TeamSnapshot(
    teamName: "knowledge-engineering",
    todo: 3, inProgress: 2, done: 5,
    activeSessions: 2, needingInput: []
  )
  let p = standupPrompt(s)
  #expect(p.contains("knowledge-engineering"))
  #expect(p.contains("3 to do"))
  #expect(p.contains("2 in progress"))
  #expect(p.contains("5 done"))
  #expect(p.contains("none"))
}

@Test func promptListsBlockedSessions() {
  let s = TeamSnapshot(
    teamName: "ke", todo: 0, inProgress: 1, done: 0,
    activeSessions: 1, needingInput: ["verifier", "crawl-curator"]
  )
  #expect(standupPrompt(s).contains("verifier, crawl-curator"))
}

@Test func decodesViewJSON() throws {
  let json = """
  {"team":{"name":"ke"},
   "tasks":[{"state":"pending"},{"state":"in_progress"},{"state":"completed"}],
   "sessions":[{"name":"s1","state":"working"},{"name":"s2","state":"needs_input"}]}
  """.data(using: .utf8)!
  let snap = try decodeSnapshot(fromViewJSON: json)
  #expect(snap.todo == 1)
  #expect(snap.inProgress == 1)
  #expect(snap.done == 1)
  #expect(snap.activeSessions == 1)
  #expect(snap.needingInput == ["s2"])
}
