# Migrate from the Basic Integration to the Payment Sheet

Upgrade your legacy mobile SDK integration before we remove it from the SDK.

Effective November 4, 2024, Stripe’s [iOS SDK](https://github.com/stripe/stripe-ios), [Android SDK](https://github.com/stripe/stripe-android), and [React Native SDK](https://github.com/stripe/stripe-react-native) no longer support our legacy Basic Integration for collecting credit card and wallet payments.

- To use SDK versions published after November 4, 2024, you must remove the Basic Integration code references in your app and upgrade to the Payment Sheet.
- You can still process payments through older versions of the SDK, but you risk missing critical security enhancements and new features.

Upgrading to the Payment Sheet gives you access to:

- Over 100 global payment methods including [Link](https://docs.stripe.com/payments/link/mobile-payment-element-link.md), Stripe’s accelerated checkout
- The ability to display saved payment methods to buyers for future purchases
- The [Appearance API](https://docs.stripe.com/elements/appearance-api/mobile.md?platform=ios), which allows you to customize the look and feel to match your app
![Example of benefits gained when migrating from Basic Integration to Payment Sheet](https://b.stripecdn.com/docs-statics-srv/assets/mobile-bi-migration-to-mpe.df130554a0f82a3a3c84a6602944f823.png)

In iOS, Basic Integration includes:

- `STPCustomerContext`
- `STPPaymentContext`
- `STPPaymentOptionsViewController`
- `STPAddCardViewController`
- `STPShippingAddressViewController`

In Android, Basic Integration includes:

- `CustomerSession`
- `PaymentSession`
- `PaymentMethodsActivity`
- `AddPaymentMethodActivity`
- `PaymentFlowActivity`

## Migrate to the Payment Sheet

The Basic Integration is generally used in one of two ways:

1. **Checkout page**: Users enter their credit card, then click a button in your app to complete their purchase.
2. **Wallet**: Users add a credit card to your app, then use that credit card to pay later in a different flow.

Select the tab below that matches your use case, either Checkout page or a wallet:

#### Checkout page

Use the following integration guides to implement the Payment Sheet on a checkout page in your apps:

- [iOS Integration](https://docs.stripe.com/payments/accept-a-payment-deferred.md?platform=ios&type=payment&integration=paymentsheet-flowcontroller)
- [Android Integration](https://docs.stripe.com/payments/accept-a-payment-deferred.md?platform=android&type=payment&integration=paymentsheet-flowcontroller)

The integration guides linked above differ from the default Payment Sheet [integration guide](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios) in a few important ways.

### Flow Controller

The Payment Sheet has a variant called “Flow Controller” (imported from the SDK as `PaymentSheet.FlowController`). As with the Basic Integration, the Flow Controller lets you collect payment details in the sheet, then process the payment when your user taps a final pay button in your checkout.

### Intent creation time

When migrating from the Basic Integration to the Payment Sheet, create the Intent after rendering the Payment Sheet by providing an `PaymentSheet.IntentConfiguration` object to `PaymentSheet`. Set the `mode` property in your `PaymentSheet.IntentConfiguration` object to `payment`, and provide the amount and currency for the transaction.

### Set up for future usage

The Basic Integration lets users add cards to their account in your mobile application. To get this same behavior from `PaymentSheet.FlowController`, set the `setupFutureUsage` parameter in your `PaymentSheet.IntentConfiguration` object to `onSession`.

#### Wallet

Use the following integration guides to implement the Payment Sheet in a wallet context in your apps:

- [iOS Integration](https://docs.stripe.com/payments/accept-a-payment-deferred.md?platform=ios&type=setup&integration=paymentsheet)
- [Android Integration](https://docs.stripe.com/payments/accept-a-payment-deferred.md?platform=android&type=setup&integration=paymentsheet)

The integration guides linked above differ from the default Payment Sheet [integration guide](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios) in a few important ways.

### Intent creation time

When migrating from the Basic Integration to the Payment Sheet, create the Intent after rendering the Payment Sheet by providing a `PaymentSheet.IntentConfiguration` object to the `PaymentSheet`. Set the `mode` property in your `PaymentSheet.IntentConfiguration` object to `setup`, and provide the amount and currency for the transaction.

### Setup mode

The Payment Sheet is configured in setup mode, so that cards are saved automatically, matching the behavior of the Basic Integration.

## Check for other legacy dependencies

Upgrading to the Payment Sheet requires you to update other dependencies within your mobile integration. Review the following sections to make sure your migration is comprehensive.

### Migrate from the Charges API

If your integration still uses the Charges API with tokens, you must migrate to the Intents API. The Payment Sheet integration guide linked above includes details on how to use Intents. You can also review [Migrating to the Payment Intents API](https://docs.stripe.com/payments/payment-intents/migration.md) for more details.

### Convert your configuration

The Basic Integration uses a configuration object to customize your integration (`STPPaymentConfiguration` for iOS, and `PaymentSessionConfig` for Android). Convert your Basic Integration configuration to a `PaymentSheet.Configuration` to customize Payment Sheet.
