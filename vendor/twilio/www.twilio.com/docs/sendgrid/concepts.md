# Email concepts

Email marketing relies on three concepts:

1. Security
2. Reputation
3. Deliverability

To get your email messages into inboxes, learn about these concepts and implement the related best practices. Each concept build upon the last: good security improves reputation which then improves deliverability.

## Security

Email recipient servers want to accept email messages only from [trusted senders][]. To gain recipient trust, email senders should [secure the systems][secure] that send their email. As email standards don't include *security*, [domain authentication standards][] play that role for email messaging.

## Reputation

Securing your email servers and messages starts the building of trust, of your [*reputation*][rep], with inbox providers. Combine this with best practices of [proactive][] and [reactive][] list hygiene, [gradual ramping up][] of email volume, and [managing blocklists][]. These signal that inbox providers shouldn't consider your email messages as [spam][].

## Deliverability

Good security and good reputation improve *deliverability*. They don't guarantee it. To improve your deliverability percentages, monitor your subscriber lists for [blocks][] and [unsubscribes][] and perform all possible remedies.

[proactive]: /docs/sendgrid/glossary/suspicious-sender

[reactive]: /docs/sendgrid/glossary/spam-reports

[gradual ramping up]: /docs/sendgrid/concepts/reputation/warm-up-ip-addresses

[managing blocklists]: /docs/sendgrid/concepts/deliverability/blocklists

[blocks]: /docs/sendgrid/glossary/blocks

[spam]: /docs/sendgrid/glossary/spam

[unsubscribes]: /docs/sendgrid/concepts/deliverability/unsubscribes

[trusted senders]: /docs/sendgrid/glossary/trusted-sender

[secure]: /docs/sendgrid/concepts/security/secure-account

[domain authentication standards]: /docs/sendgrid/glossary/domain-authentication

[rep]: /docs/sendgrid/concepts/reputation/establish-maintain-reputation
