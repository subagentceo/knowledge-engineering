# What is Session Initiation Protocol (SIP)?

Session Initiation Protocol (SIP) is a signalling protocol for initiating, terminating, and modifying user sessions over an IP network. Most commonly, SIP is used for Voice Over IP (VoIP) services, but is also often used for other communications sessions such as video calls and instant messaging sessions.

Compared to predecessors such as [H.323](https://en.wikipedia.org/wiki/H.323), SIP is a much easier to implement and much more flexible protocol. It was first standardized in March 1999's [RFC 2543](https://tools.ietf.org/html/rfc2543) and has been subsequently revised in June 2002's [RFC 3261](https://tools.ietf.org/html/rfc3261) (with various updates since then).

By mapping SIP endpoints (*user agents*, in SIP terminology) to Uniform Resource Identifiers (URIs), SIP is quite similar to the HTTP model of requests and responses. Unlike HTTP, SIP can use UDP or other transport types. SIP is a text-based protocol and uses UTF-8 encoding.

**\* See Twilio's Best Practices for SIP Security \***

## How Twilio Uses SIP

[Using SIP to connect to Twilio is one way](https://www.twilio.com/en-us/voice/sip-interface) to get access to Twilio's global reach and powerful automation and scripting functions.

Here's our overview of [connecting your existing SIP communications](/docs/voice/api/sending-sip) infrastructure to us.

![Diagram showing SIP connection from customer to Twilio, using PBX, HTTP webhook, and REST API to app and PSTN.](https://docs-resources.prod.twilio.com/ebf45671a659f1ae9aa71e305497c4c42cf289cd58696add2e09e2e3b1db14f2.png)

Twilio also offers [Twilio Interconnect](https://www.twilio.com/en-us/interconnect), a varied service where we offer a direct connection that can largely or wholly avoid the public internet. We have provisions to connect with your cloud infrastructure directly (such as with Amazon Web Services, Google's Compute Cloud, and Microsoft Azure), physically interconnect at [one of our global locations](https://www.twilio.com/en-us/interconnect), tunnel over a VPN, or connect to your MPLS Network.

*Twilio Interconnect* also offers additional QoS guarantees and SLAs as well as enterprise-grade security.

## SIP Trunking with Twilio

Twilio also offers our [Elastic SIP Trunking](https://www.twilio.com/en-us/sip-trunking) service, where we can *instantly* provision a SIP network for you worldwide. Connect to a SIP URI that's local to your firm and we will do the rest - all over a global private backbone that minimizes traversal on the public internet. See some possible [SIP Trunking setups](https://www.twilio.com/en-us/sip-trunking/connect-anything).

We offer *unlimited* concurrent call capacity - let us worry about the scaling and the capacity while you run your business. We've also written more about [SIP Trunking](/docs/glossary/what-is-sip-trunking) if you're itching to get started or just want to learn more.

## How SIP and Twilio Can Work with Your Business

Whether you're taking the first steps towards modernizing a call center, adding additional channels of support such as WebRTC, Chat, and SMS, or looking to reduce latency and leverage our massive scale, Twilio has a solution for you.

Read about our [SIP Trunking offerings](https://www.twilio.com/en-us/sip-trunking), read about our SIP integration in our documentation, or [talk to sales](https://www.twilio.com/en-us/help/sales). We can't wait to help you build.
