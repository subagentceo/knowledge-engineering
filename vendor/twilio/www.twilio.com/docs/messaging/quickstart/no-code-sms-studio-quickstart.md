# No-code SMS quickstart with Twilio Studio

With a few drag-and-drop actions, you can build an application that sends and receives SMS messages.

In this quickstart, you'll build a no-code application to send and receive text messages with [Twilio Programmable Messaging](/docs/messaging). This quickstart uses [Twilio Studio](/docs/studio), the Twilio low-code application builder, and the Twilio Virtual Phone.

For a developer quickstart that uses programming languages and the REST API, see the [SMS developer quickstart](/docs/messaging/quickstart/).

## Sign up for Twilio and get a phone number

1. [Sign up for Twilio](https://www.twilio.com/try-twilio). When prompted to select a plan, click **Continue with trial**.
2. On the landing page, click **Get phone number**.

## Create a Flow

A **Flow** is a visual representation of your application, similar to the flowchart you might draw when planning its logic.

To create a Flow, follow these steps:

1. Open the [Studio Flows page in the Twilio Console](https://www.twilio.com/console/studio/flows).
2. Click **Create new Flow**.

   If you created a Flow before, click the **+** icon under the **Flows** heading.
3. Give your new Flow a name, then click **Next**. A list of templates you can use displays.
4. Select **Start from scratch**, then click **Next**.

After you create a new Flow, Studio displays the following elements:

* **Canvas**: The space where you build your application.
* **Trigger Widget**: The Trigger Widget tells Studio when to start, or "trigger," your Flow. To learn more, see [Trigger Widget](/docs/studio/widget-library/trigger-start).
* **Widget Library**: The **Widget Library**, on the right side of the Canvas, contains all the available Widgets. Widgets are the building blocks of a Studio Flow and perform the functions that make up your application.

## Receive and respond to incoming messages

To create a system that automatically responds to an incoming message with the [Send Message Widget](/docs/studio/widget-library/send-message), follow these steps:

1. From the **Widget Library** on the right, drag the **Send Message** widget onto the Canvas and place it under the Trigger widget.
2. Click the red dot underneath **Incoming Message** on the Trigger Widget and drag it to the Send Message Widget to connect them.

   Studio now triggers the Flow when it receives a message and then executes the Send Message widget.
3. Configure the Send Message Widget.

   With the Widget selected, the Widget Library displays the settings for the Widget:

   1. Enter a name in **Widget Name**. The name must start with a letter and can't contain spaces; use underscores (`_`) to separate words.
   2. Enter a message into the **Message Body** field. This is the message a user receives when they text your Twilio number.

      You can also add a JPG, PNG, or GIF to the message by entering the URL of the media into the **Media URL** field.
   3. Click **Save**.

   Your Flow should resemble this:

   ![Flowchart showing trigger options leading to send\_message with a response.](https://docs-resources.prod.twilio.com/7220a308a3caa51600eba1bee26e30024d5bd09061c1c41af6ee08ac7253a43d.png)
4. Click **Publish** to publish your Flow.

   Publish your Flow whenever you make changes to make them live.

## Connect your phone number

To tell your Twilio phone number to use your Flow when it receives a text message, follow these steps:

## Twilio console

1. Open the [Numbers & senders](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) page in the Twilio console.
2. Select the Twilio phone number you'd like to connect to your Flow.
3. Select **Configuration details**, click **Messaging**, and select **Edit details**.
4. Update the method to *Webhook, TwiML Bin, Function, Studio Flow, Proxy Service*, select **Use Studio Flows**, and then select the Flow you created.
5. When you've finished updating your configuration, click **Save**.

## Legacy console

1. Open the [Active Numbers](https://www.twilio.com/console/phone-numbers/incoming) page in the Twilio Console.
2. Click your Twilio phone number.
3. In **Messaging configuration**, under **A message comes in**, choose **Studio Flow**, and then select your Flow from **Select a Flow**.
4. Click **Save configuration** to save your changes.

## Test your application

To test your application, complete the following steps:

1. Open the [Send an SMS page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/send-an-sms).
2. On the **Send to Virtual Phone** tab, select the number that Twilio gave you from the **Phone number** list.
3. Click **Virtual Phone**. Messages you send with your application display on the Virtual Phone.
4. Send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   Your application processes the request, and you get the response back as an SMS on the Twilio Virtual Phone.

## Next steps

After you've built your first no-code SMS application, explore these resources:

* [Upgrade your account in the Twilio Console](https://console.twilio.com/account/upgrade).
* Learn about [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) and [Application-to-Person (A2P) 10-Digit Long Code (10DLC) registration](/docs/messaging/compliance/a2p-10dlc). Regulations require:
  * Toll-free verification to send SMS messages from toll-free numbers to mobile phones in the US and Canada.
  * A2P 10DLC registration to send SMS messages from local numbers to mobile phones in the US.
* Learn more Twilio Studio basics with [Get Started with Twilio Studio](/docs/studio/user-guide/get-started).
* Build more applications with Twilio Studio:

  * To create a two-way conversation with your users, use the [Send & Wait For Reply widget](/docs/studio/widget-library/send-wait-reply). See the [Build a chatbot with Twilio Studio](/docs/studio/tutorials/how-to-build-a-chatbot) and [Conduct an SMS survey with Twilio Studio](/docs/studio/tutorials/how-to-conduct-a-survey) tutorials to see the Send & Wait For Reply widget in action.
  * [Send Appointment Reminders with Twilio Studio](/docs/studio/tutorials/how-to-send-appointment-reminders).
