# Pricing: Phone Numbers Resource

The Pricing Phone Numbers resource provides an API to pull real-time, account-specific pricing for Twilio [phone numbers](/docs/phone-numbers/api).

Prices can be retrieved at a country level via the [Pricing Phone Numbers Countries
resource](#pricing-phone-numbers-country-instance-resource).

You may also want to check out our Pricing API resources for Twilio [Messaging](/docs/messaging/api/pricing) and [Voice](/docs/voice/pricing) products.

> \[!NOTE]
>
> Looking to learn more about pricing for Twilio products? [Check out the Twilio pricing page](https://www.twilio.com/en-us/pricing).

## Base URL

All URLs in the reference documentation use the following base URL:

```bash
https://pricing.twilio.com/v1
```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://pricing.twilio.com/v1/PhoneNumbers/Countries/US \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Pricing phone numbers country instance resource

This resource represents the Twilio phone number prices for a given country, separated by phone number type (PhoneNumberPrices).

### Resource url \[#list-uri]

```bash
https://pricing.twilio.com/v1/PhoneNumbers/Countries/{Country}
```

where \{Country} is the [ISO 3166-1 alpha-2 format][iso3166] country code

[iso3166]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

A Pricing Phone Numbers Country resource is represented by the following properties:

```json
{"type":"object","refName":"pricing.v1.phone_number.phone_number_country","modelName":"pricing_v1_phone_number_phone_number_country","properties":{"country":{"type":"string","nullable":true,"description":"The name of the country."},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"phone_number_prices":{"type":"array","items":{"type":"object","format":"phone-number-price","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"number_type":{"type":"string"}}},"nullable":true,"description":"The list of [PhoneNumberPrice](https://www.twilio.com/docs/phone-numbers/pricing#phone-number-price) records."},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which prices are measured, specified in [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."}}}
```

### Phone number price record \[#phone-number-price]

| Property        | Description                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `number_type`   | The phone number type, either `local`, `mobile`, `national`, or `toll free`                                             |
| `base_price`    | The retail price per month for this Twilio phone number type                                                            |
| `current_price` | The current price per month (which accounts for any volume or custom price discounts) for this Twilio phone number type |

> \[!CAUTION]
>
> Countries for which phone numbers are not available for purchase through the API or are not considered "Generally Available Numbers" return the following JSON:
>
> ```json
> {"url": null, "country": null, "price_unit": null, "phone_number_prices": null, "iso_country": null}
> ```

### Example

Get Phone Number prices for the US

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumberCountry() {
  const country = await client.pricing.v1.phoneNumbers.countries("US").fetch();

  console.log(country.country);
}

fetchPhoneNumberCountry();
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

country = client.pricing.v1.phone_numbers.countries("US").fetch()

print(country.country)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.PhoneNumber;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var country = await CountryResource.FetchAsync(pathIsoCountry: "US");

        Console.WriteLine(country.Country);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.pricing.v1.phonenumber.Country;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Country country = Country.fetcher("US").fetch();

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

	resp, err := client.PricingV1.FetchPhoneNumberCountry("US")
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

$country = $twilio->pricing->v1->phoneNumbers->countries("US")->fetch();

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
          .phone_numbers
          .countries('US')
          .fetch

puts country.country
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:phone-numbers:countries:fetch \
   --iso-country US
```

```bash
curl -X GET "https://pricing.twilio.com/v1/PhoneNumbers/Countries/US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "United States",
  "iso_country": "US",
  "phone_number_prices": [
    {
      "number_type": "local",
      "base_price": "1.00",
      "current_price": "1.00"
    },
    {
      "number_type": "toll free",
      "base_price": "2.00",
      "current_price": "2.00"
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v1/PhoneNumbers/Countries/US"
}
```

## Pricing phone numbers country list resource \[#list]

### Resource url \[#list-uri]

```bash
https://pricing.twilio.com/v1/PhoneNumbers/Countries
```

### Http get \[#list-get]

Returns a list of countries where Twilio phone numbers are supported. This list includes [paging information][paging].

### Example \[#example-2]

Retrieve a list of countries where Twilio phone numbers are supported.

[paging]: /docs/usage/twilios-response#pagination

Get a list of countries where Twilio phone numbers are supported

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPhoneNumberCountry() {
  const countries = await client.pricing.v1.phoneNumbers.countries.list({
    limit: 20,
  });

  countries.forEach((c) => console.log(c.country));
}

listPhoneNumberCountry();
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

countries = client.pricing.v1.phone_numbers.countries.list(limit=20)

for record in countries:
    print(record.country)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.PhoneNumber;
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
import com.twilio.rest.pricing.v1.phonenumber.Country;
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

	params := &pricing.ListPhoneNumberCountryParams{}
	params.SetLimit(20)

	resp, err := client.PricingV1.ListPhoneNumberCountry(params)
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

$countries = $twilio->pricing->v1->phoneNumbers->countries->read(20);

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
            .phone_numbers
            .countries
            .list(limit: 20)

countries.each do |record|
   puts record.country
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:phone-numbers:countries:list
```

```bash
curl -X GET "https://pricing.twilio.com/v1/PhoneNumbers/Countries?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "countries": [
    {
      "country": "Austria",
      "iso_country": "AT",
      "url": "https://pricing.twilio.com/v1/PhoneNumbers/Countries/AT"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://pricing.twilio.com/v1/PhoneNumbers/Countries?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://pricing.twilio.com/v1/PhoneNumbers/Countries?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "countries"
  }
}
```
