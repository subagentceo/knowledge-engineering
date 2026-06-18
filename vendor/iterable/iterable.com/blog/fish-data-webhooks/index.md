# Fishin' for Data With Webhooks - Iterable

## Fishin’ for Data With Webhooks

**Published by**

April 4, 2019

![](https://iterable.com/wp-content/uploads/2026/04/ITE_Webhook_768x512_Banner_L1R1.png)

As marketers, we thrive on data. Whether we’re examining user events inside a nurture series or analyzing our BI tool’s funnel conversion metrics, data drives our decisions as we work toward delivering the best possible customer experiences.

Data is the great differentiator—it separates the good from the great campaigns. In today’s day and age of customer centricity, it’s critical that we capitalize on the underlying potential captured within the expansive data stores of our marketing stacks. This brings us to today’s topic: Webhooks!

Webhooks can be a bit of a mystery for the unfamiliar, but their value is clear. Inside this post, we’ll explore:

*   What they are and how they work
*   How webhooks and APIs differ
*   How they work inside Iterable

Content on webhooks, APIs, and data might seem a little dense at first glance, so we’ll be illustrating these concepts using a few easy-to-comprehend examples. Today, we’ll rig up our webhooks and go fishing…_for data_!

### Webhooks 101

Webhooks are essentially automated server calls triggered by specific events taking place. Server destinations have predefined URLs that listen for these calls and deliver a specified action once indicated.

As promised, we’ll explain their functionality as the basis of our fishing trip. If you’ve never gone fishing, that’s not a problem; we’ve created a handy illustration below.

##### Scenario #1

Picture yourself holding a fishing pole. You’ve cast a bobber into the water, attached by a fishing line. When you flick the pole, the connected bobber pops in and out of the water. 

![Webhooks transmit information between platforms](https://iterable.com/wp-content/uploads/2019/04/Itearble-Webhook-Example.png)

_Webhooks deliver data to other applications as events happen._

##### Translation

A _Triggered Event_ from your pole (pole flick) contains data that travels through your _Webhook_ (the fishing line), hitting your _Third-Party App_ (the bobber).

The app URL “listens” for such triggered events and upon receiving the webhook, triggers the _Action Specified_ (in this case bouncing up and down).

Summarized, a webhook is a way for an app to provide other applications with real-time information. Webhooks are triggered by app events, which then trigger responsive actions within another system or server. Webhooks deliver data to other applications as events take place, activating data with real-time immediacy.

### What’s the Difference Between a Webhook and an API?

Essentially, an API is a way that applications connect with other applications, platforms and databases; there’s a request for data, and once that request is received, a data response is returned.

To make this a bit simpler, we’re headed back to the ocean! We’ve provided a few more illustrations for aid as you become an expert in Webhooks and APIs (and maybe fishing, too?).

Let’s start by first delineating the differences between two applicable types of API calls.

#### GET API

A GET API is used to retrieve data for reading. GET APIs send calls to a third-party application (endpoints) asking for a payload to be delivered back to you.

##### Scenario #2

You’ve cast your fishing line into the ocean with the intent of catching a certain type of fish in the ocean.

![GET APIs are read-only requests used for retrieving information](https://iterable.com/wp-content/uploads/2019/04/Iterable-GET-API-Example.png)

_Fish on! The GET API’s signal successfully returned a payload response from the third-party data source._

##### Translation

A _GET API call_ (casting the fishing line) sends a specific signal traveling to a destined _endpoint_ (into the ocean). In this case, Iterable or another connected _third-party app_ (ocean) delivers the data _payload_ (fish), completing the call.

#### POST API

A POST API sends a payload to a third-party app (endpoint), and returns a success or failure response.

##### Scenario #3

In this example, you’ve cast your fishing line with a specific bait. Your baited line lands in the ocean, and reeling your line back in results in one of two potential outcomes: an empty hook or soggy bait.

![POST requests send data and create new items.](https://iterable.com/wp-content/uploads/2019/04/Iterable-POST-API-Example.png)

_Unlike most fishing trips, an empty hook means success in this POST API example._

##### Translation

A _POST API call_ (casting the fishing line) containing a specific _payload_ (attached bait), travels to a specified _endpoint_ (ocean). Iterable or another connected _third-party app_ (ocean) receives the call and returns a call of _success_ (taken bait, empty hook) or _failure_ (soggy bait).

In sum, API calls are messengers that deliver applications requests to your specified destinations. Once delivered, they return responses back to you. GET calls are read-only requests that retrieve something and do not alter source data. POST requests, however, send data and create new items.

### Using Webhooks in Iterable

Webhooks by nature are incredibly flexible and we try and maximize their usefulness by giving customers the ability to use webhooks in two different ways: System and Workflow. What’s the difference?

#### System Webhooks

You can send data from email, SMS, or push events to a third-party system in real-time by setting up a system webhook in Iterable. These simple webhooks will send a POST request with up to two headers to your specified endpoint.

!["Iterable's](https://iterable.com/wp-content/uploads/2019/04/System-Webhook.png)

#### Workflow Webhooks

Iterable’s Workflow Webhooks can be placed directly within Workflow Studio, giving you the flexibility to incorporate third-party data and trigger specific campaign actions.

!["“Call](https://iterable.com/wp-content/uploads/2019/04/Call-Webhook.png)

Workflow Webhooks support both JSON and the FormUrlEncoded content types. The FormUrlEncoded Webhook format allows the Iterable platform to connect with other applications from your marketing stack and leverage nearly any value from a user or event. This level of data continuity lets marketers enrich their particular lifecycle campaigns with greater levels of personalization.

You can also use a combination of merge parameters (ex. {{firstName}} ) in the fields of the webhook to create highly personalized content. For example, some Iterable customers capitalize on our partnerships with Inkit and Lob and use webhooks to add personalized direct mail into their cross-channel workflows.

##### Types of Webhook Workflow Actions

There are two actions that webhooks can perform as workflow actions: Call Webhook and Update User Profile Webhook.

##### Call Webhook

Use the Call Webhook action if you would like Iterable to make an HTTP request to another service to trigger an action. When using a JSON formatted webhook, the Call Webhook action will make a POST request with the data of the triggering event to your specified endpoint. This would be the type of workflow webhook you’d want to use if you were, let’s say, sending that Direct Mail trigger.

!["“Call](https://iterable.com/wp-content/uploads/2019/04/Call-This-Webhook.png)

##### Update User Profile Webhook

Use this action if you would like Iterable to make an HTTP GET request to your database with the query parameter email. It expects a JSON response used to update the user’s profile within Iterable. This would be helpful for someone who is, for example, trying to call data from say a partner’s database.

Let’s say you’re prioritizing form conversion rates on a partner landing page, so you’ve only included an email capture field on your form. As soon as the email field is filled and fed back to Iterable, a webhook to your partner’s database could instantly send back additional email-associated information needed to follow up about that particular partnership.

![“Update User Profile Node” within Iterable’s Workflow Studio](https://iterable.com/wp-content/uploads/2019/04/Update-User-Profile-Webhook.png)

### How Can Webhooks Work for Me?

Glad you asked! As examples, we’ve highlighted a few customer use cases.

*   A fitness tracking app sends data to their BI tool, Amplitude, using system webhooks.
*   A health & wellness brand’s webhooks trigger direct mail campaigns through Lob.
*   A cosmetics company sends data to their BI tool, Looker, for enhanced reporting. They also trigger SMS messaging to select customers inside cross-channel campaigns.

Customers can also take advantage of our partnership with Shopify to track events within their Shopify accounts via webhook. Here’s how it works:

*   **Customers**: Update Iterable profiles once customers create or update their accounts.
*   **Fulfillment**: Tracking information is sent to Shopify if the store is integrated with a carrier; fulfillment information is then sent to Iterable.
*   **Orders**: Order completion steps (creation, cancellation, deletion, etc.) can be passed to Iterable.
*   **User Interface for Customer Field mapping**: Allow admins to map fields to Iterable attributes (currently in private beta).
*   **Product Listing and Inventory Levels**: Items are synced as they are created.

### Seamless Data Transmission

Don’t worry, we’re done fishing. In short, webhooks are extremely flexible tools inside your marketing tackle box. Webhooks make theoretical use cases actionable and turbocharge your marketing team’s output.

Webhooks work in real time, triggering instantaneous actions, and provide a way for your platforms to operate more efficiently. Not to mention, they’re complementary to your APIs and SDKs.

In today’s environment, marketers should never feel like they’re unable to deliver the experiences customers expect from them. Webhooks empower teams to harness real-time data and build scalable, personalized brand experiences.

Whether you’re just getting started with webhooks, or exploring advanced use cases, evaluating the next iteration of your marketing is always a good idea.

_Want to learn more about Iterable Webhooks? Check out our in-depth support article._