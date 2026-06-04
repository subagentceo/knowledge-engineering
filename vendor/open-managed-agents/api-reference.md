# open-managed-agents — API Reference

> @cite vendor/open-managed-agents/README.md
> @cite vendor/open-managed-agents/architecture.md
> @cite vendor/open-managed-agents/governance-schema.md

## Auth

All `/v1/*` endpoints require one of:

| Header | Value |
|---|---|
| `Authorization` | `Bearer <CLAUDE_CODE_OAUTH_TOKEN>` |
| `Cookie` | `session=<signed-session-cookie>` (set by `POST /auth/login`) |
| `x-api-key` | `<token>` (issued by `POST /v1/tokens`) |

All three authenticate to the same internal principal. Requests without valid
auth return `401 Unauthorized`.

## Auth routes (outside /v1/)

### POST /auth/login

Authenticate and receive a session cookie.

**Body**

```json
{ "email": "string", "password": "string" }
```

**Response**

`200 OK` — sets `HttpOnly` session cookie. Body:

```json
{ "user": { "id": "string", "email": "string", "team": "string" } }
```

### POST /v1/tokens

Issue a long-lived API token (Bearer / x-api-key).

**Body**

```json
{ "label": "string", "expires_at": "ISO8601 | null" }
```

**Response**

```json
{ "token": "string", "id": "string", "label": "string", "expires_at": "string | null" }
```

## Agents

### GET /v1/agents

List agents visible to the authenticated user's team.

**Response**

```json
{
  "agents": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "system_prompt": "string",
      "provider": "string",
      "model": "string",
      "team": "string",
      "created_at": "ISO8601"
    }
  ]
}
```

### POST /v1/agents

Create a new agent.

**Body**

```json
{
  "name": "string",
  "description": "string",
  "system_prompt": "string",
  "provider": "claude-oauth | ollama | string",
  "model": "string"
}
```

**Response** `201 Created`

```json
{ "id": "string", "name": "string", ...agent }
```

### GET /v1/agents/:id

Get a single agent by ID.

**Response** `200 OK` — agent object.

### PATCH /v1/agents/:id

Update agent fields. Body: partial agent object.

### DELETE /v1/agents/:id

Delete agent. `204 No Content`.

## Sessions

### GET /v1/sessions

List sessions for the authenticated user.

**Response**

```json
{
  "sessions": [
    {
      "id": "string",
      "name": "string",
      "agent_id": "string",
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ]
}
```

### POST /v1/sessions

Create a session (logical workspace tied to an agent).

**Body**

```json
{ "agent_id": "string", "name": "string" }
```

**Response** `201 Created` — session object.

### GET /v1/sessions/:id

Get session by ID.

### DELETE /v1/sessions/:id

Delete session and all its threads. `204 No Content`.

## Threads

### GET /v1/sessions/:id/threads

List threads in a session.

**Response**

```json
{
  "threads": [
    {
      "id": "string",
      "session_id": "string",
      "title": "string | null",
      "created_at": "ISO8601",
      "message_count": "number"
    }
  ]
}
```

### POST /v1/sessions/:id/threads

Create a thread within a session.

**Body**

```json
{ "title": "string | null" }
```

**Response** `201 Created` — thread object.

### GET /v1/sessions/:id/threads/:tid

Get thread by ID including full message history.

**Response**

```json
{
  "id": "string",
  "session_id": "string",
  "messages": [
    { "role": "user | assistant | tool_result", "content": "string | object", "created_at": "ISO8601" }
  ]
}
```

### DELETE /v1/sessions/:id/threads/:tid

Delete thread. `204 No Content`.

## Messages (streaming)

### POST /v1/sessions/:id/threads/:tid/messages

Send a user message. Runs the agent loop and streams the response.

**Body**

```json
{ "content": "string" }
```

**Response** `200 OK` — `Content-Type: text/event-stream`

Server-Sent Events stream:

```
data: {"type":"text_delta","delta":"Hello"}

data: {"type":"text_delta","delta":", world"}

data: {"type":"tool_use","tool":"slack_post_message","input":{"channel":"#general","text":"..."}}

data: {"type":"tool_result","tool":"slack_post_message","output":{"ok":true}}

data: {"type":"message_stop"}

```

Each `data:` line is a JSON object. The stream ends with `message_stop`.
Tool calls appear inline as the agent loop executes them.

## Connectors

### GET /v1/connectors

List connectors available to the authenticated user's team (from governance).

**Response**

```json
{
  "connectors": [
    {
      "name": "string",
      "type": "slack | notion | github | linear | sentry | asana | amplitude | intercom | atlassian | gdrive | postgres | stripe",
      "configured": "boolean",
      "team": "string"
    }
  ]
}
```

### POST /v1/connectors

Register (or update) credentials for a connector in the team vault.

**Body**

```json
{
  "name": "string",
  "credential": "string | object"
}
```

Credential is AES-256-GCM encrypted before storage. The plaintext is never
logged or returned.

**Response** `200 OK`

```json
{ "name": "string", "configured": true }
```

### DELETE /v1/connectors/:name

Remove connector credentials for this team. `204 No Content`.

## Governance

### GET /v1/governance

Return the current `governance.json` as parsed JSON.

**Response** `200 OK` — governance object (see [governance-schema.md](./governance-schema.md)).

### PUT /v1/governance

Replace the governance config. Validated against the schema before writing.
The server hot-reloads the new config without restart.

**Body** — full governance object.

**Response** `200 OK`

```json
{ "ok": true, "reloaded_at": "ISO8601" }
```

## Error format

All errors follow:

```json
{
  "error": "string",
  "code": "UNAUTHORIZED | FORBIDDEN | NOT_FOUND | VALIDATION_ERROR | INTERNAL_ERROR",
  "details": "object | null"
}
```

| HTTP status | code |
|---|---|
| 400 | `VALIDATION_ERROR` |
| 401 | `UNAUTHORIZED` |
| 403 | `FORBIDDEN` |
| 404 | `NOT_FOUND` |
| 500 | `INTERNAL_ERROR` |
