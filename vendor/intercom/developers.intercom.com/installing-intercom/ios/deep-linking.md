# Deep Linking

Using Intercom you can embed a deep link in your in-app messages, Help Centre articles or as the URI for your push messages. Intercom supports both Universal Links and Custom URL Schemes as a deep link.

## Universal Link

Universal Links support is available from iOS SDK v9.3.0

In order for Intercom to be able to correctly handle a Universal Link from within an in-app message, Help Center article or a push notification, you will first need to specify the domains that these universal links belong to.

In your `Info.plist` add a new entry named **IntercomUniversalLinkDomains** . Then add an array of one or more domains.

![](/assets/754cd40-screenshot_2021-01-28_at_12.27.08.9a487da5cb8570a9fe6b072099b8a6c640117c4cd5a316c907c97593d533b424.71a4f21c.png)

When a user taps on a Universal Link within Intercom, the domain of this link is compared against the list of domains specified in your `Info.plist`. If the domain matches one of these, Intercom then proceeds to call your `application:continueUserActivity:restorationHandler:` method in your `AppDelegate`, passing the URL as the `webpageURL` property on the `NSUserActivity`. This will allow your app to handle this universal link in the same manner as it would handle the link if it is opened outside of your app.

The code sample below shows how you would handle the UTL `https://www.mywebsite.com/profile`
If your app cannot handle a Universal Link, please ensure you return NO/false from this method. This will allow Intercom to open the URL as a regular link in Safari.

```objectivec
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
    NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:userActivity.webpageURL resolvingAgainstBaseURL:YES];
    if ([urlComponents.path isEqualToString:@"/profile"]) {
        [self.mainController pushViewController:[ProfileViewController new] animated:YES];
    } else {
        // Ensure that you return NO if your app cannot handle this Universal Link.
        return NO;
    }
    return YES;
}
```

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        var urlComponents = URLComponents(url: userActivity.webpageURL!, resolvingAgainstBaseURL: true)
        if (urlComponents?.path == "/profile") {
            mainController.pushViewController(SettingsViewController(), animated: true)
        } else {
            return false
        }
        return true
    }
```

## Custom URL Scheme

You will need to set up a deep link in your apps `Info.plist`. iOS supports schemes like `app://page`. Below is an example to that will respond to `app://`

![](/assets/6c2c31c-screen_shot_2017-05-16_at_16.08.06.d225ee988ddc8197dc7ddc54c13101ba90a7a3ac4f76832ce95c2039c0bf038d.71a4f21c.png)

You will then need to implement, `application:openURL:sourceApplication:annotation:` in your app delegate. This is where you can respond to specific schemes. In this case we will push the `SettingsViewController` for the scheme `app://settings`

```objectivec
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    if([[url scheme] isEqualToString:@"app"]){
        if([[url host] isEqualToString:@"settings"]){
            [self.mainController pushViewController:[[SettingsViewController alloc] init] animated:YES];
        }
        return YES;
    }
}
```

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if (url.scheme == "app") {
        if (url.host == "settings") {
            mainController.pushViewController(SettingsViewController(), animated: true)
        }
        return true
    }
}
```

Linking to other apps
Linking to other apps is not supported with the iOS messenger. Your deep links must be for a scheme belonging to your app.

## Linking to your app

Once you have set up your app to respond to a URI, you can send a push message with that as the URI. Tapping the push message will open your app to the specified page.

![](/assets/b16300b-screen_shot_2017-05-16_at_16.01.00.e83035972d5f257bf366b56543ad8aabd621f3998a122c62a3d9ae2372331b71.71a4f21c.png)

You can also add a link to your in-app messages and replies as follows:

![](/assets/c694652-screen_shot_2017-05-16_at_15.46.12.52d2dd041765887c4e7a9837d6633038d2dc4d50c229653851bf44fc220d3e0b.71a4f21c.png)