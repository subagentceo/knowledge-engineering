# Email reputation score

*Reputation*. Mailbox providers evaluate messages based on sender history, recipient engagement rates, [complaints][], and [bounce][bounces] rates. A good reputation is more likely to result in successful inbox delivery, while a poor reputation may be more likely to lead to messages being placed in the [spam folder][spam-folder] or [blocked][blocklist] entirely.

> \[!NOTE]
>
> The Twilio SendGrid reputation score differs from [deliverability][].

## Reputation score in Twilio SendGrid

The email reputation score is an approximation of email program health based on a few of the basic metrics evaluated by mailbox providers.

To find your **SendGrid account reputation score**, log in to your [Twilio SendGrid console][tsc] account. When your Twilio SendGrid dashboard appears, the email reputation score can be found on the left.

![Dashboard menu with templates, stats, activity, suppressions, settings, and reputation at 100%.](https://docs-resources.prod.twilio.com/0395ead4ef966db8aabb089aebda97a36c71b06a48d68abab5ffbff2ca4aa406.png)

## SendGrid Engagement Quality

For a more comprehensive view of reputation, Twilio SendGrid offers the SendGrid Engagement Quality feature.

Monitoring your SendGrid Engagement Quality (SEQ) score maintains a strong sender reputation and ensures your emails reach recipients' inboxes. The SEQ score reflects how wanted and engaging your emails are, based on factors like open rates, bounce rates, spam complaints, and engagement recency.

By tracking your SEQ score, you can identify and address issues, such as high bounce or spam rates, that might harm your deliverability. A healthy SEQ score increases the likelihood of your emails being delivered and decreases mailbox providers flagging or throttling your email. This protects your brand's reputation and maximizes the impact of your email campaigns. You can monitor your SEQ score through the [SEQ API][].

## Related resources

* [8 Ways to Check Your Email Sending Reputation](https://www.twilio.com/en-us/blog/insights/5-ways-check-sending-reputation).

[spam-folder]: /docs/sendgrid/glossary/bulk-mail-folder

[blocklist]: /docs/sendgrid/glossary/blocklist

[bounces]: /docs/sendgrid/glossary/bounces

[deliverability]: /docs/sendgrid/glossary/deliverability

[complaints]: /docs/sendgrid/glossary/complaint

[tsc]: https://app.sendgrid.com

[seq api]: /docs/sendgrid/api-reference/sendgrid-engagement-quality-api
