# REST API: Authorized Connect Apps

The AuthorizedConnectApps list resource shows all of the Connect Apps that you
have authorized for your account. Each Connect App corresponds to a
[subaccount](/docs/iam/api/subaccounts) within your Twilio account, which acts as that Connect
App's sandbox. The instance resource shows you the permissions you have granted
for a Connect App as well as information about the Connect App itself.

## AuthorizedConnectApp Instance Resource \[#instance]

### Resource URI \[#instance-uri]

```bash
/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}

```

### Resource Properties \[#instance-properties]

```json
{"title":"ListAuthorizedConnectAppResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"authorized_connect_apps":{"type":"array","items":{"type":"object","refName":"api.v2010.account.authorized_connect_app","modelName":"api_v2010_account_authorized_connect_app","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource."},"connect_app_company_name":{"type":"string","nullable":true,"description":"The company name set for the Connect App."},"connect_app_description":{"type":"string","nullable":true,"description":"A detailed description of the Connect App."},"connect_app_friendly_name":{"type":"string","nullable":true,"description":"The name of the Connect App."},"connect_app_homepage_url":{"type":"string","format":"uri","nullable":true,"description":"The public URL for the Connect App."},"connect_app_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CN[0-9a-fA-F]{32}$","nullable":true,"description":"The SID that we assigned to the Connect App."},"permissions":{"type":"array","nullable":true,"description":"The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.","x-field-extra-annotation":"@JacksonXmlProperty(localName=\"Permission\") @JacksonXmlElementWrapper(localName=\"Permissions\")","x-getter-extra-annotation":"@JacksonXmlProperty(localName=\"Permission\") @JacksonXmlElementWrapper(localName=\"Permissions\")","items":{"type":"string","enum":["get-all","post-all"],"description":"The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`.","refName":"authorized_connect_app_enum_permission","modelName":"authorized_connect_app_enum_permission"}},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}}}}
```

### HTTP GET \[#instance-get]

#### Example \[#instance-get-example-1]

Retrieve an Authorized Connect App

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchAuthorizedConnectApp() {
  const authorizedConnectApp = await client
    .authorizedConnectApps("CN47260e643654388faabe8aaa18ea6756")
    .fetch();

  console.log(authorizedConnectApp.accountSid);
}

fetchAuthorizedConnectApp();
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

authorized_connect_app = client.authorized_connect_apps(
    "CN47260e643654388faabe8aaa18ea6756"
).fetch()

print(authorized_connect_app.account_sid)
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

        var authorizedConnectApp = await AuthorizedConnectAppResource.FetchAsync(
            pathConnectAppSid: "CN47260e643654388faabe8aaa18ea6756");

        Console.WriteLine(authorizedConnectApp.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.AuthorizedConnectApp;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        AuthorizedConnectApp authorizedConnectApp =
            AuthorizedConnectApp.fetcher("CN47260e643654388faabe8aaa18ea6756").fetch();

        System.out.println(authorizedConnectApp.getAccountSid());
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

	params := &api.FetchAuthorizedConnectAppParams{}

	resp, err := client.Api.FetchAuthorizedConnectApp("CN47260e643654388faabe8aaa18ea6756",
		params)
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

$authorized_connect_app = $twilio
    ->authorizedConnectApps("CN47260e643654388faabe8aaa18ea6756")
    ->fetch();

print $authorized_connect_app->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

authorized_connect_app = @client
                         .api
                         .v2010
                         .authorized_connect_apps('CN47260e643654388faabe8aaa18ea6756')
                         .fetch

puts authorized_connect_app.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:authorized-connect-apps:fetch \
   --connect-app-sid CN47260e643654388faabe8aaa18ea6756
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AuthorizedConnectApps/CN47260e643654388faabe8aaa18ea6756.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "connect_app_company_name": "aaa",
  "connect_app_description": "alksjdfl;ajseifj;alsijfl;ajself;jasjfjas;lejflj",
  "connect_app_friendly_name": "aaa",
  "connect_app_homepage_url": "http://www.google.com",
  "connect_app_sid": "CN47260e643654388faabe8aaa18ea6756",
  "permissions": [
    "get-all"
  ],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### HTTP POST \[#instance-post]

Not supported.

### HTTP PUT \[#instance-put]

Not supported.

### HTTP DELETE \[#instance-delete]

Not supported.

## AuthorizedConnectApps List Resource \[#list]

### Resource URI \[#list-uri]

```bash
/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps

```

### HTTP GET \[#list-get]

Returns a list of Connect App resource representations, each representing a
Connect App you've authorized to access your account. The list includes [paging information][14].

#### Example 1 \[#list-get-example-1]

[14]: /docs/usage/twilios-response#pagination

Retrieve all Authorized Connect Apps

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listAuthorizedConnectApp() {
  const authorizedConnectApps = await client.authorizedConnectApps.list({
    limit: 20,
  });

  authorizedConnectApps.forEach((a) => console.log(a.end));
}

listAuthorizedConnectApp();
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

authorized_connect_apps = client.authorized_connect_apps.list(limit=20)

for record in authorized_connect_apps:
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
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var authorizedConnectApps = await AuthorizedConnectAppResource.ReadAsync(limit: 20);

        foreach (var record in authorizedConnectApps) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.AuthorizedConnectApp;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<AuthorizedConnectApp> authorizedConnectApps = AuthorizedConnectApp.reader().limit(20).read();

        for (AuthorizedConnectApp record : authorizedConnectApps) {
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

	params := &api.ListAuthorizedConnectAppParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListAuthorizedConnectApp(params)
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

$authorizedConnectApps = $twilio->authorizedConnectApps->read(20);

foreach ($authorizedConnectApps as $record) {
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

authorized_connect_apps = @client
                          .api
                          .v2010
                          .authorized_connect_apps
                          .list(limit: 20)

authorized_connect_apps.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:authorized-connect-apps:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/AuthorizedConnectApps.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "authorized_connect_apps": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "connect_app_company_name": "aaa",
      "connect_app_description": "alksjdfl;ajseifj;alsijfl;ajself;jasjfjas;lejflj",
      "connect_app_friendly_name": "aaa",
      "connect_app_homepage_url": "http://www.google.com",
      "connect_app_sid": "CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "permissions": [
        "get-all"
      ],
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=0&PageSize=50",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=2&PageSize=50",
  "page": 0,
  "page_size": 50,
  "previous_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=1&PageSize=50",
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=0&PageSize=50"
}
```

### HTTP POST \[#list-post]

Not Supported.

### HTTP PUT \[#list-put]

Not Supported.

### HTTP DELETE \[#list-delete]

Not Supported.
