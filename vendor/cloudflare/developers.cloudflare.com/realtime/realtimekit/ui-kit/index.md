---
title: Build using UI Kit
description: Get started with the RealtimeKit UI Kit to add a prebuilt meeting experience to your application.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build using UI Kit

The default RealtimeKit Meeting UI component gives you a complete meeting experience out of the box, with all the essential features built in. Drop it into your app and you are ready to go.

Select a framework based on the platform you are building for.

WebMobile

ReactWeb ComponentsAngular

Please install the following dependencies into your project repository:

Terminal window

```

npm i @cloudflare/realtimekit-react @cloudflare/realtimekit-react-ui


```

_Optional:_ You can also build on top of our ready-made template:

Terminal window

```

git clone https://github.com/cloudflare/realtimekit-web-examples.git

cd realtimekit-web-examples/react-examples/examples/default-meeting-ui


```

Please install the following dependencies into your project repository:

Terminal window

```

npm i @cloudflare/realtimekit-web @cloudflare/realtimekit-ui


```

_Optional:_ You can also build on top of our ready-made template:

Terminal window

```

git clone https://github.com/cloudflare/realtimekit-web-examples.git

cd realtimekit-web-examples/html-examples/examples/default-meeting-ui


```

Please install the following dependencies into your project repository:

Terminal window

```

npm i @cloudflare/realtimekit-angular @cloudflare/realtimekit-angular-ui


```

_Optional:_ You can also build on top of our ready-made template:

Terminal window

```

git clone https://github.com/cloudflare/realtimekit-web-examples.git

cd realtimekit-web-examples/angular-examples/examples/default-meeting-ui


```

Add the following dependency to your `build.gradle` file:

```

dependencies {

  implementation 'com.cloudflare.realtimekit:ui-android:0.3.0'

}


```

Install the RealtimeKit UI Kit using Swift Package Manager:

1. In Xcode, go to **File > Add Package Dependencies**.
2. Enter the package URL: `https://github.com/dyte-in/RealtimeKitUI`.
3. Select the version and add the package to your project.

Add the following entries to the `Info.plist` file. This gives your app permissions to access the camera and microphone, access photos, and install the required fonts and icons.

```

<key>NSBluetoothPeripheralUsageDescription</key>

<string>Access Bluetooth to connect to headphones and audio devices during calls.</string>

<key>NSBluetoothAlwaysUsageDescription</key>

<string>Access Bluetooth to connect to headphones and audio devices during calls.</string>

<key>NSCameraUsageDescription</key>

<string>Access camera to enable video during meetings.</string>

<key>NSMicrophoneUsageDescription</key>

<string>Access microphone to enable audio during meetings.</string>

<key>NSPhotoLibraryUsageDescription</key>

<string>Access photos to share images during meetings.</string>

<key>UIBackgroundModes</key>

<array>

  <string>audio</string>

  <string>voip</string>

  <string>fetch</string>

  <string>remote-notification</string>

</array>


```

The `UIBackgroundModes` key is used in the `Info.plist` file of an iOS app to declare the app's supported background execution modes. This key is an array of strings that specifies the types of background tasks that the app supports. By declaring the background modes, the app can continue to run in the background and perform specific tasks even when it is not in the foreground.

Note

The use of background modes should be justified and comply with Apple's App Store Review Guidelines. Apps that misuse background modes or unnecessarily run in the background may be rejected during the app review process.

