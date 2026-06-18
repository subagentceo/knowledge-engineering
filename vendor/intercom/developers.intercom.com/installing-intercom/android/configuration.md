# Configuration

Track who your users are and what they do in your mobile app and customize the Intercom Messenger. Here’s how to configure Intercom for Android:

## Update a user

You can send any data you like to Intercom from standard user attributes that are common to all Intercom users to custom user attributes that are unique to your app.

The complete list of standard user attributes that can be updated are described in the UserAttributes object. Standard user attributes such as a user's name or email address can be updated by calling:

```Kotlin
val userAttributes = UserAttributes.Builder()
        .withName("Bob")
        .withEmail("bob@example.com")
        .build()
Intercom.client().updateUser(
            userAttributes = userAttributes,
            intercomStatusCallback = object : IntercomStatusCallback {
                override fun onSuccess() {
                    // Handle success
                }

                override fun onFailure(intercomError: IntercomError) {
                    // Handle failure
                }
            }
        )
```

```Java
UserAttributes userAttributes = new UserAttributes.Builder()
        .withName("Bob")
        .withEmail("bob@example.com")
        .build();
Intercom.client().updateUser(userAttributes, new IntercomStatusCallback() {
            @Override
            public void onSuccess() {
                // Handle success
            }

            @Override
            public void onFailure(@NonNull IntercomError intercomError) {
                // Handle failure
            }
        });
```

Typically our customers see a lot of value in sending custom data that relates to customer development, such as price plan, value of purchases, etc. Custom user attributes must first be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas). They can then be modified by calling withCustomAttribute(key, value) on the UserAttributes object.

```Kotlin
val userAttributes = UserAttributes.Builder()
        .withCustomAttribute("paid_subscriber", "Yes")
        .withCustomAttribute("monthly_spend", 155.5)
        .withCustomAttribute("team_mates", 3)
        .build()
Intercom.client().updateUser(
            userAttributes = userAttributes,
            intercomStatusCallback = object : IntercomStatusCallback {
                override fun onSuccess() {
                    // Handle success
                }

                override fun onFailure(intercomError: IntercomError) {
                    // Handle failure
                }
            }
        )
```

```Java
UserAttributes userAttributes = new UserAttributes.Builder()
        .withCustomAttribute("paid_subscriber", "Yes")
        .withCustomAttribute("monthly_spend", 155.5)
        .withCustomAttribute("team_mates", 3)
        .build();
Intercom.client().updateUser(userAttributes, new IntercomStatusCallback() {
            @Override
            public void onSuccess() {
                // Handle success
            }

            @Override
            public void onFailure(@NonNull IntercomError intercomError) {
                // Handle failure
            }
        });
```

