# Manage Unsubscribes

[Unsubscribes][] are a recipient's voluntary decision to remove themself from a sender's [bulk email service][]. When a recipient unsubscribes from your service, they indicate their loss of interest in your content. To avoid [spam reports][], you must [honor these unsubscribe requests][track-unsubs]. Various regulations, such as [CAN-SPAM][], [CASL][], and [GDPR][], requires unsubscribe options in senders' email messages.

To track unsubscriptions, turn on [Subscription tracking][].

With the Twilio subscription tracking functionality turned on, Twilio injects unsubscribe links into your messages. Twilio then removes any recipients who clicked. This adds the recipient's email address to the unsubscribe suppression list.

Two suppression lists for unsubscribes exist based the features you use:

* [**Global Unsubscribes**][]: This list tracks recipients who have opted out of *all* mailings that you might send to them.
* [**Group Unsubscribes**][]: This list tracks recipients who have opted out of *only certain mailings*, like product announcements, that you might send to them.

If you don't use the Twilio subscription tracking feature, maintain your own subscription functionality and [track unsubscribe requests][track-unsubs].

[unsubscribes]: /docs/sendgrid/glossary/unsubscribes

[**Global Unsubscribes**]: /docs/sendgrid/ui/sending-email/global-unsubscribes

[**Group Unsubscribes**]: /docs/sendgrid/ui/sending-email/group-unsubscribes

[subscription tracking]: /docs/sendgrid/ui/account-and-settings/tracking#subscription-tracking

[track-unsubs]: /docs/sendgrid/glossary/subscriber-list-management

[CAN-SPAM]: /docs/sendgrid/glossary/can-spam

[CASL]: /docs/sendgrid/glossary/casl

[GDPR]: /docs/sendgrid/glossary/gdpr

[bulk email service]: /docs/sendgrid/glossary/bulk-email-service

[spam reports]: /docs/sendgrid/glossary/spam-reports
