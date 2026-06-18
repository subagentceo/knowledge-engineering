# Templates

> \[!IMPORTANT]
>
> Pre-approved and custom templates are currently in the Public Beta maturity stage, which means that:
>
> We're actively looking for early-adopter customers to try it out and give us feedback. That could be you.
>
> Pre-approved and custom templates are only supported with the **SMS and Voice** channels.

Templates are predefined and approved messages used to [send Verifications](/docs/verify/api/verification) that allow you to customize the Verification message. Your account can use multiple templates to accommodate different scenarios.

Verify provides three template types: Verify Default, pre-approved and custom to cover common use cases. Learn more about [getting started with Verification Templates](/docs/verify/verification-templates).

## Template translations and supported languages

Verify resolves the template message body's locale based on the phone number's country code. If it can't resolve the locale, Verify falls back to English or the custom template's default language. We recommend using this locale resolution. If you need to override the locale, pass the `Locale` parameter. [Learn more about supported languages here](/docs/verify/supported-languages).

> \[!NOTE]
>
> To learn about special restrictions for sending SMS, consult the issues on sending to [Singapore](/docs/verify/singapore) or [Canada](https://help.twilio.com/hc/en-us/articles/12387480513307-Why-was-my-friendly-name-not-included-in-the-Verify-SMS-).
> To use a template in China, [register the template with the account](https://help.twilio.com/articles/17024185400859).

## Template properties

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.verification_template","modelName":"verify_v2_verification_template","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HJ[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies a Verification Template."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Account."},"friendly_name":{"type":"string","nullable":true,"description":"A descriptive string that you create to describe a Template. It can be up to 32 characters long."},"channels":{"type":"array","nullable":true,"description":"A list of channels that support the Template. Can include: sms, voice.","items":{"type":"string"}},"translations":{"nullable":true,"description":"An object that contains the different translations of the template. Every translation is identified by the language short name and contains its respective information as the approval status, text and created/modified date."}}}} />

## Get a list of available templates

`GET https://verify.twilio.com/v2/Templates`

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"String filter used to query templates with a given friendly name.","schema":{"type":"string"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Get a list of available templates

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listVerificationTemplate() {
  const templates = await client.verify.v2.templates.list({ limit: 20 });

  templates.forEach((t) => console.log(t.translations));
}

listVerificationTemplate();
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

templates = client.verify.v2.templates.list(limit=20)

for record in templates:
    print(record.translations)
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

        var templates = await TemplateResource.ReadAsync(limit: 20);

        foreach (var record in templates) {
            Console.WriteLine(record.Translations);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Template;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Template> templates = Template.reader().limit(20).read();

        for (Template record : templates) {
            System.out.println(record.getTranslations());
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

	params := &verify.ListVerificationTemplateParams{}
	params.SetLimit(20)

	resp, err := client.VerifyV2.ListVerificationTemplate(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Translations != nil {
				fmt.Println(*resp[record].Translations)
			} else {
				fmt.Println(resp[record].Translations)
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

$templates = $twilio->verify->v2->templates->read([], 20);

foreach ($templates as $record) {
    print $record->translations;
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

templates = @client
            .verify
            .v2
            .templates
            .list(limit: 20)

templates.each do |record|
   puts record.translations
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:templates:list
```

```bash
curl -X GET "https://verify.twilio.com/v2/Templates?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "templates": [
    {
      "sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Base Verification Template 2 with do not share",
      "channels": [
        "sms"
      ],
      "translations": {
        "en": {
          "is_default_translation": true,
          "status": "approved",
          "locale": "en",
          "text": "Your {{friendly_name}} verification code is: {{code}}. Do not share this code with anyone.",
          "date_updated": "2021-07-29T20:38:28.759979905Z",
          "date_created": "2021-07-29T20:38:28.165602325Z"
        }
      }
    },
    {
      "sid": "HJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Base Verification Template 3",
      "channels": [
        "sms",
        "voice"
      ],
      "translations": {
        "en": {
          "is_default_translation": true,
          "status": "approved",
          "locale": "en",
          "text": "Your verification code is: {{code}}. Do not share it.",
          "date_updated": "2021-07-29T20:38:28.759979905Z",
          "date_created": "2021-07-29T20:38:28.165602325Z"
        }
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://verify.twilio.com/v2/Templates?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://verify.twilio.com/v2/Templates?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "templates"
  }
}
```

> \[!NOTE]
>
> If you have [`jq`](https://jqlang.github.io/jq/) installed, you can list all English templates with the following command:
>
> ```sh
> curl -X GET "https://verify.twilio.com/v2/Templates" \
>   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
>   | jq '.templates[] | {sid: .sid, template: .translations.en.text}'
> ```

### Set a default template for your Verify Service

To set a default template for a new Service, set the `default_template_sid` parameter:

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

### Start a Verification with a specific template

To send a verification with a specified template, [include the `TemplateSid` (starts with HJ) as a parameter.](/docs/verify/api/verification#start-a-new-verification-with-a-pre-defined-template)

Start a Verification with a template

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
