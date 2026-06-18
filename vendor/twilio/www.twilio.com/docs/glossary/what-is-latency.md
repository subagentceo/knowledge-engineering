# What is Latency?

Latency is the time delay between the initiation of an event and its perception by some observer. In networking and telecommunications, latency is the time between a sender causing a change in a system's state and its reception by an observer. Network latency is often informally used interchangeably with *lag.*

## Latency or lag in online voice and video conversations

Excess latency is one of the most common causes of poor Voice or Video communications quality over a network. As networked communications emulate face to face or verbal communications, long delays between transmission and reception of a signal are noticeable and off-putting. High latency, especially without prepared participants, causes communications breakdowns and stops conversation flow.

Latency's effects depend on observers, but most will perceive latency around 100 - 120 milliseconds. Communications will start to break down around 250 - 300ms. If all parties are aware of large latency in a session (e.g. if all parties know a call is over a satellite connection), this delay might still be acceptable.

The International Telecommunications Union has codified recommendations on *maximum acceptable one-way latency* in [ITU-T G.114][]. Their recommendation for network planning is to keep one-way latency *below 400ms* at the absolute low end while noting that a *target of 150ms one-way latency* is suitable for most purposes. Some applications, especially those with interactive sessions, will be best experienced with latencies under 100ms.

## What causes latency in IP communications?

For many applications of IP communications, the largest contributor to latency is the routing between the sender and receiver. This is caused by the physical routes the packets are forwarded over, as well as the individualized caches, settings, and congestion on intermediate forwarding nodes.

A partial list of other contributors to latency (but by no means an exhaustive one) follows:

* Operating system packet buffer
* NIC buffers
* [Codec][] encoding and decoding times
* Sound card latency
* [Jitter][] buffer Length
* Input device (microphone, mixers, etc.) latency
* LAN Switch and Router buffers
* Quality of Service Settings

### How latency is measured

Latency measurement was standardized in IETF's [RFC 2544][], based on definitions of latency from [RFC 1242][]. RFC 1242 draws a distinction between store and forward devices and bit forwarding devices, but latency measures from when the last of the data leaves an output to when the first of the data reaches the input. Generally, in IP applications, latency measures the time between when the last piece of data leaves a sender to when the recipient receives the first piece of data.

#### How does ping relate to latency?

*Ping* is a utility which sends ICMP `ECHO` packets to measure network performance. In its [most commonly used implementation][], ping will send `ECHO` packets and receive `ECHO REPLY` packets. Ping then rolls up results to calculate statistics related to round-trip times.

Although closely related to latency (especially when routing or network latency dominates), ping is slightly different. On top of taking two trips through the network, there is also some compute time involved for the recipient to receive and process the `ECHO` packet and to send an `ECHO REPLY`. However, ping often gives an excellent estimate of latency and can be used to diagnose or identify many latency issues.

### Example of network effects on latency

In many cases, network effects cause the largest increase in latency. Although physical distance matters, the actual routes taken by packets in a session may be much longer. Take, for instance, the following example:

* Two participants are both on the equator, 1,000 miles apart in a straight line.
* Their communications path is through a satellite in Geosynchronous (more accurately [Geostationary][]) Orbit exactly bisecting the two, 22,236 miles above earth. Rounding off, the path from A or B to the Satellite is 22,273 miles.
* It takes light about 119.6 ms to travel that distance, so if the satellite takes 2 ms to process packets, the minimum one-way latency added by the route is *241.2 milliseconds!*

![Diagram showing latency of 119.2 ms from sender to receiver via satellite with 2 ms delay.](https://docs-resources.prod.twilio.com/8eae7d54d232e46e0f120cc2de6d6380f32c428471cf606fc77568d6b6a69d9c.png)

Compare a satellite route with a wired connection around the curve of the earth, which would be around 1,003 miles long at a minimum.

Routing paths can cause a significant increase in latency, as seen in this example. The effect of this latency is often seen in television interviews and talks given via satellite; there is a noticeable delay between parties talking.

## How Twilio can help improve or monitor communications latency

While Twilio can't help decrease the physical distance between the participants in your IP Video or Voice communications, we can assist with avoidable routing delays and help you monitor your session quality.

Our [low-latency Voice Conference Product][] has a global low-latency routing architecture, helping improve the routing between intermediate nodes in your calls. Our [Programmable][] Video Product also uses this global low-latency architecture to optimize routing for Twilio Voice JavaScript SDK's WebRTC streaming traffic. By ensuring low congestion and possibly more direct routes, we might be able to reduce your latencies; [talk to sales][] to see if we have a solution for you.

Additionally, our [Voice Insights product][] helps you monitor and quantify your IP communications sessions with Twilio. We will monitor latency, as well as other measures like [jitter][] (the variation in latency between multiple packets) and packet loss. We also roll up metascores such as the number of calls dropped and accepted as well as subjective measures such as Mean Opinion Score.

## More reading

* [Global Infrastructure docs][]
* [Voice JavaScript SDK Edge Locations][]
* [Voice JavaScript SDK Best Practices][]
* [Use the Voice JavaScript SDK with a non-US Twilio Region][]
* [SIP Trunking][]

[Codec]: https://en.wikipedia.org/wiki/Codec

[Geostationary]: https://en.wikipedia.org/wiki/Geostationary_orbit

[Global Infrastructure docs]: /docs/global-infrastructure

[ITU-T G.114]: https://www.itu.int/rec/T-REC-G.114-200305-I/en

[jitter]: /docs/glossary/what-is-jitter

[low-latency Voice Conference Product]: https://www.twilio.com/voice/conference

[most commonly used implementation]: https://tools.ietf.org/html/rfc792

[Programmable]: https://www.twilio.com/video

[RFC 1242]: https://tools.ietf.org/html/rfc1242

[RFC 2544]: https://tools.ietf.org/html/rfc2544

[SIP Trunking]: /docs/glossary/what-is-sip-trunking

[talk to sales]: https://www.twilio.com/help/sales

[Use the Voice JavaScript SDK with a non-US Twilio Region]: /docs/global-infrastructure/use-the-programmable-voice-javascript-sdk-with-a-non-us-twilio-region

[Voice Insights product]: /docs/voice/voice-insights

[Voice JavaScript SDK Best Practices]: /docs/voice/sdks/javascript/best-practices#use-the-closest-twilio-data-center

[Voice JavaScript SDK Edge Locations]: /docs/voice/sdks/javascript/edges
