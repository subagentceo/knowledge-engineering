# Inbound Call Processing

Whenever Twilio receives a call to one of your Twilio phone numbers, the call is routed to a [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions), where it is processed. Let's take a closer look at how this works.

Imagine that a customer calls your Twilio phone number. The call first arrives at Twilio via one of our [Edge Locations](/docs/global-infrastructure/understanding-edge-locations). The Edge's job is to send the call to a Twilio Region for handling. To determine which destination Region to target, the Edge looks up the phone number in a globally distributed routing table. The Edge then sends the call to the destination Region for handling.

When the call arrives at the destination Region, Twilio services within the Region perform all of the necessary processing and storage operations to carry out the call handling:

1. Look up the number's current configuration to find the webhook URL
2. Make a request to the webhook URL
3. Read TwiML instructions from the response
4. Carry out any actions specified by the TwiML instructions
5. Store Call metadata and any associated data (e.g. recordings, transcriptions)

All of these steps happen within the Twilio Region that the Edge sent the call to.

Note that each Region has its own dedicated configuration record for each of your phone numbers. Thus, your phone number might be configured with a different webhook URL in IE1 than it is in US1, for example. In this case, the URL that is used during processing depends on which of the two Regions ends up handling the call. To control which Region handles incoming calls to a Twilio phone number, you can set the number's routing Region, as described below.

## Setting your phone number's routing Region

When a phone number is originally purchased, an initial routing Region is set. The initial Region is chosen based on the context of how the number was purchased (e.g. via Twilio Console, or REST API).

You can view or change the routing Region of your phone number at any time via the Twilio Console or REST API. See [this guide](/docs/global-infrastructure/inbound-processing-console) for instructions using Twilio Console, or see [this guide](/docs/global-infrastructure/inbound-processing-api) for instructions using the REST API.

Note that routing changes can take up to 5 minutes to take effect.
