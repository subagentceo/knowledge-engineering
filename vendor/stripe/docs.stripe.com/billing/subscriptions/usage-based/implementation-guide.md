# Set up a pay-as-you-go pricing model

Charge customers based on their usage of your product or service.

[Pay-as-you-go pricing](https://docs.stripe.com/subscriptions/pricing-models/usage-based-pricing.md#pay-as-you-go) is a flexible, scalable model that lets you charge customers in arrears for the usage they accrue. AI businesses, SaaS platforms, and cloud services often use this pricing model.

> #### Not Recommended
> 
> This guide covers basic usage-based billing with Billing Meters. Unless you maintain an existing Billing Meters integration, use [Metronome](https://docs.stripe.com/billing/usage-based.md), Stripe’s primary usage-based billing platform, instead.
> 
> If you already use Billing Meters, you don’t need to migrate. Continue using this guide for your existing integration.

## Before you start: use Metronome for new integrations

This guide implements pay-as-you-go pricing using the Billing Meters API. Unless you’re maintaining an existing Billing Meters integration, use [Metronome](https://docs.stripe.com/billing/usage-based.md) instead.

This applies to:

- Starting a new usage-based billing integration from scratch
- Adding usage-based pricing to existing flat-rate subscriptions — if you have regular Stripe subscriptions today and want to add metering, Metronome is the right starting point, not this guide
- Any integration that might need prepaid credits, enterprise contracts, dimensional pricing, or real-time usage visibility

Metronome is Stripe’s primary usage-based billing platform. It handles event ingestion, metering, rating, and invoice generation through a purpose-built billing engine, and integrates with Stripe for payment collection and tax. Compared to building directly on Billing Meters, Metronome adds:

- Real-time usage visibility (Billing Meters only updates at invoice time)
- Prepaid credits and credit burndown
- Enterprise contracts with commits, minimums, and ramp schedules
- Dimensional and composite pricing configurations
- High-volume event ingestion at scale

The Billing Meters approach in this guide is appropriate only if you are already billing customers via Billing Meters today and have straightforward pay-as-you-go pricing that won’t grow more complex.

See [Compare basic usage-based billing and Metronome](https://docs.stripe.com/billing/subscriptions/usage-based/compare-metronome.md) to evaluate both options.

## What you’ll build

This guide describes how to implement pay-as-you-go pricing on Stripe for a fictional company called Hypernian. Hypernian charges their customers the following rates for their LLM models:

| Usage | Fee                     |
| ----- | ----------------------- |
| Token | 0.04 USD per 100 tokens |

To implement this pricing model, you create a meter, set up pricing and billing, and send meter events to record customer usage using [Products](https://docs.stripe.com/api/products.md) and [Prices](https://docs.stripe.com/api/prices.md).

## Create a meter

Meters specify how to aggregate meter events over a billing period. Meter events represent all actions that customers take in your system (for example, API requests). Meters attach to prices and form the basis of what’s billed.

For the Hypernian example, meter events are the number of tokens a customer uses in a query. The meter is the sum of tokens over a month.

You can use the Stripe Dashboard or API to configure a meter. To use the API with the Stripe CLI to create a meter, [get started with the Stripe CLI](https://docs.stripe.com/stripe-cli.md).

#### Dashboard

1. On the [Meters](https://dashboard.stripe.com/test/meters) page, click **Create meter**.
2. In the meter editor:
   - For **Meter name**, enter the name of the meter to display and for organization purposes. For the Hypernian example, enter “Hypernian tokens.”
   - For **Event name**, enter the name to display in meter events when reporting usage to Stripe. For the Hypernian example, enter “hypernian_tokens.”
   - Set the **Aggregation method** in the dropdown:
     - For the Hypernian example, select **Sum**. This will *sum the values* reported (in this example, number of tokens a customer uses) to determine the usage to bill for.
     - Choose **Count** to bill based on the *number* of events reported.
     - Choose **Last** to bill based on the *last value* reported.
     - Use the preview pane to set example usage events and verify the aggregation method.
   - Click **Create meter**.

#### API

```curl
curl https://api.stripe.com/v1/billing/meters \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "display_name=Hypernian tokens" \
  -d event_name=hypernian_tokens \
  -d "default_aggregation[formula]=sum" \
  -d "customer_mapping[event_payload_key]=stripe_customer_id" \
  -d "customer_mapping[type]=by_id" \
  -d "value_settings[event_payload_key]=value"
```

## Create a pricing model

Use the Stripe Dashboard or API to create a [pricing model](https://docs.stripe.com/products-prices/pricing-models.md) that includes your [Products](https://docs.stripe.com/api/products.md) and their pricing options. [Prices](https://docs.stripe.com/api/prices.md) define the unit cost, currency, and billing period.

For the Hypernian example, you create a product with a metered price of 0.04 USD per hundred units, billed at a monthly interval. You use the meter that you created in the previous step.

#### Dashboard

1. On the [Product catalog](https://dashboard.stripe.com/products?active=true) page, click **Create product**.
2. On the **Add a product** page, do the following:
   - For **Name**, enter the name of your product. For the Hypernian example, enter `Hypernian`.
   - (Optional) For **Description**, add a description that appears in [Checkout](https://docs.stripe.com/payments/checkout.md), in the [customer portal](https://docs.stripe.com/customer-management.md) and in [quotes](https://docs.stripe.com/quotes.md).
   - Select **Recurring**.
   - Under **Billing period**, select **More pricing options**.
3. On the **Add price** page, do the following:
   - Under **Choose your pricing model**, select **Usage-based**.
   - Choose your pricing structure:
     - For the Hypernian example, select **Per package**. Under **Price**, set the **Amount** to `0.04 USD` per `100` units.
     - Select **Per unit** to price by number of users, units, or seats.
     - Select **Per tier** to enable [tiered pricing](https://docs.stripe.com/products-prices/pricing-models.md#tiered-pricing) and change the unit cost with quantity or usage.
   - Under **Meter**, select the meter you created in step 1. For the Hypernian example, select **Hypernian tokens** from the dropdown.
   - Select the appropriate **Billing period**. For the Hypernian example, select **Monthly**.
   - Click **Next**.
4. On the **Add a product** page, click **Add product**.

#### API

You can locate your meter ID on the meter details page.

```curl
curl https://api.stripe.com/v1/prices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d unit_amount=4 \
  -d billing_scheme=per_unit \
  -d "transform_quantity[divide_by]=100" \
  -d "transform_quantity[round]=up" \
  -d "recurring[usage_type]=metered" \
  -d "recurring[interval]=month" \
  -d "recurring[meter]={{METER_ID}}" \
  -d "product_data[name]=Hypernian tokens"
```

## Create a customer

Next, create a customer.

#### Dashboard

1. On the [Customers](https://dashboard.stripe.com/test/customers) page, click **Add customer**.
2. On the **Create customer** page, do the following:
   - For **Name**, enter the name of your customer. For the Hypernian example, enter `John Doe`.
   - (Optional) Add an email address and description for your customer.
   - Click **Add customer**.

#### API

> #### Use the Accounts v2 API to represent customers
> 
> The Accounts v2 API is generally available for Connect users, and in public preview for other Stripe users. If you’re part of the Accounts v2 preview, you need to specify a [specify a preview version](https://docs.stripe.com/api-v2-overview.md#sdk-and-api-versioning) in your code.
> 
> To request access to the Accounts v2 preview, 
> 
> For most use cases, we recommend [modeling your customers as customer-configured Account objects](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md) instead of using [Customer](https://docs.stripe.com/api/customers.md) objects.

Create a customer-configured [Account](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer) or [Customer](https://docs.stripe.com/api/customers/create.md) when your customer creates an account with your business, or when saving a payment method. Associate the object’s ID with your own internal representation of a customer.

Create a new customer or retrieve an existing one to associate with this payment.

#### Accounts v2

```curl
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-05-27.preview" \
  --json '{
    "contact_email": "jenny.rosen@example.com",
    "display_name": "Jenny Rosen",
    "configuration": {
        "customer": {}
    },
    "include": [
        "configuration.customer"
    ]
  }'
```

#### Customers v1

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "name=Jenny Rosen" \
  --data-urlencode "email=jenny.rosen@example.com"
```

## Create a subscription

[Subscriptions](https://docs.stripe.com/api/subscriptions.md) allow you to charge recurring amounts by associating a customer with a specific price.

Use the Stripe Dashboard or API to create a subscription that includes your customer, product, and usage-based price.

For the Hypernian example, you create a subscription for the Hypernian product, with a metered price of 0.04 USD per 100 units, billed monthly to John Doe.

> You can associate a single metered price with one or more subscriptions.
> 
> When you create a `billing_mode=flexible` subscription, Stripe excludes metered line items from the first invoice since no prior usage exists to bill. Stripe creates an invoice only if the subscription is backdated with previously accrued usage or if pending invoice items exist. When you create a `billing_mode=classic` subscription, Stripe generates a zero monetary value invoice line item for each metered subscription item.

#### Dashboard

1. On the [Subscriptions](https://dashboard.stripe.com/test/subscriptions) page, click **Create test subscription**.
2. On the **Create a test subscription** page, do the following:
   - Under **Customer**, select the name of your customer. For the Hypernian example, select **John Doe**.
   - Under **Product**, select your price. For the Hypernian example, select the price under **Hypernian**.
   - (Optional) Modify the subscription details and settings as needed.
   - Click **Create test subscription**.

#### API

Locate your customer ID on the customer details page. To locate your price ID, go to the product details page and click the overflow menu (⋯) under **Pricing**. Select **Copy price ID**.

#### Accounts v2

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer_account={{CUSTOMERACCOUNT_ID}}" \
  -d "items[0][price]={{PRICE_ID}}"
```

#### Customers v1

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "items[0][price]={{PRICE_ID}}"
```

## Send a test meter event

Use [Meter Events](https://docs.stripe.com/api/billing/meter-event.md) to [record customer usage](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage.md) for your meter. At the end of the billing period, Stripe bills the reported usage.

You can test your usage-based billing by sending a meter event through the Stripe Dashboard or API. When using the API, specify the customer ID and value for the `payload`.

After you send meter events, you can view usage details for your meter on the [Meters](https://dashboard.stripe.com/test/meters) page in the Dashboard.

#### Dashboard

1. On the [Meters](https://dashboard.stripe.com/test/meters) page, select the meter name. For the Hypernian example, select **Hypernian tokens**.
2. On the meter page, click **Add usage** > **Manually input usage**.
3. On the **Add usage** page, do the following:
   - Select your customer from the **Customer** dropdown.
   - For **Value**, enter a sample value. For the Hypernian example, enter `3000`.
   - Click **Submit**.

#### API

```curl
curl https://api.stripe.com/v1/billing/meter_events \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d event_name=hypernian_tokens \
  -d "payload[stripe_customer_id]={{CUSTOMER_ID}}" \
  -d "payload[value]=25"
```

## Create a preview invoice

[Create a preview invoice](https://docs.stripe.com/api/invoices/create_preview.md) to see a preview of a customer’s invoice that includes details such as the meter price and usage quantity.

#### Dashboard

1. On the [Subscriptions](https://dashboard.stripe.com/test/subscriptions) page, select a subscription. For the Hypernian example, select the subscription for **John Doe**.

2. On the subscription details page, scroll down to the **Upcoming invoice** section. The preview invoice shows the subscription amount to bill the customer on the specified date.

3. Click **View full invoice** to see complete details for the upcoming invoice, including:

   - Customer
   - Billing method
   - Creation date
   - Connected subscription
   - Subscription details (usage quantity and meter price)
   - Amount due

   Because Stripe processes meter events asynchronously, upcoming invoices might not immediately reflect recently received meter events.

#### API

```curl
curl https://api.stripe.com/v1/invoices/create_preview \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "subscription={{SUBSCRIPTION_ID}}"
```

## Optional: Retrieve usage for a custom time period

Use the [Meter Event Summary](https://docs.stripe.com/api/billing/meter-event-summary.md) to retrieve total usage for a custom time period. The meter event summary returns a customer’s aggregated usage for a period, based on the aggregation formula defined by the meter. If you represent your customers as customer-configured [Accounts](https://docs.stripe.com/api/v2/core/accounts/object.md), pass the `Account` ID to the `customer` parameter.

In the Hypernian example, the meter event summary returns the sum of tokens for a specific customer, meter, and time window.

Because Stripe processes meter events asynchronously, meter event summaries might not immediately reflect recently received meter events.

```curl
curl -G https://api.stripe.com/v1/billing/meters/{{METER_ID}}/event_summaries \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer={{CUSTOMER_ID}} \
  -d start_time=1717249380 \
  -d end_time=1717249440
```

## Next steps

- [Accept payments with Stripe Checkout](https://docs.stripe.com/payments/checkout.md)
- [Set up alerts and thresholds](https://docs.stripe.com/billing/subscriptions/usage-based/monitor.md)
- [Set up billing credits](https://docs.stripe.com/billing/subscriptions/usage-based/billing-credits/implementation-guide.md)
- [Get started with Metronome](https://docs.stripe.com/billing/usage-based.md), Stripe’s recommended platform for new usage-based billing integrations
- [Compare basic usage-based billing and Metronome](https://docs.stripe.com/billing/subscriptions/usage-based/compare-metronome.md)
