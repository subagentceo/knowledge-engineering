# Set Up A2P 10DLC Event Streams

This guide helps Twilio customers implement A2P Messaging for Brands, Campaigns, and 10DLC Phone Numbers. It details how to subscribe to and receive notifications on status changes using Twilio's [Event Streams](/docs/events) feature. By setting up a **Sink** (in this case, a **webhook**), users can receive real-time updates on Brand or Campaign submissions, approvals, rejections, and phone number status changes in the A2P registration process.

This document covers the following:

* How to configure Event Sinks and Subscriptions via the Event Streams API, ideal for customers managing multiple brands, campaigns and 10DLC registrations.
* Instructions for using the Event Streams Console for Direct customers.
* A breakdown of JSON **payloads** for event messages, including example payloads for each event type.

## Set up Event Streams via the Event Streams API

To set up webhook Sinks and event subscriptions via the Event Streams API, follow these steps:

1. Create a Sink resource.
2. Identify the event types of interest.
3. Subscribe to specific events for a chosen Sink.

> \[!NOTE]
>
> Independent Software Vendors (ISVs) managing separate subaccounts for each client must configure the Event Stream (Sink and Subscription) individually for each subaccount.

### 1 Create a new Sink resource

Create a new **Sink** by making a `POST/create` call to the `sinks` endpoint of the [Events API](/docs/events).

Sinks are destinations for events from a subscription. Each Sink has these properties:

* `sink_type`: currently supports three types: AWS Kinesis (`kinesis`), Webhooks (`webhook`), and Segment (`segment`).
* `sink_configuration`: defines the setup; see below.
* `description`: a friendly name.

If configuring for a secondary customer whose Profile/Brand/Campaign is in a subaccount, use its `account_sid` and `auth_token` for this and the Subscription creation call in **Step 1.3**.

`sink_configuration` varies by Sink type. For Webhooks, it looks like this:

```json
"sink_configuration": { 
  "destination": "http://example.org/webhook",
  "method": "<POST|GET>",
  "batch_events": <true|false>
}
```

| Parameter     | Description                      | Accepted values | Example                      |
| ------------- | -------------------------------- | --------------- | ---------------------------- |
| `destination` | The customer's URL endpoint      | Webhook URL     | `http://example.org/webhook` |
| `method`      | The HTTP method for the webhook. | `GET` ,  `POST` |                              |

The `sid` returned from this call is used as the `sink_sid` in **Step 1.3**.

Create Sink

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSink() {
  const sink = await client.events.v1.sinks.create({
    description: "My A2P Sink",
    sinkConfiguration: {
      destination: "http://example.org/webhook",
      method: "<POST|GET>",
      batch_events: "<true|false>",
    },
    sinkType: "webhook",
  });

  console.log(sink.dateCreated);
}

createSink();
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

sink = client.events.v1.sinks.create(
    description="My A2P Sink",
    sink_type="webhook",
    sink_configuration={
        "destination": "http://example.org/webhook",
        "method": "<POST|GET>",
        "batch_events": "<true|false>",
    },
)

print(sink.date_created)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Events.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var sink = await SinkResource.CreateAsync(
            description: "My A2P Sink",
            sinkType: SinkResource.SinkTypeEnum.Webhook,
            sinkConfiguration: new Dictionary<string, Object>() {
                { "destination", "http://example.org/webhook" },
                { "method", "<POST|GET>" },
                { "batch_events", "<true|false>" }
            });

        Console.WriteLine(sink.DateCreated);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.events.v1.Sink;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Sink sink = Sink.creator("My A2P Sink", new HashMap<String, Object>() {
                            {
                                put("destination", "http://example.org/webhook");
                                put("method", "<POST|GET>");
                                put("batch_events", "<true|false>");
                            }
                        }, Sink.SinkType.WEBHOOK).create();

        System.out.println(sink.getDateCreated());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	events "github.com/twilio/twilio-go/rest/events/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &events.CreateSinkParams{}
	params.SetDescription("My A2P Sink")
	params.SetSinkType("webhook")
	params.SetSinkConfiguration(map[string]interface{}{
		"destination":  "http://example.org/webhook",
		"method":       "<POST|GET>",
		"batch_events": "<true|false>",
	})

	resp, err := client.EventsV1.CreateSink(params)
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

