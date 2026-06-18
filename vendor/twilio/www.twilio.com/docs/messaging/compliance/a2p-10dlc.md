# Programmable Messaging and A2P 10DLC

https://www.youtube.com/watch?v=KWvbRToRnGg

A2P (Application-to-Person) 10DLC (10-digit long code) is the standard that United States telecom carriers have put in place to ensure that SMS traffic to US end users through long code phone numbers is verified and consensual.

> \[!WARNING]
>
> Due to an increase in campaign submissions, campaign reviews are currently taking 10–15 days. Twilio will contact you if additional information is needed. Once approved, you can begin sending A2P 10DLC messages. If this review period has passed and your campaign is still in a pending state, please reach out to Support for assistance.

## A2P 10DLC background

### What is A2P

Application to Person (A2P) messaging is SMS/MMS traffic in which a person is receiving messages from an application rather than another individual.

US telecom carriers consider any messages sent from a Twilio number (or any other messaging provider) to be application to person. [Learn more in this glossary article about A2P.](/docs/glossary/what-a2p-sms-application-person-messaging)

Traffic sent from an individual person to another person is called Person to Person (P2P) traffic.

### What is 10DLC

10DLC stands for 10-digit [long code](/docs/glossary/what-long-code-phone-number). A 10DLC phone number contains 10 digits, and is also called a local phone number. When you are buying a US phone number from Twilio, 10DLC numbers have "Local" as their Type.

You might also hear 10DLC numbers referred to as 10DLC routes.

