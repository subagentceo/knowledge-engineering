---
title: Configure a rule with the Skip action
description: Use the Skip action to bypass security features for matching requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure a rule with the Skip action

Use the _Skip_ action in a custom rule to skip one or more security features. A rule configured with the _Skip_ action is also known as a skip rule.

Skip rules allow specific requests to bypass security features that would otherwise block or challenge them. Use skip rules when legitimate traffic matches a security rule unintentionally. For example, to allow a trusted API client through [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), or to exempt an internal monitoring service from [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

You can skip [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) rules, and several other security products. However, you cannot skip [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) (available on the Free plan).

For more information on the available options, refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/).

* [  New dashboard ](#tab-panel-11153)
* [ Old dashboard ](#tab-panel-11154)
* [ API ](#tab-panel-11155)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) by selecting **Create rule** \> **Custom rules**, or edit an existing custom rule.
3. Define the rule name and the rule expression.
4. Under **Choose action**, select _Skip_ from the dropdown.  
![Available Skip action options when configuring a custom rule](https://developers.cloudflare.com/_astro/skip-action-options.N8Emdhwv_Z1dhCLt.webp)
5. Configure the desired [skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/).
6. Save your changes.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) by selecting **Create rule**, or edit an existing custom rule.
4. Define the rule name and the rule expression.
5. Under **Choose action**, select _Skip_ from the dropdown.  
![Available Skip action options when configuring a custom rule](https://developers.cloudflare.com/_astro/skip-action-options.N8Emdhwv_Z1dhCLt.webp)
6. Configure the desired [skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/).
7. Save your changes.

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure custom rules via API.

Refer to [API examples](https://developers.cloudflare.com/waf/custom-rules/skip/api-examples/) for examples of creating skip rules.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/skip/#page","headline":"Configure a custom rule with the Skip action · Cloudflare Web Application Firewall (WAF) docs","description":"Use the Skip action to bypass security features for matching requests.","url":"https://developers.cloudflare.com/waf/custom-rules/skip/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/skip/","name":"Configure a rule with the Skip action"}}]}
```
