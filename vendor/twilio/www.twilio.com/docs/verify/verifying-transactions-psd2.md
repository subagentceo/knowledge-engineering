# Verify Transactions for PSD2

> \[!NOTE]
>
> To enable PSD2 mode on your account, contact [Twilio Support](https://help.twilio.com).

## What is PSD2?

PSD2 is the short name for [Payment Service Directive 2](https://en.wikipedia.org/wiki/Payment_Services_Directive), a set of regulations introduced by the [European Banking Authority](https://eba.europa.eu/) aimed at combating the rising costs of fraud. PSD2 requires Strong Customer Authentication (SCA) for online transactions involving more than 30 Euros. [To learn more about PSD2, SCA, and dynamic linking check out this post.](https://www.twilio.com/blog/dynamic-linking-psd2)

## Get started with Verify for PSD2

Twilio Verify already allows you to quickly verify phone number ownership with one-time passwords (OTP) over SMS. In a few steps, you can extend these capabilities to help comply with PSD2 by verifying transactions using dynamic linking and Strong Customer Authentication (SCA).

### Enable PSD2 on your account

First, you must contact [Twilio Support](https://help.twilio.com) to enable PSD2 mode on your account.

### Create a Service with PSD2 enabled

Next, create a new Service with PSD2 mode enabled, as shown in the code sample below.

Once enabled, requests to start and/or complete verifications require the `Payee` and `Amount` parameters.

Create a PSD2 Enabled Verify Service

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
    friendlyName: "My PSD2 Service",
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
    psd2_enabled=True, friendly_name="My PSD2 Service"
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
            await ServiceResource.CreateAsync(psd2Enabled: true, friendlyName: "My PSD2 Service");

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
        Service service = Service.creator("My PSD2 Service").setPsd2Enabled(true).create();

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
	params.SetPsd2Enabled(true)
	params.SetFriendlyName("My PSD2 Service")

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
    "My PSD2 Service", // FriendlyName
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
            psd2_enabled: true,
            friendly_name: 'My PSD2 Service'
          )

puts service.psd2_enabled
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:create \
   --psd2-enabled \
   --friendly-name "My PSD2 Service"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "Psd2Enabled=true" \
--data-urlencode "FriendlyName=My PSD2 Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My PSD2 Service",
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

### Start a transaction verification

To start a transaction verification, send an `HTTP POST` request to your PSD2-enabled Service's Verifications resource. This request must contain the `Amount`, `Payee`, `To`, and `Channel` parameters.

This HTTP request causes Twilio to send a verification code to the user. Each verification code is dynamically-linked to the `Amount` and `Payee` of each transaction. The code is unique to the `To` (e.g., the recipient's phone number), `Amount`, and `Payee` combination. This ensures that verification fails in the event of code interception or transaction mutations.

Each verification code is valid for 10 minutes. Within that ten-minute time frame, any subsequent `HTTP POST` requests to the Verifications resource for the transaction cause Twilio send the same verification code.

Start a PSD2 verification

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
      amount: "€39.99",
      channel: "sms",
      payee: "Acme Inc.",
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
    to="+15017122661", channel="sms", amount="€39.99", payee="Acme Inc."
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
            to: "+15017122661",
            channel: "sms",
            amount: "€39.99",
            payee: "Acme Inc.",
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
        Verification verification = Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sms")
                                        .setAmount("€39.99")
                                        .setPayee("Acme Inc.")
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
	params.SetTo("+15017122661")
	params.SetChannel("sms")
	params.SetAmount("€39.99")
	params.SetPayee("Acme Inc.")

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
        "sms", // Channel
        [
            "amount" => "€39.99",
            "payee" => "Acme Inc.",
        ]
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
                 channel: 'sms',
                 amount: '€39.99',
                 payee: 'Acme Inc.'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel sms \
   --amount €39.99 \
   --payee "Acme Inc."
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=sms" \
--data-urlencode "Amount=€39.99" \
--data-urlencode "Payee=Acme Inc." \
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
  "amount": "€39.99",
  "payee": "Acme Inc.",
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

> \[!NOTE]
>
> For some regions, Twilio is unable to return carrier and cellphone data by default. To enable these regions, contact [Twilio Support](https://help.twilio.com).
>
> More information can be found in [the Help Center](https://help.twilio.com/hc/en-us/articles/360004563433).

### Complete a transaction verification

To check if a verification code is correct, send an `HTTP POST` request to your PSD2-enabled Service's Verification Check resource. This request must contain the `Code`, `To` (e.g., the user's phone number), `Amount`, and `Payee` parameters. A sample request is shown in the example below.

Complete a PSD2 Verification

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
      amount: "€39.99",
      code: "1234",
      payee: "Acme Inc.",
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
).verification_checks.create(
    to="+15017122661", code="1234", amount="€39.99", payee="Acme Inc."
)

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
            code: "1234",
            amount: "€39.99",
            payee: "Acme Inc.",
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
                                                  .setCode("1234")
                                                  .setAmount("€39.99")
                                                  .setPayee("Acme Inc.")
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
	params.SetCode("1234")
	params.SetAmount("€39.99")
	params.SetPayee("Acme Inc.")

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
        "code" => "1234",
        "amount" => "€39.99",
        "payee" => "Acme Inc.",
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
                       code: '1234',
                       amount: '€39.99',
                       payee: 'Acme Inc.'
                     )

puts verification_check.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --code 1234 \
   --amount €39.99 \
   --payee "Acme Inc."
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Code=1234" \
--data-urlencode "Amount=€39.99" \
--data-urlencode "Payee=Acme Inc." \
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
  "amount": "€39.99",
  "payee": "Acme Inc.",
  "sna_attempts_error_codes": [],
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z"
}
```

### Cancel a transaction verification

In some instances, the details of a transaction may change before it can be completed. When that occurs, you can cancel an in-progress transaction verification by updating the `Status` of the Verification resource. An example of this request is shown below.

This prevents a user from verifying an out-of-date transaction.

That transactions that have been successfully verified cannot be canceled.

Cancel a Transaction Verification

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

  console.log(verification.sid);
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

        var verification = await VerificationResource.UpdateAsync(
            status: VerificationResource.StatusEnum.Canceled,
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        Verification verification = Verification
                                        .updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                            "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                            Verification.Status.CANCELED)
                                        .update();

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

	params := &verify.UpdateVerificationParams{}
	params.SetStatus("canceled")

	resp, err := client.VerifyV2.UpdateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->verifications("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "canceled" // Status
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
               .verifications('VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .update(status: 'canceled')

puts verification.sid
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
