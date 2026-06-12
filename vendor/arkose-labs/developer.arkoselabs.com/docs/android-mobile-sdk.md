> ## Documentation Index
> Fetch the complete documentation index at: https://developer.arkoselabs.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Android Mobile SDK

# Introduction

Arkose Labs' mobile SDKs let you wrap our solution with Android native function calls. This guarantees seamless integration of your mobile apps with Arkose's full interactive challenges on detection and enforcement and does so without the extended wait times for separate mobile solutions.

This page covers the Mobile SDK for Android. If you are developing in iOS, see the [Mobile SDK for iOS page](https://developer.arkoselabs.com/docs/ios-mobile-sdk).

The Arkose Mobile SDK:

* Wraps Arkose's Advanced Enforcement Challenge in native Android OS "Web View"

* Has 1-to-1 feature availability between web and mobile solutions.

* Integrates with your apps through native functions.

* Handles errors through callback events.

* Complies with Arkose Internal Security guidelines.

* Complies with Google Play Store guidelines for ease of integration.

* Is fully compatible with new Enforcement Challenge-API (EC-API) releases.

* Supports minimum version Android OS 5.0

## Mobile SDK High Level Design

![](https://files.readme.io/c64470a-SDK-flow.png "SDK-flow.png")

### Mobile SDK Builds Availability

The Arkose Labs Mobile SDKs are available via the Mobile SDK's Support page. Please talk with your CSM (Customer Success Manager) about your intended usage and request access.

### Compatibility

The Arkose Labs Mobile SDK for Android works with Android 5.0 and up.

All existing detection and challenge features on our web solutions are also available on the Mobile SDKs. All new ones are automatically added; you don't need to update your application every time we release a new Web platform. All challenge updates can be done without updating the SDKs or releasing a new version of your application.

### Security

The Arkose Labs Mobile SDKs are Arkose Labs Security reviewed and comply with Google Play Store guidelines.

### Performance

We created the Arkose Labs Mobile SDKs with stability and performance in mind. Their use has no significant impact on the host application’s performance.

### Installation

Follow the steps below to set up Arkose Labs Mobile SDK for Android in Android Studio in your host application. This applies to both our detection and enforcement components.

## SDK Kotlin Compatibility

### Overview

Kotlin v1.7.20+ is now supported in our Android XML and Jetpack Compose SDKs, ensuring wider integration capabilities. This document outlines the SDK's Kotlin version compatibility matrix and associated compose configuration requirements.

### Kotlin-Compose Compatibility Reference

| Kotlin Version | Compose Compiler Extension Version |
| :------------- | :--------------------------------- |
| 1.7.20         | 1.3.2                              |
| 1.8.0          | 1.4.0                              |
| 1.8.10         | 1.4.4                              |
| 1.9.0          | 1.5.1                              |
| 1.9.23         | 1.5.11                             |
| 2.0.0+         | Use compose plugin                 |

For the most up-to-date Kotlin-Compose compatibility information, refer to the [official Jetpack Compose compiler documentation](https://developer.android.com/jetpack/androidx/releases/compose-compiler).

### Troubleshooting Build Issues

**Common Error Messages:**

1. `Module was compiled with an incompatible version of Kotlin`: Ensure your Kotlin version and Compose compiler version are compatible according to the tables above.
2. Compose compiler errors: Double-check your `kotlinCompilerExtensionVersion` matches the recommendations for your Kotlin version.

## Prerequisites

* A host Android application. You must be able to build and run this application.

* For the full end-to-end Arkose setup, you must also complete the standard [Arkose Server-Side setup instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4).

## Steps for Integration in an XML-based Application

### Dependency Management:

**Include the dependencies using the Authenticated Package Manager(APM)**

#### Prerequisites:

1. You have received the Arkose provided credentials (username and token) from Arkose Command Center. Please visit [How to Request a Mobile SDK Token](https://support.arkoselabs.com/hc/en-us/articles/37245428558995-How-to-Request-a-Mobile-SDK-Token) for more information.
2. Store these credentials securely on your CI environment and in your project's local.properties for fetching locally.
3. Declare Credentials:
   ```
   maven {
       url = uri("https://maven.pkg.github.com/ArkoseLabs/alsdk-android-packages")
       credentials{
           username = "TODO: Insert Arkose provided username here"
           password = "TODO: Insert Arkose provided token here"
       }
   }
   ```
   <Callout icon="🚧" theme="warn">
     Ensure these credentials are stored securely and not shared outside authorized usage.
   </Callout>
4. Add the SDK Dependency to Your Project:

   To integrate an SDK package into your project, use the following format for the dependency:

   ```
   implementation 'ArkoseLabs.sdk:android:x.xx.xxxxx'
   ```
5. Sync the Project with Gradle Files

   After adding the dependency, sync your project with the Gradle files to ensure all dependencies are correctly resolved. Use the **Sync Project with Gradle Files** option in Android Studio or run:

   ```
   ./gradlew sync
   ```

### Legacy Support Include the dependencies using manual AAR file

1. Under `src/main`, create a `libs` folder.

2. Copy your `.aar` file (s) to `src/main/libs`

3. In the app level `build.gradle` file, add this line to its `dependencies` block.

```text
implementation fileTree(dir: "libs", include: ["*.aar"])
implementation 'androidx.biometric:biometric:1.2.0-alpha04'
implementation 'com.google.code.gson:gson:2.11.0'
```

### ProGuard Rules

Update the Android ProGuard or R8 configuration with the following rule sets:

```
-dontwarn com.google.android.play.core.integrity.IntegrityManagerFactory
-dontwarn com.google.android.play.core.integrity.StandardIntegrityManager
-dontwarn okhttp3.OkHttpClient$Builder
-dontwarn okhttp3.OkHttpClient
-dontwarn okhttp3.logging.HttpLoggingInterceptor$Level
-dontwarn okhttp3.logging.HttpLoggingInterceptor$Logger
-dontwarn okhttp3.logging.HttpLoggingInterceptor
-dontwarn retrofit2.Converter$Factory
-dontwarn retrofit2.Retrofit$Builder
-dontwarn retrofit2.Retrofit
-dontwarn retrofit2.converter.gson.GsonConverterFactory
```

In the toolbar, click on **File**. Then in its menu click **Sync Project with Gradle Files**.

### Import and add Arkose code to your application

Import the necessary SDK classes. Add the below code in your main file, right after you import your `android` and `androidx` classes and before your class definition statements.

```java
import com.arkoselabs.sdk.ArkoseChallenge;
import com.arkoselabs.sdk.ArkoseConfig;
import com.arkoselabs.sdk.ArkoseManager;
```

#### Implement Standard Integration

1. In the main screen activity section (Under src/main/java), in the onCreate method of the activity, initialize the SDK with ArkoseConfig object with API URL, API Key and other parameters.

   ```java
   // Build the configuration object
   final ArkoseConfig arkoseConfig = new ArkoseConfig.Builder()
     .apiKey(<YOUR_PUBLIC_KEY>)
     .blobData("") //encrypted blob data (optional)
     .loading(true) // setting this to false will not show the default loading spinner
     .enableBackButton(true) // To disable/enable device back button in EC process. Default is 'true'
     .setDismissChallengeOnTouchOutside(false) // To disable/enable touch outside of EC dialog to dismiss EC. Default is 'true'
     .language("") // Can set language here (optional)
     .setClientAPIRetryCount(0) // Can set number of retry count for when onError is triggered for certain client-side errors (optional)
     .setStyleTheme("") // Can set EC style theme (optional)
     .viewFrameAnimation(R.anim.custom_animation) // This to set animation while EC will be loading. You can set your own custom animation by putting value R.anim.<AnimStyle>
     .setTimeoutUntilReady(0) // SDK timeout in seconds (optional, positive integer).
     .setAccessibilityTextScaleCap(0) // Accessibility Text Scale Cap (optional, positive integer), 0 means unset (maintains default Android accessibility behavior)
     .build();

   // Set the log level
   ArkoseManager.setLogLevel(ArkoseManager.INFO);

   // Initialize the SDK
   // For v2.0.0 SDK
   //ArkoseManager.initialize(arkoseConfig);

   // For v2.1.0 SDK
   ArkoseManager.initialize(arkoseConfig, getApplication());

   ```
2. If you want to add your own custom animation, then the value of `viewFrameAnimation` will be `R.anim.<CustomAnimStyle>`. The `CustomAnimStyle` is your animation xml file.

   1. We provide a number of inbuilt animations in the Mobile SDK. Use the desired animation style by replacing the `<AnimStyle>` in `R.anim.<AnimStyle>` parameter.

      1. blink
      2. fade
      3. scale\_center
      4. sequential
      5. slide\_down
      6. slide\_left
      7. slide\_right
      8. slide\_up
      9. zoom\_in
      10. zoom\_out
3. To show the Enforcement View from the `onClick()` method of the **Login Button**, call `showEnforcementChallenge` method with `FragmentActivity` as its parameter. This will run Arkose detection component (when running Arkose enforcement component, it also runs Arkose’s Enforcement Challenge). Fill in the method definitions with what you want to happen when that method is invoked as described in the comments. Note there are separate code examples for our detection and enforcement components.

   ```java Enforcement
   ArkoseChallenge arkoseChallenge = ArkoseManager.showEnforcementChallenge(this);
   arkoseChallenge.
           .addOnCompletedListener(arkoseChallengeResponse -> {
               // invoked On Enforcement Challenge completed
            })
            
           .addOnFailureListener(arkoseChallengeResponse -> {
               // invoked on Enforcement Challenge failed
           })
           
           .addOnErrorListener(arkoseChallengeResponse -> {
                // invoked on getting error while loading EC
           })
           
           .addOnWarningListener(arkoseChallengeResponse -> {
                // invoked when an issue occurs which needs to be shared with 
                   the app as a warning
           })

           .addOnResizeListener(arkoseChallengeResponse -> {
                // Provides the width and height of the visible EC from an SDK call
                // While you cannot set the width and height values yourself, 
                // you can make use of their new values from the resizing 
                // as you'd like, such as putting them in a log entry.
           })
           
           .addOnReadyListener(() -> {
                 //Do Something on ready callback received
           })
           
           .addOnShowListener(() -> {
                 //Do Something on show callback received
           })
           
           .addOnShownListener(() -> {
                 //Deprecated since Arkose SDK v2.13.0
           })
           
           .addOnShownListener(new ArkoseChallenge.OnShownListener() {
               @Override
               public void onShown(ArkoseChallengeResponse response) {
                 //Do Something on shown callback received
               }

               @Override
               public void onShown() {
                //Deprecated since Arkose SDK v2.13.0
               }
           })
           
           .addOnHideListener(() -> { 
                //Deprecated since Arkose SDK v2.13.0
           })
           
           .addOnHideListener(new ArkoseChallenge.OnHideListener() {
               @Override
               public void onHide() {
                 //Deprecated since Arkose SDK v2.13.0
               }

               @Override
               public void onHide(ArkoseChallengeResponse response) {
                 //Do Something on hide callback received
               }
            })
           
           .addOnResetListener(() -> {
                 //Do Something on reset callback received 
           })

           .addOnViewFramePosition(arkoseChallengeResponse -> {
                 // Do Something to set the position of view frame
                 // Example:
                 // arkoseECResponse.getWindow().getAttributes().gravity = Gravity.BOTTOM;
                 // arkoseECResponse.getWindow().getAttributes().width = ViewGroup.LayoutParams.MATCH_PARENT;
             })
           
           .addOnSuppressListener(() -> {
                 //Deprecated since Arkose SDK v2.13.0
           })
           .addOnSuppressListener(new ArkoseChallenge.OnSuppressListener() {
               @Override
               public void onSuppress(ArkoseChallengeResponse response) {
                 //Do Something on suppress callback received
               }

               @Override
               public void onSuppress() {
                 //Deprecated since Arkose SDK v2.13.0
               }
            });

   ```

   ```java Deprecated Legacy Support
   ArkoseLabs.getActivityClient(this).ShowEnforcementChallenge(arkoseConfig)
           .addOnCompletedListener(new OnCompletedListener < ArkoseECResponse > () {
               @Override
               public void onCompleted(ArkoseECResponse arkoseEnforcementChallengeResponse) {
                   // invoked On Detection completed
               }
            })
            
           .addOnErrorListener(new OnErrorListener<ArkoseECResponse>() {
               @Override
               public void onError(ArkoseECResponse arkoseECResponse) {
                // invoked on getting error while loading detection
               }
           })
           
           .addOnWarningListener(new OnErrorListener<ArkoseECResponse>() {
               @Override
               public void onWarning(ArkoseECResponse arkoseECResponse) {
                // invoked on getting warning while loading detection
               }
           })
           
           .addOnReadyListener(new OnReadyListener() {
               @Override
               public void onReady() {
                 //Do Something on ready callback received
               }
           })
           
           .addOnShowListener(new OnShowListener() {
               @Override
               public void onShow() {
                 //Do Something on show callback received
               }

           .addOnHideListener(new OnHideListener() {
               @Override
               public void onHide() {
                 //Do Something on hide callback received
               }
           })
                   
           .addOnSuppressListener(new OnSuppressListener() {
               @Override
               public void onSuppress() {
                 //Do Something on suppress callback received
               }
           });

   ```
4. To create a view Fragment that can be embedded in another activity, use `ArkoseManager.createEnforcementChallenge()` method which returns an instance of `ArkoseChallenge`. This will create and set up a view Fragment which can be accessed using the method `ArkoseChallenge.getEnforcementChallengeFragment`. The example below shows how you can create the ArkoseLabs challenge view Fragment and embed it into your app's activity.

   ```java
   // Create Arkose challenge fragment
   ArkoseChallenge arkoseChallenge = ArkoseManager.createEnforcementChallenge();
   arkoseChallenge
           .addOnCompletedListener(arkoseChallengeResponse -> {
              // invoked On Enforcement Challenge completed
              dismissEnforcementChallenge();
            })
           .addOnFailureListener(arkoseChallengeResponse -> {
              // invoked on Enforcement Challenge failed
              boolean isRecoverable = arkoseChallengeResponse.getResponse().optBoolean("recoverable", false);
              if (!isRecoverable) {
                dismissEnforcementChallenge();
              }
            })
            .addOnHideListener(() -> {
              dismissEnforcementChallenge();
            });
            // Add other listeners as needed

   // Add the fragment to the activity
   FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
   ft.replace(R.id.frameLayout, arkoseChallenge.getEnforcementChallengeFragment());
   ft.commit();

   /**
     * Removes the challenge fragment from the UI.
     * Create a function like below and 
     * invoke it from the terminal callbacks to remove the fragment from the container
     * e.g. addOnCompletedListener, addOnFailureListener, addOnHideListener, addOnErrorListener, addOnWarningListener
     */
   private void dismissEnforcementChallenge() {
       try {
         if (arkoseChallenge != null)
               arkoseChallenge.removeChallengeFragment();
           Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.frameLayout);
           if (fragment != null) {
               getSupportFragmentManager().beginTransaction()
                       .remove(fragment)
                       .commitAllowingStateLoss();
           }
       } catch (Exception e) {
           Log.e(TAG, "Error hiding challenge: " + e.getMessage());
       }
   }

   ```
5. **Resetting the Arkose Session**\
   The Arkose session can be reset dynamically to initiate a new challenge with updated configurations or other triggering events. This effectively clears the current session data and allows for a fresh start. To reset the session, follow these steps:
   * Create a new `ArkoseConfig` instance with the desired configuration.
   * Call `ArkoseManager.updateConfig(arkoseConfig, arkoseChallenge);` to update the session.
   * ```java
     ArkoseConfig arkoseConfig = new ArkoseConfig.Builder()
                     .apiKey("<YOUR_PUBLIC_KEY>")
                     .blobData("<YOUR_ENCRYPTED_DATA>") //encrypted blob data (optional)
                     .language("<YOUR_PREFERED_LANGUAGE>") // Can Set Language here. (optional)
                     .setStyleTheme("<YOUR_PREFERED_STYLE_THEME>")// Can set EC style theme (optional)
                     .build();
             /* 
             * Call updateConfig() to apply the new configuration.
             * This will reset the session and apply any changes.
             */
             ArkoseManager.updateConfig(arkoseConfig, arkoseChallenge); 
     ```

#### Implement Preloading of Challenges to `onReady` with On-Demand Presentation

**Overview:**

The new `inlineRunOnTrigger` configuration enables preloading of enforcement challenge to `onReady` state, giving your application full control over when a session token is generated or the challenge is presented to the user. This greatly improves user-perceived latency. Available from **Android SDK v2.18.0** (Android XML-based SDK only).

**Configuration**:

1. Set via `.setInlineRunOnTrigger(true)` (default: `false`)
2. Use with `createEnforcementChallenge()` to preload the challenge
3. Resume the challenge flow by calling `runTriggeredInline(arkoseChallenge)`

**⚠️ Important Notes:** • Do NOT use this configuration with `showEnforcementChallenge()` • Do NOT enable `loader=true` when using this feature, as it will cause the loader to display indefinitely

```java Implementation Example
private boolean isInlineRunOnTriggeredCalled = false;
private boolean isOnReadyCalled = false;

// Step 1: Configure ArkoseConfig with inlineRunOnTrigger enabled
ArkoseConfig arkoseConfig = new ArkoseConfig.Builder()
    .apiKey("<YOUR_PUBLIC_KEY>")
    .blobData("<YOUR_ENCRYPTED_DATA>") // Optional: encrypted blob data
    .language("<YOUR_PREFERRED_LANGUAGE>") // Optional: set language
    .setStyleTheme("<YOUR_PREFERRED_STYLE_THEME>") // Optional: set EC style theme
    .setInlineRunOnTrigger(true) // Enable preloading of enforcement challenge
    .build();
ArkoseManager.initialize(arkoseConfig, getApplication()); // initialize config with current context


// Step 2: Create Arkose challenge fragment (this preloads the challenge)
ArkoseChallenge arkoseChallenge = ArkoseManager.createEnforcementChallenge();

// Step 3: Set up event listeners
arkoseChallenge
    .addOnCompletedListener(arkoseChallengeResponse -> {
       // Handle enforcement challenge completion
       dismissEnforcementChallenge();
    })
    .addOnFailureListener(arkoseChallengeResponse -> {
       // Handle enforcement challenge failure
       boolean isRecoverable = arkoseChallengeResponse.getResponse().optBoolean("recoverable", false);
       if (!isRecoverable) {
         dismissEnforcementChallenge();
       }
    })
    .addOnReadyListener(() -> {
        isOnReadyCalled = true;
    })
    .addOnHideListener(() -> {
        dismissEnforcementChallenge();
    });
    // Add other listeners as needed

// Step 4: Add the fragment to your activity
FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
ft.replace(R.id.frameLayout, arkoseChallenge.getEnforcementChallengeFragment());
ft.commit();

// Step 5: Trigger the challenge only after onReady callback (e.g., on button click)
btLogin.setOnClickListener(v -> {
    if (!isInlineRunOnTriggeredCalled) {
        if (arkoseChallenge != null && isOnReadyCalled) {
            isInlineRunOnTriggeredCalled = true;
            // This call resumes the preloaded challenge
            ArkoseManager.runTriggeredInline(arkoseChallenge);
        }
    }
});

/**
  * Removes the challenge fragment from the UI.
  * Create a function like below and 
  * invoke it from the terminal callbacks to remove the fragment from the container
  * e.g. addOnCompletedListener, addOnFailureListener, addOnHideListener, addOnErrorListener, addOnWarningListener
  */
private void dismissEnforcementChallenge() {
    try {
      if (arkoseChallenge != null)
            arkoseChallenge.removeChallengeFragment();
        Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.frameLayout);
        if (fragment != null) {
            getSupportFragmentManager().beginTransaction()
                    .remove(fragment)
                    .commitAllowingStateLoss();
        }
    } catch (Exception e) {
        Log.e(TAG, "Error hiding challenge: " + e.getMessage());
    }
}
```

<br />

## Jetpack Compose Support

Integrating the Arkose Mobile SDKs into Jetpack Compose apps is straightforward, eliminating the need for extra configuration and allowing developers to incorporate SDK features into composable objects with ease.

For optimal app and SDK performance, it's advised to utilize baseline profiles, which leverage Jetpack Compose's just-in-time (JIT) compilation. This approach, especially when creating baseline profiles for critical user actions like showing the Enforcement Challenge, prompts Android Runtime to optimize execution through ahead-of-time (AOT) compilation, significantly boosting performance. For guidance on crafting a Baseline Profile, consult the [Android Documentation](https://developer.android.com/topic/performance/baselineprofiles/create-baselineprofile).

## Steps for Integration in a Compose-based Application

### Dependency Management:

**Include the dependencies using the Authenticated Package Manager(APM)**

#### Prerequisites:

1. You have received the Arkose provided credentials (username and token) from Arkose Command Center. Please visit [How to Request a Mobile SDK Token](https://support.arkoselabs.com/hc/en-us/articles/37245428558995-How-to-Request-a-Mobile-SDK-Token) for more information.
2. Store these credentials securely on your CI environment and in your project's local.properties for fetching locally.
3. Declare Credentials:
   ```
   maven {
       url = uri("https://maven.pkg.github.com/ArkoseLabs/alsdk-android-packages")
       credentials{
           username = "TODO: Insert Arkose provided username here"
           password = "TODO: Insert Arkose provided token here"
       }
   }
   ```
   <Callout icon="🚧" theme="warn">
     Ensure these credentials are stored securely and not shared outside authorized usage.
   </Callout>
4. Add the SDK Dependency to Your Project:

   1. To integrate an SDK package into your project, use the following format for the dependency:

      ```
      implementation 'ArkoseLabs.sdk:android:x.xx.xxxxx'
      ```
   2. To support Compose-based application, add the following additional dependency:

      ```
      implementation 'ArkoseLabs.sdk:android-compose:x.xx.xxxxx'
      ```
5. Sync the Project with Gradle Files

   After adding the dependency, sync your project with the Gradle files to ensure all dependencies are correctly resolved. Use the **Sync Project with Gradle Files** option in Android Studio or run:

   ```
   ./gradlew sync
   ```

### Legacy Support: Include dependencies using manual AAR file

1. Under `src/main`, create a `libs` folder.
2. Copy your `.aar` files to `src/main/libs`
   1. ArkoseLabsSDK.aar
   2. ArkoseLabsSDKCompose.aar
      1. **NOTE:** this companion framework file is intended for Jetpack Compose integrations.
3. In the app level `build.gradle` file, add this line to its `dependencies` block.
   ```
   implementation fileTree(dir: "libs", include: ["*.aar"])
   implementation 'androidx.biometric:biometric:1.2.0-alpha04'
   implementation 'com.google.code.gson:gson:2.11.0'
   ```

### ProGuard rules

Update the Android ProGuard or R8 configuration with the following rule sets:

```
-dontwarn com.google.android.play.core.integrity.IntegrityManagerFactory
-dontwarn com.google.android.play.core.integrity.StandardIntegrityManager
-dontwarn okhttp3.OkHttpClient$Builder
-dontwarn okhttp3.OkHttpClient
-dontwarn okhttp3.logging.HttpLoggingInterceptor$Level
-dontwarn okhttp3.logging.HttpLoggingInterceptor$Logger
-dontwarn okhttp3.logging.HttpLoggingInterceptor
-dontwarn retrofit2.Converter$Factory
-dontwarn retrofit2.Retrofit$Builder
-dontwarn retrofit2.Retrofit
-dontwarn retrofit2.converter.gson.GsonConverterFactory
```

In the toolbar, click on **File**. Then in its menu click **Sync Project with Gradle Files**.

### Import and add Arkose code to your application

1. Import the necessary SDK classes. Add the below code in your Activity class, before your class definition statements.
   ```kotlin
   import com.arkoselabs.compose.sdk.ArkoseConfigCompose
   import com.arkoselabs.compose.sdk.EnforcementChallenge
   ```
2. Initialize the `mutableStateOf` state object to show/hide Enforcement Challenge.

   ```kotlin
   val showEc = remember { mutableStateOf(false) }
   ```
3. To show the Enforcement Challenge dialog from the `onClick` lambda function of a Login Button, update the `mutableStateOf` that controls the visibility of the `EnforcementChallenge()` composable.
   ```kotlin
   var sessionResetTime by remember { mutableIntStateOf(0) } //in milliseconds
   ...
   ...
   ...
   when {
               showEc.value -> EnforcementChallenge(
                       onDismiss = {
                           showEc.value = false
                       },
                       sessionResetTime = sessionResetTime, //optional
                       config = ArkoseConfigCompose(
                               apiKey = apiKeyText,
                               enableBackButton = true, //optional
                               noSuppress = true, //optional
                               blobData = "", //optional
                               loading = true, //optional
                               language = "", //optional
                               dismissChallengeOnTouchOutside = false, //optional
                               clientAPIRetryCount = 0, //optional
                               styleTheme = "", //optional
                               timeoutInSecondsUntilReady = 0, //optional
                               accessibilityTextScaleCap = 0 //optional
                       ),
                       onCompleted = {
                           "Arkose Enforcement Challenge onCompleted -> ${it.response}".log()
                       },
                       onFailure = {
                           "Arkose Enforcement Challenge OnFailure -> ${it.response}".log()
                       },
                       onError = {
                           "Arkose Enforcement Challenge OnError -> ${it.response}".log()
                       },
                       onWarning = {
                           "Arkose Enforcement Challenge OnWarning".log()
                       },
                       onResize = {
                           "Arkose Enforcement Challenge OnResize -> ${it.response}".log()
                       },
                       onViewFramePosition = {
                           "Arkose Enforcement Challenge OnViewFramePosition -> ${it.response}".log()
                       },
                       onReady = {
                           "Arkose Enforcement Challenge OnReady".log()
                       },
                       onShow = {
                           "Arkose Enforcement Challenge OnShow".log()
                       },
                       onShown = {
                           "Arkose Enforcement Challenge OnShown-> ${it?.response}".log()
                       },
                       onHide = {
                           "Arkose Enforcement Challenge OnHide-> ${it?.response}".log()
                       },
                       onReset = {
                           "Arkose Enforcement Challenge OnReset".log()
                       },
                       onSuppress = {
                           "Arkose Enforcement Challenge OnSuppress-> ${it?.response}".log()
                       }
               )
           }
   ```

**Alternatively:**

4. To embed the Enforcement Challenge in an Activity, create a new `InlineActivity`.

   ```kotlin
   import com.arkoselabs.compose.sdk.ArkoseConfigCompose
   import com.arkoselabs.compose.sdk.EnforcementChallengeInline

   class InlineActivity : ComponentActivity() {
   ```
5. Use the inline composable object `EnforcementChallengeInline()`, which will be tied to the lifecycle of `InlineActivity`.

   ```kotlin
   @Composable
   fun InlineScreen(onFinish: () -> Unit) {

   val isVisible = remember { mutableStateOf(true) }
   var sessionResetTime by remember { mutableIntStateOf(0) } //in milliseconds
   ...
   ...
   Column {
                   EnforcementChallengeInline(
                       onDismiss = {
                           onFinish()
                       },
                       sessionResetTime = sessionResetTime, //optional
                       isVisible = isVisible,  //optional
                       config = ArkoseConfigCompose(
                           apiKey = AppConfig.API_KEY,
                           enableBackButton = true, //optional
                           noSuppress = false //optional
                       ),
                       onCompleted = {
                           "Arkose Enforcement Challenge onCompleted -> ${it.response}".log()
                       },
                       onFailure = {
                           "Arkose Enforcement Challenge OnFailure -> ${it.response}".log()
                       },
                       onError = {
                           "Arkose Enforcement Challenge OnError -> ${it.response}".log()
                       },
                       onWarning = {
                           "Arkose Enforcement Challenge OnWarning".log()
                       },
                       onResize = {
                           "Arkose Enforcement Challenge OnResize -> ${it.response}".log()
                       },
                       onViewFramePosition = {
                           "Arkose Enforcement Challenge OnViewFramePosition -> ${it.response}".log()
                       },
                       onReady = {
                           "Arkose Enforcement Challenge OnReady".log()
                       },
                       onShow = {
                           "Arkose Enforcement Challenge OnShow".log()
                       },
                       onShown = {
                           "Arkose Enforcement Challenge OnShown".log()
                       },
                       onHide = {
                           "Arkose Enforcement Challenge OnHide".log()
                       },
                       onReset = {
                           "Arkose Enforcement Challenge OnReset".log()
                       },
                       onSuppress = {
                           "Arkose Enforcement Challenge OnSuppress".log()
                       }
                   )
               }
   ```
6. Invoke `finish()` on `InlineActivity` when exiting the screen to prevent memory leaks.

   ```kotlin
   class InlineActivity : ComponentActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)

           setContent {
           ...
           ...
           InlineScreen(onFinish = { finish() })
           ...
           ...
           }
   ```
7. **Resetting the Arkose Session**\
   Arkose sessions in Jetpack Compose can be reset dynamically by **modifying the properties of a mutable** `ArkoseConfigCompose` instance. Since Jetpack Compose automatically recomposes when a state changes, updating the config will automatically reset the session.
   * Create a Mutable ArkoseConfig Instance
   * Customers should first **initialize** a mutable `ArkoseConfigCompose` instance using `remember`:
   * ```kotlin
     // Create a mutable ArkoseConfigCompose instance
     var arkoseConfig by remember {
         mutableStateOf(
             ArkoseConfigCompose(
                 apiKey = AppConfig.API_KEY,
                 enableBackButton = true, // Optional
                 noSuppress = false // Optional
             )
         )
     }
     ```
   * **Pass the Mutable Config** to `EnforcementChallengeInline`\
     The mutable `arkoseConfig` should be passed to `EnforcementChallengeInline`, allowing it to automatically detect and apply any updates.
   * ```kotlin
     EnforcementChallengeInline(
         onDismiss = {
             closeButtonState.value = false
             onFinish()
         },
         sessionResetTime = sessionResetTime.intValue,
         isVisible = isVisible,
         config = arkoseConfig // Pass the mutable ArkoseConfig instance
         .
         .
         .
     )
     ```
   * **Reset the Session by Updating** `arkoseConfig`\
     Whenever the customer wants to reset the session, **they only need to update** `arkoseConfig` properties. The Composable function will **automatically apply the new configuration** and reset the session.
   * ```kotlin
     // Update the arkoseConfig properties to reset the session
     arkoseConfig = ArkoseConfigCompose(
         language = "<YOUR_PREFERRED_LANGUAGE>", // Optional: Set preferred language
         styleTheme = "<YOUR_PREFERRED_STYLE_THEME>", // Optional: Set EC style theme
         blobData = "<YOUR_ENCRYPTED_DATA>" // Optional: Encrypted blob data
     )
     ```
   * **Example Use Case**
   * Here’s an example of resetting the session when a user clicks a button:
   * ```kotlin
     Button(onClick = {
         arkoseConfig = ArkoseConfigCompose(
             blobData = "updated_blob_data"
         )
     }) {
         Text("Reset Session")
     }
     ```

<br />

<br />

## Implement Preloading of Challenges to onReady with On-Demand Presentation

**Overview:**

The `inlineRunOnTrigger` configuration enables preloading of the enforcement challenge to the `onReady` state in Jetpack Compose inline mode, giving your application full control over when the challenge is presented to the user. This improves user-perceived latency by warming up the WebView ahead of time. Available from **Android SDK v2.20.0** (Jetpack Compose inline mode only).

**Configuration:**

1. Set `inlineRunOnTrigger = true` in your `ArkoseConfigCompose` object (default: `false`)
2. Use `EnforcementChallengeInline` as the composable — this is the supported format for preloading in Compose
3. Resume the challenge flow by calling `ArkoseManagerCompose.runTriggeredInline()` when the challenge should be presented

**⚠️ Important Notes:**

* Only supported with `EnforcementChallengeInline`. Do NOT use with `EnforcementChallenge` (dialog/overlay mode)
* Do NOT enable `loading = true` when using this feature, as it will cause the loader to display indefinitely
* `ArkoseManagerCompose.runTriggeredInline()` should only be called after `onReady` has fired

**Implementation Example:**

```kotlin
class InlineActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set log level
        ArkoseManager.setLogLevel(ArkoseManager.INFO)

        setContent {
            AppTheme {
                InlineScreen(onFinish = { finish() })
            }
        }
    }
}

@Composable
fun InlineScreen(onFinish: () -> Unit) {
    val isVisible = remember { mutableStateOf(true) }
    val isOnReadyCalled = remember { mutableStateOf(false) }

    // Step 1: Configure ArkoseConfigCompose with inlineRunOnTrigger enabled
    var arkoseConfig by remember {
        mutableStateOf(
            ArkoseConfigCompose(
                apiKey = "<YOUR_PUBLIC_KEY>",
                enableBackButton = true,   // optional
                noSuppress = false,        // optional
                inlineRunOnTrigger = true  // enables preloading
            )
        )
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {

        // Step 2: Add EnforcementChallengeInline — this preloads the challenge on composition
        EnforcementChallengeInline(
            onDismiss = {
                onFinish()
            },
            isVisible = isVisible,
            config = arkoseConfig,
            onCompleted = {
                "Arkose Enforcement Challenge onCompleted -> ${it.response}".log()
            },
            onFailure = {
                "Arkose Enforcement Challenge OnFailure -> ${it.response}".log()
            },
            onError = {
                "Arkose Enforcement Challenge OnError -> ${it.response}".log()
            },
            onWarning = {
                "Arkose Enforcement Challenge OnWarning".log()
            },
            onReady = {
                // Step 3: Mark onReady received — challenge is preloaded and ready to present
                isOnReadyCalled.value = true
                "Arkose Enforcement Challenge OnReady".log()
            },
            onShown = {
                "Arkose Enforcement Challenge OnShown".log()
            },
            onHide = {
                "Arkose Enforcement Challenge OnHide".log()
            },
            onReset = {
                "Arkose Enforcement Challenge OnReset".log()
            },
            onSuppress = {
                "Arkose Enforcement Challenge OnSuppress".log()
            }
        )

        Button(
            onClick = {
                // Step 4: Trigger the preloaded challenge only after onReady (e.g. on button click)
                if (isOnReadyCalled.value) {
                    ArkoseManagerCompose.runTriggeredInline()
                }
            },
            modifier = Modifier.fillMaxWidth().padding(top = 10.dp)
        ) {
            Text("Show Challenge")
        }
    }
}
```

<br />

### Build the revised project

1. Go to the **Build** menu and click on **Clean Project**.

2. Go to the **Build** menu and click on **Rebuild Project**.

### Run and test the app

1. Run your Android application.

2. 1. If running Arkose enforcement component the view shows an **Arkose Labs Enforcement Challenge**.
   2. If running Arkose detection component, the view runs **Arkose detection component**.

3. If running Arkose enforcement component, verify the challenge.

4. When the verification or detection is successful, the `onCompleted` event returns a response token. The following sample code shows what this should look like and what to do with the token. Note there are separate code samples for detection and enforcement.

```java Enforcement
.addOnCompletedListener(arkoseChallengeResponse -> {
  // invoked On Enforcement Challenge completed
  String userResponseToken = arkoseChallengeResponse.getResponse().toString();
  // Get value of the token
  String userResponseToken = arkoseChallengeResponse.getResponse().getString("token");
  Log.i(TAG,"Arkose EC completed: " + userResponseToken);
  // sendToBackendServer(userResponseToken);
})

```

```java Detection
public void onCompleted(ArkoseECResponse arkoseECResponse) {
  String userResponseToken = arkoseECResponse.getResponse().toString();
  // Get value of the token
  String userResponseToken = arkoseECResponse.getResponse().getString("token");
  Log.i(TAG,"Arkose Detection completed: " + userResponseToken);
  // sendToBackendServer(userResponseToken);
}
```

<br />

## `ArkoseConfig` Configuration

Note that Arkose’s detection component is part of our overall Arkose Bot Manager platform. Thus the names of some methods and variables refer only to enforcement when actually dealing with detection as well. Unless otherwise specified, the configuration components apply to both detection and enforcement components, although perhaps in different ways as specified.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration Object
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `ArkoseConfig`(or) `ArkoseConfigCompose`
      </td>

      <td>
        Public component
      </td>

      <td>
        Enables a consistent public parameter data model for the View in which it is called.

        An initialized model object later passed as parameters to the `showEnforcementChallenge()` Arkose Labs Mobile SDK.

        Note that our detection component is part of our overall Arkose Bot Manager platform. Thus the names of some methods and variables refer only to enforcement when actually dealing with detection as well.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `showEnforcementChallenge`
      </td>

      <td>
        Public Method
      </td>

      <td>
        Method that starts the Arkose Labs detection when using our detection component and enforcement when using our enforcement component.

        Before calling this method, the model object (`ArkoseConfig`) must be initialized with the additional configuration parameters.

        This method adds two listeners:

        * `addOnCompletedListener`:  Invoked on completion of verification. Overrides the `onCompleted` method with a response.- `addOnFailureListener`: Invoked when Enforcement Challenge verification fails. Overrides the `onFailed` method with a response.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `createEnforcementChallenge`
      </td>

      <td>
        Public Method
      </td>

      <td>
        Method that creates the Arkose Labs object without invoking the display function.

        Before calling this method, the model object (`ArkoseConfig`) must be initialized with the additional configuration parameters given in the next table. These values are set in the  `strings.xml` file.

        This method is used in conjunction with `getEnforcementChallengeFragment` method to allow embedding into the parent app activity as a fragment.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnLoadedListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when the SDK has been loaded.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnReadyListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when the Enforcement or Detection is ready.

        The Enforcement or Detection cannot be triggered before this event. You may want to disable the UI you are protecting until this event has been triggered.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnShowListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when the Enforcement or Detection is completed.

        The function is also invoked when an Enforcement Challenge or detection is re-displayed (e.g. if the user closes the EC or detection view and tries to continue). Note that the close button only appears when in Lightbox mode.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnShownListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when the Enforcement Challenge or Detection is displayed. The function is **only** invoked the first time an Enforcement Challenge is displayed.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnCompletedListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when\
        either: a. For our enforcement component, a session is classified as not needing a challenge or a challenge has been successfully completed.

        b. For our detection component, a session detection has been successfully completed.

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnHideListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when the EC or detection view is hidden. For example, this happens after an EC or detection is completed or if the user clicks the close button. Note that the close button **only** appears when in Lightbox mode.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnSuppressListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when:

        a. The Enforcement Challenge is suppressed (i.e. A session was classified as not requiring a challenge).

        b. The Detection is running and is analyzing the user intent.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnResetListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked after the Enforcement resets. Typically occurs after a challenge has been successfully answered.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnErrorListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when an error occurs when loading the challenge or detection.

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnWarningListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when an issue occurs which needs to be shared with the app as a warning, based on which App can take custom actions, when loading the challenge or detection.

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnFailedListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when a challenge has failed (the user has failed the challenge multiple times and is not allowed to continue the session).

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnResizeListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when a challenge is loaded. It provides the width and height of the visible EC from an SDK call.

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `OnViewFramePositionListener`
      </td>

      <td>
        Function
      </td>

      <td>
        Listener function invoked when a challenge is loaded. It allows the parent APP to set the view frame window attributes as desired by calling the `getWindow()` function on the ArkoseECResponse parameter.

        E.g.\
        `arkoseECResponse.getWindow().getAttributes().gravity = Gravity.BOTTOM;`

        A [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) is passed to this function.
      </td>

      <td>
        Enforcement
      </td>
    </tr>
  </tbody>
</Table>

## Enforcement Challenge Configuration Parameters

You can change the following Enforcement Challenge configuration parameters by specifying their values in the `ArkoseConfig` object.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        EC Configuration Methods
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `Builder apiBaseUrl(String apiBaseUrl)`
      </td>

      <td>
        Base URL of Arkose Bot Manager as supplied by Arkose Labs.
      </td>
    </tr>

    <tr>
      <td>
        `Builder apiKey(String apiKey)`
      </td>

      <td>
        Public key for your account.
      </td>
    </tr>

    <tr>
      <td>
        `Builder apiFile(String apiFile)`
      </td>

      <td>
        JavaScript file name of Arkose Labs EC as supplied by Arkose Labs.
      </td>
    </tr>

    <tr>
      <td>
        `Builder blobData(String blobData)`
      </td>

      <td>
        Mainly used to share any client encrypted data blobs with Arkose Bot Manager. It is optional.

        Default: `""`
      </td>
    </tr>

    <tr>
      <td>
        `Builder language(String language)`
      </td>

      <td>
        Not applicable to our detection component.

        Language setting for the EC.

        Default: `"en"`
      </td>
    </tr>

    <tr>
      <td>
        `Builder userAgent(String userAgent)`
      </td>

      <td>
        Specify any userAgent setting for ease of testing forced Enforcement Challenge for a session. It is optional.

        *Please talk with your CSM (Customer Success Manager) about your intended usage and request backend configuration.*

        Default: (inbuilt webview’s userAgent string)
      </td>
    </tr>

    <tr>
      <td>
        `Builder loading(Boolean val)`
      </td>

      <td>
        Specify whether loading spinner is shown or not.

        Default: `true`
      </td>
    </tr>

    <tr>
      <td>
        `Builder enableBackButton(Boolean val)`
      </td>

      <td>
        Specify whether device back button dismisses EC dialog or not. If this configuration is enabled, and the user uses the back button, onHide listener is triggered and EC dialog is dismissed.

        Default: `true`
      </td>
    </tr>

    <tr>
      <td>
        `Builder setDismissChallengeOnTouchOutside(Boolean val)`
      </td>

      <td>
        Specify whether touching outside of EC dialog will dismiss the EC dialog or not. If this configuration is enabled, and user touches outside of the EC dialog, onHide listener is triggered and EC dialog is dismissed.

        Default: `true`
      </td>
    </tr>

    <tr>
      <td>
        `Builder setClientAPIRetryCount(int count)`
      </td>

      <td>
        Specify the number of retries when network issues are triggered when the client app tries to connect to the `apiBaseUrl`.

        The retry only works for `onError` events with error codes below. When the configured number of retries is exhausted, the last error code is returned.

        1. Challenge load error.
        2. API\_REQUEST\_ERROR
        3. API\_REQUEST\_TIMEOUTIt is optional.Default: `0`
      </td>
    </tr>

    <tr>
      <td>
        `Builder setStyleTheme(String styleTheme)`
      </td>

      <td>
        Style theme setting for the EC. It is optional.

        Default: `""`
      </td>
    </tr>

    <tr>
      <td>
        `Builder setTimeoutUntilReady(int timeoutInSeconds)`
      </td>

      <td>
        SDK timeout in seconds (optional, positive integer). Introduced configurable WebView session timeouts. Developers can now set a timeout for all API calls within a session called before onReady. If the WebView is still loading when the timeout is reached, a timeout exception will be thrown. Once the WebView successfully loads and the onReady callback is triggered, the timeout automatically resets to its default value.

        Default: `0`
      </td>
    </tr>

    <tr>
      <td>
        `Builder setAccessibilityTextScaleCap(int accessibilityTextScaleCap)`
      </td>

      <td>
        Accessibility Text Scale Cap (optional, positive integer); 0 means unset (maintains default Android accessibility behaviour).

        A new configuration option to help you manage text scaling behaviour in the challenge interface, that allows you to control how Android's system accessibility font size settings affect the challenge display.

        **How it works:**

        * Set a value (e.g., 150) to cap text scaling at a specific percentage
        * Leave unset to maintain Android's default accessibility behaviour
        * Adjust the value to balance your design requirements with user accessibility needs

        **Use case:** If you're experiencing issues where Android's maximum font size settings are causing display problems in the challenge interface (such as text scaling to 200%), you can use this parameter to maintain consistent rendering while still supporting accessibility where appropriate.

        Default: `0`
      </td>
    </tr>

    <tr>
      <td>
        *(XML)* `Builder setInlineRunOnTrigger(Boolean val)`

        *(Compose)*`inlineRunOnTrigger`
      </td>

      <td>
        Enables preloading of the enforcement challenge to `onReady` state, giving the application full control over when the challenge is presented to the user. When set to `true`, the SDK initializes and warms up the WebView in the background without displaying the challenge. The challenge is then presented on demand by calling `ArkoseManager.runTriggeredInline(arkoseChallenge)` (XML) or `ArkoseManagerCompose.runTriggeredInline()` (Compose) after the `onReady` callback fires.

        **Do NOT** use with `showEnforcementChallenge()` or enable `loading = true` alongside this flag.

        Available from **v2.18.0** (XML) and **v2.20.0** (Compose inline mode). Default: `false`
      </td>
    </tr>
  </tbody>
</Table>

## Logging and Troubleshooting

### Prerequisites

1. Install the [Android Debug Bridge (adb)](https://developer.android.com/studio/command-line/adb) binary or driver on the machine where the logs will go.

2. An Android phone or Android emulator. On it, under **Settings > Developer**, enable the **USB Debugging** option

### Steps

On the machine where the logs will go:

1. Download the SDK platform for your platform (Windows / Mac) from  [SDK Platform Tools release notes  |  Android Developers ](https://developer.android.com/studio/releases/platform-tools.html)

2. Unzip the folder and check it contains an `adb.exe` file.

3. From the command prompt, enter the path where `adb` is located on the machine.  This image shows an example of what you get after you enter the path.

![](https://files.readme.io/7f9d585-adb1.png "adb1.png")

4. On your Android device, enable USB debugging:

   1. At **Phone>Settings>About Phone>**, tap **Build Number** seven times. You should see a message saying that you are now a developer.

   2. On the device, go to **Developer options** and turn on USB debugging.

   3. Connect the device to the system and trust/allow the system.

   4. To test if `adb`  is working properly:

      1. Use a USB cable to connect your Android device to your computer.

      2. At the computer’s command prompt, run the command `adb devices` to show the devices connected to the system.

![](https://files.readme.io/47fd81c-adb2.png "adb2.png")

5. To start verbose logging in the terminal window, at the computer’s command prompt, run `adb logcat -s ArkoseLabsShowEnforcementChallenge:v` If instead, you want to save the logs, run `adb logcat -d > <path-where-you-want-to-save-file>/<filename>.txt`  **Ctrl+C** stops the logging.

## `adb logcat` Options

`adb logcat` has several command options. These include:

* `adb logcat` :  Prints log data to the screen.

* `adb logcat *:V` :  Lowest priority, filter to only show Verbose level log entries.

* `adb logcat --help` : Shows all `logcat` options and arguments.

* `adb logcat -c` :  Clears the logs .

* `adb logcat -s <TAG>:<PRIORITY>`  :

  * `-s`: Sets default filter to silent.

  * `<TAG>`: A log component tag (or `*` for all).

  * `<PRIORITY>` can be:

    * `V`:  Verbose (default for `<TAG>`)

    * `D`:   Debug (default for `*`)

    * `I`:  Info

    * `W`:  Warn

    * `E`:  Error

    * `F`:  Fatal

    * `S`:  Silent (suppress all output)