# Say/Play widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The Say/Play widget allows you to play a recorded message, dictate text to a user, or play [DTMF tones](/docs/glossary/what-is-dtmf) on a call. Use this widget to say or play information to the user before any subsequent action. If you want to request a user's input after a message, use the [Gather Input on Call widget](/docs/studio/widget-library/gather-input-call) instead.

![Say/Play widget with message 'Thank you for using Studio!' and audio complete indicator.](https://docs-resources.prod.twilio.com/90390193f03eb56b2e5a0fd5568fc71376069677c697ac82e24bc685931e4938.png)

## Required Configuration for Say/Play

The Say/Play widget requires the following information to function properly. Say or Play Message or Digits is used to determine what action will be performed when the widget executes. Playing a message will require a URL that references the audio file. Saying a message can be configured further with the desired language and actual message contents. Playing digits will require the digits to be played as DTMF tones.

| Name                          | Description                                                                                                     | Default       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- |
| Say or Play Message or Digits | A choice indicating whether to play a pre-recorded message, say text, or play a series of digits as DTMF tones. | Say a Message |
| Loops                         | The number of times to repeat the message. The minimum value is 1, and the maximum is 99.                       | 1             |

### Say a Message Configuration

Select **Say a Message** to say text to the caller using [Text-to-Speech](/docs/voice/twiml/say/text-speech). After selecting **Say a Message**, you can configure the following values:

| Name        | Description                                                                                                             | Example                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Text to Say | The text to say to the caller. This can include Liquid template variables and SSML tags.                                | Hello \{\{flow.variables.first\_name}} |
| Language    | The language the message is in. Select the language from the drop down menu, or use Liquid template variables.          | \{\{widgets.say\_play\_1.language}}    |
| Voice       | The voice to use when speaking the message. Select the voice from the drop down menu, or use Liquid template variables. | \{\{widgets.say\_play\_1.voice}}       |

Alternatively, instead of specifying voice and language, you can select "Default" from the dropdown to use the **Default TTS settings**. See [Text-To-Speech Settings](/docs/voice/twiml/say/text-speech#text-to-speech-settings) to learn how to test voices, update your **Default TTS settings**, and define a **Language Mapping**.

### SSML Support

SSML enables customization in the audio generated using Text-To-Speech by providing details on pauses, and audio formatting for acronyms, dates, times, abbreviations, etc. To enable SSML in your Studio Flow, you **must use a Standard, Neural or Generative voice with support for SSML**. Consult the complete list of [Available languages and voices for TTS](/docs/voice/twiml/say/text-speech#available-voices-and-languages) for more information.

Once you select a compatible **voice**, add the SSML tags you wish to use directly in the Text to Say field:

```xml
<emphasis level="strong">Thanks for calling!</emphasis>
```

SSML also works together with Liquid, so you can reference Liquid variables in and around your SSML tags:

```xml
<emphasis level="{{flow.variables.level}}">{{flow.variables.text}}</emphasis>
```

Consult the [Text-to-Speech documentation](/docs/voice/twiml/say/text-speech) for more details of using SSML.

### Play a Message Configuration

Use this option to play a recorded audio message to the caller. You can see the list of supported audio file formats in the [\<Play> TwiML documentation](/docs/voice/twiml/play#supported-audio-file-types). Once you select Play a Message, you will be able to configure the following value:

| Name              | Description              | Example                                                                  |
| ----------------- | ------------------------ | ------------------------------------------------------------------------ |
| URL of Audio File | The URL of media to play | [https://api.twilio.com/cowbell.mp3](https://api.twilio.com/cowbell.mp3) |

> \[!NOTE]
>
> Twilio offers a static hosting service, [Twilio Assets](/docs/serverless/functions-assets/assets), which you can use to upload and store audio files.

### Play Digits Configuration

Selecting **Digits** allows you to play DTMF tones during a call. For example, if you need to test an IVR system, you can use this feature to simulate digits being pressed to navigate through the menu options.

Include `w` to introduce a 0.5 second pause between DTMF tones and `W` to introduce a 1 second pause between DTMF tones. For example, `1w2` will tell Twilio to pause 0.5 seconds after the first DTMF tone before playing the next DTMF tone.

Once you select Digits, you will be able to configure the following value:

| Name   | Description                                                                                                                                                                                                                                                                     | Example |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Digits | The sequence of digits to play as DTMF tones. Digits can be `0`-`9`, `A`, `B`, `C`, `D`, `W`, `w`, `#`, and `*`. Use `w` in between digits to add a .5 second pause between tones and `W` to add a 1 second pause between DTMF tones. Do not include any spaces between digits. | `12w#`  |

## Say/Play Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio Transitions, see the [Getting Started Guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name           | Description                  |
| -------------- | ---------------------------- |
| Audio Complete | The message finished playing |

## Say/Play Variables

When the Say/Play widget executes, it will have stored the following variables for use throughout your Studio Flow. For more information on working with variables in Studio, see the [Getting Started Guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Twilio Voice: \<Say> documentation](/docs/voice/twiml/say#say-attributes).

| Name     | Liquid Template Language                |
| -------- | --------------------------------------- |
| Language | \{\{widgets.MY\_WIDGET\_NAME.language}} |
| Voice    | \{\{widgets.MY\_WIDGET\_NAME.voice}}    |

## Example: Business Hours

In the following example a user will be told that the business is open if within business hours, or if closed the information about hours of operation. You can find more information on date variables in the [Liquid Template Language](/docs/studio/user-guide/liquid-template-language#formatting-dates) tutorial.

![Twilio Studio flow with triggers for messages, calls, and conditions for open or closed responses.](https://docs-resources.prod.twilio.com/b3b2f834044b13ff5a0a3dd3a73451676a5fc398768f540f50e30fa3f13f4b0e.png)

> \[!NOTE]
>
> If you would like to gather input from the user after the message is sent, you can use the [Gather Input on Call widget.](/docs/studio/widget-library/gather-input-call)

## Learn More

Now that you know the basics of the Say/Play widget, you may want to dig into tutorials using it:

* [Route Leads with Twilio Studio](/docs/studio/tutorials/how-to-route-leads)

Let's build something amazing.
