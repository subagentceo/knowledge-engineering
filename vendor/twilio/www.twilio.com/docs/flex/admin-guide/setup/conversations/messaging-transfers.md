# Turn on messaging transfers for Conversations

> \[!NOTE]
>
> Messaging transfers is not PCI compliant or a HIPAA Eligible Service and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

Messaging transfers lets agents transfer a message and the conversation history to another agent or queue. Turn on messaging transfers to make sure messages can reach the best qualified agent, along with the relevant context. Messaging transfers also includes options to let agents share notes and an AI-generated summary during a transfer. As an administrator, you can choose whether to turn on these options when you turn on the feature.

### Requirements

* Flex UI 2.13.x or later.
* [Flex Conversations](/docs/flex/conversations)

### What's available?

* Cold transfer to an agent or queue using the same messaging channel.
* Sending notes with a message transfer, if you select this option when you [turn on messaging transfers](#turn-on-messaging-transfers).
* Sending an AI-generated transfer summary using Agent Copilot, if you select this option when you [turn on messaging transfers](#turn-on-messaging-transfers).
* [Viewing insights and metrics](/docs/flex/end-user-guide/conversations/work-with-messaging-transfers#view-insights-for-messaging-transfers) associated with transfers, if you use Flex Insights.

### Considerations

In an agent-to-agent transfer, if the receiving agent isn't available, or if they reject the task, Flex sends the message to the next available agent in the workflow.

### Limitations

The following functionality isn't available yet:

* Warm transfer.
* Transferring email messages.
* Transferring a message to a workflow. Transfer to a queue sends the message directly to the queue.

### Known issues

* Prior to Flex UI 2.10.x, when an agent receives a transfer, an intermittent issue may occur when loading the transfer details, including transfer notes, to the chat transcript in the agent UI.

## Turn on messaging transfers

When you turn on messaging transfers, agents can transfer a message to another agent or to a queue. You can choose whether to let agents share notes with a transfer.

Beginning in Flex UI 2.13.0, if you've enabled [Agent Copilot](/docs/flex/admin-guide/setup/copilot), you can also send an AI-generated transfer summary of the conversation.

> \[!NOTE]
>
> If you installed the Flex [Conversation Transfer plugin](https://flex-plugins-library.twilio.com/plugins/plibo-chat-transfer) or a custom conversation transfer plugin, uninstall that plugin before turning on messaging transfers.

To turn on messaging transfers:

1. In [Twilio Console](https://console.twilio.com), go to **Flex** > **Channel management** > **Transfers**, and then click the **Messaging** tab.
2. Turn on **Enable messaging transfers**.
3. Optionally, turn on **Enable messaging transfer notes**.

To turn on transfer summary:

1. Under **AI-generated transfer summary is available in Agent Copilot**, click **Enable** to open your Agent Copilot settings.
2. On the **Transfer Summary** page, turn on **Auto-generation service**.
