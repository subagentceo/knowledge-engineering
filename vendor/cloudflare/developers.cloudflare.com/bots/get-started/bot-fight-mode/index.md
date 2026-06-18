---
title: Bot Fight Mode
description: Turn on Bot Fight Mode to challenge requests matching bot patterns on Free plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot Fight Mode

Bot Fight Mode is a simple, free product that helps detect and mitigate bot traffic on your domain. When enabled, the product:

* Identifies traffic matching patterns of known bots
* Issues computationally expensive challenges that force the requesting client to perform CPU-intensive calculations, increasing the cost for bots to send automated requests
* Notifies [Bandwidth Alliance ↗](https://cloudflare.com/bandwidth-alliance/) partners (if applicable) to disable bots

## Considerations

Bot Fight Mode and Super Bot Fight Mode use the same underlying technology that powers our [Bot Management ↗](https://www.cloudflare.com/products/bot-management/) product. Specifically, these products:

* Protect entire domains without endpoint restrictions
* Cannot be customized, adjusted, or reconfigured via WAF custom rules

Although these products are designed to fight malicious actors on the Internet, they may challenge API or mobile app traffic. For more granular control, upgrade to [Bot Management for Enterprise](https://developers.cloudflare.com/bots/plans/bm-subscription/).

## Interaction with other app security features

If you are using several app security features like custom rules, Managed Rules, and Bot Fight Mode, it is important to understand how these features interact and the order in which they execute. Refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) for more information.

---

## Enable Bot Fight Mode

To start using Bot Fight Mode:

* [  New dashboard ](#tab-panel-6840)
* [ Old dashboard ](#tab-panel-6841)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot fight mode**.
4. Turn **Bot fight mode** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. For **Bot Fight Mode**, select **On**.

Note

If you are upgrading from Bot Fight Mode to Super Bot Fight Mode, you must disable Bot Fight Mode in your Bot settings.

* Old dashboard: **Security** \> **Bots**, and select **Configure Bot Fight Mode**.
* New dashboard: **Security** \> **Settings**. Filter by **Bot traffic** and turn **Bot fight mode** off.

---

## Disable Bot Fight Mode

If you find that **Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Bot Fight Mode:

* [  New dashboard ](#tab-panel-6838)
* [ Old dashboard ](#tab-panel-6839)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot Fight Mode**.
4. Turn **Bot Fight Mode** off.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. For **Bot Fight Mode**, select **Off**.

---

## Block AI bots

Refer to [Block AI bots](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

Note

You can view blocked AI bot traffic via [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

---

## Visibility

You can see bot-related actions by going to **Security** \> **Events**. Any requests challenged by this product will be labeled **Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.

---

## Limitations

### Rules

You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules. This is because Bot Fight Mode does not run on the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/) — it operates in a separate evaluation pipeline where _Skip_, _Bypass_, and _Allow_ actions have no effect.

If you need to create exceptions for specific traffic (for example, your own API clients or monitoring tools), use [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) instead. Super Bot Fight Mode runs on the Ruleset Engine and supports Skip rules.

Bot Fight Mode can still trigger if you have [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/), but it will not trigger if an IP Access rule matches the request first.

### JavaScript Detections

For Bot Fight Mode customers, [JavaScript Detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) is automatically enabled and cannot be disabled.

If you have a Content Security Policy (CSP), you need to take additional steps to implement JavaScript Detections:

* Ensure that anything under `/cdn-cgi/challenge-platform/` is allowed. Your CSP should allow scripts served from your origin domain (`script-src self`).
* For `nonce` script tags:  
   * If your CSP uses a `nonce` for script tags, Cloudflare will add these nonces to the scripts it injects by parsing your CSP response header.  
   * If your CSP does not use `nonce` for script tags and **JavaScript Detections** is enabled, you may see a console error such as `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-b123b8a70+4jEj+d6gWI9U6IilUJIrlnRJbRR/uQl2Jc='), or a nonce ('nonce-...') is required to enable inline execution.` We highly discourage the use of `unsafe-inline` and instead recommend the use CSP `nonces` in script tags which we parse and support in our CDN.

Warning

JavaScript Detections is not supported with `nonce` set via `<meta>` tags.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#page","headline":"Get started with Bot Fight Mode · Cloudflare bot solutions docs","description":"Turn on Bot Fight Mode to challenge requests matching bot patterns on Free plans.","url":"https://developers.cloudflare.com/bots/get-started/bot-fight-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/get-started/","name":"Get started with Cloudflare bot solutions"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/get-started/bot-fight-mode/","name":"Bot Fight Mode"}}]}
```
