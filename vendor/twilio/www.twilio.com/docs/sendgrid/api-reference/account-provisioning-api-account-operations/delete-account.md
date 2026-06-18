# Delete Account

## API Overview

The Twilio SendGrid Account Provisioning API provides a platform for Twilio SendGrid resellers to manage their customers. This API is for companies that have a formal reseller partnership with Twilio SendGrid.

You can access Twilio SendGrid sub-account functionality without becoming a reseller. If you require sub-account functionality, see the Twilio SendGrid Subusers feature, which is available with [Pro and Premier plans](https://sendgrid.com/pricing/).

The Account Provisioning API account operations allow you to create, retrieve, and authenticate customer accounts.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/partners/accounts/{accountID}","method":"delete","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

Delete a specific account under your organization by account ID. Note that this is an **irreversible** action that does the following:

* Revokes API Keys and SSO so that the account user cannot log in or access SendGrid data.
* Removes all offerings and configured SendGrid resources such as dedicated IPs.
* Cancels billing effective immediately.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"accountID","in":"path","description":"Twilio SendGrid account ID","schema":{"type":"string"},"required":true,"example":"sg2a2bcd3ef4ab5c67d8efab91c01de2fa","refName":"#/components/parameters/AccountProvisioningAccountId","modelName":"__components_parameters_AccountProvisioningAccountId"}]
```

### Responses

```json
[{"responseCode":"204","schema":{"description":"Account successfully deleted."}},{"responseCode":"400","schema":{"description":"The request was formatted incorrectly or missing required parameters.","content":{"application/json":{"schema":{"title":"Bad Request","type":"object","required":["errors"],"properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Field must be a valid email","field":"email","error_id":"10-40002"},{"message":"Field must be formatted using the E.164 standard consisting of [+] [country code] [subscriber number including area code] and can have a maximum of fifteen digits.","field":"phone","error_id":"10-40010"},{"message":"Field must be a valid URL","field":"company_website","error_id":"10-40008"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse400","modelName":"__components_responses_AccountProvisioningErrorResponse400"}},{"responseCode":"401","schema":{"description":"Request lacks valid authentication credentials","content":{"application/json":{"schema":{"title":"Unauthorized","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Failed to authenticate user","field":"","error_id":"10-40100"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse401","modelName":"__components_responses_AccountProvisioningErrorResponse401"}},{"responseCode":"403","schema":{"description":"Not authorized to make the request","content":{"application/json":{"schema":{"title":"Forbidden","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"The authenticated user is not authorized to perfrom this request","field":"","error_id":"10-40300"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse403","modelName":"__components_responses_AccountProvisioningErrorResponse403"}},{"responseCode":"404","schema":{"description":"Not Found","content":{"application/json":{"schema":{"title":"Not Found","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"No such endpoint","field":"","error_id":"10-40400"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse404","modelName":"__components_responses_AccountProvisioningErrorResponse404"}},{"responseCode":"500","schema":{"description":"Internal Server Error","content":{"application/json":{"schema":{"title":"InternalServerError","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Something went wrong","field":"","error_id":"10-50000"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse500","modelName":"__components_responses_AccountProvisioningErrorResponse500"}},{"responseCode":"502","schema":{"description":"Bad Gateway","content":{"application/json":{"schema":{"title":"Bad Gateway","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Bad Gateway","field":"","error_id":"10-50200"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse502","modelName":"__components_responses_AccountProvisioningErrorResponse502"}},{"responseCode":"503","schema":{"description":"Service Unavailable","content":{"application/json":{"schema":{"title":"Service Unavailable","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Service Unavailable","field":"","error_id":"10-50300"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse503","modelName":"__components_responses_AccountProvisioningErrorResponse503"}},{"responseCode":"504","schema":{"description":"Endpoint request timed out","content":{"application/json":{"schema":{"title":"Endpoint request timed out","type":"object","properties":{"errors":{"type":"array","items":{"title":"Error","type":"object","required":["message","field","error_id"],"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"message":{"type":"string","description":"The message representing the error from the API."},"field":{"type":"string","description":"The field associated with the error."},"error_id":{"type":"string","description":"ID representing the error as a unique nubmer."}}}}}},"example":{"errors":[{"message":"Endpoint request timed out","field":"","error_id":"10-50400"}]}}},"refName":"#/components/responses/AccountProvisioningErrorResponse504","modelName":"__components_responses_AccountProvisioningErrorResponse504"}}]
```

Delete account

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const accountID = "accountID";

const request = {
  url: `/v3/partners/accounts/${accountID}`,
  method: "DELETE",
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

response = sg.client.partners.accounts._(accountID).delete()

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

        var response = await client.RequestAsync(
            method: SendGridClient.Method.DELETE, urlPath: $"partners/accounts/{accountID}");

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
            request.setEndpoint("/partners/accounts/accountID");
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
	request := sendgrid.GetRequest(apiKey, "/v3/partners/accounts/accountID", host)
	request.Method = "DELETE"
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
$accountID = "accountID";

try {
    $response = $sg->client
        ->partners()
        ->accounts()
        ->_($accountID)
        ->delete();
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

response = sg.client.partners.accounts._(accountID).delete()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X DELETE "https://api.sendgrid.com/v3/partners/accounts/accountID" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
