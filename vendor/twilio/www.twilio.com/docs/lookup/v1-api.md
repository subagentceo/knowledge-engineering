# Lookup v1 API

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

The Lookup V1 provides a way to retrieve additional information about a phone number. Lookup currently supports the following types of data.

* Region-specific number formatting and validation
* Carrier Information
* Caller Name

You can specify one or more types of information you would like to purchase in the request, check the [Lookup Product Page](https://www.twilio.com/en-us/trusted-activation/lookup) for pricing information.

## API URL

All URLs referenced in the documentation use the following URL.

```bash
https://lookups.twilio.com/v1/PhoneNumbers/{PhoneNumber}
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

`{PhoneNumber}` is the phone number you are requesting information about. Phone numbers can be specified either in national formatting or in [standard E.164 format](https://en.wikipedia.org/wiki/E.164). If providing a number in local national format, please also specify the country as an optional parameter. If no country is provided, this will default to US.

> \[!WARNING]
>
> In some cases, non-US phone numbers in national format with no `+` sign or `CountryCode` query parameter are being processed as valid. This is not changing in V1 in the future but it is an unintended behavior and could lead to ambiguous validation responses.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://lookups.twilio.com/v1/PhoneNumbers/{PhoneNumber} \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Phone number lookup

### HTTP GET

Returns phone number information matching the specified request. Formatting information is standard. Carrier, Caller Name, and phone number type information can be requested, in addition to using [Twilio Marketplace Add-ons](/docs/marketplace) to access 3rd party data sources.

### Query Parameters

The following basic `GET` query string parameters allow you to specify the phone number you want information about and the types of information you'd like:

### Path parameters

```json
[{"name":"PhoneNumber","in":"path","description":"The phone number to lookup in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"required":true}]
```

### Query parameters

```json
[{"name":"CountryCode","in":"query","description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the phone number to fetch. This is used to specify the country when the phone number is provided in a national format.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"fetchCarrier":{"value":"country_code"},"fetchCarrierInternational":{"value":"country_code"},"fetchCallerName":{"value":"country_code"},"fetchCarrierAndCallerName":{"value":"country_code"},"fetchAddonsWhitepagesPro":{"value":"country_code"},"fetchAddonsPayfone":{"value":"country_code"}}},{"name":"Type","in":"query","description":"The type of information to return. Can be: `carrier` or `caller-name`. The default is null. To retrieve both types of information, specify this parameter twice; once with `carrier` and once with `caller-name` as the value.","schema":{"type":"array","items":{"type":"string"}},"examples":{"fetch":{"value":[]},"fetchCarrier":{"value":["carrier"]},"fetchCarrierInternational":{"value":["carrier"]},"fetchCallerName":{"value":["caller-name"]},"fetchCarrierAndCallerName":{"value":["carrier","caller-name"]},"fetchAddonsWhitepagesPro":{"value":["caller-name"]},"fetchAddonsNomorobo":{"value":["carrier"]},"fetchAddonsPayfone":{"value":["carrier"]}}},{"name":"AddOns","in":"query","description":"The `unique_name` of an Add-on you would like to invoke. Can be the `unique_name` of an Add-on that is installed on your account. You can specify multiple instances of this parameter to invoke multiple Add-ons. For more information about  Add-ons, see the [Add-ons documentation](https://www.twilio.com/docs/add-ons).","schema":{"type":"array","items":{"type":"string"}},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"fetchAddonsWhitepagesPro":{"value":["whitepages_pro_caller_id"]},"fetchAddonsNomorobo":{"value":["nomorobo_spamscore"]},"fetchAddonsPayfone":{"value":["payfone_tcpa_compliance"]}}},{"name":"AddOnsData","in":"query","description":"Data specific to the add-on you would like to invoke. The content and format of this value depends on the add-on.","schema":{"type":"object","format":"prefixed-collapsible-map-AddOns"}}]
```

### Resource Properties

The following properties are always returned:

> \[!WARNING]
>
> * Only possible numbers (for a given region, using length and prefix information) will return formatting results. If you attempt to lookup a phone number which is not valid, you will receive an HTTP 404 error.
> * Machine to machine (M2M) phone numbers are not supported in Lookup and will return an HTTP 404 error.

```json
{"type":"object","refName":"lookups.v1.phone_number","modelName":"lookups_v1_phone_number","properties":{"caller_name":{"nullable":true,"description":"The name of the phone number's owner. If `null`, that information was not available.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"country_code":{"type":"string","nullable":true,"description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for the phone number.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"national_format":{"type":"string","nullable":true,"description":"The phone number, in national format.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"carrier":{"nullable":true,"description":"The telecom company that provides the phone number."},"add_ons":{"nullable":true,"description":"A JSON string with the results of the Add-ons you specified in the `add_ons` parameters. For the format of the object, see [Using Add-ons](https://www.twilio.com/docs/add-ons).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

### Carrier information \[#lookups-carrier-info]

> \[!WARNING]
>
> * Access to Canada carrier information requires special approval. Please read this [support article](https://help.twilio.com/hc/en-us/articles/360004563433) to learn more. Querying a Canada phone number without access will return a [60601 error](/docs/api/errors/60601).
> * Toll free numbers do not return carrier data, but will return a valid HTTP response.

The following additional properties are returned if you requested carrier information in your `GET` request:

| Name              | Description                                                                                                                                                         |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MobileCountryCode | The three digit mobile country code of the carrier, used with the mobile network code to identify a mobile network operator.                                        |
| MobileNetworkCode | The two-three digit mobile network code of the carrier, used with the mobile country code to identify a mobile network operator (only returned for mobile numbers). |
| Name              | The name of the carrier; often subject to change.                                                                                                                   |
| Type              | The phone number type. Possible values are `landline`, `mobile`, or `voip`. See 'Phone Number Types' below for more information.                                    |
| ErrorCode         | The [error code](/docs/api/errors), if any, associated with your request.                                                                                           |

#### Phone Number Types \[#phone-number-type-values]

The following are the possible values for the 'Type' property.

| Type     | Description                                                                                                                                                                      |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| landline | The phone number is a landline number; generally not capable of receiving SMS messages.                                                                                          |
| mobile   | The phone number is a mobile number; generally capable of receiving SMS messages.                                                                                                |
| voip     | An internet based phone number that may or may not be capable of receiving SMS messages. For example, Google Voice. Returned for U.S. numbers only.                              |
| null     | The phone number is valid but no information was returned from our data providers (see [limitation for Canada numbers](https://help.twilio.com/hc/en-us/articles/360004563433)). |

### Caller name information \[#lookups-caller-name]

> \[!WARNING]
>
> Caller name information is sourced through [CNAM](https://help.twilio.com/hc/en-us/articles/360051670533-Getting-Started-with-CNAM-Caller-ID) and only available for phone numbers owned by carriers in the US. We recommend testing the coverage rate of this lookup with your specific dataset of phone numbers.

The following additional properties are returned if you requested caller name in your `GET` request:

| Name       | Description                                                                                                                                             |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CallerName | String indicating the name of the owner of the phone number. If not available, this will return `null`.                                                 |
| CallerType | String indicating whether this caller is a business or consumer. Possible values are `BUSINESS`, `CONSUMER`. If not available, this will return `null`. |
| ErrorCode  | The [error code](/docs/api/errors), if any, associated with your request.                                                                               |

Caller name lookups for US numbers are billed per lookup, even if data is not be available. Requesting Caller name lookups for non-US will return `null` values and will not be billed.

## Examples

Carrier Lookup with E.164 Formatted Number

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

Carrier Lookup with National Formatted Number

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

Caller Name Lookup

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

## Using Twilio Marketplace Add-ons with Lookup

Lookup also supports [Twilio Marketplace Add-ons](/docs/marketplace), enabling you to retrieve information from a multitude of 3rd party data sources, available via the [Twilio Marketplace](https://showcase.twilio.com/).

You can add Lookup supported Add-ons by [visiting the Twilio Console](https://www.twilio.com/console/lookup/add-ons) to enable the Add-on. Once it has been enabled, make sure you have 'Lookups' selected in its configuration:

![Lookups option checked for ekata\_phone\_valid add-on under unique name settings.](https://docs-resources.prod.twilio.com/b9b5763b5905a04dbb8834292708cede9f38bee735e9785a384a89e520234935.png)

When you use `AddOns`, you can pass additional parameters to the Add-on(s):

| Name                           | Description                                                                                                                                                                                              |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AddOns.addon\_name.param\_name | Optional. Passes additional data to the Add-on at request time. See [Add-on documentation in Console](https://www.twilio.com/console/add-ons/) to identify if the Add-on requires additional parameters. |

## Examples with Twilio Marketplace Add-ons

Deterministic TCPA Compliance with Lookup and the Payfone Add-on

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
    .phoneNumbers("+16502530000")
    .fetch({
      addOns: ["payfone_tcpa_compliance"],
      addOnsData: {
        "payfone_tcpa_compliance.RightPartyContactedDate": "20160101",
      },
      type: ["carrier"],
    });

  console.log(phoneNumber.addOns);
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

phone_number = client.lookups.v1.phone_numbers("+16502530000").fetch(
    type=["carrier"],
    add_ons=["payfone_tcpa_compliance"],
    add_ons_data={
        "payfone_tcpa_compliance.RightPartyContactedDate": "20160101"
    },
)

print(phone_number.add_ons)
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
            pathPhoneNumber: "+16502530000",
            type: new List<string> { "carrier" },
            addOns: new List<string> { "payfone_tcpa_compliance" },
            addOnsData: new Dictionary<string, Object>() {
                { "payfone_tcpa_compliance.RightPartyContactedDate", "20160101" }
            });

        Console.WriteLine(phoneNumber.AddOns);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.lookups.v1.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+16502530000")
                                      .setType(Arrays.asList("carrier"))
                                      .setAddOns(Arrays.asList("payfone_tcpa_compliance"))
                                      .setAddOnsData(new HashMap<String, Object>() {
                                          {
                                              put("payfone_tcpa_compliance.RightPartyContactedDate", "20160101");
                                          }
                                      })
                                      .fetch();

        System.out.println(phoneNumber.getAddOns());
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
	params.SetAddOns([]string{
		"payfone_tcpa_compliance",
	})
	params.SetAddOnsData(map[string]interface{}{
		"payfone_tcpa_compliance.RightPartyContactedDate": "20160101",
	})

	resp, err := client.LookupsV1.FetchPhoneNumber("+16502530000",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AddOns != nil {
			fmt.Println(*resp.AddOns)
		} else {
			fmt.Println(resp.AddOns)
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

$phone_number = $twilio->lookups->v1->phoneNumbers("+16502530000")->fetch([
    "type" => ["carrier"],
    "addOns" => ["payfone_tcpa_compliance"],
    "addOnsData" => [
        "payfone_tcpa_compliance.RightPartyContactedDate" => "20160101",
    ],
]);

print $phone_number->addOns;
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
               .phone_numbers('+16502530000')
               .fetch(
                 type: [
                   'carrier'
                 ],
                 add_ons: [
                   'payfone_tcpa_compliance'
                 ],
                 add_ons_data: {
                   'payfone_tcpa_compliance.RightPartyContactedDate' => '20160101'
                 }
               )

puts phone_number.add_ons
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +16502530000 \
   --type carrier \
   --add-ons payfone_tcpa_compliance \
   --add-ons-data "{\"payfone_tcpa_compliance.RightPartyContactedDate\":\"20160101\"}"
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B16502530000?Type=carrier&AddOns=payfone_tcpa_compliance&AddOnsData.payfone_tcpa_compliance.RightPartyContactedDate=20160101" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "country_code": "US",
  "phone_number": "+16502530000",
  "national_format": "(650) 253-0000",
  "carrier": {
    "mobile_country_code": null,
    "mobile_network_code": null,
    "name": "Level 3 Communications, LLC",
    "type": "landline",
    "error_code": null
  },
  "add_ons": [
    "payfone_tcpa_compliance"
  ],
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+16502530000"
}
```

Detect Robocallers with Lookup and Nomorobo Spam Score Add-on

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
    .phoneNumbers("+19892008374")
    .fetch({ addOns: ["nomorobo_spamscore"] });

  console.log(phoneNumber.addOns);
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

phone_number = client.lookups.v1.phone_numbers("+19892008374").fetch(
    add_ons=["nomorobo_spamscore"]
)

print(phone_number.add_ons)
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
            pathPhoneNumber: "+19892008374", addOns: new List<string> { "nomorobo_spamscore" });

        Console.WriteLine(phoneNumber.AddOns);
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
            PhoneNumber.fetcher("+19892008374").setAddOns(Arrays.asList("nomorobo_spamscore")).fetch();

        System.out.println(phoneNumber.getAddOns());
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
	params.SetAddOns([]string{
		"nomorobo_spamscore",
	})

	resp, err := client.LookupsV1.FetchPhoneNumber("+19892008374",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AddOns != nil {
			fmt.Println(*resp.AddOns)
		} else {
			fmt.Println(resp.AddOns)
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
    ->phoneNumbers("+19892008374")
    ->fetch(["addOns" => ["nomorobo_spamscore"]]);

print $phone_number->addOns;
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
               .phone_numbers('+19892008374')
               .fetch(
                 add_ons: [
                   'nomorobo_spamscore'
                 ]
               )

puts phone_number.add_ons
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v1:phone-numbers:fetch \
   --phone-number +19892008374 \
   --add-ons nomorobo_spamscore
```

```bash
curl -X GET "https://lookups.twilio.com/v1/PhoneNumbers/%2B19892008374?AddOns=nomorobo_spamscore" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "caller_name": null,
  "country_code": "US",
  "phone_number": "+19892008374",
  "national_format": "(989) 200-8374",
  "carrier": {
    "mobile_country_code": "310",
    "mobile_network_code": null,
    "name": "Ytel/Blitz",
    "type": "mobile",
    "error_code": null
  },
  "add_ons": [
    "nomorobo_spamscore"
  ],
  "url": "https://lookups.twilio.com/v1/PhoneNumbers/+19892008374"
}
```
