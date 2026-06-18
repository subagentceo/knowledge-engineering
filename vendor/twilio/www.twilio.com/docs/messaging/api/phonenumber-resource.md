# Services PhoneNumbers subresource

> \[!IMPORTANT]
>
> The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the [Twilio Console](https://www.twilio.com/console) is Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).
>
> The resources for sending Messages with a Messaging Service are Generally Available.

PhoneNumbers is a subresource of [Services](/docs/messaging/api/service-resource) and represents a phone number you have associated to the Service.

When sending a message with your Messaging Service, Twilio will select a phone number from the service for delivery.

Inbound messages received on any phone number associated to a Messaging Service are passed to the inbound request URL of the Service with [the TwiML parameters that describe the message](/docs/messaging/guides/webhook-request#parameters-in-twilios-request-to-your-application).

## PhoneNumber Properties

<OperationTable type="properties" data={{"type":"object","refName":"messaging.v1.service.phone_number","modelName":"messaging_v1_service_phone_number","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the PhoneNumber resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the PhoneNumber resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) the resource is associated with."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"country_code":{"type":"string","nullable":true,"description":"The 2-character [ISO Country Code](https://www.iso.org/iso-3166-country-codes.html) of the number."},"capabilities":{"type":"array","nullable":true,"description":"An array of values that describe whether the number can receive calls or messages. Can be: `Voice`, `SMS`, and `MMS`.","items":{"type":"string"}},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the PhoneNumber resource."}}}} />

## Create a PhoneNumber

`POST https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers`

Add a phone number to your Messaging Service.

Each Service can have no more than 400 phone numbers by default. If you think you might need a higher limit, [contact Twilio Support](https://www.twilio.com/console/support/tickets/create) about a Messaging Service number limit increase, and include an explanation of your use case.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) to create the resource under.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePhoneNumberRequest","required":["PhoneNumberSid"],"properties":{"PhoneNumberSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","description":"The SID of the Phone Number being added to the Service."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithCapabilities":{"value":{"lang":"json","value":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithCapabilitiesWhenDownstreamResponse200":{"value":{"lang":"json","value":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a PhoneNumber for a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers.create({
      phoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });

  console.log(phoneNumber.sid);
}

createPhoneNumber();
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

phone_number = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.create(phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            phoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.creator("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").create();

        System.out.println(phoneNumber.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.CreatePhoneNumberParams{}
	params.SetPhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.MessagingV1.CreatePhoneNumber("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$phone_number = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers->create(
        "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // PhoneNumberSid
    );

print $phone_number->sid;
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
               .messaging
               .v1
               .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .phone_numbers
               .create(phone_number_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:create \
   --service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --phone-number-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers" \
--data-urlencode "PhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "+987654321",
  "country_code": "US",
  "capabilities": [
    "MMS",
    "SMS",
    "Voice"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Retrieve a PhoneNumber

`GET https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) to fetch the resource from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the PhoneNumber resource to fetch.","schema":{"type":"string"},"required":true}]
```

Retrieve a PhoneNumber from a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(phoneNumber.sid);
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

phone_number = (
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.fetcher("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(phoneNumber.getSid());
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

	resp, err := client.MessagingV1.FetchPhoneNumber("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$phone_number = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $phone_number->sid;
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
               .messaging
               .v1
               .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .fetch

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:fetch \
   --service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "12345",
  "country_code": "US",
  "capabilities": [],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Retrieve a list of PhoneNumbers

`GET https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) to read the resources from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of PhoneNumbers from a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPhoneNumber() {
  const phoneNumbers = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers.list({ limit: 20 });

  phoneNumbers.forEach((p) => console.log(p.sid));
}

listPhoneNumber();
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

phone_numbers = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.list(limit=20)

for record in phone_numbers:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumbers = await PhoneNumberResource.ReadAsync(
            pathServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in phoneNumbers) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PhoneNumber> phoneNumbers =
            PhoneNumber.reader("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (PhoneNumber record : phoneNumbers) {
            System.out.println(record.getSid());
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
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.ListPhoneNumberParams{}
	params.SetLimit(20)

	resp, err := client.MessagingV1.ListPhoneNumber("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$phoneNumbers = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers->read(20);

foreach ($phoneNumbers as $record) {
    print $record->sid;
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

phone_numbers = @client
                .messaging
                .v1
                .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .phone_numbers
                .list(limit: 20)

phone_numbers.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:list \
   --service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "phone_numbers",
    "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20&Page=0"
  },
  "phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:12:31Z",
      "date_updated": "2015-07-30T20:12:33Z",
      "phone_number": "+987654321",
      "country_code": "US",
      "capabilities": [],
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Delete a PhoneNumbers subresource

`DELETE https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}`

> \[!WARNING]
>
> Removing a phone number from the Service does not release the number from your account. You must release a phone number from your Account to disassociate and delete the phone number from the Service.

Returns a "204 NO CONTENT" if the phone number was successfully removed from the service.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) to delete the resource from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the PhoneNumber resource to delete.","schema":{"type":"string"},"required":true}]
```

Delete a Phone Number from a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deletePhoneNumber() {
  await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deletePhoneNumber();
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

client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await PhoneNumberResource.DeleteAsync(
            pathServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber.deleter("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.MessagingV1.DeletePhoneNumber("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
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
  .messaging
  .v1
  .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:remove \
   --service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
