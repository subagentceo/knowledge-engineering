# Test legacy SMS and chat

## Flex built-in channels: Voice, SMS, Chat

While you can take Flex in any direction you choose, we've stocked it with enough features out of the box to help you plan your journey!

When you launch your instance, the phone number Twilio provisions for your account can accept voice calls and SMS. Let's walk through each of the messaging channels now. For working with voice, see [this tutorial](/docs/flex/admin-guide/setup/voice/test).

Make sure you are available to accept tasks in Flex ("Available" would be a good status, unless you have customized the Activities for your Flex account).

### Respond to SMS in Flex

If you haven't yet, make a note of the phone number assigned to your Flex instance. You can find it on the [Admin panel](https://flex.twilio.com/admin/).

1. Send an SMS from your cell phone to your Flex phone number.
2. Inside Flex navigate back to the [Agent Desktop](https://flex.twilio.com/agent-desktop/), or click the "Stack" button on the left sidebar as you've done with your incoming call.
3. Accept the incoming request by clicking the green **Accept** button:

   ![Twilio Flex interface showing an incoming SMS request with accept and reject options.](https://docs-resources.prod.twilio.com/6a17c258a20c90aa5a7895308f97e78fa864b2eb179eef44f0c4b0e73afc6678.png)
4. Send a message back to your phone by typing in the chat interface and sending your well-crafted response:

   ![Twilio Flex interface showing an incoming chat request from a customer.](https://docs-resources.prod.twilio.com/4e47a86f052df9dd67b67f2fb61188198dbf883fb1ed7e27e146b3a4e337fdc8.png)
5. Verify you received the message you just sent from the Flex application to your phone.
6. Click **End Chat** to finish the SMS session.
7. Click **Complete** to wrap up the task.

### Reply to chat requests in Flex

Chat is a native channel within your Flex instance. However, since it isn't yet integrated with your application, we've included a chat demo for your Flex instance. You can find the 'customer side' of chat inside the Admin panel.

1. Navigate to the [Admin panel](https://flex.twilio.com/admin/).

   ![Twilio Flex welcome screen with tasks and contact options.](https://docs-resources.prod.twilio.com/a5f18fa5fc04486fb96883edf2774a1dd3833679c8f128026d07aeaa5bb174f9.png)
2. Click **Launch** under the Webchat heading in the **Test Drive** section to open up a web chat session.

   ![Test a web chat session.](https://docs-resources.prod.twilio.com/6161f039abdcde4bbd29f1c97c9d411957f8da2d677c763280b28efb0b22d7a2.png)
3. A chat modal should load in a new tab, or you can click 'Chat With Us' on the lower right corner of the window.
4. Enter a name and anything in the text field.
5. Back on the Agent Desktop in your Flex Instance, accept the chat request:

   ![incoming-chat-request.](https://docs-resources.prod.twilio.com/bd1bc997adfc491e3628d7d6aa6492eba1321fbec6c687ef43e32d56dc624787.png)
6. Respond to the customer chat message and notice the read receipts on the agent side:

   ![Chat interface showing a conversation between customer and Maria Bermudez about billing assistance.](https://docs-resources.prod.twilio.com/402bf4abe7cc1eb9ed1e004a314c3deed3fac61db5758237e2825ca6d254d04c.png)
7. Click **End Chat** to end the chat session.
8. Click **Complete** to end the agent wrapup.

### Where to next?

* [Test Voice](/docs/flex/admin-guide/setup/voice/test)
* [Build an IVR](/docs/flex/admin-guide/tutorials/ivr)
