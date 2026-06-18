---
title: Fortanix Data Security Manager
description: Configure Keyless SSL with Fortanix Data Security Manager.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fortanix Data Security Manager

You can use Cloudflare Keyless SSL with [Fortanix Data Security Manager (DSM) ↗](https://www.fortanix.com/platform/data-security-manager), a FIPS 140-2 Level 3 certified implementation.

You must have a [Data Security Manager Enterprise Tier ↗](https://www.fortanix.com/start-your-free-trial) and set up a group and an application assigned to the group.

For detailed guidance, follow the tutorial in the [Fortanix documentation ↗](https://support.fortanix.com/docs/fortanix-data-security-manager-with-cloudflare-integration#50-configure-fortanix-dsm). This guide is based on the Keyless SSL [public DNS](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/public-dns/) option and has been tested using a virtual machine (VM) deployed to Azure running Ubuntu 22.04.3 LTS.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/fortanix-dsm/#page","headline":"Fortanix Data Security Manager · Cloudflare SSL/TLS docs","description":"Configure Keyless SSL with Fortanix Data Security Manager.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/fortanix-dsm/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/fortanix-dsm/","name":"Fortanix Data Security Manager"}}]}
```
