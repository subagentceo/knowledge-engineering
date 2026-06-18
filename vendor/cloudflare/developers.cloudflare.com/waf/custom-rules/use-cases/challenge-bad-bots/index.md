---
title: Challenge bad bots
description: Challenge requests from bad bots with a managed challenge.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Challenge bad bots

Cloudflare's Bot Management feature scores the likelihood that a request originates from a bot.

Note

Access to [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) requires a Cloudflare Enterprise plan with Bot Management enabled.

## Bot settings

Before creating custom rules for bot protection, review the settings on your [Security Settings](https://developers.cloudflare.com/security/) page under **Bot traffic**. Built-in features auto-update with new bot signatures, do not count toward your custom rule limits, and are simpler to manage.

| Use case                                            | Bot setting                    |
| --------------------------------------------------- | ------------------------------ |
| Block AI crawlers (GPTBot, ClaudeBot, etc.)         | **Block AI bots**              |
| Block definitely automated traffic (bot score of 1) | **Definitely automated**       |
| Challenge likely automated traffic (bot score 2-29) | **Likely automated**           |
| Allow verified bots (Googlebot, Bingbot, etc.)      | **Verified bots**              |
| Extend bot protection to static resources           | **Static resource protection** |
| Allow WordPress loopback requests                   | **Optimize for WordPress**     |

Custom rules are still valuable when you need path-specific protection (different handling for `/api/` vs. `/login/`), custom score thresholds (for example, score below 20 instead of 30), conditional logic combining bot score with other fields, or custom actions not available in the built-in settings.

Bot score ranges from 1 through 99\. A low score indicates the request comes from a script, API service, or an automated agent. A high score indicates that a human issued the request from a standard desktop or mobile web browser.

These examples use:

* [cf.bot\_management.score](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.score/) to target requests from bots
* [cf.bot\_management.verified\_bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.verified%5Fbot/) to identify requests from [known good bots ↗](https://radar.cloudflare.com/verified-bots)
* [cf.bot\_management.ja3\_hash](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.ja3%5Fhash/) to target specific [JA3 Fingerprints](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/)

## Suggested rules

For best results:

* Use [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/#enterprise-bot-management) to learn about your traffic before applying rules.
* Start small and increase your bot threshold over time.

Your rules may also vary based on the [nature of your site](https://developers.cloudflare.com/bots/get-started/bot-management/) and your tolerance for false positives.

### General protection

Note

Custom rules execute before [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/#waf-custom-rules). If you already configured actions for **Definitely automated** and **Likely automated** traffic in **Security Settings**, deploying these custom rules creates additional rules that take priority over those settings on matching traffic.

The following three custom rules provide baseline protection against malicious bots:

**Rule 1: Skip verified bots**

* **Expression**: `(cf.bot_management.verified_bot)`
* **Action**: _Skip:_  
   * _All remaining custom rules_
* Known good bots (Googlebot, Bingbot, monitoring services) bypass all custom rules. Refer to the [verified bots list](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) and [Radar bots directory ↗](https://radar.cloudflare.com/bots/directory).

**Rule 2: Block definitely automated**

* **Expression**: `(cf.bot_management.score eq 1)`
* **Action**: _Block_
* Score 1 traffic is definitively automated. Blocking it carries minimal false positive risk.

**Rule 3: Challenge likely automated**

* **Expression**: `(cf.bot_management.score gt 1 and cf.bot_management.score lt 30)`
* **Action**: _Managed Challenge_
* Scores 2-29 indicate likely automated behavior. A challenge lets legitimate users through while stopping bots.

### Specific protection for browser, API, and mobile traffic

#### Protect browser endpoints

When a request is definitely automated (score of 1) or likely automated (scores 2 through 29) and is _not_ on the list of known good bots, Cloudflare blocks the request.

* **Expression**: `(cf.bot_management.score lt 30 and not cf.bot_management.verified_bot)`
* **Action**: _Block_

#### Exempt API traffic

Since Bot Management detects automated users, you need to explicitly allow your **good** automated traffic⁠ — this includes your [APIs ↗](https://www.cloudflare.com/learning/security/api/what-is-an-api/) and partner APIs.

This example offers the same protection as the browser-only rule, but allows automated traffic to your API.

* **Expression**: `(cf.bot_management.score lt 30 and not cf.bot_management.verified_bot and not starts_with(http.request.uri.path, "/api"))`
* **Action**: _Block_

#### Adjust for mobile traffic

Since Bot Management can be more sensitive to mobile traffic, you may want to add in additional logic to avoid blocking legitimate requests.

If you are handling requests from your own mobile application, you could potentially allow it based on its specific [JA3 fingerprint](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/).

* **Expression**: `(cf.bot_management.ja3_hash eq "df669e7ea913f1ac0c0cce9a201a2ec1")`
* **Action**: _Skip:_  
   * _All remaining custom rules_

Otherwise, you could set lower thresholds for mobile traffic. The following rules would block definitely automated mobile traffic and challenge likely automated traffic.

**Rule 1:**

* **Expression**: `(cf.bot_management.score lt 2 and http.user_agent contains "App_Name 2.0")`
* **Action**: _Block_

**Rule 2:**

* **Expression**: `(cf.bot_management.score lt 30 and http.user_agent contains "App_Name 2.0")`
* **Action**: _Managed Challenge_

#### Combine the different rules

If your domain handles mobile, browser, and API traffic, you would want to arrange these example rules in the following order:

* Rule for [API traffic](#exempt-api-traffic)
* Rule(s) for [mobile traffic](#adjust-for-mobile-traffic)
* Rule for [browser traffic](#protect-browser-endpoints)

### Static resource protection

Static resources are protected by default when you create custom rules using the `cf.bot_management.score` field.

To exclude static resources, include `not (cf.bot_management.static_resource)` in your rule expression. For details, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).

### Additional considerations

From there, you could customize your custom rules based on specific request paths (`/login` or `/signup`), common traffic patterns, or many other characteristics.

Make sure you review [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/#enterprise-bot-management) and [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to check if your rules need more tuning.

---

## Other resources

* [Use case: Allow traffic from verified bots](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/)
* [Tutorial: Integrate Turnstile, WAF, and Bot Management](https://developers.cloudflare.com/turnstile/tutorials/integrating-turnstile-waf-and-bot-management/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/#page","headline":"Challenge bad bots · Cloudflare Web Application Firewall (WAF) docs","description":"Challenge requests from bad bots with a managed challenge.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/challenge-bad-bots/","name":"Challenge bad bots"}}]}
```
