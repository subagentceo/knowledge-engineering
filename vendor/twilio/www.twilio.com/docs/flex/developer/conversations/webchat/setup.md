# Set up and use Webchat 3.x.x

To set up Webchat 3.x.x, you need to create a deployment key, link the deployment key to a chat address, and add the Flex-generated embed code to your website. This page provides detailed instructions.

You can have up to 10 deployment keys for different use cases. For example, if you have multiple brands with different domains, you can have a separate webchat widget for each brand.

## Before you begin

Before setting up or updating Webchat, review the following considerations:

* If you are updating to Webchat 3.2.0 or later from Webchat 3.0.x or 3.1.x, you must [contact our support team](https://help.twilio.com/) when you're done with the update to finish setting up the latest security changes. Because the changes would otherwise be a breaking change, only our Twilio support team can enable them for you to ensure that Webchat continues working smoothly.
* If you are using Flex UI 2.9.x or earlier, agents won't see a notification when the customer has left the chat. We recommend updating to Flex UI 2.10.x or later.
* If you are updating from Webchat 3.0.x to Webchat 3.1.x or later, you must ensure there are no conflicts with the new end chat functionality. Beginning in Webchat 3.1.0, customers can end a chat themselves. Previously, only an agent could end the chat. If you previously implemented a Webchat 3.0.x customization to enable customers to end the chat, you must check for conflicts between your customization and the Webchat 3.1.0 feature. If you find any conflicts, you must resolve them before updating to the later Webchat version.
* If you're using Webchat 3.x.x with [Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles/):
  * You must [configure Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles/setup) and your Segment space before following these steps.
  * You'll need to update your Webchat flow in Studio using the instructions in [Step 3: Update the Webchat flow in Studio](#step-3-update-the-webchat-flow-in-studio-unified-profiles-only).

## Set up a new webchat widget

Use the following steps to set up Webchat 3.x.x:

### Step 1: Create a deployment key

In some environments, one deployment key is already set up for you and connected to a messaging address. If your environment includes a default deployment key and you'd like to use it, skip to [Step 4: Test your webchat flow](#step-4-test-your-webchat-flow).

Otherwise, complete the following steps to create a deployment key:

1. In Console, navigate to **Flex** > **Channel management** > **Webchat**.
2. Click **Create Deployment Key**.
3. Enter the following information:

   * **Friendly name**: The name you want to use for this deployment key. If you leave this field blank, the name will match the deployment key SID.
   * **Allowed origins**: Enter up to 10 trusted URLs where your users can start a chat. Chat sessions are only accepted from these URLs. You must include the protocol and host, and can optionally include a port. The default value is `https://demo.flex.twilio.com`, which enables you to use Webchat 3.x.x in the Flex demo environment.
   * **Fingerprint sensitivity**: We recommend leaving the **IP address** checkbox selected to use this option and make your webchat widget more secure.
4. Click **Create Deployment Key**.\
   You are returned to the **Webchat** page. Your new deployment key appears in the **Deployment Keys** list.

### Step 2: Connect your deployment key to a messaging address

1. Navigate to **Flex** > **Channel management** > **Messaging**.
2. Click **Create new address**.
3. Enter the following information:

   * **Address type**: **Chat**
   * **Address implementation**: **Conversations**
   * **Deployment key SID**: Click the field to see a list of deployment keys. Select the deployment key that you created.
   * **Address friendly name**: Optionally, enter a name that you want to use for this address.
   * **Integration type**: **Studio** or **Webhook**. The most common configuration is to integrate a chat address to Flex using a Studio Flow.
   * **Studio Flow**: Select the flow that you want to use for chat. Unless you have removed or reconfigured it, the out-of-box Studio Flow **Chat Flow** is a good option.
4. Click **Create Address**.

### Step 3: Update the Webchat flow in Studio (Unified Profiles only)

You can personalize conversations with customer profile data by using Webchat with Unified Profiles. To use Webchat with Unified Profiles, you must update the Studio flow that you used in step 2 to include the **Search for a profile** widget.

![Unified Profiles Webchat flow showing triggers and message handling paths.](https://docs-resources.prod.twilio.com/0ed56f9dcc7daf5c89354a29c5c999d5527fe604bf7a558b1a7fb300b412ca7a.png)

1. In Console, navigate to **Studio** > **Flows** > **Chat Flow**.
2. Add the **Search for a profile** widget to the flow.
3. Connect the **Search for a profile** widget to the **Incoming Conversation** trigger.
4. Connect the **Profile found**, **No Profile Found**, and **Failed** transitions to **SendConversationToAgent** (or the next step in your Studio flow, if it has other customizations).
5. Select the **Search for a profile** widget and update its settings:
   1. From the **Connection** list, select your Segment connection.
   2. From the **Identifier** list, select **Email Address**.
   3. Replace the existing **Search** value with `{{trigger.conversation.ChannelAttributes.pre_engagement_data.email}}`.
   4. Click **Save**.
   5. Click **Publish**.

### Step 4: Test your webchat flow

1. Navigate to **Flex** > **Channel management** > **Webchat**.
2. In the row for your deployment key, click **Launch Demo**. A new tab opens with a webchat widget.
3. Enter a name, email address, and webchat message, then click **Start chat**. <br /> If you're using Webchat with Unified Profiles, use an `email` identifier that has a linked customer profile in your Segment space.
4. From Flex UI, ensure your status is set to **Available**, then go to the tasks list to verify and accept the chat task. <br /> If testing with Unified Profiles, verify that the customer profile associated with the `email` identifier was found and appears.
5. Reply as the agent, then return to your demo tab and verify that you see the response in the chat.

### Step 5: Embed the webchat widget on your website

1. In the row for your new deployment key, click the edit icon.
2. On the **Edit Deployment Key** page, scroll down to the **Embed code** section.
3. Copy the embed code sections to the head and body of your website's index.html file. You may need to work with your website administrator to complete this task.

> \[!NOTE]
>
> If you are updating to Webchat 3.2.x from Webchat 3.0.x or 3.1.x, [contact our support team](https://help.twilio.com/) when you're done to finish updating your security settings.

## Customize webchat

You can customize the following for Webchat 3.x.x:

* [Pre-engagement form and context](/docs/flex/developer/conversations/webchat/pre-engagement-and-context): Gather user information (such as name and email) before the start of a chat, or collect context from the data you already have (such as a user's login name or HTTP referrer).
* [`theme.isLight`](https://assets.flex.twilio.com/docs/releases/flex-ui/2.5.0/overview/Config/): Control whether webchat uses light mode or dark mode.
* [`appStatus`](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/advanced/state-management/AppState/): Control whether the webchat widget is open by default.

## Chat attachments

By default, file attachments are enabled in Webchat 3.x.x. For details about attachments in Webchat 3.x.x, see [File Attachments and API Limits](/docs/flex/developer/conversations/limits).

You can restrict chat attachment file size and file types. For details, see "[How do I update my file attachment configuration for Flex Conversations?](/docs/flex/developer/conversations/faq-and-troubleshooting#how-do-i-update-my-file-attachment-configuration-for-flex-conversations)" in [Conversations FAQ and Troubleshooting](/docs/flex/developer/conversations/faq-and-troubleshooting).

## Change orchestration and messaging flows

Because Webchat 3.x.x is built on [Twilio Conversations](/docs/flex/conversations), you can change orchestration and messaging flows with the [Interactions API](/docs/flex/developer/conversations/interactions-api).

## Notify agents when customer has left the chat

If you are using Webchat 3.1.0 or later with Flex UI 2.10.0 or later, you have the option to display a message to agents to let them know when a customer has left the chat. This option is turned off by default. To turn it on, navigate to the Flex Feature Settings page and enable the Show message when customer leaves webchat feature.

## Update the deployment key for an existing webchat widget

After you create your deployment key, you can update its settings. From Twilio Console, navigate to **Flex** > **Channel management** > **Webchat** and click the edit icon for your deployment key.

If you need to update **Allowed origins** or **Fingerprint sensitivity**, you may want to do so outside of normal business hours. When you change these settings, any existing webchat conversations might be disconnected.

You cannot change the deployment key SID or address configuration SID. If you need to change these, see the steps to [replace the deployment key for an existing webchat widget](#replace-the-deployment-key-for-an-existing-webchat-widget).

## Replace the deployment key for an existing webchat widget

If your deployment key is compromised, complete the following steps:

1. Follow [steps 1-3](#step-1-create-a-deployment-key) above to set up a new webchat widget with a new deployment key and a new chat address. You cannot update an existing chat address with the new deployment key.
2. In [Step 5: Embed the webchat widget on your website](#step-5-embed-the-webchat-widget-on-your-website), delete your existing webchat embed code entries and replace them with the new embed code.
3. Delete the compromised deployment key and chat address.
