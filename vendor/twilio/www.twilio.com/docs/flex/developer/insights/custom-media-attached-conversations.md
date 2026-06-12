# Custom Media attached to Conversations

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows, Customers are required to ensure that all conversations that have custom media attachment are not accessible without authorization. Conversations may contain sensitive information (PHI), thus you must ensure unauthorized users may not access such information. To learn more about building for HIPAA compliance, please visit the latest requirements [here](https://docs-resources.prod.twilio.com/documents/architecting-for-HIPAA.pdf).

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Conversations can have custom media attached so that users can access information related to the conversation after it ends. Custom media can point to resources related to the conversation or its segments, such as Chat Transcripts and Call Recordings.

To attach custom media to a Conversation, update the TaskRouter Task and pass specific attributes depending on the type of custom media you want to attach. To update the TaskRouter Task, make an API call to the URL:

```bash
https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks/WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace `WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Twilio Workspace SID, and `WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with the TaskRouter Task's SID. The example below uses `curl` to call the TaskRouter API URL and passes all the necessary attributes to attach a media link to a Conversation.

Create a Task with Conversations object

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTask() {
  const task = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks.create({
      attributes: JSON.stringify({
        conversations: {
          media: [
            {
              type: "Referenced",
              url: "https://externalsystem.com/record-id2",
              title: "External Ticket",
            },
          ],
        },
      }),
    });

  console.log(task.accountSid);
}

createTask();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

task = client.taskrouter.v1.workspaces(
    "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).tasks.create(
    attributes=json.dumps(
        {
            "conversations": {
                "media": [
                    {
                        "type": "Referenced",
                        "url": "https://externalsystem.com/record-id2",
                        "title": "External Ticket",
                    }
                ]
            }
        }
    )
)

print(task.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var task = await TaskResource.CreateAsync(
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() {
                    { "conversations",
                      new Dictionary<string, Object>() {
                          { "media",
                            new List<Object> { new Dictionary<string, Object>() {
                                { "type", "Referenced" },
                                { "url", "https://externalsystem.com/record-id2" },
                                { "title", "External Ticket" }
                            } } }
                      } }
                },
                Formatting.Indented),
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(task.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task task = Task.creator("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("conversations", new HashMap<String, Object>() {
                                    {
                                        put("media", Arrays.asList(new HashMap<String, Object>() {
                                            {
                                                put("type", "Referenced");
                                                put("url", "https://externalsystem.com/record-id2");
                                                put("title", "External Ticket");
                                            }
                                        }));
                                    }
                                });
                            }
                        }).toString())
                        .create();

        System.out.println(task.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"encoding/json"
	"fmt"
	"github.com/twilio/twilio-go"
	taskrouter "github.com/twilio/twilio-go/rest/taskrouter/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	Attributes, AttributesError := json.Marshal(map[string]interface{}{
		"conversations": map[string]interface{}{
			"media": []interface{}{
				map[string]interface{}{
					"type":  "Referenced",
					"url":   "https://externalsystem.com/record-id2",
					"title": "External Ticket",
				},
			},
		},
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.CreateTaskParams{}
	params.SetAttributes(string(Attributes))

	resp, err := client.TaskrouterV1.CreateTask("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
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

$task = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->tasks->create([
        "attributes" => json_encode([
            "conversations" => [
                "media" => [
                    [
                        "type" => "Referenced",
                        "url" => "https://externalsystem.com/record-id2",
                        "title" => "External Ticket",
                    ],
                ],
            ],
        ]),
    ]);

print $task->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task = @client
       .taskrouter
       .v1
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks
       .create(
         attributes: {
             'conversations' => {
               'media' => [
                 {
                   'type' => 'Referenced',
                   'url' => 'https://externalsystem.com/record-id2',
                   'title' => 'External Ticket'
                 }
               ]
             }
           }.to_json
       )

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:create \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --attributes "{ \"conversations\": { \"media\": [ { \"type\": \"Referenced\", \"url\": \"https://externalsystem.com/record-id2\", \"title\": \"External Ticket\" } ] } }"
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "conversations": {
    "media": [
      {
        "type": "Referenced",
        "url": "https://externalsystem.com/record-id2",
        "title": "External Ticket"
      }
    ]
  }
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{ \"conversations\": { \"media\": [ { \"type\": \"Referenced\", \"url\": \"https://externalsystem.com/record-id2\", \"title\": \"External Ticket\" } ] } }",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": null,
  "virtual_start_time": "2014-05-14T18:50:02Z",
  "priority": 1,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "unique",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_friendly_name": "Example Workflow",
  "task_queue_friendly_name": "Example Task Queue",
  "ignore_capacity": false,
  "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "addons": "{}",
  "links": {
    "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

If you are looking to use library-specific methods to update the TaskRouter Task, check out [Update a Task resource](/docs/taskrouter/api/task#update-a-task-resource).

> \[!WARNING]
>
> Adding media links overrides the references to default call recording and default chat transcript. To reference the original call recording or the original chat transcript together with custom media you need to list the original recording and chat transcript in the media links yourself.

## Add media links

Each segment can have multiple media links related to it. You can provide links on the task level and/or on the reservation level.

* **Task-level media links.** The media links are attached to all segments that belong to the Task.
* **Reservation-level media links.** The media are attached to all segments related to the reservation. Reservation-level media links override task-level media links. If a reservation has related media links, then no media links from the task level are attached.

Example TaskRouter attributes structure for task-level media links:

```json
{
  "conversations": {
    "media": [
      // media links list goes here
    ]
  }
}
```

Example TaskRouter attributes structure for reservation-level media links:

```json
{
  "reservation_attributes": {
    "<reservation_sid_1>": {
      "media": [
         // media links list goes here
      ]
    }
  }
}
```

### Raw media links

Raw media links are passed as-is to [Historical Reporting](/docs/flex/developer/insights/labels#context-how-historical-reporting-works). This means that when you drill down, the link is opened in a new browser tab or you can respond to clicks on that link and create custom drill down behavior in Flex.

```json
{
  "conversations": {
    "media": [
      {
        "type": "Raw",
        "url": "https://example.com/record-id",
        "title": "CRM Conversation Record"
      }
    ]
  }
}
```

### Embedded media links

Embedded media links can display a custom webpage on the [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen) in an iFrame. This type of media link is useful for referencing tickets, CRM records and similar content related to the conversation. The web application that you embed has to support unique URLs for records that you are interested in so you can point to the content directly related to a conversation.

```json
{
  "conversations": {
    "media": [
      {
        "type": "Embedded",
        "url": "https://example.com/tickets/ticket-id",
        "title": "Support Ticket"
      }
    ]
  }
}
```

**Note**: Some web applications do not enable embedding for their content, or require configuration on their side to enable embedding. In case a web application does not enable embedding, use the referenced media link type instead.

### Referenced media links

Referenced media links are useful for linking to external web pages related to a conversation. Referenced media links are shown as links in [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen).

```json
{
  "conversations": {
    "media": [
      {
        "type": "Referenced",
        "url": "https://externalsystem.com/record-id",
        "title": "External Ticket"
      }
    ]
  }
}
```

### Voice Recording media links

Voice Recording media links reference voice call recordings that users can playback and listen to in case they need to drill down to a conversation.

```json
{
  "conversations": {
    "media": [
      {
        "type": "VoiceRecording",
        "url": "https://exampleurl.com",
        "start_time": 1574350320000,
        "channels": [
          "customer",
          "others"
        ],
        "title": "Dual channel recording"
      }
    ]
  }
}
```

**Note**: When call recording is enabled in Flex, you do not typically have to provide a link to a voice recording.

> \[!WARNING]
>
> The `start_time` attribute needs to be in milliseconds (for example, 1574350320000).

### Chat Transcript media links

Chat Transcript media links reference a chat transcript made by Twilio Programmable Chat.

```json
{
  "conversations": {
    "media": [
      {
        "type": "ChatTranscript",
        "sid": "CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    ]
  }
}
```

## Multiple media links

Media link lists can have multiple items in them. When users drill down to a conversation with multiple media attached to them, they can switch between them.

In the following case there is a specific behavior for media links:

* When Raw media link is on the first position in the list then when customers drill down to a conversation `Conversation Screen` does not open. The Raw media link is open in a new browser window/tab. The other media links are not accessible from Flex user interface.

The following example shows multiple media links in a conversation. The Conversation Screen will offer users to switch between the chat transcript and the embedded content.

```json
{
  "conversations": {
    "media": [
      {
        "type": "Embedded",
        "url": "https://example.com/ticket-id",
        "title": "Support Ticket"
      },
      {
        "type": "ChatTranscript",
        "sid": "CHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      },
      {
        "type": "VoiceRecording",
        "url": "https://exampleurl.com"
      }
    ]
  }
}
```

> \[!WARNING]
>
> Multiple VoiceRecording media links are not currently supported in Flex. Only the first one on the list will be visible in the player.

## Respond to Drilldowns in Historical Reporting

When users click on a conversation in Flex Insights, Flex shows either a call, chat transcript, or a list of custom media provided with TaskRouter attributes. Users can change this behavior. The primary use of custom response to drill downs is to respond to Raw media links.

```javascript
import { Actions } from "@twilio/flex-ui"

Actions.replaceAction("HistoricalReportingView", async (url, original) => {

    // implement your own handling of URL or call original(url) to use the original handler
})
```

Developers can decide whether they want to handle each drill down themselves or pass it to Flex to handle the drill down. This can be based on the URL that a user clicked or based on any other conditions.

## Known limitations

* Flex Insights only provides secure authentication for the `VoiceRecording` media type using the [`url_provider` parameter](/docs/flex/developer/insights/playback-recordings-custom-storage#add-the-link-to-your-service). This option only works with Voice recordings and isn't supported for other media types such as `ChatTranscript` or `Embedded`. If the request omits `url_provider`, Flex Insights sends the request without authentication. Ensure that the media URLs you provide are publicly accessible to Twilio.
