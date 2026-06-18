# Using pre-engagement form data and context in Webchat 3.x.x

When using chat as a communications channel for your contact center, you can use a pre-engagement form to gather relevant user information (such as name and email) before the start of a chat. Alternatively, you can gather relevant ***context*** from the data you already have, such as a user's login name or [HTTP referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer). You can use pre-engagement form data and context for routing the task to the right agent or displaying relevant user information to the agent.

The default pre-engagement form collects the user's name, email address, and query, which are considered to be personally identifiable information (PII). You can configure the pre-engagement form to collect additional information.

## Before you begin

To initiate a chat with a pre-engagement form, a user's `friendlyName` and `query` must be set. The `friendlyName` attribute is set to "Anonymous" in the `context` object of your default Webchat configuration. The `friendlyName` and `query` values are displayed to the agent in the Flex UI. When set in both the Webchat context object and a pre-engagement form, the pre-engagement form value overrides the context object value.

## Configure a pre-engagement form and context

This section explains how to customize your pre-engagement form to collect the most important data from your customers.
The pre-engagement form is enabled by default. If you want to turn off the pre-engagement form, set `disablePreEngagementForm: true` in your Webchat configuration.

The following example form shows many types of input fields, including required and optional input fields, a required checkbox for customers to acknowledge terms and conditions, and a submit button with the label "Let's chat." While this example shows many types of fields that you might want to use, we recommend limiting your pre-engagement form to 3-5 fields to avoid overwhelming your customers. However, there is no limit on the number of fields that you can include.

## Example pre-engagement form and context

```js
const appConfig = {
// Webchat Config    
deploymentKey: "{your_key}", 
    appStatus: "open",
    theme: {
        isLight: true
    },
    context: { 
locationOrigin: window.location.origin,
someContextProp: "ContextProp1",
},
    disablePreEngagementForm: false,
    preEngagementConfig: {
        title: "Pre-Chat Form",
        description: "Complete this form to start the chat",
        submitLabel: "Let's chat",
        footerLabel: "Powered by Twilio",
        fields: [
{
   label: "Name",
   type: "InputItem",
   attributes: {
       name: "friendlyName",
       type: "text",
       placeholder: "Enter your name",
       required: true,
       pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
       readOnly: false,
       value: "Bob"
   }
},
{
   label: "Email address",
   type: "InputItem",
   attributes: {
       name: "email",
       type: "email",
       placeholder: "Enter your email address",
       required: true,
       readOnly: false,
       value: "bob@example.com",
       pattern: "{Your_email_pattern}"
   }
},
{
   label: "Date of birth",
   type: "InputItem",
   attributes: {
       name: "dob",
       type: "date",
       placeholder: "Enter your date of birth",
       required: false,
       readOnly: false,
       pattern: "{Your_date_of_birth_pattern}"
   }
},
{
   label: "Phone number",
   type: "InputItem",
   attributes: {
       name: "phone",
       type: "tel",
       placeholder: "Enter your phone number",
       required: false,
       readOnly: false,
       value: "0123456789",
       pattern: "{Your_phone_number_pattern}"
   }
},
{
   label: "Ask a question",
   type: "TextareaItem",
   attributes: {
       name: "query",
       type: "text",
       placeholder: "Type your question here",
       required: true
   }
},
{
   label: "Question category",
   type: "SelectItem",
   attributes: {
       name: "Question category dropdown",
       required: false,
       readOnly: false
   },
   options: [
       {
           value: "value1",
           label: "label1",
           selected: false
       },
       {
           value: "value2",
           label: "label2",
           selected: true
       }
   ]
},
{
   label: "Agree to our terms and conditions",
   type: "CheckboxItem",
   attributes: {
       name: "termsCheckbox",
       required: true,
       refLink:
           "<span>Review our  <a href='{Your_link_here}' target='_blank'>terms and conditions</a></span>"
   }
}
        ]
    }
}
```

