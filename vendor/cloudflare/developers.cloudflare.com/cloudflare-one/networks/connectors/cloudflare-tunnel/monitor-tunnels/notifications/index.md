---
title: Notifications
description: How Notifications works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Notifications

Administrators can receive an alert when Cloudflare Tunnels in an account change their health or deployment status. Notifications can be delivered via email, webhook, and third-party services.

## Manage notifications

Tunnel notifications are configured on the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). For more information, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

## Available notifications

Tunnel Creation or Deletion Event

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No action is needed.

Tunnel Health Alert

**Who is it for?**

Customers who want to be warned about changes in health status for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying [cloudflared replicas or load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/).

**Additional information**

Refer to [Tunnel status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) to review the list of possible tunnel statuses (`Healthy`, `Inactive`, `Down` and `Degraded`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/#page","headline":"Notifications · Cloudflare One docs","description":"How Notifications works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/","name":"Monitor tunnels"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/","name":"Notifications"}}]}
```
