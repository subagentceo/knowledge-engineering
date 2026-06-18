# Twilio API requests

Learn how to authenticate your requests, what content type to use for API requests, and how the Twilio APIs handle webhooks. You'll also see examples of how to make requests to the Twilio APIs.

## Ways to make requests to the Twilio APIs

There are several ways you can make an HTTP request to the Twilio API.

* Make a raw HTTP request either in your code (for example, by using a module like [got in NodeJS](https://www.npmjs.com/package/got)) or with a tool like [Postman](https://www.postman.com/).
* Use a [Twilio SDK](/docs/libraries) for your preferred programming language.
* Use the [Twilio CLI](/docs/twilio-cli/general-usage) if you prefer working in the terminal.

## Authentication

> \[!NOTE]
>
> Always store your credentials in environment variables before sharing any code or deploying to production. Learn more about [setting environment variables](https://www.twilio.com/blog/how-to-set-environment-variables.html).

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). You can use the following credentials:

| Username    | Password       | Best practice                                                                                                                                            |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Key     | API Key Secret | This is the recommended way to authenticate with the Twilio APIs. When a key is compromised or no longer used, revoke it to prevent unauthorized access. |
| Account SID | AuthToken      | Limit your use to local testing.                                                                                                                         |

> \[!NOTE]
>
> Twilio API credentials are region-specific resources. If your account uses [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions), see [Manage Regional API credentials](/docs/global-infrastructure/manage-regional-api-credentials).

### Using API keys (recommended)

An API key is a unique identifier that allows a client to access your Twilio account and create, read, update, or delete resources through the Twilio APIs. You can create multiple API keys for different purposes, such as for different developers or subsystems within your application. If a key is compromised or no longer used, you can revoke it to prevent unauthorized access.

Twilio recommends using only API keys for production applications. If a bad actor gains access to your Account SID and Auth Token, then your Twilio Account is compromised.

You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type   | Access permissions                                                                                                                                                                                                                                 | Create in Console | Create with REST API |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| Main       | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests.                                                                                                                                     | Yes               | No                   |
| Standard   | Access to all Twilio API resources, except for Accounts ([`/Accounts`](/docs/iam/api-keys/keys-in-console)) or Keys ([`/Accounts/{SID}/Keys`](/docs/iam/api-keys/key-resource-v2010), [`/v1/Keys`](/docs/iam/api-keys/key-resource-v1)) resources. | Yes               | Yes                  |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about [Restricted API keys](/docs/iam/api-keys/restricted-api-keys).                                                                                                  | Yes               | Yes (**v1 only**)    |

When making an API request, use your API key as the username and your API key secret as the password.

**Note**: In the following example, you must use a `Main` API key.

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
  -u $YOUR_API_KEY:$YOUR_API_KEY_SECRET
```

The user remains logged in for the duration of the request. Learn more about [how Twilio handles authentication](/docs/usage/security).

### Using your Account SID and Auth Token

For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console), under the **Account Dashboard**.

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
  -u $YOUR_ACCOUNT_SID:$YOUR_AUTH_TOKEN
```

### Twilio SDKs

A Twilio SDK is a [server-side SDK](/docs/libraries) that helps you use Twilio's REST APIs, generate TwiML, and perform other common server-side programming tasks.

Twilio SDKs can handle credential management and simplify the authentication process. All Twilio SDKs come with a `Utilities` class that validates requests by passing your credentials to the library.

## HTTP methods for API interactions

Twilio APIs use standard RESTful HTTP methods to perform actions on resources. The following examples demonstrate the most common methods:

* `POST`: Create or update a resource.
* `GET`: Retrieve a resource.
* `DELETE`: Delete a resource.

## POST

POST a new SMS message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid: accountSid });

