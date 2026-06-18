# Disputes on Connect platforms

Learn about the dispute responsibilities on Connect platforms.

You can view all disputes filed against your platform and connected accounts in your Dashboard. When one of your connected accounts receives a dispute against a payment, the [charge type](https://docs.stripe.com/connect/charges.md#types) and negative balance responsibility determine:

- Whether you or your connected account responds to that dispute to accept or challenge it.
- Which account Stripe debits for the chargeback and fees.

This guide describes how Stripe processes disputes for each charge type and how you can handle them.

## Direct charges

For connected accounts that use [direct charges](https://docs.stripe.com/connect/direct-charges.md), Stripe always attempts to debit the disputed amount from the connected account’s balance. However, the dispute fee, as well as ultimate responsibility for the disputed amount, depends on whether your platform is [responsible for negative balances](https://docs.stripe.com/connect/risk-management.md#identify-negative-balance-responsibility). It doesn’t matter whether your platform is responsible for other Stripe fees.

| Negative balance responsibility | Disputed amount responsibility                                                                                                                          | Dispute fee responsibility                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Stripe                          | Stripe debits the disputed amount from the connected account, and Stripe is responsible for the loss if the amount can’t be debited.                    | Stripe debits the dispute fee from the connected account, and Stripe is responsible for the loss if the amount can’t be debited. |
| Platform                        | Stripe debits the disputed amount from the connected account, but if the connected account balance is insufficient, Stripe debits it from the platform. | Stripe debits the dispute fee from the platform, and the platform is responsible for the loss if the amount can’t be debited.    |

> #### Legacy connected account types
> 
> If you use Express or Custom connected accounts, see [Fee behavior on connected accounts](https://docs.stripe.com/connect/direct-charges-fee-payer-behavior.md#application_custom-or-application_express) for information about dispute fees.

## Destination and separate charges and transfers

For [destination charges](https://docs.stripe.com/connect/destination-charges.md) and [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md), with or without `on_behalf_of`, Stripe debits dispute amounts and fees from your platform account.

We recommend setting up [a webhook](https://docs.stripe.com/webhooks.md) to listen to [dispute created events](https://docs.stripe.com/api/events/types.md#event_types-charge.dispute.created). When that happens, you can attempt to recover funds from the connected account by reversing the transfer through the [Dashboard](https://dashboard.stripe.com/test/transfers) or by [creating a transfer reversal](https://docs.stripe.com/api/transfer_reversals/create.md).

If the connected account has a negative balance, Stripe attempts to [debit its external account](https://docs.stripe.com/connect/account-balances.md#automatically-debit-connected-accounts) if `debit_negative_balances` is set to `true`.

If you challenge the dispute and win, you can transfer the funds that you previously reversed back to the connected account. If your platform has an insufficient balance, the transfer fails. Prevent insufficient balance errors by [adding funds to your Stripe balance](https://docs.stripe.com/get-started/account/add-funds.md).

> Retransferring a previous reversal is subject to [cross-border transfer restrictions](https://docs.stripe.com/connect/account-capabilities.md#transfers-cross-border), meaning you might have no means to repay your connected account. Instead, wait to recover disputed cross-border payment transfers for destination charges with `on_behalf_of` until after a dispute is lost.

To automate dispute management and handle chargebacks, browse [Fraud Stripe Apps](https://marketplace.stripe.com/categories/fraud) on the App Marketplace.

## Provide Connect embedded components to allow your connected accounts to respond to disputes

Your connected accounts can use [Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) to manage disputes from within your site.

The following components support dispute management:

- [Payments component](https://docs.stripe.com/connect/supported-embedded-components/payments.md): Displays all of an account’s payments and disputes.
- [Disputes list component](https://docs.stripe.com/connect/supported-embedded-components/disputes-list.md): Displays all of an account’s disputes.
- [Disputes for a payment component](https://docs.stripe.com/connect/supported-embedded-components/disputes-for-a-payment.md): Displays the disputes for a single specified payment. You can use it to include dispute management functionality on a page with your payments UI.

Note: The following is a preview/demo component that behaves differently than live mode usage with real connected accounts. The actual component has more functionality than what might appear in this demo component. For example, for connected accounts without Stripe dashboard access (custom accounts), no user authentication is required in production.

## See also

- [Respond to disputes](https://docs.stripe.com/disputes/responding.md)
- [Dispute categories](https://docs.stripe.com/disputes/categories.md)
- [Prevent disputes and fraud](https://docs.stripe.com/disputes/prevention.md)
- [Use Radar with Connect](https://docs.stripe.com/connect/radar.md)
