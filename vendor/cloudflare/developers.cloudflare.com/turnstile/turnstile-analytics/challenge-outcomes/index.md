---
title: Challenge outcome
description: View challenge outcome metrics for your Turnstile widgets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Challenge outcome

When a visitor encounters Turnstile, it assesses whether they are human or bot-like based on various signals. These outcomes help you evaluate how effectively Turnstile is protecting your application.

## Metrics

A "solved" Turnstile challenge does not automatically confirm the visitor is human. You must [call the Siteverify API](#call-siteverify) to validate the token and proceed only if the response returns `success:true`.

For example, the challenge outcome values in your analytics may look like this:

![Challenge outcome example values](https://developers.cloudflare.com/_astro/challenge-outcomes.Czqs3OEs_1uk0rH.webp "Challenge outcome example")

Challenge outcome example

* **Challenges issued**: The total number of challenges presented to visitors within a specific timeframe.
* **Challenges solved**: The number of challenges successfully completed by visitors in that period.
* **Challenges unsolved**: Challenges that were abandoned or failed in that period.
* **Likely human**: The total number of challenges solved or the total number of challenges issued.
* **Likely bot**: The total number of challenges unsolved or the total number challenges issued.

By analyzing these metrics, you can identify trends such as high failure rates in specific regions, device types, or traffic sources, which may indicate bot activity or misconfigurations.

### Call Siteverify

It is important to [call the Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). Without calling Siteverify API to validate the tokens, your website or application is not protected. Skipping token validation means you cannot confirm the visitor's legitimacy.

* Tokens can only be redeemed once. Even valid tokens will return `success:false` if they are reused, preventing token theft and replay attacks.
* Tokens expire after five minutes. Validation must occur within this window to be effective.
* Tokens can be invalid. Bots might complete challenges, but Cloudflare can detect bot-like signals and mark the token as invalid.

## Solve rates

Turnstile's solve rate indicates how many visitors pass a challenge. Solve rates can be broken down into the total number of challenges solved and whether they are interactive, non-interactive, or pre-clearance solves.

If you are using [managed mode](https://developers.cloudflare.com/turnstile/concepts/widget/#managed-mode-recommended), you can monitor how many of your visitors were prompted to interact with the checkbox on the widget (interactive solves) and how many were verified without any disruptions to their experience (non-interactive solves).

For example, the solve rate values in your analytics may look like this:

![Solve rate example values](https://developers.cloudflare.com/_astro/solve-rates.YNiFNAbV_p3Ftp.webp "Solve rate example")

Solve rate example

### Metrics

* **Non-interactive solves**: Challenges solved without requiring the visitor to click a checkbox.
* **Interactive solves**: Challenges solved that required visitor interaction to be solved.
* [**Pre-clearance solves**](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile): Challenges solved that issued the `cf_clearance` cookie along with the Turnstile token.

A low solve rate might indicate increased bot activity attempting to bypass Turnstile or anomalous traffic patterns that require further investigation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/turnstile-analytics/challenge-outcomes/#page","headline":"Challenge outcome · Cloudflare Turnstile docs","description":"View challenge outcome metrics for your Turnstile widgets.","url":"https://developers.cloudflare.com/turnstile/turnstile-analytics/challenge-outcomes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/turnstile-analytics/","name":"Turnstile Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/turnstile-analytics/challenge-outcomes/","name":"Challenge outcome"}}]}
```