$sink = $twilio->events->v1->sinks->create(
    "My A2P Sink", // Description
    [
        "destination" => "http://example.org/webhook",
        "method" => "<POST|GET>",
        "batch_events" => "<true|false>",
    ], // SinkConfiguration
    "webhook" // SinkType
);

print $sink->dateCreated?->format("r");
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

sink = @client
       .events
       .v1
       .sinks
       .create(
         description: 'My A2P Sink',
         sink_type: 'webhook',
         sink_configuration: {
           'destination' => 'http://example.org/webhook',
           'method' => '<POST|GET>',
           'batch_events' => '<true|false>'
         }
       )

puts sink.date_created
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:events:v1:sinks:create \
   --description "My A2P Sink" \
   --sink-type webhook \
   --sink-configuration "{\"destination\":\"http://example.org/webhook\",\"method\":\"<POST|GET>\",\"batch_events\":\"<true|false>\"}"
```

```bash
SINK_CONFIGURATION_OBJ=$(cat << EOF
{
  "destination": "http://example.org/webhook",
  "method": "<POST|GET>",
  "batch_events": "<true|false>"
}
EOF
)
curl -X POST "https://events.twilio.com/v1/Sinks" \
--data-urlencode "Description=My A2P Sink" \
--data-urlencode "SinkType=webhook" \
--data-urlencode "SinkConfiguration=$SINK_CONFIGURATION_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "status": "initialized",
  "sink_configuration": {
    "destination": "http://example.org/webhook",
    "method": "<POST|GET>",
    "batch_events": "<true|false>"
  },
  "description": "My A2P Sink",
  "sid": "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "sink_type": "webhook",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://events.twilio.com/v1/Sinks/DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sink_test": "https://events.twilio.com/v1/Sinks/DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Test",
    "sink_validate": "https://events.twilio.com/v1/Sinks/DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Validate"
  }
}
```

### 2 Event types and type IDs

You can fetch a list of all event types that you can subscribe to from the `event_type` endpoint of the Events API. You must pass all of these inside the `types` parameter object when you create your subscription in the next step.

#### Brand and Campaign registration events

Here is a list of the nine event types linked to **A2P Brand and Campaign registration**. It includes their Event Type ID strings.

| **Event Type**                           | **Event Type ID**                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| Brand Registered                         | `com.twilio.messaging.compliance.brand-registration.brand-registered`                |
| Brand Registration Failure               | `com.twilio.messaging.compliance.brand-registration.brand-failure`                   |
| Brand Verified                           | `com.twilio.messaging.compliance.brand-registration.brand-verified`                  |
| Brand Unverified                         | `com.twilio.messaging.compliance.brand-registration.brand-unverified`                |
| Brand Vetted Verified                    | `com.twilio.messaging.compliance.brand-registration.brand-vetted-verified`           |
| Brand Secondary Vetting Failure          | `com.twilio.messaging.compliance.brand-registration.brand-secondary-vetting-failure` |
| Campaign Registration Submitted          | `com.twilio.messaging.compliance.campaign-registration.campaign-submitted`           |
| Campaign Registration Failed or Rejected | `com.twilio.messaging.compliance.campaign-registration.campaign-failure`             |
| Campaign Registration Approved           | `com.twilio.messaging.compliance.campaign-registration.campaign-approved`            |

#### Phone Number registration events

This list includes all six event types linked to **A2P phone number registration**, along with their Event Type ID string.

| **Event type**                   | **Event type ID**                                                  |
| -------------------------------- | ------------------------------------------------------------------ |
| Number Deregistration Failed     | `com.twilio.messaging.compliance.number-deregistration.failed`     |
| Number Deregistration Pending    | `com.twilio.messaging.compliance.number-deregistration.pending`    |
| Number Deregistration Successful | `com.twilio.messaging.compliance.number-deregistration.successful` |
| Number Registration Failed       | `com.twilio.messaging.compliance.number-registration.failed`       |
| Number Registration Pending      | `com.twilio.messaging.compliance.number-registration.pending`      |
| Number Registration Successful   | `com.twilio.messaging.compliance.number-registration.successful`   |

### 3 Create a subscription to specific events, for a specific Sink

To create a new subscription, make a `POST/create` request to the `subscriptions` endpoint of the Events API. This request links a set of event types with a **Sink**. The Sink will receive messages when these events occur.

The subscription creation request includes the following parameters:

* `description` - a short description of the subscription, linked to the Sink you're specifying.
* `sink_sid` - the SID of the Sink you created earlier in Step 1.
* `types` - a list of event type IDs you want to subscribe to. The format of this list depends on the library you're using. For Python, the format looks like this:

```javascript
types=[
  {'type': 'com.twilio.messaging.message.delivered'}, 
  {'type': 'com.twilio.messaging.message.sent', 'schema_version': 2}
],
```

In this example, you subscribe to two events: `messaging.message.delivered` and `messaging.message.sent`. Your request should include all 6 events mentioned earlier. The second event in the example specifies a `schema_version` of 2. If not set, the default schema version 1 is used. Currently, only schema version 1 is available for A2P events.

Create a new Subscription

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSubscription() {
  const subscription = await client.events.v1.subscriptions.create({
    description: '"My A2P Subscription"',
    sinkSid: "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    types: [
      {
        type: "com.twilio.messaging.message.delivered",
      },
      {
        type: "com.twilio.messaging.message.sent",
        schema_version: 2,
      },
    ],
  });

  console.log(subscription.accountSid);
}

createSubscription();
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

subscription = client.events.v1.subscriptions.create(
    description='"My A2P Subscription"',
    sink_sid="DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    types=[
        {"type": "com.twilio.messaging.message.delivered"},
        {"type": "com.twilio.messaging.message.sent", "schema_version": 2},
    ],
)

print(subscription.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Events.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var subscription = await SubscriptionResource.CreateAsync(
            description: "\"My A2P Subscription\"",
            sinkSid: "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            types: new List<Object> {
                new Dictionary<string, Object>() {
                    { "type", "com.twilio.messaging.message.delivered" }
                },
                new Dictionary<string, Object>() {
                    { "type", "com.twilio.messaging.message.sent" }, { "schema_version", 2 }
                }
            });

        Console.WriteLine(subscription.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.events.v1.Subscription;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Subscription subscription = Subscription
                                        .creator("\"My A2P Subscription\"",
                                            "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                            Arrays.asList(
                                                new HashMap<String, Object>() {
                                                    {
                                                        put("type", "com.twilio.messaging.message.delivered");
                                                    }
                                                },
                                                new HashMap<String, Object>() {
                                                    {
                                                        put("type", "com.twilio.messaging.message.sent");
                                                        put("schema_version", 2);
                                                    }
                                                }))
                                        .create();

        System.out.println(subscription.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	events "github.com/twilio/twilio-go/rest/events/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &events.CreateSubscriptionParams{}
	params.SetDescription("\"My A2P Subscription\"")
	params.SetSinkSid("DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	params.SetTypes([]interface{}{
		map[string]interface{}{
			"type": "com.twilio.messaging.message.delivered",
		},
		map[string]interface{}{
			"type":           "com.twilio.messaging.message.sent",
			"schema_version": 2,
		},
	})

	resp, err := client.EventsV1.CreateSubscription(params)
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

$subscription = $twilio->events->v1->subscriptions->create(
    "\"My A2P Subscription\"", // Description
    "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // SinkSid
    [
        [
            "type" => "com.twilio.messaging.message.delivered",
        ],
        [
            "type" => "com.twilio.messaging.message.sent",
            "schema_version" => 2,
        ],
    ] // Types
);

print $subscription->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

subscription = @client
               .events
               .v1
               .subscriptions
               .create(
                 description: '"My A2P Subscription"',
                 sink_sid: 'DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                 types: [
                   {
                     'type' => 'com.twilio.messaging.message.delivered'
                   },
                   {
                     'type' => 'com.twilio.messaging.message.sent',
                     'schema_version' => 2
                   }
                 ]
               )

puts subscription.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:events:v1:subscriptions:create \
   --description "\"My A2P Subscription\"" \
   --sink-sid DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --types "{\"type\":\"com.twilio.messaging.message.delivered\"}" "{\"type\":\"com.twilio.messaging.message.sent\",\"schema_version\":2}"
```

