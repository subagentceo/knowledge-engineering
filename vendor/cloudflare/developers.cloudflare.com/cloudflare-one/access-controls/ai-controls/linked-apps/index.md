---
title: Allow MCP servers to access self-hosted applications
description: Allow MCP servers to access self-hosted applications in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Allow MCP servers to access self-hosted applications

MCP servers often need to call internal applications on behalf of authenticated users. For example, an MCP server that helps employees interact with internal tools needs to forward the user's identity to those downstream services (the internal applications the MCP server connects to) so that each request is authorized with the correct permissions.

The [Linked App Token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/) policy selector enables this by allowing an Access policy on one application to accept tokens issued for another. There are two ways to set this up depending on how your MCP server is deployed.

## Self-hosted MCP server (recommended)

If your MCP server is a [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), Cloudflare Access handles authentication automatically. The MCP server receives the user's JWT from Access in the `Cf-Access-Jwt-Assertion` header and should forward it to downstream applications in the `Cf-Access-Token` header. No OAuth implementation is needed in your MCP server code.

flowchart LR
accTitle: Self-hosted MCP server accessing internal applications
    User --> client["MCP client"]
    client --> mcp["MCP server <br> (self-hosted app)"]
    mcp -- "Cf-Access-Token: &lt;JWT&gt;" --> app1["Internal API <br> (self-hosted app)"]
    mcp -- "Cf-Access-Token: &lt;JWT&gt;" --> app2["Company wiki <br> (self-hosted app)"]
    idp[Identity provider] <--> mcp

### Prerequisites

* Add your downstream applications (for example, your `Internal API` and `Company wiki`) as [self-hosted Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).
* Add your MCP server as a [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

### 1\. Configure downstream applications

On each self-hosted application that the MCP server needs to access (for example, the `Internal API` and `Company wiki` apps), create a Linked App Token policy:

* [ Dashboard ](#tab-panel-7081)
* [ API ](#tab-panel-7082)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select the downstream application and select **Edit**.
3. Go to the **Policies** tab and select **Create new policy**.
4. Set the policy **Action** to _Service Auth_.  
Note  
The Linked App Token selector only works with the [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) action, similar to service token rules.
5. For **Selector**, select _Linked App Token_.
6. For **Value**, select the MCP server application. For example,  
| Action       | Rule type | Selector         | Value          |  
| ------------ | --------- | ---------------- | -------------- |  
| Service Auth | Include   | Linked App Token | mcp-server-app |
7. Save the policy.
8. In the downstream application, add the policy to the **Access policies** list.
9. Save the application.

1. Get the `uid` of the MCP server application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Revoke`  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
List Access applications  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
Response  
```  
{  
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  
  "uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  
  "type": "self_hosted",  
  "name": "mcp-server-app",  
  ...  
}  
```
2. Create an Access policy on the downstream application, replacing the `app_uid` value with the `uid` of the MCP server application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Create an Access reusable policy  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Allow requests from MCP server",  
    "decision": "non_identity",  
    "include": [  
        {  
            "linked_app_token": {  
                "app_uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  
            }  
        }  
    ]  
  }'  
```  
Note  
The `linked_app_token` rule type only works with [non\_identity decisions](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth), similar to service token rules.

### 2\. Configure your MCP server

In your MCP server code, forward the `Cf-Access-Jwt-Assertion` header from incoming requests as the `Cf-Access-Token` header on outgoing requests to the downstream application:

```

Cf-Access-Token: <JWT from Cf-Access-Jwt-Assertion>


```

Access will now validate the JWT token against the Linked App Token rule and propagate the user's identity to the downstream application.

## SaaS MCP server (Access for SaaS with OAuth)

If your MCP server is registered as an [Access for SaaS OIDC application](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/) and implements [MCP OAuth ↗](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization), it receives an OAuth `access_token` from Cloudflare Access. The MCP server forwards this token to downstream self-hosted applications in the `Authorization: Bearer` header.

This approach requires your MCP server to implement the OAuth authorization code flow. Use the [self-hosted MCP server approach](#self-hosted-mcp-server-recommended) if you want Cloudflare to handle authentication for you.

flowchart LR
accTitle: SaaS MCP server accessing internal applications
    User --> client["MCP client"]
    client --> mcp["MCP server <br> (Access for SaaS app)"]
    mcp -- "Authorization: Bearer &lt;token&gt;" --> app1["Internal API <br> (self-hosted app)"]
    mcp -- "Authorization: Bearer &lt;token&gt;" --> app2["Company wiki <br> (self-hosted app)"]
    idp[Identity provider] <--> mcp

### Prerequisites

* Add your downstream applications (for example, your `Internal API` and `Company wiki`) as [self-hosted Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).
* Add your MCP server as an [Access for SaaS OIDC application](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/#access-for-saas-application).

### 1\. Configure downstream applications

On each self-hosted application that the MCP server needs to access (for example, the `Internal API` and `Company wiki` apps), create a Linked App Token policy:

* [ Dashboard ](#tab-panel-7083)
* [ API ](#tab-panel-7084)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select the downstream application and select **Edit**.
3. Go to the **Policies** tab and select **Create new policy**.
4. Set the policy **Action** to _Service Auth_.  
Note  
The Linked App Token selector only works with the [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) action, similar to service token rules.
5. For **Selector**, select _Linked App Token_.
6. For **Value**, select the MCP server application. For example,  
| Action       | Rule type | Selector         | Value          |  
| ------------ | --------- | ---------------- | -------------- |  
| Service Auth | Include   | Linked App Token | mcp-server-app |
7. Save the policy.
8. In the downstream application, add the policy to the **Access policies** list.
9. Save the application.

1. Get the `uid` of the MCP server application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Revoke`  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
List Access applications  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
Response  
```  
{  
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  
  "uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  
  "type": "saas",  
  "name": "mcp-server-app",  
  ...  
}  
```
2. Create an Access policy on the downstream application, replacing the `app_uid` value with the `uid` of the MCP server application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Create an Access reusable policy  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Allow requests from MCP server",  
    "decision": "non_identity",  
    "include": [  
        {  
            "linked_app_token": {  
                "app_uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  
            }  
        }  
    ]  
  }'  
```  
Note  
The `linked_app_token` rule type only works with [non\_identity decisions](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth), similar to service token rules.

### 2\. Configure your MCP server

Configure the MCP server to forward the `access_token` in outgoing requests:

```

Authorization: Bearer ACCESS_TOKEN


```

## Known limitations

* The Linked App Token policy can only be added to [self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). It cannot be added to [SaaS applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) or other application types.
* This feature works best with applications that rely on the [Cloudflare Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) for authentication and identity. If the downstream application implements its own authentication layer after Cloudflare Access, requests that pass Access validation may still be rejected by the application itself.
* When the upstream application uses [Managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/), the client receives an [opaque access token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#token-format), not a JWT. The client cannot forward this token directly to downstream applications as a `Cf-Access-Token` header. Instead, the upstream application's origin must read the `Cf-Access-Jwt-Assertion` header (which contains the resolved JWT) and forward it as `Cf-Access-Token` to the downstream application. If you want clients to access multiple endpoints without a proxy, consider using a [multi-domain Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#multi-domain-applications) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/linked-apps/#page","headline":"Allow MCP servers to access self-hosted applications · Cloudflare One docs","description":"Allow MCP servers to access self-hosted applications in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/linked-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/ai-controls/","name":"AI controls"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/ai-controls/linked-apps/","name":"Allow MCP servers to access self-hosted applications"}}]}
```
