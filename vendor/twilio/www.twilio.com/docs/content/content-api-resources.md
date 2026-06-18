# Content API Public Endpoints

> \[!NOTE]
>
> The Content API supports an unlimited number of content templates, but WhatsApp limits each account to 6,000 approved templates. Most of this page refers to v1 of the Content API. Content template search is available only in v2.

```json
{"type":"object","refName":"content.v1.content","modelName":"content_v1_content","properties":{"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Content resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/usage/api/account) that created Content resource."},"friendly_name":{"type":"string","nullable":true,"description":"A string name used to describe the Content resource. Not visible to the end recipient."},"language":{"type":"string","nullable":true,"description":"Two-letter (ISO 639-1) language code (e.g., en) identifying the language the Content resource is in."},"variables":{"type":"object","nullable":true,"description":"Defines the default placeholder values for variables included in the Content resource. e.g. {\"1\": \"Customer_Name\"}."},"types":{"type":"object","nullable":true,"description":"The [Content types](https://www.twilio.com/docs/content-api/content-types-overview) (e.g. twilio/text) for this Content resource."},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the resource, relative to `https://content.twilio.com`."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"A list of links related to the Content resource, such as approval_fetch and approval_create"}}}
```

## Create a Content API template

```bash
POST https://content.twilio.com/v1/Content
```

> \[!NOTE]
>
> Save the `ContentSid` returned in the API response. You will reference this SID whenever you send a message or perform other operations with the template.

Create a Content API template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the twilio/text type for less rich channels (e.g. SMS)
    var twilioText = new TwilioText.Builder();
    twilioText.WithBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

    // define the twilio/quick-reply type for more rich channels
    var twilioQuickReply = new TwilioQuickReply.Builder();
    twilioQuickReply.WithBody("Owl Air Support");
    var quickreply1 = new QuickReplyAction.Builder()
        .WithTitle("Contact Us")
        .WithId("flightid1")
        .Build();
    var quickreply2 = new QuickReplyAction.Builder()
        .WithTitle("Check gate number")
        .WithId("gateid1")
        .Build();
    var quickreply3 = new QuickReplyAction.Builder()
        .WithTitle("Speak with an agent")
        .WithId("agentid1")
        .Build();
    twilioQuickReply.WithActions(new List<QuickReplyAction>() { quickreply1, quickreply2, quickreply3 });

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithTwilioText(twilioText.Build());
    types.WithTwilioQuickReply(twilioQuickReply.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("owl_air_qr");
    contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "John"} });
    
    // create the twilio template
    var contentTemplate = await CreateAsync(contentCreateRequest.Build());

    Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

```java
package Examples;

import com.twilio.rest.content.v1.Content;

import java.util.Arrays;
import java.util.Map;

public class TwilioQuickReply {
    public static String CreateTemplate() {
        var twilioText = new Content.TwilioText();
        twilioText.setBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

        var twilioQuickReply = new Content.TwilioQuickReply();
        twilioQuickReply.setBody("Owl Air Support");

        var action1 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Contact Us");
        action1.setId("contact_us");

        var action2 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Check gate number");
        action1.setId("gate_id_1");

        var action3 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Speak with an agent");
        action1.setId("agent_id_1");

        twilioQuickReply.setActions(Arrays.asList(action1, action2, action3));

        var types = new Content.Types();
        types.setTwilioText(twilioText);
        types.setTwilioQuickReply(twilioQuickReply);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("owl_air_qr");
        createRequest.setVariables(Map.of(
        "1", "first_name"
        ));

        var content = Content.creator(createRequest).create();

        return content.getSid();
    }
}
```

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "owl_air_qr",
    "language": "en",
    "variables": {"1":"Owl Air Customer"},
    "types": {
        "twilio/quick-reply": {
                    "body": "Hi, {{1}} 👋 \nThanks for contacting Owl Air Support. How can I help?",
                    "actions": [
                        {
                            "title": "Check flight status",
                            "id": "flightid1"
                        },
                        {
                            "title": "Check gate number",
                            "id": "gateid1"
                        },
                        {
                            "title": "Speak with an agent",
                            "id": "agentid1"
                        }
                    ]
                },
        "twilio/text": {
            "body": "Hi, {{1}}. \n Thanks for contacting Owl Air Support. How can I help?."
        }
    }
}'
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-29T10:43:20Z",
  "date_updated": "2022-08-29T10:43:20Z",
  "friendly_name": "owl_air_qr",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/text": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?."
    },
    "twilio/quick-reply": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?",
      "actions": [
        {
          "id": "flightid1",
          "title": "Check flight status"
        },
        {
          "id": "gateid1",
          "title": "Check gate number"
        },
        {
          "id": "agentid1",
          "title": "Speak with an agent"
        }
      ]
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "Owl Air Customer"
  }
}
```

