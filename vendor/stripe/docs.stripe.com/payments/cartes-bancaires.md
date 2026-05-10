# Cartes Bancaires (CB)

Learn about Cartes Bancaires, a common payment method in France.

Cartes Bancaires is France’s local card network. More than 95% of these cards are co-badged with either Visa or Mastercard, meaning you can process these cards over either Cartes Bancaires or the Visa or Mastercard networks. Businesses processing co-badged cards in the EEA must provide customers a choice of which network they prefer at checkout. Learn more in our [guide for co-badged cards compliance](https://docs.stripe.com/co-badged-cards-compliance.md).

Cartes Bancaires can have a positive effect on your acceptance rate in France. If a charge is declined on the Cartes Bancaires network for a technical reason, Stripe [automatically retries the charge](https://stripe.com/payments/features#authorization) on Visa or Mastercard’s networks.

#### Payment method properties

- **Customer locations**

  Europe

- **Presentment currency**

  EUR

- **Payment confirmation**

  Customer-initiated

- **Payment method family**

  Cards

- **Recurring payments**

  Yes

- **Payout timing**

  Standard payout timing applies

- **Connect support**

  Yes

- **Dispute support**

  [Yes](https://docs.stripe.com/payments/cartes-bancaires.md#disputes)

- **Manual capture support**

  Yes

- **Multicapture support**

  Yes

- **Refunds / Partial refunds**

  Yes / Yes

#### Business locations

Stripe accounts in the following countries can accept Cartes Bancaires payments:

- AT
- AU
- BE
- BG
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
- GI
- GR
- HK
- HR
- HU
- IE
- IS
- IT
- JP
- LI
- LT
- LU
- LV
- MT
- MX
- NL
- NO
- NZ
- PL
- PT
- RO
- SE
- SG
- SI
- SK
- US

#### Product support

- Connect
- Checkout
- Payment Links
- Subscriptions
- Invoicing
- Elements1
- Terminal2

1Express Checkout Element doesn’t support Cartes Bancaires. 2Terminal integrations have [specific regional requirements](https://docs.stripe.com/terminal/payments/regional.md?integration-country=FR) to process Cartes Bancaires cards in France.

## Availability

If your business isn’t based in France, you must first process one payment from a Cartes Bancaires eligible card to fully enable this payment method.

## Disputes

As with Visa and Mastercard, cardholders can dispute Cartes Bancaires charges. Because Cartes Bancaires dispute rules are more stringent, there are fewer reasons that a cardholder can dispute a charge, which on average leads to a lower dispute rate compared to Visa and Mastercard. Businesses can’t contest Cartes Bancaires disputes. The dispute fee is 0 EUR on Cartes Bancaires.

> #### Won disputes
> 
> In some cases, Cartes Bancaires might withdraw a dispute, and the dispute status becomes `won`.

## Integration

If you can already [accept card payments](https://docs.stripe.com/payments/accept-a-payment.md), you can accept Cartes Bancaires. See the [co-badged cards compliance guide](https://docs.stripe.com/co-badged-cards-compliance.md) to learn how to best handle customer priority selection, and to find multiple test cards that you can use to test your integration as soon as it’s active. If you require that Cartes Bancaires is never the default network for any payments, contact [Stripe Support](https://support.stripe.com/contact).
