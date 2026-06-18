# ISV A2P 10DLC Onboarding Overview

This onboarding overview is for independent software vendors (ISVs) who want to register themselves and their customers for A2P 10DLC. To learn more about US A2P 10DLC, see [the A2P 10DLC overview page](/docs/messaging/compliance/a2p-10dlc).

If you're an ISV who only sends messages on behalf of your own company, follow the [Direct Standard and Low-Volume Standard Registration Overview](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding) instead. This guide is only for ISVs who send messages on behalf of their customers.

This overview explains how to prepare for A2P 10DLC registration by walking through the following steps:

1. **Identify your ISV architecture**: The way your Accounts and Messaging Campaigns are organized determines the specific steps you'll need to take when onboarding.
2. **Onboard via the Twilio Console or API**: You register your ISV and your customers for A2P 10DLC by creating Customer Profiles, registering Brands, and registering Campaigns via the Console or API.
   * **Creating Customer Profiles**: A Twilio Customer Profile gives you access to products that can increase consumer trust, such as A2P 10DLC. You can create a Primary Customer Profile for your ISV and Secondary Customer Profiles for your customers.
   * **Registering Brands**: A Brand represents the sender of a messaging use case, such as your customer's company. It belongs to a single Customer Profile. Each Brand comes with its own Brand registration fee and The Campaign Registry (TCR) trust score.
   * **Registering Campaigns**: A Campaign represents a single use case for sending messages. It belongs to one Brand, which can have one to many Campaigns associated with it.

## Sample ISV onboarding process

This section shows how Owl Inc, an ISV with two customers, can onboard to A2P 10DLC.

Owl Inc is the primary Account, and it has separated its two customers, Acme and Buy n Large, into subaccounts to separate billing. Each company, including Owl Inc, has its own SMS messaging use cases. Acme Corp and Buy n Large use Owl's platform to send SMS messages to their own respective users.

* Owl Inc sends two-factor authentication (2FA) messages for its customers to log in to their platform.
* Acme Corp sends support ticket status updates.
* Buy n Large sends promotional messages and appointment offers.

Owl Inc has a [Messaging Service](/docs/messaging/services) set up for each of these messaging use cases.

