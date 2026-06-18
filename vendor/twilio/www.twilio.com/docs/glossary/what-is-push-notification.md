# What is a Push Notification?

When an app server delivers an alert to a specific app without an end user request, that alert is called a *push notification*. Also known as a [server push notification][] or *push*, these alerts target mobile devices but can also target web apps.

## Notification options

Each native mobile app platform (iOS, Android, Windows, Fire OS, Blackberry) includes a native *Operating System Push Notification Service* (OSPNS) like APNS or FCM. These services allow push notifications with text, images, app badges, and sounds. The OSPNS routes the notification from the app provider to the app user's device.

Services provided from both mobile device ecosystems and the web send push notifications to linked device apps.

* iOS uses the *[Apple Push Notification Service][]* (APNS). Apple launched APNS as the first mobile push notification service in 2009.
* Google released *[Google Cloud Messaging][]* (GCM) in 2012. This service became *Firebase Cloud Messaging* (FCM) in 2016. They launched [Rich Notifications][] for Android in 2013 and native push for [iOS devices][] in 2017.
* The [W3C Push API][], the web app push notification standard, launched in 2012.

An end user's device can receive a push without being unlocked or the target app being open.

To add push notifications to their app, an app publisher registers with the OSPNS for which they're developing. The notification service provides the app publisher with an [API][]. To access the API to connect with the service, the publisher develops their app using an [SDK][]. When development finishes, the app publisher uploads the app to the appropriate app store.

## Permissions

To receive push notifications from a service, the end user must choose to accept the notifications or *opt-in*.
The choice to opt-in appears after the end user installs a client app and opens it for the first time.

An app usually makes the opt-in request on its initial installation, and the user may always grant or revoke consent for notifications at any time.

## Benefits

Push notifications provide the following benefits:

* **Cost** : Mobile device end users might lack unlimited texting plans. This means they must pay for incoming texts. For this reason, they might quickly opt out of SMS communications. Push notifications don't incur those charges.
* **User agency** : The end user decides if, how, and how often they receive push notifications.
* **Risk reduction** : As an end user can opt in or out of push notifications, pushes adhere to the US *Telephone Consumer Protection Act* ([TCPA][]) rules on solicitation and consent. Push notifications limit the risks of end user harassment and potential litigation.
* **Engagement** : Push notifications [increase app engagement][] and improve retention rates.

## Challenges

While push notifications help communicate with an app's users, push creates some challenges. App developers must:

* Respect recipient time zones and sleep patterns.
* Target the interested segment of your audience.

Following these guidelines can help provide useful notifications.

[API]: /docs/glossary/what-is-an-api

[Apple Push Notification Service]: https://en.wikipedia.org/wiki/Apple_Push_Notification_Service

[increase app engagement]: https://info.localytics.com/blog/6-stats-that-prove-how-important-push-notifications-in-app-messaging-are-to-your-apps-success

[Rich Notifications]: https://developer.chrome.com/docs/extensions/how-to/ui/notifications

[SDK]: /docs/glossary/what-is-an-sdk

[server push notification]: https://en.wikipedia.org/wiki/Push_technology

[TCPA]: /docs/glossary/what-is-telephone-consumer-protection-act-tcpa

[W3C Push API]: https://www.w3.org/TR/push-api

[iOS devices]: https://developer.chrome.com/blog/native-mac-os-notifications

[Google Cloud Messaging]: https://firebase.google.com/docs/cloud-messaging
