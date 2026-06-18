---
title: Security features interoperability
description: How Cloudflare security features interact and execute in order.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Security features interoperability

Cloudflare applies multiple security features to every incoming request. Each feature runs at a specific stage, and the order determines which feature acts first. Understanding this order helps you avoid conflicts and reduce false positives.

## Execution order

Cloudflare security features powered by the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/) run in a fixed sequence of phases. When a request arrives, it passes through each phase in order. If a rule takes a [terminating action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) (for example, _Block_ or _Managed Challenge_), the request stops and does not reach later phases.

The security-related request phases, in execution order, are:

| Phase name                       | Product                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ddos\_l7                         | [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/) |
| http\_request\_firewall\_custom  | [Custom rules](https://developers.cloudflare.com/waf/custom-rules/)                                     |
| http\_ratelimit                  | [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)                       |
| http\_request\_firewall\_managed | [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/)                                   |
| http\_request\_sbfm              | [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/)        |

Within each phase, account-level rulesets run before zone-level rulesets.

Note

[Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) does not use the Ruleset Engine. It operates outside this phase system and cannot be skipped with custom rules.

The Ruleset Engine powers many Cloudflare products beyond security. Refer to [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) for the complete list of request and response phases.

### Features outside the Ruleset Engine

The following security features are not powered by the Ruleset Engine and are evaluated independently:

* [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)
* [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)
* [User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/)
* [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)
* [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)
* [Security Level](https://developers.cloudflare.com/waf/tools/security-level/)

Because these features run independently, they do not follow the phase order described above.

## Security features overview

### DDoS protection

[DDoS protection](https://developers.cloudflare.com/ddos-protection/) is always on for all Cloudflare plans. L7 HTTP DDoS Attack Protection detects and mitigates application-layer DDoS attacks. L3/4 Network-layer DDoS Attack Protection handles network-layer attacks. You do not need to turn on or configure anything for DDoS protection to work.

### Custom rules

[Custom rules](https://developers.cloudflare.com/waf/custom-rules/) are rules you define. They run in the `http_request_firewall_custom` phase and support actions like _Block_, _Managed Challenge_, _Skip_, and _Log_. You can reference [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) fields, [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) fields, and all standard request fields in your expressions.

### Rate limiting rules

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) throttle or block traffic that exceeds a defined request rate. They run in the `http_ratelimit` phase, after custom rules.

### Managed Rules

[Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) are pre-configured rulesets maintained by Cloudflare. These include the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) and the [OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/). They run in the `http_request_firewall_managed` phase.

### Bot Fight Mode

[Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) is available on Free plans. It is a simple on/off toggle that challenges traffic matching patterns of known bots. You cannot customize its behavior or skip it with custom rules.

### Super Bot Fight Mode

[Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) (SBFM) is available on Pro, Business, and Enterprise plans (without the Bot Management add-on). It runs in the `http_request_sbfm` phase and offers more control than Bot Fight Mode. You can configure separate actions for **Definitely automated**, **Likely automated**, and **Verified bots** traffic. You can skip SBFM for specific requests using the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/) in custom rules.

### Bot Management

[Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) is an Enterprise add-on. It generates a bot score from `1` to `99` for every request. Lower scores indicate more automated traffic. You write custom rules using the `cf.bot_management.score` field to take action based on this score. For more information, refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/).

## Key interaction rules

These rules govern how security features interact:

* **Terminating actions stop the request evaluation workflow.** If a rule blocks or challenges a request, Cloudflare does not evaluate later phases for that request.
* **Custom rules run before SBFM.** A terminating action in custom rules prevents Super Bot Fight Mode from evaluating the request.
* **Skip actions bypass later phases.** You can use the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/options/) in custom rules to bypass rate limiting rules (`http_ratelimit`), Super Bot Fight Mode (`http_request_sbfm`), and Managed Rules (`http_request_firewall_managed`).
* **Bot Fight Mode cannot be skipped.** Because Bot Fight Mode is not part of the Ruleset Engine, custom rules cannot skip it. If you need to exempt traffic from bot protection, upgrade to Super Bot Fight Mode or Bot Management.
* **Bot Management scores are available in custom rules.** Enterprise customers with Bot Management can use `cf.bot_management.score` in custom rule expressions to define custom thresholds per path, user agent, or any other request property.

## Common scenarios

### Small business website (Free plan)

