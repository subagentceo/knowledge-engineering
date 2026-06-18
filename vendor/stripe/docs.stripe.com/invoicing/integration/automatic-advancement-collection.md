# Automatic invoice advancement

Learn how Stripe can automatically advance invoice states and help collect payment.

All invoices start as a `draft` and must be transitioned to `open` to accept a payment. If the invoice becomes overdue, or payment on the invoice fails, Stripe can automatically send reminders or retry the payment for you. You can choose to let Stripe manage these state transitions and these collection attempts automatically or choose to manage them yourself. Learn more about the [invoice lifecycle](https://docs.stripe.com/invoicing/overview.md#invoice-lifecycle).

For invoices created using the API, set the [auto_advance](https://docs.stripe.com/api/invoices/update.md#update_invoice-auto_advance) property on the invoice to `true`. You might also want to configure a webhook endpoint to receive associated events. When you set `auto_advance` to `false`, you’re responsible for transitioning the invoice between states. Learn more about [webhook endpoints and finalizing invoices](https://docs.stripe.com/billing/subscriptions/webhooks.md#understand).

## Update automatic invoice advancement 

An invoice must be in a `draft` or `open` state to update automatic advancement. Invoices that are `paid`, `void`, or `uncollectible` always have automatic advancement turned off.

#### Dashboard

Automatic invoice advancement is on by default for any invoice created in the Dashboard.

You can manually turn on or off automatic advancement for any invoice. On the invoice details page, click the overflow menu (⋯) and select **Turn on/off automatic reminders**. Invoices set to charge a payment method on file automatically display **Turn on/off automatic collection**, which changes the `auto_advance` property on the invoice. See the feature table below for a comparison of turning this on or off.

#### API

You can toggle the `auto_advance` property on `draft` and `open` invoices.

```curl
curl https://api.stripe.com/v1/invoices/id \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d auto_advance=false
```

## Pause automatic advancement 

In some cases, you might want to stop Stripe from automatically advancing your invoices toward collection. For example, if you want to:

- Use your own business logic to manage the lifecycle of an invoice.
- Decide if and when to send invoice emails on a per-invoice basis.

In both of these cases, use the `auto_advance` property to disable the automatic advancement and collection behavior.

## Automatic advancement feature comparison 

When you turn off automatic advancement in the Dashboard or set `auto_advance` to `false`, Stripe disables most of the automatic collection features for Invoicing. The following table outlines some key changes in the behavior of automatic collection, depending on whether `auto_advance` is set to `true` or `false`:

| Feature                                                             | True                                                                                                                                                | False                            |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Emailing invoices                                                   | ✓ Yes ⚙ Configurable in settings                                                                                                                    | ✗ Not enabled                    |
| Retries (email and charge)                                          | ✓ Yes ⚙ Configurable in settings                                                                                                                    | ✗ Not enabled                    |
| Invoice reminder emails                                             | ✓ Yes ⚙ Configurable in settings                                                                                                                    | ✗ Not enabled                    |
| 3D Secure reminder emails                                           | ✓ Yes ⚙ Configurable in settings                                                                                                                    | ✗ Not enabled                    |
| Email receipts                                                      | ✓ Yes ⚙ Configurable in settings                                                                                                                    | ✓ Yes ⚙ Configurable in settings |
| Attempting payments for auto-charge invoices                        | ✓ Yes                                                                                                                                               | ✗ Not enabled                    |
| Finalize draft subscription invoices to open                        | ✓ Yes ⚙ Configurable in settings (after [approximately one hour](https://docs.stripe.com/billing/subscriptions/overview.md#subscription-lifecycle)) | ✗ Not enabled                    |
| [Stripe Automation](https://docs.stripe.com/billing/automations.md) | ✓ Yes                                                                                                                                               | ✗ Not enabled                    |

#### Legend

- ✓ Yes = Can be enabled depending on your settings.
- ⚙ = Configurable in your settings.
- ✗ Not enabled = Not enabled. The invoice isn’t automatically transitioned.
