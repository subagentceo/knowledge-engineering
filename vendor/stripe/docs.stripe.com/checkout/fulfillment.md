# Fulfill orders

Learn how to fulfill payments received with the Checkout Sessions API.

# Full hosted page

> This is a Full hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/checkout/fulfillment?payment-ui=stripe-hosted.

When you receive a payment with the Checkout Sessions API (including Payment Links), you might need to take action to provide your customer with what they paid for. For example, you might need to grant them access to a service, or you might need to ship them physical goods. This process is known as fulfillment, and you have two ways to handle this process:

- **Manually**: You can manually fulfill orders using information that Stripe makes available to you. For example, you can monitor the [Dashboard](https://docs.stripe.com/dashboard/basics.md), check payment notification emails, or look at reports and then fulfill orders.
- **Automatically**: You can build an automated fulfillment system. (Recommended)

The first option works for low volume or experimental ventures, but for most situations we recommend automating fulfillment. The rest of this guide shows you how to build an automatic fulfillment system.

## Automatic fulfillment 

The automatic fulfillment system outlined below uses a combination of *webhooks* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) and a redirect to your website to trigger fulfillment. You must use webhooks to make sure fulfillment happens for every payment, and redirects let your customers access services or fulfillment details immediately after paying.

> Payment Links use Checkout, so all of the information below applies to both Payment Links and Checkout unless otherwise noted.

## Create a fulfillment function [Server-side]

Create a function on your server to fulfill successful payments. Webhooks trigger this function, and it’s called when customers are sent to your website after completing checkout. This guide refers to this function as `fulfill_checkout`, but you can name the function whatever you wish.

Perform fulfillment only once per payment. Because of how this integration and the internet work, your `fulfill_checkout` function might be called multiple times, possibly concurrently, for the same Checkout Session. Performing checkout only once ensures this won’t cause undesired behavior.

Your `fulfill_checkout` function must:

