# Emergency Calling for SIP Trunking API

This page covers how to use Twilio's REST API to configure a SIP Trunk Phone Number's emergency Address. Before proceeding, you must read the [SIP Trunking Emergency Calling doc](/docs/sip-trunking/emergency-calling).

Don't want to use the REST API? You can also use the Console to configure emergency calling Addresses. See the [SIP Trunking Emergency Calling doc](/docs/sip-trunking/emergency-calling#configure-emergencycalling) for more information.

## Emergency Addresses

Before you can configure a Twilio Phone Number for emergency calling, you need to create an emergency Address. An emergency Address is an [Address resource](/docs/usage/api/address) with the `emergency_enabled` property set to `true`.

You can use the same emergency Address for multiple Phone Numbers if appropriate.

### Create a new emergency Address

To create a new emergency Address resource via REST API, create a new Address resource with the `emergency_enabled` parameter set to `true`. An example request is shown below.

Create a new emergency Address

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
    city: "San Francisco",
    customerName: "Twilio",
    emergencyEnabled: true,
    friendlyName: "Twilio",
    isoCountry: "US",
    postalCode: "94105",
    region: "CA",
    street: "645 Harrison St.",
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
    friendly_name="Twilio",
    customer_name="Twilio",
    street="645 Harrison St.",
    city="San Francisco",
    postal_code="94105",
    region="CA",
    iso_country="US",
    emergency_enabled=True,
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
            friendlyName: "Twilio",
            customerName: "Twilio",
            street: "645 Harrison St.",
            city: "San Francisco",
            postalCode: "94105",
            region: "CA",
            isoCountry: "US",
            emergencyEnabled: true);

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
        Address address = Address.creator("Twilio", "645 Harrison St.", "San Francisco", "CA", "94105", "US")
                              .setFriendlyName("Twilio")
                              .setEmergencyEnabled(true)
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
	params.SetFriendlyName("Twilio")
	params.SetCustomerName("Twilio")
	params.SetStreet("645 Harrison St.")
	params.SetCity("San Francisco")
	params.SetPostalCode("94105")
	params.SetRegion("CA")
	params.SetIsoCountry("US")
	params.SetEmergencyEnabled(true)

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
    "Twilio", // CustomerName
    "645 Harrison St.", // Street
    "San Francisco", // City
    "CA", // Region
    "94105", // PostalCode
    "US", // IsoCountry
    [
        "friendlyName" => "Twilio",
        "emergencyEnabled" => true,
    ]
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
            friendly_name: 'Twilio',
            customer_name: 'Twilio',
            street: '645 Harrison St.',
            city: 'San Francisco',
            postal_code: '94105',
            region: 'CA',
            iso_country: 'US',
            emergency_enabled: true
          )

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:create \
   --friendly-name Twilio \
   --customer-name Twilio \
   --street "645 Harrison St." \
   --city "San Francisco" \
   --postal-code 94105 \
   --region CA \
   --iso-country US \
   --emergency-enabled
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json" \
--data-urlencode "FriendlyName=Twilio" \
--data-urlencode "CustomerName=Twilio" \
--data-urlencode "Street=645 Harrison St." \
--data-urlencode "City=San Francisco" \
--data-urlencode "PostalCode=94105" \
--data-urlencode "Region=CA" \
--data-urlencode "IsoCountry=US" \
--data-urlencode "EmergencyEnabled=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "city": "San Francisco",
  "customer_name": "Twilio",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": true,
  "friendly_name": "Twilio",
  "iso_country": "US",
  "postal_code": "94105",
  "region": "CA",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "645 Harrison St.",
  "street_secondary": "Suite 300",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

The response to this request contains a `sid` property. This is the Address's SID, which you need when configuring your Phone Numbers.

### Use an existing Address resource as an emergency Address

