# Voice iOS SDK

Twilio Programmable Voice SDK for iOS allows you to add voice-over-IP (VoIP) calling into your native iOS applications.

> \[!WARNING]
>
> When using the Voice iOS SDK with [Twilio Regions](/docs/global-infrastructure), please make sure the SDK version is updated to at least 6.4.0

> \[!NOTE]
>
> For step-by-step instructions to get up and running with the iOS SDK for Programmable Voice, check out the quickstarts for making calls from your native iOS apps in [Objective-C](https://github.com/twilio/voice-quickstart-objc#quickstart) and [Swift](https://github.com/twilio/voice-quickstart-swift#quickstart).
>
> Use of this software is subject to the terms and conditions of the [Twilio Terms of Service](https://www.twilio.com/legal/tos). Please review `ACKNOWLEDGEMENTS.md` for licenses of dependent software embedded in the downloaded package.

## How it Works

![Mobile app connects to Twilio, which sends a webhook to backend for TwiML instructions.](https://docs-resources.prod.twilio.com/6b16b2b231a67bf8d95d730a015703931e20844f626282df8b979eef6ad3ec87.png)

1. You connect to Twilio from your mobile app with the Voice SDK
2. Twilio sends you a webhook to get the TwiML instructions
3. Your backend responds to Twilio with TwiML instructions

   * For example, you can instruct Twilio to call a number, call a VoIP endpoint, or connect to a conference.
   * E.g. To connect to a phone number, your backend would return `<Dial callerId="+155512345678"><Number>+155587654321</Number></Dial>`
4. Twilio executes your TwiML instructions (e.g. Dials the number in your TwiML instructions)
5. Twilio creates a VoIP connection between your callee and your mobile app

## Versioning

The Programmable Voice SDKs are released according to [semantic versioning](https://semver.org/), so you should always note both the major and minor versions of the SDKs to maintain API compatibility with your code.

For versions 1.0 and higher, minor versions will not break existing integrations, but during a Public Beta period, minor version increments in the 0.x range represent breaking API changes. Patch level releases - 0.0.x - represent non-breaking changes during a Public Beta.

## Authentication/Authorization

In the Programmable Voice SDKs we use a new authentication/authorization mechanism for your application server to give your clients access to your voice applications. This is done by providing your app an [Access Token](/docs/iam/access-tokens), which governs the client application's authentication session with your account in the Twilio cloud.

Access Tokens are different from the Capability Tokens used in the previous versions of Twilio Client. Using a Capability Token in the Programmable Voice SDK will not work. Access Tokens, just like Capability Tokens before, are [JWT tokens](https://jwt.io/introduction/), but are using a new, more flexible format that is used across all of the new Twilio server-side SDKs.

## Management Console

Developer tools and configuration options for [Programmable Voice](https://www.twilio.com/en-us/voice) can be found in the [Programmable Voice Dashboard](https://www.twilio.com/console/voice/dashboard). Use the console to create TwiML apps, update push credentials, view logs, and much more.

## Installation

### Prerequisites

* Xcode 14.0+
* Swift projects must use Swift 4.0 or higher
* Support for iOS 12.0+

### Install

The iOS Voice SDK can be installed using Swift Package Manager, CocoaPods, or manually.

#### Swift Package Manager

You can add the iOS Voice SDK by adding the `https://github.com/twilio/twilio-voice-ios` repository as a Swift Package. You can choose `TwilioVoice` in **Frameworks, Libraries and Embedded Content** if you want to integrate the dynamic framework version of the SDK, or `TwilioVoice-static` if you want the static framework version.

If you are using the static framework, add `SystemConfiguration.framework` to **Frameworks, Libraries and Embedded Content**.

#### CocoaPods

Add the following to your `Podfile`:

```rb
source 'https://github.com/cocoapods/specs'

target 'TARGET_NAME' do
  use_frameworks!

  pod 'TwilioVoice', '~> 6.13'
end
```

Then `run pod install --verbose` to install the dependencies to your project.

To integrate the static framework, use the TwilioVoice-static pod:

```rb
  pod 'TwilioVoice-static', '~> 6.13'
```

#### Manual Install

`TwilioVoice.xcframework` is distributed as a dynamic iOS framework that you can drag and drop into your existing projects.

1. [Download the Voice framework here](https://github.com/twilio/twilio-voice-ios/releases/latest/download/TwilioVoice.xcframework.zip)
2. Once you've downloaded and unpacked the XCFramework, navigate to your Xcode project's **General** settings page.
3. Drag and drop `TwilioVoice.xcframework` onto the **Frameworks, Libraries, and Embedded Content** section.
4. Ensure that "Copy items if needed" is checked and press **Finish**.
5. Ensure that "Embed & Sign" is selected.
6. In your **Build Settings**, you will also need to modify `Other Linker Flags` to include `-ObjC`.

#### Static framework

As of version 6.13.2, the Voice iOS SDK is available in static framework format. To integrate the static framework into your Xcode project, follow these steps:

1. Download the static framework from [this GitHub link](https://github.com/twilio/twilio-voice-ios/releases/latest/download/TwilioVoice-static.xcframework.zip).
2. Extract `TwilioVoice.xcframework` from `TwilioVoice-static.xcframework.zip`, then drag and drop it into your Xcode project.
3. In **Frameworks, Libraries, and Embedded Content**, add `SystemConfiguration.framework`.

We recommend that you [start with our Getting Started guide](/docs/voice/sdks/ios/get-started) to get a sense of how all of these components fit together. The Quickstart app is set up to manage dependencies with CocoaPods, but you can also install the frameworks manually as described above.
