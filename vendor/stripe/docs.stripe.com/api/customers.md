# Customers

This object represents a customer of your business. Use it to [create recurring charges](https://docs.stripe.com/docs/invoicing/customer.md), [save payment](https://docs.stripe.com/docs/payments/save-during-payment.md) and contact information, and track payments that belong to the same customer.

## Endpoints

### Create a customer

- [POST /v1/customers](https://docs.stripe.com/api/customers/create.md)

### Update a customer

- [POST /v1/customers/:id](https://docs.stripe.com/api/customers/update.md)

### Retrieve a customer

- [GET /v1/customers/:id](https://docs.stripe.com/api/customers/retrieve.md)

### List all customers

- [GET /v1/customers](https://docs.stripe.com/api/customers/list.md)

### Delete a customer

- [DELETE /v1/customers/:id](https://docs.stripe.com/api/customers/delete.md)

### Search customers

- [GET /v1/customers/search](https://docs.stripe.com/api/customers/search.md)

## Events

- `customer.created`
Occurs whenever a new customer is created.

- `customer.deleted`
Occurs whenever a customer is deleted.

- `customer.updated`
Occurs whenever any property of a customer changes.
