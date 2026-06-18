# REST API: Accounts

When you sign up with Twilio, you start with one main account. You can create additional accounts as needed.
Use subaccounts to segment phone numbers and usage data by customer and to control data access.

To learn more about subaccounts, see [Using subaccounts](/docs/iam/api/subaccounts).

## Account Properties

<OperationTable type="properties" data={{"title":"ListAccountResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"accounts":{"type":"array","items":{"type":"object","refName":"api.v2010.account","modelName":"api_v2010_account","properties":{"auth_token":{"type":"string","nullable":true,"description":"The authorization token for this account. This token should be kept a secret, so no sharing.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date that this account was created, in GMT in RFC 2822 format"},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date that this account was last updated, in GMT in RFC 2822 format."},"friendly_name":{"type":"string","nullable":true,"description":"A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"owner_account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies this resource."},"status":{"type":"string","enum":["active","suspended","closed"],"description":"The status of this account. Usually `active`, but can be `suspended` or `closed`.","refName":"account_enum_status","modelName":"account_enum_status"},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A Map of various subresources available for the given Account Instance"},"type":{"type":"string","enum":["Trial","Full"],"description":"The type of this account. Either `Trial` or `Full` if it's been upgraded","refName":"account_enum_type","modelName":"account_enum_type"},"uri":{"type":"string","nullable":true,"description":"The URI for this resource, relative to `https://api.twilio.com`"}}}}}}} />

## Create an Account resource

`POST https://api.twilio.com/2010-04-01/Accounts.json`

Create a new Account instance resource as a subaccount
of the one used to make the request. See [Creating subaccounts](/docs/iam/api/subaccounts#creating-subaccounts) for more
information.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateAccountRequest","properties":{"FriendlyName":{"type":"string","description":"A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}`","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new Twilio Subaccount from the account making the request

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createAccount() {
  const account = await client.api.v2010.accounts.create();

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

account = client.api.v2010.accounts.create()

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

        var account = await AccountResource.CreateAsync();

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
        Account account = Account.creator().create();

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

$account = $twilio->api->v2010->accounts->create();

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
          .create

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:create
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
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

## Fetch an Account resource

`GET https://api.twilio.com/2010-04-01/Accounts/{Sid}.json`

Return an account representation, including the properties listed above.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Account Sid that uniquely identifies the account to fetch","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch the account specified by the provided Account Sid

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
    .accounts("ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
            await AccountResource.FetchAsync(pathSid: "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
        Account account = Account.fetcher("ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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

	resp, err := client.Api.FetchAccount("ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    ->accounts("ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
          .accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:fetch \
   --sid ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
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

## Read multiple Account resources

`GET https://api.twilio.com/2010-04-01/Accounts.json`

Retrieve all Account resources that belong to the account making the API request, including its subaccounts.

When fetching multiple pages of API results, use the `next_page_uri` parameter to retrieve the next page. All Twilio SDKs use the `next_page_uri` value to paginate resources. For more information, see [Twilio response pagination](/docs/usage/twilios-response#pagination).

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"Only return the Account resources with friendly names that exactly match this name.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readEmpty":{"value":"friendly_name"},"readFull":{"value":"friendly_name"}}},{"name":"Status","in":"query","description":"Only return Account resources with the given status. Can be `closed`, `suspended` or `active`.","schema":{"type":"string","enum":["active","suspended","closed"],"description":"The status of this account. Usually `active`, but can be `suspended` or `closed`.","refName":"account_enum_status","modelName":"account_enum_status"},"examples":{"readEmpty":{"value":"active"},"readFull":{"value":"active"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List All Accounts

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAccount() {
  const accounts = await client.api.v2010.accounts.list({ limit: 20 });

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

accounts = client.api.v2010.accounts.list(limit=20)

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

        var accounts = await AccountResource.ReadAsync(limit: 20);

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
        ResourceSet<Account> accounts = Account.reader().limit(20).read();

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

$accounts = $twilio->api->v2010->accounts->read([], 20);

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
           .list(limit: 20)

accounts.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts.json?PageSize=20" \
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

List All Active Accounts

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
    status: "active",
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

accounts = client.api.v2010.accounts.list(status="active", limit=20)

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

        var accounts =
            await AccountResource.ReadAsync(status: AccountResource.StatusEnum.Active, limit: 20);

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
        ResourceSet<Account> accounts = Account.reader().setStatus(Account.Status.ACTIVE).limit(20).read();

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
	params.SetStatus("active")
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

$accounts = $twilio->api->v2010->accounts->read(["status" => "active"], 20);

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
             status: 'active',
             limit: 20
           )

accounts.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:list \
   --status active
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts.json?Status=active&PageSize=20" \
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

## Update an Account resource

`POST https://api.twilio.com/2010-04-01/Accounts/{Sid}.json`

Modify the properties of an account.

See the [Subaccounts](/docs/iam/api/subaccounts) reference for more information on [suspending](/docs/iam/api/subaccounts#suspending-subaccounts), [unsuspending](/docs/iam/api/subaccounts#suspending-subaccounts) or [closing](/docs/iam/api/subaccounts#closing-subaccounts) subaccounts using the 'Status' parameter.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Account Sid that uniquely identifies the account to update","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateAccountRequest","properties":{"FriendlyName":{"type":"string","description":"Update the human-readable description of this Account","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Status":{"type":"string","enum":["active","suspended","closed"],"description":"The status of this account. Usually `active`, but can be `suspended` or `closed`.","refName":"account_enum_status","modelName":"account_enum_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Status\": \"active\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Status\": \"active\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"active\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateWithNumericStatus":{"value":{"lang":"json","value":"{\n  \"Status\": \"1\"\n}","meta":"","code":"{\n  \"Status\": \"1\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"1\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Suspend a subaccount

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
    .accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "suspended" });

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

account = client.api.v2010.accounts(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(status="suspended")

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
            status: AccountResource.StatusEnum.Suspended,
            pathSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        Account account =
            Account.updater("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setStatus(Account.Status.SUSPENDED).update();

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
	params.SetStatus("suspended")

	resp, err := client.Api.UpdateAccount("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(["status" => "suspended"]);

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
          .update(status: 'suspended')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status suspended
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
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
  "sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

Reactivate a suspended subaccount

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
    .accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

account = client.api.v2010.accounts(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(status="active")

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
            status: AccountResource.StatusEnum.Active,
            pathSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        Account account =
            Account.updater("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setStatus(Account.Status.ACTIVE).update();

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

	resp, err := client.Api.UpdateAccount("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
          .accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(status: 'active')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status active
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
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

Permanently close a subaccount

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
    .accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

account = client.api.v2010.accounts(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(status="closed")

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
            status: AccountResource.StatusEnum.Closed,
            pathSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        Account account =
            Account.updater("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setStatus(Account.Status.CLOSED).update();

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

	resp, err := client.Api.UpdateAccount("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->accounts("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
          .accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(status: 'closed')

puts account.auth_token
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:accounts:update \
   --sid ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status closed
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
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
  "sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
