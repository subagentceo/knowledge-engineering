# The StreamableHTTP Transport (and StreamableHTTP in Depth)

- Communicates over **HTTP**, so the server can be hosted **remotely** at a public URL (e.g. `mcpserver.com`) — the big advantage over stdio.
- **Core problem:** HTTP is naturally client→server only. The server doesn't know the client's address and the client may not be publicly reachable, so server-initiated requests are hard.
- **Workaround:** **Server-Sent Events (SSE)** — keep connections open and stream individual messages from server to client.

## How SSE makes it bidirectional
- A **session ID** is assigned at initialization and included as an HTTP header on every subsequent request.
- Init flow: client sends initialize → server responds with result + session-ID header → client sends initialized notification with the session ID → client *optionally* opens a **GET** request with the session ID to establish an SSE connection.
- **Two SSE connections:**
  1. **Long-lived** — carries server-initiated requests (sampling, progress notifications).
  2. **Short-lived** — carries the response to a specific tool call, then closes automatically.
- Routing: progress notifications → long-lived SSE; logging messages + tool results → the short-lived SSE tied to that request.

## The `json_response = true` flag
Defaults to **false**. Disables streaming on POST responses. Effects:
- POST returns the **final result as plain JSON only** — no intermediate streamed messages.
- No progress/log statements during execution; the client waits for the whole tool to finish before getting anything.

## Common deployment trap
An app works fine locally on stdio but fails on HTTP because progress bars, logging, progress notifications, and sampling all need server→client messaging that HTTP restricts. Use the same transport/flags in dev as in production to avoid "works locally, fails deployed" surprises.

See [`scripts/http_server.py`](../scripts/http_server.py) for a server running over StreamableHTTP.
