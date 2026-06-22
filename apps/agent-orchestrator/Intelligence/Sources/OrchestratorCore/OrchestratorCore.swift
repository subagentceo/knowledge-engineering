// Copyright 2026.
// SPDX-License-Identifier: Apache-2.0
//
// Portable core — Foundation only. Builds and tests on Linux, macOS, Windows.
// No SwiftUI, no AppKit, no FoundationModels. The summarization PROMPT and the
// snapshot type live here so they are unit-testable anywhere Swift runs.
//
// @cite apps/agent-orchestrator/Sources/AgentOrchestrator/Model.swift (OrchestratorView shape)
// @cite https://www.swift.org/install/linux/

import Foundation

/// Transport-agnostic snapshot of the orchestrator view. The app maps its own
/// `OrchestratorView` into this; the FoundationModels bridge consumes it.
public struct TeamSnapshot: Sendable, Equatable {
  public let teamName: String
  public let todo: Int
  public let inProgress: Int
  public let done: Int
  public let activeSessions: Int
  public let needingInput: [String]

  public init(
    teamName: String, todo: Int, inProgress: Int, done: Int,
    activeSessions: Int, needingInput: [String]
  ) {
    self.teamName = teamName
    self.todo = todo
    self.inProgress = inProgress
    self.done = done
    self.activeSessions = activeSessions
    self.needingInput = needingInput
  }
}

/// Pure, testable prompt builder — no network, no FoundationModels.
public func standupPrompt(_ s: TeamSnapshot) -> String {
  let blocked = s.needingInput.isEmpty
    ? "none"
    : s.needingInput.joined(separator: ", ")
  return """
  Write a single concise standup paragraph for the "\(s.teamName)" agent team.
  Tasks: \(s.todo) to do, \(s.inProgress) in progress, \(s.done) done.
  Active sessions: \(s.activeSessions). Sessions needing input: \(blocked).
  State the headline progress first, then call out anything blocked. No preamble.
  """
}

/// Decode a `TeamSnapshot` from the emitted `view.json`. Portable (pure
/// Foundation), so the harness can validate the decode path on Linux.
public func decodeSnapshot(fromViewJSON data: Data) throws -> TeamSnapshot {
  struct RawView: Decodable {
    struct Team: Decodable { let name: String }
    struct Task: Decodable { let state: String }
    struct Session: Decodable { let name: String; let state: String }
    let team: Team
    let tasks: [Task]
    let sessions: [Session]
  }
  let raw = try JSONDecoder().decode(RawView.self, from: data)
  return TeamSnapshot(
    teamName: raw.team.name,
    todo: raw.tasks.filter { $0.state == "pending" }.count,
    inProgress: raw.tasks.filter { $0.state == "in_progress" }.count,
    done: raw.tasks.filter { $0.state == "completed" }.count,
    activeSessions: raw.sessions.filter { $0.state == "working" }.count,
    needingInput: raw.sessions.filter { $0.state == "needs_input" }.map(\.name)
  )
}
