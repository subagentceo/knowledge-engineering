# Best Practices

## Only use Flex Chat Service and ensure that it's the default service

For correct operation, you must use the dedicated Conversations service for Flex, "Flex Chat Service". Furthermore, "Flex Chat Service" must be configured as the default Conversations service.

## Do not use Task API directly to cancel or delete a task

When you create an interaction, a task and a reservation will be created according to your specified Routing attributes. You may update the task attributes but deleting or canceling a task are not supported. You must use the Interactions Channels subresource. For more information, please refer to the [Interaction Channels documentation](/docs/flex/developer/conversations/interactions-api/channels-subresource).

## Don't use PII in the identity of chat participants

Refrain from using PII (personally identifiable information) such as number or email address as the identity for custom chat identities.

## Set a close timer on the Conversations

For channels that are NOT long-lived, we recommend that you use the built-in state timers on Conversations to close the conversation after a certain time of inactivity. This prevents orphaned conversations. Please refer to the [Conversations states and timers documentation](/docs/conversations-classic/states-timers) for more information.

## Handle declined agent reservations

When you specify a worker SID in your Interactions invite and that agent declines the invite (a [parked interaction](/docs/flex/developer/conversations/park-an-interaction) for example), the created task gets canceled but the conversation remains active without an agent. Use [known agent routing](/docs/taskrouter/workflow-configuration/known-agent-routing) instead to avoid orphaned conversations.

## Handle Terminal TaskRouter Events to avoid orphaned Conversations

You must ensure that you handle certain terminal TaskRouter events according to your application's needs. For example, if a workflow timeout occurs, you may want to automate a message or re-invite the agent or the workflow to a different workflow using the [Invites Subresource](/docs/flex/developer/conversations/interactions-api/invites-subresource). Please ensure the following events are handled as needed by your application:

* workflow.timeout
* task.canceled
* task.deleted

Refer to the [TaskRouter event documentation](/docs/taskrouter/api/event/reference) for more information.

## Use ChannelAttributes and not message attributes in Studio

To read Conversation attributes in a Studio Flow, you must use the attributes on the Conversation rather than the message. The Incoming Conversation trigger supports JSON payloads for Conversations Channel attributes but not the message one. You can read the JSON value from the trigger's ChannelAttributes attribute.

## Refer to the Console debugger to see if there are errors with creating interactions

If you are unsure why things are not working, consider checking the [Twilio Console debugger](/docs/messaging/guides/debugging-tools). Flex Conversations logs warnings for when Flex fails to create interaction channels.

## Don't add an agent directly to a Conversation. Use the Interactions /Invites endpoint instead

In Flex Conversations, all agents have a Chat identity. Flex does not support adding Flex agents directly to an ongoing interaction channel or conversation. To add an agent to a conversation, you must have the interaction channel SID and use the Invites endpoint. See [Invites Subresource documentation](/docs/flex/developer/conversations/interactions-api/invites-subresource) for more information.

## To determine if an interaction create failed, check for Task canceled events

Since Interaction Channel creation is asynchronous and the status reason does not indicate a failed status, you can register to receive [task.canceled events](/docs/taskrouter/api/event/reference) to determine if an interaction channel creation failed.

## Check if customer is already in a conversation before creating an interaction

An SMS or WhatsApp participant is identified by the number/proxy-number pair in the messaging bindings attributes. This number pair binding may only exist in one non-closed (either "active" or "inactive") conversation. If you attempt to add the same participant to another conversation, the request will fail.

Therefore, if you're creating an outbound interaction and specifying the participant, ensure that the participant is not in a non-closed conversation already. You can use the [Participant Conversation Resource](/docs/conversations-classic/api/participant-conversation-resource) to check for non-closed conversations.

Another approach is to create the conversation first and then the interaction. This way when you add the participant to the new conversation, the add will fail and return the conversation SID of the conversation that the participant is already in.

## Use Service scoped pre-event webhooks to process messages before they get added to the conversation

If your use case requires that you inspect and/or modify messages sent or received to a conversation, consider using the pre-event webhooks available in the Conversations API. See the [Per-Service Webhook Resource](/docs/conversations-classic/api/per-service-webhook-resource) for more information.
