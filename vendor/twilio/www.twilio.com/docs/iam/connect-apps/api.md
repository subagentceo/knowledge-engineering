# REST API: Connect Apps

The ConnectApps list resource shows all of the Connect Apps that you
have created within your Twilio account. The instance resource shows
information about the ConnectApp as well as the permissions the
ConnectApp will request from authorized users.

## ConnectApp Instance Resource \[#instance]

### Resource URI \[#instance-uri]

```bash
/2010-04-01/Accounts/{AccountSid}/ConnectApps/{ConnectAppSid}

```

### Resource Properties \[#instance-properties]

```json
{"title":"ListConnectAppResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"connect_apps":{"type":"array","items":{"type":"object","refName":"api.v2010.account.connect_app","modelName":"api_v2010_account_connect_app","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource."},"authorize_redirect_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"company_name":{"type":"string","nullable":true,"description":"The company name set for the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"deauthorize_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `deauthorize_callback_url`."},"deauthorize_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"description":{"type":"string","nullable":true,"description":"The description of the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"homepage_url":{"type":"string","format":"uri","nullable":true,"description":"The public URL where users can obtain more information about this Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"permissions":{"type":"array","nullable":true,"description":"The set of permissions that your ConnectApp requests.","x-field-extra-annotation":"@JacksonXmlProperty(localName=\"Permission\") @JacksonXmlElementWrapper(localName=\"Permissions\")","x-getter-extra-annotation":"@JacksonXmlProperty(localName=\"Permission\") @JacksonXmlElementWrapper(localName=\"Permissions\")","items":{"type":"string","enum":["get-all","post-all"],"description":"The set of permissions that your ConnectApp requests.","refName":"connect_app_enum_permission","modelName":"connect_app_enum_permission"}},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the ConnectApp resource."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}}}}
```

### HTTP GET \[#instance-get]

Get the properties of a Connect App.

#### Example \[#instance-get-example-1]

Retrieve a Connect App

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchConnectApp() {
  const connectApp = await client
    .connectApps("CNb989fdd207b04d16aee578018ef5fd93")
    .fetch();

  console.log(connectApp.accountSid);
}

fetchConnectApp();
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

connect_app = client.connect_apps("CNb989fdd207b04d16aee578018ef5fd93").fetch()

