# Migrate subscriptions to Stripe Billing

Learn about migrating subscriptions from other sources to Stripe.

You can import existing *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) from third-party billing systems (such as Zuora, Recurly, Chargify, or Chargebee) into Stripe Billing. You can also migrate subscriptions from an in-house billing system or from a different Stripe account.

Use the [Billing migration toolkit](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md) to migrate your subscriptions without writing code. Alternatively, you can use the [Stripe APIs](https://docs.stripe.com/billing/subscriptions/import-subscriptions.md) to import subscriptions with manual scripts.

## Before you begin

You must know:

- Your current payment processor.
- Your current subscription provider.
- Your *pricing model* (The pricing model consists of the products or services you sell, how much they cost, what currency you accept for payments, and the service period to charge (for subscriptions). To build the pricing model, you use Products—what you sell—and Prices—how much and how often to charge for your products).

## Getting started

[Migrate subscriptions using toolkit](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md): Use the Billing migration toolkit to migrate your subscriptions to Stripe.

[Migrate subscriptions with APIs](https://docs.stripe.com/billing/subscriptions/import-subscriptions.md): Learn how to migrate your subscriptions to Stripe using Stripe APIs.

## Migration stages

A typical migration process consists of the following stages:

1. [Set up your billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md).
2. [Migrate your customer and payment processor information](https://docs.stripe.com/get-started/data-migrations/pan-import.md).
3. [Import your subscriptions to Stripe Billing](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md).

### Migration decision matrix

The migration process varies slightly depending on a few factors. Use the following decision matrix to understand the required steps for your situation.

|  |
|  |
|                                                       | **My customer and payment data is in an external system**                                                                                                                                                                                                                                                                                                                                                      | **My customer and payment data is already in Stripe**                                                                                                                                                                                                                                                                                                                                     |
| **Migrate subscription data from a third party**      | - [Set up a Stripe Billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md)
  - [Request a payments data import from your current processor](https://docs.stripe.com/get-started/data-migrations/pan-import.md)
  - [Use the Billing toolkit to migrate subscriptions data to Stripe Billing](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md) | - [Set up a Stripe Billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md)
  - [Use the Billing toolkit to migrate subscriptions data to Stripe Billing](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md)                                                                                                                |
| **Migrate subscription data between Stripe accounts** | - [Set up a Stripe Billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md)
  - [Copy PAN data across Stripe accounts](https://docs.stripe.com/get-started/data-migrations/pan-copy-self-serve.md)
  - [Billing migration within Stripe accounts](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#within-Stripe-accounts)                      | - [Set up a Stripe Billing integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md)
  - [Copy PAN data across Stripe accounts](https://docs.stripe.com/get-started/data-migrations/pan-copy-self-serve.md)
  - [Billing migration within Stripe accounts](https://docs.stripe.com/billing/subscriptions/import-subscriptions-toolkit.md#within-Stripe-accounts) |
