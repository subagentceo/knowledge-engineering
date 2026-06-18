---
title: Adjust the time range
description: Change the time range in Network Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Adjust the time range

## Using the timeframe drop-down list

Use the timeframe drop-down list to change the time range over which Network Analytics displays data. When you select a timeframe, the entire view is updated to reflect your choice.

In the Network Analytics dashboard, the range of historical data you can query is 112 days.

When you select _Previous 30 minutes_, the **Network Analytics** card will show the data from the last 30 minutes, refreshing every 20 seconds. A _Live_ notification appears next to the statistic drop-down list to let you know that the view keeps updating automatically:

![Timeframe drop-down with Previous 30 minutes selected.](https://developers.cloudflare.com/_astro/timeframe-selector.CKN2F0gt_1pRaib.webp) 

## Zooming in the chart

To zoom in a specific period, select and drag to define a region in the **Packets summary** (or **Bits summary**) chart. To zoom out, select **X** in the time range selector.

![User zooming in a given period in the Network Analytics traffic chart.](https://developers.cloudflare.com/images/analytics/network-analytics/chart-zoom-in.gif) 

The effective resolution goes up when you zoom in and goes down when you zoom out, due to the [Adaptive Bit Rate](https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/#adaptive-bit-rate-sampling). This means that a big packet burst that lasted a few seconds may look less impactful when analyzing a chart displaying data for 24 hours or more.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/#page","headline":"Adjust the time range in Network Analytics · Cloudflare Analytics docs","description":"Change the time range in Network Analytics.","url":"https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/network-analytics/","name":"Network analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/network-analytics/configure/","name":"Configure"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/network-analytics/configure/time-range/","name":"Adjust the time range"}}]}
```
