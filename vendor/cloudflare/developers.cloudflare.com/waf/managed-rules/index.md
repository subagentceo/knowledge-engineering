---
title: Managed Rules
description: Deploy pre-configured managed rulesets to protect against common attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed Rules

Cloudflare provides pre-configured managed rulesets that protect against web application exploits such as the following:

* Zero-day vulnerabilities
* Top-10 attack techniques
* Use of stolen/leaked credentials
* Extraction of sensitive data

Managed rulesets are [regularly updated](https://developers.cloudflare.com/waf/change-log/). Each rule has a default action that varies according to the severity of the rule. You can adjust the behavior of specific rules, choosing from several possible actions.

Rules of managed rulesets have associated tags (such as `wordpress`) that allow you to search for a specific group of rules and configure them in bulk.

## Available managed rulesets

* [**Cloudflare Managed Ruleset**](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/): Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. It covers known attack techniques and zero-day vulnerabilities (newly discovered flaws with no available patch). The ruleset is updated frequently to address new threats and reduce false positives (legitimate requests incorrectly flagged).  
Ruleset ID: ...376e9aee
* [**Cloudflare OWASP Core Ruleset**](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/): Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. This ruleset uses a scoring model — each matching rule adds its score to a cumulative [threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score), and the WAF executes the configured action when the score exceeds the [threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold).  
Ruleset ID: ...c25d2f1f
* [**Cloudflare Exposed Credentials Check**](https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/): Deploys an automated credentials check on your end-user authentication endpoints. For any credential pair, the Cloudflare WAF performs a lookup against a public database of stolen credentials to determine if they were previously compromised. Cloudflare recommends that you use [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) instead of this ruleset.  
Ruleset ID: ...14069605
* **Cloudflare Free Managed Ruleset**: Available on all Cloudflare plans. Provides protection against high-impact and widely exploited vulnerabilities. The rules are safe to deploy on most applications. If you have already deployed the Cloudflare Managed Ruleset, you do not need this ruleset — the Cloudflare Managed Ruleset includes broader coverage.  
Ruleset ID: ...dfb893ba

The following managed rulesets run in a response phase:

* [**Cloudflare Sensitive Data Detection**](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/): Created by Cloudflare to address common data loss threats. These rules monitor the download of specific sensitive data — for example, financial and personally identifiable information.  
Ruleset ID: ...499d988e

## Availability

The managed rulesets you can deploy depend on your Cloudflare plan.

| Free                                              | Pro | Business | Enterprise |     |
| ------------------------------------------------- | --- | -------- | ---------- | --- |
| Availability                                      | Yes | Yes      | Yes        | Yes |
| Free Managed Ruleset                              | Yes | Yes      | Yes        | Yes |
| Cloudflare Managed Ruleset                        | No  | Yes      | Yes        | Yes |
| Cloudflare OWASP Core Ruleset                     | No  | Yes      | Yes        | Yes |
| Cloudflare Exposed Credentials Check (deprecated) | No  | Yes      | Yes        | Yes |
| Cloudflare Sensitive Data Detection               | No  | No       | No         | Yes |

## Customize the behavior of managed rulesets

To customize the behavior of managed rulesets, do one of the following:

* [Create exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip the execution of managed rulesets or some of their rules under certain conditions.
* [Configure overrides](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset) to change the rule action or disable one or more rules of managed rulesets. Overrides can affect an entire managed ruleset, specific tags, or specific rules in the managed ruleset.

Exceptions have priority over overrides.

Important

Ruleset overrides and tag overrides apply to both existing and _future_ rules in the managed ruleset. If you want to override existing rules only, you must use rule overrides.

## Interaction with other app security features

If you are using several app security features like custom rules, Managed Rules, and Super Bot Fight Mode, it is important to understand how these features interact and the order in which they execute. Refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) for more information.

## Important remarks

### Maximum body size

Managed rules inspect the body of each incoming request up to a maximum size. This limit varies by plan:

* For Enterprise customers, the maximum body size is 128 KB.
* For other paid plans, the limit is lower by default — contact your account team or Cloudflare Support to increase the limit.
* For users in the Free plan, the limit is 1 MB.

Request content beyond this limit may not be fully analyzed, which can affect how managed rules behave. For example, the [OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) calculates a cumulative [threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) based on the scores of individual rules that match a request. Larger payloads give more content for rules to match against, which increases the score and makes it more likely to exceed the [score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold) — resulting in a false positive.

If included in your plan, you can use [request body fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Body) in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) to apply appropriate actions to requests that have not been fully analyzed. The `http.request.body.truncated` field indicates whether the request body was truncated, while `http.request.headers.truncated` indicates whether the request contained too many headers for all of them to be included.

### Zone-level deployment

At the zone level, you can deploy each managed ruleset once. At the [account level](https://developers.cloudflare.com/waf/account/managed-rulesets/), you can deploy each managed ruleset multiple times, which allows you to apply different configurations of the same ruleset to different subsets of incoming traffic.

## Execution order

WAF Managed Rules run in the `http_request_firewall_managed` phase, which executes **after**:

* HTTP DDoS Attack Protection (`ddos_l7` phase)
* Custom Rules (`http_request_firewall_custom` phase)
* Rate Limiting Rules (`http_ratelimit` phase)

This means a rule with a terminal action (such as Block or Managed Challenge) in any of these earlier phases prevents Managed Rules from evaluating that request. For the complete security feature execution order, refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/).

### WAF exceptions

WAF exceptions (skip rules) are rules with a `skip` action deployed to the `http_request_firewall_managed` phase entry-point ruleset. They are evaluated in list order within the entry-point ruleset — a skip rule only bypasses `execute` rules listed after it. Place exceptions before the managed ruleset execute rules they are intended to skip. For more information, refer to [WAF exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/#page","headline":"Managed Rules · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy pre-configured managed rulesets to protect against common attacks.","url":"https://developers.cloudflare.com/waf/managed-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}}]}
```
