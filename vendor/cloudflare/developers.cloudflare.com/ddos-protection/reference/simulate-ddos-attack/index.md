---
title: Simulating test DDoS attacks
description: Guidelines for simulating DDoS attacks to test protection, reporting, and alerting.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Simulating test DDoS attacks

After onboarding to Cloudflare, you may want to simulate DDoS attacks against your Internet properties to test the protection, [reporting](https://developers.cloudflare.com/ddos-protection/reference/reports/), and [alerting](https://developers.cloudflare.com/ddos-protection/reference/alerts/) mechanisms. Follow the guidelines in this section to simulate a DDoS attack.

You can only launch DDoS attacks against your own Internet properties — your zone, Spectrum application, or IP range (depending on your Cloudflare services) — and provided that:

* The Internet properties are not shared with other organizations or individuals.
* The Internet properties have been onboarded to Cloudflare in an account under your name or ownership.

## Before you start

You do not have to obtain permission from Cloudflare to launch a DDoS attack simulation against your own Internet properties.

It is recommended that you choose the right service and enable the correct features to test against the corresponding DDoS attacks. For example, if you want to test Cloudflare against an HTTP DDoS attack and you are only using Magic Transit, the test is going to fail because you need to onboard your HTTP application to Cloudflare's reverse proxy service to test our HTTP DDoS Protection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/reference/simulate-ddos-attack/#page","headline":"Simulating test DDoS attacks · Cloudflare DDoS Protection docs","description":"Guidelines for simulating DDoS attacks to test protection, reporting, and alerting.","url":"https://developers.cloudflare.com/ddos-protection/reference/simulate-ddos-attack/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/reference/simulate-ddos-attack/","name":"Simulating test DDoS attacks"}}]}
```
