# Email Logs

The Email Logs product provides a centralized view of recent email activity for your account. It allows you to search, filter, and inspect individual messages to understand their delivery path and troubleshoot issues. Email Logs retains data for up to 30 days, giving you extended visibility into message-level events and outcomes.

## Filtering email logs

Email Logs includes filters to help you locate and view specific messages. Each filter supports exact string matching. Additional filter functionality will be developed and released in the future.

![Email Logs results.](https://docs-resources.prod.twilio.com/65dc20b634cd3ac023e5eb4e5967f34d9e905b022eed457ea4d19b3df2db2564.gif)

### Search by filters

The following filters are available to efficiently locate and analyze log events. Each filter supports exact-string match with specific capabilities including partial matching, autocomplete, and multi-select options:

* **Recipient Email Address**: Search for a specific recipient email address.
* **Account**: Filter by username or subuser username.
* **Subject**: Filter messages by the email's subject line.
* **Date**: Filter messages within a specific send time range using a date picker.
* **Category**: Filter by your defined category names.
* **Status**: Filter by the message's delivery outcome (e.g., received, dropped, processed, delivered, deferred, bounced, or blocked).
* **Response**: Search by the receiving server's response code or response text.
* **Message ID**: Search for a specific sg\_message\_id. This is occassionally presented as message id or msg\_id.

## Viewing email details

Selecting a message from the results list opens the Email Details page, which provides a complete view of that message's lifecycle and delivery timeline.

![Email Logs details.](https://docs-resources.prod.twilio.com/353212c3d17b62ffacc1bfbd1ee8f0da91b10bc80cf13f6912778a2c494ef98a.gif)

The page is divided into several sections:

### Header information

At the top of the page, you'll see high-level message attributes, including:

* **Message ID**: The unique sg\_message\_id for the selected message.
* **To/From**: The recipient and sender email addresses
* **Subject**: The subject line of the email.
* **Account Username**: The username that sent the message.
* **Sending IP Address**: The IP address from which the message originated.

### Event history timeline

A visual timeline displays each stage in the message's lifecycle. This describes how Twilio SendGrid processed the email, whether it was delivered to the recipient domain, and what engagement occurred on the email. A summary banner below the timeline shows the end-to-end time, which represents how long it took the email to move from initial processing to final delivery.

### Event table

Beneath the time, the Event History table lists each recorded event for that message. The events are ordered chronologically by event type. You can use the expand all events toggle to show every event in the timeline when multiple occurrences of the same event type exist.

### Event details view

Click view details next to an event to open a detailed panel showing the full JSON payload of that event. The structure and fields of this payload are designed to remain closely aligned with those delivered through the Event Webhook. While differences may occasionally exist between the two sources, ongoing efforts are made to keep their data and formats as consistent as possible to support a unified troubleshooting experience.

## Additional resources

* [Email Logs API reference](/docs/sendgrid/api-reference/email-logs/)
* [Getting started with the Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook/)
* [Event Webhook overview](/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview/)
