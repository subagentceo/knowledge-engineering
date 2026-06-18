# Pricing: Voice Resource

The Pricing Voice resource provides an API to pull real-time, account-specific pricing for Twilio's [Programmable Voice](/docs/voice) product.

Prices can be retrieved at a country level via the [Pricing Voice Countries resource](#pricing-voice-country-instance-resource) or for a specific phone number via the [Pricing Voice Numbers resource](#pricing-voice-number-instance-resource).

You may also wish to check out our Pricing API resources for Twilio's [Messaging](/docs/messaging/api/pricing) and [Phone Number](/docs/phone-numbers/pricing) products.

*Looking for details on pricing for Twilio products? Check out Twilio's [pricing page](https://www.twilio.com/en-us/pricing).*

## Base URL

All URLs in the reference documentation use the following base URL:

```bash
https://pricing.twilio.com/v2

```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://pricing.twilio.com/v2/Voice/Countries/US \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Pricing Voice Country Instance Resource

This resource represents prices to make voice calls to phone numbers in a given country, organized by phone number prefix (OutboundPrefixPriceWithOrigin), and the prices to receive voice calls on Twilio phone numbers in this country, organized by phone number type (InboundCallPrices).

### Resource URL \[#list-uri]

```bash
https://pricing.twilio.com/v2/Voice/Countries/{Country}

```

where \{Country} is the [ISO 3166-1 alpha-2 format][iso3166] country code

[iso3166]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

### Resource Properties \[#instance-properties]

A Pricing Voice Country resource is represented by the following properties:

```json
{"type":"object","refName":"pricing.v2.voice.voice_country","modelName":"pricing_v2_voice_voice_country","properties":{"country":{"type":"string","nullable":true,"description":"The name of the country."},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"outbound_prefix_prices":{"type":"array","items":{"type":"object","format":"outbound-prefix-price-with-origin","properties":{"origination_prefixes":{"type":"array","items":{"type":"string"}},"destination_prefixes":{"type":"array","items":{"type":"string"}},"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"friendly_name":{"type":"string"}}},"nullable":true,"description":"The list of [OutboundPrefixPriceWithOrigin](https://www.twilio.com/docs/voice/pricing#outbound-prefix-price-with-origin) records."},"inbound_call_prices":{"type":"array","items":{"type":"object","format":"inbound-call-price","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"number_type":{"type":"string"}}},"nullable":true,"description":"The list of [InboundCallPrice](https://www.twilio.com/docs/voice/pricing#inbound-call-price) records."},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which prices are measured, specified in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."}}}
```

### OutboundPrefixPrices record \[#outbound-prefix-prices]

| Property            | Description                                                                                                                                                                                                                                                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DestinationPrefixes | Set of destination phone number prefixes for the requested country with the same pricing                                                                                                                                                                                                                             |
| OriginationPrefixes | Set of origination phone number prefixes for the requested country with the same pricing. Valid set elements include specific prefixes, `ALL` (representing the entire set of all valid prefixes), or `ROW` (representing the rest-of-world, which is the set of remaining prefixes that aren't specifically listed) |
| FriendlyName        | Descriptive text for this set of prefixes                                                                                                                                                                                                                                                                            |
| BasePrice           | The retail price per minute to make a call to numbers matching this prefix list                                                                                                                                                                                                                                      |
| CurrentPrice        | The current price per minute (which accounts for any volume or custom price discounts) to make a call to numbers matching this prefix list.                                                                                                                                                                          |

### InboundCallPrice record \[#inbound-call-price]

| Property     | Description                                                                                                                         |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| NumberType   | The phone number type, either `local`, `mobile`, `national`, or `toll-free`                                                         |
| BasePrice    | The retail price per minute to receive a call to this phone number type.                                                            |
| CurrentPrice | The current price per minute (which accounts for any volume or custom price discounts) to receive a call to this phone number type. |

### Example

Fetch Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchVoiceNumber() {
  const number = await client.pricing.v2.voice.numbers("+15017122661").fetch();

  console.log(number.destinationNumber);
}

fetchVoiceNumber();
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

number = client.pricing.v2.voice.numbers("+15017122661").fetch()

print(number.destination_number)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V2.Voice;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var number = await NumberResource.FetchAsync(
            pathDestinationNumber: new Twilio.Types.PhoneNumber("+15017122661"));

        Console.WriteLine(number.DestinationNumber);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.pricing.v2.voice.Number;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Number number = Number.fetcher(new com.twilio.type.PhoneNumber("+15017122661")).fetch();

        System.out.println(number.getDestinationNumber());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	pricing "github.com/twilio/twilio-go/rest/pricing/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &pricing.FetchVoiceNumberParams{}

	resp, err := client.PricingV2.FetchVoiceNumber("+15017122661",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DestinationNumber != nil {
			fmt.Println(*resp.DestinationNumber)
		} else {
			fmt.Println(resp.DestinationNumber)
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

$number = $twilio->pricing->v2->voice->numbers("+15017122661")->fetch();

print $number->destinationNumber;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

number = @client
         .pricing
         .v2
         .voice
         .numbers('+15017122661')
         .fetch

puts number.destination_number
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v2:voice:numbers:fetch \
   --destination-number +15017122661
```

```bash
curl -X GET "https://pricing.twilio.com/v2/Voice/Numbers/%2B15017122661" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "United States",
  "destination_number": "+15017122661",
  "inbound_call_price": {
    "base_price": null,
    "current_price": null,
    "number_type": null
  },
  "iso_country": "US",
  "origination_number": "+987654321",
  "outbound_call_prices": [
    {
      "base_price": "0.013",
      "current_price": "0.013",
      "origination_prefixes": [
        "ALL"
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v2/Voice/Numbers/+18001234567"
}
```

## Pricing Voice Country List Resource \[#list]

### Resource URL \[#list-uri]

```bash
https://pricing.twilio.com/v2/Voice/Countries

```

### HTTP GET \[#list-get]

Returns a list of countries where Twilio voice services are available and the corresponding URL for
retrieving the country specific voice prices. This list includes [paging information][paging].

### Example \[#example-2]

Retrieve a list of countries where Twilio voice services are available.

[paging]: /docs/usage/twilios-response

[e164]: https://en.wikipedia.org/wiki/E.164

Read Country

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listVoiceCountry() {
  const countries = await client.pricing.v1.voice.countries.list({ limit: 20 });

  countries.forEach((c) => console.log(c.country));
}

listVoiceCountry();
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

countries = client.pricing.v1.voice.countries.list(limit=20)

for record in countries:
    print(record.country)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.Voice;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var countries = await CountryResource.ReadAsync(limit: 20);

        foreach (var record in countries) {
            Console.WriteLine(record.Country);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.pricing.v1.voice.Country;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Country> countries = Country.reader().limit(20).read();

        for (Country record : countries) {
            System.out.println(record.getCountry());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	pricing "github.com/twilio/twilio-go/rest/pricing/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &pricing.ListVoiceCountryParams{}
	params.SetLimit(20)

	resp, err := client.PricingV1.ListVoiceCountry(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Country != nil {
				fmt.Println(*resp[record].Country)
			} else {
				fmt.Println(resp[record].Country)
			}
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

$countries = $twilio->pricing->v1->voice->countries->read(20);

foreach ($countries as $record) {
    print $record->country;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

countries = @client
            .pricing
            .v1
            .voice
            .countries
            .list(limit: 20)

countries.each do |record|
   puts record.country
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:voice:countries:list
```

```bash
curl -X GET "https://pricing.twilio.com/v1/Voice/Countries?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "countries": [
    {
      "country": "Andorra",
      "iso_country": "AD",
      "url": "https://pricing.twilio.com/v1/Voice/Countries/AD"
    }
  ],
  "meta": {
    "first_page_url": "https://pricing.twilio.com/v1/Voice/Countries?PageSize=50&Page=0",
    "key": "countries",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://pricing.twilio.com/v1/Voice/Countries?PageSize=50&Page=0"
  }
}
```

## Pricing Voice Number Instance Resource

This resource represents the prices to make voice calls to a given phone number (OutboundCallPriceWithOrigin) and the prices
to receive voice calls to this Twilio phone number (InboundCallPrice).

### Resource URL \[#list-uri]

```bash
https://pricing.twilio.com/v2/Voice/Numbers/{Phone Number}

```

where \{Phone Number} is the phone number in [E.164][e164] format

### Resource Properties \[#instance-properties]

```json
{"type":"object","refName":"pricing.v2.voice.voice_number","modelName":"pricing_v2_voice_voice_number","properties":{"destination_number":{"type":"string","format":"phone-number","nullable":true,"description":"The destination phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"origination_number":{"type":"string","format":"phone-number","nullable":true,"description":"The origination phone number in [[E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"country":{"type":"string","nullable":true,"description":"The name of the country."},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)"},"outbound_call_prices":{"type":"array","nullable":true,"description":"The list of [OutboundCallPriceWithOrigin](https://www.twilio.com/docs/voice/pricing#outbound-call-price-with-origin) records.","items":{"type":"object","format":"outbound-call-price-with-origin","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"origination_prefixes":{"type":"array","items":{"type":"string"}}}}},"inbound_call_price":{"type":"object","format":"inbound-call-price","nullable":true,"description":"The [InboundCallPrice](https://www.twilio.com/docs/voice/pricing#inbound-call-price) record.","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"number_type":{"type":"string"}}},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which prices are measured, specified in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

### outboundCallPrices record \[#outbound-call-prices]

| Property            | Description                                                                                                                                                                                                                                                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BasePrice           | The retail price per minute to make a call to this number                                                                                                                                                                                                                                                            |
| CurrentPrice        | The current price per minute (which accounts for any volume or custom price discounts) to make a call to this number                                                                                                                                                                                                 |
| OriginationPrefixes | Set of origination phone number prefixes for the requested country with the same pricing. Valid set elements include specific prefixes, `ALL` (representing the entire set of all valid prefixes), or `ROW` (representing the rest-of-world, which is the set of remaining prefixes that aren't specifically listed) |

### Example \[#example-3]

Retrieve voice prices for phone number `+15108675310`.

Fetch Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchVoiceNumber() {
  const number = await client.pricing.v2.voice.numbers("+15017122661").fetch();

  console.log(number.destinationNumber);
}

fetchVoiceNumber();
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

number = client.pricing.v2.voice.numbers("+15017122661").fetch()

print(number.destination_number)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V2.Voice;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var number = await NumberResource.FetchAsync(
            pathDestinationNumber: new Twilio.Types.PhoneNumber("+15017122661"));

        Console.WriteLine(number.DestinationNumber);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.pricing.v2.voice.Number;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Number number = Number.fetcher(new com.twilio.type.PhoneNumber("+15017122661")).fetch();

        System.out.println(number.getDestinationNumber());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	pricing "github.com/twilio/twilio-go/rest/pricing/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &pricing.FetchVoiceNumberParams{}

	resp, err := client.PricingV2.FetchVoiceNumber("+15017122661",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DestinationNumber != nil {
			fmt.Println(*resp.DestinationNumber)
		} else {
			fmt.Println(resp.DestinationNumber)
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

$number = $twilio->pricing->v2->voice->numbers("+15017122661")->fetch();

print $number->destinationNumber;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

number = @client
         .pricing
         .v2
         .voice
         .numbers('+15017122661')
         .fetch

puts number.destination_number
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v2:voice:numbers:fetch \
   --destination-number +15017122661
```

```bash
curl -X GET "https://pricing.twilio.com/v2/Voice/Numbers/%2B15017122661" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "United States",
  "destination_number": "+15017122661",
  "inbound_call_price": {
    "base_price": null,
    "current_price": null,
    "number_type": null
  },
  "iso_country": "US",
  "origination_number": "+987654321",
  "outbound_call_prices": [
    {
      "base_price": "0.013",
      "current_price": "0.013",
      "origination_prefixes": [
        "ALL"
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v2/Voice/Numbers/+18001234567"
}
```

### Resource URL by Origination Number \[#list-uri-by-origination-number]

```bash
https://pricing.twilio.com/v2/Voice/Numbers/{Destination Number}?OriginationNumber={Origination Number}

```

### Filter by Origination Number Example

Retrieve voice prices for phone number `+15108675310` where the Origination Number is `+12421234567`.

Get Voice Prices for Number by Origination Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchVoiceNumber() {
  const number = await client.pricing.v2.voice
    .numbers("+15017122661")
    .fetch({ originationNumber: "+15108675310" });

  console.log(number.outboundCallPrices);
}

fetchVoiceNumber();
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

number = client.pricing.v2.voice.numbers("+15017122661").fetch(
    origination_number="+15108675310"
)

print(number.outbound_call_prices)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V2.Voice;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var number = await NumberResource.FetchAsync(
            pathDestinationNumber: new Twilio.Types.PhoneNumber("+15017122661"),
            originationNumber: new Twilio.Types.PhoneNumber("+15108675310"));

        Console.WriteLine(number.OutboundCallPrices);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.pricing.v2.voice.Number;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Number number = Number.fetcher(new com.twilio.type.PhoneNumber("+15017122661"))
                            .setOriginationNumber(new com.twilio.type.PhoneNumber("+15108675310"))
                            .fetch();

        System.out.println(number.getOutboundCallPrices());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	pricing "github.com/twilio/twilio-go/rest/pricing/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &pricing.FetchVoiceNumberParams{}
	params.SetOriginationNumber("+15108675310")

	resp, err := client.PricingV2.FetchVoiceNumber("+15017122661",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.OutboundCallPrices != nil {
			for _, item := range *resp.OutboundCallPrices {
				fmt.Println(item)
			}
		} else {
			fmt.Println(resp.OutboundCallPrices)
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

$number = $twilio->pricing->v2->voice
    ->numbers("+15017122661")
    ->fetch(["originationNumber" => "+15108675310"]);

print $number->outboundCallPrices;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

number = @client
         .pricing
         .v2
         .voice
         .numbers('+15017122661')
         .fetch(origination_number: '+15108675310')

puts number.outbound_call_prices
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v2:voice:numbers:fetch \
   --destination-number +15017122661 \
   --origination-number +15108675310
```

```bash
curl -X GET "https://pricing.twilio.com/v2/Voice/Numbers/%2B15017122661?OriginationNumber=%2B15108675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "United States",
  "destination_number": "+15017122661",
  "inbound_call_price": {
    "base_price": null,
    "current_price": null,
    "number_type": null
  },
  "iso_country": "US",
  "origination_number": "+15108675310",
  "outbound_call_prices": [
    {
      "base_price": "0.013",
      "current_price": "0.013",
      "origination_prefixes": [
        "ALL"
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v2/Voice/Numbers/+18001234567"
}
```

### Get Prices for Individual Countries

You can also retrieve pricing information for individual countries.

Get Voice Prices for Individiual Countries

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchVoiceCountry() {
  const country = await client.pricing.v1.voice.countries("BB").fetch();

  console.log(country.country);
}

fetchVoiceCountry();
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

country = client.pricing.v1.voice.countries("BB").fetch()

print(country.country)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.Voice;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var country = await CountryResource.FetchAsync(pathIsoCountry: "BB");

        Console.WriteLine(country.Country);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.pricing.v1.voice.Country;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Country country = Country.fetcher("BB").fetch();

        System.out.println(country.getCountry());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.PricingV1.FetchVoiceCountry("BB")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Country != nil {
			fmt.Println(*resp.Country)
		} else {
			fmt.Println(resp.Country)
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

$country = $twilio->pricing->v1->voice->countries("BB")->fetch();

print $country->country;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

country = @client
          .pricing
          .v1
          .voice
          .countries('BB')
          .fetch

puts country.country
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:voice:countries:fetch \
   --iso-country BB
```

```bash
curl -X GET "https://pricing.twilio.com/v1/Voice/Countries/BB" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "United States",
  "inbound_call_prices": [
    {
      "current_price": "0.0085",
      "number_type": "local",
      "base_price": "0.0085"
    },
    {
      "current_price": "0.022",
      "number_type": "toll free",
      "base_price": "0.022"
    }
  ],
  "iso_country": "BB",
  "outbound_prefix_prices": [
    {
      "prefixes": [
        "1907"
      ],
      "current_price": "0.090",
      "friendly_name": "Programmable Outbound Minute - United States - Alaska",
      "base_price": "0.090"
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v1/Voice/Countries/US"
}
```
