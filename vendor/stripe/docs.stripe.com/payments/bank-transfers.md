# Bank transfer payments

Learn about bank transfers and managing payments with the customer balance.

Bank transfers provide a safe way for customers to send money over bank rails. When accepting bank transfers with Stripe, you provide customers with a virtual bank account number that they can push money to from their own online bank interface or in-person bank branch. Stripe uses this virtual account number to automate reconciliation and prevent exposing your real account details to customers.

> #### Turn on bank transfers
> 
> To turn on bank transfer payments, go to your [Payment methods settings](https://dashboard.stripe.com/settings/payment_methods).

#### Payment method properties

- **Customer locations**

  [Varies by merchant country](https://docs.stripe.com/payments/bank-transfers.md?pm-info=business-locations#business-locations)

- **Presentment currency**

  EUR, GBP, JPY, MXN, USD

- **Payment confirmation**

  No

- **Payment method family**

  Bank transfer

- **Recurring payments**

  Yes1

- **Payout timing**

  [Standard payout timing](https://docs.stripe.com/payouts.md#payout-speed) applies

- **Connect support**

  [Yes](https://docs.stripe.com/payments/bank-transfers.md#connect)

- **Dispute support**

   [US only](https://docs.stripe.com/payments/bank-transfers.md#disputes)

- **Manual capture support**

  No

- **Refunds / Partial refunds**

  [Yes / Yes](https://docs.stripe.com/payments/bank-transfers.md#refunds)

1 Bank transfers support recurring payments, but they require customer action to make sure there are always enough funds to pay for the subscriptions.

#### Business locations

Stripe accounts in the following countries can accept bank transfer payments:

| Currencies | Business locations                                                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EUR or USD | - AT
  - BE
  - BG
  - CH
  - CY
  - CZ
  - DE
  - DK
  - EE
  - ES
  - FI
  - FR
  - GB
  - GR
  - HR
  - HU
  - IE
  - IT
  - LI
  - LT
  - LU
  - LV
  - MC
  - MT
  - NL
  - NO
  - PL
  - PT
  - RO
  - SE
  - SI
  - SK
  - SM
  - US |
| GBP        | - GB                                                                                                                                                                                                                                        |
| JPY        | - JP                                                                                                                                                                                                                                        |
| MXN        | - MX                                                                                                                                                                                                                                        |

#### Product support

- Connect
- Checkout1,2

- Subscriptions
- Invoicing
- Elements

1Not supported when using Checkout in subscription mode.2Not supported when using Checkout in setup mode.

Please [contact us](https://support.stripe.com/contact) to request another bank transfer method. Learn more about [country and currency support](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#country-currency-support).

## Get started 

You don’t have to integrate Bank Transfers and other payment methods individually. If you use our front-end products, Stripe automatically determines the most relevant payment methods to display. Go to the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods) and enable Bank Transfers. To get started with one of our hosted UIs, follow a quickstart:

- [Checkout](https://docs.stripe.com/checkout/quickstart.md): Our prebuilt, hosted checkout page.
- [Elements](https://docs.stripe.com/payments/quickstart-checkout-sessions.md): Our drop-in UI components.

### Other payment products

The following Stripe products also let you add Bank Transfers from the Dashboard:

- [Invoicing](https://docs.stripe.com/invoicing/no-code-guide.md)
- [Subscriptions](https://docs.stripe.com/billing/subscriptions/overview.md)

> #### Checkout requirement
> 
> Enabling bank transfers on the checkout page requires specifying the [customer](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer) in the checkout session.

If you prefer to manually list payment methods, or want to learn more about how bank transfers work with invoicing and subscriptions, see the following guides:

- [Accept a bank transfer payment](https://docs.stripe.com/payments/bank-transfers/accept-a-payment.md)
- [Send an invoice with bank transfer instructions](https://docs.stripe.com/invoicing/bank-transfer.md)
- [Set up a subscription with bank transfers as a payment method](https://docs.stripe.com/billing/subscriptions/bank-transfer.md)

## Customer balance

Unlike most payment methods, bank transfers don’t allow you to control the amount a customer sends to you, which means that customers might send too much or too little money by accident. To manage common overpayment and underpayment issues, Stripe holds your customer’s bank transfers in a [customer balance](https://docs.stripe.com/payments/customer-balance.md) that you can reconcile payments from. This allows you to track how much your customers owe, regardless of how much or how often they send funds.

If unreconciled funds are held in the customer balance for more than 75 days, Stripe automatically attempts to return the funds to the customer’s bank account. When Stripe doesn’t have the customer’s account information, Stripe might reach out to the customer directly to initiate the refund. If Stripe is unable to determine the customer’s account information by the 90 day mark, we sweep the unreconciled funds to your Stripe account balance. For further information on what happens when funds remain unreconciled, see the [reconciliation documentation](https://docs.stripe.com/payments/customer-balance/reconciliation.md#cash-unreconciled-funds).

## International and domestic wires 

Bank transfers users in the following regions can accept domestic and international wire transfers (SWIFT):

- The United States

Stripe-incurred fees appear on the [Balances](https://dashboard.stripe.com/balance/overview) page in the Dashboard, alongside other relevant Stripe fees and are calculated daily.

### International wire considerations

- International wire transfers might incur fees when they’re sent to Stripe, which can result in an amount received that’s less than what the customer originally sent. The amount shown in the cash balance is the amount that Stripe received from the customer.
- International transfers can take a longer period of time (3-5 business days) to settle into the customer balance.
- Stripe doesn’t support refunds for international wires. You’re responsible for making any refunds related to these payments. See [Refund international payments](https://docs.stripe.com/payments/customer-balance/refunding.md#refund-international-wire) for more information.

> #### Currencies
> 
> The accounts that support international payments only support their own currency. For example, US accounts support SWIFT transfers in USD only.

## Cross-border payments 

 Bank transfers users in the United States can accept EUR payments from customers in SEPA countries. 

With cross-border bank transfers, you create payments in the currency local to the customer’s country and the customer gets a virtual bank account number local to their country. You don’t have to have an account setup for the customer’s country to use cross-border bank transfers. Cross-border bank transfers incur additional fees that are visible in the Dashboard.

Offering payments to a local bank account with a customer’s local currency helps reduce the friction and cost involved in sending money abroad.

### Implement cross-border payments

To accept cross-border payments, create an additional bank transfers account under the customer with the relevant currency. This generates the relevant funding instructions.

1. In the **Customers** page of the [Dashboard](https://dashboard.stripe.com/customers), choose the customer to enable cross-border payments for.
1. In the **Payment Methods** section, click Add (+) and choose **Add a bank transfer account**.
1. In the editor, choose the currency to charge the customer in for their bank transfer payments.
1. Choose which country to present the specified currency to the customer.
1. Click **Add**.

## Refunds 

You can refund customer balance payments:

- Directly to the customer’s bank account
- Back to the customer’s cash balance, where the refund can be used towards another customer balance payment

To refund to the customer’s bank account, Stripe requires the customer’s bank account details. In some cases, Stripe receives these details when the customer transfers funds. When these details aren’t available, Stripe sends an email to the customer to collect bank account details and initiate a transfer when we receive those details.

If your customer has excess funds in their customer balance, you can initiate a return of funds through the Dashboard or the API. For more information, see [Refund bank transfer payments](https://docs.stripe.com/payments/customer-balance/refunding.md).

## Funding instructions 

You can show bank account details to your customer before they make their first payment through the Dashboard or the API. See [Funding instructions](https://docs.stripe.com/payments/customer-balance/funding-instructions.md) for more details.

> #### Beneficiary details in the EU
> 
> To prevent payment delays when expecting EUR payments, make sure your customers enter a beneficiary name that exactly matches your business name registered on Stripe when sending transfers. Any discrepancies might trigger additional screening by our banking partner, potentially delaying fund receipt.

## Sender information 

You can determine the sender details of an incoming bank transfer through either the Dashboard or the API. Those details can include the name of the sender, the reference, and the network through which the transfer arrived.

#### Dashboard

1. In the [Dashboard](https://dashboard.stripe.com/customers), go to the customer’s page.
1. Under **Payment Methods**, expand the cash balance tab.
1. Open the Cash Balance page by clicking **View balance details**.

On the cash balance page, the **Transactions** section displays a list of the customer’s incoming and outgoing cash balance transactions.

Incoming transfers have type **Funding**. Find the transfer you’re interested in and open its details page by clicking its description.

#### API

Access a customer’s cash balance transactions using the [Cash Balance Transactions API](https://docs.stripe.com/api/cash_balance_transactions.md).

```curl
curl https://api.stripe.com/v1/customers/cus_xxxxxxx/cash_balance_transactions/ccsbtxn_xxxx \
  -u "<<YOUR_SECRET_KEY>>:"
```

An incoming transfer transaction’s [type attribute](https://docs.stripe.com/api/cash_balance_transactions/object.md#customer_cash_balance_transaction_object-type) has the value `funded`, and its [funded attribute](https://docs.stripe.com/api/cash_balance_transactions/object.md#customer_cash_balance_transaction_object-funded) contains details about the sender.

### Example response for an incoming transfer transaction 

#### EU

```json
{
    "id": "ccsbtxn_1Nkr8vGH59QTMK2f9CIA34L5",
    "object": "customer_cash_balance_transaction",
    "created": 1693412481,
    "currency": "eur",
    "customer": "cus_OVD6ezUsYGBILH",
    "ending_balance": 10000,
    "funded": {
      "bank_transfer": {
        "eu_bank_transfer": {
          "bic": "COBADEFFXXX",
          "iban_last4": "4000",
          "sender_name": "John Doe",
          "network": "sepa"
      },
      "reference": "REF-4242",
      "type": "eu_bank_transfer"
      }
    },
    "livemode": false,
    "net_amount": 12300,
    "type": "funded"
}
```

#### GB

```json
{
    "id": "ccsbtxn_1Nkr8vGH59QTMK2f9CIA34L5",
    "object": "customer_cash_balance_transaction",
    "created": 1693412481,
    "currency": "gbp",
    "customer": "cus_OVD6ezUsYGBILH",
    "ending_balance": 10000,
    "funded": {
      "bank_transfer": {
        "gb_bank_transfer": {
          "account_number_last4": "1113",
          "sender_name": "John Doe",
          "sort_code": "108800"
        },
        "reference": "REF-4242",
        "type": "gb_bank_transfer"
      }
    },
    "livemode": false,
    "net_amount": 12300,
    "type": "funded"
}
```

#### JP

```json
{
    "id": "ccsbtxn_1Nkr8vGH59QTMK2f9CIA34L5",
    "object": "customer_cash_balance_transaction",
    "created": 1693412481,
    "currency": "jpy",
    "customer": "cus_OVD6ezUsYGBILH",
    "ending_balance": 10000,
    "funded": {
      "bank_transfer": {
        "jp_bank_transfer": {
          "sender_branch": "京都",
          "sender_bank": "新生銀行",
          "sender_name": "John Doe"
        },
        "reference": "REF-4242",
        "type": "jp_bank_transfer"
      }
    },
    "livemode": false,
    "net_amount": 12300,
    "type": "funded"
}
```

#### MX

Example of a `funded` ccsbtxn for eu_bank_transfer:

```json
{
    "id": "ccsbtxn_1Nkr8vGH59QTMK2f9CIA34L5",
    "object": "customer_cash_balance_transaction",
    "created": 1693412481,
    "currency": "mxn",
    "customer": "cus_OVD6ezUsYGBILH",
    "ending_balance": 10000,
    "funded": {
      "bank_transfer": {
        "mx_bank_transfer": {
          "clabe_last4": "4567",
          "sender_bank": "Citi",
          "sender_name": "JOHN DOE"
        },
        "reference": "REF-4242",
        "type": "mx_bank_transfer"
      }
    },
    "livemode": false,
    "net_amount": 12300,
    "type": "funded"
}
```

#### US

```json
{
    "id": "ccsbtxn_1Nkr8vGH59QTMK2f9CIA34L5",
    "object": "customer_cash_balance_transaction",
    "created": 1693412481,
    "currency": "usd",
    "customer": "cus_OVD6ezUsYGBILH",
    "ending_balance": 10000,
    "funded": {
      "bank_transfer": {
        "reference": "REF-4242",
        "type": "us_bank_transfer",
        "us_bank_transfer": {
          "network": "ach",
          "sender_name": "John Doe"
        }
      }
    },
    "livemode": false,
    "net_amount": 12300,
    "type": "funded"
}
```

If the `network` attribute is `ach`, the incoming transfer was completed through an ACH transfer. If the `network` attribute is `domestic_wire_us`, the incoming transfer was completed through a domestic wire.

## Disputes

Bank transfer payments can’t be reversed except for USD and CAD transactions.

### USD disputes

USD bank transfers that go through the ACH network in the US can be reversed. After you push a transfer, you can request that your bank reverse it. You must provide the bank with evidence as to why they should reverse the transfer. The remitting bank then sends a reversal to the beneficiary bank. A reversal must be sent no later than 5 days after the payment.

### CAD disputes

CAD bank transfers that go through ACH reversals are always initiated by the remitting bank, and the beneficiary bank must honor them.

## Connect 

[Stripe Connect](https://docs.stripe.com/connect/how-connect-works.md) can be used with bank transfers to process payments on behalf of connected accounts. *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platforms can use bank transfers with [any type of charges](https://docs.stripe.com/connect/charges.md#types).

The [on_behalf_of attribute](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-on_behalf_of) isn’t supported.

### Accepting bank transfer payments as the connected account

[Direct charges](https://docs.stripe.com/connect/direct-charges.md) require the connected account itself (not the platform) to have activated the bank transfers payment method—Connect platforms can use the [relevant bank transfers capability](https://docs.stripe.com/connect/account-capabilities.md#payment-methods) to determine whether this is the case for a connected account. [Standard Connect accounts](https://docs.stripe.com/connect/standard-accounts.md) can request the relevant capability from their Stripe Dashboard.

### Activation process

The process varies by country, but in general for bank transfer payments, the [required information](https://docs.stripe.com/connect/required-verification-information.md) is the same as what’s necessary to activate a Stripe account for payments. If the account doesn’t fulfill all the required information, the capability remains `inactive` with any issues highlighted on the [capability object](https://docs.stripe.com/api/capabilities/object.md) in the `requirements.currently_due` and `requirements.disabled_reason` fields until these issues have been addressed. After all the highlighted issues are resolved, the capability’s `status` changes to `active`, unless there are issues activating the account in general, in which case Stripe sends the Connect platform owner an email.

## Product support

| Payment method | [Connect](https://docs.stripe.com/connect.md) | [Checkout](https://docs.stripe.com/payments/checkout.md) | [Payment Links](https://docs.stripe.com/payment-links.md) | [Payment Element](https://docs.stripe.com/payments/payment-element.md) | [Express Checkout Element](https://docs.stripe.com/elements/express-checkout-element.md) | [Mobile Payment Element](https://docs.stripe.com/payments/mobile.md) | [Subscriptions](https://docs.stripe.com/subscriptions.md) | [Invoicing](https://docs.stripe.com/invoicing.md) | [Customer Portal](https://docs.stripe.com/customer-management.md) |
| -------------- | --------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| Bank transfers | ✓ Supported                                   | ✓ Supported 1,2                                          | - Unsupported                                             | ✓ Supported                                                            | - Unsupported                                                                            | - Unsupported                                                        | ✓ Supported                                               | ✓ Supported                                       | - Unsupported                                                     |

1 Not supported when using Checkout in subscription mode.2 Not supported when using Checkout in setup mode.

## API support

| Payment method | API enum           | [PaymentIntents](https://docs.stripe.com/payments/payment-intents.md) | [SetupIntents](https://docs.stripe.com/payments/setup-intents.md) | [Manual capture](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) | [Setup future usage](https://docs.stripe.com/payments/save-during-payment.md?platform=web&ui=elements)1 | Requires redirect2 |
| -------------- | ------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------ |
| Bank transfers | `customer_balance` | ✓ Supported                                                           | - Unsupported                                                     | - Unsupported                                                                          | - Unsupported                                                                                           | No                 |

1 Cards and bank debit methods including SEPA debit, AU BECS direct debit, and ACSS debit support both `on_session` and `off_session` with [setup future usage](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-setup_future_usage). All other payment method types either don’t support `setup_future_usage` or only support `off_session`.2 Payment methods might require confirmation with [return_url](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-return_url) to indicate where Stripe should redirect your customer after they complete the payment.

## Unsupported businesses 

Stripe can’t accept payments for certain types of businesses. In addition to the [Restricted Business list](https://stripe.com/restricted-businesses), Stripe doesn’t support bank transfers if your business falls into any of the following categories:

#### EU

#### UK

## Unsupported products and features 

Bank transfers don’t support Payment Links.
