# Filter all messages

## API Overview

* To gain access to the Email Activity Feed API, purchase additional email activity history.
  * To purchase additional history, go to **Account Details** > [**Your Products**][products] > **Add-ons** in the Twilio SendGrid console.
* To query all of your stored messages, query individual messages, and download a CSV with data about the stored messages, use the Email Activity API.
  * To learn how to build queries and use the API, see [Getting Started with the Email Activity Feed API][] or go to **Activity** in the [Twilio SendGrid console][tsc].

[products]: https://app.sendgrid.com/account/products

[Getting Started with the Email Activity Feed API]: /docs/sendgrid/for-developers/sending-email/getting-started-email-activity-api/

[tsc]: https://app.sendgrid.com/email_activity

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/messages","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

Filter all messages to search your Email Activity. All queries must be [URL encoded](https://meyerweb.com/eric/tools/dencoder/), and use the following format:

`query={query_type}="{query_content}"`

Once URL encoded, the previous query will look like this:

`query=type%3D%22query_content%22`

For example, to filter by a specific email, use the following query:

`query=to_email%3D%22example%40example.com%22`

Visit our [Query Reference section](https://docs.sendgrid.com/for-developers/sending-email/getting-started-email-activity-api#query-reference) to see a full list of basic query types and examples.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Query string

```json
[{"name":"query","in":"query","description":"Use the query syntax to filter your email activity. Combine up to 160 filter conditions per request.","required":true,"schema":{"type":"string"}},{"name":"limit","in":"query","description":"The number of messages returned. This parameter must be greater than 0 and less than or equal to 1000","required":false,"schema":{"type":"number","minimum":1,"maximum":1000,"default":10}}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"messages":{"type":"array","items":{"title":"Abbv. Message","type":"object","required":["from_email","msg_id","subject","to_email","status","opens_count","clicks_count","last_event_time"],"example":{"from_email":"from@test.com","msg_id":"abc123","subject":"anim Duis sint veniam","to_email":"test@test.com","status":"processed","opens_count":1,"clicks_count":2,"last_event_time":"2017-10-13T18:56:21Z"},"properties":{"from_email":{"type":"string"},"msg_id":{"type":"string"},"subject":{"type":"string"},"to_email":{"type":"string"},"status":{"type":"string","enum":["processed","delivered","not_delivered"],"refName":"Status","modelName":"Status"},"opens_count":{"type":"integer"},"clicks_count":{"type":"integer"},"last_event_time":{"type":"string","description":"iso 8601 format"}}}}}},"examples":{"response":{"value":{"messages":[{"from_email":"from@test.com","msg_id":"abc123","subject":"something profound","to_email":"to@test.com","status":"processed","opens_count":0,"clicks_count":0,"last_event_time":"2017-10-13T18:56:21Z","last_timestamp":1495064728},{"from_email":"yeah@test.com","msg_id":"321befe","subject":"something profound","to_email":"nah@test.com","status":"delivered","opens_count":500,"clicks_count":200,"last_event_time":"2017-10-13T18:56:21Z","last_timestamp":1495064793},{"from_email":"sad@test.com","msg_id":"434512dfg","subject":"something sad","to_email":"reject@test.com","status":"not_delivered","opens_count":0,"clicks_count":0,"last_event_time":"2017-10-13T18:56:21Z","last_timestamp":1495064993}]}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","required":["errors"],"properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"invalid syntax: 'bad_field' is not a known field"}]}}}}}}},{"responseCode":"429","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"too many requests"}]}}}}}}}]
```

Filter all messages

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const queryParams = {
  limit: 10,
  query: 'from_email="email@example.com"',
};

const request = {
  url: `/v3/messages`,
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

params = {"query": 'from_email="email@example.com"', "limit": 10}

response = sg.client.messages.get(query_params=params)

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

        var queryParams = @"{'query': 'from_email=\'email@example.com\'', 'limit': 10}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: "messages", queryParams: queryParams);

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
            request.setEndpoint("/messages");
            request.addQueryParam("query", "from_email=\"email@example.com\"");
            request.addQueryParam("limit", "10");
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
	request := sendgrid.GetRequest(apiKey, "/v3/messages", host)
	request.Method = "GET"
	queryParams := make(map[string]string)
	queryParams["query"] = "from_email=\"email@example.com\""
	queryParams["limit"] = "10"
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
    "query": "from_email=\"email@example.com\"",
    "limit": 10
}');

try {
    $response = $sg->client->messages()->get(null, $query_params);
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
params = JSON.parse('{
  "query": "from_email=\"email@example.com\"",
  "limit": 10
}')

response = sg.client.messages.get(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/messages?query=from_email%3D%22email%40example.com%22&limit=10" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
