# Filter all messages

## API Overview

Use this endpoint to search processed email messages and identify specific messages of interest sent from your account. The response returns a list of messages that match your filter criteria, including each message's `sg_message_id` and key delivery attributes such as sender, recipient, subject, and status. Pass the `sg_message_id` to the [**Filter Messages by ID**](/docs/sendgrid/api-reference/email-logs/filter-messages-by-id) endpoint to retrieve full event-level details for that message.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/logs","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

List recent messages within Email Logs, or search for messages using a filter.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"type":"object","refName":"EmailLogsGetMessagesByFilterRequest","modelName":"EmailLogsGetMessagesByFilterRequest","properties":{"query":{"type":"string","description":"**Allowed event fields and operators**\n\n- sg_message_id: `=`\n- subject: `=`\n- to_email: `=`\n- status: `IN`\n- reason: `=`\n- categories: `IN`\n- sg_message_id_created_at: `>`, `<`, `>=`, `<=`\n\n**Notes:**\n\n- multiple conditions (up to 160) can be combined with `AND`\n- nesting is not allowed\n- `IN` operator accepts a list of string values: `field IN ('value1', 'value2')`\n","example":"sg_message_id_created_at > TIMESTAMP \"2025-01-01T00:00:00Z\" AND sg_message_id_created_at < TIMESTAMP \"2025-02-01T00:00:00Z\" AND status IN ('delivered', 'processed') AND categories IN ('newsletter', 'marketing')"},"limit":{"type":"integer","description":"Number of messages to return (1–1000).","minimum":1,"maximum":1000,"default":10},"subusers":{"description":"For requests authenticated as the parent account,\nthis argument must be passed if the desired messages belong to a subuser.\nYou can only call this endpoint for 1 subuser at a time.\n","type":"array","maxItems":1,"example":["20223230"],"items":{"type":"string","format":"^\\d+$"}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"A page of messages matching the filter.","content":{"application/json":{"schema":{"type":"object","required":["messages"],"refName":"EmailLogsGetMessagesByFilterResponse","modelName":"EmailLogsGetMessagesByFilterResponse","properties":{"messages":{"type":"array","description":"List of messages matching the filter query.\n","items":{"description":"Summary information for a single message matching the filter.\n","type":"object","required":["from_email","sg_message_id","subject","to_email","status","sg_message_id_created_at"],"refName":"EmailLogsMessage","modelName":"EmailLogsMessage","properties":{"from_email":{"type":"string","description":"Sender email address.\nThis may not always be a valid email address.\n"},"sg_message_id":{"type":"string","description":"Unique message ID."},"subject":{"type":"string","description":"Email subject line."},"to_email":{"type":"string","description":"Recipient email address"},"reason":{"type":"string","description":"Textual description for drop, bounce, deferral, or delivery event\n"},"status":{"type":"string","description":"**A summary of the message status based on which events have occurred.**\n\n- processed: `processed`\n- dropped: `drop`, `cancel_drop`\n- deferred: `deferred`\n- bounced: `bounce`\n- blocked: `bounce` (type=`block`)\n- delivered: `delivered`, `click`, `open`\n","enum":["processed","delivered","deferred","dropped","bounced","blocked"],"refName":"EmailLogsMessageStatus","modelName":"EmailLogsMessageStatus"},"sg_message_id_created_at":{"type":"string","format":"string","description":"Timestamp when message_id was created at (ISO 8601)."}}}}}}}}}},{"responseCode":"400","schema":{"description":"Bad request.","content":{"application/json":{"schema":{"type":"object","description":"Standard SendGrid error response.","refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"refName":"Error","modelName":"Error","properties":{"message":{"type":"string","description":"Error message."},"field":{"type":"string","description":"(Optional) The field that caused the error."}}}}}}}}}},{"responseCode":"403","schema":{"description":"Forbidden","content":{"application/json":{"schema":{"type":"object","description":"Standard SendGrid error response.","refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"refName":"Error","modelName":"Error","properties":{"message":{"type":"string","description":"Error message."},"field":{"type":"string","description":"(Optional) The field that caused the error."}}}}}}}}}},{"responseCode":"429","schema":{"description":"Too many requests; capacity limit exceeded. The caller should reduce concurrent calls or back off exponentially.","content":{"application/json":{"schema":{"type":"object","description":"Standard SendGrid error response.","refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"refName":"Error","modelName":"Error","properties":{"message":{"type":"string","description":"Error message."},"field":{"type":"string","description":"(Optional) The field that caused the error."}}}}}}}}}},{"responseCode":"default","schema":{"description":"Default error response","content":{"application/json":{"schema":{"type":"object","description":"Standard SendGrid error response.","refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"refName":"Error","modelName":"Error","properties":{"message":{"type":"string","description":"Error message."},"field":{"type":"string","description":"(Optional) The field that caused the error."}}}}}}}}}}]
```

Filter all messages

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  query: "query",
};

const request = {
  url: `/v3/logs`,
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

data = {"query": "query"}

response = sg.client.logs.post(request_body=data)

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
            ""query"": ""query""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: "logs", requestBody: data);

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
            request.setEndpoint("/logs");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("query", "query");
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
	request := sendgrid.GetRequest(apiKey, "/v3/logs", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "query": "query"
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
    "query": "query"
}');

try {
    $response = $sg->client->logs()->post($request_body);
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
  "query": "query"
}')

response = sg.client.logs.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/logs" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"query": "query"}'
```
