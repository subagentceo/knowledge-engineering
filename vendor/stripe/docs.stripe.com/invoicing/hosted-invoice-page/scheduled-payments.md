# Scheduled payments

Let your customers schedule their payments through the Hosted Invoice Page.

Stripe offers flexibility by enabling your customers to schedule payments for a future date through the [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md). The scheduled payments feature lets your customers take action immediately so that they won’t forget to pay. Your customers can also go back to the Hosted Invoice Page at any time and update their payment method and or scheduled date.

> The scheduled payments feature is currently only available in the US.
![Allow your customer to schedule their payments](https://b.stripecdn.com/docs-statics-srv/assets/hip-scheduled-payment-web-mobile.0729fa213232ddd1c6470c88d9ad661b.png)

Allow your customers to schedule their payments

## Get started 

From the [Invoice template](https://dashboard.stripe.com/settings/billing/invoice), you can enable or disable scheduled payments for all invoices, including those that are outstanding. You can’t leverage the Stripe API to toggle the scheduled payments feature, or receive webhooks when an end merchant schedules a payment.
![Turn on the scheduled payments feature for your customers](https://b.stripecdn.com/docs-statics-srv/assets/settings-scheduled-payments.313042ca8b7e49ee4fa08a0c3c50b8cf.png)

Turn on the scheduled payments feature for your customers

If your customer chooses to schedule their payment, the invoice appears on your [Invoices page](https://dashboard.stripe.com/test/invoices) under **Scheduled**. A badge also appears next to the invoice that indicates the invoice’s scheduled status. Hovering over the badge tells you the invoice’s scheduled and estimated delivery dates.

## End customer features 

An end customer that receives a Stripe invoice and pays it through the Hosted Invoice Page can:

- Choose whether to initiate payment now, or on a future date.
- See the invoice due date using the calendar popup.
- Know the estimated date a payment will reach your account.
- Be warned if the payment delivery is past the due date.
- Cancel or edit the scheduled payment before the due date.

> Your customers can still choose to schedule payments past the due date.
![A past due payment delivery](https://b.stripecdn.com/docs-statics-srv/assets/hip-scheduled-payment-past-due.a868bc3e45e003425cf46cdf2711342b.png)

A past due payment delivery

## Email notifications 

Stripe sends email notifications to your customers when a payment has been scheduled, and 3 days before the payment initiates (to make sure that they have enough funds). Both emails contain a link to the Hosted Invoice Page for reference.

> If a customer doesn’t have an associated email, they won’t receive payment reminders.

After Stripe initiates the payment, the customer receives an email receipt. You can also configure Stripe to send email notifications upon failed payment attempts, or if your customer’s card on file is about to expire. To learn more, see [Send email reminders](https://docs.stripe.com/invoicing/send-email.md).
![Invoicing email notifications](https://b.stripecdn.com/docs-statics-srv/assets/hip-scheduled-payment-reminder.69e7aefd8919ce80950bca3727ebfe46.png)

Invoicing email notifications

## Limitations 

Your customer faces certain limitations when they use the scheduled payments feature.

### Collection method 

- The scheduled payments feature is supported only when [collection_method](https://docs.stripe.com/api/invoices/object.md#invoice_object-collection_method) is set to `send_invoice`.

### Payment methods 

- Only credit cards are supported.

- Apple and Google Pay aren’t supported.

- International cards might be declined due to regulatory requirements for step-up authentication (3DS). (We email the customer in these instances.)

### Invoice due dates 

- The scheduled payments feature isn’t available if the invoice is due the same day, next day, or is already past due.

- You can’t schedule a payment that’s 60 days or more out from the current date. For example, you can’t schedule a payment for February 21, 2022, if the current date is December 23, 2021.

## See also

- [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md)
- [Use the Dashboard](https://docs.stripe.com/invoicing/dashboard.md)
- [How invoicing works](https://docs.stripe.com/invoicing/overview.md)
