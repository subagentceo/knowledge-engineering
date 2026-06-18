# ExportConfiguration resource

The ExportConfiguration resource enables daily automatic generation of files ([Twilio Editions](https://www.twilio.com/en-us/editions) customers only) and sets the callback method for notification when file generation completes.

## Bulk export automation

> \[!NOTE]
>
> Bulk export automation for daily file exports is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

You can set daily automatic exports of activity logs from the Twilio platform. Automatic daily exports generate one data file per day for every resource enabled. The system typically attempts to create a data file based on the state of the data at the time of creation, but delays are possible.

## Set the callback method to notify when a file is complete

If you use bulk export automation or custom jobs, you can send a callback by webhook or email to notify you when a file is ready:

* For webhooks, the webhook method value must be either `GET` or `POST` and the webhook URL value should be the URL of the service you want to call when the file is available.
* For email, the email value should be a valid email address.

## Configuration Properties

<OperationTable type="properties" data={{"type":"object","refName":"bulkexports.v1.export_configuration","modelName":"bulkexports_v1_export_configuration","properties":{"enabled":{"type":"boolean","nullable":true,"description":"If true, Twilio will automatically generate every day's file when the day is over."},"webhook_url":{"type":"string","format":"uri","nullable":true,"description":"Stores the URL destination for the method specified in webhook_method."},"webhook_method":{"type":"string","nullable":true,"description":"Sets whether Twilio should call a webhook URL when the automatic generation is complete, using GET or POST. The actual destination is set in the webhook_url"},"resource_type":{"type":"string","nullable":true,"description":"The type of communication – Messages, Calls, Conferences, and Participants"},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this resource."}}}} />

## Fetch an ExportConfiguration resource

`GET https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Configuration`

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages, Calls, Conferences, and Participants","schema":{"type":"string"},"required":true}]
```

Fetch an Export Configuration for Messages

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchExportConfiguration() {
  const exportConfiguration = await client.bulkexports.v1
    .exportConfiguration("Messages")
    .fetch();

  console.log(exportConfiguration.enabled);
}

fetchExportConfiguration();
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

export_configuration = client.bulkexports.v1.export_configuration(
    "Messages"
).fetch()

print(export_configuration.enabled)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Bulkexports.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var exportConfiguration =
            await ExportConfigurationResource.FetchAsync(pathResourceType: "Messages");

        Console.WriteLine(exportConfiguration.Enabled);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.ExportConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExportConfiguration exportConfiguration = ExportConfiguration.fetcher("Messages").fetch();

        System.out.println(exportConfiguration.getEnabled());
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

	resp, err := client.BulkexportsV1.FetchExportConfiguration("Messages")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Enabled != nil {
			fmt.Println(*resp.Enabled)
		} else {
			fmt.Println(resp.Enabled)
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

$export_configuration = $twilio->bulkexports->v1
    ->exportConfiguration("Messages")
    ->fetch();

print $export_configuration->enabled;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

export_configuration = @client
                       .bulkexports
                       .v1
                       .export_configuration('Messages')
                       .fetch

puts export_configuration.enabled
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:configuration:fetch \
   --resource-type Messages
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Messages/Configuration" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Configuration",
  "enabled": true,
  "webhook_url": "",
  "webhook_method": "",
  "resource_type": "Messages"
}
```

Fetch an Export Configuration for Calls

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchExportConfiguration() {
  const exportConfiguration = await client.bulkexports.v1
    .exportConfiguration("Calls")
    .fetch();

  console.log(exportConfiguration.enabled);
}

fetchExportConfiguration();
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

export_configuration = client.bulkexports.v1.export_configuration(
    "Calls"
).fetch()

print(export_configuration.enabled)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Bulkexports.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var exportConfiguration =
            await ExportConfigurationResource.FetchAsync(pathResourceType: "Calls");

        Console.WriteLine(exportConfiguration.Enabled);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.ExportConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExportConfiguration exportConfiguration = ExportConfiguration.fetcher("Calls").fetch();

        System.out.println(exportConfiguration.getEnabled());
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

	resp, err := client.BulkexportsV1.FetchExportConfiguration("Calls")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Enabled != nil {
			fmt.Println(*resp.Enabled)
		} else {
			fmt.Println(resp.Enabled)
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

$export_configuration = $twilio->bulkexports->v1
    ->exportConfiguration("Calls")
    ->fetch();

print $export_configuration->enabled;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

export_configuration = @client
                       .bulkexports
                       .v1
                       .export_configuration('Calls')
                       .fetch

puts export_configuration.enabled
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:configuration:fetch \
   --resource-type Calls
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Calls/Configuration" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Configuration",
  "enabled": true,
  "webhook_url": "",
  "webhook_method": "",
  "resource_type": "Calls"
}
```

## Update an ExportConfiguration resource

`POST https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Configuration`

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages, Calls, Conferences, and Participants","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateExportConfigurationRequest","properties":{"Enabled":{"type":"boolean","description":"If true, Twilio will automatically generate every day's file when the day is over."},"WebhookUrl":{"type":"string","format":"uri","description":"Stores the URL destination for the method specified in webhook_method."},"WebhookMethod":{"type":"string","description":"Sets whether Twilio should call a webhook URL when the automatic generation is complete, using GET or POST. The actual destination is set in the webhook_url"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Enabled\": true\n}","meta":"","code":"{\n  \"Enabled\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Enabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update Export Configuration

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateExportConfiguration() {
  const exportConfiguration = await client.bulkexports.v1
    .exportConfiguration("Messages")
    .update({
      webhookMethod: "GET",
      webhookUrl: "https://api.your-infrastructure.com/receive-messages/",
    });

  console.log(exportConfiguration.enabled);
}

updateExportConfiguration();
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

export_configuration = client.bulkexports.v1.export_configuration(
    "Messages"
).update(
    webhook_method="GET",
    webhook_url="https://api.your-infrastructure.com/receive-messages/",
)

print(export_configuration.enabled)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Bulkexports.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var exportConfiguration = await ExportConfigurationResource.UpdateAsync(
            webhookMethod: "GET",
            webhookUrl: new Uri("https://api.your-infrastructure.com/receive-messages/"),
            pathResourceType: "Messages");

        Console.WriteLine(exportConfiguration.Enabled);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.ExportConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExportConfiguration exportConfiguration =
            ExportConfiguration.updater("Messages")
                .setWebhookMethod("GET")
                .setWebhookUrl(URI.create("https://api.your-infrastructure.com/receive-messages/"))
                .update();

        System.out.println(exportConfiguration.getEnabled());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	bulkexports "github.com/twilio/twilio-go/rest/bulkexports/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &bulkexports.UpdateExportConfigurationParams{}
	params.SetWebhookMethod("GET")
	params.SetWebhookUrl("https://api.your-infrastructure.com/receive-messages/")

	resp, err := client.BulkexportsV1.UpdateExportConfiguration("Messages",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Enabled != nil {
			fmt.Println(*resp.Enabled)
		} else {
			fmt.Println(resp.Enabled)
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

$export_configuration = $twilio->bulkexports->v1
    ->exportConfiguration("Messages")
    ->update([
        "webhookMethod" => "GET",
        "webhookUrl" => "https://api.your-infrastructure.com/receive-messages/",
    ]);

print $export_configuration->enabled;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

export_configuration = @client
                       .bulkexports
                       .v1
                       .export_configuration('Messages')
                       .update(
                         webhook_method: 'GET',
                         webhook_url: 'https://api.your-infrastructure.com/receive-messages/'
                       )

puts export_configuration.enabled
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:configuration:update \
   --resource-type Messages \
   --webhook-method GET \
   --webhook-url https://api.your-infrastructure.com/receive-messages/
```

```bash
curl -X POST "https://bulkexports.twilio.com/v1/Exports/Messages/Configuration" \
--data-urlencode "WebhookMethod=GET" \
--data-urlencode "WebhookUrl=https://api.your-infrastructure.com/receive-messages/" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Configuration",
  "enabled": true,
  "webhook_url": "https://api.your-infrastructure.com/receive-messages/",
  "resource_type": "Messages",
  "webhook_method": "GET"
}
```
