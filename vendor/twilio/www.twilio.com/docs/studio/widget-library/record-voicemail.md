# Record Voicemail widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The Record Voicemail widget allows you to record voicemail audio from a caller and, optionally, transcribe it.

![A rectangular widget 'record\_voicemail'. Attached transition anchors read 'recording complete,' 'no audio,' & 'hangup.'.](https://docs-resources.prod.twilio.com/d4d7ad20f10969081be93eb217ae1d1c47732922750ac6b67450b2cc75ea5c2f.jpg)

## Optional configuration for Record Voicemail

While the Record Voicemail widget doesn't require any configuration to work other than an entry transition, several optional configuration settings can help you customize the experience in your Studio Flow.

| Name                                         | Description                                                                                                                     | Supported Values                                                                              | Default      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------ |
| Stop recording after \_\_ seconds of silence | The number of seconds this widget will wait when it detects silence from your caller before terminating the voicemail recording | Any integer, representing seconds                                                             | 5            |
| Stop recording on keypress                   | The phone key a user should press to stop recording their voicemail                                                             | 0-9, #, \*                                                                                    | None         |
| Max recording length                         | Maximum length of a recording (in seconds)                                                                                      | Any integer between 1 and 14,400, representing seconds                                        | 3600         |
| Transcribe audio to text                     | Turn this on to transcribe the caller's recording                                                                               | On / Off                                                                                      | Off          |
| Transcription callback URL                   | Only available if transcription is enabled. The URL where Twilio should send the callback with transcription results            | Any accessible URL                                                                            | None         |
| Trim                                         | Trim silence from the end of a recording                                                                                        | Trim silence / Do not trim                                                                    | Trim silence |
| Play beep                                    | Play a beep to the caller before recording                                                                                      | True / False                                                                                  | True         |
| Recording status callback                    | The URL that should receive a callback with the recording, once complete                                                        | Any valid URL or [liquid template variable](/docs/studio/user-guide/liquid-template-language) | None         |

> \[!NOTE]
>
> Studio does not automatically handle transcription processing, but you can specify the transcription callback URL and handle it yourself when the transcription is available. You may wish to [use a Function to customize what happens once after a voicemail has been recorded](https://www.twilio.com/blog/forward-voicemail-recordings-to-email).

## Record Voicemail Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio Transitions, see the [Getting Started Guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name                                              | Description                                             |
| ------------------------------------------------- | ------------------------------------------------------- |
| Recording complete                                | The caller has finished recording their voicemail       |
| No audio (applies only to legacy Twilio accounts) | No voicemail is recorded due to silence from the caller |
| Hangup                                            | The caller terminated the call by hanging up            |

## Record Voicemail Variables

If you wish to play back a voicemail later in the Studio Flow where you recorded the voicemail, you can access the audio file from a [Say/Play widget](/docs/studio/widget-library/sayplay) using the `variable widgets.MY_WIDGET_NAME.RecordingUrl`.

When the Record Voicemail widget executes, it will have stored the following variables for use throughout your Studio Flow. When accessing these variables, make sure you replace `MY_WIDGET_NAME` with the name of your widget. For more information on working with variables in Studio, see the [Getting Started Guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Call Recording](/docs/voice/api/recording#recording-properties) page.

| Name               | Liquid Template Language                         |
| ------------------ | ------------------------------------------------ |
| Account SID        | \{\{widgets.MY\_WIDGET\_NAME.AccountSid}}        |
| API Version        | \{\{widgets.MY\_WIDGET\_NAME.ApiVersion}}        |
| Call SID           | \{\{widgets.MY\_WIDGET\_NAME.CallSid}}           |
| Call Status        | \{\{widgets.MY\_WIDGET\_NAME.CallStatus}}        |
| Channels           | \{\{widgets.MY\_WIDGET\_NAME.Channels}}          |
| Date Created       | \{\{widgets.MY\_WIDGET\_NAME.DateCreated}}       |
| Date Updated       | \{\{widgets.MY\_WIDGET\_NAME.DateUpdated}}       |
| Price              | \{\{widgets.MY\_WIDGET\_NAME.Price}}             |
| Price Unit         | \{\{widgets.MY\_WIDGET\_NAME.PriceUnit}}         |
| Recording URL      | \{\{widgets.MY\_WIDGET\_NAME.RecordingUrl}}      |
| Recording Duration | \{\{widgets.MY\_WIDGET\_NAME.RecordingDuration}} |
| SID                | \{\{widgets.MY\_WIDGET\_NAME.Sid}}               |
| Source             | \{\{widgets.MY\_WIDGET\_NAME.Source}}            |
| URI                | \{\{widgets.MY\_WIDGET\_NAME.Uri}}               |

## Example: forward voicemail recordings

This Studio Flow takes an incoming phone call, prompts the caller to leave a voicemail, and then forwards the voicemail to a Twilio Function.

![A Studio Flow that takes an incoming call, reads a greeting, records a voicemail, and sends the recording to a Function.](https://docs-resources.prod.twilio.com/6441a3ecaf1b185a3272a416fa67267ee5ccfdb267806a74ba9f73441dd67552.png)

## Learn more

Looking to learn how to record voicemails in Studio in a real-world example?

* Follow this blog post to see [how to forward voicemails to your email using Studio, Functions, and SendGrid](https://www.twilio.com/blog/forward-voicemail-recordings-to-email).

Let's build something amazing.
