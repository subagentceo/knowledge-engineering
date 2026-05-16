# Using Intercom

Track who your users are and what they do in your mobile app and customize the Intercom Messenger. Here’s how to configure the Intercom React Native wrapper:

## User Login

You’ll now need to login your users before you can talk to them and track their activity in your app.

There are two type of users that can be created in Intercom: identified and unidentified.

- **Unidentified users**: If your app does not have a login option, like Angry Birds or a flashlight app, you have unidentified users.
- **Identified users**: If users need to login to your app to use it, such as Facebook, Instagram, or Slack, they would be considered identified users.


There are three ways to log users into Intercom that visit your app:

1. Only login unidentified users
2. Only login identified users
3. Login both identified and unidentified users - an example of this is where your app has a login option, but it’s not essential for users to login to use your app, like Google Maps or YouTube.


The option you choose should be informed by the design of your app, namely whether you have a login option.

### Login your unidentified users (visitors)


```javascript
loginUnidentifiedUser: () => Promise<boolean>;
```

## Usage

Login a unidentified user.

This is a user that doesn't have any identifiable information such as a `userId` or `email`.

Login an unidentified user in your application like so:


```javascript
try {
  await Intercom.loginUnidentifiedUser();
} catch (error) {
  // Handle error
}
```

If the call fails, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/react-native/error-codes/) to help debug the issue.

If a request to login a user fails, the underlying native SDK will retry before the Promise is rejected. Furthermore, if all login retries have failed, you can still attempt to call other Intercom methods, as the Intercom SDK will first try to log the user in if previous login attempts have failed.

### Login your identified (logged in) users into Intercom


```javascript
loginUserWithUserAttributes: (params: UserAttributes) => Promise<boolean>;
```

### Parameters

- params : The `UserAttributes` object that contains the user's `email` or `userId`.


### Usage

Login a user with identifiable information.
Valid identifiers are `userId` and `email` which must be set in the UserAttributes object.

You can login your user like this:


```javascript
try {
  await Intercom.loginUserWithUserAttributes({
    email: 'bob@example.com',
    userId: 'bob-123',
  });
} catch (error) {
  // Handle error
}
```

If the call fails, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/react-native/error-codes/) to help debug the issue.

## Register both unidentified (non-logged in) and identified (logged in) users

If you have an app with both unidentified and identified users, you will need to either conditionally choose which registration to call:


```javascript
try {
  if (loggedIn) {
    await Intercom.loginUserWithUserAttributes({
      email: 'bob@example.com',
      userId: 'bob-123',
    });
  } else {
    await Intercom.loginUnidentifiedUser();
  }
} catch (error) {
  // Handle error
}
```

Or you can login with `Intercom.loginUnidentifiedUser()` and if a user signs up/logs in later in your app call `Intercom.loginUserWithUserAttributes`. We will automatically transfer over any attributes or conversations from the unidentified user to the identified user, so you won't lose anything.

### Best practices for logging in users

- It is important to **only** login identified users **after** verification of a login.
- You can provide a userId and/or email when logging in an identified user. We recommend giving all your users unique userIds, but if you haven't implemented this, you should provide an email.
- Don’t use an email address as a userId as this field cannot be changed later. If you choose provide only an email address, the email address must not be associated with any other users on your workspace.


## How to logout an identified user


```javascript
logout(): Promise<boolean>;
```

### Usage

Log a user out of their Intercom session.
This will dismiss any Intercom UI and clear Intercom's local cache.

You should only logout an identified user. Logging out an unidentified user will result in orphan records that cannot be merged in future.

When users want to log out of your app, simply call:


```javascript
try {
  await Intercom.logout();
} catch (error) {
  // Handle error
}
```

> 👍
Intercom knows when your app is backgrounded and comes alive again, so you won’t need to re-register your users.


## Update a user


```javascript
updateUser(userAttributes: UserAttributes): Promise<boolean>;
```

### Parameters

- userAttributes : The `UserAttributes` object with the user data.


### Usage

Update a user in Intercom with data specified in ` UserAttributes`.

You can send any data you like to Intercom from standard user attributes that are common to all Intercom users to custom user attributes that are unique to your app.

Standard user attributes can be updated by calling:


```javascript
try {
  await Intercom.updateUser({
    email: 'bob@example.com',
    userId: 'bob-123',
    name: 'Bob',
    phone: '010-1234-5678',
    languageOverride: 'fr',
    signedUpAt: 1621844451,
    unsubscribedFromEmails: true,
  });
} catch (error) {
  // Handle error
}
```

