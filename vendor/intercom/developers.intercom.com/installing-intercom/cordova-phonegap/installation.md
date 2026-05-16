# Installation

This is a plugin that allows your Cordova app to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and/or [Intercom for Android](https://github.com/intercom/intercom-android).
If you’re new to Intercom, you’ll need to [create an account and start your free trial](https://www.intercom.com).

> 👍 OS Requirements
Intercom for iOS supports iOS 15+.
Intercom for Android supports API 24 and above.


First you’ll need to ensure that both the [Android](https://app.intercom.com/a/apps/_/settings/android) and [iOS](https://app.intercom.com/a/apps/_/settings/ios) Messengers are enabled from inside the Intercom settings panel. When either of these platforms are disabled, requests from that platform to Intercom will fail.

## Step 1 - Install Intercom

## Cordova

To install the plugin in your Cordova app, run the following:


```
cordova plugin add cordova-plugin-intercom
```

## Step 2 - Initialize Intercom

First, you'll need to get your **Intercom app ID** and iOS/Android **API key**. To find these, just select the **'Intercom for iOS'** or **'Intercom for Android'** option in [Settings > Installation > iOS / Android](https://app.intercom.io/a/apps/_/settings/ios).

![](/assets/4f6626b-mobile_api_keys.685a7c7800c43d91fc1ba4f608f10c901999450551acbee9f5e0f688b0d07b92.71a4f21c.png)

Then initialize Intercom by importing Intercom and adding the following to your `config.xml`:


```xml
<preference name="intercom-app-id" value="your_app_id"/>
<preference name="intercom-ios-api-key" value="ios_sdk-..."/>
<preference name="intercom-android-api-key" value="android_sdk-..."/>
```

# What next?

Once you've installed Intercom you can start using Intercom in your Cordova app.

- [Configure it for your Cordova app](https://developers.intercom.com/installing-intercom/cordova-phonegap/using-intercom/).
- [Enable push notifications](https://developers.intercom.com/installing-intercom/cordova-phonegap/push-notifications/) so you can send push messages.
- [Enable Identity Verification](https://developers.intercom.com/installing-intercom/cordova-phonegap/identity-verification/) for your Cordova app.