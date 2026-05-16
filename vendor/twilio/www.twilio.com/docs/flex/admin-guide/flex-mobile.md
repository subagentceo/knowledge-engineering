# Manage Flex Mobile (public beta)

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

[Flex Mobile](/docs/flex/flex-mobile) is a pre-built mobile app you can add to your existing Flex instance with no additional development effort. It lets agents access the same phone numbers, queues, and customer data and contribute to the same reporting as when they use Flex from their desktops. Agents can seamlessly transition between the Flex desktop experience and Flex Mobile by transferring a voice call or messaging conversation from one device to another.

## Technical requirements

* We recommend using the latest available version of Flex. To check your version, see your [Flex Overview](https://console.twilio.com/us1/develop/flex/overview) in Console.
* You must have [SSO configured](/docs/flex/admin-guide/setup/sso-configuration). This is the only login method that Flex Mobile supports.

## Limitations

* You can't log in to Twilio Console using Flex Mobile.
* [Flex plugins](/docs/flex/developer/ui-and-plugins) aren't supported for mobile, but some plugin functionality (like VoIP calling and displaying media attachments) is available as native Flex Mobile features.
* You can't currently modify the Flex Mobile UI. However, Flex Mobile does use backend customizations to your Flex instance, like your TaskRouter routing rules and queue configurations or your Flex settings specific to Voice and Messaging.
* Flex Mobile supports Flex Conversations only if your account is running Flex UI 2.x.x or later.

## Mobile timeout periods

Agents often need to remain logged in and available even when they're not actively using Flex Mobile. Because of this, the app offers an extended timeout period that you can take advantage of if you're using enhanced SSO.

| Type of SSO  | Inactivity timeout period | Absolute timeout period |
| ------------ | ------------------------- | ----------------------- |
| Legacy SSO   | 1 hour                    | 24 hours                |
| Enhanced SSO | 7 days                    | 9 days                  |

To understand the different types of SSO and determine which type your account uses, see [Enhanced and legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration). You can migrate to enhanced SSO if your account uses Flex UI 2.7.x or later.

## SSO login workflows

When logging in to Flex Mobile, the workflow you experience depends on whether your account uses [enhanced or legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration). As of Flex Mobile version 0.11.0, the app handles enhanced SSO login using a system browser to launch your IdP login screen, while legacy SSO login continues using an embedded web view. Because the legacy SSO workflow can sometimes encounter problems with how the user-agent gets identified to the IdP, we recommend [migrating to enhanced SSO](/docs/flex/admin-guide/setup/sso-configuration/migration-guide). After migrating, Flex Mobile will automatically start using the enhanced SSO workflow.

## Download the app

Visit the [App Store (iOS)](https://apps.apple.com/app/id6451207884) or [Google Play (Android)](https://play.google.com/store/apps/details?id=com.twilio.flex) to download Flex Mobile.

We recommend that you turn on automatic updates for the Flex Mobile app to ensure that you're always on the latest version. If you don't turn on automatic updates and your version is no longer supported, you'll need to update to the latest version to continue using the app.

## Log in to the app

The first time you log in, you have to enter your Flex runtime domain. To identify this for your organization:

1. Open Twilio Console and go to **Flex** > **Users and access** > **Single sign-on (SSO)**.
2. In **SSO login URL**, the runtime domain is the part of your Flex URL that comes after `.com`. For example, if the full URL is `https://flex.twilio.com/unique-domain-1234`, the runtime domain is `unique-domain-1234`. You only have to enter this once. The next time you log in, Flex Mobile will remember it for you.

You'll then see the login screen for your organization's identity provider. Log in using your employee credentials.

## Restrict mobile login

User access to Flex Mobile is handled according to your IdP's access policies. If needed, you can create a conditional access policy for sign-on that prevent users from logging in to Flex Mobile based on their device type or platform.

To restrict access to Flex Mobile, reference the examples below when creating your access policy. These show the format for device data passed to the IdP when a user tries to log in to Flex Mobile.

**Example for iOS**

`Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`

**Example for Android**

`Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64 Build/UPB5.230623.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.136 Mobile Safari/537.36`

To restrict all mobile access to Flex (either using Flex Mobile or a mobile web browser), create an access policy that prevents login from any device where `Mobile` is passed in the device information.
