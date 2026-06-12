# Supported currencies

Learn which currencies Stripe supports for payments and bank payouts.

Use this guide to understand which currencies Stripe supports for payments and bank payouts, how conversions work, how to format amounts in API requests (including minor units and decimals), each currency’s minimum and maximum charge limits, and specific currency rules.

You can charge customers in over 135 currencies and receive funds in your preferred currency. Converting prices to local currencies can improve customer conversion and authorization rates, while lowering payment processing costs. Learn how to [display and charge customers in multiple currencies](https://docs.stripe.com/payments/currencies/localize-prices.md).

## Currency presentment and settlement

Currency affects three aspects of Stripe payments:

- The customer’s payment method currency, such as their credit card or bank account
- The currency of the charge, called the *presentment* currency
- The currency accepted by your destination bank account or debit card, called the *settlement* currency. To learn more, see [Settle in additional currencies](https://docs.stripe.com/payments/currencies/settlement-payouts.md).

If the charge currency differs from the customer’s payment method currency, their bank or card issuer might charge the *customer* a foreign exchange fee. The bank or card issuer might also charge the customer if the payment method and your business are in different countries, regardless of the currency used.

If the charge currency differs from your *settlement currency* (The settlement currency is the currency your bank account uses), Stripe converts the charge to your settlement currency, with [multiple options](https://docs.stripe.com/payments/currencies/localize-prices.md) for presenting, converting, and charging customers in different currencies.

In certain countries, Stripe might support [settlement in additional currencies](https://docs.stripe.com/payments/currencies/settlement-payouts.md). If you need liquidity in additional currencies, you can enable settlement in those currencies and add a bank account in the [payout settings of your Dashboard](https://dashboard.stripe.com/account/payouts). Our [payouts documentation](https://docs.stripe.com/payouts.md#multiple-bank-accounts) lists the different bank account currencies we support. See [Stripe pricing](https://www.stripe.com/pricing) for conversion costs.

### Integration currency

“Integration currency” is the currency you set on a [Price](https://docs.stripe.com/api/prices/object.md#price_object-currency) or [PaymentIntent](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-currency). It appears in the Stripe Dashboard and the currency Stripe Tax uses when recording tax liability in the Stripe Tax reports.

### Connect platforms

If you use *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients), your platform has additional currency conversion considerations. See [Work with multiple currencies](https://docs.stripe.com/connect/currencies.md) to manage currency conversions.

## Supported presentment currencies 

Currencies are two-decimal currencies unless otherwise specified. Currencies shown as links are [zero-decimal](https://docs.stripe.com/currencies.md#zero-decimal) currencies. Make sure to use all lowercase letters when entering the three-letter ISO code in any payment request.

\* American Express doesn’t support any currencies marked with an asterisk (*).

## Specify amounts in API requests 

Currencies are two-decimal currencies unless otherwise specified. All API requests expect `amount` values in the *currency’s minor unit* (The Stripe API expects currency values using the given denomination's smallest unit represented without decimals. For example, enter 1099 to charge 10.99 USD (or any other two-decimal currency). Enter 10 to charge 10 JPY (or any other zero-decimal currency)). For example, set `amount` as follows:

- `1000` to charge 10 USD (or any other two-decimal currency).
- `10` to charge 10 JPY (or any other zero-decimal currency).

### Zero-decimal currencies 

For the following zero-decimal currencies, the charge and the amount are the same, without requiring multiplication. For example, to charge 500 JPY, provide an `amount` value of `500`.

> This list contains zero-decimal currencies that have general API support. Currencies listed here might not be available in your specific country. For the list of presentment currencies for your country, see [Supported presentment currencies](https://docs.stripe.com/currencies.md#presentment-currencies).

### Special cases 

The following currencies have special conditions that you need to consider when creating payouts or charges.

| Currency                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Icelandic Króna (ISK)   | ISK transitioned to a zero-decimal currency, but backward compatibility requires you to represent it as a two-decimal value, where the decimal amount is always `00`. For example, to charge 5 ISK, provide an `amount` value of `500`. You can’t charge fractions of ISK.                                                                                                                                                                                                                                                     |
| Hungarian Forint (HUF)  | Stripe treats HUF as a zero-decimal currency for payouts, even though you can charge two-decimal amounts. When you create a manual payout in HUF, you must provide integer amounts that are evenly divisible by 100. For example, if you have an available balance of HUF 10.45, you can pay out HUF 10 by submitting `1000` for the `amount` value. You can’t submit a payout for the full balance, HUF 10.45, because the `amount` value of `1045` isn’t evenly divisible by 100.                                            |
| New Taiwan Dollar (TWD) | Stripe treats TWD as a zero-decimal currency for payouts, even though you can charge two-decimal amounts. When you create a manual payout in TWD, you must provide integer amounts that are evenly divisible by 100. For example, if you have an available balance of TWD 800.45, you can pay out TWD 800 by submitting `80000` for the `amount` value. You can’t submit a payout for the full balance, TWD 800.45, because the `amount` value of `80045` isn’t evenly divisible by 100.                                       |
| Ugandan Shilling (UGX)  | UGX transitioned to a zero-decimal currency, but backwards compatibility requires you to represent it as a two-decimal value, where the decimal amount is always `00`. For example, to charge 5 UGX, provide an `amount` value of `500`. You can’t charge fractions of UGX. For invoices where the `amount` is fractional after prorations, coupons, or taxes, Stripe automatically rounds that amount to the nearest number evenly divisible by 100. We credit or debit any difference from rounding to the customer balance. |

## Minimum and maximum charge amounts

Stripe enforces a minimum payment amount for all charges to make sure the Stripe fee doesn’t exceed your charge. The minimum amount you can charge depends on the payout [bank account settlement currency](https://docs.stripe.com/payouts.md#supported-accounts-and-settlement-currencies).

Subscription charges support zero-amount charges to account for coupons and free trials. However, any non-zero amount is still subject to the applicable minimum.

### Minimum charge amount by currency

If you only have one bank account, the minimum amount shown applies to all charges in the same currency as the account. Charges requiring [conversion](https://docs.stripe.com/payments/currencies/localize-prices.md) into your account’s [default settlement currency](https://docs.stripe.com/payouts.md#multiple-bank-accounts) must meet the equivalent minimum of the settlement currency.

For example, if you have GBP and USD bank accounts, with GBP set as your default currency, any non-USD charges you create convert to GBP. These charges must meet the minimum amount required for GBP after conversion.

Use these minimum amounts by currency:

- 0.50 USD
- 2.00 AED
- 0.50 ARS
- 0.50 AUD
- 0.50 BRL
- 0.50 CAD
- 0.50 CHF
- 0.50 COP
- 15.00 CZK
- 2.50 DKK
- 0.50 EUR
- 0.30 GBP
- 4.00 HKD
- 175.00 HUF
- 0.50 IDR
- 0.50 ILS
- 0.50 INR
- 50 JPY
- 50 KRW
- 10 MXN
- 2.00 MYR
- 3.00 NOK
- 0.50 NZD
- 0.50 PHP
- 2.00 PLN
- 2.00 RON
- 0.50 RUB
- 3.00 SEK
- 0.50 SGD
- 10 THB
- 0.50 ZAR

Exceptions to the minimum charge amount apply to some payment methods, such as [iDEAL](https://docs.stripe.com/payments/ideal.md) (allows `amount` values as low as `1`).

### Maximum charge amounts

In general, the number of allowed digits limits the maximum amount you can charge a customer.

#### Card payments

For card payments, the maximum charge amount is determined by the card network. The `amount` value supports up to:

- 12 digits for most card payments, for a maximum of 999,999,999,999 in minor units
- 9 digits for American Express in most currencies, for a maximum of 999,999,999 in minor units

Card networks can impose charge amount limits that are more restrictive than digit number, depending on currency and region.

> When processing JCB, Diners Club, and Discover cards from Japanese Stripe accounts, the maximum amount is 8 digits (99,999,999 JPY), regardless of the card network limits listed above. Learn more about [accepting JCB payments in Japan](https://support.stripe.com/questions/enabling-jcb-payments-for-japan-based-stripe-accounts).

#### Other payment methods

For non-card payment methods, the number of allowed digits limits the maximum amount you can charge. The `amount` value supports up to:

- 12 digits for IDR, for a maximum charge of 9,999,999,999.99 IDR (`999999999999`)
- 10 digits for COP, for a maximum charge of 99,999,999.99 COP (`9999999999`)
- 9 digits for INR, for a maximum charge of 9,999,999.99 INR (`999999999`)
- 8 digits for all other currencies, for a maximum charge of 999,999.99 (`99999999`)

Some [payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#country-currency-support) enforce their own per-currency maximums that can be more restrictive than these limits.

## Supported payment methods

In the United States, you can accept these cards: Visa, Mastercard, American Express, Discover, JCB, Diners Club, China UnionPay, debit cards.

You can accept additional [payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#country-currency-support) based on your Stripe account’s country, which you configure when you [set up your Stripe account](https://docs.stripe.com/get-started/account/set-up.md).

### Review EEA card pricing 

Cards issued in the *European Economic Area* (The European Economic Area is a regional single market with free movement of labor, goods, and capital. It encompasses the European Union member states and three additional states that are part of the European Free Trade Association) (EEA) often have fees that differ from other regions. Processing costs can vary by issuing region because of cross-border fees and exchange rates, which means EEA-issued cards can incur different fees depending on the transaction currency.

Use these region-specific fees to inform your pricing when you accept multiple currencies. Stripe defines EEA cards as cards issued in the following countries:

- Andorra (AD)
- Austria (AT)
- Belgium (BE)
- Bulgaria (BG)
- Croatia (HR)
- Cyprus (CY)
- Czech Republic (CZ)
- Denmark (DK)
- Estonia (EE)
- Faroe Islands (FO)
- Finland (FI)
- France (FR)
- Germany (DE)
- Gibraltar (GI)
- Greece (GR)
- Greenland (GL)
- Guernsey (GG)
- Holy See (Vatican City State) (VA)
- Hungary (HU)
- Iceland (IS)
- Ireland (IE)
- Isle of Man (IM)
- Italy (IT)
- Jersey (JE)
- Latvia (LV)
- Liechtenstein (LI)
- Lithuania (LT)
- Luxembourg (LU)
- Malta (MT)
- Monaco (MC)
- Netherlands (NL)
- Norway (NO)
- Poland (PL)
- Portugal (PT)
- Romania (RO)
- Saint Pierre and Miquelon (PM)
- San Marino (SM)
- Slovakia (SK)
- Slovenia (SI)
- Spain (ES)
- Sweden (SE)
- Türkiye (TR)
- United Kingdom (GB)

## Countries with foreign exchange control 

Remittance to or from countries with foreign exchange control (including, but not limited to, Brazil) is carried out exclusively through authorized channels, pursuant to the legislation applicable in those countries.

## See also

- [Receive payouts](https://docs.stripe.com/payouts.md)
- [Localize prices](https://docs.stripe.com/payments/currencies/localize-prices.md)
