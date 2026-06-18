# Building a Strong Email Reputation With IP Warm-Up - Iterable

## Building a Strong Email Reputation With IP Warm-Up

**Published by**

August 16, 2024

![The image features a red circle with a white envelope icon, symbolizing email, set against a purple background. To the right of the icon, the text reads "Building a Strong Email Reputation With IP-Warm Up," suggesting the content is related to strategies for establishing email sender reputation through IP warming.](https://iterable.com/wp-content/uploads/2026/04/081524_IP-Warming_Blog-Header.png)

A quote that we often refer to in the email deliverability community is one of Benjamin Franklin’s which was, “It takes many good deeds to build a good reputation, and only one bad one to lose it.” Like many areas related to email sending and deliverability, this quote applies beautifully to IP warming.

An IP warm-up is, when done correctly, one of those “deeds” to assist in building a good sending reputation for a sender. Conversely, when executed poorly or not done at all, the lack of an IP warm-up can be one of those factors which can tank a sender’s reputation and deliverability of those emails. When working with senders of all types and verticals, we get asked “why?” “Why does it matter to warm up an IP address?” “We don’t see that with other marketing channels like SMS?”

So, let’s get into it.

### Why Does IP Warming Matter?

The truth of the matter is, IP warm-up recommendations aren’t conjured up by Email Service Providers (ESPs) to make life more difficult for senders. The recommendations come directly from the Mailbox Providers like Gmail, Microsoft, and Yahoo.

When sending on new infrastructure, like a fresh dedicated IP address, Mailbox Providers want to see specific behaviors from senders. They want a “formal” introduction to volume, they want to see predictable volume patterns, and they want to see positive email engagement signals from a sender’s recipient data. These variables make for a recipe that the mailbox providers will likely savor.

#### IP Warm-Ups for All Brands, Old and New

It’s important to note that IP warmups don’t only apply to new IPs and sending infrastructure. The concepts that we will explore also apply to existing senders looking to ramp up their existing email volumes to new levels for their peak sending seasons, like the holidays. It’s a reminder to all senders that their IP addresses are only as warm as the average daily or campaign volumes that they are sending. If the IP is brand new and the average volume is zero, then that IP is warmed to zero email volume. If an IP address has an average volume of 100,000 emails per day or per campaign, that IP is warmed up to handle 100,000 emails. If volumes will be greatly increasing beyond those averages, it is an important step to execute an IP warming strategy in both scenarios.

### Before the IP Warm-Up: Building a Sending Foundation

Before we dive into the considerations, tactics, and strategies of IP warm-ups, it’s important to know what these things are doing to help build a sender’s reputation with Mailbox Providers.

“Reputation” is a buzzword in Email Deliverability that everyone knows but not everyone understands. What goes into a sender’s email reputation you might ask? There are a few different factors but two primary factors are IP address reputation scoring and domain reputation scoring, particularly with the “d=” signature domain within a DKIM record. The Gmails and Yahoos of the world will place scores on those elements that make up a sender’s “reputation” to that particular mailbox provider. If done right, a warming of an IP will help begin to establish positive scoring on those elements.

Before any IP warming begins, it’s important to make sure that the infrastructure of your email program is set up properly for success even before production sending starts. Bare minimum for email senders are proper SPF, DKIM, and DMARC authentication and alignment. Without these authentication policies in place, it won’t matter how much you follow warming rules, your messages will not deliver. These authentication protocols are a sender’s “calling card” to the mailbox providers. It proves authority and ownership of those outbound emails being sent.

Try sending a few test email campaigns to your own email inbox and open up the email headers to confirm that SPF, DKIM, and DMARC are all passing before you begin your warm up.

![The image shows the results of email authentication checks. It indicates that SPF and DKIM both passed, verifying the email's sender IP and domain authenticity. Additionally, DMARC passed, confirming alignment with the sender's domain policies.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-16-at-12.20.51-PM.png)

_SPF, DKIM, and DMARC information can be found in email headers. Source: Gmail._

### Establishing Predictable Sending Patterns

The typical stance any mailbox provider will take on a brand new IP and sending infrastructure will be “guilty until proven innocent.” It’s important to not give them a reason to be suspicious of your mail. This is why slow-and-steady will win the race for senders.

Mailbox providers want to see low sending volumes out of the gate with a phased throttled increase of that volume over time. This allows them to effectively assess the emails and what recipients are doing with those emails, and begin building their filtering algorithms around the IP address.

A consistently smooth curve up and to the right to where a sender is eventually getting to their average email volumes is creating predictable patterns for those mailbox providers. Sending too high too early or spikey sending patterns will likely create red flags for those mailbox filters.

#### Determining Early Send Volume

Depending on which type of mailstream you are warming the IP up on (transactional versus marketing), and which metrics (opens, clicks, spam complaints, hard bounces, etc.) have been associated with the mailstream in the past, you may get a different answer to what your day one volumes should be set to.

I’vee typically taken a more conservative approach to day one volumes and recommend setting limits to 50 emails per IP address a sender is warming up. This means, if a sender has three IP addresses that are being warmed, my recommended day one limit is set to 150 emails.

From day one, the “sweet spot” for the subsequent increases are between 1.5 and two times the previous day’s or campaign volume, with a hard ceiling on two times the previous day’s or campaign volume. Since marketing messages are, generally, a more volatile mailstream than mission-critical transactional messages (password resets, email receipts,etc.) 1.5 to 1.8 times the previous sending volume is where a sender should stay. Those mission-critical transactional messages can tend to have a more aggressive warm-up due to the expectedness of those streams.

#### Taking Mailbox Providers into Consideration

There are two important points to note in this section for senders to take into consideration, when warming a new IP or set of IPs. First, it is important to make sure a sender is distributing their volumes across the breadth of their recipient domains during warm-up. Just because a sender is warming their IP with Gmail recipients does not mean they are also warming their IP up with Yahoo or Microsoft domains.

The major mailbox provider entities are not sharing their algorithms with each other. If a sender has an email audience list that is heavily weighted to one particular mailbox provider as a percent of total, they should create a specific warm up plan for that mailbox provider, apart from the general mailbox provider warm up. This will reduce the risk of spiking their warmup volumes to that particular mailbox provider beyond the recommended limits.

Second, it’s important to remember that many of the major mailbox providers have around a 30-day rolling reputation filter. This means that once a warm up is completed, if there isn’t any sending on that IP for 30 days, the IP address will “cool” back down and the reputation will be reset. Sending again on the IP or set of IPs would require another warm-up.

### The Importance of Good Data Hygiene

Equally as important as creating smooth and predictable email volume patterns, senders want to make sure they are giving positive signals to the mailbox providers by sending to recipients who they know are expecting and will engage with their emails. With IP warmups being as volatile as they are, sending to real recipients who will interact with these messages will go a long way with the mailbox filters in establishing a strong reputation.

A best practice in a new warming process is for senders to first use a validation tool, like BriteVerify, to clean out any non-real or risky email addresses from their audience. This will help reduce sending to non-existent recipients that result in hard bounces during warm-up.

Then, segment the audience from most engaged to lesser engaged (using open and click metrics) and begin sending warm-up volumes to the most engaged audiences upfront. If senders refresh their content during warming, they can also go back and leverage those highly engaged recipients even later on in the warming process. Refreshing content is also good in a warm-up, since it will allow for a sender to sprinkle in more of the lesser engaged recipients later on in the warm up but have these lesser engaged audiences be a minor percent of the total audience.

Recipient data quality is crucial for any IP warmup and beyond. Looking at the typical email conversion funnel example below, the goal for email senders is to reduce as much of the “red” boxes as possible in their data. They should be weeding out non-real and unengaged recipients from their list to maximize the bottom of the funnel. Reducing the “red” squares will ultimately open up the email inbox filters and increase the likelihood of conversions.

![The image depicts the stages of an email campaign, starting with everyone targeted for the email. It shows how emails move from being sent by the Mail Transfer Agent (MTA) to being accepted or rejected by the mailbox provider, and finally, how they reach the inbox or are affected by issues like bounces, spam filters, or traps. The last stages illustrate user engagement and conversions from the delivered emails.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-16-at-12.23.00-PM.png)

_Email Conversion Funnel. Source: Iterable._

### Playing By Their Rules

Senders should be considering what Mailbox Providers do and don’t want to see from fresh IPs and sending infrastructure. We’re playing by their rules. A proper introduction between a sender and Mailbox Provider is key in starting off on the right foot in building a positive sending reputation.

Warming up in smooth predictable patterns and practicing good data hygiene throughout warm-up and beyond will be sending positive signals to the filters. In turn, senders will typically be rewarded for their good deeds. Pointing back to Benjamin Franklin’s quote, don’t let a failed IP warm up or no warm up at all be the deed that takes down your sending reputation. A proper IP warm up should be one of those good deeds that acts like a crucial building block used to build a better sending reputation.

_To learn more about how Iterable’s Professional Services can assist with your deliverability needs, consult your CSM. Or, if you’re not yet an Iterable customer, schedule a demo today._

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.