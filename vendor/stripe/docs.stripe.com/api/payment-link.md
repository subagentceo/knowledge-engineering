# Payment Link

A payment link is a shareable URL that will take your customers to a hosted payment page. A payment link can be shared and used multiple times.

When a customer opens a payment link it will open a new [checkout session](https://docs.stripe.com/docs/api/checkout/sessions.md) to render the payment page. You can use [checkout session events](https://docs.stripe.com/docs/api/events/types.md#event_types-checkout.session.completed) to track payments through payment links.

Related guide: [Payment Links API](https://docs.stripe.com/docs/payment-links.md)

## Endpoints

### Create a payment link

- [POST /v1/payment_links](https://docs.stripe.com/api/payment-link/create.md)

### Update a payment link

- [POST /v1/payment_links/:id](https://docs.stripe.com/api/payment-link/update.md)

### Retrieve payment link

- [GET /v1/payment_links/:id](https://docs.stripe.com/api/payment-link/retrieve.md)

### Retrieve a payment link's line items

- [GET /v1/payment_links/:id/line_items](https://docs.stripe.com/api/payment-link/retrieve-line-items.md)

### List all payment links

- [GET /v1/payment_links](https://docs.stripe.com/api/payment-link/list.md)

## Events

- `payment_link.created`
Occurs when a payment link is created.

- `payment_link.updated`
Occurs when a payment link is updated.
