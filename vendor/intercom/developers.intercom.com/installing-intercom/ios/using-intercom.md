# Using Intercom

## User Login

You'll need to log your users into Intercom before you can talk to them or see what they do in your app. There are two types of users that can be created in Intercom: identified and unidentified.

- **Identified users**: If users need to login to your app to use it, such as Facebook, Instagram, or Slack, they would be considered identified users.
- **Unidentified users**: If your app does not have a login option, like Angry Birds or a flashlight app, you have unidentified users.


There are three ways to log users into Intercom that visit your app:

1. Only login unidentified users
2. Only login identified users
3. Login both identified and unidentified users - an example of this is where your app has a login option, but it's not essential for users to login to use your app, like Google Maps or YouTube.


The option you choose should be informed by the design of your app, namely whether you have a login option.

## Login only unidentified users

If you have an app with no login option (like Angry Birds or a flashlight app), you should only login unidentified users.

```objectivec
+ (void)loginUnidentifiedUserWithSuccess:(void(^ __nullable)(void))success failure:(void(^ __nullable)(NSError *_Nonnull error))failure NS_REFINED_FOR_SWIFT;
```

```swift
public class func Intercom.loginUnidentifiedUser(completion: ((Result<Void, Error>) -> Void)?)
```

## Parameters

| Name | Description |
|  --- | --- |
| success | A nullable success callback with no parameters. |
| failure | A failure callback with an error parameter. |


You must call one of the user login methods in order to start communicating with Intercom.

### Usage

If you call `loginUnidentifiedUserWithSuccess:failure:`, all activity will be tracked anonymously. If you choose to subsequently identify that user, all that anonymous activity will be merged into the identified user. This means that you will no longer see the anonymous user in Intercom, but rather the identified one.

We recommend this is called from within the application delegate's `didFinishLaunchingWithOptions:` method.

