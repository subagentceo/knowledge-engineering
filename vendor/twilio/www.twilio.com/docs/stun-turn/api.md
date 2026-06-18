# REST API: Network Traversal Service Tokens

Network Traversal Service Tokens are ephemeral credentials that let you access
TURN resources from WebRTC and VoIP clients. They are a secure way to create
communication sessions with web browsers or mobile apps without exposing
credentials in a client-side environment. All tokens have a limited lifetime to
protect you from abuse. The lifetime is configurable up to 24 hours (which is
also the default value) but you should make it as short as possible for your
application.

## Token List Resource \[#list]

### Resource URI \[#list-uri]

```bash
/2010-04-01/Accounts/{AccountSid}/Tokens

```

### Resource Properties \[#instance-properties]

A Token instance resource has the following properties

| Property    | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| Username    | The temporary username that uniquely identifies a Token.                                                      |
| Password    | The temporary password that the username will use when authenticating with Twilio.                            |
| Ttl         | The duration in seconds for which the username and password are valid, the default value is 86,400 (24 hours) |
| AccountSid  | The unique id of the [Account][2] that created this Token.                                                    |
| IceServers  | An array representing the ephemeral credentials and the STUN and TURN server URIs.                            |
| DateCreated | The date that this resource was created, given in [RFC 2822][1] format.                                       |
| DateUpdated | The date that this resource was last updated, given in [RFC 2822][1] format.                                  |

### HTTP GET \[#list-get]

Not Supported

### HTTP POST \[#list-post]

You can create a new Token resource by `POST`ing to the Tokens list resource.
Since the purpose of tokens is to provide short-lived credentials, usernames
and passwords are always auto-generated and not intended to be stored long term.

#### Optional Parameters \[#post-parameters-optional]

You may `POST` the following parameters:

| Parameter | Description                                                                                                   |
| :-------- | :------------------------------------------------------------------------------------------------------------ |
| Ttl       | The duration in seconds for which the generated credentials are valid, the default value is 86400 (24 hours). |

#### Examples \[#list-post-examples]

Create a Token Resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createToken() {
  const token = await client.tokens.create();

  console.log(token.accountSid);
}

createToken();
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

token = client.tokens.create()

print(token.account_sid)
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

        var token = await TokenResource.CreateAsync();

        Console.WriteLine(token.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Token;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Token token = Token.creator().create();

        System.out.println(token.getAccountSid());
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

	params := &api.CreateTokenParams{}

	resp, err := client.Api.CreateToken(params)
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

$token = $twilio->tokens->create();

print $token->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

token = @client
        .api
        .v2010
        .tokens
        .create

puts token.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:tokens:create
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Tokens.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
  "ice_servers": [
    {
      "urls": "stun:global.stun.twilio.com:3478"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:3478?transport=udp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:3478?transport=tcp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:443?transport=tcp"
    }
  ],
  "date_updated": "Fri, 01 May 2020 01:42:57 +0000",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "ttl": "86400",
  "date_created": "Fri, 01 May 2020 01:42:57 +0000",
  "password": "tE2DajzSJwnsSbc123"
}
```

Create Token Resource during 1 hour

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createToken() {
  const token = await client.tokens.create({ ttl: 3600 });

  console.log(token.accountSid);
}

createToken();
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

token = client.tokens.create(ttl=3600)

print(token.account_sid)
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

        var token = await TokenResource.CreateAsync(ttl: 3600);

        Console.WriteLine(token.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Token;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Token token = Token.creator().setTtl(3600).create();

        System.out.println(token.getAccountSid());
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

	params := &api.CreateTokenParams{}
	params.SetTtl(3600)

	resp, err := client.Api.CreateToken(params)
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

$token = $twilio->tokens->create(["ttl" => 3600]);

print $token->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

token = @client
        .api
        .v2010
        .tokens
        .create(ttl: 3600)

puts token.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:tokens:create \
   --ttl 3600
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Tokens.json" \
--data-urlencode "Ttl=3600" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
  "ice_servers": [
    {
      "urls": "stun:global.stun.twilio.com:3478"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:3478?transport=udp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:3478?transport=tcp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:global.turn.twilio.com:443?transport=tcp"
    }
  ],
  "date_updated": "Fri, 01 May 2020 01:42:57 +0000",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "ttl": 3600,
  "date_created": "Fri, 01 May 2020 01:42:57 +0000",
  "password": "tE2DajzSJwnsSbc123"
}
```

### HTTP PUT \[#list-put]

Not Supported.

### HTTP DELETE \[#list-delete]

Not Supported.

## Global Low Latency (GLL) and Region Pinning \[#list]

The Network Traversal Service API provides Credentials and URIs that allow access to Twilio STUN and TURN servers. These URIs are global in nature. When your WebRTC client uses these URIs they will resolve to one of the [Twilio Regions][3] depending on which one has the lowest latency at the time of use. If you wish to pin all STUN or TURN requests to a specific Twilio region then the URIs returned in the Token need to be adjusted. Each URI begins with the prefix `global`. This prefix should to be replaced by the Twilio region/edge location name that you wish to pin to, e.g. `frankfurt` for the Twilio region/edge in Germany.

Below is an example of the `IceServers` array that is pinned to the `frankfurt` region/edge.

```js
  "ice_servers": [
    {
      "urls": "stun:frankfurt.stun.twilio.com:3478"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:frankfurt.turn.twilio.com:3478?transport=udp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:frankfurt.turn.twilio.com:3478?transport=tcp"
    },
    {
      "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      "credential": "tE2DajzSJwnsSbc123",
      "urls": "turn:frankfurt.turn.twilio.com:443?transport=tcp"
    }
  ],
```

[1]: https://www.ietf.org/rfc/rfc2822.txt

[2]: /docs/iam/api/account

[3]: /docs/stun-turn/regions
