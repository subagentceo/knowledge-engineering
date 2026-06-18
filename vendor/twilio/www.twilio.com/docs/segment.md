# Twilio Segment

## Twilio Segment

Collect, clean, and activate your customer data.

Capture data from any source, enforce quality with schemas, unify customer identity, and send it to hundreds of tools — without building each integration yourself

[Get started now!](/docs/segment/getting-started)

## Tutorial

```js !sample
import { AnalyticsBrowser } from "@segment/analytics-next";

const analytics = AnalyticsBrowser.load({
  writeKey: "<YOUR_WRITE_KEY>",
});

analytics.track("Order Completed", {
  orderId: "12345",
  revenue: 99.99,
});
```

1. Segment receives your data and routes it to every connected destination in real-time
2. One API call captures event data with any properties you need — same syntax across web, mobile, and server
3. Your data arrives in your warehouse, analytics, and marketing tools automatically — no integration code required

Tutorial code output: "Track once, send everywhere."

## Quickstarts

Learn about Segment, plan and work through a basic implementation, and explore features and extensions.

* [How Segment works](/docs/segment/getting-started/01-what-is-segment)
* [Basic Segment installation](/docs/segment/getting-started/02-simple-install)
* [Full implementation](/docs/segment/getting-started/04-full-install)
* [Segment for developers](/docs/segment/guides/intro-impl)
* [Use cases](/docs/segment/getting-started/use-cases)

## Connect your app to Segment

Already have a project? Connect Segment to your application and start tracking now!

* [C#](/docs/segment/connections/sources/catalog/libraries/server/csharp)
* [Java](/docs/segment/connections/sources/catalog/libraries/server/java)
* [Javascript](/docs/segment/connections/sources/catalog/libraries/website/javascript)
* [Kotlin (Android)](/docs/segment/connections/sources/catalog/libraries/mobile/kotlin-android)
* [Swift](/docs/segment/connections/sources/catalog/libraries/mobile/apple)
* [Other sources](/docs/segment/connections/sources/catalog)

## Learn more

Want to learn more about how Segment can help you drive your business analytics? Check out these resources!

### Learning about Segment

* [Introduction to Segment](/docs/segment/guides)
* [Segment for Developers](/docs/segment/guides/intro-impl)
* [How-To Guides](/docs/segment/guides/how-to-guides)
* [Segment Academy](https://segment.com/academy)
* [Segment University](https://university.segment.com)

### Getting Data into Segment

* [Spec Overview](/docs/segment/connections/spec)
* [Spec Common fields](/docs/segment/connections/spec/common)
* [Semantic events](/docs/segment/connections/spec/semantic)

### Features

* [Simplify data collection](/docs/segment/connections)
* [Personalize experiences](/docs/segment/engage)
* [Protect data integrity](/docs/segment/protocols)
* [Respect users' privacy](/docs/segment/privacy)

## Related Products

Segment provides integrations with other Twilio products as Sources or Destinations.

### Messaging

Combine Segment with Messaging to send messages automatically based on real-time events without managing complex integrations.

[Product Docs](/docs/messaging)

### Sendgrid

Take your company's analytics to the next level by integrating Segment tracking with email marketing solutions.

[Product Docs](/docs/sendgrid)

### Voice

Connect with Voice data to get better insights on your calls and conferences.

[Product Docs](/docs/voice)
