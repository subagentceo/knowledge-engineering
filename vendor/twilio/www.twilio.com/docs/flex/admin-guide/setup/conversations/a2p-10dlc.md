# Send Application-to-Person SMS in the US

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

If your contact center is sending SMS traffic in the United States, you're likely sending [Application to Person SMS](/docs/glossary/what-a2p-sms-application-person-messaging). As your contact center goes into production and scales its outbound traffic, you might notice that carriers are filtering some of your messages as potential spam. When your contact center gets to this point - or if you plan to send a high volume of outbound messages - it means that you'll need to:

1. Register your SMS traffic with US carriers and
2. Configure your contact center's messaging orchestration to use that registration.

This helps show that your messaging traffic is relevant to your customers and prevents it from being filtered by the US carrier network.

Carrier filtering is more of an art than a science. Work with your Twilio team to discuss your traffic and come up with a strategy for scaling your traffic. If you're just testing your contact center, however, you shouldn't have any issues. Feel free to return to this document when you're in production!

## Key Concepts for A2P 10DLC in Flex

**Phone Numbers/10DLC:** A phone number in the US is also sometimes called a 10 digit long code (10DLC). If you plan to send traffic to your customers in the US, you'll need to register that Application to Person (A2P) traffic with the US Carriers.

**Messaging Services:** A [messaging service](/docs/messaging/services) is a software layer for Programmable SMS that contains a link to your A2P registration. It contains a pool of phone numbers that will all behave according to the messaging service's configuration.

**Flex Conversations:** [Flex Conversations](/docs/flex/developer/conversations) provides the orchestration layer for managing and processing customer-initiated (commonly referred to as inbound flows) and business-initiated (commonly referred to as outbound flows) interactions.

## Register for an Application to Person use case

Your first step will be to register for an A2P use case. You can learn more about how to register and what you'll need for registration in the [Direct Brand Onboarding documentation](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding).

With Flex Conversations, you do not need to create a separate Messaging Service. You can just add your A2P senders to the **Default Messaging Service for Conversations**.

### Create a Messaging Service via the Console

If you wish to create a separate message service for your A2P traffic, you'll need to follow these steps:

1. Navigate to the [Messaging Services](https://console.twilio.com/us1/develop/sms/services?frameUrl=/console/sms/services) section of the Twilio Console to create a new messaging service.
2. In Step 1, choose a Friendly Name and an appropriate use case.
3. Add in any phone numbers that you want to use for messaging. This could be one phone number or many.
4. Set your integration to Autocreate a Conversation - this means that your phone number will use the Flex Chat Service (Default Conversations Service) instead of using any of the messaging service logic. This step is the most important!

   ![Messaging Service setup with integration options like autocreate conversation and webhook settings.](https://docs-resources.prod.twilio.com/76da8bd79229f5dc45b124a703381b69ff80e65cae3d94d4921f487dbdd33b78.png)

> \[!NOTE]
>
> If Autocreate a Conversation is grayed out, click on "Configure Conversations" to unlock **Handle Inbound Messages with Conversations**. Click **Save** to save your changes.

5. Finally, complete the [business registration steps for A2P](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding) (Business Profile, US A2P Brand, and Campaign Use Case).
6. Click **Complete Messaging Service Setup** to finish setting up your new Messaging Service.

## Associate your A2P Phone Numbers with Flex Conversations

**[Flex Conversations](/docs/flex/conversations)** provides the orchestration layer for managing inbound and outbound interactions on your contact center. To start using Flex Conversations, ensure your A2P phone numbers have registered [Conversations SMS addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses).

## Testing

To test Flex Conversations using your newly configured Messaging Service, see [Receive Inbound Messages from SMS and WhatsApp](/docs/flex/developer/conversations/receive-inbound-messages-from-sms-and-whatsapp) and [Send Outbound Messages via SMS and WhatsApp](/docs/flex/developer/conversations/send-outbound-messages-via-sms-and-whatsapp).

## Next Steps

* Check out the [A2P 10DLC support article](https://help.twilio.com/hc/en-us/articles/1260800720410-What-is-A2P-10DLC-) for further information about A2P 10DLC, Application-to-Person messaging, and additional steps you may need to take to allow your SMS traffic in the US
* Are you looking to register your customers' numbers for A2P traffic? Learn [more about A2P 10DLC for ISVs](/docs/messaging/compliance/a2p-10dlc/onboarding-isv)
* If you're using Twilio Flex 1.x.x, refer to [Using Proxy with Flex A2P SMS](/docs/proxy/flex-a2p-10dlc)
