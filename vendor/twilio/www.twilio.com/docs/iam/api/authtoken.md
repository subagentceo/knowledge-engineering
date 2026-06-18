# REST API: Auth Token

> \[!WARNING]
>
> If you are using [Services](/docs/serverless/functions-assets/functions/create-service) or [Functions(Classic)](/docs/serverless/functions-assets/functions/migrating-functionsclassic-new-functions-editor) and have included your auth token directly instead of using a variable, you must wait for 1 minute for the update of your auth token to propagate. Otherwise, those functions and services will fail with a `403 Forbidden` error.

Twilio uses the Account SID and Auth Token to authenticate API requests. You can rotate the Auth Token in the [Twilio Console](https://help.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) or by using this API. Two related endpoints help you manage Auth Tokens: use the [Secondary Auth Token endpoint](/docs/iam/api/secondary_authtoken) to create or delete a secondary token, and use this endpoint to promote the secondary token.

## Auth Token properties

<OperationTable type="properties" data={{"type":"object","refName":"accounts.v1.auth_token_promotion","modelName":"accounts_v1_auth_token_promotion","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the secondary Auth Token was created for."},"auth_token":{"type":"string","nullable":true,"description":"The promoted Auth Token that must be used to authenticate future API requests.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":0}}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in UTC when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The URI for this resource, relative to `https://accounts.twilio.com`"}}}} />

## Update an AuthTokenPromotion resource

`POST https://accounts.twilio.com/v1/AuthTokens/Promote`

This action deletes the current primary Auth Token and promotes the secondary Auth Token to primary.

Promote the Secondary Auth Token

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAuthTokenPromotion() {
  const authTokenPromotion = await client.accounts.v1
    .authTokenPromotion()
    .update();

  console.log(authTokenPromotion.accountSid);
}

updateAuthTokenPromotion();
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

auth_token_promotion = client.accounts.v1.auth_token_promotion().update()

print(auth_token_promotion.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Accounts.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var authTokenPromotion = await AuthTokenPromotionResource.UpdateAsync();

        Console.WriteLine(authTokenPromotion.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.accounts.v1.AuthTokenPromotion;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        AuthTokenPromotion authTokenPromotion = AuthTokenPromotion.updater().update();

        System.out.println(authTokenPromotion.getAccountSid());
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

	resp, err := client.AccountsV1.UpdateAuthTokenPromotion()
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

$auth_token_promotion = $twilio->accounts->v1->authTokenPromotion()->update();

print $auth_token_promotion->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

auth_token_promotion = @client
                       .accounts
                       .v1
                       .auth_token_promotion
                       .update()

puts auth_token_promotion.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:accounts:v1:auth-tokens:promote:update
```

```bash
curl -X POST "https://accounts.twilio.com/v1/AuthTokens/Promote" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "auth_token": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "url": "https://accounts.twilio.com/v1/AuthTokens/Promote"
}
```
