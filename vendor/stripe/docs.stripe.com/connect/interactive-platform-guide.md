# Interactive platform guide

Create a personalized platform integration guide for your business.

> **Integration guides available:**We've generated integration guides for you. View the quickstart guide or copy integration details for use with an LLM assistant.

Select the configuration options below to get personalized guidance for your Connect integration, including best practices like the use of the Accounts v2 API. You’ll get a custom integration guide and a custom LLM prompt that you can copy to use with an AI coding assistant.

### 1. Select your business model

Your business model determines the appropriate flow of funds for your integration.

- **Platform:**Sellers collect payments directly and pay fees to Stripe. For example, an eCommerce platform that processes payments under the hood for independent sellers.
- **Marketplace:**Your platform collects payments and distributes funds to sellers. For example, a food delivery service that connects customers with restaurants and drivers.

### 2. Select a monetization strategy

You can select one or more ways for your platform to charge connected accounts.

- **Application fees:**Charge a commission or fee for each payment.
- **SaaS subscriptions:**Charge a SaaS subscription fee to connected accounts.
- **Additional Stripe products:**Offer Stripe products with your branding and a markup to connected accounts. For example, instant payouts, Capital financing, or Issuing cards.

## Setup

Based on your selections, the sections below provide a personalized setup.

### Accept a payment

#### Item 1

A direct charge is a customer payment made directly to a connected account. Customers directly transact with your connected account, often unaware of your platform’s existence.

This charge type is best suited for platforms providing software as a service. For example, Shopify provides tools for building online storefronts, and Thinkific enables educators to sell online courses.

#### Item 2

Create destination charges on your platform to immediately transfer funds to connected accounts. Customers transact with your platform for products or services provided by your connected accounts.

This charge type is best suited for marketplaces such as home rental marketplaces (like Airbnb) or ridesharing apps (like Lyft).

Destination charges are created on the platform, but as part of the charge operation, funds immediately transfer to the connected account you specify. You can decide whether to transfer some or all of those funds.

Unless you’re eligible for [cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md), your platform and the connected account you transfer funds to must be in the same region to create a destination charge. Attempting to transfer funds across a disallowed border returns an error.

#### Item 3

Create separate charges and transfers to transfer funds from one payment to multiple connected accounts, or when a specific user isn’t known at the time of charge. The charge on your platform account is decoupled from the transfers to your connected accounts.

This charge type is best suited for marketplaces that need to split payments between multiple parties, such as DoorDash (a restaurant delivery platform).

While separate charges and transfers provide you flexibility, they require a more complex integration to manage account balances between your platform and your users. You must monitor your platform account balance carefully to make sure you have enough available funds to cover the transfer amount.

Unless you’re eligible for [cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md), your platform and the connected account you transfer funds to must be in the same region to use separate charges and transfers. Attempting to transfer funds across a disallowed border returns an error.

### Risk and compliance responsibilities

#### Item 1



#### Item 2

Your platform is liable for losses incurred by negative balances on your connected accounts. Your platform is responsible for reviewing new connected accounts during onboarding and determining the risk profile of your users.

Recommended for marketplaces that collect payments from buyers to payout sellers, or for advanced platforms that want full control over how risk and negative liabilities are managed on connected accounts:

- Your platform must monitor connected accounts for ongoing risk of loss.
- Your platform has to build flows to communicate and remediate connected accounts when you detect fraud or risk.
- You have the engineering resources to establish processes for managing ongoing risk of loss and preventing fraud.

Before creating accounts with this setup, carefully consider and acknowledge your platform responsibilities for negative balance liabilities.

Learn about [managing refunds and disputes in your marketplace](https://docs.stripe.com/connect/marketplace/tasks/refunds-disputes.md), particularly for platforms using indirect charges.

#### Item 3

Stripe monitors risk signals on connected accounts, implements risk interventions on connected accounts in response to observed signals, and seeks to recover negative balances from your connected accounts.

For most software as a service platforms, this is the best choice, especially for those that are new to embedding payments:

- Stripe monitors your connected accounts for credit and fraud risk, as well as protection against risk of loss in the event of negative balances attributed to business risk.
- Stripe handles all the end to end communications and remediations directly with your connected accounts through hosted flows or embedded components.

Learn about [managing funds movement for payment reversals specifically for SaaS platforms](https://docs.stripe.com/connect/saas/tasks/refunds-disputes.md), including how to handle refunds and dispute chargebacks effectively.

## Preview the user experience

Connected accounts use hosted onboarding and manage their accounts from a hosted interface.

#### Onboarding

[Stripe-hosted onboarding](https://docs.stripe.com/connect/hosted-onboarding.md) handles the collection of business and identity verification information from connected accounts, requiring minimal effort from the platform. A web form hosted by Stripe renders dynamically, based on the capabilities, country, and business type of each connected account.
![](https://b.stripecdn.com/docs-statics-srv/assets/hosted_onboarding_form.e59ba8300f563e43489953f06127f52c.png)

#### Dashboard

#### Item 1

Provide access to the Stripe Dashboard to connected accounts.

The Stripe Dashboard provides connected accounts with access to Stripe functionality, including viewing payouts, managing refunds, handling disputes, accessing reporting, and processing charges on their own. Users can sign into their Stripe Dashboard at any time and can access the Dashboard by visiting Stripe directly. Users have access to Stripe support and Stripe can reach out and communicate with users about their account.

Use the Stripe Dashboard when your connected accounts:

- Need access to payments workflows and advanced user management features.
- Prefer Stripe to manage risk of loss and take responsibility for negative balance liability on connected accounts, which is the typical configuration for the full Stripe Dashboard.
- Are comfortable with Stripe branding and limited platform co-branding.

You can always add [embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) to your own website along with providing access to the Stripe Dashboard.

#### Item 2

Provide access to the [Express Dashboard](https://docs.stripe.com/connect/express-dashboard.md) for connected accounts to manage their account.

The Express Dashboard enables connected accounts to view their available balance, see upcoming payouts, and track their earnings in real time. You can enable users to manage refunds or disputes through their Express Dashboard in the [Express Dashboard settings](https://dashboard.stripe.com/settings/connect/express-dashboard/features). Users have access to Stripe support and Stripe can reach out and communicate with users about their account.

Use the Express Dashboard when your connected accounts:

- Are marketplace sellers that need limited access to workflows.
- Primarily receive payouts with optional access to manage refunds and disputes.
- Benefit from a fully branded dashboard look and feel.
- Are accounts where your platform is typically responsible for negative balance liability and managing risk of loss.

You can always add [Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) to your own website in tandem with providing access to the Express Dashboard.
![Example of the Express Dashboard](https://b.stripecdn.com/docs-statics-srv/assets/express_dashboard_example.efcd6a5b157d03a610f6fc788a7c07a0.png)

> **Integration guides available:**We've generated integration guides for you. View the quickstart guide or copy integration details for use with an LLM assistant.
