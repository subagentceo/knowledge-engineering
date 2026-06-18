---
title: Detection IDs
description: Static rules that identify predictable bot behavior and configurable heuristics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Detection IDs

Detection IDs are static rules that detect predictable bot behavior with no overlap with human traffic. Each ID maps to a specific [detection method](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/) such as heuristics, verified bot detections, or anomaly detections. For example, a detection ID can identify when a client sends headers in a different order than what its claimed browser would use.

If you are having an issue with one of our heuristics, detection IDs allow you to decide which heuristics to enforce on your zones using customer configurable heuristics. You can choose unique actions for different bots, detected through Cloudflare’s heuristics engine. You can block, allow, or serve alternate content to specific bots to meet the unique needs of your site’s traffic.

Note

A request can trigger multiple detection IDs.

You can use `cf.bot_management.detection_ids` fields in tools such as:

* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/)
* [Advanced Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)
* [Transform Rules](https://developers.cloudflare.com/rules/transform/)
* [Workers](https://developers.cloudflare.com/workers/) (as `request.cf.botManagement.detectionIds`)

Bot Detection IDs and tags are also available in [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/) and [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

Beta detections

Cloudflare may occasionally try beta detections as we continuously improve our detections.

It is possible, but uncommon, for you to have beta detection IDs on the Cloudflare dashboard that are not actively collecting data on your zone.

---

## Detection tags

Detection tags refer to the category associated with the detection ID at the time that Cloudflare has fingerprinted a bot. For example, if a detection tag is `go`, this means that Cloudflare has observed traffic from that detection ID from a Go programming language bot.

Note

Detection tags are available in Security Analytics, but not in the Security Events.

---

## Create or edit an expression

* [  New dashboard ](#tab-panel-6820)
* [ Old dashboard ](#tab-panel-6821)

1. In the Cloudflare dashboard, go to the **Security Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Apply filters and select **Create custom security rule** to create a custom rule based on your filters.  
Alternatively, if you have already created a custom rule, you can go to the existing rule in **Security rules** and edit the expression based on your filters.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
3. Use the `cf.bot_management.detection_ids` field in the rule expression.
4. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**, apply filters and select **Create custom rule** to create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) based on those filters. Alternatively, if you already created a custom rule, go to **Security** \> **WAF** \> **Custom rules** and edit the expression of an existing custom rule.
3. Use the `cf.bot_management.detection_ids` field in the rule expression.
4. Select **Save**.

---

## Use cases

### Block requests that match a specific detection ID

JavaScript

```

any(cf.bot_management.detection_ids[*] eq 3355446)

and not cf.bot_management.verified_bot

and http.request.uri.path eq "/login"

and http.request.method eq "POST"


```

### Run Bot Management without specific detection IDs

JavaScript

```

cf.bot_management.score lt 30

and not cf.bot_management.verified_bot

and http.request.uri.path eq "/login"

and http.request.method eq "POST"

and not any(cf.bot_management.detection_ids[*] in {3355446 12577893})


```

---

## Bot Detection IDs via Logpush

You can create or edit existing Logpush jobs to include the new Bot Detection IDs field which will provide an array of IDs for each request that has heuristics match on it. The `BotDetectionIDs` field is available as part of the HTTP Requests dataset and you can add it to new or existing jobs via the Logpush API or on the Cloudflare dashboard. This is the primary method to discover Detection IDs.

* [ Dashboard ](#tab-panel-6822)
* [ API ](#tab-panel-6823)

1. In the Cloudflare dashboard, go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select **Create a Logpush Job**.
3. Select and enter the destination information.
4. Select **HTTP Requests** as the dataset.
5. Select **BotDetectionIDs** under the General data field category.
6. Prove the ownership.
7. Select **Save**.

[Update your logpush job](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/) by adding `BotDetectionIDs` to the `output_options:` parameters.

---

## Availability

Detection IDs are available for Enterprise Bot Management customers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/#page","headline":"Detection IDs · Cloudflare bot solutions docs","description":"Static rules that identify predictable bot behavior and configurable heuristics.","url":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/detection-ids/","name":"Detection IDs"}}]}
```
