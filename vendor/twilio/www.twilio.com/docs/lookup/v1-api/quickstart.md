# Lookup v1 Quickstart

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

## How to look up a Phone Number

### What is Lookup?

Lookup allows you to systematically ascertain information about phone numbers. With Lookup, you can identify local-friendly number formats and reduce the likelihood of undelivered messages.

### Looking up a Number

First, decide what you'd like to know about your numbers. Format lookups are free and allow you to identify and adjust international phone numbers into E.164 format for optimal message deliverability. Carrier lookups cost $0.005 per lookup and allow you to identify both the phone type (mobile, landline or VoIP) and the carrier behind the phone number.

Let's look at the details:

* First log into your [Twilio Account][1]. On the Dashboard there is a section labeled ["API Credentials"][2]. There you will find your Account SID and Auth Token. You'll need these to authenticate your request.
* To perform a Lookup, we'll be making a HTTP `GET` request to the `lookup` subdomain.
  `lookups.twilio.com/v1/PhoneNumbers/{PhoneNumber}`
* We will need to include the phone number we want to look up.
* We may then specify any additional information as `GET` parameters.

Let's try this out by using curl to make the following request in our terminal:

[1]: /user/account

[2]: /user/account/settings#api-credentials

```bash
curl -XGET "https://lookups.twilio.com/v1/PhoneNumbers/5108675309?CountryCode=US&Type=carrier" \
    -u '{AccountSid}:{AuthToken}'
```

### Format Lookup

Now we want to integrate Lookup with our application. Let's try it out with our SDK.

You may want to use Format Lookup in order to reformat international numbers given to you by your customers in local format. In this case, you need to specify the number and the country you believe the phone number is from. Note that this lookup is free.

The Twilio [SDKs](/docs/libraries) assist with this. Open a new file and add the following lines:

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
    .phoneNumbers("+15108675310")
    .fetch({ countryCode: "US" });

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
    country_code="US"
)

print(phone_number.caller_name)
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
            pathPhoneNumber: "+15108675310", countryCode: "US");

        Console.WriteLine(phoneNumber.CallerName);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+15108675310").setCountryCode("US").fetch();

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
	params.SetCountryCode("US")

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
    ->fetch(["countryCode" => "US"]);

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
               .fetch(country_code: 'US')

puts phone_number.caller_name
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +15108675310 \
   --country-code US
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B15108675310?CountryCode=US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "carrier": null,
  "add_ons": null,
  "country_code": "US",
  "national_format": "(510) 867-5310",
  "phone_number": "+15108675310",
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310"
}
```

You'll want to include the country code of the phone number that you would like formatted. If not included, the country code will default to the US.

### Carrier and Type Lookup

You may also want to do a lookup to determine the phone number type and carrier for your phone number. Note that this costs $0.005 per lookup.

To do this lookup, you'll want to include the carrier parameter. Similar to the code above, we can make this request with the following snippet:

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
    .fetch({
      countryCode: "US",
      type: ["carrier"],
    });

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

phone_number = client.lookups.v1.phone_numbers("(510)867-5310").fetch(
    country_code="US", type=["carrier"]
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
            pathPhoneNumber: "(510)867-5310",
            countryCode: "US",
            type: new List<string> { "carrier" });

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
        PhoneNumber phoneNumber =
            PhoneNumber.fetcher("(510)867-5310").setCountryCode("US").setType(Arrays.asList("carrier")).fetch();

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
	params.SetCountryCode("US")
	params.SetType([]string{
		"carrier",
	})

	resp, err := client.LookupsV1.FetchPhoneNumber("(510)867-5310",
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

$phone_number = $twilio->lookups->v1->phoneNumbers("(510)867-5310")->fetch([
    "countryCode" => "US",
    "type" => ["carrier"],
]);

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
               .phone_numbers('(510)867-5310')
               .fetch(
                 country_code: 'US',
                 type: [
                   'carrier'
                 ]
               )

puts phone_number.carrier
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number "(510)867-5310" \
   --country-code US \
   --type carrier
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/(510)867-5310?CountryCode=US&Type=carrier" \
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
  "phone_number": "(510)867-5310",
  "add_ons": null,
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310"
}
```

Now you're ready to look up your customers' phone numbers and reach them in the most appropriate ways!