![Pre-chat form with fields for name, email, and question, plus T\&Cs checkbox and submit button.](https://docs-resources.prod.twilio.com/8b4ecc82d3baa730c25fc9c7a39b680c055eceec102b8ac3a7430ec1926d4855.png)

## Form attributes

The following attributes are available for your pre-engagement form:

| Form attribute | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `title`        | Name or greeting that appears as the heading at the top of the form. |
| `description`  | Introductory text for the form.                                      |
| `submitLabel`  | Label that appears on the button to submit the form.                 |
| `footerLabel`  | Optional text that appears at the bottom of your form.               |

## Field attributes

| Field setting | Description                                                                                                                                                                                              | Applies to these field types |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `label`       | Name of the field.                                                                                                                                                                                       | All field types              |
| `type`        | The following field types are supported: <ul><li> `InputItem` </li><li>`SelectItem` </li><li> `TextareaItem` </li><li>`CheckboxItem` </li></ul>If you enter any other field type, it won't be displayed. | All field types              |
| `options`     | Add an array with `value`, `label`, and `selected` elements for each option that users can select. To set a default value, set `selected: true` for that option.                                         | `SelectItem`                 |

## Input attributes and validations

For the input area of each field, you can set the following attributes and validations:

| Input attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Applies to these field types |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `name`          | Name of the input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | All field types              |
| `type`          | Format of the input that the user can enter and method of entry: <ul><li> `text`: A single-line text input. </li><li>`email`: Looks like a text input field, but has validation parameters and relevant keyboard in browsers and devices with dynamic keyboards. </li><li> `number`: Accepts numbers only. Users can change the value by entering a number, using keyboard arrow keys and increment buttons. </li><li> `tel`: An input for entering a telephone number. It displays a telephone keypad in some devices with dynamic keypads. </li><li>`date`: An input for entering a date. </li><li> `time`: An input for entering a time. </li><li> `password`: An input whose value is obscured. This input alerts a user if the site isn't secure. </li></ul> | `InputItem`, `TextareaItem`  |
| `placeholder`   | Example text that appears in the field and disappears when the user begins typing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `InputItem`, `TextareaItem`  |
| `required`      | Validates whether a form field is required or optional. Can be set to `true` or `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | All field types              |
| `pattern`       | Checks the validity of the input item against the pattern you specify. Enter the expected pattern as a regular expression (regex).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `InputItem`                  |
| `readOnly`      | Determines whether the field can be edited. Set to `false` in most cases. <br /><br />When set to `true`, the field can't be edited but can receive focus to allow users to highlight the text in the field. You may want to set a default value with the value attribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | All field types              |
| `disabled`      | Similar to `readOnly`, except that this attribute can be dependent on the value entered in another input field. For example, if your form asks whether the chat is about an existing order, you could enable an order number field only if the customer has answered yes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | All field types              |
| `value`         | Default field value. This is typically used with `readOnly` fields.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | All field types              |
| `refLink`       | Descriptive text that optionally includes HTML formatting, such as links. A common use case is to include a checkbox to acknowledge terms and conditions, with a link to your terms and conditions webpage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `CheckboxItem`               |

## Gathering and sending context

You can use context data to pass additional information, beyond pre-engagement form details, to the Flex platform when a webchat is initiated. This information enables you to provide a more personalized and informed interaction between your customers and your agents.

To get started, configure the context object in your Webchat configuration. For an example, see the context section in the [example pre-engagement form and context](#example-pre-engagement-form-and-context) section above.

## Accessing and using pre-engagement data and context

When enabled, pre-engagement form and context data are both automatically saved as [Conversations attributes](/docs/conversations-classic/api/conversation-resource#conversation-properties) (for example, `conversation.ChannelAttributes.pre_engagement_data`) when a chat is initiated.
Your form and context data can then be accessed in the [Studio chat flow](https://www.twilio.com/console/studio/dashboard). See the Studio documentation to learn more about [how Studio uses variables](/docs/studio/user-guide#working-with-variables).

### Pre-engagement and context data in Studio

An incoming chat conversation triggers the Webchat flow for your Flex instance, which you can customize within Twilio Console.

In the Studio chat flow, you can:

* Trigger a bot conversation based on gathered pre-engagement data
* Use pre-engagement data for decisions in the flow, like when to send the conversation to an agent
* Add pre-engagement data to task attributes for routing decision or information display to an agent in Flex

Studio uses Liquid syntax to access the pre-engagement data in a Studio widget. For example, here's how you would access the `question` attribute from your pre-engagement form data:

![Send to Flex widget with user question in chat attributes.](https://docs-resources.prod.twilio.com/c5632535009a76ae913052e224f5e9d73f12c73b9d60a6e2bfee59b3cbb772ca.png)

```javascript
"{{trigger.conversation.ChannelAttributes.pre_engagement_data.question}}"
```

Here's how you would add the initial user question to your chat task attributes in the Send To Flex widget:

```json
{"initial_question": "{{trigger.conversation.ChannelAttributes.pre_engagement_data.question}}"}
```

## Next Steps

* [Check out the Twilio Studio User Guide](/docs/studio/user-guide)
