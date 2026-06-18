# Transition from a Sole Proprietor to a Standard Brand

Twilio offers a **Sole Proprietor Brand** A2P 10DLC registration experience for [Direct Customers](https://help.twilio.com/articles/4402930862747-Am-I-a-direct-customer-or-an-ISV-for-A2P-10DLC-registration-#h_01F9CYYKV9YYKP2JCXT0EK9C2B) or Low-Volume Customers of Independent Software Vendors (ISVs) without an EIN/Tax ID. Sole Proprietor Brands come with [more limitations](https://help.twilio.com/articles/9550596959643-A2P-10DLC-Sole-Proprietor-Brands-FAQ) on message volume, throughput, and phone number allotment than Standard Brands.

When a Sole Proprietor Brand's messaging needs exceed these limits, or when the business entity acquires an EIN/Tax ID, the Brand needs to be transitioned to a Standard or a Low-Volume Standard Brand.

This guide aims to provide a detailed Sole Proprietor to Standard or Low-Volume Standard Brand transition process using the Twilio Console, including registration and whether to continue using the existing Messaging Service or create a new one.

## Transition path considerations

Transitioning from a Sole Proprietor to a Standard or Low-Volume Standard Brand on Twilio involves creating a separate Customer Profile, Brand, and Campaign for customers who initially have Sole Proprietor Brands.

> \[!NOTE]
>
> While Campaign registration is straightforward, verification can take several days or even several weeks.

## Before you begin

Review the following resources:

* The [US A2P 10DLC standard and different Brand types](/docs/messaging/compliance/a2p-10dlc).
* If you'd prefer transitioning your Sole Proprietor Brand via API, read the [Standard and Low-Volume Standard Brand API Onboarding Guide for ISVs](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) instead.
* If you are a Direct Customer, you can follow [Direct Standard and Low-Volume Standard Registration Overview](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding) instead.

### Existing or new Messaging Service?

You can continue using the existing Messaging Service for the Sole Proprietor Campaign, or create a new Messaging Service for the new Standard or Low-Volume Standard Campaign. Both options have pros and cons:

* **Existing Messaging Service**: Maintains settings like [Opt-Out](/docs/messaging/services#advanced-opt-out) and [Sticky Sender](/docs/messaging/services#sticky-sender) but messaging traffic is blocked while the new Campaign is awaiting approval.
* **New Messaging Service**: Avoids disruption of service but loses previous settings from the old Messaging Service.

#### Reuse Options: Phone Number, Messaging Service, or neither

When registering the new Standard or Low-Volume Standard Campaign for your customers, you can reuse the sender phone numbers or Messaging Service associated with their Sole Proprietor Brands, or choose new ones:

| **Option**            | **What it means**                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phone Number**      | This is a separate option from reusing the entire Messaging Service. When creating a new Campaign for your new Standard or Low-Volume Standard Brand, you must select a Messaging Service—either new or existing. Without this, you cannot proceed with the Campaign registration.                                                                                                                   |
| **Messaging Service** | Choosing an existing Messaging Service during Campaign creation automatically transfers any associated phone numbers and retains existing Opt-In/Opt-Out and Sticky Sender settings. However, until verification is complete, the sender number linked to the reused Messaging Service loses its A2P registration status. As a result, A2P 10DLC SMS messaging traffic is blocked from that Service. |
| **Neither**           | If your client sends significant traffic through their existing Sole Proprietor Campaign, the best strategy is to reuse neither. Leave both the Messaging Service and its associated A2P 10DLC number as they are. Create a new Messaging Service for the new Standard or Low-Volume Standard Campaign.                                                                                              |

> \[!WARNING]
>
> Reusing an existing Messaging Service or a phone number immediately both pose a risk of service interruption for up to several weeks. Either option is suitable for ISVs with customers who have intermittent messaging traffic via their existing Sole Proprietor Brands. While transitioning, consider the potential value of retaining the original sender number that your customers' end users are accustomed to, as opposed to introducing new sender numbers.

This guide will walk you through the New Messaging Service and Existing Messaging Service options via Twilio Console.

When working with the Console, [pin the Messaging product in your sidebar](https://help.twilio.com/articles/360006662093) so you can navigate to the Compliance section. Otherwise, search for the "Regulatory Compliance" link.

> \[!NOTE]
>
> For all information entered as part of this registration process, either via Twilio Console or the API, The Campaign Registry (TCR) supports all `utf8mb4` supported characters. See [the list](https://www.unicode.org/charts/) of all Unicode 15.0 supported scripts and characters.

## Console option 1: New Profile, new Standard Brand, new Messaging Service

It's not necessary to link any sender phone number with the new Messaging Service at the time of creation. You can wait until the new Campaign is fully verified before transferring the old number from the Sole Proprietor Campaign. ISVs managing many customers should consider purchasing a new A2P 10DLC number which you can provision for the new Messaging Service instead of tracking each customer's Sole Proprietor Brand verification status and transferring old numbers individually as new Campaigns are verified.

### Create a new Secondary Profile

Log into the Console and navigate to **Messaging > Regulatory Compliance > Onboarding** to create a new Secondary Profile for your customer's business. This step involves specifying the business entity's location, Tax ID status, and other details that determine eligibility for a Standard or Low-Volume Standard Brand.

To begin creating a new Secondary Profile for a customer:

1. Click the **Switch Customer Profile** link at the top right of the Customer Profile page.
2. From the **Select a Customer Profile** popup, click **+ New Customer Profile**.
3. On the Customer Profile **New Registration** page, your answers will determine your eligibility for creating a Secondary Customer Profile.

### Create a new Standard Brand

After submitting the Secondary Customer Profile for review, submit a Brand by choosing between a Standard or Low-Volume Standard Brand and specifying the customer organization type.

![Form to submit a brand with options for brand type and company type, and a registration fee agreement.](https://docs-resources.prod.twilio.com/9e4d78d65d9155d4b8c917dd9dd8f0368c5899270180cfccb9ed0b1752b80373.png)

Upon clicking Register, Twilio will submit the Secondary Profile and Brand you have just created to The Campaign Registry. Once registered, you can review your A2P Brands list and click on the newly registered one to view its details.

![Tasty Sandwiches Incorporated registration status is registered with customer type private.](https://docs-resources.prod.twilio.com/de4518451422a672cfa055d645ad77481fb93ee7acecf32f6b1cec15d0bbead4.png)

Standard Brands have [Trust Scores](https://help.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US) while Low-Volume Standard Brands do not as they skip secondary vetting during registration.

### Register a new Campaign using a new Messaging Service

[Register a new Campaign](https://console.twilio.com/us1/develop/sms/regulatory-compliance/campaigns) associated with the new Standard Brand, choosing a new [Messaging Service](/docs/messaging/services). Provide detailed information about the Campaign, including use case, Messaging Service, Campaign description, sample messages, and end-user consent mechanisms. Make sure to review the following Help Center articles before submitting your Campaign:

* [A2P 10DLC Campaign Approval Requirements](https://help.twilio.com/articles/11847054539547-A2P-10DLC-Campaign-Approval-Requirements)
* [Twilio support for opt-out keywords (SMS STOP filtering)](https://help.twilio.com/hc/en-us/articles/223134027-Twilio-support-for-opt-out-keywords-SMS-STOP-filtering-)
* [Advanced Opt-Out](https://help.twilio.com/hc/en-us/articles/360034798533-Getting-Started-with-Advanced-Opt-Out-for-Messaging-Services)

### Register a Twilio Phone Number (Sender) with the new Campaign

1. Under **Regulatory Compliance > Campaigns**, click on your newly registered Campaign.
2. Click on the **Linked Messaging Service**.
3. On the **Sender Pool** page, associate a Twilio [phone number](/docs/phone-numbers) with the new Campaign and Messaging Service, ensuring the number is not currently associated with an existing Messaging Service.

**Reusing an Existing 10DLC Number**

If you're reusing a Twilio number associated with your customer's Sole Proprietor Campaign, navigate to the existing Campaign's details page. Follow step 2 above. On the **Sender Pool** page, select the number and click **Remove**.

## Console option 2: New Profile, new Standard Brand, reuse existing Messaging Service

This option follows similar steps to Console option 1 but involves reusing an existing Messaging Service associated with the customer's Sole Proprietor Brand. It requires deleting the existing Sole Proprietor Campaign to free up the Messaging Service for the new Standard Campaign.

## Get help with A2P 10DLC

[Get help](https://www.twilio.com/blog/twilio-professional-services-for-us-a2p-10dlc-registrations)

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
