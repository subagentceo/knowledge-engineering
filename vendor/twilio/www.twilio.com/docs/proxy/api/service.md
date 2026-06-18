# Service

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

A **Service** is the top-level scope of all other resources in the REST API. It owns [Sessions](/docs/proxy/api/session) and Proxy Numbers (like [Phone Numbers](/docs/proxy/api/phone-number) for a Proxy application. Services allow you to:

* Create multiple environments (e.g. *dev*, *stage*, and *prod*) under the same Twilio account with segregated data
* Scope access to resources through the REST API
* Configure the behavior of the Service per instance

## Service Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service","modelName":"proxy_v1_service","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Service resource."},"unique_name":{"type":"string","nullable":true,"description":"An application-defined string that uniquely identifies the resource. This value must be 191 characters or fewer in length and be unique. Supports UTF-8 characters. **This value should not have PII.**"},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Service resource."},"chat_instance_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^IS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Chat Service Instance managed by Proxy Service. The Chat Service enables Proxy to forward SMS and channel messages to this chat instance. This is a one-to-one relationship."},"callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call when the interaction status changes."},"default_ttl":{"type":"integer","default":0,"description":"The default `ttl` value for Sessions created in the Service. The TTL (time to live) is measured in seconds after the Session's last create or last Interaction. The default value of `0` indicates an unlimited Session length. You can override a Session's default TTL value by setting its `ttl` value."},"number_selection_behavior":{"type":"string","enum":["avoid-sticky","prefer-sticky"],"description":"The preference for Proxy Number selection in the Service instance. Can be: `prefer-sticky` or `avoid-sticky`. `prefer-sticky` means that we will try and select the same Proxy Number for a given participant if they have previous [Sessions](https://www.twilio.com/docs/proxy/api/session), but we will not fail if that Proxy Number cannot be used.  `avoid-sticky` means that we will try to use different Proxy Numbers as long as that is possible within a given pool rather than try and use a previously assigned number.","refName":"service_enum_number_selection_behavior","modelName":"service_enum_number_selection_behavior"},"geo_match_level":{"type":"string","enum":["area-code","overlay","radius","country"],"description":"Where a proxy number must be located relative to the participant identifier. Can be: `country`, `area-code`, or `extended-area-code`. The default value is `country` and more specific areas than `country` are only available in North America.","refName":"service_enum_geo_match_level","modelName":"service_enum_geo_match_level"},"intercept_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call on each interaction. If we receive a 403 status, we block the interaction; otherwise the interaction continues."},"out_of_session_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call when an inbound call or SMS action occurs on a closed or non-existent Session. If your server (or a Twilio [function](https://www.twilio.com/en-us/serverless/functions)) responds with valid [TwiML](https://www.twilio.com/docs/voice/twiml), we will process it. This means it is possible, for example, to play a message for a call, send an automated text message response, or redirect a call to another Phone Number. See [Out-of-Session Callback Response Guide](https://www.twilio.com/docs/proxy/out-session-callback-response-guide) for more information."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Service resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of resources related to the Service."}}}} />

## Note on Proxy Numbers associated with Services

A Twilio [Phone Number](/docs/proxy/api/phone-number) associated with a Proxy Service cannot be associated with other Proxy Services in the same account.

## Learning about Proxy Number management

A Proxy Service contains a lot of detailed configuration options regarding Proxy Number selection logic. If you'd like to learn more about how Proxy handles Proxy Numbers, check out the [Proxy Number Management](/docs/proxy/understanding-phone-number-management) explanation page.

## Create a Service resource

`POST https://proxy.twilio.com/v1/Services`

Create a new Service.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateServiceRequest","required":["UniqueName"],"properties":{"UniqueName":{"type":"string","description":"An application-defined string that uniquely identifies the resource. This value must be 191 characters or fewer in length and be unique. **This value should not have PII.**"},"DefaultTtl":{"type":"integer","description":"The default `ttl` value to set for Sessions created in the Service. The TTL (time to live) is measured in seconds after the Session's last create or last Interaction. The default value of `0` indicates an unlimited Session length. You can override a Session's default TTL value by setting its `ttl` value."},"CallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when the interaction status changes."},"GeoMatchLevel":{"type":"string","enum":["area-code","overlay","radius","country"],"description":"Where a proxy number must be located relative to the participant identifier. Can be: `country`, `area-code`, or `extended-area-code`. The default value is `country` and more specific areas than `country` are only available in North America.","refName":"service_enum_geo_match_level","modelName":"service_enum_geo_match_level"},"NumberSelectionBehavior":{"type":"string","enum":["avoid-sticky","prefer-sticky"],"description":"The preference for Proxy Number selection in the Service instance. Can be: `prefer-sticky` or `avoid-sticky`. `prefer-sticky` means that we will try and select the same Proxy Number for a given participant if they have previous [Sessions](https://www.twilio.com/docs/proxy/api/session), but we will not fail if that Proxy Number cannot be used.  `avoid-sticky` means that we will try to use different Proxy Numbers as long as that is possible within a given pool rather than try and use a previously assigned number.","refName":"service_enum_number_selection_behavior","modelName":"service_enum_number_selection_behavior"},"InterceptCallbackUrl":{"type":"string","format":"uri","description":"The URL we call on each interaction. If we receive a 403 status, we block the interaction; otherwise the interaction continues."},"OutOfSessionCallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when an inbound call or SMS action occurs on a closed or non-existent Session. If your server (or a Twilio [function](https://www.twilio.com/en-us/serverless/functions)) responds with valid [TwiML](https://www.twilio.com/docs/voice/twiml), we will process it. This means it is possible, for example, to play a message for a call, send an automated text message response, or redirect a call to another Phone Number. See [Out-of-Session Callback Response Guide](https://www.twilio.com/docs/proxy/out-session-callback-response-guide) for more information."},"ChatInstanceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^IS[0-9a-fA-F]{32}$","description":"The SID of the Chat Service Instance managed by Proxy Service. The Chat Service enables Proxy to forward SMS and channel messages to this chat instance. This is a one-to-one relationship."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"DefaultTtl\": 3600,\n  \"CallbackUrl\": \"http://www.example.com\",\n  \"UniqueName\": \"My Service\",\n  \"ChatInstanceSid\": \"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"DefaultTtl\": 3600,\n  \"CallbackUrl\": \"http://www.example.com\",\n  \"UniqueName\": \"My Service\",\n  \"ChatInstanceSid\": \"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"DefaultTtl\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My Service\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChatInstanceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new Service for Twilio Proxy

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.proxy.v1.services.create({
    uniqueName: "UniqueName",
  });

  console.log(service.sid);
}

createService();
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

service = client.proxy.v1.services.create(unique_name="UniqueName")

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.CreateAsync(uniqueName: "UniqueName");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("UniqueName").create();

        System.out.println(service.getSid());
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

	params := &proxy.CreateServiceParams{}
	params.SetUniqueName("UniqueName")

	resp, err := client.ProxyV1.CreateService(params)
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

$service = $twilio->proxy->v1->services->create(
    "UniqueName" // UniqueName
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .proxy
          .v1
          .services
          .create(unique_name: 'UniqueName')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:create \
   --unique-name UniqueName
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services" \
--data-urlencode "UniqueName=UniqueName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_instance_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "UniqueName",
  "default_ttl": 3600,
  "callback_url": "http://www.example.com",
  "geo_match_level": "country",
  "number_selection_behavior": "prefer-sticky",
  "intercept_callback_url": "http://www.example.com",
  "out_of_session_callback_url": "http://www.example.com",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sessions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions",
    "phone_numbers": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Fetch a Service resource

`GET https://proxy.twilio.com/v1/Services/{Sid}`

Retrieve a single Service.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Service resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a specific Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchService() {
  const service = await client.proxy.v1.services("Sid").fetch();

  console.log(service.sid);
}

fetchService();
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

service = client.proxy.v1.services("Sid").fetch()

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.FetchAsync(pathSid: "Sid");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.fetcher("Sid").fetch();

        System.out.println(service.getSid());
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

	resp, err := client.ProxyV1.FetchService("Sid")
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

$service = $twilio->proxy->v1->services("Sid")->fetch();

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .proxy
          .v1
          .services('Sid')
          .fetch

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:fetch \
   --sid Sid
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_instance_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "My Service",
  "default_ttl": 3600,
  "callback_url": "http://www.example.com",
  "geo_match_level": "country",
  "number_selection_behavior": "prefer-sticky",
  "intercept_callback_url": "http://www.example.com",
  "out_of_session_callback_url": "http://www.example.com",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sessions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions",
    "phone_numbers": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Read multiple Service resources

`GET https://proxy.twilio.com/v1/Services`

Retrieve a list of all Services for a given account.

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of all Services for Twilio Proxy. A maximum of 100 records will be returned per page

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listService() {
  const services = await client.proxy.v1.services.list({ limit: 20 });

  services.forEach((s) => console.log(s.sid));
}

listService();
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

services = client.proxy.v1.services.list(limit=20)

for record in services:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var services = await ServiceResource.ReadAsync(limit: 20);

        foreach (var record in services) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.Service;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Service> services = Service.reader().limit(20).read();

        for (Service record : services) {
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

	params := &proxy.ListServiceParams{}
	params.SetLimit(20)

	resp, err := client.ProxyV1.ListService(params)
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

$services = $twilio->proxy->v1->services->read(20);

foreach ($services as $record) {
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

services = @client
           .proxy
           .v1
           .services
           .list(limit: 20)

services.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:list
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "services": [],
  "meta": {
    "first_page_url": "https://proxy.twilio.com/v1/Services?PageSize=50&Page=0",
    "key": "services",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://proxy.twilio.com/v1/Services?PageSize=50&Page=0"
  }
}
```

## Update a Service resource

`POST https://proxy.twilio.com/v1/Services/{Sid}`

Update a Service's configuration.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Service resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateServiceRequest","properties":{"UniqueName":{"type":"string","description":"An application-defined string that uniquely identifies the resource. This value must be 191 characters or fewer in length and be unique. **This value should not have PII.**"},"DefaultTtl":{"type":"integer","description":"The default `ttl` value to set for Sessions created in the Service. The TTL (time to live) is measured in seconds after the Session's last create or last Interaction. The default value of `0` indicates an unlimited Session length. You can override a Session's default TTL value by setting its `ttl` value."},"CallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when the interaction status changes."},"GeoMatchLevel":{"type":"string","enum":["area-code","overlay","radius","country"],"description":"Where a proxy number must be located relative to the participant identifier. Can be: `country`, `area-code`, or `extended-area-code`. The default value is `country` and more specific areas than `country` are only available in North America.","refName":"service_enum_geo_match_level","modelName":"service_enum_geo_match_level"},"NumberSelectionBehavior":{"type":"string","enum":["avoid-sticky","prefer-sticky"],"description":"The preference for Proxy Number selection in the Service instance. Can be: `prefer-sticky` or `avoid-sticky`. `prefer-sticky` means that we will try and select the same Proxy Number for a given participant if they have previous [Sessions](https://www.twilio.com/docs/proxy/api/session), but we will not fail if that Proxy Number cannot be used.  `avoid-sticky` means that we will try to use different Proxy Numbers as long as that is possible within a given pool rather than try and use a previously assigned number.","refName":"service_enum_number_selection_behavior","modelName":"service_enum_number_selection_behavior"},"InterceptCallbackUrl":{"type":"string","format":"uri","description":"The URL we call on each interaction. If we receive a 403 status, we block the interaction; otherwise the interaction continues."},"OutOfSessionCallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when an inbound call or SMS action occurs on a closed or non-existent Session. If your server (or a Twilio [function](https://www.twilio.com/en-us/serverless/functions)) responds with valid [TwiML](https://www.twilio.com/docs/voice/twiml), we will process it. This means it is possible, for example, to play a message for a call, send an automated text message response, or redirect a call to another Phone Number. See [Out-of-Session Callback Response Guide](https://www.twilio.com/docs/proxy/out-session-callback-response-guide) for more information."},"ChatInstanceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^IS[0-9a-fA-F]{32}$","description":"The SID of the Chat Service Instance managed by Proxy Service. The Chat Service enables Proxy to forward SMS and channel messages to this chat instance. This is a one-to-one relationship."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"DefaultTtl\": 3600,\n  \"CallbackUrl\": \"http://www.example.com\",\n  \"UniqueName\": \"My Service\",\n  \"ChatInstanceSid\": \"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"DefaultTtl\": 3600,\n  \"CallbackUrl\": \"http://www.example.com\",\n  \"UniqueName\": \"My Service\",\n  \"ChatInstanceSid\": \"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"DefaultTtl\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My Service\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChatInstanceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a specific Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ uniqueName: "UniqueName" });

  console.log(service.sid);
}

updateService();
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

service = client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    unique_name="UniqueName"
)

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            uniqueName: "UniqueName", pathSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.updater("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setUniqueName("UniqueName").update();

        System.out.println(service.getSid());
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

	params := &proxy.UpdateServiceParams{}
	params.SetUniqueName("UniqueName")

	resp, err := client.ProxyV1.UpdateService("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$service = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["uniqueName" => "UniqueName"]);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .proxy
          .v1
          .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(unique_name: 'UniqueName')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:update \
   --sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --unique-name UniqueName
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "UniqueName=UniqueName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_instance_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "UniqueName",
  "default_ttl": 3600,
  "callback_url": "http://www.example.com",
  "geo_match_level": "country",
  "number_selection_behavior": "prefer-sticky",
  "intercept_callback_url": "http://www.example.com",
  "out_of_session_callback_url": "http://www.example.com",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sessions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions",
    "phone_numbers": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Delete a Service resource

`DELETE https://proxy.twilio.com/v1/Services/{Sid}`

Permanently delete a Service and all children (Sessions, Participants, Interactions). In addition, all associated Proxy Numbers (e.g. Phone Numbers) will become available for assignment to another Service.

> \[!CAUTION]
>
> Any [Message](/docs/messaging/api/message-resource) or [Call](/docs/voice/api/call-resource) records created during interactions for [Sessions](/docs/proxy/api/session) in this Service will NOT be deleted automatically. If you want to delete all related Message/Call resources, you must issue direct `DELETE` requests for the inbound and outbound resources of all child [Interactions](/docs/proxy/api/interaction) directly. Once you have deleted a Service, those resource SIDs will not be discoverable via Proxy.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Service resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteService() {
  await client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteService();
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

client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ServiceResource.DeleteAsync(pathSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service.deleter("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.ProxyV1.DeleteService("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->proxy->v1->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
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
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:remove \
   --sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
