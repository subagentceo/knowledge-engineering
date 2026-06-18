# Standalone Tax API

Use the Tax Calculations and Transactions APIs directly for shipping, tax-inclusive pricing, and more.

The standalone Tax API lets you calculate tax, record transactions, and handle reversals directly. Use it with [PaymentIntents](https://docs.stripe.com/tax/payment-intent.md) or when processing payments [off-Stripe](https://docs.stripe.com/tax/off-stripe.md). The following features are available when using the Tax Calculations and Transactions APIs.

## Optional: Calculate tax on shipping costs [Server-side]

To calculate tax on shipping costs, use the `shipping_cost` parameter:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][line1]=920 5th Ave" \
  -d "customer_details[address][city]=Seattle" \
  -d "customer_details[address][state]=WA" \
  -d "customer_details[address][postal_code]=98104" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=shipping" \
  -d "shipping_cost[amount]=500" \
  -d "shipping_cost[tax_code]=txcd_92010001"
```

Pass the ID of an existing [ShippingRate](https://docs.stripe.com/api/shipping_rates/object.md) to use its `amount`, `tax_code`, and `tax_behavior`:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][line1]=920 5th Ave" \
  -d "customer_details[address][city]=Seattle" \
  -d "customer_details[address][state]=WA" \
  -d "customer_details[address][postal_code]=98104" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=shipping" \
  -d "shipping_cost[shipping_rate]=shr_1Mlh8YI6rIcR421eUr9SJzAD"
```

## Optional: Estimate taxes with an IP address [Server-side]

