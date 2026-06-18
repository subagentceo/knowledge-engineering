# Revenue Recognition with subscriptions and invoicing

Learn how revenue recognition works with subscriptions and invoices.

Because of the detailed information available on subscriptions and *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), Stripe Revenue Recognition can accurately defer and recognize revenue for these resources. Revenue recognition treats each invoice line item and subscription item as its own performance obligation.

Revenue recognition operates on finalized invoices, not on the status of the subscription itself. Revenue recognition amortizes revenue by the second, but our example uses a daily interval.

## Licensed subscriptions

Licensed subscriptions are subscriptions that generate invoices for a service offered in an upcoming service period. At the end of the period, the subscription generates a new invoice for the next period.

Each subscription item corresponds to a single line item on the invoice, and automatically populates the period for that line item with the period start and end for the subscription item.

Let’s take a look at an example and timeline for a simple monthly subscription.

- On January 15, a customer starts a monthly subscription that costs 31 USD, which generates an invoice that gets finalized.

In this case, the period of service is from January 15 to February 14. The 31 USD is therefore recognized over 17 days in January and 14 days in February. If you inspected the account balances at the end of January, you’d see that 17 USD of revenue was recognized, and 14 USD of revenue remains deferred (to be recognized in February).

| Account         | Jan    |
| --------------- | ------ |
| Revenue         | +17.00 |
| DeferredRevenue | +14.00 |

## Upgrades and downgrades

Subscriptions can be upgraded and downgraded mid-month, and revenue needs to be recognized accordingly. If an invoice is cut mid-month to handle the prorated charges, the revenue schedule is also adjusted accordingly.

This next example is for a subscription that’s upgraded mid-month.

- On April 1, a customer starts a monthly subscription for 90 USD, which generates and finalizes an invoice.
- On April 21, the customer upgrades the subscription to cost 120 USD instead, which generates an invoice that accounts for the remaining 10 days of the month.

In this example, the customer receives 20 days of service with the 90 USD monthly subscription (60 USD in value) and 10 days of service with the 120 USD monthly subscription (40 USD in value). Therefore, in April, the recognized revenue is 100 USD.

## Subscription cancellations

Revenue recognition operates on finalized invoices, not subscription status. When a subscription is canceled, the revenue schedule for any already-finalized invoice remains unchanged. Stripe continues to amortize the revenue over the original service period defined on the invoice line items, regardless of whether the subscription is active, canceled, or otherwise modified.

This next example is for a 3-month subscription that’s canceled after the first month.

- On January 1, a customer starts a 3-month subscription for 90 USD, which generates and finalizes an invoice with a service period from January 1 to March 31.
- On January 31, the customer cancels the subscription. The cancellation doesn’t result in any refund on the invoice.

In this case, revenue recognition continues to amortize the 90 USD over the original 3-month service period. Canceling the subscription doesn’t change the journal entries because they’re based on the finalized invoice, not the subscription status. If you inspected the account balances at the end of March, you’d see the following:

| Account         | Jan    | Feb    | Mar    |
| --------------- | ------ | ------ | ------ |
| Revenue         | +31.00 | +28.00 | +31.00 |
| DeferredRevenue | +59.00 | -28.00 | -31.00 |

## Standalone invoices

The algorithm for recognizing revenue for standalone invoices is the same as that of a licensed subscription—the main difference is that line item periods aren’t automatically populated.

