# Balance

This is an object representing your Stripe balance. You can retrieve it to see the balance currently on your Stripe account.

The top-level `available` and `pending` comprise your “payments balance.”

Related guide: [Balances and settlement time](https://docs.stripe.com/docs/payments/balances.md), [Understanding Connect account balances](https://docs.stripe.com/docs/connect/account-balances.md)

## Endpoints

### Retrieve balance

- [GET /v1/balance](https://docs.stripe.com/api/balance/balance_retrieve.md)

## Events

- `balance.available`
Occurs whenever your Stripe balance has been updated (e.g., when a charge is available to be paid out). By default, Stripe automatically transfers funds in your balance to your bank account on a daily basis. This event is not fired for negative transactions.
