---
title: Handle False Positives from Bot Fight Mode or Super Bot Fight Mode
description: Resolve false positives where legitimate traffic is blocked by bot protection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Handle False Positives from Bot Fight Mode or Super Bot Fight Mode

[Bot Fight Mode (BFM)](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) and [Super Bot Fight Mode (SBFM)](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) are designed to stop active attacks quickly. Due to their aggressive nature, false positives can occur where legitimate human or automated traffic is incorrectly challenged or blocked.

When dealing with false positives, consider the following key differences and solutions:

* Bot Fight Mode has limited control. You cannot bypass or skip Bot Fight Mode using the _Skip_ action in WAF custom rules or using Page Rules. Bot Fight Mode will be disabled if there are any IP Access rules present. If you turned on BFM during an attack, and the attack has subsided, we recommend either disabling the feature using IP Access rules to bypass BFM, or looking at [Bot Management for Enterprise](https://developers.cloudflare.com/bots/plans/bm-subscription/), which gives you the ability to precisely customize your security threshold and create exception rules as needed.
* Super Bot Fight Mode can be bypassed with IP Access _Allow_ action rules. You can use the _Skip_ action in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/skip/) to specify where Super Bot Fight Mode should not run.

In parts of your site where you want bot traffic, you can use the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/) in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) to specify where Super Bot Fight Mode should not run.

You can use the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) and its [operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/) and [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) in custom rules to configure a scoped rule for approved automated traffic in Super Bot Fight Mode.

You cannot bypass or skip Bot Fight Mode using the _Skip_ action in WAF custom rules or using Page Rules. _Skip_, _Bypass_, and _Allow_ actions apply to rules or rulesets running on the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/). While Super Bot Fight Mode rules are implemented in the Ruleset Engine, Bot Fight Mode checks are not. This is why you can skip Super Bot Fight Mode, but not Bot Fight Mode. If you need to skip Bot Fight Mode, consider using [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).

Bot Fight Mode can still trigger if you have IP Access rules, but it cannot trigger if an IP Access rule matches the request. For example, the IP Access rule matches the connecting IP.

If you encounter persistent false positives, you can [disable the feature in the Cloudflare dashboard](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#disable-bot-fight-mode).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/troubleshooting/false-positives/#page","headline":"Handle False Positives from Bot Fight Mode or Super Bot Fight Mode · Cloudflare bot solutions docs","description":"Resolve false positives where legitimate traffic is blocked by bot protection.","url":"https://developers.cloudflare.com/bots/troubleshooting/false-positives/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/troubleshooting/false-positives/","name":"Handle False Positives from Bot Fight Mode or Super Bot Fight Mode"}}]}
```
