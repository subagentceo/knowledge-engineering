# Understand how charges work in a Connect integration

Learn about the types of charges used in Connect integrations and how funds move between the platform and connected accounts.

In a *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) integration, for your platform or a connected account to accept a payment from a customer, you must first create a charge. The type of charge you create determines how the funds are distributed between your platform, the connected account, and Stripe. It also determines whether your platform’s or the connected account’s information appears on the customer’s bank or billing statement and which account Stripe debits for refunds and chargebacks.

## Charge types 

Connect uses three types of charges in two general categories:

- [Direct charges](https://docs.stripe.com/connect/charges.md#direct): payments made directly to a connected account. Funds then transfer from the connected account to Stripe or the platform account as fees.
- Indirect charges: Payments made to your platform. Funds then transfer from your platform to Stripe as fees and to the connected account as its portion of the payment. Indirect charges include [destination charges](https://docs.stripe.com/connect/charges.md#destination) and [separate charges and transfers](https://docs.stripe.com/connect/charges.md#separate-charges-transfers), which differ in the way they transfer funds from your platform to connected accounts.

The following table describes many factors to consider when choosing which charge type to use. Your platform’s business model is particularly important because it can affect how funds flow through Stripe. To review Stripe’s recommendations for your business, refer to your [platform profile](https://dashboard.stripe.com/settings/connect/platform-setup).

| Charge type                                                                                             | Use cases                                                                                                                                                                                                                                                                                                   | Examples                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Direct charges](https://docs.stripe.com/connect/charges.md#direct)                                     | - Your connected accounts transact directly with their customers, who are often unaware of your platform’s existence.
  - Each transaction involves a single connected account and a single customer.
  - You want to choose whether Stripe debits fees from your connected accounts or from your platform. | - An e-commerce platform for independent sellers.
  - A Software as a Service (SaaS) platform, such as an accounting platform that enables invoice payments.                     |
| [Destination charges](https://docs.stripe.com/connect/charges.md#destination)                           | - Customers transact with your platform for products or services provided by your connected accounts.
  - Each transaction involves a single connected account and a single customer.
  - Stripe debits fees from your platform account.                                                                    | - A branded service that uses independent contractors, such as a rideshare app.
  - A business services marketplace, such as a website that matches contractors with homeowners. |
| [Separate charges and transfers](https://docs.stripe.com/connect/charges.md#separate-charges-transfers) | - Individual transactions can involve multiple connected accounts.
  - You can create a charge before knowing the connected account.
  - You can create a charge before being able to transfer the funds.
  - Stripe debits fees from your platform account.                                                | - An e-commerce marketplace that allows a single shopping cart for goods sold by multiple businesses                                                                             |

You can use multiple charge types, if that’s appropriate for your business.

### Direct charges 

Create a charge directly on a connected account. The account’s customers are often unaware of your platform’s existence. You can specify an application fee, which transfers to your platform’s account balance when the connected account collects the payment.

> Your connected accounts must have the [card_payments capability](https://docs.stripe.com/connect/account-capabilities.md) active in order to use direct charges.

This charge type is best suited for platforms providing Software as a Service (SaaS). For example, Shopify provides tools for building online storefronts, and Thinkific enables educators to sell online courses.

With this charge type:

- You create a charge on your connected account, so the payment appears in the connected account’s balance, not in your platform’s balance.
- The connected account’s balance increases with every charge.
- Funds always settle in the country of the connected account.
- Your platform’s balance increases with any application fees you collect for a charge.
- Refunds and chargebacks reduce the connected account’s balance.
- You can choose whether to have Stripe debit fees directly from connected accounts or from your platform account.
- You can use Managed Risk if you meet the [availability requirements](https://docs.stripe.com/connect/risk-management/managed-risk.md#availability).
- You create parent payment method configurations for your connected accounts, who can customize their own child configurations.
![Direct charges funds flow diagram](https://b.stripecdn.com/docs-statics-srv/assets/direct_charges.a2a8b68037ac95fe22140d6dde9740d3.svg)

Funds flow for direct charges

For more information about direct charges, see [Direct charges](https://docs.stripe.com/connect/direct-charges.md).

### Destination charges 

Create a charge on the platform and immediately transfer funds to the connected account. You decide whether some or all of those funds are transferred, and whether to deduct an application fee.

This charge type is best suited for marketplaces, such as a home rental marketplace or a ridesharing app.

With this charge type:

- You create a charge on your platform, so the payment appears in your platform’s balance. A portion of the funds immediately transfers to the connected account’s balance (see the funds flow diagrams below).
- The portion of the funds that remains in your platform balance represents the fee you charge your connected account.
- Refunds and chargebacks reduce your platform’s balance.
- Stripe debits fees from your platform’s balance.
- Charges use your platform’s payment method configurations, unless they use `on_behalf_of`.
![Destination charges with fee deducted funds flow diagram](https://b.stripecdn.com/docs-statics-srv/assets/platform_charges.6a14fd660d7433ba617e816ff09f10b5.svg)

Funds flow for destination charges with the platform fee deducted from the transferred amount
![Destination charges with post-paid fee funds flow diagram](https://b.stripecdn.com/docs-statics-srv/assets/application_fee_amount.837aa2339469b3c1a4319672971c1367.svg)

Funds flow for destination charges with the platform fee paid after transferring the full amount

> Destination charges support cross-region funds flows between platforms and connected accounts only in certain regions. For other regions, the platform and connected account must be in the same region unless using `on_behalf_of`. For more information about cross-region support, see [Cross-border transfers](https://docs.stripe.com/connect/cross-border-payouts.md).

For more information about destination charges, see [Destination charges](https://docs.stripe.com/connect/destination-charges.md).

### Separate charges and transfers 

Create charges on your platform and split funds between multiple connected accounts, or hold them when you don’t know the specific user at the time of the charge. The charge on your platform account is decoupled from the transfers to your connected accounts.

This charge type is best suited for marketplaces that need to split payments between multiple parties, such as DoorDash, a restaurant delivery platform.

With this charge type:

- You create a charge on your platform’s account first. Create a separate transfer to move funds to your connected account. The payment appears as a charge on your account and there’s also a transfer to a connected account (amount determined by you), which is withdrawn from your [account balance](https://docs.stripe.com/connect/account-balances.md).
- You can transfer funds to multiple connected accounts.
- Your account balance is debited for the cost of the Stripe fees, refunds, and chargebacks.
- Charges use your platform’s payment method configurations, unless they use `on_behalf_of`.

Separate charges and transfers require a more complex Connect integration. Use them only if your business use case requires them:

- A one-to-many relationship. For example, a payment made to a delivery service needs to be split between the store (the source of the items being delivered) and the delivery person.
- A many-to-one relationship. For example, a carpool trip with a ride-hailing service.
- Charges created before the destination account is known. For example, a janitorial service could process a payment before deciding which janitor to assign to the job.
- Need to transfer funds before receiving a payment, or while the charge is pending. For example, an ad network needs to purchase ad space before they can sell ad time or before receiving any payment from customers.
- Transfer amounts greater than the associated payments. For example, a platform provides a discount to its customer but pays its user the full amount.

In some cases, the transfer amount can be greater than the charge amount, or the transfer is made before the payment is processed. You must monitor your account balance carefully to make sure it has enough available funds to cover the transfer amount. You can also associate a transfer with a charge so the transfer doesn’t occur until the funds from that charge are available.
![Separate charges and transfers with multiple connected accounts funds flow diagram](https://b.stripecdn.com/docs-statics-srv/assets/charges_transfers.a95f5bf398651fba0fb303e32a742546.svg)

Funds flow for separate charges and transfers with multiple connected accounts

> Separate charges and transfers support cross-region funds flows between platforms and connected accounts only in certain regions. For other regions, the platform and connected account must be in the same region unless using `on_behalf_of`. For more information about cross-region support, see [Cross-border transfers](https://docs.stripe.com/connect/cross-border-payouts.md).

For more information about separate charges and transfers, see [Separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

### Indirect charges using the on_behalf_of parameter 

To make the connected account the business of record for the payment, use the `on_behalf_of` parameter. When `on_behalf_of` is set to the ID of the connected account, Stripe automatically:

- Settles charges in the country of the specified account to minimize declines and avoid [currency conversions](https://docs.stripe.com/connect/currencies/fx-quotes-api.md#currency-conversions).
- Uses the fee structure for the connected account’s country.
- Uses the [connected account’s statement descriptor](https://docs.stripe.com/connect/statement-descriptors.md).
- Uses the connected account’s address and phone number (rather than the platform’s) on the customer’s statement if the connected account is in a different country than the platform.
- Pays out a connected account, depending on the days specified in its `delays_days` setting.

## Stripe fees

There are two components to Stripe fees with Connect: which pricing plan applies to the payment and which account pays Stripe fees.

When using Direct charges, you can choose how Stripe fees are billed to your connected accounts.

[Read more about fee billing behaviors with Direct charges.](https://docs.stripe.com/connect/direct-charges-fee-payer-behavior.md)

Destination charges and separate charges and transfers typically use the platform’s pricing plan and are assessed on the platform. When the `on_behalf_of` field is set, the country of the connected account is used to determine the country specific fees charged to your platform account.

For more information on Connect fees and how to request custom pricing, see [the Connect pricing page](https://stripe.com/connect/pricing).

## Refunds 

You can issue a refund to pay a customer back for money spent on a returned good or to compensate for unsatisfactory service. Stripe handles refunds differently for each of the charge types:

| Charge Types                       | Pending Refunds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Direct charges**                 | Stripe debits the refund amount from the connected account’s balance directly when you create a refund.

  If the connected account’s balance is insufficient, we set the refund status to `pending`. When the connected account’s balance has enough funds, Stripe automatically processes pending refunds in the order they were created and updates their status to `successful`.                                                                                                                                                                                                                                                                                                                            |
| **Destination charges**            | Stripe debits your platform balance for the refund amount. You can reverse the transfers made to your connected accounts to recover your refund cost.

  If your platform’s account balance doesn’t have the funds when you [issue the Refund](https://docs.stripe.com/connect/destination-charges.md#issue-refunds), we set the refund status to `pending`. When your platform’s balance has enough funds, Stripe automatically processes pending refunds and updates their status to `successful`.

  If the refund request also attempts a transfer reversal, but the connected account has an insufficient balance, the refund request returns an error instead of creating a refund with `pending` status. |
| **Separate charges and transfers** | Stripe debits your platform balance for the refund amount. You can reverse the transfers made to your connected accounts to recover your refund cost.

  If your platform’s account balance doesn’t have the funds when you [issue the Refund](https://docs.stripe.com/connect/separate-charges-and-transfers.md#issue-refunds), we set the refund status to `pending`. When your platform balance has enough funds, Stripe automatically processes pending refunds and updates their status to `successful`.                                                                                                                                                                                                   |

## Disputes and chargebacks

For disputes on payments created using [direct charges](https://docs.stripe.com/connect/direct-charges.md), Stripe debits the disputed amount from the connected account’s balance, not your platform’s balance. Stripe can bill the dispute fee to either the platform or the connected account, depending on the connected account’s configuration. For more detail about how we bill fees for disputes on direct charges, see [Fee behavior on connected accounts](https://docs.stripe.com/connect/direct-charges-fee-payer-behavior.md).

For disputes where payments were created on your platform using [destination charges](https://docs.stripe.com/connect/destination-charges.md) or [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md), with or without `on_behalf_of`, your platform balance is automatically debited for the disputed amount and fee. When this happens, your platform can attempt to recover funds from the connected account by reversing the transfer either through the [Dashboard](https://dashboard.stripe.com/test/transfers) or [using the API](https://docs.stripe.com/api.md#create_transfer_reversal).

If there’s a negative balance on the connected account, Stripe attempts to debit the external account on file for the connected account only if `debit_negative_balances` is set to `true`.

If you’re using Express or Custom [legacy account types](https://docs.stripe.com/connect/accounts.md), your platform is responsible for disputes and fraud. For more details, see [Disputes and fraud](https://docs.stripe.com/disputes.md) and [Dispute categories](https://docs.stripe.com/disputes/categories.md), and follow [Best practices for risk management](https://docs.stripe.com/connect/risk-management/best-practices.md). You can also use [Fraud Stripe Apps](https://marketplace.stripe.com/categories/fraud) to automate dispute management and handle chargebacks.

## See also

- [Create direct charges](https://docs.stripe.com/connect/direct-charges.md)
- [Create destination charges](https://docs.stripe.com/connect/destination-charges.md)
- [Create separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md)
- [Set statement descriptors](https://docs.stripe.com/connect/statement-descriptors.md)
- [Integrate tax calculation and collection](https://docs.stripe.com/tax/connect.md)
