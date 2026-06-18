# Proxy Quickstart

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

With just a few lines of code, you can have a text and/or voice conversations between two cloaked participants.

In this Quickstart, you will learn how to:

1. Purchase a Twilio phone number
2. Gather your account information
3. Set up your development environment
4. Create a Proxy service
5. Add a phone number to your service
6. Create a session
7. Create participants
8. Send a text message
9. Make a voice call

To test this quickstart, make sure you have two phone numbers you wish to connect ready to go (perhaps two cell phones?).

## Purchase a Twilio phone number

The first thing you need in order to set up a proxied session is a Twilio-powered phone number. [You can grab one to use in the console here](/console/phone-numbers/search).

Make sure that it has **SMS** and/or **Voice** enabled for the purposes of this quickstart. Note that in many countries, numbers will only have either Voice or SMS capability; to test both features you will need both types in your number pool. US and Canadian numbers will have both capabilities.

!['Buy a number' page in Twilio\&#x27;s Phone Numbers console. In the top right, Voice and SMS capabilities are both selected.](https://docs-resources.prod.twilio.com/ad3fda6ec48e6c6a3ad781a1511d67a47253a7e17aa3944b90e6b81a9f49d94b.png)

You'll want at least two phone numbers in your Proxy pool.

Once you buy your preferred numbers, make a note of the Twilio string identifier (SID) of the number. You'll need it for this quickstart.

## Gather your account information

You can find these in the [Twilio Console](https://www.twilio.com/console).

* **Account SID** - Used to authenticate REST API requests
* **Auth Token** - Used to authenticate REST API requests

![The 'Account Info' section in the Twilio Console includes the Account SID and Auth Token with icons to copy values.](https://docs-resources.prod.twilio.com/6fbd6f2b02c68bac4653ede5c6cf018fef8270aa01bd36857ccc836b43124113.png)

For all of our code snippets and curl examples, you will need to authenticate with the **Account SID** and **Auth Token**.

## Set up your development environment

The next steps will involve writing some code. We've provided examples in multiple languages, but you will need a working development environment in at least one of them. Here are some guides we've written to help you get your Twilio development environment up and running:

* [C# / .NET](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment)
* [Java](/docs/usage/tutorials/how-to-set-up-your-java-development-environment)
* [Node.js](/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment)
* [PHP](/docs/usage/tutorials/how-to-set-up-your-php-development-environment)
* [Python](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment)
* [Ruby](/docs/usage/tutorials/how-to-set-up-your-ruby-and-sinatra-development-environment)

We also provide examples for the [curl command](https://www.tutorialspoint.com/unix_commands/curl.htm) line which should work from a Linux or macOS terminal.

## Create a service

**Note:** You can also create Services via the [console for Proxy.](https://www.twilio.com/console/proxy)\
Let's create a service that will contain our sessions:

Create a Service

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
    uniqueName: "unique_name",
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

service = client.proxy.v1.services.create(unique_name="unique_name")

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

        var service = await ServiceResource.CreateAsync(uniqueName: "unique_name");

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
        Service service = Service.creator("unique_name").create();

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
	params.SetUniqueName("unique_name")

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
    "unique_name" // UniqueName
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
          .create(unique_name: 'unique_name')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:create \
   --unique-name unique_name
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services" \
--data-urlencode "UniqueName=unique_name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_instance_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "unique_name",
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

Take a note of the service SID (`KSxxxx`) that you get as a response.

## Add a phone number to your service

We need to associate the number(s) we bought with our newly created service. The phone numbers you add will be added to the anonymous number pool for your proxied communications.

Add a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .phoneNumbers.create({ sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" });

  console.log(phoneNumber.sid);
}

createPhoneNumber();
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

phone_number = client.proxy.v1.services(
    "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            sid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .create();

        System.out.println(phoneNumber.getSid());
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

	params := &proxy.CreatePhoneNumberParams{}
	params.SetSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.ProxyV1.CreatePhoneNumber("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$phone_number = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->phoneNumbers->create(["sid" => "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]);

print $phone_number->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .proxy
               .v1
               .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .phone_numbers
               .create(sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:phone-numbers:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PhoneNumbers" \
--data-urlencode "Sid=PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "phone_number": "+1987654321",
  "friendly_name": "Friendly Name",
  "iso_country": "US",
  "capabilities": {
    "sms_outbound": true,
    "voice_inbound": false
  },
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "is_reserved": false,
  "in_use": 0
}
```

This adds a single number to the Proxy pool. Repeat for each of your Twilio phone numbers

## Create a session

A session is a conversation between two people. This code will create a new session in your Proxy service.

Create a Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSession() {
  const session = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions.create({ uniqueName: "MyFirstSession" });

  console.log(session.sid);
}

createSession();
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

session = client.proxy.v1.services(
    "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).sessions.create(unique_name="MyFirstSession")

print(session.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var session = await SessionResource.CreateAsync(
            uniqueName: "MyFirstSession", pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(session.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Session session =
            Session.creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setUniqueName("MyFirstSession").create();

        System.out.println(session.getSid());
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

	params := &proxy.CreateSessionParams{}
	params.SetUniqueName("MyFirstSession")

	resp, err := client.ProxyV1.CreateSession("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$session = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->sessions->create(["uniqueName" => "MyFirstSession"]);

print $session->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

session = @client
          .proxy
          .v1
          .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .sessions
          .create(unique_name: 'MyFirstSession')

puts session.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --unique-name MyFirstSession
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Sessions" \
--data-urlencode "UniqueName=MyFirstSession" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "open",
  "unique_name": "MyFirstSession",
  "date_started": "2015-07-30T20:00:00Z",
  "date_ended": "2015-07-30T20:00:00Z",
  "date_last_interaction": "2015-07-30T20:00:00Z",
  "date_expiry": "2015-07-30T20:00:00Z",
  "ttl": 3600,
  "mode": "voice-and-message",
  "closed_reason": "",
  "sid": "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions",
    "participants": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
  }
}
```

Note the session SID (`KCxxxx`) from the response you get.

## Create participants

You can't have a good conversation without participants, so let's add some.

Create a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createParticipant() {
  const participant = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create({
      friendlyName: "Alice",
      identifier: "+15558675310",
    });

  console.log(participant.proxyIdentifier);
}

createParticipant();
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

participant = (
    client.proxy.v1.services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create(friendly_name="Alice", identifier="+15558675310")
)

print(participant.proxy_identifier)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.CreateAsync(
            friendlyName: "Alice",
            identifier: "+15558675310",
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSessionSid: "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(participant.ProxyIdentifier);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant =
            Participant
                .creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "+15558675310")
                .setFriendlyName("Alice")
                .create();

        System.out.println(participant.getProxyIdentifier());
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

	params := &proxy.CreateParticipantParams{}
	params.SetFriendlyName("Alice")
	params.SetIdentifier("+15558675310")

	resp, err := client.ProxyV1.CreateParticipant("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.ProxyIdentifier != nil {
			fmt.Println(*resp.ProxyIdentifier)
		} else {
			fmt.Println(resp.ProxyIdentifier)
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

$participant = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants->create(
        "+15558675310", // Identifier
        ["friendlyName" => "Alice"]
    );

print $participant->proxyIdentifier;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .proxy
              .v1
              .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .participants
              .create(
                friendly_name: 'Alice',
                identifier: '+15558675310'
              )

puts participant.proxy_identifier
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --session-sid KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name Alice \
   --identifier +15558675310
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Sessions/KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants" \
--data-urlencode "FriendlyName=Alice" \
--data-urlencode "Identifier=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identifier": "+15558675310",
  "proxy_identifier": "+14155559999",
  "proxy_identifier_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Alice",
  "date_deleted": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "message_interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions"
  }
}
```

Run it again with a second participant (a different phone number for another proxied user, and a different 'Friendly Name').

For each participant, you'll receive a response with the participant's assigned Proxy number, which will come from the pool of numbers you've added. Depending on the capabilities of the phone number, next either send a text message in the conversation or make a voice call.

## Send a text message

If your number has text messaging capabilities, you're ready to roll! If you're looking at a voice proxy, skip to the next section.

Let's send a message from one of the assigned Proxy numbers to one of the participants. Execute the following for one of the participants (the participant you'd like to receive this initial message):

Send a Message to a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessageInteraction() {
  const messageInteraction = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .messageInteractions.create({ body: "Reply to this message to chat!" });

  console.log(messageInteraction.sid);
}

createMessageInteraction();
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

message_interaction = (
    client.proxy.v1.services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .message_interactions.create(body="Reply to this message to chat!")
)

print(message_interaction.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session.Participant;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messageInteraction = await MessageInteractionResource.CreateAsync(
            body: "Reply to this message to chat!",
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSessionSid: "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathParticipantSid: "KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(messageInteraction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.participant.MessageInteraction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        MessageInteraction messageInteraction = MessageInteraction
                                                    .creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                                        "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                                        "KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                                        "Reply to this message to chat!")
                                                    .create();

        System.out.println(messageInteraction.getSid());
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

	params := &proxy.CreateMessageInteractionParams{}
	params.SetBody("Reply to this message to chat!")

	resp, err := client.ProxyV1.CreateMessageInteraction("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$message_interaction = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants("KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->messageInteractions->create(["body" => "Reply to this message to chat!"]);

print $message_interaction->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message_interaction = @client
                      .proxy
                      .v1
                      .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .participants('KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .message_interactions
                      .create(body: 'Reply to this message to chat!')

puts message_interaction.sid
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:message-interactions:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --session-sid KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --participant-sid KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "Reply to this message to chat$EXCLAMATION_MARK"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Sessions/KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/MessageInteractions" \
--data-urlencode "Body=Reply to this message to chat$EXCLAMATION_MARK" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "data": "{\"body\":\"some message\"}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "participant_sid": "KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "inbound_participant_sid": null,
  "inbound_resource_sid": null,
  "inbound_resource_status": null,
  "inbound_resource_type": null,
  "inbound_resource_url": null,
  "outbound_participant_sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "outbound_resource_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "outbound_resource_status": "sent",
  "outbound_resource_type": "Message",
  "outbound_resource_url": null,
  "sid": "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "message",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions/KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

And with that, the Proxy text conversation can continue!

## Make a voice call

If your Twilio Phone Numbers are voice capable, you're now ready for a proxied voice conversation. Following the names from the previous steps, get Alice to make a call to *her* Proxy Identifier number. Twilio's Proxy service will then make a call from *Bob's* Proxy Number to his real number and connect the two calls.

Now you're talking anonymously!

> \[!WARNING]
>
> If voicemail is enabled for your real number, your outgoing voicemail message may reveal your real number to people who call your proxied number.
>
> Review your outgoing voicemail message to ensure that it does not include your real number. Remember that many default voicemail messages begin by stating the number that the person has reached.

You now know how to create text and/or voice conversations between two masked participants. To learn more about how Proxy works check out the [guide to Phone Number Management](/docs/proxy/understanding-phone-number-management) or dive into the [REST API reference](/docs/proxy/api).
