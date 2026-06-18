# Core concepts: Numbers

## Overview

Twilio gives you instant access to different number types in over 100 countries for your voice and messaging applications. A Twilio number can include different communication capabilities, such as voice and SMS. You can programmatically manage these numbers and build complex IVR apps and chatbots using Twilio's REST APIs.

## Long code or Direct-In-Dial (DID) numbers

Direct Inward Dialing (DID) is a telephone service that allows call routing to a specific number at a business instead of going to a menu or a queue and dialing an extension. You can enable DID for your Twilio number by connecting your SIP infrastructure to a [Twilio SIP Trunk](/docs/sip-trunking/sample-configuration) or by [registering your SIP endpoint on Twilio](/docs/voice/api/sip-registration).

[Long codes](/docs/glossary/what-long-code-phone-number) (which are 10-digit numbers in many countries) are meant for person-to-person communications, and can send one message per second. There are different concepts associated with a long code.

### Local numbers

Local numbers are assigned to a specific geographic region. These numbers are typically used by individuals and local businesses. For Twilio's recommendations on filtering for local numbers, see [Purchasing Twilio numbers that are local to customers](https://help.twilio.com/hc/en-us/articles/223182788-Purchasing-Twilio-phone-numbers-that-are-local-to-customers).

### National numbers

