# Zero tax amounts and reverse charges

Learn about cases when Stripe Tax calculates zero tax.

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

Stripe Tax returns a tax calculation result on every request. However, tax isn’t collected on a transaction in some situations, and the resulting tax amount is zero. For example, if you’re expanding `tax_amounts` on an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), you might see something like:

```json
{
  "id": "in_1HF0KNFsnTpWVWVzFDgSizOj",
  "object": "invoice",
  ..."total_details": {
    "amount_tax": 0,
    "breakdown": {
      "taxes": [
        {
          "amount": 0,
          "taxability_reason": "not_collecting",
          "rate": {
            "id": "txr_1HHwa4Jm3J7Jh9FBnYJ9glJZ",
            "object": "tax_rate",
            "description": "VAT Germany",
            "display_name": "VAT",
            "country": "DE",
            "created": 1597863856,
            "inclusive": false,
            "jurisdiction": "DE",
            "livemode": false,
            "metadata": {},
            "percentage": 0.0,
            "state": null,
            "tax_type": "vat",
            "active": false
          }
        }
      ]
    }
  },
  ...
}
```

The API returns the reason for a tax result in the [taxability_reason](https://docs.stripe.com/api/invoice-line-item/object.md#invoice_line_item_object-tax_amounts-taxability_reason) field. A taxability reason clarifies either the applicable tax rate or why tax isn’t calculated.

The most common reasons for a zero tax result are the following:

| Reason                             | taxability_reason        | Explanation                                                                                                                                                                              |
| ---------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Not registered                     | `not_collecting`         | You must register before collecting tax in a jurisdiction. You can specify where you’re registered to collect tax on [the Tax settings page](https://dashboard.stripe.com/settings/tax). |
| Sale treated as non-taxable        | `not_collecting`         | You applied the product tax code `txcd_00000000` to treat the transaction as non-taxable.                                                                                                |
| Exempt products                    | `product_exempt`         | The product is exempt from tax.                                                                                                                                                          |
| Reverse charge                     | `reverse_charge`         | Transactions between two businesses might be subject to reverse charge. In these cases, the buyer is responsible for accounting for the VAT due under the reverse charge.                |
| Exempt customers                   | `customer_exempt`        | Some customers are exempt from paying indirect tax in certain jurisdictions. You can specify when a customer is exempt on the Customer object.                                           |
| Product or territory not supported | `not_supported`          | Stripe Tax doesn’t support the country or territory, or doesn’t support the product in the jurisdiction where tax is due.                                                                |
| No tax due                         | `not_subject_to_tax`     | - The jurisdiction doesn’t impose a tax.
  - The country where the transaction occurs chooses not to tax it.
  - The sale of the product isn’t a taxable transaction.                    |
| Tax holiday                        | `product_exempt_holiday` | The transaction occurred during a US sales tax holiday.                                                                                                                                  |
| Tier rule applicable               | `portion_product_exempt` | A tier rule applies, and a portion is exempt. Tiers indicate that multiple tax treatments and rates might apply, depending on the amount.                                                |
| Zero rate                          | `zero_rated`             | The transaction is subject to the zero rate.                                                                                                                                             |

## Situations where Stripe calculates zero tax

Stripe Tax calculates zero tax in the following situations:

### Not registered

Tax authorities require businesses to obtain a license or register before collecting tax in their jurisdiction. Each jurisdiction has its own rules regarding when you’re obligated to register and to start collecting and remitting tax. Obligations can arise from a physical presence in the jurisdiction or from reaching a threshold of sales into the jurisdiction.

Stripe automatically aggregates and analyzes your transactions and compares them to local thresholds. See [Monitor your obligations](https://docs.stripe.com/tax/monitoring.md) to learn more about your potential tax registration obligations.

Learn more about how to [register for sales tax, VAT, and GST](https://docs.stripe.com/tax/supported-countries.md) in each location and, if you’re a Connect platform, how to [use the Registrations API to manage tax registrations](https://docs.stripe.com/tax/registrations-api.md). You can also use [Stripe to register](https://docs.stripe.com/tax/use-stripe-to-register.md) on your behalf.

### Exempt or zero-rated products

Products might be exempt or zero-rated in some jurisdictions. Both conditions result in no tax charged to the buyer, but the implications for the seller differ:

- Exempt products: These products aren’t subject to VAT, and sellers typically can’t reclaim input VAT on costs related to producing or supplying them.
- Zero-rated products: These products are technically taxable, but a 0% VAT rate is applied. The buyer pays no tax, but sellers can usually reclaim input VAT on related expenses.

If you don’t want to collect tax on a given product, tell Stripe Tax to treat it as non-taxable by assigning it tax code Nontaxable (`txcd_00000000`). Otherwise, Stripe Tax automatically determines when a product is exempt or zero-rated.

### Reverse charge 

In most transactions, the seller is responsible for collecting and remitting tax owed by the buyer. However, in a reverse charge transaction, the buyer must calculate and remit the tax. In this scenario, the seller’s invoice specifies that the transaction is subject to reverse charge and doesn’t include tax in the total amount. Reverse charge is common in the cross-border sale of B2B services.

Stripe Tax automatically applies the reverse charge based on the presence of a tax ID and the jurisdictions involved in the transaction. You can also set a customer’s tax status to reverse charge using the API or the Dashboard. Learn more about [tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md) and the [Customer object](https://docs.stripe.com/invoicing/customer.md).

For transactions with inclusive tax behavior, the reverse charge doesn’t affect the total amount paid by the customer. A tax-inclusive price remains unchanged, whether the tax amount is zero or positive. This means the unit price differs between transactions subject to reverse charge and those that aren’t. If no tax applies, the tax-inclusive price is the unit price. For sales where the tax amount is positive, the unit price is equal to the tax-inclusive price minus the tax amount. Learn more about [tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior).

### Exempt customers 

Exempt customers are those who, under a jurisdiction’s rules, can make tax-exempt purchases. Each taxing jurisdiction determines the types of individuals or entities eligible for tax-exempt purchases. Common examples include non-profit organizations and government entities. If you have customers exempt from paying tax, set their tax status to exempt and provide the customer ID when creating a subscription, invoice, or Checkout Session. You can set a customer’s exempt status in the Dashboard, or use the API to set `Customer.tax_exempt` to `exempt`.

For transactions with inclusive tax behavior, the customer exemption doesn’t affect the total amount paid by the customer. A tax-inclusive price remains unchanged, whether the tax amount is zero or positive. This means the unit price differs between transactions involving exempt customers and those that don’t. If no tax applies, the tax-inclusive price is the unit price. For sales where the tax amount is positive, the unit price is equal to the tax-inclusive price minus the tax amount.

Stripe Tax doesn’t validate required documentation for supporting an exemption, such as customer exemption certificates. You’re responsible for determining and fulfilling any obligation to validate your customer’s exempt status and collect any required documentation, such as an exemption certificate. EXEMPTAX offers a [Stripe App](https://marketplace.stripe.com/apps/exemptax) that you can use to collect and verify exemption certificates.

### Excluded or unsupported territories 

> Stripe Tax fees apply to transactions in excluded territories if you’re registered in the country the territory is located in.

Some countries exclude administrative subdivisions or territories from the scope of their general tax system. In some territories, no tax is levied, while others might have their own tax regulations and rates.

Stripe Tax doesn’t calculate tax in the territories listed below, even if you’re registered in the country to which the territory belongs. Stripe Tax automatically determines if your customer is based in an excluded or unsupported territory using the postal code and jurisdiction name. For details on territories where Stripe Tax applies the parent country tax treatment instead of the territory-specific one, see the [country-specific documentation](https://docs.stripe.com/tax/supported-countries.md).

| Country        | Excluded Territories                                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Denmark        | - Faroe Islands
  - Greenland                                                                                                                                                                         |
| Finland        | - Åland Islands                                                                                                                                                                                       |
| France         | - French Guyana
  - French Polynesia
  - Guadalupe
  - Martinique
  - Mayotte
  - New Caledonia
  - Reunion
  - Saint Barthélemy
  - Saint Martin
  - Saint Pierre and Miquelon
  - Wallis and Futuna |
| Italy          | - Vatican City                                                                                                                                                                                        |
| Monaco         | - Monaco                                                                                                                                                                                              |
| Netherlands    | - Bonaire
  - Curacao
  - Saba
  - Sint Eustatius
  - Sint Maarten                                                                                                                                    |
| Norway         | - Jan Mayen
  - Svalbard                                                                                                                                                                              |
| Portugal       | - Azores
  - Madeira                                                                                                                                                                                  |
| Spain          | - Canary Islands
  - Ceuta
  - Melilla                                                                                                                                                                |
| United Kingdom | - British Virgin Islands
  - Channel Islands (Guernsey and Jersey)
  - Falkland Islands
  - Gibraltar
  - Isle of Man                                                                                 |

## See also

- [Determining customer locations](https://docs.stripe.com/tax/customer-locations.md)
- [Set up Stripe Tax](https://docs.stripe.com/tax/set-up.md)
- [Use Stripe to register](https://docs.stripe.com/tax/use-stripe-to-register.md)
- [Reporting and filing](https://docs.stripe.com/tax/reports.md)
