# Use Flex on a mobile device (public beta)

> \[!NOTE]
>
> Flex Mobile (public beta) has reached end-of-sale (EOS), and you can no longer add new users to the app. To learn about future support for Flex Mobile and other options for mobile access to Flex, see the [changelog](https://www.twilio.com/en-us/changelog/flex-mobile-eos).

> \[!IMPORTANT]
>
> Flex Mobile is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by an SLA.

> \[!WARNING]
>
> Flex Mobile is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI.

## Overview

[Flex Mobile](/docs/flex/flex-mobile) lets you send and receive calls and messages from your phone or tablet, giving you the flexibility to stay in touch with customers even when you're away from your desk.

## Mobile requirements

Flex Mobile supports these devices and operating systems:

* iOS version 12.4 and later
* Android version 9 and later

## Download the app

Visit the [App Store (iOS)](https://apps.apple.com/app/id6451207884) or [Google Play (Android)](https://play.google.com/store/apps/details?id=com.twilio.flex) to download Flex Mobile.

We recommend that you turn on automatic updates for the Flex Mobile app to ensure that you're always on the latest version. If you don't turn on automatic updates and your version is no longer supported, you'll need to update to the latest version to continue using the app.

## Log in to the app

The first time you log in, you'll have to enter your Flex runtime domain. This is the part of your Flex URL that comes after `.com`.

For example, if the full URL is `https://flex.twilio.com/unique-domain-1234`, the runtime domain is `unique-domain-1234`. You only have to enter this once. The next time you log in, Flex Mobile will remember it for you.

You'll then see the login screen for your organization's SSO provider (for example, Okta or Google). Log in using your employee username and password.

## Set your availability status

Once you set your status to **Active**, it will stay as **Active** even when you're not using the app. This lets you get a notification any time you receive a new task. There are two ways your status can change:

* You set your status to **Offline**, **Unavailable**, or **Break**.
* You don't respond to a task invite, and it expires. In this case, Flex sets your status to **Offline**.

## Receive a new task

When you receive a task, Flex Mobile sends you a push notification showing whether the task is a new message or voice call. Be aware that your phone doesn't ring to signal an incoming call.

## Attach images and files

If you don't see the file you're looking for, the file may be too large or the extension may not be supported. Your organization sets the size limit and the supported extensions for file attachments. When you try to select a file, Flex Mobile only shows you options that are able to be attached.

## Use Flex Mobile with the web app

You can transfer a call either from web-to-mobile or from mobile-to-web. Once you receive the transferred call, the device you started the transfer from will disconnect.
