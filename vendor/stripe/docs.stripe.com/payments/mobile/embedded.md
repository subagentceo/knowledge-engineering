# Payment Element

Embed payment methods directly in your app.

The Payment Element is a customizable drop-in component that [embeds a list of payment methods](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md) on any screen in your app. When a customer selects a payment method from the list, a sheet below it collects payment details. You can customize it to match the look and feel of your app. The In-app Payment Element is available in our [iOS](https://github.com/stripe/stripe-ios), [Android](https://github.com/stripe/stripe-android), and [React Native](https://github.com/stripe/stripe-react-native) SDKs. See our [accept in-app payments](https://docs.stripe.com/payments/mobile/accept-payment-embedded.md) guide to get started.

> #### US apps selling digital goods
> 
> Android apps in the US that sell digital goods can process payments in-app using the Payment Element. If you sell digital goods on iOS, see how to implement an app-to-web flow using Stripe Checkout in [Sell in-app digital goods and subscriptions](https://docs.stripe.com/mobile/digital-goods/checkout.md).
![Payment Element integration example](https://b.stripecdn.com/docs-statics-srv/assets/mobile-payment-element.de700c536720f40087a00fde4b958b9a.png)

Payment Element integration example

With the Payment Element, you get:

- [Access to over 100 global payment methods](https://docs.stripe.com/payments/payment-methods/overview.md): This includes Apple Pay, Link, and other popular payment methods that are automatically enabled.

- [Dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md): Dynamically order and display payment methods and [launch A/B tests](https://docs.stripe.com/payments/a-b-testing.md) for new payment methods.

- [UI customizations to match your app](https://docs.stripe.com/elements/appearance-api/mobile.md): Match the UI to the design of your app. The layout stays consistent, but you can modify colors, fonts, and so on.

- [Address collection](https://docs.stripe.com/payments/mobile/save-during-payment.md?platform=ios&mobile-ui=payment-element#collect-payment-details): Collect full or partial billing addresses with any payment method.

- [Saved payment methods](https://docs.stripe.com/payments/mobile/accept-payment.md?platform=ios&type=payment#enable-saved-cards): Save, reuse, and manage cards and bank accounts. You can also [store a customer’s payment details without an initial payment](https://docs.stripe.com/payments/mobile/accept-payment.md?platform=ios&type=setup).

## Stripe in-app Elements demo

Scan this QR code or use this [link](https://apps.apple.com/us/app/stripe-payments-showcase/id6450683352) to download an interactive demo app that demonstrates Stripe’s in-app Elements. In the app, you can generate different UI specifications to see which works best for your use case.
![Stripe In-app Payments Showcase App Store QR Code](https://b.stripecdn.com/docs-statics-srv/assets/appstore_qr.ce33264690ffb3cebb2982458ccb496d.svg)

## Layout

Choose between radio layout, check mark layout, or floating buttons.
![Payment Element layout options](https://b.stripecdn.com/docs-statics-srv/assets/pe-layout.f6c429b6dfdf24d2fa144725d8435a22.png)

Payment Element supports: radio buttons, checkmarks, and floating button layouts.

## Appearance

Use the Appearance API to customize the look and feel of the Payment Element to match your app. With the Appearance API, you can control fonts, colors, borders, shadows, and so on.
![Payment Element appearance customization](https://b.stripecdn.com/docs-statics-srv/assets/pe-appearance.0c2a1c5208103bcfb92b67b10dd9fb2f.png)

Examples of different ways to style Payment Element

## Payment methods

The Payment Element provides access to over 100 payment methods across all Stripe-supported countries. You can enable payment methods from your Stripe Dashboard or by using [Custom Payment Methods](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md).

Payment method providers often change their collection and display requirements. When you use Payment Element to display payment methods, Stripe handles all payment detail collection in prebuilt, localized forms that we keep up-to-date with each payment provider.
![Payment Element payment methods](https://b.stripecdn.com/docs-statics-srv/assets/pe-payment-methods.91cb1be9cb8ef55b873074dd6f3a7c12.png)

Examples of P24 and SEPA debit in the Payment Element

## Wallets

Payment Element supports popular wallets, including Apple Pay and Link, a wallet built by Stripe. Payment Element shows wallets in-line as payment method options.
![Payment Element wallets](https://b.stripecdn.com/docs-statics-srv/assets/pe-wallets.fed1c5ad5fbb89d74be25e02d291e25c.png)

Example of Link in Payment Element

## Saved payment methods

The Payment Element supports saving, displaying, and managing saved payment methods. Consent collection is handled automatically, ensuring global compliance.

Saved payment methods supports cards, US bank accounts, and SEPA debit accounts.

The CustomerSessions API provides additional control over:

- When to show or hide the save consent box
- When to show or hide the saved payment methods
- Allowing buyers to remove saved payment methods
- Preventing buyers from removing the last saved payment method
![Payment Element saved payment methods](https://b.stripecdn.com/docs-statics-srv/assets/pe-saved-payment-methods.6aef147c8b230f2cb50c115b2054f814.png)

Examples of how customers can access saved payment methods in Payment Element

## Collect address details

You can configure the Payment Element to collect additional payment information, including name, email, phone number, and billing address, regardless of which payment method a customer uses.
![Payment Element address collection](https://b.stripecdn.com/docs-statics-srv/assets/pe-collecting-address-details.f806ddc435848cdf38470fb4e5adb15b.png)

Example showing full billing details collected

## Additional features

The Payment Element also contains the following features:

- CVC recollection: Configure whether CVC re-collection is required when users pay with a saved payment method.
- [Card brand filtering](https://docs.stripe.com/payments/mobile/filter-card-brands.md): Configure which card brands you accept.
