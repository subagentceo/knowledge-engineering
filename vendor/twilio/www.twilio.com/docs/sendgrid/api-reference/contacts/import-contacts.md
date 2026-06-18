# Import Contacts

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/marketing/contacts/imports","method":"put","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint allows a CSV upload containing up to one million contacts or 5GB of data, whichever is smaller. At least one identifier is required for a successful import.**

Imports take place asynchronously: the endpoint returns a URL (`upload_uri`) and HTTP headers (`upload_headers`) which can subsequently be used to `PUT` a file of contacts to be imported into our system.

Uploaded CSV files may also be [gzip-compressed](https://en.wikipedia.org/wiki/Gzip).

In either case, you must include the field `file_type` with the value `csv` in your request body.

The `field_mappings` parameter is a respective list of field definition IDs to map the uploaded CSV columns to. It allows you to use CSVs where one or more columns are skipped (`null`) or remapped to the contact field.

For example, if `field_mappings` is set to `[null, "w1", "_rf1"]`, this means skip column 0, map column 1 to the custom field with the ID `w1`, and map column 2 to the reserved field with the ID `_rf1`. See the "Get All Field Definitions" endpoint to fetch your custom and reserved field IDs to use with `field_mappings`.

Once you receive the response body you can then initiate a **second** API call where you use the supplied URL and HTTP header to upload your file. For example:

`curl --upload-file "file/path.csv" "URL_GIVEN" -H "HEADER_GIVEN"`

If you would like to monitor the status of your import job, use the `job_id` and the "Import Contacts Status" endpoint.

Twilio SendGrid recommends exporting your contacts regularly as a backup to avoid issues or lost data.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"type":"object","required":["file_type","field_mappings"],"properties":{"list_ids":{"type":"array","description":"All contacts will be added to each of the specified lists.","items":{"type":"string"}},"file_type":{"type":"string","description":"Upload file type.","enum":["csv"],"refName":"FileType1","modelName":"FileType1"},"field_mappings":{"type":"array","description":"Import file header to reserved/custom field mapping.","uniqueItems":false,"minItems":1,"items":{"type":"string","nullable":true}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"job_id":{"type":"string","description":"The ID of the import job."},"upload_uri":{"type":"string","description":"The URI to PUT the upload file to."},"upload_headers":{"type":"array","description":"A list of headers that must be included in PUT request.","items":{"type":"object","required":["header","value"],"properties":{"header":{"type":"string"},"value":{"type":"string"}}}}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","required":["errors"],"properties":{"errors":{"type":"array","uniqueItems":true,"items":{"title":"error","type":"object","example":{"field":"field_name","message":"error message"},"required":["message"],"refName":"ContactsError","modelName":"ContactsError","properties":{"message":{"type":"string"},"field":{"type":"string"},"error_id":{"type":"string"},"parameter":{"type":"string"}}}}}}}}}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts401","modelName":"__components_responses_MarketingContacts401"}},{"responseCode":"403","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts403","modelName":"__components_responses_MarketingContacts403"}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","description":"If any of the specified lists do not exist.","required":["errors"],"properties":{"errors":{"type":"array","uniqueItems":true,"items":{"title":"error","type":"object","example":{"field":"field_name","message":"error message"},"required":["message"],"refName":"ContactsError","modelName":"ContactsError","properties":{"message":{"type":"string"},"field":{"type":"string"},"error_id":{"type":"string"},"parameter":{"type":"string"}}}}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}}}},"refName":"#/components/responses/MarketingContacts500","modelName":"__components_responses_MarketingContacts500"}}]
```

Import Contacts

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  file_type: "csv",
  field_mappings: ["e1_T"],
};

const request = {
  url: `/v3/marketing/contacts/imports`,
  method: "PUT",
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

data = {"file_type": "csv", "field_mappings": ["e1_T"]}

response = sg.client.marketing.contacts.imports.put(request_body=data)

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
            ""file_type"": ""csv"",
            ""field_mappings"": [
                ""e1_T""
            ]
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.PUT,
            urlPath: "marketing/contacts/imports",
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
import java.util.Arrays;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.PUT);
            request.setEndpoint("/marketing/contacts/imports");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("file_type", "csv");
                    put("field_mappings", Arrays.asList("e1_T"));
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/contacts/imports", host)
	request.Method = "PUT"
	request.Body = []byte(`{
  "file_type": "csv",
  "field_mappings": [
    "e1_T"
  ]
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
    "file_type": "csv",
    "field_mappings": [
        "e1_T"
    ]
}');

try {
    $response = $sg->client
        ->marketing()
        ->contacts()
        ->imports()
        ->put($request_body);
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
  "file_type": "csv",
  "field_mappings": [
    "e1_T"
  ]
}')

response = sg.client.marketing.contacts.imports.put(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X PUT "https://api.sendgrid.com/v3/marketing/contacts/imports" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"file_type": "csv", "field_mappings": ["e1_T"]}'
```
