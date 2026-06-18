# Create a Checkout Session

Creates a Checkout Session object.

## Prerequisites

Before you can run the following code snippet, you need to call these APIs with the provided parameters to set up the prerequisite API object(s).

- 1. createPrice
POST /v1/prices {"currency":"usd","unit_amount":1000,"recurring":{"interval":"month"},"product_data":{"name":"Gold Plan"}}

## Request

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>" \
  --data-urlencode "success_url=https://example.com/success" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=2" \
  -d mode=payment
```

### Response

```json
{
  "id": "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
  "object": "checkout.session",
  "after_expiration": null,
  "allow_promotion_codes": null,
  "amount_subtotal": 2198,
  "amount_total": 2198,
  "automatic_tax": {
    "enabled": false,
    "liability": null,
    "status": null
  },
  "billing_address_collection": null,
  "cancel_url": null,
  "client_reference_id": null,
  "consent": null,
  "consent_collection": null,
  "created": 1679600215,
  "currency": "usd",
  "custom_fields": [],
  "custom_text": {
    "shipping_address": null,
    "submit": null
  },
  "customer": null,
  "customer_creation": "if_required",
  "customer_details": null,
  "customer_email": null,
  "expires_at": 1679686615,
  "invoice": null,
  "invoice_creation": {
    "enabled": false,
    "invoice_data": {
      "account_tax_ids": null,
      "custom_fields": null,
      "description": null,
      "footer": null,
      "issuer": null,
      "metadata": {},
      "rendering_options": null
    }
  },
  "livemode": false,
  "locale": null,
  "metadata": {},
  "mode": "payment",
  "payment_intent": null,
  "payment_link": null,
  "payment_method_collection": "always",
  "payment_method_options": {},
  "payment_method_types": [
    "card"
  ],
  "payment_status": "unpaid",
  "phone_number_collection": {
    "enabled": false
  },
  "recovered_from": null,
  "setup_intent": null,
  "shipping_address_collection": null,
  "shipping_cost": null,
  "shipping_details": null,
  "shipping_options": [],
  "status": "open",
  "submit_type": null,
  "subscription": null,
  "success_url": "https://example.com/success",
  "total_details": {
    "amount_discount": 0,
    "amount_shipping": 0,
    "amount_tax": 0
  },
  "url": "https://checkout.stripe.com/c/pay/cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u#fidkdWxOYHwnPyd1blpxYHZxWjA0SDdPUW5JbmFMck1wMmx9N2BLZjFEfGRUNWhqTmJ%2FM2F8bUA2SDRySkFdUV81T1BSV0YxcWJcTUJcYW5rSzN3dzBLPUE0TzRKTTxzNFBjPWZEX1NKSkxpNTVjRjN8VHE0YicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
}
```

## Returns

Returns a Checkout Session object.

## Parameters

- `adaptive_pricing` (object, optional)
  Settings for price localization with [Adaptive Pricing](https://docs.stripe.com/payments/checkout/adaptive-pricing.md).

  - `adaptive_pricing.enabled` (boolean, optional)
    If set to `true`, Adaptive Pricing is available on [eligible sessions](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing.md?payment-ui=stripe-hosted#restrictions). Defaults to your [dashboard setting](https://dashboard.stripe.com/settings/adaptive-pricing).

- `after_expiration` (object, optional)
  Configure actions after a Checkout Session has expired. You can’t set this parameter if `ui_mode` is `elements`.

  - `after_expiration.recovery` (object, optional)
    Configure a Checkout Session that can be used to recover an expired session.

    - `after_expiration.recovery.enabled` (boolean, required)
      If `true`, a recovery URL will be generated to recover this Checkout Session if it expires before a successful transaction is completed. It will be attached to the Checkout Session object upon expiration.

    - `after_expiration.recovery.allow_promotion_codes` (boolean, optional)
      Enables user redeemable promotion codes on the recovered Checkout Sessions. Defaults to `false`

- `allow_promotion_codes` (boolean, optional)
  Enables user redeemable promotion codes.

- `automatic_tax` (object, optional)
  Settings for automatic tax lookup for this session and resulting payments, invoices, and subscriptions.

  - `automatic_tax.enabled` (boolean, required)
    Set to `true` to [calculate tax automatically](https://docs.stripe.com/tax.md) using the customer’s location.

    Enabling this parameter causes Checkout to collect any billing address information necessary for tax calculation.

  - `automatic_tax.liability` (object, optional)
    The account that’s liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.

    - `automatic_tax.liability.type` (enum, required)
      Type of the account referenced in the request.
Possible enum values:
      - `account`
        Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

      - `self`
        Indicates that the account being referenced is the account making the API request.

    - `automatic_tax.liability.account` (string, required only if type is account)
      The connected account being referenced when `type` is `account`.

- `billing_address_collection` (enum, optional)
  Specify whether Checkout should collect the customer’s billing address. Defaults to `auto`.
Possible enum values:
  - `auto`
    Checkout will only collect the billing address when necessary. When using [automatic_tax](https://docs.stripe.com/docs/api/checkout/sessions/object.md#checkout_session_object-automatic_tax-enabled), Checkout will collect the minimum number of fields required for tax calculation.

  - `required`
    Checkout will always collect the customer’s billing address.

- `branding_settings` (object, optional)
  The branding settings for the Checkout Session. This parameter is not allowed if ui_mode is `elements`.

  - `branding_settings.background_color` (string, optional)
    A hex color value starting with `#` representing the background color for the Checkout Session.

  - `branding_settings.border_style` (enum, optional)
    The border style for the Checkout Session.
