# REST API: Addresses

An Address instance resource represents your or your customer's physical
location within a country. Around the world, some local authorities require
the name and address of the user to be on file with Twilio to purchase and own
a phone number. Address requirements are exposed as a property on the [AvailablePhoneNumber](/docs/phone-numbers/api/availablephonenumber-resource) resource.

Addresses contain the name of your company or your customer's
company in addition to location information and an optional friendly name. Each
Address created on an account or subaccount can be used for any phone numbers
purchased on that account. After creating an address, it can be used to satisfy
the requirements for multiple phone numbers and phone numbers with address
requirements can be purchased using the [IncomingPhoneNumber](/docs/phone-numbers/api/incomingphonenumber-resource) resource.

In some countries, to comply with local regulations, addresses are validated to ensure the integrity and accuracy of the data provided. In those countries, if the address you provide does not pass validation, it is not accepted as an Address and the error code [21628](/docs/api/errors/21628) is returned. If the address submitted is not an exact match but is similar to a valid address, we'll create the Address using the valid address we found, unless you include the AutoCorrectAddress=false parameter in the request. In that case, we'll provide it as a suggested address in error code [21629](/docs/api/errors/21629). If the suggested address is indeed the address of your company or your customer's company, then use the suggested format to create a valid Address.

The Address list resource represents all of the Addresses that you have created
on your account within Twilio. You can `POST` to Addresses to create a new
address or modify an existing address.

## Address Properties

