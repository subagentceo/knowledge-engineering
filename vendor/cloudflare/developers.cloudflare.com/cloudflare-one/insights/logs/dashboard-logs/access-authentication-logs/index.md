---
title: Access authentication logs
description: Use Access authentication logs to review authentication events and requests to protected URI paths and infrastructure targets.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access authentication logs

Access authentication logs help you track who accessed your protected applications, when they accessed them, and whether they were allowed in. Use these logs to investigate suspicious login attempts, audit user activity, or troubleshoot access issues.

Cloudflare Access generates two types of audit logs:

* **[Authentication audit logs](#authentication-logs)** record each login attempt (successful or failed) by a user or service to an Access application.
* **[Per-request audit logs](#per-request-logs)** record individual HTTP requests that authenticated users make to protected [application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) and infrastructure targets.

## Authentication logs

Cloudflare Access logs an authentication event whenever a user or service attempts to log in to an application, whether the attempt succeeds or not.

[Identity-based authentication](#identity-based-authentication) refers to login attempts that were evaluated based on who the user is — for example, their email address, identity provider (IdP) group, SAML group, or OIDC claim.

[Non-identity authentication](#non-identity-authentication) refers to login attempts that were evaluated based on context rather than user identity — for example, IP address, device posture, country, valid certificate, or service token.

Note

Authentication logs do not capture the user's actions during a self-hosted or SaaS application session. To audit individual requests made during a session, refer to [Per-request logs](#per-request-logs).

### Identity-based authentication

#### View Access authentication logs

* [ Dashboard ](#tab-panel-7190)
* [ API ](#tab-panel-7191)

To view logs for identity-based authentication events:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs**.
2. Select **Access authentication logs**.  
Log viewer (beta)  
Access authentication logs use an updated log viewer with enhanced filtering capabilities. To switch to the classic view, select **Return to old logs**.
3. (Optional) Filter the logs that display in the log viewer. You can filter logs by their timestamp and event details (such as the Access application, user email, policy decision, and more).  
Tip  
Querying for fewer fields improves log loading performance.
4. Select an individual timestamp to investigate the event in more detail.

The [Access authentication logs](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/logs/subresources/access%5Frequests/methods/list/) API endpoint provides a custom URL to export audit log events for your account.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Audit Logs Read`

Get Access authentication logs

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/logs/access_requests?limit=25&direction=desc&since=2020-07-01T05%3A20%3A00Z&until=2020-10-01T05%3A20%3A00Z" \

  --request GET \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"


```

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": [

    {

      "user_email": "michelle@example.com",

      "ip_address": "198.41.129.166",

      "app_uid": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",

      "app_domain": "test.example.com/admin",

      "action": "login",

      "connection": "saml",

      "allowed": false,

      "created_at": "2014-01-01T05:20:00.12345Z",

      "ray_id": "187d944c61940c77"

    }

  ]

}


```

#### Explanation of the fields

Identity-based authentication logs contain the following fields:

##### Basic information

| Field            | Description                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **App**          | Name of the Access application.                                                                                          |
| **User email**   | Email address of the authenticating user.                                                                                |
| **User ID**      | Unique identifier (UUID) of the authenticating user.                                                                     |
| **IP address**   | IP address of the authenticating user.                                                                                   |
| **App UID**      | Unique identifier (UUID) of the Access application.                                                                      |
| **App domain**   | URL of the Access application.                                                                                           |
| **App type**     | Specifies the type of Access application: self-hosted, browser SSH, browser VNC, browser RDP, SaaS, or infrastructure.   |
| **Event**        | Type of authentication event, such as a login attempt.                                                                   |
| **Connection**   | Identity provider used to authenticate (for example, saml, onetimepin, google-apps).                                     |
| **Allow**        | Whether the authentication attempt was allowed (true) or denied (false).                                                 |
| **Request time** | Timestamp of the authentication event.                                                                                   |
| **Ray ID**       | A unique identifier for every request through Cloudflare. Useful for tracing a specific request through Cloudflare logs. |
| **Country**      | Country associated with the user's IP address.                                                                           |

##### Infrastructure applications

Cloudflare Access logs the following information when the user authenticates to an [infrastructure application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/):

| Field         | Description                                                                                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hostname**  | Hostname of the infrastructure target.                                                                                                                                                                                                                                  |
| **Target ID** | UUID of the infrastructure target.                                                                                                                                                                                                                                      |
| **SSH user**  | The UNIX user, such as root, that the authenticating user specified when connecting to the infrastructure target.                                                                                                                                                       |
| **SSH logs**  | SSH commands that the user ran on the target. Requires configuring an [SSH encryption key](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#ssh-command-logs) before the session begins. |

### Non-identity authentication

To retrieve logs for non-identity authentication events, use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-access-login-events/). These logs are not available in the Cloudflare One dashboard.

## Per-request logs

Users who have authenticated through Access have access to authorized URL paths for the duration of their session. Cloudflare provides several ways to audit these requests.

### Using Cloudflare Logs

Enterprise customers have access to detailed logs of requests on their Cloudflare dashboard. Enterprise customers also have access to Cloudflare's Logpush service, which can be configured from the Cloudflare dashboard or API. For more information about Cloudflare HTTP and infrastructure logging, refer to [Cloudflare Logs](https://developers.cloudflare.com/logs/).

Once a member of your team authenticates to reach an HTTP resource behind Access, Cloudflare generates a JSON Web Token (JWT) for that user that contains their SSO identity. Cloudflare signs this token using RS256 (RSA Signature with SHA-256), an asymmetric algorithm, and makes the public key available so that you can verify the token is authentic.

When a user requests a URL, Access appends the user identity from that token as a request header, which Cloudflare logs as the request passes through the network. Your team can collect these logs in your preferred third-party Security information and event management (SIEM) software or storage destination by using [Cloudflare Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). When enabled with the Access user identity field, the logs export to your systems as JSON similar to the example below.

```

{

   "ClientIP": "198.51.100.206",

   "ClientRequestHost": "jira.widgetcorp.tech",

   "ClientRequestMethod": "GET",

   "ClientRequestURI": "/secure/Dashboard/jspa",

   "ClientRequestUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",

   "EdgeEndTimestamp": "2019-11-10T09:51:07Z",

   "EdgeResponseBytes": 4600,

   "EdgeResponseStatus": 200,

   "EdgeStartTimestamp": "2019-11-10T09:51:07Z",

   "RayID": "5y1250bcjd621y99",

   "RequestHeaders":{"cf-access-user":"srhea"}

},

{

   "ClientIP": "198.51.100.206",

   "ClientRequestHost": "jira.widgetcorp.tech",

   "ClientRequestMethod": "GET",

   "ClientRequestURI": "/browse/EXP-12",

   "ClientRequestUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",

   "EdgeEndTimestamp": "2019-11-10T09:51:27Z",

   "EdgeResponseBytes": 4570,

   "EdgeResponseStatus": 200,

   "EdgeStartTimestamp": "2019-11-10T09:51:27Z",

   "RayID": "yzrCqUhRd6DVz72a",

   "RequestHeaders":{"cf-access-user":"srhea"}

}


```

### Using the `cf-access-user` field

In addition to the HTTP request fields available in Cloudflare Enterprise logging, requests made to applications behind Access include the `cf-access-user` field, which contains the user identity string. This offers another tool for auditing user behavior. To add the `cf-access-user` field to your HTTP request logs, you must add it as a custom field. Refer to [Custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/) for instructions.

Keep in mind that Access does not log all interactions. Per-request audit logs can indicate that a specific user visited `domain.com/admin` and then `domain.com/admin/panel`, but the logs only capture interactions that result in a new HTTP request. Purely client-side interactions that do not generate server requests are not logged.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/#page","headline":"Access authentication logs · Cloudflare One docs","description":"Use Access authentication logs to review authentication events and requests to protected URI paths and infrastructure targets.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/","name":"Dashboard logs"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/","name":"Access authentication logs"}}]}
```
