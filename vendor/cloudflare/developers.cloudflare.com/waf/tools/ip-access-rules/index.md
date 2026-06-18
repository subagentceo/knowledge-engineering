---
title: IP Access rules
description: Control access based on IP address, range, country, or ASN.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IP Access rules

Use IP Access rules to allowlist, block, and challenge traffic based on the visitor's IP address, Autonomous System Number (ASN), or country.

IP Access rules are commonly used to block or challenge suspected malicious traffic. Another common use of IP Access rules is to allow services that regularly access your site, such as APIs, crawlers, and payment providers.

Warning

Allowing an IP or ASN will bypass any configured [custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), and firewall rules (deprecated).

For important notes about allowing or blocking traffic by country, refer to [Important remarks about allowing/blocking by country](#important-remarks-about-allowingblocking-by-country).

## Important remarks about allowing/blocking by country

Block by country is only available on Enterprise plans.

IP addresses globally allowed by Cloudflare will override an IP Access rule country block, but they will not override a country block via [custom rules](https://developers.cloudflare.com/waf/custom-rules/).

Allowing a country will:

* Bypass any configured [custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), and firewall rules (deprecated).
* Not bypass [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) or [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).

## Recommendation: Use custom rules instead

Cloudflare recommends that you create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of IP Access rules to perform IP-based or geography-based blocking (geoblocking):

* For IP-based blocking, use an [IP list](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) in the custom rule expression. Refer to [Allow traffic from IP addresses in allowlist only](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/) for an example.
* For geoblocking, use fields such as _AS Num_, _Country_, and _Continent_ in the custom rule expression. Refer to [Block traffic from specific countries](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/) for an example.

When upgrading to custom rules, consider replacing the _Allow_ action supported by IP Access rules with the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/). Note that the _Skip_ action does not bypass all of Cloudflare's app security features.

---

## Availability

IP Access rules are available to all customers.

| Free             | Pro    | Business | Enterprise |                               |
| ---------------- | ------ | -------- | ---------- | ----------------------------- |
| Availability     | Yes    | Yes      | Yes        | Yes                           |
| Number of rules  | 50,000 | 50,000   | 50,000     | 50,000, but can purchase more |
| Block by country | No     | No       | No         | Yes                           |

Each Cloudflare account can have a maximum of 50,000 rules. If you are an Enterprise customer and need more rules, contact your account team.

Block by country is only available on Enterprise plans. Other customers may perform country blocking using [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/).

## Final remarks

* By design, IP Access rules configured to _Allow_ traffic do not show up in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).
* Requests containing certain attack patterns in the `User-Agent` field are checked before being processed by the general firewall pipeline. Therefore, such requests are blocked before any allowlist logic takes place. When this occurs, security events downloaded from the API show `rule_id` as `security_level` and action as `drop`.
* Cloudflare supports use of `fail2ban` to block IPs on your server. However, to prevent `fail2ban` from inadvertently blocking Cloudflare IPs and causing errors for some visitors, ensure you restore original visitor IP in your origin server logs. For details, refer to [Restoring original visitor IPs](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/).

## Related resources

To learn more about protection options provided by Cloudflare to protect your website against malicious traffic and bad actors, refer to [Account security](https://developers.cloudflare.com/learning-paths/application-security/account-security/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/ip-access-rules/#page","headline":"IP Access rules · Cloudflare Web Application Firewall (WAF) docs","description":"Control access based on IP address, range, country, or ASN.","url":"https://developers.cloudflare.com/waf/tools/ip-access-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/ip-access-rules/","name":"IP Access rules"}}]}
```