Just login as an unidentified user in your application's delegate, like so:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [Intercom loginUnidentifiedUserWithSuccess:^{
        // Handle success
    } failure:^(NSError * _Nonnull error) {
        // Handle error
    }];
}
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Intercom.loginUnidentifiedUser { result in
        switch result {
        case .success:
            // Handle success
        case .failure(let error):
            // Handle error
        }
    }
}
```

If the failure block of this call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

If a request to login a user fails, it will be retried before calling the failure callback. Furthermore if all login retries have failed, you can still attempt to call other Intercom methods, as the Intercom SDK will first try to log the user in if previous login attempts have failed. The success and failure callbacks are also optional, so `nil` can be passed to them in scenarios where you're not interested in their outcome.

## Login only identified (logged in) users

If people must log in to access your app (as in with Facebook, Instagram or Slack) you should follow these instructions to login identified users to Intercom only.

```objectivec
+ (void)loginUserWithUserAttributes:(ICMUserAttributes *)userAttributes success:(void(^ __nullable)(void))success failure:(void(^ __nullable)(NSError *_Nonnull error))failure
```

```swift
public class func loginUser(with attributes: ICMUserAttributes, completion: ((Result<Void, Error>) -> Void)? = nil)
```

### Parameters

| Name | Description |
|  --- | --- |
| userAttributes | An `ICMUserAttributes` object. Either or both `email` and `userId` properties must be populated. |
| success | A nullable success callback with no parameters. |
| failure | A failure callback with an error parameter. |


### Usage

In order to keep track of a specific user, you must identify it with a unique user identity, an email address, or both. To provide these, you must first create a new `ICMUserAttributes` object and then populate the `email` and/or `userId` properties for that object. This is a userId, supplied by you (e.g. from an existing web service for your product) to represent your user in Intercom, once set it cannot be changed.

As well as the `email` and `userId` fields, you can populate the other user attribute fields within `ICMUserAttributes` when you login as an identified user. By supplying information like this, Intercom provides richer user profiles for your users.

### Best practices for logging in users

- It is important to *only* login identified users to Intercom *after* verification of a login
- We recommend giving all your users unique userIds, but if you haven't implemented this, you should create an `ICMUserAttributes` object and only populate the `email` property instead of populating the `userId` . Do not use an email address as a userId as this field cannot be changed later. If you choose to login a user with just an email, the email address must not be associated with any other users on your workspace.


1. First, you'll need to log your user into Intercom when your app launches, like this:


```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    ICMUserAttributes *userAttributes = [ICMUserAttributes new];
    userAttributes.userId = @"<#123456#>";
    [Intercom loginUserWithUserAttributes:userAttributes success:^{
        // Handle success
    } failure:^(NSError * _Nonnull error) {
        // Handle failure
    }];
}
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let attributes = ICMUserAttributes()
    attributes.email = "<#123456#>"
    Intercom.loginUser(with: attributes) { result in
        switch result {
        case .success:
            // Handle success
        case .failure(let error):
            // Handle error
        }
    }
}
```

If the failure block of this call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

If you don't have a unique userId to use here, you can create an `ICMUserAttributes` object and just populate the `email` property. Similarly, if you have both a userId and an email, you can populate both the `userId` and `email` attributes of the `ICMUserAttributes` object.

1. You'll also need to log your users into Intercom anywhere they login to your app:


```objectivec
- (void)successfulLogin {
    ICMUserAttributes *userAttributes = [ICMUserAttributes new];
    userAttributes.userId = @"<#123456#>";
    [Intercom loginUserWithUserAttributes:userAttributes success:^{
        // Handle success
    } failure:^(NSError * _Nonnull error) {
        // Handle failure
    }];
}
```

```swift
func successfulLogin() {
    let attributes = ICMUserAttributes()
    attributes.email = "<#123456#>"
    Intercom.loginUser(with: attributes) { result in
        switch result {
        case .success:
            // Handle success
        case .failure(let error):
            // Handle error
        }
    }
}
```

If the failure block of this call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

### Login both unidentified (non-logged in) and identified (logged in) users

If you have an app with both unidentified and identified users (like Google Maps or YouTube), follow these instructions.

### Best practices for logging in users

- It is important to *only* login identified users to Intercom *after* verification of login to your app
- We recommend giving all your users unique userIds, but if you haven't implemented this, you should create an `ICMUserAttributes` object and only populate the `email` property instead of populating the `userId` . Do not use an email address as a userId as this field cannot be changed later. If you choose to login a user with just an email, the email address must not be associated with any other users on your workspace.


1. First, you'll need to log your users into Intercom when your app launches, like this:


```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (loggedIn) {
        ICMUserAttributes *userAttributes = [ICMUserAttributes new];
        userAttributes.userId = @"<#123456#>";
        [Intercom loginUserWithUserAttributes:userAttributes success:^{
            // Handle success
        } failure:^(NSError * _Nonnull error) {
            // Handle failure
        }];
    } else {
        [Intercom loginUnidentifiedUserWithSuccess:^{
            // Handle success
        } failure:^(NSError * _Nonnull error) {
            // Handle error
        }];
    }
}
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    if loggedIn {
        let attributes = ICMUserAttributes()
        attributes.email = "<#123456#>"
        Intercom.loginUser(with: attributes) { result in
            switch result {
            case .success:
                // Handle success
            case .failure(let error):
                // Handle error
            }
        }
    } else {
        Intercom.loginUnidentifiedUser { result in
            switch result {
            case .success:
                // Handle success
            case .failure(let error):
                // Handle error
            }
        }
    }
}
```

If you don't have a unique userId to use here, you can create an `ICMUserAttributes` object and just populate the `email` property. Similarly, if you have both a userId and an email, you can populate both the `userId` and `email` attributes of the `ICMUserAttributes` object.

1. You'll also need to log your users into Intercom anywhere they login to your app:


```objectivec
- (void)successfulLogin {
    ICMUserAttributes *userAttributes = [ICMUserAttributes new];
    userAttributes.userId = @"<#123456#>";
    [Intercom loginUserWithUserAttributes:userAttributes success:^{
        // Handle success
    } failure:^(NSError * _Nonnull error) {
        // Handle failure
    }];
}
```

```swift
func successfulLogin() {
    let attributes = ICMUserAttributes()
    attributes.email = "<#123456#>"
    Intercom.loginUser(with: attributes) { result in
        switch result {
        case .success:
            // Handle success
        case .failure(let error):
            // Handle error
        }
    }
}
```

If the failure block of this call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

## How to log out an identified user

You should only log out an identified user. Logging out an unidentified user will result in orphan records that cannot be merged in future.

When users want to log out of your app simply call:

```objectivec
- (void)logout {
    [Intercom logout];
}
```

```swift
func logout() {
    Intercom.logout()
}
```

Intercom knows when your app is backgrounded and comes alive again, so you won't need to log your users in again.

## Update a user

```objectivec
+ (void)updateUser:(ICMUserAttributes *)userAttributes success:(void(^ __nullable)(void))success failure:(void(^ __nullable)(NSError *_Nonnull error))failure NS_REFINED_FOR_SWIFT;
```

```swift
public class func updateUser(with: ICMAttributes, completion: ((Result<Void, Error>) -> Void)?)
```

### Parameters

| Name | Description |
|  --- | --- |
| userAttributes | The attributes to update the user with. |
| success | A nullable success callback with no parameters. |
| failure | A failure callback with an error parameter. |


### Usage

You can send any data you like to Intercom. Typically our customers see a lot of value in sending data that relates to customer development, such as price plan, value of purchases, etc. Once these have been sent to Intercom you can then apply filters based on these attributes.

You can send any data you like to Intercom from standard user attributes that are common to all Intercom users to custom user attributes that are unique to your app.

The complete list of standard user attributes that can be updated are described in the `ICMUserAttributes` object. Standard user attributes such as a user's name or email address can be updated by calling:

```objectivec
ICMUserAttributes *userAttributes = [ICMUserAttributes new];
userAttributes.name = @"Bob";
userAttributes.email = @"bob@example.com";
[Intercom updateUser:userAttributes success:^{
    // Handle success
} failure:^(NSError * _Nonnull error) {
   // Handle error
}];
```

```swift
let userAttributes = ICMUserAttributes()
userAttributes.name = "Bob"
userAttributes.email = "bob@example.com"
Intercom.updateUser(with: userAttributes) { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle error
    }
}
```

If the failure block of the above call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

Typically our customers see a lot of value in sending custom data that relates to customer development, such as price plan, value of purchases, etc. Custom user attributes must first be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas). They can then be modified by setting the `customAttributes` on the `ICMUserAttributes` object with a dictionary.

```objectivec
ICMUserAttributes *userAttributes = [ICMUserAttributes new];
userAttributes.customAttributes = @{@"paid_subscriber" : @YES,
                                    @"monthly_spend"   : @155.5,
                                    @"team_mates"      : @3};
