# Core concepts: Chat and Messaging

> \[!NOTE]
>
> This guide is for Flex UI 1.x.x and channels that use Programmable Chat and Proxy. Programmable Chat for Flex will reach end of life on June 1, 2026. If you're new to Flex or currently using Programmable Chat, [build with Flex Conversations](/docs/flex/conversations) or [migrate](/docs/flex/developer/conversations/programmable-chat-to-flex-conversations).

## Overview

Twilio Flex includes messaging capabilities that allow your contact center agents to chat with customers using:

* SMS
* A chat widget on your website
* Digital messaging channels

Flex currently supports **inbound messaging**, which is initiated by a customer. You can initiate messaging conversations as they arrive or append incoming messages to existing conversations, [depending on your Chat channel configuration](/docs/flex/developer/messaging/chat-channel).

[Learn more about messaging in Flex](/docs/flex/developer/messaging).

## Chat channels

Flex stores and manages all messaging interactions in Chat channels. Flex creates Chat channels as private by default. Messages are sent, received, and archived for later viewing by offline clients in the Chat channels.

By default, Flex ships with `sms` and `web` channels integrated with Studio. To enable additional messaging flows in Flex, you can [programmatically create Chat channels](/docs/flex/developer/messaging/chat-channel) (such as Facebook or WhatsApp).

## Flex flows

A **Flex flow** is the logic linking a messaging channel to Flex. It also describes how Flex handles messages on a particular channel. You can configure a Flex flow using [Twilio Console](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations) or the [REST API](/docs/flex/developer/messaging/flow).

To learn more about different integration types and managing messaging channels, see [Managing Flex Flows](/docs/flex/developer/messaging/manage-flows).

To preserve a customer's message history between multiple interactions (even if the subsequent interactions are handled by different agents), you can set up [long-lived channels](/docs/flex/developer/messaging/manage-flows#long-lived-channels).

Use the [Channel Janitor](/docs/flex/developer/messaging/manage-flows#channel-janitor) to clean up inactive chat channels. This ensures new messages from customers don't get lost by being routed to inactive channels. Channel Janitor is enabled for Flex flows by default, and we recommend you leave it on.

## Webchat widget

Flex Webchat is a natively integrated chat widget that you can embed on your website. The widget helps your customers chat with an agent without having to leave your website.

After deploying your Flex instance, you can test the [chat widget](/docs/flex/developer/messaging/webchat/setup) that comes out-of-the-box and is integrated with Studio by default (using the **Webchat Flow**). You can launch the demo chat widget from the Admin panel of Flex UI and test your agents' default interaction experience.

![Test Drive panel with call or text number and webchat launch button.](https://docs-resources.prod.twilio.com/24a3f1446e94e3932ca467d041f15545928f847a2482bd71fb7799d0bd0aea7b.png)

Webchat widget is fully customizable with code. To learn more about customization, refer to the [Webchat developer documentation](/docs/flex/developer/messaging/webchat/setup).

### Chat encryption

Twilio takes data security seriously. All customer assets—including text, media, and most metadata—are encrypted at rest. We also encrypt all data at the volume level.

Twilio's servers and Flex, including the customer Webchat widget, communicate using secure [WebSockets](/docs/glossary/what-are-websockets). These connections are authenticated using the same [JWT token security](/docs/iam/access-tokens) as the rest of Flex, meaning they are governed by the same single sign-on (SSO).

For guidance on frequently asked questions, see [Flex Messaging FAQ and Troubleshooting](/docs/flex/developer/messaging/faq-and-troubleshooting).
