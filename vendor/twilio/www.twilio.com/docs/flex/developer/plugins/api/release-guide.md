# Releasing Flex plugins with the Plugins API

This document guides you through using the Plugins API to release [Flex Plugins](/docs/flex/developer/ui-and-plugins) to your contact center.

## Prerequisites

You must already have a plugin available and hosted somewhere. You will need its destination URL when creating a `PluginVersion`. For retrieving the destination URL of a plugin version already hosted, run the following command in the folder of your plugin.

This command will list all the versions of the Plugin you have deployed along with its destination URL.

```bash
npm run list
```

Our guide on [configuring your local environment](/docs/flex/developer/plugins/cli/install) will help you use the Plugin Builder to build a plugin and deploy it using Twilio Assets.

## Create a Plugin Resource

For a new plugin, you must first create a `Plugin` resource. We recommend using the same `UniqueName` that you used when creating your local plugin directory, such as `plugin-sample`. This `Plugin` entity will be used for all subsequent versions of the plugin that you plan to release.

Create a Plugin Resource

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
    description: "My first plugin",
    friendlyName: "Sample Plugin",
    uniqueName: "plugin-sample",
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

plugin = client.flex_api.v1.plugins.create(
    friendly_name="Sample Plugin",
    unique_name="plugin-sample",
    description="My first plugin",
)

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

        var plugin = await PluginResource.CreateAsync(
            friendlyName: "Sample Plugin",
            uniqueName: "plugin-sample",
            description: "My first plugin");

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
        Plugin plugin =
            Plugin.creator("plugin-sample").setFriendlyName("Sample Plugin").setDescription("My first plugin").create();

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
	params.SetFriendlyName("Sample Plugin")
	params.SetUniqueName("plugin-sample")
	params.SetDescription("My first plugin")

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
    "plugin-sample", // UniqueName
    [
        "friendlyName" => "Sample Plugin",
        "description" => "My first plugin",
    ]
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
         .create(
           friendly_name: 'Sample Plugin',
           unique_name: 'plugin-sample',
           description: 'My first plugin'
         )

puts plugin.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:create \
   --friendly-name "Sample Plugin" \
   --unique-name plugin-sample \
   --description "My first plugin"
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Plugins" \
--data-urlencode "FriendlyName=Sample Plugin" \
--data-urlencode "UniqueName=plugin-sample" \
--data-urlencode "Description=My first plugin" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "plugin-sample",
  "friendly_name": "Sample Plugin",
  "description": "My first plugin",
  "archived": false,
  "date_created": "2020-01-10T20:00:00Z",
  "date_updated": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "plugin_versions": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions"
  }
}
```

## Create a Version

Now, you can create a Version resource to indicate which version of the Plugin that you want to use in Flex. Use version `0.0.1`, since that's the version of the deployed Sample Plugin.

Create a Version

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPluginVersion() {
  const pluginVersion = await client.flexApi.v1
    .plugins("PluginSid")
    .pluginVersions.create({
      pluginUrl:
        "https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js",
      private: true,
      version: "0.0.1",
    });

  console.log(pluginVersion.sid);
}

createPluginVersion();
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

plugin_version = client.flex_api.v1.plugins("PluginSid").plugin_versions.create(
    private=True,
    version="0.0.1",
    plugin_url="https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js",
)

print(plugin_version.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Plugin;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var pluginVersions = await PluginVersionsResource.CreateAsync(
            _private: true,
            version: "0.0.1",
            pluginUrl: new Uri(
                "https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js"),
            pathPluginSid: "PluginSid");

        Console.WriteLine(pluginVersions.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.plugin.PluginVersions;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginVersions pluginVersions =
            PluginVersions
                .creator("PluginSid",
                    "0.0.1",
                    URI.create("https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js"))
                .set_private(true)
                .create();

        System.out.println(pluginVersions.getSid());
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

	params := &flex.CreatePluginVersionParams{}
	params.SetPrivate(true)
	params.SetVersion("0.0.1")
	params.SetPluginUrl("https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js")

	resp, err := client.FlexV1.CreatePluginVersion("PluginSid",
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

$plugin_version = $twilio->flexApi->v1
    ->plugins("PluginSid")
    ->pluginVersions->create(
        "0.0.1", // Version
        "https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js", // PluginUrl
        ["private" => true]
    );

print $plugin_version->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

plugin_version = @client
                 .flex_api
                 .v1
                 .plugins('PluginSid')
                 .plugin_versions
                 .create(
                   private: true,
                   version: '0.0.1',
                   plugin_url: 'https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js'
                 )

puts plugin_version.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:versions:create \
   --plugin-sid PluginSid \
   --private \
   --version 0.0.1 \
   --plugin-url https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Plugins/PluginSid/Versions" \
--data-urlencode "Private=true" \
--data-urlencode "Version=0.0.1" \
--data-urlencode "PluginUrl=https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "plugin_sid": "PluginSid",
  "version": "0.0.1",
  "plugin_url": "https://default-3254-f021k.twil.io/plugins/plugin-sample/0.0.1/bundle.js",
  "changelog": "the changelog",
  "private": true,
  "archived": false,
  "validated": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions/FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Create a Plugin Configuration

You now have a Plugin with a Version. You can prepare to load it into Flex by including the returned Version SID in a Configuration. The Configuration describes all of the Plugins that we'll eventually want to release to Flex.

Create a Configuration

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

## Release the Configuration

For our purposes we're only deploying one plugin, but you could include many plugins in a single configuration. Once your configuration includes all of your plugins at the correct version, you can create a new Release.

Create a Release

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
    configurationId: "FJ00000000000000000000000000000000",
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
    configuration_id="FJ00000000000000000000000000000000"
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
            configurationId: "FJ00000000000000000000000000000000");

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
        PluginRelease pluginRelease = PluginRelease.creator("FJ00000000000000000000000000000000").create();

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
	params.SetConfigurationId("FJ00000000000000000000000000000000")

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
    "FJ00000000000000000000000000000000" // ConfigurationId
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
                 .create(configuration_id: 'FJ00000000000000000000000000000000')

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:create \
   --configuration-id FJ00000000000000000000000000000000
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Releases" \
--data-urlencode "ConfigurationId=FJ00000000000000000000000000000000" \
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

Congratulations - your Plugin(s) should now be deployed!

You can confirm whether your plugin is enabled by logging into your Flex instance, navigating to the [Developer Setup Page](https://flex.twilio.com/admin/developers) and seeing it listed under the **Installed Plugins** section. Or, just start playing around with the new Configuration in the Flex UI to see all of the Plugins you configured at work!

## Next Steps

* [Create a new release with new and updated Plugins](/docs/flex/developer/plugins/api/release-update)
* [Roll back a release using the Plugins API](/docs/flex/developer/plugins/api/rollback)
