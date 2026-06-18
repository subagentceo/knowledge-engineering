# TrustProduct Resource

## TrustProduct Properties

<OperationTable type="properties" data={{"type":"object","refName":"trusthub.v1.trust_product","modelName":"trusthub_v1_trust_product","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Trust Product resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Trust Product resource."},"policy_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string of the policy that is associated with the Trust Product resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"status":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved"],"description":"The verification status of the Trust Product resource.","refName":"trust_product_enum_status","modelName":"trust_product_enum_status"},"valid_until":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format until which the resource will be valid."},"email":{"type":"string","nullable":true,"description":"The email address that will receive updates when the Trust Product resource changes status."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call to inform your application of status changes."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Trust Product resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of the Assigned Items of the Trust Product resource."},"errors":{"type":"array","nullable":true,"description":"The error codes associated with the rejection of the Trust Product."}}}} />

## Create a TrustProduct resource

`POST https://trusthub.twilio.com/v1/TrustProducts`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateTrustProductRequest","required":["FriendlyName","Email","PolicySid"],"properties":{"FriendlyName":{"type":"string","description":"The string that you assigned to describe the resource."},"Email":{"type":"string","description":"The email address that will receive updates when the Trust Product resource changes status."},"PolicySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$","description":"The unique string of a policy that is associated to the Trust Product resource."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we call to inform your application of status changes."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"notification@email.com\",\n  \"PolicySid\": \"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"StatusCallback\": \"http://www.example.com\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"notification@email.com\",\n  \"PolicySid\": \"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"StatusCallback\": \"http://www.example.com\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"notification@email.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PolicySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a TrustProduct resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProduct() {
  const trustProduct = await client.trusthub.v1.trustProducts.create({
    email: "secondary@example.com",
    friendlyName: "friendly_name",
    policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "http://www.example.com",
  });

  console.log(trustProduct.sid);
}

createTrustProduct();
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

trust_product = client.trusthub.v1.trust_products.create(
    email="secondary@example.com",
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status_callback="http://www.example.com",
)

