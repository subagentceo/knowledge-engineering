# Video Insights

Video Insights brings self-service tooling to the Twilio Console to provide analytics and aggregations for observing your application, discovering trends, and troubleshooting rooms and participants.

Key capabilities include:

* **[Dashboard](/docs/video/troubleshooting/insights#dashboard)** - Usage and quality metrics across all your rooms and participants.
* **[Detected issues](/docs/video/troubleshooting/insights#detected-issues)** - Rooms and participants are tagged when quality issues are detected during a call.
* **[Quality metric graphs](/docs/video/troubleshooting/insights#quality-metrics-graphs)** - Per-interval quality metric graphs for all participants.

Video Insights is free and available for any applications built with the Twilio Video's [JavaScript](/docs/video/javascript-getting-started), [iOS](/docs/video/ios-getting-started), and [Android](/docs/video/android-getting-started) SDKs.

Visit the [Video Insights Dashboard in the Twilio Console](https://twilio.com/console/video/insights/dashboard) to get started.

## Dashboard

The [Video Insights dashboard](https://twilio.com/console/video/insights/dashboard) provides an overview of usage and quality metrics across all the rooms and participants associated with a given account SID. The dashboard provides aggregations that help teams move from being completely responsive to user complaints to observing quality and troubleshooting proactively. It also allows you to segment your participants by device and software characteristics such as browser or operating system, track week-over-week growth, or better understand day-of-week or time-of-day usage.

![Video Insights dashboard showing graphs for rooms, participants, and minutes over time.](https://docs-resources.prod.twilio.com/fe4de1f3cd7084645c7b3a9403392571a2281a4c00a5eee08ce7303cb01bb635.png)

> \[!NOTE]
>
> All insights are tied to the `account_sid` that is associated with your Video Rooms. If you have [subaccounts](https://help.twilio.com/hc/en-us/articles/223136587-What-is-a-subaccount-), each subaccount will have a unique Insights Dashboard.

### Rooms graph

The first graph provides the number of rooms that your account has created over time, with a distribution of rooms tagged as potentially having degraded quality. Please refer to the [Detected Issues](/docs/video/troubleshooting/insights#detected-issues) section for more information on the current list of issues that Twilio could detect and the associated thresholds used.

You can use this graph to monitor the distribution of tagged rooms and then quickly dive into the rooms with issues.

![Bar graph showing room usage and issues from October 14 to 15, 2021.](https://docs-resources.prod.twilio.com/d1ea0ac7a6b073847dbe4f11b01d447cc023d38cf14c45fba38a7a93f9a66279.gif)

### Participants graph

The participant graph allows you to segment your participants by the characteristics of their device and software setup, and filter for those tagged with issues to discover trends that you can act on.

![Graph showing participant count by browser over time with peaks and valleys.](https://docs-resources.prod.twilio.com/a4d1fbaeb2331a7dd5429301c39fe7f9ffb3bc343e8c8dbeee19a35f1ec18a68.gif)

You can segment the area graph by:

|                     |                                                                      |
| ------------------- | -------------------------------------------------------------------- |
| Device manufacturer | The device manufacturers used by the participants in the time filter |
| Operating system    | The operating systems used by the participants in the time filter    |
| Browser             | The browsers used by the participants in the time filter             |
| Twilio SDK          | The Twilio SDKs used by the participants in the time filter          |
| Signaling region    | The signaling regions used for the participants in the time filter   |
| End reason          | The end reason observed for the participants in the time filter      |

> \[!NOTE]
>
> Twilio parses the user agent to determine the Device Manufacturer, OS, and Browser. "Unknown" for these values means the user agent available did not have the information.

You can filter the graph by:

|                             |                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Participants with issues    | Participants tagged with at least one issue. See [Detected issues](/docs/video/troubleshooting/insights#detected-issues) for the current list and the associated thresholds. |
| Participants without issues | Participants not tagged with any [Detected Issues](/docs/video/troubleshooting/insights#detected-issues).                                                                    |

### Minutes graph

The minutes graph provides the number of participant and recording minutes over time, along with historical data from the previous period, to observe week-over-week growth and better understand day-of-week or time-of-day usage.

> \[!NOTE]
>
> The minutes provided are aggregated by the participant durations in seconds, and thus are not 1:1 with the minutes you will be billed for. [Learn more about how billing works.](https://help.twilio.com/hc/en-us/articles/115004710208-Estimating-pricing-for-Twilio-Programmable-Video)

## Troubleshoot

### Rooms

The Rooms page allows you to filter and explore your Rooms from the past seven days.

![Rooms list with filters for date range, issues, and participant count, showing room names and details.](https://docs-resources.prod.twilio.com/dcb261895019d9f36cfa91748c1b25a9004a4dc521f19e2961deef735c3dbe6a.png)

**Edit the displayed columns**

To the left of the table in the image above, you can see an **Add columns** section, which you can use to add and remove the columns displayed in the table.

**Add custom filters**

In addition to filtering by datetime and searching by the Room SID, the rooms page offers flexible filtering to enable you to discover usage and quality trends in your rooms. When adding a custom filter, you select a field, an operator, and an expected value. Here is an example of how to add a custom filter to query for rooms that have Max concurrent participant = 1:

![Dashboard showing room list with filters for max concurrent participants and export option.](https://docs-resources.prod.twilio.com/7f6a00de31e457b79def4b35c8baf0ad940aabdcee4c27405f92edcab60c3bf9.gif)

Below are the fields you can filter on using the custom filter:

| **Field**                     | **Description**                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Room SID                      | The unique string that Twilio generates to identify the Room resource.                                                                                                                                                                                                                            |
| Room Name                     | The application-defined `uniqueName` for the Room resource.                                                                                                                                                                                                                                       |
| Room type                     | The application-defined room type.                                                                                                                                                                                                                                                                |
| Media region                  | The media region that was used by Twilio's Selective Forwarding Unit (SFU) to exchange media between participants.                                                                                                                                                                                |
| Room end reason               | The reason for the room ending.                                                                                                                                                                                                                                                                   |
| Room duration                 | The room's duration. Units required for filtering are seconds.                                                                                                                                                                                                                                    |
| # Participants                | The number of participants that connected to the room over its lifetime. Note that a "Participant" is an instance of a connection to the room, meaning that if an user leaves and rejoins the room, there will be a new Participant SID generated and this will count as 2 distinct participants. |
| Unique identities             | The number of distinct application-defined `uniqueIdentities` across all the Participants that connected to the room.                                                                                                                                                                             |
| Max concurrent participants   | The maximum number of participants that were in the room at the same time.                                                                                                                                                                                                                        |
| Total participant duration    | The total duration that participants were connected to the room, summed across all participants. Units required for filtering are seconds.                                                                                                                                                        |
| Total recording duration      | The total recording duration, summed across all the recording tracks in the room. Units required for filtering are seconds.                                                                                                                                                                       |
| # of issues                   | The total number of [Detected Issues](/docs/video/troubleshooting/insights#detected-issues) observed in the room, summed across all participants.                                                                                                                                                 |
| # of participants with issues | The total number of participants in the room that were tagged with [Detected Issues](/docs/video/troubleshooting/insights#detected-issues).                                                                                                                                                       |
| Issue type                    | The type of [Detected Issues](/docs/video/troubleshooting/insights#detected-issues) observed in the room.                                                                                                                                                                                         |

**Saving and sharing queries**

As you add columns and adjust the filters, the URL is updated to depict the state of the page. This means you are able to bookmark queries/selected columns and share link(s) with teammates.

### Room summary

The Room Summary provides metadata about the Room, surfaces any [Detected Issues](/docs/video/troubleshooting/insights#detected-issues), and lists the room's participants.

![Test room 3 summary with degraded status and quality issues for participant 1.](https://docs-resources.prod.twilio.com/5562edd4ff5878acd5283a6c72346aaf0c1dee2ba2e4d1df3389a2fd8510ca05.png)

### Participant summary

The Participant Summary provides details to help you troubleshoot issues and assess the media quality for individual users. For each participant, you are provided relevant participant characteristics (ex. OS, Browser, SDK versions) as well as per-interval quality metrics (bitrate, packet loss, round trip time) for the duration of their time in the Room.

![Participant summary showing SID, identity, OS, browser, and codec details.](https://docs-resources.prod.twilio.com/b015c93601ddaaf3c9bed3d2651170440d81a3c1744917e402239ea6be465464.gif)

#### Quality metrics graphs

Quality metrics are provided on a per room, per participant basis and are displayed in 10 second intervals. On the send (publishing) side, metrics for bitrate, packet loss, and round trip time (rtt) are provided on a per track basis to assess the quality of the participants outgoing audio or video. On the receive (subscribing) side, the total inbound bitrate for the connection is provided to help you diagnose when a participant has low downlink bandwidth.

A few things to note:

* Quality metrics are sourced client-side from the [WebRTC getStats()](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getStats)function and then processed
* You might see multiple video tracks for a given participant in the following situations:
  * You implement the behavior of unpublishing or publishing tracks when a user turns their camera off.
  * A user shares their screen.
* If you use simulcast, the layers are merged to provide one metric per track. Please refer to the below sections for how these are calculated.

Send Tab (outgoing metrics)

**Bitrate**

Bitrate refers to the rate at which data (measured in bits) can be transferred between two endpoints in a given period of time. Low uplink bandwidth can lead to video freezing, video downscaling, frame-rate drops, and choppy audio. In addition, exceeding the available bandwidth of a receiver can overwhelm their network, cause degradation of the media quality, and potentially lead to dropped connections.

As mentioned above, bitrate is provided on a per track basis on the send side. Please refer to the [Minimum Bandwidth Requirements](/docs/video/tutorials/developing-high-quality-video-applications#minimum-bandwidth-recommendations) documentation to better understand the bitrates required for the associated track characteristics.

If you have simulcast enabled, the bitrate you will see with video tracks is based on the sum of the bandwidth for all the layers.

**Packet Loss**

Packet loss is the measurement of packets that are expected but never arrive. High packet loss can result in frequent video freezing, video frame rate drops, and choppy audio. Packet loss is usually caused by overloaded routers or high CPU load on the machine. Packet loss might also occur [if there is a large number of routers in the connection path between a Participant and Twilio's servers](/docs/video/tutorials/video-regions-and-global-low-latency#geolocation-and-quality).

If you have simulcast enabled, packet loss for video tracks is calculated by summing the packets lost and packets sent across all layers then applying the formula: `(packets lost /( packets lost + packets sent)) * 100`. This means that it's possible that the individual streams forwarded by the SFU to subscribers may have varying levels of packet loss.

**Round trip time**

Round trip time is the time a packet of data takes to travel from sender to receiver and back. High round trip time is the cause of lag in media playback and occasional video freezing and drops in video frame rate. It can lead to users talking over one another. Round trip time is usually attributed to slow or overloaded networks. High round trip times can also occur when a Participant connects to a Twilio server that is far from their location. See Video Regions and Global Low Latency for more information.

If you have simulcast enabled, the round trip time (rtt) displayed is the maximum round trip time of all the individual layers. This means that it's possible that certain streams forwarded by the SFU, based on the receiving participants downlink bandwidth, will experience less round trip time than what is displayed.

Receive Tab (incoming metrics)

**Bitrate**

The bitrate provided on the receive side is the total inbound bitrate received from the peer connection. Consistently low incoming bitrate can lead to video freezing, video downscaling, frame-rate drops, and choppy audio, regardless of the quality of the publisher's media.

Twilio's Selective Forwarding Unit (SFU) acts as the peer connection, so this metric will represent the total bitrate received from all participants for all subscribed tracks.

> \[!NOTE]
>
> The configured [maxSubscriptionBitrate](/docs/video/tutorials/using-bandwidth-profile-api#understanding-maxsubscriptionbitrate) can impact this metric.

#### Details

The Participant Summary provides characteristics about each participant that may be helpful for diagnosing issues. Some useful characteristics to look for are as follows:

|                      |                                                                      |
| -------------------- | -------------------------------------------------------------------- |
| **OS**               | The operating system and associated version used by the Participant. |
| **Browser**          | The browser and associated version used by the Participant.          |
| **Device**           | The device manufacturer and model used by the Participant.           |
| **SDK**              | The SDK and the associated version used by the Participant.          |
| **Tracks Published** | Number of published tracks of the participant.                       |

#### Known issues

* Participants who are connected to the Room via a PSTN call will not have their audio track details displayed in the Participant Summary. Instead this call information is available via the Voice Insights tool in the Twilio Console.

> \[!NOTE]
>
> Twilio parses the user agent to determine the Device Manufacturer, OS, and Browser. "Unknown" for these values means the user agent available did not have the information. It is also possible, based on the platform, that the user agent available is not 100 percent accurate. For example, you can only distinguish Windows 10 vs Windows 11 using an experimental API, User Agent Client Hints (UA-CH), and most browsers are incompatible with UA-CH.

## Detected issues

Video Insights processes metrics and events and surfaces any potential issues detected by Twilio. The issues detected by Twilio are not exhaustive, but rather, are meant to provide a mechanism for easily identifying common issues and to assist in addressing issues in a more proactive manner. To start, Twilio is focusing on quality-related tagging on participants based on their published tracks (outgoing media). If any participants in the room are tagged with issues, then we will classify the room as having issues as well. The current list of detected issues is as follows:

| **Issue**                   | **High Threshold**               | **Issue Metadata**                                             |
| --------------------------- | -------------------------------- | -------------------------------------------------------------- |
| Participant Packet Loss     | Cumulative packet loss >= 5%     | Whether it was detected on the outgoing audio, video, or both. |
| Participant Round Trip Time | Average round trip time > 300 ms | Whether it was detected on the outgoing audio, video, or both. |

Consider the following:

* If packet loss or round trip time is detected on *any* of the outgoing tracks, then the participant is tagged as having an issue.
* It is possible that participants' metrics will exceed the thresholds for portions of their time in video call but will not be tagged with an issue. Tagging is based on the entire duration of the track to avoid over-tagging in cases where there are blips of poor quality but ultimately, the overall experience was acceptable. You can visit the [Participant Summaries](/docs/video/troubleshooting/insights#participant-summary) to further analyze the per-interval metrics over the course of their time in the room.
* Packet loss and round trip time are objective metrics that can be used to predict when a user could have had a degraded quality of experience. Quality of experience is subjective and thus, it's possible we detect an issue but the user was happy with the experience (or vise versa).

Detected Issues are used throughout the Video Insights product:

* Providing the distribution of rooms with issues in the [Dashboard](/docs/video/troubleshooting/insights#dashboard)
* Providing the ability to filter by participants with issues in the [Dashboard](/docs/video/troubleshooting/insights#dashboard)
* Providing the ability to filter by rooms with issues in the [Rooms](/docs/video/troubleshooting/insights#rooms) view
* Aggregating and surfacing any detected issues in the [Room summary](/docs/video/troubleshooting/insights#room-summary)

## Data retention policy

The data retention policy for Video Insights is 14 days for the Insights Dashboard (with filtering available up to 7 days in the past), and 7 days for Rooms and Participants.
