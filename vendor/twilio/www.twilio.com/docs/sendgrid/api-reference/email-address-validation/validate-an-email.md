# Real Time Email Address Validation - API Reference

## API Overview

**Email Address Validation is available to Email API Pro and Premier level accounts only. An Email Validation API key is required. See the [Email Address Validation overview page for more information](/docs/sendgrid/ui/managing-contacts/email-address-validation)**.

The Email Address Validation API provides detailed information about the validity of email addresses, which helps you create and maintain contact lists and reduce bounce rates.

This API provides two options:

* [Real Time Email Address Validation](/docs/sendgrid/ui/managing-contacts/email-address-validation): real time, detailed information on the validity of a single email address.

  * Use this option to prompt users that they've provided an invalid email, prevent invalid emails from entering your database.
* [Bulk Email Address Validation](/docs/sendgrid/ui/managing-contacts/email-address-validation/bulk-email-address-validation-overview): Asynchronous, bulk validation of up to one million email addresses.

  * Use this option to help you remove invalid emails from your existing lists.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/validations/email","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint allows you to validate an email address.**

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"type":"object","required":["email"],"example":{"email":"example@example.com","source":"signup"},"properties":{"email":{"type":"string","description":"The email address that you want to validate."},"source":{"type":"string","description":"A one-word classifier for where this validation originated."}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","required":["result"],"properties":{"result":{"type":"object","required":["email","verdict","score","local","host","checks","ip_address"],"properties":{"email":{"type":"string","description":"The email being validated","format":"email"},"verdict":{"type":"string","description":"A generic classification of whether or not the email address is valid.","enum":["Valid","Risky","Invalid"],"refName":"Verdict","modelName":"Verdict"},"score":{"type":"number","description":"A numeric representation of the email validity."},"local":{"type":"string","description":"The local part of the email address."},"host":{"type":"string","description":"The domain of the email address.","format":"hostname"},"suggestion":{"type":"string","description":"A suggested correction in the event of domain name typos (e.g., gmial.com)"},"checks":{"type":"object","description":"Granular checks for email address validity.","required":["domain","local_part","additional"],"properties":{"domain":{"type":"object","description":"Checks on the domain portion of the email address.","required":["has_valid_address_syntax","has_mx_or_a_record","is_suspected_disposable_address"],"properties":{"has_valid_address_syntax":{"type":"boolean","description":"Whether the email address syntax is valid."},"has_mx_or_a_record":{"type":"boolean","description":"Whether the email has appropriate DNS records to deliver a message. "},"is_suspected_disposable_address":{"type":"boolean","description":"Whether the domain appears to be from a disposable email address service."}}},"local_part":{"type":"object","description":"Checks on the local part of the email address.","required":["is_suspected_role_address"],"properties":{"is_suspected_role_address":{"type":"boolean","description":"Whether the local part of email appears to be a role or group (e.g., hr, admin)"}}},"additional":{"type":"object","description":"Additional checks on the email address.","required":["has_known_bounces","has_suspected_bounces"],"properties":{"has_known_bounces":{"type":"boolean","description":"Whether email sent to this address from your account has bounced."},"has_suspected_bounces":{"type":"boolean","description":"Whether our model predicts that the email address might bounce."}}}}},"source":{"type":"string","description":"The source of the validation, as per the API request."},"ip_address":{"type":"string","description":"The IP address associated with this email."}}}}},"examples":{"response":{"value":{"result":{"email":"cedric@fogowl.com","verdict":"Valid","score":0.85021,"local":"cedric","host":"fogowl.com","checks":{"domain":{"has_valid_address_syntax":true,"has_mx_or_a_record":true,"is_suspected_disposable_address":false},"local_part":{"is_suspected_role_address":false},"additional":{"has_known_bounces":false,"has_suspected_bounces":false}},"ip_address":"192.168.1.1"}}}}}}}}]
```

Validate an email

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  email: "example@example.com",
  source: "Newsletter",
};

const request = {
  url: `/v3/validations/email`,
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

data = {"email": "example@example.com", "source": "Newsletter"}

response = sg.client.validations.email.post(request_body=data)

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
            ""email"": ""example@example.com"",
            ""source"": ""Newsletter""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: "validations/email", requestBody: data);

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

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("/validations/email");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("email", "example@example.com");
                    put("source", "Newsletter");
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
	request := sendgrid.GetRequest(apiKey, "/v3/validations/email", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "email": "example@example.com",
  "source": "Newsletter"
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
    "email": "example@example.com",
    "source": "Newsletter"
}');

try {
    $response = $sg->client
        ->validations()
        ->email()
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
data = JSON.parse('{
  "email": "example@example.com",
  "source": "Newsletter"
}')

response = sg.client.validations.email.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/validations/email" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"email": "example@example.com", "source": "Newsletter"}'
```

The optional `source` parameter can be used identify the source of the email address. if you choose to integrate with multiple email address captures and want to be able to compare their results.

The `source` must be a string, only using alphanumeric characters and spaces. For example:

```bash
{
  "email": "email@example.com",
  "source": "Newsletter Signup"
}
```

There is a limit of 50 sources. Sources are automatically deleted once the last validation to use that source falls off the 30 day window. You can continue to make validations without a source if you've hit the limit.
