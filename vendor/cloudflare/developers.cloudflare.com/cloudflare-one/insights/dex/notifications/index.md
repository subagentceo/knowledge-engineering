---
title: Notifications
description: Reference information for Notifications in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Notifications

Administrators can receive alerts when Cloudflare detects connectivity issues with the Cloudflare One Client or degraded application performance. Notifications can be delivered via email, webhook, and third-party services.

## Manage notifications

DEX notifications are configured on the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). For more information, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

## Available notifications

Device connectivity anomaly

**Who is it for?**

Zero Trust customers who want to be notified when Cloudflare detects a spike or drop in the number of devices connected to the WARP client.

**Other options / filters**

* **Alert configuration**: Choose when to trigger a notification. Available options are _Connectivity spike_, _Connectivity drop_, and _Connectivity spike or drop_.
* Filters:  
   * **Colo**: Cloudflare data center that the device is connected to.  
   * **Platform**: Operating system of the device.  
   * **Version**: WARP client version (for example, `2024.3.409.0`).  
   * **Mode**: [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) deployed on the device.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Review your [fleet status](https://developers.cloudflare.com/cloudflare-one/insights/dex/fleet-status/) to investigate why the spike or drop occurred and which devices are impacted.

**Additional information**

To learn more about the alert logic, refer to [Z-score](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score).

DEX test latency

**Who is it for?**

Zero Trust customers who wish to receive alerts when there is a spike or drop in application latency, as measured by the HTTP test [Resource Fetch time](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/#test-results) or Traceroute test [Round trip time](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/#test-results). Requires setting up a [DEX test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/).

**Other options / filters**

* **Alert configuration**: Choose when to trigger a notification. Available options are _Latency spike_, _Latency drop_, and _Latency spike or drop_.
* Filters:  
   * **Colo**: Cloudflare data center that the device is connected to.  
   * **Platform**: Operating system of the device.  
   * **Version**: WARP client version (for example, `2024.3.409.0`).  
   * **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your [test results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/) to investigate why the spike occurred.

**Additional information**

To learn more about the alert logic, refer to [Z-score](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score).

DEX test low availability

**Who is it for?**

Zero Trust customers who wish to receive alerts when the percentage of successful HTTP or traceroute requests to an application drops below the selected service-level objective (SLO). Requires setting up a [DEX test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/).

**Other options / filters**

* **Service Level Objective (SLO)**: Specify the availability threshold that will trigger an alert. Enter a percentage in `xx.x` format (for example, `98.0`).
* Filters:  
   * **Colo**: Cloudflare data center that the device is connected to.  
   * **Platform**: Operating system of the device.  
   * **Version**: WARP client version (for example, `2024.3.409.0`).  
   * **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your [test results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/) to investigate why the degradation occurred.

**Additional information**

To learn more about the alert logic, refer to [SLO](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#slo).

## Alert logic

### Z-score

Cloudflare uses a z-score to detect unusual traffic spikes or drops. A [z-score ↗](https://en.wikipedia.org/wiki/Standard%5Fscore) is the number of standard deviations the current value is from the mean. Cloudflare calculates the mean and standard deviation by comparing the current five minutes to the past four hours. This is measured every five minutes.

To trigger an alert, the z-score value must be above 3.5 or below -3.5, which indicates the current value is significantly different from the recent baseline.

### SLO

A service-level objective (SLO) measures the percentage of valid events that succeeded. It is defined as (good events / valid events) \* 100, where valid events are those that could be measured in a given time period. DEX notifications evaluate both a short window (five minutes) and a long window (one hour) and trigger an alert if availability falls below the SLO threshold in either window.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#page","headline":"DEX notifications · Cloudflare One docs","description":"Reference information for Notifications in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/notifications/","name":"Notifications"}}]}
```
