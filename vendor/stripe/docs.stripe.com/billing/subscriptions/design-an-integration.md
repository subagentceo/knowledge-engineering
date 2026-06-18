# Design a subscriptions integration

Learn about the configuration options for a subscriptions integration.

Use this guide to learn the different ways to build your subscriptions integration, and follow the links to in-depth, step-by-step guides. You’ll need to consider the following:

- [How you want to charge customers](https://docs.stripe.com/billing/subscriptions/design-an-integration.md#pricing-model)
- [How you want your customers to check out and provide their payment information](https://docs.stripe.com/billing/subscriptions/design-an-integration.md#checkout-options)
- [When you want customers to pay for the subscription](https://docs.stripe.com/billing/subscriptions/design-an-integration.md#select-billing-model)

## Decide how you want to charge customers 

Compare the following pricing models and determine how you want to charge your customers for the subscription to your product or service:

- **Flat rate**: Charge customers a flat rate for the service tier they choose.
- **Per-seat**: Charge customers for each pricing unit, which represents one user or seat.
- **Tiered**: Charge customers a varied amount for each pricing unit (such as a user or seat), based on quantity or usage.
- **Usage-based**: Charge customers based on their usage of your product or service.

| Pricing model   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Flat rate**   | In the following example, you offer three different service levels: basic, starter, and enterprise. For each service level, you specify a monthly and yearly price.
![An example of the flat rate pricing model that shows three service levels.](https://b.stripecdn.com/docs-statics-srv/assets/pricing_model-flat-rate.e99989aa8c2abe76edd607462840776e.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Per-seat**    | In the following example, you offer a per-seat plan for software licenses. For each user, you charge a specific amount for their license.
![An example of the per-seat pricing model that shows a per-seat plan for software licenses.](https://b.stripecdn.com/docs-statics-srv/assets/pricing_model-per-seat.8ed5ad9243ad6ae1c38b072cbb4ce07a.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Tiered**      | **Volume-based pricing**: You multiply the quantity by the unit cost of the tier that corresponds to the usage at the end of the period.

  **Graduated pricing**: You multiply the usage for each tier used during the period and then sum the totals for each tier. This differs from volume-based pricing, which only uses the tier from the end of the period.

  In the following example, you offer lower rates for customers who use more projects per month, with tiers that you can adjust based on volume or graduated pricing.

|             | Number of projects | Price per tier |
| ----------- | ------------------ | -------------- |
| First tier  | 1-5                | 7 USD          |
| Second tier | 6-10               | 6.50 USD       |
| Third tier  | 11+                | 6 USD          |                                                                                                                                                                                                                                                                                                                              |
| **Usage-based** | **Fixed fee and overage pricing**: You charge a flat fee per month for your product or service. The flat fee has some included usage entitlement, and you charge any additional usage (overage) at the end of the period.

  **Pay as you go pricing**: You charge for usage tracked over a specific period. You can use any of the following pricing: per unit, per package, volume-based, or graduated.

  **Credit burndown pricing**: You collect prepayment for your usage-based product or service, and allow customers to apply [billing credits](https://docs.stripe.com/billing/subscriptions/usage-based/billing-credits.md) as they use your product or service.

  In the following example, you charge a flat rate per month for your service that includes a set number of tokens. You charge any usage above the included tokens at an additional rate per token.

|             | First unit | Last unit | Per unit  | Flat rate |
| ----------- | ---------- | --------- | --------- | --------- |
| First tier  | 0          | 100,000   | 0.001 USD | 1.00 USD  |
| Second tier | 100,001    | ∞         | 0.002 USD | 2.00 USD  | |

## Decide how customers check out 

Compare the following checkout interfaces and determine how you want your customers to provide their payment information for the subscription to your product or service.

| Interface                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Example                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Stripe-hosted page**       | Use a [payment page](https://docs.stripe.com/checkout/quickstart.md) that’s prebuilt and hosted by Stripe.

  Benefits:

  - Stripe handles payment method collection and validation.
  - Stripe automatically starts the subscription process.

  UI customization: 20 preset fonts, 3 preset border radiuses, custom background and border color, and custom logo                                                                                                                                                                                                                                                                        | ![](https://b.stripecdn.com/docs-statics-srv/assets/checkout-subs-preview.d409ee79bf1f3280b9dfd3968b314c21.png)            |
| **Embedded payment page**    | Embed a [payment page](https://docs.stripe.com/checkout/embedded/quickstart.md) that’s prebuilt and hosted by Stripe directly into your site.

  Benefits:

  - Stripe handles payment method collection and validation.
  - Stripe automatically starts the subscription process.

  UI customization: 20 preset fonts, 3 preset border radiuses, custom background and border color, and custom logo                                                                                                                                                                                                                                     | ![](https://b.stripecdn.com/docs-statics-srv/assets/embedded-checkout-form-preview.23a56550b7d522d8437b2beac672410f.png)   |
| **Custom payment form**      | Build a [custom payment form](https://docs.stripe.com/payments/advanced.md) using UI components that you can integrate on your website.

  Benefits:

  - Combines Stripe Elements with the front end of your web app.
  - Allows you to customize the Payment Element layout to fit your checkout flow.

  UI customization: Customize the look and feel of the payment form with the [Appearance API](https://docs.stripe.com/elements/appearance-api.md).                                                                                                                                                                               | ![](https://b.stripecdn.com/docs-statics-srv/assets/appearance_example.e076cc750983bf552baf26c305e7fc90.png)               |
| **Pricing table**            | Embed a [pricing table](https://docs.stripe.com/payments/checkout/pricing-table.md) on your website to show pricing information for subscriptions.

  Benefits:

  - Displays a range of pricing options.
  - Redirects to a Stripe-hosted payment page for the checkout flow.

  UI customization: Customize the button layout, text, and appearance.                                                                                                                                                                                                                                                                                     | ![](https://b.stripecdn.com/docs-statics-srv/assets/pricing-table-embed.b27a06fcd84b57a8866a8b4b62323fdc.png)              |
| **One-click payment button** | Accept payments through [one-click payment buttons](https://docs.stripe.com/elements/express-checkout-element/accept-a-payment.md) for various payment methods.

  Benefits:

  - Allows you to add payment buttons without any front-end changes.
  - Dynamically sorts payment buttons based on a customer’s location.
  - Supports the following payment methods: Link, Apple Pay, Google Pay, PayPal, Klarna, and Amazon Pay.

  UI customization: Customize the button layout, text, and appearance.                                                                                                                                  | ![](https://b.stripecdn.com/docs-statics-srv/assets/link-in-express-checkout-element.67be6745e5a37c1c09074b0f43763cff.png) |
| **Payment link**             | Create a [payment link](https://docs.stripe.com/payment-links/create.md) that you can share directly with customers. When customers click the payment link, they’re redirected to a Stripe-hosted payment page.1

  Benefits:

  - Allows you to accept payments using a payment link that you can share as many times as you want.

  - Uses your customer’s preferred browser language.

  - Supports more than 20 payment methods, including credit and debit cards, Apple Pay, and Google Pay.

  - Allows you to customize the UI with 20 preset fonts, 3 preset border radiuses, custom background and border color, and custom logo | ![](https://b.stripecdn.com/docs-statics-srv/assets/payment-link.4f7ea42c63046f6714ffe620059f1a3c.png)                     |
| **Mobile app**               | Use a payment form that’s prebuilt and hosted by Stripe [in your mobile app](https://docs.stripe.com/payments/mobile.md).

  Benefits:

  - Allows you to use a prebuilt sheet or a customizable drop-in component on any screen in your app.
  - Supports wallet payments, such as Apple Pay, Google Pay, and Link.

  UI customization: Customize the look and feel of the payment form with the [Appearance API](https://docs.stripe.com/elements/appearance-api.md).                                                                                                                                                                   | ![](https://b.stripecdn.com/docs-statics-srv/assets/ios-landing.35eb3fe43605b2b982353f4bdac95840.png)                      |

1Payment links aren’t supported for usage-based billing.

## Decide when you want customers to pay 

Compare the following models and determine when you want your customers to pay for the subscription to your product or service.

| Billing model    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pay up front** | Require that your customers pay before you provide access to your product or service.

  A typical flow looks like this:

  1. Your customer chooses their subscription plan.
  2. You collect payment information.
  3. You provision access to your product or service.
  4. You continue to provision access to the customer throughout the subscription lifecycle.
  5. After the initial charge, you continue to charge the customer the same fixed price for the same service at regular periods. |
| **Free trial**   | Offer your customers a free trial period for your product or service before billing them.

  A typical flow looks like this:

  1. Your customer chooses their subscription plan.
  2. You collect payment information, but don’t charge the customer.
  3. You provision access to your product or service for a limited time.
  4. When the trial ends, a new billing period starts.
  5. Stripe generates an invoice with the price you defined for your service.                                    |
| **Freemium**     | Allow customers access to your product or service without requesting payment information.

  A typical flow looks like this:

  1. Your customer chooses their subscription plan.
  2. You provision access to your product or service for a limited time.
  3. Before the trial ends, you collect payment information.
  4. When the trial ends, a new billing period starts.
  5. Stripe generates an invoice with the price you defined for your service.                                            |

## Build your subscriptions integration

| Pricing model                  | Checkout interface                         | Billing model | Use case                                                                                                                                                                                                                                                                                          | Instructions                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flat rate                      | Payment page or embedded form              | Free trial    | You want to offer a free trial period for your subscription and collect a payment method to use after the trial ends. Use either a Stripe-hosted page, a Stripe-hosted payment form that’s embedded in your checkout flow, or your custom payment form.                                           | Start a free trial period using a [Stripe-hosted page](https://docs.stripe.com/payments/checkout/free-trials.md?payment-ui=stripe-hosted), an [embedded payment page](https://docs.stripe.com/payments/checkout/free-trials.md?payment-ui=embedded-page), or a [custom payment form](https://docs.stripe.com/payments/checkout/free-trials.md?payment-ui=embedded-components)                                       |
| Usage-based                    | Payment page, embedded form, or mobile app |               | You want to charge customers based on their usage of your product or service. Collect payment information using either a Stripe-hosted page, a Stripe-hosted payment form that’s embedded in your checkout flow, your custom payment form, or a payment form in your mobile app.                  | [Set up usage-based billing](https://docs.stripe.com/billing/usage-based.md)                                                                                                                                                                                                                                                                                                                                        |
| Flat rate, per-seat, or tiered | Pricing table                              | Free trial    | You want to display different subscription pricing levels in a pricing table that’s embedded on your website. You can offer a flat rate, per-seat or tiered pricing, or a free trial. After choosing a pricing level, customers can provide their payment information in a prebuilt payment form. | Create and [embed a pricing table](https://docs.stripe.com/payments/checkout/pricing-table.md) on your website                                                                                                                                                                                                                                                                                                      |
| Flat rate                      | Payment link                               | Pay up front  | You want to sell subscriptions for a flat rate, and collect payment information using a payment link that you share with your customers. The payment link redirects to a Stripe-hosted payment page.2                                                                                             | [Create your subscription](https://docs.stripe.com/no-code/subscriptions.md) and then [create a payment link](https://docs.stripe.com/payment-links/create.md?pricing-model=standard) for your subscription                                                                                                                                                                                                         |
| Flat rate                      | Mobile app                                 | Pay up front  | You want to sell subscriptions for a flat rate. Collect payment information using a custom payment form that’s embedded in your mobile app.                                                                                                                                                       | Create and embed a payment form in your [iOS app](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=mobile&platform=ios), [Android app](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=mobile&platform=android), or [React Native app](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=mobile&platform=react-native) |
| Flat rate                      | One-click payment buttons                  | Pay up front  | You want to sell subscriptions for a flat rate. Collect payment information using one-click payment buttons on either a Stripe-hosted payment page, a Stripe-hosted payment form that’s embedded in your checkout flow, or your custom payment form.                                              | [Add one-click payment buttons](https://docs.stripe.com/elements/express-checkout-element/accept-a-payment.md) on your checkout page                                                                                                                                                                                                                                                                                |

2Payment links aren’t supported for usage-based billing.
