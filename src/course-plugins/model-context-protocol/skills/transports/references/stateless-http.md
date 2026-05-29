# Stateless HTTP

## `stateless_http = true`
Defaults to **false**. Set when horizontally scaling across multiple server instances behind a load balancer (a single instance can't take the traffic; the balancer routes requests randomly). The problem it solves: with sessions, a client's GET-SSE and POST connections can land on different instances, so a tool on Server A can't reach the SSE connection on Server B. Effects:
- No session IDs; the server can't track individual clients.
- The GET-SSE server→client pathway is **disabled**.
- **Eliminates sampling, progress, logging, and resource subscriptions.**
- No client initialization required (skips the initialize request + notification).
- Reduces server traffic.

Both `stateless_http` and `json_response` default to false; setting them true reduces functionality — use the same transport/flags in dev as in production to avoid "works locally, fails deployed" surprises.
