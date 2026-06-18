# Canonicalization

*Internet standard*. The standardization of email messages formatting that enables consistent hashed values for validating email messages.

To generate the comparison values in metadata like a DKIM-Signature, a sending email server standardizes both headers and body content. This process is called *canonicalization*. Standards like DKIM follow the [Internet Message Format][rfc5322] format. Given this standard format, an email message can still undergo some mild modifications in transit. You can choose the level of tolerance you have for these changes as they get authenticated.

* If you want to accept common modification, choose `relaxed`.
* If you don't want to tolerate any changes, choose `simple`.
* You can set this value for both the header and body independently, with the header listed first, then a forward slash (`/`), then the body.
* This value defaults to `simple/simple`.

This results in accepted combinations of `simple/simple`, `simple/relaxed`, `relaxed/simple`, and `relaxed/relaxed`. If you only provide one value, like `relaxed`, that value applies to the header. The body gets set to `simple` and the complete value becomes `relaxed/simple`.

The service that generates your DKIM signatures sets the method, or algorithm, applied to the header and body content.

* On email servers that you manage, you set the canonicalization value in the DKIM configuration file.
* Most large scale email servers set their value to `relaxed/relaxed`.
* Twilio SendGrid sets this value to `relaxed/simple`.

## Header canonicalization for DKIM

When writing about canonalization, the following changes get made to email headers:

| Algorithm | Changes made           |                                                                |
| --------- | ---------------------- | -------------------------------------------------------------- |
| `simple`  | None                   | Keeps headers as byte-for-byte identical to the original.      |
| `relaxed` | Lowercase header names | Converts header names, not values, to lowercase.               |
|           | Unfold header lines    | Collapses multiline headers into single lines.                 |
|           | Compress whitespace    | Reduces multiple tabs or spaces to single spaces.              |
|           | Trim whitespace        | Removes spaces at the start and end of lines and after colons. |

#### Body canonicalization for DKIM

When writing about canonalization, the following changes get made to email message bodies:

| Algorithm | Changes made        | Result                                                          |
| --------- | ------------------- | --------------------------------------------------------------- |
| `simple`  | Trim blank lines    | Ignores blank lines at the end of the message.                  |
| `relaxed` | Trim blank lines    | Ignores blank lines at the end of the message.                  |
|           | Compress whitespace | Reduces multiple tabs or spaces within a line to single spaces. |
|           | Trim whitespace     | Removes spaces at the end of lines.                             |

[rfc5322]: https://datatracker.ietf.org/doc/html/rfc5322
