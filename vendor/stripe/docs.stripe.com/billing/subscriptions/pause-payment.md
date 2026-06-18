# Pause payment collection

Learn how to pause payment collection on subscriptions.

Pausing payment collection is often used to temporarily offer your services for free. This is sometimes referred to as a “grace period” if a customer needs additional time to pay or can’t pay for one or more billing periods.

## Pause subscription versus pause payment collection

Pausing payment collection keeps the subscription `active`, invoices still generate, and only collection pauses. Your customers keep access to the service while you pause collection.

[Pausing a subscription](https://docs.stripe.com/billing/subscriptions/pause.md) is different, because it stops both service and billing. The subscription moves to `paused` status, Stripe stops generating invoices, and your customer loses access to the subscription’s service for the duration of the pause.

|                              | Servicing is paused (customer loses service access) | Invoicing is paused | Payment collection is paused |
| ---------------------------- | --------------------------------------------------- | ------------------- | ---------------------------- |
| **Pause payment collection** | No                                                  | No                  | Yes                          |
| **Pause subscription**       | Yes                                                 | Yes                 | Yes                          |

You can pause or resume collection in the [Stripe Dashboard](https://support.stripe.com/questions/how-to-pause-or-cancel-subscriptions) or the API. While collection is paused, *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) still generate *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), but you have a few options for handling these invoices. Review the following use cases to determine the best approach for you:

| Use case                                                                                                                                                      | API configuration                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [Temporarily offer services for free and never collect payment](https://docs.stripe.com/billing/subscriptions/pause-payment.md#collect-payment-never)         | Use `behavior=void`               |
| [Temporarily offer services for free and collect payment later](https://docs.stripe.com/billing/subscriptions/pause-payment.md#collect-payment-later)         | Use `behavior=keep_as_draft`      |
| [Temporarily offer services for free and mark invoice as uncollectible](https://docs.stripe.com/billing/subscriptions/pause-payment.md#mark-as-uncollectible) | Use `behavior=mark_uncollectible` |

If these options don’t fit your use case, you might want to consider [canceling subscriptions](https://docs.stripe.com/billing/subscriptions/cancel.md) instead.

Invoices created before subscriptions are paused continue to be [retried](https://docs.stripe.com/invoicing/automatic-collection.md) unless you [void](https://docs.stripe.com/api/invoices/void.md) them.

## Temporarily offer services for free and never collect payment 

If you temporarily want to offer your services for free and you don’t want to collect payment on the invoice (for example, a “grace period”), you can void invoices that your subscription creates to make sure that your customers aren’t charged and the subscription remains `status=active`. Use the Subscription ID to update `pause_collection[behavior]` to `void` and `pause_collection[resumes_at]` to the date you want to start collecting payments again.

```curl
curl https://api.stripe.com/v1/subscriptions/{{SUBSCRIPTION_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "pause_collection[behavior]=void"
```

All invoices created before the `resumes_at` date are immediately marked as void. Stripe won’t send any upcoming invoice emails or webhooks and the subscription’s status remains unchanged.

If you don’t set a `resumes_at` date, the subscription remains paused until you unset `pause_collection`.

## Temporarily offer services for free and collect payment later 

If you want to temporarily offer your services for free and collect payments later, set `pause_collection[behavior]=keep_as_draft`. If you know when you want to resume collection, pass a timestamp for `resumes_at`.

```curl
curl https://api.stripe.com/v1/subscriptions/{{SUBSCRIPTION_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "pause_collection[behavior]=keep_as_draft"
```

All invoices created before the `resumes_at` date remain in `draft` status and `auto_advance` is set to `false`. During this time, Stripe won’t send any upcoming invoice emails or webhooks for these invoices and the subscription’s status remains unchanged.

If you don’t set a `resumes_at` date, the subscription remains paused until you unset `pause_collection`.

> If you have custom logic that finalizes invoices you might need to disable or modify it so that it doesn’t conflict with these settings.

When you’re ready to collect payment for these invoices, set `auto_advance` back to `true`. If you don’t have the invoice IDs, you can use Subscription IDs to check for invoices with `status=draft`. Using the invoice ID, you can then update `auto_advance=true`:

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d auto_advance=true
```

## Temporarily offer services for free and mark invoices as uncollectible 

If you temporarily want to offer your services for free and mark any invoices generated by the subscription as uncollectible, use the Subscription ID to update `pause_collection[behavior]` to `mark_uncollectible` and optionally `pause_collection[resumes_at]` to the date you want to start collecting payments again. This makes sure that any downstream reporting is accurate, your customer isn’t charged, and the subscription remains `status=active`.

```curl
curl https://api.stripe.com/v1/subscriptions/{{SUBSCRIPTION_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "pause_collection[behavior]=mark_uncollectible"
```

If you set `pause_collection[behavior]` to `mark_uncollectible`, we’ll stop active payment collection on new invoices the subscription creates before the `resumes_at` date. Stripe won’t send any upcoming invoice emails or webhooks for these invoices.

Despite this pause, Stripe applies any existing customer balance to invoices. This behavior helps use available funds before we mark an invoice as `uncollectible`. If the invoice’s `total` is paid off entirely using customer balance, then the invoice’s status is set to `paid`. Otherwise, the invoice’s status is set to `uncollectible`.

If you don’t set a `resumes_at` date, the payment collection on the subscription remains paused until you unset `pause_collection`.

## Manually unpausing 

To resume collecting payments at any time, you can update the subscription and unset `pause_collection`:

#### curl

```bash
curl https://api.stripe.com/v1/subscriptions/sub_GTbTiykEwMRog0 \
  -u <<YOUR_SECRET_KEY>>: \
  -d "pause_collection"= 
```

Resuming collection this way only affects future invoices.

## Pausing and subscription schedules 

If you pause a subscription on a [subscription schedule](https://docs.stripe.com/billing/subscriptions/subscription-schedules.md), the scheduled updates still take effect. However, payment isn’t collected while the subscription is paused. When you want to collect payment again, you need to [manually unpause](https://docs.stripe.com/billing/subscriptions/pause-payment.md#unpausing) the subscription. You also need to update `auto_advance` to `true` on any invoices with `status=draft` that you want to collect payment on.
