# The Tax ID object

### The Tax ID object

```json
{
  "id": "txi_1NuMB12eZvKYlo2CMecoWkZd",
  "object": "tax_id",
  "country": "DE",
  "created": 123456789,
  "customer": null,
  "livemode": false,
  "type": "eu_vat",
  "value": "DE123456789",
  "verification": null,
  "owner": {
    "type": "self",
    "customer": null
  }
}
```

## Attributes

- `id` (string)
  Unique identifier for the object.

- `object` (string)
  String representing the object’s type. Objects of the same type share the same value.

- `country` (string, nullable)
  Two-letter ISO code representing the country of the tax ID.

- `created` (timestamp)
  Time at which the object was created. Measured in seconds since the Unix epoch.

- `customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
  ID of the customer.

- `customer_account` (string, nullable)
  ID of the Account representing the customer.

- `livemode` (boolean)
  If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.

- `owner` (object, nullable)
  The account or customer the tax ID belongs to.

  - `owner.account` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The account being referenced when `type` is `account`.

  - `owner.application` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The Connect Application being referenced when `type` is `application`.

  - `owner.customer` (string, nullable, expandable (can be expanded into an object with the `expand` request parameter))
    The customer being referenced when `type` is `customer`.

  - `owner.customer_account` (string, nullable)
    The Account representing the customer being referenced when `type` is `customer`.

  - `owner.type` (enum)
    Type of owner referenced.
Possible enum values:
    - `account`
      Indicates an account is being referenced.

    - `application`
      Indicates an application is being referenced.

    - `customer`
      Indicates a customer is being referenced.

    - `self`
      Indicates that the account being referenced is the account making the API request.

- `type` (enum)
  Type of the tax ID, one of `ad_nrt`, `ae_trn`, `al_tin`, `am_tin`, `ao_tin`, `ar_cuit`, `au_abn`, `au_arn`, `aw_tin`, `az_tin`, `ba_tin`, `bb_tin`, `bd_bin`, `bf_ifu`, `bg_uic`, `bh_vat`, `bj_ifu`, `bo_tin`, `br_cnpj`, `br_cpf`, `bs_tin`, `by_tin`, `ca_bn`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `ca_qst`, `cd_nif`, `ch_uid`, `ch_vat`, `cl_tin`, `cm_niu`, `cn_tin`, `co_nit`, `cr_tin`, `cv_nif`, `de_stn`, `do_rcn`, `ec_ruc`, `eg_tin`, `es_cif`, `et_tin`, `eu_oss_vat`, `eu_vat`, `fo_vat`, `gb_vat`, `ge_vat`, `gi_tin`, `gn_nif`, `hk_br`, `hr_oib`, `hu_tin`, `id_npwp`, `il_vat`, `in_gst`, `is_vat`, `it_cf`, `jp_cn`, `jp_rn`, `jp_trn`, `ke_pin`, `kg_tin`, `kh_tin`, `kr_brn`, `kz_bin`, `la_tin`, `li_uid`, `li_vat`, `lk_vat`, `ma_vat`, `md_vat`, `me_pib`, `mk_vat`, `mr_nif`, `mx_rfc`, `my_frp`, `my_itn`, `my_sst`, `ng_tin`, `no_vat`, `no_voec`, `np_pan`, `nz_gst`, `om_vat`, `pe_ruc`, `ph_tin`, `pl_nip`, `py_ruc`, `ro_tin`, `rs_pib`, `ru_inn`, `ru_kpp`, `sa_vat`, `sg_gst`, `sg_uen`, `si_tin`, `sn_ninea`, `sr_fin`, `sv_nit`, `th_vat`, `tj_tin`, `tr_tin`, `tw_vat`, `tz_vat`, `ua_vat`, `ug_tin`, `us_ein`, `uy_ruc`, `uz_tin`, `uz_vat`, `ve_rif`, `vn_tin`, `za_vat`, `zm_tin`, or `zw_tin`. Note that some legacy tax IDs have type `unknown`
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

- `value` (string)
  Value of the tax ID.

- `verification` (object, nullable)
  Tax ID verification information.

  - `verification.status` (enum)
    Verification status, one of `pending`, `verified`, `unverified`, or `unavailable`.
Possible enum values:
    - `pending`
    - `unavailable`
    - `unverified`
    - `verified`

  - `verification.verified_address` (string, nullable)
    Verified address.

  - `verification.verified_name` (string, nullable)
    Verified name.
