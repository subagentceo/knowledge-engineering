# Get started with Facebook Messenger (public beta)

> \[!IMPORTANT]
>
> Facebook Messenger is available as a Public Beta product, and the information contained in this document is subject to change.
>
> Some features aren't yet implemented, and others may change before the product becomes Generally Available (GA). Public Beta products aren't covered by a Service Level Agreement (SLA).

In this tutorial, you'll complete the setup and configuration required to [send a message with Facebook Messenger](/docs/messaging/tutorials/send-message-with-facebook-messenger).

## Review considerations

* Facebook Messenger is a user-initiated channel. End users must reach out to your business before you can respond.
* Independent Software Vendors (ISVs) and Software Integrators (SIs) managing Facebook Messenger communications on behalf of clients must obtain admin access to each Facebook Page.
* You can use up to 25 Facebook pages per Twilio account or subaccount. To use additional Facebook Pages, use [subaccounts](https://help.twilio.com/hc/en-us/articles/360011132374-Getting-Started-with-Twilio-Projects-and-Subaccounts).

## Complete the prerequisites

Complete these steps before you set up messaging with Facebook Messenger:

* [Sign up for a Twilio account](https://www.twilio.com/try-twilio).
* [Create a Facebook Page for your business](https://www.facebook.com/business/help/473994396650734?id=939256796236247).
* Set up a callback webhook URL. To learn more, see [Twilio's request to your incoming message Webhook URL](/docs/messaging/guides/webhook-request).

## Set up messaging with Facebook Messenger

Users communicate with your brand by messaging your Facebook Page. Twilio creates a Sender for each Facebook Page that you set up in the Twilio Console.

Follow these steps to set up messaging with Facebook Messenger.

## Console

1. Install Facebook Messenger in the Twilio Console and connect to Facebook.

   1. Open the [Channels page in the Twilio Console](https://1console.twilio.com/us1/develop/sms/channels).
   2. Click **Facebook Messenger**.
   3. Click **Install**.
   4. Agree to the terms of service and click **Agree & Install**.
   5. Click **Connect with Facebook**. Log in and follow the prompts to select the Facebook Pages to authorize as Senders.
2. Configure a Facebook Page to use as a Sender.

   1. (Optional) In the **Unique Name** field, enter a name for your page.
   2. In the **Select a Page** field, select a Facebook Page to use as a Sender.
   3. In the **Callback URL** field, enter the callback webhook URL you set up.
   4. Click **Save**. Twilio creates an instance of the Facebook Page that you can use as a Sender.
3. (Optional) Configure additional fields.

   After you authenticate and configure a Facebook Page to use as a Sender, you can configure the following optional parameters:

   | Configuration parameter | Description                                                                                                                                                                                  |
   | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Callback method         | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Callback URL.                                                                                                         |
   | Fallback URL            | URL to which Twilio calls if the Callback URL returns an error.                                                                                                                              |
   | Fallback method         | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Fallback URL.                                                                                                         |
   | Status callback URL     | A URL that Twilio calls when an outbound message's status changes. To learn more, see [Track the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status). |
   | Status callback method  | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Status Callback URL.                                                                                                  |
4. (Optional) Add more Senders.

   To configure more than one Facebook Page as a Sender, click **Add Another Instance** and repeat the previous steps for each Facebook Page.

## Legacy Console

1. Install Facebook Messenger in the Twilio Console and connect to Facebook.

   1. Open the [Channels page in the Twilio Console](https://www.twilio.com/console/channels).
   2. Click **Facebook Messenger**.
   3. Click **Install**.
   4. Agree to the terms of service and click **Agree & Install**.
   5. Click **Connect with Facebook**. Log in and follow the prompts to select the Facebook Pages to authorize as Senders.
2. Configure a Facebook Page to use as a Sender.

   1. (Optional) In the **Unique Name** field, enter a name for your page.
   2. In the **Select a Page** field, select a Facebook Page to use as a Sender.
   3. In the **Callback URL** field, enter the callback webhook URL you set up.
   4. Click **Save**. Twilio creates an instance of the Facebook Page that you can use as a Sender.
3. (Optional) Configure additional fields.

   After you authenticate and configure a Facebook Page to use as a Sender, you can configure the following optional parameters:

   | Configuration parameter | Description                                                                                                                                                                                  |
   | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Callback method         | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Callback URL.                                                                                                         |
   | Fallback URL            | URL to which Twilio calls if the Callback URL returns an error.                                                                                                                              |
   | Fallback method         | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Fallback URL.                                                                                                         |
   | Status callback URL     | A URL that Twilio calls when an outbound message's status changes. To learn more, see [Track the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status). |
   | Status callback method  | [HTTP method](/docs/usage/requests-to-twilio#http-methods) to use with Status Callback URL.                                                                                                  |
4. (Optional) Add more Senders.

   To configure more than one Facebook Page as a Sender, click **Add Another Instance** and repeat the previous steps for each Facebook Page.

## Send messages with Facebook Messenger

To learn how to send messages with Facebook Messenger, see [Send a message with Facebook Messenger (public beta)](/docs/messaging/tutorials/send-message-with-facebook-messenger).
