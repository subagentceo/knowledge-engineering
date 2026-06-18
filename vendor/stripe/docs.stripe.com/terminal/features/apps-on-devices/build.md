# Build and test your app

Learn how to build and test your app using a DevKit.

Access the Apps on Devices sample integration repository on [GitHub](https://github.com/stripe-samples/terminal-apps-on-devices).

Use your SmartPOS DevKit device to test and iterate your application without going through the deployment, app review, or signing process.

If you need a DevKit device, you can [order up to five per user](https://docs.stripe.com/terminal/fleet/order-and-return-readers.md) from the [Readers](https://dashboard.stripe.com/terminal) section in your Dashboard.

> #### Verifone reader support
> 
> Verifone reader support is in **public preview** for the United States and Canada and **private preview** for Ireland and the United Kingdom (V660p, UX700, P630), Singapore (V660p, P630), and Australia (V660p, UX700, P630).
> 
> To join either preview, you must [contact the Sales team to order the applicable reader](https://stripe.com/contact/sales).

## Set up the DevKit 

Before you can use your DevKit for app development, you must do the following:

1. Follow the on-screen prompts to connect to a network.
2. [Register](https://docs.stripe.com/terminal/payments/connect-reader.md?terminal-sdk-platform=android&reader-type=internet#register-reader) the device to your Stripe account.
3. Install all available updates.

After the initial setup, you can register your DevKit to another account or location at any time. To do so, connect the DevKit to the internet and follow the steps to [register a reader](https://docs.stripe.com/terminal/payments/connect-reader.md?terminal-sdk-platform=android&reader-type=internet#register-reader).

While similar to production devices, DevKit devices:

- Can only operate in [sandboxes](https://docs.stripe.com/keys.md#test-live-modes).
- Ship with [developer options](https://developer.android.com/studio/debug/dev-options) and [Android Debug Bridge](https://developer.android.com/studio/command-line/adb) (`adb`) enabled by default.
- Display an on-screen watermark to indicate that the device is only used for testing. The watermark moves around the screen while the device is in use so that you can see all parts of the screen.

The Terminal API supports targeting registered DevKit devices.

## Develop your app for Stripe devices 

Use the following steps to develop your app for Stripe Android devices, including setting up the app and handing it off to the Stripe Reader app.

## Set up the app [Client-side]

#### Android

First, [set up your integration](https://docs.stripe.com/terminal/payments/setup-integration.md?terminal-sdk-platform=android) for in-person payments. Then, follow the guidance below for Apps on Devices integrations.

### Add dependencies

Add the following dependencies to your project’s Gradle build script. Apps on Devices integrations require [Terminal Android SDK](https://github.com/stripe/stripe-terminal-android) version `2.22.0` or later. We recommend that you integrate with the [latest version](https://github.com/stripe/stripe-terminal-android/releases).

#### Kotlin

```kotlin
dependencies {
   implementation("com.stripe:stripeterminal-core:5.6.0")
   implementation("com.stripe:stripeterminal-appsondevices:5.6.0")
}
```

Make sure that you aren’t using any other Stripe Terminal SDK dependencies. For example, if you previously integrated the Terminal Android SDK, don’t use the top-level `com.stripe:stripeterminal` dependency (for example, `com.stripe:stripeterminal:5.6.0`).

See an example of [including dependencies in your app’s build script](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/build.gradle.kts#L66).

### Configure your application

To inform the Stripe SDK of lifecycle events, add a [TerminalApplicationDelegate.onCreate()](https://stripe.dev/stripe-terminal-android/core/com.stripe.stripeterminal/-terminal-application-delegate/on-create.html) call to the [onCreate()](https://developer.android.com/reference/android/app/Application#onCreate\(\)) method for your application subclass.

#### Kotlin

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        TerminalApplicationDelegate.onCreate(this)
    }
}
```

In your [app manifest](https://developer.android.com/guide/topics/manifest/manifest-intro), specify the name of your `Application` subclass with the `android:name` attribute.

> To ensure your `Application` supports devices running Android 15, set the `targetSdkVersion` to `24` or later.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"><application android:name=".MyApp">
    <!-- App manifest contents -->
    </application>
</manifest>
```

Learn more about [setting up your integration](https://docs.stripe.com/terminal/payments/setup-integration.md?terminal-sdk-platform=android) or see the Apps on Devices sample app GitHub repository for an example of [configuring the Application subclass](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/src/main/java/com/stripe/aod/sampleapp/MyApp.kt#L10).

#### React Native

First, [set up your integration](https://docs.stripe.com/terminal/payments/setup-integration.md?terminal-sdk-platform=react-native) for in-person payments. Then, follow the guidance below for Apps on Devices integrations.

### Configure your application

To inform the Stripe SDK of lifecycle events, add a `TerminalApplicationDelegate.onCreate()` call to the [onCreate()](https://developer.android.com/reference/android/app/Application#onCreate\(\)) method for your application subclass.

#### Kotlin

```kotlin
import com.stripeterminalreactnative.TerminalApplicationDelegate

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        TerminalApplicationDelegate.onCreate(this)
    }
}
```

In your [app manifest](https://developer.android.com/guide/topics/manifest/manifest-intro), specify the name of your `Application` subclass with the `android:name` attribute.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"><application android:name=".MainApplication">
    <!-- App manifest contents -->
    </application>
</manifest>
```

Learn more about [setting up your integration](https://docs.stripe.com/terminal/payments/setup-integration.md?terminal-sdk-platform=react-native) or see the sample app on React Native GitHub repository for an example of [configuring the Application subclass](https://github.com/stripe/stripe-terminal-react-native/blob/main/dev-app/android/app/src/main/java/com/dev/app/stripeterminalreactnative/MainApplication.java#L58).

### Serverless initialization

For Apps on Devices, you can use `AppsOnDevicesConnectionTokenProvider` instead of a back-end token provider. This enables initialization without a back-end server providing connection tokens.

```js
import {
  StripeTerminalProvider,
  AppsOnDevicesConnectionTokenProvider,
} from '@stripe/stripe-terminal-react-native';

function Root() {
  return (
    <StripeTerminalProvider tokenProvider={AppsOnDevicesConnectionTokenProvider}>
      <App />
    </StripeTerminalProvider>
  );
}
```

## Build the app [Client-side]

Follow the guidance below for Apps on Devices integrations.

### Discover and connect a reader

#### Android

> In version `5.0.0` of the Android SDK, you can use the `easyConnect` method to combine reader discovery and connection into a single API call to simplify integration. See the [SDK migration guide](https://docs.stripe.com/terminal/references/sdk-migration-guide.md#update-your-reader-connection-usage) for details.

You must register a new Stripe device to your account as a new [Reader object](https://docs.stripe.com/api/terminal/readers/object.md). Use the pairing code provided in the device’s admin settings to [create the Reader object](https://docs.stripe.com/api/terminal/readers/create.md). Your app uses the Stripe Terminal Android SDK to discover and connect to your device:

See more examples of how to [discover](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/src/main/java/com/stripe/aod/sampleapp/model/MainViewModel.kt#L90) and [connect](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/src/main/java/com/stripe/aod/sampleapp/model/MainViewModel.kt#L106) using handoff mode in the Apps on Devices sample integration repository on [GitHub](https://github.com/stripe-samples/terminal-apps-on-devices).

1. Your app runs on your registered device.
2. Your app discovers the reader by calling [discoverReaders](https://stripe.dev/stripe-terminal-android/core/com.stripe.stripeterminal/-terminal/discover-readers.html) with [AppsOnDevicesDiscoveryConfiguration](https://stripe.dev/stripe-terminal-android/external/com.stripe.stripeterminal.external.models/-discovery-configuration/-apps-on-devices-discovery-configuration/index.html).
3. Your app connects to the reader by using [connectReader](https://stripe.dev/stripe-terminal-android/core/com.stripe.stripeterminal/-terminal/connect-reader.html).

The following example shows how to discover and connect to a Stripe reader using handoff mode in an Android app:

#### Kotlin

```kotlin
private fun discoverReaders() {
    Terminal.getInstance().discoverReaders(config = AppsOnDevicesDiscoveryConfiguration(),
        discoveryListener = object : DiscoveryListener {
            override fun onUpdateDiscoveredReaders(readers: List<Reader>) {
                // In Apps on Devices discovery, the list will
                // contain a single reader. Connect to
                // the reader after it is discovered.
                readers.firstOrNull()?.let { reader ->
                    connectReader(reader)
                }
            }
        },
        callback = object : Callback {
            override fun onSuccess() {
                // Handle successfully discovering readers
            }

            override fun onFailure(e: TerminalException) {
                // Handle exception while discovering readers
            }
        }
    )
}

private fun connectReader(reader: Reader) {
    Terminal.getInstance().connectReader(
        reader,AppsOnDevicesConnectionConfiguration(
            object : AppsOnDevicesReaderListener {
                override fun onDisconnect(reason: DisconnectReason) {
                    // Optionally get notified about reader disconnects (for example, reader was rebooted)
                }

                override fun onReportReaderEvent(event: ReaderEvent) {
                    // Optionally get notified about reader events (for example, a card was inserted)
                }
            }
        ),
        object : ReaderCallback {
            override fun onSuccess(reader: Reader) {
                // Handle successfully connecting to the reader
            }

            override fun onFailure(e: TerminalException) {
                // Handle exception when connecting to the reader
            }
        }
    )
}
```

#### React Native

> In version `0.0.1-beta.29` of the React Native SDK, you can use the [easyConnect](https://stripe.dev/stripe-terminal-react-native/api-reference/interfaces/StripeTerminalSdkType.html#easyconnect) method to combine reader discovery and connection into a single API call to simplify integration.

You must register a new Stripe device to your account as a new [Reader object](https://docs.stripe.com/api/terminal/readers/object.md). Use the pairing code provided in the device’s admin settings to [create the Reader object](https://docs.stripe.com/api/terminal/readers/create.md). Your app uses the Stripe Terminal React Native SDK to discover and connect to your device:

1. Your app runs on your registered device.
2. Your app discovers the reader by calling [discoverReaders](https://stripe.dev/stripe-terminal-react-native/api-reference/interfaces/StripeTerminalSdkType.html#discoverReaders) with `appsOnDevices` [discovery method](https://stripe.dev/stripe-terminal-react-native/api-reference/modules/Reader.Android.html#DiscoveryMethod).
3. Your app connects to the reader by using [connectReader](https://stripe.dev/stripe-terminal-react-native/api-reference/interfaces/StripeTerminalSdkType.html#connectreader-1).

The following example shows how to discover and connect to a Stripe reader using Apps on Devices mode in a React Native app:

```js
const { discoverReaders, connectReader, discoveredReaders } =
    useStripeTerminal({
      onUpdateDiscoveredReaders: async (readers) => {
        // After the SDK discovers a reader, your app can connect to it.
        // The discoverReaders method doesn't resolve until discovery completes,
        // so use this callback to handle discovered readers.
        if (readers.length > 0) {
          const { reader, error } = await connectReader({
              discoveryMethod: 'appsOnDevices',
              reader: readers[0],
          });

          if (error) {
            console.log('connectReader error:', error);
            return;
          }

          console.log('Reader connected successfully', reader);
        }
      },
    });

  const handleDiscoverReaders = async () => {
    const { error } = await discoverReaders({
      discoveryMethod: 'appsOnDevices',
    });

    if (error) {
      console.log('discoverReaders error:', error);
    }
  };

  useEffect(() => {
    handleDiscoverReaders();
  }, [discoverReaders]);
```

### Collect payments

After you connect to the reader using handoff mode, you can start [collecting payments](https://docs.stripe.com/terminal/payments/collect-card-payment.md?terminal-sdk-platform=android#create-payment).

The Stripe Reader app handles payment collection and other payment operations, such as [saving payment details](https://docs.stripe.com/terminal/features/saving-payment-details/overview.md). When initiating a payment operation, the Stripe Reader app becomes the primary and launches in full screen. Then, the Stripe Reader app guides the customer through the flow and returns control to your app after completion (success or failure) or customer cancellation. When control returns to your app, the Stripe Reader app continues to run in the background.

See an example of [collecting payment in an Apps on Devices app](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/src/main/java/com/stripe/aod/sampleapp/model/CheckoutViewModel.kt#L82).

#### Collect payments while offline

Apps on Devices supports [offline payment collection](https://docs.stripe.com/terminal/features/operate-offline/collect-card-payments.md?terminal-sdk-platform=android&reader-type=internet).

## Customize app transitions [Client-side]

When a payment operation starts, the Stripe Reader app comes to the foreground and your app transitions to the background. Unless specified, the transition uses the Android system default animation, which slides from the right.

> Custom transition animations require reader software version 2.42 or later.

#### Android

You can customize the transition by passing an `appTransitionAnimation` parameter to `AppsOnDevicesConnectionConfiguration` when connecting to the reader.

### Use a preset animation

The Terminal SDK bundles preset animations that require no additional setup. Use `AppTransitionAnimation.Preset` with an `AppTransitionPreset`:

#### Kotlin

```kotlin
private fun connectReader(reader: Reader) {
    val config = AppsOnDevicesConnectionConfiguration(
        appsOnDevicesListener = object : AppsOnDevicesReaderListener {
            override fun onDisconnect(reason: DisconnectReason) {}
            override fun onReportReaderEvent(event: ReaderEvent) {}
        },appTransitionAnimation = AppTransitionAnimation.Preset(AppTransitionPreset.SLIDE_FROM_BOTTOM)
    )

    Terminal.getInstance().connectReader(
        reader,
        config,
        object : ReaderCallback {
            override fun onSuccess(reader: Reader) {
                // Handle successfully connecting to the reader
            }

            override fun onFailure(e: TerminalException) {
                // Handle exception when connecting to the reader
            }
        }
    )
}
```

If you use the `SLIDE_FROM_BOTTOM` preset, the Stripe Reader app slides up from the bottom of the screen.

### Use a custom animation

You can define custom Android animation resources in the `res/anim/` directory for your app. Then, pass the resource IDs to `AppTransitionAnimation.Custom`. The `enterAnim` controls how the Stripe Reader app enters the screen. The `exitAnim` controls how your app exits the screen.

#### Kotlin

```kotlin
val config = AppsOnDevicesConnectionConfiguration(
    appsOnDevicesListener = object : AppsOnDevicesReaderListener {
        override fun onDisconnect(reason: DisconnectReason) {}
        override fun onReportReaderEvent(event: ReaderEvent) {}
    },appTransitionAnimation = AppTransitionAnimation.Custom(
        enterAnim = R.anim.slide_in_up,
        exitAnim = R.anim.slide_out_down
    )
)
```

### Disable the transition animation

You can disable the transition animation by passing `AppTransitionAnimation.Custom.NO_ANIMATION` for both parameters. To disable the animation in only one direction, pass `NO_ANIMATION` for either `enterAnim` or `exitAnim`.

#### Kotlin

```kotlin
val config = AppsOnDevicesConnectionConfiguration(
    appsOnDevicesListener = listener,appTransitionAnimation = AppTransitionAnimation.Custom(
        enterAnim = AppTransitionAnimation.Custom.NO_ANIMATION,
        exitAnim = AppTransitionAnimation.Custom.NO_ANIMATION
    )
)
```

> If the animation resource IDs are invalid, the SDK throws an exception during connection in debug builds. In release builds, the SDK uses the system default transition.

#### React Native

You can customize the transition by passing an `appTransitionAnimation` parameter to `ConnectAppsOnDevicesParams` or `EasyConnectAppsOnDevicesParams` when connecting to the reader.

### Use a preset animation

The SDK bundles a preset animation that requires no additional setup. Pass `{ type: 'preset', preset: AppTransitionPreset.SlideFromBottom }`:

```typescript
import {
  useStripeTerminal,
  AppTransitionPreset,
} from '@stripe/stripe-terminal-react-native';

const { connectReader } = useStripeTerminal();

const { reader, error } = await connectReader({
  discoveryMethod: 'appsOnDevices',
  reader: selectedReader,appTransitionAnimation: { type: 'preset', preset: AppTransitionPreset.SlideFromBottom },
});
```

If you use the `SlideFromBottom` preset, the Stripe Reader app slides up from the bottom of the screen.

### Use a custom animation

You can define custom Android animation resources in the `res/anim/` directory of your Android app. Then, pass the resource IDs as `enterAnim` and `exitAnim`. The `enterAnim` controls how the Stripe Reader app enters the screen. The `exitAnim` controls how your app exits the screen.

```typescript
// enterAnim and exitAnim are Android resource IDs (numbers) from your res/anim/ directory
const enterAnim: number = /* your enter animation resource ID */;
const exitAnim: number = /* your exit animation resource ID */;

const { reader, error } = await connectReader({
  discoveryMethod: 'appsOnDevices',
  reader: selectedReader,appTransitionAnimation: { type: 'custom', enterAnim, exitAnim },
});
```

### Disable the transition animation

You can disable the transition animation by passing `0` for both `enterAnim` and `exitAnim`. To disable the animation in only one direction, pass `0` for either `enterAnim` or `exitAnim`.

```typescript
const { reader, error } = await connectReader({
  discoveryMethod: 'appsOnDevices',
  reader: selectedReader,appTransitionAnimation: { type: 'custom', enterAnim: 0, exitAnim: 0 },
});
```

> If the animation resource IDs are invalid, the SDK throws an exception during connection in debug builds. In release builds, the SDK uses the system default transition.

### Use the system default animation

Omit `appTransitionAnimation` or pass `{ type: 'systemDefault' }` to use the Android system default transition.

### Customize transitions when opening device settings

Your app can open the reader’s [settings screen](https://docs.stripe.com/terminal/payments/setup-reader/stripe-reader-s700-s710.md#settings) to let businesses configure Wi-Fi, check for software updates, or adjust device preferences. This uses the `stripe://settings/` deeplink, which triggers a standard Android activity transition.

The `appTransitionAnimation` parameter configured during [reader connection](https://docs.stripe.com/terminal/features/apps-on-devices/build.md#customize-transitions) doesn’t apply to these transitions. It only controls animations the SDK triggers during payment operations. To create a consistent transition when navigating to device settings, use `ActivityOptions.makeCustomAnimation` with the SDK’s built-in animation presets.

The Terminal SDK includes animation resource files for each preset. You can access the enter and exit animation resource IDs from `AppTransitionPreset.SLIDE_FROM_BOTTOM` using `.enterAnim` and `.exitAnim`. Currently, `SLIDE_FROM_BOTTOM` is the only available preset:

#### Kotlin

```kotlin
import android.app.ActivityOptions
import com.stripe.stripeterminal.appsondevices.extensions.enterAnim
import com.stripe.stripeterminal.appsondevices.extensions.exitAnim
import com.stripe.stripeterminal.external.models.AppTransitionPreset

val options = ActivityOptions.makeCustomAnimation(
    this,
    AppTransitionPreset.SLIDE_FROM_BOTTOM.enterAnim,
    AppTransitionPreset.SLIDE_FROM_BOTTOM.exitAnim,
)
startActivity(
    Intent(Intent.ACTION_VIEW)
        .setData(Uri.parse("stripe://settings/")),
    options.toBundle()
)
```

To disable the animation, pass `0` for both animation parameters:

#### Kotlin

```kotlin
val options = ActivityOptions.makeCustomAnimation(this, 0, 0)
startActivity(
    Intent(Intent.ACTION_VIEW)
        .setData(Uri.parse("stripe://settings/")),
    options.toBundle()
)
```

## Device management [Client-side]

You can access the device’s admin settings by launching the `stripe://settings/` deep-link URI from your app.

See an example of [launching the admin settings deep-link URI](https://github.com/stripe-samples/terminal-apps-on-devices/blob/718c2de38c7b8003fcf58c536c266bb990ad43a7/app/src/main/java/com/stripe/aod/sampleapp/fragment/HomeFragment.kt#L30).

#### Kotlin

```kotlin
startActivity(
    Intent(Intent.ACTION_VIEW)
        .setData(Uri.parse("stripe://settings/"))
)
```

## Instrument the app [Client-side]

Stripe doesn’t provide an application-level instrumentation solution. To keep track of crashes and other logs from your application, you can use a third-party library such as Sentry or Crashlytics.

## Set the device locale [Client-side]

The device user’s language selection (not country) informs the value returned by [Locale.getDefault()](https://developer.android.com/reference/java/util/Locale#getDefault\(\)). You can change the device language in the admin settings.

## Screen orientation [Client-side]

Stripe Android devices have the *Auto-rotate screen* setting enabled by default. Your app can override this setting by locking the UI to a specific screen orientation.

This can be achieved by setting the [screenOrientation](https://developer.android.com/guide/topics/manifest/activity-element#screen) attribute on the relevant `<activity>` tags in the manifest.

```xml
<activity
    android:name=".MainActivity"android:screenOrientation="portrait">
</activity>
```

Alternatively, this can be set programmatically using [Activity::setRequestedOrientation](https://developer.android.com/reference/android/app/Activity#setRequestedOrientation\(int\)) in your `Activity` class.

#### Kotlin

```kotlin
class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
// Lock to portrait orientation
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT

        // Or, lock to landscape orientation
        // requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
    }
}
```

## Limitations [Client-side]

Stripe Android devices don’t render a system UI, including a back button or status bar.

If your app needs to communicate battery level, charging state, and connectivity status to your users, refer to the following Android API docs for guidance:

- [Monitor the Battery Level and Charging State](https://developer.android.com/training/monitoring-device-state/battery-monitoring)
- [Monitor connectivity status and connection metering](https://developer.android.com/training/monitoring-device-state/connectivity-status-type)

## Working with device accessories [Client-side]

When the Stripe reader connects or disconnects from a dock, the Android operation system triggers a [configuration change](https://developer.android.com/guide/topics/resources/runtime-changes).

By default, your app’s activity is automatically recreated on a configuration change.

To disable automatic activity recreation when connecting to or disconnecting from a dock, add `android:configChanges="uiMode"` in the `<activity>` entry in your `AndroidManifest.xml` file.

```xml
<activity
    android:name=".MyActivity"android:configChanges="uiMode" />
```

Your activity can be notified of configuration changes by implementing [Activity::onConfigurationChanged](https://developer.android.com/reference/android/app/Activity#onConfigurationChanged\(android.content.res.Configuration\)). This method is only called if you’ve specified configurations you want to handle with the `android:configChanges` attribute in your manifest.

```kotlin
class MainActivity : Activity() {
    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        // implement custom configuration change handling logic
    }
}
```

## Test your app 

Use your S700 DevKit device to test your app in the Stripe Dashboard or using the Android Debug Bridge (`adb`).

#### Android Debug Bridge (adb)

You can connect your DevKit device to your computer using a USB-A to USB-C cable. Then, use `adb` to directly install your app’s assembled APK onto the DevKit device.

> #### Post-transaction behavior
> 
> When you install your custom app directly, you can’t set the DevKit’s preferred kiosk app. When a transaction completes, the DevKit always returns to the default Stripe reader app. If you want to make your app the preferred kiosk app on a DevKit, you must use a deploy group as described in the Dashboard instructions.

The following examples assume your application’s [package name](https://developer.android.com/studio/build/configure-app-module) is `com.example.myapp` and the [main activity](https://developer.android.com/reference/android/content/Intent.html#ACTION_MAIN) is `MainActivity`.

```
$ adb install myapp.apk
```

After installation completes, launch your app:

```
$ adb shell am start com.example.myapp/.MainActivity
```

Start admin settings:

```
$ adb shell am start -d "stripe://settings/"
```

If needed, uninstall your app:

```
$ adb uninstall com.example.myapp
```

Google’s [Android Debug Bridge documentation](https://developer.android.com/studio/command-line/adb) provides a comprehensive guide to using `adb`.

#### Dashboard

Follow these steps to test your app in the Dashboard:

1. In a sandbox, open the [Terminal readers](https://dashboard.stripe.com/test/terminal/readers) page.
2. If you haven’t already, click **Register reader** to [register](https://docs.stripe.com/terminal/payments/connect-reader.md?reader-type=internet#register-reader) the DevKit device to your account.
3. Click **Terminal** > **Software**.
4. On the [Software](https://dashboard.stripe.com/terminal/software) tab, choose the app that you want to deploy. You can also create a new app to deploy.
5. On the app details page, click **Deploy version**.
6. Choose the latest version of your app, then click **Next**.
7. Choose the [deploy group](https://docs.stripe.com/terminal/features/apps-on-devices/deploy-in-dashboard.md) for your DevKit device, then click **Next**.
8. Choose your preferred kiosk app, then click **Next**. The Stripe reader launches this app when it turns on and after each transaction. If there’s only one app to deploy, choose that app.
9. Confirm the deployment details, then click **Deploy**.
10. Restart your DevKit device to deploy your app to the device.

### Troubleshooting

If you previously installed your app by sideloading and attempt to deploy it again, you might receive the following error: `Failed to apply updates. Code: A9-com.example.posapp`.

You must manually uninstall the sideloaded app by running the following command:

```
adb uninstall com.example.posapp
```

## Test payments

DevKit devices can process test payments using a Stripe physical test card, which you can order in the [Dashboard](https://dashboard.stripe.com/terminal/shop/thsku_FmpZaTqwezTFvS). When [testing payments](https://docs.stripe.com/terminal/references/testing.md#physical-test-cards), you can use decimal amounts to produce specific outcomes.

> Don’t use real cards for test payments on DevKit devices.

## Next steps

- [Prepare for app review](https://docs.stripe.com/terminal/features/apps-on-devices/app-review.md)
- [Submit your app](https://docs.stripe.com/terminal/features/apps-on-devices/submit.md)
