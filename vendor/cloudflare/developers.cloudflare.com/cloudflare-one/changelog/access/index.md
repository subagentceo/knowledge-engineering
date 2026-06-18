---
title: Access
description: Review recent changes to Cloudflare Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/access.xml) 

## 2026-06-04

  
**Share identity providers across accounts with IdP federation**   

Cloudflare Access now supports [IdP federation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/), which allows organizations to share a single identity provider across multiple Cloudflare accounts.

Instead of configuring the same IdP (for example, Okta or Entra ID) separately in every account, you configure it once in a source account and share it with the other accounts in your organization. Each recipient account gets a read-only IdP connection that routes authentication back to the source account through a bridge — a hidden application in the source account that brokers the cross-account login. End users sign in with their existing IdP credentials, and each account's Access policies evaluate the resulting identity just like any other IdP login.

Key capabilities:

* **One IdP, many accounts** — Configure your IdP once and share it with all accounts in your organization.
* **Lifecycle management** — As accounts join or leave your Cloudflare organization, their IdP connections are provisioned and removed automatically — no manual cleanup required.
* **Immutable recipient connections** — IdP connections in recipient accounts cannot be accidentally modified or deleted.

To get started, refer to [IdP federation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/).

## 2026-06-03

  
**SAML assertion encryption for identity providers**   

Cloudflare Access now supports SAML assertion encryption for identity provider integrations. When turned on, your identity provider encrypts SAML assertions using a Cloudflare-managed certificate before sending them through the user's browser. Only Access can decrypt these assertions, protecting sensitive identity data even after TLS termination.

Without encryption, SAML assertions are transmitted in plaintext and could be visible to browser extensions or client-side malware.

