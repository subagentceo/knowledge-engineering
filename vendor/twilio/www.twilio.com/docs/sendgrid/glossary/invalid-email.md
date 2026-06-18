# Invalid Email

*Email Deliverability*. The removal of recipient email address that doesn't conform to the [Internet Engineering Task Force (IETF)](https://www.ietf.org/) email address syntax standards from a contact list.

This error displays as `Bounced - Invalid Email`.

Twilio retains reports of invalid email addresses for 30 days.

## Email syntax

The IETF set the syntax for email addresses in three Requests for Comment (RFC): RFC 3696, RFC 5321, and RFC 5322.

These RFCs consider an email address [invalid](/docs/sendgrid/ui/sending-email/invalid-emails/) when it fails to meet *any* of the following conditions:

### Length of email addresses

* [RFC 3696, section 3][rfc3696-3] outlines email address syntax restrictions.
* [RFC 5321, section 4.5.3.1][rfc5321-4-5-3-1] defines the parts and lengths of an email address.\
  Email addresses consist of two parts: the *local-part* that comes before the `@` sign and the *domain* part that comes after.
  * The [local-part][rfc5321-4-5-3-1-1] can't exceed 64 octets in length.
  * The [domain part][rfc5321-4-5-3-1-2] can't exceed 255 octets in length.
  * Taken together, the whole email address can't exceed 254 octets in length.
* [RFC 5322, section 3][rfc5322-3] defines the ASCII characters (as octets) allowed in an email address.

These RFCs define length in octets rather than characters.

* A single character in a non-Latin alphabet may use more than one octet, or eight bits, of data.\
  For example: the local-part of an email address using Chinese characters can't exceed 32 characters.
* [RFC 6531][rfc6531] covers Unicode characters in the local-part of an email address.\
  This requires the [SMTPUTF8 extension](https://datatracker.ietf.org/doc/html/rfc6531#section-3.2) for your email provider.
* [RFC 5890][rfc5890] covers Unicode characters in the domain part of an email address.
* Support for international characters depends on the email provider.

### Valid characters for email addresses

* The email address doesn't include the `@` symbol between the local-part and domain part.
* The local-part of an email address includes characters other than the following:
  * Letters (`A-Z`, `a-z`).
  * Digits (`0-9`).
  * Special characters (`!`, `#`, `$`, `%`, `&`, `'`, `*`, `+`, `-`, `/`, `=`, `?`, `^`, `_`, `` ` ``, `{`, `|`, `}`, `~`, `.`).
* The local-part starts with a period (`.`) or includes two or more periods in a sequence (`first..last@example.com`).

[rfc3696-3]: https://datatracker.ietf.org/doc/html/rfc3696#section-3

[rfc5321-4-5-3-1]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1

[rfc5321-4-5-3-1-1]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1.1

[rfc5321-4-5-3-1-2]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1.2

[rfc5322-3]: https://datatracker.ietf.org/doc/html/rfc5322#section-3

[rfc6531]: https://datatracker.ietf.org/doc/html/rfc6531

[rfc5890]: https://datatracker.ietf.org/doc/html/rfc5890
