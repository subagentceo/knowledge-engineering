# Abuse awareness

Email has proven susceptible to a wide range of attacks and used in more complicated fraud and other malicious campaigns. Senders of all sizes should know and understand the kind of compromises that exist and how they can avoid behaving like spammers. Understanding abusive behavior and implementing best practices can improve a sender's engagement while decreasing your exploitable footprint. Starting with this understanding is a critical first step in creating a safer inbox for email users.

## Phishing

[Phishing][] exists as one of the most common and well-known forms of messaging abuse.

Technologies such as [SPF][], [DKIM][], and [DMARC][] help a company protect their brand from abuse and implication in phishing attacks. They link the [domain][] to its specific sending [IP address][] through SPF. DKIM ensures that the content is intact through cryptographic keys. DMARC provides a set of instructions to the receiver on what to do if the message fails authentication.

### Spear phishing

How spear phishing and phishing differ comes from the targeted nature of the attack. Spear phishing targets CEOs and other high ranking corporate officers at a company. It uses social engineering to obtain passwords and other sensitive information that could lead to the compromise of large volumes of customer data, millions of dollars in company funds and revenue, or both.

### Cousin domains

If a company locks down its messaging domains and provides a reject flag in their DMARC records, they can still be the target of a cousin domain attack. Cousin domains or look-alike domains are exactly what they sound like: domains that a spammer registered that resemble a legitimate domain, such as `g00g1e.com` and `amazoin.com`.

These domains are hard to detect because they aren't trying to send messages as the legitimate domain. Instead, attacks using cousin domains are leveraging the brand's look and feel and hoping to dupe someone into disclosing a password or other information. When the legitimate domain registrar detects a cousin domain, they contact the cousin domain registrar. The legitimate domain registrar demands a domain take down so no more messages can claim provenance from that domain.

## Snowshoeing

A snowshoe attack involves spreading complaints and volumes across a broad range of IPs and domains. If you follow all applicable best practices, you might use multiple IP addresses to achieve necessary email delivery throughput. Many inbox providers and [email service providers][esp] have connection and throughput limits per IP address. This would necessitate multiple IP addresses on your account.

What differentiates legitimate sender spreads traffic over IP addresses versus a snowshoer spreading their traffic relies on the use of domains and how often they introduce IP addresses. To increase the difficulty for an inbox provider to block them, a spammer wants to obfuscate as much of the traffic as possible. Legitimate mailers use consistent domains with published email authentication records to establish their brand's [reputation][ers] and to protect it from [spoofing][] and abuse. To avoid the repercussions of reputation issues, a spammer frequently swaps or adds IP addresses.

## DKIM Replay

A DKIM replay attack involves an attacker capturing a legitimate, DKIM signed email and retransmitting it to new recipients. The receiving email servers see a message with a valid DKIM signature from a reputable domain and may be more likely to deliver it to the inbox, bypassing basic spam filters. This attack can harm the impersonated domain's reputation, leading to lower deliverability for legitimate emails.

Measures to help prevent DKIM replay attacks include regular DKIM key rotation and oversigning certain headers.

## Subscription bombing

Spammers have realized that they can target a person's email account by leveraging subscription forms. The typical way they do this is to subscribe a single account hundreds of times across email service providers so that it begins to receive massive quantities of email. This results in the individual owner of the account finding themselves drowning in unwanted email.

Senders should secure address collection forms as a best practice to prevent subscription bombing attacks. CAPTCHA challenges are the primary mechanism for securing forms, but additional countermeasures include using a double opt-in strategy.

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[domain]: /docs/glossary/domain

[esp]: /docs/glossary/email-service-provider

[ip address]: /docs/glossary/ip-address

[phishing]: /docs/glossary/phishing

[spf]: /docs/glossary/spf

[spoofing]: /docs/glossary/spoofing

[ers]: /docs/glossary/email-reputation-score
