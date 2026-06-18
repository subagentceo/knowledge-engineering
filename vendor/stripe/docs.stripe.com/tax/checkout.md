# Collect tax with Checkout

Learn how to automatically calculate taxes using Stripe Checkout.

Stripe Tax automatically calculates taxes on purchases and *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) during a Checkout session. If you haven’t integrated with Checkout, complete the [Accept a Payment guide](https://docs.stripe.com/checkout/quickstart.md) first.

> #### Transfer tax liability to Stripe
> 
> If you sell digital products, [Managed Payments](https://docs.stripe.com/payments/managed-payments/tax-compliance.md) allows you to offload tax liability to Stripe so we’re directly responsible for handling sales tax, VAT, or GST globally. As a merchant of record solution, Managed Payments also handles fraud prevention, dispute management, and customer support on all transactions.

## Choose your integration

| **Integration**                                                       | **Description**                                                             |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [Checkout page](https://docs.stripe.com/tax/checkout/page.md)         | Use the Stripe-hosted Checkout page or the embedded form for a prebuilt UI. |
| [Checkout elements](https://docs.stripe.com/tax/checkout/elements.md) | Use elements mode for full control over the payment form layout.            |

## See also

- [Determine customer locations](https://docs.stripe.com/tax/customer-locations.md)
- [Collect customer tax IDs](https://docs.stripe.com/tax/checkout/tax-ids.md)
- [Test your tax integration](https://docs.stripe.com/tax/testing.md)
- [Reporting and filing](https://docs.stripe.com/tax/reports.md)
- [Use Stripe Tax with Connect](https://docs.stripe.com/tax/connect.md)
