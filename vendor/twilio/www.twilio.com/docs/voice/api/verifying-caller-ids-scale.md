# Verifying Caller IDs at Scale

What if you need to make calls in a subaccount using a Twilio phone number provisioned in your Master account? You'll need to verify those outgoing caller IDs with the Twilio account or subaccount you are using.

This guide will be helpful if you have a large number of phone numbers that you need to verify programmatically. If you need to verify a mobile phone or landline number, it may be easier to do so through the Twilio console.

## What this guide covers

This guide covers the process you would use to programmatically verify many phone numbers with Twilio. The specifics of the implementation are going to be different, based on the API provider you are using for the phone numbers.

In general, you will start with a list of phone numbers to verify. Make a call to the Twilio API with each phone number to start the verification process. Twilio will respond with a unique six digit verification code for each number.

Twilio will then make a phone call to the phone number from another provider, and that phone number should respond with the six digit verification code. After Twilio either receives or doesn't receive the correct code, a separate status callback request is made to a web URL of your choosing that contains the verification result for that phone number - either success or failure.

This guide uses Twilio Sync to share state between different systems - but you may use another data store, such as Redis or a database. It also uses a Twilio Function to store verification status in Twilio Sync.

* [Verifying outgoing caller IDs with Twilio](#verifying-outgoing-caller-ids-with-twilio)
* [Using Twilio Sync to store validation information](#using-twilio-sync-to-store-validation-information)
* [Responding to the Twilio Verification phone call](#responding-to-the-twilio-verification-phone-call)
* [Receiving verification status in a callback](#retrieving-verification-status-from-twilio-sync)
* [Recording verification status with Twilio Sync](#recording-verification-status-with-twilio-sync)
* [Retrieving verification status from Twilio Sync](#retrieving-verification-status-from-twilio-sync)
* [Next Steps](#next-steps)

## Verifying outgoing caller IDs with Twilio

Using the [Outgoing Caller IDs Resource](/docs/voice/api/outgoing-caller-ids), you can create a validation request for a phone number. Twilio will return a six digit verification code to you in the response to the create request (synchronously). Twilio will then call that phone number on the [PSTN](/docs/glossary/what-is-pstn), with a caller ID of +14157234000.

> \[!NOTE]
>
> The verification call is in English. Other languages aren't supported.

We also set the status callback, so that we can get the verification status for each phone number.

Verify an Outgoing Caller ID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createValidationRequest() {
  const validationRequest = await client.validationRequests.create({
    friendlyName: "Third Party VOIP Number",
    phoneNumber: "+14158675310",
    statusCallback:
      "https://somefunction.twil.io/caller-id-validation-callback",
  });

  console.log(validationRequest.accountSid);
}

createValidationRequest();
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

validation_request = client.validation_requests.create(
    friendly_name="Third Party VOIP Number",
    phone_number="+14158675310",
    status_callback="https://somefunction.twil.io/caller-id-validation-callback",
)

print(validation_request.account_sid)
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

        var validationRequest = await ValidationRequestResource.CreateAsync(
            friendlyName: "Third Party VOIP Number",
            phoneNumber: new Twilio.Types.PhoneNumber("+14158675310"),
            statusCallback: new Uri("https://somefunction.twil.io/caller-id-validation-callback"));

        Console.WriteLine(validationRequest.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.ValidationRequest;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ValidationRequest validationRequest =
            ValidationRequest.creator(new com.twilio.type.PhoneNumber("+14158675310"))
                .setFriendlyName("Third Party VOIP Number")
                .setStatusCallback(URI.create("https://somefunction.twil.io/caller-id-validation-callback"))
                .create();

        System.out.println(validationRequest.getAccountSid());
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

	params := &api.CreateValidationRequestParams{}
	params.SetFriendlyName("Third Party VOIP Number")
	params.SetPhoneNumber("+14158675310")
	params.SetStatusCallback("https://somefunction.twil.io/caller-id-validation-callback")

	resp, err := client.Api.CreateValidationRequest(params)
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

$validation_request = $twilio->validationRequests->create(
    "+14158675310", // PhoneNumber
    [
        "friendlyName" => "Third Party VOIP Number",
        "statusCallback" =>
            "https://somefunction.twil.io/caller-id-validation-callback",
    ]
);

print $validation_request->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

validation_request = @client
                     .api
                     .v2010
                     .validation_requests
                     .create(
                       friendly_name: 'Third Party VOIP Number',
                       phone_number: '+14158675310',
                       status_callback: 'https://somefunction.twil.io/caller-id-validation-callback'
                     )

puts validation_request.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:create \
   --friendly-name "Third Party VOIP Number" \
   --phone-number +14158675310 \
   --status-callback https://somefunction.twil.io/caller-id-validation-callback
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds.json" \
--data-urlencode "FriendlyName=Third Party VOIP Number" \
--data-urlencode "PhoneNumber=+14158675310" \
--data-urlencode "StatusCallback=https://somefunction.twil.io/caller-id-validation-callback" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Third Party VOIP Number",
  "phone_number": "+14158675310",
  "validation_code": "111111"
}
```

From your non-Twilio phone number (or from a Twilio number not associated with the current account), you will need to answer the incoming call from Twilio. This typically involves configuring a webhook with the third party, however you may be using an incoming voice call webhook on that phone number already. If that's the case, you can either add some logic to the webhook to respond to the inbound Twilio phone number (+14157234000), or temporarily replace the webhook with one that replies back to the Twilio validation request phone call.

When you send the validation request, you will get a six digit verification code in the response. You will have to get that verification code to the webhook that responds to the Twilio incoming phone call. One way to do this would be to use a key/value store like Redis. Another way would be to use [Twilio Sync](/docs/sync) to store the validation code.

## Using Twilio Sync to store validation information

Twilio Sync provides shared state in the cloud, so you can store the verification codes in Sync after calling the Verify Outgoing Callers API, and then access those access codes from your phone number's webhook (which probably isn't running on the same system as a script that verifies caller ids). There are two steps - the first is to set up a sync map to store information by phone number. For now, we are only going to store the verification code. Later, we will store verification information, once we retrieve it from the status callback.

When you work with Twilio Sync, you can either use a client SDK (for the web browser with JavaScript, iOS, or Android), or the Twilio REST API. The Twilio REST API has [SDKs](/docs/libraries) for Java, C#, Python, Ruby, PHP, and Node.js/JavaScript. You will want to use the REST API or the related SDKs for most of this project, but if you were to build a web application dashboard to show results, you may want to look into the [client-side JavaScript library for Sync](/docs/sync/quickstart/js).

We can use the default Sync service - if you are using Sync already, you can also create a new Sync Service from the console or API, and use that. When we create the Sync Map, we give it a unique name, "OutgoingCallerIds" - this can also be whatever you would like to use.

Create a sync map for verifying caller ids

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSyncMap() {
  const syncMap = await client.sync.v1
    .services("ServiceSid")
    .syncMaps.create({ uniqueName: "OutgoingCallerIds" });

  console.log(syncMap.sid);
}

createSyncMap();
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

sync_map = client.sync.v1.services("ServiceSid").sync_maps.create(
    unique_name="OutgoingCallerIds"
)

print(sync_map.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Sync.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var syncMap = await SyncMapResource.CreateAsync(
            uniqueName: "OutgoingCallerIds", pathServiceSid: "ServiceSid");

        Console.WriteLine(syncMap.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.sync.v1.service.SyncMap;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        SyncMap syncMap = SyncMap.creator("ServiceSid").setUniqueName("OutgoingCallerIds").create();

        System.out.println(syncMap.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	sync "github.com/twilio/twilio-go/rest/sync/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &sync.CreateSyncMapParams{}
	params.SetUniqueName("OutgoingCallerIds")

	resp, err := client.SyncV1.CreateSyncMap("ServiceSid",
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

$sync_map = $twilio->sync->v1
    ->services("ServiceSid")
    ->syncMaps->create(["uniqueName" => "OutgoingCallerIds"]);

print $sync_map->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

sync_map = @client
           .sync
           .v1
           .services('ServiceSid')
           .sync_maps
           .create(unique_name: 'OutgoingCallerIds')

puts sync_map.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:sync:v1:services:maps:create \
   --service-sid ServiceSid \
   --unique-name OutgoingCallerIds
```

```bash
curl -X POST "https://sync.twilio.com/v1/Services/ServiceSid/Maps" \
--data-urlencode "UniqueName=OutgoingCallerIds" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "created_by": "created_by",
  "date_expires": "2015-07-30T21:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "links": {
    "items": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items",
    "permissions": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Permissions"
  },
  "revision": "revision",
  "service_sid": "ServiceSid",
  "sid": "MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "OutgoingCallerIds",
  "url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

After creating a Sync Map with the REST API (you will only need to do this once), the next step will be to store the verification code from Twilio into that Sync Map. Sync Maps store Map Items, which consist of a data object accessed by a key. The key is a string, and should be unique - the phone number works perfectly as a key. The data can be up to 16 kilobytes in size, and should be structured as key value pairs. We can store the verification code with the key `verification_code`. and store the six digit verification code as the value.

Store a verification code with Twilio Sync

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSyncMapItem() {
  const syncMapItem = await client.sync.v1
    .services("ServiceSid")
    .syncMaps("MapSid")
    .syncMapItems.create({
      data: {
        verification_code: "123456",
      },
      key: "+14158675310",
    });

  console.log(syncMapItem.key);
}

createSyncMapItem();
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

sync_map_item = (
    client.sync.v1.services("ServiceSid")
    .sync_maps("MapSid")
    .sync_map_items.create(
        key="+14158675310", data={"verification_code": "123456"}
    )
)

print(sync_map_item.key)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Sync.V1.Service.SyncMap;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var syncMapItem = await SyncMapItemResource.CreateAsync(
            key: "+14158675310",
            data: new Dictionary<string, Object>() { { "verification_code", "123456" } },
            pathServiceSid: "ServiceSid",
            pathMapSid: "MapSid");

        Console.WriteLine(syncMapItem.Key);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.sync.v1.service.syncmap.SyncMapItem;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        SyncMapItem syncMapItem = SyncMapItem
                                      .creator("ServiceSid",
                                          "MapSid",
                                          "+14158675310",
                                          new HashMap<String, Object>() {
                                              {
                                                  put("verification_code", "123456");
                                              }
                                          })
                                      .create();

        System.out.println(syncMapItem.getKey());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	sync "github.com/twilio/twilio-go/rest/sync/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &sync.CreateSyncMapItemParams{}
	params.SetKey("+14158675310")
	params.SetData(map[string]interface{}{
		"verification_code": "123456",
	})

	resp, err := client.SyncV1.CreateSyncMapItem("ServiceSid",
		"MapSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Key != nil {
			fmt.Println(*resp.Key)
		} else {
			fmt.Println(resp.Key)
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

$sync_map_item = $twilio->sync->v1
    ->services("ServiceSid")
    ->syncMaps("MapSid")
    ->syncMapItems->create(
        "+14158675310", // Key
        [
            "verification_code" => "123456",
        ] // Data
    );

print $sync_map_item->key;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

sync_map_item = @client
                .sync
                .v1
                .services('ServiceSid')
                .sync_maps('MapSid')
                .sync_map_items
                .create(
                  key: '+14158675310',
                  data: {
                    'verification_code' => '123456'
                  }
                )

puts sync_map_item.key
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:sync:v1:services:maps:items:create \
   --service-sid ServiceSid \
   --map-sid MapSid \
   --key +14158675310 \
   --data "{\"verification_code\":\"123456\"}"
```

```bash
DATA_OBJ=$(cat << EOF
{
  "verification_code": "123456"
}
EOF
)
curl -X POST "https://sync.twilio.com/v1/Services/ServiceSid/Maps/MapSid/Items" \
--data-urlencode "Key=+14158675310" \
--data-urlencode "Data=$DATA_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "created_by": "created_by",
  "data": {
    "verification_code": "123456"
  },
  "date_expires": "2015-07-30T21:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "key": "+14158675310",
  "map_sid": "MapSid",
  "revision": "revision",
  "service_sid": "ServiceSid",
  "url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items/key"
}
```

## Responding to the Twilio Verification Phone Call

Depending on your third-party provider, how you respond to an incoming phone call will differ. For instance, your provider may offer a webhook solution that calls a web URL of your choosing with an `HTTP POST` or `GET` request.

Your response should be based on the incoming phone number - +14157234000 is the phone number that Twilio will be using to verify your phone number, so you can play back the proper six digit validation code with DTMF.

When your phone number receives the validation request, your program will need to look up that verification code. For instance, if you were using Redis as the data storage, the phone number would likely be the key. If you use Twilio Sync, you can fetch a Map Item from a Sync Map, based on the phone number as the key.

Retrieving the Verification Code from Twilio Sync.

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchSyncMapItem() {
  const syncMapItem = await client.sync.v1
    .services("ServiceSid")
    .syncMaps("MapSid")
    .syncMapItems("+14158675310")
    .fetch();

  console.log(syncMapItem.key);
}

fetchSyncMapItem();
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

sync_map_item = (
    client.sync.v1.services("ServiceSid")
    .sync_maps("MapSid")
    .sync_map_items("+14158675310")
    .fetch()
)

print(sync_map_item.key)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Sync.V1.Service.SyncMap;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var syncMapItem = await SyncMapItemResource.FetchAsync(
            pathServiceSid: "ServiceSid", pathMapSid: "MapSid", pathKey: "+14158675310");

        Console.WriteLine(syncMapItem.Key);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.sync.v1.service.syncmap.SyncMapItem;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        SyncMapItem syncMapItem = SyncMapItem.fetcher("ServiceSid", "MapSid", "+14158675310").fetch();

        System.out.println(syncMapItem.getKey());
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

	resp, err := client.SyncV1.FetchSyncMapItem("ServiceSid",
		"MapSid",
		"+14158675310")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Key != nil {
			fmt.Println(*resp.Key)
		} else {
			fmt.Println(resp.Key)
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

$sync_map_item = $twilio->sync->v1
    ->services("ServiceSid")
    ->syncMaps("MapSid")
    ->syncMapItems("+14158675310")
    ->fetch();

print $sync_map_item->key;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

sync_map_item = @client
                .sync
                .v1
                .services('ServiceSid')
                .sync_maps('MapSid')
                .sync_map_items('+14158675310')
                .fetch

puts sync_map_item.key
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:sync:v1:services:maps:items:fetch \
   --service-sid ServiceSid \
   --map-sid MapSid \
   --key +14158675310
```

```bash
curl -X GET "https://sync.twilio.com/v1/Services/ServiceSid/Maps/MapSid/Items/%2B14158675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "created_by": "created_by",
  "data": {},
  "date_expires": "2015-07-30T21:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "key": "+14158675310",
  "map_sid": "MapSid",
  "revision": "revision",
  "service_sid": "ServiceSid",
  "url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items/key"
}
```

The map item will contain the verification code in the data object. Read that verification code, and then play it back to Twilio, and your phone number will be verified!

## Receiving verification status in a callback

After your phone number gets a verification call from Twilio, you can receive a status callback from Twilio to record the verification status for that phone number. This webhook will contain two parameters we are interested in - `VerificationStatus` and `To` (the number being verified), as well as the other parameters included in a [TwiML Voice Request](/docs/voice/twiml#request-parameters).

Because you may be verifying many numbers, there may be some cases where the verification status fails, and you have to retry those numbers. For those cases, it's helpful to have a record of which verifications were successful, and which were not.

If possible, record the verification status in logs, but also into a key/value store or database, to get a list of failed verifications back. Again, we can use Twilio Sync for this.

## Recording verification status with Twilio Sync

We will update the Map Item for our phone number in our `OutgoingCallerIds` Map. You will need the original key used for the map item - this would be the phone number, in the same format as you stored it. Then you can pass in a new data object - in this case, it would look like `{"verification_status":true}`.

If you like, you could also use another Map, with a different unique name, and then create a Map Item in that Map for the verification status.

Recording verification status with Twilio Sync

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateSyncMapItem() {
  const syncMapItem = await client.sync.v1
    .services("ServiceSid")
    .syncMaps("MapSid")
    .syncMapItems("+14158675310")
    .update({
      data: {
        verification_status: "true",
      },
    });

  console.log(syncMapItem.key);
}

updateSyncMapItem();
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

sync_map_item = (
    client.sync.v1.services("ServiceSid")
    .sync_maps("MapSid")
    .sync_map_items("+14158675310")
    .update(data={"verification_status": "true"})
)

print(sync_map_item.key)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Sync.V1.Service.SyncMap;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var syncMapItem = await SyncMapItemResource.UpdateAsync(
            data: new Dictionary<string, Object>() { { "verification_status", "true" } },
            pathServiceSid: "ServiceSid",
            pathMapSid: "MapSid",
            pathKey: "+14158675310");

        Console.WriteLine(syncMapItem.Key);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.sync.v1.service.syncmap.SyncMapItem;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        SyncMapItem syncMapItem = SyncMapItem.updater("ServiceSid", "MapSid", "+14158675310")
                                      .setData(new HashMap<String, Object>() {
                                          {
                                              put("verification_status", "true");
                                          }
                                      })
                                      .update();

        System.out.println(syncMapItem.getKey());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	sync "github.com/twilio/twilio-go/rest/sync/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &sync.UpdateSyncMapItemParams{}
	params.SetData(map[string]interface{}{
		"verification_status": "true",
	})

	resp, err := client.SyncV1.UpdateSyncMapItem("ServiceSid",
		"MapSid",
		"+14158675310",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Key != nil {
			fmt.Println(*resp.Key)
		} else {
			fmt.Println(resp.Key)
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

$sync_map_item = $twilio->sync->v1
    ->services("ServiceSid")
    ->syncMaps("MapSid")
    ->syncMapItems("+14158675310")
    ->update([
        "data" => [
            "verification_status" => "true",
        ],
    ]);

print $sync_map_item->key;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

sync_map_item = @client
                .sync
                .v1
                .services('ServiceSid')
                .sync_maps('MapSid')
                .sync_map_items('+14158675310')
                .update(
                  data: {
                    'verification_status' => 'true'
                  }
                )

puts sync_map_item.key
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:sync:v1:services:maps:items:update \
   --service-sid ServiceSid \
   --map-sid MapSid \
   --key +14158675310 \
   --data "{\"verification_status\":\"true\"}"
```

```bash
DATA_OBJ=$(cat << EOF
{
  "verification_status": "true"
}
EOF
)
curl -X POST "https://sync.twilio.com/v1/Services/ServiceSid/Maps/MapSid/Items/%2B14158675310" \
--data-urlencode "Data=$DATA_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "created_by": "created_by",
  "data": {
    "verification_status": "true"
  },
  "date_expires": "2015-07-30T21:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "key": "+14158675310",
  "map_sid": "MapSid",
  "revision": "revision",
  "service_sid": "ServiceSid",
  "url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items/key"
}
```

If you would like, the status callback for the caller id verification could be a [Twilio Function](/docs/serverless/functions-assets/functions). Functions is Twilio's serverless environment, where you can run JavaScript code in a Node.js environment. You would need to set the `SYNC_SERVICE_SID` and `VERIFY_CALLER_ID_SYNC_MAP_SID` variables on the [Function Credentials page](https://www.twilio.com/console/functions/configure) in the Twilio Console. Then [create a new Twilio Function in the Runtime Console](https://www.twilio.com/console/functions/manage) and add the JavaScript source code from the **Twilio Function for storing verification status in Twilio Sync** code sample.

Save the Twilio Function, and then it will automatically deploy. Now just supply that URL as the status callback when you verify the Twilio phone number.

```js title="Twilio Function for storing verification status in Twilio Sync"
exports.handler = function(context, event, callback) {
  console.log('Incoming webhook', event);

 let client = context.getTwilioClient();

  let verificationStatus = event['VerificationStatus'];
  let phoneNumber = event['To'];

  client.sync.services(context.SYNC_SERVICE_SID)
     .syncMaps(context.VERIFY_CALLER_ID_SYNC_MAP_SID)
     .syncMapItems(phoneNumber)
     .update({data: {
        verification_status: verificationStatus
      }})
     .then(sync_map_item => {
          console.log(sync_map_item.data);
          callback(null, 'OK');
      }).catch( error => {
          console.log(error);
          callback(null, error);
      });
};
```

## Retrieving verification status from Twilio Sync

With the verification status stored in Sync, we can make another request to retrieve all of the map items from the Sync Map. With that request, you could then print out the results from a command line, or you could create a web-based dashboard. If you do create a web-based dashboard, you can update the verification status in real time as your script runs with the client side JavaScript SDK for Sync.

The REST API for fetching all Map Items for a Map is paginated - if you have more than 50 numbers to verify, you will need to paginate through the list. For more on working with map items, see the [Map Item Resource](/docs/sync/api/map-item-resource) documentation.

Retrieving verification status from Twilio Sync

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listSyncMapItem() {
  const syncMapItems = await client.sync.v1
    .services("ServiceSid")
    .syncMaps("MapSid")
    .syncMapItems.list({ limit: 20 });

  syncMapItems.forEach((s) => console.log(s.key));
}

listSyncMapItem();
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

sync_map_items = (
    client.sync.v1.services("ServiceSid")
    .sync_maps("MapSid")
    .sync_map_items.list(limit=20)
)

for record in sync_map_items:
    print(record.key)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Sync.V1.Service.SyncMap;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var syncMapItems = await SyncMapItemResource.ReadAsync(
            pathServiceSid: "ServiceSid", pathMapSid: "MapSid", limit: 20);

        foreach (var record in syncMapItems) {
            Console.WriteLine(record.Key);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.sync.v1.service.syncmap.SyncMapItem;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<SyncMapItem> syncMapItems = SyncMapItem.reader("ServiceSid", "MapSid").limit(20).read();

        for (SyncMapItem record : syncMapItems) {
            System.out.println(record.getKey());
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
	sync "github.com/twilio/twilio-go/rest/sync/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &sync.ListSyncMapItemParams{}
	params.SetLimit(20)

	resp, err := client.SyncV1.ListSyncMapItem("ServiceSid",
		"MapSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Key != nil {
				fmt.Println(*resp[record].Key)
			} else {
				fmt.Println(resp[record].Key)
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

$syncMapItems = $twilio->sync->v1
    ->services("ServiceSid")
    ->syncMaps("MapSid")
    ->syncMapItems->read([], 20);

foreach ($syncMapItems as $record) {
    print $record->key;
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

sync_map_items = @client
                 .sync
                 .v1
                 .services('ServiceSid')
                 .sync_maps('MapSid')
                 .sync_map_items
                 .list(limit: 20)

sync_map_items.each do |record|
   puts record.key
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:sync:v1:services:maps:items:list \
   --service-sid ServiceSid \
   --map-sid MapSid
```

```bash
curl -X GET "https://sync.twilio.com/v1/Services/ServiceSid/Maps/MapSid/Items?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "items": [],
  "meta": {
    "first_page_url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items?From=from&Bounds=inclusive&Order=asc&PageSize=50&Page=0",
    "key": "items",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Maps/MPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Items?From=from&Bounds=inclusive&Order=asc&PageSize=50&Page=0"
  }
}
```

## Next Steps

After verifying your phone numbers with this account, you should be able to make outgoing calls with Twilio using these numbers for the caller ID.

Here are some additional documentation resources that can help you with this project:

* [Outgoing Caller Ids](/docs/voice/api/outgoing-caller-ids)
* [Twilio Webhooks](/docs/usage/webhooks/webhooks-overview)
* [Sync Map Resource](/docs/sync/api/map-resource)
* [Sync Map Item Resource](/docs/sync/api/map-item-resource)
