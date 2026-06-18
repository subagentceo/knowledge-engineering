# Choose your onboarding configuration

Learn about the different options for onboarding your connected accounts.

Stripe offers several different onboarding options:

- **Stripe-hosted onboarding**: Your connected accounts go through the onboarding flow in a Stripe-hosted web form.
- **Embedded onboarding**: You embed the Account onboarding component directly in your application and your connected accounts go through the onboarding flow without leaving your application.
- **API onboarding**: You use the Stripe API to build your own customized onboarding UI.

Choose the onboarding option that best fits your business. We recommend using Stripe-hosted onboarding or Embedded onboarding. These options automatically update to handle changing requirements when they apply to a connected account.

|                                                       | [**STRIPE-HOSTED ONBOARDING**](https://docs.stripe.com/connect/hosted-onboarding.md) | [**EMBEDDED ONBOARDING**](https://docs.stripe.com/connect/embedded-onboarding.md)                                         | [**API ONBOARDING**](https://docs.stripe.com/connect/api-onboarding.md)                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **INTEGRATION EFFORT**                                | Minimal, go live quickly                                                             | More effort, go live quickly                                                                                              | Most effort, can delay going live                                                                          |
| **CUSTOMIZATION**                                     | Stripe-branded with limited platform branding                                        | [Highly themeable](https://docs.stripe.com/connect/customize-connect-embedded-components.md) with limited Stripe branding | Full control over your own UI                                                                              |
| **AUTOMATIC UPDATES FOR NEW COMPLIANCE REQUIREMENTS** | Immediate                                                                            | Immediate                                                                                                                 | Requires integration changes                                                                               |
| **SUPPORT NEW COUNTRIES WITHOUT INTEGRATION CHANGES** | ✓ Supported                                                                          | ✓ Supported                                                                                                               | ❌                                                                                                          |
| **SUPPORT LEGAL ENTITY SHARING** (Accounts v1 only)   | ✓ Supported                                                                          | ✓ Supported                                                                                                               | ❌                                                                                                          |
| **FLOW LOGIC**                                        | Limited control                                                                      | Limited control                                                                                                           | Full control                                                                                               |
| **IDEAL FOR**                                         | Platforms that want Stripe to handle onboarding                                      | Platforms that want a branded onboarding flow within their application                                                    | Platforms that require full control of the onboarding flow and have the resources to build and maintain it |

## Stripe-hosted onboarding

Stripe-hosted onboarding is a web form hosted by Stripe with your brand’s name, color, and icon, and is localized for all Stripe-supported countries. Stripe-hosted onboarding uses the Accounts API to read an account’s requirements and generate a custom guided flow. It lets the account user upload documents and applies data validation, including real-time verification when possible.

Additionally, Stripe-hosted onboarding lets existing connected accounts update their business type or previously submitted details.

Stripe-hosted onboarding supports [networked onboarding](https://docs.stripe.com/connect/networked-onboarding.md), which allows owners of multiple Stripe accounts to share certain types of business information between them. When they onboard an account, they can reuse that information from an existing account instead of resubmitting it.

Use Stripe-hosted onboarding if you want Stripe to handle onboarding and reduce the amount of effort for your platform.

See [Stripe-hosted onboarding](https://docs.stripe.com/connect/hosted-onboarding.md) to learn more.

## Embedded onboarding

Embedded onboarding is a themeable onboarding UI with limited Stripe branding, and it’s localized for all Stripe-supported countries. Your platform embeds the [Account onboarding component](https://docs.stripe.com/connect/supported-embedded-components/account-onboarding.md) in your application, and your connected accounts interact with the embedded component without leaving your application. Embedded onboarding uses the Accounts API to read an account’s requirements and generate a custom guided flow. It lets the account user upload documents and applies data validation, including real-time verification when possible.

Additionally, Embedded onboarding lets existing connected accounts update their business type or previously submitted details.

Embedded onboarding supports [networked onboarding](https://docs.stripe.com/connect/networked-onboarding.md), which allows owners of multiple Stripe accounts to share certain types of business information between them. When they onboard an account, they can reuse that information from an existing account instead of resubmitting it.

With embedded onboarding, you get a customized onboarding flow and don’t need to update your onboarding integration as compliance requirements change.

See [Embedded onboarding](https://docs.stripe.com/connect/embedded-onboarding.md) to learn more.

## API onboarding

You use the Accounts API to build an onboarding flow and handle identity verification, localization, and error handling for each country your connected accounts onboard in. Your platform is responsible for all interactions with your connected accounts and for collecting all the information needed to verify each account. You must plan on reviewing and updating onboarding requirements at least every 6 months.

We don’t recommend this option unless you’re committed to the operational complexity required to build and maintain an API onboarding flow. For a customized onboarding flow, use embedded onboarding.

See [API onboarding](https://docs.stripe.com/connect/api-onboarding.md) to learn more.
