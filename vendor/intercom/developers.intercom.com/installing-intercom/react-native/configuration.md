# Configuration

This guide covers how to configure and use Intercom features in your React Native app. Before proceeding, make sure you've completed the [installation guide](/installing-intercom/react-native/installation) which covers both automatic and manual initialization options.

## Update a user

You can send any data you like to Intercom from standard user attributes that are common to all Intercom users to custom user attributes that are unique to your app.

Standard user attributes can be updated by calling:


```javascript
Intercom.updateUser({
  email: 'bob@example.com',
  userId: 'bob-123',
  name: 'Bob',
  phone: '010-1234-5678',
  languageOverride: 'fr',
  signedUpAt: 1621844451,
  unsubscribedFromEmails: true,
});
```

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

## Set Auth Tokens for Data Connectors

If you're using [Data Connectors](https://www.intercom.com/help/en/articles/6615543-setting-up-data-connectors-authentication) (e.g., Fin Actions) that require authentication, you can provide tokens that will be passed in the `Authorization` header when making API requests.

> 📘 Note: This is **separate from** `setUserJwt()` which is for [Messenger Security](https://developers.intercom.com/installing-intercom/docs/react-native-secure-your-messenger). `setAuthTokens()` is specifically for authenticating Data Connector requests.


First, create your authentication keys in your [Intercom workspace settings](https://www.intercom.com/a/apps/_/settings/app-settings/authentication).

Then, call `setAuthTokens()` after user login with your tokens:


```javascript
Intercom.setAuthTokens({
  security_token: "your_token_here"
});
```

You can provide multiple tokens at once:


```javascript
Intercom.setAuthTokens({
  security_token: "token_for_api_1",
  another_token: "token_for_api_2"
});
```

## Submit an event

You can log [events in Intercom](https://developers.intercom.com/intercom-api-reference/reference/event-model) that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.


```javascript
Intercom.logEvent('order-item', {itemId:'item-1', orderDate:"1392036272"})
```

## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your mobile app. Here’s how:

- [Select the color and language of the Messenger](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-basics) and how personalize your profiles.
- Follow the below steps to choose how the launcher appears and opens for your users.


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

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app, by calling:


```javascript
Intercom.setInAppMessageVisibility(Visibility.GONE)
```

> 📘 Mobile Carousels Visibility
The method *setInAppMessageVisibility* does not apply to Mobile Carousels. They will always be displayed.


You can hide any Intercom screen in your app, by calling:


```javascript
Intercom.hideIntercom();
```

## Present a Carousel Programmatically

To present a Carousel, pass in a carouselId from your Intercom workspace to the following method:


```javascript
let carouselContent = IntercomContent.carouselWithCarouselId(carouselId)
Intercom.presentContent(carouselContent)
```

> 🚧 Make sure your carousel is live
A carousel must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Present a Survey Programmatically

To present a Survey, pass in a surveyId from your Intercom workspace to the following method:


```javascript
let surveyContent = IntercomContent.surveyWithSurveyId(surveyId)
Intercom.presentContent(surveyContent)
```

> 🚧 Make sure your survey is live
A survey must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## What's next?

Now that you have Intercom configured it's time to:

- [Configure your Help Center](https://developers.intercom.com/installing-intercom/docs/react-native-help-center)
- [Enable Identity Verification](https://developers.intercom.com/installing-intercom/docs/react-native-identity-verification)
- Configure your app for [Push Notifications](https://developers.intercom.com/installing-intercom/docs/react-native-push-notifications)