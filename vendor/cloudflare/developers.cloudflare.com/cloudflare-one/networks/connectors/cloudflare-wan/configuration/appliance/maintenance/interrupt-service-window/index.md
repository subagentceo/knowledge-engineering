---
title: Interrupt window
description: Learn how to set up when Connector can update its systems.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Interrupt window

The Interrupt window defines when Cloudflare One Appliance (formerly Magic WAN Connector) can update its systems. When Cloudflare One Appliance is updating, this may result in an interruption to existing connections. Set up a time window that minimizes disruption to your sites.

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks** \> **Connectors**.
2. In **Appliances** \> **Appliances**, select the Cloudflare One Appliance for which you want to set up the update window > **Edit**.
1. In **Interrupt window**, select the most appropriate time for the Cloudflare One Appliance to update its systems:  
   * **Timezone**: Select the time zone for the Cloudflare One Appliance to update.  
   * **Start time**: Choose an hour for the Cloudflare One Appliance to start updating. Cloudflare recommends you choose an hour when there is minimal activity in your network, to avoid potential disruptions.  
   * **Duration**: Duration indicates the time window during which the Cloudflare One Appliance is scheduled to update. For example, if you configure your Cloudflare One Appliance to update at `22:00` and specify a **Duration** of `4 hours`, the Cloudflare One Appliance will attempt to update within the four-hour period following `22:00`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/interrupt-service-window/#page","headline":"Interrupt window · Cloudflare One docs","description":"Learn how to set up when Connector can update its systems.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/interrupt-service-window/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/","name":"Maintenance"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/interrupt-service-window/","name":"Interrupt window"}}]}
```
