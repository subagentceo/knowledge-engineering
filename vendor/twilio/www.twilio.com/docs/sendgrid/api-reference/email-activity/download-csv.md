# Download CSV

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
{"path":"https://api.sendgrid.com/v3/messages/download/{download_uuid}","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint will return a presigned URL that can be used to download the CSV that was requested from the "Request a CSV" endpoint.**

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"download_uuid","in":"path","description":"UUID used to locate the download csv request entry in the DB.\n\nThis is the UUID provided in the email sent to the user when their csv file is ready to download","required":true,"schema":{"type":"string","format":"uuid"}}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","required":["presigned_url"],"properties":{"presigned_url":{"type":"string","format":"uri","description":"A signed link that will allow you to download the CSV file requested by the Request a CSV endpoint."}}},"examples":{"response":{"value":{"presigned_url":"https://sendgrid-rts-development-csv-downloads.s3.us-west-2.amazonaws.com/e53668f0-bea0-40b1-92c0-fa5b2c7fae1f.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=redacted&X-Amz-Date=20250718T195335Z&X-Amz-Expires=300&X-Amz-Security-Token=redacted&X-Amz-SignedHeaders=host&X-Amz-Signature=redacted"}}}}}}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"download token is invalid or expired","field":""}]}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"internal server error"}]}}}}}}}]
```

Download CSV

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const download_uuid = "f15982c1-a82c-4e87-a6b2-a4a63b4b7644";

const request = {
  url: `/v3/messages/download/${download_uuid}`,
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

download_uuid = "f15982c1-a82c-4e87-a6b2-a4a63b4b7644"

response = sg.client.messages.download._(download_uuid).get()

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

        var downloadUuid = "f15982c1-a82c-4e87-a6b2-a4a63b4b7644";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: $"messages/download/{downloadUuid}");

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
            request.setEndpoint("/messages/download/f15982c1-a82c-4e87-a6b2-a4a63b4b7644");
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
	request := sendgrid.GetRequest(apiKey, "/v3/messages/download/f15982c1-a82c-4e87-a6b2-a4a63b4b7644", host)
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
$download_uuid = "f15982c1-a82c-4e87-a6b2-a4a63b4b7644";

try {
    $response = $sg->client
        ->messages()
        ->download()
        ->_($download_uuid)
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
download_uuid = "f15982c1-a82c-4e87-a6b2-a4a63b4b7644"

response = sg.client.messages.download._(download_uuid).get()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X GET "https://api.sendgrid.com/v3/messages/download/f15982c1-a82c-4e87-a6b2-a4a63b4b7644" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
