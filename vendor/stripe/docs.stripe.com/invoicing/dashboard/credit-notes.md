# Issue credit notes

Use the Dashboard to adjust or refund finalized invoices with credit notes.

Credit notes are documents that decrease the amount of an `open` or `paid` *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice). The difference between issuing a credit note and adjusting the amount of an invoice by [revising it](https://docs.stripe.com/invoicing/invoice-edits.md) is that a credit note doesn’t void and replace the original invoice. Some example scenarios where you might use credit notes include:

- **You accidentally overbilled a customer**—You accidentally charged your customer 110 USD instead of 100 USD because of a data entry mistake. Use a credit note to give your customer a 10 USD credit for the overcharge.
- **You’re short on inventory**—You billed your customer for five items, but when it’s time to ship them you realize you only have three items left in stock. Use a credit note to refund your customer for the two items they didn’t receive.
- **Discounts**—You and your customer negotiate a discount on an invoice. Instead of voiding the invoice and issuing a new one, you can use a credit note to adjust the amount owed on the existing invoice.

A credit note reduces the amount due without recording any payment. However, if a credit note reduces the balance of an `open` invoice to 0, the invoice status changes to `paid`. For information on invoice statuses, see the [Invoicing overview](https://docs.stripe.com/invoicing/overview.md#invoice-statuses).

> For information about working with credit notes using the API, see [Generate credit notes programmatically](https://docs.stripe.com/invoicing/integration/programmatic-credit-notes.md).

## Get started 

When you issue a credit note for an `open` invoice, it decreases the amount due on the invoice. When you issue a credit note for a `paid` invoice, you credit the customer’s account balance or give them a refund outside of Stripe.

The sum of all credit notes issued for an invoice can’t exceed the ​​total amount of the invoice. For a `paid` invoice, the sum of the refund, credit, and out-of-band payment amounts must equal the credit note total.

When you create a credit note, you can apply credit amounts in three ways:

- Discount a fixed amount from an invoice line item.
- Discount a quantity from an invoice line item. The total discount is the discount quantity times the unit price of that line item.
- Apply a discount to the total invoice amount by adding a custom discount line item with a description, quantity, and unit price. The total discount is the quantity times the unit price.

We recommend discounting invoice line items when possible, since it associates each credit with a line item. Adding a custom discount line item can make reporting and tracking difficult, because the credit isn’t associated with a real invoice line item.

> You can’t combine discount types on an invoice line item. For example, if you discount a line item quantity, then a future credit note can only discount that line item by quantity, not by amount. If you discount a line item amount, then a future credit note can only discount that line item by amount, not by quantity.

## Create a credit note 

You can create credit notes for open or paid invoices.

1. Open the [Invoices page](https://dashboard.stripe.com/test/invoices) in the Dashboard.

2. Select the open or paid invoice you want to add a credit note to.

3. Click **More** and select **Issue a credit note**.

4. Select a reason for the credit note.

5. (*Optional*) Perform the following actions:

   - Edit line item credit quantities or amounts.

   - Click **Add item** to add a custom line item.

   - Click **Set item tax** to select a tax rate to use for credit purposes.

6. If the invoice is `paid`, choose whether to refund the customer’s card, credit their balance, or refund the amount outside of Stripe (for example, cash).

7. Click **Issue credit note** to submit the credit note.

> Open invoices can’t have a credit note with a pending [payment_intent](https://docs.stripe.com/api/invoices/object.md#invoice_object-payment_intent).
![](https://b.stripecdn.com/docs-statics-srv/assets/credit-note-dashboard.d9f67171b43e5ad618bc6d153b86286a.png)

Issue a credit note in the Dashboard

## Credit balances and discounts 

When you issue a credit note on an invoice with an applied [customer credit balance](https://docs.stripe.com/invoicing/customer/balance.md), funds are sometimes credited to the credit balance instead of the initial payment method. For example, if a credit balance of 150 USD is applied to an invoice for 200 USD, then the finalized invoice is for 50 USD. If you issue a credit note for 50 USD or less, the funds are refunded to the customer’s payment method. Anything above 50 USD is added to the customer’s credit balance and is applied to the next invoice.

[Discounts](https://docs.stripe.com/tax/tax-rates.md#discounts) apply proportionally to all of the line items on an invoice. For example, applying a 50% discount to an invoice with 10 line items at 10 USD each changes the amount of each line item to 5 USD. If you then apply a credit note for one line item, it reduces the invoice amount by 5 USD.

Fixed-amount discounts work the same way. If you apply a 10 USD discount to an invoice with 10 line items at 10 USD, each line item is 10% of the sum amount and is discounted by 10% * 10 USD = 1 USD. The amount of each line item becomes 9 USD. If you then apply a credit note for one line item, it reduces the invoice amount by 9 USD.

If you want to credit the original line item amount, you can make up the difference by adding a custom discount line item to the credit note. For example, if a discount reduced a line item’s credit amount from 10 USD to 9 USD, you can add a custom discount line item for 1 USD.

## Voiding credit notes 

You can void a credit note only if it’s on an open invoice. Voiding a credit note reverses its adjustment, increasing the amount due on the invoice by the amount of the credit note.

To void a credit note in the Dashboard, click the overflow menu (⋯) at the top right of the credit note, then select **Void credit note**.

## Crediting negative line items 

You can also credit negative invoice line items.

The following restrictions apply:

- The total amount of the credit note must remain positive.
- The total amount credited to a negative line item must be negative.
- The total amount credited to a negative line item can’t be less than the line item amount.

You also can’t credit a negative amount on a custom credit note line item. We only support negative amounts on credit note line items that are tied to invoice line items.

### Custom credit notes

When using [custom_line_item](https://docs.stripe.com/api/credit_notes/create.md#create_credit_note-lines), you must provide the credit amount using `unit_amount` (or `unit_amount_decimal`) and quantity, instead of a flat amount. You can describe the line item with description, and apply taxes using either `tax_rates` or `tax_amounts`, but not both.

## See also

- [Stripe data](https://docs.stripe.com/data.md)
