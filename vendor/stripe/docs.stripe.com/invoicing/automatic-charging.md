# Automatic charging

Have Stripe automatically charge a customer's stored payment method.

Stripe can automatically attempt to pay an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) if the customer has a payment method on file. You can automatically charge a customer when you’re [creating an invoice](https://dashboard.stripe.com/invoices/create) or through the [API](https://docs.stripe.com/api/invoices.md). When you automatically charge a payment method on file, Stripe doesn’t notify the customer about the invoice. However, if you want to send an email receipt, make sure that you enable the **Successful payments** option in your [Email settings](https://dashboard.stripe.com/settings/emails) and that you’ve added your customer’s email address.

## Add a payment method

#### Dashboard

To add a payment method, go to the [Customers page](https://dashboard.stripe.com/customers) and select a customer. Select **Add** in the **Payment methods** section to add a card or an ACH debit bank account. You can also add a payment method during invoice creation. If your customer uses multiple payment methods, click the overflow menu (⋯) next to the card to make it the default.

#### API

With the API, set the invoice’s [collection_method](https://docs.stripe.com/api/invoices/create.md#create_invoice-collection_method) property to `charge_automatically` to automatically charge the payment method on file.

## See also

- [Use the Dashboard](https://docs.stripe.com/invoicing/dashboard.md)
- [Send email reminders](https://docs.stripe.com/invoicing/send-email.md)
