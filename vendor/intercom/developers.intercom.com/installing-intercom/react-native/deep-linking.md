# Deep Linking

Using Intercom you can embed a deep link in your in-app messages or as the URI for your push messages.

There are comprehensive guides on enabling deep links on both platforms [here](https://reactnative.dev/docs/linking#enabling-deep-links).

## Setting up a Deep Link in Android

You'll need to set up a deep link in your apps `AndroidManifest.xml`. Android supports both *app://page* and *[http://www.app.com/page](http://www.app.com/page)* type schemes.

```xml
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
  android:launchMode="singleTask"
  android:windowSoftInputMode="adjustResize">
  <intent-filter>
    <action android:name="android.intent.action.MAIN"/>
    <category android:name="android.intent.category.LAUNCHER"/>
  </intent-filter>

  <!--  START: Add this  -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>

    <data android:scheme="http" android:host="Your app url(www.app.com)"/> <!-- Edit this line -->
    <data android:scheme="Your app scheme(app)"/> <!-- Edit this line -->
  </intent-filter>
  <!--  END: Add this  -->

</activity>
```

To ensure your app navigates to the correct screen when a deep link is used, add the following code to your `MainActivity`

```Kotlin
override fun onNewIntent(intent: Intent) {
  super.onNewIntent(intent)
  setIntent(intent)
}
```

```Java
@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
}
```

## Setting up a Deep Link in iOS

Intercom supports both Universal Links and Custom URL Schemes as a deep link.
Please follow the [instructions for Universal Links](https://developers.intercom.com/installing-intercom/docs/ios-deep-linking) on our main iOS page.

You'll also need to add the import to your `AppDelegate.m`

```objectivec
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTLinkingManager.h> // <--Add this
```

Add finally include this snippet code in your `AppDelegate.m` above `@end`

```objectivec
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

## Linking to your app

Once you have set up your app to respond to your deep link, you can send a push message with that as the URI. Tapping the push message will open your app to the specified page.

![](/assets/b16300b-screen_shot_2017-05-16_at_16.01.00.e83035972d5f257bf366b56543ad8aabd621f3998a122c62a3d9ae2372331b71.71a4f21c.png)

You can also add a link to your in-app messages and replies as follows:

![](/assets/c694652-screen_shot_2017-05-16_at_15.46.12.52d2dd041765887c4e7a9837d6633038d2dc4d50c229653851bf44fc220d3e0b.71a4f21c.png)