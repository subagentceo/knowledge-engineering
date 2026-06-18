# Configuration

Track who your users are and what they do in your mobile app and customize the Intercom Messenger. Here’s how to configure Intercom for Cordova/Phonegap:

## Update a user

You can send any data you like to Intercom from [standard user attributes](https://docs.intercom.com/intercom-s-key-features-explained/tracking-user-data/tracking-user-data-in-intercom#standard-user-attributes) that are common to all Intercom users to custom user attributes that are unique to your app.

Standard user attributes such as a user's name or email address can be updated by calling:

```javascript
intercom.updateUser({ email: "bob@example.com", name: "Bob" });
```

Typically our customers see a lot of value in sending custom data that relates to customer development, such as price plan, value of purchases, etc. Custom user attributes must first be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas). They can then be modified by passing a custom_attributes map. A detailed description of the [user model is available here](https://developers.intercom.com/reference#user-model).

```javascript
intercom.updateUser({
    custom_attributes: {
        paid_subscriber : true,
        monthly_spend: 155.5,
        team_mates: 3
    }
});
```

> 📘
- Custom attributes must be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas) before they can be updated.



You can also set company data by submitting an attribute map, like:

```javascript
intercom.updateUser({
    companies: [
        {
            name : "My company",
            company_id: "abcd1234"
        }
    ]
});
```

> 📘
- **id** is a required field for adding or modifying a company.
- A detailed description of the company model is available **[here](https://developers.intercom.com/reference#company-model)**.



## Submit an event

You can [log events in Intercom ](https://developers.intercom.com/reference#events)that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.

```javascript
intercom.logEvent("ordered_item", {
    order_date: 1392036272,
    stripe_invoice: "inv_3434343434",
    order_number: 123
    value: "3434-3434",
    url: "https://example.org/orders/3434-3434"
});
```

You’ll find more details about how events work and how to submit them [here](https://developers.intercom.com/reference#events).

## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your product, site or mobile app. Here’s how:

- [Select the color and language of the Messenger](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-basics) and how personalize your profiles.
- Follow the below steps to choose how the launcher appears and opens for your users.


## Choose how the launcher appears and opens for your users

If you’d like the standard launcher to appear on the bottom right-hand side of your screen, just call:

```javascript
intercom.setLauncherVisibility('VISIBLE');
```

## Create a custom launcher

However, if you’d like the Messenger to open from another location in your mobile app, you can create a custom launcher. This allows you to specify a button, link or element that opens the Messenger. For example, you can trigger the launcher to open when a customer clicks on your ‘Help and Support’ button.

![](/assets/78599e4-helpandsupport.75af5e663aed2578a9a7a31ddc829151c0b462ab936913483dd2061f2e848dfb.71a4f21c.png)

If you have a custom launcher, you can call:

```javascript
intercom.displayMessenger();
```

If you want to open the Messenger to the composer screen with message field pre-populated you can call:

```javascript
intercom.displayMessageComposer("Message");
```

## Show your user’s unread message count

Now you can show how many unread conversations your user has on your custom launcher. Even if a user dismisses a notification, they’ll still have a persistent indicator of unread conversations.

![](/assets/9910f65-unread_api_ios.b5c2eca813e5684830128c13fd13315ca7e585a8d4e66d2829febe76fa0fce2d.71a4f21c.png)

Just grab the current count with this method:

```javascript
intercom.unreadConversationCount();
```

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app by calling:

```javascript
intercom.setInAppMessageVisibility('GONE');
```

You can hide the Intercom Messenger in your app by calling:

```javascript
intercom.hideMessenger();
```

## Articles Help Center

From version 6.0.0 of the Cordova plugin we support opening up your Articles Help Center.

[https://www.intercom.com/help/en/articles/56660-resources-to-help-with-educating-your-customers](https://www.intercom.com/help/en/articles/56660-resources-to-help-with-educating-your-customers).

To open up the Help Center simply call `intercom.displayHelpCenter()` and we will display a view with your Help Center content in it.

> 🚧 Make sure Help Center is turned on
If you don't have Help Center enabled in your Intercom settings the method `displayHelpCenter` will log an error and not open. To enable your Help Center please go [here](https://app.intercom.com/a/apps/_/educate/site/settings) and click the "Turn On Help Center" button.


## Present an Article Programmatically

From version 9.3.0 of the Cordova plugin you can programmatically display an Article. To display an Article, pass in an articleID from your Intercom workspace to the following method:

```javascript
intercom.displayArticle(“123456”);
```

> 🚧 Make sure your article is live
An article must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Present a Carousel Programmatically

From version 9.3.0 of the Cordova plugin you can programmatically display a Carousel. To display a Carousel, pass in a carouselID from your Intercom workspace to the following method:

```javascript
intercom.displayCarousel(“123456”);
```

> 🚧 Make sure your carousel is live
A carousel must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Present a Survey Programmatically

From version 12.1.0 of the Cordova plugin you can programmatically display a Survey. To display a Survey, pass in a surveyID from your Intercom workspace to the following method:

```javascript
intercom.displaySurvey(“123456”);
```

> 🚧 Make sure your survey is live
A survey must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


# What's next?

Now that you have Intercom configured you can:

- Enable Secure Mode for Cordova.
- [Configure Push Notifications](https://developers.intercom.com/installing-intercom/docs/cordova-phonegap-push-notifications) for Cordova/Phonegap