# Register a webhook to receive Interactions events

> \[!WARNING]
>
> Interactions API webhooks are not PCI compliant or a HIPAA Eligible Service and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

The [Interactions API](/docs/flex/developer/conversations/interactions-api) is part of the architecture that supports [Flex Conversations](/docs/flex/conversations). When developing for Flex Conversations, you may need to receive [Interactions events](#event-details) in your Flex development environment to use in building custom workflows.

To get to Interaction event notifications, use the `https://flex-api.twilio.com/v1/Instances/{instanceSid}/InteractionWebhooks` API endpoint to register a webhook URL and subscribe to events you need.

## Register an Interaction webhook URL

There are two types of Interactions webhooks. You determine which to create by setting the `Type` parameter in the API request to one of the following:

* `global`: Get notifications for all events you subscribe to using one webhook URL for your Flex instance. Note that you can also [set a global webhook URL and subscribe to event details in the Twilio Console](/docs/flex/admin-guide/setup/conversations/configure-interactions-webhook).
* `interaction`: Get notifications for events you subscribe to only for a specific interaction. After registering a webhook with the `Type` set to `interaction`, the API response provides a `ttid` value for that webhook. You must then provide this value as the `webhook_ttid` when you [create an Interaction](/docs/flex/developer/conversations/interactions-api/interactions#create-an-interaction-resource). This associates the webhook to the Interaction so that you get notifications when a subscribed event occurs for that Interaction.

To register a webhook URL:

* Execute the `POST /v1/Instances/{instanceSid}/InteractionWebhooks` API call, making sure that you set the [request parameters](#request-parameters) according to the type of webhook you want to create. See below for example requests to create a [global](#register-a-global-interaction-webhook) or an [Interaction-specific](#register-an-interaction-webhook-for-a-specific-interaction) webhook.

### Request parameters

| Name           | Description                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Filters`      | Name of the event to send to the webhook URL. See [Event details](#event-details) for a list of events and their associated parameters. You can pass more than one instance of this parameter.                                                                                                                                 |
| `Method`       | HTTP method used to send the event.                                                                                                                                                                                                                                                                                            |
| `Type`         | Type of webhook.<br /><br />Possible values:<br /> <ul><li>`global`: Send a notification every time the subscribed events occur.</li><li>`interaction`: Send a notification for the subscribed events when they occur for a specific interaction.</li></ul> If you don't send a value in the request, it defaults to `global`. |
| `WebhookUrl`   | Webhook URL to send the event details.                                                                                                                                                                                                                                                                                         |
| `FriendlyName` | A name for the webhook that's easy to recognize and understand.                                                                                                                                                                                                                                                                |

**Note**: If you register a global webhook URL for all events and an Interaction-specific webhook URL, when an event you've subscribed to occurs for an Interaction you've subscribed to, Flex sends a notification to both URLs.

The following are examples of the `POST /v1/Instances/{instanceSid}/InteractionWebhooks` API call configured by `type`.

### Register a global Interaction webhook

```bash {title="POST API request"}
curl -X POST https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks \\
--data-urlencode "WebhookEvents=onChannelStatusUpdated" \\
--data-urlencode "WebhookEvents=onChannelCreateFailed" \\
--data-urlencode "WebhookMethod=POST" \\
--data-urlencode "Type=global" \\
--data-urlencode "WebhookUrl=https://company.com/action" \\
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="POST API response"}
{
  "ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX", 
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
  "instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "webhook_url": "https://company.com/filtering-and-permissions",
  "webhook_events": [ "onChannelStatusUpdated", "onChannelCreateFailed"],
  "webhook_method": "POST", "type": "global",
  "url": "https://flex-api.twilio.com/v1/Interactions/Webhooks)/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_xxxx"
} 
```

### Register an Interaction webhook for a specific Interaction

Calling the following API creates an Interaction-specific webhook to receive notifications for subscribed `WebhookEvents` at the specified `WebhookUrl`.

This API returns a `ttid` value that you must pass in the Interactions API `webhook_ttid` parameter when you [create the Interaction](/docs/flex/developer/conversations/interactions-api/interactions#create-an-interaction-resource) you want to associate with the webhook.

You must call both this API and the Interactions API for an Interaction-specific webhook to work correctly. After sending this request, you won't receive event notifications until you call the Interactions API to create an interaction and include the `ttid` value returned by this request. To see an example request that creates an Interaction associated with a webhook, go to the [Interactions resource](/docs/flex/developer/conversations/interactions-api/interactions#associate-an-interaction-with-an-event-webhook).

```bash {title="POST API request"}
curl -X POST https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks
--data-urlencode "WebhookEvents=onChannelStatusUpdated"
--data-urlencode "WebhookEvents=onChannelCreateFailed"
--data-urlencode "WebhookMethod=POST"
--data-urlencode "Type=interaction"
--data-urlencode 'FriendlyName=Friendly Name of webhook'
--data-urlencode "WebhookUrl=https://company.com/action"
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="POST API response"}
{
  "ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "webhook_url": "https://company.com/filtering-and-permissions",
  "webhook_events": [ "onChannelStatusUpdated", "onChannelCreateFailed" ],
  "webhook_method": "POST",
  "friendly_name": "Friendly Name of webhook",
  "type": "interaction",
  "url": "https://flex-api.twilio.com/v1/Interactions/Webhooks"
}
```

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

## Get a list of all Interaction webhooks registered for your Flex instance

The `GET /v1/Instances/{instanceSid}/InteractionWebhooks` API call lets you get a list of all your registered webhooks.

**Query parameter**: `type`

```bash {title="GET API request"}
curl -X GET https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks{ttid} \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="GET API response"}
{
    "meta": {
        "page": 0,
        "page_size": 50,
        "first_page_url": "https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks?PageSize=50\&Page=0",
        "previous_page_url": null,
        "url": "https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks?PageSize=50&Page=0",
        "next_page_url": null,
        "key": "data"
    },
    "data": [
        {
            "ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX",
            "instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "url": "https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX",
            "webhook_events": ["onInteractionCreated","onChannelCreated"],
            "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "webhook_method": "POST",
            "webhook_url": "https://interaction-webbhook-6314.twil.io/interaction",
            "type": "global"
        },
        {
            "ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX",
            "instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "url": "https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX",
            "webhook_events": ["onInteractionCreated","onChannelCreated"],
            "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "webhook_method": "POST",
            "webhook_url": "https://interaction-webbhook-6314.twil.io/interaction",
            "type": "interaction"
        }
    ]
}
```

## Get details for an Interaction webhook

The `GET /v1/Instances/{instanceSid}/InteractionWebhooks/{ttid}` API call lets you get the details for a webhook.

```bash {title="GET API request"}
curl -X GET https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_xxxx
\-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="GET API response"}
{
"ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX"
"account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"webhook_url": "https://company.com/filtering-and-permissions",
"webhook_eventsfilters": [ "onChannelStatusUpdated", "onChannelCreateFailed" ],
"webhook_method": "POST",
"type": "global",
"url": "https://flex-api.twilio.com/Interactions/Webhooks)/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_xxxx"
}
```

## Update an Interaction webhook

`POST /v1/Instances/{instanceSid}/InteractionWebhooks/{ttid}`

```bash {title="POST API request"}
curl -X POST https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/**flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX**
--data-urlencode "WebhookEvents=onChannelStatusUpdated"
--data-urlencode "WebhookEvents=onInteractionCreated"
--data-urlencode "WebhookMethod=POST"
--data-urlencode "WebhookUrl=https://company.com/action"
--data-urlencode "FriendlyName=Friendly Name of webhook"
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="POST API response"}
{
"ttid": "flex_interactionwebhook_XXXXXXXXXXXXXXXXXXX"
"account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"instance_sid": "GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"webhook_url": "https://company.com/action",
"webhook_events": [ "onChannelStatusUpdated", "onInteractionCreated" ],
"webhook_method": "POST",
"type": "global",
"friendly_name": "Friendly Name of webhook",
"url": "https://flex-api.twilio.com/v1/Interactions/Webhooks)/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_xxxx"
}
```

## Delete an Interaction webhook

The `DELETE /v1/Instances/{instanceSid}/InteractionWebhooks/{ttid}` API call lets you delete a webhook.

```bash {title="DELETE API request"}
curl -X DELETE https://flex-api.twilio.com/v1/Instances/GOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/InteractionWebhooks/flex_interactionwebhook_xxxx
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
