# Make HTTP Request widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Make HTTP Request** widget allows you to interact with applications and code that live outside of Studio. You can use this widget to interact with parts of your business logic not defined in flows or as Functions.

![HTTP Request widget: 'my\_http\_get\_req' GETs from https://www.example.com/users. Success continues; Fail stops.](https://docs-resources.prod.twilio.com/fb2abc420b171279b4fc18e76cb194d595cbbc5dbac461eb9824df0add46f8bc.jpg)

> \[!WARNING]
>
> Returning custom TwiML from a Make HTTP Request widget isn't supported. Use the [TwiML Redirect widget](/docs/studio/widget-library/twiml-redirect) instead.

## Required configuration for Make HTTP Request

The Make HTTP Request widget requires several pieces of information to function properly. There are three required fields: **Request Method**, **Request URL**, and **Content Type**. You can select the Request Method and Content Type from a dropdown in the widget Inspector Panel.

| Name           | Description                                 | Example                                      | Default          |
| -------------- | ------------------------------------------- | -------------------------------------------- | ---------------- |
| Request Method | The HTTP method of your request             | **`GET`** or **`POST`**                      | `GET`            |
| Request URL    | The URL you would like to make a request to | [https://example.com](https://example.com)   | N/A              |
| Content Type   | Content type of the request body            | **Form URL Encoded** or **Application/JSON** | Form URL Encoded |

> \[!NOTE]
>
> For secure URLs that use basic access authentication, you can add your username and password credentials within the request URL as shown here: `https://user:password@mydomain.com/handler.php`
>
> If you'd like to make a request to a Twilio API, you can enable the [Authenticate with Twilio option](#optional-configuration-for-make-http-request-widget) instead to have your credentials automatically provided.

This is what the default configuration looks like for the Make HTTP Request widget:

![Configuration for 'http\_request\_widget': 'GET' method selected, with a Request URL field below.](https://docs-resources.prod.twilio.com/196838a8352531f5f9b412a16a5e02fd6e6d455f09ab60dc1c6b7039394a6cc0.png)

## Optional Configuration for Make HTTP Request widget

The Make HTTP Request widget also accepts a few configuration options that let you pass along additional information with your request.

| Name                     | Description                                                                                                                                                                                                                                                                                                        | Example                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Request Body             | Text to include in the body of your request.                                                                                                                                                                                                                                                                       | \{\{widgets.first\_question.inbound.Body}}         |
| Authenticate With Twilio | Whether to authenticate the request using your Twilio credentials. This should only be checked if your Request URL points to a Twilio API, otherwise the Fail transition will be taken without the request being made. Note that this option will override any basic auth credentials included in the Request URL. | Checked or Unchecked                               |
| HTTP Parameters          | Key/Value pairs representing URL parameters to pass along with the request, as string literals or variables.                                                                                                                                                                                                       | "key": "value" or key: \{\{flow.variables.\<key>}} |

Studio supports the [Liquid templating language](/docs/studio/user-guide/liquid-template-language), which allows you to work with dynamic content throughout your Flow - you may find it useful for creating a Request Body or the value for HTTP parameters on the fly, as seen in the table above. You can see this in action in our [Conduct a Survey tutorial](/docs/studio/tutorials/how-to-conduct-a-survey#make-an-http-request).

> \[!NOTE]
>
> The HTTP Request widget does not support headers to be passed along with a request. You can call a [Function](/docs/serverless/functions-assets/functions), set headers, and make the HTTP request in the Function rather than from this widget.
>
> Use the [Run Function widget](/docs/studio/widget-library/run-function) to call a deployed Function that makes the HTTP request with headers and returns the response back to the Studio Flow.

## Make HTTP Request Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with transitions in Studio, [see this user guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name    | Description                                           | Example  |
| ------- | ----------------------------------------------------- | -------- |
| Success | A successful return                                   | HTTP 200 |
| Fail    | The URL does not successfully return, or has an error | HTTP 500 |

The Make HTTP Request widget requires you set up transitions for both success and failure states so that your Studio Flow knows what to do if it gets a response back, or if the request fails in some way. If the request succeeds, you will likely move on to the next widget in your Flow. On a Fail state, you can choose to retry the request or fail out of the flow.

## Reattempting an outbound request

You may want to reattempt a request to an external service or [Twilio Function](/docs/serverless/functions-assets/functions) if a failure occurs.

![Twilio Studio flow with split widget based on flow.variables.count and message sending functions.](https://docs-resources.prod.twilio.com/0592c74e2060cff4cd5b1555fe5af295253fe11733641913438fadbe835df430.png)

Looping a widget's failure transition back to itself is **not** an ideal way to implement a retry. This approach eliminates your ability to control the number of repeated requests a user can perform on your services. Additionally, a Flow's Execution will terminate after the same Widget is run 10 times — abruptly ending a user's Execution rather than providing functionality that handles the error.

To properly control retry attempts, you can create a counter within your Flow to keep track of how many requests have been attempted for a particular service and add Widgets to respond based on the result of each retry.

![Twilio Studio Request Reattempt Counter.](https://docs-resources.prod.twilio.com/a3a2294599e6ee6e11e683f1b64b5e504290ef6e6586c187b0694f91bad1d5da.png)

To create a counter:

1. Add a [**Set Variables Widget**](/docs/studio/widget-library/set-variables) to create and increment a `count` variable.
2. Using [Liquid](/docs/studio/user-guide/liquid-template-language) tags, first check if the `count` variable exists. If it does, set the `count` value to its current value plus one using the Liquid filter `plus: 1`. If the `count` variable does not exist, set the value to one. Copy and paste the below code into the **Value** field of your `count` variable.

```liquid
{% if flow.variables.count %}
{{flow.variables.count | plus: 1}} {% else %} 1 {% endif %}
```

The `count` variable can be accessed anywhere in the Flow using `{{flow.variables.count}}`.

You can now check the count and continue incrementing or move the Flow forward using a [**Split Based On… Widget**](/docs/studio/widget-library/split-based-on).

![Twilio Studio Request Reattempt Split Based On... Widget.](https://docs-resources.prod.twilio.com/dbef512dc8ed4cffb39c04bd36e65c3dfaa1ea13c332439b02f8ba2e541db7fc.png)

1. Add a Split Based On… Widget to analyze the `{{flow.variables.count}}` variable and determine if the number of requests has exceeded the limit you set.
2. You will now add a condition to the Widget — checking if the variable is equal to the maximum number of requests you specify. In this example, the maximum number has been set to 3.
3. If the variable being tested is not equal to 3, loop the **No Condition Matches** transition back to the [**Run Function Widget**](/docs/studio/widget-library/run-function) that failed. This will result in a retry.
4. If the variable is equal to 3, use another Widget to handle the failure as you wish. For example, you can use a **[Send Message Widget](/docs/studio/widget-library/send-message)** to communicate the failure to the customer.

## HTTP Response requirements

The HTTP response from the URL you specify in a Make HTTP Request widget *must* return a 2xx status code within 10 seconds to succeed, and the response body must not exceed 64kB. We've outlined a few recommendations for configuring your HTTP response:

| Response      | Recommendation     | Notes                                                                                                                                                                                                                                              |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status Code   | 200 or 204         | 3xx redirection *is* supported. 4xx or 5xx status code will transition to "failed" in the widget.                                                                                                                                                  |
| Content Type  | application/json   | `Content-Type` header is not required if Status Code is 204 No Content. Other content types are supported, such as plain text or XML. But only application/json objects (e.g. `{"foo":"bar"}`) will be automatically parsed into Studio variables. |
| Body          | Valid JSON         | Body content must match the `Content-Type` header.                                                                                                                                                                                                 |
| Response Time | 10 seconds or less | Studio will timeout the request at 10 seconds and transition to "failed" in the widget.                                                                                                                                                            |
| Response Size | Maximum 64kb       | Studio can only process responses up to 64kB.                                                                                                                                                                                                      |

## How to access variables from your HTTP response

You may wish to do some work on the data you pass to your endpoint and return more data or variables to work with further along in your Flow.

### Returning JSON

If your request returns an object in [valid JSON](https://jsonformatter.curiousconcept.com/), you will be able to access it via `widgets.MY_WIDGET_NAME.parsed`.

For example, if your URL returns `{"message": "Hi", "person": {"name": "Bob", "age": 40}}`, you can reference that in subsequent widgets as:

`widgets.MY_WIDGET_NAME.parsed.message`

`widgets.MY_WIDGET_NAME.parsed.person.name`

`widgets.MY_WIDGET_NAME.parsed.person.age`

> \[!WARNING]
>
> Note that, although an array is valid JSON, if your request returns an array of objects, it will *not* be parsed by your Studio Flow. Wrap the array within a JSON object to access array elements.

### Variables from all return types

No matter what kind of response your URL returns to Studio, the following variables will be available to your Flow. For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

#### Body

`{{widgets.MY_WIDGET_NAME.body}}`

The full response body returned from the service.

#### Content Type

`{{widgets.MY_WIDGET_NAME.content_type}}`

The content type of the service's response.

#### Status Code

`{{widgets.MY_WIDGET_NAME.status_code}}`

The status code returned from the service.

## Example: post data to a third-party URL with Make HTTP Request

One example of using the Make HTTP Request widget is posting a message that comes into a Twilio phone number to Slack. In the screenshot below, we can see that the Make HTTP Request widget is triggered when a new conversation message comes into this Studio Flow's phone number. The Make HTTP Request widget will take the message body that comes in from a user (as specified in the **Request Body** of the widget's configuration) and `POST` it to a Slack hook.

![Send to Slack via webhook: POST JSON with text = trigger.conversation.body to hooks.slack.com using our HTTP Request widget.](https://docs-resources.prod.twilio.com/6fbafb55ad1d1e2905486c92e4e171881c730f58781695cfdb479b5dee76b90d.png)

## Learn More

Want to learn how to use the Make HTTP Request widget in a real-world example? Follow along with one of our step-by-step tutorials to see this widget in action in a few different ways:

* [How to Post SMS messages to Slack](/docs/studio/tutorials/how-to-post-sms-to-slack)
* [How to Conduct an SMS Survey with Studio](/docs/studio/tutorials/how-to-conduct-a-survey)

Let's build something amazing.
