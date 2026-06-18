# Lookup

## Lookup

Improve your message deliverability with Twilio Lookup. You can validate and identify phone number types and carriers, format numbers for local standards, assess risks, verify ownership, and ensure compliance with industry best practices. Reach the right recipients while maintaining accuracy and security.

## Tutorial

```js !sample
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v2
    .phoneNumbers("+14159929960")
    .fetch({ fields: "line_type_intelligence" });

  console.log(phoneNumber.lineTypeIntelligence);
}

fetchPhoneNumber();
```

1. Create a Twilio account and set up authentication.
2. Run Lookup data packages to get the phone number information.
3. Twilio returns the phone number information, including the line type and carrier.

Tutorial code output: "Filter out invalid numbers and landline numbers before sending messages."

## Get started

Choose your programming language and dive into [Twilio Lookup Quickstart](/docs/lookup/quickstart).

### Data packages

Use Lookup [data packages](/docs/lookup/v2-api#data-packages) to get phone number information.

* [Line Type Intelligence](/docs/lookup/v2-api/line-type-intelligence)
* [Reassigned Number](/docs/lookup/v2-api/reassigned-number)
* [Identity Match](/docs/lookup/v2-api/identity-match)
* [Caller Name ](/docs/lookup/v2-api/caller-name)
* [SIM Swap](/docs/lookup/v2-api/sim-swap)
* [Call Forwarding](/docs/lookup/v2-api/call-forwarding)
* [SMS Pumping Risk Score](/docs/lookup/v2-api/sms-pumping-risk)
* [Line Status](/docs/lookup/v2-api/line-status)

## Use cases

* **[Filter out VoIP numbers](https://www.twilio.com/blog/filter-voip-before-otp-verification)**: Detect VoIP phone numbers, often associated with bots, before sending SMS messages.
* **[Filter out landline numbers](https://www.twilio.com/blog/filter-landlines-lookup-sms)**: Identify landline phone numbers to prevent undeliverable SMS messages and avoid unnecessary delivery costs.
* **[Validate phone number ownership](/docs/lookup/v2-api/identity-match)**: Verify the ownership of a mobile phone number.
* **[Avoid Telephone Consumer Protection Act (TCPA) violation fees](/docs/lookup/v2-api/reassigned-number)**: Verify whether the current owner of a phone number is the same as the previous owner.
* **[Detect SIM swaps](https://www.twilio.com/blog/detect-sim-swap-sms-otp-2fa)**: Detect potential fraud by identifying SIM swaps before sending one-time passwords (OTPs).

## Build your App

Learn how to build secure login systems with Twilio Verify and Lookup.

https://www.youtube.com/watch?v=n6loU5ga2V8

## Related Products

### Twilio Verify

Get a comprehensive solution to cut costs, increase OTP conversions, and reduce fraud risk.

[Product Docs](/docs/verify)

### Twilio Messaging

Increase deliverability and reduce undeliverable messages.

[Product Docs](/docs/messaging)

### Stytch by Twilio

Add enterprise SSO, device intelligence, and scoped access for agents acting on behalf of users.

[Product Docs](https://stytch.com/docs)
