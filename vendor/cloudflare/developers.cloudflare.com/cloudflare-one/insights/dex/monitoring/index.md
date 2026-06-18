---
title: Device monitoring
description: Device monitoring in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device monitoring

Monitor performance and network status for your organization's [fleet](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#fleet-status) (all devices with the Cloudflare One Client installed and connected to your Zero Trust organization) or individual [user devices](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#device-monitoring).

Network and device performance data helps IT administrators troubleshoot performance issues, investigate network connectivity problems, and monitor device health.

## Device overview

A fleet is a collection of user devices. All devices in a fleet have the Cloudflare One Client installed and are connected to a [Cloudflare Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization).

To view fleet status:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Review the information under **Live analytics**.

### View metrics

The **Device overview** tab shows real-time and historical connectivity metrics for all devices in your organization.

To view analytics on a per-device level, go to [Device monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#device-monitoring).

### Available metrics

* **Devices connected by colo**: Number of devices connected to a given [Cloudflare data center ↗](https://www.cloudflarestatus.com/).
* **Connectivity status**: Percentage of devices in a given Cloudflare One Client state.  
| Status       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |  
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| Connected    | The Cloudflare One Client has successfully established a connection to the Cloudflare global network.                                                                                                                                                                                                                                                                                                                                                                                 |  
| Disconnected | The Cloudflare One Client has been intentionally or unintentionally disconnected from the Cloudflare global network.                                                                                                                                                                                                                                                                                                                                                                  |  
| Paused       | A user or administrator has taken an explicit action to temporarily turn off WARP, for example by entering an [admin override code](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-admin-override-codes). Paused clients will [auto-connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect) after a timeout period. |  
| Connecting   | The Cloudflare One Client is pending connection, but is actively trying to establish a connection to the Cloudflare global network.                                                                                                                                                                                                                                                                                                                                                   |
* **Mode**: [Client mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) deployed on the device.
* **Colo**: Percentage of devices connected to a given Cloudflare data center.
* **Platform**: Operating system of the device.
* **Major Version**: Cloudflare One Client version installed on the device.
* **Device Status Over Time**: Cloudflare One Client connection status over the selected time period.
* **Connection Methods Over Time**: Client mode used by the device over the selected time period.

## Device monitoring

Review network and device performance for a device enrolled in your fleet.

### View a device's performance

To view a device's network and device performance metrics:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Team & Resources** \> **Devices** \> **Your devices**.
2. Select a device > **View details**.
3. Select the **DEX** tab.
4. In **Device Monitoring**, scroll down to **Network performance** and **Device Performance**.

### Network and device performance metrics

#### Network performance metrics

* **Unique networks over time**: How many unique SSIDs (Wi-Fi network names) the device was connected to.
* **Network I/O**: How much data the device transferred (uploads and downloads) over the primary network interface.

#### Device performance metrics

* **Battery percentage and cycles**: Displays battery percentage and [battery cycles ↗](https://support.apple.com/en-us/102888) over time. Use this metric to debug potential performance issues possibly related to battery health or power-saving measures that trigger at low-battery levels.
* **CPU usage**: CPU utilization over time. Use this metric to debug slow system performance due to high CPU usage.
* **Memory utilization**: Memory utilization over time. Use this metric to debug performance issues related to an overtaxed memory.
* **Disk I/O**: Displays number of disk read/write operations over time. Use this metric to debug performance errors due to heavy disk operations.

## Export DEX device state event logs

The log data for all [DEX device state events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fdevice%5Fstate%5Fevents/) can be exported to [R2](https://developers.cloudflare.com/r2/), a cloud bucket, or a SIEM via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#page","headline":"Device monitoring · Cloudflare One docs","description":"Device monitoring in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/monitoring/","name":"Device monitoring"}}]}
```
