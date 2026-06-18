# Payment Sheet

A prebuilt UI that presents payment methods in a sheet.

The Payment Sheet is a prebuilt UI that presents payment methods in a sheet and is our recommended way to [accept payments](https://docs.stripe.com/payments/mobile/accept-payment.md) in most apps. You can customize it to match the look and feel of your app. The In-app Payment Sheet is available in our [iOS](https://github.com/stripe/stripe-ios), [Android](https://github.com/stripe/stripe-android), and [React Native](https://github.com/stripe/stripe-react-native) SDKs. See our [accept in-app payments](https://docs.stripe.com/payments/mobile/accept-payment.md) guide to get started.

> #### Accounts v2 API support
> 
> The Payment Sheet doesn’t support *customer-configured Accounts* (Account configurations represent role-based functionality that you can enable for accounts, such as merchant, customer, or recipient). It only supports `Customer` objects.

> #### US apps selling digital goods
> 
> Android apps in the US that sell digital goods can process payments in-app using the Payment Sheet. If you sell digital goods on iOS, see how to implement an app-to-web flow using Stripe Checkout in [Sell in-app digital goods and subscriptions](https://docs.stripe.com/mobile/digital-goods/checkout.md).
![Payment Sheet integration example](https://b.stripecdn.com/docs-statics-srv/assets/payment-sheet.63467c074c4908983eb8fb0ce5250e5f.png)

Payment Sheet integration example

With the Payment Sheet, you get:

- [Access to over 100 global payment methods](https://docs.stripe.com/payments/payment-methods/overview.md): This includes Apple Pay, Link, and other popular payment methods that are automatically enabled.

- [Dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md): Dynamically order and display payment methods and [launch A/B tests](https://docs.stripe.com/payments/a-b-testing.md) for new payment methods.

- [UI customizations to match your app](https://docs.stripe.com/elements/appearance-api/mobile.md): Match the UI to the design of your app. The layout stays consistent, but you can modify colors, fonts, and so on.

- [Address collection](https://docs.stripe.com/payments/mobile/save-during-payment.md?platform=ios&mobile-ui=payment-element#collect-payment-details): Collect full or partial billing addresses with any payment method.

- [Saved payment methods](https://docs.stripe.com/payments/mobile/accept-payment.md?platform=ios&type=payment#enable-saved-cards): Save, reuse, and manage cards and bank accounts. You can also [store a customer’s payment details without an initial payment](https://docs.stripe.com/payments/mobile/accept-payment.md?platform=ios&type=setup).

## Stripe in-app Elements demo

Scan this QR code or use this [link](https://apps.apple.com/us/app/stripe-payments-showcase/id6450683352) to download an interactive demo app that demonstrates Stripe’s in-app Payments. In the app, you can generate different UI specifications to see which works best for your use case.
![Stripe In-app Payments Showcase App Store QR Code](https://b.stripecdn.com/docs-statics-srv/assets/appstore_qr.ce33264690ffb3cebb2982458ccb496d.svg)

## Layout

Set the layout to `.automatic` for Stripe to provide the appropriate payment method layout. You can also select `.vertical` or `horizontal` layout.
![Payment Sheet layout options](https://b.stripecdn.com/docs-statics-srv/assets/ps-layout.588da531e61ebf4cc11175235a8cd08f.png)

The Payment Sheet supports vertical and horizontal layouts.

## Appearance

Use the Appearance API to customize the look and feel of Payment Sheet to match your app. With the Appearance API, you can control fonts, colors, borders, shadows, and so on.
![Payment Sheet appearance customization](https://b.stripecdn.com/docs-statics-srv/assets/ps-appearance.3d1914688a11b16808b42685a8b10c60.png)

Examples of different ways to style Payment Sheet

## Payment methods

The Payment Sheet provides access to over 100 payment methods across all Stripe-supported countries. You can enable payment methods from the Stripe Dashboard or by using [Custom Payment Methods](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md).

Payment method providers often change their collection and display requirements. When you use Payment Sheet to display payment methods, Stripe handles all payment detail collection in prebuilt, localized forms that we keep up-to-date with each payment provider.
![Payment Sheet payment methods](https://b.stripecdn.com/docs-statics-srv/assets/ps-payment-methods.07deb18cc15beeee90c75360d32cd762.png)

Examples of the card form and Klarna form in the Payment Sheet

## Wallets

The Payment Sheet supports popular wallets, including Apple Pay and Link, a wallet built by Stripe. Payment Sheet can show wallets using express buttons.
![Payment Sheet wallets](https://b.stripecdn.com/docs-statics-srv/assets/ps-wallets.7bbb65fb4323b81b63d4c4c8f181db1b.png)

Example of Apple Pay in the Payment Sheet

## Saved payment methods

The Payment Sheet has supports for saving, displaying, and managing saved payment methods. Consent collection is handled automatically, ensuring global compliance.

Saved payment methods supports cards, US bank accounts, and SEPA debit accounts.

The CustomerSessions API provides additional control over:

- When to show or hide the save consent box
- When to show or hide the saved payment methods
- Allowing buyers to remove saved payment methods
- Preventing buyers from removing the last saved payment method
![Payment Sheet saved payment methods](https://b.stripecdn.com/docs-statics-srv/assets/ps-saved-payment-methods.da5ebb05306fb56bcce0737b3e06a0df.png)

Examples of how customers can access saved payment methods in Payment Sheet

## Collecting address details

You can configure Payment Sheet to collect additional payment information, including name, email, phone and billing address, regardless of which payment method is being used.
![Payment Sheet address collection](https://b.stripecdn.com/docs-statics-srv/assets/ps-collecting-address-details.4ae80224105d1835b2d7eaf8d4747642.png)

Example with full billing details collected

## Additional features

The Payment Sheet also contains the following features:

- CVC recollection: Configure whether CVC re-collection is required when users pay with a saved payment method.
- [Card brand filtering](https://docs.stripe.com/payments/mobile/filter-card-brands.md): Configure which card brands you accept.
