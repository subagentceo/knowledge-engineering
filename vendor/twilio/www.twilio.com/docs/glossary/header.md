# Header

*Internet standard*. Metadata that informs email recipients and servers of the routing, formatting, and security of an email message.

A header includes metadata in key-value pairs grouped in three categories: informational, technical, and security.

## Informational metadata

This metadata covers the sender and recipient addressing, message subject, and content format.

* `From`: The sender name and email address displayed in the recipient's inbox and in the individual email message.
* `To`: The recipient name and email address displayed in the recipient's inbox and in the individual email message.
* `Cc`: An additional recipients' names and email addresses that received this email message.
* `Delivered-To`: Each destination email address that received the email message. Each instance of this header can contain only one email address, noting the successful transition of responsibility from a message handing service to a recipient environment. This recipient environment might not be the target inbox, as the address might be an alias for another address. If further processing needs to occur, another `Delivered-To` header gets added to the email message before continuing.
* `Subject`: The title that the sender gave to this email message.
* `Reply-To`: The email address that the recipient sends replies to this email message.
* `Content-Type`: This expresses the format of the email message's body as a [Multipurpose Internet Mail Extensions (MIME)][mime] type.
* `MIME-Version`: The version of the MIME standard applied to this email message.
* `Content-Transfer-Encoding`: The mechanism used to encode this email message for transmission.

## Technical metadata

This metadata covers the route the message took across the Internet.

* `Return-Path`: The intended recipient email address that you sent this email message. SMTP and DNS use this metadata for email routing.
* `Received`: The route that the email message took. Each SMTP server adds to this header. Each instance of this pair covers one "leg" of the route, from one point to another.
* `Message-ID`: A unique identifier for this email message that the sending system generates.

## Security metadata

This metadata covers the validation measures taken that confirm the provenance of the email in both domain and IP address.

* `DKIM-Signature`: A digital signature that confirms the owner of the domain authorized this email message.
* `Received-SPF`: The result returned for an SPF check on this email message.

Of this metadata, inboxes and email messages only display `To` (identity of the recipient) and `From` (identity of the sender) in the inbox.

Some email systems add custom email headers. These have a prefix of `X-`. Twilio Email includes an [`X-Message-ID` header][].

[mime]: https://datatracker.ietf.org/doc/html/rfc2045

[`X-Message-ID` header]: /docs/glossary/x-message-id
