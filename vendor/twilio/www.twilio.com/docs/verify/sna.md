# Verify Silent Network Auth Overview

> \[!NOTE]
>
> Verify Silent Network Auth (SNA) is currently in the beta release stage, [talk to an expert](https://interactive.twilio.com/silent-network-auth-sales-1?_ga=2.37177440.1944479737.1659912854-303184958.1630969149) to request access to this feature.

## Test SNA Today

[Get Started](/docs/verify/verify-sna-live-test-number)

Skip the 2-4 week wait for carrier approvals and get directly to testing SNA with your own mobile number using the new [Live Test Number](/docs/verify/verify-sna-live-test-number) feature.

## What is Verify Silent Network Auth (SNA)?

Silent Network Auth (SNA) is the next generation SIM-based authentication method that confirms phone number possession in real-time without compromising security. Authenticate real, unique end-users without impacting the customer experience. Read [What is Silent Network Authentication?](https://www.twilio.com/blog/silent-network-authentication-sna-overview) on the Twilio Blog for more information on how it works under the hood.

SNA is now available natively through the Verify API.

## Start building

1. [Request access to the API and Live Test Number feature](/docs/verify/verify-sna-live-test-number).
2. Complete the [carrier registration form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP) to start the 2-4 week approval process. For detailed information on the carrier approval process, please visit the [API Onboarding Guide](https://help.twilio.com/articles/14968525856923).
3. Plan your implementation starting with the [Technical Overview](/docs/verify/sna/tech-overview) and [Verifications API Reference documentation](/docs/verify/api/verification#start-new-verification-with-silent-network-auth).

## Pricing

* Verify Silent Network Auth is priced per country. The pricing consists of a Verify fee per successful verification and an SNA channel fee that is priced per country. [Contact sales for the SNA country price list.](https://www.twilio.com/en-us/help/sales)
* Examples Verify SNA billing in the US:

  When the verification is successful via SNA, your invoice will list two billable items (BI) for the transaction:

  * Verify - Silent Network Auth - United States
  * Verify - SMS/ Voice (This in the standard Verify Software BI)

  If the SNA flow completes with the carrier, but the verification fails because the phone number detected by the carrier does not match the user's phone number, and you receive an error code of [60500](/docs/api/errors/60500) (SNA Phone Number Mismatch) or [60540](/docs/api/errors/60540) (SNA Carrier Identified Invalid Phone Number), you will be billed for one BI:

  * Verify - Silent Network Auth - United States

If we are not able to complete the SNA flow with the carrier, you will not be billed

## FAQ

### What are the best practices for error handling?

Always check the error code on the API response at each step. SNA errors [begin with 605xx](/docs/api/errors). In general, you can failover to SMS OTP for all error codes except [60540](/docs/api/errors/60540). Comprehensive [best practices for error handling can be found in the documentation.](/docs/verify/best-practices-for-verify-sna-error-handling)

### Where does SNA work?

Twilio Verify SNA is live in nine countries, including the US, Canada, UK, Germany, France, Spain, and more. [Reach out](https://www.twilio.com/en-us/help/sales) to learn more about our coverage.

### How long does SNA take?

**2-4 seconds.**

The main source of latency for SNA is invoking the `sna.url` on the device. This step usually takes around **2-3 seconds** but may take up to 4 seconds. This is where Twilio is making a request directly with the carrier to confirm the data session is live.

You may receive [Error 60519](/docs/api/errors/60519) if you try to check the verification status before the carrier verification is complete.

The additional API requests to obtain the `sna.url` and check the verification each take less than 100ms.

### How much data is sent with the sna.url invocation?

40 bytes.

### What is the TTL of the sna.url?

10 minutes.

### What triggers a billing event for SNA?

A billing event is triggered after you have invoked the `sna.url` and the verification is approved or you receive an error code of [60500](/docs/api/errors/60500) (SNA Phone Number Mismatch) or [60540](/docs/api/errors/60540) (SNA Carrier Identified Invalid Phone Number). Other errors will not trigger a billing event. See [Pricing](/docs/verify/sna#pricing) for pricing structure details.

### Does SNA work with spoofed phone numbers?

No. The request will fail with the service provider when they perform the underlying GSM authentication.

### Does SNA work if the user is roaming?

It depends on the user's carrier and where they are roaming.

### Does SNA work with Google Fi?

Google Fi uses the T-mobile network and the US Cellular network. When the device is on the T-mobile network SNA will work. When on the US cellular network SNA will fail as US cellular does not support the SNA service.

### Does SNA work for a phone number that is setup with call forwarding?

Yes. SNA uses the data session, whereas call forwarding is only for voice and text. If an SNA transaction is initiated on a device which has call forwarding enabled, the data session on the device will be used and the carrier will detect the number on that device. SNA does not detect if the phone number is enabled for call forwarding.

### Does SNA work with eSIM?

Yes! The SIM function doesn't change whether a physical or eSIM is used.

### Is SNA susceptible to PIN-jacking?

No. Once you've implemented SNA for authenticating user logins, consider making this information visible to your customer support team. This way, they do not erroneously issue credits to a user who claimed that their account was taken over due to "Authentication PIN stolen", since SNA does not provide a PIN.

### Should I only request SNA verification for mobile numbers that match specific carriers or MNC-MCCs in a given country?

No. In a given country, carriers and their associated MNC-MCCs that support SNA can change over time. Therefore, we recommend requesting SNA verification for all mobile numbers. If the mobile number belongs to an unsupported carrier, you'll get a non-billable error (like [Error 60008](/docs/api/errors/60008)) when you make the Verification call, and you can fall back to a different verification channel at that point.

### How does SNA encryption work to keep phone numbers secure?

* Access to your Twilio account is protected via IP whitelisting.
* All interactions between Twilio and your server application or the carrier APIs are over HTTPS TLS 1.2+.
* All interactions between the end user's phone and Twilio or the carrier do not include the phone number.
* While different carriers use different methods to achieve SNA, including the use of encrypted tokens, in all cases the phone number is never inserted in plain text and the token is always dynamic per-session.
* Our database only stores encrypted phone numbers using AES 256 encryption and has strict access requirements and limitations.
