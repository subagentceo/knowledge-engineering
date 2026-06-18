# What is Direct Inward Dialing (DID)?

Direct Inward Dialing (DID) is a telephone service that allows a phone number to ring through directly to a specific phone at a business instead of going to a menu or a queue and needing to dial an extension. A phone number that is used like this is often called a "DID" (and multiple numbers are called "DIDs").

There are 2 ways to get DID-like functionality with Twilio [Phone Numbers](/en-us/phone-numbers), via a SIP trunk, and with SIP registration.

## **DIDs with SIP Trunking**

You can connect a Twilio [SIP Trunk](/en-us/sip-trunking) to your PBX. When a call comes in to Twilio to any of your phone numbers Twilio will send the call to your PBX over the SIP Trunk. Your PBX can then route the call to an extension based on the number dialed.

![Diagram showing call flow through an elastic SIP trunk to cloud and phone endpoints.](https://docs-resources.prod.twilio.com/3489396fecc4915e00efd683c59fc2c85472efee201e7bd7a932902c448db108.png)

List the [SIP configuration guides section](/docs/sip-trunking/sample-configuration) of the docs to get step-by-step instructions.

## **DIDs with SIP Registration**

Using Twilio [SIP Registration](/en-us/voice/sip-registration) you can connect a call directly to a VoIP desk phone or soft phone. When a call comes in to Twilio to your phone number, Twilio will send it directly to your SIP registered endpoint.

![Diagram showing SIP registration connecting PSTN to SIP endpoints via Twilio.](https://docs-resources.prod.twilio.com/16403e2181b37ed93c64d06f81161a5738edcfab54a23bf40711e902379d0078.png)

See [documentation for registering a SIP endpoint](/docs/voice/api/sip-registration) on Twilio.
