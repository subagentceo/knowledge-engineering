---
title: Verify device connectivity
description: Verify devices connect through Cloudflare.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify device connectivity

To validate that Cloudflare is receiving traffic from a user device:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Under **Log traffic activity**, enable activity logging for all DNS logs.
3. On your device, open a browser and go to any website.
4. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **DNS**.
5. Make sure DNS queries from your device appear.

## Best practices

Securing your organization with a Zero Trust Network Access solution usually happens in two phases: the first phase is establishing connectivity, and the second phase is building policies for distinct applications. We recommend verifying that all connectivity is working as expected before moving on to build complex security policies. This will reduce the amount of troubleshooting and challenges that arise from managing complex systems.

Troubleshoot the Cloudflare One Client

For step-by-step guidance on diagnosing and resolving Cloudflare One Client issues, refer to the [Cloudflare One Client troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/). The guide covers:

* How to collect diagnostic logs via the Cloudflare dashboard or CLI
* How to review key configuration files
* Common misconfigurations and their fixes
* Best practices for filing support tickets

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/validate-traffic-in-gateway/#page","headline":"Verify device connectivity · Cloudflare Learning Paths","description":"Verify devices connect through Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/validate-traffic-in-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-devices/","name":"Connect user devices"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-devices/validate-traffic-in-gateway/","name":"Verify device connectivity"}}]}
```
