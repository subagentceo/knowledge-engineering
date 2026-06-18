# Iterable AMA Recap: Your Top 10 Holiday Deliverability Questions - Iterable

## Iterable AMA Recap: Your Top 10 Holiday Deliverability Questions

**Published by**

November 13, 2020

![Holiday Deliverability AMA](https://iterable.com/wp-content/uploads/2026/04/111320_Deliverability-AMA-Recap_768x512.png)

How does COVID-19 impact my strategy for holiday sending this year? What happens if I increase my sending volume just for the holidays? How can I best prepare myself for Black Friday and Cyber Monday?

With the holiday season quickly approaching, you might find that you’re asking yourself these types of questions, but fear not, our in-house team of deliverability experts recently answered the ones that stumped you the most in this week’s “Ask Me Anything” on holiday deliverability in the Iterable Community.

The questions we received were too good to reserve only for our customers, so read on to meet our team and learn the answers to the top ten!

### Meet the Team

#### 

#### Brian Curry, Sr. Email Deliverability Consultant (left)

Brian Curry has been working in the email deliverability space for nearly a decade now. After running his own deliverability team in the past, he was ecstatic to join Iterable’s Deliverability Team in mid-2019. If you enjoy the sunshine and an ice-cold IPA beer, well then, you just might become best friends with Brian.

#### Quincy Johnston, Sr. Email Deliverability Consultant (center)

Quincy Johnston is a Senior Email Deliverability Consultant at Iterable. She has spent the past seven years focused on email deliverability, advising clients across all verticals and industries.

Quincy is passionate about helping clients better understand what their data is telling them and making it actionable via custom recommendations; troubleshooting inbox performance issues; providing thought leadership through ongoing email ecosystem education; and strategizing on email programs to meet targets and goals. She is a current member of M3AAWG.

When not at work, Quincy loves to take advantage of the Colorado outdoors and attending Rockies games and a number of sporting events with her kids.

#### Seth Charles, Principal Email Deliverability And Industry Relations Manager (right)

Seth Charles has established himself as a veteran in the email marketing and deliverability space for more than ten years now and has been the Head of Iterable’s Deliverability team since early 2019. Also, as a sixth-generation Coloradan, he always enjoys being outside with his wife and three kids (especially if it involves a golf course) and thinks John Elway should be the Emperor of Colorado.

### Ask Me Anything: Your Top 10 Holiday Deliverability Questions

#### 1. What is the most common cause of deliverability issues during a high volume time, like the holiday season?

**Brian**: The most common things we tend to see are issues tied directly to drastically changing your sending behavior in a short period of time.

This can include dipping way back into the database to less engaged users and increasing send volume significantly, increasing the amount of emails recipients are getting causing them to complain, and not carefully planning out how to stagger sends out to avoid looking “suspicious” to the mailbox providers, because the send volume, pattern and quality of data is different.

#### 2. What are the steps to take if we notice deliverability issues?

**Seth**:

1.  Understand if the issues are specific to one or a couple of mailbox providers so you know where the primary problems are— one domain could mean a specific reputation issue there, multiple could mean that a third-party filtering or blocklisting network has flagged your infrastructure.
2.  Attempt to understand WHY. This is commonly overlooked by senders. Typically, it is due to complaints or aggressive segmentation. If your complaint rate is consistently above .08%-.1%, you’re headed for trouble. Review your segmentation parameters for those platforms. Are you sending to recipients that have recently (within 30-60 days) engaged with your email content? Any address that has opened within a year? Any address you’ve ever collected? Focus sends for a week or two to those that have engaged to see if that can start to ease the issues seen.
3.  Regular delisting processes, whether it’s an online form, etc. (if applicable).
4.  Watch for improvements in the various reputation monitoring tools available, but most importantly in your organic mail performance to confirm if you’re on the right track.

#### 3. What’s the best approach to incorporate subscribers into my holiday sends if they haven’t engaged since the previous holiday season without impacting deliverability?

**Quincy**:

1.  Review last engagement, sending past 365 days of no engagement can be risky and impact filtering.
2.  Define the threshold for inactivity and send a campaign that will allow subscribers to opt-back into the marketing messages; if the subscriber does not engage, do not target them during the holidays.
3.  Of the volume that has not engaged in 6 months, 8 months, or longer, slowly increase volume. Spiking volume can trigger filtering, throttling or blocks to occur. 

During the holidays or throughout the year, sending to an inactive or unengaged audience can damage your sender reputation and impact inbox placement. Mailbox providers are monitoring subscribers’ behavior with brands to determine whether this is this mail they are expecting or wanting, based on activity, like Opens/Clicks vs. Complaints or no action.

#### 4. Does staggering sends throughout the day help with delivery?

**Brian**: Absolutely yes. There is a lot of volume sending in the ecosystem during the holiday season and that causes a lot of rate limiting and throttling from the mailbox provider side.

The spam filtering logic at the various mail systems has to decipher very quickly what is “good” and “bad” traffic, and each system has limitations on how much they can accept at any given time.

Breaking up sends over a few hours and not sending at the top of the hour or 5 minutes past is also a really good idea to stay away from where the bulk of the volume is coming in.

#### 5. Rule of thumb for Black Friday/Cyber Monday weekend: How many emails is “too many” for your most engaged email list?

**Seth**: Great question, and the answer will vary from sender to sender. It is obviously common for an “engaged” (and maybe even a few not so engaged) recipients to get an email every day during that weekend. Now, assuming that you’re referring to several emails each day, that could get tricky.

I personally feel that anything more than two messages per day could feel a little pushy, so I would typically advise senders to send around that to their most engaged users. Keep in mind that mailbox providers are on high alert for abuse and the inbox is incredibly crowded during this time, so put the focus on sticking out with relevance instead of frequency.

#### 6. If you usually have several planned sends (over a variety of topics), would you recommend combining them for the most impact or continuing with the normal number of sends (to try to get noticed in a busy inbox)?

**Quincy**: To avoid subscriber fatigue, it is best to minimize the number of sends per day. If it makes sense for your brand, rolling up into a “digest” format is a great approach. During the holidays this can be helpful, because there is a fight to get to the inbox, furthermore to be noticed.

#### 7. If image-to-text ratio is a thing, then why do so many marketers use all images in their emails? Do you think they are just not looking at their deliverability?

**Brian**: It is a thing, but not as big as a thing as it once was. The reason all-image emails can look “suspicious” is that spammers/bad actors sometimes try to avoid any text-based filtering algorithm and hide behind the images to get an unsuspecting user to click where the image is linked.

In terms of why marketers may do all-image emails, it could be a mix of not paying close attention to deliverability/potential content filtering and focusing more on creative designs of their emails and feeling their recipients respond better to image-based emails.

I always like to advise to have a good mix of images and text because it will give the spam filtering system a chance to evaluate and know you are a legitimate sender. As always, it is a good idea to test different types of email content out and see what your recipients engage with the most.

#### 8. How can we get out of the promo tab in Gmail? Does asking users to add us to their address book really work? If so, is there a one-click URL we can use to do this?

**Seth**: Is the content promotional? Most senders that don’t want their content being sent to the promotional tab are sending….wait for it….promotional content.

So first, ask yourself if you’re sending anything except one-to-one communication (like to your friend) or truly transactional, like purchase confirmations. That notwithstanding, if a user adds you to their safe senders list, that can have an impact.

But keep in mind, Google modifies its filtering models several times a day and what happened yesterday won’t necessarily be what happens today or tomorrow.

#### 9. In your opinion, what’s the most impactful thing brands should do to ensure deliverability during the holidays?

**Brian**: When thinking about email deliverability and how spam filtering works, to me, it comes down to really being careful and mindful about your recipients and quality of data. Being relevant and honoring the recipients’ expectations and not over mailing is key too.

In the realm of data quality, making sure to really analyze how engaged the recipient base is, keep the email sends to a more engaged cohort, and minimize older data where you can. Lastly, send in a consistent manner that does not look suspicious to mailbox providers and spam filtering mechanisms.

#### 10. What are the best tools to monitor your deliverability?

**Quincy**: There are several tools within the ecosphere that can be leveraged to help provide insight:

1.  Iterable Insights: dashboards and reporting (opens, clicks, unsubscribes, etc.)
2.  Campaign level data
3.  Gmail Postmaster and Microsoft SNDS Postmaster tools to monitor for reputation health
4.  Deliverability tools: Validity, Inbox and Reputation

### Want to Learn More From Our Experts?

One of the many benefits of using the Iterable platform is that Brian, Quincy and Seth would be your dedicated partners so you can tackle all your holiday deliverability challenges and arrive in the inbox as intended.

Read more about our Deliverability Services and contact us if you’re interested in working with the best deliverability team in town!