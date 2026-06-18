# Lookup v1 Tutorial: Carrier and Caller Name

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

Given a phone number, [Twilio Lookup](/docs/lookup) can identify the number's carrier and what type of phone it is (landline, mobile, or VoIP). In the U.S., Lookup can also retrieve the name of the person or business associated with a phone number (if available).

Lookup can show you even more information about a phone number using Twilio Marketplace Add-ons. [See the How to Use Add-on Listings guide to learn more](/docs/marketplace/listings/usage#add-on-listings).

## Identify a phone number's carrier and type

To discover a phone number's carrier and what type of phone it is, pass an extra argument to your lookup requesting carrier information.

Lookup with E.164 Formatted Number

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
    .phoneNumbers("+15108675310")
    .fetch({ type: ["carrier"] });

  console.log(phoneNumber.carrier);
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

phone_number = client.lookups.v1.phone_numbers("+15108675310").fetch(
    type=["carrier"]
)

print(phone_number.carrier)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathPhoneNumber: "+15108675310", type: new List<string> { "carrier" });

        Console.WriteLine(phoneNumber.Carrier);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.lookups.v1.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+15108675310").setType(Arrays.asList("carrier")).fetch();

        System.out.println(phoneNumber.getCarrier());
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
	params.SetType([]string{
		"carrier",
	})

	resp, err := client.LookupsV1.FetchPhoneNumber("+15108675310",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Carrier != nil {
			fmt.Println(*resp.Carrier)
		} else {
			fmt.Println(resp.Carrier)
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
    ->phoneNumbers("+15108675310")
    ->fetch(["type" => ["carrier"]]);

print $phone_number->carrier;
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
               .phone_numbers('+15108675310')
               .fetch(type: [
                   'carrier'
                 ])

puts phone_number.carrier
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +15108675310 \
   --type carrier
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B15108675310?Type=carrier" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "carrier": {
    "error_code": null,
    "mobile_country_code": "310",
    "mobile_network_code": "456",
    "name": "verizon",
    "type": "mobile"
  },
  "country_code": "US",
  "national_format": "(510) 867-5310",
  "phone_number": "+15108675310",
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310"
}
```

The response will contain two additional fields:

* **Type** specifies whether the phone is a `landline`, `mobile`, or `voip` phone
* **Carrier** is the name of the phone's carrier, like `Verizon Wireless`. Note that carriers rebrand frequently

> \[!NOTE]
>
> **Note:** Type `voip` is only returned for eligible U.S. numbers. VoIP detection is not available outside of the U.S and only `landline` or `mobile` will be returned for non-U.S. phone numbers.
>
> If your phone number is invalid or incorrectly formatted, Twilio will return a 404 error.

## Get a name associated with a phone number \[#cnam]

*Note: Caller name lookup is available for U.S. numbers only.*

Lookup can also retrieve the name of the individual or business associated with a phone number. Pass a `caller-name` argument to your lookup request.

Lookup with Caller Name

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
    .phoneNumbers("+15108675310")
    .fetch({ type: ["caller-name"] });

  console.log(phoneNumber.callerName);
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

phone_number = client.lookups.v1.phone_numbers("+15108675310").fetch(
    type=["caller-name"]
)

print(phone_number.caller_name)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathPhoneNumber: "+15108675310", type: new List<string> { "caller-name" });

        Console.WriteLine(phoneNumber.CallerName);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.lookups.v1.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+15108675310").setType(Arrays.asList("caller-name")).fetch();

        System.out.println(phoneNumber.getCallerName());
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
	params.SetType([]string{
		"caller-name",
	})

	resp, err := client.LookupsV1.FetchPhoneNumber("+15108675310",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.CallerName != nil {
			fmt.Println(*resp.CallerName)
		} else {
			fmt.Println(resp.CallerName)
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
    ->phoneNumbers("+15108675310")
    ->fetch(["type" => ["caller-name"]]);

print $phone_number->callerName;
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
               .phone_numbers('+15108675310')
               .fetch(type: [
                   'caller-name'
                 ])

puts phone_number.caller_name
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +15108675310 \
   --type caller-name
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B15108675310?Type=caller-name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": {
    "caller_name": "Delicious Cheese Cake",
    "caller_type": "CONSUMER",
    "error_code": null
  },
  "carrier": null,
  "country_code": "US",
  "national_format": "(510) 867-5310",
  "phone_number": "+15108675310",
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310"
}
```

If available, the response will include a name for the phone number and whether the name is for a `business` or `consumer`.

Keep in mind that not all numbers will have names available.

Want even more information about a phone number? See the [Twilio Marketplace How to Use Add-on Listings guide](/docs/marketplace/listings/usage#add-on-listings) to learn more and [check out the available Lookup Add-ons in the Console](https://console.twilio.com/us1/develop/add-ons/catalog?products=lookup).
