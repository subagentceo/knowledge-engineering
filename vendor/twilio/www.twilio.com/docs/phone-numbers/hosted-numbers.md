# Hosted Numbers FAQ

> \[!CAUTION]
>
> The Hosted Phone Numbers API is currently in development and not intended for use by new customers. This documentation exists to support customers who are already using the API. A new version of this API will be released as a generally available (GA) product in the near future. New customers should wait for the Hosted Phone Numbers GA release.

## What is a Hosted Number?

A Hosted Number provides a method for customers to use Twilio's Programmable Messaging, Functions, and Studio products to send and receive messages on voice-enabled numbers they already own as part of an established voice application.

## Will my current voice line be affected?

No, Hosted Number does not affect your voice capabilities of the number. Hosted Number only registers the number for messaging to route in and out of Twilio's platform.

## What numbers can I host on Twilio for messaging?

Hosted Number supports US and Canada numbers. Mobile numbers are not supported. Numbers already owned by a Twilio account for voice services cannot be hosted on another Twilio account for messaging services.

## How can I host my number?

You can initiate the hosting of your number using the Twilio [Console](https://www.twilio.com/console/phone-numbers/hosted) or programmatically with an [API](/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource). Twilio will require the end-user to complete ownership verification and LoA (Letter of Authorization) signature.

## How do I verify I own the number I want to host?

Twilio currently provides the ability to verify ownership of a number. It is a phone call that the end-user answers and passes back a security token to Twilio.

## What are the eligibility requirements to enable messaging on a number?

By submitting a phone number to the Hosted Numbers API or Console, the phone number will be evaluated for eligibility. Eligibility is determined by the number's country of origin and if the number is currently messaging enabled.

If you would like to check a number's eligibility before it is submitted, Twilio offers [Lookup](https://www.twilio.com/console/lookup), a tool to see information about the number. If a number is not of type `mobile`, then the number is eligible to be Hosted for SMS. For toll-free numbers, if type is `null`, generally, the number is eligible to be Hosted for messaging.

For example, here is a lookup for an eligible Canadian local number:

```json
{
  "caller_name": null,
  "country_code": "CA",
  "phone_number": "+19029052034",
  "national_format": "(902) 905-2034",
  "carrier": {
    "mobile_country_code": null,
    "mobile_network_code": null,
    "name": "Iristel Inc. - ON",
    "type": "landline",
    "error_code": null
  },
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+19029052034?Type=carrier"
}
```

And here is an example lookup for an ineligible Canadian number:

```json
{
  "caller_name": null,
  "country_code": "CA",
  "phone_number": "+19029052032",
  "national_format": "(902) 905-2032",
  "carrier": {
    "mobile_country_code": null,
    "mobile_network_code": null,
    "name": "Twilio - SMS-Sybase365/MMS-SVR",
    "type": "voip",
    "error_code": null
  },
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+19029052032?Type=carrier"
}


```

## What information does Twilio need?

Twilio requires the following information before you can host a number:

* The authorized user's first and last name, and business name, if applicable. An authorized user is an individual who is a decision maker for the phone number.
* The corresponding service address associated with the phone number. This must be a true physical address — PO boxes are not considered valid service addresses.
  * **Note** All phone numbers have an address associated with them. For example, Twilio owns a desk phone and that desk phone is associated to Twilio's 375 Beale St address.
* An email address will receive the Letter of Authorization (LoA) document to be signed electronically.
* Optional CC email addresses of the LoA's watchers to be issued when the LoA has been sent out for signature and when it has been signed.
* An LoA signed by the authorized user of the number(s). The LoA will need to be completed and signed electronically, and will be generated during the submission process.
  * **Note** 15,000 numbers can be included on one LoA.
  * **Note** The information and signature on your LoA must match the authorized user's name and service address provided by their current voice provider, and it must be signed in order for your submission to be processed.

## Why does Twilio need this information?

Twilio is compliant with the General Data Protection Regulation (GDPR) and only collects Personally Identifiable Information (PII) that is mandated by the North American Numbering Plan (NANP) SMS registrars. Twilio keeps PII information for 90 days, depending on the requirement timeframe set for by sections of GDPR.

## What are the processing phases required to host my number?

After you submit your Hosted Number request, the number goes through a three-stage onboarding process:

1. **Preliminary eligibility check** — Twilio verifies that the number is in a valid format, from an allowed country, and of a valid type.\
   If the number passes this check, Twilio creates a Hosted Number entry for it in your Twilio Console in the `twilio-processing` status.
2. **SMS eligibility check** — Twilio verifies that the number is not already messaging-enabled. A number that is already marked as `messaging-enabled` with its current provider cannot be used for Hosted SMS on Twilio. If the number is not currently `messaging-enabled`, the Hosted Number Order will move to the `received` status.
3. **Verify Ownership** — Once a number passes both eligibility checks, you will be able to browse to the number in your Hosted Numbers list in the Console and place a verification call to the number.
4. **Sign an electronic LoA** — After the number has been verified, you will need to create an electronic LoA that will be sent to the email address specified for signature.
5. **Enable Hosted SMS** — When the LoA is signed, the number's status will become `carrier-processing`: the carrier will register the number for SMS and then test it for inbound connectivity. Once the test passes, the number will be provisioned to your account.

## What are the steps from start to finish to host a number for SMS in NANP?

1. Create a new [Hosted Number](https://www.twilio.com/console/phone-numbers/hosted) to begin the order process. At this point, the number is checked for eligibility. Once the Hosted Number has passed the eligibility check, the Hosted SMS will move into the `received` status.
   * If the eligibility check fails, your Hosted Number Order will fail with the reason in Console and in the API (i.e., already Hosted Number, non-supported country, Mobile type).
2. The next step is to verify proof of ownership of the Hosted number with a verification call.
   * Initiate the call by moving the status to `pending-verification` via the API, or initiating the call on the [Console's Hosted Number Order page](https://www.twilio.com/console/phone-numbers/hosted/HR0e4efad858b7d57689c56c05697194b4).
3. Once your Hosted Number(s) have been verified, the Hosted Number will have to be electronically placed on a new Letter of Authorization (LoA).
   * The email specified on the LoA will receive an email from HelloSign to electronically sign the document. The document should be signed by the end-user answering the phone number.
   * **Note** If you have not already done so, create an [Address object](https://www.twilio.com/console/phone-numbers/addresses) with the Friendly Name being the business, and the First and Last name that of the authorized end-user, the decision maker on behalf of the phone number.
4. After the LoA is signed, the Hosted Number orders assigned to the LoA will move into a `carrier-processing` status.
   * **Note** Landline numbers will take up to one business day, while Toll-Free numbers can take up to 2-3 business days.
5. Once the number has been successfully registered for messaging with Twilio, the number will move to the `testing` status for a short period, to ensure inbound messaging connectivity is functional.
6. When testing is successful, the Hosted Number Order will move to `completed` and your Hosted Number will move to `in-use`.
   * **Note** If you would like to receive status updates on the Hosted Number Order, you can configure a Status Callback URL.

## How long does it take to message enable my number?

If you are using a verification phone call, an NANP landline number can take up to one business day to SMS enable, test inbound connectivity, and provision to your account.

Toll-Free numbers can take up to three business days to update. If you are the RespOrg of the Toll-Free number, you are able to speed the request by accepting Twilio's request to messaging-enable the number. If you are not the RespOrg, please inform your service provider to prevent any denial of Twilio's text provisioning request.

## What happens if the number moves to action-required?

When a number moves into `action-required`, a failure reason is exposed in both the public API and in the Console to help you diagnose and resolve the issue. If the issue is internal to Twilio, a **Contact Hosted Numbers Support** panel will be displayed in the Console. If you are using the API, please send your Hosted Number Order SID to [HostedSMS@twilio.com](mailto:HostedSMS@twilio.com) for support.

Here are some typical failure reasons:

* The Letter of Authorization was not signed within seven days.
* The Hosted Number Order was idle in the verification process for seven days.
* The Hosted Number Order has reached the maximum number of verification attempts.
* Twilio cannot host the phone number because carrier information is unavailable.
* The number is already enabled for messaging by another provider.
* There was a problem processing your Hosted Number Order.

If you receive any of these, please contact [HostedSMS@twilio.com](mailto:HostedSMS@twilio.com).

## How can I bypass my call tree to receive the verification call?

You can verify numbers behind Interactive Voice Responses (IVRs) using both the above methods by including `w` characters in the `Extension` parameter. Each `w` tells Twilio to wait half a second instead of playing a digit. This lets you adjust when the digits begin playing to suit the phone system you are dialing.

For example, the `Extension` value `wwww2wwwwww5wwwwww9` waits two seconds before sending the digit 2, followed by a three-second wait before sending the 5, and finally another three-second wait before sending a 9. You will need to tune the extension to the IVR system to be able to programmatically verify numbers behind IVR menus.

## Product support for Hosted SMS

### Co-pilot/Messaging Service

Yes! Hosted SMS works with Co-Pilot/Messaging Service.

### Proxy

Unfortunately, Proxy does not currently work with Hosted SMS, but Twilio expects to add support in the future.

### Flex

Flex supports Hosted Number via [Flex Conversations](/docs/flex/conversations). Hosted Number is not available on [Flex Legacy Messaging](/docs/flex/developer/messaging).

## Can I use my Hosted Number as a Verified/Outgoing Caller-ID?

Yes, a Hosted Number is capable of making outbound calls over Twilio's network, as well as two-way messages.

If an account already has an active Verified Caller-ID and then the account requests to host the same number for messaging, the Verified Caller-ID will be deleted and the number will bypass the proof of ownership since the Verified Caller-ID is already validated ownership with a two-factor authentication call.

## What if I no longer want to host my number on Twilio?

If you have completed the Hosted Number Order process but no longer want to host a number on Twilio, you can disassociate the number from Twilio by sending a [`DELETE` request on the IncomingPhoneNumbers instance resource](/docs/phone-numbers/api/incomingphonenumber-resource#delete-an-incomingphonenumber-resource), or by removing the number from your account on the **Hosted Number** instance page in the new Twilio Console's [Numbers & senders page](https://1console.twilio.com/go?to=/account/account/**account**/us1/senders-hub/list/phone-numbers/inventory) or the legacy Console's [Manage Active Numbers section](https://www.twilio.com/console/phone-numbers/incoming). The number will be in the released status for three days until the number is no longer registered to Twilio's network.

## What if I made a mistake on the Authorization Document?

Please [revoke](https://www.twilio.com/console/phone-numbers/authorization-documents/hosted) the existing Authorization Document in the Console. Once the Authorization Document has been revoked, all of the Hosted Number Orders that have been mapped to the Authorization Document will move to the `verified` status. To send out a new Authorization Document, select all verified Hosted Number Orders and bulk action create in the Console's [Hosted Number Orders section](https://www.twilio.com/console/phone-numbers/hosted) to generate a new one with the corrected information.

## Can I use MMS with Hosted Number?

US and Canadian local and toll-free can be hosted for SMS and MMS.

## Can I transfer my Hosted Number from my Parent Account to my Subaccounts?

A Hosted Number can be transferred using the [Subaccounts Public API](/docs/iam/api/subaccounts#exchanging-numbers). This functionality is not available in the Console.

## What if I want to fully port the number to have both Messaging and Voice capabilities?

You will need to generate a new port request. The new port request will **generate a new Phone Number SID** (`PNxxx`) as soon as a port is submitted. This means there will be two numbers with the same `phone_number` value, but different SIDs.

Ensure that you configure the new phone number right way with the appropriate SMS incoming URL to prevent downtime for your customers.

You can configure the number using the API or the Console. You can use the [Phone Number API](/docs/phone-numbers/api/incomingphonenumber-resource#code-filter-incomingphonenumbers-with-exact-match) and the E.164 format filter to find the new phone number's SID. After finding the SID of the porting number, use the [Phone Number API](/docs/phone-numbers/api/incomingphonenumber-resource#code-filter-incomingphonenumbers-with-exact-match) to configure the SMS and Voice URL.
