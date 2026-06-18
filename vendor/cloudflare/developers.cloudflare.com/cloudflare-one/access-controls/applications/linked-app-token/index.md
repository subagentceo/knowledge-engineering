---
title: Linked App Token
description: Forward Access JWTs between linked applications.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Linked App Token

The **Linked App Token** policy selector allows an Access policy on one application to accept tokens issued for another application. This is useful when one application needs to make authenticated requests to another on behalf of a user — for example, an MCP server calling internal APIs, or a microservice forwarding user identity to a downstream service.

Linked App Token supports two flows:

* [**Self-hosted to self-hosted**](#self-hosted-to-self-hosted) — A self-hosted application forwards its Access JWT to another self-hosted application. This is the simplest setup and requires no additional OAuth configuration.
* [**SaaS to self-hosted**](#saas-to-self-hosted) — An Access for SaaS application (such as an [MCP server using OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/#access-for-saas-application)) sends its OAuth access token to a self-hosted application.

## Self-hosted to self-hosted

In this flow, Application A is a [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) that needs to make requests to Application B, another self-hosted Access application. When a user authenticates to Application A, Cloudflare Access sends the user's JWT to Application A in the `Cf-Access-Jwt-Assertion` header. Application A can then forward that token to Application B in the `Cf-Access-Token` header. Access will validate the token against the Linked App Token rule on Application B's policy and allow the request if the token was issued for Application A.

flowchart LR
accTitle: Self-hosted to self-hosted linked app token flow
    User --> appA["Application A <br> (self-hosted)"]
    appA -- "Cf-Access-Token: &lt;JWT&gt;" --> appB["Application B <br> (self-hosted)"]
    idp[Identity provider] <--> appA

### Prerequisites

* Two [self-hosted Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)

### 1\. Create a Linked App Token policy

Create a policy on Application B (the downstream application that will receive forwarded requests):

* [ Dashboard ](#tab-panel-7113)
* [ API ](#tab-panel-7114)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select Application B and select **Edit**.
3. Go to the **Policies** tab and select **Create new policy**.
4. Set the policy **Action** to _Service Auth_.  
Note  
The Linked App Token selector only works with the [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) action, similar to service token rules.
5. For **Selector**, select _Linked App Token_.
6. For **Value**, select Application A. For example,  
| Action       | Rule type | Selector         | Value         |  
| ------------ | --------- | ---------------- | ------------- |  
| Service Auth | Include   | Linked App Token | application-a |
7. Save the policy.
8. In Application B, add the policy to the **Access policies** list.
9. Save the application.

1. Get the `uid` of Application A:  
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
  "name": "application-a",  
  ...  
}  
```
2. Create an Access policy on the downstream application, replacing the `app_uid` value with the `uid` of Application A:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Create an Access reusable policy  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Allow requests from Application A",  
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

### 2\. Forward the Access JWT

When Cloudflare Access authenticates a user to Application A, it sends a signed JWT in the `Cf-Access-Jwt-Assertion` request header. Application A must forward this token to Application B in the `Cf-Access-Token` header:

```

Cf-Access-Token: <JWT from Cf-Access-Jwt-Assertion>


```

When Access receives the request to Application B, it will:

1. Extract the token from the `Cf-Access-Token` header.
2. Validate that the token was issued for Application A (matching the `app_uid` in the Linked App Token rule).
3. If valid, allow the request. The user's identity from the token is propagated to the upstream headers and audit log.

## SaaS to self-hosted

In this example an [Access for SaaS application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) (for example, an MCP server that implements [OAuth ↗](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)) needs to make requests to a self-hosted Access application. The SaaS app obtains an OAuth access token from Cloudflare Access and sends it to the self-hosted application in the `Authorization: Bearer` header.

flowchart LR
accTitle: SaaS to self-hosted linked app token flow
    User --> appA["Application A <br> (Access for SaaS)"]
    appA -- "Authorization: Bearer &lt;token&gt;" --> appB["Application B <br> (self-hosted)"]
    idp[Identity provider] <--> appA

### Prerequisites

* A [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
* An [Access for SaaS OIDC application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/)

### 1\. Create a Linked App Token policy

Create a policy on the self-hosted application (Application B):

* [ Dashboard ](#tab-panel-7115)
* [ API ](#tab-panel-7116)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select the self-hosted app (Application B) and select **Edit**.
3. Go to the **Policies** tab and select **Create new policy**.
4. Set the policy **Action** to _Service Auth_.  
Note  
The Linked App Token selector only works with the [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) action, similar to service token rules.
5. For **Selector**, select _Linked App Token_.
6. For **Value**, select the Access for SaaS app (Application A). For example,  
| Action       | Rule type | Selector         | Value         |  
| ------------ | --------- | ---------------- | ------------- |  
| Service Auth | Include   | Linked App Token | application-a |
7. Save the policy.
8. In the self-hosted app (Application B), add the policy to the **Access policies** list.
9. Save the application.

1. Get the `uid` of the Access for SaaS app (Application A):  
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
  "name": "my-saas-app",  
  ...  
}  
```
2. Create an Access policy on the downstream application, replacing the `app_uid` value with the `uid` of the Access for SaaS app (Application A):  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Create an Access reusable policy  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Allow requests from SaaS app",  
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

### 2\. Configure token forwarding

The SaaS application must forward the OAuth `access_token` to the self-hosted application in an HTTP header:

```

Authorization: Bearer ACCESS_TOKEN


```

The end-to-end flow is:

1. The user authenticates against the Access for SaaS app via OAuth.
2. Upon success, the application receives an `access_token`.
3. The application makes a request to the self-hosted application with the token in the `Authorization: Bearer` header.
4. Cloudflare Access inspects the token and validates it against the `linked_app_token` rule. If valid, the request is allowed.

## Known limitations

* The Linked App Token policy can only be added to [self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). It cannot be added to [SaaS applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) or other application types.
* This feature works best with applications that rely on the [Cloudflare Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) for authentication and identity. If the downstream application implements its own authentication layer after Cloudflare Access, requests that pass Access validation may still be rejected by the application itself.
* When the upstream application uses [Managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/), the client receives an [opaque access token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#token-format), not a JWT. The client cannot forward this token directly to downstream applications as a `Cf-Access-Token` header. Instead, the upstream application's origin must read the `Cf-Access-Jwt-Assertion` header (which contains the resolved JWT) and forward it as `Cf-Access-Token` to the downstream application. If you want clients to access multiple endpoints without a proxy, consider using a [multi-domain Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#multi-domain-applications) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/#page","headline":"Linked App Token · Cloudflare One docs","description":"Forward Access JWTs between linked applications.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/linked-app-token/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/linked-app-token/","name":"Linked App Token"}}]}
```
