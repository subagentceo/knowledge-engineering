# Test Credentials

Twilio provides [test credentials](#find-your-test-credentials) you can use to exercise parts of the REST API without incurring charges.

You use test credentials the same way you use your live credentials, except that you can't sign in to the [Twilio CLI](/docs/twilio-cli) with them. When you authenticate with test credentials, **Twilio doesn't charge your account, update the state of your account, or connect to real phone numbers**. You can therefore simulate buying a phone number or sending an SMS without affecting production data.

To protect production data, requests that use test credentials can't interact with resources in your live account. For example, a request made with test credentials can't specify a live account phone number as the `From` phone number.

## Find your test credentials

To find your test credentials:

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. Go to the [API keys & tokens](https://www.twilio.com/console/project/api-keys) page.
3. Scroll down to the **Test credentials** section and retrieve your test **Account SID** and **Test Auth Token**.
   If you're using the legacy Twilio Console go to **Admin** > **Account management** to access the **API keys & tokens** page.

## Supported resources

As of now, test credentials can interact with the following resources:

* Buying phone numbers: `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/IncomingPhoneNumbers`
* Sending SMS messages: `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Messages`
* Making calls: `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Calls`
* Lookup: `GET https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}`

Requests to any other resource with test credentials return a `403 Forbidden` status code. Additional resources might be supported in the future.

> \[!WARNING]
>
> SMS messages and calls sent by using test credentials don't trigger status callbacks. Learn more about [status callbacks for outbound SMS](/docs/usage/webhooks/messaging-webhooks#outbound-message-status-callback) and [status callbacks for Voice](/docs/voice/api/call-resource#statuscallback).

## Magic input

When you make an API request with test credentials, Twilio validates the input exactly as it does for live credentials. In some cases, request validity depends on Twilio's current state. For example, buying a phone number that has already been purchased returns an error.

To write automated tests that expect specific errors, use **magic input** values. For instance, the magic phone number `+15005550000`, when sent as the `PhoneNumber` parameter in a `POST` to `IncomingPhoneNumbers`, always returns the "number unavailable" error.

Magic inputs depend on the endpoint you're testing and are detailed below.

**Note**: you can't use magic input values with live credentials. Only test
credentials work with magic input values.

## Test buying a number

You can test the phone numbers API without provisioning a number or incurring charges by using your test credentials.

Send a `POST` request to the standard phone-number purchase endpoint, authenticating with your test credentials and using your `TestAccountSid` in the URL:

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/IncomingPhoneNumbers
```

### Parameters \[#test-incoming-phone-numbers-parameters]

All standard [phone-number purchase parameters](/docs/phone-numbers/api/incomingphonenumber-resource#incomingphonenumber-properties) work with test credentials. The following magic input values generate success and failure cases.

#### PhoneNumber \[#test-incoming-phone-numbers-parameters-PhoneNumber]

| Value        | Description                          | Error code                      |
| ------------ | ------------------------------------ | ------------------------------- |
| +15005550000 | Phone number is unavailable.         | [21422](/docs/api/errors/21422) |
| +15005550001 | Phone number is invalid.             | [21421](/docs/api/errors/21421) |
| +15005550006 | Phone number is valid and available. | No error                        |

#### AreaCode \[#test-incoming-phone-numbers-parameters-AreaCode]

| Value | Description                                         | Error code                      |
| ----- | --------------------------------------------------- | ------------------------------- |
| 533   | No available phone numbers in this area code.       | [21452](/docs/api/errors/21452) |
| 500   | At least one number is available in this area code. | No error                        |

#### Example 1 \[#test-incoming-phone-numbers-example-1]

Using your [test credentials](#find-your-test-credentials), provision a number successfully by purchasing the magic number `+15005550006`. Any additional parameters, such as `VoiceUrl` or `StatusCallback`, are echoed in the response.

Purchase a number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createIncomingPhoneNumber() {
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: "+15005550006",
    voiceUrl: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(incomingPhoneNumber.accountSid);
}

createIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers.create(
    phone_number="+15005550006",
    voice_url="http://demo.twilio.com/docs/voice.xml",
)

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.CreateAsync(
            phoneNumber: new Twilio.Types.PhoneNumber("+15005550006"),
            voiceUrl: new Uri("http://demo.twilio.com/docs/voice.xml"));

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber =
            IncomingPhoneNumber.creator(new com.twilio.type.PhoneNumber("+15005550006"))
                .setVoiceUrl(URI.create("http://demo.twilio.com/docs/voice.xml"))
                .create();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.CreateIncomingPhoneNumberParams{}
	params.SetPhoneNumber("+15005550006")
	params.SetVoiceUrl("http://demo.twilio.com/docs/voice.xml")

	resp, err := client.Api.CreateIncomingPhoneNumber(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$incoming_phone_number = $twilio->incomingPhoneNumbers->create([
    "phoneNumber" => "+15005550006",
    "voiceUrl" => "http://demo.twilio.com/docs/voice.xml",
]);

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers
                        .create(
                          phone_number: '+15005550006',
                          voice_url: 'http://demo.twilio.com/docs/voice.xml'
                        )

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:create \
   --phone-number +15005550006 \
   --voice-url http://demo.twilio.com/docs/voice.xml
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers.json" \
--data-urlencode "PhoneNumber=+15005550006" \
--data-urlencode "VoiceUrl=http://demo.twilio.com/docs/voice.xml" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+15005550006",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "http://demo.twilio.com/docs/voice.xml",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

#### Example 2 \[#test-incoming-phone-numbers-example-2]

Using your [test credentials](#find-your-test-credentials), attempt to purchase an unavailable number by passing the magic number `+15005550000`.

Attempt to purchase an unavailable number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createIncomingPhoneNumber() {
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: "+15005550000",
  });

  console.log(incomingPhoneNumber.accountSid);
}

createIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers.create(
    phone_number="+15005550000"
)

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.CreateAsync(
            phoneNumber: new Twilio.Types.PhoneNumber("+15005550000"));

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber =
            IncomingPhoneNumber.creator(new com.twilio.type.PhoneNumber("+15005550000")).create();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.CreateIncomingPhoneNumberParams{}
	params.SetPhoneNumber("+15005550000")

	resp, err := client.Api.CreateIncomingPhoneNumber(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$incoming_phone_number = $twilio->incomingPhoneNumbers->create([
    "phoneNumber" => "+15005550000",
]);

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers
                        .create(phone_number: '+15005550000')

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:create \
   --phone-number +15005550000
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers.json" \
--data-urlencode "PhoneNumber=+15005550000" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+15005550000",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://example.com",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

#### Example 3: Attempt to buy an invalid number \[#test-post-example-3]

Using your [test credentials](#find-your-test-credentials), specify an invalid number as input. Very short or very long strings fail validation.

Attempt to purchase an invalid number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createIncomingPhoneNumber() {
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: "33",
  });

  console.log(incomingPhoneNumber.accountSid);
}

createIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers.create(phone_number="33")

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.CreateAsync(
            phoneNumber: new Twilio.Types.PhoneNumber("33"));

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber =
            IncomingPhoneNumber.creator(new com.twilio.type.PhoneNumber("33")).create();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.CreateIncomingPhoneNumberParams{}
	params.SetPhoneNumber("33")

	resp, err := client.Api.CreateIncomingPhoneNumber(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$incoming_phone_number = $twilio->incomingPhoneNumbers->create([
    "phoneNumber" => "33",
]);

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers
                        .create(phone_number: '33')

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:create \
   --phone-number 33
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers.json" \
--data-urlencode "PhoneNumber=33" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "33",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://example.com",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

## Test sending an SMS \[#test-sms-messages]

You can test the Messages API without sending an SMS or incurring charges by using your test credentials.

Send a `POST` request to the standard SMS endpoint, authenticating with your test credentials and using your `TestAccountSid` in the URL:

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Messages
```

### Parameters \[#test-sms-messages-parameters]

All standard [outbound SMS parameters](/docs/messaging/quickstart) work, except for `MessagingServiceSid`. The following magic input values generate success and failure cases.

#### From \[#test-sms-messages-parameters-From]

Your test credentials don't have access to verified `From` phone numbers in your live account. Use the following magic numbers:

| Value        | Description                                                | Error code                      |
| ------------ | ---------------------------------------------------------- | ------------------------------- |
| +15005550001 | Phone number is invalid.                                   | [21212](/docs/api/errors/21212) |
| +15005550007 | Number is not owned by your account or is not SMS-capable. | [21606](/docs/api/errors/21606) |
| +15005550008 | SMS message queue for this number is full.                 | [21611](/docs/api/errors/21611) |
| +15005550006 | Number passes all validation.                              | No error                        |
| All others   | Number is not owned by your account or is not SMS-capable. | [21606](/docs/api/errors/21606) |

#### To \[#test-sms-messages-parameters-To]

| Value        | Description                                                                                        | Error code                      |
| ------------ | -------------------------------------------------------------------------------------------------- | ------------------------------- |
| +15005550001 | Phone number is invalid.                                                                           | [21211](/docs/api/errors/21211) |
| +15005550002 | Twilio can't route to this number.                                                                 | [21612](/docs/api/errors/21612) |
| +15005550003 | Account lacks [international permissions](/user/account/international) to send SMS to this number. | [21408](/docs/api/errors/21408) |
| +15005550004 | Number is blocked for your account.                                                                | [21610](/docs/api/errors/21610) |
| +15005550009 | Number can't receive SMS messages.                                                                 | [21614](/docs/api/errors/21614) |
| All others   | Number is validated normally.                                                                      | Input-dependent                 |

#### Example 1 \[#test-sms-messages-example-1]

Using your [test credentials](#find-your-test-credentials), send an SMS by using the magic number `+15005550006` as the `From` number and any valid phone number as the `To` number.

Create a message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "All in the game, yo",
    from: "+15005550006",
    to: "+5571981265131",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    body="All in the game, yo", from_="+15005550006", to="+5571981265131"
)

print(message.body)
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

        var message = await MessageResource.CreateAsync(
            body: "All in the game, yo",
            from: new Twilio.Types.PhoneNumber("+15005550006"),
            to: new Twilio.Types.PhoneNumber("+5571981265131"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+5571981265131"),
                                  new com.twilio.type.PhoneNumber("+15005550006"),
                                  "All in the game, yo")
                              .create();

        System.out.println(message.getBody());
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

	params := &api.CreateMessageParams{}
	params.SetBody("All in the game, yo")
	params.SetFrom("+15005550006")
	params.SetTo("+5571981265131")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "+5571981265131", // To
    [
        "body" => "All in the game, yo",
        "from" => "+15005550006",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            body: 'All in the game, yo',
            from: '+15005550006',
            to: '+5571981265131'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "All in the game, yo" \
   --from +15005550006 \
   --to +5571981265131
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=All in the game, yo" \
--data-urlencode "From=+15005550006" \
--data-urlencode "To=+5571981265131" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "All in the game, yo",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15005550006",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+5571981265131",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

#### Example 2 \[#test-sms-messages-example-2]

Using your [test credentials](#find-your-test-credentials), attempt to send a message to a non-mobile number by passing the magic number `+15005550009` as the `To` number.

Attempt to send a message to a non-mobile number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hey Mr Nugget, you the bomb!",
    from: "+15005550006",
    to: "+15005550009",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    body="Hey Mr Nugget, you the bomb!", from_="+15005550006", to="+15005550009"
)

print(message.body)
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

        var message = await MessageResource.CreateAsync(
            body: "Hey Mr Nugget, you the bomb!",
            from: new Twilio.Types.PhoneNumber("+15005550006"),
            to: new Twilio.Types.PhoneNumber("+15005550009"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15005550009"),
                                  new com.twilio.type.PhoneNumber("+15005550006"),
                                  "Hey Mr Nugget, you the bomb!")
                              .create();

        System.out.println(message.getBody());
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

	params := &api.CreateMessageParams{}
	params.SetBody("Hey Mr Nugget, you the bomb!")
	params.SetFrom("+15005550006")
	params.SetTo("+15005550009")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "+15005550009", // To
    [
        "body" => "Hey Mr Nugget, you the bomb!",
        "from" => "+15005550006",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            body: 'Hey Mr Nugget, you the bomb!',
            from: '+15005550006',
            to: '+15005550009'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "Hey Mr Nugget, you the bomb$EXCLAMATION_MARK" \
   --from +15005550006 \
   --to +15005550009
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Hey Mr Nugget, you the bomb$EXCLAMATION_MARK" \
--data-urlencode "From=+15005550006" \
--data-urlencode "To=+15005550009" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hey Mr Nugget, you the bomb!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15005550006",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15005550009",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

#### Example 3 \[#test-sms-messages-example-3]

Using your [test credentials](#find-your-test-credentials), attempt to send a message with an empty SMS body. No magic numbers are required; the validation error is raised normally.

Attempt to send a message with an empty SMS body

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "",
    from: "+15005550006",
    to: "+14108675310",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    body="", from_="+15005550006", to="+14108675310"
)

print(message.body)
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

        var message = await MessageResource.CreateAsync(
            body: "",
            from: new Twilio.Types.PhoneNumber("+15005550006"),
            to: new Twilio.Types.PhoneNumber("+14108675310"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+14108675310"),
                                  new com.twilio.type.PhoneNumber("+15005550006"),
                                  "")
                              .create();

        System.out.println(message.getBody());
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

	params := &api.CreateMessageParams{}
	params.SetBody("")
	params.SetFrom("+15005550006")
	params.SetTo("+14108675310")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "+14108675310", // To
    [
        "body" => "",
        "from" => "+15005550006",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            body: '',
            from: '+15005550006',
            to: '+14108675310'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "" \
   --from +15005550006 \
   --to +14108675310
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=" \
--data-urlencode "From=+15005550006" \
--data-urlencode "To=+14108675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15005550006",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+14108675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Test making a call \[#test-calls]

You can test the Calls API without placing a real call or incurring charges by using your test credentials. Because no call is placed, Twilio doesn't request the URL specified in the `Url` parameter and no TwiML is executed.

Send a `POST` request to the standard outbound call endpoint, authenticating with your test credentials and using your `TestAccountSid` in the URL:

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Calls
```

### Parameters \[#test-calls-parameters]

All standard [outbound call parameters](/docs/voice/api/call-resource) work. The following magic input values generate success and failure cases.

#### From \[#test-calls-parameters-From]

Use the following magic numbers as the `From` phone number:

| Value        | Description                             | Error code                      |
| ------------ | --------------------------------------- | ------------------------------- |
| +15005550001 | Phone number is invalid.                | [21212](/docs/api/errors/21212) |
| +15005550006 | Valid `From` number for your account.   | No error                        |
| All others   | Number isn't verified for your account. | [21210](/docs/api/errors/21210) |

#### To \[#test-calls-parameters-To]

| Value        | Description                                                                                 | Error code                      |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------- |
| +15005550001 | Phone number is invalid.                                                                    | [21217](/docs/api/errors/21217) |
| +15005550002 | Twilio can't route to this number.                                                          | [21214](/docs/api/errors/21214) |
| +15005550003 | Account lacks [international permissions](/user/account/international) to call this number. | [21215](/docs/api/errors/21215) |
| +15005550004 | Number is blocked for your account.                                                         | [21216](/docs/api/errors/21216) |
| All others   | Number is validated normally.                                                               | Input-dependent                 |

#### Example 1 \[#test-calls-example-1]

Using your [test credentials](#find-your-test-credentials), enqueue an outgoing call successfully by using the magic number `+15005550006` as the `From` number and any valid phone number as the `To` number.

Making a call

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
    from: "+15005550006",
    to: "+14108675310",
    url: "http://demo.twilio.com/docs/voice.xml",
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
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14108675310",
    from_="+15005550006",
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
            url: new Uri("http://demo.twilio.com/docs/voice.xml"),
            to: new Twilio.Types.PhoneNumber("+14108675310"),
            from: new Twilio.Types.PhoneNumber("+15005550006"));

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
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+14108675310"),
                            new com.twilio.type.PhoneNumber("+15005550006"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
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
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetTo("+14108675310")
	params.SetFrom("+15005550006")

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
    "+14108675310", // To
    "+15005550006", // From
    ["url" => "http://demo.twilio.com/docs/voice.xml"]
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
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+14108675310',
         from: '+15005550006'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --url http://demo.twilio.com/docs/voice.xml \
   --to +14108675310 \
   --from +15005550006
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "To=+14108675310" \
--data-urlencode "From=+15005550006" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15005550006",
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
  "to": "+14108675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

#### Example 2 \[#test-calls-example-2]

Using your [test credentials](#find-your-test-credentials), attempt to call an international number in a country without permissions enabled by passing the magic number `+15005550003` as the `To` number.

Making a call to an international number in a country without permissions turned on

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
    from: "+15005550006",
    to: "+15005550003",
    url: "http://demo.twilio.com/docs/voice.xml",
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
    url="http://demo.twilio.com/docs/voice.xml",
    to="+15005550003",
    from_="+15005550006",
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
            url: new Uri("http://demo.twilio.com/docs/voice.xml"),
            to: new Twilio.Types.PhoneNumber("+15005550003"),
            from: new Twilio.Types.PhoneNumber("+15005550006"));

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
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+15005550003"),
                            new com.twilio.type.PhoneNumber("+15005550006"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
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
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetTo("+15005550003")
	params.SetFrom("+15005550006")

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
    "+15005550003", // To
    "+15005550006", // From
    ["url" => "http://demo.twilio.com/docs/voice.xml"]
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
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+15005550003',
         from: '+15005550006'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --url http://demo.twilio.com/docs/voice.xml \
   --to +15005550003 \
   --from +15005550006
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "To=+15005550003" \
--data-urlencode "From=+15005550006" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15005550006",
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
  "to": "+15005550003",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

## Test Lookup \[#test-lookup]

For details on testing Lookup with test credentials, see [Magic Numbers for Lookup](https://www.twilio.com/docs/lookup/magic-numbers-for-lookup).
