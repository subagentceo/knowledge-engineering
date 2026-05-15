# Email-specific reporting from Flex Insights

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

As a supervisor, you may want to see email-related metrics and include data for email-specific reports. You can do this through **[Flex Insights](/docs/flex/developer/insights)**.

## Real-time Insights

The [Teams View](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity#what-can-you-do-in-teams-view) displays all emails for agents, whether they are active or in wrap-up mode.

![Team view showing agents with email tasks labeled anonymous and time elapsed.](https://docs-resources.prod.twilio.com/716e905025a09accfb17e6467a50777345990f04418e0aaf0d2a43298d6f4fc7.png)

***

The **[Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view)** shows all active and waiting email tasks.

![Dashboard showing task queues with 2 active tasks and 2 available agents.](https://docs-resources.prod.twilio.com/d5cad6576e6fa6d273500f8b71bd2e9b5f55d495f35c059d587e3ff14cd784b6.png)

To learn more about the displayed metrics and the insights they provide, see [Metrics](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#metrics).

## Historical Reporting

You can generate reports on the following email information:

* Outbound emails:

  * Total number of emails sent during a time period
  * Total number of emails sent by an agent or a team
* Inbound emails:

  * Total number of emails received during a time period
  * Time to resolution for tasks generated from an email conversation
  * Time to resolution for the Conversation associated with an email conversation

![Email activity feed showing events like delivered and processed with timestamps.](https://docs-resources.prod.twilio.com/9c49aceb371172fb7edfbe586ea76c0cc04d6ede26aa5d90b1e8eb3cb6206b41.png)

![Email dashboard showing requests, delivered, bounces, blocks, and deferred metrics over time.](https://docs-resources.prod.twilio.com/0c29eafb1284ebb23001147252d92623e442afd5a0ea19377abe8e58f27b7845.png)

## Transcripts

The **[Conversations Dashboard](/docs/flex/end-user-guide/insights/dashboards#play-conversations)** allows you to drill down into individual conversation transcripts. You can click on the individual segment ID in the list of conversation segments to display an email conversation transcript on the right side of the screen.

![Email dashboard showing conversation list and transcript with account issues.](https://docs-resources.prod.twilio.com/f1ed8a2a5d27cf4927f55a82af262819a452cb4256270f618fccdb9389ffa146.png)

You can sort the conversations by inbound or outbound messages with a **Direction** dashboard filter.

For a larger view, open the transcript in a new, wide-view window by clicking the arrow icon in the top-right corner of the transcript. In the new window, you can comment on or assess the interaction.

[\< Email index page](/docs/flex/email)
