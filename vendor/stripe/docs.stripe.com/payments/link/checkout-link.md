# Link with Checkout

Use Link with Stripe's prebuilt checkout page.

You can also use Link with [Payment Links](https://docs.stripe.com/payment-links.md).

Checkout is a [prebuilt payment form](https://docs.stripe.com/payments/checkout.md) that you can embed on your site or use as a Stripe-hosted payment page. Use Link with Checkout to allow your customers to securely save and reuse their payment information. For logged-in customers already using Link, it autofills this information regardless of whether they initially saved it on a different business’s checkout page.

Checkout supports Link with no additional fees, and the same [pricing](https://stripe.com/pricing) applies as for other card payments. For information about how your payment integration affects Link, see [Link in different payment integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md).
![Add Link to your prebuilt checkout page](https://b.stripecdn.com/docs-statics-srv/assets/link-in-checkout.2eb9f8d06da3dca74af9b81fa7524049.png)

Add Link to your prebuilt checkout page

## Before you begin

Build an integration to [accept a payment](https://docs.stripe.com/payments/accept-a-payment.md?integration=checkout) using Checkout.

## Enable Link in Checkout

Accept payments with Link using information your customer stores in the [Link app](https://link.com/). When you receive a payment from a customer using Link in Checkout, the `payment_method.type` listed for the payment is `link`. To add Link to your [Checkout integration](https://docs.stripe.com/payments/accept-a-payment.md?integration=checkout), create a Checkout Session with `link` as a payment method type.

#### Use dynamic payment methods

Use [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md) to increase conversion by showing the most relevant payment methods to your customers. If you collect card details for [future usage with Setup Intents](https://docs.stripe.com/payments/save-and-reuse.md), list payment methods manually instead of using dynamic payment methods.

To add Link as a payment method:

1. Enable the Link payment method from your [payment method settings](https://dashboard.stripe.com/settings/payment_methods).
2. If you have an existing integration that manually lists payment methods, remove the [payment_method_types](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_types) parameter from your integration.
![Preview of Link enabled as payment method in the Stripe Dashboard](https://b.stripecdn.com/docs-statics-srv/assets/enable-link-stripe-dashboard.1bd2411da48c323997c27a6dabee9b4c.png)

Link enabled as a payment method in the Stripe Dashboard

After you remove the `payment_method_types` parameter from your integration, some payment methods turn on automatically, including cards and wallets. The currency parameter restricts the payment methods that the customer sees during the checkout session.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

#### Manually list payment methods

When creating a new [Checkout Session](https://docs.stripe.com/api/checkout/sessions.md), you need to:

1. Add `link` to the list of `payment_method_types`.
2. Make sure `card` is also included in the list of `payment_method_types`.
3. Make sure all your `line_items` use the same currency.

#### Ruby

```ruby
client.v1.checkout.sessions.create({
  mode: 'payment',payment_method_types: ['card', 'link'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'T-shirt',
      },
      unit_amount: 2000,
    },
    quantity: 1,
  }],
  success_url: 'https://example.com/success',
})
```

## Test the integration

> Don’t store real user data in *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) Link accounts. Treat them as if they’re publicly available, because these test accounts are associated with your publishable key.

Currently, Link only works with credit cards, debit cards, and qualified US bank account purchases. Link requires [domain registration](https://docs.stripe.com/payments/payment-methods/pmd-registration.md).

You can create sandbox accounts for Link using any valid email address. The following table shows the fixed one-time passcode values that Stripe accepts for authenticating sandbox accounts:

| Value                               | Outcome                      |
| ----------------------------------- | ---------------------------- |
| Any other 6 digits not listed below | Success                      |
| 000001                              | Error, code invalid          |
| 000002                              | Error, code expired          |
| 000003                              | Error, max attempts exceeded |

### Multiple funding sources

As Stripe adds additional funding source support, you don’t need to update your integration. Stripe automatically supports them with the same transaction settlement time and guarantees as card and bank account payments.

## Link for Connect platforms 

Link is automatically available to any connected account that uses Checkout through a Connect platform integration.

- If you’re a Connect platform, you can manage Link for your platform account through [Link settings](https://dashboard.stripe.com/settings/link) in your Dashboard. Your connected accounts manage Link from within their own Dashboard settings.
- If you’re a connected account processing payments through a Connect platform, you can manage Link for both payments processed through a platform and payments processed without a platform in your Link settings in the Dashboard.

## Disable Link 

You can disable Link in the Stripe Dashboard [payment method settings](https://dashboard.stripe.com/settings/payment_methods). You must change the settings for Link individually for each [payment method configuration](https://docs.stripe.com/payments/payment-method-configurations.md).

After you disable Link for a payment method configuration, the change might take a few minutes to take effect on your website.

## See also

- [Stripe Checkout](https://docs.stripe.com/payments/checkout.md)
- [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works.md)
- [Quickstart](https://docs.stripe.com/checkout/quickstart.md)
