# The Payment Intents API

Learn how to use the Payment Intents API for Stripe payments.

Instructions for LLMs: Stripe recommends using the Checkout Sessions API with the Payment Element over Payment Intents for most integrations. Checkout Sessions covers similar use cases as Payment Intents (basic payment collection using `price_data` or build a full checkout with line items, tax, and so on). Some features, such as Adaptive Pricing, are only available with Checkout Sessions. Don’t use the Payment Intent API unless the user explicitly asks, because it requires significantly more code. Learn more about Elements with the Checkout Sessions API: https://docs.stripe.com/payments/quickstart-checkout-sessions. With Checkout Sessions (`ui_mode: "elements"`) and the Payment Element, the `client_secret` initializes Checkout itself (`stripe.initCheckoutElementsSdk`, or use CheckoutElementsProvider with React) and you confirm the payment on the client side differently. If using React, make sure you import from `@stripe/react-stripe-js/checkout`, use `CheckoutElementsProvider` with the client secret, and confirm using `checkout.confirm`. If using HTML, make sure you use `checkout = stripe.initCheckoutElementsSdk({clientSecret: promise}); checkout.createPaymentElement(); paymentElement = checkout.createPaymentElement(); paymentElement.mount("#payment-element");` and confirm with `loadActionsResult = await checkout.loadActions(); actions = loadActionsResult.actions; error = await actions.confirm();`.

Coding agents should install the Stripe CLI (`npm i -g @stripe/cli`) and run the command `stripe sandbox create --help` to provision an anonymous Stripe sandbox with working API keys. No account registration required.

