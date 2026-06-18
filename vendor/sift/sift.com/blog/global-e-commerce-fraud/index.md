# The USA has more e-commerce fraud than Nigeria

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

*   Digital Trust
*   Fraud

# The USA has more e-commerce fraud than Nigeria

Sift Science customers hail from all six habitable continents (_On that note, let us know if you know any Antarctica startups…_]. We’re seeing e-commerce…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Aug 14, 2013

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

![world map](https://dev-sift.pantheonsite.io/app/uploads/2013/08/world-map.png)

Sift Science customers hail from all six habitable continents (_On that note, let us know if you know any Antarctica startups…)_. We’re seeing e-commerce fraud activity from practically everywhere as well, Albania to Vietnam. Since the Sift Science team includes quite a few data geeks who love #uberdata and OkCupid’s OkTrends blog, we thought we’d share a visualization of our global fraudulent transactions. What sort of fraud are we seeing? That deserves its own post (coming soon), but there are three major types: **payment fraud** (e.g. using stolen credit cards to buy goods), **new account fraud** (i.e. creating an account to do illicit stuff like money laundering) and **account takeover** (i.e. using someone’s existing account to do illicit stuff).

Above is a map of fraud rates¹ by country. Based on a sample of our transaction data, here are the top ten most fraudulent countries. You can see the top 25 countries at the end of the post.

1.  Latvia
2.  Egypt
3.  United States
4.  Mexico
5.  Ukraine
6.  Hungary
7.  Malaysia
8.  Colombia
9.  Romania
10.  Philippines

Biggest surprise? Nigeria. For all of the flak Nigeria gets with their e-mail scams (not all of which originate in Nigeria), we’re not seeing a lot of fraud from Nigerian IPs. In fact, Nigeria (#17) has only slightly more fraud than Canada (#18).

Several caveats are worth noting. Since this is based on a sample of our collected transaction data, it is not necessarily representative of the overall e-commerce fraud rates globally. For simplicity’s sake (developer time is a precious commodity at Sift!), we used the reported IP address as the country of origin. Lastly, just because a country shows up as higher fraud on this list doesn’t mean a merchant should create a fraud rule for it. We instead suggest adopting a more robust and versatile solution able to adapt to new patterns.

For our more technical readers– we used just over half a million transactions and included only those countries with at least 1000 total samples and at least 10 fraud samples. That puts the size of the 95% confidence interval on the fraud rate at just under 1%. To draw the map itself, we used d3 with topojson. Then, we overlaid the countries onto a Mercator projection, and computed the color as _[percent of transactions labeled as fraud]_ ***** _[max red saturation]_.

In the future, we’ll be sharing other insights from the terabytes of data we analyze to detect fraud. What would you like to see? Get in touch via Twitter or email with your suggestions.

Here are the top 25 fraudulent countries, from most fraudulent to least fraudulent.

1.  Latvia
2.  Egypt
3.  United States
4.  Mexico
5.  Ukraine
6.  Hungary
7.  Malaysia
8.  Colombia
9.  Romania
10.  Philippines
11.  Greece
12.  Brazil
13.  China
14.  Indonesia
15.  Russia
16.  Singapore
17.  Nigeria
18.  Canada
19.  Portugal
20.  Switzerland
21.  United Kingdom
22.  India
23.  Netherlands
24.  France
25.  Austria

But by the time you read this blog post, the numbers will have changed. The fraud landscape is always shifting, and that’s why machine learning is so essential to staying ahead of cyber criminals.

¹Defined as reported fraudulent transactions / total transactions originating in that country

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