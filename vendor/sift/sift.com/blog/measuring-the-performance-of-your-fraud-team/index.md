# Measuring the Performance of Your Fraud Team

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

*   Fraud

# Measuring the Performance of Your Fraud Team

If you are responsible for managing an ops team, chances are you’ve been asked to justify hiring additional headcount and measuring the performance of…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Kevin Lee

Jan 16, 2019

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

If you are responsible for managing an ops team, chances are you’ve been asked to justify hiring additional headcount and measuring the performance of your existing team. Below, I’d like to share some basic metrics I used to measure the effectiveness of my Risk Ops team while at Square and Google.   

Techniques for measuring the effectiveness of your team can vary significantly based on the data you have available. However, the good news is that unlike most other ops teams, your Risk Ops team has some ground truth when it comes to overall company impact (eg chargebacks and false positive data). This was particularly helpful for me when making asks for additional headcount budget, justifying existing budget, running day-to-day ops, and doing individual performance reviews.  

At a high level, I was able to get a ROI metric per agent and for overall team performance. This allowed me to stack rank my folks, see what was possible for production and accuracy, and set reasonable team goals.   

Fair warning: I used to cut up the data in a lot of different ways, so if something doesn’t make sense, feel free to email me ([email protected]) directly with any questions. I also had access to some fantastic data analysts, which allowed me to make some absurd requests in order to tune the best metrics.

With that said, here it goes…

All of these metrics should be broken out by count, dollar amount, team level, agent level and over time. Too often, I talk with companies that only measure their chargeback rate one way (number of CBs received last month over orders received last month). Assuming your CB rate is under 1% (the way Visa measures it), I would strongly recommend moving away from this lagging indicator and moving towards a more forecasted CB rate model.

Yes, chargebacks take time to cure, but you should be able to forecast expected chargeback rate even a week after the original transaction date.

The basic metric I used was:

(dollars stopped by agent – dollars lost in CBs by agent – dollars lost in refunds by agent) ÷ cost of fully onboarded agent

I would look for at least a 3:1 ratio. For example, if a fully onboarded agent costs $100k per year, then I would expect $300K+ in the numerator.

I had a false positive (aka insult rate) metric as well:

I tracked reopen and/or reorder rate of users to establish a floor insult rate for the team and for each agent. If you auto-decline transactions and/or accounts, you should also keep a tab on each of your models. They are just an extension of your ops team and should be treated with similar KPIs.

# reopens X avg lifetime value per user = total lifetime dollars insulted

If you want to know what your true insult rate is, there are some additional methodologies I can suggest offline. Just email me.   

There’s also the use case where an agent will take down an entire ring of accounts. Some of these accounts may already have some transactions and disputes on them, so it’s easy to measure the cost. But some may still be ‘sleeping’ and have yet to make a transaction. How do you measure the impact or ‘savings’ of a bad account that has never made a transaction?  

It’s difficult to capture the exact amount an agent saves on bad accounts that have yet to place an order. However, you can create a ballpark figure. For example:  

Avg lost per fraud account or transaction  ×  # of closed accounts with 0 transactions

*   X-axis: total dollar lost per agent  
*   Y-axis: total number of customer insults (aka false positives)
*   A – G: each individual agent

The size of the circle represents the total number of reviews that each person has done so it’s easy to see highest and lowest production performers

Blue shaded area represents our goal zone, Ithe team target;  ideally, everyone is in this quadrant.

Commentary:  

*   Agents C, F, and D and are the top performers for this period
*   Agent B is the lowest performer for this period
*   Agent D reviewed the most number of transactions for this period
*   Our overall team avg performance is within target for $ lost but we are insulting too many customers

So there you have it: a relatively cut and dry way of measuring how your team is performing. I hope that you’re able to apply some of this to your own team.

Bonus question to consider:

Once you have these numbers, how transparent are you with them? Are they public within the entire team or only shared amongst management? I generally opted to be transparent with numbers so everyone knew what everyone was contributing to the team. There are also ways you can mask identities (eg assign ID numbers to agents). At first, that much open data made a few people uneasy; however, I found that level of transparency was a forcing function for the team (and individuals) to self-regulate, help each other, and improve without needing management to step in. It also made it easier to justify promotions and bonuses.

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