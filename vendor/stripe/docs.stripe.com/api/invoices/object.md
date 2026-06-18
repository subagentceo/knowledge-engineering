# The Invoice object

### The Invoice object

```json
{
  "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
  "object": "invoice",
  "account_country": "US",
  "account_name": "Stripe Docs",
  "account_tax_ids": null,
  "amount_due": 0,
  "amount_paid": 0,
  "amount_overpaid": 0,
  "amount_remaining": 0,
  "amount_shipping": 0,
  "application": null,
  "attempt_count": 0,
  "attempted": false,
  "auto_advance": false,
  "automatic_tax": {
    "enabled": false,
    "liability": null,
    "status": null
  },
  "billing_reason": "manual",
  "collection_method": "charge_automatically",
  "created": 1680644467,
  "currency": "usd",
  "custom_fields": null,
  "customer": "cus_NeZwdNtLEOXuvB",
  "customer_address": null,
  "customer_email": "jennyrosen@example.com",
  "customer_name": "Jenny Rosen",
  "customer_phone": null,
  "customer_shipping": null,
  "customer_tax_exempt": "none",
  "customer_tax_ids": [],
  "confirmation_secret": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discounts": [],
  "due_date": null,
  "ending_balance": null,
  "footer": null,
  "from_invoice": null,
  "hosted_invoice_url": null,
  "invoice_pdf": null,
  "issuer": {
    "type": "self"
  },
  "last_finalization_error": null,
  "latest_revision": null,
  "lines": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/invoices/in_1MtHbELkdIwHu7ixl4OzzPMv/lines"
  },
  "payments": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/invoice_payments"
  },
  "livemode": false,
  "metadata": {},
  "next_payment_attempt": null,
  "number": null,
  "on_behalf_of": null,
  "parent": null,
  "payment_settings": {
    "default_mandate": null,
    "payment_method_options": null,
    "payment_method_types": null
  },
  "period_end": 1680644467,
  "period_start": 1680644467,
  "post_payment_credit_notes_amount": 0,
  "pre_payment_credit_notes_amount": 0,
  "receipt_number": null,
  "shipping_cost": null,
  "shipping_details": null,
  "starting_balance": 0,
  "statement_descriptor": null,
  "status": "draft",
  "status_transitions": {
    "finalized_at": null,
    "marked_uncollectible_at": null,
    "paid_at": null,
    "voided_at": null
  },
  "subtotal": 0,
  "subtotal_excluding_tax": 0,
  "test_clock": null,
  "total": 0,
  "total_discount_amounts": [],
  "total_excluding_tax": 0,
  "total_taxes": [],
  "transfer_data": null,
  "webhooks_delivered_at": 1680644467
}
```

## Attributes

- `id` (string)
  Unique identifier for the object. For preview invoices created using the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint, this id will be prefixed with `upcoming_in`.

- `object` (string)
  String representing the object’s type. Objects of the same type share the same value.

- `account_country` (string, nullable)
  The country of the business associated with this invoice, most often the business creating the invoice.

- `account_name` (string, nullable)
  The public name of the business associated with this invoice, most often the business creating the invoice.

