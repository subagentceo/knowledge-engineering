# Charge for shipping

Create different shipping rates for your customers.

Shipping rates let you display various shipping options—like standard, express, and overnight—with more accurate delivery estimates. Charge your customer for shipping using different Stripe products, some of which require coding. Before you create a shipping rate, learn how to [collect billing and shipping addresses](https://docs.stripe.com/payment-links/customize.md).

> #### Third-party plugins
> 
> If you’re using a third-party application with Stripe (for example, [Thrivecart](https://support.thrivecart.com/help/setting-your-physical-fulfilment-shipping-options/) or [Shopify](https://help.shopify.com/en/manual/shipping/setting-up-and-managing-your-shipping/setting-up-shipping-rates)) and want to adjust the shipping rate, visit the docs for that service.

#### Dashboard

1. Create a [payment link](https://dashboard.stripe.com/test/payment-links/create) and select **Collect customers’ addresses** with the **Billing and shipping addresses** option.
2. Select the countries you ship to.
3. Click **Add shipping rates** to select an existing shipping rate or add a new one. You can only use shipping rates with one-time prices on payment links.
![](https://b.stripecdn.com/docs-statics-srv/assets/create-payment-link-with-shipping-rate.299819920f996e92c28c393f7a9d91cc.png)

Add a new shipping rate for a payment link in the Dashboard

#### API

[Create a shipping rate](https://docs.stripe.com/api/shipping_rates.md), which at a minimum, requires the `type` and `display_name` parameters. The following code sample uses both of these parameters along with `fixed_amount` and `deliver_estimate` to create a shipping rate:

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

Create a payment link and [collect a billing and shipping address](https://docs.stripe.com/payments/collect-addresses.md?payment-ui=payment-links). Add shipping rates to the payment link using the [shipping_options](https://docs.stripe.com/api/payment-link/object.md#payment_link_object-shipping_options) parameter. You can only use shipping rates with one time prices on payment links.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d billing_address_collection=required \
  -d "shipping_address_collection[allowed_countries][0]=US" \
  -d "shipping_options[0][shipping_rate]={{SHIPPINGRATE_ID}}"
```