1. Correctly handle being called multiple times with the same Checkout Session ID.
1. Accept a *Checkout Session* (A Checkout Session represents your customer's session as they pay for one-time purchases or subscriptions through Checkout. After a successful payment, the Checkout Session contains a reference to the Customer, and either the successful PaymentIntent or an active Subscription) ID as an argument.
1. Retrieve the Checkout Session from the API with the [line_items](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-line_items) property [expanded](https://docs.stripe.com/api/expanding_objects.md).
1. Check the [payment_status](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_status) property to determine if it requires fulfillment.
1. Perform fulfillment of the line items.
1. Record fulfillment status for the provided Checkout Session.

Use the code below as a starting point for your `fulfill_checkout` function. The `TODO` comments indicate any functionality you must implement.

> The code snippets below might name the `fulfill_checkout` function `fulfillCheckout` or `FulfillCheckout` depending on the language selected, but they all represent the same function.

#### Ruby

```ruby
def fulfill_checkout(session_id)
  # Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  # Find your keys at https://dashboard.stripe.com/apikeys.
  client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')

  puts "Fullfilling Checkout Session #{session_id}"

  # TODO: Make this function safe to run multiple times,
  # even concurrently, with the same session ID

  # TODO: Make sure fulfillment hasn't already been
  # performed for this Checkout Session

  # Retrieve the Checkout Session from the API with line_items expanded
  checkout_session = client.v1.checkout.sessions.retrieve(
    session_id,
    {expand: ['line_items']},
  )

  # Check the Checkout Session's payment_status property
  # to determine if fulfillment should be performed
  if checkout_session.payment_status != 'unpaid'
    # TODO: Perform fulfillment of the line items

    # TODO: Record/save fulfillment status for this
    # Checkout Session
  end
end
```

> If a Checkout Session has many line items, use [auto-pagination](https://docs.stripe.com/api/pagination/auto.md) with the [API for Checkout line items](https://docs.stripe.com/api/checkout/sessions/line_items.md) to retrieve all of them.

Depending on the payment methods you accept and your business needs, you might want to have your `fulfill_checkout` function do the following:

- Provision access to services.
- Trigger shipment of goods.
- Save a copy of the payment details and line items in your own database.
- Send the customer a custom receipt email if you don’t have [Stripe’s receipts](https://docs.stripe.com/receipts.md) enabled.
- Reconcile line items and quantities purchased if you allow customers to adjust quantities in Checkout.
- Update inventory or stock records.

## Create a payment event handler [Server-side]

To trigger fulfillment, create a webhook event handler to listen for payment events and trigger your `fulfill_checkout` function.

When someone pays you, it creates a `checkout.session.completed` event. Set up an endpoint on your server to accept, process, and confirm receipt of these events.

### Immediate versus delayed payment methods

Some payment methods aren’t [instant](https://docs.stripe.com/payments/payment-methods.md#payment-notification), such as [ACH direct debit](https://docs.stripe.com/payments/ach-direct-debit.md) and other bank transfers. This means, funds won’t be immediately available when Checkout completes. Delayed payment methods generate a [checkout.session.async_payment_succeeded](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.async_payment_succeeded) event when payment succeeds later. The status of the object is in processing until the payment status either succeeds or fails.

> The webhook secret (`whsec_...`) shown in the code below comes from either the Stripe CLI or your webhook endpoint. You can use the Stripe CLI for local testing, and Stripe uses a webhook endpoint to send events to your handler when it’s running on a server. See the next section for more details.

#### Ruby

```ruby
require 'sinatra'

# Use the secret provided by Stripe CLI for local testing
# or your webhook endpoint's secret.
endpoint_secret = 'whsec_...'

post '/webhook' do
  event = nil

  # Verify webhook signature and extract the event
  # See https://stripe.com/docs/webhooks#verify-events for more information.
  begin
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    payload = request.body.read
    event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
  rescue JSON::ParserError => e
    # Invalid payload
    return status 400
  rescue Stripe::SignatureVerificationError => e
    # Invalid signature
    return status 400
  end
if event['type'] == 'checkout.session.completed' ||
  event['type'] == 'checkout.session.async_payment_succeeded'
    fulfill_checkout(event['data']['object']['id'])
  end

  status 200
end
```

You might also want to listen for and handle `checkout.session.async_payment_failed` events. For example, you can send an email to your customer when a delayed payment fails.

## Test your event handler locally

The quickest way to develop and test your webhook event handler is with the [Stripe CLI](https://docs.stripe.com/stripe-cli.md). If you don’t have the Stripe CLI, follow the [install guide](https://docs.stripe.com/stripe-cli/install.md) to get started.

When the Stripe CLI is installed, you can test your event handler locally. Run your server (for example, on `localhost:4242`), then run the [stripe listen](https://docs.stripe.com/cli/listen) command to have the Stripe CLI forward events to your local server:

```bash
stripe listen --forward-to localhost:4242/webhook

Ready! Your webhook signing secret is 'whsec_<REDACTED>' (^C to quit)
```

Add the webhook secret (`whsec_...`) to your event handling code, then test fulfillment by going through Checkout as a customer:

- Press the checkout button that takes you to Checkout, or visit your Payment Link
- Provide the following test data in Checkout:
  - Enter `4242 4242 4242 4242` as the card number
  - Enter any future date for card expiry
  - Enter any 3-digit number for CVV
  - Enter any billing postal code (`90210`)
- Press the **Pay** button

When the payment completes, verify the following:

- On your command line, where `stripe listen` is running, it shows a `checkout.session.completed` event forwarded to your local server.
- Your server logs show the expected output from your `fulfill_checkout` function.

## Create a webhook endpoint

After testing locally, get your webhook event handler up and running on your server. Next, [create a webhook endpoint](https://docs.stripe.com/webhooks.md#register-webhook) to send `checkout.session.completed` events to your server, then test the Checkout flow again.

## Configure a landing page URL [Recommended]

Configure Checkout to send your customer to a page on your website after they complete Checkout. Include the `{CHECKOUT_SESSION_ID}` placeholder in your page’s URL, which is replaced with the Checkout Session ID when your customer is redirected from Checkout.

### Hosted Checkout 

For Checkout Sessions with the default [ui_mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-ui_mode) of `hosted_page`, set the `success_url`.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/after-checkout?session_id={CHECKOUT_SESSION_ID}"
```

When you have a webhook endpoint set up to listen for `checkout.session.completed` events and you set a `success_url`, Checkout waits up to 10 seconds for your server to respond to the webhook event delivery before redirecting your customer. If you use this approach, make sure your server responds to `checkout.session.completed` events as quickly as possible. If you’re using the Stripe CLI for local testing, Checkout redirects to the `success_url` immediately.

This behavior isn’t supported for webhook endpoints registered in an [organization](https://docs.stripe.com/get-started/account/orgs.md) account. Stripe doesn’t wait for organization webhook endpoints that listen to `checkout.session.completed` to respond when redirecting Checkout customers.

### Payment Links 

For Payment Links you create with the API, set the [after_completion.redirect.url](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-after_completion-redirect-url).

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" \
  --data-urlencode "after_completion[redirect][url]=https://example.com/after-checkout?session_id={CHECKOUT_SESSION_ID}"
```

For Payment Links you [create in the Dashboard](https://dashboard.stripe.com/payment-links/create):

1. Go to the **After Payment** tab.
1. Select **Don’t show confirmation page**.
1. Provide the URL to your landing page that includes the `{CHECKOUT_SESSION_ID}` placeholder (for example, `https://example.com/after-checkout?session_id={CHECKOUT_SESSION_ID}`)

## Trigger fulfillment on your landing page [Recommended]

[Listening to webhooks](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) is required to make sure you always trigger fulfillment for every payment, but webhooks can sometimes be delayed. To optimize your payment flow and guarantee immediate fulfillment when your customer is present, trigger fulfillment from your landing page as well.

Use the Checkout Session ID from the URL you specified in the previous step to do the following:

1. When your server receives a request for your Checkout landing page, extract the Checkout Session ID from the URL.
1. Run your `fulfill_checkout` function with the ID provided.
1. Render the page after the fulfillment attempt is complete.

When you render your landing page you can display the following:

- Details from the fulfillment process.
- Links or information about services the customer now has access to.
- Shipping or logistical details for physical goods.

> #### Webhooks are required
> 
> You can’t rely on triggering fulfillment only from your Checkout landing page, because your customers aren’t guaranteed to visit that page. For example, someone can pay successfully in Checkout and then lose their connection to the internet before your landing page loads.
> 
> [Set up a webhook event handler](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) so Stripe can send payment events directly to your server, bypassing the client entirely. Webhooks provide the most reliable way to confirm when you get paid. If webhook event delivery fails, Stripe [retries multiple times](https://docs.stripe.com/webhooks.md#automatic-retries).


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/checkout/fulfillment?payment-ui=embedded-page.

When you receive a payment with the Checkout Sessions API (including Payment Links), you might need to take action to provide your customer with what they paid for. For example, you might need to grant them access to a service, or you might need to ship them physical goods. This process is known as fulfillment, and you have two ways to handle this process:

- **Manually**: You can manually fulfill orders using information that Stripe makes available to you. For example, you can monitor the [Dashboard](https://docs.stripe.com/dashboard/basics.md), check payment notification emails, or look at reports and then fulfill orders.
- **Automatically**: You can build an automated fulfillment system. (Recommended)

The first option works for low volume or experimental ventures, but for most situations we recommend automating fulfillment. The rest of this guide shows you how to build an automatic fulfillment system.

## Automatic fulfillment 

The automatic fulfillment system outlined below uses a combination of *webhooks* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) and a redirect to your website to trigger fulfillment. You must use webhooks to make sure fulfillment happens for every payment, and redirects let your customers access services or fulfillment details immediately after paying.

## Create a fulfillment function [Server-side]

Create a function on your server to fulfill successful payments. Webhooks trigger this function, and it’s called when customers are sent to your website after completing checkout. This guide refers to this function as `fulfill_checkout`, but you can name the function whatever you wish.

Perform fulfillment only once per payment. Because of how this integration and the internet work, your `fulfill_checkout` function might be called multiple times, possibly concurrently, for the same Checkout Session. Performing checkout only once ensures this won’t cause undesired behavior.

Your `fulfill_checkout` function must:

1. Correctly handle being called multiple times with the same Checkout Session ID.
1. Accept a *Checkout Session* (A Checkout Session represents your customer's session as they pay for one-time purchases or subscriptions through Checkout. After a successful payment, the Checkout Session contains a reference to the Customer, and either the successful PaymentIntent or an active Subscription) ID as an argument.
1. Retrieve the Checkout Session from the API with the [line_items](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-line_items) property [expanded](https://docs.stripe.com/api/expanding_objects.md).
1. Check the [payment_status](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_status) property to determine if it requires fulfillment.
1. Perform fulfillment of the line items.
1. Record fulfillment status for the provided Checkout Session.

Use the code below as a starting point for your `fulfill_checkout` function. The `TODO` comments indicate any functionality you must implement.

> The code snippets below might name the `fulfill_checkout` function `fulfillCheckout` or `FulfillCheckout` depending on the language selected, but they all represent the same function.

#### Ruby

```ruby
def fulfill_checkout(session_id)
  # Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  # Find your keys at https://dashboard.stripe.com/apikeys.
  client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')

  puts "Fullfilling Checkout Session #{session_id}"

  # TODO: Make this function safe to run multiple times,
  # even concurrently, with the same session ID

  # TODO: Make sure fulfillment hasn't already been
  # performed for this Checkout Session

  # Retrieve the Checkout Session from the API with line_items expanded
  checkout_session = client.v1.checkout.sessions.retrieve(
    session_id,
    {expand: ['line_items']},
  )

  # Check the Checkout Session's payment_status property
  # to determine if fulfillment should be performed
  if checkout_session.payment_status != 'unpaid'
    # TODO: Perform fulfillment of the line items

    # TODO: Record/save fulfillment status for this
    # Checkout Session
  end
end
```

> If a Checkout Session has many line items, use [auto-pagination](https://docs.stripe.com/api/pagination/auto.md) with the [API for Checkout line items](https://docs.stripe.com/api/checkout/sessions/line_items.md) to retrieve all of them.

Depending on the payment methods you accept and your business needs, you might want to have your `fulfill_checkout` function do the following:

- Provision access to services.
- Trigger shipment of goods.
- Save a copy of the payment details and line items in your own database.
- Send the customer a custom receipt email if you don’t have [Stripe’s receipts](https://docs.stripe.com/receipts.md) enabled.
- Reconcile line items and quantities purchased if you allow customers to adjust quantities in Checkout.
- Update inventory or stock records.

## Create a payment event handler [Server-side]

To trigger fulfillment, create a webhook event handler to listen for payment events and trigger your `fulfill_checkout` function.

When someone pays you, it creates a `checkout.session.completed` event. Set up an endpoint on your server to accept, process, and confirm receipt of these events.

### Immediate versus delayed payment methods

Some payment methods aren’t [instant](https://docs.stripe.com/payments/payment-methods.md#payment-notification), such as [ACH direct debit](https://docs.stripe.com/payments/ach-direct-debit.md) and other bank transfers. This means, funds won’t be immediately available when Checkout completes. Delayed payment methods generate a [checkout.session.async_payment_succeeded](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.async_payment_succeeded) event when payment succeeds later. The status of the object is in processing until the payment status either succeeds or fails.

> The webhook secret (`whsec_...`) shown in the code below comes from either the Stripe CLI or your webhook endpoint. You can use the Stripe CLI for local testing, and Stripe uses a webhook endpoint to send events to your handler when it’s running on a server. See the next section for more details.

#### Ruby

```ruby
require 'sinatra'

# Use the secret provided by Stripe CLI for local testing
# or your webhook endpoint's secret.
endpoint_secret = 'whsec_...'

post '/webhook' do
  event = nil

  # Verify webhook signature and extract the event
  # See https://stripe.com/docs/webhooks#verify-events for more information.
  begin
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    payload = request.body.read
    event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
  rescue JSON::ParserError => e
    # Invalid payload
    return status 400
  rescue Stripe::SignatureVerificationError => e
    # Invalid signature
    return status 400
  end
if event['type'] == 'checkout.session.completed' ||
  event['type'] == 'checkout.session.async_payment_succeeded'
    fulfill_checkout(event['data']['object']['id'])
  end

  status 200
end
```

You might also want to listen for and handle `checkout.session.async_payment_failed` events. For example, you can send an email to your customer when a delayed payment fails.

## Test your event handler locally

The quickest way to develop and test your webhook event handler is with the [Stripe CLI](https://docs.stripe.com/stripe-cli.md). If you don’t have the Stripe CLI, follow the [install guide](https://docs.stripe.com/stripe-cli/install.md) to get started.

When the Stripe CLI is installed, you can test your event handler locally. Run your server (for example, on `localhost:4242`), then run the [stripe listen](https://docs.stripe.com/cli/listen) command to have the Stripe CLI forward events to your local server:

```bash
stripe listen --forward-to localhost:4242/webhook

Ready! Your webhook signing secret is 'whsec_<REDACTED>' (^C to quit)
```

Add the webhook secret (`whsec_...`) to your event handling code, then test fulfillment by going through Checkout as a customer:

- Press the checkout button that takes you to Checkout, or visit your Payment Link
- Provide the following test data in Checkout:
  - Enter `4242 4242 4242 4242` as the card number
  - Enter any future date for card expiry
  - Enter any 3-digit number for CVV
  - Enter any billing postal code (`90210`)
- Press the **Pay** button

When the payment completes, verify the following:

- On your command line, where `stripe listen` is running, it shows a `checkout.session.completed` event forwarded to your local server.
- Your server logs show the expected output from your `fulfill_checkout` function.

## Create a webhook endpoint

After testing locally, get your webhook event handler up and running on your server. Next, [create a webhook endpoint](https://docs.stripe.com/webhooks.md#register-webhook) to send `checkout.session.completed` events to your server, then test the Checkout flow again.

## Configure a landing page URL [Recommended]

Configure Checkout to send your customer to a page on your website after they complete Checkout. Include the `{CHECKOUT_SESSION_ID}` placeholder in your page’s URL, which is replaced with the Checkout Session ID when your customer completes the checkout process.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  -d ui_mode=embedded_page \
  --data-urlencode "return_url=https://example.com/after-checkout?session_id={CHECKOUT_SESSION_ID}"
```

## Trigger fulfillment on your landing page [Recommended]

[Listening to webhooks](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) is required to make sure you always trigger fulfillment for every payment, but webhooks can sometimes be delayed. To optimize your payment flow and guarantee immediate fulfillment when your customer is present, trigger fulfillment from your landing page as well.

Use the Checkout Session ID from the URL you specified in the previous step to do the following:

1. When your server receives a request for your Checkout landing page, extract the Checkout Session ID from the URL.
1. Run your `fulfill_checkout` function with the ID provided.
1. Render the page after the fulfillment attempt is complete.

When you render your landing page you can display the following:

- Details from the fulfillment process.
- Links or information about services the customer now has access to.
- Shipping or logistical details for physical goods.

> #### Webhooks are required
> 
> You can’t rely on triggering fulfillment only from your Checkout landing page, because your customers aren’t guaranteed to visit that page. For example, someone can pay successfully in Checkout and then lose their connection to the internet before your landing page loads.
> 
> [Set up a webhook event handler](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) so Stripe can send payment events directly to your server, bypassing the client entirely. Webhooks provide the most reliable way to confirm when you get paid. If webhook event delivery fails, Stripe [retries multiple times](https://docs.stripe.com/webhooks.md#automatic-retries).

