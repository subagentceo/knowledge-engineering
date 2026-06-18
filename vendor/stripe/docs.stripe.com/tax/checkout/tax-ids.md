# Collect customer tax IDs

Learn how to collect VAT and other customer tax IDs during checkout.

Displaying a customer’s tax ID and legal business name on *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) is a common requirement that you can satisfy by enabling tax ID collection in Checkout. Tax ID collection works with all Checkout integration types: the hosted page, embedded page, and elements mode.

> #### Disclaimer
> 
> The Checkout Sessions API only collects business tax IDs, which might have formats similar to personal tax IDs in certain jurisdictions. You must make sure that only business tax IDs, as designated for this field, are provided when using this feature.

## Enable tax ID collection [Server-side]

With tax ID collection enabled, Checkout shows and hides the tax ID collection form depending on your customer’s location. If your customer is in a location supported by tax ID collection, Checkout displays fields for them to enter the tax ID and legal entity name for their business. If available, Checkout uses the customer’s shipping address to determine their location, otherwise it uses the billing address. Customers can only enter one tax ID.

### New customers

To enable tax ID collection for new customers, set [tax_id_collection[enabled]](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-tax_id_collection-enabled) to `true` when creating a Checkout Session.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "tax_id_collection[enabled]=true" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

You can additionally configure Checkout to create a new [customer-configured Account](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-configuration-customer) or [Customer](https://docs.stripe.com/api/customers/object.md) for you using [customer_creation](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_creation). If you do, Checkout saves any tax ID information collected during a session to that new Account or Customer. If not, the tax ID information is still available at [customer_details.tax_ids](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer_details-tax_ids).

### Existing customers 

#### Accounts v2

Create a Checkout Session with an existing [v2 Account](https://docs.stripe.com/api/v2/core/accounts/object.md) to add any tax ID information collected during checkout. The Checkout Session saves the business name to the [identity](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-identity) object and saves the collected tax ID as a [Tax ID](https://docs.stripe.com/api/tax_ids/object.md) resource associated with the account.

> Checkout only collects tax IDs on Accounts that don’t already have an existing tax ID. If an Account has one or more tax IDs saved, Checkout doesn’t display the tax ID collection form even if tax ID collection is enabled.

When creating the Checkout Session, set [customer_update.name](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-name) to `auto` to automatically update the Account’s identity name using details from the session.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer_account={{CUSTOMERACCOUNT_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "tax_id_collection[enabled]=true" \
  -d "customer_update[name]=auto" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

If you don’t have saved addresses for existing accounts, use the billing or shipping address entered during checkout to assess their location. The following table describes the available options:

| **Parameter**                                                                                                                                 | **Behavior**                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [customer_update.address](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-address) = `auto`   | Uses the billing address entered during checkout. Replaces the account’s saved addresses.                                                                                                                                                                |
| [customer_update.shipping](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-shipping) = `auto` | Uses the shipping address entered during checkout. Replaces the account’s saved shipping addresses. Requires [shipping_address_collection](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_address_collection). |

#### Customer v1

Create a Checkout Session with an existing [Customer](https://docs.stripe.com/api/customers/object.md) to add any tax ID information collected during checkout. The Checkout Session saves the business name as the customer’s [name](https://docs.stripe.com/api/customers/object.md#customer_object-name) and adds the collected tax ID to [customer.tax_ids](https://docs.stripe.com/api/customers/object.md#customer_object-tax_ids).

> Checkout only collects tax IDs on Customers that don’t already have an existing tax ID. If a Customer has one or more tax IDs saved, Checkout doesn’t display the tax ID collection form even if tax ID collection is enabled.

When creating the Checkout Session, set [customer_update.name](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-name) to `auto` to automatically update the customer’s existing `name` using details from the session.

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "tax_id_collection[enabled]=true" \
  -d "customer_update[name]=auto" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

If you don’t have saved addresses for existing customers, use the billing or shipping address entered during checkout to assess their location. The following table describes the available options:

| **Parameter**                                                                                                                                 | **Behavior**                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [customer_update.address](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-address) = `auto`   | Uses the billing address entered during checkout. Replaces the customer’s previously saved addresses.                                                                                                                                                                |
| [customer_update.shipping](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_update-shipping) = `auto` | Uses the shipping address entered during checkout. Replaces the customer’s previously saved shipping addresses. Requires [shipping_address_collection](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_address_collection). |

## Optional: Require tax ID collection

You can optionally configure Checkout to require tax ID collection by setting the [tax_id_collection[required]](https://docs.stripe.com/api/.md#create_checkout_session-tax_id_collection-required) parameter. When set to `if_supported`, Checkout requires tax ID information for payment for customers in [supported billing countries](https://docs.stripe.com/tax/checkout/tax-ids.md#supported-types).

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "tax_id_collection[enabled]=true" \
  -d "tax_id_collection[required]=if_supported" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

## Optional: Collect tax IDs in the payment form

If you use [elements mode](https://docs.stripe.com/tax/checkout/elements.md) (`ui_mode: 'elements'`), you can render the [Tax ID Element](https://docs.stripe.com/js/custom_checkout/create_tax_id_element) to collect tax IDs directly in your payment form. See the [elements integration guide](https://docs.stripe.com/tax/checkout/elements.md#render-tax-id-element) for client-side setup instructions.

## Retrieve customer tax ID details after a session

Checkout includes provided tax IDs on the resulting [Session](https://docs.stripe.com/api/checkout/sessions/object.md) object. After each completed Session, Checkout emits a [checkout.session.completed](https://docs.stripe.com/api/events/types.md#event_types-checkout.session.completed) event that you can listen for in a *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) endpoint. If you want to retrieve the collected tax ID from the Session object, it’s available under the Session’s [customer_details.tax_ids](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer_details-tax_ids) array:

```json
{
  "object": {
    "id": "cs_test_a1dJwt0TCJTBsDkbK7RcoyJ91vJxe2Y",
    "object": "checkout.session",
    ...
    "customer": {{CUSTOMER_ID}},
    "customer_details": {
      ..."tax_ids": [
        {
          "type": "eu_vat",
          "value": "FRAB123456789"
        }
      ]
    },
    ..."tax_id_collection": {
      "enabled": true
    }
    ...
  }
}
```

Checkout saves collected tax IDs and business names to the [Customer](https://docs.stripe.com/api/customers/object.md) object when you associate the Checkout Session with a Customer. Checkout stores a collected tax ID under the [customer.tax_ids](https://docs.stripe.com/api/customers/object.md#customer_object-tax_ids) array on the Customer. You can retrieve all tax IDs saved to a Customer with the [Tax IDs](https://docs.stripe.com/api/tax_ids/list.md) resource by setting [owner.type](https://docs.stripe.com/api/tax_ids/list.md#list_tax_ids-owner-type) to `customer` and [owner.customer](https://docs.stripe.com/api/tax_ids/list.md#list_tax_ids-owner-customer) to the customer ID. Checkout saves the business name to the Customer’s [name](https://docs.stripe.com/api/customers/object.md#customer_object-name) and [business_name](https://docs.stripe.com/api/customers/object.md#customer_object-business_name) properties. Your subscription invoices always show the collected legal business name.

## Test your integration

In testing environments, you can enter any alphanumeric string that is in the correct format of a supported tax ID type (for example, `DE123456789` for `eu_vat`). For a full list of example tax IDs you can reference our [Customer Tax ID guide](https://docs.stripe.com/billing/customer/tax-ids.md#supported-tax-id). You can also use our [test tax IDs](https://docs.stripe.com/connect/testing.md#test-business-tax-ids) to test various verification state flows.

## Validation 

During the Checkout Session, Stripe verifies that the provided tax IDs are formatted correctly, but not that they’re valid. You’re responsible for ensuring the validity of customer information collected during checkout. To help, Stripe automatically performs asynchronous validation against government databases for [Australian Business Numbers (ABNs)](https://docs.stripe.com/tax/invoicing/tax-ids.md#australian-business-numbers-abn), [European Value Added Tax (EU VAT)](https://docs.stripe.com/tax/invoicing/tax-ids.md#european-value-added-tax-eu-vat-numbers), and [United Kingdom Value Added Tax (GB VAT)](https://docs.stripe.com/tax/invoicing/tax-ids.md#united-kingdom-value-added-tax-gb-vat-numbers) numbers. Learn more about the [validation we perform](https://docs.stripe.com/tax/invoicing/tax-ids.md#validation), and how to consume the status of those checks.

If you use Stripe Tax and your customer provides a tax ID, Stripe Tax applies the reverse charge or zero rate according to applicable laws, as long as the tax ID conforms to the necessary number format, regardless of its validity.

## Supported tax ID types 

Checkout collects the following tax ID types in the given regions:

| Country | Enum       | Description                                                                 | Example              | Impact in Tax Calculation* |
| ------- | ---------- | --------------------------------------------------------------------------- | -------------------- | -------------------------- |
| AE      | ae_trn     | United Arab Emirates TRN                                                    | 123456789012345      | Yes                        |
| AL      | al_tin     | Albania Tax Identification Number                                           | J12345678N           | Yes                        |
| AM      | am_tin     | Armenia Tax Identification Number                                           | 02538904             | Yes                        |
| AO      | ao_tin     | Angola Tax Identification Number                                            | 5123456789           | No                         |
| AT      | eu_vat     | European VAT number                                                         | ATU12345678          | Yes                        |
| AU      | au_abn     | Australian Business Number (AU ABN)                                         | 12345678912          | Yes                        |
| AW      | aw_tin     | Aruba Tax Identification Number                                             | 12345678             | Yes                        |
| AZ      | az_tin     | Azerbaijan Tax Identification Number                                        | 0123456789           | Yes                        |
| BA      | ba_tin     | Bosnia and Herzegovina Tax Identification Number                            | 123456789012         | Yes                        |
| BB      | bb_tin     | Barbados Tax Identification Number                                          | 1123456789012        | No                         |
| BD      | bd_bin     | Bangladesh Business Identification Number                                   | 123456789-0123       | Yes                        |
| BE      | eu_vat     | European VAT number                                                         | BE0123456789         | Yes                        |
| BF      | bf_ifu     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique) | 12345678A            | Yes                        |
| BG      | eu_vat     | European VAT number                                                         | BG0123456789         | Yes                        |
| BH      | bh_vat     | Bahraini VAT Number                                                         | 123456789012345      | Yes                        |
| BJ      | bj_ifu     | Benin Tax Identification Number (Identifiant Fiscal Unique)                 | 1234567890123        | Yes                        |
| BS      | bs_tin     | Bahamas Tax Identification Number                                           | 123.456.789          | No                         |
| BY      | by_tin     | Belarus TIN Number                                                          | 123456789            | Yes                        |
| CA      | ca_bn      | Canadian BN                                                                 | 123456789            | No                         |
| CA      | ca_gst_hst | Canadian GST/HST number                                                     | 123456789RT0002      | Yes                        |
| CA      | ca_pst_bc  | Canadian PST number (British Columbia)                                      | PST-1234-5678        | No                         |
| CA      | ca_pst_mb  | Canadian PST number (Manitoba)                                              | 123456-7             | No                         |
| CA      | ca_pst_sk  | Canadian PST number (Saskatchewan)                                          | 1234567              | No                         |
| CA      | ca_qst     | Canadian QST number (Québec)                                                | 1234567890TQ1234     | Yes                        |
| CD      | cd_nif     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)       | A0123456M            | No                         |
| CH      | ch_vat     | Switzerland VAT number                                                      | CHE-123.456.789 MWST | Yes                        |
| CL      | cl_tin     | Chilean TIN                                                                 | 12.345.678-K         | Yes                        |
| CM      | cm_niu     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)     | M123456789000L       | No                         |
| CR      | cr_tin     | Costa Rican tax ID                                                          | 1-234-567890         | No                         |
| CV      | cv_nif     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)       | 213456789            | No                         |
| CY      | eu_vat     | European VAT number                                                         | CY12345678Z          | Yes                        |
| CZ      | eu_vat     | European VAT number                                                         | CZ1234567890         | Yes                        |
| DE      | eu_vat     | European VAT number                                                         | DE123456789          | Yes                        |
| DK      | eu_vat     | European VAT number                                                         | DK12345678           | Yes                        |
| EC      | ec_ruc     | Ecuadorian RUC number                                                       | 1234567890001        | No                         |
| EE      | eu_vat     | European VAT number                                                         | EE123456789          | Yes                        |
| EG      | eg_tin     | Egyptian Tax Identification Number                                          | 123456789            | Yes                        |
| ES      | es_cif     | Spanish NIF number (previously Spanish CIF number)                          | A12345678            | No                         |
| ES      | eu_vat     | European VAT number                                                         | ESA1234567Z          | Yes                        |
| ET      | et_tin     | Ethiopia Tax Identification Number                                          | 1234567890           | Yes                        |
| FI      | eu_vat     | European VAT number                                                         | FI12345678           | Yes                        |
| FR      | eu_vat     | European VAT number                                                         | FRAB123456789        | Yes                        |
| GB      | eu_vat     | Northern Ireland VAT number                                                 | XI123456789          | Yes                        |
| GB      | gb_vat     | United Kingdom VAT number                                                   | GB123456789          | Yes                        |
| GE      | ge_vat     | Georgian VAT                                                                | 123456789            | Yes                        |
| GN      | gn_nif     | Guinea Tax Identification Number (Número de Identificação Fiscal)           | 123456789            | Yes                        |
| GR      | eu_vat     | European VAT number                                                         | EL123456789          | Yes                        |
| HR      | eu_vat     | European VAT number                                                         | HR12345678912        | Yes                        |
| HU      | eu_vat     | European VAT number                                                         | HU12345678           | Yes                        |
| HU      | hu_tin     | Hungary tax number (adószám)                                                | 12345678-1-23        | No                         |
| IE      | eu_vat     | European VAT number                                                         | IE1234567AB          | Yes                        |
| IN      | in_gst     | Indian GST number                                                           | 12ABCDE3456FGZH      | Yes                        |
| IS      | is_vat     | Icelandic VAT                                                               | 123456               | Yes                        |
| IT      | eu_vat     | European VAT number                                                         | IT12345678912        | Yes                        |
| KE      | ke_pin     | Kenya Revenue Authority Personal Identification Number                      | P000111111A          | No                         |
| KG      | kg_tin     | Kyrgyzstan Tax Identification Number                                        | 12345678901234       | No                         |
| KH      | kh_tin     | Cambodia Tax Identification Number                                          | 1001-123456789       | Yes                        |
| KR      | kr_brn     | Korean BRN                                                                  | 123-45-67890         | Yes                        |
| KZ      | kz_bin     | Kazakhstani Business Identification Number                                  | 123456789012         | Yes                        |
| LA      | la_tin     | Laos Tax Identification Number                                              | 123456789-000        | No                         |
| LI      | li_vat     | Liechtensteinian VAT number                                                 | 12345                | Yes                        |
| LK      | lk_vat     | Sri Lanka VAT number                                                        | 123456789-1234       | Yes                        |
| LT      | eu_vat     | European VAT number                                                         | LT123456789123       | Yes                        |
| LU      | eu_vat     | European VAT number                                                         | LU12345678           | Yes                        |
| LV      | eu_vat     | European VAT number                                                         | LV12345678912        | Yes                        |
| MA      | ma_vat     | Morocco VAT Number                                                          | 12345678             | Yes                        |
| MD      | md_vat     | Moldova VAT Number                                                          | 1234567              | Yes                        |
| ME      | me_pib     | Montenegro PIB Number                                                       | 12345678             | No                         |
| MK      | mk_vat     | North Macedonia VAT Number                                                  | MK1234567890123      | Yes                        |
| MR      | mr_nif     | Mauritania Tax Identification Number (Número de Identificação Fiscal)       | 12345678             | No                         |
| MT      | eu_vat     | European VAT number                                                         | MT12345678           | Yes                        |
| MX      | mx_rfc     | Mexican RFC number                                                          | ABC010203AB9         | No                         |
| NG      | ng_tin     | Nigerian Tax Identification Number                                          | 12345678-0001        | No                         |
| NL      | eu_vat     | European VAT number                                                         | NL123456789B12       | Yes                        |
| NO      | no_vat     | Norwegian VAT number                                                        | 123456789MVA         | Yes                        |
| NP      | np_pan     | Nepal PAN Number                                                            | 123456789            | Yes                        |
| NZ      | nz_gst     | New Zealand GST number                                                      | 123456789            | Yes                        |
| OM      | om_vat     | Omani VAT Number                                                            | OM1234567890         | Yes                        |
| PE      | pe_ruc     | Peruvian RUC number                                                         | 12345678901          | Yes                        |
| PH      | ph_tin     | Philippines Tax Identification Number                                       | 123456789012         | Yes                        |
| PL      | eu_vat     | European VAT number                                                         | PL1234567890         | Yes                        |
| PL      | pl_nip     | Polish NIP number                                                           | 1234567890           | No                         |
| PT      | eu_vat     | European VAT number                                                         | PT123456789          | Yes                        |
| RO      | eu_vat     | European VAT number                                                         | RO1234567891         | Yes                        |
| RS      | rs_pib     | Serbian PIB number                                                          | 123456789            | No                         |
| RU      | ru_inn     | Russian INN                                                                 | 1234567891           | Yes                        |
| RU      | ru_kpp     | Russian KPP                                                                 | 123456789            | Yes                        |
| SA      | sa_vat     | Saudi Arabia VAT                                                            | 123456789012345      | Yes                        |
| SE      | eu_vat     | European VAT number                                                         | SE123456789123       | Yes                        |
| SG      | sg_gst     | Singaporean GST                                                             | M12345678X           | Yes                        |
| SI      | eu_vat     | European VAT number                                                         | SI12345678           | Yes                        |
| SK      | eu_vat     | European VAT number                                                         | SK1234567891         | Yes                        |
| SN      | sn_ninea   | Senegal NINEA Number                                                        | 12345672A2           | No                         |
| SR      | sr_fin     | Suriname FIN Number                                                         | 1234567890           | Yes                        |
| TH      | th_vat     | Thai VAT                                                                    | 1234567891234        | Yes                        |
| TJ      | tj_tin     | Tajikistan Tax Identification Number                                        | 123456789            | Yes                        |
| TR      | tr_tin     | Turkish Tax Identification Number                                           | 0123456789           | Yes                        |
| TW      | tw_vat     | Taiwanese VAT                                                               | 12345678             | Yes                        |
| TZ      | tz_vat     | Tanzania VAT Number                                                         | 12345678A            | Yes                        |
| UA      | ua_vat     | Ukrainian VAT                                                               | 123456789            | Yes                        |
| UG      | ug_tin     | Uganda Tax Identification Number                                            | 1014751879           | Yes                        |
| UY      | uy_ruc     | Uruguayan RUC number                                                        | 123456789012         | Yes                        |
| UZ      | uz_tin     | Uzbekistan TIN Number                                                       | 123456789            | No                         |
| UZ      | uz_vat     | Uzbekistan VAT Number                                                       | 123456789012         | Yes                        |
| ZA      | za_vat     | South African VAT number                                                    | 4123456789           | Yes                        |
| ZM      | zm_tin     | Zambia Tax Identification Number                                            | 1004751879           | No                         |
| ZW      | zw_tin     | Zimbabwe Tax Identification Number                                          | 1234567890           | No                         |

\*Stripe Tax won't apply tax if this tax ID is provided, in line with the relevant laws.
