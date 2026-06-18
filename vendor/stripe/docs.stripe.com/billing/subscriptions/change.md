# Modify subscriptions

Change existing subscriptions to cancel, pause, apply prorated charges and credits, and more.

You can change existing subscriptions without having to cancel and recreate them. Set up the [customer portal](https://docs.stripe.com/customer-management.md) to let your customers manage their own subscriptions and billing details through a Stripe-hosted page.

For changes that automatically create a new [subscription invoice](https://docs.stripe.com/billing/invoices/subscription.md), use [pending updates](https://docs.stripe.com/billing/subscriptions/pending-updates.md) so that the updates are only applied if the new invoice is successfully paid.

## Billing impacts

Not all subscription changes affect billing or generate prorations:

- *Billing-related updates* create prorations and can generate invoices. These include changing prices, quantities, billing periods, or adding or removing subscription items.
- *Non-billing updates* apply immediately without prorations. These include updating metadata, payment methods, tax settings, or [applying or removing discounts](https://docs.stripe.com/billing/subscriptions/coupons.md#update-a-subscription).

To see billing impacts before making changes, [preview prorations](https://docs.stripe.com/billing/subscriptions/prorations.md#preview-proration).

### Configuration updates

Configuration updates, like metadata and payment methods, don’t generate invoices with `proration_behavior=always_invoice` because they don’t change the amount owed for the current billing period. For a complete list, see [What doesn’t trigger prorations](https://docs.stripe.com/billing/subscriptions/prorations.md#no-prorations).

### Discounts

Updating only coupons or promotion codes doesn’t create proration invoice items. The new discount applies to the next invoice.

However, if you combine a non-prorating discount change with a proration-triggering update in the same API call (for example, changing an item quantity and modifying a discount), Stripe calculates the proration using the updated discount state. See [Discount changes and prorations](https://docs.stripe.com/billing/subscriptions/prorations.md#discount-changes-and-prorations) for details.

## Use cases

[Change billing period](https://docs.stripe.com/billing/subscriptions/billing-cycle.md): Adjust the billing date for subscriptions.

[Change prices](https://docs.stripe.com/billing/subscriptions/change-price.md): Upgrade and downgrade subscriptions by changing the price.

[Cancel active subscriptions](https://docs.stripe.com/billing/subscriptions/cancel.md): Manually cancel your customers’ subscriptions.

[Pause payment collection](https://docs.stripe.com/billing/subscriptions/pause-payment.md): Temporarily stop collecting payments from your customers.

[Apply discounts](https://docs.stripe.com/billing/subscriptions/coupons.md): Add discounts to subscriptions using coupons and promotion codes.

[Use trial periods](https://docs.stripe.com/billing/subscriptions/trials.md): Delay payments on active subscriptions using trial periods.

[Set quantities](https://docs.stripe.com/billing/subscriptions/quantities.md): Subscribe a customer to multiple quantities of a product.

[Collect taxes](https://docs.stripe.com/billing/taxes/collect-taxes.md): Collect and report taxes with Stripe Billing and Stripe Tax.

[Set payment methods](https://docs.stripe.com/billing/subscriptions/payment-methods-setting.md): Specify which payment methods to allow for a subscription.

[Manage prorations](https://docs.stripe.com/billing/subscriptions/prorations.md): Handle prorations for modified subscriptions.
