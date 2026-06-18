# Testing and Debugging

One of the most important questions you'll ask early on is *"How do I know if Segment is working?"*

There are several ways to check if your data is flowing. One is the [Debugger tab in each Source](/docs/segment/connections/sources/debugger/) in the Segment web app, where you can see data coming from a source into Segment. Another is the [Event Delivery tool](/docs/segment/connections/event-delivery/) which shows which data is arriving at specific destinations.

For monitoring purposes, you'll also see alerts in the [Workspace Health](/docs/segment/segment-app/#health) tool if your sources or destinations produce repeated errors.

[Segment University: Debugging and Troubleshooting](https://university.segment.com/series/segment-101/debugging-and-troubleshooting?reg=1\&referrer=docs)

Want more? Check out this course on debugging and troubleshooting. (Must be logged in to access.)

## Source Debugger

The Source Debugger is a real-time tool that confirms that API calls made from your website, mobile app, or servers reach a Segment source. With the Debugger, you can check that you're sending calls in the expected format, without having to wait for any data processing.

![Debugger view with 'Product Added' track event and details in pretty view.](https://docs-resources.prod.twilio.com/a252d44be638bfd56fdb86ccd9ce31a1ac5c19ad39276b77c7caedcf3aa2d925.png)

The Debugger is separate from your workspace's data pipeline and is not an exhaustive view of all the events ever sent to your Segment workspace. The Debugger only shows a sample of the events that the source receives in real time, with a cap of 500 events. The Debugger is a great way to test specific parts of your implementation to validate that events are being fired successfully and arriving to your source.

To see a more complete view of all your events, we recommend that you set up either a [warehouse](/docs/segment/connections/storage/warehouses/) or an [AWS S3 destination](/docs/segment/connections/storage/catalog/aws-s3).

The Debugger shows a live stream of sampled events arriving into the source, but you can also pause the stream from displaying new events by toggling **Live** to **Pause**. Events continue to arrive to your source while you pause the stream.

You can search in the Debugger to find a specific payload using any information you know is available in the event's raw payload. You can also use advanced search options to limit the results to a specific event.

![Debugger view with advanced options for property values and filters like track, page, and screen.](https://docs-resources.prod.twilio.com/d5d80dd743f6e43c0a6c15683068f299fd12f7187ef58e63d23216b69ab8cae6.png)

When you open an event, two payload views are available:

* The **Pretty view** is a recreation of the API call you made that was sent to Segment.
* The **Raw view** is the complete JSON object Segment received from the calls you sent. These calls include all the details about what is being tracked: timestamps, properties, traits, ids, and [contextual information Segment automatically collects](/docs/segment/connections/spec/common/#context-fields-automatically-collected) the moment the data is sent.

## Event Delivery

The Event Delivery tool helps you see if Segment is encountering issues delivering your data from your sources to their connected destinations.

Segment sends billions of events to destinations every week. If our systems encounter errors when trying to deliver your data, we report them in the Event Delivery tool.

Here is an example of what the Event Delivery tool looks like:

![An example of the Delivery Trends line chart.](https://docs-resources.prod.twilio.com/781d360596efa255584c25074a151ed42e1db18a8cc37b4738bacf589e7d7572.png)

Event Delivery is most useful:

* **When data seems to be missing in your destination.**
  For example, you have Google Analytics set up as a destination and your recent data looks incomplete.
* **When setting up a destination for the first time.**
  For example, you are connecting Google Analytics to your Node source. Once you've entered your credentials and turned the destination on, you can use this feature to see whether events are successfully making it to GA in near realtime.

You can access the Event Delivery tool from the destination **Settings** tab in any supported destination.

![The Event Delivery tab highlighted in the destination settings.](https://docs-resources.prod.twilio.com/79bbbd9db7da63b6ec02cfc251b9d20206385451dc7600b5cbd02170a0ad5393.png)

> \[!NOTE]
>
> Device-mode destinations receive data through an API endpoint outside the Segment servers, where we cannot monitor or report on it. **Event delivery is not available for Warehouses or Amazon S3 destinations**.

### Using Event Delivery

Event Delivery shows three parts that report on Segment's ability to deliver your source data: Key Metrics, Error Details, and Delivery Trends.

Before you begin, select a time period from the drop-down menu. The Event Delivery display updates to show only data for that period.

![The Event Delivery tab, with the time picker highlighted.](https://docs-resources.prod.twilio.com/4fec8a8406487988654606bcc5dea03189bcb17c0fb5134f291fe095b4133a7c.png)

#### Key metrics

This panel displays quantitative information about the destination's data flow:

* **Delivered**: The number of messages Segment successfully delivered to the destination in the selected time period.
* **Not Delivered**: The number of messages Segment was unable to deliver. If this number is greater than zero, the reasons for failure will appear in the [Error details table](#error-details).
* **P95 Latency**: The time it takes for Segment to deliver the slowest 5% of your data (known as P95 latency). The latency reported is end-to-end: from the event being received through the Segment API, to the event being delivered to partner API. This helps tell you if there is a delay in your data pipeline, and how severe it is.

#### Error details

The Error details table displays a summary of the errors in a given period, and the most important information about them. You can click any row in the table to expand it to show more information.

![Error details table, with the View Details link highlighted.](https://docs-resources.prod.twilio.com/0b46ce4c18f3224db2fac6f668d806e805b968fb9f8e095237d210117f2a3fb4.png)

The Error Details view gives you as much information as possible to help you resolve the issue. The example below shows an example Error Details panel.

![An example of the error details view.](https://docs-resources.prod.twilio.com/20670dc720ff13d3296d38ee50913368a79842a83d090d8c89dc5fd7f40dd49d.png)

This view includes:

* **Description**: The event delivery UI provides a human-friendly summary of the error, based on the payload Segment received back from the partner.
* **Actions**: These are actions you can take, based on what Segment knows about the issue.
* **More Info**: Links to any documentation that might be helpful to you.
* **Sample payloads**: To help you debug, Segment provides sample payloads from every step of the data's journey.
  * **You Sent**: The data you sent to Segment's API.
  * **Request to Destination**: The request Segment made to the Partner API. This payload will likely be different from what you sent it because Segment is mapping your event to the partner's spec to ensure the message is successfully delivered.
  * **Response from Destination**: The response Segment received from the Partner API. This will have the raw partner error. If you need to troubleshoot an issue with a Partner's Success team, this is usually something they'll want to see.

View Segment's list of [Integration Error Codes](/docs/segment/connections/integration_error_codes/) for more details.

### Trends

When debugging, it's helpful to see when issues start, stop, and how they trend over time.

The Event Delivery view shows a graph with the following information:

* **Delivered**: The number of events that were successfully delivered in the time period you selected.
* **Not delivered**: The number of events that were not successfully delivered in the time period you selected.

The Latency view shows the end-to-end P95 latency during the time period you selected.

![Latency view displaying the end-to-end P95 latency for selected time period.](https://docs-resources.prod.twilio.com/633b8f58906705453c21ac1ffd2312929daef48756b4536d80c1657bc0556d8f.png)

### back

[Sending data to Destinations](/docs/segment/getting-started/05-data-to-destinations/)

Unlock the power of Segment with Destinations

### next

[What's next?](/docs/segment/getting-started/whats-next/)

Learn about what you can do next with Segment
