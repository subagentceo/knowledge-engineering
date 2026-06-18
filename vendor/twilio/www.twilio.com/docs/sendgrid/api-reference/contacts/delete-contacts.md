# Delete Contacts

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/marketing/contacts","method":"delete","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint can be used to delete one or more contacts**.

The query parameter `ids` must set to a comma-separated list of contact IDs for bulk contact deletion.

The query parameter `delete_all_contacts` must be set to `"true"` to delete **all** contacts.

You must set either `ids` or `delete_all_contacts`.

Deletion jobs are processed asynchronously.

Twilio SendGrid recommends exporting your contacts regularly as a backup to avoid issues or lost data.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Query string

```json
[{"name":"delete_all_contacts","in":"query","description":"Must be set to `\"true\"` to delete all contacts.","required":false,"schema":{"type":"string"}},{"name":"ids","in":"query","description":"A comma-separated list of contact IDs.","required":false,"schema":{"type":"string"}}]
```

### Responses

```json
[{"responseCode":"202","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","description":"The deletion job has been accepted and is being processed.","required":["job_id"],"properties":{"job_id":{"type":"object","description":"The deletion job ID."}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","required":["errors"],"properties":{"errors":{"type":"array","items":{"type":"object"}}}}}}}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts401","modelName":"__components_responses_MarketingContacts401"}},{"responseCode":"403","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts403","modelName":"__components_responses_MarketingContacts403"}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts404","modelName":"__components_responses_MarketingContacts404"}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}}}},"refName":"#/components/responses/MarketingContacts500","modelName":"__components_responses_MarketingContacts500"}}]
```

Delete All Contacts

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const queryParams = { delete_all_contacts: "true" };

const request = {
  url: `/v3/marketing/contacts`,
  method: "DELETE",
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

params = {"delete_all_contacts": "true"}

response = sg.client.marketing.contacts.delete(query_params=params)

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

        var queryParams = @"{'delete_all_contacts': 'true'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.DELETE,
            urlPath: "marketing/contacts",
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
            request.setMethod(Method.DELETE);
            request.setEndpoint("/marketing/contacts");
            request.addQueryParam("delete_all_contacts", "true");
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/contacts", host)
	request.Method = "DELETE"
	queryParams := make(map[string]string)
	queryParams["delete_all_contacts"] = "true"
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
    "delete_all_contacts": "true"
}');

try {
    $response = $sg->client
        ->marketing()
        ->contacts()
        ->delete(null, $query_params);
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
  "delete_all_contacts": "true"
}')

response = sg.client.marketing.contacts.delete(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X DELETE "https://api.sendgrid.com/v3/marketing/contacts?delete_all_contacts=true" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```

Delete Contacts by ids

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const queryParams = { ids: "1, 2" };

const request = {
  url: `/v3/marketing/contacts`,
  method: "DELETE",
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

params = {"ids": "1, 2"}

response = sg.client.marketing.contacts.delete(query_params=params)

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

        var queryParams = @"{'ids': '1, 2'}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.DELETE,
            urlPath: "marketing/contacts",
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
            request.setMethod(Method.DELETE);
            request.setEndpoint("/marketing/contacts");
            request.addQueryParam("ids", "1, 2");
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/contacts", host)
	request.Method = "DELETE"
	queryParams := make(map[string]string)
	queryParams["ids"] = "1, 2"
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
    "ids": "1, 2"
}');

try {
    $response = $sg->client
        ->marketing()
        ->contacts()
        ->delete(null, $query_params);
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
  "ids": "1, 2"
}')

response = sg.client.marketing.contacts.delete(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X DELETE "https://api.sendgrid.com/v3/marketing/contacts?ids=1%2C%202" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
