# Spec Overview

The Segment Spec provides guidance on meaningful data to capture, and the best format for it, across all of Segment's libraries and APIs. If you implement Segment using these formats, it's simple to translate your data to downstream tools.

[Segment University: The Segment Methods](https://university.segment.com/introduction-to-segment/324252?reg=1\&referrer=docs)

Check out our high-level overview of these APIs in Segment University. (Must be logged in to access.)

> \[!WARNING]
>
> Events ingested by Segment are subject to defined [Product Limits](/docs/segment/connections/rate-limits).

The Segment Spec has three components.

First, it **outlines the semantic definition of the customer data Segment captures across all libraries and APIs**. There are six API calls in the Spec. They each represent a distinct type of semantic information about a customer. Every call shares the same [common fields](/docs/segment/connections/spec/common/).

* APIs
  * [Identify](/docs/segment/connections/spec/identify/): who is the customer?
  * [Track](/docs/segment/connections/spec/track/): what are they doing?
  * [Page](/docs/segment/connections/spec/page/): what web page are they on?
  * [Screen](/docs/segment/connections/spec/screen/): what app screen are they on?
  * [Group](/docs/segment/connections/spec/group/): what account or organization are they part of?
  * [Alias](/docs/segment/connections/spec/alias/): what was their past identity?

Second, it **details the event data Segment captures across some cloud sources and destinations**.

* Cloud sources and destinations
  * [Email](/docs/segment/connections/spec/email/)
  * [Live Chat](/docs/segment/connections/spec/live-chat/)
  * [A/B Testing](/docs/segment/connections/spec/ab-testing/)

Third, it **shares the events Segment recommends you track for a particular industry based on experience working with thousands of customers**. When you respect these specs, Segment maps these events to particular features within end destinations like Google Analytics and Facebook Ads.

* Industry specs
  * [Mobile](/docs/segment/connections/spec/mobile/)
  * [E-Commerce](/docs/segment/connections/spec/ecommerce/v2/)
  * [Video](/docs/segment/connections/spec/video/)
  * [B2B SaaS](/docs/segment/connections/spec/b2b-saas/)
  * [AI Copilot](/docs/segment/connections/spec/copilot/)
