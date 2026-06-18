---
title: Turnstile Analytics
description: Use Turnstile Analytics to view the number of challenges issued, the challenge solve rate, and the metrics of issued challenges.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Turnstile Analytics

Turnstile Analytics shows widget statistics across traffic dimensions like hostname, country, browser, and IP address. Use these metrics to identify where challenge activity is highest and whether specific sources are failing or bypassing challenges.

## Available statistics

* **Top Hostnames**: If the Turnstile widget is placed across multiple hostnames, this will display the highest traffic hostnames where challenges are being issued.
* **Top Browsers**: A breakdown of browsers that are most commonly encountering Turnstile challenges, helping customers spot trends in visitor traffic.
* **Top Countries**: View the top originating countries for visitors completing challenges, which can help identify regional traffic anomalies.
* **Top User Agents**: Identify which user agents are generating the most Turnstile challenge requests.
* [**Top ASNs** ↗](https://cloudflare.com/learning/network-layer/what-is-an-autonomous-system): Displays the highest volume of challenges issued from specific Autonomous System Numbers (ASNs), helping customers detect potential bot activity.
* **Top Operating Systems**: Shows which operating systems are most common among visitors passing or failing challenges.
* [**Top Source IPs** ↗](https://cloudflare.com/learning/ddos/glossary/ip-spoofing): Identify the highest-volume IP addresses issuing Turnstile challenges, which can be useful in identifying attack sources or repeated challenge failures.

## View widget metrics

To see an overview of your widget analytics:

[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile) ![Turnstile Analytics overview](https://developers.cloudflare.com/_astro/top-actions.Bxq-7U4T_1hlQDM.webp) 

The metrics show changes in the solve rate, widget traffic, and top actions for your widget.

Refer to the pages below for more information about Turnstile Analytics:

* [ Challenge outcome ](https://developers.cloudflare.com/turnstile/turnstile-analytics/challenge-outcomes/)
* [ Token validation ](https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/turnstile-analytics/#page","headline":"Turnstile Analytics · Cloudflare Turnstile docs","description":"Use Turnstile Analytics to view the number of challenges issued, the challenge solve rate, and the metrics of issued challenges.","url":"https://developers.cloudflare.com/turnstile/turnstile-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/turnstile-analytics/","name":"Turnstile Analytics"}}]}
```
