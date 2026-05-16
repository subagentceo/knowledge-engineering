# Flex Conversations

> \[!NOTE]
>
> Flex Conversations requires [Flex UI 2.x.x](/docs/flex/developer/ui/migration-guide). To check which version of the Flex UI you are using, see [Flex UI Versioning](/docs/flex/admin-guide/core-concepts/flex-ui). If you're using Flex UI 1.x.x, follow the [migration guide](/docs/flex/developer/ui/migration-guide).

Flex Conversations gives your contact center the digital channel capabilities for both customer-initiated (commonly referred to as inbound flows) and business-initiated (commonly referred to as outbound flows) interactions, and provides the orchestration layer for managing and processing those customer interactions. Since it is based on the single Twilio Conversations primitive, the developer experience is improved and the complexity of building async channel workflows is reduced. For more details on the benefits of building on Flex Conversations, see the [FAQ page](/docs/flex/developer/conversations/faq-and-troubleshooting).

While your customers may interact with the contact center using a variety of messaging channels, your agent always responds using the standard [Flex agent desktop chat interface](/docs/flex/admin-guide/core-concepts/flex-ui#agent-desktop).

Under the hood, Flex uses Twilio products to achieve this. These products include:

* [Twilio Conversations](/docs/conversations-classic) for session management and chat channels
* [Messaging service](/docs/messaging/services) for SMS/MMS and WhatsApp channels
* The [Interactions API](/docs/flex/developer/conversations/interactions-api) for managing the communication between your customer and contact center
* [Twilio Studio](/docs/studio) for developing Chatbots and routing incoming Conversations

While Conversations and Messaging Services provide the ability to send and receive messages over different channels, the Interactions API gives you the ability to orchestrate agent routing and the ability to [add and remove agents](/docs/flex/developer/conversations/park-an-interaction) from a given conversation.

The Flex `/Interactions` API endpoint supports the following channel types:

* SMS/MMS
* WhatsApp
* Chat
* Facebook Messenger (Public Beta)

The following sequence diagram illustrates an example of how Flex handles an inbound SMS contact:

![Flowchart of inbound SMS handling from mobile to Flex UI via Twilio services.](https://docs-resources.prod.twilio.com/0b973546f4d506ba84393603669eed6abfad5e8075cdfc185fa8009956cbe718.png)

When you create an interaction, you specify the Twilio Conversation to bind to and the [TaskRouter workspace](/docs/flex/admin-guide/core-concepts/routing) to use for routing. You can optionally declare additional routing attributes according to your interaction type. This will result in a reservation which once accepted, will automatically add that agent to the conversation.

For more information about the Interactions API, please refer to the [API documentation](/docs/flex/developer/conversations/interactions-api).

## Architectural overview

Flex allows agents to work from a single interface even as customers communicate over different channels. While the user experience feels minimal, people building contact centers understand the underlying complexity in creating this functionality. This page offers a high-level understanding of how Flex manages omnichannel two-way communications. With Twilio Conversations and the Interactions API, you can create inbound and outbound conversations with your customers. Your agents will have more granular control on the lifecycle of a conversation and can proactively reach out to your customers. For detailed examples and use cases, see the [Interactions API documentation](/docs/flex/developer/conversations/interactions-api).

Flex Conversations requires:

* A [Flex Account/Project](https://www.twilio.com/console/projects/create?g=/console/flex/setup\&t=96e837a3b43a8c7981af899eaae92b968887485e3f454d330a821ab7c8738d5e)
* [Flex UI](/docs/flex/developer/ui/migration-guide) version 2.x.x or newer
* Conversations Addresses for your phone numbers or sender IDs
* Flex onboarding sets up default handlers for inbound Chat and inbound SMS. It also configures standard Studio interaction for these to build any chat bot logic prior to agent handover. The default handlers - **Chat flow** (see the [demo app](https://github.com/twilio/twilio-webchat-react-app) for more information) and **Conversation flow** - use the "Incoming Conversation" trigger with the [Send to Flex widget](/docs/studio/widget-library/send-flex) to handover to the Flex application. You can [manage Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses) using the Twilio Console. Learn more in [handle inbound SMS and WhatsApp messages](/docs/flex/developer/conversations/receive-inbound-messages-from-sms-and-whatsapp).

## Inbound flow from a messaging channel

![Inbound messaging flow: customer to conversations, Twilio Studio, Flex Interactions, TaskRouter, agent response.](https://docs-resources.prod.twilio.com/1d9ad7bec58bd6c73c74274ba079111d7fcad13e32d430be9bf6169821c98d30.png)

The Conversations Service will create a new Conversation as per the Address configuration for your Flex phone number. In the diagram above, it was configured to invoke a Studio Flow. Once a conversation arrives at Studio, you can design your bespoke flow to handle this conversation. If you decide to send to Flex, use the [Send To Flex widget](/docs/studio/widget-library/send-flex). This widget will call the Interactions endpoint which in turn creates a task and route it to the agent. Learn more about how [omnichannel inbound messages work](/docs/flex/developer/conversations/receive-inbound-messages-from-sms-and-whatsapp).

## Outbound flow on a messaging channel (immediate task creation)

![Outbound flow on a messaging channel (immediate task creation).](https://docs-resources.prod.twilio.com/e503a50d673133e17a896dbb64bc6574ff608c7a312f2fcdee8c919d70417e94.png)

In this scenario, the agent clicks on start conversation through a Flex plugin or a third-party application. This invokes the Interactions API to create an outbound channel and add the customer to it. Once that orchestration is complete, the agent is able to send and receive messages from the customer.

## Outbound flow on a messaging channel (task creation on customer response)

![Flowchart of Twilio Conversations with customer app, agent, TaskRouter, and Twilio Studio interactions.](https://docs-resources.prod.twilio.com/1f0f22fc4369d15a4c4ac7311d45dd5438c20ddfab4e894025b38369cce2c8c7.png)

This is similar to the previous outbound flow except in this case, you need to[create the conversation first and add your scoped webhook integration to handle the reply](/docs/flex/developer/conversations/integrate-a-custom-chat-client-with-flex). Once you've done that, you can send a message to the participant. When the participant replies, the scoped webhook will invoke your integration. When your integration is invoked, you can auto-reply to the customer and then forward to Flex by using the Interactions API.

Learn more about how you can [send outbound messages with Flex Conversations](/docs/flex/developer/conversations/send-outbound-messages-via-sms-and-whatsapp).
