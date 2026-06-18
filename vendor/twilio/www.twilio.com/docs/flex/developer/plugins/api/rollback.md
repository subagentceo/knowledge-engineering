# Rolling Back a Release using Plugins API

Sometimes, you need to roll-back a [Release](/docs/flex/developer/plugins/api). For example, maybe you pushed changes to your Flex contact center, found a bug, and now need to return to a previous stable version. The Plugins API makes it simpler and faster to do this.

## Fetch The Releases previously Active on Flex

Start by retrieving the list of Releases previously active on your account

Read the List of Releases

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
  "releases": [
    {
      "sid": "FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "configuration_sid": "FJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2020-01-10T20:00:00Z",
      "url": "https://flex-api.twilio.com/v1/PluginService/Releases/FKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
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

## Create a new Release from a prior Configuration

From the list of Releases, choose the one that you want to roll-back to. Copy the configuration\_sid of that release. You have to create a new Release with the configuration\_sid copied in order to make it active on your Flex contact center.

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
    configurationId: "FJ10000000000000000000000000000000",
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
    configuration_id="FJ10000000000000000000000000000000"
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
            configurationId: "FJ10000000000000000000000000000000");

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
        PluginRelease pluginRelease = PluginRelease.creator("FJ10000000000000000000000000000000").create();

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
	params.SetConfigurationId("FJ10000000000000000000000000000000")

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
    "FJ10000000000000000000000000000000" // ConfigurationId
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
                 .create(configuration_id: 'FJ10000000000000000000000000000000')

puts plugin_release.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:releases:create \
   --configuration-id FJ10000000000000000000000000000000
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Releases" \
--data-urlencode "ConfigurationId=FJ10000000000000000000000000000000" \
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

You've successfully rolled back your Contact Center to an operational version. Go hunt down that bug, and get ready to cut a new Release with the revised Plugin Code!

## Next Steps

* [Review the steps for cutting a release for your contact center](/docs/flex/developer/plugins/api/release-update)
* [Learn how to deploy and release plugins using the Flex Plugins CLI](/docs/flex/developer/plugins/cli/deploy-and-release)
* [Get a refresher on Plugin Development](/docs/flex/quickstart/getting-started-plugin)