## Edit a content template

You can edit a content template if it hasn't been submitted for approval on WhatsApp. You don't need to create a new template as editing a content template doesn't change its content SID. Updates to a content template affect only future messages that use the template; previously sent messages remain unchanged.

You can't edit content that you've submitted for WhatsApp approval, nor can you change its language.

Edit a Content API template

```bash
curl -X PUT 'https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "card_elite_status",
    "variables": {
        "1": "coupon_code"
    },
    "types": {
        "twilio/card": {
                    "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off.",
                    "subtitle": "To unsubscribe, reply Stop",
                    "actions": [
                        {
                            "url": "https://twilio.com/",
                            "title": "Order Now",
                            "type": "URL"
                        },
                        {
                            "phone": "+15551234567",
                            "title": "Call Us",
                            "type": "PHONE_NUMBER"
                        }
                    ]
                }
    }
}'
```

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2025-11-20T17:27:31Z",
    "date_updated": "2025-11-20T17:29:51Z",
    "friendly_name": "card_elite_status",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/card": {
            "actions": [
                {
                    "chip_list": null,
                    "id": null,
                    "title": "Order Now",
                    "type": "URL",
                    "url": "https://twilio.com/",
                    "webview_size": "NONE"
                },
                {
                    "chip_list": null,
                    "phone": "+15551234567",
                    "title": "Call Us",
                    "type": "PHONE_NUMBER"
                }
            ],
            "body": null,
            "media": [],
            "orientation": "VERTICAL",
            "subtitle": "To unsubscribe, reply Stop",
            "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off."
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "coupon_code"
    }
}
```

## Fetch information about templates

### Fetch a content resource

```bash
GET https://content.twilio.com/v1/Content/{ContentSid}
```

Retrieve a single Content API template.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Content resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Content API resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchContent() {
  const content = await client.content.v1
    .contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(content.dateCreated);
}

fetchContent();
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

content = client.content.v1.contents(
    "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(content.date_created)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var content =
            await ContentResource.FetchAsync(pathSid: "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(content.DateCreated);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.Content;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Content content = Content.fetcher("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(content.getDateCreated());
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

	resp, err := client.ContentV1.FetchContent("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.DateCreated != nil {
			fmt.Println(*resp.DateCreated)
		} else {
			fmt.Println(resp.DateCreated)
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

$content = $twilio->content->v1
    ->contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $content->dateCreated?->format("r");
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

content = @client
          .content
          .v1
          .contents('HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts content.date_created
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:content:fetch \
   --sid HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Some content",
  "language": "en",
  "variables": {
    "name": "foo"
  },
  "types": {
    "twilio/text": {
      "body": "Foo Bar Co is located at 39.7392, 104.9903"
    },
    "twilio/location": {
      "longitude": 104.9903,
      "latitude": 39.7392,
      "label": "Foo Bar Co"
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T19:00:00Z",
  "date_updated": "2015-07-30T19:00:00Z",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests"
  }
}
```

### Template search (v2)

