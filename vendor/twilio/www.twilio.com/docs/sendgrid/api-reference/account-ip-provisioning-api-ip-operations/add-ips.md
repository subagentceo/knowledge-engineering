# Add IPs

## API Overview

The Twilio SendGrid IP Provisioning API provides a platform for Twilio SendGrid resellers to manage their customer accounts' IPs. This API is for companies that have a formal reseller partnership with Twilio SendGrid.

You can access Twilio SendGrid sub-account functionality without becoming a reseller. If you require sub-account functionality, see the Twilio SendGrid Subusers feature, which is available with [Pro and Premier plans](https://sendgrid.com/pricing/).

The IP Provisioning API IP operations allow you to add, list, and remove IPs from customer accounts.

The Add IPs operation allows you to provision and add one or more IP addresses to a customer account. The Add IPs operation requires a JSON request body specifying the number of IPs to provision and the region where they should be provisioned.

### Request body

The request body contains two required fields:

* `count`: The number of IP addresses to provision and add to the customer account. You can add between 1 and 10 IP addresses per request.
* `region`: The geographic region where the IP addresses should be provisioned. Valid values are `eu` (Europe) or `us` (United States). All IP addresses in a single request must be from the same region.

### Account ID

The `account_id` parameter in the URL path identifies the customer account to which the IP addresses will be added. This account ID is the Twilio SendGrid account ID that was returned when the customer account was created. You should have this ID stored in your database for managing customer accounts.

### Response

The response to a successful Add IPs operation returns a `201 Created` status code. The response body contains an array of the provisioned IP addresses and the region where they are located.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/partners/accounts/{accountID}/ips","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

Adds IP(s) to the specified account.

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
{"schema":{"title":"AddAccountIPsRequest","type":"object","description":"Request to add IP addresses to an account. Maximum of 10 IPs per request, all from the same region.","required":["count","region"],"properties":{"count":{"type":"integer","format":"int64","minimum":1,"maximum":10,"description":"Number of IPs to add (maximum 10 per request)"},"region":{"type":"string","description":"The region where the IPs should be provisioned (all IPs in a single request must be from the same region)","enum":["eu","us"],"refName":"Region1","modelName":"Region1"}}},"example":{"count":2,"region":"us"},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"201","schema":{"description":"Created","content":{"application/json":{"schema":{"title":"AddAccountIPsResponse","type":"object","required":["ips","region"],"properties":{"ips":{"type":"array","items":{"type":"string","description":"IP address that was added","format":"ipv4"}},"region":{"type":"string","description":"The region where the IP addresses are located","enum":["eu","us"],"refName":"Region2","modelName":"Region2"}}},"example":{"ips":["192.168.1.1","192.168.1.2"],"region":"us"}}}}},{"responseCode":"400","schema":{"description":"Bad Request","content":{"application/json":{"schema":{"title":"Bad Request","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Field must be a valid IP address","field":"ip","error_id":"10-40002"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse400","modelName":"__components_responses_IpProvisioningErrorResponse400"}},{"responseCode":"401","schema":{"description":"Unauthorized","content":{"application/json":{"schema":{"title":"Unauthorized","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Failed to authenticate user","field":"","error_id":"10-40100"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse401","modelName":"__components_responses_IpProvisioningErrorResponse401"}},{"responseCode":"403","schema":{"description":"Forbidden","content":{"application/json":{"schema":{"title":"Forbidden","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"The authenticated user is not authorized to perform this request","field":"","error_id":"10-40300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse403","modelName":"__components_responses_IpProvisioningErrorResponse403"}},{"responseCode":"404","schema":{"description":"Not Found","content":{"application/json":{"schema":{"title":"Not Found","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Account not found","field":"","error_id":"10-40400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse404","modelName":"__components_responses_IpProvisioningErrorResponse404"}},{"responseCode":"500","schema":{"description":"Internal Server Error","content":{"application/json":{"schema":{"title":"Internal Server Error","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Something went wrong","field":"","error_id":"10-50000"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse500","modelName":"__components_responses_IpProvisioningErrorResponse500"}},{"responseCode":"502","schema":{"description":"Bad Gateway","content":{"application/json":{"schema":{"title":"Bad Gateway","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Bad Gateway","field":"","error_id":"10-50200"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse502","modelName":"__components_responses_IpProvisioningErrorResponse502"}},{"responseCode":"503","schema":{"description":"Service Unavailable","content":{"application/json":{"schema":{"title":"Service Unavailable","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Service Unavailable","field":"","error_id":"10-50300"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse503","modelName":"__components_responses_IpProvisioningErrorResponse503"}},{"responseCode":"504","schema":{"description":"Endpoint request timed out","content":{"application/json":{"schema":{"title":"Endpoint request timed out","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API"},"field":{"type":"string","description":"The field associated with the error"},"error_id":{"type":"string","description":"ID representing the error as a unique number"}}}}}},"example":{"errors":[{"message":"Endpoint request timed out","field":"","error_id":"10-50400"}]}}},"refName":"#/components/responses/IpProvisioningErrorResponse504","modelName":"__components_responses_IpProvisioningErrorResponse504"}}]
```

Add IPs to a customer account in US region

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const accountID = "accountID";
const data = {
  count: 2,
  region: "us",
};

const request = {
  url: `/v3/partners/accounts/${accountID}/ips`,
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

accountID = "accountID"
data = {"count": 2, "region": "us"}

response = sg.client.partners.accounts._(accountID).ips.post(request_body=data)

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
            ""count"": 2,
            ""region"": ""us""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
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
            request.setMethod(Method.POST);
            request.setEndpoint("/partners/accounts/accountID/ips");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("count", 2);
                    put("region", "us");
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
	request.Method = "POST"
	request.Body = []byte(`{
  "count": 2,
  "region": "us"
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
    "count": 2,
    "region": "us"
}');
$accountID = "accountID";

try {
    $response = $sg->client
        ->partners()
        ->accounts()
        ->_($accountID)
        ->ips()
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
accountID = "accountID"
data = JSON.parse('{
  "count": 2,
  "region": "us"
}')

response = sg.client.partners.accounts._(accountID).ips.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/partners/accounts/accountID/ips" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"count": 2, "region": "us"}'
```

Add IPs to a customer account in EU region

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const accountID = "accountID";
const data = {
  count: 2,
  region: "us",
};

const request = {
  url: `/v3/partners/accounts/${accountID}/ips`,
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

accountID = "accountID"
data = {"count": 2, "region": "us"}

response = sg.client.partners.accounts._(accountID).ips.post(request_body=data)

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
            ""count"": 2,
            ""region"": ""us""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
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
            request.setMethod(Method.POST);
            request.setEndpoint("/partners/accounts/accountID/ips");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("count", 2);
                    put("region", "us");
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
	request.Method = "POST"
	request.Body = []byte(`{
  "count": 2,
  "region": "us"
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
    "count": 2,
    "region": "us"
}');
$accountID = "accountID";

try {
    $response = $sg->client
        ->partners()
        ->accounts()
        ->_($accountID)
        ->ips()
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
accountID = "accountID"
data = JSON.parse('{
  "count": 2,
  "region": "us"
}')

response = sg.client.partners.accounts._(accountID).ips.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/partners/accounts/accountID/ips" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"count": 2, "region": "us"}'
```
