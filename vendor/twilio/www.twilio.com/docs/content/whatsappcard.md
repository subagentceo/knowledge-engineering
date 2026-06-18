# whatsapp/card

The `whatsapp/card` content type is a structured template used to send a series of related information. It must include a body and at least **one** additional field.

> \[!NOTE]
>
> A WhatsApp card can't have both a text header and a media header.

> \[!NOTE]
>
> On WhatsApp, a card must be approved as a template before it can be sent. If you use variables with `whatsapp/card`, then additional approval steps are required.
>
> If you create a `whatsapp/card` content template with media and variables, and plan to submit this template to WhatsApp for approval, you must provide a valid media sample. Static media URLs should resolve to publicly hosted media files. Variable media URLs should include a valid media URL suffix in the variable declaration.
>
> Only one type of media can be sent per approved variable WhatsApp card template. WhatsApp classifies approved templates into 1 of 3 types of media headers (Image, Video, Document) based on the sample that was submitted. Once the template has been approved, you can't send another type of media header using the template.
>
> For example, if a template is approved with an image, you can't send a video using the same template.

In the `media` field of the template you create, provide the URL of the publicly hosted file.

If you are using media in the card with a variable, please submit a sample path of a publicly hosted image URL in the variable array. The combined URL must contain the file type. The combined URL must resolve to a publicly hosted file.

For example, `"media": ["https://www.example.com/{{1}}"]` would include a path sample in the `variables` definition: `"variables": {"1": "images/library-logo-resource2x.width-1000.png"}`

If you are using a call-to-action URL button in your card, the URL must resolve to a publicly accessible website. If there is a variable, a valid path sample should be included in the variables array. The combined URL should resolve to a publicly accessible website.

For example, `"url": ["https://www.twilio.com/{{1}}"]` would include a path sample in the `variables` definition: `"variables": {"1": "docs"}`

> \[!WARNING]
>
> * If the template's body starts or ends with a variable or has two variables next to each other, the template won't be approved by WhatsApp without a sample variable. For additional information about variables, see [Using Variables with Content Templates](/docs/content/using-variables-with-content-api).
> * When creating your template, update the phone number in the actions array to a valid phone number. Otherwise, the template will fail to send.

## Supported channels

* WhatsApp

## Channel-specific information

### WhatsApp

* `VOICE_CALL` is currently a private beta feature in select regions.
* If the content template is being sent in session over WhatsApp without approval, only three buttons are allowed.
* On WhatsApp, a card must be approved as a template before it can be sent outside of the 24-hour conversation window. Additional approval steps are required if you use variables with `whatsapp/card`. If you plan to submit a `whatsapp/card` content template to WhatsApp for approval that includes media and/or variables, you must provide a valid media sample. Static media URLs should resolve to publicly hosted media files. Variable media URLs should include a valid media URL suffix in the variable declaration.
* Only one type of media can be sent per approved variable WhatsApp card template. WhatsApp classifies approved templates into 1 of 3 types of media headers (Image, Video, Document) based on the sample that was submitted. Once the template has been approved, you can't send another type of media header using the template.
  * For example, if a template is approved with an image, you can't send a video using that same template.
* If the template's body starts or ends with a variable or has two variables next to each other, the template won't be approved by WhatsApp without a sample variable. For additional information about variables, see [Using Variables with Content Templates](/docs/content/using-variables-with-content-api).
* When creating your template, ensure that the phone number in the actions array below is valid. Otherwise, the template will fail to send.
* WhatsApp footers translate to subtitles in `twilio/cards`.
* Template approval is required if multiple buttons are present.

## Message preview

