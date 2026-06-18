# Build a marketplace

Build a marketplace to connect sellers with customers and facilitate the exchange of physical or digital items or services.

> This guide uses Accounts v2 to create and manage connected accounts. For a guide that uses Accounts v1, see [Build a marketplace with Accounts v1](https://docs.stripe.com/connect/end-to-end-marketplace.md).

A marketplace provides a single storefront that offers products and services from many sellers. Customers pay the marketplace, and see the marketplace’s name on their receipt. The marketplace then pays the sellers. Traditional marketplaces, like Amazon and TixTrack, facilitate the sale of physical or digital items. Businesses such as Lyft and Instacart, which connect customers to vendors that offer services, are also considered marketplaces.

Use this guide if you’re creating a marketplace where:

- You’re the *merchant of record* (The legal entity responsible for facilitating the sale of products to a customer that handles any applicable regulations and liabilities, including sales taxes. In a Connect integration, it can be the platform or a connected account), legally responsible for the goods and services that connected accounts provide to customers.
- Stripe handles onboarding.
- Each connected account has an [Express Dashboard](https://docs.stripe.com/connect/express-dashboard.md) or a custom dashboard created with [embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) or the [API](https://docs.stripe.com/api/account_sessions/create.md).
- You process payments directly with Stripe.
- You pay Stripe fees and manage disputes and refunds.
- You collect per-payment application fees from connected accounts.
- You control paying out funds to connected accounts using [destination charges](https://docs.stripe.com/connect/destination-charges.md) or [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

We recommend using this configuration when you get started with building a marketplace with Connect. You also have other options, including using [embedded](https://docs.stripe.com/connect/build-full-embedded-integration.md) or custom configurations.

In addition to the [essential tasks](https://docs.stripe.com/connect/marketplace/essential-tasks.md) you need to complete to set up a marketplace, you also need to consider how your marketplace will [monetize](https://docs.stripe.com/connect/marketplace.md#monetization) and how you’ll handle [merchant risk](https://docs.stripe.com/connect/marketplace.md#merchant-risk).

## Monetization

Marketplaces typically charge a commission or fee to their connected accounts for listing their services on their platform. As a marketplace, you’re responsible for paying Stripe fees, which include payment fees (such as transaction and dispute fees) and Connect fees (such as per-account fees and payout fees). In this model, you can earn revenue by:

- **Keeping part of the transaction amount**: Charge application fees when transferring funds to connected accounts, or pay out only a portion of the transaction amount.
- **White labeling other Stripe products under your brand**: Offer additional financial products to your connected accounts (for example, [Instant Payouts](https://docs.stripe.com/connect/instant-payouts.md) for accelerated access to funds, [Issuing](https://docs.stripe.com/issuing/connect.md) to allow accounts to pay with branded credit cards, or [Capital](https://docs.stripe.com/capital/how-capital-for-platforms-works.md) to issue loans).
- **Collecting subscription fees**: Charge your connected accounts a subscription fee for using your platform using [Stripe Billing](https://docs.stripe.com/connect/subscriptions.md).

Charging an application fee allows you to earn revenue and cover your costs to keep your balance from becoming negative. Use the [platform pricing tool](https://docs.stripe.com/connect/platform-pricing-tools.md) to automatically set pricing logic for the application fees you charge your connected accounts.
A diagram showing monetization for a marketplace (See full diagram at https://docs.stripe.com/connect/marketplace)
## Merchant risk

Your marketplace platform is responsible for covering the negative balances of your connected accounts. Use [Radar for Platforms](https://docs.stripe.com/radar/radar-for-platforms.md) to prevent, detect, and mitigate both buyer risk and financially risky connected accounts.

## Resources

[Marketplace Blueprint](https://dashboard.stripe.com/test/workbench/blueprints/learn-accounts-v2-marketplace?code-pane-shown=true): Use this guided API Blueprint in the Dashboard to learn how to collect payments, then pay out on your marketplace.

[Marketplace quickstart](https://docs.stripe.com/connect/marketplace/quickstart.md): See all the steps you need to complete to set up your marketplace on Stripe.

[Essential tasks](https://docs.stripe.com/connect/marketplace/essential-tasks.md): Learn more about every step required to build your marketplace and enable your connected accounts.
