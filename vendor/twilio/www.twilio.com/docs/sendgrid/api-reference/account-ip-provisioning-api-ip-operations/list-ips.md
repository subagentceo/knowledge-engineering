# List IPs

## API Overview

The Twilio SendGrid IP Provisioning API provides a platform for Twilio SendGrid resellers to manage their customer accounts' IPs. This API is for companies that have a formal reseller partnership with Twilio SendGrid.

You can access Twilio SendGrid sub-account functionality without becoming a reseller. If you require sub-account functionality, see the Twilio SendGrid Subusers feature, which is available with [Pro and Premier plans](https://sendgrid.com/pricing/).

The IP Provisioning API IP operations allow you to add, list, and remove IPs from customer accounts.

The List IPs operation allows you to retrieve all IP addresses associated with a specific customer account. IPs are returned ordered by most recently added, with each IP including its address and the region where it is provisioned.

### Pagination

This endpoint returns 10 results per request by default. You can receive a maximum of 5,000 results per request by setting the `limit` query parameter. If the customer account has more IPs than the limit, you can use the `offset` and `limit` query parameters to iterate through the IPs in successive API calls to the endpoint. The `offset` parameter should be set to the last IP address from the previous response.

### Account ID

The `account_id` parameter in the URL path identifies the customer account whose IPs you want to retrieve. This account ID is the Twilio SendGrid account ID that was returned when the customer account was created.

### Response

The response contains an array of IP objects, each with an `ip` field (the IP address) and a `region` field (either `us` or `eu`). The response also includes a `pages` object for pagination.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/partners/accounts/{accountID}/ips","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

Retrieves a paginated list of IPs associated with the specified account, ordered by most recently added IP.

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

### Query string

```json
[{"name":"limit","in":"query","description":"Number of items to return","schema":{"type":"integer","minimum":1,"maximum":5000,"default":10},"required":false,"example":2},{"name":"offset","in":"query","description":"The last item successfully retrieved","schema":{"type":"string","format":"ipv4"},"required":false,"example":"192.0.0.1"}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"OK","content":{"application/json":{"schema":{"title":"AccountIPsResponse","type":"object","required":["result","pages"],"properties":{"result":{"type":"array","items":{"type":"object","required":["ip","region"],"properties":{"ip":{"type":"string","description":"IP address","format":"ipv4"},"region":{"type":"string","description":"Region associated with the IP","enum":["eu","us"],"refName":"Region","modelName":"Region"}}}},"pages":{"title":"Pagination","type":"object","example":{"last":"192.0.0.1"},"refName":"IpProvisioningPagination","modelName":"IpProvisioningPagination","properties":{"last":{"type":"string","description":"The last item returned"}}}}},"example":{"result":[{"ip":"174.0.2.1","region":"us"},{"ip":"192.0.0.1","region":"eu"}],"pages":{"last":"192.0.0.1"}}}}}},{"responseCode":"400","schema":{"description":"Bad Request","content":{"application/json":{"schema":{"title":"Bad Request","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Field must be a valid IP address","field":"ip","error_id":"10-40002"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse400","modelName":"__components_responses_IpProvisioningErrorResponse400"}},{"responseCode":"401","schema":{"description":"Unauthorized","content":{"application/json":{"schema":{"title":"Unauthorized","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Failed to authenticate user","field":"","error_id":"10-40100"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse401","modelName":"__components_responses_IpProvisioningErrorResponse401"}},{"responseCode":"403","schema":{"description":"Forbidden","content":{"application/json":{"schema":{"title":"Forbidden","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"The authenticated user is not authorized to perform this request","field":"","error_id":"10-40300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse403","modelName":"__components_responses_IpProvisioningErrorResponse403"}},{"responseCode":"404","schema":{"description":"Not Found","content":{"application/json":{"schema":{"title":"Not Found","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Account not found","field":"","error_id":"10-40400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse404","modelName":"__components_responses_IpProvisioningErrorResponse404"}},{"responseCode":"500","schema":{"description":"Internal Server Error","content":{"application/json":{"schema":{"title":"Internal Server Error","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Something went wrong","field":"","error_id":"10-50000"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse500","modelName":"__components_responses_IpProvisioningErrorResponse500"}},{"responseCode":"502","schema":{"description":"Bad Gateway","content":{"application/json":{"schema":{"title":"Bad Gateway","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Bad Gateway","field":"","error_id":"10-50200"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse502","modelName":"__components_responses_IpProvisioningErrorResponse502"}},{"responseCode":"503","schema":{"description":"Service Unavailable","content":{"application/json":{"schema":{"title":"Service Unavailable","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Service Unavailable","field":"","error_id":"10-50300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse503","modelName":"__components_responses_IpProvisioningErrorResponse503"}},{"responseCode":"504","schema":{"description":"Endpoint request timed out","content":{"application/json":{"schema":{"title":"Endpoint request timed out","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Endpoint request timed out","field":"","error_id":"10-50400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse504","modelName":"__components_responses_IpProvisioningErrorResponse504"}}]
```

List all IPs for a customer account

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const accountID = "accountID";
const queryParams = { limit: 10 };

const request = {
  url: `/v3/partners/accounts/${accountID}/ips`,
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

accountID = "accountID"
params = {"limit": 10}

response = sg.client.partners.accounts._(accountID).ips.get(query_params=params)

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
        var queryParams = @"{'limit': 10}";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET,
            urlPath: $"partners/accounts/{accountID}/ips",
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
            request.setMethod(Method.GET);
            request.setEndpoint("/partners/accounts/accountID/ips");
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
	request := sendgrid.GetRequest(apiKey, "/v3/partners/accounts/accountID/ips", host)
	request.Method = "GET"
	queryParams := make(map[string]string)
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
    "limit": 10
}');
$accountID = "accountID";

try {
    $response = $sg->client
        ->partners()
        ->accounts()
        ->_($accountID)
        ->ips()
        ->get(null, $query_params);
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
params = JSON.parse('{
  "limit": 10
}')

response = sg.client.partners.accounts._(accountID).ips.get(query_params: params)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -G -X GET "https://api.sendgrid.com/v3/partners/accounts/accountID/ips?limit=10" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
