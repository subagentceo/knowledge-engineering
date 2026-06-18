# Bounce and Block Classifications

Bounce and block classifications help you make sense of the millions of different SMTP responses that Twilio SendGrid receives from mailbox providers on your behalf. Mailbox providers communicate failures in different ways, and there are many reasons a message may fail. Twilio SendGrid conveniently buckets all of these responses into seven classifications by mapping each unique response to one of them:

* [Invalid Address](#invalid-address)
* [Technical](#technical)
* [Content](#content)
* [Reputation](#reputation)
* [Frequency/Volume](#frequencyvolume-too-high)
* [Mailbox Unavailable](#mailbox-unavailable)
* [Unclassified](#unclassified)

This means that you can stop trying to interpret cryptic response codes and messages from mailbox providers and spend your time fixing the root causes of the message failures.

You'll find definitions for each of the classifications and some useful tips and action items for reducing each type of rejection in the following sections.

> \[!NOTE]
>
> Mailbox providers modify response codes and rejection messages over time. Our team and our technology work hard to keep these classifications as accurate as possible, but classifications will change as we make adjustments to our system and as mailbox providers change the way they use specific response codes.

## Invalid Address

The Invalid Address classification groups SMTP response codes that indicate the recipient's email address is syntactically incorrect or the recipient's mailbox does not exist. Email addresses that were valid at some time in the past can become *invalid* at any time. Some mailbox providers will purge mailboxes that have not been used in a long time. This means that an address could become invalid today even if you were successfully delivering mail to that address yesterday.

Invalid Address rejections are often referred to as [hard bounces](/docs/sendgrid/glossary/bounces#hard-bounces). Excessive hard bounces can negatively impact your reputation and cause deliverability problems. There is no exact number or percentage of hard bounces that causes deliverability issues, but Twilio SendGrid recommends generating hard bounces from fewer than 5% of your attempted messages.

### How to address Invalid Address rejections

If Invalid Address rejections make up a large percentage of your total rejections, you can implement several strategies to reduce these rejections. Before taking any action, determine whether or not these rejections recently increased or decreased. Figuring out *when* Invalid Address rejections became a problem can help you determine the best course of action.

* Ask yourself if you recently made any changes to how you collect or retain addresses and determine if these changes line up with increases in Invalid Address rejections.
* Make sure all of your signup forms are protected by [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA).
* Leverage SendGrid's [Email Validation](https://sendgrid.com/solutions/email-api/email-address-validation-api/) tool. Address validation tools can greatly reduce Invalid Address rejections and protect your reputation.
* Never purchase, rent, or scrape email addresses. When you acquire email addresses this way, a high percentage of the addresses will likely be invalid.
* Implement [confirmed opt-in.](/docs/sendgrid/ui/managing-contacts/building-your-contact-list#opt-in-email) Sending a confirmation email immediately after a recipient signs up ensures that the recipient provided a valid email address that they own.

Implement an engagement-based [sunsetting policy.](https://sendgrid.com/blog/building-your-business-case-for-an-email-sunset-policy/) Sunsetting policies will help increase engagement rates and help reduce Invalid Address rejections by removing long-term unengaged recipients before their mailboxes become invalid.

## Technical

The Technical classification is used to group rejections that were caused by a technical problem. Rejections with this classification can indicate a technical problem with the sender *or* with the mailbox provider. Unfortunately, in most cases, it is difficult or impossible to determine which side the problem is on from the rejection message alone. Here are some common causes for Technical rejections.

* The sender has missing or misconfigured DNS records.
* The sender is failing authentication.
* Temporary DNS or network failures.
* Terminated connection between sender and receiver.
* Service outages at the mailbox provider.

### How to address Technical rejections

* Ensure that you have all the necessary DNS records in place. This includes [DKIM](/docs/sendgrid/ui/account-and-settings/dkim-records), [SPF](/docs/sendgrid/ui/account-and-settings/spf-records), MX, and [rDNS records.](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns)

  * Following the Twilio SendGrid documentation for [domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication) ensures that your DNS records will be properly configured to avoid technical failures related to DNS configuration.
* Ensure you are passing SPF, DKIM, and [DMARC](/docs/sendgrid/ui/sending-email/dmarc).

  * There are a few ways to check your authentication results. Start by sending yourself a test message from your Twilio SendGrid account and following [this guidance from Google](https://support.google.com/mail/answer/180707).
  * Once again, ensure you have properly followed the steps in our [domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication) docs.
  * Ensure you are using one of your validated authentication domains in the From address of all your messages.
* Identify which mailbox provider is generating the bulk of these failures.

  * If the problem is isolated to a single mailbox provider, and the spike in Technical rejections did not last long, the problem is most likely with the mailbox provider, and no action is necessary.
  * If technical rejections have been happening for days or weeks, take a closer look at the first two suggestions on this list: check your DNS records, and be sure you are passing SPF, DKIM, and DMARC.
* Technical rejections are more common at smaller mailbox providers than at major providers like Gmail or Hotmail. If most of your mail is flowing to mailbox providers outside of the Big 4 (Gmail, Hotmail, Yahoo/AOL, or iCloud), you should expect higher levels of Technical rejections than someone sending primarily to the Big 4.

  * Technical rejects are a part of sending email at scale. Don't worry about a small number of these rejections — especially at smaller mailbox providers.

## Content

Rejections classified as Content indicate that the mailbox provider believes the content of your messages is potentially spam, malicious, or otherwise untrustworthy. Mailbox providers can reject messages for a number of content-related reasons. Here are some common ones.

* Suspicious links or URLs within the content.

  * Mailbox providers analyze the links and URLs in your messages. If your message contains links to suspicious or untrustworthy websites, your message can be rejected.
  * Many mailbox providers will reject messages that contain link shorteners such as [Bitly](https://bitly.com/).
* Message content is too large.

  * Some mailbox providers have a maximum message size. This limit varies from provider to provider. For example, Gmail has a max message size of 25Mb. Hotmail will reject messages larger than 10Mb. Smaller mailbox providers or legacy mailbox providers can have size limits as low as 2Mb.
* Attachment too large, no attachments allowed, or invalid attachment type.

  * Mailbox providers can reject messages that contain any attachments. They can also reject messages that contain attachments that are too large or messages that contain specific types of attachments.

    * Most mailbox providers accept most types of attachments; however, because the mailbox provider landscape is incredibly diverse, it isn't possible to catalog all mailbox providers and their acceptable attachment types and sizes.
    * Removing or modifying attachments is a test worth performing if you are experiencing stubborn Content-related rejections.
* Text to Image ratio

  * When an email message contains just a single image and no accompanying text, it may look like the sender is trying to disguise the content of the message. Avoid sending messages that contain mostly images and very little text.
  * Continue to the [How to address content rejections](#how-to-address-content-rejections) section for more information
* Spam or malicious content.

  * This type of content rejection occurs when the message you sent closely resembles known spam or malicious email. Mailbox providers and spam filtering companies are constantly reviewing which messages generate negative feedback from their users. This is a moving target. What recipients were marking as spam last year might be totally different than what they are marking as spam today.

### How to address Content rejections

* Check your messages for link shorteners. If you need to use a link shortener, make sure it is a custom link shortener that is only used by your organization. Link shorteners are not a problem in and of themselves. However, they are commonly abused by bad actors, so avoid generic or "shared" link shorteners like bit.ly.
* Make sure all the links and URLs in your messages are [branded](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding). Otherwise, make sure you can vouch for the legitimacy of every domain, link, and URL in your messages.

  * Mailbox providers analyze the links and URLs in your messages. Even if you are sending messages your recipients genuinely love, including a link to a malicious website or a link with a domain that has been used to send spam can cause Content rejections.
* Check your message sizes. If your messages regularly exceed 5MB, reduce the size of your messages and see if Content-related rejections drop.
* Remove attachments from your messages. Attachments do not need to be avoided in all circumstances, but they can cause problems. Send some messages without attachments and see what impact it has on your Content rejections. You can also try sending with smaller attachments or attachments of a different file type.
* Ensure your messages have a healthy text to image ratio. There is no firm rule here, but a widely accepted best practice is to include at least two sentences of text for every image in your message. Think of it this way: if your email had no images in it whatsoever, would a recipient know what the message was about? If not, you might have a poor text to image ratio.

If you've investigated the possibilities above, your message content could be flagged because it looks like messages sent by known bad actors. In this case, there is no way to determine exactly what is causing the mailbox provider to believe your message is spam. In almost *all* cases, you should work on improving how recipients are engaging with your mail rather than attempting to change your subject line or reword your message text. It's much more common for content to be flagged as spam due to high spam complaint rates and poor engagement than it is for content to be "mistaken" for spam because it looks like another message. Fiddling with subject lines and new templates is almost never the answer.

## Reputation

The Reputation classification is used to group rejections that indicate the mailbox provider detects reputation issues with your sending domain or sending IP. Mailbox providers establish your sender reputation using complex algorithms that use hundreds or even thousands of signals to determine your trustworthiness as a sender. In most cases, it's difficult to determine the exact reason a mailbox provider has decided you have a poor reputation. However, your reputation is largely determined by two things: how your recipients *engage* with your messages and your *sending behavior*.

### Recipient Engagement

* Positive recipient engagement includes things like recipients replying to a message, opening a message, moving an email out of the spam folder, marking a message as important, or adding an email address to a contacts list.
* Negative recipient engagement includes things like spam complaints, marking a message as phishing, deleting a message without reading it, or not opening email from a specific sender for an extended period of time.

### Sending Behaviors

* Sending email to recipients who have not engaged with your email for an extended period of time.
* Sending email that your recipients are not interested in receiving.
* Failing to remove recipients who mark your messages as spam from your list.
* Not properly [warming your IPs](/docs/sendgrid/ui/sending-email/warming-up-an-ip-address) and domains.
* Dramatically increasing your sending volume.
* Sending to recipients who haven't opted in to receive your email with *explicit and informed consent* (sending to purchased, rented, or scraped addresses).

### How to address Reputation rejections

Nearly every sender will have *some* of their mail rejected for reputation reasons. However, if reputation rejections make up a large percentage of your total rejections or you see them on the rise, take action as quickly as possible. Here is a quick checklist for anyone looking to reduce their Reputation-based rejections.

* Check your spam complaint rates.

  * Nothing hurts your reputation more than a user marking a message as spam. If you have spam report rates above 0.1% at any single mailbox provider, take a close look at why recipients might be marking your mail as spam.

    * Are you sending too much email?
    * Are you sending email that recipients don't want?
    * Are you sending email to recipients who have opted in to receive your messages?
    * Are you properly setting expectations at the point of signup?
* Tighten sunsetting windows.

  * Sunsetting refers to the act of removing unengaged recipients from your mailing list. Repeatedly sending email to recipients who have not engaged in a long time is harmful to your reputation. If you see reputation-based rejections increasing, it's almost always a good idea to temporarily tighten your sunsetting windows. If you currently remove recipients after six months of non-engagement, tighten that window to five months or four months.
* Make sure your hard bounce rates are as low as possible.

  * Hard bounces occur when you attempt to send a message to an address that doesn't exist. Excessive hard bounces can hurt your reputation. If you regularly have hard bounce rates above 5%, or if you regularly have large spikes in hard bounces, take a look at how you are collecting your addresses. Purchasing, renting, or scraping addresses should be avoided at all costs. Allowing people to opt in using their social media accounts should also be avoided as these addresses are often old, invalid, or unused.
  * Implementing confirmed opt-in is a great way to reduce hard bounce rates.
* Ensure your IP addresses were properly warmed up.

  * Sudden increases in volume can cause reputation issues. Even if you have been sending from the same IPs for years, significant increases in volume should be done slowly to avoid reputation damage. New IPs should also be warmed up slowly by increasing volume over the course of several weeks.
  * Increases in reputation-based rejections are common during IP warmup. If you are warming an IP and you see these rejections increase, you should continue to send mail but stop increasing your volume for several days. Assuming your email is wanted, this should give the mailbox providers' filters enough time to adjust to your new IP.
* Check your engagement rates.

  * If very few recipients are engaging positively with your messages, your reputation will degrade. Unique open rates below 5% are extremely problematic. You can't force people to open your email, so it's your job to determine why so few people are interested in reading your messages.
* Consider reducing your sending frequency.

  * Sometimes the email you are sending is just fine — you are simply sending too much of it. In many circumstances, reducing your sending frequency can increase engagement rates and reduce spam report rates. Higher open rates and lower complaint rates are excellent for your reputation.

## Frequency/Volume Too High

The Frequency/Volume Too High classification groups rejections that indicate the mailbox provider is unable or unwilling to process the number of messages you are trying to send. You are either sending too many messages or sending them too quickly. Every mailbox provider has different capabilities for receiving email. Some, like Gmail, can receive mail about as fast as anyone can send it. However, many smaller mailbox providers lack the bandwidth to accept massive amounts of email very quickly. In these cases, a mailbox provider can temporarily reject email to protect their systems. Mailbox providers can also permanently reject messages if the sender is greatly exceeding the provider's limits.

Some rejections related to sending frequency or sending volume can also fall under the Reputation classification. Sending volume and frequency limits are often tied to reputation. Twilio SendGrid's systems do a great job of separating reputation-based rejections from non-reputation-based rejections, but the difference is sometimes very difficult to accurately determine.

### How to address Frequency/Volume rejections

* If a high percentage of your total rejections are in the Frequency/Volume Too High classification, determine which mailbox provider is returning these rejections.

  * This is an important first step because it is highly unlikely that you are receiving these rejections from a large number of different providers.
  * Determining which mailbox provider is returning these rejections allows you to target your actions to just the affected mailbox provider rather than making sweeping changes across your entire email program.
* Once you have identified the affected mailbox provider, you should reduce the number of messages you are sending to that mailbox provider on an hourly, daily, or weekly basis. This could mean trimming some unengaged recipients from your mailing list or eliminating a few of your daily sends to that mailbox provider.
* If you are unable to reduce the amount of messages you send to that mailbox provider, you should determine if you can spread your messages out over a longer duration. Instead of sending one large campaign at 1:00pm, you can spread that campaign over four smaller sends throughout the day.

If these actions do not correct the problem, review the [How to address Reputation rejections](#how-to-address-reputation-rejections) section of this page. As mentioned before, there are circumstances where your reputation causes a mailbox provider to cap how much of your mail they will accept. We do a good job of properly classifying reputation-based rejections like this, but classifying rejections is an inexact science. Additionally, it's never a bad idea to take some small steps that will help improve your reputation.

## Mailbox Unavailable

The Mailbox Unavailable classification is used to group rejection messages that indicate the recipient mail server is unable to deliver the email due to a problem with an *individual recipient's mailbox.* These rejections *do not* indicate that the address you tried to reach was invalid. It simply means that the specific mailbox is currently unavailable or not accepting messages. A mailbox can be unavailable for a number of reasons.

* A mailbox can be full. This means the mailbox is out of space and unable to accept additional email for the recipient. This often (but not always) indicates an inactive email address or a secondary (junk mail) account.
* A mailbox can be deactivated. This typically occurs when the owner of the mailbox has not accessed the email account for an extended period of time. Mailbox providers will eventually purge these accounts from their system and they will become Invalid Addresses.
* A recipient can temporarily deactivate their mailbox, preventing any new mail from being delivered.
* A mailbox can be temporarily suspended by the mailbox provider. Some mailbox providers will return these rejections for lapses in payment or if a large amount of spam or unwanted email is being sent *from* the mailbox.

### How to address Mailbox Unavailable rejections

The Mailbox Unavailable classification can be a tricky one to address because a mailbox provider can stop accepting email for many reasons. Making this even more complicated is the fact that a mailbox can be unavailable temporarily or for a long time. The rejection message almost never indicates how long the mailbox will be unavailable. With that said, there are some actions that can be taken to help reduce these rejections.

* Tighten your sunsetting policy.

  * Mailbox Unavailable rejections often come from mailboxes that have not been accessed in a long time. Recipients who are not active in their mailbox will not open or click messages. Tightening your sunsetting window will remove long term unengaged recipients from your list and reduce Mailbox Unavailable rejections.
* Utilize the [Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) or the SendGrid [Email Activity APIs](/docs/sendgrid/api-reference/email-activity/filter-all-messages) to identify the email addresses returning these rejections.

  * Identify addresses that have been returning Mailbox Unavailable rejections for an extended period of time and add them to your suppression lists.
  * There is no hard rule on what "extended period of time" means in this context, but many deliverability experts suggest suppressing these addresses after three to five Mailbox Unavailable rejections (Twilio SendGrid will not automatically suppress addresses that exhibit this behavior. We believe that decision is best left to our customers).

## Unclassified

Some rejection messages are indecipherable or ambiguous. Most mailbox providers return helpful, well-written rejection messages that give you some idea of what the problem is. Some mailbox providers do not. Rejection messages like "550 There was a problem" are common. When we receive rejection messages that are this ambiguous, we place them into the Unclassified bucket.

### How to address Unclassified rejections

The best way to deal with excessive Unclassified classifications is to use the [Email Activity APIs](/docs/sendgrid/api-reference/email-activity/filter-all-messages) or the [Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) to analyze any bounces or blocks that were marked as Unclassified. Sometimes there are clues or insights in the response string that our system wasn't able to pick up. We are constantly working on more accurate classifications. As our system learns, the number of "Unclassified" rejection messages gets smaller every day and will continue to improve over time.
