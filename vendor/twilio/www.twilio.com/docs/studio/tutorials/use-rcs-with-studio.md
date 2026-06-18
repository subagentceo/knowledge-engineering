# Use RCS messaging with Studio

> \[!WARNING]
>
> RCS messaging with Studio is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## Overview

To route RCS messages through your Studio logic, connect your RCS sender to a Studio Flow. You can create this connection by adding your Flow webhook URL to your RCS sender configuration in Twilio Console.

With RCS support in Twilio Studio, you can:

* Start Studio Executions from inbound RCS messages using these trigger types:
  * Incoming Message
  * Incoming Conversation Message
* Send outbound RCS messages from any Studio Flow (including from [API-triggered Executions](/docs/studio/rest-api/execution#create-a-new-execution)) using these widgets:
  * [Send Message](/docs/studio/widget-library/send-message)
  * [Send & Wait for Reply](/docs/studio/widget-library/send-wait-reply)

We also recommend setting up SMS fallback by adding your Flow to the Messaging configuration for your RCS Twilio phone number. SMS fallback lets Twilio deliver messages as SMS if a recipient can't receive RCS messages. This option is available only if you use RCS with a [Messaging Service](/docs/messaging/services) as the sender.

## Before you start

Before you can enable RCS messaging for your Studio Flow, you must have [set up and configured RCS for your account](/docs/rcs/onboarding).

If you want to use SMS fallback, make sure you [created a Messaging Service](/docs/messaging/tutorials/send-messages-with-messaging-services) as part of your RCS setup and completed the [A2P 10DLC registration process](https://help.twilio.com/articles/1260801864489-How-do-I-register-to-use-A2P-10DLC-messaging) to send messages in the US.

## Connect your Studio Flow to an RCS sender

After you've created a Studio Flow, connect it to an RCS sender so the Flow can support RCS messaging.

### Get your Flow webhook URL

1. In the Twilio Console, go to **Products & Services > Studio > Overview**.
2. Open your Flow, then click **Publish**.
3. On the canvas, click the trigger, then copy the **Webhook URL**. The value should look similar to `https://webhooks.twilio.com/v1/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Flows/FWxxxxxxxxxxxxxxxxxxxxxxxxxxx`.

### Add your Flow webhook URL to the RCS sender configuration

1. In the Twilio Console, go to **Producs & Services > Numbers & Senders > RCS**, then select your sender.
2. On the **Configuration** tab, paste the webhook URL you copied from Studio into the following fields:
   * **Webhook URL for incoming messages**
   * **Status callback URL**

Your RCS sender is now connected, and inbound messages to that sender trigger your Studio Flow. If your goal is to to use RCS with Programmable Messaging, and you don't need SMS fallback, your setup is complete.

If you're using RCS with Conversations, or if you want to set up SMS fallback for your Messaging Service, continue to the following sections.

### Connect your Flow to an RCS sender address for Conversations

1. In the Twilio Console, go to **Products & Services > Conversations (Classic)** > **Addresses** > **Action**, to edit your RCS service.
2. On the **Address configuration** tab, in the **Want to set up an integration?** section, click **Studio**.
3. Select your Flow from the list.

### Configure SMS fallback

We recommend setting up SMS fallback so that if a recipient can't receive RCS, Twilio can deliver messages using SMS instead. For SMS fallback to work properly:

* You must have set up a Messaging Service.
* The sender pool for your Messaging Service must include both your RCS sender and an SMS-capable sender.
* If you want to send messages in the US, you must have completed [A2P 10DLC registration](/docs/messaging/compliance/a2p-10dlc) for your SMS sender.

To configure SMS fallback, connect your Studio Flow to the phone number associated with your RCS sender.

1. In Twilio Console, go to **Products & Services > Numbers & Senders > Phone Numbers**, then select your phone number.
2. On the **Configuration Details** tab, in the **Messaging** section, configure the following:
   * **Messaging Service**: Select the service that contains your RCS sender.
   * **Configure with**: Leave this field set to **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
   * **When a message comes in**: Set to **Studio Flow**, then select the Flow you want to connect.
   * **Primary handler fails**: Set to the same Flow you selected in the previous field.

## How RCS messaging works in Studio

Learn how Studio handles different RCS configurations for inbound and outbound messages.

### Receive RCS messages from an inbound Flow

If your RCS sender is linked to a Messaging Service, Studio treats RCS and SMS messages from the same end-user phone number in a similar way. This allows for seamless SMS fallback and keeps replies in the same Execution.

In the message data, you'll notice the following:

* The user's address (represented by the [Contact variable](/docs/studio/user-guide#contact-variables) `{{contact.channel.address}}` or the `to` parameter in a Studio API call) doesn't include the  `rcs:` prefix before the number.
* The flow address (represented by the [Flow variable](/docs/studio/user-guide#flow-variables) `{{flow.channel.address}}` or the `from` parameter in a Studio API call) is the Messaging Service SID.

By default, the Send Message and Send & Wait For Reply widgets send messages using the Messaging Service. If the recipient's device supports RCS, the message is sent using your RCS sender. Otherwise, it's sent using your SMS sender.

If your RCS sender isn't linked to a Messaging Service, both the user and flow addresses include the `rcs:` prefix, since the message can only be sent as RCS.

### Send RCS messages from an API-triggered Flow

To send an outbound RCS message, use the Execution resource to [create a new execution](/docs/studio/rest-api/execution#create-a-new-execution). When you pass the request body, the pattern for the `to` and `from` parameter values depends on whether you're using a Messaging Service and have SMS fallback configured.

These patterns are possible, depending on your RCS setup.

```bash {title="Messaging Service with SMS fallback (recommended)"}
{
  "To": "+15551234567",
  "From": "MG11111111111111111111111111111111",
}
```

This pattern sends the message as RCS when available and falls back to SMS automatically if the message can't be delivered as RCS.

```bash {title="Messaging Service without SMS fallback"}
{
  "To": "rcs:+15551234567",
  "From": "MG11111111111111111111111111111111",
}
```

This pattern sends the message as RCS only. However, SMS replies from the recipient continue the same Execution.

```bash {title="RCS sender ID directly"}
{
  "To": "rcs:+15551234567",
  "From": "rcs:your_sender_id",
}
```

This pattern sends the message as RCS only, and SMS fallback doesn't work, even if the RCS sender is associated with a Messaging Service. If the recipient replies with SMS, a new Execution is created, and the original Execution is stuck unless the end user replies with RCS again.

Because of potential stuck messages, we don't recommend this pattern. We recommend using a Messaging Service SID as the `From` address instead.

## Troubleshooting

If an RCS message doesn't reach your Flow, check the following:

* Confirm the RCS sender's Incoming Messages and Status callback webhooks point to your Studio Flow.
* If using SMS fallback, confirm the underlying phone number's Messaging webhooks also point to the Flow.
* Make sure your account is enabled for RCS in Studio.
* If RCS can't send or the user turns off RCS mid-flow, you may see "Delivery Failure" or "Failed to Send" error (for example, [Twilio Error 63036](/docs/api/errors/63036)).
* You can't use Twilio numbers as RCS test devices. To test your setup, use an Android device that you allowlist during RCS onboarding.
