---
title: Bot Management variables
description: Ruleset Engine fields and Workers variables available for bot detection rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot Management variables

## Ruleset Engine fields

Bot Management provides access to several [new variables](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Bots) within the expression builder of Ruleset Engine-based products such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/).

* **Bot Score** (`cf.bot_management.score`): An integer between 1-99 that indicates [Cloudflare's level of certainty](https://developers.cloudflare.com/bots/concepts/bot-score/) that a request comes from a bot.
* **Verified Bot** (`cf.bot_management.verified_bot`): A boolean value that indicates whether a request originates from a Cloudflare allowed bot.  
Cloudflare maintains a large allowlist of good, automated bots (such as Google Search Engine and Pingdom) that perform beneficial tasks. Cloudflare identifies and verifies these bots primarily through reverse DNS validation, ensuring the source IP matches the requesting service.  
We also use additional validation methods, including checking ASN blocks and public lists. If these methods are unavailable, Cloudflare utilizes internal data and machine learning to identify and verify legitimate IP addresses from good bots. Most customers choose to [allow this traffic](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.verified%5Fbot/).
* **Serves Static Resource** (`cf.bot_management.static_resource`): An identifier that matches [file extensions](https://developers.cloudflare.com/bots/additional-configurations/static-resources/) for many types of static resources. Use this variable if you send emails that retrieve static images.
* **ja3Hash** (`cf.bot_management.ja3_hash`) and **ja4** (`cf.bot_management.ja4`): A [**JA3/JA4 fingerprint**](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.
* **Bot Detection IDs** (`cf.bot_management.detection_ids`): List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request).
* **Signed Agent** (`cf.bot_management.signed_agent`): A boolean value that indicates whether the request originated from a known [signed agent](https://developers.cloudflare.com/bots/concepts/bot/signed-agents/).
* **Verified Bot Categories** (`cf.verified_bot_category`): A string that allows you to segment your verified bot traffic by its [type and purpose](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories).

## Workers variables

These variables are also available as part of the [request.cf](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) object via Cloudflare Workers:

* `request.cf.botManagement.score`
* `request.cf.botManagement.verifiedBot`
* `request.cf.botManagement.staticResource`
* `request.cf.botManagement.ja3Hash`
* `request.cf.botManagement.ja4`
* `request.cf.botManagement.jsDetection.passed`
* `request.cf.botManagement.detectionIds`
* `request.cf.botManagement.signedAgent`
* `request.cf.verifiedBotCategory`

## Corporate Proxy

The Bot Management Corporate Proxy field contains identified cloud-based corporate proxies and secure web gateways that are Enterprise-only, and provide outbound security services to their clients.

You can access the Corporate Proxy field in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), or [Workers](https://developers.cloudflare.com/workers/) to provide different security rules for traffic from these sources. You can also exempt them from rules using Bot Management scores.

Example

```

not cf.bot_management.verified_bot

and not cf.bot_management.static_resource

and not  cf.bot_management.corporate_proxy

and cf.bot_management.score lt 30


```

## Log fields

Once you enable Bot Management, Cloudflare also surfaces bot information in its [HTTP requests log fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/):

* BotDetectionIDs
* BotScore
* BotScoreSrc
* BotTags

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/bot-management-variables/#page","headline":"Bot Management variables · Cloudflare bot solutions docs","description":"Ruleset Engine fields and Workers variables available for bot detection rules.","url":"https://developers.cloudflare.com/bots/reference/bot-management-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/reference/bot-management-variables/","name":"Bot Management variables"}}]}
```
