---
title: HTTP DDoS Attack Protection
description: Explore HTTP DDoS Attack Protection rule categories, including botnets, unusual requests, and advanced features, to enhance your Cloudflare security.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP DDoS Attack Protection

The Cloudflare HTTP DDoS Attack Protection managed ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/) at layer 7 (application layer) on the Cloudflare global network. The rules match known attack patterns and tools, suspicious patterns, protocol violations, requests causing large amounts of origin errors, excessive traffic hitting the origin/cache, and additional attack vectors at the application layer.

Cloudflare updates the list of rules in the managed ruleset on a regular basis. Refer to the [changelog](https://developers.cloudflare.com/ddos-protection/change-log/http/) for more information on recent and upcoming changes.

The HTTP DDoS Attack Protection managed ruleset is always enabled — you can only customize its behavior.

The HTTP DDoS Attack Protection managed ruleset provides users with increased observability into L7 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The [Security Events dashboard](https://developers.cloudflare.com/waf/analytics/security-events/), available at **Security** \> **Events**, will display information about the top HTTP DDoS managed rules.

## Ruleset configuration

If you are expecting large spikes of legitimate traffic, consider customizing your DDoS protection settings to avoid [false positives](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/#legitimate-traffic-is-incorrectly-identified-as-an-attack-and-causes-a-false-positive), where legitimate traffic is falsely identified as attack traffic and blocked/challenged.

You can adjust the behavior of the rules in the managed ruleset by modifying the following parameters:

* The performed **action** when an attack is detected.
* The **sensitivity level** of attack detection mechanisms.

Notes

* Certain actions or sensitivity levels may not be available to all Cloudflare plans.
* Currently, you can only define account-level configurations (or overrides) for the HTTP DDoS Attack Protection managed ruleset via API.

To adjust rule behavior, do one of the following:

* [Configure the managed ruleset in the Cloudflare dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/).
* [Configure the managed ruleset via API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-api/).
* [Configure the managed ruleset using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/ddos-managed-rulesets/#example-configure-http-ddos-attack-protection).

For more information on the available configuration parameters, refer to [Managed ruleset parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/).

## Origin Protect rules

Cloudflare HTTP DDoS Protection can also initiate mitigation based on the origin health. [Adaptive DDoS Protection for Origins](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/) detects and mitigates traffic that deviates from your site's origin errors profile. Floods of requests that cause a high number of zone errors (default sensitivity level is 1,000 errors per second) can initiate mitigation to alleviate the strain on the zone.

| Rule ID                          | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| dd42da7baabe4e518eaf11c393596a9d | HTTP requests causing a high number of origin errors. |

Note

This rule is available for zones on any plan.

While Cloudflare's network is built to automatically monitor and mitigate large DDoS attacks, Cloudflare also helps mitigate smaller DDoS attacks, based on the following general rules:

* For zones on any plan, Cloudflare will apply mitigations when the HTTP error rate is above the _High_ (default) sensitivity level of 1,000 errors-per-second rate threshold. You can decrease the sensitivity level by configuring the HTTP DDoS Attack Protection managed ruleset.
* For zones on Pro, Business, and Enterprise plans, Cloudflare performs an additional check for better detection accuracy: the errors-per-second rate must also be at least five times the normal origin traffic levels before applying DDoS mitigations.

All HTTP errors in the `52x` range (Internal Server Error) and all errors in the `53x` range excluding [530](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-530) are considered when factoring in the error rate. For DDoS mitigations based on HTTP error rate, you cannot exclude specific HTTP error codes.

For more information on the types of DDoS attacks covered by Cloudflare's DDoS protection, refer to [DDoS attack coverage](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/).

## Availability

The HTTP DDoS Attack Protection managed ruleset protects Cloudflare customers on all plans for zones [onboarded to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/). All customers can customize the ruleset both at the zone level and at the account level.

Customers on Enterprise plans with the Advanced DDoS Protection subscription can create up to 10 overrides (or up to 10 rules, for API users) with custom [expressions](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/), to customize the DDoS protection for different incoming requests.

Other customers can only create one override (or rule) and they cannot customize the rule expression. In this case, the single override, containing one or more configurations, will always apply to all incoming traffic.

## Related Cloudflare products

To block additional L7 attacks you can use other Cloudflare products like the [Cloudflare WAF](https://developers.cloudflare.com/waf/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/#page","headline":"HTTP DDoS Attack Protection managed ruleset · Cloudflare DDoS Protection docs","description":"Explore HTTP DDoS Attack Protection rule categories, including botnets, unusual requests, and advanced features, to enhance your Cloudflare security.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/http/","name":"HTTP DDoS Attack Protection"}}]}
```
