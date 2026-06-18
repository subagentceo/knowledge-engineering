# Deep Linking

Using Intercom you can embed a deep link in your in-app messages or as the URI for your push messages.

## Setting up a Deep Link in your App

You will need to set up a deep link in your apps AndroidManifest.xml. Android supports both *app://page* and *[http://www.app.com/page](http://www.app.com/page)* type schemes.

```xml
<activity android:name="app.SettingsActivity">    
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="http"
              android:host="www.app.com"
              android:pathPrefix="/settings" />
        <data android:scheme="app"
              android:host="settings" />
    </intent-filter>
</activity>
```

## Linking to your app

Once you have set up your app to respond to a URI, you can send a push message with that as the URI. Tapping the push message will open your app to the specified page.

![](/assets/ecd07b5-screen_shot_2017-05-16_at_15.41.45.69a553305a05e5cd1d7053fa13d43d13a2577630eba0e1f35d216d924fd846f5.71a4f21c.png)

You can also add a link to your in-app messages and replies as follows:

![](/assets/c694652-screen_shot_2017-05-16_at_15.46.12.52d2dd041765887c4e7a9837d6633038d2dc4d50c229653851bf44fc220d3e0b.71a4f21c.png)

## Linking to other apps

You can link to other apps instead of your own. For example if you wanted to link to a location in Google Maps you could set the URI. Tapping the push message would open the Maps app and move you to the coordinates provided.

![](/assets/c63cc33-screen_shot_2017-05-16_at_13.47.44.4fa4798deb9bc488a6f63ed71fcc6d9b045630e67f4fa72bd10733d1079cbdaa.71a4f21c.png)