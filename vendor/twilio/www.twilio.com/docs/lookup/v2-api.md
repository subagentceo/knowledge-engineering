# Lookup v2 API

Twilio Lookup provides powerful, real-time phone number intelligence to help businesses verify users and prevent fraud by ensuring accurate information about phone number type, carrier, country, if the phone number is active or reachable, phone number ownership, if contact consent is still valid, whether the phone number has been attributed to a new SIM, and more without disrupting the user experience. This solution enhances user authentication and reduces costs by improving SMS and call delivery with precise phone number validation.

The **Lookup API** allows you to query information on a phone number so that you can make a trusted interaction with your user. With this endpoint, you can format and validate phone numbers with the free [Basic Lookup request](#making-a-request) and add on [data packages](#data-packages) to get even more in-depth carrier and caller information.

Using Lookup for the first time? Check out [Lookup v2 Quickstart](/docs/lookup/quickstart) for step-by-step guidance.

## Data packages

In Lookup v2, we offer the following optional paid data packages that you can add on to your request:

| Package                                                              | Description                                                                                                                                                                                                              | Coverage and limitations                                                                                                  | Release stage and access                                                                                                                                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Line Type Intelligence](/docs/lookup/v2-api/line-type-intelligence) | Get the line type of a phone number including mobile, landline, fixed VoIP, non-fixed VoIP, toll-free, and more. To override the line type, make a [Line Type Override](/docs/lookup/v2-api/line-type-override) request. | Worldwide support; Canada requires special approval.                                                                      | **Generally Available**: Available via self-service.                                                                                                                                                              |
| [SIM Swap](/docs/lookup/v2-api/sim-swap)                             | Get information on the last SIM change for a mobile phone number. See [SIM Swap Overview](/docs/lookup/lookup-sim-swap) for more information.                                                                            | Countries in Europe, Latin America, and North America. [See coverage](/docs/lookup/lookup-sim-swap#coverage-and-pricing). | **Private Beta**: Requires carrier approvals; please [submit this form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP) to contact sales.                                         |
| [Call Forwarding](/docs/lookup/v2-api/call-forwarding)               | Get the unconditional call forwarding status of a mobile phone number.                                                                                                                                                   | This supports only numbers from major UK carriers.                                                                        | **Private Beta**: Requires carrier approvals. To contact sales, [submit a form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP).                                                  |
| [Line Status](/docs/lookup/v2-api/line-status)                       | Get the status information of a mobile phone number.                                                                                                                                                                     | 140+ countries and might not return data from every network.                                                              | **Private Beta**: To request access, [submit this form](https://forms.gle/Typc1RxiN2VUKPjZA).                                                                                                                     |
| [Identity Match](/docs/lookup/v2-api/identity-match)                 | To confirm ownership for a mobile phone number, compare user-provided information against authoritative phone-based data sources.                                                                                        | [Countries in Europe, Latin America, North America, and Australia](/docs/lookup/v2-api/identity-match).                   | **Generally Available**: To start the process, certain countries require carrier approval. To request access, [submit this form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP). |
| [Caller Name](/docs/lookup/v2-api/caller-name)                       | Get information on the caller name and type for a mobile phone number.                                                                                                                                                   | This supports only numbers from US carriers.                                                                              | **Generally Available**: Available through self-service.                                                                                                                                                          |
| [SMS Pumping Risk Score](/docs/lookup/v2-api/sms-pumping-risk)       | Allows you to get a real-time risk assessment on a phone number's involvement in [SMS pumping fraud](/docs/verify/preventing-toll-fraud).                                                                                | Worldwide Access                                                                                                          | **Generally Available:** Available via self-service.                                                                                                                                                              |
| [Reassigned Number](/docs/lookup/v2-api/reassigned-number)           | Allows you to check if a phone number has been reassigned to a new user since a given date.                                                                                                                              | US Only                                                                                                                   | **Generally Available**: To request access, [submit this form](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP).                                                                   |

## API base URL

All API URLs referenced in the documentation use the following base URL:

```bash
https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

`{PhoneNumber}` is the phone number you are querying in [E.164](/docs/glossary/what-e164) or national format. If provided in national format, please also include the optional query parameter `CountryCode` in your request. If no country is provided, `CountryCode` will default to `US`.

> \[!WARNING]
>
> In some cases, non-US phone numbers in national format with no `+` sign or `CountryCode` query parameter are being processed as valid. This is not changing in V1 in the future but it is an unintended behavior and could lead to ambiguous validation responses.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -X GET https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber} \
  -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Regions support

To optimize application performance and control data residency, Lookup developers can select the [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) that their request is processed out of. Twilio Lookup currently operates the following regions:

* United States (US1) - default
* Ireland (IE1)

Please see [Using Lookup with Twilio Regions](/docs/lookup/using-lookup-with-twilio-regions) for more information.

## Making a request

The Basic Lookup request is a free feature that returns the provided phone number in E.164 and national formats and performs basic phone number validation. To use Basic Lookup, send an HTTP `GET` request to the [Lookup API Base URL](#api-base-url).

Basic Lookup for a Valid Number

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

Only valid numbers (for a given region, using length, and prefix information) will return Basic Lookup results. If you attempt to lookup a phone number which is invalid, you will receive `"valid": false` in the response. In some cases you will also receive a reason for the validation failure in the `validation_errors` field.

Basic Lookup for an Invalid Number

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
    .phoneNumbers("+141599299600")
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

phone_number = client.lookups.v2.phone_numbers("+141599299600").fetch()

print(phone_number.national_format)
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

        var phoneNumber = await PhoneNumberResource.FetchAsync(pathPhoneNumber: "+141599299600");

        Console.WriteLine(phoneNumber.NationalFormat);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+141599299600").fetch();

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
	lookups "github.com/twilio/twilio-go/rest/lookups/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}

	resp, err := client.LookupsV2.FetchPhoneNumber("+141599299600",
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

$phone_number = $twilio->lookups->v2->phoneNumbers("+141599299600")->fetch();

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
               .v2
               .phone_numbers('+141599299600')
               .fetch

puts phone_number.national_format
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +141599299600
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B141599299600" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": null,
  "country_code": null,
  "phone_number": "+141599299600",
  "national_format": null,
  "valid": false,
  "validation_errors": [
    "TOO_LONG"
  ],
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
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+141599299600"
}
```

Lookup with data packages

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
    .phoneNumbers("+447772000001")
    .fetch({ fields: "sim_swap,call_forwarding" });

  console.log(phoneNumber.valid);
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

phone_number = client.lookups.v2.phone_numbers("+447772000001").fetch(
    fields="sim_swap,call_forwarding"
)

print(phone_number.valid)
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
            pathPhoneNumber: "+447772000001", fields: "sim_swap,call_forwarding");

        Console.WriteLine(phoneNumber.Valid);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+447772000001").setFields("sim_swap,call_forwarding").fetch();

        System.out.println(phoneNumber.getValid());
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
	params.SetFields("sim_swap,call_forwarding")

	resp, err := client.LookupsV2.FetchPhoneNumber("+447772000001",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(resp.Valid)
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
    ->phoneNumbers("+447772000001")
    ->fetch(["fields" => "sim_swap,call_forwarding"]);

print $phone_number->valid;
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
               .phone_numbers('+447772000001')
               .fetch(fields: 'sim_swap,call_forwarding')

puts phone_number.valid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +447772000001 \
   --fields sim_swap,call_forwarding
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=sim_swap%2Ccall_forwarding" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "44",
  "country_code": "GB",
  "phone_number": "+447772000001",
  "national_format": "07772 000001",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
  "sim_swap": {
    "last_sim_swap": {
      "last_sim_swap_date": "2020-11-05T20:52:09Z",
      "swapped_period": "PT24H",
      "swapped_in_period": true
    },
    "carrier_name": "Vodafone UK",
    "mobile_country_code": "276",
    "mobile_network_code": "02",
    "error_code": null
  },
  "call_forwarding": {
    "call_forwarding_enabled": true,
    "error_code": null
  },
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+447772000001"
}
```

Next, you can build on your Basic Lookup request by adding data packages using the `Fields` query parameter.

### Query parameters

The following basic `GET` query string parameters allow you to specify the phone number you want information about, along with fields of additional data.

To add on [data packages](#data-packages) to your request, include the package names under the `Fields` parameter. The Basic Lookup formatting and validation data is also provided with every request by default.

> \[!WARNING]
>
> When requesting data packages, you will incur charges on your account. Please double-check your code before running it so that you don't accidentally incur excessive unintended Lookup charges.

### Path parameters

```json
[{"name":"PhoneNumber","in":"path","description":"The phone number to lookup in E.164 or national format. Default country code is +1 (North America).","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"required":true}]
```

### Query parameters

```json
[{"name":"Fields","in":"query","description":"A comma-separated list of fields to return. Possible values are validation, caller_name, sim_swap, call_forwarding, line_status, line_type_intelligence, identity_match, reassigned_number, sms_pumping_risk, phone_number_quality_score, pre_fill.","schema":{"type":"string"},"examples":{"fetchCallerName":{"value":"caller_name"},"fetchSimSwap":{"value":"sim_swap"},"fetchSimSwapWithoutLastSimSwapDate":{"value":"sim_swap"},"fetchSimSwapWithFalseSwapped":{"value":"sim_swap"},"fetchCallForwarding":{"value":"call_forwarding"},"fetchSimSwapAndCallForwarding":{"value":"sim_swap,call_forwarding"},"fetchLineStatusActive":{"value":"line_status"},"fetchLineStatusInactive":{"value":"line_status"},"fetchLineTypeIntelligence":{"value":"line_type_intelligence"},"fetchIdentityMatch":{"value":"identity_match"},"fetchSmsPumpingRisk":{"value":"sms_pumping_risk"},"fetchReassignedNumberWithNumberReassigned":{"value":"reassigned_number"},"fetchReassignedNumberWithNumberNoReassigned":{"value":"reassigned_number"},"fetchReassignedNumberWithNoDataAvailable":{"value":"reassigned_number"},"fetchPhoneNumberQualityScore":{"value":"phone_number_quality_score"},"fetchPreFill":{"value":"pre_fill"},"fetchSmsPumpingRiskWithPartnerSubId":{"value":"sms_pumping_risk"}}},{"name":"CountryCode","in":"query","description":"The [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) used if the phone number provided is in national format.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},{"name":"FirstName","in":"query","description":"User’s first name. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"John"}}},{"name":"LastName","in":"query","description":"User’s last name. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"Doe"}}},{"name":"AddressLine1","in":"query","description":"User’s first address line. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"321 Main Street"}}},{"name":"AddressLine2","in":"query","description":"User’s second address line. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"Suite 2"}}},{"name":"City","in":"query","description":"User’s city. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"New York"}}},{"name":"State","in":"query","description":"User’s country subdivision, such as state, province, or locality. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"NY"}}},{"name":"PostalCode","in":"query","description":"User’s postal zip code. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"10021"}}},{"name":"AddressCountryCode","in":"query","description":"User’s country, up to two characters. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string","format":"iso-country-code"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"US"}}},{"name":"NationalId","in":"query","description":"User’s national ID, such as SSN or Passport ID. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"YZ3456883"}}},{"name":"DateOfBirth","in":"query","description":"User’s date of birth, in YYYYMMDD format. This query parameter is only used (optionally) for identity_match package requests.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}},"examples":{"fetchIdentityMatch":{"value":"19901214"}}},{"name":"LastVerifiedDate","in":"query","description":"The date you obtained consent to call or text the end-user of the phone number or a date on which you are reasonably certain that the end-user could still be reached at that number. This query parameter is only used (optionally) for reassigned_number package requests.","schema":{"type":"string"},"examples":{"fetchReassignedNumberWithNumberReassigned":{"value":"20201227"},"fetchReassignedNumberWithNumberNoReassigned":{"value":"20190924"},"fetchReassignedNumberWithNoDataAvailable":{"value":"20211224"}}},{"name":"VerificationSid","in":"query","description":"The unique identifier associated with a verification process through verify API. This query parameter is only used (optionally) for pre_fill package requests.","schema":{"type":"string"},"examples":{"fetchPreFill":{"value":"VEb0ffb48bee328cf2d3c4020072cdfxxx"}}},{"name":"PartnerSubId","in":"query","description":"The optional partnerSubId parameter to provide context for your sub-accounts, tenantIDs, sender IDs or other segmentation, enhancing the accuracy of the risk analysis.","schema":{"type":"string"},"examples":{"fetchSmsPumpingRiskWithPartnerSubId":{"value":"partner_sub_id_string"}}}]
```

### Response properties

The response always contains the following properties.

**Note**: The properties `line_type_intelligence`, `sim_swap`, `call_forwarding`, `line_status`, `identity_match`, `caller_name`, `sms_pumping_risk`, and `reassigned_number` return `null` unless you include their corresponding [data package](#data-packages) in the `Fields` query parameter.

```json
{"title":"LookupResponse","type":"object","refName":"LookupResponse","modelName":"LookupResponse","properties":{"calling_country_code":{"type":"string","nullable":true,"description":"International dialing prefix of the phone number defined in the E.164 standard."},"country_code":{"type":"string","nullable":true,"description":"The phone number's [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"national_format":{"type":"string","nullable":true,"description":"The phone number in [national format](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"valid":{"type":"boolean","description":"Boolean which indicates if the phone number is in a valid range that can be freely assigned by a carrier to a user."},"validation_errors":{"type":"array","description":"Contains reasons why a phone number is invalid. Possible values: TOO_SHORT, TOO_LONG, INVALID_BUT_POSSIBLE, INVALID_COUNTRY_CODE, INVALID_LENGTH, NOT_A_NUMBER.","items":{"type":"string","enum":["TOO_SHORT","TOO_LONG","INVALID_BUT_POSSIBLE","INVALID_COUNTRY_CODE","INVALID_LENGTH","NOT_A_NUMBER"],"description":"Contains reasons why a phone number is invalid. Possible values: TOO_SHORT, TOO_LONG, INVALID_BUT_POSSIBLE, INVALID_COUNTRY_CODE, INVALID_LENGTH, NOT_A_NUMBER.","refName":"ValidationError","modelName":"ValidationError"}},"caller_name":{"description":"An object that contains caller name information based on [CNAM](https://support.twilio.com/hc/en-us/articles/360051670533-Getting-Started-with-CNAM-Caller-ID).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"title":"CallerNameInfo","type":"object","refName":"CallerNameInfo","modelName":"CallerNameInfo","properties":{"caller_name":{"type":"string"},"caller_type":{"type":"string"},"error_code":{"type":"integer"}}},"sim_swap":{"description":"An object that contains information on the last date the subscriber identity module (SIM) was changed for a mobile phone number.","title":"SimSwapInfo","type":"object","refName":"SimSwapInfo","modelName":"SimSwapInfo","properties":{"last_sim_swap":{"title":"LastSimSwapInfo","refName":"LastSimSwapInfo","modelName":"LastSimSwapInfo","properties":{"last_sim_swap_date":{"type":"string","format":"date-time"},"swapped_period":{"type":"string"},"swapped_in_period":{"type":"boolean"}}},"carrier_name":{"type":"string"},"mobile_country_code":{"type":"string"},"mobile_network_code":{"type":"string"},"error_code":{"type":"integer"}}},"call_forwarding":{"description":"An object that contains information on the unconditional call forwarding status of mobile phone number.","title":"CallForwardingInfo","type":"object","refName":"CallForwardingInfo","modelName":"CallForwardingInfo","properties":{"call_forwarding_enabled":{"type":"boolean"},"error_code":{"type":"integer","format":"int32"}}},"line_type_intelligence":{"description":"An object that contains line type information including the carrier name, mobile country code, and mobile network code.","title":"LineTypeIntelligenceInfo","type":"object","refName":"LineTypeIntelligenceInfo","modelName":"LineTypeIntelligenceInfo","properties":{"mobile_country_code":{"type":"string"},"mobile_network_code":{"type":"string"},"carrier_name":{"type":"string"},"type":{"type":"string"},"error_code":{"type":"integer"}}},"line_status":{"description":"An object that contains line status information for a mobile phone number.","title":"LineStatusInfo","type":"object","refName":"LineStatusInfo","modelName":"LineStatusInfo","properties":{"status":{"type":"string"},"error_code":{"type":"integer"}}},"identity_match":{"description":"An object that contains identity match information. The result of comparing user-provided information including name, address, date of birth, national ID, against authoritative phone-based data sources","title":"IdentityMatchInfo","type":"object","refName":"IdentityMatchInfo","modelName":"IdentityMatchInfo","properties":{"first_name_match":{"type":"string"},"last_name_match":{"type":"string"},"address_lines_match":{"type":"string"},"city_match":{"type":"string"},"state_match":{"type":"string"},"postal_code_match":{"type":"string"},"address_country_match":{"type":"string"},"national_id_match":{"type":"string"},"date_of_birth_match":{"type":"string"},"summary_score":{"type":"integer","format":"int32"},"error_code":{"type":"integer","format":"int32"},"error_message":{"type":"string"}}},"reassigned_number":{"description":"An object that contains reassigned number information. Reassigned Numbers will return a phone number's reassignment status given a phone number and date","title":"ReassignedNumberInfo","type":"object","refName":"ReassignedNumberInfo","modelName":"ReassignedNumberInfo","properties":{"last_verified_date":{"type":"string"},"is_number_reassigned":{"type":"string"},"error_code":{"type":"string"}}},"sms_pumping_risk":{"description":"An object that contains information on if a phone number has been currently or previously blocked by Verify Fraud Guard for receiving malicious SMS pumping traffic as well as other signals associated with risky carriers and low conversion rates.","title":"SmsPumpingRiskInfo","type":"object","refName":"SmsPumpingRiskInfo","modelName":"SmsPumpingRiskInfo","properties":{"carrier_risk_category":{"type":"string"},"number_blocked":{"type":"boolean"},"number_blocked_date":{"type":"string","format":"date-time"},"number_blocked_last_3_months":{"type":"boolean"},"sms_pumping_risk_score":{"type":"integer"},"error_code":{"type":"integer"}}},"phone_number_quality_score":{"description":"An object that contains information of a mobile phone number quality score. Quality score will return a risk score about the phone number."},"pre_fill":{"description":"An object that contains pre fill information. pre_fill will return PII information associated with the phone number like first name, last name, address line, country code, state and postal code. "},"url":{"type":"string","format":"uri","description":"The absolute URL of the resource."}}}
```
