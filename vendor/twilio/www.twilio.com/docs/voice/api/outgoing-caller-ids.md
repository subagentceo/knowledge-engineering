# OutgoingCallerIds resource

The OutgoingCallerIds resource represents the set of verified phone numbers for an account. Each OutgoingCallerId represents a single verified number that you can use as a caller ID when making outgoing calls, either [via the REST API](/docs/voice/tutorials/how-to-make-outbound-phone-calls) or within the [TwiML \<Dial> verb](/docs/voice/twiml/dial).

## OutgoingCallerIds properties

| Property     | Description                                                                                                                                                      |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sid          | A 34 character string that uniquely identifies this resource.                                                                                                    |
| DateCreated  | The date that this resource was created, given in [RFC 2822][2] format.                                                                                          |
| DateUpdated  | The date that this resource was last updated, given in [RFC 2822][2] format.                                                                                     |
| FriendlyName | A human-readable descriptive text for this resource, up to 64 characters long. By default, the `FriendlyName` is a nicely formatted version of the phone number. |
| AccountSid   | The unique ID of the [Account](/docs/iam/api/account) responsible for this Caller ID.                                                                            |
| PhoneNumber  | The incoming phone number. Formatted with a '+' and country code for example, +16175551212 ([E.164][e164] format).                                               |
| Uri          | The URI for this resource, relative to `https://api.twilio.com`.                                                                                                 |

[2]: https://www.ietf.org/rfc/rfc2822.txt

[e164]: https://en.wikipedia.org/wiki/E.164

## Retrieve an OutgoingCallerId

Retrieve an OutgoingCallerId

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchOutgoingCallerId() {
  const outgoingCallerId = await client
    .outgoingCallerIds("PNe905d7e6b410746a0fb08c57e5a186f3")
    .fetch();

  console.log(outgoingCallerId.sid);
}

fetchOutgoingCallerId();
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

outgoing_caller_id = client.outgoing_caller_ids(
    "PNe905d7e6b410746a0fb08c57e5a186f3"
).fetch()

