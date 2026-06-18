# Verify TOTP Overview

[Time-based one-time passcode (TOTP)](/docs/glossary/totp) is a strong authentication choice for users who can download a special app like Authy or Google Authenticator on their mobile device or computer. These authenticator apps generate unique numeric tokens with a standardized [algorithm](https://tools.ietf.org/html/rfc6238) that uses the current time as an input. Some benefits of TOTP include:

* **More security**: Tokens automatically expire and there are no one-time passwords (OTPs) for fraudsters to intercept, making it more secure than SMS, email, or voice channels.
* **Works offline**: Generating and verifying a TOTP token does not require internet connectivity as long as a device's time is synced.
* **No PII required**: TOTP does not need a phone number to work, so no personally identifiable information (PII) is stored.

TOTP is a great choice for businesses looking for a more secure, private, and lower-cost user authentication option.

![Diagram showing OTP secret key shared between user's phone and application infrastructure generating passcode 829170.](https://docs-resources.prod.twilio.com/826615ca12cc06915549bfa92d3496bad0f4a65d070cb5e42564bbdd01d6754c.png)

## Start Building

* [Technical overview](/docs/verify/totp/technical-overview)
* [Quickstart](/docs/verify/quickstarts/totp)
* [Quick deploy a sample TOTP application](https://www.twilio.com/code-exchange/verify-totp)
* [How to build TOTP support with the Verify API and Google Authenticator](https://www.twilio.com/blog/totp-verify-api-authy-google-authenticator)

## FAQs

### How are users handled?

A user is represented as an `Entity` within Verify TOTP. We advise using an immutable user identifier such as a system UUID, GUID, or SID for the `identity` property of an `Entity` so that no PII is stored. See [Entity API](/docs/verify/api/entity) for more details.

You can fetch an `Entity` by its `identity` property, but the control and storage of the identity relation with the user must be managed on your end.

The [Factor API](/docs/verify/api/factor) also does not store any kind of user information or PII.

### How should a user with multiple factors on the same device be handled?

If a user has multiple TOTP factors on the same device, ensure that the `factorSid` of the intended factor is given when using the [Challenge API](/docs/verify/api/challenge) to create a Verification Attempt.

As a best practice, we advise only allowing one TOTP factor (seed) per user at a time. When a user requests to generate a new seed, the old one should be deleted.

### How do I change the Authy App logo for my Verify TOTP?

[See this support article](https://help.twilio.com/hc/en-us/articles/5078017808283-The-Authy-App-is-Showing-the-Wrong-Logo-for-my-Verify-TOTP) for more information on how to update the logo displayed in the Authy App for your TOTP.
