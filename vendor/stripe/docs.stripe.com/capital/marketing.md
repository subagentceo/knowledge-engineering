# Marketing your Capital program

Build marketing assets for Capital.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

This guide shows how to build marketing assets for Capital that educate your users and promote the Capital program. Learn how to co-brand your product with Stripe and develop content that adheres to [regulatory requirements](https://docs.stripe.com/capital/regulatory-compliance.md) applicable to Capital.

Financing is a highly regulated space, and all customer-facing material referencing Stripe Capital must be approved by Stripe and its financial partners before publication. Submit material for review and approval using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

## Marketing requirements

Depending on your Capital integration type, additional platform marketing might be optional.

- **No-code integration**: For no-code integrations, Stripe sends offer emails on your behalf. While this isn’t required, we recommend that you [send an announcement email](https://docs.stripe.com/capital/marketing.md#announcement-email) and develop a marketing landing page using our [messaging guidelines](https://docs.stripe.com/capital/marketing.md#messaging).
- **Embedded components:** You can use embedded components to notify users of their offers within your product. If you’re using embedded components, you can either use Stripe’s no-code promotional emails or send your own offer notification to market offers outside of the Dashboard. You must review and comply with the section on [sending offer notifications](https://docs.stripe.com/capital/marketing.md#financing-notifications).
- **API integration**: For API integrations where you’re responsible for notifying users about their Capital offers, you must review and comply with the section on [sending offer notifications](https://docs.stripe.com/capital/marketing.md#financing-notifications) to build an email campaign or in-Dashboard notifications with the [Capital API](https://docs.stripe.com/capital/api-integration.md#retrieve-financing-offers).

> You must submit any customer-facing materials related to Capital to Stripe for review prior to being published using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

## Marketing approval process

To make sure Stripe meets its marketing oversight requirements for platforms offering Stripe Capital, you must maintain records of all marketing materials you use to promote your Capital program. All marketing material must be reviewed, approved, and retained by Stripe and its financial partners to ensure compliance with regulatory requirements.

Items that must be submitted to Stripe for approval include:

- Offer materials regardless of channel
- Email marketing including proposed targeting populations
- Website or UX material referencing the Stripe Capital product
- Blog posts or social media referencing the Stripe Capital product
- In-app or push notifications
- Customer testimonials

You must submit any marketing materials that you create to Stripe’s compliance team for review using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835) prior to use or publication. Our team of compliance specialists reviews these assets and will respond by email with edits or an approval in a timely manner. The standard turnaround time is 5-7 business days.

To receive approval, the material must align with the requirements and guidelines detailed in this guide. You may not use any marketing assets that don’t pass Stripe review and approval.

When submitting your materials, you must do the following:

1. Read and adhere to the guidelines on this page. Marketing assets aren’t usable until they have been approved by Stripe.
2. Provide your platform name.
3. Provide full screen shots or products that include headings and footers in a legible or high resolution format.
4. The preferable format for materials is an editable Google doc, however  a PDF or any other format where all text is legible is acceptable.
5. Describe the type of marketing material you’re submitting (for example, landing pages, web banners, emails, search engine marketing, and whether the asset is text only or includes images and text). If submitting web pages, include the associated URLs.
6. Describe where all CTA links direct to (for example, a landing page URL or log-in screens).

## Sending offer notifications 

As part of your Capital marketing program, you can set up offer notifications so your connected accounts know when they’re eligible for financing. You must notify all eligible connected accounts about available offers.

With the no-code option, Stripe sends co-branded offer emails on your behalf. If you’re using the API integration, you must build and deploy your own email campaign.

To get started select your integration type below.

#### No-Code

### No-code email overview 

Emails are a primary channel for notifying customers about their financing offers. Stripe Capital handles this with our no-code email service. For more information on how to enable offer emails through Stripe, see [Set up a no-code integration](https://docs.stripe.com/capital/no-code-integration.md).

All emails are co-branded with your logo and brand colors. To see the end-to-end user experience, including the offer email, check out the [Capital demo experience](https://dashboard.stripe.com/capital/demo). You can customize the colors and logo in the email by adjusting your [Connect settings](https://dashboard.stripe.com/settings/connect/onboarding-interface).

> Adjusting Connect settings changes your branding for all of Connect, not just Capital.

Stripe sends a series of emails to notify customers of their offer and keep them informed about their payment progress.

The following is a list of the emails Stripe sends:

1. First offer email: This email notifies the customers about their first prequalified offer. We send it as soon as a customer becomes eligible.
2. Weekly update emails: If a customer has an active financing, we send them a weekly email updating them on the current amount paid, and linking to a Stripe-hosted active financing page.
3. Repeat offer email: After a customer has paid their financing, we send them an additional offer email as soon as they’re eligible.
4. Offer email: If a customer doesn’t accept an offer, they’ll receive an additional offer email every 30 days if they’re eligible.
5. Additional transactional emails: In addition, Stripe will send other relevant transactional emails to users, such as those relevant for application questions or financing payment.

Learn more about our [no-code email service](https://docs.stripe.com/capital/no-code-integration.md) or contact your Stripe account team member.

#### API

### Sending your own offer emails 

If you want to send your own financing offer emails instead of using our no-code email services, you can do so with the [Capital API](https://docs.stripe.com/capital/api-integration.md). You must notify all eligible connected accounts of their offer.

Below are email program recommendations and sample email templates. Before publishing, you must submit all customer-facing materials for review using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

#### Email overview and cadence

Below are recommendations on how to set up an email program, and sample email templates.

We recommend sending customers a drip campaign for their first offer, and re-engaging them every 30 days with their new offer if they don’t accept.

The following list contains an overview of each email. You can see the email templates below for more details on each email.

1. 1st-3rd offer email: These emails notify the customers about their first offer. The first email is sent as soon as a customer becomes eligible, with the remainder being sent 7 and 14 days after. Financing offers expire after 30 days, so these emails span the entire duration of the financing. Make sure to configure your email campaign so that these first offer emails stop after a user accepts an offer.
2. Refill offer email: If a user is eligible for a refill offer, send them an email notifying them about the additional funding.
3. Repeat offer email: When a customer has paid their financing, we send them an additional offer email as soon as they’re eligible again.
4. Re-engagement email: If a customer doesn’t accept an offer, they receive an additional offer email every 30 days if they’re eligible.

When you deliver these emails, you must also meet Stripe’s compliance requirements:

1. Comply with relevant marketing and communications requirements such as  [email opt-out CAN-SPAM requirements](https://docs.stripe.com/capital/regulatory-compliance.md#can-spam) for the US and [PECR](https://docs.stripe.com/capital/regulatory-compliance.md#pecr) for the UK.
2. Comply with our [document retention requirements](https://docs.stripe.com/capital/regulatory-compliance.md#recordkeeping), which includes copying [capital-offers@stripe.com](mailto:capital-offers@stripe.com) on all email campaigns.
3. Comply with [UDAP requirements](https://docs.stripe.com/capital/regulatory-compliance.md#udap).

#### Example email templates

### First offer email

|  |
|  |
| **Audience:**     | All users receiving their very first financing offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Subject line:** | Access up to [offer amount] in financing to grow your business                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Preheader:**    | [Business name] is prequalified—apply in a few clicks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Body Copy:**    | Access flexible financing with one flat fee for whatever your business needs. Businesses use Stripe Capital to manage cash flow, buy inventory, invest in marketing, and more.

  How it works:

  - **Simplified application:** Apply in a few clicks – applying won’t impact your personal credit score.
  - **No surprises:** Know what you’ll pay from day one with one flat fee. No compounding interest, late fees, or early payoff fees.
  - **Funds in days, not months:** If approved, funds are transferred to your Stripe account in as little as one to two business days.
  - **Automatic payments**\*: Payments are made automatically through your Stripe account.

  If you have any questions, you can learn more about the program here [add link to your landing page or [How it works](https://docs.stripe.com/capital/how-stripe-capital-works.md)].

  View your offer [add button or link to offer]

  – The [Platform name] team |
| **Footer:**       | This offer is available until [expiration date].

  This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  [US only] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer)                                                                                                                                                                                                                                                                                                                                                |

### Reminder email #1

|  |
|  |
| **Audience:**  | All users who have not yet accepted their very first financing offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Subject:**   | Get the financing you need with [Platform name] and Stripe                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Preheader:** | Have questions? Let’s talk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Body Copy:** | Hello [name],

  Do you have any questions regarding your financing offer for [company name]? If so, we’re here to help. As a reminder, you can see your offer here:

  View your offer [add button or link to offer]

  We know getting funding can be complicated and time intensive. Fortunately, our financing program with Stripe Capital works differently than traditional financing. We’ve simplified the application process and rather than making fixed payments, you’ll automatically pay the amount through a percentage of your [company name] sales, which allows you to pay more when business is busy, and less if things slow down.

  If you have any questions, you can learn more about the program here [add link to your landing page or [How it works](https://docs.stripe.com/capital/how-stripe-capital-works.md)], or reply to this email to get in touch with our partners at Stripe.

  —The [Platform name] team |
| **Footer:**    | This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  This offer is available until [expiration date].

  [US ONLY] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer)                                                                                                                                                                                                                                                                                                                                      |

### Reminder email #2

|  |
|  |
| **Audience:**  | All users who have not yet accepted their very first financing offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Subject:**   | Your financing offer expires in a few days                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Preheader:** | Have any questions?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Body copy:** | Hello [name],

  It’s not too late to get the quick, convenient financing that your business needs. Your financing offer powered by Stripe Capital expires on [add date]. Here are the details:

  - Up to a [XX,XXX] [local currency, for example USD or GBP] financing
  - [X,XXX] [local currency, for example USD or GBP] flat fee

  View your offer [add button or link to offer]

  We’d be happy to tell you more about this offer and about how you could use this financing to help grow your business. If you have any questions, you can learn more about the program here [add link to your landing page or [How it works](https://docs.stripe.com/capital/how-stripe-capital-works.md)] or reply to this email to get in touch with our partners at Stripe.

  —The [Platform name] team |
| **Footer:**    | This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  This offer is available until [expiration date].

  [US ONLY] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer)                                                                                                                                                                                              |

### Re-engagement email campaign

|  |
|  |
| **Audience:**     | Eligible users who didn’t accept their last offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Subject:**      | You’re eligible for a new financing offer through [Platform name]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Preview text:** | Get funding in as little as 2 days                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Email body:**   | Hello,

  Based on the recent strong performance of your business, you’ve prequalified for a new financing offer, powered by Stripe Capital for [company name]. You can use this financing for whatever your business needs, such as [add relevant use cases, such as buying equipment, investing in marketing, or managing cash flow].

  Here are the details:

  - Up to a [XX,XXX] [local currency, for example USD or GBP] financing
  - [X,XXX] [local currency, for example USD or GBP] flat fee

  View your offer [add button or link to offer]

  If you have any questions, you can learn more about the program here [add link to your landing page or [How it works](https://docs.stripe.com/capital/how-stripe-capital-works.md)], or just reply to this email to get in touch with our partners at Stripe.

  —The [Platform name] team |
| **Footer:**       | This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  This offer is available until [expiration date].

  [US ONLY] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer)                                                                                                                                                                                                                                              |

### Refill offer email campaign

|  |
|  |
| **Audience:**     | All users with in-progress financing that has been 75% paid off                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Subject:**      | Great job on your payment progress                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Preview text:** | You’re now eligible for additional funds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Email body:**   | The finish line is close—you’ve paid 75% of your financing through [platform name] Capital. Amazing work. Your remaining balance is [add amount], which will continue to be paid automatically. You’re now eligible for [add amount] of additional funds.

  View your offer [add button or link to offer]

  This offer is available until [add date]. If you have any questions about your new offer, just reply to this email to get in touch with our partners at Stripe.

  —The [Platform name] team                                                                                                |
| **Footer:**       | This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  This offer is available until [expiration date].

  [US ONLY] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer) |

### Repeat offer email campaign

|  |
|  |
| **Audience:**     | Eligible users who fully paid their last offer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Subject:**      | You’re eligible for a new offer through [Platform name]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Preview text:** | Get funding in as little as 2 days                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Email body:**   | Hello [name],

  Congratulations on paying your financing. Based on the continuing strong performance of your business, you’re prequalified for a new financing offer for [add relevant use cases, such as buying equipment, investing in marketing, or managing cash flows]. Here are the details:

  - Up to a [XX,XXX] [local currency, for example USD or GBP] financing
  - [X,XXX] [local currency, for example USD or GBP] flat fee

  View your offer [add button or link to offer]

  This offer is available until [add date]. If you have any questions on your new offer, just reply to this email to get in touch with our partners at Stripe.

  —The [Platform name] team |
| **Footer:**       | This email was sent to [customer email address]. If you’d rather not receive this kind of email, you can unsubscribe from future financing offer emails. [add unsubscribe link]

  This offer is available until [expiration date].

  [US ONLY] *Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period

  [**Input required disclaimer here**](https://docs.stripe.com/capital/marketing.md#required-disclaimer)                                                                                |

### In-product marketing or upsells

In-product upsells help deliver targeted marketing messages directly to your customers. These can take the form of a banner, pop-up modal, or chat box. Use this template to promote offers to eligible users in your platform’s user Dashboard for increased visibility. Use the Capital API to make sure your upsells are only displayed to eligible users, and include the right offer information for the business.

#### Example in-product marketing

Any product or page with an upsell must include the [required disclaimer](https://docs.stripe.com/capital/marketing.md#required-disclaimer). The disclaimer doesn’t need to be the same font size as the marketing message, but it must be clear, conspicuous, and in a font color or drop shadow that contrasts to the background.

### Option 1: Promotional Banner

|  |
|  |
| **Audience:**  | All users with a live offer who have not accepted yet                                                                                     |
| **Placement:** | Homepage or payments/payouts page                                                                                                         |
| **Timing:**    | Trigger upon login                                                                                                                        |
| **Copy:**      | [Platform name] | Stripe Congratulations!

  You’re prequalified for up to [local currency, for example USD or GBP][XX,XXX] in financing. |

### Alternative promotional banners

|  |
|  |
| **Copy:** | - You’re prequalified for a financing offer! Get the funding you need—now.
  - Financing fuels growth. And good news—you’re prequalified for a financing offer.
  - You’re prequalified for a financing offer. It’s time to dream up your next big move. |

### Option 2: Pop-up chat message

|  |
|  |
| **Audience:**  | All users with a live offer who have not accepted yet                                                                                        |
| **Placement:** | Homepage or payments/payouts page                                                                                                            |
| **Timing:**    | Trigger upon login                                                                                                                           |
| **Copy:**      | Hey [first name], Congratulations! You’ve been prequalified for a financing offer of up to [local currency, for example USD or GBP][XX,XXX]. |

### Alternative pop-up chat messages

|  |
|  |
| **Copy:** | - Hey [first name], Financing can help accelerate your business growth. And we have some good news: You’ve been prequalified for a financing offer of up to [XX,XXX] [local currency, for example USD or GBP].
  - Hey [first name], We want to help you grow. That’s why we’re excited to share that you’ve been prequalified for a financing offer of up to [XX,XXX][local currency, for example USD or GBP].
  - Hey [first name], Good news! You’ve been prequalified for a financing offer of up to [XX,XXX] [local currency, for example USD or GBP]. Get the financing your business needs. |

## Required disclaimers 

All marketing collateral must mention our banking partners Celtic and YouLend. You must add the following disclaimer on any user-facing materials wherever you reference Stripe Capital, such as promotional offer emails and marketing pages. The disclaimer doesn’t need to be the same font size as the marketing message, but it must be clear, conspicuous, and in a font color or drop shadow that’s in contrast to its background.

The table below lists the required disclaimer based on the location of your connected account’s business. For financing offer emails sent by your platform via the Capital API or custom banner notifications, the [disclaimer_variant](https://docs.stripe.com/api/capital/connect_financing_object.md#financing_offer_object-disclaimer_variant) property identifies the required disclaimer.

| Country | Required disclaimer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | [disclaimer_variant](https://docs.stripe.com/api/capital/connect_financing_object.md#financing_offer_object-disclaimer_variant) |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| AU      | Financing is provided by Fundbox, an external finance provider, with payments facilitated by Stripe. Funding amounts, rates, and terms are based on review and approval of a completed application, and are subject to change. Financing offers might require additional documentation.                                                                                                                                                                                                                                                                                                                                                                      | `fundbox_au_financing`                                                                                                          |
| DE      | All financing requests are subject to final review before approval. Financing is provided in cooperation with YouLend GmbH and its affiliates. Technical support and customer management provided by YouLend GmbH.

  Stripe Technology Europe Limited acts as an intermediary and technology provider. Stripe Technology Europe Limited holds a license for loan brokerage pursuant to Sect. 34c para. 1 sentence 1 no. 2 of the German Trade Ordinance. Competent Supervisory Authority: Industrie- und Handelskammer für München und Oberbayern, 80333 München. <https://www.ihk-muenchen.de/de/>                                                         | `youlend_de_financing`                                                                                                          |
| DE      | Alle Finanzierungsanfragen unterliegen einer abschließenden Prüfung vor der Genehmigung. Die Finanzierung erfolgt in Zusammenarbeit mit der YouLend GmbH und ihren verbundenen Unternehmen. Technischer Support und Kundenbetreuung werden durch die YouLend GmbH bereitgestellt.

  Die Stripe Technology Europe Limited tritt als Vermittler und Technologieanbieter auf. Stripe Technology Europe Limited verfügt über eine Erlaubnis zur Darlehensvermittlung nach § 34c Abs. 1 S. 1 Nr. 2 Gewerbeordnung (GewO). Zuständige Aufsichtsbehörde: Industrie- und Handelskammer für München und Oberbayern, 80333 München. <https://www.ihk-muenchen.de/de/> | `youlend_de_financing`                                                                                                          |
| FR      | All financing requests are subject to final review prior to approval. Financing is provided in co-operation with YouLend SAS and its affiliates. Technical support and customer management provided by YouLend SAS.

  YouLend SAS is registered in the Single Register of Insurance, Banking, and Finance Intermediaries ([ORIAS](https://www.orias.fr/)) under the registration number N 21001409 as an Intermediary in Banking Operations and Payment Services (MOBSPL). YouLend SAS’s registered office is located at the SNCF station, 14 rue de Dunkerque, 75010, Paris.                                                                               | `youlend_fr_financing`                                                                                                          |
| FR      | Toutes les demandes de financement font l’objet d’un examen final avant approbation. Le financement est fourni en coopération avec YouLend SAS et ses sociétés affiliées. L’assistance technique et la gestion client sont assurées par YouLend SAS.

  YouLend SAS est immatriculée à l’organisme pour le registre unique des intermédiaires en assurance, banque et finance ([ORIAS](https://www.orias.fr/)) sous le numéro d’immatriculation N 21001409 en tant qu’intermédiaire en opérations bancaires et services de paiement (MOBSPL). Le siège social de YouLend SAS est situé à la gare SNCF, 14 rue de Dunkerque, 75010, Paris.                    | `youlend_fr_financing`                                                                                                          |
| UK      | All financing applications are subject to review prior to approval. In the UK, Stripe Capital loans and merchant cash advances are provided by YouLend.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `youlend_uk_mca`                                                                                                                |
| US      | Stripe Capital offers financing types that include loans and merchant cash advances. All financing applications are subject to review prior to approval. In the US, Stripe Capital loans are issued by Celtic Bank, and YouLend provides Stripe Capital merchant cash advances.

  Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period.                                                                                                                            | `celtic_us_loan` or `youlend_us_mca`                                                                                            |

## Messaging 

Refer to the following copy guidelines when you write marketing copy for Stripe Capital on any marketing assets. You can modify the wording to suit your platform’s voice, as long as it conveys the same message and uses the correct terminology as detailed below. Refer to [stripe.com/capital](https://stripe.com/capital) to see how we employ these messages for our direct Capital offering.

Before publishing, you must submit all customer-facing materials for review using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

### Name your Capital program 

Keep the name of your Capital program simple. If you already have a payments program such as “Rocket Rides Payments," you can call it “Rocket Rides Capital” or “Rocket Rides Business Financing." If you want to include Stripe in the name, we recommend something like “Rocket Rides + Stripe Capital."

### Logos 

Follow this format for partnership logos:

 | Stripe

- Place your logo on the left with the Stripe logo on the right.
- Join the two logos with a `|` symbol or `+` symbol.
- Make both logos the same size. Don’t make one larger or smaller than the other.
- Use the [downloadable Stripe logo kit](https://stripe.com/newsroom/information#:~:text=The%20Stripe%20Logo). Don’t use the badge or Connect button.

### Main message 

In one sentence:

 Capital provides access to fast, flexible financing so you can  and invest in growth.

In 100 words:

Access to capital can be one of the most limiting growth factors. With  Capital, you can help jump start your business with flexible, on-demand financing. Apply in a few clicks without impacting your personal credit score. Eligible businesses are automatically prequalified and can receive funds in as little as two business days after you’re approved. Get the financing you need today with Capital.

### Benefits and features 

Here’s how you could describe the benefits and features of the program:

- Simplified application process - apply in a few clicks! Eligibility is based on factors like your payment volume and history on .
- Get funds quickly. If you’re approved, receive your funds in as little as one to two business days directly into your  account.
- Clear terms–no surprises. You’ll view terms up front when you select the offer amount that’s right for your business, so you’ll know exactly what to expect from  Capital.
- Pay as you earn for stress-free financing. With  capital, you automatically pay the loan or merchant cash advance with a fixed percentage of your daily sales until the total amount is paid. Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period.

### How it works 

Here is a template for explaining how the program works. Modify it as needed for your situation. For example, if your customers may see their eligibility offer in places other than email, like in-app notifications or banner ads, mention them in the description of step one.

1. Check your eligibility: If you’re eligible, based on factors that include your payment volume and history on , you’ll receive a capital offer via email.
2. Select your offer: Select the amount that’s right for your business needs. The financing fee and payment rate are set based on the funding amount.
3. Receive your funds: After your application is reviewed, if you’re approved the funds are deposited into your bank account, typically in as little as one to two business days after approval.
4. Pay as you earn*: You’ll automatically pay the financing with a fixed percentage of your sales, until the total amount is paid. Stripe Capital loans have a minimum amount due each payment period. If the amount that you pay through sales doesn’t meet the minimum required, your bank account will be automatically debited the remaining amount at the end of the period.

### Marketing to ineligible users 

Not all customers are eligible for a Capital offer. Any marketing material that is available to an audience of both eligible and ineligible users should clearly explain how eligibility is determined, and how customers can learn if they have an offer available. Direct marketing which only targets recipients ineligible for financing isn’t currently supported. Here’s an example of the type of language you can use on marketing content available to a broader audience of both eligible and ineligible users:

Eligibility is based on a combination of factors, such as your payment history on  payments. If you’re eligible for an offer, we’ll send you an email. If you haven’t received any notification from us, that means you’re not eligible for an offer at this time.

If you’d like to receive a financing offer, but aren’t eligible at this time, we recommend migrating more of your business’ payments to  payment solution. While not guaranteed, increased payment volume and your history with  payment solution might increase your likelihood of getting a financing offer.

### Terminology reference 

The list of approved and prohibited language isn’t exhaustive. For any questions, contact the Capital team at [capital-review@stripe.com](mailto:capital-review@stripe.com).

| Approved messaging                                                                                                                                                                                                             | Prohibited messaging                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| - Payment rate
  - Pay as a fixed percentage of sales/invoices                                                                                                                                                                 | - Interest rates
  - High interest rates/high-rate
  - APR
  - Repayment                                                                                                                                                       |
| - Payment
  - Paid                                                                                                                                                                                                             | - Only pay when you get paid
  - Use the paycheck to cover your financing                                                                                                                                                      |
| - Automatic and flexible payment
  - Pay when you get paid

  You must pair these two phrases in close proximity with the phrase, “pay your financing through a portion of your daily sales.”                                  | - Pay back the financing at any time
  - Payment on your schedule
  - Pay it off in pieces
  - Pay it back whenever                                                                                                            |
| - Flat fee
  - Financing fee                                                                                                                                                                                                   | - Interest rates
  - High interest rates                                                                                                                                                                                       |
| - Financing
  - Business financing                                                                                                                                                                                             | - Low risk financial solution
  - Loans                                                                                                                                                                                        |
| - Offer through Stripe Capital
  - Financing through our partner, Stripe Capital
  - Offer from Stripe Capital
  - Stripe Capital offer
  - Powered by Stripe Capital                                                          | - Offer from Stripe
  - Offer from [Platform]                                                                                                                                                                                  |
| - Typically in 2 business days
  - As soon as 2 business day
  - Get funds fast                                                                                                                                                | - In 2 business days
  - Get funds the next business day
  - Get funds instantly                                                                                                                                               |
| - Simple and fast for you to get the financing for your business                                                                                                                                                               | - Get instant financing
  - ACcess to loans/financing right away                                                                                                                                                               |
| - Financing for business needs                                                                                                                                                                                                 | - Financing for any of your needs
  - Consumer financing                                                                                                                                                                       |
| - Applying for financing through Stripe Capital might require a personal credit check, but this credit check doesn’t affect your personal credit score
  - Won’t affect your personal credit score                             | - No credit check
  - Won’t affect your credit                                                                                                                                                                                 |
| Use business financing for:
  - Creating/publishing/purchasing advertisements
  - Costs of hiring new team members/recruitment costs
  - Buying new equipment
  - Keeping extra cash on hand
  - Funding to grow your business | Use business financing for:
  - Offsetting personal expenses such as groceries and home expenses
  - Using funds for personal, family, or household purposes
  - Paying personal bills
  - No downsides                        |
| - [when processing payments through Stripe you] “…can begin the eligibility process”
  - [the eligibility process] “…takes into account transaction amounts that you’ve demonstrated you can pay”                              | - [when processing payments through Stripe you] “…are automatically eligible to qualify”
  - [when processing payments through Stripe you] “…won’t offer you more than you can afford/show you can pay”
  - Consumer financing |
| - [when discussing eligibility] “…additional steps you can take to streamline your evaluation”                                                                                                                                 | - [when discussing eligibility] “…increase the amount of money you’ll be eligible to borrow”                                                                                                                                   |
| - Stripe’s/their easy/straightforward/integrated process                                                                                                                                                                       | - Stripe’s/their responsible lending practices
  - “ensures responsible financing practices”
  - [any language implying that underwriting practices ensure no chance of default]                                               |
| - prequalified                                                                                                                                                                                                                 | - Pre-approved                                                                                                                                                                                                                 |

## Promote your Capital program 

When your Capital program goes live, you’ll want to share information about it. Because not all of your customers will be eligible for Capital, make sure that any broader marketing, such as a landing page, doesn’t promise eligibility. Instead, you can use marketing to explain how the program works, why it’s important, and where customers can check their eligibility.

Review our messaging guide for help crafting your marketing materials. We also recommend referencing your broader vision for embedded finance if you’re also using Stripe Treasury or Stripe Issuing.

Before publishing, you must submit all customer-facing materials for review using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

### Announcement email 

Whether you’re building a stand alone email or adding copy to an existing newsletter, emails are a great way to introduce Capital to your customer base. Try to keep your email short and to the point, but make sure to include these key points:

- A brief introduction to the program
- Where customers will learn about their offer (make sure to touch on eligibility since not all visitors to your page will be eligible)
- Link to a blog post, landing page, or place where they can check their eligibility
- Compliance disclosures
- Opt out/unsubscribe ability so that the customer may exercise their right to not receive Capital marketing or be eligible to receive an offer

Refer to our messaging guide for help crafting your email copy. Refer to our [regulatory compliance guide](https://docs.stripe.com/capital/regulatory-compliance.md) to check that your marketing adheres to the relevant guidelines.

### Landing pages and blog posts 

Evergreen content like landing pages and blog posts can be a great way to excite prospective customers about your financing program, and educate existing customers about how it works. The following sections provide tips for developing your content. We also recommend reviewing the messaging guide.

**Suggested page structure**

1. Brief introduction to the program
2. Why financing can help their business
3. How the program works
4. Where customers will learn about their offer (make sure to touch on eligibility since not all visitors to your page will be eligible)
5. Links to FAQs, docs or any other pages you’d created
6. Compliance disclosures (default disclaimer)

#### Landing page URL and site navigation 

Here are a few examples for landing page URL options and site navigation categories. You can also use the name of your program such as “[Platform name] Capital” as the navigation category.

- `/capital`
- `/financing`
- `/business-financing`

### Blog-post content 

We understand that blog posts are a common tool to increase your own company’s organic growth, so you might decide to promote Stripe Capital through such content. Because blog posts aren’t space constrained, you have some additional things to consider when creating this type of marketing content:

- Comparisons: Due to the additional regulatory complexity of comparing Stripe Capital against other competitors or different loan products, you may not directly compare Stripe Capital against any competitors’ offerings.
- Testimonials: Writing about your customer’s experiences in a blog post related to Stripe Capital falls under “testimonials” rules and must adhere to specific [requirements](https://docs.stripe.com/capital/regulatory-compliance.md#testimonials).
- Substantiating claims: Blog posts sometimes make large claims about overall successes, such as “Stripe Capital helps our users double their output.” Make sure that you have accurate and verifiable data for any quantifiable claims. You must validate these claims and provide supporting evidence upon request. Every claim must be substantiated and readily available for the duration the content is active, and for up to five years following its last use.

### Social posts 

Social posts such as organic and paid ads can help drive awareness of your program and tell a broader story about your investment in embedded finance. Because much of this audience might not be eligible for a financing, refer to the section [How to market to ineligible users](https://docs.stripe.com/capital/marketing.md#market-ineligible).

Social media is often space constrained. When you create content for this channel, don’t use approved marketing phrases out of context or reduced down to be misleading. Don’t use language that references eligible financing amounts, specific dollar amounts for financing fees, nor specific percentages of sales that go towards payment, because those are dynamically generated fields for formal financing offers.

### LinkedIn organic templates

Optional image text (up to 6 words): Financing now available with [Platform name + program name]

Post text (140 characters or fewer recommended; up to 5,000 allowed):

With [Platform name + program name], eligible businesses can quickly access the financing they need. Learn more [link to blog or landing page].

Image guidelines: See LinkedIn’s [Single Image Ads Specifications](https://business.linkedin.com/marketing-solutions/success/ads-guide/single-image-ads) for more information.

### X (formerly Twitter) organic template

Post text (71–100 characters recommended; up to 280 allowed; each link uses 23 characters of total):

With [Platform name + program name], eligible businesses can now access the financing they need. [Link to blog or landing page.]

Image guidelines: See the X [creative specs](https://business.x.com/en/help/campaign-setup/creative-ad-specifications) for more information.

### Press releases 

You can use press releases as a way to attract new customers or develop a larger story about your company’s investment in embedded finance. We’re happy to help you develop the right story and support its release. If you’re interested in doing a press release, submit a draft using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

## See also

- [Servicing](https://docs.stripe.com/capital/servicing.md)
- [Metrics](https://docs.stripe.com/capital/reporting.md)
