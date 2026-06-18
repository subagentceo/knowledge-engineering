# A2P 10DLC - Gather the Required Business Information

This page is for Twilio customers who need to register a business for A2P 10DLC. The information in this page also applies to Independent Software Vendors (ISVs) who need to register their customers' businesses.

This page covers the business information that The Campaign Registry (TCR) requires for A2P 10DLC registration, as well as the messaging [Campaign details](#campaign-details) required to register an A2P 10DLC Campaign.

> \[!NOTE]
>
> The business information you supply creates both your Primary Profile (business identity) and TrustProduct (compliance container) in Twilio Trust Hub before it is submitted to TCR.

The required information is presented in "parameter" format (e.g., `brand_name`). This is for the benefit of ISVs who need to use the REST APIs for registering multiple businesses. If you're not an ISV, you still need to provide the same business information, but you can ignore the formatting of the parameter names since you can (and should) use the Console for registration.

Registrations for sole proprietors require slightly different information than other types of businesses, so read the [Sole proprietors section](#sole-proprietors) carefully.

## Trust Hub overview

Before you collect the business information requirements, understand how Twilio uses it in Twilio Trust Hub.

### Primary Profile vs. TrustProduct

* **Primary Profile (Primary Customer Profile)**: Your foundational business identity with Twilio. Create this profile first; it stores core business information.
* **TrustProduct**: A compliance-specific container that holds verification data for A2P 10DLC. The EndUser resources attached to the TrustProduct are populated with the same business information.

The same business information serves both purposes, but they have different roles in the compliance process.

## Sole proprietors

### Eligibility

If the business is a sole proprietorship in the US or Canada, it must register for A2P 10DLC as a "Sole Proprietor Brand", **except** if the business has an EIN or a Canadian Business Number.

If a Sole Proprietorship **does have** an EIN or other tax ID, The Campaign Registry requires the business to register as a Low-Volume Brand or a Standard Brand. In these cases, *do not* register the business as a Sole Proprietor Brand, because doing so will incur fees and will impact the business' ability to send A2P 10DLC messages. Follow the [instructions for Standard and Low-Volume Brands in this doc](#standard-and-low-volume-standard-brands), as well as in the relevant onboarding guides.

### Information to collect

> \[!WARNING]
>
> For sole proprietorships, the "authorized representative" is the sole proprietor. The `first_name`, `last_name`, and `email` parameters refer to the sole proprietor's personal information, not a separate business representative.

The information needed to register a Sole Proprietor Brand is listed in the table below. Click on a parameter name to learn how to format the associated information, along with some helpful hints.

| Parameter name                                | Short Description                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [brand\_name](#brand_name)                    | The business name. For sole proprietorships, this is usually the first and last name of the proprietor. |
| [first\_name](#first_name)                    | The first name of the business' authorized representative                                               |
| [last\_name](#last_name)                      | The last name of the business' authorized representative                                                |
| [mobile\_phone\_number](#mobile_phone_number) | The mobile phone number to use for the one-time passcode verification request                           |
| [email](#email)                               | The email address of the business' authorized representative                                            |
| [customer\_name](#customer_name)              | The name of the business (for the mailing address)                                                      |
| [street](#street)                             | The number and street of the business address                                                           |
| [street\_secondary](#street_secondary)        | (optional) Additional business address information, if necessary. E.g., "Suite" or "Attention"          |
| [city](#city)                                 | The city of the business address                                                                        |
| [region](#region)                             | Two-letter abbreviation for the state or province of the business address                               |
| [postal\_code](#postal_code)                  | The postal/ZIP code of the business address                                                             |
| [iso\_country](#iso_country)                  | The ISO country code of the business address                                                            |
| [vertical](#vertical)                         | (optional) The term that best describes the business' industry                                          |

## Standard and Low-Volume Standard Brands

If the business is *not* a Sole Proprietor as defined above, collect the information listed in the table below.

Click on a parameter name to learn how to format the associated information, along with some helpful hints.

| Parameter name                                                          | Short Description                                                                                                                   |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [business\_name](#business_name)                                        | The business name                                                                                                                   |
| [business\_type](#business_type)                                        | The legal structure of the business                                                                                                 |
| [business\_industry](#business_industry)                                | The industry that most closely matches that of the business                                                                         |
| [business\_registration\_identifier](#business_registration_identifier) | The country-specific tax identification number for the business                                                                     |
| [business\_registration\_number](#business_registration_number)         | The business tax identification number of the type specified in the business\_registration\_identifier parameter                    |
| [social\_media\_profile\_urls](#social_media_profile_urls)              | The URL(s) for the business' social media accounts (i.e. LinkedIn, Facebook, Twitter)                                               |
| [website\_url](#website_url)                                            | The URL for the website of the business                                                                                             |
| [business\_identity](#business_identity)                                | The type of business identity (direct customer or ISV/reseller)                                                                     |
| [business\_regions\_of\_operation](#business_regions_of_operation)      | The region(s) in which the business operates                                                                                        |
| [first\_name](#first_name)                                              | The first name of the business' authorized representative                                                                           |
| [last\_name](#last_name)                                                | The last name of the business' authorized representative                                                                            |
| [business\_title](#business_title)                                      | The exact job title of the business' authorized representative                                                                      |
| [job\_position](#job_position)                                          | The position of the business' authorized representative                                                                             |
| [phone\_number](#phone_number)                                          | The phone number of the business' authorized representative                                                                         |
| [email](#email)                                                         | The email address of the business' authorized representative                                                                        |
| [customer\_name](#customer_name)                                        | The name of the business (for the mailing address)                                                                                  |
| [street](#street)                                                       | The number and street of the business address                                                                                       |
| [street\_secondary](#street_secondary)                                  | (optional) Additional business address information, if necessary. E.g., "Suite" or "Attention"                                      |
| [city](#city)                                                           | The city of the business address                                                                                                    |
| [region](#region)                                                       | Two-letter abbreviation for the state or province of the business address                                                           |
| [postal\_code](#postal_code)                                            | The postal/ZIP code of the business address                                                                                         |
| [iso\_country](#iso_country)                                            | The ISO country code of the business address                                                                                        |
| [stock\_exchange](#stock_exchange)                                      | The stock exchange on which the business' stock is traded (if applicable)                                                           |
| [stock\_ticker](#stock_ticker)                                          | The business' stock ticker symbol (if applicable)                                                                                   |
| [company\_type](#company_type)                                          | Indicates whether the business is public or private                                                                                 |
| [brand\_contact\_email](#brand_contact_email)                           | The email address of a Brand representative who can complete the 2FA                                                                |
| [skip\_automatic\_sec\_vet](#skip_automatic_sec_vet)                    | Only for Low-Volume Standard Brand registrations, 527 political organizations, or those with Campaign Verify tokens: set to `true`. |

## Business details

### brand\_name

> \[!NOTE]
>
> Sole Proprietor only

The real business name. For Sole Proprietor businesses, this is usually the proprietor's first name and last name, but a Doing Business As (DBA) name is also accepted.

If the customer is not a business entity but instead is a hobbyist, college student, etc., use their first name and last name.

### business\_name

If you're registering a US entity, enter the **exact legal business name** as registered with the EIN, which can be found on the CP 575 EIN Confirmation Letter. Do not use the legal business name found on the W2 or W9 forms as they may differ from the CP 575 notice.

If you've misplaced your CP 575 notice, you may request a 147c letter from the IRS and use the information therein for registration.
If the business name spans multiple lines on the CP 575 / 147c letter, input all the lines above the address line.
In the example CP 575 letter below, the business name is "ACME INC".

Newly issued EINs or equivalent tax IDs can take 30-90 days to propagate across database validation systems. If your brand registration failed due to a tax ID mismatch and you recently registered your business for a tax ID, wait a few weeks before resubmitting.

For urgent requests, share the complete EIN letter documentation (CP575 notice or 147C letter) with Twilio support to help your brand get verified manually through an identity status appeal, which usually takes 5-7 business days. Documentation must be from the federal level, not the state level. See [A2P 10DLC pricing and fees](https://support.twilio.com/hc/en-us/articles/1260803965530-What-pricing-and-fees-are-associated-with-the-A2P-10DLC-service) for associated charges.

![IRS letter with EIN 12-3456789 assigned to Acme Inc at 123 Someplace Drive, San Francisco, CA.](https://docs-resources.prod.twilio.com/ef52a0ce3c4f08766da9917382682362a6f3a015bc9bbd40ae2e82575a7e2c88.png)

### business\_type

The legal structure of the business

Allowed values:

* `Co-operative`
* `Corporation`
* `Limited Liability Corporation`
* `Non-profit Corporation`
* `Partnership`

If the business is a government organization, the value must be `Non-profit Corporation`.

### business\_industry

The industry that most closely matches that of the business

If the business is a government organization, the value must be `GOVERNMENT`.

If the business is a non-profit agency, the value must be `NOT_FOR_PROFIT`.

Allowed values:

* `AGRICULTURE`
* `AUTOMOTIVE`
* `BANKING`
* `CONSTRUCTION`
* `CONSUMER`
* `EDUCATION`
* `ELECTRONICS`
* `ENGINEERING`
* `ENERGY`
* `FAST_MOVING_CONSUMER_GOODS`
* `FINANCIAL`
* `FINTECH`
* `FOOD_AND_BEVERAGE`
* `GOVERNMENT`
* `HEALTHCARE`
* `HOSPITALITY`
* `INSURANCE`
* `JEWELRY`
* `LEGAL`
* `MANUFACTURING`
* `MEDIA`
* `NOT_FOR_PROFIT`
* `OIL_AND_GAS`
* `ONLINE`
* `PROFESSIONAL_SERVICES`
* `RAW_MATERIALS`
* `REAL_ESTATE`
* `RELIGION`
* `RETAIL`
* `TECHNOLOGY`
* `TELECOMMUNICATIONS`
* `TRANSPORTATION`
* `TRAVEL`

### business\_registration\_identifier

Allowed values:

* `EIN` - US - Employer Identification Number
* `DUNS` - US - Dun & Bradstreet Number
* `CBN` - Canada - Canadian Business Number
* `CN` - Great Britain - Company Number
* `ACN` - Australia - Australian Company Number from ASIC
* `CIN` - India - Corporate Identity Number
* `VAT` - Estonia - VAT Number
* `VATRN` - Romania - VAT Registration Number
* `RN` - Israel - Registration Number
* `Other`

If the business has a US entity or an International Tax ID, use `EIN`. Do not use a DUNS number.

### business\_registration\_number

The country-specific tax identification number for the business

The value and format depends on the `business_registration_identifier` specified.

If using a `business_registration_identifier` of `CBN`, provide the first nine-digits only.

Examples:

* If the `business_registration_identifier` is `EIN`, the `business_registration_number` must be in EIN format. E.g., `00-0000000`.
* If the `business_registration_identifier` is `DUNS`, the `business_registration_number` must be in DUNS format. E.g., `00-000-0000`.

### social\_media\_profile\_urls

The URL(s) for the business' social media accounts (i.e. LinkedIn, Facebook, Twitter)

### website\_url

This is the website of the business. (If you're an ISV, this is your customer's business website.)

This website must be functional, and it must bear some relationship with the `business_name`.

The URL provided undergoes an automated verification process. A screenshot is captured and is evaluated against the A2P 10DLC compliance rules. This compliance check is a mandatory step in the registration process.

### business\_identity

The type of business — either a direct customer or a reseller

If you're not registering a business that is an ISV, then the value must be `direct_customer`.

Allowed values:

* `direct_customer`
* `isv_reseller_or_partner`
* `unknown`

### business\_regions\_of\_operation

The region(s) in which the business operates

Allowed values:

* `AFRICA`
* `ASIA`
* `EUROPE`
* `LATIN_AMERICA`
* `USA_AND_CANADA`

### first\_name

The first name of the business' authorized representative. If the company is a Sole Proprietorship, this is the Sole Proprietor's first name.

### last\_name

The last name of the business' authorized representative. If the company is a Sole Proprietorship, this is the Sole Proprietor's last name.

### business\_title

The exact job title of the business' authorized representative

### job\_position

The position of the business' authorized representative

Allowed values:

* `Director`
* `GM`
* `VP`
* `CEO`
* `CFO`
* `General Counsel`
* `Other`

### phone\_number

The phone number of the business' authorized representative in [E.164 format](/docs/glossary/what-e164)

### mobile\_phone\_number

> \[!NOTE]
>
> Sole Proprietor only

As part of the registration process, Twilio sends the One Time Password (OTP) verification request to this mobile number from which the sole proprietor must respond.

* This number must belong to a valid U.S. or Canadian mobile device.
* You can't acquire this mobile number from a CPaaS provider such as Twilio.
* You can use this mobile number **no more than three times** across all A2P Brand registrations with TCR.
* If you registered this A2P 10DLC to your business with another vendor, that registration counts towards this limit.

### email

The email address of the business' authorized representative

This must be a well formatted address with a valid domain and cannot be a disposable address.

This email address can only be used a maximum of **ten times** across all A2P Brand registrations with TCR. If the business is registered for A2P 10DLC with another vendor, that counts towards this limit.

### customer\_name

The name of the business (for the mailing address)

### street

The number and street of the business address

Example: `23 Main Street`

This address can only be used a maximum of **ten times** across all A2P Brand registrations with TCR. If the business is registered for A2P 10DLC with another vendor, that counts towards this limit.

### street\_secondary

(optional) Additional business address information, if necessary

Examples:

* `Suite 221`
* `Attention: John Smith`

### city

The city of the business address

Example: `San Francisco`

### region

Two-letter abbreviation for the state or province of the business address

Example: `CA` for California

### postal\_code

The postal/ZIP code of the business address

Example: `90210`

### iso\_country

The ISO country code of the business address

Example: `US`

### stock\_exchange

The stock exchange on which the business' stock is traded (if applicable)

Allowed values:

* `AMEX`
* `AMX`
* `ASX`
* `B3`
* `BME`
* `BSE`
* `FRA`
* `ICEX`
* `JPX`
* `JSE`
* `KRX`
* `LON`
* `NASDAQ`
* `NONE`
* `NYSE`
* `NSE`
* `OMX`
* `OTHER`
* `SEHK`
* `SGX`
* `SSE`
* `STO`
* `SWX`
* `SZSE`
* `TSX`
* `TWSE`
* `VSE`

### stock\_ticker

The business' stock ticker symbol (if applicable)

Example: `TWLO` for Twilio

### company\_type

Indicates whether the business is public, private, a non-profit, or governmental organization

Allowed values:

* `government`
* `non-profit`
* `private`
* `public`

### brand\_contact\_email

TCR requires email addresses for public, for-profit brands to complete authentication and brand personnel attestation via 2FA.

Validation of Brand's business email address will occur and the following types of email addresses will result in a brand failure:

* Personal or free email addresses
* Email distribution addresses

### skip\_automatic\_sec\_vet

This parameter is a Boolean that indicates whether or not the business should skip [automatic secondary vetting](https://help.twilio.com/articles/4403988619163-What-is-Secondary-Vetting-for-A2P-10DLC).

This parameter is optional; the default value is `false`.

Only set this parameter as `true` in the following situations:

* If the business wants to register as a Low-Volume Standard Brand
* If the business is a 527 political organization or registered with [Campaign Verify](https://www.campaignverify.org/)

### vertical

> \[!NOTE]
>
> Sole Proprietor only

The industry that most closely matches that of the sole proprietor's business

Allowed values:

* `AGRICULTURE`
* `COMMUNICATION`
* `ENERGY`
* `ENTERTAINMENT`
* `FINANCIAL`
* `GAMBLING`
* `GOVERNMENT`
* `HEALTHCARE`
* `HOSPITALITY`
* `HUMAN_RESOURCES`
* `INSURANCE`
* `LEGAL`
* `MANUFACTURING`
* `NGO`
* `POLITICAL`
* `POSTAL`
* `PROFESSIONAL`
* `REAL_ESTATE`
* `RETAIL`
* `TECHNOLOGY`
* `TRANSPORTATION`

## Campaign details

A Campaign is a collection of information about a business' messaging use case, i.e. what kinds of messages the business wants to send and how customers can opt in and out.

You can wait until a Brand has been approved by TCR to collect this information. The Use Cases available to a Brand depends on the Brand type.

A Brand (i.e., a business registered with TCR) may have more than one Campaign. In that case, the business needs to provide these details for each Campaign.

The following Help Center articles may be helpful in collecting this information:

* [List of campaign use case types for A2P 10DLC registration](https://help.twilio.com/articles/1260801844470-List-of-Campaign-Types-and-Use-Case-Types-for-A2P-10DLC-registration)
* [Special Use Cases for A2P 10DLC](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC)
* [What pricing and fees are associated with the A2P 10DLC service?](https://help.twilio.com/articles/1260803965530-What-pricing-and-fees-are-associated-with-the-A2P-10DLC-service)

The table below lists the information needed to register a Campaign. Click on a parameter name to learn how to format the associated information, along with some helpful hints.

| Parameter name                                            | Short Description                                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [description](#description)                               | Detailed description of the messaging campaign                                              |
| [message\_flow](#message_flow)                            | Details how the business' end users opt in to the messaging campaign                        |
| [message\_samples](#message_samples)                      | Sample messages that are representative of the Campaign's messages                          |
| [us\_app\_to\_person\_usecase](#us_app_to_person_usecase) | Which A2P use case describes this campaign                                                  |
| [has\_embedded\_links](#has_embedded_links)               | Boolean indicating whether this campaign sends messages containing URLs                     |
| [has\_embedded\_phone](#has_embedded_phone)               | Boolean indicating whether this campaign sends messages containing phone numbers            |
| [opt\_in\_message](#opt_in_message)                       | (optional) The auto-reply message sent to end users who opt in to the campaign via keyword  |
| [opt\_out\_message](#opt_out_message)                     | (optional) The auto-reply message sent to end users who opt out of the campaign via keyword |
| [help\_message](#help_message)                            | (optional) The auto-reply message sent to end users who send a help keyword                 |
| [opt\_in\_keywords ](#opt_in_keywords)                    | (optional) The keywords end users send in order to opt in to the campaign's messages        |
| [opt\_out\_keywords](#opt_out_keywords)                   | (optional) The keywords end users send in order to opt out of the campaign's messages       |
| [help\_keywords](#help_keywords)                          | (optional) The keywords end users send in order to get help                                 |

### description

A detailed description of the purpose of the messaging Campaign. Must be between 40 and 4096 characters.

The description should include who the sender is, who the recipients are, and why messages are being sent to the recipients.

This description must align with the `us_app_to_person_usecase` (described below).

Example: `This Campaign will send weekly marketing messages about sales and offers from Acme Sandwich Company to end customers who have opted in`

If the business is a financial institution engaged in direct, first-party lending to its customers, indicate "Direct Lending" in the Campaign description so that the review team can properly set this attribute before submitting the registration to TCR. Indicate this even if the Campaign use case is not directly related to the offer of lending services (e.g. OTP).

### message\_flow

A detailed description of how end users opt in (consent) to receiving the Campaign's messages. Must be between 40 and 2049 characters in length.

If multiple opt-in methods can be used for the same campaign, they must all be listed.

If a website is used for opting in:

* You must provide a link to the website.
* The website must have both a privacy policy and terms of service.
* You must provide a link to the privacy policy.
* Privacy policies need to include:
  * a statement of non-sharing for mobile numbers
  * message frequency
  * a "message and data rates may apply" disclosure
* If this opt-in mechanism and other required information is not publicly accessible at the business website URL you have provided, provide a URL with hosted screenshots of the relevant pages.

Understanding the opt-in mechanism is critical to the acceptance of the Campaign by TCR.

Example: `End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Acme, Inc. Additionally, end users can also opt-in by texting START to (111) 555-3333 to opt in. Terms and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy`

### message\_samples

An array (list) of messages that are representative of the Campaign's messages. Minimum of two messages. Maximum of five messages. Each message must be between 20 and 1024 characters in length.

* Sample messages must be clearly aligned with the Campaign description given above and the `us_app_to_person_usecase` (described below).
* The Brand must be identified by name and/or website in each message.
* Use square brackets `[]` to indicate variable content.
* If the Campaign's messages will include links or phone numbers, include them in the sample messages.

Example: `This is a message from the Acme Sandwich Company. Your order for [sandwich type, other item] will be delivered by [time] on [date]. If you have questions or would like to change your order schedule, call 333-444-1212. If you would like to opt out of future notifications like this, text STOP in reply to this message.`

### us\_app\_to\_person\_usecase

The use case for the messaging Campaign, i.e., the reason for sending messages in this Campaign

The Use Cases available differ based on the type of Brand registration. The Use Case selected impacts the available messaging throughput, and pricing differs by Use Case.

Learn more about A2P 10DLC throughput in the [Message throughput (MPS) and Trust Scores for A2P 10DLC in the US Help Center article](https://help.twilio.com/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US).

#### Standard Brand Use Cases

* `2FA` - Any authentication or account verification such as one-time-passcodes (OTP)
* `ACCOUNT_NOTIFICATION` - Notifications about the status of an account or related to being a part of an account
* `CUSTOMER_CARE` - Support, account management, and other avenues of customer interaction
* `DELIVERY_NOTIFICATION` -	Information about the status of a delivery
* `FRAUD_ALERT` - Messaging about potential fraudulent activity such as spending alerts
* `HIGHER_EDUCATION` - Message campaigns from colleges, universities, and other education institutions
* `MARKETING` - Promotional content such as sales and limited time offers
* `MIXED` -	A campaign that covers multiple use cases such as Customer Care and Delivery Notifications.
  * Mixed campaigns are likely to have lower throughput and a higher cost per message.
  * Low-Volume Brands are eligible for the Low-Volume use case detailed below.
* `POLLING_VOTING` - For conducting polling and voting, such as customer surveys. **Not for political use.**
* `PUBLIC_SERVICE_ANNOUNCEMENT` - Public service announcements (PSAs) to raise audience awareness about a given topic
* `SECURITY_ALERT` - Notification of a compromised system (software or hardware related)

#### Low-Volume Standard Brand Use Cases

* `LOW_VOLUME` - A campaign that covers multiple use cases, but has a lower monthly fee than the `MIXED` Use Case (above) and is fixed at the lowest throughput tier.

#### Special Use Cases

Special Use Cases are Use Cases that may qualify for increased messaging throughput and/or reduced carrier fees compared to Standard Brand Use Cases. Some special use cases are sensitive or critical in nature, and require additional approval steps.

Learn more about Special Use Cases, pricing, and throughput in the [Special Use Cases for A2P 10DLC Help Center article](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC).

* `AGENTS_FRANCHISES` - For a Brand that has multiple agents, franchises or offices in the same Brand vertical/industry, but require individual localized numbers for each agent/location/office.
* `CHARITY` - Communications from a registered charity or 501(c)(3) non-profit aimed at providing help and raising money for those in need. Limited to 501(c)(3) nonprofits. Does not include religious organizations.
* `K12_EDUCATION` - For virtual learning and related communication between students/faculty and parents of K-12 schools.
* `PROXY` - Peer-to-peer app-based group messaging with proxy/pooled numbers. Supporting personalized services and non-exposure of personal numbers for enterprise or A2P communications.
* `EMERGENCY` - Notification services designed to support public safety and/or health during natural disasters, armed conflicts, pandemics and other national or regional emergencies.
* `POLITICAL` - Part of an organized effort to influence decision making of a specific group. Only available to 527 political organizations, 501(c)(4), 501(c)(5), and 501(c)(6) nonprofits
* `SOCIAL` - Communication between public figures or influencers and their communities.
* `SWEEPSTAKE` - All sweepstakes-related messaging

#### Sole Proprietor Brand Use Cases

* If the business is a Sole Proprietorship, the value must be `SOLE_PROPRIETOR`.

### has\_embedded\_links

Boolean indicating whether this Campaign sends messages containing URLs

Whenever possible, include example links in the `message_samples` so that links can be verified.

### has\_embedded\_phone

Boolean indicating whether this Campaign sends messages containing phone numbers

Whenever possible, include any such phone numbers in the `message_samples` so that the number(s) can be verified.

### opt\_in\_message

(optional) The auto-reply message that the Campaign sends to end users who send one of the `opt_in_keywords` to a Campaign phone number. Must be between 20 and 320 characters in length.

This field is required if end users can text a keyword to a Campaign phone number in order to subscribe to a Campaign's messages.

The `opt_in_message` should include:

* The Brand name
* Confirmation of opt-in enrollment to a recurring message campaign
* How to get help
* A clear description of how to opt-out

### opt\_out\_message

(optional) The auto-reply message sent to end users who send one of the `opt_out_keywords` to a Campaign phone number. Must be between 20 and 320 characters in length.

This field is required if the business is managing opt-out messages on their own (i.e., not using Twilio's default or Advanced Opt-out features).

The `opt_out_message` must include:

* An acknowledgment of the opt-out request
* Confirmation that no further messages will be sent
* The Brand name (recommended but not required)

### help\_message

(optional) The auto-reply message sent to end users who send one of the `help_keywords`. Must be between 20 and 320 characters in length.

This field is required if the business is managing help messages on their own (i.e., not using Twilio's default or Advanced Opt-out features).

The `help_message` may include the Brand name and additional support options and/or contact information.

### opt\_in\_keywords

(optional) A comma-delimited list of opt-in keywords that end users can send in order to opt in to the Campaign's messages. Maximum 255 characters in length.

This field is required if end users can text a keyword to a Campaign phone number in order to subscribe to a Campaign's messages.

### opt\_out\_keywords

(optional) A comma-delimited list of opt-out keywords that end users can send in order to opt out of the Campaign's messages. All characters must be alphanumeric. Maximum 255 characters in length.

This field is required if the business is managing opt-out messages on their own (i.e., not using Twilio's default or Advanced Opt-out features).

### help\_keywords

(optional) A comma-delimited list of help keywords that end users can send to a Campaign phone number in order to get help. Values must be alphanumeric. Maximum 255 character length

This field is required if the business is managing help messages on their own (i.e., not using Twilio's default or Advanced Opt-out features).

## What's next?

You're ready to proceed to one of the onboarding guides.

Direct customers (non-ISVs) should use the appropriate Console onboarding guide.

* [Console onboarding for Standard and Low-Volume Brands](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding)
* [Console onboarding for Sole Proprietor Brands](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview)

### ISVs

To make the registration process go smoothly, organize and format your customer data in a way that you can include in requests to Twilio's APIs, e.g., a JSON file.

ISVs should use the appropriate API onboarding guides:

* To onboard Sole Proprietor businesses, visit the [Sole Proprietor API onboarding page](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new).
* To onboard any other type of business, visit the [Standard and Low-Volume Standard API onboarding page](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api).
