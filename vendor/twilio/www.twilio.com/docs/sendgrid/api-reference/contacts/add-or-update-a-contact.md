# Add or update a contact

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/marketing/contacts","method":"put","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

**This endpoint allows the [upsert](https://en.wiktionary.org/wiki/upsert) (insert or update) of up to 30,000 contacts, or 6MB of data, whichever is lower**.
Because the creation and update of contacts is an asynchronous process, the response will not contain immediate feedback on the processing of your upserted contacts. Rather, it will contain an HTTP 202 response indicating the contacts are queued for processing or an HTTP 4XX error containing validation errors. Should you wish to get the resulting contact's ID or confirm that your contacts have been updated or added, you can use the [Get Contacts by Identifiers operation](https://www.twilio.com/docs/sendgrid/api-reference/contacts/get-contacts-by-identifiers).
Please note that custom fields need to have been already created if you wish to set their values for the contacts being upserted. To do this, please use the [Create Custom Field Definition endpoint](https://www.twilio.com/docs/sendgrid/api-reference/custom-fields/create-custom-field-definition).
You will see a `job_id` in the response to your request. This can be used to check the status of your upsert job. To do so, please use the [Import Contacts Status endpoint](https://www.twilio.com/docs/sendgrid/api-reference/contacts/import-contacts-status).
If the contact already exists in the system, any entries submitted via this endpoint will update the existing contact. In order to update a contact, all of its existing identifiers must be present. Any fields omitted from the request will remain as they were. A contact's ID cannot be used to update the contact.
The email field will be changed to all lower-case. If a contact is added with an email that exists but contains capital letters, the existing contact with the all lower-case email will be updated.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Request body

```json
{"schema":{"type":"object","required":["contacts"],"properties":{"list_ids":{"type":"array","description":"An array of List ID strings that this contact will be added to.","items":{"type":"string","format":"uuid"}},"contacts":{"type":"array","description":"One or more contacts objects that you intend to upsert. Each contact needs to include at least one of `email`, `phone_number_id`, `external_id`, or `anonymous_id` as an identifier.","minItems":1,"maxItems":30000,"items":{"title":"contact-request","type":"object","refName":"ContactRequest","modelName":"ContactRequest","properties":{"address_line_1":{"type":"string","description":"The first line of the address.","maxLength":100},"address_line_2":{"type":"string","description":"An optional second line for the address.","maxLength":100},"alternate_emails":{"type":"array","description":"Additional emails associated with the contact.","minItems":0,"maxItems":5,"items":{"type":"string","maxLength":254}},"city":{"type":"string","description":"The contact's city.","maxLength":60},"country":{"type":"string","description":"The contact's country. Can be a full name or an abbreviation.","maxLength":50},"email":{"type":"string","description":"The contact's primary email. This is required to be a valid email.","maxLength":254},"phone_number_id":{"type":"string","description":"The contact's Phone Number ID. This must be a valid phone number."},"external_id":{"type":"string","description":"The contact's External ID.","maxLength":254},"anonymous_id":{"type":"string","description":"The contact's Anonymous ID.","maxLength":254},"first_name":{"type":"string","description":"The contact's personal name.","maxLength":50},"last_name":{"type":"string","description":"The contact's family name.","maxLength":50},"postal_code":{"type":"string","description":"The contact's ZIP code or other postal code."},"state_province_region":{"type":"string","description":"The contact's state, province, or region.","maxLength":50},"custom_fields":{"type":"object","description":"An object of custom field IDs and the values you want to associate with those custom fields. You can retrieve the IDs of your custom fields from the [Get All Field Definitions endpoint](https://docs.sendgrid.com/api-reference/custom-fields/get-all-field-definitions).","example":{"w1":"coffee","w33":"42","e2":"blue"},"properties":{"w1":{"type":"string","description":"The properties in this object are made up of a key (the custom field ID) and value you want associated with that custom field. For example `{\"w1\": \"coffee\"}`."}}}}}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"202","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"job_id":{"type":"string","description":"Indicates that the contacts are queued for processing. Check the job status with the \"Import Contacts Status\" endpoint."}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"title":"error","type":"object","example":{"field":"field_name","message":"error message"},"required":["message"],"refName":"ContactsError","modelName":"ContactsError","properties":{"message":{"type":"string"},"field":{"type":"string"},"error_id":{"type":"string"},"parameter":{"type":"string"}}}}}}}}}},{"responseCode":"401","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts401","modelName":"__components_responses_MarketingContacts401"}},{"responseCode":"403","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts403","modelName":"__components_responses_MarketingContacts403"}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}}}},"refName":"#/components/responses/MarketingContacts404","modelName":"__components_responses_MarketingContacts404"}},{"responseCode":"500","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}}}},"refName":"#/components/responses/MarketingContacts500","modelName":"__components_responses_MarketingContacts500"}}]
```

Add or Update a Contact

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  contacts: [
    {
      address_line_1: "19 Canberra Ln",
      address_line_2: "",
      alternate_emails: ["alex@example.com"],
      city: "Port Douglas",
      country: "AU",
      email: "alex@example.com",
      phone_number_id: "+61412345678",
      external_id: "external_id",
      anonymous_id: "anonymous_id",
      first_name: "Alex",
      last_name: "Bloggs",
      postal_code: "4877",
      state_province_region: "QLD",
      custom_fields: {
        w1: "w1",
      },
    },
  ],
};

const request = {
  url: `/v3/marketing/contacts`,
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

data = {
    "contacts": [
        {
            "address_line_1": "19 Canberra Ln",
            "address_line_2": "",
            "alternate_emails": ["alex@example.com"],
            "city": "Port Douglas",
            "country": "AU",
            "email": "alex@example.com",
            "phone_number_id": "+61412345678",
            "external_id": "external_id",
            "anonymous_id": "anonymous_id",
            "first_name": "Alex",
            "last_name": "Bloggs",
            "postal_code": "4877",
            "state_province_region": "QLD",
            "custom_fields": {"w1": "w1"},
        }
    ]
}

response = sg.client.marketing.contacts.put(request_body=data)

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
            ""contacts"": [
                {
                    ""address_line_1"": ""19 Canberra Ln"",
                    ""address_line_2"": """",
                    ""alternate_emails"": [
                        ""alex@example.com""
                    ],
                    ""city"": ""Port Douglas"",
                    ""country"": ""AU"",
                    ""email"": ""alex@example.com"",
                    ""phone_number_id"": ""+61412345678"",
                    ""external_id"": ""external_id"",
                    ""anonymous_id"": ""anonymous_id"",
                    ""first_name"": ""Alex"",
                    ""last_name"": ""Bloggs"",
                    ""postal_code"": ""4877"",
                    ""state_province_region"": ""QLD"",
                    ""custom_fields"": {
                        ""w1"": ""w1""
                    }
                }
            ]
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.PUT, urlPath: "marketing/contacts", requestBody: data);

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
            request.setEndpoint("/marketing/contacts");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("contacts", Arrays.asList(new HashMap<String, Object>() {
                        {
                            put("address_line_1", "19 Canberra Ln");
                            put("address_line_2", "");
                            put("alternate_emails", Arrays.asList("alex@example.com"));
                            put("city", "Port Douglas");
                            put("country", "AU");
                            put("email", "alex@example.com");
                            put("phone_number_id", "+61412345678");
                            put("external_id", "external_id");
                            put("anonymous_id", "anonymous_id");
                            put("first_name", "Alex");
                            put("last_name", "Bloggs");
                            put("postal_code", "4877");
                            put("state_province_region", "QLD");
                            put("custom_fields", new HashMap<String, Object>() {
                                {
                                    put("w1", "w1");
                                }
                            });
                        }
                    }));
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/contacts", host)
	request.Method = "PUT"
	request.Body = []byte(`{
  "contacts": [
    {
      "address_line_1": "19 Canberra Ln",
      "address_line_2": "",
      "alternate_emails": [
        "alex@example.com"
      ],
      "city": "Port Douglas",
      "country": "AU",
      "email": "alex@example.com",
      "phone_number_id": "+61412345678",
      "external_id": "external_id",
      "anonymous_id": "anonymous_id",
      "first_name": "Alex",
      "last_name": "Bloggs",
      "postal_code": "4877",
      "state_province_region": "QLD",
      "custom_fields": {
        "w1": "w1"
      }
    }
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
    "contacts": [
        {
            "address_line_1": "19 Canberra Ln",
            "address_line_2": "",
            "alternate_emails": [
                "alex@example.com"
            ],
            "city": "Port Douglas",
            "country": "AU",
            "email": "alex@example.com",
            "phone_number_id": "+61412345678",
            "external_id": "external_id",
            "anonymous_id": "anonymous_id",
            "first_name": "Alex",
            "last_name": "Bloggs",
            "postal_code": "4877",
            "state_province_region": "QLD",
            "custom_fields": {
                "w1": "w1"
            }
        }
    ]
}');

try {
    $response = $sg->client
        ->marketing()
        ->contacts()
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
  "contacts": [
    {
      "address_line_1": "19 Canberra Ln",
      "address_line_2": "",
      "alternate_emails": [
        "alex@example.com"
      ],
      "city": "Port Douglas",
      "country": "AU",
      "email": "alex@example.com",
      "phone_number_id": "+61412345678",
      "external_id": "external_id",
      "anonymous_id": "anonymous_id",
      "first_name": "Alex",
      "last_name": "Bloggs",
      "postal_code": "4877",
      "state_province_region": "QLD",
      "custom_fields": {
        "w1": "w1"
      }
    }
  ]
}')

response = sg.client.marketing.contacts.put(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X PUT "https://api.sendgrid.com/v3/marketing/contacts" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"contacts": [{"address_line_1": "19 Canberra Ln", "address_line_2": "", "alternate_emails": ["alex@example.com"], "city": "Port Douglas", "country": "AU", "email": "alex@example.com", "phone_number_id": "+61412345678", "external_id": "external_id", "anonymous_id": "anonymous_id", "first_name": "Alex", "last_name": "Bloggs", "postal_code": "4877", "state_province_region": "QLD", "custom_fields": {"w1": "w1"}}]}'
```
