# Core concepts: Conversations

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

## Overview

Flex Conversations requires Flex UI 2.x.x and supports async channels including:

* SMS/MMS
* WhatsApp
* Chat
* Facebook Messenger (public beta)

It uses [Twilio Conversations](/docs/conversations-classic) and the [Interactions API](/docs/flex/developer/conversations/interactions-api) for managing inbound and outbound communication on your contact center. The following diagram illustrates how the various Twilio products connect together to make Flex Conversations possible.

![Diagram showing conversations with participants, messages, and media.](https://docs-resources.prod.twilio.com/ee8ce836942011133fdaf1c5a3ebafe92eb5150df05007b1e9fda63151b19beb.png)

## Twilio Conversations and Messaging services

Flex uses [Twilio Conversations](/docs/conversations-classic/api/conversation-resource) for all digital channels and provides the unique threads in which messages are exchanged between agents and customers. Each Conversation includes a list of current Participants and the Messages that they have sent to each other.

[Messaging services](/docs/messaging/services) serve as a higher-level "bundling" of messaging functionality around a common set of senders, features, and configuration. The same settings and feature configuration apply to all of the senders (long code numbers, short codes, toll-free numbers, [A2P 10DLC](/docs/flex/admin-guide/setup/conversations/a2p-10dlc), and more) in the Messaging service's pool.

You can manage your Messaging services directly through the [Console](https://www.twilio.com/console/sms/services) or through the [REST API](/docs/messaging/api/service-resource).

## Conversations address

A [Conversations address](/docs/conversations-classic/api/address-configuration-resource) is a configuration for your Flex SMS or WhatsApp number or Facebook Messenger sender. The address informs the Conversations service to auto-create a new conversation for messages that don't belong to an existing conversation. You can configure your address to point to a Studio Flow or a webhook on your application for sending. Once a conversation is created, all new messages from the same source to the same destination are routed to the newly created conversation.

For more information on handling inbound messages and enabling auto-creation for Conversations, see [Inbound Message Handling & Autocreation](/docs/conversations-classic/inbound-autocreation).

## Interactions API

The [Interactions API](/docs/flex/developer/conversations/interactions-api) allows you to manage the communication between end customers and businesses. It provides the primitives to connect and orchestrate adding and removing participants in a given channel and uses [Twilio TaskRouter](/docs/taskrouter) for all contact center routing capabilities.

![Diagram showing relationships between interaction, task, channel, and conversation objects.](https://docs-resources.prod.twilio.com/6b2d5cf7820507bfa3480c3370e77fe5833b952aee1cd6ce0a714d87a1460140.png)

*Interactions Object Model*

### Interaction channels

An [interaction channel](/docs/flex/developer/conversations/interactions-api/interactions) gives you the ability to associate multiple tasks with the same Conversation. With this model, you can build workflows which allow the conversation to stay open beyond the lifetime of a task. This facilitates use cases like transfer and preserving conversation history across tasks.

## Chat

[Webchat 3.x.x](/docs/flex/developer/conversations/webchat) is built on Flex Conversations and provides a templated, secure way to add a webchat widget to your website.

Flex Conversations also supports Chat applications built on top of Twilio Conversations, including mobile in-app chat. With custom chat, you can provide authenticated access to your users or build an anonymous webchat to embed into your website.

### Chat encryption

Twilio takes data security seriously. All customer assets—including text, media, and most metadata—are encrypted at rest. We also encrypt all data at the volume level.

Twilio's servers and Flex communicate using secure [WebSockets](/docs/glossary/what-are-websockets). The Flex agent desktop connections are authenticated using the same [JWT token security](/docs/iam/access-tokens) as the rest of Flex, meaning they are governed by the same single sign-on (SSO).

## Additional resources

To learn more about Conversations in Flex, check out the following topics:

* [Flex Conversations FAQ and Troubleshooting](/docs/flex/developer/conversations/faq-and-troubleshooting)
* [Manage Conversations SMS Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses)
* [Manage Conversations WhatsApp Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses)
* [Manage Conversations Chat Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-chat-addresses)
* [Manage Conversations Facebook Messenger Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-fbmessenger-addresses)
