---
title: Digital Experience Monitoring
description: Review recent changes to Digital Experience Monitoring.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Digital Experience Monitoring

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dex.xml) 

## 2026-04-29

  
**Digital experience tests to authenticated resources and enhanced configuration**   

[Digital experience tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) now support testing applications protected by Cloudflare Access or third-party authentication. All authentication secrets are managed via [Cloudflare Secret Store](https://developers.cloudflare.com/secrets-store/).

Digital experience tests also have enhanced configuration options including:

* New HTTP methods (DELETE, PATCH, POST, PUT)
* Secret Store headers, custom plain text headers, and custom request bodies
* Advanced settings: follow redirects, response bodies, response headers, and allow untrusted certificates
![Digital experience test configuration for Cloudflare Access applications](https://developers.cloudflare.com/_astro/dex_test_auth_config.CD3G3zb__o7m7g.webp)![Digital experience enhanced test configuration](https://developers.cloudflare.com/_astro/dex_test_enhanced_config.Nsv7Vcob_ppxh5.webp) 

## 2026-04-28

  
**Internet outage notifications for devices**   

[Digital Experience](https://developers.cloudflare.com/cloudflare-one/insights/dex/) will display a dashboard notification when an Internet outage or traffic anomaly may impact a [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) device based on its geographic location or network connection.

This Internet outage and traffic anomaly data is pulled from [Cloudflare Radar ↗](https://radar.cloudflare.com/). All Internet outage and traffic anomaly observations can be viewed in the [Radar Outage Center ↗](https://radar.cloudflare.com/outage-center).

![Digital Experience Monitoring dashboard notification for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/_astro/dex_radar_ux_notification.CpdrUVYA_ZSzgIe.webp)![Digital Experience Monitoring dashboard analytics for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/_astro/dex_radar_analytics.GaPxWM6C_2jLyzS.webp) 

## 2026-04-28

  
**Cloudflare One Client speed tests**   

IT teams can now remotely run speed tests from the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to Cloudflare's network edge.

Each speed test includes the following metrics:

* Internet speed: download and upload throughput
* Latency: download, upload, unloaded latency, and jitter
* Network quality score: video streaming, webchat/real-time communication (RTC)

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Digital experience** \> **Diagnostics** and select **Run diagnostics** to use the feature today.

![Cloudflare One client speed test result](https://developers.cloudflare.com/_astro/dex_speed_test.DukupcRs_gXUVw.webp) 

## 2026-04-15

  
**Last seen timestamp for Cloudflare One Client devices is more consistent**   

The last seen timestamp for [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) devices is now more consistent across the dashboard. IT teams will see more consistent information about the most recent client event between a device and Cloudflare's network.

## 2026-02-19

  
**DEX Supports EU Customer Metadata Boundary**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into [WARP](https://developers.cloudflare.com/warp-client/) device connectivity and performance to any internal or external application.

Now, all DEX logs are fully compatible with Cloudflare's [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) setting for the 'EU' (European Union), which ensures that DEX logs will not be stored outside the 'EU' when the option is configured.

If a Cloudflare One customer using DEX enables CMB 'EU', they will not see any DEX data in the Cloudflare One dashboard. Customers can ingest DEX data via [LogPush](https://developers.cloudflare.com/logs/logpush/), and build their own analytics and dashboards.

If a customer enables CMB in their account, they will see the following message in the Digital Experience dashboard: "DEX data is unavailable because Customer Metadata Boundary configuration is on. Use Cloudflare LogPush to export DEX datasets."

![Digital Experience Monitoring message when Customer Metadata Boundary for the EU is enabled](https://developers.cloudflare.com/_astro/dex_supports_cmb.6YOLXjHN_ZJh3uv.webp) 

## 2025-11-12

  
**DEX Logpush jobs**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into WARP device metrics, connectivity, and network performance across your Cloudflare SASE deployment.

We've released four new WARP and DEX device data sets that can be exported via [Cloudflare Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). These Logpush data sets can be exported to R2, a cloud bucket, or a SIEM to build a customized logging and analytics experience.

1. [DEX Application Tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/)
2. [DEX Device State Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fdevice%5Fstate%5Fevents/)
3. [WARP Config Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Fconfig%5Fchanges/)
4. [WARP Toggle Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Ftoggle%5Fchanges/)

To create a new DEX or WARP Logpush job, customers can go to the account level of the Cloudflare dashboard > Analytics & Logs > Logpush to get started.

![DEX logpush job creation dashboard](https://developers.cloudflare.com/_astro/dex_logpush_datasets.CtCk36pX_Z1tuyHu.webp) 

## 2025-08-29

  
**DEX MCP Server**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device connectivity and performance across your Cloudflare SASE deployment.

We've released an MCP server [(Model Context Protocol) ↗](https://cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) for DEX.

The DEX MCP server is an AI tool that allows customers to ask a question like, "Show me the connectivity and performance metrics for the device used by carly‌@acme.com", and receive an answer that contains data from the DEX API.

Any Cloudflare One customer using a Free, Pay-as-you-go, or Enterprise account can access the DEX MCP Server. This feature is available to everyone.

Customers can test the new DEX MCP server in less than one minute. To learn more, read the [DEX MCP server documentation](https://developers.cloudflare.com/cloudflare-one/insights/dex/dex-mcp-server/).

## 2025-03-07

  
**Cloudflare One Agent now supports Endpoint Monitoring**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device, network, and application performance across your Cloudflare SASE deployment. The latest release of the Cloudflare One agent (v2025.1.861) now includes device endpoint monitoring capabilities to provide deeper visibility into end-user device performance which can be analyzed directly from the dashboard.

Device health metrics are now automatically collected, allowing administrators to:

* View the last network a user was connected to
* Monitor CPU and RAM utilization on devices
* Identify resource-intensive processes running on endpoints
![Device endpoint monitoring dashboard](https://developers.cloudflare.com/_astro/cloudflare-one-agent-health-monitoring.XXtiRuOp_Z25TN9Q.webp) 

This feature complements existing DEX features like [synthetic application monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) and [network path visualization](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/), creating a comprehensive troubleshooting workflow that connects application performance with device state.

For more details refer to our [DEX](https://developers.cloudflare.com/cloudflare-one/insights/dex/) documentation.

## 2025-01-24

**IP visibility**

[IP visibility](https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/) enables admins to inspect the different IP addresses associated with an end-user device. IP types available for review on the Cloudflare dashboard include: the device's private IP, the public IP assigned to the device by the ISP, and the router's (that the device is connected to) private IP.

## 2024-12-19

**Remote captures**

Admins can now collect packet captures (PCAPs) and WARP diagnostic logs from end-user devices. For more information, refer to [Remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/).

## 2024-05-20

**Last seen ISP**

Admins can view the last ISP seen for a device by going to **My Team** \> **Devices**. Requires setting up a [traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/).

## 2024-05-13

**DEX alerts**

Admins can now set [DEX alerts](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/) using [Cloudflare Notifications](https://developers.cloudflare.com/notifications/). Three new DEX alert types:

* Device connectivity anomaly
* Test latency
* Test low availability

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/dex/#page","headline":"Digital Experience Monitoring Changelog · Cloudflare One docs","description":"Review recent changes to Digital Experience Monitoring.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/dex/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/dex/","name":"Digital Experience Monitoring"}}]}
```
