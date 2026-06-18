---
title: Adaptive DDoS Protection
description: Explore Cloudflare's Adaptive DDoS Protection, which learns traffic patterns to defend against sophisticated DDoS attacks on layers 3/4 and 7.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Adaptive DDoS Protection

Adaptive DDoS Protection learns your unique traffic patterns and adapts to them to provide better protection against sophisticated DDoS attacks on layer 7 and layers 3/4, depending on your subscribed Cloudflare services.

Adaptive DDoS Protection provides the following types of protection:

* **Adaptive DDoS Protection for Origins**: Detects and mitigates traffic that deviates from your site's origin errors profile.
* **Adaptive DDoS Protection for User-Agents**: Detects and mitigates traffic that deviates from the top User Agents seen by Cloudflare on the network. The User Agent profile is built from the entire Cloudflare network and not only from the customer's zone.
* **Adaptive DDoS Protection for Locations**: Detects and mitigates traffic that deviates from your site's geo-distribution profile. The profile is calculated from the rate for every client country and region, using the rates from the past seven days.
* **Adaptive DDoS Protection for Protocols**: Detects and mitigates traffic that deviates from your traffic's IP protocol profile. The profile is calculated as a global rate for each of your prefixes.

## Availability

Cloudflare Adaptive DDoS Protection is available to Enterprise customers according to the following table:

| Feature                           | Profiling dimension                   | WAF/CDN1 | Magic Transit /Spectrum BYOIP2 |
| --------------------------------- | ------------------------------------- | -------- | ------------------------------ |
| **HTTP Adaptive DDoS Protection** |                                       |          |                                |
| For Origins                       | Origin errors                         | Yes      | —                              |
| For User-Agents                   | User Agent(entire Cloudflare network) | Yes      | —                              |
| For Locations                     | Client IP country and region          | Yes      | —                              |
| **L3/4 Adaptive DDoS Protection** |                                       |          |                                |
| For Protocols                     | IP protocol                           | —        | Yes                            |
| For Protocols                     | Client IP country and Region for UDP  | —        | Yes                            |

1 _WAF/CDN customers on the Enterprise plan with the Advanced DDoS Protection subscription._

  
2 _Magic Transit and Spectrum BYOIP customers on an Enterprise plan._

## How it works

Adaptive DDoS Protection creates a traffic profile by looking at the maximum rates of traffic every day, for the past seven days. These profiles are recalculated every day, keeping the seven-day time window. Adaptive DDoS Protection stores the maximal traffic rates seen for every predefined dimension value (the profiling dimension varies for each rule). Every profile uses one dimension, such as the source country of the request, the user agent, and the IP protocol. Incoming traffic that deviates from your profile may be malicious.

To eliminate outliers, rate calculations only consider the 95th percentile rates (discarding the top 5% of the highest rates). Cloudflare requires a minimum amount of requests per second (rps) to build traffic profiles. HTTP Adaptive DDoS Protection rules also take into account Cloudflare's [Machine Learning (ML) models](https://developers.cloudflare.com/bots/concepts/bot-score/#machine-learning) to identify traffic that is likely automated.

Cloudflare may change the logic of these protection rules from time to time to improve them.

Note

HTTP Adaptive DDoS Protection rules calculate the traffic profile at the zone-level. Therefore, the HTTP Adaptive rules may be ineffective for an [SSL for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) zone shared by many of your customers' [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). The traffic profile would be created based on the varied and aggregated traffic of all of the various custom hostnames. It will not be accurate for an individual customer's hostname.

---

## View flagged traffic

To view traffic flagged by HTTP Adaptive DDoS Protection rules:

* [  New dashboard ](#tab-panel-8049)
* [ Old dashboard ](#tab-panel-8050)

1. In the Cloudflare dashboard, go to the **Security Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Go to **Events**.
3. Filter by `Service equals HTTP DDoS` and by rule ID.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Events**.
3. Filter by `Service equals HTTP DDoS` and by rule ID.

To view traffic flagged by L3/4 Adaptive DDoS Protection rules:

* [  New dashboard ](#tab-panel-8051)
* [ Old dashboard ](#tab-panel-8052)

1. In the Cloudflare dashboard, go to the **Security Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Go to **Events**.
3. Filter by rule ID.

1. In the Cloudflare dashboard, go to the **Network analytics** page.  
[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics)
2. Filter by rule ID.

You may also obtain information about flagged traffic through [Logpush](https://developers.cloudflare.com/logs/logpush/) or the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/).

To determine if an adaptive rule fits your traffic in a way that will only mitigate attack traffic and will not cause false positives, review the traffic that is _Logged_ by the adaptive rules.

Note

You may not see any traffic matching the adaptive rules. This can be because there was no deviation from your traffic profile, so you may want to increase the time range and look for any _Logged_ traffic. Another reason why you may not see _Logged_ traffic by the adaptive rules is that there was not sufficient traffic volume to generate a traffic profile for your zone.

If you do see traffic that was _Logged_ by the adaptive rules, use the dashboard to determine if the traffic matches the characteristics of legitimate users or that of attack traffic. As each Internet property is unique, understanding if the traffic is legitimate requires your understanding of how your legitimate traffic looks. For example, the user agent, source country, headers, query string for HTTP requests, and protocols and ports for L3/4 traffic.

* In cases where you are certain that the rule is only flagging attack traffic, you should consider creating an override and enabling that rule with a [Managed Challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge) or `Block` action.
* In cases where you see legitimate traffic being flagged, you should lower the sensitivity level of the rule and observe the flagged traffic. You can continue reducing the sensitivity level until you reach a point where legitimate traffic is not flagged. Then, you should create an override to enable the rule with a mitigation action.
* If the rule is still flagging legitimate traffic you can consider using the expression filters to condition the rules to exclude certain types of traffic.

The default rule action for `log` with a sensitivity set to `high` will only show packets or requests with suspected attack traffic over internal `high` thresholds in your logs. For instance, if you set the threshold to `medium` or `low`, then only packets over those thresholds will be logged.

## Configure the rules

You can adjust the action and sensitivity of the Adaptive DDoS Protection rules. The default action is _Log_. Use this action to first observe what traffic is flagged before deciding on a mitigation action.

To configure a rule, refer to the instructions in the following pages:

* [Configure HTTP DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/) (for L7 rules)
* [Configure Network-layer DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/) (for L3/4 rules)

For more information on the available configuration parameters, refer to the following pages:

* For the (L7) DDoS protection rules for Origins, User-Agents, and Locations:  
[HTTP DDoS Attack Protection parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/)
* For the (L3/4) DDoS protection rules for Protocols:  
[Network-layer DDoS Attack Protection parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/#page","headline":"Adaptive DDoS Protection · Cloudflare DDoS Protection docs","description":"Explore Cloudflare's Adaptive DDoS Protection, which learns traffic patterns to defend against sophisticated DDoS attacks on layers 3/4 and 7.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/adaptive-protection/","name":"Adaptive DDoS Protection"}}]}
```
