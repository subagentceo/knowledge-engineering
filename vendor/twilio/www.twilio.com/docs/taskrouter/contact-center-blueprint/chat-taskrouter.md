# Using Chat and TaskRouter Together

Programmable Chat is the service used for creating web chat functionality or mobile chat.

This page outlines best practices for using Programmable Chat with TaskRouter for contact center use cases.

If you're also building SMS (or the social network integrations that use the same API as SMS) as a channel, we recommend you use the Chat service as the container object for those conversations.

## Sequencing Chat and TaskRouter

The following diagram shows how we recommend using Chat and TaskRouter together.

Notice that you must create the chat room first, before the task. Otherwise, in times of low traffic, the task might be assigned to an agent before the chat room has been created. Once the chat room is created, it can be associated with the new task as an attribute.

![Sequence diagram showing chat flow with TaskRouter from customer to agent.](https://docs-resources.prod.twilio.com/fbe369a58c5baf6796eb753370001271166c772ff6ffbe99fa360a53e8433c8a.png)
