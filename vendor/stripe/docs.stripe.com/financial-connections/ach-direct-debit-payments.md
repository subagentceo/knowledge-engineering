# Collect a bank account to use ACH Direct Debit payments with account data

Use account data such as balances with your payments integration.

Not sure about which Financial Connections integration to use? See our [overview of integration options](https://docs.stripe.com/financial-connections/use-cases.md).

Stripe offers a number of ways to accept ACH Direct Debit payments from your users. All of these methods require that you [verify](https://docs.stripe.com/payments/ach-direct-debit.md#verification) the user’s account before you can debit their account. You can use Financial Connections to perform instant bank account verification along with features such as balance or ownership checks. When using Financial Connections for your ACH flows, you can:

- Reduce your payment failure rate from closed or inactive accounts
- Improve payments conversion by keeping users on session, instead of forcing them to leave your payments flow to locate their accounts and routing numbers
- Save development time by eliminating the need to create a custom bank account collection form
- Enable the collection of additional bank account data, such as balances and ownership information

## Before you begin

Financial Connections is the default verification method for all hosted ACH payment flows, such as Checkout or the Payment Element. If you use a hosted flow, skip directly to [accessing additional account data](https://docs.stripe.com/financial-connections/ach-direct-debit-payments.md#access). Set up your integration to [collect ACH payments](https://docs.stripe.com/payments/ach-direct-debit/accept-a-payment.md?platform=web&ui=stripe-hosted) if you haven’t already done so.

## Enable Financial Connections

The `verification_method` parameter on various API resources controls whether Financial Connections is enabled for bank account verification. Financial Connections with microdeposit fallback is the default.

> Bank accounts that your customers link through manual entry and microdeposits won’t have access to additional bank account data like balances, ownership, and transactions.

| Verification method   | Description                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `automatic` (default) | Financial Connections with the option to manually enter bank account information and use microdeposits |
| `instant`             | Financial Connections only, with no manual entry and microdeposit fallback                             |
| `microdeposits`       | Manual entry and microdeposits only                                                                    |

This option is available on the following APIs:

Additional steps, such as Nacha mandate collection, are required for businesses that don’t use a Stripe-hosted integration such as Payment Element, Checkout, or Hosted Invoicing. See [this section of the ACH guide](https://docs.stripe.com/payments/ach-direct-debit/accept-a-payment.md?platform=web&ui=direct-api#web-collect-details).

- [PaymentIntent](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-payment_method_options-us_bank_account-verification_method)
- [SetupIntent](https://docs.stripe.com/api/setup_intents/create.md#create_setup_intent-payment_method_options-us_bank_account-verification_method)
- [CheckoutSession](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_method_options-us_bank_account-verification_method)
- [Invoice](https://docs.stripe.com/api/invoices/create.md#create_invoice-payment_settings-payment_method_options-us_bank_account-verification_method)
- [Subscription](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-payment_settings-payment_method_options-us_bank_account-verification_method)
- [Payment Element](https://docs.stripe.com/js/elements_object/create_without_intent#stripe_elements_no_intent-options-paymentMethodOptions-us_bank_account-verification_method)

## Create a customer [Recommended]

We recommend that you create a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) with an email address and phone number to represent your user, that you then attach to your payment. Attaching a `Customer` object allows you to [list previously linked accounts ](https://docs.stripe.com/api/financial_connections/accounts/list.md) later. By providing the email address and phone number on the `Customer` object, Financial Connections can improve the authentication flow by simplifying sign-in or sign-up for your user, depending on whether they’re a returning [Link](https://support.stripe.com/questions/link-for-financial-connections-support-for-businesses) user.

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d email={{CUSTOMER_EMAIL}} \
  -d phone={{CUSTOMER_PHONE}}
```

## Request access to additional account data

To access additional account data on Financial Connections Accounts, you must first submit your Financial Connections application by checking [Financial Connections settings in the Dashboard](https://dashboard.stripe.com/settings/financial-connections). You can view this page after you activate Financial Connections. Your integration determines how you configure access to different types of account data.

#### Dynamic payment methods

If you use Stripe’s [dynamic payment method feature](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md) to collect ACH payments for non-Connect use cases, you can configure requested Financial Connections data directly from the [ACH Dashboard settings page](https://dashboard.stripe.com/test/settings/payment_methods). Account and routing number is always required for ACH debits—other data types are optional.

> We recommend configuring permissions in the Dashboard because it allows you to change which data you collect without any code changes.

To override the Dashboard configuration, specify Financial Connections permissions directly in the API. To do this for PaymentIntents:

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=2000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_payment_methods[enabled]=true" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][]=payment_method" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][]=balances" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][]=ownership" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][]=transactions"
```

#### Payment method types

If you pass `payment_method_types` in the API directly, you must explicitly specify which Financial Connections data permissions you want in every API call. To do this for [CheckoutSession](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_method_options-us_bank_account-financial_connections-permissions):

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  --data-urlencode "success_url=https://example.com/success" \
  -d "line_items[0][price]={PRICE_ID}" \
  -d "line_items[0][quantity]=1" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][0]=payment_method" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][1]=balances" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][2]=ownership" \
  -d "payment_method_options[us_bank_account][financial_connections][permissions][3]=transactions"
```

## Use data with your ACH integration

After you’ve been approved for additional bank account data access such balances or ownership, you can use this data to improve ACH payments performance. For example, you can use balance data to reduce the risk of insufficient funds failures. See related data guides for examples:

- [Balances](https://docs.stripe.com/financial-connections/balances.md): check account balance prior to payment initiation to reduce *NSFs* (A shorthand way of referring to the Non-sufficient Funds ACH return code R01).
- [Ownership](https://docs.stripe.com/financial-connections/ownership.md): pull account owners and compare against your internal data models to catch potential fraud.
- [Transactions](https://docs.stripe.com/financial-connections/transactions.md): pull an account’s transaction history to check when the customer’s paycheck might land.

> The Risk Intelligence API is a preview feature that provides additional aggregate data to help manage risk, such as average account balance over the past 30/60/90 days, total number of credit transactions over the past 30/60/90 days, and more. If you’re interested in using this preview feature, [email us](mailto:financial-connections-beta+risk-intelligence@stripe.com) for access.

### Finding the Financial Connections Account ID

To initiate data refreshes and retrieve data on a Financial Connections account, you first need to get the account’s ID from the linked payment method by expanding the PaymentIntent’s `payment_method` property:

```curl
curl -G https://api.stripe.com/v1/payment_intents/{{PAYMENT_INTENT}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "expand[]=payment_method"
```

The Financial Connections account ID is on the expanded payment method’s [`us_bank_account` hash](https://docs.stripe.com/api/payment_methods/object.md#payment_method_object-us_bank_account). If you allow [manual entry fallback](https://docs.stripe.com/financial-connections/ach-direct-debit-payments.md#enable) and the user manually entered their account information, this field is `null`.

```json
{
  "id": "pi_3OK3g4FitzZY8Nvm11121Lhb",
  "object": "payment_intent",
  "payment_method": {
    "us_bank_account": {"financial_connections_account": "fca_1OK123bitUAA8SvmruWkck76"
    }
    // ... other fields on the Payment Method
  }
  // ... other fields on the Payment Intent
}
```
