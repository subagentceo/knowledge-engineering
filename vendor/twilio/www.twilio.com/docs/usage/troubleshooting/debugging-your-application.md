# Twilio Debugger

As you build and test your new app, or manage existing apps in production, you might run into unexpected issues. To troubleshoot issues with Twilio-powered apps, identify failed API requests, webhook errors, and other operational problems, view and inspect error, warning, and info events with the Debugger.

You can use the Debugger in Twilio Console or with the [Twilio Workbench](/docs/usage/workbench).

> \[!WARNING]
>
> The Twilio released the Twilio Debugger in the US1 region only. IE and AU still use the legacy error logs experience. You can use error webhooks across all regions.

## Getting started

To access the Debugger, go to **Develop > Troubleshoot > Debugger** in the Console. If you're using the legacy Console, go to **Monitor > Logs > Errors > Error logs**.

Access the following error log data from the **Debugger** page:

* Timestamp (local)
* Level (Info/Warning/Error)
* Error code
* Source
* Event type
* Description
* Log properties

Info events don't indicate a problem but provide context about what Twilio processed on your behalf.

With the search bar, you can seek out event data from within the last 30 days. The search bar offers the following features:

* Find events using their error code or SID.
* Filter search results using page size, date range, level, source, and event type.

To view the **Log properties** panel, click an error log timestamp. The panel displays error log properties that include the raw event data in JSON format, an error description, and, if applicable, the request inspector.

## Debug with error logs

To debug your app, try the following tips.

Break the problem down into smaller parts.

**For example**: When you make an outbound phone call using the API, consider what happens:

1. Your code uses an SDK to invoke Twilio's REST API.
2. Twilio authenticates your HTTP request and validates the provided parameters.
3. Twilio places an outbound phone call.
4. Twilio makes an HTTP request to the webhook you specified, once the recipient answers the call.
5. Twilio parses and executes the TwiML returned from the webhook.

Any of those steps can experience an issue, whether from a network outage or invalid TwiML. To isolate the issue, test each of these steps independently.

## Debug webhooks

To track down the source of an issue with a webhook, try one of the following options.

### Check the Debugger for logs

Open the Debugger. When Twilio runs into a problem, it logs the data about it. The Twilio Debugger classifies these problems as  *warnings* or *errors*.

* When Twilio encounters an issue but could still process the request, it logs that as a warning.
* If Twilio couldn't process the request at all, it logs that as an error.

Debugging events capture the following data:

* Complete text of the event
* Potential causes of the event
* Suggested solutions for the event
* HTTP request and response for the webhook request

### Run the webhook in your browser

Because you're writing a web application, you can test everything in your browser. Open the URLs in your browser and verify that they don't return errors.

* Firefox treats XML files nicely, highlighting any invalid XML in your document.
* To mimic Twilio data passing, add data to your URLs.
  **For example**:
  Your Twilio app collects digits.
  * To trigger collection, your app goes to `http://www.myapp.com/handleDigits.php`.
  * To verify the end user result, open your browser to this address: `http://www.myapp.com/handleDigits.php?Digits=1`.
* Don't send debug output in your requests. This might cause problems. You can wrap any such output in XML comment blocks: `<!-- COMMENTS HERE -->`

### Check for HTTP redirects

Twilio follows standard HTTP protocols. When Twilio receives an HTTP 301 or 302 redirect, it follows the redirect to the specified URL. On the subsequent request, the redirect doesn't include the original parameters. This might mean you don't see parameters such as `Digits` or `RecordingUrl` arriving where you expect them. In this scenario, check that the URL doesn't return a redirect.

As an example, when a `<Gather>` request is made to the action URL, the `POST` request includes a `Digits` parameter. If the action URL redirects to another URL, Twilio follows the redirect and issues a `GET` request to the specified URL. This `GET` request includes the standard set of parameters included with every Twilio request, but doesn't include the additional `Digits` parameter.

Common situations that may return unexpected redirects are:

* A server that automatically redirects all HTTP requests to HTTPS
* A URL rewriting rule that rewrites request URLs to include or exclude `www.`

To see what your server is returning to Twilio, create a test request using `curl`, [Postman][postman], or your HTTP client of choice and inspect the response returned from your URL.

To configure error webhooks, go to **Develop > Troubleshoot > Error Webhook**. You can use webhooks across all regions.

## Debugging calls to the REST API

When errors and warnings related to Twilio invoking your webhooks occur, they display in the error logs and return an error object to your app. The error object contains the HTTP response status code, a Twilio-specific error code, an error message, and a link to the [Error and Warning Dictionary](/docs/api/errors).

```json
{
  "code": 21211,
  "message": "The 'To' number 5551234567 is not a valid phone number.",
  "more_info": "https://www.twilio.com/docs/errors/21211",
  "status": 400
}
```

### Stream error logs to Amazon Kinesis

Twilio [Event Streams][event-streams] is an API that lets you subscribe to a unified stream of interactions across different Twilio products. You can stream your data to your existing systems by configuring a streaming technology like Amazon Kinesis, or a webhook. Event Streams generates error log events for all errors and warnings on your Twilio applications. Learn more about the [events here][error-logs-event].

[event-streams]: /docs/events

[error-logs-event]: /docs/events/event-types#error-logs

[postman]: https://www.postman.com/
