# Encrypt with TLS

To transmit secured, authenticated, and verified communications between two or more systems, Twilio SendGrid uses the symmetric cryptography of the [Transport Layer Security (TLS)][tls].

Four RFCs define TLS:

* v1.0 in [RFC 2246][rfc2246]
* v1.1 in [RFC 4346][rfc4346]
* v1.2 in [RFC 5246][rfc5246]
* v1.3 in [RFC 8446][rfc8446]

When attempting to deliver email, Twilio SendGrid opportunistically tries outbound [TLS v1.1][rfc4346] or later.

If your recipient's email server accepts a inbound connection using TLS v1.1 or later, Twilio SendGrid encrypts then delivers the email message between systems. If the server doesn't support TLS, Twilio delivers the message unencrypted.

Twilio also lets you *enforce TLS encryption* when attempting deliver email to your recipients. The [Enforced TLS][] feature specifies whether or not the recipient must support TLS v1.1 or later or have a valid certificate.

[Enforced TLS]: /docs/sendgrid/for-developers/sending-email/enforced-tls

[tls]: /docs/glossary/what-is-transport-layer-security-tls

[rfc2246]: https://datatracker.ietf.org/doc/html/rfc2246

[rfc4346]: https://datatracker.ietf.org/doc/html/rfc4346

[rfc5246]: https://datatracker.ietf.org/doc/html/rfc5246

[rfc8446]: https://datatracker.ietf.org/doc/html/rfc8446
