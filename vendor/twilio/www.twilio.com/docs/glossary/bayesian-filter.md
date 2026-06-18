# Bayesian filter

*Email Deliverability*. A statistical technique that detects email spam. To detect spam, a [Bayesian filter][Naive Bayes spam filtering] compares the words or phrases within the questionable email to a set of known words or phrases associated with spam. As it has a very low rate of false positives, Bayesian filtering succeeds as a method for filtering spam.

> \[!NOTE]
>
> If you discover that a Twilio customer sent spam, [report it to Twilio][spam-report]. Twilio bans their account immediately.
>
> US recipients can also file a report with the [US Federal Trade Commission](https://reportfraud.ftc.gov/).

[spam-report]: https://support.sendgrid.com/hc/en-us/articles/8830363760411-How-to-Report-Spam-Sent-by-a-SendGrid-Customer

To validate the sender of an email message, a system might use a [challenge-response filter][cra].

## Related entries

* [Spam][]
* [Spam Filter][]
* [Spam Reports][]
* [Spam Trap][]

[cra]: /docs/glossary/challenge-response

[Naive Bayes spam filtering]: https://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering

[Spam]: /docs/glossary/spam

[Spam filter]: /docs/glossary/spam-filter

[Spam reports]: /docs/glossary/spam-reports

[Spam trap]: /docs/glossary/spam-traps
