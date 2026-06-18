# The Payment Link object

### The Payment Link object

```json
{
  "id": "plink_1MoC3ULkdIwHu7ixZjtGpVl2",
  "object": "payment_link",
  "active": true,
  "after_completion": {
    "hosted_confirmation": {
      "custom_message": null
    },
    "type": "hosted_confirmation"
  },
  "allow_promotion_codes": false,
  "application_fee_amount": null,
  "application_fee_percent": null,
  "automatic_tax": {
    "enabled": false,
    "liability": null
  },
  "billing_address_collection": "auto",
  "consent_collection": null,
  "currency": "usd",
  "custom_fields": [],
  "custom_text": {
    "shipping_address": null,
    "submit": null
  },
  "customer_creation": "if_required",
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
  "metadata": {},
  "on_behalf_of": null,
  "payment_intent_data": null,
  "payment_method_collection": "always",
  "payment_method_types": null,
  "phone_number_collection": {
    "enabled": false
  },
  "shipping_address_collection": null,
  "shipping_options": [],
  "submit_type": "auto",
  "subscription_data": {
    "description": null,
    "invoice_settings": {
      "issuer": {
        "type": "self"
      }
    },
    "trial_period_days": null
  },
  "tax_id_collection": {
    "enabled": false
  },
  "transfer_data": null,
  "url": "https://buy.stripe.com/test_cN25nr0iZ7bUa7meUY"
}
```

## Attributes

- `id` (string)
  Unique identifier for the object.

- `object` (string)
  String representing the object’s type. Objects of the same type share the same value.

- `active` (boolean)
  Whether the payment link’s `url` is active. If `false`, customers visiting the URL will be shown a page saying that the link has been deactivated.

- `after_completion` (object)
  Behavior after the purchase is complete.

  - `after_completion.hosted_confirmation` (object, nullable)
    Configuration when `type=hosted_confirmation`.

    - `after_completion.hosted_confirmation.custom_message` (string, nullable)
      The custom message that is displayed to the customer after the purchase is complete.

  - `after_completion.redirect` (object, nullable)
    Configuration when `type=redirect`.

    - `after_completion.redirect.url` (string)
      The URL the customer will be redirected to after the purchase is complete.

  - `after_completion.type` (enum)
    The specified behavior after the purchase is complete.
Possible enum values:
    - `hosted_confirmation`
      Displays a message on the hosted surface after the purchase is complete.

    - `redirect`
      Redirects the customer to the specified `url` after the purchase is complete.

- `allow_promotion_codes` (boolean)
  Whether user redeemable promotion codes are enabled.

- `application` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The ID of the Connect application that created the Payment Link.

- `application_fee_amount` (integer, nullable)
  The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account.

- `application_fee_percent` (float, nullable)
  This represents the percentage of the subscription invoice total that will be transferred to the application owner’s Stripe account.

