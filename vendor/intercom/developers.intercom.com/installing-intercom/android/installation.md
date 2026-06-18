# Installation

Install Intercom to see and talk to users of your Android app. Intercom for Android supports API 21 and above.

We recommend using the latest available `compileSdkVersion`.

## Step 1 - Install Intercom

If you’re new to Intercom, you’ll need to [create an account](https://www.intercom.com) and start your free trial.

Go to your [settings](https://app.intercom.com/a/apps/_/settings/android) and under Installation select install for mobile.

![](/assets/messenger_installation_2024_web_or_mobile.04d989f4654a1e75e44c3b499eeb5cf93cc6d9c9fe74768018e66b6c162ba998.71a4f21c.png)

Then choose Android.

![](/assets/messenger_installation_2024_mobile.6dd45f6f943cf7b9e6a6279674730c6f183c7ad361cf73e4d26b108efaca7757.71a4f21c.png)

Next, enable user traffic for Messenger.

Enable Messenger
You must ensure that the Android Messenger is enabled from inside the [Intercom settings panel](https://app.intercom.com/a/apps/_/settings/android). When this is disabled, all requests to Intercom will fail.

![](/assets/messenger_installation_enable_traffic.1966802ecfd36b289cb11c1743b85847fa3f65732abb9a739704e4548bdf4022.71a4f21c.png)

Then you have two options:

### Option 1: Install Intercom with Push Messaging

Add the following dependency to your app's `build.gradle` file:

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

### Option 2: Install Intercom without Push Messaging

If you'd rather not have push notifications in your app, you can use this dependency:

```groovy
dependencies {
    implementation 'io.intercom.android:intercom-sdk-base:latest.release'
}
```

```Kotlin
dependencies {
    implementation("io.intercom.android:intercom-sdk-base:latest.release")
}
```

## Maven central

If you choose this method you won’t be able to send push messages.

Intercom is hosted on maven central. You will need to add maven central to your root **build.gradle** file.

```xml
allprojects {
    repositories {
      mavenCentral()
    }
}
```

## Permissions

We include the [INTERNET](http://developer.android.com/reference/android/Manifest.permission.html#INTERNET) permission by default as we need it to make network requests:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

**Image Attachments**: No additional permissions are required for image attachments on modern Android versions (Android 10+). The SDK uses the system photo picker and scoped storage APIs that don't require storage permissions.

You can also include [VIBRATE](http://developer.android.com/reference/android/Manifest.permission.html#VIBRATE) to enable vibration in push notifications:

```xml
<uses-permission android:name="android.permission.VIBRATE"/>
```

Transitive Dependencies
As of version 9.0.0, Intercom Android SDK transitively depends on the latest versions of Gson, Otto, Okio, Okhttp and Retrofit. If your app is using any one of these libraries, they should at least be on the same major version that the Intercom SDK is using. When there are two versions of a library at build time, Gradle automatically picks the newer version. This means if you are currently using Retrofit 2.4.0, you would automatically get Retrofit 2.9.0 after including Intercom.

For the exact version numbers we are using, please check the [dependency graph](https://mvnrepository.com/artifact/io.intercom.android/intercom-sdk-base/) on Maven Central.

## Step 2 - Initialize Intercom

Initialize Intercom by calling the following in the `onCreate()` method of your application class:

```Kotlin
Intercom.initialize(this, "your api key", "your app id")
```

```Java
Intercom.initialize(this, "your api key", "your app id");
```

If you don't currently implement a custom application, you’ll need to create one. A custom application looks like this:

```Kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Intercom.initialize(this, "your api key", "your app id")
    }
}
```

```Java
public class CustomApplication extends Application {
    @Override public void onCreate() {
        super.onCreate();
        Intercom.initialize(this, "your api key", "your app id");
   }
}
```

You’ll need to update your manifest to use your application:

```xml
<application
    android:name=".CustomApplication">
</application>
```

Intercom must be initialized inside the application `onCreate()` method. Initializing anywhere else will result in Intercom not behaving as expected and could even result in the host app crashing.

You can also manage your API Keys during this step.

![](/assets/android_api_key.f0f5f5d7adba0e49820089f1756f4a9f54f75e177f83b0503ee58e3318ee8d13.71a4f21c.png)

## Step 3 — Check the Installation

You can check to see if your installation was successful. If the Messenger has been found for your chosen installation you will receive a success notification, otherwise or you will be notified that something has gone wrong.

![](/assets/messenger_installation_check_installation.b49889b301d97ff131f921529d28108027854a09b3a2e7c48dba1d9cb396035b.71a4f21c.png)

# What next?

Once you've installed Intercom you can start using Intercom in your Android app.

- [Configure it for your Android app](/installing-intercom/android/using-intercom).
- [Enable push notifications](/installing-intercom/android/fcm-push-notifications) so you can send push messages.
- [Enable Identity Verification](/installing-intercom/android/secure-your-messenger) for your Android app.