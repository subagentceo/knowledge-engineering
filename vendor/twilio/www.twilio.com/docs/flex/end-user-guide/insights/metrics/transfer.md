# Messaging transfer metrics

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Overview

Flex Insights includes out-of-the box custom metrics that are available when you [turn on Messaging transfers](/docs/flex/admin-guide/setup/conversations/messaging-transfers). These metrics power the Messaging Transfers dashboard in Flex Insights.

## Messaging transfers custom metrics

The following built-in metrics are available:

* **Messaging Conversations with Transfers**: the count of Messaging Conversations that included a transfer.
* **Total Transfer Segments**: the count of total transfer segments per conversation.
* **Successful Transfer Segments**: the count of successful transfer segments per conversation.
* **Failed Transfer Segments**: the count of failed transfer segments per conversation.
* **Transfer Segments by Agent**: the count of segments per conversation that were transferred to an agent.
* **Transfer Segments by Queue**: the count of segments per conversation that were transferred to a queue.

## Messaging transfers dashboard

You can view Messaging transfers metrics on the **Messaging Transfers** tab of the Control Center dashboard in the [Analytics Portal](https://analytics.ytica.com/account.html?lastUrl=https%253A%252F%252Fanalytics.ytica.com%252F#/login). The dashboard visualizes both the total count for transfer metrics and each metric broken out by Conversation.

![Messaging transfers dashboard showing 20 total transfers, 13 successful, and 7 failed.](https://docs-resources.prod.twilio.com/25a116fffcaa4fd867f666fdaa1728330af478d665c5ae5fb85293601ec0a322.png)

For more information about how to view, share, export, or otherwise work with dashboards and Flex Insights reports, see [Dashboards](/docs/flex/end-user-guide/insights/dashboards).
