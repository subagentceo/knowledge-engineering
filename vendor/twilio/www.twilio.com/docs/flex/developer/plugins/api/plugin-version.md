# Plugin Version Resource

A Plugin Version contains all the information about a particular version of a [Plugin](/docs/flex/developer/plugins/api/plugin). Some notable fields include the URL to the plugin package, the version number and what plugin is it the version of.

Providing a URL to the built package in the plugin version provides you the flexibility of hosting your package in the software of your choice.

## Version Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.plugin.plugin_version","modelName":"flex_v1_plugin_plugin_version","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FV[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Flex Plugin Version resource."},"plugin_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Flex Plugin resource this Flex Plugin Version belongs to."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Flex Plugin Version resource and owns this resource."},"version":{"type":"string","nullable":true,"description":"The unique version of this Flex Plugin Version."},"plugin_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of where the Flex Plugin Version JavaScript bundle is hosted on.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"changelog":{"type":"string","nullable":true,"description":"A changelog that describes the changes this Flex Plugin Version brings.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"private":{"type":"boolean","nullable":true,"description":"Whether the Flex Plugin Version is validated. The default value is false."},"archived":{"type":"boolean","nullable":true,"description":"Whether the Flex Plugin Version is archived. The default value is false."},"validated":{"type":"boolean","nullable":true},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the Flex Plugin Version was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Flex Plugin Version resource."}}}} />

## Create a PluginVersion resource

