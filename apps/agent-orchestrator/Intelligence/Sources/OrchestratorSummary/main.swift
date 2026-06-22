// Copyright 2026.
// SPDX-License-Identifier: Apache-2.0
//
// Runnable example: read view.json, summarize the team state through Claude.
//   CLAUDE_PROXY_URL=https://api.yourapp.com/claude swift run OrchestratorSummary [path/to/view.json]
//
// The decode + snapshot path is portable (OrchestratorCore) and runs on Linux.
// The actual summarization requires a macOS 27 host (FoundationModels); on Linux
// it prints the prompt that WOULD be sent, so the example is still useful there.

import Foundation
import OrchestratorCore
import OrchestratorIntelligence

let path = CommandLine.arguments.dropFirst().first ?? "view.json"
let data = try Data(contentsOf: URL(fileURLWithPath: path))
let snapshot = try decodeSnapshot(fromViewJSON: data)

#if canImport(FoundationModels)
let summary = try await summarizeStandup(snapshot)
print(summary)
#else
print("[FoundationModels unavailable on this platform — prompt preview]\n")
print(standupPrompt(snapshot))
#endif
