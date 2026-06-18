---
title: User Agent Blocking
description: Block or challenge requests based on User-Agent header values.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# User Agent Blocking

User Agent Blocking allows you to block specific browser or web application [User-Agent request headers ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent). User agent rules apply to the entire domain instead of individual subdomains.

User agent rules are applied after [zone lockdown rules](https://developers.cloudflare.com/waf/tools/zone-lockdown/). If you allow an IP address via Zone Lockdown, it will skip any user agent rules.

Note

Cloudflare recommends that you use [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of user agent rules to block specific user agents.

For example, a custom rule equivalent to the user agent [example rule](#create-a-user-agent-blocking-rule) provided in this page could have the following configuration:

* **Expression**: `http.user_agent eq "BadBot/1.0.2 (+http://bad.bot)"`
* **Action**: (a block or challenge action)

## Availability

Cloudflare User Agent Blocking is available on all plans. However, this feature is only available in the [new security dashboard](https://developers.cloudflare.com/security/) if you have configured at least one user agent rule.

The number of available user agent rules depends on your Cloudflare plan.

| Free            | Pro | Business | Enterprise |       |
| --------------- | --- | -------- | ---------- | ----- |
| Availability    | Yes | Yes      | Yes        | Yes   |
| Number of rules | 10  | 50       | 250        | 1,000 |

## Create a User Agent Blocking rule

* [  New dashboard ](#tab-panel-11275)
* [ Old dashboard ](#tab-panel-11276)
* [ API ](#tab-panel-11277)

Note

User Agent Blocking is only available in the new security dashboard if you have configured at least one user agent rule. Cloudflare recommends that you use [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of user agent rules.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **User agent rules**.
3. Enter a descriptive name for the rule in **Name/Description**.
4. In **Action**, select the action to perform: _Block_, _Non-Interactive Challenge_, _Managed Challenge_, or _Interactive Challenge_.
5. Enter a user agent value in **User Agent** (wildcards such as `*` are not supported). For example, to block the Bad Bot web spider, enter `BadBot/1.0.2 (+http://bad.bot)`.
6. Select **Save and Deploy blocking rule**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** \> **WAF**, and select the **Tools** tab.
3. Under **User Agent Blocking**, select **Create blocking rule**.
4. Enter a descriptive name for the rule in **Name/Description**.
5. In **Action**, select the action to perform: _Block_, _Non-Interactive Challenge_, _Managed Challenge_, or _Interactive Challenge_.
6. Enter a user agent value in **User Agent** (wildcards such as `*` are not supported). For example, to block the Bad Bot web spider, enter `BadBot/1.0.2 (+http://bad.bot)`.
7. Select **Save and Deploy blocking rule**.

Issue a `POST` request for the [Create a User Agent Blocking rule](https://developers.cloudflare.com/api/resources/firewall/subresources/ua%5Frules/methods/create/) operation similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Firewall Services Write`

Create a User Agent Blocking rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Block Bad Bot web spider",

    "mode": "block",

    "configuration": {

        "target": "ua",

        "value": "BadBot/1.0.2 (+http://bad.bot)"

    }

  }'


```

## Challenge actions

When a User Agent Blocking rule uses a challenge action such as _Managed Challenge_, the visitor must pass a challenge page. After passing the challenge, a `cf_clearance` cookie is set. The duration of this cookie is controlled by the [Challenge Passage](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/) setting.

## Related resources

* [Secure your application](https://developers.cloudflare.com/learning-paths/application-security/account-security/)
* [Cloudflare Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/user-agent-blocking/#page","headline":"User Agent Blocking · Cloudflare Web Application Firewall (WAF) docs","description":"Block or challenge requests based on User-Agent header values.","url":"https://developers.cloudflare.com/waf/tools/user-agent-blocking/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/user-agent-blocking/","name":"User Agent Blocking"}}]}
```
