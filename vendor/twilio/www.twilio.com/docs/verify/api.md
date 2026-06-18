# Verify API

As part of Twilio's account security offerings, the Twilio Verify API enables you to add user verification to your web application. The API supports the following channels:

* SMS
* [Passkeys](/docs/verify/passkeys)
* [Silent Network Auth](/docs/verify/sna)
* [Automatic Channel Selection](/docs/verify/automatic-channel-selection)
* Voice
* [WhatsApp](/docs/verify/whatsapp)
* [Email](/docs/verify/email)
* [TOTP](/docs/verify/quickstarts/totp) (authenticator apps such as Authy or Google Authenticator)
* [Push and Silent Device Approval](/docs/verify/push)

For more information on Verify, see the [Twilio Verify product page](https://www.twilio.com/en-us/trusted-activation/verify).

## Base URL

All URLs in this documentation use the following base URL:

```bash
https://verify.twilio.com/v2/
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -X POST https://verify.twilio.com/v2/Services \
    -d FriendlyName=MyServiceName \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## User verification workflow

This section shows the 3 steps required to complete a basic one-time passcode (OTP) verification. Follow the links for more documentation on advanced features such as [service configuration](/docs/verify/api/service), [custom codes](/docs/verify/api/customization-options), [rate limiting](/docs/verify/api/programmable-rate-limits), [PSD2 compliance](/docs/verify/verifying-transactions-psd2), and more.

Step 1: Create a Verification Service

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
    friendlyName: "My First Verify Service",
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
    friendly_name="My First Verify Service"
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

        var service = await ServiceResource.CreateAsync(friendlyName: "My First Verify Service");

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
        Service service = Service.creator("My First Verify Service").create();

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
	params.SetFriendlyName("My First Verify Service")

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
    "My First Verify Service" // FriendlyName
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
          .create(friendly_name: 'My First Verify Service')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:create \
   --friendly-name "My First Verify Service"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=My First Verify Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My First Verify Service",
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

Create a Verification Service in one of two ways:

1. In the [Twilio Verify Console](https://www.twilio.com/console/verify/services)
2. By using the [Verify API](/docs/verify/api/service)

A Verification Service is the set of common configurations used to create and check verifications. This includes features like:

* Friendly name (used in the verification message templates, except in countries with [brand restrictions](https://help.twilio.com/hc/en-us/articles/12387480513307-Why-was-my-friendly-name-not-included-in-the-Verify-SMS-))
* Code length
* Other service-level options

One verification service can be used to send multiple verification tokens, it is not necessary to create a new service each time.

Step 2: Send a verification token

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
).verifications.create(to="+15017122661", channel="sms")

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
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sms").create();

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
        "sms" // Channel
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
                 channel: 'sms'
               )

puts verification.status
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

This request sends a token to the end user through the specified channel. Newly created verifications have a status of `pending`. Supported channels are:

* `sms`, see the [Verify SMS Overview](/docs/verify/sms)
* `call`
* `email`, see [Send Email Verifications with Verify and Twilio SendGrid](/docs/verify/email)
* `whatsapp`, see the [Verify WhatsApp overview](/docs/verify/whatsapp)

Learn more about how to turn [phone number input into E.164 format](https://www.twilio.com/blog/international-phone-number-input-html-javascript) or how to [customize the verification message](/docs/verify/api/templates).

For additional parameters, see the [Verification API](/docs/verify/api/verification) reference.

Step 3: Check the verification token

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerificationCheck() {
  const verificationCheck = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verificationChecks.create({
      code: "123456",
      to: "+15017122661",
    });

  console.log(verificationCheck.status);
}

createVerificationCheck();
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

verification_check = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verification_checks.create(to="+15017122661", code="123456")

print(verification_check.status)
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

        var verificationCheck = await VerificationCheckResource.CreateAsync(
            to: "+15017122661",
            code: "123456",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verificationCheck.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.VerificationCheck;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        VerificationCheck verificationCheck = VerificationCheck.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                  .setTo("+15017122661")
                                                  .setCode("123456")
                                                  .create();

        System.out.println(verificationCheck.getStatus());
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

	params := &verify.CreateVerificationCheckParams{}
	params.SetTo("+15017122661")
	params.SetCode("123456")

	resp, err := client.VerifyV2.CreateVerificationCheck("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$verification_check = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verificationChecks->create([
        "to" => "+15017122661",
        "code" => "123456",
    ]);

print $verification_check->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification_check = @client
                     .verify
                     .v2
                     .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                     .verification_checks
                     .create(
                       to: '+15017122661',
                       code: '123456'
                     )

puts verification_check.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --code 123456
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Code=123456" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "approved",
  "valid": true,
  "amount": null,
  "payee": null,
  "sna_attempts_error_codes": [],
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z"
}
```

This request checks whether the user-provided token is correct.

| **Token** | **Status in response** |
| --------- | ---------------------- |
| Correct   | `approved`             |
| Incorrect | `pending`              |

See the [VerificationCheck API](/docs/verify/api/verification-check) reference.

> \[!NOTE]
>
> You made it through the Verify API Overview. To protect your service against fraud, view our guidance on [Preventing Toll Fraud](/docs/verify/preventing-toll-fraud) when using Verify.
