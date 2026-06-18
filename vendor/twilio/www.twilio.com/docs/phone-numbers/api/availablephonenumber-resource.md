# AvailablePhoneNumber resource

The `AvailablePhoneNumbers` resource and its subresources let you search for local, toll-free, and mobile phone numbers that you can purchase. You can search for phone numbers that:

* Match a specific pattern
* Are in a specific country
* Belong to a particular area code (NPA) or exchange (NXX)
* Fall within a defined geographic region

To find available numbers, make a request to one of the following subresources:

* [AvailablePhoneNumbers Local subresource](/docs/phone-numbers/api/availablephonenumberlocal-resource)
* [AvailablePhoneNumbers TollFree subresource](/docs/phone-numbers/api/availablephonenumber-tollfree-resource)
* [AvailablePhoneNumbers Mobile subresource](/docs/phone-numbers/api/availablephonenumber-mobile-resource)

> \[!NOTE]
>
> After you identify a number to purchase, provision it with the [Incoming Phone Numbers API](/docs/phone-numbers/api/incomingphonenumber-resource).

## Supported Countries and Types

To list the subresources available to your account in a given country, query the `AvailablePhoneNumbers` resource. For full information about our phone number support, see [Twilio phone number availability and their capabilities](https://help.twilio.com/articles/223183068) and [Twilio phone number types and their capabilities](https://help.twilio.com/articles/223135367). Each resource instance has the following properties.

<OperationTable type="properties" data={{"type":"object","refName":"api.v2010.account.available_phone_number_country","modelName":"api_v2010_account_available_phone_number_country","properties":{"country_code":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country."},"country":{"type":"string","nullable":true,"description":"The name of the country."},"uri":{"type":"string","format":"uri","nullable":true,"description":"The URI of the Country resource, relative to `https://api.twilio.com`."},"beta":{"type":"boolean","nullable":true,"description":"Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program."},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`."}}}} />

## Fetch a specific country

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CountryCode","in":"path","description":"The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country to fetch available phone number information about.","schema":{"type":"string","format":"iso-country-code"},"required":true}]
```

The following example shows how to fetch information about available phone numbers in a specific country:

Fetch a specific country

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchAvailablePhoneNumberCountry() {
  const availablePhoneNumber = await client.availablePhoneNumbers("US").fetch();

  console.log(availablePhoneNumber.countryCode);
}

fetchAvailablePhoneNumberCountry();
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

available_phone_number = client.available_phone_numbers("US").fetch()

print(available_phone_number.country_code)
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

        var availablePhoneNumberCountry =
            await AvailablePhoneNumberCountryResource.FetchAsync(pathCountryCode: "US");

        Console.WriteLine(availablePhoneNumberCountry.CountryCode);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.AvailablePhoneNumberCountry;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        AvailablePhoneNumberCountry availablePhoneNumberCountry = AvailablePhoneNumberCountry.fetcher("US").fetch();

        System.out.println(availablePhoneNumberCountry.getCountryCode());
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

	params := &api.FetchAvailablePhoneNumberCountryParams{}

	resp, err := client.Api.FetchAvailablePhoneNumberCountry("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.CountryCode != nil {
			fmt.Println(*resp.CountryCode)
		} else {
			fmt.Println(resp.CountryCode)
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

$available_phone_number = $twilio->availablePhoneNumbers("US")->fetch();

print $available_phone_number->countryCode;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

available_phone_number = @client
                         .api
                         .v2010
                         .available_phone_numbers('US')
                         .fetch

puts available_phone_number.country_code
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:fetch \
   --country-code US
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "beta": false,
  "country": "United States",
  "country_code": "US",
  "subresource_uris": {
    "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Local.json",
    "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/TollFree.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US.json"
}
```

## Read a list of countries

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resources.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

The following example shows how to retrieve a list of all countries where phone numbers are available:

Read a list of countries

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberCountry() {
  const availablePhoneNumbers = await client.availablePhoneNumbers.list({
    limit: 20,
  });

  availablePhoneNumbers.forEach((a) => console.log(a.countryCode));
}

listAvailablePhoneNumberCountry();
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

available_phone_numbers = client.available_phone_numbers.list()

for record in available_phone_numbers:
    print(record.country_code)
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

        var availablePhoneNumberCountries =
            await AvailablePhoneNumberCountryResource.ReadAsync(limit: 20);

        foreach (var record in availablePhoneNumberCountries) {
            Console.WriteLine(record.CountryCode);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.AvailablePhoneNumberCountry;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<AvailablePhoneNumberCountry> availablePhoneNumberCountries =
            AvailablePhoneNumberCountry.reader().limit(20).read();

        for (AvailablePhoneNumberCountry record : availablePhoneNumberCountries) {
            System.out.println(record.getCountryCode());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListAvailablePhoneNumberCountryParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberCountry(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].CountryCode != nil {
				fmt.Println(*resp[record].CountryCode)
			} else {
				fmt.Println(resp[record].CountryCode)
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

$availablePhoneNumbers = $twilio->availablePhoneNumbers->read(20);

foreach ($availablePhoneNumbers as $record) {
    print $record->countryCode;
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

available_phone_numbers = @client
                          .api
                          .v2010
                          .available_phone_numbers
                          .list(limit: 20)

available_phone_numbers.each do |record|
   puts record.country_code
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "countries": [
    {
      "beta": false,
      "country": "Denmark",
      "country_code": "DK",
      "subresource_uris": {
        "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK/Local.json",
        "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK/TollFree.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK.json"
    },
    {
      "beta": false,
      "country": "Australia",
      "country_code": "AU",
      "subresource_uris": {
        "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/Local.json",
        "mobile": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/Mobile.json",
        "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/TollFree.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU.json"
    }
  ],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json"
}
```
