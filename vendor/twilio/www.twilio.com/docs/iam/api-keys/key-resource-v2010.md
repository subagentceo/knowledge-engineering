# REST API: Key Resource v2010

> \[!WARNING]
>
> The Key resource v2010 doesn't support creating [Restricted API keys](/docs/iam/api-keys/restricted-api-keys). The latest version of the Key resource [Key resource v1](/docs/iam/api-keys/key-resource-v1). The Key resource v1 supports all the features of Key resource v2010 and adds the ability to create Restricted API keys.

Use the Key resource to create and manage Standard API keys.

API keys represent the required credentials that you'll use to [authenticate to Twilio's REST API](/docs/usage/requests-to-twilio) and to create and revoke [Access Tokens](/docs/iam/access-tokens).

> \[!NOTE]
>
> If your API key requires access to the Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) endpoints, then you'll need to use a Main key. You can create Main keys only in the [Twilio Console](https://www.twilio.com/console/runtime/api-keys/create).

## Types of keys

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type   | Access permissions                                                                                                                                                                                                                                 | Create in Console | Create with REST API |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| Main       | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests.                                                                                                                                     | Yes               | No                   |
| Standard   | Access to all Twilio API resources, except for Accounts ([`/Accounts`](/docs/iam/api-keys/keys-in-console)) or Keys ([`/Accounts/{SID}/Keys`](/docs/iam/api-keys/key-resource-v2010), [`/v1/Keys`](/docs/iam/api-keys/key-resource-v1)) resources. | Yes               | Yes                  |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about [Restricted API keys](/docs/iam/api-keys/restricted-api-keys).                                                                                                  | Yes               | Yes (**v1 only**)    |

## Key Properties

<OperationTable type="properties" data={{"title":"ListKeyResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"keys":{"type":"array","items":{"type":"object","refName":"api.v2010.account.key","modelName":"api_v2010_account_key","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Key resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."}}}}}}} />

## Create an API key

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys.json`

> \[!WARNING]
>
> To create Standard API keys with the API, you must use one of the following credentials: your Account SID and Auth Token, a Main API key, or a Restricted API key with the permission for `/twilio/iam/api-keys/create`.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Key resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateNewKeyRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

The response contains a `sid` property and a `secret` property. Store the `secret` in a secure location, because you won't be able to retrieve it again. Twilio uses the Key resource's `sid` and the `secret` as the credentials when making API requests.

Create an API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createNewKey() {
  const newKey = await client.newKeys.create({
    friendlyName: "Mario's API key",
  });

  console.log(newKey.sid);
}

createNewKey();
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

new_key = client.new_keys.create(friendly_name="Mario's API key")

print(new_key.sid)
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

        var newKey = await NewKeyResource.CreateAsync(friendlyName: "Mario's API key");

        Console.WriteLine(newKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.NewKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        NewKey newKey = NewKey.creator().setFriendlyName("Mario's API key").create();

        System.out.println(newKey.getSid());
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

	params := &api.CreateNewKeyParams{}
	params.SetFriendlyName("Mario's API key")

	resp, err := client.Api.CreateNewKey(params)
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

$new_key = $twilio->newKeys->create(["friendlyName" => "Mario's API key"]);

print $new_key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

new_key = @client
          .api
          .v2010
          .new_keys
          .create(friendly_name: 'Mario\'s API key')

puts new_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:keys:create \
   --friendly-name "Mario's API key"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Keys.json" \
--data-urlencode "FriendlyName=Mario's API key" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar"
}
```

## Fetch a Key resource

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json`

Returns a representation of the API key.

> \[!WARNING]
>
> For security reasons, Twilio returns the `secret` field only when the API key is first created and never includes the `secret` field when you fetch the resource. Your application should store the API key's SID and secret in a secure location to authenticate to the API.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchKey() {
  const key = await client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

  console.log(key.sid);
}

fetchKey();
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

key = client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(key.sid)
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

        var key = await KeyResource.FetchAsync(pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(key.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Key;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Key key = Key.fetcher("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(key.getSid());
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

	params := &api.FetchKeyParams{}

	resp, err := client.Api.FetchKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$key = $twilio->keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->fetch();

print $key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

key = @client
      .api
      .v2010
      .keys('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      .fetch

puts key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:keys:fetch \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
}
```

## List Key resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys.json`

Returns a list of API keys associated with a given Account, sorted by `DateUpdated`.

The list includes all API keys and [paging information](/docs/usage/twilios-response#pagination).

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read a Key resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listKey() {
  const keys = await client.keys.list({ limit: 20 });

  keys.forEach((k) => console.log(k.end));
}

listKey();
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

keys = client.keys.list(limit=20)

for record in keys:
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

        var keys = await KeyResource.ReadAsync(limit: 20);

        foreach (var record in keys) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Key;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Key> keys = Key.reader().limit(20).read();

        for (Key record : keys) {
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

	params := &api.ListKeyParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListKey(params)
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

$keys = $twilio->keys->read(20);

foreach ($keys as $record) {
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

keys = @client
       .api
       .v2010
       .keys
       .list(limit: 20)

keys.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:keys:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Keys.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "keys": [
    {
      "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "foo",
      "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
      "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json?PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json?PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
```

## Update a Key resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json`

Attempts to update the fields of an API Key resource.

If successful, Twilio returns the updated resource representation. The response is identical to that of the [fetch a Key resource endpoint](#fetch-a-key-resource).

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateKeyRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Key resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateKey() {
  const key = await client
    .keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ friendlyName: "friendly_name" });

  console.log(key.sid);
}

updateKey();
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

key = client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name"
)

print(key.sid)
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

        var key = await KeyResource.UpdateAsync(
            friendlyName: "friendly_name", pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(key.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Key;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Key key = Key.updater("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setFriendlyName("friendly_name").update();

        System.out.println(key.getSid());
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

	params := &api.UpdateKeyParams{}
	params.SetFriendlyName("friendly_name")

	resp, err := client.Api.UpdateKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$key = $twilio
    ->keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(["friendlyName" => "friendly_name"]);

print $key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

key = @client
      .api
      .v2010
      .keys('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      .update(friendly_name: 'friendly_name')

puts key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:keys:update \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name friendly_name
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "FriendlyName=friendly_name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
}
```

## Delete a Key Resource

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json`

Deletes an API key. Deleting an API key revokes the authorization to authenticate to the REST API and invalidates all Access Tokens generated using the API key's secret.

If the deletion is successful, Twilio returns an HTTP 204 response with no body.

> \[!WARNING]
>
> You may only delete keys by authenticating with the account's **AccountSid** and **AuthToken** or API keys that have the Main key flag set in the console.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Key resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteKey() {
  await client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
}

deleteKey();
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

client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
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

        await KeyResource.DeleteAsync(pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Key;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Key.deleter("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	params := &api.DeleteKeyParams{}

	err := client.Api.DeleteKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$twilio->keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .keys('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:keys:remove \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
