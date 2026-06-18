# Set a phone number's inbound processing Region using the REST API

This guide will illustrate how to use Twilio's REST API to control which [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) handles incoming calls to your phone numbers.

To get the most out of this guide, please ensure you are familiar with the concepts described in the [Inbound Processing Region](/docs/global-infrastructure/inbound-call-processing) overview.

The examples in this guide will target the Ireland (IE1) Region. To see the available Regions, visit the [Region and Product Availability](/docs/global-infrastructure/regional-product-and-feature-availability) reference.

> \[!NOTE]
>
> V3 of the Inbound Processing Region API adds support for configuring the messaging region for a phone number to Ireland (IE1) for [SMS Data Residency in the EU](/docs/global-infrastructure/messaging-api-with-twilio-regions).
>
> Check out the [V3 API documentation](#v3-region-configuration-api) for more information.

## Review your phone number's webhook configuration in the target Region

Your phone number's webhook configuration is Region-specific and may vary between different Regions. Before making any changes to your phone number's call routing, it's a good idea to double-check the number's configuration in the specific Region that you plan to set the number's routing to.

To manage a phone number's configuration via Twilio Console, follow the instructions under the phone number section of [our guide to managing Region-specific resources in the Console](/docs/global-infrastructure/managing-regional-resources-in-console).

To inspect a phone number's configuration via the API, make a request to fetch the [IncomingPhoneNumber resource](/docs/phone-numbers/api/incomingphonenumber-resource) in the target Region. Make sure that the request's FQDN targets the desired Region, and remember that the default FQDN of api.twilio.com defaults to the US1 Region.

For example, to check a phone number's configuration in the IE1 Region, you might make the following request using cURL or another HTTP client:

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/IncomingPhoneNumbers/$PHONE_NUMBER.json
```

Alternatively, you can issue these requests using a Twilio server-side SDK or the Twilio CLI. See the guide to [using the REST API with Twilio Regions](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) for more information.

If the phone number's configuration in the target Region is not correct, use the REST API or the Console to adjust the number's configuration in the target Region before proceeding.

## Check which Region your phone number is currently routed to

To check the Region that your number is routed to, make a `GET` request to the Inbound Processing Region API.

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://routes.dublin.ie1.twilio.com/v2/PhoneNumbers/+16505551212
```

Look for the `voice_region` key in the response. This will indicate which Region your number's inbound voice calls will be routed to for processing.

> \[!WARNING]
>
> If the response to this request is a 404, it indicates that this number does not yet have an explicitly set routing configuration, and will route inbound calls to the default United States (US1) Region.
>
> This occurs only when a phone number has been provisioned via the `/IncomingPhoneNumbers` REST API resource. Phone numbers provisioned via the Twilio Console will automatically be configured with an explicit routing configuration.

## Set which Region your phone number is currently routed to

To set the Region that your number is routed to, make a `POST` request to the Inbound Processing Region API.

In this example, the request sets the Region for inbound calls to IE1:

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://routes.dublin.ie1.twilio.com/v2/PhoneNumbers/+16505551212 \
  -d VoiceRegion=us1
```

> \[!CAUTION]
>
> Warning: changing a phone number's incoming call routing Region can lead to call handling errors in certain cases. Be sure to test call routing in the target Region in a pre-production environment before changing routing in production.

## Verify the incoming call routing Region

To demonstrate that calls to your phone number are being handled in the appropriate Region after a routing change, perform the following steps:

1. Place a call to your phone number from any phone.
2. Visit the phone number's Call Logs in the target Region.
3. Verify that you find a new Call Log that corresponds with your sample call from step 1.
4. Visit the phone number's Call Logs in a different, non-Active Region.
5. Verify that you do not find a Call Log that corresponds with your sample call.

## Routing calls to an Elastic SIP Trunk or Twilio SIP Domain

Twilio routes inbound calls to your Twilio-powered [SIP Trunks](/docs/sip-trunking) and [SIP Domains](/docs/voice/sip/api/sip-domain-resource) using the same system as for phone numbers.

To manage routing for these resources types using the Inbound Processing Region API, adjust the request URL paths illustrated above as follows:

1. Replace the word `PhoneNumbers` with `Trunk` or `SipDomain`, depending on which resource type you are managing.
2. Replace the phone number in the path with the Trunk or Domain's full URI.

> \[!WARNING]
>
> It may take up to five minutes for a routing change to take effect.

## V3 Region Configuration API

V3 includes support for configuring the messaging region on a phone numbers to Ireland (IE1) for EU SMS data residency. See the [SMS Data Residency Guide](/docs/global-infrastructure/messaging-api-with-twilio-regions) to learn more about this feature.

> \[!NOTE]
>
> The V3 API is only available in the United States (US1) region.

> \[!CAUTION]
>
> Setting the messagingRegion on a phone number controls where **both outbound and inbound SMS messages can be processed** for that number.
>
> Phone numbers can only send and receive SMS messages in the region they are configured for. Messages attempted for the phone number in a different region will fail.

### V3 Check Current Configuration

To check the current configuration for your phone number, make a `GET` request to the V3 API:

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://routes.twilio.com/v3/PhoneNumbers/+33123XXXXXX
```

**Response example:**

```json
{
  "phone_number": "+33123XXXXXX",
  "url": "https://routes.twilio.com/v3/PhoneNumbers/+33123XXXXXX",
  "voice_region": "ie1",
  "messaging_region": "us1",
  "date_created": "2026-03-15T10:00:00Z",
  "date_updated": "2026-03-18T14:30:00Z"
}
```

### V3 Set Configuration

To configure the messaging region for your phone number, make a `POST` request with the `messagingRegion` parameter.

The messaging and voice regions can be set independently, so you can choose to only update one at a time. Twilio recommends keeping voice and messaging regions aligned to ensure consistent behavior.

> \[!NOTE]
>
> Phone numbers that are currently part of a messaging service should be removed from the service before updating the messaging region.

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://routes.twilio.com/v3/PhoneNumbers/+33123XXXXXX \
  --data-urlencode messagingRegion=ie1 \
  --data-urlencode voiceRegion=ie1
```

**Response example:**

```json
{
  "phone_number": "+33123XXXXX",
  "url": "https://routes.twilio.com/v3/PhoneNumbers/+33123XXXXXX",
  "voice_region": "ie1",
  "messaging_region": "ie1",
  "date_created": "2026-03-15T10:00:00Z",
  "date_updated": "2026-03-18T14:30:00Z"
}
```
