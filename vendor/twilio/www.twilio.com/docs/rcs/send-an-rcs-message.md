# Send and receive RCS messages

On this page, you'll learn how to send RCS messages. All RCS messages are branded and originate from a verified sender by default.

For information about RCS features, see [RCS Business Messaging](/docs/rcs).

## Complete the prerequisites

Before you send an RCS message, [complete the RCS setup](/docs/rcs/onboarding).

## Send an RCS message with automatic fallback to SMS or MMS

You can send RCS messages using code that makes `HTTP POST` requests to the [Message resource](/docs/messaging/api/message-resource) in the Twilio REST API.

When an RCS sender is in a Messaging Service's Sender Pool, Programmable Messaging defaults to RCS as the first-attempt channel. Programmable Messaging proactively checks whether the recipient's device supports RCS. Messages that can't be delivered over RCS automatically fall back to SMS or MMS, using other senders in the Messaging Service's Sender Pool.

To send an RCS message, follow the steps to [send an SMS message](/docs/messaging/tutorials/how-to-send-sms-messages#send-an-sms-message). Set the `MessagingServiceSid` or `From` field to the Messaging Service SID assigned to the RCS Sender. To find a Messaging Service's SID, check the **Sid** column on the Messaging Services page in the Twilio Console ([Console](https://1console.twilio.com/us1/develop/sms/services) | [Legacy Console](https://console.twilio.com/us1/develop/sms/services)).

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "My first RCS message. Hello, world.",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world.",
    to="+155XXXXXXXX",
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
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "My first RCS message. Hello, world.",
            to: new Twilio.Types.PhoneNumber("+155XXXXXXXX"));

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
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+155XXXXXXXX"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "My first RCS message. Hello, world.")
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("My first RCS message. Hello, world.")
	params.SetTo("+155XXXXXXXX")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+155XXXXXXXX", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "My first RCS message. Hello, world.",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'My first RCS message. Hello, world.',
            to: '+155XXXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "My first RCS message. Hello, world." \
   --to +155XXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=My first RCS message. Hello, world." \
--data-urlencode "To=+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Specify a fallback SMS or MMS sender

You can specify which SMS or MMS sender to use during fallback in two ways:

1. Add a single SMS or MMS capable sender to the Messaging Service's sender pool. That sender is used for fallback automatically.
2. Specify the fallback sender using the `FallbackFrom` parameter. You can specify any phone number in the same Account SID as the Messaging Service, even if it's not in the sender pool. The `FallbackFrom` parameter only works when sending through a Messaging Service.

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "An example message while specifying a fallback sender.",
    fallbackFrom: "+18005550199",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+18005550100",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="An example message while specifying a fallback sender.",
    to="+18005550100",
    fallback_from="+18005550199",
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
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "An example message while specifying a fallback sender.",
            to: new Twilio.Types.PhoneNumber("+18005550100"),
            fallbackFrom: new Twilio.Types.PhoneNumber("+18005550199"));

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
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+18005550100"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "An example message while specifying a fallback sender.")
                              .setFallbackFrom(new com.twilio.type.PhoneNumber("+18005550199"))
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("An example message while specifying a fallback sender.")
	params.SetTo("+18005550100")
	params.SetFallbackFrom("+18005550199")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+18005550100", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "An example message while specifying a fallback sender.",
        "fallbackFrom" => "+18005550199",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'An example message while specifying a fallback sender.',
            to: '+18005550100',
            fallback_from: '+18005550199'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "An example message while specifying a fallback sender." \
   --to +18005550100 \
   --fallback-from +18005550199
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=An example message while specifying a fallback sender." \
--data-urlencode "To=+18005550100" \
--data-urlencode "FallbackFrom=+18005550199" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Send an RCS message without automatic fallback to SMS or MMS

You can also send RCS messages without relying on Twilio's automatic fallback. You must implement your own fallback orchestration logic to retry failed RCS attempts on another channel.

### Use a Messaging Service

