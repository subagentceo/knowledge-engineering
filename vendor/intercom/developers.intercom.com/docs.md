# Overview

The Intercom Developer Platform is a suite of [SDKs](/docs/build-an-integration/learn-more/rest-apis/sdks-plugins) and [APIs](/docs/references/2.11/introduction) for building apps that connect with Intercom. You can use these apps to extend the functionality of Intercom or to integrate Intercom with other services.

New to Intercom?
For more information about Intercom products, [visit our main website](https://www.intercom.com/) or read [our user documentation](https://www.intercom.com/help/en/).

## Install Intercom

Install the [Messenger](/installing-intercom) into your product for web or mobile. This will allow your customers to send messages to your Intercom Inbox and provide a way for you to test Messenger integrations.

You can also:

- Make [customizations to the Messenger](/installing-intercom/web/customization)
- Set up [identity verification](/installing-intercom/web/identity-verification)
- Enable push notifications for [iOS](/installing-intercom/ios/push-notifications), [Android](/installing-intercom/android/fcm-push-notifications), and [React Native](/installing-intercom/react-native/push-notifications).


## For Public App Developers

Public apps (sometimes referred to as integrations) are apps that are available for any customer to install. These apps have access to other peoples' Intercom data, which means there are specific requirements in order to publish them, such as setting up OAuth and submitting to the Intercom team for review.

### Set up a development workspace

To develop a public app you will need to use a development workspace: [sign up here](https://app.intercom.com/admins/sign_up/developer) to create your free account.

This will give you access to your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub), where you can configure webhooks, define your endpoints for Messenger and Inbox apps, set up OAuth, and submit your app for review.

Development Workspaces vs. Paid Workspaces
Development workspaces have [limitations listed here](/docs/build-an-integration/getting-started#step-1-create-an-intercom-workspace) and do not have the full functionality of a paid Intercom workspace. Development workspaces are only available for the US region.

### Build your app

Here's the fun part! Build your app using any stack you'd like. For apps that are sent via the Messenger or available for the teammates in the Inbox, you'll need to use our [Canvas Kit](/docs/canvas-kit) framework.

To see how it works, try [building an app for Inbox](/docs/build-an-integration/getting-started/build-an-app-for-your-inbox) or [building an app for Messenger](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger).

You are also required to [set up OAuth](/docs/build-an-integration/learn-more/authentication/setting-up-oauth) so that your app has permission to access and interact with customers' data.

We recommend creating a `[Staging]` or `[Dev]` app and a `[Production]` app to assist in the development process.

### Submit for review

Once development is done and OAuth is configured, in the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) of your `[Production]` app you can choose the [listing type](/docs/publish-to-the-app-store/listing-your-app), provide [installation URLs](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps), and follow the steps outlined in [this guide](/docs/publish-to-the-app-store/review-publish-your-app) to submit it for review.

Make sure that your app follows our [developer terms](/docs/publish-to-the-app-store/intercom-developer-terms) and [platform guidelines](/docs/publish-to-the-app-store/intercom-platform-guidelines). Once it's approved, your app is ready to be used by any of Intercom's 25K+ customers.

## For Private App Developers

Private apps are apps that you can build specifically for your Intercom workspace that only access your own data. You can build a private app using your Access Token and it does not require a review.

### Install apps from the App Store

Your team probably needs to integrate with other tools; we might have an app for it. Install connectors to tools you already use, like:

- [Slack](https://www.intercom.com/app-store?app_package_code=slack-for-intercom)
- [Stripe](https://www.intercom.com/app-store?app_package_code=stripe)
- [WhatsApp](https://www.intercom.com/app-store/apps/whatsapp-fqam)
- [Salesforce](https://www.intercom.com/app-store/apps/salesforce-by-intercom)


Available apps can be discovered and installed in the [Intercom App Store](https://www.intercom.com/app-store), including apps built by Intercom, and apps built by other companies.

### Build your own integration

If you aren't able to find an existing [app](https://intercom.com/app-store) that solves the problem you're facing, you can build your own using our [REST APIs](/docs/build-an-integration/getting-started) and [Canvas Kit](/docs/canvas-kit) framework.

Go to the Developer Hub and [create a new app](/docs/build-an-integration/getting-started#step-2-create-an-app). Make sure it's associated with your main Intercom workspace from the dropdown. Then you can use the [Access Token](/docs/build-an-integration/learn-more/authentication#access-tokens) from that app to start building.

Your app can be whatever you want — to see how it works, try [building an app for Inbox](/docs/build-an-integration/getting-started/build-an-app-for-your-inbox) or creating your own [reports using the API](/docs/guides/reporting/ai-agent-report). You can find more guides to help you build under the Guides section in the sidebar.

### Configure your app

Your app should already be installed on the workspace where you created it. To uninstall the app, add it to another workspace, or regenerate the token, go to **Your Workspaces** in your Developer Hub — [this guide](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps#install-your-app-on-your-own-workspaces) will show you how. You can start using your app right away, and no review is required for a private app.

## Getting help

Let us know
If you have any feedback on our developer documentation, please let us know what you think in the forms at the bottom of each page. Report issues with code blocks by clicking the feedback icon in the top right of the block.

Join our [Intercom Community](https://community.intercom.com/) to get help, chat to Intercom experts, and connect to other developers building with Intercom. If you need immediate assistance, contact Intercom customer support directly using the Messenger in the bottom right of this page.