Source: [Apple Developer Documentation: Declaring Your App's Supported Background Tasks ↗](https://developer.apple.com/documentation/xcode/configuring-background-execution-modes)

Install the RealtimeKit UI Kit by adding the dependency to your `pubspec.yaml` file:

Terminal window

```

flutter pub add realtimekit_ui


```

Then import the package into your project:

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


```

* [ Android ](#tab-panel-9949)
* [ iOS ](#tab-panel-9950)

Set `compileSdkVersion 36` and `minSdkVersion 24` in your `build.gradle` file at `<project root>/android/app/build.gradle`:

```

defaultConfig {

  ...

  compileSdkVersion 36

  minSdkVersion 24

  ...

}


```

Change the Kotlin version to `1.9.0`:

```

ext.kotlin_version = '1.9.0'


```

Set your platform to iOS 13.0 or above in your `Podfile`:

```

platform :ios, '13.0'


```

Add the following entries to the `Info.plist` file. This gives your app permissions to access the camera and microphone, access photos, and install the required fonts and icons.

```

<key>NSBluetoothPeripheralUsageDescription</key>

<string>Access Bluetooth to connect to headphones and audio devices during calls.</string>

<key>NSBluetoothAlwaysUsageDescription</key>

<string>Access Bluetooth to connect to headphones and audio devices during calls.</string>

<key>NSCameraUsageDescription</key>

<string>Access camera to enable video during meetings.</string>

<key>NSMicrophoneUsageDescription</key>

<string>Access microphone to enable audio during meetings.</string>

<key>NSPhotoLibraryUsageDescription</key>

<string>Access photos to share images during meetings.</string>

<key>UIBackgroundModes</key>

<array>

  <string>audio</string>

  <string>voip</string>

  <string>fetch</string>

  <string>remote-notification</string>

</array>


```

**Optional:** If you are allowing users to download attachments in chat, add the following permissions to your `Info.plist`:

```

<key>LSSupportsOpeningDocumentsInPlace</key>

<true/>

<key>UIFileSharingEnabled</key>

<true/>


```

* [ React Native ](#tab-panel-9951)
* [ Expo ](#tab-panel-9952)

Install the dependencies:

Terminal window

```

npm install @cloudflare/realtimekit-react-native @cloudflare/react-native-webrtc @cloudflare/realtimekit-react-native-ui @react-native-documents/picker react-native-file-viewer react-native-fs react-native-sound-player react-native-webview react-native-svg


```

Install `react-native-safe-area-context` based on your React Native version:

* React Native 0.64 - 0.74: `npm install react-native-safe-area-context@^4.0.0`
* React Native >= 0.74: `npm install react-native-safe-area-context@^5.0.0`

Refer to the [react-native-svg installation guide ↗](https://github.com/software-mansion/react-native-svg) for setup.

Install the dependencies:

Terminal window

```

npx expo install @cloudflare/realtimekit-react-native-ui @cloudflare/realtimekit-react-native @cloudflare/react-native-webrtc @react-native-documents/picker react-native-file-viewer react-native-fs react-native-sound-player react-native-webview react-native-svg


```

Install `react-native-safe-area-context` based on your React Native version:

* React Native 0.64 - 0.74: `npm install react-native-safe-area-context@^4.0.0`
* React Native >= 0.74: `npm install react-native-safe-area-context@^5.0.0`

Install Expo config plugins:

Terminal window

```

npx expo install @expo/config-plugins


```

Add the plugins to your `app.json`:

```

{

  "expo": {

    "plugins": [

      "@cloudflare/realtimekit-react-native",

      "@cloudflare/react-native-webrtc"

    ]

  }

}


```

Run `prebuild` to set up native modules:

Terminal window

```

npx expo prebuild


```

* [ Android ](#tab-panel-9953)
* [ iOS ](#tab-panel-9954)

The following instructions are for release builds. Debug builds should work without additional steps.

Edit your `android/gradle.properties` and add the following lines:

```

newArchEnabled=false

android.useFullClasspathForDexingTransform=true


```

**Note:** Starting from version `>=0.2.0`, add a required `blob_provider_authority` string resource in the `strings.xml` file:

```

<resources>

  ...

  <string name="blob_provider_authority">YOUR_APP_RESOURCE_NAME</string>

  ...

</resources>


```

Create or append to the file `android/app/proguard-rules.pro`:

```

-keep class realtimekit.org.webrtc.** { *; }

-dontwarn org.chromium.build.BuildHooksAndroid


```

In your `android/app/build.gradle`, edit the release configuration and add the following line importing the ProGuard configuration:

```

buildTypes {

  release {

    ...

    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

  }

}


```

**Note:** The minimum supported iOS version is **14.0**.

Open your `Podfile` and set the platform to iOS 14:

```

platform :ios, '14.0'


```

Add the following permission entries to your `Info.plist` file:

```

<key>NSCameraUsageDescription</key>

<string>Access camera to enable video during meetings.</string>

<key>NSMicrophoneUsageDescription</key>

<string>Access microphone to enable audio during meetings.</string>

<key>NSPhotoLibraryUsageDescription</key>

<string>Access photos to share images during meetings.</string>

<key>UIViewControllerBasedStatusBarAppearance</key>

<false/>


```

## Initialize the SDK

Add the following code to your React application:

App.tsx

```

import { useEffect } from 'react';

import { useRealtimeKitClient } from '@cloudflare/realtimekit-react';


export default function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();

  useEffect(() => {

    initMeeting({ authToken: '<auth-token>' });

  }, []);


  return <div></div>;

}


```

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

## Create a meeting component

Use the `RtkMeeting` component and the `useRealtimeKitMeeting` hook. This hook provides access to the meeting object that contains all the meeting state and methods.

MyMeetingUI.tsx

```

import { useRealtimeKitMeeting } from '@cloudflare/realtimekit-react';

import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';