[Intercom updateUser:userAttributes success:^{
    // Handle success
} failure:^(NSError * _Nonnull error) {
   // Handle error
}];
```

```swift
let userAttributes = ICMUserAttributes()
userAttributes.customAttributes = ["paid_subscriber": true,
                                   "monthly_spend"  : 155.5,
                                   "team_mates"     : 3]
Intercom.updateUser(with: userAttributes) { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle error
    }
}
```

If the failure block of the above call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

Custom attributes must be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas) before they can be updated.

You can also set company data by setting an array of `ICMCompany` objects on the `ICMUserAttributes` object, like:

```objectivec
ICMCompany *company = [ICMCompany new];
company.name = @"My Company";
company.companyId = @"abc1234";

ICMUserAttributes *userAttributes = [ICMUserAttributes new];
userAttributes.companies = @[company];
[Intercom updateUser:userAttributes success:^{
    // Handle success
} failure:^(NSError * _Nonnull error) {
   // Handle error
}];
```

```swift
let company = ICMCompany()
company.name = "My Company"
company.companyId = "abc1234"
let userAttributes = ICMUserAttributes()
userAttributes.companies = [company]
Intercom.updateUser(with: userAttributes) { result in
    switch result {
    case .success:
        // Handle success
    case .failure(let error):
        // Handle error
    }
}
```

If the failure block of the above call is executed, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) to help debug the issue.

ID required for Company objects
`id` is a required field for adding or modifying a company.

## Submit an event

```objectivec
+ (void)logEventWithName:(NSString *)name metaData:(NSDictionary *)metaData;
```

```swift
public class func logEvent(withName: String, metaData: [AnyHashable: Any])
```

### Parameters

| Name | Description |
|  --- | --- |
| name | The name of the event you wish to track. |
| metaData | Contains simple types to present to Intercom |


### Usage

You can [log events in Intercom](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Events/data_event/) that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.

```objectivec
[Intercom logEventWithName:@"ordered_item" metaData: @{
    @"order_date": @1392036272,
    @"stripe_invoice": @"inv_3434343434",
    @"order_number": @{
      @"value": @"3434-3434",
      @"url": @"https://example.org/orders/3434-3434"}
 }];
