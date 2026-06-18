# Programmable Video REST API

The Programmable Video REST API allows you to control your video applications from your back-end server via HTTP requests. You can create and complete Rooms, query their status, retrieve Recording files, configure a webhook for Status Callbacks, and more.

All Programmable Video REST API resources use the following base URL.

```bash
https://video.twilio.com

```

All requests to the Programmable Video Rooms REST API are served over HTTPS. Unencrypted HTTP is not supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://video.twilio.com/v1/Rooms \
       -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Resources

The resources you will be interacting with via the Programmable Video REST API are:

| Resource                                                   | Description                                                                                                                                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Rooms](/docs/video/api/rooms-resource)                    | A Room represents a multi-party communications session among users in your application, where users can share and receive real-time audio and video tracks with one another. |
| [Participants](/docs/video/api/participants)               | A Participant is one user session in a Room.                                                                                                                                 |
| [PublishedTrack](/docs/video/api/publishedtrack)           | Published Tracks represent media shared in a Room by a Participant.                                                                                                          |
| [Track Subscriptions](/docs/video/api/track-subscriptions) | Subscribe Rules represent Participant's Track Subscriptions.                                                                                                                 |
| [Recordings](/docs/video/api/recordings-resource)          | A Recording represents the recorded media for an audio, video, or screen share Track shared in a Room.                                                                       |
| [Compositions](/docs/video/api/compositions-resource)      | A Composition represents a playable media file resulting from the mixing of a set of Room video Recordings.                                                                  |
