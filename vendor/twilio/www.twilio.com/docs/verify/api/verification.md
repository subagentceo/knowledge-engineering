# Verifications

The Twilio Verify REST API verifies that a user has a claimed device, phone number, or email address in their possession. You can start a new Verification for a user and check that the Verification was successful.

## Prerequisites

Before you begin, complete the following:

1. [Create a Verification Service](/docs/verify/api/service).
2. If you're using a Twilio Trial Account, you need to [verify any non-Twilio phone numbers](/docs/usage/trials#verified-recipients) you want to send SMS, Voice, or WhatsApp OTP messages. Trial accounts expire after 30 days.

## Verification Response Properties

These fields are returned in the output JSON response. The type `SID<VE>` is a unique ID starting with the letters VE.

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.service.verification","modelName":"verify_v2_service_verification","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VE[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Verification resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Verification resource."},"to":{"type":"string","nullable":true,"description":"The phone number or [email](https://www.twilio.com/docs/verify/email) being verified. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"channel":{"type":"string","enum":["sms","call","email","whatsapp","sna"],"description":"The verification method used. One of: [`email`](https://www.twilio.com/docs/verify/email), `sms`, `whatsapp`, `call`, `sna`, or `rcs`.","refName":"verification_enum_channel","modelName":"verification_enum_channel"},"status":{"type":"string","nullable":true,"description":"The status of the verification. Can be: `pending`, `approved`, `canceled`, `max_attempts_reached`, `deleted`, `failed` or `expired`."},"valid":{"type":"boolean","nullable":true,"description":"Use \"status\" instead. Legacy property indicating whether the verification was successful."},"lookup":{"nullable":true,"description":"Information about the phone number being verified."},"amount":{"type":"string","nullable":true,"description":"The amount of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"payee":{"type":"string","nullable":true,"description":"The payee of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"send_code_attempts":{"type":"array","nullable":true,"description":"An array of verification attempt objects containing the channel attempted and the channel-specific transaction SID."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"sna":{"nullable":true,"description":"The set of fields used for a silent network auth (`sna`) verification. Contains a single field with the URL to be invoked to verify the phone number."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Verification resource."}}}} />

## Start New Verification

`POST https://verify.twilio.com/v2/Services/{ServiceSid}/Verifications`

To verify a user's phone number or email, start by requesting to send a verification code to their device, or use the Silent Network Auth channel to perform the verification without sending a code.

These are the available input parameters for starting a verification. The type `SID<VE>` is a unique ID starting with the letters VE.

Phone numbers must be in [E.164 format](/docs/glossary/what-e164). Learn more about how to turn [phone number input into E.164 format](https://www.twilio.com/blog/international-phone-number-input-html-javascript).

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the verification [Service](https://www.twilio.com/docs/verify/api/service) to create the resource under.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateVerificationRequest","required":["To","Channel"],"properties":{"To":{"type":"string","description":"The phone number or [email](https://www.twilio.com/docs/verify/email) to verify. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Channel":{"type":"string","description":"The verification method to use. One of: [`email`](https://www.twilio.com/docs/verify/email), `sms`, `whatsapp`, `call`, `sna` or `auto`."},"CustomFriendlyName":{"type":"string","description":"A custom user defined friendly name that overwrites the existing one in the verification message"},"CustomMessage":{"type":"string","description":"The text of a custom message to use for the verification [DEPRECATED].","deprecated":true},"SendDigits":{"type":"string","description":"The digits to send after a phone call is answered, for example, to dial an extension. For more information, see the Programmable Voice documentation of [sendDigits](https://www.twilio.com/docs/voice/twiml/number#attributes-sendDigits)."},"Locale":{"type":"string","description":"Locale will automatically resolve based on phone number country code for SMS, WhatsApp, and call channel verifications. It will fallback to English or the template’s default translation if the selected translation is not available. This parameter will override the automatic locale resolution. [See supported languages and more information here](https://www.twilio.com/docs/verify/supported-languages)."},"CustomCode":{"type":"string","description":"A pre-generated code to use for verification. The code can be between 4 and 10 characters, inclusive."},"Amount":{"type":"string","description":"The amount of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"Payee":{"type":"string","description":"The payee of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"RateLimits":{"description":"The custom key-value pairs of Programmable Rate Limits. Keys correspond to `unique_name` fields defined when [creating your Rate Limit](https://www.twilio.com/docs/verify/api/service-rate-limits). Associated value pairs represent values in the request that you are rate limiting on. You may include multiple Rate Limit values in each request."},"ChannelConfiguration":{"description":"[`email`](https://www.twilio.com/docs/verify/email) channel configuration in json format. The fields 'from' and 'from_name' are optional but if included the 'from' field must have a valid email address."},"AppHash":{"type":"string","description":"Your [App Hash](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string) to be appended at the end of your verification SMS body. Applies only to SMS. Example SMS body: `<#> Your AppName verification code is: 1234 He42w354ol9`."},"TemplateSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HJ[0-9a-fA-F]{32}$","description":"The message [template](https://www.twilio.com/docs/verify/api/templates). If provided, will override the default template for the Service. SMS and Voice channels only."},"TemplateCustomSubstitutions":{"type":"string","description":"A stringified JSON object in which the keys are the template's special variables and the values are the variables substitutions."},"DeviceIp":{"type":"string","description":"Strongly encouraged if using the auto channel. The IP address of the client's device. If provided, it has to be a valid IPv4 or IPv6 address."},"EnableSnaClientToken":{"type":"boolean","description":"An optional Boolean value to indicate the requirement of sna client token in the SNA URL invocation response for added security. This token must match in the Verification Check request to confirm phone number verification."},"RiskCheck":{"type":"string","enum":["enable","disable"],"description":"Risk_check overrides Fraud Prevention measures like Fraud Guard, Geo Permissions etc per verification attempt basis, allowing Verify to block traffic considered fraudulent if enabled or bypass active protections if disabled. Can be: `enable`(default) or `disable`. For SMS channel only.","refName":"verification_enum_risk_check","modelName":"verification_enum_risk_check"},"Tags":{"type":"string","description":"A string containing a JSON map of key value pairs of tags to be recorded as metadata for the message. The tags will also be included as part of the verification and message status event type payloads. The object may contain up to 10 tags. Keys and values can each be up to 128 characters in length. **This value should not contain PII.**"}}},"examples":{"createVerification":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomFriendlyName\": \"custom_friendly_name\",\n  \"CustomMessage\": \"custom_message\",\n  \"SendDigits\": \"ww1\",\n  \"Locale\": \"en\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\",\n  \"AppHash\": \"AAAAAAAAAAA\",\n  \"TemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TemplateCustomSubstitutions\": \"{\\\"AppName\\\": \\\"MyApp\\\", \\\"Contact\\\":\\\"12345689\\\"}\",\n  \"RiskCheck\": \"enable\",\n  \"Tags\": \"{\\\"tenant_id\\\": \\\"12345\\\"}\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomFriendlyName\": \"custom_friendly_name\",\n  \"CustomMessage\": \"custom_message\",\n  \"SendDigits\": \"ww1\",\n  \"Locale\": \"en\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\",\n  \"AppHash\": \"AAAAAAAAAAA\",\n  \"TemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TemplateCustomSubstitutions\": \"{\\\"AppName\\\": \\\"MyApp\\\", \\\"Contact\\\":\\\"12345689\\\"}\",\n  \"RiskCheck\": \"enable\",\n  \"Tags\": \"{\\\"tenant_id\\\": \\\"12345\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"sms\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomFriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomMessage\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_message\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SendDigits\"","#7EE787"],[":","#C9D1D9"]," ",["\"ww1\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Locale\"","#7EE787"],[":","#C9D1D9"]," ",["\"en\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Amount\"","#7EE787"],[":","#C9D1D9"]," ",["\"€39.99\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Payee\"","#7EE787"],[":","#C9D1D9"]," ",["\"Acme Inc.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AppHash\"","#7EE787"],[":","#C9D1D9"]," ",["\"AAAAAAAAAAA\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TemplateSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TemplateCustomSubstitutions\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["AppName","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["MyApp","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"]," ",["\\\"","#79C0FF"],["Contact","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["12345689","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RiskCheck\"","#7EE787"],[":","#C9D1D9"]," ",["\"enable\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Tags\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["tenant_id","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["12345","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationWhatsapp":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"whatsapp\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomFriendlyName\": \"custom_friendly_name\",\n  \"Locale\": \"en\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"whatsapp\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomFriendlyName\": \"custom_friendly_name\",\n  \"Locale\": \"en\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"whatsapp\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomFriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Locale\"","#7EE787"],[":","#C9D1D9"]," ",["\"en\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationEmail":{"value":{"lang":"json","value":"{\n  \"To\": \"mail@email.com\",\n  \"Channel\": \"email\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomMessage\": \"custom_message\",\n  \"Locale\": \"en\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\",\n  \"ChannelConfiguration\": \"{\\\"from\\\": \\\"foo@bar.com\\\", \\\"from_name\\\": \\\"Bar Inc.\\\", \\\"substitutions\\\": { \\\"username\\\": \\\"ms. baz\\\" }, \\\"template_id\\\": \\\"Dxxxxxxxxxx\\\"}\"\n}","meta":"","code":"{\n  \"To\": \"mail@email.com\",\n  \"Channel\": \"email\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomMessage\": \"custom_message\",\n  \"Locale\": \"en\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\",\n  \"ChannelConfiguration\": \"{\\\"from\\\": \\\"foo@bar.com\\\", \\\"from_name\\\": \\\"Bar Inc.\\\", \\\"substitutions\\\": { \\\"username\\\": \\\"ms. baz\\\" }, \\\"template_id\\\": \\\"Dxxxxxxxxxx\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"mail@email.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"email\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomMessage\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_message\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Locale\"","#7EE787"],[":","#C9D1D9"]," ",["\"en\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Amount\"","#7EE787"],[":","#C9D1D9"]," ",["\"€39.99\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Payee\"","#7EE787"],[":","#C9D1D9"]," ",["\"Acme Inc.\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChannelConfiguration\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["from","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["foo@bar.com","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"]," ",["\\\"","#79C0FF"],["from_name","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Bar Inc.","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"]," ",["\\\"","#79C0FF"],["substitutions","#A5D6FF"],["\\\"","#79C0FF"],[": {","#A5D6FF"]," ",["\\\"","#79C0FF"],["username","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["ms. baz","#A5D6FF"],["\\\"","#79C0FF"]," ",["},","#A5D6FF"]," ",["\\\"","#79C0FF"],["template_id","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Dxxxxxxxxxx","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationWithRateLimits":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomMessage\": \"custom_message\",\n  \"SendDigits\": \"ww1\",\n  \"Locale\": \"en\",\n  \"RateLimits\": \"{\\\"my_rate_limit_key\\\": \\\"abc\\\"}\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\",\n  \"CustomCode\": \"custom_code\",\n  \"CustomMessage\": \"custom_message\",\n  \"SendDigits\": \"ww1\",\n  \"Locale\": \"en\",\n  \"RateLimits\": \"{\\\"my_rate_limit_key\\\": \\\"abc\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"sms\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomMessage\"","#7EE787"],[":","#C9D1D9"]," ",["\"custom_message\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SendDigits\"","#7EE787"],[":","#C9D1D9"]," ",["\"ww1\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Locale\"","#7EE787"],[":","#C9D1D9"]," ",["\"en\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RateLimits\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["my_rate_limit_key","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["abc","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationSna":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sna\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sna\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"sna\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationAuto":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"auto\",\n  \"DeviceIp\": \"0.000.00.000\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"auto\",\n  \"DeviceIp\": \"0.000.00.000\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"auto\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DeviceIp\"","#7EE787"],[":","#C9D1D9"]," ",["\"0.000.00.000\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createVerificationRateLimitExceeded":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"Channel\": \"sms\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"sms\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Start a Verification with SMS

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "sms",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(to="+15017122661", channel="sms")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "+15017122661",
            channel: "sms",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sms").create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("+15017122661")
	params.SetChannel("sms")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "sms" // Channel
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: '+15017122661',
                 channel: 'sms'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel sms
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=sms" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Start a Verification with WhatsApp

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "whatsapp",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(to="+15017122661", channel="whatsapp")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "+15017122661",
            channel: "whatsapp",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "whatsapp").create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("+15017122661")
	params.SetChannel("whatsapp")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "whatsapp" // Channel
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: '+15017122661',
                 channel: 'whatsapp'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel whatsapp
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=whatsapp" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "whatsapp",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "whatsapp",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Start a Verification with Voice

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "call",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(channel="call", to="+15017122661")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "call",
            to: "+15017122661",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "call").create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetChannel("call")
	params.SetTo("+15017122661")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "call" // Channel
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 channel: 'call',
                 to: '+15017122661'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel call \
   --to +15017122661
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=call" \
--data-urlencode "To=+15017122661" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "call",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Start a Verification with Voice to an extension

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "call",
      sendDigits: "350",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(channel="call", to="+15017122661", send_digits="350")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "call",
            to: "+15017122661",
            sendDigits: "350",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "call")
                                        .setSendDigits("350")
                                        .create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetChannel("call")
	params.SetTo("+15017122661")
	params.SetSendDigits("350")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "call", // Channel
        ["sendDigits" => "350"]
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 channel: 'call',
                 to: '+15017122661',
                 send_digits: '350'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel call \
   --to +15017122661 \
   --send-digits 350
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=call" \
--data-urlencode "To=+15017122661" \
--data-urlencode "SendDigits=350" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "call",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Start a new Verification with Silent Network Auth

> \[!NOTE]
>
> Verify Silent Network Auth (SNA) is currently in the beta release stage, [talk to an expert](https://interactive.twilio.com/silent-network-auth-sales-1?_ga=2.37177440.1944479737.1659912854-303184958.1630969149) to request access to this feature.

Silent Network Auth (SNA) is a secure verification channel that verifies user possession of a mobile number without explicit user intervention. It uses the built-in connectivity to the mobile network operator (carrier). In the background, Twilio verifies the phone number by confirming directly from the carrier that the number corresponds to the SIM card located in the device requesting the authentication. This all happens without one-time password (OTP) prompts or visible redirects for the end user.

See [Verify Silent Network Auth Overview](/docs/verify/sna) to learn more about this exciting feature.

To use SNA, complete the following steps:

1. Start a new Verification with the `sna` channel using Verifications API.
2. Send `POST` request to response property `sna.url` from client device that's connected to a mobile network.
3. Check that the Verification was successful using [Verification Check API](/docs/verify/api/verification-check).

To begin, use the [Start New Verification](/docs/verify/api/verification#start-new-verification) endpoint with the parameter `channel=sna`.

Start a Verification With Silent Network Auth

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "sna",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(channel="sna", to="+15017122661")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "sna",
            to: "+15017122661",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sna").create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetChannel("sna")
	params.SetTo("+15017122661")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "sna" // Channel
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 channel: 'sna',
                 to: '+15017122661'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel sna \
   --to +15017122661
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=sna" \
--data-urlencode "To=+15017122661" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sna",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {
    "carrier": {
      "mobile_country_code": "311",
      "type": "mobile",
      "error_code": null,
      "mobile_network_code": "180",
      "name": "T-Mobile USA, Inc."
    }
  },
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "sna",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": {
    "url": "https://mi.dnlsrv.com/m/id/ANBByzx7?data=AAAglRRdNn02iTFWfDWwdTjOzM8o%2F6JB86fH%2Bt%2FFftUPj0pFA0u8%2FibWuYwzmMeMOtdTwYlsO8V%2FXF%2BJmngMhbeGKYhHeTOF2H9VrGEYKcEEklPxHgb5GgL3XtYa33j3lIU%2By6InvoV%2FowWHBzA0QeFPBh6vmJ8LoUPJqGE7q0PRz618Z4ym1AGq%2BaomSq9PlP4rCduv9Cmtxu%2FrvPSBwocs0GCWDE8seK8t9epmPQW7gwODxkAiKr9UxhJd9KvmBVuAQPf%2BoFQVo86USXkhXqTvUzB2bNUYY9FCy3CWgZFTOa1D3H1CVxf1eHzYIswNA7SmOzP%2FBX8g6%2B0hkzwMRkcit3gBNs4evAVJiqAgYvUlrtGwwv9bFx4X7jWSHY4%3D&cipherSalt=yANeDq09bwM38SJs"
  },
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Send POST request to response property sna.url

Check your response from the [Start New Verification](/docs/verify/api/verification#start-new-verification) endpoint for the `sna.url` property:

```bash
"sna": {
     "url": "https://mi.dnlsrv.com/m/id/ANBByzx7?data=AAAglRRdNn02iTFWfDWwdTjOzM8o%2F6JB86fH%2Bt%2FFftUPj0pFA0u8%2FibWuYwzmMeMOtdTwYlsO8V%2FXF%2BJmngMhbeGKYhHeTOF2H9VrGEYKcEEklPxHgb5GgL3XtYa33j3lIU%2By6InvoV%2FowWHBzA0QeFPBh6vmJ8LoUPJqGE7q0PRz618Z4ym1AGq%2BaomSq9PlP4rCduv9Cmtxu%2FrvPSBwocs0GCWDE8seK8t9epmPQW7gwODxkAiKr9UxhJd9KvmBVuAQPf%2BoFQVo86USXkhXqTvUzB2bNUYY9FCy3CWgZFTOa1D3H1CVxf1eHzYIswNA7SmOzP%2FBX8g6%2B0hkzwMRkcit3gBNs4evAVJiqAgYvUlrtGwwv9bFx4X7jWSHY4%3D&cipherSalt=yANeDq09bwM38SJs"
}
```

Then do an `HTTP POST` request to `sna.url` over the end user's mobile network to continue the authentication process. Note that `sna.url` is unique for every Verification Attempt, has a defined time-to-live of 10 minutes, and can only be processed once.

```bash
curl -X POST https://mi.dnlsrv.com/m/id/ANBByzx7?data=AAAglRRdNn02iTFWfDWwdTjOzM8o%2F6JB86fH%2Bt%2FFftUPj0pFA0u8%2FibWuYwzmMeMOtdTwYlsO8V%2FXF%2BJmngMhbeGKYhHeTOF2H9VrGEYKcEEklPxHgb5GgL3XtYa33j3lIU%2By6InvoV%2FowWHBzA0QeFPBh6vmJ8LoUPJqGE7q0PRz618Z4ym1AGq%2BaomSq9PlP4rCduv9Cmtxu%2FrvPSBwocs0GCWDE8seK8t9epmPQW7gwODxkAiKr9UxhJd9KvmBVuAQPf%2BoFQVo86USXkhXqTvUzB2bNUYY9FCy3CWgZFTOa1D3H1CVxf1eHzYIswNA7SmOzP%2FBX8g6%2B0hkzwMRkcit3gBNs4evAVJiqAgYvUlrtGwwv9bFx4X7jWSHY4%3D&cipherSalt=yANeDq09bwM38SJs
```

This `POST` request will prompt multiple redirects behind the scenes, including contacting the carrier to confirm phone number ownership. You can expect to receive a `200` response from this request in under four seconds.

Next, use [Verification Check API](/docs/verify/api/verification-check) to confirm that the `POST` request and Verification Attempt was successful.

## Start a new Verification with AutomaticSMS fallback

> \[!NOTE]
>
> Verify Automatic SMS Fallback is currently in the Pilot maturity stage, please [contact sales](https://www.twilio.com/en-us/help/sales) to request access to this feature.

Setting the `channel` parameter to `auto` will attempt a verification using [Silent Network Auth](/docs/verify/authentication-channels#silent-network-auth) (SNA) with a fallback to [SMS](/docs/verify/authentication-channels#sms-with-rcs-upgrade) if needed. Learn more about [Automatic SMS Fallback](/docs/verify/automatic-channel-selection).

To use Automatic SMS Fallback, complete the following steps:

1. Start a new Verification with the `auto` channel using Verifications API, including the optional parameter `device_ip`.
2. Check the response for the `channel` property to see if `sna` or `sms` was used.
   * If `sna` was used: Continue following the SNA Verification process, see [Send `POST` request to response property sna.url](/docs/verify/api/verification#send-post-request-to-response-property-snaurl) for instructions.
   * If `sms` was used: No further actions required, skip to step 3.
3. Check that the Verification was successful using [Verification Check API](/docs/verify/api/verification-check).

Start a Verification With Automatic SMS Fallback

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "auto",
      deviceIp: "0.000.00.000",
      to: "+15017122661",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(
    channel="auto", to="+15017122661", device_ip="0.000.00.000"
)

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "auto",
            to: "+15017122661",
            deviceIp: "0.000.00.000",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "auto")
                                        .setDeviceIp("0.000.00.000")
                                        .create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetChannel("auto")
	params.SetTo("+15017122661")
	params.SetDeviceIp("0.000.00.000")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "auto", // Channel
        ["deviceIp" => "0.000.00.000"]
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 channel: 'auto',
                 to: '+15017122661',
                 device_ip: '0.000.00.000'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel auto \
   --to +15017122661 \
   --device-ip 0.000.00.000
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=auto" \
--data-urlencode "To=+15017122661" \
--data-urlencode "DeviceIp=0.000.00.000" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "auto",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {
    "carrier": {
      "mobile_country_code": "311",
      "type": "mobile",
      "error_code": null,
      "mobile_network_code": "180",
      "name": "T-Mobile USA, Inc."
    }
  },
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "sna",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": {
    "url": "https://mi.dnlsrv.com/m/id/ANBByzx7?data=AAAglRRdNn02iTFWfDWwdTjOzM8o%2F6JB86fH%2Bt%2FFftUPj0pFA0u8%2FibWuYwzmMeMOtdTwYlsO8V%2FXF%2BJmngMhbeGKYhHeTOF2H9VrGEYKcEEklPxHgb5GgL3XtYa33j3lIU%2By6InvoV%2FowWHBzA0QeFPBh6vmJ8LoUPJqGE7q0PRz618Z4ym1AGq%2BaomSq9PlP4rCduv9Cmtxu%2FrvPSBwocs0GCWDE8seK8t9epmPQW7gwODxkAiKr9UxhJd9KvmBVuAQPf%2BoFQVo86USXkhXqTvUzB2bNUYY9FCy3CWgZFTOa1D3H1CVxf1eHzYIswNA7SmOzP%2FBX8g6%2B0hkzwMRkcit3gBNs4evAVJiqAgYvUlrtGwwv9bFx4X7jWSHY4%3D&cipherSalt=yANeDq09bwM38SJs"
  },
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Start a new Verification with a pre-defined template

The message body of an SMS or Voice Verification can be overridden by using a template. To do so, the template `SID<HJ>` must be sent as a parameter in the Start Verification request.\
The template `SID<HJ>` is a unique ID starting with the letters `HJ`. A complete list of the available templates for the account can be obtained by querying the Templates API.

Start a Verification using a template

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "sms",
      templateSid: "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      to: "+15017122661",
    });

  console.log(verification.status);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(
    to="+15017122661",
    channel="sms",
    template_sid="HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "+15017122661",
            channel: "sms",
            templateSid: "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sms")
                                        .setTemplateSid("HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                        .create();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("+15017122661")
	params.SetChannel("sms")
	params.SetTemplateSid("HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "sms", // Channel
        ["templateSid" => "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
    );

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: '+15017122661',
                 channel: 'sms',
                 template_sid: 'HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
               )

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel sms \
   --template-sid HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=sms" \
--data-urlencode "TemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Start a Verification with Email

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "email",
      to: "customer@example.com",
    });

  console.log(verification.sid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(to="customer@example.com", channel="email")

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "customer@example.com",
            channel: "email",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "customer@example.com", "email").create();

        System.out.println(verification.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("customer@example.com")
	params.SetChannel("email")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "customer@example.com", // To
        "email" // Channel
    );

