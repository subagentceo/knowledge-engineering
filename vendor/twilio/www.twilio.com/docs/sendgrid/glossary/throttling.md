# Throttling

A recipient inbox provider reduces throughput of email messages below the level at which sender mail server sent the email messages.

Recipient mail servers impose limitations to delivery rates. When you exceed these limitations, they slow your email processing. The recipient mail server has accepted all the email it wants to accept from your [IP address][ip-address] for a certain period of time. Any check of your email messages show them as [deferred][].

To learn more about specific account sending limits, see [pricing][].

## Related entries

* [IP warm up][ip-warmup]
* [Block][Blocks]
* [Email Activity][]
* [Event Webhook][]

[deferred]: /docs/sendgrid/glossary/deferrals

[ip-address]: /docs/sendgrid/glossary/ip-address

[ip-warmup]: /docs/sendgrid/glossary/ip-warmup

[Blocks]: https://app.sendgrid.com/suppressions/blocks

[Email Activity]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed

[Event Webhook]: /docs/sendgrid/for-developers/tracking-events/event

[pricing]: https://sendgrid.com/pricing
