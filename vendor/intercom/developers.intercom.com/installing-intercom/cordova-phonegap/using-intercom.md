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

```javascript
loginUnidentifiedUser: function(options, success, error)
```

## Parameters

| Name | Description |
|  --- | --- |
| options | Can be ignored. |
| success | A success callback with no parameters. |
| error | An error callback with an error parameter. |


You must call one of the user login methods in order to start communicating with Intercom.

### Usage

If you call `loginUnidentifiedUser`, all activity will be tracked anonymously. If you choose to subsequently identify that user, all that anonymous activity will be merged into the identified user. This means that you will no longer see the anonymous user in Intercom, but rather the identified one.

We recommend this is called from within the application delegate's `onDeviceReady:` function.

Just login as an unidentified user like so:

```javascript
onDeviceReady: function() {
    var onSuccess = function() {
        console.log('Successfully logged in to Intercom!');
    }
    var onError = function(code) {
        console.log('Failed to login to Intercom :' + code);
    }
    intercom.loginUnidentifiedUser({}, onSuccess, onError);
}
```

If a request to login a user fails, it will be retried before calling the failure callback. Furthermore if all login retries have failed, you can still attempt to call other Intercom methods, as the Intercom SDK will first try to log the user in if previous login attempts have failed. The success and failure callbacks are also optional, so `null` can be passed to them in scenarios where you're not interested in their outcome.

## Login only identified (logged in) users

If people must log in to access your app (as in with Facebook, Instagram or Slack) you should follow these instructions to login identified users to Intercom only.

```javascript
loginUserWithUserAttributes: function(options, success, error)
```

### Parameters

| Name | Description |
|  --- | --- |
| options | An object that contains either the user's `email` or `userId` Its also possible to set both `email` and `userId`. |
| success | A success callback with no parameters. |
| error | An error callback with an error parameter. |


### Usage

In order to keep track of a specific user, you must identify it with a unique user identity, an email address, or both. To provide these, you must first create a new object and then populate the `email` and/or `userId` properties for that object. This is a userId, supplied by you (e.g. from an existing web service for your product) to represent your user in Intercom, once set it cannot be changed.

As well as the `email` and `userId` fields, you can populate the other user attributes when you login as an identified user. By supplying information like this, Intercom provides richer user profiles for your users.

### Best practices for logging in users

- It is important to *only* login identified users to Intercom *after* verification of a login
- We recommend giving all your users unique userIds, but if you haven't implemented this, you should create an object and only set the `email` property instead of the `userId` . Do not use an email address as a userId as this field cannot be changed later. If you choose to login a user with just an email, the email address must not be associated with any other users on your workspace.


1. First, you'll need to log your user into Intercom when your app launches, like this:


```javascript
onDeviceReady: function() {
    var onSuccess = function() {
        console.log('Successfully logged in to Intercom!');
    }
    var onError = function(code) {
        console.log('Failed to login to Intercom :' + code);
    }
    intercom.loginUserWithUserAttributes({userId: "12345"}, onSuccess, onError);
}
```

If you don't have a unique userId to use here, you can create an object and just set the `email` property. Similarly, if you have both a userId and an email, you can set both the `userId` and `email` attributes of the object.

1. You'll also need to log your users into Intercom anywhere they login to your app:


```javascript
successfulLogin: function() {
    var onSuccess = function() {
        console.log('Successfully logged in to Intercom!');
    }
    var onError = function(code) {
        console.log('Failed to login to Intercom :' + code);
    }
    var userAttributes = {email: "sample-email@test.com", userId: "12345"}
    intercom.loginUserWithUserAttributes(userAttributes, onSuccess, onError);
}
```

### Login both unidentified (non-logged in) and identified (logged in) users

If you have an app with both unidentified and identified users (like Google Maps or YouTube), follow these instructions.

### Best practices for logging in users

- It is important to *only* login identified users to Intercom *after* verification of login to your app
- We recommend giving all your users unique userIds, but if you haven't implemented this, you should create an `ICMUserAttributes` object and only populate the `email` property instead of populating the `userId` . Do not use an email address as a userId as this field cannot be changed later. If you choose to login a user with just an email, the email address must not be associated with any other users on your workspace.


