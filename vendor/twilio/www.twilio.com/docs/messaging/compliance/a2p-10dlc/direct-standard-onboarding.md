# Direct Standard and Low-Volume Standard Registration Guide

This guide will help direct customers register their business for A2P 10DLC messaging. You'll create a Customer Profile in Trust Hub, register a US A2P 10DLC Standard or Low-Volume Standard Brand, and register a US A2P 10DLC Campaign. For detailed explanations of customer and Brand types, refer to the [US A2P 10DLC Overview](/docs/messaging/compliance/a2p-10dlc).

By registering your Brand, you give US carriers information about your business and the messages you send, so carriers don't filter them.

This guide is intended for:

* US businesses with an Employer Identification Number (EIN).
* Canadian businesses with a Canadian Business Number.
* Businesses headquartered outside of the US, Canada, EU, UK, or Australia.

This guide isn't intended for:

* US or Canadian customers without an EIN or Canadian Business Number. Follow the [Direct Sole Proprietor Registration Overview](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview) instead.
* [Independent Software Vendors (ISVs)](https://help.twilio.com/hc/en-us/articles/4402930862747-Am-I-a-direct-customer-or-an-ISV-for-A2P-10DLC-registration-). Follow the [Standard and Low-Volume Standard Brand Onboarding Guide for ISVs](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) instead.

> \[!NOTE]
>
> If you're registering a Campaign with the OTP (One-Time Password) use case or any other form of 2FA (two-factor authentication), [Twilio Verify](/docs/verify) may be a better option for you. Verify does not require A2P registration or sender provisioning.

## Prerequisites

### Gather required information

Before you begin the registration process, read [Gather the Required Business Information](/docs/messaging/compliance/a2p-10dlc/collect-business-info). Pay special attention to the "Standard and Low-Volume Standard Brands" and "Campaign Details" sections to ensure you have all the necessary information.

The accuracy of your information is vital to the registration process. It contributes to your Trust Score from The Campaign Registry (TCR). This score determines your messaging throughput to US networks and daily message limits from mobile carriers. To achieve the best possible Trust Score, provide precise and current information that matches how you registered with your country's tax agency. For more details, refer to the [A2P 10DLC Brand Approval Best Practices support article](https://help.twilio.com/hc/en-us/articles/4405758341659-A2P-10DLC-Brand-Approval-Best-Practices).

### Determine your Brand type

You can register as either a Standard or Low-Volume Standard Brand. A Low-Volume Standard Brand is best suited for customers sending fewer than 6,000 message segments per day. Read [Comparison between Starter, Low-Volume Standard, and Standard registration for A2P 10DLC](https://help.twilio.com/hc/en-us/articles/4407882914971-Comparison-between-Starter-Low-Volume-Standard-and-Standard-registration-for-A2P-10DLC#h_01FH8KTK65WNPF7266MF2051S2) for information on the functional and pricing differences between Standard and Low-Volume Standard Brands.

### Review process for government, nonprofit, and political organizations

If you're registering a government agency, nonprofit, or 527 political organization, read [Registration for Government and Nonprofit Agencies](/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies) before proceeding with this guide. It highlights special aspects of your registration process that aren't addressed in this guide.

## Step 1: Create a Primary Customer Profile in Trust Hub

First, you need to create a Primary Customer Profile in Trust Hub. This is a one-time step that validates your business identity with Twilio. You can skip this step if you've already created a Primary Customer Profile for another Twilio product, such as [SHAKEN/STIR](/docs/voice/trusted-calling-with-shakenstir), [Branded Calls](/docs/voice/branded-calling), or [CNAM Registration](/docs/voice/brand-your-calls-using-cnam).

### Registration process

See the Business details section on the [Gather the Required Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info) to learn more about what you'll need to provide in this step.

To create the Profile, go to the [Onboarding](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding?activeStep=usA2POnboarding:customerProfileRegistration:businessProfileNeeds) page in your Console and begin the process listed under the **Create Customer Profile** tab.

### Approval process

It may take 72 hours or more for Twilio to approve your Customer Profile. While it's pending approval, you can continue to the next step.

## Step 2: Register a Brand

Next, you need to create a US A2P Brand. A Brand verifies who you are with US carriers.

### Registration process

See the Standard and Low-Volume Standard Brands section on the [Gather the Required Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info) to learn more about what you'll need to provide in this step.

To register your Standard or Low-Volume Standard Brand, go to the [Onboarding](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding?activeStep=usA2POnboarding:brandRegistration:brandNeeds) page in your Console and begin the process listed under the **Register Brand** tab.

> \[!NOTE]
>
> Starting October 17, 2024, public, for-profit Brands will require a new Brand identity verification for new and existing Brand registrations when creating new Campaigns.
>
> When registering a Brand, you must provide a Brand business contact email for verifying your identity via 2FA.
>
> **New Brand registrations**
>
> * In Console, during A2P Registration add Brand Contact Email under Brand registration.
> * via API: add `brand_contact_email` as part of the `us_a2p_messaging_profile_information`.
>
> **Updates to existing Brands**
> In the Console, add Brand Contact Email to your previously registered Brand. Complete 2FA and proceed to create new Campaigns.

### Approval process

When you complete the Brand registration form, Twilio submits your Brand application to TCR for their review. TCR review typically occurs within a few minutes after submitting, but process length varies depending on how much vetting the Brand requires. When the TCR review is complete, an email is sent to your Primary Customer Profile email address about the status of your Brand.

A Brand can have one of the following statuses:

* `IN_REVIEW`: Brand registration is in progress and your Brand information is under manual third-party review. Manual reviews take seven business days or more. There is no action required from your side.
* `APPROVED` (Registered): Brand registration is complete and the Brand is verified. You can now register your Campaigns.
* `FAILED`: Brand information couldn't be verified and registration has failed. You can find reasons for failure in the [Brand Overview](https://console.twilio.com/us1/develop/sms/regulatory-compliance/brands)  page in Console.
* `SUSPENDED`: The Brand potentially violates one or more rules for Brand registration.

If your Brand registration is `FAILED` or `SUSPENDED`, see our [Troubleshooting Guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands) for detailed information on how to correct and resubmit the registration.

Once your Brand is `APPROVED`, select the **Continue** button on the **Register Brand** tab of the [Onboarding](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding?activeStep=usA2POnboarding:brandRegistration:brandNeeds) page in Console to display a final screen that lists messaging limits based on your TCR Trust Score.

## Step 3: Register a Campaign and associate a Messaging Service

> \[!WARNING]
>
> Due to an increase in campaign submissions, campaign reviews are currently taking 10–15 days. Twilio will contact you if additional information is needed. Once approved, you can begin sending A2P 10DLC messages. If this review period has passed and your campaign is still in a pending state, please reach out to Support for assistance.

Now that your Customer Profile and Brand are successfully registered, you can register a Campaign for your Brand to send A2P 10DLC messages. A Brand can have up to five Campaigns associated with it.

### Set up a Messaging Service and Twilio Phone Number

Campaigns require an associated [Messaging Service](/docs/messaging/services) with at least one Twilio 10DLC Phone Number in its Sender Pool. You can use an existing Messaging Service or create one before or during Campaign registration. A Messaging Service can only be linked with one Campaign at a time.

The Messaging Service must have at least one Twilio Phone Number in its Sender Pool. During the Campaign registration process, you can associate an existing Twilio Phone Number with the Messaging Service or purchase a new one. You can also purchase Phone Numbers through the [Console](https://help.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console), [REST API](https://help.twilio.com/hc/en-us/articles/223182728-Using-the-REST-API-to-Search-for-and-Buy-Twilio-Phone-Numbers), or [Twilio CLI](https://www.twilio.com/blog/register-phone-number-send-sms-twilio-cli).

Add all of the Phone Numbers that you plan on using for A2P 10DLC messaging to the Messaging Service before submitting your Campaign registration. When your Campaign is vetted and approved, all of the 10DLC phone numbers within the Campaign's Messaging Service are registered for A2P 10DLC capabilities.

### Select a use case

A Campaign represents a single messaging use case which describes the type of messages you send to recipients, such as marketing promotions or order confirmations. For more information on Campaign use cases and related fees, read [Campaign use case types for A2P 10DLC registration](https://help.twilio.com/hc/en-us/articles/1260801844470-List-of-campaign-use-case-types-for-A2P-10DLC-registration#h_01F48BTWX0SV2QPV8NNKWHN896). Some use case types categorized as **Requires Carrier Review** need additional approval from carriers before they can be used.

### Registration process

See the Campaign details section on the [Gather the Required Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info#campaign-details) for information on what you need to provide in this step.

To register your Campaign, go to the [Onboarding](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding?activeStep=usA2POnboarding:brandRegistration:brandNeeds) page in your Console and begin the process listed under the **Campaign Registration** tab.

During Campaign registration, you can either select an existing Messaging Service or have a new one created for you.

### Approval process

Once submitted, your Campaign undergoes a manual vetting process and has a `pending` status. This process can take between two to three weeks to complete. Twilio will contact you if any additional information is required. Once approved, you are able to start sending A2P 10DLC messages and register additional Campaign use cases.

Some Campaign use cases require an additional carrier review, also known as carrier post-approval, before the Campaign registration can be approved. You can find a list of these special use cases in the Eligibility and Approval Process section of the [Special Use Cases for A2P 10DLC support article](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC#h_01F9J4SVRC7EGH3GD6F10XW2CP).
