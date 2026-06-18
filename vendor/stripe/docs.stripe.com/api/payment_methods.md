# Payment Methods

PaymentMethod objects represent your customer’s payment instruments. You can use them with [PaymentIntents](https://docs.stripe.com/docs/payments/payment-intents.md) to collect payments or save them to Customer objects to store instrument details for future payments.

Related guides: [Payment Methods](https://docs.stripe.com/docs/payments/payment-methods.md) and [More Payment Scenarios](https://docs.stripe.com/docs/payments/more-payment-scenarios.md).

## Endpoints

### Create a PaymentMethod

- [POST /v1/payment_methods](https://docs.stripe.com/api/payment_methods/create.md)

### Update a PaymentMethod

- [POST /v1/payment_methods/:id](https://docs.stripe.com/api/payment_methods/update.md)

### Retrieve a PaymentMethod

- [GET /v1/payment_methods/:id](https://docs.stripe.com/api/payment_methods/retrieve.md)

### Retrieve a Customer's PaymentMethod

- [GET /v1/customers/:id/payment_methods/:id](https://docs.stripe.com/api/payment_methods/customer.md)

### List PaymentMethods

- [GET /v1/payment_methods](https://docs.stripe.com/api/payment_methods/list.md)

### List a Customer's PaymentMethods

- [GET /v1/customers/:id/payment_methods](https://docs.stripe.com/api/payment_methods/customer_list.md)

### Attach a PaymentMethod to a Customer

- [POST /v1/payment_methods/:id/attach](https://docs.stripe.com/api/payment_methods/attach.md)

### Detach a PaymentMethod from a Customer

- [POST /v1/payment_methods/:id/detach](https://docs.stripe.com/api/payment_methods/detach.md)

## Events

- `payment_method.attached`
Occurs whenever a new payment method is attached to a customer.

- `payment_method.automatically_updated`
Occurs whenever a payment method’s details are automatically updated by the network.

- `payment_method.detached`
Occurs whenever a payment method is detached from a customer.

- `payment_method.updated`
Occurs whenever a payment method is updated via the [PaymentMethod update API](https://docs.stripe.com/api/payment_methods/update.md).
