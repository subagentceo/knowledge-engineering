---
title: Traceroute test
description: Reference information for Traceroute test in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traceroute test

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode  Traffic only mode                                                                                            | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2023.5.587             |
| macOS    | ✅            | 2023.5.589             |
| Linux    | ❌            |                        |
| iOS      | ❌            |                        |
| Android  | ✅            | 1.0                    |
| ChromeOS | ✅            | 1.0                    |

A traceroute test measures the network path of an IP packet from an end-user device to a server. The packet passes through a series of intermediate routers — each called a "hop" — and the test records the response time and packet loss at each one. You can use the results to troubleshoot network issues by identifying which hop along the path is causing increased latency or dropped packets.

## Create a test

To set up a traceroute test for an application:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Select **Add a Test**.
4. Fill in the following fields:  
   * **Name**: Enter any name for the test.  
   * **Target**: Enter the IP address of the server you want to test (for example, `192.0.2.0`). You can test either a public-facing endpoint or a private endpoint you have connected to Cloudflare.  
   * **Source device profiles**: (Optional) Select the [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) that you want to run the test on. A device profile defines Cloudflare One Client settings for a specific set of devices in your organization. If no profiles are selected, the test will run on all supported devices connected to your Zero Trust organization.  
   * **Test type**: Select _Traceroute_.  
   * **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.
5. Select **Add test**.

Next, [view the results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/) of your test.

## Test results

A traceroute test measures the following data:

| Data            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Network path    | IP address, average response time, and packet loss for each hop (router) between the device and the target. This is the core traceroute data — it maps the route your traffic takes.                                                                                                                                                                                                                                                                                                                         |
| Round trip time | Time, in milliseconds, between sending out a packet and receiving a response from the target. This is the end-to-end latency measurement.                                                                                                                                                                                                                                                                                                                                                                    |
| Number of hops  | Number of routers encountered between the device and the target.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Packet loss     | Percentage of IP packets that failed to receive a response.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Availability    | Percentage of tests where at least one packet reached the destination. A value below 100% means the destination was completely unreachable during some test runs.                                                                                                                                                                                                                                                                                                                                            |
| Last seen ISP   | The Internet Service Provider that is managing the connection from the device to Cloudflare. (Only available on macOS and Windows.)  DEX looks up the IP address of the ISP in a geolocation database and returns the corresponding [ASO (Autonomous System Organization) and ASN (Autonomous System Number) ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/). If the ASO and ASN are Unknown, it means this information is unavailable in the geolocation data provider. |

## Export DEX application test logs

You can use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) to export [DEX application test](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) data to [R2](https://developers.cloudflare.com/r2/) (Cloudflare's object storage), a third-party cloud storage bucket, or a Security Information and Event Management (SIEM) tool. This is useful if you need to retain test data beyond the [7-day log retention period](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention) or correlate DEX data with other log sources.

## Related resources

* [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/) \- Define which users or groups a test applies to, using selectors such as user email, user group, operating system, or managed network.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/#page","headline":"Traceroute test · Cloudflare One docs","description":"Reference information for Traceroute test in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows","MacOS","Android"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/tests/traceroute/","name":"Traceroute test"}}]}
```
