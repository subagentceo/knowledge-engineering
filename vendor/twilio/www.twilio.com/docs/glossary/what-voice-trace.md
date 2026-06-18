# What is Voice Trace?

Voice trace is a voice quality troubleshooting feature that captures the media stream for calls and stores them for Twilio Support to use in their investigations.

## More on Voice Trace

In order to effectively troubleshoot voice quality issues like missing/duplicated DTMF digits or in-stream audio issues like noise/echo Twilio Support may need to reconstruct the media stream. Voice trace allows our support team to perform this deep analysis by saving every RTP packet of a call. Capturing the RTP gives Twilio Support the ability to listen to the call audio itself and view DTMF key presses captured during the call.

Some limitations to be aware of:

* Voice trace captures are stored for 10 days.
* RTP on accounts using \<Pay> and PCI redaction will not be captured regardless of voice trace status.
* Captures made while voice trace is enabled contain confidential and proprietary system details and cannot be shared outside of Twilio.

Once enabled, voice trace will begin capturing RTP on all calls for an account until it is disabled. If you prefer voice trace automatically expire after a certain number of days, contact Twilio Support who can enable voice trace with a scheduled expiration.

Depending on your use case, your reasons for enabling voice trace, and the laws of the jurisdiction(s) you operate in, you may need to obtain consent from the parties to the call before requesting Twilio to enable voice trace. Please be sure you have all necessary consents from relevant parties before enabling voice trace. One such use case example is for customers whose accounts are HIPAA enabled. While enabling voice trace itself doesn't intrinsically constitute a HIPAA violation, the Twilio customer is required to obtain the consent of the parties whose audio they are capturing.

Voice trace can be enabled in the [Voice Settings](https://www.twilio.com/console/voice/settings) section of Console or using the [Voice Insights Settings API](/docs/voice/voice-insights/api/call/voice-insights-settings-resource).
