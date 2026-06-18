# Next-Level Experimentation: From Ideation to Analysis - Iterable

## Next-Level Experimentation: From Ideation to Analysis

**Published by**

August 1, 2024

![](https://iterable.com/wp-content/uploads/2026/04/073024_VILT-Webinar_Blog-Header.png)

Connecting people with the products that bring them joy doesn’t happen in a vacuum—it requires a constant feedback loop of testing and experimentation.

That’s why we’ve created the live Iterable Academy training series, “Next-Level Experimentation: From Ideation to Analysis.” In this series, we dive deep into exactly how to build an experiment from start to finish—from developing a hypothesis and creating variants to evaluating your results and repeating for future experiments.

Our course is available to everyone, regardless of whether you use Iterable, but if you’re looking for the TL;DR, keep reading.

### How to Find Success with Experiments

Experiments are critical components in any marketer’s toolkit because they allow you to foster data-driven decision making and test new ideas in low-risk ways. Running more experiments creates an exponential effect on your findings, informing future tests and improving your team’s understanding of what resonates best with your users.

But before you sprint to deploy your next A/B/n split, here are a few general best practices for finding success with experiments.

*   **Build a culture of testing**. Nothing improves if no one else is involved, so make experimentation a core part of your marketing process.
*   **Experiment often**. The real impact on your organization will come from being consistent with experimentation efforts, rather than relying on a one-off test.
*   **Document your learnings**. Keep tabs on any trends you see and circulate your reporting and analytics to anyone else at your company who could benefit from your insights.
*   **Embrace failure**. Understand that even “failed” experiments are a success—learning what doesn’t work is just as valuable as understanding what does.

### The 5-Step Process to an Impactful Experiment

Making the most out of any experiment is easier when you can break down the process, step by step. So let’s get into it.

In the next sections, we’ll walk through each of the following:

1.  **Ideation**: Define your goals and develop a hypothesis
2.  **Design:** Identify the appropriate experiment type
3.  **Setup**: Configure experiment settings within Iterable
4.  **Measurement**: Review results and analytics
5.  **Repeat!**

#### 1. Ideation

Before you actually design your experiment, it’s important to review your business goals and ideate on new ways to experiment. What are you looking to achieve?

Rather than defining an overarching, sweeping goal, focus individual experiments on specific sub-goals. This way, you can ensure each goal has a specific, measurable behavior tied to it.

For instance, in our Iterable Academy course, we use a fictitious fitness subscription service, Fiterable, as our example in this 5-step process. If Fiterable’s initial goal is to drive users to convert from a free trial to a paid subscription, potential subgoals could be to increase the rate at which users download the Fiterable app or complete their first class.

Once you have a clear goal defined, we recommend forming a hypothesis. When developing your hypothesis, be intentional when defining your proposed changes and expected outcomes. An example hypothesis for Fiterable might be, “If I change my subject line to employ a motivational tone, I expect my open rate to increase by at least 20%, from a baseline of 28% to 34%.”

Make sure you only test one hypothesis at a time and include a minimum desired lift to strengthen it. Document this hypothesis ahead of your text execution, so you can reference it during analysis.

Now that you’ve ideated on your goals and defined a specific hypothesis, it’s time to design the experiment.

#### 2. Design

When identifying how to design your experiment, consider what can be tested to measure your hypothesis. What are you looking to optimize?

In Iterable, you can select a variety of experiment types, based on send time or content such as subject line, preheader, or message body.

![The title at the top reads "New experiment." Below this is a field labeled "Experiment name," which contains the text "Welcome Fall '23' experiment." Under the "Type" section, there are several options for the type of experiment to create, with the following options: Subject line (selected), Preheader text, From name and sender, Body, Send time, Everything. And at the bottom right corner, there is a green button labeled "Create experiment," and on the bottom left corner, a "Cancel" button.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-01-at-11.19.51-AM.png)

_Within the Experiments setup, select your experiment type. In this case, “subject line” is chosen._

With a send time experiment, you can send a campaign to your entire user list at different times so you can see which gets the best response. Or, you can test the effectiveness of campaigns that are sent using the Send Time Optimization (STO) feature in Iterable’s AI Suite.

Additionally, Iterable offers the ability to test “Everything” as an experiment type, but we recommend using this setting only when you have a very clear use case for it. For example, if you want to compare the performance of two drastically different campaigns, you might test everything. The insights gained from this type of testing tend to be limited, since you can’t attribute the results you see to a specific change you’ve made.

How do you choose which experiment type is right for you? Review past tests in Iterable’s Experiments Index page, and filter by success metrics to determine what’s been tried in the past. For goals related to improving click-through rate or completing a call to action, review heatmap data to understand if a new placement or copy should be considered.

Once you’ve selected the right design, you can easily set up the experiment in the Iterable platform.

#### 3. Setup

Using Iterable, you can configure your experiment’s specific settings. If you’re testing content like subject lines, Iterable’s generative AI feature, Copy Assist, can help you draft iterations of your messaging. Iterable can also test with all users or test with a subset of users first and optimize your campaign by sending the best performing variant to remaining users.

![The image shows a "Variant setup" screen for creating an A/B test in a Iterable. It includes a control variant named "Welcome Fall 23" with the subject line "Just in time for the holidays... 15% off!" and a Variant B section with an editable subject line and suggested alternatives. There are options to add all suggested variants, cancel, and a "Try Again" button at the bottom, with settings for audience and test strategy visible below.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-01-at-11.24.01-AM.png)

_Leverage Copy Assist to generate alternate copy for subject line variant creation._

When determining your test size, we recommend testing with as many users as you feel comfortable, but with no fewer than 1,000 users per variant. If you want to ensure that you can measure statistically significant results, we recommend using a sample size calculator, like the one offered by Statsig, to determine the right test size for your experiment.

![The image shows the "Settings" section for audience segmentation in Iterable. It includes options for a holdout group, test groups, and an optimized group, with percentages set at 20%, 20%, and 60% respectively. There are settings for adding a holdout group, specifying the holdout group size and attribution window, and choosing between testing with all users or a subset of users, with the test group size set at 20%.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-01-at-11.28.19-AM.png)

_Experimentation settings include holdout groups and testing strategies. Once selected, they can be seen in the audience group breakdowns._

Okay, now that your experiment is up and running, let’s review the results and analyze its performance.

#### 4. Measurement

There are two metrics that are key to proper measurement of any experiment:

*   **Confidence** indicates the likelihood that a variant is truly performing better than the control
*   **Lift** shows by approximately how much

A result is statistically significant if the reported confidence exceeds a particular threshold. While the industry standard for this threshold is typically 95%, organizations that are less risk-averse may be comfortable with 90%. Regardless of which threshold you choose for your organization, we recommend applying that same threshold across all your experiments. This will help ensure you’re making decisions consistently.

In Iterable, confidence and lift can be viewed in the Overview tab of the Experiment Analytics page, but you can dive even deeper by clicking the Performance tab. There, you can use different time frame filters and define guardrail metrics, like checking unsubscribes if you’re optimizing open rate or average order value if you’re optimizing purchases.

![The image shows the results of an "October promotion" experiment in Iterable, indicating that the "BOGO Costumes" variant is the winner. It compares the test variant against the control, showing metrics like the number of sends, unique add-to-cart rate, lift, and confidence. Detailed experiment information is provided, including the test subject, start and end times, experiment ID, creator, initial send size, and test period duration.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-01-at-11.30.28-AM.png)

_Review Experimentation Analytics on the Overview page to see metrics like “Confidence” and “Lift.”_

![The image displays the performance metrics of an "October promotion" experiment in Iterable. It includes a variant breakdown showing the control "October Sale" and the winning variant "BOGO Costumes," with data on sends, opens, clicks, and add-to-cart actions. Below this, a line graph illustrates the variant performance over time, analyzing the add-to-cart metric across several days.](https://iterable.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-01-at-11.33.01-AM.png)

_Review Experimentation Analytics on the Performance page to dive deeper with time frame filters and metric selection._

#### 5. Repeat!

Of course, experimentation should be an ongoing effort, not a one-time occurrence. You can create a feedback loop by using your previous round of experiments to inform your next set of experiments. As you evaluate an experiment’s results, consider the following: What might help further improve conversions? How can you experiment throughout all stages of the marketing funnel? Are there any similar campaigns where you can apply your learnings?

To take it a step further, we recommend regularly reviewing your past experiments to draw even more learnings. Iterable’s Experiment Suite makes this easy with dedicated Experiments Index & Analytics pages, so you can see what’s worked in the past, what didn’t, and what showed promise.

But, even if you don’t have a marketing automation platform, you should always document your learnings. We recommend keeping an experiment notebook, where you can jot down your original hypothesis and experiment results, as well as any interesting insights and the business decisions you made because of them.

Now you can close that feedback loop, and rinse and repeat for future experiments.

Even More Experimentation Resources

To learn more about experimentation using Iterable, check out our following resources.

*   **Academy Course**: Next Level Experimentation
*   **Webinar**: Ask a Maker About: How Rocksbox Rocks Subscription Through Testing & Experimentation
*   **Support Documentation**: Experiments Overview
*   **Academy Course**: Experiments and A/B Testing

_Ready to give Iterable Experiments a whirl? Reach out and schedule a demo to get started today._