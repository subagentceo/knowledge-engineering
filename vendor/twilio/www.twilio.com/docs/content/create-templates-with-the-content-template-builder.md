# Create templates with the Content Template Builder in Console

The Content Template Builder in Console guides you through creating and managing templates for channels such as WhatsApp, RCS, Facebook Messenger, MMS, and SMS. Content Templates let you deliver consistent messages to your customers on their preferred channels. The builder uses universal templates that support shared capabilities across channels.

## Start creating templates

## Twilio Console

To start creating templates in the [Twilio Console](1console.twilio.com), follow these steps:

1. Sign in to the [Twilio Console](1console.twilio.com).
2. Navigate to **Products & Services > Templates**.
3. Click **Create new template** to start a new template.
4. Give your template a name, select a template language, and choose the content type that best fits your use case.
5. Follow the on-screen instructions to fill out **General info** and **Details**.

## Legacy Twilio Console

If you're using the legacy Twilio Console, follow these steps to access the Content Template Builder:

1. Sign in to the [legacy Twilio Console](https://www.twilio.com/console).
2. Navigate to **Messaging > Content Template Builder**. If **Messaging** doesn't appear in the **Develop** sidebar, select **Explore Products**, and pin **Messaging**.
3. Select **Messaging**, and then choose **Content Template Builder** from the dropdown list.
4. Select **Create new** to start a template.

#### Create the template

1. **Template name**: Enter a name for the template. This value is also submitted to WhatsApp for approval.
2. **Template language**: Select the language of the template.
3. **Select content type**: Choose the type of content the template will contain.

> \[!NOTE]
>
> Not all template types that are available in the Content API are available in the Content Template Builder. If you need to use `twilio/card`, `twilio/list`, or `twilio/location` templates, use the Content API.

#### Preview sample content template and supported channels

Supported channels appear on the template listing page and template detail pages.

#### Fill out the template fields

Each content type has its own fields. For more information, see [Content Types Overview](/docs/content/content-types-overview). The following example uses a `twilio/call-to-action` template.

1. **Body**: The message content.
2. **Add buttons**: Action buttons that are attached to the template. A `twilio/call-to-action` template can have up to two buttons.

* **Type of action**: The button type.
* **Button text**: Text displayed on the button.
* **URL**: A dynamic or static URL. Only one URL button is allowed.
* **Phone**: A phone number in [E.164 format](/docs/glossary/what-e164) that's called when the user selects the button. Only one phone number button is allowed.

### Add variables

Add variables to a template by selecting **+ Add Variable** or by typing the variable in `{{}}` notation. To delete a variable, press the **Delete** or **Backspace** key on your keyboard.

Variable samples are required in templates that contain media and in templates that require WhatsApp approval. Twilio recommends providing samples for all variables so that messages have fallback text if a variable is undefined at send time. Samples can be set when you select **Save** or **Save and submit for WhatsApp approval**. The requirement for samples depends on the template type and whether you submit the template for WhatsApp approval.

You can include up to 100 variables in a template. Templates submitted to WhatsApp must follow a non-variable-to-variable word ratio of at least `(2x + 1)` non-variable words for every x variables.

When you send templates out of session on WhatsApp, the following rules apply. For additional guidance on avoiding template rejections, see [Create WhatsApp message templates and submit them for approval](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates#creating-message-templates-and-submitting-them-for-approval).

* **Variables must be numbered sequentially without skipping integers**.
  * **Not allowed**: `"body": "Hi {{1}}, Your flight will depart from gate {{3}}. Please reply STOP to unsubscribe."`
  * **Allowed**: `"body": "Hi {{1}}, Your flight will depart from gate {{2}}. Please reply STOP to unsubscribe."`
* **Variables shouldn't be adjacent**.
  * **Not recommended**: `"body": "Hi {{1}} {{2}}, your flight will depart from gate {{3}}. Please reply STOP to unsubscribe."`
  * **Recommended**: `"body": "Hi {{1}} and {{2}}, your flight will depart from gate {{3}}. Please reply STOP to unsubscribe."`
* **Variables shouldn't appear at the start or end of the body string**.
  * **Not recommended**: `"body": "Hi {{1}}, your flight will depart from gate {{2}}."`
  * **Recommended**: `"body": "Hi {{1}}, your flight will depart from gate {{2}}. Please reply STOP to unsubscribe."`
* **A template can't have too many variables relative to its length**.
  * **Not allowed**: `"body": "Hi {{1}}, gate {{2}}. Thank you."`
  * **Allowed**: `"body": "Hi {{1}}, your flight will depart from gate {{2}}. Thank you."`

> \[!NOTE]
>
> Samples are required for any of the validations listed. They're also required in media templates and CTA URL links. If a variable is present in a media or CTA URL link, all text variables require samples, even if the text variable does not trigger the preceding validations.

### Save the template and submit it to WhatsApp

* **Save**: Creates the template and returns you to the home screen. The builder assigns the template a SID that starts with `HX`, which you can reference in send requests.
* **Save and submit for WhatsApp approval**: Creates the template, assigns an `HX` SID, and submits the template for WhatsApp review. Meta typically processes approvals within an hour, but some approvals can take up to one business day. When you choose this option, select a template category for review.
* **Cancel**: Discards the template and returns you to the home screen.
