# Account capabilities and configurations

Learn about capabilities you can enable for accounts, the account configurations they belong to, and their requirements.

Capabilities represent functionality that you can request for your connected accounts, such as accepting card payments or receiving transferred funds from your platform account. A capability must be active for a connected account to perform actions associated with that capability.

> #### Testing capabilities
> 
> Sandboxes might not enforce some capabilities. In certain cases, they can allow an `Account` to perform capability-dependent actions even when the associated capability’s `status` isn’t `active`.

Most capabilities require verification of certain information about the connected account’s business before Stripe enables them. The capabilities you request for a connected account determine the information you’re required to collect for it. To reduce onboarding effort, only request the capabilities that your accounts need. Requesting more capabilities means the onboarding flow must verify more information.

You can start by completing the [platform profile](https://dashboard.stripe.com/connect/profile) to understand which capabilities might be appropriate for your platform.

> For some capabilities, requesting them enables them permanently. Attempting to remove or unrequest a permanent capability returns an error.

After creating an `Account`, you can request additional capabilities and remove existing non-permanent capabilities. For connected accounts that [other platforms control](https://docs.stripe.com/connect/platform-controls-for-stripe-dashboard-accounts.md), you can’t unrequest capabilities.

## Supported capabilities 

Following is a list of available capabilities. Click an item to expand or collapse it.

### Transfers

You can transfer funds to connected accounts that have the `transfers` capability. On-demand platforms often use it to pay their connected accounts. For example, a ride-hailing platform could use this capability so they can pay their drivers. The following diagram illustrates the flow of funds and the relationship between customers, the platform, and connected accounts.
![](https://b.stripecdn.com/docs-statics-srv/assets/capabilities-transfers.aced7a090e53052eb74ee8185e5919c9.svg)

Relationship between customers, the platform, and connected accounts.

When you use the `transfers` capability, your platform, not the connected account, processes charges. Therefore, a connected account’s customers’ bank statements display your platform’s statement descriptor, not the connected account’s.

Payments using the `transfers` capability include [Destination charges](https://docs.stripe.com/connect/destination-charges.md) and [Separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md).

> Before the [2019-08-14](https://docs.stripe.com/upgrades.md#2019-08-14) API version, the `transfers` capability was referred to as `platform_payments`. If you’re using an API version older than 2019-08-14, use `platform_payments`.

#### Cross-border transfers 

Stripe supports cross-border transfers on the payments balance between the United States, Canada, United Kingdom, EEA, and Switzerland. In other scenarios, your platform and any connected account must be in the same region. Attempting to transfer funds across unsupported borders or balances returns an error. See [Cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md) for supported funds flows between other regions.

You must only use transfers in combination with the permitted use cases for [charges](https://docs.stripe.com/connect/charges.md), [tops-ups](https://docs.stripe.com/connect/top-ups.md) and [fees](https://docs.stripe.com/connect/account-capabilities.md#collect-fees). We recommend using separate charges and transfers only when you’re responsible for negative balances of your connected accounts.

### Card payments

Connected accounts with the `card_payments` capability can receive payments from your platform and directly process card and ACH payments. An e-commerce storefront with this capability, for example, can collect its own payments. The following diagram illustrates the flow of funds and the relationship between customers, connected accounts, and the platform:
![](https://b.stripecdn.com/docs-statics-srv/assets/capabilities-cardpayments.c3ef9c11049f87931c9a72e56d38559e.svg)

Relationship between customers, connected accounts, and the platform.

For an `Account` to have the `card_payments` capability, you must request both `card_payments` and `transfers`.

When a connected account has this capability, its customers’ bank statements display the connected account’s statement descriptor, not the platform’s.

The `card_payments` capability applies to [all charge types](https://docs.stripe.com/connect/charges.md).

### US tax reporting

The [US Internal Revenue Service](https://www.irs.gov/) (IRS) requires some platforms to file 1099 forms with the IRS between January and March, and to deliver the reporting of those filings to their connected accounts by January 31. To file the forms, those platforms must collect additional information from their connected accounts.

> Stripe recommends that you consult a tax advisor to determine your tax filing and reporting requirements.

If your platform has federal 1099 filing requirements and you decide to file through Stripe, you can use the `tax_reporting_us_1099_misc` and `tax_reporting_us_1099_k` capabilities to collect the necessary personal and business information from your connected accounts.

### 1099-MISC form

Many types of payments require an IRS Form 1099-MISC, such as payments to non-employees or contractors, royalties, prizes, and so forth. The `tax_reporting_us_1099_misc` capability helps you collect the required information for Form 1099-MISC. For example, a creator platform could use the `tax_reporting_us_1099_misc` capability to [collect the necessary information](https://docs.stripe.com/connect/required-verification-information-taxes.md#required-information) from their content providers for tax filing season.

### 1099-K form

A 1099-K form reports payments received from credit card transactions and third-party payment networks. Traditionally, third-party settlement organizations have used Form 1099-K to report their gross payment transactions in a calendar year. For example, an e-commerce platform uses the `tax_reporting_us_1099_k` capability to [collect the necessary tax filing information](https://docs.stripe.com/connect/required-verification-information-taxes.md#required-information) from each storefront.

For more details on tax reporting for US-based connected accounts, see [Manage Tax Forms](https://docs.stripe.com/connect/tax-reporting.md).

### Payment methods

Some [payment methods](https://docs.stripe.com/payments/payment-methods/overview.md) are enabled by the `card_payments` capability, while others are enabled by their own capability.

If you’re charging and then paying out, check your Dashboard to see which payment methods you can use.

To enable connected accounts to accept a payment method for direct charges or charges with `on_behalf_of`, you must request that payment method’s capability for those accounts.

#### Account Dashboard access - Full Stripe Dashboard

For connected accounts with access to the full Stripe Dashboard, including Standard accounts, most payment method capabilities are enabled by default. Those accounts can manage their own payment method capabilities. You can also request capabilities for them using [the Capabilities API](https://docs.stripe.com/api/capabilities/update.md), and list an account’s enabled capabilities using [the Accounts API](https://docs.stripe.com/api/accounts/retrieve.md).

In the following table, the **All business types supported** column indicates that all business types are supported unless prohibited by Stripe. The **Additional verification requirements** column refers to requirements in addition to those for the `card_payments` capability.

| Payment method and associated capability                                                                                                  | All business types supported                                                                                                 | Available by default                                                                                                                                                                          | Additional verification requirements       | Country availability                                                                                                                                     | Accounts v2 support                             |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [ACH Direct Debit](https://docs.stripe.com/payments/ach-direct-debit.md)

  `us_bank_account_ach_payments`                                | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/ach-direct-debit.md?pm-info=business-locations).           | Yes; v2 capability name is `ach_debit_payments` |
| [Affirm](https://docs.stripe.com/payments/affirm.md)

  `affirm_payments`                                                                 | No, see [prohibited businesses](https://docs.stripe.com/payments/affirm.md#prohibited-and-restricted-business-categories).   | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/affirm.md?pm-info=business-locations).                     | Yes                                             |
| [Afterpay Clearpay](https://docs.stripe.com/payments/afterpay-clearpay.md)

  `afterpay_clearpay_payments`                                | No, see [prohibited businesses](https://docs.stripe.com/payments/afterpay-clearpay.md#prohibited-business-categories).       | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/afterpay-clearpay.md?pm-info=business-locations).          | Yes                                             |
| [Alipay](https://docs.stripe.com/payments/alipay.md)

  `alipay_payments`                                                                 | No, see [prohibited businesses](https://support.stripe.com/questions/alipay-prohibited-businesses).                          | The payment method must be activated on the Dashboard settings page. Also, request [an invite](https://docs.stripe.com/payments/alipay.md) to create charges on behalf of other accounts.     | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/alipay.md?pm-info=business-locations).                     | No                                              |
| [Alma](https://docs.stripe.com/payments/alma.md)

  `alma_payments`                                                                       | No, see [prohibited businesses](https://docs.stripe.com/payments/alma.md#prohibited-business-categories).                    | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/alma.md?pm-info=business-locations).                       | Yes                                             |
| [Amazon Pay](https://docs.stripe.com/payments/amazon-pay.md)

  `amazon_pay_payments`                                                     | Yes                                                                                                                          | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/amazon-pay.md?pm-info=business-locations).                 | Yes                                             |
| [Apple Pay](https://docs.stripe.com/apple-pay.md)

  Available with `card_payments`                                                       | Yes                                                                                                                          | With Checkout - Yes

  With Payment Element—The payment method must be configured on the Dashboard settings page.                                                                             | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/connect/account-capabilities.md#apple-pay-country-availability).    | Yes                                             |
| [Bacs Direct Debit](https://docs.stripe.com/payments/payment-methods/bacs-debit.md)

  `bacs_debit_payments`                              | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/payment-methods/bacs-debit.md?pm-info=business-locations). | Yes                                             |
| [Bancontact](https://docs.stripe.com/payments/bancontact.md)

  `bancontact_payments`                                                     | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bancontact.md?pm-info=business-locations).                 | Yes                                             |
| [BECS Debit](https://docs.stripe.com/payments/au-becs-debit.md)

  `au_becs_debit_payments`                                               | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/au-becs-debit.md?pm-info=business-locations).              | Yes                                             |
| [Billie](https://docs.stripe.com/payments/billie.md)

  `billie_payments`                                                                 | No, see [prohibited businesses](https://docs.stripe.com/payments/billie.md#prohibited-and-restricted-business-categories).   | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/billie.md?pm-info=business-locations).                     | Yes                                             |
| [BLIK](https://docs.stripe.com/payments/blik.md)

  `blik_payments`                                                                       | Yes                                                                                                                          | The payment method must be activated on the Dashboard settings page.                                                                                                                          | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/blik.md?pm-info=business-locations).                       | Yes                                             |
| [Boleto](https://docs.stripe.com/payments/boleto.md)

  `boleto_payments`                                                                 | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/boleto.md?pm-info=business-locations).                     | Yes                                             |
| [Canadian pre-authorized debit](https://docs.stripe.com/payments/acss-debit.md)

  `acss_debit_payments`                                  | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/acss-debit.md?pm-info=business-locations).                 | Yes                                             |
| [Cartes Bancaires](https://docs.stripe.com/payments/cartes-bancaires.md)

  `cartes_bancaires_payments`                                   | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/cartes-bancaires.md?pm-info=business-locations).           | Yes                                             |
| [Cash App Pay](https://docs.stripe.com/payments/cash-app-pay.md)

  `cashapp_payments`                                                    | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/cash-app-pay.md?pm-info=business-locations).               | Yes                                             |
| [EPS](https://docs.stripe.com/payments/eps.md)

  `eps_payments`                                                                          | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/eps.md?pm-info=business-locations).                        | Yes                                             |
| [FPX](https://docs.stripe.com/payments/fpx.md)

  `fpx_payments`                                                                          | No, only businesses with a valid business registration number.                                                               | The capability must be activated on the Dashboard settings page.                                                                                                                              | Yes                                        | Connected account must be in a [supported business location](https://docs.stripe.com/payments/fpx.md?pm-info=business-locations).                        | Yes                                             |
| [Google Pay](https://docs.stripe.com/google-pay.md)

  Available with `card_payments`                                                     | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/connect/account-capabilities.md#google-pay-country-availability).   | Yes                                             |
| [GrabPay](https://docs.stripe.com/payments/grabpay.md)

  `grabpay_payments`                                                              | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/grabpay.md?pm-info=business-locations).                    | Yes                                             |
| [iDEAL](https://docs.stripe.com/payments/ideal.md)

  `ideal_payments`                                                                    | Yes                                                                                                                          | Yes                                                                                                                                                                                           | Yes, tax ID required for sole proprietors. | Connected account must be in a [supported business location](https://docs.stripe.com/payments/ideal.md?pm-info=business-locations).                      | Yes                                             |
| [JCB Japan](https://support.stripe.com/questions/integrating-jcb-payments-for-connect-platforms-and-connected-accounts)

  `jcb_payments` | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in Japan.                                                                                                                      | Yes                                             |
| [Klarna](https://docs.stripe.com/payments/klarna.md)

  `klarna_payments`                                                                 | No, see [prohibited businesses](https://docs.stripe.com/payments/klarna/compliance.md#prohibited-business-categories).       | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/klarna.md?pm-info=business-locations).                     | Yes                                             |
| [Konbini](https://docs.stripe.com/payments/konbini.md)

  `konbini_payments`                                                              | No, see [prohibited businesses](https://docs.stripe.com/payments/konbini.md#prohibited-business-categories).                 | The payment method must be activated on the Dashboard settings page.                                                                                                                          | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/konbini.md?pm-info=business-locations).                    | Yes                                             |
| [Link](https://docs.stripe.com/payments/link.md)

  `link_payments`                                                                       | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/link.md).                                                  | Yes                                             |
| [MobilePay](https://docs.stripe.com/payments/mobilepay.md)

  `mobilepay_payments`                                                        | No, see [prohibited businesses](https://docs.stripe.com/payments/mobilepay.md#prohibited-business-categories).               | The payment method must be activated on the Dashboard settings page.                                                                                                                          | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/mobilepay.md?pm-info=business-locations).                  | Yes                                             |
| [Multibanco](https://docs.stripe.com/sources/multibanco.md)

  `multibanco_payments`                                                      | Yes                                                                                                                          | The payment method must be activated on the Dashboard settings page.                                                                                                                          | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/multibanco.md?pm-info=business-locations).                 | Yes                                             |
| [OXXO](https://docs.stripe.com/payments/oxxo.md)

  `oxxo_payments`                                                                       | Yes                                                                                                                          | Yes, on first payment attempt.                                                                                                                                                                | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/oxxo.md?pm-info=business-locations).                       | Yes                                             |
| [P24](https://docs.stripe.com/payments/p24.md)

  `p24_payments`                                                                          | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/p24.md?pm-info=business-locations).                        | Yes                                             |
| [Pay by Bank](https://docs.stripe.com/payments/pay-by-bank.md)

  `pay_by_bank_payments`                                                  | Yes                                                                                                                          | The payment method must be activated on the Dashboard settings page.                                                                                                                          | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/pay-by-bank.md?pm-info=business-locations).                | Yes                                             |
| [PayNow](https://docs.stripe.com/payments/paynow.md)

  `paynow_payments`                                                                 | No, see [prohibited businesses](https://docs.stripe.com/payments/paynow.md#prohibited-business-categories).                  | Yes, if MCC passes the PayNow prohibited business list.                                                                                                                                       | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/paynow.md?pm-info=business-locations).                     | Yes                                             |
| [Pix](https://docs.stripe.com/payments/pix.md)

  `pix_payments`                                                                          | Yes                                                                                                                          | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/pix.md?pm-info=business-locations).                        | No                                              |
| [PromptPay](https://docs.stripe.com/payments/promptpay.md)

  `promptpay_payments`                                                        | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/promptpay.md?pm-info=business-locations).                  | Yes                                             |
| [Revolut Pay](https://docs.stripe.com/payments/revolut-pay.md)

  `revolut_pay_payments`                                                  | Yes                                                                                                                          | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/revolut-pay.md?pm-info=business-locations).                | Yes                                             |
| [Satispay](https://docs.stripe.com/payments/satispay.md)

  `satispay_payments`                                                           | No, see [prohibited businesses](https://docs.stripe.com/payments/satispay.md#prohibited-and-restricted-business-categories). | The capability must be activated on the Dashboard settings page.                                                                                                                              | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/satispay.md?pm-info=business-locations).                   | Yes                                             |
| [SEPA Bank Transfers](https://docs.stripe.com/payments/bank-transfers.md)

  `sepa_bank_transfer_payments`                                | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bank-transfers.md?pm-info=business-locations).             | Yes                                             |
| [SEPA Debit](https://docs.stripe.com/payments/sepa-debit.md)

  `sepa_debit_payments`                                                     | Yes                                                                                                                          | Yes                                                                                                                                                                                           | Yes                                        | Connected account must be in a [supported business location](https://docs.stripe.com/payments/sepa-debit.md?pm-info=business-locations).                 | Yes                                             |
| [Stablecoin payments](https://docs.stripe.com/payments/stablecoin-payments.md)

  `crypto_payments`                                       | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in the US.                                                                                                                     | Yes                                             |
| [TWINT](https://docs.stripe.com/payments/twint.md)

  `twint_payments`                                                                    | No. See [onboarding requirements](https://docs.stripe.com/payments/twint.md#scheme-onboarding-requirements).                 | Activate the payment method in the Dashboard settings page.                                                                                                                                   | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/twint.md?pm-info=business-locations).                      | Yes                                             |
| [USD Bank Transfers](https://docs.stripe.com/payments/bank-transfers.md)

  `us_bank_transfer_payments`                                   | Yes                                                                                                                          | Yes                                                                                                                                                                                           | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bank-transfers.md?pm-info=business-locations).             | Yes                                             |
| [WeChat Pay](https://docs.stripe.com/payments/wechat-pay.md)

  `wechat_pay_payments`                                                     | No, see [prohibited businesses](https://pay.weixin.qq.com/index.php/public/wechatpay_en/proper_rule).                        | The payment method must be activated on the Dashboard settings page. Also, request [an invite](https://docs.stripe.com/payments/wechat-pay.md) to create charges on behalf of other accounts. | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/wechat-pay.md?pm-info=business-locations).                 | No                                              |

#### Account Dashboard access - Express or other Dashboard

For connected accounts that don’t have access to the full Stripe Dashboard, which includes Express and Custom accounts, you must request payment method capabilities for them. Some capabilities have business type restrictions, country restrictions, or additional information requirements for sole proprietors. In the following table, the **All business types supported** column indicates that all business types are supported unless prohibited by Stripe. The **Additional verification requirements** column refers to requirements in addition to those for the `card_payments` capability.

| Payment method and associated capability                                                                                                  | Generally available                                                                                                    | All business types supported                                                                                               | Additional verification requirements       | Country availability                                                                                                                                     | Accounts v2 support                             |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [ACH Direct Debit](https://docs.stripe.com/payments/ach-direct-debit.md)

  `us_bank_account_ach_payments`                                | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/ach-direct-debit.md?pm-info=business-locations).           | Yes; v2 capability name is `ach_debit_payments` |
| [Affirm](https://docs.stripe.com/payments/affirm.md)

  `affirm_payments`                                                                 | Yes                                                                                                                    | No, see [prohibited businesses](https://docs.stripe.com/payments/affirm.md#prohibited-and-restricted-business-categories). | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/affirm.md?pm-info=business-locations).                     | Yes                                             |
| [Afterpay Clearpay](https://docs.stripe.com/payments/afterpay-clearpay.md)

  `afterpay_clearpay_payments`                                | Yes                                                                                                                    | No, see [prohibited businesses](https://docs.stripe.com/payments/afterpay-clearpay.md#prohibited-business-categories).     | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/afterpay-clearpay.md?pm-info=business-locations).          | Yes                                             |
| [Alipay](https://docs.stripe.com/payments/alipay.md)

  `alipay_payments`                                                                 | No, request [an invite](https://docs.stripe.com/payments/alipay.md) to create charges on behalf of other accounts.     | No, see [prohibited businesses](https://support.stripe.com/questions/alipay-prohibited-businesses).                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/alipay.md?pm-info=business-locations).                     | No                                              |
| [Apple Pay](https://docs.stripe.com/apple-pay.md)

  Available with `card_payments`                                                       | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/connect/account-capabilities.md#apple-pay-country-availability).    | Yes                                             |
| [Bacs Direct Debit](https://docs.stripe.com/payments/payment-methods/bacs-debit.md)

  `bacs_debit_payments`                              | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/payment-methods/bacs-debit.md?pm-info=business-locations). | Yes                                             |
| [Bancontact](https://docs.stripe.com/payments/bancontact.md)

  `bancontact_payments`                                                     | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bancontact.md?pm-info=business-locations).                 | Yes                                             |
| [BECS Debit](https://docs.stripe.com/payments/au-becs-debit.md)

  `au_becs_debit_payments`                                               | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/au-becs-debit.md?pm-info=business-locations).              | Yes                                             |
| [BLIK](https://docs.stripe.com/payments/blik.md)

  `blik_payments`                                                                       | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/blik.md?pm-info=business-locations).                       | Yes                                             |
| [Canadian pre-authorized debit](https://docs.stripe.com/payments/acss-debit.md)

  `acss_debit_payments`                                  | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/acss-debit.md?pm-info=business-locations).                 | Yes                                             |
| [Cartes Bancaires](https://docs.stripe.com/payments/cartes-bancaires.md)

  `cartes_bancaires_payments`                                   | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/cartes-bancaires.md?pm-info=business-locations).           | Yes                                             |
| [Cash App Pay](https://docs.stripe.com/payments/cash-app-pay.md)

  `cashapp_payments`                                                    | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/cash-app-pay.md?pm-info=business-locations).               | Yes                                             |
| [EPS](https://docs.stripe.com/payments/eps.md)

  `eps_payments`                                                                          | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/eps.md?pm-info=business-locations).                        | Yes                                             |
| [FPX](https://docs.stripe.com/payments/fpx.md)

  `fpx_payments`                                                                          | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/fpx.md?pm-info=business-locations).                        | Yes                                             |
| [Google Pay](https://docs.stripe.com/google-pay.md)

  Available with `card_payments`                                                     | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/google-pay.md?pm-info=business-locations).                          | Yes                                             |
| [GrabPay](https://docs.stripe.com/payments/grabpay.md)

  `grabpay_payments`                                                              | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/grabpay.md?pm-info=business-locations).                    | Yes                                             |
| [iDEAL](https://docs.stripe.com/payments/ideal.md)

  `ideal_payments`                                                                    | Yes                                                                                                                    | Yes                                                                                                                        | Yes, tax ID required for sole proprietors. | Connected account must be in a [supported business location](https://docs.stripe.com/payments/ideal.md?pm-info=business-locations).                      | Yes                                             |
| [JCB Japan](https://support.stripe.com/questions/integrating-jcb-payments-for-connect-platforms-and-connected-accounts)

  `jcb_payments` | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in Japan.                                                                                                                      | Yes                                             |
| [Klarna](https://docs.stripe.com/payments/klarna.md)

  `klarna_payments`                                                                 | Yes                                                                                                                    | No, see [prohibited businesses](https://stripe.com/klarna/legal#restricted-business).                                      | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/klarna.md?pm-info=business-locations).                     | Yes                                             |
| [Link](https://docs.stripe.com/payments/link.md)

  `link_payments`                                                                       | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/link.md).                                                  | Yes                                             |
| [MobilePay](https://docs.stripe.com/payments/mobilepay.md)

  `mobilepay_payments`                                                        | Yes                                                                                                                    | No, see [prohibited businesses](https://docs.stripe.com/payments/mobilepay.md#prohibited-business-categories).             | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/mobilepay.md?pm-info=business-locations).                  | Yes                                             |
| [Multibanco](https://docs.stripe.com/sources/multibanco.md)

  `multibanco_payments`                                                      | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/multibanco.md?pm-info=business-locations).                 | Yes                                             |
| [OXXO](https://docs.stripe.com/payments/oxxo.md)

  `oxxo_payments`                                                                       | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/oxxo.md?pm-info=business-locations).                       | Yes                                             |
| [P24](https://docs.stripe.com/payments/p24.md)

  `p24_payments`                                                                          | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/p24.md?pm-info=business-locations).                        | Yes                                             |
| [Pay by Bank](https://docs.stripe.com/payments/pay-by-bank.md)

  `pay_by_bank_payments`                                                  | No                                                                                                                     | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/pay-by-bank.md?pm-info=business-locations).                | Yes                                             |
| [PayNow](https://docs.stripe.com/payments/paynow.md)

  `paynow_payments`                                                                 | Yes                                                                                                                    | No, see [prohibited businesses](https://docs.stripe.com/payments/paynow.md#prohibited-business-categories).                | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/paynow.md?pm-info=business-locations).                     | Yes                                             |
| [Pix](https://docs.stripe.com/payments/pix.md)

  `pix_payments`                                                                          | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/pix.md?pm-info=business-locations).                        | No                                              |
| [PromptPay](https://docs.stripe.com/payments/promptpay.md)

  `promptpay_payments`                                                        | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/promptpay.md?pm-info=business-locations).                  | Yes                                             |
| [SEPA Bank Transfers](https://docs.stripe.com/payments/bank-transfers.md)

  `sepa_bank_transfer_payments`                                | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bank-transfers.md?pm-info=business-locations).             | Yes                                             |
| [SEPA Debit](https://docs.stripe.com/payments/sepa-debit.md)

  `sepa_debit_payments`                                                     | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/sepa-debit.md?pm-info=business-locations).                 | Yes                                             |
| [Stablecoin payments](https://docs.stripe.com/payments/stablecoin-payments.md)

  `crypto_payments`                                       | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in the US.                                                                                                                     | Yes                                             |
| [TWINT](https://docs.stripe.com/payments/twint.md)

  `twint_payments`                                                                    | Yes                                                                                                                    | No. See [onboarding requirements](https://docs.stripe.com/payments/twint.md#scheme-onboarding-requirements).               | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/twint.md?pm-info=business-locations).                      | Yes                                             |
| [USD Bank Transfers](https://docs.stripe.com/payments/bank-transfers.md)

  `us_bank_transfer_payments`                                   | Yes                                                                                                                    | Yes                                                                                                                        | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/bank-transfers.md?pm-info=business-locations).             | Yes                                             |
| [WeChat Pay](https://docs.stripe.com/payments/wechat-pay.md)

  `wechat_pay_payments`                                                     | No, request [an invite](https://docs.stripe.com/payments/wechat-pay.md) to create charges on behalf of other accounts. | No, see [prohibited businesses](https://pay.weixin.qq.com/index.php/public/wechatpay_en/proper_rule).                      | No                                         | Connected account must be in a [supported business location](https://docs.stripe.com/payments/wechat-pay.md?pm-info=business-locations).                 | No                                              |

Learn more about [payment method support for Connect](https://docs.stripe.com/payments/payment-methods/payment-method-connect-support.md).

- AE
- AT
- AU
- BE
- BG
- BR
- CA
- CH
- CY
- CZ
- DE
- DK
- EE
- ES
- FI
- FR
- GB
- GI
- GR
- HK
- HR
- HU
- IE
- IT
- JP
- LI
- LT
- LU
- LV
- MT
- MX
- NL
- NO
- NZ
- PL
- PT
- RO
- SE
- SG
- SI
- SK
- TH
- US

- AE
- AT
- AU
- BE
- BG
- BR
- CA
- CH
- CZ
- DE
- DK
- EE
- ES
- FI
- FR
- GB
- GI
- GR
- HK
- HR
- HU
- IE
- IT
- JP
- LI
- LT
- LU
- LV
- MX
- MY
- NL
- NO
- NZ
- PL
- PT
- RO
- SE
- SG
- SK
- TH
- US

### India international payments

You must request the capability to support transactions from buyers located outside of India who use a currency different than INR.

Complete the following during your onboarding process to enable international payments:

1. **Specify a transaction purpose code**. The `export_purpose_code` property describes the nature of a payment received in foreign currency. The complete list of transaction purpose codes is maintained by Reserve Bank of India (RBI). You can find the subset of transaction purpose codes that are supported by Stripe in the [Transaction Purpose Code Listing](https://docs.stripe.com/india-accept-international-payments.md#TransactionPurposeCode).

2. **Specify your importer/exporter code (IEC)**. The `export_license_id` property holds the value for the IEC code. This code is issued by the Indian Director General of Foreign Trade (DGFT) to India. You can apply for an IEC at the [DGFT website](https://dgft.gov.in/CP/). An IEC is required under certain conditions.

   - If you plan to accept Visa or Mastercard, an IEC is required only if you sell physical goods. Your `export_purpose_code` is for physical goods.
   - If you plan to accept [AMEX international payments](https://support.stripe.com/questions/american-express-card-support-for-india-based-businesses) for all export transactions, including selling physical goods and services. This is described by India’s Foreign Trade Policy.

For more details, see [Accept International Payments from India](https://docs.stripe.com/india-accept-international-payments.md)

## Multiple capabilities 

Requesting multiple capabilities for a connected account is common, but involves the following considerations:

- Capabilities operate independently of each other.
- If a connected account has both `card_payments` and `transfers`, and the `status` of either one is `inactive`, then both capabilities are disabled.
- You can request or unrequest most capabilities for a connected account at any time during its lifecycle.

Capabilities also allow you to collect information for multiple purposes at the same time. For example, you can collect both required tax information and the information required for a requested capability.

## Request capabilities for an Account 

Capabilities are set on the [Account](https://docs.stripe.com/api/accounts/object.md) object. To get the list of available capabilities for an `Account`, use the [list Capabilities ](https://docs.stripe.com/api/capabilities/list.md?lang=curl) endpoint.

`Account` creation and requesting capabilities differ for connected accounts in different configurations.

- For connected accounts with access to the full Stripe Dashboard, including Standard accounts, some capabilities are requested automatically, based on their country. You can also request other capabilities for them.
- For connected accounts with access to the Express Dashboard, including Express accounts, you can either request their capabilities or use the [onboarding configuration settings](https://dashboard.stripe.com/settings/connect/onboarding-options/countries) to automate capability requests.
- For connected accounts without access to a Stripe-hosted Dashboard, including Custom accounts, you must request their capabilities.

#### Typed Accounts

```curl
curl https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d country=US \
  -d type=custom \
  -d "capabilities[card_payments][requested]=true" \
  -d "capabilities[transfers][requested]=true"
```

#### Controller properties

```curl
curl https://api.stripe.com/v1/accounts \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "controller[fees][payer]=application" \
  -d "controller[losses][payments]=application" \
  -d "controller[stripe_dashboard][type]=none" \
  -d "controller[requirement_collection]=application" \
  -d country=US \
  -d "capabilities[card_payments][requested]=true" \
  -d "capabilities[transfers][requested]=true"
```

Information requirements vary depending on the capability, but they often relate to identity verification or other information specific to a payment type.

When your connected account is successfully created, you can [retrieve a list](https://docs.stripe.com/api/accounts/retrieve.md) of its requirements:

```curl
curl https://api.stripe.com/v1/accounts/{{CONNECTEDACCOUNT_ID}} \
  -u "<<YOUR_SECRET_KEY>>:"
```

In the response, the `requirements` hash specifies the required information. The values for `payouts_enabled` and `charges_enabled` indicate whether payouts and charges are enabled for the account.

## Capabilities for existing connected accounts 

The following sections describe how to preview information requirements or manage capabilities for existing connected accounts using the [Capabilities API](https://docs.stripe.com/api/capabilities.md).

### Understand capability requirements

Stripe reports both risk and compliance requirements in the `Capability` object’s [requirements](https://docs.stripe.com/api/capabilities/object.md#capability_object-requirements) hash. The requirements listed in that hash indicate what information is needed from your connected account to prevent that capability from being disabled.

[Form and support-based requirements](https://docs.stripe.com/connect/handling-api-verification.md#handle-risk-verifications) follow the `<id>.<requirement_description>.<resolution_path>` format, where `id` is prefixed with `interv_` to indicate a risk verification requirement.

### Preview information requirements 

You can preview what information is needed from your connected account for a particular capability either before or after that capability has been requested.

When you request capabilities, it triggers an `account.updated` *event* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) and the `Account`’s requirements can change. To enable a requirement faster and avoid disabling the `Account`, preview the requirements and collect any required information before requesting the capability.

The following example [lists](https://docs.stripe.com/api/capabilities/retrieve.md) the requirements for an `Account`’s `card_payments` capability.

```curl
curl https://api.stripe.com/v1/accounts/{{CONNECTEDACCOUNT_ID}}/capabilities/card_payments \
  -u "<<YOUR_SECRET_KEY>>:"
```

Check the `requirements` hash in the response to see what information is needed:

```json
{
  "id": "card_payments",
  "object": "capability",
  "account": ""{{CONNECTED_ACCOUNT_ID}}"",
  "requested": false,
  "requested_at": null,
  "requirements": {
    "past_due": [],
    "currently_due": ["company.tax_id", ...],
    "eventually_due": [...],
    "disabled_reason": ...,
    "current_deadline": ...
  },
  "status": "unrequested"
}
```

The value for `status` identifies whether the capability has been requested. When the value is [requested](https://docs.stripe.com/connect/account-capabilities.md#requesting-unrequesting), the `Account`’s requirements are active.

In addition to previewing a capability’s requirements before requesting it, you can use the same endpoint to view a capability’s current requirements. That can help you stay informed when requirements change.

### Request and unrequest capabilities 

To request a capability for an `Account`, [update the Capability](https://docs.stripe.com/api/capabilities/update.md) to set its `requested` value to `true`. If the request succeeds, the API returns `requested: true` in the response.

To unrequest a capability for an `Account`, [update the Capability](https://docs.stripe.com/api/capabilities/update.md) to set its `requested` value to `false`. If the capability can’t be removed, the call returns an error. If the call succeeds, the API returns `requested: false` in the response.

You can also [request and remove an account’s capabilities](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#updating-capabilities) from the Dashboard. If a capability can’t be removed, its **Remove** button is disabled.

The example below requests the `transfers` capability for a connected account:

```curl
curl https://api.stripe.com/v1/accounts/{{CONNECTEDACCOUNT_ID}}/capabilities/transfers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d requested=true
```

The example below requests multiple capabilities for a connected account:

```curl
curl https://api.stripe.com/v1/accounts/{{CONNECTEDACCOUNT_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "capabilities[bancontact_payments][requested]=true" \
  -d "capabilities[eps_payments][requested]=true" \
  -d "capabilities[ideal_payments][requested]=true" \
  -d "capabilities[p24_payments][requested]=true" \
  -d "capabilities[sepa_debit_payments][requested]=true"
```

## Deprecated capabilities

Capabilities described in the following sections are deprecated. If possible, don’t request them for new `Accounts`. If you have existing `Accounts` that use deprecated capabilities, we recommend that you update them to use other capabilities instead.

### legacy_payments

The `legacy_payments` capability enables charges, payouts, and transfers. Newer `Accounts` enable those actions using the `card_payments` and `transfers` capabilities, which support more flexible configurations.

We recommend that you take the following steps:

1. Update your connected account onboarding process to request the appropriate combination of `card_payments` and `transfers` instead of `legacy_payments`.

2. Update your existing connected accounts to request the appropriate combination of `card_payments` and `transfers`.

3. Update any code that checks the status of `legacy_payments` to check the status of either `legacy_payments` or the appropriate new capability. For example, update code that relies on an `Account`’s ability to make card payments to run when either `legacy_payments` or `card_payments` is active. Similarly, update code that relies on an `Account`’s ability to accept transfers to run when either `legacy_payments` or `transfers` is active. The updated code works throughout the process of transitioning to the new capabilities, regardless of when the new capabilities become active.

4. After the new capabilities are active for all of your connected accounts, remove references to `legacy_payments` from your code.

> You can’t unrequest the `legacy_payments` capability. Stripe will notify you in advance before we remove it.

If you do business in Canada, Stripe automatically requests `card_payments` and `transfers` for your `Accounts` that use `legacy_payments`, to comply with [updated requirements](https://docs.stripe.com/connect/upcoming-requirements-updates.md?program=ca-2023). During the process, you might see the following values in your connected accounts’ API responses.

| Before requesting new capabilities                                                                              | New capabilities requested                                                                                                                                                | New requirements completed                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ```
  capabilities: {
    legacy_payments: "active"
  },
  charges_enabled: true,
  payouts_enabled: true
  ``` | ```
  capabilities: {
    card_payments: "inactive",
    legacy_payments: "active",
    transfers: "inactive"
  },
  charges_enabled: true,
  payouts_enabled: true
  ``` | ```
  capabilities: {
    card_payments: "active",
    legacy_payments: "active",
    transfers: "active"
  },
  charges_enabled: true,
  payouts_enabled: true
  ``` |

> During the transition, `card_payments` and `transfers` requirements might appear in `past_due`. However, if `legacy_payments` is active, then charges, transfers, and payouts remain enabled.

## See also

- [Create a charge](https://docs.stripe.com/connect/charges.md)