export default function MyMeetingUI() {

  const { meeting } = useRealtimeKitMeeting();

  return (

    <RtkMeeting mode="fill" meeting={meeting} showSetupScreen={true} />

  );

}


```

## Display the meeting

Wrap your meeting component in `RealtimeKitProvider`:

App.tsx

```

import { useEffect } from 'react';

import { useRealtimeKitClient, RealtimeKitProvider } from '@cloudflare/realtimekit-react';

import MyMeetingUI from './MyMeetingUI.tsx'


export default function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();


  useEffect(() => {

    initMeeting({ authToken: '<auth-token>' });

  }, []);


  return (

    <RealtimeKitProvider value={meeting}>

      <MyMeetingUI />

    </RealtimeKitProvider>

  );

}


```

## Import the SDK

Add the following imports to your HTML file:

index.html

```

<!DOCTYPE html>

<html lang="en">

  <head>

    <!-- Import helper to load UI Kit components -->

    <script type="module">

      import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui@latest/loader/index.es2017.js";

      defineCustomElements();

    </script>

    <!-- Import RealtimeKit Core via CDN -->

    <script src="https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/browser.js"></script>

  </head>

</html>


```

## Display the meeting

Use the `rtk-meeting` component to render the meeting UI:

```

<body>

  <rtk-meeting id="my-meeting" show-setup-screen="true" />

</body>


```

## Initialize the SDK

Pass the `authToken` and connect the meeting object to the UI component:

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

```

<script>

  const authToken = "<auth-token>";

  // Initialize the SDK

  RealtimeKitClient.init({

    authToken,

  }).then((meeting) => {

    document.getElementById("my-meeting").meeting = meeting;

  });

</script>


```

## Load the module

Load `RTKComponentsModule` into your app module. This is typically the `app.module.ts` file and allows you to use the UI components in your component HTML files.

TypeScript

```

import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";

import { RTKComponentsModule } from "@cloudflare/realtimekit-angular";

import { AppComponent } from "./app.component";


@NgModule({

  declarations: [AppComponent],

  imports: [BrowserModule, RTKComponentsModule],

  providers: [],

  bootstrap: [AppComponent],

})

export class AppModule {}


```

_Optional:_ If you are using TypeScript, set `allowSyntheticDefaultImports` as `true` in your `tsconfig.json`.

TypeScript

```

{

  "compilerOptions": {

    "allowSyntheticDefaultImports": true

  }

}


```

## Display the meeting

Load the `RtkMeeting` component in your template file (`component.html`):

```

<rtk-meeting #myid></rtk-meeting>


```

## Initialize the SDK

TypeScript

```

class AppComponent {

  title = "MyProject";

  @ViewChild("myid") meetingComponent: RtkMeeting;

  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {

    const meeting = await RealtimeKitClient.init({

      authToken: "<auth-token>",

    });

    meeting.join();

    this.rtkMeeting = meeting;

    if (this.meetingComponent) this.meetingComponent.meeting = meeting;

  }

}


```

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

## Initialize and display the meeting

Create a `RealtimeKitUI` instance with your auth token, then call `startMeeting(completion:)` to get a view controller. Present it to display the full meeting UI.

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

Swift

```

import RealtimeKit

import RealtimeKitUI


let rtkUI = RealtimeKitUI(

    meetingInfo: RtkMeetingInfo(

        authToken: "<auth-token>",

        enableAudio: true,

        enableVideo: true

    )

)


let controller = rtkUI.startMeeting {

    // Called when the meeting ends or the user leaves

    self.dismiss(animated: true)

}

controller.modalPresentationStyle = .fullScreen

present(controller, animated: true)


```

## Initialize and display the meeting

Create an `RtkMeetingInfo` with your auth token, wrap it in `RealtimeKitUIInfo`, build the UI Kit, and call `startMeeting()`.

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

Kotlin

```

import com.cloudflare.realtimekit.models.RtkMeetingInfo

import com.cloudflare.realtimekit.ui.RealtimeKitUIBuilder

import com.cloudflare.realtimekit.ui.RealtimeKitUIInfo


val meetingInfo = RtkMeetingInfo(authToken = "<auth-token>")

val uiKitInfo = RealtimeKitUIInfo(

    activity = this,

    rtkMeetingInfo = meetingInfo,

)

val rtkUIKit = RealtimeKitUIBuilder.build(uiKitInfo)

rtkUIKit.startMeeting()


```

## Initialize and display the meeting

Create an `RtkMeetingInfo` with your auth token, wrap it in `RealtimeKitUIInfo`, and build the UI Kit. The returned `RealtimeKitUI` object is a Flutter widget — place it directly in your widget tree.

Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

Dart

```

import 'package:flutter/material.dart';

import 'package:realtimekit_ui/realtimekit_ui.dart';