![Flowchart showing Owl Inc. with primary account and subaccounts for Acme Corp and Buy n Large, detailing use cases.](https://docs-resources.prod.twilio.com/5e357c0b09aa554b5faf4ee83546a4ac416aeac11186a4a94ab6f1b00ac9ba21.png)

### Determine ISV architecture type

Before onboarding to A2P 10DLC, Owl Inc needs to identify its ISV architecture type. By comparing the information above to this [table](#architecture-types), it determines it's using type #1. This type informs the specific steps it'll follow to onboard to A2P 10DLC by creating Customer Profiles, registering Brands, and registering Campaigns.

### Create Customer Profiles and register Brands

Owl Inc needs to create three separate Customer Profiles and register three separate Brands to represent its Account structure. It's also responsible for gathering registration information from Acme Corp and Buy n Large to create their Customer Profiles and Brands. Alternatively, it could build a portal with Twilio APIs for self-registration.

* Owl Inc
  * Create one Primary Customer Profile.
  * Register one Brand.
* Acme Corp
  * Create one Secondary Customer Profile.
  * Register one Brand.
* Buy n Large
  * Create one Secondary Customer Profile.
  * Register one Brand.

### Register Campaigns

Owl Inc needs to register four Campaigns to represent the messaging use cases of itself and its customers.

* One Campaign for Owl Inc's use case of sending 2FA messages to its customers.
* Three Campaigns for the use cases of Acme Corp and Buy n Large.
  * Acme Corp's use case for sending support ticket updates.
  * Buy n Large's use case for sending promotional content.
  * Buy n Large's use case for sending appointment messages.

## Step 1: Identify your ISV architecture

There are many different patterns of how Twilio Accounts, subaccounts, and Messaging Services are organized for ISVs. Before you begin onboarding to A2P 10DLC, you'll need to identify which ISV architecture type you're using from the six types that are detailed below. Your architecture type determines the specific onboarding steps you'll need to take such as creating Customer Profiles, registering Brands, and registering Campaigns.

### Architecture types

> \[!WARNING]
>
> Architecture types #3, #5, and #6 are incompatible with A2P 10DLC as of Summer 2023.
>
> In these cases, Twilio recommends restructuring to type #1 for the best long-term viability. Remember that restructuring to a subaccount architecture resets the opt-out mechanisms that Twilio manages because these settings apply at the Account level. This can be handled by having an up-to-date opt-out list before the restructure.

Identify your architecture type using the table below, then continue to that type's section to learn more about your onboarding steps. Once you've identified your onboarding steps, you can proceed to [Step 2: Onboard via API or the Console](#step-2-onboard-via-api-or-the-console).

|                                                        | [#1](#isv-architecture-1) | [#2](#isv-architecture-2) | [#3](#isv-architecture-3) | [#4](#isv-architecture-4) | [#5](#isv-architecture-5) | [#6](#isv-architecture-6) |
| ------------------------------------------------------ | ------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| Do you use subaccounts?                                | YES                       | YES                       | YES                       | NO                        | NO                        | NO                        |
| Are subaccounts mapped to individual customers?        | YES                       | NO                        | YES                       | N/A                       | N/A                       | N/A                       |
| Do you use Messaging Services?                         | YES                       | YES                       | NO                        | YES                       | YES                       | NO                        |
| Are Messaging Services mapped to individual customers? | N/A                       | YES                       | N/A                       | YES                       | NO                        | N/A                       |

### ISV architecture #1

#### Description

* You use subaccounts and they are mapped to individual customers.
* You use Messaging Services.

Type #1 is the preferred architecture for A2P 10DLC onboarding because the messaging traffic for each customer is separated by subaccounts. This allows for easier analytics tracking and minimizes the impact of any potential noncompliant traffic from one customer on the rest of your customers.

#### Onboarding steps

* For each of your customers that have A2P 10DLC messaging use cases:
  * Create a Secondary Customer Profile under the customer's subaccount.
  * Register a Brand under the customer's subaccount.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service under the same subaccount.
* If your ISV also has A2P 10DLC messaging use cases:
  * Create a Primary Customer Profile under your primary Account.
  * Register a Brand under your primary Account.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service under the same Account.

### ISV architecture #2

#### Description

* You use subaccounts and they are not mapped to individual customers.
* You use Messaging Services and they are mapped to individual customers.

A risk of this type is that if one customer sends noncompliant traffic, Twilio may need to suspend the primary Account of that customer. This could include compliant customers in other subaccounts. It's also more difficult to track messaging analytics for each customer.

#### Onboarding steps

* For each of your customers that have A2P 10DLC messaging use cases:
  * Create a Secondary Customer Profile under your primary Account.
  * Register a Brand under your primary Account.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service within your primary Account.
* If your ISV also has A2P 10DLC messaging use cases:
  * Create a Primary Customer Profile under your primary Account.
  * Register a Brand under your primary Account.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service under the same Account.

### ISV architecture #3

#### Description

* You use subaccounts and they are mapped to individual customers.
* You do not use Messaging Services.

Type #3 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1 for the best long-term viability.

### ISV architecture #4

#### Description

* You do not use subaccounts.
* You use Messaging Services and they are mapped to individual customers.

A risk of this type is that if one customer sends noncompliant traffic, Twilio may need to suspend the primary Account of that customer which could include other compliant customers. It is also more difficult to track messaging analytics for each customer.

#### Onboarding steps

* For each of your customers that have A2P 10DLC messaging use cases:
  * Create a Secondary Customer Profile under your primary Account.
  * Register a Brand under your primary Account.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service within your primary Account.
* If your ISV also has A2P 10DLC messaging use cases:
  * Create a Primary Customer Profile under your primary Account.
  * Register a Brand under your primary Account.
  * Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service under the same Account.

### ISV architecture #5

* You do not use subaccounts.
* You use Messaging Services and they are not mapped to individual customers.

Type #5 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1 for the best long-term viability.

### ISV architecture #6

* You do not use subaccounts.
* You do not use Messaging Services.

Type #6 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1 for the best long-term viability.

## Step 2: Onboard via API or the Console

After you identify your ISV architecture type, create Customer Profiles, Brands, and Campaigns in the Console or with the API.

When creating Secondary Customer Profiles and registering Brands for your customer, remember to fill in the business details of that specific customer. Use that customer's details rather than your own ISV's details.

If you're registering a government, nonprofit, 527 political organization, K-12 education, or emergency messaging use case, consult these resources before continuing. Review the [Special Use Cases for A2P 10DLC Help Center article](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC) and [Registration for Government and Nonprofit Agencies](/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies).

> \[!NOTE]
>
> Primary Customer Profiles can only be created in the Console at this time.

### Determine your Brand type

Before creating a Customer Profile and registering a Brand, you need to determine if it's a Standard, Low-Volume Standard, or Sole Proprietor Brand.

See the [Determine your Brand type section](/docs/messaging/compliance/a2p-10dlc#determine-your-brand-type) of the US A2P 10DLC Overview to learn more about Brand types.

### Onboard with API

If you have multiple customers to register, use Twilio APIs to automate the onboarding process.

* To register a Standard or Low-Volume Standard Brand via API, follow [this guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api).
* To register a Sole Proprietor Brand via API, follow [this guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new).

### Onboard with the Console

If you prefer a more guided experience, or are only registering a few customers, you can use the Console for onboarding. To start, go to [**Twilio Console** > **Messaging** > **Regulatory Compliance** > **Onboarding**](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding) to begin creating Customer Profiles, registering Brands, and registering Campaigns.

Use the **Switch Customer Profile** option to move between your Primary and Secondary Customer Profiles after you create them. The Use the Primary Customer Profile only for your ISV's Brands and Campaigns, and use Secondary Customer Profiles only for your customers' Brands and Campaigns.

Your next step depends on if you're registering Standard, Low-Volume Standard, or Sole Proprietor Brands.

* To register a Standard or Low-Volume Standard Brand via the Console, follow [this guide](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding).
* To register a Sole Proprietor Brand via the Console, follow [this guide](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview).

The guides above are written for direct self-onboarding of Brands and Campaigns. The process is identical to registering your own customers. The only difference is that you need to switch to the correct Secondary Customer Profile.

## Get help with A2P 10DLC

[Get help](https://www.twilio.com/blog/twilio-professional-services-for-us-a2p-10dlc-registrations)

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
