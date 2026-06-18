# Link in different payment integrations

Use Link with dynamic payment methods and other integrations.

To use Link, you must enable it under **Wallets** in your [payment method settings](https://dashboard.stripe.com/settings/payment_methods) and integrate it appropriately for your use case. After you’ve enabled and integrated it, Stripe automatically displays Link to your customers for eligible transactions. All Link transactions confirm immediately, and successful payments settle to your Stripe balance on the same timeline as card payments, regardless of the payment method that funds the payment.

You can integrate Link in two ways:

- [As a payment method](https://docs.stripe.com/payments/link/link-payment-integrations.md?link-integrations=link-payment-method): Recommended. This integration works with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md) and in most cases requires no additional configuration.
- [Within a card-specific integration](https://docs.stripe.com/payments/link/link-payment-integrations.md?link-integrations=link-card-integrations): Use this integration type instead if you only accept card payments, or if you require access to card details such as the brand or last 4 digits.

Both Link integrations accept all types of payment methods supported by Link, including credit cards, debit cards, [Instant Bank Payments](https://docs.stripe.com/payments/link/instant-bank-payments.md), and [Klarna](https://docs.stripe.com/payments/link/klarna.md).

## Link integrations 

#### Link as a payment method

All Link transactions have a [PaymentMethod object](https://docs.stripe.com/api/payment_methods/object.md) with a [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type) of `link`.

To integrate Link as a payment method, use [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md) or pass `link` in the `payment_method_types` parameter. Because all Link transactions use the `link` payment method type, the objects associated with them don’t expose details about how the customer paid. If you require access to card details, such as the brand or last 4 digits, integrate with Link as described in the [Link with card integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md?link-integrations=link-card-integrations) tab.

This integration increases Link authorization rates by letting customers select a backup payment source. At checkout, if the customer’s Link account contains multiple eligible saved payment sources, Link suggests a backup. If the customer approves the backup, and the initial payment attempt fails, Link automatically retries the payment using the backup.

> Link as a payment method doesn’t support [Interchange+ (IC+) pricing](https://support.stripe.com/questions/understanding-blended-interchange-pricing). Stripe bills all such Link transactions at a single blended rate. If you’re on IC+ pricing, integrate with Link as described in the [Link with card integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md?link-integrations=link-card-integrations) tab.

#### Link with card integrations

All Link transactions have a [PaymentMethod object](https://docs.stripe.com/api/payment_methods/object.md) with a [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type) of `card` and a [wallet type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-card-wallet-type) of `link`. For Link transactions using a credit or debit card, the associated objects include the same card details as for other card payments, such as the brand and last 4 digits. Your integration can handle them the same way it handles other card payments, which aren’t affected by including Link.

To include Link in a card integration, pass `card` in the `payment_method_types` parameter.

> Passing `link` in the `payment_method_types` parameter always treats Link as a payment method, even if you also pass `card`. If you want to handle Link payments as card payments, don’t pass `link` in `payment_method_types`.

Non-card Link payments, such as Instant Bank Payments, function similarly to card payments. The associated `PaymentMethod` objects have a [type](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-type)of `card` and a [card brand](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-card-brand) of `link`. Because non-card payment methods don’t have concepts like expiration dates or card networks, Stripe assigns fixed values to certain API object properties that card payment methods normally include. For example:

- Brand is `link`
- Available card networks include only `link`
- Last 4 digits are `0000`
- Expiration date is `12/2040`
- Funding is `unknown`
- Display brand is `other`
- All check results are null

The following example shows a [Payment Method](https://docs.stripe.com/api/payment_methods.md) for a saved non-card payment method, highlighting the fixed values:

```json
{
  "id": "pm_12HA3WGPaV5rx8y34duNXgUp",
  "object": "payment_method",
  "type": "card",
  "card": {"brand": "link",
    "display_brand": "other",
    "exp_month": 12,
    "exp_year": 2040,
    "funding": "unknown",
    "last4": "0000",
    "checks": {
      "address_line1_check": null,
      "address_postal_code_check": null,
      "cvc_check": null
    },
    "country": "US",
    "networks": {"available": ["link"],
      "preferred": null
    },
    "generated_from": null,
    "three_d_secure_usage": {
      "supported": false
    },
    "wallet": {
      "dynamic_last4": null,
      "link": {},
      "type": "link"
    }
  },
  ...
}
```

If your customer interface renders card details, Stripe recommends identifying non-card payments as Link payments instead of rendering the fixed values.

When you include Link in a card integration, it doesn’t let customers select a backup payment source during checkout.

If you want to process all Link transactions representing Link as a distinct payment method, integrate with Link as described in the [Link as a payment method](https://docs.stripe.com/payments/link/link-payment-integrations.md?link-integrations=link-payment-method) tab.
