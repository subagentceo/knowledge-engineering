# twilio/card

The `twilio/card` content type is a structured template that lets you send a set of related items in a single message. Each card must include either a title or a body, **and at least one additional field**.

In the `media` field of the template, provide the URL of a publicly hosted file.

If you use media with a variable, include a sample path to a publicly hosted image URL in the `variables` object. The final URL must include the file type and must resolve to a publicly accessible file.

For example:

```json
"media": ["https://www.example.com/{{1}}"],
"variables": { "1": "images/library-logo-resource2x.width-1000.png" }
```

If you use a call-to-action URL button, the URL must resolve to a publicly accessible website. When the URL contains a variable, provide a valid sample path in the `variables` object so the combined URL resolves correctly.

For example:

```json
"url": ["https://www.twilio.com/{{1}}"],
"variables": { "1": "docs" }
```

## Supported channels

* RCS
* WhatsApp
* Facebook Messenger

## Channel-specific information

### RCS

#### Parameter mapping

To determine how RCS elements correspond to Twilio data parameters, consult the following table.

| Parameter              | RCS element                                 |
| ---------------------- | ------------------------------------------- |
| `title`                | Title                                       |
| `body`                 | Description (Rich Card) or Text (Chip List) |
| `subtitle`             | *Not available in RCS* (appended to Body)   |
| `media`                | Media                                       |
| `actions.QUICK_REPLY`  | SuggestedReply                              |
| `actions.URL`          | SuggestedAction.OpenUrlAction               |
| `actions.PHONE_NUMBER` | SuggestedAction.DialAction                  |

#### Webviews

