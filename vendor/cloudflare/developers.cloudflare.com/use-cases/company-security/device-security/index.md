---
title: Ensure device endpoint security
description: Verify device posture before granting access.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ensure device endpoint security

Granting access to corporate applications without verifying device health creates risk. Cloudflare One checks OS version, disk encryption, and antivirus status before allowing a device to connect, and integrates with CrowdStrike, SentinelOne, and other Endpoint Detection and Response (EDR) tools.

## Solutions

### Cloudflare One

Secure your organization with a cloud security platform that replaces legacy perimeters with Cloudflare's global network. [Learn more about Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

* **Posture checks** \- Verify OS version, disk encryption status, and antivirus presence before granting access
* **Endpoint integration** \- Pull real-time device health signals from CrowdStrike, SentinelOne, and other Endpoint Detection and Response (EDR) tools
* **Conditional access** \- Gate application access on device posture results, so only healthy devices can connect

### Cloudflare One client

Device agent that routes traffic through Cloudflare's network. [Learn more about Cloudflare One client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/).

* **Always-on protection** \- Route device traffic through Cloudflare One at all times, enforcing Gateway policies regardless of network

## Get started

1. [Deploy the Cloudflare One client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)
2. [Configure device posture checks](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/)
3. [Add posture checks to Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/company-security/device-security/#page","headline":"Ensure device endpoint security · Cloudflare use cases","description":"Verify device posture before granting access.","url":"https://developers.cloudflare.com/use-cases/company-security/device-security/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/company-security/","name":"Company security"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/company-security/device-security/","name":"Ensure device endpoint security"}}]}
```
