# Hosted Number Orders - API Quickstart

> \[!WARNING]
>
> This API is currently in Developer Preview

The [Twilio Hosted Numbers API](/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource) allows you to use Twilio's Programmable SMS with your existing US and Canada voice landline and toll-free numbers. The voice traffic will remain with the current voice provider, while Twilio's SMS routing profile will be applied for inbound and outbound SMS traffic on Twilio.

The Hosted Number Orders API provides a way to SMS enable a number and host on Twilio without having to purchase or port a number to Twilio. The API enables the ability to host a number using a structured API that provides a low-touch and secure workflow for you and your customers.

The Hosted Number Orders API is in Developer Preview and works for US & Canada landline and toll-free numbers that are *not* currently enabled for messaging. [Request early access to the Hosted Numbers SMS Enablement developer preview](https://www.twilio.com/en-us/messaging/channels/sms) to get your account access.

For pricing information, see [Twilio phone number pricing](https://www.twilio.com/en-us/sms/pricing/us).

Create new Hosted Number Order

```bash
curl -X POST https://preview.twilio.com/HostedNumbers/HostedNumberOrders \
  -d "PhoneNumber=+18444905863" \
  -d "SmsCapability=true"  \
  -d "FriendlyName=MyHostedNumberSmsOrder" \
  -d "StatusCallbackUrl=http://example.com/callback" \
  -d "StatusCallbackMethod=POST" \
  -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
    "status": "twilio-processing",
    "date_updated": "2018-01-21T21:40:55Z",
    "verification_code": null,
    "incoming_phone_number_sid": "PN876a18805574a952ffb73907b24205f0",
    "failure_reason": null,
    "verification_attempts": 0,
    "verification_type": "phone-call",
    "capabilities": {
        "voice": false,
        "mms": false,
        "sms": true
    },
    "sid": "HR36f3f0c7c8d5d9210114fdcd8b6bcf19",
    "phone_number": "+18444905863",
    "call_delay": 0,
    "signing_document_sid": null,
    "verification_document_sid": null,
    "verification_call_sids": [],
    "extension": null,
    "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HR36f3f0c7c8d5d9210114fdcd8b6bcf19",
    "friendly_name": "MyHostedNumberSmsOrder",
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2018-01-21T21:40:55Z"
}
```

## **Quick Start Tutorial**

The Hosted Number Orders API allows you to: submit an SMS enablement request, get immediate hosting eligibility validation of the number, track Hosted Number Order status transitions, and automate configuring a Hosted Number before the number is active on Twilio's Super Network.

Suppose you wanted to SMS enable your number *+18444905863* and host on Twilio. Your first step would be to create a new Hosted Number Order with the phone number in [+E.164 format](/docs/glossary/what-e164).

Twilio will check if the number meets the criteria for SMS enablement and, if valid, will create the Hosted Number Order and return a JSON resource of the instance resource:

Verify Ownership with Phone Call

```bash
curl -XPOST https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HR36f3f0c7c8d5d9210114fdcd8b6bcf19 \
  -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token' \
  -d "VerificationType=phone-call" \
  -d "Status=pending-verification"
```

```json
{
    "status": "pending-verification",
    "date_updated": "2018-01-21T22:31:43Z",
    "verification_code": "310001",
    "incoming_phone_number_sid": "PN876a18805574a952ffb73907b24205f0",
    "failure_reason": "",
    "verification_attempts": 1,
    "verification_type": "phone-call",
    "capabilities": {
        "voice": false,
        "mms": false,
        "sms": true
    },
    "sid": "HR36f3f0c7c8d5d9210114fdcd8b6bcf19",
    "phone_number": "+18444905863",
    "call_delay": 0,
    "signing_document_sid": null,
    "verification_document_sid": "RI2ad9942e6daa7d8e87a154f6f675f3f8",
    "verification_call_sids": [
        "CA83f7aa47a1760188e892fe8c2ba86749"
    ],
    "extension": null,
    "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HR36f3f0c7c8d5d9210114fdcd8b6bcf19",
    "friendly_name": "My_Sms_Hosted_Number_Order",
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2018-01-21T21:40:55Z"
}
```

## Ownership Verification

Once a number has passed the pre-validation check and is moved to the *received* status, the next phase will be to move the number to *pending-verification* where Twilio will call the number and ask for a security token. The phone call will prompt for the token four times before the call hangs up, and up to three verifications can be performed before the number moves to *action-required*, when a Twilio admin must be involved. If in `action-required` for more than 7 days, the Hosted Number Order will be marked as `failed` and a new Hosted Number Order will need to be created to go through the process again.

Twilio must verify that the end-user answering the phone call is the one requesting the text provisioning on the phone number. This verification step ensures that all requests are from legitimate end-users to ensure the authenticity of ownership.

To navigate past [IVRs](/docs/glossary/what-is-ivr), you can include an Extension parameter along with a `w`. Each `w` character tells Twilio to wait 0.5 seconds instead of playing a digit. This lets you adjust the timing of when the digits begin playing to suit the phone system you are dialing.

For example, the extension "wwww2wwwwww5wwwwww9″ waits two seconds before sending the digit 2, followed by a three-second wait before sending the 5, and finally another three-second wait before sending a 9. You will need to tune the extension to the IVR system to be able to programmatically verify numbers behind IVR menus.

Create new Authorization Document

```bash
$ curl -X POST https://preview.twilio.com/HostedNumbers/AuthorizationDocuments \
    -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token' \
    -d "HostedNumberOrderSids=HR7e42fbbfb47d17baaae45d94c34ec4c3" \
    -d "HostedNumberOrderSids=HR18b3fc4bb26c368ceff1587ec26bf892" \
    -d "HostedNumberOrderSids=HR842cc9ce52ce257da378c2972f88fecc" \
    -d "HostedNumberOrderSids=HRc401d83d7d66901d2b65a4700457272d" \
    -d "AddressSid=AD1e20d20a7772e157c8ddbaba36aefef0" \
    -d "Email=owner@example.com" \
    -d "CcEmails=person1@example.com&CcEmails=person2@example.com"
```

```json
{
    "status": "signing",
    "date_updated": "2017-10-16T23:54:59Z",
    "cc_emails": [
        "person1@example.com",
        "person2@example.com"
    ],
    "url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PX5b7889b420ec6bca465c068f5bc2b67e",
    "address_sid": "AD1e20d20a7772e157c8ddbaba36aefef0",
    "sid": "PX5b7889b420ec6bca465c068f5bc2b67e",
    "date_created": "2017-10-16T23:54:58Z",
    "email": "owner@example.com"
}
```

## Create new LOA and Sign

Carriers require a signed Letter of Authorization (LOA) by the authorized end user of the phone number to enable SMS capabilities. Twilio will generate this document with the address information and phone numbers you passed, to be sent for your or your customer's review and signature. To trigger the LOA email, issue a `POST` request to the Hosted Numbers Authorization Documents list resource with the required information. The new Authorization Document will be moved to `signing`, along with the Hosted Number Orders attached to the Authorization Document moving to `pending-loa`.

A Document SID is provided to you in the response. By performing a `GET` on the HostedNumberOrders endpoint, you can keep up-to-date status to track the Hosted Number Order during the signature process with the Hosted Number Order SID.

Update the Phone Number Configuration

```bash
$ curl -XPOST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/IncomingPhoneNumbers/PN9c45b3eb69d07536c60a621891420bfc.json \
-d "SmsUrl=https://demo.twilio.com/welcome/sms/reply/" \
-d "FriendlyName=something new"
-u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

```json
{
    "sid": "PN9c45b3eb69d07536c60a621891420bfc",
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "friendly_name": "something new",
    "phone_number": "+18444725974",
    "voice_url": null,
    "voice_method": null,
    "voice_fallback_url": null,
    "voice_fallback_method": null,
    "voice_caller_id_lookup": false,
    "date_created": "Wed, 25 Oct 2017 22:54:16 +0000",
    "date_updated": "Wed, 25 Oct 2017 23:43:35 +0000",
    "sms_url": "https://demo.twilio.com/welcome/sms/reply/",
    "sms_method": null,
    "sms_fallback_url": null,
    "sms_fallback_method": null,
    "address_requirements": "none",
    "beta": false,
    "capabilities": {
        "voice": false,
        "sms": true,
        "mms": false,
        "fax": false
    },
    "voice_receive_mode": "voice",
    "status_callback": null,
    "status_callback_method": null,
    "api_version": "2010-04-01",
    "voice_application_sid": null,
    "sms_application_sid": null,
    "origin": "hosted",
    "trunk_sid": null,
    "emergency_status": "Inactive",
    "emergency_address_sid": null,
    "address_sid": null,
    "identity_sid": null,
    "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/IncomingPhoneNumbers/PN9c45b3eb69d07536c60a621891420bfc.json"
}
```

## Configure Hosted Number

You don't have to wait for the Hosted Number Order to complete in order to configure your number with an incoming SMS webhook. The [Incoming Phone Numbers API](/docs/phone-numbers/api/incomingphonenumber-resource) provides a programmatic way to pre-configure the number with the Incoming Phone Number SID.

```bash title="Release a hosted number from your active numbers"
$ curl -DELETE https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/IncomingPhoneNumbers/PN9c45b3eb69d07536c60a621891420bfc.json \
-u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

## Remove Hosted Number from your inventory and remove Twilio's SMS Routing Profile

When you no longer want to host your phone number for SMS on Twilio, you can send a `DELETE` request to the phone number instance on the Incoming Phone Numbers resource. The Hosted Number takes 3 days before fully retiring from our system. If you accidentally released your Hosted Number, please write to [hostedsms@twilio.com](mailto:hostedsms@twilio.com) to request restoration. After 3 days, Twilio will unregister the number for SMS, and the number will turn into a landline or Toll-Free with no SMS routing.

Thanks for reading! Sign up for early access [here](https://www.twilio.com/en-us/messaging/channels/sms).
