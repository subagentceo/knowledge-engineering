# Services

A Verification Service is the set of common configurations used to create and check verifications. You can create a service with the API [or in the Console](https://www.twilio.com/console/verify/services). Services include configuration for features like:

* [Email](/docs/verify/email)
* Friendly Name (used in the Verification message templates, except in countries with [brand restrictions](https://help.twilio.com/hc/en-us/articles/12387480513307-Why-was-my-friendly-name-not-included-in-the-Verify-SMS-))
* Code Length
* Skip sending SMS to Landlines
* Requiring DTMF Input for Voice Verifications
* Turning on Twilio Lookup

The SMS channel example below shows different friendly names and code lengths used in our SMS message templates.

![SMS showing verification codes for Docs Sample Service and Updated Example Service.](https://docs-resources.prod.twilio.com/e8562ee77f1eda266fd8204a132c783843d8fa7609d93c6ac807aabc422d7e52.jpg)

## Email verification

Follow along with [the instructions here](/docs/verify/email) to set up your service to send email verifications.

## Service Response Properties

These fields are returned in the output JSON response. The type `SID<VA>` is a unique ID starting with the letters VA.

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.service","modelName":"verify_v2_service","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Service resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Service resource."},"friendly_name":{"type":"string","nullable":true,"description":"The name that appears in the body of your verification messages. It can be up to 30 characters long and can include letters, numbers, spaces, dashes, underscores. Phone numbers, special characters or links are NOT allowed. It cannot contain more than 4 (consecutive or non-consecutive) digits. **This value should not contain PII.**"},"code_length":{"type":"integer","default":0,"description":"The length of the verification code to generate."},"lookup_enabled":{"type":"boolean","nullable":true,"description":"Whether to perform a lookup with each verification started and return info about the phone number."},"psd2_enabled":{"type":"boolean","nullable":true,"description":"Whether to pass PSD2 transaction parameters when starting a verification."},"skip_sms_to_landlines":{"type":"boolean","nullable":true,"description":"Whether to skip sending SMS verifications to landlines. Requires `lookup_enabled`."},"dtmf_input_required":{"type":"boolean","nullable":true,"description":"Whether to ask the user to press a number before delivering the verify code in a phone call."},"tts_name":{"type":"string","nullable":true,"description":"The name of an alternative text-to-speech service to use in phone calls. Applies only to TTS languages."},"do_not_share_warning_enabled":{"type":"boolean","nullable":true,"description":"Whether to add a security warning at the end of an SMS verification body. Disabled by default and applies only to SMS. Example SMS body: `Your AppName verification code is: 1234. Don’t share this code with anyone; our employees will never ask for the code`"},"custom_code_enabled":{"type":"boolean","nullable":true,"description":"Whether to allow sending verifications with a custom code instead of a randomly generated one."},"push":{"nullable":true,"description":"Configurations for the Push factors (channel) created under this Service."},"totp":{"nullable":true,"description":"Configurations for the TOTP factors (channel) created under this Service."},"default_template_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HJ[0-9a-fA-F]{32}$","nullable":true},"whatsapp":{"nullable":true},"passkeys":{"nullable":true},"verify_event_subscription_enabled":{"type":"boolean","nullable":true,"description":"Whether to allow verifications from the service to reach the stream-events sinks if configured"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Verification Service

`POST https://verify.twilio.com/v2/Services`

These are the available input parameters for creating a Service.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateServiceRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the verification service. It can be up to 32 characters long. **This value should not contain PII.**"},"CodeLength":{"type":"integer","description":"The length of the verification code to generate. Must be an integer value between 4 and 10, inclusive."},"LookupEnabled":{"type":"boolean","description":"Whether to perform a lookup with each verification started and return info about the phone number."},"SkipSmsToLandlines":{"type":"boolean","description":"Whether to skip sending SMS verifications to landlines. Requires `lookup_enabled`."},"DtmfInputRequired":{"type":"boolean","description":"Whether to ask the user to press a number before delivering the verify code in a phone call."},"TtsName":{"type":"string","description":"The name of an alternative text-to-speech service to use in phone calls. Applies only to TTS languages."},"Psd2Enabled":{"type":"boolean","description":"Whether to pass PSD2 transaction parameters when starting a verification."},"DoNotShareWarningEnabled":{"type":"boolean","description":"Whether to add a security warning at the end of an SMS verification body. Disabled by default and applies only to SMS. Example SMS body: `Your AppName verification code is: 1234. Don’t share this code with anyone; our employees will never ask for the code`"},"CustomCodeEnabled":{"type":"boolean","description":"Whether to allow sending verifications with a custom code instead of a randomly generated one."},"Push.IncludeDate":{"type":"boolean","description":"Optional configuration for the Push factors. If true, include the date in the Challenge's response. Otherwise, the date is omitted from the response. See [Challenge](https://www.twilio.com/docs/verify/api/challenge) resource’s details parameter for more info. Default: false. **Deprecated** do not use this parameter. This timestamp value is the same one as the one found in `date_created`, please use that one instead."},"Push.ApnCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"Optional configuration for the Push factors. Set the APN Credential for this service. This will allow to send push notifications to iOS devices. See [Credential Resource](https://www.twilio.com/docs/notify/api/credential-resource)"},"Push.FcmCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"Optional configuration for the Push factors. Set the FCM Credential for this service. This will allow to send push notifications to Android devices. See [Credential Resource](https://www.twilio.com/docs/notify/api/credential-resource)"},"Totp.Issuer":{"type":"string","description":"Optional configuration for the TOTP factors. Set TOTP Issuer for this service. This will allow to configure the issuer of the TOTP URI. Defaults to the service friendly name if not provided."},"Totp.TimeStep":{"type":"integer","description":"Optional configuration for the TOTP factors. Defines how often, in seconds, are TOTP codes generated. i.e, a new TOTP code is generated every time_step seconds. Must be between 20 and 60 seconds, inclusive. Defaults to 30 seconds"},"Totp.CodeLength":{"type":"integer","description":"Optional configuration for the TOTP factors. Number of digits for generated TOTP codes. Must be between 3 and 8, inclusive. Defaults to 6"},"Totp.Skew":{"type":"integer","description":"Optional configuration for the TOTP factors. The number of time-steps, past and future, that are valid for validation of TOTP codes. Must be between 0 and 2, inclusive. Defaults to 1"},"DefaultTemplateSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HJ[0-9a-fA-F]{32}$","description":"The default message [template](https://www.twilio.com/docs/verify/api/templates). Will be used for all SMS verifications unless explicitly overriden. SMS channel only."},"Whatsapp.MsgServiceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","description":"The SID of the Messaging Service containing WhatsApp Sender(s) that Verify will use to send WhatsApp messages to your users."},"Whatsapp.From":{"type":"string","description":"The number to use as the WhatsApp Sender that Verify will use to send WhatsApp messages to your users.This WhatsApp Sender must be associated with a Messaging Service SID."},"Passkeys.RelyingParty.Id":{"type":"string","description":"The Relying Party ID for Passkeys. This is the domain of your application, e.g. `example.com`. It is used to identify your application when creating Passkeys."},"Passkeys.RelyingParty.Name":{"type":"string","description":"The Relying Party Name for Passkeys. This is the name of your application, e.g. `Example App`. It is used to identify your application when creating Passkeys."},"Passkeys.RelyingParty.Origins":{"type":"string","description":"The Relying Party Origins for Passkeys. This is the origin of your application, e.g. `login.example.com,www.example.com`. It is used to identify your application when creating Passkeys, it can have multiple origins split by `,`."},"Passkeys.AuthenticatorAttachment":{"type":"string","description":"The Authenticator Attachment for Passkeys. This is the type of authenticator that will be used to create Passkeys. It can be empty or it can have the values `platform`, `cross-platform` or `any`."},"Passkeys.DiscoverableCredentials":{"type":"string","description":"Indicates whether credentials must be discoverable by the authenticator. It can be empty or it can have the values `required`, `preferred` or `discouraged`."},"Passkeys.UserVerification":{"type":"string","description":"The User Verification for Passkeys. This is the type of user verification that will be used to create Passkeys. It can be empty or it can have the values `required`, `preferred` or `discouraged`."},"VerifyEventSubscriptionEnabled":{"type":"boolean","description":"Whether to allow verifications from the service to reach the stream-events sinks if configured"}}},"examples":{"createRecord":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"name\",\n  \"CodeLength\": 4,\n  \"LookupEnabled\": false,\n  \"Psd2Enabled\": false,\n  \"SkipSmsToLandlines\": false,\n  \"DtmfInputRequired\": false,\n  \"TtsName\": \"name\",\n  \"MailerSid\": \"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DoNotShareWarningEnabled\": false,\n  \"CustomCodeEnabled\": true,\n  \"Push.ApnCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Totp.Issuer\": \"test-issuer\",\n  \"Totp.TimeStep\": 30,\n  \"Totp.CodeLength\": 3,\n  \"Totp.Skew\": 2,\n  \"DefaultTemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"VerifyEventSubscriptionEnabled\": false\n}","meta":"","code":"{\n  \"FriendlyName\": \"name\",\n  \"CodeLength\": 4,\n  \"LookupEnabled\": false,\n  \"Psd2Enabled\": false,\n  \"SkipSmsToLandlines\": false,\n  \"DtmfInputRequired\": false,\n  \"TtsName\": \"name\",\n  \"MailerSid\": \"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DoNotShareWarningEnabled\": false,\n  \"CustomCodeEnabled\": true,\n  \"Push.ApnCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Totp.Issuer\": \"test-issuer\",\n  \"Totp.TimeStep\": 30,\n  \"Totp.CodeLength\": 3,\n  \"Totp.Skew\": 2,\n  \"DefaultTemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"VerifyEventSubscriptionEnabled\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CodeLength\"","#7EE787"],[":","#C9D1D9"]," ",["4","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"LookupEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Psd2Enabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"SkipSmsToLandlines\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"DtmfInputRequired\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TtsName\"","#7EE787"],[":","#C9D1D9"]," ",["\"name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MailerSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DoNotShareWarningEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CustomCodeEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Push.ApnCredentialSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Totp.Issuer\"","#7EE787"],[":","#C9D1D9"]," ",["\"test-issuer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Totp.TimeStep\"","#7EE787"],[":","#C9D1D9"]," ",["30","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Totp.CodeLength\"","#7EE787"],[":","#C9D1D9"]," ",["3","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Totp.Skew\"","#7EE787"],[":","#C9D1D9"]," ",["2","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"DefaultTemplateSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerifyEventSubscriptionEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.verify.v2.services.create({
    friendlyName: "My Verify Service",
  });

  console.log(service.sid);
}

createService();
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

service = client.verify.v2.services.create(friendly_name="My Verify Service")

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.CreateAsync(friendlyName: "My Verify Service");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("My Verify Service").create();

        System.out.println(service.getSid());
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

	params := &verify.CreateServiceParams{}
	params.SetFriendlyName("My Verify Service")

	resp, err := client.VerifyV2.CreateService(params)
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

$service = $twilio->verify->v2->services->create(
    "My Verify Service" // FriendlyName
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services
          .create(friendly_name: 'My Verify Service')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:create \
   --friendly-name "My Verify Service"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=My Verify Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My Verify Service",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "fcm_credential_sid": null
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "whatsapp": {
    "msg_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "from": "whatsapp:+1234567890"
  },
  "passkeys": {
    "relying_party": {
      "id": "www.mydomain.com",
      "name": "My domain",
      "origins": [
        "www.mydomain.com",
        "www.login.mydomain.com"
      ]
    },
    "authenticator_attachment": "",
    "discoverable_credentials": null,
    "user_verification": "discouraged"
  },
  "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

## Associate a predefined template with a service

A predefined template (public or private if there are any associated with your account) can be associated with a Verification Service by setting the `DefaultTemplateSid` attribute. By doing so, the message body of the verifications created with the service will use the text defined in the referenced template by default.

The default template `SID<HJ>` is a unique ID starting with the letters `HJ`. It's generated when the template is created.

A complete list of the available templates for the account can be obtained by querying the [Templates API](/docs/verify/api/templates).

The template that is going to be used in the verification will be selected in the following order:

1. If a `TemplateSid` is received in the Create Verification request, the verification will use the text defined in the template identified with that `Sid`.
2. If a `DefaultTemplateSid` is set for the Service, the verification will use the text defined in the template identified with that `Sid`.
3. Otherwise, the text defined in the global default template will be used.

Create a Service with a default template

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.verify.v2.services.create({
    defaultTemplateSid: "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    friendlyName: "My Verify Service",
  });

  console.log(service.sid);
}

createService();
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

service = client.verify.v2.services.create(
    friendly_name="My Verify Service",
    default_template_sid="HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.CreateAsync(
            friendlyName: "My Verify Service",
            defaultTemplateSid: "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service =
            Service.creator("My Verify Service").setDefaultTemplateSid("HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").create();

        System.out.println(service.getSid());
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

	params := &verify.CreateServiceParams{}
	params.SetFriendlyName("My Verify Service")
	params.SetDefaultTemplateSid("HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.VerifyV2.CreateService(params)
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

$service = $twilio->verify->v2->services->create(
    "My Verify Service", // FriendlyName
    ["defaultTemplateSid" => "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services
          .create(
            friendly_name: 'My Verify Service',
            default_template_sid: 'HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
          )

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:create \
   --friendly-name "My Verify Service" \
   --default-template-sid HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=My Verify Service" \
--data-urlencode "DefaultTemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My Verify Service",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "fcm_credential_sid": null
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "whatsapp": {
    "msg_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "from": "whatsapp:+1234567890"
  },
  "passkeys": {
    "relying_party": {
      "id": "www.mydomain.com",
      "name": "My domain",
      "origins": [
        "www.mydomain.com",
        "www.login.mydomain.com"
      ]
    },
    "authenticator_attachment": "",
    "discoverable_credentials": null,
    "user_verification": "discouraged"
  },
  "default_template_sid": "HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

Create a PSD2 Enabled Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.verify.v2.services.create({
    friendlyName: "Owl Banking",
    psd2Enabled: true,
  });

  console.log(service.psd2Enabled);
}

createService();
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

service = client.verify.v2.services.create(
    friendly_name="Owl Banking", psd2_enabled=True
)

print(service.psd2_enabled)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service =
            await ServiceResource.CreateAsync(friendlyName: "Owl Banking", psd2Enabled: true);

        Console.WriteLine(service.Psd2Enabled);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("Owl Banking").setPsd2Enabled(true).create();

        System.out.println(service.getPsd2Enabled());
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

	params := &verify.CreateServiceParams{}
	params.SetFriendlyName("Owl Banking")
	params.SetPsd2Enabled(true)

	resp, err := client.VerifyV2.CreateService(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Psd2Enabled != nil {
			fmt.Println(*resp.Psd2Enabled)
		} else {
			fmt.Println(resp.Psd2Enabled)
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

$service = $twilio->verify->v2->services->create(
    "Owl Banking", // FriendlyName
    ["psd2Enabled" => true]
);

print $service->psd2Enabled;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services
          .create(
            friendly_name: 'Owl Banking',
            psd2_enabled: true
          )

puts service.psd2_enabled
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:create \
   --friendly-name "Owl Banking" \
   --psd2-enabled
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=Owl Banking" \
--data-urlencode "Psd2Enabled=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Owl Banking",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": true,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "fcm_credential_sid": null
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "whatsapp": {
    "msg_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "from": "whatsapp:+1234567890"
  },
  "passkeys": {
    "relying_party": {
      "id": "www.mydomain.com",
      "name": "My domain",
      "origins": [
        "www.mydomain.com",
        "www.login.mydomain.com"
      ]
    },
    "authenticator_attachment": "",
    "discoverable_credentials": null,
    "user_verification": "discouraged"
  },
  "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

See [Verifying Transactions for PSD2](/docs/verify/verifying-transactions-psd2) for more information.

## Fetch a Service

`GET https://verify.twilio.com/v2/Services/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Verification Service resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchService() {
  const service = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(service.sid);
}

fetchService();
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

service = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service =
            await ServiceResource.FetchAsync(pathSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.fetcher("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(service.getSid());
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

	resp, err := client.VerifyV2.FetchService("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$service = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:fetch \
   --sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "name",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": null,
    "fcm_credential_sid": null
  },
  "totp": {
    "issuer": null,
    "time_step": null,
    "code_length": null,
    "skew": null
  },
  "whatsapp": {
    "msg_service_sid": null,
    "from": null
  },
  "passkeys": {
    "relying_party": {
      "id": null,
      "name": null,
      "origins": null
    },
    "authenticator_attachment": null,
    "discoverable_credentials": null,
    "user_verification": null
  },
  "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

## List all Services

`GET https://verify.twilio.com/v2/Services`

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Services

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listService() {
  const services = await client.verify.v2.services.list({ limit: 20 });

  services.forEach((s) => console.log(s.sid));
}

listService();
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

services = client.verify.v2.services.list(limit=20)

for record in services:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var services = await ServiceResource.ReadAsync(limit: 20);

        foreach (var record in services) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Service> services = Service.reader().limit(20).read();

        for (Service record : services) {
            System.out.println(record.getSid());
        }
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

	params := &verify.ListServiceParams{}
	params.SetLimit(20)

	resp, err := client.VerifyV2.ListService(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
			}
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

$services = $twilio->verify->v2->services->read(20);

foreach ($services as $record) {
    print $record->sid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

services = @client
           .verify
           .v2
           .services
           .list(limit: 20)

services.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:list
```

```bash
curl -X GET "https://verify.twilio.com/v2/Services?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://verify.twilio.com/v2/Services?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "services",
    "url": "https://verify.twilio.com/v2/Services?PageSize=50&Page=0"
  },
  "services": [
    {
      "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "name",
      "code_length": 4,
      "lookup_enabled": false,
      "psd2_enabled": false,
      "skip_sms_to_landlines": false,
      "dtmf_input_required": false,
      "tts_name": "name",
      "do_not_share_warning_enabled": false,
      "custom_code_enabled": true,
      "push": {
        "include_date": false,
        "apn_credential_sid": null,
        "fcm_credential_sid": null
      },
      "totp": {
        "issuer": null,
        "time_step": null,
        "code_length": null,
        "skew": null
      },
      "whatsapp": {
        "msg_service_sid": null,
        "from": null
      },
      "passkeys": {
        "relying_party": {
          "id": null,
          "name": null,
          "origins": null
        },
        "authenticator_attachment": null,
        "discoverable_credentials": null,
        "user_verification": null
      },
      "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "verify_event_subscription_enabled": false,
      "date_created": "2015-07-30T20:00:00Z",
      "date_updated": "2015-07-30T20:00:00Z",
      "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
        "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
        "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
        "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
        "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
        "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
        "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
      }
    }
  ]
}
```

## Update a Service

`POST https://verify.twilio.com/v2/Services/{Sid}`

These are the available input parameters for updating a Service. The type `SID<VA>` is a unique ID starting with the letters VA.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Service resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateServiceRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the verification service. It can be up to 32 characters long. **This value should not contain PII.**"},"CodeLength":{"type":"integer","description":"The length of the verification code to generate. Must be an integer value between 4 and 10, inclusive."},"LookupEnabled":{"type":"boolean","description":"Whether to perform a lookup with each verification started and return info about the phone number."},"SkipSmsToLandlines":{"type":"boolean","description":"Whether to skip sending SMS verifications to landlines. Requires `lookup_enabled`."},"DtmfInputRequired":{"type":"boolean","description":"Whether to ask the user to press a number before delivering the verify code in a phone call."},"TtsName":{"type":"string","description":"The name of an alternative text-to-speech service to use in phone calls. Applies only to TTS languages."},"Psd2Enabled":{"type":"boolean","description":"Whether to pass PSD2 transaction parameters when starting a verification."},"DoNotShareWarningEnabled":{"type":"boolean","description":"Whether to add a privacy warning at the end of an SMS. **Disabled by default and applies only for SMS.**"},"CustomCodeEnabled":{"type":"boolean","description":"Whether to allow sending verifications with a custom code instead of a randomly generated one."},"Push.IncludeDate":{"type":"boolean","description":"Optional configuration for the Push factors. If true, include the date in the Challenge's response. Otherwise, the date is omitted from the response. See [Challenge](https://www.twilio.com/docs/verify/api/challenge) resource’s details parameter for more info. Default: false. **Deprecated** do not use this parameter."},"Push.ApnCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"Optional configuration for the Push factors. Set the APN Credential for this service. This will allow to send push notifications to iOS devices. See [Credential Resource](https://www.twilio.com/docs/notify/api/credential-resource)"},"Push.FcmCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"Optional configuration for the Push factors. Set the FCM Credential for this service. This will allow to send push notifications to Android devices. See [Credential Resource](https://www.twilio.com/docs/notify/api/credential-resource)"},"Totp.Issuer":{"type":"string","description":"Optional configuration for the TOTP factors. Set TOTP Issuer for this service. This will allow to configure the issuer of the TOTP URI."},"Totp.TimeStep":{"type":"integer","description":"Optional configuration for the TOTP factors. Defines how often, in seconds, are TOTP codes generated. i.e, a new TOTP code is generated every time_step seconds. Must be between 20 and 60 seconds, inclusive. Defaults to 30 seconds"},"Totp.CodeLength":{"type":"integer","description":"Optional configuration for the TOTP factors. Number of digits for generated TOTP codes. Must be between 3 and 8, inclusive. Defaults to 6"},"Totp.Skew":{"type":"integer","description":"Optional configuration for the TOTP factors. The number of time-steps, past and future, that are valid for validation of TOTP codes. Must be between 0 and 2, inclusive. Defaults to 1"},"DefaultTemplateSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HJ[0-9a-fA-F]{32}$","description":"The default message [template](https://www.twilio.com/docs/verify/api/templates). Will be used for all SMS verifications unless explicitly overriden. SMS channel only."},"Whatsapp.MsgServiceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","description":"The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) to associate with the Verification Service."},"Whatsapp.From":{"type":"string","description":"The WhatsApp number to use as the sender of the verification messages. This number must be associated with the WhatsApp Message Service."},"Passkeys.RelyingParty.Id":{"type":"string","description":"The Relying Party ID for Passkeys. This is the domain of your application, e.g. `example.com`. It is used to identify your application when creating Passkeys."},"Passkeys.RelyingParty.Name":{"type":"string","description":"The Relying Party Name for Passkeys. This is the name of your application, e.g. `Example App`. It is used to identify your application when creating Passkeys."},"Passkeys.RelyingParty.Origins":{"type":"string","description":"The Relying Party Origins for Passkeys. This is the origin of your application, e.g. `login.example.com,www.example.com`. It is used to identify your application when creating Passkeys, it can have multiple origins split by `,`."},"Passkeys.AuthenticatorAttachment":{"type":"string","description":"The Authenticator Attachment for Passkeys. This is the type of authenticator that will be used to create Passkeys. It can be empty or it can have the values `platform`, `cross-platform` or `any`."},"Passkeys.DiscoverableCredentials":{"type":"string","description":"Indicates whether credentials must be discoverable by the authenticator. It can be empty or it can have the values `required`, `preferred` or `discouraged`."},"Passkeys.UserVerification":{"type":"string","description":"The User Verification for Passkeys. This is the type of user verification that will be used to create Passkeys. It can be empty or it can have the values `required`, `preferred` or `discouraged`."},"VerifyEventSubscriptionEnabled":{"type":"boolean","description":"Whether to allow verifications from the service to reach the stream-events sinks if configured"}}},"examples":{"updateRecord":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"name\",\n  \"CodeLength\": 4,\n  \"LookupEnabled\": false,\n  \"Psd2Enabled\": false,\n  \"SkipSmsToLandlines\": false,\n  \"DtmfInputRequired\": false,\n  \"TtsName\": \"name\",\n  \"MailerSid\": \"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DoNotShareWarningEnabled\": false,\n  \"CustomCodeEnabled\": true,\n  \"Push.IncludeDate\": false,\n  \"Push.FcmCredentialSid\": \"CRbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n  \"Totp.Issuer\": \"test-issuer\",\n  \"Totp.TimeStep\": 30,\n  \"Totp.CodeLength\": 3,\n  \"Totp.Skew\": 2,\n  \"DefaultTemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"VerifyEventSubscriptionEnabled\": false\n}","meta":"","code":"{\n  \"FriendlyName\": \"name\",\n  \"CodeLength\": 4,\n  \"LookupEnabled\": false,\n  \"Psd2Enabled\": false,\n  \"SkipSmsToLandlines\": false,\n  \"DtmfInputRequired\": false,\n  \"TtsName\": \"name\",\n  \"MailerSid\": \"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DoNotShareWarningEnabled\": false,\n  \"CustomCodeEnabled\": true,\n  \"Push.IncludeDate\": false,\n  \"Push.FcmCredentialSid\": \"CRbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n  \"Totp.Issuer\": \"test-issuer\",\n  \"Totp.TimeStep\": 30,\n  \"Totp.CodeLength\": 3,\n  \"Totp.Skew\": 2,\n  \"DefaultTemplateSid\": \"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"VerifyEventSubscriptionEnabled\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CodeLength\"","#7EE787"],[":","#C9D1D9"]," ",["4","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"LookupEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Psd2Enabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"SkipSmsToLandlines\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"DtmfInputRequired\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TtsName\"","#7EE787"],[":","#C9D1D9"]," ",["\"name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MailerSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DoNotShareWarningEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CustomCodeEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Push.IncludeDate\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Push.FcmCredentialSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Totp.Issuer\"","#7EE787"],[":","#C9D1D9"]," ",["\"test-issuer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Totp.TimeStep\"","#7EE787"],[":","#C9D1D9"]," ",["30","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Totp.CodeLength\"","#7EE787"],[":","#C9D1D9"]," ",["3","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Totp.Skew\"","#7EE787"],[":","#C9D1D9"]," ",["2","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"DefaultTemplateSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerifyEventSubscriptionEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

## Associate a template with an existing service

A predefined template can be associated with an already created Verification Service by setting the `DefaultTemplateSid` attribute. By doing so, the message body of the verifications created with the service will use by default the text defined in the template.\
The default template `SID<HJ>` is a unique ID starting with the letters `HJ`. It is generated when the template is created.

A complete list of the available templates for the account can be obtained by querying the [List Templates API](/docs/verify/api/templates).

The template that is going to be used in the verification will be defined following this order:

1. If a `TemplateSid` is received in the Create Verification request, the verification will use the text defined in the template identified with that `Sid`.
2. If a `DefaultTemplateSid` is set for the Service, the verification will use the text defined in the template identified with that `Sid`.
3. Otherwise, the text defined in the default template will be used.

Update a Service default template.

```bash
curl -X POST https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--data-urlencode "DefaultTemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "name",
  "code_length": 7,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": true,
    "apn_credential_sid": null,
    "fcm_credential_sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AccessTokens"
  }
}
```

Update a Service's Code Length

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ codeLength: 7 });

  console.log(service.codeLength);
}

updateService();
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

service = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(code_length=7)

print(service.code_length)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            codeLength: 7, pathSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.CodeLength);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setCodeLength(7).update();

        System.out.println(service.getCodeLength());
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

	params := &verify.UpdateServiceParams{}
	params.SetCodeLength(7)

	resp, err := client.VerifyV2.UpdateService("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(resp.CodeLength)
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

$service = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["codeLength" => 7]);

