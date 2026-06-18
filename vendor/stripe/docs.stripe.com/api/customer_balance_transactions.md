# Customer Balance Transaction

Each customer has a [Balance](https://docs.stripe.com/docs/api/customers/object.md#customer_object-balance) value, which denotes a debit or credit that’s automatically applied to their next invoice upon finalization. You may modify the value directly by using the [update customer API](https://docs.stripe.com/docs/api/customers/update.md), or by creating a Customer Balance Transaction, which increments or decrements the customer’s `balance` by the specified `amount`.

Related guide: [Customer balance](https://docs.stripe.com/docs/billing/customer/balance.md)

## Endpoints

### Create a customer balance transaction

- [POST /v1/customers/:id/balance_transactions](https://docs.stripe.com/api/customer_balance_transactions/create.md)

### Update a customer credit balance transaction

- [POST /v1/customers/:id/balance_transactions/:id](https://docs.stripe.com/api/customer_balance_transactions/update.md)

### Retrieve a customer balance transaction

- [GET /v1/customers/:id/balance_transactions/:id](https://docs.stripe.com/api/customer_balance_transactions/retrieve.md)

### List customer balance transactions

- [GET /v1/customers/:id/balance_transactions](https://docs.stripe.com/api/customer_balance_transactions/list.md)
