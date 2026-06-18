# Video iOS Platform Overview

Twilio Video iOS SDK lets you add real time voice and video to your native iOS applications.

## Prerequisites

* Xcode 13.0+
* Swift projects must use Swift 5.0 or higher
* Support for iOS 12.2+

## Programmable Video Live Demo

Launch our [Twilio Programmable Video live demo](https://github.com/twilio/twilio-video-app-ios) in less than 5 minutes. A high-quality, full-featured and open-source video collaboration application.

## Run the QuickStart app

To get started with Twilio Video, you should download and run a [QuickStart Application](https://github.com/twilio/video-quickstart-ios/tree/master/VideoQuickStart).

### Using a Simulator

You can use the iOS Simulator that comes with Xcode to do your testing, but local video will not be shared since the Simulator cannot access a camera. If you have an iOS device, you can now run apps from Xcode on your device *without a paid developer account*.

The [QuickStart repository](https://github.com/twilio/video-quickstart-ios) contains additional examples. These examples demonstrate the usage of new features and also let you build more complex applications.

To add Video to your app, follow the [Getting Started Guide](/docs/video/ios-getting-started)

## Add the Video SDK

The Twilio Video iOS SDK dynamic framework can be installed using Swift Package Manager, CocoaPods or manually, as you prefer.

### Swift Package Manager

You can add Programmable Video for iOS by adding the `https://github.com/twilio/twilio-video-ios` repository as a Swift Package.

In your *Build Settings*, you will also need to modify `Other Linker Flags` to include `-ObjC`.

There is a [known issue](https://bugs.swift.org/browse/SR-13343) with consuming binary frameworks distributed via Swift Package Manager. The current workaround to this issue is to add a `Run Script Phase` to the `Build Phases` of your Xcode project. This `Run Script Phase` should come **after** the `Embed Frameworks` build phase. This new `Run Script Phase` should contain the following code:

```sh
find "${CODESIGNING_FOLDER_PATH}" -name '*.framework' -print0 | while read -d $'\0' framework
do
    codesign --force --deep --sign "${EXPANDED_CODE_SIGN_IDENTITY}" --preserve-metadata=identifier,entitlements --timestamp=none "${framework}"
done

```

### CocoaPods

```rb
source 'https://github.com/CocoaPods/Specs'

platform :ios, '12.2'

target 'TARGET_NAME' do
    pod 'TwilioVideo', '~> 5'
end
```

Then run `pod install` to install the dependencies to your project.

### Manual

`TwilioVideo.xcframework` is distributed as a dynamic iOS framework that you can drag and drop into your existing projects.

All Video iOS releases can be viewed on [GitHub](https://github.com/twilio/twilio-video-ios/releases). You can also [download the latest Video dynamic framework from GitHub](https://github.com/twilio/twilio-video-ios/releases/download/5.11.2/TwilioVideo.xcframework.zip).

Once you've downloaded and unpacked the XCFramework, navigate to your Xcode project's *General* settings page. Drag and drop `TwilioVideo.xcframework` onto the *Frameworks, Libraries, and Embedded Content* section. Ensure that "Copy items if needed" is checked and press *Finish*. Ensure that "Embed & Sign" is selected.

In your *Build Settings*, you will also need to modify `Other Linker Flags` to include `-ObjC`.

`TwilioVideo-static.xcframework` is distributed as a static (version 5.11.2 onwards) iOS framework that you can drag and drop into your existing projects.

You can [download the latest Video static framework from GitHub](https://github.com/twilio/twilio-video-ios/releases/download/5.11.2/TwilioVideo-static.xcframework.zip).

Follow the steps below to add the static library to your iOS app:

* Drag and drop the `TwilioVideo.xcframework` extracted from `TwilioVideo-static.xcframework.zip` into the Xcode project.
* In **Frameworks, Libraries, and Embedded Content**, add `SystemConfiguration.framework`, `GLKit.framework` and `VideoToolbox.framework`.
* Add `-lstdc++` and `-ObjC` to the **Other Linker Flags**.
* Add `@import TwilioVideo;` in the source file.

### Background Modes

To allow a connection to a Room to be persisted while an application is running in the background, you must select the `Audio, AirPlay, and Picture in Picture` background mode from the `Capabilities` project settings page.

![Background modes with Audio, AirPlay, and in selected.](https://docs-resources.prod.twilio.com/35a17f14f456b96088d95649b1d1b65bd02433f3d6916848abeeeb16eb252758.png)

## Add Audio Processors

### Swift Package Manager \[#swift-package-manager-2]

You can add Audio Processors for iOS by adding the `https://github.com/twilio/twilio-audio-processors-ios` repository as a Swift Package.

In your *Build Settings*, you will also need to modify `Other Linker Flags` to include `-ObjC`.

### CocoaPods \[#cocoapods-2]

```rb
source 'https://github.com/CocoaPods/Specs'

platform :ios, '12.2'

target 'TARGET_NAME' do
    pod 'TwilioAudioProcessors', '~> 5'
end
```

Then run `pod install` to install the dependencies to your project.

### Manual \[#manual-2]

`TwilioAudioProcessors.xcframework` is distributed as a dynamic iOS framework that you can drag and drop into your existing projects.

[View all Audio Processors iOS Releases here](https://github.com/twilio/twilio-audio-processors-ios/releases) or just [download the latest Audio Processors dynamic framework here](https://github.com/twilio/twilio-audio-processors-ios/releases/download/5.11.2/TwilioAudioProcessors.xcframework.zip).

Once you've downloaded and unpacked the XCFramework, navigate to your Xcode project's *General* settings page. Drag and drop `TwilioAudioProcessors.xcframework` onto the *Frameworks, Libraries, and Embedded Content* section. Ensure that "Copy items if needed" is checked and press *Finish*. Ensure that "Embed & Sign" is selected.

In your *Build Settings*, you will also need to modify `Other Linker Flags` to include `-ObjC`.

The TwilioAudioProcessors static framework is not available. Using the TwilioAudioProcessors dynamic framework with the TwilioVideo static framework will result in a runtime error.

## Xcode and iOS Version Support

| SDK Version | Minimum Xcode Requirement | Minimum iOS Version | Supported Architectures     | Supported Devices                                                                                  |
| ----------- | ------------------------- | ------------------- | --------------------------- | -------------------------------------------------------------------------------------------------- |
| 5.x         | Xcode 13.0                | iOS 12.2            | arm64, x86\_64              | iPhone 5s and later, iPad (5th generation) and later, iPad mini (2nd generation) and later.        |
| 4.x         | Xcode 12.5                | iOS 9.0 \*\*        | armv7, arm64, i386, x86\_64 | iPhone 4s and later \*\*, iPad 2 and later, iPad mini (1st generation) and later.                  |
|             |                           | iOS 11.0            | arm64, x86\_64              | iPhone 5s and later \*, iPad (5th generation) and later, iPad Air and later, iPad mini 2 and later |
| 3.x         | Xcode 11.0                | iOS 11.0            | arm64 \*\*\*, x86\_64       | iPhone 5s and later \*, iPad (5th generation) and later, iPad Air and later, iPad mini 2 and later |

\* Dual SIM enabled iPhones (XS, XS Max, XR and later) are supported, but not when two SIMs are installed and enabled. See Chromium issue [#10966](https://bugs.chromium.org/p/webrtc/issues/detail?id=10966) for more information.

\*\* Build time support is available for iOS 9.x and 10.x. Run time support is available on iOS 12.2 and above.

\*\*\* Arm64 simulators are not supported.

## Getting help

We love feedback and questions, especially those with helpful debugging information so we can diagnose and respond quickly. When submitting issues or support tickets, it would be great if you add the following:

* **Description** - A description of the issue
* **Steps to reproduce** - List the steps necessary to reproduce the issue
* **Code** - Include any applicable code snippets that would assist in reproduction and troubleshooting
* **Expected Behavior** - What you expect to happen
* **Actual Behavior** - What actually happens
* **Reproduces How Often** - What percentage of the time does it reproduce?
* **Logs** - Any log output when the issue occurs. See below for enabling debug level logging.
* **Video iOS SDK** - The version(s) of the Video iOS SDK where this issue is apparent
* **Xcode** - The version(s) of Xcode where this issue is apparent
* **iOS Version** - The version(s) of iOS where this issue is apparent
* **iOS Device** - The iOS device(s) where this issue is apparent
* **Room SID** - Room SIDs can be useful for tracing backend issues

After gathering the above information, you can get help in a few ways:

For issues related to the Twilio Video iOS SDK itself:

* [**Twilio Video iOS SDK on Github**](https://github.com/twilio/twilio-video-ios/issues)
* [**Twilio Support**](https://help.twilio.com)

For issues related to the Twilio Video iOS Quickstarts:

* [**Video iOS Quickstart on GitHub**](https://github.com/twilio/video-quickstart-ios/issues)

### Enabling Debug Logging

To enable debug level logging, add the following code in your application:

```swift
TwilioVideoSDK.setLogLevel(.debug)
```

## Migrating from 4.x to 5.x

Our 5.0 releases are "Generally Available" (GA) and represent our latest releases and adds support for:

* Xcode 13.0

Our 4.x releases will only receive critical bug fixes. Support for the 4.x releases will cease as of February 14, 2023. Refer to our [5.x migration guide](/docs/video/migrating-4x-5x-ios) for migrating your applications from 4.x to 5.x.

## Migrating from 3.x to 4.x

Our 4.0 releases are "Generally Available" (GA) and represent our latest releases and adds support for:

* Upgraded WebRTC version.
* Swift Package Manager.
* In-app screen capture.
* RemoteParticipant reconnection APIs.
* Recording API improvements.

Our 3.x releases will only receive critical bug fixes. Support for the 3.x releases will cease as of December 4, 2021. Refer to our [4.x migration guide](/docs/video/migrating-3x-4x-ios) for migrating your applications from 3.x to 4.x.

## Migrating from 2.x to 3.x

Our 3.0 releases are "Generally Available" (GA) and provide the following features:

* Global low latency (GLL) signaling with IPv4 and IPv6 support.
* Improved Swift APIs for a more idiomatic Swift development experience.
* Support for [UIScene](https://developer.apple.com/documentation/uikit/uiscene) and multi-window apps on iOS 13 and iPadOS 13.

Our 2.x releases received only critical bug fixes and support ended on January 10, 2020. To learn more about older migrations, see our [documentation retention policy](/docs/video/platform-sdk-support-policy#documentation-retention-policy).

## Migrating from 1.x to 2.x

Our 2.0 releases are "Generally Available" (GA) and provide the following features:

* Support for iOS 9.0+
* H.264 encoding and decoding.
* Codec preferences.
* Bandwidth controls.
* Subscription focused APIs.
* Track names, Track level errors.
* Data Tracks.
* Custom Audio Devices.

Our 1.x releases are no longer supported. To learn more about older migrations, see our [documentation retention policy](/docs/video/platform-sdk-support-policy#documentation-retention-policy).
