# Prepare your Flex account for email

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## Configure Conversations for email

Before you can use Email in Flex, you must configure Conversations to use Flex as a default Conversations service:

1. From the Twilio Console, navigate to **Conversations > Manage > Defaults**.
2. From the **Default Conversation Service list**, select **Flex Conversation Service (ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)**.
3. Under **Messaging Features**, enable or unlock **Handle Inbound Messages with Conversations**.
4. Click **Save**.

   ![Twilio Conversational Messaging settings with options for default messaging and conversation services.](https://docs-resources.prod.twilio.com/dfd3a8eef89120987832b278fcf1082e292cf30cae68a902c711afa79caaec3b.png)

## Add the Email task channel

From the Console, under **Channels**, check whether you have a channel called **Email**. (Flex accounts that were created more recently include this channel by default.)

If so, skip to the next section.

If not, you must add an **Email** channel to ensure that email tasks are routed properly:

1. From the Twilio Console, navigate to **TaskRouter** > **Workspaces.**
2. Click the name of your Flex workspace.
3. On the sidebar, click **Task Channels**.
4. Click **Create New Channel**.
5. In the **Channel Name** box, type **Email** and then click **Create.**

> \[!NOTE]
>
> It's important to use this exact channel name to ensure that tasks appear as Email to agents in the Flex UI.

[\< Email index page](/docs/flex/email)
