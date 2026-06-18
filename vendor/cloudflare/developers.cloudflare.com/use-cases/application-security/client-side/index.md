---
title: Protect against client-side threats
description: Monitor and control third-party scripts running on your site.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect against client-side threats

Third-party scripts on your site can be compromised to exfiltrate data or inject malicious code. Cloudflare's client-side security (previously known as Page Shield) monitors every JavaScript resource loading on your pages, detects suspicious behavior, and helps you manage Content Security Policies (CSPs).

## Solutions

### Client-side security

Monitor and control third-party scripts and outbound connections on your pages. [Learn more about client-side security](https://developers.cloudflare.com/client-side-security/).

* **Script monitoring** \- Track every JavaScript resource loading on your pages, including third-party scripts
* **Malicious script detection** \- Receive alerts when scripts exhibit suspicious behavior such as data exfiltration patterns
* **Connection monitoring** \- See which external endpoints scripts are sending data to
* **CSP management** \- Generate and manage Content Security Policies (CSPs) based on observed script behavior

## Get started

1. [Enable Client-side security](https://developers.cloudflare.com/client-side-security/get-started/)
2. [Review detected scripts](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/)
3. [Configure rules](https://developers.cloudflare.com/client-side-security/rules/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/application-security/client-side/#page","headline":"Protect against client-side threats · Cloudflare use cases","description":"Monitor and control third-party scripts running on your site.","url":"https://developers.cloudflare.com/use-cases/application-security/client-side/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/application-security/","name":"Application security"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/application-security/client-side/","name":"Protect against client-side threats"}}]}
```
