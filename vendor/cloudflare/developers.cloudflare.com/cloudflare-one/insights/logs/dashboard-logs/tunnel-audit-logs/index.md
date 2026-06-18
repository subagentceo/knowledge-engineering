---
title: Tunnel audit logs
description: Review Cloudflare Tunnel connection events.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel audit logs

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) creates outbound-only connections between your infrastructure and Cloudflare. Tunnel audit logs record when these connections start, stop, or register new DNS records.

Audit logs for Tunnel are available in the [account section of the Cloudflare dashboard ↗](https://dash.cloudflare.com/?account=audit-log), which you can find by selecting your name or email in the upper right-hand corner of the dashboard. For general audit log features such as filtering and retention, refer to [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/). The following actions are logged:

| Action       | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| Registered   | A tunnel connector (cloudflared) started and connected to Cloudflare's global network.                     |
| Unregistered | A tunnel connector disconnected from Cloudflare's global network.                                          |
| CNAME add    | A tunnel registered a new DNS record (CNAME or AAAA) to route traffic to an application behind the tunnel. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/tunnel-audit-logs/#page","headline":"Tunnel audit logs · Cloudflare One docs","description":"Review Cloudflare Tunnel connection events.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/tunnel-audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/","name":"Dashboard logs"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/tunnel-audit-logs/","name":"Tunnel audit logs"}}]}
```
