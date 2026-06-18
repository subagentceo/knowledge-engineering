# Test Event Notification Settings

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
{"path":"https://api.sendgrid.com/v3/user/webhooks/event/test","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to test an Event Webhook.**

Retry logic for this endpoint differs from other endpoints, which use a rolling 24-hour retry.

This endpoint will make a POST request with a fake event notification to a URL you provide. This allows you to verify that you have properly configured the webhook before sending real data to your URL.

### Test OAuth configuration

To test your OAuth configuration, you must include the necessary OAuth properties: `oauth_client_id`, `oauth_client_secret`, and `oauth_token_url`.

If the webhook you are testing already has OAuth credentials saved, you will provide only the `oauth_client_id` and `oauth_token_url`—we will pull the secret for you. If you are testing a new set of OAuth credentials that have not been saved with SendGrid, you must provide all three property values.

You can retrieve a previously saved `oauth_client_id` and `oauth_token_url` from the [**Get an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/get-an-event-webhook) endpoint; however, for security reasons, SendGrid will not provide your `oauth_client_secret`.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Request body

```json
{"schema":{"title":"Send Event Webhook Test Request","type":"object","required":["url"],"example":{"id":"77d4a5da-7015-11ed-a1eb-0242ac120002","url":"https://emailengagment.example.com","oauth_client_id":"a835e7210bbb47edbfa71bdfc909b2d7","oauth_client_secret":"335a9b0c65324fd2a62e2953d4b158","oauth_token_url":"https://oauthservice.example.com"},"refName":"EventWebhookTestRequest","modelName":"EventWebhookTestRequest","properties":{"id":{"type":"string","description":"The ID of the Event Webhook you want to retrieve."},"url":{"type":"string","description":"The URL where you would like the test notification to be sent."},"oauth_client_id":{"type":"string","description":"The client ID Twilio SendGrid sends to your OAuth server or service provider to generate an OAuth access token. When passing data in this property, you must also include the `oauth_token_url` property.","nullable":true},"oauth_client_secret":{"type":"string","description":"The `oauth_client_secret` is needed only once to create an access token. SendGrid will store this secret, allowing you to update your Client ID and Token URL without passing the secret to SendGrid again. When passing data in this field, you must also include the `oauth_client_id` and `oauth_token_url` properties.","nullable":true},"oauth_token_url":{"type":"string","description":"The URL where Twilio SendGrid sends the Client ID and Client Secret to generate an access token. This should be your OAuth server or service provider. When passing data in this field, you must also include the `oauth_client_id` property.","nullable":true}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"204","schema":{"description":"No Content"}}]
```

Test Event Notification Settings

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  id: "77d4a5da-7015-11ed-a1eb-0242ac120002",
  url: "https://emailengagment.example.com",
  oauth_client_id: "a835e7210bbb47edbfa71bdfc909b2d7",
  oauth_client_secret: "335a9b0c65324fd2a62e2953d4b158",
  oauth_token_url: "https://oauthservice.example.com",
};

const request = {
  url: `/v3/user/webhooks/event/test`,
  method: "POST",
  body: data,
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

data = {
    "id": "77d4a5da-7015-11ed-a1eb-0242ac120002",
    "url": "https://emailengagment.example.com",
    "oauth_client_id": "a835e7210bbb47edbfa71bdfc909b2d7",
    "oauth_client_secret": "335a9b0c65324fd2a62e2953d4b158",
    "oauth_token_url": "https://oauthservice.example.com",
}

response = sg.client.user.webhooks.event.test.post(request_body=data)

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

        var data =
            @"{
            ""id"": ""77d4a5da-7015-11ed-a1eb-0242ac120002"",
            ""url"": ""https://emailengagment.example.com"",
            ""oauth_client_id"": ""a835e7210bbb47edbfa71bdfc909b2d7"",
            ""oauth_client_secret"": ""335a9b0c65324fd2a62e2953d4b158"",
            ""oauth_token_url"": ""https://oauthservice.example.com""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
            urlPath: "user/webhooks/event/test",
            requestBody: data);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;
import org.json.JSONObject;
import java.util.HashMap;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("/user/webhooks/event/test");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("id", "77d4a5da-7015-11ed-a1eb-0242ac120002");
                    put("url", "https://emailengagment.example.com");
                    put("oauth_client_id", "a835e7210bbb47edbfa71bdfc909b2d7");
                    put("oauth_client_secret", "335a9b0c65324fd2a62e2953d4b158");
                    put("oauth_token_url", "https://oauthservice.example.com");
                }
            }).toString());
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
	request := sendgrid.GetRequest(apiKey, "/v3/user/webhooks/event/test", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "id": "77d4a5da-7015-11ed-a1eb-0242ac120002",
  "url": "https://emailengagment.example.com",
  "oauth_client_id": "a835e7210bbb47edbfa71bdfc909b2d7",
  "oauth_client_secret": "335a9b0c65324fd2a62e2953d4b158",
  "oauth_token_url": "https://oauthservice.example.com"
}`)
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
$request_body = json_decode('{
    "id": "77d4a5da-7015-11ed-a1eb-0242ac120002",
    "url": "https://emailengagment.example.com",
    "oauth_client_id": "a835e7210bbb47edbfa71bdfc909b2d7",
    "oauth_client_secret": "335a9b0c65324fd2a62e2953d4b158",
    "oauth_token_url": "https://oauthservice.example.com"
}');

try {
    $response = $sg->client
        ->user()
        ->webhooks()
        ->event()
        ->test()
        ->post($request_body);
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
data = JSON.parse('{
  "id": "77d4a5da-7015-11ed-a1eb-0242ac120002",
  "url": "https://emailengagment.example.com",
  "oauth_client_id": "a835e7210bbb47edbfa71bdfc909b2d7",
  "oauth_client_secret": "335a9b0c65324fd2a62e2953d4b158",
  "oauth_token_url": "https://oauthservice.example.com"
}')

response = sg.client.user.webhooks.event.test.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/user/webhooks/event/test" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"id": "77d4a5da-7015-11ed-a1eb-0242ac120002", "url": "https://emailengagment.example.com", "oauth_client_id": "a835e7210bbb47edbfa71bdfc909b2d7", "oauth_client_secret": "335a9b0c65324fd2a62e2953d4b158", "oauth_token_url": "https://oauthservice.example.com"}'
```
