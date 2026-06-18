# Deferral

*Email Deliverability*. A deferred status can occur when an ISP or mailbox provider can't to accept email from your [IP address][ip]. The provider then waits for the resent message.

Twilio SendGrid retries delivering a deferred message for 72 hours from the time of the first deferral.

* If the resent message succeeds, the provider determines that can trust you as a sender or their system operations return to normal, it accepts the message.
* If the resent message fails, Twilio places the email address on the Block Suppression list.

## Possible causes

* The receiving server doesn't recognize your IP address and may think you're sending spam. IP warmup familiarizes recipient mail servers with your sending habits and later anticipate your messages.
* The receiving server lacks open ports to receive email.
* The recipient's mailbox is full.
* Some recipients have marked your mail as [spam][], but not enough to [block][] you. The recipient server refuses to receive more email messages from you until they can learn more about how their users interact with your messages.

## Related entries

* [Blocklist][]

[block]: /docs/sendgrid/glossary/blocks

[Blocklist]: /docs/sendgrid/glossary/blocklist

[ip]: /docs/sendgrid/glossary/ip-address

[spam]: /docs/sendgrid/glossary/spam