```bash
curl -X POST "https://events.twilio.com/v1/Subscriptions" \
--data-urlencode "Description=\"My A2P Subscription\"" \
--data-urlencode "SinkSid=DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Types={\"type\":\"com.twilio.messaging.message.delivered\"}" \
--data-urlencode "Types={\"type\":\"com.twilio.messaging.message.sent\",\"schema_version\":2}" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:01:33Z",
  "sid": "DFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sink_sid": "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "description": "\"My A2P Subscription\"",
  "url": "https://events.twilio.com/v1/Subscriptions/DFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "subscribed_events": "https://events.twilio.com/v1/Subscriptions/DFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SubscribedEvents"
  }
}
```

## Set up Webhooks and subscribe to A2P Registration Events via the Event Streams Console

1. To access Event Streams, visit the [Event Streams Sinks page](https://console.twilio.com/us1/develop/event-streams/sinks).
2. On the **Event Streams Sinks** page, find the **Manage Sinks and Subscriptions** section. If you do not already have Sinks and Subscriptions, create your first Sink.
3. Click the blue **Create** button to reveal a dropdown menu. Select **New sink** to navigate to the **Create new Sink** page.
4. A Sink is a destination type for the event messages you'll be subscribing to. Configure a **Webhook** as your Sink. Enter a **Sink description**, such as "A2P Registration Event Sink," then select **Webhook** and click **Next step**.
5. For **Destination**, specify the URL endpoint that this Webhook will call to deliver its event message payload as a `POST`. This endpoint should be a dedicated page on your public site, coded to parse and respond to the JSON payload. **Part 3** below provides example payloads for each event message.
6. Click **Finish** when you're done. A success dialog will appear, inviting you to either test this new Sink immediately (which will send a generic message payload to your specified endpoint) or proceed to create a **subscription** to listen for specific events.
7. Click **Create subscription** to open the **Create a new subscription** page. First, select the Sink from the dropdown where you want to deliver these events. Choose the Sink you just created (e.g., "A2P Registration Event Sink"). Then, name your new subscription, following a similar naming convention, such as "A2P Registration Event Subscription."
8. Choose the specific events you'd like to subscribe to. Under **Product groups**, select **Messaging**. The first set of Messaging events includes an **A2P** collection of 12 events. Indicate your selection by choosing a schema. For A2P events, select schema version 1 under **Apply schema version to all** for this event collection.
9. Finally, click the blue **Create subscription** button in the lower right. You have now completed the Event Streams setup.

How often you need to perform this setup depends on how you create Brands and Campaigns and register phone numbers for secondary clients.

* If you create or register within your main account, perform this Event Streams setup once. Your Sink captures Brand and Campaign registration events subscription for *any and all* of your clients. To identify which client owns an event message, use the Brand, Campaign, or Messaging Service SID found in the message payload.
* If you create a **separate subaccount** for Brand, Campaign, and Number registration, configure both the Event Sink and Subscription setup in *each subaccount*. Prior to the first step in this section, switch from your main account to the relevant subaccount.

## Read the Payloads for each event message

As mentioned in [Section 1](#1-create-a-new-sink-resource), you will subscribe to 15 events for A2P Brand, Campaign, and Number registration. Below are the JSON payloads. We include explanations for important return parameters when needed.

### Brand registered

This message indicates that a Brand has been successfully submitted and registered, but doesn't reflect the verification status.

```json
[ 
{
  "specversion": "1.0",
  "type": "com.twilio.messaging.compliance.brand-registration.brand-registered",
  "source": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dataschema": "https://events-schemas.twilio.com/A2P.BrandRegistered/1",
  "datacontenttype": "application/json",
  "time": "2025-03-27T18:28:52.962Z",
  "data": {
    "accountsid": "ACXXXXXXXXX",
    "brandsid": "BNXXXXXXXXX",
    "brandstatus": "registered",
    "createddate": 1743100129625,
    "updateddate": 1743100132872,
    "externalbrandid": "XXXXXXX"
  }
}
]
```

#### Brand registration failure

This message is triggered when the initial Brand submission fails due to API validation errors.

```json
[{
  "data": {
    "accountsid": "ACXXXXXXXXX",
    "brandsid": "BNXXXXXXXXX",
    "brandstatus": "registration_failed",
    "createddate": 1687789009019,
    "updateddate": 1687789009019
  },
  "datacontenttype": "application/json",
  "dataschema": "https://events-schemas.stage.twilio.com/A2P.BrandRegistrationFailure/1",
  "id": "CE000000000000000000000000000000",
  "source": "CA000000000000000000000000000000",
  "specversion": "1.0",
  "time": "2023-06-26T14:16:50.481Z",
  "type": "com.twilio.messaging.compliance.brand-registration.brand-failure"
}
}
]
```

### Brand verified

This message indicates that a Brand has successfully passed identity verification and is ready to proceed with campaign registration, if secondary vetting was not elected.

```json
[
{
  "specversion": "1.0",
  "type": "com.twilio.messaging.compliance.brand-registration.brand-verified",
  "source": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dataschema": "https://events-schemas.twilio.com/A2P.BrandRegistrationVerified/1",
  "datacontenttype": "application/json",
  "time": "2025-03-27T18:29:42.162Z",
  "data": {
    "accountsid": "ACXXXXXXXXX",
    "brandsid": "BNXXXXXXXXX",
    "brandstatus": "registered",
    "identitystatus": "verified",
    "createddate": 1743100129625,
    "updateddate": 1743100181955,
    "externalbrandid": "XXXXXXX",
    "brandfeedback": ""
  }
}
]
```

### Brand registered unverified

This message indicates that the Brand was submitted and registered, but failed the initial verification and includes detailed error information.

```json
[
  "specversion": "1.0",
  "type": "com.twilio.messaging.compliance.brand-registration.brand-unverified",
  "source": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dataschema": "https://events-schemas.twilio.com/A2P.BrandRegistrationUnverified/1",
  "datacontenttype": "application/json",
  "time": "2025-03-27T18:29:42.162Z",
  "data": {
    "accountsid": "ACXXXXXXXXX",
    "brandsid": "BNXXXXXXXXX",
    "brandstatus": "registered",
    "identitystatus": "unverified",
    "createddate": 1743100641221,
    "brandregistrationerrors": [
      {
        "registrationerrorcode": 30795,
        "registrationerrordescription": "Brand Registration Feedback: The submitted US EIN is invalid.",
        "registrationerrorurl": "https://www.twilio.com/docs/api/errors/30795",
        "registrationerrorfields": [
          "business_registration_number",
          "business_registration_identifier",
          "business_name"
        ]
      }
    ],
    "updateddate": 1743100661912,
    "externalbrandid": "XXXXXXX",
    "brandfeedback": "TAX_ID"
  }
}
]
```

### Brand vetted verified

This message indicates that the Brand with secondary vetting is now registered and can proceed to campaign creation under the Brand.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.brand-registration.brand-vetted-verified",
    "source": "340d2dcd-7a3d-ea44-cbaa-233c63aefc9b",
    "id": "340d2dcd-7a3d-ea44-cbaa-233c63aefc9b",
    "dataschema": "https://events-schemas.twilio.com/A2P.BrandRegistrationVettedVerified/1",
    "datacontenttype": "application/json",
    "time": "2025-03-27T18:31:36.616Z",
    "data": {
      "accountsid": "ACf82b22968eb9bec61d51b95fb9548d6d",
      "brandsid": "BN340d2dcd7a3de1bdcbaa233c63aefc9b",
      "brandstatus": "registered",
      "identitystatus": "vetted_verified",
      "brandvettingoutcome": "success",
      "createddate": 1743100129625,
      "updateddate": 1743100295373,
      "vettingscore": 80,
      "externalbrandid": "BILW6DT",
      "brandfeedback": "",
      "brandscore": 80
    }
  }
]
```

### Brand Secondary Vetting Failure

This message indicates that a Brand failed secondary vetting. The payload includes error reasons for debugging.

```json
{
  "specversion": "1.0",
  "type": "com.twilio.messaging.compliance.brand-registration.brand-secondary-vetting-failure",
  "source": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "dataschema": "https://events-schemas.twilio.com/A2P.BrandRegistrationSecondaryVettingFailure/1",
  "datacontenttype": "application/json",
  "time": "2025-03-27T18:40:00.000Z",
  "data": {
    "accountsid": "ACXXXXXXXXX",
    "brandsid": "BNXXXXXXXXX",
    "brandstatus": "registered",
    "identitystatus": "vetting_failed",
    "brandvettingoutcome": "failure",
    "createddate": 1743100300000,
    "updateddate": 1743100400000,
    "externalbrandid": "XXXXXXX",
    "brandvettingerrors": [
      {
        "errorcode": 30801,
        "errordescription": "The submitted business address could not be verified."
      }
    ]
  }
}
```

### Campaign registration submitted

This message means that you have successfully submitted the Campaign. It is now waiting for approval from TCR. The customer does not need to do anything at this time.

```json
[
  {
    "data": {
      "a2pusecase": "MIXED",
      "accountsid": "ACXXXXXXXXX",
      "brandsid": "BNXXXXXXXXX",
      "campaignregistrationstatus": "pending",
      "campaignsid": "CMXXXXXXXXX",
      "createddate": 1687892791272,
      "messagingservicesid": "MGXXXXXXXXX",
      "timestamp": 1687892792294,
      "updateddate": 1687892791272
    },
    "datacontenttype": "application/json",
    "dataschema": "https://events-schemas.stage.twilio.com/A2P.CampaignRegistrationSubmitted/1",
    "id": "CE000000000000000000000000000000",
    "source": "CA000000000000000000000000000000",
    "specversion": "1.0",
    "time": "2023-06-27T19:06:32.294Z",
    "type": "com.twilio.messaging.compliance.campaign-registration.campaign-submitted"
  }
]
```

Use `brandsid` and/or `campaignsid` to find out which customer's Campaign this Event is about. The event's `type` is `com.twilio.messaging.compliance.campaign-registration.campaign-submitted`.

### Campaign registration approved

This event occurs after the Campaign receives all necessary approvals. After this, the system adds all numbers to the number pool of the Messaging service for that Campaign. Once the system registers these phone numbers, the new Campaign is ready to start.

```json
[
  {
    "data": {
      "a2pusecase": "MIXED",
      "accountsid": "ACXXXXXXXXX",
      "brandsid": "BNXXXXXXXXX",
      "campaignregistrationstatus": "success",
      "campaignsid": "CMXXXXXXXXX",
      "createddate": 1687892791272,
      "externalcampaignid": "XXXXXXX",
      "messagingservicesid": "MGXXXXXXXXX",
      "timestamp": 1687892792294,
      "updateddate": 1687892791272,
    },
    "datacontenttype": "application/json",
    "dataschema": "https://events-schemas.stage.twilio.com/A2P.CampaignRegistrationApproved/1",
    "id": "CE000000000000000000000000000000",
    "source": "CA000000000000000000000000000000",
    "specversion": "1.0",
    "time": "2023-06-27T19:06:32.294Z",
    "type": "com.twilio.messaging.compliance.campaign-registration.campaign-approved"
  }
]
```

Use `brandsid` and/or `campaignsid` to determine which customer campaign this event belongs to. The event `type` is `com.twilio.messaging.compliance.campaign-registration.campaign-approved`.

### Campaign registration failure

Currently, this event message appears in two situations. First, when a Campaign fails to submit successfully due to an issue with the initial Twilio API call. Second, when a Campaign submits successfully but is later rejected during the vetting process.

To identify the affected customer's Campaign, use `brandsid` and/or `campaignsid`.

```json
[
  {
    "data": {
      "a2pusecase": "MIXED",
      "accountsid": "ACXXXXXXXXX",
      "brandsid": "BNXXXXXXXXX",
      "campaignregistrationstatus": "failure",
      "campaignsid": "CMXXXXXXXXX",
      "createddate": 1687892791272,
      "messagingservicesid": "MGXXXXXXXXX",
      "timestamp": 1687892792294,
      "updateddate": 1687892791272
    },
    "datacontenttype": "application/json",
    "dataschema": "https://events-schemas.stage.twilio.com/A2P.CampaignRegistrationFailure/1",
    "id": "CE000000000000000000000000000000",
    "source": "CA000000000000000000000000000000",
    "specversion": "1.0",
    "time": "2023-06-27T19:06:32.294Z",
    "type": "com.twilio.messaging.compliance.campaign-registration.campaign-failure"
  }
]
```

Like the failed Brand event message, future updates will add a `campaignfailurereason` parameter. This will explain why a Campaign's registration failed.

For further troubleshooting, review [Troubleshooting and Rectifying Campaigns](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-campaigns-1).

### Number deregistration failed

This event message indicates that number deregistration has failed. Below is an example of what the event payload might look like.

* `accountsid` is the account or subaccount where you registered this phone number.
* `campaignsid` is the Campaign SID from which the system attempted to remove the number.
* `externalstatus` field points to the current registration status for the phone number, which in this case indicates a failure.
* `failurereason` provides the customer with more information about this failure. At this point, the system failed to deregister your phone number, and you cannot use it to send messages, nor can you use it in another messaging service.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.
* `type` is the full event type ID, in this case `com.twilio.messaging.compliance.number-deregistration.failed`.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-deregistration.failed",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberDeregistrationFailed/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "campaignsid": "CMXXXXXXXXXXXXXXXX",
      "externalstatus": "failure",
      "failureReason": "https://www.twilio.com/docs/api/errors/30126",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```

