# Identity verification for connected accounts

Use identity verification to reduce risk on your platform when using Connect.

Every country has its own requirements that accounts must meet so that Stripe can pay out funds to individuals and companies. These are typically known as [Know Your Customer](https://support.stripe.com/questions/know-your-customer-obligations) (KYC) requirements. Regardless of the country, broadly speaking, the requirements Stripe must meet are:

- Collecting information about the individual or company receiving funds
- Verifying information to establish that we know who our customers are

*Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platforms collect the required information from users and provide it to Stripe. This can include information about the legal entity and personal information about the representative of the business, and those who own or control the business. Stripe then attempts verification. In some cases, Stripe might be able to verify an account by confirming some or all of the keyed-in data provided. In other cases, Stripe might require additional information, including, for example, a scan of a valid government-issued ID, a proof of address document, or both.

You can proactively verify identity requirements beyond standard KYC using [additional document verification for connected accounts](https://docs.stripe.com/connect/additional-verifications/identity-document.md).

This page explains the verification flow options to meet Stripe KYC requirements, but the recommended way to manage verification is to integrate [Connect Onboarding](https://docs.stripe.com/connect/custom/hosted-onboarding.md), which lets Stripe take care of the complexity around the basic KYC obligations. Handling the details of account verification is initially complex and requires vigilance to keep up with the constantly evolving regulatory changes around the world.

If you decide to handle account verification yourself, continue reading to learn about the verification flow options, how API fields translate to companies and individuals, and how to localize information requests. Also, read [Handling Identity Verification with the API](https://docs.stripe.com/connect/handling-api-verification.md) to learn how to programmatically provide information and handle requests.

Even after Stripe verifies a connected account, platforms still must [monitor for and prevent fraud](https://docs.stripe.com/connect/risk-management/best-practices.md#fraud). Don’t rely on Stripe’s verification to meet any independent legal KYC or verification requirements.

## Verification requirements 

Verification requirements for connected accounts vary by account, depending on:

- Country
- Capabilities
- Business type (for example, individual, company)
- Business structure (for example, public corporation, private partnership)
- The service agreement type between Stripe and the connected account
- The risk level

You must collect and verify specific information to enable charges and *payouts* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit). For example, for a company in the US, you might need to collect:

- Information about the business (for example, name, address, tax ID number).
- Information about the person opening the Stripe account (for example, name, date of birth).
- Information about [beneficial owners](https://support.stripe.com/questions/beneficial-owner-and-director-definitions) (for example, name, email).

At certain variable thresholds—usually when a specified amount of time has passed or volume of charges have been made—you might need to collect and verify additional information. Stripe temporarily pauses charges or payouts if the information isn’t provided or verified according to the thresholds for [required information](https://docs.stripe.com/connect/required-verification-information.md). For example, additional information might include verification of the company tax ID number.

## Onboarding flows 

As the platform, you must decide if you want to collect the required information from your connected accounts *up front* (Upfront onboarding is a type of onboarding where you collect all required verification information from your users at sign-up) or *incrementally* (Incremental onboarding is a type of onboarding where you gradually collect required verification information from your users. You collect a minimum amount of information at sign-up, and you collect more information as the connected account earns more revenue). Up-front onboarding collects the `eventually_due` requirements for the account, while incremental onboarding only collects the `currently_due` requirements. You can control this behavior using the [collection_options.fields](https://docs.stripe.com/api/account_links/create.md#create_account_link-collection_options-fields) parameter.

| Onboarding type | Advantages                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Up-front**    | - Normally requires only one request for all information
  - Avoids the possibility of payout and processing issues due to missed deadlines
  - Exposes potential risk early when accounts refuse to provide information |
| **Incremental** | - Accounts can onboard quickly because they don’t have to provide as much information                                                                                                                                    |

To determine whether to use up-front or incremental onboarding, review the [requirements](https://docs.stripe.com/connect/required-verification-information.md) for your connected accounts’ locations and capabilities. While Stripe tries to minimize any impact to connected accounts, requirements might change over time.

For connected accounts where you’re responsible for requirement collection, you can customize the behavior of [future requirements](https://docs.stripe.com/connect/handle-verification-updates.md) using the `collection_options` parameter. To collect the account’s future requirements, set [collection_options.future_requirements](https://docs.stripe.com/api/account_links/create.md#create_account_link-collection_options-future_requirements) to `include`.

### Collect additional public details

Stripe collects the required public details for each connected account. You can choose additional fields to collect during onboarding according to your business needs. Any fields you choose that Stripe doesn’t require appear as optional, and connected accounts can choose whether to provide them.

1. In the [Public details](https://dashboard.stripe.com/settings/connect/onboarding-options/public-details) settings in the Dashboard, enable the **Collect public details** toggle.
2. Select the fields to show to connected accounts during onboarding.
3. Click **Save**.

#### Available fields

You can collect the following public details:

| Field                                                                            | Description                                                                                                     |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Statement descriptor](https://docs.stripe.com/connect/statement-descriptors.md) | The text that appears on a customer’s credit card or bank statement for payments made to the connected account. |
| Customer support phone number                                                    | A phone number customers can call for support related to the connected account.                                 |
| Customer support address                                                         | A mailing address customers can use to contact the connected account.                                           |
| Customer support email                                                           | An email address customers can use to contact the connected account.                                            |

> #### Requirements vary
> 
> Stripe’s requirements vary by connected account based on their business type, country, and requested capabilities. Enable fields to make sure they always appear during onboarding, whether or not they’re required.

## Business type 

The specific KYC information depends on the [type of business entity](https://docs.stripe.com/api/accounts/object.md#account_object-business_type). They’re:

- `individual`: Collect information about the person.
- `company`: Collect information about the company. Depending on the countries your connected accounts are in, you might also have to collect information about [beneficial owners](https://support.stripe.com/questions/beneficial-owner-and-director-definitions).
- `non_profit`: Collect information about the non-profit organization.
- `government_entity` (available for US connected accounts only): Collect information about the government entity.

If you or your users are unsure of their entity type, the information might be in the business formation documents or tax documents for that entity.

See the [list of requirements](https://docs.stripe.com/connect/required-verification-information.md) for different business types by country. When you know what information to collect, you can read more about [handling identity verification with the API](https://docs.stripe.com/connect/handling-api-verification.md).

## Business structure 

For all business types other than `individual`, you can further classify your user’s business by identifying its legal (business) structure. A business structure describes the details of a business entity such as day-to-day operations, tax burdens, liability, and organizational schema. You can classify it by using [company[structure]](https://docs.stripe.com/api/accounts/create.md#create_account-company-structure) in the `Accounts` object.

Providing this information to Stripe gets you the most accurate business classification for compliance purposes. While it isn’t required, it can reduce onboarding requirements. For example, you’re required to provide owner information for private companies, but not for public companies. If you don’t provide information on the `structure`, Stripe defaults to classifying the company as private and requires you to provide owner information. See the [list of requirements](https://docs.stripe.com/connect/required-verification-information.md) for the supported business structures in all countries.

#### Country - Canada (CA)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a for-profit `company`.

| Business structure    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `private_corporation` | A corporation in Canada that isn’t a public corporation and isn’t controlled by one or more public corporations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `private_partnership` | An association or relationship between two or more individuals, corporations, trusts, or partnerships that join together to carry on a trade or business.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `sole_proprietorship` | An unincorporated business owned by one individual.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `public_corporation`  | A corporation in Canada that meets either of the following requirements at the end of the tax year:

  - It has a class of shares listed on a designated Canadian stock exchange.
  - It has elected, or the minister of National Revenue has designated it, to be a public corporation, and it has complied with prescribed conditions under Regulation 4800(1) of the [Income Tax Regulations](https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.%2C_c._945/) on its number of shareholders, the dispersing of the ownership of its shares, the public trading of its shares, and its size.

  This business structure is restricted; contact [Stripe support](https://support.stripe.com/contact) for information on how to use it. |

### Non-profits

See the table below for descriptions of the different business structures that you can use to classify a `non_profit`.

| Business structure   | Description                                                                                                                                                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `registered_charity` | A charitable organization, public foundation, or private foundation registered with the Canada Revenue Agency.                                                                                                                                                                                                   |
| Omit or null         | A non-profit association, club, or society that isn’t a registered charity and is organized and operated exclusively for social welfare, civic improvement, pleasure, recreation, or any other purpose except profit. In this case, exclude `company.structure` from your business description or leave it null. |

### Government entities

See the table below for a description of the business structure that you can use to classify a `government_entity`.

| Business structure | Description                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omit or null       | A Canadian government entity includes any of the current Government of Canada departments, agencies, crown corporations or special operating agencies [listed](https://www.canada.ca/en/government/dept.html).

  This is a restricted business structure, please [contact support](https://support.stripe.com/contact) for more information on how to opt-in. |

#### Country - Germany (DE)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a `company`.

| Business structure           | Description                                                                                                                                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `private_corporation`        | A business incorporated as a legal entity under the laws of Germany that’s privately owned. It doesn’t have shares that can be traded on a public stock exchange and it’s registered with the commercial register (Handelsregister). For example, limited liability company (GmbH) or entrepreneur company (UG).                        |
| `public_corporation`         | A business incorporated as a legal entity under the laws of Germany. Ownership shares of this corporation can be traded on a public stock exchange and it’s registered with the commercial register (Handelsregister). For example, a joint-stock company (AG).                                                                         |
| `incorporated_partnership`   | A business jointly owned by two or more people that’s created through a partnership agreement on a commercial scale and it’s registered with the commercial register (Handelsregister). For example, General partnership (OHG), Limited partnership (KG), Limited Liability, Company & Compagnie Kommanditgesellschaft (GmbH & Co, KG). |
| `unincorporated_partnership` | A business jointly owned by two or more people that’s created through a partnership agreement and it’s not registered with a public register. For example, society under civil law (GbR) or partnership company (PartG).                                                                                                                |

### Non-profits

See the table below for descriptions of the different business structures that you can use to classify a `non_profit`.

| Business structure          | Description                                                                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incorporated_non_profit`   | An organization incorporated under the laws of Germany that is recognized as a non-profit organization by its competent tax office and it’s registered with a public register. For example, registered association (e.V.) or registered cooperative (e.G.). |
| `unincorporated_non_profit` | An organization that is recognized as a non-profit organization by its competent tax office and it’s not registered with a public register. For example, non-registered association (n.e.V.).                                                               |

#### Country - Singapore (SG)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a `company`.

| Business structure    | Description                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sole_proprietorship` | An unincorporated business owned by one individual. The business is registered as a Sole Proprietorship on [ACRA](https://www.acra.gov.sg/how-to-guides/before-you-start/choosing-a-business-structure).                                                                                                                                     |
| `private_partnership` | An association or relationship between two or more individuals, corporations, trusts, or partnerships that join together to carry on a trade or business. The business is registered as a Partnership on [ACRA](https://www.acra.gov.sg/how-to-guides/before-you-start/choosing-a-business-structure).                                       |
| `private_company`     | An association or relationship between two or more individuals, corporations, trusts, or partnerships that join together to carry on a trade or business. The business is registered as a Company on [ACRA](https://www.acra.gov.sg/how-to-guides/before-you-start/choosing-a-business-structure), including companies limited by guarantee. |
| `public_company`      | A company that offers its securities for sale to the general public. This business structure is restricted—contact [Stripe Support](https://support.stripe.com/) for information on how to use it. The business is registered as a Company on [ACRA](https://www.acra.gov.sg/how-to-guides/before-you-start/choosing-a-business-structure).  |

### Non-profits

See the table below for descriptions of the different business structures that you can use to classify a `non_profit`.

| Business structure | Description                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nil`              | A non-profit association, club, or society that isn’t a charity and is organized and operated exclusively for social welfare, civic improvement, pleasure, recreation, or any other purpose except profit. |

### Government entities

See the table below for a description of the business structure that you can use to classify a `government_entity`.

| Business structure | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nil`              | A [government entity](https://support.stripe.com/questions/2025-updates-to-singapore-verification-requirements-government-entities) or organization who have at least 75% of their business owned by a [government entity](https://support.stripe.com/questions/2025-updates-to-singapore-verification-requirements-government-entities). This business structure is restricted—contact [Stripe Support](https://support.stripe.com/) for information on how to use it. |

#### Country - Thailand (TH)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a `company`.

| Business structure           | Description                                                                                                                                                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `private_corporation`        | These are incorporated businesses where the legal entity and its legal personality is separated and distinct from the shareholders. All private companies must be registered with the Ministry of Commerce.                                                     |
| `incorporated_partnership`   | Also called ‘Limited Partnerships’ or ‘Registered Ordinary Partnerships’, these are businesses registered in Thailand owned by two or more people. The business’ legal entity and its legal personality is separated and distinct from the individual partners. |
| `unincorporated_partnership` | Also called ‘Unregistered Ordinary Partnerships’, these are businesses in Thailand owned by two or more people. The business’ legal entity and its legal personality isn’t separated and distinct from the individual partners.                                 |
| `sole_proprietorship`        | These are businesses owned by a single individual. There is no specific concept of sole proprietorship in Thailand.                                                                                                                                             |

#### Country - United Arab Emirates (AE)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a `company`.

| Business structure        | Description                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `llc`                     | A business registered in the UAE (outside of any free zone) as a limited liability company with any number of members or shareholders. |
| `sole_establishment`      | A business that isn’t a separate legal entity from its individual owner.                                                               |
| `free_zone_llc`           | A business registered in the UAE (within any free zone) as a limited liability company with any number of shareholders.                |
| `free_zone_establishment` | A business registered in the UAE (within certain free zones) as a limited liability company with only one shareholder.                 |

#### Country - United Kingdom (GB)

### Companies

The following table describes the business structures that you can use to classify a for-profit `company`.

| Business structure           | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `private_corporation`        | A private, limited liability company incorporated in the United Kingdom.                     |
| `incorporated_partnership`   | An incorporated limited liability partnership (LLP) between at least two designated members. |
| `unincorporated_partnership` | An unincorporated partnership between two or more partners.                                  |

### Non-profits

The following table describes the business structures that you can use to classify a `non_profit`.

| Business structure          | Description                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incorporated_non_profit`   | An incorporated non-profit organisation in the United Kingdom. This includes charitable companies limited by guarantee.                                                                 |
| `unincorporated_non_profit` | An unincorporated non-profit organisation in the United Kingdom. This includes non-profit organisations and charities operating under an unincorporated association or trust structure. |

#### Country - Hong Kong (HK)

### Companies

The following table describes the business structures that you can use to classify a for-profit `company`.

| Business structure    | Description                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `private_company`     | A registered entity (such as a PLC, Ltd., or LLC) that’s legally separate from its owners. It doesn’t have shares that are traded on a public stock exchange. |
| `private_partnership` | A business jointly owned by two or more people that’s created through a partnership agreement (such as a GP, LP, or LLP).                                     |
| `sole_proprietorship` | Business activities conducted by a natural person rather than a separate, registered legal entity.                                                            |

### Non-profits

The following table describes the business structures that you can use to classify a `non_profit`.

| Business structure          | Description                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incorporated_non_profit`   | An incorporated non-profit organisation in Hong Kong. This includes charitable companies limited by guarantee and societies.                            |
| `unincorporated_non_profit` | An unincorporated non-profit organisation in Hong Kong. This includes loosely organised groups where an individual is responsible for the organisation. |

#### Country - United States (US)

### Companies

See the table below for descriptions of the different business structures that you can use to classify a `company`. Refer to the [US required verification information](https://docs.stripe.com/connect/required-verification-information.md#minimum-verification-requirements-for-united-states) section for more details on requirements.

If you or your users think the entity type should be `company` but are unsure, the information might be in the business formation documents or tax documents for that entity.

| Business structure           | Description                                                                                                                                                                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `multi_member_llc`           | A business with multiple owners or members that’s registered in a US state as a Limited Liability Company (LLC).                                                                                                                                                                                       |
| `private_corporation`        | A business incorporated in a US state that’s privately owned. It doesn’t have shares that are traded on a public stock exchange. It’s also called a closely-held corporation. If you’re a single-member LLC that has elected to be treated as a corporation for tax purposes, use this classification. |
| `private_partnership`        | A business jointly owned by two or more people that’s created through a partnership agreement.                                                                                                                                                                                                         |
| `public_corporation`         | A business incorporated under the laws of a US state. Ownership shares of this corporation are traded on a public stock exchange.                                                                                                                                                                      |
| `public_partnership`         | A business formed by a partnership agreement with one or more people, but has shares that are publicly traded on a stock exchange.                                                                                                                                                                     |
| `single_member_llc`          | A business entity registered with a US state as a limited liability company (LLC) and that has only one member or owner.                                                                                                                                                                               |
| `sole_proprietorship`        | A business that isn’t a separate legal entity from its individual owner.                                                                                                                                                                                                                               |
| `unincorporated_association` | A business venture of two or more people that doesn’t have a formal corporate or entity structure.                                                                                                                                                                                                     |

### Non-profits

See the table below for descriptions of the different business structures that you can use to classify a `non_profit` with. Refer to the [US required verification information](https://docs.stripe.com/connect/required-verification-information.md#minimum-verification-requirements-for-united-states) section for more details on requirements.

| Business structure          | Description                                                                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incorporated_non_profit`   | An organization incorporated under the laws of a US state that has obtained tax-exempt status as a non-profit entity under either state or federal law (for example, 501(c)(3)).                                                   |
| `unincorporated_non_profit` | An organization that’s pursuing an objective other than profits, such as a social cause, and has obtained tax-exempt status in the US under either state or federal law (for example, 501(c)(3)) but hasn’t formally incorporated. |

### Government entities

See the table below for descriptions of the different business structures that you can use to classify a `government_entity` with. Refer to the [US required verification information](https://docs.stripe.com/connect/required-verification-information.md#minimum-verification-requirements-for-united-states) section for more details on requirements.

| Business structure                      | Description                                                                                                                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `government_instrumentality`            | An organization formed by a government statute or body based in the US to perform a certain function, but not the actual government body itself.                                              |
| `governmental_unit`                     | A branch of the state, local, or federal government of the US                                                                                                                                 |
| `tax_exempt_government_instrumentality` | An organization created by or pursuant to government statute and operated for public purposes. It has obtained federal tax-exempt status under state or federal law (for example, 501(c)(3)). |

## Internationalization and localization

If you support users in multiple countries, consider internationalization and localization when asking for information. Creating an interface that uses not only the user’s preferred language but also the proper localized terminology results in a smoother onboarding experience.

For example, instead of requesting a business tax ID from your users, regardless of country, request:

- EIN, US
- Business Number, Canada
- Company Number, UK

You can find recommended country-specific labels along with the other [required verification information](https://docs.stripe.com/connect/required-verification-information.md).

## See also

- [Stripe-hosted onboarding](https://docs.stripe.com/connect/hosted-onboarding.md)
- [Updating Accounts](https://docs.stripe.com/connect/updating-service-agreements.md)
- [Handling additional verifications with the API](https://docs.stripe.com/connect/handling-api-verification.md)
- [Account tokens](https://docs.stripe.com/connect/account-tokens.md)
- [Testing verification](https://docs.stripe.com/connect/testing-verification.md)
