# Open & Unique Open

*Analytics*. The record of each time a customer opens your Twilio SendGrid email messages. To track opens, turn on [open tracking][open-tracking].

## Open tracking in Twilio SendGrid

When turned on, Twilio SendGrid inserts a small, transparent image into all emails. When a customer reads an email, their [Mail User Agent (MUA)][mua] loads the tracking image. Twilio SendGrid then registers the open event.

In [Statistics][] the "opens percentage" is the total number of times your users opened your emails, divided by the total number of Delivered messages.

The "Unique opens" percentage is the number of unique individuals that have opened your emails, divided by the total number of Delivered messages.

Twilio stores unique open events for up to seven days.

## Limitations of image tracking

Not all email clients display images without enabling that feature. By not loading images, email clients hope to protect your security, privacy, and bandwidth.

Apple Mail does load images without configuration.

To view images by default, the following email clients require changing a setting:

* Microsoft Outlook
* Microsoft Office365
* Mozilla Thunderbird
* Gmail

This means recipients might have received a message and opened it, but never be counted as having opened it.

[Statistics]: /docs/sendgrid/ui/analytics-and-reporting/stats-overview

[open-tracking]: /docs/sendgrid/ui/account-and-settings/tracking#open-tracking

[mua]: /docs/sendgrid/glossary/mua
