# Subscribe to Interactions events

> \[!WARNING]
>
> Interactions API webhooks are not PCI compliant or a HIPAA Eligible Service and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

The [Interactions API](/docs/flex/developer/conversations/interactions-api) is part of the architecture that supports [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations). Certain Interactions API operations trigger events related to an Interaction, Participant, or Channel. To get notified of events and state changes during Conversations, you can configure a webhook URL to receive Interaction events and then subscribe to selected events.

Subscribing to events lets Flex send details you need and prevents your system from receiving data you don't need. It also lets you gather information about customer interactions or trigger additional workflows in certain situations. For example, using the `onParticipantLeft` event, you could create a custom workflow to show a survey when a Participant leaves a Conversation.

As an administrator, you can set and manage your Interactions webhook URL and event subscriptions on the **Interactions** page in the Twilio Console. Developers can also [register webhook URLs](/docs/flex/developer/conversations/register-interactions-webhooks) to receive notifications about events or specific Interactions they need to build custom workflows.

## Set a webhook URL

To set the webhook URL:

1. In the Twilio Console, go to **Flex** > **Channel management** > **Interactions**.
2. In **Webhook URL**, enter the URL where you want Flex to send Interaction event details. The URL must begin with `http` or `https`.
3. In **Webhook method**, select `HTTP POST` or `HTTP GET`.

## Subscribe to events

To subscribe:

