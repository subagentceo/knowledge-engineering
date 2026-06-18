# Plugin Configuration Resource

Configurations contain a snapshot of your contact center's customizations so that it can be audited or rolled back. It is a package of your plugin versions that you bundle together for a release. Configurations contain Plugin Version SIDs and are defined as a list of JSON strings. For example:

```xml
[{"plugin_version": "FV00000000000000000000000000000000"}, {"plugin_version": "FV00000000000000000000000000000001"}]
```

Configurations are *immutable*; in order to update your contact center's Configuration, you must create a new Configuration.

## Configuration Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.plugin_configuration","modelName":"flex_v1_plugin_configuration","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FJ[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Flex Plugin Configuration resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Flex Plugin Configuration resource and owns this resource."},"name":{"type":"string","nullable":true,"description":"The name of this Flex Plugin Configuration."},"description":{"type":"string","nullable":true,"description":"The description of the Flex Plugin Configuration resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"archived":{"type":"boolean","nullable":true,"description":"Whether the Flex Plugin Configuration is archived. The default value is false."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the Flex Plugin Configuration was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Flex Plugin Configuration resource."},"links":{"type":"object","format":"uri-map","nullable":true}}}} />

## Create a PluginConfiguration resource

`POST https://flex-api.twilio.com/v1/PluginService/Configurations`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePluginConfigurationRequest","required":["Name"],"properties":{"Name":{"type":"string","description":"The Flex Plugin Configuration's name."},"Plugins":{"type":"array","description":"A list of objects that describe the plugin versions included in the configuration. Each object contains the sid of the plugin version."},"Description":{"type":"string","description":"The Flex Plugin Configuration's description.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Name\": \"some name\",\n  \"Description\": \"description\",\n  \"Plugins\": [\n    \"{\\\"plugin_version\\\": \\\"FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\", \\\"phase\\\": 3}\"\n  ]\n}","meta":"","code":"{\n  \"Name\": \"some name\",\n  \"Description\": \"description\",\n  \"Plugins\": [\n    \"{\\\"plugin_version\\\": \\\"FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\", \\\"phase\\\": 3}\"\n  ]\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"some name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Description\"","#7EE787"],[":","#C9D1D9"]," ",["\"description\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Plugins\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["plugin_version","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"]," ",["\\\"","#79C0FF"],["phase","#A5D6FF"],["\\\"","#79C0FF"],[": 3}\"","#A5D6FF"],"\n  ",["]","#C9D1D9"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Configuration with a single Plugin

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPluginConfiguration() {
  const pluginConfiguration =
    await client.flexApi.v1.pluginConfigurations.create({
      name: "Miss Christine Morgan",
      plugins: [
        {
          plugin_version: "FV00000000000000000000000000000000",
        },
      ],
    });

  console.log(pluginConfiguration.sid);
}

createPluginConfiguration();
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

plugin_configuration = client.flex_api.v1.plugin_configurations.create(
    plugins=[{"plugin_version": "FV00000000000000000000000000000000"}],
    name="Miss Christine Morgan",
)

print(plugin_configuration.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginConfiguration = await PluginConfigurationResource.CreateAsync(
            plugins: new List<Object> { new Dictionary<string, Object>() {
                { "plugin_version", "FV00000000000000000000000000000000" }
            } },
            name: "Miss Christine Morgan");

        Console.WriteLine(pluginConfiguration.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginConfiguration pluginConfiguration =
            PluginConfiguration.creator("Miss Christine Morgan")
                .setPlugins(Arrays.asList(new HashMap<String, Object>() {
                    {
                        put("plugin_version", "FV00000000000000000000000000000000");
                    }
                }))
                .create();

        System.out.println(pluginConfiguration.getSid());
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

	params := &flex.CreatePluginConfigurationParams{}
	params.SetPlugins([]interface{}{
		map[string]interface{}{
			"plugin_version": "FV00000000000000000000000000000000",
		},
	})
	params.SetName("Miss Christine Morgan")

	resp, err := client.FlexV1.CreatePluginConfiguration(params)
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

$plugin_configuration = $twilio->flexApi->v1->pluginConfigurations->create(
    "Miss Christine Morgan", // Name
    [
        "plugins" => [
            [
                "plugin_version" => "FV00000000000000000000000000000000",
            ],
        ],
    ]
);

print $plugin_configuration->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_configuration = @client
                       .flex_api
                       .v1
                       .plugin_configurations
                       .create(
                         plugins: [
                           {
                             'plugin_version' => 'FV00000000000000000000000000000000'
                           }
                         ],
                         name: 'Miss Christine Morgan'
                       )

puts plugin_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:create \
   --plugins "{\"plugin_version\":\"FV00000000000000000000000000000000\"}" \
   --name "Miss Christine Morgan"
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Configurations" \
--data-urlencode "Plugins={\"plugin_version\":\"FV00000000000000000000000000000000\"}" \
--data-urlencode "Name=Miss Christine Morgan" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "Miss Christine Morgan",
  "description": "description",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugins": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins"
  }
}
```

Create a Configuration with multiple Plugins

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPluginConfiguration() {
  const pluginConfiguration =
    await client.flexApi.v1.pluginConfigurations.create({
      name: "Miss Christine Morgan",
      plugins: [
        {
          plugin_version: "FV00000000000000000000000000000000",
        },
        {
          plugin_version: "FV00000000000000000000000000000001",
        },
      ],
    });

  console.log(pluginConfiguration.sid);
}

createPluginConfiguration();
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

plugin_configuration = client.flex_api.v1.plugin_configurations.create(
    plugins=[
        {"plugin_version": "FV00000000000000000000000000000000"},
        {"plugin_version": "FV00000000000000000000000000000001"},
    ],
    name="Miss Christine Morgan",
)

print(plugin_configuration.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginConfiguration = await PluginConfigurationResource.CreateAsync(
            plugins: new List<
                Object> { new Dictionary<string, Object>() { { "plugin_version", "FV00000000000000000000000000000000" } }, new Dictionary<string, Object>() { { "plugin_version", "FV00000000000000000000000000000001" } } },
            name: "Miss Christine Morgan");

        Console.WriteLine(pluginConfiguration.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginConfiguration pluginConfiguration =
            PluginConfiguration.creator("Miss Christine Morgan")
                .setPlugins(Arrays.asList(
                    new HashMap<String, Object>() {
                        {
                            put("plugin_version", "FV00000000000000000000000000000000");
                        }
                    },
                    new HashMap<String, Object>() {
                        {
                            put("plugin_version", "FV00000000000000000000000000000001");
                        }
                    }))
                .create();

        System.out.println(pluginConfiguration.getSid());
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

	params := &flex.CreatePluginConfigurationParams{}
	params.SetPlugins([]interface{}{
		map[string]interface{}{
			"plugin_version": "FV00000000000000000000000000000000",
		},
		map[string]interface{}{
			"plugin_version": "FV00000000000000000000000000000001",
		},
	})
	params.SetName("Miss Christine Morgan")

	resp, err := client.FlexV1.CreatePluginConfiguration(params)
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

$plugin_configuration = $twilio->flexApi->v1->pluginConfigurations->create(
    "Miss Christine Morgan", // Name
    [
        "plugins" => [
            [
                "plugin_version" => "FV00000000000000000000000000000000",
            ],
            [
                "plugin_version" => "FV00000000000000000000000000000001",
            ],
        ],
    ]
);

print $plugin_configuration->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_configuration = @client
                       .flex_api
                       .v1
                       .plugin_configurations
                       .create(
                         plugins: [
                           {
                             'plugin_version' => 'FV00000000000000000000000000000000'
                           },
                           {
                             'plugin_version' => 'FV00000000000000000000000000000001'
                           }
                         ],
                         name: 'Miss Christine Morgan'
                       )

puts plugin_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:create \
   --plugins "{\"plugin_version\":\"FV00000000000000000000000000000000\"}" "{\"plugin_version\":\"FV00000000000000000000000000000001\"}" \
   --name "Miss Christine Morgan"
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Configurations" \
--data-urlencode "Plugins={\"plugin_version\":\"FV00000000000000000000000000000000\"}" \
--data-urlencode "Plugins={\"plugin_version\":\"FV00000000000000000000000000000001\"}" \
--data-urlencode "Name=Miss Christine Morgan" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "Miss Christine Morgan",
  "description": "description",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugins": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins"
  }
}
```

## Fetch a PluginConfiguration resource

`GET https://flex-api.twilio.com/v1/PluginService/Configurations/{Sid}`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flex Plugin Configuration resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FJ[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Plugin Configuration

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPluginConfiguration() {
  const pluginConfiguration = await client.flexApi.v1
    .pluginConfigurations("FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(pluginConfiguration.sid);
}

fetchPluginConfiguration();
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

plugin_configuration = client.flex_api.v1.plugin_configurations(
    "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(plugin_configuration.sid)
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

        var pluginConfiguration = await PluginConfigurationResource.FetchAsync(
            pathSid: "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(pluginConfiguration.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginConfiguration pluginConfiguration =
            PluginConfiguration.fetcher("FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(pluginConfiguration.getSid());
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

	params := &flex.FetchPluginConfigurationParams{}

	resp, err := client.FlexV1.FetchPluginConfiguration("FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$plugin_configuration = $twilio->flexApi->v1
    ->pluginConfigurations("FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $plugin_configuration->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_configuration = @client
                       .flex_api
                       .v1
                       .plugin_configurations('FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                       .fetch

puts plugin_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:fetch \
   --sid FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "some name",
  "description": "description",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugins": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins"
  }
}
```

## Read multiple PluginConfiguration resources

`GET https://flex-api.twilio.com/v1/PluginService/Configurations`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Plugin Configurations

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPluginConfiguration() {
  const pluginConfigurations =
    await client.flexApi.v1.pluginConfigurations.list({ limit: 20 });

  pluginConfigurations.forEach((p) => console.log(p.sid));
}

listPluginConfiguration();
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

plugin_configurations = client.flex_api.v1.plugin_configurations.list(limit=20)

for record in plugin_configurations:
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

        var pluginConfigurations = await PluginConfigurationResource.ReadAsync(limit: 20);

        foreach (var record in pluginConfigurations) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.PluginConfiguration;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PluginConfiguration> pluginConfigurations = PluginConfiguration.reader().limit(20).read();

        for (PluginConfiguration record : pluginConfigurations) {
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

	params := &flex.ListPluginConfigurationParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListPluginConfiguration(params)
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

$pluginConfigurations = $twilio->flexApi->v1->pluginConfigurations->read(20);

foreach ($pluginConfigurations as $record) {
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

plugin_configurations = @client
                        .flex_api
                        .v1
                        .plugin_configurations
                        .list(limit: 20)

plugin_configurations.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:list
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Configurations?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "configurations": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/PluginService/Configurations?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/PluginService/Configurations?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "configurations"
  }
}
```
