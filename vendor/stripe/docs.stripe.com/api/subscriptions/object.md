# The Subscription object

### The Subscription object

```json
{
  "id": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
  "object": "subscription",
  "application": null,
  "application_fee_percent": null,
  "automatic_tax": {
    "enabled": false,
    "liability": null
  },
  "billing_cycle_anchor": 1679609767,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": null,
  "cancellation_details": {
    "comment": null,
    "feedback": null,
    "reason": null
  },
  "collection_method": "charge_automatically",
  "created": 1679609767,
  "currency": "usd",
  "customer": "cus_Na6dX7aXxi11N4",
  "days_until_due": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discounts": null,
  "ended_at": null,
  "invoice_settings": {
    "issuer": {
      "type": "self"
    }
  },
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_Na6dzxczY5fwHx",
        "object": "subscription_item",
        "created": 1679609768,
        "current_period_end": 1682288167,
        "current_period_start": 1679609767,
        "metadata": {},
        "plan": {
          "id": "price_1MowQULkdIwHu7ixraBm864M",
          "object": "plan",
          "active": true,
          "amount": 1000,
          "amount_decimal": "1000",
          "billing_scheme": "per_unit",
          "created": 1679609766,
          "currency": "usd",
          "discounts": null,
          "interval": "month",
          "interval_count": 1,
          "livemode": false,
          "metadata": {},
          "nickname": null,
          "product": "prod_Na6dGcTsmU0I4R",
          "tiers_mode": null,
          "transform_usage": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "price": {
          "id": "price_1MowQULkdIwHu7ixraBm864M",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1679609766,
          "currency": "usd",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_Na6dGcTsmU0I4R",
          "recurring": {
            "interval": "month",
            "interval_count": 1,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "recurring",
          "unit_amount": 1000,
          "unit_amount_decimal": "1000"
        },
        "quantity": 1,
        "subscription": "sub_1MowQVLkdIwHu7ixeRlqHVzs",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "total_count": 1,
    "url": "/v1/subscription_items?subscription=sub_1MowQVLkdIwHu7ixeRlqHVzs"
  },
  "latest_invoice": "in_1MowQWLkdIwHu7ixuzkSPfKd",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "on_behalf_of": null,
  "pause_collection": null,
  "payment_settings": {
    "payment_method_options": null,
    "payment_method_types": null,
    "save_default_payment_method": "off"
  },
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "schedule": null,
  "start_date": 1679609767,
  "status": "active",
  "test_clock": null,
  "transfer_data": null,
  "trial_end": null,
  "trial_settings": {
    "end_behavior": {
      "missing_payment_method": "create_invoice"
    }
  },
  "trial_start": null
}
```

## Attributes

- `id` (string)
  Unique identifier for the object.

- `object` (string)
  String representing the object’s type. Objects of the same type share the same value.

- `application` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the Connect Application that created the subscription.

- `application_fee_percent` (float, nullable)
  A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner’s Stripe account.

- `automatic_tax` (object)
  Automatic tax settings for this subscription.

  - `automatic_tax.disabled_reason` (enum, nullable)
    If Stripe disabled automatic tax, this enum describes why.
Possible enum values:
    - `requires_location_inputs`
      Stripe’s systems automatically turned off Tax for this subscription when finalizing one of its invoices with a missing or incomplete location for your customer.

  - `automatic_tax.enabled` (boolean)
    Whether Stripe automatically computes tax on this subscription.

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

