# Event Streams

The Event Streams API delivers event data from across the entire Twilio platform through a single, asynchronous, near-real-time data pipeline. It lets you connect Twilio data with no-code, out-of-the-box business tools called *sinks*. Some sinks include [Kinesis](https://aws.amazon.com/kinesis/), [Twilio Segment](https://segment.com/), or your own [Webhooks](/docs/events/webhook-quickstart).

Event Streams provides the following capabilities:

* **Unified stream**: Consolidate events from all supported Twilio products including Messaging, TaskRouter, Voice, and more into a single data feed. Event Streams provides granular control over the specific events delivered to your sink, ensuring you only receive the data that matters to your business.
* **Schema consistency**: Consume structured data from multiple Twilio products with consistent metadata and well-defined, versioned schemas, making it easier for your downstream systems to parse data.
* **Built-in reliability**: Event Streams provide an [at-least-once delivery](/docs/events/event-delivery-and-duplication) guarantee and will queue or retry your events for up to four hours. Once Twilio delivers an event, you can use embedded timestamps to reconcile any duplicates or out-of-order events that occurred during retries.
* **Operational efficiency**: Reduce the load on your servers by moving away from the "one-producer-to-one-consumer" model. Stream the same event to multiple sinks simultaneously without writing extra code.

## Example use cases

Use Event Streams for asynchronous event delivery use cases like:

* **Omnichannel customer journey mapping**: Stream real-time events to your *Customer Data Platform* (CDP). You can also connect your *Customer Relationship Management* (CRM) tools to Kinesis or Webhooks. Build comprehensive customer profiles using these connections. These profiles trigger personalized campaigns across SMS, Voice, and Email.
* **Advanced analytics and trend reporting**: Funnel granular event data into Twilio Segment or Amazon Kinesis. Send that data further downstream to a data warehouse. Once in the warehouse, analyze engagement patterns over time and optimize your communication strategy across all channels.
* **Real-time marketing automation**: Trigger immediate downstream actions with engagement events. When a customer interacts with a message, update their activity profile in a CDP. This triggers the next step in their journey without engineering intervention.
* **Compliance and regulatory auditing**: Stream every event directly to secure storage to maintain an immutable record of all communications, satisfying global auditing and data residency requirements.
* **Health monitoring**: Monitor event delivery and error logs across your entire account. If message failure rates spike, alert your engineering team.

## Differences between Event Streams and Twilio webhooks

For cases where you need synchronous, real-time, exactly once, event delivery, Twilio recommends [Twilio webhooks](/docs/usage/webhooks). The webhook [responds with *Twilio Markup Language* (TwiML)](/docs/usage/webhooks/getting-started-twilio-webhooks#responding-to-webhooks). Some Twilio webhooks events can be informational and require no TwiML response.

When you need synchronous, near-real-time, at least once event delivery without TwiML, Twilio recommends Event Streams. Event streams events only provide information.

## Event Streams at a glance

* **Delivery type**: Asynchronous, at-least-once delivery. Twilio queues events for up to four hours and might deliver them out of order.
* **Latency**: Events are typically delivered to your sink within seconds of the triggering action. However, Twilio doesnt maintain any SLAs for Event Streams latency.
* **Limits**: Each account can have up to 100 Sink resources and 100 Subscription resources.
* **Pricing**: Event Streams is available at no additional cost. You pay only for the underlying Twilio products that generate the events.
* **Retention Periods**: Twilio retains application logs through Event Streams for seven days and account-level error logs for 23 days.
* **Sub-account Support**: Event Streams supports both ISVs (Independent Software Vendors) and direct customers. There is no way to receive events from all subaccounts with a single Event Streams subscription.

## Get started with Event Streams

* [Sinks](/docs/events/event-streams/sink-resource): The business tools that receive your events. Each sink serves as the destination for your subscription data.
* [Subscriptions](/docs/events/event-streams/subscription): To send specific Twilio events and versions to your sinks, use the Subscription resource. One subscription can have multiple event types.
* [Event Types](/docs/events/event-streams/event-type-resource): The different types of events that the Event Streams API provides. One event type can have multiple versions. Twilio recommends subscribing to the latest version of an event.
* [Schemas](/docs/events/event-streams/schema-resource): Schemas define the way Twilio organizes information within events. Each Twilio product has at least one schema.

By creating Sink and Subscription resources, you can start using Event Streams. The following quickstart guides can help you get started with Event Streams:

* [Webhook Quickstart](/docs/events/webhook-quickstart)
* [Amazon Kinesis Quickstart](/docs/events/eventstreams-quickstart)
* [Segment Quickstart](/docs/events/segment-quickstart)