```

```swift
Intercom.logEvent(withName: "ordered_item", metaData:[
            "order_date": 1392036272,
            "stripe_invoice":"inv_3434343434",
            "order_number": [
                "value":"3434-3434",
                "url":"https://example.org/orders/3434-3434"]
            ])
```

## Present Intercom Spaces

```objectivec
+ (void)presentIntercom;
```

```swift
public class func present()
```

Presents the Intercom Messenger.

## Spaces

Spaces are different areas of the messenger that you can open directly. Intercom defines 4 possible spaces:

1. Home
2. Help Center
3. Messages
4. Tickets


These spaces can be presented using:

```objectivec
+ (void)presentIntercom:(Space)space;
```

```swift
public class func present(_ space: Space)
```

## Present Content

There are various `IntercomContent` that you can present. The available types are:

1. Article
2. Survey
3. Carousel
4. Help Center Collections
5. Conversations


You create an `IntercomContent` by passing the content's Id to the respective function. For instance, you create an "article" IntercomContent as follows:

```objectivec
[IntercomContent articleWithId:@"12345"]
```

```swift
Intercom.Content.article(id: "12345")
```

Similarly, you can can create surveys, carousels and help center collections.

You can then present such content using:

```objectivec
[Intercom presentContent:[IntercomContent articleWithId:"12345"]];
```

```swift
Intercom.presentContent(Intercom.Content.article(id: "12345"))
```

Make sure your content is live
Content must be 'live' to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.

You may also present a conversation using the ID.

```objectivec
[Intercom presentContent:[IntercomContent conversationWithId:"12345"]];
```

```swift
Intercom.presentContent(Intercom.Content.conversation(id: "12345"))
```

## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your mobile app. Here's how:

1. [Select the color and language of the Messenger](https://www.intercom.com/help/en/articles/6612589-set-up-and-customize-the-messenger) and how personalize your profiles.
2. Follow the below steps to choose how the launcher appears and opens for your users.


## Choose how the launcher appears and opens for your users

If you'd like the standard launcher to appear on the bottom right-hand side of your screen, just call:

```objectivec
[Intercom setLauncherVisible:YES];
```

```swift
Intercom.setLauncherVisible(true)
```

If you want to set the bottom padding for the Messenger, which dictates how far from the bottom of the screen the default launcher and in-app messages will appear, you can call:

```objectivec
[Intercom setBottomPadding: bottomPadding];
```

```swift
Intercom.setBottomPadding(bottomPadding)
```

## Create a custom launcher

However, if you'd like the Messenger to open from another location in your mobile app, you can create a custom launcher. This allows you to specify a button, link or element that opens the Messenger. For example, you can trigger the launcher to open when a customer taps on your ‘Help and Support' button.

![](/assets/5f86ffe-helpandsupport.75af5e663aed2578a9a7a31ddc829151c0b462ab936913483dd2061f2e848dfb.71a4f21c.png)

If you have a custom launcher, you can call:

```objectivec
[Intercom presentIntercom];
```

```swift
Intercom.present()
```

If you want to open the Messenger to the composer screen with message field pre-populated you can call:

```objectivec
[Intercom presentMessageComposer:@"Message"];
```

```swift
Intercom.presentMessageComposer("Message")
```

## Show your user's unread message count

Now you can show how many unread conversations your user has on your custom launcher. Even if a user dismisses a notification, they'll still have a persistent indicator of unread conversations.

![](/assets/42eef6a-unread_api_ios.b5c2eca813e5684830128c13fd13315ca7e585a8d4e66d2829febe76fa0fce2d.71a4f21c.png)

Just grab the current count with this method:

```objectivec
[Intercom unreadConversationCount];
```

```swift
Intercom.unreadConversationCount()
```

Then, start listening for updates by observing an `NSNotification`

```objectivec
[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(updateUnreadCount:)
         name:IntercomUnreadConversationCountDidChangeNotification
       object:nil];
