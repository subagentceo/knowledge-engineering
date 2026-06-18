---
title: Speed test
description: Run speed tests from the Cloudflare One client to measure network throughput, latency, and quality scores for end user devices.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Speed test

Speed tests allow administrators to remotely measure network performance from end-user devices running the [Cloudflare One client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). Each test runs from the client to Cloudflare's network edge and reports metrics for internet speed, latency, and network quality.

Speed tests help IT teams:

* Objectively measure network performance with the Cloudflare One client turned on.
* Identify performance bottlenecks affecting specific users, devices, or locations.
* Respond to user reports of slow connectivity with concrete data.

Feature compatibility

Feature availability

* All Cloudflare One plans

Supported client modes

* Traffic and DNS mode
* Traffic only mode

Supported operating systems:

| System   | Support |
| -------- | ------- |
| Windows  | ✅       |
| macOS    | ✅       |
| Linux    | ✅       |
| iOS      | ❌       |
| Android  | ❌       |
| ChromeOS | ❌       |

To run a speed test from a device:

1. In [Zero Trust ↗](https://dash.cloudflare.com/one), go to **Insights** \> **Digital experience** \> **Diagnostics**.
2. Select **Run diagnostics**.
3. Search for a device by user email, device name, or device ID.
4. Select the device, then select **Device speed test**.

The test runs in the background on the selected device. Results appear in the diagnostics view once the test completes.

## Speed test metrics

Each speed test reports the following metrics:

### Internet speed

| Metric              | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Download throughput | The rate at which data is received by the device from Cloudflare's network edge, measured in Mbps. |
| Upload throughput   | The rate at which data is sent from the device to Cloudflare's network edge, measured in Mbps.     |

### Latency

| Metric           | Description                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Download latency | The round-trip time measured during an active download, reflecting latency under load.                                                      |
| Upload latency   | The round-trip time measured during an active upload, reflecting latency under load.                                                        |
| Unloaded latency | The baseline round-trip time measured when no significant data transfer is occurring. This reflects the inherent latency of the connection. |
| Jitter           | The variation in latency over time. High jitter can cause inconsistent performance in real-time applications.                               |

### Network quality score

Network quality scores estimate the end-user experience for common application types based on the measured speed and latency values.

| Score           | Description                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Video streaming | Rates the connection quality for video streaming applications based on throughput and latency.          |
| Video streaming | Estimates the connection quality for video streaming applications based on throughput and latency.      |
| Web chat / RTC  | Estimates the connection quality for real-time communication applications such as video calls and VoIP. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/speed-test/#page","headline":"Speed test · Cloudflare One docs","description":"Run speed tests from the Cloudflare One client to measure network throughput, latency, and quality scores for end user devices.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/speed-test/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/diagnostics/","name":"Diagnostics"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/diagnostics/speed-test/","name":"Speed test"}}]}
```