print $verification->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: 'customer@example.com',
                 channel: 'email'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to customer@example.com \
   --channel email
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=customer@example.com" \
--data-urlencode "Channel=email" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "customer@example.com",
  "channel": "email",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Email Channel Configuration

> \[!NOTE]
>
> Verify's email channel requires additional Service configuration. Please refer to the [email channel setup documentation](/docs/verify/email) for detailed instructions.

The email `ChannelConfiguration` parameter is an object that supports the following keys for customizing email verifications:

| Key             | Data type | Description                                                                                                                                                                                                                                                                                                        |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `from`          | string    | Optional parameter. If included must be a valid email address.                                                                                                                                                                                                                                                     |
| `from_name`     | string    | Optional parameter. Name of the sender.                                                                                                                                                                                                                                                                            |
| `template_id`   | string    | Override the default template from the Verify Service email integration. Create a new template in the [SendGrid dashboard](https://mc.sendgrid.com/dynamic-templates) or learn more in the [SendGrid docs](https://sendgrid.com/docs/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates/). |
| `substitutions` | object    | Variable substitution for dynamic email templates. See code sample below. Learn more about [substitution and section tags](https://sendgrid.com/docs/ui/sending-email/substitution-and-section-tags/).                                                                                                             |

#### Substitutions code sample

```json
{
  "substitutions": {
    "username": "jdoe321",
    "first_name": "Jane",
    "last_name": "Doe"
  }
}
```

### Localization and supported languages

Verify supports delivering verification codes in more than 30 languages over SMS, Voice, and WhatsApp. The language for a verification message resolves based on the country code of the phone number provided, with English as the fallback language. To find out more about which languages are supported, visit our page on [Supported Languages](/docs/verify/supported-languages).

> \[!NOTE]
>
> By default, Verify will not return carrier data for Canadian phone numbers. If you need carrier data on Canadian phone numbers, please visit our [support site](https://help.twilio.com/hc/en-us/articles/360004563433-Twilio-Lookups-API-is-Not-Returning-Carrier-Data-for-Canadian-Phone-Numbers) to enable this feature.

## Fetch a Verification

`GET https://verify.twilio.com/v2/Services/{ServiceSid}/Verifications/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the verification [Service](https://www.twilio.com/docs/verify/api/service) to fetch the resource from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Verification resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Verification by SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(verification.status);
}

fetchVerification();
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

verification = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.FetchAsync(
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.fetcher("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.VerifyV2.FetchVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications('VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .fetch

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:fetch \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Update a Verification Status

`POST https://verify.twilio.com/v2/Services/{ServiceSid}/Verifications/{Sid}`

Mark the verification as `approved` after your application had validated the verification code.

Mark the verification as `canceled` to start a new verification session with a different code before the previous code expires (10 minutes). Only recommended during [testing](https://www.twilio.com/blog/test-verify-no-rate-limits) or if you're using [custom verification codes](/docs/verify/api/customization-options).

For most other use cases, Verify is able to manage the complete lifecycle of a verification with the [Verification Check Resource](/docs/verify/api/verification-check).

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the verification [Service](https://www.twilio.com/docs/verify/api/service) to update the resource from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Verification resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateVerificationRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["canceled","approved"],"description":"The status of the verification. Can be: `pending`, `approved`, `canceled`, `max_attempts_reached`, `deleted`, `failed` or `expired`.","refName":"verification_enum_status","modelName":"verification_enum_status"}}},"examples":{"updateVerification":{"value":{"lang":"json","value":"{\n  \"Status\": \"canceled\"\n}","meta":"","code":"{\n  \"Status\": \"canceled\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"canceled\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"approveVerificationWithPn":{"value":{"lang":"json","value":"{\n  \"Status\": \"approved\"\n}","meta":"","code":"{\n  \"Status\": \"approved\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"approved\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Manually Approve Verification using SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "approved" });

  console.log(verification.status);
}

updateVerification();
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

verification = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="approved")
)

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.UpdateAsync(
            status: VerificationResource.StatusEnum.Approved,
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification
                                        .updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                            "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                            Verification.Status.APPROVED)
                                        .update();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.UpdateVerificationParams{}
	params.SetStatus("approved")

	resp, err := client.VerifyV2.UpdateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "approved" // Status
    );

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications('VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .update(status: 'approved')

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:update \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status approved
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=approved" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "approved",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Manually Approve Verification using Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("+15017122661")
    .update({ status: "approved" });

  console.log(verification.status);
}

updateVerification();
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

verification = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("+15017122661")
    .update(status="approved")
)

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.UpdateAsync(
            status: VerificationResource.StatusEnum.Approved,
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "+15017122661");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", Verification.Status.APPROVED)
                .update();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.UpdateVerificationParams{}
	params.SetStatus("approved")

	resp, err := client.VerifyV2.UpdateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"+15017122661",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications("+15017122661")
    ->update(
        "approved" // Status
    );

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications('+15017122661')
               .update(status: 'approved')

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:update \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid +15017122661 \
   --status approved
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/%2B15017122661" \
--data-urlencode "Status=approved" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "+15017122661",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "approved",
  "valid": true,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Manually Cancel a Verification

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "canceled" });

  console.log(verification.status);
}

updateVerification();
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

verification = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="canceled")
)

print(verification.status)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.UpdateAsync(
            status: VerificationResource.StatusEnum.Canceled,
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(verification.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification
                                        .updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                            "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                            Verification.Status.CANCELED)
                                        .update();

        System.out.println(verification.getStatus());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.UpdateVerificationParams{}
	params.SetStatus("canceled")

	resp, err := client.VerifyV2.UpdateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(*resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "canceled" // Status
    );

print $verification->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications('VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .update(status: 'canceled')

puts verification.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:update \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status canceled
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=canceled" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "canceled",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Next steps

After you know how to start a verification, explore these resources:

* Use the [Verification Check API](/docs/verify/api/verification-check) to validate if the code a user provided was correct or that the Silent Network Auth (SNA) process was successful.
* Learn more about [Verify authentication channels](/docs/verify/authentication-channels) to understand all available verification methods.
* Explore [customization options](/docs/verify/api/customization-options) to tailor verifications to your brand.