```

```swift
NotificationCenter.default.addObserver(self, 
                                       selector: #selector(YourClassName.updateUnreadCount(_:)), 
                                           name: NSNotification.Name.IntercomUnreadConversationCountDidChange, 
                                         object: nil)
```

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app, by calling:

```objectivec
[Intercom setInAppMessagesVisible:NO];
```

```swift
Intercom.setInAppMessagesVisible(false)
```

Mobile Carousels and Surveys Visibility
The method `setInAppMessagesVisible` does not apply to Mobile Carousels or Surveys. They will always be displayed.

You can hide any Intercom screen in your app, by calling:

```objectivec
[Intercom hideIntercom];
```

```swift
Intercom.hideIntercom()
```

## Intercom Notifications

Intercom fires a number of Notifications to allow developers to be notified of certain events occurring within their app.

**Messenger Display**
The following notifications are fired during the Messenger presentation and dismissal. For example, when a user receives a new In App message, `IntercomWindowWillShowNotification` will be fired. Once the In App is displayed on screen `IntercomWindowDidShowNotification` will be fired.
If the user taps on that In App message, these notifications will not be fired again as the Intercom window (In App message) is already displayed.

When the user closes the messenger, `IntercomWindowWillHideNotification` and `IntercomWindowDidHideNotification` will be fired. This allows developers to perform certain actions in their app when the Intercom window is closed.

```objectivec
// Listen for Messenger show/hide events
[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(messengerWillShow:)
         name:IntercomWindowWillShowNotification
       object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(messengerDidShow:)
         name:IntercomWindowDidShowNotification
       object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(messengerWillHide:)
         name:IntercomWindowWillHideNotification
       object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(messengerDidHide:)
         name:IntercomWindowDidHideNotification
       object:nil];
```

```swift
// Listen for Messenger show/hide events
NotificationCenter.default.addObserver(self,
                                       selector: #selector(messengerWillShow(_:)),
                                           name: NSNotification.Name.IntercomWindowWillShow,
                                         object: nil)

NotificationCenter.default.addObserver(self,
                                       selector: #selector(messengerDidShow(_:)),
                                           name: NSNotification.Name.IntercomWindowDidShow,
                                         object: nil)

NotificationCenter.default.addObserver(self,
                                       selector: #selector(messengerWillHide(_:)),
                                           name: NSNotification.Name.IntercomWindowWillHide,
                                         object: nil)

NotificationCenter.default.addObserver(self,
                                       selector: #selector(messengerDidHide(_:)),
                                           name: NSNotification.Name.IntercomWindowDidHide,
                                         object: nil)
