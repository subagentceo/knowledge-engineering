# Known Issues

## Interactions API

### Failure to add customer in an ongoing conversation as an interaction participant

**Description:** If you create an interaction with a participant that's already in a conversation, the participant will not be added and the agent ends up with a conversation task with nobody else in it.

**Workaround:** You will need to ensure that the participant does not have an ongoing conversation. You can retrieve this information via the [Conversation Participant Resource](/docs/conversations-classic/api/conversation-participant-resource) before creating an outbound interaction with that participant.

### Manual task deletion not working as expected

**Description:** Deleting Flex Conversations tasks that were created by the Interactions API (either from the TaskRouter Dashboard or the API) is not supported.

**Workaround:** No existing workaround. Please do not delete tasks directly from the Console or using the TaskRouter API. This will be fixed in an upcoming release.

### Reporting display issue with media files

**Description:** Media files (conversation attachments) are not displayed in the conversation historical reporting screen.

**Workaround:** None available. Customer will currently receive an error message, but this will be supported in an upcoming release.

### Setting timeout and priority in Studio SendToFlex not working

**Description:** The SendToFlex widget allows you to set the priority and timeout on the Task that it creates. This only works for Voice calls and does not work for messaging or Conversations.

**Workaround:** Add a Twilio Function that handles creating the Interaction directly and have Studio call that function using the Twilio Function widget.

### Agent is added to a Conversation with guest role

**Description:** When an agent accepts a Task for Flex Conversations, they are added to the Conversation with their default configured Conversations role which is "guest".

**Workaround:** No known workaround.

### Long-lived tasks are not supported

**Description**: Long-lived tasks, which preserve a customer's message history between multiple interactions, are not supported.

**Workaround**: If you need long-lived messaging, see [Park an Interaction](/docs/flex/developer/conversations/park-an-interaction). You can retrieve participant and chat history by moving a [conversation state](/docs/conversations-classic/states-timers#conversation-states) to **inactive** when closing a task — a park — and updating the conversation state to **active** when a new task matches the existing participant — an unpark.

## Facebook Messenger (Public Beta)

### Flex UI

* Customer information is not passed through from Conversations to TaskRouter. Accordingly, the customer's name does not appear in the Flex UI. Instead, you'll see **messenger:** followed by a unique Messenger ID. To retrieve a Messenger User ID, see [Facebook Messenger](/docs/messaging/channels/facebook-messenger#retrieve-the-messenger-user-id-from-the-callback).
* Replies to a message don't show the original message in the reply.
* Forwarded messages don't show as forwarded, and instead appear as standard messages.

### Twilio Console

* If you delete a Facebook Page as a **Sender**, you cannot re-add it.
* Sender names must be unique. It is not possible to have two senders with the same name, even on [different channels](/docs/messaging/channels).