1. Under **Select webhook events**, select the events you want to subscribe to. See [Event details](#event-details) for a list of events and their associated parameters.
2. Click **Save configuration**.

## Event details

### onInteractionCreated

Sent when an Interaction is created.

| Parameter name     | Data type | Description                                                                                      |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------ |
| `EventType`        | String    | Value is always `onInteractionCreated`.                                                          |
| `AccountSid`       | SID       | The Twilio Account SID of the Interaction.                                                       |
| `InstanceSid`      | SID       | The Flex Instance SID of the Interaction.                                                        |
| `InteractionSid`   | SID       | The Interaction SID.                                                                             |
| `MediaChannelSid`  | SID       | The Conversation SID or Conference SID that the Channel is associated with.                      |
| `MediaChannelType` | String    | Type of Channel the Interaction occurred on. For example: `sms`, `whatsapp`, `chat`, or `voice`. |

### onChannelCreated

Sent when a Channel is created.

| Parameter name     | Type   | Description                                                                         |
| ------------------ | ------ | ----------------------------------------------------------------------------------- |
| `EventType`        | String | Value is always `onChannelCreated`.                                                 |
| `AccountSid`       | SID    | The Twilio Account SID of the Channel.                                              |
| `InstanceSid`      | SID    | The Flex Instance SID of the Channel.                                               |
| `InteractionSid`   | SID    | The Interaction SID of the Channel.                                                 |
| `ChannelSid`       | SID    | The SID of the Channel that was created.                                            |
| `MediaChannelSid`  | SID    | The Conversation SID or Conference SID associated with the Channel.                 |
| `MediaChannelType` | String | Type of Channel created. For example, `sms`, `whatsapp`, `web`, `chat`, or `voice`. |

### onChannelCreateFailed

Sent if a Channel can't be created.

| Parameter name     | Type    | Description                                                                                                                                                                                                                                                                                 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EventType`        | String  | Value is always `onChannelCreateFailed`.                                                                                                                                                                                                                                                    |
| `AccountSid`       | SID     | The Twilio Account SID of the Channel.                                                                                                                                                                                                                                                      |
| `ErrorCode`        | Integer | The Twilio error code for the reason that Channel creation failed.                                                                                                                                                                                                                          |
| `ErrorMessage`     | String  | The Twilio error message associated with the reason for the failure.                                                                                                                                                                                                                        |
| `InteractionSid`   | SID     | The Interaction SID of the Channel. This parameter is optional.                                                                                                                                                                                                                             |
| `ChannelSid`       | SID     | The SID of the Channel created. This parameter is optional. <br /><br /> **Note** In some cases, a ChannelSid is created even though the Channel itself isn't created successfully. For example, this can happen if Channel creation fails because of a failure with a downstream resource. |
| `MediaChannelSid`  | SID     | The Conversation SID or Conference SID associated with the Channel. This parameter is optional.                                                                                                                                                                                             |
| `MediaChannelType` | String  | Type of Channel that couldn't be created. For example, `sms`, `whatsapp`, `chat`, or `voice`.                                                                                                                                                                                               |

### onChannelStatusUpdated

Sent when the Channel status is updated. The status can be `active` or `closed`.

| Parameter name     | Type   | Description                                                                         |
| ------------------ | ------ | ----------------------------------------------------------------------------------- |
| `EventType`        | String | Value is always `onChannelStatusUpdated`.                                           |
| `AccountSid`       | SID    | The Twilio Account SID of the Channel.                                              |
| `InstanceSid`      | SID    | The Flex Instance SID of the Channel.                                               |
| `InteractionSid`   | SID    | The Interaction SID that the Channel belongs to.                                    |
| `ChannelSid`       | SID    | The SID of the Channel that was updated.                                            |
| `MediaChannelSid`  | SID    | The Conversation SID or Conference SID associated with the Channel.                 |
| `ChannelStatus`    | SID    | The current status of the channel. Value can be `active` or `closed`.               |
| `MediaChannelType` | String | Type of Channel updated. For example, `sms`, `whatsapp`, `web`, `chat`, or `voice`. |

### onParticipantJoined

Sent when a Participant is added to the Channel. Occurs when:

* The Participant accepts a reservation.
* The Participant is added using the Add Participant API.

| Parameter name   | Type   | Description                                                                                        |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------- |
| EventType        | String | Value is always `onParticipantJoined`.                                                             |
| AccountSid       | SID    | The Twilio Account SID that the Participant belongs to.                                            |
| InteractionSid   | SID    | The Interaction SID that the Participant belongs to.                                               |
| ChannelSid       | SID    | The Channel SID of the Channel that the Participant belongs to.                                    |
| ParticipantSid   | SID    | The SID of the Participant added to the Channel.                                                   |
| ParticipantType  | String | Type of Participant. For example, customer or agent.                                               |
| TaskSid          | SID    | The Task SID associated with the Channel.                                                          |
| MediaChannelSid  | SID    | The Conversation SID or Conference SID associated with the Channel.                                |
| MediaChannelType | String | Type of Channel the Participant joined. For example, `sms`, `whatsapp`, `web`, `chat`, or `voice`. |

### onParticipantLeft

Sent when a Participant leaves the Channel. Occurs when the Participant leaves the Channel.

| Parameter name     | Type   | Description                                                                                      |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `EventType`        | String | Value is always `onParticipantLeft`.                                                             |
| `AccountSid`       | SID    | The Twilio Account SID that the Participant belongs to.                                          |
| `InteractionSid`   | SID    | The Interaction SID that the Participant belongs to.                                             |
| `ChannelSid`       | SID    | The Channel SID of the Channel that the Participant belongs to.                                  |
| `ParticipantSid`   | SID    | The SID of the Participant who left the Channel.                                                 |
| ParticipantType    | String | Type of Participant. For example, customer or agent.                                             |
| `TaskSid`          | SID    | The Task SID associated with the Channel.                                                        |
| `MediaChannelSid`  | SID    | The Conversation SID or Conference SID associated with the Channel.                              |
| `MediaChannelType` | String | Type of Channel the Participant left. For example, `sms`, `whatsapp`, `web`, `chat`, or `voice`. |

### onParticipantUpdated

Sent when a Participant's status is updated.

| Parameter name     | Type   | Description                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `EventType`        | String | Value is always `onParticipantUpdated`.                                                                                   |
| `AccountSid`       | SID    | The Twilio Account SID that the Participant belongs to.                                                                   |
| `InteractionSid`   | SID    | The Interaction SID that the Participant belongs to.                                                                      |
| `ChannelSid`       | SID    | The Channel SID of the Channel that the Participant belongs to.                                                           |
| `ParticipantSid`   | SID    | The SID of the Participant whose status was updated.                                                                      |
| ParticipantType    | String | Type of Participant. For example: customer, agent.                                                                        |
| `TaskSid`          | SID    | The Task SID associated with the Channel.                                                                                 |
| `MediaChannelSid`  | SID    | The Conversation SID or Conference SID associated with the Channel.                                                       |
| `MediaChannelType` | String | Type of Channel on which the Participant's status was updated. For example, `sms`, `whatsapp`, `web`, `chat`, or `voice`. |
