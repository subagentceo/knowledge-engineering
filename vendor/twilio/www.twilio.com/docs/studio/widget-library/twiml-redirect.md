# TwiML Redirect widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The TwiML Redirect widget allows you to redirect a call or message to [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml) hosted somewhere other than your Studio Flow and, optionally, return control of the call back to Studio after the TwiML you redirect to is complete.

![TwiML Redirect widget with URL and handlers for return, timeout, and failed.](https://docs-resources.prod.twilio.com/9b61b1747083f29328dae4400abcc4ecb9d7dbee05ba6c03c5bca50b82c20fea.png)

The URL you redirect to with this widget *must* host valid TwiML. TwiML can be hosted and served in many ways, including but not limited to:

* As a static asset served by your own server
* As a [Serverless Asset](/docs/serverless/functions-assets/assets)
* In [a TwiML Bin](/docs/serverless/twiml-bins/getting-started) (supports mustache templates)
* As the result of [calling a Serverless Function](/docs/serverless/functions-assets/quickstart/receive-call)

> \[!NOTE]
>
> The [Twilio Markup Language](/docs/glossary/what-is-twilio-markup-language-twiml) (TwiML), is an XML-based language that instructs Twilio on how to handle various events, such as incoming and outgoing calls,
> SMS messages, and MMS messages.

## Required configuration for TwiML Redirect

The TwiML Redirect widget requires only one piece of information to function properly:

| Name | Description                                                                                 | Example                         | Default |
| ---- | ------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| URL  | The URL hosting your TwiML where you want your Studio Flow to redirect the call or message. | `https://www.example.com/twiml` | None    |

***Note***: Studio does not actually make the HTTP request to this URL. Instead, Studio prints the TwiML, which instructs Twilio Voice or Messaging to make a new request to the URL you specify.

### How to pass parameters to a TwiML Redirect URL

If you want to pass parameters to a TwiML Redirect URL from your Studio Flow, you can pass them in a query string as part of your URL.

For example, if you want to pass the `Digits` variable from the **[Gather Input on Call widget](/docs/studio/widget-library/gather-input-call)**, you should enter the following in the URL field for the TwiML Redirect widget:

```bash
https://example.com/myfunction?Digits={{widgets.MY_WIDGET_NAME.Digits}}
```

### How to return control to Studio

To return control of the call or message to Studio, you must specify a `<Redirect>` to your Studio Webhook URL and append `?FlowEvent=return`. Studio will inject any additional parameters specified in the return URL to your Studio context. These parameters will then be available in your Studio Flow via [Liquid template variables](/docs/studio/user-guide/liquid-template-language).

Example:

```xml
<Response>
  <Say>Returning you back to the Studio Flow.</Say>
  <Redirect>https://webhooks.twilio.com/v1/Accounts/{AccountSid}/Flows/{FlowSid}?FlowEvent=return&amp;foo=bar</Redirect>
</Response>
```

The URL parameter `foo` illustrated above will be passed automatically into your Flow and can be referenced via Liquid as `{{widgets.your_redirect_widget_name.foo}}`.

> \[!NOTE]
>
> To retrieve the Studio Webhook URL in your Studio flow, click the red Trigger
> widget. The URL starting with `https://webhooks.twilio.com/v1/...` is the
> Webhook URL for this Flow.

## Optional configuration for TwiML Redirect

The TwiML Redirect widget accepts a few configuration options that you can use to further customize how Studio redirects to your URL that hosts TwiML, and returning control back to Studio:

| Name    | Description                                                                                                                                                             | Possible Values              | Default |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| Method  | The HTTP method Twilio should use when accessing your redirect URL                                                                                                      | `POST`, `GET`                | `POST`  |
| Timeout | The number of seconds your Studio Flow will wait for control to return to it after the redirect. If you do *not* wish to return control to Studio, set this value to 0. | 0 to 14400 seconds (4 hours) | 14400   |

## TwiML Redirect Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name    | Description                                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Return  | Control has been returned to Studio by Twilio Voice or Messaging TwiML by appending the parameter `FlowEvent=return` to your TwiML redirect URL                                             |
| Timeout | The timeout timer expired and control has not passed back to Studio via the `FlowEvent=return` parameter                                                                                    |
| Failed  | The URL is invalid and cannot be parsed at runtime, therefore Studio cannot complete the request. Note that the Failed state will *not* occur if your URL returns an error (e.g., 404, 500) |

### Regaining control of a Voice call

Your Studio Flow will not be able to regain control of a Voice call that is timed out after passing the call to your TwiML Redirect URL. The *only* way your Studio Flow can regain control of a Voice call that has been passed to a TwiML URL is if you first append the parameter `FlowEvent=return` to your URL. This will tell the TwiML that executes to return control back to Studio when execution is complete.

## Example: Sending and receiving variables to and from a TwiML document

You may want to send and receive information to and from a TwiML document. This example shows a Studio Flow using the TwiML Redirect widget to run a TwiML document hosted by Twilio's [**TwiML Bins**](/docs/serverless/twiml-bins).

![Twilio Studio flow with triggers for message, call, conversation, and TwiML redirect.](https://docs-resources.prod.twilio.com/41e484d2d26a31af19a86fe84912adc54d103cea50a47d45f301147c0701396e.png)

The Flow first asks the user to enter their name. When the user responds, the response is captured within the Send & Wait for Reply widget's `{{widgets.MY_WIDGET_NAME.inbound.Body}}` Liquid variable — `MY_WIDGET_NAME` being `name_question` in this example. The TwiML Redirect widget will then retrieve and run the TwiML document located at the provided URL.

The TwiML Redirect widget is able to pass variables to the document by including them as URL parameters within the **URL** field. In this example, the variable `Name` is passed into the TwiML document with the user's response designated as the value.

![URL field with Twilio Studio widget variable for inbound body name.](https://docs-resources.prod.twilio.com/6fc40236c207ab216e2eef99356a8044f7eb7a0d9a168c0cada7c12ee5ac196e.png)

Separate the URL where the TwiML document is located and the variables to pass in using the "?" character. If you would like to pass in more than one variable, separate each by the "&" character.

The TwiML document at the URL is hosted by Twilio's TwiML Bins. TwiML Bins support Mustache Templates which allow you to reference variables passed in as URL parameters. `Name` was passed in as a variable in this example and can be referenced as `{{Name}}`. Learn more about [Mustache Templates](https://mustache.github.io/mustache.5.html). It will send a message to the user with the `Name` variable that was passed in. It will then redirect back to the Studio Flow using the webhook of the Flow, found by clicking on the Trigger widget under the **WEBHOOK URL** field, along with the variable `FlowEvent` set to a value of "return". It also sends back a variable called `test` that has a value set to "success".

```xml
<Response>
    <Message>
      Hello {{Name}}! Sent from a TwiML document.
      </Message>
      <Redirect>
https://webhooks.twilio.com/v1/Accounts/AC8a124fa47560fc6bbd3f182474e5fd28/Flows/FWdd7ddbc880eca07b3f519bef81d4df8f?FlowEvent=return&amp;test=success
      </Redirect>
</Response>
```

Access any variables sent from a TwiML document using `{{widgets.MY_WIDGET_NAME.VARIABLE_NAME}}`, where `MY_WIDGET_NAME` refers to the TwiML Redirect widget's name and `VARIABLE_NAME` refers to the variable sent from the TwiML document. In this example, the `{{widgets.twiml_service.test}}` Liquid variable holds the value of the variable `test` sent by the document.

## Learn more

Want to learn more about how you can use TwiML Redirects to customize your Studio Flow? Check out these guides:

* [Learn how to write TwiML for handling Voice calls](/docs/voice/twiml)
* [Learn how to write TwiML for handling messages](/docs/messaging/twiml)
* [Learn how to use a TwiML Bin to host serverless TwiML](/docs/serverless/twiml-bins) that your Studio Flow can use

Let's build something amazing.
