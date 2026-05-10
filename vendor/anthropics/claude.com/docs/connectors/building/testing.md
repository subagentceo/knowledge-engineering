> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Testing your connector

> Test your MCP server against Claude before submitting to the directory

Test your server against the real Claude client before submitting. There is no separate staging environment—you test in production using a custom connector.

## Test as a custom connector

Any Claude account (Free, Pro, Max, Team, or Enterprise) can add a custom connector. Go to **Settings > Connectors > Add custom connector** and enter your server's URL. Custom connectors use the exact same runtime as directory connectors, so what works here will work after publication.

## Test a local server

To test a server running on your machine, expose it as a public URL with a tunnel such as [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) or `ngrok`, then add the tunnel URL as a custom connector. This is the recommended pattern for iterating on MCP Apps as well.

<Warning>
  A tunnel exposes your local server to the public internet. Keep authentication enabled on your server while tunneling, and shut the tunnel down when you're done testing.
</Warning>

## Validate with MCP Inspector

Use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to verify protocol compliance, exercise your auth flow, and inspect tool schemas before connecting to Claude.

## Detect Claude as the client

Claude identifies itself in the MCP `initialize` handshake via `clientInfo`. The hosted surfaces (Claude.ai web, Desktop, mobile, Cowork) send `"name": "claude-ai"`; Claude Code sends `"name": "claude-code"`:

```json theme={null}
{ "clientInfo": { "name": "claude-ai", "version": "0.1.0" } }
```

The `name` and `version` values may change over time, so don't gate behavior on an exact string match. Note that `clientInfo` is unauthenticated—any client can claim any name. Use it for telemetry or feature detection, not for authorization decisions.

## Prepare test credentials for review

Directory submission requires test credentials. Provide a **fully populated account**—not an empty shell—so reviewers can exercise real functionality (list real records, search real data, exercise write tools on real resources). Include step-by-step setup instructions for someone unfamiliar with your service.

## Debugging

Partner-visible error logs are in development. In the meantime, use server-side logging on your end and the MCP Inspector to diagnose connection failures. Common causes of `initialize` timeouts include slow OAuth metadata endpoints (keep these under five seconds), overly strict `Origin`-header validation rejecting Anthropic's requests, and firewalls dropping Anthropic's egress traffic.

If Claude surfaces authentication or tool-invocation errors and your infrastructure logs show `403 Forbidden` responses that your application didn't generate, your CDN or web application firewall (WAF) is likely blocking Anthropic's traffic before it reaches your server. Allowlist Anthropic's egress range (`160.79.104.0/21`) in your WAF or CDN configuration—see the [IP address reference](https://platform.claude.com/docs/en/api/ip-addresses).