If you already have an Address resource you wish to use as an emergency Address, [update the Address resource](/docs/usage/api/address#update-an-address-resource) so that the `emergency_enabled` property is `true` as shown in the example below.

Use an existing Address resource as an emergency Address

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
    .addresses("ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ emergencyEnabled: true });

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

address = client.addresses("ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    emergency_enabled=True
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
            emergencyEnabled: true, pathSid: "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
        Address address = Address.updater("ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setEmergencyEnabled(true).update();

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
	params.SetEmergencyEnabled(true)

	resp, err := client.Api.UpdateAddress("ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$address = $twilio
    ->addresses("ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["emergencyEnabled" => true]);

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
          .addresses('ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(emergency_enabled: true)

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:update \
   --sid ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --emergency-enabled
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
--data-urlencode "EmergencyEnabled=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "city": "SF",
  "customer_name": "name",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": true,
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
```

## Associate an emergency Address with a Phone Number

Once you've created an emergency Address, you need to update the [IncomingPhoneNumber resource](/docs/phone-numbers/api/incomingphonenumber-resource)'s `emergency_address_sid` property with the emergency Address SID, as shown in the code sample below.

This request requires the SID of the Phone Number. You can find the SIDs of your SIP Trunk's Phone Numbers using the [PhoneNumber Subresource](/docs/sip-trunking/api/phonenumber-resource).

Associate an emergency Address with a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateIncomingPhoneNumber() {
  const incomingPhoneNumber = await client
    .incomingPhoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ emergencyAddressSid: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" });

  console.log(incomingPhoneNumber.accountSid);
}

updateIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(emergency_address_sid="ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.UpdateAsync(
            emergencyAddressSid: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber = IncomingPhoneNumber.updater("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                      .setEmergencyAddressSid("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                      .update();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.UpdateIncomingPhoneNumberParams{}
	params.SetEmergencyAddressSid("ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.Api.UpdateIncomingPhoneNumber("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$incoming_phone_number = $twilio
    ->incomingPhoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["emergencyAddressSid" => "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]);

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                        .update(
                          emergency_address_sid: 'ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                        )

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:update \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --emergency-address-sid ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
--data-urlencode "EmergencyAddressSid=ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": true,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

## Check a Phone Number's emergency Address status

You can check on the status of a Phone Number's emergency Address registration by [fetching the IncomingPhoneNumber resource](/docs/phone-numbers/api/incomingphonenumber-resource#fetch-an-incomingphonenumber-resource) and checking the value of the `emergency_address_status` property. An example of this request is shown below.

Check the emergency Address registration status of a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchIncomingPhoneNumber() {
  const incomingPhoneNumber = await client
    .incomingPhoneNumbers("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(incomingPhoneNumber.accountSid);
}

fetchIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers(
    "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.FetchAsync(
            pathSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber =
            IncomingPhoneNumber.fetcher("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.FetchIncomingPhoneNumberParams{}

	resp, err := client.Api.FetchIncomingPhoneNumber("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$incoming_phone_number = $twilio
    ->incomingPhoneNumbers("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers('PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                        .fetch

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:fetch \
   --sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers/PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

## Remove an emergency Address from a Phone Number

To remove an emergency Address from a Phone Number, you need to remove the `emergency_address_sid` from the IncomingPhoneNumber resource as shown in the example below.

Remove an emergency\_address\_sid from a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateIncomingPhoneNumber() {
  const incomingPhoneNumber = await client
    .incomingPhoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ emergencyAddressSid: "" });

  console.log(incomingPhoneNumber.accountSid);
}

updateIncomingPhoneNumber();
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

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(emergency_address_sid="")

print(incoming_phone_number.account_sid)
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

        var incomingPhoneNumber = await IncomingPhoneNumberResource.UpdateAsync(
            emergencyAddressSid: "", pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(incomingPhoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber =
            IncomingPhoneNumber.updater("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setEmergencyAddressSid("").update();

        System.out.println(incomingPhoneNumber.getAccountSid());
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

	params := &api.UpdateIncomingPhoneNumberParams{}
	params.SetEmergencyAddressSid("")

	resp, err := client.Api.UpdateIncomingPhoneNumber("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$incoming_phone_number = $twilio
    ->incomingPhoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["emergencyAddressSid" => ""]);

print $incoming_phone_number->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
                        .api
                        .v2010
                        .incoming_phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                        .update(emergency_address_sid: '')

puts incoming_phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:update \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --emergency-address-sid ""
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
--data-urlencode "EmergencyAddressSid=" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": true,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

After this request, you should [check the emergency Address registration status of the Phone Number](#check-a-phone-numbers-emergency-address-status) to ensure the de-registration of that emergency Address.

## Change an emergency Address for a Phone Number

To change a Phone Number's emergency Address, you need to follow the steps listed below.

1. [Remove the `emergency_address_sid` from the IncomingPhoneNumber resource](#remove-an-emergency-address-from-a-phone-number).
2. [Check the emergency Address registration status of the Phone Number](#check-a-phone-numbers-emergency-address-status). Wait until the `emergency_address_status` is `unregistered` before proceeding.
3. [Update the IncomingPhoneNumber resource's `emergency_address_sid`](#associate-an-emergency-address-with-a-phone-number) with the new emergency Address SID.
4. [Check the emergency Address registration status of the Phone Number](#check-a-phone-numbers-emergency-address-status). Once the `emergency_address_status` is `registered`, the Phone Number has been successfully updated.

## Delete an emergency Address

If you wish to delete an emergency Address, you must first make sure that it is no longer associated with any IncomingPhoneNumber resources (or any other Twilio resource).

You can then delete the Address resource, as shown in the sample request below.

Delete an emergency Address

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
