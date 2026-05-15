# Get Started with Flex Conversations

Flex Conversations is the next generation architecture for async channel capabilities. It supports the following channels:

* SMS/MMS
* WhatsApp
* Chat
* Email
* Facebook Messenger (Public Beta)

Flex also allows you to build solutions to support external channels. For more details, see [How to Integrate Telegram into Twilio Flex Conversations](https://www.twilio.com/en-us/blog/integrate-telegram-flex-conversations) and [Viber Integration with Twilio Flex via Corezoid](https://www.twilio.com/en-us/blog/viber-integration-with-twilio-flex-via-corezoid).

Flex Conversations uses [Twilio Conversations](/docs/conversations-classic) and the [Interactions API](/docs/flex/developer/conversations/interactions-api) to build contact center workflows for these channels.

> \[!WARNING]
>
> You must use both Twilio Conversations and the Interactions API for Flex Conversations to work correctly. If you don't, you may see unexpected behavior like inconsistent results and missing events.

The following diagram illustrates the high-level topology of Flex Conversations:

![Flowchart showing Twilio Conversations integration with Flex and TaskRouter for customer-agent interactions.](https://docs-resources.prod.twilio.com/f44c422d2f69c20d086d80189fcd602c062f461f6e9556dc27990a9d9283fca2.png)

Flex Conversations provides the following async channel capabilities and contact center features:

* Rich text formatting options for chat
* Attachments for all channels
  * SMS/MMS is US only
  * See [Channel attachment limits](/docs/flex/developer/conversations/limits) for file types and size limits
* Read receipts for WhatsApp and Chat
* Includes a supported [open source demo web chat application](https://github.com/twilio/twilio-webchat-react-app) that works with Twilio Conversations and supports guest chat users

| Role           | Features                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Administrators | The ability to configure [inbound SMS/MMS](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses), [WhatsApp](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses), [Chat](/docs/flex/admin-guide/setup/conversations/manage-conversations-chat-addresses), and [Facebook Messenger](/docs/flex/admin-guide/setup/conversations/manage-conversations-fbmessenger-addresses), and associate Addresses with Studio Flows and webhook URLs |
| Developers     | [Twilio Conversations](/docs/conversations-classic) and the [Interactions API](/docs/flex/developer/conversations/interactions-api) to manage Conversation contacts, participants, custom chat channels, address configurations, webhooks, and events                                                                                                                                                                                                                                          |
| Agents         | Handle inbound and outbound async channel tasks                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Supervisors    | Monitor channel interactions                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Next steps

* For more details on the difference between Legacy Messaging and Conversations, see the [FAQ page](/docs/flex/developer/conversations/faq-and-troubleshooting).
* [Set up](/docs/flex/admin-guide/setup/conversations/prerequisites) your account with Flex Conversations.
* Learn about migrating to [Flex UI 2.x.x](/docs/flex/developer/ui/migration-guide).
* Use the [Interactions API resource](/docs/flex/developer/conversations/interactions-api/interactions) to route and facilitate inbound and outbound SMS, WhatsApp, and Chat interactions.
* Manage addresses in the Console for all channels: [SMS](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses), [WhatsApp](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses), [Chat](/docs/flex/admin-guide/setup/conversations/manage-conversations-chat-addresses), and [Facebook Messenger](/docs/flex/admin-guide/setup/conversations/manage-conversations-fbmessenger-addresses).
