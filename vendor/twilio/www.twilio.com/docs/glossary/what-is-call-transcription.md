# What is Call Transcription?

The call transcription process converts a voice or video call audio track into written words stored as plain text in a conversational language. The process can transcribe calls either *live* - as a call or event happens - or use a recording of a *past* conversation.

## The importance of speech-to-text transcription

Call transcription is an important and powerful tool for business, training, medical, or legal reasons. As far more advanced search and analysis features exist for text than audio, many use cases need a text-based history of conversations. Additionally, real-time speech-to-text transcription services (such as *Closed Captioning*) increase accessibility which improves understanding for people who are hard-of-hearing or new to a language.

### Using call transcription in your business

When it comes to voice calls, call transcription is often used in a business context, for example, to [improve training and feedback for call center employees](https://www.twilio.com/blog/more-accurate-call-transcriptions-available-now-html). Logging the context and words spoken in a call can help you identify business problems algorithmically, making it easier to deploy resources in an evidence-based manner. Additionally, call transcriptions and recordings are valuable for legal purposes, where contemporaneous transcriptions, recordings, and notes are superior to other types of records.

Twilio allows you to add call transcriptions to our [Programmable Voice](https://www.twilio.com/en-us/voice) product. For recorded transcriptions, you can use our REST API's provisions to [translate recordings to speech](https://help.twilio.com/hc/en-us/articles/223132947-Listen-to-Your-Recordings-or-Voicemail). Twilio additionally has a [real-time transcription service][GatherVerb] with multiple language support and contextual analysis and Natural Language Processing support. [Talk to Sales](https://www.twilio.com/en-us/help/sales) about your call transcription requirements for information on that product.

### Legality of call transcriptions

Call transcription legality differs by jurisdiction. Some jurisdictions ban the transcribing or recording of calls or transcribing real-time speech over a call or video. Some require some or all parties in a conversation to provide informed consent. Twilio can't comment on the specifics of your local laws. Consult your relevant laws or consult with your legal representation for your unique situation.

## Dual- versus single-channel recordings for transcriptions

Due to differences in volume, accents, timing, and connection quality, the final mixed track of a voice or video call can often be unintelligible even for professional human transcribers. So-called *Single-Channel Recordings* only store the one final mixed track pre-transcription. This can increase the eventual number of transcription errors, especially if participants are speaking at the same time.

![Flowchart of dual-channel call recording and transcription process between customer and agent.](https://docs-resources.prod.twilio.com/d1b86d21603c08468c8087ab328eac14c994a672a87b86859d5e76c336710119.png)

The highest accuracy call transcription solutions record each (or all) sides of the call separately. With individual recordings, a *Dual-Channel Recording* solution (or *Multi-Channel Recording solution*) performs better at eliminating cross-talk and cancellation noise which would otherwise interfere with the final mix. It also prevents most (or all) misattribution errors.

To learn more about our dual-channel call transcription options, [consult our blog post on the topic](https://www.twilio.com/blog/more-accurate-call-transcriptions-available-now-html).

## Get started with call transcription

The [Gather][GatherVerb] or [Record](/docs/voice/twiml/record) [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml) Voice verbs both support eventual transcribing, while our [Phone Call Speech Transcription Product][GatherVerb] can help with your real-time requirements.

To learn more about Natural Language Processing and determining caller intent or [sentiment](/docs/glossary/what-is-sentiment-analysis) in real-time, [contact sales](https://www.twilio.com/en-us/help/sales).

## More resources

* [Twilio Speech Recognition][GatherVerb]
* [Programmable Voice Record Verb](/docs/voice/twiml/record)
* [Programmable Voice Gather Verb][GatherVerb]
* [Twilio's Accuracy in Call Transcriptions](https://www.twilio.com/blog/more-accurate-call-transcriptions-available-now-html)
* [Programmable Video Recording](/docs/video/api/recordings-resource)

[GatherVerb]: /docs/voice/twiml/gather
