# Get an Event Webhook

## API Overview

The SendGrid Event Webhook sends email event data as SendGrid processes it. This means you can receive data in nearly real-time, making it ideal to integrate with logging or monitoring systems.

Because the Event Webhook delivers data to your systems, it is also well-suited to backing up and storing event data within your infrastructure to meet your own data access and retention needs.

## Event types

You can think about the types of events provided by the Event Webhook in two categories: deliverability events and engagement events.

* Deliverability events such as "delivered," "bounced," and "processed" help you understand if your email is being delivered to your customers.
* Engagement events such as "open," and "click" help you understand if customers are reading and interacting with your emails after they arrive.

Both types of events are important and should be monitored to understand the overall health of your email program. The Webhooks API allows you to configure your Event Webhook configurations.

## Data storage

Currently, data staged to be posted through the webhooks is stored in the US.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/user/webhooks/event/settings/{id}","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to retrieve a single Event Webhook by ID.**

If you do not pass a webhook ID to this endpoint, it will return your oldest webhook by `created_date`. This means the default webhook returned by this endpoint when no ID is provided will be the first one you created. This functionality allows customers who do not have multiple webhooks to use this endpoint to retrieve their only webhook, even if they do not supply an ID. If you have multiple webhooks, you can retrieve their IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.

### Event settings

Your webhook will be returned with all of its settings, which include the events that will be included in the POST request by the webhook and the URL where they will be sent. If an event type is marked as `true`, the event webhook will send information about that event type. See the [**Event Webhook Reference**](https://docs.sendgrid.com/for-developers/tracking-events/event#delivery-events) for details about each event type.

### Signature verification

The `public_key` property will be returned only for webhooks with signature verification enabled.

### OAuth

You may share one OAuth configuration across all your webhooks or create unique credentials for each. The OAuth properties will be returned only for webhooks with OAuth configured.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Path parameters

```json
[{"name":"id","in":"path","description":"The ID of the Event Webhook you want to retrieve.","required":true,"schema":{"type":"string"},"examples":{"ID Example":{"value":"77d4a5da-7015-11ed-a1eb-0242ac120002"}},"refName":"#/components/parameters/RequestId","modelName":"__components_parameters_RequestId"}]
```

### Query string

```json
[{"name":"include","in":"query","description":"Use this to include optional fields in the response payload. When this is set to `include=account_status_change`, the `account_status_change` field will be part of the response payload and set to `false` by default. See [Update an event webhook](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook) for enabling this webhook notification which lets you subscribe to account status change events related to compliance action taken by SendGrid.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/Include","modelName":"__components_parameters_Include"}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","refName":"EventWebhookNoDatesResponse","modelName":"EventWebhookNoDatesResponse","properties":{"enabled":{"type":"boolean","description":"Indicates if the Event Webhook is enabled."},"url":{"type":"string","description":"The URL where SendGrid will send event data."},"account_status_change":{"type":"boolean","description":"Indicates if the webhook is configured to send account status change events related to compliance action taken by SendGrid."},"group_resubscribe":{"type":"boolean","description":"Indicates if the webhook is configured to send group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event."},"delivered":{"type":"boolean","description":"Indicates if the webhook is configured to send delivered events. Delivered events occur when a message has been successfully delivered to the receiving server."},"group_unsubscribe":{"type":"boolean","description":"Indicates if the webhook is configured to send group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event."},"spam_report":{"type":"boolean","description":"Indicates if the webhook is configured to send spam report events. Spam reports occur when recipients mark a message as spam."},"bounce":{"type":"boolean","description":"Indicates if the webhook is configured to send bounce events. A bounce occurs when a receiving server could not or would not accept a message."},"deferred":{"type":"boolean","description":"Indicates if the webhook is configured to send deferred events. Deferred events occur when a recipient's email server temporarily rejects a message."},"unsubscribe":{"type":"boolean","description":"Indicates if the webhook is configured to send unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event."},"processed":{"type":"boolean","description":"Indicates if the webhook is configured to send processed events. Processed events occur when a message has been received by Twilio SendGrid and is ready to be delivered."},"open":{"type":"boolean","description":"Indicates if the webhook is configured to send open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event."},"click":{"type":"boolean","description":"Indicates if the webhook is configured to send click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event."},"dropped":{"type":"boolean","description":"Indicates if the webhook is configured to send dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota."},"friendly_name":{"type":"string","description":"An optional friendly name assigned to the Event Webhook to help you differentiate it. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.","nullable":true},"id":{"type":"string","description":"A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property."},"oauth_client_id":{"type":"string","description":"The OAuth client ID SendGrid sends to your OAuth server or service provider to generate an OAuth access token.","nullable":true},"oauth_token_url":{"type":"string","description":"The URL where SendGrid sends the OAuth client ID and client secret to generate an access token. This should be your OAuth server or service provider.","nullable":true},"public_key":{"type":"string","description":"The public key you can use to verify the SendGrid signature."}}},"examples":{"One of Multiple Webhooks":{"value":{"enabled":true,"url":"https://emaildelivery.example.com","group_resubscribe":false,"delivered":true,"group_unsubscribe":false,"spam_report":true,"bounce":true,"deferred":true,"unsubscribe":true,"processed":true,"open":true,"click":true,"dropped":true,"friendly_name":"Delivery Webhook","id":"77d4a5da-7015-11ed-a1eb-0242ac120002","oauth_client_id":"a835e7210bbb47edbfa71bdfc909b2d7","oauth_token_url":"https://oauthservice.example.com","public_key":"123publickeyabc","created_at":"2023-01-01T12:00:00Z","updated_at":"2023-02-15T10:00:00Z"}},"One of One Webhooks":{"value":{"enabled":true,"url":"https://emaildelivery.example.com","group_resubscribe":false,"delivered":true,"group_unsubscribe":false,"spam_report":true,"bounce":true,"deferred":true,"unsubscribe":true,"processed":true,"open":true,"click":true,"dropped":true,"id":"77d4a5da-7015-11ed-a1eb-0242ac120002","oauth_client_id":"a835e7210bbb47edbfa71bdfc909b2d7","oauth_token_url":"https://oauthservice.example.com","public_key":"123publickeyabc"}}}}}}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"Error message."}}}}}},"examples":{"Not found":{"value":{"errors":[{"message":"Invalid id provided."}]}}}}}}}]
```

Get an Event Webhook

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const id = "id";

const request = {
  url: `/v3/user/webhooks/event/settings/${id}`,
  method: "GET",
};

client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch((error) => {
    console.error(error);
  });
```

```python
import os
from sendgrid import SendGridAPIClient


sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

id = "id"

response = sg.client.user.webhooks.event.settings._(id).get()

print(response.status_code)
print(response.body)
print(response.headers)
```

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;

public class Program {
    public static async Task Main() {
        string apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);

        var id = "id";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: $"user/webhooks/event/settings/{id}");

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/user/webhooks/event/settings/id");
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

```go
package main

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"os"
)