1. First, you'll need to log your users into Intercom when your app launches, like this:


```javascript
onDeviceReady: function() {
     var onSuccess = function() {
        console.log('Successfully logged in to Intercom!');
    }
    var onError = function(code) {
        console.log('Failed to login to Intercom :' + code);
    }
    if (loggedIn) {
        intercom.loginUserWithUserAttributes({userId: "12345"}, onSuccess, onError);
    } else {
        intercom.loginUnidentifiedUser({}, onSuccess, onError);
    }
}
```

If you don't have a unique userId to use here, you can create an object and just set the `email` property. Similarly, if you have both a userId and an email, you can set both the `userId` and `email` attributes of the object.

1. You'll also need to log your users into Intercom anywhere they login to your app:


```javascript
successfulLogin: function() {
    var onSuccess = function() {
        console.log('Successfully logged in to Intercom!');
    }
    var onError = function(code) {
        console.log('Failed to login to Intercom :' + code);
    }
    var userAttributes = {email: "sample-email@test.com", userId: "12345"}
    intercom.loginUserWithUserAttributes(userAttributes, onSuccess, onError);
}
```

## How to log out an identified user

You should only log out an identified user. Logging out an unidentified user will result in orphan records that cannot be merged in future.

When users want to log out of your app simply call:

```javascript
logout: function() {
    intercom.logout();
}
```

## Update a user

```javascript
updateUser: function(attributes, success, error)
```

### Parameters

| Name | Description |
|  --- | --- |
| attributes | The attributes to update the user with. |
| success | A nullable success callback with no parameters. |
| error | An error callback with an error parameter. |


### Usage

You can send any data you like to Intercom. Typically our customers see a lot of value in sending data that relates to customer development, such as price plan, value of purchases, etc. Once these have been sent to Intercom you can then apply filters based on these attributes.

You can send any data you like to Intercom from standard user attributes that are common to all Intercom users to custom user attributes that are unique to your app.

```javascript
    var onSuccess = function() {
        console.log('Successfully updated user!');
    }
    var onError = function(code) {
        console.log('Failed to update user :' + code);
    }
    var userAttributes = {email: "bob@example.com", userId: "12345", name: "Bob Smith"}
    intercom.updateUser(userAttributes, onSuccess, onError);
```

Typically our customers see a lot of value in sending custom data that relates to customer development, such as price plan, value of purchases, etc. Custom user attributes must first be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas). They can then be modified by setting the `customAttributes` on the attributes object.

```javascript
    var onSuccess = function() {
        console.log('Successfully updated user!');
    }
    var onError = function(code) {
        console.log('Failed to update user :' + code);
    }
    var userAttributes = {
        "custom_attributes":{
            "paid_subscriber":true,
            "monthly_spend":155.5,
            "team_mates":3
        }
    }
    intercom.updateUser(userAttributes, onSuccess, onError);
```

Custom attributes must be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas) before they can be updated.

You can also set company data by setting an array of company objects on the user attributes object, like:

```javascript
{
    var onSuccess = function() {
        console.log('Successfully updated user!');
    }
    var onError = function(code) {
        console.log('Failed to update user :' + code);
    }
    var userAttributes = {
        "companies":[{
            "createdAt":1621844451,
            "id":"companyId",
            "monthlySpend":100,
            "name":"CompanyName",
            "plan":"plan",
            "customAttributes":{
                "city":"New York"
            }
        }]
    }
    intercom.updateUser(userAttributes, onSuccess, onError);
}
```

ID required for Company objects
`id` is a required field for adding or modifying a company.

## Submit an event

```javascript
logEvent: function(eventName, metaData, success, error)
```

### Parameters

| Name | Description |
|  --- | --- |
| eventName | The name of the event you wish to track. |
| metaData | Contains simple types to present to Intercom |


### Usage

You can [log events in Intercom](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Events/data_event/) that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.

```javascript
var eventMetaData = {
   "order_date":1392036272,
   "stripe_invoice":"inv_3434343434",
   "order_number":{
      "value":"3434-3434",
      "url":"https://example.org/orders/3434-3434"
   }
}
intercom.logEvent("order-item", eventMetaData), {}, {});
```

## Present Intercom Spaces

```javascript
present: function(success, error)
```

