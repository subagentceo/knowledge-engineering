# Deliverability Insights

Twilio SendGrid's Deliverability Insights is a streamlined in-app dashboard that provides an actionable view of your email delivery performance over time.

Email is a data-rich channel, offering critical insights that can help you better serve your audience. However, parsing and interpreting that data is often difficult. That's why we created Deliverability Insights.

This documentation will help you understand Deliverability Insights and how to take action based on the data it provides.

## What is email deliverability

Deliverability refers not only to getting your messages accepted by mailbox providers, but also to reaching your recipients' inboxes — not their spam or junk folders.

**To view your Deliverability Insights dashboard**

1. Once logged in to the [Twilio SendGrid App](https://app.sendgrid.com/login), navigate to **Stats** in the left sidebar.
2. Below your Stats **Overview**, select **Deliverability Insights** to load your dashboard.

> \[!NOTE]
>
> Deliverability Insights data is not provided in real-time. You should expect your dashboards to be up to 48 hours behind real-time data. For real-time event data, you can use the [Twilio SendGrid Event Webhook](/docs/sendgrid/glossary/webhook/).

Deliverability Insights provides four view tabs to help you understand if you're reaching recipients' inboxes, and, if not, why.

* **Overview**
* **Mailbox Providers**
* **Bounced & blocked**
* **Spam & Unsubscribes**.

The following documentation is organized into sections that match the four Deliverability Insights tabs to help you work with your metrics effectively in each.

## Overview

Every sender has different key metrics to watch, but the following primary deliverability metrics are important for every sender to monitor at a high level, which is why they are presented on the Deliverability Insights **Overview** tab.

* **Processed**: How much mail you tried to send.
* **Delivered**: How much of your mail actually got delivered.
* **Bounce & Blocked**: How much of your mail failed to deliver.
* **Unique Opens**: How much of your mail was opened.

While these numbers don't tell you the whole story, it's rare to have a significant deliverability issue that doesn't appear in these metrics.

### Understanding your primary deliverability metrics

#### Processed

The **Processed** metric represents the number of messages you attempted to send through your Twilio SendGrid account. Twilio SendGrid considers a message processed once it successfully reaches the SendGrid system and SendGrid attempts to deliver the message. However, not all processed messages are successfully delivered.

#### Delivered

The **Delivered** metric represents the percentage of messages that were successfully accepted by your recipients' mailbox providers. Getting messages delivered is the first step towards good deliverability. When a mailbox provider accepts a message, it is then up to the mailbox provider to determine what to do with that message. The mailbox provider has a few options.

* Place the message in the recipient's spam folder.

  * Mail is placed in the spam folder if the mailbox provider does not believe the message is wanted by the recipient.
* Place the message in the recipient's primary inbox

  * Mail is placed in the inbox if the mailbox provider believes the message is wanted by the recipient.
* Place the message in the recipient's non-primary inbox tabs

  * Some mailbox providers offer multiple tabs to help users organize their inboxes. Mail landing in a "Promotions," "Updates," or "Social" tab is the deliverability equivalent of reaching the inbox.
* Accept the message and then delete it.

  * Though it rarely occurs, a mailbox provider can accept a message for delivery and then decide the message should not be seen by the recipient. In this case, there is no record that the message was deleted. It can be frustrating to see that a message was delivered only to find it nowhere in the recipient's mailbox. Unfortunately, there is no solution for identifying when this takes place.

#### Bounced & Blocked

The **Bounced & Blocked** metric represents the percentage of messages that were not successfully delivered.

* A **Bounce** indicates that the email address you attempted to reach does not exist.
* A **Block** indicates that the message was not delivered for a reason other than being bounced.

  * Messages can be blocked for a number of reasons, including problems with your sending IP, the message content, or other message-specific issues. For more information about blocks, see our [Suppressions documentation](/docs/sendgrid/ui/sending-email/index-suppressions#different-types-of-suppressions).

Knowing which direction your overall bounced and blocked rates are trending is a great start. Understanding bounce and blocked metrics is detailed in the [Bounces & Blocks section of this document](#bounces--blocks).

#### Unique Opens

The **Unique Opens** metric represents the percentage of delivered messages that were opened. Unique open rates are a key performance indicator (KPI) for many email programs. Watching for trends in your unique open rates can help you spot deliverability issues. For example, if you made no changes to your sending behavior but your unique open rate is falling, this could indicate that one or more mailbox providers is sending your email to the spam folder.

### Monitoring your deliverability trends over time

Watching trends in your metrics over time is invaluable. If there is a clear date when a metric changed, look into what might have changed in your sending behavior on or around that date.

The Deliverability Insights Overview chart is a great starting point for any investigation into your overall deliverability performance. When you spot an increased block rate or a falling open rate, you can then use the other Insights sections to dig deeper.

### What can I do about falling deliverability rates?

*If you see a decrease in your deliverability rate*

1. Navigate to the **Mailbox Providers** section of Deliverability Insights.
2. Look at the **"Are your emails being delivered?"** section to determine which mailbox provider is not accepting your messages.

This further investigation is useful because it helps you understand if the problem is isolated to a few mailbox providers or if it is widespread, which informs how you address it going forward.

### What can I do about increasing bounce or block rates?

Bounces and blocks are paired in the **Overview** section of Insights because they both represent messages that were not delivered. However, bounce events and block events are different failure classifications, caused by different issues, requiring different solutions.

*If you see an increase in bounce and block rates*

1. Navigate to the **Bounce & Blocked** section in Deliverability Insights.
2. Determine whether it is bounces or blocks that are increasing.

#### Increased Bounce rate

Bounces happen when you attempt to send to email addresses that are not valid.

*If your bounce rate increases*

1. Determine whether anything has changed with the way you collect email addresses.

   1. Changes in address collection practices are a common reason for increased bounces or bounce spikes.
   2. Bounce spikes can also occur when mailbox providers deactivate email addresses that were once valid.
2. Investigate how these email addresses got onto your list and how long they have been on your list without engaging.
3. Inspect your signup forms.

   1. Encourage recipients to enter valid email addresses (either by implementing confirmed opt-in or requiring recipients to type their addresses twice.)
   2. Consider protecting forms with Captcha if applicable.

#### Increased Block rate

*If your block rate increases*

1. Navigate to the **Bounced & Blocked** section of Insights and determine which mailbox provider is blocking your messages.
2. Investigate why your messages are being blocked by looking at the reasons within [SendGrid's suppression interface](/docs/sendgrid/ui/sending-email/index-suppressions/#different-types-of-suppressions).

### What can I do about decreasing open rates?

*If your open rate decreases*

1. Determine whether the decrease is isolated to a single mailbox provider, a few providers, or occurring across all providers.

#### Decreased open rate across all mailbox providers

If your open rates are dropping consistently across most of your top mailbox providers, the decrease is likely the result of organic loss of interest in your content or email fatigue. In this case, reduce your sending frequency, rethink the types of messages you are sending, or both. Are these messages still relevant? Is your offer compelling? Are people losing interest in your brand?

#### Decreased open rate among a few providers

If your open rates are dropping at one or two mailbox providers only, those mailbox providers are likely sending some or all of your email to the spam folder. In this case, adjust your sunsetting policies, audience targeting, and sending frequency for recipients at the affected mailbox provider(s).

## Mailbox Providers

Mailbox providers are companies such as Gmail, Yahoo, and Microsoft that provide email mailboxes to consumers and businesses. Though mailbox providers rely on the same basic principles to determine if mail is wanted, they all use proprietary algorithms to determine if your email should reach their users. It's common for two different providers to reach two different conclusions.

### Why look at my delivery stats by mailbox provider?

You'll often hear businesses and people refer to the Big 4 or MAGY — Microsoft, AOL, Gmail, and Yahoo. For most senders, especially those sending primarily to North American audiences, these companies will be the four providers they send to most often. However, due to geography, demographics, business model, or vertical, many senders will have a very different Big 4.

The **Mailbox Providers** section of Insights will surface your top mailbox providers based on your actual sending behavior, so no matter who you send to, Twilio SendGrid will always display the mailbox providers that have the greatest impact on *your* deliverability success.

It's incredibly important to monitor all of your primary deliverability metrics by mailbox provider because deliverability issues with one mailbox provider do not necessarily indicate problems with all the others. Monitoring at the provider level also helps you hone your solutions when problems do arise. For example, if your Gmail open rates suddenly drop, you may want to adjust your sending behavior to address your Gmail audience specifically rather than making sweeping changes across your entire email program.

### Understanding your delivered rates by Mailbox Provider

In the **Mailbox Providers** section of Insights we display your delivered rates for each of your top mailbox providers. Having a high percentage of your email [delivered](#delivered) to your top providers is a good first step towards healthy deliverability. However, just because a mailbox provider has accepted delivery of your messages doesn't mean they arrived at your recipients' inboxes.

#### What to watch for in delivered rates

* When looking at the **Mailbox Providers** chart, search for differences in delivered rates among your top providers. If, for example, Gmail and Yahoo have 99% delivered rates and Microsoft has an 89% delivered rate, it's safe to assume that you're doing something to cause Microsoft's filters to mistrust your messages.

  * In this case, look to the Bounce & Blocks section of Insights and determine the cause of the poor delivered rate at Microsoft.
* You should also use the **Mailbox Providers** chart to determine when a specific mailbox provider started rejecting some of your messages. If you can correlate a change in your sending behavior such as increased volume, increased frequency, a new mail stream, or a new address collection source to the drop in delivered rate, you can consider rolling back those changes.

### Understanding your open rates by mailbox provider

Your open percentages should be fairly consistent across your top mailbox providers. If you see a mailbox provider with open rates significantly lower than your other providers, the under performing mailbox provider is likely sending some of your email to the spam folder.

#### What to watch for in open rates

* Look for large deviations in open rate across your top mailbox providers. If you notice large deviations across providers, do some or all of the following:

  * Reduce your sending frequency to recipients at the underperforming provider.
  * Temporarily tighten your [sunsetting policy](/docs/sendgrid/api-reference/sendgrid-engagement-quality-api).
  * Look for specific campaigns or message types that are underperforming and suspend or eliminate them.
* Look for sporadic changes in your open rates across your top mailbox providers. If your open rates are frequently going up and down by 5 or 10 percent at a specific provider, the provider could be sending just one type of message to the spam folder. At this point, use Twilio SendGrid's [Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) or [Category Stats](/docs/sendgrid/api-reference/categories/retrieve-all-categories) interface to determine if there is a specific campaign or message type that is generating a poor open rate.

## Bounces & Blocks

Bounce and block events indicate that an email was rejected by the mailbox provider. While bounces and blocks both specify that your message(s) failed to deliver, it is important to understand the difference between bounces and blocks.

### Understanding and reducing bounces

#### What are bounced messages?

A message bounces when you attempt to send it to a mailbox that doesn't exist. This could be an email address that never existed or an email address that was once valid but has been retired or deactivated. A message can bounce because the local part (the part before the @) is invalid or because the domain (the part after the @) is invalid. When a message bounces, it is a good idea to suppress that address from future mailing. Twilio SendGrid's suppression management system takes care of this automatically, but you may wish to also remove the address(es) from your own internal lists.

#### How should I interpret my bounce rates by mailbox provider?

Mailbox providers consider excessive bounces or spikes in bounces to be an indicator that you are sending unwanted email. Twilio SendGrid likes to look at bounces at each mailbox provider because each provider has slightly different rules for determining if an address is valid. For example, some mailbox providers ignore periods in the local part of an email address.

Excessive bounces are generally related to your address collection practices. When collecting new email addresses, follow these best practices and tips.

* Require new recipients to type their email addresses twice.
* Use [confirmed opt-in](/docs/sendgrid/ui/managing-contacts/building-your-contact-list).
* Leverage an address validation tool.
* Protect your signup forms with captcha.
* Avoid purchasing lists.
* Avoid [list scraping and list renting](https://sendgrid.com/blog/spam-traps-what-they-are-and-why-you-should-pay-attention-to-them/).

### How to reduce bounces

* Check to see if your overall bounce rate is consistently over 5%.

  * If it is, audit all the places you collect recipient addresses and see if there are ways you can decrease the likelihood of collecting an invalid address.
* Look for specific mailbox providers that are generating excessive bounces. If your overall bounce rate is only 2%, but you have a 10% bounce rate at Yahoo, determine if there are any differences in the way you collect Yahoo addresses. In some cases, you can make changes specific to your Yahoo Audience.
* Implementing [confirmed opt-in](/docs/sendgrid/ui/managing-contacts/building-your-contact-list) can be a controversial proposal, and for good reason. However, if bounce rates at a single mailbox provider are excessive, you could implement confirmed opt-in for addresses at that one provider. This can make confirmed opt-in more palatable from a business standpoint.

### Understanding and reducing blocks

Like bounces, block events indicate that a message was not delivered. Unlike bounces, a block does not indicate the recipient's address was invalid. Rather, it means that your message failed because of content and reputation issues or technical failures.

#### Content and Reputation issues

If a mailbox provider has reason to believe that you are sending unwanted email, they can decide to block your messages. Common reasons a message may be blocked for content include:

* Detection of suspicious links.
* Detection of suspicious HTML characteristics.

  * Hidden fields
  * Text that's the same color as the background.
  * A message that is one solid image with no accompanying text

#### Technical failures

If there is a technical failure, a message may become undeliverable. Common technical failures that can result in a block include:

* A server is unreachable for an extended period of time.
* The mailbox provider is unable to look up the necessary DNS records to verify a sender.
* Attempting to reach a mailbox that is full or otherwise over quota
* Sending email to a certain mailbox provider too fast.

#### How should I interpret my block rates by mailbox provider?

Like most other email metrics, it's important to monitor your blocked emails in aggregate as well as by mailbox provider. Remember, just because one mailbox provider is blocking your email does not mean that other mailbox providers are doing the same.

#### How to reduce blocks

* Look at your distribution of blocks by mailbox provider.

  * Aim for a block rate of 3% or less at all of your primary mailbox providers. You can strive for lower block rates, but avoiding blocks entirely is not realistic. It is simply a part of sending email.

## Spam & Unsubscribes

### Monitoring and reducing spam reports

The systems that return spam report data to senders are called Feedback Loops (FBLs). A spam report event is logged any time a user hits the "Report Spam" or "This is junk" button for one of your messages. Mailbox Providers, most notably Gmail, do not send back Spam Report data. Twilio SendGrid is automatically configured to collect spam report data from all mailbox providers that offer it. Your only job as a sender is to monitor your complaint rates (in aggregate, and at your top mailbox providers) and keep them as low as possible. Most deliverability experts consider a spam report rate above 0.1% to be excessive. To reiterate, this means a spam report rate of 0.1% or higher at any single mailbox provider is a potential deliverability risk.

### How should I interpret my spam rates by mailbox provider?

As mentioned earlier in this section, some mailbox providers do not send spam report data back to the sender. This makes monitoring complaint rates by provider essential. Sudden spikes in spam reports can dramatically lower your reputation and deliverability.

### How to reduce spam reports

* There are a number of things that cause a recipient to hit the "Report Spam" or "This is Junk" button, including:

  * Too many messages: if complaint rates are high, look into reducing your sending frequency.
  * Irrelevant to the recipient's needs or expectations: consider the expectations that were set at the point of signup. Ensure the messages you are sending meet those expectations and are relevant to what your recipients sign up for. Set clear expectations up front, and honor those expectations.
  * Misleading or appearing to be dishonest: avoid clickbait in your messages. We promise, 100 "extra" clicks isn't worth a single extra spam report.
  * Inconsistent branding: be sure messages are consistent with the branding that was on display when the recipient signed up. When someone signups up for the `example.com` newsletter, they don't expect to receive email that looks like it came from `otherexample.com`. Make sure recipients know this message is from the organization they signed up with.
  * Sending unengaged recipients email for long periods of time: if a recipient hasn't opened or clicked an email in 3 months and you continue to send to them, this will eventually cause email fatigue and can lead them to mark your mail as spam. Implement engagement based sunsetting policies to ensure that long term unengaged recipients eventually stop receiving email.

### Monitoring and reducing your unsubscribe rates

Unsubscribe rates can provide great insights into what your recipients think about the email you are sending them. When you see a spike in unsubscribe rates, investigate what types of mail you sent around the time of the spike. Try to determine why this message or campaign might have missed the mark and why it caused more users than normal to unsubscribe from your mailing list.

> \[!NOTE]
>
> Unsubscribes are not directly impactful to your deliverability or your reputation. However, if unsubscribes are high, it is a great indication that your email isn't resonating with your audience. Therefore, addressing increasing unsubscribe rates can help preempt actual deliverability and reputation issues.

Attempting to prevent people from unsubscribing is a bad idea. No one likes to see high unsubscribe rates, but unsubscribes are better than spam reports. Every organization that sends commercial email should give users a quick, reliable, and trustworthy way to unsubscribe from their messages.

* Don't hide your unsubscribe button.
* Don't make it inconvenient to unsubscribe.
* Don't give recipients any reason to believe you will not honor their unsubscribe.

### How to reduce your unsubscribe rate

* We think about reducing unsubscribe rates in the same way we think about reducing spam report rates. People unsubscribe from email programs when they are unhappy with or uninterested in the email they are receiving. This could mean they are simply getting too much email. It could also mean that the email they are getting is irrelevant to them.
* Reducing unsubscribes starts by setting clear expectations at the point of sign up, and honoring those expectations for the duration of your relationship with your recipient(s).
* Offering a "downsubscribe" option is also an idea worth exploring. If you send your recipients 5 messages per week, give them the option to choose a lower frequency. This can help reduce the number of opt-outs and allow you to keep more subscribers on your list.
