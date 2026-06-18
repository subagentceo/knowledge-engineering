# Specify product tax codes and tax behavior

Add tax codes and tax behavior to your products and prices to automatically calculate tax.

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

Stripe Tax uses product tax codes to associate products with their applicable tax rates. Assign each of your [products a tax code](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-code-on-product) to automatically apply the rate and other taxability rules.

Tax codes within Stripe are always the same across different jurisdictions. However, individual products might have tax treatments that differ by location, and Stripe maintains current rate and taxability information for you, while staying up to date with any changing regulations.

See our [list of available tax codes](https://docs.stripe.com/tax/tax-codes.md).

## Preset tax codes 

When activating Stripe Tax you can set two types of preset tax codes: one for products and one for shipping. You can set both in the [Tax settings](https://dashboard.stripe.com/settings/tax) in the Dashboard.

### Preset product tax code 

We use the preset if you don’t explicitly specify a `tax_code` on your *products* (Products represent what your business sells—whether that's a good or a service) or in [product_data](https://docs.stripe.com/api/prices/create.md#create_price-product_data) on your transactions. As you process payments, we also use the preset tax code to display the tax thresholds you might be approaching or have exceeded, under the **Threshold monitoring** section in your tax settings.

### Preset shipping tax code 

The preset shipping tax code  represents the tax treatment for shipping fees when charged. We use this if you don’t explicitly specify a `tax_code` on a shipping rate. Stripe Tax allows you to change the default shipping treatment to Nontaxable if you don’t want to charge any tax on shipping fees. We recommend you leave the default as “Shipping” to ensure the correct tax is always charged.

Tax rules for shipping fees typically follow one of two methods, depending on the state or country:

- **Proportional Allocation Method:** Shipping fees are taxed at the same rate as the items being shipped. If an order contains items with different tax rates or a mix of taxable and non-taxable goods, the shipping cost is divided proportionally based on the value of the goods. The tax rate of each item is then applied to its corresponding share of the shipping fee.
- **Highest Tax Rate Method:** The entire shipping fee is taxed at the highest rate applied to any item in the order. For example, if a customer buys a tax-exempt item and a fully taxable item, the shipping cost is taxed at the higher rate.

To charge tax on shipping for subscriptions, you can create a Product or pass `product_data` for a line item called “shipping” and select the shipping `tax_code`.

## Tax behavior 

You must specify a `tax_behavior` on a price, or a default tax behavior in the tax settings in the Dashboard, which determines how tax is presented to the buyer. This allows you to localize your checkout depending on the market.

Tax-exclusive prices are common in the US and Canada and for B2B sales in other countries. Set the tax behavior to exclusive to add tax to the subtotal amount specified in your price.

Tax-inclusive prices are common for B2C sales in many markets outside the US. When set to inclusive, the amount your buyer pays remains constant, regardless of the tax amount (zero or positive). This applies to sales subject to reverse charge as well. The unit price differs between transactions subject to reverse charge and those that aren’t. If no tax applies, the tax-inclusive price is the unit price. If the tax amount is positive, the unit price is lower, excluding the tax amount.

### Set a default tax behavior  (Recommended)

You can define a default tax behavior that applies to every price that has no tax behavior defined. You can setup the default tax behavior in the [Stripe Tax settings](https://dashboard.stripe.com/settings/tax) under the **Include tax in prices** section.

After you set the default tax behavior, all prices that don’t have a `tax_behavior` defined, use this setting and are ready for Stripe Tax. The options for the default tax behavior are:

- **Automatic**: The tax behavior is based on the currency that’s chosen for a product price. For the currencies `USD` and `CAD` the tax behavior is exclusive. For all other currencies the tax behavior is inclusive. This also works with *multi-currency Prices* (A single Price object can support multiple currencies. Each purchase uses one of the supported currencies for the Price, depending on how you use the Price in your integration).
- **Inclusive**: *Inclusive tax* (Inclusive tax is tax that doesn't change the final purchase price—the price the buyer sees already includes it. Examples of inclusive tax include VAT and GST outside of the US) is already included in the price. For example, a product has the price defined as 5.00 USD. The final price the customer pays is 5.00 USD.
- **Exclusive**: *Exclusive tax* (Exclusive tax is tax that changes the final purchase price—the listed price the buyer sees doesn't include it, and it's added to the total. An example of exclusive tax is US sales tax) is added on top of the price. For example, a product has the price defined as 5.00 USD. The tax charged on this product could be 10% and would result in a final price of 5.50 USD. (Tax rates might differ—this is only an explanatory example.)

To override this setting for an individual price, [set a tax behavior on a price](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#set-tax-behavior-on-price).

## Set tax behavior on a price  (Optional)

You can set the tax behavior for a *Price* (Prices define how much and how often to charge for products. This includes how much the product costs, what currency to use, and the interval if the price is for subscriptions) when creating it with the Dashboard or the API. When creating a Price in the Dashboard, you can inspect the impact of your pricing model on your revenue.

> You can’t change `tax_behavior` after it’s been set to **exclusive** or **inclusive**.

To create a Price with `tax_behavior` through the API:

```curl
curl https://api.stripe.com/v1/prices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d unit_amount=10000 \
  -d currency=usd \
  -d "product={{PRODUCT_ID}}" \
  -d tax_behavior=exclusive \
  -d "recurring[interval]=month"
```

For a *multi-currency Price* (A single Price object can support multiple currencies. Each purchase uses one of the supported currencies for the Price, depending on how you use the Price in your integration), use the [currency_options.<currency>.tax_behavior](https://docs.stripe.com/api/prices/create.md#create_price-currency_options-tax_behavior) parameter to set different tax behaviors for different currencies.

In some cases, you might want to use a custom price that hasn’t been pre-configured. You can pass in `price_data` instead of a price ID. For example, accepting a one time payment for a custom price with the [hosted version of Checkout](https://docs.stripe.com/checkout/quickstart.md) looks like this:

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][unit_amount]=10000" \
  -d "line_items[0][price_data][tax_behavior]=exclusive" \
  -d "line_items[0][price_data][product]={{PRODUCT_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

## Set a tax code on a product  (Recommended)

When creating Products in the Dashboard you can set your `tax_code` in the dropdown by searching for any available [tax code](https://docs.stripe.com/tax/tax-codes.md). If you don’t, Stripe Tax uses the preset tax code defined on the [Dashboard](https://dashboard.stripe.com/settings/tax). If a product could fit multiple codes, for example, a SaaS product used for personal or business use depending on the type of customer, we recommend creating two separate products in Stripe and assigning the appropriate code to each.

To create a Product with `tax_code` using the API:

```curl
curl https://api.stripe.com/v1/products \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "name=Test Product" \
  -d "tax_code={{TAXCODE_ID}}"
```

In some cases, you might want to use a custom product that hasn’t been pre-configured. You can pass in `product_data` instead of a product ID. For example, accepting a one time payment for a custom product with the [hosted version of Checkout](https://docs.stripe.com/checkout/quickstart.md) looks like this:

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][unit_amount]=10000" \
  -d "line_items[0][price_data][tax_behavior]=exclusive" \
  -d "line_items[0][price_data][product_data][name]=Test Product" \
  -d "line_items[0][price_data][product_data][tax_code]={{TAXCODE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

## Create a shipping rate with tax code  (Optional)

Checkout payment mode allows you to set shipping rates and charge tax on shipping. You can automatically calculate tax on shipping charges by setting the tax code on the shipping rate in the Dashboard or [API](https://docs.stripe.com/api/shipping_rates.md).

```curl
curl https://api.stripe.com/v1/shipping_rates \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "display_name=Ground shipping" \
  -d type=fixed_amount \
  -d "fixed_amount[amount]=500" \
  -d "fixed_amount[currency]=usd" \
  -d tax_behavior=inclusive \
  -d "tax_code={{TAXCODE_ID}}"
```

## See also

- [Checkout and Tax](https://docs.stripe.com/tax/checkout.md)
- [Invoicing and Tax](https://docs.stripe.com/tax/invoicing.md)
- [Determining customer locations](https://docs.stripe.com/tax/customer-locations.md)
