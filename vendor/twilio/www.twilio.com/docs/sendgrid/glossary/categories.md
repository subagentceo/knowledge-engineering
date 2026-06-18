# Categories

*Analytics*. One or more topical tags applied to an email message that aids in analyzing email campaign effectiveness.

Each email message can include up to 10 categories. You can write whatever you want as the text label for the category.

> \[!CAUTION]
>
> Twilio treats categories as not *personally identifiable information* (PII). You can't redact or remove this data. Never place PII in this property. Twilio might use this data for operations as it runs its systems. This value may be visible to Twilio employees, stored long-term, and remain after you've left this platform.

While you can view all statistics for an email under the [**Statistics**][stats] tab, you can also filter statistics by [a particular category][stats-by-category].

## Categories and events

You can associate the following events with categories:

Twilio default events:

* Emails sent
* Emails opened
* Emails bounced
* Spam reports

Twilio feature-based events:

* [Clicks][]
* [Unsubscribes][]
* [Opens][]

The statistics depend upon which features you enable. Twilio always tracks emails sent, bounces, and spam reports.

To turn on these features, see [Tracking Settings][].

## Additional resources

* [SMTP API Categories][work-categories]

[Unsubscribes]: /docs/sendgrid/ui/account-and-settings/tracking#subscription-tracking

[Clicks]: /docs/sendgrid/ui/account-and-settings/tracking/#click-tracking

[Opens]: /docs/sendgrid/ui/account-and-settings/tracking#open-tracking

[Tracking Settings]: /docs/sendgrid/ui/account-and-settings/tracking

[stats]: /docs/sendgrid/ui/analytics-and-reporting/stats-overview

[stats-by-category]: /docs/sendgrid/ui/analytics-and-reporting/categories

[work-categories]: /docs/sendgrid/for-developers/sending-email/categories
