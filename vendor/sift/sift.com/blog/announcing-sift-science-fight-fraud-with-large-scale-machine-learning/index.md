# Announcing Sift Science: fight fraud with large-scale machine learning

Home/Blog

Table of Contents

Explore AI Summary

![chat-gpt-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![chat-gpt-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

Share post on:

*   
*   
*   
*   

*   Product News

# Announcing Sift Science: fight fraud with large-scale machine learning

Imagine your website’s traffic is skyrocketing. Sales are up each month. Then one day, your payment processor calls you up and tells you…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Mar 19, 2013

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

> “Invariably, simple models and a lot of data trump more elaborate models based on less data.” **– Fernando Pereira, Peter Norvig, and Alon Halevy, The Unreasonable Effectiveness of Data**

Imagine your website’s traffic is skyrocketing. Sales are up each month. Then one day, your payment processor calls you up and tells you you’ve been hit—with $50,000 in credit card chargebacks.

What happened? Fraud. A criminal ring bought $50,000 of goods with stolen credit card numbers from the black market. Weeks after you shipped the goods, the original cardholders noticed a suspicious charge on their monthly statement, called up their bank, and reversed it, generating a chargeback. You, the site owner, are left footing the bill.

When clobbered by fraud, most sites default to fixed rules, such as reviewing every account with more than ten transactions. Commercial systems today deploy 175-225 standard rules, sometimes supplemented by crude statistical models with a few hundred parameters.

But fraudsters don’t play by a fixed set of rules. So why should you?

## Large-scale machine learning to the rescue

Sift Science uses large-scale machine learning to automatically discover new fraud patterns. Our algorithm has pored over hundreds of millions of user actions, from both good users and confirmed fraudsters, and distilled them down into one million statistical patterns that predict fraud.

What makes large-scale learning unique is the detail of patterns learned. Like peering through a microscope, when you up the resolution, you can spot surprising details the naked eye would never notice. For example, a user who signs up and waits an hour before making a purchase is 7x more likely to generate a chargeback than a user who purchases immediately after signup. Our system has pinpointed particular page navigation sequences, IP ranges, email address patterns, graph connectivity structures, browser configurations, and even types of text entered that predict fraudulent activity. And it’s learning more patterns each day.

Sites like Airbnb, Uber, Listia, and others already rely on Sift Science. When you use us, you’re joining a network of sites fighting fraud together. As the network grows, our algorithm will crunch more data, learn more patterns, and fight fraud more accurately for everybody.

## How it works

You can get started with Sift Science in minutes using our integration guide. The Javascript snippet captures in-browser data like page views or properties of the user’s machine. Transactions tell Sift Science about payments. If a user’s IP address is from Nigeria but their billing zip is from San Mateo, CA, that’s a suspicious sign. Known fraudsters train our learning algorithm to spot patterns unique to your site.

We’ve designed our API to be simple and quick to integrate. For example, here’s how you would send us a transaction in Ruby:

HTTParty.post(“https://api.siftscience.com/v202/events”, body: { “$user_id” => “al_capone”, “$type” => “$transaction”, “$amount” => 153250000,  # $153.25 in micro USD “$currency_code” => “USD”,                 “$billing_zip” => “94111”, “$user_email” => “[email protected]”, “$api_key” => “XXXXXX”,                      “trip_time” => 231, }.to_json).body

That’s it! As data flows in, Sift Science will start crunching it. Every site has its own unique twists, so we’ve built a trainer that lets you explicitly mark users as fraudulent or not fraudulent. Just like marking an e-mail as spam, as you mark more users, our algorithm will learn to detect exactly the type of fraud patterns you’re dealing with.

![trainer](https://dev-sift.pantheonsite.io/app/uploads/2013/03/trainer1.png)

trainer

## Ready, set, go

Building a large-scale machine learning system takes time and patience. Sift Science started as part of Y Combinator’s summer 2011 batch, but a machine learning system can’t be launched in the span of one summer. Each site is a little different, and to make a product that works across verticals, we put in long hours, held late-night debugging sessions, and ran hundreds of accuracy experiments. Along the way, we’ve been lucky enough to have the support of a dream team of investors with expertise in payments, artificial intelligence, fraud, and security:

*   Max Levchin (PayPal, Slide) led our seed round, with participation from Chris Dixon, Founder Collective, Marc Benioff (Salesforce), SV Angel, Start Fund, Alex Rampell (TrialPay, SiteAdvisor), Kevin Scott (LinkedIn), Lee Linden (Karma Science), Garry Tan (Posterous, Y Combinator), Harj Taggar (Y Combinator), and Alexis Ohanian (Reddit, Y Combinator).
*   We recently raised a Series A from Union Square Ventures and First Round Capital, and Albert Wenger of USV has joined our board. Rich Barton (Zillow, Expedia), Chris Dixon (Hunch, SiteAdvisor), and previous investors participated.

We’re thrilled, at long last, to launch our public beta and show you what we’ve built. So kick the tires and give it a spin. Try Sift Science, and start fighting fraud with large-scale machine learning today!

_Update: check out the coverage in Wired, AllThingsD, GigaOm, TechCrunch, TheNextWeb, VentureBeat, WSJ, and Silicon Valley Business Journal._

Share post on:

*   
*   
*   
*   

## You may also like

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Digital Trust

### How to Reduce Friction Without Compromising Fraud Security

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Sift Trust and Safety Team

Jun 8, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

8 min read

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Digital Trust

### The Operational Blueprint for Modern Fraud Teams: How to Design a Fraud Organization That Actually Scales

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Kevin Lee

May 29, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

11 min read

![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

*   Data & Insights

### How to Benchmark Fraud Performance and Find Hidden Gaps

![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)

Sift Trust and Safety Team

May 26, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

7 min read

## Dare to grow differently.

Flip the switch on fraud-fueled fear. Make risk work for your business and scale securely into new markets with Sift’s AI-powered platform.

see sift in action

*   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
*   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
*   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
*   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    

*   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
*   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
*   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
*   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)