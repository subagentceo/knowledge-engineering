# Create a new release with new and updated Plugins

So, you've already [created a Release](/docs/flex/developer/plugins/api/release-guide) that contains a few [Plugin Versions](/docs/flex/developer/plugins/api/plugin-version). This guide takes you through the steps of how to roll out a new version of a plugin that is already active on your contact center or introduce a new plugin in your Flex contact center.

The recommended flow involves retrieving the currently active Release and the configuration associated with it. You can copy the list of current Plugins from the Configuration, and make your desired updates to the list. You need to then create a new Configuration, and finally, cut a new Release.

All of these steps can be accomplished via API - read on to get more detailed instructions.

## Fetch The Active Release

Start by fetching the active Release. This will show you the current Configuration SID.

Fetch the Active Release

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPluginRelease() {
  const pluginRelease = await client.flexApi.v1
    .pluginReleases("Active")
    .fetch();

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

plugin_release = client.flex_api.v1.plugin_releases("Active").fetch()

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

        var pluginRelease = await PluginReleaseResource.FetchAsync(pathSid: "Active");

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
        PluginRelease pluginRelease = PluginRelease.fetcher("Active").fetch();

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

	resp, err := client.FlexV1.FetchPluginRelease("Active",
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

$plugin_release = $twilio->flexApi->v1->pluginReleases("Active")->fetch();

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
                 .plugin_releases('Active')
                 .fetch

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:fetch \
   --sid Active
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Releases/Active" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Active",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "configuration_sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Releases/FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read the list of Plugins active on your Contact Center

Start by fetching the active Release. This will show you the current Configuration SID. You can read the plugins active on Flex, by looking up the configuration by the Configuration SID

Fetch the Configuration associated with the Release

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
    .pluginConfigurations("FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
    "FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
            pathSid: "FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
            PluginConfiguration.fetcher("FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

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

	resp, err := client.FlexV1.FetchPluginConfiguration("FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->pluginConfigurations("FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
                       .plugin_configurations('FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .fetch

puts plugin_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:fetch \
   --sid FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Configurations/FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

Retrieve List of Plugins

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConfiguredPlugin() {
  const plugins = await client.flexApi.v1
    .pluginConfigurations("FJ10000000000000000000000000000000")
    .plugins.list({ limit: 20 });

  plugins.forEach((p) => console.log(p.accountSid));
}

listConfiguredPlugin();
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

plugins = client.flex_api.v1.plugin_configurations(
    "FJ10000000000000000000000000000000"
).plugins.list(limit=20)

for record in plugins:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.PluginConfiguration;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var configuredPlugins = await ConfiguredPluginResource.ReadAsync(
            pathConfigurationSid: "FJ10000000000000000000000000000000", limit: 20);

        foreach (var record in configuredPlugins) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.pluginconfiguration.ConfiguredPlugin;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ConfiguredPlugin> configuredPlugins =
            ConfiguredPlugin.reader("FJ10000000000000000000000000000000").limit(20).read();

        for (ConfiguredPlugin record : configuredPlugins) {
            System.out.println(record.getAccountSid());
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

	params := &flex.ListConfiguredPluginParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListConfiguredPlugin("FJ10000000000000000000000000000000",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
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

$plugins = $twilio->flexApi->v1
    ->pluginConfigurations("FJ10000000000000000000000000000000")
    ->plugins->read(20);

foreach ($plugins as $record) {
    print $record->accountSid;
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
          .plugin_configurations('FJ10000000000000000000000000000000')
          .plugins
          .list(limit: 20)

plugins.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:plugins:list \
   --configuration-sid FJ10000000000000000000000000000000
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Configurations/FJ10000000000000000000000000000000/Plugins?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "plugins": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "plugins"
  }
}
```

## Create a new Configuration

Use the information from the old configuration to create a new Configuration. In this case, add the new Plugin Version SID you want to roll out to your Flex account, to the list of existing SIDs.

You could also update or remove an existing Plugin Version from the list.

Create a new Configuration

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
      description: "This is a new configuration",
      name: "Miss Christine Morgan",
      plugins: [
        {
          plugin_version: "FV00000000000000000000000000000000",
        },
        {
          plugin_version: "FV10000000000000000000000000000001",
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
    description="This is a new configuration",
    plugins=[
        {"plugin_version": "FV00000000000000000000000000000000"},
        {"plugin_version": "FV10000000000000000000000000000001"},
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
            description: "This is a new configuration",
            plugins: new List<
                Object> { new Dictionary<string, Object>() { { "plugin_version", "FV00000000000000000000000000000000" } }, new Dictionary<string, Object>() { { "plugin_version", "FV10000000000000000000000000000001" } } },
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
                .setDescription("This is a new configuration")
                .setPlugins(Arrays.asList(
                    new HashMap<String, Object>() {
                        {
                            put("plugin_version", "FV00000000000000000000000000000000");
                        }
                    },
                    new HashMap<String, Object>() {
                        {
                            put("plugin_version", "FV10000000000000000000000000000001");
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
	params.SetDescription("This is a new configuration")
	params.SetPlugins([]interface{}{
		map[string]interface{}{
			"plugin_version": "FV00000000000000000000000000000000",
		},
		map[string]interface{}{
			"plugin_version": "FV10000000000000000000000000000001",
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
        "description" => "This is a new configuration",
        "plugins" => [
            [
                "plugin_version" => "FV00000000000000000000000000000000",
            ],
            [
                "plugin_version" => "FV10000000000000000000000000000001",
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
                         description: 'This is a new configuration',
                         plugins: [
                           {
                             'plugin_version' => 'FV00000000000000000000000000000000'
                           },
                           {
                             'plugin_version' => 'FV10000000000000000000000000000001'
                           }
                         ],
                         name: 'Miss Christine Morgan'
                       )

puts plugin_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:configurations:create \
   --description "This is a new configuration" \
   --plugins "{\"plugin_version\":\"FV00000000000000000000000000000000\"}" "{\"plugin_version\":\"FV10000000000000000000000000000001\"}" \
   --name "Miss Christine Morgan"
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Configurations" \
--data-urlencode "Description=This is a new configuration" \
--data-urlencode "Plugins={\"plugin_version\":\"FV00000000000000000000000000000000\"}" \
--data-urlencode "Plugins={\"plugin_version\":\"FV10000000000000000000000000000001\"}" \
--data-urlencode "Name=Miss Christine Morgan" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "Miss Christine Morgan",
  "description": "This is a new configuration",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugins": "https://flex-api.twilio.com/v1/PluginService/Configurations/FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Plugins"
  }
}
```

Finally, you're ready to create a new Release.

Create a new Release

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
    configurationId: "FJ10000000000000000000000000000001",
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
    configuration_id="FJ10000000000000000000000000000001"
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

        var pluginRelease = await PluginReleaseResource.CreateAsync(
            configurationId: "FJ10000000000000000000000000000001");

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
        PluginRelease pluginRelease = PluginRelease.creator("FJ10000000000000000000000000000001").create();

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
	params.SetConfigurationId("FJ10000000000000000000000000000001")

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
    "FJ10000000000000000000000000000001" // ConfigurationId
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
                 .create(configuration_id: 'FJ10000000000000000000000000000001')

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:create \
   --configuration-id FJ10000000000000000000000000000001
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Releases" \
--data-urlencode "ConfigurationId=FJ10000000000000000000000000000001" \
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

Congratulations - you've successfully rolled out new changes to your contact center, and should see your updated Plugins on the Developer Setup Page in Flex.

## Next Steps

[Learn how to roll back your Release to an older Release](/docs/flex/developer/plugins/api/rollback)
