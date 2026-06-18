# REST API: Key Resource v1

Use the Key resource to create and manage Standard and Restricted API keys.

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

<OperationTable type="properties" data={{"type":"object","refName":"iam.v1.get_keys","modelName":"iam_v1_get_keys","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Key resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"flags":{"type":"array","items":{"type":"string"}}}}} />

## Create an API key

`POST https://iam.twilio.com/v1/Keys`

> \[!WARNING]
>
> To create Standard API keys with the API, you must use one of the following credentials: your Account SID and Auth Token, a Main API key, or a Restricted API key with the permission for `/twilio/iam/api-keys/create`.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateNewKeyRequest","required":["AccountSid"],"properties":{"AccountSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource."},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"KeyType":{"type":"string","description":"The \\`KeyType\\` form parameter is used to specify the type of key you want to create.\n\n**Default Behavior**: If \\`KeyType\\` is not specified, the API will generate a standard key.\n\n**Restricted Key**: If \\`KeyType\\` is set to \\`restricted\\`, the API will create a new restricted key. In this case, a policy object is required to define the permissions.","enum":["restricted"],"refName":"new_key_enum_keytype","modelName":"new_key_enum_keytype"},"Policy":{"description":"The \\`Policy\\` object is a collection that specifies the allowed Twilio permissions for the restricted key.\nFor more information on the permissions available with restricted API keys, refer to the [Twilio documentation](https://www.twilio.com/docs/iam/api-keys/restricted-api-keys#permissions-available-with-restricted-api-keys)."}}},"examples":{"createStandardKey":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\",\n  \"AccountSid\": \"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\",\n  \"AccountSid\": \"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AccountSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createRestrictedKey":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\",\n  \"AccountSid\": \"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"KeyType\": \"restricted\",\n  \"Policy\": \"{\\\"allow\\\":[\\\"/twilio/messaging/messages/read\\\"]}\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\",\n  \"AccountSid\": \"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"KeyType\": \"restricted\",\n  \"Policy\": \"{\\\"allow\\\":[\\\"/twilio/messaging/messages/read\\\"]}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AccountSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"KeyType\"","#7EE787"],[":","#C9D1D9"]," ",["\"restricted\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Policy\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["allow","#A5D6FF"],["\\\"","#79C0FF"],[":[","#A5D6FF"],["\\\"","#79C0FF"],["/twilio/messaging/messages/read","#A5D6FF"],["\\\"","#79C0FF"],["]}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Standard API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createNewKey() {
  const newApiKey = await client.iam.v1.newApiKey.create({
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    friendlyName: "Mario's API key",
  });

  console.log(newApiKey.sid);
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

new_api_key = client.iam.v1.new_api_key.create(
    friendly_name="Mario's API key",
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(new_api_key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var newApiKey = await NewApiKeyResource.CreateAsync(
            friendlyName: "Mario's API key", accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(newApiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.NewApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        NewApiKey newApiKey =
            NewApiKey.creator("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setFriendlyName("Mario's API key").create();

        System.out.println(newApiKey.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	iam "github.com/twilio/twilio-go/rest/iam/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &iam.CreateNewKeyParams{}
	params.SetFriendlyName("Mario's API key")
	params.SetAccountSid("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.IamV1.CreateNewKey(params)
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

$new_api_key = $twilio->iam->v1->newApiKey->create(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // AccountSid
    ["friendlyName" => "Mario's API key"]
);

print $new_api_key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

new_api_key = @client
              .iam
              .v1
              .new_api_key
              .create(
                friendly_name: 'Mario\'s API key',
                account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
              )

puts new_api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:create \
   --friendly-name "Mario's API key" \
   --account-sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://iam.twilio.com/v1/Keys" \
--data-urlencode "FriendlyName=Mario's API key" \
--data-urlencode "AccountSid=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar",
  "policy": null
}
```

The response contains a `sid` property and a `secret` property. Store the `secret` in a secure location, because you won't be able to retrieve it again. Twilio uses the Key resource's `sid` and the `secret` as the credentials when making API requests.

Create a Restricted API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createNewKey() {
  const newApiKey = await client.iam.v1.newApiKey.create({
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    friendlyName: "Mario's API key",
    keyType: "restricted",
    policy: {
      allow: ["/twilio/messaging/messages/read"],
    },
  });

  console.log(newApiKey.sid);
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

new_api_key = client.iam.v1.new_api_key.create(
    friendly_name="Mario's API key",
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    key_type="restricted",
    policy={"allow": ["/twilio/messaging/messages/read"]},
)

print(new_api_key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var newApiKey = await NewApiKeyResource.CreateAsync(
            friendlyName: "Mario's API key",
            accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            keyType: NewApiKeyResource.KeytypeEnum.Restricted,
            policy: new Dictionary<string, Object>() {
                { "allow", new List<string> { "/twilio/messaging/messages/read" } }
            });

        Console.WriteLine(newApiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.iam.v1.NewApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        NewApiKey newApiKey = NewApiKey.creator("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                  .setFriendlyName("Mario's API key")
                                  .setKeyType(NewApiKey.Keytype.RESTRICTED)
                                  .setPolicy(new HashMap<String, Object>() {
                                      {
                                          put("allow", Arrays.asList("/twilio/messaging/messages/read"));
                                      }
                                  })
                                  .create();

        System.out.println(newApiKey.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	iam "github.com/twilio/twilio-go/rest/iam/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &iam.CreateNewKeyParams{}
	params.SetFriendlyName("Mario's API key")
	params.SetAccountSid("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetKeyType("restricted")
	params.SetPolicy(map[string]interface{}{
		"allow": []string{
			"/twilio/messaging/messages/read",
		},
	})

	resp, err := client.IamV1.CreateNewKey(params)
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

$new_api_key = $twilio->iam->v1->newApiKey->create(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // AccountSid
    [
        "friendlyName" => "Mario's API key",
        "keyType" => "restricted",
        "policy" => [
            "allow" => ["/twilio/messaging/messages/read"],
        ],
    ]
);

print $new_api_key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

new_api_key = @client
              .iam
              .v1
              .new_api_key
              .create(
                friendly_name: 'Mario\'s API key',
                account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                key_type: 'restricted',
                policy: {
                  'allow' => [
                    '/twilio/messaging/messages/read'
                  ]
                }
              )

puts new_api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:create \
   --friendly-name "Mario's API key" \
   --account-sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --key-type restricted \
   --policy "{\"allow\":[\"/twilio/messaging/messages/read\"]}"
```

```bash
POLICY_OBJ=$(cat << EOF
{
  "allow": [
    "/twilio/messaging/messages/read"
  ]
}
EOF
)
curl -X POST "https://iam.twilio.com/v1/Keys" \
--data-urlencode "FriendlyName=Mario's API key" \
--data-urlencode "AccountSid=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "KeyType=restricted" \
--data-urlencode "Policy=$POLICY_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read"
    ]
  }
}
```

## Fetch a Key resource

`GET https://iam.twilio.com/v1/Keys/{Sid}`

Returns a representation of the API key.

> \[!WARNING]
>
> For security reasons, Twilio returns the `secret` field only when the API key is first created and never includes the `secret` field when you fetch the resource. Your application should store the API key's SID and secret in a secure location to authenticate to the API.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Standard API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchKey() {
  const apiKey = await client.iam.v1
    .apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1")
    .fetch();

  console.log(apiKey.sid);
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

api_key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1").fetch()

print(api_key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var apiKey = await ApiKeyResource.FetchAsync(pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");

        Console.WriteLine(apiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.ApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApiKey apiKey = ApiKey.fetcher("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1").fetch();

        System.out.println(apiKey.getSid());
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

	resp, err := client.IamV1.FetchKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1")
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

$api_key = $twilio->iam->v1
    ->apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1")
    ->fetch();

print $api_key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

api_key = @client
          .iam
          .v1
          .api_key('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1')
          .fetch

puts api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:fetch \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1
```

```bash
curl -X GET "https://iam.twilio.com/v1/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": null
}
```

Fetch a Restricted API key

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchKey() {
  const apiKey = await client.iam.v1
    .apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2")
    .fetch();

  console.log(apiKey.sid);
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

api_key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2").fetch()

print(api_key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var apiKey = await ApiKeyResource.FetchAsync(pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2");

        Console.WriteLine(apiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.ApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApiKey apiKey = ApiKey.fetcher("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2").fetch();

        System.out.println(apiKey.getSid());
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

	resp, err := client.IamV1.FetchKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2")
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

$api_key = $twilio->iam->v1
    ->apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2")
    ->fetch();

print $api_key->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

api_key = @client
          .iam
          .v1
          .api_key('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2')
          .fetch

puts api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:fetch \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2
```

```bash
curl -X GET "https://iam.twilio.com/v1/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read"
    ]
  }
}
```

## List Key resources

`GET https://iam.twilio.com/v1/Keys`

Returns a list of API keys associated with a given Account, sorted by `DateUpdated`.

The list includes all API keys and [paging information](/docs/usage/twilios-response#pagination).

### Query parameters

```json
[{"name":"AccountSid","in":"query","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true,"examples":{"readEmpty":{"value":"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readFull":{"value":"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List Key resources

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listGetKeys() {
  const getApiKeys = await client.iam.v1.getApiKeys.list({
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    limit: 20,
  });

  getApiKeys.forEach((g) => console.log(g.sid));
}

listGetKeys();
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

get_api_keys = client.iam.v1.get_api_keys.list(
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in get_api_keys:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var getApiKeys = await GetApiKeysResource.ReadAsync(
            accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in getApiKeys) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.GetApiKeys;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<GetApiKeys> getApiKeys = GetApiKeys.reader("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (GetApiKeys record : getApiKeys) {
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
	iam "github.com/twilio/twilio-go/rest/iam/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &iam.ListGetKeysParams{}
	params.SetAccountSid("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetLimit(20)

	resp, err := client.IamV1.ListGetKeys(params)
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

$getApiKeys = $twilio->iam->v1->getApiKeys->read(20);

foreach ($getApiKeys as $record) {
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

get_api_keys = @client
               .iam
               .v1
               .get_api_keys
               .list(
                 account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                 limit: 20
               )

get_api_keys.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:list \
   --account-sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://iam.twilio.com/v1/Keys?AccountSid=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "keys": [
    {
      "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "foo",
      "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
      "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
      "flags": [
        "rest_api",
        "signing"
      ]
    },
    {
      "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "friendly_name": "bar",
      "date_created": "Mon, 13 Jun 2016 20:50:08 +0000",
      "date_updated": "Mon, 13 Jun 2016 20:50:08 +0000",
      "flags": [
        "rest_api",
        "signing"
      ]
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://iam.twilio.com/v1/Keys?AccountSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://iam.twilio.com/v1/Keys?AccountSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "keys"
  }
}
```

## Update a Key resource

`POST https://iam.twilio.com/v1/Keys/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateKeyRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Policy":{"description":"The \\`Policy\\` object is a collection that specifies the allowed Twilio permissions for the restricted key.\nFor more information on the permissions available with restricted API keys, refer to the [Twilio documentation](https://www.twilio.com/docs/iam/api-keys/restricted-api-keys#permissions-available-with-restricted-api-keys)."}}},"examples":{"updateStandardKey":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateRestrictedKey":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"foo\",\n  \"Policy\": \"{\\\"allow\\\":[\\\"/twilio/messaging/messages/read\\\", \\\"/twilio/messaging/messages/update\\\"]}\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"foo\",\n  \"Policy\": \"{\\\"allow\\\":[\\\"/twilio/messaging/messages/read\\\", \\\"/twilio/messaging/messages/update\\\"]}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"foo\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Policy\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["allow","#A5D6FF"],["\\\"","#79C0FF"],[":[","#A5D6FF"],["\\\"","#79C0FF"],["/twilio/messaging/messages/read","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"]," ",["\\\"","#79C0FF"],["/twilio/messaging/messages/update","#A5D6FF"],["\\\"","#79C0FF"],["]}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Attempts to update the fields of an API Key resource.

If successful, Twilio returns the updated resource representation. The response is identical to that of the [fetch a Key resource endpoint](#fetch-a-key-resource).

Update a Standard Key resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateKey() {
  const apiKey = await client.iam.v1
    .apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ friendlyName: "friendly_name" });

  console.log(apiKey.sid);
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

key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name"
)

print(key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var apiKey = await ApiKeyResource.UpdateAsync(
            friendlyName: "friendly_name", pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(apiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.ApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApiKey apiKey = ApiKey.updater("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setFriendlyName("friendly_name").update();

        System.out.println(apiKey.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	iam "github.com/twilio/twilio-go/rest/iam/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &iam.UpdateKeyParams{}
	params.SetFriendlyName("friendly_name")

	resp, err := client.IamV1.UpdateKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$key = $twilio->iam->v1
    ->apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

api_key = @client
          .iam
          .v1
          .api_key('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(friendly_name: 'friendly_name')

puts api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:update \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name friendly_name
```

```bash
curl -X POST "https://iam.twilio.com/v1/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "FriendlyName=friendly_name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": null
}
```

> \[!NOTE]
>
> The update request completely overwrites the existing policy associated with the original API key. You must include all the required permissions in the `Policy` object of an update request. To remove a specific permission while retaining others, include only the permissions that should be kept.

Update a Restricted Key resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateKey() {
  const apiKey = await client.iam.v1
    .apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      friendlyName: "friendly_name",
      policy: {
        allow: [
          "/twilio/messaging/messages/read",
          "/twilio/messaging/messages/update",
        ],
      },
    });

  console.log(apiKey.sid);
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

key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name",
    policy={
        "allow": [
            "/twilio/messaging/messages/read",
            "/twilio/messaging/messages/update",
        ]
    },
)

print(key.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var apiKey = await ApiKeyResource.UpdateAsync(
            friendlyName: "friendly_name",
            policy: new Dictionary<
                string,
                Object>() { { "allow", new List<string> { "/twilio/messaging/messages/read", "/twilio/messaging/messages/update" } } },
            pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(apiKey.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.iam.v1.ApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApiKey apiKey =
            ApiKey.updater("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .setFriendlyName("friendly_name")
                .setPolicy(new HashMap<String, Object>() {
                    {
                        put("allow",
                            Arrays.asList("/twilio/messaging/messages/read", "/twilio/messaging/messages/update"));
                    }
                })
                .update();

        System.out.println(apiKey.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	iam "github.com/twilio/twilio-go/rest/iam/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &iam.UpdateKeyParams{}
	params.SetFriendlyName("friendly_name")
	params.SetPolicy(map[string]interface{}{
		"allow": []string{
			"/twilio/messaging/messages/read",
			"/twilio/messaging/messages/update",
		},
	})

	resp, err := client.IamV1.UpdateKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$key = $twilio->iam->v1->apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->update([
    "friendlyName" => "friendly_name",
    "policy" => [
        "allow" => [
            "/twilio/messaging/messages/read",
            "/twilio/messaging/messages/update",
        ],
    ],
]);

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

api_key = @client
          .iam
          .v1
          .api_key('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(
            friendly_name: 'friendly_name',
            policy: {
              'allow' => [
                '/twilio/messaging/messages/read',
                '/twilio/messaging/messages/update'
              ]
            }
          )

puts api_key.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:update \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name friendly_name \
   --policy "{\"allow\":[\"/twilio/messaging/messages/read\",\"/twilio/messaging/messages/update\"]}"
```

```bash
POLICY_OBJ=$(cat << EOF
{
  "allow": [
    "/twilio/messaging/messages/read",
    "/twilio/messaging/messages/update"
  ]
}
EOF
)
curl -X POST "https://iam.twilio.com/v1/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "FriendlyName=friendly_name" \
--data-urlencode "Policy=$POLICY_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read",
      "/twilio/messaging/messages/update"
    ]
  }
}
```

## Delete a Key resource

`DELETE https://iam.twilio.com/v1/Keys/{Sid}`

Deletes an API key. Deleting an API key revokes the authorization to authenticate to the REST API and invalidates all Access Tokens generated using the API key's secret.

If the deletion is successful, Twilio returns an HTTP 204 response with no body.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Key resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^SK[0-9a-fA-F]{32}$"},"required":true}]
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
  await client.iam.v1.apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
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

client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Iam.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ApiKeyResource.DeleteAsync(pathSid: "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.iam.v1.ApiKey;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApiKey.deleter("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.IamV1.DeleteKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$twilio->iam->v1->apiKey("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .iam
  .v1
  .api_key('SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:iam:v1:keys:remove \
   --sid SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://iam.twilio.com/v1/Keys/SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
