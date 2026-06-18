# Iterable Community Ask Me Anything: Deliverability Deep Dive - Iterable

## Iterable Community Ask Me Anything: Deliverability Deep Dive

**Published by**

August 6, 2019

![Seth Charles Iterable Community Deliverability AMA](https://iterable.com/wp-content/uploads/2026/04/073119_Deliverability-AMA-Seth-Charles_768x512.png)

Email deliverability is a hot topic. To help show how to maximize your email marketing programs, we held our first Iterable Community Ask Me Anything (AMA) with our very own deliverability expert, Seth Charles.  

Below we’ve transcribed just a few highlights from the chat. Be sure to join the Iterable Community to participate in future AMAs and get world-class advice from industry-leading marketers!

#### How are people monitoring their health with Gmail?

Monitoring Gmail health is definitely a hot topic in deliverability and marketing circles alike. Something that you’ll hear a lot of for answers like this is that it’s really a combination of things.

There are a number of proxies out there that can be used—like Google Postmaster Tools, various seed test products/companies and your own “seed” lists—and they can all be useful to get somewhat of an idea of overall health.

For the most part, the best tools to use to have an idea of Gmail health are 1) Gmail unique open rates over time and 2) Google Postmaster (GPT) tools domain and IP health dashboards.

Understanding your unique open rates is important because you can understand previous benchmarks where rates are or used to be and if there is a sudden and dramatic drop. If there is a huge drop in open rates, then there may be a problem worth addressing.

And the same goes for GPT. If you have enough volume for Google to display reputation data, that’s the best “firsthand” tool we have.

#### Are you working on this with a third party like Return Path or is this completely an Iterable initiative?

Here at Iterable we use lots of different partner tools. I monitor our entire platform using a variety of different blacklist monitoring, spam trap reporting and seed lists—to name a few—as well as things like Google Postmaster dashboards and Microsoft’s SNDS system.

As far as our new deliverability services specifically, we also utilize some tools by a partner company of ours you’ve probably heard of, 250ok.

#### How do you monitor your email health today — internal expert vs. external tools/consultants?

When monitoring the health of Iterable mail—like any good little sender should—I definitely keep an eye on Google Postmaster tools and Microsoft’s SNDS system. I also watch for significant blacklistings (because remember, not all blacklists are created equal) for signs of deliverability issues.

I also perform periodic seed tests to check for any noticeable shifts. And just so we make sure everyone is speaking the same language here, a “seed test” is sending a campaign to a list of recipient addresses that aren’t (necessarily) real individuals, but are configured to provide inboxing feedback for analytics purposes.

Outside of that I always just make sure that I’m looking in on domain and IP infrastructure to make sure it’s accurate and up to date for us and our customers!

#### How much weight do you put on Gmail’s domain reputation reports in Postmasters? Are other tools/resources better indicators of good/bad health?

Because those domain and IP reputation dashboards are the best thing we have from Gmail—since they don’t offer traditional feedback loops, etc.—there aren’t really better indicators.

That being said, I always advise that senders look at as many contextual data points as they can to get as holistic a view of reputation as possible. This means GPT data with things like seed tests, for example.

But again perhaps the most important proxy for good health to watch is your own unique open rates. If you know that you typically garner a 15% unique open rate at Gmail, and then that same type of campaign suddenly is getting a 4% UOR, then something may be up and worth checking out.

#### What’s your checklist for triaging a suspected deliverability issue?

I usually go through a progression of first checking the mechanical side with the infrastructure that was used. What was the sending domain, DKIM value, and return-path domain? Did they suddenly change? If not, I make sure that the DNS values within those elements are accurate and not missing or changed.

Next, I’d recommend looking at whether there was a change in open rates. If there was, is it across all domains or just a single provider? Because that can mean a variety of things too.

Lastly, and often the most complicated step, is reviewing your sending practices.

We know that lots of things can impact deliverability—both suddenly and also gradually over time.

How are you segmenting your campaigns? Are you sending to addresses that haven’t opened your email for a prolonged period? Where are you obtaining these addresses in the first place?

Things like that.

The behavioral, subjective side of analyzing deliverability will always be the most challenging, and the most fun!

To me, anyway. No? No one else?

_Looking for more information about deliverability? Join the Iterable Community where Iterable customers gain exclusive access to thought leaders, request new features and learn the latest trends and tactics in growth marketing._

_New to Iterable? Sign up for a demo today!_