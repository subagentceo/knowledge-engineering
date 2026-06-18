# Establish and maintain reputation

Your reputation determines how inbox providers treat your emails. To determine if a sender is trustworthy, a provider examines a variety of signals. If you follow best practices, the providers view your email program more favorably. This improves your reputation and your message [deliverability][]. As such, you must establish and maintain your reputation with inbox providers.

## Establish reputation

### Address collection

Only send to opt-in recipients who have given [affirmative consent][] to receive your email. Use double-opt-in mechanisms on address collection forms.

**For example**: Send a confirmation email when users subscribe to your list.

You can validate both the recipient's email address and their desire to receive your messages.

Secure your address collection forms against bots and other malicious actors. Many solutions exist, like CAPTCHA challenges. Failing to secure collection forms can introduce [spam traps][] to your mailing lists.

Sending messages to a purchased or third-party list might damage your reputation. Also, using third-party or purchased lists violates the Twilio [Acceptable Use Policy][].

### Email authentication

Prioritize email authentication.

Add [SPF][spf], a [DKIM][dkim] signature, and a [DMARC][dmarc] policy to your account. Major inbox providers, including [Google][], [Yahoo][], and [Microsoft][], require a DMARC policy.

To configure these records, use the authentication wizard. This wizard displays in the Twilio Email console under **Settings** > **Sender Authentication**. Once established, test the records using all the domains with which you plan to send email.

### Warm up IP address

When adding a dedicated IP address to your account, gradually increase the volume of email messages sent through the [IP address][]. This process is called [IP warm up][ip-warm]. Gradually increasing the volume using a predetermined schedule helps to establish a sender's reputation with inbox providers. For inbox providers to protect their users, they treat added IP addresses with caution. The warming process allows the inbox provider to observe your sending practices and record how your recipients engage with your email program.

Twilio customers can conduct a manual warmup or use the automated warmup feature.

## Maintain reputation

### Maintain consistent volume

After warming your IP, maintain a consistent volume of email to preserve the IP address reputation. Keep marketing mail volume consistent. While inbox providers allow for some flexibility in volume patterns, significant deviations from established patterns can degrade your reputation.

If you need to send a larger-than-average campaign, slowly increase traffic over the course of a few days or weeks. This allows providers to adjust to the change. Once at the peak of the email campaign, begin reducing volume over the remaining days until the prior average volume.

### Establish sunset policies

A sunset policy reduces the number of email messages that recipients receive or removes recipients based on their engagement history with your messages. When a recipient hasn't opened or clicked on a message after a set length of time, reduce the number of messages to that recipient. If the recipient remains unengaged after reducing attempts to them, consider removing the recipient from your list.

How often you send mail and the level of engagement from your recipients provide signals to inbox providers as to when they assess your email program and establish your reputation. If you continue sending mail to unengaged addresses, your email program risks:

* Reputation blocks
* Increased spam complaints
* Higher likelihood of encountering [spam traps][]

No one-size-fits-all sunset policy exists. To maintain your reputation with both inbox providers and subscribers, set a sunset policy.

### Honor unsubscribes and spam reports

The email [unsubscribe][unsubscribes] experience between the sender and the recipient matters. While senders don't like it when recipients unsubscribe, not every recipient stays interested in your email. Better to lose these recipients than having them ignore your emails or worse. Many countries have regulations giving recipients the right to unsubscribe, including [CAN-SPAM][], [CASL][], and [GDPR][]. To comply with these regulations, provide a clear unsubscribe experience.

Any recipient who clicks an unsubscribe link gets added to the [unsubscribe suppression list][global-unsubscribes].

If you fail to honor a recipient's unsubscribe request, the recipient might file a [spam complaint][complaint] against you. Growth in the number of complaints negatively impacts your reputation. When a subscriber clicks the `spam` or `junk` button in their inbox, it triggers a [spam complaint][complaint]. If this happens, Twilio adds the reporter's address to the user's [suppression list][].

[Acceptable Use Policy]: https://www.twilio.com/en-us/legal/service-country-specific-terms/email

[affirmative consent]: /docs/glossary/affirmative-consent

[CAN-SPAM]: /docs/glossary/can-spam

[CASL]: /docs/glossary/casl

[deliverability]: /docs/glossary/deliverability

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[GDPR]: /docs/glossary/gdpr

[global-unsubscribes]: /docs/email/suppressions

[Google]: /docs/email/concepts/inbox-provider-insights/google#authentication-support

[IP address]: /docs/glossary/ip-address

[ip-warm]: /docs/email/concepts/reputation/warm-up-ip-addresses

[Microsoft]: /docs/email/concepts/inbox-provider-insights/microsoft#authentication-support-for-microsoft-outlook

[spam traps]: /docs/glossary/spam-traps

[spf]: /docs/glossary/spf

[suppression list]: /docs/email/suppressions

[unsubscribes]: /docs/glossary/unsubscribes

[Yahoo]: /docs/email/concepts/inbox-provider-insights/yahoo#authentication-support

[complaint]: /docs/glossary/complaint
