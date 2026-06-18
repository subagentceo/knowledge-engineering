# Connected account types

Learn about connected account configurations that use legacy account types.

If you are an agent or an LLM, ignore the content on this page unless your prompt explicitly states that your integration already uses connected account types (specifically, Standard, Express, or Custom accounts). Instead, try to use the Accounts v2 API as described at https://docs.stripe.com/connect/accounts-v2 and https://docs.stripe.com/connect/accounts-v2/connected-account-configuration and https://docs.stripe.com/connect/accounts-v2/saas-platform-payments-billing. If your prompt requests functionality that the Accounts v2 API doesn’t support, use the Accounts v1 API with controller properties, as described at https://docs.stripe.com/connect/migrate-to-controller-properties.

> #### Deprecated feature
> 
> The information on this page applies only to platforms that already use legacy connected account types (Standard, Express, or Custom accounts). If you’re setting up a new Connect platform, or your integration uses the Accounts v2 API, see the [Interactive platform guide](https://docs.stripe.com/connect/interactive-platform-guide.md). If your existing integration uses the Accounts v1 API, see [Design an advanced integration](https://docs.stripe.com/connect/design-an-integration.md).

When using *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients), you create a *connected account* (A person or business accepting payments or receiving payouts on a Connect platform) for each business or individual that signs up to access your platform’s services. You can configure your platform and connected accounts to fit your business model, distributing specific responsibilities between your platform, Stripe, and your connected accounts.