To recognize revenue correctly, remember to set the period for each invoice line item. If you don’t set a period on an invoice line item, the amount on that invoice line item is recognized immediately when the invoice finalizes. If you need to override or add a new service period, use the [Data Import feature](https://docs.stripe.com/revenue-recognition/data-import.md) to configure your invoice data, or set [rules](https://docs.stripe.com/revenue-recognition/rules.md) to customize revenue treatments on different invoices.

In this example, an invoice has two line items, one with a period set, and one without.

- On January 15, you create an invoice and finalize it with
  - A line item for 31 USD with a period from January 15 to February 14.
  - A line item for 5 USD with no period set.

In this case, the invoice is for a total of 36 USD. The 31 USD is recognized over 17 days in January and 14 days in February, but the 5 USD is immediately recognized on January 15. If you inspected the account balances at the end of January, you’d see that 22 USD (17 + 5) of revenue was recognized, and 14 USD of revenue remains deferred (to be recognized in February).

| Account         | Jan    |
| --------------- | ------ |
| Revenue         | +22.00 |
| DeferredRevenue | +14.00 |

## Uncollectible invoices

When an invoice is marked as uncollectible, we clear the accounts receivable account since we no longer expect payment.

Parts of the revenue for the invoice might have already been recognized. Upon marking it uncollectible, the recognized revenue is offset by contra revenue in the bad debt account.

Parts of the revenue for the invoice might still be deferred. Upon marking it uncollectible, the remaining deferred revenue is cleared.

In this example the invoice for a subscription finalizes and is later marked uncollectible.

- On January 15, a customer starts a monthly subscription for 31 USD. The invoice for 31 USD gets created and finalized.
- On February 1, the invoice is marked as uncollectible.

In this case, the customer received 17 days of service, but didn’t pay. The 17 USD that’s recognized at that point would be considered bad debt. The 14 USD in deferred revenue for a service that has yet to be provided is zeroed out. If you inspected the account balances on February 1, you’d see the following:

| Account            | Jan    | Feb    |
| ------------------ | ------ | ------ |
| AccountsReceivable | +31.00 | -31.00 |
| Revenue            | +17.00 |        |
| DeferredRevenue    | +14.00 | -14.00 |
| BadDebt            |        | +17.00 |

An uncollectible invoice might still be paid. When the invoice is paid, the bad debt account is cleared out using a part of the received cash amount. The remaining cash amount goes to the recoverables account.

## Voided invoices

When you void an invoice, the invoice has reached a terminal state. We therefore clear the accounts receivable account since the invoice can no longer be paid.

You might have already recognized parts of the revenue for the invoice. Upon voiding, the recognized revenue is offset by contra revenue in the voids account.

Parts of the revenue for the invoice might still be deferred. Upon voiding, the remaining deferred revenue is cleared.

In this example, the invoice for a subscription is finalized and later voided.

- On January 15, a customer starts a monthly subscription for 31 USD. The invoice for 31 USD gets created and finalized.
- On February 1, the invoice is voided.

In this case, the customer received 17 days of service, but didn’t pay. The 17 USD that’s recognized at that point would be voided. The 14 USD in deferred revenue for service that has yet to be provided, is zeroed out. If you inspected the account balances on February 1, you’d see the following:

| Account            | Jan    | Feb    |
| ------------------ | ------ | ------ |
| AccountsReceivable | +31.00 | -31.00 |
| Revenue            | +17.00 |        |
| DeferredRevenue    | +14.00 | -14.00 |
| Voids              |        | +17.00 |

## Credit notes

Credit notes allow the amount due on an invoice to be reduced after it finalizes. Since the expected payment is reduced, accounts receivable are reduced by the amount of the credit note.

If the credit note has no line items, the credit note is divided proportionally among all line items, based on the line item amounts. If the credit note has a specified line item, the credit note only applies to that line item.

You might’ve already recognized parts of the revenue for the invoice. When a credit note is issued, recognized revenue is proportionally offset by contra revenue in the credit notes account, based on the proportion of revenue that you recognized.

Parts of the revenue for the invoice might still be deferred. When a credit note is issued, deferred revenue is reduced, based on the proportion of revenue that’s still deferred.

In this example, the invoice for a subscription finalizes and a credit note is issued later.

- On January 1, a customer starts a three month subscription for 90 USD. The invoice for 90 USD gets created and finalized.
- On February 1, a credit note of 45 USD is issued.

At the end of March, the account balances would resemble the following:

| Account            | Jan    | Feb    | Mar    |
| ------------------ | ------ | ------ | ------ |
| AccountsReceivable | +90.00 | -45.00 |        |
| Revenue            | +31.00 | +14.00 | +15.50 |
| DeferredRevenue    | +59.00 | -43.50 | -15.50 |
| CreditNotes        |        | +15.50 |        |

## Tax liability

To accurately handle your tax liability on invoices and subscriptions, use the `default_tax_rates` and `tax_rates` attribute on those resources to assign tax rates. If tax is set up as a regular item, Stripe Revenue Recognition doesn’t automatically differentiate between revenue and tax unless you configure a [custom rule](https://docs.stripe.com/revenue-recognition/rules.md).

It’s worth noting that taxes aren’t recognizable as revenue. For example, an invoice for 50 USD with an exclusive tax of 5 USD has 50 USD in recognizable revenue and 5 USD of tax liability. The invoice and accounts receivable totals are both 55 USD.

In this example the invoice has an exclusive tax rate.

- On January 1, a customer starts a monthly subscription for 31 USD with an exclusive tax rate of 10%. The total due amount on the generated invoice is 34.10 USD.
- The invoice is paid immediately.

| Account      | Jan    |
| ------------ | ------ |
| Revenue      | +31.00 |
| Cash         | +34.10 |
| TaxLiability | +3.10  |

Similarly, let’s take a look at an example for an invoice with an inclusive tax rate.

- On January 1, a customer starts a monthly subscription for 31 USD with an inclusive tax rate of 10%. The total due amount on the generated invoice is 31 USD.
- The invoice is paid immediately.

| Account      | Jan    |
| ------------ | ------ |
| Revenue      | +27.90 |
| Cash         | +31.00 |
| TaxLiability | +3.10  |

## Customer credit balance

The customer credit balance is a balance on a customer that gets applied to future invoices automatically. Because the customer credit balance is treated as an additional payment (rather than a discount, for example), applying it to an invoice doesn’t reduce the tax liability for that invoice.

Handling the customer credit balance involves what we call the customer balance account, which tracks the interactions between customer credit balance and invoices.

In this example, an invoice is created for a customer that maintains a customer credit balance.

- On January 15, an invoice for 31 USD is created and finalized. None of the line items have a service period, so revenue is immediately recognized.
- The customer has -11 USD in their customer credit balance. Stripe automatically applies -11 USD to the invoice and adjusts the customer credit balance to 0 USD.
- The customer pays 20 USD.

In this case, the resulting account balances would look like

| Account         | Jan    |
| --------------- | ------ |
| Cash            | +20.00 |
| Revenue         | +31.00 |
| CustomerBalance | -11.00 |

## Cash application

You can accept multiple, smaller payments against an invoice. Learn how to create and attach payments in [partial payments for invoices](https://docs.stripe.com/invoicing/partial-payments.md). This section explains how Revenue Recognition reflects applying and unapplying payments in your ledgers.

### Apply a standalone payment to an invoice

Before applying, we track the payment and the invoice separately.

Example timeline:

- On January 10, you receive a standalone payment of 20 USD (not yet attached to any invoice).
- On January 15, an invoice for 31 USD finalizes for a service period of January 15 to February 14.
- On February 1, you apply the 20 USD payment to the invoice.

Standalone one-time payments behave as described in [One-time payments](https://docs.stripe.com/revenue-recognition/methodology.md#one-time-payments).

Balances at the end of January (before allocation), shown separately:

**Standalone payment:**

| Account | Jan    |
| ------- | ------ |
| Cash    | +20.00 |
| Revenue | +20.00 |

**Invoice:**

| Account            | Jan    |
| ------------------ | ------ |
| AccountsReceivable | +31.00 |
| Revenue            | +17.00 |
| DeferredRevenue    | +14.00 |

After allocation, we remove the standalone payment entries and replace them with payment entries within the invoice, reducing its accounts receivable. Balances at the end of February (before applying), shown separately:

**Standalone payment:**

| Account | Jan    | Feb    | Total |
| ------- | ------ | ------ | ----- |
| Cash    | +20.00 | -20.00 | 0.00  |
| Revenue | +20.00 | -20.00 | 0.00  |

**Invoice:**

| Account            | Jan    | Feb    | Total  |
| ------------------ | ------ | ------ | ------ |
| AccountsReceivable | +31.00 | -20.00 | +11.00 |
| Revenue            | +17.00 | +14.00 | +31.00 |
| DeferredRevenue    | +14.00 | -14.00 | 0.00   |

### Unapplying a payment

When you unapply a payment, we remove the payment entries for the invoice and record the payment as a standalone payment. If the invoice was previously paid because of the application, it transitions back to `open`.

Example timeline (continuing the previous example):

- On March 5, you unapply the 20 USD payment from the invoice.

This removes the application and increases accounts receivable, returning the payment to an unapplied state. The tables below show monthly balances, including the February application and the March unapplying:

**Standalone payment:**

| Account | Jan    | Feb    | Mar    | Total  |
| ------- | ------ | ------ | ------ | ------ |
| Cash    | +20.00 | -20.00 | +20.00 | +20.00 |
| Revenue | +20.00 | -20.00 | +20.00 | +20.00 |

**Invoice:**

| Account            | Jan    | Feb    | Mar    | Total  |
| ------------------ | ------ | ------ | ------ | ------ |
| AccountsReceivable | +31.00 | -20.00 | +20.00 | +31.00 |
| Revenue            | +17.00 | +14.00 | 0.00   | +31.00 |
| DeferredRevenue    | +14.00 | -14.00 | 0.00   | 0.00   |

Correction behavior remains unchanged. The posting period for the unallocation depends on the payment date:

- If the accounting period that includes the payment date is open, the unapplied payment posts there.
- If that period is closed, we post a correction to your latest open period. See [Revenue Recognition accounting period control](https://docs.stripe.com/revenue-recognition/revenue-settings/accounting-period-control.md) for details on closing and reopening periods.