func main() {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"
	request := sendgrid.GetRequest(apiKey, "/v3/user/webhooks/event/settings/id", host)
	request.Method = "GET"
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

```php
<?php
// Uncomment the next line if you're using a dependency loader (such as Composer) (recommended)
// require 'vendor/autoload.php';

// Uncomment next line if you're not using a dependency loader (such as Composer)
// require_once '<PATH TO>/sendgrid-php.php';

$apiKey = getenv("SENDGRID_API_KEY");
$sg = new \SendGrid($apiKey);
$id = "id";

try {
    $response = $sg->client
        ->user()
        ->webhooks()
        ->event()
        ->settings()
        ->_($id)
        ->get();
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $ex) {
    echo "Caught exception: " . $ex->getMessage();
}
```

```ruby
require 'sendgrid-ruby'
include SendGrid

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
id = "id"

response = sg.client.user.webhooks.event.settings._(id).get()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X GET "https://api.sendgrid.com/v3/user/webhooks/event/settings/id" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```

Include account\_status\_change in the response payload

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const id = "id";
const queryParams = { include: "account_status_change" };

const request = {
  url: `/v3/user/webhooks/event/settings/${id}`,
  method: "GET",
  qs: queryParams,
};

client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch((error) => {
    console.error(error);
  });
```

```python
import os
from sendgrid import SendGridAPIClient


sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

id = "id"
params = {"include": "account_status_change"}

response = sg.client.user.webhooks.event.settings._(id).get(query_params=params)

print(response.status_code)
print(response.body)
print(response.headers)
```

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;

public class Program {
    public static async Task Main() {
        string apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);

        var id = "id";
        var queryParams = @"{'include': 'account_status_change'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: $"user/webhooks/event/settings/{id}",
            queryParams: queryParams);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/user/webhooks/event/settings/id");
            request.addQueryParam("include", "account_status_change");
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

```go
package main

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"os"
)

func main() {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"
	request := sendgrid.GetRequest(apiKey, "/v3/user/webhooks/event/settings/id", host)
	request.Method = "GET"
	queryParams := make(map[string]string)
	queryParams["include"] = "account_status_change"
	request.QueryParams = queryParams
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

```php
<?php
// Uncomment the next line if you're using a dependency loader (such as Composer) (recommended)
// require 'vendor/autoload.php';

// Uncomment next line if you're not using a dependency loader (such as Composer)
// require_once '<PATH TO>/sendgrid-php.php';

$apiKey = getenv("SENDGRID_API_KEY");
$sg = new \SendGrid($apiKey);
$query_params = json_decode('{
    "include": "account_status_change"
}');
$id = "id";

try {
    $response = $sg->client
        ->user()
        ->webhooks()
        ->event()
        ->settings()
        ->_($id)
        ->get(null, $query_params);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $ex) {
    echo "Caught exception: " . $ex->getMessage();
}
```

```ruby
require 'sendgrid-ruby'
include SendGrid

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
id = "id"
params = JSON.parse('{
  "include": "account_status_change"
}')

response = sg.client.user.webhooks.event.settings._(id).get(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/user/webhooks/event/settings/id?include=account_status_change" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
