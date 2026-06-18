# Create a parse setting

## API Overview

Twilio SendGrid's Inbound Parse Webhook allows you to receive emails as multipart/form-data at a URL of your choosing. SendGrid will grab the content, attachments, and the headers from any email it receives for your specified hostname.

See "[Setting up the Inbound Parse Webhook](/docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/)" for help configuring the Webhook. You can also manage the Inbound Parse Webhook in the [Twilio SendGrid App](https://app.sendgrid.com/settings/parse).

To begin processing email using SendGrid's Inbound Parse Webhook, you will have to setup MX Records, choose the hostname (or receiving domain) that will be receiving the emails you want to parse, and define the URL where you want to `POST` your parsed emails. If you do not have access to your domain's DNS records, you must work with someone in your organization who does.

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/user/webhooks/parse/settings","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to create a new inbound parse setting.**

Creating an Inbound Parse setting requires two pieces of information: a `url` and a `hostname`.

The `hostname` must correspond to a domain authenticated by Twilio SendGrid on your account. If you need to complete domain authentication, you can use the [Twilio SendGrid App](https://app.sendgrid.com/settings/sender_auth) or the **Authenticate a Domain** endpoint. See [**How to Set Up Domain Authentication**](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/) for instructions.

Any email received by the `hostname` will be parsed when you complete this setup. You must also add a Twilio SendGrid MX record to this domain's DNS records. See [**Setting up the Inbound Parse Webhook**](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/) for full instructions.

The `url` represents a location where the parsed message data will be delivered. Twilio SendGrid will make an HTTP POST request to this `url` with the message data. The `url` must be publicly reachable, and your application must return a `200` status code to signal that the message data has been received.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Request body

```json
{"schema":{"title":"Parse Setting","type":"object","example":{"url":"http://email.myhostname.com","hostname":"myhostname.com","spam_check":false,"send_raw":true},"refName":"ParseSetting","modelName":"ParseSetting","properties":{"url":{"type":"string","description":"The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL."},"hostname":{"type":"string","description":"A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`."},"spam_check":{"type":"boolean","description":"Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain."},"send_raw":{"type":"boolean","description":"Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email."}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"201","schema":{"description":"","content":{"application/json":{"schema":{"title":"Parse Setting","type":"object","example":{"url":"http://email.myhostname.com","hostname":"myhostname.com","spam_check":false,"send_raw":true},"refName":"ParseSetting","modelName":"ParseSetting","properties":{"url":{"type":"string","description":"The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL."},"hostname":{"type":"string","description":"A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`."},"spam_check":{"type":"boolean","description":"Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain."},"send_raw":{"type":"boolean","description":"Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email."}}},"examples":{"response":{"value":{"url":"http://email.myhostname.com","hostname":"myhostname.com","spam_check":false,"send_raw":true}}}}}}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/Webhook401","modelName":"__components_responses_Webhook401"}},{"responseCode":"403","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/Webhook403","modelName":"__components_responses_Webhook403"}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/Webhook404","modelName":"__components_responses_Webhook404"}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}}}},"refName":"#/components/responses/Webhook500","modelName":"__components_responses_Webhook500"}}]
```

Create a parse setting

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  url: "http://email.myhostname.com",
  hostname: "myhostname.com",
  spam_check: false,
  send_raw: true,
};

const request = {
  url: `/v3/user/webhooks/parse/settings`,
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
    "url": "http://email.myhostname.com",
    "hostname": "myhostname.com",
    "spam_check": False,
    "send_raw": True,
}

response = sg.client.user.webhooks.parse.settings.post(request_body=data)

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
            ""url"": ""http://email.myhostname.com"",
            ""hostname"": ""myhostname.com"",
            ""spam_check"": false,
            ""send_raw"": true
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
            urlPath: "user/webhooks/parse/settings",
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

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("/user/webhooks/parse/settings");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("url", "http://email.myhostname.com");
                    put("hostname", "myhostname.com");
                    put("spam_check", false);
                    put("send_raw", true);
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
	request := sendgrid.GetRequest(apiKey, "/v3/user/webhooks/parse/settings", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "url": "http://email.myhostname.com",
  "hostname": "myhostname.com",
  "spam_check": false,
  "send_raw": true
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
    "url": "http://email.myhostname.com",
    "hostname": "myhostname.com",
    "spam_check": false,
    "send_raw": true
}');

try {
    $response = $sg->client
        ->user()
        ->webhooks()
        ->parse()
        ->settings()
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
  "url": "http://email.myhostname.com",
  "hostname": "myhostname.com",
  "spam_check": false,
  "send_raw": true
}')

response = sg.client.user.webhooks.parse.settings.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/user/webhooks/parse/settings" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"url": "http://email.myhostname.com", "hostname": "myhostname.com", "spam_check": false, "send_raw": true}'
```
