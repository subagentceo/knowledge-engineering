# Testing Stripe Tax

Learn how to test your Stripe Tax integration.

You can use Stripe Tax in a *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) environment to preview automatic tax calculation behavior for different tax settings. Use a sandbox to:

- Preview tax calculation behavior for different customer locations and registered jurisdictions.
- Validate that your integration handles automatic tax calculations correctly.
- Understand zero-tax outcomes.

## Configure tax settings for a sandbox

Stripe Tax has separate settings for sandboxes, allowing you to preview changes to your tax settings before applying them in live mode.

When you [Set Up Stripe Tax](https://docs.stripe.com/tax/set-up.md), make sure you enable testing by configuring tax settings in your sandbox.

## Add a registration

Stripe Tax only calculates tax in jurisdictions where you’ve added a registration. You must add at least one registration in your sandbox to test your Stripe Tax integration.

Some [product tax codes](https://docs.stripe.com/tax/tax-codes.md) are exempt from sales tax in certain jurisdictions, which can make them challenging to test. For example, some classes of digital goods are exempt from sales tax in the state of California. When you’re testing your Stripe Tax integration, we recommend adding registrations in states that have fewer product-specific exemptions, such as Idaho or New Jersey.

Sandbox registrations don’t affect live mode tax calculations, so you can change them at any time after you’ve verified that your integration is working correctly.

## Testing your integration

After you’ve configured your Stripe Tax settings in your sandbox and added registrations, you’re ready to test.

#### No-code

To test in the Dashboard, create an [Invoice](https://docs.stripe.com/invoicing/dashboard.md) or [Payment Link](https://docs.stripe.com/payment-links/create.md), and make sure the **Use automatic tax calculation** toggle is on.

#### Low-code

To test your [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions.md), [Subscriptions](https://docs.stripe.com/api/subscriptions.md), or [Invoices](https://docs.stripe.com/api/invoices.md) API integration:

- Make sure you’re passing `automatic_tax[enabled]=true` in your API requests as instructed in the [integration guide](https://docs.stripe.com/tax/set-up.md?dashboard-or-api=api#integrate).
- Test using a customer address in a location where you’ve added a registration.

#### Custom

To test your Stripe Tax API integration, follow the [instructions in the integration guide](https://docs.stripe.com/tax/standalone-tax-api.md).

## Review Calculations

### Using the payment details page

> This functionality isn’t available for tax transactions created using the [Tax API](https://docs.stripe.com/tax/standalone-tax-api.md). For transactions recorded using the Tax API, see [Using the tax transactions page](https://docs.stripe.com/tax/testing.md#tax-transactions-page).

After you complete a payment with automatic tax calculation enabled, you can review information about the tax calculation in the Dashboard.

1. Navigate to the [Transactions](https://dashboard.stripe.com/payments) page in the Dashboard.
2. Click a payment you created with Stripe Tax enabled.
3. Scroll down to the **Tax calculation** section.
![Tax calculation details on a payment in the Stripe Dashboard](https://b.stripecdn.com/docs-statics-srv/assets/automatic_tax_details.353a0264381ad5ed1db691922eb357b2.png)

The **Tax calculation** section of the payment details screen. Tax wasn’t applied to this transaction because there’s no registration for the tax location.

The **Taxability** field shows whether tax was collected for a given transaction or explains why no tax was applied. For more information about why Stripe Tax applies zero tax to some transactions, see [Zero tax amounts](https://docs.stripe.com/tax/zero-tax.md).

### Using the tax transactions page 

You can view all tax transactions for your account on the [Tax Transactions](https://dashboard.stripe.com/test/tax/transactions) page in the Dashboard. Click an individual transaction to see a detailed breakdown of calculated tax by jurisdiction, and by the individual products included in the transaction.
