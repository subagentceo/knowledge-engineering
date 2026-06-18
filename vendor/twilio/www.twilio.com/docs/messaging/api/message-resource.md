# Messages resource

A Message resource represents an inbound or outbound message. Twilio creates a Message when any of the following occur:

* You create a Message resource (i.e., send an outbound message) via the [REST API](/docs/messaging/api)
* Twilio executes a [\<Message>](/docs/messaging/twiml/message) TwiML instruction
* Someone sends a message to one of your Twilio numbers or messaging channel addresses

With the Messages resource, you can:

* [Create new messages](#create-a-message-resource) (i.e., send outbound messages)
* [Fetch a specific message](#fetch-a-message-resource)
* [Read a list of messages](#read-multiple-message-resources)
* [Update or redact the content of an existing message](#update-a-message-resource)
* [Delete messages from your account](#delete-a-message-resource)

If you're using [Messaging Services](/docs/messaging/services), you can also use the Messages resource to:

* [Schedule a message](/docs/messaging/features/message-scheduling)
* [Create a message with a shortened link](/docs/messaging/features/link-shortening)

A Message resource can also have a [Media sub-resource](/docs/messaging/api/media-resource) and/or a [MessageFeedback](/docs/messaging/api/message-feedback-resource) sub-resource.

> \[!NOTE]
>
> For step-by-step instructions for sending your first SMS with Twilio, check out one of the [SMS quickstarts](/docs/messaging/quickstart).
>
> Looking to [send WhatsApp messages with Twilio](/docs/whatsapp)? Try one of the [WhatsApp quickstarts](/docs/whatsapp/quickstart).
>
> If you're looking for how to **respond to incoming messages**, check out the [How to Receive and Reply to SMS Messages tutorial](/docs/messaging/tutorials/how-to-receive-and-reply).

## Message Properties

<OperationTable type="properties" data={{"title":"ListMessageResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"messages":{"type":"array","items":{"type":"object","refName":"api.v2010.account.message","modelName":"api_v2010_account_message","properties":{"body":{"type":"string","nullable":true,"description":"The text content of the message","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"num_segments":{"type":"string","nullable":true,"description":"The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned."},"direction":{"type":"string","enum":["inbound","outbound-api","outbound-call","outbound-reply"],"description":"The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.","refName":"message_enum_direction","modelName":"message_enum_direction"},"from":{"type":"string","format":"phone-number","nullable":true,"description":"The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent.","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"to":{"type":"string","nullable":true,"description":"The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`)","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated"},"price":{"type":"string","nullable":true,"description":"The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details."},"error_message":{"type":"string","nullable":true,"description":"The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically."},"uri":{"type":"string","nullable":true,"description":"The URI of the Message resource, relative to `https://api.twilio.com`."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource"},"num_media":{"type":"string","nullable":true,"description":"The number of media files associated with the Message resource."},"status":{"type":"string","enum":["queued","sending","sent","failed","delivered","undelivered","receiving","received","accepted","scheduled","read","partially_delivered","canceled"],"description":"The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).","refName":"message_enum_status","modelName":"message_enum_status"},"messaging_service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$","nullable":true,"description":"The unique, Twilio-provided string that identifies the Message resource."},"date_sent":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created"},"error_code":{"type":"integer","nullable":true,"description":"The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically."},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."},"api_version":{"type":"string","nullable":true,"description":"The API version used to process the Message"},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A list of related resources identified by their URIs relative to `https://api.twilio.com`"}}}}}}} />

## Message Status values

The table below lists possible values of a Message resource's `Status`. As messages can be either outbound or inbound, each status description explicitly indicates to which message direction the status applies.

|                         | ENUM:STATUS possible values in REST API format                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'queued'`              | The API request to send an outbound message was successful and the message is queued to be sent out by a specific `From` sender. For messages sent without a [Messaging Service](/docs/messaging/services) this is the initial `Status` value of the Message resource.                                                                                                                                                              |
| `'sending'`             | Twilio is in the process of dispatching the outbound message to the nearest upstream carrier in the network.                                                                                                                                                                                                                                                                                                                        |
| `'sent'`                | The nearest upstream carrier accepted the outbound message.                                                                                                                                                                                                                                                                                                                                                                         |
| `'failed'`              | The outbound message failed to send. This can happen for [various reasons](/docs/messaging/guides/debugging-tools#error-codes) including queue overflows, Account suspensions and media errors.                                                                                                                                                                                                                                     |
| `'delivered'`           | Twilio has received confirmation of outbound message delivery from the upstream carrier, and, where available, the destination handset.                                                                                                                                                                                                                                                                                             |
| `'undelivered'`         | Twilio received a delivery receipt indicating that the outbound message was *not* delivered. This can happen for [many reasons](/docs/messaging/guides/debugging-tools#error-codes) including carrier content filtering and the availability of the destination handset.                                                                                                                                                            |
| `'receiving'`           | The inbound message was received by Twilio and is currently being processed.                                                                                                                                                                                                                                                                                                                                                        |
| `'received'`            | The inbound message was received and processing is complete.                                                                                                                                                                                                                                                                                                                                                                        |
| `'accepted'`            | *\[Messaging Service only]* Twilio has received your API request to immediately send an outbound message with a [Messaging Service](/docs/messaging/services). If you did not provide a specific `From` sender in the service's Sender Pool to use, the service is dynamically selecting a `From` sender. For unscheduled messages to be sent with a Messaging Service, this is the initial `Status` value of the Message resource. |
| `'scheduled'`           | *\[Messaging Service only]* The Message resource is scheduled to be sent with a [Messaging Service](/docs/messaging/services). If you [schedule a message](/docs/messaging/features/message-scheduling) with a Messaging Service, this is the initial `Status` value of the Message resource.                                                                                                                                       |
| `'read'`                | Channels supported: RCS and WhatsApp. The recipient opened the outbound message. Recipient must have read receipts enabled.                                                                                                                                                                                                                                                                                                         |
| `'partially_delivered'` | *\[Deprecated]*                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `'canceled'`            | *\[Messaging Service only]* The message scheduled with a [Messaging Service](/docs/messaging/services) has been canceled.                                                                                                                                                                                                                                                                                                           |

## NumSegments property

The `NumSegments` property is relevant for SMS messages only.

For **outbound SMS messages**, this property indicates the number of SMS messages it took to deliver the body of the message.

If the body of a message is more than 160 [GSM-7](/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](/docs/glossary/what-is-ucs-2-character-encoding) characters), Twilio segments and annotates your messages to attempt proper reassembly on the recipient's handset (not supported by all carriers and handsets). This ensures your body text transmits with the highest fidelity.

On **inbound SMS messages**, this property indicates the number of SMS messages that make up the message received.

If the body of a message is more than 160 [GSM-7](/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](/docs/glossary/what-is-ucs-2-character-encoding) characters), Twilio attempts to reassemble the message received by your Twilio phone number. All carriers and handsets do not necessarily support this.

Your account is charged for each segment sent or received.

Learn more on the [SMS Character Limit Glossary page](/docs/glossary/what-sms-character-limit).

## Create a Message resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json`

To send a new outgoing message, send an HTTP `POST` request to your Account's Messages list resource URI.

> \[!WARNING]
>
> If you want to send messages while in trial mode, you must first [verify your 'To' phone number with Twilio](https://help.twilio.com/hc/en-us/articles/223135427-What-s-the-difference-between-a-verified-phone-number-and-a-Twilio-phone-number-). You can verify your phone number by adding it to your [Verified Caller IDs](https://www.twilio.com/console/phone-numbers/verified) in the Console.

> \[!WARNING]
>
> Twilio queues messages for delivery at your [prescribed rate limit](https://help.twilio.com/hc/en-us/articles/223183648-Sending-and-Receiving-Limitations-on-Calls-and-SMS-Messages). API requests for messages that exceed the [specified rates](https://help.twilio.com/hc/en-us/articles/223183648-Sending-and-Receiving-Limitations-on-Calls-and-SMS-Messages) will be queued and executed as capacity is available.
>
> If you need to enqueue a large number of messages, you may want to use [Messaging Services](/docs/messaging/services).

Every request to create a new Message resource requires a **recipient**, a **sender**, and **content**.

A **recipient** is specified via the `To` parameter.

The **sender** is specified via one of the following parameters:

* `From`
* `MessagingServiceSid`

The message **content** is specified via one of the following parameters:

* `MediaUrl`
* `Body`
* `ContentSid`

The table below describes these parameters in more detail.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) creating the Message resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateMessageRequest","required":["To"],"properties":{"To":{"type":"string","format":"phone-number","description":"The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`.","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"StatusCallback":{"type":"string","format":"uri","description":"The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource). "},"ApplicationSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","description":"The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored."},"MaxPrice":{"type":"number","description":"[OBSOLETE] This parameter will no longer have any effect as of 2024-06-03."},"ProvideFeedback":{"type":"boolean","description":"Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`."},"Attempt":{"type":"integer","description":"Total number of attempts made (including this request) to send the message regardless of the provider used"},"ValidityPeriod":{"type":"integer","description":"The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html)"},"ForceDelivery":{"type":"boolean","description":"Reserved"},"ContentRetention":{"type":"string","enum":["retain","discard"],"description":"Determines if the message content can be stored or redacted based on privacy settings","refName":"message_enum_content_retention","modelName":"message_enum_content_retention"},"AddressRetention":{"type":"string","enum":["retain","obfuscate"],"description":"Determines if the address can be stored or obfuscated based on privacy settings","refName":"message_enum_address_retention","modelName":"message_enum_address_retention"},"SmartEncoded":{"type":"boolean","description":"Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`."},"PersistentAction":{"type":"array","description":"Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp).","items":{"type":"string"}},"TrafficType":{"type":"string","enum":["free"],"refName":"message_enum_traffic_type","modelName":"message_enum_traffic_type"},"ShortenUrls":{"type":"boolean","description":"For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided."},"ScheduleType":{"type":"string","enum":["fixed"],"description":"For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling).","refName":"message_enum_schedule_type","modelName":"message_enum_schedule_type"},"SendAt":{"type":"string","format":"date-time","description":"The time that Twilio will send the message. Must be in ISO 8601 format."},"SendAsMms":{"type":"boolean","description":"If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media."},"ContentVariables":{"type":"string","description":"For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used."},"RiskCheck":{"type":"string","enum":["enable","disable"],"description":"Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request.","refName":"message_enum_risk_check","modelName":"message_enum_risk_check"},"From":{"type":"string","format":"phone-number","description":"The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool.","x-twilio":{"pii":{"handling":"standard","deleteSla":120}}},"FallbackFrom":{"type":"string","format":"phone-number","description":"A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message."},"MessagingServiceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","description":"The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool."},"Body":{"type":"string","description":"The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"MediaUrl":{"type":"array","description":"The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply.","items":{"type":"string","format":"uri","x-twilio":{"ignoreFormat":true}}},"ContentSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HX[0-9a-fA-F]{32}$","description":"For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources)."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"Tags\": \"{\\\"campaign_name\\\": \\\"Spring Sale 2022\\\",\\\"message_type\\\": \\\"cart_abandoned\\\"}\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"Tags\": \"{\\\"campaign_name\\\": \\\"Spring Sale 2022\\\",\\\"message_type\\\": \\\"cart_abandoned\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Tags\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["campaign_name","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Spring Sale 2022","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["message_type","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["cart_abandoned","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWoService":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithMessagingService":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"ContentSid\": \"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\",\n  \"ContentSid\": \"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ContentSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithQueuedStatus":{"value":{"lang":"json","value":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","meta":"","code":"{\n  \"ApplicationSid\": \"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Body\": \"Hello! 👍\",\n  \"From\": \"+14155552345\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"PersistentAction\": [\n    \"mailto:test@example.com\"\n  ],\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+14155552345\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ApplicationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"PersistentAction\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"mailto:test@example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155552345\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageSms":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageMms":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MediaUrl\": [\n    \"https://example.com\"\n  ],\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MediaUrl\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"https://example.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createScheduledMessageWhatsapp":{"value":{"lang":"json","value":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"94287277+15558675310\"\n}","meta":"","code":"{\n  \"Body\": \"Hello! 👍\",\n  \"MessagingServiceSid\": \"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ScheduleType\": \"fixed\",\n  \"StatusCallback\": \"https://example.com\",\n  \"To\": \"94287277+15558675310\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"Hello! 👍\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessagingServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScheduleType\"","#7EE787"],[":","#C9D1D9"]," ",["\"fixed\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"94287277+15558675310\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{"From":["MessagingServiceSid"],"MessagingServiceSid":["From"],"Body":["MediaUrl","ContentSid"],"MediaUrl":["Body","ContentSid"],"ContentSid":["Body","MediaUrl"]}}
```

## Twilio's request to the StatusCallback URL

Whenever a Message resource's `Status` changes, Twilio sends a `POST` request to the Message resource's `StatusCallback` URL.

In a status callback request, Twilio provides a subset of the [standard request properties](/docs/messaging/guides/webhook-request#request-parameters), and additionally `MessageStatus` and `ErrorCode`. These properties are described in the table below.

| Property        | Description                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageStatus` | The [status](/docs/messaging/api/message-resource#message-status-values) of the Message resource at the time the status callback request was sent. |
| `ErrorCode`     | If an error occurred (i.e. the `MessageStatus` is `failed` or `undelivered`), this property provides additional information about the failure.     |

> \[!WARNING]
>
> The properties included in Twilio's request to the StatusCallback URL vary by messaging channel and event type and are subject to change.
>
> Twilio occasionally adds new properties without advance notice.
>
> When integrating with status callback requests, it is important that your implementation is able to accept and correctly run [signature validation](/docs/usage/webhooks/webhooks-security) on an evolving set of parameters.
>
> Twilio strongly recommends using the signature validation methods provided in the SDKs and not implementing your own signature validation.

Learn more about status callbacks:

* [Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks)
* [Track the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status)

### SMS/MMS

For most SMS/MMS Messages that have a `Status` of `delivered` or `undelivered`, Twilio's request to the `StatusCallback` URL contains an additional property:

| Property         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RawDlrDoneDate` | This property is a passthrough of the Done Date included in the DLR (Delivery Receipt) that Twilio received from the carrier.<br /><br /> The value is in `YYMMDDhhmm` format.<ul><li>`YY` is last two digits of the year (00-99)</li><li>`MM` is the two-digit month (01-12)</li><li>`DD` is the two-digit day (01-31)</li><li>`hh` is the two-digit hour (00-23)</li><li>`mm` is the two-digit minute (00-59).</li></ul> Learn more on the ["Addition of RawDlrDoneDate to Delivered and Undelivered Status Webhooks" Changelog page](https://www.twilio.com/en-us/changelog/addition-of-rawdlrdonedate-to-delivered-and-undelivered-status-webhooks). |

### WhatsApp and other messaging channels

If the Message resource uses RCS, WhatsApp, or another messaging channel, Twilio's request to the `StatusCallback` URL contains additional properties. These properties are listed in the table below.

| Property               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ChannelInstallSid`    | The [Installed Channel](/docs/messaging/channels) SID that was used to send this message                                                                                                                     |
| `ChannelStatusMessage` | The error message returned by the underlying messaging channel if Message delivery failed. This property is present only if the Message delivery failed.                                                     |
| `ChannelPrefix`        | The channel-specific prefix identifying the messaging channel associated with this Message                                                                                                                   |
| `EventType`            | This property contains information about post-delivery events. If the channel supports read receipts (currently RCS and WhatsApp), this property's value is `READ` after the recipient has read the message. |

## Send an SMS message

The example below shows how to create a Message resource with an SMS **recipient**.

Sending this `POST` request causes Twilio to send a text message from `+15557122661` (a Twilio phone number belonging to the Account sending the request) to `+15558675310`. The **content** of the text message is `Hi there`.

Send an SMS message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hi there",
    from: "+15557122661",
    to: "+15558675310",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="+15557122661", body="Hi there", to="+15558675310"
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("+15557122661"),
            body: "Hi there",
            to: new Twilio.Types.PhoneNumber("+15558675310"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15558675310"),
                                  new com.twilio.type.PhoneNumber("+15557122661"),
                                  "Hi there")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetFrom("+15557122661")
	params.SetBody("Hi there")
	params.SetTo("+15558675310")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+15558675310", // To
    [
        "from" => "+15557122661",
        "body" => "Hi there",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            from: '+15557122661',
            body: 'Hi there',
            to: '+15558675310'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from +15557122661 \
   --body "Hi there" \
   --to +15558675310
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=+15557122661" \
--data-urlencode "Body=Hi there" \
--data-urlencode "To=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hi there",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15557122661",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Send an RCS message

After completing the setup and configuration steps in the [Programmable Messaging RCS Onboarding Guide
](/docs/rcs/onboarding), you can send a [Rich Communication Services (RCS)](/docs/rcs) message by creating a new Message resource. Set the `MessageServiceSid` or `From` parameter to the SID of the Messaging Service associated with your RCS Sender. To find your Messaging Service's SID, check the **Sid** column on the [Messaging Services page](https://www.twilio.com/console/sms/services) in the Console.

Programmable Messaging proactively checks if the recipient's device can support RCS, and will send the message using SMS as a fallback if needed.

Send an RCS message using the MessageServiceSid parameter

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "My first RCS message. Hello, world!",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world!",
    to="+155XXXXXXXX",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "My first RCS message. Hello, world!",
            to: new Twilio.Types.PhoneNumber("+155XXXXXXXX"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+155XXXXXXXX"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "My first RCS message. Hello, world!")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("My first RCS message. Hello, world!")
	params.SetTo("+155XXXXXXXX")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+155XXXXXXXX", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "My first RCS message. Hello, world!",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'My first RCS message. Hello, world!',
            to: '+155XXXXXXXX'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "My first RCS message. Hello, world$EXCLAMATION_MARK" \
   --to +155XXXXXXXX
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=My first RCS message. Hello, world$EXCLAMATION_MARK" \
--data-urlencode "To=+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "My first RCS message. Hello, world!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+155XXXXXXXX",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Send an RCS message using the From parameter

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "My first RCS message. Hello, world!",
    from: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+155XXXXXXXX",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world!",
    to="+155XXXXXXXX",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),
            body: "My first RCS message. Hello, world!",
            to: new Twilio.Types.PhoneNumber("+155XXXXXXXX"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+155XXXXXXXX"),
                                  new com.twilio.type.PhoneNumber("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),
                                  "My first RCS message. Hello, world!")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetFrom("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("My first RCS message. Hello, world!")
	params.SetTo("+155XXXXXXXX")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+155XXXXXXXX", // To
    [
        "from" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "My first RCS message. Hello, world!",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            from: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'My first RCS message. Hello, world!',
            to: '+155XXXXXXXX'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "My first RCS message. Hello, world$EXCLAMATION_MARK" \
   --to +155XXXXXXXX
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=My first RCS message. Hello, world$EXCLAMATION_MARK" \
--data-urlencode "To=+155XXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "My first RCS message. Hello, world!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+155XXXXXXXX",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Send a WhatsApp message

If you have a [Twilio-approved WhatsApp sender](/docs/whatsapp#whatsapp-sender-registration), you can send WhatsApp messages by creating a new Message resource. ([WhatsApp session limitations](/docs/whatsapp/key-concepts) apply.)

The `From` parameter value must be your approved WhatsApp sender address (e.g., `whatsapp:+15552221111`).

The `To` parameter value must be a WhatsApp recipient address (e.g., `whatsapp:+15553334444`).

You must also provide message content via the `Body` and/or `MediaUrl` parameters.

If you're using [Messaging Services](/docs/messaging/services) with [Content API/Content Editor](/docs/content), you can provide message content via the `contentSid` and `contentVariables` parameters.

**Note:** WhatsApp does not support including a text body in the same message as a video, audio file, document, contact (vCard), or location. If you pass the `Body` parameter on a message with one of these media types, the body is ignored and not delivered to the recipient.

Send a WhatsApp Message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "This is a WhatsApp message sent with Twilio!",
    from: "whatsapp:+15555238886",
    to: "whatsapp:+15557770006",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="This is a WhatsApp message sent with Twilio!",
    from_="whatsapp:+15555238886",
    to="whatsapp:+15557770006",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            body: "This is a WhatsApp message sent with Twilio!",
            from: new Twilio.Types.PhoneNumber("whatsapp:+15555238886"),
            to: new Twilio.Types.PhoneNumber("whatsapp:+15557770006"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15557770006"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+15555238886"),
                                  "This is a WhatsApp message sent with Twilio!")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetBody("This is a WhatsApp message sent with Twilio!")
	params.SetFrom("whatsapp:+15555238886")
	params.SetTo("whatsapp:+15557770006")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "whatsapp:+15557770006", // To
    [
        "body" => "This is a WhatsApp message sent with Twilio!",
        "from" => "whatsapp:+15555238886",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            body: 'This is a WhatsApp message sent with Twilio!',
            from: 'whatsapp:+15555238886',
            to: 'whatsapp:+15557770006'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "This is a WhatsApp message sent with Twilio$EXCLAMATION_MARK" \
   --from whatsapp:+15555238886 \
   --to whatsapp:+15557770006
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=This is a WhatsApp message sent with Twilio$EXCLAMATION_MARK" \
--data-urlencode "From=whatsapp:+15555238886" \
--data-urlencode "To=whatsapp:+15557770006" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "This is a WhatsApp message sent with Twilio!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+15555238886",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15557770006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Send a message with a Messaging Service

When sending a message with a [Messaging Service](/docs/messaging/services), you must provide a **recipient** via the `To` parameter and **content** via the `Body`, `ContentSid`, or `MediaUrl` parameters. In addition, you must provide the `MessagingServiceSid`.

If you provide a `MessagingServiceSid` and no `From` parameter, Twilio determines the optimal `From` value from your Sender Pool. In this case, the Message resource's initial `Status` value is `accepted`.

Optionally, you can provide a `MessagingServiceSid` *and* a `From` parameter. The `From` parameter must be a sender from your Messaging Service's Sender Pool. In this case, the Message resource's initial `Status` value is `queued`.

With Messaging Services, you can also [schedule messages to be sent in the future](/docs/messaging/features/message-scheduling) and [send messages with shortened links](/docs/messaging/features/link-shortening).

Send a message with a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hello! This is a message sent from a Messaging Service.",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+15551212121",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="+15551212121",
    body="Hello! This is a message sent from a Messaging Service.",
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("+15551212121"),
            body: "Hello! This is a message sent from a Messaging Service.");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15551212121"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "Hello! This is a message sent from a Messaging Service.")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetTo("+15551212121")
	params.SetBody("Hello! This is a message sent from a Messaging Service.")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages->create(
    "+15551212121", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "Hello! This is a message sent from a Messaging Service.",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            to: '+15551212121',
            body: 'Hello! This is a message sent from a Messaging Service.'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to +15551212121 \
   --body "Hello$EXCLAMATION_MARK This is a message sent from a Messaging Service."
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "To=+15551212121" \
--data-urlencode "Body=Hello$EXCLAMATION_MARK This is a message sent from a Messaging Service." \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello! This is a message sent from a Messaging Service.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15551212121",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Fetch a Message resource

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json`

Returns a single Message resource specified by the provided Message `SID`.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Message resource to be fetched","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a specific Message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchMessage() {
  const message = await client
    .messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(message.body);
}

fetchMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message =
            await MessageResource.FetchAsync(pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.fetcher("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.FetchMessageParams{}

	resp, err := client.Api.FetchMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->fetch();

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:fetch \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "testing",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": "Fri, 24 May 2019 17:18:28 +0000",
  "date_updated": "Fri, 24 May 2019 17:18:28 +0000",
  "direction": "outbound-api",
  "error_code": 30007,
  "error_message": "Carrier violation",
  "from": "+12019235161",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": "-0.00750",
  "price_unit": "USD",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

## Read multiple Message resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json`

Read multiple Message resources by sending a `GET` request to your Account's Messages list URI.

Results are sorted by the `DateSent` field, with the most recent messages appearing first.

> \[!WARNING]
>
> If you are using the Twilio REST API and plan on requesting more records than will fit on a single page, you may want to use the response's [nextpageuri](/docs/usage/twilios-response#pagination) property. Requesting this URI ensures that your next request picks up where it left off and can prevent you from retrieving duplicate data if you are actively sending or receiving messages.
>
> This is not necessary if you are using one of the SDKs, which automatically handle pagination. Take a look at the [SDK documentation](/docs/libraries) for more information.

You can also filter the Messages list by providing the following query string parameters to the listing resource:

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resources.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"To","in":"query","description":"Filter by recipient. For example: Set this parameter to `+15558881111` to retrieve a list of Message resources sent to `+15558881111`.","schema":{"type":"string","format":"phone-number"},"x-twilio":{"pii":{"handling":"standard","deleteSla":120}},"examples":{"readFullPage1":{"value":"+123456789"},"readEmptySentdateLess":{"value":"+123456789"},"readEmptySentdateEquals":{"value":"+123456789"},"readEmptySentdateGreater":{"value":"+123456789"},"readEmptySentdateGreaterFormat1":{"value":"+123456789"},"readEmptySentdateGreaterFormat2":{"value":"+123456789"},"readEmptySentdateGreaterFormat3":{"value":"+123456789"}}},{"name":"From","in":"query","description":"Filter by sender. For example: Set this parameter to `+15552229999` to retrieve a list of Message resources sent by `+15552229999`.","schema":{"type":"string","format":"phone-number"},"x-twilio":{"pii":{"handling":"standard","deleteSla":120}},"examples":{"readFullPage1":{"value":"+987654321"},"readEmptySentdateLess":{"value":"+987654321"},"readEmptySentdateEquals":{"value":"+987654321"},"readEmptySentdateGreater":{"value":"+987654321"},"readEmptySentdateGreaterFormat1":{"value":"+987654321"},"readEmptySentdateGreaterFormat2":{"value":"+987654321"},"readEmptySentdateGreaterFormat3":{"value":"+987654321"}}},{"name":"DateSent","in":"query","description":"Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).","schema":{"type":"string","format":"date-time"},"examples":{"readEmptySentdateEquals":{"value":"2008-01-02"}}},{"name":"DateSent<","in":"query","description":"Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).","schema":{"type":"string","format":"date-time"},"examples":{"readEmptySentdateLess":{"value":"2008-01-02"}}},{"name":"DateSent>","in":"query","description":"Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).","schema":{"type":"string","format":"date-time"},"examples":{"readFullPage1":{"value":"2008-01-02"},"readEmptySentdateGreater":{"value":"2008-01-02"},"readEmptySentdateGreaterFormat1":{"value":"06/11/2019 22:05:25 MST"},"readEmptySentdateGreaterFormat2":{"value":"2019-06-11 22:05:25.000"},"readEmptySentdateGreaterFormat3":{"value":"Wed, 19 Jun 2019 22:04:00 -0000"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Message resources

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMessage() {
  const messages = await client.messages.list({ limit: 20 });

  messages.forEach((m) => console.log(m.end));
}

listMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.messages.list(limit=20)

for record in messages:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messages = await MessageResource.ReadAsync(limit: 20);

        foreach (var record in messages) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Message> messages = Message.reader().limit(20).read();

        for (Message record : messages) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListMessageParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$messages = $twilio->messages->read([], 20);

foreach ($messages as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

messages = @client
           .api
           .v2010
           .messages
           .list(limit: 20)

messages.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

List Message resources matching filter criteria

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMessage() {
  const messages = await client.messages.list({
    dateSent: new Date("2016-08-31 00:00:00"),
    from: "+15017122661",
    to: "+15558675310",
    limit: 20,
  });

  messages.forEach((m) => console.log(m.end));
}

listMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.messages.list(
    to="+15558675310",
    from_="+15017122661",
    date_sent=datetime(2016, 8, 31, 0, 0, 0),
    limit=20,
)

for record in messages:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messages = await MessageResource.ReadAsync(
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            dateSent: new DateTime(2016, 8, 31, 0, 0, 0, DateTimeKind.Utc),
            limit: 20);

        foreach (var record in messages) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Message> messages = Message.reader()
                                            .setTo(new com.twilio.type.PhoneNumber("+15558675310"))
                                            .setFrom(new com.twilio.type.PhoneNumber("+15017122661"))
                                            .setDateSent(ZonedDateTime.of(2016, 8, 31, 0, 0, 0, 0, ZoneId.of("UTC")))
                                            .limit(20)
                                            .read();

        for (Message record : messages) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListMessageParams{}
	params.SetTo("+15558675310")
	params.SetFrom("+15017122661")
	params.SetDateSent(time.Date(2016, 8, 31, 0, 0, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$messages = $twilio->messages->read(
    [
        "to" => "+15558675310",
        "from" => "+15017122661",
        "dateSent" => new \DateTime("2016-08-31T00:00:00Z"),
    ],
    20
);

foreach ($messages as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

messages = @client
           .api
           .v2010
           .messages
           .list(
             to: '+15558675310',
             from: '+15017122661',
             date_sent: Time.new(2016, 8, 31, 0, 0, 0),
             limit: 20
           )

messages.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:list \
   --to +15558675310 \
   --from +15017122661 \
   --date-sent 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json?To=%2B15558675310&From=%2B15017122661&DateSent=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

List Messages that were sent before a specific date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMessage() {
  const messages = await client.messages.list({
    dateSentBefore: new Date("2009-07-06 20:30:00"),
    limit: 20,
  });

  messages.forEach((m) => console.log(m.end));
}

listMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.messages.list(
    date_sent_before=datetime(2009, 7, 6, 20, 30, 0), limit=20
)

for record in messages:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messages = await MessageResource.ReadAsync(
            dateSentBefore: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc), limit: 20);

        foreach (var record in messages) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Message> messages =
            Message.reader()
                .setDateSentBefore(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC")))
                .limit(20)
                .read();

        for (Message record : messages) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListMessageParams{}
	params.SetDateSentBefore(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$messages = $twilio->messages->read(
    ["dateSentBefore" => new \DateTime("2009-07-06T20:30:00Z")],
    20
);

foreach ($messages as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

messages = @client
           .api
           .v2010
           .messages
           .list(
             date_sent_before: Time.new(2009, 7, 6, 20, 30, 0),
             limit: 20
           )

messages.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:list \
   --date-sent-before 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json?DateSent<=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

List Messages within a specific time period

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMessage() {
  const messages = await client.messages.list({
    dateSentBefore: new Date("2021-01-17 01:23:45"),
    dateSentAfter: new Date("2021-01-15 01:23:45"),
    limit: 20,
  });

  messages.forEach((m) => console.log(m.end));
}

listMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.messages.list(
    date_sent_before=datetime(2021, 1, 17, 1, 23, 45),
    date_sent_after=datetime(2021, 1, 15, 1, 23, 45),
    limit=20,
)

for record in messages:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messages = await MessageResource.ReadAsync(
            dateSentBefore: new DateTime(2021, 1, 17, 1, 23, 45, DateTimeKind.Utc),
            dateSentAfter: new DateTime(2021, 1, 15, 1, 23, 45, DateTimeKind.Utc),
            limit: 20);

        foreach (var record in messages) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Message> messages =
            Message.reader()
                .setDateSentBefore(ZonedDateTime.of(2021, 1, 17, 1, 23, 45, 0, ZoneId.of("UTC")))
                .setDateSentAfter(ZonedDateTime.of(2021, 1, 15, 1, 23, 45, 0, ZoneId.of("UTC")))
                .limit(20)
                .read();

        for (Message record : messages) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListMessageParams{}
	params.SetDateSentBefore(time.Date(2021, 1, 17, 1, 23, 45, 0, time.UTC))
	params.SetDateSentAfter(time.Date(2021, 1, 15, 1, 23, 45, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$messages = $twilio->messages->read(
    [
        "dateSentBefore" => new \DateTime("2021-01-17T01:23:45Z"),
        "dateSentAfter" => new \DateTime("2021-01-15T01:23:45Z"),
    ],
    20
);

foreach ($messages as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

messages = @client
           .api
           .v2010
           .messages
           .list(
             date_sent_before: Time.new(2021, 1, 17, 1, 23, 45),
             date_sent_after: Time.new(2021, 1, 15, 1, 23, 45),
             limit: 20
           )

messages.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:list \
   --date-sent-before 2016-07-31 \
   --date-sent-after 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json?DateSent<=2016-07-31&DateSent>=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

## Update a Message resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json`

Updates the body of a Message resource. Send a `POST` request to a Message resource's URI containing the updated parameters.

This action is primarily used to redact Message content. To redact a Message resource's `Body`, send a `POST` request to the Message resource's URI and set the `Body` parameter as an empty string: `""`. This redacts the `Body` of a message while keeping the other [Message resource properties](#message-properties) intact.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Message resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Message resource to be updated","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateMessageRequest","properties":{"Body":{"type":"string","description":"The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Status":{"type":"string","enum":["canceled"],"refName":"message_enum_update_status","modelName":"message_enum_update_status"}}},"examples":{"redactBody":{"value":{"lang":"json","value":"{\n  \"Body\": \"\"\n}","meta":"","code":"{\n  \"Body\": \"\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"cancelMessage":{"value":{"lang":"json","value":"{\n  \"Status\": \"canceled\"\n}","meta":"","code":"{\n  \"Status\": \"canceled\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"canceled\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Redact the body of a Message resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateMessage() {
  const message = await client
    .messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ body: "" });

  console.log(message.body);
}

updateMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(body="")

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.UpdateAsync(
            body: "", pathSid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.updater("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setBody("").update();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateMessageParams{}
	params.SetBody("")

	resp, err := client.Api.UpdateMessage("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$message = $twilio
    ->messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(["body" => ""]);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages('SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(body: '')

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:update \
   --sid SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body ""
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "Body=" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": "Fri, 24 May 2019 17:18:28 +0000",
  "date_updated": "Fri, 24 May 2019 17:18:28 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+12019235161",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": "USD",
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

## Delete a Message resource

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json`

To delete a Message resource, send a `DELETE` request to the Message resource's URI.

If the `DELETE` request is successful, Twilio's response status code is `HTTP 204 (No Content)`.

A deleted Message resource no longer appears in your Account's Messaging logs. Deleted messages cannot be recovered.

Deleting a Message resource also deletes any associated Media and/or MessageFeedback sub-resources. Any associated media file is also deleted unless the same media file is associated with another Message resource in your Account. For example, if you send 1,000 messages with the same media file (e.g., a `.jpeg` file), that media file remains accessible until all 1,000 associated Message resources (and/or the associated Media sub-resources) are deleted.

> \[!WARNING]
>
> Message bodies may persist for up to 30 days after an HTTP `DELETE` request in our database backups.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Message resource you wish to delete","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$"},"required":true}]
```

Deletes a Message resource from your account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteMessage() {
  await client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await MessageResource.DeleteAsync(pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message.deleter("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.DeleteMessageParams{}

	err := client.Api.DeleteMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .api
  .v2010
  .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:remove \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
