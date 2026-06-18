# Calculate tax

Learn how to calculate tax with Stripe Tax.

The most common forms of indirect taxes for your business are sales tax, *VAT* (A value-added tax (VAT), known in some countries as a goods and services tax (GST), is a type of tax levied on the price of a product or service at each stage of production, distribution, or sale to the end consumer. VAT and GST are also generally known as "consumption" taxes. The buyer pays the tax and the seller forwards it to the government), and *GST* (A goods and services tax (GST), known in some countries as a value added tax (VAT), is a type of tax levied on the price of a product or service at each stage of production, distribution, or sale to the end consumer. GST and VAT are also generally known as "consumption" taxes. The buyer pays the tax and the seller forwards it to the government). These taxes apply on the sale of physical goods, digital goods, and services.

Stripe calculates tax on a transaction taking into account some or all of the following factors:

- The location of the seller
- The location of the customer
- The location where the activity is performed
- The type of the product sold
- Whether the transaction involves a [reverse charge](https://docs.stripe.com/tax/zero-tax.md#reverse-charges)
- The status of the customer (for example, whether they’re a VAT-registered business, private person or an exempt organization)

## Payment methods

Stripe calculates tax for all supported payment methods, including Apple Pay and Google Pay wallet transactions.

## How Stripe uses addresses

Stripe uses a single address as the customer’s location, or transaction destination, when calculating taxes. For more information, see [which customer address we use](https://docs.stripe.com/tax/customer-locations.md#address-hierarchy).

In certain scenarios, it’s important to identify the origin of a transaction. Stripe generally uses the address where your business is located as the origin of a transaction. This address is defined as your head office address in the Dashboard or as `head_office` if using the tax settings object.

You can also specify a performance location to calculate tax based on a location that differs from both your head office address and your customer’s address. For example, you might deliver products to your customer at a store, or sell tickets to an event or activity.

### How to use ship-from addresses

If your business ships goods from locations other than your head office, you can provide a [ship-from address](https://docs.stripe.com/tax/ship-from-address.md) to calculate tax based on the actual shipping origin. Ship-from addresses are available only through the [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md). For details on how ship-from affects tax calculation in different jurisdictions, see [Use ship-from addresses](https://docs.stripe.com/tax/ship-from-address.md).

### How to use performance location

You can calculate taxes based on [performance location addresses](https://docs.stripe.com/tax/tax-for-tickets/overview.md) that differ from your business address and your customer’s address. If you provide a performance location, Stripe Tax uses its address as the place of taxation for physical goods, services and events. To use performance locations:

- You must define performance locations through the Stripe Tax API.
- You can’t use performance locations with Payment Links, Checkout, or Billing and Invoicing.
- Unrecognized performance location addresses return a tax calculation error.
- You can’t use performance locations for digital product tax codes.
- Some [product tax codes](https://docs.stripe.com/tax/tax-codes.md) **require** the performance location.

Even if you provide a performance location, the business address and the customer address remain relevant in determining whether reverse charges might apply.

## Discounts and tax calculations

Stripe Tax calculates tax after applying discounts to the subtotal. This ensures tax calculation on the actual amount paid by the customer.

For example, with a product priced at 150 USD and a 20 USD discount:

1. The subtotal after discount is 130 USD.
2. Tax is calculated on the 130 USD amount.
3. The final total is the discounted subtotal plus the calculated tax.

Discounts don’t affect the tax rates themselves, only the amount on which tax is calculated. When using the Tax API, calculate the discount before sending the request.

## Tax breakdowns

Stripe Tax provides detailed tax breakdowns for each transaction. These breakdowns aren’t sorted in any specific order. All applicable taxes are calculated and applied simultaneously. The order of items in the breakdown doesn’t indicate priority or application sequence.

[Specify product tax codes and tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md): Learn how to set up products and prices to automatically calculate tax.

[Collect customer addresses](https://docs.stripe.com/tax/customer-locations.md): Learn how to collect customer addresses to automatically calculate tax.

[Zero tax amounts and reverse charges](https://docs.stripe.com/tax/zero-tax.md): Learn about cases when Stripe calculates zero tax.

[Customize tax behavior](https://docs.stripe.com/tax/tax-customizations.md): Set up Tax to fit your business needs with tax customizations.

[Countries supported by Stripe Tax](https://docs.stripe.com/tax/supported-countries.md): Learn how to use Stripe to calculate, collect, and report tax in different countries