Possible enum values:
    - `pill`
      Uses pill-shaped corners on the Checkout Session.

    - `rectangular`
      Uses rectangular corners on the Checkout Session.

    - `rounded`
      Uses rounded corners on the Checkout Session.

  - `branding_settings.button_color` (string, optional)
    A hex color value starting with `#` representing the button color for the Checkout Session.

  - `branding_settings.display_name` (string, optional)
    A string to override the business name shown on the Checkout Session. This only shows at the top of the Checkout page, and your business name still appears in terms, receipts, and other places.

  - `branding_settings.font_family` (enum, optional)
    The font family for the Checkout Session corresponding to one of the [supported font families](https://docs.stripe.com/payments/checkout/customization/appearance.md?payment-ui=stripe-hosted#font-compatibility).
Possible enum values:
    - `be_vietnam_pro`
      The `Be Vietnam Pro` font family.

    - `bitter`
      The `Bitter` font family.

    - `chakra_petch`
      The `Chakra Petch` font family.

    - `default`
      The `default` font family.

    - `hahmlet`
      The `Hahmlet` font family.

    - `inconsolata`
      The `Inconsolata` font family.

    - `inter`
      The `Inter` font family.

    - `lato`
      The `Lato` font family.

    - `lora`
      The `Lora` font family.

    - `m_plus_1_code`
      The `M PLUS 1 Code` font family.

    - `montserrat`
      The `Montserrat` font family.

    - `noto_sans`
      The `Noto Sans` font family.

    - `noto_sans_jp`
      The `Noto Sans JP` font family.

    - `noto_serif`
      The `Noto Serif` font family.

    - `nunito`
      The `Nunito` font family.

    - `open_sans`
      The `Open Sans` font family.

    - `pridi`
      The `Pridi` font family.

    - `pt_sans`
      The `PT Sans` font family.

    - `pt_serif`
      The `PT Serif` font family.

    - `raleway`
      The `Raleway` font family.

    - `roboto`
      The `Roboto` font family.

    - `roboto_slab`
      The `Roboto Slab` font family.

    - `source_sans_pro`
      The `Source Sans Pro` font family.

    - `titillium_web`
      The `Titillium Web` font family.

    - `ubuntu_mono`
      The `Ubuntu Mono` font family.

    - `zen_maru_gothic`
      The `Zen Maru Gothic` font family.

  - `branding_settings.icon` (object, optional)
    The icon for the Checkout Session. For best results, use a square image.

    - `branding_settings.icon.type` (enum, required)
      The type of image for the icon. Must be one of `file` or `url`.

    - `branding_settings.icon.file` (string, optional)
      The ID of a [File upload](https://stripe.com/docs/api/files) representing the icon. Purpose must be `business_icon`. Required if `type` is `file` and disallowed otherwise.

    - `branding_settings.icon.url` (string, optional)
      The URL of the image. Required if `type` is `url` and disallowed otherwise.

  - `branding_settings.logo` (object, optional)
    The logo for the Checkout Session.

    - `branding_settings.logo.type` (enum, required)
      The type of image for the logo. Must be one of `file` or `url`.

    - `branding_settings.logo.file` (string, optional)
      The ID of a [File upload](https://stripe.com/docs/api/files) representing the logo. Purpose must be `business_logo`. Required if `type` is `file` and disallowed otherwise.

    - `branding_settings.logo.url` (string, optional)
      The URL of the image. Required if `type` is `url` and disallowed otherwise.

- `cancel_url` (string, optional)
  If set, Checkout displays a back button and customers will be directed to this URL if they decide to cancel payment and return to your website. This parameter is not allowed if ui_mode is `embedded_page` or `elements`.

- `client_reference_id` (string, optional)
  A unique string to reference the Checkout Session. This can be a customer ID, a cart ID, or similar, and can be used to reconcile the session with your internal systems.

  The maximum length is 200 characters.

- `consent_collection` (object, optional)
  Configure fields for the Checkout Session to gather active consent from customers.

  - `consent_collection.payment_method_reuse_agreement` (object, optional)
    Determines the display of payment method reuse agreement text in the UI. If set to `hidden`, it will hide legal text related to the reuse of a payment method.

    - `consent_collection.payment_method_reuse_agreement.position` (enum, required)
      Determines the position and visibility of the payment method reuse agreement in the UI. When set to `auto`, Stripe’s defaults will be used. When set to `hidden`, the payment method reuse agreement text will always be hidden in the UI.
Possible enum values:
      - `auto`
        Uses Stripe defaults to determine the visibility and position of the payment method reuse agreement.

      - `hidden`
        Hides the payment method reuse agreement.

  - `consent_collection.promotions` (enum, optional)
    If set to `auto`, enables the collection of customer consent for promotional communications. The Checkout Session will determine whether to display an option to opt into promotional communication from the merchant depending on the customer’s locale. Only available to US merchants and US customers.
Possible enum values:
    - `auto`
      Enable the collection of customer consent for promotional communications. The Checkout Session will determine whether to display an option to opt into promotional communication from the merchant depending on if a customer is provided, and if that customer has consented to receiving promotional communications from the merchant in the past.

    - `none`
      Checkout will not collect customer consent for promotional communications.

  - `consent_collection.terms_of_service` (enum, optional)
    If set to `required`, it requires customers to check a terms of service checkbox before being able to pay. There must be a valid terms of service URL set in your [Dashboard settings](https://dashboard.stripe.com/settings/public).
Possible enum values:
    - `none`
      Does not display checkbox for the terms of service agreement.

    - `required`
      Displays a checkbox for the terms of service agreement which requires customer to check before being able to pay.

- `currency` (enum, required conditionally)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). Required in `setup` mode when `payment_method_types` is not set.

- `custom_fields` (array of objects, optional)
  Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can’t set this parameter if `ui_mode` is `custom`.

  - `custom_fields.key` (string, required)
    String of your choice that your integration can use to reconcile this field. Must be unique to this field, alphanumeric, and up to 200 characters.

    The maximum length is 200 characters.

  - `custom_fields.label` (object, required)
    The label for the field, displayed to the customer.

    - `custom_fields.label.custom` (string, required)
      Custom text for the label, displayed to the customer. Up to 50 characters.

      The maximum length is 50 characters.

    - `custom_fields.label.type` (enum, required)
      The type of the label.
Possible enum values:
      - `custom`
        Set a custom label for the field.

  - `custom_fields.type` (enum, required)
    The type of the field.
Possible enum values:
    - `dropdown`
      Provide a list of options for your customer to select.

    - `numeric`
      Collect a numbers-only field from your customer.

    - `text`
      Collect a string field from your customer.

  - `custom_fields.dropdown` (object, optional)
    Configuration for `type=dropdown` fields.

    - `custom_fields.dropdown.options` (array of objects, required)
      The options available for the customer to select. Up to 200 options allowed.

      - `custom_fields.dropdown.options.label` (string, required)
        The label for the option, displayed to the customer. Up to 100 characters.

        The maximum length is 100 characters.

      - `custom_fields.dropdown.options.value` (string, required)
        The value for this option, not displayed to the customer, used by your integration to reconcile the option selected by the customer. Must be unique to this option, alphanumeric, and up to 100 characters.

        The maximum length is 100 characters.

    - `custom_fields.dropdown.default_value` (string, optional)
      The value that pre-fills the field on the payment page.Must match a `value` in the `options` array.

      The maximum length is 100 characters.

  - `custom_fields.numeric` (object, optional)
    Configuration for `type=numeric` fields.

    - `custom_fields.numeric.default_value` (string, optional)
      The value that pre-fills the field on the payment page.

      The maximum length is 255 characters.

    - `custom_fields.numeric.maximum_length` (integer, optional)
      The maximum character length constraint for the customer’s input.

    - `custom_fields.numeric.minimum_length` (integer, optional)
      The minimum character length requirement for the customer’s input.

  - `custom_fields.optional` (boolean, optional)
    Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.

  - `custom_fields.text` (object, optional)
    Configuration for `type=text` fields.

    - `custom_fields.text.default_value` (string, optional)
      The value that pre-fills the field on the payment page.

      The maximum length is 255 characters.

    - `custom_fields.text.maximum_length` (integer, optional)
      The maximum character length constraint for the customer’s input.

    - `custom_fields.text.minimum_length` (integer, optional)
      The minimum character length requirement for the customer’s input.

- `custom_text` (object, optional)
  Display additional text for your customers using custom text. You can’t set this parameter if `ui_mode` is `custom`.

  - `custom_text.after_submit` (object, optional)
    Custom text that should be displayed after the payment confirmation button.

    - `custom_text.after_submit.message` (string, required)
      Text can be up to 1200 characters in length.

  - `custom_text.shipping_address` (object, optional)
    Custom text that should be displayed alongside shipping address collection.

    - `custom_text.shipping_address.message` (string, required)
      Text can be up to 1200 characters in length.

  - `custom_text.submit` (object, optional)
    Custom text that should be displayed alongside the payment confirmation button.

    - `custom_text.submit.message` (string, required)
      Text can be up to 1200 characters in length.

  - `custom_text.terms_of_service_acceptance` (object, optional)
    Custom text that should be displayed in place of the default terms of service agreement text.

    - `custom_text.terms_of_service_acceptance.message` (string, required)
      Text can be up to 1200 characters in length.

- `customer` (string, optional)
  ID of an existing Customer, if one exists. In `payment` mode, the customer’s most recently saved card payment method will be used to prefill the email, name, card details, and billing address on the Checkout page. In `subscription` mode, the customer’s [default payment method](https://docs.stripe.com/docs/api/customers/update.md#update_customer-invoice_settings-default_payment_method) will be used if it’s a card, otherwise the most recently saved card will be used. A valid billing address, billing name and billing email are required on the payment method for Checkout to prefill the customer’s card details.

  If the Customer already has a valid [email](https://docs.stripe.com/docs/api/customers/object.md#customer_object-email) set, the email will be prefilled and not editable in Checkout. If the Customer does not have a valid `email`, Checkout will set the email entered during the session on the Customer.

  If blank for Checkout Sessions in `subscription` mode or with `customer_creation` set as `always` in `payment` mode, Checkout will create a new Customer object based on information provided during the payment flow.

  You can set [`payment_intent_data.setup_future_usage`](https://docs.stripe.com/docs/api/checkout/sessions/create.md#create_checkout_session-payment_intent_data-setup_future_usage) to have Checkout automatically attach the payment method to the Customer you pass in for future reuse.

- `customer_account` (string, optional)
  ID of an existing Account, if one exists. Has the same behavior as `customer`.

- `customer_creation` (enum, optional)
  Configure whether a Checkout Session creates a [Customer](https://docs.stripe.com/docs/api/customers.md) during Session confirmation.

  When a Customer is not created, you can still retrieve email, address, and other customer data entered in Checkout with [customer_details](https://docs.stripe.com/docs/api/checkout/sessions/object.md#checkout_session_object-customer_details).

  Sessions that don’t create Customers instead are grouped by [guest customers](https://docs.stripe.com/docs/payments/checkout/guest-customers.md) in the Dashboard. Promotion codes limited to first time customers will return invalid for these Sessions.

  Can only be set in `payment` and `setup` mode.
Possible enum values:
  - `always`
    The Checkout Session will always create a [Customer](https://docs.stripe.com/docs/api/customers.md) when a Session confirmation is attempted.

  - `if_required`
    The Checkout Session will only create a [Customer](https://docs.stripe.com/docs/api/customers.md) if it is required for Session confirmation. Currently, only `subscription` mode Sessions and `payment` mode Sessions with [post-purchase invoices enabled](https://docs.stripe.com/docs/receipts.md?payment-ui=checkout#paid-invoices) require a Customer.

- `customer_email` (string, optional)
  If provided, this value will be used when the Customer object is created. If not provided, customers will be asked to enter their email address. Use this parameter to prefill customer data if you already have an email on file. To access information about the customer once a session is complete, use the `customer` field.

  The maximum length is 800 characters.

- `customer_update` (object, optional)
  Controls what fields on Customer can be updated by the Checkout Session. Can only be provided when `customer` is provided.

  - `customer_update.address` (enum, optional)
    Describes whether Checkout saves the billing address onto `customer.address`. To always collect a full billing address, use `billing_address_collection`. Defaults to `never`.
Possible enum values:
    - `auto`
      Checkout will automatically determine whether to update the provided Customer object using details from the session.

    - `never`
      Checkout will never update the provided Customer object.

  - `customer_update.name` (enum, optional)
    Describes whether Checkout saves the name onto `customer.name`. Defaults to `never`.
Possible enum values:
    - `auto`
      Checkout will automatically determine whether to update the provided Customer object using details from the session.

    - `never`
      Checkout will never update the provided Customer object.

  - `customer_update.shipping` (enum, optional)
    Describes whether Checkout saves shipping information onto `customer.shipping`. To collect shipping information, use `shipping_address_collection`. Defaults to `never`.
Possible enum values:
    - `auto`
      Checkout will automatically determine whether to update the provided Customer object using details from the session.

    - `never`
      Checkout will never update the provided Customer object.

- `discounts` (array of objects, optional)
  The coupon or promotion code to apply to this Session. Currently, only up to one may be specified.

  - `discounts.coupon` (string, optional)
    The ID of the coupon to apply to this Session.

  - `discounts.promotion_code` (string, optional)
    The ID of a promotion code to apply to this Session.

- `excluded_payment_method_types` (array of enums, optional)
  A list of the types of payment methods (e.g., `card`) that should be excluded from this Checkout Session. This should only be used when payment methods for this Checkout Session are managed through the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods).

- `expires_at` (timestamp, optional)
  The Epoch time in seconds at which the Checkout Session will expire. It can be anywhere from 30 minutes to 24 hours after Checkout Session creation. By default, this value is 24 hours from creation.

- `integration_identifier` (string, optional)
  The integration identifier for this Checkout Session. Multiple Checkout Sessions can have the same integration identifier.

  The maximum length is 200 characters.

- `invoice_creation` (object, optional)
  Generate a post-purchase Invoice for one-time payments.

  - `invoice_creation.enabled` (boolean, required)
    Set to `true` to enable invoice creation.

  - `invoice_creation.invoice_data` (object, optional)
    Parameters passed when creating invoices for payment-mode Checkout Sessions.

    - `invoice_creation.invoice_data.account_tax_ids` (array of strings, optional)
      The account tax IDs associated with the invoice.

    - `invoice_creation.invoice_data.custom_fields` (array of objects, optional)
      Default custom fields to be displayed on invoices for this customer.

      - `invoice_creation.invoice_data.custom_fields.name` (string, required)
        The name of the custom field. This may be up to 40 characters.

        The maximum length is 40 characters.

      - `invoice_creation.invoice_data.custom_fields.value` (string, required)
        The value of the custom field. This may be up to 140 characters.

        The maximum length is 140 characters.

    - `invoice_creation.invoice_data.description` (string, optional)
      An arbitrary string attached to the object. Often useful for displaying to users.

    - `invoice_creation.invoice_data.footer` (string, optional)
      Default footer to be displayed on invoices for this customer.

    - `invoice_creation.invoice_data.issuer` (object, optional)
      The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

      - `invoice_creation.invoice_data.issuer.type` (enum, required)
        Type of the account referenced in the request.
Possible enum values:
        - `account`
          Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

        - `self`
          Indicates that the account being referenced is the account making the API request.

      - `invoice_creation.invoice_data.issuer.account` (string, required only if type is account)
        The connected account being referenced when `type` is `account`.

    - `invoice_creation.invoice_data.metadata` (object, optional)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

    - `invoice_creation.invoice_data.rendering_options` (object, optional)
      Default options for invoice PDF rendering for this customer.

      - `invoice_creation.invoice_data.rendering_options.amount_tax_display` (enum, optional)
        How line-item prices and amounts will be displayed with respect to tax on invoice PDFs. One of `exclude_tax` or `include_inclusive_tax`. `include_inclusive_tax` will include inclusive tax (and exclude exclusive tax) in invoice PDF amounts. `exclude_tax` will exclude all tax (inclusive and exclusive alike) from invoice PDF amounts.
Possible enum values:
        - `exclude_tax`
        - `include_inclusive_tax`

      - `invoice_creation.invoice_data.rendering_options.template` (string, optional)
        ID of the invoice rendering template to use for this invoice.

- `line_items` (array of objects, required conditionally)
  A list of items the customer is purchasing. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/docs/api/prices.md). The parameter is required for `payment` and `subscription` mode.

  For `payment` mode, there is a maximum of 100 line items, however it is recommended to consolidate line items if there are more than a few dozen.

  For `subscription` mode, there is a maximum of 20 line items with recurring Prices and 20 line items with one-time Prices. Line items with one-time Prices will be on the initial invoice only.

  - `line_items.adjustable_quantity` (object, optional)
    When set, provides configuration for this item’s quantity to be adjusted by the customer during Checkout.

    - `line_items.adjustable_quantity.enabled` (boolean, required)
      Set to true if the quantity can be adjusted to any non-negative integer.

    - `line_items.adjustable_quantity.maximum` (integer, optional)
      The maximum quantity the customer can purchase for the Checkout Session. By default this value is 99. You can specify a value up to 999999.

    - `line_items.adjustable_quantity.minimum` (integer, optional)
      The minimum quantity the customer must purchase for the Checkout Session. By default this value is 0.

  - `line_items.dynamic_tax_rates` (array of strings, optional)
    The [tax rates](https://docs.stripe.com/docs/api/tax_rates.md) that will be applied to this line item depending on the customer’s billing/shipping address. We currently support the following countries: US, GB, AU, and all countries in the EU. You can’t set this parameter if `ui_mode` is `custom`.

  - `line_items.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

  - `line_items.price` (string, required conditionally)
    The ID of the [Price](https://docs.stripe.com/docs/api/prices.md) or [Plan](https://docs.stripe.com/docs/api/plans.md) object. One of `price` or `price_data` is required.

  - `line_items.price_data` (object, required conditionally)
    Data used to generate a new [Price](https://docs.stripe.com/docs/api/prices.md) object inline. One of `price` or `price_data` is required.

    - `line_items.price_data.currency` (enum, required)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

    - `line_items.price_data.product` (string, required conditionally)
      The ID of the [Product](https://docs.stripe.com/api/products.md) that this [Price](https://docs.stripe.com/api/prices.md) will belong to. One of `product` or `product_data` is required.

    - `line_items.price_data.product_data` (object, required conditionally)
      Data used to generate a new [Product](https://docs.stripe.com/api/products.md) object inline. One of `product` or `product_data` is required.

      - `line_items.price_data.product_data.name` (string, required)
        The product’s name, meant to be displayable to the customer.

      - `line_items.price_data.product_data.description` (string, optional)
        The product’s description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.

      - `line_items.price_data.product_data.images` (array of strings, optional)
        A list of up to 8 URLs of images for this product, meant to be displayable to the customer.

      - `line_items.price_data.product_data.metadata` (object, optional)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

      - `line_items.price_data.product_data.tax_code` (string, recommended if calculating taxes)
        A [tax code](https://docs.stripe.com/docs/tax/tax-categories.md) ID.

      - `line_items.price_data.product_data.tax_details` (object, recommended if calculating taxes)
        Tax details for this product, including the [tax code](https://docs.stripe.com/tax/tax-codes.md) and an optional performance location.

        - `line_items.price_data.product_data.tax_details.performance_location` (string, optional)
          A tax location ID. Depending on the [tax code](https://docs.stripe.com/tax/tax-for-tickets/reference/tax-location-performance.md), this is required, optional, or not supported.

        - `line_items.price_data.product_data.tax_details.tax_code` (string, optional)
          A [tax code](https://docs.stripe.com/docs/tax/tax-categories.md) ID.

      - `line_items.price_data.product_data.unit_label` (string, optional)
        A label that represents units of this product. When set, this will be included in customers’ receipts, invoices, Checkout, and the customer portal.

        The maximum length is 12 characters.

    - `line_items.price_data.recurring` (object, optional)
      The recurring components of a price such as `interval` and `interval_count`.

      - `line_items.price_data.recurring.interval` (enum, required)
        Specifies billing frequency. Either `day`, `week`, `month` or `year`.
Possible enum values:
        - `day`
        - `month`
        - `week`
        - `year`

      - `line_items.price_data.recurring.interval_count` (integer, optional)
        The number of intervals between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of three years interval allowed (3 years, 36 months, or 156 weeks).

    - `line_items.price_data.tax_behavior` (enum, recommended if calculating taxes)
      Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
      - `exclusive`
      - `inclusive`
      - `unspecified`

    - `line_items.price_data.unit_amount` (integer, required conditionally)
      A non-negative integer in the smallest currency unit representing how much to charge. One of `unit_amount` or `unit_amount_decimal` is required.

    - `line_items.price_data.unit_amount_decimal` (string, required conditionally)
      Same as `unit_amount`, but accepts a decimal value in the smallest currency unit with at most 12 decimal places. Only one of `unit_amount` and `unit_amount_decimal` can be set.

  - `line_items.quantity` (integer, required conditionally)
    The quantity of the line item being purchased. Quantity should not be defined when `recurring.usage_type=metered`.

  - `line_items.tax_rates` (array of strings, optional)
    The [tax rates](https://docs.stripe.com/docs/api/tax_rates.md) which apply to this line item.

- `locale` (enum, optional)
  The IETF language tag of the locale Checkout is displayed in. If blank or `auto`, the browser’s locale is used.
Possible enum values:
  - `auto`
  - `bg`
  - `cs`
  - `da`
  - `de`
  - `el`
  - `en`
  - `en-GB`
  - `es`
  - `es-419`
  - `et`
  - `fi`
  - `fil`
  - `fr`
  - `fr-CA`
  - `hr`
  - `hu`
  - `id`
  - `it`
  - `ja`
  - `ko`
  - `lt`
  - `lv`
  - `ms`
  - `mt`
  - `nb`
  - `nl`
  - `pl`
  - `pt`
  - `pt-BR`
  - `ro`
  - `ru`
  - `sk`
  - `sl`
  - `sv`
  - `th`
  - `tr`
  - `vi`
  - `zh`
  - `zh-HK`
  - `zh-TW`

- `managed_payments` (object, optional)
  Settings for Managed Payments for this Checkout Session and resulting [PaymentIntents](https://docs.stripe.com/api/payment_intents/object.md), [Invoices](https://docs.stripe.com/api/invoices/object.md), and [Subscriptions](https://docs.stripe.com/api/subscriptions/object.md).

  - `managed_payments.enabled` (boolean, optional)
    Set to `true` to enable [Managed Payments](https://docs.stripe.com/payments/managed-payments.md), Stripe’s merchant of record solution, for this session.

- `metadata` (object, optional)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

- `mode` (enum, required)
  The mode of the Checkout Session. Pass `subscription` if the Checkout Session includes at least one recurring item.
Possible enum values:
  - `payment`
    Accept one-time payments for cards, iDEAL, and more.

  - `setup`
    Save payment details to charge your customers later.

  - `subscription`
    Use Stripe Billing to set up fixed-price subscriptions.

- `name_collection` (object, optional)
  Controls name collection settings for the session.

  You can configure Checkout to collect your customers’ business names, individual names, or both. Each name field can be either required or optional.

  If a [Customer](https://docs.stripe.com/docs/api/customers.md) is created or provided, the names can be saved to the Customer object as well.

  - `name_collection.business` (object, optional)
    Controls settings applied for collecting the customer’s business name on the session.

    - `name_collection.business.enabled` (boolean, required)
      Enable business name collection on the Checkout Session. Defaults to `false`.

    - `name_collection.business.optional` (boolean, optional)
      Whether the customer is required to provide a business name before completing the Checkout Session. Defaults to `false`.

  - `name_collection.individual` (object, optional)
    Controls settings applied for collecting the customer’s individual name on the session.

    - `name_collection.individual.enabled` (boolean, required)
      Enable individual name collection on the Checkout Session. Defaults to `false`.

    - `name_collection.individual.optional` (boolean, optional)
      Whether the customer is required to provide their name before completing the Checkout Session. Defaults to `false`.

- `optional_items` (array of objects, optional)
  A list of optional items the customer can add to their order at checkout. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/docs/api/prices.md).

  There is a maximum of 10 optional items allowed on a Checkout Session, and the existing limits on the number of line items allowed on a Checkout Session apply to the combined number of line items and optional items.

  For `payment` mode, there is a maximum of 100 combined line items and optional items, however it is recommended to consolidate items if there are more than a few dozen.

  For `subscription` mode, there is a maximum of 20 line items and optional items with recurring Prices and 20 line items and optional items with one-time Prices.

  You can’t set this parameter if `ui_mode` is `custom`.

  - `optional_items.price` (string, required)
    The ID of the [Price](https://docs.stripe.com/docs/api/prices.md) or [Plan](https://docs.stripe.com/docs/api/plans.md) object.

  - `optional_items.quantity` (integer, required)
    The initial quantity of the line item created when a customer chooses to add this optional item to their order.

  - `optional_items.adjustable_quantity` (object, optional)
    When set, provides configuration for the customer to adjust the quantity of the line item created when a customer chooses to add this optional item to their order.

    - `optional_items.adjustable_quantity.enabled` (boolean, required)
      Set to true if the quantity can be adjusted to any non-negative integer.

    - `optional_items.adjustable_quantity.maximum` (integer, optional)
      The maximum quantity of this item the customer can purchase. By default this value is 99. You can specify a value up to 999999.

    - `optional_items.adjustable_quantity.minimum` (integer, optional)
      The minimum quantity of this item the customer must purchase, if they choose to purchase it. Because this item is optional, the customer will always be able to remove it from their order, even if the `minimum` configured here is greater than 0. By default this value is 0.

- `origin_context` (enum, optional)
  Where the user is coming from. This informs the optimizations that are applied to the session. You can’t set this parameter if `ui_mode` is `elements`.
Possible enum values:
  - `mobile_app`
    The Checkout Session originates from a mobile app that redirects customers to a Stripe-hosted payment page for an in-app purchase.

  - `web`
    The Checkout Session originates from a web page.

- `payment_intent_data` (object, optional)
  A subset of parameters to be passed to PaymentIntent creation for Checkout Sessions in `payment` mode.

  - `payment_intent_data.application_fee_amount` (integer, optional)
    The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account. The amount of the application fee collected will be capped at the total amount captured. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

  - `payment_intent_data.capture_method` (enum, optional)
    Controls when the funds will be captured from the customer’s account.
Possible enum values:
    - `automatic`
      Stripe automatically captures funds when the customer authorizes the payment.

    - `automatic_async`
      (Default) Stripe asynchronously captures funds when the customer authorizes the payment. Recommended over `capture_method=automatic` due to improved latency. Read the [integration guide](https://docs.stripe.com/docs/payments/payment-intents/asynchronous-capture.md) for more information.

    - `manual`
      Place a hold on the funds when the customer authorizes the payment, but [don’t capture the funds until later](https://docs.stripe.com/docs/payments/capture-later.md). (Not all payment methods support this.)

  - `payment_intent_data.description` (string, optional)
    An arbitrary string attached to the object. Often useful for displaying to users.

  - `payment_intent_data.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

  - `payment_intent_data.on_behalf_of` (string, optional)
    The Stripe account ID for which these funds are intended. For details, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

  - `payment_intent_data.receipt_email` (string, optional)
    Email address that the receipt for the resulting payment will be sent to. If `receipt_email` is specified for a payment in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails).

  - `payment_intent_data.setup_future_usage` (enum, optional)
    Indicates that you intend to [make future payments](https://docs.stripe.com/docs/payments/payment-intents.md#future-usage) with the payment method collected by this Checkout Session.

    When setting this to `on_session`, Checkout will show a notice to the customer that their payment details will be saved.

    When setting this to `off_session`, Checkout will show a notice to the customer that their payment details will be saved and used for future payments.

    If a Customer has been provided or Checkout creates a new Customer, Checkout will attach the payment method to the Customer.

    If Checkout does not create a Customer, the payment method is not attached to a Customer. To reuse the payment method, you can retrieve it from the Checkout Session’s PaymentIntent.

    When processing card payments, Checkout also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as SCA.
Possible enum values:
    - `off_session`
      Use `off_session` if your customer may or may not be present in your checkout flow.

    - `on_session`
      Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_intent_data.shipping` (object, optional)
    Shipping information for this payment.

    - `payment_intent_data.shipping.address` (object, required)
      Shipping address.

      - `payment_intent_data.shipping.address.line1` (string, required)
        Address line 1, such as the street, PO Box, or company name.

      - `payment_intent_data.shipping.address.city` (string, optional)
        City, district, suburb, town, or village.

      - `payment_intent_data.shipping.address.country` (string, optional)
        Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

      - `payment_intent_data.shipping.address.line2` (string, optional)
        Address line 2, such as the apartment, suite, unit, or building.

      - `payment_intent_data.shipping.address.postal_code` (string, optional)
        ZIP or postal code.

      - `payment_intent_data.shipping.address.state` (string, optional)
        State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

    - `payment_intent_data.shipping.name` (string, required)
      Recipient name.

    - `payment_intent_data.shipping.carrier` (string, optional)
      The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.

    - `payment_intent_data.shipping.phone` (string, optional)
      Recipient phone (including extension).

    - `payment_intent_data.shipping.tracking_number` (string, optional)
      The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.

  - `payment_intent_data.statement_descriptor` (string, optional)
    Text that appears on the customer’s statement as the statement descriptor for a non-card charge. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors.md).

    Setting this value for a card charge returns an error. For card charges, set the [statement_descriptor_suffix](https://docs.stripe.com/get-started/account/statement-descriptors.md#dynamic) instead.

  - `payment_intent_data.statement_descriptor_suffix` (string, optional)
    Provides information about a card charge. Concatenated to the account’s [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors.md#static) to form the complete statement descriptor that appears on the customer’s statement.

  - `payment_intent_data.transfer_data` (object, optional)
    The parameters used to automatically create a Transfer when the payment succeeds. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/payments/connected-accounts.md).

    - `payment_intent_data.transfer_data.destination` (string, required)
      If specified, successful charges will be attributed to the destination account for tax reporting, and the funds from charges will be transferred to the destination account. The ID of the resulting transfer will be returned on the successful charge’s `transfer` field.

    - `payment_intent_data.transfer_data.amount` (integer, optional)
      The amount that will be transferred automatically when a charge succeeds.

  - `payment_intent_data.transfer_group` (string, optional)
    A string that identifies the resulting payment as part of a group. See the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/connect/separate-charges-and-transfers.md) for details.

- `payment_method_collection` (enum, optional)
  Specify whether Checkout should collect a payment method. When set to `if_required`, Checkout will not collect a payment method when the total due for the session is 0. This may occur if the Checkout Session includes a free trial or a discount.

  Can only be set in `subscription` mode. Defaults to `always`.

  If you’d like information on how to collect a payment method outside of Checkout, read the guide on configuring [subscriptions with a free trial](https://docs.stripe.com/docs/payments/checkout/free-trials.md).
Possible enum values:
  - `always`
    The Checkout Session will always collect a PaymentMethod.

  - `if_required`
    The Checkout Session will only collect a PaymentMethod if there is an amount due.

- `payment_method_configuration` (string, optional)
  The ID of the payment method configuration to use with this Checkout session.

  The maximum length is 100 characters.

- `payment_method_data` (object, optional)
  This parameter allows you to set some attributes on the payment method created during a Checkout session.

  - `payment_method_data.allow_redisplay` (enum, optional)
    Allow redisplay will be set on the payment method on confirmation and indicates whether this payment method can be shown again to the customer in a checkout flow. Only set this field if you wish to override the allow_redisplay value determined by Checkout.
Possible enum values:
    - `always`
      Use `always` to indicate that this payment method can always be shown to a customer in a checkout flow.

    - `limited`
      Use `limited` to indicate that this payment method can’t always be shown to a customer in a checkout flow. For example, it can only be shown in the context of a specific subscription.

    - `unspecified`
      This is the default value for payment methods where `allow_redisplay` wasn’t set.

- `payment_method_options` (object, optional)
  Payment-method-specific configuration.

  - `payment_method_options.acss_debit` (object, optional)
    contains details about the ACSS Debit payment method options. You can’t set this parameter if `ui_mode` is `elements`.

    - `payment_method_options.acss_debit.currency` (enum, optional)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). This is only accepted for Checkout Sessions in `setup` mode.
Possible enum values:
      - `cad`
        Canadian dollars

      - `usd`
        US dollars

    - `payment_method_options.acss_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.acss_debit.mandate_options.custom_mandate_url` (string, optional)
        A URL for custom mandate text to render during confirmation step. The URL will be rendered with additional GET parameters `payment_intent` and `payment_intent_client_secret` when confirming a Payment Intent, or `setup_intent` and `setup_intent_client_secret` when confirming a Setup Intent.

      - `payment_method_options.acss_debit.mandate_options.default_for` (array of enums, optional)
        List of Stripe products where this mandate can be selected automatically. Only usable in `setup` mode.
Possible enum values:
        - `invoice`
          Enables payments for Stripe Invoices. ‘subscription’ must also be provided.

        - `subscription`
          Enables payments for Stripe Subscriptions. ‘invoice’ must also be provided.

      - `payment_method_options.acss_debit.mandate_options.interval_description` (string, optional)
        Description of the mandate interval. Only required if ‘payment_schedule’ parameter is ‘interval’ or ‘combined’.

        The maximum length is 500 characters.

      - `payment_method_options.acss_debit.mandate_options.payment_schedule` (enum, optional)
        Payment schedule for the mandate.
Possible enum values:
        - `combined`
          Payments can be initiated at a pre-defined interval or sporadically

        - `interval`
          Payments are initiated at a regular pre-defined interval

        - `sporadic`
          Payments are initiated sporadically

      - `payment_method_options.acss_debit.mandate_options.transaction_type` (enum, optional)
        Transaction type of the mandate.
Possible enum values:
        - `business`
          Transactions are made for business reasons

        - `personal`
          Transactions are made for personal reasons

    - `payment_method_options.acss_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.acss_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.acss_debit.verification_method` (enum, optional)
      Verification method for the intent
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification.

      - `microdeposits`
        Verification using microdeposits.

  - `payment_method_options.affirm` (object, optional)
    contains details about the Affirm payment method options.

    - `payment_method_options.affirm.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.affirm.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.afterpay_clearpay` (object, optional)
    contains details about the Afterpay Clearpay payment method options.

    - `payment_method_options.afterpay_clearpay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.afterpay_clearpay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.alipay` (object, optional)
    contains details about the Alipay payment method options.

    - `payment_method_options.alipay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.alma` (object, optional)
    contains details about the Alma payment method options.

    - `payment_method_options.alma.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.amazon_pay` (object, optional)
    contains details about the AmazonPay payment method options.

    - `payment_method_options.amazon_pay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.amazon_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.au_becs_debit` (object, optional)
    contains details about the AU Becs Debit payment method options.

    - `payment_method_options.au_becs_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

    - `payment_method_options.au_becs_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bacs_debit` (object, optional)
    contains details about the Bacs Debit payment method options.

    - `payment_method_options.bacs_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.bacs_debit.mandate_options.reference_prefix` (string, optional)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘DDIC’ or ‘STRIPE’.

        The maximum length is 12 characters.

    - `payment_method_options.bacs_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.bacs_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.bancontact` (object, optional)
    contains details about the Bancontact payment method options.

    - `payment_method_options.bancontact.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.billie` (object, optional)
    contains details about the Billie payment method options.

    - `payment_method_options.billie.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.boleto` (object, optional)
    contains details about the Boleto payment method options.

    - `payment_method_options.boleto.expires_after_days` (integer, optional)
      The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto invoice will expire on Wednesday at 23:59 America/Sao_Paulo time.

    - `payment_method_options.boleto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.card` (object, optional)
    contains details about the Card payment method options.

    - `payment_method_options.card.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.card.installments` (object, optional)
      Installment options for card payments

      - `payment_method_options.card.installments.enabled` (boolean, optional)
        Setting to true enables installments for this Checkout Session. Setting to false will prevent any installment plan from applying to a payment.

    - `payment_method_options.card.request_extended_authorization` (enum, optional)
      Request ability to [capture beyond the standard authorization validity window](https://docs.stripe.com/payments/extended-authorization.md) for this CheckoutSession.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to extend the capture window when eligible for extended authorization.

      - `never`
        Use `never` if you don’t want to extend the capture window.

    - `payment_method_options.card.request_incremental_authorization` (enum, optional)
      Request ability to [increment the authorization](https://docs.stripe.com/payments/incremental-authorization.md) for this CheckoutSession.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to increment the authorization on the PaymentIntent when eligible.

      - `never`
        Use `never` if you don’t want to increment the authorization on the PaymentIntent.

    - `payment_method_options.card.request_multicapture` (enum, optional)
      Request ability to make [multiple captures](https://docs.stripe.com/payments/multicapture.md) for this CheckoutSession.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to use multicapture when eligible.

      - `never`
        Use `never` if you don’t want to use multicapture.

    - `payment_method_options.card.request_overcapture` (enum, optional)
      Request ability to [overcapture](https://docs.stripe.com/payments/overcapture.md) for this CheckoutSession.
Possible enum values:
      - `if_available`
        Use `if_available` if you want to overcapture the payment when eligible.

      - `never`
        Use `never` if you don’t want to overcapture the payment.

    - `payment_method_options.card.request_three_d_secure` (enum, optional)
      We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/docs/strong-customer-authentication.md). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. If not provided, this value defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/docs/payments/3d-secure/authentication-flow.md#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
Possible enum values:
      - `any`
        Use `any` to manually request 3DS with a preference for a `frictionless` flow, increasing the likelihood of the authentication being completed without any additional input from the customer. 3DS will always be attempted if it is supported for the card, but Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

      - `automatic`
        (Default) Our SCA Engine automatically prompts your customers for authentication based on risk level and other requirements.

      - `challenge`
        Use `challenge` to request 3DS with a preference for a `challenge` flow, where the customer must respond to a prompt for active authentication. Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

    - `payment_method_options.card.restrictions` (object, optional)
      Restrictions to apply to the card payment method. For example, you can block specific card brands. You can’t set this parameter if `ui_mode` is `custom`.

      - `payment_method_options.card.restrictions.brands_blocked` (array of enums, optional)
        The card brands to block. If a customer enters or selects a card belonging to a blocked brand, they can’t complete the payment.
Possible enum values:
        - `american_express`
          Include `american_express` to block American Express cards.

        - `discover_global_network`
          Include `discover_global_network` to block all cards within the Discover Global Network. This encompasses the following card brands:

          - Discover
          - Diners Club
          - JCB
          - UnionPay
          - Elo

        - `mastercard`
          Include `mastercard` to block Mastercard cards.

        - `visa`
          Include `visa` to block Visa cards.

    - `payment_method_options.card.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.card.statement_descriptor_suffix_kana` (string, optional)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kana prefix (shortened Kana descriptor) or Kana statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 22 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 22 characters.

    - `payment_method_options.card.statement_descriptor_suffix_kanji` (string, optional)
      Provides information about a card payment that customers see on their statements. Concatenated with the Kanji prefix (shortened Kanji descriptor) or Kanji statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 17 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 17 characters.

  - `payment_method_options.cashapp` (object, optional)
    contains details about the Cashapp Pay payment method options.

    - `payment_method_options.cashapp.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.cashapp.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_method_options.crypto` (object, optional)
    contains details about the Crypto payment method options.

    - `payment_method_options.crypto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.customer_balance` (object, optional)
    contains details about the Customer Balance payment method options.

    - `payment_method_options.customer_balance.bank_transfer` (object, optional)
      Configuration for the bank transfer funding type, if the `funding_type` is set to `bank_transfer`.

      - `payment_method_options.customer_balance.bank_transfer.type` (enum, required)
        The list of bank transfer types that this PaymentIntent is allowed to use for funding.
Possible enum values:
        - `eu_bank_transfer`
          eu_bank_transfer bank transfer type

        - `gb_bank_transfer`
          gb_bank_transfer bank transfer type

        - `jp_bank_transfer`
          jp_bank_transfer bank transfer type

        - `mx_bank_transfer`
          mx_bank_transfer bank transfer type

        - `us_bank_transfer`
          us_bank_transfer bank transfer type

      - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer` (object, optional)
        Configuration for eu_bank_transfer funding type.

        - `payment_method_options.customer_balance.bank_transfer.eu_bank_transfer.country` (string, required)
          The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.

      - `payment_method_options.customer_balance.bank_transfer.requested_address_types` (array of enums, optional)
        List of address types that should be returned in the financial_addresses response. If not specified, all valid types will be returned.

        Permitted values include: `sort_code`, `zengin`, `iban`, or `spei`.
Possible enum values:
        - `aba`
          aba bank account address type

        - `iban`
          iban bank account address type

        - `sepa`
          sepa bank account address type

        - `sort_code`
          sort_code bank account address type

        - `spei`
          spei bank account address type

        - `swift`
          swift bank account address type

        - `zengin`
          zengin bank account address type

    - `payment_method_options.customer_balance.funding_type` (enum, optional)
      The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
Possible enum values:
      - `bank_transfer`

    - `payment_method_options.customer_balance.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.demo_pay` (object, optional)
    contains details about the DemoPay payment method options.

    - `payment_method_options.demo_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.eps` (object, optional)
    contains details about the EPS payment method options.

    - `payment_method_options.eps.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.fpx` (object, optional)
    contains details about the FPX payment method options.

    - `payment_method_options.fpx.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.giropay` (object, optional)
    contains details about the Giropay payment method options.

    - `payment_method_options.giropay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.grabpay` (object, optional)
    contains details about the Grabpay payment method options.

    - `payment_method_options.grabpay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.ideal` (object, optional)
    contains details about the Ideal payment method options.

    - `payment_method_options.ideal.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.kakao_pay` (object, optional)
    contains details about the Kakao Pay payment method options.

    - `payment_method_options.kakao_pay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kakao_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.klarna` (object, optional)
    contains details about the Klarna payment method options.

    - `payment_method_options.klarna.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.klarna.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

    - `payment_method_options.klarna.subscriptions` (array of objects, optional)
      Subscription details if the Checkout Session sets up a future subscription.

      - `payment_method_options.klarna.subscriptions.interval` (enum, required)
        Unit of time between subscription charges.

      - `payment_method_options.klarna.subscriptions.next_billing` (object, required)
        Describes the upcoming charge for this subscription.

        - `payment_method_options.klarna.subscriptions.next_billing.amount` (integer, required)
          The amount of the next charge for the subscription.

        - `payment_method_options.klarna.subscriptions.next_billing.date` (string, required)
          The date of the next charge for the subscription in YYYY-MM-DD format.

      - `payment_method_options.klarna.subscriptions.reference` (string, required)
        A non-customer-facing reference to correlate subscription charges in the Klarna app. Use a value that persists across subscription charges.

        The maximum length is 255 characters.

      - `payment_method_options.klarna.subscriptions.interval_count` (integer, optional)
        The number of intervals (specified  in the `interval` attribute) between subscription  charges. For example, `interval=month` and `interval_count=3` charges every 3 months.

      - `payment_method_options.klarna.subscriptions.name` (string, optional)
        Name for subscription.

        The maximum length is 255 characters.

  - `payment_method_options.konbini` (object, optional)
    contains details about the Konbini payment method options.

    - `payment_method_options.konbini.expires_after_days` (integer, optional)
      The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST. Defaults to 3 days.

    - `payment_method_options.konbini.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.kr_card` (object, optional)
    contains details about the Korean card payment method options.

    - `payment_method_options.kr_card.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.kr_card.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.link` (object, optional)
    contains details about the Link payment method options (Link is also known as Onelink in the UK).

    - `payment_method_options.link.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.link.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.mobilepay` (object, optional)
    contains details about the Mobilepay payment method options.

    - `payment_method_options.mobilepay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.mobilepay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.multibanco` (object, optional)
    contains details about the Multibanco payment method options.

    - `payment_method_options.multibanco.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.naver_pay` (object, optional)
    contains details about the Naver Pay payment method options.

    - `payment_method_options.naver_pay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.naver_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.oxxo` (object, optional)
    contains details about the OXXO payment method options.

    - `payment_method_options.oxxo.expires_after_days` (integer, optional)
      The number of calendar days before an OXXO voucher expires. For example, if you create an OXXO voucher on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.

    - `payment_method_options.oxxo.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.p24` (object, optional)
    contains details about the P24 payment method options.

    - `payment_method_options.p24.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

    - `payment_method_options.p24.tos_shown_and_accepted` (boolean, optional)
      Confirm that the payer has accepted the P24 terms and conditions.

  - `payment_method_options.pay_by_bank` (object, optional)
    contains details about the Pay By Bank payment method options.

  - `payment_method_options.payco` (object, optional)
    contains details about the PAYCO payment method options.

    - `payment_method_options.payco.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.paynow` (object, optional)
    contains details about the PayNow payment method options.

    - `payment_method_options.paynow.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.paypal` (object, optional)
    contains details about the PayPal payment method options.

    - `payment_method_options.paypal.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.paypal.preferred_locale` (enum, optional)
      [Preferred locale](https://docs.stripe.com/docs/payments/paypal/supported-locales.md) of the PayPal checkout page that the customer is redirected to.
Possible enum values:
      - `cs-CZ`
        Czech - The Czech Republic

      - `da-DK`
        Danish - Denmark

      - `de-AT`
        German - Austria

      - `de-DE`
        German - Germany

      - `de-LU`
        German - Luxembourg

      - `el-GR`
        Greek - Greece

      - `en-GB`
        English - United Kingdom

      - `en-US`
        English - United States of America

      - `es-ES`
        Spanish - Spain

      - `fi-FI`
        Finnish - Finland

      - `fr-BE`
        French - Belgium

      - `fr-FR`
        French - France

      - `fr-LU`
        French - Luxembourg

      - `hu-HU`
        Hungarian - Hungary

      - `it-IT`
        Italian - Italy

      - `nl-BE`
        Dutch - Belgium

      - `nl-NL`
        Dutch - Netherlands

      - `pl-PL`
        Polish - Poland

      - `pt-PT`
        Portuguese - Portugal

      - `sk-SK`
        Slovak - Slovakia

      - `sv-SE`
        Swedish - Sweden

    - `payment_method_options.paypal.reference` (string, optional)
      A reference of the PayPal transaction visible to customer which is mapped to PayPal’s invoice ID. This must be a globally unique ID if you have configured in your PayPal settings to block multiple payments per invoice ID.

      The maximum length is 127 characters.

    - `payment_method_options.paypal.risk_correlation_id` (string, optional)
      The risk correlation ID for an on-session payment using a saved PayPal payment method.

      The maximum length is 32 characters.

    - `payment_method_options.paypal.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).

      If you’ve already set `setup_future_usage` and you’re performing a request using a publishable key, you can only update the value from `on_session` to `off_session`.
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.payto` (object, optional)
    contains details about the PayTo payment method options.

    - `payment_method_options.payto.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.payto.mandate_options.amount` (integer, optional)
        Amount that will be collected. It is required when `amount_type` is `fixed`.

      - `payment_method_options.payto.mandate_options.amount_type` (enum, optional)
        The type of amount that will be collected. The amount charged must be exact or up to the value of `amount` param for `fixed` or `maximum` type respectively. Defaults to `maximum`.
Possible enum values:
        - `fixed`
          The amount is the exact amount that will be charged.

        - `maximum`
          The amount is the maximum amount that can be charged.

      - `payment_method_options.payto.mandate_options.end_date` (string, optional)
        Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults to no end date.

      - `payment_method_options.payto.mandate_options.payment_schedule` (enum, optional)
        The periodicity at which payments will be collected. Defaults to `adhoc`.
Possible enum values:
        - `adhoc`
          Payments will be made ad hoc

        - `annual`
          Payments will be made annually

        - `daily`
          Payments will be made daily

        - `fortnightly`
          Payments will be made fortnightly

        - `monthly`
          Payments will be made monthly

        - `quarterly`
          Payments will be made quarterly

        - `semi_annual`
          Payments will be made semi-annually

        - `weekly`
          Payments will be made weekly

      - `payment_method_options.payto.mandate_options.payments_per_period` (integer, optional)
        The number of payments that will be made during a payment period. Defaults to 1 except for when `payment_schedule` is `adhoc`. In that case, it defaults to no limit.

      - `payment_method_options.payto.mandate_options.purpose` (enum, optional)
        The purpose for which payments are made. Has a default value based on your merchant category code.
Possible enum values:
        - `dependant_support`
          Transactions are made for dependant support reasons

        - `government`
          Transactions are made for government reasons

        - `loan`
          Transactions are made for loan reasons

        - `mortgage`
          Transactions are made for mortgage reasons

        - `other`
          Transactions are made for other reasons

        - `pension`
          Transactions are made for pension reasons

        - `personal`
          Transactions are made for personal reasons

        - `retail`
          Transactions are made for retail reasons

        - `salary`
          Transactions are made for salary reasons

        - `tax`
          Transactions are made for tax reasons

        - `utility`
          Transactions are made for utility reasons

      - `payment_method_options.payto.mandate_options.start_date` (string, optional)
        Date, in YYYY-MM-DD format, from which payments will be collected. Defaults to confirmation time.

    - `payment_method_options.payto.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.pix` (object, optional)
    contains details about the Pix payment method options.

    - `payment_method_options.pix.amount_includes_iof` (enum, optional)
      Determines if the amount includes the IOF tax. Defaults to `never`.
Possible enum values:
      - `always`
        The IOF tax is included in the amount.

      - `never`
        The IOF tax is not included in the amount.

    - `payment_method_options.pix.expires_after_seconds` (integer, optional)
      The number of seconds (between 10 and 1209600) after which Pix payment will expire. Defaults to 86400 seconds.

    - `payment_method_options.pix.mandate_options` (object, optional)
      Additional fields for mandate creation.

      - `payment_method_options.pix.mandate_options.amount` (integer, optional)
        Amount to be charged for future payments. Required when `amount_type=fixed`. If not provided for `amount_type=maximum`, defaults to 40000.

      - `payment_method_options.pix.mandate_options.amount_includes_iof` (enum, optional)
        Determines if the amount includes the IOF tax. Defaults to `never`.
Possible enum values:
        - `always`
          The IOF tax is included in the amount.

        - `never`
          The IOF tax is not included in the amount.

      - `payment_method_options.pix.mandate_options.amount_type` (enum, optional)
        Type of amount. Defaults to `maximum`.
Possible enum values:
        - `fixed`
          The exact amount for future payments.

        - `maximum`
          The maximum amount for future payments.

      - `payment_method_options.pix.mandate_options.currency` (enum, optional)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Only `brl` is supported currently.

      - `payment_method_options.pix.mandate_options.end_date` (string, optional)
        Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.

      - `payment_method_options.pix.mandate_options.payment_schedule` (enum, optional)
        Schedule at which the future payments will be charged. Defaults to `monthly`.
Possible enum values:
        - `halfyearly`
          The future payments will be charged half-yearly.

        - `monthly`
          The future payments will be charged monthly.

        - `quarterly`
          The future payments will be charged quarterly.

        - `weekly`
          The future payments will be charged weekly.

        - `yearly`
          The future payments will be charged yearly.

      - `payment_method_options.pix.mandate_options.reference` (string, optional)
        Subscription name displayed to buyers in their bank app. Defaults to the displayable business name.

        The maximum length is 35 characters.

      - `payment_method_options.pix.mandate_options.start_date` (string, optional)
        Start date of the mandate, in `YYYY-MM-DD`. Start date should be at least 3 days in the future. Defaults to 3 days after the current date.

    - `payment_method_options.pix.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.revolut_pay` (object, optional)
    contains details about the RevolutPay payment method options.

    - `payment_method_options.revolut_pay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

    - `payment_method_options.revolut_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.samsung_pay` (object, optional)
    contains details about the Samsung Pay payment method options.

    - `payment_method_options.samsung_pay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.satispay` (object, optional)
    contains details about the Satispay payment method options.

    - `payment_method_options.satispay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.scalapay` (object, optional)
    contains details about the Scalapay payment method options.

    - `payment_method_options.scalapay.capture_method` (enum, optional)
      Controls when the funds will be captured from the customer’s account.
Possible enum values:
      - `manual`
        Use `manual` if you intend to place the funds on hold and want to override the top-level `capture_method` value for this payment method.

  - `payment_method_options.sepa_debit` (object, optional)
    contains details about the Sepa Debit payment method options.

    - `payment_method_options.sepa_debit.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.sepa_debit.mandate_options.reference_prefix` (string, optional)
        Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: ‘/’, ‘_’, ‘-’, ‘&’, ‘.’. Cannot begin with ‘STRIPE’.

        The maximum length is 12 characters.

    - `payment_method_options.sepa_debit.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.sepa_debit.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

  - `payment_method_options.sofort` (object, optional)
    contains details about the Sofort payment method options.

    - `payment_method_options.sofort.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

  - `payment_method_options.swish` (object, optional)
    contains details about the Swish payment method options.

    - `payment_method_options.swish.reference` (string, optional)
      The order reference that will be displayed to customers in the Swish application. Defaults to the `id` of the Payment Intent.

  - `payment_method_options.twint` (object, optional)
    contains details about the TWINT payment method options.

    - `payment_method_options.twint.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

  - `payment_method_options.upi` (object, optional)
    contains details about the UPI payment method options.

    - `payment_method_options.upi.mandate_options` (object, optional)
      Additional fields for Mandate creation

      - `payment_method_options.upi.mandate_options.amount` (integer, optional)
        Amount to be charged for future payments.

      - `payment_method_options.upi.mandate_options.amount_type` (enum, optional)
        One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
        - `fixed`
          If `fixed`, the `amount` param refers to the exact amount to be charged in future payments.

        - `maximum`
          If `maximum`, the amount charged can be up to the value passed for the `amount` param.

      - `payment_method_options.upi.mandate_options.description` (string, optional)
        A description of the mandate or subscription that is meant to be displayed to the customer.

        The maximum length is 20 characters.

      - `payment_method_options.upi.mandate_options.end_date` (timestamp, optional)
        End date of the mandate or subscription.

  - `payment_method_options.us_bank_account` (object, optional)
    contains details about the Us Bank Account payment method options.

    - `payment_method_options.us_bank_account.financial_connections` (object, optional)
      Additional fields for Financial Connections Session creation

      - `payment_method_options.us_bank_account.financial_connections.permissions` (array of strings, optional)
        The list of permissions to request. If this parameter is passed, the `payment_method` permission must be included. Valid permissions include: `balances`, `ownership`, `payment_method`, and `transactions`.

      - `payment_method_options.us_bank_account.financial_connections.prefetch` (array of enums, optional)
        List of data features that you would like to retrieve upon account creation.
Possible enum values:
        - `balances`
          Requests to prefetch balance data on accounts collected in this session.

        - `ownership`
          Requests to prefetch ownership data on accounts collected in this session.

        - `transactions`
          Requests to prefetch transaction data on accounts collected in this session.

    - `payment_method_options.us_bank_account.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

      - `off_session`
        Use `off_session` if your customer may or may not be present in your checkout flow.

      - `on_session`
        Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

    - `payment_method_options.us_bank_account.target_date` (string, optional)
      Controls when Stripe will attempt to debit the funds from the customer’s account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.

    - `payment_method_options.us_bank_account.verification_method` (enum, optional)
      Verification method for the intent
Possible enum values:
      - `automatic`
        Instant verification with fallback to microdeposits.

      - `instant`
        Instant verification only.

  - `payment_method_options.wechat_pay` (object, optional)
    contains details about the WeChat Pay payment method options.

    - `payment_method_options.wechat_pay.client` (enum, required)
      The client type that the end customer will pay from
Possible enum values:
      - `android`
        The end customer will pay from an Android app

      - `ios`
        The end customer will pay from an iOS app

      - `web`
        The end customer will pay from web browser

    - `payment_method_options.wechat_pay.app_id` (string, optional)
      The app ID registered with WeChat Pay. Only required when client is ios or android.

    - `payment_method_options.wechat_pay.setup_future_usage` (enum, optional)
      Indicates that you intend to make future payments with this PaymentIntent’s payment method.

      If you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](https://docs.stripe.com/payments/save-during-payment.md) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don’t provide a Customer, you can still [attach](https://docs.stripe.com/api/payment_methods/attach.md) the payment method to a Customer after the transaction completes.

      If the payment method is `card_present` and isn’t a digital wallet, Stripe creates and attaches a [generated_card](https://docs.stripe.com/api/charges/object.md#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.

      When processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](https://docs.stripe.com/strong-customer-authentication.md).
Possible enum values:
      - `none`
        Use `none` if you do not intend to reuse this payment method and want to override the top-level `setup_future_usage` value for this payment method.

- `payment_method_types` (array of enums, optional)
  A list of the types of payment methods (e.g., `card`) this Checkout Session can accept.

  You can omit this attribute to manage your payment methods from the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods). See [Dynamic Payment Methods](https://docs.stripe.com/docs/payments/payment-methods/integration-options.md#using-dynamic-payment-methods) for more details.

  Read more about the supported payment methods and their requirements in our [payment method details guide](https://docs.stripe.com/docs/payments/checkout/payment-methods.md).

  If multiple payment methods are passed, Checkout will dynamically reorder them to prioritize the most relevant payment methods based on the customer’s location and other characteristics.

- `permissions` (object, optional)
  This property is used to set up permissions for various actions (e.g., update) on the CheckoutSession object. Can only be set when creating `embedded` or `custom` sessions.

  For specific permissions, please refer to their dedicated subsections, such as `permissions.update_shipping_details`.

  - `permissions.update_shipping_details` (enum, optional)
    Determines which entity is allowed to update the shipping details.

    Default is `client_only`. Stripe Checkout client will automatically update the shipping details. If set to `server_only`, only your server is allowed to update the shipping details.

    When set to `server_only`, you must add the onShippingDetailsChange event handler when initializing the Stripe Checkout client and manually update the shipping details from your server using the Stripe API.
Possible enum values:
    - `client_only`
      The field of the CheckoutSession can only be updated by the client via the publishable key.

    - `server_only`
      The field of the CheckoutSession can only be updated by the server via the secret key.

- `phone_number_collection` (object, optional)
  Controls phone number collection settings for the session.

  We recommend that you review your privacy policy and check with your legal contacts before using this feature. Learn more about [collecting phone numbers with Checkout](https://docs.stripe.com/docs/payments/checkout/phone-numbers.md).

  - `phone_number_collection.enabled` (boolean, required)
    Set to `true` to enable phone number collection.

    Can only be set in `payment` and `subscription` mode.

- `redirect_on_completion` (enum, optional)
  This parameter applies to `ui_mode: embedded_page`. Learn more about the [redirect behavior](https://docs.stripe.com/docs/payments/checkout/custom-success-page.md?payment-ui=embedded-form) of embedded sessions. Defaults to `always`.
Possible enum values:
  - `always`
    The Session will always redirect to the `return_url` after successful confirmation.

  - `if_required`
    The Session will only redirect to the `return_url` after a redirect-based payment method is used.

  - `never`
    The Session will never redirect to the `return_url`, and redirect-based payment methods will be disabled.

- `return_url` (string, required conditionally)
  The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method’s app or site. This parameter is required if `ui_mode` is `embedded_page` or `elements` and redirect-based payment methods are enabled on the session.

- `saved_payment_method_options` (object, optional)
  Controls saved payment method settings for the session. Only available in `payment` and `subscription` mode.

  - `saved_payment_method_options.allow_redisplay_filters` (array of enums, optional)
    Uses the `allow_redisplay` value of each saved payment method to filter the set presented to a returning customer. By default, only saved payment methods with ’allow_redisplay: ‘always’ are shown in Checkout.
Possible enum values:
    - `always`
      Use `always` to indicate that this payment method can always be shown to a customer in a checkout flow.

    - `limited`
      Use `limited` to indicate that this payment method can’t always be shown to a customer in a checkout flow. For example, it can only be shown in the context of a specific subscription.

    - `unspecified`
      This is the default value for payment methods where `allow_redisplay` wasn’t set.

  - `saved_payment_method_options.payment_method_remove` (enum, optional)
    Enable customers to choose if they wish to remove their saved payment methods. Disabled by default.
Possible enum values:
    - `disabled`
      Removing payment methods will be disabled for this Checkout Session. This is the default option.

    - `enabled`
      Removing payment methods will be enabled for this Checkout Session.

  - `saved_payment_method_options.payment_method_save` (enum, optional)
    Enable customers to choose if they wish to save their payment method for future use. Disabled by default.
Possible enum values:
    - `disabled`
      Saving payment methods will be disabled for this Checkout Session. This is the default option.

    - `enabled`
      Saving payment methods will be enabled for this Checkout Session.

- `setup_intent_data` (object, optional)
  A subset of parameters to be passed to SetupIntent creation for Checkout Sessions in `setup` mode.

  - `setup_intent_data.description` (string, optional)
    An arbitrary string attached to the object. Often useful for displaying to users.

  - `setup_intent_data.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

  - `setup_intent_data.on_behalf_of` (string, optional)
    The Stripe account for which the setup is intended.

- `shipping_address_collection` (object, optional)
  When set, provides configuration for Checkout to collect a shipping address from a customer.

  - `shipping_address_collection.allowed_countries` (array of enums, required)
    An array of two-letter ISO country codes representing which countries Checkout should provide as options for shipping locations.
Possible enum values:
    - `AC`
    - `AD`
    - `AE`
    - `AF`
    - `AG`
    - `AI`
    - `AL`
    - `AM`
    - `AO`
    - `AQ`
    - `AR`
    - `AT`
    - `AU`
    - `AW`
    - `AX`
    - `AZ`
    - `BA`
    - `BB`
    - `BD`
    - `BE`
    - `BF`
    - `BG`
    - `BH`
    - `BI`
    - `BJ`
    - `BL`
    - `BM`
    - `BN`
    - `BO`
    - `BQ`
    - `BR`
    - `BS`
    - `BT`
    - `BV`
    - `BW`
    - `BY`
    - `BZ`
    - `CA`
    - `CD`
    - `CF`
    - `CG`
    - `CH`
    - `CI`
    - `CK`
    - `CL`
    - `CM`
    - `CN`
    - `CO`
    - `CR`
    - `CV`
    - `CW`
    - `CY`
    - `CZ`
    - `DE`
    - `DJ`
    - `DK`
    - `DM`
    - `DO`
    - `DZ`
    - `EC`
    - `EE`
    - `EG`
    - `EH`
    - `ER`
    - `ES`
    - `ET`
    - `FI`
    - `FJ`
    - `FK`
    - `FO`
    - `FR`
    - `GA`
    - `GB`
    - `GD`
    - `GE`
    - `GF`
    - `GG`
    - `GH`
    - `GI`
    - `GL`
    - `GM`
    - `GN`
    - `GP`
    - `GQ`
    - `GR`
    - `GS`
    - `GT`
    - `GU`
    - `GW`
    - `GY`
    - `HK`
    - `HN`
    - `HR`
    - `HT`
    - `HU`
    - `ID`
    - `IE`
    - `IL`
    - `IM`
    - `IN`
    - `IO`
    - `IQ`
    - `IS`
    - `IT`
    - `JE`
    - `JM`
    - `JO`
    - `JP`
    - `KE`
    - `KG`
    - `KH`
    - `KI`
    - `KM`
    - `KN`
    - `KR`
    - `KW`
    - `KY`
    - `KZ`
    - `LA`
    - `LB`
    - `LC`
    - `LI`
    - `LK`
    - `LR`
    - `LS`
    - `LT`
    - `LU`
    - `LV`
    - `LY`
    - `MA`
    - `MC`
    - `MD`
    - `ME`
    - `MF`
    - `MG`
    - `MK`
    - `ML`
    - `MM`
    - `MN`
    - `MO`
    - `MQ`
    - `MR`
    - `MS`
    - `MT`
    - `MU`
    - `MV`
    - `MW`
    - `MX`
    - `MY`
    - `MZ`
    - `NA`
    - `NC`
    - `NE`
    - `NG`
    - `NI`
    - `NL`
    - `NO`
    - `NP`
    - `NR`
    - `NU`
    - `NZ`
    - `OM`
    - `PA`
    - `PE`
    - `PF`
    - `PG`
    - `PH`
    - `PK`
    - `PL`
    - `PM`
    - `PN`
    - `PR`
    - `PS`
    - `PT`
    - `PY`
    - `QA`
    - `RE`
    - `RO`
    - `RS`
    - `RU`
    - `RW`
    - `SA`
    - `SB`
    - `SC`
    - `SD`
    - `SE`
    - `SG`
    - `SH`
    - `SI`
    - `SJ`
    - `SK`
    - `SL`
    - `SM`
    - `SN`
    - `SO`
    - `SR`
    - `SS`
    - `ST`
    - `SV`
    - `SX`
    - `SZ`
    - `TA`
    - `TC`
    - `TD`
    - `TF`
    - `TG`
    - `TH`
    - `TJ`
    - `TK`
    - `TL`
    - `TM`
    - `TN`
    - `TO`
    - `TR`
    - `TT`
    - `TV`
    - `TW`
    - `TZ`
    - `UA`
    - `UG`
    - `US`
    - `UY`
    - `UZ`
    - `VA`
    - `VC`
    - `VE`
    - `VG`
    - `VN`
    - `VU`
    - `WF`
    - `WS`
    - `XK`
    - `YE`
    - `YT`
    - `ZA`
    - `ZM`
    - `ZW`
    - `ZZ`

- `shipping_options` (array of objects, optional)
  The shipping rate options to apply to this Session. Up to a maximum of 5.

  - `shipping_options.shipping_rate` (string, required unless shipping_rate_data is provided)
    The ID of the Shipping Rate to use for this shipping option.

  - `shipping_options.shipping_rate_data` (object, required unless shipping_rate is provided)
    Parameters to be passed to Shipping Rate creation for this shipping option.

    - `shipping_options.shipping_rate_data.display_name` (string, required)
      The name of the shipping rate, meant to be displayable to the customer. This will appear on CheckoutSessions.

      The maximum length is 100 characters.

    - `shipping_options.shipping_rate_data.delivery_estimate` (object, optional)
      The estimated range for how long shipping will take, meant to be displayable to the customer. This will appear on CheckoutSessions.

      - `shipping_options.shipping_rate_data.delivery_estimate.maximum` (object, optional)
        The upper bound of the estimated range. If empty, represents no upper bound i.e., infinite.

        - `shipping_options.shipping_rate_data.delivery_estimate.maximum.unit` (enum, required)
          A unit of time.
Possible enum values:
          - `business_day`
            The delivery estimate is in business days.

          - `day`
            The delivery estimate is in days.

          - `hour`
            The delivery estimate is in hours.

          - `month`
            The delivery estimate is in months.

          - `week`
            The delivery estimate is in weeks.

        - `shipping_options.shipping_rate_data.delivery_estimate.maximum.value` (integer, required)
          Must be greater than 0.

      - `shipping_options.shipping_rate_data.delivery_estimate.minimum` (object, optional)
        The lower bound of the estimated range. If empty, represents no lower bound.

        - `shipping_options.shipping_rate_data.delivery_estimate.minimum.unit` (enum, required)
          A unit of time.
Possible enum values:
          - `business_day`
            The delivery estimate is in business days.

          - `day`
            The delivery estimate is in days.

          - `hour`
            The delivery estimate is in hours.

          - `month`
            The delivery estimate is in months.

          - `week`
            The delivery estimate is in weeks.

        - `shipping_options.shipping_rate_data.delivery_estimate.minimum.value` (integer, required)
          Must be greater than 0.

    - `shipping_options.shipping_rate_data.fixed_amount` (object, optional)
      Describes a fixed amount to charge for shipping. Must be present if type is `fixed_amount`.

      - `shipping_options.shipping_rate_data.fixed_amount.amount` (integer, required)
        A non-negative integer in cents representing how much to charge.

      - `shipping_options.shipping_rate_data.fixed_amount.currency` (enum, required)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

      - `shipping_options.shipping_rate_data.fixed_amount.currency_options` (object, optional)
        Shipping rates defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).

        - `shipping_options.shipping_rate_data.fixed_amount.currency_options.<currency>.amount` (integer, required)
          A non-negative integer in cents representing how much to charge.

        - `shipping_options.shipping_rate_data.fixed_amount.currency_options.<currency>.tax_behavior` (enum, recommended if calculating taxes)
          Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.
Possible enum values:
          - `exclusive`
          - `inclusive`
          - `unspecified`

    - `shipping_options.shipping_rate_data.metadata` (object, optional)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

    - `shipping_options.shipping_rate_data.tax_behavior` (enum, recommended if calculating taxes)
      Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.
Possible enum values:
      - `exclusive`
      - `inclusive`
      - `unspecified`

    - `shipping_options.shipping_rate_data.tax_code` (string, recommended if calculating taxes)
      A [tax code](https://docs.stripe.com/docs/tax/tax-categories.md) ID. The Shipping tax code is `txcd_92010001`.

    - `shipping_options.shipping_rate_data.type` (enum, required)
      The type of calculation to use on the shipping rate.
Possible enum values:
      - `fixed_amount`
        The shipping rate is a fixed amount.

- `submit_type` (enum, optional)
  Describes the type of transaction being performed by Checkout in order to customize relevant text on the page, such as the submit button. `submit_type` can only be specified on Checkout Sessions in `payment` or `subscription` mode. If blank or `auto`, `pay` is used. You can’t set this parameter if `ui_mode` is `elements`.
Possible enum values:
  - `auto`
    `pay` will used for `payment` mode sessions and `subscribe` will be used for `subscription` mode sessions

  - `book`
    Recommended when offering bookings. Submit button includes a ‘Book’ label

  - `donate`
    Recommended when accepting donations. Submit button includes a ‘Donate’ label

  - `pay`
    Submit button includes a ‘Buy’ label

  - `subscribe`
    Submit button includes a ‘Subscribe’ label

- `subscription_data` (object, optional)
  A subset of parameters to be passed to subscription creation for Checkout Sessions in `subscription` mode.

  - `subscription_data.application_fee_percent` (float, optional)
    A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner’s Stripe account. To use an application fee percent, the request must be made on behalf of another account, using the `Stripe-Account` header or an OAuth key. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).

  - `subscription_data.billing_cycle_anchor` (timestamp, optional)
    A future timestamp to anchor the subscription’s billing cycle for new subscriptions. You can’t set this parameter if `ui_mode` is `elements`.

  - `subscription_data.billing_mode` (object, optional)
    Controls how prorations and invoices for subscriptions are calculated and orchestrated.

    - `subscription_data.billing_mode.type` (enum, required)
      Controls the calculation and orchestration of prorations and invoices for subscriptions. If no value is passed, the default is `flexible`.
Possible enum values:
      - `classic`
        Calculations for subscriptions and invoices are based on legacy defaults.

      - `flexible`
        Supports more flexible calculation and orchestration options for subscriptions and invoices.

    - `subscription_data.billing_mode.flexible` (object, optional)
      Configure behavior for flexible billing mode.

      - `subscription_data.billing_mode.flexible.proration_discounts` (enum, optional)
        Controls how invoices and invoice items display proration amounts and discount amounts.
Possible enum values:
        - `included`
          Amounts are net of discounts, and discount amounts are zero.

        - `itemized`
          Amounts are gross of discounts, and discount amounts are accurate.

  - `subscription_data.default_tax_rates` (array of strings, optional)
    The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription.

  - `subscription_data.description` (string, optional)
    The subscription’s description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in the [customer portal](https://docs.stripe.com/docs/customer-management.md).

    The maximum length is 500 characters.

  - `subscription_data.invoice_settings` (object, optional)
    All invoices will be billed using the specified settings.

    - `subscription_data.invoice_settings.issuer` (object, optional)
      The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

      - `subscription_data.invoice_settings.issuer.type` (enum, required)
        Type of the account referenced in the request.
Possible enum values:
        - `account`
          Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

        - `self`
          Indicates that the account being referenced is the account making the API request.

      - `subscription_data.invoice_settings.issuer.account` (string, required only if type is account)
        The connected account being referenced when `type` is `account`.

  - `subscription_data.metadata` (object, optional)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.

  - `subscription_data.on_behalf_of` (string, optional)
    The account on behalf of which to charge, for each of the subscription’s invoices.

  - `subscription_data.pending_invoice_item_interval` (object, optional)
    Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](https://docs.stripe.com/docs/api.md#create_invoice) for the given subscription at the specified interval.

    - `subscription_data.pending_invoice_item_interval.interval` (enum, required)
      Specifies invoicing frequency. Either `day`, `week`, `month` or `year`.
Possible enum values:
      - `day`
      - `month`
      - `week`
      - `year`

    - `subscription_data.pending_invoice_item_interval.interval_count` (integer, optional)
      The number of intervals between invoices. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks).

  - `subscription_data.proration_behavior` (enum, optional)
    Determines how to handle prorations resulting from the `billing_cycle_anchor`. If no value is passed, the default is `create_prorations`.
Possible enum values:
    - `create_prorations`
      Will cause proration invoice items to be created when applicable.

    - `none`
      Disable creating prorations in current Checkout Session

  - `subscription_data.transfer_data` (object, optional)
    If specified, the funds from the subscription’s invoices will be transferred to the destination and the ID of the resulting transfers will be found on the resulting charges.

    - `subscription_data.transfer_data.destination` (string, required)
      ID of an existing, connected Stripe account.

    - `subscription_data.transfer_data.amount_percent` (float, optional)
      A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the destination account. By default, the entire amount is transferred to the destination.

  - `subscription_data.trial_end` (integer, optional)
    Unix timestamp representing the end of the trial period the customer will get before being charged for the first time. Has to be at least 48 hours in the future.

  - `subscription_data.trial_period_days` (integer, optional)
    Integer representing the number of trial period days before the customer is charged for the first time. Has to be at least 1.

  - `subscription_data.trial_settings` (object, optional)
    Settings related to subscription trials.

    - `subscription_data.trial_settings.end_behavior` (object, required)
      Defines how the subscription should behave when the user’s free trial ends.

      - `subscription_data.trial_settings.end_behavior.missing_payment_method` (enum, required)
        Indicates how the subscription should change when the trial ends if the user did not provide a payment method.
Possible enum values:
        - `cancel`
          Cancel the subscription if a payment method is not attached when the trial ends.

        - `create_invoice`
          Create an invoice when the trial ends, even if the user did not set up a payment method.

        - `pause`
          Pause the subscription if a payment method is not attached when the trial ends.

- `success_url` (string, required conditionally)
  The URL to which Stripe should send customers when payment or setup is complete. This parameter is not allowed if ui_mode is `embedded_page` or `elements`. If you’d like to use information from the successful Checkout Session on your page, read the guide on [customizing your success page](https://docs.stripe.com/docs/payments/checkout/custom-success-page.md).

- `tax_id_collection` (object, optional)
  Controls tax ID collection during checkout.

  - `tax_id_collection.enabled` (boolean, required)
    Enable tax ID collection during checkout. Defaults to `false`.

  - `tax_id_collection.required` (enum, optional)
    Describes whether a tax ID is required during checkout. Defaults to `never`. You can’t set this parameter if `ui_mode` is `custom`.
Possible enum values:
    - `if_supported`
      A tax ID will be required if collection is [supported](https://docs.stripe.com/tax/checkout/tax-ids.md#supported-types) for the selected billing address country.

    - `never`
      Tax ID collection is never required.

- `ui_mode` (enum, optional)
  The UI mode of the Session. Defaults to `hosted_page`.
Possible enum values:
  - `elements`
    The Checkout Session is displayed using [Checkout elements](https://docs.stripe.com/checkout/custom/quickstart.md) on your website.

  - `embedded_page`
    The Checkout Session is displayed as an embedded form on your website.

  - `hosted_page`
    The Checkout Session is displayed on a hosted page that customers get redirected to.

- `wallet_options` (object, optional)
  Wallet-specific configuration.

  - `wallet_options.link` (object, optional)
    contains details about the Link wallet options (Link is also known as Onelink in the UK).

    - `wallet_options.link.display` (enum, optional)
      Specifies whether Checkout should display Link as a payment option. By default, Checkout will display all the supported wallets that the Checkout Session was created with. This is the `auto` behavior, and it is the default choice.
Possible enum values:
      - `auto`
        The Checkout Session will automatically determine if Link is a supported payment option and display accordingly.

      - `never`
        The Checkout Session will not display Link as a payment option.
