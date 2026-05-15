# Work with messaging transfers

> \[!NOTE]
>
> Messaging transfers is not PCI compliant or a HIPAA Eligible Service and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

With messaging transfers, you can:

* Send the message to another agent or to a queue. Currently, Flex only supports cold transfers.
* Share an AI-generated summary of the conversation, if your organization uses [Agent Copilot](/docs/flex/end-user-guide/copilot).
* Share a note while transferring the message, if your administrator has notes turned on.

For supervisors and team leads, if you have access to [Flex Insights](/docs/flex/end-user-guide/insights), you can view messaging transfer [attributes](/docs/flex/end-user-guide/insights/data-model) and [custom metrics](/docs/flex/end-user-guide/insights/metrics/transfer) to learn more about how your team uses transfers.

## Transfer a message

If messaging transfers are turned on for your Flex instance, you'll see **Transfer** as an option under **Task** in the task header when you're working in a conversation.

To transfer a message to another agent:

1. In the top-right corner of the conversation, click **Task**, and then click **Transfer**.
2. In the agent list, hover over the name of the agent you want to transfer the message to, and then click **Transfer to *AGENT NAME***.
3. (Optional) If you use [Agent Copilot](/docs/flex/end-user-guide/copilot), in **Transfer Summary**, review the suggested text, and edit it if needed.
4. (Optional) If notes are available, in **Notes for agent**, add information about the message, and then click **Confirm Transfer**.

If you transfer a message to an agent who isn't available, or if the agent rejects the task, Flex sends the message to the next agent in the workflow.

To transfer a message to a queue:

1. In the top-right corner of the conversation, click **Task**, and then click **Transfer**.
2. Click the **Queues** tab.
3. In the queue list, hover over the name of the queue you want to transfer the message to, and then click **Transfer to *QUEUE***.
4. (Optional) If you use [Agent Copilot](/docs/flex/end-user-guide/copilot), in **Transfer Summary**, review the suggested text, and edit it if needed.
5. (Optional) If notes are available, in **Notes for agent**, add information about the message, and then click **Confirm Transfer**.

## Receive a transferred message

As with other incoming tasks, you can accept or reject the request to transfer a message.

When you accept a transferred message, you can:

* View the conversation history.
* View an AI-generated summary of the Conversation, if you have [Agent Copilot](/docs/flex/end-user-guide/copilot).
* View notes the transferring agent sent you, if your administrator has notes turned on.

## View insights for messaging transfers

If you use [Flex Insights](/docs/flex/end-user-guide/insights/getting-started) in your account, you can gather data about transfers using the following attributes:

* Transfer Type
* Transferred Segment
* Destination Type
* Destination
* Preceded By
* Followed By

Flex Insights also includes several custom metrics you can visualize using the **Messaging Transfers** dashboard. For details, see [Messaging transfer metrics](/docs/flex/end-user-guide/insights/metrics/transfer).
