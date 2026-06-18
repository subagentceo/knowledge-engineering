---
title: Bot scores
description: Scores from 1 to 99 indicating the likelihood a request came from a bot.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot scores

A bot score is a score from _1_ to _99_ that indicates how likely that request came from a bot.

For example, a score of 1 means Cloudflare is quite certain the request was automated, while a score of 99 means Cloudflare is quite certain the request came from a human.

You can use bot scores in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) to block, challenge, or allow requests based on their score. Bot scores are also available in [Workers](https://developers.cloudflare.com/workers/) to customize application behavior. For more details, refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/).

Note

Granular bot scores are only available to Enterprise customers who have purchased Bot Management. All other customers can only access this information through [bot groupings](#bot-groupings) in Bot Analytics.

## Bot groupings

Customers with a Pro plan or higher can automatically see bot traffic divided into groups by going to **Security** \> **Bots**.

| Category             | Range                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Not computed**     | Bot scores of 0.                                                                       |
| **Automated**        | Bot scores of 1.                                                                       |
| **Likely automated** | Bot scores of 2 through 29.                                                            |
| **Likely human**     | Bot scores of 30 through 99.                                                           |
| **Verified bot**     | Non-malicious automated traffic (used to power search engines and other applications). |

Note

Bot scores are not computed for requests to paths that are handled by Cloudflare and will never be blocked or forwarded to the origin. Note that some features that are enabled before Bot Management, such as Redirect Rules, may result in requests not being scored.

## How Cloudflare generates bot scores

The following detection engines only apply to Enterprise Bot Management. For specific details about the engines included in your plan, refer to [Plans](https://developers.cloudflare.com/bots/plans/).

### Heuristics

Catches automated traffic through pattern matching against a database of known malicious fingerprints.

The **Heuristics** engine processes all requests. Cloudflare conducts a number of heuristic checks to identify automated traffic, and requests are matched against a growing database of malicious fingerprints.

The Heuristics engine gives automated requests a score of 1 for high-confidence, deterministic detections. Occasionally, heuristics will set a score of 29 in cases where Cloudflare has identified automated traffic and is still assessing traffic overlap.

### Machine learning

Catches sophisticated bots by analyzing request features across billions of daily requests. Produces most scores between 2 and 99.

The **Machine Learning (ML)** engine accounts for the majority of all detections, distinguishing between human and bot traffic. This approach leverages our global network, which proxies billions of requests daily, to identify both automated and human traffic.

The ML system uses a supervised machine learning methodology to determine the final Bot Score (1–99).

The core model relies on the following process:

* Input Variables (X): Various request features (headers, session characteristics, and browser signals) collected from traffic across the Cloudflare network.
* Output Variable (Y): The predicted probability that a client is human (such as the probability of successfully solving a Challenge). This probability is mapped to the final 1–99 Bot Score.

We constantly train the ML engine on a periodic basis using vast, anonymized data to ensure it remains accurate and adapts to new threats. Customers can analyze the request features used by these models via their own logs, such as Cloudflare [Logpull](https://developers.cloudflare.com/logs/logpull/) or [Logpush](https://developers.cloudflare.com/logs/logpush/).

### Anomaly detection

Detects outlier requests by comparing traffic against a learned baseline for your specific site.

Deprecation notice

Cloudflare is deprecating the Anomaly Detection engine and is not onboarding new customers. Future behavioral detections will cover the same detection areas.

The **Anomaly Detection (AD)** engine is an optional detection engine that uses a form of unsupervised learning. Cloudflare records a baseline of your domain's traffic and uses the baseline to intelligently detect outlier requests. This approach is user agent-agnostic and can be turned on or off by your account team.

Cloudflare does not recommend AD for domains that use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) or expect large amounts of API traffic. The AD engine immediately gives automated requests a score of one.

### JavaScript detections

Catches headless browsers (browsers controlled by software, with no visible window or human operator) and other automation tools.

The [**JavaScript Detections (JSD)**](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/) engine identifies headless browsers and other malicious fingerprints. This engine performs a lightweight, invisible JavaScript injection on the client side of any request while honoring our [strict privacy standards ↗](https://www.cloudflare.com/privacypolicy/). We do not collect any personally identifiable information during the process. The JSD engine either blocks, challenges, or passes requests to other engines.

JSD is enabled by default but completely optional. To adjust your settings, open the Bot Management Configuration page from **Security** \> **Bots**.

### Cloudflare service

**Cloudflare Service** is a special bot score source for Enterprise Zero Trust to avoid false positives.

### Not computed

A bot score of 0 means Bot Management did not evaluate the request. This applies to internal Cloudflare service requests and requests that were redirected or handled by another feature (such as [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/)) before Bot Management could run. A score of 0 does not indicate the request is safe or human.

### Notes on detection

Cloudflare uses the `__cf_bm` cookie to smooth out the bot score and reduce false positives for actual user sessions.

The Bot Management cookie measures a single user's request pattern and applies it to the machine learning data to generate a reliable bot score for all of that user's requests.

For more details, refer to [Cloudflare Cookies](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot-score/#page","headline":"Bot scores · Cloudflare bot solutions docs","description":"Scores from 1 to 99 indicating the likelihood a request came from a bot.","url":"https://developers.cloudflare.com/bots/concepts/bot-score/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot-score/","name":"Bot scores"}}]}
```
