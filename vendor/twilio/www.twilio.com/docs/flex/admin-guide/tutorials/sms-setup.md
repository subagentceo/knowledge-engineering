# Manage legacy SMS addresses

> \[!NOTE]
>
> This guide is for Flex UI 1.x.x and channels that use Programmable Chat and Proxy. Programmable Chat for Flex will reach end of life on June 1, 2026. If you're new to Flex or currently using Programmable Chat, [build with Flex Conversations](/docs/flex/conversations) or [migrate](/docs/flex/developer/conversations/programmable-chat-to-flex-conversations).

The simplest (and the default) way to route incoming SMS messages for a Phone Number into Flex is to:

* Map the Phone Number using an Address (aka a Flex Flow)
* Point the Phone Number to a Flex Proxy Service (happens implicitly if you use Flex Console to create the Address)
* Set the Flex integration on the Address to use a Studio Flow
* Make sure the Studio Flow invokes the Send to Flex widget

Follow these steps to set up a new SMS Address with the aforementioned configuration on the Flex Console.

## Buy a Phone Number

If you haven't purchased an SMS-enabled Phone Number yet, refer to [Purchase a new Twilio Phone Number](/docs/flex/admin-guide/tutorials/voice-setup).

## Create an SMS Address (Flex Flow) for your Phone Number

Flex uses Addresses (aka Flex Flows) to describe how new conversations are handled to connect them to Flex.

To create an Address for your new Phone Number:

1. Navigate to **Flex** > [**Messaging**](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations). Select the **SMS Numbers** tab. Alternatively, you can click "**+ Create new Address**" on the **Addresses** tab, and search for your Phone Number on the "Create Address" form.

   ![SMS Numbers tab showing phone number list with search and buy options.](https://docs-resources.prod.twilio.com/0a8cea17a2d82f186098d6283a09a03715c26c10393d22563aeabdf4dd00b886.png)
2. Search for and select your unregistered Phone Number. Previously configured Phone Numbers will have an "Address created" indicator.
3. You can optionally enter a friendly name.
4. Configure the integration to Flex - either by using **Studio**, **Webhook**, or **Task**. The most common configuration is to integrate a Phone Number to Flex using a Studio Flow. Unless you have removed or reconfigured it, you should be good to use the default "Messaging Flow" that came with your Flex account. To learn more about configuring Studio Flows, see [Configure pre-agent workflow with Studio.](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio)
5. Click Submit to save your new Flex SMS Address.

You can create, edit or delete Flex SMS Addresses at any point using the Flex Console.

## Test an SMS Address

Text the phone number that you purchased. Follow the steps in [Respond to SMS](/docs/flex/admin-guide/setup/messaging/test-channels#respond-to-sms-in-flex) to review the incoming SMS task on your Flex instance.

## Under the hood: Proxy Service

![Flowchart of inbound message process from customer to agent using Twilio services.](https://docs-resources.prod.twilio.com/5757d1d55df5c1b566ed672694cb313195e10ef97548b6639f6689f754bf895d.png)

Under the hood, Flex uses [Twilio Proxy](/docs/proxy) to send the messages back-and-forth between the end-customer and the agent. For this to work, the messaging handler for your Phone Number needs to be set to **Flex Proxy Service**. The Flex Proxy Service uses the Flex Flows configuration to route inbound messages into Flex.

![Messaging configuration with options for Webhook, TwiML Bin, Function, Studio Flow, and Proxy Service.](https://docs-resources.prod.twilio.com/0f21f667be7866062014af43e195d23e194ca6a6ddef22ee4ca9e2c7cd6f7aac.png)

If you use Flex Console to create an SMS Address (Flex Flow), the Phone Number Handler should be set to Proxy automatically when you create the Address. You can review and reconfigure at any time by finding your Phone Number under **Phone Numbers > Manage > Active Numbers**. For example, you need to configure this step manually if you use the Flex Flow API for creating Addresses, instead of the Flex Console.
