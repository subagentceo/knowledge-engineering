# Account and customer tax IDs with Invoicing

Learn about storing, validating, and rendering tax ID numbers for Invoicing.

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

With Stripe, you can manage tax IDs ​​for both yourself and your customers. Both the account and customer tax IDs display in the header of *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) and credit note PDFs.

## Account tax IDs 

Displaying your tax IDs on invoice documents is a common regulatory requirement.

With Stripe, you can add up to 100 tax IDs to your account. You can see your tax IDs in the header of invoice and credit note PDFs. You can:

- Select default tax IDs to appear on every invoice and credit note PDF.
- Define a list of tax IDs to appear on a specific invoice.

> You can’t add, change, or remove account tax IDs after an invoice is finalized.

## Manage account tax IDs 

You can add and delete tax IDs using the [invoice settings](https://dashboard.stripe.com/settings/billing/invoice) page in the Dashboard. After you add a tax ID in the Dashboard, you can set it as the default tax ID for every invoice and credit note PDF. Tax IDs are immutable—you can’t change the country and ID after you save the tax ID to your account.

Additionally, you can add and delete tax IDs with the [create](https://docs.stripe.com/api/tax_ids/create.md) and [delete](https://docs.stripe.com/api/tax_ids/delete.md) endpoints.

### Adding and removing IDs 

#### Dashboard

Visit the [invoice settings](https://dashboard.stripe.com/settings/billing/invoice) page. Click the **Tax** tab and add a new tax ID or remove an existing tax ID:
![Manage tax IDs in the Stripe Dashboard.](https://b.stripecdn.com/docs-statics-srv/assets/manage-add.f10a7efcaf2ce75e42bc986ff3954c0b.png)

Manage account tax IDs in the Dashboard

#### API

You can add and delete tax IDs using the tax ID [create](https://docs.stripe.com/api/tax_ids/create.md) and [delete](https://docs.stripe.com/api/tax_ids/delete.md) endpoints.

> To update a tax ID, delete the old ID and create ​​another one.

The following example creates a tax ID:

```curl
curl https://api.stripe.com/v1/tax_ids \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=eu_vat \
  -d value=DE123456789
```

The following example deletes a tax ID:

```curl
curl -X DELETE https://api.stripe.com/v1/tax_ids/{{TAXID_ID}} \
  -u "<<YOUR_SECRET_KEY>>:"
```

### Setting default tax IDs 

On the [invoice settings](https://dashboard.stripe.com/settings/billing/invoice) page, click the **Tax** tab and locate the tax ID you want to set as the default. Click the overflow menu (⋯), select **Set as default**, and click **Save**.
![Set default tax ID in the Stripe Dashboard.](https://b.stripecdn.com/docs-statics-srv/assets/manage-default.c36bf6e90db0825b107b5b6d375396cf.png)

Set default account tax ID in the Dashboard

​​After you set a tax ID as the default, you can see a label in the tax information box:
![A default tax ID in the Stripe Dashboard.](https://b.stripecdn.com/docs-statics-srv/assets/manage-default-set.a1c4d9a7605eabbe0491fb64cf031397.png)

A default account tax ID in the Dashboard

## Display tax IDs on invoices 

Stripe automatically pulls your [default tax IDs](https://docs.stripe.com/tax/invoicing/tax-ids.md#default-tax-ids) during invoice finalization.

To override the default and display multiple tax IDs on invoices, you can set tax IDs in the Dashboard or by using the API. To learn more about taxes and invoices, see [Taxes](https://docs.stripe.com/invoicing/taxes.md).

#### Dashboard

You can set a list of tax IDs in the Dashboard using the Invoice Editor. ​​You can’t modify account tax IDs after an Invoice has been finalized.

In the Invoice Editor, scroll down to the **Advanced Options** section. Click the checkboxes to toggle which tax IDs ​​to display on that invoice. To remove tax IDs from the invoice, uncheck the boxes.
![Tax ID invoice settings in the Stripe Dashboard](https://b.stripecdn.com/docs-statics-srv/assets/invoice-editor.1e64187379099e87ac0eb00a4a1c0e15.png)

Advanced Options section in the Invoice Editor

#### API

#### Accounts v2

After you add a tax ID to your account, you can use the API to specify up to 100 tax IDs with the `account_tax_ids` parameter for creating [invoices](https://docs.stripe.com/api/invoices/create.md#create_invoice-account_tax_ids), [subscriptions](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-account_tax_ids), and [subscription schedules](https://docs.stripe.com/api/subscription_schedules/create.md#create_subscription_schedule-default_settings-invoice_settings-account_tax_ids). You must pass a list of object IDs to the `account_tax_ids` parameter.

The following example sets `account_tax_ids` during invoice creation:

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer_account={{CUSTOMERACCOUNT_ID}}" \
  -d "account_tax_ids[0]=txi_123" \
  -d "account_tax_ids[1]=txi_456"
```

​​You can use the update endpoints for [invoices](https://docs.stripe.com/api/invoices/update.md#update_invoice-account_tax_ids), [subscriptions](https://docs.stripe.com/api/subscriptions/update.md#update_subscription-invoice_settings-account_tax_ids), and [subscription schedules](https://docs.stripe.com/api/subscription_schedules/update.md#update_subscription_schedule-default_settings-invoice_settings-account_tax_ids) to add, change, or remove account tax IDs.

The following example sets `account_tax_ids` on an existing subscription:

```curl
curl https://api.stripe.com/v1/subscriptions/{{SUBSCRIPTION_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "invoice_settings[account_tax_ids][0]=txi_123" \
  -d "invoice_settings[account_tax_ids][1]=txi_456"
```

#### Customers v1

After you add a tax ID to your account, you can use the API to specify up to 100 tax IDs with the `account_tax_ids` parameter for creating [invoices](https://docs.stripe.com/api/invoices/create.md#create_invoice-account_tax_ids), [subscriptions](https://docs.stripe.com/api/subscriptions/create.md#create_subscription-invoice_settings-account_tax_ids), and [subscription schedules](https://docs.stripe.com/api/subscription_schedules/create.md#create_subscription_schedule-default_settings-invoice_settings-account_tax_ids). You must pass a list of object IDs to the `account_tax_ids` parameter.

The following example sets `account_tax_ids` during invoice creation:

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "account_tax_ids[0]=txi_123" \
  -d "account_tax_ids[1]=txi_456"
```

​​You can use the update endpoints for [invoices](https://docs.stripe.com/api/invoices/update.md#update_invoice-account_tax_ids), [subscriptions](https://docs.stripe.com/api/subscriptions/update.md#update_subscription-invoice_settings-account_tax_ids), and [subscription schedules](https://docs.stripe.com/api/subscription_schedules/update.md#update_subscription_schedule-default_settings-invoice_settings-account_tax_ids) to add, change, or remove account tax IDs.

The following example sets `account_tax_ids` on an existing subscription:

```curl
curl https://api.stripe.com/v1/subscriptions/{{SUBSCRIPTION_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "invoice_settings[account_tax_ids][0]=txi_123" \
  -d "invoice_settings[account_tax_ids][1]=txi_456"
```

## Customer tax IDs 

Collecting and displaying a customer’s tax ID on an invoice is a common requirement for B2B sales. With Stripe, you can add up to five tax IDs to a customer. You can see a customer’s tax IDs in the header of invoice and credit note PDFs.

Stripe provides multiple ways to collect tax IDs:

- Stripe Checkout: Collect tax IDs as part of the customer checkout flow. Learn more about the tax IDs collected with [Stripe Checkout](https://docs.stripe.com/tax/checkout.md).
- API: Use the API to directly pass tax ID information to Stripe.
- Dashboard: Add a customer tax ID manually on the customers page in the Stripe Dashboard.

## Supported tax ID types 

> Need another tax ID type? Request additional tax ID types by emailing us at [stripe-tax@stripe.com](mailto:stripe-tax@stripe.com?subject=%5BTax%20ID%20request%5D).

Stripe supports displaying the tax ID types below on invoices. You can’t use Stripe Checkout to collect all of these tax IDs. See which [tax IDs you can collect with Checkout](https://docs.stripe.com/tax/checkout.md).

| Country | Enum       | Description                                                                                             | Example               | Impact in Tax Calculation* |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------- |
| AD      | ad_nrt     | Andorran NRT number                                                                                     | A-123456-Z            | No                         |
| AE      | ae_trn     | United Arab Emirates TRN                                                                                | 123456789012345       | Yes                        |
| AL      | al_tin     | Albania Tax Identification Number                                                                       | J12345678N            | Yes                        |
| AM      | am_tin     | Armenia Tax Identification Number                                                                       | 02538904              | Yes                        |
| AO      | ao_tin     | Angola Tax Identification Number                                                                        | 5123456789            | No                         |
| AR      | ar_cuit    | Argentinian tax ID number                                                                               | 12-3456789-01         | No                         |
| AT      | eu_vat     | European VAT number                                                                                     | ATU12345678           | Yes                        |
| AU      | au_abn     | Australian Business Number (AU ABN)                                                                     | 12345678912           | Yes                        |
| AU      | au_arn     | Australian Taxation Office Reference Number                                                             | 123456789123          | No                         |
| AW      | aw_tin     | Aruba Tax Identification Number                                                                         | 12345678              | Yes                        |
| AZ      | az_tin     | Azerbaijan Tax Identification Number                                                                    | 0123456789            | Yes                        |
| BA      | ba_tin     | Bosnia and Herzegovina Tax Identification Number                                                        | 123456789012          | Yes                        |
| BB      | bb_tin     | Barbados Tax Identification Number                                                                      | 1123456789012         | No                         |
| BD      | bd_bin     | Bangladesh Business Identification Number                                                               | 123456789-0123        | Yes                        |
| BE      | eu_vat     | European VAT number                                                                                     | BE0123456789          | Yes                        |
| BF      | bf_ifu     | Burkina Faso Tax Identification Number (Numéro d'Identifiant Fiscal Unique)                             | 12345678A             | Yes                        |
| BG      | bg_uic     | Bulgaria Unified Identification Code                                                                    | 123456789             | No                         |
| BG      | eu_vat     | European VAT number                                                                                     | BG0123456789          | Yes                        |
| BH      | bh_vat     | Bahraini VAT Number                                                                                     | 123456789012345       | Yes                        |
| BJ      | bj_ifu     | Benin Tax Identification Number (Identifiant Fiscal Unique)                                             | 1234567890123         | Yes                        |
| BO      | bo_tin     | Bolivian tax ID                                                                                         | 123456789             | No                         |
| BR      | br_cnpj    | Brazilian CNPJ number                                                                                   | 01.234.456/5432-10    | No                         |
| BR      | br_cpf     | Brazilian CPF number                                                                                    | 123.456.789-87        | No                         |
| BS      | bs_tin     | Bahamas Tax Identification Number                                                                       | 123.456.789           | No                         |
| BY      | by_tin     | Belarus TIN Number                                                                                      | 123456789             | Yes                        |
| CA      | ca_bn      | Canadian BN                                                                                             | 123456789             | No                         |
| CA      | ca_gst_hst | Canadian GST/HST number                                                                                 | 123456789RT0002       | Yes                        |
| CA      | ca_pst_bc  | Canadian PST number (British Columbia)                                                                  | PST-1234-5678         | No                         |
| CA      | ca_pst_mb  | Canadian PST number (Manitoba)                                                                          | 123456-7              | No                         |
| CA      | ca_pst_sk  | Canadian PST number (Saskatchewan)                                                                      | 1234567               | No                         |
| CA      | ca_qst     | Canadian QST number (Québec)                                                                            | 1234567890TQ1234      | Yes                        |
| CD      | cd_nif     | Congo (DR) Tax Identification Number (Número de Identificação Fiscal)                                   | A0123456M             | No                         |
| CH      | ch_uid     | Switzerland UID number                                                                                  | CHE-123.456.789 HR    | No                         |
| CH      | ch_vat     | Switzerland VAT number                                                                                  | CHE-123.456.789 MWST  | Yes                        |
| CL      | cl_tin     | Chilean TIN                                                                                             | 12.345.678-K          | Yes                        |
| CM      | cm_niu     | Cameroon Tax Identification Number (Numéro d'Identifiant fiscal Unique)                                 | M123456789000L        | No                         |
| CN      | cn_tin     | Chinese tax ID                                                                                          | 123456789012345678    | No                         |
| CO      | co_nit     | Colombian NIT number                                                                                    | 123.456.789-0         | No                         |
| CR      | cr_tin     | Costa Rican tax ID                                                                                      | 1-234-567890          | No                         |
| CV      | cv_nif     | Cape Verde Tax Identification Number (Número de Identificação Fiscal)                                   | 213456789             | No                         |
| CY      | eu_vat     | European VAT number                                                                                     | CY12345678Z           | Yes                        |
| CZ      | eu_vat     | European VAT number                                                                                     | CZ1234567890          | Yes                        |
| DE      | de_stn     | German Tax Number (Steuernummer)                                                                        | 1234567890            | No                         |
| DE      | eu_vat     | European VAT number                                                                                     | DE123456789           | Yes                        |
| DK      | eu_vat     | European VAT number                                                                                     | DK12345678            | Yes                        |
| DO      | do_rcn     | Dominican RCN number                                                                                    | 123-4567890-1         | No                         |
| EC      | ec_ruc     | Ecuadorian RUC number                                                                                   | 1234567890001         | No                         |
| EE      | eu_vat     | European VAT number                                                                                     | EE123456789           | Yes                        |
| EG      | eg_tin     | Egyptian Tax Identification Number                                                                      | 123456789             | Yes                        |
| ES      | es_cif     | Spanish NIF number (previously Spanish CIF number)                                                      | A12345678             | No                         |
| ES      | eu_vat     | European VAT number                                                                                     | ESA1234567Z           | Yes                        |
| ET      | et_tin     | Ethiopia Tax Identification Number                                                                      | 1234567890            | Yes                        |
| EU      | eu_oss_vat | European One Stop Shop VAT number for non-Union scheme                                                  | EU123456789           | No                         |
| FI      | eu_vat     | European VAT number                                                                                     | FI12345678            | Yes                        |
| FO      | fo_vat     | Faroe Islands VAT number                                                                                | FO123456              | No                         |
| FR      | eu_vat     | European VAT number                                                                                     | FRAB123456789         | Yes                        |
| GB      | eu_vat     | Northern Ireland VAT number                                                                             | XI123456789           | Yes                        |
| GB      | gb_vat     | United Kingdom VAT number                                                                               | GB123456789           | Yes                        |
| GE      | ge_vat     | Georgian VAT                                                                                            | 123456789             | Yes                        |
| GI      | gi_tin     | Gibraltar Tax Identification number                                                                     | 12345                 | No                         |
| GN      | gn_nif     | Guinea Tax Identification Number (Número de Identificação Fiscal)                                       | 123456789             | Yes                        |
| GR      | eu_vat     | European VAT number                                                                                     | EL123456789           | Yes                        |
| HK      | hk_br      | Hong Kong BR number                                                                                     | 12345678              | No                         |
| HR      | eu_vat     | European VAT number                                                                                     | HR12345678912         | Yes                        |
| HR      | hr_oib     | Croatian Personal Identification Number                                                                 | 12345678901           | No                         |
| HU      | eu_vat     | European VAT number                                                                                     | HU12345678            | Yes                        |
| HU      | hu_tin     | Hungary tax number (adószám)                                                                            | 12345678-1-23         | No                         |
| ID      | id_npwp    | Indonesian NPWP number                                                                                  | 012.345.678.9-012.345 | No                         |
| IE      | eu_vat     | European VAT number                                                                                     | IE1234567AB           | Yes                        |
| IL      | il_vat     | Israel VAT                                                                                              | 000012345             | No                         |
| IN      | in_gst     | Indian GST number                                                                                       | 12ABCDE3456FGZH       | Yes                        |
| IS      | is_vat     | Icelandic VAT                                                                                           | 123456                | Yes                        |
| IT      | eu_vat     | European VAT number                                                                                     | IT12345678912         | Yes                        |
| IT      | it_cf      | Italian Codice Fiscale number                                                                           | ABCDEF12A12A123A      | No                         |
| JP      | jp_cn      | Japanese Corporate Number (*Hōjin Bangō*)                                                               | 1234567891234         | No                         |
| JP      | jp_rn      | Japanese Registered Foreign Businesses' Registration Number (*Tōroku Kokugai Jigyōsha no Tōroku Bangō*) | 12345                 | No                         |
| JP      | jp_trn     | Japanese Tax Registration Number (*Tōroku Bangō*)                                                       | T1234567891234        | Yes                        |
| KE      | ke_pin     | Kenya Revenue Authority Personal Identification Number                                                  | P000111111A           | No                         |
| KG      | kg_tin     | Kyrgyzstan Tax Identification Number                                                                    | 12345678901234        | No                         |
| KH      | kh_tin     | Cambodia Tax Identification Number                                                                      | 1001-123456789        | Yes                        |
| KR      | kr_brn     | Korean BRN                                                                                              | 123-45-67890          | Yes                        |
| KZ      | kz_bin     | Kazakhstani Business Identification Number                                                              | 123456789012          | Yes                        |
| LA      | la_tin     | Laos Tax Identification Number                                                                          | 123456789-000         | No                         |
| LI      | li_uid     | Liechtensteinian UID number                                                                             | CHE123456789          | No                         |
| LI      | li_vat     | Liechtensteinian VAT number                                                                             | 12345                 | Yes                        |
| LK      | lk_vat     | Sri Lanka VAT number                                                                                    | 123456789-1234        | Yes                        |
| LT      | eu_vat     | European VAT number                                                                                     | LT123456789123        | Yes                        |
| LU      | eu_vat     | European VAT number                                                                                     | LU12345678            | Yes                        |
| LV      | eu_vat     | European VAT number                                                                                     | LV12345678912         | Yes                        |
| MA      | ma_vat     | Morocco VAT Number                                                                                      | 12345678              | Yes                        |
| MD      | md_vat     | Moldova VAT Number                                                                                      | 1234567               | Yes                        |
| ME      | me_pib     | Montenegro PIB Number                                                                                   | 12345678              | No                         |
| MK      | mk_vat     | North Macedonia VAT Number                                                                              | MK1234567890123       | Yes                        |
| MR      | mr_nif     | Mauritania Tax Identification Number (Número de Identificação Fiscal)                                   | 12345678              | No                         |
| MT      | eu_vat     | European VAT number                                                                                     | MT12345678            | Yes                        |
| MX      | mx_rfc     | Mexican RFC number                                                                                      | ABC010203AB9          | No                         |
| MY      | my_frp     | Malaysian FRP number                                                                                    | 12345678              | No                         |
| MY      | my_itn     | Malaysian ITN                                                                                           | C 1234567890          | No                         |
| MY      | my_sst     | Malaysian SST number                                                                                    | A12-3456-78912345     | No                         |
| NG      | ng_tin     | Nigerian Tax Identification Number                                                                      | 12345678-0001         | No                         |
| NL      | eu_vat     | European VAT number                                                                                     | NL123456789B12        | Yes                        |
| NO      | no_vat     | Norwegian VAT number                                                                                    | 123456789MVA          | Yes                        |
| NO      | no_voec    | Norwegian VAT on e-commerce number                                                                      | 1234567               | No                         |
| NP      | np_pan     | Nepal PAN Number                                                                                        | 123456789             | Yes                        |
| NZ      | nz_gst     | New Zealand GST number                                                                                  | 123456789             | Yes                        |
| OM      | om_vat     | Omani VAT Number                                                                                        | OM1234567890          | Yes                        |
| PE      | pe_ruc     | Peruvian RUC number                                                                                     | 12345678901           | Yes                        |
| PH      | ph_tin     | Philippines Tax Identification Number                                                                   | 123456789012          | Yes                        |
| PL      | eu_vat     | European VAT number                                                                                     | PL1234567890          | Yes                        |
| PL      | pl_nip     | Polish NIP number                                                                                       | 1234567890            | No                         |
| PT      | eu_vat     | European VAT number                                                                                     | PT123456789           | Yes                        |
| PY      | py_ruc     | Paraguayan RUC number                                                                                   | 12345678A             | No                         |
| RO      | eu_vat     | European VAT number                                                                                     | RO1234567891          | Yes                        |
| RO      | ro_tin     | Romanian tax ID number                                                                                  | 1234567890123         | No                         |
| RS      | rs_pib     | Serbian PIB number                                                                                      | 123456789             | No                         |
| RU      | ru_inn     | Russian INN                                                                                             | 1234567891            | Yes                        |
| RU      | ru_kpp     | Russian KPP                                                                                             | 123456789             | Yes                        |
| SA      | sa_vat     | Saudi Arabia VAT                                                                                        | 123456789012345       | Yes                        |
| SE      | eu_vat     | European VAT number                                                                                     | SE123456789123        | Yes                        |
| SG      | sg_gst     | Singaporean GST                                                                                         | M12345678X            | Yes                        |
| SG      | sg_uen     | Singaporean UEN                                                                                         | 123456789F            | No                         |
| SI      | eu_vat     | European VAT number                                                                                     | SI12345678            | Yes                        |
| SI      | si_tin     | Slovenia tax number (davčna številka)                                                                   | 12345678              | No                         |
| SK      | eu_vat     | European VAT number                                                                                     | SK1234567891          | Yes                        |
| SN      | sn_ninea   | Senegal NINEA Number                                                                                    | 12345672A2            | No                         |
| SR      | sr_fin     | Suriname FIN Number                                                                                     | 1234567890            | Yes                        |
| SV      | sv_nit     | El Salvadorian NIT number                                                                               | 1234-567890-123-4     | No                         |
| TH      | th_vat     | Thai VAT                                                                                                | 1234567891234         | Yes                        |
| TJ      | tj_tin     | Tajikistan Tax Identification Number                                                                    | 123456789             | Yes                        |
| TR      | tr_tin     | Turkish Tax Identification Number                                                                       | 0123456789            | Yes                        |
| TW      | tw_vat     | Taiwanese VAT                                                                                           | 12345678              | Yes                        |
| TZ      | tz_vat     | Tanzania VAT Number                                                                                     | 12345678A             | Yes                        |
| UA      | ua_vat     | Ukrainian VAT                                                                                           | 123456789             | Yes                        |
| UG      | ug_tin     | Uganda Tax Identification Number                                                                        | 1014751879            | Yes                        |
| US      | us_ein     | United States EIN                                                                                       | 12-3456789            | No                         |
| UY      | uy_ruc     | Uruguayan RUC number                                                                                    | 123456789012          | Yes                        |
| UZ      | uz_tin     | Uzbekistan TIN Number                                                                                   | 123456789             | No                         |
| UZ      | uz_vat     | Uzbekistan VAT Number                                                                                   | 123456789012          | Yes                        |
| VE      | ve_rif     | Venezuelan RIF number                                                                                   | A-12345678-9          | No                         |
| VN      | vn_tin     | Vietnamese tax ID number                                                                                | 1234567890            | No                         |
| ZA      | za_vat     | South African VAT number                                                                                | 4123456789            | Yes                        |
| ZM      | zm_tin     | Zambia Tax Identification Number                                                                        | 1004751879            | No                         |
| ZW      | zw_tin     | Zimbabwe Tax Identification Number                                                                      | 1234567890            | No                         |

\*Stripe Tax won't apply tax if this tax ID is provided, in line with the relevant laws.

## Validation 

It’s your responsibility to make sure customer information is accurate (including their tax ID). Stripe displays a customer tax ID on an invoice, whether or not it’s valid.

Stripe checks the format of the tax ID against the expected format, and asynchronously validates the tax ID against the external tax authority system for the tax ID types below.

After a tax ID is confirmed as valid or invalid, it won’t be validated again automatically.

### Australian Business Numbers (ABN)

Stripe automatically validates all [Australian Business Numbers (ABNs)](https://abr.gov.au/) with the Australian Business Register (ABR). This process only verifies the validity of the tax ID, and not whether the customer’s name, address, and GST registration status match what’s on the customers page in the Dashboard.

### European Value Added Tax (EU VAT) numbers

Stripe automatically validates all EU VAT numbers with the [European Commission’s VAT Information Exchange System (VIES)](http://ec.europa.eu/taxation_customs/vies/). This process only verifies the validity of the tax ID, and not whether the customer’s name and address match what’s on the customers page in the Dashboard.

VIES validation usually takes only a few seconds, but might take longer, depending on the availability of the external tax authority system. Stripe automatically handles VIES downtime and attempts retries for you.

### United Kingdom Value Added Tax (GB VAT) numbers

Stripe automatically validates all GB VAT numbers with the [United Kingdom’s Revenue & Customs (HMRC)](https://www.gov.uk/). This process only verifies the validity of the tax ID, not whether the customer’s name and address match what’s on the customers page in the Dashboard.

HMRC validation usually takes only a few seconds, but might take longer, depending on availability. Stripe automatically handles HMRC downtime and attempts retries for you.

### Validation webhooks and Dashboard display

Because this validation process happens asynchronously, the customer.tax_id.updated webhook  notifies you of validation updates.
![](https://b.stripecdn.com/docs-statics-srv/assets/ids_valid_vat_registered.8c8f0b149549b3f3dd82b62f4e97ebfa.png)

The Dashboard displays the validation results from government databases, including the customer name and address. However, it’s your responsibility to verify whether these validation results match the address and name on the customers page in the Dashboard.

### Validation and tax calculations

If you use Stripe Tax and your customer provides a tax ID, Stripe Tax applies the reverse charge or zero rate according to applicable laws, as long as the tax ID conforms to the necessary number format, regardless of its validity.

## Managing customer tax IDs 

You can manage tax IDs in the Customers page in the Dashboard, in the customer portal, or with the API.

#### Dashboard

To add a customer tax ID in the Dashboard, go to the Customers page, and click **Update details** in the top of the **Details** panel. The Update customer invoice details modal opens, with the tax ID section visible.

Clicking the **Add tax ID** link adds a row to the tax ID list, where you can select the ID type and value. Removing the row removes a tax ID from a customer.
![A customer's tax IDs in the Stripe Dashboard](https://b.stripecdn.com/docs-statics-srv/assets/ids_update_customer.4a68e5df884bdad0b0ce78264850b107.png)

#### API

#### Accounts v2

You can add or delete tax IDs using the API.

> To update a tax ID, delete the old ID and create ​​another one.

The following example shows how to [create a tax ID](https://docs.stripe.com/api/tax_ids/create.md) for a VAT number and assign it to an `Account` object.

```curl
curl https://api.stripe.com/v1/tax_ids \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=eu_vat \
  -d value=DE123456789 \
  -d "owner[type]=customer" \
  -d "owner[customer_account]={{CUSTOMERACCOUNT_ID}}"
```

The following example [deletes a tax ID](https://docs.stripe.com/api/tax_ids/delete.md):

```curl
curl -X DELETE https://api.stripe.com/v1/tax_ids/{{TAXID_ID}} \
  -u "<<YOUR_SECRET_KEY>>:"
```

#### Customers v1

You can add or delete tax IDs using the API.

> To update a tax ID, delete the old ID and create ​​another one.

The following example shows how to [create a tax ID](https://docs.stripe.com/api/tax_ids/create.md) for a VAT number and assign it to a `Customer` object.

#### Accounts v2

```curl
curl https://api.stripe.com/v1/tax_ids \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=eu_vat \
  -d value=DE123456789 \
  -d "owner[type]=customer" \
  -d "owner[customer_account]={{CUSTOMERACCOUNT_ID}}"
```

#### Customers v1

```curl
curl https://api.stripe.com/v1/tax_ids \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=eu_vat \
  -d value=DE123456789 \
  -d "owner[type]=customer" \
  -d "owner[customer]={{CUSTOMER_ID}}"
```

The following example [deletes a tax ID](https://docs.stripe.com/api/tax_ids/delete.md):

```curl
curl -X DELETE https://api.stripe.com/v1/tax_ids/{{TAXID_ID}} \
  -u "<<YOUR_SECRET_KEY>>:"
```

## See also

- [Activating Stripe Tax](https://docs.stripe.com/tax/set-up.md)
- [Checkout and tax IDs](https://docs.stripe.com/tax/checkout/tax-ids.md)
- [Understanding zero tax amounts](https://docs.stripe.com/tax/zero-tax.md)
- [Connected account tax IDs on invoices](https://docs.stripe.com/connect/invoices.md#account-tax-ids)
