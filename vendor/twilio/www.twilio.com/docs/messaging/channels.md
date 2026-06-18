# Twilio Messaging Channels

Twilio supports sending and receiving messages through multiple messaging channel. To serve your various messaging needs these currently include:

* SMS
* MMS
* Rich Communication Services (RCS)
* WhatsApp
* Facebook Messenger

## Support in Twilio products

Messaging channels are supported in various Twilio products to enable your diverse use cases from one-directional communication to stateful conversations in both single channel and omni-channel settings.

These products allow you to work with messaging channels using no-code/low-code and fully programmable messaging solution approaches.

The following table indicates which messaging channels are supported by which Twilio products *(GA = Generally Available)*.

| **Twilio Product**                               | **SMS/MMS** | **WhatsApp** | **Facebook Messenger** | **RCS**       |
| ------------------------------------------------ | ----------- | ------------ | ---------------------- | ------------- |
| **[Programmable Messaging](/docs/messaging)**    | GA          | GA           | Public Beta            | GA            |
| **[Conversations](/docs/conversations-classic)** | GA          | GA           | Public Beta            | Not supported |
| **[Flex](/docs/flex)**                           | GA          | GA           | Public Beta            | Not supported |
| **[Verify](/docs/verify)**                       | GA          | GA           | Not supported          | GA            |

As you work towards a rich and consistent messaging user experience across these messaging channels, consider using the [Twilio Content Template Builder](/docs/content) as a framework for message template generation and management.

## Understand channel addresses

Working with messages in all these messaging channels requires identifying senders (`from`) and receivers (`to`) by means of channel-specific addresses. The following table explains the channel address conventions Twilio uses for each of the messaging channels.

Adhering to these conventions is critical when you create and handle messages with Twilio products such as the [Programmable Messaging REST API](/docs/messaging/api).

| **Channel**            | **Channel Address**                                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SMS/MMS**            | An SMS/MMS-capable phone number. *Format:* Phone number in [E.164 format](/docs/glossary/what-e164) *Example:* `+15558675310`                                                                                                |
| **RCS**                | An RCS Sender with a branded display name and profile shown to message recipients. *Format:* `rcs:{unique_id}` *Example*: `rcs:brand_name_n9c2bvqq_agent`                                                                    |
| **WhatsApp**           | A WhatsApp-enabled phone number prefixed by the channel name. *Format:* `whatsapp:{phone_number}` where `{phone_number}` is the phone number in [E.164 format](/docs/glossary/what-e164) *Example:* `whatsapp:+15558675310`  |
| **Facebook Messenger** | Your valid Facebook Page Id prefixed by the channel name, or a Messenger User Id prefixed by the channel name. *Format:* `messenger:{messenger_page_id}` or `messenger:{messenger_user_id}` *Example:* `messenger:XYZXYZXYZ` |

## Getting started with the Messaging Channels

### SMS/MMS

To get started using the SMS/MMS messaging channel follow a [Programmable Messaging Quickstart](/docs/messaging/quickstart) in the programming language of your choice.

### RCS

To get started using the RCS messaging channel, follow the [Programmable Messaging RCS Onboarding Guide](/docs/rcs/onboarding).

### WhatsApp

To start using the WhatsApp Business Platform messaging channel, [learn more about the onboarding process](/docs/whatsapp#whatsapp-sender-registration) or [get started now with the WhatsApp sandbox](/docs/whatsapp/sandbox).

### Facebook Messenger

To start using the Facebook Messenger messaging channel with your Twilio account, follow the information in the [Facebook Messenger](/docs/messaging/channels/facebook-messenger) page.
