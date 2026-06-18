# Understanding Video Rooms

This guide introduces the concept of a Twilio Video Room and discusses how to create Rooms via the REST API and via client-side Room creation ("ad-hoc Rooms").

## Signaling and Media

RTC (Real-Time Communication) services are typically architected in two layers:

* **Signaling Plane**: This deals with the control information. The communicating entities typically exchange signaling messages for agreeing on what's to be communicated (e.g. audio, video, etc) and how's to be communicated (e.g. codecs, formats, etc.)
* **Media Plane**: It deals with the media information itself. Media packets typically transport encoded and encrypted audio and video bits.

In Twilio Programmable Video, signaling and media exchange takes place between clients and the Twilio's cloud, which orchestrates the communication and media sharing with the other users connected to the Room.

## Video Rooms

A Twilio Video Room is the virtual space where end users communicate. The Room resource provides:

* A session service: End users can connect and disconnect from Rooms. When an end user connects to a Room, they are called a Participant.
* A real-time communications (RTC) Service: Participants can communicate audio, video, and other data using WebRTC.

Video Rooms are based on a publish/subscribe model. A Participant can publish audio, video, and data tracks to the Room. The other Participants can then subscribe to such tracks to start receiving the media information.

### Media exchange in Video Rooms

* Participants publish media to a Twilio Selective Forwarding Unit (SFU). An SFU is a Media Server that decrypts the media, processes, re-encrypts, and routes the media tracks to the correct destinations.
* Media is not end-to-end encrypted, as the SFU performs a real-time decrypt-reencrypt step in memory when it routes the media to the participants.
* Services such as recordings and public switched telephone network (PSTN) interoperability can be added, as Twilio acts as media middleware.

The following picture illustrates the architecture of a Video Room.

![Cloud-based video room architecture with three participants on different devices.](https://docs-resources.prod.twilio.com/de769c425d37eb345baac2948422447a8b6a84ea6f226222471bcbaa8b36f783.gif)

Clients only need to publish their media tracks once to the SFU, which clones and routes the media to the correct subscribers. Because of this, upstream bandwidth and battery consumption are independent of the number of Participants in the Room.

## Creating Rooms: REST vs. Ad-hoc

There are two ways to create Rooms: The Rooms REST API and Ad-hoc Rooms.

### The Rooms REST API

Developers can create Rooms by `POST`ing an HTTP message to Twilio. The [Rooms REST API documentation](/docs/video/api/rooms-resource) provides reference information as well as examples on how this can be done for all Room types. Creating Rooms through the REST API should only be done when the additional flexibility the API provides is needed; otherwise, using [Ad-hoc Rooms](/docs/video/tutorials/understanding-video-rooms#ad-hoc-rooms) will help your application scale more effectively. For more information, see the [Guide to Scaling Applications.](/docs/video/guide-to-scaling-applications)

Rooms created using the REST API comply with the following:

* First join timeout: the first Participant must join within a specific amount of time, otherwise the Room is destroyed. By default, the first join timeout is 5 minutes, and this can be configured via the REST API when creating the Room (with the unused room timeout parameter).
* Last leave timeout: the amount of time before the Room is destroyed after the last Participant leaves. The default value for this is 5 minutes, and this can be configured via the REST API when creating the Room (with the empty room timeout parameter).
* Max Participant duration: a Participant can be connected to the Room up to 24 hours. After that time the Participant is disconnected.
* Max Room duration: a Room may exist up to 24 hours from creation time. After that time the Room is destroyed and all Participants get disconnected.

### Ad-hoc Rooms

Rooms can also be created just-in-time when the first Participant connects. When a Room is created that way, we say it is an *ad-hoc* Room. This is the recommended way of creating rooms, because Ad-hoc Rooms allow you to create many Rooms in a short period of time, and they allow you to create a Room without having to make a REST API call. You can scale with REST API Room creation, but you will have a limitation around burst creation of Rooms. For more information on this, see the [Guide to Scaling Applications.](/docs/video/guide-to-scaling-applications)

In order to use ad-hoc Rooms, developers must enable **Client-side Room Creation** in the [Twilio Console Room Settings](https://www.twilio.com/console/video/configure):

![Twilio Console showing client-side room creation enabled in room settings.](https://docs-resources.prod.twilio.com/7113c9bf284f4505136470e10ae725bf5d9cea68ce02533307d4823e67067fe7.png)

Ad-hoc rooms will be configured based on the Room settings you have configured in the Twilio Console. Before enabling Client-side Room Creation, you should verify that the additional settings in the Console accurately represent the settings for the Rooms that you would like to create. For example, you should make sure that **Room Type** represents the type of Room you would like all ad-hoc Rooms to be; when an ad-hoc room is created, it follows the configuration settings in the [Twilio Console](https://www.twilio.com/console/video/configure).

Make sure to press **Save** when you are doing making changes to the configuration in the Twilio Console.

Once that's done, a Room with the specified type will be created as soon as a Participant SDK connects. For example, the following code snippet illustrates how to do this in JavaScript:

```javascript
connect('$TOKEN', {name: 'myFancyRoomName' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});
```

Notice that a Room name must be specified. Names of active Rooms must be unique. Subsequent Participants connecting with that name will join that Room instead of creating a new one.

Ad-hoc Rooms comply with the following:

* First join timeout: none, as the Room is created when the first participant connects.
* Last leave timeout: the Room is destroyed immediately after the last Participant leaves.
* Max Participant duration: a Participant can be connected to the Room up to 24 hours. After that time the Participant is disconnected.
* Max Room duration: a Room may exist up to 24 hours from creation time. After that time the Room is destroyed and all participants get Disconnected.

### Comparing REST vs. Ad-hoc Rooms

The following table illustrates the main differences between Ad-hoc Rooms and Rooms created using the REST API:

|                          | **REST Rooms**                     | **Ad-hoc Rooms**                |
| ------------------------ | ---------------------------------- | ------------------------------- |
| Room creation method     | `POST` request                     | SDK connect primitive           |
| Room creation time       | When `POST` is received            | When first participant connects |
| First join timeout       | Configurable, 5 minutes by default | NA                              |
| Last leave timeout       | Configurable, 5 minutes by default | 0                               |
| Max Participant duration | 24 hours                           | 24 hours                        |
| Max Room Duration        | 24 hours                           | 24 hours                        |

## Next steps

Want to get started with Rooms? The following links may help you:

* [Getting started with the Video JavaScript SDK](/docs/video/javascript)
* [Getting started with Android](/docs/video/android)
* [Getting started with iOS](/docs/video/ios)
