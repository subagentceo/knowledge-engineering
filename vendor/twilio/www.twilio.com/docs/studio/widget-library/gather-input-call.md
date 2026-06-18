# Gather Input On Call widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The Gather Input on Call widget allows you to gather a user's keypress or voice input while they are on a call. This widget will collect [DTMF keypresses](/docs/glossary/what-is-dtmf) or text from [speech recognition](https://www.twilio.com/en-us/blog/speech-recognition-generally-available-html), which you can then save for your own data purposes or send along to another widget to send your user down the right path.

![Get account widget prompts for 16-digit account number via voice or keypad input.](https://docs-resources.prod.twilio.com/f258e2eb1751af3efa4f0631986cebba3ea4356d490da125b4574e74992872aa.png)

## Required configuration for Gather Input on Call

There is no required configuration for the Gather Input on Call widget. However, to make the best use of this widget, we recommend configuring at least a few of the available configuration options listed in the next section.

## Optional configuration for Gather Input on Call

The Gather Input on Call widget accepts a number of configuration options that you can use to customize the message your Flow says to callers and the way(s) you may wish to collect data.

See the [Say/Play widget](/docs/studio/widget-library/sayplay) for more details of these options.

| Name                  | Description                                                                                                | Supported Values                                                                                                                                                                                                      | Default              |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Say or Play a Message | "Say a Message" will read a message via text-to-speech. "Play a Message" will play a pre-recorded message. | Select **Say a Message** or **Play a Message** from the dropdown                                                                                                                                                      | Say a Message        |
| Text to say           | The text to say on the call if you selected "Say a Message"                                                | **Strings** like "Welcome!", **templates** like Hello `{{first_name}}`, and SSML like `<emphasis level="strong">Thanks for calling!</emphasis>`.                                                                      | N/A                  |
| Language              | Language and regional dialect for the message being said if you selected "Say a Message"                   | Select a supported language from the dropdown, or enter a [Liquid variable](/docs/studio/user-guide/liquid-template-language) for dynamic selection                                                                   | en-US (U.S. English) |
| Message voice         | The voice that will read your message on the call                                                          | Select a supported voice from the dropdown or enter a [Liquid variable](/docs/studio/user-guide/liquid-template-language) for dynamic selection. Note that the dropdown will not populate until you select a language | Alice                |
| URL of audio file     | The URL of media to play, if you selected "Play a Message"                                                 | `https://api.twilio.com/cowbell.mp3`                                                                                                                                                                                  | N/A                  |
| Number of loops       | The number of times your message will loop                                                                 | Any positive integer between 1 and 99                                                                                                                                                                                 | 1                    |

> \[!NOTE]
>
> Studio Say/Play and Gather widgets now [support SSML](/docs/studio/widget-library/sayplay#ssml-support).

> \[!NOTE]
>
> For a list of supported Amazon Polly and Neural voices and dialects that you can reference with Liquid variables when setting Message Language and Voice, see [this list](/docs/voice/twiml/say/text-speech#available-voices-and-languages).

### Keypress options for Gather Input on Call

A number of additional options are available when configuring the Gather Input on Call widget to accept DTMF keypresses as input.

| Name                                  | Description                                                                                                                                                                                                          | Supported Values  | Default   |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------- |
| Stop gathering after \_\_ seconds     | Time in seconds that the Flow will wait for a caller to press a key                                                                                                                                                  | 0 - 30 seconds    | 5 seconds |
| Stop gathering on keypress?           | Stop gathering digits after a user presses a specific key. If "no," the widget will gather and submit all keypresses when the Stop Gathering After timeout is reached or the expected Number of Digits are collected | Yes or No         | Yes       |
| Stop gathering on keypress \_\_\_     | The key that triggers data submission of a user's input                                                                                                                                                              | Digits 0-9, #, \* | #         |
| Stop gathering after number of digits | The number of digits you are expecting from a caller. A caller's input will be submitted as soon as this number of keypresses has been reached.                                                                      | 0-30              | N/A       |

> \[!WARNING]
>
> Note that the value set for Stop Gathering Keypress is a *control key*, meaning that its value is not submitted with the rest of the gathered digits. For example, if your Stop Gathering On Keypress is # and a user enters 123#, only 123 will be submitted with your data.

### Speech recognition options for Gather Input on Call

Consider the following options when configuring the Gather Input on Call widget to accept a caller's speech as input:

| Name                        | Description                                                                                                           | Supported Values                                                                                                                                                                                                                                                                                                                                                              | Default                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Speech recognition language | The language Twilio's speech engine will try to recognize                                                             | <ul><li>Select a supported language from the dropdown. You can search by the language name or short code.</li><li>Enter a string value. To use a [liquid variable](/docs/studio/user-guide/liquid-template-language#expressions-and-variables), add it as a string. Note that you must add the exact string for the variable. Studio won't autocomplete your entry.</li></ul> | English (United States)<br />en-US |
| Speech recognition hints    | A list of comma-separated values that give Twilio's speech engine specific words you expect to hear from your callers | Comma-separated list of words. For example: "sales, reservations, hours"                                                                                                                                                                                                                                                                                                      | N/A                                |
| Profanity filter            | Redact profanity from speech results                                                                                  | True or False                                                                                                                                                                                                                                                                                                                                                                 | True                               |

### Advanced speech settings

You may choose to enable a few advanced speech settings in the Gather Input on Call widget by expanding the **Advanced speech settings** box in the widget configuration panel.

![Advanced speech settings with options for speech timeout and model in Gather Input on Call widget.](https://docs-resources.prod.twilio.com/e7d6b04159d60279eb6bc3a6ccb639b432cc01f1080830c333f9f910c5480a80.jpg)

> \[!CAUTION]
>
> The advanced speech settings of Gather should be used carefully, as certain combinations are incompatible with each other. To learn more about the options and how to use them, consult the [Voice \<Gather>](/docs/voice/twiml/gather) docs.

| Name                        | Description                                                                      | Supported Values                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default |
| --------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| Speech model selection mode | Which model the recognition engine should use to interpret speech                | <ul><li>**Automatic**: Twilio picks the provider and model. If you want, you can set the generic model type for the expected input. Options are **Default**, **Numbers & Commands**, **Phone Call, Conversations**, and **Short utterances**.</li><li>**Manual**: Enter a [liquid variable](/docs/studio/user-guide/liquid-template-language#expressions-and-variables) or specific STT model type, like azure-ai-speech or deepgram-nova-2.</li></ul> | N/A     |
| Speech input timeout        | The limit (in seconds) that Twilio will wait before it stops speech recognition. | **auto** or any integer                                                                                                                                                                                                                                                                                                                                                                                                                                | auto    |

> \[!NOTE]
>
> When **Speech input timeout** is set to **auto**, Twilio will stop speech recognition when there is a pause in speech and return the results immediately.

## Gather Input on Call Transitions

The Gather Input on Call widget has three possible transition states that can lead to any other widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name                | Description                                           |
| ------------------- | ----------------------------------------------------- |
| User pressed keys   | The user pressed digits while on the call.            |
| User said something | The user spoke a message while on the call.           |
| No input            | The user did not perform any input while on the call. |

## Gather Input on Call Variables

When the Gather Input on Call widget executes, it will have stored the following variables for use throughout your Studio Flow. When accessing these variables, make sure you replace `MY_WIDGET_NAME` with the name of your widget. For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for Gather variables such as SpeechResult, Confidence, or Digits at the [TwiML Voice: \<Gather> page](/docs/voice/twiml/gather#action).

Find definitions and examples for Call variables at the [Call Resource page](/docs/voice/api/call-resource#call-properties).

| Name           | Liquid Template Language                     |
| -------------- | -------------------------------------------- |
| Account SID    | \{\{widgets.MY\_WIDGET\_NAME.AccountSid}}    |
| API Version    | \{\{widgets.MY\_WIDGET\_NAME.ApiVersion}}    |
| Called         | \{\{widgets.MY\_WIDGET\_NAME.Called}}        |
| Caller         | \{\{widgets.MY\_WIDGET\_NAME.Caller}}        |
| Call Status    | \{\{widgets.MY\_WIDGET\_NAME.CallStatus}}    |
| Caller City    | \{\{widgets.MY\_WIDGET\_NAME.CallerCity}}    |
| Caller Country | \{\{widgets.MY\_WIDGET\_NAME.CallerCountry}} |
| Caller State   | \{\{widgets.MY\_WIDGET\_NAME.CallerState}}   |
| Caller ZIP     | \{\{widgets.MY\_WIDGET\_NAME.CallerZip}}     |
| Call SID       | \{\{widgets.MY\_WIDGET\_NAME.CallSid}}       |
| Called City    | \{\{widgets.MY\_WIDGET\_NAME.CalledCity}}    |
| Called Country | \{\{widgets.MY\_WIDGET\_NAME.CalledCountry}} |
| Called State   | \{\{widgets.MY\_WIDGET\_NAME.CalledState}}   |
| Called ZIP     | \{\{widgets.MY\_WIDGET\_NAME.CalledZip}}     |
| Confidence     | \{\{widgets.MY\_WIDGET\_NAME.Confidence}}    |
| Digits         | \{\{widgets.MY\_WIDGET\_NAME.Digits}}        |
| Direction      | \{\{widgets.MY\_WIDGET\_NAME.Direction}}     |
| From           | \{\{widgets.MY\_WIDGET\_NAME.From}}          |
| From City      | \{\{widgets.MY\_WIDGET\_NAME.FromCity}}      |
| From Country   | \{\{widgets.MY\_WIDGET\_NAME.FromCountry}}   |
| From State     | \{\{widgets.MY\_WIDGET\_NAME.FromState}}     |
| From ZIP       | \{\{widgets.MY\_WIDGET\_NAME.FromZip}}       |
| Speech Result  | \{\{widgets.MY\_WIDGET\_NAME.SpeechResult}}  |
| To             | \{\{widgets.MY\_WIDGET\_NAME.To}}            |
| To City        | \{\{widgets.MY\_WIDGET\_NAME.ToCity}}        |
| To Country     | \{\{widgets.MY\_WIDGET\_NAME.ToCountry}}     |
| To State       | \{\{widgets.MY\_WIDGET\_NAME.ToState}}       |
| To ZIP         | \{\{widgets.MY\_WIDGET\_NAME.ToZip}}         |

> \[!NOTE]
>
> Find more details about Confidence and Speech Result at the [TwiML Voice: \<Gather> page](/docs/voice/twiml/gather#action).

## Example: routing calls with Gather Input on Call

There are many real-world applications for using the Gather Input on Call widget. One common example is creating an [IVR, or Interactive Voice Response](/docs/glossary/what-is-ivr) to help route callers to the correct number or extension.

![Flowchart for Gather Input on Call with options for sales and support.](https://docs-resources.prod.twilio.com/0b2cd5675ace94725d01b4c28ec593205a0a8055cd3dded890fcaebf6b8bd258.jpg)

Here we can see a Studio Flow that takes an incoming call and asks the caller to press a number or say a keyword to reach either a Sales or Support department. When the caller says "sales" or presses 1, the widget will transition to a [Split Based On… widget](/docs/studio/widget-library/split-based-on), passing along the number pressed or keyword spoken so that we can then route the call accordingly.

## Learn more

Want to go more in-depth with Gather Input on Call? Follow along with one of these step-by-step tutorials that show how to create real-world applications that leverage this widget:

* [How to Build an IVR with Twilio Studio](/docs/studio/tutorials/how-to-build-an-ivr)
* [Route Leads with Twilio Studio](/docs/studio/tutorials/how-to-route-leads)

Let's build something amazing.
