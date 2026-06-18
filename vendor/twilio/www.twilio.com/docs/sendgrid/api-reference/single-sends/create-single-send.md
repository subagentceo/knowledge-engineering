# Create Single Send

## API Overview

A Single Send is a one-time, non-automated email message delivered to a list or segment of your audience. A Single Send may be sent immediately or scheduled for future delivery.

Single Sends can serve many use cases, including promotional offers, engagement campaigns, newsletters, announcements, legal notices, or policy updates.

The Single Sends API allows you to create, retrieve, update, delete, schedule, and deliver your Single Sends. There are also endpoints for searching and statistics to help you maintain and alter your Single Sends as you learn more and further develop your campaigns.

The Single Sends API changed on **May 6, 2020**. Please check the SendGrid Knowledge Center for updates and instructions here: [https://sendgrid.com/docs/for-developers/sending-email/single-sends-2020-update/](/docs/sendgrid/for-developers/sending-email/single-sends-2020-update/)

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/marketing/singlesends","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint allows you to create a new Single Send.**

Please note that if you are migrating from the previous version of Single Sends, you no longer need to pass a template ID with your request to this endpoint. Instead, you will pass all template data in the `email_config` object.

This endpoint will create a draft of the Single Send but will not send it or schedule it to be sent. Any `send_at` property value set with this endpoint will prepopulate the Single Send's send date. However, the Single Send will remain an unscheduled draft until it's updated with the [**Schedule Single Send**](https://docs.sendgrid.com/api-reference/single-sends/schedule-single-send) endpoint or SendGrid application UI.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"title":"singlesend_request","type":"object","required":["name"],"refName":"SinglesendRequest","modelName":"SinglesendRequest","properties":{"name":{"type":"string","minLength":1,"maxLength":100,"description":"The name of the Single Send."},"categories":{"type":"array","uniqueItems":true,"maxItems":10,"description":"The categories to associate with this Single Send.","items":{"type":"string"}},"send_at":{"type":"string","description":"Set this property to an ISO 8601 formatted date-time when you would like to send the Single Send. Please note that any `send_at` property value set with this endpoint will prepopulate the send date in the SendGrid user interface (UI). However, the Single Send will remain an unscheduled draft until it's updated with the [**Schedule Single Send**](https://docs.sendgrid.com/api-reference/single-sends/schedule-single-send) endpoint or SendGrid application UI. Additionally, the `now` keyword is a valid `send_at` value only when using the Schedule Single Send endpoint. Setting this property to `now` with this endpoint will cause an error.","format":"date-time","nullable":true},"send_to":{"type":"object","properties":{"list_ids":{"type":"array","description":"The recipient List IDs that will receive the Single Send.","maxItems":50,"items":{"type":"string","format":"uuid"}},"segment_ids":{"type":"array","description":"The recipient Segment IDs that will receive the Single Send.","maxItems":10,"items":{"type":"string","format":"uuid"}},"all":{"type":"boolean","description":"Set to `true` to send to All Contacts. If set to `false`, at least one `list_ids` or `segment_ids` value must be provided before the Single Send is scheduled to be sent to recipients.","default":false}}},"email_config":{"type":"object","properties":{"subject":{"type":"string","description":"The subject line of the Single Send. Do not include this field when using a `design_id`."},"html_content":{"type":"string","description":"The HTML content of the Single Send. Do not include this field when using a `design_id`."},"plain_content":{"type":"string","description":"The plain text content of the Single Send. Do not include this field when using a `design_id`."},"generate_plain_content":{"type":"boolean","description":"If set to `true`, `plain_content` is always generated from `html_content`. If set to false, `plain_content` is not altered.","default":true},"design_id":{"type":"string","description":"A `design_id` can be used in place of `html_content`, `plain_content`, and/or `subject`. You can retrieve a design's ID from the [\"List Designs\" endpoint](https://docs.sendgrid.com/api-reference/designs-api/list-designs) or by pulling it from the design's detail page URL in the Marketing Campaigns App."},"editor":{"type":"string","description":"The editor — `\"design\"` or `\"code\"` — used to modify the Single Send's design in the Marketing Campaigns App.","default":"code","enum":["code","design"],"refName":"Editor","modelName":"Editor"},"suppression_group_id":{"description":"The ID of the Suppression Group to allow recipients to unsubscribe — you must provide this or the `custom_unsubscribe_url`.","nullable":true,"type":"integer"},"custom_unsubscribe_url":{"description":"The URL allowing recipients to unsubscribe — you must provide this or the `suppression_group_id`.","format":"uri","nullable":true,"type":"string"},"sender_id":{"description":"The ID of the verified Sender. You can retrieve a verified Sender's ID from the [\"Get Verified Senders\" endpoint](https://www.twilio.com/docs/sendgrid/api-reference/sender-verification/get-all-verified-senders) or by pulling it from the Sender's detail page URL in the SendGrid App.","nullable":true,"type":"integer"},"ip_pool":{"description":"The name of the IP Pool from which the Single Send emails are sent.","nullable":true,"type":"string"}}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"201","schema":{"description":"","content":{"application/json":{"schema":{"title":"singlesend_response","type":"object","refName":"SinglesendResponse","modelName":"SinglesendResponse","properties":{"id":{"type":"string","description":"The unique ID for the Single Send.","format":"uuid"},"name":{"type":"string","minLength":1,"maxLength":100,"description":"The name of the Single Send."},"status":{"type":"string","description":"The current status of the Single Send. The status may be `draft`, `scheduled`, or `triggered`.","enum":["draft","scheduled","triggered"],"refName":"Status2","modelName":"Status2"},"categories":{"type":"array","uniqueItems":true,"maxItems":10,"description":"The categories associated with this Single Send.","items":{"type":"string"}},"send_at":{"type":"string","description":"An ISO 8601 formatted date-time when the Single Send is set to be sent. Please note that any `send_at` property value will have no effect while the Single Send `status` is `draft`. You must update the Single Send with the [**Schedule Single Send**](https://docs.sendgrid.com/api-reference/single-sends/schedule-single-send) endpoint or SendGrid application UI to schedule it.","format":"date-time","nullable":true},"send_to":{"type":"object","properties":{"list_ids":{"type":"array","description":"The IDs of each contact list to which the Single Send will be sent.","maxItems":50,"items":{"type":"string","format":"uuid"}},"segment_ids":{"type":"array","description":"The IDs of each segment to which the Single Send will be sent.","maxItems":10,"items":{"type":"string","format":"uuid"}},"all":{"type":"boolean","description":"If this property is set to `true`, the Single Send will be sent to all of your contacts. If it's set to `false`, at least one `list_ids` or `segment_ids` value must be provided before the Single Send is scheduled to be sent.","default":false}}},"updated_at":{"type":"string","description":"the ISO 8601 time at which the Single Send was last updated.","format":"date-time"},"created_at":{"type":"string","description":"the ISO 8601 time at which the Single Send was created.","format":"date-time"},"email_config":{"type":"object","properties":{"subject":{"type":"string","description":"The subject line of the Single Send. This property is not used when a `design_id` value is set."},"html_content":{"type":"string","description":"The HTML content of the Single Send. This property is not used when a `design_id` value is set."},"plain_content":{"type":"string","description":"The plain text content of the Single Send. This property is not used when a `design_id` value is set."},"generate_plain_content":{"type":"boolean","description":"If this property is set to `true`, `plain_content` is always generated from `html_content`. If it's set to false, `plain_content` is not altered.","default":true},"design_id":{"type":"string","description":"A `design_id` can be used in place of `html_content`, `plain_content`, and/or `subject`. You can retrieve a design's ID from the [**List Designs** endpoint](https://docs.sendgrid.com/api-reference/designs-api/list-designs) or by pulling it from the design's detail page URL in the Marketing Campaigns App."},"editor":{"type":"string","description":"The editor, `design` or `code`, used to modify the Single Send's design in the Marketing Campaigns application user interface.","default":"code","enum":["code","design"],"refName":"Editor1","modelName":"Editor1"},"suppression_group_id":{"description":"The ID of the Suppression Group to allow recipients to unsubscribe. You must provide a `suppression_group_id` or the `custom_unsubscribe_url` with your Single Send.","nullable":true,"type":"integer"},"custom_unsubscribe_url":{"description":"The URL allowing recipients to unsubscribe. You must provide a `custom_unsubscribe_url` or a `suppression_group_id` with your Single Send.","format":"uri","nullable":true,"type":"string"},"sender_id":{"description":"The ID of the verified sender from whom the Single Send will be sent. You can retrieve a verified sender's ID from the [**Get Verified Senders** endpoint](https://www.twilio.com/docs/sendgrid/api-reference/sender-verification/get-all-verified-senders) or by pulling it from the sender's detail page URL in the SendGrid App.","nullable":true,"type":"integer"},"ip_pool":{"description":"The name of the IP Pool from which the Single Send emails are sent.","nullable":true,"type":"string"}}},"warnings":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"},"field":{"type":"string"},"warning_id":{"type":"string"}}}}}},"examples":{"response":{"value":{"name":"Example API Created Single Send","id":"27c21bbf-a12c-440b-b8bf-c526975328ca","status":"scheduled","created_at":"2020-05-18T17:28:27.272Z","categories":["unique opens"],"email_config":{"subject":"","html_content":"","plain_content":"","generate_plain_content":true,"editor":"code","suppression_group_id":null,"custom_unsubscribe_url":null,"sender_id":null,"ip_pool":null},"send_to":{"list_ids":["f2fe66a1-43f3-4e3a-87b1-c6a600d805f0"]}}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string"},"message":{"type":"string"},"error_id":{"type":"string"}}}}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string"},"message":{"type":"string"},"error_id":{"type":"string"}}}}}}}}}}]
```

Create Single Send

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  name: "Miss Christine Morgan",
};

const request = {
  url: `/v3/marketing/singlesends`,
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

data = {"name": "Miss Christine Morgan"}

response = sg.client.marketing.singlesends.post(request_body=data)

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
            ""name"": ""Miss Christine Morgan""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
            urlPath: "marketing/singlesends",
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
            request.setEndpoint("/marketing/singlesends");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("name", "Miss Christine Morgan");
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/singlesends", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "name": "Miss Christine Morgan"
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
    "name": "Miss Christine Morgan"
}');

try {
    $response = $sg->client
        ->marketing()
        ->singlesends()
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
  "name": "Miss Christine Morgan"
}')

response = sg.client.marketing.singlesends.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/marketing/singlesends" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"name": "Miss Christine Morgan"}'
```
