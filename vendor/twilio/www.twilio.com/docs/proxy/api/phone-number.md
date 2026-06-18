# Phone Number

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

With Twilio Proxy, you associate phone numbers (this resource) directly with a Proxy [Service](/docs/proxy/api/service). All added numbers go into the Phone Number Pool associated with a given Proxy Service.

A Twilio number cannot be associated with more than one Proxy Service, but it can be associated with a Messaging Service, for example, to complete US A2P 10DLC registration (see below for important details about how to do this).

For more information on managing the phone numbers in your Proxy Phone Number Pool, refer to our [Phone Number Management guide](/docs/proxy/understanding-phone-number-management).

## "Reserved" numbers in Proxy

In a Proxy service, phone numbers can be marked as Reserved. Reserved numbers will not be included in the set of numbers Proxy considers when choosing a number for a participant, but they can be manually assigned as Proxy Numbers for participants (e.g., in a lead tracking use-case).

## Proxy Number Pool Size Limit

Phone Number Pools are limited to 5000 reserved phone numbers and 500 unreserved phone numbers per Proxy Service. Numbers can be distributed across multiple Proxy Services if you need more of numbers.

## Adding Proxy Phone Numbers to Messaging Services

It is possible to associate Twilio Proxy numbers with a Messaging Service, although there are some limitations to be aware of. This capability is especially important for customers who use US long code numbers to send messages to US recipients because adding numbers to a Messaging Service is required in order to complete [A2P 10DLC](https://help.twilio.com/hc/en-us/articles/1260800720410-What-is-A2P-10DLC-) registration.

Currently, a number that is already associated with a Messaging Service cannot be added to a Proxy Service via the Proxy Console or API.

However, Twilio numbers that are *already* associated with a Proxy Service can be associated with a Messaging Service. Before doing this, you must ensure that your Messaging Service is configured correctly. Your Messaging Service must have its Incoming Message handling behavior set to "Defer to sender's webhook" to ensure that your numbers continue to use Proxy after they are added to the Service.

Step-by-step instructions to associate Proxy numbers with a Messaging Service:

1. Set up your Messaging Service, but do not add any phone numbers to it yet. Ensure that the Incoming Message handling is set to "Defer to sender's webhook." This setting can be found in the "Integration" settings for the Messaging Service in the Twilio Console.
2. Ensure that all numbers you plan to add to the Messaging Service are already associated with a Proxy Service.
3. Add your Proxy numbers to the Messaging Service, either using the Twilio Console or the Messaging Service API PhoneNumber endpoint.

## PhoneNumber Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service.phone_number","modelName":"proxy_v1_service_phone_number","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the PhoneNumber resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the PhoneNumber resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the PhoneNumber resource's parent [Service](https://www.twilio.com/docs/proxy/api/service) resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"iso_country":{"type":"string","nullable":true,"description":"The ISO Country Code for the phone number."},"capabilities":{"type":"object","format":"phone-number-capabilities","x-class-extra-annotation":"@JsonInclude(JsonInclude.Include.NON_NULL)","nullable":true,"description":"The capabilities of the phone number.","properties":{"fax":{"type":"boolean"},"mms":{"type":"boolean"},"sms":{"type":"boolean"},"voice":{"type":"boolean"}}},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the PhoneNumber resource."},"is_reserved":{"type":"boolean","nullable":true,"description":"Whether the phone number should be reserved and not be assigned to a participant using proxy pool logic. See [Reserved Phone Numbers](https://www.twilio.com/docs/proxy/reserved-phone-numbers) for more information."},"in_use":{"type":"integer","default":0,"description":"The number of open session assigned to the number. See the [How many Phone Numbers do I need?](https://www.twilio.com/docs/proxy/phone-numbers-needed) guide for more information."}}}} />

## Add a Phone Number to a Proxy Service

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID parent [Service](https://www.twilio.com/docs/proxy/api/service) resource of the new PhoneNumber resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePhoneNumberRequest","properties":{"Sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","description":"The SID of a Twilio [IncomingPhoneNumber](https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource) resource that represents the Twilio Number you would like to assign to your Proxy Service."},"PhoneNumber":{"type":"string","format":"phone-number","description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234."},"IsReserved":{"type":"boolean","description":"Whether the new phone number should be reserved and not be assigned to a participant using proxy pool logic. See [Reserved Phone Numbers](https://www.twilio.com/docs/proxy/reserved-phone-numbers) for more information."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Sid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"Sid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Sid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Add a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .phoneNumbers.create({ sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" });

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

phone_number = client.proxy.v1.services(
    "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .create();

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
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.CreatePhoneNumberParams{}
	params.SetSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.ProxyV1.CreatePhoneNumber("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$phone_number = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->phoneNumbers->create(["sid" => "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]);

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
               .proxy
               .v1
               .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .phone_numbers
               .create(sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PhoneNumbers" \
--data-urlencode "Sid=PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "phone_number": "+1987654321",
  "friendly_name": "Friendly Name",
  "iso_country": "US",
  "capabilities": {
    "sms_outbound": true,
    "voice_inbound": false
  },
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "is_reserved": false,
  "in_use": 0
}
```

Add a Reserved Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .phoneNumbers.create({
      isReserved: true,
      sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

phone_number = client.proxy.v1.services(
    "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(
    sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", is_reserved=True
)

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            isReserved: true,
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setIsReserved(true)
                                      .create();

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
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.CreatePhoneNumberParams{}
	params.SetSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetIsReserved(true)

	resp, err := client.ProxyV1.CreatePhoneNumber("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$phone_number = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->phoneNumbers->create([
        "sid" => "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "isReserved" => true,
    ]);

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
               .proxy
               .v1
               .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .phone_numbers
               .create(
                 sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                 is_reserved: true
               )

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --is-reserved
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PhoneNumbers" \
--data-urlencode "Sid=PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "IsReserved=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "phone_number": "+1987654321",
  "friendly_name": "Friendly Name",
  "iso_country": "US",
  "capabilities": {
    "sms_outbound": true,
    "voice_inbound": false
  },
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "is_reserved": true,
  "in_use": 0
}
```

> \[!NOTE]
>
> **Note:** You should pass a `PhoneNumber` *or* a `Sid` (identifying a phone number on your account). Only one of them is required. Passing both will return an error.

## Fetch a PhoneNumber resource

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the PhoneNumber resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the PhoneNumber resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a specific Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.fetcher("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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

	resp, err := client.ProxyV1.FetchPhoneNumber("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$phone_number = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
               .proxy
               .v1
               .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .fetch

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:fetch \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "phone_number": "12345",
  "friendly_name": "Friendly Name",
  "iso_country": "US",
  "capabilities": {
    "sms_outbound": true,
    "voice_inbound": false
  },
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "is_reserved": false,
  "in_use": 0
}
```

## Get the list of Phone Numbers associated with a Proxy Service

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the PhoneNumber resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of all Phone Numbers in the Proxy Number Pool for a Service. A maximum of 100 records will be returned per page

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPhoneNumber() {
  const phoneNumbers = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

phone_numbers = client.proxy.v1.services(
    "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.list(limit=20)

for record in phone_numbers:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumbers = await PhoneNumberResource.ReadAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in phoneNumbers) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PhoneNumber> phoneNumbers =
            PhoneNumber.reader("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

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
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.ListPhoneNumberParams{}
	params.SetLimit(20)

	resp, err := client.ProxyV1.ListPhoneNumber("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$phoneNumbers = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
                .proxy
                .v1
                .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .phone_numbers
                .list(limit: 20)

phone_numbers.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:list \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "phone_numbers",
    "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0"
  },
  "phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:00:00Z",
      "date_updated": "2015-07-30T20:00:00Z",
      "phone_number": "+1987654321",
      "friendly_name": "Friendly Name",
      "iso_country": "US",
      "capabilities": {
        "sms_outbound": true,
        "voice_inbound": false
      },
      "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "is_reserved": false,
      "in_use": 0
    }
  ]
}
```

## Update a PhoneNumber resource

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the PhoneNumber resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the PhoneNumber resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdatePhoneNumberRequest","properties":{"IsReserved":{"type":"boolean","description":"Whether the phone number should be reserved and not be assigned to a participant using proxy pool logic. See [Reserved Phone Numbers](https://www.twilio.com/docs/proxy/reserved-phone-numbers) for more information."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"IsReserved\": true\n}","meta":"","code":"{\n  \"IsReserved\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"IsReserved\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a specific Proxy Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updatePhoneNumber() {
  const phoneNumber = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ isReserved: false });

  console.log(phoneNumber.sid);
}

updatePhoneNumber();
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
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(is_reserved=False)
)

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.UpdateAsync(
            isReserved: false,
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.updater("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setIsReserved(false)
                .update();

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
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.UpdatePhoneNumberParams{}
	params.SetIsReserved(false)

	resp, err := client.ProxyV1.UpdatePhoneNumber("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$phone_number = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["isReserved" => false]);

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
               .proxy
               .v1
               .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .update(is_reserved: false)

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:update \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "IsReserved=false" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "phone_number": "12345",
  "friendly_name": "Friendly Name",
  "iso_country": "US",
  "capabilities": {
    "sms_outbound": true,
    "voice_inbound": false
  },
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "is_reserved": false,
  "in_use": 0
}
```

## Remove a Phone Number from a Proxy Service

`DELETE https://proxy.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the PhoneNumber resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the PhoneNumber resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Phone Number from a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deletePhoneNumber() {
  await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await PhoneNumberResource.DeleteAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber.deleter("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.ProxyV1.DeletePhoneNumber("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .proxy
  .v1
  .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:remove \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
