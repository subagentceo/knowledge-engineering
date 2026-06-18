# How Stripe Tax works

Learn how Stripe helps you automate tax compliance.

To be tax compliant, you need to:

1. Understand which locations require you to collect tax.
2. Register for tax in those locations.
3. Calculate and collect tax.
4. Report, file, and remit the tax you collected.
The tax compliance cycle (See full diagram at https://docs.stripe.com/tax/how-tax-works)
## Indirect taxes with Stripe Tax

Each country handles tax on sold products and services differently, often calling it by a different name. In the US, businesses deal with [sales tax](https://stripe.com/guides/introduction-to-us-sales-tax-and-economic-nexus). Throughout Europe, it’s called value-added tax (*VAT* (A value-added tax (VAT), known in some countries as a goods and services tax (GST), is a type of tax levied on the price of a product or service at each stage of production, distribution, or sale to the end consumer. VAT and GST are also generally known as "consumption" taxes. The buyer pays the tax and the seller forwards it to the government)). Canada and most countries in the Asia Pacific region refer to it as goods and services tax (*GST* (A goods and services tax (GST), known in some countries as a value added tax (VAT), is a type of tax levied on the price of a product or service at each stage of production, distribution, or sale to the end consumer. GST and VAT are also generally known as "consumption" taxes. The buyer pays the tax and the seller forwards it to the government)).

Taxability and tax rates vary by location and category of products you’re selling. For example, children’s footwear is zero rated in Ireland, but adult footwear isn’t. Digital services are usually taxed at the standard rate in most EU countries. However, e-books are subject to the reduced rate.

[Stripe Tax](https://stripe.com/tax) uses your business address, tax registrations, product tax codes, customers’ locations, and customer status to determine the correct tax rates for products you sell, in all supported locations. We have tax researchers who monitor tax laws and tax authority publications for changes, and make any effective updates directly to Stripe Tax as needed. Read more about [tax codes](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md) and [how we calculate](https://docs.stripe.com/tax/calculating.md) for different jurisdictions.

## Monitor your obligations and register

You need to identify the locations where you have sales tax, VAT, or GST obligations and need to register to collect tax. If you sell into multiple locations, you need to be familiar with the [tax laws in those locations](https://docs.stripe.com/tax/supported-countries.md) because the place where your transaction takes place determines where you’re required to collect tax. This can be the seller’s country, the buyer’s country, or another location.

As your business grows and you sell to more locations, you need to register to collect tax in more locations. Stripe Tax tracks your Stripe transactions and helps you monitor your tax obligations. [Read more about tax obligation monitoring](https://docs.stripe.com/tax/monitoring.md).

You must register with the tax authority in a location to collect taxes there. In some countries and states you have to register before your first transaction, while others have a registration threshold (such as the number of sales or sales volume). Take a look at the [locations Stripe Tax supports](https://docs.stripe.com/tax/supported-countries.md) along with the different tax thresholds that apply and links to the tax authority websites.

Stripe Tax tracks your registrations and uses them to calculate and collect taxes. [Read more about adding your registrations to Stripe](https://docs.stripe.com/tax/registering.md).

After you have registered to collect tax with a tax authority, go to [Locations](https://dashboard.stripe.com/tax/locations) to add your registrations to Stripe in the Dashboard. This turns on tax calculation and collection in Stripe for your transactions.

## Calculate and collect

After you [set up Stripe Tax in the Dashboard](https://docs.stripe.com/tax/set-up.md), Stripe automatically calculates and collects taxes on your transactions. Alternatively you can use [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md) to calculate taxes on your own custom payment flows. In either case, to determine which taxes to collect, you or your customers have to provide customer location information. [Read more about how Stripe calculates tax](https://docs.stripe.com/tax/calculating.md).

If you sell to other businesses, your transactions might be subject to reverse charges. This means that the tax liability shifts to the customer and we don’t charge tax on the transaction. Stripe Tax uses customer tax identification numbers to determine whether a transaction is B2B. Adding a tax identification number to the customer might affect the tax calculation result. Stripe Tax doesn’t validate whether the provided tax identification number exists or is valid. [Read about supported tax ID formats](https://docs.stripe.com/tax/invoicing/tax-ids.md#supported-tax-ids).

Some individuals or entities might be tax exempt. For example, some US states have a reseller exemption. You can set an exempt status on customers to reflect this. [Read more about reverse charges and exempt customers](https://docs.stripe.com/tax/zero-tax.md).

## Report, file, and remit 

If you’re collecting taxes, you must report, file, and remit (transfer) the taxes collected in every location that you’re registered in. Make sure you understand and comply with obligations of each state or country and consult your tax advisor if you need help. Stripe Tax supports exporting your transactions in an itemized format to aid with tax reporting. [Read more about Stripe Tax reports](https://docs.stripe.com/tax/reports.md).

Stripe Tax has filing partners—Taxually, Marosa, and Hands-off Sales Tax (HOST)—to help automate your tax filing. These partners automatically sync your tax transaction data, eliminating the need for manual data entry or file transfers. Learn more about [tax filing](https://docs.stripe.com/tax/filing.md).

## Pricing 

Stripe charges you for calculating tax on live transactions where you’re registered to collect tax. [Pricing](https://stripe.com/tax/pricing) is based on total transaction volume, with subscription, pay-as-you-go, and custom plans.

The tax calculation fee is distinct from the transaction completion and might apply even when:

- The applicable payment isn’t collected or processed
- A credit card charge is disputed
- The tax amount calculated is zero
- A Stripe Tax API transaction amount is zero (we don’t charge for zero amount transactions in our non-code and low-code enablements)

If a transaction amount is zero, we don’t charge a fee.

We don’t charge a fee to:

- Configure your Stripe Tax settings, such as your head office address, preset tax code, or tax registrations
- Calculate tax on transactions that aren’t completed, such as abandoned Checkout Sessions or draft invoices that are never finalized
- Calculate tax on credit notes
- Generate trial period subscription invoices where the amount is zero
- Monitor tax thresholds based on your past Stripe payments

The following table details common tax fee use cases.

#### No-code/low-code integrations

| Use case                                                                                                                                                                                                                                                                     | Stripe Tax fees charged                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Head office address and active tax registrations configured in [Stripe Tax Settings](https://dashboard.stripe.com/settings/tax)                                                                                                                                              | No fee charged on Checkout Sessions, Subscriptions, and Invoices without `automatic_tax` enabled                                                                         |
| Subscription created with [automatic_tax enabled](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-automatic_tax-enabled)                                                                                                                             | Fee charged each time the subscription renews and the renewal invoice is finalized, if there’s an active tax registration covering the customer jurisdiction at the time |
| Checkout Session created with [`automatic_tax` enabled](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-enabled), in subscription [mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) | Fee charged each time the subscription renews and the renewal invoice is finalized, if there’s an active tax registration covering the customer jurisdiction at the time |
| Checkout Session created with [`automatic_tax` enabled](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-enabled), in payment [mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode)      | Fee charged when the Checkout Session is completed, if there’s an active tax registration covering the customer jurisdiction at the time                                 |
| One-off invoice created with [`automatic_tax` enabled](https://docs.stripe.com/api/invoices/create.md#create_invoice-automatic_tax), and [finalized](https://docs.stripe.com/api/invoices/finalize.md) even if unpaid by the customer                                        | Fee charged when the invoice is finalized, if there’s an active tax registration covering the customer jurisdiction at the time                                          |
| A payment is refunded, a credit note is issued, an invoice is voided, or a chargeback is received                                                                                                                                                                            | Fee is charged for the initial transaction (no additional fee is charged for refund, credit note, voided invoice, or chargeback)                                         |
| Payment Link Session created with [`automatic_tax` enabled](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax), in payment mode                                                                                                           | Fee is charged when the Payment Link Session is completed, if there’s an active tax registration covering the customer jurisdiction at the time                          |

#### Tax API integrations

| Use case                                                                                                                                                                                 | Stripe Tax fees charged                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Successfully calculated taxes using the [Calculations API](https://docs.stripe.com/api/tax/calculations.md)                                                                              | Fee charged after the API request is completed, if an active tax registration covers the customer jurisdiction |
| A call to the [Calculations API](https://docs.stripe.com/api/tax/calculations.md) is issued that fails due to validation errors (such as missing or malformed parameter)                 | No additional fee charged                                                                                      |
| A call to the [Calculations API](https://docs.stripe.com/api/tax/calculations.md) is successfully re-issued after updating the user information (such as address, product quantity, etc) | Fee charged after the API request is completed, if an active tax registration covers the customer jurisdiction |
| Successfully created a Tax Transaction using the [Transactions API](https://docs.stripe.com/api/tax/transactions.md)                                                                     | Fee charged after the API request is completed, if an active tax registration covers the customer jurisdiction |
| Successfully created a partial Tax Transaction reversal using the [Transaction Reversal API](https://docs.stripe.com/api/tax/transactions/create_reversal.md)                            | No additional fee charged                                                                                      |
| Successfully created a full Tax Transaction reversal using the [Transaction Reversal API](https://docs.stripe.com/api/tax/transactions/create_reversal.md)                               | No additional fee charged                                                                                      |
| Successfully calculated tax using the [Calculations API](https://docs.stripe.com/api/tax/calculations.md) for a non-Stripe payment                                                       | Fee charged after the API request is completed, if an active tax registration covers the customer jurisdiction |
| Successfully created a Tax Transaction using the [Transaction API](https://docs.stripe.com/api/tax/transactions.md) for a non-Stripe payment                                             | Fee charged after the API request is completed, if an active tax registration covers the customer jurisdiction |

#### Connect

| Account Type   | Who is liable for taxes | Stripe Tax fees charged                                                                                            |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Standard       | Connected Account       | Stripe Tax fee is applied depending on the integration used (if applicable, it’s charged to the connected account) |
| Standard       | Platform                | Stripe Tax fee is applied depending on the integration used (if applicable, it’s charged to the platform)          |
| Custom/Express | Connected Account       | Stripe Tax fee is applied depending on the integration used (if applicable, it’s charged to the platform)          |
| Custom/Express | Platform                | Stripe Tax fee is applied depending on the integration used (if applicable, it’s charged to the platform)          |

You can view your Stripe Tax fees in the [Dashboard](https://dashboard.stripe.com/balance/all-activity) under **Balances** > **All activity**.

- No-code and low-code fees are under **Automatic Taxes: Automatic tax**.
- [API integration](https://docs.stripe.com/tax/standalone-tax-api.md) fees are under **Tax Api Calculation** or **Tax Api Transaction**, depending on your usage.

## See also

- [Stripe Tax guides](https://stripe.com/guides/tax-guides)
