---
title: Cloudflare Turnstile
description: Verify visitors are human with a CAPTCHA-free, privacy-preserving alternative.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Turnstile

Cloudflare's smart CAPTCHA alternative.

Turnstile can be embedded into any website without sending traffic through Cloudflare and works without showing visitors a CAPTCHA.

Cloudflare issues challenges through the [Challenge Platform](https://developers.cloudflare.com/cloudflare-challenges/), which is the same underlying technology powering [Turnstile](https://developers.cloudflare.com/turnstile/).

In contrast to our Challenge page offerings, Turnstile allows you to run challenges anywhere on your site in a less-intrusive way without requiring the use of Cloudflare's CDN.

## How Turnstile works

![Turnstile Overview](https://developers.cloudflare.com/_astro/turnstile-overview.BlA8uXVD_2tsm0o.webp) 

Turnstile adapts the challenge outcome to the individual visitor or browser. First, we run a series of small non-interactive JavaScript challenges to gather signals about the visitor or browser environment.

These challenges include proof-of-work (computational puzzles), proof-of-space, probing for web APIs, and various other challenges for detecting browser-quirks and human behavior. As a result, we can fine-tune the difficulty of the challenge to the specific request and avoid showing a visual or interactive puzzle to a user.

Note

For detailed information on Turnstile's data privacy practices, refer to the [Turnstile Privacy Addendum ↗](https://www.cloudflare.com/turnstile-privacy-policy/).

### Widget types

Turnstile [widget types](https://developers.cloudflare.com/turnstile/concepts/widget/) include:

* **Managed** (recommended): Automatically decides whether to show a checkbox based on visitor risk level.
* **Non-interactive**: Visitors never need to interact with the widget.
* **Invisible**: The widget is completely hidden from the visitor.

---

## Accessibility

Turnstile is WCAG 2.2 AA compliant.

---

## Features

###  Turnstile Analytics 

Assess the number of challenges issued, evaluate the [challenge solve rate](https://developers.cloudflare.com/cloudflare-challenges/reference/challenge-solve-rate/), and view the metrics of issued challenges.

[ Use Turnstile Analytics ](https://developers.cloudflare.com/turnstile/turnstile-analytics/) 

###  Pre-clearance 

Integrate Cloudflare challenges on single-page applications (SPAs) by allowing Turnstile to issue a Pre-Clearance cookie.

[ Use Pre-clearance ](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile) 

---

## Related products

**[Bots](https://developers.cloudflare.com/bots/)** 

Cloudflare bot solutions identify and mitigate automated traffic to protect your domain from bad bots.

**[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)** 

Detect and mitigate Distributed Denial of Service (DDoS) attacks using Cloudflare's Autonomous Edge.

**[WAF](https://developers.cloudflare.com/waf/)** 

Get automatic protection from vulnerabilities and the flexibility to create custom rules.

---

## More resources

[Plans](https://developers.cloudflare.com/turnstile/plans/) 

Learn more about Turnstile's plan availability.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/turnstile/#page","headline":"Overview · Cloudflare Turnstile docs","description":"Verify visitors are human with a CAPTCHA-free, privacy-preserving alternative.","url":"https://developers.cloudflare.com/turnstile/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}}]}
```
