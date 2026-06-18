# Challenge-response spam filtering

*Internet Security*. A type of [spam filter][spam-filter] that replies with a challenge to the given sender. This spam filter verifies the sending email address.

The challenge sends a [SMTP][] `RCPT TO` command with the given sender's email address. This email address comes from the `return-path` in the [email envelope header][eeh]. The correct response from a sender's email server would be `250 Ok` or `2550 2.1.5 OK`. A failed response would be `550 <message>`. The recipient server accepts an email message from a sender that passes this challenge.

This isn't the same as [challenge-response authentication][cra].

To validate the content of an email message body, a system might use a [Naive Bayesian filter][bayesian-filter].

[eeh]: /docs/sendgrid/glossary/spoofing#return-path-abuse-in-the-envelope-from-address

[cra]: https://en.wikipedia.org/wiki/Challenge%E2%80%93response_authentication

[spam-filter]: /docs/sendgrid/glossary/spam-filter

[smtp]: /docs/sendgrid/glossary/smtp

[bayesian-filter]: /docs/sendgrid/glossary/bayesian-filter
