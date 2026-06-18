---
title: Client packet capture
description: Feature documentation for Cloudflare One client packet captures.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client packet capture

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode  Traffic only mode                                                                                            | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.12.492.0          |
| macOS    | ✅            | 2024.12.492.0          |
| Linux    | ✅            | 2024.12.492.0          |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

Remote captures allow administrators to collect packet captures (PCAPs) and Cloudflare One Client diagnostic logs directly from end user devices. A packet capture is a recording of network traffic at the packet level. This data can be used to troubleshoot network problems, investigate security incidents, and identify performance bottlenecks.

## Start a remote capture

Devices must be actively connected to the Internet for remote captures to run.

To capture data from a remote device:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Select up to 10 devices that you want to run a capture on. Devices must be [registered](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) in your Zero Trust organization.
3. Configure the types of captures to run.  
   * **Packet captures (PCAP)**: Performs packet captures for traffic outside of the WARP tunnel (default network interface) and traffic inside of the WARP tunnel ([virtual interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#ip-traffic)).  
   * **Device diagnostic logs**: Generates a [Cloudflare One Client diagnostic log](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs) of the past 96 hours. To include a routing test for all IPs and domains in your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/), select **Test all routes**.  
   Note  
   **Test all routes** will extend the time for diagnostics to run and may temporarily impact device performance during the test.
4. Select **Run diagnostics**.

DEX will now send capture requests to the configured devices. If the Cloudflare One Client is disconnected, the capture will time out after 10 minutes.

## Check remote capture status

To view a list of captures, go to **Insights** \> **Digital experience** \> **Diagnostics**. The **Status** column displays one of the following options:

* **Success**: The capture is complete and ready for download. Any partially successful captures will still upload to Cloudflare. For example, there could be a scenario where the PCAP succeeds on the primary network interface but fails on the WARP tunnel interface. You can [review PCAP results](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/#download-remote-captures) to determine which PCAPs succeeded or failed.
* **Running**: The capture is in progress on the device.
* **Pending Upload**: The capture is complete but not yet ready for download.
* **Failed**: The capture has either timed out or encountered an error. To retry the capture, check the Cloudflare One Client version and [connectivity status](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#fleet-status), then start a [new capture](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/#start-a-remote-capture).

## Download remote captures

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Find a successful capture.
3. Select the three-dot menu and select **Download**.

This will download a ZIP file to your local machine called `<capture-id>.zip`. DEX will store capture data according to our [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention).

### Device PCAP contents

The downloaded PCAP folder contains three files:

* `capture-default.pcap`: Packet captures for the primary network interface.
* `capture-tunnel.pcap`: Packet captures for traffic inside of the WARP tunnel.
* `results.json`: Reports successful and failed packet captures.

You can analyze `.pcap` files using Wireshark or another third-party packet capture tool.

### Diagnostic log files

Refer to [Cloudflare One Client diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs) for a description of each file.

## Diagnostics analyzer (beta)

The diagnostics analyzer highlights what Cloudflare determines to be the most important detection events in a `warp-diag` log. You can use the detection report to help parse your [log files](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs) and identify the root cause of client issues. The diagnostics analyzer is only available for logs [collected via the dashboard](#collect-logs-via-the-dashboard).

To access the diagnostics analyzer:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Locate an existing `warp-diag` log from the list or select **Run diagnostics** to generate a new `warp-diag` log.
3. Select the three dots for the `warp-diag` log that you want to analyze, then select **View Device Diag**.  
The **Overview** tab will display an [AI-generated summary](https://developers.cloudflare.com/fundamentals/reference/cloudy-ai-agent/) of the results, a list of detection events, and basic device information.  
Explanation of the fields  
| Field                         | Description                                                                                                                                                                                                                                                                                               |  
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| Detection type                | A common Cloudflare One Client issue that can appear in the diagnostic logs.                                                                                                                                                                                                                              |  
| Occurrences                   | Number of times an issue was detected in the logs.                                                                                                                                                                                                                                                        |  
| Severity level                | Indicates the impact of the issue on Cloudflare One Client functionality. The severity levels are: **Critical**: Issue causes complete loss of functionality. **Warning**: Issue causes degraded functionality but core features should still work. **No detection**: Issue was not detected in the logs. |  
| Operating system              | OS and OS version of the device.                                                                                                                                                                                                                                                                          |  
| Cloudflare One Client version | [Cloudflare One Client release version](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/)                                                                                                                                                      |  
| Profile ID                    | [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) UUID                                                                                                                                                       |  
| Service mode                  | [Client mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/)                                                                                                                                                                         |  
| Configuration name            | Name of the [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/) that the Cloudflare One Client is connected to.                                                                  |  
| Device ID                     | ID generated by the Cloudflare One Client.                                                                                                                                                                                                                                                                |
4. Select a detection type for more information about the event and recommended next steps.

Cloudflare DEX will store the `warp-diag` log and its detection report per our [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention). To save a copy onto your local machine, [download the log file](#download-remote-captures) and go to the **JSON file** tab to copy the report in JSON format.

## Limitations

* Packet captures are subject to the following limits:  
| Limit Type  | Maximum Value |  
| ----------- | ------------- |  
| Time limit  | 600 seconds   |  
| File size   | 50 MB         |  
| Packet size | 1500 bytes    |
* Cloudflare One Client diagnostic logs have no file size limit, but files larger than 100 MB cannot be uploaded to Cloudflare and must be shared directly with the admin.
* Windows devices do not support concurrent remote captures. If you start a remote capture while another is in progress, the second capture will fail immediately.
* PCAPs will fail on Windows if you have another third-party packet capture tool (such as, Packet Monitor `pktmon`) running.
* On Windows, packet captures may fail on devices configured with a non-English language due to limitations with the underlying `PktMon` tool.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/#page","headline":"Client packet capture · Cloudflare One docs","description":"Feature documentation for Cloudflare One client packet captures.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/diagnostics/","name":"Diagnostics"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/diagnostics/client-packet-capture/","name":"Client packet capture"}}]}
```