### Number deregistration pending

This event message indicates that the number deregistration process is pending. Below is an example of what the event payload might look like.

* `accountsid` is the account or subaccount where you registered this phone number.
* `campaignsid` is the Campaign SID from which the system is attempting to remove the number.
* `externalstatus` field points to the current registration status for the phone number, which in this case indicates it is pending. At this point, the system is in the process of removing this phone number from a Campaign, and you cannot use it to send messages, nor can you use it in another Messaging Service.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.
* `type` is the full event type ID, in this case `com.twilio.messaging.compliance.number-deregistration.pending`.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-deregistration.pending",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberDeregistrationPending/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "campaignsid": "CMXXXXXXXXXXXXXXXX",
      "externalstatus": "pending_deregistration",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```

### Number deregistration successful

This event message indicates that the number deregistration process is successful. Below is an example of what the event payload might look like.

* `accountsid` is the account or subaccount where you registered this phone number.
* There is no `campaignsid` because the number doesn't currently belong to any Campaign.
* `externalstatus` field points to the current registration status for the phone number, which in this case indicates that the system has unregistered it. At this point, the system has completed the deregistration process for your phone number, and you can no longer use it to send messages. You can now use this number in another Messaging Service/Campaign or re-add it to the same Messaging Service/Campaign.
* `type` is the full event type ID, in this case `com.twilio.messaging.compliance.number-deregistration.successful`.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-deregistration.successful",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberDeregistrationSuccessful/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "externalstatus": "unregistered",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```

