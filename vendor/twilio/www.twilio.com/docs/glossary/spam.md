# Spam

*Reputation*. An email message sent to a recipient that they didn't request or want.

> \[!NOTE]
>
> If you discover that a Twilio customer sent spam, [report it to Twilio][spam-report]. Twilio bans their account immediately.
>
> US recipients can also file a report with the [US Federal Trade Commission](https://reportfraud.ftc.gov/).

[spam-report]: https://support.sendgrid.com/hc/en-us/articles/8830363760411-How-to-Report-Spam-Sent-by-a-SendGrid-Customer

## Common reasons your email becomes spam

The most common reasons why your email might become spam:

### Poor authentication

Check that your email server supports and implements these protocols:

* [*DomainKeys Identified Mail* (DKIM)][dkim]
* [*Sender Policy Framework* (SPF)][spf]
* [*Domain-based Message Authentication, Reporting & Conformance* (DMARC)][dmarc]

Twilio Email sets up authentication with DKIM and SPF records for you.

For Pro 100k or above packages, Twilio offers dedicated IP addresses. Twilio can [authenticate][] these addresses against your sending domain.

### High complaint rate

If too many people flag your mail as spam, ISPs take action in one of three ways:

1. Send your email messages to the [Spam Folder][]
2. Throttle your email messages
3. Block your email messages

If you want to reach the Inbox, track your complaint rate.

### No unsubscribe link

Give customers the choice to opt out of your email list. Without an unsubscribe link to stop receiving your emails, the recipient hits the Spam button. Add an opt-out link to your emails. [A Cornell researcher][cornell] recommends placing the Unsubscribe link at the top of your emails. A [joint Indiana University and Michigan State University study][iu-msu] recommend using a standard process, good UI design, and letting users set clear boundaries.

### High frequency of email messages

Recipients unsubscribe or report spam for this reason above all.

To avoid this, include a link to your [Email Preference Center][epc] in your emails. Let your subscribers tell you how often they want to hear from you.

### Sending to inactive users

People's interests change all the time. Recipients can lose interest and stop opening your emails. Some senders double-down and send emails to even more users. This damages your reputation. ISPs can check whether recipients open the emails, click on links, and delete or mark emails as spam or not spam. ISPs monitor the recipients responsiveness and engagement. Based on these metrics, they decide where to place your email message: Inbox or Spam.

* To avoid landing in the Spam Folder, track [user engagement][].
* To verify recipient interest, try a [reconfirmation campaign][reconfirmation].

### Poor content

ISPs protect their users with [spam filters][Spam Filter]. Using the wrong words or even characters in your email can trigger the spam filters. They then throw your email messages in the [Spam Folder][]. Spam filters key in on commercial advertisements and promotions. Avoid words or phrases common to such emails. To learn what to avoid, see [100 Spam Trigger Words & Phrases to Avoid][].

To learn more about not becoming Spam, see [Tips and Tricks to Stay Out of the Spam Folder][].

[100 Spam Trigger Words & Phrases to Avoid]: https://blog.hubspot.com/blog/tabid/6307/bid/30684/The-Ultimate-List-of-Email-SPAM-Trigger-Words.aspx

[authenticate]: /docs/email/security/domains

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[reconfirmation]: /docs/glossary/reconfirmation

[Spam Filter]: /docs/glossary/spam-filter

[Spam Folder]: /docs/glossary/spam-folder

[spf]: /docs/glossary/spf

[Tips and Tricks to Stay Out of the Spam Folder]: https://www.twilio.com/en-us/blog/insights/10-tips-to-keep-email-out-of-the-spam-folder

[user engagement]: https://www.twilio.com/en-us/blog/insights/email-reputation-and-email-engagement-metrics

[cornell]: https://ecornell-impact.cornell.edu/dont-hide-that-unsubscribe/

[iu-msu]: https://dl.acm.org/doi/fullHtml/10.1145/3313831.3376165

[epc]: https://www.twilio.com/en-us/blog/insights/the-power-of-an-email-preference-center
