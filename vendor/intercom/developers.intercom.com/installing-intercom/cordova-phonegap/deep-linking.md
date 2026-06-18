# Deep Linking

Using Intercom you can embed a deep link in your in-app messages or as the URI for your push messages.

## Setting up a Deep Link in Android

You'll need to set up a deep link in your app's `config.xml`, which Cordova translates into the appropriate `AndroidManifest.xml` entries. Android supports both *app://page* and *[http://www.app.com/page](http://www.app.com/page)* type schemes.

Add the following inside the `<platform name="android">` section of your `config.xml`:

```xml
<platform name="android">
    <config-file target="AndroidManifest.xml" parent="/manifest/application/activity[@android:name='MainActivity']">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />

            <data android:scheme="http" android:host="Your app url(www.app.com)"/> <!-- Edit this line -->
            <data android:scheme="Your app scheme(app)"/> <!-- Edit this line -->
        </intent-filter>
    </config-file>
</platform>
```

## Setting up a Deep Link in iOS

Intercom supports both Universal Links and Custom URL Schemes as a deep link.
Please follow the [instructions for Universal Links](https://developers.intercom.com/installing-intercom/docs/ios-deep-linking) on our main iOS page.

### Custom URL Scheme

Add the following inside the `<platform name="ios">` section of your `config.xml`:

```xml
<platform name="ios">
    <config-file target="*-Info.plist" parent="CFBundleURLTypes">
        <array>
            <dict>
                <key>CFBundleURLSchemes</key>
                <array>
                    <string>myapp</string>
                </array>
            </dict>
        </array>
    </config-file>
</platform>
```

Replace `myapp` with your own custom URL scheme.

## Handling Deep Links in Your App

When a deep link opens your Cordova app, you can handle it using the global `handleOpenURL` function:

```javascript
function handleOpenURL(url) {
    // Parse the URL and navigate accordingly
    if (url.indexOf('myapp://settings') === 0) {
        window.location.hash = '#/settings';
    } else if (url.indexOf('myapp://profile') === 0) {
        window.location.hash = '#/profile';
    }
}
```

## Linking to your app

Once you have set up your app to respond to your deep link, you can send a push message with that as the URI. Tapping the push message will open your app to the specified page.

![](/assets/b16300b-screen_shot_2017-05-16_at_16.01.00.e83035972d5f257bf366b56543ad8aabd621f3998a122c62a3d9ae2372331b71.71a4f21c.png)

You can also add a link to your in-app messages and replies as follows:

![](/assets/c694652-screen_shot_2017-05-16_at_15.46.12.52d2dd041765887c4e7a9837d6633038d2dc4d50c229653851bf44fc220d3e0b.71a4f21c.png)