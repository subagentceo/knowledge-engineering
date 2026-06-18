# Example applications

Try Stripe Terminal by using the example applications and simulated reader.

> For a more immersive guide including details on [server driven integration](https://support.stripe.com/questions/terminal-server-driven-integration) using only the Stripe API, check out the [sample integration](https://docs.stripe.com/terminal/quickstart.md).

A Stripe Terminal integration starts with your point-of-sale application running at a physical location. Your point-of-sale application communicates with a reader through the Terminal SDK to collect in-person payments from your customers. Your backend works with your point-of-sale application to authenticate the Terminal SDK and finalize payments.
![](https://b.stripecdn.com/docs-statics-srv/assets/example-app-simulator-integration-architecture.c687f5119cda8972233e61f684ae56a5.png)

Before starting your own integration, we recommend setting up one of the Terminal example applications. This will give you a better feel for how the components of a Terminal integration fit together and show you the interactions between the SDK, the reader, your point-of-sale application, and your backend code.

## Deploy the example backend

To get started with the example applications, set up the Sinatra-based [example backend](https://github.com/stripe/example-terminal-backend) by following the instructions in the [README](https://github.com/stripe/example-terminal-backend). You can either run the backend locally or deploy it to Render with a free account. The example backend works with the example application to authenticate the Terminal SDK and finalize payments.

## Run the example application

Build and run one of the example applications:

#### JavaScript

1. Clone the example from [GitHub](https://github.com/stripe/stripe-terminal-js-demo):

```bash
git clone https://github.com/stripe/stripe-terminal-js-demo.git
```

1. Run the following commands to run the example:

```bash
cd stripe-terminal-js-demo
npm install
npm run start
```

1. In the running example, enter the URL of the example backend that you deployed in [step 1](https://docs.stripe.com/terminal/example-applications.md#set-up-backend).

#### iOS

1. Clone the example from [GitHub](https://github.com/stripe/stripe-terminal-ios):

```bash
git clone https://github.com/stripe/stripe-terminal-ios.git
```

1. Open `Example/Example.xcworkspace` in Xcode.
2. In `AppDelegate.swift`, set the URL of the Render app you just deployed.
3. Build and run the app.

#### Android

1. Clone the example from [GitHub](https://github.com/stripe/stripe-terminal-android):

```bash
git clone https://github.com/stripe/stripe-terminal-android.git
```

1. Import the `Example` project into Android Studio.
2. In `gradle.properties`, set the URL of the Render app you just deployed.
3. Build and run the app.

#### React Native

1. Clone the example from [GitHub](https://github.com/stripe/stripe-terminal-react-native):

```bash
git clone https://github.com/stripe/stripe-terminal-react-native.git
```

1. Install the [Expo CLI](https://docs.expo.dev/get-started/installation/) and package dependencies

```bash
yarn global add expo-cli
```

1. Install the example app’s package dependencies

```bash
cd stripe-terminal-react-native/example-app
yarn
```

1. Copy `example-app/.env.example` to `example-app/.env` and set the URL of the Render app you just deployed.
2. Build and run the app.

```bash
### android
npx expo run:android
### ios
npx expo run:ios
```

## Connect to a simulated reader

#### JavaScript

After you have the example running, select **Use simulator** to connect to a [simulated reader](https://docs.stripe.com/terminal/references/testing.md#simulated-reader).
![](https://b.stripecdn.com/docs-statics-srv/assets/js-example-app-simulator.c226b6ba5461d0c5b3b8f06c0c1a3469.png)

The JavaScript example app connected to a simulated reader

#### iOS

After you have the example running, select **Simulated** to connect to a [simulated reader](https://docs.stripe.com/terminal/references/testing.md#simulated-reader).
![](https://b.stripecdn.com/docs-statics-srv/assets/ios-example-app-simulator.048c8083664b139b272754aed05ed442.png)

The iOS example app connected to a simulated reader

> To run the example app using the iOS Simulator, enable a simulated location. Select **Simulate Location** from the Xcode **Debug** menu. For more information on how Stripe Terminal uses the device location, see [Configure your iOS app](https://docs.stripe.com/terminal/payments/setup-integration.md?terminal-sdk-platform=ios#configure).

#### Android

After you have the example running, select **Simulated** to connect to a [simulated reader](https://docs.stripe.com/terminal/references/testing.md#simulated-reader).
![](https://b.stripecdn.com/docs-statics-srv/assets/android-example-app-simulator.72ace5d890bc698d7900e10d98d068a2.png)

The Android example app connected to a simulated reader

#### React Native

After you have the example running, select **Simulated** to connect to a [simulated reader](https://docs.stripe.com/terminal/references/testing.md#simulated-reader).
![](https://b.stripecdn.com/docs-statics-srv/assets/react-native-example-app-simulator.268ea316e60ec49ee877240d255c8b58.png)

The React Native example app connected to a simulated reader

The simulated reader handles events just like a physical reader, so you can continue to collecting your first payment.

The simulated reader functionality is built into the SDK, so you can use it to develop and test your own point-of-sale application without connecting to a physical device.

## Collect your first payment

Collect your first payment using the example application and a simulated reader. Each of the examples features an event log for you to reference as you integrate Terminal in your own application. As you collect your first payment, you’ll see the following sequence:

- **Create payment**: The example application collects a payment method using the SDK.
- **Collect payment method**: The simulated reader receives a card.
- **Process and capture**: The example application and backend finalize the payment.

> (Optional) Use [separate authorization and capture](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method.md) to add a reconciliation step before finalizing the transaction. You can also [automatically capture](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-capture_method) Terminal transactions.

#### JavaScript
![Javascript example app connected to simulated reader](https://b.stripecdn.com/docs-statics-srv/assets/js-example-app-payment.8069a69561566519d001038a46bfe6b5.png)

Collecting a payment, using the JavaScript example app and a simulated reader

#### iOS
![iOS example app connected to simulated reader](https://b.stripecdn.com/docs-statics-srv/assets/ios-example-app-payment.64ce79484049f491b4798d080e2fb38c.png)

Collecting a payment, using the iOS example app and a simulated reader

#### Android
![Android example app connected to simulated reader](https://b.stripecdn.com/docs-statics-srv/assets/android-example-app-payment.c79ff20f8c40fd36d348fe7f7d1b9ae5.png)

Collecting a payment, using the Android example app and a simulated reader

#### React Native
![React Native example app connected to simulated reader](https://b.stripecdn.com/docs-statics-srv/assets/react-native-example-app-payment.be4c67924b431cb58a8057986562e6c3.png)

Collecting a payment, using the React Native example app and a simulated reader

## Next steps

- [Design an integration](https://docs.stripe.com/terminal/designing-integration.md)
