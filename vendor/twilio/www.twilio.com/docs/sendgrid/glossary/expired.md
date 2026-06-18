# Expired

*Email Deliverability*. The removal of recipient email address from a contact list when an [SMTP server][] couldn't deliver an email message to the recipient within 72 hours. Before this duration expires, email messages are [deferred][].

This error displays as `Bounced - Expired`.

[Bounced][bounces] email responses derive from SMTP `4XX` or `5XX` errors, which cause an email to be undeliverable:

* An expired, inactive, or disabled recipient address
* The recipient's mailbox has exceeded its limit
* An incorrect recipient email address
* Domain frequency limited
* Connection frequency limited
* IP frequency limited
* Too many invalid recipients

## Additional resources

* [Retrieve and Edit your List of Bounces](/docs/sendgrid/api-reference/bounces-api/retrieve-all-bounces)
* [Email Activity & Bounces](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed/)

[bounces]: /docs/sendgrid/glossary/bounces

[blocks]: /docs/sendgrid/glossary/blocks

[deferred]: /docs/sendgrid/glossary/deferrals

[SMTP server]: /docs/sendgrid/glossary/smtp-server
