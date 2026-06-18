# Using Twilio Conversations with Studio

Twilio Conversations enables back-and-forth messaging across various communication channels. This means multiple users from different supported messaging platforms are able to seamlessly communicate with one another. Use Studio to handle interactions or logic for incoming Conversation messages and leverage the powerful capabilities of Conversations' cross-channel and multi-user support.

## Why should you use Conversations with Studio

Conversations provides the ability to add or remove [Participants](/docs/conversations-classic/api/conversation-participant-resource) that are interacting with a Flow's Execution, creating the opportunity to add support agents at any point to assist users with your Studio application. Additionally, the Conversations integration enables collaborative capabilities within your application as multiple Participants can provide input and move the same Flow Execution forward.

## Connecting a Conversation to your Flow

To connect a Twilio Conversation to your Studio Flow, check out the following tutorials:

* [**Using Twilio Studio and Conversations with SMS**](https://www.twilio.com/blog/using-twilio-studio-conversations-sms) (Low-code approach)
* [**Connecting Twilio Studio to Conversations**](/docs/conversations-classic/connect-to-studio) (Code approach)

## Detecting incoming Conversation messages

A Studio Flow's Execution will start when a message is created in the Conversation that is connected to the Flow. Use the `Incoming Conversation` transition within the [**Trigger (Start) widget**](/docs/studio/widget-library/trigger-start). Once a message is sent in a Conversation, the widget connected to the Incoming Conversation transition will be run.

> \[!WARNING]
>
> If you are using [Flex Conversations](/docs/flex/developer/conversations), remember to handle certain terminal TaskRouter events according to your application's needs, as conversations may stay orphaned with an `open` state.
>
> See [Conversations Best Practices](/docs/flex/developer/conversations/best-practices) for details.

## Example: Add a Support Agent

You can modify Conversations Participants using the Run Function widget along with a [Twilio Function](/docs/serverless/functions-assets/functions). A Twilio Function will run code that makes a request to the Conversations API to add or remove Participants.

In this example, customers will send the keyword "support" as a Conversation message. The Studio Flow will detect that the keyword was sent and add a Participant to the Conversation. The Participant will be the support agent in this case.

### Prerequisites

* Sign up for a Twilio account — you can [create a free account](https://www.twilio.com/try-twilio) if you don't have one already.
* Purchase a Twilio phone number. Learn [how to purchase a phone number](/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-free-twilio-phone-number). The number purchasing process varies by region.
* Familiarity with Twilio Conversations.
* You have attached your Studio Flow to a Conversation. [Use this guide](https://www.twilio.com/blog/using-twilio-studio-conversations-sms) to automatically attach a Studio Flow to a Conversation when a Conversation is auto-created.
* Familiarity with the [Split Based On…](/docs/studio/widget-library/split-based-on), [Run Function](/docs/studio/widget-library/run-function), and [Send Message](/docs/studio/widget-library/send-message) widgets.

### 1. Check if the "support" keyword is sent as a message in the Conversation

The [Incoming Conversation](/docs/studio/widget-library/trigger-start#incoming-conversation-trigger-variables) transition from the Trigger (Start) widget is used to detect and start the Studio Flow when a new message is sent in the Conversation the Studio Flow is connected to. All messages sent within the Studio Flow will be delivered to all Participants in the Conversation.

Add a [**Split Based On… widget**](/docs/studio/widget-library/split-based-on) to the Canvas to check if the keyword "support" is sent within the Conversation. Rename the widget to `check-support`. [Liquid variables](/docs/studio/user-guide/liquid-template-language#expressions-and-variables) are values stored within a Studio Flow that can be used by your widgets. When checking for the "support" keyword, the Split Based On… widget evaluates the `{{trigger.conversation.Body}}` variable. This variable holds the message that was sent in the Conversation. In the **Variable to Test** field, enter `{{trigger.conversation.Body}}`.

![Twilio Studio Tutorial Using Conversations Split Based On widget... checkes the Liquid variable for the support keyword.](https://docs-resources.prod.twilio.com/ab18bd0c9534b85fa3266647ae3ac3bc3ab043f0b1f04eb366c81df404387d21.png)

Click on the **Transitions** tab and add a new condition by pressing the **+** button. Under **Enter Value…** for the condition, input "support" and make sure the predicate is set to "Equal To". When a Participant within the Conversation sends a message that is equal to "support", the condition you just created will be satisfied and any widgets connected to the condition will be run.

![Twilio Studio Tutorial Conversations Split Based On widget on Canvas with configuration panel shown.](https://docs-resources.prod.twilio.com/0e9db3c5c211cb4c3aadd9f8c6317d04b50341be86027166e1bb72ff0c4fbd9e.png)

Rename the condition to `Support` by clicking **Save** and then clicking **Rename** within the condition. The transition should now be visible with a dangling dot on your `check-support` widget. You will now need to create the Twilio Function that will add the support agent number to the Conversation.

### 2. Create the Twilio Function that will add the support agent to the Conversation

A Twilio Function is a block of code hosted by Twilio. You can run this block of code using your Studio Flow to add the support agent.

1. If you do not have the Functions and Assets product pinned to your sidebar within the Twilio Console, click on **Explore Products** and find the product under **Developer tools**. If you have the Functions and Assets product pinned to your sidebar, navigate to **Functions and Assets > Overview**.
2. Create a new service that will hold the Function you want to create by clicking on **Create Service**. Name the service and click **Next**.
3. Click the **Add +** button and add a new Function. Rename the function path to `add-support-agent`.
4. Under **Settings**, click on **Dependencies** and add `twilio` as a module. Enter `3.73.1` as the version number and click **Add**. The Conversations API is not available in some older versions, which is why it is being specified here.

   ![Twilio Studio Tutorial Conversations Function Dependencies.](https://docs-resources.prod.twilio.com/7cc6899422c34631149104b415eec98e426e14a69a7ce345fd29c74cf021d563.png)
5. Click into the `add-support-agent` Function and copy and paste the [code below these steps](#add-support-agent-code).
6. Substitute the support agent's phone number and the Twilio phone number with your own values before clicking **Save**. The phone numbers that you set should be in [E.164 format](/docs/glossary/what-e164).
7. Click on **Deploy All**. The Function is now operational and will add the support agent number to the Conversation when called by your Studio Flow. You can now head back to your Studio Flow.

#### Add support agent code

```javascript
exports.handler = function (context, event, callback) {
  // get the Twilio client
  const client = context.getTwilioClient();

  // store the Conversation ID passed in from the Studio Flow
  const conversationsSid = event.conversationID;

  // add a participant to the Conversation
  client.conversations
    .conversations(conversationsSid)
    .participants.create({
      "messagingBinding.address": "enter-support-agent-phone-number",
      "messagingBinding.proxyAddress": "enter-twilio-phone-number",
    })
    .then((participant) => {
      console.log(participant.sid);
      return callback(null, "Success");
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};
```

### 3. Invoke the Twilio Function using the Run Function widget

Add a [**Run Function widget**](/docs/studio/widget-library/run-function), which runs code you write in a Twilio Function, to the Canvas. Rename the Run Function widget to `add-support-agent`. Connect the `Support` transition you created in the `check-support` widget to this widget by clicking the dangling dot under the `Support` transition and dragging it to the Run Function widget before letting go.

![Twilio Studio Tutorial Conversations Run Function widget on the Canvas with the Configuration panel shown.](https://docs-resources.prod.twilio.com/ae0901ac614b66236a2e64ea4e1e96f83683957a64436f7b0088ffa552367c8f.png)

Configure the `add-support-agent` widget to point to the Function you just deployed. Under **Service**, select the name of the Service you created. Under **Environment**, select **ui**. Under **Function**, select the Function you created. In this guide, `/add-support-agent` was selected.

You will need to pass the Conversation's SID, or identification, to the Twilio Function in order to access and manage Participants. [The Studio Flow](/docs/studio/rest-api/v2/flow-definition), if triggered by an incoming Conversation, holds the SID value in the `{{trigger.conversation.ConversationSid}}` Liquid variable.

To pass the Conversation's identification to the Function, add the value as a Function Parameter. Under **Function Parameters** in the `add-support-agent` widget's configuration, add the Conversation's SID value to a variable that will be sent to the Function. Name the variable `conversationID` and set the value to be `{{trigger.conversation.ConversationSid}}`.

![Twilio Studio Tutorial Conversations Run Function widget on Canvas with Configuration panel showing Parameters.](https://docs-resources.prod.twilio.com/7d9d410e6974d9c8493bcc996727801dca9490944d01fa72e6ce639edac15404.png)

### 4. Confirm the support agent has been added

After adding the support agent to the Conversation using the Function you created and ran using the Run Function widget, send a test message from the Flow as a confirmation. You can also use this as an indication to the support agent that a user is requesting for help.

All messages sent from the Studio Flow will be delivered to all Participants in the Conversation. The [**Send Message widget**](/docs/studio/widget-library/send-message) should, therefore, deliver a message to the support agent number you just added to the Conversation.

1. Add a new Send Message widget to the Canvas and rename it to `support-confirmation-message`.
2. Click on the **Success** transition dot from the `add-support-agent` widget and connect it to this widget.
3. Click on the `support-confirmation-message` widget to display the configuration panel. Add a confirmation message to the **Message Body** field. This guide will use "Added support agent" as the message.
4. Make sure to click **Publish** so your Flow is live and ready to be used.

![Twilio Studio Tutorial Conversations Send Message widget added to Canvas.](https://docs-resources.prod.twilio.com/76a39e41447a98a19ea392abe8ea1d0137b00917ea9d3090f9386238f049e149.png)

Your Studio Flow will now add a support agent to the Conversation when a user sends the "support" keyword. Any messages sent from the Studio Flow or Conversation will now include the support agent. You are not limited to just adding users to the Studio Flow. You may also [remove a participant from the Conversation](/docs/conversations-classic/api/conversation-participant-resource#code-delete-conversation-participant) at any point using another Run Function widget.
