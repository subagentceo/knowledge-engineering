# Subscriptions

Create subscriptions for your customers.

The Checkout Sessions API supports setting up a variety of pricing models, including flat-rate subscriptions, usage-based pricing, tiered pricing, and more.

1. First, create your [pricing model](https://docs.stripe.com/products-prices/pricing-models.md) using the [Products](https://docs.stripe.com/api/products.md) and [Prices](https://docs.stripe.com/api/prices.md) APIs.
1. Pass the Price in to [line_items.price](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-line_items-price) when you create the Checkout Session.
1. Make sure that [mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) is set to `subscription`.

[Build a subscriptions integration](https://docs.stripe.com/payments/checkout/build-subscriptions.md): Use the Checkout Sessions API to build your subscriptions integration.

[Configure free trials](https://docs.stripe.com/payments/checkout/free-trials.md): Delay payments on subscriptions using free trial periods.

[Limit customers to one subscription](https://docs.stripe.com/payments/checkout/limit-subscriptions.md): Direct customers to manage their subscription when they already have one.

[Set the billing cycle date](https://docs.stripe.com/payments/checkout/billing-cycle.md): Use Stripe Checkout to set a billing cycle date for subscriptions.
