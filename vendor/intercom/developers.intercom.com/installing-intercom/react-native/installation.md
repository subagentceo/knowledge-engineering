# Installation

The Intercom React Native wrapper allows you to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and [Intercom for Android](https://github.com/intercom/intercom-android) in your React Native apps.

If you’re new to Intercom, you’ll need to [create an account and start your free trial](https://www.intercom.com).

### Supported versions

- The Intercom React Native wrapper supports version **0.59** of React Native and above.
- Intercom for iOS supports **iOS 15** and above.
- Intercom for Android supports **API 23** and above.


## Enable in your workspace

Enable the [Android](https://app.intercom.com/a/apps/_/settings/android) and [iOS](https://app.intercom.com/a/apps/_/settings/ios) Messengers from the toggles in the Intercom settings panel. When either of these platforms are disabled, requests from that platform to Intercom will fail.

![](/assets/react-native-installation-toggle.5bdca7a627dd19617b2eb638552d620264ddf037a7a056790da4a248ef650675.71a4f21c.png)

## Step 1 - Adding the wrapper

To install Intercom you'll need to add the wrapper to your React Native project using the following snippet:

```text
yarn add @intercom/intercom-react-native
```

```text
npm install @intercom/intercom-react-native
```

There are separate steps for setting up Android and iOS. If your React Native app does not support Android skip to [Step 3](https://developers.intercom.com/installing-intercom/docs/react-native-installation#section-step-3-ios-setup).

## Step 2 - Android Setup

You'll need to take steps to link the wrapper in your project. These vary based on your apps React Native version.

### Using React Native v0.60 and above

If you're using React Native v0.60 or above, the library will be linked automatically

### Automatic linking with React Native v0.59

To automatically link the Intercom React Native wrapper in v0.59 of React Native run the following command:

```text
react-native link @intercom/intercom-react-native
```

### Manual linking with React Native v0.59

If you prefer to manually link libraries, add the following snippet to `android/settings.gradle`:

```groovy
include ':intercom-react-native'
project(':intercom-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/@intercom/intercom-react-native/android')
```

Inside the dependancies block of `android/app/build.gradle` add the following line:

```groovy
dependencies {
  implementation project(':intercom-react-native')
}
```

Apps using a React Native version < 0.65
React Native versions below 0.65 use OkHttp 3. The Intercom SDK currently uses OkHttp 4.
There is a problem with compatibility between those two versions which may result in crashes.

If you need to use a React Native version < 0.65, prevent the compatibility issue by adding an explicit dependency on `okhttp-urlconnection` to dependencies in `app/build.gradle`:

```
dependencies {
  implementation("com.squareup.okhttp3:okhttp-urlconnection:4.9.1")
  [...]
}
```

## Initialize Intercom

Want to initialize Intercom manually?
If you want to initialize Intercom from JavaScript instead of native code, skip this section and jump to [Manual Initialization](#manual-initialization) below.

Minimum Android SDK and build tools versions
The `minSdkVersion` in `build.gradle` needs to be to `23` or greater.

In the dependencies block of the `build.gradle` make sure that `com.android.tools.build:gradle` is at version `4.0.1`

You'll need to update the `MainApplication.java` class. First add the import `com.intercom.reactnative.IntercomModule` at the top of the class.

Then in the `onCreate` method, add the snippet below using the `apiKey` and `appId` found in your [workspace settings](https://app.intercom.com/a/apps/_/settings/android).

```java
import com.intercom.reactnative.IntercomModule; //  <-- Add this line

// ...

@Override
public void onCreate() {
  super.onCreate();
  SoLoader.init(this, /* native exopackage */ false);

  // ...

  IntercomModule.initialize(this, "apiKey", "appId"); // <-- Add this line

  // ...
}
```

#### Android Permissions

Add below permissions to `AndroidManifest.xml`

**Image Attachments**: No additional permissions are required for image attachments on modern Android versions (Android 10+). The SDK uses the system photo picker and scoped storage APIs that don't require storage permissions.

You can also include [VIBRATE](http://developer.android.com/reference/android/Manifest.permission.html#VIBRATE) to enable vibration in push notifications:

```xml
<uses-permission android:name="android.permission.VIBRATE"/>
```

## Step 3 - iOS Setup

If you don't support iOS in your React Native app, you can skip to the [configuration step](https://developers.intercom.com/installing-intercom/docs/react-native-configuration).

### Using React Native v0.60 and above

If you're using React Native v0.60 or above, the library will be linked automatically after running the `pod install` command.

### Manual linking with React Native v0.59

Firstly open your apps `.xcworkspace`. If you don't have a `.workspace` file open the `.xcodeproj`.
[Download intercom for iOS and extract the zip](https://github.com/intercom/intercom-ios/archive/master.zip)
Drag Intercom.xcframework into your project. Make sure **"Copy items if needed"** is selected and click Finish.

![](/assets/0019199-51cf138-xcframework_drag.3174364455efbdcf910845ac4799a41b2b2d4fc8c591757d5342919e8bce0e06.71a4f21c.png)

![](/assets/757fb42-031bc35-copy_items.5a5b4be63f74ace7a2fd7e76668fa1d8aa3da3e9ffd138f4d23468acf94e3a6a.71a4f21c.png)

For additional information on iOS manual linking please refer to the [React Native developer docs](https://reactnative.dev/docs/linking-libraries-ios).

## Initialize Intercom

Want to initialize Intercom manually?
If you want to initialize Intercom from JavaScript instead of native code, skip this section and jump to [Manual Initialization](#manual-initialization) below.

For Objective-C, open `iOS/AppDelegate.m` and import `<IntercomModule.h>`.

For Swift, open `iOS/AppDelegate.swift` and import `intercom_react_native`.

```objectivec
#import "AppDelegate.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
// ...
#import <IntercomModule.h> // <-- Add This
```

```swift
import intercom_react_native
```

Next, in the method `didFinishLaunchingWithOptions` you'll need to initialize Intercom. Add the snippet below using the `apiKey` and `appId` found in your [workspace settings](https://app.intercom.com/a/apps/_/settings/ios).

```objectivec
// ...
  self.window.rootViewController = rootViewController;

  [IntercomModule initialize:@"apiKey" withAppId:@"appId"]; // <-- Add this (Remember to replace strings with your api keys)

  return YES;
  }
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  ....
     Intercom.setApiKey("<Your iOS API Key>", forAppId: "<Your App ID>")
  ....
}
```

#### iOS Permissions

Add these permissions to your `Info.plist`:

```xml
<!-- Optional: Camera access for taking photos in conversations -->
<key>NSCameraUsageDescription</key>
<string>Access your camera to take photos within a conversation</string>

<!-- Optional: Microphone access for voice message transcription (v9.3.0+) -->
<key>NSMicrophoneUsageDescription</key>
<string>Access your microphone to transcribe voice messages in conversations</string>
```

**Note:** These permissions are only requested when the user attempts to use the respective feature. You can customize the description strings to match your app's use case.

## Manual Initialization

Already completed automatic initialization?
If you followed the native initialization steps in Step 2 and Step 3 above, you can skip this section and jump to [Step 4 - Register your users](#step-4---register-your-users).

The installation steps above show **automatic initialization** where Intercom starts when your app launches. However, you can also **manually initialize** Intercom from JavaScript if you need to delay initialization.

### When to use manual initialization

Manual initialization is useful when:

- You want to delay initialization until after user authentication
- You need to prevent in-app messages during onboarding
- You're using dynamic API keys or app IDs based on your app configuration


### Setup for non-Expo apps

If you're **not using Expo**, simply skip the native initialization calls shown in Step 2 and Step 3 above (don't add the `IntercomModule.initialize()` calls in your native Android/iOS code). Instead, initialize from JavaScript.

Don't skip platform permissions!
Even with manual initialization, you still need to configure platform-specific permissions:

**Android**: Add the [Android Permissions](#android-permissions) shown in Step 2 (VIBRATE permission for push notifications)

**iOS**: Add the [iOS Permissions](#ios-permissions) shown in Step 3 (`NSCameraUsageDescription` and optionally `NSMicrophoneUsageDescription` in Info.plist)

These permissions are required for Intercom features like image/video uploads, regardless of how you initialize the SDK.

```javascript
import { Platform } from 'react-native';
import Intercom from '@intercom/intercom-react-native';

const apiKey = Platform.select({
  ios: 'ios_sdk-your_ios_api_key',
  android: 'android_sdk-your_android_api_key',
});

await Intercom.initialize(apiKey, 'your_app_id');

await Intercom.loginUserWithUserAttributes({
  email: 'user@example.com',
  userId: 'user-123'
});
```

API Key Validation
The `initialize()` method validates that:

- iOS API keys start with `ios_sdk-` and are at least 48 characters long
- Android API keys start with `android_sdk-` and are at least 52 characters long


Note that this validation only checks the format of your API keys, not whether they're valid credentials. Authentication with Intercom servers happens on first use (e.g., when calling `loginUnidentifiedUser()` or presenting the Messenger).

### Example: Preventing messages during onboarding

```javascript
// Hide messages before initializing
await Intercom.setInAppMessageVisibility('GONE');

// Initialize Intercom
await Intercom.initialize(apiKey, 'your_app_id');

// After onboarding is complete, show messages
await Intercom.setInAppMessageVisibility('VISIBLE');
```

## Step 4 - Register your users

You’ll need to register your users with Intercom before you can talk to them or see what they do in your app. If a person visits your mobile app they will be a user - the Intercom SDKs do not create leads or visitors. There are three way to register people who visit your app: (1) register only unidentified users (2) register only identified users (3) register both identified and unidentified users. The option you choose should be informed by the design of your app, namely whether you have a login option.

## Register only your unidentified users

If you have an app with no login option (like Angry Birds or a flashlight app), you should register unidentified users only.

Just register an unidentified user in your application like so:

```javascript
Intercom.loginUnidentifiedUser();
```

## Register only your identified (logged in) users

If people must log in to access your app (as with Facebook, Instagram or Slack) you should follow these instructions to register identified users only.

### Best practices for registering users

- It is important to **only** register identified users **after** verification of a login.
- You can provide a userId and/or email when registering an identified user. We recommend giving all your users unique userIds, but if you haven't implemented this, you should provide an email.
- Don’t use an email address as a userId as this field cannot be changed later. If you choose provide only an email address, the email address must not be associated with any other users on your workspace.


```javascript
Intercom.loginUserWithUserAttributes({
  email: "bob@example.com",
  userId: "bob-123",
});
```

## Register both unidentified (non-logged in) and identified (logged in) users

If you have an app with both unidentified and identified users (like Google Maps or YouTube), you will need to either conditionally choose which registration to call:

```javascript
if (loggedIn) {
  Intercom.loginUserWithUserAttributes({
    email: "bob@example.com",
    userId: "bob-123",
  });
} else {
  Intercom.loginUnidentifiedUser();
}
```

Or you can register with `Intercom.loginUnidentifiedUser()` and if a user signs up/logs in later in your app call `Intercom.loginUserWithUserAttributes`. We will automatically transfer over any attributes or conversations from the unidentified user to the identified user, so you won't lose anything.

## How to unregister an identified user

You should only unregister an identified user. Unregistering an unidentified user will result in orphan records that cannot be merged in future.

When users want to log out of your app, simply call:

```javascript
Intercom.logout();
```

Intercom knows when your app is backgrounded and comes alive again, so you won't need to re-register your users.

## Using Intercom with Expo

If you are using Expo, you can use the built-in plugin.
After installing the **intercom-react-native** package, add the [config plugin](https://docs.expo.io/guides/config-plugins/) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@intercom/intercom-react-native"]
  }
}
```

The plugin provides props for extra customization. Every time you change the props or plugins, you'll need to rebuild (and `prebuild`) the native app. If no extra properties are added, defaults will be used.

- `intercomRegion` (*string*): Region for Intercom `US`, `EU`, `AU`. Optional. Defaults to `US`.
- `useManualInit` (*boolean*): Set to `true` to manually initialize Intercom from JavaScript instead of at app startup. Optional. Defaults to `false`.


When `useManualInit` is `false` (automatic initialization), the following properties are required:

- `appId` (*string*): App ID from Intercom.
- `androidApiKey` (*string*): Android API Key from Intercom.
- `iosApiKey` (*string*): iOS API Key from Intercom.


When `useManualInit` is `true` (manual initialization), these properties are not required as you'll provide them when calling `Intercom.initialize()` from your JavaScript code.

```json
{
  "expo": {
    "plugins": [
      [
        "@intercom/intercom-react-native",
        {
          "appId": "abc123",
          "androidApiKey": "android_sdk-abc123",
          "iosApiKey": "ios_sdk-abc123",
          "intercomRegion": "EU" // Europe
        }
      ]
    ]
  }
}
```

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.io/workflow/customizing/) guide.

### Expo: iOS Permissions

To enable camera and microphone features in your Expo app, add the following to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "Access your camera to take photos within a conversation",
        "NSMicrophoneUsageDescription": "Access your microphone to transcribe voice messages in conversations"
      }
    }
  }
}
```

**Note:** These permissions are required for v9.3.0+. The microphone permission enables voice message transcription. You can customize the description strings to match your app's use case.

After adding these permissions, run `npx expo prebuild` to regenerate the native iOS project with the updated Info.plist.

### Manual initialization with Expo

For Expo apps, use the `useManualInit` option in your plugin configuration to delay initialization:

```json
{
  "expo": {
    "plugins": [
      [
        "@intercom/intercom-react-native",
        {
          "intercomRegion": "EU", // Optional, defaults to "US"
          "useManualInit": true
        }
      ]
    ]
  }
}
```

When `useManualInit` is `true`, you don't need to provide `appId`, `androidApiKey`, or `iosApiKey` in the plugin configuration. The Expo plugin will still handle platform permissions automatically.

Then initialize Intercom manually in your JavaScript code using Platform.select for platform-specific API keys:

```javascript
import { Platform } from 'react-native';
import Intercom from '@intercom/intercom-react-native';

const apiKey = Platform.select({
  ios: 'ios_sdk-your_ios_api_key',
  android: 'android_sdk-your_android_api_key',
});

await Intercom.initialize(apiKey, 'your_app_id');

await Intercom.loginUserWithUserAttributes({
  email: 'user@example.com',
  userId: 'user-123'
});
```

You can also control message visibility around initialization:

```javascript
// Hide messages before initializing
await Intercom.setInAppMessageVisibility('GONE');

// Initialize Intercom
await Intercom.initialize(apiKey, 'your_app_id');

// After onboarding is complete, show messages
await Intercom.setInAppMessageVisibility('VISIBLE');
```

API Key Validation
The `initialize()` method validates that:

- iOS API keys start with `ios_sdk-` and are at least 48 characters long
- Android API keys start with `android_sdk-` and are at least 52 characters long


Note that this validation only checks the format of your API keys, not whether they're valid credentials. Authentication with Intercom servers happens on first use (e.g., when calling `loginUnidentifiedUser()` or presenting the Messenger).

This is particularly useful for:

- Preventing in-app messages from appearing during onboarding
- Waiting for user authentication before initializing
- Using dynamic API keys or app IDs based on your app configuration


## What next?

1. [Configure your React Native app](/installing-intercom/react-native/configuration) for Intercom and create customizations.
2. [Enable push notifications](/installing-intercom/react-native/push-notifications) so you can send push messages.
3. [Enable Identity Verification](/installing-intercom/react-native/identity-verification) for your React Native app.
4. If Data Hosting in Europe, [modify your app's region configuration](/installing-intercom/react-native/data-hosting-region-configuration)