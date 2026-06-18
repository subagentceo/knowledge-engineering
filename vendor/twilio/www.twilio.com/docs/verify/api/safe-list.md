# Safe List

> \[!NOTE]
>
> This Verify feature is available as Pilot.
>
> Verify customers who have turned on [Fraud Guard][] can access the Safe List API. Fraud Guard is GA and all Verify customers can use it at no extra cost.
>
> If you don't use Fraud Guard and want to use this API, [contact sales][].
>
> **Note**: Safe List API currently only supports the **SMS** channel.

Safe List API allows you to maintain a list of phone numbers that neither Verify [Fraud Guard][] nor [Geo permissions][] block. While Twilio adapts its fraud detection model to minimize false positives, Safe List API lets you mark phone numbers as safe so they never get blocked.

This API contains three endpoints:

1. [Add a Phone Number][]
2. [Check a Phone Number][]
3. [Remove a Phone Number][]

Using [Verify Logs Blocked Verifications][] in the Twilio Console, you can add a previously blocked phone number to the Safe List. To learn more about this feature, see [Viewing Logs With Twilio Console][].

## Rate limits

Safe List API provides a built-in rate limit of 30 requests per minute. If you reach this limit, you will start receiving HTTP 429 "Too Many Requests" responses.

## Timeouts

Safe List API has a timeout value of 15 seconds. However, its 99th percentile is within one second.

## Safe List Response Properties

The JSON response output returns these properties.

