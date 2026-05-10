> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication for connectors

> OAuth and authentication options for MCP servers in Claude

Authentication is the most common source of partner questions. Claude's auth support differs in a few places from the generic MCP specification, so read this page even if you're already familiar with MCP auth.

## Supported authentication types

Claude supports the following authentication types for remote MCP servers. The same infrastructure backs Claude.ai, Claude Desktop, Claude mobile, Claude Code, and Cowork.

| Type                    | Description                                                                                                                                             | Availability                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `oauth_dcr`             | OAuth 2.0 with Dynamic Client Registration ([RFC 7591](https://www.rfc-editor.org/rfc/rfc7591))                                                         | Supported out of the box                                  |
| `oauth_cimd`            | OAuth 2.0 with [Client ID Metadata Document](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#client-id-metadata-documents) | Supported out of the box                                  |
| `oauth_anthropic_creds` | OAuth 2.0 with Anthropic-held client credentials                                                                                                        | Contact `mcp-review@anthropic.com`                        |
| `custom_connection`     | Custom URL or credentials supplied at connection time (for example, Snowflake-style)                                                                    | Contact `mcp-review@anthropic.com`                        |
| `none`                  | No authentication (authless server)                                                                                                                     | Supported. An optional partial-auth mode is experimental. |

User-pasted bearer tokens (`static_bearer`) are **not yet supported**.

## Anthropic-held client credentials

A pure machine-to-machine `client_credentials` grant—where a server-to-server token is issued with no user in the loop—is **not supported**. Every connection requires user consent.

`oauth_anthropic_creds` is the consent-gated alternative. The flow works like this:

1. You create an OAuth `client_id` and `client_secret` in your own authorization server and send them to Anthropic.
2. Anthropic stores those credentials securely and associates them with your directory entry.
3. When a user connects your server, they go through a standard OAuth consent screen.
4. After consent, Anthropic uses the stored client credentials to complete the token exchange on the user's behalf.

This gives you a stable, registered OAuth client without requiring DCR or CIMD on your end, while keeping the user-consent step. Anthropic stores your credentials securely and uses them only for token exchange on behalf of consenting users; they are shared across Claude.ai, Desktop, mobile, Cowork, and Claude Code (Claude Managed Agents uses a separate credential set).

To use this flow, email `mcp-review@anthropic.com` with your `client_id` and secret.

## DCR and CIMD details

If your authorization server does **not** expose a `registration_endpoint` (i.e., does not support DCR), you have several options:

* Expose a `registration_endpoint`
* Support CIMD instead — also include `"none"` in `token_endpoint_auth_methods_supported`, since a URL-identified client is public by definition
* Switch to `oauth_anthropic_creds`

For servers expecting high traffic from the directory, prefer **CIMD or `oauth_anthropic_creds` over DCR**. DCR causes Claude to register a new client on every fresh connection, which can result in very large numbers of registered clients on your authorization server. CIMD and Anthropic-held credentials avoid the registration call entirely.

## Callback URLs

For the hosted Claude surfaces (Claude.ai web, Desktop, mobile, and Cowork), register the following redirect URI:

```
https://claude.ai/api/mcp/auth_callback
```

**Claude Code** is a native client and uses an RFC 8252 loopback redirect on an ephemeral port — for example:

```
http://localhost:3118/callback
```

The port varies per session. Claude Code declares `http://localhost/callback` and `http://127.0.0.1/callback` in its [Client ID Metadata Document](https://claude.ai/oauth/claude-code-client-metadata), so your authorization server must accept both with the port component ignored. [RFC 8252 section 7.3](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3) requires this for the IP-literal form (`127.0.0.1`); apply the same port-agnostic match to `localhost` so Claude Code works, even though RFC 8252 section 8.3 discourages `localhost`. See [lazy authentication](/connectors/building/lazy-authentication) for implementation details.

## Token refresh

Claude refreshes tokens **reactively on a 401 response**, with a proactive refresh up to five minutes before the stored expiry. To avoid refresh failures:

* Return RFC 6749-compliant error codes (`invalid_grant`, not `invalid_request` or a custom code) when a refresh token is no longer valid
* Honor refresh-token rotation correctly if you rotate tokens

## Enterprise authentication

Claude uses a **single shared OAuth application per connector**. Tenant-level isolation and enterprise-specific OAuth clients are not supported. Enterprise customers connect to the same OAuth app as everyone else; access is scoped by the user's own permissions on your service.

## Custom connectors

When a user adds a custom connector by URL, the OAuth Client Secret field is **optional**. Supply it only if your authorization server requires confidential-client authentication.

## Network reference

Anthropic's outbound traffic to your server originates from `160.79.104.0/21`. See the [IP address reference](https://platform.claude.com/docs/en/api/ip-addresses) if you need to allowlist Anthropic for conditional access or firewall rules.
