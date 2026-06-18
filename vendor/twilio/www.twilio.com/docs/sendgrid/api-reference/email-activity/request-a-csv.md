# Request a CSV

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
{"path":"https://api.sendgrid.com/v3/messages/download","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

This request will kick off a backend process to generate a CSV file. Once generated, the worker will then send an email for the user download the file. The link will expire in 3 days.

The CSV will contain the events from the last 30 days, limited to the last 1 million events maximum. This endpoint will be rate limited to 1 request every 12 hours (rate limit may change).

This endpoint is similar to the GET Single Message endpoint - the only difference is that /download is added to indicate that this is a CSV download requests but the same query is used to determine what the CSV should contain.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Query string

```json
[{"name":"query","in":"query","description":"Uses a SQL like syntax to indicate which messages to include in the CSV","required":false,"schema":{"type":"string"}}]
```

### Responses

```json
[{"responseCode":"202","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","enum":["pending"],"refName":"Status2","modelName":"Status2"},"message":{"type":"string"}}},"examples":{"response":{"value":{"status":"pending","message":"An email will be sent to jane_doe@example.com when the CSV is ready to download."}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"some error"}]}}}}}}},{"responseCode":"429","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"too many requests","field":""}]}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"internal server error"}]}}}}}}}]
```

Request CSV

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const request = {
  url: `/v3/messages/download`,
  method: "POST",
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


response = sg.client.messages.download.post()

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

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: "messages/download");

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
            request.setMethod(Method.POST);
            request.setEndpoint("/messages/download");
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
	request := sendgrid.GetRequest(apiKey, "/v3/messages/download", host)
	request.Method = "POST"
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

try {
    $response = $sg->client
        ->messages()
        ->download()
        ->post();
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

response = sg.client.messages.download.post()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/messages/download" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
