# Manage Unsubscribes

[Unsubscribes][] are a recipient's voluntary decision to remove themself from a sender's [bulk email service][]. When a recipient unsubscribes from your service, they indicate their loss of interest in your content. To avoid [spam reports][], you must honor these unsubscribe requests. Various regulations, such as [CAN-SPAM][], [CASL][], and [GDPR][], require unsubscribe options in senders' email messages.

With the Twilio subscription tracking functionality turned on, Twilio injects unsubscribe links into your messages. Twilio then removes any recipients who clicked. This adds the recipient's email address to the unsubscribe suppression list.

Two suppression lists for unsubscribes exist based on the features you use:

* [**Global Unsubscribes**][]: This list tracks recipients who have opted out of *all* mailings that you might send to them.
* **Group Unsubscribes**: This list tracks recipients who have opted out of *only certain mailings*, like product announcements, that you might send to them.

If you don't use the Twilio subscription tracking feature, maintain your own subscription functionality and [track unsubscribe requests][track-unsubs].

[unsubscribes]: /docs/glossary/unsubscribes

[**Global Unsubscribes**]: /docs/email/suppressions

[track-unsubs]: /docs/glossary/subscriber-list-management

[CAN-SPAM]: /docs/glossary/can-spam

[CASL]: /docs/glossary/casl

[GDPR]: /docs/glossary/gdpr

[bulk email service]: /docs/glossary/bulk-email-service

[spam reports]: /docs/glossary/spam-reports
