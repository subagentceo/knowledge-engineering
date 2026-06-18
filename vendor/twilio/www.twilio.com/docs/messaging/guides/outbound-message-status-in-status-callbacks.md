# Outbound Message Status in Status Callbacks

Message status changes occur throughout the lifecycle of an outbound message from creation, through sending, to delivery, and even read receipt for supporting messaging channels.

Twilio allows you to programmatically [track these status changes for outbound messages](/docs/messaging/guides/track-outbound-message-status) sent with [Programmable Messaging](/docs/messaging) through the use of [status callbacks](/docs/usage/webhooks/messaging-webhooks).

This guide explains for which changes in outbound message status Twilio sends status callback requests.

The provided information applies to:

* Outbound messages created using the [Message Resource](/docs/messaging/api/message-resource) of the [Programmable Messaging REST API](/docs/messaging/api)
* [Outbound TwiML-generated messages](/docs/messaging/twiml/message).

If your use case involves the sending of high volumes of messages or message scheduling, you may use a [Messaging Service](/docs/messaging/services). Use of a Messaging Service has implications for the relevant message status changes as described in the following sections.

## Initial status of a Message resource

When you [create a Message resource for an outbound message](/docs/messaging/api/message-resource#create-a-message-resource), it is created with an *initial* `status` value.

The following two tables show this initial `status` value, depending on how you created the Message:

| **Message created *without* a Messaging Service:** |
| -------------------------------------------------- |
| `queued`                                           |

| **Message created *with* a Messaging Service**    |                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| for immediate sending (non-scheduled): `accepted` | for [scheduled sending](/docs/messaging/features/message-scheduling) at a later time: `scheduled` |

> \[!WARNING]
>
> A status callback request is *not* sent for the *initial* `status` of a newly created Message resource.
>
> If you use the REST API to create the Message Resource, you can obtain the *initial* `status` value from the API response to the create action.

## Message status changes triggering status callback requests

Twilio sends status callback requests when the Message resource's `status` changes after creation.

The diagram below shows the `status` transitions of outbound messages for which Twilio sends a status callback request. The Message resource API Reference contains the [full list of possible status values and their descriptions](/docs/messaging/api/message-resource#message-status-values).

![Flowchart of message status from sending to read, including queued, sent, delivered, and failed stages.](https://docs-resources.prod.twilio.com/acf299187d1cf48abb5f1e353d44f1dd5a9c6d0e7aa4c03e454e39266acc2e04.png)

If you used a Messaging Service to create the message, then

* An `accepted` (non-scheduled) or `scheduled` message transitions to `queued` status once the following two conditions are met:

  * A non-scheduled message is ready to be sent or a scheduled message's `SendAt` time has been reached.
  * The Messaging Service has dynamically determined the optimal sender from its Sender Pool or, otherwise, you explicitly provided a `From` sender out of the Messaging Service's Sender Pool on Message creation.
* A resulting status callback request is emitted with status `queued`.
* A `scheduled` message can be canceled before its `SendAt` time. In this case a status callback request is emitted with status `canceled.`

After queuing, Twilio sends status callback requests as follows, regardless of how the message was created,

* If sending is successful: `sent`, otherwise `failed`
* If delivery is successful: `delivered`, otherwise `undelivered`

If the messaging channel through which the message was sent supports read receipts, the Message resource may finally reach `read` status, provided the message recipient has read receipts enabled on their device *(currently RCS and WhatsApp)*.

## What's next?

Now that you know when Twilio sends status callback requests triggered by outbound message status changes, check out the following resources:

* Read our guide [Track the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status) for the fundamentals of how to work with these status callbacks.
* Read our guide [Best Practices for Messaging Delivery Status Logging](/docs/messaging/guides/outbound-message-logging) for advanced considerations when implementing a production-grade status logging solution.
