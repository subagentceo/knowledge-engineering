---
title: Custom rules
description: Understand when to use the built-in bot protection settings in Security Settings versus creating WAF custom rules for bot management.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom rules

Bot protection on Cloudflare works through two complementary mechanisms: built-in settings configured through toggles in **Security Settings**, and [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) that you write using [bot management fields](https://developers.cloudflare.com/bots/reference/bot-management-variables/). Understanding when to use each approach helps you avoid creating duplicate rules and simplifies your security configuration.

The following features are configured through toggles and dropdowns in [Security Settings](https://developers.cloudflare.com/security/settings/). They do not require you to write any rule expressions.

| Feature                                                                                                                 | What it does                                                                                                     | Availability                  |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [Block AI bots](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/)                        | Blocks AI crawlers (GPTBot, ClaudeBot, Bytespider, and others) using an auto-updating managed rule               | All plans                     |
| [AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)                          | Feeds non-compliant AI crawlers into a maze of generated content                                                 | All plans                     |
| [Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)              | Prepends AI crawler disallow directives to your robots.txt                                                       | All plans                     |
| Super Bot Fight Mode > **Definitely automated**                                                                         | Blocks or challenges traffic with a [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) of 1 | Pro, Business, Enterprise     |
| Super Bot Fight Mode > **Likely automated**                                                                             | Blocks or challenges traffic with a bot score of 2-29                                                            | Business, Enterprise          |
| [Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/)                                     | Managed category of high-trust bots (Googlebot, Bingbot, and others)                                             | Pro, Business, Enterprise     |
| [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/)        | Extends bot actions to cover static file types                                                                   | Pro, Business, Enterprise     |
| [Optimize for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/)              | Allows WordPress loopback requests through bot protection                                                        | Pro, Business, Enterprise     |
| [JavaScript detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) | Injects a lightweight script to identify clients that cannot execute JavaScript                                  | All plans (automatic on Free) |

Bot settings update automatically as Cloudflare identifies new bot signatures and AI crawlers, while custom rules require manual updates. They do not count toward your [custom rule limits](https://developers.cloudflare.com/waf/custom-rules/#availability), and apply uniformly across your domain without the risk of expression errors.

## Custom rules use cases

Custom rules are valuable when you need capabilities that built-in settings do not offer. The following scenarios require [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) with [bot management fields](https://developers.cloudflare.com/bots/reference/bot-management-variables/). Bot management fields are available to customers with a [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) subscription.

### Path-specific protection

Since Bot settings apply to all traffic across your domain, you may need an alternative approach to bot handling for different paths using custom rules — for example, stricter protection on `/login/` than on `/public/`.

#### Example

Block likely automated traffic only on your login endpoint:

```

(cf.bot_management.score lt 30 and not cf.bot_management.verified_bot and http.request.uri.path eq "/login")


```

### Custom score thresholds

The **Definitely automated** and **Likely automated** settings in Super Bot Fight Mode use fixed bot score groupings (1 and 2-29). If you need a different threshold, for example, challenging all traffic with a score below 20, you need a custom rule.

### Conditional logic

If you need to combine bot score with other request fields, such as country, ASN, URI path, JA3/JA4 fingerprint, or user agent, you need custom rules. Bot settings do not support compound conditions.

#### Example

Challenge likely automated traffic only from specific ASNs:

```

(cf.bot_management.score lt 30 and not cf.bot_management.verified_bot and ip.src.asnum in {64496 65536})


```

### Custom actions

Bot settings offer **Block**, **Managed Challenge**, and **Allow** as actions.

If you need other actions, such as **Log** (for testing rules before enforcement), **Interactive Challenge**, or **Skip** (to bypass other rules), you need custom rules.

### Detection ID targeting

To act on specific bot heuristic detections, such as [account takeover](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/) or [scraping](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/scraping-detections/) patterns, you need custom rules using the `cf.bot_management.detection_ids` field. Bot settings do not expose individual detection IDs.

### Forwarding bot data to origin

To send bot scores, verified bot status, or JA3/JA4 fingerprints to your origin server, use [Transform Rules](https://developers.cloudflare.com/rules/transform/) (including [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)) or [Snippets](https://developers.cloudflare.com/rules/snippets/). These are not part of the built-in bot settings.

## Execution order

Custom rules execute before Super Bot Fight Mode managed rules. If a custom rule takes a terminating action (such as _Block_ or _Managed Challenge_), the request does not reach bot settings.

Refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/custom-rules/#page","headline":"Custom rules · Cloudflare bot solutions docs","description":"Understand when to use the built-in bot protection settings in Security Settings versus creating WAF custom rules for bot management.","url":"https://developers.cloudflare.com/bots/additional-configurations/custom-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/custom-rules/","name":"Custom rules"}}]}
```
