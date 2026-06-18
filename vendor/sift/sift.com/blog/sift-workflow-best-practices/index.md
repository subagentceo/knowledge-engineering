# Sift Workflow Best Practices

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

*   Product
*   Technology

# Sift Workflow Best Practices

Discover why utilizing Sift Workflows is the key to unlocking automation in your fight against fraud.

![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)

Sift Product Team

May 16, 2022

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

Fraudsters are skilled at deploying sophisticated tactics that increase their ability to attack with great speed and scale. Having the most effective tools in your Digital Trust & Safety strategy is essential, and utilizing Sift Workflows is the key to unlocking automation in your fight against fraud. 

We’ve designed Workflows to be fully customizable based on your unique processes and business needs. They allow you to easily make risk-based decisions in real time—empowering your team to apply business logic in order to automate decisions, enforce policies, and adjust friction based on a holistic view of each user. Workflows can be used to set up a route to auto-block orders with a high Sift Score, review orders with a medium score, and auto-accept everything with a low score.

Learning how to optimize Workflows will uplevel your automation and help you achieve your long-term fraud prevention goals. We’ve compiled several tips below to help you and your team maximize the value of Sift’s Workflow automation.

1.  Maximize score thresholds in Workflows to block unwanted risk and improve your acceptance rate for legitimate users.
2.  Use the waterfall logic of Workflows to prioritize sticky routes and Score-based routes and efficiently automate transactions.
3.  When it comes to rules, less is more, and many businesses find they’re able to reduce their rulesets when using Sift Workflows.
4.  Keep your review queues to a manageable level by optimizing Workflows to route only transactions that need manual review.
5.  Monitor the efficacy of your routes with Sift reporting tools to achieve the best results and catch discrepancies quickly.
6.  Always check your work. Sift Workflows include useful tools to ensure you change only what you intend to, but it’s always a good idea to monitor your updates.

## Getting the most of score thresholds

Score thresholds are essential for effective workflows. They can be used on their own, or combined with other criteria, such as location, device, and billing signals. Score thresholds are particular Sift Scores used to trigger an action within Workflows. For example, an analyst team might decide to block orders above a score threshold of 90 because they’ve found those orders are highly indicative of fraud.

The score distribution graphic above visualizes how users are scored when interacting with your site, which can be used to determine where to set score thresholds. The x-axis is the range of scores from 0-100, and the y-axis represents how many users have been assigned that Sift Score. Most score distributions look something like this graph, where the blue line is showing most legitimate actions fall in the safe, low-score region, while the red line shows risky actions mostly have higher scores. The Analyze tab is a useful tool for optimizing your score thresholds for your business needs.

## Making sense of waterfall logic

Workflows leverage waterfall logic, which means the routes are evaluated in sequential order starting from the top, and only a single route (the first one to match) triggers at each workflow run. If none of the routes fire, then the workflow defaults to the “Everything Else” action, which is usually an auto accept decision.

The waterfall logic of Workflows also informs how routes should be prioritized when designing a workflow. At the top of the workflow, you may need to use what we call _sticky routes_. These are used when you need to persist the same decision that was applied previously. This would only be relevant in cases where your team has confirmed a user as fraudulent, yet the user continues to try and transact on your site (i.e., the user has not been added to a block list).

Due to the nature of waterfall logic, we recommend including your score-based route at the top of your workflow, just below any sticky routes. This will give you maximum visibility into how the model is performing. 

## Rules: less is more

If you’re coming from relying heavily on rules, it’s helpful to keep in mind that with Sift, customers can significantly prune their ruleset. Rules-based systems require considerable operational investment to maintain and restrict how quick and adaptable your fraud system can be. You don’t need hundreds of workflow routes in order to be successful with Sift. 

## Routing to review queues

It’s a good idea to watch your queue volumes, and configure your workflow so you’re directing a manageable number of cases to the queue. This is good for morale (allowing your agents to achieve ‘inbox zero’), and it also ensures reporting in Sift is up-to-date.

## Using reporting to your advantage

Sift offers two reports that are helpful for monitoring workflows: Workflow Metrics and Route Metrics. These reports help you keep track of the accuracy of your workflows overall, as well as your workflow routes. Consistently keep an eye on the performance of your workflows to catch problems with decisioning early.

## Check your work before publishing

Once you create a workflow, you can keep track of the status by tagging it as draft, paused, or published. But be mindful this is similar to pushing code and will impact your order flow. Sift’s Workflow validation will show a confirmation dialogue when saving a draft to help catch and address errors, and when you’re ready to publish updates to a workflow, you will see a summary to ensure you’re confident with the changes before publishing. Nonetheless, it’s always good practice to double-check your work, especially when going live. 

If you’re new to Workflows, check out our Workflows tutorial to get started.

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