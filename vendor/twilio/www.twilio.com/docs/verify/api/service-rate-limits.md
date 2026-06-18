# Service Rate Limits

Service Rate Limits makes it easy to use Twilio's battle-tested rate-limiting services to protect your Verify deployment. With Service Rate Limits, you can define the keys to meter and limits to enforce when starting user verifications. Together with Verify's built-in platform protections Service Rate Limits gives you turnkey protection with flexibility.

**Prerequisites:**

1. [Create a Verification Service](/docs/verify/api/service)

> \[!NOTE]
>
> If you are just getting started with Rate Limits in Verify we recommend checking out our guide on [Using Verify Service Rate Limits to Protect Your Application](/docs/verify/api/programmable-rate-limits) before diving into the API.

## Rate Limit Properties

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.service.rate_limit","modelName":"verify_v2_service_rate_limit","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RK[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies this Rate Limit."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Rate Limit resource."},"unique_name":{"type":"string","nullable":true,"description":"Provides a unique and addressable name to be assigned to this Rate Limit, assigned by the developer, to be optionally used in addition to SID. **This value should not contain PII.**"},"description":{"type":"string","nullable":true,"description":"Description of this Rate Limit"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Rate Limit

`POST https://verify.twilio.com/v2/Services/{ServiceSid}/RateLimits`

The Rate Limit represents the key that your application will provide when starting a user verification request. For example, you may create a rate limit for an end-user IP address to prevent a malicious bot. See the section on Selecting Rate Limit Keys for information on this topic.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateRateLimitRequest","required":["UniqueName"],"properties":{"UniqueName":{"type":"string","description":"Provides a unique and addressable name to be assigned to this Rate Limit, assigned by the developer, to be optionally used in addition to SID. **This value should not contain PII.**"},"Description":{"type":"string","description":"Description of this Rate Limit"}}},"examples":{"createRateLimit":{"value":{"lang":"json","value":"{\n  \"UniqueName\": \"unique.name\",\n  \"Description\": \"Description\"\n}","meta":"","code":"{\n  \"UniqueName\": \"unique.name\",\n  \"Description\": \"Description\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"unique.name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"Description\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Rate Limit

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRateLimit() {
  const rateLimit = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rateLimits.create({
      description: "Limit on end user IP Address",
      uniqueName: "end_user_ip_address",
    });

  console.log(rateLimit.sid);
}

createRateLimit();
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

rate_limit = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).rate_limits.create(
    unique_name="end_user_ip_address",
    description="Limit on end user IP Address",
)

print(rate_limit.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var rateLimit = await RateLimitResource.CreateAsync(
            uniqueName: "end_user_ip_address",
            description: "Limit on end user IP Address",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(rateLimit.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.RateLimit;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RateLimit rateLimit = RateLimit.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "end_user_ip_address")
                                  .setDescription("Limit on end user IP Address")
                                  .create();

        System.out.println(rateLimit.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateRateLimitParams{}
	params.SetUniqueName("end_user_ip_address")
	params.SetDescription("Limit on end user IP Address")

	resp, err := client.VerifyV2.CreateRateLimit("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$rate_limit = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->rateLimits->create(
        "end_user_ip_address", // UniqueName
        ["description" => "Limit on end user IP Address"]
    );

print $rate_limit->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

rate_limit = @client
             .verify
             .v2
             .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .rate_limits
             .create(
               unique_name: 'end_user_ip_address',
               description: 'Limit on end user IP Address'
             )

puts rate_limit.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:rate-limits:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --unique-name end_user_ip_address \
   --description "Limit on end user IP Address"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits" \
--data-urlencode "UniqueName=end_user_ip_address" \
--data-urlencode "Description=Limit on end user IP Address" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "end_user_ip_address",
  "description": "Limit on end user IP Address",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "buckets": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Buckets"
  }
}
```

## Fetch a Rate Limit

`GET https://verify.twilio.com/v2/Services/{ServiceSid}/RateLimits/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Rate Limit resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RK[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Rate Limit

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRateLimit() {
  const rateLimit = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(rateLimit.sid);
}

fetchRateLimit();
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

rate_limit = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rate_limits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(rate_limit.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var rateLimit = await RateLimitResource.FetchAsync(
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(rateLimit.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.RateLimit;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RateLimit rateLimit =
            RateLimit.fetcher("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(rateLimit.getSid());
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

	resp, err := client.VerifyV2.FetchRateLimit("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$rate_limit = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $rate_limit->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

rate_limit = @client
             .verify
             .v2
             .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .rate_limits('RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .fetch

puts rate_limit.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:rate-limits:fetch \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "unique.name",
  "description": "Description",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "buckets": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Buckets"
  }
}
```

## List all Rate Limits

`GET https://verify.twilio.com/v2/Services/{ServiceSid}/RateLimits`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Rate Limits

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRateLimit() {
  const rateLimits = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rateLimits.list({ limit: 20 });

  rateLimits.forEach((r) => console.log(r.sid));
}

listRateLimit();
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

rate_limits = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).rate_limits.list(limit=20)

for record in rate_limits:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var rateLimits = await RateLimitResource.ReadAsync(
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in rateLimits) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.RateLimit;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<RateLimit> rateLimits = RateLimit.reader("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (RateLimit record : rateLimits) {
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
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.ListRateLimitParams{}
	params.SetLimit(20)

	resp, err := client.VerifyV2.ListRateLimit("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$rateLimits = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->rateLimits->read(20);

foreach ($rateLimits as $record) {
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

rate_limits = @client
              .verify
              .v2
              .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .rate_limits
              .list(limit: 20)

rate_limits.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:rate-limits:list \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "rate_limits",
    "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits?PageSize=50&Page=0"
  },
  "rate_limits": [
    {
      "sid": "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "unique_name": "unique.name",
      "description": "Description",
      "date_created": "2015-07-30T20:00:00Z",
      "date_updated": "2015-07-30T20:00:00Z",
      "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "buckets": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Buckets"
      }
    }
  ]
}
```

## Update a Rate Limit

`POST https://verify.twilio.com/v2/Services/{ServiceSid}/RateLimits/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Rate Limit resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRateLimitRequest","properties":{"Description":{"type":"string","description":"Description of this Rate Limit"}}},"examples":{"updateRateLimit":{"value":{"lang":"json","value":"{\n  \"Description\": \"Description\"\n}","meta":"","code":"{\n  \"Description\": \"Description\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"Description\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Rate Limit

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateRateLimit() {
  const rateLimit = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ description: "A much better description" });

  console.log(rateLimit.sid);
}

updateRateLimit();
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

rate_limit = (
    client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rate_limits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(description="A much better description")
)

print(rate_limit.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var rateLimit = await RateLimitResource.UpdateAsync(
            description: "A much better description",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(rateLimit.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.RateLimit;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RateLimit rateLimit =
            RateLimit.updater("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setDescription("A much better description")
                .update();

        System.out.println(rateLimit.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.UpdateRateLimitParams{}
	params.SetDescription("A much better description")

	resp, err := client.VerifyV2.UpdateRateLimit("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$rate_limit = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["description" => "A much better description"]);

print $rate_limit->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

rate_limit = @client
             .verify
             .v2
             .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .rate_limits('RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .update(description: 'A much better description')

puts rate_limit.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:rate-limits:update \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --description "A much better description"
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Description=A much better description" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "unique.name",
  "description": "A much better description",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "buckets": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Buckets"
  }
}
```

## Delete a Rate Limit

`DELETE https://verify.twilio.com/v2/Services/{ServiceSid}/RateLimits/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the [Service](https://www.twilio.com/docs/verify/api/service) the resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^VA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Rate Limit resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RK[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Rate Limit

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteRateLimit() {
  await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteRateLimit();
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

client.verify.v2.services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").rate_limits(
    "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await RateLimitResource.DeleteAsync(
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.RateLimit;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RateLimit.deleter("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.VerifyV2.DeleteRateLimit("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->rateLimits("RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .verify
  .v2
  .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .rate_limits('RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:rate-limits:remove \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits/RKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
