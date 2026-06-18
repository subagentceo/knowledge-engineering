# About the SDK

The Intercom SDK for iOS enables you to use the [Intercom Messenger](https://www.intercom.com/messenger) in your app, have conversations with your customers, send rich outbound messages, show your Help Center, and track events.

## Installation

You can install Intercom for iOS using Cocoapods, Swift Package Manager, or manually. A basic installation takes around 15 minutes, but will take a little longer if you need to configure event tracking or have a more complex use case.

To install Intercom for iOS you will need an API key. You’ll find that in Intercom > Settings > Installation > iOS. That’s where you can upload your push certificate as well.

## Sample app

You’ll find Intercom for iOS on Github [here](https://github.com/intercom/intercom-ios/). There’s also a sample app that you can use to play around with the SDK [here](https://github.com/intercom/intercom-ios/tree/master/Examples).

## Compatibility

Intercom for iOS is compatible with iOS 15 and up. We also have a plugin for Cordova and Phonegap.

The SDK is written using both Swift & Objective-C.

## SDK size

The size of Intercom for iOS once installed varies depending on your app’s configuration. For most installations, it’s roughly around 9MB in size.

## Disable Swizzling

If you experience a crash containing `swift_getSingletonMetadata` in the stack trace, it may be caused by a [potential bug in Swift](https://github.com/swiftlang/swift/issues/72657).

This happens when one of your classes class references another class in a framework on an iOS version lower than the minimum required version of that framework.

To workaround this issue, you can disable swizzling in the Intercom SDK by adding the following to your `Info.plist` file:

```xml
<key>IntercomDisableSwizzling</key>
<true/>
```

Push Notifications
If you disable swizzling, [you’ll need to manually configure Push Notifications](https://developers.intercom.com/installing-intercom/ios/push-notifications).
**We don't recommend disabling swizzling unless you're experiencing a specific swizzling-related issue.**