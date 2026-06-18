# How to Create a Cross-Channel Onboarding Campaign in Iterable - Iterable

## How to Create a Cross-Channel Onboarding Campaign in Iterable

**Published by**

July 29, 2019

![Illustration depicting an onboarding campaign in Iterable](https://iterable.com/wp-content/uploads/2026/04/072319_Onboarding-Iterable-Workflow_768x512-1.png)

Savvy marketers (like you since you’re reading this article) already know that onboarding is a vital part of the customer journey, but the data backs up our instincts: brands with mobile apps lose over 70 percent of new users within the first week of app install.

And that statistic is likely even higher for businesses that are not mobile-friendly and engaging customers on several communication channels.

In our latest guide to Unboxing Must-Have Marketing Campaigns, we share the five essential ingredients to amazing customer onboarding:

1.  Orient newcomers to your brand
2.  Build cross-channel connections
3.  Enable behavioral profiling
4.  Gather self-reported data
5.  Include a bounceback/first purchase offer

Whether you have yet to create your first onboarding campaign or you’re looking to optimize your current workflow, you may be wondering how you can use the power of Iterable to take your onboarding to the next level.

Read on for a step-by-step walkthrough of a robust onboarding campaign that addresses those five essential ingredients by seamlessly integrating email, SMS, and mobile push notifications.

### Create a Cross-Channel Onboarding Campaign in Iterable

Using Iterable’s Workflow Studio, you can build an effective cross-channel onboarding campaign with a virtually unlimited number of variations and permutations depending on your customer’s specific journey. 

To keep things simple, we’re going to walk you through a template with five key phases. In this example, we’re taking the role of a women’s fashion retailer, but this campaign can be tailored to any industry.

#### Phase 1: Initial Education

This onboarding campaign, like many of its kind, begins when a new user creates an account. To ensure that your user data is properly populated, we recommend that you add a node that delays the campaign for one minute.

Then, you can add a filter to see whether the user has signed up for a premium account (perhaps one that is exclusive for loyalty members).

If they are a premium account owner, then the campaign will send an SMS confirmation and a bounce-back email that asks the customer to take a survey about their premium experience so far. They will be added to a premium onboarding workflow instead and removed from this campaign.

If the user does not have a premium account, then they will continue through this onboarding workflow. We’ve added an A/B experiment to test two initial emails, one that educates the user about their specific account benefits and one that gives them all they need to know about the brand.

Between each phase, we’ve added delays of two days before proceeding to the next step.

![Onboarding Campaign Phase 1](https://iterable.com/wp-content/uploads/2019/07/Step-1.png)

_Phase 1 begins the onboarding campaign with educational content via email._

#### Phase 2: App Download

After the two-day delay, we’ve applied the same filter from the previous phase to check whether the user has signed up for a premium account. 

If they have, then they are routed to the premium onboarding workflow and sent an email encouraging them to download our mobile app. They’ll also be asked to complete a survey via email before being removed from this campaign.

![Onboarding Campaign Phase 2](https://iterable.com/wp-content/uploads/2019/07/Step-2.png)

_Phase 2 encourages downloading the brand’s mobile app._

If the user did not convert in Phase 1, we’ll send them an email with a link to download our app. 

After a one-day delay until 8:30 a.m. local time, we’ll check to see if that action has been completed. If it has, then we’ll share a relevant article from our blog with a mobile push notification.

![Edit workflow node screenshot](https://iterable.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-12-at-2.41.56-PM.png)

_By clicking into the filter node, you can see the parameters we set for this phase: find users that meet the criteria of having a device endpoint (in this case, a mobile app) enabled._

If they haven’t downloaded the app yet, then they’ll receive a morning email with the latest blog content populated via a data feed. This email will include a CTA to download the app.

#### Phase 3: Update User Preferences

After another two-day delay, we’re going to see whether the user prefers Tops, Dresses, or Shorts. If they opened the push notification or installed the app in Phase 2, then they’ll set those preferences on mobile. If not, they’ll be set via email. 

If no preferences are set on the user profile, then they’ll be sent an email featuring new products in these three categories, and the process will rinse and repeat.

![Onboarding Campaign Phase 3](https://iterable.com/wp-content/uploads/2019/07/Step-3.png)

_Phase 3 sets user preferences based on the channel they’ve engaged with._ 

#### Phase 4: Premium Promo

As seen in previous phases, Phase 4 will filter out users that have signed up for a premium account by sending them a bounceback email, an app download email and a survey before routing them to the premium onboarding workflow.

If a user did not convert, they will be sent a special discount code to incentivize them to sign up for premium. This message will be A/B tested between a 10% off discount and the same discount plus a referral discount for a friend.

![Onboarding Campaign Phase 4](https://iterable.com/wp-content/uploads/2019/07/Step-4.png)

Phase 4 sweetens the deal with a discount to sign up for a premium account.

#### Phase 5: Final Feedback

If by this phase, a user has not converted into a premium customer, then they will be sent an email asking them to complete a survey regarding their style preferences so the brand can better serve their fashion needs.

You can see the template for this message below. It includes Iterable’s handlebars logic to personalize by first name or default to “Hi there,” if a first name is not populated in the user profile.

At this point, the onboarding workflow is considered complete, and all remaining users will be removed from this campaign.

![Survey Message Template](https://iterable.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-12-at-2.56.49-PM.png)

_Phase 5 completes the campaign with a final email to gain user feedback._

### Evolve Your Onboarding Campaign

You can take your customer onboarding from underwhelming to astounding simply by mapping out important touchpoints and communicating with new users on a variety of channels to determine the content and cadence they prefer.

And like with any marketing campaign, success comes when you test its effectiveness and iterate on the process.

For a detailed explanation of the five essential ingredients for amazing onboarding, and even more advanced email tactics, be sure to check out our guide, Unboxing Must-Have Marketing Campaigns: Onboarding Series.

![Unboxing Must-Have Onboarding Email Campaigns](https://iterable.com/wp-content/uploads/2019/07/ITE_Onboarding-WP_Blog-CTA-Banner_620x240.png)