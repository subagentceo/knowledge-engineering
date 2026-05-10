# The Setup Intents API

Learn more about the Setup Intents API for saving payment methods.

Use the *Setup Intents API* (The Setup Intents API lets you build dynamic flows for collecting payment method details for future payments. It tracks the lifecycle of a payment setup flow and can trigger additional authentication steps if required by law or by the payment method) to set up a payment method for future payments. It’s similar to a payment, but no charge is created. [Set up a payment method for future payments now](https://docs.stripe.com/payments/save-and-reuse.md).

The goal is to have payment credentials saved and optimized for future payments, meaning the payment method is configured correctly for any scenario. When setting up a card, for example, it may be necessary to authenticate the customer or check the card’s validity with the customer’s bank. Stripe updates the `SetupIntent` object throughout that process.

## Saving and reusing payment methods

The Setup Intents API is useful for businesses that onboard customers but don’t charge them right away:

- A car rental company that collects payment method details before the customer rents the car and charges the card after the rental period ends
- A crowdfunding website that collects card details to be charged later, only if the campaign reaches a certain amount
- A utility company that charges a different amount each month based on usage but collects SEPA payment details before the first month’s payment

> You can also set up payment methods for future use when you do charge them during [Checkout](https://docs.stripe.com/payments/save-and-reuse.md?platform=checkout).

#### Get started

- [Save cards without making an initial payment](https://docs.stripe.com/payments/save-and-reuse.md)
- [Save bank details for SEPA Direct Debit payments](https://docs.stripe.com/payments/sepa-debit/set-up-payment.md)
- [Save bank details for BECS Direct Debit payments](https://docs.stripe.com/payments/au-becs-debit/set-up-payment.md)

## Get permission to save a payment method 

You’re responsible for your compliance with all applicable laws, regulations, and network rules when saving a customer’s payment details.

### Future on-session use

If you set up a payment method for future *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) payments, such as displaying the payment method on a future checkout page, you must explicitly collect consent from the customer for this specific use. For example, include a “Save my payment method for future use” checkbox to collect consent.

If you need to differentiate between payment methods saved only for offline usages and payment methods you can present to your customer for future *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) purchases, you can utilize the [allow_redisplay](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-allow_redisplay) parameter on the PaymentMethod object.

### Future off-session use

If you set up a payment method for future *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information) payments, you need permission. Creating an agreement (sometimes called a *mandate*) up front allows you to charge the customer when they’re not actively using your website or app.

Add terms to your website or app that state how you plan to process payments, and let customers opt in. At a minimum, ensure that your terms cover the following:

- The customer’s permission to your initiating a payment or a series of payments on their behalf
- The anticipated frequency of payments (that is, one-time or recurring)
- How the payment amount will be determined

See recommended mandate text for [saving cards](https://docs.stripe.com/payments/save-and-reuse.md?platform=web&ui=elements#collect-payment-details) or [saving SEPA bank details](https://docs.stripe.com/payments/sepa-debit/set-up-payment.md).

For users impacted by *SCA* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase), this agreement helps payments succeed without interruption. When you set up your integration to properly save a card, Stripe marks any subsequent off-session payment as a *merchant-initiated transaction* (A payment made off-session with a properly authenticated saved card, can qualify as merchant-initiated transaction and be exempt from SCA) (MIT) so that your customers don’t have to come back online and authenticate. Merchant-initiated transactions require an agreement between you and your customer.

## Specify usage to increase success rate

The [usage](https://docs.stripe.com/api/setup_intents/object.md#setup_intent_object-usage) parameter tells Stripe how you plan to use payment method details later. For some payment methods, Stripe can use your `usage` setting to pick the most frictionless flow for the customer. This optimization is designed to increase the number of successful payments.

For example, credit and debit cards under European *SCA* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase) regulation may require the customer to authenticate the card during the saving process. Setting `usage` to `off_session` properly authenticates a credit or debit card for off-session payments so that your customer doesn’t have to come back online and re-authenticate. So although it creates initial friction in the setup flow, setting `usage` to `off_session` can reduce customer intervention in later off-session payments.

However, if you only plan to use the card when the customer is checking out, set `usage` to `on_session`. This lets the bank know you plan to use the card when the customer is available to authenticate, so you can postpone authenticating the card details until then and avoid upfront friction.

| How you intend to use the card                                                                                                                                                  | usage enum value to use |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| *On-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) payments only | `on_session`            |
| *Off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information) payments only | `off_session` (default) |
| Both on and off-session payments                                                                                                                                                | `off_session` (default) |

`Usage` is an optimization. You can still use a card that’s set up for on-session payments to make off-session payments, but banks are more likely to reject the off-session payment and require authentication from the customer. Either case might still require later authentication, so [build a recovery process](https://docs.stripe.com/billing/revenue-recovery.md) in your app. When an off-session card payment requires authentication, bring your customer back online to complete the payment.

If not specified, `usage` defaults to `off_session`. See how to create a SetupIntent on your server and specify the `usage`:

```curl
curl https://api.stripe.com/v1/setup_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d usage=on_session
```

> Follow the guidance on this page to ensure your integration handles cards that require *Strong Customer Authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase). Correctly flagging transactions allows Stripe to claim correct SCA exemptions on your behalf to minimize the need for authentication with each payment.
