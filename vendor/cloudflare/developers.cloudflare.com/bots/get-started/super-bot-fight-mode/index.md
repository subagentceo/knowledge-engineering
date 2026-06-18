---
title: Super Bot Fight Mode
description: Configure Super Bot Fight Mode to challenge or block bots on Pro, Business, and Enterprise plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Super Bot Fight Mode

Super Bot Fight Mode is included in your Pro, Business, or Enterprise subscription. Compared to [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/), Super Bot Fight Mode adds configurable actions per bot category, bot analytics, and the ability to create exceptions using [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). When enabled, the product:

* Identifies traffic matching patterns of known bots
* Can challenge or block bots
* Offers protection for static resources
* Provides limited analytics to help you understand bot traffic

Accounts with an Enterprise subscription but not the [Bot Management add-on](https://developers.cloudflare.com/bots/get-started/bot-management/) will have Super Bot Fight Mode for Business.

## Considerations

Bot Fight Mode and Super Bot Fight Mode use the same underlying technology that powers our [Bot Management ↗](https://www.cloudflare.com/products/bot-management/) product. Specifically, these products:

* Protect entire domains without endpoint restrictions
* Cannot be customized, adjusted, or reconfigured via WAF custom rules

Although these products are designed to fight malicious actors on the Internet, they may challenge API or mobile app traffic. For more granular control, upgrade to [Bot Management for Enterprise](https://developers.cloudflare.com/bots/plans/bm-subscription/).

### Interaction with other app security features

If you are using several app security features like custom rules, Managed Rules, and Super Bot Fight Mode, it is important to understand how these features interact and the order in which they execute. Refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) for more information.

### Configure exceptions to Super Bot Fight Mode

[Custom rules](https://developers.cloudflare.com/waf/custom-rules/) are executed before Super Bot Fight Mode. To configure exceptions to Super Bot Fight Mode, create a custom rule with the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/). The _Skip_ action allows the request to bypass the Super Bot Fight Mode phase without terminating the request, enabling it to continue through the rest of the security stack.

## Enable Super Bot Fight Mode

Note

If you are upgrading from Bot Fight Mode to Super Bot Fight Mode, you must disable Bot Fight Mode in your Bot settings.

* Old dashboard: **Security** \> **Bots**, and select **Configure Bot Fight Mode**.
* New dashboard: **Security** \> **Settings**. Filter by **Bot traffic** and turn **Bot fight mode** off.

To start using Super Bot Fight Mode:

* [  New dashboard ](#tab-panel-6848)
* [ Old dashboard ](#tab-panel-6849)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Super Bot fight mode**.
4. Turn **Super Bot fight mode** on.
5. Choose how your domain should respond to various types of traffic by selecting the associated edit icon:  
   * For more details on verified bots, refer to [Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).  
   * For more details on supported file types, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).  
   * For more details on invisible code injection, refer to [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/).  
   * For more details on WordPress optimization, refer to [Super Bot Fight Mode for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/).

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Super Bot Fight Mode**.
4. Choose how your domain should respond to various types of traffic:  
   * For more details on verified bots, refer to [Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).  
   * For more details on supported file types, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).  
   * For more details on invisible code injection, refer to [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/).  
   * For more details on WordPress optimization, refer to [Super Bot Fight Mode for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/).

Warning

If your organization also uses [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), keep **Definitely Automated** set to **Allow**. Otherwise, Super Bot Fight Mode may block tunnel connections, causing failures with a `websocket: bad handshake` error.

In parts of your site where you want bot traffic, you can use the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/) in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) to specify where Super Bot Fight Mode should not run.

You can use the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) and its [operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/) and [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) in custom rules to configure a scoped rule for approved automated traffic in Super Bot Fight Mode.

---

## Disable Super Bot Fight Mode

If you find that **Super Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Super Bot Fight Mode:

* [  New dashboard ](#tab-panel-6846)
* [ Old dashboard ](#tab-panel-6847)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Super Bot Fight Mode**.
4. For all bot groupings (**Definitely automated traffic**, **Likely automated traffic**, and **Verified bots**), set the value to **Allow**.
5. For all other options (**Static resource protection**, **JavaScript detections**, and **Optimize for WordPress**), select the edit icon and ensure they are off.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Super Bot Fight Mode**.
4. For all bot groupings (**Definitely automated traffic**, **Likely automated traffic**, and **Verified bots**), set the value to **Allow**.
5. For all other options (**Static resource protection**, **JavaScript detections**, and **Optimize for WordPress**), select the edit icon and ensure they are off.

In parts of your site where you want bot traffic, you can use the [_Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/) in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) to specify where Super Bot Fight Mode should not run.

You can use the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) and its [operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/) and [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) in custom rules to configure a scoped rule for approved automated traffic in Super Bot Fight Mode.

---

## Block AI bots

Refer to [Block AI bots](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

Note

You can view blocked AI bot traffic via [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

---

## Analytics

### Bot Report

Use the **Bot Report** to monitor bot traffic for the past 24 hours.

To access the **Bot Report**, go to **Security** \> **Bots**. If you see a double-digit percentage of automated traffic, you may want to upgrade to [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) to save money on origin costs and protect your domain from large-scale attacks.

![Example traffic distribution as part of a bot report](https://developers.cloudflare.com/_astro/bot-report-pro.BU1S3xco_ZvNVOm.webp) 

### Security events

You can see bot-related actions by going to **Security** \> **Events**. Any requests challenged by this product will be labeled **Super Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.

---

## Ruleset Engine

Super Bot Fight Mode rules run after WAF custom rules in the request evaluation pipeline. Specifically, Super Bot Fight Mode runs during the `http_request_sbfm` phase of the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/about/phases/).

Change notice for Super Bot Fight Mode rulesets

Updating Super Bot Fight Mode rules via the Rulesets API is no longer supported and may cause unexpected behavior if you do so.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/#page","headline":"Get started with Super Bot Fight Mode · Cloudflare bot solutions docs","description":"Configure Super Bot Fight Mode to challenge or block bots on Pro, Business, and Enterprise plans.","url":"https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/get-started/","name":"Get started with Cloudflare bot solutions"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/get-started/super-bot-fight-mode/","name":"Super Bot Fight Mode"}}]}
```
