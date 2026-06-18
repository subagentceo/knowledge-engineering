# Global Safe List

> \[!NOTE]
>
> This feature is currently in the GA maturity stage.
>
> Customers using the below products will now have access to the Global Safe List API.
>
> 1. Verify customers who have enabled [Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard)
> 2. Verify customers who have enabled [Geo Permissions](/docs/verify/preventing-toll-fraud/verify-geo-permissions)
> 3. Programmable Messaging customers who have enabled [SMS Pumping Protection](/docs/messaging/features/sms-pumping-protection-programmable-messaging) and are seeing 30450 error codes
> 4. Programmable Messaging customers who are seeing 30453 error codes
>
> **Note** : Global Safe List API supports only the **SMS and Verify CALL** channels.

Global Safe List API allows you to maintain a list of phone numbers and phone number 1k prefixes that will never be blocked by [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard), [Verify Geo Permissions](/docs/verify/preventing-toll-fraud/verify-geo-permissions), [Programmable Messaging SMS Pumping Protection](/docs/messaging/features/sms-pumping-protection-programmable-messaging) or any other internal fraud & risk check solution.

The Global Safe List API supports 1k prefix safelisting for phone numbers with a total length at-least 10 characters, including the `+` sign and country code. For instance, if a phone number is `+18001234567`, its 1k prefix would be represented as `+18001234xxx`, where `xxx` replaces the last three digits.

While we are always adapting our fraud detection systems to keep false positives extremely low, Global Safe List API adds another layer of protection by letting you mark legitimate phone numbers and phone number 1k prefixes as safe to ensure they are never erroneously blocked.

This API contains three endpoints:

1. [Add a Phone Number or Prefix](#add-a-phone-number-or-prefix)
2. [Check a Phone Number or Prefix](#check-a-phone-number-or-prefix)
3. [Remove a Phone Number or Prefix](#remove-a-phone-number-or-prefix)

Alternatively, you can add a previously blocked phone number to the Global Safe List via Twilio Console on the [Verify Logs Blocked Verifications tab](https://console.twilio.com/us1/monitor/logs/verify-fraud-logs). See [Viewing Logs With Twilio Console](/docs/verify/viewing-logs-with-twilio-console) for more information.

## Rate limits

Global Safe List API provides a built-in rate limit of 500 requests per minute. If you reach this limit, you will start receiving HTTP 429 "Too Many Requests" responses.

## Timeouts

Global Safe List API has a timeout value of 15 seconds. However, its 99th percentile is within 1 second.

## Global Safe List Response Properties

These properties are returned in the JSON response output.

<OperationTable type="properties" data={{"type":"object","refName":"accounts.v1.safelist","modelName":"accounts_v1_safelist","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the SafeList resource."},"phone_number":{"type":"string","nullable":true,"description":"The phone number or phone number 1k prefix in SafeList.","x-twilio":{"pii":{"handling":"standard","deleteSla":0}}}}}} />

## Add a Phone Number or Prefix

`POST https://accounts.twilio.com/v1/SafeList/Numbers`

Adds a single phone number or a phone number 1k prefix to the Safe List based on the given `phone_number` parameter.

The Phone number 1k prefix format should follow the regex pattern : `^\+[1-9]\d{%d,11}xxx$`. For example : If a phone number is `+18001234567`, the 1k prefix is `+18001234xxx`. The 1k prefix of a phone number of length at-least 10 is allowed.

Phone numbers must be in [E.164 format](/docs/glossary/what-e164).

If attempting to add a number or phone number 1k prefix that already exists in the Safe List, HTTP 400 with [Error Code 60411](/docs/api/errors/60411) will be returned. Phone numbers or phone number 1k prefixes will remain in the Safe List indefinitely until they are explicitly removed.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateSafelistRequest","required":["PhoneNumber"],"properties":{"PhoneNumber":{"type":"string","description":"The phone number or phone number 1k prefix to be added in SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":0}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"PhoneNumber\": \"+18001234567\"\n}","meta":"","code":"{\n  \"PhoneNumber\": \"+18001234567\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+18001234567\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Add a Phone Number to the Safe List

```bash
curl -X POST "https://accounts.twilio.com/v1/SafeList/Numbers" \
--data-urlencode "PhoneNumber=+18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234567"
}
```

Add a Prefix to the Safe List

```bash
curl -X POST "https://accounts.twilio.com/v1/SafeList/Numbers" \
--data-urlencode "PhoneNumber=+18001234xxx" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234xxx"
}
```

## Check a Phone Number or Prefix

`GET https://accounts.twilio.com/v1/SafeList/Numbers`

Checks if a single phone number or a phone number 1k prefix is in the Safe List based on the given `phone_number` parameter. Phone numbers must be in [E.164 format](/docs/glossary/what-e164).

If the given phone number or phone number 1k prefix is not in the Safe List, HTTP 404 will be returned.

### Query parameters

```json
[{"name":"PhoneNumber","in":"query","description":"The phone number or phone number 1k prefix to be fetched from SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":0}},"examples":{"fetch":{"value":"+18001234567"}}}]
```

Check if a Phone Number is in the Safe List

```bash
curl -X GET "https://accounts.twilio.com/v1/SafeList/Numbers?PhoneNumber=%2B18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234567"
}
```

Check if a Prefix is in the Safe List

```bash
curl -X GET "https://accounts.twilio.com/v1/SafeList/Numbers?PhoneNumber=%2B18001234xxx" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234xxx"
}
```

## Remove a Phone Number or Prefix

`DELETE https://accounts.twilio.com/v1/SafeList/Numbers`

Removes a phone number or a phone number 1k prefix from the Safe List. Phone number must be in [E.164 format](/docs/glossary/what-e164).

If the given phone number or phone number 1k prefix is not in the Safe List, HTTP 404 will be returned.

### Query parameters

```json
[{"name":"PhoneNumber","in":"query","description":"The phone number or phone number 1k prefix to be removed from SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":0}},"examples":{"delete":{"value":"+18001234567"}}}]
```

Remove a Phone Number from the Safe List

```bash
curl -X DELETE "https://accounts.twilio.com/v1/SafeList/Numbers?PhoneNumber=%2B18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Remove a Prefix from the Safe List

```bash
curl -X DELETE "https://accounts.twilio.com/v1/SafeList/Numbers?PhoneNumber=%2B18001234xxx" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
