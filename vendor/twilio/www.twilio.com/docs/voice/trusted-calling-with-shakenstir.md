# Trusted Calling with SHAKEN/STIR

> \[!NOTE]
>
> This page contains general information on SHAKEN/STIR, along with some implementation details.
>
> If you're ready to enable SHAKEN/STIR on your account(s), go to the [SHAKEN/STIR Onboarding page](/docs/voice/trusted-calling-with-shakenstir/shakenstir-onboarding).

## SHAKEN/STIR Overview

### The Problem: Robocalls

Robocalls are calls that are created by an auto-dialer, and typically play pre-recorded messages. Fraudsters use robocalls in combination with spoofing (falsifying caller IDs) to acquire something of value from their victims. In 2020, there were 48.9 billion robocalls in the United States, leading to an erosion of trust in the telephone network and a decline in call answer rates from unidentified phone numbers.

### The Solution: SHAKEN/STIR

SHAKEN stands for **S**ignature-based **H**andling of **A**sserted Information using to**KEN**s. It is a specification designed by the Alliance for Telecommunications Industry Solutions (ATIS) to fight caller ID spoofing. STIR (**S**ecure **T**elephone **I**dentity **R**evisited) is a protocol developed by the Internet Engineering Task Force (IETF) to enable end-to-end call authentication, but the protocol is very broad and doesn't ensure that different providers will be able to verify each others' calls. SHAKEN is a set of implementation details that follows the STIR protocol, but streamlines specifications to increase the likelihood of carrier interoperability. This is why you will often see the technology referred to as "SHAKEN/STIR" or "STIR/SHAKEN".

SHAKEN/STIR uses encrypted digital signatures to share information about the caller to each provider along a call's path from caller to recipient, such as the caller's identity and whether the caller has the right to use the phone number they provided as the caller ID.

To learn more about the implementation of SHAKEN/STIR, read the following resources:

* [Everything You Need to Know About SHAKEN/STIR Right Now](https://www.twilio.com/en-us/blog/everything-you-need-to-know-about-shaken-stir-today) (Twilio Blog)
* [Combating Spoofed Robocalls with Caller ID Authentication](https://www.fcc.gov/call-authentication) (FCC)
* [TRACED Act Implementation](https://www.fcc.gov/TRACEDAct) (FCC)

Twilio, like all major carriers in the United States, has signing and verifying privileges. Keep reading to learn about the product changes you can expect with SHAKEN/STIR.

## Changes for Twilio Customers

> \[!NOTE]
>
> As of 06/2021, support for the SHAKEN/STIR call authentication framework is being deployed in the United States only.

* For **Programmable Voice** customers, a new parameter will be present in incoming webhooks and outgoing calls: `StirVerstat`.
* For **Elastic SIP Trunking** customers, there is a new header called `X-Twilio-VerStat`, and a new `Identity` header with the [SHAKEN PASSporT](https://transnexus.com/blog/2020/passports/).

To understand the possible values for the `StirVerstat` parameter/`X-Twilio-VerStat` header, you will first need to understand the three different **attestation levels**:

* `A` : the highest attestation given by the originating service provider to indicate that the caller is known and has the right to use the phone number as the caller ID
* `B` : the customer is known, it is unknown if they have the right to use the caller ID being used
* `C` : it doesn't meet the requirements of A or B including international calls.

The table below describes the possible values for the `StirVerstat` parameter/`X-Twilio-VerStat` header.

| StirVerstat parameter / X-Twilio-VerStat header value | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TN-Validation-Passed-A`                              | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `TN-Validation-Passed-B`                              | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `TN-Validation-Passed-C`                              | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `TN-Validation-Failed-A`                              | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `TN-Validation-Failed-B`                              | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `TN-Validation-Failed-C`                              | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `No-TN-Validation`                                    | Possible causes:<br /> <ul><li>A malformed [E.164](/docs/glossary/what-e164) phone number.</li><li>SHAKEN PASSporT format is invalid. It should consist of a header, payload, signature, and parameters.</li><li>SHAKEN PASSporT does not have required fields like `ppt` headers or `info` parameter.</li><li>SHAKEN PASSporT `orig` field doesn't match with actual `callerid` in the SIP messages (`P-Asserted-Identity`, `Remote-Party-Identity`, or `From` header).</li><li>SHAKEN PASSporT `dest` field doesn't match with the actual destination of the call in the SIP Request-URI.</li><li>SHAKEN PASSporT `iat` field is too old - more than 1 minutes from current timestamp or the SIP Date header value.</li></ul> |
| `TN-Validation-Failed`                                | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> No attestation level determined.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `NULL`                                                | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> No attestation level determined.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `TN-Validation-Passed-A-Diverted`                     | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the Diverting service provider from the Certificate Authority that signed the call.<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                                                                                                                |
| `TN-Validation-Passed-B-Diverted`                     | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the Diverting service provider from the Certificate Authority that signed the call.<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                                                                                                                |
| `TN-Validation-Passed-C-Diverted`                     | Twilio received the SIP INVITE, with a SHAKEN PASSporT, and was able to fetch the public certificate of the Diverting service provider from the Certificate Authority that signed the call.<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                                                                                                                |
| `TN-Validation-Failed-A-Diverted`                     | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the Diverting service provider from the Certificate Authority.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `TN-Validation-Failed-B-Diverted`                     | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the Diverting service provider from the Certificate Authority.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `TN-Validation-Failed-C-Diverted`                     | Twilio was unable to verify the contents of the SHAKEN PASSporT.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the Diverting service provider from the Certificate Authority.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `TN-Validation-Passed-A-Passthrough`                  | Twilio received the SIP INVITE for a Passport Passthrough call, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE .<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                          |
| `TN-Validation-Passed-B-Passthrough`                  | Twilio received the SIP INVITE for a Passport Passthrough call, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE .<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                          |
| `TN-Validation-Passed-C-Passthrough`                  | Twilio received the SIP INVITE for a Passport Passthrough call, with a SHAKEN PASSporT, and was able to fetch the public certificate of the originating service provider from the Certificate Authority that signed the call to verify that no one tampered with the SIP INVITE .<br /><br /> This verifies that no one tampered with the SIP INVITE during transit.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                          |
| `TN-Validation-Failed-A-Passthrough`                  | Twilio was unable to verify the contents of the SHAKEN PASSporT for the passthrough call.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `A`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `TN-Validation-Failed-B-Passthrough`                  | Twilio was unable to verify the contents of the SHAKEN PASSporT for the passthrough call.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `B`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `TN-Validation-Failed-C-Passthrough`                  | Twilio was unable to verify the contents of the SHAKEN PASSporT for the passthrough call.<br /><br /> This could mean tampering or that Twilio could not retrieve the public certificate of the originating service provider from the Certificate Authority.<br /><br /> Attestation level `C`                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### Incoming Calls

Twilio Programmable Voice and Elastic SIP Trunking now perform SHAKEN/STIR verification on incoming calls to your Twilio local phone numbers. It can be used to display a trust indicator or to make a routing decision, such as bypassing a voice captcha or IVR and directing the call to an end user.

A verified call that has been given the highest attestation under SHAKEN/STIR means that the carrier that originated the call both (1) knows the identity of the caller, and (2) knows the caller has the right to use the phone number as the caller ID.

Note: The `StirVerstat` parameter is only present in the incoming call webhook when the incoming call has SHAKEN PASSporT identity headers. The `X-Twilio-VerStat` header is only present in SIP INVITEs for incoming calls that have SHAKEN PASSporT identity headers.

### Outgoing Calls

When your application receives a request webhook that has a `StirVerstat` parameter, Twilio will implicitly pass the `StirVerstat` to the Client when you `<Dial><Client>`. The information in the `StirVerstat` parameter can be used to display a trust indicator to the recipient when an incoming call from the public telephone network has been verified under the SHAKEN/STIR framework.

#### Twilio JS and Mobile Client Information

* **The JavaScript Client** now has: `Connection.CallerInfo.isVerified`
* **The Android and iOS Mobile SDKs** now have the `CallerInfo` object and `TVOCallerInfo` class to represent information about the caller.

### Calls Status Callbacks

The Status Callback `StirStatus` optional parameter will inform you of the attestation Twilio gave your call to the public telephone network. If the call is forwarded (functionality coming soon), this will be attestation of the incoming call that was forwarded.

* [\<Dial>](/docs/voice/twiml#statuscallback-request-parameters)
* [Call Resource](/docs/voice/twiml#statuscallback-request-parameters)
* [Voice Webhooks](/docs/usage/webhooks/voice-webhooks)

### Call Forwarding

> \[!WARNING]
>
> Immutable caller ID call forwarding is available for calls created using the Programmable Voice Calls API and Participants API. `<Dial>` calls can use the original caller ID by default, and therefore, the `callToken` parameter isn't necessary. Elastic SIP Trunking support is coming soon.

You may encounter situations in which an incoming call to your Twilio phone number needs to be forwarded to another number. If you want to maintain the original caller's CallerID for the forwarded leg of the call and facilitate SHAKEN/STIR verification, you will need to pass a `CallToken` from the parent leg of the call to the forwarded leg.

#### Use a CallToken when forwarding a call

When one of your Twilio phone numbers receives an incoming call, Twilio sends a [webhook](/docs/usage/webhooks/voice-webhooks) to your application (this will only happen if you use `POST`). The request body of this webhook contains a `CallToken` property. The `CallToken` contains any SHAKEN/STIR and DIV (diversion) PASSporTs contained in the SIP headers of the incoming call.

To forward a call received by your Twilio number, you must:

1. Use the value of the `CallToken` from the inbound call's incoming webhook as the `CallToken` parameter when [creating a new Call Resource](/docs/voice/api/call-resource#create-a-call-resource) or [creating a new Conference Participant](/docs/voice/api/conference-participant-resource).
2. Use the original caller's phone number as the `From` parameter when creating the new Call Resource or Conference Participant.

**Example call forwarding scenario**

A caller (`+12222222222`) dials your Twilio phone number (`+15555555555`) and you need to forward the call to a new phone number (`+18888888888`).

Upon receiving the incoming call, your application will receive a webhook with the following request body:

```jsonc
// !mark(9,17,29)
{
  Called: '+15555555555',
  ToState: 'AL',
  CallerCountry: 'US',
  Direction: 'inbound',
  CallerState: 'PA',
  ToZip: '33333',
  CallSid: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  To: '+15555555555',
  CallerZip: '88888',
  ToCountry: 'US',
  StirVerstat: 'TN-Validation-Passed-A',
  CalledZip: '33333',
  ApiVersion: '2010-04-01',
  CalledCity: 'DOTHAN',
  CallStatus: 'ringing',
  From: '+12222222222',
  AccountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  CalledCountry: 'US',
  CallerCity: 'PHILADELPHIA',
  StirPassportToken: 'STIR_TOKEN_IN_JWT_FORM',
  ToCity: 'DOTHAN',
  FromCountry: 'US',
  Caller: '+12222222222',
  FromCity: 'PHILADELPHIA',
  CalledState: 'AL',
  FromZip: '88888',
  FromState: 'PA'
  CallToken: '%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D'
}
```

To forward the call, you will retrieve the `CallToken` value from the incoming webhook (above) and use this value as the `CallToken` parameter when you create a new Call Resource.

The code sample below shows how to do that with your chosen SDK, cURL, and the Twilio CLI. This code sample only shows how to use the API to create the outbound call leg through which attestation is passed. In order to connect the inbound and outbound calls so that the two parties can speak with each other, you will need to implement a call flow for both calls using Programmable Voice [Queues](/docs/voice/queue-calls) or [Conferences](/docs/voice/conference). Using the \<Dial> instruction is not possible for this call flow.

You use the original caller's number (`+12222222222`) as the `From` parameter.

Create a Call Resource with a CallToken Parameter

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    callToken:
      "%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D",
    from: "+12222222222",
    to: "+18888888888",
    url: "https://www.example.com",
  });

  console.log(call.sid);
}

createCall();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    to="+18888888888",
    from_="+12222222222",
    call_token="%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D",
    url="https://www.example.com",
)

print(call.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var call = await CallResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("+18888888888"),
            from: new Twilio.Types.PhoneNumber("+12222222222"),
            callToken: "%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D",
            url: new Uri("https://www.example.com"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+18888888888"),
                            new com.twilio.type.PhoneNumber("+12222222222"),
                            URI.create("https://www.example.com"))
                        .setCallToken("%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9."
                                      + "eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NT"
                                      + "U1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_"
                                      + "TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%"
                                      + "22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%"
                                      + "22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0"
                                      + "cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0."
                                      + "eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3ND"
                                      + "IzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ."
                                      + "ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-"
                                      + "siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate."
                                      + "pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D")
                        .create();

        System.out.println(call.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateCallParams{}
	params.SetTo("+18888888888")
	params.SetFrom("+12222222222")
	params.SetCallToken("%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D")
	params.SetUrl("https://www.example.com")

	resp, err := client.Api.CreateCall(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$call = $twilio->calls->create(
    "+18888888888", // To
    "+12222222222", // From
    [
        "callToken" =>
            "%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D",
        "url" => "https://www.example.com",
    ]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

call = @client
       .api
       .v2010
       .calls
       .create(
         to: '+18888888888',
         from: '+12222222222',
         call_token: '%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D',
         url: 'https://www.example.com'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --to +18888888888 \
   --from +12222222222 \
   --call-token %7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D \
   --url https://www.example.com
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "To=+18888888888" \
--data-urlencode "From=+12222222222" \
--data-urlencode "CallToken=%7B%20%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g%22%2C%0A%20%20%22identityHeaderTokens%22%3A%5B%0A%20%20%20%20%20%20%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg%3Binfo%3D%3Chttps%3A%2F%2Fexample.com%2FsomeCertificate.pem%3E%3Balg%3DES256%3Bppt%3Dshaken%22%0A%20%20%20%20%20%20%5D%0A%7D" \
--data-urlencode "Url=https://www.example.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+12222222222",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+18888888888",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

#### Attestation with call forwarding

If an incoming call doesn't have a SHAKEN PASSporT, Twilio will sign the call with its own SHAKEN PASSporT with Attestation C with DIV signing.

Twilio will use the `CallToken` in the outgoing leg to verify the CallerID. If the CallerID doesn't match the `CallToken`, Twilio will reject the call with an error.

The following conditions **must be met** for Twilio to forward the inbound SHAKEN PASSporT along with a DIV PASSporT for the outgoing (forwarded) call:

* The CallerID of the outgoing call matches the CallerID in the `CallToken` of the outgoing call
* The incoming call contains a SHAKEN PASSporT
* The outbound carrier endpoint supports SHAKEN and DIV PASSporTs

> \[!WARNING]
>
> Carrier support for DIV PASSPorTs is limited at this time.

#### Anatomy of a CallToken

The `CallToken` property in an incoming call webhook is a string containing a URL-encoded JSON object.

Once decoded, the `CallToken` looks like this:

```json
{

   "parentCallInfoToken": "eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FYWFhYLi4uLiIsImZyb20iOiIrMTIyMjIyMjIyMjIiLCJ0byI6IisxNTU1NTU1NTU1NSIsImlhdCI6IjE2MzU5NTc0MjMifQ.jVOxmCbSxxKg2fuzvDT_-PTStRRw_TrWgdh2QaZNzHQwvgwO6Qk_FRPFPYguJQn19x0yZqltPQfHwql4FJt_7g",
   "identityHeaderTokens": [
       "eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9zb21lQ2VydGlmaWNhdGUucGVtIn0.eyJhdHRlc3QiOiJBIiwiZGVzdCI6eyJ0biI6WyIxNTU1NTU1NTU1NSJdfSwiaWF0IjoxNjM1OTU3NDIzLCJvcmlnIjp7InRuIjoiMTIyMjIyMjIyMjIifSwib3JpZ2lkIjoic29tZS1HVUlELWhlcmUifQ.ygPO2sImJR9MSqoRVD0CvnB2euv3RUYdupNEFS3wpgecs-yi8SU8FtYkkDypn7DC-siwdPY6vvVIx39y5Nb1sg;info=<https://example.com/someCertificate.pem>;alg=ES256;ppt=\"shaken\""
   ]

}
```

**parentCallInfoToken property of a CallToken**

The `parentCallInfoToken` is a [JSON Web Token (JWT)](https://jwt.io/). When decoded, the header and payload of the JWT will have the following shape:

```json
// Header

   {
     "alg": "ES256"
   }

// Payload

   {
     "callSid": "CAXXXX....",
     "from": "+12222222222",
     "to": "+15555555555",
     "iat": "1635957423"
   }

```

* The `callSid` value is the Call SID for the parent incoming Call Resource.
* The `from` value is the caller's phone number
* The `to` value is your Twilio number that received the call.
* The `iat` is a claim that specifies the timestamp for when the parent call's PASSporT was created, which is necessary for further SHAKEN/STIR validation.

**identityHeaderTokens property of a CallToken**

To verify forwarded calls, terminating service providers need the original SHAKEN PASSporT and the DIV PASSporTs for each diversion. The `identityHeaderTokens` property contains the information needed for Twilio to add a DIV PASSporT to the outgoing call if necessary (See [Attestation section above](/docs/voice/trusted-calling-with-shakenstir#attestation-with-call-forwarding) for more information).

The `identityHeaderTokens` value is an array of all of the SHAKEN and DIV PASSporTs that were included as identity headers in the inbound leg of the call. If the call is signed, the array will contain one SHAKEN PASSporT, along with any DIV PASSporTs (if the call was diverted/forwarded) present on the inbound call.

Below is an example of the decoded JWT from the `identityHeaderTokens` array. This represents the original SHAKEN PASSporT from the incoming call.

```json
// Headers

{
   "alg": "ES256",
   "ppt": "shaken",
   "typ": "passport",
   "x5u": "https://example.com/someCertificate.pem"
 }

// Payload

{
   "attest": "A",
   "dest": {
     "tn": [
       "15555555555"
     ]
   },
   "iat": 1635957423,
   "orig": {
     "tn": "12222222222"
   },
   "origid": "some-GUID-here"
 }
```

Since there is only one string in the `CallToken`'s `identityHeaderTokens` array, this means the call was not diverted before it reached your Twilio number. If the call was diverted before it reached your Twilio number, you would see a DIV PASSporT for each diversion in the `identityHeaderTokens` array, as well.
