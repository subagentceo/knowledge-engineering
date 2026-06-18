# Push Notifications

Below, we’ll show you how to send [push notifications](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/how-mobile-push-notifications-and-messages-work) and/or [push messages](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/how-mobile-push-notifications-and-messages-work) to your customers, with Firebase Cloud Messaging (FCM) in Intercom.

## Step 1. Enable Google services for your app

If you already have a Firebase project with notifications enabled you can skip to the next step. Otherwise go to the [FCM Console page](https://console.firebase.google.com) and create a new project following these steps:

Click ‘**Add Project**’ and give the project a name.

Once your project is set up, scroll down and select the ‘**Cloud Messaging**’ card.

![](/assets/8683d17-fcm_setup_2.a1503fc81382dfda4d101c71e96238e129412fcf579ef373f6e71b334bf13748.71a4f21c.png)

Click on the Android icon to continue setup.

![](/assets/30c2808-fcm_setup_3.479516370f4683ea16ca3e366322e677b4644cc57fb2178b2fc01ee10b24a153.71a4f21c.png)

Enter your app’s package name and click ‘**Register App**’.

![](/assets/502ab99-fcm_setup_4.5c962ec9cf7df9e4f6087c3e0a8562789b493cdc4d6692cfcc699838761202e8.71a4f21c.png)

## Step 2. Setup client to receive push

Click the button "Download google-services.json" to download the config file. You’ll need to move that file into the same directory as your application level `build.gradle`.

![](/assets/5d1b176-fcm_setup_5.1e0291d88aa7298f961211718a2545ac538a274c3be7db57dfdcdc3a2bbe0db3.71a4f21c.png)

Click "next" and then in your apps `build.gradle` you will need to add the following lines to your dependencies:

```groovy
dependencies {
    implementation 'io.intercom.android:intercom-sdk:latest.release'
    implementation 'com.google.firebase:firebase-messaging:23.1.+'
}
```

```Kotlin
dependencies {
    implementation("io.intercom.android:intercom-sdk:latest.release")
    implementation("com.google.firebase:firebase-messaging:23.1.+")
}
```

Instead of `latest.release`, it is best practice to replace it with the latest version number. You can get our latest Intercom Android SDK version from [here](https://github.com/intercom/intercom-android/releases).

At the bottom of your `build.gradle` you must add:

`apply plugin: 'com.google.gms.google-services'`

It is important that this is at the very end of the file.

Click the Next button and then skip the verification step.

## Step 3. Enable in Intercom

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

### Adding push credentials for multiple mobile apps

You can configure multiple push credentials if you have more than a single mobile app.
To create multiple push credentials, you must have a default push credential already configured.

Click on the **+ Configure another app** to add a new push credential.

![](/assets/multiple-push-credential.9dafc60430a1b064947af1cb955f80e89482866f100faf23babfcde743a0c9cc.71a4f21c.png)

You will need to update the Bundle ID for the existing push configuration if you wish to set up multiple push credentials.

## Step 4. Setting your FCM icon (Optional)

If you want to add a custom icon for your notifications, just add an image named `intercom_push_icon.png` to each of your supported densities. Please note that vector drawables cannot be used here. For example:

```xml
/res/drawable-xxhdpi/intercom_push_icon.png
/res/drawable-xhdpi/intercom_push_icon.png
/res/drawable-hdpi/intercom_push_icon.png
/res/drawable-mdpi/intercom_push_icon.png
```

> 👍 Notifications icon design guidelines
We recommend following these **[material design guidelines](https://material.google.com/patterns/notifications.html)** for producing this icon.


## Step 5. Disable push on log out

To stop users from receiving push messages when they have logged out of the app make sure to call:

```Kotlin
Intercom.client().logout()
```

```Java
Intercom.client().logout();
```

## Step 6. Using Intercom with other FCM setups (Optional)

The Intercom android sdk already comes with a default implementation of FirebaseMessagingService. This provides default implementations for `onNewToken` and `onMessageReceived` for FCM to work with Intercom. This step can be skipped if your app uses only Intercom for Push Notifications

If your application uses FCM for your own content, or if you use a third-party service for FCM. You’ll need to update your `FirebaseInstanceIdService` and `FirebaseMessagingService`.

You should have a class that extends `FirebaseMessagingService` or the now deprecated `FirebaseInstanceIdService`. That service is where you get the device token to send to your backend to register for push. To register for Intercom push set it up like this:

```Kotlin
private val intercomPushClient = IntercomPushClient()

override fun onNewToken(refreshedToken: String) {
    intercomPushClient.sendTokenToIntercom(application, refreshedToken)
    // DO HOST LOGIC HERE
}

override fun onMessageReceived(remoteMessage: RemoteMessage) {
    val message = remoteMessage.data
    if (intercomPushClient.isIntercomPush(message)) {
     intercomPushClient.handlePush(application, message)
    } else {
        // DO HOST LOGIC HERE
    }
}
```

```Java
private final IntercomPushClient intercomPushClient = new IntercomPushClient();

@Override public void onNewToken(String refreshedToken) {
    intercomPushClient.sendTokenToIntercom(getApplication(), refreshedToken);
    //DO HOST LOGIC HERE
}

public void onMessageReceived(RemoteMessage remoteMessage) {
    Map message = remoteMessage.getData();
    if (intercomPushClient.isIntercomPush(message)) {
        intercomPushClient.handlePush(getApplication(), message);
    } else {
        //DO HOST LOGIC HERE
    }
}
```

## Troubleshooting tips

If you’re having trouble getting FCM to work in your app, here's a list of things you should check:

- Make sure to tick the 'Send a push notification' box when you send a manual message.
- Check that the notifications are not disabled for your app on your test device. *Settings > Sound & Notification > App notifications.* This may differ depending on the Android version.
- Did you specify the correct Push Server API key?
- Make sure you added your `google-services.json` file in the correct directory.


And as always, you can contact us via [Intercom](https://intercom.com). We're always here to help 😀