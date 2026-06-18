# JavaScript Room Monitor

Twilio's [JavaScript Room Monitor](https://www.twilio.com/en-us/blog/twilio-room-monitor-video-application) is a browser-based tool that displays real-time information and metrics about a Twilio Video Room. It gathers and processes information from the [Room](https://sdk.twilio.com/js/video/releases/2.34.0/docs/Room.html) object, including information about Participants' bandwidth, jitter, and packet loss, and displays the information in a modal window in the video application.

Below is as an example of interacting with the Video Room Monitor in a running application:

![Twilio Video Room Monitor showing room details and participant list.](https://docs-resources.prod.twilio.com/65805a9d7a2a69a9a8507cdc5ca16ff853925b0ee5668e92876cad2d2f268cb2.gif)

The JavaScript Room Monitor can be added to any Twilio Video JavaScript application to help during all stages of development and for debugging in-progress calls. The Video Room Monitor is an open-source project, so you may also fork and customize the application to fit your specific use case.

## Browser support

|             | Chrome | Edge (Chromium) | Firefox | Safari |
| ----------- | ------ | --------------- | ------- | ------ |
| **Android** | ✓      | -               | ✓       | -      |
| **iOS**     | ✓      | -               | -       | ✓      |
| **Linux**   | ✓      | -               | ✓       | -      |
| **macOS**   | ✓      | ✓               | ✓       | ✓      |
| **Windows** | ✓      | ✓               | ✓       | -      |

## Add the Room Monitor to your application

### NPM

You can install the Video Room Monitor directly from [npm](https://www.npmjs.com/package/@twilio/video-room-monitor).

```bash
npm install @twilio/video-room-monitor --save
```

After installing, you can import `@twilio/video-room-monitor` and open the Monitor like so:

```javascript
import Video from 'twilio-video';
import { VideoRoomMonitor } from '@twilio/video-room-monitor';

Video.connect('token').then((room) => {
  VideoRoomMonitor.registerVideoRoom(room);
  VideoRoomMonitor.openMonitor();
});
```

### Script tag

You can also copy `twilio-video-room-monitor.min.js` from the `dist/browser` folder after npm installing it and include it directly in your web app using a `<script>` tag.

```html
<script src="https://my-server-path/twilio-video-room-monitor.min.js"></script>
```

Using this method, you can register a room and open the Monitor like so:

```javascript
window.Twilio.VideoRoomMonitor.registerVideoRoom(room);
window.Twilio.VideoRoomMonitor.openMonitor();
```

### Console script quickstart (not for production use)

To quickly use the Video Room Monitor in any Twilio Video JavaScript application, you can run the following snippet in the browser console to load and open the Monitor. Note that the [Room object](https://media.twiliocdn.com/sdk/js/video/releases/2.34.0/docs/Room.html) must be exposed as a global variable (the sample below assumes the global variable is called `twilioRoom`) so that it can be registered with the Monitor.

```javascript
(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@twilio/video-room-monitor/dist/browser/twilio-video-room-monitor.min.js';
  script.onload = () => {
    // Register your Twilio Video Room here
    window.Twilio.VideoRoomMonitor.registerVideoRoom(twilioRoom);
    window.Twilio.VideoRoomMonitor.openMonitor();
  };
  document.body.appendChild(script);
})();
```

The script above opens the Monitor. You can then interact with the Monitor in your browser's console like so:

```javascript
VideoRoomMonitor.toggleMonitor(); // toggle the monitor open or closed
```

We do not recommend this method for production use, because we do not control the availability of the jsDelivr CDN.

## Use the Room Monitor

Below are the methods that are available on the Video Room Monitor. You can use these in your application's code, or call them in the browser's console to interact with the Monitor while your application is running.

### Register the Video Room with the Monitor

This is a required step to be able to use the Video Room Monitor. This registers a Twilio Video Room with the Monitor.

To register a Room, you can run the following line of code, passing in the [Room](https://sdk.twilio.com/js/video/releases/2.34.0/docs/Room.html) object that's returned when you [connect to a Video Room with the Twilio Video JavaScript SDK](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.connect__anchor).

```javascript
VideoRoomMonitor.registerVideoRoom(newRoom);
```

### Open the Monitor

To open the Room Monitor after you have registered it, you can use the `openMonitor` method.

```javascript
VideoRoomMonitor.openMonitor();
```

Opening the Video Room Monitor emits an `opened` event. You can listen for this `opened` event with the following code:

```javascript
VideoRoomMonitor.on('opened', () => console.log('the monitor has been opened'));
```

### Close the Monitor

You can close the Monitor with the `closeMonitor` method:

```javascript
VideoRoomMonitor.closeMonitor();
```

Closing the Monitor emits a `closed` event. You can listen for the `closed` event with the following code:

```javascript
VideoRoomMonitor.on('closed', () => console.log('the monitor has been closed'));
```

### Toggle the Monitor open or closed

You can use the `toggleMonitor` method to toggle the Monitor open or closed. If the Monitor is closed when you call this method, the Monitor will open and emit the `opened` event. If the Monitor is open when you call `toggleMonitor`, it will close the Monitor and emit the `closed` event.

```javascript
VideoRoomMonitor.toggleMonitor();
```

### Check if the Monitor is open

The Monitor has an `isOpen` property, which is a Boolean indicating whether or not the Monitor is open.

```javascript
VideoRoomMonitor.isOpen;
```

## Available metrics and information

The Room Monitor has two tabs: Info and Stats. Under the [Info tab](/docs/video/troubleshooting/javascript-room-monitor#info), you will find information about the Room and all of its Participants and their tracks. The [Stats tab](/docs/video/troubleshooting/javascript-room-monitor#stats) contains graphs of the bitrate sent and received over the course of the video call for the local Participant.

### Info

In the Info tab, you will find metrics for both the local and remote Participants. For each Participant and each track, you can view properties and metrics that are helpful for making optimizations or assessing media quality, such as packet loss percentage and jitter. The Info tab also includes relevant metadata about the Room and its Participants, such as the media region selected or the [ConnectOptions](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#ConnectOptions__anchor) of the local Participant.

#### Room

Displays information about the [Room](https://sdk.twilio.com/js/video/releases/2.34.0/docs/Room.html) object.

| **Name**                 | **Description**                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Room Name                | The Room's unique name                                                                                                                                          |
| SID                      | The Room's SID                                                                                                                                                  |
| State                    | The state of this client's connection to the Room. Can be `connected`, `reconnecting`, or `disconnected`.                                                       |
| Dominant Speaker         | Which Participant is currently the dominant speaker. If [dominant speaker detection](/docs/video/detecting-dominant-speaker) is not enabled, this will be null. |
| Media Region             | Which [media server region](/docs/video/tutorials/video-regions-and-global-low-latency) the room is connected to.                                               |
| Is Recording             | Whether the room is being [recorded](/docs/video/tutorials/understanding-video-recordings-and-compositions)                                                     |
| Total Sent Bandwidth     | This client's aggregate outgoing bandwidth, in kbps                                                                                                             |
| Total Received Bandwidth | This client's aggregate incoming bandwidth, in kbps                                                                                                             |

The Room information will also display the Room's [ConnectOptions](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#ConnectOptions__anchor) that were configured when connecting to the Room.

#### Participants

Displays information about remote and local [Participants](https://sdk.twilio.com/js/video/releases/2.34.0/docs/Participant.html), as well as the Participants' tracks.

| **Name**            | **Description**                                                                                                                                                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SID                 | The Participant's SID                                                                                                                                                                                                                                                                                                                         |
| isReconnecting      | Whether this Participant is reconnecting to the Room after a signaling connection disruption                                                                                                                                                                                                                                                  |
| networkQualityLevel | The Participant's current NetworkQualityLevel, if the [Network Quality API](/docs/video/using-network-quality-api) is enabled. The NetworkQualityLevel is a value from 0-5, inclusive, representing the quality of a network connection. 5 indicates excellent network quality, and 0 represents a broken or reconnecting network connection. |

#### Data Tracks

Displays information about a Participant's published [data tracks](https://sdk.twilio.com/js/video/releases/2.34.0/docs/RemoteDataTrack.html).

| **Name**          | **Description**                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kind              | `data`, indicating that this is a data track                                                                                                                                                                                               |
| id                | The data track's id                                                                                                                                                                                                                        |
| maxPacketLifeTime | If non-null, this represents a time limit (in milliseconds) during which data will be transmitted or retransmitted if not acknowledged on the underlying [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) |
| maxRetransmits    | If non-null, this represents the number of times the data will be retransmitted if not successfully received on the underlying [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel)                           |
| Ordered           | `true` if data on the RemoteDataTrack can be received out-of-order                                                                                                                                                                         |
| Reliable          | This is `true` if both maxPacketLifeTime and maxRetransmits are set to null. If this is `true`, there is no bound on packet lifetime or the number of retransmits that will be attempted, ensuring "reliable" transmission.                |
| isEnabled         | Will always be `true` for published data tracks                                                                                                                                                                                            |
| isSwitchedOff     | Whether the RemoteDataTrack is switched off. See [Network Bandwidth Profile](/docs/video/tutorials/using-bandwidth-profile-api) for more information about switching tracks on and off.                                                    |
| Priority          | The [subscribe priority](/docs/video/tutorials/using-track-priority-api) of the RemoteDataTrack                                                                                                                                            |

#### Audio Tracks

Displays information about a Participant's published [audio tracks](https://sdk.twilio.com/js/video/releases/2.34.0/docs/AudioTrack.html).

| **Name**               | **Description**                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Name                   | The track's name                                                                                             |
| SID                    | The track's SID                                                                                              |
| isSubscribed           | Whether the local Participant is subscribed to this track                                                    |
| isEnabled              | Whether or not the audio track is enabled. If the audio track is not enabled, it is "muted".                 |
| Bandwidth              | Kilobits sent per second if this is a local track, or kilobits received per second if this is a remote track |
| Codec                  | The [codec](/docs/video/managing-codecs) used for encoding and decoding this audio track                     |
| Jitter                 | Audio jitter (the fluctuation of latency over time) in milliseconds.                                         |
| Packets Lost           | The number of packets lost over the life of the call                                                         |
| Packet Loss Percentage | The percentage of packets lost to total packets sent                                                         |

#### Video Tracks

Displays information about a Participant's published [video tracks](https://sdk.twilio.com/js/video/releases/2.34.0/docs/VideoTrack.html).

| **Name**               | **Description**                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                   | The track's name                                                                                                                                                                    |
| SID                    | The track's SID                                                                                                                                                                     |
| isSubscribed           | Whether the local Participant is subscribed to this track                                                                                                                           |
| Dimensions             | The video's width and height                                                                                                                                                        |
| isSwitchedOff          | Whether the video track is switched off. See [Network Bandwidth Profile](/docs/video/tutorials/using-bandwidth-profile-api) for more information about switching tracks on and off. |
| isEnabled              | Whether or not the video track is enabled. If the video track is not enabled, it is "paused".                                                                                       |
| Bandwidth              | Kilobits sent per second if this is a local track, or kilobits received per second if this is a remote track                                                                        |
| Codec                  | The [codec](/docs/video/managing-codecs) used for encoding and decoding this video track                                                                                            |
| Framerate              | The video track's frame rate                                                                                                                                                        |
| Packets Lost           | The number of packets lost over the life of the call                                                                                                                                |
| Packet Loss Percentage | The percentage of packets lost to total packets sent                                                                                                                                |

#### Media Stream Tracks

Displays information about the [Media Stream Tracks](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) attached to either a video or audio track.

| **Name**   | **Description**                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| muted      | Whether this track is muted                                                                                                       |
| readyState | The track's [readyState](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/readyState). Can be `live` or `ended`. |
| id         | The track's id                                                                                                                    |
| label      | The track's label identifying the track's source, such as `internal microphone`                                                   |
| kind       | The type of track. Can be `audio` or `video`.                                                                                     |

### Stats

The Stats tab displays a graph of the sent and received bitrate summed across all tracks (audio, video, and data) during the video chat, reported in kbps. The x-axis displays the local time.
