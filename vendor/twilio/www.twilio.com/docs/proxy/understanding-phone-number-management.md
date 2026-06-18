# Phone Number Management

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

In this guide, we provide details and background information on how Proxy manages phone numbers and selects them from the number pool. If you just want to get started working with Proxy, head over to [the quickstart](/docs/proxy/quickstart).

For masked communications between two participants, Proxy relies on the concept of **Sessions**.

Sessions are Twilio's pairings of two individuals. A Session doesn't just wrap up a single voice call or SMS message - rather, it contains all the calls and messages for the given pair of numbers.

The following diagram shows a Session with two numbers wrapping up two SMS conversations and a Voice call.

![Communication flow between customer and delivery driver via SMS and call within a session circle.](https://docs-resources.prod.twilio.com/a81b36bfa101c07bdfde2cf68e21222d4e8653c1f9a77a61808761f03d1a87ff.png)

Behind the scenes, Proxy intelligently manages phone number selection from your number pool. Let's walk through the example of a delivery service to understand how Proxy handles proxied numbers.

> \[!WARNING]
>
> Different numbers in different countries will vary by capabilities; numbers
> which support multiple capabilities can have different conversation types in
> the same session.

## Fill the Proxy phone number pool

We first create our [Proxy service](/docs/proxy/api/service), and add two Twilio [phone numbers](/docs/proxy/api/phone-number) to it:

* \#1-415-555-1212
* \#1-415-555-3434

Both of these numbers have voice and messaging capabilities.

## Make our first delivery

Coming back to the example of using Proxy to mediate between customer and provider, imagine that the customer requests a new delivery. We will create a [Proxy Session](/docs/proxy/api/session) to handle this.

Here are the steps Proxy runs through:

* We receive the customer's phone number and the driver's phone number so that they can communicate over SMS and Voice channels.
* Proxy realizes a Twilio number is needed to proxy communications, so it retrieves one from the phone number pool associated with Proxy.
* Both the driver and passenger are now paired and both receive a Proxy number to communicate.
* Customer A and Driver X are matched via Twilio Proxy number #1-415-555-1212.

![Diagram showing proxy number 1-415-555-1212 between Customer A and Driver X.](https://docs-resources.prod.twilio.com/e65d51ffa3bc7ef8eca755d96c72664d987c3a9aff08d6cfe9bb5c216c944fab.png)

## Make our second delivery

A second delivery is created in our system and we create a second [Proxy Session](/docs/proxy/api/session). It's a different customer and different driver, so Proxy can re-use the number used in the first delivery.

From our first delivery session which is still ongoing:

* Customer A is matched to Session 1 as \[Customer A's phone number, Twilio Proxy number #1-415-555-1212]
* Driver X is matched to Session 1 as \[Driver X's phone number, Twilio Proxy number #1-415-555-1212]

For our second delivery session, the following happens:

* Customer B is matched to Session 2 as \[Customer B's phone number, Twilio Proxy number #1-415-555-1212]
* Driver Y is matched to Session 2 as \[Driver Y's phone number, Twilio Proxy number #1-415-555-1212]

![Customer B and Driver Y use the same proxy number 1-415-555-1212.](https://docs-resources.prod.twilio.com/bc234b543486830bde0c26fdff5039bc32f69847d53d112525e290d1010eb657.png)

Proxy can re-use the same Twilio number for this masked communication because it is still able to identify both participants uniquely.

## Make our third delivery

A third delivery is created in our system, and now it is Customer C being paired with Driver X. Proxy knows that Driver X already has a session ongoing (Session 1) so it needs to be careful about number allocation.

Here's how Proxy manages this complexity:

* Customer C is added as a participant. They have no other deliveries, so can be allocated #1-415-555-1212.
* Driver X already has an ongoing delivery (Session 1) so if they were allocated #1-415-555-1212 as their Proxy number, conversations would merge and cause serious confusion.
* Proxy knows this, so it will allocate a different number (#1-415-555-3434) to Driver X.

![Customer C and Driver X require new proxy number for communication via Twilio.](https://docs-resources.prod.twilio.com/5038625093f43cd0af9fdc26420f43277b6e2f1104d56ad39260a898282496f1.png)

Note how Driver X now has two different numbers assigned internally to the service. This abstraction makes it so that when Driver X makes/receives texts or calls originating from Customer C, they are from a separate number to his other customers (Customer A in this example).

Proxy thus manages the complexity of 3 deliveries across 3 customers with 2 drivers with only 2 phone numbers.

## More complexity: other reasons for multiple phone number allocations

With Proxy, both participants in the session don't have to use the same Proxy number. For example, if customer D is roaming on a UK phone number, and Driver Z is on a US phone number, the pairing may actually be:

* Customer D is matched to Session 4 as \[Customer D's UK phone number, Twilio Proxy UK number #44-87-000-1234]
* Driver Z is matched to Session 4 as \[Driver Z's US phone number, Twilio Proxy US number #1-415-555-3434]

This means that customer D won't have any trouble sending SMS messages to a UK number, but they will still be proxied through to reach Driver Z on a US number.

## Intelligent allocation of phone numbers

Proxy attempts to optimize phone number allocation for many use cases and prioritizes:

* Using your number pool as efficiently as possible
* Avoiding *any* possibility of a collision where conversations 'merge' the wrong participants
* Load balancing across numbers for high-scale use cases
* Selecting numbers appropriate to end-user capabilities and conversation types

## Geo match options in Proxy

When presented with an end users phone number, Proxy will only match that number to a Twilio number in the same country. This is to ensure that routing between an end user's number and a Twilio number will always succeed. Beyond that, Proxy allows a number of configuration options on the [Service](/docs/proxy/api/service) with the parameter **GeoMatchLevel**.

|                      |                                                                                                                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Country**          | Default. End-user numbers will only match with a same-country Twilio number\*. For example, if you have US and UK users, they will each be assigned a number from their country.<br />\*See Country Code matching for more information |
| **AreaCode**         | Require numbers to match exactly to local area codes for users in North America. This option is ignored for users outside North America.                                                                                               |
| **ExtendedAreaCode** | Require numbers to match to extended area codes.                                                                                                                                                                                       |

## Country Code Matching Mode

For Proxy Services configured with "Geo Match Level" option "Country", Proxy assigns any number from the pool that matches the Participants phone number's (Identifier) dialing code.

However, in cases where multiple countries share a dialing code, Proxy assigns the Participants numbers from countries that share the dialing code. For example, Great Britain and its outlying islands share a dialing code but have different country codes; Proxy will match participants in this area to GB numbers. In other cases, such as for islands outside the US, where we do not have Twilio numbers available, participants may be matched to US Twilio numbers. See table below for more all countries. Toll charges may apply. For further information contact Proxy support.

| Participant Country                                                                                                                                                                                                                       | Proxy Number Country                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Antigua and Barbuda (AG) (+1 268) Anguilla (AI) (+1 264) Bermuda (BM) (+1 441) Bahamas (BS) (+1 242) Montserrat (MS) (+1 664) Turks and Caicos Islands (TC) (+1 649) British Virgin Islands (VG) (+1 284) US Virgin Islands (VI) (+1 340) | US                                                                                                     |
| Great Britain (GB) (+44), Guernsey (GG) (+44 1481), Isle of Man (IM) (+44 1624) Jersey (JE) (+44 1534)                                                                                                                                    | Great Britain (GB) (+44), Guernsey (GG) (+44 1481), Isle of Man (IM) (+44 1624) Jersey (JE) (+44 1534) |

For more information about Twilio international number availability and capabilities prefer to: [Twilio international phone number availability and their capabilities](https://help.twilio.com/hc/en-us/articles/223183068-Twilio-international-phone-number-availability-and-their-capabilities)

## Number selection behavior options in Proxy

Proxy provides two number selection "styles". These are configurable on the [Service](/docs/proxy/api/service). The two settings are **PreferSticky** (default) and **AvoidSticky**.

**PreferSticky** means that Proxy will try and select the same number for a given participant if they have previous sessions but will select another number if that number cannot be used. This is useful for ridesharing like use cases, where there are low concurrent sessions, and you want drivers to see the same number when interacting with your service as much as possible.

**AvoidSticky** means that we will try to use different phone numbers as long as that is possible within a given pool rather than try and use the same. This is useful where you want users to see a different number when matched with different people as much as possible.

## Proxy behavior in Argentina

Argentina requires a '9' to be inserted between country code and local number for calls to mobile numbers but it is not required and should not be inserted for sending SMS'. For example, given the mobile number +54 223 123-4567, +54 **9** 223 123-4567 must be set for voice calls but +54 223 123-4567 must be used to send out an SMS.

When setting the phone number (Identifier) for a Participant, do not insert the '9'. For example, +542231234567.

Proxy has a smart '9' insertion mechanism that is not enabled by default. If you are having issues with dialing and/or messaging Argentina numbers, [contact Twilio Support](https://help.twilio.com) to enable this feature.

## Proxy behavior in Mexico

Until October, 2019, mobile operators in Mexico required a '1' to be inserted between country code and local number when placing a call or sending a message to a Mexico mobile number.

For Services with active Mexico traffic created prior to October 5th, 2020, Proxy performs this insertion by default. For Services created after this date, Proxy does not perform this insertion.

When setting the phone number (Identifier) for a Participant, do not insert the '1'. For example, "+525512345678".

If your service was created before October 5th, 2020 and you encounter issues with reaching Mexico numbers, [contact Twilio Support](https://help.twilio.com) to disable the legacy behavior that defaulted to inserting the '1'.

## How many phone numbers do I need?

We have a whole guide on that question, which you can find here: [How many numbers do I need?](/docs/proxy/phone-numbers-needed)

Hopefully, you now have a better understanding of how Proxy manages phone numbers in your pool of Twilio phone numbers and assigns them to the parties in your masked communications channels.

If you still have questions, reach out to [Twilio Support](https://help.twilio.com).