print(trust_product.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.CreateAsync(
            email: "secondary@example.com",
            friendlyName: "friendly_name",
            policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            statusCallback: new Uri("http://www.example.com"));

        Console.WriteLine(trustProducts.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts trustProducts =
            TrustProducts.creator("friendly_name", "secondary@example.com", "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setStatusCallback(URI.create("http://www.example.com"))
                .create();

        System.out.println(trustProducts.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateTrustProductParams{}
	params.SetEmail("secondary@example.com")
	params.SetFriendlyName("friendly_name")
	params.SetPolicySid("RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	params.SetStatusCallback("http://www.example.com")

	resp, err := client.TrusthubV1.CreateTrustProduct(params)
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

$trust_product = $twilio->trusthub->v1->trustProducts->create(
    "friendly_name", // FriendlyName
    "secondary@example.com", // Email
    "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // PolicySid
    ["statusCallback" => "http://www.example.com"]
);

print $trust_product->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_product = @client
                .trusthub
                .v1
                .trust_products
                .create(
                  email: 'secondary@example.com',
                  friendly_name: 'friendly_name',
                  policy_sid: 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  status_callback: 'http://www.example.com'
                )

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:create \
   --email secondary@example.com \
   --friendly-name friendly_name \
   --policy-sid RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status-callback http://www.example.com
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts" \
--data-urlencode "Email=secondary@example.com" \
--data-urlencode "FriendlyName=friendly_name" \
--data-urlencode "PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "StatusCallback=http://www.example.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "secondary@example.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

## Fetch a TrustProduct resource

`GET https://trusthub.twilio.com/v1/TrustProducts/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Trust Product resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a TrustProduct resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTrustProduct() {
  const trustProduct = await client.trusthub.v1
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(trustProduct.sid);
}

fetchTrustProduct();
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

trust_product = client.trusthub.v1.trust_products(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(trust_product.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts =
            await TrustProductsResource.FetchAsync(pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(trustProducts.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts trustProducts = TrustProducts.fetcher("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(trustProducts.getSid());
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

	resp, err := client.TrusthubV1.FetchTrustProduct("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$trust_product = $twilio->trusthub->v1
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $trust_product->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_product = @client
                .trusthub
                .v1
                .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .fetch

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:fetch \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "valid_until": null,
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": [
    {
      "code": 18601
    }
  ]
}
```

## Read multiple TrustProduct resources

`GET https://trusthub.twilio.com/v1/TrustProducts`

### Query parameters

```json
[{"name":"Status","in":"query","description":"The verification status of the Trust Product resource.","schema":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved"],"description":"The verification status of the Trust Product resource.","refName":"trust_product_enum_status","modelName":"trust_product_enum_status"},"examples":{"readFull":{"value":"draft"}}},{"name":"FriendlyName","in":"query","description":"The string that you assigned to describe the resource.","schema":{"type":"string"},"examples":{"readFull":{"value":"friendly_name"}}},{"name":"PolicySid","in":"query","description":"The unique string of a policy that is associated to the Trust Product resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve multiple TrustProduct resources

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTrustProduct() {
  const trustProducts = await client.trusthub.v1.trustProducts.list({
    friendlyName: "friendly_name",
    policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    limit: 20,
  });

  trustProducts.forEach((t) => console.log(t.sid));
}

listTrustProduct();
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

trust_products = client.trusthub.v1.trust_products.list(
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    limit=20,
)

for record in trust_products:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.ReadAsync(
            friendlyName: "friendly_name",
            policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            limit: 20);

        foreach (var record in trustProducts) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TrustProducts> trustProducts = TrustProducts.reader()
                                                       .setFriendlyName("friendly_name")
                                                       .setPolicySid("RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                       .limit(20)
                                                       .read();

        for (TrustProducts record : trustProducts) {
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListTrustProductParams{}
	params.SetFriendlyName("friendly_name")
	params.SetPolicySid("RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListTrustProduct(params)
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

$trustProducts = $twilio->trusthub->v1->trustProducts->read(
    [
        "friendlyName" => "friendly_name",
        "policySid" => "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    ],
    20
);

foreach ($trustProducts as $record) {
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

trust_products = @client
                 .trusthub
                 .v1
                 .trust_products
                 .list(
                   friendly_name: 'friendly_name',
                   policy_sid: 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                   limit: 20
                 )

trust_products.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:list \
   --friendly-name friendly_name \
   --policy-sid RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/TrustProducts?FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/TrustProducts?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/TrustProducts?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

## Update a TrustProduct resource

`POST https://trusthub.twilio.com/v1/TrustProducts/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Trust Product resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateTrustProductRequest","properties":{"Status":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved"],"description":"The verification status of the Trust Product resource.","refName":"trust_product_enum_status","modelName":"trust_product_enum_status"},"StatusCallback":{"type":"string","format":"uri","description":"The URL we call to inform your application of status changes."},"FriendlyName":{"type":"string","description":"The string that you assigned to describe the resource."},"Email":{"type":"string","description":"The email address that will receive updates when the Trust Product resource changes status."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"StatusCallback\": \"http://www.example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"notification@email.com\"\n}","meta":"","code":"{\n  \"StatusCallback\": \"http://www.example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"notification@email.com\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"notification@email.com\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateToInReview":{"value":{"lang":"json","value":"{\n  \"Status\": \"pending-review\"\n}","meta":"","code":"{\n  \"Status\": \"pending-review\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"pending-review\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a TrustProduct resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTrustProduct() {
  const trustProduct = await client.trusthub.v1
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      email: "notification@email.com",
      friendlyName: "friendly_name",
      statusCallback: "http://www.example.com",
    });

  console.log(trustProduct.sid);
}

updateTrustProduct();
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

trust_product = client.trusthub.v1.trust_products(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    status_callback="http://www.example.com",
    friendly_name="friendly_name",
    email="notification@email.com",
)

print(trust_product.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.UpdateAsync(
            statusCallback: new Uri("http://www.example.com"),
            friendlyName: "friendly_name",
            email: "notification@email.com",
            pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(trustProducts.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts trustProducts = TrustProducts.updater("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                          .setStatusCallback(URI.create("http://www.example.com"))
                                          .setFriendlyName("friendly_name")
                                          .setEmail("notification@email.com")
                                          .update();

        System.out.println(trustProducts.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.UpdateTrustProductParams{}
	params.SetStatusCallback("http://www.example.com")
	params.SetFriendlyName("friendly_name")
	params.SetEmail("notification@email.com")

	resp, err := client.TrusthubV1.UpdateTrustProduct("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$trust_product = $twilio->trusthub->v1
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "statusCallback" => "http://www.example.com",
        "friendlyName" => "friendly_name",
        "email" => "notification@email.com",
    ]);

print $trust_product->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_product = @client
                .trusthub
                .v1
                .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .update(
                  status_callback: 'http://www.example.com',
                  friendly_name: 'friendly_name',
                  email: 'notification@email.com'
                )

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:update \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status-callback http://www.example.com \
   --friendly-name friendly_name \
   --email notification@email.com
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "StatusCallback=http://www.example.com" \
--data-urlencode "FriendlyName=friendly_name" \
--data-urlencode "Email=notification@email.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

## Delete a TrustProduct resource

`DELETE https://trusthub.twilio.com/v1/TrustProducts/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Trust Product resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

Delete one TrustProduct resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTrustProduct() {
  await client.trusthub.v1
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteTrustProduct();
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

client.trusthub.v1.trust_products("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await TrustProductsResource.DeleteAsync(pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts.deleter("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.TrusthubV1.DeleteTrustProduct("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->trusthub->v1
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .trusthub
  .v1
  .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:remove \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
