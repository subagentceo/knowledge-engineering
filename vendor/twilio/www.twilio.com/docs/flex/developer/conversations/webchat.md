# Webchat 3.x.x overview

## Overview

Flex Webchat is a chat widget that you can embed on your website. The widget helps your customers chat with an agent without leaving your webpage. Flex Webchat is natively integrated with Flex UI, built on Flex Conversations, and hosted by Twilio.

[To set up Webchat 3.x.x](/docs/flex/developer/conversations/webchat/setup), you create a deployment key, connect it to a messaging address, and then copy the Flex-generated embed code to your website. Webchat 3.x.x also includes [enhanced security](/docs/flex/developer/conversations/webchat/security).

Webchat 3.x.x is available on Flex UI 2.0.x and later.

When an incoming message is sent to the chat channel, it triggers the Flex integration that's set for the chat address on the **Flex** > [**Messaging**](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations) page. By default, this is the Chat Flow in [Studio](/docs/studio), which you can customize in [Twilio Console](https://www.twilio.com/console/studio/flows).

## Demo webchat

You can try out webchat without building or deploying anything. In Console, navigate to **Flex** > **Channel management** > **Webchat**. If you already have a deployment key, click **Launch Demo** to start a webchat. If you don't have a deployment key yet, [create one](/docs/flex/developer/conversations/webchat/setup), then click **Launch Demo**. Your chat appears in Flex UI as an [incoming chat task](/docs/flex/end-user-guide/conversations/use-chat-and-messaging). You can send and view messages as the agent and the customer to see how it works.

## What about other Flex webchat versions?

If you are starting out with webchat, begin with Webchat 3.x.x. It's an out-of-the-box solution that meets standard webchat needs for most customers.

Previously, Flex released two other webchat versions for Flex:

* The [Webchat React app](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app) is an open-source project that provides an example of how to build, integrate, and use webchat. If Webchat 3.x.x's out-of-the-box functionality doesn't fully meet your requirements and you need extensive customization, consider building with the Webchat React app.
* [WebChat 2.0](/docs/flex/developer/messaging/webchat) is no longer supported. Don't use it for new webchat implementations. If you're already using Webchat 2.0, [migrate to the latest version of Webchat 3.x.x](/docs/flex/developer/conversations/webchat/migrate).