> \[!NOTE]
>
> The capitalization of the multiple-word identifiers in the parameter and property lists changes to match the [selected language's conventions][cap-conv].

[cap-conv]: https://en.wikipedia.org/wiki/Naming_convention_\(programming\)#Language-specific_conventions

<OperationTable type="properties" data={{"type":"object","refName":"verify.v2.safelist","modelName":"verify_v2_safelist","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the SafeList resource."},"phone_number":{"type":"string","nullable":true,"description":"The phone number in SafeList.","x-twilio":{"pii":{"handling":"standard","deleteSla":0}}},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the SafeList resource."}}}} />

## Add a Phone Number

`POST https://verify.twilio.com/v2/SafeList/Numbers`

Adds a single phone number to the Safe List based on the provided `phone_number` parameter. Provide phone numbers in [E.164 format][].

If you attempt to add a number that exists in the Safe List, the API returns a HTTP 400 status with [Error Code 60411][]. Phone numbers remain in the Safe List until explicitly removed.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateSafelistRequest","required":["PhoneNumber"],"properties":{"PhoneNumber":{"type":"string","description":"The phone number to be added in SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","x-twilio":{"pii":{"handling":"standard","deleteSla":0}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"PhoneNumber\": \"+18001234567\"\n}","meta":"","code":"{\n  \"PhoneNumber\": \"+18001234567\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+18001234567\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Add a Phone Number to the Safe List

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSafelist() {
  const safelist = await client.verify.v2.safelist.create({
    phoneNumber: "+18001234567",
  });

  console.log(safelist.sid);
}

createSafelist();
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

safelist = client.verify.v2.safelist.create(phone_number="+18001234567")

print(safelist.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var safelist = await SafelistResource.CreateAsync(phoneNumber: "+18001234567");

        Console.WriteLine(safelist.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Safelist;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Safelist safelist = Safelist.creator("+18001234567").create();

        System.out.println(safelist.getSid());
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

	params := &verify.CreateSafelistParams{}
	params.SetPhoneNumber("+18001234567")

	resp, err := client.VerifyV2.CreateSafelist(params)
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

$safelist = $twilio->verify->v2->safelist->create(
    "+18001234567" // PhoneNumber
);

print $safelist->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

safelist = @client
           .verify
           .v2
           .safelist
           .create(phone_number: '+18001234567')

puts safelist.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:safe-list:numbers:create \
   --phone-number +18001234567
```

```bash
curl -X POST "https://verify.twilio.com/v2/SafeList/Numbers" \
--data-urlencode "PhoneNumber=+18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234567",
  "url": "https://verify.twilio.com/v2/SafeList/Numbers/+18001234567"
}
```

## Check a Phone Number

`GET https://verify.twilio.com/v2/SafeList/Numbers/{PhoneNumber}`

Checks if the provided `phone_number` parameter value exists in the Safe List. Provide phone numbers in [E.164 format][].

If the provided phone number isn't in the Safe List, the API returns a HTTP 404 status.

### Path parameters

```json
[{"name":"PhoneNumber","in":"path","description":"The phone number to be fetched from SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":0}},"required":true}]
```

Check if a Phone Number is in the Safe List

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchSafelist() {
  const safelist = await client.verify.v2.safelist("+18001234567").fetch();

  console.log(safelist.sid);
}

fetchSafelist();
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

safelist = client.verify.v2.safelist("+18001234567").fetch()

print(safelist.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var safelist = await SafelistResource.FetchAsync(pathPhoneNumber: "+18001234567");

        Console.WriteLine(safelist.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Safelist;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Safelist safelist = Safelist.fetcher("+18001234567").fetch();

        System.out.println(safelist.getSid());
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

	resp, err := client.VerifyV2.FetchSafelist("+18001234567")
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

$safelist = $twilio->verify->v2->safelist("+18001234567")->fetch();

print $safelist->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

safelist = @client
           .verify
           .v2
           .safelist('+18001234567')
           .fetch

puts safelist.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:safe-list:numbers:fetch \
   --phone-number +18001234567
```

```bash
curl -X GET "https://verify.twilio.com/v2/SafeList/Numbers/%2B18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+18001234567",
  "url": "https://verify.twilio.com/v2/SafeList/Numbers/+18001234567"
}
```

## Remove a Phone Number

`DELETE https://verify.twilio.com/v2/SafeList/Numbers/{PhoneNumber}`

Removes the provided `phone_number` parameter value exists in the Safe List. Provide phone numbers in [E.164 format][].

If the provided phone number isn't in the Safe List, the API returns a HTTP 404 status.

### Path parameters

```json
[{"name":"PhoneNumber","in":"path","description":"The phone number to be removed from SafeList. Phone numbers must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":0}},"required":true}]
```

Remove a Phone Number from the Safe List

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteSafelist() {
  await client.verify.v2.safelist("+18001234567").remove();
}

deleteSafelist();
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

client.verify.v2.safelist("+18001234567").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await SafelistResource.DeleteAsync(pathPhoneNumber: "+18001234567");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.Safelist;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Safelist.deleter("+18001234567").delete();
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

	err := client.VerifyV2.DeleteSafelist("+18001234567")
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

$twilio->verify->v2->safelist("+18001234567")->delete();
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
  .safelist('+18001234567')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:safe-list:numbers:remove \
   --phone-number +18001234567
```

```bash
curl -X DELETE "https://verify.twilio.com/v2/SafeList/Numbers/%2B18001234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

[contact sales]: https://www.twilio.com/en-us/help/sales

[E.164 format]: /docs/glossary/what-e164

[Error Code 60411]: /docs/api/errors/60411

[Fraud Guard]: /docs/verify/preventing-toll-fraud/sms-fraud-guard

[Add a Phone Number]: #add-a-phone-number

[Check a Phone Number]: #check-a-phone-number

[Remove a Phone Number]: #remove-a-phone-number

[Geo permissions]: /docs/verify/preventing-toll-fraud/verify-geo-permissions

[Verify Logs Blocked Verifications]: https://console.twilio.com/us1/monitor/logs/verify-fraud-logs

[Viewing Logs With Twilio Console]: /docs/verify/viewing-logs-with-twilio-console

[cap-conv]: https://en.wikipedia.org/wiki/Naming_convention_\(programming\)#Language-specific_conventions
