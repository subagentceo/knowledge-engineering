// Copyright 2026.
// SPDX-License-Identifier: Apache-2.0
//
// FoundationModels bridge. Self-gated with #if canImport(FoundationModels) so the
// file COMPILES on Linux (as an empty translation unit) while only providing the
// Claude-backed session on Apple platforms (macOS 27+). The portable prompt logic
// lives in OrchestratorCore and is reused here.
//
// @cite https://github.com/anthropics/ClaudeForFoundationModels (ClaudeLanguageModel, auth modes)
// @cite https://www.swift.org/install/linux/ (Linux is a first-class Swift target)

import OrchestratorCore

#if canImport(FoundationModels)
import Foundation
import FoundationModels
import ClaudeForFoundationModels

public enum IntelligenceError: Error {
  case missingProxyURL
}

/// Builds a Claude-backed `LanguageModelSession` (lane C — see docs/backend-routing.md).
///
/// OAuth-only invariant (repo CLAUDE.md): this chassis NEVER sets
/// `ANTHROPIC_API_KEY`. We default to `.proxied` auth — a backend relay attaches
/// the credential server-side and the app ships no key. URL from `CLAUDE_PROXY_URL`.
///
/// Verified against ClaudeForFoundationModels@f47c8aa: `.proxied` sets client auth
/// to `.none` and forwards `headers`; the request still goes to `baseURL`.
public func makeClaudeSession(model: ClaudeModel = .sonnet4_6) throws -> LanguageModelSession {
  guard let raw = ProcessInfo.processInfo.environment["CLAUDE_PROXY_URL"],
        let url = URL(string: raw)
  else { throw IntelligenceError.missingProxyURL }

  let claude = ClaudeLanguageModel(name: model, auth: .proxied(headers: [:]), baseURL: url)
  return LanguageModelSession(model: claude)
}

/// EXPERIMENTAL local-backend session (lane D — see docs/backend-routing.md).
///
/// NOT verified to work end-to-end. `RequestBuilder` emits a strict Anthropic
/// Messages request (literal model id `\(model.id)`, mandatory `stream: true`,
/// `output_config`/`thinking`/`cache_control`, SSE event shape). A local server
/// must be a high-fidelity Anthropic emulator; Ollama's compat shim is not known
/// to meet that bar. Gated behind `CLAUDE_LOCAL_URL` and intended for manual
/// testing only. The placeholder key never reaches Anthropic (request → localhost),
/// so it does not violate the OAuth-only invariant.
public func makeLocalSessionForTesting(model: ClaudeModel = .sonnet4_6) throws -> LanguageModelSession {
  guard let raw = ProcessInfo.processInfo.environment["CLAUDE_LOCAL_URL"],
        let url = URL(string: raw)
  else { throw IntelligenceError.missingProxyURL }

  let claude = ClaudeLanguageModel(name: model, auth: .apiKey("local-placeholder"), baseURL: url)
  return LanguageModelSession(model: claude)
}

/// One-paragraph standup summary of the current team state, via Claude.
public func summarizeStandup(_ snapshot: TeamSnapshot) async throws -> String {
  let session = try makeClaudeSession()
  let response = try await session.respond(to: standupPrompt(snapshot))
  return response.content
}
#else
/// On non-Apple platforms FoundationModels is unavailable. The summarizer is a
/// host-only capability; callers on Linux get a clear error instead of a build
/// failure. (The prompt builder itself is in OrchestratorCore and works here.)
public enum IntelligenceError: Error {
  case foundationModelsUnavailable
}

public func summarizeStandup(_ snapshot: TeamSnapshot) async throws -> String {
  throw IntelligenceError.foundationModelsUnavailable
}
#endif
