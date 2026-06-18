# Apple iCloud

Apple offers two mail services:

* [Apple iCloud Mail][icloud-mail]: a traditional consumer email platform
* [Apple iCloud Private Relay][icloud-pr]: an email forwarding service to protect privacy

## Apple iCloud Mail

Apple iCloud Mail provides a free consumer email service. It covers the `icloud.com` domain.

It includes the legacy `me.com` and `mac.com` domains. Mail directed to a `mac.com` domain can route to `me.com` and `icloud.com`. Mail directed to a `me.com` domain can route to `icloud.com`.

**For example**:

* Messages sent to `pat@me.com` can also receive mail at `pat@icloud.com`.
* Messages sent to `alex@mac.com` can receive email sent to `alex@me.com` and `alex@icloud.com`.

### Authentication support

Apple iCloud checks a sender's domain DNS `TXT` records for a Sender Policy Framework (SPF) list, DomainKeys Identified Mail (DKIM) signature, and a Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy. It requires SPF and DKIM at any volume of messages and requires DMARC for a daily volume of more than 5,000 messages.

| Authentication method | Necessity                                     |
| --------------------- | --------------------------------------------- |
| SPF                   | Required                                      |
| DKIM                  | Required                                      |
| DMARC                 | Required for more than 5,000 messages per day |

### Blocklisting

For filtering decisions, Apple uses [Proofpoint][proofpoint]. If you have issues delivering to Apple domains, your IP might be listed with Proofpoint.

### Feedback loop

Apple doesn't provide a feedback loop for email service providers. Senders should follow best practices and review email lists for unengaged recipients.

### Mail Privacy Protection

Apple offers Mail Privacy Protection (MPP) for hiding IP addresses and protecting Mail app activity.

After updating to iOS 15 and macOS 12 or later then opening the Apple Mail app, the app offers users a prompt. The prompt asks if the user wants to protect their privacy. If chosen, this option turns on MPP and hides the user's system's IP address.

If the user declines at that prompt, they can turn on MPP using the following steps:

1. Go to **Settings** > **Mail** > **Mail Privacy Protection**.
2. Choose one of three options: Hide their IP address, protect their Mail activity, or both.

MPP anonymizes open tracking and affects Twilio in the following manner:

1. When a mailbox receives a message, the Mail application fetches the message and all the images in it.
2. This fetching doesn't happen when delivered, but it does fetch the message and its images.
3. This causes the tracking pixel to report to Twilio that the message was opened.
4. The message remains unread in the user's inbox.
5. This inflates open rates.
6. Twilio flags these artificial opens with the `sg_machine_open` parameter on open events using the webhook.

> \[!NOTE]
>
> Apple limits MPP to the Apple Mail app on macOS and iOS. It doesn't impact other mail clients on those devices. If a recipient at an alternate domain routes their mail through the Apple Mail client, MPP may cause inflated opens for that recipient.
>
> **For example**: If `john.doe@example.com` receives mail through the Apple Mail client, you may see opens generated due to MPP.

## Apple iCloud Private Relay

Apple maintains a private relay service that forwards email and hides the real email address of the recipient.

**For example**: `qwerty@privaterelay.appleid.com` may forward to `john.doe@icloud.com`.

The recipient can use any domain, Apple or otherwise. Delivering mail to the private relay can require [additional configuration][configure-pers].

[icloud-mail]: https://www.icloud.com/mail

[icloud-pr]: https://support.apple.com/en-us/102602

[proofpoint]: /docs/email/concepts/deliverability/blocklist-provider-insights#proofpoint

[configure-pers]: https://developer.apple.com/help/account/capabilities/configure-private-email-relay-service
