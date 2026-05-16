# Rich Push Notifications

With Intercom version 12.3.0+, you can send rich push notifications on iOS. You can add images to your notifications.

## Prerequisites

Before you begin with this, make sure you have gone through [Push Notifications](/installing-intercom/ios/push-notifications). Everything required for simple push notifications needs to be done in order for Rich Push Notifications to work.

Once you are finished with setting up basic push notifications, you can proceed further.

## Step 1: Create Notification Service Extension

In Xcode, go to File -> New -> Target, and choose “Notification Service Extension”. Give it a name and click finish. A new target will be added to your project. Set the desired deployment target. The extension will also require its own provisioning profile.

![](/assets/55f043b-image1.4a8219edc5e727f52a20aefe12e235a07b8f36792b64c40e9f0e747af1d3bb3c.71a4f21c.png)

## Step 2: Integrate Intercom

Cocoapods
In your podfile, add a new target for your Notification Service Extension and add the Intercom pod to that target. Run `pod install` to install the pod to the extension.


```ruby
target :YourNotificationServiceExtensionTargetName do
  pod 'Intercom'
End
```

Swift Package Manager
If you had used Swift Package Manager to add the Intercom SDK to your main app, then:

1. Go to the **File Inspector**.
2. Select your project.
3. Select your Notification Service Extension target.
4. In the **General** tab, add the Intercom framework to the **Framework and Libraries** section.


![](/assets/d14035b-image2.455698a861a35f7514e01a094a475ffa28202fe4253824743b27d3d977dab5c2.71a4f21c.png)

Manual
If you had manually added the Intercom framework to your project, then

1. Go to the **File Inspector**.
2. Select your project.
3. Select your Notification Service Extension target.
4. In the General tab, add the Intercom framework to the **Framework and Libraries** section.
5. Ensure that *Do Not Embed* is selected. Otherwise you will get errors during app distribution.


![](/assets/4460435-image3.634f69befa07094ca5db73b7b3ff6142594034a06d0cf0cbb7e1945d82e509eb.71a4f21c.png)

## Step 3: Handling Intercom Push Notifications

### Automatically (Default)

When your NotificationServiceExtension receives a push notification request, Intercom for iOS checks if it is an Intercom push notification and if it is, it then downloads the media and attaches it to the notification. To do this we [safely swizzle](https://newrelic.com/blog/best-practices/right-way-to-swizzle) the public methods in your Notification Service Extension’s "Principal Class", which will be `NotificationService` by default, that handle receiving push notification requests. We do not use any private APIs to do this.

### Manually

In certain circumstances you may want more control of your push notifications. You can disable automatic handling of Intercom push notifications by doing the following:

1. Add the following to your `Info.plist` of your Notification Service Extension:
`IntercomAutoIntegratePushNotifications` with a value of `NO`.


![](/assets/8fa6ede-image4.0d16d20f587f61f6ea809ba2c9cf1da3dbef51a542c6dacd0187939fb395089c.71a4f21c.png)

1. Import Intercom in your NotificationService class.
2. Handle Intercom push notifications manually in `didReceiveNotificationResponse` in your `UNNotificationServiceExtension`:



```objectivec
- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];

    if (!self.bestAttemptContent) {
        contentHandler(request.content);
        return;
    }

    if ([Intercom isIntercomPushNotification:self.bestAttemptContent.userInfo]) {
        [Intercom handleIntercomRichPushNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
    } else {
        // Handle non Intercom push notifications here.
        self.contentHandler(self.bestAttemptContent);
    }
}
```


```swift
override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
  self.contentHandler = contentHandler
  bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

  guard let bestAttemptContent = bestAttemptContent else {
    contentHandler(request.content)
    return
  }

  if Intercom.isIntercomPushNotification(bestAttemptContent.userInfo) {
    Intercom.handleRichPush(bestAttemptContent, withContentHandler: contentHandler);
  } else {
    // Handle non Intercom push notifications here.
    contentHandler(bestAttemptContent)
  }
}
```