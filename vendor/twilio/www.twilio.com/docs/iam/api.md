# Our API: the basics

The Twilio REST API allows you to query metadata about your [account](/docs/iam/api/account), [phone numbers](/docs/phone-numbers/api/availablephonenumber-resource), calls, text messages, and recordings. You can also do some fancy things like [make outbound phone calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls) and [send text messages](/docs/messaging).

## Base URL \[#base-url]

All URLs referenced in the documentation have the following base:

```bash
https://api.twilio.com/2010-04-01
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

## Authentication \[#authentication]

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
     -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Subresources

Twilio Accounts have the following subresources. Click on a link to read the API documentation for accessing or modifying each resource:

## Phone Numbers

* [Search for Phone Numbers](/docs/phone-numbers/api/availablephonenumber-resource)
* [Purchase Phone Numbers](/docs/phone-numbers/api/incomingphonenumber-resource)
* [Update Phone Number Properties](/docs/phone-numbers/api/incomingphonenumber-resource)
* [Addresses](/docs/usage/api/address)

## Usage

* [View Usage Data for an Account](/docs/usage/api/usage-record)
* [Set Triggers for Usage Thresholds](/docs/usage/api/usage-trigger)

## Accounts

* [Accounts](/docs/iam/api/account)
* [Subaccounts](/docs/iam/api/subaccounts)

## Applications

* [Applications](/docs/usage/api/applications)
* [Connect Apps](/docs/iam/connect-apps/api)
* [Authorized Connect Apps](/docs/iam/authorized-connect-apps/api)

## Make calls with Twilio

Twilio's [Voice API](https://www.twilio.com/en-us/voice) enables you to make, retrieve, control and monitor calls. Using this REST API, you can [make outbound phone calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls), [modify calls in progress](/docs/voice/tutorials/how-to-modify-calls-in-progress), and [query metadata](/docs/voice/tutorials/how-to-retrieve-call-logs) about calls. See the [Voice API Documentation](/docs/voice/api) for guides, REST resources, and [troubleshooting tips](/docs/voice/troubleshooting).

## Connect with SIP

Programmable Voice SIP lets you route your voice calls with global reach to any landline phone, mobile phone, browser, mobile app, or any other SIP endpoint. Check out Twilio's [SIP Resources for Voice](/docs/voice/api/sip-interface) including [SIP Domains](/docs/voice/sip/api/sip-domain-resource), [IP Access Control Lists](/docs/voice/sip/api/sip-ipaccesscontrollist-resource), and [Credential Lists](/docs/voice/sip/api/sip-credentiallist-resource).

## Send messages with Twilio

With Twilio's Messaging API, you can send and receive [SMS](/docs/glossary/what-is-an-sms-short-message-service) and [MMS](/docs/glossary/what-is-mms) messages as well as query meta-data about text messages such as [delivery status](/docs/messaging/api/message-resource), [associated media](/docs/messaging/api/media-resource), and leverage tools like [Messaging Services](/docs/messaging/services) to manage your messages globally at scale. Check out our [Messaging API Documentation](/docs/messaging) for guides, REST resources, and [debugging tips](/docs/messaging/guides/debugging-tools).
