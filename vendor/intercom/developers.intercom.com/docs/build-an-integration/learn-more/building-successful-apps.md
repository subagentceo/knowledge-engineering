# Building Successful Apps

We want customers to be confident that any app they connect to their Intercom account will be useful, work well and use their data responsibly.

The following guidelines will help you build a successful public app.

These guidelines are in addition to our [Terms of service](https://docs.intercom.com/pricing-privacy-and-terms/intercom-terms-of-service), [Privacy Policy](https://docs.intercom.com/pricing-privacy-and-terms/intercom-inc-privacy-policy) and our general [Developer Guidelines](https://developers.intercom.io/page/intercom-developer-platform-guidelines).

## Step 1: Scope your app based on the customer problem

Start with the problem that you want to solve for your customers, and from there scope out how the features of your app will solve that problem.

Not every app will directly serve as a customer service tool, but your app will have a greater chance of success if a customer service team can quickly see what problems it will solve for their team.

If you've never used Intercom you can [create a trial account](https://www.intercom.com/) to see how it works.

Ensure your app is complementary to one or more of our products and don't rebuild Intercom - your app will be more successful if it adds new and unique capabilities.

## Step 2: Get familiar with Intercom APIs, tools, and conventions

Intercom is a system with many components which work together: Conversations, Tickets, Contacts, Data Attributes and more. Understand the customer problems you're solving and architect solutions using Canvas Kit and Intercom objects with our REST APIs.

Be intentional in how you design and build your app. We also recommend:

- Using OAuth as the only method of authorization for your app and choosing only scopes that align with your features
- Using the newest stable API version to build any middleware for your app
- Using Canvas Kit for any apps that need to function natively in the Messenger or Inbox


Use these objects and tools in an idiomatic way that will be straightforward, both for you as a code maintainer and for the customer experience. Familiarize yourself with how Intercom works by building sample apps using the documentation and reading through these resources:

- The Intercom [Object Model](/docs/build-an-integration/learn-more/object-model)
- [Events vs Custom Attributes](https://docs.intercom.com/the-intercom-platform/track-events-in-intercom)
- [Intercom glossary](https://docs.intercom.com/intercom-s-key-features-explained/the-intercom-glossary)


You can also reach out to us in the Messenger at the bottom right if you have any questions.

## Step 3: Set up your developer environment

For building public apps, we recommend creating separate apps for development and production.

A good rule is to name the development app the same as your production app but append something such as `[Staging]` or `[Dev]` at the end to differentiate between them.

After you [submit your production app for review](/docs/publish-to-the-app-store/review-publish-your-app) and it is approved, you should also see that the production app will be labeled as `Public` and your development app will be labeled as `Private`.

## Step 4: Follow relevant policies and guidelines

Aside from the Intercom policies that you must follow, any platform, browser, and OS policies and guidelines that apply to your app.

For example, with the iOS SDK Apple specifies in its [App Store guidelines](https://developer.apple.com/app-store/review/guidelines) that in order to pass the review to be listed, [you cannot promote or cater for in-app purchases away from Apple](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase). Therefore, all apps that utilize Canvas Kit in conversations or Messenger Home must ensure that there is no mention or provision to access external mechanisms for purchases or subscriptions.

## Step 5: Make set up easy

Offering easy app set up and installation means more customers are likely to use your app.

The easiest way to allow customers to install your app is to create a [listed app](/docs/publish-to-the-app-store/review-publish-your-app#listed-apps) that will display in the Intercom App Store.

In cases where you want to create an [unlisted app](/docs/publish-to-the-app-store/review-publish-your-app#unlisted-apps) that is only available for install on your own site or product, you will need to design your own installation flow, so it's important to be intentional. For example, if you provide a "Connect with Intercom" button in your own product, ensure that clicking that button immediately takes the customer to authenticate using Intercom OAuth before any other steps occur

If your product requires an account, it should be created or fetched automatically by fetching the credentials from Intercom (via the /me endpoint). If you absolutely need to ask customers to manually sign up, you should pre-fill as much customer information as possible (for example their name, company, and email).

## Step 6: Plan your review timelines accordingly

Every public app will need to be reviewed by the Intercom team. You can [follow this guide](/docs/publish-to-the-app-store/review-publish-your-app) to submit your app for review.

These reviews typically take 7-14 days, but if your app is initially rejected you will need to make updates based on the feedback provided and resubmit for approval. If you have a firm go-live date for your app, make sure that you give your team ample time to get app approval.

## Step 7: Build trust with customers while driving adoption

Once your app is live, you will want to think about driving installs and providing a quality customer experience.

For some customers, sharing Intercom data with a third-party can be a considered risk. Make the value of your app clear, as well as what you will (and won't) be using their data for.

Here are a few points to consider:

- Only ask for the OAuth scopes you need. Clearly let your customers know why each scope is important. It is good to map app features to scopes so customers understand why you need each one - this also makes your application for OAuth more likely to be approved by us
- Describe your app accurately and don't deliberately mislead or confuse customers - provide clear text, marketing images, and videos to make the value and functionality of your app clear.
- Use Intercom branding in accordance with our [guidelines](https://developers.intercom.io/page/intercom-developer-platform-guidelines) and do not imply approval or partnership with Intercom unless you have our written consent to do so
- It's fine to promote your app, but please don't send unsolicited spam to Intercom customers
- Provide customer support through Intercom and/or Twitter, Facebook, email or phone and make it clear how customers can contact you