Presents the Intercom Messenger. Calling this method presents the default `Home` space.

## Spaces

Spaces are different areas of the messenger that you can open directly. Intercom defines 4 possible spaces:

1. Home
2. Help Center
3. Messages
4. Tickets


These spaces can be presented using:

```javascript
 presentSpace: function(space, success, error)
```

### Usage

```javascript
//Present Help Center
intercom.presentSpace(intercom.space.HelpCenter);

//Present Messages screen
intercom.presentSpace(intercom.space.Messages);

//Present Tickets
intercom.presentSpace(intercom.space.Tickets);
```

## Present Content

There are various `IntercomContent` that you can present. The available types are:

1. Article
2. Survey
3. Carousel
4. Help Center Collections
5. Conversations


Content can be presented using:

```javascript
 presentContent: function(content, success, error)
```

### Usage

You create and present an Intercom Content object by passing the content's Id to the respective function.

```javascript
//Present a carousel
var carousel = intercomContent.carouselWithCarouselId("1234")
intercom.presentContent(carousel)

//Present an article
var article = intercomContent.articleWithArticleId("5678")
intercom.presentContent(article)

//Present an survey
var survey = intercomContent.surveyWithSurveyId("5678")
intercom.presentContent(survey)

//Present an converation
var converation = intercomContent.conversationWithConversationId("5678")
intercom.presentContent(converation)

//Present a list of collections in the Help Center
var collectionIds = ["23434", "7676"];                  
var helpCenterCollections = intercomContent.helpCenterCollectionsWithIds(collectionIds)
intercom.presentContent(helpCenterCollections)
```

Make sure your content is live
Content must be 'live' to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.

## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your mobile app. Here's how:

1. [Select the color and language of the Messenger](https://www.intercom.com/help/en/articles/6612589-set-up-and-customize-the-messenger) and how personalize your profiles.
2. Follow the below steps to choose how the launcher appears and opens for your users.


## Choose how the launcher appears and opens for your users

If you'd like the standard launcher to appear on the bottom right-hand side of your screen, just call:

```javascript
intercom.setLauncherVisibility('VISIBLE');
```

If you want to set the bottom padding for the Messenger, which dictates how far from the bottom of the screen the default launcher and in-app messages will appear, you can call:

```javascript
intercom.setBottomPadding(20);
```

## Create a custom launcher

However, if you'd like the Messenger to open from another location in your mobile app, you can create a custom launcher. This allows you to specify a button, link or element that opens the Messenger. For example, you can trigger the launcher to open when a customer taps on your ‘Help and Support' button.

![](/assets/5f86ffe-helpandsupport.75af5e663aed2578a9a7a31ddc829151c0b462ab936913483dd2061f2e848dfb.71a4f21c.png)

If you have a custom launcher, you can call:

```javascript
intercom.present()
```

If you want to open the Messenger to the composer screen with message field pre-populated you can call:

```javascript
intercom.presentMessageComposer("Message")
```

## Show your user's unread message count

Now you can show how many unread conversations your user has on your custom launcher. Even if a user dismisses a notification, they'll still have a persistent indicator of unread conversations.

![](/assets/42eef6a-unread_api_ios.b5c2eca813e5684830128c13fd13315ca7e585a8d4e66d2829febe76fa0fce2d.71a4f21c.png)

Just grab the current count with this method:

```
var numberOfUnreadConversations = intercom.unreadConversationCount()
```

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app, by calling:

```javascript
intercom.setInAppMessageVisibility('GONE');
```

Mobile Carousels and Surveys Visibility
The method `setInAppMessageVisibility` does not apply to Mobile Carousels or Surveys. They will always be displayed.

You can hide any Intercom screen in your app, by calling:

```javascript
intercom.hideIntercom();
```

## FAQ

**Do you support Dark Mode?**
Not yet.

## What's next?

Now that you have Intercom configured it's time to:

- [Configure your Help Center](https://developers.intercom.com/installing-intercom/cordova-phonegap/help-center/)
- [Enable Identity Verification](https://developers.intercom.com/installing-intercom/cordova-phonegap/identity-verification/)
- Configure your app for [Push Notifications](https://developers.intercom.com/installing-intercom/cordova-phonegap/push-notifications/).