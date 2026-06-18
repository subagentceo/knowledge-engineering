# Invalid email addresses

Keeping your email campaigns effective requires finding and removing invalid email addresses. This requires knowing what makes an email address invalid. Twilio SendGrid validates email addresses in your campaign lists before sending messages to them.

## What makes an email address invalid

An email address is invalid if it meets either of the following two conditions:

* The email address syntax doesn't comply with internet email format standards.
* The email address doesn't exist at the recipient's mail server.

## How to identify valid email address syntax

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
  For example: The local-part of an email address using Chinese characters can't exceed 32 characters.
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

Target email servers and email service providers might have additional restrictions on email address syntax.

## What Twilio SendGrid does to validate email addresses

To validate the format of each email address before you send, Twilio SendGrid sends a query to the destination email system. If the destination system doesn't find the email address, it returns the [SMTP status code][smtp-codes] 550: `Requested action not taken: mailbox unavailable`. This indicates an invalid email address.

Twilio marks the email address as invalid in your campaign list. Twilio retains reports of any invalid email addresses for 30 days.

## Remove invalid email address data

To improve your campaign list, remove invalid email addresses. Records of invalid email addresses build over time. This affects the quality of your email list.

To remove invalid email addresses in your lists, complete the following tasks:

1. Search for invalid email addresses:
   1. Click the calendar icon.
   2. Choose the range of dates to search.\
      Your recipient list refreshes and displays the reports of invalid email addresses between those dates.
2. Download invalid email addresses as a comma-separated value (CSV) file for your records.
   1. Click the gear icon at the top of the page.
   2. Select **Download CSV**.\
      The file downloads to your computer from your browser.
3. Remove invalid email addresses from the list:
   1. Select individual email addresses or select all displayed email addresses.
   * To select one email address at a time, select the checkboxes next to the recipient names.
   * To select all displayed email addresses, select the checkbox next to the search box.
   2. A new button displays.
   3. To remove the selected email addresses, click that button.

## Additional resources

* [Recipient Subscription Preferences](/docs/sendgrid/ui/sending-email/recipient-subscription-preferences/)
* [Spam Reports](/docs/sendgrid/glossary/spam-reports)
* [Invalid Emails API](/docs/sendgrid/api-reference/invalid-emails-api/retrieve-a-specific-invalid-email)

[rfc3696-3]: https://datatracker.ietf.org/doc/html/rfc3696#section-3

[rfc6531]: https://datatracker.ietf.org/doc/html/rfc6531

[rfc5890]: https://datatracker.ietf.org/doc/html/rfc5890

[rfc5321-4-5-3-1]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1

[rfc5321-4-5-3-1-1]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1.1

[rfc5321-4-5-3-1-2]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.5.3.1.2

[rfc5322-3]: https://datatracker.ietf.org/doc/html/rfc5322#section-3

[smtp-codes]: https://datatracker.ietf.org/doc/html/rfc5321#section-4.2.2
