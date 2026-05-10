# Charge for shipping

Create different shipping rates for your customers.

Shipping rates let you display various shipping options—like standard, express, and overnight—with more accurate delivery estimates. Charge your customer for shipping using different Stripe products. Before you create a shipping rate, learn how to [collect billing and shipping addresses](https://docs.stripe.com/payments/collect-addresses.md).

# Full hosted page

> This is a Full hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/payments/during-payment/charge-shipping?payment-ui=stripe-hosted.

## Create a shipping rate [Dashboard] [Server-side]

Shipping rates only support fixed amount values for the entire order. You can’t adjust the shipping rate based on the number of items in the order.

#### Dashboard

To add a [shipping rate](https://dashboard.stripe.com/test/shipping-rates) using the Dashboard:

1. Click **Create shipping rate**.
1. Enter an amount, a description, and an optional delivery estimate.
1. Click **Save**, and copy the shipping rate ID (`shr_123456`).
![](https://b.stripecdn.com/docs-statics-srv/assets/create-shipping-rate-dashboard.ddd79821d5edee523d7da9d22682be59.png)

Enter your shipping rate details

### Update a shipping rate

You can’t update an amount of a currency that’s already been set on a shipping rate. After you set a currency and amount on a shipping rate, it can only be updated to include new currencies. To update a shipping rate in the Dashboard, you must archive the shipping rate and then create a new one.

### Archive a shipping rate

To archive a shipping rate:

1. On the [Shipping rates](https://dashboard.stripe.com/test/shipping-rates) tab, select the applicable shipping rate.
1. Click the overflow menu ⋯, and select **Archive**.

To unarchive the shipping rate, click the overflow menu ⋯, and select **Unarchive shipping rate**.

#### API

> #### Interested in dynamic shipping rate updates?
> 
> Checkout supports letting you dynamically update shipping rates based on the address your customer provides or the value of the order. See [Dynamically customize shipping options](https://docs.stripe.com/payments/checkout/custom-shipping-options.md) about this preview feature.

[Create a shipping rate](https://docs.stripe.com/api/shipping_rates.md), which at a minimum, requires the `type` and `display_name` parameters. The following code sample uses both of these parameters along with `fixed_amount` and `delivery_estimate` to create a shipping rate:

```curl
curl https://api.stripe.com/v1/shipping_rates \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "display_name=Ground shipping" \
  -d type=fixed_amount \
  -d "fixed_amount[amount]=500" \
  -d "fixed_amount[currency]=usd" \
  -d "delivery_estimate[minimum][unit]=business_day" \
  -d "delivery_estimate[minimum][value]=5" \
  -d "delivery_estimate[maximum][unit]=business_day" \
  -d "delivery_estimate[maximum][value]=7"
```

### Update a shipping rate

To [update a shipping rate](https://docs.stripe.com/api/shipping_rates/update.md), call `Stripe::ShippingRate.update`, and update the parameters as needed.

## Create a Checkout Session [Server-side]

To create a Checkout Session that includes your shipping rate, pass in the generated shipping rate ID to the [shipping_options](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_options) parameter. If you want to create the shipping rate at the same time as a Checkout Session, use the `shipping_rate_data` parameter with `shipping_options`. Only Checkout Sessions in [payment mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) support shipping options.

The following code sample adds two shipping options to the Checkout Session:

- Free shipping, with an estimated delivery of 5-7 business days.
- Next day air, at a cost of 15.00 USD, with an estimated delivery of exactly 1 business day.

In this example, the first option in the `shipping_options` array is pre-selected for the customer on the checkout page. However, customers can choose either option.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "shipping_address_collection[allowed_countries][0]=US" \
  -d "shipping_address_collection[allowed_countries][1]=CA" \
  -d "shipping_options[0][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][amount]=0" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[0][shipping_rate_data][display_name]=Free shipping" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]=5" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]=7" \
  -d "shipping_options[1][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[1][shipping_rate_data][fixed_amount][amount]=1500" \
  -d "shipping_options[1][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[1][shipping_rate_data][display_name]=Next day air" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][minimum][value]=1" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][maximum][value]=1" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

If successful, the shipping selector appears in your checkout flow:
![The shipping selector in the checkout flow](https://b.stripecdn.com/docs-statics-srv/assets/example-checkout-session.5807984bdc0a25ddb53aab00768dd079.jpg)

The shipping selector in the checkout flow

## Optional: Handle completed transactions

After the payment succeeds, you can retrieve the shipping amount in the [amount_total](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-amount_total) attribute of the [shipping_cost](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-shipping_cost). You can also retrieve the selected shipping rate using the `shipping_rate` attribute in `shipping_cost`. To access the `shipping_cost` property, you must [create an event handler](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) to handle completed Checkout Sessions. You can test a handler by [installing the Stripe CLI](https://docs.stripe.com/stripe-cli.md) and using `stripe listen --forward-to localhost:4242/webhook` to [forward events to your local server](https://docs.stripe.com/webhooks.md#test-webhook). In the following code sample, the handler allows for the user to access the `shipping_property`:

#### Ruby

```ruby
# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

require 'sinatra'

# You can find your endpoint's secret in your webhook settings
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

  if event['type'] == 'checkout.session.completed'
    checkout_session = event['data']['object']

    fulfill_order(checkout_session)
  end

  status 200
end

def fulfill_order(checkout_session)selected_shipping_rate = client.v1.shipping_rates.retrieve(checkout_session.shipping_cost.shipping_rate)
  shipping_total = checkout_session.shipping_cost.amount_total

  # TODO: Remove error and implement...
  raise NotImplementedError.new(<<~MSG)
    Given the Checkout Session "#{checkout_session.id}" load your internal order from the database then implement your own fulfillment logic.
  MSG
end
```

## Optional: Define a delivery estimate

You can configure shipping rates using a number of delivery estimate combinations. The following table contains some examples of plain English delivery estimates, and their corresponding `delivery_estimate.minimum` and `delivery_estimate.maximum` values:

| Delivery Estimate          | Minimum                                                      | Maximum                                                      |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1 day                      | ```es6
  {
    unit: 'day',
    value: 1,
  }
  ```          | ```es6
  {
    unit: 'day',
    value: 1,
  }
  ```          |
| 1 business day             | ```es6
  {
    unit: 'business_day',
    value: 1,
  }
  ``` | ```es6
  {
    unit: 'business_day',
    value: 1,
  }
  ``` |
| At least 2 business days   | ```es6
  {
    unit: 'business_day',
    value: 2,
  }
  ``` | ```es6
  null
  ```                                          |
| 3 to 7 days                | ```es6
  {
    unit: 'day',
    value: 3,
  }
  ```          | ```es6
  {
    unit: 'day',
    value: 7,
  }
  ```          |
| 4 to 8 hours               | ```es6
  {
    unit: 'hour',
    value: 4,
  }
  ```         | ```es6
  {
    unit: 'hour',
    value: 8,
  }
  ```         |
| 4 hours to 2 business days | ```es6
  {
    unit: 'hour',
    value: 4,
  }
  
  ```      | ```es6
  {
    unit: 'business_day',
    value: 2,
  }
  ``` |

## Optional: Charge tax for shipping

You can use [Stripe Tax](https://docs.stripe.com/tax/checkout.md) to automatically calculate tax on shipping fees by setting a `tax_code` and `tax_behavior` on your shipping rate. Stripe Tax automatically determines whether shipping is taxable ([as taxability varies by state and country](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#shipping-tax-code)) and applies the correct tax rate if so.

When creating a shipping rate with `shipping_rate_data` or through [Create a Shipping Rate](https://docs.stripe.com/api/shipping_rates/create.md), you can add a `tax_behavior` and `tax_code` parameter to the shipping rate.

We recommend setting the `tax_code` to `Shipping` (`txcd_92010001`) to make sure that you always charge the correct tax. You can also set the shipping rate `tax_code` to `Nontaxable` (`txcd_00000000`) if you don’t want to charge tax.

For this example, we set the `tax_behavior` to `exclusive`, which is common in the US. Learn more about [tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior).

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d billing_address_collection=required \
  -d "shipping_address_collection[allowed_countries][0]=US" \
  -d "shipping_address_collection[allowed_countries][1]=CA" \
  -d "shipping_options[0][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][amount]=0" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[0][shipping_rate_data][display_name]=Free shipping" \
  -d "shipping_options[0][shipping_rate_data][tax_behavior]=exclusive" \
  -d "shipping_options[0][shipping_rate_data][tax_code]=txcd_92010001" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]=5" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]=7" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][price_data][tax_behavior]=exclusive" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

Your customer can see the calculated tax amount for the shipping rate factored into the total sales tax in your checkout flow:
![Calculated tax amount for the shipping rate on the checkout page](https://b.stripecdn.com/docs-statics-srv/assets/taxed-shipping.14e1bb580c37e035fcf2f0016680db5a.jpg)

Calculated tax amount for the shipping rate in the checkout flow


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/payments/during-payment/charge-shipping?payment-ui=embedded-page.

## Create a shipping rate [Dashboard] [Server-side]

Shipping rates only support fixed amount values for the entire order. You can’t adjust the shipping rate based on the number of items in the order.

#### Dashboard

To add a [shipping rate](https://dashboard.stripe.com/test/shipping-rates) using the Dashboard:

1. Click **Create shipping rate**.
1. Enter an amount, a description, and an optional delivery estimate.
1. Click **Save**, and copy the shipping rate ID (`shr_123456`).
![](https://b.stripecdn.com/docs-statics-srv/assets/create-shipping-rate-dashboard.ddd79821d5edee523d7da9d22682be59.png)

Enter your shipping rate details

### Update a shipping rate

You can’t update an amount of a currency that’s already been set on a shipping rate. After you set a currency and amount on a shipping rate, it can only be updated to include new currencies. To update a shipping rate in the Dashboard, you must archive the shipping rate and then create a new one.

### Archive a shipping rate

To archive a shipping rate:

1. On the [Shipping rates](https://dashboard.stripe.com/test/shipping-rates) tab, select the applicable shipping rate.
1. Click the overflow menu ⋯, and select **Archive**.

To unarchive the shipping rate, click the overflow menu ⋯, and select **Unarchive shipping rate**.

#### API

> #### Interested in dynamic shipping rate updates?
> 
> Checkout supports letting you dynamically update shipping rates based on the address your customer provides or the value of the order. See [Dynamically customize shipping options](https://docs.stripe.com/payments/checkout/custom-shipping-options.md) about this preview feature.

[Create a shipping rate](https://docs.stripe.com/api/shipping_rates.md), which at a minimum, requires the `type` and `display_name` parameters. The following code sample uses both of these parameters along with `fixed_amount` and `delivery_estimate` to create a shipping rate:

```curl
curl https://api.stripe.com/v1/shipping_rates \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "display_name=Ground shipping" \
  -d type=fixed_amount \
  -d "fixed_amount[amount]=500" \
  -d "fixed_amount[currency]=usd" \
  -d "delivery_estimate[minimum][unit]=business_day" \
  -d "delivery_estimate[minimum][value]=5" \
  -d "delivery_estimate[maximum][unit]=business_day" \
  -d "delivery_estimate[maximum][value]=7"
```

### Update a shipping rate

To [update a shipping rate](https://docs.stripe.com/api/shipping_rates/update.md), call `Stripe::ShippingRate.update`, and update the parameters as needed.

## Create a Checkout Session [Server-side]

To create a Checkout Session that includes your shipping rate, pass in the generated shipping rate ID to the [shipping_options](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_options) parameter. If you want to create the shipping rate at the same time as a Checkout Session, use the `shipping_rate_data` parameter with `shipping_options`. Only Checkout Sessions in [payment mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) support shipping options.

The following code sample adds two shipping options to the Checkout Session:

- Free shipping, with an estimated delivery of 5-7 business days.
- Next day air, at a cost of 15.00 USD, with an estimated delivery of exactly 1 business day.

In this example, the first option in the `shipping_options` array is pre-selected for the customer on the checkout page. However, customers can choose either option.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d billing_address_collection=required \
  -d "shipping_address_collection[allowed_countries][0]=US" \
  -d "shipping_address_collection[allowed_countries][1]=CA" \
  -d "shipping_options[0][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][amount]=0" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[0][shipping_rate_data][display_name]=Free shipping" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]=5" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]=7" \
  -d "shipping_options[1][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[1][shipping_rate_data][fixed_amount][amount]=1500" \
  -d "shipping_options[1][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[1][shipping_rate_data][display_name]=Next day air" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][minimum][value]=1" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[1][shipping_rate_data][delivery_estimate][maximum][value]=1" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  -d ui_mode=embedded_page \
  --data-urlencode "return_url=https://example.com/return"
```

If successful, the shipping selector appears in your checkout flow:
![The shipping selector in the checkout flow](https://b.stripecdn.com/docs-statics-srv/assets/example-checkout-session.5807984bdc0a25ddb53aab00768dd079.jpg)

The shipping selector in the checkout flow

## Optional: Handle completed transactions

After the payment succeeds, you can retrieve the shipping amount in the [amount_total](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-amount_total) attribute of the [shipping_cost](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-shipping_cost). You can also retrieve the selected shipping rate using the `shipping_rate` attribute in `shipping_cost`. To access the `shipping_cost` property, you must [create an event handler](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) to handle completed Checkout Sessions. You can test a handler by [installing the Stripe CLI](https://docs.stripe.com/stripe-cli.md) and using `stripe listen --forward-to localhost:4242/webhook` to [forward events to your local server](https://docs.stripe.com/webhooks.md#test-webhook). In the following code sample, the handler allows for the user to access the `shipping_property`:

#### Ruby

```ruby
# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new("<<YOUR_SECRET_KEY>>")

require 'sinatra'

# You can find your endpoint's secret in your webhook settings
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

  if event['type'] == 'checkout.session.completed'
    checkout_session = event['data']['object']

    fulfill_order(checkout_session)
  end

  status 200
end

def fulfill_order(checkout_session)selected_shipping_rate = client.v1.shipping_rates.retrieve(checkout_session.shipping_cost.shipping_rate)
  shipping_total = checkout_session.shipping_cost.amount_total

  # TODO: Remove error and implement...
  raise NotImplementedError.new(<<~MSG)
    Given the Checkout Session "#{checkout_session.id}" load your internal order from the database then implement your own fulfillment logic.
  MSG
end
```

## Optional: Define a delivery estimate

You can configure shipping rates using a number of delivery estimate combinations. The following table contains some examples of plain English delivery estimates, and their corresponding `delivery_estimate.minimum` and `delivery_estimate.maximum` values:

| Delivery Estimate          | Minimum                                                      | Maximum                                                      |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1 day                      | ```es6
  {
    unit: 'day',
    value: 1,
  }
  ```          | ```es6
  {
    unit: 'day',
    value: 1,
  }
  ```          |
| 1 business day             | ```es6
  {
    unit: 'business_day',
    value: 1,
  }
  ``` | ```es6
  {
    unit: 'business_day',
    value: 1,
  }
  ``` |
| At least 2 business days   | ```es6
  {
    unit: 'business_day',
    value: 2,
  }
  ``` | ```es6
  null
  ```                                          |
| 3 to 7 days                | ```es6
  {
    unit: 'day',
    value: 3,
  }
  ```          | ```es6
  {
    unit: 'day',
    value: 7,
  }
  ```          |
| 4 to 8 hours               | ```es6
  {
    unit: 'hour',
    value: 4,
  }
  ```         | ```es6
  {
    unit: 'hour',
    value: 8,
  }
  ```         |
| 4 hours to 2 business days | ```es6
  {
    unit: 'hour',
    value: 4,
  }
  
  ```      | ```es6
  {
    unit: 'business_day',
    value: 2,
  }
  ``` |

## Optional: Charge tax for shipping

You can use [Stripe Tax](https://docs.stripe.com/tax/checkout.md) to automatically calculate tax on shipping fees by setting a `tax_code` and `tax_behavior` on your shipping rate. Stripe Tax automatically determines whether shipping is taxable ([as taxability varies by state and country](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#shipping-tax-code)) and applies the correct tax rate if so.

When creating a shipping rate with `shipping_rate_data` or through [Create a Shipping Rate](https://docs.stripe.com/api/shipping_rates/create.md), you can add a `tax_behavior` and `tax_code` parameter to the shipping rate.

We recommend setting the `tax_code` to `Shipping` (`txcd_92010001`) to make sure that you always charge the correct tax. You can also set the shipping rate `tax_code` to `Nontaxable` (`txcd_00000000`) if you don’t want to charge tax.

For this example, we set the `tax_behavior` to `exclusive`, which is common in the US. Learn more about [tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior).

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d billing_address_collection=required \
  -d "shipping_address_collection[allowed_countries][0]=US" \
  -d "shipping_address_collection[allowed_countries][1]=CA" \
  -d "shipping_options[0][shipping_rate_data][type]=fixed_amount" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][amount]=0" \
  -d "shipping_options[0][shipping_rate_data][fixed_amount][currency]=usd" \
  -d "shipping_options[0][shipping_rate_data][display_name]=Free shipping" \
  -d "shipping_options[0][shipping_rate_data][tax_behavior]=exclusive" \
  -d "shipping_options[0][shipping_rate_data][tax_code]=txcd_92010001" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]=5" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]=business_day" \
  -d "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]=7" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][price_data][tax_behavior]=exclusive" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d mode=payment \
  -d ui_mode=embedded_page \
  --data-urlencode "return_url=https://example.com/return"
```

Your customer can see the calculated tax amount for the shipping rate factored into the total sales tax in your checkout flow:
![Calculated tax amount for the shipping rate on the checkout page](https://b.stripecdn.com/docs-statics-srv/assets/taxed-shipping.14e1bb580c37e035fcf2f0016680db5a.jpg)

Calculated tax amount for the shipping rate in the checkout flow

