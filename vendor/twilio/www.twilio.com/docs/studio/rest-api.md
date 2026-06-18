# REST API v1

## Studio REST API v2 now Generally Available!

[Switch to V2](https://www.twilio.com/docs/studio/rest-api/v2)

The [Studio REST API v2](/docs/studio/rest-api/v2) with Flow publishing support is now Generally Available and includes the ability to programmatically create and update Flows!

We recommend all customers [use the v2 API](/docs/studio/rest-api/v2) to take advantage of the latest features.

The Studio v1 REST API lets you trigger flows programmatically and also retrieve information about your flows and executions. The [Incoming Request Trigger](/docs/studio/widget-library/trigger-start) on your flow will fire when you create an Execution via the REST API. Important: When triggering flows with the API, configure your [phone number](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventoryg) with your Studio flow. If you don't configure the phone number, users won't be able to reply to your messages or interact with your IVR.

**HTTP `POST` to create an Execution**

To trigger a new Execution of your Flow via the REST API, make an HTTP `POST` request to:

`https://studio.twilio.com/v1/Flows/{FlowSid}/Executions`

**`POST` Parameters**

*Required Parameters*

| **Parameter** | **Description**                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `To`          | The Contact phone number (or other identifier) to start a Studio Flow Execution, available as variable `{{contact.channel.address}}`                                                                                               |
| `From`        | The Twilio phone number (or other identifier such as a SID of a [Messaging Service](/docs/messaging/services)) to send messages or initiate calls from during the Flow Execution, available as variable `{{flow.channel.address}}` |

**Important**: The `To` and `From` phone numbers must be formatted as [E.164](/docs/glossary/what-e164) (e.g. +1xxxxxxxxxx) to ensure a Contact's session is tracked correctly.

*Optional Parameters*

| **Parameter** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Parameters`  | JSON data that will be added to your flow's context and can be accessed as variables inside your flow. For example, if you pass in `Parameters={"name":"Zeke"}` then inside a widget you can reference the variable `{{flow.data.name}}` which will return the string "Zeke". Note: the JSON value must explicitly be passed as a string, not as a hash object. Depending on your particular HTTP library, you may need to add quotes or URL encode your JSON string. See curl examples below. |

**Quick Examples**:

Using curl on the command line, you can trigger a flow like so:

```xml
curl -X POST "https://studio.twilio.com/v1/Flows/FW9d816f0b90d2a10b913868462e339d29/Executions" --data-urlencode "To=+1646221xxxx" --data-urlencode "From=+1331481xxxx" -u ACCOUNT_SID:AUTH_TOKEN 
```

To pass in additional custom data to your flow, add a Parameters= parameter.

```xml
curl -X POST "https://studio.twilio.com/v1/Flows/FW9d816f0b90d2a10b913868462e339d29/Executions" --data-urlencode "To=+1646221xxxx" --data-urlencode "From=+1331481xxxx" --data-urlencode "Parameters={\"name\":\"zeke\"}" -u ACCOUNT_SID:AUTH_TOKEN
```

If you are using a [Twilio SDK](/docs/libraries), you can trigger a flow like so:

**Ruby**:

```ruby
Twilio::REST::Client.new(ACCOUNT_SID, AUTH_TOKEN).studio.v1.flows('FW9d816f0b90d2a10b913868462e339d29').executions.create(from: '+1331481xxxx', to: '1646221xxxx', parameters: '{"name":"Clément"}')
```

**NodeJS**:

```javascript
TwilioClient.studio.v1.flows('FW9d816f0b90d2a10b913868462e339d29').executions.create({ to: '+1646221xxxx', from: '+1331481xxxx', parameters: JSON.stringify({name: "Clément"})}).then(function(execution) { console.log(execution.sid); });
```

**PHP**:

```php
$twilio->studio->v1->flows("FW9d816f0b90d2a10b913868462e339d29")->executions->create("+1646221xxxx", "+1331481xxxx", array("parameters" => array("foo" => "bar")));
```

The [Executions resource](/docs/studio/rest-api/execution) page documents examples in other languages. For information on the other resources, check out the full REST API documentation for each resource below.

## Studio REST API resources

| Resource                                                     | Description                                                                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| [Flow](/docs/studio/rest-api/flow)                           | Allows you to retrieve a list of Flows created in your account.                                                   |
| [Execution](/docs/studio/rest-api/execution)                 | Allows you to create Executions that will act on the incoming REST API trigger for the Flow specified.            |
| [Execution Context](/docs/studio/rest-api/execution-context) | The execution context gives a JSON representation of your flow and its widgets at the time of execution.          |
| [Step](/docs/studio/rest-api/step)                           | Each move through your flow is a Step. The Steps resource allows you to retrieve the steps for a given execution. |
| [Step Context](/docs/studio/rest-api/step-context)           | Step context ties a JSON representation of data parsed as part of an individual widget.                           |

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

## SDKs

If you use one of our SDKs for [C#](https://github.com/twilio/twilio-csharp), [Java](https://github.com/twilio/twilio-java), [Node.js](https://github.com/twilio/twilio-node), [PHP](https://github.com/twilio/twilio-php), Python, or [Ruby](https://github.com/twilio/twilio-ruby); you needn't worry about the URL for the API or how to do HTTP Basic authentication. The SDKs take care of it for you.

## Engagements name change and deprecation

During the beta of Twilio Studio (prior to August 1st 2018), flow Executions were named Engagements, and we had an API available for creating Engagements. We got feedback that the word engagements was confusing, so we've changed it: We have renamed Engagements to Executions across the Studio product and API but maintained support for Engagements during this transition. There is no functional difference between /Engagements and /Executions in the API. **The Engagements API endpoint is now deprecated**:

* **/Engagements** will continue to function as is until the end of 2018.
* Customers should move to **/Executions** (available via REST and in Twilio SDKs)
* The **/Engagements** API endpoint will cease to function in January 2019 and be removed from new versions of the Twilio SDKs at that time.

## REST API best practices

To handle [API response error 429: "Too Many Requests"][] during traffic spikes or unexpected usage, follow [REST API best practices][], such as [retries with exponential backoff][].

[REST API best practices]: /docs/usage/rest-api-best-practices

[retries with exponential backoff]: /docs/usage/rest-api-best-practices#retry-with-exponential-backoff

[API response error 429: "Too Many Requests"]: https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-

When API rate limits are calculated, they are averaged over 10 seconds. This calculation method means that our REST APIs can handle rate spikes as long as the average number of requests over 10 seconds remains within the per-second rate limit.
