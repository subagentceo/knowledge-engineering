---
title: Managed OAuth
description: Allow non-browser clients to authenticate with Access-protected applications using a standard OAuth 2.0 flow.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed OAuth

When you protect an application with Cloudflare Access, by default non-browser clients — such as CLIs, AI agents, SDKs, and scripts — cannot complete the browser-based login redirect. They receive a `302` redirect with no usable token or authorization endpoint.

Managed OAuth solves this by turning Access into a standard OAuth 2.0 authorization server for your application. Access enforces the same policies as a browser login, and your origin sees no difference.

Note

If you run your own OAuth server behind an Access application and rely on your own `WWW-Authenticate` headers, do not enable this feature. Enabling managed OAuth replaces the `401` response behavior on the protected application.

## Prerequisites

* A [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) or an [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/)
* An OAuth client that supports [RFC 8707 ↗](https://datatracker.ietf.org/doc/html/rfc8707)

## Enable managed OAuth on a self-hosted application

* [ Dashboard ](#tab-panel-7103)
* [ API ](#tab-panel-7104)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Find the application you want to configure, then select the three dots on the right > **Edit**.
3. Go to the **Advanced settings** tab and turn on **Managed OAuth**.
4. (Optional) Configure [Managed OAuth settings](#managed-oauth-settings).
5. Select **Save**.

1. Get your existing Access application configuration:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
Get an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Make a `PUT` request and set `oauth_configuration.enabled` to `true`. To avoid overwriting your existing configuration, the request body should contain all fields returned by the previous `GET` request.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Update an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "oauth_configuration": {  
        "enabled": true  
    }  
  }'  
```

To test, open an RFC 8707-compliant OAuth client and make a request to your application. The client should open a browser window prompting you to log in to Access. Refer to the [Authorization flow](#authorization-flow) section for more details.

## Enable managed OAuth on an MCP server portal

Managed OAuth is available on [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) and is the mechanism that allows MCP clients to authenticate users through the portal without a browser cookie flow.

* [ Dashboard ](#tab-panel-7105)
* [ API ](#tab-panel-7106)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **AI controls**.
2. Find the portal you want to configure, then select the three dots on the right > **Edit**.
3. Go to the **Advanced settings** tab, turn on **Managed OAuth**.
4. (Optional) Configure [Managed OAuth settings](#managed-oauth-settings).
5. Select **Save**.

1. Get your existing configuration for the portal's underlying Access application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
Get an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Make a `PUT` request and set `oauth_configuration.enabled` to `true`. To avoid overwriting your existing configuration, the request body should contain all fields returned by the previous `GET` request.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Update an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "oauth_configuration": {  
        "enabled": true  
    }  
  }'  
```

To test, open an MCP client and [connect to the MCP portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#connect-to-a-portal). The client should open a browser window prompting you to log in to Access. Refer to the [Authorization flow](#authorization-flow) section for more details.

## Managed OAuth settings

* [ Dashboard ](#tab-panel-7107)
* [ API ](#tab-panel-7108)

Configure these settings in the **Advanced settings** tab of your [self-hosted app](#enable-managed-oauth-on-a-self-hosted-application) or [MCP server portal](#enable-managed-oauth-on-an-mcp-server-portal).

* **Allow localhost clients**: Allow any client with redirect URIs on `localhost`.
* **Allow loopback clients**: Allow any client with redirect URIs on `127.0.0.1`.
* **Allowed redirect URIs**: Redirect URIs allowed for dynamically registered clients (for example, `https://playground.ai.cloudflare.com/*`). The URL must use `https`. Paths may end in `/*` to match all sub-paths.
* **Grant session duration**: How long the OAuth refresh token remains valid.
* **Access token lifetime**: How long an OIDC Access token can be used to authenticate with your application. Cloudflare recommends configuring a short **Access token lifetime** (default 15 minutes) in conjunction with a longer **Grant session duration**. When the access token expires, Cloudflare uses the refresh token to issue a new one after re-evaluating the user against your Access policies. When the refresh token expires, the user must re-authenticate with the identity provider.

Recommended configuration for CLI and agent use cases

For CLI tools, AI agents, and other non-browser clients, set a short access token lifetime (5–15 minutes) with a longer grant session duration (1–2 weeks). With this configuration:

* The client refreshes tokens silently in the background using the refresh token — no user interaction required.
* Access policies are re-evaluated on each token refresh, maintaining continuous identity verification.
* The user only sees the authorization prompt when the grant session (refresh token) expires.

For example, with a 15-minute access token and a 2-week grant session, a user authenticates once via the browser and then works uninterrupted for up to two weeks before needing to re-authenticate.

Configure these settings via the `oauth_configuration` object on the [Access applications](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/update/) endpoint.

| Dashboard setting       | API field                                               |
| ----------------------- | ------------------------------------------------------- |
| Allow localhost clients | dynamic\_client\_registration.allow\_any\_on\_localhost |
| Allow loopback clients  | dynamic\_client\_registration.allow\_any\_on\_loopback  |
| Allowed redirect URIs   | dynamic\_client\_registration.allowed\_uris             |
| Grant session duration  | grant.session\_duration                                 |
| Access token lifetime   | grant.access\_token\_lifetime                           |

1. Get your existing Access application configuration:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
Get an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Make a `PUT` request with your Managed OAUth settings. To avoid overwriting your existing configuration, the request body should contain all fields returned by the previous `GET` request.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Update an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "oauth_configuration": {  
        "enabled": true,  
        "dynamic_client_registration": {  
            "enabled": true,  
            "allow_any_on_localhost": true,  
            "allow_any_on_loopback": true,  
            "allowed_uris": [  
                "https://playground.ai.cloudflare.com/*"  
            ]  
        },  
        "grant": {  
            "access_token_lifetime": "5m",  
            "session_duration": "24h"  
        }  
    }  
  }'  
```

## Authorization flow

When managed OAuth is enabled, Access returns a `401` response instead of a `302` redirect to non-browser clients. The `401` includes a `WWW-Authenticate` header that points the client to Access's OAuth discovery metadata.

The authorization flow proceeds as follows:

1. The client fetches the OAuth authorization server metadata from the `/.well-known/` endpoint:  
```  
https://<your-app-domain>/.well-known/oauth-authorization-server  
```  
This endpoint conforms to [RFC 8414 ↗](https://datatracker.ietf.org/doc/html/rfc8414) and [RFC 9728 ↗](https://datatracker.ietf.org/doc/html/rfc9728) and returns the authorization and token endpoint URLs for the application.
2. The client initiates an authorization code flow. It opens the user's browser to the Access authorization endpoint, where the user logs in to their IdP as usual.
3. Access issues an OAuth access token to the client. The client uses this token in subsequent requests to the protected application.

### Token format

Managed OAuth issues **opaque** access tokens (for example, `oauth:CvNoo...`), not JSON Web Tokens (JWTs). This is by design — the OAuth flow gives clients the ability to make requests on a user's behalf without exposing identity information to the client.

When a client presents an opaque token to your application, Cloudflare resolves the token into the user's identity on the backend and forwards a signed assertion to your origin. From your origin's perspective, the request looks the same as a browser-authenticated request.

Because the token is opaque, the client cannot decode it or forward it directly as a JWT to other applications. To make authenticated requests to downstream Access applications, use the [Linked App Token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/) pattern — your origin reads the `Cf-Access-Jwt-Assertion` header and forwards it to downstream apps as `Cf-Access-Token`.

### Multi-domain applications

If your Access application is configured with [multiple domains](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#multi-domain-applications), an OAuth token obtained through any one domain is valid for all domains in the same application. The user authenticates once and can use the same token to access all domains without additional prompts.

This is useful when you have multiple internal services that share a common trust boundary. Instead of configuring separate Access applications with [Linked App Token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/) policies, you can add all domains to a single application and authenticate once via Managed OAuth.

Note

Consolidating domains into a single Access application means all domains share the same Access policies. If you need per-domain policy separation, use separate applications with the [Linked App Token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/) pattern instead.

## Managed OAuth vs service tokens

Both managed OAuth and [service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) allow non-browser clients to authenticate with Access-protected applications, but they serve different use cases:

| Managed OAuth             | Service tokens                                                                   |                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication model**  | User-based — the end user logs in through their identity provider                | Machine-based — a shared secret authenticates the service itself                                                                 |
| **Best for**              | Interactive CLI tools, AI agents, SDKs where a human initiates the request       | Fully automated systems, cron jobs, CI/CD pipelines, server-to-server communication                                              |
| **User identity**         | Access knows which user made the request                                         | No user identity — requests are attributed to the service token                                                                  |
| **Policy enforcement**    | Can use identity-based policies (for example, require specific groups or emails) | Requires a [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) policy action |
| **Credential management** | No shared secrets to distribute — users authenticate with their own credentials  | Requires distributing and rotating Client ID and Client Secret                                                                   |

Use managed OAuth when you want non-browser clients to authenticate users the same way a browser would — the user logs in once, and the client receives an OAuth token to make requests on their behalf.

Use service tokens when no human is involved and you need a machine identity to access your application programmatically.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#page","headline":"Managed OAuth · Cloudflare One docs","description":"Allow non-browser clients to authenticate with Access-protected applications using a standard OAuth 2.0 flow.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/managed-oauth/","name":"Managed OAuth"}}]}
```
