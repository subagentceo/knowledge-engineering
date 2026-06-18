# twilio/flows

## Overview

With WhatsApp Flows, you create an in-app, multi-screen experience that a user receives and submits all within WhatsApp.

A business sends a Flow as part of an approved Content Template. The templated message contains a button to open the attached Flow in the WhatsApp UI. Within the Flow, you can include text, images, and several input components. End users respond with single-choice, multi-choice, toggle, short-text, long-text, and date-picker inputs. You can organize these components across up to 10 screens.

> \[!WARNING]
>
> Variable names within pages can't have periods in them.

### `twilio/flows` versus `whatsapp/flows`

The `twilio/flows` Content Template type works well for Flows that don't need complex inputs across multiple screens or endpoint features. You can create `twilio/flows` in the [Content Template Builder](/docs/content/create-templates-with-the-content-template-builder) or the [Content API](/docs/content/create-and-send-your-first-content-api-template). Compare with [`whatsapp/flows`](/docs/content/whatsapp-flows) that require creating the Flow in the WhatsApp Business Account before sending with the Twilio Content API.

> \[!WARNING]
>
> Flows aren't designed to transmit HIPAA Eligible Service or PCI data. Don't use them in workflows that require HIPAA or PCI compliance.
>
> If you need to transmit sensitive information, use [Message Redaction](/docs/messaging/guides/privacy-message-redaction). Message Redaction isn't yet compatible with Studio, Proxy Service, or Functions. Don't send Flows that contain sensitive information through these products or services.

### Supported options for end users

* Send a multi-screen form that includes several questions.
* Collect text input, selections, and picker answers.
* Include images, links, and clarifying text on each screen.

## Supported channels

WhatsApp

## Message preview

