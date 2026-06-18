# Revenue Recognition with multiple currencies

Understand the roles of presentment and settlement currencies in Stripe Revenue Recognition.

Two types of currencies are important to recognize revenue:

- Presentment currencies: The currencies that your customers use to pay.
- Settlement currencies: The currencies that you receive payment.

Additionally, you can [choose a functional currency](https://docs.stripe.com/revenue-recognition/revenue-settings.md#functional-currency) in your settings. A functional currency translates all transactions beginning on or after your selected start date to a single currency.

For all transactions with presentment currencies matching one of your settlement currencies, Stripe Revenue Recognition processes journal entries in that currency directly. In this case, no currency conversion takes place because you can receive payment in that currency directly. Transactions with presentment currencies that aren’t supported as a *settlement currency* (The settlement currency is the currency your bank account uses) automatically convert to the default settlement currency for your Stripe account.

Payments and paid *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) use the exchange rate for the actual money movement (that is, what’s reflected on the balance transaction) for revenue recognition. For example, if you collected 10 EUR from a customer that settled in your account as 12 USD, Stripe Revenue Recognition uses 12 USD as the transaction amount.

One-time payments and invoices that are paid immediately when they finalize don’t incur exposure to fluctuating exchange rates or foreign exchange gains or losses.

## FX loss

However, sometimes an invoice is finalized first, and paid later. In this case, the exchange rate might have changed between finalization and payment, creating a need to track gains and losses because of foreign exchange.

For revenue recognition purposes (for example, calculating accounts receivable), any activity that gets booked before an invoice is paid uses an estimated exchange rate at the time the invoice finalizes. The difference between the estimated exchange rate and the actual exchange rate, if any, is added to the FxLoss account.

In this example, the exchange rate changes between when the invoice finalizes and when it’s paid—and assumes your account settles in USD, but the customer is paying in EUR.

- On January 1, an invoice finalizes for 30 EUR. The EUR to USD exchange rate is 1.20
- On February 1, the customer pays the invoice for 30 EUR. The EUR to USD exchange rate is 1.10

Because of the change in exchange rate, we expected to receive 36 USD at the time the invoice finalized, but we only received 33 USD when it was paid, resulting in a net FX loss of 3 USD.

| Account             | Jan    | Feb    |
| ------------------- | ------ | ------ |
| AccountsReceivables | +36.00 | -36.00 |
| Revenue             | +36.00 |        |
| Cash                |        | +33.00 |
| FxLoss              |        | +3.00  |

## FX Loss from refunds and disputes

FxLoss can occur whenever you have a time delay between two operations, which could happen when a payment gets refunded later.

In this example, the exchange rate changes between a one time payment and when it gets refunded—and assume your account settles in USD, and the customer is paying in EUR.

- On January 1, the customer makes a one time payment for 30 EUR. The EUR to USD exchange rate is 1.20.
- On February 1, they receive a refund for 30 EUR. The EUR to USD exchange rate is 1.10

Because of the change in exchange rate, you received 36 USD, but refunded only 33 USD, resulting in a net FX gain of 3 USD.

| Account | Jan    | Feb    |
| ------- | ------ | ------ |
| Revenue | +36.00 |        |
| Cash    | +36.00 | -36.00 |
| Refunds |        | +33.00 |
| FxLoss  |        | -3.00  |

## FX Loss from functional currency

If you enable the [functional currency setting](https://docs.stripe.com/revenue-recognition/revenue-settings.md#functional-currency). Revenue Recognition automatically translates transactions to a single currency and applies the setting to transactions occurring on or after the start date you’ve chosen. This means if a transaction settles in a different currency, Revenue Recognition converts it to the functional currency instead.

In this example, a business settles payments in both EUR and USD, but has set their functional currency to USD:

- On January 1, the business bills the customer for 30 EUR. The EUR to USD exchange rate is 1.20.
- On February 1, the customer pays the 30 EUR invoice. The EUR to USD exchange rate is 1.10.
- The change in the EUR to USD exchange rate between the invoice date and the payment date results in an FX loss of 3 USD.

| Account             | Jan    | Feb    |
| ------------------- | ------ | ------ |
| AccountsReceivables | +36.00 | -36.00 |
| Revenue             | +36.00 |        |
| Cash                |        | +33.00 |
| FxLoss              |        | +3.00  |
