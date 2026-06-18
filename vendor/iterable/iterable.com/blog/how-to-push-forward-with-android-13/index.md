# How to Push Forward With Android 13 - Iterable

## How to Push Forward With Android 13

**Published by**

July 8, 2022

![Android 13 Push Notifications](https://iterable.com/wp-content/uploads/2026/04/062722_Android-Opt-In-for-Push_768-x-512.png)

Today, two key aspects of marketing are privacy and preference. With Google eliminating the use of third-party cookies and regulations like the CAN-SPAM Act requiring brands to allow customers to opt-out of marketing emails, privacy in marketing has become a priority. Preference goes somewhat hand-in-hand with privacy. With a slew of marketing channels at their disposal, marketers can give customers the ability to decide how, when, and where they want to receive marketing communications. It’s not only good practice; it’s expected.

To combine preference and privacy, Android 13 introduced new permissions for receiving push notifications. Like iOS, Android 13 devices will show the OS prompt which allows users to opt-in (or out) of receiving push notifications.

In this article, we’ll be discussing how you can not only ensure your Android 13 users receive the best experience, but also how you can maximize your push opt-in rate, while learning more about your customers’ preferences. Before we dive in, however, there are some app user scenarios to think about.

**The TL/DR**

Iterable Android App customers should:

*   Update your build for Android 13 as soon as possible
*   Leverage Iterable to test where and when to request push permissions while tracking what content interests your app users

### Different Scenarios to Consider

Creating a harmonized and individualized experience for your app users is the end goal, so customers using your app shouldn’t notice any bumps in the road during an update like this. But, there are two circumstances a customer of yours may find themselves in when using your app that may impact their overall experience.

#### Android 12 Users

Let’s say your customer sees your brand’s app in the store and decides to download it but they are still using Android 12 as their OS. They install the app and then they update their phone to Android 13. What happens now?

Push notification permissions are pre-granted (unless intentionally disabled by the user when they had Android 12), meaning they’ll receive your brand’s notifications without having to opt-in. This is also the case if the user switches from one Android phone with OS 12 to another Android phone with OS 13 and the app is restored using the “backup and restore” feature.

#### Android 13 Users

If your customer has an Android 13 phone, the variable is which OS your app targets. Apps are built to target certain operating systems. “Each app has a targetSdkVersion in the manifest file (also known as the target API level) which informs how your app is run on different Android versions.” For example, what if your app targets Android 12? In this case, the push notification opt-in is prompted by the system during the app startup.

What if your app targets Android 13? In this case, your app can request push permissions at the time of your choosing, and has control to check, educate the user, and ask the user for permission to send push notifications—with the right context.

Essentially, you’ll want to upgrade your Android app to support the different contexts present on Android 12 and 13.

### A Closer Look at Android 13

To understand this update a bit more, we’ll be focusing on the second scenario: users with Android 13 phones. These are the users with Android 13 who have not used your app before.

In the diagram below you’ll see a high-level flowchart depicting how permissions can be requested and granted. Within this flowchart is the opportunity to better understand the customer in the hopes of creating a more individualized experience.

![Push workflow](https://iterable.com/wp-content/uploads/2022/07/Screen-Shot-2022-07-07-at-2.20.27-PM.png)

_Diagram depicts requesting push notification permission from the brand side. Source: Android._

Let’s zoom in on steps 5a and 5b. Within Iterable, you can check at any point of a user’s life cycle whether they’ve opted into push permissions. If they haven’t, your brand has an awesome opportunity to gain some insight into the customer’s preferences.

For example, you could test what content may increase their opt in. Do they want coupons? Do they want new product info? You could also narrow down when—in their customer lifecycle—the best time is to ask them for push permission. This way, you can increase the chances they’ll opt-in.

Fetch Rewards, a brand that rewards points based on scanning shopping receipts, used this exact same tactic to increase their opt-in rate. After surveying customers, they noticed the majority of customers hadn’t used their app simply because they forgot to scan their receipts. To help customers remember, they wanted to send a reminder via push notification. They asked customers, “would you be willing to opt in to receive location-based reminders to help you remember to scan?” and the majority said “yes.”

By using the push notification opt-in as an opportunity to better understand customers, the Fetch Rewards team were able to increase their conversions by 20%.

### It’s not a Barrier, it’s a Better Experience

It may initially seem daunting to have to ask Android 13 users for permission to send push notifications, but in the long run, your brand will be providing a better overall experience to Android 13 users. Sending push notifications without explicit permission from the customer is similar to the batch-and-blast marketing techniques of yesteryear—it’s impersonal and can be annoying for the customer. By getting customers to opt-in, you know they’re engaging with your brand and you can learn more information about the marketing content they want to receive.

_To learn more about how your brand can send meaningful push notifications, _check out our_ _support documentation on the Android 13 update_ or schedule an Iterable demo today._