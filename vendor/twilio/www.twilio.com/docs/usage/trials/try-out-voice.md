# Try out Twilio Voice

To see how Voice works, you can try it out with just a few clicks. You'll be able to send and receive your first calls within a few minutes.

As you make calls, you'll be able to see the API request and response that Twilio uses, as well as the TwiML webhook. You can build using our API reference and [TwiML Bins guide](/docs/serverless/twiml-bins/getting-started), knowing that everything you create can easily transfer to a fully featured account when you upgrade.

For details about trial free units, restrictions, the 30-day expiration, and post-upgrade free units, see [Twilio trial account](/docs/usage/trials).

To get started, go to the [Twilio Console](https://1console.twilio.com/) and click **Voice**. Under **Popular channels**, locate **Voice API** and click **Try out Voice**.

During your Voice trial:

* You can only make or receive calls from verified numbers. To verify a number, Twilio will send a verification code to that number that you must enter on the page.
  * Each account can verify up to five numbers. Verified numbers are shared across Voice and Messaging.
  * The phone number that you signed up with is automatically added as a verified number.
  * If you have multiple accounts, you can use the same verified number for up to three accounts, including subaccounts. If you sign up for a fourth Twilio account with the same number, your number is not added as a verified number.
* Your call is placed from a Twilio trial phone number. Once you upgrade your account, calls will be placed from a Twilio number that you've purchased.
  * Verified recipients are shared across Voice and Messaging, but the trial numbers used for outgoing messages and calls may not be the same. Make sure you use the correct number for the product you're testing.
* You can only make calls within your country.
* You can use Twilio-provided Voice templates or [custom TwiML with restrictions](#custom-twiml-during-trial). Some TwiML verbs are blocked during the trial.

When you're ready, you can upgrade your account to gain access to all Voice functionality.

At any time, click **Logs** to view Voice logs or **Free units tracker** to see how many call minutes you have left in your trial.

## Step 1: Make a trial call

On the **Start a call** page, follow the on-screen instructions to configure settings and make a call.

Note that the API request and response for your call appear on the page. Click the **Guide** tab to learn more about the TwiML webhook that you selected.

## Step 2: Receive a trial call

To test receiving an inbound call on the Try out Voice page, first select the **Inbound** radio button at the top of the **Try Out Voice** panel. Next, use the From dropdown to choose your verified phone number, which is the physical device you'll use to make the test call. Under Select a test scenario, choose your preferred test type (such as Quick tests, Use cases, or Custom) and pick a specific option from the dropdown menu, like "Speech Recognition." Once configured, click the blue Save button at the bottom left, and then use your verified phone to dial the Twilio trial number to hear the response in real-time.

## Using the Voice API

During your trial, you can use the [Call resource](/docs/voice/api/call-resource) with some limitations and key differences. The simplest way to build during your trial is to copy your request from the code block on the Try out Voice page, then make adjustments as needed.

You can build in your trial environment, then upgrade to a fully featured account when you're ready. Once trial limitations no longer apply, you can create your own TwiML instructions and set additional parameters that were not supported in your trial.

### Make a call

This request uses the [Create a Call resource](/docs/voice/api/call-resource#create-a-call). During your trial, you can only use or change the following parameters:

* `to`: (Required) The recipient's phone number in [E.164](/docs/glossary/what-e164) format.
* `sample call instructions`: (Required) Must specify one of the following Twilio TwiML webhook URLs:
* `https://webhooks.twilio.com/v1/Voice/Template/voice_speech_recognition`
* `https://webhooks.twilio.com/v1/Voice/Template/voice_text_to_speech`
* `https://webhooks.twilio.com/v1/Voice/Template/voice_keyboard_input`
* `https://webhooks.twilio.com/v1/Voice/Template/voice_play_audio`
* `statusCallback`: (Optional) URL to `POST` message status updates (for example, delivered or failed).

## Custom TwiML during trial

Trial accounts support custom TwiML. The following sections describe exactly what is supported for each verb, including attributes, limits, and restrictions.

### Global limits

| Limit                | Value      | Description                                                                                          |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| Max hops             | 10         | Maximum number of action/redirect URL chains before the call is terminated. Prevents infinite loops. |
| TwiML fetch timeout  | 5 seconds  | Maximum time to wait when fetching TwiML from your server.                                           |
| TwiML max size       | 64 KB      | Maximum size of a TwiML response.                                                                    |
| Per-call time limit  | 10 minutes | Enforced by real-time monitoring infrastructure.                                                     |
| Total voice quota    | 75 minutes | Per trial account. Calls are terminated automatically when exhausted.                                |
| Max concurrent calls | 5          | Per trial account, enforced at the application layer.                                                |

### Supported verbs

#### `<Say>` — Text-to-Speech

| Aspect             | Detail                                                                |
| ------------------ | --------------------------------------------------------------------- |
| Status             | Supported                                                             |
| What it does       | Converts text to speech and plays it to the caller                    |
| Allowed attributes | All standard attributes: `voice`, `language`, `loop`                  |
| Limits             | Cost bounded by per-call time limit (10 min) and total quota (75 min) |

```xml
<Say voice="Polly.Joanna" language="en-US">Hello, welcome to the trial experience!</Say>
```

#### `<Gather>` — Speech Recognition and keyboard (DTMF) input

| Aspect             | Detail                                                                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status             | Supported                                                                                                                                                                                                            |
| What it does       | Collects digits or speech input from the caller                                                                                                                                                                      |
| Allowed attributes | All standard attributes: `input` (`dtmf`, `speech`, `dtmf speech`), `timeout`, `numDigits`, `finishOnKey`, `speechTimeout`, `speechModel`, `language`, `hints`, `profanityFilter`, `actionOnEmptyResult`, `enhanced` |
| `action` URL       | Supported. Hop counter is incremented.                                                                                                                                                                               |
| `method`           | Supported                                                                                                                                                                                                            |
| Nested verbs       | `<Say>` and `<Play>` inside `<Gather>` are recursively sanitized (same rules apply to each)                                                                                                                          |
| Limits             | Speech recognition costs bounded by per-call time limit (10 min) and total quota (75 min). Max 10 hops for action URL chains.                                                                                        |

#### `<Play>` — Play audio

| Aspect             | Detail                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Status             | Supported with loop cap                                                                             |
| What it does       | Plays an audio file to the caller                                                                   |
| Allowed attributes | `loop`, `digits`                                                                                    |
| `loop` attribute   | Capped at 10 — values greater than 10 are reduced to 10. Invalid (non-numeric) values default to 1. |
| Audio URL          | Provided as text content of the `<Play>` element. Passed through as-is.                             |
| Limits             | Loop cap prevents excessive repetition. Playback duration bounded by per-call time limit (10 min).  |

#### `<Dial><Conference>` — Conference calls

| Aspect                                 | Detail                                                                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Status                                 | Supported with namespace isolation                                                                                                                                             |
| What it does                           | Connects callers to a conference room                                                                                                                                          |
| Conference name                        | Replaced with the account SID — prevents cross-account conference collisions. Regardless of what name you provide, the conference room is always scoped to your trial account. |
| Allowed `<Dial>` attributes            | `timeLimit` (capped at 600s), `callerId` (must be a verified number), AMD attributes (see [Answering Machine Detection](#dial-amd-attributes--answering-machine-detection))    |
| Stripped `<Dial>` attributes           | `record`, `recordingStatusCallback`, `recordingStatusCallbackMethod`, `recordingStatusCallbackEvent`                                                                           |
| `action` URL on `<Dial>`               | If not provided, a trial usage tracking URL is injected automatically.                                                                                                         |
| `statusCallback` on `<Dial>`           | Supported.                                                                                                                                                                     |
| Blocked nouns alongside `<Conference>` | `<Sip>`, `<Application>`, `<WhatsApp>`, `<Client>`, `<Number>` are stripped if present in the same `<Dial>`.                                                                   |
| Limits                                 | 1 conference per account (name forced to account SID). Participants limited by concurrent call limit (5). Per-call time limit (10 min). `timeLimit` capped at 600 seconds.     |

#### `<Enqueue>` / `<Dial><Queue>` — Call queues

**`<Enqueue>`**

| Aspect       | Detail                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Queue name   | Namespaced with account SID — the queue name gets `-{accountSid}` appended (for example, `support` becomes `support-AC1234567890abcdef`). If no name is provided, the account SID is used as the queue name. |
| `waitUrl`    | Supported. Hop counter is incremented.                                                                                                                                                                       |
| `action` URL | Supported.                                                                                                                                                                                                   |

**`<Dial><Queue>`**

| Aspect          | Detail                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Queue name      | Namespaced with account SID (same as `<Enqueue>`)                                                                      |
| `url` attribute | Supported.                                                                                                             |
| Limits          | Queue duration bounded by per-call time limit (10 min) and total quota (75 min). Max 5 concurrent calls limit applies. |

#### `<Dial>` AMD attributes — Answering Machine Detection

| Aspect                    | Detail                                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status                    | Supported — detection only                                                                                                                                                                                 |
| What it does              | Detects whether a call is answered by a human or machine                                                                                                                                                   |
| Allowed attributes        | `machineDetection` (`Enable` or `DetectMessageEnd`), `machineDetectionSpeechThreshold`, `machineDetectionSpeechEndThreshold`, `machineDetectionSilenceTimeout`, `asyncAmd`, `asyncAmdStatusCallbackMethod` |
| `machineDetectionTimeout` | Capped at 60 seconds — values above 60 are reduced to 60. Invalid values default to 60.                                                                                                                    |
| `asyncAmdStatusCallback`  | Supported.                                                                                                                                                                                                 |
| Limits                    | Detection-only attribute — no additional per-minute charges. Timeout capped at 60s.                                                                                                                        |

#### `<Transcription>` — Conversational Intelligence / Real-time transcription

| Aspect              | Detail                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Status              | Supported with callback URL proxying                                                                                                        |
| What it does        | Enables real-time transcription of the call                                                                                                 |
| Allowed attributes  | `languageCode`, `inboundTrackLabel`, `outboundTrackLabel`, Intelligence-specific attributes                                                 |
| `statusCallbackUrl` | Supported                                                                                                                                   |
| Limits              | Transcription costs bounded by per-call time limit (10 min) and total quota (75 min). Maximum 75 minutes of transcription across all calls. |

#### `<Redirect>` — URL redirect

| Aspect             | Detail                                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status             | Supported with URL proxying and hop counter                                                                                                                    |
| What it does       | Transfers TwiML execution to a new URL — Twilio fetches TwiML from the redirect URL and continues the call                                                     |
| Redirect URL       | Rewritten through interceptor so the redirected TwiML also gets sanitized.                                                                                     |
| `method` attribute | Your original method is captured and passed as a query parameter. The method on the interceptor URL is forced to `POST` so Twilio forwards call parameters.    |
| Hop counter        | Incremented on each redirect. When the hop counter reaches 10, the call is terminated with a `<Say>` message and `<Hangup>`. Prevents infinite redirect loops. |

### Verbs (no restrictions)

The following verbs pass through unchanged with no sanitization:

| Verb       | What it does                                |
| ---------- | ------------------------------------------- |
| `<Pause>`  | Pauses execution for a specified duration   |
| `<Hangup>` | Ends the call                               |
| `<Reject>` | Rejects an incoming call                    |
| `<Leave>`  | Removes a caller from a queue or conference |

### Blocked verbs

The following verbs are stripped from TwiML during trial. If encountered, they are replaced with a `<Say>` message: *"The \{verb} verb is not available on trial accounts."*

| Verb / Noun                            |
| -------------------------------------- |
| `<Record>`                             |
| `<Stream>`                             |
| `<ConversationRelay>`                  |
| `<VirtualAgent>`                       |
| `<Siprec>`                             |
| `<Refer>`                              |
| `<Pay>`                                |
| `<Recording>` (via `<Start>`/`<Stop>`) |
| `<Dial><Number>`                       |
| `<Dial><Sip>`                          |
| `<Dial><Application>`                  |
| `<Dial><WhatsApp>`                     |
| `<Dial><Client>`                       |
