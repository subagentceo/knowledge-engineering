# Verification Check

Use the VerificationCheck resource to validate that the user-provided token is correct.

**Prerequisites**:

1. [Create a Verification Service](/docs/verify/api/service)
2. [Start a Verification](/docs/verify/api/verification)

## VerificationCheck Response Properties

These fields are returned in the output JSON response. The type `SID<VE>` is a unique ID starting with the letters VE.

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.service.verification_check","modelName":"verify_v2_service_verification_check","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VE[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the VerificationCheck resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the VerificationCheck resource."},"to":{"type":"string","nullable":true,"description":"The phone number or [email](https://www.twilio.com/docs/verify/email) being verified. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"channel":{"type":"string","enum":["sms","call","email","whatsapp","sna"],"description":"The verification method to use. One of: [`email`](https://www.twilio.com/docs/verify/email), `sms`, `whatsapp`, `call`, or `sna`.","refName":"verification_check_enum_channel","modelName":"verification_check_enum_channel"},"status":{"type":"string","nullable":true,"description":"The status of the verification. Can be: `pending`, `approved`, `canceled`, `max_attempts_reached`, `deleted`, `failed` or `expired`."},"valid":{"type":"boolean","nullable":true,"description":"Use \"status\" instead. Legacy property indicating whether the verification was successful."},"amount":{"type":"string","nullable":true,"description":"The amount of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"payee":{"type":"string","nullable":true,"description":"The payee of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the Verification Check resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the Verification Check resource was last updated."},"sna_attempts_error_codes":{"type":"array","nullable":true,"description":"List of error codes as a result of attempting a verification using the `sna` channel. The error codes are chronologically ordered, from the first attempt to the latest attempt. This will be an empty list if no errors occured or `null` if the last channel used wasn't `sna`."}}}} />

## Check a Verification

`POST https://verify.twilio.com/v2/Services/{ServiceSid}/VerificationCheck`

> \[!WARNING]
>
> Twilio deletes the verification SID once it's:
>
> * expired (after 10 minutes)
> * approved
> * max check attempts reached
>
> If any of these events occur, the VerificationCheck request returns a `404 Not Found` error similar to the following example:
>
> ```bash
> Unable to create record: The requested resource /Services/VAXXXXXXXXXXXXX/VerificationCheck was not found
> ```
>
> To review what happened to a specific verification, use the [Verify Logs in the Twilio Console](https://console.twilio.com/us1/monitor/logs/verify-logs).

You can pass the following input parameters. A `SID<VE>` value is a unique ID that starts with VE.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the verification [Service](https://www.twilio.com/docs/verify/api/service) to create the resource under.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateVerificationCheckRequest","properties":{"Code":{"type":"string","description":"The 4-10 character string being verified."},"To":{"type":"string","description":"The phone number or [email](https://www.twilio.com/docs/verify/email) to verify. Either this parameter or the `verification_sid` must be specified. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"VerificationSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VE[0-9a-fA-F]{32}$","description":"A SID that uniquely identifies the Verification Check. Either this parameter or the `to` phone number/[email](https://www.twilio.com/docs/verify/email) must be specified."},"Amount":{"type":"string","description":"The amount of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"Payee":{"type":"string","description":"The payee of the associated PSD2 compliant transaction. Requires the PSD2 Service flag enabled.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":1}}},"SnaClientToken":{"type":"string","description":"A sna client token received in sna url invocation response needs to be passed in Verification Check request and should match to get successful response."}}},"examples":{"verificationChecks":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"1234\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"1234\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerificationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Code\"","#7EE787"],[":","#C9D1D9"]," ",["\"1234\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Amount\"","#7EE787"],[":","#C9D1D9"]," ",["\"€39.99\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Payee\"","#7EE787"],[":","#C9D1D9"]," ",["\"Acme Inc.\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"emailVerificationChecks":{"value":{"lang":"json","value":"{\n  \"To\": \"recipient@foo.com\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"123456\"\n}","meta":"","code":"{\n  \"To\": \"recipient@foo.com\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"123456\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"recipient@foo.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerificationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Code\"","#7EE787"],[":","#C9D1D9"]," ",["\"123456\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"verificationChecks200":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"1234\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\",\n  \"VerificationSid\": \"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Code\": \"1234\",\n  \"Amount\": \"€39.99\",\n  \"Payee\": \"Acme Inc.\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerificationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Code\"","#7EE787"],[":","#C9D1D9"]," ",["\"1234\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Amount\"","#7EE787"],[":","#C9D1D9"]," ",["\"€39.99\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Payee\"","#7EE787"],[":","#C9D1D9"]," ",["\"Acme Inc.\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"snaVerificationChecks":{"value":{"lang":"json","value":"{\n  \"To\": \"+15017122661\"\n}","meta":"","code":"{\n  \"To\": \"+15017122661\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15017122661\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Check a Verification with a Phone Number

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
      code: "1234",
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
).verification_checks.create(to="+15017122661", code="1234")

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
            to: "+15017122661", code: "1234", pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
                       code: '1234'
                     )

puts verification_check.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --code 1234
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Code=1234" \
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

Check a Verification with an Email

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
      to: "recipient@foo.com",
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
).verification_checks.create(to="recipient@foo.com", code="123456")

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
            to: "recipient@foo.com",
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
                                                  .setTo("recipient@foo.com")
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
	params.SetTo("recipient@foo.com")
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
        "to" => "recipient@foo.com",
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
                       to: 'recipient@foo.com',
                       code: '123456'
                     )

puts verification_check.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to recipient@foo.com \
   --code 123456
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=recipient@foo.com" \
--data-urlencode "Code=123456" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "recipient@foo.com",
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

Check a Verification with a SID

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
      code: "1234",
      verificationSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    verification_sid="VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", code="1234"
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
            verificationSid: "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            code: "1234",
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
                                                  .setVerificationSid("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                  .setCode("1234")
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
	params.SetVerificationSid("VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetCode("1234")

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
        "verificationSid" => "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "code" => "1234",
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
                       verification_sid: 'VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                       code: '1234'
                     )

puts verification_check.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --verification-sid VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --code 1234
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "VerificationSid=VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Code=1234" \
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

Check a Silent Network Auth Verification with Error Codes

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
    .verificationChecks.create({ to: "+15017122661" });

  console.log(verificationCheck.sid);
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
).verification_checks.create(to="+15017122661")

print(verification_check.sid)
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
            to: "+15017122661", pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verificationCheck.Sid);
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
        VerificationCheck verificationCheck =
            VerificationCheck.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setTo("+15017122661").create();

        System.out.println(verificationCheck.getSid());
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

	resp, err := client.VerifyV2.CreateVerificationCheck("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$verification_check = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verificationChecks->create(["to" => "+15017122661"]);

print $verification_check->sid;
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
                     .create(to: '+15017122661')

puts verification_check.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=+15017122661" \
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

An SNA VerificationCheck can display a `status` value of `approved` while still listing error codes in `sna_attempts_error_codes`. This situation occurs when an earlier SNA verification attempt fails and produces an error code, but a later attempt succeeds and approves the verification.