![WhatsApp card with Elite status message, coupon code offer, and options to order online or call.](https://docs-resources.prod.twilio.com/58308ffad09278e4ff3a10081e0e3d3542a2c5eec4aabc377edeb569104c2937.png)

## Data parameters

| Parameter     | Type      | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | --------- | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`        | string    | Yes      | Yes                                                                | The body of the card. <br />Maximum length: 1,024 characters                                                                                                                                                                                                                                                                                                                   |
| `footer`      | string    | No       | No                                                                 | The footer of the card. <br />Maximum length: 60 characters                                                                                                                                                                                                                                                                                                                    |
| `media`       | string\[] | No       | No                                                                 | The URL of the media to send with the message. `media` can't be present if `header_text` is present. <br />To learn more about supported and accepted media types, see [Accepted Content Types for Media](/docs/messaging/guides/accepted-mime-types) for MMS and [Guidance on WhatsApp Media Messages](/docs/whatsapp/guidance-whatsapp-media-messages#supported-mime-types). |
| `header_text` | string    | No       | Yes                                                                | Bolded header text of the card. `header_text` can't be present if `media` is present.<br />Maximum length: 60 characters                                                                                                                                                                                                                                                       |
| `actions`     | array     | Yes      | Yes                                                                | Cards can contain buttons, which are defined using an actions array.                                                                                                                                                                                                                                                                                                           |

### `actions` properties

To learn more about common components, see [common components](/docs/content/content-types-overview#common-components).

> \[!NOTE]
>
> Limitations:
>
> * `VOICE_CALL` is currently a private beta in select regions.
> * Only one of the two call options can be on a template:
>   * `PHONE`
>   * `VOICE_CALL`
> * Up to two URL buttons are allowed.
> * Up to 10 quick reply buttons are allowed. If the content template is being sent in session over WhatsApp without approval, only 3 buttons are allowed.

| Property      | Parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `QUICK_REPLY` | <ul><li>**`type`**: `QUICK_REPLY`</li><li>**`title`**: Button text of quick reply button. Appears in `Body` and `ButtonText` fields in inbound when selected by end user. Variables are supported in session. <br />Maximum length: 25 characters</li><li>**`id`**: Not visible to end user. Appears in `ButtonPayload` fields in inbound when selected by end user. Variables are supported.</li></ul>                                                                                       |
| `URL`         | <ul><li>**`type`**: `URL`</li><li>**`title`**: Button text of URL redirect button. Variables aren't supported. <br />Maximum length: 20 characters</li><li>**`url`**: URL opened when the end user clicks the button. Variables are supported at the end of the URL string.</li></ul>                                                                                                                                                                                                         |
| `PHONE`       | <ul><li>**`type`**: `PHONE`</li><li>**`title`**: Button text of URL redirect button. Variables aren't supported. <br />Maximum length: 20 characters</li><li>**`phone`**: [E.164](/docs/glossary/what-e164) formatted phone number to call when the recipient taps the button. Variables aren't supported.</li></ul>                                                                                                                                                                          |
| `VOICE_CALL`  | <ul><li>**`type`**: `VOICE_CALL`</li><li>**`title`**: Button text of VoIP call button. Variables aren't supported. <br />Maximum length: 20 characters</li><li>**`ttl_minutes`**: Optional parameter. The lifespan of the button in minutes. After this time expires, the button can't be used to start a call to the business. Variables are supported. The default value is 10,080 minutes (7 days), and the expected value is an integer between 1 and 43,200 minutes (30 days).</li></ul> |
| `COPY_CODE`   | <ul><li>**`type`**: `COPY_CODE`</li><li>**`title`**: WhatsApp now overrides this value with `Copy Code` and translates automatically to the template's language. Variables and customization are not supported. <br />Maximum length: 20 characters</li><li>**`code`**: Coupon code that is copied to the end user's clipboard after clicking the button. Variables are supported.</li></ul>                                                                                                  |

## Code examples and responses

Create a WhatsApp card template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the whatsapp/card 
    var whatsappCard = new WhatsappCard.Builder();
    whatsappCard.WithBody("Congratulations, you have reached Elite status! Add code {{1}} for 10% off.");
    whatsappCard.WithHeaderText("This is a {{1}} card");
    whatsappCard.WithFooter("To unsubscribe, reply Stop");
    var cardAction1 = new CardAction.Builder()
        .WithType(CardActionType.Url)
        .WithUrl("https://www.twilio.com")
        .WithTitle("Order Online")
        .Build();
    var cardAction2 = new CardAction.Builder()
        .WithType(CardActionType.PhoneNumber)
        .WithPhone("+15551234567")
        .WithTitle("Call Us")
        .Build();
    whatsappCard.WithActions(new List<CardAction>() { cardAction1, cardAction2 });

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithWhatsappCard(whatsappCard.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("owl_coupon_code");
    contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "coupon_code"} });
    
    // create the twilio template
    var contentTemplate = await CreateAsync(contentCreateRequest.Build());

    Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

```java
package Examples;

import com.twilio.rest.content.v1.Content;

import java.util.Arrays;
import java.util.Map;

public class WhatsAppCard {
    public static String CreateTemplate() {
        var waCard = new Content.WhatsappCard();
        waCard.setBody("Congratulations, you have reached Elite status! Add code {{1}} for 10% off.");
        waCard.setHeaderText("This is a {{1}} card");
        waCard.setFooter("To unsubscribe, reply Stop");

        var action1 = new Content.CardAction();
        action1.setType(Content.CardActionType.URL);
        action1.setUrl("https://www.twilio.com");
        action1.setTitle("Order Online");

        var action2 = new Content.CardAction();
        action1.setType(Content.CardActionType.PHONE_NUMBER);
        action1.setPhone("+15551234567");
        action1.setTitle("Call Us");

        waCard.setActions(Arrays.asList(action1));

        var types = new Content.Types();
        types.setWhatsappCard(waCard);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("owl_coupon_code");
        createRequest.setVariables(Map.of(
        "1", "coupon_code"
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
    "friendly_name": "owl_coupon_code",
    "language": "en",
    "variables": {
        "1": "coupon_code"
    },
    "types": {
        "whatsapp/card": {
                    "body": "Congratulations, you have reached Elite status! Add code {{1}} for 10% off.",
                    "header_text": "This is a {{1}} card",
                    "footer": "To unsubscribe, reply Stop",
                    "actions": [
                        {
                            "url": "https://owlair.example.com/",
                            "title": "Order Online",
                            "type": "URL"
                        },
                        {
                            "phone": "+15555554567",
                            "title": "Call Us",
                            "type": "PHONE_NUMBER"
                        }
                    ]
                }
    }
}'
```

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2023-08-03T14:54:47Z",
    "date_updated": "2023-08-03T14:54:47Z",
    "friendly_name": "owl_coupon_code",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "whatsapp/card": {
            "actions": [
                {
                    "title": "Order Online",
                    "type": "URL",
                    "url": "https://owlair.example.com/"
                },
                {
                    "phone": "+1555554567",
                    "title": "Call Us",
                    "type": "PHONE_NUMBER"
                }
            ],
            "body": "Congratulations, you have reached Elite status! Add code {{1}} for 10% off.",
            "footer": "To unsubscribe, reply Stop",
            "header_text": "This is a {{1}} card",
            "media": null
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "coupon_code"
    }
}
```
