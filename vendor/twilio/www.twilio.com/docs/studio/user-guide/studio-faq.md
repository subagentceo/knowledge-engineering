# Studio FAQ

## What limits exist in Studio?

Studio has limits to maintain reliable performance. You may reach these limits if your Flows are very large or if you process a high volume of Executions.

* **Widget limits**: Maximum of 2,000 widgets per Flow (including Subflows). Contact Twilio Support if you need more.
* **Execution steps**: Each Execution ends after 1,000 steps. Be careful with loops. An Execution that hits this limit will stop.
* **Execution duration**: An Execution automatically ends after 30 days.
* **Widget repeats**: If the same widget runs 10 times in a row during an Execution, that Execution will stop.
* **Liquid Template loops**: Limited to 15 iterations per Liquid Template loop.
* **HTTP requests**: Each outbound HTTP request from the [HTTP Request widget](/docs/studio/widget-library/http-request) and the [Run Function widget](/docs/studio/widget-library/run-function) is limited to 10 seconds.
* **Simultaneous Executions**: You can't have multiple active Executions for the same contact if triggered by the [REST API](/docs/studio/rest-api/v2/execution#create-a-new-execution).

**Tip**: Use Subflows to keep individual Flows smaller and easier to manage.

### Rate Limits

Studio has default rate limits for creating new Executions:

