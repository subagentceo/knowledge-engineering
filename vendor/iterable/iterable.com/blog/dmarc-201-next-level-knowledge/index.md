# DMARC 201: Achieving Next-Level Knowledge - Iterable

## DMARC 201: Achieving Next-Level Knowledge

**Published by**

June 6, 2018

![DMARC illustration](https://iterable.com/wp-content/uploads/2026/04/060618_DMARC-201-Next-Level-Knowledge.png)

Do you use DMARC? If your company is in the SaaS 1000, e-retail, higher education, or legal industries, chances are you’re probably not, or at least according to the data we ran on DMARC adoption at 250ok.

As a refresher, Domain-based Message Authentication, Reporting & Conformance (DMARC) is a sender-published policy for messages that fail email authentication.

For email security purposes, it’s a pretty big deal for both senders and recipients of email. In fact, the U.S. Department of Homeland Security announced a _Binding Operational Directive 18-01_ requiring all U.S. federal agencies to achieve a reject policy (p=reject) on their .gov domains by October 2018.

While nothing is foolproof, DMARC use is a no-brainer for companies that are serious about their email and their customers’ trust. I’m sure you’ve heard the gist of this before, considering our friend Chris Arrendale’s gone over DMARC in a recent post.

If you’re still on the fence about it, maybe a deeper analysis of how DMARC works will help you determine whether this is the right move for your business.

DMARC actually builds upon other established email authentication practices to lower the likelihood their domains are spoofed and used for phishing attacks.

How? It helps the mailbox provider receiving mail take action on how to treat your messages that fail SPF and DKIM validation tests. DMARC is best applied when the mail you’re sending is supported with proper **domain alignment**.

Domain alignment means the sending domain matches a prescribed authentication. For DKIM, this means the sending domain used to create the signature (and provided through the d= parameter), should match the “From” header.

For SPF, this is the domain in the RFC5321.MailFrom (MAIL FROM) portion of SMTP, the RFC5321.EHLO/HELO domain, or both. These could be different and usually are not visible to the recipient.

Here’s an example of how DMARC comes into play when looking at alignment-related passes or failures:

*   SPF Pass = DMARC Pass
*   DKIM Pass = DMARC Pass
*   SPF Pass + DKIM Pass = DMARC Pass
*   SPF Fail + DKIM Pass = DMARC Pass
*   SPF Pass + DKIM Fail = DARMC Pass
*   SPF Fail + DKIM Fail = DMARC Fail

### The 3 Steps to Getting to the Gold Standard of DMARC Policies

**1. Start in observation mode, also known as a none policy  (p=none)**, where emails failing authentication don’t actually get rejected or rerouted away from the inbox. Instead, it tells your ISP to report this info back to you.

You should spend several weeks aggregating this information, analyzing the mail sources, and applying procedural changes where possible. During this phase, senders are sometimes surprised to find domains they do not send email from are actually spoofing their brand and sending malicious emails to recipients

Once you’ve gotten all your internal ducks in a row and ensured you’re cognizant of all mail being sent from all your owned domains…

**2. Apply your quarantine policy (p=quarantine)**. During the time your domains are set to quarantine, be sure to pay special attention to messages failing DMARC and determine if these are legitimate messages. If they are, review the SPF and DKIM configurations associated with them. The daily aggregate reports should tell you what is failing and causing potential problems, and give you an idea where to focus your efforts.

This should really be clean-up work, as most of this should be caught during the observation phase.

Finally, you can reach your destination:

**3. Move on to p=reject**, where any mail sent from the protected domains is refused and not delivered. A reject policy plus a no-mail SPF record are the safeguards you should enact on any non-sending and defensive domains (common typos in your brand name, parodies, etc.)  to prevent any nasty surprises like those you might have seen during p=none.

This greatly decreases your chance of being spoofed, fooling your recipients, and sustaining brand-damaging attacks on your domains.

No matter your level of comfort with DMARC, it takes a nuanced hand to get it right. From what you’ll find during your observation period to ensuring your reject policy is appropriately applied, you should be consulting with an expert.

And make no mistake, DMARC is something you should not be brushing aside. Wouldn’t you rather tackle this now, before your customers, prospects, or employees fall prey to a phishing scam…from one of your domains?