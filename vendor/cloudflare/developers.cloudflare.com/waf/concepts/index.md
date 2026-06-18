---
title: Concepts
description: Core WAF concepts including rules, rulesets, phases, and actions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web and API requests and filters undesired traffic based on sets of rules called rulesets. The WAF uses the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/), a flexible expression syntax that lets you filter traffic by request properties such as IP address, URL path, headers, and body content.

What is a Web Application Firewall?

A Web Application Firewall or WAF creates a shield between a web app and the Internet. This shield can help mitigate many common attacks. For a more thorough definition, refer to [Web Application Firewall explained ↗](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) in the Learning Center.

## Rules and rulesets

A [rule](https://developers.cloudflare.com/ruleset-engine/about/rules/) defines a filter and an action to perform on the incoming requests that match the filter.

A [ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/) is an ordered set of rules that you can apply to traffic on the Cloudflare global network. Rules within a ruleset are evaluated in sequence. The first matching rule with a [terminating action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) (such as Block, Challenge, or Redirect) stops evaluation — later rules do not run for that request.

## Main components

The Cloudflare WAF includes:

* [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) (for example, the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/)), which are signature-based rules created by Cloudflare that provide immediate protection against known attacks.
* [Traffic detections](https://developers.cloudflare.com/waf/detections/) (for example, bot score and attack score) that enrich requests with metadata.
* User-defined rules for your specific needs, including [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

## Detection versus mitigation

The two main roles of the Cloudflare WAF are the following:

* **Detection**: Run incoming requests through one or more [traffic detections](https://developers.cloudflare.com/waf/detections/) to find malicious or potentially malicious activity. The scores from enabled detections are available in the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) dashboard, where you can analyze your security posture and determine the most appropriate mitigation rules.
* **Mitigation**: Blocks, challenges, or throttles requests through different mitigation features such as [custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/). Rules that mitigate traffic can include scores from traffic scans in their expressions to better address possibly malicious requests.

Warning

Detections only score traffic. They do not block or challenge requests on their own. Use those scores in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to act on the findings.

### Available traffic detections

The WAF currently provides the following detections for finding security threats in incoming requests:

* [**Attack score**](https://developers.cloudflare.com/waf/detections/attack-score/): Checks for known attack variations and malicious payloads. Scores traffic on a scale from 1 (likely to be malicious) to 99 (unlikely to be malicious).
* [**Leaked credentials**](https://developers.cloudflare.com/waf/detections/leaked-credentials/): Scans incoming requests for credentials (usernames and passwords) previously leaked from data breaches.
* [**Malicious uploads**](https://developers.cloudflare.com/waf/detections/malicious-uploads/): Scans content objects, such as uploaded files, for malicious signatures like malware.
* [**AI Security for Apps**](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/): Helps protect your services powered by large language models (LLMs) against abuse.
* [**Bot score**](https://developers.cloudflare.com/bots/concepts/bot-score/): Scores traffic on a scale from 1 (likely to be a bot) to 99 (likely to be human).

To enable traffic detections in the Cloudflare dashboard, go to the Security **Settings** page.

[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings) 

Note

Currently, you cannot manage the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) and [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) detections from the **Settings** page. Refer to the documentation of each feature for availability details.

---

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The first rule with a [terminating action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) (such as _Block_, _Managed Challenge_, or _Redirect_) stops all further evaluation. For example, an IP Access rule that blocks a request prevents custom rules from running. The rule execution order is the following:

1. [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)
2. [Firewall rules](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (deprecated)
3. [Custom rules](https://developers.cloudflare.com/waf/custom-rules/)
4. [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)
5. [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/)
6. [Cloudflare Rate Limiting](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/) (previous version, no longer available)

Rules are evaluated in order. If there is a match for a rule with a [terminating action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/), the rule evaluation will stop and the action will be executed immediately. Rules with a non-terminating action (such as _Log_) will not prevent subsequent rules from being evaluated and executed. For more information on how rules are evaluated, refer to [Rule evaluation](https://developers.cloudflare.com/ruleset-engine/about/rules/#rule-evaluation) in the Ruleset Engine documentation.

For more information on the phases where each WAF feature will execute, refer to [WAF phases](https://developers.cloudflare.com/waf/reference/phases/).

For common interactions between rewrites, IP Access rules, custom rules, and managed rules, refer to [Rule phase interactions](https://developers.cloudflare.com/waf/troubleshooting/phase-interactions/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/concepts/#page","headline":"Concepts · Cloudflare Web Application Firewall (WAF) docs","description":"Core WAF concepts including rules, rulesets, phases, and actions.","url":"https://developers.cloudflare.com/waf/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/concepts/","name":"Concepts"}}]}
```
