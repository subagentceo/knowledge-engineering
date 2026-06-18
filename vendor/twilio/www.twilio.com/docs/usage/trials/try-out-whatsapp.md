# Try out Twilio WhatsApp Messaging

To see how WhatsApp Messaging works, you can try it out with just a few clicks. You'll be able to send and receive your first WhatsApp messages within a few minutes.

As you send messages, you'll be able to see the API request and response that Twilio uses. You can build using our API reference, knowing that everything you create can easily transfer to a fully featured account when you upgrade.

For details about trial free units, restrictions, the 30-day expiration, and post-upgrade free units, see [Twilio trial account](/docs/usage/trials).

To get started, go to the [Twilio Console](https://1console.twilio.com/) and click **Messaging**. Under **Popular channels**, locate **WhatsApp** and click **Try WhatsApp**.

During your WhatsApp trial:

* You can only send WhatsApp messages to verified numbers. To verify a number, Twilio will send a verification code to that number that you must enter on the page.
  * Each account can verify up to five numbers.
  * The phone number that you signed up with is automatically added as a verified number.
  * If you have multiple accounts, you can use the same verified number for up to three accounts, including subaccounts. If you sign up for a fourth Twilio account with the same number, your number is not added as a verified number.
* Your message is sent from a Twilio trial WhatsApp number. Once you upgrade your account, messages will be sent from a Twilio number that you've purchased and registered with WhatsApp.
* You'll choose from a few pre-approved WhatsApp template messages. You won't be able to write your own message.
* WhatsApp messages require pre-approved templates for business-initiated conversations. During your trial, Twilio provides these templates for you.

When you're ready, you can upgrade your account to gain access to all WhatsApp Messaging functionality.

At any time, click **Logs** to view WhatsApp message logs or **Free units tracker** to see how many WhatsApp messages you have left in your trial.

## Step 1: Send a trial WhatsApp message

On the **Try out WhatsApp** page, first scan the QR code to link your device and follow the on-screen instructions to configure settings and send your message. We recommend sending your first message to yourself, because you'll need access to that number to receive a WhatsApp message in your trial account.

Note that the API request and response for your message appear on the page.

## Step 2: Receive a trial WhatsApp message

By default, during your trial, we send an auto response if you send a message from your verified phone number to your trial phone number.To inspect or customize responses, **select Inbound**, choose Custom under Auto-Reply, and set up your webhook.

## Using the Messaging API

During your trial, you can use the [Messages resource](/docs/messaging/api/message-resource) with some limitations and key differences. The simplest way to build during your trial is to copy your request from the code block on the **Try out WhatsApp** page, then make adjustments as needed.

You can build in your trial environment, then upgrade to a fully featured account when you're ready. Once trial limitations no longer apply, you can create your own custom WhatsApp message content and set additional parameters that were not supported in your trial.

### Send a WhatsApp message

This request uses the [Create a Message](/docs/messaging/api/message-resource#create-a-message-resource) resource. During your trial, you can only use or change the following parameters:

* `to`: (Required) The recipient's phone number in WhatsApp format: `whatsapp:+15551234567`.
* `from`: (Required) Your Twilio WhatsApp-enabled number in WhatsApp format: `whatsapp:+14155238886`.
* `ContentSid`: (Required) Must specify one of the Twilio-provided WhatsApp template messages shown on the **Try out WhatsApp** page in the Console.
* `statusCallback`: (Optional) URL to `POST` message status updates (for example, delivered, read, failed, and so on).

### Receive and reply to WhatsApp messages

Use the same approach described in [Receive and Reply to Incoming Messages - Python](/docs/messaging/tutorials/how-to-receive-and-reply/python). However, your WhatsApp trial has the following limitations:

* Twilio Functions, Twilio Proxy, and TwiML Bins are not supported.
* Direct TwiML XML is not supported during response.

### Messaging logs

See [Read multiple Message resources](/docs/messaging/api/message-resource#read-multiple-message-resources) for details about required and optional parameters.
