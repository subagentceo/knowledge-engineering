# Installation

Install Intercom to see and talk to users of your iOS app. The Intercom for iOS library supports iOS **15+** and requires **Xcode 15** to build.

## Step 1 - Install Intercom

If you’re new to Intercom, you’ll need to [create an account](https://www.intercom.com) and start your free trial.

Go to your [settings](https://app.intercom.com/a/apps/_/settings/ios) and under Installation select install for mobile.

![](/assets/messenger_installation_2024_web_or_mobile.04d989f4654a1e75e44c3b499eeb5cf93cc6d9c9fe74768018e66b6c162ba998.71a4f21c.png)

Then choose iOS.

![](/assets/messenger_installation_2024_mobile.6dd45f6f943cf7b9e6a6279674730c6f183c7ad361cf73e4d26b108efaca7757.71a4f21c.png)

Next, enable user traffic for Messenger.

Enable Messenger
You must ensure that the iOS Messenger is enabled from inside the [Intercom settings panel](https://app.intercom.com/a/apps/_/settings/ios). When this is disabled, all requests to Intercom will fail.

![](/assets/messenger_installation_enable_traffic.1966802ecfd36b289cb11c1743b85847fa3f65732abb9a739704e4548bdf4022.71a4f21c.png)

Then you have three options:

### Option 1: CocoaPods

Using the [latest version of Cocoapods](https://github.com/CocoaPods/CocoaPods/releases/latest), add Intercom to your Podfile and run `pod install --repo-update`


```ruby
target :YourTargetName do
  pod 'Intercom'
end
```

### Option 2: Swift Package Manager

Add [https://github.com/intercom/intercom-ios-sp](https://github.com/intercom/intercom-ios-sp) as a Swift Package Repository in Xcode and follow the instructions to add Intercom as a Swift Package.

![](/assets/c837cb_spm_install.d95466a7d6d7734213f7c8e17f01af6e07f424e4ef691a17335cf2e1ba125b8d.71a4f21c.png)

### Option 3: Install Intercom manually

1. [Download Intercom for iOS and extract the zip.](https://github.com/intercom/intercom-ios/archive/master.zip)
2. Drag `Intercom.xcframework` into your project. Make sure ** "Copy items if needed"** is selected and click Finish.


![](/assets/51cf138-xcframework_drag.3174364455efbdcf910845ac4799a41b2b2d4fc8c591757d5342919e8bce0e06.71a4f21c.png)

![](/assets/031bc35-copy_items.5a5b4be63f74ace7a2fd7e76668fa1d8aa3da3e9ffd138f4d23468acf94e3a6a.71a4f21c.png)

1. In the target settings for your app, set the `Intercom.xcframework` to **“Embed & Sign”**. This can be found in the **“Frameworks, Libraries, and Embedded Content”** section of the **“General**” tab.


![](/assets/8cdc3a4-embed_sign.b4092263d4c78365a69cd224b52c72082b867ac7e74fd5474e3424a40faf3403.71a4f21c.png)

## Step 2 - Update Info.plist

**Camera usage:**
You need to make sure that you have a `NSCameraUsageDescription` entry in your `Info.plist`. This is required by Apple to access device's camera. It is necessary when installing Intercom due to the camera upload functionality. Users will be prompted for the camera and permission only when they tap the camera upload button.
You can also optionally add an entry for `NSMicrophoneUsageDescription`. This is required if you wish to use record a video and upload it to a conversation.

## Step 3 - Initialize Intercom

Initialize Intercom by importing Intercom and adding the following to your application delegate:


```swift
import Intercom 
  
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Intercom.setApiKey("<Your iOS API Key>", forAppId: "<Your App ID>")
}
```


```objectivec
@import Intercom;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [Intercom setApiKey:@"<Your iOS API Key>" forAppId:@"<Your App ID>"];
}
```

If your app is using a **UISceneDelegate** you will need to put your Intercom initialisation code into your `SceneDelegate`


```swift
import Intercom 

func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
 	Intercom.setApiKey("<Your iOS API Key>", forAppId: "<Your App ID>")
}
```


```objectivec
@import Intercom;

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
	[Intercom setApiKey:@"<Your iOS API Key>" forAppId:@"<Your App ID>"];
}
```

You can also manage your API Keys during this step.

![](/assets/ios_api_key.341947b9490a77a9fb9e9abd21fd8f7d0f5984b57ea434239b713a67a8dbaddf.71a4f21c.png)

## Step 4 — Check the Installation

You can check to see if your installation was successful. If the Messenger has been found for your chosen installation you will receive a success notification, otherwise or you will be notified that something has gone wrong.

![](/assets/messenger_installation_check_installation.b49889b301d97ff131f921529d28108027854a09b3a2e7c48dba1d9cb396035b.71a4f21c.png)

# What next?

Once you've installed Intercom you can start using Intercom in your iOS app.

- [Configure your iOS app](/installing-intercom/ios/using-intercom).
- [Enable push notifications](/installing-intercom/ios/push-notifications) so you can send push messages.
- [Enable Identity Verification](/installing-intercom/ios/secure-your-messenger) for your iOS app.