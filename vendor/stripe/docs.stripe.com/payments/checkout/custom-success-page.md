# Customize redirect behavior

Display a confirmation page with your customer's order information.

# Full hosted page

> This is a Full hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=stripe-hosted.

If you have a Checkout integration that uses a hosted page, Stripe redirects your customer to a success page that you create and host on your site. You can use the details from a [Checkout Session](https://docs.stripe.com/api/checkout/sessions.md) to display an order confirmation page for your customer (for example, their name or payment amount) after the payment.

## Redirect customers to a success page 

To use the details from a Checkout Session:

1. Modify the [success_url](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-success_url) to pass the Checkout Session ID to the client side.
1. Look up the Checkout Session using the ID on your success page.
1. Use the Checkout Session to customize what’s displayed on your success page.

> #### Webhooks are required for fulfillment
> 
> You can’t rely on triggering fulfillment only from your checkout landing page, because your customers aren’t guaranteed to visit that page. For example, someone can pay successfully and then lose their connection to the internet before your landing page loads.
> 
> [Set up a webhook event handler](https://docs.stripe.com/checkout/fulfillment.md?payment-ui=stripe-hosted#create-payment-event-handler) so Stripe can send payment events directly to your server, bypassing the client entirely. Webhooks provide the most reliable way to confirm when you get paid. If webhook event delivery fails, Stripe [retries multiple times](https://docs.stripe.com/webhooks.md#automatic-retries).

## Modify the success URL (Server-side)

Add the `{CHECKOUT_SESSION_ID}` template variable to the `success_url` when you create the Checkout Session. This is a literal string and you must add it exactly as you see it here. Don’t substitute it with a Checkout Session ID—this happens automatically after your customer pays and is redirected to the success page.

#### Ruby

```ruby

# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
# Find your keys at https://dashboard.stripe.com/apikeys.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')

session = client.v1.checkout.sessions.create(success_url: "http://yoursite.com/order/success?session_id={CHECKOUT_SESSION_ID}",
  # other options...,
)
```

## Create the success page (Server-side)

Look up the Checkout Session using the ID and create a success page to display the order information. This example prints out the customer’s name:

#### Accounts v2

#### Ruby

```ruby
# This example sets up an endpoint using the Sinatra framework.


# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')

require 'sinatra'

get '/order/success' dosession = client.v1.checkout.sessions.retrieve(params[:session_id])
  customer_account = client.v2.core.accounts.retrieve(session.customer_account)
"<html><body><h1>Thanks for your order, #{customer_account.display_name}!</h1></body></html>"
end
```

#### Customers v1

#### Ruby

```ruby
# This example sets up an endpoint using the Sinatra framework.


# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
require 'stripe'
# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')

require 'sinatra'

get '/order/success' dosession = client.v1.checkout.sessions.retrieve(params[:session_id])
  customer = client.v1.customers.retrieve(session.customer)
"<html><body><h1>Thanks for your order, #{customer.name}!</h1></body></html>"
end
```

## Test the integration

To confirm that your redirect is working as expected:

1. Click the checkout button.
1. Fill in the customer name and other payment details.
1. Click **Pay**.

If it works, you’re redirected to the success page with your custom message. For example, if you used the message in the code samples, the success page displays this message: **Thanks for your order, Jenny Rosen!**


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-page.

If you have a Checkout integration that uses an embedded form, you can customize how and whether Stripe redirects your customers after they complete payment. You can have Stripe always redirect customers, only redirect for some payment methods, or completely disable redirects.

To set up redirects, specify the return page in the `return_url` [parameter](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-return_url).

Alternatively, you can:

- [Only redirect customers if the payment method requires it](https://docs.stripe.com/payments/checkout/custom-success-page.md#redirect-if-required) (for example, a bank authorization page for a debit-based method).
- Not use a return page and [disable redirect-based payment methods](https://docs.stripe.com/payments/checkout/custom-success-page.md#disable-redirects).

> #### Webhooks are required for fulfillment
> 
> You can’t rely on triggering fulfillment only from your checkout landing page, because your customers aren’t guaranteed to visit that page. For example, someone can pay successfully and then lose their connection to the internet before your landing page loads.
> 
> [Set up a webhook event handler](https://docs.stripe.com/checkout/fulfillment.md?payment-ui=embedded-page#create-payment-event-handler) so Stripe can send payment events directly to your server, bypassing the client entirely. Webhooks provide the most reliable way to confirm when you get paid. If webhook event delivery fails, Stripe [retries multiple times](https://docs.stripe.com/webhooks.md#automatic-retries).

## Redirect customers to a return page 

When you create the [Checkout Session](https://docs.stripe.com/api/checkout/sessions.md), you specify the URL of the return page in the `return_url` [parameter](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-return_url). Include the `{CHECKOUT_SESSION_ID}` template variable in the URL. When Checkout redirects a customer, it replaces the variable with the actual Checkout Session ID. When rendering your return page, retrieve the Checkout Session status using the Checkout Session ID in the URL.

#### Accounts v2

```javascript
app.get('/session_status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer_account = await client.v2.core.accounts.retrieve(session.customer_account);

  res.send({
    status: session.status,
    payment_status: session.payment_status,
    customer_account_email: customer_account.contact_email
  });
});
```

#### Customers v1

```javascript
app.get('/session_status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send({
    status: session.status,
    payment_status: session.payment_status,
    customer_email: customer.email
  });
});
```

Handle the result according to the session status as follows:

- `complete`: The payment succeeded. Use the information from the Checkout Session to render a success page.
- `open`: The payment failed or was canceled. Remount Checkout so that your customer can try again.

```javascript
const session = await fetch(`/session_status?session_id=${session_id}`)
if (session.status == 'open') {
  // Remount embedded Checkout
else if (session.status == 'complete') {
  // Show success page
  // Optionally use session.payment_status or session.customer_email
  // to customize the success page
}
```

## Redirect-based payment methods 

During payment, some payment methods redirect the customer to an intermediate page, such as a bank authorization page. When they complete that page, Stripe redirects them to your return page.

### Only redirect for redirect-based payment methods 

If you don’t want to redirect customers after payments that don’t require a redirect, set [redirect_on_completion](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-redirect_on_completion) to `if_required`. That redirects only customers who check out with redirect-based payment methods.

For card payments, Checkout renders a default success state instead of redirecting. To use your own success state, pass an [onComplete](https://docs.stripe.com/js/embedded_checkout/create#embedded_checkout_create-options-onComplete) callback that destroys the Checkout instance and renders your custom success state.

`onComplete` is called when the Checkout Session completes successfully, or when the [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) webhook event is sent.

#### HTML + JS

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

initialize();

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Example `onComplete` callback
  const handleComplete = async function() {
    // Destroy Checkout instance
    checkout.destroy()

    // Retrieve details from server (which loads Checkout Session)
    const details = await retrievePurchaseDetails();

    // Show custom purchase summary
    showPurchaseSummary(details);
  }

  const checkout = await stripe.createEmbeddedCheckoutPage({
    fetchClientSecret,
    onComplete: handleComplete
  });

  checkout.mount('#checkout');
}
```

#### React

```jsx
const stripePromise = loadStripe('pk_test_123');

const App = ({fetchClientSecret}) => {
  const options = {fetchClientSecret};

  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => setIsComplete(true);

  return isComplete ? (
    <PurchaseSummary />
  ) : (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        ...options,
        onComplete: handleComplete
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
```

### Disable redirect-based payment methods 

If you don’t want to create a return page, create your Checkout Session with [redirect_on_completion](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-redirect_on_completion) set to `never`.

This disables redirect-based payment methods:

- If you use [Dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md), you can still manage payment methods from the Dashboard, but payment methods that require redirects aren’t eligible.
- If you manually specify payment methods with [payment_method_types](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_method_types), you can’t include any redirect-based payment methods.

Setting `redirect_on_completion: never` removes the `return_url` requirement. For these sessions, Checkout renders a default success state instead of redirecting. You can use your own success state by passing an [onComplete](https://docs.stripe.com/js/embedded_checkout/create#embedded_checkout_create-options-onComplete) callback which destroys the Checkout instance and renders your custom success state.

`onComplete` is called when the Checkout Session completes successfully, or when the [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) webhook event is sent.

#### HTML + JS

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

initialize();

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Example `onComplete` callback
  const handleComplete = async function() {
    // Destroy Checkout instance
    checkout.destroy()

    // Retrieve details from server (which loads Checkout Session)
    const details = await retrievePurchaseDetails();

    // Show custom purchase summary
    showPurchaseSummary(details);
  }

  const checkout = await stripe.createEmbeddedCheckoutPage({
    fetchClientSecret,
    onComplete: handleComplete
  });

  checkout.mount('#checkout');
}
```

#### React

```jsx
const stripePromise = loadStripe('pk_test_123');

const App = ({fetchClientSecret}) => {
  const options = {fetchClientSecret};

  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => setIsComplete(true);

  return isComplete ? (
    <PurchaseSummary />
  ) : (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        ...options,
        onComplete: handleComplete
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
```