To turn off fallback when you send an RCS message through a Messaging Service, add the `rcs:` prefix to the recipient phone number in the `To` field.

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "My first RCS message. Hello, world.",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "rcs:+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world.",
    to="rcs:+155XXXXXXXX",
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
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "My first RCS message. Hello, world.",
            to: new Twilio.Types.PhoneNumber("rcs:+155XXXXXXXX"));

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
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("rcs:+155XXXXXXXX"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "My first RCS message. Hello, world.")
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("My first RCS message. Hello, world.")
	params.SetTo("rcs:+155XXXXXXXX")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "rcs:+155XXXXXXXX", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "My first RCS message. Hello, world.",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'My first RCS message. Hello, world.',
            to: 'rcs:+155XXXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "My first RCS message. Hello, world." \
   --to rcs:+155XXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=My first RCS message. Hello, world." \
--data-urlencode "To=rcs:+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Without a Messaging Service

To turn off fallback when you send an RCS message without using a Messaging Service, set the RCS Sender ID in the `From` field and the recipient phone number in the `To` field.

The RCS Sender ID appears on the **Settings** page for the RCS Sender in the Twilio Console ([Console](https://1console.twilio.com/us1/develop/rcs/senders) | [Legacy Console](https://console.twilio.com/us1/develop/rcs/senders)).

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "My first RCS message. Hello, world.",
    from: "rcs:brand_xyz123_agent",
    to: "rcs:+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    from_="rcs:brand_xyz123_agent",
    body="My first RCS message. Hello, world.",
    to="rcs:+155XXXXXXXX",
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
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("rcs:brand_xyz123_agent"),
            body: "My first RCS message. Hello, world.",
            to: new Twilio.Types.PhoneNumber("rcs:+155XXXXXXXX"));

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
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("rcs:+155XXXXXXXX"),
                                  new com.twilio.type.PhoneNumber("rcs:brand_xyz123_agent"),
                                  "My first RCS message. Hello, world.")
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetFrom("rcs:brand_xyz123_agent")
	params.SetBody("My first RCS message. Hello, world.")
	params.SetTo("rcs:+155XXXXXXXX")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "rcs:+155XXXXXXXX", // To
    [
        "from" => "rcs:brand_xyz123_agent",
        "body" => "My first RCS message. Hello, world.",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            from: 'rcs:brand_xyz123_agent',
            body: 'My first RCS message. Hello, world.',
            to: 'rcs:+155XXXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from rcs:brand_xyz123_agent \
   --body "My first RCS message. Hello, world." \
   --to rcs:+155XXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=rcs:brand_xyz123_agent" \
--data-urlencode "Body=My first RCS message. Hello, world." \
--data-urlencode "To=rcs:+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

For information on RCS error codes and using RCS without Twilio's automatic fallback, see [RCS Messaging Best Practices and FAQ](https://help.twilio.com/articles/29076535334043-RCS-Messaging-Best-Practices-and-FAQ).

### Send an RCS message that contains media

To send messages containing [RCS-supported media formats and sizes](/docs/messaging/guides/accepted-mime-types), include the media URL in the RCS API call as shown in the following example. Twilio fetches the media from the URL you provide.

The media URL must be publicly accessible. Twilio can't fetch media from hidden URLs or URLs that require authentication.

Twilio automatically attempts delivery over RCS. Unsupported media formats may fall back to MMS. Devices that aren't RCS-capable receive the message as MMS in [MMS-supported regions](https://help.twilio.com/articles/12557401622811), or as [Picture SMS](https://help.twilio.com/articles/360032795214-Getting-Started-with-MMS-Converter-) elsewhere.

Twilio supports combining text and media in a single request for image and video files. Twilio automatically packages the text and media as an RCS Rich Card for delivery, so you aren't billed for two separate messages. When you use a Rich Card, Twilio processes and bills text and media in a single RCS request.

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    mediaUrl: [
      "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    ],
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    media_url=[
        "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
    ],
    to="+155XXXXXXXX",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            mediaUrl: new List<Uri> { new Uri(
                "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg") },
            to: new Twilio.Types.PhoneNumber("+155XXXXXXXX"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.type.PhoneNumber;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message =
            Message
                .creator(new com.twilio.type.PhoneNumber("+155XXXXXXXX"),
                    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    Arrays.asList(URI.create("https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg")))
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetMediaUrl([]string{
		"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
	})
	params.SetTo("+155XXXXXXXX")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+155XXXXXXXX", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "mediaUrl" => [
            "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
        ],
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            media_url: [
              'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'
            ],
            to: '+155XXXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --media-url https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg \
   --to +155XXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "MediaUrl=https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg" \
--data-urlencode "To=+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Send an RCS message that contains rich content

> \[!IMPORTANT]
>
> If you're interested in sending rich content on RCS without using a Content Template, you can [request access](https://airtable.com/appqQFoQmQ9WDS1YW/pagDQFkMvNi7O28dN/form) to the private beta of the [Communications API](/docs/bulk-messaging).

You can create rich content using [Content Templates](/docs/content) and send that content through RCS. RCS supports the following rich content types:

|                    | **Rich content support**                     |
| ------------------ | -------------------------------------------- |
| **RCS Feature**    | **Content Type**                             |
| Rich Card          | [`twilio/card`](/docs/content/twiliocard)    |
| Chip List          | [`twilio/card`](/docs/content/twiliocard)    |
| Basic Text         | [`twilio/text`](/docs/content/twilio-text)   |
| Media              | [`twilio/media`](/docs/content/twilio-media) |
| Rich Card Carousel | [`twilio/carousel`](/docs/content/carousel)  |
| Webviews           | [`twilio/card`](/docs/content/twiliocard)    |

For devices that aren't RCS-capable, you can define customized fallback to SMS and MMS in applicable regions by defining multiple types in a Content Template.

To send rich content through RCS:

1. Define your rich content in the [API](/docs/content/create-and-send-your-first-content-api-template) or the [Twilio Console](/docs/content/create-templates-with-the-content-template-builder).
2. In the API response or in the Twilio Console, copy the unique Content SID starting with `HX` that identifies your rich content.
3. Add the `ContentSid` and content variables to the [Send an RCS message with automatic fallback to SMS or MMS](#send-an-rcs-message-with-automatic-fallback-to-sms-or-mms) code sample as shown in the following example.

   To learn more about content variables, see [Using Variables](/docs/content/create-templates-with-the-content-template-builder#using-variables).

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    contentSid: "HXXXXXXXXXXXXX",
    contentVariables: JSON.stringify({ 1: "Name" }),
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+1555XXXXXXX",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content_sid="HXXXXXXXXXXXXX",
    content_variables=json.dumps({"1": "Name"}),
    to="+1555XXXXXXX",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            contentSid: "HXXXXXXXXXXXXX",
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "1", "Name" } }, Formatting.Indented),
            to: new Twilio.Types.PhoneNumber("+1555XXXXXXX"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+1555XXXXXXX"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "HXXXXXXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "Name");
                                  }
                              }).toString())
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"encoding/json"
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

	ContentVariables, ContentVariablesError := json.Marshal(map[string]interface{}{
		"1": "Name",
	})

	if ContentVariablesError != nil {
		fmt.Println(ContentVariablesError)
		os.Exit(1)
	}

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetContentSid("HXXXXXXXXXXXXX")
	params.SetContentVariables(string(ContentVariables))
	params.SetTo("+1555XXXXXXX")

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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+1555XXXXXXX", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "contentSid" => "HXXXXXXXXXXXXX",
        "contentVariables" => json_encode([
            "1" => "Name",
        ]),
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            content_sid: 'HXXXXXXXXXXXXX',
            content_variables: {
                '1' => 'Name'
              }.to_json,
            to: '+1555XXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --content-sid HXXXXXXXXXXXXX \
   --content-variables {\"1\":\"Name\"} \
   --to +1555XXXXXXX