<OperationTable type="properties" data={{"title":"ListAddressResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"addresses":{"type":"array","items":{"type":"object","refName":"api.v2010.account.address","modelName":"api_v2010_account_address","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource."},"city":{"type":"string","nullable":true,"description":"The city in which the address is located."},"customer_name":{"type":"string","nullable":true,"description":"The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"iso_country":{"type":"string","format":"iso-country-code","nullable":true,"description":"The ISO country code of the address."},"postal_code":{"type":"string","nullable":true,"description":"The postal code of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"region":{"type":"string","nullable":true,"description":"The state or region of the address."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Address resource."},"street":{"type":"string","nullable":true,"description":"The number and street address of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."},"emergency_enabled":{"type":"boolean","nullable":true,"description":"Whether emergency calling has been enabled on this number."},"validated":{"type":"boolean","nullable":true,"description":"Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid."},"verified":{"type":"boolean","nullable":true,"description":"Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid."},"street_secondary":{"type":"string","nullable":true,"description":"The additional number and street address of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}}}}}} />

## Create an Address resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses.json`

Creates a new Address within your account.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Address resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateAddressRequest","required":["CustomerName","Street","City","Region","PostalCode","IsoCountry"],"properties":{"CustomerName":{"type":"string","description":"The name to associate with the new address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Street":{"type":"string","description":"The number and street address of the new address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"City":{"type":"string","description":"The city of the new address."},"Region":{"type":"string","description":"The state or region of the new address."},"PostalCode":{"type":"string","description":"The postal code of the new address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"IsoCountry":{"type":"string","format":"iso-country-code","description":"The ISO country code of the new address."},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"EmergencyEnabled":{"type":"boolean","description":"Whether to enable emergency calling on the new address. Can be: `true` or `false`."},"AutoCorrectAddress":{"type":"boolean","description":"Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide."},"StreetSecondary":{"type":"string","description":"The additional number and street address of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"City\": \"city\",\n  \"CustomerName\": \"customer_name\",\n  \"FriendlyName\": \"friendly_name\",\n  \"IsoCountry\": \"US\",\n  \"PostalCode\": \"postal_code\",\n  \"Region\": \"region\",\n  \"Street\": \"street\"\n}","meta":"","code":"{\n  \"City\": \"city\",\n  \"CustomerName\": \"customer_name\",\n  \"FriendlyName\": \"friendly_name\",\n  \"IsoCountry\": \"US\",\n  \"PostalCode\": \"postal_code\",\n  \"Region\": \"region\",\n  \"Street\": \"street\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"City\"","#7EE787"],[":","#C9D1D9"]," ",["\"city\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomerName\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"IsoCountry\"","#7EE787"],[":","#C9D1D9"]," ",["\"US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PostalCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"postal_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Region\"","#7EE787"],[":","#C9D1D9"]," ",["\"region\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Street\"","#7EE787"],[":","#C9D1D9"]," ",["\"street\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create an Address

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createAddress() {
  const address = await client.addresses.create({
    city: "city",
    customerName: "customer_name",
    isoCountry: "US",
    postalCode: "postal_code",
    region: "region",
    street: "street",
    streetSecondary: "street_secondary",
  });

  console.log(address.accountSid);
}

createAddress();
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

address = client.addresses.create(
    customer_name="customer_name",
    street="street",
    street_secondary="street_secondary",
    city="city",
    region="region",
    postal_code="postal_code",
    iso_country="US",
)

print(address.account_sid)
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

        var address = await AddressResource.CreateAsync(
            customerName: "customer_name",
            street: "street",
            streetSecondary: "street_secondary",
            city: "city",
            region: "region",
            postalCode: "postal_code",
            isoCountry: "US");

        Console.WriteLine(address.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Address address = Address.creator("customer_name", "street", "city", "region", "postal_code", "US")
                              .setStreetSecondary("street_secondary")
                              .create();

        System.out.println(address.getAccountSid());
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

	params := &api.CreateAddressParams{}
	params.SetCustomerName("customer_name")
	params.SetStreet("street")
	params.SetStreetSecondary("street_secondary")
	params.SetCity("city")
	params.SetRegion("region")
	params.SetPostalCode("postal_code")
	params.SetIsoCountry("US")

	resp, err := client.Api.CreateAddress(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$address = $twilio->addresses->create(
    "customer_name", // CustomerName
    "street", // Street
    "city", // City
    "region", // Region
    "postal_code", // PostalCode
    "US", // IsoCountry
    ["streetSecondary" => "street_secondary"]
);

print $address->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

address = @client
          .api
          .v2010
          .addresses
          .create(
            customer_name: 'customer_name',
            street: 'street',
            street_secondary: 'street_secondary',
            city: 'city',
            region: 'region',
            postal_code: 'postal_code',
            iso_country: 'US'
          )

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:create \
   --customer-name customer_name \
   --street street \
   --street-secondary street_secondary \
   --city city \
   --region region \
   --postal-code postal_code \
   --iso-country US
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json" \
--data-urlencode "CustomerName=customer_name" \
--data-urlencode "Street=street" \
--data-urlencode "StreetSecondary=street_secondary" \
--data-urlencode "City=city" \
--data-urlencode "Region=region" \
--data-urlencode "PostalCode=postal_code" \
--data-urlencode "IsoCountry=US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "city": "city",
  "customer_name": "customer_name",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "postal_code",
  "region": "region",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "street",
  "street_secondary": "street_secondary",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

If successful, Twilio will respond with a representation of the new address.

### Address Validation Related Errors \[#av-errors]

| Error Code | Error Name                                         | Error Description                                                                                                                                             |
| :--------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 21615      | Phone Number Requires a Local Address              | To purchase this number you must have an Address on your account that satisfies the local address requirements.                                               |
| 21628      | Address Validation Error                           | The address you have provided cannot be validated.                                                                                                            |
| 21629      | Address Validation Error - Check Suggested Address | The address you have provided cannot be validated. A similar address has been found to be valid. The suggested address is included in the error message body. |

## Fetch an Address resource

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Address resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an Address

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchAddress() {
  const address = await client
    .addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(address.accountSid);
}

fetchAddress();
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

address = client.addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(address.account_sid)
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

        var address =
            await AddressResource.FetchAsync(pathSid: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(address.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Address address = Address.fetcher("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(address.getAccountSid());
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

	params := &api.FetchAddressParams{}

	resp, err := client.Api.FetchAddress("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$address = $twilio->addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->fetch();

print $address->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

address = @client
          .api
          .v2010
          .addresses('ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .fetch

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:fetch \
   --sid ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "city": "SF",
  "customer_name": "name",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "94019",
  "region": "CA",
  "sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "street": "4th",
  "street_secondary": null,
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Read multiple Address resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses.json`

Returns a list of Address resource representations, each representing an
address within your account. The list includes \[paging information]\[paging-info].

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"CustomerName","in":"query","description":"The `customer_name` of the Address resources to read.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readFull":{"value":"customer_name"},"readEmpty":{"value":"customer_name"}}},{"name":"FriendlyName","in":"query","description":"The string that identifies the Address resources to read.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"EmergencyEnabled","in":"query","description":"Whether the address can be associated to a number for emergency calling.","schema":{"type":"boolean"}},{"name":"IsoCountry","in":"query","description":"The ISO country code of the Address resources to read.","schema":{"type":"string","format":"iso-country-code"},"examples":{"readFull":{"value":"US"},"readEmpty":{"value":"US"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Show all addresses

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAddress() {
  const addresses = await client.addresses.list({ limit: 20 });

  addresses.forEach((a) => console.log(a.end));
}

listAddress();
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

addresses = client.addresses.list(limit=20)

for record in addresses:
    print(record.end)
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

        var addresses = await AddressResource.ReadAsync(limit: 20);

        foreach (var record in addresses) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Address> addresses = Address.reader().limit(20).read();

        for (Address record : addresses) {
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

	params := &api.ListAddressParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListAddress(params)
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

$addresses = $twilio->addresses->read([], 20);

foreach ($addresses as $record) {
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

addresses = @client
            .api
            .v2010
            .addresses
            .list(limit: 20)

addresses.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "addresses": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "city": "SF",
      "customer_name": "name",
      "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
      "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
      "emergency_enabled": false,
      "friendly_name": "Main Office",
      "iso_country": "US",
      "postal_code": "94019",
      "region": "CA",
      "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "street": "4th",
      "street_secondary": null,
      "validated": false,
      "verified": false,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0"
}
```

Show all addresses matching the Customer Name 'Customer 123'

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAddress() {
  const addresses = await client.addresses.list({
    customerName: "Customer 123",
    limit: 20,
  });

  addresses.forEach((a) => console.log(a.end));
}

listAddress();
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

addresses = client.addresses.list(customer_name="Customer 123", limit=20)

for record in addresses:
    print(record.end)
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

        var addresses = await AddressResource.ReadAsync(customerName: "Customer 123", limit: 20);

        foreach (var record in addresses) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Address> addresses = Address.reader().setCustomerName("Customer 123").limit(20).read();

        for (Address record : addresses) {
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

	params := &api.ListAddressParams{}
	params.SetCustomerName("Customer 123")
	params.SetLimit(20)

	resp, err := client.Api.ListAddress(params)
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

$addresses = $twilio->addresses->read(["customerName" => "Customer 123"], 20);

foreach ($addresses as $record) {
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

addresses = @client
            .api
            .v2010
            .addresses
            .list(
              customer_name: 'Customer 123',
              limit: 20
            )

addresses.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:list \
   --customer-name "Customer 123"
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json?CustomerName=Customer%20123&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "addresses": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "city": "SF",
      "customer_name": "name",
      "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
      "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
      "emergency_enabled": false,
      "friendly_name": "Main Office",
      "iso_country": "US",
      "postal_code": "94019",
      "region": "CA",
      "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "street": "4th",
      "street_secondary": null,
      "validated": false,
      "verified": false,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0"
}
```

List Dependent PNS Subresources

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listDependentPhoneNumber() {
  const dependentPhoneNumbers = await client
    .addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
    .dependentPhoneNumbers.list({ limit: 20 });

  dependentPhoneNumbers.forEach((d) => console.log(d.end));
}

listDependentPhoneNumber();
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

dependent_phone_numbers = client.addresses(
    "AD2a0747eba6abf96b7e3c3ff0b4530f6e"
).dependent_phone_numbers.list(limit=20)

for record in dependent_phone_numbers:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Address;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var dependentPhoneNumbers = await DependentPhoneNumberResource.ReadAsync(
            pathAddressSid: "AD2a0747eba6abf96b7e3c3ff0b4530f6e", limit: 20);

        foreach (var record in dependentPhoneNumbers) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.address.DependentPhoneNumber;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<DependentPhoneNumber> dependentPhoneNumbers =
            DependentPhoneNumber.reader("AD2a0747eba6abf96b7e3c3ff0b4530f6e").limit(20).read();

        for (DependentPhoneNumber record : dependentPhoneNumbers) {
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

	params := &api.ListDependentPhoneNumberParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListDependentPhoneNumber("AD2a0747eba6abf96b7e3c3ff0b4530f6e",
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

$dependentPhoneNumbers = $twilio
    ->addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
    ->dependentPhoneNumbers->read(20);

foreach ($dependentPhoneNumbers as $record) {
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

dependent_phone_numbers = @client
                          .api
                          .v2010
                          .addresses('AD2a0747eba6abf96b7e3c3ff0b4530f6e')
                          .dependent_phone_numbers
                          .list(limit: 20)

dependent_phone_numbers.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:dependent-phone-numbers:list \
   --address-sid AD2a0747eba6abf96b7e3c3ff0b4530f6e
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/AD2a0747eba6abf96b7e3c3ff0b4530f6e/DependentPhoneNumbers.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "dependent_phone_numbers": [
    {
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "3197004499318",
      "phone_number": "+1111111111",
      "voice_url": "https://hurl.twilio.com/welcome/voice/",
      "voice_method": "POST",
      "voice_fallback_url": "https://voice-fallback.twilio.com/welcome/sms/reply",
      "voice_fallback_method": "POST",
      "voice_caller_id_lookup": false,
      "date_created": "Thu, 23 Feb 2017 18:26:31 +0000",
      "date_updated": "Thu, 23 Feb 2017 18:26:31 +0000",
      "sms_url": "https://demo.twilio.com/welcome/sms/reply",
      "sms_method": "POST",
      "sms_fallback_url": "https://sms-fallback.twilio.com/welcome/sms/reply",
      "sms_fallback_method": "POST",
      "address_requirements": "any",
      "capabilities": {
        "Voice": false,
        "SMS": true,
        "MMS": false
      },
      "status_callback": "https://status.twilio.com/welcome/sms/reply",
      "status_callback_method": "POST",
      "api_version": "2010-04-01",
      "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
      "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2",
      "trunk_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa5",
      "emergency_status": "Inactive",
      "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DependentPhoneNumbers.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DependentPhoneNumbers.json?PageSize=50&Page=0",
  "start": 0,
  "end": 0
}
```

## Read multiple Address Subresources \[#instance-subresources]

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
```

Returns a list of IncomingPhoneNumbers on your account that require the
specified address.

### Dependent Phone Numbers Instance Subresource \[#list-dependent-pns]

Each Address instance resource supports a subresource for viewing which phone
numbers are dependent on your existing addresses. In the case that you have two
addresses that satisfy the requirement on a given phone number, this
subresource will not return the phone number in the list.

#### Paging

The list includes paging information. If you plan on requesting more records
than will fit on a single page, you should use the provided nextpageuri rather
than incrementing through the pages by page number. Using the nextpageuri helps
to ensure that your next request picks up where it left off and can prevent you
from retrieving duplicate data if you are actively creating addresses.

## Update an Address resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json`

A `POST` request attempts to update an individual Address instance and returns
the updated resource representation if successful. A successful returned
response is identical to that of the `HTTP GET`.

Note that all fields but `IsoCountry` can be updated using a `POST` request.
To update the `IsoCountry`, a new Address must be created.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Address resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateAddressRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"CustomerName":{"type":"string","description":"The name to associate with the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Street":{"type":"string","description":"The number and street address of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"City":{"type":"string","description":"The city of the address."},"Region":{"type":"string","description":"The state or region of the address."},"PostalCode":{"type":"string","description":"The postal code of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"EmergencyEnabled":{"type":"boolean","description":"Whether to enable emergency calling on the address. Can be: `true` or `false`."},"AutoCorrectAddress":{"type":"boolean","description":"Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide."},"StreetSecondary":{"type":"string","description":"The additional number and street address of the address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"City\": \"city\",\n  \"CustomerName\": \"customer_name\",\n  \"FriendlyName\": \"friendly_name\",\n  \"PostalCode\": \"postal_code\",\n  \"Region\": \"region\",\n  \"Street\": \"street\"\n}","meta":"","code":"{\n  \"City\": \"city\",\n  \"CustomerName\": \"customer_name\",\n  \"FriendlyName\": \"friendly_name\",\n  \"PostalCode\": \"postal_code\",\n  \"Region\": \"region\",\n  \"Street\": \"street\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"City\"","#7EE787"],[":","#C9D1D9"]," ",["\"city\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomerName\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PostalCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"postal_code\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Region\"","#7EE787"],[":","#C9D1D9"]," ",["\"region\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Street\"","#7EE787"],[":","#C9D1D9"]," ",["\"street\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a customer name and street address

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAddress() {
  const address = await client
    .addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
    .update({
      customerName: "Customer 456",
      street: "2 Hasselhoff Lane",
    });

  console.log(address.accountSid);
}

updateAddress();
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

address = client.addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e").update(
    customer_name="Customer 456", street="2 Hasselhoff Lane"
)

print(address.account_sid)
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

        var address = await AddressResource.UpdateAsync(
            customerName: "Customer 456",
            street: "2 Hasselhoff Lane",
            pathSid: "AD2a0747eba6abf96b7e3c3ff0b4530f6e");

        Console.WriteLine(address.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Address address = Address.updater("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
                              .setCustomerName("Customer 456")
                              .setStreet("2 Hasselhoff Lane")
                              .update();

        System.out.println(address.getAccountSid());
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

	params := &api.UpdateAddressParams{}
	params.SetCustomerName("Customer 456")
	params.SetStreet("2 Hasselhoff Lane")

	resp, err := client.Api.UpdateAddress("AD2a0747eba6abf96b7e3c3ff0b4530f6e",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$address = $twilio->addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")->update([
    "customerName" => "Customer 456",
    "street" => "2 Hasselhoff Lane",
]);

print $address->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

address = @client
          .api
          .v2010
          .addresses('AD2a0747eba6abf96b7e3c3ff0b4530f6e')
          .update(
            customer_name: 'Customer 456',
            street: '2 Hasselhoff Lane'
          )

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:update \
   --sid AD2a0747eba6abf96b7e3c3ff0b4530f6e \
   --customer-name "Customer 456" \
   --street "2 Hasselhoff Lane"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/AD2a0747eba6abf96b7e3c3ff0b4530f6e.json" \
--data-urlencode "CustomerName=Customer 456" \
--data-urlencode "Street=2 Hasselhoff Lane" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "city": "SF",
  "customer_name": "Customer 456",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "94019",
  "region": "CA",
  "sid": "AD2a0747eba6abf96b7e3c3ff0b4530f6e",
  "street": "2 Hasselhoff Lane",
  "street_secondary": null,
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Delete an Address resource

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json`

Deletes this address from your account.

If this address is required for any active IncomingPhoneNumbers, it cannot be
deleted and you will receive Error \[21625]\[21625]. However, if you have a
second address that fulfills the AddressRequirement, the address will be
successfully deleted. The DependentPhoneNumbers Instance Subresource will allow
you to see which IncomingPhoneNumbers require a given address.

If the delete is successful, Twilio will return an HTTP 204 response with no
body.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Address resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$"},"required":true}]
```

Delete an Address

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteAddress() {
  await client.addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
}

deleteAddress();
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

client.addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
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

        await AddressResource.DeleteAsync(pathSid: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Address.deleter("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	params := &api.DeleteAddressParams{}

	err := client.Api.DeleteAddress("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->addresses("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .api
  .v2010
  .addresses('ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:remove \
   --sid ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
