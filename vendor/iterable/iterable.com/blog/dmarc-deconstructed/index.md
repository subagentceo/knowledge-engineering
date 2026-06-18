# The Email's Coming From Outside the House: DMARC Deconstructed - Iterable

## The Email’s Coming From Outside the House: DMARC Deconstructed

**Published by**

March 27, 2018

![Email icon with security lock to represent DMARC](https://iterable.com/wp-content/uploads/2026/04/032718_DMARC-and-Brand-Protection.png)

Do you know who is using your domain to send email? Have you ever wondered if your email domain is being phished?  Do you know every source of your domain reputation? In the eyes of the ISPs, your ignorance is not their problem and if a domain is determined to be abusive, then that domain will be filtered or even blocked.

If you wonder about these questions, or are worried that you don’t know all the email sources for your domain, keep reading this blog post!

DMARC (Domain-based Message Authentication Reporting & Conformance) is the standard to help protect your domain and brand. DMARC is a way of proving your identity and simultaneously preventing another sender from claiming that identity.

#### 1. What is DMARC, and how does it work?

DMARC is an email validation system designed to detect and help prevent email spoofing and phishing by instructing the recipient’s ISP to look for ‘Identifier Alignment.’

Essentially, is your authentication proving your identity or just your ESP’s? This also allows you, as the domain/brand owner, to receive reports of other systems that are using your sending domain to send out emails. These emails could be compliant systems (ESPs), email forwards, or malicious senders that should not be using your domain.

DMARC is also a great tool to audit all sending platforms within your organization and start to understand how and why there are multiple systems.

#### 2. As a marketer, why should I care about DMARC?

You want your brand to be secured and protected against possible phishing attempts. DMARC tells the ISPs that you are who you say you are and that this fraudster over here is not you.  Without it, if a spammer is using your domain to attack users, then the ISP will happily block the entire domain to protect their customers.

If you have DMARC implemented, however, the ISP can simply block the bad guy and keep letting your legitimate emails through.  By protecting your customers from fraud, you protect yourself from being painted as a spammer due to someone else’s actions.

#### 3. What are the DMARC enforcement options and reports?

There are three enforcement options when rolling out DMARC. It is always recommended to start with a **p=none** policy so that you can start receiving reports without accidentally interfering with your own emails.

Below are the specific details on each enforcement option:

*   **p=none:** The ISP is requested to check messages for DMARC alignment but not alter its normal behavior, and to send a report to the sender.
*   **p=quarantine:** The ISP is requested to flag any email that fails DMARC as suspicious and subject it to greater scrutiny and/or place it in the Spam folder, as per the ISP’s policies, and to send a report to the sender.
*   **p=reject:** The ISP is requested to reject (bounce) any email that fails DMARC and to send a report to the sender.

DMARC’s utility comes from the insight into a sender’s program and authentication provided by the Aggregate and Forensic/Failure reports that recipient ISPs send to the email addresses indicated in the DMARC record.

These reports share authentication success/failure and alignment for every attempt to send mail under the domain with the DMARC record, including any and every subdomain, known or not.

While not every ISP sends reports, the major B2C ISPs do and they are actively encouraging the adoption of DMARC globally so that they can better protect their customers and make sure the right emails get into (or out of) the inbox.

Here is a snippet of a DMARC report that tells us three Gmail users forwarded the sender’s marketing email on a specific date.

![DMARC report snippet](https://iterable.com/wp-content/uploads/2018/03/DMARC-report-1.png)

These can be extremely time-consuming to translate so it’s a good idea to get a professional to do it for you.

#### 4. Could other senders within my company impact deliverability by using the same sending domain?

Yes! If there are multiple platforms using the same domain to send emails, you could have possible cross-contamination on the domain itself. One market or team may be using different practices than another and impacting the domain reputation for everyone, including transactional or even correspondence email.

This means that your A/B tests might not be as valid as you thought: if someone down the hall sends to a bad list with your identity, your emails will go to spam and be seen less frequently.  Your perfectly good creative might be thrown out as unengaging without truly having had a chance.

#### 5. Does DMARC help with email deliverability?

Not directly. Implementing DMARC on your sending domains can help provide insight on the actual sending platforms but does not guarantee inbox placement.

However, phishing and fraud is a growing problem and by protecting your domain with DMARC, you are also protecting your customers from fraudsters.  ISPs certainly appreciate this: DMARC gives them a clear yes/no answer to the question, “Is this email phishing?” so their anti-phishing filters can relax a little bit.

#### 6. What are the next steps, and how do I get started?

1.  Identify all senders and corresponding IP addresses that you wish to authorize to send mail from your domain.
2.  Begin to “white-label” each source of mail by implementing aligned DKIM and Return-Paths for each sender or ESP.
3.  Create a reporting-only (p=none) DMARC record that sends Aggregate and Forensic/Failure reports to dedicated mailboxes.
4.  Upload the DMARC record as a TXT record into the DNS zone: _dmarc.domain.com
5.  Authorize any external domains intended to receive reports.
6.  Examine the Aggregate reports for correct sources of mail that are not authenticating or are not aligned to identify problems.
7.  Examine the Aggregate reports for unknown sources of mail and confirm their legitimacy (or lack thereof).
8.  Once all correct sources of mail have been identified and the DMARC policy is hardened, continue to monitor the reports for any unexpected authentication failures.

By implementing these steps and reviewing DMARC reports, you will protect your domain, protect your users, and gain a better understanding of all systems using your domain to send email.

For more information on DMARC authentication, check out the Inbox Pros blog.