# Test SMS messaging with the Virtual Phone

The Twilio Virtual Phone simulates a mobile device in the [Twilio Console][send-sms]. Use the Virtual Phone to test SMS messaging from your development environment or from the Console.

The Virtual Phone offers these benefits:

* Send SMS messages without [toll-free verification][tfv], [A2P 10DLC registration][a2p-10dlc], or other SMS-related regulatory requirements. Sending messages between your Twilio phone number and the Virtual Phone doesn't require any regulatory compliance.
* Test multiple SMS apps at the same time. Switch between multiple senders, including your Twilio phone numbers and configured [Messaging Services](/docs/messaging/services).
* Test SMS messaging without going over a carrier network or using a real recipient device.

The Virtual Phone interface displays messages sent to the Virtual Phone's toll-free number: **+1 877 780 4236**. Twilio filters messages by account, so other users can't see messages you send to the Virtual Phone.

> \[!NOTE]
>
> You can use your trial account phone number to send SMS messages to the Twilio Virtual Phone. When you sign up for a [Twilio free trial account](/docs/usage/trials), Twilio assigns you a phone number or directs you to purchase one. Trial accounts expire after 30 days and include product-specific free units.

## Test SMS messaging from your development environment

Open the Twilio Console and go to **Messaging** > [**Virtual Phone**](https://console.twilio.com/us1/develop/sms/virtual-phone).

![Twilio Virtual Phone interface showing steps to specify sender and recipient with code snippets.](https://docs-resources.prod.twilio.com/2eb1a5c78fa17517392e184d3c2ebeb6b1be9bbad8d6552a5a134cbc7ce9e5c2.png)

You can test SMS messaging using the Messaging API and the Virtual Phone in the following ways:

* Send messages between your application and the Virtual Phone.
* Send messages from the command line to the Virtual Phone using curl.
* Send messages from Postman, or other API clients, to the Virtual Phone.

Messages you send to the Virtual Phone with the Messaging API appear in the **Virtual Phone** interface.

Click **Switch to API Explorer** to view a request that uses the selected **Sender type** and **Phone number** or **Messaging Service** values. To change the format of the request, select your preferred language from the **Request** box menu. You can choose curl or any language supported by a [Twilio SDK](https://www.twilio.com/docs/libraries/reference/).

Switch back to the **Virtual Phone** view to see the message you sent.

> \[!CAUTION]
>
> To test on a local machine, you can use your Account SID and Auth token for authentication. For production apps, use [API keys](/docs/iam/api-keys) for authentication.

### Send an SMS from your application

If your application already sends SMS, select your language, and then copy and paste the sender and Virtual Phone details from the Console into your application code.

To add a pre-formatted SMS request to your application, follow these steps:

1. Go to the [Virtual Phone page](https://console.twilio.com/us1/develop/sms/virtual-phone) in the Console.
2. Click **Switch to API Explorer**.
3. Click **Show auth token** in the **Request** box.
4. Copy the request into your code project and then run your code to send the message.
5. In the Console, click **Switch to Virtual Phone**.

   Your message displays in the Virtual Phone inbox.

For a step-by-step guide that shows how to send messages between an application and the Virtual Phone, see the [SMS developer quickstart](/docs/messaging/quickstart).

### Send an SMS with `curl`

To test sending an SMS message with curl, follow these steps:

1. Go to the [Virtual Phone page](https://console.twilio.com/us1/develop/sms/virtual-phone) in the Console.
2. Click **Switch to API Explorer**.
3. Click **Show auth token** in the **Request** box.
4. Copy the `curl` command into your terminal and press **Enter**.
5. In the Console, click **Switch to Virtual Phone**.

   Your message displays in the Virtual Phone inbox.

### Send an SMS with an API client

To test sending an SMS message with an API client such as Postman, follow these steps:

1. Go to the [Virtual Phone page](https://console.twilio.com/us1/develop/sms/virtual-phone) in the Console.
2. In your API client, copy the Virtual Phone number into the `to:` field and your Twilio phone number into the `from` field of the request body.
3. Send the request.
4. In the Console, click **Switch to Virtual Phone**.

   Your message displays in the Virtual Phone inbox.

For example requests, see the [Postman collection for Twilio Messaging](https://www.postman.com/twilio/twilio-developers/request/k5kknb8/send-an-sms).

### Test Messaging Service capabilities and use cases

Use the Virtual Phone to verify how your Messaging Service manages outgoing and incoming messages among sender pool numbers, and to confirm that programmatic features work as expected.

To test inbound SMS use cases for your Messaging Service, such as when a customer reaches out to customer support, use the **New Chat** feature of the Virtual Phone. You can switch between senders during testing to make sure inbound messages go to the correct sender.

To test SMS messaging with a Messaging Service, follow these steps:

1. Go to the [Virtual Phone page](https://console.twilio.com/us1/develop/sms/virtual-phone) in the Console.
2. Select **Messaging Service** as the **Sender type**, and then select a Messaging Service from the list.

   The Virtual Phone shows a list of senders in the Messaging Service sender pool that have a message history with the Virtual Phone.
3. In the Virtual Phone inbox, click **New Chat**.

   The Virtual Phone shows a list of all the SMS-capable senders in the Messaging Service sender pool.
4. Select a sender from the list.
5. Send a message from the Virtual Phone to the sender.

   The Virtual Phone displays all the messages between the sender and the Virtual Phone.

### Receive and reply to messages from the Virtual Phone

You can use the Virtual Phone to test receiving messages in your application and sending replies. For an example of receiving and replying to an inbound SMS message, see the [SMS developer quickstart](/docs/messaging/quickstart#receive-and-reply-to-an-inbound-sms-message).

## Test SMS messaging from the Twilio Console

Open the Twilio Console and go to **Messaging** > **Try it out** > [**Send an SMS**][send-sms].

![Twilio SMS interface with fields for recipient, sender type, message, and curl request example.](https://docs-resources.prod.twilio.com/3ba6f55d92494b97d955501e78892502be5dcc780ebbe0bf449be173de2c5528.png)

The [**Send an SMS**][send-sms] page provides sender options and SMS testing tools, including the Virtual Phone interface:

* **Send to Virtual Phone**: Send a message to the Virtual Phone from one of your Twilio numbers, either directly or with a [Messaging Service](/docs/messaging/services).
* **Send to personal number**: Send a message to a personal mobile number from one of your Twilio numbers, either directly or with a [Messaging Service](/docs/messaging/services).
  > \[!WARNING]
  >
  > All country-specific [phone number regulations](/docs/usage/tutorials/how-to-use-your-free-trial-account#understand-phone-number-regulatory-requirements) apply. If you have a trial account, Twilio limits recipients to [phone numbers that you verified][verified] in your account.
* **API Explorer**: Displays the SDK code to send the SMS message with the Twilio API using the values in the **Send to Virtual Phone** or **Send to personal number** form. After you send the SMS from the form, the API Explorer displays the response. You can't edit API Explorer content directly, but you can change the request language from the menu in the **Request** box.
* **Virtual Phone**: Displays messages sent to the Virtual Phone number in a simulated mobile device. You can also respond to the sender from the Virtual Phone interface.

## Send to Virtual Phone

Send an SMS to the Twilio Virtual Phone.

1. Leave the **To** box unchanged. Messages are sent only to the Virtual Phone number.
2. Choose the **Sender type**, and then select a Twilio **Phone number** or a **Messaging Service**.
3. Type your message in the **Message** field.
4. Click **Send an SMS**.

   A banner displays either a success or an error message. To learn more about errors, click **Messaging Logs**.

The **API Explorer** displays the SDK code to send the SMS message with the Twilio API using the values you provide in the **Send to Virtual Phone** form. The response includes an HTTP status code and the response body in JSON format. For complete examples that show how to send and receive SMS messages from the Virtual Phone, see the [SMS developer quickstart](/docs/messaging/quickstart).

To see and respond to the message in the Virtual Phone interface, click **Virtual Phone**.

## Send to personal number

Send an SMS to a personal phone number.

1. Type a phone number in [E.164](/docs/glossary/what-e164) format in the **To** box or, if you have a trial account, select from your [verified numbers][verified].
2. Choose the **Sender type**, and then select a Twilio **Phone number** or a **Messaging Service**.
3. Type your message in the **Message** field.
4. Click **Send an SMS**.

   A banner displays a success or an error message. To learn more about errors, click **Messaging Logs**.

If the SMS send succeeds, you receive the message on your personal device at the number you provided in the **To** field.

The **API Explorer** displays the SDK code to send the SMS message with the Twilio API using the values you provide in the **Send to personal number** form. The response includes an HTTP status code and the response body in JSON format.

## Next steps

* Try the [SMS developer quickstart](/docs/messaging/quickstart) or [SMS no-code quickstart](/docs/messaging/quickstart/no-code-sms-studio-quickstart).
* Learn how to [make API requests to Twilio](/docs/usage/requests-to-twilio).
* Explore all the [Messaging channels](/docs/messaging/channels) that Twilio supports.

[tfv]: /docs/messaging/compliance/toll-free/console-onboarding

[a2p-10dlc]: /docs/messaging/compliance/a2p-10dlc

[send-sms]: https://console.twilio.com/us1/develop/sms/try-it-out/send-an-sms

[verified]: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
