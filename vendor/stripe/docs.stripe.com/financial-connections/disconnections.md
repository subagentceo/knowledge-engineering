# Disconnect a Financial Connections account

Use the Disconnect API to unlink customer bank accounts.

Disconnect a user’s [Financial Connections Account](https://docs.stripe.com/api/financial_connections/accounts/object.md) if you no longer need data access or if your user writes into you requesting disconnection. Alternatively, your users can [disconnect their accounts themselves](https://support.stripe.com/user/how-do-i-disconnect-my-linked-financial-account).

If you disconnect an account, you can’t refresh their data and access previously refreshed data. However, any associated [PaymentMethods](https://docs.stripe.com/api/payment_methods.md) remain usable.

To regain access to new account data, your user needs to re-authenticate their account through the [authentication flow](https://docs.stripe.com/financial-connections/fundamentals.md#authentication-flow).

## Disconnect a Financial Connections account 

To disconnect an account, use the [disconnect API](https://docs.stripe.com/api/financial_connections/accounts/disconnect.md):

```curl
curl -X POST https://api.stripe.com/v1/financial_connections/accounts/{{FINANCIALCONNECTIONSACCOUNT_ID}}/disconnect \
  -u "<<YOUR_SECRET_KEY>>:"
```

This request returns the account with an updated `status` to reflect the successful disconnection.

```json
{
  "id": "fca_zbyrdjTrwcYZJZc6WBs6GPid",
  "object": "financial_connections.account",
  "account_holder": {
    "customer": "cus_NfjonN9919dELB",
    "type": "customer"
  },
  "institution_name": "PNC Bank","status": "disconnected",
  // ...
}
```

After account disconnection, Stripe emits a `financial_connections.account.disconnected` *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests).
