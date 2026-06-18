# How ShopRunner Uses Real-Time Data to Power Emails - Iterable

## How ShopRunner Uses Real-Time Data to Power Emails

**Published by**

June 26, 2018

![ShopRunner e-commerce stock photo](https://iterable.com/wp-content/uploads/2026/04/062518_ShopRunner.png)

It’s the day of the send. And it’s routine for the email marketer: you’ve switched out the hero image nine times within the last half hour, realized the layout looked crazy in Outlook and scrambled to fix it, and now it’s an hour past the time you had planned to deploy and you’re ready to send it out. You hover over the button, feel a touch queasy, and hit send.

Blast campaigns like the one described above are typically sent once, to a large audience. The send time could have been determined by the start date of a sale, or maybe there was just an open spot in the calendar.

But here’s what really matters about blast campaigns, and why I want to talk about them: they serve the exact same experience for every customer that opens it.

### Going Beyond Batch and Blast

The one-size-fits-all approach to email isn’t good enough for today’s consumers. They expect to be served messaging that’s tailored to their behavior, demographic data, and stated preferences. It should hit their inbox at a time that’s suited to their needs.

By definition, triggered campaigns are caused by a detected customer action, and that action results in a message being sent.

Think about blast campaigns as a speaker on a soapbox. The speaker has prepared a speech that they share with the audience, and each audience member hears the same speech.

Although the speech is being delivered to a stadium full of unique individuals, the speaker’s message is intentionally broad and inclusive because it’s designed to appeal to the masses.

![ShopRunner blast email](https://iterable.com/wp-content/uploads/2018/06/ShopRunner-blast-263x1024.png)

_ShopRunner brings joy to Mondays with this promotional blast._

In contrast, triggered campaigns are similar to a conversation between friends: one friend expresses an interest in blue cashmere sweaters, and the other friend responds by suggesting that they look at a blue cashmere sweater that they noticed at one of their favorite stores. There is a dialogue between the two friends that’s far richer and more valuable than the one between the speaker and the stadium.

### What Is ShopRunner?

At its core, ShopRunner is a service that gives members free 2-day shipping and free returns across 100+ stores. Think of it as Amazon Prime for the other half of the internet.

We partner with well-known stores to provide members with the shopping experience that they love and expect from those retailers, but with the perks of quick shipping built into that experience.

Since we’re partnered with so many retailers, ShopRunner ingests a ton of data: shipping feeds, browsing history, product catalogs and more. We’re lucky enough to not only understand the customers of individual stores but the customers of 100+ stores in aggregate.

### The Evolution of Our Marketing Strategy

This level of data is a dream come true for developing personalized email marketing. When I joined ShopRunner, it was clear that the information was there and just waiting to be acted on with the right tool. At that point, much of our email program was actually written in Python and not accessible to marketers like me.

We knew that as ShopRunner grew, we needed a tool that satisfied both ShopRunner’s stronghold of data and engineering folk, as well as a lean marketing team that wanted to own email. One very thorough proof of concept later, we chose Iterable in the fall of 2017.

Getting the right growth marketing tool in place was actually the easy part. Moving our email program toward real-time personalization and lifecycle marketing—that’s proven to be a bit more difficult. It turns out that building triggered campaigns takes a lot more time, effort, and teamwork than a blast campaign.

Since joining Iterable, we’ve launched a couple of email products that we’re really proud of, including a new onboarding series, out-of-stock notifications, trending products, and view abandon recommendations, which I’ll walk through.

### View Abandon

View Abandon is a triggered campaign that sends emails to ShopRunner members that view a product on a retailer website but don’t make a purchase. Its trigger is similar to cart abandonment campaigns, which are hugely popular—we went with page views simply because that data point was already available to us. Scrappy!

But that’s where the similarity to cart abandonment ends. Instead of prodding the member to purchase the item that they viewed and ostensibly didn’t purchase, we show them a handful of other items that we think they’ll like, based on the original item that they viewed.

The idea for the View Abandon triggered campaign was fuelled by our data science team, who developed the recommendation algorithm. They were at work developing this API for another team when the email team was brought in to the conversation.

![ShopRunner API](https://iterable.com/wp-content/uploads/2018/06/ShopRunner-API.png)

_ShopRunner’s product recommendation API, as seen in Iterable._

A back-end engineer was able to plug into the product recommendation API and translate it into events to send to Iterable. We chose events as our medium because of the flexibility that it provides the marketing team—being able to see the raw events in Iterable’s user interface was incredibly helpful when it came time to build and test the campaign.

In general, ShopRunner has found that any back-end implementation into Iterable should be created with the goal of putting the power in the hands of the email team. This means pumping in more data, with more detail than you think you’ll actually use.

Then, we use Iterable’s easy user interface to create business rules and iron out the details of the campaign. The result is a scalable email program that can be tested, iterated on, and improved upon within a few keystrokes within Iterable.

![ShopRunner triggered email](https://iterable.com/wp-content/uploads/2018/06/ShopRunner-Triggered-644x1024.png)

_Our view abandon campaign in action._

Setting up the template itself was pretty simple. We used product data from the event to populate the template, which is why being able to see the event and send test triggers was key. We used handlebar logic to add the product image, URL, name, and price.

![ShopRunner Workflow in Iterable](https://iterable.com/wp-content/uploads/2018/06/ShopRunner-Workflow.png)

_ShopRunner’s view abandon workflow, created with Iterable Workflow Studio._

Once the events are being passed into Iterable, we can set up a workflow. The workflow above is triggered by the event, and then flows through a series of filters. The filters are primarily suppression lists for list hygiene, like recent hard bounces or people that haven’t opened the last 35 emails we’ve sent them.

We also want to guard against a person receiving this email too frequently, so we used the segmentation feature to add anyone that’s sent this email within a week to a dynamic list. The workflow checks that list, and won’t send an email to someone that’s already received it recently.

We use the same segmentation technique to create a dynamic list of people that have purchased from that retailer within the past couple of days. That person will have already converted from their page view session, so we don’t need to send them an email.

You might notice that there are five-minute delays between each node. That’s a trick that I picked up from Iterable’s support team (who often comes to the rescue). These short delays just ensure that each filter node is completed before moving on to the next.

The volume for this campaign is on the smaller side—in comparison, our blast campaigns are close to 3 million—due to dependency on retailer site traffic and frequency suppression.

Nonetheless, we’ve observed some extremely promising rates on these emails in comparison to our average blast campaigns:

*   11% better open rate
*   63% better click rate
*   88% better click-to-order rate

In addition to the quantitative results, the email template includes a quick survey to gauge the usefulness of the recommendations for the member. These open-text answers pipe into our marketing Slack channel so that the whole team can ingest the feedback, and if needed, act on it.

In order to get this email to make a consequential impact on the ShopRunner business, we need to expand the send volume—that’s our priority, along with making cross-retailer recommendations for even more meaningful communications with members. We’re also running some subject line tests to improve open rate, which is easy to do within the workflow using the Iterable Experiments tool.

The ShopRunner team is pretty jazzed about the early results of the View Abandon campaign, but we realize that it’s a baby step. We’re looking forward to more cross-team collaboration to transform our email program into one that follows and guides members through their shopping lifecycle.

To experience ShopRunner for yourself, sign up for a three-month free trial. And if you’re a prospective partner, we want to hear from you!