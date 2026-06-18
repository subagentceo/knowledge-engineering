# Execution Context

## Context Properties

<OperationTable type="properties" data={{"type":"object","refName":"studio.v2.flow.execution.execution_context","modelName":"studio_v2_flow_execution_execution_context","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ExecutionContext resource."},"context":{"nullable":true,"description":"The current state of the Flow's Execution. As a flow executes, we save its state in this context. We save data that your widgets can access as variables in configuration fields or in text areas as variable substitution.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"flow_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Flow."},"execution_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the context's Execution resource."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}} />

## Fetch a single execution context

`GET https://studio.twilio.com/v2/Flows/{FlowSid}/Executions/{ExecutionSid}/Context`

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Execution context to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"ExecutionSid","in":"path","description":"The SID of the Execution context to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Execution Context

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchExecutionContext() {
  const executionContext = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executionContext()
    .fetch();

  console.log(executionContext.accountSid);
}

fetchExecutionContext();
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

execution_context = (
    client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .execution_context()
    .fetch()
)

print(execution_context.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2.Flow.Execution;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var executionContext = await ExecutionContextResource.FetchAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathExecutionSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(executionContext.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.flow.execution.ExecutionContext;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExecutionContext executionContext =
            ExecutionContext.fetcher("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .fetch();

        System.out.println(executionContext.getAccountSid());
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

	resp, err := client.StudioV2.FetchExecutionContext("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$execution_context = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executionContext()
    ->fetch();

print $execution_context->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

execution_context = @client
                    .studio
                    .v2
                    .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                    .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                    .execution_context
                    .fetch

puts execution_context.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:executions:context:fetch \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --execution-sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Context" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "context": {
    "foo": "bar"
  },
  "flow_sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "execution_sid": "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
}
```