A Free plan includes DDoS protection and Bot Fight Mode.

* DDoS protection runs automatically on every request.
* Turn on **Bot Fight Mode** under **Security** \> **Settings** to challenge known bot patterns.
* Turn on **Block AI Bots** to prevent AI crawlers from scraping your content.

Because Bot Fight Mode cannot be skipped or customized, you cannot create exceptions for specific bots. If Bot Fight Mode causes false positives for legitimate automated traffic (for example, monitoring services or payment processors), consider upgrading to a Pro or Business plan that includes Super Bot Fight Mode.

### E-commerce site (Pro or Business plan)

A Pro or Business plan adds Super Bot Fight Mode, custom rules, and Managed Rules.

* DDoS protection runs automatically.
* Turn on **Super Bot Fight Mode** to block automated and likely automated traffic.
* Deploy **Managed Rules** for protection against known vulnerabilities like SQL injection and cross-site scripting.
* Create custom rules with the _Skip_ action to allow legitimate automated traffic while SBFM blocks bad bots everywhere else. Use the following rule configuration:  
   * Set the rule expression to match the IP addresses or user agents of your payment processor.  
   * Set the action to _Skip_, and select **Super Bot Fight Mode**.

### Enterprise API and website (Enterprise plan)

An Enterprise plan with the Bot Management add-on provides the most flexibility.

* DDoS protection runs automatically.
* Bot Management generates a bot score on every request.
* Create custom rules that reference `cf.bot_management.score` to define your own thresholds. For example, block requests with a bot score below 30 for website paths, while allowing all scores on API paths that authenticated partners use.
* Use rate limiting rules to throttle abusive traffic patterns.
* Deploy Managed Rules to protect against known vulnerabilities.

## Troubleshoot conflicts

When security features interfere with legitimate traffic, use the following steps to identify and resolve the issue.

### Identify which feature blocked a request

Use [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to identify the feature that blocked a request:

* [  New dashboard ](#tab-panel-11198)
* [ Old dashboard ](#tab-panel-11199)

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Events** tab.
3. Find the blocked request in the log.
4. Check the **Service** field to determine which product took the action. This field tells you which feature to adjust.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **Events**.
3. Find the blocked request in the log.
4. Check the **Service** field to determine which product took the action. This field tells you which feature to adjust.

### Resolve Bot Fight Mode false positives

Bot Fight Mode does not support exceptions. You have two options:

* Turn off Bot Fight Mode entirely under **Security** \> **Settings**.
* Upgrade to a plan with Super Bot Fight Mode, which supports skip rules.

For more information, refer to [Handle false positives from Bot Fight Mode or Super Bot Fight Mode](https://developers.cloudflare.com/bots/troubleshooting/false-positives/).

### Resolve Super Bot Fight Mode false positives

Create a custom rule with the _Skip_ action to bypass SBFM for the affected traffic:

* [  New dashboard ](#tab-panel-11200)
* [ Old dashboard ](#tab-panel-11201)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.
3. Define an expression that matches the legitimate traffic (for example, a specific IP range or user agent).
4. Set the action to _Skip_ and select **Super Bot Fight Mode**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. Select **Create rule**.
4. Define an expression that matches the legitimate traffic (for example, a specific IP range or user agent).
5. Set the action to _Skip_ and select **Super Bot Fight Mode**.

For more information, refer to [Handle false positives from Bot Fight Mode or Super Bot Fight Mode](https://developers.cloudflare.com/bots/troubleshooting/false-positives/).

Warning

If you use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), keep **Definitely Automated** set to **Allow** in your Super Bot Fight Mode configuration. Otherwise, tunnels might fail with a `websocket: bad handshake` error.

### Resolve Managed Rules false positives

If a managed rule blocks legitimate traffic:

* Create a [WAF exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip specific rules or rulesets for matching requests.
* Disable individual rules within a managed ruleset if they do not apply to your application.

For detailed guidance, refer to [Troubleshoot managed rules](https://developers.cloudflare.com/waf/managed-rules/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/feature-interoperability/#page","headline":"Security features interoperability · Cloudflare Web Application Firewall (WAF) docs","description":"How Cloudflare security features interact and execute in order.","url":"https://developers.cloudflare.com/waf/feature-interoperability/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/feature-interoperability/","name":"Security features interoperability"}}]}
```