- `automatic_tax` (object)
  Configuration details for automatic tax collection.

  - `automatic_tax.enabled` (boolean)
    If `true`, tax will be calculated automatically using the customer’s location.

  - `automatic_tax.liability` (object, nullable)
    The account that’s liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.

    - `automatic_tax.liability.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The connected account being referenced when `type` is `account`.

    - `automatic_tax.liability.type` (enum)
      Type of the account referenced.
Possible enum values:
      - `account`
        Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

      - `self`
        Indicates that the account being referenced is the account making the API request.

- `billing_address_collection` (enum)
  Configuration for collecting the customer’s billing address. Defaults to `auto`.
Possible enum values:
  - `auto`
    Checkout will only collect the billing address when necessary. When using [automatic_tax](https://docs.stripe.com/docs/api/checkout/sessions/object.md#checkout_session_object-automatic_tax-enabled), Checkout will collect the minimum number of fields required for tax calculation.

  - `required`
    Checkout will always collect the customer’s billing address.

- `consent_collection` (object, nullable)
  When set, provides configuration to gather active consent from customers.

  - `consent_collection.payment_method_reuse_agreement` (object, nullable)
    Settings related to the payment method reuse text shown in the Checkout UI.

    - `consent_collection.payment_method_reuse_agreement.position` (enum)
      Determines the position and visibility of the payment method reuse agreement in the UI. When set to `auto`, Stripe’s defaults will be used.

      When set to `hidden`, the payment method reuse agreement text will always be hidden in the UI.
Possible enum values:
      - `auto`
      - `hidden`

  - `consent_collection.promotions` (enum, nullable)
    If set to `auto`, enables the collection of customer consent for promotional communications.
Possible enum values:
    - `auto`
    - `none`

  - `consent_collection.terms_of_service` (enum, nullable)
    If set to `required`, it requires cutomers to accept the terms of service before being able to pay. If set to `none`, customers won’t be shown a checkbox to accept the terms of service.
Possible enum values:
    - `none`
    - `required`

- `currency` (enum)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

- `custom_fields` (array of objects)
  Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can’t set this parameter if `ui_mode` is `custom`.

  - `custom_fields.dropdown` (object, nullable)
    Configuration for `type=dropdown` fields.

    - `custom_fields.dropdown.default_value` (string, nullable)
      The value that pre-fills on the payment page.

    - `custom_fields.dropdown.options` (array of objects)
      The options available for the customer to select. Up to 200 options allowed.

      - `custom_fields.dropdown.options.label` (string)
        The label for the option, displayed to the customer. Up to 100 characters.

      - `custom_fields.dropdown.options.value` (string)
        The value for this option, not displayed to the customer, used by your integration to reconcile the option selected by the customer. Must be unique to this option, alphanumeric, and up to 100 characters.

  - `custom_fields.key` (string)
    String of your choice that your integration can use to reconcile this field. Must be unique to this field, alphanumeric, and up to 200 characters.

  - `custom_fields.label` (object)
    The label for the field, displayed to the customer.

    - `custom_fields.label.custom` (string, nullable)
      Custom text for the label, displayed to the customer. Up to 50 characters.

    - `custom_fields.label.type` (enum)
      The type of the label.
Possible enum values:
      - `custom`
        Set a custom label for the field.

  - `custom_fields.numeric` (object, nullable)
    Configuration for `type=numeric` fields.

    - `custom_fields.numeric.default_value` (string, nullable)
      The value that pre-fills the field on the payment page.

    - `custom_fields.numeric.maximum_length` (integer, nullable)
      The maximum character length constraint for the customer’s input.

    - `custom_fields.numeric.minimum_length` (integer, nullable)
      The minimum character length requirement for the customer’s input.

  - `custom_fields.optional` (boolean)
    Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.

  - `custom_fields.text` (object, nullable)
    Configuration for `type=text` fields.

    - `custom_fields.text.default_value` (string, nullable)
      The value that pre-fills the field on the payment page.

    - `custom_fields.text.maximum_length` (integer, nullable)
      The maximum character length constraint for the customer’s input.

    - `custom_fields.text.minimum_length` (integer, nullable)
      The minimum character length requirement for the customer’s input.

  - `custom_fields.type` (enum)
    The type of the field.
Possible enum values:
    - `dropdown`
      Provide a list of options for your customer to select.

    - `numeric`
      Collect a numbers-only field from your customer.

    - `text`
      Collect a string field from your customer.

- `custom_text` (object)
  Display additional text for your customers using custom text. You can’t set this parameter if `ui_mode` is `custom`.

  - `custom_text.after_submit` (object, nullable)
    Custom text that should be displayed after the payment confirmation button.

    - `custom_text.after_submit.message` (string)
      Text can be up to 1200 characters in length.

  - `custom_text.shipping_address` (object, nullable)
    Custom text that should be displayed alongside shipping address collection.

    - `custom_text.shipping_address.message` (string)
      Text can be up to 1200 characters in length.

  - `custom_text.submit` (object, nullable)
    Custom text that should be displayed alongside the payment confirmation button.

    - `custom_text.submit.message` (string)
      Text can be up to 1200 characters in length.

  - `custom_text.terms_of_service_acceptance` (object, nullable)
    Custom text that should be displayed in place of the default terms of service agreement text.

    - `custom_text.terms_of_service_acceptance.message` (string)
      Text can be up to 1200 characters in length.

- `customer_creation` (enum)
  Configuration for Customer creation during checkout.
Possible enum values:
  - `always`
    The Checkout Session will always create a [Customer](https://docs.stripe.com/docs/api/customers.md) when a Session confirmation is attempted.

  - `if_required`
    The Checkout Session will only create a [Customer](https://docs.stripe.com/docs/api/customers.md) if it is required for Session confirmation. Currently, only `subscription` mode Sessions and `payment` mode Sessions with [post-purchase invoices enabled](https://docs.stripe.com/docs/receipts.md?payment-ui=checkout#paid-invoices) require a Customer.

- `inactive_message` (string, nullable)
  The custom message to be displayed to a customer when a payment link is no longer active.

- `invoice_creation` (object, nullable)
  Configuration for creating invoice for payment mode payment links.

  - `invoice_creation.enabled` (boolean)
    Enable creating an invoice on successful payment.

  - `invoice_creation.invoice_data` (object, nullable)
    Configuration for the invoice. Default invoice values will be used if unspecified.

    - `invoice_creation.invoice_data.account_tax_ids` (array of strings, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The account tax IDs associated with the invoice.

    - `invoice_creation.invoice_data.custom_fields` (array of objects, nullable)
      A list of up to 4 custom fields to be displayed on the invoice.

      - `invoice_creation.invoice_data.custom_fields.name` (string)
        The name of the custom field.

      - `invoice_creation.invoice_data.custom_fields.value` (string)
        The value of the custom field.

    - `invoice_creation.invoice_data.description` (string, nullable)
      An arbitrary string attached to the object. Often useful for displaying to users.

    - `invoice_creation.invoice_data.footer` (string, nullable)
      Footer to be displayed on the invoice.

    - `invoice_creation.invoice_data.issuer` (object, nullable)
      The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

      - `invoice_creation.invoice_data.issuer.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The connected account being referenced when `type` is `account`.

      - `invoice_creation.invoice_data.issuer.type` (enum)
        Type of the account referenced.
