# Tax for marketplaces

Learn about tax requirements for platforms and marketplaces, and how to enable Stripe Tax to collect tax on transactions when the Connect platform is liable.

## Tax requirements for platforms and marketplaces

Many countries and US states require marketplace operators to collect sales tax and VAT on their facilitated sales. The US refers to these businesses as marketplace facilitators, while other regions, such as Europe, might refer to them as deemed sellers.

As a marketplace operator, your tax collection requirements differ depending on the country or state. However, if your electronic interface enables transactions between buyers and sellers and you directly or indirectly collect customer payments, you might need to fulfill tax collection responsibilities.

If your businesses operates a marketplace or platform, you must first determine whether they qualify as a marketplace facilitator or a deemed seller, then make sure that they maintain tax compliance. If you’re unsure about your business’s tax requirements, consult a tax advisor.

If your business operates a marketplace and wants to collect tax on sales facilitated through this marketplace, refer to details below to enable Stripe Tax for marketplaces.

## Enable Stripe Tax for marketplaces

Stripe Tax enables businesses to calculate, collect, and file indirect taxes in over [100 countries](https://docs.stripe.com/tax/supported-countries.md), across hundreds of product categories.

Use this guide if your platform is responsible for collecting, filing, and reporting taxes.

1. [Configure your platform account for tax collection](https://docs.stripe.com/tax/tax-for-marketplaces.md#set-up)
2. (Optional) [Assign tax codes to product catalog](https://docs.stripe.com/tax/tax-for-marketplaces.md#assign-product-tax-codes)
3. [Integrate tax calculation and collection](https://docs.stripe.com/tax/tax-for-marketplaces.md#enable-tax-collection)
4. [Withhold the collected tax amount](https://docs.stripe.com/tax/tax-for-marketplaces.md#tax-withholding)
5. [Access Stripe Tax reports](https://docs.stripe.com/tax/tax-for-marketplaces.md#access-reports)

Since your connected accounts don’t collect or file taxes:

- Their tax status columns (tax settings status, tax threshold status and tax registration status) in your [Dashboard](https://dashboard.stripe.com/connect/accounts/overview) appear empty.
- We calculate taxes based on your platform’s head office location, preset tax code, and tax registrations. We don’t use the connected account information for tax purposes.

## Configure your platform account for tax collection

To collect taxes, you need the platform account’s tax settings and registrations.

### Use the Stripe Dashboard

[Use the Stripe Dashboard](https://docs.stripe.com/tax/set-up.md) to specify your head office location, preset tax code, and tax registrations.

### Use the Stripe API

Use the [Tax Settings API](https://docs.stripe.com/tax/settings-api.md#updating-settings) to set your head office location and other default values and the [Tax Registrations API](https://docs.stripe.com/tax/registrations-api.md#adding-registration) to add tax registrations for the locations where you have tax obligations.

## Assign tax codes to your product catalog

To calculate taxes, Stripe Tax requires that you classify products into tax codes. You can do so by supplying [a preset tax code](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#preset-tax-codes) for the platform account, which might be sufficient if you typically sell a single category of items or services.

Additionally, you can [map tax codes to each product](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-code-on-product) to give you more control over tax categorization. You might have to map each product that a seller sets up on your marketplace. You can find a list of supported tax codes from [available tax codes](https://docs.stripe.com/tax/tax-codes.md) or retrieve it from the Stripe [Tax Code API](https://docs.stripe.com/api/tax_codes.md).

## Integrate tax calculation and collection

You need to integrate with Stripe Tax to estimate taxes as part of your checkout flow.

### Payment Links

### Payment Links for one-time payments

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Payment Links](https://docs.stripe.com/tax/payment-links.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=self`.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-transfer_data) with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payment-links/post-payment.md#automatically-send-paid-invoices), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-invoice_creation-invoice_data-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=self"
```

#### Separate charges and transfers

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=self`.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payment-links/post-payment.md#automatically-send-paid-invoices), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-invoice_creation-invoice_data-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=self"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Payment Link.
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

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Payment Links](https://docs.stripe.com/tax/payment-links.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=self`.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-transfer_data) with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-subscription_data-invoice_settings-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=self"
```

#### Separate charges and transfers

For the Payment Links API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-automatic_tax-liability) with `type=self`.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-subscription_data-invoice_settings-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/payment-link/create.md#create_payment_link-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "subscription_data[invoice_settings][issuer][type]=self"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Payment Link.
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

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Checkout](https://docs.stripe.com/tax/checkout.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=self`.
- Include [payment_intent_data[transfer_data][destination]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-transfer_data-destination) with the value of the connected account ID.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payments/checkout/receipts.md?payment-ui=stripe-hosted#automatically-send-receipts), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-invoice_creation-invoice_data-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [payment_intent_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "payment_intent_data[transfer_data][destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=self" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

#### Separate charges and transfers

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=self`.
- (Optional) If you’re [automatically sending invoices](https://docs.stripe.com/payments/checkout/receipts.md?payment-ui=stripe-hosted#automatically-send-receipts), include [invoice_creation[invoice_data][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-invoice_creation-invoice_data-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [payment_intent_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "invoice_creation[enabled]=true" \
  -d "invoice_creation[invoice_data][issuer][type]=self" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Checkout Session.
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

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Checkout](https://docs.stripe.com/tax/checkout.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=self`.
- Include [subscription_data[transfer_data][destination]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-transfer_data-destination) with the value of the connected account ID.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-invoice_settings-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "subscription_data[transfer_data][destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "subscription_data[invoice_settings][issuer][type]=self" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

#### Separate charges and transfers

For the Checkout Sessions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-automatic_tax-liability) with `type=self`.
- Include [subscription_data[invoice_settings][issuer]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-invoice_settings-issuer) with `type=self`.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [subscription_data[on_behalf_of]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-subscription_data-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "subscription_data[invoice_settings][issuer][type]=self" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Checkout Session.
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

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Subscriptions](https://docs.stripe.com/tax/subscriptions.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Subscriptions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-automatic_tax-liability) with `type=self`.
- Include [transfer_data[destination]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-transfer_data-destination) with the value of the connected account ID.
- Include [invoice_settings[issuer]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-issuer) with `type=self`. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "items[0][price]={{PRICE_ID}}" \
  -d "items[0][quantity]=1" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "invoice_settings[issuer][type]=self"
```

#### Separate charges and transfers

For the Subscriptions API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-automatic_tax-liability) with `type=self`.
- Include [invoice_settings[issuer]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-issuer) with `type=self`. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- Include [on_behalf_of](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "items[0][price]={{PRICE_ID}}" \
  -d "items[0][quantity]=1" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "invoice_settings[issuer][type]=self" \
  -d "on_behalf_of={{CONNECTEDACCOUNT_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Subscription Invoice.
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

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Invoicing](https://docs.stripe.com/tax/invoicing.md):

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

For the Invoices API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/invoices/create.md#create_invoice-automatic_tax-liability) with `type=self`.
- Include [transfer_data[destination]](https://docs.stripe.com/api/invoices/create.md#create_invoice-transfer_data-destination) with the value of the connected account ID.
- Include [issuer](https://docs.stripe.com/api/invoices/create.md#create_invoice-issuer) with `type=self`. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/invoices/create.md#create_invoice-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "issuer[type]=self"
```

#### Separate charges and transfers

For the Invoices API calls:

- Include [automatic_tax[liability]](https://docs.stripe.com/api/invoices/create.md#create_invoice-automatic_tax-liability) with `type=self`.
- Include [issuer](https://docs.stripe.com/api/invoices/create.md#create_invoice-issuer) with `type=self`. In some jurisdictions, like the European Union, invoice PDFs are used as the tax instrument and the invoice issuer must match the entity *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) at all times.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/invoices/create.md#create_invoice-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true" \
  -d "automatic_tax[liability][type]=self" \
  -d "issuer[type]=self"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent created by the Invoice.
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

### PaymentIntents

Pick one of the currently supported charge types that allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details) with [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md):

#### Direct charges

We don’t recommend this charge type because the connected account controls refunds. The connected account needs to be aware of the tax withholding strategy to refund the correct amount to you and their users.

#### Destination charges

For the Tax Calculation API calls:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

When you create a PaymentIntent:

- Include [amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount) with the `amount_total` returned by the tax calculation.
- Include [metadata[tax_calculation]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-metadata) with the `id` returned by the tax calculation.
- Include [transfer_data[destination]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-transfer_data-destination) with the value of the connected account ID.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/destination-charges.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "metadata[tax_calculation]={{TAXCALCULATION_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}"
```

You must also [create tax transactions](https://docs.stripe.com/tax/payment-intent/custom.md#tax-transaction) to record the tax you collect from customers and [account for refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

#### Separate charges and transfers

For the Tax Calculation API calls:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

When you create a PaymentIntent:

- Include [amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-amount) with the `amount_total` returned by the tax calculation.
- Include [metadata[tax_calculation]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-metadata) with the `id` returned by the tax calculation.
- (Optional) If the connected account is the [settlement merchant](https://docs.stripe.com/connect/separate-charges-and-transfers.md#settlement-merchant), include [on_behalf_of](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-on_behalf_of) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "customer={{CUSTOMER_ID}}" \
  -d "metadata[tax_calculation]={{TAXCALCULATION_ID}}"
```

For the Transfers API calls:

- Include [source_transaction](https://docs.stripe.com/api/transfers/create.md#create_transfer-source_transaction) to tie the transfer to the PaymentIntent.
- Include [destination](https://docs.stripe.com/api/transfers/create.md#create_transfer-destination) with the value of the connected account ID.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

You must also [create tax transactions](https://docs.stripe.com/tax/payment-intent/custom.md#tax-transaction) to record the tax you collect from customers and [account for refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

### Off-Stripe payments

Check how to integrate using [Stripe Tax API](https://docs.stripe.com/tax/standalone-tax-api.md) and to allow your platform account to be *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details). In the Tax Calculation API calls:

```curl
curl https://api.stripe.com/v1/tax/calculations \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d currency=usd \
  -d "line_items[0][amount]=1000" \
  -d "line_items[0][reference]=L1" \
  -d "customer={{CUSTOMER_ID}}"
```

You must also [create tax transactions](https://docs.stripe.com/tax/payment-intent/custom.md#tax-transaction) to record the tax you collect from customers and [account for refunds](https://docs.stripe.com/tax/payment-intent/custom.md#reversals).

After you implement it, Stripe automatically starts collecting tax in jurisdictions where you have an active registration.

> Independent of the payment APIs, we credit the transaction amount to the connected account. You need to withhold the collected tax amount on the platform because the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

## Withhold collected tax amount

You must make sure that the tax collected is transferred to your marketplace account, so that you can then remit the tax to relevant jurisdictions.

### Checkout and Payment Links

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

To withhold the collected tax amount for a Checkout Session or Payment Link integration use a [transfer reversal](https://docs.stripe.com/api/transfer_reversals.md).

For the Transfer Reversal API call, include an [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be reversed from the connected account to your platform equivalent to the [total tax amount](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-total_details-amount_tax) present in the Checkout Session object.

Obtain the [transfer ID](https://docs.stripe.com/api/charges/object.md#charge_object-transfer) from the Charge object. If you don’t know the charge ID, you can retrieve the Checkout Session and [expand](https://docs.stripe.com/expand.md#multiple-properties) the [PaymentIntent](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_intent) object and use the [latest charge](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-latest_charge) field.

```curl
curl https://api.stripe.com/v1/transfers/{{TRANSFER_ID}}/reversals \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000
```

To automatically create a Transfer Reversal when the Checkout Session is completed, create a *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) to be notified for [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) events.

This option is best suited for transactions that don’t require currency exchange.

See [Reverse transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md#reverse-transfers) for more information.

#### Separate charges and transfers

For the Transfer API call, include an [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be transferred to the connected account excluding the [total tax amount](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-total_details-amount_tax) present in the Checkout Session object. The Checkout Session must be complete.

To obtain the charge ID, you can retrieve the Checkout Session and [expand](https://docs.stripe.com/expand.md#multiple-properties) the [PaymentIntent](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-payment_intent) object and use the [latest charge](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-latest_charge) field.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

Learn more about [separate charges and transfers for Checkout Sessions](https://docs.stripe.com/connect/separate-charges-and-transfers.md?platform=web&ui=stripe-hosted).

### Invoicing

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

1. **Option 1:** Use `transfer_data[amount]`

To withhold the collected tax amount on destination charges, you can update the Invoice and exclude the tax amount from the `transfer_data[amount]` value.

For the Invoice Update API call, include [transfer_data[amount]](https://docs.stripe.com/api/invoices/update.md#update_invoice-transfer_data-amount) with the value to be transferred to the connected account excluding the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object. You must make the update before the Invoice is finalized.

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[amount]=1000"
```

1. **Option 2:** Use `application_fee_amount`

Another option to withhold the collected tax amount is to update the Invoice and include the tax amount in the `application_fee_amount` value.

For the Invoice Update API call, include the [application_fee_amount](https://docs.stripe.com/api/invoices/update.md#update_invoice-application_fee_amount) with the value to be held by your platform including the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object. The update must be made before the Invoice is finalized.

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d application_fee_amount=1000
```

1. **Option 3:** Create a [transfer reversal](https://docs.stripe.com/api/transfer_reversals.md)

For the Transfer Reversal API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be reversed from the connected account to your platform equivalent to the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object. The Invoice must be paid.

Obtain the [transfer ID](https://docs.stripe.com/api/charges/object.md#charge_object-transfer) from the [expanded](https://docs.stripe.com/expand.md#multiple-properties) [Charge](https://docs.stripe.com/api/invoices/object.md#invoice_object-charge) object present in the Invoice.

```curl
curl https://api.stripe.com/v1/transfers/{{TRANSFER_ID}}/reversals \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000
```

To automatically create a Transfer Reversal when the Invoice is paid, create a *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) to be notified for [invoice.payment_succeeded](https://docs.stripe.com/api/events/types.md#event_types-invoice.payment_succeeded) events.

This option is best suited for transactions that don’t require currency exchange.

See [Reverse transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md#reverse-transfers) for more information.

#### Separate charges and transfers

For the Transfer API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be transferred to the connected account excluding the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object. The Invoice must be paid.

You can obtain the [charge ID](https://docs.stripe.com/api/invoices/object.md#invoice_object-charge) from the Invoice object.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

Related guide: [Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

### Subscriptions

#### Direct charges

This charge type isn’t supported for use cases involving a connected account where the platform is *liable for tax* (The responsibility for collecting and reporting taxes for transactions in a Connect integration. It can belong to the platform or to connected accounts, depending on your business model, government regulations, and individual transaction details).

#### Destination charges

1. **Option 1:** Use `transfer_data[amount_percent]`

For the Subscription Create API call, include [transfer_data[amount_percent]](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-transfer_data-amount_percent) with the percentage of the subscription invoice total that will be transferred to the destination account, excluding the tax amount. Before you create the Subscription, you can use the [create preview invoice](https://docs.stripe.com/api/invoices/create_preview.md) endpoint to fetch the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[amount_percent]=65"
```

For the subsequent billing cycles, you can create a [webhook](https://docs.stripe.com/billing/subscriptions/webhooks.md#understand) that listens to the [invoice.created](https://docs.stripe.com/api/events/types.md#event_types-invoice.created) event and you can also update the Invoice, including a [transfer_data[amount]](https://docs.stripe.com/api/invoices/update.md#update_invoice-transfer_data-amount) with the flat amount that will be transferred to the destination account excluding the total tax amount. You must make the update before the Invoice is finalized. Learn more about how [draft invoices finalize](https://docs.stripe.com/invoicing/integration/workflow-transitions.md#finalized).

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[amount]=1000"
```

1. **Option 2:** Use `application_fee_percent`

For the Subscription Create API call, include the [application_fee_percent](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-application_fee_percent) with the percentage of the subscription invoice total that will be held by your platform, including the tax amount. Before you create the Subscription, you can use the [create preview invoice](https://docs.stripe.com/api/invoices/create_preview.md) endpoint to fetch the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Invoice object.

```curl
curl https://api.stripe.com/v1/subscriptions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d application_fee_percent=35
```

For the subsequent billing cycles, you can create a [webhook](https://docs.stripe.com/billing/subscriptions/webhooks.md#understand) that listens to the [invoice.created](https://docs.stripe.com/api/events/types.md#event_types-invoice.created) event and you can also update the Invoice, including the [application_fee_amount](https://docs.stripe.com/api/invoices/update.md#update_invoice-application_fee_amount) with the flat amount that will be held by your platform including the total tax amount. The update must be made before the Invoice is finalized. Learn more about [Invoice’s status transitions and finalization](https://docs.stripe.com/invoicing/integration/workflow-transitions.md#finalized).

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d application_fee_amount=1000
```

See [Percent fees and flat fees](https://docs.stripe.com/connect/subscriptions.md#percent-fees-and-flat-fees) to learn more about application fees.

1. **Option 3:** Create a [transfer reversal](https://docs.stripe.com/api/transfer_reversals.md)

For the Transfer Reversal API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be reversed from the connected account to your platform equivalent to the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Subscription [latest Invoice](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-latest_invoice) object.

Obtain the [transfer ID](https://docs.stripe.com/api/charges/object.md#charge_object-transfer) from the Charge object. If you don’t know the charge ID, you can retrieve the Subscription, [expand](https://docs.stripe.com/expand.md#multiple-properties) the [latest invoice](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-latest_invoice) and get the [charge ID](https://docs.stripe.com/api/invoices/object.md#invoice_object-charge) from the Invoice object.

```curl
curl https://api.stripe.com/v1/transfers/{{TRANSFER_ID}}/reversals \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000
```

To automatically create a Transfer Reversal when the Subscription Invoice is paid, create a *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) to be notified of [invoice.payment_succeeded](https://docs.stripe.com/api/events/types.md#event_types-invoice.payment_succeeded) events.

This option is best suited for transactions that don’t require currency exchange.

See [Reverse transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md#reverse-transfers) for more information.

#### Separate charges and transfers

For the Transfer API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be transferred to the connected account excluding the [total tax amount](https://docs.stripe.com/api/invoices/object.md#invoice_object-total_tax_amounts-amount) present in the Subscription [latest Invoice](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-latest_invoice) object.

To obtain the charge ID, you can retrieve the Subscription, [expand](https://docs.stripe.com/expand.md#multiple-properties) the [latest invoice](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-latest_invoice) and get the [charge ID](https://docs.stripe.com/api/invoices/object.md#invoice_object-charge) from the Invoice object.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

See [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

### PaymentIntents with the Stripe Tax API

#### Direct charges

We don’t recommend this charge type because the connected account controls refunds. The connected account needs to be aware of the tax withholding strategy to refund the correct amount to you and their users.

#### Destination charges

1. **Option 1:** Use `transfer_data[amount]`

When you create a PaymentIntent, include [transfer_data[amount]](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-transfer_data-amount) with the value to be transferred to the connected account excluding either the total [tax amount exclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_exclusive) or [tax amount inclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_inclusive) present in the Tax Calculation object.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=10000 \
  -d currency=usd \
  -d "transfer_data[destination]={{CONNECTEDACCOUNT_ID}}" \
  -d "transfer_data[amount]=1000"
```

1. **Option 2:** Use `application_fee_amount`

When you create a PaymentIntent, include the [application_fee_amount](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-application_fee_amount) with the value to be held by your platform including either the total [tax amount exclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_exclusive) or the [tax amount inclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_inclusive) present in the Tax Calculation object.

```curl
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=10000 \
  -d currency=usd \
  -d application_fee_amount=1000
```

1. **Option 3:** Create [transfer reversal](https://docs.stripe.com/api/transfer_reversals.md)

For the Transfer Reversal API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be reversed from the connected account to your platform equivalent to either the total [tax amount exclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_exclusive) or the [tax amount inclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_inclusive) present in the Tax Calculation object.

Obtain the [transfer ID](https://docs.stripe.com/api/charges/object.md#charge_object-transfer) from the [expanded](https://docs.stripe.com/expand.md#multiple-properties) [latest charge](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-latest_charge) present in the PaymentIntent object.

```curl
curl https://api.stripe.com/v1/transfers/{{TRANSFER_ID}}/reversals \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000
```

To automatically create a Transfer Reversal when the PaymentIntent succeeds, create a *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) to be notified of [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md#event_types-payment_intent.succeeded) events.

This option is best suited for transactions that don’t require currency exchange.

See [Reverse transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md#reverse-transfers) for more information.

#### Separate charges and transfers

For the Transfer API call, include the [amount](https://docs.stripe.com/api/transfers/create.md#create_transfer-amount) with the value to be transferred to the connected account excluding either the total [tax amount exclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_exclusive) or the [tax amount inclusive](https://docs.stripe.com/api/tax/calculations/object.md#tax_calculation_object-tax_amount_inclusive) present in the Tax Calculation object.

You can obtain the [charge ID](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-latest_charge) from the PaymentIntent object.

```curl
curl https://api.stripe.com/v1/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1000 \
  -d currency=usd \
  -d "source_transaction={{CHARGE_ID}}" \
  -d "destination={{CONNECTEDACCOUNT_ID}}"
```

See [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

## Access Stripe Tax Reports

### Use the Stripe Dashboard

You can use [Stripe Tax reports](https://docs.stripe.com/tax/reports.md) to help you correctly file and remit tax. The platform account can access the Stripe Tax reports using the [Tax Reporting](https://docs.stripe.com/tax/reports.md#how-to-access-data-using-exports-and-reports) functionality in the Stripe Dashboard.

### Use the Stripe API

Platforms can also download the [itemized tax transactions](https://docs.stripe.com/tax/reports.md#itemized-exports) that they’re liable for using the [Report API](https://docs.stripe.com/reports/api.md) with the [tax.transactions.itemized.2](https://docs.stripe.com/reports/report-types/tax.md) report type.

When a platform runs the following command, they download all 2022 transactions that they have sales tax liability for:

```curl
curl https://api.stripe.com/v1/reporting/report_runs \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "report_type=tax.transactions.itemized.2" \
  -d "parameters[interval_start]=1641013200" \
  -d "parameters[interval_end]=1672549200"
```

## See also

- [Calculate tax in your custom checkout flow](https://docs.stripe.com/tax/standalone-tax-api.md)