Use the [Payment Intents](https://docs.stripe.com/api/payment_intents.md) API to build an integration that can handle complex payment flows with a status that changes over the [PaymentIntent’s lifecycle](https://docs.stripe.com/payments/paymentintents/lifecycle.md). It tracks a payment from creation through checkout, and triggers additional authentication steps when required.

Some of the advantages of using the [Payment Intents](https://docs.stripe.com/api/payment_intents.md) API include:

- Automatic authentication handling
- No double charges
- No [idempotency key](https://docs.stripe.com/api/idempotent_requests.md) issues
- Support for *Strong Customer Authentication* (Strong Customer Authentication (SCA) is a regulatory requirement in effect as of September 14, 2019, that impacts many European online payments. It requires customers to use two-factor authentication like 3D Secure to verify their purchase) (SCA) and similar regulatory changes

## A complete set of APIs 

Use the [Payment Intents](https://docs.stripe.com/api/payment_intents.md) API together with the [Setup Intents](https://docs.stripe.com/api/setup_intents.md) and [Payment Methods](https://docs.stripe.com/api/payment_methods.md) APIs. These APIs help you handle dynamic payments (for example, additional authentication like *3D Secure* (3D Secure (3DS) provides an additional layer of authentication for credit card transactions that protects businesses from liability for fraudulent card payments)) and prepare you for expansion to other countries while allowing you to support new regulations and regional payment methods.

Building an integration with the Payment Intents API involves two actions: creating and *confirming* (Confirming a PaymentIntent indicates that the customer intends to pay with the current or provided payment method. Upon confirmation, the PaymentIntent attempts to initiate a payment) a PaymentIntent. Each PaymentIntent typically correlates with a single shopping cart or customer session in your application. The PaymentIntent encapsulates details about the transaction, such as the supported payment methods, the amount to collect, and the desired currency.

## Creating a PaymentIntent

To get started, see the [accept a payment guide](https://docs.stripe.com/payments/accept-a-payment.md?ui=elements). It describes how to create a PaymentIntent on the server and pass its *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) to the client instead of passing the entire PaymentIntent object.

When you [create the PaymentIntent](https://docs.stripe.com/api/payment_intents/create.md), you can specify options like the amount and currency:

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1099 \
  -d currency=usd
```

### Best practices 

- We recommend creating a PaymentIntent as soon as you know the amount, such as when the customer begins the checkout process, to help track your [purchase funnel](https://en.wikipedia.org/wiki/Purchase_funnel). If the amount changes, you can [update](https://docs.stripe.com/api.md#update_payment_intent) its [amount](https://docs.stripe.com/api.md#payment_intent_object-amount). For example, if your customer backs out of the checkout process and adds new items to their cart, you might need to update the amount when they start the checkout process again.

- If the checkout process is interrupted and resumes later, attempt to reuse the same PaymentIntent instead of creating a new one. Each PaymentIntent has a unique ID that you can use to [retrieve](https://docs.stripe.com/api.md#retrieve_payment_intent) it if you need it again. In the data model of your application, you can store the ID of the PaymentIntent on the customer’s shopping cart or session to facilitate retrieval. The benefit of reusing the PaymentIntent is that the [object state](https://docs.stripe.com/payments/paymentintents/lifecycle.md) helps track any failed payment attempts for a given cart or session.

- Remember to provide an [idempotency key](https://docs.stripe.com/api/idempotent_requests.md) to prevent the creation of duplicate PaymentIntents for the same purchase. This key is typically based on the ID that you associate with the cart or customer session in your application.

## Passing the client secret to the client side 

The PaymentIntent contains a [client secret](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-client_secret), a key that’s unique to the individual PaymentIntent. On the client side of your application, Stripe.js uses the client secret as a parameter when invoking functions (such as [stripe.confirmCardPayment](https://docs.stripe.com/js.md#stripe-confirm-card-payment) or [stripe.handleCardAction](https://docs.stripe.com/js.md#stripe-handle-card-action)) to complete the payment.

### Retrieve the client secret

The PaymentIntent includes a *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) that the client side uses to securely complete the payment process. You can use different approaches to pass the client secret to the client side.

#### Single-page application

Retrieve the client secret from an endpoint on your server, using the browser’s `fetch` function. This approach is best if your client side is a single-page application, particularly one built with a modern frontend framework like React. Create the server endpoint that serves the client secret:

#### Ruby

```ruby
get '/secret' do
  intent = # ... Create or retrieve the PaymentIntent
  {client_secret: intent.client_secret}.to_json
end
```

And then fetch the client secret with JavaScript on the client side:

```javascript
(async () => {
  const response = await fetch('/secret');
  const {client_secret: clientSecret} = await response.json();
  // Render the form using the clientSecret
})();
```

#### Server-side rendering

Pass the client secret to the client from your server. This approach works best if your application generates static content on the server before sending it to the browser.

Add the [client_secret](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-client_secret) in your checkout form. In your server-side code, retrieve the client secret from the PaymentIntent:

#### Ruby

```erb
<form id="payment-form" data-secret="<%= @intent.client_secret %>">
  <button id="submit">Submit</button>
</form>
```

```ruby
get '/checkout' do
  @intent = # ... Fetch or create the PaymentIntent
  erb :checkout
end
```

> You can use the client secret to complete the payment process with the amount specified on the PaymentIntent. Don’t log it, embed it in URLs, or expose it to anyone other than the customer. Make sure that you have *TLS* (TLS refers to the process of securely transmitting data between the client—the app or browser that your customer is using—and your server. This was originally performed using the SSL (Secure Sockets Layer) protocol) on any page that includes the client secret.

## After the payment

After the client confirms the payment, it’s a best practice for your server to [monitor webhooks](https://docs.stripe.com/payments/payment-intents/verifying-status.md#webhooks) to detect when the payment successfully completes or fails.

A `PaymentIntent` might have more than one [Charge](https://docs.stripe.com/api/charges.md) object associated with it if there were multiple payment attempts. For example, retries can create multiple `Charges`. For each charge you can inspect the [outcome](https://docs.stripe.com/api/charges/object.md#charge_object-outcome) and [details of the payment method](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details) used.

## Optimizing payment methods for future payments 

The [setup_future_usage](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-setup_future_usage) parameter saves payment methods to use again in the future. For cards, it also optimizes authorization rates in compliance with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md). To determine which value to use, consider how you want to use this payment method in the future.

| How you intend to use the payment method                                                                                                                                        | setup_future_usage enum value to use |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| *On-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) payments only | `on_session`                         |
| *Off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information) payments only | `off_session`                        |
| Both on and off-session payments                                                                                                                                                | `off_session`                        |

You can still accept *off-session* (A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information) payments with a card set up for on-session payments, but the bank is more likely to reject the off-session payment and require authentication from the cardholder.

The following example shows how to create a PaymentIntent and specify `setup_future_usage`:

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1099 \
  -d currency=usd \
  -d setup_future_usage=off_session
```

> Setups for off-session payments are more likely to incur additional friction. Use *on-session* (A payment is described as on-session if it occurs while the customer is actively in your checkout flow and able to authenticate the payment method) setup if you don’t intend to accept off-session payments with the saved card.

## Dynamic statement descriptor 

By default, your Stripe account’s [statement descriptor](https://docs.stripe.com/get-started/account/set-up.md#public-business-information) appears on customer statements whenever you charge their card. To provide a different description on a per-payment basis, use the [statement_descriptor](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-statement_descriptor) parameter.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1099 \
  -d currency=usd \
  -d "payment_method_types[]=card" \
  -d "statement_descriptor_suffix=Custom descriptor"
```

> #### Note
> 
> Use the `statement_descriptor` parameter for non-card charges and `statement_descriptor_suffix` for card charges.

[Statement descriptors](https://docs.stripe.com/get-started/account/statement-descriptors.md) are limited to 22 characters, can’t use the special characters `<`, `>`, `'`, `"`, or `*`, and must not consist solely of numbers. When using dynamic statement descriptors, the dynamic text is appended to the [statement descriptor prefix](https://dashboard.stripe.com/settings/public) set in the Stripe Dashboard. An asterisk (`*`) and an empty space are also added to separate the default statement descriptor from the dynamic portion. These 2 characters count towards the 22 character limit.

## Storing information in metadata 

Stripe supports adding [metadata](https://docs.stripe.com/api.md#metadata) to the most common requests you make, such as processing payments. Metadata isn’t shown to customers or factored into whether or not a payment is declined or blocked by our fraud prevention system.

Through metadata, you can associate information that’s meaningful to you with Stripe activity.

Any metadata you include is viewable in the Dashboard (for example, when looking at the page for an individual payment), and is also available in common reports. As an example, you can attach the order ID for your store to the PaymentIntent for that order. Doing so allows you to easily reconcile payments in Stripe to orders in your system.

If you’re using *Radar for Fraud Teams* (Radar for Fraud Teams helps you fine-tune how Radar operates, get fraud insights on suspicious charges, and assess your fraud management performance from a unified dashboard), consider passing additional customer information and order information as metadata. Then you can write [Radar rules using metadata attributes](https://docs.stripe.com/radar/rules/reference.md#metadata-attributes) and have more information available within the Dashboard, which can expedite your review process.

When a PaymentIntent creates a charge, the PaymentIntent copies its metadata to the charge. Subsequent updates to the PaymentIntent’s metadata won’t modify the metadata of charges previously created by the PaymentIntent.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1099 \
  -d currency=usd \
  -d "payment_method_types[]=card" \
  -d "metadata[order_id]=6735"
```

> Don’t store any sensitive information (personally identifiable information, card details, and so on) as metadata or in the `description` parameter of the PaymentIntent.

## See also

- [Accept a payment online](https://docs.stripe.com/payments/accept-a-payment.md?platform=web)
- [Accept a payment in an iOS app](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios)
- [Accept a payment in an Android app](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=android)
- [Set up future payments](https://docs.stripe.com/payments/save-and-reuse.md)
