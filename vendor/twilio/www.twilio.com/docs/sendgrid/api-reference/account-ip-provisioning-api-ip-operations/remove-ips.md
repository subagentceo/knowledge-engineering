# Remove IPs

## API Overview

The Twilio SendGrid IP Provisioning API provides a platform for Twilio SendGrid resellers to manage their customer accounts' IPs. This API is for companies that have a formal reseller partnership with Twilio SendGrid.

You can access Twilio SendGrid sub-account functionality without becoming a reseller. If you require sub-account functionality, see the Twilio SendGrid Subusers feature, which is available with [Pro and Premier plans](https://sendgrid.com/pricing/).

The IP Provisioning API IP operations allow you to add, list, and remove IPs from customer accounts.

The Remove IPs operation allows you to remove one or more IP addresses from a customer account. The Remove IPs operation requires a JSON request body containing an array of specific IP addresses to remove.

### Request body

The request body contains one required field:

* `ips`: An array of IP addresses (as strings) to remove from the customer account. You can remove between 1 and 10 IP addresses per request. Each IP address must be a valid IPv4 address in standard dotted-decimal notation (e.g., "192.168.1.1").

### Account ID

The `account_id` parameter in the URL path identifies the customer account from which the IP addresses will be removed. This account ID is the Twilio SendGrid account ID that was returned when the customer account was created. You should have this ID stored in your database for managing customer accounts.

### Response

The response to a successful Remove IPs operation returns a `204 No Content` status code, indicating that the IP addresses have been successfully removed from the customer account.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/partners/accounts/{accountID}/ips","method":"delete","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

Removes IP(s) from the specified account.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"accountID","in":"path","description":"Twilio SendGrid account ID","schema":{"type":"string"},"required":true,"example":"sg1a2bcd3ef4ab5c67d8efab91c01de2fa","refName":"#/components/parameters/IpProvisioningAccountId","modelName":"__components_parameters_IpProvisioningAccountId"}]
```

### Request body

```json
{"schema":{"title":"RemoveAccountIPsRequest","type":"object","required":["ips"],"properties":{"ips":{"type":"array","minItems":1,"maxItems":10,"description":"List of specific IP addresses to remove (maximum 10 per request)","items":{"type":"string","format":"ipv4"}}}},"example":{"ips":["174.0.0.3","192.0.0.1"]},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"204","schema":{"description":"No Content"}},{"responseCode":"400","schema":{"description":"Bad Request","content":{"application/json":{"schema":{"title":"Bad Request","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Field must be a valid IP address","field":"ip","error_id":"10-40002"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse400","modelName":"__components_responses_IpProvisioningErrorResponse400"}},{"responseCode":"401","schema":{"description":"Unauthorized","content":{"application/json":{"schema":{"title":"Unauthorized","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Failed to authenticate user","field":"","error_id":"10-40100"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse401","modelName":"__components_responses_IpProvisioningErrorResponse401"}},{"responseCode":"403","schema":{"description":"Forbidden","content":{"application/json":{"schema":{"title":"Forbidden","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"The authenticated user is not authorized to perform this request","field":"","error_id":"10-40300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse403","modelName":"__components_responses_IpProvisioningErrorResponse403"}},{"responseCode":"404","schema":{"description":"Not Found","content":{"application/json":{"schema":{"title":"Not Found","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Account not found","field":"","error_id":"10-40400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse404","modelName":"__components_responses_IpProvisioningErrorResponse404"}},{"responseCode":"500","schema":{"description":"Internal Server Error","content":{"application/json":{"schema":{"title":"Internal Server Error","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Something went wrong","field":"","error_id":"10-50000"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse500","modelName":"__components_responses_IpProvisioningErrorResponse500"}},{"responseCode":"502","schema":{"description":"Bad Gateway","content":{"application/json":{"schema":{"title":"Bad Gateway","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Bad Gateway","field":"","error_id":"10-50200"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse502","modelName":"__components_responses_IpProvisioningErrorResponse502"}},{"responseCode":"503","schema":{"description":"Service Unavailable","content":{"application/json":{"schema":{"title":"Service Unavailable","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Service Unavailable","field":"","error_id":"10-50300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse503","modelName":"__components_responses_IpProvisioningErrorResponse503"}},{"responseCode":"504","schema":{"description":"Endpoint request timed out","content":{"application/json":{"schema":{"title":"Endpoint request timed out","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Endpoint request timed out","field":"","error_id":"10-50400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse504","modelName":"__components_responses_IpProvisioningErrorResponse504"}}]
```

Remove IPs from a customer account

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const accountID = "accountID";
const data = {
  ips: ["174.0.0.3", "192.0.0.1"],
};

const request = {
  url: `/v3/partners/accounts/${accountID}/ips`,
  method: "DELETE",
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

accountID = "accountID"
data = {"ips": ["174.0.0.3", "192.0.0.1"]}

response = sg.client.partners.accounts._(accountID).ips.delete(
    request_body=data
)

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

        var accountID = "accountID";
        var data =
            @"{
            ""ips"": [
                ""174.0.0.3"",
                ""192.0.0.1""
            ]
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.DELETE,
            urlPath: $"partners/accounts/{accountID}/ips",
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
            request.setMethod(Method.DELETE);
            request.setEndpoint("/partners/accounts/accountID/ips");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("ips", Arrays.asList("174.0.0.3", "192.0.0.1"));
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
	request := sendgrid.GetRequest(apiKey, "/v3/partners/accounts/accountID/ips", host)
	request.Method = "DELETE"
	request.Body = []byte(`{
  "ips": [
    "174.0.0.3",
    "192.0.0.1"
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
    "ips": [
        "174.0.0.3",
        "192.0.0.1"
    ]
}');
$accountID = "accountID";

try {
    $response = $sg->client
        ->partners()
        ->accounts()
        ->_($accountID)
        ->ips()
        ->delete($request_body);
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
accountID = "accountID"
data = JSON.parse('{
  "ips": [
    "174.0.0.3",
    "192.0.0.1"
  ]
}')

response = sg.client.partners.accounts._(accountID).ips.delete(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X DELETE "https://api.sendgrid.com/v3/partners/accounts/accountID/ips" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"ips": ["174.0.0.3", "192.0.0.1"]}'
```
