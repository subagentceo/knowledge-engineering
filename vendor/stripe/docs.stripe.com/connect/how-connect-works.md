# How Connect works

Learn how Connect's features support multiparty integrations.

Businesses such as marketplaces and software platforms use Connect to manage and route payments and payouts between sellers, customers, service providers, and other entities.

- **Onboarding**: Onboard and verify sellers using connected accounts with Stripe-hosted flows, or build your own with our APIs.
- **Account management**: Enable sellers to manage their account with Stripe-hosted Dashboards, embedded components, or custom interfaces you can build with our APIs.
- **Payments**: Integrate payments and route funds to sellers on your platform.
- **Payouts**: Pay out sellers with a variety of payout options. Enable cross-border payouts for global sellers.
- **Platform tools**: Manage your platform or marketplace with a sophisticated suite of platform tooling for monetization, seller support, risk management, and tax reporting.
![An overview of interactions between a Connect platform, customers, and connected accounts](https://b.stripecdn.com/docs-statics-srv/assets/connect-overview.c6c7d0fac01a655bc51523add1eecd21.png)

## Elements of a Connect integration 

A Connect integration consists of five main components:

- Your platform’s web or mobile application
- Your platform’s Stripe account
- Connected accounts
- Stripe payments
- Stripe payouts

When onboarding to Connect, you create a Connect application on your platform’s Stripe account. The Connect application allows you to create and access data on your connected accounts. You use your Stripe API keys to make [API requests on behalf of your connected accounts](https://docs.stripe.com/connect/authentication.md).

Connect offers a number of different options for onboarding connected accounts and creating payments and payouts on them. Giving connected accounts access to Stripe-hosted Dashboards and embedded components lets you customize their financial workflows while minimizing your development effort and time to launch.

Connect charge types offer different ways to orchestrate payments to your connected accounts, whether enabling them to accept payments directly or facilitating payments between multiple sellers. Connect payouts enable you to manage payout timing, destination payout accounts, and payout monetization on your connected accounts.

## Availability

The countries where you can have connected accounts depends on the business location of your platform’s country:

- [Cross-border payouts](https://docs.stripe.com/connect/cross-border-payouts.md): If your platform qualifies, you can pay out connected accounts in their local currencies. Stripe determines if your platform meets the criteria to support cross-border payouts.

- Extra features: If using Connect with additional payment methods or with [Stripe Terminal](https://docs.stripe.com/terminal.md), country availability is also dependent on those features.

### Country availability



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

Available in preview:

- AO
- AZ
- BD
- BR
- BT
- DZ
- GA
- GE
- GI
- HR
- ID
- IN
- KZ
- LA
- LI
- MY
- MZ
- NE
- SM

## Use cases

Connect supports many types of business models:

- **SaaS platforms**: Enable connected accounts to accept payments directly. Platforms such as Squarespace enable businesses to build their own online stores to sell directly to customers.
- **Marketplaces**: Collect payments and pay out to multiple sellers. Platforms such as Airbnb connect homeowners to potential guests.

## Design an integration

To determine how to build a Connect integration for your use case:

1. Complete the [Connect platform onboarding](https://dashboard.stripe.com/connect) process or view [example integrations](https://docs.stripe.com/connect.md#build-saas-platform-marketplace).
2. After onboarding, review your [integration guide](https://docs.stripe.com/connect/interactive-platform-guide.md). The guide is customized with selections you’ve made in platform onboarding.
3. Follow the [onboarding quickstart](https://docs.stripe.com/connect/onboarding/quickstart.md) to set up and start using your integration.
