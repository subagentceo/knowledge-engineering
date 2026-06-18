# What the Google and Yahoo Email Policy Update Means and Why It Matters - Iterable

## What the Google and Yahoo Email Policy Update Means and Why It Matters

**Published by**

October 30, 2023

![Google and Yahoo Email Policy Update](https://iterable.com/wp-content/uploads/2026/04/103023_Email-Update_Blog-Header.png)

_**NEW** **(January 2024): The new policy enforcement start date has been updated to reflect newly-released information.**_

As some senders may know, earlier this month Google and Yahoo made a joint announcement that will effectively change how commercial email will be sent and received on a global scale forever. 

Starting in **April of 2024** (originally February), both email platforms will begin to block and aggressively filter incoming email traffic that doesn’t meet new message authentication and procedural requirements. Additionally, they also included some infrastructure and performance thresholds associated with commercial email best practices. 

Sounds dramatic? Well, in a lot of ways, it is. After all, it’s been quite a while since a shift in industry policy or practices had the potential to affect such a large population of digital marketers.    

There is good news, though. These changes will not only help this industry collectively raise the bar with which _**all legitimate**_ mail is measured, but apart from a couple of updates that some senders may have to address, it also directly outlines elements of commercial email that most will already have in place.

Let’s take a look at the main points of this announcement, what they mean, and why this will definitely matter to you as you transition your email program into the New Year.

### Impact of the New Requirements

There are two main areas of focus for these new requirements: the _technical infrastructure_ of commercial email messages, and more tactical and familiar feeling guidelines on _permissible levels of email recipient complaints_.

Undoubtedly the most important piece of this announcement to the most commercial email senders of the world relates to how their outbound email system infrastructures are configured and authenticated.

I won’t spend much time talking about what the main elements of email authentication are as much as what the requirements of them will become. You can read more about how these authentication pieces work here.

### Key Changes in the Google and Yahoo Email Update

As for the requirements themselves, they are not novel to commercial mail. Google and Yahoo are simply moving towards making these known email best practices required instead of “strongly recommended.” The primary points of the announcement are:

1.  **Passing DKIM and SPF Protocols:** Senders must properly configure their outbound emails with _passing_ DKIM (domainkey identified mail) **and***  SPF (sender policy framework) protocols. This means that you will update your domain and IP’s DNS to essentially say you are who you say you are and that you’re sending email using the right infrastructure. (*a passing DKIM and SPF policy, as opposed to DKIM OR SPF is specific to those who send over 5,000 messages at a time to either mailbox provider, which is the vast majority of commercial senders anyway.)
2.  **DNS Configuration:** A sender must have a “fully qualified reverse DNS” (FQrDNS), sometimes referred to as a  “forward confirmed reverse DNS” (FCrDNS) configured, which connects an authorized sending domain to an authorized sending IP using an “A” record and a “PTR” record respectively.  
3.  **DMARC Records:** In perhaps the biggest news, part of this new policy requires that a sender’s FROM sending domain must have a present and passing DMARC (“domain-based message authentication, reporting, and conformance”) record. You can learn more about DMARC itself here or at dmarc.org. Without getting into the weeds about what DMARC is here, Google and Yahoo are now mandating that senders: 
    1.  Have a DMARC record in place on their sending domain. 
    2.  That the DMARC record will pass, meaning that either the DKIM or SPF authentication protocols are passing AND are aligned with a root domain.  
    3.  Important note: It is permissible to have a DMARC policy type of “none,” or, “p=none,” which is the lowest form of domain owner enforcement of a policy. 
4.  **Easy Unsubscribe:** In all commercial messages, there must be the presence of a couple “easy” unsubscribe mechanisms. Google and Yahoo have described this as making sure that messages have a “one-click” unsubscribe element ingrained into the message’s architecture list-unsubscribe header value as well as a clear and conspicuous unsubscribe element in the footer of all commercial content. As always this is not legal advice, but all commercial senders should be familiar with and make sure they follow the US CAN-SPAM Act, as this defines requirements in more detail. _*Enforcement for the list-unsubscribe is tentatively scheduled to start rolling out in June of 2024 (previously February)._
5.  **Complaint Rate Threshold:** For really the first time, Google has specified a complaint rate threshold for mail to be blocked outright on their platform. Keep in mind that Google calculates and reflects complaint rates differently (spam complaints/messages delivered to Google inboxes) than the other, more traditional global mailbox providers (spam complaints/messages delivered). In efforts to maintain consistency of messaging and adoption, Google and Yahoo have both specified the complaint rate limit as **.3%**. It must be noted, however, that problems with reputation, deliverability, and email performance will begin to suffer with complaint rates much lower than that. You can learn more about gaining access to Google Postmaster Tools data here. 
6.  **Sender Domain:** Another notable detail of this announcement relates to all senders that use “gmail.com” as the sending domain for any commercial or business mail. Similar to their requirement for sending domains to have an active DMARC record, Google is moving their DMARC policy to “quarantine.”  This means that if a sender uses “gmail.com” to send commercial email from anywhere but directly from their Google account, they will be automatically filtered to the spam folder. This has long-since been known as something to avoid as a business in general, so this particular development makes a lot of sense.

### Why These Updates Matter

Lastly, I think it’s important to talk about the “why” behind these shifts. The motivation of these mailbox providers is not to make it difficult for commercial email marketers to reach their customers; it is to simply provide the most value to their end-users as possible. This means giving them the experience and content that they want, and keeping them from getting content they don’t want.   

This will not prevent bad actors from working to flood your inbox with spam, phishing, or malware, but this will force the digital marketing industry to collectively raise the bar for what secure, valued, and trustworthy email looks like. 

_Want more info on the Google and Yahoo requirements? Register for our webinar on February 13, hosted by Seth Charles._

_Seth and his team are the go-to experts in all things email. Sign up for a demo today to chat with them!_

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.