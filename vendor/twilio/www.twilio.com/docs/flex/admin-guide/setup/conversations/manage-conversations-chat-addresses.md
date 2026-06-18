# Manage Conversations Chat Addresses

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

When you create a new Flex account, one default Chat Address is created out-of-the-box. Refer to the [Test a Chat Address](#test-a-chat-address-with-the-demo-app) section below for information on how to use it with the demo application.

At some point, you might need additional Chat Addresses to handle your traffic. For example, you might be running multiple websites, or might be rendering your website in multiple languages and might want to route conversations differently per language.

In this case, we recommend creating a separate Chat Address for each use case.

## Create a Chat Address via Flex Console

You can create Chat Addresses via Flex Console > Manage > [Messaging](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations):

1. Click **+ Create new Address** from the **Conversations Addresses** tab.
2. Select **Chat** as the Address type.
3. You can optionally enter a friendly name.
4. Configure the integration to Flex - either by using **Studio** or **Webhook**. The most common configuration is to integrate a Chat Address to Flex using a Studio Flow. Unless you have removed or reconfigured it, you should be good to use the out-of-box Studio Flow "**Chat Flow**." To learn more about configuring Studio Flows, see [Configure pre-agent workflow with Studio.](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio)

   ![Form to create a new chat address with fields for address type, friendly name, integration type, and studio flow.](https://docs-resources.prod.twilio.com/c8ab09ebecc751359a5e7cddb8a03980cb7f654d76c761d1240487d108584ec7.png)
5. Click **Submit** to save your new Flex Chat Address.

You can edit or delete Chat Addresses at any point using the Flex Console.

## Test a Chat Address with the demo app

The quickest way to test your Chat Address is by using [Webchat 3.x.x](/docs/flex/developer/conversations/webchat). You can try out webchat without building or deploying anything.

In Console, navigate to **Flex** > **Channel management** > **Webchat**. If you already have a deployment key, click **Launch Demo** to start a webchat. If you don't have a deployment key yet, [create one](/docs/flex/developer/conversations/webchat/setup), then click **Launch Demo**. Your chat appears in Flex UI as an [incoming chat task](/docs/flex/end-user-guide/conversations/use-chat-and-messaging). You can send and view messages as the agent and the customer to see how it works.
