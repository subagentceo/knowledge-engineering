# Verify Push & Silent Device Approval Overview

## What is Verify Push & Silent Device Approval?

Verify Push helps you verify users by adding a low-friction, secure, cost-effective, "push" authentication factor into your own mobile apps. This fully managed API service allows you to seamlessly verify users in-app via a secure channel, without the risks, hassles or costs of One-Time Passcodes (OTPs).

The same API behind Verify Push can also be used to perform Silent Device Approvals (SDAs), which are invisible to the end-user and don't require push notifications.

## Start Building

* [Technical Overview](/docs/verify/push/technical-overview)
* [Android Quickstart](/docs/verify/quickstarts/push-android)
* [iOS Quickstart](/docs/verify/quickstarts/push-ios)

## Watch the Wise demo

See how Wise (formerly TransferWise) added the Verify Push experience into their [mobile app](https://play.google.com/store/apps/details?id=com.transferwise.android\&hl=en_US\&gl=US), securing over 8 million user accounts:

https://www.youtube.com/watch/?v=NbM0PtOnyzM

## FAQs

**How does Verify Push work?**

Verify Push & SDA consists of an API and open-source Client Libraries (SDKs)\*. These components work together to turn your user's devices into a secure key via a well-known method called public-key cryptography. To learn more about this method, [check out this talk by @PhilippeDeRyck](https://slideslive.com/38941584) starting at 1:28:00.

**Does Verify Push require Push Notifications?**

An understandable misconception is that Verify Push requires push notification (FCM, APNs) to work. This is not the case, because the critical flows of Verify Push will work without relying on push notifications that may not be successfully delivered 100% of the time. However, the user experience of Verify Push can be greatly improved by sending a push notification whenever possible to your user's device to prompt them on the lock screen to open up your mobile app to view and approve/deny the verification request (challenge).

**Which use cases can Verify Push replace SMS/Voice OTP?**

Verify Push SDK can replace SMS/Voice OTP for Authentication use cases, but not Account Creation use cases. How much each use case contributes to your overall verification volume varies widely depending on your product's design and usage patterns.

![Table showing Verify Push use cases for authentication and account creation with checkmarks for supported scenarios.](https://docs-resources.prod.twilio.com/bdb4fb1019dbd2e81098b45ba07eabfbd83cc4f07e8fa565351375ea310050cd.png)

**Are you going to deprecate Twilio Authy OneTouch?**

> \[!WARNING]
>
> As of November 2022, Twilio no longer provides support for Authy SMS/Voice-only customers. Customers who were also using Authy TOTP or Push prior to March 1, 2023 are still supported. The Authy API is now closed to new customers and will be fully deprecated in the future.
>
> For new development, we encourage you to use the [Verify v2 API](/docs/verify/api).
>
> Existing customers will not be impacted at this time until Authy API has reached End of Life. For more information about migration, see [Migrating from Authy to Verify for SMS](https://www.twilio.com/blog/migrate-authy-to-verify).

Authy OneTouch will be fully deprecated and replaced by Verify Push. More questions? [Get in touch, we're happy to talk through your options.](https://www.twilio.com/en-us/help/sales)

**What's the difference between Verify Push and Authy Push (OneTouch)?**

In general, Verify Push is our newer, better version of Authy "OneTouch" push authentication.

We named Twilio Verify Push SDK to reflect how this new feature fits into the overall Twilio product taxonomy below. Twilio Authy is shown for comparison.

* [**Verify**](/docs/verify/api) - API platform
  * **Push** - verification factor/channel name

    * **SDK** - client SDK option for integration into 3rd-party app
* **[Authy](/docs/authy/api)** - API platform
  * [**OneTouch**](/docs/authy/api/push-authentications) - existing push verification factor/channel into Authy App
* [**Authy app**](https://authy.com/) - free consumer mobile/desktop authenticator app

The new version enables a similar end-user experience, but we've dramatically improved privacy, security, control, and ease-of-implementation. We've taken all the learnings from customers using Authy in the real world and re-imagined the product from the ground-up. It's under the Verify name to indicate that the new version is built on the Verify platform, our single, omnichannel API for developers to add user verification across SMS, Voice, Email, and now Push channels going forward.

Here is a non-exhaustive list of improvements included in Verify Push:

* **No PII required.** Authy requires the user's phone # and email. Some customers were not comfortable asking for / providing this PII data.
* **More control of user identity.** With Authy, the end user controlled their own user identity (Authy ID), which was shared across Authy API customers. This meant that a customer couldn't update their user's phone number if it changed - the user had to go through Authy's phone change process themselves. With Verify Push, customers create and control their users identities.
* **More control of registered devices.** Verify Push lets customers remove a registered device or send a Challenge to a specific registered device. This is not possible with the current version of the Authy API.
* **Improved developer experience.** Verify Push SDKs are smaller than their Authy predecessor and are available as inspectable code libraries.
