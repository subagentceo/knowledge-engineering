# Text-to-Speech (TTS)

> \[!WARNING]
>
> `<Say>` and [Text-to-Speech (TTS)](/docs/voice/twiml/say/text-speech), including the [`<Say>` TwiML](/docs/voice/twiml/say) verb and API, uses artificial intelligence or machine learning technologies. By enabling or using any features or functionalities within Programmable Voice that Twilio identifies as using artificial intelligence or machine learning technology, you acknowledge and agree to certain terms. Your use of these features or functionalities is subject to the terms of the [Predictive and Generative AI or ML Features Addendum](https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features).
>
> **Availability of voices**
>
> Some features and voices, including third-party voices, in `<Say>` and Text-to-Speech may be available as alpha, beta, not generally available, limited release, or preview (collectively "Beta"), and information contained in this document is subject to change. This means that some features aren't yet implemented, and others may change before the product becomes Generally Available. Beta products aren't covered by a [Twilio Service Level Agreement](https://www.twilio.com/en-us/legal/service-level-agreement).
>
> **Use of third-party voices**
>
> Third-party voices may change without prior notice. Although Twilio provides access to these third-party voices, control and updates are managed by the third-party vendors. These changes include, but are not limited to, new models that affect how voices sound or the removal of voices from their offering with or without alternative or automatic redirections. For the most up to date technical information regarding such third-party voice functionality, consult the applicable third-party voice vendor product documentation.
>
> * [Google Text-to-Speech documentation](https://cloud.google.com/text-to-speech/docs/voices)
> * [Amazon Text-to-Speech documentation](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html)

Text-to-Speech (TTS), also known as speech synthesis, converts text into a human-sounding voice. To turn traditional human-to-human interactions into seamless, machine-to-human interactions, developers and business users use TTS.

This replaces recording audio files with human voices to play back in a call. With TTS, you can generate prompts from raw text to respond to events in your application. Regardless of use case, TTS can deliver information over a phone call with greater efficiency.

## Get Started with Text-to-Speech

When you provide text, Twilio synthesizes speech in real time and speaks the audio in any call. You can use TTS in TwiML and Twilio Studio.

### Use TwiML

To provide plain text that Twilio converts to synthesized speech, use the [\<Say>](/docs/voice/twiml/say) verb.

> \[!NOTE]
>
> When Twilio executes the following TwiML during a call, the caller hears "Hello world!" The synthesized voice the caller hears is the default voice and language of the Twilio Account (configured in the Twilio Console).
>
> ```xml
> <Response>
>    <Say>Hello world!</Say>
> </Response>
> ```
>
> Use the `language` and `voice` attributes of the `<Say>` verb to modify the language, accent, and voice of the synthesized speech.

> \[!NOTE]
>
> The following TwiML uses Amazon Polly's "Joanna" voice and American English:
>
> ```xml
> <Response>
>    <Say language="en-US" voice="Polly.Joanna">Hello. I am Joanna and I speak American English!</Say>
> </Response>
> ```

`<Say>` offers different options for voices. Each option offers its own supported set of languages and genders. To customize your application to your needs and preferences, use the Text-to-Speech capabilities.

To start using Text-to-Speech, complete the following steps:

1. Configure your account-wide [text-to-speech Settings](https://www.twilio.com/console/voice/twiml/text-to-speech) in the Twilio Console.
2. Define TTS instructions in a TwiML document with [\<Say>](/docs/voice/twiml/say).

### Use Twilio Studio

To design and build applications with little or no code, use [Twilio Studio](/docs/studio). Studio uses Widgets to represent Twilio's features and functionality.

To add Text-to-Speech capabilities to your application, add the [Say/Play Widget](/docs/studio/widget-library/sayplay).

1. Configure your account-wide [Text-to-Speech settings](https://www.twilio.com/console/voice/twiml/text-to-speech) in the Twilio Console.
2. To include TTS in your Studio Flow, add the [Say/Play Widget](/docs/studio/widget-library/sayplay).

## Text-to-Speech voices

You can choose from four types of Twilio Text-to-Speech: *Basic*, *Standard*, *Neural* and *Generative*. These types differ in their support of the following parameters:

* technology used
* languages and locales supported
* quality of conversation employed
* pricing offered

### Basic voices

These voices help you learn Text-to-Speech capabilities using `<Say>`. *Don't use them for production applications.* These voices lack enough human-like qualities for voice call conversation. Due to their limited purpose, these voices support few languages, but Twilio provides them at no additional cost.

### Standard voices

These voices use standard technology in synthesized speech, and produce natural-sounding lifelike voices but might have limited human speech patterns and inflections. These voices speak using [Amazon Polly][] and [Google Standard][] voices.

[Amazon Polly]: https://docs.aws.amazon.com/polly/latest/dg/standard-voices.html

[Google Standard]: https://cloud.google.com/text-to-speech/docs/list-voices-and-types#standard_voices

### Neural voices

These voices use enhanced technology in synthesized speech. They produce higher-quality and more natural-sounding voices than Standard voices. These voices speak using [Amazon Polly Neural][] and Google [WaveNet][] and [Neural2][] voices.

[Amazon Polly Neural]: https://docs.aws.amazon.com/polly/latest/dg/neural-voices.html

[WaveNet]: https://deepmind.google/research/breakthroughs/wavenet/

[Neural2]: https://cloud.google.com/text-to-speech/docs/list-voices-and-types#neural2_voices

### Generative voices

> \[!IMPORTANT]
>
> Generative voices are currently available as a Public Beta product and information contained in this document is subject to change. This means that some of the features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a [Twilio Service Level Agreement](https://www.twilio.com/en-us/legal/service-level-agreement).

These voices are powered by the latest technology and innovation in synthesized speech to offer the most human-like, emotionally engaged and adaptive context-aware voices by "interpreting" the text-input and adjust speech accordingly (e.g. render context-dependent prosody, tone, emotion, pausing, spelling, dialectal properties, foreign word pronunciation, etc). These synthetic voices are remarkably similar to a human voice, and make them the optimal option for [Conversational AI applications and Virtual Agents][]. These voices speak using [Amazon Polly Generative][] and [Google Chirp3-HD][] voices.

[Conversational AI applications and Virtual Agents]: https://www.twilio.com/en-us/blog/conversationrelay-voice-ai-made-human

[Amazon Polly Generative]: https://docs.aws.amazon.com/polly/latest/dg/generative-voices.html

[Google Chirp3-HD]: https://cloud.google.com/text-to-speech/docs/list-voices-and-types#chirp3_hd_voices

## Available voices and languages

The following table contains all voices available for each language and locale. You can test the different voices on the [**Text-to-Speech** page][console-text-to-speech] in the Twilio Console.

> \[!NOTE]
>
> Accepted values for the `voice` attribute of the `<Say>` verb are comprised of a *voice* from the **Voice** column and its corresponding *provider* from the **Provider** column used as prefix, like `Polly.Joanna-Generative` or `Google.en-US-Chirp3-HD-Aoede`.

> \[!NOTE]
>
> Accepted values for the `voice` attribute of [`<ConversationRelay>`](/docs/voice/twiml/connect/conversationrelay) is a *voice* from the **Voice** column (without *provider* used as prefix), like `Joanna-Generative` or `en-US-Chirp3-HD-Aoede`.

***

Language (Locale): Afrikaans (South Africa)
Language code: af-ZA
Type: Standard
Gender: Female
Provider: Google
Voice: af-ZA-Standard-A

***

Language (Locale): Arabic (Gulf)
Language code: ar-AE
Type: Neural
Gender: Female
Provider: Polly
Voice: Hala-Neural \*

***

Language (Locale): Arabic (Gulf)
Language code: ar-AE
Type: Neural
Gender: Male
Provider: Polly
Voice: Zayd-Neural \*

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Female
Provider: Google
Voice: ar-XA-Chirp3-HD-Aoede

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Male
Provider: Google
Voice: ar-XA-Chirp3-HD-Charon

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Male
Provider: Google
Voice: ar-XA-Chirp3-HD-Fenrir

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Female
Provider: Google
Voice: ar-XA-Chirp3-HD-Kore

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Female
Provider: Google
Voice: ar-XA-Chirp3-HD-Leda

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Male
Provider: Google
Voice: ar-XA-Chirp3-HD-Orus

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Male
Provider: Google
Voice: ar-XA-Chirp3-HD-Puck

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Generative
Gender: Female
Provider: Google
Voice: ar-XA-Chirp3-HD-Zephyr

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Standard
Gender: Female
Provider: Google
Voice: ar-XA-Standard-A

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Standard
Gender: Male
Provider: Google
Voice: ar-XA-Standard-B

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Standard
Gender: Male
Provider: Google
Voice: ar-XA-Standard-C

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Standard
Gender: Female
Provider: Google
Voice: ar-XA-Standard-D

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Neural
Gender: Female
Provider: Google
Voice: ar-XA-Wavenet-A

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Neural
Gender: Male
Provider: Google
Voice: ar-XA-Wavenet-B

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Neural
Gender: Male
Provider: Google
Voice: ar-XA-Wavenet-C

***

Language (Locale): Arabic (Standard)
Language code: ar-XA
Type: Neural
Gender: Female
Provider: Google
Voice: ar-XA-Wavenet-D

***

Language (Locale): Arabic (Standard)
Language code: arb
Type: Standard
Gender: Female
Provider: Polly
Voice: Zeina

***

Language (Locale): Basque (Spain)
Language code: eu-ES
Type: Standard
Gender: Female
Provider: Google
Voice: eu-ES-Standard-B

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: bn-IN-Chirp3-HD-Aoede

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: bn-IN-Chirp3-HD-Charon

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: bn-IN-Chirp3-HD-Fenrir

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: bn-IN-Chirp3-HD-Kore

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: bn-IN-Chirp3-HD-Leda

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: bn-IN-Chirp3-HD-Orus

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: bn-IN-Chirp3-HD-Puck

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: bn-IN-Chirp3-HD-Zephyr

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Standard
Gender: Female
Provider: Google
Voice: bn-IN-Standard-A

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Standard
Gender: Male
Provider: Google
Voice: bn-IN-Standard-B

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Standard
Gender: Female
Provider: Google
Voice: bn-IN-Standard-C

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Standard
Gender: Male
Provider: Google
Voice: bn-IN-Standard-D

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Neural
Gender: Female
Provider: Google
Voice: bn-IN-Wavenet-A

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Neural
Gender: Male
Provider: Google
Voice: bn-IN-Wavenet-B

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Neural
Gender: Female
Provider: Google
Voice: bn-IN-Wavenet-C

***

Language (Locale): Bengali (India)
Language code: bn-IN
Type: Neural
Gender: Male
Provider: Google
Voice: bn-IN-Wavenet-D

***

Language (Locale): Bulgarian (Bulgaria)
Language code: bg-BG
Type: Standard
Gender: Female
Provider: Google
Voice: bg-BG-Standard-B

***

Language (Locale): Catalan (Spain)
Language code: ca-ES
Type: Standard
Gender: Female
Provider: Google
Voice: ca-ES-Standard-B

***

Language (Locale): Catalan (Spain)
Language code: ca-ES
Type: Neural
Gender: Female
Provider: Polly
Voice: Arlet-Neural

***

Language (Locale): Chinese Cantonese
Language code: yue-CN
Type: Neural
Gender: Female
Provider: Polly
Voice: Hiujin-Neural

***

Language (Locale): Chinese Cantonese (Hong Kong)
Language code: yue-HK
Type: Standard
Gender: Female
Provider: Google
Voice: yue-HK-Standard-A

***

Language (Locale): Chinese Cantonese (Hong Kong)
Language code: yue-HK
Type: Standard
Gender: Male
Provider: Google
Voice: yue-HK-Standard-B

***

Language (Locale): Chinese Cantonese (Hong Kong)
Language code: yue-HK
Type: Standard
Gender: Female
Provider: Google
Voice: yue-HK-Standard-C

***

Language (Locale): Chinese Cantonese (Hong Kong)
Language code: yue-HK
Type: Standard
Gender: Male
Provider: Google
Voice: yue-HK-Standard-D

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Female
Provider: Google
Voice: cmn-CN-Chirp3-HD-Aoede

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Male
Provider: Google
Voice: cmn-CN-Chirp3-HD-Charon

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Male
Provider: Google
Voice: cmn-CN-Chirp3-HD-Fenrir

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Female
Provider: Google
Voice: cmn-CN-Chirp3-HD-Kore

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Female
Provider: Google
Voice: cmn-CN-Chirp3-HD-Leda

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Male
Provider: Google
Voice: cmn-CN-Chirp3-HD-Orus

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Male
Provider: Google
Voice: cmn-CN-Chirp3-HD-Puck

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Generative
Gender: Female
Provider: Google
Voice: cmn-CN-Chirp3-HD-Zephyr

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Standard
Gender: Female
Provider: Google
Voice: cmn-CN-Standard-A

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Standard
Gender: Male
Provider: Google
Voice: cmn-CN-Standard-B

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Standard
Gender: Male
Provider: Google
Voice: cmn-CN-Standard-C

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Standard
Gender: Female
Provider: Google
Voice: cmn-CN-Standard-D

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Neural
Gender: Female
Provider: Google
Voice: cmn-CN-Wavenet-A

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Neural
Gender: Male
Provider: Google
Voice: cmn-CN-Wavenet-B

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Neural
Gender: Male
Provider: Google
Voice: cmn-CN-Wavenet-C

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Neural
Gender: Female
Provider: Google
Voice: cmn-CN-Wavenet-D

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Standard
Gender: Female
Provider: Polly
Voice: Zhiyu

***

Language (Locale): Chinese Mandarin
Language code: cmn-CN
Type: Neural
Gender: Female
Provider: Polly
Voice: Zhiyu-Neural

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Standard
Gender: Female
Provider: Google
Voice: cmn-TW-Standard-A

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Standard
Gender: Male
Provider: Google
Voice: cmn-TW-Standard-B

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Standard
Gender: Male
Provider: Google
Voice: cmn-TW-Standard-C

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Neural
Gender: Female
Provider: Google
Voice: cmn-TW-Wavenet-A

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Neural
Gender: Male
Provider: Google
Voice: cmn-TW-Wavenet-B

***

Language (Locale): Chinese Mandarin (Taiwan)
Language code: cmn-TW
Type: Neural
Gender: Male
Provider: Google
Voice: cmn-TW-Wavenet-C

***

Language (Locale): Czech (Czech Republic)
Language code: cs-CZ
Type: Standard
Gender: Female
Provider: Google
Voice: cs-CZ-Standard-B

***

Language (Locale): Czech (Czech Republic)
Language code: cs-CZ
Type: Neural
Gender: Female
Provider: Google
Voice: cs-CZ-Wavenet-B

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Standard
Gender: Female
Provider: Google
Voice: da-DK-Standard-F

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Standard
Gender: Male
Provider: Google
Voice: da-DK-Standard-G

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Neural
Gender: Female
Provider: Google
Voice: da-DK-Wavenet-F

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Neural
Gender: Male
Provider: Google
Voice: da-DK-Wavenet-G

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Standard
Gender: Male
Provider: Polly
Voice: Mads

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Standard
Gender: Female
Provider: Polly
Voice: Naja

***

Language (Locale): Danish (Denmark)
Language code: da-DK
Type: Neural
Gender: Female
Provider: Polly
Voice: Sofie-Neural

***

Language (Locale): Dutch (Belgium)
Language code: nl-BE
Type: Standard
Gender: Female
Provider: Google
Voice: nl-BE-Standard-C

***

Language (Locale): Dutch (Belgium)
Language code: nl-BE
Type: Standard
Gender: Male
Provider: Google
Voice: nl-BE-Standard-D

***

Language (Locale): Dutch (Belgium)
Language code: nl-BE
Type: Neural
Gender: Female
Provider: Google
Voice: nl-BE-Wavenet-C

***

Language (Locale): Dutch (Belgium)
Language code: nl-BE
Type: Neural
Gender: Male
Provider: Google
Voice: nl-BE-Wavenet-D

***

Language (Locale): Dutch (Belgium)
Language code: nl-BE
Type: Neural
Gender: Female
Provider: Polly
Voice: Lisa-Neural

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Female
Provider: Google
Voice: nl-NL-Chirp3-HD-Aoede

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Male
Provider: Google
Voice: nl-NL-Chirp3-HD-Charon

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Male
Provider: Google
Voice: nl-NL-Chirp3-HD-Fenrir

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Female
Provider: Google
Voice: nl-NL-Chirp3-HD-Kore

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Female
Provider: Google
Voice: nl-NL-Chirp3-HD-Leda

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Male
Provider: Google
Voice: nl-NL-Chirp3-HD-Orus

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Male
Provider: Google
Voice: nl-NL-Chirp3-HD-Puck

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Generative
Gender: Female
Provider: Google
Voice: nl-NL-Chirp3-HD-Zephyr

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Standard
Gender: Female
Provider: Google
Voice: nl-NL-Standard-F

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Standard
Gender: Male
Provider: Google
Voice: nl-NL-Standard-G

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Neural
Gender: Female
Provider: Google
Voice: nl-NL-Wavenet-F

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Neural
Gender: Male
Provider: Google
Voice: nl-NL-Wavenet-G

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Neural
Gender: Female
Provider: Polly
Voice: Laura-Neural

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Standard
Gender: Female
Provider: Polly
Voice: Lotte

***

Language (Locale): Dutch (Netherlands)
Language code: nl-NL
Type: Standard
Gender: Male
Provider: Polly
Voice: Ruben

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Female
Provider: Google
Voice: en-AU-Chirp3-HD-Aoede

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Male
Provider: Google
Voice: en-AU-Chirp3-HD-Charon

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Male
Provider: Google
Voice: en-AU-Chirp3-HD-Fenrir

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Female
Provider: Google
Voice: en-AU-Chirp3-HD-Kore

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Female
Provider: Google
Voice: en-AU-Chirp3-HD-Leda

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Male
Provider: Google
Voice: en-AU-Chirp3-HD-Orus

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Male
Provider: Google
Voice: en-AU-Chirp3-HD-Puck

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Female
Provider: Google
Voice: en-AU-Chirp3-HD-Zephyr

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Female
Provider: Google
Voice: en-AU-Neural2-A

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Male
Provider: Google
Voice: en-AU-Neural2-B

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Female
Provider: Google
Voice: en-AU-Neural2-C

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Male
Provider: Google
Voice: en-AU-Neural2-D

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Female
Provider: Google
Voice: en-AU-Standard-A

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Male
Provider: Google
Voice: en-AU-Standard-B

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Female
Provider: Google
Voice: en-AU-Standard-C

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Male
Provider: Google
Voice: en-AU-Standard-D

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Female
Provider: Google
Voice: en-AU-Wavenet-A

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Male
Provider: Google
Voice: en-AU-Wavenet-B

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Female
Provider: Google
Voice: en-AU-Wavenet-C

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Male
Provider: Google
Voice: en-AU-Wavenet-D

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Female
Provider: Polly
Voice: Nicole

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Generative
Gender: Female
Provider: Polly
Voice: Olivia-Generative

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Neural
Gender: Female
Provider: Polly
Voice: Olivia-Neural

***

Language (Locale): English (Australia)
Language code: en-AU
Type: Standard
Gender: Male
Provider: Polly
Voice: Russell

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Female
Provider: Google
Voice: en-IN-Chirp3-HD-Aoede

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Male
Provider: Google
Voice: en-IN-Chirp3-HD-Charon

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Male
Provider: Google
Voice: en-IN-Chirp3-HD-Fenrir

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Female
Provider: Google
Voice: en-IN-Chirp3-HD-Kore

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Female
Provider: Google
Voice: en-IN-Chirp3-HD-Leda

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Male
Provider: Google
Voice: en-IN-Chirp3-HD-Orus

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Male
Provider: Google
Voice: en-IN-Chirp3-HD-Puck

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Female
Provider: Google
Voice: en-IN-Chirp3-HD-Zephyr

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Google
Voice: en-IN-Neural2-A

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Male
Provider: Google
Voice: en-IN-Neural2-B

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Male
Provider: Google
Voice: en-IN-Neural2-C

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Google
Voice: en-IN-Neural2-D

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Female
Provider: Google
Voice: en-IN-Standard-A

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Male
Provider: Google
Voice: en-IN-Standard-B

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Male
Provider: Google
Voice: en-IN-Standard-C

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Female
Provider: Google
Voice: en-IN-Standard-D

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Female
Provider: Google
Voice: en-IN-Standard-E

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Male
Provider: Google
Voice: en-IN-Standard-F

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Google
Voice: en-IN-Wavenet-A

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Male
Provider: Google
Voice: en-IN-Wavenet-B

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Male
Provider: Google
Voice: en-IN-Wavenet-C

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Google
Voice: en-IN-Wavenet-D

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Google
Voice: en-IN-Wavenet-E

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Male
Provider: Google
Voice: en-IN-Wavenet-F

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Female
Provider: Polly
Voice: Aditi \*

***

Language (Locale): English (India)
Language code: en-IN
Type: Generative
Gender: Female
Provider: Polly
Voice: Kajal-Generative

***

Language (Locale): English (India)
Language code: en-IN
Type: Neural
Gender: Female
Provider: Polly
Voice: Kajal-Neural \*

***

Language (Locale): English (India)
Language code: en-IN
Type: Standard
Gender: Female
Provider: Polly
Voice: Raveena

***

Language (Locale): English (Ireland)
Language code: en-IE
Type: Neural
Gender: Female
Provider: Polly
Voice: Niamh-Neural

***

Language (Locale): English (New Zealand)
Language code: en-NZ
Type: Neural
Gender: Female
Provider: Polly
Voice: Aria-Neural

***

Language (Locale): English (South African)
Language code: en-ZA
Type: Generative
Gender: Female
Provider: Polly
Voice: Ayanda-Generative

***

Language (Locale): English (South African)
Language code: en-ZA
Type: Neural
Gender: Female
Provider: Polly
Voice: Ayanda-Neural

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Female
Provider: Google
Voice: en-GB-Chirp3-HD-Aoede

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Male
Provider: Google
Voice: en-GB-Chirp3-HD-Charon

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Male
Provider: Google
Voice: en-GB-Chirp3-HD-Fenrir

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Female
Provider: Google
Voice: en-GB-Chirp3-HD-Kore

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Female
Provider: Google
Voice: en-GB-Chirp3-HD-Leda

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Male
Provider: Google
Voice: en-GB-Chirp3-HD-Orus

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Male
Provider: Google
Voice: en-GB-Chirp3-HD-Puck

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Female
Provider: Google
Voice: en-GB-Chirp3-HD-Zephyr

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Female
Provider: Google
Voice: en-GB-Neural2-N

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Male
Provider: Google
Voice: en-GB-Neural2-O

***

Language (Locale): English (UK)
Language code: en-GB
Type: Standard
Gender: Female
Provider: Google
Voice: en-GB-Standard-N

***

Language (Locale): English (UK)
Language code: en-GB
Type: Standard
Gender: Male
Provider: Google
Voice: en-GB-Standard-O

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Female
Provider: Google
Voice: en-GB-Wavenet-N

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Male
Provider: Google
Voice: en-GB-Wavenet-O

***

Language (Locale): English (UK)
Language code: en-GB
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): English (UK)
Language code: en-GB
Type: Standard
Gender: Female
Provider: Polly
Voice: Amy

***

Language (Locale): English (UK)
Language code: en-GB
Type: Generative
Gender: Female
Provider: Polly
Voice: Amy-Generative

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Female
Provider: Polly
Voice: Amy-Neural

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Male
Provider: Polly
Voice: Arthur-Neural

***

Language (Locale): English (UK)
Language code: en-GB
Type: Standard
Gender: Male
Provider: Polly
Voice: Brian

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Male
Provider: Polly
Voice: Brian-Neural

***

Language (Locale): English (UK)
Language code: en-GB
Type: Standard
Gender: Female
Provider: Polly
Voice: Emma

***

Language (Locale): English (UK)
Language code: en-GB
Type: Neural
Gender: Female
Provider: Polly
Voice: Emma-Neural

***

Language (Locale): English (UK)
Language code: en-GB
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Google
Voice: en-US-Chirp3-HD-Aoede

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Google
Voice: en-US-Chirp3-HD-Charon

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Google
Voice: en-US-Chirp3-HD-Fenrir

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Google
Voice: en-US-Chirp3-HD-Kore

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Google
Voice: en-US-Chirp3-HD-Leda

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Google
Voice: en-US-Chirp3-HD-Orus

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Google
Voice: en-US-Chirp3-HD-Puck

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Google
Voice: en-US-Chirp3-HD-Zephyr

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Neural2-A

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Neural2-C

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Neural2-D

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Neural2-E

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Neural2-F

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Neural2-G

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Neural2-H

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Neural2-I

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Neural2-J

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Google
Voice: en-US-Standard-A

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Google
Voice: en-US-Standard-B

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Google
Voice: en-US-Standard-C

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Google
Voice: en-US-Standard-D

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Google
Voice: en-US-Standard-E

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Google
Voice: en-US-Standard-F

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Google
Voice: en-US-Standard-G

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Google
Voice: en-US-Standard-H

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Google
Voice: en-US-Standard-I

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Google
Voice: en-US-Standard-J

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Wavenet-A

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Wavenet-B

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Wavenet-C

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Wavenet-D

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Wavenet-E

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Wavenet-F

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Wavenet-G

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Google
Voice: en-US-Wavenet-H

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Wavenet-I

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Google
Voice: en-US-Wavenet-J

***

Language (Locale): English (US)
Language code: en-US
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Polly
Voice: Danielle-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Danielle-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Polly
Voice: Gregory-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Ivy

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female (child)
Provider: Polly
Voice: Ivy-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Joanna

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Polly
Voice: Joanna-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Joanna-Neural\*

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Polly
Voice: Joey

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Polly
Voice: Joey-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Polly
Voice: Justin

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male (child)
Provider: Polly
Voice: Justin-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Kendra

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Kendra-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male (child)
Provider: Polly
Voice: Kevin

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male (child)
Provider: Polly
Voice: Kevin-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Kimberly

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Kimberly-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Male
Provider: Polly
Voice: Matthew

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Polly
Voice: Matthew-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Polly
Voice: Matthew-Neural\*

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Polly
Voice: Ruth-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Ruth-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Salli

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Salli-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Male
Provider: Polly
Voice: Stephen-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Neural
Gender: Male
Provider: Polly
Voice: Stephen-Neural

***

Language (Locale): English (US)
Language code: en-US
Type: Generative
Gender: Female
Provider: Polly
Voice: Tiffany-Generative

***

Language (Locale): English (US)
Language code: en-US
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): English (Welsh)
Language code: en-GB-WLS
Type: Standard
Gender: Male
Provider: Polly
Voice: Geraint

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Standard
Gender: Female
Provider: Google
Voice: fil-PH-Standard-A

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Standard
Gender: Female
Provider: Google
Voice: fil-PH-Standard-B

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Standard
Gender: Male
Provider: Google
Voice: fil-PH-Standard-C

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Standard
Gender: Male
Provider: Google
Voice: fil-PH-Standard-D

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Neural
Gender: Female
Provider: Google
Voice: fil-PH-Wavenet-A

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Neural
Gender: Female
Provider: Google
Voice: fil-PH-Wavenet-B

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Neural
Gender: Male
Provider: Google
Voice: fil-PH-Wavenet-C

***

Language (Locale): Filipino (Philippines)
Language code: fil-PH
Type: Neural
Gender: Male
Provider: Google
Voice: fil-PH-Wavenet-D

***

Language (Locale): Finnish (Finland)
Language code: fi-FI
Type: Standard
Gender: Female
Provider: Google
Voice: fi-FI-Standard-B

***

Language (Locale): Finnish (Finland)
Language code: fi-FI
Type: Neural
Gender: Female
Provider: Google
Voice: fi-FI-Wavenet-B

***

Language (Locale): Finnish (Finland)
Language code: fi-FI
Type: Neural
Gender: Female
Provider: Polly
Voice: Suvi-Neural

***

Language (Locale): French (Belgium)
Language code: fr-BE
Type: Neural
Gender: Female
Provider: Polly
Voice: Isabelle-Neural

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Female
Provider: Google
Voice: fr-CA-Chirp3-HD-Aoede

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Male
Provider: Google
Voice: fr-CA-Chirp3-HD-Charon

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Male
Provider: Google
Voice: fr-CA-Chirp3-HD-Fenrir

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Female
Provider: Google
Voice: fr-CA-Chirp3-HD-Kore

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Female
Provider: Google
Voice: fr-CA-Chirp3-HD-Leda

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Male
Provider: Google
Voice: fr-CA-Chirp3-HD-Orus

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Male
Provider: Google
Voice: fr-CA-Chirp3-HD-Puck

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Generative
Gender: Female
Provider: Google
Voice: fr-CA-Chirp3-HD-Zephyr

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Female
Provider: Google
Voice: fr-CA-Neural2-A

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Male
Provider: Google
Voice: fr-CA-Neural2-B

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Female
Provider: Google
Voice: fr-CA-Neural2-C

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Male
Provider: Google
Voice: fr-CA-Neural2-D

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Standard
Gender: Female
Provider: Google
Voice: fr-CA-Standard-A

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Standard
Gender: Male
Provider: Google
Voice: fr-CA-Standard-B

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Standard
Gender: Female
Provider: Google
Voice: fr-CA-Standard-C

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Standard
Gender: Male
Provider: Google
Voice: fr-CA-Standard-D

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Female
Provider: Google
Voice: fr-CA-Wavenet-A

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Male
Provider: Google
Voice: fr-CA-Wavenet-B

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Female
Provider: Google
Voice: fr-CA-Wavenet-C

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Male
Provider: Google
Voice: fr-CA-Wavenet-D

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Standard
Gender: Female
Provider: Polly
Voice: Chantal

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Female
Provider: Polly
Voice: Gabrielle-Neural

***

Language (Locale): French (Canada)
Language code: fr-CA
Type: Neural
Gender: Male
Provider: Polly
Voice: Liam-Neural

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Female
Provider: Google
Voice: fr-FR-Chirp3-HD-Aoede

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Male
Provider: Google
Voice: fr-FR-Chirp3-HD-Charon

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Male
Provider: Google
Voice: fr-FR-Chirp3-HD-Fenrir

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Female
Provider: Google
Voice: fr-FR-Chirp3-HD-Kore

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Female
Provider: Google
Voice: fr-FR-Chirp3-HD-Leda

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Male
Provider: Google
Voice: fr-FR-Chirp3-HD-Orus

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Male
Provider: Google
Voice: fr-FR-Chirp3-HD-Puck

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Female
Provider: Google
Voice: fr-FR-Chirp3-HD-Zephyr

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Female
Provider: Google
Voice: fr-FR-Neural2-F

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Male
Provider: Google
Voice: fr-FR-Neural2-G

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Female
Provider: Google
Voice: fr-FR-Standard-F

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Male
Provider: Google
Voice: fr-FR-Standard-G

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Female
Provider: Google
Voice: fr-FR-Wavenet-F

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Male
Provider: Google
Voice: fr-FR-Wavenet-G

***

Language (Locale): French (France)
Language code: fr-FR
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Female
Provider: Polly
Voice: Celine

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Female
Provider: Polly
Voice: Céline

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Female
Provider: Polly
Voice: Lea

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Female
Provider: Polly
Voice: Léa

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Female
Provider: Polly
Voice: Lea-Generative

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Female
Provider: Polly
Voice: Lea-Neural

***

Language (Locale): French (France)
Language code: fr-FR
Type: Standard
Gender: Male
Provider: Polly
Voice: Mathieu

***

Language (Locale): French (France)
Language code: fr-FR
Type: Generative
Gender: Male
Provider: Polly
Voice: Rémi-Generative

***

Language (Locale): French (France)
Language code: fr-FR
Type: Neural
Gender: Male
Provider: Polly
Voice: Remi-Neural

***

Language (Locale): French (France)
Language code: fr-FR
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Galician (Spain)
Language code: gl-ES
Type: Standard
Gender: Female
Provider: Google
Voice: gl-ES-Standard-B

***

Language (Locale): German (Austria)
Language code: de-AT
Type: Neural
Gender: Female
Provider: Polly
Voice: Hannah-Neural

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Female
Provider: Google
Voice: de-DE-Chirp3-HD-Aoede

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Male
Provider: Google
Voice: de-DE-Chirp3-HD-Charon

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Male
Provider: Google
Voice: de-DE-Chirp3-HD-Fenrir

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Female
Provider: Google
Voice: de-DE-Chirp3-HD-Kore

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Female
Provider: Google
Voice: de-DE-Chirp3-HD-Leda

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Male
Provider: Google
Voice: de-DE-Chirp3-HD-Orus

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Male
Provider: Google
Voice: de-DE-Chirp3-HD-Puck

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Female
Provider: Google
Voice: de-DE-Chirp3-HD-Zephyr

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Female
Provider: Google
Voice: de-DE-Neural2-G

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Male
Provider: Google
Voice: de-DE-Neural2-H

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Standard
Gender: Female
Provider: Google
Voice: de-DE-Standard-G

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Standard
Gender: Male
Provider: Google
Voice: de-DE-Standard-H

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Female
Provider: Google
Voice: de-DE-Wavenet-G

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Male
Provider: Google
Voice: de-DE-Wavenet-H

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Male
Provider: Polly
Voice: Daniel-Generative

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Male
Provider: Polly
Voice: Daniel-Neural

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Standard
Gender: Male
Provider: Polly
Voice: Hans

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Standard
Gender: Female
Provider: Polly
Voice: Marlene

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Standard
Gender: Female
Provider: Polly
Voice: Vicki

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Generative
Gender: Female
Provider: Polly
Voice: Vicki-Generative

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Neural
Gender: Female
Provider: Polly
Voice: Vicki-Neural

***

Language (Locale): German (Germany)
Language code: de-DE
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Greek (Greece)
Language code: el-GR
Type: Standard
Gender: Female
Provider: Google
Voice: el-GR-Standard-B

***

Language (Locale): Greek (Greece)
Language code: el-GR
Type: Neural
Gender: Female
Provider: Google
Voice: el-GR-Wavenet-B

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Female
Provider: Google
Voice: gu-IN-Chirp3-HD-Aoede

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Male
Provider: Google
Voice: gu-IN-Chirp3-HD-Charon

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Male
Provider: Google
Voice: gu-IN-Chirp3-HD-Fenrir

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Female
Provider: Google
Voice: gu-IN-Chirp3-HD-Kore

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Female
Provider: Google
Voice: gu-IN-Chirp3-HD-Leda

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Male
Provider: Google
Voice: gu-IN-Chirp3-HD-Orus

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Male
Provider: Google
Voice: gu-IN-Chirp3-HD-Puck

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Generative
Gender: Female
Provider: Google
Voice: gu-IN-Chirp3-HD-Zephyr

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Standard
Gender: Female
Provider: Google
Voice: gu-IN-Standard-A

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Standard
Gender: Male
Provider: Google
Voice: gu-IN-Standard-B

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Standard
Gender: Female
Provider: Google
Voice: gu-IN-Standard-C

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Standard
Gender: Male
Provider: Google
Voice: gu-IN-Standard-D

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Neural
Gender: Female
Provider: Google
Voice: gu-IN-Wavenet-A

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Neural
Gender: Male
Provider: Google
Voice: gu-IN-Wavenet-B

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Neural
Gender: Female
Provider: Google
Voice: gu-IN-Wavenet-C

***

Language (Locale): Gujarati (India)
Language code: gu-IN
Type: Neural
Gender: Male
Provider: Google
Voice: gu-IN-Wavenet-D

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Standard
Gender: Female
Provider: Google
Voice: he-IL-Standard-A

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Standard
Gender: Male
Provider: Google
Voice: he-IL-Standard-B

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Standard
Gender: Female
Provider: Google
Voice: he-IL-Standard-C

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Standard
Gender: Male
Provider: Google
Voice: he-IL-Standard-D

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Neural
Gender: Female
Provider: Google
Voice: he-IL-Wavenet-A

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Neural
Gender: Male
Provider: Google
Voice: he-IL-Wavenet-B

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Neural
Gender: Female
Provider: Google
Voice: he-IL-Wavenet-C

***

Language (Locale): Hebrew (Israel)
Language code: he-IL
Type: Neural
Gender: Male
Provider: Google
Voice: he-IL-Wavenet-D

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Female
Provider: Google
Voice: hi-IN-Chirp3-HD-Aoede

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Male
Provider: Google
Voice: hi-IN-Chirp3-HD-Charon

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Male
Provider: Google
Voice: hi-IN-Chirp3-HD-Fenrir

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Female
Provider: Google
Voice: hi-IN-Chirp3-HD-Kore

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Female
Provider: Google
Voice: hi-IN-Chirp3-HD-Leda

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Male
Provider: Google
Voice: hi-IN-Chirp3-HD-Orus

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Male
Provider: Google
Voice: hi-IN-Chirp3-HD-Puck

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Generative
Gender: Female
Provider: Google
Voice: hi-IN-Chirp3-HD-Zephyr

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Google
Voice: hi-IN-Neural2-A

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Male
Provider: Google
Voice: hi-IN-Neural2-B

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Male
Provider: Google
Voice: hi-IN-Neural2-C

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Google
Voice: hi-IN-Neural2-D

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Female
Provider: Google
Voice: hi-IN-Standard-A

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Male
Provider: Google
Voice: hi-IN-Standard-B

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Male
Provider: Google
Voice: hi-IN-Standard-C

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Female
Provider: Google
Voice: hi-IN-Standard-D

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Female
Provider: Google
Voice: hi-IN-Standard-E

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Male
Provider: Google
Voice: hi-IN-Standard-F

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Google
Voice: hi-IN-Wavenet-A

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Male
Provider: Google
Voice: hi-IN-Wavenet-B

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Male
Provider: Google
Voice: hi-IN-Wavenet-C

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Google
Voice: hi-IN-Wavenet-D

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Google
Voice: hi-IN-Wavenet-E

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Male
Provider: Google
Voice: hi-IN-Wavenet-F

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Standard
Gender: Female
Provider: Polly
Voice: Aditi \*

***

Language (Locale): Hindi (India)
Language code: hi-IN
Type: Neural
Gender: Female
Provider: Polly
Voice: Kajal-Neural \*

***

Language (Locale): Hungarian (Hungary)
Language code: hu-HU
Type: Standard
Gender: Female
Provider: Google
Voice: hu-HU-Standard-B

***

Language (Locale): Hungarian (Hungary)
Language code: hu-HU
Type: Neural
Gender: Female
Provider: Google
Voice: hu-HU-Wavenet-B

***

Language (Locale): Icelandic (Iceland)
Language code: is-IS
Type: Standard
Gender: Female
Provider: Google
Voice: is-IS-Standard-B

***

Language (Locale): Icelandic (Iceland)
Language code: is-IS
Type: Standard
Gender: Female
Provider: Polly
Voice: Dora

***

Language (Locale): Icelandic (Iceland)
Language code: is-IS
Type: Standard
Gender: Female
Provider: Polly
Voice: Dóra

***

Language (Locale): Icelandic (Iceland)
Language code: is-IS
Type: Standard
Gender: Male
Provider: Polly
Voice: Karl

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Female
Provider: Google
Voice: id-ID-Chirp3-HD-Aoede

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Male
Provider: Google
Voice: id-ID-Chirp3-HD-Charon

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Male
Provider: Google
Voice: id-ID-Chirp3-HD-Fenrir

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Female
Provider: Google
Voice: id-ID-Chirp3-HD-Kore

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Female
Provider: Google
Voice: id-ID-Chirp3-HD-Leda

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Male
Provider: Google
Voice: id-ID-Chirp3-HD-Orus

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Male
Provider: Google
Voice: id-ID-Chirp3-HD-Puck

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Generative
Gender: Female
Provider: Google
Voice: id-ID-Chirp3-HD-Zephyr

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Standard
Gender: Female
Provider: Google
Voice: id-ID-Standard-A

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Standard
Gender: Male
Provider: Google
Voice: id-ID-Standard-B

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Standard
Gender: Male
Provider: Google
Voice: id-ID-Standard-C

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Standard
Gender: Female
Provider: Google
Voice: id-ID-Standard-D

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Neural
Gender: Female
Provider: Google
Voice: id-ID-Wavenet-A

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Neural
Gender: Male
Provider: Google
Voice: id-ID-Wavenet-B

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Neural
Gender: Male
Provider: Google
Voice: id-ID-Wavenet-C

***

Language (Locale): Indonesian (Indonesia)
Language code: id-ID
Type: Neural
Gender: Female
Provider: Google
Voice: id-ID-Wavenet-D

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Female
Provider: Google
Voice: it-IT-Chirp3-HD-Aoede

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Male
Provider: Google
Voice: it-IT-Chirp3-HD-Charon

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Male
Provider: Google
Voice: it-IT-Chirp3-HD-Fenrir

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Female
Provider: Google
Voice: it-IT-Chirp3-HD-Kore

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Female
Provider: Google
Voice: it-IT-Chirp3-HD-Leda

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Male
Provider: Google
Voice: it-IT-Chirp3-HD-Orus

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Male
Provider: Google
Voice: it-IT-Chirp3-HD-Puck

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Female
Provider: Google
Voice: it-IT-Chirp3-HD-Zephyr

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Male
Provider: Google
Voice: it-IT-Neural2-F

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Female
Provider: Google
Voice: it-IT-Standard-A

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Female
Provider: Google
Voice: it-IT-Standard-E

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Male
Provider: Google
Voice: it-IT-Standard-F

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Female
Provider: Google
Voice: it-IT-Wavenet-A

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Female
Provider: Google
Voice: it-IT-Wavenet-E

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Male
Provider: Google
Voice: it-IT-Wavenet-F

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Male
Provider: Polly
Voice: Adriano-Neural

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Female
Provider: Polly
Voice: Bianca

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Generative
Gender: Female
Provider: Polly
Voice: Bianca-Generative

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Neural
Gender: Female
Provider: Polly
Voice: Bianca-Neural

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Female
Provider: Polly
Voice: Carla

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Standard
Gender: Male
Provider: Polly
Voice: Giorgio

***

Language (Locale): Italian (Italy)
Language code: it-IT
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Female
Provider: Google
Voice: ja-JP-Chirp3-HD-Aoede

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Male
Provider: Google
Voice: ja-JP-Chirp3-HD-Charon

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Male
Provider: Google
Voice: ja-JP-Chirp3-HD-Fenrir

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Female
Provider: Google
Voice: ja-JP-Chirp3-HD-Kore

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Female
Provider: Google
Voice: ja-JP-Chirp3-HD-Leda

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Male
Provider: Google
Voice: ja-JP-Chirp3-HD-Orus

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Male
Provider: Google
Voice: ja-JP-Chirp3-HD-Puck

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Generative
Gender: Female
Provider: Google
Voice: ja-JP-Chirp3-HD-Zephyr

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Standard
Gender: Female
Provider: Google
Voice: ja-JP-Standard-B

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Standard
Gender: Male
Provider: Google
Voice: ja-JP-Standard-C

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Standard
Gender: Male
Provider: Google
Voice: ja-JP-Standard-D

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Female
Provider: Google
Voice: ja-JP-Wavenet-B

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Male
Provider: Google
Voice: ja-JP-Wavenet-C

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Male
Provider: Google
Voice: ja-JP-Wavenet-D

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Female
Provider: Polly
Voice: Kazuha-Neural

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Standard
Gender: Female
Provider: Polly
Voice: Mizuki

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Standard
Gender: Male
Provider: Polly
Voice: Takumi

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Male
Provider: Polly
Voice: Takumi-Neural

***

Language (Locale): Japanese (Japan)
Language code: ja-JP
Type: Neural
Gender: Female
Provider: Polly
Voice: Tomoko-Neural

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: kn-IN-Chirp3-HD-Aoede

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: kn-IN-Chirp3-HD-Charon

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: kn-IN-Chirp3-HD-Fenrir

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: kn-IN-Chirp3-HD-Kore

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: kn-IN-Chirp3-HD-Leda

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: kn-IN-Chirp3-HD-Orus

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Male
Provider: Google
Voice: kn-IN-Chirp3-HD-Puck

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Generative
Gender: Female
Provider: Google
Voice: kn-IN-Chirp3-HD-Zephyr

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Standard
Gender: Female
Provider: Google
Voice: kn-IN-Standard-A

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Standard
Gender: Male
Provider: Google
Voice: kn-IN-Standard-B

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Standard
Gender: Female
Provider: Google
Voice: kn-IN-Standard-C

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Standard
Gender: Male
Provider: Google
Voice: kn-IN-Standard-D

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Neural
Gender: Female
Provider: Google
Voice: kn-IN-Wavenet-A

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Neural
Gender: Male
Provider: Google
Voice: kn-IN-Wavenet-B

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Neural
Gender: Female
Provider: Google
Voice: kn-IN-Wavenet-C

***

Language (Locale): Kannada (India)
Language code: kn-IN
Type: Neural
Gender: Male
Provider: Google
Voice: kn-IN-Wavenet-D

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Female
Provider: Google
Voice: ko-KR-Chirp3-HD-Aoede

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Male
Provider: Google
Voice: ko-KR-Chirp3-HD-Charon

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Male
Provider: Google
Voice: ko-KR-Chirp3-HD-Fenrir

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Female
Provider: Google
Voice: ko-KR-Chirp3-HD-Kore

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Female
Provider: Google
Voice: ko-KR-Chirp3-HD-Leda

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Male
Provider: Google
Voice: ko-KR-Chirp3-HD-Orus

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Male
Provider: Google
Voice: ko-KR-Chirp3-HD-Puck

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Generative
Gender: Female
Provider: Google
Voice: ko-KR-Chirp3-HD-Zephyr

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Female
Provider: Google
Voice: ko-KR-Neural2-A

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Female
Provider: Google
Voice: ko-KR-Neural2-B

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Male
Provider: Google
Voice: ko-KR-Neural2-C

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Standard
Gender: Female
Provider: Google
Voice: ko-KR-Standard-A

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Standard
Gender: Female
Provider: Google
Voice: ko-KR-Standard-B

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Standard
Gender: Male
Provider: Google
Voice: ko-KR-Standard-C

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Standard
Gender: Male
Provider: Google
Voice: ko-KR-Standard-D

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Female
Provider: Google
Voice: ko-KR-Wavenet-A

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Female
Provider: Google
Voice: ko-KR-Wavenet-B

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Male
Provider: Google
Voice: ko-KR-Wavenet-C

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Male
Provider: Google
Voice: ko-KR-Wavenet-D

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Standard
Gender: Female
Provider: Polly
Voice: Seoyeon

***

Language (Locale): Korean (South Korea)
Language code: ko-KR
Type: Neural
Gender: Female
Provider: Polly
Voice: Seoyeon-Neural

***

Language (Locale): Latvian (Latvia)
Language code: lv-LV
Type: Standard
Gender: Male
Provider: Google
Voice: lv-LV-Standard-B

***

Language (Locale): Lithuanian (Lithuania)
Language code: lt-LT
Type: Standard
Gender: Male
Provider: Google
Voice: lt-LT-Standard-B

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Standard
Gender: Female
Provider: Google
Voice: ms-MY-Standard-A

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Standard
Gender: Male
Provider: Google
Voice: ms-MY-Standard-B

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Standard
Gender: Female
Provider: Google
Voice: ms-MY-Standard-C

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Standard
Gender: Male
Provider: Google
Voice: ms-MY-Standard-D

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Neural
Gender: Female
Provider: Google
Voice: ms-MY-Wavenet-A

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Neural
Gender: Male
Provider: Google
Voice: ms-MY-Wavenet-B

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Neural
Gender: Female
Provider: Google
Voice: ms-MY-Wavenet-C

***

Language (Locale): Malay (Malaysia)
Language code: ms-MY
Type: Neural
Gender: Male
Provider: Google
Voice: ms-MY-Wavenet-D

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ml-IN-Chirp3-HD-Aoede

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ml-IN-Chirp3-HD-Charon

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ml-IN-Chirp3-HD-Fenrir

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ml-IN-Chirp3-HD-Kore

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ml-IN-Chirp3-HD-Leda

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ml-IN-Chirp3-HD-Orus

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ml-IN-Chirp3-HD-Puck

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ml-IN-Chirp3-HD-Zephyr

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Standard
Gender: Female
Provider: Google
Voice: ml-IN-Standard-A

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Standard
Gender: Male
Provider: Google
Voice: ml-IN-Standard-B

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Standard
Gender: Female
Provider: Google
Voice: ml-IN-Standard-C

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Standard
Gender: Male
Provider: Google
Voice: ml-IN-Standard-D

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Neural
Gender: Female
Provider: Google
Voice: ml-IN-Wavenet-A

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Neural
Gender: Male
Provider: Google
Voice: ml-IN-Wavenet-B

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Neural
Gender: Female
Provider: Google
Voice: ml-IN-Wavenet-C

***

Language (Locale): Malayalam (India)
Language code: ml-IN
Type: Neural
Gender: Male
Provider: Google
Voice: ml-IN-Wavenet-D

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Female
Provider: Google
Voice: mr-IN-Chirp3-HD-Aoede

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Male
Provider: Google
Voice: mr-IN-Chirp3-HD-Charon

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Male
Provider: Google
Voice: mr-IN-Chirp3-HD-Fenrir

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Female
Provider: Google
Voice: mr-IN-Chirp3-HD-Kore

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Female
Provider: Google
Voice: mr-IN-Chirp3-HD-Leda

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Male
Provider: Google
Voice: mr-IN-Chirp3-HD-Orus

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Male
Provider: Google
Voice: mr-IN-Chirp3-HD-Puck

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Generative
Gender: Female
Provider: Google
Voice: mr-IN-Chirp3-HD-Zephyr

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Standard
Gender: Female
Provider: Google
Voice: mr-IN-Standard-A

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Standard
Gender: Male
Provider: Google
Voice: mr-IN-Standard-B

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Standard
Gender: Female
Provider: Google
Voice: mr-IN-Standard-C

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Neural
Gender: Female
Provider: Google
Voice: mr-IN-Wavenet-A

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Neural
Gender: Male
Provider: Google
Voice: mr-IN-Wavenet-B

***

Language (Locale): Marathi (India)
Language code: mr-IN
Type: Neural
Gender: Female
Provider: Google
Voice: mr-IN-Wavenet-C

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Standard
Gender: Female
Provider: Google
Voice: nb-NO-Standard-F

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Standard
Gender: Male
Provider: Google
Voice: nb-NO-Standard-G

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Neural
Gender: Female
Provider: Google
Voice: nb-NO-Wavenet-F

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Neural
Gender: Male
Provider: Google
Voice: nb-NO-Wavenet-G

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Neural
Gender: Female
Provider: Polly
Voice: Ida-Neural

***

Language (Locale): Norwegian (Norway)
Language code: nb-NO
Type: Standard
Gender: Female
Provider: Polly
Voice: Liv

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Female
Provider: Google
Voice: pl-PL-Chirp3-HD-Aoede

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Male
Provider: Google
Voice: pl-PL-Chirp3-HD-Charon

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Male
Provider: Google
Voice: pl-PL-Chirp3-HD-Fenrir

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Female
Provider: Google
Voice: pl-PL-Chirp3-HD-Kore

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Female
Provider: Google
Voice: pl-PL-Chirp3-HD-Leda

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Male
Provider: Google
Voice: pl-PL-Chirp3-HD-Orus

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Male
Provider: Google
Voice: pl-PL-Chirp3-HD-Puck

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Generative
Gender: Female
Provider: Google
Voice: pl-PL-Chirp3-HD-Zephyr

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Female
Provider: Google
Voice: pl-PL-Standard-F

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Male
Provider: Google
Voice: pl-PL-Standard-G

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Neural
Gender: Female
Provider: Google
Voice: pl-PL-Wavenet-F

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Neural
Gender: Male
Provider: Google
Voice: pl-PL-Wavenet-G

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Female
Provider: Polly
Voice: Ewa

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Male
Provider: Polly
Voice: Jacek

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Male
Provider: Polly
Voice: Jan

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Standard
Gender: Female
Provider: Polly
Voice: Maja

***

Language (Locale): Polish (Poland)
Language code: pl-PL
Type: Neural
Gender: Female
Provider: Polly
Voice: Ola-Neural

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Female
Provider: Google
Voice: pt-BR-Chirp3-HD-Aoede

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Male
Provider: Google
Voice: pt-BR-Chirp3-HD-Charon

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Male
Provider: Google
Voice: pt-BR-Chirp3-HD-Fenrir

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Female
Provider: Google
Voice: pt-BR-Chirp3-HD-Kore

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Female
Provider: Google
Voice: pt-BR-Chirp3-HD-Leda

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Male
Provider: Google
Voice: pt-BR-Chirp3-HD-Orus

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Male
Provider: Google
Voice: pt-BR-Chirp3-HD-Puck

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Generative
Gender: Female
Provider: Google
Voice: pt-BR-Chirp3-HD-Zephyr

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Google
Voice: pt-BR-Neural2-A

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Male
Provider: Google
Voice: pt-BR-Neural2-B

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Google
Voice: pt-BR-Neural2-C

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Male
Provider: Google
Voice: pt-BR-Standard-B

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Female
Provider: Google
Voice: pt-BR-Standard-C

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Female
Provider: Google
Voice: pt-BR-Standard-D

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Male
Provider: Google
Voice: pt-BR-Standard-E

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Male
Provider: Google
Voice: pt-BR-Wavenet-B

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Google
Voice: pt-BR-Wavenet-C

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Google
Voice: pt-BR-Wavenet-D

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Male
Provider: Google
Voice: pt-BR-Wavenet-E

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Female
Provider: Polly
Voice: Camila

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Polly
Voice: Camila-Neural

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Male
Provider: Polly
Voice: Ricardo

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Male
Provider: Polly
Voice: Thiago-Neural

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Female
Provider: Polly
Voice: Vitoria

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Standard
Gender: Female
Provider: Polly
Voice: Vitória

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Polly
Voice: Vitoria-Neural

***

Language (Locale): Portuguese (Brazil)
Language code: pt-BR
Type: Neural
Gender: Female
Provider: Polly
Voice: Vitória-Neural

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Standard
Gender: Female
Provider: Google
Voice: pt-PT-Standard-E

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Standard
Gender: Male
Provider: Google
Voice: pt-PT-Standard-F

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Neural
Gender: Female
Provider: Google
Voice: pt-PT-Wavenet-E

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Neural
Gender: Male
Provider: Google
Voice: pt-PT-Wavenet-F

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Standard
Gender: Male
Provider: Polly
Voice: Cristiano

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Standard
Gender: Female
Provider: Polly
Voice: Ines

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Standard
Gender: Female
Provider: Polly
Voice: Inês

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Neural
Gender: Female
Provider: Polly
Voice: Ines-Neural

***

Language (Locale): Portuguese (Portugal)
Language code: pt-PT
Type: Neural
Gender: Female
Provider: Polly
Voice: Inês-Neural

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Standard
Gender: Female
Provider: Google
Voice: pa-IN-Standard-A

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Standard
Gender: Male
Provider: Google
Voice: pa-IN-Standard-B

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Standard
Gender: Female
Provider: Google
Voice: pa-IN-Standard-C

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Standard
Gender: Male
Provider: Google
Voice: pa-IN-Standard-D

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Neural
Gender: Female
Provider: Google
Voice: pa-IN-Wavenet-A

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Neural
Gender: Male
Provider: Google
Voice: pa-IN-Wavenet-B

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Neural
Gender: Female
Provider: Google
Voice: pa-IN-Wavenet-C

***

Language (Locale): Punjabi (India)
Language code: pa-IN
Type: Neural
Gender: Male
Provider: Google
Voice: pa-IN-Wavenet-D

***

Language (Locale): Romanian (Romania)
Language code: ro-RO
Type: Standard
Gender: Female
Provider: Google
Voice: ro-RO-Standard-B

***

Language (Locale): Romanian (Romania)
Language code: ro-RO
Type: Neural
Gender: Female
Provider: Google
Voice: ro-RO-Wavenet-B

***

Language (Locale): Romanian (Romania)
Language code: ro-RO
Type: Standard
Gender: Female
Provider: Polly
Voice: Carmen

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Female
Provider: Google
Voice: ru-RU-Chirp3-HD-Aoede

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Male
Provider: Google
Voice: ru-RU-Chirp3-HD-Charon

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Male
Provider: Google
Voice: ru-RU-Chirp3-HD-Fenrir

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Female
Provider: Google
Voice: ru-RU-Chirp3-HD-Kore

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Female
Provider: Google
Voice: ru-RU-Chirp3-HD-Leda

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Male
Provider: Google
Voice: ru-RU-Chirp3-HD-Orus

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Male
Provider: Google
Voice: ru-RU-Chirp3-HD-Puck

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Generative
Gender: Female
Provider: Google
Voice: ru-RU-Chirp3-HD-Zephyr

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Female
Provider: Google
Voice: ru-RU-Standard-A

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Male
Provider: Google
Voice: ru-RU-Standard-B

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Female
Provider: Google
Voice: ru-RU-Standard-C

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Male
Provider: Google
Voice: ru-RU-Standard-D

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Female
Provider: Google
Voice: ru-RU-Standard-E

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Neural
Gender: Female
Provider: Google
Voice: ru-RU-Wavenet-A

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Neural
Gender: Male
Provider: Google
Voice: ru-RU-Wavenet-B

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Neural
Gender: Female
Provider: Google
Voice: ru-RU-Wavenet-C

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Neural
Gender: Male
Provider: Google
Voice: ru-RU-Wavenet-D

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Neural
Gender: Female
Provider: Google
Voice: ru-RU-Wavenet-E

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Male
Provider: Polly
Voice: Maxim

***

Language (Locale): Russian (Russia)
Language code: ru-RU
Type: Standard
Gender: Female
Provider: Polly
Voice: Tatyana

***

Language (Locale): Slovak (Slovakia)
Language code: sk-SK
Type: Standard
Gender: Female
Provider: Google
Voice: sk-SK-Standard-B

***

Language (Locale): Slovak (Slovakia)
Language code: sk-SK
Type: Neural
Gender: Female
Provider: Google
Voice: sk-SK-Wavenet-B

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Generative
Gender: Male
Provider: Polly
Voice: Andres-Generative

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Neural
Gender: Male
Provider: Polly
Voice: Andres-Neural

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Standard
Gender: Female
Provider: Polly
Voice: Mia

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Generative
Gender: Female
Provider: Polly
Voice: Mía-Generative

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Neural
Gender: Female
Provider: Polly
Voice: Mia-Neural

***

Language (Locale): Spanish (Mexico)
Language code: es-MX
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Female
Provider: Google
Voice: es-ES-Chirp3-HD-Aoede

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Male
Provider: Google
Voice: es-ES-Chirp3-HD-Charon

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Male
Provider: Google
Voice: es-ES-Chirp3-HD-Fenrir

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Female
Provider: Google
Voice: es-ES-Chirp3-HD-Kore

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Female
Provider: Google
Voice: es-ES-Chirp3-HD-Leda

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Male
Provider: Google
Voice: es-ES-Chirp3-HD-Orus

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Male
Provider: Google
Voice: es-ES-Chirp3-HD-Puck

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Female
Provider: Google
Voice: es-ES-Chirp3-HD-Zephyr

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Male
Provider: Google
Voice: es-ES-Neural2-G

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Female
Provider: Google
Voice: es-ES-Neural2-H

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Female
Provider: Google
Voice: es-ES-Standard-A

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Male
Provider: Google
Voice: es-ES-Standard-E

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Female
Provider: Google
Voice: es-ES-Standard-F

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Male
Provider: Google
Voice: es-ES-Standard-G

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Female
Provider: Google
Voice: es-ES-Standard-H

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Male
Provider: Google
Voice: es-ES-Wavenet-E

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Female
Provider: Google
Voice: es-ES-Wavenet-F

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Male
Provider: Google
Voice: es-ES-Wavenet-G

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Female
Provider: Google
Voice: es-ES-Wavenet-H

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Female
Provider: Polly
Voice: Conchita

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Male
Provider: Polly
Voice: Enrique

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Standard
Gender: Female
Provider: Polly
Voice: Lucia

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Female
Provider: Polly
Voice: Lucia-Generative

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Female
Provider: Polly
Voice: Lucia-Neural

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Generative
Gender: Male
Provider: Polly
Voice: Sergio-Generative

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Neural
Gender: Male
Provider: Polly
Voice: Sergio-Neural

***

Language (Locale): Spanish (Spain)
Language code: es-ES
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Female
Provider: Google
Voice: es-US-Chirp3-HD-Aoede

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Male
Provider: Google
Voice: es-US-Chirp3-HD-Charon

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Male
Provider: Google
Voice: es-US-Chirp3-HD-Fenrir

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Female
Provider: Google
Voice: es-US-Chirp3-HD-Kore

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Female
Provider: Google
Voice: es-US-Chirp3-HD-Leda

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Male
Provider: Google
Voice: es-US-Chirp3-HD-Orus

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Male
Provider: Google
Voice: es-US-Chirp3-HD-Puck

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Female
Provider: Google
Voice: es-US-Chirp3-HD-Zephyr

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Female
Provider: Google
Voice: es-US-Neural2-A

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Male
Provider: Google
Voice: es-US-Neural2-B

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Male
Provider: Google
Voice: es-US-Neural2-C

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Female
Provider: Google
Voice: es-US-Standard-A

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Male
Provider: Google
Voice: es-US-Standard-B

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Male
Provider: Google
Voice: es-US-Standard-C

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Female
Provider: Google
Voice: es-US-Wavenet-A

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Male
Provider: Google
Voice: es-US-Wavenet-B

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Male
Provider: Google
Voice: es-US-Wavenet-C

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Basic
Gender: Male
Provider:&#x20;
Voice: Man

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Lupe

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Female
Provider: Polly
Voice: Lupe-Generative

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Female
Provider: Polly
Voice: Lupe-Neural

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Male
Provider: Polly
Voice: Miguel

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Generative
Gender: Male
Provider: Polly
Voice: Pedro-Generative

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Neural
Gender: Male
Provider: Polly
Voice: Pedro-Neural

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Penelope

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Standard
Gender: Female
Provider: Polly
Voice: Penélope

***

Language (Locale): Spanish (US)
Language code: es-US
Type: Basic
Gender: Female
Provider: Polly
Voice: Woman

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Standard
Gender: Female
Provider: Google
Voice: sv-SE-Standard-F

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Standard
Gender: Male
Provider: Google
Voice: sv-SE-Standard-G

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Neural
Gender: Female
Provider: Google
Voice: sv-SE-Wavenet-F

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Neural
Gender: Male
Provider: Google
Voice: sv-SE-Wavenet-G

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Standard
Gender: Female
Provider: Polly
Voice: Astrid

***

Language (Locale): Swedish (Sweden)
Language code: sv-SE
Type: Neural
Gender: Female
Provider: Polly
Voice: Elin-Neural

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ta-IN-Chirp3-HD-Aoede

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ta-IN-Chirp3-HD-Charon

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ta-IN-Chirp3-HD-Fenrir

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ta-IN-Chirp3-HD-Kore

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ta-IN-Chirp3-HD-Leda

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ta-IN-Chirp3-HD-Orus

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Male
Provider: Google
Voice: ta-IN-Chirp3-HD-Puck

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Generative
Gender: Female
Provider: Google
Voice: ta-IN-Chirp3-HD-Zephyr

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Standard
Gender: Female
Provider: Google
Voice: ta-IN-Standard-C

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Standard
Gender: Male
Provider: Google
Voice: ta-IN-Standard-D

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Neural
Gender: Female
Provider: Google
Voice: ta-IN-Wavenet-C

***

Language (Locale): Tamil (India)
Language code: ta-IN
Type: Neural
Gender: Male
Provider: Google
Voice: ta-IN-Wavenet-D

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Female
Provider: Google
Voice: te-IN-Chirp3-HD-Aoede

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Male
Provider: Google
Voice: te-IN-Chirp3-HD-Charon

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Male
Provider: Google
Voice: te-IN-Chirp3-HD-Fenrir

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Female
Provider: Google
Voice: te-IN-Chirp3-HD-Kore

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Female
Provider: Google
Voice: te-IN-Chirp3-HD-Leda

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Male
Provider: Google
Voice: te-IN-Chirp3-HD-Orus

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Male
Provider: Google
Voice: te-IN-Chirp3-HD-Puck

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Generative
Gender: Female
Provider: Google
Voice: te-IN-Chirp3-HD-Zephyr

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Standard
Gender: Female
Provider: Google
Voice: te-IN-Standard-A

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Standard
Gender: Male
Provider: Google
Voice: te-IN-Standard-B

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Standard
Gender: Female
Provider: Google
Voice: te-IN-Standard-C

***

Language (Locale): Telugu (India)
Language code: te-IN
Type: Standard
Gender: Male
Provider: Google
Voice: te-IN-Standard-D

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Female
Provider: Google
Voice: th-TH-Chirp3-HD-Aoede

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Male
Provider: Google
Voice: th-TH-Chirp3-HD-Charon

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Male
Provider: Google
Voice: th-TH-Chirp3-HD-Fenrir

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Female
Provider: Google
Voice: th-TH-Chirp3-HD-Kore

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Female
Provider: Google
Voice: th-TH-Chirp3-HD-Leda

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Male
Provider: Google
Voice: th-TH-Chirp3-HD-Orus

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Male
Provider: Google
Voice: th-TH-Chirp3-HD-Puck

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Generative
Gender: Female
Provider: Google
Voice: th-TH-Chirp3-HD-Zephyr

***

Language (Locale): Thai (Thailand)
Language code: th-TH
Type: Standard
Gender: Female
Provider: Google
Voice: th-TH-Standard-A

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Female
Provider: Google
Voice: tr-TR-Chirp3-HD-Aoede

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Male
Provider: Google
Voice: tr-TR-Chirp3-HD-Charon

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Male
Provider: Google
Voice: tr-TR-Chirp3-HD-Fenrir

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Female
Provider: Google
Voice: tr-TR-Chirp3-HD-Kore

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Female
Provider: Google
Voice: tr-TR-Chirp3-HD-Leda

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Male
Provider: Google
Voice: tr-TR-Chirp3-HD-Orus

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Male
Provider: Google
Voice: tr-TR-Chirp3-HD-Puck

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Generative
Gender: Female
Provider: Google
Voice: tr-TR-Chirp3-HD-Zephyr

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Female
Provider: Google
Voice: tr-TR-Standard-A

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Male
Provider: Google
Voice: tr-TR-Standard-B

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Female
Provider: Google
Voice: tr-TR-Standard-C

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Female
Provider: Google
Voice: tr-TR-Standard-D

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Male
Provider: Google
Voice: tr-TR-Standard-E

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Female
Provider: Google
Voice: tr-TR-Wavenet-A

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Male
Provider: Google
Voice: tr-TR-Wavenet-B

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Female
Provider: Google
Voice: tr-TR-Wavenet-C

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Female
Provider: Google
Voice: tr-TR-Wavenet-D

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Male
Provider: Google
Voice: tr-TR-Wavenet-E

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Neural
Gender: Female
Provider: Polly
Voice: Burcu-Neural

***

Language (Locale): Turkish (Turkey)
Language code: tr-TR
Type: Standard
Gender: Female
Provider: Polly
Voice: Filiz

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Female
Provider: Google
Voice: vi-VN-Chirp3-HD-Aoede

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Male
Provider: Google
Voice: vi-VN-Chirp3-HD-Charon

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Male
Provider: Google
Voice: vi-VN-Chirp3-HD-Fenrir

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Female
Provider: Google
Voice: vi-VN-Chirp3-HD-Kore

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Female
Provider: Google
Voice: vi-VN-Chirp3-HD-Leda

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Male
Provider: Google
Voice: vi-VN-Chirp3-HD-Orus

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Male
Provider: Google
Voice: vi-VN-Chirp3-HD-Puck

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Generative
Gender: Female
Provider: Google
Voice: vi-VN-Chirp3-HD-Zephyr

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Standard
Gender: Female
Provider: Google
Voice: vi-VN-Standard-A

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Standard
Gender: Male
Provider: Google
Voice: vi-VN-Standard-B

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Standard
Gender: Female
Provider: Google
Voice: vi-VN-Standard-C

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Standard
Gender: Male
Provider: Google
Voice: vi-VN-Standard-D

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Neural
Gender: Female
Provider: Google
Voice: vi-VN-Wavenet-A

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Neural
Gender: Male
Provider: Google
Voice: vi-VN-Wavenet-B

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Neural
Gender: Female
Provider: Google
Voice: vi-VN-Wavenet-C

***

Language (Locale): Vietnamese (Vietnam)
Language code: vi-VN
Type: Neural
Gender: Male
Provider: Google
Voice: vi-VN-Wavenet-D

***

Language (Locale): Welsh
Language code: cy-GB
Type: Standard
Gender: Female
Provider: Polly
Voice: Gwyneth

***

[polly-bilingual]: https://docs.aws.amazon.com/polly/latest/dg/bilingual-voices.html#true-bilingual

Bilingual voices are identified with (\*) in the **Voice** column. At the moment, only Amazon Polly supports this for a limited number of voices. To learn more about the bilingual voices, consult the [Amazon Polly documentation][polly-bilingual].

## Text-to-Speech settings

> \[!NOTE]
>
> The **TTS Settings** described in this section only apply to the [`<Say>` TwiML](/docs/voice/twiml/say) verb and [`<Pay>`'s `<Prompt>` TwiML](/docs/voice/twiml/pay/prompt) noun.
>
> Text-to-Speech capabilities in [`<ConversationRelay>`](/docs/voice/twiml/connect/conversationrelay) have their own settings and defaults for the `voice` attribute, which depends on the **Provider** and **Language** used. Consult the [Conversation Relay documentation](/docs/voice/twiml/connect/conversationrelay) for more information.

### Set a default voice and language

To define the default voice and language for your account, go to the [**Text-to-Speech** page][console-text-to-speech] in the Twilio Console.

[console-text-to-speech]: https://console.twilio.com/us1/develop/voice/settings/text-to-speech?frameUrl=%2Fconsole%2Fvoice%2Ftwiml%2Ftext-to-speech%3Fx-target-region%3Dus1

* When you don't set `language` or `voice` attributes in your [`<Say>` TwiML](/docs/voice/twiml/say) verb, it uses the default values.
* When you select **Default** in Studio, it uses the default values.

You can test different voices and messages in this section of the Console.

> \[!NOTE]
>
> Consider that you set the **Your default provider** to **Basic** and set the **Default voice** to **Man, en-US** as your **Default Settings**.
>
> With these TTS settings, Twilio uses the **Man** voice and the **en-US** (American English) accent and pronunciation when executing the following TwiML:
>
> ```xml
> <Response>
>   <Say>Hello. I am a man!</Say>
> </Response>
> ```

### Map a voice for a language

Twilio updates the offered Text-to-Speech voices on a regular basis. To access the latest voices without needing to review and change your code, use the **Language Mapping** feature. Your application only needs the language and the text. Twilio automatically selects and uses the corresponding voice. You can update these at any time from the Console.

On the [**Text-to-Speech** page][console-text-to-speech] in the Console, you can set a voice for every locale.

To set a voice for a locale, complete the following steps.

1. Go to the [**Text-to-Speech** page][console-text-to-speech] in the Console.
2. Under the **Current Language Mapping** heading, click the language and locale you wish to configure. As an example, choose **English (British)(en-GB)**. The **Test & Configure Voices By Language** modal displays.
3. From the dropdown menus, select the **Provider** and **Voice** you wish to use. As an example, choose **Amazon Polly** and **Emma**.
4. Click **Save**.
5. Repeat steps 1 to 4 for other language and voice pairing you want to use.

With these mappings set, you can specify the `language` without specifying the `voice` when using the [`<Say>` TwiML](/docs/voice/twiml/say) verb in your application.

> \[!NOTE]
>
> Consider that you configured **English (British)(en-GB)** to use **Amazon Polly Emma** voice.
>
> In the following TwiML example, Twilio uses the **Amazon Polly Emma** voice when executing `<Say>` with the `language` attribute set to `en-GB`. This didn't require a `voice` attribute.
>
> ```xml
> <Response>
>   <Say language="en-GB">Hello. I am Emma!</Say>
> </Response>
> ```

## Override default settings

> \[!NOTE]
>
> The **TTS Settings** described in this section only apply to the [`<Say>` TwiML](/docs/voice/twiml/say) verb and [`<Pay>`'s `<Prompt>` TwiML](/docs/voice/twiml/pay/prompt) noun.
>
> Text-to-Speech capabilities in [`<ConversationRelay>`](/docs/voice/twiml/connect/conversationrelay) have their own settings and defaults for the `voice` attribute, which depends on the **Provider** and **Language** used. Consult the [Conversation Relay documentation](/docs/voice/twiml/connect/conversationrelay) for more information.

### Override default voices

`<Say>`'s `voice` attribute allows you to override any default voice settings that were configured in the Console (i.e. Account-level and Language Mapping defaults).

> \[!NOTE]
>
> Consider that you set the default Text-to-Speech voice to **Amazon Polly Salli** in your account. You want to use **Amazon Polly Joanna** for a specific call. To use the **Amazon Polly Joanna** voice for a specific call, set the `<Say>`'s `voice` attribute to `Polly.Joanna`.
>
> In the following TwiML example, Twilio uses the **Amazon Polly Joanna** voice instead of **Amazon Polly Salli** voice when executing `<Say>`.
>
> ```xml
> <Response>
>   <Say voice="Polly.Joanna">Hello. I am Joanna!</Say>
> </Response>
> ```

To override a Language Mapping's defaults, use the `voice` attribute.

> \[!NOTE]
>
> Consider that you set the language mapping for **English (British)(en-GB)** to **Amazon Polly Emma** in your account. You want to use **Amazon Polly Joanna** for a specific call. To use the **Amazon Polly Joanna** voice for a specific call, set the `<Say>`'s `voice` attribute to `Polly.Joanna`.
>
> In the following TwiML example, Twilio uses the **Amazon Polly Joanna** voice instead of **Amazon Polly Emma** voice when executing `<Say>`.
>
> ```xml
> <Response>
>   <Say language="en-GB" voice="Polly.Joanna">Hello. I am Joanna!</Say>
> </Response>
> ```

### Override default languages

`<Say>`'s `language` attribute allows you to override any default language settings that were configured in the Console (i.e. Account-level and Language Mapping defaults).

> \[!NOTE]
>
> Consider that you set your account's default Text-to-Speech Language to **English (US) (en-US)**. You want to use **German** for a specific call. To use **German**, set the `<Say>`'s `language` attribute to `de-DE`.
>
> In the following TwiML example, Twilio uses **German (de-DE)** language instead of **English (US) (en-US)** language when executing `<Say>`.
>
> ```xml
> <Response>
>   <Say language="de-DE">Hallo. Ich spreche Deutsch!</Say>
> </Response>
> ```

## Speech Synthesis Markup Language (SSML)

> \[!NOTE]
>
> **Basic** voices don't support SSML.

To fine-tune synthesized speech, use [SSML](https://www.w3.org/TR/speech-synthesis11/) tags. With SSML, you can specify where pauses should be, provide pronunciations for acronyms, abbreviations, dates and times, and increase or decrease the speed of spoken text.

### Supported SSML tags

> \[!NOTE]
>
> The [SSML specification](https://www.w3.org/TR/speech-synthesis11/) requires a root element: `<speak>`. You don't need `<speak>` inside `<Say>`. Skip `<speak>` and insert the rest of the SSML inside `<Say>`.

Twilio supports a subset of SSML tags.

SSML support may differ between Text-to-Speech providers, limited to specific voices, or both. Review the provider-specific SSML documentation and test your application. Use of SSML tags that a Text-to-Speech provider or voice doesn't support may result in error and `<Say>` instruction failure.

The following table lists supported SSML tags. To verify the correct use of SSML tags, consult the appropriate provider-specific documentation and test your application.

| Action                                              | SSML tag     | Amazon docs                  | Google docs               |
| --------------------------------------------------- | ------------ | ---------------------------- | ------------------------- |
| Add a pause                                         | `<break>`    | [Amazon][polly-break-tag]    | [Google][google-break]    |
| Emphasize words                                     | `<emphasis>` | [Amazon][polly-emphasis-tag] | [Google][google-emphasis] |
| Specify another language for specific words         | `<lang>`     | [Amazon][polly-lang-tag]     | [Google][google-lang]     |
| Add a pause between paragraphs                      | `<p>`        | [Amazon][polly-p-tag]        | [Google][google-p,s]      |
| Use phonetic pronunciation                          | `<phoneme>`  | [Amazon][polly-phoneme-tag]  | [Google][google-phoneme]  |
| Control volume, speaking rate, and pitch            | `<prosody>`  | [Amazon][polly-prosody-tag]  | [Google][google-prosody]  |
| Add a pause between sentences                       | `<s>`        | [Amazon][polly-s-tag]        | [Google][google-p,s]      |
| Control how special types of words are spoken       | `<say-as>`   | [Amazon][polly-say-as-tag]   | [Google][google-say-as]   |
| Pronounce acronyms and abbreviations                | `<sub>`      | [Amazon][polly-sub-tag]      | [Google][google-sub]      |
| Improve pronunciation by specifying parts of speech | `<w>`        | [Amazon][polly-w-tag]        | Google N/A                |

[polly-break-tag]: https://docs.aws.amazon.com/polly/latest/dg/break-tag.html

[google-break]: https://cloud.google.com/text-to-speech/docs/ssml#break

[polly-emphasis-tag]: https://docs.aws.amazon.com/polly/latest/dg/emphasis-tag.html

[google-emphasis]: https://cloud.google.com/text-to-speech/docs/ssml#emphasis

[polly-lang-tag]: https://docs.aws.amazon.com/polly/latest/dg/lang-tag.html

[google-lang]: https://cloud.google.com/text-to-speech/docs/ssml#lang

[polly-p-tag]: https://docs.aws.amazon.com/polly/latest/dg/p-tag.html

[google-p,s]: https://cloud.google.com/text-to-speech/docs/ssml#p,s

[polly-phoneme-tag]: https://docs.aws.amazon.com/polly/latest/dg/phoneme-tag.html

[google-phoneme]: https://cloud.google.com/text-to-speech/docs/ssml#phoneme

[polly-prosody-tag]: https://docs.aws.amazon.com/polly/latest/dg/prosody-tag.html

[google-prosody]: https://cloud.google.com/text-to-speech/docs/ssml#prosody

[polly-s-tag]: https://docs.aws.amazon.com/polly/latest/dg/s-tag.html

[polly-say-as-tag]: https://docs.aws.amazon.com/polly/latest/dg/say-as-tag.html

[google-say-as]: https://cloud.google.com/text-to-speech/docs/ssml#say-as

[polly-sub-tag]: https://docs.aws.amazon.com/polly/latest/dg/sub-tag.html

[google-sub]: https://cloud.google.com/text-to-speech/docs/ssml#sub

[polly-w-tag]: https://docs.aws.amazon.com/polly/latest/dg/w-tag.html

### SSML Examples

#### Modify speed and volume of synthesized speech

To control the volume, rate, and pitch of synthesized speech, use the SSML `<prosody>` tag.

```xml
<Response>
  <Say voice="Polly.Joanna">
    Prosody can be used to change the way words sound. The following words are
    <prosody volume="x-loud"> quite a bit louder than the rest of this passage.
    </prosody> Each morning when I wake up, <prosody rate="x-slow">I speak slowly and
    deliberately until I have my coffee.</prosody> I can also change the pitch of my voice
    using prosody. Do you like <prosody pitch="+5%"> speech with a pitch higher,</prosody>
    or <prosody pitch="-10%"> is a lower pitch preferable?</prosody>
  </Say>
</Response>
```

#### Read a phone number

To indicate specific categories of text, use the SSML `<say-as>` tag. This ensures the correct pronunciation with synthesized speech.

Without `<say-as>`, the voice pronounces a phone number like a number.

This results in pronouncing `4155551212` as
`four billion, one hundred fifty-five million, five hundred fifty-one thousand, two hundred twelve.`

To read the phone number as `four one five, five five five, one two one two`, use `<say-as>` as in the following TwiML document.

```xml
<Response>
   <Say voice="Polly.Joanna">John's phone number is, <say-as interpret-as="telephone">4155551212</say-as></Say>
</Response>
```

#### Generate SSML with Twilio's SDKs

You can generate TwiML with SSML within the `<Say>` verb using one of Twilio's SDKs for [C#](https://github.com/twilio/twilio-csharp), [Java](https://github.com/twilio/twilio-java), [Node.js](https://github.com/twilio/twilio-node), [PHP](https://github.com/twilio/twilio-php), [Python](https://github.com/twilio/twilio-python), [Ruby](https://github.com/twilio/twilio-ruby), or [Go](https://github.com/twilio/twilio-go).

The following code sample shows SDK code that generates the following SSML and TwiML:

```xml
<Response>
  <Say voice="Polly.Joanna">
    Hi
    <break strength="x-weak" time="100ms"/>
    <emphasis level="moderate">Words to emphasize</emphasis>
    <p>Words to speak</p>
    aaaaaa
    <phoneme alphabet="x-sampa" ph="pɪˈkɑːn">Words to speak</phoneme>
    bbbbbbb
    <prosody pitch="-10%" rate="85%" volume="-6dB">Words to speak</prosody>
    <s>Words to speak</s>
    <say-as interpret-as="spell-out">Words to speak</say-as>
    <sub alias="alias">Words to be substituted</sub>
    <w>Words to speak</w>
  </Say>
</Response>
```

SSML with SDK Example

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const say = response.say(
  {
    voice: 'Polly.Joanna',
  },
  'Hi'
);
say.break({
  strength: 'x-weak',
  time: '100ms',
});
say.emphasis(
  {
    level: 'moderate',
  },
  'Words to emphasize'
);
say.p('Words to speak');
say.addText('aaaaaa');
say.phoneme(
  {
    alphabet: 'x-sampa',
    ph: 'pɪˈkɑːn',
  },
  'Words to speak'
);
say.addText('bbbbbbb');
say.prosody(
  {
    pitch: '-10%',
    rate: '85%',
    volume: '-6dB',
  },
  'Words to speak'
);
say.s('Words to speak');
say.sayAs(
  {
    'interpret-as': 'spell-out',
    role: 'yyyymmdd',
  },
  'Words to speak'
);
say.sub(
  {
    alias: 'alias',
  },
  'Words to be substituted'
);
say.w('Words to speak');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
say = Say('Hi', voice='Polly.Joanna')
say.break_(strength='x-weak', time='100ms')
say.emphasis('Words to emphasize', level='moderate')
say.p('Words to speak')
say.append('aaaaaa')
say.phoneme('Words to speak', alphabet='x-sampa', ph='pɪˈkɑːn')
say.append('bbbbbbb')
say.prosody('Words to speak', pitch='-10%', rate='85%', volume='-6dB')
say.s('Words to speak')
say.say_as('Words to speak', interpret_as='spell-out', role='yyyymmdd')
say.sub('Words to be substituted', alias='alias')
say.w('Words to speak')
response.append(say)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var say = new Say("Hi", voice: "Polly.Joanna");
        say.Break(strength: "x-weak", time: "100ms");
        say.Emphasis("Words to emphasize", level: "moderate");
        say.P("Words to speak");
        say.AddText("aaaaaa");
        say.Phoneme("Words to speak", alphabet: "x-sampa", ph: "pɪˈkɑːn");
        say.AddText("bbbbbbb");
        say.Prosody("Words to speak", pitch: "-10%", rate: "85%", volume: "-6dB");
        say.S("Words to speak");
        say.SayAs("Words to speak", interpretAs: "spell-out", role: "yyyymmdd");
        say.Sub("Words to be substituted", alias: "alias");
        say.W("Words to speak");
        response.Append(say);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.voice.SsmlW;
import com.twilio.twiml.voice.SsmlSayAs;
import com.twilio.twiml.voice.SsmlProsody;
import com.twilio.twiml.voice.SsmlEmphasis;
import com.twilio.twiml.voice.SsmlS;
import com.twilio.twiml.voice.SsmlPhoneme;
import com.twilio.twiml.voice.SsmlP;
import com.twilio.twiml.voice.SsmlSub;
import com.twilio.twiml.voice.SsmlBreak;

public class Example {
    public static void main(String[] args) {
        SsmlBreak ssmlBreak = new SsmlBreak.Builder().strength(SsmlBreak
            .Strength.X_WEAK).time("100ms").build();
        SsmlPhoneme ssmlPhoneme = new SsmlPhoneme.Builder("Words to speak")
            .alphabet(SsmlPhoneme.Alphabet.X_SAMPA).ph("pɪˈkɑːn").build();
        SsmlP ssmlP = new SsmlP.Builder("Words to speak").build();
        SsmlProsody ssmlProsody = new SsmlProsody.Builder("Words to speak")
            .pitch("-10%").rate("85%").volume("-6dB").build();
        SsmlSub ssmlSub = new SsmlSub.Builder("Words to be substituted")
            .alias("alias").build();
        SsmlS ssmlS = new SsmlS.Builder("Words to speak").build();
        SsmlSayAs ssmlSayAs = new SsmlSayAs.Builder("Words to speak")
            .interpretAs(SsmlSayAs.InterpretAs.SPELL_OUT).build();
        SsmlW ssmlW = new SsmlW.Builder("Words to speak").build();
        SsmlEmphasis ssmlEmphasis = new SsmlEmphasis
            .Builder("Words to emphasize").level(SsmlEmphasis.Level.MODERATE)
            .build();
        Say say = new Say.Builder("Hi").voice(Say.Voice.POLLY_JOANNA)
            .break_(ssmlBreak).emphasis(ssmlEmphasis).p(ssmlP)
            .addText("aaaaaa").phoneme(ssmlPhoneme).addText("bbbbbbb")
            .prosody(ssmlProsody).s(ssmlS).sayAs(ssmlSayAs).sub(ssmlSub)
            .w(ssmlW).build();
        VoiceResponse response = new VoiceResponse.Builder().say(say).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$say = $response->say('Hi', ['voice' => 'Polly.Joanna']);
$say->break_(['strength' => 'x-weak', 'time' => '100ms']);
$say->emphasis('Words to emphasize', ['level' => 'moderate']);
$say->p('Words to speak');
$say->append('aaaaaa');
$say->phoneme('Words to speak', ['alphabet' => 'x-sampa', 'ph' => 'pɪˈkɑːn']);
$say->append('bbbbbbb');
$say->prosody('Words to speak', ['pitch' => '-10%', 'rate' => '85%',
    'volume' => '-6dB']);
$say->s('Words to speak');
$say->say_as('Words to speak', ['interpret-as' => 'spell-out']);
$say->sub('Words to be substituted', ['alias' => 'alias']);
$say->w('Words to speak');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.say(voice: 'Polly.Joanna', message: 'Hi') do |say|
  say.break(strength: 'x-weak', time: '100ms')
  say.emphasis(words: 'Words to emphasize', level: 'moderate')
  say.p(words: 'Words to speak')
  say.add_text('aaaaaa')
  say.phoneme('Words to speak', alphabet: 'x-sampa', ph: 'pɪˈkɑːn')
  say.add_text('bbbbbbb')
  say.prosody(words: 'Words to speak', pitch: '-10%', rate: '85%', volume: '-6dB')
  say.s(words: 'Words to speak')
  say.say_as('Words to speak', interpretAs: 'spell-out')
  say.sub('Words to be substituted', alias: 'alias')
  say.w(words: 'Words to speak')
end

puts response
```

```xml
<Response>
  <Say voice="Polly.Joanna">
    Hi
    <break strength="x-weak" time="100ms"/>
    <emphasis level="moderate">Words to emphasize</emphasis>
    <p>Words to speak</p>
    aaaaaa
    <phoneme alphabet="x-sampa" ph="pɪˈkɑːn">Words to speak</phoneme>
    bbbbbbb
    <prosody pitch="-10%" rate="85%" volume="-6dB">Words to speak</prosody>
    <s>Words to speak</s>
    <say-as interpret-as="spell-out">Words to speak</say-as>
    <sub alias="alias">Words to be substituted</sub>
    <w>Words to speak</w>
  </Say>
</Response>
```

## `<Say>` limitations

### Basic voice limitations

* Basic voices can process no more than 4,000 characters.
* Basic voices don't support SSML tags.

### Amazon Polly voice limitations

* `<Say>` can process no more than 3,000 characters excluding SSML.
* `<Say>` doesn't support Amazon-specific SSML tags. These would include `<amazon:auto-breath>` or `<amazon:effect>`.
* `<Say>` doesn't support lexicons.
* SSML support may vary between Polly and Polly Neural voices.\
  To review any differences, consult the [Amazon Polly SSML documentation](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html).

### Google voice limitations

* `<Say>` can process no more than 5,000 characters, including SSML, newlines and spaces.
* As Google includes SSML tags, newlines and spaces in the total character count, they count toward Google billing totals.
* `<Say>` doesn't support Google-specific SSML tags. This includes `<par>` or `<seq>`.
* SSML support may vary between Standard, WaveNet and Neural2 voices.\
  To review any differences, consult the [Google SSML documentation](https://cloud.google.com/text-to-speech/docs/ssml).

## Pricing

### Basic voices \[#basic-voices-2]

Basic voices are free of charge.

### Standard voices \[#standard-voices-2]

Standard voices (Amazon Polly and Google Standard) pricing starts at $0.0008 per 100 characters. The following volume discounts apply:

| Minimum characters | Maximum characters | Price per 100 characters |
| ------------------ | ------------------ | ------------------------ |
| 0                  | 5,000,000          | $0.00080                 |
| 5,000,001          | 50,000,000         | $0.00072                 |
| 50,000,001         | 100,000,000        | $0.00068                 |
| 100,000,001        |                    | $0.00064                 |

Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0008.

> \[!NOTE]
>
> You used 546 characters on a call. Twilio charges $0.0040 for the use of Neural voices on that call.
>
> 1. 546 rounds down to 500.
> 2. 500 = 5 blocks (500/100).
> 3. 5 \* 0.0008 = $0.0040.

### Neural voices \[#neural-voices-2]

Neural voices (Amazon Polly Neural, Google WaveNet and Google Neural2) price starts at $0.0032 per 100 characters. The following volume discounts apply:

| Minimum characters | Maximum characters | Price per 100 characters |
| ------------------ | ------------------ | ------------------------ |
| 0                  | 5,000,000          | $0.0032                  |
| 5,000,001          | 50,000,000         | $0.0029                  |
| 50,000,001         | 100,000,000        | $0.0027                  |
| 100,000,001        |                    | $0.0025                  |

Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0032.

> \[!NOTE]
>
> You used 546 characters on a call. Twilio charges $0.0160 for the use of Neural voices on that call.
>
> 1. 546 rounds down to 500.
> 2. 500 = 5 blocks (500/100).
> 3. 5 \* 0.0032 = $0.016.

### Generative voices \[#generative-voices-2]

Generative voices (Amazon Polly Generative and Google Chirp3-HD) price starts at $0.013 per 100 characters. The following volume discounts apply:

| Minimum characters | Maximum characters | Price per 100 characters |
| ------------------ | ------------------ | ------------------------ |
| 0                  | 5,000,000          | $0.013                   |
| 5,000,001          | 50,000,000         | $0.010                   |
| 50,000,001         | 100,000,000        | $0.008                   |
| 100,000,001        |                    | $0.006                   |

Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0032.

> \[!NOTE]
>
> You used 546 characters on a call. Twilio charges $0.065 for the use of Generative voices on that call.
>
> 1. 546 rounds down to 500.
> 2. 500 = 5 blocks (500/100).
> 3. 5 \* 0.013 = $0.065.

## AI Nutrition Facts

### Amazon Polly Text-to-Speech

```json
{"name":"<Say> - Amazon Polly Text-to-Speech","description":"Convert text into a human-sounding voice using speech synthesis technology from Amazon Polly.","modelType":"Generative and Predictive","optional":true,"baseModel":"Amazon Polly Text-to-Speech: Standard, Neural and Generative","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["The Base Model is not trained using Customer Data."]},"vendorModelCustomerData":{"value":false,"comments":["Programmable Voice uses the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["The Base Model is not trained using Customer Data."]},"dataDeletion":{"value":null,"comments":["The Base Model is not trained using Customer Data."]},"auditing":{"value":true,"comments":["Customers can view text input and listen to the audio output."]},"dataStorage":"30 days","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["Customers can view text input and listen to the audio output."]},"guardrails":{"value":true,"comments":["Customers can view text input and listen to the audio output."]}},"inputOutputConsistency":{"value":true,"comments":["Customers are responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/voice/twiml/say/text-speech"}
```

### Google Text-to-Speech

```json
{"name":"<Say> - Google Text-to-Speech","description":"Convert text into a human-sounding voice using speech synthesis technology from Google.","modelType":"Generative and Predictive","optional":true,"baseModel":"Google Text-to-Speech: Standard, WaveNet, Neural2 and Chirp3-HD","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["The Base Model is not trained using Customer Data."]},"vendorModelCustomerData":{"value":false,"comments":["Programmable Voice uses the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["The Base Model is not trained using Customer Data."]},"dataDeletion":{"value":null,"comments":["The Base Model is not trained using Customer Data."]},"auditing":{"value":true,"comments":["Customers can view text input and listen to the audio output."]},"dataStorage":"30 days","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["Customers can view text input and listen to the audio output."]},"guardrails":{"value":true,"comments":["Customers can view text input and listen to the audio output."]}},"inputOutputConsistency":{"value":true,"comments":["Customers are responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/voice/twiml/say/text-speech"}
```
