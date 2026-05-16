# Twilio SIP Trunking Scale and Limits

Make sure you're aware of the following Twilio SIP Trunking limits.

## Accounts

Accounts have a maximum of:

* 100 unique SIP trunks
* 1 Trunking termination call per second (CPS) (You can increase up to 5 CPS in console) \*
* Unlimited trunking origination calls per second (CPS) \*
* Unlimited concurrent calls \*
* Unlimited origination phone numbers
* [IP Access Control Lists (ACLs) limits](/docs/voice/sip/api/sip-ipaccesscontrollist-resource)
* [Credential Lists limits](/docs/voice/sip/api/sip-credentiallist-resource)

\* Dependent on carrier support. New accounts without an approved Business Profile will have limited concurrent calls and cannot self-serve CPS updates in Console. [About Business Profiles](https://console.twilio.com/us1/account/trust-hub/customer-profiles).

Any of these limits may be increased if required, please [contact sales][sales].

Your Termination calls to the PSTN must use verified caller IDs. Learn more [here](/docs/sip-trunking#allowed-caller-id-numbers-in-termination-calls).

## Trial Accounts

[sales]: https://www.twilio.com/en-us/help/sales

When you sign up for Twilio, you get a free trial that includes an auto-assigned telephone number. The trial lasts 30 days or until you exhaust your free product units, whichever comes first. If you run out of product units before 30 days, you'll need to upgrade your account to continue. For details on trial free units, restrictions, and the 30-day expiration, see [Twilio trial account](/docs/usage/trials).

During the trial, your phone number is auto-assigned and cannot be chosen. SIP trunking is only available after you upgrade your account. Once upgraded, you can select a new phone number of your choice and configure SIP trunking.

Note: Trial accounts may only place calls TO and FROM verified numbers. Be sure to [verify any non-Twilio phone number][verify] first by having Twilio place a verification call to it. This restriction is removed once you upgrade your account. A purchased Twilio phone number also qualifies as a verified number you can use as the caller ID.

[verify]: /user/account/phone-numbers/verified
