# The First Rule in Fighting Fraud: Rules Can Fail

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

# The First Rule in Fighting Fraud: Rules Can Fail

If you’ve ever seen the movie _Fight Club_, then you know that the first rule of Fight Club is, “You do not talk about…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Jan 23, 2015

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

If you’ve ever seen the movie _Fight Club_, then you know that the first rule of Fight Club is, “You do not talk about Fight Club.”  The second rule of Fight Club is, “You do not talk about Fight Club.” Apparently, they didn’t trust that people would follow the first rule, so they made the second rule the same as the first.  While I’m not sure that doubling the rule would actually doubly enforce the rule, it did effectively send the message that Fight Club members were forbidden to talk about Fight Club.

![](/app/uploads/2015/01/fight-club.jpg)

When it comes to the Fraud Fighting Club, the first rule is, “Rules fail.” Channeling my inner Brad Pitt, I will also say that the second rule of Fraud Fighting Club is, “Rules fail.”

So why don’t rules work when fighting fraud? First, let’s define what we mean by _rules_. The first generation of online fraud management systems were essentially rule-based engines or systems that allowed fraud managers to manually compile a list of static _if-then_ statements that defined whether to consider an order “good” (and process normally) or whether to consider an order “bad”.  If the order was “bad”, then the fraud management system could either block the order or send it over to the fraud team for further review.

On the surface, rule-based systems seem pretty effective at detecting and preventing fraud. However, let’s take a look at an example to understand the inherent flaws of using rules to fight fraud:

Let’s say someone tries to buy shoes online from vendor _We Sell Shoes Online_ and the customer order information reveals that the customer’s last name is “Fraudster” and he is trying to purchase a pair of kicks for $199.

Unfortunately, _We Sell Shoes Online_ experienced fraud in the past from someone with the last name “Fraudster”. In response, they created a rule that automatically blocks all orders from customers with the last name Fraudster. Boom – problem solved, right?

Not so fast.  As it turns out, the last name “Fraudster” is actually quite common and this particular shopper was actually a good customer!  And because his order was blocked, Mr. Fraudster took his business to competitor _We Sell Shoes Online Cheaper._

When Mr. Fraudster checked out with his $179 order from _We Sell Shoes Online Cheaper_ – his purchase went through in no time and he saved a $20. Looks like _We Sell Shoes Online Cheaper_ just got themselves a repeat customer!

Did _We Sell Shoes Online Cheaper_ take on more risk? Not at all. They use a new technology to fight fraud called Machine Learning. With this powerful technology, they are able to proactively analyze thousands of attributes about each and every order in real-time. They too have experienced fraud from people with the last name “Fraudster”. But based on other attributes about the above example’s specific order (e.g. shipping and billing addresses, number of users per device, structure of the email address, etc.), their Machine Learning technology identified that this was in fact a good order.

Now imagine that another customer tries to buy the same shoes from _We Sell Shoes Online_ and his last name is “Fraudster123”.  Since _We Sell Shoes Online_ never previously encountered a customer with that last name, they process the order quickly and a month later get a chargeback because this guy used a stolen credit card. Dang it – rules failed again!

Mr. Fraudster123, feeling confident from successfully stealing from _We Sell Shoes Online_, decides to try his luck again – this time buying shoes from _We Sell Shoes Online Cheaper._ Lo and behold, nobody with the last name of Fraudster123 previously purchased from _We Sell Shoes Online Cheaper_ either. However, our merchant blocks Mr. Fraudster123’s order immediately.  Why? Because their Machine Learning technology analyzed other attributes about this order – not just the customer’s last name. And as it turns out, there were many red flags, clearly marking this order as fraudulent.  For example, _We Sell Shoes Online Cheaper_ customers with a last name ending in _123_ are 90% more likely to be fraudsters. This data, plus thousands of other signals, gave _We Sell Shoes Online Cheaper_ the information they needed to block this order with confidence.

Let’s tally up the results:

_We Sell Shoes Online_ just lost $998:

– $199 (by canceling a good customer’s order)  
– $199 (by selling shoes to a fraudster)  
– $100 (chargeback fee due to fraudulent activity)  
– $500 (future lost revenue from losing a good customer)

_We Sell Shoes Online Cheaper_ just earned $679 and saved $279 for a total gain of $958:

+ $179 (for selling shoes to a good customer)  
+ $500 (future revenue from gaining a good customer)

Saved: $179 (for not selling shoes to a fraudster)  
Saved: $100 (for not getting a chargeback fee)

It’s pretty clear that _We Sell Shoes Online Online Cheaper_ did a better job of fighting fraud and providing good service to good customers.  And they made more money while doing it. Triple Bonus! Now, you must be thinking to yourself, “I want to be like _We Sell Shoes Online Cheaper,_ but Machine Learning sounds awfully complicated and I’m sure it’s ridiculously expensive.”

That’s where we come in. Sift Science has created the world’s best fraud prevention system based on our advanced machine learning technology. Learn more about Sift Science and Machine Learning at siftscience.com!

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