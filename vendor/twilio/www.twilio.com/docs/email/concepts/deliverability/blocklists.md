# Blocklists

To help determine if an email message comes from a trusted sender, many inbox providers (like Yahoo and Hotmail) and private organizations use [blocklists][].

By checking sender information against known bad actors on blocklists, the receiving server can choose what action they want to take. For example, they can reject, filter, or [throttle][] email from that sender.

To determine if a blocklist includes your IP address or domain, [monitor your email activity or webhook data for block events][manage-blocks] that indicate a listing. Hundreds of blocklist providers exist, but [only a few impact email senders][bl-providers].

## How does a sender become listed?

Blocklist providers monitor for various signals and behavior. To determine a sender's sending behaviors, these providers might operate [spam traps][spam-traps]. Blocklists monitor networks of these spam traps for poor sending behaviors. These behaviors might indicate spamming, fraud, phishing, or list bombing.

If sending behaviors exceed certain thresholds, blocklist providers add the sender's IP address, `from` address, or both to their list. Providers don't provide detailed information regarding the listing causes like spam trap address that triggered the delisting. Providers often provide `subject` lines, `from` addresses, and the dates when the providers received messages. They do provide guidance as to which actions to take before they can delist your addresses.

> \[!WARNING]
>
> Never request delistings repeatedly without making changes to your email project. If you don't correct the behavior that caused the delisting, the provider might ignore your delisting requests.

## Trial and Essentials plans

### Spamhaus blocklist

If you notice a block message from Spamhaus based on one of our IP addresses, know that Twilio and Spamhaus are addressing the issue. Don't make another request through Twilio support.

As these plans use shared IP addresses, Twilio can't move your account to another IP pool because one or more IP addresses in a shared IP pool made it on a blocklist.

### Other blocklists

Twilio monitors shared IP pools, including checking reputable blocklists for shared IPs. If a shared IP is added to a blocklist, Twilio analyzes it for measurable deliverability issues. If Twilio detects issues and delisting is possible, it'll attempt remediation.

With shared IP addresses, it's common for blocklistings to cycle between listed and delisted, or to appear on blocklists with little to no impact. Even senders with impeccable sending practices end up on a blocklist at some point. Whether you use shared or dedicated IP addresses, blocklists are part of the email business. You can't remediate every listing, especially those with minimal impact.

## Pro and Premier plans

If you discover your Twilio Email IP address on a [blocklist][bl-providers], make the delisting request first. Twilio assigns these IP addresses to one account only. Twilio expects you to take responsibility for all of the mail sent through your account. If the listing services requires it or you find the form too difficult, Twilio can assist with these delisting requests.

> \[!NOTE]
>
> If someone added your domain, and not your IP address, to a blocklist, the domain administrator must make the delisting request.

### Requests for delisting without remediation

Fix the behavior that got you on the blocklist. If you ask for delisting without fixes, you might find your IP address back on the blocklist. Each delisting becomes more difficult after the second or third listing.

To learn more about how to avoid being added to a blocklist, see [What Are Email Blocklists (and How to Avoid Them)][bl-avoid].

[bl-avoid]: https://www.twilio.com/en-us/blog/insights/avoiding-email-blacklists

[blocklists]: /docs/glossary/blocklist

[manage-blocks]: /docs/email/suppressions

[throttle]: /docs/glossary/throttling

[bl-providers]: /docs/email/concepts/deliverability/blocklist-provider-insights

[spam-traps]: /docs/glossary/spam-traps