print $service->codeLength;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(code_length: 7)

puts service.code_length
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:update \
   --sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --code-length 7
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "CodeLength=7" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "name",
  "code_length": 7,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": null,
    "fcm_credential_sid": "CRbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "whatsapp": {
    "msg_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "from": "whatsapp:+1234567890"
  },
  "passkeys": {
    "relying_party": {
      "id": null,
      "name": null,
      "origins": null
    },
    "authenticator_attachment": null,
    "discoverable_credentials": null,
    "user_verification": null
  },
  "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

Update a Service Name

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "New and Improved Service Name" });

  console.log(service.friendlyName);
}

updateService();
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

service = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="New and Improved Service Name")

print(service.friendly_name)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            friendlyName: "New and Improved Service Name",
            pathSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.FriendlyName);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                              .setFriendlyName("New and Improved Service Name")
                              .update();

        System.out.println(service.getFriendlyName());
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

	params := &verify.UpdateServiceParams{}
	params.SetFriendlyName("New and Improved Service Name")

	resp, err := client.VerifyV2.UpdateService("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.FriendlyName != nil {
			fmt.Println(*resp.FriendlyName)
		} else {
			fmt.Println(resp.FriendlyName)
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

$service = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "New and Improved Service Name"]);

print $service->friendlyName;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .verify
          .v2
          .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(friendly_name: 'New and Improved Service Name')

puts service.friendly_name
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:update \
   --sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name "New and Improved Service Name"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=New and Improved Service Name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "New and Improved Service Name",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": false,
    "apn_credential_sid": null,
    "fcm_credential_sid": "CRbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "whatsapp": {
    "msg_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "from": "whatsapp:+1234567890"
  },
  "passkeys": {
    "relying_party": {
      "id": null,
      "name": null,
      "origins": null
    },
    "authenticator_attachment": null,
    "discoverable_credentials": null,
    "user_verification": null
  },
  "default_template_sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verify_event_subscription_enabled": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AccessTokens"
  }
}
```

## Delete a Service

`DELETE https://verify.twilio.com/v2/Services/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Verification Service resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteService() {
  await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteService();
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

client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ServiceResource.DeleteAsync(pathSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service.deleter("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.VerifyV2.DeleteService("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->verify->v2->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .verify
  .v2
  .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:remove \
   --sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
