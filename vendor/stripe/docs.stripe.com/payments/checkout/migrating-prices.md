# Checkout prices migration guide

Learn how to update your integration to use prices with Stripe Checkout.

The [Prices API](https://docs.stripe.com/api/prices.md) adds new features and flexibility to how you charge customers. This new integration offers:

- More unified modeling for Checkout items—instead of plans, *SKUs* (SKUs (Stock Keeping Units) represent a specific Product variation, taking into account any combination of attributes and cost (for instance, size, color, currency, cost)), and inline line items, every item is now a *price*.
- The ability to render product images for recurring items.
- Create a reusable product and price catalog instead of one-time line items.
- Create inline pricing for *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis).
- Apply dynamic tax rates to [subscriptions](https://docs.stripe.com/billing/taxes/collect-taxes.md?tax-calculation=tax-rates#adding-tax-rates-to-checkout) and [one-time payments](https://docs.stripe.com/payments/checkout/taxes.md).

Don’t want to migrate? You can continue to use your current integration, but new features aren’t supported. You can use any new plans or recurring prices you create in the `plan` parameter of your existing API calls.

## Products and prices overview 

*Prices* (Prices define how much and how often to charge for products. This includes how much the product costs, what currency to use, and the interval if the price is for subscriptions) are a new, core entity within Stripe that works with subscriptions, *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), and Checkout. Each price is tied to a single *Product* (Products represent what your business sells—whether that's a good or a service), and each product can have multiple prices. Different physical goods or levels of service should be represented by products. Pricing of that product should be represented by prices.

Prices define the base price, currency, and—for recurring products—the billing cycle. This allows you to change and add prices without needing to change the details of what you offer. For example, you might have a single “gold” product that has prices for 10 USD/month, 100 USD/year, 9 EUR/month, and 90 EUR/year. Or you might have a blue t-shirt with 20 USD and 15 EUR prices.

## One-time payments 

Integrations for one-time payments have the following changes:

- Instead of ad-hoc line items (that is, setting the name, amount, and currency), creating a Checkout Session requires creating a *product* (Products represent what your business sells—whether that's a good or a service) and, usually, a *price* (Prices define how much and how often to charge for products. This includes how much the product costs, what currency to use, and the interval if the price is for subscriptions).
- [mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) is now required.

The client-side code remains the same.

### Mapping table 

Instead of defining each field on `line_items`, Checkout uses the underlying product and price objects to determine name, description, amount, currency, and images. You can [create products and prices](https://docs.stripe.com/payments/accept-a-payment.md) with the API or Dashboard.

| Without prices           | With prices                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `line_items.name`        | `product.name`                                                                                       |
| `line_items.description` | `product.description`                                                                                |
| `line_items.amount`      | - `price.unit_amount`
  - `price_data.unit_amount` (if defined when the Checkout Session is created) |
| `line_items.currency`    | - `price.currency`
  - `price_data.currency` (if defined when the Checkout Session is created)       |
| `line_items.images`      | `product.images` (displays the first image supplied)                                                 |

### Server-side code for inline items

Previously, you could only create one-time items inline. With prices, you can continue to configure your items inline, but you can also define your prices dynamically with [price_data](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-line_items-price_data) when you create the Checkout Session.

When you create the Checkout Session with `price_data`, reference an existing product ID with [price_data.product](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-line_items-price_data-product), or define your product details dynamically using [price_data.product_data](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-line_items-price_data-product_data). The following example demonstrates the flow for creating a one-time item.

#### curl

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \
  -d "line_items[0][quantity]"=1 \-d "line_items[0][price_data][unit_amount]"=2000 \
  -d "line_items[0][price_data][product_data][name]"=T-shirt \
  -d "line_items[0][price_data][product_data][description]"="Comfortable cotton t-shirt" \
  -d "line_items[0][price_data][product_data][images][]"="https://example.com/t-shirt.png" \
  -d "line_items[0][price_data][currency]"=usd \
  -d mode=payment \
  -d success_url="https://example.com/success" \
```

### Server-side code for one-time prices 

With this new integration, you can [create a product and price catalog](https://docs.stripe.com/payments/accept-a-payment.md) upfront instead of needing to define the amount, currency, and name each time you create a Checkout Session.

You can either create a product and price with the [Prices API](https://docs.stripe.com/api/prices.md) or through the [Dashboard](https://dashboard.stripe.com/products). You’ll need the price ID to create the Checkout Session. The following example demonstrates how to create a product and price through API:

#### curl

```bash
curl https://api.stripe.com/v1/products \
  -u<<YOUR_SECRET_KEY>>: \
  -d name=T-shirt \
  -d description="Comfortable cotton t-shirt" \
  -d "images[]"="https://example.com/t-shirt.png"

curl https://api.stripe.com/v1/prices \
  -u<<YOUR_SECRET_KEY>>: \
  -d product="{{PRODUCT_ID}}" \
  -d unit_amount=2000 \
  -d currency=usd

curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \
  -d "line_items[0][quantity]"=1 \-d "line_items[0][price]"="{{PRICE_ID}}" \
  -d mode=payment \
  -d success_url="https://example.com/success" \
```

## Subscriptions 

Integrations for recurring payments have the following changes:

- All items are passed into a single [line_items](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-line_items) field, instead of `subscription_data.items`.
- [mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-mode) is now required. Set `mode=subscription` if the session includes any recurring items.

The client-side code remains the same. Existing plans can be used wherever recurring prices are accepted.

### Server-side code with plans 

Here is a before and after example of creating a Checkout Session with a trial and using an existing plan, which can be used interchangeably with a price. The plan is now passed into `line_items` instead of `subscription_data.items`.

#### curl

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \-d "line_items[0][price]"="{{PRICE_OR_PLAN_ID}}" \
  -d "line_items[0][quantity]"=1 \
  -d mode=subscription \
  -d success_url="https://example.com/success" \
```

### Server-side code for recurring price with setup fee

If you have recurring plans with a one-time setup fee, create the product and price representing the one-time fee before creating the Checkout Session. See the [mapping table](https://docs.stripe.com/payments/checkout/migrating-prices.md#mapping-table-server-one-time) for how the old `line_items` fields map to the new integration. You can either create a product and price through the [Prices API](https://docs.stripe.com/api/prices.md) or through the [Stripe Dashboard](https://dashboard.stripe.com/products). You can also [create the one-time item inline](https://docs.stripe.com/payments/checkout/migrating-prices.md#server-side-code-for-inline-items). The following example uses an existing price ID:

#### curl

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \-d "line_items[0][price]"="{{PRICE_OR_PLAN_ID}}" \
  -d "line_items[0][quantity]"=1 \
  -d "line_items[1][price]"="{{ONE_TIME_PRICE_ID}}" \
  -d "line_items[1][quantity]"=1 \
  -d mode=subscription \
  -d success_url="https://example.com/success" \
```

## Response object changes 

Instead of listing items with `display_items`, the Checkout Session object uses `line_items`. The `line_items` field doesn’t render by default as `display_items` did, but you can include it using [expand](https://docs.stripe.com/api/expanding_objects.md) when creating a Checkout Session:

#### curl

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \
  -d "payment_method_types[]"="card" \
  -d "mode"="payment" \
  -d "line_items[0][price]"="{{PRICE_ID}}" \
  -d "line_items[0][quantity]"=1 \
  -d "success_url"="https://example.com/success" \
  -d "expand[]"="line_items"
```

## Webhook changes 

Since `line_items` is includable, the `checkout.session.completed` *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) response no longer list items by default. The smaller response object enables you to receive your Checkout webhooks faster. You can retrieve items with the new `line_items` endpoint:

#### curl

```bash
curl https://api.stripe.com/v1/checkout/sessions/{{CHECKOUT_SESSION_ID}}/line_items \
  -u <<YOUR_SECRET_KEY>>:
```

For more details, see [fulfilling orders with Checkout](https://docs.stripe.com/checkout/fulfillment.md).