| Filter                                     | Number of filters | Behavior                                                                                                                                                                                                                                                                   |
| ------------------------------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Language`                                 | Multiple          | Matches the template's `language` field.                                                                                                                                                                                                                                   |
| `ContentType`                              | Multiple          | Checks for the existence of one or more `contenttype` fields (for example, `twilio/text`).                                                                                                                                                                                 |
| `ChannelEligibility`                       | Multiple          | Matches entries in the `approval_content.channel.status` field by using the `{channel}:{template_status}` format.                                                                                                                                                          |
| `Content`                                  | Single            | Case-insensitive search pattern that looks for matches in `body`, `title`, `sub_title`, `friendly_name`, and `approval_content.channel.name`. Maximum length: 1,024 characters or 30 words. The search returns documents that match all supplied terms in the given order. |
| `ContentName`                              | Single            | Search pattern for `friendly_name` (template name) and `approval_content.channel.name`. Maximum length: 450 characters or 30 words.                                                                                                                                        |
| `DateCreatedBefore`                        | Single            | Upper bound for template creation time. Format: `YYYY-MM-DDThh:mm:ssZ`.                                                                                                                                                                                                    |
| `DateCreatedAfter`                         | Single            | Lower bound for template creation time. Format: `YYYY-MM-DDThh:mm:ssZ`.                                                                                                                                                                                                    |
| `DateCreatedBefore` and `DateCreatedAfter` | Single            | Specifies a date-time range for the search. Combine the two parameters as shown: `DateCreatedBefore=YYYY-MM-DDThh:mm:ssZ&DateCreatedAfter=YYYY-MM-DDThh:mm:ssZ`.                                                                                                           |

```bash
GET "https://content.twilio.com/v2/Content?PageSize=100&Content=hello"
```

```bash
GET "https://content.twilio.com/v2/ContentAndApprovals?ChannelEligibility=whatsapp:unsubmitted&Language=en"
```

### Fetch all content resources

```bash
GET "https://content.twilio.com/v1/Content"
```

Retrieve all content templates. This endpoint supports pagination.

Fetch all content resources

```bash
curl -X GET "https://content.twilio.com/v1/Content"
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://content.twilio.com/v1/Content?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://content.twilio.com/v1/Content?PageSize=50&Page=0",
    "next_page_url": "https://content.twilio.com/v1/Content?PageSize=50&Page=1&PageToken=DNHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-1678723520",
    "key": "contents"
  },
  "contents": [
    {
      "language": "en",
      "date_updated": "2023-03-31T16:06:50Z",
      "variables": {
        "1": "07:00",
        "3": "owl.jpg",
        "2": "03/01/2023"
      },
      "friendly_name": "whatsappcard2",
      "account_sid": "ACXXXXXXXXXXXXXXX",
      "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "date_created": "2023-03-31T16:06:50Z",
      "types": {
        "twilio/card": {
          "body": null,
          "media": [
            "https://twilio.example.com/{{3}}"
          ],
          "subtitle": null,
          "actions": [
            {
              "index": 0,
              "type": "QUICK_REPLY",
              "id": "Stop",
              "title": "Stop Updates"
            }
          ],
          "title": "See you at {{1}} on {{2}}. Thank you."
        }
      },
      "links": {
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests",
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp"
      }
    },
    {
      "language": "en",
      "date_updated": "2023-03-31T15:50:24Z",
      "variables": {
        "1": "07:00",
        "2": "03/01/2023"
      },
      "friendly_name": "whatswppward_01234",
      "account_sid": "ACXXXXXXXXXXXXXXX",
      "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "date_created": "2023-03-31T15:50:24Z",
      "types": {
        "twilio/card": {
          "body": null,
          "media": [
            "https://twilio.example.com/owl.jpg"
          ],
          "subtitle": null,
          "actions": [
            {
              "index": 0,
              "type": "QUICK_REPLY",
              "id": "Stop",
              "title": "Stop Updates"
            }
          ],
          "title": "See you at {{1}} on {{2}}. Thank you."
        }
      },
      "links": {
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests",
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp"
      }
    }
  ]
}
```

### Fetch content and approvals

```bash
GET https://content.twilio.com/v1/ContentAndApprovals
```

Retrieve templates together with their approval status. The WhatsApp Flow publish status appears in the `approvals` object. Pagination is supported.

For details, see [WhatsApp approval statuses](/docs/content/content-types-overview#whatsapp-approval-statuses).

Fetch content and approvals

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listContentAndApprovals() {
  const contentAndApprovals = await client.content.v1.contentAndApprovals.list({
    limit: 20,
  });

  contentAndApprovals.forEach((c) => console.log(c.dateCreated));
}

listContentAndApprovals();
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

content_and_approvals = client.content.v1.content_and_approvals.list(limit=20)

for record in content_and_approvals:
    print(record.date_created)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var contentAndApprovals = await ContentAndApprovalsResource.ReadAsync(limit: 20);

        foreach (var record in contentAndApprovals) {
            Console.WriteLine(record.DateCreated);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.ContentAndApprovals;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ContentAndApprovals> contentAndApprovals = ContentAndApprovals.reader().limit(20).read();

        for (ContentAndApprovals record : contentAndApprovals) {
            System.out.println(record.getDateCreated());
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
	content "github.com/twilio/twilio-go/rest/content/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &content.ListContentAndApprovalsParams{}
	params.SetLimit(20)

	resp, err := client.ContentV1.ListContentAndApprovals(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].DateCreated != nil {
				fmt.Println(*resp[record].DateCreated)
			} else {
				fmt.Println(resp[record].DateCreated)
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

$contentAndApprovals = $twilio->content->v1->contentAndApprovals->read(20);

foreach ($contentAndApprovals as $record) {
    print $record->dateCreated?->format("r");
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

content_and_approvals = @client
                        .content
                        .v1
                        .content_and_approvals
                        .list(limit: 20)

content_and_approvals.each do |record|
   puts record.date_created
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:content-and-approvals:list
```

