# Using the Reserved Numbers and Auto-Create functionalities to support the "online directory" scenarios

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

The [auto-create functionality](/docs/proxy/out-session-callback-response-guide) of the [Out Of Session callback webhook](/docs/proxy/api/webhooks#outofsessioncallbackurl) and the [Reserved functionality](/docs/proxy/reserved-phone-numbers) for the Phone Numbers can be used in conjunction to implement a solution for the special - but rather frequent - use cases where businesses need to display a Phone Number forwarding all incoming calls/texts to a specific person and don't know who will contact it. In the typical Proxy scenarios, you know in advance who both the Participants of your Proxy Session will be. In this case, you only have half of the needed information; you have the destination endpoint, but you still don't know who will be the customer calling in.

Let's use the example below to show how the auto-create functionality of the Out Of Session callback webhook and the Reserved functionality for the Phone Numbers.

Let's assume there is a site called ShoppingPlace.com where people can post items for sale and other people can purchase them. One feature that the seller wants is for the two parties to be able to correspond by text or call *without giving out personal Phone Numbers*. At the same time, sellers might want their customers to always use the same Phone Number to contact them. Here's what ShoppingPlace.com should do.

1. Create a Proxy Service and mark a set of Phone Numbers from the pool as "reserved". More specifically, as many Phone Numbers as the number of Sellers on the platform.
2. Within their internal system, record the association between each Seller and a specific Reserved Phone Number.
   * Let's assume that there are two Sellers:
     1. Tom (private Phone Number +1 415-234-5555) - with reserved Phone Number +1 415-111-1111
     2. Beth (private Phone Number +1 209-987-6666) - with reserved Phone Number +1 209-222-2222
3. Publish the reserved Phone Numbers (+1 415-111-1111 and +1 209-222-2222) on the platform so that buyers can text or call those Phone Numbers to enquire about items with Tom or Beth.
4. Specify an Out of Session Callback Url in their Proxy Service's configuration to tell Proxy what to do in case no Sessions are found when a new call/text is hitting a Proxy Phone Number. The Out of Session Callback Url should point to a service owned by ShoppingPlace.com which, when hit with a `POST` request, will return an auto-create JSON response payload to tell Proxy what to do.
5. In this case, ShoppingPlace.com doesn't know in advance which buyers will be interested and cannot create the session before the buyer texts in. For this reason, ShoppingPlace.com wants Proxy to automatically create a Session with any new buyers reaching out to the Proxy Numbers +1 415-111-1111 / +1 209-222-2222 and Tom / Beth respectively.
6. Let's assume a new buyer (+1 415-111-5555) for Tom is calling in +1 415-111-1111. Proxy figures out that the buyer and Tom are not in a session. Proxy hits the Out of Session Callback Url configured on the Proxy Service. The Out of Session JSON payload returned would look something like the example below.

```json title="Sample auto-create session JSON for Proxy"
{
  "uniqueName": "autoCreatedSession23423",
  "ttl": 3360,
  "mode": "voice-and-message",
  "participantIdentifier": "+14152345555"
}
```

This tells Proxy to:

1. Create a voice and message capable Session named "autoCreatedSession23423" that will expire in 3360 seconds (or 3360 seconds after the last interaction between the seller and buyer).
2. Add the buyer as a Participant to the Session (Proxy has the buyer's Phone Number because they initiated the interaction) with the Proxy Identifier as the Reserved Phone Number +1 415-111-1111 (which is the Proxy Phone Number published on the website and associated to Tom).
3. Add Tom as the second Participant using Tom's private number (+1 415-234-5555) as the Identifier and allowing Proxy to select an unreserved Phone Number from the Proxy pool as the seller's Proxy Identifier.

Note that mapping (recorded into ShoppingPlace.com database) between Tom and the reserved Proxy Phone Number +1 415-111-1111 doesn't mean that Tom's Proxy Identifier is +1 415-111-1111.

Now that Proxy has created the Session with the desired Participants, it can forward the message or call just as it would have if the Session had been pre-created. Now that there is a Session with the correct Participants, the buyer and seller can go on corresponding via masked communication.
