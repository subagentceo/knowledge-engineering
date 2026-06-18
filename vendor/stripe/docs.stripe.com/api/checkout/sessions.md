# Checkout Sessions

A Checkout Session represents your customer’s session as they pay for one-time purchases or subscriptions through [Checkout](https://docs.stripe.com/docs/payments/checkout.md) or [Payment Links](https://docs.stripe.com/docs/payments/payment-links.md). We recommend creating a new Session each time your customer attempts to pay.

Once payment is successful, the Checkout Session will contain a reference to the [Customer](https://docs.stripe.com/docs/api/customers.md), and either the successful [PaymentIntent](https://docs.stripe.com/docs/api/payment_intents.md) or an active [Subscription](https://docs.stripe.com/docs/api/subscriptions.md).

You can create a Checkout Session on your server and redirect to its URL to begin Checkout.

Related guide: [Checkout quickstart](https://docs.stripe.com/docs/checkout/quickstart.md)

## Endpoints

### Create a Checkout Session

- [POST /v1/checkout/sessions](https://docs.stripe.com/api/checkout/sessions/create.md)

### Update a Checkout Session

- [POST /v1/checkout/sessions/:id](https://docs.stripe.com/api/checkout/sessions/update.md)

### Retrieve a Checkout Session

- [GET /v1/checkout/sessions/:id](https://docs.stripe.com/api/checkout/sessions/retrieve.md)

### Retrieve a Checkout Session's line items

- [GET /v1/checkout/sessions/:id/line_items](https://docs.stripe.com/api/checkout/sessions/line_items.md)

### List all Checkout Sessions

- [GET /v1/checkout/sessions](https://docs.stripe.com/api/checkout/sessions/list.md)

### Expire a Checkout Session

- [POST /v1/checkout/sessions/:id/expire](https://docs.stripe.com/api/checkout/sessions/expire.md)

## Events

- `checkout.session.async_payment_failed`
Occurs when a payment intent using a delayed payment method fails.

- `checkout.session.async_payment_succeeded`
Occurs when a payment intent using a delayed payment method finally succeeds.

- `checkout.session.completed`
Occurs when a Checkout Session has been successfully completed.

- `checkout.session.expired`
Occurs when a Checkout Session is expired.
