# Verify RCS Upgrade

## What is RCS

RCS is an enhancement of the SMS channel, delivering messages over Wi-Fi and cellular to the default SMS messaging app on Android, [Messages by Google](https://play.google.com/store/apps/details?id=com.google.android.apps.messaging\&hl=en_US\&gl=US). RCS messages are more secure, because they are [encrypted](https://developers.google.com/business-communications/rcs-business-messaging/support/data-security#message_storage_and_encryption) between Twilio and Google's servers and between Google's servers and the end-user's device. They can also have lower delivery latency. RCS functionality is limited to compatible devices and is initially available in a select number of countries, with plans to expand over time.

## Verify's support for RCS

Twilio Verify will automatically upgrade delivery of your OTP messages via RCS instead of SMS whenever possible; and if we determine that it exhibits the same or better performance, as measured by Verification Success Rate and Messaging Cost Per Successful Verification.

## Message recipient experience

Your end-user receives the RCS message from Verify on the default SMS messaging app on Android, [Messages by Google.](https://play.google.com/store/apps/details?id=com.google.android.apps.messaging\&hl=en_US\&gl=US) They do not need to know in advance that they are receiving an RCS instead of an SMS message, because it appears in the same app and looks similar.

![Google Messages showing ACME verification code 123456 with copy option.](https://docs-resources.prod.twilio.com/ada9a4737fb8896028c022a4b191a1525a1b66992112c239d58af1d63b74aed8.jpg)

## **Billing**

Delivered messages over RCS will continue to be billed to you as SMS messages. Your total messaging bill could be lower as a result of the upgrade for two reasons:

1. Unlike SMS, RCS messages will not be billed if they are sent, but not delivered.
2. SMS has a [message character limit](/docs/verify/developer-best-practices#limit-sms-messages-to-one-message-segment-to-avoid-extra-cost) that can sometimes cause OTP messages to be split into 2+ message segments, each of which is billed as their own SMS message. RCS has a much larger character limit, such that OTP messages will not be split.

## FAQs

**Can I opt-out of this RCS upgrade?**

If you do not want Verify to automatically upgrade your messages to RCS, complete this [opt-out form](https://forms.gle/ZSAom3zwLNzjj7cWA). There is not a way to specify RCS or not when sending an individual message.

**How do I know if an RCS upgrade was attempted?**

There are two ways to check if an RCS message is sent: by checking the Verify Console Log or using the [Verification Attempts API](/docs/verify/api/attempts). The response body of a [Create Verification](/docs/verify/api/verification) request will remain unchanged after this upgrade. Both RCS and SMS messages are included in a single Verification Attempt, identified by the same Attempt SID.

**How do I know if an RCS message was successfully delivered?**

In the Verify Console Logs, for a given Verification Attempt, the last message delivery attempt will be displayed. For example, if an RCS message was sent and delivered, then the Outcome would show "Code sent via RCS" and Delivery Status would show "Delivered". However, if there was a failover to SMS, then the Outcome would show "Code sent via SMS".

![Verification details showing code sent via RCS, status approved, sent to +573045261847.](https://docs-resources.prod.twilio.com/bb94c9cd4b55b74b3a68635ea0b364b6c83506f36bfb5a3d90d05fbf2caf7ea2.png)

![Verify logs with RCS channel filter selected, showing approved verifications.](https://docs-resources.prod.twilio.com/90a8b36921dda8763b78cbcf8b9a8929cc46af4f27d89a00c1009067d01ee5d1.png)

**How does Verify measure performance when optimizing between use of RCS and SMS?**

Verify measures two key performance metrics:

Verification Success Rate: Of the [Verifications](/docs/verify/api/verification) created by calling the Verify API, the percentage that ended in `status=approved`. Per-Message (Attempt) Conversion Rate is not the same as this, because a single Verification session can contain multiple message attempts. However, the two metrics are correlated.

Messaging Cost Per Successful Verification: Sum of the prices billed to the Twilio customer for all billed SMS and RBM messages for all Verifications (regardless of Verification status) DIVIDED by the total number of Successful Verifications (Verification `status=approved`).
