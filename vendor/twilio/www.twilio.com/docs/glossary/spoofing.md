# Spoofing

*Internet Security*. A technique where a falsified sender email address attempts to trick recipients into opening an email message.

Email spoofing happens when someone sends email with a forged `From` address. As a spoofed email looks legitimate, [phishing][] attacks often use spoofing.

As email lacks an inherent authentication mechanism, bad actors can spoof a `From` address. To combat spoofing, several internet standards have been developed:

* [Sender Policy Framework (SPF)][SPF]
* [DomainKeys Identified Mail (DKIM)][dkim]
* [Domain-based Message Authentication, Reporting and Conformance (DMARC)][dmarc]

These methods use [DNS][] to set [authentication through domain records][domain-auth].

Bad actors can spoof email messages because each email has *two* `From` addresses: the *Header From* or *friendly* from address and the *Envelope From* or `return-path` address.

## Display name abuse in the Header From address

The Header From displays in the **From** field of your email client. This From address matters less for directing email traffic. It serves as the address on the letterhead of paper correspondence. Your postal service *doesn't* use that address to route mail. It provides *friendly* information about the sender to the recipient.

To spoof the Header From address, the bad actor places false information in the **From** field of your email client. Display name abuse only changes the user interface. [Domain authentication][domain-auth] doesn't protect against this form of spoof.

## Return path abuse in the Envelope From address

The Envelope From address, also known as the `return-path`, informs receiving email servers where to send replies and [bounces][]. The Envelope From serves as the return address on a postal envelope. Your postal service *does* use this address to route mail. It establishes the sending source of the letter.

To find the Envelope From address in your email client, select an option like **Show Original**, **View Message Source**, or **Show Headers** in your email client. [Mail User Agents (MUA)][mua] don't display the Envelope From by default.

[Domain authentication][domain-auth] *does* protect against this form of spoof. To prevent email abuse, these standards have been developed and updated.

> \[!NOTE]
>
> If you discover that a Twilio customer sent spam, [report it to Twilio][spam-report]. Twilio bans their account immediately.
>
> US recipients can also file a report with the [US Federal Trade Commission](https://reportfraud.ftc.gov/).

[spam-report]: https://support.sendgrid.com/hc/en-us/articles/8830363760411-How-to-Report-Spam-Sent-by-a-SendGrid-Customer

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[dns]: /docs/glossary/dns

[domain-auth]: /docs/glossary/domain-authentication

[phishing]: /docs/glossary/phishing

[spf]: /docs/glossary/spf

[bounces]: /docs/glossary/bounces

[mua]: /docs/glossary/mua
