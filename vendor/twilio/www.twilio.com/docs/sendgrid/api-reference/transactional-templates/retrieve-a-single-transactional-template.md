# Retrieve a single transactional template.

## API Overview

An HTML template that can establish a consistent design for [transactional emails](https://sendgrid.com/en-us/solutions/email-api/dynamic-email-templates).

Each parent account, as well as each Subuser, can create up to 300 different transactional templates. Templates are specific to the parent account or Subuser, meaning templates created on a parent account will not be accessible from the parent's Subuser accounts.

Transactional templates are templates created specifically for transactional email and are not to be confused with [Marketing Campaigns designs](/docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs). For more information about transactional templates, please see our [Dynamic Transactional Templates documentation](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates).

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/templates/{template_id}","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

**This endpoint allows you to retrieve a single transactional template.**

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"on-behalf-of","in":"header","description":"The `on-behalf-of` header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. You will use the parent account's API key when using this header. When making a call on behalf of a customer account, the property value should be \"account-id\" followed by the customer account's ID (e.g., `on-behalf-of: account-id <account-id>`). When making a call on behalf of a Subuser, the property value should be the Subuser's username (e.g., `on-behalf-of: <subuser-username>`). See [**On Behalf Of**](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/on-behalf-of) for more information.","required":false,"schema":{"type":"string"},"refName":"#/components/parameters/OnBehalfOf","modelName":"__components_parameters_OnBehalfOf"}]
```

### Path parameters

```json
[{"name":"template_id","in":"path","required":true,"schema":{"type":"string"}}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"title":"Transactional Templates: Template","example":{"id":"33feeff2-5069-43fe-8853-428651e5be79","name":"example_name","updated_at":"2021-04-28 13:12:46","warning":{"message":"Sample warning message"},"generation":"legacy"},"type":"object","required":["generation","id","name","updated_at"],"refName":"TransactionalTemplate","modelName":"TransactionalTemplate","properties":{"id":{"type":"string","description":"The ID of the transactional template.","minLength":36,"maxLength":36,"format":"uuid"},"name":{"type":"string","description":"The name for the transactional template.","maxLength":100},"generation":{"type":"string","description":"Defines the generation of the template.","enum":["legacy","dynamic"],"refName":"Generation1","modelName":"Generation1"},"updated_at":{"type":"string","description":"The date and time that this transactional template version was updated.","pattern":"^(\\d{4}-\\d{2}-\\d{2}) ((\\d{2}):(\\d{2}):(\\d{2}))$"},"versions":{"type":"array","description":"The different versions of this transactional template.","items":{"title":"Transactional Templates: Version Output Lean","type":"object","refName":"TransactionalTemplatesVersionOutputLean","modelName":"TransactionalTemplatesVersionOutputLean","properties":{"id":{"type":"string","description":"ID of the transactional template version.","format":"uuid"},"template_id":{"type":"string","description":"ID of the transactional template."},"active":{"type":"integer","description":"Set the version as the active version associated with the template. Only one version of a template can be active. The first version created for a template will automatically be set to Active.","enum":[0,1],"refName":"Active1","modelName":"Active1"},"name":{"type":"string","description":"Name of the transactional template version.","maxLength":100},"subject":{"type":"string","description":"Subject of the new transactional template version.","maxLength":255},"updated_at":{"type":"string","description":"The date and time that this transactional template version was updated."},"generate_plain_content":{"type":"boolean","description":"If true, plain_content is always generated from html_content. If false, plain_content is not altered.","default":true},"html_content":{"type":"string","description":"The HTML content of the Design."},"plain_content":{"type":"string","description":"Plain text content of the Design."},"editor":{"type":"string","description":"The editor used in the UI.","enum":["code","design"],"refName":"Editor1","modelName":"Editor1"},"thumbnail_url":{"type":"string","description":"A Thumbnail preview of the template's html content."}}}},"warning":{"title":"Warning","type":"object","example":{"message":"A sample warning message."},"refName":"TransactionalTemplateWarning","modelName":"TransactionalTemplateWarning","properties":{"message":{"type":"string","description":"Warning message for the user"}}}}},"examples":{"response":{"value":{"id":"40da60e6-66f3-4223-9406-ba58b7f55a62","name":"Duis in dolor","generation":"legacy","updated_at":"2020-12-12 58:26:65","versions":[]}}}}}}}]
```

Retrieve a single transactional template.

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const template_id = "template_id";

const request = {
  url: `/v3/templates/${template_id}`,
  method: "GET",
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

template_id = "template_id"

response = sg.client.templates._(template_id).get()

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

        var templateId = "template_id";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: $"templates/{templateId}");

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
            request.setEndpoint("/templates/template_id");
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
	request := sendgrid.GetRequest(apiKey, "/v3/templates/template_id", host)
	request.Method = "GET"
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
$template_id = "template_id";

try {
    $response = $sg->client
        ->templates()
        ->_($template_id)
        ->get();
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
template_id = "template_id"

response = sg.client.templates._(template_id).get()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X GET "https://api.sendgrid.com/v3/templates/template_id" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
