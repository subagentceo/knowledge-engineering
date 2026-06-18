# Personalize and segment messages with custom fields

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

To add extra information about a contact, create custom fields. Common use cases for custom fields include:

* Creating dynamic [segments][].
* Personalizing the subject lines or content of Marketing Campaign email messages you send.

You can create up to 500 custom fields using the labels and values of your choice.

## Custom field rules

Custom fields must meet the following requirements:

### Field names

The field name must:

* Include alphanumeric characters (A-Z and 0-9) and underscores (`_`).
* Begin with letters A-Z or underscores (`_`).

### Data types

You can create three different types of custom fields according to their data type. The data type impacts the queries used for segmentation:

| Type   | Query method                                                                           | Example                       |
| ------ | -------------------------------------------------------------------------------------- | ----------------------------- |
| Date   | Find contacts before, after, or on a specific date.                                    | 1/1/2014                      |
| Text   | Find contacts who match the specific text.                                             | A `pet` field that says `Dog` |
| Number | Find decimal or integer values greater than, less than, or equal to a specific number. | Contact age: `27`             |

> \[!WARNING]
>
> Twilio limits the length of text custom fields to 1,000 characters.

### Reserved fields

Your account comes preloaded with immutable reserved fields. Twilio reserves the following field names:

| Field name              | Field type |
| ----------------------- | ---------- |
| `first_name`            | text       |
| `last_name`             | text       |
| `email`                 | text       |
| `phone_number_id`       | text       |
| `external_id`           | text       |
| `anonymous_id`          | text       |
| `alternate_emails`      | text       |
| `address_line_1`        | text       |
| `address_line_2`        | text       |
| `city`                  | text       |
| `state_province_region` | text       |
| `postal_code`           | text       |
| `country`               | text       |
| `phone_number`          | text       |
| `whatsapp`              | text       |
| `line`                  | text       |
| `facebook`              | text       |
| `unique_name`           | text       |

Twilio deprecated the following contact custom fields:

* `whatsapp`
* `line`
* `facebook`
* `unique_name`

Twilio SendGrid populates six reserved fields:

* `lists`
* `created_at`
* `updated_at`
* `last_emailed`
* `last_clicked`
* `last_opened`

Reserved fields track useful metrics for your contacts.

## Create a custom field

To add a custom field, add the field using one of the following methods. If you're uploading a CSV, you can [download this sample CSV template](https://docs-resources.prod.twilio.com/documents/contacts-upload-example-updated_2.csv) to ensure the correct format.

## Upload CSV

To add multiple contacts at a time, upload a comma-separated value (CSV) file. These CSV files can contain a maximum of one million contacts or 5 GB in file size, whichever is less.

1. Download this [CSV template](https://docs-resources.prod.twilio.com/documents/contacts-upload-example-updated_2.csv). It ensures the correct format for your import.
2. Log in to the Twilio SendGrid console if needed.
3. Go to [**Marketing** > **Contacts**][sgc-contacts] in the Twilio SendGrid console.
4. From the **Add Contacts** menu, select **Upload CSV**.
5. A page displays where you can choose where you want to add your contacts:
   * **All Contacts**
   * To an existing list
   * To a new list you create
6. Upload your CSV file using one of two options:
   * Drag and drop it onto the upload box.
   * Click the **select a CSV file to upload**.
7. Click **Next: Review CSV Upload**.
8. Another page displays that lists all fields related to your contacts. This displays fields without a corresponding reserved or system field.
9. With each unmapped field, choose one of three options:
   1. Select a custom field from the drop-down.
   2. Click **Create New Custom Field** for a new custom field.
   3. Choose **Skip Column** for any fields you don't want to map.
10. When you're done mapping the fields, click **Next: Add Contacts**.
11. This queues your contacts for upload. Added contacts might take some time to display depending on the number of contacts added.
12. After Twilio processes the CSV file, it sends you a [notification][] email.

[CSV template]: /documents/contacts-upload-example-updated_2.csv

[notification]: /docs/sendgrid/ui/account-and-settings/notifications

[sgc-contacts]: https://mc.sendgrid.com/contacts

## API

If you'd like to add custom fields using the API, send a `POST` request to the [Field Definitions resource][sgapi-create-cf].

Create Custom Field Definition

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
  name: "My_Custom_Field",
  field_type: "Text",
};

const request = {
  url: `/v3/marketing/field_definitions`,
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

data = {"name": "My_Custom_Field", "field_type": "Text"}

response = sg.client.marketing.field_definitions.post(request_body=data)

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
            ""name"": ""My_Custom_Field"",
            ""field_type"": ""Text""
        }";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.POST,
            urlPath: "marketing/field_definitions",
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
            request.setEndpoint("/marketing/field_definitions");
            request.setBody(new JSONObject(new HashMap<String, Object>() {
                {
                    put("name", "My_Custom_Field");
                    put("field_type", "Text");
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
	request := sendgrid.GetRequest(apiKey, "/v3/marketing/field_definitions", host)
	request.Method = "POST"
	request.Body = []byte(`{
  "name": "My_Custom_Field",
  "field_type": "Text"
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
    "name": "My_Custom_Field",
    "field_type": "Text"
}');

try {
    $response = $sg->client
        ->marketing()
        ->field_definitions()
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
  "name": "My_Custom_Field",
  "field_type": "Text"
}')

response = sg.client.marketing.field_definitions.post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/marketing/field_definitions" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"name": "My_Custom_Field", "field_type": "Text"}'
```

## Console

To add custom fields from the Twilio SendGrid console:

1. Go to **Marketing** > [**Custom Fields**][sgc-custom].
2. Click **New Custom Field**. The **Add New Custom Field** panel appears.
3. Type a name into the **Field Name** box.
4. Choose a **Field Type** from the radio button set.
5. Click **Create Field**.
6. The panel closes and a banner displays **Success! Your custom field has been created!**

## Delete a custom field

To delete a custom field:

1. Go to **Marketing** and select **Custom Fields**.
2. Locate the field you wish to remove.
3. Hover over the action menu next to the field name entry.
4. Click the delete icon.
5. A confirmation modal appears: **Are you sure you want to delete this custom field?**.
   * To delete the contact from your account, click **Delete Field**.
   * To keep the contact in your account, click **Cancel**.
6. The panel closes and a banner displays **Success! Your custom field has been deleted!**

This deletion process may take several minutes. The custom field remains on this page until the process completes.

> \[!WARNING]
>
> When you delete a custom field, you also delete the field values for every contact. It also breaks single sends or automation emails using the custom field as a tag or segments using the field as a condition.

## How custom fields impact your campaigns

### Segmentation criteria

If you delete a custom field *used as criteria within a segment*, the segment fails to load. You can't send email messages to a segment based on a deleted custom field.

### Email substitution tags

When you delete a custom field used as a substitution tag of an email message, the fallback works in this order:

1. Twilio SendGrid replaces it with the default value you set.
2. Twilio SendGrid replaces it with the system default.
3. Twilio SendGrid displays nothing in the custom field's place.

If a custom field value doesn't appear in place of the corresponding [Substitution Tag][sub-tags], try one of these two solutions:

1. Verify that the contact has a custom field value. In custom fields without values, Twilio uses a space.
2. Check the spelling of the substitution tag in your message.

[sgapi-create-cf]: /docs/sendgrid/api-reference/custom-fields/create-custom-field-definition

[segments]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts/

[sub-tags]: /docs/sendgrid/ui/sending-email/editor#using-substitution-tags-with-the-code-editor

[sgc-custom]: https://mc.sendgrid.com/custom-fields