If you provide your customer’s [IP address](https://docs.stripe.com/api/tax/calculations/create.md#calculate_tax-customer_details-ip_address), we geolocate it and use that location as your customer’s location. Use this to show your customer a tax estimate before they provide their postal address.

> Because the location of an IP address might be some distance from the actual customer location, we recommend against using an IP address to determine the *final* amount of tax to collect.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[ip_address]=127.0.0.1"
```

## Optional: Collect customer tax IDs [Server-side]

In some cases, such as the cross-border supply of services, your customer might need to account for tax on a [reverse charge](https://docs.stripe.com/tax/zero-tax.md#reverse-charges) basis. Instead of collecting the tax, you must issue an invoice with the text, “Tax to be paid on reverse charge basis.” This informs your customer that they’re responsible for any tax on their purchase.

Provide your customer’s [tax IDs](https://docs.stripe.com/api/tax/calculations/create.md#calculate_tax-customer_details-tax_ids) to automatically determine when reverse charge applies:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][country]=IE" \
  -d "customer_details[address_source]=billing" \
  -d "customer_details[tax_ids][0][type]=eu_vat" \
  -d "customer_details[tax_ids][0][value]=DE123456789"
```

If you provide a tax ID with an invalid format, the calculation returns a `tax_id_invalid` error code:

```json
{
  "error": {
    "code": "tax_id_invalid",
    "doc_url": "https://docs.stripe.com/error-codes#tax-id-invalid",
    "message": "Invalid value for eu_vat.",
    "param": "customer_details[tax_ids][0][value]",
    "type": "invalid_request_error"
  }
}
```

The Tax API doesn’t automatically validate tax IDs against government databases. To validate a tax ID before calculating tax, you must use [customer tax ID validation](https://docs.stripe.com/billing/customer/tax-ids.md#validation).

## Optional: Tax-inclusive pricing [Server-side]

By default, tax is calculated on top of the line item and shipping cost amounts you provide. To calculate the tax included in your prices, set the `tax_behavior` to `inclusive` for the [line item](https://docs.stripe.com/api/tax/calculations/create.md#calculate_tax-line_items-tax_behavior) or [shipping cost](https://docs.stripe.com/api/tax/calculations/create.md#calculate_tax-shipping_cost-tax_behavior).

In the example below, the customer always pays 100 EUR:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=eur \
  -d "line_items[0][amount]=10000" \
  -d "line_items[0][reference]=L1" \
  -d "line_items[0][tax_behavior]=inclusive" \
  -d "line_items[0][tax_code]=txcd_10103000" \
  -d "customer_details[address][country]=IE" \
  -d "customer_details[address_source]=billing"
```

The response returns the tax included:

```json
{
  ...
  "amount_total": 10000,
  ...
  "tax_amount_exclusive": 0,"tax_amount_inclusive": 1870,
  "tax_breakdown": [
    {
      "amount": 1870,
      "inclusive": true,
      "tax_rate_details": {
        "country": "IE",
        "percentage_decimal": "23.0",
        "state": null,
        "tax_type": "vat"
      },
      "taxability_reason": "standard_rated",
      "taxable_amount": 8130
    }
  ],
  ...
}
```

## Optional: Use an existing Product object [Server-side]

You can provide a [Product](https://docs.stripe.com/api/products/object.md) object for each line item. If the product has a [tax_code](https://docs.stripe.com/api/products/object.md#product_object-tax_code), we use it as the line item’s `tax_code`, if it’s not already populated. We don’t use other product values, including the `tax_behavior` and `price`, during tax calculation.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "line_items[0][product]={{PRODUCT_ID}}" \
  -d "customer_details[address][country]=IE" \
  -d "customer_details[address_source]=billing"
```

## Optional: Use an existing Account or Customer [Server-side]

The tax calculation automatically uses the relevant [Customer](https://docs.stripe.com/api/customers/object.md) address and tax IDs according to the availability of customer data:

- The customer shipping address populates the calculation’s `customer_details.address`.
- Otherwise, the customer address populates the calculation’s `customer_details.address`.
- The customer IP address populates the calculation’s `customer_details.ip_address`.
- If the customer has tax exemption, it populates the calculation’s `customer_details.taxability_override`.
- The customer’s tax IDs populate the calculation’s `customer_details.tax_ids`.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

## Optional: Override customer taxability [Server-side]

You don’t need to collect tax in certain cases, such as when your customer is tax-exempt. You can provide the tax exemption to Stripe Tax using the [taxability_override](https://docs.stripe.com/api/tax/calculations/create.md#calculate_tax-customer_details-taxability_override) parameter.

To provide the customer taxability override to your calculations:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][line1]=920 5th Ave" \
  -d "customer_details[address][city]=Seattle" \
  -d "customer_details[address][state]=WA" \
  -d "customer_details[address][postal_code]=98104" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=billing" \
  -d "customer_details[taxability_override]=customer_exempt"
```

### Reverse charge

Some regions, such as the European Union, implement a “reverse charge” scheme where the customer is responsible for accounting for tax if they’re purchasing as a business. For Stripe Tax to apply the correct tax treatment, we recommend you collect [Tax IDs](https://docs.stripe.com/tax/standalone-tax-api.md#tax-ids) from your customers. Sometimes you might not have your customer’s tax IDs, or you’ve separately determined that the reverse charge scheme applies. In these types of scenarios, you can use `taxability_override` to force Stripe Tax to apply the reverse charge scheme.

To provide the customer taxability override to your calculations:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=eur \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][country]=IE" \
  -d "customer_details[address_source]=billing" \
  -d "customer_details[taxability_override]=reverse_charge"
```

## Optional: Specify a ship-from location [Server-side]

If you ship goods from a location other than your main place of business, you can provide that address for tax calculations.

To provide a ship-from location, use the `ship_from_details` parameter. In this example, the user is based in Florida, their customer is based in Springfield, IL, and the user is shipping the goods from Naperville, IL:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "line_items[0][tax_behavior]=exclusive" \
  -d "line_items[0][tax_code]=txcd_99999999" \
  -d "customer_details[address][city]=Springfield" \
  -d "customer_details[address][state]=IL" \
  -d "customer_details[address][postal_code]=62704" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=billing" \
  -d "ship_from_details[address][city]=Naperville" \
  -d "ship_from_details[address][state]=IL" \
  -d "ship_from_details[address][postal_code]=60540" \
  -d "ship_from_details[address][country]=US"
```

The response returns the calculated tax based on the shipping origin of the order (Naperville, IL) instead of the destination (Springfield, IL) or the seller’s business origin:

```json
{
  ...
  "amount_total": 1078,
  ...
  "tax_amount_exclusive": 78,
  ...
  "tax_breakdown": [
    {
      "amount": 78,
      "inclusive": true,"tax_rate_details": {
        "country": "US",
        "percentage_decimal": "7.75",
        "state": "IL",
        "tax_type": "sales_tax"
      },
      "taxability_reason": "standard_rated",
      "taxable_amount": 1000
    }
  ],
  ...
}
```

To learn more about how ship-from addresses affect tax calculation in different jurisdictions, see [Use ship-from addresses](https://docs.stripe.com/tax/ship-from-address.md).

## Optional: Calculate the retail delivery fee [Server-side]

Stripe Tax supports calculating the retail delivery fee in Minnesota and Colorado.

The retail delivery fee is a flat government fee on physical deliveries of taxable goods. It’s triggered by the physical delivery of taxable goods and not by the shipping charge amount. This means the fee applies even when shipping is free. The fee is a fixed amount that varies by state (not a percentage).

You must add the retail delivery fee to the customer’s order total and remit it to the appropriate state tax authority. Failing to collect it doesn’t eliminate your liability.

After you [add a tax registration](https://docs.stripe.com/tax/registrations-api.md#tax-registration-retail-delivery-fee) of the `state_retail_delivery_fee` type in the supported states, the retail delivery fee gets calculated on tax calculations.

```curl
curl https://api.stripe.com/v1/tax/registrations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d country=US \
  -d "country_options[us][state]=CO" \
  -d "country_options[us][type]=state_retail_delivery_fee" \
  -d active_from=now
```

To calculate the retail delivery fee, call the tax calculations API using a [physical item product tax code](https://docs.stripe.com/tax/tax-codes.md?type=physical), such as `txcd_30011000`, which represents Clothing and Footwear.

Not all physical items trigger calculation of the retail delivery fee. Refer to the state’s documentation for when the tax applies:

- [Retail Delivery Fee—Colorado](https://docs.stripe.com/tax/supported-countries/united-states/collect-tax.md?tax-jurisdiction-united-states=colorado#other-taxes)
- [Retail Delivery Fee—Minnesota](https://docs.stripe.com/tax/supported-countries/united-states/collect-tax.md?tax-jurisdiction-united-states=minnesota#other-taxes)

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "line_items[0][tax_behavior]=exclusive" \
  -d "line_items[0][tax_code]=txcd_30011000" \
  -d "shipping_cost[amount]=400" \
  -d "customer_details[address][line1]=1437 Bannock St Room 451" \
  -d "customer_details[address][city]=Springfield" \
  -d "customer_details[address][state]=CO" \
  -d "customer_details[address][postal_code]=80202" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=shipping"
```

The response returns the calculated tax with the retail delivery fee for Colorado. It’s an additional entry in the `tax_breakdown` object, with `tax_breakdown.tax_rate_details.rate_type` set to `flat_amount`. The fee is associated with the delivery, not individual line items, so it also appears in `shipping_cost.amount_tax` rather than in line items.

```json
{
  "amount_total": 1068,
  ...
  "shipping_cost": {
    "amount": 0,"amount_tax": 28,
    "tax_behavior": "exclusive",
    "tax_code": "txcd_92010001"
  },
  "tax_amount_exclusive": 68,
  ...
  "tax_breakdown": [
    {
      "amount": 40,
      "inclusive": false,
      "tax_rate_details": {
        "country": "US",
        "flat_amount": null,
        "percentage_decimal": "4.0",
        "rate_type": "percentage",
        "state": "CO",
        "tax_type": "sales_tax"
      },
      "taxability_reason": "standard_rated",
      "taxable_amount": 1000
    },
    ...
    {"amount": 28,
      "inclusive": false,"tax_rate_details": {
        "country": "US",
        "flat_amount": {
          "amount": 28,
          "currency": "usd"
        },
        "percentage_decimal": "0.0",
        "rate_type": "flat_amount",
        "state": "CO",
        "tax_type": "retail_delivery_fee"
      },
      "taxability_reason": "standard_rated",
      "taxable_amount": 0
    }
  ]
}
```

## Optional: Detailed line item tax breakdowns [Server-side]

The top-level [tax_breakdown](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_breakdown) is always returned and provides a simple breakdown that’s suitable for displaying a list of taxes at checkout or on a receipt.

You can use the [taxability_reason](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-line_items-data-tax_breakdown-taxability_reason) to understand why tax isn’t applied while building your integration. For example, `not_collecting` doesn’t collect tax in the country or state where tax would be due. Adding [tax registrations](https://docs.stripe.com/tax/set-up.md#add-registrations) to your account settings tells Stripe where you’re collecting tax. If you added registration for Washington, the taxability reason displayed in your result is `standard_rated`, which indicates that the product is taxed at the standard rate.

Expand the line item [tax_breakdown](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-line_items-data-tax_breakdown) attribute to get a detailed breakdown, including local taxes and attributes that explain the reason for each tax.

- The `tax_type` field from [tax_rate_details](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-line_items-data-tax_breakdown-tax_rate_details) is a high-level tax type indication that might not always match the type returned in reports and transaction exports. For example, it doesn’t distinguish between US sales tax and US use tax.
- Use the `display_name` field from [tax_rate_details](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-line_items-data-tax_breakdown-tax_rate_details) in your Checkout flow to show all of the taxes. The taxes are localized based on customer location and product tax information. For example, if VAT is applied for Germany because the customer is in Germany and the product is taxed at the destination, such as [txcd_10103001: Software as a service (SaaS) for business use](https://docs.stripe.com/tax/tax-codes.md?tax_code=txcd_10103001), we show `Umsatzsteuer (USt)`, which is the German representation for VAT. If VAT is applied for France because the head office address is set to France and the product is taxed at the origin, such as [txcd_20030000: General - Services](https://docs.stripe.com/tax/tax-codes.md?tax_code=txcd_20030000), we show `Taxe sur la valeur ajoutée (TVA)`, which is the French representation of VAT.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer_details[address][line1]=920 5th Ave" \
  -d "customer_details[address][city]=Seattle" \
  -d "customer_details[address][state]=WA" \
  -d "customer_details[address][postal_code]=98104" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=shipping" \
  -d "expand[0]=line_items.data.tax_breakdown"
```

```json
{
  ...
  "tax_breakdown": [
    {
      "amount": 103,
      "inclusive": false,
      "tax_rate_details": {
        "country": "US",
        "percentage_decimal": "10.25",
        "state": "WA",
        "tax_type": "sales_tax"
      },"taxability_reason": "standard_rated",
      "taxable_amount": 1000
    }
  ],
  "line_items": {
    "object": "list",
    "data": [
      {
        "id": "tax_li_O84jA8hvV7ZyAa",
        "object": "tax.calculation_line_item",
        "amount": 1000,
        "amount_tax": 103,
        "product": null,
        "quantity": 1,
        "reference": "L1",
        "tax_behavior": "exclusive",
        "tax_breakdown": [
          {
            "amount": 65,
            "jurisdiction": {
              "country": "US",
              "display_name": "Washington",
              "level": "state",
              "state": "WA"
            },
            "sourcing": "destination",
            "tax_rate_details": {
              "display_name": "Retail Sales and Use Tax",
              "percentage_decimal": "6.5",
              "tax_type": "sales_tax"
            },"taxability_reason": "standard_rated",
            "taxable_amount": 1000
          },
          {
            "amount": 0,
            "jurisdiction": {
              "country": "US",
              "display_name": "KING",
              "level": "county",
              "state": "WA"
            },
            "sourcing": "destination",
            "tax_rate_details": null,"taxability_reason": "not_subject_to_tax",
            "taxable_amount": 0
          },
          {
            "amount": 22,
            "jurisdiction": {
              "country": "US",
              "display_name": "SEATTLE",
              "level": "city",
              "state": "WA"
            },
            "sourcing": "destination",
            "tax_rate_details": {
              "display_name": "Local Sales and Use Tax",
              "percentage_decimal": "2.2",
              "tax_type": "sales_tax"
            },"taxability_reason": "standard_rated",
            "taxable_amount": 1000
          },
          {
            "amount": 14,
            "jurisdiction": {
              "country": "US",
              "display_name": "REGIONAL TRANSIT AUTHORITY",
              "level": "district",
              "state": "WA"
            },
            "sourcing": "destination",
            "tax_rate_details": {
              "display_name": "Local Sales and Use Tax",
              "percentage_decimal": "1.4",
              "tax_type": "sales_tax"
            },"taxability_reason": "standard_rated",
            "taxable_amount": 1000
          },
          {
            "amount": 2,
            "jurisdiction": {
              "country": "US",
              "display_name": "SEATTLE TRANSPORTATION BENEFIT DISTRICT",
              "level": "district",
              "state": "WA"
            },
            "sourcing": "destination",
            "tax_rate_details": {
              "display_name": "Local Sales and Use Tax",
              "percentage_decimal": "0.15",
              "tax_type": "sales_tax"
            },"taxability_reason": "standard_rated",
            "taxable_amount": 1000
          }
        ],
        "tax_code": "txcd_10000000"
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/tax/calculations/taxcalc_1NLoZvBUZ691iUZ4z4cTW6tQ/line_items"
  },
  ...
}
```

## Optional: Troubleshoot common errors [Server-side]

Follow the steps below to troubleshoot errors in your tax integration.

### Resolve invalid tax code errors

If you receive an `Invalid tax code` error, refer to the [Product tax codes](https://docs.stripe.com/tax/tax-codes.md) for a list of available tax codes. Then, follow these steps to resolve the issue:

1. **Check the tax code**: Make sure you’re using a valid tax code from the [list of available tax codes](https://docs.stripe.com/tax/tax-codes.md). Common mistakes include:

   - Using an empty string or `null` as the tax code
   - Misspelling the tax code
   - Using a non-existent tax code

2. **Update your code**: Make sure you pass a valid tax code when creating a `TaxCalculation`. For example:

   ```curl
   curl https://api.stripe.com/v1/tax/calculations \
     -u "<<YOUR_SECRET_KEY>>:" \
     -d currency=usd \
     -d "line_items[0][amount]=1000" \
     -d "line_items[0][reference]=L1" \
     -d "line_items[0][tax_code]=txcd_10000000" \
     -d "customer_details[address][line1]=354 Oyster Point Blvd" \
     -d "customer_details[address][city]=South San Francisco" \
     -d "customer_details[address][state]=CA" \
     -d "customer_details[address][postal_code]=94080" \
     -d "customer_details[address][country]=US" \
     -d "customer_details[address_source]=shipping"
   ```

3. **Use the default tax code**: Stripe Tax uses a default tax code for calculations when a specific tax code isn’t provided for a product or in a tax calculation request. You can view and update the default value in your tax settings.

   Use the API to update the default tax code:

   ```curl
   curl https://api.stripe.com/v1/tax/settings \
     -u "<<YOUR_SECRET_KEY>>:" \
     -d "defaults[tax_code]=txcd_10000000"
   ```

4. **Review your product catalog**: If you use tax codes associated with products in your Stripe product catalog, make sure the tax codes are correctly assigned to your products.

5. **Check for data inconsistencies**: Make sure the tax code is correctly passed from your database or front end to your server-side code that makes the API call to Stripe.

For more accurate tax calculations, use the most specific tax code that applies to your product or service. If you’re unsure which tax code to use, consult the [tax codes documentation](https://docs.stripe.com/tax/tax-codes.md).

If you continue to experience issues, review the [Tax Settings API documentation](https://docs.stripe.com/api/tax/settings.md).

## See also

- [Stripe Tax with PaymentIntents](https://docs.stripe.com/tax/payment-intent.md)
- [Off-Stripe payments](https://docs.stripe.com/tax/off-stripe.md)
- [Tax Calculation API](https://docs.stripe.com/api/tax/calculations/create.md)
- [Reporting and filing](https://docs.stripe.com/tax/reports.md)
- [Tax for physical goods](https://docs.stripe.com/tax/physical-goods.md)
