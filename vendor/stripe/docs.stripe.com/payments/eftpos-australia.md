# eftpos Australia

Learn about eftpos Australia, a common payment method in Australia.

[Eftpos](https://www.eftposaustralia.com.au/) is Australia’s local debit card network. More than 90% of eftpos cards are co-branded with either Visa or Mastercard, meaning you can process these cards over either network supported by the card.

Stripe processes co-branded eftpos cards over eftpos, plus either Visa or Mastercard, in accordance with [least cost routing requirements](https://support.stripe.com/questions/supporting-dual-network-debit-cards-in-australia) and depending on the [type of transaction](https://docs.stripe.com/payments/eftpos-australia.md#identify-which-network-a-payment-was-processed-on).

> Eftpos-only cards (also known as “proprietary eftpos cards”) only support in-person payments and can’t be used for online transactions.

#### Payment method properties

- **Customer locations**

  Australia

- **Presentment currency**

  AUD

- **Payment confirmation**

  Customer-initiated

- **Payment method family**

  Cards

- **Payment method type**

  Debit and prepaid cards

- **Recurring payments**

  Yes

- **Payout timing**

  Standard payout timing applies

- **Connect support**

  Yes

- **Dispute support**

  Yes

- **Manual capture support**

  No

- **Refunds / Partial refunds**

  Yes / Yes

#### Business locations

Stripe accounts in the following countries can accept eftpos payments:

- AU

#### Product support

- Connect
- Checkout
- Payment Links
- Subscriptions
- Invoicing
- Elements1
- Terminal2

1Express Checkout Element doesn’t support eftpos. 2Terminal integrations have [specific regional requirements](https://docs.stripe.com/terminal/payments/regional.md?integration-country=AU) to process eftpos in Australia.

## Availability

Eftpos is available to any business that uses Stripe in Australia, with the following exceptions:

- Massage parlors ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 7297)
- Financial institutions—manual cash disbursements ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 6010)
- Financial institutions—merchandise and services ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 6012)
- Non-financial institutions—foreign currency, money orders and travelers’ checks. ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 6051)
- Remote stored value load—merchant ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 6530)
- Stored value card purchase/load ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 6540)
- Wires, money orders ([MCC](https://docs.stripe.com/connect/setting-mcc.md) 4829)

## Integration 

If your integration can already [accept card payments](https://docs.stripe.com/payments/accept-a-payment.md), you can also accept eftpos without additional updates.

Eftpos is the default network for payment. Unless you change the default network, you must inform your customers that whenever they use a dual-network debit card, their payments might be processed through the debit network, regardless of the logo that appears when they enter their payment information.

We recommend you notify your customers based on the type of payment transaction:

- For single payment transactions, display a notification to the customer before the completion of the checkout process.
- For new recurring payment transactions, display a notification to the customer at the time of setup.
- For existing recurring payment transactions, notify your customers in advance of future transactions.

You must notify your customers about how network routing functions, and how payments processing works. You can use the suggested notification message below:

Notwithstanding the payment brand logo displayed when you enter your payment information, whenever you use a dual-network debit card displaying eftpos and another payment brand, your payment (including any future recurring debit payments authorized by you) might be processed through either network. For more information, see the .

We recommend that you provide further information in your Terms and Conditions or FAQs on how network routing functions and how payments processing works. For guidelines on best practices, see the Australian Payments Network [MCR Online Notification Guidelines](https://www.auspaynet.com.au/resources/cards-and-devices).

## Understand which network processes payments 

Stripe dynamically routes between the international scheme (Visa or Mastercard) and eftpos, depending on the type of payment, technical availability and authorization rate considerations:

- If a payment requires [placing a hold on the card](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) (in other words, if there’s a delay between authorization and capture), Stripe always routes to the international scheme.
- For other types of payments, Stripe generally defaults to the eftpos network.

If you require that eftpos is never the default network for any payments, contact [support](https://support.stripe.com/contact).

To identify which network a payment was processed on, inspect the [network](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card-network) field on the [Charge](https://docs.stripe.com/api/charges/object.md) object associated with a successful [Payment Intent](https://docs.stripe.com/api/payment_intents/object.md):

```javascript
{
  "id": "ch_1Ff52K2eZvKYlo2CWe10i0s7",
  "object": "charge",
  ...
  "payment_method_details": {
    "card": {
      "brand": "visa",
      ...
      "network": "eftpos_au"
    },
    "type": "card"
  }
}
```

## Apple Pay support 

Stripe supports processing eftpos cards through Apple Pay. When a customer with a co-branded card chooses eftpos, Stripe routes the transaction over the eftpos network.

### Requirements 

To accept eftpos cards through Apple Pay:

- Your Stripe account must be based in Australia
- The presentment currency must be AUD
- Your business must not be in any of the [restricted categories](https://docs.stripe.com/payments/eftpos-australia.md#availability) for eftpos
- Apple Pay must be enabled in your [Payment methods settings](https://dashboard.stripe.com/settings/payment_methods)

### How it works 

When a customer pays with Apple Pay using an eftpos Australia card:

- Stripe detects when a customer pays with Apple Pay using a co-branded eftpos card.
- The customer selects the card brand at checkout on their Apple device.
- If the customer chooses eftpos, Stripe routes the transaction over the eftpos network.

To identify Apple Pay transactions processed over the eftpos network, inspect the [network](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card-network) field on the [Charge](https://docs.stripe.com/api/charges/object.md) object, which shows `eftpos_au`, along with the [wallet.type](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card-wallet-type) field  showing `apple_pay`.

### Integrate on iOS 

If you have an existing [Apple Pay integration](https://docs.stripe.com/apple-pay.md?platform=ios), add eftpos as an enabled network by configuring the SDK when your app starts.

#### Swift

```swift
StripeAPI.additionalEnabledApplePayNetworks = [.eftpos]
```

> Only add eftpos to your list of enabled networks if the transaction currency is AUD.

### Manual capture 

Eftpos doesn’t support [manual capture](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) and Apple Pay eftpos tokens can only route through the eftpos network, with no fallback to Visa or Mastercard. Eftpos Apple Pay payments with manual capture always fail.

To accept eftpos Apple Pay, set the PaymentIntent [`capture_method`](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-capture_method) to `automatic` (default) or `automatic_async`. If you also set [`payment_method_options.card.capture_method`](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-payment_method_options-card-capture_method), use `automatic` (default) or `automatic_async`.

If you need manual capture for card payments, set `capture_method` to `manual` in your [Payment Element](https://docs.stripe.com/payments/accept-a-payment-deferred.md) configuration. This causes the Payment Element to hide eftpos Apple Pay, so customers see other available payment options instead of encountering a payment failure.

> Don’t add `payment_method_options.card.capture_method: 'manual'` after the Payment Element has already rendered. If you do, the Element can’t detect the change and customers might select eftpos Apple Pay for a payment that fails at confirmation.

## See also

- [Migrating from Charges API to the Payment Intents API](https://docs.stripe.com/payments/payment-intents/migration.md)
- [Available eftpos test cards](https://docs.stripe.com/testing.md#cards)
