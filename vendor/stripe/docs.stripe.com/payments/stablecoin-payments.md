# Stablecoin payments

Learn about accepting payments in stablecoins.

Stablecoin payments allow you to accept *stablecoins* (A cryptocurrency that's pegged to the value of a fiat currency or other asset in order to limit volatility) from customers around the world. Customers can pay with their preferred crypto wallet, token, and payment network, while completed stablecoin payments settle in your Stripe balance in USD.

[Try the demo](https://buy.stripe.com/test_28o4ig0SY9Xq8co3cc) [Enable stablecoin payments](https://docs.stripe.com/payments/accept-stablecoin-payments.md)

#### Payment method properties

- **Customer locations**

  Global1

- **Presentment currency**

  USDC (Ethereum, Solana, Polygon, and Base networks), USDP (Ethereum and Solana), USDG (Ethereum)

- **Payment confirmation**

  Customer-authenticated

- **Payment method family**

  Digital currency payments

- **Recurring payments**

  [Yes](https://docs.stripe.com/billing/subscriptions/stablecoins.md)

- **Refunds / Partial refunds**

  [Yes / Yes](https://docs.stripe.com/payments/stablecoin-payments.md#refunds)

- **Dispute support**

  [No](https://docs.stripe.com/payments/stablecoin-payments.md#disputed-payments)

- **Manual capture support**

  Not supported

- **Connect support**

  Yes

- **Payout timing**

  Varies by network

1 Excludes [sanctioned countries](https://stripe.com/legal/restricted-businesses)

#### Business locations

- US

Customers can use stablecoins as payment globally, but currently only US businesses can accept stablecoin payments.

#### Product support

- Connect
- Checkout
- Elements
- Billing

## Payment flow 

When customers select the crypto payment method, they’re redirected to [crypto.stripe.com](https://crypto.stripe.com) to connect their crypto wallet and complete the transaction.
![](https://b.stripecdn.com/docs-statics-srv/assets/crypto-payment-flow-checkout.3ec8dcf46904668b9ea37da1fd644051.svg)

Customer selects **Crypto** payment option at checkout
![](https://b.stripecdn.com/docs-statics-srv/assets/crypto-payment-flow-stripe.9da4561ce4b3feeae1b3b4f44b6aac27.svg)

Stripe redirects the Customer to **crypto.stripe.com** to connect a crypto wallet and select a currency and payment network
![](https://b.stripecdn.com/docs-statics-srv/assets/crypto-payment-flow-confirm.c18d0c532b4020f05a1430b064e6ba27.svg)

Customer gets notification that the payment is complete
![](https://b.stripecdn.com/docs-statics-srv/assets/crypto-payment-flow-return.1c53f18a8b4d7d5c1de3091ca7e63917.svg)

(Optional) Customer is redirected back to the business’ site for confirmation

## Get started 

You don’t have to integrate stablecoin payments and other payment methods individually. If you use our front-end products, Stripe automatically determines the most relevant payment methods to display. Go to the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods) and enable stablecoin payments. To get started with one of our hosted UIs, follow a quickstart:

- [Checkout](https://docs.stripe.com/checkout/quickstart.md): Our prebuilt, hosted checkout page.
- [Elements](https://docs.stripe.com/payments/quickstart-checkout-sessions.md): Our drop-in UI components.

### Other payment products

The following Stripe products also let you add stablecoin payments from the Dashboard:

- [Invoicing](https://docs.stripe.com/invoicing/no-code-guide.md)
- [Payment Links](https://docs.stripe.com/payment-links.md)

Learn more about [how to accept stablecoin payments](https://docs.stripe.com/payments/accept-stablecoin-payments.md).

## Limitations

Make sure stablecoins support your use case before [getting started](https://docs.stripe.com/payments/accept-stablecoin-payments.md).

- Currently only US businesses can accept stablecoin payments.
- All stablecoin payments settle in your Stripe balance in USD.

- Refunds are always returned as stablecoins to the customer’s original wallet.
- Customer transaction limits are 10,000 USD per transaction.

## Disputes 

The risk of fraud or unrecognized payments is low because the customer must authenticate the payment with their bank. As a result, you won’t have disputes that turn into chargebacks, with funds withdrawn from your Stripe account.

## Refunds 

To issue a refund, follow the [refund flow](https://docs.stripe.com/refunds.md). For stablecoin payments, the refund goes back as stablecoins in the customer’s original wallet.

## Billing 

[Stripe Billing](https://stripe.com/billing) supports stablecoin payments for both [invoices](https://docs.stripe.com/invoicing/payment-methods.md) and [subscriptions](https://docs.stripe.com/billing/subscriptions/stablecoins.md).

## Connect support 

*Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platforms can accept crypto payments for all [charge types](https://docs.stripe.com/connect/charges.md). Each connected account must have the crypto payment method enabled.

### Connected accounts with access to the full Stripe Dashboard

Connected accounts with access to the full Stripe Dashboard (including Standard accounts) can enable crypto payments [through the Stripe Dashboard](https://docs.stripe.com/payments/accept-stablecoin-payments.md).

### Connected accounts without access to the full Stripe Dashboard

You can [request the `crypto_payments` capability](https://docs.stripe.com/connect/account-capabilities.md#more-about-capabilities) for connected accounts from the account details page [in your platform Dashboard](https://dashboard.stripe.com/connect/accounts), or through the API.

To see which connected accounts have enabled Crypto, check whether their `crypto_payments` capability is set to `active` in the `Account` object’s [capabilities hash](https://docs.stripe.com/api/accounts/object.md#account_object-capabilities-crypto_payments).

## See also

- [Stripe Crypto](https://docs.stripe.com/crypto.md)
- [Accept stablecoin payments](https://docs.stripe.com/payments/accept-stablecoin-payments.md)
- [Enable crypto purchases with a fiat-to-crypto onramp](https://docs.stripe.com/crypto/onramp.md)
