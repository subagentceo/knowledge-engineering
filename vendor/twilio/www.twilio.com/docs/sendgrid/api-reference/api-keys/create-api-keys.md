# Create API keys

## API Overview

Your application, mail client, or website can all use API (Application Programming Interface) keys to authenticate access to SendGrid services. You can revoke an API key at any time without having to change your username and password, and an API key can be scoped to perform a limited number of actions.

There are 3 different types of API keys:

* **Full Access**\
  Allows the API key to access `GET`, `PATCH`, `PUT`, `DELETE` and `POST` endpoints for all parts of your account, excluding billing and Email Address Validation.
* **Custom Access**\
  Customizes levels of access for all parts of your account, excluding billing and Email Address Validation.
* **Billing Access**\
  Allows the API key to access billing endpoints for the account.

You must create your first API key using the [Twilio SendGrid App](https://app.sendgrid.com/settings/api_keys). Once you have a key with permissions to manage other keys, you can use the endpoints documented as part of this API.

> \[!WARNING]
>
> Twilio SendGrid API keys are 69 characters long. Twilio can't make exceptions for third-party infrastructure unable to support a key of 69 characters.

> \[!NOTE]
>
> There is a limit of 100 API Keys on your account.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/api_keys","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to create a new API Key for the user.**

To create your initial SendGrid API Key, you should [use the SendGrid App](https://app.sendgrid.com/settings/api_keys). Once you have created a first key with scopes to manage additional API keys, you can use this API for all other key management.
A JSON request body containing a `name` property is required when making requests to this endpoint. If the number of maximum keys, 100, is reached, a `403` status will be returned.
Though the `name` field is required, it does not need to be unique. A unique API key ID will be generated for each key you create and returned in the response body.
It is not necessary to pass a `scopes` field to the API when creating a key, but you should be aware that omitting the `scopes` field from your request will create a key with "Full Access" permissions by default.
See the [API Key Permissions List](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authorization) for all available scopes. An API key's scopes can be updated after creation using the "Update API keys" endpoint.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Request body

```json
{"schema":{"type":"object","required":["name"],"example":{"name":"My API Key","scopes":["mail.send","alerts.create","alerts.read"]},"properties":{"name":{"type":"string","description":"The name you will use to describe this API Key."},"scopes":{"type":"array","description":"The individual permissions that you are giving to this API Key.","items":{"type":"string"}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"201","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"api_key":{"type":"string"},"api_key_id":{"type":"string"},"name":{"type":"string"},"scopes":{"type":"array","items":{"type":"string"}}}},"examples":{"response":{"value":{"api_key":"SG.xxxxxxxx.yyyyyyyy","api_key_id":"xxxxxxxx","name":"My API Key","scopes":["mail.send","alerts.create","alerts.read"]}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/ApiKeysError400","modelName":"__components_responses_ApiKeysError400"}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/GlobalError401","modelName":"__components_responses_GlobalError401"}},{"responseCode":"403","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/ApiKeysError403","modelName":"__components_responses_ApiKeysError403"}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/ApiKeysError404","modelName":"__components_responses_ApiKeysError404"}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}}}},"refName":"#/components/responses/GlobalError500","modelName":"__components_responses_GlobalError500"}}]
```

Create API keys

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  name: "My API Key",
  scopes: ["mail.send", "alerts.create", "alerts.read"],
};

const request = {
  url: `/v3/api_keys`,
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

data = {
    "name": "My API Key",
    "scopes": ["mail.send", "alerts.create", "alerts.read"],
}

response = sg.client.api_keys.post(request_body=data)

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
            ""name"": ""My API Key"",
            ""scopes"": [
                ""mail.send"",
                ""alerts.create"",
                ""alerts.read""
            ]
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST, urlPath: "api_keys", requestBody: data);

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
            request.setEndpoint("/api_keys");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("name", "My API Key");
                    put("scopes", Arrays.asList("mail.send", "alerts.create", "alerts.read"));
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
	request := sendgrid.GetRequest(apiKey, "/v3/api_keys", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "name": "My API Key",
  "scopes": [
    "mail.send",
    "alerts.create",
    "alerts.read"
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
    "name": "My API Key",
    "scopes": [
        "mail.send",
        "alerts.create",
        "alerts.read"
    ]
}');

try {
    $response = $sg->client->api_keys()->post($request_body);
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
  "name": "My API Key",
  "scopes": [
    "mail.send",
    "alerts.create",
    "alerts.read"
  ]
}')

response = sg.client.api_keys.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/api_keys" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"name": "My API Key", "scopes": ["mail.send", "alerts.create", "alerts.read"]}'
```