Possible enum values:
        - `account`
          Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

        - `self`
          Indicates that the account being referenced is the account making the API request.

    - `invoice_creation.invoice_data.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `invoice_creation.invoice_data.rendering_options` (object, nullable)
      Options for invoice PDF rendering.

      - `invoice_creation.invoice_data.rendering_options.amount_tax_display` (string, nullable)
        How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.

      - `invoice_creation.invoice_data.rendering_options.template` (string, nullable)
        ID of the invoice rendering template to be used for the generated invoice.

- `line_items` (object, expandable (can be expanded into an object with the `expand` request parameter))
  The line items representing what is being sold.

  - `line_items.object` (string)
    String representing the object’s type. Objects of the same type share the same value. Always has the value `list`.

  - `line_items.data` (array of objects)
    Details about each object.

    - `line_items.data.id` (string)
      Unique identifier for the object.

    - `line_items.data.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `line_items.data.amount_discount` (integer)
      Total discount amount applied. If no discounts were applied, defaults to 0.

    - `line_items.data.amount_subtotal` (integer)
      Total before any discounts or taxes are applied.

    - `line_items.data.amount_tax` (integer)
      Total tax amount applied. If no tax was applied, defaults to 0.

    - `line_items.data.amount_total` (integer)
      Total after discounts and taxes.

    - `line_items.data.currency` (enum)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

    - `line_items.data.description` (string, nullable)
      An arbitrary string attached to the object. Often useful for displaying to users. Defaults to product name.

    - `line_items.data.discounts` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The discounts applied to the line item.

      - `line_items.data.discounts.amount` (integer)
        The amount discounted.

      - `line_items.data.discounts.discount` (object)
        The discount applied.

        - `line_items.data.discounts.discount.id` (string)
          The ID of the discount object. Discounts can’t be fetched by ID. Use `expand[]=discounts` in API calls to expand discount IDs in an array.

        - `line_items.data.discounts.discount.object` (string)
          String representing the object’s type. Objects of the same type share the same value.

        - `line_items.data.discounts.discount.checkout_session` (string, nullable)
          The Checkout session that this coupon is applied to, if it is applied to a particular session in payment mode. Not present for subscription mode.

        - `line_items.data.discounts.discount.customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          The ID of the customer associated with this discount.

        - `line_items.data.discounts.discount.customer_account` (string, nullable)
          The ID of the account representing the customer associated with this discount.

        - `line_items.data.discounts.discount.end` (timestamp, nullable)
          If the coupon has a duration of `repeating`, the date that this discount will end. If the coupon has a duration of `once` or `forever`, this attribute will be null.

        - `line_items.data.discounts.discount.invoice` (string, nullable)
          The invoice that the discount’s coupon was applied to, if it was applied directly to a particular invoice.

        - `line_items.data.discounts.discount.invoice_item` (string, nullable)
          The invoice item `id` (or invoice line item `id` for invoice line items of type=‘subscription’) that the discount’s coupon was applied to, if it was applied directly to a particular invoice item or invoice line item.

        - `line_items.data.discounts.discount.promotion_code` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          The promotion code applied to create this discount.

        - `line_items.data.discounts.discount.source` (object)
          The source of the discount.

          - `line_items.data.discounts.discount.source.coupon` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
            The coupon that was redeemed to create this discount.

          - `line_items.data.discounts.discount.source.type` (enum)
            The source type of the discount.
Possible enum values:
            - `coupon`
              Coupon source type

        - `line_items.data.discounts.discount.start` (timestamp)
          Date that the coupon was applied.

        - `line_items.data.discounts.discount.subscription` (string, nullable)
          The subscription that this coupon is applied to, if it is applied to a particular subscription.

        - `line_items.data.discounts.discount.subscription_item` (string, nullable)
          The subscription item that this coupon is applied to, if it is applied to a particular subscription item.

    - `line_items.data.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `line_items.data.price` (object, nullable)
      The price used to generate the line item.

      - `line_items.data.price.id` (string)
        Unique identifier for the object.

      - `line_items.data.price.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `line_items.data.price.active` (boolean)
        Whether the price can be used for new purchases.

      - `line_items.data.price.billing_scheme` (enum)
        Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
Possible enum values:
        - `per_unit`
        - `tiered`

      - `line_items.data.price.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `line_items.data.price.currency` (enum)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

      - `line_items.data.price.currency_options` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).

        - `line_items.data.price.currency_options.<currency>.custom_unit_amount` (object, nullable)
          When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

          - `line_items.data.price.currency_options.<currency>.custom_unit_amount.maximum` (integer, nullable)
            The maximum unit amount the customer can specify for this item.

          - `line_items.data.price.currency_options.<currency>.custom_unit_amount.minimum` (integer, nullable)
            The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

          - `line_items.data.price.currency_options.<currency>.custom_unit_amount.preset` (integer, nullable)
            The starting unit amount which can be updated by the customer.

        - `line_items.data.price.currency_options.<currency>.tax_behavior` (enum, nullable)
          Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
          - `exclusive`
          - `inclusive`
          - `unspecified`

        - `line_items.data.price.currency_options.<currency>.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

          - `line_items.data.price.currency_options.<currency>.tiers.flat_amount` (integer, nullable)
            Price for the entire tier.

          - `line_items.data.price.currency_options.<currency>.tiers.flat_amount_decimal` (decimal string, nullable)
            Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

          - `line_items.data.price.currency_options.<currency>.tiers.unit_amount` (integer, nullable)
            Per unit price for units relevant to the tier.

          - `line_items.data.price.currency_options.<currency>.tiers.unit_amount_decimal` (decimal string, nullable)
            Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

          - `line_items.data.price.currency_options.<currency>.tiers.up_to` (integer, nullable)
            Up to and including to this quantity will be contained in the tier.

        - `line_items.data.price.currency_options.<currency>.unit_amount` (integer, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

        - `line_items.data.price.currency_options.<currency>.unit_amount_decimal` (decimal string, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

      - `line_items.data.price.custom_unit_amount` (object, nullable)
        When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

        - `line_items.data.price.custom_unit_amount.maximum` (integer, nullable)
          The maximum unit amount the customer can specify for this item.

        - `line_items.data.price.custom_unit_amount.minimum` (integer, nullable)
          The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

        - `line_items.data.price.custom_unit_amount.preset` (integer, nullable)
          The starting unit amount which can be updated by the customer.

      - `line_items.data.price.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `line_items.data.price.lookup_key` (string, nullable)
        A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.

      - `line_items.data.price.metadata` (object)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `line_items.data.price.nickname` (string, nullable)
        A brief description of the price, hidden from customers.

      - `line_items.data.price.product` (string, expandable (can be expanded into an object with the `expand` request parameter))
        The ID of the product this price is associated with.

      - `line_items.data.price.recurring` (object, nullable)
        The recurring components of a price such as `interval` and `usage_type`.

        - `line_items.data.price.recurring.interval` (enum)
          The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.

        - `line_items.data.price.recurring.interval_count` (integer)
          The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.

        - `line_items.data.price.recurring.meter` (string, nullable)
          The meter tracking the usage of a metered price

        - `line_items.data.price.recurring.usage_type` (enum)
          Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.

      - `line_items.data.price.tax_behavior` (enum, nullable)
        Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
        - `exclusive`
        - `inclusive`
        - `unspecified`

      - `line_items.data.price.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

        - `line_items.data.price.tiers.flat_amount` (integer, nullable)
          Price for the entire tier.

        - `line_items.data.price.tiers.flat_amount_decimal` (decimal string, nullable)
          Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

        - `line_items.data.price.tiers.unit_amount` (integer, nullable)
          Per unit price for units relevant to the tier.

        - `line_items.data.price.tiers.unit_amount_decimal` (decimal string, nullable)
          Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

        - `line_items.data.price.tiers.up_to` (integer, nullable)
          Up to and including to this quantity will be contained in the tier.

      - `line_items.data.price.tiers_mode` (enum, nullable)
        Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.
Possible enum values:
        - `graduated`
        - `volume`

      - `line_items.data.price.transform_quantity` (object, nullable)
        Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.

        - `line_items.data.price.transform_quantity.divide_by` (integer)
          Divide usage by this number.

        - `line_items.data.price.transform_quantity.round` (enum)
          After division, either round the result `up` or `down`.

      - `line_items.data.price.type` (enum)
        One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
Possible enum values:
        - `one_time`
        - `recurring`

      - `line_items.data.price.unit_amount` (integer, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

      - `line_items.data.price.unit_amount_decimal` (decimal string, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

    - `line_items.data.quantity` (integer, nullable)
      The quantity of products being purchased.

    - `line_items.data.taxes` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The taxes applied to the line item.

      - `line_items.data.taxes.amount` (integer)
        Amount of tax applied for this rate.

      - `line_items.data.taxes.rate` (object)
        The tax rate applied.

        - `line_items.data.taxes.rate.id` (string)
          Unique identifier for the object.

        - `line_items.data.taxes.rate.object` (string)
          String representing the object’s type. Objects of the same type share the same value.

        - `line_items.data.taxes.rate.active` (boolean)
          Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.

        - `line_items.data.taxes.rate.country` (string, nullable)
          Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

        - `line_items.data.taxes.rate.created` (timestamp)
          Time at which the object was created. Measured in seconds since the Unix epoch.

        - `line_items.data.taxes.rate.description` (string, nullable)
          An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.

        - `line_items.data.taxes.rate.display_name` (string)
          The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.

        - `line_items.data.taxes.rate.effective_percentage` (float, nullable)
          Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage reflects the rate actually used to calculate tax based on the product’s taxability and whether the user is registered to collect taxes in the corresponding jurisdiction.

        - `line_items.data.taxes.rate.flat_amount` (object, nullable)
          The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.

          - `line_items.data.taxes.rate.flat_amount.amount` (integer)
            Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

          - `line_items.data.taxes.rate.flat_amount.currency` (string)
            Three-letter ISO currency code, in lowercase.

        - `line_items.data.taxes.rate.inclusive` (boolean)
          This specifies if the tax rate is inclusive or exclusive.

        - `line_items.data.taxes.rate.jurisdiction` (string, nullable)
          The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.

        - `line_items.data.taxes.rate.jurisdiction_level` (enum, nullable)
          The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.
Possible enum values:
          - `city`
          - `country`
          - `county`
          - `district`
          - `multiple`
          - `state`

        - `line_items.data.taxes.rate.livemode` (boolean)
          If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

        - `line_items.data.taxes.rate.metadata` (object, nullable)
          Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

        - `line_items.data.taxes.rate.percentage` (float)
          Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.

        - `line_items.data.taxes.rate.rate_type` (enum, nullable)
          Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.
Possible enum values:
          - `flat_amount`
            A fixed amount applied as tax, regardless of the taxable amount, such as a retail delivery fee.

          - `percentage`
            A tax rate expressed as a percentage of the taxable amount, such as the sales tax rate in California.

        - `line_items.data.taxes.rate.state` (string, nullable)
          [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, “NY” for New York, United States.

        - `line_items.data.taxes.rate.tax_type` (enum, nullable)
          The high-level tax type, such as `vat` or `sales_tax`.
Possible enum values:
          - `admissions_tax`
            Admissions Tax

          - `amusement_tax`
            Amusement Tax

          - `attendance_tax`
            Attendance Tax

          - `communications_tax`
            Communications Tax

          - `entertainment_tax`
            Entertainment Tax

          - `gross_receipts_tax`
            Gross Receipts Tax

          - `gst`
            Goods and Services Tax

          - `hospitality_tax`
            Hospitality Tax

          - `hst`
            Harmonized Sales Tax

          - `igst`
            Integrated Goods and Services Tax

          - `jct`
            Japanese Consumption Tax

          - `lease_tax`
            Chicago Lease Tax

          - `luxury_tax`
            Luxury Tax

          - `pst`
            Provincial Sales Tax

          - `qst`
            Quebec Sales Tax

          - `resort_tax`
            Resort Tax

          - `retail_delivery_fee`
            Retail Delivery Fee

          - `rst`
            Retail Sales Tax

          - `sales_tax`
            Sales Tax

          - `service_tax`
            Service Tax

          - `tourism_tax`
            Tourism Tax

          - `vat`
            Value-Added Tax

      - `line_items.data.taxes.taxability_reason` (enum, nullable)
        The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.
Possible enum values:
        - `customer_exempt`
          No tax is applied as the customer is exempt from tax.

        - `not_collecting`
          No tax is collected either because you are not registered to collect tax in this jurisdiction, or because the non-taxable product tax code (`txcd_00000000`) was used.

        - `not_subject_to_tax`
          No tax is imposed on this transaction.

        - `not_supported`
          No tax applied. Stripe doesn’t support this jurisdiction, territory, or product.

        - `portion_product_exempt`
          A portion of the price is exempt from tax.

        - `portion_reduced_rated`
          A portion of the price is taxed at a reduced rate.

        - `portion_standard_rated`
          A portion of the price is taxed at the standard rate.

        - `product_exempt`
          The product or service is nontaxable or exempt from tax.

        - `product_exempt_holiday`
          The product or service is not taxed due to a sales tax holiday.

        - `proportionally_rated`
          The shipping cost tax rate is calculated as a weighted average of the other line items’ rates, weighted by their amounts.

        - `reduced_rated`
          Taxed at a reduced rate.

        - `reverse_charge`
          No tax is applied as it is the responsibility of the buyer to account for tax in this case.

        - `standard_rated`
          Taxed at the standard rate.

        - `taxable_basis_reduced`
          A reduced amount of the price is subject to tax.

        - `zero_rated`
          The transaction is taxed at a special rate of 0% or the transaction is exempt (but these exempt transactions still let you deduct the “input VAT” paid on your business purchases).

      - `line_items.data.taxes.taxable_amount` (integer, nullable)
        The amount on which tax is calculated, in the smallest currency unit.

  - `line_items.has_more` (boolean)
    True if this list has another page of items after this one that can be fetched.

  - `line_items.url` (string)
    The URL where this list can be accessed.

- `livemode` (boolean)
  If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

- `managed_payments` (object, nullable)
  Settings for Managed Payments for this Payment Link and resulting [CheckoutSessions](https://docs.stripe.com/api/checkout/sessions/object.md), [PaymentIntents](https://docs.stripe.com/api/payment_intents/object.md), [Invoices](https://docs.stripe.com/api/invoices/object.md), and [Subscriptions](https://docs.stripe.com/api/subscriptions/object.md).

  - `managed_payments.enabled` (boolean)
    Indicates whether [Managed Payments](https://docs.stripe.com/payments/managed-payments.md) is enabled for this transaction.

- `metadata` (object)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

- `name_collection` (object, nullable)
  Details on the state of name collection for the payment link.

  - `name_collection.business` (object, nullable)
    The settings applied for collecting a business’s name.

    - `name_collection.business.enabled` (boolean)
      Indicates whether business name collection is enabled for the payment link.

    - `name_collection.business.optional` (boolean)
      Whether the customer is required to complete the field before checking out. Defaults to `false`.

  - `name_collection.individual` (object, nullable)
    The settings applied for collecting an individual’s name.

    - `name_collection.individual.enabled` (boolean)
      Indicates whether individual name collection is enabled for the payment link.

    - `name_collection.individual.optional` (boolean)
      Whether the customer is required to complete the field before checking out. Defaults to `false`.

- `on_behalf_of` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The account on behalf of which to charge. See the [Connect documentation](https://support.stripe.com/questions/sending-invoices-on-behalf-of-connected-accounts) for details.

- `optional_items` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The optional items presented to the customer at checkout.

- `payment_intent_data` (object, nullable)
  Indicates the parameters to be passed to PaymentIntent creation during checkout.

  - `payment_intent_data.capture_method` (enum, nullable)
    Indicates when the funds will be captured from the customer’s account.
Possible enum values:
    - `automatic`
      Stripe automatically captures funds when the customer authorizes the payment.

    - `automatic_async`
      (Default) Stripe asynchronously captures funds when the customer authorizes the payment. Recommended over `capture_method=automatic` due to improved latency. Read the [integration guide](https://docs.stripe.com/docs/payments/payment-intents/asynchronous-capture.md) for more information.

    - `manual`
      Place a hold on the funds when the customer authorizes the payment, but [don’t capture the funds until later](https://docs.stripe.com/docs/payments/capture-later.md). (Not all payment methods support this.)

  - `payment_intent_data.description` (string, nullable)
    An arbitrary string attached to the object. Often useful for displaying to users.

  - `payment_intent_data.metadata` (object)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that will set metadata on [Payment Intents](https://docs.stripe.com/docs/api/payment_intents.md) generated from this payment link.

  - `payment_intent_data.setup_future_usage` (enum, nullable)
    Indicates that you intend to make future payments with the payment method collected during checkout.
Possible enum values:
    - `off_session`
      Use `off_session` if your customer may or may not be present in your checkout flow.

    - `on_session`
      Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow.

  - `payment_intent_data.statement_descriptor` (string, nullable)
    For a non-card payment, information about the charge that appears on the customer’s statement when this payment succeeds in creating a charge.

  - `payment_intent_data.statement_descriptor_suffix` (string, nullable)
    For a card payment, information about the charge that appears on the customer’s statement when this payment succeeds in creating a charge. Concatenated with the account’s statement descriptor prefix to form the complete statement descriptor.

  - `payment_intent_data.transfer_group` (string, nullable)
    A string that identifies the resulting payment as part of a group. See the PaymentIntents [use case for connected accounts](https://docs.stripe.com/docs/connect/separate-charges-and-transfers.md) for details.

- `payment_method_collection` (enum)
  Configuration for collecting a payment method during checkout. Defaults to `always`.
Possible enum values:
  - `always`
    The Checkout Session will always collect a PaymentMethod.

  - `if_required`
    The Checkout Session will only collect a PaymentMethod if there is an amount due.

- `payment_method_options` (object, nullable)
  Payment-method-specific configuration.

  - `payment_method_options.card` (object, nullable)
    Configuration for `card` payment methods.

    - `payment_method_options.card.restrictions` (object, nullable)
      Restrictions to apply to the card payment method. For example, you can block specific card brands.

      - `payment_method_options.card.restrictions.brands_blocked` (array of enums)
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

- `payment_method_types` (array of enums, nullable)
  The list of payment method types that customers can use. When `null`, Stripe will dynamically show relevant payment methods you’ve enabled in your [payment method settings](https://dashboard.stripe.com/settings/payment_methods).

- `phone_number_collection` (object)
  Controls phone number collection settings during checkout.

  - `phone_number_collection.enabled` (boolean)
    If `true`, a phone number will be collected during checkout.

- `restrictions` (object, nullable)
  Settings that restrict the usage of a payment link.

  - `restrictions.completed_sessions` (object)
    Configuration for the `completed_sessions` restriction type.

    - `restrictions.completed_sessions.count` (integer)
      The current number of checkout sessions that have been completed on the payment link which count towards the `completed_sessions` restriction to be met.

    - `restrictions.completed_sessions.limit` (integer)
      The maximum number of checkout sessions that can be completed for the `completed_sessions` restriction to be met.

- `shipping_address_collection` (object, nullable)
  Configuration for collecting the customer’s shipping address.

  - `shipping_address_collection.allowed_countries` (array of enums)
    An array of two-letter ISO country codes representing which countries Checkout should provide as options for shipping locations. Unsupported country codes: `AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI`.
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

- `shipping_options` (array of objects)
  The shipping rate options applied to the session.

  - `shipping_options.shipping_amount` (integer)
    A non-negative integer in cents representing how much to charge.

  - `shipping_options.shipping_rate` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The ID of the Shipping Rate to use for this shipping option.

- `submit_type` (enum)
  Indicates the type of transaction being performed which customizes relevant text on the page, such as the submit button.
Possible enum values:
  - `auto`
    Default value. `pay` will used in all scenarios

  - `book`
    Recommended when offering bookings. Submit button includes a ‘Book’ label and URLs use the `book.stripe.com` hostname

  - `donate`
    Recommended when accepting donations. Submit button includes a ‘Donate’ label and URLs use the `donate.stripe.com` hostname

  - `pay`
    Submit button includes a ‘Buy’ label and URLs use the `buy.stripe.com` hostname

  - `subscribe`
    Submit button includes a ‘Subscribe’ label and URLs use the `buy.stripe.com` hostname

- `subscription_data` (object, nullable)
  When creating a subscription, the specified configuration data will be used. There must be at least one line item with a recurring price to use `subscription_data`.

  - `subscription_data.description` (string, nullable)
    The subscription’s description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.

  - `subscription_data.invoice_settings` (object)
    All invoices will be billed using the specified settings.

    - `subscription_data.invoice_settings.issuer` (object)
      The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

      - `subscription_data.invoice_settings.issuer.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The connected account being referenced when `type` is `account`.

      - `subscription_data.invoice_settings.issuer.type` (enum)
        Type of the account referenced.