final meetingInfo = RtkMeetingInfo(authToken: '<auth-token>');

final uiKitInfo = RealtimeKitUIInfo(meetingInfo);

final rtkUI = RealtimeKitUIBuilder.build(uiKitInfo: uiKitInfo);


// Place rtkUI in your widget tree

Navigator.push(

  context,

  MaterialPageRoute(builder: (_) => rtkUI),

);


```

Call `RealtimeKitUIBuilder.dispose()` when you no longer need the meeting UI.

Additional steps for background audio/video support (Android only)

To enable background audio and video support on Android, add the following permissions and service declaration to your `AndroidManifest.xml`.

Add these permissions to your `AndroidManifest.xml` file:

```

<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>

<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />

<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />


```

Add the following `KeepAlive` service declaration to your `AndroidManifest.xml` file:

```

<service

  android:enabled="true"

  android:foregroundServiceType="mediaPlayback|camera|microphone"

  android:name="com.cloudflare.realtimekit.ui.KeepAliveService">

</service>


```

Note

`RtkMeeting` has built-in support for background audio and video on Android. If you are using `RtkMeeting`, the manifest changes above are all you need.

**Optional:** If you are building a custom UI instead of using `RtkMeeting`, you need to manage the foreground service manually. Start the service before joining the meeting and stop it when the meeting ends:

TypeScript

```

import { Platform, PermissionsAndroid, NativeModules } from "react-native";


const RealtimeKitUIModule = NativeModules.CoreUiKit;


// Start the foreground service for background support

async function startKeepAliveService() {

  if (Platform.OS !== "android") return;


  // Request notification permission on Android 13+ (API level 33)

  if ((Platform.Version as number) >= 33) {

    const result = await PermissionsAndroid.request(

      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,

    );

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {

      console.warn("Permission required for background meeting notification");

    }

  }


  const isRunning = await RealtimeKitUIModule.isForegroundServiceRunning();

  if (!isRunning) {

    await RealtimeKitUIModule.startService();

  }

}


// Stop the foreground service when the meeting ends

async function stopKeepAliveService() {

  if (Platform.OS !== "android") return;

  await RealtimeKitUIModule.stopService();

}


```

Note

The `POST_NOTIFICATIONS` runtime permission is only required on Android 13 (API level 33) and above. On earlier Android versions, notification permission is granted at install time through the manifest declaration.

## Initialize the SDK

Use the `useRealtimeKitClient` hook from the core React Native package to create a meeting instance: Use the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) to fetch the `authToken`.

TypeScript

```

import {

  useRealtimeKitClient,

  RealtimeKitProvider,

} from "@cloudflare/realtimekit-react-native";

import {

  RtkMeeting,

  RtkUIProvider,

} from "@cloudflare/realtimekit-react-native-ui";

import React, { useEffect } from "react";

import { Text } from "react-native";


```

## Display the meeting

Wrap your app in `RtkUIProvider`, initialize the client, and render `RtkMeeting`:

TypeScript

```

function App() {

  return (

    <RtkUIProvider>

      <Meeting authToken="<auth-token>" />

    </RtkUIProvider>

  );

}


function Meeting({ authToken }: { authToken: string }) {

  const [meet, initMeeting] = useRealtimeKitClient();


  useEffect(() => {

    initMeeting({

      authToken,

      defaults: { audio: true, video: true },

    });

  }, [authToken]);


  if (!meet) return <Text>Loading...</Text>;


  return (

    <RealtimeKitProvider value={meet}>

      <RtkMeeting meeting={meet} showSetupScreen={true} />

    </RealtimeKitProvider>

  );

}


```

## Next steps

You have integrated RealtimeKit with the default meeting UI. Participants can now see and hear each other in sessions.

### Build a custom meeting experience

While the default UI provides a complete meeting experience, you may want to build a custom interface using individual UI Kit components. This approach gives you full control over the layout, design, and user experience.

To build your own custom meeting UI, follow these guides in order:

1. **[UI Kit Components Library](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/)** \- Browse available components and their visual representations
2. **[UI Kit Meeting Lifecycle](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/state-management/)** \- Lifecycle of a meeting and how components communicate and synchronize with each other
3. **[Session Lifecycle](https://developers.cloudflare.com/realtime/realtimekit/concepts/session-lifecycle/)** \- Understand different peer states and transitions
4. **[Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/)** \- Access meeting data and participant information using the Core SDK
5. **[Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/)** \- Put everything together to create a custom meeting interface

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/#page","headline":"Build using UI Kit · Cloudflare Realtime docs","description":"Get started with the RealtimeKit UI Kit to add a prebuilt meeting experience to your application.","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}}]}
```
