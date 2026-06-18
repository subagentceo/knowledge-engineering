# Making API calls for connected accounts

Learn how to add the right information to your API calls so you can make calls for your connected accounts.

You can make API calls for your connected accounts:

- Server-side with the [Stripe-Account header](https://docs.stripe.com/connect/authentication.md#stripe-account-header) and the connected account ID, per request
- Client-side by passing the connected account ID as an argument to the client library

To help with performance and reliability, Stripe has established [rate limits and allocations](https://docs.stripe.com/rate-limits.md) for API endpoints.

## Add the Stripe-Account header server-side 

To make server-side API calls for connected accounts, use the `Stripe-Account` header with the account identifier, which begins with the prefix `acct_`. Here are four examples using your platform’s [API secret key](https://docs.stripe.com/keys.md) and the connected account’s [Account](https://docs.stripe.com/api/accounts.md) identifier:

#### Create PaymentIntent

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d amount=1000 \
  -d currency=usd
```

#### Retrieve Balance

```curl
curl https://api.stripe.com/v1/balance \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}"
```

#### List Products

```curl
curl -G https://api.stripe.com/v1/products \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d limit=5
```

#### Delete Customer

```curl
curl -X DELETE https://api.stripe.com/v1/customers/{{CUSTOMER_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}"
```

The `Stripe-Account` header approach is implied in any API request that includes the Stripe account ID in the URL. Here’s an example that shows how to [Retrieve an account](https://docs.stripe.com/api/accounts/retrieve.md) with your user’s [Account](https://docs.stripe.com/api/accounts.md) identifier in the URL.

```curl
curl https://api.stripe.com/v1/accounts/{{CONNECTEDACCOUNT_ID}} \
  -u "<<YOUR_SECRET_KEY>>:"
```

All of Stripe’s server-side libraries support this approach on a per-request basis:

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  --data-urlencode "email=person@example.com"
```

## Add the connected account ID to a client-side application

Client-side libraries set the connected account ID as an argument to the client application:

#### HTML + JS

The JavaScript code for passing the connected account ID client-side is the same for plain JS and for ESNext.

```javascript
var stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>', {
  stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
});
```

#### React

```javascript
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('<<YOUR_PUBLISHABLE_KEY>>', {
  stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
});
```

#### iOS

#### Swift

```swift
import UIKit
import StripePayments

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        StripeAPI.defaultPublishableKey = "<<YOUR_PUBLISHABLE_KEY>>"
        STPAPIClient.shared.stripeAccount = "{{CONNECTED_ACCOUNT_ID}}"
        return true
    }
}
```

#### Android

#### Kotlin

```kotlin
import com.stripe.android.PaymentConfiguration

class MyActivity: Activity() {
    private lateinit var stripe: Stripe

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        stripe = Stripe(
            this,
            PaymentConfiguration.getInstance(this).publishableKey,
            "{{CONNECTED_ACCOUNT_ID}}"
        )
    }
}
```

#### React Native

```javascript
import {StripeProvider} from '@stripe/stripe-react-native';

function App() {
  return (
    <StripeProvider
      publishableKey="<<YOUR_PUBLISHABLE_KEY>>"
      stripeAccountId="{{CONNECTED_ACCOUNT_ID}}"
    >
      {/* Your app code here */}
    </StripeProvider>
  );
}
```

## Use Connect embedded components

Instead of directly integrating with Stripe’s APIs, you can use [Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) to provide Stripe functionality to your connected accounts in your platform’s UI. These components require less code to implement and handle all API calls internally.

For example, to show payments data to your connected accounts, embed the [Payments component](https://docs.stripe.com/connect/supported-embedded-components/payments.md) in your platform’s UI. This eliminates the need to make separate calls to the [Charges](https://docs.stripe.com/api/charges.md), [Payment Intents](https://docs.stripe.com/api/payment_intents.md), [Refunds](https://docs.stripe.com/api/refunds.md), and [Disputes](https://docs.stripe.com/api/disputes.md) API.

Note: The following is a preview/demo component that behaves differently than live mode usage with real connected accounts. The actual component has more functionality than what might appear in this demo component. For example, for connected accounts without Stripe dashboard access (custom accounts), no user authentication is required in production.

For a complete list of the available embedded components, see [Supported components](https://docs.stripe.com/connect/supported-embedded-components.md).

## See also

- [Creating charges](https://docs.stripe.com/connect/charges.md)
- [Using subscriptions](https://docs.stripe.com/connect/subscriptions.md)
- [Getting started with Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md)
