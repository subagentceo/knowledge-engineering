# Push Notifications

This article explains how to enable push notifications in the Intercom React Native wrapper. If you are new to push notifications, [check out this page first](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/how-mobile-push-notifications-and-messages-work).

## Enable Android push notifications

## Step 1. Enable Google services for your app

If you already have a Firebase project with notifications enabled you can skip to the next step. Otherwise go to the [FCM Console page](https://console.firebase.google.com) and create a new project following these steps:

Give the project a name and click ‘**Create Project**’.

![](/assets/2ce6fe5-fcm_setup_1.07756ae88900ea31449e1be72ee4637e874b560abe5cabb6be1c8802abb4c352.71a4f21c.png)

Once your project is set up, scroll down and select the ‘**Cloud Messaging**’’ card.

![](/assets/8683d17-fcm_setup_2.a1503fc81382dfda4d101c71e96238e129412fcf579ef373f6e71b334bf13748.71a4f21c.png)

Click on the Android icon to continue setup.

![](/assets/30c2808-fcm_setup_3.479516370f4683ea16ca3e366322e677b4644cc57fb2178b2fc01ee10b24a153.71a4f21c.png)

Enter your app’s package name and click ‘**Register App**’.

![](/assets/502ab99-fcm_setup_4.5c962ec9cf7df9e4f6087c3e0a8562789b493cdc4d6692cfcc699838761202e8.71a4f21c.png)

## Step 2. Setup client to receive push

Click the button "Download google-services.json" to download the config file. You’ll need to move the `google-services.json` file into the `android/app` directory.

![](/assets/5d1b176-fcm_setup_5.1e0291d88aa7298f961211718a2545ac538a274c3be7db57dfdcdc3a2bbe0db3.71a4f21c.png)

Click "next" and then in `android/build.gradle` you'll need to add the following lines to your dependencies:

```groovy
buildscript {
    // ...
    dependencies {
        // ...
        classpath 'com.google.gms:google-services:4.2.0' // <-- Add this
    }
}
```

Next in `android/app/build.gradle`, in the `dependencies` block add `firebase-messaging` and at the bottom of the `build.gradle` add: `apply plugin: 'com.google.gms.google-services'`

It is important that this is at the very end of the file.

```groovy
// ...

dependencies{
    implementation "com.facebook.react:react-native:+"

    implementation 'com.google.firebase:firebase-messaging:24.1.+' // <-- Add this
    // ...
}
// ...

apply plugin: 'com.google.gms.google-services' // <-- Add this

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```

**Optional: Firebase Messaging Version Override**

By default, the Intercom React Native library uses Firebase Messaging version `24.1.+`. If you need to use a specific version for compatibility reasons, you can override it in your project's `android/build.gradle`:

```groovy
buildscript {
    ext {
        // ... other configurations
        firebaseMessagingVersion = "25.0.0" // Your desired version
    }
}
```

**Note:** We don't recommend overriding the Firebase Messaging version unless necessary for your specific use case.

You'll need to create a new class `MainNotificationService.java` inside your app directory(`/app/src/main/java/<package-name>`) with the following code:

```Kotlin
package com.example; // <-- Replace with your package

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.intercom.reactnative.IntercomModule;

 class MainNotificationService: FirebaseMessagingService {

	override fun onNewToken(refreshedToken: String) {
	    IntercomModule.sendTokenToIntercom(application, refreshedToken)
	    // DO HOST LOGIC HERE
	}

	override fun onMessageReceived(remoteMessage: RemoteMessage) {
	    if (IntercomModule.isIntercomPush(remoteMessage)) {
	     	IntercomModule.handlePush(application, message)
	    } else {
	        // DO HOST LOGIC HERE
	    }
	}
}
```

```java
package com.example; // <-- Replace with your package

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.intercom.reactnative.IntercomModule;

public class MainNotificationService extends FirebaseMessagingService {

  @Override public void onNewToken(String refreshedToken) {
    IntercomModule.sendTokenToIntercom(getApplication(), refreshedToken);
    //DO HOST LOGIC HERE
	}

  public void onMessageReceived(RemoteMessage remoteMessage) {
    if (IntercomModule.isIntercomPush(remoteMessage)) {
      IntercomModule.handleRemotePushMessage(getApplication(), remoteMessage);
    } else {
      // HANDLE NON-INTERCOM MESSAGE
    }
  }
}
```

Then edit the `AndroidManifest.xml` with the following snippet:

```xml
<!-- Add xmlns:tools to manifest. See example below-->
<manifest
  xmlns:tools="http://schemas.android.com/tools"
>
  <application>
    <activity>
      ...
    </activity>
    ...

    <!-- START: Add this-->
    <service
      android:name=".MainNotificationService">
      <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
      </intent-filter>
    </service>

    <receiver
      android:name="com.intercom.reactnative.RNIntercomPushBroadcastReceiver"
      tools:replace="android:exported"
      android:exported="true"/>
    <!-- END: Add this-->

  </application>
</manifest>
```

Once that's all done, click the Next button in Firebase and then skip the verification step.

## Step 3. Enabling push in Intercom Android settings

Finally, click the settings cog and select **Project settings**, then **Cloud Messaging tab**.

![](/assets/436cd2e-fcm_setup_6.3bee73a5a5a82b1bac67b2d267c8a70732fccfcf4823204ff5c8daaec64bd0b3.71a4f21c.png)

For new FCM projects, Firebase Cloud Messaging API v1 is enabled by default. If it's disabled in an older project, you can enable it in Google Cloud Console by clicking the **three dots** icon, selecting **Manage API**, and then clicking the **Enable** button.

Under the Project settings page, select the **Service Accounts** tab and under Firebase Admin SDK, ensure that Node.js is selected and then click on Generate new private key

![](/assets/fcm-service-account-settings.5ef7cd2d514557b88bc1ec2d9af62e279b0510fbcee40d2fa8a3381b51fa1b66.71a4f21c.png)

Open your Intercom app’s settings and select ‘**Installation -> Android**’. Then find the ‘**Enable Push Notifications**’ section.
Upload the private key which you downloaded from FCM under the Service Account private key field along with the Bundle ID.

> 📘 Note
For more information on how to migrate to FCM HTTP v1, check our [migration guide](https://developers.intercom.com/installing-intercom/android/fcm-migration-guide/).


![](/assets/fcm-setup-android.1a13e9e79188ec8b99d6f007f4a8a1fa028c68a64bf19e701c8ef697f8d28789.71a4f21c.png)

That's all the setup for Android, if your React Native app also supports iOS continue to the next step.

## Enable iOS push notifications

To enable Intercom push notifications for iOS, you first need to create a private key, upload it to Intercom, and enter details about your app.

## Step 1: Create a Private Key

Using these [instructions](https://help.apple.com/developer-account/#/devcdfbb56a3), create and download a private key with **APNs** enabled. Note the Key ID for the next step.

Alternatively, use an existing private key with **APNs** enabled.

Next add **Push Notifications and Background Modes > Remote Notifications** to your target as explained [here](https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app)

## Step 2: Enable in Intercom

Go to your workspace settings and select Installation > iOS. In the "Enable Push Notifications" section:

1. Upload the .p8 file you just created
2. Enter the Key ID from Step 1
3. Enter the [Bundle ID](https://developer.apple.com/account/resources/identifiers) for the app you want to send notifications to
4. Enter the [Apple team ID](https://developer.apple.com/account/#/membership)
5. Click Save


![](/assets/c0825d0-image_15.60e392fec7ca71c3c42c84764a41a0fdfa8278e185893dc4670762ac0f87fdd2.71a4f21c.png)

## Step 3: Register Device Tokens

To enable your users to receive push notifications from Intercom, you must [request permission](https://developer.apple.com/documentation/usernotifications/asking_permission_to_use_notifications). There are 2 options you can choose.

### Option 1: In your JavaScript code

Using [react-native-notifications](https://wix.github.io/react-native-notifications):

```javascript
// Request notification permissions
Notifications.registerRemoteNotifications();

// When permission is granted, send the device token to Intercom using [Intercom.sendTokenToIntercom(token)](#intercomsendtokentointercomtoken)
Notifications.events().registerRemoteNotificationsRegistered(
  ({ deviceToken }: Registered) => {
    Intercom.sendTokenToIntercom(deviceToken);
  },
);
```

### Option 2: In your native code

In your AppDelegate.m at the top add the following import:

```objectivec
#import <UserNotifications/UserNotifications.h>
```

Request notification permissions when app launches by adding the following to `didFinishLaunchingWithOptions`:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...

    // START: Code to add
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound)
                          completionHandler:^(BOOL granted, NSError *_Nullable error) {
                          }];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
    // END: Code to add

    return YES;
}
```

In same file, above `@end` add the following snippet to send the device token to Intercom when permission is granted:

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [IntercomModule setDeviceToken:deviceToken];
}

@end
```

At this stage you should also make sure that you have enabled the Push Notifications capability in Xcode.

![](/assets/0438986-image_16.e00528384e4c8776833f5ff41624dcb5df3dd110e873b6d7dd04e83391d5f2bb.71a4f21c.png)

## Step 4: Handling Intercom Push Notifications

When your app receives a push notification, the React Native wrapper checks if it is an Intercom push notification and opens the message if required. To do this we [safely swizzle](https://blog.newrelic.com/engineering/right-way-to-swizzle/) the public methods in `UIApplicationDelegate` that handle receiving push notifications. We do not use any private APIs to do this.

## Expo push notifications

If you are using Expo, the `@intercom/intercom-react-native` config plugin automatically handles the native push notification setup for both Android and iOS at prebuild time.

You still need to:

1. Set up your push credentials in Intercom ([Android](#step-3-enabling-push-in-intercom-android-settings) | [iOS](#step-2-enable-in-intercom))
2. For Android, place your `google-services.json` and link it in your Expo config:


```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

1. Request notification permission from your users (e.g. using [react-native-permissions](https://github.com/zoontek/react-native-permissions))


After configuring, run `npx expo prebuild` to regenerate your native projects.

## Testing Intercom Push Notifications

You can easily test if push notifications are working properly in your app. Just send a [manual message](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/manual-messages-explained) to the app user via Intercom.

## Troubleshooting

If you are having trouble getting push notifications to work in your app, here's a list of things you should check:

- Ensure you ticked the box 'Send a push notification' when you send a manual message.
**iOS**
- Ensure you are [requesting permission](https://developer.apple.com/documentation/usernotifications/asking_permission_to_use_notifications) from your users to send push notifications.
- Do you get a device token from APNS? If you put a breakpoint into the `application:didregisterforremotenotificationswithdevicetoken:` delegate call, you should get a token shortly after your app launches.
- Have you set the correct Bundle ID in Settings > Installation > iOS? Make sure it matches the app that you want push notifications sent to.
- Is your private key still active? Check [your keys](https://developer.apple.com/account/resources/authkeys/list) to make sure it has not been revoked.
- You can find more technical information and troubleshooting steps in the [Apple iOS Developer Library](https://developer.apple.com/library/content/technotes/tn2265/_index.html).
**Android**
- Check that the notifications are not disabled for your app on your test device. *Settings > Sound & Notification > App notifications.* This may differ depending on the Android version.
- Did you specify the correct Push Server API key?
- Make sure you added your `google-services.json` file in the correct directory.*


And as always, you can contact us via [Intercom](https://intercom.com). We're always here to help 😀