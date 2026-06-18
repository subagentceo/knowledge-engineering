# The Dos and Don'ts of Deliverability During the Holidays - Iterable

## The Dos and Don’ts of Deliverability During the Holidays

**Published by**

November 20, 2019

![Email Deliverability During the Holidays](https://iterable.com/wp-content/uploads/2026/04/112019_Dos-and-Donts-of-Deliverability_768x512.png)

Well, here we are again. Consumers, marketers, and platforms like Iterable are again staring down yet another holiday season, each more insane (and potentially profitable) than the last. 

Along with every other trend it seems, the volume of commercial and transactional email also stands to be at an all-time high while marketers clamor over one another to deliver compelling, personalized, valuable experiences to their customers.

With all of the chaos this marketing season can provide, here at Iterable we wanted to offer a few email deliverability notes that marketers should be keeping in mind leading up to and through the holidays. 

Because if email messages are not even reaching customers’ inboxes, then what is the point of investing all of the effort, time and money in the first place? 

But before we get to that, let’s examine the email landscape starting from the perspective of the major email platforms of Gmail, Microsoft, and Verizon Media. 

### Put Yourself in the ISP’s Shoes

As insane as this preparation and execution are for senders (and consumers!), email anti-abuse filters and postmaster teams there are busier than you. Full stop. 

Every single minute, these platforms are blocking _hundreds of millions_ of spam messages. Add to that the hundreds of millions of messages that are actually malicious phishing attacks also sent every day. 

There is essentially an unrelenting onslaught of unwanted or dangerous mail that is being hurled across in attempts to reach recipients’ inboxes.

So where does that leave the senders, those that recipients have explicitly requested marketing content from? 

### The Dos & Don’ts of Deliverability During the Holidays

We’ll start with the “dos.”

#### Do maintain consistency

This can’t be stated enough. Sending behavior should be unremarkable, predictable and expected. When a sender begins to behave erratically, that is sure to attract the scrutiny of the mailbox filters. 

So if you’re sending with a certain cadence, then you’ll want to stick with that pattern, within reason (mailbox providers also understand that this is a busy season and do try to accommodate to a certain extent).

This also applies to your messages’ infrastructure. Your SPF and DKIM authentication values, along with your sending IPs, should not be changed leading up to this time. Attempts to do so is behavior consistent with spammers that are trying to fool the machine learning models. 

You’ve (hopefully) worked hard to develop your sender reputation, so stay the course.

#### Do continue to use segmentation logic

This isn’t an occasion to forget any kind of logical recipient targeting based on email engagement. When considering their campaign audience, senders should be thinking about what content that users have recently demonstrated interest in.

This is a big driver in filtering decisions, because it shows that a marketer is paying attention to their recipients’ lifecycles and reacting appropriately. You’re sending to people who have interacted with your content in a reasonable amount of time, and not sending to those who haven’t. 

“Reasonable” is obviously a subjective term, but considering the way that recipient addresses tend to engage with your email messages, is there a good reason to send to someone that hasn’t opened an email from you in nine months? A year?

Understanding these implicit signals of eventual recipient address lapse is important because not only can you begin to strategize about prolonging that process with various re-engagement strategies, but also start to understand when you should reducing message frequency and eventual suppression.

Think if some acquaintance from high school randomly showed up at your front door wanting to come in! It would be weird, _wouldn’t it, Jeff?_

#### Do work to understand the tests that you have hopefully already run

Typically, holiday sending season is not the time to run baseless tests. If you have a toolset of different content or variables as a sender, then you should already have data that outlines their effects. 

So in the event that you want to utilize them during the holidays, you will already have an idea of the outcomes.

#### Do at least consider beginning a deployment with a somewhat engaged cohort

We know what tends to happen during the holidays, so keep this recommendation in mind if you decide you’re going to send to a “more aggressive” version of database segmentation.

Not to say that this will, in any way, fool filtering models that review traffic holistically, but in this scenario, at least the first part of a campaign deployment can be bolstered by healthy, positive interaction signals.

#### Do have a contingency plan in the event that a predetermined deliverability challenge arises

That way you have a plan in place if your IPs or domains are listed on a significant blacklist, or filtering at a provider determines that your practices are too aggressive and starts to route your traffic to spam.

Do you know what your plan is? 

#### Do communicate that plan to leadership!

We definitely stress this. So in the event that leadership is perhaps a driver behind more aggressive practices (ahem…), they also know the potential negative consequences—and also what the program will do in order to remediate them. 

That way, it is not a surprise if there needs to be a change in plans, as well as the expected results.

#### Lastly, do keep an eye on your core metrics leading up to and through the holiday season

This is obviously somewhat of a deliverability no-brainer, in that pretty much every sender does this anyway. 

But it’s worth reiterating that you’ll want to send personalized, relevant content (thusly driving open and click rates), to recipients that have engaged with your brand in a reasonable amount of time (low bounce, unsubscribe and complaint rates).

That said, it is a very good idea to make sure you are registered with and keeping an eye on your IP and domain reputation as viewed by Google with the Google Postmaster Tools dashboard, as well as the IP reputation data provided by Microsoft via their Smart Network Data Services (SNDS). 

This way you’ll not only know what your reputation is leading into the holidays, but you can also keep an eye on it as you progress through your sending schedule and can react accordingly.

Now, let’s discuss the deliverability don’ts.

Avoiding behavior that can put you into reputation purgatory is crucial, so these are some of the practices that can wreck reputation faster than you can say “Black Friday.”

#### Do not try to suddenly deploy to twice the volume that you normally do

Theoretically, this is simple, but it is incredible how often we in the email deliverability space see senders double their volume in efforts to “double profit.” 

There are obviously a few caveats behind this, in that I would be less worried about someone doubling their volume from 1,000 to 2,000, but if that number changes from 2.5 million to 5 million, that is something that is very noticeable to filter models and certain to draw some scrutiny. 

This behavior can be indicative of several bad things, including:

*   Shady acquisition tactics, like list purchasing 
*   Sending to old lists that have not displayed any interest in their email in quite a long time 
*   Or worse yet, signs of an account compromise 

So just don’t do it.

#### Do not change sending infrastructure elements in efforts to “reset” reputation

When we say “resources,” we mean the key elements of your mail’s infrastructure: Sending IP(s), FROM address domain, and DKIM and SPF authentication values. 

Not only is this resetting strategy unlikely to work, but it is also something that Postmaster teams look at specifically as very spammy behavior. So don’t try to reset your mailing domain or IPs thinking it can disguise or reset whatever reputation you have developed.

Because of this, the consequences are more likely to be harsher and last for longer periods of time.

#### Lastly, do not send to every email address you have in your database

It sounds so simple, yet it inevitably happens every holiday season. Senders decide that, for some reason, this may be a good opportunity to send to recipient addresses that—based on reasonable segmentation logic—were suppressed _until_ the holidays. 

For the reasons we outline above, this is basically inviting spam trap hits from old addresses, high bounce rates, and worse yet a spike in spam complaints. 

In other words, if you haven’t gotten some indication that these addresses may have some interest in your content already prior to the holidays, mail at your own risk!

Outside the inevitable higher bounce rates and frequency of spam trap hits, this ultimate “don’t” also demonstrates that, as a sender, you are not interested in pivoting relative signals that recipients are sending. 

Lapsing from an email program can be an unfortunate outcome of a customer’s lifecycle, but instead of making a last-ditch attempt to engage with a mass blast, focus on prolonging that lifecycle by improving your acquisition and retention.

### Wrapping Up These Holiday Dos and Don’ts (With a Bow)

The holidays can be a particularly stressful time of year for email marketers, but you don’t have to navigate all these dos and don’ts alone. 

Iterable offers Deliverability Services with an in-house team of experts that can provide ongoing guidance and support to improve your email program ROI over time.

Learn more about what’s included in our Deliverability Services and contact us for a custom demo of the Iterable growth marketing platform in action.

From all of us at Iterable, we’re wishing you the best on Black Friday and beyond!