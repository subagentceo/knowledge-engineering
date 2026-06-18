# Automatically collect tax on Payment Links

Learn how to calculate and collect tax on a payment page without writing any code.

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

You can use Stripe Tax with [Payment Links](https://stripe.com/payments/payment-links) to automatically calculate and collect tax on a payment page and share a link to it with your customers, without writing any code.
[Watch on YouTube](https://www.youtube.com/watch?v=aotUFvYtmys)
> #### Transfer tax liability to Stripe
> 
> If you sell digital products, [Managed Payments](https://docs.stripe.com/payments/managed-payments/tax-compliance.md) allows you to offload tax liability to Stripe so we’re directly responsible for handling sales tax, VAT, or GST globally. As a merchant of record solution, Managed Payments also handles fraud prevention, dispute management, and customer support on all transactions.

#### Dashboard

To [create a payment link](https://docs.stripe.com/payment-links/create.md) in the Dashboard:

1. Open the [Payment Links](https://dashboard.stripe.com/payment-links/create) page.
2. Click **+ New**.
3. Fill out the details.
4. Enable **Collect tax automatically**.

To update an existing payment link in the Dashboard:

1. Open the [Payment Links](https://dashboard.stripe.com/payment-links) page.
2. Select the payment link you want to update.
3. On the payment link details page, click the overflow menu (⋯), then click **Edit**.
4. In the payment link editor, select **Collect tax automatically** to enable automatic tax collection on this payment link.
5. (Optional) Select **Collect customers’ addresses** to improve tax calculation accuracy. The more information you provide, the more precise the calculation.
6. Click **Update link** to save your changes.

#### API

To create a payment link with automatic tax collection, pass the `automatic_tax[enabled]` parameter to the [Payment Link API](https://docs.stripe.com/api/payment-link/create.md) endpoint:

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "automatic_tax[enabled]=true" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1"
```

To update an existing payment link in the API, pass the `automatic_tax[enabled]` parameter to the [Payment Link API](https://docs.stripe.com/api/payment-link/update.md) endpoint:

```curl
curl https://api.stripe.com/v1/payment_links/{{PAYMENTLINK_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "automatic_tax[enabled]=true"
```

## Optional: Update your products and prices

Stripe Tax uses information stored on your products and prices to calculate tax, including tax codes and tax behavior. If you don’t explicitly configure these, Stripe Tax uses the defaults from your [Tax Settings](https://dashboard.stripe.com/settings/tax).

For detailed setup instructions, see [Specify product tax codes and tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md).

## See also

- [Test your tax integration](https://docs.stripe.com/tax/testing.md)
- [Reporting and filing](https://docs.stripe.com/tax/reports.md)
- [Use Stripe Tax with Connect](https://docs.stripe.com/tax/connect.md)
