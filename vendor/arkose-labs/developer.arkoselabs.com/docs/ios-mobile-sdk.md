# iOS Mobile SDK

# Introduction

Arkose Labs' mobile SDK lets you wrap our solution with iOS native function calls. This guarantees seamless integration of your mobile apps with Arkose's full interactive challenges on detection and enforcement and does so without the extended wait times for separate mobile solutions.

This page covers the Mobile SDK for iOS. If you are developing in Android, see the [Mobile SDK for Android](https://developer.arkoselabs.com/update/docs/android-mobile-sdk) page.

The Arkose Mobile SDK for iOS:

* Wraps Arkose's Advanced Enforcement Challenge in native iOS "Web View"
* Has 1-to-1 feature availability between web and mobile solutions
* Integrates with your apps through native functions
* Handles errors through callback events
* Complies with Arkose Internal Security guidelines
* Complies with Apple App Store guidelines for ease of integration
* Is fully compatible with new API releases
* Supports minimum version iOS 12.0

***

## Mobile SDK High Level Design

![](https://files.readme.io/8bfc22ab3de4bdb5e355b2efa7847e2cfa57a56231d2eff9d63aa0886a42ad3c-image.png)

***

## Mobile SDK Builds Availability

The Arkose Labs Mobile SDKs are available via the Mobile SDK's Support page. Please talk with your CSM (Customer Success Manager) about your intended usage and request access.

***

## Compatibility

| Device    | Minimum OS Version | Target OS Versions                |
| --------- | ------------------ | --------------------------------- |
| iPhone    | iOS 12+            | iOS 12, 13, 14, 15, 16, 17, 18    |
| iPad      | iPadOS 12+         | iPadOS 12, 13, 14, 15, 16, 17, 18 |
| Mac       | macOS 12+          | macOS 12, 13, 14, 15              |
| Vision OS | Vision OS 1.3+     | Vision OS 1.3, 2.0                |

All existing detection and challenge features on our web solution are also available on the Mobile SDKs. All new ones are automatically added; you don't need to update your application every time we have a new release of our Web platform.

***

## Security

The Arkose Labs Mobile SDKs are Arkose Labs Security reviewed and comply with Apple App Store guidelines.

***

## Performance

We created the Arkose Labs Mobile SDKs with stability and performance in mind. Their use has no significant impact on the host application's performance.

***

## Installation

Follow these steps to set up Arkose Labs Mobile SDK for iOS in Xcode in your host application. This applies to both our detection and enforcement components.

### Prerequisites

* A host iOS application. You must be able to build and run this application.
* For the full end-to-end Arkose setup, you must also complete the standard [Arkose Server-Side setup instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4).

***

## Integration Steps

Include the package dependencies using the Swift Package Manager (SPM):

### Prerequisites

1. You have received the Arkose provided credentials (username and token) from Arkose Command Center. Please visit [How to Request a Mobile SDK Token](https://support.arkoselabs.com/hc/en-us/articles/37245428558995-How-to-Request-a-Mobile-SDK-Token) for more information.
2. If you are using a CI to build Apple applications, you will need to securely store these credentials in your CI environment.

### Steps to Add a SPM Package

To integrate the SDK into your Apple project, follow these steps:

### 1. Add Credentials for Authenticated Access

To fetch the package via Xcode, you must use Arkose provided credentials:

1. Open **Keychain Access** (macOS)
2. Search for "[http://github.com](http://github.com)" in your Keychain
3. If an entry exists, ensure it is updated with Arkose provided `username` and p`ersonal access token`.

**Add the Credentials Manually (if not present):**

1. Go to **Keychain Access > File > New Password Item**
2. Set the following:
   * **Keychain Item Name:** `github.com`
   * **Account Name:** Arkose provided username
   * **Password:** Arkose provided personal access token
3. Click **Add** button

**Test the Credentials:**

Clone the repository using Git:

```bash
git clone https://github.com/ArkoseLabs/alsdk-ios-packages.git
```

If successful, proceed to the next steps. Open Your Project in Xcode and open the `.xcodeproj` or `.xcworkspace` file of your project.

### 2. Navigate to Swift Packages

1. In the **Project Navigator**, select your project
2. Go to **Project Settings** (click your project name in the left panel)
3. Switch to the **Package Dependencies** tab

### 3. Add the SDK as a Package Dependency

1. Click the **+** button in the lower-left corner of the **Package Dependencies** section
2. In the popup dialog, enter the repository URL for the Swift package:

```
https://github.com/ArkoseLabs/alsdk-ios-packages
```

### 4. Authenticate with Credentials

After entering the URL, a dialog will appear prompting you for credentials. Input the credentials provided by Arkose to proceed.

> ⚠️ Warning
>
> Ensure these credentials are stored securely and not shared outside authorized usage.

### 5. Select the Package Version

1. Choose the versioning rule for the package
2. Select **Exact Version** and input the version name of latest Arkose Apple SDK version
3. Click **Next** to continue

### 6. Add the Package to Your Target

Xcode will fetch the package. Once the process completes, select the target(s) where you want to use the package. Click **Finish** to complete the integration.

***

## Legacy Support: Include the Dependencies Using xcframework and Static Library

In Xcode, open your **Host application**.

1. From the **Project Navigator** area, select the folder with your project's name
2. From the project's `xcodeproj` details, select **Target**

### To use the dynamic framework:

1. Scroll to **Frameworks, Libraries, and Embedded Content** and drag and drop `ArkoseLabsKit.xcframework` into this section
2. In Project Navigator, find **Frameworks** folder and verify `ArkoseLabsKit` is inside it
3. Click on **Build Phases** to display that tab. Find **Link Binary with Libraries** and **Embed Frameworks** section and confirm it contains `ArkoseLabsKit.xcframework`

### To use the static library:

1. Create a New Folder in your project called `ArkoseLabsKitStatic`
2. Drag and drop all files into the new folder from the SDK build `dist` folder
3. Scroll to **Frameworks, Libraries, and Embedded Content** and drag and drop:
   * For iOS Device Support add `ArkoseLabsKitStaticiOS.a` file in the section
   * For iOS Simulator Support add `ArkoseLabsKitStaticiOSSim.a` file in the section
   * For Mac Support add `ArkoseLabsKitStaticMac.a` file in the section
4. In **Copy Bundle Resources** section, add `ArkoseLabsKitResource.Bundle`

### To use the static framework:

1. Scroll to **Frameworks, Libraries, and Embedded Content** and drag and drop `ArkoseLabsKitStatic.xcframework` into this section
2. In Project Navigator, find **Frameworks** folder and verify `ArkoseLabsKitStatic` is inside it
3. Click on **Build Phases** to display that tab. Find **Link Binary with Libraries** and **Embed Frameworks** section and confirm it contains `ArkoseLabsKitStatic.xcframework`
4. In **Copy Bundle Resources** section, add `ArkoseLabsKitResource.Bundle`

**Final Steps:**

1. Perform a **Clean** task
2. Perform a **Build**

***

# Initialize the SDK

To integrate Arkose Bot Manager solution with the Enforcement Challenge, follow the steps outlined below:

1. Import `ArkoseLabsKit` or `ArkoseLabsKitStatic` module before invoking any API from the SDK:

```swift
// For dynamic framework
import ArkoseLabsKit

// For static framework
//import ArkoseLabsKitStatic
```

2. Initialize the SDK as soon as the application launches with `ArkoseConfig` object that contains all configuration parameters. We recommend using `UIApplicationDelegate` `didFinishLaunchingWithOptions` notification to do the initialization. A sample initialization code is shown below:

```swift
ArkoseManager.initialize(
    with: ArkoseConfig.Builder(withAPIKey: <YOUR_PUBLIC_KEY>)
            .with(apiBaseUrl: "<Actual API Base URL>") // optional
            .build()
    )
```

A complete example of `didFinishLaunchingWithOptions` implementation is below:

```swift
// For dynamic framework
import ArkoseLabsKit
// For static framework
//import ArkoseLabsKitStatic
import SwiftUI

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        ArkoseManager.initialize(
            with: ArkoseConfig.Builder(withAPIKey: <YOUR_PUBLIC_KEY>)
                    .with(apiBaseUrl: "<Actual API Base URL>")
                    .with(language: "en") //optional
                    .with(clientAPIRetryCount: 0) //optional
                    .with(styleTheme: "") //optional
                    .build()
            )
        return true
    }
}
```

***

## Integrate into a SwiftUI Application

To run Arkose Bot Manager and display the Enforcement Challenge in a SwiftUI View, integrate `ArkoseChallengeView` into the content of your custom view.

```swift
ArkoseChallengeView(isPresented: $isPresented, 
                    delegate: self)
```

See [Appendix: SwiftUI Content View](#appendix-swiftui-content-view) below for a complete example.

***

## Integrate into a UIKit Application

To run Arkose Bot Manager and display the Enforcement Challenge from a UIKit ViewController, invoke `ArkoseManager.showEnforcementChallenge` from an action method.

```swift
ArkoseManager.showEnforcementChallenge(
    parent: self,
    delegate: self
)
```

See the [Appendix: UIKit View Controller](#appendix-uikit-view-controller) below for a complete example.

***

# Receiving Notification

To receive notifications about various events triggered by Enforcement Challenge, implement `ArkoseChallengeDelegate` protocol on the SwiftUI View or UIViewController class and pass the instance as the delegate parameter above. To simplify the implementation, `ArkoseChallengeDelegate` has a default implementation, so implement only the necessary methods for your desired functionality. The most commonly implemented protocol methods are `onCompleted`, `onError`, and `onFailed` to complete the necessary action from the application.

***

# Build the Revised Project

1. Perform a **Clean**
2. Perform a **Build**

***

# Run and Test the Application

1. Run your modified iOS application
2. When running Arkose Bot Manager:
   * On the integrated screen, confirm you now see an Arkose Enforcement Challenge
   * Verify the challenge
3. On successful verification, the `onCompleted` event returns a token as part of the response JSON object
4. Send the token to your back-end server for verification

***

# Update Configuration in SDK

To update configuration of the SDK any time before Enforcement Challenge is called, follow the steps outlined below:

## In a SwiftUI Application

To run Arkose Bot Manager and display Enforcement Challenge in a SwiftUI View, integrate `ArkoseChallengeView` into the content of your custom view.

```swift
ArkoseChallengeView(isPresented: $isPresented,
                    delegate: self,
                    config:
                        ArkoseConfig.Builder(
                            withAPIKey: <YOUR_PUBLIC_KEY>)
                            .with(language: "en") //optional
                            .with(clientAPIRetryCount: 0) //optional
                            .with(styleTheme: "") //optional
                            .build())
```

See [Appendix: SwiftUI Content View](#appendix-swiftui-content-view) below for a complete example.

## In a UIKit Application

To run Arkose Bot Manager and display Enforcement Challenge from a UIKit ViewController, invoke `ArkoseManager.showEnforcementChallenge` from an action method.

```swift
ArkoseManager.update(with: 
  ArkoseConfig.Builder(
    withAPIKey: <YOUR_PUBLIC_KEY>)
    .with(language: "fr")	//optional
    .build()
    )
```

See the [Appendix: UIKit View Controller](#appendix-uikit-view-controller) below for a complete example.

***

# Implement Preloading of Challenges to onReady with On-Demand Presentation

## Overview

The new inlineRunOnTrigger configuration enables preloading of enforcement challenge to onReady state, giving your application full control over when a session token is generated or the challenge is presented to the user. This greatly improves user-perceived latency.

## Availability

Available from iOS SDK v2.20.0 (only in SwiftUI iOS Based SDK only).

## Configuration

1. Set via .with(inlineRunOnTrigger: true) (default: false)
2. Use with isPresented binding to preload the challenge
3. Resume the challenge flow by setting runEnforcement binding

> ⚠️ Warning
>
> Do NOT enable **withActivity=true** when using this feature, as it will cause the loader to display indefinitely

<br />

```swift
struct ArkoseView: View {

  @State private var isPresented = false
  @State private var runEnforcement = false
  
  var body: some View {
    VStack {
        Button("Run Enforcement") {
            runEnforcement = true
        }
        ArkoseChallengeView(isPresented: $isPresented,
                            runEnforcement: $runEnforcement,
                            delegate: self,
                            withActivity: false,
                            config: ArkoseConfig
                                    .Builder(withAPIKey: YOUR_API_KEY)
                                    .with(inlineRunOnTrigger: true)
                                    .build())
    }.onAppear{
        isPresented = true
    }
  }
}
```

***

# Programmatic Dismissal of Enforcement Challenge

## Overview

Programmatic dismissal allows you to programmatically close an active Enforcement Challenge without user interaction.

This is useful in scenarios such as:

* Handling app lifecycle events (e.g., app going to background)
* Implementing timeout mechanisms
* Responding to external events that require immediate challenge dismissal

# Availability

This API is available from API version 2.20.0 and above.

# Configuration

## UIKit Application

In UIKit applications, use `ArkoseManager.forceDismissEnforcementChallenge()` to programmatically dismiss the most recently active Enforcement Challenge.

### Method Signature

```swift
public static func forceDismissEnforcementChallenge()
```

### Behaviour

This API will dismiss the EC with animation. After successful dismissal, the SDK notifies the application via the onForceDismissCompleted() callback on the delegate.

### Handling App Lifecycle Events

```swift
class LoginViewController: UIViewController, ArkoseChallengeDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Set up observer for app going to background
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(appWillResignActive),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )
    }
    @objc func appWillResignActive() {
        // Dismiss challenge when app goes to background
        ArkoseManager.forceDismissEnforcementChallenge()
    }
    func onForceDismissCompleted() {
        // Challenge dismissed - app can safely go to background
        print("Challenge dismissed due to app lifecycle event")
    }
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    // ... other implementation ...
}
```

> ⚠️ Warning
>
> The `ArkoseManager.dismissEnforcementChallenge` API dismisses the most recently active Enforcement Challenge. To ensure proper behaviour, only one Enforcement Challenge should be active at any given time when calling this method.

<br />

## SwiftUI Application

In SwiftUI applications, programmatic dismissal is handled through the `isPresented` binding that controls the `ArkoseChallengeView`. Simply set `isPresented` to `false` to trigger automatic dismissal of the challenge view.

### Handling App Lifecycle Events

```swift
struct LoginView: View, ArkoseChallengeDelegate {
    @State private var isPresented = false
    var body: some View {
        ZStack {
            VStack {
                Button("Login") {
                    isPresented = true
                }
                .padding()
            }
            ArkoseChallengeView(
                isPresented: $isPresented,
                delegate: self,
                .. // other parameters
            )
        }
        .onAppear {
            // Set up background state observer
            NotificationCenter.default.addObserver(
                forName: UIApplication.willResignActiveNotification,
                object: nil,
                queue: .main
            ) { _ in
                // Dismiss the Enforcement Challenge by setting isPresented to false
                isPresented = false
            }
        }
    }
    func onForceDismissCompleted() {
        print("Challenge dismissed due to app lifecycle event")
    }
    // ... other implementation ...
}
```

### Best Practices

* Always Implement `onForceDismissCompleted()`
  * Even if you don't need to perform specific actions, implementing this callback helps you track dismissal state and handle edge cases.
* Avoid Multiple Simultaneous Dismissals
  * Avoid calling dismissal methods multiple times rapidly

```swift
// ❌ Bad: Multiple rapid calls
ArkoseManager.forceDismissEnforcementChallenge()
ArkoseManager.forceDismissEnforcementChallenge() // Unnecessary
// ✅ Good: Single call with state tracking
if !isDismissing {
    isDismissing = true
    ArkoseManager.forceDismissEnforcementChallenge()
}
```

* Wait for Dismissal Completion Before Presenting New Screens
  **Do not present new screens or view controllers while programmatic dismissal is in progress.** Instead, wait for the `onForceDismissCompleted()` callback to be triggered before proceeding with navigation or presenting new screens.
  Below error indicates that a view controller was presented on top of the Enforcement Challenge during dismissal. If you see this error log, try to wait for the `onForceDismissCompleted()` callback before presenting new screens

<Callout icon="❗️" theme="error">
  Failed to force-dismiss Arkose EC: another app-presented view controller is currently on top of Arkose EC.
</Callout>

***

## For API Version 2.1.0 and above

### ArkoseConfig.Builder

Arkose Enforcement Challenge configuration parameters can be updated using `ArkoseConfig.Builder` class. The public methods to specify these parameters are listed below:

#### `public init(withAPIKey apiKey: String)`

Initialize the Builder instance with the public key of your account.

#### `public func with(apiBaseUrl: String) -> Builder`

Base URL of Arkose Enforcement Challenge platform as supplied by Arkose Labs.

#### `public func with(blob: String) -> Builder`

Specify any encrypted data blobs to share with Arkose Bot Manager. It is optional.

#### `public func with(language: String) -> Builder`

Specify any language setting for the Enforcement Challenge, the default value is `en`. It is optional.

#### `public func with(userAgent: String) -> Builder`

Specify any userAgent setting for ease of testing forced Enforcement Challenge for a session, the default value is inbuilt WebView's userAgent. It is optional. Please talk with your CSM (Customer Success Manager) about your intended usage and request backend configuration.

#### `public func with(clientAPIRetryCount: Int) -> Builder`

Specify the number of retries when network issues are triggered when the client app tries to connect to the apiBaseUrl.

The retry only works for "onError" events with error codes below. When the configured number of retries is exhausted, the last error code is returned:

* Challenge load error
* `API_REQUEST_ERROR`
* `API_REQUEST_TIMEOUT`

Default: `0`. It is optional.

#### `public func with(styleTheme: String) -> Builder`

Specify style theme name for Enforcement Challenge. It is optional.

#### `public func with(timeoutInSecondsUntilReady: Int) -> Builder`

Configurable WebView session timeout in seconds. Developers can now set a timeout for all API calls within a session. A timeout exception will be thrown if the WebView is still loading when the timeout is reached. The timeout resets to the default value after `onReady` is called.

Default: `0`. It is optional.

#### `public func with(challengeBackgroundConfig: ChallengeBackgroundConfig) -> Builder`

Specify the background configuration for the Challenge Alert Screen, including background color, blur effect, and WebView transparency. It is optional.

**Example:**

```swift
ArkoseConfig.ChallengeBackgroundConfig(
      isOpaque: false, // true = opaque challenge webview background; false = transparent
      blurEffect: false, // true = add blur to challenge webview background; false = transparent background
      backgroundColor: UIKitColor(uiColor: .red) // Sets challenge background color. Use UIKitColor for Storyboard apps; SwiftUIColor for SwiftUI apps
 )
```

#### `public func with(showActivityIndicatorOnReset: Bool) -> Builder`

A boolean to control the enablement of the loading spinner animation during a challenge reset. The default value is `true`. If this parameter is not set, the loading spinner animation is shown. It is optional.

#### `public func build() -> ArkoseConfig`

Builds and returns an instance of `ArkoseConfig`.

#### `public func with(inlineRunOnTrigger: Bool) -> Builder`

A boolean to allow preloading of enforcement challenge to `onReady` state, giving your application full control over when a session token is generated or the challenge is presented to the user. This greatly improves user-perceived latency. The default value is `false`. It is optional. Available from iOS SDK v2.20.0 (only in SwiftUI iOS Based SDK only)

***

### ArkoseConfig

An instance of `ArkoseConfig` contains all the configuration parameters, use `ArkoseConfig.Builder` class to construct an instance of `ArkoseConfig`.

***

### ArkoseActionConfig

A structure containing localized String for the title of the Cancel button and localized String for the accessibilityHint of the Cancel Button. If set to `nil`, the Cancel button will not be displayed in the view.

**Example structure:**

```swift
ArkoseActionConfig(
  title: "Cancel",
  accessibilityHint: "Double tap to cancel the challenge"
)
```

***

### ArkoseManager

`ArkoseManager` class provides public methods to integrate the application with Arkose Bot Manager.

#### `public static func initialize(with configuration: ArkoseConfig)`

Initializes SDK with the configuration parameters.

#### `public static func update(with configuration: ArkoseConfig)`

Updates SDK with the configuration parameters.

#### `public static func showEnforcementChallenge(...)`

```swift
public static func showEnforcementChallenge(parent: UIViewController,
                                            delegate: ArkoseChallengeDelegate,
                                            cancelActionConfig: ArkoseActionConfig? = nil,
                                            resetActionConfig: ArkoseActionConfig? = nil,
                                            withActivity: Bool? = nil)
```

Display the Enforcement Challenge View and invokes the `ArkoseChallengeDelegate` methods to notify the result.

| Parameter                     | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parent`                      | An instance of `UIViewController` where the Enforcement Challenge View is displayed                                                                                                                                                                                                                                                                              |
| `delegate`                    | An instance of `ArkoseChallengeDelegate` to receive event notifications                                                                                                                                                                                                                                                                                          |
| `cancelButtonTitle`           | A localized String for the title of the Cancel button, the default value is `nil`. If this parameter is set to `nil`, the Cancel button is not shown in the view. *Deprecated since Arkose iOS SDK v2.18.0.*                                                                                                                                                     |
| `cancelActionConfig`          | A structure containing localized String for the title of the Cancel button and localized String for the accessibilityHint of the Cancel Button. If set to `nil`, the Cancel button will not be displayed in the view. Refer to [ArkoseActionConfig](https://developer.arkoselabs.com/docs/ios-mobile-sdk#arkoseactionconfig) section for implementation details. |
| `resetButtonTitle`            | A localized String for the title of the Reset button, the default value is `nil`. If this parameter is set to `nil`, the Reset button is not shown in the view. *Deprecated since Arkose iOS SDK v2.18.0.*                                                                                                                                                       |
| `resetActionConfig`           | A structure containing localized String for the title of the Reset button and localized String for the accessibilityHint of the Reset Button. If set to `nil`, the Reset button will not be displayed in the view. Refer to [ArkoseActionConfig](https://developer.arkoselabs.com/docs/ios-mobile-sdk#arkoseactionconfig)  section for implementation details.   |
| `withActivity`                | A Bool to control enablement of loading Spinner animation, the default value is `true`. If this parameter is set to `nil`, the loading Spinner animation is shown in the view.                                                                                                                                                                                   |
| `withActivityBackgroundAlpha` | A CGFloat value that sets the background alpha of the activity indicator or loader, ranging from 0.0 (fully transparent) to 1.0 (fully opaque), with a default value of 0.0.                                                                                                                                                                                     |

#### `public static var logLevel: LogLevel`

Sets log level for the SDK. All messages logged by ArkoseLabsKit framework will have `[ArkoseLabsKit]` text for easy identification. Valid `LogLevel` values are: `info`, `warn`, `error`.

***

### ArkoseChallengeView

`ArkoseChallengeView` is a SwiftUI View component of the SDK to integrate into the contents of the application View.

```swift
public init(isPresented: Binding<Bool>,
            delegate: ArkoseChallengeDelegate,
            cancelActionConfig: ArkoseActionConfig? = nil,
            resetActionConfig: ArkoseActionConfig? = nil,
            withActivity: Bool? = nil,
            withActivityBackgroundAlpha: CGFloat = 0.2,
            config: ArkoseConfig? = nil)
```

| Parameter                     | Description                                                                                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isPresented`                 | A Bool value that controls the visibility of the Enforcement Challenge View                                                                                                                                           |
| `delegate`                    | An instance of `ArkoseChallengeDelegate` to receive event notifications                                                                                                                                               |
| `cancelButtonTitle`           | A localized String for the title of the Cancel button, with a default value of `nil`. If set to `nil`, the Cancel button will not be displayed in the view. *Deprecated since Arkose iOS SDK v2.18.0.*                |
| `cancelActionConfig`          | A structure containing localized String for the title of the Cancel button and localized String for the accessibilityHint of the Cancel Button. If set to `nil`, the Cancel button will not be displayed in the view. |
| `resetButtonTitle`            | A localized String for the title of the Reset button, with a default value of `nil`. If set to `nil`, the Reset button will not be displayed in the view. *Deprecated since Arkose iOS SDK v2.18.0.*                  |
| `resetActionConfig`           | A structure containing localized String for the title of the Reset button and localized String for the accessibilityHint of the Reset Button. If set to `nil`, the Reset button will not be displayed in the view.    |
| `withActivity`                | A Bool that controls the enablement of the loading spinner animation, with a default value of `true`. If set to `nil`, the loading spinner animation will be displayed in the view.                                   |
| `withActivityBackgroundAlpha` | A CGFloat value that sets the background alpha of the activity indicator or loader, ranging from 0.0 (fully transparent) to 1.0 (fully opaque), with a default value of 0.2.                                          |
| `config`                      | An `ArkoseConfig` created using its builder, with a default value of `nil`. If set to `nil`, the configuration is not updated with the latest configuration.                                                          |

***

### LogLevel

`LogLevel` is an enumeration to control the logs generated by the framework. The valid values are:

| Value   | Description                                        |
| ------- | -------------------------------------------------- |
| `info`  | Log messages with severity level of info and above |
| `warn`  | Log messages with severity level of warn and above |
| `error` | Log messages with severity level of error only     |

***

### ArkoseChallengeDelegate

`ArkoseChallengeDelegate` is a protocol to be implemented by the application and passed in `showEnforcementChallenge` function call to receive notification about different events during Enforcement Challenge View lifecycle.

> 📘 Note
>
> All notifications are applicable to both Arkose Bot Manager detection and enforcement components unless explicitly specified.

#### `func onReady()`

`onReady` callback is invoked when the Enforcement or detection is ready.

#### `func onShow()`

`onShow` callback is invoked when the Enforcement is running and our detection component is analysing the user intent. The function is also invoked when an Enforcement Challenge or detection is re-displayed (e.g. if the user closes the EC or detection view and tries to continue).

*Applicable to enforcement only.*

#### `func onShown()`

`onShown` callback is invoked when the Enforcement Challenge is displayed for the first time.

*Deprecated since Arkose SDK v2.14.0. Applicable to enforcement only.*

#### `func onShown(response: [String: Any?])`

`onShown` callback is invoked when the Enforcement Challenge is displayed for the first time.

*Applicable to enforcement only.*

A Response Object is passed to this function.

#### `func onSuppress()`

`onSuppress` callback is invoked when either an Enforcement Challenge is suppressed (i.e. A session was classified as not requiring a challenge) or detection is running and our detection component is analyzing the user intent.

*Deprecated since Arkose SDK v2.14.0.*

#### `func onSuppress(response: [String: Any?])`

`onSuppress` callback is invoked when either an Enforcement Challenge is suppressed (i.e. A session was classified as not requiring a challenge) or detection is running and our detection component is analyzing the user intent.

A Response Object is passed to this function.

#### `func onHide()`

`onHide` callback is invoked when the EC or detection view is hidden. For example, this happens after an EC or detection is completed or if the user clicks the close button.

*Deprecated since Arkose SDK v2.14.0.*

#### `func onHide(response: [String: Any?])`

`onHide` callback is invoked when the EC or detection view is hidden. For example, this happens after an EC or detection is completed or if the user clicks the close button.

A Response Object is passed to this function.

#### `func onReset()`

`onReset` callback is invoked after the Enforcement Challenge is reset. Typically occurs after a challenge has been successfully answered.

*Applicable to enforcement only.*

#### `func onResize(widthValue: CGFloat, heightValue: CGFloat)`

`onResize` callback is invoked on a resizing event which provides the new width and height values of the EC due to an SDK call.

*Deprecated since Arkose SDK v2.14.0.*

#### `func onResize(response: [String: Any?])`

`onResize` callback is invoked on a resizing event which provides the new width and height values of the EC due to an SDK call.

A Response Object is passed to this function which includes the width and height values of the EC.

#### `func onCompleted(response: [String: Any?])`

`onCompleted` callback is invoked when a session is classified as not needing a challenge or a detection has been successfully completed.

A Response Object is passed to this function.

#### `func onError(response: [String: Any?])`

`onError` callback is invoked when an error occurs when loading the challenge or detection.

A Response Object is passed to this function.

#### `func onWarning(response: [String: Any?])`

`onWarning` callback is invoked when an issue occurs which needs to be shared with the app as a warning, based on which App can take custom actions, when loading the challenge or detection.

A Response Object is passed to this function.

#### `func onFailed(response: [String: Any?])`

`onFailed` callback is invoked when a challenge has failed (the user has failed the challenge multiple times and is not allowed to continue the session). SDK now supports the `recoverable` flag in the `onFailed` callback, giving you better control over UI dismissal based on error types. To provide the best experience for your users, check the `recoverable` flag in the response object:

* If `recoverable` is `true`: Keep the Enforcement Challenge open - it provides users with an option to retry, ensuring they can resolve the issue without restarting.
* If `recoverable` is `false` or missing: You can execute your dismissal logic immediately, preventing users from getting stuck.

```swift
let isRecoverable: Bool = (response["recoverable"] as? Bool) ?? false
if !isRecoverable {
   // Safe to Dismiss
}
```

A Response Object is passed to this function.

*Applicable to enforcement only.*

#### `func onPrepareForReset(completion: @escaping () -> Void)`

Invoked when the user clicks the reset button. This is the ideal time to get and update new data, such as a session blob. Use `ArkoseManager.update(with:)` to apply the new configuration before calling the completion handler.

> ⚠️ Warning
>
> You must call the completion handler. If this is not called, the challenge will not reset.

**Parameters:**

* `completion`: The closure that must be called to continue the reset process.

#### `func onForceDismissCompleted()`

onForceDismissCompleted callback is invoked by the SDK to notify your application that a programmatic dismissal operation has completed successfully. Please see section *Programmatic Dismissal of Enforcement Challenge*, to understand more about how to programmatically close the EC.

* **Default Implementation**\
  The protocol `ArkoseChallengeDelegate` provides a default empty implementation, so you only need to implement this method if you want to perform specific actions when dismissal completes.

```swift
public extension ArkoseChallengeDelegate {
    func onForceDismissCompleted() {}
}
```

<br />

***

## For API Version 2.0.1

### ArkoseConfig.Builder

Arkose Labs Enforcement Challenge configuration parameters can be updated using `ArkoseConfig.Builder` class. The public methods to specify these parameters are listed below:

#### `public init(withAPIKey apiKey: String)`

Initialize the Builder instance with the public key of your account.

#### `public func with(apiBaseUrl: String) -> Builder`

Base URL of Arkose Labs EC platform as supplied by Arkose Labs.

#### `public func with(blob: String) -> Builder`

Specify any encrypted data blobs to share with Arkose Bot Manager. It is optional.

#### `public func with(language: String) -> Builder`

Specify any language setting for the Enforcement Challenge, the default value is `en`. It is optional.

#### `public func build() -> ArkoseConfig`

Builds and returns an instance of `ArkoseConfig`.

***

### ArkoseConfig

An instance of `ArkoseConfig` contains all the configuration parameters, use `ArkoseConfig.Builder` class to construct an instance of `ArkoseConfig`.

***

### ArkoseManager

`ArkoseManager` class provides public methods to integrate the application with the Arkose Bot Manager.

#### `public static func initialize(with configuration: ArkoseConfig)`

Initialize Arkose Bot Manager SDK with the configuration parameters.

#### `public static func update(with configuration: ArkoseConfig)`

Update Arkose Bot Manager SDK with the configuration parameters.

#### `public static func showEnforcementChallenge(...)`

```swift
public static func showEnforcementChallenge(parent: UIViewController,
                                            delegate: ArkoseChallengeDelegate,
                                            cancelActionConfig: ArkoseActionConfig? = nil,
                                            resetActionConfig: ArkoseActionConfig? = nil)
```

Display the Enforcement Challenge View and invokes the `ArkoseChallengeDelegate` methods to notify the result.

| Parameter            | Description                                                                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parent`             | An instance of `UIViewController` where the Enforcement Challenge View is displayed                                                                                                                                   |
| `delegate`           | An instance of `ArkoseChallengeDelegate` to receive event notifications                                                                                                                                               |
| `cancelButtonTitle`  | A localized string for the title of the Cancel button, the default value is "Cancel". If this parameter is set to `nil`, the Cancel button is not shown in the view. *Deprecated since Arkose SDK v2.18.0.*           |
| `cancelActionConfig` | A structure containing localised String for the title of the Cancel button and localised String for the accessibilityHint of the Cancel Button. If set to `nil`, the Cancel button will not be displayed in the view. |
| `resetButtonTitle`   | A localized string for the title of the Reset button, the default value is `nil`. If this parameter is set to `nil`, the Reset button is not shown in the view.                                                       |

#### `public static var logLevel: LogLevel`

Set the log level for the SDK. All messages logged by the ArkoseLabsKit framework will have the `[ArkoseLabsKit]` text for easy identification. Valid `LogLevel` values are: `info`, `warn`, `error`.

***

### ArkoseChallengeView

`ArkoseChallengeView` is the SwiftUI View component to integrate into the contents of the application View.

```swift
public init(isPresented: Binding<Bool>,
            delegate: ArkoseChallengeDelegate,
            cancelButtonTitle: String? = nil,
            resetButtonTitle: String? = nil,
            config: ArkoseConfig? = nil)
```

| Parameter           | Description                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isPresented`       | A boolean value to control the visibility of the Enforcement Challenge View                                                                                          |
| `delegate`          | An instance of `ArkoseChallengeDelegate` to receive event notifications                                                                                              |
| `cancelButtonTitle` | A localized string for the title of the Cancel button, the default value is "Cancel". If this parameter is set to `nil`, the Cancel button is not shown in the view. |
| `resetButtonTitle`  | A localized string for the title of the Reset button, the default value is `nil`. If this parameter is set to `nil`, the Reset button is not shown in the view.      |
| `config`            | An `ArkoseConfig` created using its builder, the default is `nil`. If this parameter is set to `nil`, the configuration is not updated with latest configuration.    |

***

### LogLevel

`LogLevel` is an enumeration to control the logs generated by the framework. The valid values are:

| Value   | Description                                        |
| ------- | -------------------------------------------------- |
| `info`  | Log messages with severity level of info and above |
| `warn`  | Log messages with severity level of warn and above |
| `error` | Log messages with severity level of error only     |

***

### ArkoseChallengeDelegate

`ArkoseChallengeDelegate` is a protocol to be implemented by the application and passed in `showEnforcementChallenge` function call to receive notification about different events during Enforcement Challenge View lifecycle.

> 📘 Note
>
> All notifications are applicable to both Arkose Bot Manager detection and enforcement components unless explicitly specified.

#### `func onReady()`

`onReady` callback is invoked when the Enforcement or detection is ready.

#### `func onShow()`

`onShow` callback is invoked when the Enforcement is running and our detection component is analyzing the user intent. The function is also invoked when an Enforcement Challenge or detection is re-displayed (e.g. if the user closes the EC or detection view and tries to continue).

*Applicable to enforcement only.*

#### `func onShown()`

`onShown` callback is invoked when the Enforcement Challenge is displayed for the first time.

*Applicable to enforcement only.*

#### `func onSuppress()`

`onSuppress` callback is invoked when either an Enforcement Challenge is suppressed (i.e. A session was classified as not requiring a challenge) or detection is running and our detection component is analyzing the user intent.

#### `func onHide()`

`onHide` callback is invoked when the EC or detection view is hidden. For example, this happens after an EC or detection is completed or if the user clicks the close button.

#### `func onReset()`

`onReset` callback is invoked after the Enforcement Challenge is reset. Typically occurs after a challenge has been successfully answered.

*Applicable to enforcement only.*

#### `func onCompleted(response: [String: Any?])`

`onCompleted` callback is invoked when a session is classified as not needing a challenge or a detection has been successfully completed.

A Response Object is passed to this function.

#### `func onError(response: [String: Any?])`

`onError` callback is invoked when an error occurs when loading the challenge or detection.

A Response Object is passed to this function.

#### `func onWarning(response: [String: Any?])`

`onWarning` callback is invoked when an issue occurs which needs to be shared with the app as a warning, based on which App can take custom actions, when loading the challenge or detection.

A Response Object is passed to this function.

#### `func onFailed(response: [String: Any?])`

`onFailed` callback is invoked when a challenge has failed (the user has failed the challenge multiple times and is not allowed to continue the session).

A Response Object is passed to this function.

*Applicable to enforcement only.*

***

# For API Version 1.0

> ⚠️ Deprecation Notice
>
> Version 1.0 APIs are deprecated starting with ArkoseLabsKit framework 2.0.0, but fully backward compatible with old APIs. We recommend upgrading to the simplified implementation in 2.0.0 and above.

### ALWebView

| Configuration Object | Type                      | Description                                                                                                                                                                                              |
| -------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ALWebView`          | Public method             | Method used to start Arkose Bot Manager. Before this method is called, the model object must be initialized with: `webEventDelegate` (should be assigned to "receiving component"), `apiLang`, `apiBlob` |
| `WebEventDelegate`   | Public delegate component | Lets clients receive callbacks from Arkose Bot Manager                                                                                                                                                   |
| `apiLang`            | String                    | Applies only to enforcement. Language setting for the Enforcement Challenge. Default: `"en"`                                                                                                             |
| `apiBlob`            | String                    | Optional. Mainly used to share any client encrypted data blobs with Arkose Bot Manager. Default: `""`                                                                                                    |
| `apiKey`             | String                    | Optional. The API\_KEY added in Config.plist can be overridden with this value if needed. Default: `""`                                                                                                  |
| `resetSession`       | Public method             | Optional method to reset the current session for Arkose Bot Manager. This creates a new session.                                                                                                         |

***

### WebEventDelegate Protocol

| Events Callback | Type  | Description                                                                                                                                                                                                                                                                                                                            | Applicable Component   |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `onReady`       | Event | Receives the onReady event callback from the API server. Invoked when the Enforcement or detection is ready. The Enforcement or detection cannot be triggered before this event. You may want to disable the UI you are protecting until this event has been triggered.                                                                | Detection, Enforcement |
| `onShow`        | Event | Listener function invoked when the Enforcement is running and detection is analyzing the user intent. The function is also invoked when an Enforcement Challenge or detection is re-displayed (e.g. if the user closes the EC or detection view and tries to continue). Note that the close button only appears when in Lightbox mode. | Detection, Enforcement |
| `onShown`       | Event | Function only invoked when the Enforcement Challenge is displayed for the first time.                                                                                                                                                                                                                                                  | Enforcement            |
| `onSuppress`    | Event | Listener function invoked when either an Enforcement Challenge is suppressed (i.e. A session was classified as not requiring a challenge) or detection is running and detection is analyzing the user intent.                                                                                                                          | Detection, Enforcement |
| `onHide`        | Event | Listener function invoked when the EC or detection view is hidden. For example, this happens after an EC or detection is completed or if the user clicks the close button. Note that the close button only appears when in Lightbox mode.                                                                                              | Detection, Enforcement |
| `onReset`       | Event | Function invoked after the Enforcement resets. Typically occurs after a challenge has been successfully answered.                                                                                                                                                                                                                      | Enforcement            |
| `onCompleted`   | Event | Listener function invoked when a session is classified as not needing a challenge or a detection has been successfully completed. A Response Object is passed to this function.                                                                                                                                                        | Detection, Enforcement |
| `onError`       | Event | Function invoked when an error occurs when loading the challenge or detection. A Response Object is passed to this function.                                                                                                                                                                                                           | Detection, Enforcement |
| `onWarning`     | Event | Function invoked when an issue occurs which needs to be shared with the app as a warning, based on which App can take custom actions, when loading the challenge or detection. A Response Object is passed to this function.                                                                                                           | Detection, Enforcement |
| `onFailed`      | Event | Function invoked when a challenge has failed (the user has failed the challenge multiple times and is not allowed to continue the session). A Response Object is passed to this function.                                                                                                                                              | Enforcement            |
| `onResize`      | Event | Function invoked on a resizing event which provides the new width and height values of the EC due to an SDK call. A Response Object is passed to this function.                                                                                                                                                                        | Enforcement            |

***

### Configuration Parameters

You can change the following configuration parameters by specifying their values in the `config.plist` file.

| Configuration Parameters | Type   | Description                                                              |
| ------------------------ | ------ | ------------------------------------------------------------------------ |
| `API_URL_BASE`           | String | Base URL of Arkose Bot Manager as supplied by Arkose Labs                |
| `API_KEY`                | String | Public key for your account                                              |
| `API_FILE`               | String | Name of JavaScript file of Arkose Bot Manager as supplied by Arkose Labs |

***

### Config.plist Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>VERIFICATION_URL</key>
    <string></string>
    <key>API_KEY</key>
    <!-- Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account -->
    <string>YOUR_PUBLIC_KEY</string>
    <key>API_URL_BASE</key>
    <string>https://client-api.arkoselabs.com/v2</string>
    <key>API_FILE</key>
    <string>api.js</string>
</dict>
</plist>
```

***

# Appendix: SwiftUI Content View

```swift
import SwiftUI
import ArkoseLabsKit

struct LoginView: View, ArkoseChallengeDelegate {
    
    // MARK: - State Variables
    
    @State private var isPresented = false
    @State private var shouldNavigateToNext = false
    @State private var isDismissingChallenge = false
    @State private var username: String = ""
    @State private var password: String = ""
    
    // MARK: - ArkoseChallengeDelegate Methods
    
    func onCompleted(response: [String: Any?]) {
        print("onComplete received: \(response)")
        isPresented = false
        // Handle successful challenge completion
    }
    
    func onError(response: [String: Any?]) {
        print("onError received: \(response)")
        isPresented = false
        // Handle error during challenge
    }
    
    func onFailed(response: [String: Any?]) {
        print("onFailed received: \(response)")
        let isRecoverable: Bool = (response["recoverable"] as? Bool) ?? false
        if !isRecoverable {
            // Safe to dismiss - non-recoverable failure
            isPresented = false
        }
        // If recoverable, challenge will continue
    }
    
    func onForceDismissCompleted() {
        isDismissingChallenge = false
        
        // Now safe to trigger navigation
        // The shouldNavigateToNext binding will trigger the sheet presentation
        // after dismissal is complete
        if shouldNavigateToNext {
            // Navigation will be triggered by the sheet modifier
        }
    }
    
    // MARK: - Body
    
    var body: some View {
        ZStack {
            VStack {
                Text("SwiftUI App")
                    .padding()
                    .font(.largeTitle)
                    .foregroundColor(Color.black)
                
                TextField("Username", text: $username)
                    .font(.title3)
                    .disableAutocorrection(true)
                    .autocapitalization(.none)
                    .padding()
                
                SecureField("Password", text: $password)
                    .font(.title3)
                    .disableAutocorrection(true)
                    .autocapitalization(.none)
                    .padding()
                
                Button("Login") {
                    self.isPresented = true
                }
                .padding()
                
                Button("Navigate") {
                    // ❌ Bad: Setting navigation state immediately
                    // isPresented = false
                    // shouldNavigateToNext = true // May cause conflicts
                    
                    // ✅ Good: Wait for dismissal completion
                    if isDismissingChallenge {
                        // Already dismissing, wait for callback
                        return
                    }
                    
                    isDismissingChallenge = true
                    shouldNavigateToNext = true
                    isPresented = false
                    // Navigation will be triggered in onForceDismissCompleted()
                }
                .padding()
            }
            
            ArkoseChallengeView(
                isPresented: $isPresented,
                delegate: self,
                cancelActionConfig: ArkoseActionConfig(
                    title: "Cancel",
                    accessibilityHint: "Cancel the challenge"
                ),
                resetActionConfig: ArkoseActionConfig(
                    title: "Reset",
                    accessibilityHint: "Reset the challenge"
                ),
                config: ArkoseConfig.Builder(
                    withAPIKey: "<YOUR_PUBLIC_KEY>" // Replace <YOUR_PUBLIC_KEY> with the actual API key assigned to your account
                )
                .with(language: "fr")
                .build()
            )
        }
        .sheet(isPresented: $shouldNavigateToNext) {
            NextView()
        }
        .onAppear {
            // Set up background state observer
            NotificationCenter.default.addObserver(
                forName: UIApplication.willResignActiveNotification,
                object: nil,
                queue: .main
            ) { _ in
                // Dismiss the Enforcement Challenge when app goes to background
                if isPresented && !isDismissingChallenge {
                    isDismissingChallenge = true
                    isPresented = false
                }
            }
        }
    }
}

// MARK: - Preview

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
```

***

# Appendix: UIKit View Controller

```swift
import UIKit
import ArkoseLabsKit

class LoginViewController: UIViewController, ArkoseChallengeDelegate {
    
    private var isDismissingChallenge = false
    
    // MARK: - ArkoseChallengeDelegate Methods
    
    func onCompleted(response: [String: Any?]) {
        print("onComplete received: \(response)")
        // Handle successful challenge completion
    }
    
    func onError(response: [String: Any?]) {
        print("onError received: \(response)")
        // Handle error during challenge
    }
    
    func onFailed(response: [String: Any?]) {
        print("onFailed received: \(response)")
        // Handle challenge failure
    }
    
    func onForceDismissCompleted() {
        isDismissingChallenge = false
        // Now safe to present new screen or perform other actions
        presentNextViewController()
    }
    
    // MARK: - Actions
    
    @IBAction func login(_ sender: Any) {
        // Replace <YOUR_PUBLIC_KEY> with the actual API key assigned to your account
        ArkoseManager.update(with: ArkoseConfig.Builder(withAPIKey: "<YOUR_PUBLIC_KEY>")
            .with(language: "fr")
            .build()
        )
        
        ArkoseManager.showEnforcementChallenge(
            parent: self,
            delegate: self,
            cancelActionConfig: ArkoseActionConfig(
                title: "Cancel",
                accessibilityHint: "Cancel the challenge"
            ),
            resetActionConfig: ArkoseActionConfig(
                title: "Reset",
                accessibilityHint: "Reset the challenge"
            )
        )
    }
    
    @IBAction func navigateToNextScreen() {
        // ❌ Bad: Presenting immediately after calling dismissal
        // ArkoseManager.forceDismissEnforcementChallenge()
        // presentNextViewController() // May cause conflicts
        
        // ✅ Good: Wait for dismissal completion
        if isDismissingChallenge {
            // Already dismissing, wait for callback
            return
        }
        
        isDismissingChallenge = true
        ArkoseManager.forceDismissEnforcementChallenge()
        // presentNextViewController() will be called in onForceDismissCompleted()
    }
    
    @IBAction func dismiss(_ sender: Any) {
        if isDismissingChallenge {
            // Already dismissing, wait for callback
            return
        }
        
        isDismissingChallenge = true
        ArkoseManager.forceDismissEnforcementChallenge()
        // Dismissal completion will be notified via onForceDismissCompleted()
    }
    
    // MARK: - Helper Methods
    
    private func presentNextViewController() {
        let nextVC = NextViewController()
        present(nextVC, animated: true)
    }
}
```