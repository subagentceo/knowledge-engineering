# Improve deliverability

To satisfy issues with email deliverability, Twilio recommends following these best practices.

## Get affirmative consent

Per the Twilio SendGrid [Affirmative Consent requirement][], Twilio SendGrid requires affirmative consent for all non-[transactional emails][transactional-email].

[Affirmative consent][] requires that you follow the following principles:

1. Obtain explicit permission from recipients where that permission was freely given, informed, and unambiguous.
2. State your identity and email content to recipients.
3. Provide an way for them to withdraw consent.
4. Retain proof of consent.
5. Never transfer consent to affiliates.

## Right message, person, timing, and frequency

How your recipients interact with your messages influences email deliverability. If recipients open your messages, display your images, and click your links, then inbox providers consider you as a sender of desired email messages. If messages remain unopened or get marked as spam, inbox providers might not place your messages in the inbox or accept them at all.

## Follow regulations

Your email message content must follow applicable national and regional regulations where the recipient resides. This covers the [US][can-spam], [Canada][casl], and the [European Union][gdpr]. The focus of these regulations include:

* Identify yourself and the type of messages you send.
* Provide your recipients with a way to opt-out of messages.

### Identify yourself

Help inbox providers and recipients recognize you as a legitimate company and email sender:

* Place your company name in the subject line of your email messages.
* Include your physical mailing address and phone number in your email footers.

### Offer a way to opt out

All inbox providers check for an unsubscribe method in all email messages. While it might not make sense for transactional email, having this method in the message might make the difference between your messages arriving in the inbox or the [spam folder][]. [Subscription tracking][] inserts an unsubscribe link into all your emails and maintains the Unsubscribe list.

You want a recipient to decline future emails rather than mark your messages as spam lacking another option.

## Separate the types of email messages

Separate your email streams make a huge difference over the long run. [Segmenting][] your marketing email from your transactional email is a great way to keep legitimate mail out of trouble.

> \[!NOTE]
>
> You send your Daily Knitting Update emails on the same account and the same IP address as your receipts, invoices, and password resets.
>
> The day comes where one of your recipients doesn't want any more kitting messages. They marks every single *Daily Knitting* email messages they've ever received from you as spam.
>
> The impact of this might be far reaching. This might deny the recipient receiving their receipts, invoices, and password resets. It also might result *all* recipients at the same domain or ISP might have the same issue.
>
> To prevent this possible outcome, create a [subuser account][] with an [additional dedicated IP address][ded-ip-addr] for only your marketing email messages.
>
> | Account type    | IP address | Message purpose                         |
> | --------------- | ---------- | --------------------------------------- |
> | Parent account  | IP 1       | Receipts, invoices, and password resets |
> | Subuser account | IP 2       | Marketing or promotional emails         |
>
> This division delivers your important email messages, even if one stream runs into trouble.

## Encourage recipients to trust you

The actions of your recipients serve as the highest voice of authority.

Encouraging your recipients to do certain things can help bolster the trust ISPs have for you and your messages. Some examples can include:

### Add text to your email message

Consider adding one or more of these phrases in your email body text.

#### Add us to your address book

A recipient adds your *from address* to their address book or trusted senders list can go a long way. If an ISP's recipient trusts a sender, they might show leniency to similar messages to different recipients.

#### Star or mark as this message as important

Your recipients tell their inbox providers that they want your messages.

#### If you don't receive our email messages, check your spam folder and mark "not spam"

Add this sentence to your sign-up form area. If your message ends up in the spam folder and the recipient pulls it out, that helps you. This helps an ISP's incoming mail filters avoid false positives and improves your standing with that ISP.

### Ask to be added to an IP allow list

ISPs or inbox providers can add rules to allow *all* incoming mail from specific IP addresses. For problematic mail domains, ask the postmaster to place your [dedicated IP address][ded-ip-addr] on an allow list.

## Exclude explicit adult content from your messages

If your business provides adult content, Twilio send your email messages with the same standards and deliverability as any customer. *Twilio customers can't send explicit content within email messages.* Though primarily applied to images, Twilio reserves the right of refusal for sending of content that it deems to be vulgar, pornographic, or otherwise explicit.

If you don't know where your emails stand, contact [Twilio SendGrid Support][sg-support].

## Write human-readable text for click tracked links

The Twilio click tracking feature can sometimes trip up spam filters. If you have click tracking enabled, we'll replace any links within HTML `<a>` tags with unique links that redirect through our service. As such, if you use the original link as the clickable link text in your `<a>` tag, when the click tracking link is replaced it creates irregularity between where the link appears to go and where it actually goes.

> \[!NOTE]
>
> The original link:
>
> ```html
> <a href="http://www.sendgrid.com">http://www.sendgrid.com</a>
> ```
>
> Gets replaced with a much longer link with click tracking:
>
> ```html
> <!-- !focus(1) -->
> <a href="http://beertemp.sendgrid.net/wf/click?upn=a2quqXSHnxzJyDEtVGmF4w3cWg6voxuzvZ4oDr9WeNk-3D_4MHh">
>   http://www.sendgrid.com
> </a>
> ```
>
> This might resemble [phishing][] emails and place these messages in the spam folder rather than the inbox. To get around this, use something descriptive for the link text rather than the link itself in your messages:
>
> ```html
> <a href="http://www.sendgrid.com">Click to visit SendGrid</a>
> ```

## Host images and attachments at public-facing URLs

To include images in your messages:

* Use the HTML `<img>` tag for included images.
* Host all images on a public-facing server for the HTML `<img>` tag.

To include attachments in your messages:

* Link to hosted files rather than using attachments.\
  This prevents a receiving email server from blocking your message or attachments.
* Track site visitors who download files with secure site logins or credentials.

## Gain insight on message deliverability

Some third-party services can provide some idea of how inbox providers analyze your emails:

* [http://isnotspam.com][]
* [https://www.mail-tester.com/][]

You can send emails to a capture address at one of these services and they will reply with a breakdown of all the positive and negative factors of your emails. This helps you isolate and fix specific issues that may be sending your email to the Spam folder rather than the inbox. These services are *HIGHLY recommended* for troubleshooting **spam folder delivery.**

[Senderscore][] is another great resource you can use to get a good idea of how the internet email community ranks the [IP address you send mail from][ded-ip-addr].

SendGrid has also released an [Email Deliverability Guide][] highlighting these and more deliverability tips.

[ded-ip-addr]: /docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses

[Affirmative Consent requirement]: https://www.twilio.com/en-us/legal/service-country-specific-terms/email

[affirmative consent]: /docs/sendgrid/glossary/affirmative-consent

[Email Deliverability Guide]: https://sendgrid.com/marketing/email-deliverability-guide

[http://isnotspam.com]: http://isnotspam.com

[https://www.mail-tester.com/]: https://www.mail-tester.com

[Subuser account]: /docs/sendgrid/ui/account-and-settings/subusers

[segmenting]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[Senderscore]: https://senderscore.org

[Subscription tracking]: /docs/sendgrid/ui/sending-email/subscription-tracking

[can-spam]: /docs/sendgrid/glossary/can-spam

[casl]: /docs/sendgrid/glossary/casl

[gdpr]: /docs/sendgrid/glossary/gdpr

[sg-support]: https://support.sendgrid.com

[phishing]: /docs/sendgrid/glossary/phishing

[spam folder]: /docs/sendgrid/glossary/bulk-mail-folder

[transactional-email]: /docs/sendgrid/glossary/transactional-email
