---
title: Features
description: Review available features by plan type.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Features

Rate limiting is composed of the following parameters:

* An [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that specifies the criteria you are matching traffic on using the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).
* An [action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) that specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of rate limiting rules, the action occurs when the rate reaches the specified limit.

Besides these two parameters, rate limiting rules require the following additional parameters:

* **Characteristics**: The set of parameters that define how Cloudflare tracks the rate for this rule.
* **Period**: The period of time to consider (in seconds) when evaluating the rate.
* **Requests per period**: The number of requests over the period of time that will trigger the rate limiting rule.
* **Duration** (or mitigation timeout): Once the rate is reached, the rate limiting rule blocks further requests for the period of time defined in this field.
* **Action behavior**: By default, Cloudflare will apply the rule action for the configured duration (or mitigation timeout), regardless of the request rate during this period. Some Enterprise customers can configure the rule to [throttle requests](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-following-behavior) over the maximum rate, allowing incoming requests when the rate is lower than the configured limit.

## Features by plan type

Features vary by plan type.

| Feature                                | Free                                                                                                                                       | Pro                                                     | Business                                                                      | Enterprise with app security                                                                              | Enterprise with Advanced Rate Limiting                                                                                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Available fieldsin rule expression     | Path, [Verified Bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.verified%5Fbot/) | Host, URI, Path, Full URI, Query, Verified Bot          | Host, URI, Path, Full URI, Query, Method, Source IP, User Agent, Verified Bot | General request fields, request header fields, Verified Bot, Bot Management fields[1](#user-content-fn-1) | General request fields, request header fields, Verified Bot, Bot Management fields[1](#user-content-fn-1), request body fields[2](#user-content-fn-2)                                                                                        |
| Cache exclusion                        | No                                                                                                                                         | No                                                      | Yes                                                                           | Yes                                                                                                       | Yes                                                                                                                                                                                                                                          |
| Counting characteristics               | IP                                                                                                                                         | IP                                                      | IP, IP with NAT support                                                       | IP, IP with NAT support                                                                                   | IP, IP with NAT support, Query, Host, Headers, Cookie, ASN, Country, Path, JA3/JA4 Fingerprint[1](#user-content-fn-1), JSON field value[2](#user-content-fn-2), Body[2](#user-content-fn-2), Form input value[2](#user-content-fn-2), Custom |
| Custom counting expression             | No                                                                                                                                         | No                                                      | Yes                                                                           | Yes                                                                                                       | Yes                                                                                                                                                                                                                                          |
| Available fieldsin counting expression | N/A                                                                                                                                        | N/A                                                     | All rule expression fields, Response code, Response headers                   | All rule expression fields, Response code, Response headers                                               | All rule expression fields, Response code, Response headers                                                                                                                                                                                  |
| Counting model                         | Number of requests                                                                                                                         | Number of requests                                      | Number of requests                                                            | Number of requests                                                                                        | Number of requests, [complexity score](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting)                                                                                               |
| Rate limitingaction behavior           | Perform action during mitigation period                                                                                                    | Perform action during mitigation period                 | Perform action during mitigation period                                       | Perform action during mitigation period, Throttle requests above rate with block action                   | Perform action during mitigation period, Throttle requests above rate with block action                                                                                                                                                      |
| Counting periods                       | 10 s                                                                                                                                       | All supported values up to 1 min[3](#user-content-fn-3) | All supported values up to 10 min[3](#user-content-fn-3)                      | All supported values up to 65,535 s[3](#user-content-fn-3)                                                | All supported values up to 65,535 s[3](#user-content-fn-3)                                                                                                                                                                                   |
| Mitigation timeout periods             | 10 s                                                                                                                                       | All supported values up to 1 h[3](#user-content-fn-3)   | All supported values up to 1 day[3](#user-content-fn-3)                       | All supported values up to 1 day[3](#user-content-fn-3) [4](#user-content-fn-4)                           | All supported values up to 1 day[3](#user-content-fn-3) [4](#user-content-fn-4)                                                                                                                                                              |
| Number of rules                        | 1                                                                                                                                          | 2                                                       | 5                                                                             | 100[5](#user-content-fn-5)                                                                                | 100                                                                                                                                                                                                                                          |

Footnotes

1: Only available to Enterprise customers who have purchased [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/).

2: Availability depends on your WAF plan.

3: List of supported counting/mitigation period values in seconds:  
10, 15, 20, 30, 40, 45, 60 (1 min), 90, 120 (2 min), 180 (3 min), 240 (4 min), 300 (5 min), 480, 600 (10 min), 900, 1200 (20 min), 1800, 2400, 3600 (1 h), 65535, 86400 (1 day).  
Not all values are available on all plans.

4: Enterprise customers can specify a custom mitigation timeout period via API.

5: Enterprise customers must have application security on their contract to get access to rate limiting rules. The number of rules depends on the exact contract terms.

## Footnotes

1. Only available to Enterprise customers who have purchased [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/). [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3)
2. Availability depends on your WAF plan. [↩](#user-content-fnref-2) [↩2](#user-content-fnref-2-2) [↩3](#user-content-fnref-2-3) [↩4](#user-content-fnref-2-4)
3. Supported period values in seconds:  
 10, 15, 20, 30, 40, 45, 60 (1 min), 90, 120 (2 min), 180 (3 min), 240 (4 min), 300 (5 min), 480, 600 (10 min), 900, 1200 (20 min), 1800, 2400, 3600 (1 h), 65535, 86400 (1 day). [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2) [↩3](#user-content-fnref-3-3) [↩4](#user-content-fnref-3-4) [↩5](#user-content-fnref-3-5) [↩6](#user-content-fnref-3-6) [↩7](#user-content-fnref-3-7) [↩8](#user-content-fnref-3-8)
4. Enterprise customers can specify a custom mitigation timeout period via API. [↩](#user-content-fnref-4) [↩2](#user-content-fnref-4-2)
5. Enterprise customers must have application security on their contract to get access to rate limiting rules. The number of rules depends on the exact contract terms. [↩](#user-content-fnref-5)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/rate-limiting/features/#page","headline":"Features · Cloudflare Learning Paths","description":"Review available features by plan type.","url":"https://developers.cloudflare.com/learning-paths/application-security/rate-limiting/features/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/rate-limiting/","name":"Rate Limiting"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/rate-limiting/features/","name":"Features"}}]}
```
