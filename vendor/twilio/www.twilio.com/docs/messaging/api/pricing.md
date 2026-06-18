# Pricing: Messaging Countries resource

You can pull real-time, account-specific pricing for Twilio's [Messaging API](/docs/messaging) product using the Pricing API.

Prices can be retrieved at a country level directly via the [Countries resource](#fetch-a-countries-resource) or for a specific phone number by leveraging the Lookup API and Countries resource.

You may also wish to check out our Pricing API resources for Twilio's [Voice](/docs/voice/pricing) and [Phone Number](/docs/phone-numbers/pricing) products.

> \[!NOTE]
>
> Looking for details on pricing for Twilio products? Check out Twilio's [pricing page](https://www.twilio.com/en-us/pricing).

```bash
curl -G https://pricing.twilio.com/v1/Messaging/Countries/US \
    -u '[YOUR ACCOUNT SID]:[YOUR AUTH TOKEN]'

```

You can find your account SID and auth token on [your Twilio Console](https://www.twilio.com/console).

## Countries properties

<OperationTable type="properties" data={{"type":"object","refName":"pricing.v1.messaging.messaging_country","modelName":"pricing_v1_messaging_messaging_country","properties":{"country":{"type":"string","nullable":true,"description":"The name of the country."},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"outbound_sms_prices":{"type":"array","items":{"type":"object","format":"outbound-sms-price","properties":{"carrier":{"type":"string"},"mcc":{"type":"string"},"mnc":{"type":"string"},"prices":{"type":"array","items":{"type":"object","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"number_type":{"type":"string"}}}}}},"nullable":true,"description":"The list of [OutboundSMSPrice](https://www.twilio.com/docs/sms/api/pricing#outbound-sms-price) records that represent the price to send a message for each MCC/MNC applicable in this country."},"inbound_sms_prices":{"type":"array","items":{"type":"object","format":"inbound-sms-price","properties":{"base_price":{"type":"number","x-twilio":{"overrideType":"string"}},"current_price":{"type":"number","x-twilio":{"overrideType":"string"}},"number_type":{"type":"string"}}},"nullable":true,"description":"The list of [InboundPrice](https://www.twilio.com/docs/sms/api/pricing#inbound-price) records that describe the price to receive an inbound SMS to the different Twilio phone number types supported in this country"},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which prices are measured, specified in [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."}}}} />

## Fetch a Countries resource

`GET https://pricing.twilio.com/v1/Messaging/Countries/{IsoCountry}`

In the above API call, \{IsoCountry} is the [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

### Path parameters

```json
[{"name":"IsoCountry","in":"path","description":"The [ISO country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the pricing information to fetch.","schema":{"type":"string","format":"iso-country-code"},"required":true}]
```

Fetch Messaging Prices for Estonia

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchMessagingCountry() {
  const country = await client.pricing.v1.messaging.countries("EE").fetch();

  console.log(country.url);
}

fetchMessagingCountry();
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

country = client.pricing.v1.messaging.countries("EE").fetch()

print(country.url)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.Messaging;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var country = await CountryResource.FetchAsync(pathIsoCountry: "EE");

        Console.WriteLine(country.Url);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.pricing.v1.messaging.Country;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Country country = Country.fetcher("EE").fetch();

        System.out.println(country.getUrl());
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

	resp, err := client.PricingV1.FetchMessagingCountry("EE")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Url != nil {
			fmt.Println(*resp.Url)
		} else {
			fmt.Println(resp.Url)
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

$country = $twilio->pricing->v1->messaging->countries("EE")->fetch();

print $country->url;
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
          .messaging
          .countries('EE')
          .fetch

puts country.url
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:messaging:countries:fetch \
   --iso-country EE
```

```bash
curl -X GET "https://pricing.twilio.com/v1/Messaging/Countries/EE" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "country": "country",
  "inbound_sms_prices": [
    {
      "base_price": "0.05",
      "current_price": "0.05",
      "number_type": "mobile"
    }
  ],
  "iso_country": "EE",
  "outbound_sms_prices": [
    {
      "carrier": "att",
      "mcc": "foo",
      "mnc": "bar",
      "prices": [
        {
          "base_price": "0.05",
          "current_price": "0.05",
          "number_type": "mobile"
        }
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v1/Messaging/Countries/US"
}
```

The Resource Twilio returns represents prices to send messages to phone numbers in a given country, organized by Mobile Country Code (MCC) and Mobile Network Code (MNC), and the prices to receive messages on Twilio phone numbers in this country, organized by phone number type.

A Pricing resource has the following properties attached based on the type of Price record it is ([Outbound SMS](#outbound-sms-price), [Outbound Price](#outbound-price), or [Inbound Price](#inbound-price)):

### OutboundSmsPrice \[#outbound-sms-price]

| Property | Description                                                                                                                                           |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| MCC      | The Mobile Country Code                                                                                                                               |
| MNC      | The Mobile Network Code                                                                                                                               |
| Carrier  | The name of the carrier for this MCC/MNC combination                                                                                                  |
| Prices   | List of [OutboundPrice](#outbound-price) records that represent the prices to send a message to this MCC/MNC from different Twilio phone number types |

### OutboundPrice \[#outbound-price]

| Property     | Description                                                                                              |
| :----------- | :------------------------------------------------------------------------------------------------------- |
| NumberType   | The type of Twilio phone number sending a message, either `mobile`, `local`, `shortcode`, or `toll free` |
| BasePrice    | The retail price to send a message                                                                       |
| CurrentPrice | The current price (which accounts for any volume or custom price discounts) to send a message            |

### InboundPrice \[#inbound-price]

| Property     | Description                                                                                                |
| :----------- | :--------------------------------------------------------------------------------------------------------- |
| NumberType   | The type of Twilio phone number receiving a message, either `mobile`, `local`, `shortcode`, or `toll free` |
| BasePrice    | The retail price to receive a message                                                                      |
| CurrentPrice | The current price (which accounts for any volume or custom price discounts) to receive a message           |

## Read multiple Countries resources

`GET https://pricing.twilio.com/v1/Messaging/Countries`

Returns a list of countries where Twilio Messaging Services are available along with the corresponding URL for
retrieving the country-specific Messaging prices. This list includes [paging information][paging].

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read all Countries resources

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMessagingCountry() {
  const countries = await client.pricing.v1.messaging.countries.list({
    limit: 20,
  });

  countries.forEach((c) => console.log(c.country));
}

listMessagingCountry();
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

countries = client.pricing.v1.messaging.countries.list(limit=20)

for record in countries:
    print(record.country)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Pricing.V1.Messaging;
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
import com.twilio.rest.pricing.v1.messaging.Country;
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

	params := &pricing.ListMessagingCountryParams{}
	params.SetLimit(20)

	resp, err := client.PricingV1.ListMessagingCountry(params)
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

$countries = $twilio->pricing->v1->messaging->countries->read(20);

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
            .messaging
            .countries
            .list(limit: 20)

countries.each do |record|
   puts record.country
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:pricing:v1:messaging:countries:list
```

```bash
curl -X GET "https://pricing.twilio.com/v1/Messaging/Countries?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "countries": [],
  "meta": {
    "first_page_url": "https://pricing.twilio.com/v1/Messaging/Countries?PageSize=50&Page=0",
    "key": "countries",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://pricing.twilio.com/v1/Messaging/Countries?PageSize=50&Page=0"
  }
}
```

[paging]: /docs/usage/twilios-response