```bash
curl -X GET "https://content.twilio.com/v1/ContentAndApprovals?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "contents": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "key": "contents"
  }
}
```

### Fetch mapping between legacy WhatsApp and content templates

```bash
GET https://content.twilio.com/v1/LegacyContent
```

If your existing WhatsApp Business Account (WABA) templates were migrated to the Content API, this endpoint returns a mapping between the legacy templates and their corresponding `ContentSid` values, languages, and body text. Pagination is supported.

Fetch legacy WhatsApp content mapping

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listLegacyContent() {
  const legacyContents = await client.content.v1.legacyContents.list({
    limit: 20,
  });

  legacyContents.forEach((l) => console.log(l.dateCreated));
}

listLegacyContent();
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

legacy_contents = client.content.v1.legacy_contents.list(limit=20)

for record in legacy_contents:
    print(record.date_created)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var legacyContents = await LegacyContentResource.ReadAsync(limit: 20);

        foreach (var record in legacyContents) {
            Console.WriteLine(record.DateCreated);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.LegacyContent;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<LegacyContent> legacyContents = LegacyContent.reader().limit(20).read();

        for (LegacyContent record : legacyContents) {
            System.out.println(record.getDateCreated());
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
	content "github.com/twilio/twilio-go/rest/content/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &content.ListLegacyContentParams{}
	params.SetLimit(20)

	resp, err := client.ContentV1.ListLegacyContent(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].DateCreated != nil {
				fmt.Println(*resp[record].DateCreated)
			} else {
				fmt.Println(resp[record].DateCreated)
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

$legacyContents = $twilio->content->v1->legacyContents->read(20);

foreach ($legacyContents as $record) {
    print $record->dateCreated?->format("r");
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

legacy_contents = @client
                  .content
                  .v1
                  .legacy_contents
                  .list(limit: 20)

legacy_contents.each do |record|
   puts record.date_created
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:legacy-content:list
```

```bash
curl -X GET "https://content.twilio.com/v1/LegacyContent?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "contents": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://content.twilio.com/v1/LegacyContent?PageSize=10&Page=0",
    "previous_page_url": null,
    "url": "https://content.twilio.com/v1/LegacyContent?PageSize=10&Page=0",
    "next_page_url": null,
    "key": "contents"
  }
}
```

### Pagination

For endpoints that support pagination, append these query parameters to the request URL:

* `PageSize` (recommended maximum: 500). The response is limited to 1 MB, which is roughly 500 templates.
* `PageToken`. Use the `meta.next_page_url` value from the previous response to request the next page. Supplying a page number (`page=`) is not supported.

## Delete a content template

```bash
DELETE https://content.twilio.com/v1/Content/{ContentSid}
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Content resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a template by using the Content API

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteContent() {
  await client.content.v1.contents("HXXXXXXXX").remove();
}

deleteContent();
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

client.content.v1.contents("HXXXXXXXX").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ContentResource.DeleteAsync(pathSid: "HXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.Content;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Content.deleter("HXXXXXXXX").delete();
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

	err := client.ContentV1.DeleteContent("HXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->content->v1->contents("HXXXXXXXX")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .content
  .v1
  .contents('HXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:content:remove \
   --sid HXXXXXXXX
```

```bash
curl -X DELETE "https://content.twilio.com/v1/Content/HXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

#### Additional parameter for WhatsApp

| Parameter      | Type    | Required | Description                                                                                                                                                                                                                   |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deleteInWaba` | Boolean | No       | If the template was synchronized from WABA or legacy templates, set this parameter to `true` to delete the template both in Twilio and in the WABA. Set to `false` to delete the template only from Twilio. Default: `false`. |

## Submit templates for approval

### Submit a template approval for WhatsApp

> \[!NOTE]
>
> To send outbound messages to WhatsApp users, the template must be approved by WhatsApp. If a user initiates a conversation, a 24-hour messaging session starts, during which certain outbound content types can be sent without a template.
>
> To learn more about approval requirements and session limits, see the [approval requirements chart](/docs/content/session-definitions#whatsapp-approval-requirements).

Submit the template for WhatsApp review by sending a `POST` request that includes the parameters listed in the next tables. For best practices, see [WhatsApp notification messages with templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates). WhatsApp review usually finishes within one business day.

```bash
POST https://content.twilio.com/v1/Content/{ContentSid}/ApprovalRequests/WhatsApp
```

#### Path parameter

| Parameter    | Type   | Required | Description                                                  |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| `ContentSid` | string | Yes      | SID of the content resource you want to submit for approval. |

#### Additional parameters required by WhatsApp

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                          |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`     | string | Yes      | Unique name for the template. Accepts only lowercase alphanumeric characters and underscores.                                                                                                                                        |
| `category` | enum   | Yes      | Template use-case category as [defined by WhatsApp](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates). Valid values: <ul><li>`UTILITY`</li><li>`MARKETING`</li><li>`AUTHENTICATION`</li></ul> |

Submit a template for WhatsApp approval

```bash
curl -X POST 'https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
  "name": "flight_replies",
  "category": "UTILITY"
}'
```

```json
{
  "category": "TRANSPORTATION_UPDATE",
  "status": "received",
  "rejection_reason": "",
  "name": "flight_replies",
  "content_type": "twilio/quick-reply"
}
```

### Fetch an approval status request

```bash
GET https://content.twilio.com/v1/Content/{ContentSid}/ApprovalRequests
```

For a list of possible status values, see [WhatsApp template approval statuses](/docs/content/content-types-overview#whatsapp-template-approval-statuses). Flow status values are returned in the `approvals` object.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Content resource whose approval information to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an approval status request

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchApprovalFetch() {
  const approvalFetch = await client.content.v1
    .contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .approvalFetch()
    .fetch();

  console.log(approvalFetch.sid);
}

fetchApprovalFetch();
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

approval_fetch = (
    client.content.v1.contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .approval_fetch()
    .fetch()
)

print(approval_fetch.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1.Content;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var approvalFetch =
            await ApprovalFetchResource.FetchAsync(pathSid: "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(approvalFetch.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.content.ApprovalFetch;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ApprovalFetch approvalFetch = ApprovalFetch.fetcher("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(approvalFetch.getSid());
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

	resp, err := client.ContentV1.FetchApprovalFetch("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$approval_fetch = $twilio->content->v1
    ->contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->approvalFetch()
    ->fetch();

print $approval_fetch->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

approval_fetch = @client
                 .content
                 .v1
                 .contents('HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                 .approval_fetch
                 .fetch

puts approval_fetch.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:content:approval-requests:fetch \
   --sid HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "whatsapp": {
    "type": "whatsapp",
    "name": "tree_fiddy",
    "category": "UTILITY",
    "content_type": "twilio/location",
    "status": "approved",
    "rejection_reason": "",
    "allow_category_change": true
  },
  "url": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests"
}
```

## Send a template

### Send a message with pre-configured content

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages
```

Include the `ContentSid` in the `POST` body to send a message based on the template. If the template contains variables, pass them in the `ContentVariables` parameter.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) creating the Message resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateMessageRequest","required":["To"],"properties":{"To":{"type":"string","format":"phone-number","description":"The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"StatusCallback":{"type":"string","format":"uri","description":"The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). "},"ApplicationSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","description":"The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored."},"MaxPrice":{"type":"number","description":"[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03."},"ProvideFeedback":{"type":"boolean","description":"Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`."},"Attempt":{"type":"integer","description":"Total number of attempts made (including this request) to send the message regardless of the provider used"},"ValidityPeriod":{"type":"integer","description":"The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)"},"ForceDelivery":{"type":"boolean","description":"Reserved"},"ContentRetention":{"type":"string","enum":["retain","discard"],"description":"Determines if the message content can be stored or redacted based on privacy settings","refName":"message_enum_content_retention","modelName":"message_enum_content_retention"},"AddressRetention":{"type":"string","enum":["retain","obfuscate"],"description":"Determines if the address can be stored or obfuscated based on privacy settings","refName":"message_enum_address_retention","modelName":"message_enum_address_retention"},"SmartEncoded":{"type":"boolean","description":"Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`."},"PersistentAction":{"type":"array","description":"Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).","items":{"type":"string"}},"TrafficType":{"type":"string","enum":["free"],"refName":"message_enum_traffic_type","modelName":"message_enum_traffic_type"},"ShortenUrls":{"type":"boolean","description":"For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided."},"ScheduleType":{"type":"string","enum":["fixed"],"description":"For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).","refName":"message_enum_schedule_type","modelName":"message_enum_schedule_type"},"SendAt":{"type":"string","format":"date-time","description":"The time that Twilio will send the message. Must be in ISO 8601 format."},"SendAsMms":{"type":"boolean","description":"If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media."},"ContentVariables":{"type":"string","description":"For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used."},"RiskCheck":{"type":"string","enum":["enable","disable"],"description":"Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.","refName":"message_enum_risk_check","modelName":"message_enum_risk_check"},"From":{"type":"string","format":"phone-number","description":"The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"FallbackFrom":{"type":"string","format":"phone-number","description":"A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message."},"MessagingServiceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","description":"The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool."},"Body":{"type":"string","description":"The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"MediaUrl":{"type":"array","description":"The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.","items":{"type":"string","format":"uri","x-twilio":{"ignoreFormat":true}}},"ContentSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$","description":"For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources)."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"Tags\": \"{\\\"campaign_name\\\": \\\"Spring Sale 2022\\\",\\\"message_type\\\": \\\"cart_abandoned\\\"}\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"Tags\": \"{\\\"campaign_name\\\": \\\"Spring Sale 2022\\\",\\\"message_type\\\": \\\"cart_abandoned\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Tags\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["campaign_name","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Spring Sale 2022","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["message_type","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["cart_abandoned","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWoService":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithMessagingService":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"ContentSid\": \"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"ContentSid\": \"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ContentSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithQueuedStatus":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageSms":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageMms":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageWhatsapp":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"94287277+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"94287277+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"94287277+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{"From":["MessagingServiceSid"],"MessagingServiceSid":["From"],"Body":["MediaUrl","ContentSid"],"MediaUrl":["Body","ContentSid"],"ContentSid":["Body","MediaUrl"]}}
```

Send a message with pre-configured content

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    contentSid: "HXXXXXXXX",
    contentVariables: JSON.stringify({
      1: "YOUR_VARIABLE1",
      2: "YOUR_VARIABLE2",
    }),
    from: "MGXXXXXXXXX",
    to: "whatsapp:+18005551234",
  });

  console.log(message.sid);
}

createMessage();
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

message = client.messages.create(
    from_="MGXXXXXXXXX",
    content_sid="HXXXXXXXX",
    content_variables=json.dumps(
        {"1": "YOUR_VARIABLE1", "2": "YOUR_VARIABLE2"}
    ),
    to="whatsapp:+18005551234",
)

print(message.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
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

        var message = await MessageResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("MGXXXXXXXXX"),
            contentSid: "HXXXXXXXX",
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() {
                    { "1", "YOUR_VARIABLE1" }, { "2", "YOUR_VARIABLE2" }
                },
                Formatting.Indented),
            to: new Twilio.Types.PhoneNumber("whatsapp:+18005551234"));

        Console.WriteLine(message.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+18005551234"),
                                  new com.twilio.type.PhoneNumber("MGXXXXXXXXX"),
                                  "HXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "YOUR_VARIABLE1");
                                      put("2", "YOUR_VARIABLE2");
                                  }
                              }).toString())
                              .create();

        System.out.println(message.getSid());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	ContentVariables, ContentVariablesError := json.Marshal(map[string]interface{}{
		"1": "YOUR_VARIABLE1",
		"2": "YOUR_VARIABLE2",
	})

	if ContentVariablesError != nil {
		fmt.Println(ContentVariablesError)
		os.Exit(1)
	}

	params := &api.CreateMessageParams{}
	params.SetFrom("MGXXXXXXXXX")
	params.SetContentSid("HXXXXXXXX")
	params.SetContentVariables(string(ContentVariables))
	params.SetTo("whatsapp:+18005551234")

	resp, err := client.Api.CreateMessage(params)
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

$message = $twilio->messages->create(
    "whatsapp:+18005551234", // To
    [
        "from" => "MGXXXXXXXXX",
        "contentSid" => "HXXXXXXXX",
        "contentVariables" => json_encode([
            "1" => "YOUR_VARIABLE1",
            "2" => "YOUR_VARIABLE2",
        ]),
    ]
);

print $message->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            from: 'MGXXXXXXXXX',
            content_sid: 'HXXXXXXXX',
            content_variables: {
                '1' => 'YOUR_VARIABLE1',
                '2' => 'YOUR_VARIABLE2'
              }.to_json,
            to: 'whatsapp:+18005551234'
          )

puts message.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from MGXXXXXXXXX \
   --content-sid HXXXXXXXX \
   --content-variables {\"1\":\"YOUR_VARIABLE1\",\"2\":\"YOUR_VARIABLE2\"} \
   --to whatsapp:+18005551234
```

```bash
CONTENT_VARIABLES_OBJ=$(cat << EOF
{
  "1": "YOUR_VARIABLE1",
  "2": "YOUR_VARIABLE2"
}
EOF
)
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=MGXXXXXXXXX" \
--data-urlencode "ContentSid=HXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
--data-urlencode "To=whatsapp:+18005551234" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "MGXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+18005551234",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

> \[!WARNING]
>
> The `From` value must be a **Messaging Service SID** that contains a WhatsApp or Facebook Messenger sender.

### Send templates with status callbacks

You can configure a status callback URL for all messages in a [Messaging Service](https://www.twilio.com/console/sms/services) or for a single outbound message by including the `StatusCallback` parameter.

```bash
-d "StatusCallback=https://example.com/callback"
```

For details, see [monitor the status of your WhatsApp outbound message](/docs/whatsapp/api#monitor-the-status-of-your-whatsapp-outbound-message).

### Send messages scheduled ahead of time

You can schedule RCS, SMS, MMS, and WhatsApp messages to be sent at a fixed time.

```bash
--data-urlencode "SendAt=2023-11-30T20:36:27Z" \
--data-urlencode "ScheduleType=fixed" \
```

Send a scheduled message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    contentSid: "HXXXXXXXXXXXXXXX",
    contentVariables: JSON.stringify({
      1: "YOUR_VARIABLE1",
      2: "YOUR_VARIABLE2",
    }),
    messagingServiceSid: "MGXXXXXXXXXXX",
    scheduleType: "fixed",
    sendAt: new Date("2023-11-30 20:36:27"),
    to: "whatsapp:+18005551234",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXX",
    content_sid="HXXXXXXXXXXXXXXX",
    content_variables=json.dumps(
        {"1": "YOUR_VARIABLE1", "2": "YOUR_VARIABLE2"}
    ),
    to="whatsapp:+18005551234",
    schedule_type="fixed",
    send_at=datetime(2023, 11, 30, 20, 36, 27),
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
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

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXX",
            contentSid: "HXXXXXXXXXXXXXXX",
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() {
                    { "1", "YOUR_VARIABLE1" }, { "2", "YOUR_VARIABLE2" }
                },
                Formatting.Indented),
            to: new Twilio.Types.PhoneNumber("whatsapp:+18005551234"),
            scheduleType: MessageResource.ScheduleTypeEnum.Fixed,
            sendAt: new DateTime(2023, 11, 30, 20, 36, 27, DateTimeKind.Utc));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message =
            Message
                .creator(new com.twilio.type.PhoneNumber("whatsapp:+18005551234"), "MGXXXXXXXXXXX", "HXXXXXXXXXXXXXXX")
                .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                    {
                        put("1", "YOUR_VARIABLE1");
                        put("2", "YOUR_VARIABLE2");
                    }
                }).toString())
                .setScheduleType(Message.ScheduleType.FIXED)
                .setSendAt(ZonedDateTime.of(2023, 11, 30, 20, 36, 27, 0, ZoneId.of("UTC")))
                .create();

        System.out.println(message.getBody());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	ContentVariables, ContentVariablesError := json.Marshal(map[string]interface{}{
		"1": "YOUR_VARIABLE1",
		"2": "YOUR_VARIABLE2",
	})

	if ContentVariablesError != nil {
		fmt.Println(ContentVariablesError)
		os.Exit(1)
	}

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXX")
	params.SetContentSid("HXXXXXXXXXXXXXXX")
	params.SetContentVariables(string(ContentVariables))
	params.SetTo("whatsapp:+18005551234")
	params.SetScheduleType("fixed")
	params.SetSendAt(time.Date(2023, 11, 30, 20, 36, 27, 0, time.UTC))

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "whatsapp:+18005551234", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXX",
        "contentSid" => "HXXXXXXXXXXXXXXX",
        "contentVariables" => json_encode([
            "1" => "YOUR_VARIABLE1",
            "2" => "YOUR_VARIABLE2",
        ]),
        "scheduleType" => "fixed",
        "sendAt" => new \DateTime("2023-11-30T20:36:27Z"),
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXX',
            content_sid: 'HXXXXXXXXXXXXXXX',
            content_variables: {
                '1' => 'YOUR_VARIABLE1',
                '2' => 'YOUR_VARIABLE2'
              }.to_json,
            to: 'whatsapp:+18005551234',
            schedule_type: 'fixed',
            send_at: Time.new(2023, 11, 30, 20, 36, 27)
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXX \
   --content-sid HXXXXXXXXXXXXXXX \
   --content-variables {\"1\":\"YOUR_VARIABLE1\",\"2\":\"YOUR_VARIABLE2\"} \
   --to whatsapp:+18005551234 \
   --schedule-type fixed \
   --send-at 2016-07-31
```

```bash
CONTENT_VARIABLES_OBJ=$(cat << EOF
{
  "1": "YOUR_VARIABLE1",
  "2": "YOUR_VARIABLE2"
}
EOF
)
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXX" \
--data-urlencode "ContentSid=HXXXXXXXXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
--data-urlencode "To=whatsapp:+18005551234" \
--data-urlencode "ScheduleType=fixed" \
--data-urlencode "SendAt=2016-07-31" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+18005551234",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Template status change alerts

Twilio returns specific error codes for `Alarms`, `Rejected`, and `Paused` WhatsApp templates. With [Twilio Alarms](/docs/messaging/guides/debugging-tools#custom-alerts), you can receive webhook or email notifications when these events occur. Alerts for approved templates are available as a beta feature.

For more information, see [alerts for rejected and paused WhatsApp templates](https://www.twilio.com/en-us/changelog/alerts-for-rejected-and-paused-whatsapp-templates-now-available).