* **Inbound Executions** (triggered by Incoming Call, Incoming Message, Incoming Conversation): **100** new Executions per second per account
* **Outbound Executions** (triggered by Studio's REST API): **20** new Executions per second per account

When you reach the inbound limit, your Flow will generate a [429 Too Many Requests](/docs/api/errors/20429) error in the Twilio Debugger, and the Fallback URL set on your phone number will be invoked. If no Fallback URL is set, callers will hear an error message and messaging-based users will receive no reply message from the Flow.

When you reach the outbound limit via the Studio REST API, your code will receive the same [429 Too Many Requests](/docs/api/errors/20429) error, in which you can back off and retry your API request.

Contact Twilio Support with your use case and projected traffic to request a rate increase.

### Other troubleshooting tips

* Sometimes Executions become stuck for Inbound Calls. Follow our [best practices to avoid stuck Executions](https://help.twilio.com/hc/en-us/articles/360019383714).
* Infinite loops are possible. We have a built-in Step limit, so your Execution will end after 1,000 Steps. But be careful when creating loops over a set of widgets.

## Why is my Split Based On... widget not detecting a condition?

Some common problems encountered when using the **[Split Based On… widget](/docs/studio/widget-library/split-based-on)** are unexpected speech results and numeric comparisons.

If numeric comparisons are being made, verify that the input value is a number and not a string representation. The value will have quotations around it when it is a string — an example being "1" instead of 1. To convert this value to a number, use the Liquid filter to add 0 as shown here:

`{{flow.variables.numericVariable | plus: 0}}`

`flow.variables.numericVariable` can be substituted for the variable that holds your value.

If a speech result is being evaluated from the **[Gather Input on Call widget](/docs/studio/widget-library/gather-input-call)**, punctuation (including spaces) may be affecting the result. For example, this Flow asks the user for speech input and checks if the user said "yes" or "no":

The Split Based On… widget checks if the gathered speech result is equal to "Yes". When running the Flow and speaking "Yes" into the call, the response of "Said no!" is delivered. Why is this?

The Log for the Execution shows that "Yes." was registered as the speech input instead of "Yes", which was being checked for in the Split Based On… widget. Eliminate periods added to the end of input using the following Liquid Template Language to solve this issue:

`{{widgets.gather_1.SpeechResult | replace:'.' ,''}}`

Replace `widgets.gather_1.SpeechResult` with the variable representing the speech input collected in your own Flow. Alternatively, use the "Contains" predicate for the Split Based On… widget to check if the input value simply has "Yes" within it instead of checking for the exact value.

If the "Matches Any Of" predicate is used, try adding the word with a period at the end as one of the options to compensate for unwanted punctuation added at the end of the speech result.

![Twilio Studio widget with condition 'Matches Any Of' set to 'Yes, Yes' and action 'send\_message\_1'.](https://docs-resources.prod.twilio.com/aaf3eeb8876dbc0b070bba80cc091c1657a1e356ba5be98b4825dba26c7f4ace.png)

## How can I cancel an active Execution?

1. Navigate to the Logs page within Studio.
2. Select **Show Active Executions Only** and find the Execution to be canceled using the **Contact** and **Date Created** information.
3. Select **Stop Execution**.

## Can I move my Flow to another project?

You can import and export a Flow. [Learn how to export an existing Flow](/docs/studio/user-guide#exporting-flow-data) by copying the JSON representation. [Learn how to import a Flow](/docs/studio/user-guide#importing-flow-data) by pasting the JSON representation of the Flow that you are moving when creating a new project.

## How can I test my Flow?

Flows can be modified after being published but will not be live to users who are not defined as a test user. Modified Flows are considered to be in a draft state until the **Publish** button is pressed again.

Test users can be managed within the Flow Configuration, which is found when clicking on the Trigger widget. Any valid phone number added to the **TEST USERS** field will use the latest draft revision when they start an Execution rather than the latest published revision.

## Why is my message not being sent? Why is my call not being made?

Use logs provided by Studio to manage and troubleshoot all Flow Executions. The Execution may have failed and ended before a specific widget was reached, resulting in a message or call not being delivered. The delivery of the message or call itself may have also failed — you can find the details inside the Step information within the Execution log.

To access logs, select the **Logs** option in the Flow management menu — located to the left of the Studio Canvas. Find the Execution that failed based on the **Contact** and **Date Created** and select it. Each Step that was run during the Execution will be visible in the log.

![Twilio Studio log showing a failed Send Message event due to missing message body.](https://docs-resources.prod.twilio.com/709d7953c654e800676d273abbab8cac73744e9219f646010d7ab866f651dbf8.png)

For example, the log above shows a Send Message failure that resulted in the Execution ending for the user. Details of the failure are shown within the debugging information — found by selecting the right-arrow for a specific Step.

## How do I pass variables from my Flow to a Twilio Function?

The **[Run Function widget](/docs/studio/widget-library/run-function)** has optional configuration called Function Parameters, located at the bottom of the configuration menu for the widget. You can add variables to be passed to the Function by selecting the **+** button, setting the key value which will be used to identify the variable when the Function executes, and setting the value of the variable.

![Twilio Studio config tab with function URL selection and variable input.](https://docs-resources.prod.twilio.com/b9cb821175acc73904318139ee21e3df6e88fcfe28a151ae6b30c7588c18bdb1.png)

When the Function executes, these variables will be available in the `event` parameter. In this example, you would use `event.myVariableName` within the Function body to access the value 1.

## How do I store input from a user when my Flow is executing?

Use the [**Set Variables widget**](/docs/studio/widget-library/set-variables) to create a variable that will hold the value inputted by the user, for example, if a user is prompted to enter a value from 1 to 10 when they text the Twilio phone number associated with the Studio Flow. When a reply is received, the Set Variables widget will store this input into a variable called `rating` which can be then accessed using `{{flow.variables.rating}}` . Here, `rating` serves as a placeholder for the variable name that was specified.

![Twilio Studio flow for rating experience from 1-10 with ask\_for\_rating and store\_rating steps.](https://docs-resources.prod.twilio.com/eac24cfa3901614e716e10cbe198441f5fce722b760f1e374e42487ca2d60be1.png)

![Twilio Studio set variables config with widget name store\_rating and variable rating.](https://docs-resources.prod.twilio.com/da169a4c429f366553f51b9b0ac29c92e10003ac819eeab87f0d6df9395389f6.png)

Notice that to get user input, the Set Variables widget had to access the inbound message body of the **[Send & Wait For Reply widget](/docs/studio/widget-library/send-wait-reply)**.

Input is stored by default inside of the widget that requested it. You can access this from the Liquid Template Language variable that is associated with the input value — `{{widgets.<MY_WIDGET_NAME>.inbound.Body}}` being the variable for the Send & Wait for Reply widget.

## How can I access my database in a Flow?

One way of accessing your database is by using [Twilio Functions](/docs/serverless/functions-assets/functions). Use the **[Run Function widget](/docs/studio/widget-library/run-function)** to call a Function hosted by Twilio that you have created. Inside the Function, you will contact the database server you are using with the appropriate Node.js library. See [how to pass variables from Studio to your Function](#how-do-i-pass-variables-from-my-flow-to-a-twilio-function).

Learn how to [connect your Twilio Function to a local database](https://www.twilio.com/blog/connect-local-database-twilio-functions).

## How can I assign my Studio Flow to a Twilio phone number if my Flow is not showing up in the dropdown?

Assign the Studio Flow by setting the handler to be a **Webhook** and pasting the webhook of the Studio Flow in the field.

1. In your Studio Flow, click on the Trigger (Start) widget and find the **Webhook URL** field. Copy the URL.
2. Navigate to **Phone Numbers > Manage > Active numbers** in the navigation panel of the Twilio console. Find the number you would like to attach the Studio Flow to and click into it.
3. Scroll down to **Voice & Fax**. Under **A Call Comes In**, specify that a Webhook should handle the call. Paste the URL you copied from your Flow into the field to the right.
4. Click **Save**. Your Studio Flow is now connected to the Twilio phone number.

![Twilio Voice & Fax settings with webhook configuration for incoming calls.](https://docs-resources.prod.twilio.com/d159b9bdabbea195e04c8b3ab002ae2d065815ba2d13cfe3bf8f1bf676485402.png)

## What is the Run Function widget?

The **[Run Function widget](/docs/studio/widget-library/run-function)** allows a Flow to access code that is hosted by Twilio Functions. You are able to write code that will be hosted by Twilio using the Functions product. The Run Function widget takes in the URL where the code is being hosted and runs it during a Flow's Execution.

This allows a Flow to interact with the code that you write. More complex tasks like random number generation and making requests to a database can be accomplished using this method.

## What is the Make HTTP Request widget?

The **[Make HTTP Request widget](/docs/studio/widget-library/http-request)** allows a Flow to make a web request to a service located at a given URL. The service may be a deployed REST API (think of this as a processing center that will return or update information depending on the processes that are called — specified by a URL). On a Flow Execution, the Make HTTP Request widget will use the Request URL provided along with the Request Method to query the service, which will then return a status that Studio will use to determine if the request succeeded or failed.

This allows a Flow to interact with APIs and other services located at a given URL.

## What is the Add TwiML Redirect widget?

TwiML is a document of data that stores actions and information. Tags are used within this document to wrap information and tell the process reading the document how the information should be handled. The **[TwiML Redirect widget](/docs/studio/widget-library/twiml-redirect)** allows a Flow to communicate with a TwiML document that is hosted at a specified URL.

Use the TwiML Redirect widget when a TwiML document outside of Studio needs to be accessed while a Flow executes.

## How can I make an outbound request in my Flow?

There are two widgets available to make an outbound webhook request:

* **[Run Function widget](/docs/studio/widget-library/run-function)** - Invoke a Twilio Function. Learn more about [Twilio Functions.](/docs/serverless/functions-assets/functions)
* **[Make HTTP Request widget](/docs/studio/widget-library/http-request)** - Make a request to an external service.

## Why does every incoming message create a new execution?

If a number is configured with a [Messaging Service](/docs/messaging/services), you need to use the Messaging Service SID as the `From` identifier so that users can reply to your messages.

Studio keeps track of executions by their unique to/from address pair and uses this to look for active executions with which to associate incoming messages. When a Messaging Service calls the webhook for Studio, it provides that Service SID as the `From` identifier instead of the number itself.

If the Messaging Service SID is used instead of a number, Studio may see it as a new conversation and create a new execution.

For example, if you trigger a new flow from +15017122661 (which is associated with MG9752274e9e519418a7406176694466fa) to +15558675310, then Studio will supply +15017122661 as the `From` value when interacting with the Programmable Message API. Internally, Studio keeps track of this execution as a conversation between +15017122661 and +15558675310. When the Messaging Service then calls the Studio webhook, it supplies MG9752274e9e519418a7406176694466fa as the `To` value (reversed as this is an inbound message). Studio can't find an existing execution between MG9752274e9e519418a7406176694466fa and +15558675310 and so a new execution is created.

## What is the Studio API Key?

Studio creates an API Key to use when your workflows make requests to the Twilio API. To learn more, see [Studio-generated API Keys](/docs/studio/studio-generated-api-keys).
