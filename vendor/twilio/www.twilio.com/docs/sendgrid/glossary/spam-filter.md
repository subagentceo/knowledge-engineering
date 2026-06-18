# Spam Filter

*Email Deliverability*. Algorithms that identify and remediate unwanted email messages.

> \[!NOTE]
>
> If you discover that a Twilio customer sent spam, [report it to Twilio][spam-report]. Twilio bans their account immediately.
>
> US recipients can also file a report with the [US Federal Trade Commission](https://reportfraud.ftc.gov/).

[spam-report]: https://sendgrid.com/report-spam

These software-based email filters block email on a range of attributes. This ranges from [words or phrases within the email][bayesian] to [header information][cra] and other factors. These filters aim identify spam before it reaches the inbox.

When successful, spam filters move found spam messages to the [spam folder][] within the recipients's email app.

To learn more, see the Twilio [Email Infrastructure Guide][].

[Email Infrastructure Guide]: https://www.twilio.com/en-us/resource-center/the-email-infrastructure-guide-build-it-or-buy-it

[bayesian]: /docs/sendgrid/glossary/bayesian-filter

[cra]: /docs/sendgrid/glossary/challenge-response

[spam folder]: /docs/sendgrid/glossary/bulk-mail-folder
