# Status Callbacks

Status Callbacks allow you to receive events related to the REST resources managed by Twilio: Rooms, Recordings, and Compositions.

**All HTTP requests set the `Content-Type` header to `"application/x-www-form-urlencoded"`.**

## Rooms Status Callbacks \[#rooms-callbacks]

Rooms Status Callbacks allow you to receive events related to your Rooms via HTTP request. Configure a `StatusCallback` URL when creating a Room using the REST API, and Twilio will make an HTTP request (webhook) to that URL whenever an event takes place in the Room.

The Rooms API will generate the following Status Callback events.

### Rooms Status Callback events \[#rooms-callback-events]

The following events are dispatched to webhook URL specified at Room creation.

| Event                    | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| room-created             | Room created.                                                                                                                                                                                                                                                                                                                                                                                                            |
| room-ended               | Room completed. (Note: Rooms created by the REST API will fire a `room-ended` event when the room is empty for the amount of time configured as the "unused room timeout" or "empty room timeout" value. Both the unused room timeout and empty room timeout values are 5 minutes by default. See [Understanding Video Rooms](/docs/video/tutorials/understanding-video-rooms#the-rooms-rest-api) for more information.) |
| participant-connected    | Participant joined the Room.                                                                                                                                                                                                                                                                                                                                                                                             |
| participant-disconnected | Participant left the Room.                                                                                                                                                                                                                                                                                                                                                                                               |
| track-added              | Participant added a Track.                                                                                                                                                                                                                                                                                                                                                                                               |
| track-removed            | Participant removed a Track.                                                                                                                                                                                                                                                                                                                                                                                             |
| track-enabled            | Participant unpaused a Track.                                                                                                                                                                                                                                                                                                                                                                                            |
| track-disabled           | Participant paused a Track.                                                                                                                                                                                                                                                                                                                                                                                              |
| recording-started        | Recording for a Track began                                                                                                                                                                                                                                                                                                                                                                                              |
| recording-completed      | Recording for a Track completed                                                                                                                                                                                                                                                                                                                                                                                          |
| recording-failed         | Failure during a recording operation request                                                                                                                                                                                                                                                                                                                                                                             |

#### Example

Configure the StatusCallback URL by using cURL:

```bash
 curl -XPOST 'https://video.twilio.com/v1/Rooms' \
 -u '{API Key SID}:{API Secret}' \
 -d 'UniqueName=DailyStandup' \
 -d 'StatusCallback=https://hooks.example.com/room-events' \
 -d 'StatusCallbackMethod=POST'
```

### Rooms Status Callback request parameters \[#rooms-event-parameters]

Twilio passes the following parameters in each of the above-listed events whenever it makes an HTTP request to the `StatusCallback` URL you've set:

| Parameter           | Event                                    | Description                                                                                                                                                                                 |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid          | All                                      | The AccountSid associated with this Room                                                                                                                                                    |
| RoomName            | All                                      | The `UniqueName` of the Room generating this event.                                                                                                                                         |
| RoomSid             | All                                      | The `Sid` of the Room generating this event.                                                                                                                                                |
| RoomStatus          | All                                      | The `Status` of the Room generating this event.                                                                                                                                             |
| RoomType            | All                                      | The `Type` of the Room generating this event.                                                                                                                                               |
| StatusCallbackEvent | All                                      | The Room event. For example, `room-created`. See [Rooms Status Callback Events](#rooms-callback-events) for the complete list.                                                              |
| Timestamp           | All                                      | Time of the event, conformant to [UTC ISO 8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601#UTC).                                                                                      |
| ParticipantSid      | All Participant and Track Events         | The `Sid` for the Participant generating this event.                                                                                                                                        |
| ParticipantStatus   | All Participant and Track Events         | The current `Status` of the Participant generating this event - either `connected` or `disconnected`.                                                                                       |
| ParticipantDuration | Only on `participant-disconnected` event | The total duration the Participant remained `connected` to the Room.                                                                                                                        |
| ParticipantIdentity | All Participant and Track Events         | The `Identity` of the Participant generating this event. Participant identities are set via the Participant's Access Token                                                                  |
| RoomDuration        | Only on `room-ended`                     | The total duration of the Room, in seconds.                                                                                                                                                 |
| SequenceNumber      | All                                      | **This is an internal field and does not represent the true order of this event in the Room.** Use the `Timestamp` field to track the order of this event in relation to other Room events. |
| TrackSid            | All Track events                         | The `Sid` of the Track.                                                                                                                                                                     |
| TrackKind           | All Track events                         | The `Kind` of the Track (`data`, `audio` or `video`).                                                                                                                                       |

### Recordings Status Callback request parameters \[#recordings-event-parameters]

The parameters below are included only in events related to Recordings.

| Parameter                  | Event type                    | Description                                                                                                                                                                                                                                           |
| :------------------------- | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid                 | All `recording-*` events      | Twilio Account SID.                                                                                                                                                                                                                                   |
| RecordingSid               | All `recording-*` events      | RecordingSID.                                                                                                                                                                                                                                         |
| Timestamp                  | All `recording-*` events      | Time of the event, conformant to [UTC ISO 8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601#UTC).                                                                                                                                                |
| StatusCallbackEvent        | All `recording-*` events      | The Room event. For example, `recording-started`.                                                                                                                                                                                                     |
| RoomSid                    | All `recording-*` events      | The `Sid` of the Room generating this recording.                                                                                                                                                                                                      |
| RoomName                   | All `recording-*` events      | The given name of the Room generating this recording.                                                                                                                                                                                                 |
| RoomType                   | All                           | The `Type` of the Room generating this event.                                                                                                                                                                                                         |
| ParticipantSid             | All `recording-*` events      | The `Sid` of the Participant generating this recording.                                                                                                                                                                                               |
| SourceSid                  | All `recording-*` events      | This recording's source TrackSID, `MTxxx`.                                                                                                                                                                                                            |
| RecordingUri               | All `recording-*` events      | The relative URL to retrieve this recording's metadata.                                                                                                                                                                                               |
| MediaUri                   | Only on `recording-completed` | URL to fetch the generated media.                                                                                                                                                                                                                     |
| Duration                   | Only on `recording-completed` | Duration of the recording.                                                                                                                                                                                                                            |
| Size                       | Only on `recording-completed` | Total number of bytes recorded.                                                                                                                                                                                                                       |
| MediaExternalLocation      | Only on `recording-completed` | URL to fetch the generated media if stored in external storage.                                                                                                                                                                                       |
| Container                  | All `recording-*` events      | Container of the recording. Container used are `mka` for audio recordings and `mkv` for video recordings.                                                                                                                                             |
| Codec                      | All `recording-*` events      | Codec used for this recording. This could be `PCMU` or `OPUS` for audio recordings, and `VP8` or `H264` for video recordings.                                                                                                                         |
| ParticipantIdentity        | All `recording-*` events      | The `Identity` of the Participant generating this event. Participant identities are set via the Participant's Access Token.                                                                                                                           |
| TrackName                  | All `recording-*` events      | The name that was given to the source track of this recording. If no name is given, the `SourceSid` is used.                                                                                                                                          |
| OffsetFromTwilioVideoEpoch | All `recording-*` events      | The time in milliseconds elapsed between an arbitrary point in time, common to all Rooms, and the moment when the source room of this track started. This information provides a synchronization mechanism for recordings belonging to the same room. |
| Type                       | All `recording-*` events      | The type of track for this recording, `audio` or `video`.                                                                                                                                                                                             |
| FailedOperation            | Only on `recording-failed`    | Operation that failed: `RecordingStart`, `RecordingComplete`, `RecordingUpload`.                                                                                                                                                                      |

## Compositions Status Callbacks \[#compositions-callbacks]

Composition Status Callbacks allow you to receive events related to your Compositions via HTTP request.
You can configure the `StatusCallback` URL to receive your callbacks using two mechanisms:

* When you create a Composition using directly the REST API, you can set the `StatusCallback` URL as a `POST` parameter.
  In this case, at that URL you will only receive events related to that specific Composition.
* When you create a Composition Hook, you can set the `StatusCallback` URL at such Hook.
  In this case, at that URL you will receive events regarding that Hook as well as events regarding all Compositions
  created by such Hook.

Twilio sends the following status callback events for your Compositions and Composition Hooks.

### Compositions Status Callback Events \[#compositions-events]

Twilio dispatches the following events to the webhook URL that you specify when you create the Room.

| Event                   | Description                                                                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| composition-enqueued    | A new Composition has been created and enqueued for processing, but processing has not yet started. This event is only fired when the Composition is created through a Composition Hook. |
| composition-hook-failed | The Hook failed to create a new Composition.                                                                                                                                             |
| composition-started     | The media processing task started.                                                                                                                                                       |
| composition-available   | The media processing tasks completed and the Composition media file can be downloaded.                                                                                                   |
| composition-progress    | Progress report for the media composition task, sent approximately every 10%.                                                                                                            |
| composition-failed      | The media processing task failed.                                                                                                                                                        |

### Compositions Status Callback request parameters \[#compositions-event-parameters]

The parameters below are included in the `composition-*` events.

| Parameter             | Event type                                                      | Description                                                                                            |
| :-------------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| AccountSid            | All `composition-*` events                                      | Twilio Account SID.                                                                                    |
| RoomSid               | All `composition-*` events                                      | SID of the Room being the source of tracks for this Composition                                        |
| HookSid               | `composition-enqueued` and `composition-hook-failed`            | SID of the Composition Hook                                                                            |
| HookUri               | `composition-enqueued` and `composition-hook-failed`            | The relative URL to retrieve the Composition Hook metadata.                                            |
| HookFriendlyName      | `composition-enqueued` and `composition-hook-failed`            | The friendly name of the Composition Hook.                                                             |
| CompositionSid        | All `composition-*` events except for `composition-hook-failed` | SID of the Composition.                                                                                |
| CompositionUri        | All `composition-*` events except for `composition-hook-failed` | The relative URL to retrieve the Composition's metadata.                                               |
| MediaUri              | Only on `composition-available`                                 | The relative URL to fetch the composed media.                                                          |
| Duration              | Only on `composition-available`                                 | Duration of the composition.                                                                           |
| Size                  | Only on `composition-available`                                 | Total number of bytes of the resulting composition.                                                    |
| MediaExternalLocation | Only on `composition-available`                                 | URL to fetch the generated media if stored in external storage.                                        |
| PercentageDone        | Only on `composition-progress`                                  | Percentage of composition done.                                                                        |
| SecondsRemaining      | Only on `composition-progress`                                  | Estimated time remaining for the composition job to be finished (in seconds).                          |
| FailedOperation       | `composition-failed` and `composition-hook-failed`              | Operation that failed.                                                                                 |
| ErrorMessage          | `composition-failed` and `composition-hook-failed`              | Human-readable message that provides more information about the error.                                 |
| StatusCallbackEvent   | All `composition-*` events                                      | The Composition event. For example, `composition-started`.                                             |
| Timestamp             | All `composition-*` events                                      | Time of the event, conformant to [UTC ISO 8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601#UTC). |
