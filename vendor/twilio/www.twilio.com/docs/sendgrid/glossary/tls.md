# Transport Layer Security (TLS)

*Internet Security*, *Internet Standard*. The set of rules that encrypts internet traffic between systems. This protocol is defined in [RFC 8446][rfc8446]. It replaces the Secure Sockets Layer (SSL) protocol. When someone says or writes SSL, take it that they mean [Transport Layer Security (TLS)][tls].

TLS encrypts data in transit over the internet. TLS has no understanding of the data encrypted, so it works with email, web, and other internet traffic.

1. The sending server requests a secure connection with the recipient system, a client or a server.
2. The recipient system provides a list of encryption cipher suites it supports.
3. The sending server picks one from the list that it also supports and informs the recipient system.
4. The sender server provides the recipient system with its [public-key certificate][pkc].
5. The certificate identifies the sending server and the recipient system validates the identity.
6. Once validated, the servers create a session key, an encryption key only valid for the specific transfer between these two servers, and begins the secured connection.

Twilio SendGrid encrypts your email from your end point all the way to the recipient with either its [SMTP][smtp] or the [Twilio Web API][].

## Related resources

* [Future of Email Security](https://sendgrid.com/blog/sendgrid-and-the-future-of-email-security/).
* [Web API vs. SMTP for Sending Email](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/web-api-vs-smtp)
* [What is an SMTP server](https://www.twilio.com/en-us/blog/insights/what-is-an-smtp-server?)

[Twilio Web API]: /docs/sendgrid/api-reference/mail-send/mail-send

[smtp]: /docs/sendgrid/glossary/smtp

[tls]: https://en.wikipedia.org/wiki/Transport_Layer_Security

[rfc8446]: https://datatracker.ietf.org/doc/html/rfc8446

[pkc]: https://en.wikipedia.org/wiki/Public_key_certificate
