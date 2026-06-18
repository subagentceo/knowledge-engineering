# Configure with a Messaging Service (advanced)

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

Note that this is an advanced configuration and is **fully optional**. It is not required if you already performed the initial configuration.

If you don't have a specific use case for a Messaging Service, **we recommend omitting it**. If you do configure your phone numbers *with* a Messaging Service, then you need to also configure the following settings.

## Set the default Conversation Service

For accounts created on or after December 2021, this will be configured correctly out of the box. Also, the Conversations prerequisites UI in the Flex Console will prompt you to fix this before you can create your first Conversations Addresses.

To make sure your default Conversation Service is set correctly, navigate to **Conversations > Manage > [Defaults](https://www.twilio.com/console/conversations/configuration/defaults)**. If one of the options on the Default Conversation Service dropdown is **Flex Chat Service** or **Flex Conversation Service**, select that.

![Default Conversation Service set to Flex Chat Service with view service option.](https://docs-resources.prod.twilio.com/b1f842bec6cbf17f088853771c467dcc9295649aea419ff4ec93ce7e57a5edf6.png)

## Enable "Handle inbound Messages with Conversations"

For accounts created on or after December 2021, this will be configured correctly out of the box.

Same as the previous step, under **Conversations > Manage > [Defaults](https://www.twilio.com/console/conversations/configuration/defaults)**, toggle "Handle Inbound Messages with Conversations" (if it is not already enabled). This will unhide some Console functionality.

![Twilio console showing messaging features and default messaging integration settings.](https://docs-resources.prod.twilio.com/d2610b370ce172dc98691e2d40441f9a10474dc97e256e31a50912373820ad8e.png)

## Configure the Incoming Messages setting

The configured number for Flex needs to be on the Messaging Service's sender pool. This is automatically handled when you set the Messaging Service under your phone number's settings. You can find the documentation on sender pools [here](/docs/messaging/services#send-a-message-with-a-messaging-service).

Go to **Messaging > Services > Default Conversations Service > Integration**. Under **Incoming Messages**, choose **"Autocreate a Conversation"** as the way to handle inbound messages.

![Integration settings with 'Autocreate a Conversation' option selected for incoming messages.](https://docs-resources.prod.twilio.com/fe6742ea46b56d3fcf996afc1571a520dd60d56d5668300cec79d6ba9af92091.png)

## Configure an SMS number with your Messaging Service

Under **Phone Numbers > Manage > [Active numbers](https://www.twilio.com/console/phone-numbers/incoming)**, find the number you wish to configure and open it. Configure that number to use your Default Conversations Service.

![Messaging service setup with default conversations and webhook handlers.](https://docs-resources.prod.twilio.com/fc12fc6330fa1e80745590e3e59f74530a69484fd16609b00a6c5bc18a4aad2b.png)

The *"A message comes in"* handler will not be triggered if you configured the Incoming Messages handler on Messaging Service as instructed above.

## Configure a WhatsApp number with Messaging Service

For WhatsApp Sandbox, please refer to [Manage Conversations WhatsApp Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses#configuring-whatsapp-sandbox) page.

Navigate to **Messaging > Senders > [WhatsApp senders](https://www.twilio.com/console/sms/whatsapp/senders)**. Open the WhatsApp number, set the Messaging Service to your default Messaging Service.

![WhatsApp number approved, configure endpoint with messaging service or webhooks.](https://docs-resources.prod.twilio.com/ddfe64a25df431217b4b7b19e7531e3192714aeeda0c9492d2d23a481137e23a.png)