async function createMessage() {
  const message = await client.messages.create({
    body: "Hello",
    from: "+14155552344",
    to: "+15558675310",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = os.environ["TWILIO_API_KEY"]
api_secret = os.environ["TWILIO_API_SECRET"]
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
client = Client(api_key, api_secret, account_sid)

message = client.messages.create(
    to="+15558675310", body="Hello", from_="+14155552344"
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID at twilio.com/console
        // Provision API Keys at twilio.com/console/runtime/api-keys
        // and set the environment variables. See http://twil.io/secure
        // For local testing, you can use your Account SID and Auth token
        string apiKey = Environment.GetEnvironmentVariable("TWILIO_API_KEY");
        string apiSecret = Environment.GetEnvironmentVariable("TWILIO_API_SECRET");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(apiKey, apiSecret, accountSid);

        var message = await MessageResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            body: "Hello",
            from: new Twilio.Types.PhoneNumber("+14155552344"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID at twilio.com/console
    // Provision API Keys at twilio.com/console/runtime/api-keys
    // and set the environment variables. See http://twil.io/secure
    // For local testing, you can use your Account SID and Auth token
    public static final String API_KEY = System.getenv("TWILIO_API_KEY");
    public static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(API_KEY, API_SECRET, ACCOUNT_SID);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15558675310"),
                                  new com.twilio.type.PhoneNumber("+14155552344"),
                                  "Hello")
                              .create();

        System.out.println(message.getBody());
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
	// Find your Account SID at twilio.com/console
	// Provision API Keys at twilio.com/console/runtime/api-keys
	// and set the environment variables. See http://twil.io/secure
	// For local testing, you can use your Account SID and Auth token
	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	apiKey := os.Getenv("TWILIO_API_KEY")
	apiSecret := os.Getenv("TWILIO_API_SECRET")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username:   apiKey,
		Password:   apiSecret,
		AccountSid: accountSid,
	})

	params := &api.CreateMessageParams{}
	params.SetTo("+15558675310")
	params.SetBody("Hello")
	params.SetFrom("+14155552344")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
$apiKey = getenv("TWILIO_API_KEY");
$apiSecret = getenv("TWILIO_API_SECRET");
$sid = getenv("TWILIO_ACCOUNT_SID");
$twilio = new Client($apiKey, $apiSecret, $sid);

$message = $twilio->messages->create(
    "+15558675310", // To
    [
        "body" => "Hello",
        "from" => "+14155552344",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = ENV['TWILIO_API_KEY']
api_secret = ENV['TWILIO_API_SECRET']
account_sid = ENV['TWILIO_ACCOUNT_SID']
@client = Twilio::REST::Client.new(api_key, api_secret, account_sid)

message = @client
          .api
          .v2010
          .messages
          .create(
            to: '+15558675310',
            body: 'Hello',
            from: '+14155552344'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to +15558675310 \
   --body Hello \
   --from +14155552344
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=+15558675310" \
--data-urlencode "Body=Hello" \
--data-urlencode "From=+14155552344" \
-u $TWILIO_API_KEY:$TWILIO_API_SECRET
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552344",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## GET: List messages

GET a list of message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid: accountSid });

async function listMessage() {
  const messages = await client.messages.list({ limit: 20 });

  messages.forEach((m) => console.log(m.end));
}

listMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = os.environ["TWILIO_API_KEY"]
api_secret = os.environ["TWILIO_API_SECRET"]
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
client = Client(api_key, api_secret, account_sid)

messages = client.messages.list(limit=20)

for record in messages:
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
        // Find your Account SID at twilio.com/console
        // Provision API Keys at twilio.com/console/runtime/api-keys
        // and set the environment variables. See http://twil.io/secure
        // For local testing, you can use your Account SID and Auth token
        string apiKey = Environment.GetEnvironmentVariable("TWILIO_API_KEY");
        string apiSecret = Environment.GetEnvironmentVariable("TWILIO_API_SECRET");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(apiKey, apiSecret, accountSid);

        var messages = await MessageResource.ReadAsync(limit: 20);

        foreach (var record in messages) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID at twilio.com/console
    // Provision API Keys at twilio.com/console/runtime/api-keys
    // and set the environment variables. See http://twil.io/secure
    // For local testing, you can use your Account SID and Auth token
    public static final String API_KEY = System.getenv("TWILIO_API_KEY");
    public static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(API_KEY, API_SECRET, ACCOUNT_SID);
        ResourceSet<Message> messages = Message.reader().limit(20).read();

        for (Message record : messages) {
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
	// Find your Account SID at twilio.com/console
	// Provision API Keys at twilio.com/console/runtime/api-keys
	// and set the environment variables. See http://twil.io/secure
	// For local testing, you can use your Account SID and Auth token
	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	apiKey := os.Getenv("TWILIO_API_KEY")
	apiSecret := os.Getenv("TWILIO_API_SECRET")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username:   apiKey,
		Password:   apiSecret,
		AccountSid: accountSid,
	})

	params := &api.ListMessageParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListMessage(params)
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

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
$apiKey = getenv("TWILIO_API_KEY");
$apiSecret = getenv("TWILIO_API_SECRET");
$sid = getenv("TWILIO_ACCOUNT_SID");
$twilio = new Client($apiKey, $apiSecret, $sid);

$messages = $twilio->messages->read([], 20);

foreach ($messages as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = ENV['TWILIO_API_KEY']
api_secret = ENV['TWILIO_API_SECRET']
account_sid = ENV['TWILIO_ACCOUNT_SID']
@client = Twilio::REST::Client.new(api_key, api_secret, account_sid)

messages = @client
           .api
           .v2010
           .messages
           .list(limit: 20)

messages.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json?PageSize=20" \
-u $TWILIO_API_KEY:$TWILIO_API_SECRET
```

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

## GET: Retrieve a message

GET a specific message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid: accountSid });

async function fetchMessage() {
  const message = await client
    .messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(message.body);
}

fetchMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = os.environ["TWILIO_API_KEY"]
api_secret = os.environ["TWILIO_API_SECRET"]
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
client = Client(api_key, api_secret, account_sid)

message = client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID at twilio.com/console
        // Provision API Keys at twilio.com/console/runtime/api-keys
        // and set the environment variables. See http://twil.io/secure
        // For local testing, you can use your Account SID and Auth token
        string apiKey = Environment.GetEnvironmentVariable("TWILIO_API_KEY");
        string apiSecret = Environment.GetEnvironmentVariable("TWILIO_API_SECRET");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(apiKey, apiSecret, accountSid);

        var message =
            await MessageResource.FetchAsync(pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID at twilio.com/console
    // Provision API Keys at twilio.com/console/runtime/api-keys
    // and set the environment variables. See http://twil.io/secure
    // For local testing, you can use your Account SID and Auth token
    public static final String API_KEY = System.getenv("TWILIO_API_KEY");
    public static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(API_KEY, API_SECRET, ACCOUNT_SID);
        Message message = Message.fetcher("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(message.getBody());
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
	// Find your Account SID at twilio.com/console
	// Provision API Keys at twilio.com/console/runtime/api-keys
	// and set the environment variables. See http://twil.io/secure
	// For local testing, you can use your Account SID and Auth token
	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	apiKey := os.Getenv("TWILIO_API_KEY")
	apiSecret := os.Getenv("TWILIO_API_SECRET")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username:   apiKey,
		Password:   apiSecret,
		AccountSid: accountSid,
	})

	params := &api.FetchMessageParams{}

	resp, err := client.Api.FetchMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
$apiKey = getenv("TWILIO_API_KEY");
$apiSecret = getenv("TWILIO_API_SECRET");
$sid = getenv("TWILIO_ACCOUNT_SID");
$twilio = new Client($apiKey, $apiSecret, $sid);

$message = $twilio->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->fetch();

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = ENV['TWILIO_API_KEY']
api_secret = ENV['TWILIO_API_SECRET']
account_sid = ENV['TWILIO_ACCOUNT_SID']
@client = Twilio::REST::Client.new(api_key, api_secret, account_sid)

message = @client
          .api
          .v2010
          .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:fetch \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_API_KEY:$TWILIO_API_SECRET
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "testing",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": "Fri, 24 May 2019 17:18:28 +0000",
  "date_updated": "Fri, 24 May 2019 17:18:28 +0000",
  "direction": "outbound-api",
  "error_code": 30007,
  "error_message": "Carrier violation",
  "from": "+12019235161",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": "-0.00750",
  "price_unit": "USD",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

## DELETE

DELETE a message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = twilio(apiKey, apiSecret, { accountSid: accountSid });

async function deleteMessage() {
  await client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = os.environ["TWILIO_API_KEY"]
api_secret = os.environ["TWILIO_API_SECRET"]
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
client = Client(api_key, api_secret, account_sid)

client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID at twilio.com/console
        // Provision API Keys at twilio.com/console/runtime/api-keys
        // and set the environment variables. See http://twil.io/secure
        // For local testing, you can use your Account SID and Auth token
        string apiKey = Environment.GetEnvironmentVariable("TWILIO_API_KEY");
        string apiSecret = Environment.GetEnvironmentVariable("TWILIO_API_SECRET");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(apiKey, apiSecret, accountSid);

        await MessageResource.DeleteAsync(pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID at twilio.com/console
    // Provision API Keys at twilio.com/console/runtime/api-keys
    // and set the environment variables. See http://twil.io/secure
    // For local testing, you can use your Account SID and Auth token
    public static final String API_KEY = System.getenv("TWILIO_API_KEY");
    public static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(API_KEY, API_SECRET, ACCOUNT_SID);
        Message.deleter("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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
	// Find your Account SID at twilio.com/console
	// Provision API Keys at twilio.com/console/runtime/api-keys
	// and set the environment variables. See http://twil.io/secure
	// For local testing, you can use your Account SID and Auth token
	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	apiKey := os.Getenv("TWILIO_API_KEY")
	apiSecret := os.Getenv("TWILIO_API_SECRET")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username:   apiKey,
		Password:   apiSecret,
		AccountSid: accountSid,
	})

	params := &api.DeleteMessageParams{}

	err := client.Api.DeleteMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

// Find your Account SID at twilio.com/console
// Provision API Keys at twilio.com/console/runtime/api-keys
// and set the environment variables. See http://twil.io/secure
// For local testing, you can use your Account SID and Auth token
$apiKey = getenv("TWILIO_API_KEY");
$apiSecret = getenv("TWILIO_API_SECRET");
$sid = getenv("TWILIO_ACCOUNT_SID");
$twilio = new Client($apiKey, $apiSecret, $sid);

$twilio->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID at twilio.com/console
# Provision API Keys at twilio.com/console/runtime/api-keys
# and set the environment variables. See http://twil.io/secure
# For local testing, you can use your Account SID and Auth token
api_key = ENV['TWILIO_API_KEY']
api_secret = ENV['TWILIO_API_SECRET']
account_sid = ENV['TWILIO_ACCOUNT_SID']
@client = Twilio::REST::Client.new(api_key, api_secret, account_sid)

@client
  .api
  .v2010
  .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:remove \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_API_KEY:$TWILIO_API_SECRET
```

## Content type requirements

Twilio APIs expect the API request content type to be `application/x-www-form-urlencoded` or `multipart/form-data`. Using an unsupported content type might cause unexpected behavior or errors.

## Global Edge Locations and network entry

Twilio global infrastructure allows you to optimize request routing for better performance. You can specify which Twilio network edge your API request uses to ingress Twilio network, and the processing region for your request. Learn more about [Edge Locations](/docs/global-infrastructure/understanding-edge-locations#inbound-connectivity).

## Vanity URLs and security requirements

Twilio has specific security requirements for accessing voice recording media files. Twilio doesn't support unauthenticated access to HTTP Voice recording media URLs using Canonical Name (CNAME) records. Use HTTPS endpoints and Transport-Layer-Security (TLS) protocols when accessing voice recordings media files from your account. For more information, see the [Changelog](https://www.twilio.com/en-us/changelog/upcoming-security-changes--http-voice-recording-media-endpoint-c).

## How the Twilio APIs handle webhooks

[Webhooks](/docs/glossary/what-is-a-webhook) are user-defined HTTP callbacks triggered by an event in a web application. Twilio uses webhooks to let your application know when events happen, like getting an incoming call or receiving an SMS message. Webhooks are triggered asynchronously.

When a webhook event occurs, Twilio makes an HTTP request, such as `POST` or `GET`, to the URL you configured for your webhook. Twilio's request to your application includes details of the event like the body of an incoming message or an incoming phone number. Your application can then process the event and reply to Twilio with a response containing the instructions you'd like Twilio to perform.

To handle a webhook when you use Twilio, you need to build a web application that can accept HTTP requests. Check out the [Twilio SDKs](/docs/libraries) to get up and running quickly.

## Next steps

After you understand how to make requests to Twilio APIs, explore these resources:

* [Twilio SDKs](/docs/libraries): Get started with server-side libraries.
* [API Key Management](/docs/iam/api-keys): Learn about creating and managing API keys.
* [Twilio CLI](/docs/twilio-cli/general-usage): Work with Twilio from your terminal.
* [Webhook Security](/docs/usage/security): Secure your webhook endpoints.
* [Global Infrastructure](/docs/global-infrastructure): Optimize performance with Edge Locations.
