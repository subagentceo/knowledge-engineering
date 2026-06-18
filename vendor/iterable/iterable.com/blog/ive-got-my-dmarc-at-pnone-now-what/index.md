# I’ve Got My DMARC at “p=none,” Now What? - Iterable

## I’ve Got My DMARC at “p=none,” Now What?

**Published by**

May 14, 2024

![Green background, purple node, white envelope in the purple node.](https://iterable.com/wp-content/uploads/2026/04/051424_DMARC_Blog-Header.png)

Yahoo and Google now requiring DMARC has led lots of senders to implement the bare minimum “p=none” policy without much understanding of the implications of this setting or establishing a plan to progress towards enforcement.

However, a “none” policy should only be a transitory phase of DMARC implementation, and it’s extremely likely that a higher level of enforcement will be required in the future. Let’s review why and how to move from a “none” to a “reject” DMARC policy and get your domain–and users—fully protected.

### Quick Recap on DMARC

The DMARC protocol, created in 2011, enables senders to instruct mailbox providers on what to do with unauthenticated emails using their domain. It’s an “email validation system designed to detect and help prevent email spoofing and phishing by instructing the recipient’s ISP to look for ‘Identifier Alignment.’” Daily reports providing insights into the sources of unauthenticated traffic can be sent to an address(es) specified in the DMARC record.

Unfortunately, not enough senders implemented DMARC, leaving opportunities for bad actors to continue abusing unprotected domains. Gmail and Yahoo finally had enough of waiting for brands to join that fight: they now require bulk senders to implement DMARC in its most basic form (“none” policy).

#### Different DMARC Policies

There are three levels of DMARC policies: none, quarantine, and reject.

*   “**None**” is the most basic policy, and the minimum currently required by Gmail and Yahoo. The sender instructs mailbox providers to take no specific action if they see unauthenticated mail coming from their domain.
*   A “**Quarantine**” policy instructs mailbox providers to filter unauthenticated mail to the spam folder.
*   “**Reject**” is the strongest level of enforcement, and instructs mailbox providers to block outright any unauthenticated mail.

### Taking the Right Next Steps

Putting a door frame to your house without adding a door and a lock isn’t much use to stop intruders from coming in, right? DMARC works the same way. With a “none” policy, you are not preventing emails spoofing your domain from being delivered, just notifying mailbox providers to take no action. Only moving to a “quarantine” and eventually “reject” policy will protect your domain from abuse. Let’s explore how to proceed.

#### Step 1: Monitoring

Start with a “none” policy to monitor your email sources, identify legitimate mail streams, and make sure they all pass DMARC.

_TIP: Implement the DMARC policy at the top level, or root domain, so it automatically applies to all subdomains, hence giving you visibility into all mail streams._

_For example, if I implement a p=none DMARC policy on iterable.com, this policy will automatically apply any subdomain of this domain (eg. mail.iterable.com, marketing.iterable.com). Then, if I specify an address to collect DMARC reports on the DMARC record for iterable.com, I will not only receive these reports for iterable.com, but also all its subdomains. I will therefore gain visibility into all the email streams using the iterable.com domain._

To monitor traffic, you must collect and analyze daily DMARC reports sent by the mailbox providers. These reports are sent to the email address(es) indicated—by adding a “rua” tag—in the DMARC record. They share authentication success/failure and alignment for every attempt to send mail under the domain with the DMARC record, including any and every subdomain, known or not.

Note that these reports come in XML format, so most senders use a third-party platform such as CDE Valimail that will automatically process them into intelligible graphs and dashboards.

![Valimail dashboard.](https://iterable.com/wp-content/uploads/2024/05/Screen-Shot-2024-05-14-at-2.25.16-PM.png)

_This dashboard shows the number of emails that mailbox providers have reported on for a domain—how many have passed DMARC and how many have not, and their origin. Source: Valimail._

With a dashboard, senders can review all traffic that shows as not authenticating properly. If some legitimate mail streams are not authenticating properly, identify their source and make sure you correct the issue. While this can be a relatively straightforward process for smaller organizations, it can be a much more complex task for brands with multiple email sources.

For example, promotional emails, transactional emails, and sales leads are often sent via different platforms. It can take months for large organizations to map this all out and take necessary measures to correct all authentication errors.

#### Step 2: Moving to Enforcement

Once you are confident that all your legitimate mail authenticates properly, it’s time to change your DMARC record policy setting to “quarantine.” Then, go back to step one and monitor for a while to ensure no unauthenticated legitimate mail was inadvertently left out and, as a result, filtered to spam by mailbox providers.

Finally, once you’re sure you have all your ducks in a row and that absolutely all your legitimate mail is compliant, it’s time to move to “reject” to fully protect your domain from spoofing.

_TIP: To minimize any risk of inadvertently impacting legitimate emails, it’s recommended to proceed very progressively towards total enforcement._

Adding a “pct” tag in your DMARC record allows you to only apply the quarantine or reject policy to a certain percentage of the mail. This way, you can start by testing only a small percentage of mail, and progressively move to 100% DMARC enforcement.

#### Step 3: Moving Forward

Once you are all set at “reject,” continue monitoring your DMARC reports to identify any spoofing targeting your domain, safe in the knowledge that this mail will be rejected by most mailbox providers. Also, keep an eagle eye out for any new legitimate email sources failing DMARC authentication. Again, if you’re using a product like Valimail you can easily monitor your sending services, see summary reports, and also set up alerts to notify you of any new activity.

![Screenshot from Valimail platform showing which emails passed DMARC.](https://iterable.com/wp-content/uploads/2024/05/Screen-Shot-2024-05-14-at-2.26.12-PM.png)

_Emails sent and whether or not they pass or fail DMARC. Source: Valimail._

Lastly, since you’ve just gone through this whole process, it’s a good idea to define a clear process for future changes in your mailing set-up to ensure that any new domain or mail source is set up properly right from the start. Now that you have a view of all your mail streams, for example, you might also want to consolidate them for improved efficiency and clarity.

And if you haven’t already, you can now look at implementing BIMI—a mechanism by which your brand’s logo will display in the inbox of certain mailbox providers, including Gmail and Yahoo. Important to note: BIMI is only available to senders with a DMARC quarantine or reject policy.

### Set Yourself Up for Success

DMARC is a security protocol, and as such it has been traditionally managed by technical teams. The recent changes at Gmail and Yahoo have suddenly made it a hot topic for marketers, too.

For now, only a DMARC policy of “none” is actually required—but because this doesn’t prevent abuse, it’s highly likely that the requirement will change to DMARC enforcement (“quarantine” and “reject”) at some point in the future.

This is why we’re recommending, for senders whose DMARC policy currently stands at “none” to start planning now their move to “quarantine” and then “reject.” Doing this in a careful and thoughtful way will ensure legitimate mail gets delivered. Plus, as we have seen, for some brands with more complex sending, this process can take a long time, so better to get ahead of the curve.

Finally, beyond the deliverability impact of staying compliant with Gmail and Yahoo’s requirements, let’s not forget that the end goal is to protect email recipients—you, your family, your friends, your customers—from malicious spam. By protecting your domain(s), you are contributing to making the internet a little bit safer for everyone.

_To learn more about DMARC or your brand’s email deliverability, ask your CSM about Iterable’s Deliverability Services. If you’re not yet an Iterable customer, schedule a demo today._

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.