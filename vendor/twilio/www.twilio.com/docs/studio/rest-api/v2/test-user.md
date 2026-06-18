# Test User

Test Users are the contact addresses (e.g. phone numbers, Chat identities) who can test the latest drafts of a Flow even if they aren't yet published.

Update the Test User resource of a Flow to allow the contacts that need to perform tests of unpublished drafts.

## TestUser Properties

<OperationTable type="properties" data={{"type":"object","refName":"studio.v2.flow.test_user","modelName":"studio_v2_flow_test_user","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$","nullable":true,"description":"Unique identifier of the flow."},"test_users":{"type":"array","nullable":true,"description":"List of test user identities that can test draft versions of the flow.","items":{"type":"string"}},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this resource."}}}} />

## Fetch a TestUser resource

`GET https://studio.twilio.com/v2/Flows/{Sid}/TestUsers`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"Unique identifier of the flow.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Test Users

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTestUser() {
  const testUser = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .testUsers()
    .fetch();

  console.log(testUser.sid);
}

fetchTestUser();
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

test_user = (
    client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .test_users()
    .fetch()
)

print(test_user.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flowTestUser =
            await FlowTestUserResource.FetchAsync(pathSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(flowTestUser.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.flow.FlowTestUser;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        FlowTestUser flowTestUser = FlowTestUser.fetcher("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(flowTestUser.getSid());
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

	resp, err := client.StudioV2.FetchTestUser("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$test_user = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->testUsers()
    ->fetch();

print $test_user->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

test_user = @client
            .studio
            .v2
            .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .test_users
            .fetch

puts test_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:test-users:fetch \
   --sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TestUsers" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "test_users": [
    "user1",
    "user2"
  ],
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers"
}
```

## Update a TestUser resource

`POST https://studio.twilio.com/v2/Flows/{Sid}/TestUsers`

Each Test User identity can be up to 300 bytes.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"Unique identifier of the flow.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateTestUserRequest","required":["TestUsers"],"properties":{"TestUsers":{"type":"array","description":"List of test user identities that can test draft versions of the flow.","items":{"type":"string"}}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"TestUsers\": [\n    \"user1\",\n    \"user2\"\n  ]\n}","meta":"","code":"{\n  \"TestUsers\": [\n    \"user1\",\n    \"user2\"\n  ]\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"TestUsers\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"user1\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"user2\"","#A5D6FF"],"\n  ",["]","#C9D1D9"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update Test Users

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTestUser() {
  const testUser = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .testUsers()
    .update({ testUsers: ["+14155551212", "+14155551213"] });

  console.log(testUser.sid);
}

updateTestUser();
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

test_user = (
    client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .test_users()
    .update(test_users=["+14155551212", "+14155551213"])
)

print(test_user.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2.Flow;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flowTestUser = await FlowTestUserResource.UpdateAsync(
            testUsers: new List<string> { "+14155551212", "+14155551213" },
            pathSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(flowTestUser.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.studio.v2.flow.FlowTestUser;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        FlowTestUser flowTestUser =
            FlowTestUser
                .updater("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Arrays.asList("+14155551212", "+14155551213")

                        )
                .update();

        System.out.println(flowTestUser.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	studio "github.com/twilio/twilio-go/rest/studio/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.UpdateTestUserParams{}
	params.SetTestUsers([]string{
		"+14155551212",
		"+14155551213",
	})

	resp, err := client.StudioV2.UpdateTestUser("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$test_user = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->testUsers()
    ->update(
        ["+14155551212", "+14155551213"] // TestUsers
    );

print $test_user->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

test_user = @client
            .studio
            .v2
            .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .test_users
            .update(
              test_users: [
                '+14155551212',
                '+14155551213'
              ]
            )

puts test_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:test-users:update \
   --sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --test-users +14155551212 +14155551213
```

```bash
curl -X POST "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TestUsers" \
--data-urlencode "TestUsers=+14155551212" \
--data-urlencode "TestUsers=+14155551213" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "test_users": [
    "+14155551212",
    "+14155551213"
  ],
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers"
}
```