[National numbers](https://help.twilio.com/hc/en-us/articles/223135267-What-is-a-national-number-and-how-does-it-work) are non-geographic long code numbers designed to be reachable from the entire country for the same price as a local phone call. Twilio offers national numbers in certain countries.

### VoIP numbers

VoIP (Voice over IP) numbers are virtual numbers that get allocated to a user instead of a dedicated phone line. A virtual number is a standard number that's not locked down to a specific phone. You can use these numbers to route voice calls or text messages to any phone or workflow.

### Mobile numbers

A mobile number refers to the 10-digit unique number that a wireless carrier uses to identify a mobile phone. Most countries (except for the US and Canada) assign a particular range for mobile numbers within the country's numbering plan so they can be distinguished from local numbers.

### Toll-free numbers

Toll-free numbers are numbers with distinct, preassigned 3-digit codes in place of an area code. They are often used for domestic inbound calls and are free for your customers.

#### Domestic

Twilio's US and Canada toll-free numbers are enabled for sending and receiving SMS messages. While most toll-free numbers are domestically reachable and aren't reachable from pay phones, US toll-free numbers can be reached from Canada.

#### International

Twilio offers toll-free numbers in various international countries. To learn more about availability and toll-free features for international numbers, see [Twilio international number availability and their capabilities](https://help.twilio.com/hc/en-us/articles/223183068-Twilio-international-phone-number-availability-and-their-capabilities#toll_free). For details on country requirements and limitations, see [Toll-free number restrictions and limitations](https://help.twilio.com/hc/en-us/articles/115007579027-Toll-free-phone-number-restrictions-and-limitations).

For a summary of different number types, see [Phone Number Types and their Capabilities](https://help.twilio.com/hc/en-us/articles/223135367-Twilio-Phone-Number-Types-and-Their-Capabilities).

## Long code procurement

You can use the Twilio Console or Twilio's REST APIs to manage provisioning, porting, and hosting your numbers with Twilio.

### Provisioning

SIP Trunks connect IP-based communications infrastructure to the public switched telephone network (PSTN). Twilio's [Elastic SIP Trunking](https://www.twilio.com/en-us/sip-trunking) uses the power of the cloud to bring instant provisioning, global reach (with local, national, mobile, and toll-free numbers in over 100 countries) and data-driven routing to the world of SIP Trunking. One way to procure a Twilio number is using the [Twilio Console](https://www.twilio.com/console/phone-numbers/search). Alternatively, you can use the **Phone Numbers 2010-04-01 REST API** resources to search for, purchase, and manage your Twilio long code numbers:

* [`/AvailablePhoneNumbers`](/docs/phone-numbers/api/availablephonenumber-resource): This API resource has specific subresources for you to search for local, toll-free and mobile numbers that are available to purchase. For a detailed walkthrough, see [Using the REST API to Search for and Buy Numbers](https://help.twilio.com/hc/en-us/articles/223182728-Using-the-REST-API-to-Search-for-and-Buy-Twilio-Phone-Numbers).
* [`/IncomingPhoneNumbers`](/docs/phone-numbers/api/incomingphonenumber-resource): This resource represents a Twilio number provisioned from Twilio, ported to or hosted by Twilio. In order to provision a new number, you need to [create an IncomingPhoneNumber resource](/docs/phone-numbers/api/incomingphonenumber-resource#create-an-incomingphonenumber-resource).
* [`/Addresses`](/docs/usage/api/address): This resource represents your or your customer's physical location within a country. Around the world, some local authorities require the name and address of the user to be on file with Twilio to purchase and own a number. When searching for available numbers, address requirements are exposed as a property in the API response.
* [`/RegulatoryCompliance`](/docs/phone-numbers/regulatory/getting-started/create-new-bundle-public-rest-apis): The Regulatory Compliance APIs include resources that help ensure you can provision and use phone numbers legally. Before creating a new Regulatory Bundle, you can review the requirements for a number based on its ISO country code, number type, and end user type (whether a number is owned by an individual or a business).

### Porting

Porting is the transfer of a number between two telephone service providers on behalf of an end-user. The process involves providing the right documentation to prove ownership of the number as well as coordination between the existing provider and the new provider with regard to the number's porting date.

#### Port in

"Port in" is the process of porting your number from your current provider to Twilio. When a port request is submitted to Twilio, Voice and SMS capabilities for the numbers are ported by default. Twilio supports porting of US and international numbers. You may port your numbers into Twilio [via the Console](https://www.twilio.com/console/phone-numbers/porting-requests/port).

#### Port out

"Port out" is the process of porting your number from Twilio to a new provider. The Twilio Console has a [Port Away Requests page](https://www.twilio.com/console/phone-numbers/porting-requests/port-away-requests) with links to relevant "port out" resources.

To learn more about porting, refer to the [Help Center](https://help.twilio.com/hc/en-us/categories/203267567-Porting)

### Hosted SMS

[Hosted SMS](/docs/phone-numbers/hosted-numbers#what-is-a-hosted-number) allows customers to use Twilio's Programmable Messaging, Functions, and Studio products for sending and receiving SMS and MMS messages on voice-enabled numbers they already own as part of an established voice application. Twilio Hosted SMS supports US and Canada in Beta.

Flex supports Hosted SMS using [Flex Conversations](/docs/flex/conversations). Hosted SMS is not available on [Flex Legacy Messaging](/docs/flex/developer/messaging).

To learn more about managing your Flex numbers, see [Add and Configure a New Number with Twilio Flex](https://help.twilio.com/hc/en-us/articles/360019485393-Add-and-Configure-a-New-Phone-Number-with-Twilio-Flex).

## Short codes

A short code is a special 5- or 6-digit number that's shorter than a long code number. Short codes are used to send two-way SMS and MMS messages. There are two types of short codes:

* **Regular**: Random short code assigned to you that you can't review in advance.
* **Vanity**: A specific short code that you choose. For example, "MyBiz".

### Short code activation

Twilio currently offers short codes in many countries [around the world](https://www.twilio.com/en-us/guidelines/short-code) (provisioning time varies by country). Twilio short codes can send 100 messages per second by default. You can raise this limit for an additional fee.

#### Activation and migration to Twilio

Whether you're applying for a short code with Twilio or [migrating one from an existing provider](https://help.twilio.com/hc/en-us/articles/223182268-US-Short-Code-Migration-Process-and-FAQ), you need to start a [short code application](/login?g=%2Fshortcode%2Fchoose-country%3F\&t=bd8c6b28c52ee601bc57b62380f97e3834c362103e38d141c109375510b0f986). Because short codes can send high volumes of messages, wireless carriers individually approve every short code for its intended use. For more details, see the [help articles on short codes](https://help.twilio.com/hc/en-us/sections/205112927-Short-Codes).

#### Migration away from Twilio

For guidance on migrating your Twilio short code to a different provider, see [Transferring a short code lease away from Twilio](https://help.twilio.com/hc/en-us/articles/223134767-Transferring-a-short-code-lease-away-from-Twilio).

## Free-to-end-user SMS

Free-to-End-User messaging (FTEU) is where the brand (the Twilio customer) pays the cost of sending an SMS to their end users. US short codes are the only way to send messages that are truly free to end users through Free-to-End-User messaging (additional fees and requirements apply). To learn how to programmatically send an SMS using a Twilio short code that you own, see the [Programmable SMS Send Messages page](/docs/messaging/quickstart).

## Premium SMS

A Premium SMS number is a 3-7 digit number used for messaging that charges a premium price to the end user per sent SMS. Twilio doesn't support premium SMS for short codes because historically they have been used as a vector for fraud and abuse.

## Sender IDs

A Sender ID is the name or number that identifies the sender of an SMS. This is defined by the [`From` property](/docs/messaging/api/message-resource#message-properties) of Twilio's Messaging resource. There are two types of Sender IDs:

* **Numeric**: This refers to your Twilio number in [E.164 format](/docs/glossary/what-e164).
* **Alphanumeric**: You can use a custom string like your business brand to identify your outbound messages to your end users. [Alphanumeric sender IDs](/docs/glossary/what-alphanumeric-sender-id) are used for branded one-way messaging. See [International support for Alphanumeric Sender ID](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID) for a list of countries that support using alphanumeric sender IDs for messaging.

### Sender ID activation

There are two ways to activate your Twilio sender ID:

* **Dynamic:** This refers to instant provisioning of a Sender ID and applies to most Twilio supported countries.
* **Pre-registration**: Some countries require pre-registration, which means the Twilio customer has to provide information and sometimes additional documents, resulting in additional time before the Sender ID is activated. These Sender IDs are known as "pre-registered". For pre-registering a sender ID, visit [Twilio's pre-registration page](https://console.twilio.com/us1/develop/sms/senders/sender-ids/applications/create).

To learn more, see [International Support for Alphanumeric Sender ID](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID).

## Caller IDs

Caller identification is a telephone service that transmits a caller's number to the called recipient when the call is being set up. In most cases, this is the [Twilio number](https://www.twilio.com/user/account/phone-numbers/available/local) or [verified number](https://help.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio) used in the `From` parameter in your API request, or the `callerId` attribute of your [TwimL \<Dial> verb](/docs/voice/twiml/dial). For a detailed guide on addressing issues with caller identification, see [Unable to Display a Business Name or Custom Text as Caller ID](https://help.twilio.com/hc/en-us/articles/223180148-Unable-to-Display-a-Business-Name-or-Custom-Text-as-Caller-ID).

## Regulatory compliance

Twilio and its customers need to comply with [local regulatory requirements](https://www.twilio.com/en-us/guidelines/regulatory) for their numbers. To get started with regulatory compliance, see the [Twilio Console](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) or the [Regulatory Compliance APIs](/docs/phone-numbers/regulatory/getting-started/create-new-bundle-public-rest-apis) quickstarts.
