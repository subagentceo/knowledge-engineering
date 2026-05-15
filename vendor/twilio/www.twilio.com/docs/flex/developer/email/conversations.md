# Manage email conversations

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

Email in Flex uses [the Conversations API](/docs/conversations-classic/api) as a basis for message orchestration. You do not need to do any additional development work to migrate the agent experience, but any future development to modify the Email channel or implement custom channels should be done using the Conversations API.

The following use cases are common scenarios that you may want to manage using Conversations.

## Modify inbound message bodies with Conversations webhooks

Modifying message bodies is helpful for moderating incoming content. You can modify the body of an incoming message by intercepting it with the [onMessageAdd Conversations Webhook](/docs/conversations-classic/conversations-webhooks#onmessageadd). This webhook will `POST` the contents of any incoming message to the URI or endpoint of your choosing. The endpoint can include a JSON containing the updated values in its response.

## **Automatically close the Conversation when completing the Task**

When an agent completes an email task, the [Conversation state](/docs/conversations-classic/states-timers) automatically changes from Active to Closed. If a customer replies to a closed Conversation, the email triggers a new inbound email Task and a new Conversation SID.

The agent handling the new Task may still see prior messages. If the customer replies to the previous email thread, the thread is included in the contents of the new Task and new Conversation, and the agent can see the context of the prior conversation.

## Next Steps

* Dive deeper into [the Conversations API](/docs/conversations-classic/api)
* Change how the Conversation is rendered in the [Flex UI Email Components](/docs/flex/developer/email/ui-customization)

[\< Email index page](/docs/flex/email)