print(outgoing_caller_id.sid)
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

        var outgoingCallerId = await OutgoingCallerIdResource.FetchAsync(
            pathSid: "PNe905d7e6b410746a0fb08c57e5a186f3");

        Console.WriteLine(outgoingCallerId.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.OutgoingCallerId;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        OutgoingCallerId outgoingCallerId = OutgoingCallerId.fetcher("PNe905d7e6b410746a0fb08c57e5a186f3").fetch();

        System.out.println(outgoingCallerId.getSid());
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

	params := &api.FetchOutgoingCallerIdParams{}

	resp, err := client.Api.FetchOutgoingCallerId("PNe905d7e6b410746a0fb08c57e5a186f3",
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

$outgoing_caller_id = $twilio
    ->outgoingCallerIds("PNe905d7e6b410746a0fb08c57e5a186f3")
    ->fetch();

print $outgoing_caller_id->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

outgoing_caller_id = @client
                     .api
                     .v2010
                     .outgoing_caller_ids('PNe905d7e6b410746a0fb08c57e5a186f3')
                     .fetch

puts outgoing_caller_id.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:fetch \
   --sid PNe905d7e6b410746a0fb08c57e5a186f3
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds/PNe905d7e6b410746a0fb08c57e5a186f3.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNe905d7e6b410746a0fb08c57e5a186f3",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "(415) 867-5309",
  "phone_number": "+141586753096",
  "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
  "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Update an OutgoingCallerId

Updates the caller ID and returns the updated resource if successful.

### Optional parameters

You can update only one field:

| Parameter    | Description                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| FriendlyName | A human readable description of a Caller ID, with maximum length of 64 characters. Defaults to a nicely formatted version of the phone number. |

Update Outgoing Caller ID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateOutgoingCallerId() {
  const outgoingCallerId = await client
    .outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659")
    .update({ friendlyName: "My Second Line" });

  console.log(outgoingCallerId.sid);
}

updateOutgoingCallerId();
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

outgoing_caller_id = client.outgoing_caller_ids(
    "PNe536d32a3c49700934481addd5ce1659"
).update(friendly_name="My Second Line")

print(outgoing_caller_id.sid)
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

        var outgoingCallerId = await OutgoingCallerIdResource.UpdateAsync(
            friendlyName: "My Second Line", pathSid: "PNe536d32a3c49700934481addd5ce1659");

        Console.WriteLine(outgoingCallerId.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.OutgoingCallerId;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        OutgoingCallerId outgoingCallerId =
            OutgoingCallerId.updater("PNe536d32a3c49700934481addd5ce1659").setFriendlyName("My Second Line").update();

        System.out.println(outgoingCallerId.getSid());
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

	params := &api.UpdateOutgoingCallerIdParams{}
	params.SetFriendlyName("My Second Line")

	resp, err := client.Api.UpdateOutgoingCallerId("PNe536d32a3c49700934481addd5ce1659",
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

$outgoing_caller_id = $twilio
    ->outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659")
    ->update(["friendlyName" => "My Second Line"]);

print $outgoing_caller_id->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

outgoing_caller_id = @client
                     .api
                     .v2010
                     .outgoing_caller_ids('PNe536d32a3c49700934481addd5ce1659')
                     .update(friendly_name: 'My Second Line')

puts outgoing_caller_id.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:update \
   --sid PNe536d32a3c49700934481addd5ce1659 \
   --friendly-name "My Second Line"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds/PNe536d32a3c49700934481addd5ce1659.json" \
--data-urlencode "FriendlyName=My Second Line" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
  "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
  "friendly_name": "My Second Line",
  "phone_number": "+141586753096",
  "sid": "PNe536d32a3c49700934481addd5ce1659",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

The response format is identical to the [HTTP `GET` response](/docs/voice/api/outgoing-caller-ids) documented above.

## Delete an OutgoingCallerId

Deletes the caller ID from the account. Returns an HTTP 204 response if successful, with no body.

Delete Outgoing Caller ID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteOutgoingCallerId() {
  await client.outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659").remove();
}

deleteOutgoingCallerId();
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

client.outgoing_caller_ids("PNe536d32a3c49700934481addd5ce1659").delete()
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

        await OutgoingCallerIdResource.DeleteAsync(pathSid: "PNe536d32a3c49700934481addd5ce1659");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.OutgoingCallerId;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        OutgoingCallerId.deleter("PNe536d32a3c49700934481addd5ce1659").delete();
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

	params := &api.DeleteOutgoingCallerIdParams{}

	err := client.Api.DeleteOutgoingCallerId("PNe536d32a3c49700934481addd5ce1659",
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

$twilio->outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659")->delete();
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
  .outgoing_caller_ids('PNe536d32a3c49700934481addd5ce1659')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:remove \
   --sid PNe536d32a3c49700934481addd5ce1659
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds/PNe536d32a3c49700934481addd5ce1659.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Retrieve a list of OutgoingCallerIds

Returns a list of OutgoingCallerIds, each representing a caller ID phone number that is valid for the account. The list includes [paging information](/docs/usage/twilios-response).

### Filters

The following `GET` query string parameters allow you to limit the list returned. Parameters are case-sensitive:

| Parameter    | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| PhoneNumber  | Only show the OutgoingCallerId that exactly matches this phone number. |
| FriendlyName | Only show the OutgoingCallerId that exactly matches this name.         |

Retrieve a list of OutgoingCallerIds for an account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listOutgoingCallerId() {
  const outgoingCallerIds = await client.outgoingCallerIds.list({ limit: 20 });

  outgoingCallerIds.forEach((o) => console.log(o.end));
}

listOutgoingCallerId();
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

outgoing_caller_ids = client.outgoing_caller_ids.list(limit=20)

for record in outgoing_caller_ids:
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

        var outgoingCallerIds = await OutgoingCallerIdResource.ReadAsync(limit: 20);

        foreach (var record in outgoingCallerIds) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.OutgoingCallerId;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<OutgoingCallerId> outgoingCallerIds = OutgoingCallerId.reader().limit(20).read();

        for (OutgoingCallerId record : outgoingCallerIds) {
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

	params := &api.ListOutgoingCallerIdParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListOutgoingCallerId(params)
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

$outgoingCallerIds = $twilio->outgoingCallerIds->read([], 20);

foreach ($outgoingCallerIds as $record) {
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

outgoing_caller_ids = @client
                      .api
                      .v2010
                      .outgoing_caller_ids
                      .list(limit: 20)

outgoing_caller_ids.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "outgoing_caller_ids": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
      "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
      "friendly_name": "(415) 867-5309",
      "phone_number": "+141586753096",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0"
}
```

Retrieve a list of OutgoingCallerIds for a phone number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listOutgoingCallerId() {
  const outgoingCallerIds = await client.outgoingCallerIds.list({
    phoneNumber: "+14158675310",
    limit: 20,
  });

  outgoingCallerIds.forEach((o) => console.log(o.end));
}

listOutgoingCallerId();
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

outgoing_caller_ids = client.outgoing_caller_ids.list(
    phone_number="+14158675310", limit=20
)

for record in outgoing_caller_ids:
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

        var outgoingCallerIds = await OutgoingCallerIdResource.ReadAsync(
            phoneNumber: new Twilio.Types.PhoneNumber("+14158675310"), limit: 20);

        foreach (var record in outgoingCallerIds) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.OutgoingCallerId;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<OutgoingCallerId> outgoingCallerIds =
            OutgoingCallerId.reader().setPhoneNumber(new com.twilio.type.PhoneNumber("+14158675310")).limit(20).read();

        for (OutgoingCallerId record : outgoingCallerIds) {
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

	params := &api.ListOutgoingCallerIdParams{}
	params.SetPhoneNumber("+14158675310")
	params.SetLimit(20)

	resp, err := client.Api.ListOutgoingCallerId(params)
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

$outgoingCallerIds = $twilio->outgoingCallerIds->read(
    ["phoneNumber" => "+14158675310"],
    20
);

foreach ($outgoingCallerIds as $record) {
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

outgoing_caller_ids = @client
                      .api
                      .v2010
                      .outgoing_caller_ids
                      .list(
                        phone_number: '+14158675310',
                        limit: 20
                      )

outgoing_caller_ids.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:list \
   --phone-number +14158675310
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds.json?PhoneNumber=%2B14158675310&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "outgoing_caller_ids": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
      "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
      "friendly_name": "(415) 867-5309",
      "phone_number": "+141586753096",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0"
}
```

## Add an OutgoingCallerId to your account

Adds an OutgoingCallerId to your account. If the request is successful, the response contains a validation code.

After you make this request, Twilio places a verification call to the provided phone number. To finish adding the OutgoingCallerId, the person who answers the call must enter the validation code. To learn more, see [Verifying Caller IDs at Scale](/docs/voice/api/verifying-caller-ids-scale).

> \[!NOTE]
>
> The verification call is in English. Other languages aren't supported.

The following parameters are accepted:

### Required parameters

| Parameter   | Description                                                                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PhoneNumber | The phone number to verify. Should be formatted with a '+' and country code for example, +16175551212 ([E.164][e164] format). Twilio will also accept unformatted US numbers for example, (415) 555-1212 or 415-555-1212. |

### Optional parameters

| Parameter            | Description                                                                                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FriendlyName         | A human readable description for the new caller ID with maximum length 64 characters. Defaults to a nicely formatted version of the number.                                                                                                                            |
| CallDelay            | The number of seconds, between 0 and 60, to delay before initiating the verification call. Defaults to 0.                                                                                                                                                              |
| Extension            | Digits to dial after connecting the verification call.                                                                                                                                                                                                                 |
| StatusCallback       | A URL that Twilio will request when the verification call ends to notify your app if the verification process was successful or not. See [StatusCallback parameter](#statuscallback-parameter) below. **Note:** The StatusCallback URL is limited to 1,000 characters. |
| StatusCallbackMethod | The HTTP method Twilio should use when requesting the above URL. Defaults to `POST`.                                                                                                                                                                                   |

This will create a new CallerID validation request within Twilio, which initiates a call to the phone number provided and listens for a validation code. The validation request is represented in the response by the following properties:

### Response properties

| Property       | Description                                                                                                                 |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| AccountSid     | The unique ID of the [Account](/docs/iam/api/account) to which the Validation Request belongs.                              |
| PhoneNumber    | The incoming phone number being validated, formatted with a '+' and country code e.g., +16175551212 ([E.164][e164] format). |
| FriendlyName   | The friendly name you provided, if any.                                                                                     |
| ValidationCode | The 6-digit validation code that must be entered via the phone to validate this phone number for Caller ID.                 |
| CallSid        | The unique ID of the [Call][call] created for this validation attempt.                                                      |

[call]: call

### StatusCallback parameter

After the verification call ends, Twilio makes an asynchronous HTTP request to the StatusCallback URL if you provided one in your API request. By capturing this request, you can determine when the call ended and whether or not the number called was successfully verified.

Twilio passes the same parameters to your application in its asynchronous request to the StatusCallback URL as it does in a typical status callback request. The full list of parameters and descriptions of each are in the [TwiML Voice: Twilio's Request](/docs/voice/twiml) documentation.

The verification status callback request also passes these additional parameters:

| Parameter           | Description                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| VerificationStatus  | Describes whether or not the person called correctly entered the validation code. Possible values are `success` or `failed`.      |
| OutgoingCallerIdSid | If the verification process was successful, the SID value of the newly-created OutgoingCallerId resource for the verified number. |

### Example

Here are a typical request and response. Typically, you would present the validation code from the response to the user who is trying to verify their phone number. Adding an Outgoing Caller ID via the API has the same result as [verifying a number](https://www.twilio.com/console/phone-numbers/verified) via the Twilio console.

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
    friendlyName: "My Home Phone Number",
    phoneNumber: "+14158675310",
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
    friendly_name="My Home Phone Number", phone_number="+14158675310"
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
            friendlyName: "My Home Phone Number",
            phoneNumber: new Twilio.Types.PhoneNumber("+14158675310"));

        Console.WriteLine(validationRequest.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.ValidationRequest;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ValidationRequest validationRequest = ValidationRequest.creator(new com.twilio.type.PhoneNumber("+14158675310"))
                                                  .setFriendlyName("My Home Phone Number")
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
	params.SetFriendlyName("My Home Phone Number")
	params.SetPhoneNumber("+14158675310")

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
    ["friendlyName" => "My Home Phone Number"]
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
                       friendly_name: 'My Home Phone Number',
                       phone_number: '+14158675310'
                     )

puts validation_request.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:outgoing-caller-ids:create \
   --friendly-name "My Home Phone Number" \
   --phone-number +14158675310
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/OutgoingCallerIds.json" \
--data-urlencode "FriendlyName=My Home Phone Number" \
--data-urlencode "PhoneNumber=+14158675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My Home Phone Number",
  "phone_number": "+14158675310",
  "validation_code": "111111"
}
```
