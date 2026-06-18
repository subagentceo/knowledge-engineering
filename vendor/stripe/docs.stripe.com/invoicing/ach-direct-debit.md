# Invoicing and ACH Direct Debit

Configure, create, and process invoices using ACH Direct Debit.

To reduce costs, many businesses make card payment methods unavailable above a certain *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) total amount, and prefer payment from bank methods like ACH Direct Debit.

This guide provides step-by-step instructions on how to configure, create, and process invoices to use the [ACH Direct Debit](https://docs.stripe.com/payments/ach-direct-debit.md) payment method. Stripe users in the United States can accept **ACH Direct Debit** from end customers with US bank accounts using the Automated Clearing House (ACH) payments system operated by [Nacha](https://www.nacha.org/content/ach-network). A *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platform that integrates ACH Direct Debit has more [advanced options available](https://docs.stripe.com/invoicing/ach-direct-debit.md#fee-splitting). To begin, determine whether:

- Your customers [enter bank account information](https://docs.stripe.com/invoicing/ach-direct-debit.md#default-payment-method) to pay their invoices.
- You [collect and verify bank account information upfront](https://docs.stripe.com/invoicing/ach-direct-debit.md#precollected-bank-information) and automatically process invoices.

> If you give a customer an invoice link to pay a one-off invoice, Stripe automatically saves their bank information allowing reuse on future invoices. You can also add the bank customer’s information directly through the customer details page.

## Set up ACH Direct Debit 

You can either set ACH Direct Debit as a default payment method, or add it when you [create an invoice](https://docs.stripe.com/invoicing/dashboard.md#create-invoice).

#### Dashboard

To set ACH Direct Debit as a default payment method type:

1. On the [Billing settings](https://dashboard.stripe.com/settings/billing/invoice) page, under **Invoicing settings** > **Default payment methods**, click **Edit payment methods**.
2. On the **Billing Payments** page, under **Bank debits**, click **Turn on** to enable **ACH Direct Debit** as a default payment method.

Your customers can pay an invoice by using the [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md) to enter their bank account information or select the default payment method. If there isn’t a default payment method, the invoice includes all available payment methods.

#### API

To set ACH Direct Debit as the default payment method type, add `us_bank_account` to the `payment_method_types` array under the optional [payment_settings](https://docs.stripe.com/api/invoices/object.md#invoice_object-payment_settings-payment_method_types) parameter. This results in an invoice that a customer can only pay by using ACH Direct Debit—regardless of the other available default payment methods. If you want to include additional payment methods, add them to the `payment_method_types` array.

Your customer can then use ACH Direct Debit along with the other added payment methods. For [payment method options](https://docs.stripe.com/api/invoices/object.md#invoice_object-payment_settings-payment_method_options-us_bank_account), such as requesting additional linked account data, see the [ACH guide](https://docs.stripe.com/payments/ach-direct-debit.md).

```missingLanguage
payment_settings: {
  payment_method_types:[`us_bank_account`]
},
```

## Pre-collected bank information 

You can collect bank account information for future payments with **ACH Direct Debit**. After you add a customer’s ACH details, they must verify their payment information with microdeposits, which can take up to 2 days.

#### Dashboard

To pre-collect a customer’s bank information:

1. On the [Customers](https://dashboard.stripe.com/customers) page, select a customer name.
2. On the customer page, under **Payment methods**, click the plus (**+**) symbol, and select **Add US bank account**.
3. On the **Add a US bank account** page, enter the payment details, and click **Add US bank account**.
4. After verification, click the overflow menu (⋯) next to the payment method, and select **Set as default**.

Whenever you create a new invoice for your customer, select **Charge immediately** to automatically charge the default payment method on file. For a finalized invoice, you can also click **Charge customer** on the invoice details page, and select the saved ACH Direct Debit payment method to initiate the transaction.

#### API

Every finalized invoice has an associated payment intent. You can [confirm a PaymentIntent](https://docs.stripe.com/api/payment_intents/confirm.md) to process the invoice.

## Payment completions 

For any invoice with ACH Direct Debit enabled as a payment method, your customer can enter their bank account information on the Hosted Invoice Page to start a debit payment.

Your customer must do the following to complete payment:

1. On the Hosted Invoice Page, select **US bank account**.
2. Search for and select the bank.
3. Initiate login with the bank and agree to the terms of service.
4. Select the bank account and click **Connect account**.
5. After successfully connecting the account, click **Back** to go to the invoice.
6. Click **Pay** and agree to the terms of service.

## Enhanced fee splitting   (Connect)

Payment methods (such as credit and debit cards) have a fixed percentage charged over the whole amount. But low cost payment methods (such as **ACH Direct Debit**) are usually capped. For platforms looking to dynamically reflect this fee arrangement to their businesses, Stripe recommends that you separate your charges and transfers (as opposed to using the basic `application_fee_amount` parameter). With separate charges and transfers, your platform can transfer the business’ share of funds minus the appropriate fee amount based on the payment method type.

## Test the integration 

You can test customer bank account entry through instant verification or microdeposits.

### Instant verification 

You can instantly verify a bank account in a *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes). Refresh the page to view the paid invoice.

1. Create an invoice in a sandbox.
2. Under **Payment collection**, select **Request payment in full** > **Manage payment methods**.
3. In the **Payment methods for this invoice** dialog, enable **ACH direct debit**, and click **Save**.
4. Enter the invoice details, and click **Send invoice**.
5. On the invoice details page, under **Details**, click the **Payment page** link.
6. On the Hosted Invoice Page, select **US bank account** > **Test Institution**.
7. Initiate login with the bank and agree to the terms of service.
8. Select the bank account and click **Connect account**.
9. After successfully connecting the account, click **Back** to go to the invoice.
10. Click **Pay** and agree to the terms of service.

### Microdeposits 

You can manually verify bank accounts using microdeposits. In live mode, it takes several days for the transaction to complete. But in a sandbox, the transaction clears immediately and the invoice is paid.

1. Create an invoice in a sandbox.
2. Under **Payment collection**, select **Request payment in full** > **Manage payment methods**.
3. In the **Payment methods for this invoice** dialog, enable **ACH Direct Debit**, and click **Save**.
4. Enter the invoice details, and click **Send invoice**.
5. On the invoice details page, under **Details**, click the **Payment page** link.
6. On the Hosted Invoice Page, select **US bank account**, and then click **Pay**.
7. Click **Enter bank details manually instead** to verify the bank account with microdeposits.
8. In the **Enter bank details** dialog, click **Use test account** to use a [test routing number and bank account](https://docs.stripe.com/payments/ach-direct-debit/accept-a-payment.md#test-account-numbers).
9. After successfully adding the account, click **Back** to go to the invoice.

Next, finish initiating microdeposits in your Stripe account. You can expect an email with instructions within 1-2 business days.

## See also

- [Payment methods](https://docs.stripe.com/invoicing/payment-methods.md)
- [Hosted invoice page](https://docs.stripe.com/invoicing/hosted-invoice-page.md)
- [Invoicing API](https://docs.stripe.com/api/invoices.md)
