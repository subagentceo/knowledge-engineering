# Plugin Resource

A Plugin is a resource that contains information about a given plugin, like its name, description, and the account that owns the plugin.

While the [Plugin Version Resource](/docs/flex/developer/plugins/api/plugin-version) contains information on the actual source code for a deployed Plugin, the Plugin Resource serves as an identifier for the Plugin itself. For example, you might have a **CRM plugin.** You can use the Plugin Resource to describe the plugin itself, and then a series of Plugin Versions to reference the source code of your various iterations of the Plugin.

## Plugin Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.plugin","modelName":"flex_v1_plugin","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FP[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Flex Plugin resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Flex Plugin resource and owns this resource."},"unique_name":{"type":"string","nullable":true,"description":"The name that uniquely identifies this Flex Plugin resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"friendly_name":{"type":"string","nullable":true,"description":"The friendly name this Flex Plugin resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"description":{"type":"string","nullable":true,"description":"A descriptive string that you create to describe the plugin resource. It can be up to 500 characters long","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"archived":{"type":"boolean","nullable":true,"description":"Whether the Flex Plugin is archived. The default value is false."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT-7 when the Flex Plugin was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT-7 when the Flex Plugin was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Flex Plugin resource."},"links":{"type":"object","format":"uri-map","nullable":true}}}} />

## Create a Plugin resource

`POST https://flex-api.twilio.com/v1/PluginService/Plugins`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePluginRequest","required":["UniqueName"],"properties":{"UniqueName":{"type":"string","description":"The Flex Plugin's unique name.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"FriendlyName":{"type":"string","description":"The Flex Plugin's friendly name.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Description":{"type":"string","description":"A descriptive string that you create to describe the plugin resource. It can be up to 500 characters long","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"UniqueName\": \"unique-name\",\n  \"FriendlyName\": \"friendly name\",\n  \"Description\": \"description\"\n}","meta":"","code":"{\n  \"UniqueName\": \"unique-name\",\n  \"FriendlyName\": \"friendly name\",\n  \"Description\": \"description\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"unique-name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"description\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Plugin

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPlugin() {
  const plugin = await client.flexApi.v1.plugins.create({
    uniqueName: "UniqueName",
  });

  console.log(plugin.sid);
}

createPlugin();
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

plugin = client.flex_api.v1.plugins.create(unique_name="UniqueName")

print(plugin.sid)
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

        var plugin = await PluginResource.CreateAsync(uniqueName: "UniqueName");

        Console.WriteLine(plugin.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Plugin;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Plugin plugin = Plugin.creator("UniqueName").create();

        System.out.println(plugin.getSid());
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

	params := &flex.CreatePluginParams{}
	params.SetUniqueName("UniqueName")

	resp, err := client.FlexV1.CreatePlugin(params)
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

$plugin = $twilio->flexApi->v1->plugins->create(
    "UniqueName" // UniqueName
);

print $plugin->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin = @client
         .flex_api
         .v1
         .plugins
         .create(unique_name: 'UniqueName')

puts plugin.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:create \
   --unique-name UniqueName
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Plugins" \
--data-urlencode "UniqueName=UniqueName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "UniqueName",
  "friendly_name": "friendly name",
  "description": "description",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "date_updated": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugin_versions": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions"
  }
}
```

## Fetch a Plugin resource

`GET https://flex-api.twilio.com/v1/PluginService/Plugins/{Sid}`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flex Plugin resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Plugin

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPlugin() {
  const plugin = await client.flexApi.v1.plugins("Sid").fetch();

  console.log(plugin.sid);
}

fetchPlugin();
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

plugin = client.flex_api.v1.plugins("Sid").fetch()

print(plugin.sid)
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

        var plugin = await PluginResource.FetchAsync(pathSid: "Sid");

        Console.WriteLine(plugin.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Plugin;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Plugin plugin = Plugin.fetcher("Sid").fetch();

        System.out.println(plugin.getSid());
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

	params := &flex.FetchPluginParams{}

	resp, err := client.FlexV1.FetchPlugin("Sid",
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

$plugin = $twilio->flexApi->v1->plugins("Sid")->fetch();

print $plugin->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin = @client
         .flex_api
         .v1
         .plugins('Sid')
         .fetch

puts plugin.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:fetch \
   --sid Sid
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Plugins/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "unique-name",
  "friendly_name": "friendly name",
  "description": "description",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "date_updated": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugin_versions": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions"
  }
}
```

## Read multiple Plugin resources

`GET https://flex-api.twilio.com/v1/PluginService/Plugins`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Plugins

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPlugin() {
  const plugins = await client.flexApi.v1.plugins.list({ limit: 20 });

  plugins.forEach((p) => console.log(p.sid));
}

listPlugin();
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

plugins = client.flex_api.v1.plugins.list(limit=20)

for record in plugins:
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

        var plugins = await PluginResource.ReadAsync(limit: 20);

        foreach (var record in plugins) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Plugin;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Plugin> plugins = Plugin.reader().limit(20).read();

        for (Plugin record : plugins) {
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

	params := &flex.ListPluginParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListPlugin(params)
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

$plugins = $twilio->flexApi->v1->plugins->read(20);

foreach ($plugins as $record) {
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

plugins = @client
          .flex_api
          .v1
          .plugins
          .list(limit: 20)

plugins.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:list
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Plugins?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "plugins": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/PluginService/Plugins?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/PluginService/Plugins?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "plugins"
  }
}
```

## Update a Plugin resource

`POST https://flex-api.twilio.com/v1/PluginService/Plugins/{Sid}`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flex Plugin resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdatePluginRequest","properties":{"FriendlyName":{"type":"string","description":"The Flex Plugin's friendly name.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Description":{"type":"string","description":"A descriptive string that you update to describe the plugin resource. It can be up to 500 characters long","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly name update\",\n  \"Description\": \"description update\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly name update\",\n  \"Description\": \"description update\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly name update\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"description update\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Plugin

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updatePlugin() {
  const plugin = await client.flexApi.v1
    .plugins("Sid")
    .update({ friendlyName: "FriendlyName" });

  console.log(plugin.sid);
}

updatePlugin();
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

plugin = client.flex_api.v1.plugins("Sid").update(friendly_name="FriendlyName")

print(plugin.sid)
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

        var plugin = await PluginResource.UpdateAsync(friendlyName: "FriendlyName", pathSid: "Sid");

        Console.WriteLine(plugin.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Plugin;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Plugin plugin = Plugin.updater("Sid").setFriendlyName("FriendlyName").update();

        System.out.println(plugin.getSid());
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

	params := &flex.UpdatePluginParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.FlexV1.UpdatePlugin("Sid",
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

$plugin = $twilio->flexApi->v1
    ->plugins("Sid")
    ->update(["friendlyName" => "FriendlyName"]);

print $plugin->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin = @client
         .flex_api
         .v1
         .plugins('Sid')
         .update(friendly_name: 'FriendlyName')

puts plugin.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:update \
   --sid Sid \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Plugins/Sid" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "unique-name",
  "friendly_name": "FriendlyName",
  "description": "description update",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "date_updated": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugin_versions": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions"
  }
}
```