If the call fails, you can check against our list of [error codes](https://developers.intercom.com/installing-intercom/react-native/error-codes/) to help debug the issue.

Typically our customers see a lot of value in sending custom data that relates to customer development, such as price plan, value of purchases, etc. Custom user attributes must first be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas). They can then be modified by passing in customAttributes object to `updateUser`:


```javascript
Intercom.updateUser({
  customAttributes: {
    monthly_spend: 123,
    paid_subscriber: true,
    team_mates: 3
  }
});
```

You can also set company data on your user with the Company object, like:


```javascript
Intercom.updateUser({
  companies: [{
    createdAt: 1621844451,
    id: 'companyId', // id is a required field for adding or modifying a company.
    monthlySpend: 100,
    name: 'CompanyName',
    plan: "plan",
    customAttributes: {
      city: "New York"
    },
  }],
});
```

## Submit an event


```javascript
logEvent(eventName: string, metaData?: MetaData): Promise<boolean>;
```

### Parameters

- eventName : The name of the event.
- metaData : Metadata Objects support a few simple types that Intercom can present on your behalf.


You can log [events in Intercom](https://developers.intercom.com/intercom-api-reference/reference/event-model) that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.


```javascript
Intercom.logEvent('order-item', {itemId:'item-1', orderDate:"1392036272"})
```

## Present Intercom Spaces

Spaces are different areas of the messenger that you can open directly. Intercom defines 3 possible spaces:

1. Home
2. Help Center
3. Messages


These spaces can be presented by:


```javascript
present(): Promise<boolean>;
```

### Usage

Present Intercom as a modal overlay in your app.
The `Home` space is displayed by default.


```javascript
Intercom.present();
```

If you want to present to a specific space


```javascript
presentSpace(space: Space): Promise<boolean>;
```

### Parameters

- space : The Intercom `Space` to be presented.


### Usage

Present an Intercom `space` as a modal overlay in your app


```javascript
Intercom.presentSpace(Space.home);
```

This opens Intercom and displays Home space.

Similarly, you can present HelpCenter and Messages by passing the respective `Space`.

## Present Intercom Content


```javascript
presentContent(content: Content): Promise<boolean>;
```

### Parameters

- content : An `IntercomContent` object.


### Usage

Present Intercom content.

here are various `IntercomContent` that you can present. The available types are:

1. Article
2. Survey
3. Carousel
4. HelpCenterCollections
5. Conversation via ID


To present an Intercom content you create the respective `IntercomContent` object and then call `presentContent` with that object

For instance, you create an "article" IntercomContent as follows:


```javascript
IntercomContent.articleWithArticleId('123456')
```

Similarly, you can can create surveys, carousels and help center collections.

You can then present such content using:


```javascript
Intercom.presentContent(
      IntercomContent.articleWithArticleId('123456')
);
```

Or, you can present a conversation using conversation ID:


```
Intercom.presentContent(
      IntercomContent.conversationWithId('123456')
);
```

> 🚧 Make sure your content is live
A content must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your mobile app. Here’s how:

- [Select the color and language of the Messenger](https://www.intercom.com/help/en/articles/6612589-set-up-and-customize-the-messenger) and how personalize your profiles.
- Follow the below steps to choose how the launcher appears and opens for your users.


### Set the Theme Mode

You can control whether the Intercom Messenger appears in light mode, dark mode, or follows the system theme setting:


```javascript
setThemeMode(themeMode: ThemeMode): Promise<boolean>;
```

#### Parameters

- themeMode : The theme mode to set. Available options are:
  - `ThemeMode.LIGHT` - Always use light theme
  - `ThemeMode.DARK` - Always use dark theme
  - `ThemeMode.SYSTEM` - Follow the device's system theme setting


#### Usage

This allows you to override the server-provided theme setting for the current session only. The theme selection will be reset when the app restarts.


```javascript
import Intercom, { ThemeMode } from '@intercom/intercom-react-native';

// Set to dark mode
Intercom.setThemeMode(ThemeMode.DARK);

// Set to light mode
Intercom.setThemeMode(ThemeMode.LIGHT);

// Follow system theme
Intercom.setThemeMode(ThemeMode.SYSTEM);
```

> 📌 **Note**
The theme mode setting is session-based and will revert to the default (server-provided) theme when the app restarts.


## Choose how the launcher appears and opens for your users

If you’d like the standard launcher to appear on the bottom right-hand side of your screen, just call:


```javascript
Intercom.setLauncherVisibility(Visibility.VISIBLE)
```

If you want to set the bottom padding for the Messenger, which dictates how far from the bottom of the screen the default launcher and in-app messages will appear, you can call:


```javascript
Intercom.setBottomPadding(120)
```

## Create a custom launcher

However, if you’d like the Messenger to open from another location in your mobile app, you can create a custom launcher. This allows you to specify a button, link or element that opens the Messenger. For example, you can trigger the launcher to open when a customer clicks on your ‘Help and Support’ button.

![](/assets/5f86ffe-helpandsupport.75af5e663aed2578a9a7a31ddc829151c0b462ab936913483dd2061f2e848dfb.71a4f21c.png)

If you have a custom launcher, you can call `Intercom.present();`


```javascript
<Button title="Open Intercom Messenger" onPress={()=>{Intercom.present();}}/>
```

If you want to open the Messenger to the composer screen with message field pre-populated you can call:


```javascript
Intercom.presentMessageComposer("Message")
```

You can also open the composer without pre-populated text:


```javascript
Intercom.presentMessageComposer()
```

## Show your user’s unread message count

Grab the current count with this method:


```javascript
Intercom.getUnreadConversationCount()
```

Then, start listening for updates using:


```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';

useEffect(() => {
    // Bootstrap Intercom event listeners
    const cleanupIntercomEventListeners = Intercom.bootstrapEventListeners();
    
    const eventEmitter = new NativeEventEmitter(NativeModules.IntercomEventEmitter);
    
    // Listen to unread conversation count changes
    const countListener = eventEmitter.addListener(
      IntercomEvents.IntercomUnreadCountDidChange,
      (response) => {
        setCount(response.count as number);
      }
    );

    return () => {
      countListener.remove();
      cleanupIntercomEventListeners();
    };
  }, []);
```

## Event Listeners

The React Native SDK provides several event listeners to notify your app of Intercom events. To use event listeners, you must first bootstrap the event system and then create a direct `NativeEventEmitter`.

### Available Events

- `IntercomEvents.IntercomUnreadCountDidChange` - Fired when the unread conversation count changes
- `IntercomEvents.IntercomWindowDidShow` - Fired when the Intercom Messenger is displayed (iOS only)
- `IntercomEvents.IntercomWindowDidHide` - Fired when the Intercom Messenger is dismissed (iOS only)


### Setup Requirements


```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';
import Intercom, { IntercomEvents } from '@intercom/intercom-react-native';
```

### Usage Examples

**Listen for conversation unread count changes:**


```javascript
useEffect(() => {
  // Bootstrap Intercom event listeners
  const cleanupIntercomEventListeners = Intercom.bootstrapEventListeners();
  
  const eventEmitter = new NativeEventEmitter(NativeModules.IntercomEventEmitter);
  
  const unreadCountListener = eventEmitter.addListener(
      IntercomEvents.IntercomUnreadCountDidChange,
      (response) => {
        console.log('Intercom conversation unread count changed', response.count);
      }
    )
    
  return () => {
    unreadCountListener.remove();
    cleanupIntercomEventListeners();
  };
}, []);
```

**Listen for Messenger show/hide events:**


```javascript
useEffect(() => {
  // Bootstrap Intercom event listeners
  const cleanupIntercomEventListeners = Intercom.bootstrapEventListeners();
  
  const eventEmitter = new NativeEventEmitter(NativeModules.IntercomEventEmitter);

  const showListener = eventEmitter.addListener(
    IntercomEvents.IntercomWindowDidShow,
    () => {
      console.log('Intercom Messenger opened');
      // Perform actions when Messenger opens
    }
  );

  const hideListener = eventEmitter.addListener(
    IntercomEvents.IntercomWindowDidHide,
    () => {
      console.log('Intercom Messenger closed');
      // Perform actions when Messenger closes
    }
  );

  return () => {
    showListener.remove();
    hideListener.remove();
    cleanupIntercomEventListeners();
  };
}, []);
```

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app, by calling:


```javascript
Intercom.setInAppMessageVisibility(Visibility.GONE)
```

You can hide any Intercom screen in your app, by calling:


```javascript
Intercom.hideIntercom();
```

## What's next?

Now that you have Intercom configured it's time to:

- [Configure your Help Center](https://developers.intercom.com/installing-intercom/docs/react-native-help-center)
- [Enable Identity Verification](https://developers.intercom.com/installing-intercom/docs/react-native-identity-verification)
- Configure your app for [Push Notifications](https://developers.intercom.com/installing-intercom/docs/react-native-push-notifications)
- Review the list of [Error Codes](https://developers.intercom.com/installing-intercom/react-native/error-codes/) for debugging API call failures.