Webviews can work with the Google Wallet API to deliver boarding passes. See the Google Wallet documentation for [boarding passes](https://developers.google.com/wallet/tickets/boarding-passes).

#### Chip list versus rich card

Buttons in RCS can appear within a chip list or a rich card. Both are formats of rich content in RCS. On Android, chip lists appear as a horizontally scrolling list of buttons. Buttons in a rich card appear in a vertically stacked list. On iOS, the experience buttons always appear in a dropdown list of buttons. Chip lists can be attached to a rich card.

Use parameter `chip_list` to choose whether a button appears in a chip list versus a rich card. If not specified Twilio follows the following logic.

**Default behavior when media is present**

* **More than four buttons**: The first four buttons appear in the rich card. Remaining buttons appear in a chip list.
* **Four or fewer buttons**: RCS uses a rich card.

**Default behavior when media is not present**

* RCS uses a chip list.

Pricing depends on the presence of media and buttons. In the United States, pricing also depends on button type and the total length of text in the message. Rendering behavior depends on whether media is present and the number of buttons.

##### Differences in RCS resolution

| Type of message | Pricing (USA)           | Allowed Twilio data parameters                                             | Pricing length limits                             |
| --------------- | ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| Chip list       | Rich                    | `body`; Quick reply, URL CTA buttons except Webviews, and Dial CTA buttons | Billed per 160-character UTF-8 segment            |
| Rich card       | Rich Media              | `title`, `media`, and `body`; all button types                             | See limits in [Data parameters](#data-parameters) |
| Chip list       | Single Message (global) | `body`; all button types                                                   | See limits in [Data parameters](#data-parameters) |
| Rich card       | Single Message (global) | `title`, `media`, `body`; all button types                                 | See limits in [Data parameters](#data-parameters) |

### WhatsApp

* By default, WhatsApp URL buttons open the link inside an in-app webview. For Marketing templates, you can configure the button to open the device's default browser instead. To do so, clear the **Link tracking** checkbox in the Meta template UI.
* When you send a card in-session without prior approval, WhatsApp allows a maximum of three buttons.
* A card must be approved as a template before it can be sent outside the 24-hour conversation window. If the card uses variables or media, submit a valid sample with the template. Static media URLs must resolve to publicly hosted files. Variable media URLs must include a valid media URL suffix in the variable declaration.
* A template approved with one media type (Image, Video, or Document) can send only that media type. For example, a template approved with an image header cannot later send a video.
* If the body starts or ends with a variable, or contains adjacent variables, WhatsApp requires a sample variable. See [Using variables with Content API](/docs/content/using-variables-with-content-api).
* Update the phone number in the sample actions array to a valid [E.164](/docs/glossary/what-e164)-formatted number before sending the template.
* WhatsApp footers map to subtitles in `twilio/card`.
* Template approval is required when a card contains multiple buttons.
* Button titles are limited to 20 characters.
* For unapproved cards used in a session, the following rules apply:
  * Only the buttons types `QUICK_REPLY`, `URL`, and `VOICE_CALL` are supported. Templates that include a `PHONE_NUMBER` button type are not supported.
  * If you send a Content resource that contains buttons with different action types, the request fails. WhatsApp requires every button in a template to use the same action type. For example, a template that includes both a `voice\_call` button and a`url` button fails validation.
  * There can only be one URL button in the Content. For example, a Content with two URL buttons will fail.

## Message preview

| ![Twilio card template with promotional message and action buttons for ordering and calling.](https://docs-resources.prod.twilio.com/c4b744a2e76030ed5bfab7f78d65ceebe28c26412d70eb57e5ca76c33ad5acfc.png) | ![Twilio Elite status message with 10% off code and order options.](https://docs-resources.prod.twilio.com/1eb38d3d7d292498bd74941aeab3c165b42f9aadf88ee8f21ec08cee4b0ce625.png) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Data parameters

| Parameter                 | Type      | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                                                      |
| ------------------------- | --------- | -------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                   | string    | No       | Yes                                                                | Title of the card.<br />Maximum length: 200 characters for RCS; 1,024 characters for WhatsApp.<br />Required if `body` is not specified.                                                                                         |
| `body`                    | string    | No       | Yes                                                                | RCS only. Body text of the card.<br />Maximum length: 1,600 characters.<br />Required if `title` is not specified. <br />RCS only. For WhatsApp, include all text in `title` instead.                                            |
| `subtitle`                | string    | No       | No                                                                 | Subtitle of the card.<br />Maximum length: 60 characters.<br />If specified for WhatsApp and the template is used in RCS, the subtitle is appended to the body.                                                                  |
| `media`                   | string\[] | No       | Yes                                                                | Public URL of the media to send.<br />See [accepted content types for media](/docs/messaging/guides/accepted-mime-types) (MMS) and [WhatsApp media types](/docs/whatsapp/guidance-whatsapp-media-messages#supported-mime-types). |
| `orientation`             | string    | No       | No                                                                 | RCS only. Will be ignored for other channels. Determines card layout. ENUM Options: `VERTICAL`, `HORIZONTAL`. Defaults to `VERTICAL`.                                                                                            |
| `thumbnailImageAlignment` | string    | No       | No                                                                 | RCS only. Will be ignored for other channels. Determines image position in a `HORIZONTAL` card. ENUM Options: `LEFT`, `RIGHT`. Defaults to `LEFT`.                                                                               |
| `height`                  | string    | No       | No                                                                 | RCS only. Will be ignored for other channels. Determines card proportions for Android devices. ENUM Options: `SHORT`, `MEDIUM`, `TALL`. Defaults to `TALL`.                                                                      |
| `actions`                 | array     | No       | Yes                                                                | Defines buttons that appear on the card.                                                                                                                                                                                         |

### `actions` properties

For an overview of shared button properties, see [Common components](/docs/content/content-types-overview#common-components).

> \[!NOTE]
>
> <strong>WhatsApp limitations</strong>
>
> * Only one of the two call options can appear on a template: `PHONE_NUMBER` or `VOICE_CALL`.
> * Up to 2 URL buttons are allowed.
> * Up to 10 quick-reply buttons are allowed.
> * A maximum of 10 buttons is allowed per card.
>
> <strong>RCS limitations</strong>
>
> * Up to 11 buttons can appear in a chip list.
> * Up to 4 buttons can appear in the rich card itself.

| Property       | Supported channels                | Parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `QUICK_REPLY`  | RCS, WhatsApp, Facebook Messenger | <ul><li>**`type`**: `QUICK_REPLY`</li><li>**`title`**: Text shown on the button. Appears in the `ButtonText` field in inbound messages. Variables are supported in-session. Maximum length: 20 characters.</li><li>**`id`**: Identifier returned in the `ButtonPayload` field of inbound messages. Not visible to the user. Variables are supported.</li><li>**`chip_list`** (RCS only): Optional. Controls whether the button appears in a chip\_list or rich card. Valid values: `true`, `false`. If not specified Twilio will use chip\_list when available.</li></ul>                                                                                                                                                                                                                                                                                                       |
| `URL`          | RCS, WhatsApp, Facebook Messenger | <ul><li>**`type`**: `URL`</li><li>**`title`**: Text shown on the button. Variables are supported in RCS and for WhatsApp in-session. Maximum length: 25 characters.</li><li>**`id`**: (RCS only) Identifier returned in the `ButtonPayload` field of inbound messages. Variables are supported.</li><li>**`url`**: URL opened when the user taps the button. Variables are supported at the end of the URL string for WhatsApp outside a 24-hour window and for RCS in-session.</li><li>**`webview_size`** (RCS only): Controls whether the URL opens in a webview or the device browser. Valid values: `NONE`, `HALF`, `TALL`, `FULL`. Default is `NONE`.</li><li>**`chip_list`** (RCS only): Optional. Controls whether the button appears in a chip\_list or rich card. Valid values: `true`, `false`. If not specified Twilio will use chip\_list when available.</li></ul> |
| `PHONE_NUMBER` | RCS, WhatsApp, Facebook Messenger | <ul><li>**`type`**: `PHONE_NUMBER`</li><li>**`title`**: Text shown on the button. Variables are not supported. Maximum length: 25 characters.</li><li>**`phone`**: E.164-formatted number to call when the user taps the button.</li><li>**`chip_list`** (RCS only): Optional. Controls whether the button appears in a chip\_list or rich card. Valid values: `true`, `false`. If not specified Twilio will use chip\_list when available.</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `VOICE_CALL`   | WhatsApp                          | <ul><li>**`type`**: `VOICE_CALL`</li><li>**`title`**: Text shown on the VoIP call button. Variables are not supported. Maximum length: 25 characters.</li><li>**`ttl_minutes`**: Optional. Lifespan of the button in minutes (default: 10,080 minutes = 7 days). Accepts an integer from 1 to 43,200 (30 days). Variables are supported.</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `COPY_CODE`    | WhatsApp                          | <ul><li>**`type`**: `COPY_CODE`</li><li>**`title`**: WhatsApp now overrides this value with `Copy Code` and translates automatically to the template's language. Variables and customization are not supported. </li><li>**`code`**: Coupon code copied to the user's clipboard when the button is tapped. Variables are supported.</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Code example

Create a card template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the twilio/text type for less rich channels (e.g. SMS)
    var twilioText = new TwilioText.Builder();
    twilioText.WithBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

    // define the twilio/card type for more rich channels
    var twilioCard = new TwilioCard.Builder();
    twilioCard.WithTitle("Owl Air Support");
    var cardAction1 = new CardAction.Builder()
        .WithType(CardActionType.Url)
        .WithUrl("https://www.twilio.com")
        .WithTitle("Contact Us")
        .Build();
    twilioCard.WithActions(new List<CardAction>() { cardAction1 });

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithTwilioText(twilioText.Build());
    types.WithTwilioCard(twilioCard.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("owl_air_card");
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

public class TwilioCard {
    public static String CreateTemplate() {
        var twilioText = new Content.TwilioText();
        twilioText.setBody("Hi {{1}}, thanks for contacting Owl Air Support");

        var twilioCard = new Content.TwilioCard();
        twilioCard.setTitle("Owl Air Support");

        var action1 = new Content.CardAction();
        action1.setType(Content.CardActionType.URL);
        action1.setUrl("https://www.owlair.com");
        action1.setTitle("Contact Us");

        twilioCard.setActions(Arrays.asList(action1));

        var types = new Content.Types();
        types.setTwilioCard(twilioCard);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("owl_air_card");
        createRequest.setVariables(Map.of(
        "1", "John"
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
    "friendly_name": "owl_air_card",
    "language": "en",
    "variables": {
        "1": "coupon_code"
    },
    "types": {
        "twilio/card": {
                    "title": "Congratulations, you'\''ve reached Elite status! Add code {{1}} for 10% off.",
                    "subtitle": "To unsubscribe, reply Stop",
                    "actions": [
                        {
                            "url": "https://owlair.com/",
                            "title": "Order Online",
                            "type": "URL"
                        },
                        {
                            "phone": "+15551234567",
                            "title": "Call Us",
                            "type": "PHONE_NUMBER"
                        }
                    ]
                },
        "twilio/text": {
            "body": "Congratulations, your account reached Elite status, you are now eligible for 10% off any flight! Just add coupon code {{1}} to check out."
        }
    }
}'
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-30T09:19:17Z",
  "date_updated": "2022-08-30T09:19:17Z",
  "friendly_name": "owl_air_card",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/card": {
      "actions": [
        {
          "title": "Order Online",
          "type": "URL",
          "url": "https://www.owlair.com/"
        },
        {
          "phone_number": "+15551234567",
          "title": "Call Us",
          "type": "PHONE_NUMBER"
        }
      ],
      "body": null,
      "media": null,
      "subtitle": "To unsubscribe, reply Stop",
      "title": "Congratulations, you have reached Elite status! Add code {{1}} for 10% off."
    },
    "twilio/text": {
      "body": "Congratulations, your account reached Elite status, you are now eligible for 10% off any flight! Just add coupon code {{1}} to check out."
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "coupon_code"
  }
}
```

## Receiving webhooks

### Inbound events

| Component       | Description                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ButtonPayload` | ID specified in the button to identify the button click. If no ID is specified, the button text appears in this field. |
| `ButtonType`    | Indicates whether the pressed button was a quick-reply or call-to-action button.                                       |
| `ButtonText`    | Text of the button that the user clicked.                                                                              |
