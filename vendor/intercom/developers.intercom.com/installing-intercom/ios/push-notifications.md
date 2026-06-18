# Push Notifications

This article explains how to enable push notifications in Intercom for iOS. If you are new to push notifications in iOS, [check out this page first](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/how-mobile-push-notifications-and-messages-work).

To enable Intercom push notifications, you first need to create a private key, upload it to Intercom, and enter details about your app.

## Step 1: Create a Private Key

Using these [instructions](https://developer.apple.com/help/account/manage-keys/create-a-private-key/), create and download a private key with **APNs** enabled. Note the Key ID for the next step.

Alternatively, use an existing private key with **APNs** enabled.

## Step 2: Enable in Intercom

Go to your workspace settings and select [Installation > iOS](https://app.intercom.com/a/apps/_/settings/ios). In the "Enable Push Notifications" section:

1. Upload the `.p8` file you just created
2. Enter the Key ID from Step 1
3. Enter the [Bundle ID](https://developer.apple.com/account/resources/identifiers) for the app you want to send notifications to
4. Enter the [Apple team ID](https://developer.apple.com/account/#/membership)
5. Click Save


### Adding push credentials for multiple mobile apps

You can configure multiple push credentials if you have more than a single mobile app.
To create multiple push credentials, you must have a default push credential already configured.

Click on the **+ Configure another app** to add a new push credential.

![](/assets/multiple-push-credential.9dafc60430a1b064947af1cb955f80e89482866f100faf23babfcde743a0c9cc.71a4f21c.png)

## Step 3: Register Device Tokens

To enable your users to receive push notifications from Intercom via Intercom for iOS, you must [request permission](https://developer.apple.com/documentation/usernotifications/asking_permission_to_use_notifications) to send push notifications and register the device token of your user in your `AppDelegate`.

### Using Success and Failure Callbacks

Use this method when you need to handle both successful registration and errors:

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [Intercom setDeviceToken:deviceToken 
                     success:^{
                         // Device token successfully registered
                         NSLog(@"Device token registered successfully");
                     }
                     failure:^(NSError * _Nullable error) {
                         // Handle error
                         NSLog(@"Failed to register device token: %@", error.localizedDescription);
                     }];
}
```

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Intercom.setDeviceToken(deviceToken) {
        // Device token successfully registered
        print("Device token registered successfully")
    } failure: { error in
        // Handle error
        print("Failed to register device token: \(error?.localizedDescription ?? "Unknown error")")
    }
}
```

### Using Failure-Only Callback

Use this method when you only need to handle errors:

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [Intercom setDeviceToken:deviceToken failure:^(NSError * _Nullable error) {
        // Handle error
    }];
}
```

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Intercom.setDeviceToken(deviceToken) { error in
        // Handle error
    }
}
```

If the failure block of any of the above calls is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/docs/ios-error-codes) to help debug the issue.

At this stage you should also make sure that you have enabled the Push Notifications capability in Xcode.

![](/assets/0438986-image_16.e00528384e4c8776833f5ff41624dcb5df3dd110e873b6d7dd04e83391d5f2bb.71a4f21c.png)

## Step 4: Handling Intercom Push Notifications

### Automatically (Default)

When your app receives a push notification, Intercom for iOS checks if it is an Intercom push notification and opens the message if required. To do this we [safely swizzle](https://blog.newrelic.com/engineering/right-way-to-swizzle/) the public methods in `UIApplicationDelegate` that handle receiving push notifications. We do not use any private APIs to do this.

### Manually

In certain circumstances you may want more control of your push notifications. You can disable automatic handling of Intercom push notifications by doing the following:

1. Add the following to your `Info.plist`:
`IntercomAutoIntegratePushNotifications` with a value of `NO`


![](/assets/429a2ca-screenshot_2021-01-20_at_15.31.25.be6419df6192ce1b5d2eb528c23a49e9e1b086dcebe7466ae885a43a3f636b31.71a4f21c.png)

1. Handle Intercom push notifications manually in `didReceiveNotificationResponse` in your `UNUserNotificationCenterDelegate`:


```objectivec
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    //Add any custom push handling for your own app here
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    if ([Intercom isIntercomPushNotification:userInfo]) {
        [Intercom handleIntercomPushNotification:userInfo];
    }
    completionHandler(UIBackgroundFetchResultNoData);
}
```

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
  //Add any custom push handling for your own app here
  let userInfo = response.notification.request.content.userInfo
    if (Intercom.isIntercomPushNotification(userInfo))
        Intercom.handlePushNotification(userInfo)
    completionHandler(.noData)
}
```

## Step 5: Testing Intercom Push Notifications

You can test if push notifications are working properly in your app by sending a [manual message](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/manual-messages-explained) to the app user via Intercom.

## Badge Values

Intercom never changes the badge value of your app. Thus we can ensure that whatever badge value you're managing in your app, we don't alter in any way.

## Troubleshooting

If you are having trouble getting push notifications to work in your app, here's a list of things you should check:

- Ensure you ticked the box 'Send a push notification' when you send a manual message.
- Ensure you are [requesting permission](https://developer.apple.com/documentation/usernotifications/asking_permission_to_use_notifications) from your users to send push notifications.
- Do you get a device token from APNS? If you put a breakpoint into the `application:didregisterforremotenotificationswithdevicetoken:` delegate call, you should get a token shortly after your app launches.
- Have you set the correct Bundle ID in Settings > Installation > iOS? Make sure it matches the app that you want push notifications sent to.
- Is your private key still active? Check [your keys](https://developer.apple.com/account/resources/authkeys/list) to make sure it has not been revoked.
- You can find more technical information and troubleshooting steps in the [Apple iOS Developer Library](https://developer.apple.com/library/content/technotes/tn2265/_index.html).


And as always, you can contact us via [Intercom](https://intercom.com). We're always here to help 😀