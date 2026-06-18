---
title: Share and export data
description: Share filters and export Network Analytics data.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Share and export data

## Share Network Analytics filters

When you add filters and specify a time range in Network Analytics, the URL changes to reflect those parameters.

To share your view of the data, copy the URL and send it to other users so that they can work with the same view.

## Export sample log data

You can export up to 100 raw events from the **Packet sample log** at a time. This option is useful when you need to combine and analyze Cloudflare data with data stored in a separate system or database, such as a SIEM system.

To export log data:

1. Select **Export**.
2. Choose either CSV or JSON format for rendering exported data. The downloaded file name will reflect the selected time range, using this pattern:

```

network-analytics-attacks-<START_TIME>-<END_TIME>.json


```

## Export a Network Analytics report

To print or download a snapshot report from Network Analytics, select **Print report**. Your web browser's print interface displays options for printing or saving as a PDF.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/network-analytics/configure/share-export/#page","headline":"Share and export Network Analytics data · Cloudflare Analytics docs","description":"Share filters and export Network Analytics data.","url":"https://developers.cloudflare.com/analytics/network-analytics/configure/share-export/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/network-analytics/","name":"Network analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/network-analytics/configure/","name":"Configure"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/network-analytics/configure/share-export/","name":"Share and export data"}}]}
```
