# REST API: Subaccounts

Subaccounts in Twilio are accounts owned by your main account. Using a subaccount, you can segment each of your customers'
use of Twilio and keep it separate from all the rest. This will allow you
to manage the activity and resources of each customer
independently.

> \[!WARNING]
>
> * A main account can only have up to 1000 subaccounts by default. If you need more subaccounts, [contact support](https://www.twilio.com/console/support/tickets/create).
> * By default, Twilio deletes closed subaccounts 30 days after closure.

## Billing \[#billing]

Twilio bills all subaccount usage directly to your main account. You'll
have one Twilio balance for all subaccounts. If your main Twilio
account is ever suspended, your subaccounts will also be
suspended.

Skip to [Calculate billing for subaccount usage](#billing-subaccounts)

## Authentication \[#authentication]

You can use your main account credentials (`AccountSid` and `AuthToken`) to access the Twilio REST API for your main account. You can also access v2010 API resources for any of your subaccounts. You may also use a subaccount's AccountSid and AuthToken to access the resources of that subaccount. You can't use a subaccount's credentials to access resources in your main Twilio account or any other subaccounts.

If you're authenticating with the SDKs, pass in your main Account SID and main Auth Token as the first two credentials. Pass the appropriate Subaccount SID as the third parameter.

> \[!CAUTION]
>
> When performing CRUD operations within a subaccount, use the **subaccount SID** and **auth token**. Alternatively, you can generate API Keys at the subaccount level for authentication.

> \[!WARNING]
>
> Main account API Keys are only available to access main account resources. Access to subaccount resources will be denied.

> \[!WARNING]
>
> Your main account credentials will allow you to access resources for any of your subaccounts that fall under the v2010 REST API. However, resources on subdomains, such as `studio.twilio.com` and `taskrouter.twilio.com`, must be accessed directly using subaccount credentials (API Keys or subaccount SID + subaccount auth token).
>
> There are many ways to determine if a resource lives on its own subdomain or under v2010. One example method is to find the API Reference page for the resource, such as the [Workspace resource](/docs/taskrouter/api/workspace). Observe the returned `URL` value in the example payloads. If the URL begins with `https://SOME-SUBDOMAIN.twilio.com`, then you *must* access that resource using subaccount-specific credentials. If you do the same for some other resource, such as the [Messaging resource](/docs/messaging/api/message-resource), and see that `URI` begins with `/2010-04-01`, then it can be safely accessed using either your main account or subaccount credentials.

## International \[#international]

We are working on ways to help our customers minimize the risk of fraudulent international calls and provide ways for Twilio subaccounts to dial certain international destinations.
If you have any questions, [contact support](/help/contact).

## Permissions \[#permissions]

Subaccounts use the main account's voice and SMS messaging permissions.

## Creating Subaccounts \[#creating-subaccounts]

To create a subaccount, make an HTTP `POST` request to your [Accounts list resource](/docs/iam/api/account#read-multiple-account-resources) URI:

```bash
/2010-04-01/Accounts

```

If successful, Twilio responds with a representation of the new Account resource.

### POST parameters \[#creating-subaccounts-post-parameters]

#### Optional parameters \[#creating-subaccounts-post-parameters-optional]

Include the following optional parameters in your request to create a subaccount:

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateAccountRequest","properties":{"FriendlyName":{"type":"string","description":"A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

The FriendlyName property is useful for organizing accounts and linking them
back to information in your system. For example, you may want to create
subaccounts where the FriendlyName is the primary key of the customer in your application's database.

#### Example

The following example shows how to create a subaccount with a friendly name:

Create a subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createAccount() {
  const account = await client.api.v2010.accounts.create({
    friendlyName: "Submarine",
  });

  console.log(account.authToken);
}

createAccount();
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

account = client.api.v2010.accounts.create(friendly_name="Submarine")

print(account.auth_token)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var account = await AccountResource.CreateAsync(friendlyName: "Submarine");

        Console.WriteLine(account.AuthToken);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Account account = Account.creator().setFriendlyName("Submarine").create();

        System.out.println(account.getAuthToken());
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

	params := &api.CreateAccountParams{}
	params.SetFriendlyName("Submarine")

	resp, err := client.Api.CreateAccount(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AuthToken != nil {
			fmt.Println(*resp.AuthToken)
		} else {
			fmt.Println(resp.AuthToken)
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

$account = $twilio->api->v2010->accounts->create([
    "friendlyName" => "Submarine",
]);

print $account->authToken;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

account = @client
          .api
          .v2010
          .accounts
          .create(friendly_name: 'Submarine')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:create \
   --friendly-name Submarine
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts.json" \
--data-urlencode "FriendlyName=Submarine" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "Submarine",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Get started with subaccounts

Subaccounts are a great way to segment your Twilio usage and act on behalf of your customers, agents, or employees.

If you're running a hosted service that relies on
Twilio you can create a Twilio subaccount for each customer that
signs up. Then if a customer closes their account with your
service, you can deactivate the associated Twilio subaccount.

Subaccounts allow you to use the Twilio REST API just as you would for a single account.
A subaccount can have its phone numbers and caller IDs, applications, and SIP Domains. You can manage a subaccount's calls, messages, recordings, and transcriptions without affecting other subaccounts.

## Finding subaccounts \[#listing-subaccounts]

You can query any particular subaccount and its related resources via the REST
API by AccountSid.

The following example shows how to return a subaccount resource by its account SID:

Return a subaccount resource by its account SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchAccount() {
  const account = await client.api.v2010
    .accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(account.authToken);
}

fetchAccount();
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

account = client.api.v2010.accounts(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(account.auth_token)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var account =
            await AccountResource.FetchAsync(pathSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(account.AuthToken);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Account account = Account.fetcher("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(account.getAuthToken());
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

	resp, err := client.Api.FetchAccount("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AuthToken != nil {
			fmt.Println(*resp.AuthToken)
		} else {
			fmt.Println(resp.AuthToken)
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

$account = $twilio->api->v2010
    ->accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $account->authToken;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

account = @client
          .api
          .v2010
          .accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .fetch

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:fetch \
   --sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

If you don't know the `AccountSid` of a subaccount but you know the `FriendlyName`,
you can query your Accounts list resource with a FriendlyName query string
filter.

The following example shows how to query subaccounts by friendly name:

Query subaccounts by friendly name

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAccount() {
  const accounts = await client.api.v2010.accounts.list({
    friendlyName: "MySubaccount",
    limit: 20,
  });

  accounts.forEach((a) => console.log(a.end));
}

listAccount();
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

accounts = client.api.v2010.accounts.list(
    friendly_name="MySubaccount", limit=20
)

for record in accounts:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var accounts = await AccountResource.ReadAsync(friendlyName: "MySubaccount", limit: 20);

        foreach (var record in accounts) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Account> accounts = Account.reader().setFriendlyName("MySubaccount").limit(20).read();

        for (Account record : accounts) {
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
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListAccountParams{}
	params.SetFriendlyName("MySubaccount")
	params.SetLimit(20)

	resp, err := client.Api.ListAccount(params)
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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$accounts = $twilio->api->v2010->accounts->read(
    ["friendlyName" => "MySubaccount"],
    20
);

foreach ($accounts as $record) {
    print $record->end;
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

accounts = @client
           .api
           .v2010
           .accounts
           .list(
             friendly_name: 'MySubaccount',
             limit: 20
           )

accounts.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:list \
   --friendly-name MySubaccount
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts.json?FriendlyName=MySubaccount&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "first_page_uri": "/2010-04-01/Accounts.json?FriendlyName=friendly_name&Status=active&PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "accounts": [],
  "uri": "/2010-04-01/Accounts.json?FriendlyName=friendly_name&Status=active&PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
```

## Making a phone call with a subaccount \[#call-subaccounts]

To make calls using a subaccount, use the subaccount's Account SID and Auth Token.

The following example shows how to make a call from a subaccount:

Make a call from a subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const subaccountSid = process.env.TWILIO_SUBACCOUNT_SID;
const client = twilio(accountSid, authToken, { accountSid: subaccountSid });

async function createCall() {
  const call = await client.calls.create({
    from: "+14158141829",
    to: "+16518675310",
    url: "https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount",
  });

  console.log(call.sid);
}

createCall();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

call = client.calls.create(
    url="https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount",
    to="+16518675310",
    from_="+14158141829",
)

print(call.sid)
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
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        string subaccountSid = Environment.GetEnvironmentVariable("TWILIO_SUBACCOUNT_SID");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(authToken, subaccountSid, accountSid);

        var call = await CallResource.CreateAsync(
            url: new Uri(
                "https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount"),
            to: new Twilio.Types.PhoneNumber("+16518675310"),
            from: new Twilio.Types.PhoneNumber("+14158141829"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String SUBACCOUNT_SID = System.getenv("TWILIO_SUBACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(AUTH_TOKEN, ACCOUNT_SID, SUBACCOUNT_SID);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+16518675310"),
                            new com.twilio.type.PhoneNumber("+14158141829"),
                            URI.create("https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount"))
                        .create();

        System.out.println(call.getSid());
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
	subaccountSid := os.Getenv("TWILIO_SUBACCOUNT_SID")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		AccountSid: subaccountSid,
	})

	params := &api.CreateCallParams{}
	params.SetUrl("https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount")
	params.SetTo("+16518675310")
	params.SetFrom("+14158141829")

	resp, err := client.Api.CreateCall(params)
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
$accountSid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$subaccountSid = getenv("TWILIO_SUBACCOUNT_SID");
$twilio = new Client($accountSid, $token, $subaccountSid);

$call = $twilio->calls->create(
    "+16518675310", // To
    "+14158141829", // From
    [
        "url" =>
            "https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount",
    ]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
subaccount_sid = ENV['TWILIO_SUBACCOUNT_SID']
@client = Twilio::REST::Client.new(account_sid, auth_token, subaccount_sid)

call = @client
       .api
       .v2010
       .calls
       .create(
         url: 'https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount',
         to: '+16518675310',
         from: '+14158141829'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --account-sid $TWILIO_SUBACCOUNT_SID \
   --url https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount \
   --to +16518675310 \
   --from +14158141829
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SUBACCOUNT_SID/Calls.json" \
--data-urlencode "Url=https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount" \
--data-urlencode "To=+16518675310" \
--data-urlencode "From=+14158141829" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158141829",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+16518675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

## Sending a message from a subaccount

To send messages using a subaccount, use the subaccount's Account SID and Auth Token when making your request to the Twilio Programmable Messaging API.

The following example shows how to send a message from a subaccount:

Send a message from a subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const subaccountSid = process.env.TWILIO_SUBACCOUNT_SID;
const client = twilio(accountSid, authToken, { accountSid: subaccountSid });

async function createMessage() {
  const message = await client.messages.create({
    body: "Ahoy there!",
    from: "+14158141829",
    to: "+16518675310",
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
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

message = client.messages.create(
    to="+16518675310", from_="+14158141829", body="Ahoy there!"
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
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        string subaccountSid = Environment.GetEnvironmentVariable("TWILIO_SUBACCOUNT_SID");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(authToken, subaccountSid, accountSid);

        var message = await MessageResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("+16518675310"),
            from: new Twilio.Types.PhoneNumber("+14158141829"),
            body: "Ahoy there!");

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
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String SUBACCOUNT_SID = System.getenv("TWILIO_SUBACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(AUTH_TOKEN, ACCOUNT_SID, SUBACCOUNT_SID);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+16518675310"),
                                  new com.twilio.type.PhoneNumber("+14158141829"),
                                  "Ahoy there!")
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
	subaccountSid := os.Getenv("TWILIO_SUBACCOUNT_SID")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		AccountSid: subaccountSid,
	})

	params := &api.CreateMessageParams{}
	params.SetTo("+16518675310")
	params.SetFrom("+14158141829")
	params.SetBody("Ahoy there!")

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
$accountSid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$subaccountSid = getenv("TWILIO_SUBACCOUNT_SID");
$twilio = new Client($accountSid, $token, $subaccountSid);

$message = $twilio->messages->create(
    "+16518675310", // To
    [
        "from" => "+14158141829",
        "body" => "Ahoy there!",
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
subaccount_sid = ENV['TWILIO_SUBACCOUNT_SID']
@client = Twilio::REST::Client.new(account_sid, auth_token, subaccount_sid)

message = @client
          .api
          .v2010
          .messages
          .create(
            to: '+16518675310',
            from: '+14158141829',
            body: 'Ahoy there!'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --account-sid $TWILIO_SUBACCOUNT_SID \
   --to +16518675310 \
   --from +14158141829 \
   --body "Ahoy there$EXCLAMATION_MARK"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SUBACCOUNT_SID/Messages.json" \
--data-urlencode "To=+16518675310" \
--data-urlencode "From=+14158141829" \
--data-urlencode "Body=Ahoy there$EXCLAMATION_MARK" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Ahoy there!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14158141829",
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
  "to": "+16518675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Calculate billing for subaccount usage \[#billing-subaccounts]

In many cases, you may want to calculate the billing incurred by a subaccount. Let's say you created a subaccount for a customer and you needed to charge them for their usage.

You can iterate over all of the calls and sum up the product of `price` and `duration`.

The following example shows the API request to fetch all Calls that began on January 15, 2018. In the response, each object in the `calls` array contains a `price` property.

**Note**: In this example, the `StartTime` parameter returns calls only that began on January 15, 2018. You can also use inequalities (for example, `<=` and `>=`) and the `EndTime` parameter to fetch all Calls from a specific date span. Learn more on the [Call Resource API Reference page](/docs/voice/api/call-resource#read-multiple-call-resources).

Calculate billing for subaccount usage

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const subaccountSid = process.env.TWILIO_SUBACCOUNT_SID;
const client = twilio(accountSid, authToken, { accountSid: subaccountSid });

async function listCall() {
  const calls = await client.calls.list({
    startTime: new Date("2009-07-06 20:30:00"),
    limit: 20,
  });

  calls.forEach((c) => console.log(c.end));
}

listCall();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

calls = client.calls.list(start_time=datetime(2009, 7, 6, 20, 30, 0), limit=20)

for record in calls:
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
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        string subaccountSid = Environment.GetEnvironmentVariable("TWILIO_SUBACCOUNT_SID");
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        TwilioClient.Init(authToken, subaccountSid, accountSid);

        var calls = await CallResource.ReadAsync(
            startTime: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc), limit: 20);

        foreach (var record in calls) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String SUBACCOUNT_SID = System.getenv("TWILIO_SUBACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(AUTH_TOKEN, ACCOUNT_SID, SUBACCOUNT_SID);
        ResourceSet<Call> calls =
            Call.reader().setStartTime(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC"))).limit(20).read();

        for (Call record : calls) {
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	subaccountSid := os.Getenv("TWILIO_SUBACCOUNT_SID")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		AccountSid: subaccountSid,
	})

	params := &api.ListCallParams{}
	params.SetStartTime(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListCall(params)
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

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$accountSid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$subaccountSid = getenv("TWILIO_SUBACCOUNT_SID");
$twilio = new Client($accountSid, $token, $subaccountSid);

$calls = $twilio->calls->read(
    ["startTime" => new \DateTime("2009-07-06T20:30:00Z")],
    20
);

foreach ($calls as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
subaccount_sid = ENV['TWILIO_SUBACCOUNT_SID']
@client = Twilio::REST::Client.new(account_sid, auth_token, subaccount_sid)

calls = @client
        .api
        .v2010
        .calls
        .list(
          start_time: Time.new(2009, 7, 6, 20, 30, 0),
          limit: 20
        )

calls.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:list \
   --account-sid $TWILIO_SUBACCOUNT_SID \
   --start-time 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SUBACCOUNT_SID/Calls.json?StartTime=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "human",
      "api_version": "2010-04-01",
      "caller_name": "callerid2",
      "date_created": "Fri, 18 Oct 2019 16:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 16:01:00 +0000",
      "direction": "inbound",
      "duration": "3",
      "end_time": "Fri, 18 Oct 2019 16:03:00 +0000",
      "forwarded_from": "calledvia2",
      "from": "+13051416798",
      "from_formatted": "(305) 141-6798",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeee",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeee",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeee",
      "price": "-0.100",
      "price_unit": "JPY",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
      "start_time": "Fri, 18 Oct 2019 16:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessages.json"
      },
      "to": "+13051913580",
      "to_formatted": "(305) 191-3580",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=1&PageToken=PACAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0"
}
```

## Suspending a subaccount \[#suspending-subaccounts]

While an account is suspended, it can't make or receive phone calls or send and receive SMS messages. This is useful when your customer does not pay their bill and you
want to suspend their account until a successful payment is received. However, you will be charged monthly for any phone numbers the subaccount owns.

To suspend a subaccount, `POST` the parameter 'Status' with the value 'suspended'.

> \[!WARNING]
>
> Note that `in-progress` calls will not end when a subaccount is suspended. You must change the status of these calls to `completed`.

The following example shows how to suspend a subaccount:

Suspend a Subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAccount() {
  const account = await client.api.v2010
    .accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    .update({ status: "suspended" });

  console.log(account.sid);
}

updateAccount();
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

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="suspended"
)

print(account.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var account = await AccountResource.UpdateAsync(
            status: AccountResource.StatusEnum.Suspended, pathSid: "ACXXXX-SUBACCOUNT-SID-XXXX");

        Console.WriteLine(account.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Account account = Account.updater("ACXXXX-SUBACCOUNT-SID-XXXX").setStatus(Account.Status.SUSPENDED).update();

        System.out.println(account.getSid());
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

	params := &api.UpdateAccountParams{}
	params.SetStatus("suspended")

	resp, err := client.Api.UpdateAccount("ACXXXX-SUBACCOUNT-SID-XXXX",
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

$account = $twilio->api->v2010
    ->accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    ->update(["status" => "suspended"]);

print $account->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

account = @client
          .api
          .v2010
          .accounts('ACXXXX-SUBACCOUNT-SID-XXXX')
          .update(status: 'suspended')

puts account.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXX-SUBACCOUNT-SID-XXXX \
   --status suspended
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXX-SUBACCOUNT-SID-XXXX.json" \
--data-urlencode "Status=suspended" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "suspended",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

To reactivate a suspended subaccount, `POST` the value `active` for the
`Status` parameter and we will restore the account to full service.

The following example shows how to reactivate a suspended subaccount:

Re-activate a Suspended Subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAccount() {
  const account = await client.api.v2010
    .accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    .update({ status: "active" });

  console.log(account.authToken);
}

updateAccount();
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

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="active"
)

print(account.auth_token)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var account = await AccountResource.UpdateAsync(
            status: AccountResource.StatusEnum.Active, pathSid: "ACXXXX-SUBACCOUNT-SID-XXXX");

        Console.WriteLine(account.AuthToken);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Account account = Account.updater("ACXXXX-SUBACCOUNT-SID-XXXX").setStatus(Account.Status.ACTIVE).update();

        System.out.println(account.getAuthToken());
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

	params := &api.UpdateAccountParams{}
	params.SetStatus("active")

	resp, err := client.Api.UpdateAccount("ACXXXX-SUBACCOUNT-SID-XXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AuthToken != nil {
			fmt.Println(*resp.AuthToken)
		} else {
			fmt.Println(resp.AuthToken)
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

$account = $twilio->api->v2010
    ->accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    ->update(["status" => "active"]);

print $account->authToken;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

account = @client
          .api
          .v2010
          .accounts('ACXXXX-SUBACCOUNT-SID-XXXX')
          .update(status: 'active')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXX-SUBACCOUNT-SID-XXXX \
   --status active
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXX-SUBACCOUNT-SID-XXXX.json" \
--data-urlencode "Status=active" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

> \[!WARNING]
>
> Note that you must use your main account's authentication credentials to suspend a subaccount. You can't suspend your main account.

## Closing a subaccount \[#closing-subaccounts]

If your customer closes their account with you, you can permanently close
the associated Twilio subaccount by `POST`ing the parameter `Status` with the
value `closed` to the subaccount resource URI.

The following example shows how to permanently close a subaccount:

Permanently Close a Subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAccount() {
  const account = await client.api.v2010
    .accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    .update({ status: "closed" });

  console.log(account.authToken);
}

updateAccount();
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

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="closed"
)

print(account.auth_token)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var account = await AccountResource.UpdateAsync(
            status: AccountResource.StatusEnum.Closed, pathSid: "ACXXXX-SUBACCOUNT-SID-XXXX");

        Console.WriteLine(account.AuthToken);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.Account;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Account account = Account.updater("ACXXXX-SUBACCOUNT-SID-XXXX").setStatus(Account.Status.CLOSED).update();

        System.out.println(account.getAuthToken());
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

	params := &api.UpdateAccountParams{}
	params.SetStatus("closed")

	resp, err := client.Api.UpdateAccount("ACXXXX-SUBACCOUNT-SID-XXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AuthToken != nil {
			fmt.Println(*resp.AuthToken)
		} else {
			fmt.Println(resp.AuthToken)
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

$account = $twilio->api->v2010
    ->accounts("ACXXXX-SUBACCOUNT-SID-XXXX")
    ->update(["status" => "closed"]);

print $account->authToken;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

account = @client
          .api
          .v2010
          .accounts('ACXXXX-SUBACCOUNT-SID-XXXX')
          .update(status: 'closed')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXX-SUBACCOUNT-SID-XXXX \
   --status closed
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXX-SUBACCOUNT-SID-XXXX.json" \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "closed",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

When you close a subaccount, Twilio will release all phone numbers assigned to it and shut it down completely. You can't ever use a closed account to make and receive
phone calls or send and receive SMS messages. Note that you can't reopen a closed account.

Your closed subaccount *will* still appear in your accounts list, and you will still have access
to historical data for that subaccount, unless deletion of closed subaccounts is activated.

If you have turned on deletion of closed subaccounts through the [Subaccounts](https://www.twilio.com/console/project/subaccounts) settings page, Twilio will delete all subaccount data 30 days after closure. This includes previously closed subaccounts. Those subaccounts will no longer appear on the Console.

* Twilio has turned on this setting for all accounts created after July 5, 2018, and for all accounts without subaccounts
* For all other accounts, account owners can turn this setting on through the [Subaccounts](https://www.twilio.com/console/project/subaccounts) settings page.

> \[!WARNING]
>
> Note that you must use your main account's authentication credentials to close a subaccount. You also can't close your main account.

## Exchange phone numbers between accounts \[#exchanging-numbers]

Before transferring phone numbers, review the following information about WhatsApp-activated numbers:

> \[!NOTE]
>
> If you have a [WhatsApp Sender](/docs/whatsapp/self-sign-up) connected to your phone number, it will not be moved to the gaining account SID. To move phone numbers connected to WhatsApp Senders, open a [support ticket](https://help.twilio.com/) to move the WhatsApp Sender before moving the phone number.

You can transfer numbers between subaccounts, and between your main account
and any one of your subaccounts. You must use your main account's credentials
when making the API request to transfer a phone number.

To transfer a phone number between two accounts that you control, make an HTTP `POST` request
to an [IncomingPhoneNumber instance resource](/docs/phone-numbers/api/incomingphonenumber-resource) URI. In the
body of the `POST` set the parameter 'AccountSid' to the AccountSid of the account you want to own
that number. This will remove the phone number from its original account and make it available under the IncomingPhoneNumbers list resource of the target account.

* Number configurations may need to be reconfigured.
* Any Toll-Free number verifications, A2P registrations or Trust Hub enrollments will need to be resubmitted and reconfigured.

If any of the phone numbers you would like to transfer have Address Requirements, you will need to create a compliant [Address](/docs/usage/api/address) in the target subaccount before transferring the phone number.

Closing a subaccount as described above will release all of that account's phone numbers. You might consider transferring all numbers to your main account beforehand if you want to keep them.

### Example \[#example-2]

The following example shows how to transfer a phone number from your primary account `AC00000000000000000000000000000001` to
subaccount `AC00000000000000000000000000000002`:

Transfer phone numbers from primary account to subaccount

```js
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client
  .incomingPhoneNumbers('PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .update({ accountSid: process.env.TWILIO_SUB_ACCOUNT_SID })
  .then((incoming_phone_number) =>
    console.log(incoming_phone_number.friendlyName)
  );
```

```py
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
sub_account_sid = os.environ['TWILIO_SUBACCOUNT_SID']
client = Client(account_sid, auth_token)

incoming_phone_number = client \
    .incoming_phone_numbers('PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
    .update(account_sid=sub_account_sid)

print(incoming_phone_number.friendly_name)
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;


class Program
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var incomingPhoneNumber = IncomingPhoneNumberResource.Update(
            accountSid: Environment.GetEnvironmentVariable("TWILIO_SUB_ACCOUNT_SID"),
            pathSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );

        Console.WriteLine(incomingPhoneNumber.FriendlyName);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;

public class Example {
    // Get your Account SID and Auth Token from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    public static final String SUBACCOUNT_SID = System.getenv("TWILIO_SUBACCOUNT_SID");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        IncomingPhoneNumber incomingPhoneNumber = IncomingPhoneNumber.updater(
                "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            .setAccountSid(SUBACCOUNT_SID)
            .update();

        System.out.println(incomingPhoneNumber.getFriendlyName());
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once '/path/to/vendor/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$sub_account_sid = getenv('TWILIO_SUBACCOUNT_SID');
$twilio = new Client($sid, $token);

$incoming_phone_number = $twilio->incomingPhoneNumbers("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                ->update(array(
                                             "accountSid" => $sub_account_sid
                                         )
                                );

print($incoming_phone_number->friendlyName);
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
sub_account_sid = ENV['TWILIO_SUBACCOUNT_SID']
@client = Twilio::REST::Client.new(account_sid, auth_token)

incoming_phone_number = @client
  .incoming_phone_numbers('PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .update(account_sid: sub_account_sid)

puts incoming_phone_number.friendly_name
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:update \
    --sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
    --target-account-sid AC00000000000000000000000000000002
```

```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC00000000000000000000000000000001/IncomingPhoneNumbers/PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json \
--data-urlencode "AccountSid=AC00000000000000000000000000000002" \
-u AC00000000000000000000000000000001:your_auth_token
```

```json
{
  "account_sid": "AC00000000000000000000000000000002",
  "address_requirements": "none",
  "address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "mms": true,
    "sms": false,
    "voice": true
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "My Company Line",
  "identity_sid": "RIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "origin": "origin",
  "phone_number": "+15105647903",
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sms_application_sid": null,
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/AC00000000000000000000000000000002/IncomingPhoneNumbers/PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json",
  "voice_application_sid": null,
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null
}
```
