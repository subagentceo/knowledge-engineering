# Media Streams Overview

Media Streams provides access to the raw audio from a Programmable Voice call by streaming it over WebSockets to a destination you specify. This enables use cases such as real-time transcriptions, sentiment analysis, voice authentication, and more. You can also stream raw audio into a Twilio Voice call from another application, enabling conversational Interactive Voice Response (IVR) or real-time interactions with an AI chatbot.

> \[!NOTE]
>
> You can use [Media Streams][regional-availability] in the Ireland (`IE1`) and Australia (`AU1`) [Regions][twilio-regions]. To set up Media Streams with these regions, follow the guides for non-US [outbound][non-us-outgoing] and [inbound][non-us-incoming] calls. The [default region][default-region] remains `US1`.

[non-us-outgoing]: /docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region

[non-us-incoming]: /docs/global-infrastructure/inbound-call-processing

[twilio-regions]: /docs/global-infrastructure/understanding-twilio-regions

[default-region]: /docs/global-infrastructure/understanding-twilio-regions#use-the-default-twilio-region

[regional-availability]: /docs/global-infrastructure/regional-product-and-feature-availability

To get started with Media Streams, first make sure you're familiar with making and receiving voice calls with Twilio. If this is your first time building with Twilio Programmable Voice, complete one of the [Voice quickstarts](/docs/voice/quickstart).

Before you build with Media Streams, decide whether you need a unidirectional or bidirectional stream. The sections below explain the differences between each option and provide links to helpful docs and resources.

## Unidirectional Media Streams

In a unidirectional Media Stream, your WebSocket application receives the call's audio but can't send audio back to Twilio for playback.

With unidirectional Media Streams, you can receive the inbound audio [track](/docs/voice/twiml/stream#track) (the audio that is incoming to Twilio), the outbound audio track (the audio that Twilio is generating on the call), or both tracks.

DTMF isn't supported with unidirectional streams.

Start a unidirectional stream with the `<Start><Stream>` TwiML verb or through the [Stream resource](/docs/voice/api/stream-resource) REST API.

If you use TwiML for the stream, Twilio executes `<Start><Stream>`, which initiates the audio stream with your WebSocket server, and then executes the next TwiML instruction you provide.

You can stop a unidirectional Media Stream using `<Stop><Stream>` or via the [Stream resource](/docs/voice/api/stream-resource#update-a-stream-resource).

### Resources for unidirectional Media Streams

Use the following resources to build your unidirectional Media Streams application:

* [\<Stream> TwiML Reference](/docs/voice/twiml/stream)
* [Stream Resource API Reference](/docs/voice/api/stream-resource)
* [WebSocket Messages](/docs/voice/media-streams/websocket-messages)
  * Learn about the format and contents of the WebSocket messages that Twilio sends to your server

Sample applications are available in the following languages:

* [Node.js](https://github.com/twilio/media-streams/tree/master/node/basic)
* [Python](https://github.com/twilio/media-streams/tree/master/python/basic)
* [Java](https://github.com/twilio/media-streams/tree/master/java/basic)

## Bidirectional Media Streams

Bidirectional Media Streams are those in which your WebSocket application both receives audio from Twilio and can send audio to Twilio, which is then played on the Call. An example use case for bidirectional Media Streams is to facilitate a real-time voice conversation with an AI assistant.

With bidirectional Media Streams, you can only receive the inbound [track](/docs/voice/twiml/stream#track).

[DTMF](/docs/voice/media-streams/websocket-messages#dtmf-message) is supported with bidirectional Media Streams only in the inbound direction, from Twilio toward your media server. Sending DTMF outbound from your media server toward Twilio is not supported.

To start a bidirectional Media Stream, use `<Connect><Stream>`. These TwiML instructions block subsequent TwiML instructions unless the WebSocket connection is disconnected.

You *can't* use the Stream resource to start a bidirectional Media Stream.

You can stop a bidirectional Media Stream by closing the WebSocket connection from your server or by ending the Call.

### Resources for bidirectional Media Streams

Check out the following resources to help you build your bidirectional Media Streams application:

* [\<Stream> TwiML Reference](/docs/voice/twiml/stream)
* [WebSocket Messages](/docs/voice/media-streams/websocket-messages)
  * The ["Send WebSocket messages to Twilio" section](/docs/voice/media-streams/websocket-messages#send-websocket-messages-to-twilio) covers how to send audio back to Twilio.
* [Basic bidirectional stream sample application](https://github.com/twilio/media-streams/tree/master/node/connect-basic)

## Limits

For unidirectional Streams, you can stream up to four [tracks](/docs/voice/twiml/stream#track) at a time on a Call.

For bidirectional Streams, you can have only one Stream per Call.

Each Media Stream is associated with one WebSocket connection.

## Communicate with Twilio's media servers

Your Media Streams application must be able to communicate with Twilio.

Configure your firewall rules to allow secure WebSocket connections (TCP port 443) from Twilio to your WebSocket servers from any public IP address.

You must also configure your application to validate the `X-Twilio-Signature` header. This is how your application verifies that a Media Stream is coming from an authentic Twilio source. Learn more on the [General Usage - Security page](/docs/usage/security#validating-requests).

## Next steps

Explore these resources to learn more about Media Streams:

* [\<Stream> TwiML Reference](/docs/voice/twiml/stream)
* [WebSocket Messages](/docs/voice/media-streams/websocket-messages)
  * Learn about the format and contents of the WebSocket messages that Twilio sends to your server, as well as the messages your application can send back to Twilio.
* [Stream Resource API Reference](/docs/voice/api/stream-resource)
* [Sample application GitHub repo](https://github.com/twilio/media-streams)
