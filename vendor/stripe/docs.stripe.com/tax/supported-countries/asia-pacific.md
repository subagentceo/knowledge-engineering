# Tax in Asia Pacific

Use Stripe Tax to calculate, collect, and report tax in Asia Pacific.

In Asia Pacific (APAC), Stripe supports tax calculation for businesses making sales into a [range of countries](https://docs.stripe.com/tax/supported-countries/asia-pacific/collect-tax.md). The requirements for tax registration, as well as which types of transactions are included, vary from country to country.

For each country listed, you can find information about:

- The types of tax Stripe can help you collect.

- The registration threshold that determines when you’re required to register for tax collection.

- What kinds of products or sales are subject to tax calculation.

- The types of transactions covered.

- Resources about how to register with local tax authorities.

Stripe can collect tax if your business is based in Australia, Hong Kong, Japan, New Zealand, Singapore, and the United Arab Emirates. To collect tax on Stripe in other listed APAC countries, your business needs to be a remote seller with no physical presence (such as a shop or warehouse).

## When and how to register for tax collection 

There are different rules for when and how you need to register to collect tax depending on the country.

See [Needs attention](https://dashboard.stripe.com/tax/locations?primary_tab=needs_attention) tab to get insights about your potential tax registration obligations in each location. Stripe only monitors if you’ve reached a tax threshold for sales outside of the country your business is based in. Stripe also notifies you with email and Dashboard alerts when you might need to register to collect tax. Learn more about how the [monitoring tool works](https://docs.stripe.com/tax/monitoring.md).

After you’ve registered with a country, go to [Locations](https://dashboard.stripe.com/tax/locations) to add your registrations to Stripe in the Dashboard to start collecting tax on your transactions in that location.

## How we calculate taxes 

Learn how Stripe calculates taxes for your sales in Asia Pacific.

### Map your product to our product tax codes 

Stripe can calculate tax for [any of the product tax codes you assign to your products](https://docs.stripe.com/tax/tax-codes.md) and for domestic and cross-border sales in Australia, Hong Kong, Japan, New Zealand, Singapore, and the United Arab Emirates. For other supported APAC countries, Stripe can only calculate tax for [digital products](https://docs.stripe.com/tax/tax-codes.md?type=digital) sold by remote sellers. Digital products are non-physical items or services that are delivered, given, or rendered electronically. This includes digital goods and electronically supplied services. We determine whether you’re selling digital products or physical goods using the [product tax code](https://docs.stripe.com/tax/tax-codes.md) you assigned to your product.

### Domestic transactions 

A transaction where your business and your customer are in the same country is called a domestic transaction. Stripe assumes the sale of most goods or services to be taxable unless the tax authority has specifically made them exempt.

### Cross-border transactions 

A cross-border transaction is where your customer is located in a different country to your business or when goods are shipped from one country to another.

Stripe calculates tax on a cross-border transaction taking into account the following factors:

- The location of your business.
- The tax registrations you’ve added to Stripe.
- The location of the buyer.
- The location where the activity is performed.
- The type of the product sold (based on which [product tax code](https://docs.stripe.com/tax/tax-codes.md) you assigned to your product).
- The status of the customer (whether they’re an individual or a business).

Digital products are generally taxable in the country where your customer is located. However sales of digital products to businesses in other countries might have reverse charge applied. With reverse charge, your business provides an invoice for the purchase so that your customer can calculate the tax.

When physical goods are shipped to a customer in a different country to your business, the transaction is referred to as an export. Exports are zero rated and Stripe applies the [zero rate](https://docs.stripe.com/tax/zero-tax.md). The transaction might still be subject to taxes and customs duties in the country your customer is in. Stripe doesn’t calculate these.

## Report and file your taxes 

Stripe Tax has filing partners—Taxually, Marosa, and Hands-off Sales Tax (HOST)—to help automate your tax filing. These partners automatically sync your tax transaction data in real time, eliminating the need for manual data entry or file transfers. Learn more about [tax filing](https://docs.stripe.com/tax/filing.md).

Stripe also provides reports of your completed tax transactions. Go to [Locations](https://dashboard.stripe.com/tax/locations) to access these reports. Learn more about [the different types of reports](https://docs.stripe.com/tax/reports.md).

You’re responsible for filing and remitting your taxes. Stripe doesn’t file taxes on your behalf.
