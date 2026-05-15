# Customize Your Conversation Intelligence (classic) Configuration

This page covers custom configurations you can use with Conversation Intelligence (classic). While the
[Onboarding Guide](/docs/conversation-intelligence-classic/onboarding) helps you set up the basic workflow
for Conversation Intelligence (classic) using Twilio Voice recordings, you can also set up Conversation
Intelligence (classic) with the following changes:

* **Alternative sources**, including third-party media recordings outside of Twilio and audio from Twilio Video recordings.
* **API features and optimizations**, which are best practices when you use the API and features available only through the [Transcript API resource](/docs/conversation-intelligence-classic/api/transcript-resource).

> \[!NOTE]
>
> Conversation Intelligence (classic) is a HIPAA Eligible Service when configured properly. For healthcare applications subject to HIPAA, ensure you have a signed Business Associate Agreement (BAA) with Twilio and follow HIPAA compliance guidelines.

## Use a source other than Twilio Voice Transcripts

### Use third-party media recordings

Conversation Intelligence (classic) supports third-party media recordings. If your call recordings aren't stored in Twilio and you want to use them with Conversation Intelligence (classic), the recordings must be publicly accessible for the duration of transcription. You can host the recordings or use on a time-limited pre-signed URL.

For example, to share a recording on an existing AWS S3 bucket, [follow this guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html). Then add the public recording URL to the `media_url` when you [create a transcript with the API](/docs/conversation-intelligence-classic/api/transcript-resource#create-a-new-transcript)

### Create an audio recording from Twilio Video

If you want to transcribe the audio of a Twilio Video recording, it needs additional processing to create an audio recording that can you can submit for transcription.

To create a dual-channel audio recording first, transcode a separate audio-only composition for each participant in the Video Room.

```bash title="Create a dual-channel audio recording"
curl -X POST "https://video.twilio.com/v1/Compositions" \ --data-urlencode "AudioSources=PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
\ --data-urlencode "StatusCallback=https://www.example.com/callbacks"
\ --data-urlencode "Format=mp4"
\ --data-urlencode "RoomSid=RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
\ -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Next, download the media from these compositions and merge them into a single audio stereo audio.

```sh title="Download the Video Room Media"
ffmpeg -i speaker1.mp4 -i speaker2.mp4 -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map "[a]" -f flac -bits_per_raw_smaple 16 -ar 441000 output.flac
```

In case the recording duration for each participant is different, you can avoid overlapping audio tracks. Use `ffmpeg` to create a single-stereo audio track with delay to cover the difference in track length. For example, if one audio track last 63 seconds and the other 67 seconds, use `ffmpeg` to create a stereo file with the first track, with four seconds of delay to match the length of the second track.

```sh title="Create a single stereo audio track"
ffmpeg -i speaker1.wav -i speaker2.wav -filter_complex "aevalsrc=0:d=${second_to_delay}[s1];[s1][1:a]concat=n=2:v=0:a=1[ac2];[0:a]apad[ac1];[ac1][ac2]amerge=2[a]" -map "[a]" -f flac -bits_per_raw_sample 16 -ar 441000 output.flac
```

Finally, send a `CreateTranscript` request to Conversation Intelligence (classic) by providing a publicly accessible URL for this audio file as `media_url` in `MediaSource`.

## API features and optimizations

### Include metadata for conversation participants

By default, Conversation Intelligence (classic) assumes `Participant` one is on channel one, and `Participant` two is on channel two. If your use case doesn't follow this channel mapping, you can [provide optional `Participant` metadata](/docs/conversation-intelligence-classic/api/transcript-resource#specify-participant-information) that maps the participant to the correct audio channel when you create a transcript with the API. You can also use this field to attach other participant metadata to the transcript.

### Provide a CustomerKey when you create a transcript with the API

You can provide a `CustomerKey` when you [create a transcript with the API](/docs/conversation-intelligence-classic/api/transcript-resource#create-a-new-transcript), which allows you to map a `Transcript` to an internal identifier. This can be a unique identifier within your system to track the transcripts. The `CustomerKey` is also included as part of the webhook callback when the results for `Transcript` and `Operators` become available. This is an optional field, and you can't substitute `CustomerKey` for `Transcript Sid` in the APIs.

### REST API best practices

* Conversation Intelligence (classic) enforces rate limits for API resources. You should follow the [REST API Best Practices](/docs/usage/rest-api-best-practices), and implement [retries with exponential backoff](/docs/usage/rest-api-best-practices#retry-with-exponential-backoff) to properly handle the API response [Error 429 "Too Many Requests"](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-) for high volume workloads.
* Use [Restricted API Keys](/docs/iam/api-keys/restricted-api-keys) with Conversation Intelligence (classic) for fine-grained control over API resources. For example, you can provide permissions for an API Key that can modify [Conversation Intelligence (classic) Service resources](/docs/conversation-intelligence-classic/api/service-resource), but can't access potentially-sensitive information like unredacted [Media resources](/docs/conversation-intelligence-classic/api/transcript-media-subresource) and [OperatorResults resources](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource).
