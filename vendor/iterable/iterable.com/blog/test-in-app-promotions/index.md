# How to Easily Test In-App Promotions in Iterable - Iterable

## How to Easily Test In-App Promotions in Iterable

**Published by**

July 10, 2019

![In-App Promotions Testing Illustration](https://iterable.com/wp-content/uploads/2026/04/071219_In-App-Testing_768x512.png)

If you currently offer or plan to offer promotions in your mobile app, you’ve probably asked yourself these important questions:

*   What is the right discount or incentive to give each user? 
*   Am I actually losing money by giving away this coupon because people would have bought anyway? 
*   How can I automate this promotion in a simple-to-use campaign? 

Fortunately, these are tough questions which can be tested within Iterable’s growth marketing platform!

An effective initial strategy is to send your highly engaged users a lower promotion because you already know they’re likely to buy without an incentive. Users with a medium engagement score should receive an average promotion and your least engaged users should receive the highest promotion.

In this article, we’ll walk through how to:

1.  Set up a campaign workflow based on the user’s lifetime purchase history
2.  Segment users by a custom engagement score on a daily cadence
3.  Send one in-app template to automatically populate promotions for each engagement level

### 1. Set Up a Campaign Workflow Based on Purchase History

Using Iterable’s Workflow Studio, you can build a marketing campaign that assigns an Engagement Score based on purchase history.

You can accomplish this on any custom event within Iterable (page views, games played, etc.) but for simplicity’s sake, we’ll use purchase history in this example.

Here is the workflow:

![In-App Promotion Workflow](https://iterable.com/wp-content/uploads/2019/07/In-App-1.png)

_Iterable’s Workflow Studio allows you to update a user’s profile based on purchase history._

Start by creating a workflow with a recurring campaign which reviews every user at the start of the day.

![Trigger Workflow Node](https://iterable.com/wp-content/uploads/2019/07/In-App-2.png)

_The workflow is triggered by reviewing users at 10:30 AM Pacific Time every day._

### 2. Segment by Engagement Score

Next, set up a filter node to determine the number of purchases the user has made.

You will need three filter nodes and each node will correspond to one of your engagement scores (low, medium and high).

![Filter Workflow Node](https://iterable.com/wp-content/uploads/2019/07/In-App-3.png)

_This filter identifies all users that have made between 1-2 purchases._ 

This node will check the number of purchases the user has made over their lifetime.

![Engagement Score Node](https://iterable.com/wp-content/uploads/2019/07/In-App-4.png)

_If a user has made 1-2 purchases, then their profile will be updated with a low engagement score._

You won’t need to ask your engineering team to flag the user. Iterable can write the “engagement_score” property directly to the user profile database from the Workflow Studio using the Change Contact Property node.

![Editing contact field in in-app promotion workflow](https://iterable.com/wp-content/uploads/2019/07/In-App-5.png)

_No engineering support required—Iterable updates user data fields automatically._

Once you’ve set up the filter nodes and contact property update nodes, you’ll assign each node an engagement score.

Repeat this step to continue this “waterfall” and label the users as low, medium and high until all users are cohorted by their engagement.

### 3. Dynamically Assign the Promotions

You will want to create one template which will dynamically populate the correct promotion based on the engagement level.

This is accomplished via Handlebars, which is a coding language used for dynamically populating personalized content at the time of send.

Below is our in-app template:

![Handlebars logic for dynamic personalization](https://iterable.com/wp-content/uploads/2019/07/In-App-6.png)

_Handlebars logic dynamically personalizes the promotion for each user._

This may look slightly confusing, so let’s explain the {{#ifMatchesRegexStr engagement_score “high”}} syntax.

It means if the engagement_score flag is:

*   **High**: show 15% promotion 
*   **Medium**: show 20% promotion 
*   **Low**: show 25% promotion 

Now you can add this logic to your in-app message template, preview with data and test it to see that the correct promotion is sent based on your engagement_score of “high.”

![In-app promotion for users with high engagement scores](https://iterable.com/wp-content/uploads/2019/07/In-App-7.png)

_The end result of the in-app promotion for users with high engagement scores._

### Put Your In-App Promotions Into Action

To summarize, in a fairly short amount of time, you were able to:

1.  Segment your users based on their past purchase history using a Filter node. 
2.  Write an engagement score to the user profile with the Change Contact Property node. 
3.  Populate a dynamic in-app message promotion to increase conversions for your less engaged users while saving money by not discounting too much for your highly engaged users. 

There are a number of ways you can customize this campaign for your unique business. Some other places you could optimize include:

*   A/B test the actual in-app promotion creative or content with Iterable’s Experimentation tool. 
*   Create more nuanced Segmentation cohorts beyond a simple low, medium and high. 
*   Test the time at which the in-app message is displayed to the user. 

We’d love to hear from you to discuss your thoughts on this use case or to see how we can customize this workflow for your brand.

You can request a demo of Iterable to learn more!