You can also use Toll-Free numbers and short codes to send messages from Twilio to people in the US. [Learn more in this article comparing the three different types of phone numbers.](https://help.twilio.com/hc/en-us/articles/360038173654)

### Why A2P 10DLC was created

Ten-digit long code numbers in the US were originally designed for person to person (P2P) communication. These routes were unregulated, and in recent years have started seeing abuse from spam applications and unsolicited messaging.

Due to the increase in spam messages, many consumers have lost trust in SMS as a form of communication. US A2P 10DLC is the standard that carriers have implemented in the US to regulate this communication pathway.

A2P 10DLC improves the end user experience by making sure that people can opt in and out of messaging and also know who is sending them messages. It also benefits businesses, offering them higher messaging throughput, brand awareness, and accountability.

## Who needs to register for A2P 10DLC?

Anyone sending SMS/MMS messages over a 10DLC number from an application to the US must register for A2P 10DLC.

Carriers consider all SMS traffic from Twilio to be sent from an application. Anyone using a 10DLC number with Twilio to send SMS messages to the US will need to register. This includes individuals and hobbyists using Twilio.

> \[!NOTE]
>
> Toll-Free numbers and short code numbers aren't part of the A2P 10DLC system and can also be used for messaging end-users in the United States. See [a comparison of 10DLC, Toll-Free, and short code numbers](https://help.twilio.com/hc/en-us/articles/360038173654).
>
> If you're only using 10DLC numbers to send user verification text messages, you can use [Twilio Verify](/docs/verify) rather than registering for A2P 10DLC.

Registering for A2P 10DLC results in lower message filtering and higher messaging throughput. Additionally, customers who send messages from a Twilio 10DLC number but do not register will receive additional carrier fees for sending unregistered traffic. See [pricing and fees associated with the A2P 10DLC service](https://help.twilio.com/hc/en-us/articles/1260803965530).

You can register for A2P 10DLC within the Twilio Console. If you are an ISV who is registering your customers for A2P 10DLC, you can also use Twilio's APIs. Learn more in the sections below.

## General A2P 10DLC registration steps

US A2P 10DLC has been put in place to ensure that all A2P 10DLC traffic to US phone numbers is **verified** and **consensual**. To meet this goal, there are two main components of A2P 10DLC registration:

* Create a Brand

  * You provide information about who is sending these messages so that carriers know you are a legitimate sender
* Create a Campaign

  * You provide information about how end users can opt-in, opt-out, and receive help. It also involves providing a description of the purpose of your messages.

You can create a Brand and Campaign either in the Twilio Console or via the Twilio API, depending on what type of customer you are. The section below shows the different customer types.

### Determine your customer type

Below are the different A2P 10DLC customer types with Twilio:

| **Customer Type**                     | **Description**                                                                                                                                                                     | **How do I register my business?**                                                                                                                                                                                                                                                               | **How do I register my customers? (ISV)**                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Direct Brand**                      | You're a business owner that uses Twilio messaging services to send and receive SMS to/from your customers. You have a business Tax ID (not including a US Social Security Number). | Using the [Twilio Console](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding). [See the Direct Standard and Low-Volume Standard Brand Onboarding Guide](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding) for a detailed registration walkthrough.  | N/A                                                                                    |
| **Independent Software Vendor (ISV)** | You're a software company that embeds Twilio APIs into your software solutions to power digital communications for your customers.                                                  | Using the [Twilio Console](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding). [See the ISV Onboarding Guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv) for a detailed registration walkthrough.                                                        | Using the [A2P 10DLC ISV API](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) |
| **Sole Proprietor**                   | You're a student, hobbyist, someone working at an organization or someone trying out Twilio messaging products for the first time.                                                  | Using the [Twilio Console](https://console.twilio.com/us1/develop/sms/regulatory-compliance/a2p-onboarding). [See the Direct Sole Proprietor Brand Onboarding Guide](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview) for a detailed registration walkthrough. | N/A                                                                                    |

### Determine your Brand type

Twilio offers different A2P 10DLC Brand types, depending on the type of customer you are and the messaging volume and throughput you need. Review the chart below to determine the best Brand type for you or your customers.

![Flowchart for selecting the correct A2P 10DLC brand type based on customer type, location, and message volume.](https://docs-resources.prod.twilio.com/4935f50a32f32dfaf924a4e5d699a874406d30307e5280306b1769ae51d73c8c.png)

To determine which A2P Brand is best for you, consider your current and expected messaging traffic volume.

|                      | Sole Proprietor Brand                                                                                                | Low-Volume Standard Brand                                                                                                                                                                                                                                        | **Standard Brand**                                                                                                                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Campaigns per Brand  | One Campaign per Brand                                                                                               | Each Brand may register up to five Campaigns, unless a clear and valid business reason is provided for exceeding this limit                                                                                                                                      | Each Brand may register up to five Campaigns, unless a clear and valid business reason is provided for exceeding this limit                                                                                                            |
| Daily message volume | 1,000 SMS segments and MMS per day to T-Mobile (approximately 3,000 SMS segments and MMS per day across US carriers) | Up to 2,000 SMS segments and MMS per day to T-Mobile (approximately 6,000 SMS segments and MMS per day across US carriers), with the exception of companies in the Russell 3000 Index, who will be able to send 200,000 SMS segments and MMS per day to T-Mobile | From 2,000 and up to unlimited SMS segments and MMS per day to T-Mobile, depending on your [Trust Score](https://help.twilio.com/hc/en-us/articles/1260804800549-T-Mobile-daily-message-limits-for-long-code-messaging-with-A2P-10DLC) |

Note that if you're registering a company that's part of the Russell 3000 Index, [you can unlock additional volume and throughput with a Low Volume Standard Registration](https://help.twilio.com/hc/en-us/articles/4403988619163).

[See this support article for the fees associated with registration for each Brand type.](https://help.twilio.com/hc/en-us/articles/1260803965530)

> \[!NOTE]
>
> As the above flow-chart indicates, Standard and Low-Volume Standard Brands require a **Tax ID** (e.g. EIN in U.S., Canadian Business Number in Canada, equivalent in other countries). Each tax ID may be used to register up to five Standard /Low Volume Standard Brands. If you exceed this limit, additional Brands will be successfully registered, but their Campaigns may be rejected upon the manual Campaign Vetting unless a clear and valid business reason is presented.

### Determine your Campaign use case type

Your Campaign use case type describes the general type of messages you will be sending to end-users, such as marketing or account verification. There are a few different categories of use case types:

* Standard. [See the full list of standard use cases.](https://help.twilio.com/hc/en-us/articles/1260801844470)
* Low-Volume Mixed. This Campaign use case type offers lower messaging volume (fewer than 2,000 message segments per day on T-Mobile) and throughput with a lower monthly fee.
* Special, such as non-profits and emergency services. [See the full list of special use cases](https://help.twilio.com/hc/en-us/articles/4402972441243).

The different campaign types have varying monthly fees associated and messaging throughput associated with them. See [pricing and fees associated with the A2P 10DLC service](https://help.twilio.com/hc/en-us/articles/1260803965530).

Note that Low Volume Standard Brands receive lower messaging throughput for campaigns than Standard Brands.

### Review these resources

The following resources provide additional information about A2P 10DLC registration and messaging best practices:

* [Toll Free Console Onboarding](/docs/messaging/compliance/toll-free/console-onboarding)
* [Messaging Segment Calculator](https://twiliodeved.github.io/message-segment-calculator/)
* [ISV Registration API](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api)
* [ctia - Messaging Principles & Best Practices](https://www.ctia.org/the-wireless-industry/industry-commitments/messaging-interoperability-sms-mms)
* [Forbidden Message Categories](https://help.twilio.com/hc/en-us/articles/360045004974-Forbidden-Message-Categories-in-the-US-and-Canada-Short-Code-Toll-Free-and-Long-Code-)
* [Twilio's Acceptable Use Policy](https://www.twilio.com/en-us/legal/aup)
* [Twilio Verify (for OTP/2FA)](https://www.twilio.com/en-us/trusted-activation/verify)
* [Toll Free API Onboarding](/docs/messaging/compliance/toll-free/api-onboarding)

## Register for US A2P 10DLC with Twilio

When you've determined your customer type, desired brand type, and campaign use case type, you're ready to start the registration process. You will need to provide Twilio with additional details about your business and your campaign when you register.

Use the following guides to complete your A2P 10DLC registration based on your customer type:

* [Direct Customer Standard and Low-Volume Standard A2P 10DLC registration instructions](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding)
* [Direct Customer Sole Proprietor A2P 10DLC registration instructions](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview)
* [ISV Customer Standard A2P 10DLC registration instructions](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api)
* [ISV Customer Sole Proprietor A2P 10DLC registration instructions](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new)

## Get help with A2P 10DLC

[Get help](https://www.twilio.com/blog/twilio-professional-services-for-us-a2p-10dlc-registrations)

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
