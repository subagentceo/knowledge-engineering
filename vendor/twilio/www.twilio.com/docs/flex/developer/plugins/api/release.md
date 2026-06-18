# Plugin Release Resource

The Plugin Release resource lets you set a [Configuration](/docs/flex/developer/plugins/api/plugin-configuration) active on a Flex project. A Flex project can have multiple Plugins with different Versions. When you're confident that your Plugins all work properly and are ready for production, you can create a release to push the changes to your contact center.

This allows you to audit when a Flex project changed and rollback your changes when necessary. Releases are *immutable* and *irreversible*. A rollback requires a new Release using a previous Configuration.

## Release Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.plugin_release","modelName":"flex_v1_plugin_release","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Plugin Release resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Plugin Release resource and owns this resource."},"configuration_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FJ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Plugin Configuration resource to release."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the Flex Plugin Release was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Plugin Release resource."}}}} />

## Create a PluginRelease resource

`POST https://flex-api.twilio.com/v1/PluginService/Releases`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePluginReleaseRequest","required":["ConfigurationId"],"properties":{"ConfigurationId":{"type":"string","description":"The SID or the Version of the Flex Plugin Configuration to release."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"ConfigurationId\": \"FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"ConfigurationId\": \"FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ConfigurationId\"","#7EE787"],[":","#C9D1D9"]," ",["\"FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Plugin Release

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPluginRelease() {
  const pluginRelease = await client.flexApi.v1.pluginReleases.create({
    configurationId: "ConfigurationId",
  });

  console.log(pluginRelease.sid);
}

createPluginRelease();
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

plugin_release = client.flex_api.v1.plugin_releases.create(
    configuration_id="ConfigurationId"
)

print(plugin_release.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginRelease =
            await PluginReleaseResource.CreateAsync(configurationId: "ConfigurationId");

        Console.WriteLine(pluginRelease.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginRelease;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginRelease pluginRelease = PluginRelease.creator("ConfigurationId").create();

        System.out.println(pluginRelease.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	flex "github.com/twilio/twilio-go/rest/flex/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &flex.CreatePluginReleaseParams{}
	params.SetConfigurationId("ConfigurationId")

	resp, err := client.FlexV1.CreatePluginRelease(params)
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

$plugin_release = $twilio->flexApi->v1->pluginReleases->create(
    "ConfigurationId" // ConfigurationId
);

print $plugin_release->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_release = @client
                 .flex_api
                 .v1
                 .plugin_releases
                 .create(configuration_id: 'ConfigurationId')

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:create \
   --configuration-id ConfigurationId
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Releases" \
--data-urlencode "ConfigurationId=ConfigurationId" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "configuration_sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Releases/FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a PluginRelease resource

`GET https://flex-api.twilio.com/v1/PluginService/Releases/{Sid}`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flex Plugin Release resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Plugin Release

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPluginRelease() {
  const pluginRelease = await client.flexApi.v1.pluginReleases("Sid").fetch();

  console.log(pluginRelease.sid);
}

fetchPluginRelease();
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

plugin_release = client.flex_api.v1.plugin_releases("Sid").fetch()

print(plugin_release.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginRelease = await PluginReleaseResource.FetchAsync(pathSid: "Sid");

        Console.WriteLine(pluginRelease.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginRelease;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginRelease pluginRelease = PluginRelease.fetcher("Sid").fetch();

        System.out.println(pluginRelease.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	flex "github.com/twilio/twilio-go/rest/flex/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &flex.FetchPluginReleaseParams{}

	resp, err := client.FlexV1.FetchPluginRelease("Sid",
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

$plugin_release = $twilio->flexApi->v1->pluginReleases("Sid")->fetch();

print $plugin_release->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_release = @client
                 .flex_api
                 .v1
                 .plugin_releases('Sid')
                 .fetch

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:fetch \
   --sid Sid
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Releases/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "configuration_sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Releases/FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple PluginRelease resources

`GET https://flex-api.twilio.com/v1/PluginService/Releases`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Plugin Releases

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPluginRelease() {
  const pluginReleases = await client.flexApi.v1.pluginReleases.list({
    limit: 20,
  });

  pluginReleases.forEach((p) => console.log(p.sid));
}

listPluginRelease();
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

plugin_releases = client.flex_api.v1.plugin_releases.list(limit=20)

for record in plugin_releases:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginReleases = await PluginReleaseResource.ReadAsync(limit: 20);

        foreach (var record in pluginReleases) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginRelease;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PluginRelease> pluginReleases = PluginRelease.reader().limit(20).read();

        for (PluginRelease record : pluginReleases) {
            System.out.println(record.getSid());
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
	flex "github.com/twilio/twilio-go/rest/flex/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &flex.ListPluginReleaseParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListPluginRelease(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$pluginReleases = $twilio->flexApi->v1->pluginReleases->read(20);

foreach ($pluginReleases as $record) {
    print $record->sid;
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

plugin_releases = @client
                  .flex_api
                  .v1
                  .plugin_releases
                  .list(limit: 20)

plugin_releases.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:list
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Releases?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "releases": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/PluginService/Releases?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/PluginService/Releases?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "releases"
  }
}
```