![SAML encryption toggle in the identity provider configuration](https://developers.cloudflare.com/_astro/saml-encryption.J5jmiYv8_ZkhXFT.webp) 

SAML encryption includes built-in certificate lifecycle management:

* **Automatic certificate generation**: Access generates an encryption certificate when you turn on SAML encryption for an identity provider.
* **Certificate rotation**: Rotate certificates without downtime. The previous certificate remains valid until expiration, giving you time to update your IdP.
* **PEM export**: Copy the certificate in PEM format for manual upload to your IdP, or point your IdP to the SAML metadata endpoint for automatic retrieval.

To get started, refer to [Encrypt SAML assertions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#encrypt-saml-assertions).

## 2026-05-28

  
**Tool and prompt aliases for MCP server portals**   

When you connect third-party MCP servers through [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/), you have no control over how the server author named tools or wrote descriptions. Unclear names make it harder for AI agents to select the right tool and harder for users to understand what is available.

You can now [rename tools and prompts](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#rename-tools-and-prompts-with-aliases) and rewrite their descriptions directly on the portal, without modifying the upstream server. For example, a tool named `super_cool_tool` can become `search_customer_records` with a description tailored to your organization.

![Edit tool modal showing name and description fields for an MCP server tool](https://developers.cloudflare.com/_astro/portal-edit-tool-modal.DrxORhBl_Z1NtRnj.webp) 

Modified tools display a **Modified** label in the tools list so administrators can see which tools have been customized at a glance.

![Tools authorized list showing a modified label on a renamed tool](https://developers.cloudflare.com/_astro/portal-tools-authorized-modified.B674Xvip_12xxcK.webp) 

Aliases override the metadata that MCP clients receive. You can set them at two levels:

* **Per portal**: Applies only within a specific portal. Takes precedence over server-level aliases.
* **Per server**: Applies across all portals that use the server.

You can reset an alias at any time to restore the original upstream name.

For more information, refer to [Tool and prompt aliases](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#rename-tools-and-prompts-with-aliases).

## 2026-05-19

  
**Cloudflare as identity provider and account membership selector**   

Cloudflare Access now supports using Cloudflare itself as an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/). If you publish an Access application and select Cloudflare as the login method, users can sign in with their existing Cloudflare account — no one-time PINs, no third-party IdP configuration, and no shared email inboxes. Authentication is backed by Cloudflare's own account security (including multi-factor authentication), making it both simpler to set up and more secure than OTP-based login for most use cases.

Cloudflare is now the **default identity provider for all newly created Zero Trust accounts**, replacing One-time PIN.

This also enables two new capabilities:

* **Cloudflare Account Member selector** — A new [policy selector](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#cloudflare-access-selectors) that matches users based on their membership in a Cloudflare account. You can target the current account or specify a different account ID for cross-account access scenarios.
* **Restrict to account members** — An identity provider configuration option that limits authentication to users who are members of your Cloudflare account.

To get started, add Cloudflare as an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/) in your Zero Trust settings.

## 2026-05-12

  
**Refreshed Access login page**   

The [Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and [one-time password (OTP)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) page now feature a refreshed design that improves visual consistency, user trust, and mobile responsiveness.

**Before:**

![Screenshot of the previous Access login page](https://developers.cloudflare.com/_astro/access-login-old.CwNVkCQH_Z187ARH.webp) 

**After:**

![Screenshot of the updated Access login page](https://developers.cloudflare.com/_astro/access-login-new.Y7WUfg9G_1QeY33.webp) 

The updated login experience includes:

* **Unified authentication card** \- All sign-in options (identity provider buttons, email input, OTP) now appear in a single card with consistent styling, replacing the previous multi-section layout.
* **Consistent button styling** \- Identity provider buttons use a uniform size and layout for easier scanning and selection.
* **Better mobile experience** \- Responsive layout improvements ensure the login page renders correctly on phones and tablets.
* **Dark mode support** \- The login page now supports dark mode.

## 2026-04-23

  
**AAGUID restrictions and AMR matching for Access independent MFA**   

[Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) in Cloudflare Access now supports two additional organization-level controls:

* **[Restrict authenticators by AAGUID](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#restrict-authenticators-by-aaguid)** — Limit enrollment to a specific set of WebAuthn authenticators using their [AAGUID ↗](https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-registry-v2.0-id-20180227.html#authenticator-attestation-guid). This is useful for organizations that require FIPS-validated security keys or company-issued hardware. AAGUIDs are managed through a new [List](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) type.
* **[AMR matching](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#use-identity-provider-mfa)** — Skip the independent MFA prompt when the identity provider has already performed an equivalent MFA. Access reads the `amr` claim defined in [RFC 8176 ↗](https://datatracker.ietf.org/doc/html/rfc8176) and matches supported values such as `hwk`, `otp`, and `fpt` to the authenticator types allowed on the application or policy. This prevents users from having to complete MFA twice when their identity provider already enforces it.

To get started, refer to [Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/).

## 2026-04-17

  
**Homepage and sign-out for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) display a homepage when users visit the portal domain in a browser.

![MCP server portal homepage showing connection status and setup instructions](https://developers.cloudflare.com/_astro/portals-homepage-disconnected.BHbOwayQ_Z1G37WD.webp) 

The homepage shows:

* The portal name and organization branding
* The MCP endpoint URL with a copy button
* Per-client connection instructions for Claude Desktop, Workers AI Playground, OpenCode, Windsurf, and other MCP clients

Authenticated users see their email address and a **Sign out** button. Selecting **Sign out** revokes all portal-level OAuth grants, deletes upstream server OAuth states, and redirects through Cloudflare Access logout. A confirmation page shows a summary of the revoked sessions.

For more information, refer to [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#portal-homepage).

## 2026-04-15

  
**Independent MFA for Access applications**   

Cloudflare Access now supports independent multi-factor authentication (MFA), allowing you to enforce MFA requirements without relying on your identity provider (IdP). With per-application and per-policy configuration, you can enforce stricter authentication methods like hardware security keys on sensitive applications without requiring them across your entire organization. This reduces the risk of MFA fatigue for your broader user population while adding additional security where it matters most.

This feature also addresses common gaps in IdP-based MFA, such as inconsistent MFA policies across different identity providers or the need for additional security layers beyond what the IdP provides.

Independent MFA supports the following authenticator types:

* **Authenticator application** — Time-based one-time passwords (TOTP) using apps like Google Authenticator, Microsoft Authenticator, or Authy.
* **Security key** — Hardware security keys such as YubiKeys.
* **Biometrics** — Built-in device authenticators including Apple Touch ID, Apple Face ID, and Windows Hello.

Note

Infrastructure applications do not yet support independent MFA.

#### Configuration levels

You can configure MFA requirements at three levels:

| Level            | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Organization** | Enforce MFA by default for all applications in your account.   |
| **Application**  | Require or turn off MFA for a specific application.            |
| **Policy**       | Require or turn off MFA for users who match a specific policy. |

Settings at lower levels (policy) override settings at higher levels (organization), giving you granular control over MFA enforcement.

#### User enrollment

Users enroll their authenticators through the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/). To help with onboarding, administrators can share a direct enrollment link: `<your-team-name>.cloudflareaccess.com/AddMfaDevice`.

To get started with Independent MFA, refer to [Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/).

## 2026-04-02

  
**Session management for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support in-session management of upstream MCP server connections. Users can return to the server selection page at any time to enable or disable servers, reauthenticate, or change which data a server has access to — all without leaving their MCP client.

To return to the server selection page, ask your AI agent with a prompt like "take me back to the server selection page." The portal responds with an authorization URL via [MCP elicitation ↗](https://modelcontextprotocol.io/specification/2025-03-26/server/elicitation) that you open in your browser:

```

https://<subdomain>.<domain>/authorize?elicitationId=<ELICITATION_ID>


```

From the server selection page you can:

* **Enable or disable servers** — Toggle individual upstream MCP servers on or off. Disabling a server removes its tools from the active session, which reduces context window usage.
* **Log out and reauthenticate** — Log out of a server and log back in to change which data the server has access to, or to reauthenticate with different permissions.

Users can also enable or disable a server inline by asking their AI agent directly, for example "enable the wiki server" or "disable my Jira server."

The portal also automatically prompts connected users to authorize new servers when an admin adds them to the portal. This requires the use of [managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#enable-managed-oauth-on-an-mcp-server-portal).

For more information, refer to [Manage portal sessions](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#manage-portal-sessions).

## 2026-04-01

  
**Logs UI refresh**   

Access authentication logs and Gateway activity logs (DNS, Network, and HTTP) now feature a refreshed user interface that gives you more flexibility when viewing and analyzing your logs.

![Screenshot of the new logs UI showing DNS query logs with customizable columns and filtering options](https://developers.cloudflare.com/_astro/cf1-new-logs-ui.DxF4x0l-_mRSyH.webp) 

The updated UI includes:

* **Filter by field** \- Select any field value to add it as a filter and narrow down your results.
* **Customizable fields** \- Choose which fields to display in the log table. Querying for fewer fields improves log loading performance.
* **View details** \- Select a timestamp to view the full details of a log entry.
* **Switch to classic view** \- Return to the previous log viewer interface if needed.

For more information, refer to [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/) and [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/).

## 2026-03-26

  
**Code mode for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support [code mode](https://developers.cloudflare.com/agents/model-context-protocol/protocol/codemode/), a technique that reduces context window usage by replacing individual tool definitions with a single code execution tool. Code mode is turned on by default on all portals.

To turn it off, edit the portal in **Access controls** \> **AI controls** and turn off **Code mode** under **Basic information**.

When code mode is active, the portal exposes a single `code` tool instead of listing every tool from every upstream MCP server. The connected AI agent writes JavaScript that calls typed `codemode.*` methods for each upstream tool. The generated code runs in an isolated [Dynamic Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) environment, keeping authentication credentials and environment variables out of the model context.

To use code mode, append `?codemode=search_and_execute` to your portal URL when connecting from an MCP client:

```

https://<subdomain>.<domain>/mcp?codemode=search_and_execute


```

For more information, refer to [code mode](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#code-mode).

## 2026-03-26

  
**Context optimization for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support two context optimization options that reduce how many tokens tool definitions consume in the model's context window. Both options are activated by appending the `optimize_context` query parameter to the portal URL.

#### `minimize_tools`

Strips tool descriptions and input schemas from all upstream tools, leaving only their names. The portal exposes a special `query` tool that agents use to retrieve full definitions on demand. This provides up to 5x savings in token usage.

```

https://<subdomain>.<domain>/mcp?optimize_context=minimize_tools


```

#### `search_and_execute`

Hides all upstream tools and exposes only two tools: `query` and `execute`. The `query` tool searches and retrieves tool definitions. The `execute` tool runs the upstream tools in an isolated [Dynamic Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) environment. This reduces the initial token cost to a small constant, regardless of how many tools are available through the portal.

```

https://<subdomain>.<domain>/mcp?optimize_context=search_and_execute


```

For more information, refer to [Optimize context](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#optimize-context).

## 2026-03-20

  
**Managed OAuth for Cloudflare Access**   

Cloudflare Access supports managed OAuth, which allows non-browser clients — such as CLIs, AI agents, SDKs, and scripts — to authenticate with Access-protected applications using a standard OAuth 2.0 authorization code flow.

Previously, non-browser clients that attempted to access a protected application received a `302` redirect to a login page they could not complete. The established workaround was `cloudflared access curl`, which required installing additional tooling.

With managed OAuth, clients instead receive a `401` response with a `WWW-Authenticate` header that points to Access's OAuth discovery endpoints ([RFC 8414 ↗](https://datatracker.ietf.org/doc/html/rfc8414) and [RFC 9728 ↗](https://datatracker.ietf.org/doc/html/rfc9728)). The client opens the end user's browser to the Access login page. The end user authenticates with their identity provider, and the client receives an OAuth access token for subsequent requests.

Access enforces the same policies as a browser login; the OAuth layer is a new transport mechanism, not a separate authentication path.

Managed OAuth can be enabled on any self-hosted Access application or [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/). It is opt-in for existing applications to avoid interfering with those that run their own OAuth servers and rely on their own `WWW-Authenticate` headers.

Note

For MCP server portals, managed OAuth is enabled by default on new portals. It remains opt-in for self-hosted applications.

To enable managed OAuth, go to **Zero Trust** \> **Access controls** \> **Applications**, edit the application, and turn on **Managed OAuth** under **Advanced settings**.

You can also enable it via the API by setting `oauth_configuration.enabled` to `true` on the [Access applications endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/update/).

![Managed OAuth settings in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/managed-oauth.BirLnBpy_Zjg97R.webp) 

For setup instructions, refer to [Enable managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/).

## 2026-03-20

  
**Route MCP server portal traffic through Cloudflare Gateway**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) can now route traffic through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) for richer HTTP request logging and data loss prevention (DLP) scanning.

When Gateway routing is turned on, portal traffic appears in your [Gateway HTTP logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/). You can create [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) with [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) to detect and block sensitive data sent to upstream MCP servers.

Note

DLP [AI prompt profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#ai-prompt) do not apply to MCP server portal traffic.

To enable Gateway routing, go to **Access controls** \> **AI controls**, edit the portal, and turn on **Route traffic through Cloudflare Gateway** under **Basic information**.

![Route MCP server portal traffic through Cloudflare Gateway](https://developers.cloudflare.com/_astro/portal-route-through-gateway.0KMUAXBm_Z1B5rry.webp) 

For more details, refer to [Route traffic through Gateway](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#route-portal-traffic-through-gateway).

## 2026-03-04

  
**User risk score selector in Access policies**   

You can now use [user risk scores](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/) in your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). The new **User Risk Score** selector allows you to create Access policies that respond to user behavior patterns detected by Cloudflare's risk scoring system, including impossible travel, high DLP policy matches, and more.

For more information, refer to [Use risk scores in Access policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#use-risk-scores-in-access-policies).

## 2026-03-01

  
**Clipboard controls for browser-based RDP**   

You can now configure clipboard controls for browser-based RDP with Cloudflare Access. Clipboard controls allow administrators to restrict whether users can copy or paste text between their local machine and the remote Windows server.

![Enable users to copy and paste content from their local machine to remote RDP sessions in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/rdp-clipboard-controls.B0ZmliDb_Z1Ne5yg.webp) 

This feature is useful for organizations that support bring-your-own-device (BYOD) policies or third-party contractors using unmanaged devices. By restricting clipboard access, you can prevent sensitive data from being transferred out of the remote session to a user's personal device.

#### Configuration options

Clipboard controls are configured per policy within your Access application. For each policy, you can independently allow or deny:

* **Copy from local client to remote RDP session** — Users can copy/paste text from their local machine into the browser-based RDP session.
* **Copy from remote RDP session to local client** — Users can copy/paste text from the browser-based RDP session to their local machine.

By default, both directions are denied for new policies. For existing Access applications created before this feature was available, clipboard access remains enabled to preserve backwards compatibility.

When a user attempts a restricted clipboard action, the clipboard content is replaced with an error message informing them that the action is not allowed.

For more information, refer to [Clipboard controls for browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/#clipboard-controls).

## 2026-02-27

  
**Export MCP server portal logs with Logpush**   

Availability

Only available on Enterprise plans.

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) now supports [Logpush](https://developers.cloudflare.com/logs/logpush/) integration. You can automatically export MCP server portal activity logs to third-party storage destinations or security information and event management (SIEM) tools for analysis and auditing.

#### Available log fields

The MCP server portal logs dataset includes fields such as:

* `Datetime` — Timestamp of the request
* `PortalID` / `PortalAUD` — Portal identifiers
* `ServerID` / `ServerURL` — Upstream MCP server details
* `Method` — JSON-RPC method (for example, `tools/call`, `prompts/get`, `resources/read`)
* `ToolCallName` / `PromptGetName` / `ResourceReadURI` — Method-specific identifiers
* `UserID` / `UserEmail` — Authenticated user information
* `Success` / `Error` — Request outcome
* `ServerResponseDurationMs` — Response time from upstream server

For the complete field reference, refer to [MCP portal logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/mcp%5Fportal%5Flogs/).

#### Set up Logpush

To configure Logpush for MCP server portal logs, refer to [Logpush integration](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

Note

MCP server portals is currently in beta.

## 2026-02-17

  
**Streamlined clientless browser isolation for private applications**   

A new **Allow clientless access** setting makes it easier to connect users without a device client to internal applications, without using public DNS.

![Allow clientless access setting in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/allow-clientless-access.BHKwQuVt_1mLRiX.webp) 

Previously, to provide clientless access to a private hostname or IP without a [published application](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#add-a-published-application-route), you had to create a separate [bookmark application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/) pointing to a prefixed [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) URL (for example, `https://<your-teamname>.cloudflareaccess.com/browser/https://10.0.0.1/`). This bookmark was visible to all users in the App Launcher, regardless of whether they had access to the underlying application.

Now, you can manage clientless access directly within your [private self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/). When **Allow clientless access** is turned on, users who pass your Access application policies will see a tile in their App Launcher pointing to the prefixed URL. Users must have [remote browser permissions](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) to open the link.

## 2026-02-17

  
**Policies for bookmark applications**   

You can now assign [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to [bookmark applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/). This lets you control which users see a bookmark in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) based on identity, device posture, and other policy rules.

Previously, bookmark applications were visible to all users in your organization. With policy support, you can now:

* **Tailor the App Launcher to each user** — Users only see the applications they have access to, reducing clutter and preventing accidental clicks on irrelevant resources.
* **Restrict visibility of sensitive bookmarks** — Limit who can view bookmarks to internal tools or partner resources based on group membership, identity provider, or device posture.

Bookmarks support all [Access policy configurations](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) except purpose justification, temporary authentication, and application isolation. If no policy is assigned, the bookmark remains visible to all users (maintaining backwards compatibility).

For more information, refer to [Add bookmarks](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/).

## 2026-02-13

  
**Fine-grained permissions for Access policies and service tokens**   

Fine-grained permissions for **Access policies** and **Access service tokens** are available. These new resource-scoped roles expand the existing RBAC model, enabling administrators to grant permissions scoped to individual resources.

#### New roles

* **Cloudflare Access policy admin**: Can edit a specific [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) in an account.
* **Cloudflare Access service token admin**: Can edit a specific [Access service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) in an account.

These roles complement the existing resource-scoped roles for Access applications, identity providers, and infrastructure targets.

For more information:

* [Resource-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles)
* [Role scopes](https://developers.cloudflare.com/fundamentals/manage-members/scope/)

Note

Resource-scoped roles is currently in beta.

## 2026-01-22

  
**Require Access protection for zones**   

You can now require Cloudflare Access protection for all hostnames in your account. When enabled, traffic to any hostname that does not have a matching Access application is automatically blocked.

This deny-by-default approach prevents accidental exposure of internal resources to the public Internet. If a developer deploys a new application or creates a DNS record without configuring an Access application, the traffic is blocked rather than exposed.

![Require Cloudflare Access protection in the dashboard](https://developers.cloudflare.com/_astro/require-cloudflare-access-protection.BAUmTYOs_ZxNecb.webp) 

#### How it works

* **Blocked by default**: Traffic to all hostnames in the account is blocked unless an Access application exists for that hostname.
* **Explicit access required**: To allow traffic, create an Access application with an Allow or Bypass policy.
* **Hostname exemptions**: You can exempt specific hostnames from this requirement.

To turn on this feature, refer to [Require Access protection](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/).

## 2026-01-22

  
**New granular API token permissions for Cloudflare Access**   

Three new API token permissions are available for Cloudflare Access, giving you finer-grained control when building automations and integrations:

* **Access: Organizations Revoke** — Grants the ability to [revoke user sessions](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#revoke-user-sessions) in a Zero Trust organization. Use this permission when you need a token that can terminate active sessions without broader write access to organization settings.
* **Access: Population Read** — Grants read access to the [SCIM users and groups](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) synced from an identity provider to Cloudflare Access. Use this permission for tokens that only need to read synced user and group data.
* **Access: Population Write** — Grants write access to the [SCIM users and groups](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) synced from an identity provider to Cloudflare Access. Use this permission for tokens that need to create or modify synced user and group data.

These permissions are scoped at the account level and can be combined with existing Access permissions.

For a full list of available permissions, refer to [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/).

## 2026-01-08

  
**Cloudflare admin activity logs capture creation of DNS over HTTP (DoH) users**   

Cloudflare [admin activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) now capture each time a [DNS over HTTP (DoH) user](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/) is created.

These logs can be viewed from the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com/), pulled via the [Cloudflare API](https://developers.cloudflare.com/api/), and exported through [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## 2025-11-14

  
**Generate Cloudflare Access SSH certificate authority (CA) directly from the Cloudflare dashboard**   

SSH with [Cloudflare Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) allows you to use short-lived SSH certificates to eliminate SSH key management and reduce security risks associated with lost or stolen keys.

Previously, users had to generate this certificate by using the [Cloudflare API ↗](https://developers.cloudflare.com/api/) directly. With this update, you can now create and manage this certificate in the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com) from the **Access controls** \> **Service credentials** page.

![Navigate to Access controls and then Service credentials to see where you can generate an SSH CA](https://developers.cloudflare.com/_astro/SSH-CA-generation.DYa9RnX1_ZKuDAo.webp) 

For more details, refer to [Generate a Cloudflare SSH CA](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#generate-a-cloudflare-ssh-ca).

## 2025-10-28

  
**Access private hostname applications support all ports/protocols**   

[Cloudflare Access for private hostname applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) can now secure traffic on all ports and protocols.

Previously, applying Zero Trust policies to private applications required the application to use HTTPS on port `443` and support Server Name Indicator (SNI).

This update removes that limitation. As long as the application is reachable via a Cloudflare off-ramp, you can now enforce your critical security controls — like single sign-on (SSO), MFA, device posture, and variable session lengths — to any private application. This allows you to extend Zero Trust security to services like SSH, RDP, internal databases, and other non-HTTPS applications.

![Example private application on non-443 port](https://developers.cloudflare.com/_astro/internal_private_app_any_port.DNXnEy0u_2rybRJ.webp) 

For example, you can now create a self-hosted application in Access for `ssh.testapp.local` running on port `22`. You can then build a policy that only allows engineers in your organization to connect after they pass an SSO/MFA check and are using a corporate device.

This feature is generally available across all plans.

## 2025-10-02

  
**Fine-grained Permissioning for Access for Apps, IdPs, & Targets now in Public Beta**   

Fine-grained permissions for **Access Applications, Identity Providers (IdPs), and Targets** is now available in Public Beta. This expands our RBAC model beyond account & zone-scoped roles, enabling administrators to grant permissions scoped to individual resources.

#### What's New

* **[Access Applications ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)**: Grant admin permissions to specific Access Applications.
* **[Identity Providers ↗](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/)**: Grant admin permissions to individual Identity Providers.
* **[Targets ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#1-add-a-target)**: Grant admin rights to specific Targets
![Updated Permissions Policy UX](https://developers.cloudflare.com/_astro/2025-10-01-fine-grained-permissioning-ux.BWVmQsVF_Z1p4MJh.webp) 

Note 

During the public beta, members must also be assigned an account-scoped, read only role to view resources in the dashboard. This restriction will be lifted in a future release.

* **Account Read Only** plus a fine-grained permission for a specific App, IdP, or Target
* **Cloudflare Zero Trust Read Only** plus fine-grained permission for a specific App, IdP, or Target

For more info:

* [Get started with Cloudflare Permissioning](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
* [Manage Member Permissioning via the UI & API](https://developers.cloudflare.com/fundamentals/manage-members/manage)

## 2025-09-22

  
**Access Remote Desktop Protocol (RDP) destinations securely from your browser — now generally available!**   

[Browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) is now generally available for all Cloudflare customers. It enables secure, remote Windows server access without VPNs or RDP clients.

Since we announced our [open beta](https://developers.cloudflare.com/changelog/access/#2025-06-30), we've made a few improvements:

* Support for targets with IPv6.
* Support for [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as on-ramps.
* More robust error messaging on the login page to help you if you encounter an issue.
* Worldwide keyboard support. Whether your day-to-day is in Portuguese, Chinese, or something in between, your browser-based RDP experience will look and feel exactly like you are using a desktop RDP client.
* Cleaned up some other miscellaneous issues, including but not limited to enhanced support for Entra ID accounts and support for usernames with spaces, quotes, and special characters.

As a refresher, here are some benefits browser-based RDP provides:

* **Control how users authenticate to internal RDP resources** with single sign-on (SSO), multi-factor authentication (MFA), and granular access policies.
* **Record who is accessing which servers and when** to support regulatory compliance requirements and to gain greater visibility in the event of a security event.
* **Eliminate the need to install and manage software on user devices**. You will only need a web browser.
* **Reduce your attack surface** by keeping your RDP servers off the public Internet and protecting them from common threats like credential stuffing or brute-force attacks.
![Example of a browser-based RDP Access application](https://developers.cloudflare.com/_astro/browser-based-rdp-access-app.BNXce1JL_1TDoUX.webp) 

To get started, refer to [Connect to RDP in a browser](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

## 2025-08-26

  
**Manage and restrict access to internal MCP servers with Cloudflare Access**   

You can now control who within your organization has access to internal MCP servers, by putting internal MCP servers behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

[Self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/linked-apps/) in Cloudflare Access now support OAuth for MCP server authentication. This allows Cloudflare to delegate access from any self-hosted application to an MCP server via OAuth. The OAuth access token authorizes the MCP server to make requests to your self-hosted applications on behalf of the authorized user, using that user's specific permissions and scopes.

For example, if you have an MCP server designed for internal use within your organization, you can configure Access policies to ensure that only authorized users can access it, regardless of which MCP client they use. Support for internal, self-hosted MCP servers also works with MCP server portals, allowing you to provide a single MCP endpoint for multiple MCP servers. For more on MCP server portals, read the [blog post ↗](https://blog.cloudflare.com/zero-trust-mcp-server-portals/) on the Cloudflare Blog.

## 2025-08-26

  
**MCP server portals**   
![MCP server portal](https://developers.cloudflare.com/_astro/mcp-server-portal.BOKqTCoI_ZXYCcF.webp) 

An [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) centralizes multiple Model Context Protocol (MCP) servers onto a single HTTP endpoint. Key benefits include:

* **Streamlined access to multiple MCP servers**: MCP server portals support both unauthenticated MCP servers as well as MCP servers secured using any third-party or custom OAuth provider. Users log in to the portal URL through Cloudflare Access and are prompted to authenticate separately to each server that requires OAuth.
* **Customized tools per portal**: Admins can tailor an MCP portal to a particular use case by choosing the specific tools and prompt templates that they want to make available to users through the portal. This allows users to access a curated set of tools and prompts — the less external context exposed to the AI model, the better the AI responses tend to be.
* **Observability**: Once the user's AI agent is connected to the portal, Cloudflare Access logs the individual requests made using the tools in the portal.

This is available in an open beta for all customers across all plans! For more information check out our [blog ↗](https://blog.cloudflare.com/zero-trust-mcp-server-portals/) for this release.

## 2025-08-15

  
**SFTP support for SSH with Cloudflare Access for Infrastructure**   

[SSH with Cloudflare Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) now supports SFTP. It is compatible with SFTP clients, such as Cyberduck.

## 2025-08-14

  
**Cloudflare Access Logging supports the Customer Metadata Boundary (CMB)**   

Cloudflare Access logs now support the [Customer Metadata Boundary (CMB)](https://developers.cloudflare.com/data-localization/metadata-boundary/). If you have configured the CMB for your account, all Access logging will respect that configuration.

Note

For EU CMB customers, the logs will not be stored by Access and will appear as empty in the dashboard. EU CMB customers should utilize [Logpush](https://developers.cloudflare.com/logs/logpush/) to retain their Access logging, if desired.

## 2025-07-01

  
**Access RDP securely from your browser — now in open beta**   

[Browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) is now available in open beta for all Cloudflare customers. It enables secure, remote Windows server access without VPNs or RDP clients.

With browser-based RDP, you can:

* **Control how users authenticate to internal RDP resources** with single sign-on (SSO), multi-factor authentication (MFA), and granular access policies.
* **Record who is accessing which servers and when** to support regulatory compliance requirements and to gain greater visibility in the event of a security event.
* **Eliminate the need to install and manage software on user devices**. You will only need a web browser.
* **Reduce your attack surface** by keeping your RDP servers off the public Internet and protecting them from common threats like credential stuffing or brute-force attacks.
![Example of a browsed-based RDP Access application](https://developers.cloudflare.com/_astro/browser-based-rdp-access-app.BNXce1JL_1TDoUX.webp) 

To get started, see [Connect to RDP in a browser](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

## 2025-06-05

  
**Cloudflare One Analytics Dashboards and Exportable Access Report**   

Cloudflare One now offers powerful new analytics dashboards to help customers easily discover available insights into their application access and network activity. These dashboards provide a centralized, intuitive view for understanding user behavior, application usage, and security posture.

!\[Cloudflare One Analytics Dashboards\](\~/assets/images/changelog/cloudflare-one/Analytics Dashboards.png)

Additionally, a new exportable access report is available, allowing customers to quickly view high-level metrics and trends in their application access. A **preview** of the report is shown below, with more to be found in the report:

![Cloudflare One Analytics Dashboards](https://developers.cloudflare.com/_astro/access-report.C744W7JR_2uzMcN.webp) 

Both features are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-05-16

  
**New Access Analytics in the Cloudflare One Dashboard**   

A new Access Analytics dashboard is now available to all Cloudflare One customers. Customers can apply and combine multiple filters to dive into specific slices of their Access metrics. These filters include:

* Logins granted and denied
* Access events by type (SSO, Login, Logout)
* Application name (Salesforce, Jira, Slack, etc.)
* Identity provider (Okta, Google, Microsoft, onetimepin, etc.)
* Users (`chris@cloudflare.com`, `sally@cloudflare.com`, `rachel@cloudflare.com`, etc.)
* Countries (US, CA, UK, FR, BR, CN, etc.)
* Source IP address
* App type (self-hosted, Infrastructure, RDP, etc.)
![Access Analytics](https://developers.cloudflare.com/_astro/accessanalytics.DYXgwZCl_Z2PPi7.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and find Analytics in the side navigation bar.

## 2025-04-21

  
**Access bulk policy tester**   

The [Access bulk policy tester](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#test-all-policies-in-an-application) is now available in the Cloudflare Zero Trust dashboard. The bulk policy tester allows you to simulate Access policies against your entire user base before and after deploying any changes. The policy tester will simulate the configured policy against each user's last seen identity and device posture (if applicable).

![Example policy tester](https://developers.cloudflare.com/_astro/example-policy-tester.DCY8hQvx_2nxAfs.webp) 

## 2025-04-09

  
**Cloudflare Zero Trust SCIM User and Group Provisioning Logs**   

[Cloudflare Zero Trust SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim) now has a full audit log of all create, update and delete event from any SCIM Enabled IdP. The [SCIM logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/) support filtering by IdP, Event type, Result and many more fields. This will help with debugging user and group update issues and questions.

SCIM logs can be found on the Zero Trust Dashboard under **Logs** \-> **SCIM provisioning**.

![Example SCIM Logs](https://developers.cloudflare.com/_astro/example-scim-log.Bv5Zqckh_BY26C.webp) 

## 2025-03-03

  
**New SAML and OIDC Fields and SAML transforms for Access for SaaS**   

[Access for SaaS applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) now include more configuration options to support a wider array of SaaS applications.

**SAML and OIDC Field Additions**

OIDC apps now include:

* Group Filtering via RegEx
* OIDC Claim mapping from an IdP
* OIDC token lifetime control
* Advanced OIDC auth flows including hybrid and implicit flows
![OIDC field additions](https://developers.cloudflare.com/_astro/oidc-claims.2di8l9Lv_ZrD1mx.webp) 

SAML apps now include improved SAML attribute mapping from an IdP.

![SAML field additions](https://developers.cloudflare.com/_astro/saml-attribute-statements.CW45j5Qi_1ydeSQ.webp) 

**SAML transformations**

SAML identities sent to Access applications can be fully customized using JSONata expressions. This allows admins to configure the precise identity SAML statement sent to a SaaS application.

![Configured SAML statement sent to application](https://developers.cloudflare.com/_astro/transformation-box.DyKn-DdN_2rtirg.webp) 

## 2025-01-15

  
**Export SSH command logs with Access for Infrastructure using Logpush**   

Availability

Only available on Enterprise plans.

Cloudflare now allows you to send SSH command logs to storage destinations configured in [Logpush](https://developers.cloudflare.com/logs/logpush/), including third-party destinations. Once exported, analyze and audit the data as best fits your organization! For a list of available data fields, refer to the [SSH logs dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh%5Flogs/).

To set up a Logpush job, refer to [Logpush integration](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## 2024-10-01

  
**Eliminate long-lived credentials and enhance SSH security with Cloudflare Access for Infrastructure**   

Organizations can now eliminate long-lived credentials from their SSH setup and enable strong multi-factor authentication for SSH access, similar to other Access applications, all while generating access and command logs.

SSH with [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/) uses short-lived SSH certificates from Cloudflare, eliminating SSH key management and reducing the security risks associated with lost or stolen keys. It also leverages a common deployment model for Cloudflare One customers: [WARP-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/).

SSH with Access for Infrastructure enables you to:

* **Author fine-grained policy** to control who may access your SSH servers, including specific ports, protocols, and SSH users.
* **Monitor infrastructure access** with Access and SSH command logs, supporting regulatory compliance and providing visibility in case of security breach.
* **Preserve your end users' workflows.** SSH with Access for Infrastructure supports native SSH clients and does not require any modifications to users’ SSH configs.
![Example of an infrastructure Access application](https://developers.cloudflare.com/_astro/infrastructure-app.BhpJOgxs_Z1M0wLH.webp) 

To get started, refer to [SSH with Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/).

## 2025-02-12

**Access policies support filtering**

You can now filter Access policies by their action, selectors, rule groups, and assigned applications.

## 2025-02-11

**Private self-hosted applications and reusable policies GA**

[Private self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) and [reusable Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) are now generally available (GA) for all customers.

## 2025-01-21

**Access Applications support private hostnames/IPs and reusable Access policies.**

Cloudflare Access self-hosted applications can now be defined by [private IPs](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/), [private hostnames](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) (on port 443) and [public hostnames](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). Additionally, we made Access policies into their own object which can be reused across multiple applications. These updates involved significant updates to the overall Access dashboard experience. The updates will be slowly rolled out to different customer cohorts. If you are an Enterprise customer and would like early access, reach out to your account team.

## 2025-01-15

**Logpush for SSH command logs**

Enterprise customers can now use Logpush to export SSH command logs for Access for Infrastructure targets.

## 2024-12-04

**SCIM GA for Okta and Microsoft Entra ID**

Cloudflare's SCIM integrations with [Okta](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#synchronize-users-and-groups) and [Microsoft Entra ID](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#synchronize-users-and-groups) (formerly AzureAD) are now out of beta and generally available (GA) for all customers. These integrations can be used for Access and Gateway policies and Zero Trust user management. Note: This GA release does not include [Dashboard SSO SCIM](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/) support.

## 2024-10-23

**SSH with Access for Infrastructure**

Admins can now use [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) to manage privileged access to SSH servers. Access for Infrastructure provides improved control and visibility over who accessed what service and what they did during their SSH session. Access for Infrastructure also eliminates the risk and overhead associated with managing SSH keys by using short-lived SSH certificates to access SSH servers.

## 2024-08-26

**Reduce automatic seat deprovisioning minimum to 1 month, down from 2 months.**

Admins can now configure Zero Trust seats to [automatically expire](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#enable-seat-expiration) after 1 month of user inactivity. The previous minimum was 2 months.

## 2024-06-06

**Scalability improvements to the App Launcher**

Applications now load more quickly for customers with a large number of applications or complex policies.

## 2024-04-28

**Add option to bypass CORS to origin server**

Access admins can [defer all CORS enforcement to their origin server](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/#bypass-options-requests-to-origin) for specific Access applications.

## 2024-04-15

**Zero Trust User identity audit logs**

All user identity changes via SCIM or Authentication events are logged against a user's registry identity.

## 2024-02-22

**Access for SaaS OIDC Support**

Access for SaaS applications can be setup with OIDC as an authentication method. OIDC and SAML 2.0 are now both fully supported.

## 2024-02-22

**WARP as an identity source for Access**

Allow users to log in to Access applications with their WARP session identity. Users need to reauthenticate based on default session durations. WARP authentication identity must be turned on in your device enrollment permissions and can be enabled on a per application basis.

## 2023-12-20

**Unique Entity IDs in Access for SaaS**

All new Access for SaaS applications have unique Entity IDs. This allows for multiple integrations with the same SaaS provider if required. The unique Entity ID has the application audience tag appended. Existing apps are unchanged.

## 2023-12-15

**Default relay state support in Access for SaaS**

Allows Access admins to set a default relay state on Access for SaaS apps.

## 2023-09-15

**App launcher supports tags and filters**

Access admins can now tag applications and allow users to filter by those tags in the App Launcher.

## 2023-09-15

**App launcher customization**

Allow Access admins to configure the App Launcher page within Zero Trust.

## 2023-09-15

**View active Access user identities in the dashboard and API**

Access admins can now view the full contents of a user's identity and device information for all active application sessions.

## 2023-09-08

**Custom OIDC claims for named IdPs**

Access admins can now add custom claims to the existing named IdP providers. Previously this was locked to the generic OIDC provider.

## 2023-08-02

**Azure AD authentication contexts**

Support Azure AD authentication contexts directly in Access policies.

## 2023-06-23

**Custom block pages for Access applications**

Allow Access admins to customize the block pages presented by Access to end users.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/access/#page","headline":"Access Changelog · Cloudflare One docs","description":"Review recent changes to Cloudflare Access.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/access/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/access/","name":"Access"}}]}
```
