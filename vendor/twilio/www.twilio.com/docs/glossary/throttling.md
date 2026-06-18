# Throttling

A recipient inbox provider reduces throughput of email messages below the level at which sender mail server sent the email messages.

Recipient mail servers impose limitations to delivery rates. When you exceed these limitations, they slow your email processing. The recipient mail server has accepted all the email it wants to accept from your [IP address][ip-address] for a certain period of time. Any check of your email messages show them as [deferred][].

## Related entries

* [IP warm up][ip-warmup]
* [Block][Blocks]
* [Email Logs][]

[deferred]: /docs/glossary/deferrals

[ip-address]: /docs/glossary/ip-address

[ip-warmup]: /docs/glossary/ip-warmup

[Blocks]: /docs/glossary/blocks

[Email Logs]: /docs/email/logs
