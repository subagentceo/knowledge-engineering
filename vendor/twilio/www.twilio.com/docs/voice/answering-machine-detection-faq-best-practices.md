# Answering Machine Detection FAQ & Best Practices

## What are common use cases for Answering Machine Detection?

Answering Machine Detection (AMD) is a feature focused on detecting whether or not a call was picked up by a human or by an answering machine. There are two main outcomes of this analysis, the determination that a machine answered (answering machine, fax, [SIT tones](https://en.wikipedia.org/wiki/Special_information_tone)) or the determination that a human answered. There are three common use cases:

* Developers can detect that an answering machine/voicemail picked up the call and they can then use `<Say>` and [Text-To-Speech capabilities](voice/twiml/say/text-speech) to leave complete, intact messages into the voicemail box; seen commonly with notifications and appointment reminders.
* It's very expensive to have agents sit on the phone and listen to phones ring and wait to talk to a person, and that time is wasted if the call is answered by a machine. What's more common is for outbound dialers to use AMD to detect when a human answers and only then invoke the agent, either by connecting the callee to the agent directly or by adding the callee to a conference where the agent is already waiting. However, this workflow typically referred to as "predictive dialers" should be handled carefully to avoid abandonment of calls answered by a human.
* Last, do both of the above, and use the results to leave a message in the voicemail box if a machine answers, or connect to an agent if a person answers, dynamically optimizing the call flow.

## What call types can use AMD?

AMD can be enabled on calls generated via [`POST` to the Calls API](/docs/voice/api/call-resource#create-a-call-resource), [`POST` to the Participants API](/docs/voice/api/conference-participant-resource#create-a-participant), [`<Dial><Number>`](/docs/voice/twiml/number), or [`<Dial><Sip>`](/docs/voice/twiml/sip).

However, Elastic SIP trunking calls cannot utilize AMD because they bypass the Programmable Voice infrastructure. `<Dial><Client>`, `<Dial><Conference>`, and `<Dial><Queue>` calls cannot utilize AMD either because the destination is a Twilio internal service.

## How does answering machine detection work?

There are two aspects of AMD that are important to understand. The first is tone detection; i.e., the ability to detect machine beeps, fax tones, busy tones, in-band DTMF, etc.
The second is voice activity detection, or human speech detection; i.e., the ability to isolate human speech from background noise, such as barking dogs or heavy wind, etc. AMD analyzes the timing, pattern, and frequency information of these two aspects to make its determination.

Twilio's AMD analyzes the inbound media leg returned from the called party and can notify your application with the results determination.

## What is the difference between the two types of AMD Twilio offers?

`MachineDetection=Enable` will return `AnsweredBy` as soon as a determination is made. This mode is typically used in "predictive dialers" and reducing agent idle time use cases.

`MachineDetection=DetectMessageEnd` will return `AnsweredBy` as soon as a determination of `human`, `fax` or `unknown` is made; but in case of a machine, will wait until the greeting ends with a `beep`, `silence` or `other` to return `AnsweredBy`. This mode is typically used for outbound calls and "leave a message in the voicemail box" use case.

## What is asynchronous AMD?

Answering Machine Detection (AMD) introduces several seconds in silence for the callee since the call is not connected until AMD detection has executed. This behavior leads to undesirable user experience and often leads to hung up calls.

Machine detection can be executed asynchronously with `AsyncAmd=true`. When asynchronous mode is enabled, the callee is connected immediately, the call progresses and TwiML instructions continue to execute normally while AMD occurs in the background, avoiding having the callee on hold until AMD makes a determination, which would likely result in poor experience.

Asynchronous AMD is only supported for outbound calls using [Calls API](/docs/voice/api/call-resource#create-a-call-resource); while AMD on the [Participants API](/docs/voice/api/conference-participant-resource#create-a-participant)and `<Dial><Number>` or `<Dial><Sip>` are asynchronous by default and cannot be configured to behave otherwise.

## How accurate is Twilio's AMD?

AMD accuracy depends on multiple factors, including the specified `MachineDetection` type and configuration used.

`MachineDetection=DetectMessageEnd` accuracy is close to 100% accurate in US destinations with default settings. For international dialing, accuracy may be slightly reduced because the tones emitted by voicemail boxes and answering machines may be distinct in other countries different from the US.

`MachineDetection=Enable` accuracy is more relative, as more factors come into play. Although default settings should provide accurate responses in most cases, the [Optional AMD parameters](/docs/voice/answering-machine-detection#optional-api-tuning-parameters) may be used to tune AMD detection performance. It's important to note that one single custom configuration may not be optimal for all cases, that's why you should consider adjusting it accordingly depending on the possible answering scenarios (e.g., machine/voicemail or human).

## How fast is Twilio's AMD?

On average Twilio's AMD will return results within \~4 seconds after the call was answered with default optional configuration values. Once the determination has been made, Twilio will make a request to the provided webhook with the `AnsweredBy` results. This network transit to the server and the reciprocal response from the application are the most common culprits when investigating "slow" AMD times; best practices are to specify the edge for webhook egress to eliminate as much latency as possible. If you are able to run the application in the same AWS that your webhook egresses you can eliminate significant latency.

It's important to note that there are trade-offs between speed and accuracy. If you set the timeout to an extremely short duration you may not be giving the system enough time to gather sufficient data to make a determination, which will negatively impact accuracy.

## How do I reduce "answered\_by: unknown" results?

`unknown` response is returned when AMD is not able to determine who answered the call. This may be because the AMD algorithm doesn't capture enough information to make a decision or misconfiguration of the [Optional AMD parameters](/docs/voice/answering-machine-detection#optional-api-tuning-parameters). For example, a common scenario is people/machines answering with silence that lasts longer than the provided thresholds for silence or speech end. It's also possible that `MachineDetectionTimeout` is too short and results in the detection never happening because the AMD engine stopped listening. In general, the more effort you put into trying to get responses faster, the more `answered_by: unknown` you will receive.

## What's the difference between machine\_end\_beep, machine\_end\_silence, and machine\_end\_other?

Any `machine_end_*` result indicates that AMD made the determination that a machine answered the call.

The differences between them is how the voicemail greeting ends before the recording starts:

* `machine_end_beep`: Ends with a "beep" after the greeting.
* `machine_end_silence`: Ends with silence after the greeting.
* `machine_end_other`: Ends with any audio or signal after the greeting other than a "beep" or silence, such as call progress or error message tones. As the fallback result, it also happens when machine start is detected but `MachineDetectionTimeout` is reached before the voicemail greeting finishes.

The definition of a machine "beep" varies greatly between different calling destinations, and in some cases it overlaps or is indistinguishable from standard call progress tones. Due to this, there may be instances where the frequency content and information of the "beep" tone is not categorized as a "beep" and `machine_end_other` is returned.

Unless you need to clearly distinguish between these three results so your application and call workflow can have different behaviors, you can consider all of them synonyms for "a machine answered the call".

## AMD incorrectly determined who answered the call

AMD results can return false positives or false negatives, such as:

* a human answered but result was "machine"
* a machine answered but result was "human"
* the "message end" was detected when it was not

AMD accuracy depends on multiple factors, including the specified MachineDetection type and configuration used. In addition, it's important to note that one single custom configuration may not be optimal for all cases, that's why you should consider adjusting it accordingly depending on the possible answering scenarios (e.g., machine/voicemail or human). In order to identify areas of improvement, you can track and analyze AMD results using Voice Insights Call Summary records and the [Annotation API](/docs/voice/voice-insights/api/call/call-annotation-resource) to identify commonalities between inaccurate detection results and make adjustments to the AMD configuration; e.g. you may discover that a majority of your false positives are associated with a single destination carrier in a specific region, or that a handful of agents in a contact center are disproportionately represented in the inaccurate results indicating a process adherence or data integrity problem. It's recommended that you A/B test different configurations based on those commonalities, and even define specific ones depending on the context because a single configuration may not be optimal for all cases i.e. if you know that calls going to Comcast landlines in the US need a slightly longer timeout than other landline carriers, you can adjust the parameters when you know the destination is a Comcast landline, etc.

Additionally, you can also manually review some sample calls by [recording the call from ringing](/docs/voice/api/recording). You can then listen to them to confirm whether the AMD response was correct or not. You can open the recording file in an audio editor like Audacity or GarageBand to explore the precise timing of things like the gap between answer and initial audio, how long the initial utterance lasts, and how long there is silence before the AMD determination is made. Use those values to adjust performance.

## What are the particularities of a human/residence/mobile answering to determine optional configuration threshold values?

Humans answering phones as individuals, either at residences or on their mobile, may vary a lot since it's very personal and unique; e.g., "Hello?" or "Hi, this is Michael". However, these greetings are typically pretty short and less than 1800 ms.

## What are the particularities of a business answering the phone to determine optional configuration threshold values?

Businesses answer phones like "Thanks for calling Duct Tape Warehouse. This is Howard." These greetings are typically longer than residence and personal mobile, \~1800-3000 ms.

## What are the particularities of a machine answering the phone to determine optional configuration threshold values?

Answering machines answer with longer messages commonly punctuated with beeps which contain audio frequencies outside of normal speech range; "Hi you've reached the Fletchers. We're not here right now please leave a message after the beep. \[BEEP]". These greetings are typically longer, >3000 ms.

## What are some common mistakes when trying to tune AMD?

1. Hyper-tuning performance for a single device or a handful of devices can result in unexpected behavior once applications are deployed widely. We see cases where someone spends a bunch of time making sure the AMD application is detecting their personal cell phone quickly and with high accuracy without understanding that not everyone else in the world has the same carrier, same voicemail message length, etc. Testing should be done with a large number of carriers, on a diverse set of devices, with varied message responses.
2. `MachineDetectionTimeout` is only relevant for `MachineDetection=DetectMessageEnd` and shortening this value does not speed up detection for `MachineDetection=Enable`. In both cases, too low values of `MachineDetectionTimeout` may result in increasing the unknown results.
3. Failing to provide a sufficient timeout for `MachineDetection=DetectMessageEnd`. The default value is 30 seconds, but almost all of the changes to this configuration option we see are to decrease this value, not increase it. If you are only trying to land messages in residential voicemail boxes, 30 seconds is probably sufficient for the majority of cases. If you are trying to land messages in business voicemail boxes, 30 seconds is frequently not enough time. Also, some residences have bizarrely long messages, so expect some outliers.
4. Hang-up answered calls without a greeting as soon as possible by setting a low `MachineDetectionTimeout` value (e.g. 3 seconds). This may increase `unknown` results because of not providing enough time to determine, even if the call has actually a greeting but not right after answering the call. Instead, you can use `MachineDetectionSilenceTimeout` which refers to the initial silence. For example, setting `MachineDetectionSilenceTimeout` to 3000 ms will return `unknown` after 3 seconds of initial silence if no speech or (machine) signal is detected.

## I want to leave messages in voicemail boxes, how do I do that?

Use `MachineDetection=DetectMessageEnd` and make sure you provide ample time for the beep to occur (some people have very long answering machine messages). Then, you can use `<Say>` to leave a message with [Text-To-Speech capabilities](voice/twiml/say/text-speech).

## I want to minimize idle time for my agents and only engage them when a real person is on the line, how do I do that?

Use `MachineDetection=Enable` and connect the callee to the agent (or add the callee to a conference where the agent is already waiting) when a human answers.

If you are calling individuals, residences, or mobile phones, customers have had good results with setting `MachineDetectionSpeechThreshold` to 1800-2000 ms and `MachineDetectionSpeechEndThreshold` to 1400-1500 ms.

If you are calling businesses, you will want to set `MachineDetectionSpeechThreshold` somewhere between 1800 and 3000 with `MachineDetectionSpeechEndThreshold` set to 1400-1500 ms.

Note that his workflow is typically referred to as "predictive dialers" and should be handled carefully to avoid abandonment of calls answered by a human. On the other hand, since not all humans or voicemail greetings follow similar patterns when answering calls, it is recommended that you test different scenarios to set value for `MachineDetectionSpeechEndThreshold` (or even use different configurations) and avoid callee waiting hearing silence without being connected to agent longer than needed, which would impact the experience or end up hanging out.

## I want to leave a message if no one answers, but if someone does answer, I want to connect them to an agent. How do I do that?

Use `MachineDetection=Enable` and, depending on the `AnsweredBy` response, leave a message in the voicemail box if a machine answers, or connect to an agent if a person answers.
Depending on likeliness of the most common scenario for your use case, have a default behavior e.g. leave a message in the voicemail with `<Say>` and [Text-To-Speech capabilities](voice/twiml/say/text-speech); and modify the call via API to point to a new TwiML instruction for the other behavior e.g. connect the called party to a waiting agent.
