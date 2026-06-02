#if canImport(SwiftUI)
// MCPClient.swift — calls the knowledge-bridge MCP server via HTTP/JSON-RPC.
//
// Dogfoods: telemetry_session_list, telemetry_cache_efficiency, telemetry_cost_query
// tools registered in src/mcp/lanes/telemetry.ts via the bridge server.
//
// The bridge server is started locally: `npm run dev:mcp` (StdioServerTransport).
// For the dashboard app the server is fronted by a thin HTTP wrapper on port 3100
// (see apps/subagent-dashboard/mcp-http-proxy.ts).
//
// @cite src/mcp/lanes/telemetry.ts
// @cite src/sdk/telemetry-client.ts
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts

import Foundation

// MARK: - JSON-RPC primitives

private struct JSONRPCRequest: Encodable {
    let jsonrpc = "2.0"
    let id: Int
    let method: String
    let params: Params

    struct Params: Encodable {
        let name: String
        let arguments: [String: AnyCodable]
    }
}

private struct JSONRPCResponse<T: Decodable>: Decodable {
    let result: ToolResult<T>?
    let error: RPCError?

    struct ToolResult<U: Decodable>: Decodable {
        let content: [ContentBlock<U>]
    }
    struct ContentBlock<U: Decodable>: Decodable {
        let type: String
        let text: String?
    }
    struct RPCError: Decodable {
        let code: Int
        let message: String
    }
}

// MARK: - Result types mirroring AgentSessionCost from claude-cost-poller.ts

struct MCPSessionRecord: Decodable, Identifiable {
    var id: String { session_id }
    let session_id: String
    let model: String
    let workspace_id: String
    let service_tier: String
    let context_window: String
    let uncached_input_tokens: Int
    let output_tokens: Int
    let cache_read_input_tokens: Int
    let cache_creation_5m_input_tokens: Int
    let cache_creation_1h_input_tokens: Int
    let cost_usd: Double
    let recorded_at: String?
    let branch: String?
    let pr_number: Int?
    let cache_efficiency: CacheEfficiency?

    struct CacheEfficiency: Decodable {
        let cache_hit_rate: Double
        let total_input_tokens: Int
        let cache_read_tokens: Int
        let cache_creation_tokens: Int
        let estimated_savings_usd: Double
    }
}

struct MCPSessionListResult: Decodable {
    let count: Int
    let sessions: [MCPSessionRecord]
}

struct MCPCacheAggregateResult: Decodable {
    let session_count: Int
    let cache_hit_rate: Double
    let total_input_tokens: Int
    let cache_read_tokens: Int
    let cache_creation_tokens: Int
    let total_cost_usd: Double
    let estimated_savings_usd: Double
}

// MARK: - Client

@Observable
final class MCPClient {
    var sessions: [MCPSessionRecord] = []
    var cacheAggregate: MCPCacheAggregateResult?
    var isLoading = false
    var lastError: String?

    private let baseURL: URL
    private let decoder = JSONDecoder()
    private var requestId = 0

    init(baseURL: URL = URL(string: ProcessInfo.processInfo.environment["MCP_BRIDGE_URL"]
                            ?? "http://localhost:3100")!) {
        self.baseURL = baseURL
    }

    func refresh() async {
        isLoading = true
        defer { isLoading = false }
        async let s: Void = fetchSessions()
        async let c: Void = fetchCacheAggregate()
        _ = await (s, c)
    }

    private func fetchSessions() async {
        do {
            let result: MCPSessionListResult = try await callTool(
                "telemetry_session_list",
                args: ["limit": .int(50)]
            )
            sessions = result.sessions
        } catch {
            lastError = error.localizedDescription
        }
    }

    private func fetchCacheAggregate() async {
        do {
            let result: MCPCacheAggregateResult = try await callTool(
                "telemetry_cache_efficiency",
                args: [:]
            )
            cacheAggregate = result
        } catch {
            lastError = error.localizedDescription
        }
    }

    private func callTool<T: Decodable>(_ name: String, args: [String: AnyCodable]) async throws -> T {
        requestId += 1
        var req = URLRequest(url: baseURL.appendingPathComponent("tools/call"))
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let body = JSONRPCRequest(id: requestId, method: "tools/call",
                                  params: .init(name: name, arguments: args))
        req.httpBody = try JSONEncoder().encode(body)
        let (data, _) = try await URLSession.shared.data(for: req)
        // extract text content from MCP tool response, then decode the JSON within it
        let raw = try decoder.decode(JSONRPCResponse<String>.self, from: data)
        guard let text = raw.result?.content.first?.text,
              let jsonData = text.data(using: .utf8) else {
            if let err = raw.error { throw MCPError.rpc(err.code, err.message) }
            throw MCPError.noContent
        }
        return try decoder.decode(T.self, from: jsonData)
    }
}

enum MCPError: Error {
    case rpc(Int, String)
    case noContent
}

// MARK: - AnyCodable (minimal, for tool arguments)

enum AnyCodable: Encodable {
    case int(Int)
    case string(String)
    case bool(Bool)

    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .int(let v): try c.encode(v)
        case .string(let v): try c.encode(v)
        case .bool(let v): try c.encode(v)
        }
    }
}
#endif // canImport(SwiftUI)
