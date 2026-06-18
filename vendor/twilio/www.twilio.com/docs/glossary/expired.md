# Expired

*Email Deliverability*. When an [SMTP server][] can't deliver an email message to a recipient within 72 hours, Twilio Email removes their email address from a contact list. Before this duration expires, Twilio Email [defers][deferred] email messages.

This error displays as `Bounced - Expired`.

[Bounced][bounces] email responses derive from Simple Mail Transfer Protocol (SMTP) `4XX` or `5XX` errors, which cause an email to be undeliverable:

* An expired, inactive, or disabled recipient address
* The recipient's mailbox has exceeded its limit
* An incorrect recipient email address
* Domain frequency limited
* Connection frequency limited
* IP frequency limited
* Too many invalid recipients

[bounces]: /docs/glossary/bounces

[deferred]: /docs/glossary/deferrals

[SMTP server]: /docs/glossary/smtp-server