- `billing_cycle_anchor` (timestamp)
  The reference point that aligns future [billing cycle](https://docs.stripe.com/docs/subscriptions/billing-cycle.md) dates. It sets the day of week for `week` intervals, the day of month for `month` and `year` intervals, and the month of year for `year` intervals. The timestamp is in UTC format.

- `billing_cycle_anchor_config` (object, nullable)
  The fixed values used to calculate the `billing_cycle_anchor`.

  - `billing_cycle_anchor_config.day_of_month` (integer)
    The day of the month of the billing_cycle_anchor.

  - `billing_cycle_anchor_config.hour` (integer, nullable)
    The hour of the day of the billing_cycle_anchor.

  - `billing_cycle_anchor_config.minute` (integer, nullable)
    The minute of the hour of the billing_cycle_anchor.

  - `billing_cycle_anchor_config.month` (integer, nullable)
    The month to start full cycle billing periods.

  - `billing_cycle_anchor_config.second` (integer, nullable)
    The second of the minute of the billing_cycle_anchor.

- `billing_mode` (object)
  Controls how prorations and invoices for subscriptions are calculated and orchestrated.

  - `billing_mode.flexible` (object, nullable)
    Configure behavior for flexible billing mode

    - `billing_mode.flexible.proration_discounts` (enum)
      Controls how invoices and invoice items display proration amounts and discount amounts.
Possible enum values:
      - `included`
        Amounts are net of discounts, and discount amounts are zero.

      - `itemized`
        Amounts are gross of discounts, and discount amounts are accurate.

  - `billing_mode.type` (enum)
    Controls how prorations and invoices for subscriptions are calculated and orchestrated.
Possible enum values:
    - `classic`
      Calculations for subscriptions and invoices are based on legacy defaults.

    - `flexible`
      Supports more flexible calculation and orchestration options for subscriptions and invoices.

  - `billing_mode.updated_at` (timestamp, nullable)
    Details on when the current billing_mode was adopted.

- `billing_schedules` (array of objects)
  Billing schedules for this subscription.

  - `billing_schedules.applies_to` (array of objects, nullable)
    Specifies which subscription items the billing schedule applies to.

    - `billing_schedules.applies_to.price` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The billing schedule will apply to the subscription item with the given price ID.

    - `billing_schedules.applies_to.type` (enum)
      Controls which subscription items the billing schedule applies to.
Possible enum values:
      - `price`
        If specified, the billing schedule will apply to the subscription with the given price ID.

  - `billing_schedules.bill_until` (object)
    Specifies the end of billing period.

    - `billing_schedules.bill_until.computed_timestamp` (timestamp)
      The timestamp the billing schedule will apply until.

    - `billing_schedules.bill_until.duration` (object, nullable)
      Specifies the billing period.

      - `billing_schedules.bill_until.duration.interval` (enum)
        Specifies billing duration. Either `day`, `week`, `month` or `year`.
Possible enum values:
        - `day`
        - `month`
        - `week`
        - `year`

      - `billing_schedules.bill_until.duration.interval_count` (integer, nullable)
        The multiplier applied to the interval.

    - `billing_schedules.bill_until.timestamp` (timestamp, nullable)
      If specified, the billing schedule will apply until the specified timestamp.

    - `billing_schedules.bill_until.type` (enum)
      Describes how the billing schedule will determine the end date. Either `duration` or `timestamp`.
Possible enum values:
      - `duration`
        If specified, the billing schedule will apply until the specified duration is reached.

      - `timestamp`
        If specified, the billing schedule will apply until the specified timestamp.

  - `billing_schedules.key` (string)
    Unique identifier for the billing schedule.

- `billing_thresholds` (object, nullable)
  Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period

  - `billing_thresholds.amount_gte` (integer, nullable)
    Monetary threshold that triggers the subscription to create an invoice

  - `billing_thresholds.reset_billing_cycle_anchor` (boolean, nullable)
    Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged. This value may not be `true` if the subscription contains items with plans that have `aggregate_usage=last_ever`.

- `cancel_at` (timestamp, nullable)
  A date in the future at which the subscription will automatically get canceled

- `cancel_at_period_end` (boolean)
  Whether this subscription will (if `status=active`) or did (if `status=canceled`) cancel at the end of the current billing period.

- `canceled_at` (timestamp, nullable)
  If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will reflect the time of the most recent update request, not the end of the subscription period when the subscription is automatically moved to a canceled state.

- `cancellation_details` (object, nullable)
  Details about why this subscription was cancelled

  - `cancellation_details.comment` (string, nullable)
    Additional comments about why the user canceled the subscription, if the subscription was canceled explicitly by the user.

  - `cancellation_details.feedback` (enum, nullable)
    The customer submitted reason for why they canceled, if the subscription was canceled explicitly by the user.
Possible enum values:
    - `customer_service`
      Customer service was less than expected

    - `low_quality`
      Quality was less than expected

    - `missing_features`
      Some features are missing

    - `other`
      Other reason

    - `switched_service`
      I’m switching to a different service

    - `too_complex`
      Ease of use was less than expected

    - `too_expensive`
      It’s too expensive

    - `unused`
      I don’t use the service enough

  - `cancellation_details.reason` (enum, nullable)
    Why this subscription was canceled.
Possible enum values:
    - `canceled_by_retention_policy`
      Canceled because our [retention policy](https://support.stripe.com/questions/test-mode-subscription-data-retention) automatically expires subscriptions with `livemode: false`.

    - `cancellation_requested`
      Canceled explicitly through the API or Dashboard.

    - `payment_disputed`
      Canceled automatically after a dispute was opened, according to your [billing settings](https://dashboard.stripe.com/settings/billing/subscriptions).

    - `payment_failed`
      Canceled automatically after payment failure, according to your [billing settings](https://dashboard.stripe.com/settings/billing/subscriptions).

- `collection_method` (enum)
  Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`.
Possible enum values:
  - `charge_automatically`
  - `send_invoice`

- `created` (timestamp)
  Time at which the object was created. Measured in seconds since the Unix epoch.

- `currency` (enum)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

- `customer` (string, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the customer who owns the subscription.

- `customer_account` (string, nullable)
  ID of the account representing the customer who owns the subscription.

- `days_until_due` (integer, nullable)
  Number of days a customer has to pay invoices generated by this subscription. This value will be `null` for subscriptions where `collection_method=charge_automatically`.

- `default_payment_method` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the default payment method for the subscription. It must belong to the customer associated with the subscription. This takes precedence over `default_source`. If neither are set, invoices will use the customer’s [invoice_settings.default_payment_method](https://docs.stripe.com/docs/api/customers/object.md#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/docs/api/customers/object.md#customer_object-default_source).

- `default_source` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the default payment source for the subscription. It must belong to the customer associated with the subscription and be in a chargeable state. If `default_payment_method` is also set, `default_payment_method` will take precedence. If neither are set, invoices will use the customer’s [invoice_settings.default_payment_method](https://docs.stripe.com/docs/api/customers/object.md#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/docs/api/customers/object.md#customer_object-default_source).

- `default_tax_rates` (array of objects, nullable)
  The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription.

  - `default_tax_rates.id` (string)
    Unique identifier for the object.

  - `default_tax_rates.object` (string)
    String representing the object’s type. Objects of the same type share the same value.

  - `default_tax_rates.active` (boolean)
    Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.

  - `default_tax_rates.country` (string, nullable)
    Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

  - `default_tax_rates.created` (timestamp)
    Time at which the object was created. Measured in seconds since the Unix epoch.

  - `default_tax_rates.description` (string, nullable)
    An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.

  - `default_tax_rates.display_name` (string)
    The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.

  - `default_tax_rates.effective_percentage` (float, nullable)
    Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage reflects the rate actually used to calculate tax based on the product’s taxability and whether the user is registered to collect taxes in the corresponding jurisdiction.

  - `default_tax_rates.flat_amount` (object, nullable)
    The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.

    - `default_tax_rates.flat_amount.amount` (integer)
      Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

    - `default_tax_rates.flat_amount.currency` (string)
      Three-letter ISO currency code, in lowercase.

  - `default_tax_rates.inclusive` (boolean)
    This specifies if the tax rate is inclusive or exclusive.

  - `default_tax_rates.jurisdiction` (string, nullable)
    The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.

  - `default_tax_rates.jurisdiction_level` (enum, nullable)
    The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.
Possible enum values:
    - `city`
    - `country`
    - `county`
    - `district`
    - `multiple`
    - `state`

  - `default_tax_rates.livemode` (boolean)
    If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

  - `default_tax_rates.metadata` (object, nullable)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

  - `default_tax_rates.percentage` (float)
    Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.

  - `default_tax_rates.rate_type` (enum, nullable)
    Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.
Possible enum values:
    - `flat_amount`
      A fixed amount applied as tax, regardless of the taxable amount, such as a retail delivery fee.

    - `percentage`
      A tax rate expressed as a percentage of the taxable amount, such as the sales tax rate in California.

  - `default_tax_rates.state` (string, nullable)
    [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, “NY” for New York, United States.

  - `default_tax_rates.tax_type` (enum, nullable)
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

- `description` (string, nullable)
  The subscription’s description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.

  The maximum length is 500 characters.

- `discounts` (array of strings, expandable (can be expanded into an object with the `expand` request parameter))
  The discounts applied to the subscription. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.

- `ended_at` (timestamp, nullable)
  If the subscription has ended, the date the subscription ended.

- `invoice_settings` (object)
  All invoices will be billed using the specified settings.

  - `invoice_settings.account_tax_ids` (array of strings, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The account tax IDs associated with the subscription. Will be set on invoices generated by the subscription.

  - `invoice_settings.issuer` (object)
    The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

    - `invoice_settings.issuer.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The connected account being referenced when `type` is `account`.

    - `invoice_settings.issuer.type` (enum)
      Type of the account referenced.
Possible enum values:
      - `account`
        Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

      - `self`
        Indicates that the account being referenced is the account making the API request.

- `items` (object)
  List of subscription items, each with an attached price.

  - `items.object` (string)
    String representing the object’s type. Objects of the same type share the same value. Always has the value `list`.

  - `items.data` (array of objects)
    Details about each object.

    - `items.data.id` (string)
      Unique identifier for the object.

    - `items.data.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `items.data.billed_until` (timestamp, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The time period the subscription item has been billed for.

    - `items.data.billing_thresholds` (object, nullable)
      Define thresholds at which an invoice will be sent, and the related subscription advanced to a new billing period

      - `items.data.billing_thresholds.usage_gte` (integer, nullable)
        Usage threshold that triggers the subscription to create an invoice

    - `items.data.created` (integer)
      Time at which the object was created. Measured in seconds since the Unix epoch.

    - `items.data.current_period_end` (timestamp)
      The end time of this subscription item’s current billing period.

    - `items.data.current_period_start` (timestamp)
      The start time of this subscription item’s current billing period.

    - `items.data.discounts` (array of strings, expandable (can be expanded into an object with the `expand` request parameter))
      The discounts applied to the subscription item. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.

    - `items.data.metadata` (object)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `items.data.price` (object)
      The price the customer is subscribed to.

      - `items.data.price.id` (string)
        Unique identifier for the object.

      - `items.data.price.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `items.data.price.active` (boolean)
        Whether the price can be used for new purchases.

      - `items.data.price.billing_scheme` (enum)
        Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
Possible enum values:
        - `per_unit`
        - `tiered`

      - `items.data.price.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `items.data.price.currency` (enum)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

      - `items.data.price.currency_options` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).

        - `items.data.price.currency_options.<currency>.custom_unit_amount` (object, nullable)
          When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

          - `items.data.price.currency_options.<currency>.custom_unit_amount.maximum` (integer, nullable)
            The maximum unit amount the customer can specify for this item.

          - `items.data.price.currency_options.<currency>.custom_unit_amount.minimum` (integer, nullable)
            The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

          - `items.data.price.currency_options.<currency>.custom_unit_amount.preset` (integer, nullable)
            The starting unit amount which can be updated by the customer.

        - `items.data.price.currency_options.<currency>.tax_behavior` (enum, nullable)
          Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
          - `exclusive`
          - `inclusive`
          - `unspecified`

        - `items.data.price.currency_options.<currency>.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

          - `items.data.price.currency_options.<currency>.tiers.flat_amount` (integer, nullable)
            Price for the entire tier.

          - `items.data.price.currency_options.<currency>.tiers.flat_amount_decimal` (decimal string, nullable)
            Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

          - `items.data.price.currency_options.<currency>.tiers.unit_amount` (integer, nullable)
            Per unit price for units relevant to the tier.

          - `items.data.price.currency_options.<currency>.tiers.unit_amount_decimal` (decimal string, nullable)
            Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

          - `items.data.price.currency_options.<currency>.tiers.up_to` (integer, nullable)
            Up to and including to this quantity will be contained in the tier.

        - `items.data.price.currency_options.<currency>.unit_amount` (integer, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

        - `items.data.price.currency_options.<currency>.unit_amount_decimal` (decimal string, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

      - `items.data.price.custom_unit_amount` (object, nullable)
        When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

        - `items.data.price.custom_unit_amount.maximum` (integer, nullable)
          The maximum unit amount the customer can specify for this item.

        - `items.data.price.custom_unit_amount.minimum` (integer, nullable)
          The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

        - `items.data.price.custom_unit_amount.preset` (integer, nullable)
          The starting unit amount which can be updated by the customer.

      - `items.data.price.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `items.data.price.lookup_key` (string, nullable)
        A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.

      - `items.data.price.metadata` (object)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `items.data.price.nickname` (string, nullable)
        A brief description of the price, hidden from customers.

      - `items.data.price.product` (string, expandable (can be expanded into an object with the `expand` request parameter))
        The ID of the product this price is associated with.

      - `items.data.price.recurring` (object, nullable)
        The recurring components of a price such as `interval` and `usage_type`.

        - `items.data.price.recurring.interval` (enum)
          The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.

        - `items.data.price.recurring.interval_count` (integer)
          The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.

        - `items.data.price.recurring.meter` (string, nullable)
          The meter tracking the usage of a metered price

        - `items.data.price.recurring.usage_type` (enum)
          Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.

      - `items.data.price.tax_behavior` (enum, nullable)
        Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
        - `exclusive`
        - `inclusive`
        - `unspecified`

      - `items.data.price.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

        - `items.data.price.tiers.flat_amount` (integer, nullable)
          Price for the entire tier.

        - `items.data.price.tiers.flat_amount_decimal` (decimal string, nullable)
          Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

        - `items.data.price.tiers.unit_amount` (integer, nullable)
          Per unit price for units relevant to the tier.

        - `items.data.price.tiers.unit_amount_decimal` (decimal string, nullable)
          Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

        - `items.data.price.tiers.up_to` (integer, nullable)
          Up to and including to this quantity will be contained in the tier.

      - `items.data.price.tiers_mode` (enum, nullable)
        Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.
Possible enum values:
        - `graduated`
        - `volume`

      - `items.data.price.transform_quantity` (object, nullable)
        Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.

        - `items.data.price.transform_quantity.divide_by` (integer)
          Divide usage by this number.

        - `items.data.price.transform_quantity.round` (enum)
          After division, either round the result `up` or `down`.

      - `items.data.price.type` (enum)
        One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
Possible enum values:
        - `one_time`
        - `recurring`

      - `items.data.price.unit_amount` (integer, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

      - `items.data.price.unit_amount_decimal` (decimal string, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

    - `items.data.quantity` (integer, nullable)
      The [quantity](https://docs.stripe.com/docs/subscriptions/quantities.md) of the plan to which the customer should be subscribed.

    - `items.data.subscription` (string)
      The `subscription` this `subscription_item` belongs to.

    - `items.data.tax_rates` (array of objects, nullable)
      The tax rates which apply to this `subscription_item`. When set, the `default_tax_rates` on the subscription do not apply to this `subscription_item`.

      - `items.data.tax_rates.id` (string)
        Unique identifier for the object.

      - `items.data.tax_rates.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `items.data.tax_rates.active` (boolean)
        Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.

      - `items.data.tax_rates.country` (string, nullable)
        Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

      - `items.data.tax_rates.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `items.data.tax_rates.description` (string, nullable)
        An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.

      - `items.data.tax_rates.display_name` (string)
        The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.

      - `items.data.tax_rates.effective_percentage` (float, nullable)
        Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage reflects the rate actually used to calculate tax based on the product’s taxability and whether the user is registered to collect taxes in the corresponding jurisdiction.

      - `items.data.tax_rates.flat_amount` (object, nullable)
        The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.

        - `items.data.tax_rates.flat_amount.amount` (integer)
          Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

        - `items.data.tax_rates.flat_amount.currency` (string)
          Three-letter ISO currency code, in lowercase.

      - `items.data.tax_rates.inclusive` (boolean)
        This specifies if the tax rate is inclusive or exclusive.

      - `items.data.tax_rates.jurisdiction` (string, nullable)
        The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.

      - `items.data.tax_rates.jurisdiction_level` (enum, nullable)
        The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.
Possible enum values:
        - `city`
        - `country`
        - `county`
        - `district`
        - `multiple`
        - `state`

      - `items.data.tax_rates.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `items.data.tax_rates.metadata` (object, nullable)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `items.data.tax_rates.percentage` (float)
        Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.

      - `items.data.tax_rates.rate_type` (enum, nullable)
        Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.
Possible enum values:
        - `flat_amount`
          A fixed amount applied as tax, regardless of the taxable amount, such as a retail delivery fee.

        - `percentage`
          A tax rate expressed as a percentage of the taxable amount, such as the sales tax rate in California.

      - `items.data.tax_rates.state` (string, nullable)
        [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, “NY” for New York, United States.

      - `items.data.tax_rates.tax_type` (enum, nullable)
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

  - `items.has_more` (boolean)
    True if this list has another page of items after this one that can be fetched.

  - `items.url` (string)
    The URL where this list can be accessed.

- `latest_invoice` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The most recent invoice this subscription has generated over its lifecycle (for example, when it cycles or is updated).

- `livemode` (boolean)
  If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

- `managed_payments` (object, nullable)
  Settings for Managed Payments for this Subscription and resulting [Invoices](https://docs.stripe.com/api/invoices/object.md) and [PaymentIntents](https://docs.stripe.com/api/payment_intents/object.md).

  - `managed_payments.enabled` (boolean)
    Indicates whether [Managed Payments](https://docs.stripe.com/payments/managed-payments.md) is enabled for this Subscription and resulting [Invoices](https://docs.stripe.com/api/invoices/object.md) and [PaymentIntents](https://docs.stripe.com/api/payment_intents/object.md).

- `metadata` (object)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

- `next_pending_invoice_item_invoice` (timestamp, nullable)
  Specifies the approximate timestamp on which any pending invoice items will be billed according to the schedule provided at `pending_invoice_item_interval`.

- `on_behalf_of` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The account (if any) the charge was made on behalf of for charges associated with this subscription. See the [Connect documentation](https://docs.stripe.com/docs/connect/subscriptions.md#on-behalf-of) for details.

- `pause_collection` (object, nullable)
  If specified, payment collection for this subscription will be paused. Note that the subscription status will be unchanged and will not be updated to `paused`. Learn more about [pausing collection](https://docs.stripe.com/docs/billing/subscriptions/pause-payment.md).

  - `pause_collection.behavior` (enum)
    The payment collection behavior for this subscription while paused.
Possible enum values:
    - `keep_as_draft`
      Keep all invoices as `draft` while collection is paused.

    - `mark_uncollectible`
      Mark all invoices as `uncollectible` while collection is paused.

    - `void`
      Void all invoices while collection is paused.

  - `pause_collection.resumes_at` (timestamp, nullable)
    The time after which the subscription will resume collecting payments.

- `payment_settings` (object, nullable)
  Payment settings passed on to invoices created by the subscription.

  - `payment_settings.payment_method_options` (object, nullable)
    Payment-method-specific configuration to provide to invoices created by the subscription.

    - `payment_settings.payment_method_options.acss_debit` (object, nullable)
      This sub-hash contains details about the Canadian pre-authorized debit payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.acss_debit.mandate_options` (object, nullable)
        Additional fields for Mandate creation

        - `payment_settings.payment_method_options.acss_debit.mandate_options.transaction_type` (enum, nullable)
          Transaction type of the mandate.
Possible enum values:
          - `business`
            Transactions are made for business reasons

          - `personal`
            Transactions are made for personal reasons

      - `payment_settings.payment_method_options.acss_debit.verification_method` (enum, nullable)
        Bank account verification method. The default value is `automatic`.
Possible enum values:
        - `automatic`
          Instant verification with fallback to microdeposits.

        - `instant`
          Instant verification.

        - `microdeposits`
          Verification using microdeposits.

    - `payment_settings.payment_method_options.bancontact` (object, nullable)
      This sub-hash contains details about the Bancontact payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.bancontact.preferred_language` (enum)
        Preferred language of the Bancontact authorization page that the customer is redirected to.
Possible enum values:
        - `de`
          German

        - `en`
          English

        - `fr`
          French

        - `nl`
          Dutch

    - `payment_settings.payment_method_options.card` (object, nullable)
      This sub-hash contains details about the Card payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.card.mandate_options` (object, nullable)
        Configuration options for setting up an eMandate for cards issued in India.

        - `payment_settings.payment_method_options.card.mandate_options.amount` (integer, nullable)
          Amount to be charged for future payments, specified in the presentment currency.

        - `payment_settings.payment_method_options.card.mandate_options.amount_type` (enum, nullable)
          One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
          - `fixed`
            If `fixed`, the `amount` param refers to the exact amount to be charged in future payments.

          - `maximum`
            If `maximum`, the amount charged can be up to the value passed for the `amount` param.

        - `payment_settings.payment_method_options.card.mandate_options.description` (string, nullable)
          A description of the mandate or subscription that is meant to be displayed to the customer.

          The maximum length is 200 characters.

      - `payment_settings.payment_method_options.card.network` (enum, nullable)
        Selected network to process this Subscription on. Depends on the available networks of the card attached to the Subscription. Can be only set confirm-time.
Possible enum values:
        - `amex`
        - `cartes_bancaires`
        - `diners`
        - `discover`
        - `eftpos_au`
        - `girocard`
        - `interac`
        - `jcb`
        - `link`
        - `mastercard`
        - `unionpay`
        - `unknown`
        - `visa`

      - `payment_settings.payment_method_options.card.request_three_d_secure` (enum, nullable)
        We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/docs/strong-customer-authentication.md). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/docs/payments/3d-secure/authentication-flow.md#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
Possible enum values:
        - `any`
          Use `any` to manually request 3DS with a preference for a `frictionless` flow, increasing the likelihood of the authentication being completed without any additional input from the customer. 3DS will always be attempted if it is supported for the card, but Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

        - `automatic`
          (Default) Our SCA Engine automatically prompts your customers for authentication based on risk level and other requirements.

        - `challenge`
          Use `challenge` to request 3DS with a preference for a `challenge` flow, where the customer must respond to a prompt for active authentication. Stripe can’t guarantee your preference because the issuer determines the ultimate authentication flow. To learn more about 3DS flows, read our [guide](https://stripe.com/guides/3d-secure-2#frictionless-authentication).

    - `payment_settings.payment_method_options.customer_balance` (object, nullable)
      This sub-hash contains details about the Bank transfer payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.customer_balance.bank_transfer` (object, nullable)
        Configuration for the bank transfer funding type, if the `funding_type` is set to `bank_transfer`.

        - `payment_settings.payment_method_options.customer_balance.bank_transfer.eu_bank_transfer` (object, nullable)
          Configuration for eu_bank_transfer funding type.

          - `payment_settings.payment_method_options.customer_balance.bank_transfer.eu_bank_transfer.country` (enum)
            The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.
Possible enum values:
            - `BE`
            - `DE`
            - `ES`
            - `FR`
            - `IE`
            - `NL`

        - `payment_settings.payment_method_options.customer_balance.bank_transfer.type` (enum, nullable)
          The bank transfer type that can be used for funding. Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.

      - `payment_settings.payment_method_options.customer_balance.funding_type` (enum, nullable)
        The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
Possible enum values:
        - `bank_transfer`

    - `payment_settings.payment_method_options.konbini` (object, nullable)
      This sub-hash contains details about the Konbini payment method options to pass to invoices created by the subscription.

    - `payment_settings.payment_method_options.payto` (object, nullable)
      This sub-hash contains details about the PayTo payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.payto.mandate_options` (object, nullable)
        Additional fields for Mandate creation.

        - `payment_settings.payment_method_options.payto.mandate_options.amount` (integer, nullable)
          The maximum amount that can be collected in a single invoice. If you don’t specify a maximum, then there is no limit.

        - `payment_settings.payment_method_options.payto.mandate_options.amount_type` (enum, nullable)
          Only `maximum` is supported.
Possible enum values:
          - `fixed`
            The amount is the exact amount that will be charged.

          - `maximum`
            The amount is the maximum amount that can be charged.

        - `payment_settings.payment_method_options.payto.mandate_options.purpose` (enum, nullable)
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

    - `payment_settings.payment_method_options.pix` (object, nullable)
      This sub-hash contains details about the Pix payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.pix.expires_after_seconds` (integer, nullable)
        The number of seconds (between 10 and 1209600) after which Pix payment will expire. Defaults to 86400 seconds.

      - `payment_settings.payment_method_options.pix.mandate_options` (object, nullable)
        Configuration options for setting up a mandate

        - `payment_settings.payment_method_options.pix.mandate_options.amount` (integer, nullable)
          Amount to be charged for future payments.

        - `payment_settings.payment_method_options.pix.mandate_options.amount_includes_iof` (enum, nullable)
          Determines if the amount includes the IOF tax.
Possible enum values:
          - `always`
            The IOF tax is included in the amount.

          - `never`
            The IOF tax is not included in the amount.

        - `payment_settings.payment_method_options.pix.mandate_options.end_date` (string, nullable)
          Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`.

        - `payment_settings.payment_method_options.pix.mandate_options.payment_schedule` (enum, nullable)
          Schedule at which the future payments will be charged.
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

    - `payment_settings.payment_method_options.sepa_debit` (object, nullable)
      This sub-hash contains details about the SEPA Direct Debit payment method options to pass to invoices created by the subscription.

    - `payment_settings.payment_method_options.upi` (object, nullable)
      This sub-hash contains details about the UPI payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.upi.mandate_options` (object, nullable)
        Configuration options for setting up an eMandate

        - `payment_settings.payment_method_options.upi.mandate_options.amount` (integer, nullable)
          Amount to be charged for future payments.

        - `payment_settings.payment_method_options.upi.mandate_options.amount_type` (enum, nullable)
          One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.
Possible enum values:
          - `fixed`
            If `fixed`, the `amount` param refers to the exact amount to be charged in future payments.

          - `maximum`
            If `maximum`, the amount charged can be up to the value passed for the `amount` param.

        - `payment_settings.payment_method_options.upi.mandate_options.description` (string, nullable)
          A description of the mandate or subscription that is meant to be displayed to the customer.

          The maximum length is 20 characters.

        - `payment_settings.payment_method_options.upi.mandate_options.end_date` (timestamp, nullable)
          End date of the mandate or subscription.

    - `payment_settings.payment_method_options.us_bank_account` (object, nullable)
      This sub-hash contains details about the ACH direct debit payment method options to pass to invoices created by the subscription.

      - `payment_settings.payment_method_options.us_bank_account.financial_connections` (object, nullable)
        Additional fields for Financial Connections Session creation

        - `payment_settings.payment_method_options.us_bank_account.financial_connections.filters` (object, nullable)
          Filter the list of accounts that are allowed to be linked.

          - `payment_settings.payment_method_options.us_bank_account.financial_connections.filters.account_subcategories` (array of enums, nullable)
            The account subcategories to use to filter for possible accounts to link. Valid subcategories are `checking` and `savings`.
Possible enum values:
            - `checking`
              Bank account subcategory is checking

            - `savings`
              Bank account subcategory is savings

        - `payment_settings.payment_method_options.us_bank_account.financial_connections.permissions` (array of enums, nullable)
          The list of permissions to request. The `payment_method` permission must be included.
Possible enum values:
          - `balances`
            Allows accessing balance data from the account.

          - `ownership`
            Allows accessing ownership data from the account.

          - `payment_method`
            Allows the creation of a payment method from the account.

          - `transactions`
            Allows accessing transactions data from the account.

        - `payment_settings.payment_method_options.us_bank_account.financial_connections.prefetch` (array of enums, nullable)
          Data features requested to be retrieved upon account creation.
Possible enum values:
          - `balances`
            Requests to prefetch balance data on accounts collected in this session.

          - `ownership`
            Requests to prefetch ownership data on accounts collected in this session.

          - `transactions`
            Requests to prefetch transaction data on accounts collected in this session.

      - `payment_settings.payment_method_options.us_bank_account.verification_method` (enum, nullable)
        Bank account verification method. The default value is `automatic`.
Possible enum values:
        - `automatic`
          Instant verification with fallback to microdeposits.

        - `instant`
          Instant verification only.

        - `microdeposits`
          Verification using microdeposits. Cannot be used with Stripe Checkout, Hosted Invoices, or Payment Element.

  - `payment_settings.payment_method_types` (array of enums, nullable)
    The list of payment method types to provide to every invoice created by the subscription. If not set, Stripe attempts to automatically determine the types to use by looking at the invoice’s default payment method, the subscription’s default payment method, the customer’s default payment method, and your [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).
Possible enum values:
    - `ach_debit`
      ACH

    - `acss_debit`
      Canadian pre-authorized debit

    - `affirm`
      Affirm

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `amazon_pay`
      Amazon Pay

    - `au_becs_debit`
      BECS Direct Debit

    - `bacs_debit`
      Bacs Direct Debit

    - `bancontact`
      Bancontact

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `boleto`
      Boleto

    - `card`
      Card

    - `cashapp`
      Cash App Pay

    - `crypto`
      Crypto

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `custom`
      Custom

    - `customer_balance`
      Bank transfer

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `eps`
      EPS

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `fpx`
      FPX

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `giropay`
      giropay

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `grabpay`
      GrabPay

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `ideal`
      iDEAL

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `kakao_pay`
      Kakao Pay

    - `klarna`
      Klarna

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `konbini`
      Konbini

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `kr_card`
      Korean card

    - `link`
      Link

    - `multibanco`
      Multibanco

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `naver_pay`
      Naver Pay

    - `nz_bank_account`
      NZ BECS Direct Debit

    - `p24`
      Przelewy24

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `pay_by_bank`
      Pay By Bank

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `payco`
      PAYCO

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `paynow`
      PayNow

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `paypal`
      PayPal

    - `payto`
      PayTo

    - `pix`
      Pix

    - `promptpay`
      PromptPay

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `revolut_pay`
      Revolut Pay

    - `satispay`
      Satispay

    - `sepa_debit`
      SEPA Direct Debit

    - `sofort`
      SOFORT

      If set, the Subscription `collection_method` must be `send_invoice`.

    - `twint`
      Twint

    - `upi`
      UPI

    - `us_bank_account`
      ACH direct debit

    - `wechat_pay`
      WeChat Pay

      If set, the Subscription `collection_method` must be `send_invoice`.

  - `payment_settings.save_default_payment_method` (enum, nullable)
    Configure whether Stripe updates `subscription.default_payment_method` when payment succeeds. Defaults to `off`.
Possible enum values:
    - `off`
      Stripe never sets `subscription.default_payment_method`.

    - `on_subscription`
      Stripe sets `subscription.default_payment_method` when a subscription payment succeeds.

- `pending_invoice_item_interval` (object, nullable)
  Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](https://docs.stripe.com/api/invoices/create.md) for the given subscription at the specified interval.

  - `pending_invoice_item_interval.interval` (enum)
    Specifies invoicing frequency. Either `day`, `week`, `month` or `year`.
Possible enum values:
    - `day`
    - `month`
    - `week`
    - `year`

  - `pending_invoice_item_interval.interval_count` (integer)
    The number of intervals between invoices. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks).

- `pending_setup_intent` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  You can use this [SetupIntent](https://docs.stripe.com/docs/api/setup_intents.md) to collect user authentication when creating a subscription without immediate payment or updating a subscription’s payment method, allowing you to optimize for off-session payments. Learn more in the [SCA Migration Guide](https://docs.stripe.com/docs/billing/migration/strong-customer-authentication.md#scenario-2).

- `pending_update` (object, nullable)
  If specified, [pending updates](https://docs.stripe.com/docs/billing/subscriptions/pending-updates.md) that will be applied to the subscription once the `latest_invoice` has been paid.

  - `pending_update.billing_cycle_anchor` (timestamp, nullable)
    If the update is applied, determines the date of the first full invoice, and, for plans with `month` or `year` intervals, the day of the month for subsequent invoices. The timestamp is in UTC format.

  - `pending_update.discount` (object, nullable)
    The pending subscription-level discount that will be applied when the pending update is applied.

    - `pending_update.discount.id` (string)
      The ID of the discount object. Discounts can’t be fetched by ID. Use `expand[]=discounts` in API calls to expand discount IDs in an array.

    - `pending_update.discount.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `pending_update.discount.checkout_session` (string, nullable)
      The Checkout session that this coupon is applied to, if it is applied to a particular session in payment mode. Not present for subscription mode.

    - `pending_update.discount.customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The ID of the customer associated with this discount.

    - `pending_update.discount.customer_account` (string, nullable)
      The ID of the account representing the customer associated with this discount.

    - `pending_update.discount.end` (timestamp, nullable)
      If the coupon has a duration of `repeating`, the date that this discount will end. If the coupon has a duration of `once` or `forever`, this attribute will be null.

    - `pending_update.discount.invoice` (string, nullable)
      The invoice that the discount’s coupon was applied to, if it was applied directly to a particular invoice.

    - `pending_update.discount.invoice_item` (string, nullable)
      The invoice item `id` (or invoice line item `id` for invoice line items of type=‘subscription’) that the discount’s coupon was applied to, if it was applied directly to a particular invoice item or invoice line item.

    - `pending_update.discount.promotion_code` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The promotion code applied to create this discount.

    - `pending_update.discount.source` (object)
      The source of the discount.

      - `pending_update.discount.source.coupon` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The coupon that was redeemed to create this discount.

      - `pending_update.discount.source.type` (enum)
        The source type of the discount.
Possible enum values:
        - `coupon`
          Coupon source type

    - `pending_update.discount.start` (timestamp)
      Date that the coupon was applied.

    - `pending_update.discount.subscription` (string, nullable)
      The subscription that this coupon is applied to, if it is applied to a particular subscription.

    - `pending_update.discount.subscription_item` (string, nullable)
      The subscription item that this coupon is applied to, if it is applied to a particular subscription item.

  - `pending_update.discounts` (array of strings, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The discounts that will be applied to the subscription when the pending update is applied. Use `expand[]=discounts` to expand each discount.

  - `pending_update.expires_at` (timestamp)
    The point after which the changes reflected by this update will be discarded and no longer applied.

  - `pending_update.metadata` (object, nullable)
    Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

  - `pending_update.subscription_items` (array of objects, nullable)
    List of subscription items, each with an attached plan, that will be set if the update is applied.

    - `pending_update.subscription_items.id` (string)
      Unique identifier for the object.

    - `pending_update.subscription_items.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `pending_update.subscription_items.billed_until` (timestamp, nullable, expandable (can be expanded into an object with the `expand` request parameter))
      The time period the subscription item has been billed for.

    - `pending_update.subscription_items.billing_thresholds` (object, nullable)
      Define thresholds at which an invoice will be sent, and the related subscription advanced to a new billing period

      - `pending_update.subscription_items.billing_thresholds.usage_gte` (integer, nullable)
        Usage threshold that triggers the subscription to create an invoice

    - `pending_update.subscription_items.created` (integer)
      Time at which the object was created. Measured in seconds since the Unix epoch.

    - `pending_update.subscription_items.current_period_end` (timestamp)
      The end time of this subscription item’s current billing period.

    - `pending_update.subscription_items.current_period_start` (timestamp)
      The start time of this subscription item’s current billing period.

    - `pending_update.subscription_items.discounts` (array of strings, expandable (can be expanded into an object with the `expand` request parameter))
      The discounts applied to the subscription item. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.

    - `pending_update.subscription_items.metadata` (object)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

    - `pending_update.subscription_items.price` (object)
      The price the customer is subscribed to.

      - `pending_update.subscription_items.price.id` (string)
        Unique identifier for the object.

      - `pending_update.subscription_items.price.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `pending_update.subscription_items.price.active` (boolean)
        Whether the price can be used for new purchases.

      - `pending_update.subscription_items.price.billing_scheme` (enum)
        Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
Possible enum values:
        - `per_unit`
        - `tiered`

      - `pending_update.subscription_items.price.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `pending_update.subscription_items.price.currency` (enum)
        Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

      - `pending_update.subscription_items.price.currency_options` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).

        - `pending_update.subscription_items.price.currency_options.<currency>.custom_unit_amount` (object, nullable)
          When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

          - `pending_update.subscription_items.price.currency_options.<currency>.custom_unit_amount.maximum` (integer, nullable)
            The maximum unit amount the customer can specify for this item.

          - `pending_update.subscription_items.price.currency_options.<currency>.custom_unit_amount.minimum` (integer, nullable)
            The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

          - `pending_update.subscription_items.price.currency_options.<currency>.custom_unit_amount.preset` (integer, nullable)
            The starting unit amount which can be updated by the customer.

        - `pending_update.subscription_items.price.currency_options.<currency>.tax_behavior` (enum, nullable)
          Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
          - `exclusive`
          - `inclusive`
          - `unspecified`

        - `pending_update.subscription_items.price.currency_options.<currency>.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
          Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

          - `pending_update.subscription_items.price.currency_options.<currency>.tiers.flat_amount` (integer, nullable)
            Price for the entire tier.

          - `pending_update.subscription_items.price.currency_options.<currency>.tiers.flat_amount_decimal` (decimal string, nullable)
            Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

          - `pending_update.subscription_items.price.currency_options.<currency>.tiers.unit_amount` (integer, nullable)
            Per unit price for units relevant to the tier.

          - `pending_update.subscription_items.price.currency_options.<currency>.tiers.unit_amount_decimal` (decimal string, nullable)
            Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

          - `pending_update.subscription_items.price.currency_options.<currency>.tiers.up_to` (integer, nullable)
            Up to and including to this quantity will be contained in the tier.

        - `pending_update.subscription_items.price.currency_options.<currency>.unit_amount` (integer, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

        - `pending_update.subscription_items.price.currency_options.<currency>.unit_amount_decimal` (decimal string, nullable)
          The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

      - `pending_update.subscription_items.price.custom_unit_amount` (object, nullable)
        When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.

        - `pending_update.subscription_items.price.custom_unit_amount.maximum` (integer, nullable)
          The maximum unit amount the customer can specify for this item.

        - `pending_update.subscription_items.price.custom_unit_amount.minimum` (integer, nullable)
          The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.

        - `pending_update.subscription_items.price.custom_unit_amount.preset` (integer, nullable)
          The starting unit amount which can be updated by the customer.

      - `pending_update.subscription_items.price.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `pending_update.subscription_items.price.lookup_key` (string, nullable)
        A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.

      - `pending_update.subscription_items.price.metadata` (object)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `pending_update.subscription_items.price.nickname` (string, nullable)
        A brief description of the price, hidden from customers.

      - `pending_update.subscription_items.price.product` (string, expandable (can be expanded into an object with the `expand` request parameter))
        The ID of the product this price is associated with.

      - `pending_update.subscription_items.price.recurring` (object, nullable)
        The recurring components of a price such as `interval` and `usage_type`.

        - `pending_update.subscription_items.price.recurring.interval` (enum)
          The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.

        - `pending_update.subscription_items.price.recurring.interval_count` (integer)
          The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.

        - `pending_update.subscription_items.price.recurring.meter` (string, nullable)
          The meter tracking the usage of a metered price

        - `pending_update.subscription_items.price.recurring.usage_type` (enum)
          Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.

      - `pending_update.subscription_items.price.tax_behavior` (enum, nullable)
        Only required if a [default tax behavior](https://docs.stripe.com/docs/tax/products-prices-tax-categories-tax-behavior.md#setting-a-default-tax-behavior-\(recommended\)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
Possible enum values:
        - `exclusive`
        - `inclusive`
        - `unspecified`

      - `pending_update.subscription_items.price.tiers` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.

        - `pending_update.subscription_items.price.tiers.flat_amount` (integer, nullable)
          Price for the entire tier.

        - `pending_update.subscription_items.price.tiers.flat_amount_decimal` (decimal string, nullable)
          Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.

        - `pending_update.subscription_items.price.tiers.unit_amount` (integer, nullable)
          Per unit price for units relevant to the tier.

        - `pending_update.subscription_items.price.tiers.unit_amount_decimal` (decimal string, nullable)
          Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.

        - `pending_update.subscription_items.price.tiers.up_to` (integer, nullable)
          Up to and including to this quantity will be contained in the tier.

      - `pending_update.subscription_items.price.tiers_mode` (enum, nullable)
        Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.
Possible enum values:
        - `graduated`
        - `volume`

      - `pending_update.subscription_items.price.transform_quantity` (object, nullable)
        Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.

        - `pending_update.subscription_items.price.transform_quantity.divide_by` (integer)
          Divide usage by this number.

        - `pending_update.subscription_items.price.transform_quantity.round` (enum)
          After division, either round the result `up` or `down`.

      - `pending_update.subscription_items.price.type` (enum)
        One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
Possible enum values:
        - `one_time`
        - `recurring`

      - `pending_update.subscription_items.price.unit_amount` (integer, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.

      - `pending_update.subscription_items.price.unit_amount_decimal` (decimal string, nullable)
        The unit amount in the smallest currency unit to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.

    - `pending_update.subscription_items.quantity` (integer, nullable)
      The [quantity](https://docs.stripe.com/docs/subscriptions/quantities.md) of the plan to which the customer should be subscribed.

    - `pending_update.subscription_items.subscription` (string)
      The `subscription` this `subscription_item` belongs to.

    - `pending_update.subscription_items.tax_rates` (array of objects, nullable)
      The tax rates which apply to this `subscription_item`. When set, the `default_tax_rates` on the subscription do not apply to this `subscription_item`.

      - `pending_update.subscription_items.tax_rates.id` (string)
        Unique identifier for the object.

      - `pending_update.subscription_items.tax_rates.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `pending_update.subscription_items.tax_rates.active` (boolean)
        Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.

      - `pending_update.subscription_items.tax_rates.country` (string, nullable)
        Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

      - `pending_update.subscription_items.tax_rates.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `pending_update.subscription_items.tax_rates.description` (string, nullable)
        An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.

      - `pending_update.subscription_items.tax_rates.display_name` (string)
        The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.

      - `pending_update.subscription_items.tax_rates.effective_percentage` (float, nullable)
        Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage reflects the rate actually used to calculate tax based on the product’s taxability and whether the user is registered to collect taxes in the corresponding jurisdiction.

      - `pending_update.subscription_items.tax_rates.flat_amount` (object, nullable)
        The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.

        - `pending_update.subscription_items.tax_rates.flat_amount.amount` (integer)
          Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

        - `pending_update.subscription_items.tax_rates.flat_amount.currency` (string)
          Three-letter ISO currency code, in lowercase.

      - `pending_update.subscription_items.tax_rates.inclusive` (boolean)
        This specifies if the tax rate is inclusive or exclusive.

      - `pending_update.subscription_items.tax_rates.jurisdiction` (string, nullable)
        The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.

      - `pending_update.subscription_items.tax_rates.jurisdiction_level` (enum, nullable)
        The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.
Possible enum values:
        - `city`
        - `country`
        - `county`
        - `district`
        - `multiple`
        - `state`

      - `pending_update.subscription_items.tax_rates.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `pending_update.subscription_items.tax_rates.metadata` (object, nullable)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `pending_update.subscription_items.tax_rates.percentage` (float)
        Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.

      - `pending_update.subscription_items.tax_rates.rate_type` (enum, nullable)
        Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.
Possible enum values:
        - `flat_amount`
          A fixed amount applied as tax, regardless of the taxable amount, such as a retail delivery fee.

        - `percentage`
          A tax rate expressed as a percentage of the taxable amount, such as the sales tax rate in California.

      - `pending_update.subscription_items.tax_rates.state` (string, nullable)
        [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, “NY” for New York, United States.

      - `pending_update.subscription_items.tax_rates.tax_type` (enum, nullable)
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

  - `pending_update.trial_end` (timestamp, nullable)
    Unix timestamp representing the end of the trial period the customer will get before being charged for the first time, if the update is applied.

  - `pending_update.trial_from_plan` (boolean, nullable)
    Indicates if a plan’s `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://docs.stripe.com/docs/billing/subscriptions/trials.md) to learn more.

- `presentment_details` (object, nullable)
  A hash containing information about the currency presented to the customer.

  - `presentment_details.presentment_currency` (string)
    Currency used for customer payments.

- `schedule` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The schedule attached to the subscription

- `start_date` (timestamp)
  Date when the subscription was first created. The date might differ from the `created` date due to backdating.

- `status` (enum)
  Possible values are `incomplete`, `incomplete_expired`, `trialing`, `active`, `past_due`, `canceled`, `unpaid`, or `paused`.

  For `collection_method=charge_automatically` a subscription moves into `incomplete` if the initial payment attempt fails. A subscription in this status can only have metadata and default_source updated. Once the first invoice is paid, the subscription moves into an `active` status. If the first invoice is not paid within 23 hours, the subscription transitions to `incomplete_expired`. This is a terminal status, the open invoice will be voided and no further invoices will be generated.

  A subscription that is currently in a trial period is `trialing` and moves to `active` when the trial period is over.

  A subscription can only enter a `paused` status [when a trial ends without a payment method](https://docs.stripe.com/docs/billing/subscriptions/trials.md#create-free-trials-without-payment). A `paused` subscription doesn’t generate invoices and can be resumed after your customer adds their payment method. The `paused` status is different from [pausing collection](https://docs.stripe.com/docs/billing/subscriptions/pause-payment.md), which still generates invoices and leaves the subscription’s status unchanged.

  If subscription `collection_method=charge_automatically`, it becomes `past_due` when payment is required but cannot be paid (due to failed payment or awaiting additional user actions). Once Stripe has exhausted all payment retry attempts, the subscription will become `canceled` or `unpaid` (depending on your subscriptions settings).

  If subscription `collection_method=send_invoice` it becomes `past_due` when its invoice is not paid by the due date, and `canceled` or `unpaid` if it is still not paid by an additional deadline after that. Note that when a subscription has a status of `unpaid`, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed). After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.

- `test_clock` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the test clock this subscription belongs to.

- `transfer_data` (object, nullable)
  The account (if any) the subscription’s payments will be attributed to for tax reporting, and where funds from each payment will be transferred to for each of the subscription’s invoices.

  - `transfer_data.amount_percent` (float, nullable)
    A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the destination account. By default, the entire amount is transferred to the destination.

  - `transfer_data.destination` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The account where funds from the payment will be transferred to upon payment success.

- `trial_end` (timestamp, nullable)
  If the subscription has a trial, the end of that trial.

- `trial_settings` (object, nullable)
  Settings related to subscription trials.

  - `trial_settings.end_behavior` (object)
    Defines how the subscription should behave when the user’s trial ends.

    - `trial_settings.end_behavior.missing_payment_method` (enum)
      Indicates how the subscription should change when the trial ends if the user did not provide a payment method.
Possible enum values:
      - `cancel`
        Cancel the subscription if a payment method is not attached when the trial ends.

      - `create_invoice`
        Create an invoice when the trial ends, even if the user did not set up a payment method.

      - `pause`
        Pause the subscription if a payment method is not attached when the trial ends.

- `trial_start` (timestamp, nullable)
  If the subscription has a trial, the beginning of that trial.
