# Request a Bulk Email Address Validation Upload URL

## API Overview

**Email Address Validation is available to Email API Pro and Premier level accounts only. An Email Validation API key is required. See the [Email Address Validation overview page for more information](/docs/sendgrid/ui/managing-contacts/email-address-validation)**.

The Email Address Validation API provides detailed information about the validity of email addresses, which helps you create and maintain contact lists and reduce bounce rates.

The Bulk Email Address Validation API facilitates the asynchronous validation of up to one million email addresses.

With the Bulk Email Address Validation API, you can:

* Request an upload URL for the email list you wish to verify.
* Get all Bulk Email Address Validation Jobs.
* Get a specific Bulk Email Address Validation Job.
* This API reference page should be used in conjunction with the [Email Address Validation Overview page](/docs/sendgrid/ui/managing-contacts/email-address-validation) and the [Bulk Email Validation Integration Guide](/docs/sendgrid/ui/managing-contacts/email-address-validation/bulk-email-address-validation-overview).

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/validations/email/jobs","method":"put","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint returns a presigned URL and request headers. Use this information to upload a list of email addresses for verification.**

Note that in a successful response the `content-type` header value matches the provided `file_type` parameter in the `PUT` request.

Once you have an `upload_uri` and the `upload_headers`, you're ready to upload your email address list for verification. For the expected format of the email address list and a sample upload request, see the [Bulk Email Address Validation Overview page](https://www.twilio.com/docs/sendgrid/ui/managing-contacts/email-address-validation/bulk-email-address-validation-overview).

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"type":"object","required":["file_type"],"example":{"file_type":"csv"},"properties":{"file_type":{"type":"string","description":"The format of the file you wish to upload.","enum":["csv","zip"],"refName":"FileType","modelName":"FileType"}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"The request was successful. The response contains the URI and headers where you will upload your email address list.","content":{"application/json":{"schema":{"title":"Update Email Validations Jobs 200 Response","type":"object","refName":"PutValidationsEmailJobs200Response","modelName":"PutValidationsEmailJobs200Response","properties":{"job_id":{"type":"string","description":"The unique ID of the Bulk Email Address Validation Job."},"upload_uri":{"type":"string","description":"The URI to use for the request to upload your list of email addresses."},"upload_headers":{"type":"array","description":"Array containing headers and header values.","items":{"type":"object","properties":{"header":{"type":"string","description":"The name of the header that must be included in the upload request."},"value":{"type":"string","description":"The value of the header that must be included in the upload request."}}}}}},"examples":{"response":{"value":{"job_id":"01H793APATD899ESMY25ZNPNCF","upload_uri":"https://example.com/","upload_headers":[{"header":"x-amz-server-side-encryption","value":"aws:kms"},{"header":"content-type","value":"text/csv"}]}}}}}}},{"responseCode":"400","schema":{"description":"Bad request. Invalid or missing `file_type` or malformed request.","content":{"application/json":{"schema":{"title":"Error","type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"help":{"type":"object","description":"Helper text or docs for troubleshooting."}}}},"id":{"type":"string","description":"ID representing the error."}}},"examples":{"response":{"value":{"errors":[{"message":"Error message"}]}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"title":"Error","type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"help":{"type":"object","description":"Helper text or docs for troubleshooting."}}}},"id":{"type":"string","description":"ID representing the error."}}},"examples":{"response":{"value":{"errors":[{"message":"error message"}]}}}}}}}]
```

Request a presigned URL and headers to upload a CSV file

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  file_type: "csv",
};

const request = {
  url: `/v3/validations/email/jobs`,
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

data = {"file_type": "csv"}

response = sg.client.validations.email.jobs.put(request_body=data)

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
            ""file_type"": ""csv""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.PUT,
            urlPath: "validations/email/jobs",
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
            request.setEndpoint("/validations/email/jobs");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("file_type", "csv");
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
	request := sendgrid.GetRequest(apiKey, "/v3/validations/email/jobs", host)
	request.Method = "PUT"
	request.Body = []byte(`{
  "file_type": "csv"
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
    "file_type": "csv"
}');

try {
    $response = $sg->client
        ->validations()
        ->email()
        ->jobs()
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
  "file_type": "csv"
}')

response = sg.client.validations.email.jobs.put(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X PUT "https://api.sendgrid.com/v3/validations/email/jobs" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"file_type": "csv"}'
```