### Number registration failed

This message tells you that a number registration did not succeed. Here's a sample of what the event details might include:

* `accountsid` shows the main or secondary account where you listed this number.
* `campaignsid` is the SID for the attempt to remove the number.
* `externalstatus` shows the current status of the number's registration, which indicates a failure in this case.
* `failurereason` gives more details on why the registration failed. The system has not successfully registered your number, and you cannot use it to send messages or in another messaging service.
* `type` is the specific event type ID. Here it's `com.twilio.messaging.compliance.number-registration.failed`.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-registration.failed",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberRegistrationFailed/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "campaignsid": "CMXXXXXXXXXXXXXXXX",
      "externalstatus": "failure",
      "failureReason": "https://www.twilio.com/docs/api/errors/30126",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```

### Number registration pending

This message means the Number registration is still in progress. Here's a sample of how the event details might appear:

* `accountsid` refers to the specific account or subaccount to which you are registering this phone number.
* `campaignsid` is the ID of the Usa2p Resource linked to the phone number.
* `externalstatus` shows the current registration status of the phone number.
* `type` represents the unique event type ID. Here, it's `com.twilio.messaging.compliance.number-registration.pending`.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.

In the given example, the `externalstatus` indicates that the phone number registration is incomplete and the number is not ready for message sending.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-registration.pending",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberRegistrationPending/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "campaignsid": "CMXXXXXXXXXXXXXXXX",
      "externalstatus": "pending_registration",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```

