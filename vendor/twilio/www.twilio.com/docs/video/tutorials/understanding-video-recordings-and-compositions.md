# Understanding Video Recordings and Compositions

> \[!WARNING]
>
> Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. [Learn more about the new Console](https://www.twilio.com/blog/new-and-improved-console-now-in-general-availability).

## Basic concepts

Twilio Programmable Video is organized in two domains:

* The in-flight domain, which deals with RTC (Real-Time multimedia Communications). Twilio Rooms are in-flight services.
* The post-flight domain, which deals with media capabilities beyond RTC. Our main post-flight services are Recordings and Compositions.

![Diagram showing in-flight and post-flight video processing with group room, recordings, and compositions.](https://docs-resources.prod.twilio.com/fee948fc5069a2b4b8d6a9cfee0f40fe9b1ec6c8709a86027498765747325c37.png)

The **Video Recording Service** is a post-flight service which persists the media information that is communicated among Room participants. In a Room, media is exchanged in the form of tracks. For example, if there are 7 participants publishing their microphone and webcam, there will be a total of 14 media tracks: 7 audio tracks and 7 video tracks. If later a screen-share is published, then the number of tracks will be 15. If Video Recording is activated for this Room, then 15 different recordings will be generated, one per media track.

Often, users want to playback the recorded Rooms. However, most media players are not capable of playing back Twilio Video Recordings and will exhibit strange behavior such as lack seekability and/or reporting the file is corrupt. This is because Twilio Video Recordings have been designed for flexibility, reliability and compactness, making them incompatible with common media players. To playback recordings, you will need to use the Video Compositions Service.

The **Video Compositions Service** is a post-flight service which provides the capability to create playable files by mixing Video Recordings. To create a Composition, developers need to specify:

* The room that acts as the source of the recordings
* The specific audio tracks to be included
* The specific video tracks to be included
* The layout of the video tracks
* The required video resolution
* The required file format
* etc.

## Rooms, Recordings and Files: Object Model

Twilio Programmable Video in-flight APIs are designed around three main object types: Rooms, Participants, and Tracks. The following UML diagram illustrates how these relate to Recordings and Compositions:

![UML diagram showing relationships: Room to Participant, Track; Composition to Playable Media File; Recording to Non-playable Media File.](https://docs-resources.prod.twilio.com/f09225177821acb9835f1da54dbc9faee7a001411f1220cb6d0dea9bd12dd103.png)

In the general case, when a Track is recorded it generates one Recording object, which in turn has one media file you can download. Hence, you may see the Recording object as a file containing the Track media and some additional metadata. However, there are some corners cases to that rule:

* If a Track is recorded but it has no media (e.g. because it is muted), it will not have any associated Recording object. In other words, a recorded Track may not have any Recordings.
* Upon exceptional conditions (e.g. very bad network conditions) a Recording object may not have any associated media file.
* Upon exceptional conditions (e.g. Twilio media server failure) a Track may generate multiple Recordings.

It is important to remark that Twilio does not support Data Track recordings. Hence, not all Track subtypes can generate Recordings.

![Diagram showing video and audio tracks recorded, data track not recorded in Group Room.](https://docs-resources.prod.twilio.com/38c5b17d6b1f4d79464e730eeac903fd4548ef1546ede736ad338172510b2583.png)

A Composition aggregates one or more Recordings (i.e. in a Composition we must include at least one recording). However, a Recording can be included in zero or more Compositions, as nothing prevents the same Recording to be part of as many Compositions as you want.

A Composition is always associated with one Room, meaning that it is not possible to create Compositions mixing Recordings from multiple Rooms. However, for a given Room zero or more compositions can be created.

## Working with Video Recordings

### Enabling Video Recordings

Video Recordings can be enabled by setting the [Recording Rules](/docs/video/api/recording-rules) for the Room or else setting the `record_participants_on_connect` flag when creating the Room. When Video Recordings are enabled for a Room, all the published tracks are recorded. By defining Recording Rules it is possible to choose which of the published tracks should be recorded. By default, Video Recordings are disabled and no tracks are recorded.

**Enabling Video Recordings in the Console**

To enable Video Recording in the Console, navigate to your [Room Settings](https://www.twilio.com/console/video/configure) and set `RECORDING` to `ENABLED`.

Once Recordings are enabled, all your [ad-hoc](/docs/video/tutorials/understanding-video-rooms#ad-hoc-rooms) Rooms and all your Rooms created using the [Room REST API](/docs/video/api/rooms-resource) will have recordings enabled by default.

**Enabling Video Recordings using the Rooms REST API**

The [Room REST API](/docs/video/api/rooms-resource) allows to override the Console specified behavior on a per-room basis. This is done using the `RecordParticipantsOnConnect` `POST` parameter.

* If `RecordParticipantsOnConnect` is not set at `POST` time, the Console default is used.
* If `RecordParticipantsOnConnect` is set to `true`, then recordings are enabled no matter what the Console specifies.
* If `RecordParticipantsOnConnect` is set to `false`, then recordings are disabled no matter what the Console specifies.

You can check our official [Room REST API documentation](/docs/video/api/rooms-resource#post-list-resource) for further information on how to use this parameter.

### Video Recordings Logs in the Console

The [Video Recordings Logs](https://www.twilio.com/console/video/logs/recordings) Console page makes it possible to manage your video recordings. On this page, you can:

* List all the video recordings in your account
* Filter your recordings per time interval or per source room
* Bulk delete the video recordings matching a given set of conditions
* Retrieve video recordings by SID

  ![Completed recordings list with date, SID, room details, duration, type, and status.](https://docs-resources.prod.twilio.com/453383d8750e07de4c571d6150697a484426fc3c8ffe3ccbe4289e92f6b72042.png)

In the Video Recordings Logs every recording will be represented as a row containing:

* The date the recording was created
* The Recording SID (String ID) that uniquely identifies that recording
* The Room SID identifying the source Room of the recording
* The duration, in seconds, of the recording
* The type of recording (audio or video)
* The status of the recording. Recordings in `Completed` status will have an associated file that can be downloaded.

Clicking on the Date field will open the Recording Details Console page where you will be able to:

* Further inspect the recording metadata
* Download the recording media file (only if the recording is in `Completed` state)
* Delete the recording

![Recording details showing properties like SID, duration, status, size, type, and codec.](https://docs-resources.prod.twilio.com/ee257d0baf0e9dfa3036e5ef440e5430ab5d8bb196a8bbd8a03e57c9a27b2aa0.png)

### The Video Recordings REST API

The Video Recording Logs in the Console allow you to perform basic administration and monitoring tasks. However, if you want to have full programmatic control over how your recordings are managed, you should use the [Video Recordings REST API](/docs/video/api/recordings-resource). As with most of Twilio's products, this API is based on the following communication model:

* The developers' applications may send REST requests to Twilio. Currently, the only supported operations are `GET` and `DELETE`. `GET` is used to fetch recordings meta-data and media files, and `DELETE` is used to delete recordings.
* Twilio may send asynchronous HTTP callback requests to the developers' applications. We typically refer to those requests as "webhooks". They are sent to the [status callback URL provided at Room creation time](/docs/video/api/rooms-resource#post-list-resource) when there are relevant events about recordings. Some common status callbacks are: `recording-started`, `recording-completed`, `recording-failed`, etc.

For more details, please check the [Video Recordings REST API](/docs/video/api/recordings-resource) and the [Status Callbacks](/docs/video/api/status-callbacks) reference documentation.

### The Video Recording Rules REST API

The [Video Recording Rules REST API](/docs/video/api/recording-rules) allows you to customize the recording settings for in-progress Rooms. Using this API, you can control aspects such as when to start, pause, and stop the recordings, which participants to record, and which tracks to record. The rules can be updated at any time during the life of the room.

### Video Recordings and PSTN Participants

Twilio Rooms provide [PSTN interoperability](/docs/video/adding-programmable-voice-participants-video-rooms). This means that any Twilio Voice call can be connected to a Room and it will behave as a participant that does not publish or subscribe to any video. In this scenario we have a Twilio Voice call that is, at the same time, a Twilio Video participant. When considering recordings, this situation generates some confusion among developers. The following should help to clarify:

* When a Twilio Voice call is connected to a Twilio Video Room and such room has recordings enabled, then the Twilio Voice call will be recorded as an audio track of that Room. That recording will be managed by the Twilio Programmable Video Platform as specified in this document.
* The Twilio Voice call can be itself recorded using the Twilio Voice APIs and capabilities. In that case, that recording will be managed by the Twilio Programmable Voice Platform as specified in the [Twilio Voice Recordings](/docs/voice/api/recording) documentation.

Hence, when it comes to recordings, a PSTN participant has 4 options:

* Not to be recorded at all.
* To be recorded only as a Room participant. Hence, the recording will only be available at the Twilio's Video API and Console.
* To be recorded only as a Twilio Voice call. Hence, the recording will only be available at the Twilio's Voice APIs and Console.
* To be recorded in both platforms.

## Working with Video Compositions

Twilio Video Compositions are a post-flight service developers can use to create playable files by mixing their Video Recordings. A given composition can only include recordings generated on the same source Room. This guarantees all recordings in the composition have a common time reference and can be synchronized. However, not all recordings in the source Room need to be in the composition. Developers can select the specific audio recordings to be included, which will be mixed through a linear adder, as well as the desired video recordings, which will be composed following a layout developers also provide.

Developers can compose a given Room in multiple ways to stress different aspects of the communication that might be relevant for different use-cases. For example, an e-learning session can be composed with a Picture-in-Picture layout showing the screen and webcam of the teacher so that students can playback the lesson. It can also be composed in a grid layout showing all the student webcams for evaluating the degree of attention of the students.

*Note: The maximum size of all selected Recordings for a Composition is 40 GB. For estimation of Recording's size check this [table](/docs/video/api/recordings-resource#recording-size-estimation).*

### Video Composition Logs in the Console

As with Recordings, the [Video Compositions Logs](https://www.twilio.com/console/video/compositions/logs) Console page makes it possible to manage your video compositions. Using it, you can:

* List all the video compositions in your account
* Filter your compositions per time interval or per source room
* Bulk delete all the video compositions matching a given set of conditions
* Retrieve video compositions by SID

![Twilio video composition logs showing timestamps, IDs, durations, formats, and statuses.](https://docs-resources.prod.twilio.com/a28926f156464d9d4e89eb22648c541b5020bd1f528f00007ba254f8528acb5a.png)

In the Video Compositions Logs every composition will be represented as a row containing:

* The date the composition was created
* The Composition SID that uniquely identifies that composition
* The Room SID identifying the source Room of the composition
* The duration, in seconds, of the composition
* The composition file format.
* The status of the composition. Compositions in `Completed` status will have an associated file that can be downloaded or played.

Clicking into the Date field you will open the Composition Details Console page where you will be able to:

* Further inspect the composition metadata.
* Play the composition media file.
* Download the composition media file (only if the recording is in `Completed` state)
* Delete the recording

![Video composition details showing composition SID, room SID, date, duration, and status as completed.](https://docs-resources.prod.twilio.com/32291f1f17901fb796bce2835d9c2b6198fa5b2673e84e19ef93df4ab3f896b8.png)

### The Video Compositions REST API

The [Video Compositions REST API](/docs/video/api/compositions-resource) is also based on the above mentioned REST/Callbacks model:

* Developers can use the REST API to create new compositions (`POST`), fetch compositions metadata and media files (`GET`) and delete compositions (`DELETE`).
* At composition creation time, the `POST` request can specify the `StatusCallback` and the `StatusCallbackMethod` parameters. Twilio will send webhooks to the URL specified in the former with the HTTP method given in the latter. Some common status callbacks related to compositions are: `composition-started`, `composition-progress`, `composition-available`, etc.

To have full details, please check the [Video Compositions REST API](/docs/video/api/compositions-resource) and the [Status Callbacks](/docs/video/api/status-callbacks) reference documentation.

## The Application Timeline for Recordings and Compositions

To develop applications involving Video Recordings and Compositions developers must use the Video Recordings and Video Compositions REST APIs and listen to the appropriate HTTP callbacks that Twilio generates. Understanding the relationship among these APIs and callbacks may be challenging. To illustrate how this works, the following picture shows an example timeline of the different requests and callbacks that occur in a simple service. For simplicity, we have omitted all the events that are not directly related to recordings or compositions. Requests are represented at the bottom while callbacks are at the top.

![Timeline of video recording and composition REST requests and callbacks using composition hooks.](https://docs-resources.prod.twilio.com/dcd04546b709d10da48debc7289a54bd0f853c16612e324babc9c856c79254e9.png)

In chronological order (from left to right) this picture shows the following:

**Create Room (`POST`)**: This is the first step of the application. The Room can be created using a `POST` request fired using the Rooms REST API. In this case the Room callback URL and method can be set as `POST` parameters. Notice that in ad-hoc Rooms this step is omitted and the callback parameters are taken from the [Console Room Settings](https://www.twilio.com/console/video/configure). All the room related callbacks as well as all the recordings related callbacks will be published to that URL with the given HTTP method. Notice also that we are assuming this room is created with recordings enabled.

**room-created**: This callback is fired just after the room is created.

**recording-started**: When the first track is published by a participant the first recording-started event if fired to indicate that a new recording has been created. This callback also provides the corresponding Recording SID. The newly created recording should be in state `processing`.

**recording-started**: Given that tracks are recorded individually, further track publications will fire further recording-started callbacks.

**Fetch Recording (`GET`)**: Once we have received a recording-started event, we can use the Video Recordings REST API to fetch the recording metadata. In the above timeline, such a recording should be in state `processing` and the recording media file will not be yet available.

**recording-completed**: When a track is unpublished, our media server finishes the recording and makes available the recording file. When this happens, the recording state goes to `completed`. After that the recording-completed callback is fired indicating to the application that the recording media file can be downloaded.

**Fetch Recording Media (`GET`)**: Once the recording-completed callback has been received, the application can safely fetch the associated media file. In that case, the `GET` request will return an HTTP redirection pointing to a self-signed temporary URL where the recording media file can be downloaded.

**room-ended**: when a room is completed all the published tracks are automatically unpublished and all the associated recordings are completed. A room can be completed in multiple ways. Note that the room's `empty_room_timeout` value can impact how long it takes for recordings to complete; this value determines the amount of time before a room ends after all participants have left the room. The default value is five minutes, which means that it will take at least five minutes after all participants have left a room before the room is ended and the recordings are completed. Check our Rooms [documentation](/docs/video/api/rooms-resource) for further information.

**recording-completed**: depending on how a room is completed and on whether there are still published tracks, the recording-completed callback for the pending recordings may arrive before or after the room-ended event. As a general rule, your application should not assume any specific order for these events.

**Create Composition (`POST`)**: Developers can fire the `POST` request for creating a composition at any time after the room-created event is received. The above timeline does it after the last recording-completed event is received, but developers can do it at any other time. As part of the `POST` parameters developers can specify the callback URL as well as the method to be used by the compositions webhooks. The `POST` request will return information about the newly created composition including the Composition SID. A composition is typically created in the state `enqueued` indicating that it is waiting for the available computing resources to start the media mixing operations.

**Fetch Composition (`GET`)**: after a composition has been created developers can fetch its associated metadata. However, the composition media file will not be available until the composition goes to the state `completed`.

**composition-started**: this callback is fired when the composition is taken out of the queue and allocated the appropriate computing resources to proceed. Notice that just before firing this event the composition state transitions to `processing`. Notice also that the total composition queue time is variable and depends on load conditions.

**composition-progress (3)**: while the composition is `processing` Twilio will fire periodic composition-progress callbacks providing a hint on the degree of completeness of the processing. The composition processing time depends on the source room duration and on the selected resolution and formats. As a worst-case, the rule of thumb is the total processing time should be under half of the duration of the room.

**composition-available**: when the media processing is completed the composition state transitions to `completed` and the associated media file is made available in our cloud. At that point, the composition-available event is fired.

**Fetch Composition Media (`GET`)**: Once the composition-available callback has been received, the application can safely fetch the associated media file. In that case, the `GET` request will return an HTTP redirection pointing to a self-signed temporary URL where the composition media file can be downloaded.

## Working with Video Composition Hooks

Many times developers need to compose all their Rooms with the same layout. Doing this requires firing a create composition `POST` request for each Room. In those cases, it may be more efficient to use the [Composition Hooks REST API](/docs/video/api/composition-hooks). A Composition Hook is a template that describes how a composition should be created. When a Composition Hook is active in a given Twilio Account, all the Rooms generating at least one recording that are completed in that account will be composed with the specified template. You can find full details on how to create and manage your Composition Hooks in our official [reference documentation](/docs/video/api/composition-hooks). Using Composition Hooks is similar to directly use the Composition REST API. The main differences are illustrated in this figure:

![Video Recordings and Compositions REST requests and Callbacks when using Composition Hooks.](https://docs-resources.prod.twilio.com/54db15c8076bcce4059d6673ca3a3c7378247c45efdd4cd07efe998b0e5eba09.png)

* A Composition Hooks needs to be created using the REST API. This is done by firing a `POST` to the CompositionHooks resource. That `POST` can specify a status callback URL and method that will be used to fire all the compositions-related callback events to the application. Notice that this `POST` is not depicted in the figure above because it can be done at any time on your Twilio Account.
* The application does not need to send a Create Composition (`POST`) request given that the Hook will create the composition automatically.
* As soon as all the recording in the room have completed the Compositions Hooks engine will check for any active hooks in the account and will automatically create a composition for each of them. For each newly created composition a composition-enqueued callback will be fired to the application. That callback contains the Composition SID that uniquely identifies the composition and that can be used for fetch the composition metadata and media file as soon as they are available.

## Video Recordings and Compositions Settings

Twilio Video Recordings and Compositions are stored in encrypted volumes and are only transferred to the Internet under strong cryptographic protection. However, many of our customers require further privacy guarantees to comply with their applicable legislation and policies. Due to this, Twilio has created the Video Recordings Settings and the Video Composition Settings. These capabilities make it possible to configure a Twilio Account to use special protection.

### Encrypting Recordings with Your Own Public Key

If you activate Encrypted Video Recordings in a Twilio account, all the Video Recordings media files generated in that account will be cryptographically protected with a public key provided by you. Hence, only you will be able to decrypt such recordings. Please, read our [Encrypting your Stored Media](/docs/video/tutorials/encrypting-your-stored-media) guide for further information on how to use this feature.

### Using External AWS S3 Video Storage

If you activate External AWS (Amazon Web Services) S3 Video Storage in an account, all the Video Recordings media files generated in that account will be directly stored in an S3 bucket specified by you. Hence, Twilio will not store or keep the media files you create on your behalf. Please, read our [Storing into AWS S3](/docs/video/tutorials/storing-aws-s3) guide for further information on how to use this feature.

## Twilio Programmable Video Information Flow

To fully understand how Video Recordings and Compositions are managed inside Twilio, please observe the following architectural diagram:

![Twilio video recording and composition flow with encryption and media storage.](https://docs-resources.prod.twilio.com/2dfe4255b2a8aa68a05dc49775489abf16affb315a389afc74b62f985e3701de.png)

As shown, there are two parallel information flows:

**The Signaling/Metadata information flow**

Video Recordings and Compositions are REST resources containing metadata describing the associated media files. That includes information regarding times, states, formats, durations, etc. If Twilio APIs are used appropriately, that metadata should not contain any kind of [PII](/docs/glossary/what-is-personally-identifiable-information-pii). For tracking purposes, when a Recording or a Composition are deleted, the metadata is kept for 30 days.

**The Media information flow**

The media information starts at the Room where our media server receives the audio and video bytes. The Video Recording Service can then read those bytes and create the appropriate Video Recordings that are stored following the corresponding account configuration specified in the Video Recording Settings:

* At the Encrypted Recordings Media Repository if Encrypted Video Storage is enabled.
* At an External S3 Media Storage if External S3 Video Storage is enabled.
* Or at the Recordings Media Repository (default)

Only when Recordings are stored into the Recordings Media Repository Twilio can read them. Due to this, Compositions are only possible on Recordings that are stored into that repository. When a Composition is created, the corresponding Recordings are read and mixed and the appropriate composed media file is generated and stored again following the corresponding account configuration specified in the Composition Settings.

## Unsupported features

For completeness, this section lists the not yet supported features:

Twilio Video Recordings:

* DataTracks recordings.

Twilio Video Compositions:

* Text overlays (i.e. the ability to overlay text in a composition)
* Image overlays (i.e. the ability to overlay images in a composition)
* Dynamic layout (i.e. the ability to dynamically change the composition layout)
