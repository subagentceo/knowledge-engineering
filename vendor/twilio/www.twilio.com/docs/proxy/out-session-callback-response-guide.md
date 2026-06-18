# Out-of-Session Callback Response Guide

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

It often happens that Proxy receives messages and calls to Proxy numbers in your numbers pool that are not from a Participant in an Open Session. When that happens, if your Proxy Service has an Out of Session Callback Url specified, Proxy will [forward that inbound payload to you](/docs/proxy/api/webhooks#outofsessioncallbackurl), along with any information we may have as to previous Sessions for the caller/sender.

There are two types of responses you can return to customize your customer's experience:

1. Valid TwiML, with the `Content-Type` response header set to `application/xml`
2. Valid Auto-create session JSON, with the `Content-Type` response header set to `application/json`

## TwiML

The ability to return [TwiML for Programmable Voice](/docs/voice/twiml) and [TwiML for Programmable SMS](/docs/messaging/twiml) allows you to customize the out-of-session caller/sender experience by enabling you to respond with custom [\<Play>](/docs/voice/twiml/play), [\<Say>](/docs/voice/twiml/say), [\<Message>](/docs/messaging/twiml/message) and other verbs.

## Auto-create session JSON

If you determine, based on the information included in the callback payload, that the caller/sender should be connected to a particular Agent (Agent X), you can respond with json that tells Proxy to create a Session between the caller/sender and Agent X. Proxy will create the Session and Participants and will then proceed as if the caller/sender had reached an open Session.

**Auto-Create Session Fields**

| **Field**                    | **Description**                                                                         | **Required**                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `uniqueName`                 | The Unique Name for the Session. Should NOT include PII.                                | No                                                                                    |
| `mode`                       | The Session mode (message-only, voice-only, or voice-and-message)                       | No. Based on your Participants, Proxy will try to make an intelligent choice of mode. |
| `ttl`                        | TTL, in seconds, after which Session should expire, if any                              | No. Does not default to any value.                                                    |
| `dateExpiry`                 | Date/Time at which Session should expire, if any                                        | No. Does not default to any value.                                                    |
| `participantIdentifier`      | Real Phone Number of the second Participant (e.g., your agent)                          | Yes                                                                                   |
| `participantProxyIdentifier` | Proxy Identifier to use for second Participant (e.g., a Reserved Number from your pool) | No. Proxy will choose a non-Reserved number from the pool if not specified.           |

```json title="Sample auto-create session JSON for Proxy"
{
  "uniqueName": "autoCreatedSession23423",
  "ttl": 3360,
  "mode": "voice-and-message",
  "participantIdentifier": "+14152345555"
}
```
