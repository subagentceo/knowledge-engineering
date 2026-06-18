# Embeddable pricing table for subscriptions

Display a subscription pricing table on your website and take customers directly to Stripe Checkout.

You can use the Stripe Dashboard to create an embeddable pricing table to:

- Display *pricing information* (The pricing model consists of the products or services you sell, how much they cost, what currency you accept for payments, and the service period to charge (for subscriptions). To build the pricing model, you use Products—what you sell—and Prices—how much and how often to charge for your products) and take customers to a prebuilt checkout flow. The checkout flow uses [Stripe Checkout](https://docs.stripe.com/payments/checkout.md) to complete the purchase.
- Support common subscription business models like [flat-rate](https://docs.stripe.com/products-prices/pricing-models.md#flat-rate), [per-seat](https://docs.stripe.com/products-prices/pricing-models.md#per-seat), [tiered pricing](https://docs.stripe.com/products-prices/pricing-models.md#tiered-pricing), and free trials.
- Configure, customize, and update product and pricing information directly in the Dashboard, without needing to write any code.
- Embed into your website with a `<script>` tag and web component. Stripe automatically generates the tag. You copy and paste it into your website’s code.

The diagram below summarizes how the customer goes from viewing a pricing table to completing checkout.
Pricing table (See full diagram at https://docs.stripe.com/payments/checkout/pricing-table)
## Create a pricing table 

1. In the Dashboard, go to **Product catalog** > [pricing tables](https://dashboard.stripe.com/pricing-tables).
2. Click **+Create pricing table**.
3. Add products relevant to your customers (up to four per pricing interval). Optionally, include a free trial.
4. Adjust the look and feel in **Display settings**. Highlight a specific product and customize the language, colors, font, and button design, then click **Continue**.
5. Configure **Payment settings** to select the customer information to collect, options to present to the customer, and whether to display a confirmation page or redirect customers back to your site after a successful purchase.
   > #### Confirm maximum quantity
   > 
   > If you have tiered pricing that supports quantities greater than the default maximum of 99, check the **Let customers adjust quantity** property and increase the **Max** value accordingly. Tiered pricing options for quantities above the maximum don’t appear in the selector.
6. Configure the [customer portal](https://docs.stripe.com/no-code/customer-portal.md) by clicking **Continue**.
7. Click **Copy code** to copy the generated code and embed it into your website.

## Embed a pricing table 

After creating a pricing table, Stripe automatically returns an embed code composed of a `<script>` tag and a `<stripe-pricing-table>` web component. Click the **Copy code** button to copy the code and paste it into your website.

If you’re using HTML, paste the embed code into the HTML. If you’re using React, include the `script` tag in your `index.html` page to mount the `<stripe-pricing-table>` component.

> The pricing table uses your account’s [publishable API key](https://docs.stripe.com/keys.md). If you revoke the API key, you need to update the embed code with your new publishable API key.

#### HTML

```html
<body>
  <h1>We offer plans that help any business!</h1>
  <!-- Paste your embed code script here. -->
  <script
    async
    src="https://js.stripe.com/v3/pricing-table.js">
  </script>
  <stripe-pricing-table
    pricing-table-id="{{PRICING_TABLE_ID}}"
    publishable-key="<<YOUR_PUBLISHABLE_KEY>>"
  >
  </stripe-pricing-table>
</body>
```

## Customize a pricing table 

Optionally, you can customize your pricing table.

### Add product marketing features  (Optional)

The pricing table can display your products’ marketing features to help your customers decide what to purchase. To add marketing features to a product in your pricing table, go to **Additional options** > **Feature list**.

You can also add marketing features when creating or updating products with the API.

```curl
curl https://api.stripe.com/v1/products \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d name=Professional \
  -d "marketing_features[0][name]=Unlimited boards" \
  -d "marketing_features[1][name]=Up to 20 seats"
```

### Add a custom call-to-action  (Optional)

The pricing table allows you to configure a product with a custom call-to-action that redirects to any URL. You can use this if you have custom pricing or a high-touch sales process for one of your products. You can only set one product to have a custom call-to-action button.

Click **Add product with custom call-to-action button** to choose a product and a custom call-to-action, and to set the correct URL.

Custom call-to-action supports these formats:

- Absolute links, like `https://wwww.stripe.com`.
- Relative links like `/contact`. If you embed your pricing table on `wwww.stripe.com/pricing-table`, a URL of `/contact` navigates to `wwww.stripe.com/pricing-table/contact`.
- Contact-specific links that use `mailto` and `tel`. For example, you can configure the URL to be `mailto:email@yourcompany.com` or `tel:xxx-xxx-xxx`.
- Links that include two variables,`{PRODUCT_ID}` and `{CUSTOMER_EMAIL}`. Stripe populates the relevant product ID and the customer email when a customer clicks the call-to-action. You must pass in the customer email for the `{CUSTOMER_EMAIL}` parameter to work.

### Add custom fields  (Optional)

You can add custom fields on each of your products and prices in your pricing table to collect additional information from your customers. The information is available after the payment is complete and is useful for fulfilling the purchase.

> Don’t use custom fields to collect personal, protected, or sensitive data, or information restricted by law.

You can add the following types of fields:

| Type         | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| Text         | Used to collect freeform text, up to 255 characters.                                         |
| Numbers only | Used to collect only numerical values, up to 255 digits.                                     |
| Dropdown     | Presents your customers with a list of options to select from. You can add up to 10 options. |

1. Click **Add custom fields** in the **Payment settings** section.
2. Select a type of field to add.
3. Enter a label for the field.
4. (Optional) Mark your field as required.

After your customer completes the payment, you can view the fields on the payment details page in the Dashboard.

The custom fields are also sent in the [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) event after payment completion. Register an [event destination](https://docs.stripe.com/event-destinations.md) to receive the event at your endpoint.

### Present local currencies  (Optional)

Automatically display prices in your pricing table or checkout flow in your customers’ local currency by configuring [multi-currency prices](https://docs.stripe.com/payments/checkout/localize-prices/manual-currency-prices.md). Use the [customer-email](https://docs.stripe.com/payments/checkout/pricing-table.md#customer-email) attribute to test how your pricing table and payment page appear to customers in different countries.

In the `stripe-pricing-table`, set the [customer_email](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer_email) property and include a suffix of the form `+location_XX` in the local part of the email. `XX` must be a valid [two-letter ISO country code](https://www.nationsonline.org/oneworld/country_code_list.htm).

#### HTML

```html
<body>
  <h1>We offer plans that help any business!</h1>
  <!-- Paste your embed code script here. -->
  <script
    async
    src="https://js.stripe.com/v3/pricing-table.js">
  </script>
  <stripe-pricing-table
    pricing-table-id="{{PRICING_TABLE_ID}}"
    publishable-key="<<YOUR_PUBLISHABLE_KEY>>"customer-email="test+location_FR@email.com"
  >
  </stripe-pricing-table>
</body>
```

When you view the pricing table, the currency matches the default currency of the country you specify in the `customer_email` (in this case, France).

### Customize the post-purchase experience  (Optional)

After a successful payment, your customer sees a localized confirmation message thanking them for their purchase. You can customize the confirmation message or redirect to a URL of your choice. To change the confirmation behavior on a pricing table, click the **Confirmation page** section when creating or updating the pricing table.

If you redirect your customers to your own confirmation page, you can include `{CHECKOUT_SESSION_ID}` in the redirect URL to dynamically pass the customer’s current Checkout Session ID. This can be helpful if you want to tailor the success message on your website based on the information in the Checkout Session.

### Configure free trials  (Optional)

To offer a free trial for a price, select **Include a free trial** and set the length of the trial when you create or edit a [pricing table](https://dashboard.stripe.com/test/pricing-tables). After customers confirm their payment details, they’re redirected to a page where they can start their trial. The new page is part of a Checkout Session.

#### Configure trials without payment methods

To allow customers to sign up for a subscription without providing their payment method details, select **Include a free trial**, then click **Continue**. Next, select **Only collect payment method information if required**.

Make sure to [set up email reminders](https://docs.stripe.com/payments/checkout/free-trials.md#collect-payment) to collect payment method information from customers before their trial ends. Otherwise, Stripe pauses the trial.

### Pass the customer email  (Optional)

The `<stripe-pricing-table>` web component supports setting the `customer-email` property. When the property is set, the pricing table passes it to the Checkout Session’s [customer_email](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer_email) attribute, automatically entering the email address on the payment page.

#### HTML

```html
<body>
  <h1>We offer plans that help any business!</h1>
  <!-- Paste your embed code script here. -->
  <script
    async
    src="https://js.stripe.com/v3/pricing-table.js">
  </script>
  <stripe-pricing-table
    pricing-table-id="{{PRICING_TABLE_ID}}"
    publishable-key="<<YOUR_PUBLISHABLE_KEY>>"customer-email="{{CUSTOMER_EMAIL}}"
  >
  </stripe-pricing-table>
</body>
```

### Pass an existing customer  (Optional)

You can provide an existing customer-configured [Account](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-configuration-customer) or [Customer](https://docs.stripe.com/api/customers.md) to Checkout Sessions created from the pricing table. Create a customer session for a user you’ve already authenticated server-side and return the [client_secret](https://docs.stripe.com/api/customer_sessions/object.md#customer_session_object-client_secret) to the client.

> #### Use the Accounts v2 API to represent customers
> 
> The Accounts v2 API is generally available for Connect users, and in public preview for other Stripe users. If you’re part of the Accounts v2 preview, you need to specify a [specify a preview version](https://docs.stripe.com/api-v2-overview.md#sdk-and-api-versioning) in your code.
> 
> To request access to the Accounts v2 preview, 
> 
> For most use cases, we recommend [modeling your customers as customer-configured Account objects](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md) instead of using [Customer](https://docs.stripe.com/api/customers.md) objects.

#### Accounts v2

```curl
curl https://api.stripe.com/v1/customer_sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer_account={{CUSTOMERACCOUNT_ID}}" \
  -d "components[pricing_table][enabled]=true"
```

#### Customers v1

```curl
curl https://api.stripe.com/v1/customer_sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "components[pricing_table][enabled]=true"
```

Set the `customer-session-client-secret` attribute on the `<stripe-pricing-table>` web component to the [client_secret](https://docs.stripe.com/api/customer_sessions/object.md#customer_session_object-client_secret) from the Customer Session.

#### HTML

```html
<body>
  <h1>We offer plans that help any business!</h1>
  <script
    async
    src="https://js.stripe.com/v3/pricing-table.js">
  </script>
  <stripe-pricing-table
    pricing-table-id="{{PRICING_TABLE_ID}}"
    publishable-key="<<YOUR_PUBLISHABLE_KEY>>"customer-session-client-secret="{{CLIENT_SECRET}}"
  >
  </stripe-pricing-table>
</body>
```

#### Customer client secret expiration

You have 30 minutes to include the client secret in the pricing table. After rendering the pricing table, you have an additional 30 minutes to complete a payment before the customer session expires. If you create a Checkout Session with an expired customer session, we discard the client secret and create the Checkout Session with no associated customer.

If the customer session expires after Checkout Session creation, but before confirmation, payment confirmation fails.

## Update a pricing table 

You can update a pricing table from its details page in the Dashboard. On the **Product catalog** page, select the [Pricing tables tab](https://dashboard.stripe.com/pricing-tables), then find and select the pricing table you want to edit.

On the pricing table details page, click **Edit pricing table**. You can change which products and prices you display and configure the payment page settings. When you save your changes, Stripe automatically updates the pricing table UI.

## Manage subscriptions 

When a customer purchases a subscription, you’ll see it on the [subscriptions page](https://dashboard.stripe.com/subscriptions) in the Dashboard.

### Handle fulfillment with the Stripe API

The pricing table component uses Stripe Checkout to render a prebuilt, hosted payment page. When a payment is completed using Checkout, Stripe sends the [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) event. Register an [event destination](https://docs.stripe.com/event-destinations.md) to receive the event at your endpoint to process fulfillment and reconciliation. See the [Checkout fulfillment guide](https://docs.stripe.com/checkout/fulfillment.md) for more details.

The `<stripe-pricing-table>` web component supports setting the `client-reference-id` property. When the property is set, the pricing table passes it to the Checkout Session’s [client_reference_id](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-client_reference_id) attribute to help you reconcile the Checkout Session with your internal system. This can be an authenticated user ID or a similar string. `client-reference-id` can be composed of alphanumeric characters, dashes, or underscores, and be any value up to 200 characters. Invalid values are silently dropped and your pricing table will continue to work as expected.

> Since the pricing table is embedded on your website and is accessible to anyone, check that `client-reference-id` doesn’t include sensitive information or secrets, such as passwords or API keys.

#### HTML

```html
<body>
  <h1>We offer plans that help any business!</h1>
  <!-- Paste your embed code script here. -->
  <script
    async
    src="https://js.stripe.com/v3/pricing-table.js">
  </script>
  <stripe-pricing-table
    pricing-table-id="{{PRICING_TABLE_ID}}"
    publishable-key="<<YOUR_PUBLISHABLE_KEY>>"client-reference-id="{{CLIENT_REFERENCE_ID}}"
  >
  </stripe-pricing-table>
</body>
```

### Limit customers to one subscription 

You can redirect customers that already have a subscription to the *customer portal* (The customer portal is a secure, Stripe-hosted page that lets your customers manage their subscriptions and billing details) or your website to manage their subscription. Learn more about [limiting customers to one subscription](https://docs.stripe.com/payments/checkout/limit-subscriptions.md).

### Let customers manage their subscriptions 

Share a link to your *customer portal* (The customer portal is a secure, Stripe-hosted page that lets your customers manage their subscriptions and billing details), where customers can log in with their email to manage subscriptions, update payment methods, and so on. Learn how to create and share your [customer portal link](https://docs.stripe.com/customer-management/activate-no-code-customer-portal.md).

## Content Security Policy 

If you’ve deployed a *Content Security Policy* (Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks), the policy directives that pricing table requires are:

- `frame-src`,`https://js.stripe.com`
- `script-src`, `https://js.stripe.com`

## Limitations 

- **Business models**: The pricing table supports subscription business models such as flat-rate, per-seat, tiered pricing, and trials. It doesn’t support [usage-based pricing models](https://docs.stripe.com/products-prices/pricing-models.md#usage-based-pricing).
- **Product and price limits**: You can configure the pricing table to display a maximum of four products, with up to three prices per product. You can only configure three unique pricing intervals across all products.
- **Account creation**: The pricing table call-to-action takes customers directly to checkout. It doesn’t currently support adding an intermediate step (for example, asking the customer to create an account on your website before checking out).
- **Rate limit**: The pricing table has a [rate limit](https://docs.stripe.com/rate-limits.md) of up to 50 read operations per second. If you have multiple pricing tables, the rate limit is shared.
- **Checkout redirect**: The pricing table can’t redirect customers to checkout if your website provider sandboxes the embed code in an iframe without the `allow-top-navigation` attribute enabled. Contact your website provider to enable this setting.
- **Testing the pricing table locally**: The pricing table requires a website domain to render. To test the pricing table locally, run a local HTTP server to host your website’s `index.html` file over the `localhost` domain. To run a local HTTP server, use Python’s [SimpleHTTPServer](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#running_a_simple_local_http_server) or the [http-server](https://www.npmjs.com/package/http-server) npm module.
- **Connect**: The pricing table isn’t designed to work with *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) and doesn’t support features like a platform collecting fees.
