---
title: Scans and penetration testing policy
description: Understand Cloudflare's policy for conducting vulnerability scans and penetration tests on your own zones and assets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scans and penetration testing policy

Customers may conduct scans and penetration tests (with certain restrictions) on application and network-layer aspects of their own assets, such as their [zones](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) within their Cloudflare accounts, provided they adhere to Cloudflare's policy.

## Permitted targets

All scans or testing must be limited to the following:

* Customer-owned IPs
* Cloudflare's designated public IPs
* The customer's registered DNS entries

Targets like `*.cloudflare.com` or other Cloudflare-owned destinations are only allowed as part of Cloudflare's Public Bug Bounty program. Refer to the [Additional resources](#additional-resources) section for more information.

## Scans

* **Throttling**: Scans should be throttled to a reasonable rate to prevent disruptions and ensure stable system performance.
* **Scope and intent**: Scans should identify the presence of vulnerabilities without attempting to actively exploit any detected weaknesses.
* **Exclusions**: It is recommended to exclude [/cdn-cgi/ endpoints](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/) from scans to avoid false positives or irrelevant results.
* **Compliance checks**: Customers may conduct [PCI compliance scans](https://developers.cloudflare.com/fundamentals/security/pci-scans/) or verify that [known vulnerabilities](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/#known-vulnerabilities-mitigations) have been addressed.

## Penetration tests

Before starting a penetration test on your [zones](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones), set the following application security configurations for each zone you will run the test on:

1. [Deploy the Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#deploy-in-the-dashboard) and[enable all rules](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#ruleset-level-configuration) in the ruleset by setting **Ruleset status** to **Enabled**.
2. [Deploy the Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#deploy-in-the-dashboard) and set the following [ruleset configuration](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#ruleset-level-configuration):  
   * **Paranoia Level**: _PL4_  
   * **Score threshold**: _High - 25 and higher_
3. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) based on the [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) to block requests considered as an attack (WAF attack score between 1 and 20). Refer to the [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/#1-create-a-custom-rule) documentation for an example.
4. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) based on [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/) to block requests containing content objects considered malicious. Refer to [Example rules](https://developers.cloudflare.com/waf/detections/malicious-uploads/example-rules/#block-requests-to-uri-path-with-a-malicious-content-object) for examples of custom rules used to mitigate this kind of threat.
5. On Pro and Business plans without Bot Management, [enable Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/#enable-super-bot-fight-mode).  
Customers with access to Bot Management should make sure that [Bot Management is enabled](https://developers.cloudflare.com/bots/get-started/bot-management/#enable-bot-management-for-enterprise) (it is enabled by default on entitled zones).
6. [Create rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) to protect key endpoints of the zone being tested. Refer to [Rate limiting rule examples](https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/) and [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) for example configurations.

Be aware that other Cloudflare security and performance features, configurations, and rules active on your account or zone can influence test results.

After completing the test, it is recommended that you review your security posture and make any necessary adjustments based on the findings.

### Important remarks

* Cloudflare's [anycast network](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) will report ports other than `80` and `443` as open due to its shared infrastructure and the nature of Cloudflare's proxy. The reporting is expected behavior and does not indicate a vulnerability.
* Tools like Netcat may list [non-standard HTTP ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/) as open; however, these ports are open solely for Cloudflare's routing purposes and do not necessarily indicate that a connection can be established with the customer's origin over those ports.
* **Known false positives**: Any findings related to the [ROBOT vulnerability](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/#return-of-bleichenbachers-oracle-threat-robot) are false positives when the customer's assets are behind Cloudflare.

## Denial-of-Service (DoS) tests

For guidelines on required notification and necessary information, refer to [Simulating test DDoS attacks](https://developers.cloudflare.com/ddos-protection/reference/simulate-ddos-attack/). Customers should also familiarize themselves with Cloudflare's [DDoS protection best practices](https://developers.cloudflare.com/ddos-protection/best-practices/).

## Additional resources

* Customers can download the latest Penetration Test Report of Cloudflare via the [dashboard](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/compliance-docs/).
* For information about Cloudflare's Public Bug Bounty program, visit [HackerOne ↗](https://hackerone.com/cloudflare).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/scans-penetration/#page","headline":"Scans and penetration testing policy · Cloudflare Fundamentals docs","description":"Understand Cloudflare's policy for conducting vulnerability scans and penetration tests on your own zones and assets.","url":"https://developers.cloudflare.com/fundamentals/reference/scans-penetration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/scans-penetration/","name":"Scans and penetration testing policy"}}]}
```
