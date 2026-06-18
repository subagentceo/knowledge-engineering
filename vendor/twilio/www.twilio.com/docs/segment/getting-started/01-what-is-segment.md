# How Segment works

In short, the Segment libraries (called [Sources](/docs/segment/connections/sources/catalog/)) generate messages about activity in your site or app, and send them to the Segment servers. Segment then translates the content of those messages into different formats for use by other tools (called [Destinations](/docs/segment/connections/destinations/)), and sends the translated messages to those tools. The Segment servers also archive a copy of the data, and can [send data to your storage systems](/docs/segment/connections/storage/) (such as databases, warehouses, or bulk-storage buckets).

## Overview

![Data flows from sources like website and mobile through Segment to destination apps and data warehouses.](https://docs-resources.prod.twilio.com/8f8e23cb2a92c471ebae8ed3739523e49a660c5e31b71199ce49948f148eeb95.png)

[Segment Spec methods](/docs/segment/connections/spec/) are how you collect interaction data from your interfaces, and the [Sources](/docs/segment/connections/sources/) are what you package with your interfaces to collect and route the data.

Once you've collected your interaction data, there are several different actions you can take:

* Send it to [Destinations](/docs/segment/connections/destinations/), which receive the data from any number of sources in real time.
* Send it to [Warehouses](/docs/segment/connections/storage/) and other bulk storage tools, which hold your raw event schemas and update on regular intervals.
* Enrich the customer data you collect by [connecting data from your other tools](/docs/segment/connections/sources/catalog/#cloud-apps), and then collect it in a warehouse to monitor performance, inform decision-making processes, and create uniquely customized user experiences.
* Use [Engage](/docs/segment/engage/), Twilio's marketing automation tool, to build marketing campaigns personalized to your audience.

## Sources for collecting data

You can collect data by implementing Segment's tracking libraries as your Sources:

* [Analytics.js](/docs/segment/connections/sources/catalog/libraries/website/javascript/), the Segment JavaScript source, is the most powerful way to track customer data from a website. Segment recommends it as the default installation for any website.
* [The Segment Mobile SDKs](/docs/segment/connections/sources/catalog/#mobile) are the best way to simplify tracking in your iOS, Android, and Xamarin apps. Segment recommends them over server-side sources as the default installation for any mobile app.
* [Server-side sources](/docs/segment/connections/sources/catalog/#server) let you send analytics data directly from your servers when client-side tracking doesn't work, or when you're sending mission-critical data like revenues.

### Sources for unique cases

Segment also offers these other source libraries to cover less straightforward cases:

* Use the [HTTP Tracking API](/docs/segment/connections/sources/catalog/libraries/server/http-api/) if Segment doesn't offer a library for your specific environment yet.
* The [Pixel Tracking API](/docs/segment/connections/sources/catalog/libraries/server/pixel-tracking-api/) lets you track events from environments where you can't execute code - for example, tracking when an email was opened.
* The [Querystring API](/docs/segment/connections/sources/catalog/libraries/website/javascript/querystring/) lets you use querystrings to load API methods when a user first visits a Segment-enabled site. Use this API for tracking events like email clicks and identifying users associated with those clicks on the destination page.

### Cloud App Sources

Segment also offers [Cloud App Sources](/docs/segment/connections/sources/about-cloud-sources/) to integrate data from your third-party tools:

* [Object Cloud Sources](/docs/segment/connections/sources/about-cloud-sources/#event-cloud-app-sources) can import third party tool data directly into your Segment warehouse, but can't stream that data into your other Segment destinations. Make sure you enable a Segment warehouse before you enable an object cloud source.
* [Event Cloud Sources](/docs/segment/connections/sources/about-cloud-sources/#object-cloud-app-sources) don't just import third party tool data into your Segment warehouse, they also send event data in real-time to your other Segment destinations. You don't need to set up a data warehouse to send Event Cloud Source data to your destinations.

## How you can track data

Segment supports several ways to implement tracking. The two most common are to use *device-based* or *server-based* libraries. You can use Segment's device-based libraries, such as JavaScript, iOS, and Android, to make calls on users' browsers or mobile devices. You can also track data with Segment's server-based libraries, such as Node, Python, or PHP, where the calls are triggered on your own servers and then sent to the Segment servers.

When you collect data using device-based libraries, you can choose between these two different connection modes:

* **Cloud-mode** is where the library sends the data directly to the Segment servers which then translate and forward it.
* **Device-mode** is where the library sends the data both directly to the Segment servers, and also to the servers for the destination tool. Device-mode sometimes requires some [additional set-up steps](/docs/segment/connections/sources/mobile_guide/), but can unlock rich device data.

Although there are some tradeoffs between the two approaches, neither is better than the other, and we recommend that you implement a mix of both. In general, more direct interaction data is available using a device-based library, but server-based collection is more secure, reliable, and can't be blocked by ad blockers.

## Segment methods

The Segment libraries generate messages about what happens on your interface, translate those messages into different formats for use by destinations, and transmit the messages to those tools.

There are several [tracking API methods](/docs/segment/connections/spec/), that you can call to generate messages. The four most important methods are:

* [Identify](/docs/segment/connections/spec/identify/): Who is the user?
* [Page](/docs/segment/connections/spec/page/) and [Screen](/docs/segment/connections/spec/screen/): What web page or app screen are they on?
* [Track](/docs/segment/connections/spec/track/): What are they doing?

Every call shares the same [common fields](/docs/segment/connections/spec/common/). When you use these methods [as intended](/docs/segment/connections/spec/best-practices-identify/), it allows Segment to detect a specific type of data and correctly translate it to send it on to downstream destinations.

## Where you can send data

Segment maintains a catalog of 400+ destinations where you can send your data. To see some of the destinations in Segment's catalog, see the [Destination Catalog](/docs/segment/connections/destinations/catalog).

![Logos of various data destinations compatible with Segment, including Slack, Salesforce, and Google Analytics.](https://docs-resources.prod.twilio.com/066cd4500310b5d89aec9a1dedeedd09c832ae63842f51af4c3b7047e6844811.png)

### back

[Getting Started Overview](/docs/segment/getting-started/)

### next

[A simple Segment installation](/docs/segment/getting-started/02-simple-install/)

Walk through a disposable, demo implementation.
