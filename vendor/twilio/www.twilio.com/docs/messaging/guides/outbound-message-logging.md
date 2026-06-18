# Best Practices for Messaging Delivery Status Logging

Financial regulations require some companies to maintain a record of all communications, including unsuccessful attempts.

This best practices documentation focuses on logging for mobile-terminated or outbound messaging, but the process is similar for inbound messaging using Twilio-supported [Messaging Channels](/docs/messaging/channels), but the process is similar for inbound messaging.

## How Twilio Message delivery status works

When you first make a request to the Programmable Messaging API, Twilio responds synchronously with either a 200 (success) or a 400 (failure) HTTP status code. If the request was successful, Twilio returns the [Message SID](https://help.twilio.com/hc/en-us/articles/223134387-What-is-a-Message-SID-) in the response.

The Message SID is your record that an outbound message was created. Twilio recommends that you store this Message SID along with the [initial status of the message](/docs/messaging/guides/outbound-message-status-in-status-callbacks#initial-status-of-a-message-resource) at the time Twilio returned the Message SID to you.

### Twilio's response to your outbound Message request

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Join Earth's mightiest heroes. Like Kevin Bacon.",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}
```

### Message statuses

Your outbound message changes status throughout its lifecycle - from creation, through sending, to delivery, and even read receipt for supporting messaging channels.

See the [complete list of Message Status](/docs/messaging/api/message-resource#message-status-values) values for an explanation of each status.

There are two ways for a user to receive message status updates:

* [Poll the API](#poll-the-api)
* [Receive a Status Callback](#receive-a-status-callback)

### Poll the API

At any point after a successful message creation, you can make a `GET` request to the **Programmable Messaging API** using the Message SID to determine the status of the message. Twilio returns the message record including the message status.

See [Fetch a Message Resource](/docs/messaging/api/message-resource#fetch-a-message-resource) for request details and a sample response which includes the message status. This works fine for small-volume use cases and ad hoc analysis but for large-scale logging, you should use **status callbacks**.

### Receive a status callback

Twilio status callbacks allow you to track message status changes for outbound messages.

[Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks) provides details on the expected transitions between message status values and for which status changes Twilio sends status callbacks.

You can follow our guide on [tracking the message status of outbound messages](/docs/messaging/guides/track-outbound-message-status) for a foundational understanding of how to use these status callbacks.

### Sample status callback

#### Example Callback for Status 'Delivered'

```bash
MessageStatus: delivered
MessageSid: SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MessagingServiceSid: MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AccountSid: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
From: +16232320112
ApiVersion: 2010-04-01
To: +15622089096
SmsStatus: delivered
SmsSid: SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

The Programmable Messaging API's raw response may appear different from the above example.

### High-volume callback data storage using Twilio Functions

For customers sending millions of messages in a given day, handling a high volume of callbacks can present an operational risk. Imagine sending 10 million messages and receiving 20 million callbacks. Using Twilio Functions, you can configure your status callback endpoint to write proactively to an external location such as AWS for post processing later.

Twilio Functions have the same reliability as other Twilio platform capabilities. For using Twilio Functions at scale, see [Twilio Serverless Status Callback Handler built in AWS](https://www.twilio.com/blog/serverless-twilio-status-callback-aws)

## Recommendations for maintaining messaging records

* Record the relevant message details in persistent storage.
* Update messages with the status and associated Message SID once known (whether you're using polling or status callbacks. [Twilio recommends using Status Callbacks](/docs/messaging/guides/track-outbound-message-status)). This persistent data store becomes the record of whether a message was sent successfully or not.
* If a message status hasn't been updated to `delivered` or `undelivered` within 12 hours, make a polling request to the Programmable Messaging API to retrieve the status of the message based on the Message SID. It is possible that the status callback was not received.
* It is always best practice to **reconcile message statuses at least once a day** to verify that no status events have been missed. Additionally, as part of the reconciliation process Twilio can return a [list of all messages SIDs](/docs/messaging/api/message-resource) for a given time frame. See this Support article for details on [Exporting SMS Logs](https://help.twilio.com/hc/en-us/articles/223183588-Exporting-SMS-and-Call-Logs) in bulk.

  This list of SIDs can be used to determine if any messages got created during the sync phase for which no Message SID was returned. You can use the message envelope details like the message timestamp and recipient phone number (`To`) to find matching messages in your store that are missing these SIDs. If you're redacting data, the last 4 digits of the recipient phone number may be removed, but the remaining digits may be enough to match the SIDs appropriately.

## Sending additional message identifiers

While a message returns the Twilio-defined SID by default, you may add more identifiers as URL query parameters when setting your status callback programmatically.

> \[!NOTE]
>
> For debugging purposes, you can also subscribe to the [Twilio debugger webhook](https://www.twilio.com/blog/real-time-visibility-into-application-errors-with-the-debugger-webhook.html) and get notified immediately when errors with your messages occur.

## References & additional tools

1. [Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks)
2. [Track the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status)
3. Help Center article on [Exporting SMS and Call Logs](https://help.twilio.com/hc/en-us/articles/223183588-Exporting-SMS-and-Call-Logs)
4. [API Guide for the Message Resource](/docs/messaging/api/message-resource)
5. Help Center article on [Twilio Serverless Status Callback Handler built in AWS](https://www.twilio.com/blog/serverless-twilio-status-callback-aws)
