# Conferences Participants subresource

Participants is a subresource of [Conferences](/docs/voice/api/conference-resource) and represents a participant who is either connecting to, or actively connected to, a [Conference](/docs/voice/api/conference-resource) that is not in [completed](/docs/voice/api/conference-resource#conference-properties) status. This means that the Participants endpoint will not return results for participants whose call has ended, whose associated conference has ended, or whose call has been modified to use new TwiML; i.e. this resource does not return historical participant logs. For post-call participant details, use the [Participants resource](/docs/voice/voice-insights/api/conference/participant-summary-resource) of the Voice Insights API.

The Participants subresource allows you to:

* Manipulate a conference's current participants by muting or removing them from the conference.
* List of all the participants in an active conference.
* Get information about a particular participant in an active conference.
* Add participants to a conference.

> \[!NOTE]
>
> Tracking updates to all conference participants over the course of a conference can be done by using the [Conference's statusCallback webhook](/docs/voice/twiml/conference).

## Participant Properties

<OperationTable type="properties" data={{"title":"ListParticipantResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"participants":{"type":"array","items":{"type":"object","refName":"api.v2010.account.conference.participant","modelName":"api_v2010_account_conference_participant","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource."},"call_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with."},"label":{"type":"string","nullable":true,"description":"The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant."},"call_sid_to_coach":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`."},"coaching":{"type":"boolean","nullable":true,"description":"Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined."},"conference_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the conference the participant is in."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"end_conference_on_exit":{"type":"boolean","nullable":true,"description":"Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves."},"muted":{"type":"boolean","nullable":true,"description":"Whether the participant is muted. Can be `true` or `false`."},"hold":{"type":"boolean","nullable":true,"description":"Whether the participant is on hold. Can be `true` or `false`."},"start_conference_on_enter":{"type":"boolean","nullable":true,"description":"Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference."},"status":{"type":"string","enum":["queued","connecting","ringing","connected","complete","failed"],"description":"The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`.","refName":"participant_enum_status","modelName":"participant_enum_status"},"queue_time":{"type":"string","nullable":true,"description":"The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}}}}} />

## Create a Participant

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json`

Creates a Participant subresource with either a `ConferenceSid` or `FriendlyName` initiates an outbound call and adds a new participant to the active [Conference](/docs/voice/api/conference-resource) with that `ConferenceSid` or `FriendlyName`.

If an active conference does not exist with your `FriendlyName`, we create a new conference with that name and add the participant.

If a conference specified by `ConferenceSid` is not active, the request fails.

> \[!NOTE]
>
> By default, each account is granted one CPS for calls created via `POST` requests to the `/Participants` endpoint. Inbound calls and `<Dial>` calls are not limited by CPS.
> Accounts with an approved [Business Profile](https://console.twilio.com/us1/account/trust-hub/customer-profiles) can update their CPS up to 30 in the Twilio Console.
> In aggregate, calls are executed at the rate defined by the CPS. Individual calls may not execute at the anticipated rate — you may see individual seconds with more or fewer CPS, especially for inconsistent traffic — but over a month, the call execution rate will average the CPS rate set for that account.

> \[!CAUTION]
>
> Do not use [personally identifiable information (PII)](/docs/glossary/what-is-personally-identifiable-information-pii) such as phone numbers, email addresses, a person's name, or any other sensitive information when assigning a `FriendlyName` to your conferences.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"ConferenceSid","in":"path","description":"The SID of the participant's conference.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateParticipantRequest","required":["From","To"],"properties":{"From":{"type":"string","format":"endpoint","description":"The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint."},"To":{"type":"string","format":"endpoint","description":"The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`."},"StatusCallbackEvent":{"type":"array","description":"The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`.","items":{"type":"string"}},"Label":{"type":"string","description":"A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant."},"Timeout":{"type":"integer","description":"The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds."},"Record":{"type":"boolean","description":"Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`."},"Muted":{"type":"boolean","description":"Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`."},"Beep":{"type":"string","description":"Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`."},"StartConferenceOnEnter":{"type":"boolean","description":"Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference."},"EndConferenceOnExit":{"type":"boolean","description":"Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`."},"WaitUrl":{"type":"string","format":"uri","description":"The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl)."},"WaitMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file."},"EarlyMedia":{"type":"boolean","description":"Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`."},"MaxParticipants":{"type":"integer","description":"The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`."},"ConferenceRecord":{"type":"string","description":"Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`."},"ConferenceTrim":{"type":"string","description":"Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`."},"ConferenceStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored."},"ConferenceStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"ConferenceStatusCallbackEvent":{"type":"array","description":"The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`.","items":{"type":"string"}},"RecordingChannels":{"type":"string","description":"The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`."},"RecordingStatusCallback":{"type":"string","format":"uri","description":"The URL that we should call using the `recording_status_callback_method` when the recording status changes."},"RecordingStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"SipAuthUsername":{"type":"string","description":"The SIP username used for authentication."},"SipAuthPassword":{"type":"string","description":"The SIP password for authentication."},"Region":{"type":"string","description":"The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`."},"ConferenceRecordingStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available."},"ConferenceRecordingStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"RecordingStatusCallbackEvent":{"type":"array","description":"The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`.","items":{"type":"string"}},"ConferenceRecordingStatusCallbackEvent":{"type":"array","description":"The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`","items":{"type":"string"}},"Coaching":{"type":"boolean","description":"Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined."},"CallSidToCoach":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","description":"The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`."},"JitterBufferSize":{"type":"string","description":"Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`."},"Byoc":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BY[0-9a-fA-F]{32}$","description":"The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta)"},"CallerId":{"type":"string","description":"The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint."},"CallReason":{"type":"string","description":"The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)"},"RecordingTrack":{"type":"string","description":"The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio."},"RecordingConfigurationId":{"type":"string","description":"The identifier of the configuration to be used when creating and processing the recording"},"TimeLimit":{"type":"integer","description":"The maximum duration of the call in seconds. Constraints depend on account and configuration."},"MachineDetection":{"type":"string","description":"Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection)."},"MachineDetectionTimeout":{"type":"integer","description":"The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds."},"MachineDetectionSpeechThreshold":{"type":"integer","description":"The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400."},"MachineDetectionSpeechEndThreshold":{"type":"integer","description":"The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200."},"MachineDetectionSilenceTimeout":{"type":"integer","description":"The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000."},"AmdStatusCallback":{"type":"string","format":"uri","description":"The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax."},"AmdStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`."},"Trim":{"type":"string","description":"Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`."},"CallToken":{"type":"string","description":"A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call."},"ClientNotificationUrl":{"type":"string","format":"uri","description":"The URL that we should use to deliver `push call notification`."},"CallerDisplayName":{"type":"string","description":"The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address."}}},"examples":{"createWithSid":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"Trim\": \"do-not-trim\",\n  \"TimeLimit\": 3600,\n  \"CallToken\": \"call-token-string\",\n  \"MachineDetection\": \"enable\",\n  \"MachineDetectionTimeout\": 15,\n  \"MachineDetectionSpeechThreshold\": 3000,\n  \"MachineDetectionSpeechEndThreshold\": 3000,\n  \"MachineDetectionSilenceTimeout\": 3000,\n  \"AmdStatusCallback\": \"http://statuscallback.com\",\n  \"AmdStatusCallbackMethod\": \"POST\",\n  \"MachineDetectionEngine\": \"Lumenvox\",\n  \"MachineDetectionMinWordLength\": 100,\n  \"MachineDetectionMaxWordLength\": 5000,\n  \"MachineDetectionWordsSilence\": 50,\n  \"MachineDetectionMaxNumOfWords\": 5,\n  \"MachineDetectionSilenceThreshold\": 256,\n  \"ClientNotificationUrl\": \"https://clientnotification.com\",\n  \"CallerDisplayName\": \"John Doe\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"Trim\": \"do-not-trim\",\n  \"TimeLimit\": 3600,\n  \"CallToken\": \"call-token-string\",\n  \"MachineDetection\": \"enable\",\n  \"MachineDetectionTimeout\": 15,\n  \"MachineDetectionSpeechThreshold\": 3000,\n  \"MachineDetectionSpeechEndThreshold\": 3000,\n  \"MachineDetectionSilenceTimeout\": 3000,\n  \"AmdStatusCallback\": \"http://statuscallback.com\",\n  \"AmdStatusCallbackMethod\": \"POST\",\n  \"MachineDetectionEngine\": \"Lumenvox\",\n  \"MachineDetectionMinWordLength\": 100,\n  \"MachineDetectionMaxWordLength\": 5000,\n  \"MachineDetectionWordsSilence\": 50,\n  \"MachineDetectionMaxNumOfWords\": 5,\n  \"MachineDetectionSilenceThreshold\": 256,\n  \"ClientNotificationUrl\": \"https://clientnotification.com\",\n  \"CallerDisplayName\": \"John Doe\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Label\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"onEnter\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["\"do-not-trim\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallToken\"","#7EE787"],[":","#C9D1D9"]," ",["\"call-token-string\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetection\"","#7EE787"],[":","#C9D1D9"]," ",["\"enable\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["15","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSpeechThreshold\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSpeechEndThreshold\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSilenceTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"AmdStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://statuscallback.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AmdStatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionEngine\"","#7EE787"],[":","#C9D1D9"]," ",["\"Lumenvox\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionMinWordLength\"","#7EE787"],[":","#C9D1D9"]," ",["100","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionMaxWordLength\"","#7EE787"],[":","#C9D1D9"]," ",["5000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionWordsSilence\"","#7EE787"],[":","#C9D1D9"]," ",["50","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionMaxNumOfWords\"","#7EE787"],[":","#C9D1D9"]," ",["5","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSilenceThreshold\"","#7EE787"],[":","#C9D1D9"]," ",["256","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"ClientNotificationUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://clientnotification.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallerDisplayName\"","#7EE787"],[":","#C9D1D9"]," ",["\"John Doe\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyName":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"Trim\": \"do-not-trim\",\n  \"TimeLimit\": 3600,\n  \"CallToken\": \"call-token-string\",\n  \"MachineDetection\": \"enable\",\n  \"MachineDetectionTimeout\": 15,\n  \"MachineDetectionSpeechThreshold\": 3000,\n  \"MachineDetectionSpeechEndThreshold\": 3000,\n  \"MachineDetectionSilenceTimeout\": 3000,\n  \"AmdStatusCallback\": \"http://statuscallback.com\",\n  \"AmdStatusCallbackMethod\": \"POST\",\n  \"ClientNotificationUrl\": \"https://clientnotification.com\",\n  \"CallerDisplayName\": \"John Doe\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"Trim\": \"do-not-trim\",\n  \"TimeLimit\": 3600,\n  \"CallToken\": \"call-token-string\",\n  \"MachineDetection\": \"enable\",\n  \"MachineDetectionTimeout\": 15,\n  \"MachineDetectionSpeechThreshold\": 3000,\n  \"MachineDetectionSpeechEndThreshold\": 3000,\n  \"MachineDetectionSilenceTimeout\": 3000,\n  \"AmdStatusCallback\": \"http://statuscallback.com\",\n  \"AmdStatusCallbackMethod\": \"POST\",\n  \"ClientNotificationUrl\": \"https://clientnotification.com\",\n  \"CallerDisplayName\": \"John Doe\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Label\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["\"do-not-trim\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallToken\"","#7EE787"],[":","#C9D1D9"]," ",["\"call-token-string\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetection\"","#7EE787"],[":","#C9D1D9"]," ",["\"enable\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["15","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSpeechThreshold\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSpeechEndThreshold\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MachineDetectionSilenceTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["3000","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"AmdStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://statuscallback.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AmdStatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ClientNotificationUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://clientnotification.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallerDisplayName\"","#7EE787"],[":","#C9D1D9"]," ",["\"John Doe\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithSidAsCoach":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"onEnter\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallSidToCoach\"","#7EE787"],[":","#C9D1D9"]," ",["\"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithNonE164Number":{"value":{"lang":"json","value":"{\n  \"From\": \"4405512345678\",\n  \"To\": \"4157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"4405512345678\",\n  \"To\": \"4157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"onEnter\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"4405512345678\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"4157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"onEnter\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyNameJitterBufferSize":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"JitterBufferSize\": \"small\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"JitterBufferSize\": \"small\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"JitterBufferSize\"","#7EE787"],[":","#C9D1D9"]," ",["\"small\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyNameByoc":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"Byoc\": \"BYbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"Byoc\": \"BYbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Byoc\"","#7EE787"],[":","#C9D1D9"]," ",["\"BYbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyNameCallerId":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"CallerId\": \"+17736772737\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"CallerId\": \"+17736772737\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallerId\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736772737\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyNameReason":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"CallReason\": \"Reason for the call (Beta)\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"CallReason\": \"Reason for the call (Beta)\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallReason\"","#7EE787"],[":","#C9D1D9"]," ",["\"Reason for the call (Beta)\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFriendlyNameRecordingTrack":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"RecordingTrack\": \"inbound\"\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"+14157663747\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600,\n  \"RecordingTrack\": \"inbound\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14157663747\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"RecordingTrack\"","#7EE787"],[":","#C9D1D9"]," ",["\"inbound\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFromToClient":{"value":{"lang":"json","value":"{\n  \"From\": \"client:alice\",\n  \"To\": \"client:bob\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"client:alice\",\n  \"To\": \"client:bob\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"client:alice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"client:bob\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Label\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFromToSip":{"value":{"lang":"json","value":"{\n  \"From\": \"alice\",\n  \"To\": \"sip:bob@twilio.com\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"alice\",\n  \"To\": \"sip:bob@twilio.com\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"alice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"sip:bob@twilio.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Label\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithFromToTwimlapp":{"value":{"lang":"json","value":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"app:APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","meta":"","code":"{\n  \"From\": \"+17736774757\",\n  \"To\": \"app:APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Label\": \"customer\",\n  \"EarlyMedia\": true,\n  \"Beep\": \"false\",\n  \"Muted\": false,\n  \"StatusCallback\": \"https://myapp.com/events\",\n  \"StatusCallbackMethod\": \"POST\",\n  \"StatusCallbackEvent\": \"ringing\",\n  \"Record\": true,\n  \"TimeLimit\": 3600\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+17736774757\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"app:APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Label\"","#7EE787"],[":","#C9D1D9"]," ",["\"customer\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EarlyMedia\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Beep\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://myapp.com/events\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackEvent\"","#7EE787"],[":","#C9D1D9"]," ",["\"ringing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Record\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TimeLimit\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Participant for an active Conference

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createParticipant() {
  const participant = await client
    .conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create({
      beep: "onEnter",
      earlyMedia: true,
      from: "+15017122661",
      label: "customer",
      record: true,
      statusCallback: "https://myapp.com/events",
      statusCallbackEvent: ["ringing"],
      to: "+15558675310",
    });

  console.log(participant.accountSid);
}

createParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = client.conferences(
    "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).participants.create(
    from_="+15017122661",
    to="+15558675310",
    label="customer",
    early_media=True,
    beep="onEnter",
    status_callback="https://myapp.com/events",
    status_callback_event=["ringing"],
    record=True,
)

print(participant.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            label: "customer",
            earlyMedia: true,
            beep: "onEnter",
            statusCallback: new Uri("https://myapp.com/events"),
            statusCallbackEvent: new List<string> { "ringing" },
            record: true,
            pathConferenceSid: "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(participant.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant
                                      .creator("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                          new com.twilio.type.PhoneNumber("+15017122661"),
                                          new com.twilio.type.PhoneNumber("+15558675310"))
                                      .setLabel("customer")
                                      .setEarlyMedia(true)
                                      .setBeep("onEnter")
                                      .setStatusCallback(URI.create("https://myapp.com/events"))
                                      .setStatusCallbackEvent(Arrays.asList("ringing"))
                                      .setRecord(true)
                                      .create();

        System.out.println(participant.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateParticipantParams{}
	params.SetFrom("+15017122661")
	params.SetTo("+15558675310")
	params.SetLabel("customer")
	params.SetEarlyMedia(true)
	params.SetBeep("onEnter")
	params.SetStatusCallback("https://myapp.com/events")
	params.SetStatusCallbackEvent([]string{
		"ringing",
	})
	params.SetRecord(true)

	resp, err := client.Api.CreateParticipant("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants->create(
        "+15017122661", // From
        "+15558675310", // To
        [
            "label" => "customer",
            "earlyMedia" => true,
            "beep" => "onEnter",
            "statusCallback" => "https://myapp.com/events",
            "statusCallbackEvent" => ["ringing"],
            "record" => true,
        ]
    );

print $participant->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .participants
              .create(
                from: '+15017122661',
                to: '+15558675310',
                label: 'customer',
                early_media: true,
                beep: 'onEnter',
                status_callback: 'https://myapp.com/events',
                status_callback_event: [
                  'ringing'
                ],
                record: true
              )

puts participant.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:create \
   --conference-sid CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --from +15017122661 \
   --to +15558675310 \
   --label customer \
   --early-media \
   --beep onEnter \
   --status-callback https://myapp.com/events \
   --status-callback-event ringing \
   --record
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants.json" \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15558675310" \
--data-urlencode "Label=customer" \
--data-urlencode "EarlyMedia=true" \
--data-urlencode "Beep=onEnter" \
--data-urlencode "StatusCallback=https://myapp.com/events" \
--data-urlencode "StatusCallbackEvent=ringing" \
--data-urlencode "Record=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "label": "customer",
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "queued",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": "1000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Custom Parameters

> \[!WARNING]
>
> Only applies to Twilio Voice Client IDs, SIP endpoints, or TwiML applications.

Custom parameters can be passed to the specified Client ID, SIP endpoint, or TwiML application in the `to` field using query string notation. For example: `client:alice?mycustomparam1=foo&mycustomparam2=bar`.

## Retrieve a Participant

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json`

Returns a Participant from an active Conference, specified by the Conference SID and the Participant's [Call SID](https://help.twilio.com/hc/en-us/articles/223180488-What-is-a-Call-SID-) or label.

> \[!WARNING]
>
> The Participant subresource only manages *active participants of in-progress Conferences*.
>
> If you want to get a list of all Participants over the course of a Conference, use the Conference's `statusCallback` [to receive webhooks for each participant joining the conference](/docs/voice/twiml/conference) and store the details in your application.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"ConferenceSid","in":"path","description":"The SID of the conference with the participant to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to fetch. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.","schema":{"type":"string"},"required":true}]
```

Retrieve a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .fetch();

  console.log(participant.accountSid);
}

fetchParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .fetch()
)

print(participant.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.FetchAsync(
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathCallSid: "CallSid");

        Console.WriteLine(participant.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.fetcher("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "CallSid").fetch();

        System.out.println(participant.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.FetchParticipantParams{}

	resp, err := client.Api.FetchParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"CallSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("CallSid")
    ->fetch();

print $participant->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('CallSid')
              .fetch

puts participant.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:fetch \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid CallSid
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CallSid.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": true,
  "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Retrieve a Participant by label

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .fetch();

  console.log(participant.label);
}

fetchParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .fetch()
)

print(participant.label)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.FetchAsync(
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathCallSid: "customer");

        Console.WriteLine(participant.Label);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.fetcher("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "customer").fetch();

        System.out.println(participant.getLabel());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.FetchParticipantParams{}

	resp, err := client.Api.FetchParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"customer",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Label != nil {
			fmt.Println(*resp.Label)
		} else {
			fmt.Println(resp.Label)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("customer")
    ->fetch();

print $participant->label;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('customer')
              .fetch

puts participant.label
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:fetch \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid customer
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/customer.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "customer",
  "label": "customer",
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": true,
  "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Retrieve a list of Participants

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json`

Returns the list of active Participants in the Conference identified by `ConferenceSid`.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"ConferenceSid","in":"path","description":"The SID of the conference with the participants to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Muted","in":"query","description":"Whether to return only participants that are muted. Can be: `true` or `false`.","schema":{"type":"boolean"},"examples":{"readFull":{"value":"true"},"readNext":{"value":"true"},"readPrevious":{"value":"true"}}},{"name":"Hold","in":"query","description":"Whether to return only participants that are on hold. Can be: `true` or `false`.","schema":{"type":"boolean"},"examples":{"readEmpty":{"value":"true"}}},{"name":"Coaching","in":"query","description":"Whether to return only participants who are coaching another call. Can be: `true` or `false`.","schema":{"type":"boolean"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listParticipant() {
  const participants = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants.list({
      muted: true,
      limit: 20,
    });

  participants.forEach((p) => console.log(p.end));
}

listParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participants = client.conferences(
    "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).participants.list(muted=True, limit=20)

for record in participants:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participants = await ParticipantResource.ReadAsync(
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", muted: true, limit: 20);

        foreach (var record in participants) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Participant> participants =
            Participant.reader("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setMuted(true).limit(20).read();

        for (Participant record : participants) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListParticipantParams{}
	params.SetMuted(true)
	params.SetLimit(20)

	resp, err := client.Api.ListParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participants = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants->read(["muted" => true], 20);

foreach ($participants as $record) {
    print $record->end;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participants = @client
               .api
               .v2010
               .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .participants
               .list(
                 muted: true,
                 limit: 20
               )

participants.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:list \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --muted
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "participants": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Sat, 19 Feb 2011 21:07:19 +0000",
      "date_updated": "Sat, 19 Feb 2011 21:07:19 +0000",
      "end_conference_on_exit": false,
      "muted": true,
      "hold": false,
      "status": "connected",
      "start_conference_on_enter": true,
      "coaching": true,
      "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "queue_time": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Sat, 19 Feb 2011 21:07:19 +0000",
      "date_updated": "Sat, 19 Feb 2011 21:07:19 +0000",
      "end_conference_on_exit": false,
      "muted": true,
      "hold": false,
      "status": "connected",
      "start_conference_on_enter": true,
      "coaching": false,
      "call_sid_to_coach": null,
      "queue_time": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=1&PageToken=PACPbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "start": 0,
  "end": 1
}
```

## Update a Participant

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json`

Updates the status of a Participant in an active Conference.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"ConferenceSid","in":"path","description":"The SID of the conference with the participant to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to update. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateParticipantRequest","properties":{"Muted":{"type":"boolean","description":"Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`."},"Hold":{"type":"boolean","description":"Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference."},"HoldUrl":{"type":"string","format":"uri","description":"The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs."},"HoldMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`."},"AnnounceUrl":{"type":"string","format":"uri","description":"The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs."},"AnnounceMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`."},"WaitUrl":{"type":"string","format":"uri","description":"The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl)."},"WaitMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file."},"BeepOnExit":{"type":"boolean","description":"Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`."},"EndConferenceOnExit":{"type":"boolean","description":"Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`."},"Coaching":{"type":"boolean","description":"Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined."},"CallSidToCoach":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","description":"The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`."}}},"examples":{"muteParticipant":{"value":{"lang":"json","value":"{\n  \"Muted\": \"true\"\n}","meta":"","code":"{\n  \"Muted\": \"true\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["\"true\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"muteParticipantByLabel":{"value":{"lang":"json","value":"{\n  \"Muted\": \"true\"\n}","meta":"","code":"{\n  \"Muted\": \"true\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Muted\"","#7EE787"],[":","#C9D1D9"]," ",["\"true\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"holdParticipantWithMusic":{"value":{"lang":"json","value":"{\n  \"Hold\": \"true\",\n  \"HoldUrl\": \"http://www.myapp.com/hold\"\n}","meta":"","code":"{\n  \"Hold\": \"true\",\n  \"HoldUrl\": \"http://www.myapp.com/hold\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Hold\"","#7EE787"],[":","#C9D1D9"]," ",["\"true\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"HoldUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.myapp.com/hold\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"announceToParticipant":{"value":{"lang":"json","value":"{\n  \"AnnounceUrl\": \"http://www.myapp.com/announce\"\n}","meta":"","code":"{\n  \"AnnounceUrl\": \"http://www.myapp.com/announce\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AnnounceUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.myapp.com/announce\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"modifyParticipant":{"value":{"lang":"json","value":"{\n  \"Coaching\": true,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","meta":"","code":"{\n  \"Coaching\": true,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Coaching\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallSidToCoach\"","#7EE787"],[":","#C9D1D9"]," ",["\"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"modifyParticipantByLabel":{"value":{"lang":"json","value":"{\n  \"Coaching\": true,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","meta":"","code":"{\n  \"Coaching\": true,\n  \"CallSidToCoach\": \"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Coaching\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CallSidToCoach\"","#7EE787"],[":","#C9D1D9"]," ",["\"CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Participant: Mute a participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({ muted: true });

  console.log(participant.accountSid);
}

updateParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update(muted=True)
)

print(participant.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.UpdateAsync(
            muted: true,
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathCallSid: "CallSid");

        Console.WriteLine(participant.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant =
            Participant.updater("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "CallSid").setMuted(true).update();

        System.out.println(participant.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateParticipantParams{}
	params.SetMuted(true)

	resp, err := client.Api.UpdateParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"CallSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("CallSid")
    ->update(["muted" => true]);

print $participant->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('CallSid')
              .update(muted: true)

puts participant.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:update \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid CallSid \
   --muted
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CallSid.json" \
--data-urlencode "Muted=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": true,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Participant: Mute a participant by label

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .update({ muted: true });

  console.log(participant.label);
}

updateParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .update(muted=True)
)

print(participant.label)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.UpdateAsync(
            muted: true,
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathCallSid: "customer");

        Console.WriteLine(participant.Label);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant =
            Participant.updater("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "customer").setMuted(true).update();

        System.out.println(participant.getLabel());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateParticipantParams{}
	params.SetMuted(true)

	resp, err := client.Api.UpdateParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"customer",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Label != nil {
			fmt.Println(*resp.Label)
		} else {
			fmt.Println(resp.Label)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("customer")
    ->update(["muted" => true]);

print $participant->label;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('customer')
              .update(muted: true)

puts participant.label
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:update \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid customer \
   --muted
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/customer.json" \
--data-urlencode "Muted=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "customer",
  "label": "customer",
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": true,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Place a participant on hold with music

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({
      hold: true,
      holdUrl: "http://www.myapp.com/hold_music",
    });

  console.log(participant.accountSid);
}

updateParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update(hold=True, hold_url="http://www.myapp.com/hold_music")
)

print(participant.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.UpdateAsync(
            hold: true,
            holdUrl: new Uri("http://www.myapp.com/hold_music"),
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathCallSid: "CallSid");

        Console.WriteLine(participant.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.updater("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "CallSid")
                                      .setHold(true)
                                      .setHoldUrl(URI.create("http://www.myapp.com/hold_music"))
                                      .update();

        System.out.println(participant.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateParticipantParams{}
	params.SetHold(true)
	params.SetHoldUrl("http://www.myapp.com/hold_music")

	resp, err := client.Api.UpdateParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"CallSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("CallSid")
    ->update([
        "hold" => true,
        "holdUrl" => "http://www.myapp.com/hold_music",
    ]);

print $participant->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('CallSid')
              .update(
                hold: true,
                hold_url: 'http://www.myapp.com/hold_music'
              )

puts participant.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:update \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid CallSid \
   --hold \
   --hold-url http://www.myapp.com/hold_music
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CallSid.json" \
--data-urlencode "Hold=true" \
--data-urlencode "HoldUrl=http://www.myapp.com/hold_music" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": true,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Participant: Make an announcement to the participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({ announceUrl: "http://www.myapp.com/announce" });

  console.log(participant.accountSid);
}

updateParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update(announce_url="http://www.myapp.com/announce")
)

print(participant.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var participant = await ParticipantResource.UpdateAsync(
            announceUrl: new Uri("http://www.myapp.com/announce"),
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathCallSid: "CallSid");

        Console.WriteLine(participant.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.updater("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "CallSid")
                                      .setAnnounceUrl(URI.create("http://www.myapp.com/announce"))
                                      .update();

        System.out.println(participant.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateParticipantParams{}
	params.SetAnnounceUrl("http://www.myapp.com/announce")

	resp, err := client.Api.UpdateParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"CallSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$participant = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("CallSid")
    ->update(["announceUrl" => "http://www.myapp.com/announce"]);

print $participant->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .api
              .v2010
              .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('CallSid')
              .update(announce_url: 'http://www.myapp.com/announce')

puts participant.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:update \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid CallSid \
   --announce-url http://www.myapp.com/announce
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CallSid.json" \
--data-urlencode "AnnounceUrl=http://www.myapp.com/announce" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Delete a Participant

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json`

Deletes the Participant subresource to remove the participant from the conference. Returns HTTP 204 (No Content) with no body if the participant was successfully removed from the conference.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"ConferenceSid","in":"path","description":"The SID of the conference with the participants to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to delete. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.","schema":{"type":"string"},"required":true}]
```

Delete a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteParticipant() {
  await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .remove();
}

deleteParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").participants(
    "CallSid"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ParticipantResource.DeleteAsync(
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathCallSid: "CallSid");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant.deleter("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "CallSid").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.DeleteParticipantParams{}

	err := client.Api.DeleteParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"CallSid",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("CallSid")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .api
  .v2010
  .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .participants('CallSid')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:remove \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid CallSid
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CallSid.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Delete a Participant by label

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteParticipant() {
  await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .remove();
}

deleteParticipant();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").participants(
    "customer"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ParticipantResource.DeleteAsync(
            pathConferenceSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathCallSid: "customer");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant.deleter("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "customer").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.DeleteParticipantParams{}

	err := client.Api.DeleteParticipant("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"customer",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("customer")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .api
  .v2010
  .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .participants('customer')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:participants:remove \
   --conference-sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --call-sid customer
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/customer.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Tips and best practices

* Long audio files for conference announcements delay playback. For example, a 25-minute file can take about 13–15 seconds to begin after you send the API request.
* Conference announcements that are 30 minutes or longer can trigger a request timeout and cause the announcement to fail. When this happens, the conference and all calls stay connected, but participants hear "An application error has occurred." The 30-minute limit is approximate. Factors such as file size, HTTP method, and your server's processing or response time can also cause timeouts.
* For announcements longer than 30 minutes, divide the audio into shorter segments and play them sequentially.

## What's next?

Explore [Voice Insights](/docs/voice/voice-insights) with its [Conference Insights Event Stream](/docs/voice/voice-insights/event-streams/conference-insights-event) and [Conference Insights REST API](/docs/voice/voice-insights/api/conference) which allow you to see conference parameters, investigate participant event timelines, and understand detected quality issues.
