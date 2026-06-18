# twilio/text

The `twilio/text` content type contains only plain text-based content. While you can send text to OTT channels without using content templates, you can use the `twilio/text` type as a fallback content type when sending to a mix of channels. Additionally, you can use variables in content templates to create dynamic content.

> \[!WARNING]
>
> You can send `twilio/text` content templates via WhatsApp for out-of-session messages with variables. If the template's body starts or ends with a variable or has two variables next to each other, the template won't be approved without a sample variable. For additional information about variables, see [using variables with content templates](/docs/content/using-variables-with-content-api).

## Supported channels

* SMS
* RCS
* WhatsApp
* Facebook Messenger

## Message preview

![Text message saying 'Hi, name. Thanks for contacting Owl Air Support. How can I help?'.](https://docs-resources.prod.twilio.com/4ddc012ea55af0c2093fd8cf007dd208f6ccb2679978073f3df3b1999835b91e.jpg)

## Data parameters

| Parameter | Type   | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                      |
| --------- | ------ | -------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `body`    | string | Yes      | Yes                                                                | The text of the message you want to send. <br />Maximum length: 1,600 characters |

## Code examples and responses

Create a text template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the twilio/text
    var twilioText = new TwilioText.Builder();
    twilioText.WithBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithTwilioText(twilioText.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("text_template");
    contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "John"} });
    
    // create the twilio template
    var contentTemplate = await CreateAsync(contentCreateRequest.Build());

    Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

```java
package Examples;

import com.twilio.rest.content.v1.Content;

import java.util.Arrays;
import java.util.Map;

public class TwilioText {
    public static String CreateTemplate() {
        var twilioText = new Content.TwilioText();
        twilioText.setBody("Hi {{1}}, thanks for contacting Owl Air Support. How can we help?");

        var types = new Content.Types();
        types.setTwilioText(twilioText);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("media_template");
        createRequest.setVariables(Map.of(
        "1", "first_name"
        ));

        var content = Content.creator(createRequest).create();

        return content.getSid();
    }
}
```

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "media_template",
    "language": "en",
    "variables": {"1":"name"},
    "types": {
        "twilio/text": {
            "body": "Hi, {{1}}. \n Thanks for contacting Owl Air Support. How can I help?."
        }
    }
}'
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-09-01T12:39:19Z",
  "date_updated": "2022-09-01T12:39:19Z",
  "friendly_name": "media_template",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/text": {
      "body": "Hi, {{1}}. \n Thanks for contacting Owl Air Support. How can I help?."
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "name"
  }
}
```
