# OMA API Reference

## Base URL

```
https://api.managedsubagents.com
```

## Authentication

All endpoints (except `GET /v1/health`) require:

```
Authorization: Bearer <CLAUDE_CODE_OAUTH_TOKEN>
```

`ANTHROPIC_API_KEY` is never accepted. Any request presenting an API key instead of an OAuth token is rejected with `401`.

## Endpoints

### POST /v1/chat

Start or continue an agent conversation.

**Request**

```json
{
  "session_id": "string | null",
  "message": "string",
  "stream": "boolean (default: false)",
  "model": "string (default: claude-sonnet-4-6)",
  "max_tokens": "integer (default: 8192)"
}
```

- `session_id`: pass `null` to create a new session; pass an existing ID to continue.
- `stream`: when `true`, response is `text/event-stream`; each SSE event is a `delta` chunk.

**Response (non-streaming)**

```json
{
  "session_id": "string",
  "message": {
    "role": "assistant",
    "content": "string"
  },
  "usage": {
    "input_tokens": "integer",
    "output_tokens": "integer"
  }
}
```

---

### GET /v1/sessions

List active sessions for the authenticated token.

**Query parameters**

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `limit` | integer | 20 | Results per page (max 100) |
| `cursor` | string | — | Pagination cursor from previous response |

**Response**

```json
{
  "sessions": [
    {
      "id": "string",
      "created_at": "ISO 8601 timestamp",
      "last_active_at": "ISO 8601 timestamp",
      "message_count": "integer",
      "model": "string"
    }
  ],
  "next_cursor": "string | null"
}
```

---

### POST /v1/sessions/:id/messages

Append a message to an existing session without triggering an agent response. Used to inject context (e.g., tool results, system updates).

**Request**

```json
{
  "role": "user | system",
  "content": "string"
}
```

**Response**

```json
{
  "session_id": "string",
  "message_count": "integer"
}
```

---

### DELETE /v1/sessions/:id

Terminate a session and release its resources.

**Response**

```json
{
  "deleted": true,
  "session_id": "string"
}
```

---

### GET /v1/health

Health check. No authentication required.

**Response**

```json
{
  "status": "ok",
  "version": "string",
  "uptime_seconds": "number"
}
```

---

## Error codes

| Code | Condition |
| :--- | :--- |
| `401 Unauthorized` | Missing or invalid OAuth token; or `ANTHROPIC_API_KEY` presented instead |
| `404 Not Found` | Session ID does not exist or has been terminated |
| `429 Too Many Requests` | Rate limit exceeded (inherited from Anthropic OAuth rate limits) |
| `503 Service Unavailable` | Upstream Anthropic API unavailable or MCP bridge unreachable |

**Error response shape**

```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## Rate limiting

Rate limits are inherited from the Anthropic OAuth token's tier. The server does not impose an additional limit above the Anthropic limit. The `429` response includes a `Retry-After` header with seconds to wait.
