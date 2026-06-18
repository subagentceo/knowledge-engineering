# Overview

Successfully migrate your customers and their payments data to Stripe.

Migrating your customer and payments data to Stripe is a multi-step process. After you read through this guide, you’ll:

- Understand the Stripe migration process.
- Be able to scope the timeline for your migration.
- Know the integration elements required for a successful migration.
- Understand how to migrate payment details with minimal disruption to your users.

## Build a Stripe integration 

- Choose a [payments integration](https://docs.stripe.com/payments/checkout.md#payment-uis).
- Build an integration to accept one-time payments and subscriptions (if applicable).
- Develop your data migration plan, starting with new customers. Your end goal is to migrate 100% of new customers, then migrate existing customers.
- Design a process for customers to update their card information.

## Learn about the migration process 

- Review Stripe’s [migration documentation](https://docs.stripe.com/get-started/data-migrations/pan-import.md).
- Contact your previous processor to understand their migrations process.

## Plan a migration and connect with an existing processor 

- Identify which payment details you want to migrate.
- Identify which payment methods you want to migrate.
- Find out how many customer records you want to migrate.
- Plan a migration timeline that considers your previous processor, your customer count, and any upcoming deadlines.
- Send the Stripe Migrations team details about your previous processor, Stripe account number, number of records to be migrated, and types of payment methods that you plan to import.

## The Stripe Migrations team 

- Introduce your existing processor to [Stripe’s Data Migrations team](https://support.stripe.com/questions/request-a-data-migration).
- Complete any action items or provide any additional information requested by Stripe or your existing processor’s migrations team.

## Migrate and update 

- Follow communication between Stripe and your previous processor to ensure your team is prepared.
- Respond to any issues identified during migration.
- Look for an email from the Stripe Migration team with the JSON mapping file.
- Parse JSON mapping file and update your database accordingly.
- Implement a process for customers  to update their card information.
- Design your remapping plan, and include *subscription* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) remapping where applicable.
- Begin charging existing customers on Stripe.

## PAN data 

If you need to transfer sensitive payment information to or from another payment processor, or even between Stripe accounts, we can help you do so in a secure and *PCI-compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) way.

The process differs depending on the type of transfer:

- [Import PAN data to Stripe from another payment processor](https://docs.stripe.com/get-started/data-migrations/pan-import.md)
- [Transfer PAN data from one Stripe account to another Stripe account](https://docs.stripe.com/get-started/data-migrations/pan-copy-self-serve.md)
- [Export PAN data from Stripe to another payment processor](https://docs.stripe.com/get-started/data-migrations/pan-export.md)

For each type of data migration, we can only assist you if your request includes both customer records and the associated payment data. Use Stripe’s [Customer API](https://docs.stripe.com/api/customers.md) to create, update, or retrieve customer data that doesn’t include payment information.

> You can perform PAN data migrations without using Stripe’s Sigma or Data Pipeline products.

## See also

- [The Customer object](https://docs.stripe.com/api/customers/object.md)
- [The Subscription object](https://docs.stripe.com/api/subscriptions/object.md)
- [Default payment source](https://docs.stripe.com/api/customers/object.md#customer_object-default_source)
- [Products and prices](https://docs.stripe.com/products-prices/overview.md)
- [Billing cycle anchor](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-billing_cycle_anchor)
