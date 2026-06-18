# Spam Filter

*Email Deliverability*. Algorithms that identify and remediate unwanted email messages.

> \[!NOTE]
>
> If you discover that a Twilio customer sent spam, [report it to Twilio][spam-report]. Twilio bans their account immediately.
>
> US recipients can also file a report with the [US Federal Trade Commission](https://reportfraud.ftc.gov/).

[spam-report]: https://support.sendgrid.com/hc/en-us/articles/8830363760411-How-to-Report-Spam-Sent-by-a-SendGrid-Customer

These software-based email filters block email on a range of attributes. This ranges from [words or phrases within the email][bayesian] to [header information][cra] and other factors. These filters aim to identify spam before it reaches the inbox.

When successful, spam filters move found spam messages to the [spam folder][] within the recipient's email app.

[bayesian]: /docs/glossary/bayesian-filter

[cra]: /docs/glossary/challenge-response

[spam folder]: /docs/glossary/spam-folder
