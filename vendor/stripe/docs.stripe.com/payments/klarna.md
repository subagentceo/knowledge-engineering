# Klarna payments

Allow customers to make flexible payments while getting paid upfront with Klarna.

Klarna is a global payment method that gives customers a range of payment options during checkout. These payment options enable customers to pay for purchases over time.

For information on payment method transaction fees, refer to [pricing details](https://stripe.com/pricing/local-payment-methods#klarna).

Paying with Klarna redirects customers to Klarna’s site, which displays payment options based on factors such as the customer’s currency, transaction amount, and the payment use case. After the customer selects a payment option, Klarna returns them to your site to complete the order. When the payment is accepted, you receive the entire order amount (minus fees) in your Stripe account. Klarna collects the initial payment from your customer and any future installment payments. If the customer can’t repay Klarna, Klarna takes loss liability.

#### Payment method properties

- **Customer locations**

  Australia, Austria, Belgium, Canada, Czechia, Denmark, Finland, France, Greece, Germany, Ireland, Italy, Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Spain, Sweden, Switzerland, United Kingdom, and the United States

- **Presentment currency**

  AUD, CAD, CHF, CZK, DKK, EUR, GBP, NOK, NZD, PLN, RON, SEK, or USD

- **Payment confirmation**

  Customer-initiated

- **Payment method family**

  Buy now, pay later

- **Recurring payments support**

  [Yes](https://docs.stripe.com/payments/klarna.md#payment-options)

- **Payout timing**

  Standard payout timing applies

- **Connect support**

  [Yes](https://docs.stripe.com/payments/klarna.md#connect)

- **Dispute support**

  [Yes](https://docs.stripe.com/payments/klarna/disputes.md)

- **Manual capture support**

  Yes

- **Refunds / Partial refunds**

  [Yes / Yes](https://docs.stripe.com/payments/klarna.md#refunds)

#### Business locations

Stripe accounts in the following countries can accept Klarna payments:

- AT
- AU
- BE
- CA
- CH
- CY
- CZ
- DE
- DK
- EE
- ES
- FI
- FR
- GB
- GR
- HR
- IE
- IT
- LT
- LU
- LV
- MT
- NL
- NO
- NZ
- PL
- PT
- RO
- SE
- SI
- SK
- US

#### Product support

- Connect
- Checkout
- Payment Links
- Elements
- Invoicing
- Subscriptions

## Payment flow

Below is a demonstration of the Klarna payment flow from your checkout page:
![](https://docs.stripecdn.com/f470130f4f7c7aedece97118efb5923aae9926ec8eda84048b76e238fadb0864.mp4)
## Get started 

To get started with Klarna:

1. Read the [Klarna rules](https://docs.stripe.com/payments/klarna/compliance.md) to ensure your business is eligible to accept Klarna payments. For example, Klarna doesn’t support B2B payments.

2. Refer to [payment options](https://docs.stripe.com/payments/klarna.md#payment-options) to understand what payment options are available to your customers.

3. If you don’t already have a Stripe integration, create a [Stripe-hosted page](https://docs.stripe.com/checkout/quickstart.md) with [Checkout](https://docs.stripe.com/payments/checkout.md), then [start accepting Klarna payments](https://docs.stripe.com/payments/klarna/accept-a-payment.md).

   You can also use Checkout to [embed a payment page on your site](https://docs.stripe.com/checkout/embedded/quickstart.md) or [build a customized checkout page with Elements](https://docs.stripe.com/payments/quickstart-checkout-sessions.md) (such as the [Payment Method Messaging Element](https://docs.stripe.com/elements/payment-method-messaging.md)). To build an advanced integration that handles complex payment flows, you can use [Stripe Elements](https://docs.stripe.com/payments/elements.md) with the [Payment Intents API](https://docs.stripe.com/api/payment_intents.md).

   (Private preview) [Stripe Terminal](https://docs.stripe.com/terminal.md) supports using Klarna in-store with [additional payment methods](https://docs.stripe.com/terminal/payments/additional-payment-methods.md?payment-method=klarna). If you’re interested in joining the preview, [share your email address to request access](https://docs.stripe.com/payments/klarna.md#signup). 
   ### Want access to Klarna on Stripe Terminal?

Enter your email to request access.

   ```bash
   curl https://docs.stripe.com/preview/register \
     -X POST \
     -H "Content-Type: application/json" \
     -H "Referer: https://docs.stripe.com/payments/klarna" \
     -d '{"email": "EMAIL", "preview": "terminal_lpm_preview"}'
```


4. Follow best practices, such as [sending relevant data to Klarna about items in the shopping cart](https://docs.stripe.com/payments/klarna/best-practices.md#send-shopping-cart-item-data), to [optimize conversion and cart size for Klarna payments](https://docs.stripe.com/payments/klarna/best-practices.md).

## Payment options 

Depending on the customer’s currency and the transaction amount, Klarna can present customers with various payment options. Cart ranges and geographic availability for payment options are determined by Klarna and might change at their discretion. Regardless of the underlying payment option selected, Stripe makes the full amount of the funds (minus fees) available to you upfront and Klarna collects the purchase amount from your customer, who repays Klarna directly. The following table describes the payment options and the buyer countries that support each option for one-time and recurring payments1.

| Payment option                                                                                                                                                                                                                                                                                                                                                                                                      | Customer country2                                                                                                                                       | Minimum/maximum                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Pay in full**3: Customers pay for the purchase immediately using a linked card, bank debit, or bank transfer. Use cases:
  - One-time payments
  - Short-term subscriptions (weekly or monthly)
  - Long-term subscriptions (longer than monthly)
  - Mixed cart (one-off purchase and subscription)
  - On-demand payments                                                                                       | - AT
  - AU
  - BE
  - CA
  - CH
  - CZ
  - DE
  - DK
  - ES
  - FI
  - FR
  - GB
  - GR
  - IE
  - IT
  - NL
  - NO
  - PL
  - PT
  - RO
  - SE
  - US | - AUD: 0-4,000
  - CAD: 0-2,000
  - CHF: 1-1,585
  - CZK: 0-100,000
  - DKK: 1-100,000
  - EUR: 0-10,000
    - Netherlands: 0-2,500
    - France, Greece, Ireland, Italy, Portugal: 0-4,000
  - GBP: 0-4,000
  - NOK: 1-100,000
  - PLN: 0-20,000
  - RON: 0-20,000
  - SEK: 1-100,000
  - USD: 0-4,000                                                                                                      |
| **Pay later**4: Customers pay for the purchase in a single payment in 30 days. Use cases:
  - One-time payments
  - Short-term subscriptions (weekly or monthly)
  - Long-term subscriptions (longer than 2 months)
  - On-demand payments                                                                                                                                                                          | - AT
  - BE
  - CH
  - CZ
  - DE
  - DK
  - ES
  - FI
  - FR
  - GB
  - GR
  - IT
  - NL
  - NO
  - PL
  - PT
  - RO
  - SE
  - US                      | - CHF: 1-1,000
  - CZK: 0-12,250
  - DKK: 1-50,000
  - EUR:
    - Austria: 0.1-5,000
    - Belgium: 1-1,500
    - France, Greece, Italy, Portugal, Spain: 0-500
    - Germany: 0.1-10,000
    - Netherlands: 1-5,000
    - Finland: 1-3,000
  - GBP: 1-1,500
  - NOK: 0-75,000
  - PLN: 1-7,000
  - RON: 0-2,500
  - SEK: 1-100,000
  - USD: 5-1,000                                                         |
| **Pay in 3 or 4**5: Customers pay for the purchase in three or four interest-free payments. The total transaction amount is typically spread equally across the installments, but Klarna might occasionally charge your customer more in the first installment based on the customer’s purchase power and other credit factors. Use cases:
  - One-time payments
  - Long-term subscriptions (longer than 2 months) | - AT
  - AU
  - CA
  - CH
  - CZ
  - DE
  - DK
  - ES
  - FR
  - GB
  - GR
  - IE
  - IT
  - NL
  - NO
  - NZ
  - PL
  - PT
  - RO
  - US               | - Pay in 3
    - CHF: 1-5,000
    - CZK: 25-25,000
    - DKK: 10-50,000
    - EUR:
      - Austria, Germany: 1-5,000
      - France, Ireland, Italy, Spain: 1-1,500
      - Netherlands: 25-5,000
      - Greece, Portugal: 1-1,000
    - GBP: 1-2,000
    - NOK: 10-75,000
    - PLN: 5-5,000
    - RON: 5-5,000
  - Pay in 4
    - AUD: 10-2,000
    - CAD: 1-1,500
    - NZD: 10-2,000
    - USD: 1-2,000 |
| **Financing**6: Customers pay for the purchase over a longer term of up to 36 months, which might include interest. Not all customers are approved for the maximum amount, and approval is subject to credit worthiness. Use cases:
  - One-time payments                                                                                                                                                           | - AT
  - CA
  - DE
  - FI
  - GB\*
  - IT
  - NO
  - SE
  - US                                                                                          | - CAD: 250-17,500
  - EUR:
    - Austria: 25-5,000
    - Finland: 25-3,000
    - Germany: 25-10,000
    - Italy: 35-3,000
  - GBP: 250-5,000
  - NOK: 250-75,000
  - SEK: 250-100,000
  - USD: 45-10,000                                                                                                                                                                                                     |

1 When you set the [setup_future_usage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) parameter, a Klarna payment isn’t considered a one-time payment. This prevents the [Payment Method Messaging Element](https://docs.stripe.com/elements/payment-method-messaging.md) and [Payment Element](https://docs.stripe.com/payments/payment-element.md) from displaying payment plans that a customer is eligible for.

2 Among US territories, Klarna only supports Puerto Rico for all payment options. Pay later is supported in all states except Montana (MT), New Mexico (NM), and Hawaii (HI). Pay in 4 is supported in all states except New Mexico (NM) and Hawaii (HI). Financing is supported in all states except Iowa (IA), West Virginia (WV), and Massachusetts (MA).

3 Australia, Norway, and Poland only support Pay in Full for one-time payments.

4 Germany, Sweden, and the United States are the only countries that support Pay Later for subscription and on-demand payments.

5 Australia, Finland, New Zealand, and Poland only support Pay in 3 or 4 for one-time payments.

6 See the [Klarna FAQ](https://support.stripe.com/questions/klarna-faq#klarna-financing-us-uk-payers) for more information about Klarna Financing availability in the United Kingdom.

## Cross-border payments 

The following table describes the requirements for using Klarna internationally. For example, a Swedish business can present in EUR to a buyer in Germany because they’re both in the *European Economic Area (EEA)* (The European Economic Area is a regional single market with free movement of labor, goods, and capital. It encompasses the European Union member states and three additional states that are part of the European Free Trade Association). However, an Australian business must present in AUD, and can only accept payments from buyers in Australia.

| Business location | Customer location                                | Presentment currency       |
| ----------------- | ------------------------------------------------ | -------------------------- |
| EEA country       | - EEA country
  - Switzerland
  - United Kingdom | Customer location currency |
| United Kingdom    | - EEA country
  - Switzerland
  - United Kingdom | Customer location currency |
| Switzerland       | - EEA country
  - Switzerland
  - United Kingdom | Customer location currency |
| Other countries   | Same as business location                        | Business location currency |

## Refunds 

You can refund Klarna charges up to 180 days after the payment completes. Klarna cancels any remaining payments on a refunded charge and returns the already-paid amount to the customer. Refunds usually take 5-7 business days to complete, but might take longer depending on the customer’s financial institution and the type of purchase. Klarna supports full and partial refunds. You can also issue multiple partial refunds up to the amount of the original charge. Partial refunds update the Klarna order to reflect the new total amount.

- If the partial refund is greater than the remaining balance of the order, Klarna deducts the refund amount from the outstanding balance and returns the difference.
- If the partial refund is less than the remaining balance of the order, Klarna deducts the amount from the outstanding balance and spreads refunds evenly across the remaining payments.

Klarna doesn’t support refunding a payment when it has been escalated to a dispute. Learn more about [responding to disputes](https://docs.stripe.com/payments/klarna/disputes.md).

## Connect 

A Connect platform can use [Stripe Connect](https://docs.stripe.com/connect/how-connect-works.md) with Klarna to process connected account payments of all [charge types](https://docs.stripe.com/connect/charges.md).

### Connected accounts with full Stripe Dashboard access

Connected accounts with access to the full Stripe Dashboard, including Standard accounts, can enable Klarna through their Dashboard. To check which accounts have enabled Klarna, use the `capabilities` hash in the [accounts webhooks or APIs](https://docs.stripe.com/api/accounts/object.md#account_object-capabilities-klarna_payments) to see if the `klarna_payments` capability is set to `active`.

### Connected accounts without full Stripe Dashboard access

To enable Klarna for connected accounts without full access to the Stripe Dashboard, including Express and Custom accounts, request the `klarna_payments` [capability](https://docs.stripe.com/connect/account-capabilities.md). Customers see the name of your connected account during checkout and in the Klarna app.

## Buyer country filtering

Buyer country filtering applies when you enable a dynamic payment method on the Payment Element or Checkout Session. Klarna only displays as a payment method option if the buyer’s country is supported.

We determine the buyer’s country in the following priority order:

1. Shipping address country: The two-letter country code, not the full name of the country.
2. Geocoded country: The country based on the client-side IP address.
