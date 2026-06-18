# Tax for software platforms

Learn how to enable Stripe Tax for your connected accounts, and collect tax when the connected account is liable for paying the tax.

Stripe Tax enables businesses to calculate, collect, and report indirect taxes in over [100 countries](https://docs.stripe.com/tax/supported-countries.md), across hundreds of product categories. As a platform, you can use Stripe tax to offer pre-integrated tax compliance to your connected accounts.

Use this guide if your connected accounts are responsible for collecting, filing, and reporting taxes.

1. [Set up your connected accounts for tax](https://docs.stripe.com/tax/tax-for-platforms.md#set-up)
2. (Optional) [Assign tax codes to the product catalog](https://docs.stripe.com/tax/tax-for-platforms.md#assign-product-tax-codes)
3. [Integrate tax calculation and collection](https://docs.stripe.com/tax/tax-for-platforms.md#enable-tax-collection)
4. [Access Stripe Tax Reports](https://docs.stripe.com/tax/tax-for-platforms.md#access-reports)

## Set up your connected accounts for tax

As a platform, you must make sure that a connected account has their [tax settings and registrations set up](https://docs.stripe.com/tax/set-up.md) before enabling tax calculations. This can be achieved by:

### Connected account using the Stripe Dashboard

This option is only available to connected accounts with access to the Stripe Dashboard (for example, [Standard](https://docs.stripe.com/connect/standard-accounts.md) accounts). Ask your connected accounts to use the [Stripe Dashboard to add their head office location, preset tax code, and tax registrations](https://docs.stripe.com/tax/set-up.md). You can also collect the head office location and the preset tax code by enabling Stripe Tax in the connected account onboarding. You can make this adjustment in the [Connect onboarding options](https://dashboard.stripe.com/settings/connect/onboarding-options/tax) in the Dashboard.

### Creating a tax interface within your platform

This option allows accounts without access to the Stripe Dashboard (for example, [Custom](https://docs.stripe.com/connect/custom-accounts.md) and [Express](https://docs.stripe.com/connect/express-accounts.md) accounts) to configure Stripe Tax.

Your platform must build an interface and [use the Tax Settings API](https://docs.stripe.com/tax/settings-api.md#updating-settings) to set the head office location and other default values for the connected accounts. And your platform must [use the Tax Registrations API](https://docs.stripe.com/tax/registrations-api.md#adding-registration) to add tax registrations for the locations where the connected accounts have tax obligations.

### Using Connect embedded components within your platform

You can use [Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components.md) to provide Stripe tax compliance integration to your connected accounts directly on your website with minimal development. Stripe regularly updates our embedded component integrations, so your tax compliance requirements are always current.

Stripe offers two components for tax:

- Tax settings: Collect the details a connected account needs to calculate taxes, like the head office address and the [preset tax code](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#product-tax-code).
- Tax registrations: Connected accounts can manage the locations where they have registered with the local tax authority. Adding a registration enables Stripe to calculate and collect taxes in a given location.

To embed tax settings and tax registrations into your website:

1. Use the [embedded components quickstart](https://docs.stripe.com/connect/connect-embedded-components/quickstart.md) to set up your environment.

2. [Create an AccountSession](https://docs.stripe.com/connect/connect-embedded-components/quickstart.md#server-endpoint) with `tax_settings: {enabled: true}` and/or `tax_registrations: {enabled: true}`.

```curl
curl https://api.stripe.com/v1/account_sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d account={{CONNECTED_ACCOUNT_ID}} \
  -d "components[tax_settings][enabled]=true" \
  -d "components[tax_registrations][enabled]=true"
```

1. [Add the tax-settings or tax-registrations component to the DOM](https://docs.stripe.com/connect/connect-embedded-components/quickstart.md#embedded-component).

After creating the account session and [initializing ConnectJS](https://docs.stripe.com/connect/get-started-connect-embedded-components.md#account-sessions), you can render each tax component in the frontend:

#### React

```jsx
// Include this React component
import {
  ConnectTaxSettings,
  ConnectTaxRegistrations,
  ConnectComponentsProvider
} from "@stripe/react-connect-js";

return (
  <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
    <div>
      {/* You can also use a tab layout */}
      <div>
        <h2>Tax Business Details</h2>
        <ConnectTaxSettings />
      </div>
      <div style={{ marginTop: "12px" }}>
        <h2>Tax Registrations</h2>
        <ConnectTaxRegistrations />
      </div>
    </div>
  </ConnectComponentsProvider>
);
```

#### Tax settings component preview

Note: The following is a preview/demo component that behaves differently than live mode usage with real connected accounts. The actual component has more functionality than what might appear in this demo component. For example, for connected accounts without Stripe dashboard access (custom accounts), no user authentication is required in production.

The tax settings component allows connected accounts to set their head office address and a [preset tax code](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#product-tax-code). Both attributes are required to calculate taxes for the connected account.

#### Tax registrations component

Note: The following is a preview/demo component that behaves differently than live mode usage with real connected accounts. The actual component has more functionality than what might appear in this demo component. For example, for connected accounts without Stripe dashboard access (custom accounts), no user authentication is required in production.

The tax registrations component allows a connected account to manage its tax registrations. If a connected account doesn’t add a tax registration, but calculates tax for that jurisdiction, Stripe Tax returns a tax amount of `0.00` and sets the [taxability reason to `not_collecting`](https://docs.stripe.com/tax/zero-tax.md#not-registered).

Your platform must then check whether connected accounts have configured Stripe Tax to enable tax calculations.

> [Sign in](https://dashboard.stripe.com/login?redirect=https%3A%2F%2Fdocs.stripe.com%2Ftax%2Ftax-for-platforms) to check if your connected accounts are ready to use Stripe Tax.

On the Connected accounts page in your Dashboard, you can [filter the list on accounts that are ready to use Stripe Tax](https://dashboard.stripe.com/connect/accounts/view/v/enabled?status%5B0%5D=enabled&taxSettingsStatus=active). You can also export those accounts with the following Stripe Tax-related columns:

- **Tax Settings Status**: the value `active` indicates that the account is ready to use Stripe Tax. The value `pending` indicates that some required fields are [missing](https://docs.stripe.com/api/tax/settings/object.md#tax_settings_object-status_details-pending-missing_fields).
- **Tax Threshold Status**: the value `exceeded` indicates that the account’s calculated sales or transactions are over the location’s threshold, and the business likely needs to register for tax. For more information, see [Monitor your obligations](https://docs.stripe.com/tax/monitoring.md).
- **Tax Registration Status**: the value `active` indicates that the account has at least one active [tax registration](https://docs.stripe.com/tax/registering.md).

You can also check whether an account has configured Stripe Tax by [using the Tax Settings API](https://docs.stripe.com/tax/settings-api.md#checking-settings).

## Assign tax codes to the product catalog [Optional]

To calculate taxes, Stripe Tax requires classifying products into their tax codes. One way to do this is to [supply a preset tax code for each connected account](https://docs.stripe.com/tax/settings-api.md#updating-settings), which is probably sufficient if your connected accounts typically sell a single category of items.

However, you might offer your users more control by allowing them to map Tax Codes to each product. You can retrieve a list of [supported product tax codes](https://docs.stripe.com/tax/tax-codes.md) from the Stripe [Tax Code API](https://docs.stripe.com/api/tax_codes.md). You can also allow a subset of this list if your connected accounts only sell specific types of products.

## Integrate tax calculation and collection

You need to integrate with Stripe Tax to calculate taxes as part of your checkout flow.

### Payment Links

### Payment Links for one-time payments

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Payment Links](https://docs.stripe.com/tax/payment-links.md):

#### Direct charges

For the Payment Links API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true"
```

#### Destination charges

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-transfer_data) with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payment-links/post-payment.md#automatically-send-paid-invoices), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-invoice_creation-invoice_data-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=account" \
  -d "invoice_creation[invoice_data][issuer][account]={{CONNECTEDACCOUNT_ID}}"
```

#### Separate charges and transfers

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payment-links/post-payment.md#automatically-send-paid-invoices), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-invoice_creation-invoice_data-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=account" \
  -d "invoice_creation[invoice_data][issuer][account]={{CONNECTEDACCOUNT_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the payment intent created by the payment link.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Payment Links for subscriptions

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Payment Links](https://docs.stripe.com/tax/payment-links.md):

#### Direct charges

For the Payment Links API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true"
```

#### Destination charges

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-transfer_data) with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-subscription_data-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=account" \
  -d "subscription_data[invoice_settings][issuer][account]={{CONNECTEDACCOUNT_ID}}"
```

#### Separate charges and transfers

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-subscription_data-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=account" \
  -d "subscription_data[invoice_settings][issuer][account]={{CONNECTEDACCOUNT_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the payment intent created by the payment link.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Checkout

### Checkout Sessions for one-time payments

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Checkout](https://docs.stripe.com/tax/checkout.md):

#### Direct charges

For the Checkout Sessions API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

#### Destination charges

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [payment_intent_data[transfer_data][destination]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-transfer_data-destination) with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payments/checkout/receipts.md?payment-ui=stripe-hosted#automatically-send-receipts), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-invoice_creation-invoice_data-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [payment_intent_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "payment_intent_data[transfer_data][destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=account" \
  -d "invoice_creation[invoice_data][issuer][account]={{CONNECTEDACCOUNT_ID}}" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

#### Separate charges and transfers

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payments/checkout/receipts.md?payment-ui=stripe-hosted#automatically-send-receipts), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-invoice_creation-invoice_data-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [payment_intent_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=account" \
  -d "invoice_creation[invoice_data][issuer][account]={{CONNECTEDACCOUNT_ID}}" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the Payment Intent created by the Checkout Session.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Checkout Sessions for subscriptions

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Checkout](https://docs.stripe.com/tax/checkout.md):

#### Direct charges

For the Checkout Sessions API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

#### Destination charges

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [subscription_data[transfer_data][destination]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-transfer_data-destination) with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[transfer_data][destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=account" \
  -d "subscription_data[invoice_settings][issuer][account]={{CONNECTEDACCOUNT_ID}}" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

#### Separate charges and transfers

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=account" \
  -d "subscription_data[invoice_settings][issuer][account]={{CONNECTEDACCOUNT_ID}}" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the Payment Intent created by the Checkout Session.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Billing

### Subscriptions

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Subscriptions](https://docs.stripe.com/tax/subscriptions.md):

#### Direct charges

For the Subscriptions API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "items[0][price]={{PRICE_ID}}" \
  -d "items[0][quantity]=1" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true"
```

#### Destination charges

For the Subscriptions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [transfer_data[destination]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-transfer_data-destination) with the value of the connected account ID.
- Include [invoice_settings[issuer]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "items[0][price]={{PRICE_ID}}" \
  -d "items[0][quantity]=1" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_settings[issuer][type]=account" \
  -d "invoice_settings[issuer][account]={{CONNECTEDACCOUNT_ID}}"
```

#### Separate charges and transfers

For the Subscriptions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [invoice_settings[issuer]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-issuer) with `type=account` and `account` with the value of the connected account ID. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- Include [on_behalf_of](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "items[0][price]={{PRICE_ID}}" \
  -d "items[0][quantity]=1" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_settings[issuer][type]=account" \
  -d "invoice_settings[issuer][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "on_behalf_of={{CONNECTEDACCOUNT_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the payment intent created by the subscription invoice.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Invoicing

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Invoicing](https://docs.stripe.com/tax/invoicing.md):

#### Direct charges

For the Invoices API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true"
```

#### Destination charges

For the Invoices API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/invoices/create.md#create_invoice-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [transfer_data[destination]](https://docs.stripe.com/api/invoices/create.md#create_invoice-transfer_data-destination) with the value of the connected account ID.
- Include [issuer](https://docs.stripe.com/api/invoices/create.md#create_invoice-issuer) with `type=account` and `account` with the value of the connected account ID. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/invoices/create.md#create_invoice-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "issuer[type]=account" \
  -d "issuer[account]={{CONNECTEDACCOUNT_ID}}"
```

#### Separate charges and transfers

For the Invoices API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/invoices/create.md#create_invoice-automatic_tax-liability) with `type=account` and `account` with the value of the connected account ID.
- Include [issuer](https://docs.stripe.com/api/invoices/create.md#create_invoice-issuer) with `type=account` and `account` with the value of the connected account ID. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/invoices/create.md#create_invoice-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=account" \
  -d "automatic_tax[liability][account]={{CONNECTEDACCOUNT_ID}}" \
  -d "issuer[type]=account" \
  -d "issuer[account]={{CONNECTEDACCOUNT_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the payment intent created by the subscription invoice.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

### Custom flows using the Stripe Tax API

### Payment Intents

Pick one of the currently supported [charge types](https://docs.stripe.com/connect/charges.md#types) that allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md):

#### Direct charges

For the Tax Calculation API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

For the Payment Intents API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.
- Include [amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount) with the `amount_total` returned by the tax calculation.
- Include [metadata[tax_calculation]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-metadata) with the `id` returned by the tax calculation.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d amount=1000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "metadata[tax_calculation]={{TAXCALCULATION_ID}}"
```

#### Destination charges

For the Tax Calculation API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

For the Payment Intents API calls:

- Include [amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount) with the `amount_total` returned by the tax calculation.
- Include [metadata[tax_calculation]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-metadata) with the `id` returned by the tax calculation.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-transfer_data-destination) with the value of the connected account ID.
- You can use this regardless of the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant) as specified by the [on_behalf_of](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-on_behalf_of) parameter.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "metadata[tax_calculation]={{TAXCALCULATION_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}"
```

In this scenario, the connected account is liable for tax on the transaction, even though the platform owns the `PaymentIntent`. Think of the platform as facilitating a transaction between the connected account and the account’s customer. When you call the tax calculation API, calculate tax for the connected account by including the `Stripe-Account` header with the connected account ID.

Calculating tax for the connected account also simplifies tax reporting and filing by keeping the tax on connected account transactions separate from tax on transactions made directly with the platform.

#### Separate charges and transfers

For the Tax Calculation API calls:

- Include the `Stripe-Account` header with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

For the Payment Intents API calls:

- Include [amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount) with the `amount_total` returned by the tax calculation.
- Include [metadata[tax_calculation]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-metadata) with the `id` returned by the tax calculation.
- *Remember to include [on_behalf_of](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-on_behalf_of) with the value of the connected account ID if the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant)*.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "metadata[tax_calculation]={{TAXCALCULATION_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the Payment Intent.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

In this scenario, the connected account is liable for tax on the transaction, even though the platform owns the `PaymentIntent`. Think of the platform as facilitating a transaction between the connected account and the account’s customer. When you call the tax calculation API, calculate tax for the connected account by including the `Stripe-Account` header with the connected account ID.

Calculating tax for the connected account also simplifies tax reporting and filing by keeping the tax on connected account transactions separate from tax on transactions made directly with the platform.

You must also [create tax transactions](https://docs.stripe.com/tax/payment-intent/custom.md#tax-transaction) to record the tax you collect from customers and [account for refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

### Off-Stripe payments

Check how to integrate using [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md) and to allow the connected account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details), include the `Stripe-Account` header with the value of the connected account ID in the Tax Calculation API calls:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

You must also [create tax transactions](https://docs.stripe.com/tax/payment-intent/custom.md#tax-transaction) to record the tax you collect from customers and [account for refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

After you implement it, Stripe automatically starts collecting tax in jurisdictions where the user has an active registration.

> Independent of the integration, your connected account receives a credit for the collected tax amount by default.

## Access Stripe Tax Reports

Your connected accounts can use [Stripe Tax reports](https://docs.stripe.com/tax/reports.md) to help them correctly file and remit tax.

### Connected account use the Stripe Dashboard

This option is only available to accounts with access to the Stripe Dashboard (for example, Standard accounts).

The connected accounts can access their Stripe Tax reports using the [Tax Reporting](https://docs.stripe.com/tax/reports.md#how-to-access-data-using-exports-and-reports) functionality in the Stripe Dashboard.

### Use the Stripe API

Use this option for accounts without access to the Stripe Dashboard (for example, Custom and Express accounts).

Platforms can download [itemized tax transactions](https://docs.stripe.com/tax/reports.md#itemized-exports) for their connected accounts using the [Report API](https://docs.stripe.com/reports/api.md) with the [connected_account_tax.transactions.itemized.2](https://docs.stripe.com/reports/report-types/connect.md) report type.

When a platform runs the following command, they download all 2022 transactions from all connected accounts:

```curl
curl https://api.stripe.com/v1/reporting/report_runs \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "report_type=connected_account_tax.transactions.itemized.2" \
  -d "parameters[interval_start]=1641013200" \
  -d "parameters[interval_end]=1672549200"
```

When a platform runs the following command, they download all 2022 transactions from a single connected account:

> To generate reports for connected accounts, use the `connected_account` parameter instead of the `Stripe-Account` header.

```curl
curl https://api.stripe.com/v1/reporting/report_runs \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "report_type=connected_account_tax.transactions.itemized.2" \
  -d "parameters[interval_start]=1641013200" \
  -d "parameters[interval_end]=1672549200" \
  -d "parameters[connected_account]={{CONNECTED_ACCOUNT_ID}}"
```

### Use the Export Tax Transactions Embedded Component

To learn more about this component and integrate it, see [export tax transactions](https://docs.stripe.com/connect/supported-embedded-components/export-tax-transactions.md).

## See also

- [Calculate tax in your custom checkout flow](https://docs.stripe.com/tax/standalone-tax-api.md)
