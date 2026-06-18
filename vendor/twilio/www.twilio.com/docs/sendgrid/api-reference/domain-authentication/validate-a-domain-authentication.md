# Validate a domain authentication.

## API Overview

An authenticated domain allows you to remove the "via" or "sent on behalf of" message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your personal sending domain. You will be required to create a subdomain so that SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will get 2 TXT records and 1 MX record.

Domain Authentication was formerly called "Domain Whitelabel".

For more information, please see [How to set up domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/).

> \[!NOTE]
>
> Each user may have a maximum of 3,000 authenticated domains and 3,000 link brandings. This limit is at the user level, meaning each Subuser belonging to a parent account may have its own 3,000 authenticated domains and 3,000 link brandings.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/whitelabel/domains/{id}/validate","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to validate an authenticated domain. If it fails, it will return an error message describing why the domain could not be validated.**

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Path parameters

```json
[{"name":"id","in":"path","description":"ID of the domain to validate.","required":true,"schema":{"type":"integer"}}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the authenticated domain."},"valid":{"type":"boolean","description":"Indicates if this is a valid authenticated domain."},"validation_results":{"type":"object","description":"The individual DNS records that are checked when validating, including the reason for any invalid DNS records.","properties":{"mail_cname":{"type":"object","description":"The CNAME record for the authenticated domain.","properties":{"valid":{"type":"boolean","description":"Indicates if this DNS record is valid."},"reason":{"description":"The reason this record is invalid.","nullable":true,"type":"string"}}},"dkim1":{"type":"object","description":"A DNS record for this authenticated domain.","properties":{"valid":{"type":"boolean","description":"Indicates if the DNS record is valid."},"reason":{"nullable":true,"type":"string"}}},"dkim2":{"type":"object","description":"A DNS record for this authenticated domain.","properties":{"valid":{"type":"boolean","description":"Indicates if the DNS record is valid."},"reason":{"nullable":true,"type":"string"}}},"spf":{"type":"object","description":"The SPF record for the authenticated domain.","properties":{"valid":{"type":"boolean","description":"Indicates if the SPF record is valid."},"reason":{"nullable":true,"type":"string"}}}}}}},"examples":{"response":{"value":{"id":1,"valid":true,"validation_results":{"mail_cname":{"valid":false,"reason":"Expected your MX record to be \"mx.sendgrid.net\" but found \"example.com\"."},"dkim1":{"valid":true,"reason":null},"dkim2":{"valid":true,"reason":null},"spf":{"valid":true,"reason":null}}}}}}}}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","required":["message"],"properties":{"message":{"type":"string","description":"A message explaining the reason for the error."}}}}}},"examples":{"response":{"value":{"errors":[{"message":"internal error getting TXT"}]}}}}}}}]
```

Validate a domain authentication.

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const id = 42;

const request = {
  url: `/v3/whitelabel/domains/${id}/validate`,
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

id = 42

response = sg.client.whitelabel.domains._(id).validate.post()

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

        var id = 42;

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: $"whitelabel/domains/{id}/validate");

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
            request.setEndpoint("/whitelabel/domains/42/validate");
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
	request := sendgrid.GetRequest(apiKey, "/v3/whitelabel/domains/42/validate", host)
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
$id = 42;

try {
    $response = $sg->client
        ->whitelabel()
        ->domains()
        ->_($id)
        ->validate()
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
id = 42

response = sg.client.whitelabel.domains._(id).validate.post()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/whitelabel/domains/42/validate" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
