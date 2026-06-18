# Sender ID

*Internet Security*. A deprecated email authentication standard that checked that a domain authorized a given email address to send on its behalf. [RFC 4406][rfc4406] defines this standard.

This standard fell out of favor for two reasons:

* It relies on a [Purported Responsible Address (PRA)][pra] in the email [header][]. [RFC 4407][rfc4407] defined this standard. The PRA conflicted with existing email forwarding and mailing list mechanism and caused [deliverability][] issues.
* Microsoft owned the patents for key parts of the standard. That was incompatible with many open source licenses.

To authenticate email, organizations moved on to [domain authentication][domain-authentication].

To learn more, see the Twilio [Email Infrastructure Guide][].

[Email Infrastructure Guide]: https://www.twilio.com/en-us/resource-center/the-email-infrastructure-guide-build-it-or-buy-it

[deliverability]: /docs/sendgrid/glossary/deliverability

[domain-authentication]: /docs/sendgrid/glossary/domain-authentication

[header]: /docs/sendgrid/glossary/header

[pra]: https://datatracker.ietf.org/doc/html/rfc4407#section-2

[rfc4406]: https://datatracker.ietf.org/doc/html/rfc4406

[rfc4407]: https://datatracker.ietf.org/doc/html/rfc4407
