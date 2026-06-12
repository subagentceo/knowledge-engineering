> ## Documentation Index
> Fetch the complete documentation index at: https://developer.arkoselabs.com/llms.txt
> Use this file to discover all available pages before exploring further.

# React Native Mobile SDK

# Introduction

The React Native ArkoseLabs SDK lets you integrate Arkose Labs' bot mitigation and fraud prevention solution into your React Native apps using native function calls for Android and iOS. This guarantees seamless integration with Arkose's full interactive challenges for detection and enforcement, without the extended wait times for separate mobile solutions.

This page covers the Mobile SDK for React Native. If you are developing for Android or iOS natively, see the [Android Mobile SDK](https://developer.arkoselabs.com/docs/android-mobile-sdk) or [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk) page.

Arkose Mobile SDK for React Native:

* Wraps Arkose's Advanced Enforcement Challenge in native Android/iOS "web views".
* Ensures 1-to-1 feature availability between the native Android/iOS SDKs and the React Native SDK.
* Integrates with your apps through a React Native Bridge.
* Handles errors and challenge interactions through callback events.
* Complies with Arkose Internal Security guidelines.
* Complies with Google Play Store and Apple App Store guidelines for seamless integration.
* Is fully compatible with new Enforcement Challenge-API (EC-API) releases.
* Supports minimum Android OS version 5.0 and iOS version 12.0.

## Mobile SDK High Level Design

![](https://files.readme.io/60d1bae5e588f8b7589ba1f9d75a2fa68e8d86a4ff12088439c3fa842b88c1b2-image.png)

## Architecture

The SDK uses a **React Native Bridge** to enable communication between the React Native JavaScript layer and the native iOS/Android SDKs. All existing detection and challenge features on our native Android/iOS SDKs are also available in the React Native SDK.

### New in v2.15.0 and above - React Native New Architecture support

The SDK now supports **both** React Native's **Old Architecture** and the **New Architecture (Fabric / TurboModules)**. You can select the architecture per platform using the standard React Native / Expo flags (see *Architecture Selection* below).

For **Expo** projects, v2.15.0 introduces a **required config plugin** that must be enabled in `app.json`. See *React Native Expo* below.

## Security

The SDK is reviewed by Arkose Labs Security and complies with the respective guidelines of the Apple App Store and Google Play Store. The SDK ensures secure handling of challenges and user interactions, adhering to industry standards for data protection and safety.

## Performance

We created the Arkose Labs Mobile SDKs with stability and performance in mind. Their use has no significant impact on the host application’s performance.

## Installation

Follow the steps below to set up the ArkoseLabs SDK for React Native in your host application. These steps apply to both iOS and Android, covering detection and enforcement components.

## Prerequisites

Ensure you have the following installed:

* **React Native**: Follow the [React Native Documentation](https://reactnative.dev/docs/set-up-your-environment) guide to set up your environment for iOS and Android.
* **Xcode** (for iOS development).
* **Android Studio** (for Android development).
  * **JDK 17** is required for Android builds. This is mandated by the Android Gradle Plugin 8.x used by React Native 0.73+ and Expo SDK 50+.
  * **Node.js**: 16+
* For the full **end-to-end Arkose setup**, you must also complete the standard [Arkose Server-Side setup instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4).

## Steps for Integration (For v2.13.0 & above)

This guide covers the common steps for installation, followed by platform-specific instructions for React Native CLI and React Native Expo.

### Important migration notice

This version introduces AutoLinking support, which simplifies the integration process. If you are upgrading from v2.12.1 or earlier:

1. **Remove manual linking steps** from your previous integration.
2. **Delete any manually added native module references** in your iOS and Android project files.
3. **Clean and rebuild** your project after installation.

### Step 1: Download the SDK .tgz File

The Arkose Labs Mobile SDKs are available via the Mobile SDK's Support page. Please talk with your CSM (Customer Success Manager) about your intended usage and request access.

Download the SDK `.tgz` file from the appropriate source and place it inside the `app/lib` directory of your project.

### Step 2: Install the SDK .tgz File

There are two options for installing the SDK:

#### **Option 1: Using** `npm install` **directly**

You can directly install the SDK `.tgz` file with the following command:

```
npm install ./lib/react-native-arkoselabs-vx.xx.x.tgz
```

This assumes the `.tgz` file is placed in the `lib` directory of your project.

#### **Option 2: Manually editing** `package.json`

Alternatively, you can modify the `package.json` file to include the SDK as a local dependency. Add the following line to the `dependencies` section of your `package.json`:

```
"react-native-arkoselabs": "file:./lib/react-native-arkoselabs-vx.xx.x.tgz"
```

Then, run the following command to install dependencies:

```
npm install
```

<br />

## Architecture Selection

The SDK works with both architectures. Select your architecture before building:

### React Native CLI

**Android:** set `newArchEnabled=true` (New) or `newArchEnabled=false` (Old) in `android/gradle.properties`.

**iOS:** run pod install with `RCT_NEW_ARCH_ENABLED=1` (New) or `RCT_NEW_ARCH_ENABLED=0` (Old):

```
cd ios 
RCT_NEW_ARCH_ENABLED=1 pod install 
cd ..
```

### Expo

Set `"newArchEnabled": true` (or `false`) under `"expo"` in `app.json`, then run:

```
npx expo prebuild --clean
```

<br />

## React Native CLI

Follow these steps if you are using a standard React Native CLI project.

### Step 1: Link Native Dependencies

After the `npm install` is complete, you must link the native packages. This version will auto-link the packages.

#### **To install iOS:**

```
cd ios
pod install
cd ..
```

#### **To install Android:**

```
cd android
./gradlew clean
./gradlew build
cd ..
```

### Step 2: Run the App

```
# To run Android
npx react-native run-android 

# To run iOS
npx react-native run-ios
```

### Optional Step: Fix Watchman Issues

```
watchman watch-del-all
```

<br />

## React Native Expo

Follow these steps if you are using an **Expo** project.

### Step 1: Enable Arkose config plugin (Starting SDK v2.15.0)

For Expo projects, you must add the Arkose config plugin to the `plugins` array in your `app.json` (or `app.config.js`). This allows the SDK to wire its native Android component into your app during pre-build:

```
{
"expo": {
    .
    .
    .
    "plugins": [
      "react-native-arkoselabs/app.plugin.js"
    ]
  }
}
```

<Callout icon="📘" theme="info">
  Reference the plugin by its explicit path `react-native-arkoselabs/app.plugin.js`.
</Callout>

### Step 2: Pre-build the App

```
npx expo prebuild --clean
```

### Step 3: Run the App

```
# To run Android
npx expo run:android 

# To run iOS
npx expo run:ios
```

<br />

## Code Snippets

### Initialize SDK

Here’s how you initialize the ArkoseLabs SDK with configuration settings. This setup is crucial for using any of the SDK's features.

```javascript
import { ArkoseEvents, ArkoseManager } from "react-native-arkoselabs";
const arkoseConfig = {
  apiKey: 'your-api-key',              // Your API key from Arkose Labs
  apiBaseUrl: '<Actual API Base URL>', // Set the API base URL
  language: '',                         // Optional: Set language
  clientAPIRetryCount: 0,               // Optional: Number of retries on client-side errors
  styleTheme: '',                       // Optional: Set style theme
  ignoreCookiePersistence: true 		 // Optional: Only for iOS Simulator issue
  challengeBackgroundConfig: {          // Optional: Only for iOS
	isOpaque: true,
	blurEffect: true,
  	backgroundColor: #RRGGBBAA or #RRGGBB
  }
  showActivityIndicatorOnReset: true     // Optional: Only for iOS to set loader on Reset Time
  loading: true 					// Optional: Only for Android to set loader on Enforcement start
  enableBackButton: true 			// Optional: Only for Android to enable the back button function
  dismissChallengeOnTouchOutside: true  //  Optional: Only for Android allow you to outside tab to close the Enforcement
  viewFrameAnimation: 60               // Optional: Only for Android allow to modify the animation view frame
};
const initializeArkose = () => {
  ArkoseManager.initialize(arkoseConfig);
};
```

### Show Enforcement Challenge

To show the enforcement challenge, use the following function. It also accepts optional parameters like the `cancelButtonTitle` or `resetButtonTitle`, which are applicable only on iOS.

```javascript
import { ArkoseEvents, ArkoseManager } from "react-native-arkoselabs";
import { Platform } from "react-native";
// Define conditional enforcement parameters based on the platform
const enforcementParams = Platform.OS === "ios" ? {
  cancelButtonTitle: "Cancel", // Only for iOS  (Optional)
  resetButtonTitle: "Reset",  // Only for iOS  (Optional)
  withActivity: true, // Only for iOS (Optional)
  withActivityBackgroundAlpha: 0.2 // Only for iOS  (Optional)
} : {};
// Function to show the enforcement challenge
const showEnforcementChallenge = () => {
  ArkoseManager.showEnforcementChallenge(enforcementParams);
};
// Example usage:
<Button onPress={showEnforcementChallenge} title="Show Challenge" />
```

### Arkose Events

The SDK emits several events that can be used to track the state of the challenge and other operations. Here are the available events:

```javascript
import { ArkoseEvents, ArkoseManager } from "../node_modules/react-native-arkoselabs/src";
import React from "react";
import { Alert } from "react-native";
React.useEffect(() => {
  // Optional: Set log level for informational logs
  ArkoseManager.setLogLevel("info");
  // Add event listeners
  ArkoseEvents.addListener("onReady", () => console.log("SDK is ready to trigger the challenge"));
  ArkoseEvents.addListener("onShow", () => console.log("Challenge is starting to show"));
  ArkoseEvents.addListener("onShown", (result) => console.log("Challenge is fully rendered"));
  ArkoseEvents.addListener("onHide", (result) => console.log("Challenge has been hidden"));
  ArkoseEvents.addListener("onSuppress", (result) => console.log("Challenge is suppressed"));
  ArkoseEvents.addListener("onCompleted", (result) => {
    console.log("Challenge completed successfully", result);
    Alert.alert("Challenge Completed", JSON.stringify(result));
  });
  ArkoseEvents.addListener("onFailed", (result) => {
    console.log("Challenge failed", result);
    Alert.alert("Challenge Failed", JSON.stringify(result));
  });
  ArkoseEvents.addListener("onError", (result) => {
    console.error("An error occurred during the challenge", result);
    Alert.alert("Error", JSON.stringify(result));
  });
  ArkoseEvents.addListener("onWarning", (result) => {
    console.warn("A warning was triggered", result);
  });
  ArkoseEvents.addListener("onResize", (result) => {
    console.log("Challenge resized", result);
  });
  ArkoseEvents.addListener("onPrepareForReset", () => {
     console.log("onPrepareForReset event Triggere");
     const config = {
       apiKey: apiKey
     }
     ArkoseManager.update(config); // Update the New Configuration
     ArkoseManager.onResetPrepared(); // Complete the onPrepareForResetCall
  });

}, []);
```

Note that Arkose’s detection component is part of our overall Arkose Bot Manager platform. Thus the names of some methods and variables refer only to enforcement when actually dealing with detection as well. Unless otherwise specified, the configuration components apply to both detection and enforcement components, although perhaps in different ways as specified.

Refer to [Callbacks](https://developer.arkoselabs.com/docs/callbacks) for callbacks/events related to the Arkose Bot Manager platform. The following events are specific the SDKs' behavior.

| Event Name          | Description                                                                                                                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onHide`            | Listener function invoked when the Arkose Bot Manager view is hidden. For example, this happens if the user clicks the close / back button.                                                                                                  |
| `onReset`           | Listener function invoked after the Arkose Bot Manager is reset by the user.                                                                                                                                                                 |
| `onPrepareForReset` | Listener function invoked when the challenge is preparing to reset. This allows you to perform custom UI actions before the challenge reloads. **Note: This event is for iOS only. Call`ArkoseManager.onResetPrepared();` to end this call** |

### `ArkoseConfig` Configuration

| Parameter Name                 | Description                                                                                                                                                                                                                     | Platform      |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| apiBaseUrl                     | Base URL of Arkose Bot Manager as supplied by Arkose Labs for your account.                                                                                                                                                     | iOS & Android |
| apiKey                         | Public key for your account, required for authentication with Arkose Labs.                                                                                                                                                      | iOS & Android |
| apiFile                        | (Optional) Specifies the JavaScript file name used by the SDK. Default: "api.js"                                                                                                                                                | Android only  |
| blobData                       | (Optional) Mainly used to share any client encrypted data blobs with Arkose Bot Manager. Default: `""`                                                                                                                          | iOS & Android |
| challengeBackgroundConfig      | (Optional) An object to configure the challenge background's opacity, blur, and color. See details [here](https://docs.google.com/document/d/1JFd1fvCfreBdnCUaZFjgX5K7I-RAcLnZ9v9gG1pgch8/edit?tab=t.0#heading=h.f388nufyi6n5). | iOS only      |
| clientAPIRetryCount            | (Optional) Specify the number of retries for network issues when connecting to the `apiBaseUrl`. Default: 0                                                                                                                     | iOS & Android |
| dismissChallengeOnTouchOutside | (Optional) Determines whether tapping outside the challenge view dismisses it. Default: true                                                                                                                                    | Android only  |
| enableBackButton               | (Optional) Determines whether the back button is enabled while the challenge is active. Default: true                                                                                                                           | Android only  |
| ignoreCookiePersistence        | (Optional) Set to true to ignore cookie persistence. Useful for privacy-sensitive applications. Default: false                                                                                                                  | iOS only      |
| language                       | (Optional) Language setting for the Enforcement Challenge. Defaults to "en" unless specified otherwise.                                                                                                                         | iOS & Android |
| loading                        | (Optional) Determines whether to display a loader when the challenge starts. Default: true                                                                                                                                      | Android only  |
| noSuppress                     | (Optional) Optionally shows a challenge even  if a challenge is not needed. Set to `true` to display the challenge. Contact your CSM if this option is not working. Default: false                                              | iOS & Android |
| showActivityIndicatorOnReset   | (Optional) Determines whether to display a loading indicator during a reset action. Default: true                                                                                                                               | iOS only      |
| styleTheme                     | (Optional) Style theme setting for the Enforcement Challenge UI. Default: `""`                                                                                                                                                  | iOS & Android |
| timeoutInSecondsUntilReady     | (Optional) Defines how long the SDK will wait (in seconds) before considering the API ready. Default: 0                                                                                                                         | iOS & Android |
| userAgent                      | (Optional) Specify any userAgent setting for ease of testing forced Enforcement Challenge for a session.                                                                                                                        | iOS & Android |
| viewFrameAnimation             | (Optional) Determines how much of the view frame can be customized for animation. Default: 0                                                                                                                                    | Android only  |

### **ChallengeBackgroundConfig (iOS only)**

| Parameter Name  | Description                                                                       |
| :-------------- | :-------------------------------------------------------------------------------- |
| isOpaque        | (Optional) If true, the background will not show any transparency. Default: true. |
| blurEffect      | (Optional) If true, a blur effect is applied to the background. Default: true.    |
| backgroundColor | (Optional) The background color as a hex string (e.g., "#RRGGBB" or "#RRGGBBAA"). |

<br />

# Troubleshooting

## iOS: "Could not find key window" Error

**Problem:** Error appears when initializing SDK on iOS 15+. **Solution:** Update to v2.14.0+, which automatically handles scene-based and legacy window management across Expo and multi-window scenarios.

## Challenge Not Appearing in React Native Modal

**Problem:** Enforcement challenge doesn't trigger inside React Native Modal components. **Solution:** Update to v2.14.0+, which resolves the top-most view controller even when modals are present.

## Android Challenge Not Rendering / onError on Older Devices (System WebView \< 39)

**Problem:** On Android, the SDK initializes but `showEnforcementChallenge` fires `onError` and the challenge never renders. The error references a System WebView version below the required minimum (e.g., "*Detected WebView version of 37 … minimum WebView version 39 required*").

**Solution:** The Arkose challenge requires **Android System WebView version 39 or higher**. This typically affects very old Android versions (e.g., API 21 / Android 5.0, which ships WebView 37). Update the device's Android System WebView, or test on **API 23+** (WebView ≥ 44). Handle the `onError` event gracefully in your integration so older devices degrade cleanly. This requirement is independent of `minSdkVersion` and architecture.

## Android Build Error: "Direct local .aar file dependencies are not supported"

**Problem:** The Android build fails with `Direct local .aar file dependencies are not supported when building an AAR` (the `hasLocalAarDeps` error), typically on newer Android Gradle Plugin versions used by Expo and recent React Native.

**Solution:** Ensure you are on **SDK v2.15.0 or later**, which resolves how the native Android SDK is packaged. Earlier versions could trigger this error on newer Android Gradle Plugin versions.

<br />

# **References**

* [React Native Documentation](https://reactnative.dev/docs/set-up-your-environment) Official guide for setting up and developing React Native apps.
* [Arkose Labs SDK Documentation](https://developer.arkoselabs.com/docs/welcome-to-arkose-labs) Comprehensive documentation for integrating Arkose Labs' bot mitigation and fraud prevention.
* [Android Mobile SDK](https://developer.arkoselabs.com/docs/android-mobile-sdk) Documentation for integrating Arkose Labs' Android SDK.
* [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk) Documentation for integrating Arkose Labs' iOS SDK.