```

**Starting a New Conversation**
The notification `IntercomDidStartNewConversationNotification` is fired when a new conversation is started. By listening to this notification, developers can perform certain actions in their app like presenting the `Allow Notifications` alert to users so that they can receive push notifications replies to that conversation.

```objectivec
[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(newConversationStarted:)
         name:IntercomDidStartNewConversationNotification
       object:nil];
```

```swift
NotificationCenter.default.addObserver(self,
                                       selector: #selector(newConversationStarted(_:)),
                                           name: NSNotification.Name.IntercomDidStartNewConversation,
                                         object: nil)
```

**Unread Ticket Count Changes**
The notification `IntercomUnreadTicketCountDidChangeNotification` is fired when the number of unread tickets changes.

```objectivec
[[NSNotificationCenter defaultCenter] addObserver:self
     selector:@selector(unreadTicketCountChanged:)
         name:IntercomUnreadTicketCountDidChangeNotification
       object:nil];
```

```swift
NotificationCenter.default.addObserver(self,
                                       selector: #selector(unreadTicketCountChanged(_:)),
                                           name: NSNotification.Name.IntercomUnreadTicketCountDidChange,
                                         object: nil)
```

## Status Bar Style

If you wish to change your status bar's style or visibility while the Intercom Launcher or an Intercom in-app is displayed on screen, you will need to call `[Intercom setNeedsStatusBarAppearanceUpdate]` to ensure that Intercom's window can reflect these changes accordingly.

```objectivec
+ (void)setNeedsStatusBarAppearanceUpdate;
```

```swift
func setNeedsStatusBarAppearanceUpdate()
```

## Enable debug logging

```objectivec
+ (void)enableLogging;
```

```swift
public class func enableLogging()
```

Enable logging for Intercom for iOS. By calling this method, Intercom will display debug information.
*Note* it is recommended to use it only while debugging.

## Set theme override

```objectivec
+ (void)setThemeOverride:(ICMThemeOverride)themeOverride;
```

```swift
public class func setThemeOverride(_ themeOverride: ICMThemeOverride)
```

### Parameters

| Name | Description |
|  --- | --- |
| themeOverride | The theme override to apply. Use ICMThemeOverrideNone to clear the override and use server configuration. |


### Usage

This method allows you to override the server-provided theme setting for the current session only. The theme mode controls whether the SDK displays in light mode, dark mode, or follows the system theme. The theme selection will be reset when the app restarts.

```objectivec
// Enable dark mode
[Intercom setThemeOverride:ICMThemeOverrideDark];

// Enable light mode
[Intercom setThemeOverride:ICMThemeOverrideLight];

// Use system preference
[Intercom setThemeOverride:ICMThemeOverrideSystem];

// Clear override and use server-provided theme
[Intercom setThemeOverride:ICMThemeOverrideNone];
```

```swift
// Enable dark mode
Intercom.setThemeOverride(.dark)

// Enable light mode
Intercom.setThemeOverride(.light)

// Use system preference
Intercom.setThemeOverride(.system)

// Clear override and use server-provided theme
Intercom.setThemeOverride(.none)
```

Theme override options
Available theme override options:

- `ICMThemeOverrideNone` / `.none`: Use server-provided theme setting
- `ICMThemeOverrideLight` / `.light`: Always use light theme
- `ICMThemeOverrideDark` / `.dark`: Always use dark theme
- `ICMThemeOverrideSystem` / `.system`: Follow system theme preference


## FAQ

**Do you support Dark Mode?**
Yes! You can now control the theme mode using the `setThemeOverride` method. The SDK supports light mode, dark mode, system preference, or server-provided theme settings.

## What's next?

Now that you have Intercom configured it's time to:

- [Configure your Help Center](https://developers.intercom.com/installing-intercom/ios/help-center/)
- [Enable Identity Verification](https://developers.intercom.com/installing-intercom/ios/identity-verification/)
- Configure your app for [Push Notifications](https://developers.intercom.com/installing-intercom/ios/push-notifications/).