# Revenue Recognition transaction overrides

Learn how to make manual corrections to your revenue recognition reports.

> Stripe will soon deprecate the transaction override feature. Use the [data import feature](https://docs.stripe.com/revenue-recognition/data-import.md) instead.

It’s possible for the information on a transaction to become inaccurate for revenue recognition purposes. This can happen for a number of reasons, such as human error or evolving terms of a sale. The transaction override feature allows you to make corrections, regardless of when you created the transaction.

## Creating a transaction override 

You can find the transaction overrides section at the bottom of the Revenue Recognition page.
![Add transaction override modal](https://b.stripecdn.com/docs-statics-srv/assets/transaction-override-add-modal.8d198b30d4dc9c1a53fa374d4d647550.png)

## Enter ID of the transaction model to override

To get started, enter the `id` of the transaction to override. Stripe supports overrides on the following transaction models:

| Transaction model                                   | Restrictions                                                                                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Invoices](https://docs.stripe.com/api/invoices.md) | To override line-item-level details, use the [data import feature](https://docs.stripe.com/revenue-recognition/data-import.md).                                              |
| [Charges](https://docs.stripe.com/api/charges.md)   | You can’t override charges that are [associated with an invoice](https://docs.stripe.com/api/charges/object.md#charge_object-invoice). Instead, override the invoice itself. |

You can find the `id` of a transaction in the Dashboard or using the API. If the transaction occurred in a previous month, you can also find it in the following report downloads when formatted by *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice):

- Invoice Statement
- Debits and credits
- Corrections

## Choose the override type

The following override types are available:

| Override Type                          | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recognition period start and end dates | The start date and end dates correspond to when the service started and ended. The revenue of this transaction is recognized within this period. Start and end dates can have the same value, in which case revenue is recognized all at once. Read more about [how transaction overrides work](https://docs.stripe.com/revenue-recognition/overrides.md#how-transaction-overrides-work) below. |
| Transaction exclusion                  | Excluding a transaction removes all records of it from revenue recognition. This only works for invoices that are either [voided](https://docs.stripe.com/invoicing/overview.md#void) or [manually marked as paid](https://docs.stripe.com/invoicing/overview.md#paid), and have no customer balance applied to them.                                                                           |

## How transaction overrides work 

You can create transaction overrides for transactions that occurred in both past accounting periods and in the current accounting period. If the transaction occurred in a past accounting period, corrections are implemented prospectively at the end of the current accounting period. You can view these corrections in the reports for the current period after it closes.

If the overridden transaction occurred in the current accounting period, it’s not reflected as a correction in the current period. Instead, it’s recognized using the new attributes from the override.

Creating a transaction override doesn’t alter the attributes of the transaction model being overridden.

You can make changes to a transaction override by deleting the override and creating a new one. If you delete an override that impacts transactions in closed [accounting periods](https://docs.stripe.com/revenue-recognition/revenue-settings/accounting-period-control.md), the first open accounting period will reflect the effect of the deletion. If the deleted override impacts transactions in open accounting periods, the effect applies directly to those accounting periods.

> If you have any feedback on how we can improve transaction overrides to better suit your accounting needs, visit [Stripe support](https://support.stripe.com/).
