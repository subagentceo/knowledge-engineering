# TwiML™ Voice: \<Connect>

> \[!NOTE]
>
> `<Connect><Stream>` and `<Connect><ConversationRelay>` are now available in the Ireland (IE1) and Australia (AU1) Regions.
>
> * For outbound calls, follow the [guide for outbound calls in non-US Regions](/docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region).
> * For inbound calls, follow the [guide for inbound call processing in non-US Regions](/docs/global-infrastructure/inbound-call-processing).
> * For more information on Twilio Regions, see the [Global Infrastructure docs](/docs/global-infrastructure).
>
> Regional support is **not** available for `<Room>`, or `<VirtualAgent>`. See [Regional Product and Feature Availability](/docs/global-infrastructure/regional-product-and-feature-availability) for details.

`<Connect>` is a [TwiML verb](/docs/voice/twiml) that works together with nested TwiML nouns to connect Voice calls (over [PSTN](/docs/glossary/what-is-pstn) or [SIP](/docs/glossary/what-is-session-initiation-protocol-sip)) to other Twilio services or external services.

## `<Connect>` attributes

`<Connect>` supports the following attributes that change its behavior:

| Attribute         | Allowed Values           | Default Value |
| :---------------- | :----------------------- | :------------ |
| [action](#action) | Relative or absolute URL | None          |
| [method](#method) | `GET`, `POST`            | `POST`        |

### action

The `action` attribute accepts an absolute or relative URL as a value. When the `<Connect>` verb ends, Twilio sends an HTTP request to this URL with [Twilio's standard request parameters](/docs/voice/twiml#request-parameters) along with some parameters specific to the nested noun.

If you do not provide an `action` URL, `<Connect>` will finish and Twilio will move on to the next TwiML verb in the document. If there is no further verb, Twilio will end the phone call.

### method

The `method` attribute specifies how Twilio will request the `action` URL: either using HTTP `GET` or `POST`. By default, Twilio uses `POST`.

## Connect Nouns

The nouns that you can nest inside of `<Connect>` are listed in the table below. Click on a TwiML noun to see its docs page and how to use the noun with \<Connect>.

| Noun                                                                 | Description                                                                                                                   |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [`<ConversationRelay>`](/docs/voice/twiml/connect/conversationrelay) | `<Connect><ConversationRelay>` connects a call to a [Conversation Relay service](/docs/voice/twiml/connect/conversationrelay) |
| [`<Room>`](/docs/voice/twiml/connect/room)                           | `<Connect><Room>` connects a call to a [Programmable Video Room](/docs/voice/twiml/connect/room)                              |
| [`<Stream>`](/docs/voice/twiml/stream)                               | `<Connect><Stream>` starts a bidirectional [MediaStream](/docs/voice/twiml/stream)                                            |
| [`<VirtualAgent>`](/docs/voice/twiml/connect/virtualagent)           | `<Connect><VirtualAgent>` connects a call to a [Dialogflow VirtualAgent](/docs/voice/twiml/stream/connect-to-dialogflow)      |
