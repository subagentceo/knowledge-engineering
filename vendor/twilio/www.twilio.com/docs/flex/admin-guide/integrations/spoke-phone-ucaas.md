# Integrate Flex with Spoke Phone (UCaaS)

Spoke Phone is a Unified Communications (UC) / Private Branch Exchange (PBX) built on Twilio and fully integrated into Flex. Spoke Phone is deployed into your Twilio project and can be used by a single team (for example Sales), or to completely replace an existing PBX.

Spoke Phone provides native apps for iOS, Android, Windows and Mac computers, and out-of-the-box integrations with Flex, Salesforce, Microsoft Dynamics, Hubspot, and other key business systems.

![A woman using a phone with Spoke Phone app interface showing call options.](https://docs-resources.prod.twilio.com/37e9025bc858a83ad93ee15d58f1f9b40029fcb07ee286a3202b722b924de232.png)

## Use Cases for integration

* **Unified customer experiences**\
  A Flex customer wants to provide a seamless customer experience across the front office agents (using Flex) and the back office teams (not using Flex), and vice versa.
* **UC/PBX for Twilio Flex**\
  A Flex customer wants to move their back-office UC/PBX to the cloud as part of implementing Twilio Flex.
* **A 360-degree customer view for every employee**\
  A Flex customer wants to share the rich customer view with every employee on any device.
* **Business Continuity Planning (BCP) for Flex**\
  A Flex customer is concerned about agent access to Flex via the browser during a crisis and wants a mobile phone/app option for BCP.

## Features

As part of the integration, Spoke Phone allows the following features within Flex:

* **Spoke Phone directory plugin**: a Flex plugin that lists the Spoke Phone PBX users and call queues in the Flex environment. It displays the Spoke user/queue presence/availability, and allows for call transfers out of Flex to back-office users or call queues on the Spoke Phone platform.

  ![Spoke tab showing contact availability and call options in transfer menu.](https://docs-resources.prod.twilio.com/0465164c96fa5997638395d6b8267b49f846c37e5a5bab2ec93131ada8a39f28.png)
* **Transfer Flex calls to Spoke PBX:** allows a Flex Agent to transfer a call from Flex to a Spoke Phone user or call queue.

  * **Blind transfer**: Sends the caller over to the Spoke PBX user or call queue and releases the Flex Agent immediately.
  * **Consult transfer**: Allows the Flex Agent to place the caller on hold, call and talk privately with a Spoke Phone PBX user in the back-office before connecting the parties.

    * The Flex agent can choose to stay on the call (making it a 3-way call) or leave the call.
* **Transfer Spoke calls to Flex**: Allows a Spoke Phone PBX user to transfer a back-office call to a Flex call queue.

  * **Blind transfer**: Sends the caller over to the Flex queue and releases the Spoke user immediately.
  * **Consult transfer**: Allows the Spoke Phone PBX user to place the caller on hold, call into the Flex queue and talk privately with a Flex Agent before connecting the parties.

    * The Spoke Phone PBX user can choose to stay on the call (making it a 3-way call) or leave the call.

      ![Call transfer options for Customer Support team with choices to transfer, announce then transfer, or send to voicemail.](https://docs-resources.prod.twilio.com/fd7a0bf441581c60a35cdcd70c271a11738f03c58da6ca205633fe3d0e50092a.png)

## Video overview

https://www.youtube.com/watch?v=vA-jlYvCj7c

## Mapped architecture diagram

![Twilio and Spoke Phone integration architecture showing APIs, services, and data flow between components.](https://docs-resources.prod.twilio.com/3317417ac7f7e9ffb16c35b02e541dfcf7ea70aad1319373e07d2da078e5a999.png)

**Architecture Components:**

1. **Spoke Directory Plugin.** Flex plugin requires installation into the customer account. Adds a tab to the WorkerDirectory to display Spoke directory entities (including presence/availability) and allows transfer/consult to Users, Queues, or SIP Devices in the Spoke Directory
2. **Spoke Plugin Functions.** Twilio Serverless functions that provide backend functionality to support the Spoke Directory Plugin.
3. **Voice TwiML/REST API**. Used by both Spoke Plugin Functions and Spoke Telephony API. Provides call control and conference management for all calls.
4. **Agent Conference.** All Spoke calls use Agent Conference to enable multi-party calls including cold/warm transfer, conference, etc.
5. **Directory API.** Provides a single unified view of Directory Entries for the customer's Spoke Account.
6. **Authentication Service.** Provides an API access token given Client ID and Secret.
7. **Telephony API.** Listens to Twilio Voice Webhooks and controls calls using TwiML responses and Twilio REST API. Implements various Spoke call flows including Direct Dial, Group Offer, IVR functionality, etc.
8. ***\[Optional]* Integration Middleware.** Integrates the customer's CRM with Spoke's Phonebook and provides call logging of Spoke calls back into the customer CRM/other cloud platforms.
9. **Spoke Client (iOS, Android, Mac, Windows).** End-User call and message handling apps for Spoke PBX end users. The mobile client uses the Voice mobile SDKs (iOS and Android). The desktop client uses the Voice JavaScript SDK. SMS and Chat via Twilio Conversations API.
10. **Twilio SIP.** The Spoke PBX leverages Twilio SIP Domains, Trunks, and Registrar to support directory registered SIP Devices, and integration to customer PBXs and third-party SIP Providers.

## Implementation guide

A complete implementation guide with step-by-step instructions, links to relevant Twilio documentation, and a verification test plan will be provided when you become a customer.

More information about Spoke Phone's Twilio Flex integration can be found [here](https://support.spokephone.com/hc/en-us/sections/360012671431-Twilio-Flex).

> \[!NOTE]
>
> Spoke provides a free service to perform the complete deployment and validation on your behalf. To book in a deployment, email [twilio@spokephone.com](mailto:twilio@spokephone.com).

## Next steps

To learn more, find out how to get started, or request a deployment of Spoke Phone into your Flex Project, please email [twilio@spokephone.com](mailto:Twilio@spokephone.com), or call Spoke Phone Sales at +1 (650) 822-1060.