### Number registration successful

This message confirms the Number registration was successful. Here's an example of the event payload:

* `accountsid` shows the account or subaccount where you registered this phone number.
* `campaignsid` is the SID to which you added the number.
* `externalstatus` shows the phone number's current registration status, which is `registered`. Now, your phone number is fully registered and ready to send messages to your customers.
* `type` is the event type ID. Here, it is `com.twilio.messaging.compliance.number-registration.successful`.
* `messagingservicesid` is the ID of the messaging service that the `phonenumber` is registered to.

```json
[
  {
    "specversion": "1.0",
    "type": "com.twilio.messaging.compliance.number-registration.successful",
    "source": "CA000000000000000000000000000000",
    "id": "CE000000000000000000000000000000",
    "dataschema": "https://events-schemas.twilio.com/A2P.NumberRegistrationSuccessful/1",
    "datacontenttype": "application/json",
    "time": "2024-03-13T15:51:10.552Z",
    "data": {
      "accountsid": "ACXXXXXXXXXXXXXXXXXXXXXXXX",
      "timestamp": 1710345070552,
      "id": "fd902aed-ca5a-8e26-85ee-35bdbf3503ea",
      "campaignsid": "CMXXXXXXXXXXXXXXXX",
      "externalstatus": "registered",
      "phonenumbersid": "PNXXXXXXXXXXXXXXXX",
      "updateddate": 1710345070476,
      "phonenumber": "1234567890",
      "messagingservicesid": "MGff4da560a706b5c36a8e5497f31515c8"
    }
  }
]
```
