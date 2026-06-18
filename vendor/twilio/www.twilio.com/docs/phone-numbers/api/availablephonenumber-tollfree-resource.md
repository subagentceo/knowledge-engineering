# AvailablePhoneNumber TollFree resource

To find toll-free phone numbers you can purchase, use the `AvailablePhoneNumbers TollFree` subresource.

## Focus your phone number search

To focus your search of available phone numbers, provide one or more of the following characteristics:

* A pattern within the phone number
* A state, province, country, or postal code for the phone number ([North American Numbering Plan (NANP)][nanp] numbers only)
* An area code or exchange
* A feature that phone number supports, like SMS

[nanp]: https://en.wikipedia.org/wiki/North_American_Numbering_Plan

Twilio seeks to keep a wide variety of phone numbers in stock at all times. To learn which countries Twilio supports, see [pricing](https://www.twilio.com/en-us/pricing).

## TollFree Properties

<OperationTable type="properties" data={{"title":"ListAvailablePhoneNumberTollFreeResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"available_phone_numbers":{"type":"array","items":{"type":"object","refName":"api.v2010.account.available_phone_number_country.available_phone_number_toll_free","modelName":"api_v2010_account_available_phone_number_country_available_phone_number_toll_free","properties":{"friendly_name":{"type":"string","format":"phone-number","nullable":true,"description":"A formatted version of the phone number."},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"lata":{"type":"string","nullable":true,"description":"The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada."},"locality":{"type":"string","nullable":true,"description":"The locality or city of this phone number's location."},"rate_center":{"type":"string","nullable":true,"description":"The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada."},"latitude":{"type":"number","nullable":true,"description":"The latitude of this phone number's location. Available for only phone numbers from the US and Canada."},"longitude":{"type":"number","nullable":true,"description":"The longitude of this phone number's location. Available for only phone numbers from the US and Canada."},"region":{"type":"string","nullable":true,"description":"The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada."},"postal_code":{"type":"string","nullable":true,"description":"The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada."},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number."},"address_requirements":{"type":"string","nullable":true,"description":"The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required."},"beta":{"type":"boolean","nullable":true,"description":"Whether the phone number is new to the Twilio platform. Can be: `true` or `false`."},"capabilities":{"type":"object","format":"phone-number-capabilities","x-class-extra-annotation":"@JsonInclude(JsonInclude.Include.NON_NULL)","nullable":true,"description":"The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.","properties":{"mms":{"type":"boolean"},"sms":{"type":"boolean"},"voice":{"type":"boolean"},"fax":{"type":"boolean"}}}}}}}}} />

## Read multiple AvailablePhoneNumberTollFree resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CountryCode","in":"path","description":"The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.","schema":{"type":"string","format":"iso-country-code"},"required":true}]
```

### Query parameters

```json
[{"name":"AreaCode","in":"query","description":"The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.","schema":{"type":"integer"}},{"name":"Contains","in":"query","description":"Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.","schema":{"type":"string"}},{"name":"SmsEnabled","in":"query","description":"Whether the phone numbers can receive text messages. Can be: `true` or `false`.","schema":{"type":"boolean"}},{"name":"MmsEnabled","in":"query","description":"Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.","schema":{"type":"boolean"}},{"name":"VoiceEnabled","in":"query","description":"Whether the phone numbers can receive calls. Can be: `true` or `false`.","schema":{"type":"boolean"}},{"name":"ExcludeAllAddressRequired","in":"query","description":"Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.","schema":{"type":"boolean"}},{"name":"ExcludeLocalAddressRequired","in":"query","description":"Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.","schema":{"type":"boolean"}},{"name":"ExcludeForeignAddressRequired","in":"query","description":"Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.","schema":{"type":"boolean"}},{"name":"Beta","in":"query","description":"Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.","schema":{"type":"boolean"},"examples":{"readFull":{"value":"true"},"readEmpty":{"value":"true"}}},{"name":"NearNumber","in":"query","description":"Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.","schema":{"type":"string","format":"phone-number"}},{"name":"NearLatLong","in":"query","description":"Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.","schema":{"type":"string"}},{"name":"Distance","in":"query","description":"The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.","schema":{"type":"integer"}},{"name":"InPostalCode","in":"query","description":"Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.","schema":{"type":"string"}},{"name":"InRegion","in":"query","description":"Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.","schema":{"type":"string"}},{"name":"InRateCenter","in":"query","description":"Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.","schema":{"type":"string"}},{"name":"InLata","in":"query","description":"Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.","schema":{"type":"string"}},{"name":"InLocality","in":"query","description":"Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.","schema":{"type":"string"}},{"name":"FaxEnabled","in":"query","description":"Whether the phone numbers can receive faxes. Can be: `true` or `false`.","schema":{"type":"boolean"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

### Find phone numbers based on their characteristics

Find available toll-free phone numbers by area code

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    areaCode: 510,
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    area_code=510, limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "US", areaCode: 510, limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setAreaCode(510).limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetAreaCode(510)
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["areaCode" => 510], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               area_code: 510,
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --area-code 510
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?AreaCode=510&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers by state

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    inRegion: "AR",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    in_region="AR", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "US", inRegion: "AR", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setInRegion("AR").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetInRegion("AR")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["inRegion" => "AR"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               in_region: 'AR',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --in-region AR
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?InRegion=AR&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers by prefix

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("GB").tollFree.list({
    contains: "+44808",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("GB").toll_free.list(
    contains="+44808", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "GB", contains: "+44808", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("GB").setContains("+44808").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("+44808")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("GB",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("GB")
    ->tollFree->read(["contains" => "+44808"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('GB')
             .toll_free
             .list(
               contains: '+44808',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code GB \
   --contains +44808
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/GB/TollFree.json?Contains=%2B44808&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers by feature

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("GB").tollFree.list({
    smsEnabled: true,
    voiceEnabled: true,
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("GB").toll_free.list(
    sms_enabled=True, voice_enabled=True, limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees = await TollFreeResource.ReadAsync(
            pathCountryCode: "GB", smsEnabled: true, voiceEnabled: true, limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees =
            TollFree.reader("GB").setSmsEnabled(true).setVoiceEnabled(true).limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetSmsEnabled(true)
	params.SetVoiceEnabled(true)
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("GB",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio->availablePhoneNumbers("GB")->tollFree->read(
    [
        "smsEnabled" => true,
        "voiceEnabled" => true,
    ],
    20
);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('GB')
             .toll_free
             .list(
               sms_enabled: true,
               voice_enabled: true,
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code GB \
   --sms-enabled \
   --voice-enabled
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/GB/TollFree.json?SmsEnabled=true&VoiceEnabled=true&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers without address requirements

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    excludeAllAddressRequired: true,
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    exclude_all_address_required=True, limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees = await TollFreeResource.ReadAsync(
            pathCountryCode: "US", excludeAllAddressRequired: true, limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setExcludeAllAddressRequired(true).limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetExcludeAllAddressRequired(true)
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["excludeAllAddressRequired" => true], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               exclude_all_address_required: true,
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --exclude-all-address-required
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?ExcludeAllAddressRequired=true&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Find phone numbers with a given pattern

Find available toll-free phone numbers that start with a pattern

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    contains: "+1877555",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    contains="+1877555", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees = await TollFreeResource.ReadAsync(
            pathCountryCode: "US", contains: "+1877555", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setContains("+1877555").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("+1877555")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["contains" => "+1877555"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               contains: '+1877555',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --contains +1877555
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?Contains=%2B1877555&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers that end with a pattern

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    contains: "7306$",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    contains="7306$", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "US", contains: "7306$", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setContains("7306$").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("7306$")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["contains" => "7306$"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               contains: '7306$',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --contains 7306$
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?Contains=7306%24&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers that contain a pattern

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    contains: "%979%",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    contains="%979%", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "US", contains: "%979%", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setContains("%979%").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("%979%")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["contains" => "%979%"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               contains: '%979%',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --contains %979%
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?Contains=%25979%25&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Find available toll-free phone numbers by character pattern

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    contains: "STORM",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    contains="STORM", limit=20
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees =
            await TollFreeResource.ReadAsync(pathCountryCode: "US", contains: "STORM", limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US").setContains("STORM").limit(20).read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("STORM")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio
    ->availablePhoneNumbers("US")
    ->tollFree->read(["contains" => "STORM"], 20);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               contains: 'STORM',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --contains STORM
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?Contains=STORM&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Find phone numbers using advanced filters

Find available toll-free phone numbers with advanced filters

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAvailablePhoneNumberTollFree() {
  const tollFrees = await client.availablePhoneNumbers("US").tollFree.list({
    contains: "555",
    distance: 50,
    inRegion: "CA",
    nearLatLong: "37.840699,-122.461853",
    limit: 20,
  });

  tollFrees.forEach((t) => console.log(t.end));
}

listAvailablePhoneNumberTollFree();
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

toll_frees = client.available_phone_numbers("US").toll_free.list(
    contains="555",
    near_lat_long="37.840699,-122.461853",
    distance=50,
    in_region="CA",
    limit=20,
)

for record in toll_frees:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.AvailablePhoneNumberCountry;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var tollFrees = await TollFreeResource.ReadAsync(
            pathCountryCode: "US",
            contains: "555",
            nearLatLong: "37.840699,-122.461853",
            distance: 50,
            inRegion: "CA",
            limit: 20);

        foreach (var record in tollFrees) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.availablephonenumbercountry.TollFree;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TollFree> tollFrees = TollFree.reader("US")
                                              .setContains("555")
                                              .setNearLatLong("37.840699,-122.461853")
                                              .setDistance(50)
                                              .setInRegion("CA")
                                              .limit(20)
                                              .read();

        for (TollFree record : tollFrees) {
            System.out.println(record.getEnd());
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

	params := &api.ListAvailablePhoneNumberTollFreeParams{}
	params.SetContains("555")
	params.SetNearLatLong("37.840699,-122.461853")
	params.SetDistance(50)
	params.SetInRegion("CA")
	params.SetLimit(20)

	resp, err := client.Api.ListAvailablePhoneNumberTollFree("US",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$tollFrees = $twilio->availablePhoneNumbers("US")->tollFree->read(
    [
        "contains" => "555",
        "nearLatLong" => "37.840699,-122.461853",
        "distance" => 50,
        "inRegion" => "CA",
    ],
    20
);

foreach ($tollFrees as $record) {
    print $record->end;
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

toll_frees = @client
             .api
             .v2010
             .available_phone_numbers('US')
             .toll_free
             .list(
               contains: '555',
               near_lat_long: '37.840699,-122.461853',
               distance: 50,
               in_region: 'CA',
               limit: 20
             )

toll_frees.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:available-phone-numbers:toll-free:list \
   --country-code US \
   --contains 555 \
   --near-lat-long 37.840699,-122.461853 \
   --distance 50 \
   --in-region CA
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AvailablePhoneNumbers/US/TollFree.json?Contains=555&NearLatLong=37.840699%2C-122.461853&Distance=50&InRegion=CA&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Purchase your phone number

To purchase the phone number you found, make a `POST` request to the [IncomingPhoneNumbers list resource](/docs/phone-numbers/api/incomingphonenumber-resource). Set the `PhoneNumber` parameter value to your found number.
