# Using manual payouts

Send manual payouts to your connected accounts.

If you set the value of [payments.payouts.schedule.interval](https://docs.stripe.com/api/balance-settings/update.md#update_balance_settings-payments-payouts-schedule-interval) to `manual`, we hold funds in the account holder’s balance until you specify otherwise. You must pay out the funds within the time period specified below, based on the business’s country:

| Country             | Holding Period |
| ------------------- | -------------- |
| Thailand            | 10 days        |
| United States       | 2 years        |
| All other countries | 90 days        |

```curl
curl https://api.stripe.com/v1/balance_settings \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "payments[payouts][schedule][interval]=manual"
```

> This guide shows how to configure payouts using the Balance Settings API. Use [Balance Settings](https://docs.stripe.com/api/balance-settings.md) to manage payout settings for Accounts v2. The Balance Settings object follows similar structure and behavior to the Accounts v1 `settings.payouts` hash. If you’re currently using `settings.payouts` on Accounts v1, you can continue to do so.

To trigger a payout of these funds, use the [Payouts API](https://docs.stripe.com/api/payouts/create.md). The Payouts API is only for moving funds from a connected Stripe account’s balance into their external account. To move funds between the platform and a connected account, use [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md) or [destination charges](https://docs.stripe.com/connect/destination-charges.md).

> *Escrow* has a precise legal definition, and Stripe doesn’t provide escrow services or support escrow accounts. However, you can control payout timing through manual payouts, which allow you to delay payouts to certain accounts. When using manual payouts, you must pay out funds within the time frame for the business’s country.
> 
> Delayed payouts can be useful when a delivery is delayed or when there’s a possibility of a refund.

## Regular payouts

The following example sends 10 USD from a connected account’s Stripe balance to their external account:

```curl
curl https://api.stripe.com/v1/payouts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d amount=1000 \
  -d currency=usd
```

With a standard payout, you can move an amount up to the user’s available balance. To find that amount, perform a [retrieve balance](https://docs.stripe.com/api.md#retrieve_balance) call on their behalf.

Stripe tracks balance contributions from different payment sources in separate balances. The retrieve balance response breaks down the components of each balance by source type. For example, to create a payout specifically for a non-credit-card balance, specify the `source_type` in your request.

```curl
curl https://api.stripe.com/v1/payouts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d amount=24784 \
  -d currency=usd \
  -d source_type=bank_account
```

While individual balance components can go negative (such as through refunds or chargebacks), you can’t create payouts for greater than the aggregate available balance.
