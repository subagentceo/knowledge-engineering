# Global Infrastructure

Twilio's Global Infrastructure lets you control where your application's Twilio-related data is routed, processed, and stored.

![Regions for data processing and storage; Edge Locations for network traffic management.](https://docs-resources.prod.twilio.com/963088a0e7f89ebf1218f78efa37a2daea1df4be559de0a192509922ee16755b.png)

Architect your application with our Global Infrastructure to give users the best possible experience, regardless of location.

## Twilio Regions

Twilio Regions are the data centers where your application's Twilio data is processed and stored. Choose a Region near your application servers to optimize performance, or pick one in the geographic area where you want the data to reside.

### Optimize application performance

Select the Twilio Region nearest to your application servers to achieve the shortest possible round trips between your servers and Twilio compute and storage infrastructure. Shorter round trips typically result in lower latency and improved quality and responsiveness for your application.

Minimizing round-trip distance and latency is especially critical in highly interactive applications such as real-time voice systems, video applications, or chat interfaces.

### Control data residency

By configuring your application to use a specific Twilio Region, you can ensure that your Twilio data remains within that territory. This level of data storage locality control can be critical for businesses that need to adhere to regulations that require customer data to remain within regional boundaries.

> \[!WARNING]
>
> During this initial phase of the Twilio Regions rollout, Twilio does not guarantee that all data will remain within your selected Region.

Twilio operates the following Regions:

* United States (US1)
* Ireland (IE1)
* Australia (AU1)

> \[!WARNING]
>
> Not all products and features are available in Regions outside of US1. For a full list of regional product and feature availability, refer to our [Regional product and feature availability](/docs/global-infrastructure/regional-product-and-feature-availability) page.

## Edge locations

Twilio Edge Locations are the onramps and offramps to the Twilio high-speed internal network. These are the data ingress and egress (entry and exit) points located on the [network edges](/docs/glossary/what-is-a-network-edge). We operate them in major cities throughout the world.

Your servers and SDKs or SIP clients can minimize latency by connecting to the nearest Edge Location. Additionally, you can ensure resilience by configuring alternate Edge Locations in case one becomes unavailable.

Regardless of which Twilio Region your application uses, its traffic to and from Twilio will always transit through an Edge Location. Any Edge Location can be used in combination with any Region.

### Minimize network latency

You can control which specific Edge Location your application servers or clients connect to. This allows you to optimize the efficiency of your connection to Twilio. Some Twilio server-side SDKs can use the Twilio Global Low Latency mechanism. This mechanism can [select the most appropriate Edge Location](/docs/voice/sdks/network-connectivity-requirements#global-low-latency-requirements) based on DNS request latency measurements.

### Ensure resilience

If the Edge Location that your application or clients are using becomes unavailable, you can configure it to connect to an alternate Edge Location. Unavailability can occur due to natural disaster, equipment failure, or any other reason.

To learn more about architecting your Twilio Voice-powered application for maximum resiliency, see [Best Practices for Voice Failover](/docs/voice/twilio-voice-failover-best-practices).

## Next steps

* Learn more about [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions)
* Learn more about [Edge locations](/docs/global-infrastructure/understanding-edge-locations)
