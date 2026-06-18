# Debugging Events Webhook

When an error or warning takes place on your Twilio account, this event is published into Twilio's Debugging System. This is the system that powers the Monitor Alerts API, Alert Triggers and the Console Debugger.

The [Console Debugger](https://www.twilio.com/console/runtime/debugger) allows developers to configure an optional webhook to receive data about errors and warnings as they happen. This makes it easy for developers to react to problems with their applications promptly.

If the Console Debugger webhook is configured, Twilio will make an HTTP `POST` request for debugging events as they occur. Below is an overview of the parameters passed.

> \[!NOTE]
>
> Twilio can send your web application an HTTP request when certain events happen, such as an incoming text message to one of your Twilio phone numbers. These requests are called *webhooks*, or *status callbacks*. For more, check out our guide to [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks). Find other webhook pages, such as a [security guide](/docs/usage/webhooks/webhooks-security) and an [FAQ](/docs/usage/webhooks/webhooks-faq) in the [Webhooks](/docs/usage/webhooks) section of the docs.

## Debugging Event Callback Parameters

| Property         | Description                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Sid              | Unique identifier of this Debugger event.                                                                 |
| AccountSid       | Unique identifier of the account that generated the Debugger event.                                       |
| ParentAccountSid | Unique identifier of the Parent Account. This parameter only exists if the above account is a subaccount. |
| Timestamp        | Time of occurrence of the Debugger event.                                                                 |
| Level            | Severity of the Debugger event. Possible values are Error and Warning.                                    |
| PayloadType      | application/json                                                                                          |
| Payload          | JSON data specific to the Debugging Event.                                                                |

### Payload

The payload is a JSON object that provides more information about the Debugging Event in question.

| Property      | Description                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| resource\_sid | The ID of this Twilio Platform Resource that this error is associated with                                               |
| service\_sid  | The ID of the Twilio Platform Service that this error is associated with                                                 |
| error\_code   | The unique error code for this debugging event                                                                           |
| more\_info    | A subdocument containing more information about this debugging event                                                     |
| webhook       | A subdocument containing Information about the request and response of the webhook associated with this debugging event. |

#### more\_info

The more\_info property of the payload is optional and contains additional information specific to the Twilio product/feature that published this debugging event.

#### webhook

The webhook property of the payload is optional. It is only present if a webhook request is associated with the debugging event.

```json
{
'request': {
  'method': 'POST',
  'url': 'http://twimlets.com/forward?PhoneNumber=800-421-9004', 
  'headers': {
    'key': 'value' 
  },
  'parameters': {
    'key': 'value' 
  }
  },
  'response': {
    'status_code': 200,
    'headers': {
      'key': 'value'
    },
    'body': '<Response><Dial>800-421-9004</Dial></Response>'
  }
}
```

## Representative Example of a Debugging Event Webhook

This is an example of a debugging event webhook. The details of what will be in this webhook request depend on what type of error the Twilio Debugger handles. For this example, the webhook event was omitted for brevity, but an example of what it might look like is in the previous section.

This HTTP Body is sent as an HTTP `POST` to your webhook, and encoded as `application/x-www-form-urlencoded`. Within that request body, the `Payload` property is a JSON object that you would need to decode.

The `X-Twilio-Signature` HTTP header will be sent with this HTTP `POST`, and you should use it to validate that the request is indeed from Twilio. Learn more about [Validating Signatures from Twilio](/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio)

```bash
AccountSid    ACxxxxxxxxxxxxxxxxxxxxxxxx
Level    ERROR
ParentAccountSid
Payload    {
  "resource_sid":"CAxxxxxxxx",
  "service_sid":null,
  "error_code":"11200",
  "more_info":{
    "msg":"An attempt to retrieve content from https://yyy.zzz returned the HTTP status code 404",
    "Msg":"An attempt to retrieve content from https://yyy.zzz returned the HTTP status code 404",
    "sourceComponent":"12000",
    "ErrorCode":"11200",
    "httpResponse":"404",
    "url":"https://yyy.zzz",
    "LogLevel":"ERROR"
  },
  "webhook":{
     "type":"application/json",
     "request": <Specific Twilio Request Details to your Webhook here as a JSON Object>
  }
}
PayloadType    application/json
Sid    NOxxxxx
Timestamp    2020-01-01T23:28:54Z
```

Below is a cURL snippet based on the above example that you can customize to simulate a debugging event webhook.

```bash
curl -X "POST" "https://your-server.example.com/webhook" \
     -H 'I-Twilio-Idempotency-Token: idempotency-token-goes-here' \
     -H 'X-Twilio-Signature: correct-signature-goes-here' \
     -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
     --data-urlencode "AccountSid=ACxxxxxxxxxxxxxxxxxxxxxxxx" \
     --data-urlencode "Level=ERROR" \
     --data-urlencode "ParentAccountSid=" \
     --data-urlencode "Payload={
  \"resource_sid\":\"CAxxxxxxxx\",
  \"service_sid\":null,
  \"error_code\":\"11200\",
  \"more_info\":{
    \"msg\":\"An attempt to retrieve content from https://yyy.zzz returned the HTTP status code 404\",
    \"Msg\":\"An attempt to retrieve content from https://yyy.zzz returned the HTTP status code 404\",
    \"sourceComponent\":\"12000\",
    \"ErrorCode\":\"11200\",
    \"httpResponse\":\"404\",
    \"url\":\"https://yyy.zzz\",
    \"LogLevel\":\"ERROR\"
  },
  \"webhook\":{
     \"type\":\"application/json\",
     \"request\": {}  }
}" \
     --data-urlencode "PayloadType=application/json" \
     --data-urlencode "Sid=NOxxxxx" \
     --data-urlencode "Timestamp=2020-01-01T23:28:54Z"

```
