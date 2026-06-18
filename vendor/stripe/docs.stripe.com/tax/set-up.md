# Set up Stripe Tax

Enable Stripe Tax to automatically calculate and collect tax.

To set up Stripe Tax, configure your tax settings through the Dashboard on the [tax settings page](https://dashboard.stripe.com/settings/tax). Alternatively, you can use the [Tax Settings API](https://docs.stripe.com/api/tax/settings.md). Depending on your integration, add [one line of code](https://docs.stripe.com/tax/set-up.md#integrate) to enable tax.

If you’re a platform that wants to set up Stripe Tax for your connected accounts that are responsible for collecting, filing, and reporting taxes, see [Tax for software platforms](https://docs.stripe.com/tax/tax-for-platforms.md).

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

## Get started with a video demo 

This short video shows you how to enable automatic tax collection through the Dashboard.
[Watch on YouTube](https://www.youtube.com/watch?v=PFzV64TjSmo)
## Set your head office address

Your head office is where your business is located or, if you sell physical goods, the address where you’re shipping goods from.

By default, we set your head office address to your Stripe business address so you only need to review and confirm that your details are correct on the [tax settings page](https://dashboard.stripe.com/settings/tax). Alternatively, you can [retrieve](https://docs.stripe.com/api/tax/settings/retrieve.md) and [update](https://docs.stripe.com/api/tax/settings/update.md) your head office address using the API.

## Select your preset tax code

A tax code is a classification of your product or service for Stripe Tax. We use this to make sure that the correct tax rate is applied to your transactions.

- **Preset product tax code:** The preset product tax code is the default tax code that applies to your [Products](https://docs.stripe.com/api/products/object.md) when you don’t explicitly specify a [tax_code](https://docs.stripe.com/api/products/object.md#product_object-tax_code). To learn more about the relationship between products, prices, and tax codes, and how they impact tax behavior, see the [products, prices, and tax codes](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md) documentation.

You must select the most appropriate product tax code for every product or service you sell. Visit the [tax settings page](https://dashboard.stripe.com/settings/tax) to select a preset product tax code to serve as the default. Afterwards, visit the [product catalogue](https://dashboard.stripe.com/products?active=true&has_tax_code=false) to confirm that the default is correct for your existing products. If not, edit each product to select a more appropriate product tax code for it.

If you sell physical goods and want to charge tax on the shipping fees, use the preset shipping tax code. This code determines the appropriate [tax treatment](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#shipping-tax-code) for shipping fees, aligning with state and country-specific regulations. It makes sure the correct tax treatment is applied, as shipping fees might be taxed differently than the products themselves.

## Select whether prices include tax by default

Tax behavior is a setting that determines whether Stripe should add taxes on top of your price, or if the price already includes taxes. This ensures that taxes don’t affect the total amount charged to your customers.

To calculate the total amount, Stripe needs to know the tax behavior of each price in the transaction. The default tax behavior is the default setting that applies when you don’t explicitly specify the [tax_behavior](https://docs.stripe.com/api/prices/object.md#price_object-tax_behavior) on a [Price object](https://docs.stripe.com/api/prices.md).

You have three options:

- **Exclusive:** You want to exclude tax from prices so that you add tax on top.
- **Inclusive:** You want to include tax in prices so that tax doesn’t affect the total.
- **Automatic:** You want to use the [currency](https://docs.stripe.com/api/prices/object.md#price_object-currency) of prices to let Stripe decide whether to include or exclude tax. Stripe excludes tax from prices in USD and CAD, but includes it in prices for all other currencies.

Learn about [tax behavior for products and prices](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior).

## Add registrations

Before you start collecting tax from your customers, you must [register](https://docs.stripe.com/tax/registering.md) with the local tax authority. A [tax registration](https://docs.stripe.com/api/tax/registrations.md) lets Stripe know that your business is registered to collect tax on payments within a region, enabling you to automatically collect tax. Our [monitoring tool in the Dashboard](https://dashboard.stripe.com/tax/transactions) helps you understand where you might need to register with the local tax authority.

Visit [Locations](https://dashboard.stripe.com/tax/locations) tab in the Dashboard to add your tax registrations. If you haven’t registered yet but are planning to do so, you can also schedule a tax registration to take effect at a date in the future. You can also use [Stripe to register](https://docs.stripe.com/tax/use-stripe-to-register.md) on your behalf. Additionally, you also can [use Taxually to register](https://docs.stripe.com/tax/use-taxually-to-register.md) in locations outside the US.

## Enable Tax in your Stripe integration or use the Stripe Tax API

The final step in setting up Stripe Tax is to enable automatic tax on your Stripe integration. Here’s how:

#### No-code

After you click **Get started**, Stripe Tax is automatically enabled for new transactions that you create in the Dashboard. To disable it, go to the [tax settings](https://dashboard.stripe.com/settings/tax/integrations) page.

| Integration                                                          | Definition                                                                                                                                                           |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Invoicing](https://docs.stripe.com/tax/invoicing.md)                | Automatically calculate tax on your invoices using the Dashboard without any code.                                                                                   |
| [Subscriptions](https://docs.stripe.com/tax/subscriptions/update.md) | Calculate the tax to collect on your recurring payments when using Stripe Billing.                                                                                   |
| [Payment Links](https://docs.stripe.com/tax/payment-links.md)        | Use Stripe Tax with Payment Links to automatically calculate and collect tax on a payment page and share a link to it with your customers, without writing any code. |

#### Low-code

If you’re creating [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions.md), [Subscriptions](https://docs.stripe.com/api/subscriptions.md), or [Invoices](https://docs.stripe.com/api/invoices.md) with the API, you need to add `automatic_tax[enabled]=true` to your integration. Read our guides for more information:

| Integration                                                                | Definition                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Invoicing](https://docs.stripe.com/tax/invoicing.md?dashboard-or-api=api) | Automatically calculate tax on your invoices by adding as little as one line of code                                                                                                                                                                                                                              |
| [Subscriptions](https://docs.stripe.com/tax/subscriptions.md)              | Calculate the tax to collect on your recurring payments when using Stripe Billing.                                                                                                                                                                                                                                |
| [Checkout](https://docs.stripe.com/tax/checkout.md)                        | Automatically calculate taxes on all purchases and subscriptions accumulated during a Checkout session. To get started, use our quickstart for Checkout Sessions that are [Stripe-hosted](https://docs.stripe.com/checkout/quickstart.md) or [embedded](https://docs.stripe.com/checkout/embedded/quickstart.md). |
| [Custom flows](https://docs.stripe.com/tax/payment-intent/custom.md)       | Use Tax with [PaymentIntents](https://docs.stripe.com/api/payment_intents.md), or collect tax on payments collected outside of Stripe. To get started, use our quickstart for [custom payment flows](https://docs.stripe.com/payments/quickstart.md).                                                             |

### Update existing recurring items

Enabling tax and configuring automatic collection in your integration doesn’t update your existing subscription, invoice, and payment link instances. You must update them separately to begin calculating and collecting tax. You can complete these updates in the Dashboard or by setting `automatic_tax[enabled]=false` in the respective APIs:

- Subscriptions [Dashboard](https://dashboard.stripe.com/subscriptions) or [API](https://docs.stripe.com/api/subscriptions/update.md#update_subscription-automatic_tax-enabled)
- Payment links [Dashboard](https://dashboard.stripe.com/payment-links) or [API](https://docs.stripe.com/api/payment-link/update.md#update_payment_link-automatic_tax-enabled)
- Invoices [Dashboard](https://dashboard.stripe.com/invoices) or [API](https://docs.stripe.com/api/invoices/update.md#update_invoice-automatic_tax-enabled)

## Set up filing

After you add your registrations and start collecting tax, you can set up filing to automatically submit returns and remit tax in the regions where you’re registered. Stripe can help you file automatically in 90+ countries and all US states.

For US filings: [Use Stripe, powered by TaxJar](https://docs.stripe.com/tax/file-with-stripe.md)

For filings in other countries: [Use Taxually](https://docs.stripe.com/tax/file-with-taxually.md)

Automated filing can help you:

- Prepare and submit returns automatically
- Receive email notifications and reminders to review your scheduled returns
- Track the status of each filing and payment
- View copies of your completed filings
- Find other [filing options](https://docs.stripe.com/tax/filing.md#filing-with-stripe).

## Disable tax collection

To stop calculating and collecting tax in your payments integrations:

1. Turn off automatic tax calculation in the [Tax](https://dashboard.stripe.com/settings/tax) page in the Dashboard.
2. Remove active tax registrations in the [Dashboard](https://dashboard.stripe.com/tax/locations).
3. Edit existing recurring integrations, such as:

- [Subscriptions](https://dashboard.stripe.com/subscriptions)
- [Payment links](https://dashboard.stripe.com/payment-links)
- [Invoices](https://dashboard.stripe.com/invoices): You can also set `automatic_tax[enabled]=false` in the [subscriptions](https://docs.stripe.com/api/subscriptions/update.md#update_subscription-automatic_tax-enabled), [payment-links](https://docs.stripe.com/api/payment-link/update.md#update_payment_link-automatic_tax-enabled), or [invoices](https://docs.stripe.com/api/invoices/update.md#update_invoice-automatic_tax-enabled) APIs instead of the Dashboard.
