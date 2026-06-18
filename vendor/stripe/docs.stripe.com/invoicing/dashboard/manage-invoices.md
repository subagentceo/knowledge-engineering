# Manage invoices

Learn how to manage your invoices in the Dashboard.

Invoices move through a series of statuses as they’re created and processed. You can track the status of an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) on the [Invoices page](https://dashboard.stripe.com/invoices), and view its details by clicking into it. Invoices that are `open` might display a different badge, such as `Past due` or `Retrying`. For some invoices, you can hover over the badge to see an explanatory tooltip.

If you use [Organizations](https://docs.stripe.com/get-started/account/orgs.md), you can view a list of your invoices across all of your accounts. You can also filter this list by account. However, you can only create and analyze invoices from an account, not your organization.

> If an open non-subscription invoice is waiting for a payment that’s initiated but still pending, it shows the `Pending` badge in the list of invoices. However, its details page shows the `Open` badge.

## Filter and export invoices 

On the Invoices page, you can filter your invoices by using the tabs or chips. You can also configure the information displayed on the page by clicking **Edit columns**, or analyze your invoices in aggregate by using [Sigma](https://docs.stripe.com/data/how-sigma-works.md).

You can export all of your invoices or a subset of them as a CSV file by clicking **Export** on the Invoices page. You can also [export invoice-related tax data](https://docs.stripe.com/tax/tax-rates.md#data-exports).

## Additional invoice actions 

You see a **Download PDF** button when you hover over the overflow menu (⋯). Depending on the invoice status, clicking the button downloads either a PDF of the invoice or a receipt. If the customer paid the invoice, Stripe generates a PDF of the receipt. For all other statuses, Stripe generates a PDF of the invoice. The overflow menu also provides additional actions, which allow you to duplicate an invoice, delete a draft, or view the customer details associated with an invoice.

> If you need the original invoice for a paid invoice, click through to the [Invoice details page](https://docs.stripe.com/invoicing/dashboard/manage-invoices.md#invoice-details-page).

## View invoice details 

When you click an invoice on the Invoices page, its details page opens. If the invoice is in `draft` status and isn’t associated with a subscription, the edit invoice form opens automatically. You can perform various actions on the details page, such as editing, adding a note, resending, or downloading a receipt. The available actions depend on the status of the invoice.

After Stripe finalizes an invoice, you can’t change its due date. If you need to change the due date, you must [void](https://docs.stripe.com/invoicing/overview.md#void) the original invoice and send a new one.

## Pending invoice items 

You can see a customer’s pending invoice items by navigating to the [Customers page](https://dashboard.stripe.com/customers), and clicking on their name. If the customer has a pending invoice item, it appears under **Pending invoice items**. An invoice item appears as pending if it’s not attached to any invoice.

Under **Pending invoice items**, you can also choose to create a new invoice item, or instantly invoice everything listed. When you click **Invoice now**, a dialog appears that lets you select whether to charge the default source or email the invoice to the customer. Additionally, the dialog gives you the option to calculate tax automatically. To learn about how invoice items fit within a subscription, see [Add invoice items to a draft subscription invoice](https://docs.stripe.com/billing/invoices/subscription.md#adding-draft-invoice-items).

## See also

- [Use the Dashboard](https://docs.stripe.com/invoicing/dashboard.md)
- [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md)
