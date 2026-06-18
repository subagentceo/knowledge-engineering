# Subscriptions

Subscriptions allow you to charge a customer on a recurring basis.

Related guide: [Creating subscriptions](https://docs.stripe.com/docs/billing/subscriptions/creating.md)

## Endpoints

### Create a subscription

- [POST /v1/subscriptions](https://docs.stripe.com/api/subscriptions/create.md)

### Update a subscription

- [POST /v1/subscriptions/:id](https://docs.stripe.com/api/subscriptions/update.md)

### Retrieve a subscription

- [GET /v1/subscriptions/:id](https://docs.stripe.com/api/subscriptions/retrieve.md)

### List subscriptions

- [GET /v1/subscriptions](https://docs.stripe.com/api/subscriptions/list.md)

### Cancel a subscription

- [DELETE /v1/subscriptions/:id](https://docs.stripe.com/api/subscriptions/cancel.md)

### Migrate a subscription

- [POST /v1/subscriptions/:id/migrate](https://docs.stripe.com/api/subscriptions/migrate.md)

### Resume a subscription

- [POST /v1/subscriptions/:id/resume](https://docs.stripe.com/api/subscriptions/resume.md)

### Search subscriptions

- [GET /v1/subscriptions/search](https://docs.stripe.com/api/subscriptions/search.md)

## Events

- `customer.subscription.created`
Occurs whenever a customer is signed up for a new plan.

- `customer.subscription.deleted`
Occurs whenever a customer’s subscription ends.

- `customer.subscription.paused`
Occurs whenever a customer’s subscription is paused. Only applies when subscriptions enter `status=paused`, not when [payment collection](https://docs.stripe.com/billing/subscriptions/pause.md) is paused.

- `customer.subscription.pending_update_applied`
Occurs whenever a customer’s subscription’s pending update is applied, and the subscription is updated.

- `customer.subscription.pending_update_expired`
Occurs whenever a customer’s subscription’s pending update expires before the related invoice is paid.

- `customer.subscription.resumed`
Occurs whenever a customer’s subscription is no longer paused. Only applies when a `status=paused` subscription is [resumed](https://docs.stripe.com/api/subscriptions/resume.md), not when [payment collection](https://docs.stripe.com/billing/subscriptions/pause.md) is resumed.

- `customer.subscription.trial_will_end`
Occurs three days before a subscription’s trial period is scheduled to end, or immediately when a trial is ended early (for example, with `trial_end=now` or when a Customer Portal plan change ends a trial). If a trial is shortened so that fewer than three days remain, this event can fire immediately, including during the same transaction that collects payment. Before sending payment-reminder communications from this webhook, check the subscription status and latest invoice to determine whether payment has already been collected.

- `customer.subscription.updated`
Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).