- `account_tax_ids` (array of strings, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The account tax IDs associated with the invoice. Only editable when the invoice is a draft.

- `amount_due` (integer)
  Final amount due at this time for this invoice. If the invoice’s total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`.

- `amount_overpaid` (integer)
  Amount that was overpaid on the invoice. The amount overpaid is credited to the customer’s credit balance.

- `amount_paid` (integer)
  The amount, in the smallest currency unit, that was paid.

- `amount_paid_off_stripe` (integer, expandable (can be expanded into an object with the `expand` request parameter))
  Amount, in the smallest currency unit, that was paid on the invoice outside of Stripe.

- `amount_remaining` (integer)
  The difference between amount_due and amount_paid, in the smallest currency unit.

- `amount_shipping` (integer)
  This is the sum of all the shipping amounts.

- `application` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the Connect Application that created the invoice.

- `attempt_count` (integer)
  Number of payment attempts made for this invoice, from the perspective of the payment retry schedule. Any payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule. If a failure is returned with a non-retryable return code, the invoice can no longer be retried unless a new payment method is obtained. Retries will continue to be scheduled, and attempt_count will continue to increment, but retries will only be executed if a new payment method is obtained.

- `attempted` (boolean)
  Whether an attempt has been made to pay the invoice. An invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users.

- `auto_advance` (boolean)
  Controls whether Stripe performs [automatic collection](https://docs.stripe.com/docs/invoicing/integration/automatic-advancement-collection.md) of the invoice. If `false`, the invoice’s state doesn’t automatically advance without an explicit action.

- `automatic_tax` (object)
  Settings and latest results for automatic tax lookup for this invoice.

  - `automatic_tax.disabled_reason` (enum, nullable)
    If Stripe disabled automatic tax, this enum describes why.
Possible enum values:
    - `finalization_requires_location_inputs`
      Stripe’s systems automatically turned off Tax for this invoice when finalizing it with a missing or incomplete location for your customer.

    - `finalization_system_error`
      Stripe’s systems automatically turned off Tax for this invoice due to an internal outage during tax calculation. We expect this to be very rare. Contact support for additional assistance.

  - `automatic_tax.enabled` (boolean)
    Whether Stripe automatically computes tax on this invoice. Note that incompatible invoice items (invoice items with manually specified [tax rates](https://docs.stripe.com/docs/api/tax_rates.md), negative amounts, or `tax_behavior=unspecified`) cannot be added to automatic tax invoices.

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

  - `automatic_tax.provider` (string, nullable)
    The tax provider powering automatic tax.

  - `automatic_tax.status` (enum, nullable)
    The status of the most recent automated tax calculation for this invoice.
Possible enum values:
    - `complete`
      The automatic tax calculation was successful.

    - `failed`
      The tax calculation failed, please try again later.

    - `requires_location_inputs`
      The location details supplied on the customer aren’t valid or don’t provide enough location information to accurately determine tax rates for the customer.

- `automatically_finalizes_at` (timestamp, nullable)
  The time when this invoice is currently scheduled to be automatically finalized. The field will be `null` if the invoice is not scheduled to finalize in the future. If the invoice is not in the draft state, this field will always be `null` - see `finalized_at` for the time when an already-finalized invoice was finalized.

- `billing_reason` (enum, nullable)
  Indicates the reason why the invoice was created.

  - `manual`: Unrelated to a subscription, for example, created via the invoice editor.
  - `subscription`: No longer in use. Applies to subscriptions from before May 2018 where no distinction was made between updates, cycles, and thresholds.
  - `subscription_create`: A new subscription was created.
  - `subscription_cycle`: A subscription advanced into a new period.
  - `subscription_threshold`: A subscription reached a billing threshold.
  - `subscription_update`: A subscription was updated.
  - `upcoming`: Reserved for upcoming invoices created through the Create Preview Invoice API or when an `invoice.upcoming` event is generated for an upcoming invoice on a subscription.
Possible enum values:
  - `automatic_pending_invoice_item_invoice`
  - `manual`
  - `quote_accept`
  - `subscription`
  - `subscription_create`
  - `subscription_cycle`
  - `subscription_threshold`
  - `subscription_update`
  - `upcoming`

- `collection_method` (enum)
  Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions.
Possible enum values:
  - `charge_automatically`
    Attempt payment using the default source attached to the customer.

  - `send_invoice`
    Email payment instructions to the customer.

- `confirmation_secret` (object, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The confirmation secret associated with this invoice. Currently, this contains the client_secret of the PaymentIntent that Stripe creates during invoice finalization.

  - `confirmation_secret.client_secret` (string)
    The client_secret of the payment that Stripe creates for the invoice after finalization.

  - `confirmation_secret.type` (string)
    The type of client_secret. Currently this is always payment_intent, referencing the default payment_intent that Stripe creates during invoice finalization

- `created` (timestamp)
  Time at which the object was created. Measured in seconds since the Unix epoch.

- `currency` (enum)
  Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

- `custom_fields` (array of objects, nullable)
  Custom fields displayed on the invoice.

  - `custom_fields.name` (string)
    The name of the custom field.

  - `custom_fields.value` (string)
    The value of the custom field.

- `customer` (string, expandable (can be expanded into an object with the `expand` request parameter))
  The ID of the customer to bill.

- `customer_account` (string, nullable)
  The ID of the account representing the customer to bill.

- `customer_address` (object, nullable)
  The customer’s address. Until the invoice is finalized, this field will equal `customer.address`. Once the invoice is finalized, this field will no longer be updated.

  - `customer_address.city` (string, nullable)
    City, district, suburb, town, or village.

  - `customer_address.country` (string, nullable)
    Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

  - `customer_address.line1` (string, nullable)
    Address line 1, such as the street, PO Box, or company name.

  - `customer_address.line2` (string, nullable)
    Address line 2, such as the apartment, suite, unit, or building.

  - `customer_address.postal_code` (string, nullable)
    ZIP or postal code.

  - `customer_address.state` (string, nullable)
    State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

- `customer_email` (string, nullable)
  The customer’s email. Until the invoice is finalized, this field will equal `customer.email`. Once the invoice is finalized, this field will no longer be updated.

- `customer_name` (string, nullable)
  The customer’s name. Until the invoice is finalized, this field will equal `customer.name`. Once the invoice is finalized, this field will no longer be updated.

- `customer_phone` (string, nullable)
  The customer’s phone number. Until the invoice is finalized, this field will equal `customer.phone`. Once the invoice is finalized, this field will no longer be updated.

- `customer_shipping` (object, nullable)
  The customer’s shipping information. Until the invoice is finalized, this field will equal `customer.shipping`. Once the invoice is finalized, this field will no longer be updated.

  - `customer_shipping.address` (object)
    Customer shipping address.

    - `customer_shipping.address.city` (string, nullable)
      City, district, suburb, town, or village.

    - `customer_shipping.address.country` (string, nullable)
      Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

    - `customer_shipping.address.line1` (string, nullable)
      Address line 1, such as the street, PO Box, or company name.

    - `customer_shipping.address.line2` (string, nullable)
      Address line 2, such as the apartment, suite, unit, or building.

    - `customer_shipping.address.postal_code` (string, nullable)
      ZIP or postal code.

    - `customer_shipping.address.state` (string, nullable)
      State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

  - `customer_shipping.name` (string)
    Customer name.

  - `customer_shipping.phone` (string, nullable)
    Customer phone (including extension).

- `customer_tax_exempt` (enum, nullable)
  The customer’s tax exempt status. Until the invoice is finalized, this field will equal `customer.tax_exempt`. Once the invoice is finalized, this field will no longer be updated.
Possible enum values:
  - `exempt`
  - `none`
  - `reverse`

- `customer_tax_ids` (array of objects, nullable)
  The customer’s tax IDs. Until the invoice is finalized, this field will contain the same tax IDs as `customer.tax_ids`. Once the invoice is finalized, this field will no longer be updated.

  - `customer_tax_ids.type` (enum)
    The type of the tax ID, one of `ad_nrt`, `ar_cuit`, `eu_vat`, `bo_tin`, `br_cnpj`, `br_cpf`, `cn_tin`, `co_nit`, `cr_tin`, `do_rcn`, `ec_ruc`, `eu_oss_vat`, `hr_oib`, `pe_ruc`, `ro_tin`, `rs_pib`, `sv_nit`, `uy_ruc`, `ve_rif`, `vn_tin`, `gb_vat`, `nz_gst`, `au_abn`, `au_arn`, `in_gst`, `no_vat`, `no_voec`, `za_vat`, `ch_vat`, `mx_rfc`, `sg_uen`, `ru_inn`, `ru_kpp`, `ca_bn`, `hk_br`, `es_cif`, `pl_nip`, `it_cf`, `fo_vat`, `gi_tin`, `py_ruc`, `tw_vat`, `th_vat`, `jp_cn`, `jp_rn`, `jp_trn`, `li_uid`, `li_vat`, `lk_vat`, `my_itn`, `us_ein`, `kr_brn`, `ca_qst`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `my_sst`, `sg_gst`, `ae_trn`, `cl_tin`, `sa_vat`, `id_npwp`, `my_frp`, `il_vat`, `ge_vat`, `ua_vat`, `is_vat`, `bg_uic`, `hu_tin`, `si_tin`, `ke_pin`, `tr_tin`, `eg_tin`, `ph_tin`, `al_tin`, `bh_vat`, `kz_bin`, `ng_tin`, `om_vat`, `de_stn`, `ch_uid`, `tz_vat`, `uz_vat`, `uz_tin`, `md_vat`, `ma_vat`, `by_tin`, `ao_tin`, `bs_tin`, `bb_tin`, `cd_nif`, `mr_nif`, `me_pib`, `zw_tin`, `ba_tin`, `gn_nif`, `mk_vat`, `sr_fin`, `sn_ninea`, `am_tin`, `np_pan`, `tj_tin`, `ug_tin`, `zm_tin`, `kh_tin`, `aw_tin`, `az_tin`, `bd_bin`, `bj_ifu`, `et_tin`, `kg_tin`, `la_tin`, `cm_niu`, `cv_nif`, `bf_ifu`, or `unknown`
Possible enum values:
    - `ad_nrt`
    - `ae_trn`
    - `al_tin`
    - `am_tin`
    - `ao_tin`
    - `ar_cuit`
    - `au_abn`
    - `au_arn`
    - `aw_tin`
    - `az_tin`
    - `ba_tin`
    - `bb_tin`
    - `bd_bin`
    - `bf_ifu`
    - `bg_uic`
    - `bh_vat`
    - `bj_ifu`
    - `bo_tin`
    - `br_cnpj`
    - `br_cpf`
    - `bs_tin`
    - `by_tin`
    - `ca_bn`
    - `ca_gst_hst`
    - `ca_pst_bc`
    - `ca_pst_mb`
    - `ca_pst_sk`
    - `ca_qst`
    - `cd_nif`
    - `ch_uid`
    - `ch_vat`
    - `cl_tin`
    - `cm_niu`
    - `cn_tin`
    - `co_nit`
    - `cr_tin`
    - `cv_nif`
    - `de_stn`
    - `do_rcn`
    - `ec_ruc`
    - `eg_tin`
    - `es_cif`
    - `et_tin`
    - `eu_oss_vat`
    - `eu_vat`
    - `fo_vat`
    - `gb_vat`
    - `ge_vat`
    - `gi_tin`
    - `gn_nif`
    - `hk_br`
    - `hr_oib`
    - `hu_tin`
    - `id_npwp`
    - `il_vat`
    - `in_gst`
    - `is_vat`
    - `it_cf`
    - `jp_cn`
    - `jp_rn`
    - `jp_trn`
    - `ke_pin`
    - `kg_tin`
    - `kh_tin`
    - `kr_brn`
    - `kz_bin`
    - `la_tin`
    - `li_uid`
    - `li_vat`
    - `lk_vat`
    - `ma_vat`
    - `md_vat`
    - `me_pib`
    - `mk_vat`
    - `mr_nif`
    - `mx_rfc`
    - `my_frp`
    - `my_itn`
    - `my_sst`
    - `ng_tin`
    - `no_vat`
    - `no_voec`
    - `np_pan`
    - `nz_gst`
    - `om_vat`
    - `pe_ruc`
    - `ph_tin`
    - `pl_nip`
    - `py_ruc`
    - `ro_tin`
    - `rs_pib`
    - `ru_inn`
    - `ru_kpp`
    - `sa_vat`
    - `sg_gst`
    - `sg_uen`
    - `si_tin`
    - `sn_ninea`
    - `sr_fin`
    - `sv_nit`
    - `th_vat`
    - `tj_tin`
    - `tr_tin`
    - `tw_vat`
    - `tz_vat`
    - `ua_vat`
    - `ug_tin`
    - `unknown`
    - `us_ein`
    - `uy_ruc`
    - `uz_tin`
    - `uz_vat`
    - `ve_rif`
    - `vn_tin`
    - `za_vat`
    - `zm_tin`
    - `zw_tin`

  - `customer_tax_ids.value` (string, nullable)
    The value of the tax ID.

- `default_payment_method` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription’s default payment method, if any, or to the default payment method in the customer’s invoice settings.

- `default_source` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription’s default source, if any, or to the customer’s default source.

- `default_tax_rates` (array of objects)
  The tax rates applied to this invoice, if any.

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
  An arbitrary string attached to the object. Often useful for displaying to users. Referenced as ‘memo’ in the Dashboard.

- `discounts` (array of strings, expandable (can be expanded into an object with the `expand` request parameter))
  The discounts applied to the invoice. Line item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.

- `due_date` (timestamp, nullable)
  The date on which payment for this invoice is due. This value will be `null` for invoices where `collection_method=charge_automatically`.

- `effective_at` (timestamp, nullable)
  The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated ‘Date of issue’ printed on the invoice PDF and receipt.

- `ending_balance` (integer, nullable)
  Ending customer balance after the invoice is finalized. Invoices are finalized approximately an hour after successful webhook delivery or when payment collection is attempted for the invoice. If the invoice has not been finalized yet, this will be null.

- `footer` (string, nullable)
  Footer displayed on the invoice.

- `from_invoice` (object, nullable)
  Details of the invoice that was cloned. See the [revision documentation](https://docs.stripe.com/docs/invoicing/invoice-revisions.md) for more details.

  - `from_invoice.action` (string)
    The relation between this invoice and the cloned invoice

  - `from_invoice.invoice` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The invoice that was cloned.

- `hosted_invoice_url` (string, nullable)
  The URL for the hosted invoice page, which allows customers to view and pay an invoice. If the invoice has not been finalized yet, this will be null.

- `invoice_pdf` (string, nullable)
  The link to download the PDF for the invoice. If the invoice has not been finalized yet, this will be null.

- `issuer` (object)
  The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.

  - `issuer.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The connected account being referenced when `type` is `account`.

  - `issuer.type` (enum)
    Type of the account referenced.
Possible enum values:
    - `account`
      Indicates that the account being referenced is a connected account which is different from the account making the API request but related to it.

    - `self`
      Indicates that the account being referenced is the account making the API request.

- `last_finalization_error` (object, nullable)
  The error encountered during the previous attempt to finalize the invoice. This field is cleared when the invoice is successfully finalized.

  - `last_finalization_error.advice_code` (string, nullable)
    For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://docs.stripe.com/docs/declines.md#retrying-issuer-declines) if they provide one.

  - `last_finalization_error.code` (string, nullable)
    For some errors that could be handled programmatically, a short string indicating the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

  - `last_finalization_error.doc_url` (string, nullable)
    A URL to more information about the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

  - `last_finalization_error.message` (string, nullable)
    A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.

  - `last_finalization_error.network_advice_code` (string, nullable)
    For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.

  - `last_finalization_error.network_decline_code` (string, nullable)
    For payments declined by the network, an alphanumeric code which indicates the reason the payment failed.

  - `last_finalization_error.param` (string, nullable)
    If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.

  - `last_finalization_error.payment_method_type` (string, nullable)
    If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.

  - `last_finalization_error.type` (enum)
    The type of error returned. One of `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`
Possible enum values:
    - `api_error`
    - `card_error`
    - `idempotency_error`
    - `invalid_request_error`

- `latest_revision` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The ID of the most recent non-draft revision of this invoice

- `lines` (object)
  The individual line items that make up the invoice. `lines` is sorted as follows: (1) pending invoice items (including prorations) in reverse chronological order, (2) subscription items in reverse chronological order, and (3) invoice items added after invoice creation in chronological order.

  - `lines.object` (string)
    String representing the object’s type. Objects of the same type share the same value. Always has the value `list`.

  - `lines.data` (array of objects)
    Details about each object.

    - `lines.data.id` (string)
      Unique identifier for the object.

    - `lines.data.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `lines.data.amount` (integer)
      The amount, in the smallest currency unit.

    - `lines.data.currency` (enum)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

    - `lines.data.description` (string, nullable)
      An arbitrary string attached to the object. Often useful for displaying to users.

    - `lines.data.discount_amounts` (array of objects, nullable)
      The amount of discount calculated per discount for this line item.

      - `lines.data.discount_amounts.amount` (integer)
        The amount, in the smallest currency unit, of the discount.

      - `lines.data.discount_amounts.discount` (string, expandable (can be expanded into an object with the `expand` request parameter))
        The discount that was applied to get this discount amount.

    - `lines.data.discountable` (boolean)
      If true, discounts will apply to this line item. Always false for prorations.

    - `lines.data.discounts` (array of strings, expandable (can be expanded into an object with the `expand` request parameter))
      The discounts applied to the invoice line item. Line item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.

    - `lines.data.invoice` (string, nullable)
      The ID of the invoice that contains this line item.

    - `lines.data.livemode` (boolean)
      If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

    - `lines.data.metadata` (object)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Note that for line items with `type=subscription`, `metadata` reflects the current metadata from the subscription associated with the line item, unless the invoice line was directly updated with different metadata after creation.

    - `lines.data.parent` (object, nullable)
      The parent that generated this line item.

      - `lines.data.parent.invoice_item_details` (object, nullable)
        Details about the invoice item that generated this line item

        - `lines.data.parent.invoice_item_details.invoice_item` (string)
          The invoice item that generated this line item

        - `lines.data.parent.invoice_item_details.proration` (boolean)
          Whether this is a proration

        - `lines.data.parent.invoice_item_details.proration_details` (object, nullable)
          Additional details for proration line items

          - `lines.data.parent.invoice_item_details.proration_details.credited_items` (object, nullable)
            For a credit proration `line_item`, the original debit line_items to which the credit proration applies.

            - `lines.data.parent.invoice_item_details.proration_details.credited_items.invoice` (string)
              Invoice containing the credited invoice line items

            - `lines.data.parent.invoice_item_details.proration_details.credited_items.invoice_line_items` (array of strings)
              Credited invoice line items

        - `lines.data.parent.invoice_item_details.subscription` (string, nullable)
          The subscription that the invoice item belongs to

      - `lines.data.parent.subscription_item_details` (object, nullable)
        Details about the subscription item that generated this line item

        - `lines.data.parent.subscription_item_details.invoice_item` (string, nullable)
          The invoice item that generated this line item

        - `lines.data.parent.subscription_item_details.proration` (boolean)
          Whether this is a proration

        - `lines.data.parent.subscription_item_details.proration_details` (object, nullable)
          Additional details for proration line items

          - `lines.data.parent.subscription_item_details.proration_details.credited_items` (object, nullable)
            For a credit proration `line_item`, the original debit line_items to which the credit proration applies.

            - `lines.data.parent.subscription_item_details.proration_details.credited_items.invoice` (string)
              Invoice containing the credited invoice line items

            - `lines.data.parent.subscription_item_details.proration_details.credited_items.invoice_line_items` (array of strings)
              Credited invoice line items

        - `lines.data.parent.subscription_item_details.subscription` (string, nullable)
          The subscription that the subscription item belongs to

        - `lines.data.parent.subscription_item_details.subscription_item` (string)
          The subscription item that generated this line item

      - `lines.data.parent.type` (enum)
        The type of parent that generated this line item
Possible enum values:
        - `invoice_item_details`
          Details of the parent can be found in the `invoice_item_details` hash.

        - `subscription_item_details`
          Details of the parent can be found in the `subscription_item_details` hash.

    - `lines.data.period` (object)
      The period this `line_item` covers. For subscription line items, this is the subscription period. For prorations, this starts when the proration was calculated, and ends at the period end of the subscription. For invoice items, this is the time at which the invoice item was created or the period of the item. If you have [Stripe Revenue Recognition](https://docs.stripe.com/docs/revenue-recognition.md) enabled, the period will be used to recognize and defer revenue. See the [Revenue Recognition documentation](https://docs.stripe.com/docs/revenue-recognition/methodology/subscriptions-and-invoicing.md) for details.

      - `lines.data.period.end` (timestamp)
        The end of the period, which must be greater than or equal to the start. This value is inclusive.

      - `lines.data.period.start` (timestamp)
        The start of the period. This value is inclusive.

    - `lines.data.pretax_credit_amounts` (array of objects, nullable)
      Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to this line item.

      - `lines.data.pretax_credit_amounts.amount` (integer)
        The amount, in the smallest currency unit, of the pretax credit amount.

      - `lines.data.pretax_credit_amounts.credit_balance_transaction` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The credit balance transaction that was applied to get this pretax credit amount.

      - `lines.data.pretax_credit_amounts.discount` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        The discount that was applied to get this pretax credit amount.

      - `lines.data.pretax_credit_amounts.type` (enum)
        Type of the pretax credit amount referenced.
Possible enum values:
        - `credit_balance_transaction`
          The pretax credit amount is from a credit balance transaction.

        - `discount`
          The pretax credit amount is from a discount.

    - `lines.data.pricing` (object, nullable)
      The pricing information of the line item.

      - `lines.data.pricing.price_details` (object, nullable)
        Additional details about the price this item is associated with. This is present only when the `type` is `price_details`

        - `lines.data.pricing.price_details.price` (string, expandable (can be expanded into an object with the `expand` request parameter))
          The ID of the price this item is associated with.

        - `lines.data.pricing.price_details.product` (string)
          The ID of the product this item is associated with.

      - `lines.data.pricing.type` (enum)
        The type of the pricing details.
Possible enum values:

      - `lines.data.pricing.unit_amount_decimal` (decimal string, nullable)
        The unit amount (in the `currency` specified) of the item which contains a decimal value with at most 12 decimal places.

    - `lines.data.quantity` (integer, nullable)
      Quantity of units for the invoice line item in integer format, with any decimal precision truncated. For the line item’s full-precision decimal quantity, use `quantity_decimal`. This field will be deprecated in favor of `quantity_decimal` in a future version. If the line item is a proration or subscription, the quantity of the subscription that the proration was computed for.

    - `lines.data.quantity_decimal` (decimal string, nullable)
      Non-negative decimal with at most 12 decimal places. The quantity of units for the line item.

    - `lines.data.subtotal` (integer)
      The subtotal of the line item, in the smallest currency unit, before any discounts or taxes.

    - `lines.data.taxes` (array of objects, nullable)
      The tax information of the line item.

      - `lines.data.taxes.amount` (integer)
        The amount of the tax, in the smallest currency unit.

      - `lines.data.taxes.tax_behavior` (enum)
        Whether this tax is inclusive or exclusive.
Possible enum values:
        - `exclusive`
        - `inclusive`

      - `lines.data.taxes.tax_rate_details` (object, nullable)
        Additional details about the tax rate. Only present when `type` is `tax_rate_details`.

        - `lines.data.taxes.tax_rate_details.tax_rate` (string, expandable (can be expanded into an object with the `expand` request parameter))
          ID of the tax rate

      - `lines.data.taxes.taxability_reason` (enum)
        The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.
Possible enum values:
        - `customer_exempt`
          No tax is applied as the customer is exempt from tax.

        - `not_available`
          The reasoning behind this tax is not available.

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

      - `lines.data.taxes.taxable_amount` (integer, nullable)
        The amount on which tax is calculated, in the smallest currency unit.

      - `lines.data.taxes.type` (enum)
        The type of tax information.

  - `lines.has_more` (boolean)
    True if this list has another page of items after this one that can be fetched.

  - `lines.url` (string)
    The URL where this list can be accessed.

- `livemode` (boolean)
  If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

- `metadata` (object, nullable)
  Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

- `next_payment_attempt` (timestamp, nullable)
  The time at which payment will next be attempted. This value will be `null` for invoices where `collection_method=send_invoice`.

- `number` (string, nullable)
  A unique, identifying string that appears on emails sent to the customer for this invoice. This starts with the customer’s unique invoice_prefix if it is specified.

- `on_behalf_of` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/docs/billing/invoices/connect.md) documentation for details.

- `parent` (object, nullable)
  The parent that generated this invoice

  - `parent.quote_details` (object, nullable)
    Details about the quote that generated this invoice

    - `parent.quote_details.quote` (string)
      The quote that generated this invoice

  - `parent.subscription_details` (object, nullable)
    Details about the subscription that generated this invoice

    - `parent.subscription_details.metadata` (object, nullable)
      Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) defined as subscription metadata when an invoice is created. Becomes an immutable snapshot of the subscription metadata at the time of invoice finalization. *Note: This attribute is populated only for invoices created on or after June 29, 2023.*

    - `parent.subscription_details.subscription` (string, expandable (can be expanded into an object with the `expand` request parameter))
      The subscription that generated this invoice

    - `parent.subscription_details.subscription_proration_date` (timestamp, nullable)
      Only set for upcoming invoices that preview prorations. The time used to calculate prorations.

  - `parent.type` (enum)
    The type of parent that generated this invoice
Possible enum values:
    - `quote_details`
      Details of the parent can be found in the `quote_details` hash.

    - `subscription_details`
      Details of the parent can be found in the `subscription_details` hash.

- `payment_settings` (object)
  Configuration settings for the PaymentIntent that is generated when the invoice is finalized.

  - `payment_settings.default_mandate` (string, nullable)
    ID of the mandate to be used for this invoice. It must correspond to the payment method used to pay the invoice, including the invoice’s default_payment_method or default_source, if set.

  - `payment_settings.payment_method_options` (object, nullable)
    Payment-method-specific configuration to provide to the invoice’s PaymentIntent.

    - `payment_settings.payment_method_options.acss_debit` (object, nullable)
      If paying by `acss_debit`, this sub-hash contains details about the Canadian pre-authorized debit payment method options to pass to the invoice’s PaymentIntent.

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
      If paying by `bancontact`, this sub-hash contains details about the Bancontact payment method options to pass to the invoice’s PaymentIntent.

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
      If paying by `card`, this sub-hash contains details about the Card payment method options to pass to the invoice’s PaymentIntent.

      - `payment_settings.payment_method_options.card.installments` (object, nullable)
        Installment details for this Invoice.

        For more information, see the [installments integration guide](https://docs.stripe.com/docs/payments/installments.md).

        - `payment_settings.payment_method_options.card.installments.enabled` (boolean, nullable)
          Whether Installments are enabled for this Invoice.

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
      If paying by `customer_balance`, this sub-hash contains details about the Bank transfer payment method options to pass to the invoice’s PaymentIntent.

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
      If paying by `konbini`, this sub-hash contains details about the Konbini payment method options to pass to the invoice’s PaymentIntent.

    - `payment_settings.payment_method_options.payto` (object, nullable)
      If paying by `payto`, this sub-hash contains details about the PayTo payment method options to pass to the invoice’s PaymentIntent.

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
      If paying by `pix`, this sub-hash contains details about the Pix payment method options to pass to the invoice’s PaymentIntent.

      - `payment_settings.payment_method_options.pix.amount_includes_iof` (enum, nullable)
        Determines if the amount includes the IOF tax.
Possible enum values:
        - `always`
          The IOF tax is included in the amount.

        - `never`
          The IOF tax is not included in the amount.

      - `payment_settings.payment_method_options.pix.expires_after_seconds` (integer, nullable)
        The number of seconds (between 10 and 1209600) after which Pix payment will expire. Defaults to 86400 seconds.

    - `payment_settings.payment_method_options.sepa_debit` (object, nullable)
      If paying by `sepa_debit`, this sub-hash contains details about the SEPA Direct Debit payment method options to pass to the invoice’s PaymentIntent.

    - `payment_settings.payment_method_options.upi` (object, nullable)
      If paying by `upi`, this sub-hash contains details about the UPI payment method options to pass to the invoice’s PaymentIntent.

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
      If paying by `us_bank_account`, this sub-hash contains details about the ACH direct debit payment method options to pass to the invoice’s PaymentIntent.

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
    The list of payment method types (e.g. card) to provide to the invoice’s PaymentIntent. If not set, Stripe attempts to automatically determine the types to use by looking at the invoice’s default payment method, the subscription’s default payment method, the customer’s default payment method, and your [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).
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

- `payments` (object, expandable (can be expanded into an object with the `expand` request parameter))
  Payments for this invoice. Use [invoice payment](https://docs.stripe.com/api/invoice-payment.md) to get more details.

  - `payments.object` (string)
    String representing the object’s type. Objects of the same type share the same value. Always has the value `list`.

  - `payments.data` (array of objects)
    Details about each object.

    - `payments.data.id` (string)
      Unique identifier for the object.

    - `payments.data.object` (string)
      String representing the object’s type. Objects of the same type share the same value.

    - `payments.data.amount_paid` (integer, nullable)
      Amount that was actually paid for this invoice, in the smallest currency unit. This field is null until the payment is `paid`. This amount can be less than the `amount_requested` if the PaymentIntent’s `amount_received` is not sufficient to pay all of the invoices that it is attached to.

    - `payments.data.amount_requested` (integer)
      Amount intended to be paid toward this invoice, in the smallest currency unit

    - `payments.data.created` (timestamp)
      Time at which the object was created. Measured in seconds since the Unix epoch.

    - `payments.data.currency` (string)
      Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).

    - `payments.data.invoice` (string, expandable (can be expanded into an object with the `expand` request parameter))
      The invoice that was paid.

    - `payments.data.is_default` (boolean)
      Stripe automatically creates a default InvoicePayment when the invoice is finalized, and keeps it synchronized with the invoice’s `amount_remaining`. The PaymentIntent associated with the default payment can’t be edited or canceled directly.

    - `payments.data.livemode` (boolean)
      If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

    - `payments.data.payment` (object)
      The details on the payment.

      - `payments.data.payment.charge` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        ID of the successful charge for this payment when `type` is `charge`.Note: charge is only surfaced if the charge object is not associated with a payment intent. If the charge object does have a payment intent, the Invoice Payment surfaces the payment intent instead.

      - `payments.data.payment.payment_intent` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        ID of the PaymentIntent associated with this payment when `type` is `payment_intent`. Note: This property is only populated for invoices finalized on or after March 15th, 2019.

      - `payments.data.payment.payment_record` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
        ID of the PaymentRecord associated with this payment when `type` is `payment_record`.

      - `payments.data.payment.type` (enum)
        Type of payment object associated with this invoice payment.
Possible enum values:
        - `charge`
        - `payment_intent`
        - `payment_record`

    - `payments.data.status` (string)
      The status of the payment, one of `open`, `paid`, or `canceled`.

    - `payments.data.status_transitions` (object)
      The timestamps when the payment’s status was updated.

      - `payments.data.status_transitions.canceled_at` (timestamp, nullable)
        The time that the payment was canceled.

      - `payments.data.status_transitions.paid_at` (timestamp, nullable)
        The time that the payment succeeded.

  - `payments.has_more` (boolean)
    True if this list has another page of items after this one that can be fetched.

  - `payments.url` (string)
    The URL where this list can be accessed.

- `period_end` (timestamp)
  The latest timestamp at which invoice items can be associated with this invoice. Use the [line item period](https://docs.stripe.com/api/invoices/line_item.md#invoice_line_item_object-period) to get the service period for each price.

- `period_start` (timestamp)
  The earliest timestamp at which invoice items can be associated with this invoice. Use the [line item period](https://docs.stripe.com/api/invoices/line_item.md#invoice_line_item_object-period) to get the service period for each price.

- `post_payment_credit_notes_amount` (integer)
  Total amount of all post-payment credit notes issued for this invoice.

- `pre_payment_credit_notes_amount` (integer)
  Total amount of all pre-payment credit notes issued for this invoice.

- `receipt_number` (string, nullable)
  This is the transaction number that appears on email receipts sent for this invoice.

- `rendering` (object, nullable)
  The rendering-related settings that control how the invoice is displayed on customer-facing surfaces such as PDF and Hosted Invoice Page.

  - `rendering.amount_tax_display` (string, nullable)
    How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.

  - `rendering.pdf` (object, nullable)
    Invoice pdf rendering options

    - `rendering.pdf.page_size` (enum, nullable)
      Page size of invoice pdf. Options include a4, letter, and auto. If set to auto, page size will be switched to a4 or letter based on customer locale.
Possible enum values:
      - `a4`
      - `auto`
      - `letter`

  - `rendering.template` (string, nullable)
    ID of the rendering template that the invoice is formatted by.

  - `rendering.template_version` (integer, nullable)
    Version of the rendering template that the invoice is using.

- `shipping_cost` (object, nullable)
  The details of the cost of shipping, including the ShippingRate applied on the invoice.

  - `shipping_cost.amount_subtotal` (integer)
    Total shipping cost before any taxes are applied.

  - `shipping_cost.amount_tax` (integer)
    Total tax amount applied due to shipping costs. If no tax was applied, defaults to 0.

  - `shipping_cost.amount_total` (integer)
    Total shipping cost after taxes are applied.

  - `shipping_cost.shipping_rate` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The ID of the ShippingRate for this invoice.

  - `shipping_cost.taxes` (array of objects, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The taxes applied to the shipping rate.

    - `shipping_cost.taxes.amount` (integer)
      Amount of tax applied for this rate.

    - `shipping_cost.taxes.rate` (object)
      The tax rate applied.

      - `shipping_cost.taxes.rate.id` (string)
        Unique identifier for the object.

      - `shipping_cost.taxes.rate.object` (string)
        String representing the object’s type. Objects of the same type share the same value.

      - `shipping_cost.taxes.rate.active` (boolean)
        Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.

      - `shipping_cost.taxes.rate.country` (string, nullable)
        Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

      - `shipping_cost.taxes.rate.created` (timestamp)
        Time at which the object was created. Measured in seconds since the Unix epoch.

      - `shipping_cost.taxes.rate.description` (string, nullable)
        An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.

      - `shipping_cost.taxes.rate.display_name` (string)
        The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.

      - `shipping_cost.taxes.rate.effective_percentage` (float, nullable)
        Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage reflects the rate actually used to calculate tax based on the product’s taxability and whether the user is registered to collect taxes in the corresponding jurisdiction.

      - `shipping_cost.taxes.rate.flat_amount` (object, nullable)
        The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.

        - `shipping_cost.taxes.rate.flat_amount.amount` (integer)
          Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).

        - `shipping_cost.taxes.rate.flat_amount.currency` (string)
          Three-letter ISO currency code, in lowercase.

      - `shipping_cost.taxes.rate.inclusive` (boolean)
        This specifies if the tax rate is inclusive or exclusive.

      - `shipping_cost.taxes.rate.jurisdiction` (string, nullable)
        The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.

      - `shipping_cost.taxes.rate.jurisdiction_level` (enum, nullable)
        The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.
Possible enum values:
        - `city`
        - `country`
        - `county`
        - `district`
        - `multiple`
        - `state`

      - `shipping_cost.taxes.rate.livemode` (boolean)
        If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

      - `shipping_cost.taxes.rate.metadata` (object, nullable)
        Set of [key-value pairs](https://docs.stripe.com/docs/api/metadata.md) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

      - `shipping_cost.taxes.rate.percentage` (float)
        Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.

      - `shipping_cost.taxes.rate.rate_type` (enum, nullable)
        Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.
Possible enum values:
        - `flat_amount`
          A fixed amount applied as tax, regardless of the taxable amount, such as a retail delivery fee.

        - `percentage`
          A tax rate expressed as a percentage of the taxable amount, such as the sales tax rate in California.

      - `shipping_cost.taxes.rate.state` (string, nullable)
        [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, “NY” for New York, United States.

      - `shipping_cost.taxes.rate.tax_type` (enum, nullable)
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

    - `shipping_cost.taxes.taxability_reason` (enum, nullable)
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

    - `shipping_cost.taxes.taxable_amount` (integer, nullable)
      The amount on which tax is calculated, in the smallest currency unit.

- `shipping_details` (object, nullable)
  Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.

  - `shipping_details.address` (object)
    Shipping address.

    - `shipping_details.address.city` (string, nullable)
      City, district, suburb, town, or village.

    - `shipping_details.address.country` (string, nullable)
      Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

    - `shipping_details.address.line1` (string, nullable)
      Address line 1, such as the street, PO Box, or company name.

    - `shipping_details.address.line2` (string, nullable)
      Address line 2, such as the apartment, suite, unit, or building.

    - `shipping_details.address.postal_code` (string, nullable)
      ZIP or postal code.

    - `shipping_details.address.state` (string, nullable)
      State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).

  - `shipping_details.name` (string)
    Recipient name.

  - `shipping_details.phone` (string, nullable)
    Recipient phone (including extension).

- `starting_balance` (integer)
  Starting customer balance before the invoice is finalized. If the invoice has not been finalized yet, this will be the current customer balance. For revision invoices, this also includes any customer balance that was applied to the original invoice.

- `statement_descriptor` (string, nullable)
  Extra information about an invoice for the customer’s credit card statement.

- `status` (enum, nullable)
  The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://docs.stripe.com/docs/billing/invoices/workflow.md#workflow-overview)

- `status_transitions` (object)
  The timestamps at which the invoice status was updated.

  - `status_transitions.finalized_at` (timestamp, nullable)
    The time that the invoice draft was finalized.

  - `status_transitions.marked_uncollectible_at` (timestamp, nullable)
    The time that the invoice was marked uncollectible.

  - `status_transitions.paid_at` (timestamp, nullable)
    The time that the invoice was paid.

  - `status_transitions.voided_at` (timestamp, nullable)
    The time that the invoice was voided.

- `subtotal` (integer)
  Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or exclusive tax is applied. Item discounts are already incorporated

- `subtotal_excluding_tax` (integer, nullable)
  The integer amount in the smallest currency unit representing the subtotal of the invoice before any invoice level discount or tax is applied. Item discounts are already incorporated

- `test_clock` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the test clock this invoice belongs to.

- `threshold_reason` (object, nullable)
  If `billing_reason` is set to `subscription_threshold` this returns more information on which threshold rules triggered the invoice.

  - `threshold_reason.amount_gte` (integer, nullable)
    The total invoice amount threshold boundary if it triggered the threshold invoice.

  - `threshold_reason.item_reasons` (array of objects)
    Indicates which line items triggered a threshold invoice.

    - `threshold_reason.item_reasons.line_item_ids` (array of strings)
      The IDs of the line items that triggered the threshold invoice.

    - `threshold_reason.item_reasons.usage_gte` (integer)
      The quantity threshold boundary that applied to the given line item.

- `total` (integer)
  Total after discounts and taxes.

- `total_discount_amounts` (array of objects, nullable)
  The aggregate amounts calculated per discount across all line items.

  - `total_discount_amounts.amount` (integer)
    The amount, in the smallest currency unit, of the discount.

  - `total_discount_amounts.discount` (string, expandable (can be expanded into an object with the `expand` request parameter))
    The discount that was applied to get this discount amount.

- `total_excluding_tax` (integer, nullable)
  The integer amount in the smallest currency unit representing the total amount of the invoice including all discounts but excluding all tax.

- `total_pretax_credit_amounts` (array of objects, nullable)
  Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to this invoice. This is a combined list of total_pretax_credit_amounts across all invoice line items.

  - `total_pretax_credit_amounts.amount` (integer)
    The amount, in the smallest currency unit, of the pretax credit amount.

  - `total_pretax_credit_amounts.credit_balance_transaction` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The credit balance transaction that was applied to get this pretax credit amount.

  - `total_pretax_credit_amounts.discount` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The discount that was applied to get this pretax credit amount.

  - `total_pretax_credit_amounts.type` (enum)
    Type of the pretax credit amount referenced.
Possible enum values:
    - `credit_balance_transaction`
      The pretax credit amount is from a credit balance transaction.

    - `discount`
      The pretax credit amount is from a discount.

- `total_taxes` (array of objects, nullable)
  The aggregate tax information of all line items.

  - `total_taxes.amount` (integer)
    The amount of the tax, in the smallest currency unit.

  - `total_taxes.tax_behavior` (enum)
    Whether this tax is inclusive or exclusive.
Possible enum values:
    - `exclusive`
    - `inclusive`

  - `total_taxes.tax_rate_details` (object, nullable)
    Additional details about the tax rate. Only present when `type` is `tax_rate_details`.

    - `total_taxes.tax_rate_details.tax_rate` (string, expandable (can be expanded into an object with the `expand` request parameter))
      ID of the tax rate

  - `total_taxes.taxability_reason` (enum)
    The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.
Possible enum values:
    - `customer_exempt`
      No tax is applied as the customer is exempt from tax.

    - `not_available`
      The reasoning behind this tax is not available.

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

  - `total_taxes.taxable_amount` (integer, nullable)
    The amount on which tax is calculated, in the smallest currency unit.

  - `total_taxes.type` (enum)
    The type of tax information.

- `webhooks_delivered_at` (timestamp, nullable)
  Invoices are automatically paid or sent 1 hour after webhooks are delivered, or until all webhook delivery attempts have [been exhausted](https://docs.stripe.com/docs/billing/webhooks.md#understand). This field tracks the time when webhooks for this invoice were successfully delivered. If the invoice had no webhooks to deliver, this will be set while the invoice is being created.