print(connect_app.account_sid)
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

        var connectApp =
            await ConnectAppResource.FetchAsync(pathSid: "CNb989fdd207b04d16aee578018ef5fd93");

        Console.WriteLine(connectApp.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.ConnectApp;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ConnectApp connectApp = ConnectApp.fetcher("CNb989fdd207b04d16aee578018ef5fd93").fetch();

        System.out.println(connectApp.getAccountSid());
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

	params := &api.FetchConnectAppParams{}

	resp, err := client.Api.FetchConnectApp("CNb989fdd207b04d16aee578018ef5fd93",
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

$connect_app = $twilio
    ->connectApps("CNb989fdd207b04d16aee578018ef5fd93")
    ->fetch();

print $connect_app->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

connect_app = @client
              .api
              .v2010
              .connect_apps('CNb989fdd207b04d16aee578018ef5fd93')
              .fetch

puts connect_app.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:connect-apps:fetch \
   --sid CNb989fdd207b04d16aee578018ef5fd93
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/ConnectApps/CNb989fdd207b04d16aee578018ef5fd93.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "authorize_redirect_url": "http://example.com/redirect",
  "company_name": "Twilio",
  "deauthorize_callback_method": "GET",
  "deauthorize_callback_url": "http://example.com/deauth",
  "description": null,
  "friendly_name": "Connect app for deletion",
  "homepage_url": "http://example.com/home",
  "permissions": [],
  "sid": "CNb989fdd207b04d16aee578018ef5fd93",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### HTTP POST \[#instance-post]

Tries to update the Connect App's properties, and returns the updated resource
representation if successful. The returned response is identical to that
returned above when making a `GET` request.

#### Optional Parameters \[#instance-post-optional-parameters]

You may specify one or more of the following parameters to update this
Connect App's respective properties:

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the ConnectApp resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CN[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateConnectAppRequest","properties":{"AuthorizeRedirectUrl":{"type":"string","format":"uri","description":"The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"CompanyName":{"type":"string","description":"The company name to set for the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"DeauthorizeCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method to use when calling `deauthorize_callback_url`."},"DeauthorizeCallbackUrl":{"type":"string","format":"uri","description":"The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Description":{"type":"string","description":"A description of the Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"HomepageUrl":{"type":"string","format":"uri","description":"A public URL where users can obtain more information about this Connect App.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Permissions":{"type":"array","description":"A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`.","items":{"type":"string","enum":["get-all","post-all"],"description":"The set of permissions that your ConnectApp requests.","refName":"connect_app_enum_permission","modelName":"connect_app_enum_permission"}}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"AuthorizeRedirectUrl\": \"https://example.com\",\n  \"CompanyName\": \"company_name\",\n  \"DeauthorizeCallbackMethod\": \"GET\",\n  \"DeauthorizeCallbackUrl\": \"https://example.com\",\n  \"Description\": \"description\",\n  \"FriendlyName\": \"friendly_name\",\n  \"HomepageUrl\": \"https://example.com\",\n  \"Permissions\": [\n    \"get-all\"\n  ]\n}","meta":"","code":"{\n  \"AuthorizeRedirectUrl\": \"https://example.com\",\n  \"CompanyName\": \"company_name\",\n  \"DeauthorizeCallbackMethod\": \"GET\",\n  \"DeauthorizeCallbackUrl\": \"https://example.com\",\n  \"Description\": \"description\",\n  \"FriendlyName\": \"friendly_name\",\n  \"HomepageUrl\": \"https://example.com\",\n  \"Permissions\": [\n    \"get-all\"\n  ]\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AuthorizeRedirectUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CompanyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"company_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DeauthorizeCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DeauthorizeCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"description\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"HomepageUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Permissions\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"get-all\"","#A5D6FF"],"\n  ",["]","#C9D1D9"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

### HTTP PUT \[#instance-put]

Not supported.

### HTTP DELETE \[#instance-delete]

Not supported.

## ConnectApp List Resource \[#list]

### Resource URI \[#list-uri]

```bash
/2010-04-01/Accounts/{AccountSid}/ConnectApps

```

### HTTP GET \[#list-get]

Returns a list of Connect App resource representations, each representing a
Connect App in your account. The list includes [paging information][14].

#### Example 1 \[#list-get-example-1]

[14]: /docs/usage/twilios-response#pagination

Retrieve all Connect Apps

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConnectApp() {
  const connectApps = await client.connectApps.list({ limit: 20 });

  connectApps.forEach((c) => console.log(c.end));
}

listConnectApp();
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

connect_apps = client.connect_apps.list(limit=20)

for record in connect_apps:
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

        var connectApps = await ConnectAppResource.ReadAsync(limit: 20);

        foreach (var record in connectApps) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.ConnectApp;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ConnectApp> connectApps = ConnectApp.reader().limit(20).read();

        for (ConnectApp record : connectApps) {
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

	params := &api.ListConnectAppParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListConnectApp(params)
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

$connectApps = $twilio->connectApps->read(20);

foreach ($connectApps as $record) {
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

connect_apps = @client
               .api
               .v2010
               .connect_apps
               .list(limit: 20)

connect_apps.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:connect-apps:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/ConnectApps.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "connect_apps": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "authorize_redirect_url": "http://example.com/redirect",
      "company_name": "Twilio",
      "deauthorize_callback_method": "GET",
      "deauthorize_callback_url": "http://example.com/deauth",
      "description": null,
      "friendly_name": "Connect app for deletion",
      "homepage_url": "http://example.com/home",
      "permissions": [],
      "sid": "CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json?Page=0&PageSize=50",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json?Page=0&PageSize=50"
}
```

### HTTP POST \[#list-post]

Not Supported.

### HTTP PUT \[#list-put]

Not Supported.

### HTTP DELETE \[#list-delete]

Not Supported.