> 📘
- Custom attributes must be created in Intercom using one of the methods described [here](https://www.intercom.com/help/en/articles/179-create-and-track-custom-data-attributes-cdas) before they can be updated.



You can also set company data on your user with the Company object, like:

```Kotlin
val company = Company.Builder()
        .withName("My Company")
        .withCompanyId("abc1234")
        .build()
val userAttributes = UserAttributes.Builder()
        .withCompany(company)
        .build()
Intercom.client().updateUser(
            userAttributes = userAttributes,
            intercomStatusCallback = object : IntercomStatusCallback {
                override fun onSuccess() {
                    // Handle success
                }

                override fun onFailure(intercomError: IntercomError) {
                    // Handle failure
                }
            }
        )
```

```Java
Company company = new Company.Builder()
        .withName("My Company")
        .withCompanyId("abc1234")
        .build();
UserAttributes userAttributes = new UserAttributes.Builder()
        .withCompany(company)
        .build();
Intercom.client().updateUser(userAttributes, new IntercomStatusCallback() {
            @Override
            public void onSuccess() {
                // Handle success
            }

            @Override
            public void onFailure(@NonNull IntercomError intercomError) {
                // Handle failure
            }
        });
```

> 📘
- **id** is a required field for adding or modifying a company.
- The Company object describes all the standard attributes you can modify.



## Submit an event

You can [log events in Intercom ](https://developers.intercom.com/intercom-api-reference/reference/event-model)that record what users do in your app and when they do it. For example, you could record the item a user ordered from your mobile app, and when they ordered it.

```Kotlin
val eventData = mapOf(
    "order_date" to "1392036272",
    "stripe_invoice" to "38572984"
)
Intercom.client().logEvent("sent_invitation", eventData)
```

```Java
Map<String, Object> eventData = new HashMap<>();
eventData.put("order_date", "1392036272");
eventData.put("stripe_invoice", "38572984");
Intercom.client().logEvent("sent_invitation", eventData);
```

You’ll find more details about how events work and how to submit them [here](https://developers.intercom.com/intercom-api-reference/reference/event-model).

## Customize the Intercom Messenger

We definitely recommend that you customize the Intercom Messenger so that it feels completely at home on your product, site or mobile app. Here’s how:

- [Select the color and language of the Messenger](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-basics) and how personalize your profiles.
- Follow the below steps to choose how the launcher appears and opens for your users.


## Choose how the launcher appears and opens for your users

If you’d like the standard launcher to appear on the bottom right-hand side of your screen, just call:

```Kotlin
Intercom.client().setLauncherVisibility(Visibility.VISIBLE)
```

```Java
Intercom.client().setLauncherVisibility(Visibility.VISIBLE);
```

If you want to set the bottom padding for the Messenger, which dictates how far from the bottom of the screen the default launcher and in-app messages will appear, you can call:

```Kotlin
Intercom.client().setBottomPadding(int bottomPadding)
```

```Java
Intercom.client().setBottomPadding(int bottomPadding);
```

## Create a custom launcher

However, if you’d like the Messenger to open from another location in your mobile app, you can create a custom launcher. This allows you to specify a button, link or element that opens the Messenger. For example, you can trigger the launcher to open when a customer clicks on your ‘Help and Support’ button.

![](/assets/4dfc348-helpandsupport.75af5e663aed2578a9a7a31ddc829151c0b462ab936913483dd2061f2e848dfb.71a4f21c.png)

If you have a custom launcher, you can call:

```Kotlin
Intercom.client().displayMessenger()
```

```Java
Intercom.client().displayMessenger();
```

Then we’ll ensure the Messenger opens in the best place for each user.

For example:

- If a user has one unread conversation, we open that conversation.
- If a user has no conversations, we open the composer.
- If a user has more than one unread conversation, we open the conversations list.
- If a user has no unread conversations, we open the last screen they were on when they closed it.


If you want to open the Messenger to the composer screen with message field pre-populated you can call:

```Kotlin
Intercom.client().displayMessageComposer("Message")
```

```Java
Intercom.client().displayMessageComposer("Message");
```

## Show your user’s unread message count

Now you can show how many unread conversations your user has on your custom launcher. Even if a user dismisses a notification, they’ll still have a persistent indicator of unread conversations.

![](/assets/6036b92-unread_api_ios.b5c2eca813e5684830128c13fd13315ca7e585a8d4e66d2829febe76fa0fce2d.71a4f21c.png)

Just grab the current count with this method:

```Kotlin
Intercom.client().getUnreadConversationCount()
```

```Java
Intercom.client().getUnreadConversationCount();
```

Then, start listening for updates using:

```Kotlin
Intercom.client().addUnreadConversationCountListener(listener)
```

```Java
Intercom.client().addUnreadConversationCountListener(listener);
```

## Temporarily hide notifications

You can prevent in app messages from popping up in certain parts of your app by calling:

```Kotlin
Intercom.client().setInAppMessageVisibility(Visibility.GONE)
```

```Java
Intercom.client().setInAppMessageVisibility(Visibility.GONE);
```

> 📘 Mobile Carousels Visibility
The method *setInAppMessageVisibility* does not apply to Mobile Carousels. They will always be displayed.


You can hide any Intercom screen in your app, by calling:

```Kotlin
Intercom.client().hideIntercom()
```

```Java
Intercom.client().hideIntercom();
```

## Present a Carousel Programmatically

From version 8.3.0 of the Android SDK you can programmatically display a Carousel. To display a Carousel, pass in a carouselID from your Intercom workspace to the following method:

```Kotlin
Intercom.client().displayCarousel(“123456”)
```

```Java
Intercom.client().displayCarousel(“123456”);
```

> 🚧 Make sure your carousel is live
A carousel must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Present a Survey Programmatically

From version 12.2.0 of the Android SDK you can programmatically display a Survey. To display a Survey, pass in a surveyID from your Intercom workspace to the following method:

```Kotlin
Intercom.client().displaySurvey(“123456”)
```

```Java
Intercom.client().displaySurvey(“123456”);
```

> 🚧 Make sure your survey is live
A survey must be ‘live’ to be used in this feature. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


# What's next?

Now that you have Intercom configured you can:

- [Enable Identity Verification](https://developers.intercom.com/docs/android-identity-verification).
- Configure Android Push Notifications for [FCM](https://developers.intercom.com/installing-intercom/docs/android-fcm-push-notifications).