# Introducing Sift Science Workflows

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
*   Product News

# Introducing Sift Science Workflows

We’re proud to announce Sift Science Workflows, a set of capabilities that enables you to build custom fraud processes with less code and cost than…

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Trust and Safety Team

Jul 19, 2016

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

We’re proud to announce Sift Science Workflows, a set of capabilities that enables you to build custom fraud processes with less code and cost than ever before. Integrations are now faster and you can more easily manage your business as you scale.

There are three components to Sift Science Workflows:

**Workflows** – Build and manage your fraud logic all within the Sift Science platform. Auto-block, auto-accept, or send to a Sift Science Review Queue based on a set of customizable criteria (e.g., risk score > 80, first-time user, country=Japan, etc).

**Review Queues** – The most efficient way for your analysts to manually review users and orders. Best part: they’re built right into the platform. You no longer have to build your own or buy them from a vendor.

**Decision Webhooks** – Connect actions taken within the Sift Science platform to your backend. No more switching between two interfaces. Whenever an analyst makes a decision or a Workflow applies an automated decision, we’ll send you a webhook with the result.

### Workflows

Workflows empower you to build and manage your fraud business logic within the Sift Science platform. You can route users and orders to different outcomes based on their unique attributes.

Let’s say you have a user with a very high Sift Score. You likely want to auto-block them and not waste time in review. However, if you have a first-time user with a low score but their order value is high, maybe you may want to send to a Sift Science Review Queue just to be sure. And if it’s a return user with a very low score, you can auto-accept the order right away. Workflows lets fraud managers create and update all this logic themselves without developers having to build and maintain separate routing logic.

To get you going with Workflows, we’ve built an easy-to-use interface that lets you create and update the routes you need. Once you’ve set them up, you’ll work with your developers to connect them to your system. Whether it’s an automatic decision or one coming from your manual review team, we’ll send a request to your system so that you can apply the appropriate business logic on your side based on whatever decision was taken.

![routes](/app/uploads/2016/07/routes-1.png)

### Review Queues

Whenever you’re unsure about a user or an order, it’s always good to get a set of eyes on it. We built Sift Science Review Queues so that your team has an efficient and scalable way to manage your review process. They’re built right into the platform, so there’s nothing extra to build or buy.

Sift Science Review Queues are completely customizable. Let’s say you have different queues based on geography or language. All you need to do is create one queue per language and then set up your Workflow to route to each one based on the country of the user. Even better, you can configure the actions analysts are able to take (e.g., Cancel Order, Cancel & Block Account, etc) on a per-queue basis. This gives you the flexibility to set up whatever process is best for your business.

The analyst review interface is optimized for efficiency. All the information they need is in front of them in the Sift Science interface they already know and love. Top fraud signals, connected users, recent activity, order information, etc. It’s all there. Whenever they take an action, the queue immediately advances and the next item is ready to be reviewed.

![queue](/app/uploads/2016/07/queue-analyst-view.png)

Queue analyst view

![queue](/app/uploads/2016/07/queue-table.png)

Queue overview

### Decision Webhooks

Decision Webhooks enable you to connect actions taken within the Sift Science Console and Workflows back to your systems. Whenever an analyst applies a decision manually or a Workflow evaluates and applies an automatic decision, Sift Science sends a request to your system to tell it what happened. This way, the two systems can stay in sync and your analysts don’t have to switch between two interfaces.

Decisions are easy to set up in our Console. All you need to do is tell us what action it is, what action category the decision is (block, watch, accept), and where you want us to send the webhook request. When the webhook request is sent to you, we will tell you which decision it was so you can do whatever business logic you need to do on your side. Each decision will likely map to different business logic on your side (e.g., Accept Order vs. Accept Order but Flag account).

![decisio](/app/uploads/2016/07/decision-modal.png)

We’ve very excited to launch this new functionality and can’t wait to see how you use it. We’ve created tutorials for both Workflows and Decisions that will help you get started using them. We’ve also got a webinar for you to check out. Questions? Comments? Don’t hesitate to email [email protected], and we’ll be happy to help. 

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