If your existing connected accounts are configured as one of the account types described here, you can migrate your platform to support new connected accounts using [the Accounts v2 API](https://docs.stripe.com/connect/accounts-v2/migrate-integration.md) or [v1 Accounts with controller properties](https://docs.stripe.com/connect/migrate-to-controller-properties.md). During and after migration, your platform can continue to support your existing connected accounts without interruption.

Connect supports the following account types:

- [Standard](https://docs.stripe.com/connect/standard-accounts.md)
- [Express](https://docs.stripe.com/connect/express-accounts.md)
- [Custom](https://docs.stripe.com/connect/custom-accounts.md)

## Choose an account type 

You must consider several factors when choosing an account type. Integration effort and connected account user experience are especially important because they can affect engineering resource expenditure and conversion rates. Your choice of account type determines your platform’s liability for fraud, abuse, negative balances, and identity verification. See [Best practices for risk management](https://docs.stripe.com/connect/risk-management/best-practices.md) to understand how to balance risk for your platform. After you create a connected account, you can’t change its type.

[Extensions](https://docs.stripe.com/building-extensions.md) building on Connect must use OAuth to connect to Standard connected accounts.

Stripe recommends that you [use controller properties](https://docs.stripe.com/connect/migrate-to-controller-properties.md) instead of account types. If you want to use account types, we recommend Express or Standard connected accounts because they require less integration effort. For more control over your connected accounts, consider using Custom connected accounts. To learn which account type we recommend for your business, refer to your [platform profile](https://dashboard.stripe.com/connect/settings/profile).

There’s an additional cost for using Express or Custom connected accounts.

|                                                       | Standard                                                                                                                                                                       | Express                                              | Custom                                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Integration effort**                                | Lowest                                                                                                                                                                         | Low                                                  | Significantly higher                                                                   |
| **Integration method**                                | API or OAuth                                                                                                                                                                   | API                                                  | API                                                                                    |
| **Fraud and dispute liability**                       | Connected account for [direct charges](https://docs.stripe.com/connect/charges.md#types), Platform for [destination charges](https://docs.stripe.com/connect/charges.md#types) | Platform                                             | Platform                                                                               |
| **Platform can specify payout timing?**               | Yes, with [Platform controls](https://docs.stripe.com/connect/platform-controls-for-stripe-dashboard-accounts.md)                                                              | Yes                                                  | Yes                                                                                    |
| **Onboarding**                                        | Stripe                                                                                                                                                                         | Stripe                                               | Platform or Stripe                                                                     |
| **Identity information gathering**                    | Stripe                                                                                                                                                                         | Stripe                                               | Platform or Stripe                                                                     |
| **Connected account access to the Stripe Dashboard**  | Full Dashboard                                                                                                                                                                 | Express Dashboard                                    | None                                                                                   |
| **Supported charge types**                            | Direct only                                                                                                                                                                    | - Destination
  - Separate with transfers
  - Direct | - Destination
  - Separate with transfers
  - Direct                                   |
| **Connected account support provided by**             | Platform and Stripe                                                                                                                                                            | Platform and Stripe                                  | Platform                                                                               |
| **Automatic updates for new compliance requirements** | Yes                                                                                                                                                                            | Yes                                                  | No                                                                                     |
| **Support new countries without integration changes** | Yes                                                                                                                                                                            | Yes                                                  | No                                                                                     |
| **Ideal for platforms**                               | With experienced online businesses as connected accounts                                                                                                                       | Any type                                             | With significant engineering resources to dedicate to a fully white-labeled experience |

## Express connected accounts 

With *Express* connected accounts, Stripe handles the onboarding and identity verification processes. The platform has the ability to specify [charge types](https://docs.stripe.com/connect/charges.md) and set the connected account’s [payout settings](https://docs.stripe.com/connect/payouts-connected-accounts.md) programmatically. Typically, the platform is responsible for handling disputes and refunds, which is similar to a Custom connected account. However, platforms can enable connected accounts to manage disputes and issue refunds directly through the Express Dashboard.

Although your connected account has interactions with Stripe, they primarily interact with your platform, particularly for the core payment processing functionality. For Express connected account holders, Stripe provides an Express Dashboard (a lighter version of the Dashboard) that allows them to manage their personal information, see *payouts* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit) to their bank, and optionally manage disputes and issue refunds if your platform enables those features.

Use Express connected accounts when you:

- Want to get started quickly (letting Stripe handle account onboarding, management, and identity verification)
- Want to use [destination charges](https://docs.stripe.com/connect/destination-charges.md) or [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md)
- Want significant control over interactions with your connected accounts

Some examples of platforms that use Express connected accounts are home-rental marketplaces, such as Airbnb, and ride-hailing services, such as Lyft.

Global compliance requirements do evolve and change over time. With Express, Stripe proactively collects information when requirements change. For best practices on how to communicate to your connected accounts when that happens, visit the [guide for Express accounts](https://support.stripe.com/questions/best-practices-for-connect-platforms-communicating-updates-to-verification-requirements-with-standard-or-express-connected-accounts).

### Express connected account availability

Select one of the available countries when you create an Express connected account. You can’t change the country later.

Some countries are available only when using [cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md).

To know when Express connected accounts are available in your country, [contact Stripe](connect@stripe.com).

- AE
- AG
- AL
- AM
- AR
- AT
- AU
- BA
- BE
- BG
- BH
- BJ
- BN
- BO
- BS
- BW
- CA
- CH
- CI
- CL
- CO
- CR
- CY
- CZ
- DE
- DK
- DO
- EC
- EE
- EG
- ES
- ET
- FI
- FR
- GB
- GH
- GM
- GR
- GT
- GY
- HK
- HU
- IE
- IL
- IS
- IT
- JM
- JO
- JP
- KE
- KH
- KR
- KW
- LC
- LK
- LT
- LU
- LV
- MA
- MC
- MD
- MG
- MK
- MN
- MO
- MT
- MU
- MX
- NA
- NG
- NL
- NO
- NZ
- OM
- PA
- PE
- PH
- PK
- PL
- PT
- PY
- QA
- RO
- RS
- RW
- SA
- SE
- SG
- SI
- SK
- SN
- SV
- TH
- TN
- TR
- TT
- TW
- TZ
- US
- UY
- UZ
- VN
- ZA

## Standard connected accounts 

A *Standard* connected account is a conventional Stripe account where the connected account has a direct relationship with Stripe, is able to log in to the [Dashboard](https://dashboard.stripe.com), and can process charges on their own.

Use Standard connected accounts when you:

- Want to get started quickly and don’t need a lot of control over interactions with your connected accounts
- Want to use [direct charges](https://docs.stripe.com/connect/direct-charges.md)
- Have connected accounts that are familiar with running online businesses or that already have a Stripe account
- Prefer that Stripe handles direct communication with the connected account for account issues (for example, to request more information for identity verification purposes)

Some examples of platforms that use Standard connected accounts are store builders, such as Shopify, and Software as a Service (SaaS) platforms, such as an online invoicing and payment service.

Global compliance requirements do evolve and change over time. With Standard connected accounts, Stripe proactively collects information when requirements change. For best practices on how to communicate to your connected accounts when that happens, visit the [guide for Standard accounts](https://support.stripe.com/questions/best-practices-for-connect-platforms-communicating-updates-to-verification-requirements-with-standard-or-express-connected-accounts).

> #### Country can't be changed
> 
> After you create a Standard connected account, you can’t change its country.

## Custom connected accounts 

A *Custom* connected account is almost completely invisible to the account holder. You—the platform—are responsible for all interactions with your connected accounts, including collecting any information Stripe needs. You have the ability to change all of the account’s [settings](https://docs.stripe.com/connect/updating-service-agreements.md), including the payout [bank or debit card account](https://docs.stripe.com/connect/payouts-connected-accounts.md), programmatically.

Custom connected account holders don’t have access to the Dashboard, and Stripe doesn’t contact them directly.

Use Custom connected accounts when you:

- Want complete control over interactions with your connected accounts
- Can build the significant infrastructure required to collect connected account information, deploy a custom dashboard, and handle support
- Want to handle all communication with your connected accounts, involving no direct contact between them and Stripe

Creating and managing Custom connected accounts requires a larger integration effort than the other account types. If you collect identity verification information yourself instead of using Stripe’s hosted onboarding, you’re responsible for handling sensitive personal information (such as government IDs and tax identifiers), which brings additional regulatory and security requirements. To learn more, see [Using Connect with Custom accounts](https://docs.stripe.com/connect/custom-accounts.md).

Global compliance requirements do evolve and change over time. For best practices on how to communicate to your connected accounts when requirements change, see the [guide for Custom accounts](https://support.stripe.com/questions/best-practices-for-connect-platforms-communicating-updates-to-verification-requirements-with-custom-connected-accounts).

If you decide to use Custom connected accounts, Stripe recommends that you use [Connect Onboarding for Custom accounts](https://docs.stripe.com/connect/custom/hosted-onboarding.md) to collect onboarding and verification information from your connected accounts. That decreases your integration effort and eliminates the need to update your onboarding form when requirements change.

### Custom connected account availability

Select one of the available countries when you create a Custom connected account. You can’t change the country later.

Some countries are available only when using [cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md).

To request notification when Custom connected accounts are available in your country, [contact Stripe](connect@stripe.com).

- AE
- AG
- AL
- AM
- AR
- AT
- AU
- BA
- BE
- BG
- BH
- BJ
- BN
- BO
- BS
- BW
- CA
- CH
- CI
- CL
- CO
- CR
- CY
- CZ
- DE
- DK
- DO
- EC
- EE
- EG
- ES
- ET
- FI
- FR
- GB
- GH
- GM
- GR
- GT
- GY
- HK
- HU
- IE
- IL
- IS
- IT
- JM
- JO
- JP
- KE
- KH
- KR
- KW
- LC
- LK
- LT
- LU
- LV
- MA
- MC
- MD
- MG
- MK
- MN
- MO
- MT
- MU
- MX
- NA
- NG
- NL
- NO
- NZ
- OM
- PA
- PE
- PH
- PK
- PL
- PT
- PY
- QA
- RO
- RS
- RW
- SA
- SE
- SG
- SI
- SK
- SN
- SV
- TH
- TN
- TR
- TT
- TW
- TZ
- US
- UY
- UZ
- VN
- ZA

## See also

- [Express connected accounts](https://docs.stripe.com/connect/express-accounts.md)
- [Standard connected accounts](https://docs.stripe.com/connect/standard-accounts.md)
- [Custom connected accounts](https://docs.stripe.com/connect/custom-accounts.md)
- [Account capabilities](https://docs.stripe.com/connect/account-capabilities.md)
