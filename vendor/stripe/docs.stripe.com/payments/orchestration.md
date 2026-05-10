# Orchestration

Create rules to route payments across your payment processors.

> #### Want access to Orchestration?
> 
> Orchestration is in private preview. 

## Route payments to multiple processors

Use Orchestration to route payments to multiple processors and monitor your payments performance.
[Get started](https://docs.stripe.com/payments/orchestration/route-payments.md)
## Features 

- **Process payments on multiple processors**: Update your [PaymentIntents integration](https://docs.stripe.com/payments/orchestration/route-payments.md) to route payments to any of the Stripe-supported processors, or automatically route payments created through Billing, Checkout, Payment Links, or the Dashboard.

- **Retry a payment on a different processor**: Configure rules to automatically [retry](https://docs.stripe.com/payments/orchestration/retries.md) failed payment transactions with alternative processors.

- **Monitor payments performance**: Analyze [payments performance](https://docs.stripe.com/payments/orchestration/route-payments.md#monitor-processor-performance) across each of your processors.

- **Handle post-transaction flows**: Use the [Dashboard](https://dashboard.stripe.com/payments) or the [Refunds](https://docs.stripe.com/api/refunds.md) API to create and manage refunds. For payments routed to third-party processors, those processors administer the refunds.

- **Test rules in a sandbox**: Use a [sandbox](https://docs.stripe.com/sandboxes.md) to test your rules before creating and activating them in your live account.

When using Orchestration, your third-party processor continues to act as the processor for payments routed to it. All related activity (including payment processing fees and liability for transaction losses) remain subject to the terms that you agreed to with that processor.

## Supported products 

You can use Orchestration with:

- [Payments](https://docs.stripe.com/payments/online-payments.md#compare-features-and-availability)
- [Billing](https://docs.stripe.com/billing.md)
- [Dashboard payments](https://dashboard.stripe.com/payments)

Orchestration [feature support](https://docs.stripe.com/payments/orchestration/feature-support.md) doesn’t include non-card payments or Link, Capital, Connect, Terminal, Organizations, Radar (for payments routed to third-party processors), or Sigma. If you’re interested in a feature and unsure whether Orchestration supports it, contact your Stripe representative. Orchestration also doesn’t support disputes or settlement-related activity. To manage these activities, access your third-party processor’s dashboard.