| ![Twilio Demo chat showing a response with a helpful link and notification.](https://docs-resources.prod.twilio.com/e64e868d070aaa42b0ba1da5fc34799aa56d4b3e2abd18571b6e7a2668ef3f2f.jpg) | ![Survey form with questions on finding method and favorite number, includes options and a complete button.](https://docs-resources.prod.twilio.com/a06480b6bc50baacd0adca7fd3561f6db3141d11d826c3cf8d53390d9f3c47c8.jpg) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Create a Flow

To create a Flow in the Content Template Builder:

1. Create a `twilio/flows` Content Template.
2. Submit the content template for approval. Choose the appropriate category (`UTILITY` or `MARKETING`).
3. When you submit the `twilio/flows` Content Template, Meta publishes the Flow in your WhatsApp Business Account. You can view the publishing status in the Content Template approvals list. You can't use Flows without an approved content template.

## Data parameters

| Parameter     | Type   | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                      |
| ------------- | ------ | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`        | string | Yes      | Yes                                                                | Text of the templated message that delivers the Flow. Maximum length: 1,024 characters                                                           |
| `subtitle`    | string | No       | No                                                                 | Footer of the message. Maximum length: 1,024 characters                                                                                          |
| `media_url`   | string | No       | Yes                                                                | Media on the initial Flow message. Supports `.png`, `.jpeg`, `.mp4`, and `.pdf`. The domain must be static; the path can be variable.            |
| `type`        | enum   | Yes      | No                                                                 | Flow category. Valid values: `SIGN_UP`, `SIGN_IN`, `APPOINTMENT_BOOKING`, `LEAD_GENERATION`, `CONTACT_US`, `CUSTOMER_SUPPORT`, `SURVEY`, `OTHER` |
| `button_text` | string | Yes      | No                                                                 | Text displayed on the button that starts the Flow.                                                                                               |
| `pages`       | array  | Yes      | No                                                                 | Definitions of each page's components. Maximum: 10 pages.                                                                                        |

### `pages` properties

| Property   | Type   | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                                                                      |
| ---------- | ------ | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`       | string | Yes      | No                                                                 | Identifier returned in the webhook. Maximum length: 20 characters                                                                                                                                                                                |
| `title`    | string | No       | No                                                                 | Title text that appears above the Flow page.                                                                                                                                                                                                     |
| `subtitle` | string | No       | No                                                                 | Subtitle text that appears at the top of the Flow page.                                                                                                                                                                                          |
| `layout`   | array  | Yes      | No                                                                 | Components shown on the page. Each component must be one of the following: `SHORT_TEXT`,`LONG_TEXT`,`SINGLE_SELECT`,`MULTI_SELECT`,`DATE_PICKER`,`LIST`,`TEXT_HEADING`,`TEXT_SUBHEADING`,`TEXT_CAPTION`,`TEXT_BODY`,`RICH_TEXT`,`MEDIA`,`FOOTER` |

### `layout` properties

**`SHORT_TEXT` object**

| Property     | Required | Type    | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                   |
| ------------ | -------- | ------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `type`       | Yes      | enum    | No                                                                 | Must be `SHORT_TEXT`.                                                                         |
| `text`       | Yes      | string  | Yes (entire string must be variable or static)                     | Helper text.                                                                                  |
| `label`      | Yes      | string  | Yes (entire string must be variable or static)                     | Question displayed to the user.                                                               |
| `required`   | No       | Boolean | No                                                                 | Defaults to `false`. Whether the user must answer the question.                               |
| `input_type` | No       | enum    | No                                                                 | Defaults to `TEXT`. Valid values: `TEXT`, `NUMBER`, `EMAIL`, `PASSWORD`, `PASSCODE`, `PHONE`. |

**`LONG_TEXT` object**

| Property   | Required | Type    | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                     |
| ---------- | -------- | ------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| `type`     | Yes      | enum    | No                                                                 | Must be `LONG_TEXT`.                                            |
| `text`     | Yes      | string  | Yes (entire string must be variable or static)                     | Helper text.                                                    |
| `label`    | Yes      | string  | Yes (entire string must be variable or static)                     | Question displayed to the user.                                 |
| `required` | No       | Boolean | No                                                                 | Defaults to `false`. Whether the user must answer the question. |

**`SINGLE_SELECT` object**

| Property        | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                 |
| --------------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | Yes      | enum   | No                                                                 | Must be `SINGLE_SELECT`.                                                                                                                                                                    |
| `text`          | Yes      | string | Yes (entire string must be variable or static)                     | Helper text.                                                                                                                                                                                |
| `label`         | Yes      | string | Yes (entire string must be variable or static)                     | Question displayed to the user.                                                                                                                                                             |
| `options`       | Yes      | string | Yes (entire string must be variable or static)                     | Stringified array that contains `title` and `id` pairs. If you use a variable, the variable must replace the entire string. Example: `"[{\"id\":\"ff\",\"title\":\"Friends and family\"}]"` |
| `options.title` | Yes      | string | Yes                                                                | Display title for the option. Can be a variable.                                                                                                                                            |
| `options.id`    | Yes      | string | Yes                                                                | Option identifier returned in the webhook. Can be a variable.                                                                                                                               |

**`MULTI_SELECT` object**

| Property        | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                 |
| --------------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | Yes      | enum   | No                                                                 | Must be `MULTI_SELECT`.                                                                                                                                                                     |
| `text`          | Yes      | string | Yes (entire string must be variable or static)                     | Helper text.                                                                                                                                                                                |
| `label`         | Yes      | string | Yes (entire string must be variable or static)                     | Question displayed to the user.                                                                                                                                                             |
| `options`       | Yes      | string | Yes (entire string must be variable or static)                     | Stringified array that contains `title` and `id` pairs. If you use a variable, the variable must replace the entire string. Example: `"[{\"id\":\"ff\",\"title\":\"Friends and family\"}]"` |
| `options.title` | Yes      | string | Yes                                                                | Display title for the option. Can be a variable.                                                                                                                                            |
| `options.id`    | Yes      | string | Yes                                                                | Option identifier returned in the webhook. Can be a variable.                                                                                                                               |

**`DATE_PICKER` object**

| Property            | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                    |
| ------------------- | -------- | ------ | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| `type`              | Yes      | enum   | No                                                                 | Must be `DATE_PICKER`.                                         |
| `label`             | Yes      | string | Yes (entire string must be variable or static)                     | Question displayed to the user.                                |
| `min_date`          | Yes      | string | Yes (entire string must be variable or static)                     | Start date in `YYYY-MM-DD` format.                             |
| `max_date`          | Yes      | string | Yes (entire string must be variable or static)                     | End date in `YYYY-MM-DD` format.                               |
| `unavailable_dates` | Yes      | string | Yes (entire string must be variable or static)                     | Stringified array of unavailable dates in `YYYY-MM-DD` format. |
| `name`              | No       | string | Yes (entire string must be variable or static)                     | Name of the date picker object.                                |

**`LIST` object**

| Property        | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                 |
| --------------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | Yes      | enum   | No                                                                 | Must be `LIST`.                                                                                                                                                                             |
| `label`         | Yes      | string | Yes (entire string must be variable or static)                     | Question displayed to the user.                                                                                                                                                             |
| `options`       | Yes      | string | Yes (entire string must be variable or static)                     | Stringified array that contains `title` and `id` pairs. If you use a variable, the variable must replace the entire string. Example: `"[{\"id\":\"ff\",\"title\":\"Friends and family\"}]"` |
| `options.title` | Yes      | string | Yes                                                                | Display title for the option. Can be a variable.                                                                                                                                            |
| `options.id`    | Yes      | string | Yes                                                                | Option identifier returned in the webhook. Can be a variable.                                                                                                                               |

**`TEXT_HEADING` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`   | Yes      | enum   | No                                                                 | Must be `TEXT_HEADING`.                                                                                                                                                                    |
| `text`   | Yes      | string | Yes (entire string must be variable or static)                     | Markdown-formatted text. Supports the syntax described in the [WhatsApp Components syntax cheat sheet](https://developers.facebook.com/docs/whatsapp/flows/reference/components#richtext). |

**`TEXT_SUBHEADING` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`   | Yes      | enum   | No                                                                 | Must be `TEXT_SUBHEADING`.                                                                                                                                                                 |
| `text`   | Yes      | string | Yes (entire string must be variable or static)                     | Markdown-formatted text. Supports the syntax described in the [WhatsApp Components syntax cheat sheet](https://developers.facebook.com/docs/whatsapp/flows/reference/components#richtext). |

**`TEXT_BODY` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`   | Yes      | enum   | No                                                                 | Must be `TEXT_BODY`.                                                                                                                                                                       |
| `text`   | Yes      | string | Yes (entire string must be variable or static)                     | Markdown-formatted text. Supports the syntax described in the [WhatsApp Components syntax cheat sheet](https://developers.facebook.com/docs/whatsapp/flows/reference/components#richtext). |

**`TEXT_CAPTION` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`   | Yes      | enum   | No                                                                 | Must be `TEXT_CAPTION`.                                                                                                                                                                    |
| `text`   | Yes      | string | Yes (entire string must be variable or static)                     | Markdown-formatted text. Supports the syntax described in the [WhatsApp Components syntax cheat sheet](https://developers.facebook.com/docs/whatsapp/flows/reference/components#richtext). |

**`RICH_TEXT` object**

| Property    | Required | Type  | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                            |
| ----------- | -------- | ----- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`      | Yes      | enum  | No                                                                 | Must be `RICH_TEXT`.                                                                                                                                                                                   |
| `text_list` | Yes      | array | Yes (entire string must be variable or static)                     | Array of Markdown-formatted strings. Supports the syntax described in the [WhatsApp Components syntax cheat sheet](https://developers.facebook.com/docs/whatsapp/flows/reference/components#richtext). |

**`MEDIA` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                     |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ----------------------------------------------- |
| `type`   | Yes      | enum   | No                                                                 | Must be `MEDIA`.                                |
| `url`    | Yes      | string | Yes                                                                | Image URL. Supports `.jpeg` and `.png` formats. |

**`FOOTER` object**

| Property | Required | Type   | [Variable support](/docs/content/using-variables-with-content-api) | Description                                             |
| -------- | -------- | ------ | ------------------------------------------------------------------ | ------------------------------------------------------- |
| `type`   | Yes      | enum   | No                                                                 | Must be `FOOTER`.                                       |
| `label`  | Yes      | string | Yes                                                                | Text displayed in the button used to continue the Flow. |

## Create a `twilio/flows` Content Template and check its approval status

Content Templates API - Create a Flow Template

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
   "friendly_name": "info_flow",
   "language": "en",
   "types": {
  "twilio/flows": {
    "body": "Wow do we have something super cool for you! Thanks for your interest. we have a helpful link there too.",
    "button_text": "See flow",
    "subtitle": "Finish flow",
    "pages": [
      {
        "id": "id_one",
        "next_page_id": "id_two",
        "title": "Page 1",
        "layout": [
          {
            "label": "Name",
            "type": "SHORT_TEXT",
            "text": "Question 1",
            "required": true
          },
          {
            "label": "Email",
            "type": "SHORT_TEXT",
            "text": "Question 2",
            "input_type": "EMAIL"
          },
          {
            "label": "Address",
            "type": "LONG_TEXT",
            "text": "Question 3"
          }
        ]
      },
      {
        "id": "id_two",
        "next_page_id": null,
        "title": "Page 2",
        "subtitle": "Subtitle of Page 2",
        "layout": [
          {
            "label": "How did you find us?",
            "type": "SINGLE_SELECT",
            "options": "[{\"id\":\"ff\",\"title\":\"Friends and family\"},{\"id\":\"oo\",\"title\":\"Online\"},{\"id\":\"ip\",\"title\":\"In person\"}]"
          },
          {
            "label": "What is your favorite number?",
            "type": "MULTIPLE_SELECT",
            "options": "[{\"id\":\"one\",\"title\":\"one one\"},{\"id\":\"two\",\"title\":\"two two\"},{\"id\":\"three\",\"title\":\"three three\"}]"
          },
          {
            "type": "TEXT_BODY",
            "text": "Go to [Google](https://www.google.com/) if you have any questions"
          },
          {
            "type": "TEXT_CAPTION",
            "text": "No seriously, go to [Google](https://www.google.com/) if you have any questions"
          },
          {
            "label": "If other, tell us where",
            "type": "SHORT_TEXT",
            "text": "Question 6"
          }
        ]
      }
    ],
    "type": "OTHER"
  }
}
}'
```

```json
{
    "account_sid": "ACXXXXXXXXXXXXX",
    "date_created": "2025-01-22T22:35:25Z",
    "date_updated": "2025-01-22T22:35:25Z",
    "friendly_name": "info_flow",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXX",
    "types": {
        "twilio/flows": {
            "body": "Wow do we have something super cool for you! Thanks for your interest. we have a helpful link there too.",
            "button_text": "See flow",
            "media_url": null,
            "pages": [
                {
                    "id": "id_one",
                    "layout": [
                        {
                            "input_type": "TEXT",
                            "label": "Name",
                            "name": null,
                            "required": true,
                            "text": "Question 1",
                            "type": "SHORT_TEXT"
                        },
                        {
                            "input_type": "EMAIL",
                            "label": "Email",
                            "name": null,
                            "required": null,
                            "text": "Question 2",
                            "type": "SHORT_TEXT"
                        },
                        {
                            "input_type": null,
                            "label": "Address",
                            "name": null,
                            "required": null,
                            "text": "Question 3",
                            "type": "LONG_TEXT"
                        }
                    ],
                    "next_page_id": "id_two",
                    "subtitle": null,
                    "title": "Page 1"
                },
                {
                    "id": "id_two",
                    "layout": [
                        {
                            "label": "How did you find us?",
                            "name": null,
                            "options": "[{\"id\":\"ff\",\"title\":\"Friends and family\"},{\"id\":\"oo\",\"title\":\"Online\"},{\"id\":\"ip\",\"title\":\"In person\"}]",
                            "required": null,
                            "type": "SINGLE_SELECT"
                        },
                        {
                            "label": "What's your favorite number?",
                            "name": null,
                            "options": "[{\"id\":\"one\",\"title\":\"one one\"},{\"id\":\"two\",\"title\":\"two two\"},{\"id\":\"three\",\"title\":\"three three\"}]",
                            "required": null,
                            "type": "MULTIPLE_SELECT"
                        },
                        {
                            "text": "Go to [Google](https://www.google.com/) if you have any questions",
                            "type": "TEXT_BODY"
                        },
                        {
                            "text": "No seriously, go to [Google](https://www.google.com/) if you have any questions",
                            "type": "TEXT_CAPTION"
                        },
                        {
                            "input_type": "TEXT",
                            "label": "If other, tell us where",
                            "name": null,
                            "required": null,
                            "text": "Question 6",
                            "type": "SHORT_TEXT"
                        }
                    ],
                    "next_page_id": null,
                    "subtitle": "Subtitle of Page 2",
                    "title": "Page 2"
                }
            ],
            "subtitle": "Finish flow",
            "type": "OTHER"
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXX",
    "variables": {}
}
```

### Fetch an approval status for a `twilio/flows` Content Template

You can check the status of a Content Template submitted for WhatsApp approval:

Fetch content and approvals

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listContentAndApprovals() {
  const contentAndApprovals = await client.content.v1.contentAndApprovals.list({
    limit: 20,
  });

  contentAndApprovals.forEach((c) => console.log(c.dateCreated));
}

listContentAndApprovals();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

content_and_approvals = client.content.v1.content_and_approvals.list(limit=20)

for record in content_and_approvals:
    print(record.date_created)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var contentAndApprovals = await ContentAndApprovalsResource.ReadAsync(limit: 20);

        foreach (var record in contentAndApprovals) {
            Console.WriteLine(record.DateCreated);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.content.v1.ContentAndApprovals;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ContentAndApprovals> contentAndApprovals = ContentAndApprovals.reader().limit(20).read();

        for (ContentAndApprovals record : contentAndApprovals) {
            System.out.println(record.getDateCreated());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	content "github.com/twilio/twilio-go/rest/content/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &content.ListContentAndApprovalsParams{}
	params.SetLimit(20)

	resp, err := client.ContentV1.ListContentAndApprovals(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].DateCreated != nil {
				fmt.Println(*resp[record].DateCreated)
			} else {
				fmt.Println(resp[record].DateCreated)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$contentAndApprovals = $twilio->content->v1->contentAndApprovals->read(20);

foreach ($contentAndApprovals as $record) {
    print $record->dateCreated?->format("r");
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

content_and_approvals = @client
                        .content
                        .v1
                        .content_and_approvals
                        .list(limit: 20)

content_and_approvals.each do |record|
   puts record.date_created
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:content:v1:content-and-approvals:list
```

```bash
curl -X GET "https://content.twilio.com/v1/ContentAndApprovals?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "contents": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "key": "contents"
  }
}
```

## Send your `twilio/flows` template

Sending a `twilio/flows` Content Template is the same process as sending other Content Templates using the Programmable Messaging APIs. For detailed steps, see [Send templates created with the Content Template Builder](/docs/content/send-templates-created-with-the-content-template-builder).

Send a WhatsApp Flow Content Template message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    contentSid: "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+15017122661",
  });

  console.log(message.sid);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="whatsapp:+14155238886",
    to="whatsapp:+15017122661",
    content_sid="HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(message.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
            to: new Twilio.Types.PhoneNumber("whatsapp:+15017122661"),
            contentSid: "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15017122661"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
                                  "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                              .create();

        System.out.println(message.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetFrom("whatsapp:+14155238886")
	params.SetTo("whatsapp:+15017122661")
	params.SetContentSid("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "whatsapp:+15017122661", // To
    [
        "from" => "whatsapp:+14155238886",
        "contentSid" => "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    ]
);

print $message->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+15017122661',
            content_sid: 'HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          )

puts message.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from whatsapp:+14155238886 \
   --to whatsapp:+15017122661 \
   --content-sid HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "To=whatsapp:+15017122661" \
--data-urlencode "ContentSid=HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15017122661",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Receive a Flow submission

When a user submits a Flow in WhatsApp, Twilio sends a webhook request to the messaging endpoint that you've configured on your WhatsApp sender. The `InteractiveData` field contains the names and user-submitted values for the Flow's structured data components.

You can also prepare a follow-up experience for the user, such as a message to indicate that you have received the completed flow.

### Flow-specific webhook fields

| Field             | Description                                |
| ----------------- | ------------------------------------------ |
| `FlowData`        | Raw data string from the channel provider. |
| `InteractiveData` | User-provided information in JSON format.  |
