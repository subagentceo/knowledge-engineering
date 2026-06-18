---
title: Bot management
description: Cloudflare has bot management capabilities to help identify and mitigate automated traffic to protect domains from bad bots.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot management

**Last reviewed:**  over 1 year ago 

## Introduction

Cloudflare has bot management capabilities to help identify and mitigate automated traffic to protect domains from bad bots. [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) and [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) are options available on Free and Pro/Business accounts respectively. They offer a subset of features and capabilities available for Enterprise accounts. This reference architecture diagram focuses on [Enterprise Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) available for Enterprise customers.

With [Enterprise Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers have the maximum protection, features, and capability. A [bot score ↗](https://developers.cloudflare.com/bots/concepts/bot-score/) is exposed for every request. Cloudflare applies a layered detection approach to Bot Management with several detection engines that cumulatively can impact the bot score. A bot score is a score from 1 to 99 that indicates the likelihood that the request came from a bot. Scores below 30 are commonly associated with bot traffic and customers can then take action on this score with [WAF custom rules ↗](https://developers.cloudflare.com/waf/custom-rules/) or [Workers ↗](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties). Additionally, customers can view this score along with other bot specifics like bot score source, bot detection IDs, and bot detection tags in the Bots, Security Analytics, and Events dashboards; these fields can also be seen in more detailed logs in Log Explorer or, with Log Push, logs with these respective fields can be exported to 3rd party SIEMs/Analytics platforms.

## Definitions

* **Bot Score:** A [bot score](https://developers.cloudflare.com/bots/concepts/bot-tags/) is a score from 1 to 99 that indicates how likely that request came from a bot. A score of 1 means Cloudflare is certain the request was automated.
* **Bot Score Source:** Bot Score Source is the detection engine used for the bot score.
* **Bot Detection ID:** [Detection IDs](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/) are static rules used to detect predictable bot behavior with no overlap with human traffic. Detection IDs refer to the precise [detection](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/) used to identify a bot, which could be from heuristics, verified bot detections, or anomaly detections.
* **Bot Tag:** [Bot tags](https://developers.cloudflare.com/bots/concepts/bot-tags/) provide more detail about why Cloudflare assigned a [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) to a request.
* **Verified Bots:** Cloudflare maintains [a list of "Verified" good bots ↗](https://radar.cloudflare.com/traffic/verified-bots) which can be used in policies to insure good bots such as those associated with a search engine are not blocked.
* **AI Bots:** [If the feature is enabled](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots), Cloudflare will detect and block verified AI bots that respect `robots.txt` and crawl rate, and do not hide their behavior from your website. The rule has also been expanded to include more signatures of AI bots that do not follow the rules.

## Cloudflare Bot Management Detection Engines

* **Heuristics:** Cloudflare conducts a number of heuristic checks to identify automated traffic, and requests are matched against a growing database of malicious fingerprints. The [Heuristics engine](https://developers.cloudflare.com/bots/concepts/bot-score/#heuristics) gives automated requests a score of 1 for high-confidence detections, or a score of 29 for detections where confidence is still being assessed.
* **Machine Learning (ML):** The [ML engine](https://developers.cloudflare.com/bots/concepts/bot-score/#machine-learning) accounts for the majority of all detections, human and bot. The ML model leverages Cloudflare's global network, which proxies billions of requests daily, to identify both automated and human traffic. The ML engine produces scores 2 through 99.
* **Anomaly Detection (AD):** The [AD engine](https://developers.cloudflare.com/bots/concepts/bot-score/#anomaly-detection) is an optional detection engine that uses a form of unsupervised learning. Cloudflare records a baseline of a domain's traffic and uses the baseline to intelligently detect outlier requests. Cloudflare is deprecating Anomaly Detection and is not onboarding new customers onto this engine. Future behavioral detections will cover the same detection areas.
* **JavaScript Detections (JSD)**: The [JSD engine](https://developers.cloudflare.com/bots/concepts/bot-score/#javascript-detections) identifies headless browsers and other malicious fingerprints. This engine performs a lightweight, invisible JavaScript injection on the client side of any request. The JSD engine either blocks, challenges, or passes requests to other engines. JSD is enabled by default but is completely optional.

## Bot Dashboards, Analytics, and Logs

Cloudflare bot score and bot traffic analysis is available in several locations.

* **Bots dashboard:**Customers can easily see bot activity up to 30 days back and filter on bot score and other bot, traffic, and request filters. The [bot feedback loop](https://developers.cloudflare.com/bots/concepts/feedback-loop/) allows customers to report back to Cloudflare any false positives or false negatives for further investigation.
* **Security Analytics:**Security Analytics brings together all of Cloudflare's detection capabilities in one dashboard and provides a broad view of all traffic across the site. The Bots Likelihood graph and widget provide visibility and allow customers to easily view and filter based on bot score and respective categorization of Automated, Likely Automated, Human, and Likely Human.
* **Events:**Events displays all events the WAF took action on. Events and logs can easily be filtered by bot score and other bot, traffic, or request criteria.
* **Log Explorer:**Customers can use Log Explorer to pull additional detailed log data. Logs can easily be filtered by bot score and other bot, traffic, or request criteria.
* **Log Push:**Customers can also export logs to a third party SIEM or Analytics platform. Bot score, bot score source, bot detection IDs, and bot detection tags can all be exported as part of the logs.  
## Bot Management Traffic Flow

![Figure 1: How Cloudflare identifies, scores and processes traffic from bots.](https://developers.cloudflare.com/_astro/bot-management-ra-diagram.D8aExrGs_ZGXIKY.svg "Figure 1: How Cloudflare identifies, scores and processes traffic from bots.")

Figure 1: How Cloudflare identifies, scores and processes traffic from bots.

1. Client request is sent to the closest Cloudflare Data Center via anycast ensuring low latency.
2. Cloudflare applies a layered approach for bot detection; each detection mechanism impacts the bot score assigned by Cloudflare to every request. Every request is assigned a bot score between 1-99 inclusive.
3. Once the client request has been processed by all of Cloudflare's detection engines and assigned a bot score, defined security policies will be executed, some of which may also be leveraging bot score. Various actions can be taken based on the assigned bot score including block, allow, rate limit, and one of the challenge actions.
4. Cloudflare provides analytics and insights into traffic and requests traversing the Cloudflare network. Customers can use the Bots, Security Analytics, Events, and Log Explorer dashboards to understand the overall traffic and bots activity across their site. Customers can also export logs to third party SIEM and Analytics Platforms.

# Related Resources

* [Cloudflare Bot Management Product Page ↗](https://www.cloudflare.com/application-services/products/bot-management/)
* [Cloudflare Blog - Bot Management ↗](https://blog.cloudflare.com/tag/bot-management/)
* [Bots documentation](https://developers.cloudflare.com/bots/)
* [Video: Cloudflare Bot Management and Turnstile with Demo ↗](https://youtu.be/6EnekTohO7I?si=tk8FUB0xtk1PxsJV)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/bots/bot-management/#page","headline":"Bot management · Cloudflare Reference Architecture docs","description":"Cloudflare has bot management capabilities to help identify and mitigate automated traffic to protect domains from bad bots.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/bots/bot-management/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/bots/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/bots/bot-management/","name":"Bot management"}}]}
```
