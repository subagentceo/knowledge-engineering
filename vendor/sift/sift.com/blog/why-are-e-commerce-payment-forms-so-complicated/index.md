# Why are e-commerce payment forms so complicated?

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

# Why are e-commerce payment forms so complicated?

Quick quiz: if your site accepts payments, what do you need to charge a user’s credit card?

Just **20 characters**: the credit…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Mar 7, 2013

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

Quick quiz: if your site accepts payments, what do you need to charge a user’s credit card?

![forms](https://dev-sift.pantheonsite.io/app/uploads/2013/03/forms.png)

Just **20 characters**: the credit card number and the expiration date. The three fields shown above comprise a complete payment form.

So why do most e-commerce payment forms on the web look like this?

![forms2](https://dev-sift.pantheonsite.io/app/uploads/2013/03/forms2.png)

The above form requires **14 fields. For my billing information, that’s 131 characters.** It asks for my first name, last name, address, country, city, state, postal code, phone, company, security code, and my card type. And it’s hardly alone: the average web site requires 12 fields and 70 characters just to make a payment.

How did payments on the web become so complicated? Fraud.

## Credit card fraud and the black market

Every site that accepts payments faces credit card fraud. On the black market, criminals can buy 100 stolen credit card numbers for $40 and use those to purchase expensive goods from unsuspecting web sites. Weeks later, when the cardholder notices the fraudulent charge on their monthly statement, they’ll call up their bank to reverse it, in what’s known as a “chargeback.” For online transactions, the merchant (not the bank) holds liability for all chargebacks due to fraud, and that liability is expensive. Sites across the internet lose more than $3.4B per year due to fraud in the U.S. alone.

To curb these losses, the major credit card companies introduced two anti-fraud measures in the late 90’s:

**AVS (address verification service)** matches an address entered by the user against a billing address on-file with the cardholder’s bank. Although effective at one point, today AVS is a weak signal. Fraudsters easily buy address information and good users frequently get tangled up in AVS checks. In our data, AVS catches about 28% of fraud, but also flags 8% of regular users. In the  payment form above, 50 of 131 keystrokes were related to the address.

**CVV (card verification value)**. Starting in 1997, MasterCard started printing 3-digit security code on the back of the card, and Visa followed suit soon after.  In theory, the CVV is less likely to fall into criminals’ hands since PCI-DSS rules prohibit storing the CVV. In practice, of course, the black market is flooded with card numbers that have matching CVV codes. Depending on the country and vendor, CVV also goes by the acronyms CSC, CVV2, CVVC, CVC, CCV, or SPC.

Although AVS and CVV are well-intentioned, they have a cost—more friction and lost conversions. Users abandon forms with too many fields. Good users frequently mistype their billing address. After a user moves to a new address, it can take up to six months for the bank to update their information, leading to false rejections. Users often don’t know where on the card to look for the CVV code. One study found merchants who left CVV out of their payment flow reported **40% higher conversion rates**.

## Fraud or friction? A false choice

Luckily, you don’t have to choose. You can stop fraud without friction. On the internet, everything is measurable, and fraudsters leave behind tracks they’re not even aware of. What IP address is the user coming from? Are they using a proxy? A Tor node? How is the user navigating through the site? How many accounts have originated from this particular physical device? Is the e-mail from a legitimate domain? The most sophisticated sites today gather hundreds signals and combine them into a risk score using a machine learning algorithm.

How to build a frictionless anti-fraud system would take a whole series of blog posts, but if you run a web site, you have options. Sift Science is building a system to fight fraud with machine learning. There are other vendors out there as well, and some sites start by implementing simple IP-based checks.

Two important caveats: check with your payment processor to see whether removing AVS and CVV will affect your transaction fees. In many cases, you can simply request less information (e.g., just the ZIP code) and get the same fee. Processors tend to be stricter about CVV, and sometimes charge about 0.1% extra to process payments without CVV. Second, rigorously measure the tradeoff between revenue and fraud rate when you change your payment form or verification strategy. We think most sites could grow their revenues significantly with less friction, even at the cost of slightly more fraud, but every site has a different tradeoff.

## Conclusion

Payments online can be quick, efficient, and frictionless — without opening the floodgates to fraud. So why not remove as much friction as possible from your checkout process? Your customers and your pocketbook will thank you for it.

And if you need help keeping a lid on fraud, join Sift Science’s private beta.

****What is Sift?****

Sift is AI-Powered Fraud Decisioning Company.

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