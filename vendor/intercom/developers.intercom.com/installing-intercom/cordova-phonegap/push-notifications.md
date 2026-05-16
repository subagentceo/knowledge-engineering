# Push Notifications

Intercom for mobile supports Push Notifications on iOS and Firebase Cloud Messaging (FCM) on Android. To get started, you can read our [FCM docs](/installing-intercom/android/fcm-push-notifications), or our [iOS docs](/installing-intercom/ios/push-notifications).

## iOS

To enable iOS push notifications, simply call the following anywhere in your code:


```javascript
intercom.registerForPush();
```

## Android

To enable Android FCM push notifications, copy your `google-services.json` file into the root directory of your project and add the lines to `config.xml`


```xml
<preference name="intercom-android-push-type" value="FCM"/>
<resource-file src="google-services.json" target="app/google-services.json" />
```

As always, you can contact us via [Intercom](https://intercom.com). We're always here to help 😀