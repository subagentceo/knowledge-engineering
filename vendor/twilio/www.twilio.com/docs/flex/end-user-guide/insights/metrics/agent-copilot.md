# Agent Copilot  metrics

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Overview

Flex Insights includes out-of-the box custom metrics that are available when you [turn on Agent Copilot](/docs/flex/admin-guide/setup/copilot/configure). These metrics power the Agent Copilot dashboard in Flex Insights.

## Agent Copilot custom metrics

The following built-in metrics are available:

* **Conversations with negative sentiment**: number of Conversations that have at least one segment with negative customer sentiment set by Agent Copilot.
* **Conversations with neutral sentiment**: number of Conversations that have at least one segment with neutral customer sentiment set by Agent Copilot.
* **Conversations with positive sentiment**: number of Conversations that have at least one segment with positive customer sentiment set by Agent Copilot.

## Agent Copilot dashboard

You can view sentiment metrics on the **Agent Copilot** tab of the Control Center dashboard in the [Analytics Portal](https://analytics.ytica.com/account.html?lastUrl=https%253A%252F%252Fanalytics.ytica.com%252F#/login).

![Agent Copilot dashboard.](https://docs-resources.prod.twilio.com/a68b0c8a64a6f94be7c61c41dbb2abbc1f19f5c1fed23f1b3e5661c8fc51146a.jpg)

You can also filter data on the **Conversations** tab dashboard by sentiment value or disposition code.

To best understand your Agent Copilot metrics, note that Insights sets sentiment and disposition code differently for transferred calls and transferred messages:

* For Voice transfers, Insights sets sentiment and disposition codes once for the final segment. This means the number of handled conversations with sentiments and disposition codes will match the number of unique handled conversations.
* For Messaging transfers, Insights sets sentiment and disposition codes individually for each transferred segment. This means there can be different sentiment and disposition codes for each transferred segment within a Messaging Conversation. As a result, the same handled conversation is counted for each sentiment and disposition code.

For more information about how to view, share, export, or otherwise work with dashboards and Flex Insights reports, see [Dashboards](/docs/flex/end-user-guide/insights/dashboards).
