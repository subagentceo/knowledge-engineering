# Lookup v1 Tutorial: Validation and Formatting

> \[!WARNING]
>
> [Version 2 of the Lookup API is now available!](/docs/lookup/v2-api) Lookup v2 has an improved developer experience and exciting features, such as [Twilio Regions support](/docs/lookup/using-lookup-with-twilio-regions) and these new data packages:
>
> * **Line Type Intelligence** : Get the line type of a phone number including mobile, landline, fixed VoIP, non-fixed VoIP, toll-free, and more.
> * **SIM Swap** : Get information on the last SIM change for a mobile phone number.
> * **Call Forwarding** : Get the unconditional call forwarding status of a mobile phone number.
> * **Identity Match** : Get confirmation of ownership for a mobile phone number by comparing user-provided information against authoritative phone-based data sources.
>
> **You are currently viewing Version 1 content.** Lookup v1 will be maintained for the time being, but any new features and development will be on v2. We strongly encourage you to do any new development with Lookup v2. Check out the [migration guide](https://www.twilio.com/blog/migrate-lookup-v2) or the [API v2 Reference](/docs/lookup/v2-api) for more information.

[Twilio Lookup](/docs/lookup) can help you check that phone numbers you receive from your users are real. It can also provide you with the local format of an international phone number.

This guide will show you how to perform both kinds of lookups. You can skip to the [carrier and caller name guide](/docs/lookup/v1-api/carrier-and-caller-name) to learn about other information Lookup can provide about a phone number.

## Validate a national phone number

Given a national phone number and an [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements), Lookup will confirm the phone number is valid and return the number in its [E.164 format](https://en.wikipedia.org/wiki/E.164).

Lookup with National Formatted Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v1
    .phoneNumbers("(510)867-5310")
    .fetch({ countryCode: "US" });

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

phone_number = client.lookups.v1.phone_numbers("(510)867-5310").fetch(
    country_code="US"
)

print(phone_number.phone_number)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathPhoneNumber: "(510)867-5310", countryCode: "US");

        Console.WriteLine(phoneNumber.PhoneNumber);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.lookups.v1.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("(510)867-5310").setCountryCode("US").fetch();

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
	lookups "github.com/twilio/twilio-go/rest/lookups/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}
	params.SetCountryCode("US")

	resp, err := client.LookupsV1.FetchPhoneNumber("(510)867-5310",
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

$phone_number = $twilio->lookups->v1
    ->phoneNumbers("(510)867-5310")
    ->fetch(["countryCode" => "US"]);

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
               .v1
               .phone_numbers('(510)867-5310')
               .fetch(country_code: 'US')

puts phone_number.phone_number
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number "(510)867-5310" \
   --country-code US
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/(510)867-5310?CountryCode=US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "carrier": null,
  "add_ons": null,
  "country_code": "US",
  "national_format": "(510) 867-5310",
  "phone_number": "(510)867-5310",
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310"
}
```

If the number is invalid, this request will return an HTTP 404 status code.

If you plan to store the phone number after validating, we recommend storing the full E.164 formatted number returned in the phone number field. Most other Twilio services require the E.164 format for phone numbers.

## Format an International Phone Number

If you send Lookup an internationally formatted phone number, you can get the correct national format for that phone number from the national format field.

Lookup with International Formatted Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v1
    .phoneNumbers("+4402077651182")
    .fetch();

  console.log(phoneNumber.nationalFormat);
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

phone_number = client.lookups.v1.phone_numbers("+4402077651182").fetch()

print(phone_number.national_format)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(pathPhoneNumber: "+4402077651182");

        Console.WriteLine(phoneNumber.NationalFormat);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.lookups.v1.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+4402077651182").fetch();

        System.out.println(phoneNumber.getNationalFormat());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	lookups "github.com/twilio/twilio-go/rest/lookups/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}

	resp, err := client.LookupsV1.FetchPhoneNumber("+4402077651182",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.NationalFormat != nil {
			fmt.Println(*resp.NationalFormat)
		} else {
			fmt.Println(resp.NationalFormat)
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

$phone_number = $twilio->lookups->v1->phoneNumbers("+4402077651182")->fetch();

print $phone_number->nationalFormat;
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
               .v1
               .phone_numbers('+4402077651182')
               .fetch

puts phone_number.national_format
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +4402077651182
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B4402077651182" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "carrier": {
    "error_code": null,
    "mobile_country_code": null,
    "mobile_network_code": null,
    "name": "Vodafone Business Solutions",
    "type": "landline"
  },
  "country_code": "GB",
  "national_format": "020 7765 1182",
  "phone_number": "+4402077651182",
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+4402077651182"
}
```

Though most other Twilio services require the E.164 formatted number, the national format is often better to display to end users.

Lookup can tell you even more about a phone number. Check out the [carrier and caller name guide](/docs/lookup/v1-api/carrier-and-caller-name) to learn how.
