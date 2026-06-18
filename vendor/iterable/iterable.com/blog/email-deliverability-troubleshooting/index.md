# Email Deliverability Troubleshooting: How to Fix Inbox Placement Issues

## Email Deliverability Troubleshooting: How to Fix Inbox Placement Issues

**Published by**

Hanna Cabanellas

May 13, 2026

![](https://iterable.com/wp-content/uploads/2026/05/Blog-Header01.png)

Your email program has been performing consistently for years—then engagement starts to slip. Open rates decline, conversions soften, and your email program is suddenly not hitting the targets and KPIs it used to.

There are many factors why teams see a drop in their program, one and probably the most important is **deliverability**. When deliverability issues surface, the hardest part isn’t fixing them—it’s figuring out where to start. 

This guide walks through a structured approach to troubleshooting email deliverability problems, so you can identify root causes quickly and get your program back on track.

## Check 1: Authentication

Before looking at engagement metrics or inbox placement, confirm that your email authentication is configured correctly. SPF, DKIM, and DMARC form the foundation of email trust. If any of these records are missing, misaligned, or failing, mailbox providers may reject messages outright or route them to spam.

If your email program has been up and running for some time, chances are there won’t be an issue, but it can save you a lot of digging into other areas if there has been a change behind the scenes. DNS updates, domain changes, platform migrations, or vendor transitions can unintentionally disrupt previously stable configurations.

At a minimum, verify that:

*   SPF records are present and properly aligned
*   DKIM signatures are valid and passing
*   DMARC policies are configured correctly
*   Sending domains match your authenticated infrastructure

Even if everything has been stable for years, it’s worth double-checking. Small changes such as DNS updates and vendor switches can cause deliverability issues. Confirming that these core records are intact can save you from chasing problems elsewhere.

There are several free tools available online that can validate authentication records and confirm whether your setup is passing correctly.

## Check 2: Delivery Rate and Bounces

Once authentication checks out, the next step is evaluating delivery performance itself. When we think about deliverability, we typically think inbox vs. spam folder. But the most obvious and upfront check is simply taking a look at your delivery rate. While not all bounces are deliverability-related, a handful are and won’t go away without some type of intervention.

If your marketing program typically delivers at 98–99% and suddenly drops to 93–94%, that shift deserves investigation. Start by reviewing bounce logs to identify patterns.

Here are a few common deliverability-related bounces that require action if they arise in your sending.

### 1. Blocking Issues

*   **_Microsoft Block:_** _550 5.7.1 {hash}, messages from [a.b.c.d] weren’t sent. Please contact your Internet service provider since part of their network is on our block list (S3150)._ 
*   **_Gmail Block:_** _550-5.7.1 [a.b.c.d] Gmail has detected that this message is likely 550-5.7.1 unsolicited mail. To reduce the amount of spam sent to Gmail, this 550-5.7.1 message has been blocked._
*   **Yahoo Defferal:** 421 4.7.0 [TSS04] Messages from a.b.c.d temporarily deferred due to unexpected volume or user complaints 

Blocks can happen for a variety of reasons, so it’s important to step back and ask the right questions about your sending behavior and audience.

*   Has sending volume significantly increased?
*   Are you targeting older or less engaged cohorts?
*   Have complaint rates gone up?

Unlike temporary issues, block bounces rarely resolve on their own. In most cases, you’ll need to make a meaningful change—such as adjusting your send volume, tightening your audience, or improving engagement—before the receiving provider allows your mail back into their ecosystem.

### 2. Soft Bounces

Not every bounce points to a serious issue like a provider-specific block. In some cases, the issue could be a temporary soft bounce caused by addresses that no longer have space to physically receive mail. 

While this is not inherently a deliverability issue, it does suggest that you may be mailing to subscribers who have abandoned that inbox. Best practice is to have a soft bounce suppression in place to remove addresses that consistently return “mailbox full” or “over-quota” errors.

Examples of those types of errors:

*   **Apple:** _552 5.2.2 …@… user is over quota_
*   **Gmail:** _554-5.4.7 [internal] message timeout (exceeded max time, last transfail: 452-4.2.2 The recipient’s inbox is out of storage space._

Let’s say your bounce data looks healthy and nothing stands out. Delivery rates are stable, and everything appears to be trending as expected—yet open rates and conversions have been declining over the past couple of weeks. What now?

There are several steps you can take to ensure you are hitting all the boxes to help diagnose a potential deliverability issue. Remember, deliverability is the percentage of mail that reaches the inbox vs. the spam folder.

**_Check out our_** **_Help Article_** **_on how to export bounces out of Iterable._**

## Check 3: Reputation Signals

Sometimes delivery rates remain stable while engagement drops sharply. That usually points toward inbox placement issues rather than outright blocking. At that stage, reputation monitoring becomes critical.

### 1. Use Google Postmaster Tools

Gmail accounts for 40-60% of B2C marketers’ lists, making it top of mind for most senders. Having Google Postmaster Tools is essential for understanding how Gmail evaluates your sending domain and IP. 

If you are seeing a recent drop in engagement, dig deeper into available dashboards, paying close attention to:

*   Spam complaint rates
*   Domain reputation trends
*   Feedback Loop (FBL) data
*   Authentication status

### 2. Monitor Microsoft Reputation Data

Microsoft provides similar visibility into IP reputation and complaint activity for Outlook and Hotmail domains.Like Gmail, Microsoft expects complaint rates to remain below acceptable thresholds. Sustained complaint rates above 0.3% can negatively impact reputation and trigger filtering or blocking.

Deliverability problems often emerge provider by provider—not universally across all inboxes—so reviewing reputation data at the mailbox-provider level helps isolate where issues are occurring. Make sure you are up to date on the most recent sender requirements for Gmail and Microsoft.

## Check 4: Engagement and Cadence

Mailbox providers increasingly evaluate sender trust based on recipient engagement. That means audience quality and sending behavior matter just as much as infrastructure.

### 1. Engagement Criteria and Segmentation

Have you recently expanded your engagement criteria or audience targeting? If so, compare performance before and after the change to see whether engagement or inbox placement declined.

It’s also important to reevaluate how engagement is being measured. With growing inaccuracies in opens and clicks becoming less reliable in some cases as well—senders should begin moving away from open-only segmentation criteria.

For stronger audience signals, incorporate downstream engagement metrics like:

*   Website activity
*   Purchases or conversions
*   App usage
*   Other meaningful customer actions

The goal is to build segmentation around real engagement and intent, not just passive email activity.

### 2. List Acquisition and Hygiene

Deliverability issues don’t always come from changing too much. Sometimes they come from not changing anything at all.

Outdated segmentation logic, old suppression rules, or failing to monitor bounce trends can quietly weaken sender reputation over time. If engagement criteria, sunset policies, or bounce management practices haven’t been reviewed recently, it’s worth revisiting them.

It’s also important to review where subscribers are coming from. New acquisition sources can introduce lower-quality or less-engaged contacts that negatively impact overall engagement signals.

Safeguards like double opt-in or CAPTCHA validation can help improve list quality and reduce invalid signups.

**_And as a reminder, purchased or rented lists should never be used, as they violate_** **_Iterable’s Acceptable Use Policy_****_._**

### 3. Send Volume and Cadence

Mailbox providers want to see consistency in sending behavior.

Sending very low volumes followed by sudden spikes can appear suspicious and negatively impact deliverability—especially if engagement signals are already weakening.

Consistency matters across:

*   Daily and weekly volume
*   Audience targeting
*   Send frequency
*   Cadence timing

Maintaining a steady, predictable sending cadence helps build long-term trust with mailbox providers over time.

## Additional Deliverability Checks Worth Reviewing

Many times, when there is a noticeable decrease in your performance, it may be linked to one mailbox provider vs. a performance problem across all. That’s why checking sender reputation at the provider level is a good starting point.

### 1. Run Inbox Placement Tests

Use inbox placement testing to identify whether specific mailbox providers are routing a large portion of your mail to spam folders or promotions tabs. This helps isolate whether the issue is widespread or concentrated to a particular provider.

### 2. Review Content Quality and Relevance

Evaluate both blast and triggered campaigns to ensure messaging remains relevant to the intended audience. As inbox filtering systems increasingly rely on machine learning and AI-driven classification, it’s also important to maintain a balanced text-to-image ratio. Overly image-heavy emails can negatively impact both rendering and filtering decisions.

### 3. Monitor Spam Trap Activity

A high number of spam trap hits is a strong indicator of list quality issues and can quickly lead to landing on a blocklist. This suggests that you are either mailing to outdated, unengaged contacts or pulling in low-quality acquisition sources. Reviewing engagement criteria and acquisition sources is paramount to removing spam trap hits that can lead to blocklists.

### 4. Check blocklists

Perform routine checks to ensure your sending IPs and domains are not listed on major blocklists. A listing with a major network can have a noticeable impact on inbox placement across multiple mailbox providers. 

## What Deliverability Issues Are Really Telling You

Deliverability rarely breaks overnight. Sometimes it’s a quick fix, and sometimes it’s much more muddied and leads down a rabbit hole (we’ve all been there).

Deliverability issues reflect a gradual shift in how mailbox providers perceive your sending behavior over time. That’s why the goal of troubleshooting isn’t just to fix symptoms—it’s to understand what changed and how inbox providers are perceiving that change. 

Authentication, engagement, cadence, audience quality, reputation, and content all work together to shape how providers evaluate your mail.

At the end of the day, mailbox providers’ main goal is to protect their users from unwanted or irrelevant email. Programs that consistently send to engaged audiences, maintain healthy acquisition practices, and deliver relevant experiences over time are the ones that continue earning inbox placement and long-term trust.