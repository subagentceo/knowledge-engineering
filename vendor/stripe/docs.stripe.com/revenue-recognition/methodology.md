# How Revenue Recognition works

Understand how Stripe Revenue Recognition calculates, defers, and reports your revenue.

Recognizing revenue is a fundamental part of accrual accounting. Generally accepted accounting principles (GAAP) state that you recognize revenue when you realize and earn it, which might be earlier or later than when you actually receive payments. You must correctly recognize and defer revenue to have the most accurate insights into your business profitability and financial health.

Stripe Revenue Recognition helps you simplify the process of recognizing revenue. This feature includes:

- Recognized and deferred [revenue summaries](https://docs.stripe.com/revenue-recognition/reports/monthly-summary.md)
- Downloadable accounting [reports and waterfall charts](https://docs.stripe.com/revenue-recognition/reports/waterfall.md)
- Interactive revenue numbers for [full audit transparency](https://docs.stripe.com/revenue-recognition/reports/audit-numbers.md)
- Configurable accounting period controls and [revenue recognition rules](https://docs.stripe.com/revenue-recognition/rules.md)

Revenue Recognition integrates with other Stripe objects to provide intelligent default settings for how to recognize revenue.

Revenue Recognition automatically calculates all transactions that happen within Stripe, including subscriptions, invoices, one-time payments, refunds, disputes, and so on, timed to the second.

## Who needs Revenue Recognition? 

Revenue Recognition is critical for many types of businesses, especially:

- Public companies or large businesses with over 25 million USD in annual revenue because they’re legally required to comply with ASC 606 and GAAP and IFRS accounting standards.
- Startups that need to follow accrual accounting to raise money from investors or get a loan from a financial institution.
- Subscription and service-based businesses.
- Businesses where customers pay up front before receiving a good or service.

As businesses grow, revenue recognition becomes more complex due to larger product lines and increased payment volumes. Revenue recognition can be especially complex for [subscription](https://docs.stripe.com/subscriptions.md) businesses that need to manage subscription changes, handle refunds and disputes, and manage prorations. These subscription updates can complicate the process of recognizing and deferring revenue accurately and compliantly.

## Chart of accounts 

Stripe built Revenue Recognition on top of a double-entry accounting ledger that tracks debits and credits resulting from your business activity. To get the most out of it, it helps to understand the default chart of accounts and the debits and credits that impact those accounts.

#### Income statement accounts

| Account                               | Debit or Credit type   | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Revenue                               | Revenue (credit)       | Recognizable portion of finalized invoices, prorated invoice items, and usage-based billing that count towards revenue during the month. For example, if an invoice line item is for 90 USD with 10 USD in taxes, the total invoice is 100 USD, but the recognizable portion is only 90 USD.                                                                                                                              |
| Refunds                               | Contra revenue (debit) | Portion of the refunded amount previously recognized. For example, if you issue a 120 USD refund on an annual subscription during the second month, 20 USD for the first 2 months is contra revenue. The remaining 100 USD is adjusted and reflected in your deferred revenue balance in the balance sheet.                                                                                                               |
| Disputes                              | Contra revenue (debit) | Portion of the disputed amount previously recognized. For example, if there’s a 120 USD dispute on an annual subscription during the second month, 20 USD for the first 2 months is contra revenue. The remaining 100 USD is adjusted and reflected in your deferred revenue balance in the balance sheet.                                                                                                                |
| Credit notes                          | Contra revenue (debit) | Portion of the credit note amount previously recognized. For example, if there’s a 120 USD credit note on an annual subscription during the second month, 20 USD for the first 2 months is contra revenue. The remaining 100 USD is adjusted and reflected in your deferred revenue balance in the balance sheet.                                                                                                         |
| Bad debt                              | Contra revenue (debit) | Previously recognized revenue from invoices that have been marked as uncollectible.                                                                                                                                                                                                                                                                                                                                       |
| Voids                                 | Contra revenue (debit) | Previously recognized revenue from invoices that have been voided.                                                                                                                                                                                                                                                                                                                                                        |
| Unbilled voids                        | Contra revenue (debit) | Previously recognized revenue from prorated invoice items that have been deleted. These items are sometimes deleted when they generate unbilled accounts receivable and revenue.                                                                                                                                                                                                                                          |
| Transfer                              | Contra revenue (debit) | Previously recognized revenue from separate transfers.                                                                                                                                                                                                                                                                                                                                                                    |
| Discounts                             | Contra revenue (debit) | The recognized revenue from invoices that received discounts. This account is only used when you enable [Record discounts as contra revenue](https://docs.stripe.com/revenue-recognition/revenue-settings.md#book-discounts-as-contra-revenue) in your settings.                                                                                                                                                          |
| External asset refunds                | Contra revenue (debit) | Previously recognized revenue from refunds on invoices that were marked as paid outside of Stripe. When you refund an out-of-band payment, the recognized portion reduces through this contra revenue account, and the external asset account decreases accordingly.                                                                                                                                                      |
| Customer balance adjustments          | Expenses (debit)       | Expenses incurred due to manual adjustments to a customer credit balance or exclusion associated with post-paid credit notes on customer balance.                                                                                                                                                                                                                                                                         |
| External customer balance adjustments | Expenses (debit)       | Expenses incurred due to exclusion associated with post-paid credit notes on external customer balance.                                                                                                                                                                                                                                                                                                                   |
| Underpayments                         | Expenses (debit)       | Expenses incurred due to transfers that underpay an invoice, as used by the [customer credit balance](https://docs.stripe.com/invoicing/bank-transfer.md#underpayments) payment method.                                                                                                                                                                                                                                   |
| Fees                                  | Expenses (debit)       | Expenses incurred due to Stripe fees.                                                                                                                                                                                                                                                                                                                                                                                     |
| Recoverables                          | Gains (credit)         | Recovered funds that aren’t attributable to revenue. For example, if you have a 120 USD dispute on an annual subscription during the second month, 20 USD for the first 2 months is contra revenue and the remaining 100 USD is adjusted from the deferred revenue balance. If you win the dispute and 120 USD is returned to you, 20 USD is reflected as revenue and the remaining 100 USD is reflected as recoverables. |
| Exclusion                             | Gains (credit)         | Excluded funds that aren’t attributable to revenue. To exclude transactions, set up [exclusion rules](https://docs.stripe.com/revenue-recognition/rules/create-a-rule.md#treatments) or use [exclusion import](https://docs.stripe.com/revenue-recognition/data-import.md#exclusion-import).                                                                                                                              |
| Fx loss                               | Losses (debit)         | Total loss due to foreign currency exchange rates.                                                                                                                                                                                                                                                                                                                                                                        |
| Other loss                            | Losses (debit)         | The portion of contra revenue that exceeds the total invoice represents an overcompensation in cash to the customer. For example, if a 100 USD invoice is partially refunded by 80 USD and then disputed for an additional 80 USD, 60 USD will be categorized as “Other loss.”                                                                                                                                            |
| Connect transfer loss                 | Losses (debit)         | Total loss due to destination charge refund, and the transfer reversal will reverse the ConnectTransferLoss account.                                                                                                                                                                                                                                                                                                      |

#### Balance sheet accounts

| Account                      | Debit/Credit type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accounts receivable          | Assets (debit)       | AccountsReceivable represents the amount you bill to customers and might be inclusive of taxes and other amounts that aren’t included in recognizable revenue. This account increases when invoices are finalized and decreases when invoices are paid. The ending balance reflects the amount due from customers at the end of each month.                                                                                                                                                                                                                                          |
| Cash                         | Assets (debit)       | Cash is the net cash amount received. **This doesn’t include Stripe fees or payouts.** It’s calculated by subtracting refunds, disputes, and dispute reversals from your Stripe Balance Net Charge amount. Cash increases when customers pay their outstanding invoice balance. This also results in a corresponding decrease in AccountsReceivable.                                                                                                                                                                                                                                 |
| Deferred revenue             | Liabilities (credit) | Services that have been invoiced but not recognized as revenue. Deferred revenue is a liability on your balance sheet. It represents cash you’ve collected for services you haven’t yet delivered. Stripe enables [long-term deferred revenue](https://docs.stripe.com/revenue-recognition/revenue-settings.md#long-term-deferred-revenue) by default, and the month-end balance only includes amounts expected to be recognized within the next 12 accounting periods. If you disable this setting, the balance includes all deferred revenue, regardless of service period length. |
| Long-term deferred revenue   | Liabilities (credit) | Non-current portion of deferred revenue for service periods extending beyond 12 accounting periods. Amounts automatically reclassify to deferred revenue when they enter the 12-period horizon. Revenue Recognition uses this account only when you enable the [long-term deferred revenue setting](https://docs.stripe.com/revenue-recognition/revenue-settings.md#long-term-deferred-revenue). It’s enabled by default.                                                                                                                                                            |
| Unbilled deferred revenue    | Liabilities (credit) | Represents deferred revenue associated with revenue contracts that haven’t been billed yet. This liability is created when a contract is signed and represents the obligation to deliver services that haven’t been invoiced. This is only used when working with revenue contracts.                                                                                                                                                                                                                                                                                                 |
| Tax liability                | Liabilities (credit) | The tax component of issued invoices. The ending balance represents the tax amount invoiced to customers but is still owed to relevant tax authorities.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Unbilled accounts receivable | Assets (debit)       | Transactions (such as prorations due to upgrades or downgrades) that have service periods that start before an invoice is issued. The ending balance reflects the transactions that have accrued revenue but haven’t been invoiced yet.                                                                                                                                                                                                                                                                                                                                              |
| Contract asset               | Assets (debit)       | Represents revenue earned under revenue contracts before the corresponding billing occurs. This asset is created when a contract is signed and decreases as revenue is recognized and billing happens. This is only used when working with revenue contracts.                                                                                                                                                                                                                                                                                                                        |
| External asset               | Assets (debit)       | Invoices you manually mark as paid when you receive funds outside of Stripe. The ending balance reflects the amount of invoices that were marked as paid using the Stripe Dashboard. This reduces AccountsReceivable.                                                                                                                                                                                                                                                                                                                                                                |
| Customer balance             | Liabilities (credit) | Credits that your customers accrue. The ending balance reflects the amount of invoices that were paid using customer credit balance. This reduces AccountsReceivable.                                                                                                                                                                                                                                                                                                                                                                                                                |
| External customer balance    | Liabilities (credit) | External credits that your customers accrue. The ending balance reflects the amount of credit notes that credit outside of Stripe.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Customer cash balance        | Assets (debit)       | The cash balance for a customer. Funds can be put into or taken out of the account by either the customer or merchant.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Customer cash adjustment     | Liabilities (credit) | Liability incurred due to adjustments to the customer’s cash balance associated with bank transfer payments. This balance represents how much of the paid cash balance has not been used.                                                                                                                                                                                                                                                                                                                                                                                            |
| Passthrough fees             | Liabilities (credit) | Passthrough fees occur when you’re expected to collect cash from a customer on behalf of a third party. The account can be set up by rules.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Deferred tax liability       | Liabilities (credit) | The deferred tax liability of issued invoices. The month-end balance reflects the amount expected to be booked as tax liability in future periods. Stripe Revenue Recognition deferred tax liability support is currently in private beta.                                                                                                                                                                                                                                                                                                                                           |
| Deferred discounts           | Liabilities (credit) | The deferred discount of issued invoices. The month-end balance reflects the amount expected to be booked as a discount in future periods. Revenue Recognition uses this account only when you enable [Record discounts as contra revenue](https://docs.stripe.com/revenue-recognition/revenue-settings.md#book-discounts-as-contra-revenue) in your settings.                                                                                                                                                                                                                       |
| Pending cash                 | Assets (debit)       | Cash from payments that haven’t been confirmed. It can take several days to confirm whether a payment is successful. When the amount is confirmed, it’s transferred to the Cash account. This happens with [delayed notification payment methods](https://docs.stripe.com/payments/payment-methods.md#payment-notification) like ACH debit.                                                                                                                                                                                                                                          |

## Data modeling 

See the following descriptions of how Revenue Recognition handles common Stripe resources using data modeling.

### Subscriptions and Invoicing 

Subscriptions and invoices are higher-level resources that contain detailed information about each transaction.

Subscriptions create invoices on each cycle, with each subscription item corresponding to an invoice line item. The period of each line item is automatically populated with the period of the subscription item.

Revenue Recognition treats each invoice line item as its own performance obligation. When the invoice finalizes, Revenue Recognition defers the total recognizable amount and subsequently amortizes it evenly over the period of each invoice line item.

If you don’t set a period on an invoice line item, Revenue Recognition recognizes the full amount on the invoice line item when the invoice is finalized. Use the [Data Import feature](https://docs.stripe.com/revenue-recognition/data-import.md) to configure your invoice data, or set [rules](https://docs.stripe.com/revenue-recognition/rules.md) to customize when and how invoice line items are recognized.

For more details and examples that show how Revenue Recognition handles subscriptions and invoices with specific scenarios involving upgrades, downgrades, discounts, taxes, and so on, review [Subscriptions and Invoicing](https://docs.stripe.com/revenue-recognition/methodology/subscriptions-and-invoicing.md).

### One-time payments 

One-time payments created through [Checkout](https://docs.stripe.com/payments/checkout.md) contain information about the product, price, and tax.

One-time payments you create in the Dashboard or through the [Charges](https://docs.stripe.com/api/charges.md) and [Payment Intents](https://docs.stripe.com/api/payment_intents.md) APIs don’t include invoice-level details, such as a service period or *fulfillment* (Fulfillment is the process of providing the goods or services purchased by a customer, typically after payment is collected). By default, Revenue Recognition recognizes these payments immediately when the payment occurs.

[Import data](https://docs.stripe.com/revenue-recognition/data-import.md) to add a service period or split a payment across multiple revenue recognition schedules. This lets you override the default behavior and define rules based on payment amount, description, and customer email.

> To incorporate a fulfillment schedule into your revenue recognition reports, you must first [import the data](https://docs.stripe.com/revenue-recognition/data-import.md).

For a one-time payment of 10 USD, the journal entries look like this:

| Debit              | Credit             | Amount |
| ------------------ | ------------------ | ------ |
| AccountsReceivable | DeferredRevenue    | +10.00 |
| Cash               | AccountsReceivable | +10.00 |
| DeferredRevenue    | Revenue            | +10.00 |

This nets out to leave the following end state:

| Account | Amount |
| ------- | ------ |
| Cash    | +10.00 |
| Revenue | +10.00 |

### Refunds and disputes 

Revenue Recognition handles refunds and disputes by generating contra revenue to offset already recognized revenue.

For transactions with both already-recognized and deferred revenue, the recognized portion is added to either the refunds or disputes contra revenue account, which cancels out the deferred revenue.

For more details and examples that show how Revenue Recognition handles refunds and disputes, review the [Refunds and Disputes](https://docs.stripe.com/revenue-recognition/methodology/refunds-and-disputes.md) page.

### External transactions 

You can track revenue collected outside of Stripe using invoices. Configure the invoice as you would any other, and then mark the invoice as paid either directly in the Dashboard, or through the `paid_out_of_band` option in the API.

Invoices marked as paid outside of Stripe contribute not to the cash account, but rather to the external asset account. If you later refund an invoice that was marked as paid outside of Stripe, the refund reduces the external asset account and the previously recognized revenue is offset by the external asset refunds account (contra revenue).

> To consolidate your financial data from outside Stripe to Stripe Revenue Recognition, review [Data import](https://docs.stripe.com/revenue-recognition/data-import.md).

### Multi-currency 

If your business handles transactions in multiple currencies, accurately recognizing revenue can be complicated.

Revenue Recognition processes transactions and generates journal entries based on your account’s settlement currencies. Transactions with presentment currencies that aren’t supported as settlement currencies are automatically converted to your account’s default *settlement currency* (The settlement currency is the currency your bank account uses).

For payments and paid invoices, we use the exchange rate for the actual money movement (that is, reflected on the balance transaction). If you incur a time delay between issuing a bill (for example, an invoice) and it getting paid, the difference in amounts because of changing exchange rates between the two times is added to the FxLoss account.

For more details and examples that show how Revenue Recognition handles multiple currencies, review [Multi-currency](https://docs.stripe.com/revenue-recognition/methodology/multi-currency.md).

## Journal entries 

Every billing activity in Stripe generates a set of journal entries. A journal entry is a record of a transaction. Each journal entry consists of a debit and a credit account. For example, an entry which finalizes an invoice would debit AccountsReceivable and credit DeferredRevenue. Paying an invoice would debit Cash and credit AccountsReceivable.

These entries can occur in asset, liability, equity, expense, or revenue accounts. You can learn more about the definitions of each account that will appear in a journal entry under our [Chart of accounts](https://docs.stripe.com/revenue-recognition/methodology.md#chart-of-accounts) section.

The following table shows the applicable billing activities for common journal entries. You can export journal entries to CSV using the debits and credits report, which you can find on the [Reports tab](https://dashboard.stripe.com/revenue-recognition) in the Dashboard. You can also download debits and credits reports by event type, which provide a brief description of the recorded event and can help you understand each journal entry.

> The following table isn’t the complete set of entries. We periodically update the entries. If you need help with a specific entry, you can [create a support ticket](https://support.stripe.com/contact/email?topic=financial_reports).

| Debit                        | Credit                       | Definition                                                                                                                                           |
| ---------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounts receivable          | Deferred revenue             | Invoice being finalized                                                                                                                              |
|                              | Unbilled accounts receivable | Unbilled invoice item being invoiced                                                                                                                 |
|                              | Passthrough fees             | Finalize an invoice with passthrough fees                                                                                                            |
|                              | Tax liability                | Finalize an invoice with tax                                                                                                                         |
| Bad debt                     | Accounts receivable          | Mark an invoice as uncollectible                                                                                                                     |
|                              | Pending cash                 | Mark an invoice with a pending ACH as uncollectible                                                                                                  |
|                              | Recoverables                 | Mark an invoice which is partially paid with customer balance as uncollectible                                                                       |
| Cash                         | Accounts receivable          | Invoice is paid                                                                                                                                      |
|                              | Customer balance             | Paying for a negative customer balance                                                                                                               |
|                              | Disputes                     | Dispute won                                                                                                                                          |
|                              | Exclusion                    | Cash is excluded                                                                                                                                     |
|                              | Pending cash                 | ACH paying invoice is confirmed                                                                                                                      |
|                              | Recoverables                 | Applies to multiple recoverables cases when the **Recover as gains** setting is enabled, including dispute won, refund failed, or uncollectible paid |
|                              | Refunds                      | Refund failed if the **Recover as gains** setting is off                                                                                             |
| Connect transfer loss        | Cash                         | Loss from a transfer                                                                                                                                 |
| Credit notes                 | Accounts receivable          | Prepaid credit note is issued on an unpaid invoice                                                                                                   |
|                              | Customer balance             | Post paid credit note credits customer balance                                                                                                       |
|                              | External customer balance    | Post paid credit note credits external customer balance                                                                                              |
| Customer balance             | Customer balance adjustments | Reduce the amount owed by the customer                                                                                                               |
| Customer balance adjustments | Customer balance             | Increase the amount owed by the customer                                                                                                             |
| Deferred revenue             | Cash                         | Caused by Refunds and Disputes                                                                                                                       |
|                              | Revenue                      | Revenue is recognized                                                                                                                                |
| External asset               | Accounts receivable          | Mark an invoice as paid outside of Stripe                                                                                                            |
| External asset refunds       | External asset               | Refund an invoice that was marked as paid outside of Stripe                                                                                          |
| Disputes                     | Cash                         | Dispute occurs                                                                                                                                       |
| Fees                         | Cash                         | Stripe fees incurred during payment processing                                                                                                       |
| FX loss                      | Accounts receivable          | Reduce the settlement amount due to FX changes between invoice finalization and payment                                                              |
| Other loss                   | Accounts receivable          | Reduce the settlement amount due to other losses, such as excess refunds                                                                             |
| Refunds                      | Cash                         | Refund                                                                                                                                               |
| Tax liability                | Customer balance             | Credit note on an invoice with tax, and it credits customer balance                                                                                  |
|                              | External customer balance    | Credit note on an invoice with tax, and it credits external customer balance                                                                         |
| Unbilled accounts receivable | Revenue                      | Revenue recognized on unbilled invoice item                                                                                                          |
| Unbilled voids               | Unbilled accounts receivable | Unbilled invoice item is deleted                                                                                                                     |
| Voids                        | Accounts receivable          | Void an invoice                                                                                                                                      |
|                              | Bad debt                     | Void an uncollectible invoice                                                                                                                        |
|                              | Customer balance             | Void an invoice partially paid with customer balance                                                                                                 |

The activities above are all based on positive amounts. You can reverse these billing activities. These reverse activities occur when activities are triggered on negative invoice line item amounts.

## Negative line items 

A negative line item occurs when the value of the line item becomes higher than the amount it’s paid for. This occurs typically during a subscription downgrade or upgrade when the product tier changes.

Here is an example of journal entries which contains a negative line item caused by a downgrade:

- On April 1, the invoice is generated for a monthly subscription worth 90 USD and the customer pays for it.
- On April 21, the customer requests a downgrade of their service to a 30 USD subscription. This results in 2 unbilled line items for the remaining time of the subscription.
  - il_1  is for the remaining time on new plan worth 10 USD
  - il_2 is for the remaining time of old plan worth -30 USD
- On May 1, the invoice is generated containing the line items generated by the downgrade as well for the new line item, il_3, representing the month of May. The customer pays for the invoice on the same day.
- On May 4, the customer requests a full refund on the invoice for May, resulting in full refunds on the line item created by the downgrade as well as the new line item for May. We process the refund.

| Date       | Debit                        | Credit                       | Amount | Line Item |
| ---------- | ---------------------------- | ---------------------------- | ------ | --------- |
| 2025-04-21 | Unbilled accounts receivable | Revenue                      | 10 USD | il_1      |
|            | Revenue                      | Unbilled accounts receivable | 30 USD | il_2      |
| 2025-05-01 | Accounts receivable          | Deferred revenue             | 30 USD | il_3      |
|            | Cash                         | Accounts receivable          | 30 USD | il_3      |
|            | Deferred revenue             | Revenue                      | 30 USD | il_3      |
|            | Accounts receivable          | Unbilled accounts receivable | 10 USD | il_1      |
|            | Cash                         | Accounts receivable          | 10 USD | il_1      |
|            | Unbilled accounts receivable | Accounts receivable          | 30 USD | il_2      |
|            | Accounts receivable          | Cash                         | 30 USD | il_2      |
| 2025-05-04 | Refunds                      | Cash                         | 10 USD | il_1      |
|            | Cash                         | Refunds                      | 30 USD | il_2      |
|            | Revenue                      | Cash                         | 30 USD | il_3      |
