# Migrate to Confirmation Tokens

Finalize payments on the server by using a ConfirmationToken instead of a PaymentMethod.

Use this guide to learn how to finalize payments on the server by using a [ConfirmationToken](https://docs.stripe.com/api/confirmation_tokens/object.md) instead of a [PaymentMethod](https://docs.stripe.com/api/payment_methods.md) to send data collected from your client to your server.

A `ConfirmationToken` holds a superset of the data found on a `PaymentMethod`, such as shipping information, and enables new features as we build them.

## Create the Confirmation Token [client-side]

Instead of calling [stripe.createPaymentMethod](https://docs.stripe.com/js/payment_methods/create_payment_method_elements), call [stripe.createConfirmationToken](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token) to create a `ConfirmationToken` object. Pass this ConfirmationToken to the server to confirm the PaymentIntent.

The `stripe.createConfirmationToken` method accepts the same parameters as `stripe.createPaymentMethod` (through [params.payment_method_data](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token#create_confirmation_token-options-params-payment_method_data)), plus additional [shipping](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token#create_confirmation_token-options-params-shipping) and [return_url](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token#create_confirmation_token-options-params-return_url) parameters.

### Before

```javascript


if (error) {
  // This point is only reached if there's an immediate error when creating the PaymentMethod.
  // Show the error to your customer (for example, payment details incomplete)
  handleError(error);
  return;
}

// Create and confirm the PaymentIntent
const res = await fetch("/create-confirm-intent", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
  }),
});
```

### After

```javascript
// Create the ConfirmationToken using the details collected by the Payment Element and additional shipping information. Provide shipping and return_url if you don't want to provide it when confirming the intent on the server
const {error, confirmationToken} = await stripe.createConfirmationToken({
  elements,
  params: {
    payment_method_data: {
       billing_details: {
         name: 'Jenny Rosen',
       }
    },
    // Remove shipping if you're collecting it using Address Element or don't require it
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: '94111',
      },
    },
    return_url: 'https://example.com/order/123/complete',
  }
});
if (error) {
  // This point is only reached if there's an immediate error when creating the ConfirmationToken.
  // Show the error to your customer (for example, payment details incomplete)
  handleError(error);
  return;
}

// Create and confirm the PaymentIntent
const res = await fetch("/create-confirm-intent", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({confirmationTokenId: confirmationToken.id,
  }),
});

```

## Create and submit the payment to Stripe [server-side]

You pass the ConfirmationToken to the server to confirm the [PaymentIntent](https://docs.stripe.com/api/payment_intents.md), rather than passing a [PaymentMethod](https://docs.stripe.com/api/payment_methods.md) as you did before. The properties stored on the `ConfirmationToken` are applied to the Intent when its ID is provided to the [confirmation_token](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-confirmation_token) parameter at confirmation time.

> If you already provide [shipping](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token#create_confirmation_token-options-params-shipping) and [return_url](https://docs.stripe.com/js/confirmation_tokens/create_confirmation_token#create_confirmation_token-options-params-return_url) on the ConfirmationToken, you don’t need to provide those fields again when confirming the PaymentIntent.

### Before

```javascript
app.post('/create-confirm-intent', async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
      use_stripe_sdk: true,
    });
    res.json({
      client_secret: intent.client_secret,
      status: intent.status
    });
  } catch (err) {
    res.json({
      error: err
    })
  }
});

```

### After

```javascript
app.post('/create-confirm-intent', async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
      use_stripe_sdk: true,// the ConfirmationToken ID sent by your client that already has the shipping, mandate_data, and return_url data
      confirmation_token: req.body.confirmationTokenId,
    });
    res.json({
      client_secret: intent.client_secret,
      status: intent.status
    });
  } catch (err) {
    res.json({
      error: err
    })
  }
});
```

Any parameters provided directly to the PaymentIntent or SetupIntent at confirmation time, such as `shipping` override corresponding properties on the ConfirmationToken.

## Optional: Setting conditional parameters setup_future_usage or capture_method based on payment method

With a [ConfirmationToken](https://docs.stripe.com/api/confirmation_tokens/object.md), we’ve added extra validations to make sure that your client settings are consistent with your server settings. This could conflict with your integration if you’re conditionally setting `setup_future_usage` or `capture_method` on the `PaymentIntent` or `SetupIntent` based on the payment method chosen by the end buyer. If you run into this issue, the correct way to integrate is the following:

1. Do *not* set `setup_future_usage` or `capture_method` when instantiating Elements.
2. Do *not* set `setup_future_usage` or `capture_method` for the higher level parameter on the Intent (for example, `paymentIntent.create({ setup_future_usage = 'off_session'})`).
3. Set `setup_future_usage` or `capture_method` parameters for each of the payment methods within the `payment_method_options` parameter of the Intent. For example:

```javascript
stripe.paymentIntents.create({
  amount: 100,
  currency: 'USD',
  payment_method_options: {
    card: {
      setup_future_usage:  'off_session',
      capture_method: 'manual'
    },
    ideal: {
      setup_future_usage:  'off_session'
    }
  }
});
```

## See also

- [Design an integration](https://docs.stripe.com/payments/payment-element/design-an-integration.md)
