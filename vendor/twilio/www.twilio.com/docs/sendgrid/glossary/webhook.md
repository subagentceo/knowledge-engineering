# Webhook

*Analytics*.

An event-driven communication that sends data between apps using custom HTTP `POST` request to a URL.

To handle event-driven data communications between two apps, webhooks have replaced API requests. Rather than an outside app making requests your API on a regular cadence to see if something changed, your app sends a notification when something changes. This has led to webhooks being called "Reverse APIs".

To implement a webhook:

1. You add an API to your app.
2. The API includes a webhook property that points to a URL for a different web app.
3. A user of your app does something that triggers an event.
4. The API sends data received from that event to the webhook URL you specified.
5. The app returns the result of the webhook.

## Webhooks in Twilio SendGrid

Twilio SendGrid uses three types of webhooks:

* **Push Webhooks**: Allows users to receive data in real time.
* **Pipe Webhook**: Allows the users to receive data in real time and code it and take certain actions based on event triggers.
* **Plugin Webhooks**: Enhance the capabilities of the platforms on both the sending and receiving level. This allows the sharing of data in a two-way relationship.

### Event webhook

The [Event Webhook][] combines the push, pipe, and plugin capabilities. The Event Webhook sends notifications about events that occur with your email in the Twilio SendGrid platform. The Event Webhook captures email-specific data related to unsubscribes, spam reports, bounced emails, and response data, and reports them in the manner in which you specify.

### Parse webhook

The [Parse Webhook][] parses the contents and attachments of messages. Using Parse Webhook, a Twilio SendGrid user can post blog articles or receive uploads from email replies. The webhook `POST` the parsed portions of the email to a user-specified URL.

## Related resources

* [SMTP API](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/)
* [Web API](/docs/sendgrid/api-reference/)
* [Marketing Email API](https://sendgrid.com/email-marketing)
* [Template Engine API](https://sendgrid.com/transactional-email)

[Parse Webhook]: /docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook

[Event Webhook]: /docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook
