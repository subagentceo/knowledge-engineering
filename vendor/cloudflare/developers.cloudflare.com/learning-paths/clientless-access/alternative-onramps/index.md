---
title: Alternative on-ramps
description: Secure browser-based access without device clients.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Alternative on-ramps

As discussed in the previous modules, almost everything you do with the Cloudflare reverse proxy requires [adding a site](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/) to Cloudflare. That public DNS record (or its subdomains) becomes the domain on which your users access your private applications. This method is exceptionally secure and transparent; each domain and subdomain has access to the Cloudflare web security portfolio, are inherently DDoS protected, and receive an obfuscated origin IP. For these reasons, using a [public hostname on Cloudflare](https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/) is the recommended method to onboard applications for clientless user access. However, there may be times in which a public DNS record cannot be created, or other situations that prevent administrators from using this method.

## Objectives

By the end of this module, you will be able to:

* Connect to private web applications using their private hostnames.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/alternative-onramps/#page","headline":"Alternative on-ramps · Cloudflare Learning Paths","description":"Secure browser-based access without device clients.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/alternative-onramps/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/alternative-onramps/","name":"Alternative on-ramps"}}]}
```
