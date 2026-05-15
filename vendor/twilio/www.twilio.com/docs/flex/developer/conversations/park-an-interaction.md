# Park an Interaction

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

Unlike voice channels, digital channels like SMS and chat are asynchronous and last indefinitely, with no clear event indicating the end of a conversation.

Due to this open-ended nature of digital channels, a customer contact or inquiry could stall, and an agent may need to wait for the customer or a back-office personnel to reply in order to continue the conversation. This scenario could persist over several days, or even weeks.

The [Interactions API](/docs/flex/developer/conversations/interactions-api) allows you to remove the agent from the channel while leaving the customer in the interaction. In order to follow along, please review the [Interactions Resource](/docs/flex/developer/conversations/interactions-api/interactions) and the [Interaction Channel Participants](/docs/flex/developer/conversations/interactions-api/interaction-channel-participants) page for detailed examples.

> \[!NOTE]
>
> An [interaction channel](/docs/flex/admin-guide/core-concepts/conversations) (UOXXXXXX) is deleted after 180 days of inactivity, regardless of its state. Retrieving the channel after 180 days from deletion returns a `404 Not Found`. Note that the initial TTL (Time to Live) period resets every time there is an update to the interaction channel, such as if an agent accepts the new task through Flex UI. Changes to the Conversations channel, such as updating conversation status or adding or removing a participant, do not reset the interaction channel's inactivity period.

> \[!NOTE]
>
> Make sure to include the original task attributes in your subsequent `POST` /Invites requests since these attributes are not carried over to the new Task created as a result of sending the Invite.

## Remove an agent but keep the interaction open

To remove an agent, send a `POST` (update) request to the [Participants endpoint](/docs/flex/developer/conversations/interactions-api/interaction-channel-participants).

```bash
curl -X POST https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

```

When a "closed" status is passed, the associated task is completed but the channel, Conversation in this case, remains active.

To re-add an agent, or "unpark/pick up" the interaction, you can use the **Invites** endpoint to reroute the new task to a specific agent or to specify a workflow for evaluating a suitable queue or agent.

## Create a new task and have a workflow evaluate it for routing

To create a new task for workflow evaluation, send a `POST` (create) request to the [Invites endpoint](/docs/flex/developer/conversations/interactions-api/invites-subresource).

```bash
ROUTING=$(cat << EOF
{
    "properties": {
        "attributes": {
            "from": "+13115552368"
        },
        "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
}
EOF
)

curl -X POST https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Invites \
--data-urlencode "Routing=$ROUTING" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


```

## Example response

```json
{
   "url": "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Invites/KGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "channel_sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "routing": {
       "reservation": null,
       "properties": {
           "date_updated": 1636401979,
           "age_in_queue": 0,
           "task_channel_unique_name": "default",
           "assignment_status": "pending",
           "queue_name": "Sample Queue",
           "assignmentCounter": 0,
           "priority": 0,
           "sid": "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "task_queue_entered_date": 1636401979,
           "workflow_name": "Default Fifo Workflow",
           "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "routing_target": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "reason": null,
           "attributes": "{\"flexChannelInviteSid\":\"KGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"conversationSid\":\"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"channelType\":\"email\",\"conversations\":{\"communication_channel\":\"Email\",\"conversation_id\":\"KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"media\":[{\"conversation_sid\":\"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"media\":[{\"type\":\"ChatTranscript\",\"sid\":\"CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}],\"customers\":{\"phone\":\"+13115552368\",\"name\":null,\"email\":null}},\"flexInteractionChannelSid\":\"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"flexInteractionSid\":\"KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}",
           "task_channel_sid": "TCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "age": 0,
           "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "timeout": 86400,
           "date_created": 1636401979,
           "addons": "{}",
           "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
       }
   },
   "sid": "KGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

## Add a specific agent back to the interaction

Alternatively, you can include a queue SID and a Worker SID in your [`POST` Invites](/docs/flex/developer/conversations/interactions-api/invites-subresource) request to add a specific agent back to the Interaction:

```bash
ROUTING=$(cat << EOF
{
    "properties": {
        "attributes": {
            "from": "+13115552368"
        },
        "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
}
EOF
)

curl -X POST https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Invites \
--data-urlencode "Routing=$ROUTING" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Close the interaction channel

Once the customer issue has been solved, you can set the status of the interaction channel to `closed` by sending a `POST` (update) [Interaction Channel request](/docs/flex/developer/conversations/interactions-api/channels-subresource) like so:

```bash
curl -X POST https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

This will set any reservations to the "wrapping" status.

## Example Park Application

![Diagram showing interactions between Flex, Conversations, FlexUI Plugin, Park/Drop Channel App, and Webhook endpoint.](https://docs-resources.prod.twilio.com/15b7df390603e30bec61250707014367dc9de5f375ff2df688c42d3faddc623b.png)

To try out a working implementation of an interaction park feature, check out the source code in [this sample plugin repository](https://github.com/TwilioLatamEngHub/plugin-conversations-park-an-interaction).

## Agent Parks an Interaction Channel

![Flowchart of an agent parking an interaction channel using FlexUI and Park/Drop Channel App.](https://docs-resources.prod.twilio.com/657e809299b965c5819f0eaf0e371f76bde7de6b3e0e5feb6822bd7c6137430f.png)

## Customer Sends Message to a Parked Interaction

![Flowchart of message handling in FlexUI with webhook integration and parked conversations update.](https://docs-resources.prod.twilio.com/9d9b7d146cb66686944947138c7f11118e79b334e137f045cb49d8ef04e478a4.png)

## Agent Picks up a Parked Interaction Channel

![Agent picks up a parked interaction channel using FlexUI Plugin and Park/Drop Channel App.](https://docs-resources.prod.twilio.com/554efa5644954a372665a987cdda3260e22c5239b6431ffa37f807e1bbc0e424.png)