`POST https://flex-api.twilio.com/v1/PluginService/Plugins/{PluginSid}/Versions`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"PluginSid","in":"path","description":"The SID of the Flex Plugin the resource to belongs to.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePluginVersionRequest","required":["Version","PluginUrl"],"properties":{"Version":{"type":"string","description":"The Flex Plugin Version's version."},"PluginUrl":{"type":"string","format":"uri","description":"The URL of the Flex Plugin Version bundle","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Changelog":{"type":"string","description":"The changelog of the Flex Plugin Version.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Private":{"type":"boolean","description":"Whether this Flex Plugin Version requires authorization."},"CliVersion":{"type":"string","description":"The version of Flex Plugins CLI used to create this plugin"},"ValidateStatus":{"type":"string","description":"The validation status of the plugin, indicating whether it has been validated"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true\n}","meta":"","code":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Version\"","#7EE787"],[":","#C9D1D9"]," ",["\"1.0.0\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PluginUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://sample.twil.io/plugin.js\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Changelog\"","#7EE787"],[":","#C9D1D9"]," ",["\"the changelog\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Private\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithCliVersion":{"value":{"lang":"json","value":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true,\n  \"CliVersion\": \"6.3.2\"\n}","meta":"","code":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true,\n  \"CliVersion\": \"6.3.2\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Version\"","#7EE787"],[":","#C9D1D9"]," ",["\"1.0.0\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PluginUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://sample.twil.io/plugin.js\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Changelog\"","#7EE787"],[":","#C9D1D9"]," ",["\"the changelog\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Private\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CliVersion\"","#7EE787"],[":","#C9D1D9"]," ",["\"6.3.2\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithCliAndValidateStatus":{"value":{"lang":"json","value":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true,\n  \"CliVersion\": \"6.3.2\",\n  \"ValidateStatus\": \"success\"\n}","meta":"","code":"{\n  \"Version\": \"1.0.0\",\n  \"PluginUrl\": \"https://sample.twil.io/plugin.js\",\n  \"Changelog\": \"the changelog\",\n  \"Private\": true,\n  \"CliVersion\": \"6.3.2\",\n  \"ValidateStatus\": \"success\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Version\"","#7EE787"],[":","#C9D1D9"]," ",["\"1.0.0\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PluginUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://sample.twil.io/plugin.js\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Changelog\"","#7EE787"],[":","#C9D1D9"]," ",["\"the changelog\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Private\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CliVersion\"","#7EE787"],[":","#C9D1D9"]," ",["\"6.3.2\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ValidateStatus\"","#7EE787"],[":","#C9D1D9"]," ",["\"success\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Plugin Version

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
      pluginUrl: "https://www.example.com",
      version: "Version",
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
    version="Version", plugin_url="https://www.example.com"
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
            version: "Version",
            pluginUrl: new Uri("https://www.example.com"),
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
            PluginVersions.creator("PluginSid", "Version", URI.create("https://www.example.com")).create();

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
	params.SetVersion("Version")
	params.SetPluginUrl("https://www.example.com")

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
        "Version", // Version
        "https://www.example.com" // PluginUrl
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
                   version: 'Version',
                   plugin_url: 'https://www.example.com'
                 )

puts plugin_version.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:versions:create \
   --plugin-sid PluginSid \
   --version Version \
   --plugin-url https://www.example.com
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/PluginService/Plugins/PluginSid/Versions" \
--data-urlencode "Version=Version" \
--data-urlencode "PluginUrl=https://www.example.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "plugin_sid": "PluginSid",
  "version": "Version",
  "plugin_url": "https://www.example.com",
  "changelog": "the changelog",
  "private": true,
  "archived": false,
  "validated": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions/FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a PluginVersion resource

`GET https://flex-api.twilio.com/v1/PluginService/Plugins/{PluginSid}/Versions/{Sid}`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"PluginSid","in":"path","description":"The SID of the Flex Plugin the resource to belongs to.","schema":{"type":"string"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Flex Plugin Version resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Plugin Version

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPluginVersion() {
  const pluginVersion = await client.flexApi.v1
    .plugins("PluginSid")
    .pluginVersions("Sid")
    .fetch();

  console.log(pluginVersion.sid);
}

fetchPluginVersion();
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

plugin_version = (
    client.flex_api.v1.plugins("PluginSid").plugin_versions("Sid").fetch()
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

        var pluginVersions =
            await PluginVersionsResource.FetchAsync(pathPluginSid: "PluginSid", pathSid: "Sid");

        Console.WriteLine(pluginVersions.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.plugin.PluginVersions;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PluginVersions pluginVersions = PluginVersions.fetcher("PluginSid", "Sid").fetch();

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

	params := &flex.FetchPluginVersionParams{}

	resp, err := client.FlexV1.FetchPluginVersion("PluginSid",
		"Sid",
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
    ->pluginVersions("Sid")
    ->fetch();

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
                 .plugin_versions('Sid')
                 .fetch

puts plugin_version.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:versions:fetch \
   --plugin-sid PluginSid \
   --sid Sid
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Plugins/PluginSid/Versions/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "plugin_sid": "PluginSid",
  "version": "1.0.0",
  "plugin_url": "https://sample.twil.io/plugin.js",
  "changelog": "the changelog",
  "private": false,
  "archived": false,
  "validated": false,
  "date_created": "2020-01-10T20:00:00Z",
  "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions/FVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple PluginVersion resources

`GET https://flex-api.twilio.com/v1/PluginService/Plugins/{PluginSid}/Versions`

### Headers

```json
[{"name":"Flex-Metadata","in":"header","description":"The Flex-Metadata HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"PluginSid","in":"path","description":"The SID of the Flex Plugin the resource to belongs to.","schema":{"type":"string"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Plugin Versions

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPluginVersion() {
  const pluginVersions = await client.flexApi.v1
    .plugins("PluginSid")
    .pluginVersions.list({ limit: 20 });

  pluginVersions.forEach((p) => console.log(p.sid));
}

listPluginVersion();
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

plugin_versions = client.flex_api.v1.plugins("PluginSid").plugin_versions.list(
    limit=20
)

for record in plugin_versions:
    print(record.sid)
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

        var pluginVersions =
            await PluginVersionsResource.ReadAsync(pathPluginSid: "PluginSid", limit: 20);

        foreach (var record in pluginVersions) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.plugin.PluginVersions;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PluginVersions> pluginVersions = PluginVersions.reader("PluginSid").limit(20).read();

        for (PluginVersions record : pluginVersions) {
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

	params := &flex.ListPluginVersionParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListPluginVersion("PluginSid",
		params)
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

$pluginVersions = $twilio->flexApi->v1
    ->plugins("PluginSid")
    ->pluginVersions->read(20);

foreach ($pluginVersions as $record) {
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

plugin_versions = @client
                  .flex_api
                  .v1
                  .plugins('PluginSid')
                  .plugin_versions
                  .list(limit: 20)

plugin_versions.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:plugin-service:plugins:versions:list \
   --plugin-sid PluginSid
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/PluginService/Plugins/PluginSid/Versions?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "plugin_versions": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/PluginService/Plugins/FPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Versions?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "plugin_versions"
  }
}
```
