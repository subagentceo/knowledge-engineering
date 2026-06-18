# Network Traversal Service

Twilio's Network Traversal Service is a globally distributed STUN/TURN service that helps you deploy more reliable WebRTC applications.

You can use this service in your WebRTC and VoIP applications for traversal and relay around NAT/firewalls, so that your users make a successful connection every time.

If you're new to STUN/TURN and ICE, check out the [Frequently Asked Questions][1]. If you want to start using Twilio's Network Traversal Service immediately, here's what you need to do.

## Using Network Traversal Service in a WebRTC application \[#list-post-example]

Using Network Traversal Service in a WebRTC application is as easy as requesting a token and passing it to your RTCPeerConnection constructor.

First, make a request from your web server to retrieve a [Network Traversal Service Token][2] and then pass it to your WebRTC application.

> \[!WARNING]
>
> You'll need to use your Twilio Account SID and Auth Token to get a Network Traversal Service Token. To keep your Twilio account credentials safe, you should only make this request from your server, not the client browser.

Generate NTS Token

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

Next, include the `ice_servers` property in the RTCConfiguration object you pass to the RTCPeerConnection constructor when setting up a call, as shown below. Here, `ICE_SERVERS` contains the contents of the `ice_servers` property returned in the response above:

```js
// Here's an example in javaScript
myIceServers = ICE_SERVERS;
var configuration = { iceServers: myIceServers };
var pc = new RTCPeerConnection(configuration);
```

From this point, exchange SDP (Session Description Protocol) offer/answers as you normally would.

Well done! You've now used Network Traversal Service to set up a connection.

If the browser you're using supports [Trickle ICE](https://datatracker.ietf.org/doc/html/draft-ietf-ice-trickle-16), you'll also want to handle the RTCPeerConnection's `onIceCandidate` event to pass any new ICE candidates to the connected peer:

```js
// Here's an example in javaScript
pc.onicecandidate = function (evt) {
  if (evt.candidate) {
    // Send the candidate to the other party via your signaling channel
  }
};
```

If you need more help, check out the [FAQ][1]. You can also contact Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com).

## Using Network Traversal Service with the Twilio Programmable Voice SDKs \[#voice-sdk]

The Programmable Voice SDKs allow you to add voice-over-IP (VoIP) calling directly into your web and native mobile applications. The Programmable Voice SDKs build on top of WebRTC and can leverage STUN and TURN to traverse restrictive networks. For a complete description of how to use the Network Traversal Service tokens with Programmable Voice SDKs, refer to the [Programmable Voice SDK network connectivity requirements](/docs/voice/sdks/network-connectivity-requirements#use-twilios-network-traversal-service-nts-for-turn).

## Using Network Traversal Service in a VoIP client \[#voip-client]

> \[!WARNING]
>
> In order to use Network Traversal Service in a VoIP client, you'll need to be able to make an HTTP request from your VoIP client or another application at least once every 24 hours to retrieve a new ephemeral token.

To use Network Traversal Service with a VoIP Client, follow these steps:

1. Retrieve a Network Traversal Service Token.
2. Extract the STUN and TURN URLs from the returned data, along with the username and credential values.
3. Configure your VoIP client with these values.

[Network Traversal Service Tokens][1] are good for up to one day, and that's their default value. You can lower the token expiration period by setting the `Ttl` parameter when you request the token. Find out more in the [Network Traversal Service Token documentation][2].

[1]: /docs/stun-turn/faq

[2]: /docs/stun-turn/api