```

```bash
CONTENT_VARIABLES_OBJ=$(cat << EOF
{
  "1": "Name"
}
EOF
)
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "ContentSid=HXXXXXXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
--data-urlencode "To=+1555XXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Send an RCS typing indicator

Typing indicators tell RCS users that you are preparing a response, which can reduce perceived wait times. Use a typing indicator when your reply might take more than a few seconds to generate.

Twilio displays the typing indicator on the user's device until either the message is delivered or 20 seconds pass, whichever occurs first. You can send additional typing indicators if the response requires more time to generate.

To send an RCS typing indicator, make a `POST` request to the Typing Indicator API endpoint. The event parameter is optional.

```bash title="Request"
curl -X POST "https://messaging.twilio.com/v3/Indicators/Typing.json" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "RCS",
    "from": "rcs:agent_id",
    "to": "rcs:+18001234567",
    "event": "START"
  }'
```

```bash title="Response"
{
  "success": true
}
```

## Receive an RCS message

When users send messages to an RCS Sender, messages are shown on the Programmable Messaging Logs page in the Twilio Console ([Console](https://1console.twilio.com/us1/monitor/logs/sms) | [Legacy Console](https://console.twilio.com/us1/monitor/logs/sms)). You can also [configure a Messaging Service](/docs/messaging/services#incoming-message-handling) to send a webhook when it receives an incoming message.

## Let customers initiate a chat with an RCS Sender

Your customers can start a chat with an RCS Sender from a deep link URL. You can embed the URL as a button, link, or QR code in an email, app, or website. If users can't send or receive RCS messages, the fallback phone number handles the message.

**Deep link URL Format**

```text
sms:+1555XXXXXXX?service_id=brand_xyz123_agent%40rbm.goog&body=Hello%20World
```

| **Parameter**        | **Description**                 | **Necessity** |
| -------------------- | ------------------------------- | ------------- |
| `+1555XXXXXXX`       | Fallback number                 | Required      |
| `brand_xyz123_agent` | RCS Sender ID, excluding `rcs:` | Required      |
| `Hello%20World`      | URL-encoded pre-filled message  | Optional      |

The RCS Sender ID appears on the **Settings** page for the RCS Sender in the Twilio Console ([Console](https://1console.twilio.com/us1/develop/rcs/senders) | [Legacy Console](https://console.twilio.com/us1/develop/rcs/senders)).

You can also use the [Google SMS link creator](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/deeplinks#sms_link_creator) to generate the deep link and QR code.

## Monitor and analyze traffic for RCS messages that you send

After you send RCS messages, you can monitor and analyze your RCS traffic by using Programmable Messaging Logs in the Twilio Console ([Console](https://1console.twilio.com/us1/monitor/logs/sms) | [Legacy Console](https://console.twilio.com/us1/monitor/logs/sms)) and [Messaging Insights](/docs/messaging/features/messaging-insights). If you don't see a log for your message, you can view errors on the Error Logs page in the Twilio Console ([Console](https://1console.twilio.com/us1/monitor/logs/debugger/errors) | [Legacy Console](https://console.twilio.com/us1/monitor/logs/debugger/errors)).

If Twilio successfully delivers the message over RCS, the `From` field contains `rcs:<SenderId>`. You can view this field in the Programmable Messaging Logs in the Twilio Console ([Console](https://1console.twilio.com/us1/monitor/logs/sms) | [Legacy Console](https://console.twilio.com/us1/monitor/logs/sms)), [outbound message status callbacks](/docs/usage/webhooks/messaging-webhooks#outbound-message-status-callback), and [Fetch a Message resource](/docs/messaging/api/message-resource#fetch-a-message-resource) request results.

In many regions, RCS tracks `delivered` and `read` statuses more reliably than SMS does. If you need to A/B test the two channels, consider using other metrics, such as clicks or conversions.
