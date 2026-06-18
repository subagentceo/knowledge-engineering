# Set payment methods per-subscription

Learn how to specify which payment methods are available for a subscription.

The subscription [payment_settings](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-payment_settings) parameter lets you set specific payment methods on individual subscriptions. This allows more flexibility than a single `default_payment_method` or less granular customer settings.

To enable payment methods, you first need to activate them in your [account settings](https://dashboard.stripe.com/settings/payment_methods) in the Stripe Dashboard.

In some situations, there might be restrictions that prevent certain payment methods from being used for a subscription. For example, a payment method might only operate in one currency, or have limitations on the amount that a customer can pay. Stripe doesn’t automatically select a payment method if limitations prevent it from being used. Learn more about [payment method support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#product-support).

## Manually select payment methods 

You can override the payment methods that a customer can use to pay a subscription by changing its [payment settings](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-payment_settings).

```curl
curl https://api.stripe.com/v1/subscriptions/sub_49ty4767H20z6a \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "payment_settings[payment_method_types][]=card" \
  -d "payment_settings[payment_method_types][]=customer_balance"
```

If you configured a default payment method on either the customer (represented as a customer-configured [Account](https://docs.stripe.com/api/v2/core/accounts/update.md#v2_update_accounts-response-configuration-customer-billing-default_payment_method) or a [Customer](https://docs.stripe.com/api/customers/object.md#customer_object-invoice_settings-default_payment_method)) or the [Subscription](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-default_payment_method), include it in the list of `payment_method_types`. Otherwise, that method won’t be used and payment might fail.

## Payment method priority 

By default, customers can pay a subscription’s generated *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) with any of the enabled payment methods in your [Invoice default payment method configuration](https://dashboard.stripe.com/settings/billing/invoice). This takes precedence over the older [default_source](https://docs.stripe.com/api/customers/object.md#customer_object-default_source) customer setting.

If set, a subscription’s `payment_settings.payment_method_types` takes priority over default invoice settings, but only for that specific subscription. Payment method types are passed onto the subscription’s [setup intent](https://docs.stripe.com/api/setup_intents.md) and invoices.

You can further specify a subscription’s `default_payment_method`, or the older `default_source`, to prioritize which payment method is attempted.

If you enable **Save customer payment information** in the Dashboard invoice settings or the [save_default_payment_method](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-payment_settings-save_default_payment_method) parameter of the `Subscription`, any payment method the customer uses to pay the invoice becomes the new default.

## Enable customers to update their payment method 

From the Dashboard, you can generate single-use links that let customers update the payment method on an automatically billed subscription.

You can generate an update link from two places:

- On the **Subscription details** page for the subscription, click the **Actions** menu and select **Share payment update link**.
- On the [Subscriptions page](https://dashboard.stripe.com/subscriptions), find the subscription and click its overflow menu (⋯), then select **Share payment update link**.

In the **Share payment update link** dialog, you can email the link directly to the customer or copy it to share another way. You can also deactivate all of the subscription’s existing payment update links.

You can generate links only for subscriptions that have Billing set to `Auto`. The menu item doesn’t appear for subscriptions with Billing set to `Send`.

Subscription payment update links have the following restrictions:

- A link can only update the payment method on the associated subscription, and can’t change the customer’s default payment method.
- The subscription’s status must be `active`, `past_due`, or `trialing`. It can’t be `unpaid` or ended.
- The new payment method must be a card.
- Each link only allows a customer to update their payment details one time.
- If unused, a link expires after 30 days.

## Payment method errors 

Payment method errors can prevent a subscription from being created. This can happen when:

- You manually select a payment method but a restriction, such as supported currencies, prevents it from being used.
- A payment method isn’t activated for your account

Errors can also occur at time of payment, and Stripe can’t finalize the invoice. See invoicing [payment method errors](https://docs.stripe.com/invoicing/payment-methods.md#payment-method-errors) for details.

## Payment method options  

Some payment methods have additional options that you can set to customize how a customer pays. See the [payment method options](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-payment_settings) documentation for details.