Possible enum values:
        - `account`
          Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

        - `self`
          Indicates that the account being referenced is the account making the API request.

  - `subscription_data.metadata` (object)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that will set metadata on [Subscriptions](https://docs.stripe.com/docs/api/subscriptions.md) generated from this payment link.

  - `subscription_data.trial_period_days` (integer, nullable)
    Integer representing the number of trial period days before the customer is charged for the first time.

  - `subscription_data.trial_settings` (object, nullable)
    Settings related to subscription trials.

    - `subscription_data.trial_settings.end_behavior` (object)
      Defines how the subscription should behave when the user’s free trial ends.

      - `subscription_data.trial_settings.end_behavior.missing_payment_method` (enum)
        Indicates how the subscription should change when the trial ends if the user did not provide a payment method.
Possible enum values:
        - `cancel`
          Cancel the subscription if a payment method is not attached when the trial ends.

        - `create_invoice`
          Create an invoice when the trial ends, even if the user did not set up a payment method.

        - `pause`
          Pause the subscription if a payment method is not attached when the trial ends.

- `tax_id_collection` (object)
  Details on the state of tax ID collection for the payment link.

  - `tax_id_collection.enabled` (boolean)
    Indicates whether tax ID collection is enabled for the session.

- `transfer_data` (object, nullable)
  The account (if any) the payments will be attributed to for tax reporting, and where funds from each payment will be transferred to.

  - `transfer_data.amount` (integer, nullable)
    The amount in the smallest currency unit that will be transferred to the destination account. By default, the entire amount is transferred to the destination.

  - `transfer_data.destination` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The connected account receiving the transfer.

- `url` (string)
  The public URL that can be shared with customers.
