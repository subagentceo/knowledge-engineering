# Link in the Mobile Payment Element

Add Link to your native iOS, Android, and React Native apps.

Let your customer check out faster by using [Link](https://docs.stripe.com/payments/link.md) in the [Mobile Payment Element](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios). You can autofill information for any customer already using Link, regardless of whether they initially saved their information in Link with another business. The default Mobile Payment Element integration includes a Link prompt in the card form.
![Link in iOS](https://b.stripecdn.com/docs-statics-srv/assets/link-in-ios.de526c6199ff89fbaa7b1beb5e8bc3da.png)

Add Link to your iOS integration

## Enable Link  

To offer Link in your mobile app:

1. [Integrate the Mobile Payment Element](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios) using the latest version of the Stripe Mobile SDK.
2. Enable Link in your [Payment Method settings](https://dashboard.stripe.com/settings/payment_methods).
3. Enable [Dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md) by using the [latest version of the API](https://docs.stripe.com/upgrades.md) or by adding the [automatic_payment_methods](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-automatic_payment_methods) parameter when creating your PaymentIntent.
4. (Optional) [Pass in your customer’s email address and phone number](https://docs.stripe.com/payments/link/mobile-payment-element-link.md#pass-email).

For information about how your payment integration affects Link, see [Link in different payment integrations](https://docs.stripe.com/payments/link/link-payment-integrations.md).

## Pass in a customer’s email address and phone number

Link authenticates a customer using their email address and phone number. We recommend prefilling as much information as possible to streamline the checkout process.

#### iOS

To prefill the customer’s name, email address, and phone number, supply `defaultBillingDetails` with your customer information after initializing `PaymentSheet.Configuration`.

```swift
var configuration = PaymentSheet.Configuration()
configuration.defaultBillingDetails.name = "Jenny Rosen"
configuration.defaultBillingDetails.email = "jenny.rosen@example.com"
configuration.defaultBillingDetails.phone = "888-888-8888"
```

#### Android

To prefill the customer’s name, email address, and phone number, supply `defaultBillingDetails` with your customer information when initializing `PaymentSheet.Configuration`.

#### Kotlin

```kotlin
let configuration = PaymentSheet.Configuration(
    merchantDisplayName = "Example, Inc.",
    defaultBillingDetails = PaymentSheet.BillingDetails(
        name = "Jenny Rosen",
        email = "jenny.rosen@example.com",
        phone = "888-888-8888"
    )
)
```

#### React Native

To prefill the customer’s name, email address, and phone number, supply `defaultBillingDetails` with your customer information to `initPaymentSheet`.

```javascript
await initPaymentSheet({
  ...
  defaultBillingDetails: {
    name: 'Jenny Rosen',
    email: 'jenny.rosen@example.com',
    phone: '888-888-8888',
  },
});
```

## Test your integration 

You can create sandbox accounts for Link using any valid email address. When prompted for a one-time passcode, enter `000000`.

## See also

- [Stripe Mobile SDKs](https://docs.stripe.com/sdks.md#stripe-mobile-sdks)
