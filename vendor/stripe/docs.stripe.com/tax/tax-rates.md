# Tax rates

Learn how to collect and report taxes with tax rate objects.

Stripe allows you to define any number of tax rates and apply them to *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis), and one time payments when using Checkout. However, we won’t automatically set them on your behalf.

If you’re looking for automated tax calculation where you don’t need to define the rates, use [Stripe Tax](https://docs.stripe.com/tax.md).

> If you use a third-party tax provider such as Avalara, Anrok, or Sphere, use their [native Stripe integration](https://docs.stripe.com/tax/third-party-apps.md) to calculate tax automatically for subscriptions and invoices. Use Tax Rates for cases where you have a fixed set of rates or use a provider without a native integration.

When applying tax rates, Stripe calculates the [total tax amount](https://docs.stripe.com/tax/tax-rates.md#tax-amounts) per tax rate, and summarizes it in a table that you can export into tax summary reports.

## Creating tax rates

If you work with a small number of tax rates, you can manage and create them in the [Dashboard](https://dashboard.stripe.com/test/tax-rates). After creating tax rates, you can apply them to [invoices](https://docs.stripe.com/invoicing/taxes/tax-rates.md), [subscriptions](https://docs.stripe.com/billing/taxes/collect-taxes.md), and [one-time payments](https://docs.stripe.com/payments/checkout/taxes.md) or [subscriptions](https://docs.stripe.com/billing/taxes/collect-taxes.md?tax-calculation=tax-rates#adding-tax-rates-to-checkout) created through Stripe Checkout.

Create a catalog of tax rates that meet the requirements for the jurisdictions that you do business in. For example, if you operate in Europe, you might want to create a catalog of tax rates for OSS VAT.

#### Creating tax rates through the API

The following example demonstrates how you can create a tax rate through the API.

```curl
curl https://api.stripe.com/v1/tax_rates \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "display_name=Sales Tax" \
  -d inclusive=false \
  -d "percentage=7.25" \
  -d country=US \
  -d state=CA \
  -d "jurisdiction=US - CA" \
  -d "description=CA Sales Tax"
```

Required properties:

- The `display_name` appears on your customer’s invoice, and is usually a short name that describes the specific type of tax, such as `Sales`, `VAT`, or `GST`.
- The `inclusive` property determines whether the tax `percentage` is added to, or included in, the overall amount.
- The `percentage` is a number (up to 4 decimal places) that represents the tax percentage to be collected.

Optional properties:

- The optional `country` property is a valid [two-letter ISO country code](https://www.nationsonline.org/oneworld/country_code_list.htm). Some countries (for example, United States) require an additional two-letter `state` property. Use these properties to apply dynamic tax rates based on your customer’s billing or shipping address in Checkout Sessions.
- The optional `jurisdiction` property represents the tax jurisdiction of the tax rate and can be used to differentiate between tax rates of the same percentage. `jurisdiction` appears on your customer’s invoice. In the Dashboard, jurisdiction appears as the *Region* label for the tax rate.
- You can also store additional details in the `description`. Your customers won’t see this property.

You can’t change the percentage, country, or state properties after you set them, and you can only set them when you create the tax rate. This ensures that existing subscriptions and invoices using tax rates aren’t affected. If you need to update these properties, create a new tax rate and archive the old object.

## Inclusive versus exclusive tax 

Tax rates can either be exclusive or inclusive. An *exclusive* tax isn’t included in the invoice subtotal, whereas an *inclusive* tax is.

The following table illustrates a 25% tax rate modifying the total amount due, depending on whether it’s exclusive or inclusive.

| Tax           | Subtotal | Tax due                                  | Total                              |
| ------------- | -------- | ---------------------------------------- | ---------------------------------- |
| 25% Exclusive | 5.00 USD | 1.25 USD                                 | **6.25 USD** (5.00 USD + 1.25 USD) |
| 25% Inclusive | 5.00 USD | 1.00 USD (already included in the total) | **5.00 USD** (4.00 USD + 1.00 USD) |

## Tax exempt and reverse charge

You can set the exemption status for a customer to either exempt or reverse. In both cases, no tax is calculated on the invoice.

In the case where the customer is liable for the tax (that is, under the reverse-charge procedure within EU VAT), set the exemption status to `reverse`. The invoice and receipt PDF includes the text **“Reverse charge”**.

[Download example reverse-charge invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-reverse-charge.pdf)

If a one time payment is performed using Checkout, the exemption status is captured as [customer_details](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer_details) in the Checkout Session object.

If the customer is either exempt or reverse, for invoices with *inclusive* tax rates, the buyer pays the `unit_amount` price *minus* the tax that would’ve been paid had the user not been exempt or reverse. In other words, manual tax rates effectively calculate taxes as if the user weren’t exempt and then “backs out” the taxes.

The following table illustrates a 10% tax rate modifying the total amount due for an exempt or reverse customer. The first row is an example of “backed out” taxes.

| Tax           | Amount | Tax due | Total                                                              |
| ------------- | ------ | ------- | ------------------------------------------------------------------ |
| 10% inclusive | 100    | 0 USD   | 90.91 USD (inclusive tax of 9.09 USD is subtracted from the price) |
| 10% exclusive | 100    | 0 USD   | 100 USD                                                            |

## Using multiple tax rates 

You can apply Tax rates to line items or set them as a default for all line items in an invoice. You can set up to ten tax rates per line item. When you set tax rates on both a line item and the invoice, the rates for that invoice don’t apply to that line item.

For example, this invoice has two overall tax rates of 9.975% and 5%:

| Invoice     | Item tax rate | Overall invoice tax rate | Item tax rate (Effective) |
| ----------- | ------------- | ------------------------ | ------------------------- |
| Line item 1 | (none)        | 9.975% and 5%            | 9.975% and 5%             |
| Line item 2 | 10%           | 9.975% and 5%            | 10%                       |
| Line item 3 | 1% and 2%     | 9.975% and 5%            | 1% and 2%                 |

## Tax amounts 

When you apply tax rates to an invoice, they’re aggregated into the [total_tax_amounts](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts) attribute. This attribute represents the sum of all tax amounts, per tax rate, over the entire invoice.

For example, here’s an invoice where two line items have two different rates:

| Invoice              | Amount    | Tax Rate   | Tax Amount | Totals    |
| -------------------- | --------- | ---------- | ---------- | --------- |
| Line item 1          | 5.00 USD  | 5% (excl)  | 0.25 USD   | —         |
| Line item 2          | 10.00 USD | 10% (excl) | 1.00 USD   | —         |
| **Total Tax Amount** | —         | —          | 1.25 USD   | —         |
| **Total**            | 15.00 USD | —          | —          | 16.25 USD |

[Download example invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-tax-amounts.pdf)

## Rounding

When determining tax amounts, you can do either of the following:

- Round at the invoice line item level to the [smallest currency unit](https://docs.stripe.com/currencies.md#zero-decimal) before summing individual tax amounts across the entire invoice. We refer to this as “line item level”.
- Sum up all individual taxable amounts unrounded per tax rate. Combine them to a subtotal, apply the tax rate on the subtotal, and then round. We refer to this as “invoice level”.

Select this configuration on the [invoice settings](https://dashboard.stripe.com/settings/billing/invoice) page in the Dashboard. The rounding configuration is only available for invoices with manual tax rates. Invoices with automatic Stripe tax always sum up the tax amounts first and then round.

#### Line item level

| Name              | Amount       | Inclusive Tax Rate | Taxable Amount (before rounding) | Tax Amount (before rounding) | Tax Amount (after rounding) |
| ----------------- | ------------ | ------------------ | -------------------------------- | ---------------------------- | --------------------------- |
| Line Item 1       | 1000.00 USD  | 10%                | 909.0909 USD                     | 90.9091 USD                  | 90.91 USD                   |
| Line Item 2       | 50.00 USD    | 10%                | 45.4545 USD                      | 4.5455 USD                   | 4.55 USD                    |
| Subtotal          | 1,050.00 USD | —                  | —                                | —                            | —                           |
| Total Tax Amounts | —            | —                  | —                                | —                            | 95.46 USD                   |
| Total rounded     | 1,050.00 USD | —                  | 954.54 USD                       | —                            | 95.46 USD                   |

[Download example line item level rounding invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-line-item-level-rounding.pdf)

#### Invoice level

| Name              | Amount       | Inclusive Tax Rate | Taxable Amount (before rounding) | Tax Amount (before rounding) | Tax Amount (after rounding) |
| ----------------- | ------------ | ------------------ | -------------------------------- | ---------------------------- | --------------------------- |
| Line Item 1       | 1000.00 USD  | 10%                | 909.0909 USD                     | —                            | —                           |
| Line Item 2       | 50.00 USD    | 10%                | 45.4545 USD                      | —                            | —                           |
| Subtotal          | 1,050.00 USD | 10%                | 954.5455 USD                     | —                            | —                           |
| Total Tax Amounts | 1,050.00 USD | 10%                | 954.5455 USD                     | 95.45 USD                    | 95.45 USD                   |
| Total rounded     | 1,050.00 USD | —                  | 954.55 USD                       | —                            | 95.45 USD                   |

[Download example invoice level rounding invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-invoice-level-rounding.pdf)

## Discounts

Discounts are usually applied before tax, but this isn’t always the case.

Reading each line left-to-right, noting the formula applied (in the table header), you can trace the values as they’re applied to the final, total amount.

### Exclusive tax discount example

Stripe always applies discounts before exclusive tax.

This example shows how we apply discounts to an exclusive tax rate.

| Invoice Item | Amount        | Discount % | Discount $          | Post Discount        | Tax Rate | Tax $                    | **Total**             |
| ------------ | ------------- | ---------- | ------------------- | -------------------- | -------- | ------------------------ | --------------------- |
| **Formula**  | —             | —          | `Amount * Discount` | `Amount - Discount$` | —        | `PostDiscount * TaxRate` | `PostDiscount + Tax$` |
| Line item 1  | 5.00 USD      | 10%        | 0.50 USD            | 4.50 USD             | 5% exl.  | 0.23 USD                 | **4.73 USD**          |
| Line item 2  | 10.00 USD     | 10%        | 1.00 USD            | 9.00 USD             | 5% exl.  | 0.45 USD                 | **9.45 USD**          |
| **Total**    | **15.00 USD** |            | **1.50 USD**        | **13.50 USD**        |          | **0.68 USD (@ 5% exl.)** | **14.18 USD**         |

[Download example discounts invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-exclusive-tax-with-discount.pdf)

### Inclusive tax discount example

When tax rates are inclusive, Stripe Tax applies discounts to the original amount first. Then, we recalculate taxes based on the remaining amount. This reduction has the side effect of reducing the tax amount due.

| Invoice Item | Amount        | Discount % | Discount $           | Post Discount        | Tax Rate | Tax $ (Included)                              | **Total**      |
| ------------ | ------------- | ---------- | -------------------- | -------------------- | -------- | --------------------------------------------- | -------------- |
| **Formula**  | —             | —          | `Amount * Discount%` | `Amount - Discount$` | —        | `PostDiscount - PostDiscount / (1 + TaxRate)` | `PostDiscount` |
| Line item 1  | 5.00 USD      | 10%        | 0.50 USD             | 4.50 USD             | 5% incl. | 0.21 USD                                      | **4.50 USD**   |
| Line item 2  | 10.00 USD     | 10%        | 1.00 USD             | 9.00 USD             | 5% incl. | 0.43 USD                                      | **9.00 USD**   |
| **Total**    | **15.00 USD** | **—**      | **1.50 USD**         | **13.50 USD**        | **—**    | **0.64 USD (@ 5% incl.)**                     | **13.50 USD**  |

[Download example invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-inclusive-tax-with-discount.pdf)

### Both inclusive and exclusive tax with discount example

In the case where you have both inclusive and exclusive tax, the two rules apply together in the following steps for every line item:

1. We calculate the inclusive tax amount based on the post-discounted amount by multiplying by the inclusive tax rate.
2. We calculate the exclusive tax amount by multiplying the exclusive tax rate by the post-discounted amount, less the inclusive tax amount.
3. We calculate the total amount due by summing the post-discounted amount and the exclusive tax amount (calculated in step 2).

| Invoice Item | Amount        | Discount % | Discount $           | Post Discount        | Inclusive Tax Rate | Inclusive Tax $                               | Post Discount, Less Incl. Tax  | Exclusive Tax Rate | Exclusive Tax $                | **Total**                 |
| ------------ | ------------- | ---------- | -------------------- | -------------------- | ------------------ | --------------------------------------------- | ------------------------------ | ------------------ | ------------------------------ | ------------------------- |
| **Formula**  | —             | —          | `Amount * Discount%` | `Amount - Discount$` | —                  | `PostDiscount - PostDiscount / (1 + TaxRate)` | `PostDiscount - InclusiveTax$` | —                  | `PostDiscLessIncTax * TaxRate` | `PostDiscount + ExclTax$` |
| Line item 1  | 5.00 USD      | 10%        | 0.50 USD             | 4.50 USD             | 5% incl.           | 0.21 USD                                      | 4.29 USD                       | 7% excl.           | 0.30 USD                       | **4.80 USD**              |
| Line item 2  | 10.00 USD     | 10%        | 1.00 USD             | 9.00 USD             | 5% incl.           | 0.43 USD                                      | 8.57 USD                       | 7% excl.           | 0.60 USD                       | **9.60 USD**              |
| **Total**    | **15.00 USD** | **—**      | **1.50 USD**         | **13.50 USD**        | **—**              | **0.64 USD (@ 5% incl.)**                     | **12.86 USD**                  | **—**              | **0.90 USD (@ 7% excl.)**      | **14.40 USD**             |

[Download example invoice PDF](https://d37ugbyn3rpeym.cloudfront.net/docs/files/billing/taxes/example-inclusive-and-exclusive-tax-with-discount.pdf)

## Tax reporting and remittance 

Any business collecting taxes ultimately needs to remit tax to the appropriate government.

See [Tax reporting and filing](https://docs.stripe.com/tax/reports.md) to learn more.

### Data exports

From the Dashboard’s [Tax Rates list](https://dashboard.stripe.com/test/tax-rates/) page, you can export data files required for tax reporting calculations.

Stripe Billing provides two different levels of tax report export files:

- **Invoice line item tax export** — A lower-level export, this includes details down to the line item level, including per-line-item tax rates, inclusive/exclusive, amounts, and so on.
- **Invoice totals export** — Shows the aggregate tax collected on the invoice as a whole, including adjustments for any refunds.

For remittance reporting, use the line-item tax export to sum all amounts paid for all tax rates used. To factor in any refunds you’ll also need to pivot against the Invoice totals export.

## Migrate to tax rates 

If you’re using the deprecated `tax_percent`, `tax_info`, `tax_info_verification`, and `business_vat_id` fields, review the following options to migrate to tax rates and [Customer Tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md) for better tax collection and reporting (remittance) tools.

### Existing tax percent use cases have been migrated to tax rates

Existing `tax_percent` uses have been automatically converted into [tax rates](https://docs.stripe.com/api/tax_rates.md), and your invoices and subscriptions have been updated to reference the new objects through [default_tax_rates](https://docs.stripe.com/api/invoices/create.md#create_invoice-default_tax_rates).

This means that if you had previously been setting a `tax_percent` of `15%` on your invoices, Stripe has created a new `15%` tax rate object for you (although it lacks details such as a customer facing display name or a jurisdiction). If you continue to set the `tax_percent` to `15%`, Stripe dynamically creates a 15% tax rate for you to aid your migration. This works exactly as it had before.

You can manage your full list of tax rates in the Dashboard’s [tax rates](https://dashboard.stripe.com/tax-rates) page.

### Migration options

For new invoices or subscriptions, we recommend performing the [full](https://docs.stripe.com/tax/tax-rates.md#full) update to use tax rates.

#### No action 

If you take no action, your integration continues to work as it does today. As mentioned above, existing uses of `tax_percent` are made to look as if they used tax rates.

As your tax rates lack a [display_name](https://docs.stripe.com/api/tax_rates/object.md#tax_rate_object-display_name) and [jurisdiction](https://docs.stripe.com/api/tax_rates/object.md#tax_rate_object-jurisdiction), tax reporting might not be very useful. Invoices and receipts render a generic name for these rates—“Tax”.

#### Minimal update with medium benefits 

Use the Dashboard to edit pre-existing tax rates so taxes work for pre-existing invoices.

1. For tax rates that have been migrated for you, edit the [display_name](https://docs.stripe.com/api/tax_rates/object.md#tax_rate_object-display_name) to have a useful user-facing name. Display names are displayed to your customers on generated invoices and receipts (for example, “UST” for German VAT and “HST” for Ontario’s Harmonized Sales Tax).
2. Set the [jurisdiction](https://docs.stripe.com/api/tax_rates/object.md#tax_rate_object-jurisdiction) to store an associated tax jurisdiction (for example, “DE” for Germany or “NL Amsterdam” for the city of Amsterdam).

Invoices and receipts show the `display_name` of tax rates. When determining how much tax to remit, you can group by jurisdiction.

#### Full update and benefits 

We no longer recommend using the `tax_percent` field for new invoices, and to use tax rates instead. Apply tax rates to [invoices](https://docs.stripe.com/invoicing/taxes/tax-rates.md) and [subscriptions](https://docs.stripe.com/billing/taxes/collect-taxes.md). This allows you to add multiple tax rates per line item and invoice, display the correct name for tax rates and summaries on generated invoices and receipts, and improved tax reporting.

### Customer Tax IDs

You can add one or more tax IDs to a customer and display them in the header of invoice and credit note PDFs. The [TaxID](https://docs.stripe.com/api/customer_tax_ids.md) object provides:

- Support for different types of tax IDs, such as EU VAT, NZ GST, and AU ABN.
- Automatic validation of EU VAT numbers against the [European Commission’s VAT Information Exchange System (VIES)](http://ec.europa.eu/taxation_customs/vies/) database.
- Automatic validation of Australian Business Numbers (ABNs) against the [Australian Business Register (ABR)](https://abr.gov.au/).
- The ability to associate a tax ID with a particular country (for example, a German EU VAT number).

See [Customer Tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md) for more information.
