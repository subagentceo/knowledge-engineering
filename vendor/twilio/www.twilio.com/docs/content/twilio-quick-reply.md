# twilio/quick-reply

The `twilio/quick-reply` content type lets recipients tap, rather than type, to respond to a message. You can include up to ten quick-reply buttons. When you send an in-session WhatsApp message that does **not** require template approval, only three buttons are allowed.

> \[!WARNING]
>
> `twilio/quick-reply` content templates can be sent over WhatsApp for out-of-session messages that include variables. If the template body starts or ends with a variable, or if two variables appear adjacent to each other, WhatsApp will reject the template. A sample value for each variable is required. For details, see [Using Variables with Content Templates](/docs/content/using-variables-with-content-api).

## Supported channels

* WhatsApp
* Facebook Messenger

## Message preview

| ![Chat options: Check Flight Status, Check Gate Number, Speak with an Agent.](https://docs-resources.prod.twilio.com/3e2a5c43d23f991c60d5b8bb868f114d1434406c8347038e72d30a360556288a.png) | ![Chat from Owl Air Support offering options to check flight status, gate number, or see all options.](https://docs-resources.prod.twilio.com/638b380283b8d489512fb3a33d0174f17f17c04aa00dbc5f6c0cad3154ff691d.png) | ![Menu with options for flight status, gate number, agent contact, and weather at DEP and ARR.](https://docs-resources.prod.twilio.com/b2fddf1a4ea91b70a59e1c1843e40f9ee2ef6f5b2a9171e9d5597fbd198c15d8.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

## Data parameters

| Parameter | Type   | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                             |
| --------- | ------ | -------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `body`    | string | Yes      | Yes                                                                | Text that appears above the quick-reply buttons.<br />Maximum length: 1,024 characters. |
| `actions` | array  | Yes      | Yes                                                                | An array that contains between 1 and 10 quick-reply buttons.                            |

### `actions` properties

For an overview of shared properties, see [Common components](/docs/content/content-types-overview#common-components).

| Property      | Supported channels                                    | Parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `QUICK_REPLY` | <ul><li>WhatsApp</li><li>Facebook Messenger</li></ul> | <ul><li>**`title`**: Text that appears on the button. The same text is returned in the inbound `Body` and `ButtonText` fields when the end user selects the button. Variables are supported for in-session messages.<br />Maximum length: 20 characters.</li><li>**`id`**: A developer-defined payload that is **not** visible to the end user. The value is returned in the inbound `ButtonPayload` field when the end user selects the button. Variables are supported.<br />Maximum length: 200 characters.</li></ul> |

## Code examples and responses

Create a quick-reply template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the twilio/text type for less rich channels (e.g. SMS)
    var twilioText = new TwilioText.Builder();
    twilioText.WithBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

    // define the twilio/quick-reply type for more rich channels
    var twilioQuickReply = new TwilioQuickReply.Builder();
    twilioQuickReply.WithBody("Owl Air Support");
    var quickreply1 = new QuickReplyAction.Builder()
        .WithTitle("Contact Us")
        .WithId("flightid1")
        .Build();
    var quickreply2 = new QuickReplyAction.Builder()
        .WithTitle("Check gate number")
        .WithId("gateid1")
        .Build();
    var quickreply3 = new QuickReplyAction.Builder()
        .WithTitle("Speak with an agent")
        .WithId("agentid1")
        .Build();
    twilioQuickReply.WithActions(new List<QuickReplyAction>() { quickreply1, quickreply2, quickreply3 });

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithTwilioText(twilioText.Build());
    types.WithTwilioQuickReply(twilioQuickReply.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("owl_air_qr");
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

public class TwilioQuickReply {
    public static String CreateTemplate() {
        var twilioText = new Content.TwilioText();
        twilioText.setBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

        var twilioQuickReply = new Content.TwilioQuickReply();
        twilioQuickReply.setBody("Owl Air Support");

        var action1 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Contact Us");
        action1.setId("contact_us");

        var action2 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Check gate number");
        action1.setId("gate_id_1");

        var action3 = new Content.QuickReplyAction();
        action1.setType(Content.QuickReplyActionType.QUICK_REPLY);
        action1.setTitle("Speak with an agent");
        action1.setId("agent_id_1");

        twilioQuickReply.setActions(Arrays.asList(action1, action2, action3));

        var types = new Content.Types();
        types.setTwilioText(twilioText);
        types.setTwilioQuickReply(twilioQuickReply);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("owl_air_qr");
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
    "friendly_name": "owl_air_qr",
    "language": "en",
    "variables": {"1":"Owl Air Customer"},
    "types": {
        "twilio/quick-reply": {
                    "body": "Hi, {{1}} 👋 \nThanks for contacting Owl Air Support. How can I help?",
                    "actions": [
                        {
                            "title": "Check flight status",
                            "id": "flightid1"
                        },
                        {
                            "title": "Check gate number",
                            "id": "gateid1"
                        },
                        {
                            "title": "Speak with an agent",
                            "id": "agentid1"
                        }
                    ]
                },
        "twilio/text": {
            "body": "Hi, {{1}}. \n Thanks for contacting Owl Air Support. How can I help?."
        }
    }
}'
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-29T10:43:20Z",
  "date_updated": "2022-08-29T10:43:20Z",
  "friendly_name": "owl_air_qr",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/text": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?."
    },
    "twilio/quick-reply": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?",
      "actions": [
        {
          "id": "flightid1",
          "title": "Check flight status"
        },
        {
          "id": "gateid1",
          "title": "Check gate number"
        },
        {
          "id": "agentid1",
          "title": "Speak with an agent"
        }
      ]
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "Owl Air Customer"
  }
}
```
