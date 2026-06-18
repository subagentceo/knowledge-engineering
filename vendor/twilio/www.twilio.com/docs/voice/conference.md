# Voice Conference

Twilio's Voice Conference is a flexible way for developers to manage multi party calls from 2 participants to 250 participants. Voice Conferences can be used for standard multi party audio bridges, for inbound contact centers, or for outbound dialers. The flexible nature of Voice Conference allows developers to tailor the end user experience to match their specific use case.

A participant can dial into a Conference via PSTN, SIP or via Twilio Voice Client. The developer can manage the participant experience programmatically and participants can be waiting for the Conference to start, muted, placed on hold or removed from the Conference. In addition, there is coaching functionality so that a "coach" participant can talk to one participant without the other participant hearing the audio.

## Lifecycle of a Conference

There are two ways to create a Conference:

1. Using the [\<Conference>](/docs/voice/twiml/conference) TwiML noun to handle an incoming call.
2. By adding a participant to a named Conference using the [Create Participant API](/docs/voice/api/conference-participant-resource#create-a-participant).

The Conference is created when the first participant connects to the Conference. At that time the participant is in a waiting state and will hear hold music. If the Conference is configured with a moderator, then the Conference will not start until the moderator joins and all participants will hear hold music until then. If there is no moderator, the Conference starts when the second participant joins. Once the Conference starts, participants will be able to hear each other. If configured, the Conference will be recorded for later playback.

During the active Conference participants can be placed on hold or muted. Additional participants can join or leave. Announcements can be played to participants and if needed a participant can be removed programmatically.

There are three ways that a Conference can end:

1. The Conference status is set to "Completed" via the [Update Conference API](/docs/voice/api/conference-resource#update-a-conference-resource)
2. All participants have left the Conference
3. The moderator leaves the Conference or is disconnected

## Managing Conferences & Participants

There are two resources available to developers to manage Conferences and participants:

* [Conference resource](/docs/voice/api/conference-resource)
* [Participant resource](/docs/voice/api/conference-participant-resource)

These resources have attributes that can be fetched or modified via REST APIs. In addition, developers can setup a [Conference webhook](/docs/voice/twiml/conference#attributes-statusCallbackEvent) to receive status events related to Conferences and participants.

## Key Conference Features

* **Announcements** (Beep & Music) - a Conference can be configured to [beep](/docs/voice/twiml/conference#attributes-beep) when a new participant joins. In addition, a developer defined [announcement](/docs/voice/api/conference-participant-resource#update-a-participant-resource) can be played to a participant at any time after the Conference has started
* **Managing Participants** ([Hold](/docs/voice/api/conference-participant-resource#update-a-participant-resource), [Mute](/docs/voice/api/conference-participant-resource#update-a-participant-resource) & [Remove](/docs/voice/api/conference-participant-resource#update-a-participant-resource)) - when a participant is placed on hold, they will hear developer-defined hold music and will not hear any other participants. If a participant is muted then no other participants will hear them but the participant will be able to hear the others. Finally a participant can always be removed from a Conference.
* **Conference Recording** - it is possible to [record a Conference](/docs/voice/twiml/conference#record) and all the participants from when a Conference starts
* **Transfer** (Warm & Cold) - a Conference can be used to manage a call transfer when there are two participants. In a warm transfer a [new participant is added](/docs/voice/api/conference-participant-resource#code-create-a-conference-participant) to the Conference and then the three participants can talk before the participant who initiated the transfer drops off. In a cold transfer, again a new participant is added to the Conference, however the participant who initiates the transfer drops off before the new participant answers.
* **Participant Coaching** (Monitor & Whisper) - a participant can take the role of monitor or supervisor in a Conference. This participant can [join the Conference muted](/docs/voice/twiml/conference#attributes-muted) and just listen in to the Conference. Another variation is when the participant joins the Conference as a [coach](/docs/voice/twiml/conference#attributes-coach) and can "whisper" to one participant without the other participants hearing.

### Learn more

The following are tutorials that demonstrate various ways that Voice Conference can be used.

* [How to Create Conference calls](/docs/voice/tutorials/how-to-create-conference-calls)
* [Implementing Warm Transfer using Conference](/blog/warm-transfer-nodejs-express)
* [Using Conference to communicate with a large number of people](https://www.twilio.com/blog/conference-broadcast-c-aspnet-mvc)
