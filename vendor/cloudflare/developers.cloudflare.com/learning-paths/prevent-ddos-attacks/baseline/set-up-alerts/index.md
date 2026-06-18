---
title: Set up alerts
description: Configure DDoS attack alert notifications.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up alerts

Another part of preparing for DDoS attacks is knowing when your application is being attacked.

Cloudflare offers notifications for DDoS attacks, which you can set up on your account.

To set up a notification:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Select one of the [available DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/#alert-types) depending on your plan and services:  
   * HTTP DDoS Attack Alert  
   * Layer 3/4 DDoS Attack Alert  
   * Advanced HTTP DDoS Attack Alert  
   * Advanced Layer 3/4 DDoS Attack Alert
4. Enter a notification name and (optionally) a description.
5. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/).
6. If you are creating a notification for one of the advanced DDoS attack alerts, select **Next** and define the parameters that will filter the notifications you will receive.
7. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/set-up-alerts/#page","headline":"Set up alerts · Cloudflare Learning Paths","description":"Configure DDoS attack alert notifications.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/set-up-alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/","name":"Baseline DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/set-up-alerts/","name":"Set up alerts"}}]}
```
