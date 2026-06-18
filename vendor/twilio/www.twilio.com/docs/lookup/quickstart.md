# Lookup v2 Quickstart

The Lookup API allows you to query information on a phone number so that you can make a trusted interaction with your user. With Lookup, you can format and validate phone numbers with the free Basic Lookup request to increase deliverability and get detailed information on a number's carrier and caller by adding on optional data packages. See [Lookup v2 API Reference](/docs/lookup/v2-api) for more details on Lookup's capabilities.

In this Quickstart we will explore how to get started with Lookup and learn how to make these requests:

* **Basic Lookup**: Returns the phone number in [E.164](/docs/glossary/what-e164) and national formats and performs basic phone number validation. This is a free feature.
* **Line Type Intelligence Lookup**: Returns the line type of a phone number including mobile, landline, fixed VoIP, non-fixed VoIP, toll-free, and more. This is a paid feature, [learn more about Lookup pricing here](https://www.twilio.com/en-us/trusted-activation/pricing/lookup).

## Setup: Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

## Setup: Base API URL

All Lookup requests begin with an HTTP `GET` request to this base URL:

```xml
https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

`{PhoneNumber}` is the only required parameter and represents the phone number you are querying in E.164 or national format. If the phone number is provided in national format, please also specify the country in the optional parameter `CountryCode`. Otherwise, `CountryCode` will default to US.

> \[!WARNING]
>
> In some cases, non-US phone numbers in national format with no + sign or CountryCode query parameter are being processed as valid. This is not changing in V1 in the future but it is an unintended behavior and could lead to ambiguous validation responses.

## Perform a Basic Lookup

A Basic Lookup returns the provided phone number in E.164 and national formats and validates the phone number. Note that this is a free feature.

Let's try it out by making this cURL request in our terminal, replacing the `PhoneNumber`, `YOUR_ACCOUNT_SID`, and `YOUR_AUTH_TOKEN` variables with your own data:

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

You should see a response similar to this one:

```json
{
    "calling_country_code": "1",
    "country_code": "US",
    "phone_number": "+14159929960",
    "national_format": "(415) 992-9960",
    "valid": true,
    "validation_errors": null,
    "caller_name": null,
    "sim_swap": null,
    "call_forwarding": null,
    "live_activity": null,
    "line_type_intelligence": null,
    "identity_match": null,
    "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

The fields `calling_country_code`, `country_code`, `phone_number`, and `national_format` provide formatting information and the `valid` field indicates if the phone number could be a valid assigned number.

See this example below for how you can use a Twilio SDK in your preferred language to perform the same request.

Basic Lookup

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v2
    .phoneNumbers("+14159929960")
    .fetch();

  console.log(phoneNumber.phoneNumber);
}

fetchPhoneNumber();
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

phone_number = client.lookups.v2.phone_numbers("+14159929960").fetch()

print(phone_number.phone_number)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(pathPhoneNumber: "+14159929960");

        Console.WriteLine(phoneNumber.PhoneNumber);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.lookups.v2.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+14159929960").fetch();

        System.out.println(phoneNumber.getPhoneNumber());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	lookups "github.com/twilio/twilio-go/rest/lookups/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}

	resp, err := client.LookupsV2.FetchPhoneNumber("+14159929960",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.PhoneNumber != nil {
			fmt.Println(*resp.PhoneNumber)
		} else {
			fmt.Println(resp.PhoneNumber)
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

$phone_number = $twilio->lookups->v2->phoneNumbers("+14159929960")->fetch();

print $phone_number->phoneNumber;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .lookups
               .v2
               .phone_numbers('+14159929960')
               .fetch

puts phone_number.phone_number
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +14159929960
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B14159929960" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+14159929960",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

## Introducing Lookup's data packages

Lookup supports a number of data packages that allow you to query for additional carrier and caller information relating to a phone number. See [Lookup v2 API Reference](/docs/lookup/v2-api) for a full list of available packages and how to onboard to each one.

In this Quickstart, we'll explain how to use the Line Type Intelligence package.

### Perform a Line Type Intelligence Lookup

The Line Type Intelligence package allows you to get the line type of a phone number including mobile, landline, fixed VoIP, non-fixed VoIP, toll-free, and more. Note that this is a paid feature.

The video below shows how to check a phone number's line type with Lookup using Node.js and the Twilio Node [SDK](/docs/libraries).

https://www.youtube.com/watch?v=d8GfbPBaSuM

To make a Line Type Intelligence request, build on the API base URL by adding the `Fields` parameter with the value `line_type_intelligence`.

Make the following cURL request in the terminal, replacing the `PhoneNumber`, `YOUR_ACCOUNT_SID`, and `YOUR_AUTH_TOKEN` variables with your own data:

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=line_type_intelligence" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Let's check the response:

```json
{
    "calling_country_code": "1",
    "country_code": "US",
    "phone_number": "+14159929960",
    "national_format": "(415) 992-9960",
    "valid": true,
    "validation_errors": null,
    "caller_name": null,
    "sim_swap": null,
    "call_forwarding": null,
    "live_activity": null,
    "line_type_intelligence":
    {
        "error_code": null,
        "mobile_country_code": "240",
        "mobile_network_code": "38",
        "carrier_name": "Twilio - SMS/MMS-SVR",
        "type": "nonFixedVoip"
    },
    "identity_match": null,
    "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

All of the fields we saw in the previous Basic Lookup request are present along with new information included in the `line_type_intelligence` object.

Line Type Intelligence Lookup

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v2
    .phoneNumbers("+14159929960")
    .fetch({ fields: "line_type_intelligence" });

  console.log(phoneNumber.lineTypeIntelligence);
}

fetchPhoneNumber();
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

phone_number = client.lookups.v2.phone_numbers("+14159929960").fetch(
    fields="line_type_intelligence"
)

print(phone_number.line_type_intelligence)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathPhoneNumber: "+14159929960", fields: "line_type_intelligence");

        Console.WriteLine(phoneNumber._LineTypeIntelligence);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.lookups.v2.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+14159929960").setFields("line_type_intelligence").fetch();

        System.out.println(phoneNumber.getLineTypeIntelligence());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	lookups "github.com/twilio/twilio-go/rest/lookups/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}
	params.SetFields("line_type_intelligence")

	resp, err := client.LookupsV2.FetchPhoneNumber("+14159929960",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.LineTypeIntelligence != (lookups.LineTypeIntelligenceInfo{}) {
			fmt.Println(resp.LineTypeIntelligence)
		} else {
			fmt.Println(resp.LineTypeIntelligence)
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

$phone_number = $twilio->lookups->v2
    ->phoneNumbers("+14159929960")
    ->fetch(["fields" => "line_type_intelligence"]);

print $phone_number->lineTypeIntelligence;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .lookups
               .v2
               .phone_numbers('+14159929960')
               .fetch(fields: 'line_type_intelligence')

puts phone_number.line_type_intelligence
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +14159929960 \
   --fields line_type_intelligence
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B14159929960?Fields=line_type_intelligence" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+14159929960",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": {
    "error_code": null,
    "mobile_country_code": "240",
    "mobile_network_code": "38",
    "carrier_name": "Twilio - SMS/MMS-SVR",
    "type": "nonFixedVoip"
  },
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```
