# Conversations FAQ and Troubleshooting

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

## Can I build my own Messaging Orchestration?

Flex Conversations is based on the single Twilio Conversations primitive, which reduces the complexity of building async channel workflows. You can configure addresses for your Flex Conversations channels, including SMS, WhatsApp, and others, which you can integrate with Studio or your own backend application.

To build your own messaging orchestration, continue to have the number or sender ID configured as a [Conversations address](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses). However, you **must not use** the Send To Flex widget or the Interactions API to route to Flex. You can use the TaskRouter API to create a customer task to route to Flex.

By default, Flex adds agents to Conversations tasks when they accept the task and removes them when the task is complete. To change this default behavior, see [WebChat Actions](/docs/flex/developer/messaging/webchat/actions#what-is-the-actions-framework). Unless you change this behavior, Flex UI attempts to add agents to your Conversations channels when they accept a task.

Flex may add features and functionality to support future Conversations use cases. These features may not work with your custom messaging orchestration solution, or your team may need to do additional development to make the features compatible with your custom solution.

If you don't configure Conversations addresses, remove the addresses. **Don't use** the Send to Flex widget.

Additionally, you need to override the "wrapup" and "complete" actions for your custom channels.

## How do I route to a specific agent?

Use [known agent routing](/docs/taskrouter/workflow-configuration/known-agent-routing) in your workflow to assign a task to a specific agent. You can also use the Interactions API to specify an [agent-initiated interaction](/docs/flex/developer/conversations/interactions-api/interactions#agent-initiated-outbound-interactions) as well as add a specific agent to an existing interaction.

## How do I auto-accept a task in the Flex UI?

You can auto-accept the task using the [Flex Actions Framework](/docs/flex/developer/ui/v1/actions), as shown in the following example:

```js
init(flex, manager) { 
  // Auto-accepts tasks
  manager.workerClient.on('reservationCreated', reservation => { 
    if (reservation.task.attributes.autoAnswer === 'true') {
      flex.Actions.invokeAction('AcceptTask', { sid: reservation.sid }); // Accept the task
      flex.Actions.invokeAction('SelectTask', { sid: reservation.sid }); // Select the task
    } 
  }); 
}
```

## Can I use custom Task Channels or Channel Types?

Yes. However, you must tell Flex UI that this Task has Messaging or Chat capabilities. For example:

```js
const myOwnChatChannel = flex.DefaultTaskChannels.createChatTaskChannel(
  "my-chat-channel",
  (task) => task.channelType === "custom"
);
flex.TaskChannels.register(myOwnChatChannel);
```

Or, using Task Channel name:

```js
const myOwnChatChannel = flex.DefaultTaskChannels.createChatTaskChannel(
  "my-chat-channel",
  (task) => task.taskChannelUniqueName === "custom1"
);
flex.TaskChannels.register(myOwnChatChannel);
```

## How do I update my file attachment configuration for Flex Conversations?

File attachments are enabled by default on your Flex account. If this isn't the case, update your account service configuration to add an entry in the `channel_configs` array.

### GET Flex Configuration

```bash
curl --location --request GET 'https://flex-api.twilio.com/v1/Configuration/' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  ...,
  "channel_configs": [
    ...,
    {
      address_type: "web",
      cbm_attachments: {
        enabled: false,
        number_of_attachments: 1,
        max_file_size: 16777216,
        max_total_file_size: 67108864,
        accepted_extensions: [...]
      }
    },
    ...,
  ]
}
```

### POST (Update) Flex Configuration and disable file attachments

For a list of address types and accepted file extensions, see [Channel Attachment Limits](/docs/flex/developer/conversations/limits). To disable file attachments for a channel, set `"enabled"` to `false` for that specific `channel_configs` entry. Make sure to specify your `account_sid` in your `POST` request.

```sh title="Update Flex file attachment configuration"
# !mark(23)
curl --location --request POST 'https://flex-api.twilio.com/v1/Configuration/' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
--header 'Content-Type: application/json' \
--data-raw '{
"account_sid":"ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "channel_configs":[
      {
         "cbm_attachments":{
            "max_file_size":16777216,
            "max_total_file_size":67108864,
            "accepted_extensions":[
               "jpg",
               "jpeg",
               "png",
               "amr",
               "mp3",
               "mp4",
               "pdf",
               "heic",
               "txt",
               "gif"
            ],
            "enabled":false,
            "number_of_attachments":1
         },
         "address_type":"web"
      },
      ...
   ]
}'
```

Note that the code sample has been clipped with `...` for brevity.

## How do I troubleshoot my messaging setup?

Using the example of testing an inbound SMS message flow that Twilio Studio handles, here are some questions you might ask:

**Did Twilio receive the incoming message?**

1. Check that the message arrived at Twilio by checking your Programmable Messaging logs in the Console under [**Monitor > Logs> Messaging**](https://console.twilio.com/us1/monitor/logs/sms?frameUrl=%2Fconsole%2Fsms%2Flogs%3Fx-target-region%3Dus1\&currentFrameUrl=%2Fconsole%2Fsms%2Flogs%3F__override_layout__%3Dembed%26bifrost%3Dtrue%26x-target-region%3Dus1).
2. If you don't see the message here, it means that the message hasn't yet arrived at Twilio. If the incoming message is present, click the date and verify that it was handled by the right messaging service.
3. If you don't see your message in the logs, something prevented your number from receiving the message. Consider filing a support ticket and contacting your account executive.
4. Double check that you set your Messaging Service to perform auto-create as per the setup instructions.
5. You can enable live debugging on the Twilio Function, which may give some hints if it's failing here.
6. For the Flex UI, open the browser console to check for errors. You can also see our [troubleshooting guide for Flex UI](/docs/flex/end-user-guide/troubleshooting).

**Did your message trigger a Conversation to be created?**

Any message to a Conversations address that's outside of a conversation should cause the auto-create functionality to create a new conversation, add the sender as a participant, and append the message to the newly-created conversation. To find if the sender has an active conversation, use the [Conversation Participant resource](/docs/conversations-classic/api/conversation-participant-resource) to find the active conversation. If there is no active conversation for this participant, check that your Conversation address is configured correctly and that the Messaging and Conversations services are also configured correctly.

**Does the Conversation have a webhook or Studio configured as the scoped webhook?**

If you found an active conversation for the sender in the previous step, check if a Studio or webhook integration is configured correctly by querying the [Conversation Scoped Webhook resource](/docs/conversations-classic/api/conversation-scoped-webhook-resource). The configuration should have either a Studio target or webhook target as per the Conversation address. If not, the conversation may not have been processed because it isn't associated with a handler. If this happens, consider filing a support ticket. You could also try sending unprocessed conversations to Flex by invoking the Interactions API.

**Did your Studio Flow receive the message?**

All Studio interactions are captured in a [Flow's Execution Logs](https://www.twilio.com/console/studio/dashboard). Find "Messaging Flow" (the default flow created for Flex, or the Chat Flow if you're debugging a web chat interaction) and go to the Studio logs to see the execution associated with the failed message.

You can inspect error messages in each step of the Studio Flow. HTTP Requests and Function widgets frequently return error codes that can end the entire execution.

**Did Studio create an Interaction (and Task)?**

You can inspect the Studio Flow logs to see the Interaction SID, the Interaction channel SID, and the Task SID.

You can inspect Tasks in the [TaskRouter section of the Twilio Console](https://www.twilio.com/console/taskrouter/dashboard). The Task attributes should contain a reference to the relevant Interaction and Conversation SID.

**Was the agent able to accept the Reservation?**

When an agent accepts a Reservation related to a Task, Flex adds the agent user as a Participant to the conversation. The role linked with that agent user is `agent`.

Don't modify the standard permissions of the `agent` role. These include the following permissions:

* `sendMessage`
* `sendMediaMessage`
* `leaveConversation`
* `editConversationAttributes`
* `editOwnMessage`
* `editOwnMessageAttributes`
* `deleteOwnMessage`

You can see messages sent by an agent in the Phone Number or Messaging logs. Optionally, you can filter messages by outgoing messages to find the agent's message.

Once an agent completes a Task, Flex does the following:

* Changes the Task status to Completed and deletes it after 10 minutes.
* Removes the agent from the Conversation.
* Sets the Conversation state to closed.

## How do I switch from Flex Conversations to use Legacy Messaging?

If you're having trouble with Flex Conversations and need to use legacy channels for messaging, see [Switch from Flex Conversations to Legacy Messaging](/docs/flex/developer/messaging/use-legacy-messaging) for instructions.
