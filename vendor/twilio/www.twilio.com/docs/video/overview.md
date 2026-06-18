# Twilio Video technical overview

Integrate real-time video calling functionality into your web, iOS, and Android applications with Twilio Video. Twilio Video is a communications platform built on [WebRTC](/docs/glossary/what-is-webrtc) that provides user access management, media services, and signaling to support scalable video applications.

Twilio Video is programmable, giving you full control over how video appears in your application. You aren't constrained to any particular formats and can calibrate performance based on your use case. Twilio Video capabilities include screen sharing, recordings, noise cancellation, virtual backgrounds, dominant speaker detection, and support for Twilio Voice.

Twilio provides SDKs and APIs to build Twilio Video into your app, and tools to monitor and optimize video quality and app performance.

## Video Rooms

Video Rooms are the core building blocks of a Twilio Video experience. Participants join a Room and can then exchange audio, video, and other data in real time.

### Sharing media tracks

All Participant media tracks (video, audio, and data) go through the Twilio Cloud, which acts as a *Selective Forwarding Unit* (SFU) to share the media with other Participants. An SFU is a server that receives media streams from all participants and selectively forwards them to other participants without mixing or processing the streams.

Video Rooms use a publish-subscribe model for three types of Participant tracks: video, audio, and data. A Participant publishes their video, audio, or data tracks, and all other Participants can subscribe to those published tracks. Participant tracks go to the Twilio Cloud SFU, which forwards that data to the other Participants. You control which tracks to include in your application.

### Room capacity

Rooms can have up to 50 concurrent Participants. Clients only publish Participant media tracks once to the SFU, which clones and routes them to subscribers (other Participants). This architecture means that a Participant's upstream bandwidth and battery consumption isn't affected by the number of Participants in a Room.

### Creating Rooms

You can create Video Rooms in two ways:

* Using the Rooms API resource before a Participant joins a Room
* Automatically, on the client side, when a Participant requests to join a Room

While the API allows fine-grained control over Room configuration, client-side Room creation is better for rapid scaling to a large number of Rooms. In both cases, Rooms have a maximum duration of 24 hours, and Participants can remain connected for up to 24 hours.

Learn more about [Video Rooms](/docs/video/tutorials/understanding-video-rooms).

## Components of a Twilio Video app

A Twilio Video app requires both a front-end and a back-end component to support Video Rooms:

* **Back-end server**: The application server that generates Access Tokens for Participants. Your application server can also use [Video APIs](/docs/video/api) to create and manage Room settings or Recordings.
* **Front-end client**: The mobile client or web browser client app that users interact with and that connects to the Twilio Cloud. Twilio Video has SDKs for [JavaScript](/docs/video/javascript), [iOS](/docs/video/ios), and [Android](/docs/video/android).

Learn more about the [components of a Twilio Video app](/docs/video/video-app-components).

## Twilio Video capabilities

Twilio Video offers a range of features to enhance, customize, and optimize your video applications. The following sections describe key capabilities you can add to your app.

### Screen sharing

Your Twilio Video app can include screen share so that Participants can share their device screen with other Participants in a Video Room.

Learn how to [share a Participant's screen in a Room](/docs/video/tutorials/screen-share) as a video track.

### Recordings and Compositions

You can record Video Room content. Because all Participant audio, video, and data passes through Twilio's SFU, Twilio can save that media for you to retrieve after a Room session completes.

Twilio records and stores each Participant media track (video, audio, and data) as a separate file. For example, if Participants share audio and video, each Participant will have a file for video and another for audio. You can choose to record all the tracks in a Room, or [capture specific Participants and tracks](/docs/video/tutorials/understanding-video-recordings-and-compositions#the-video-recording-rules-rest-api).

After recording a Room, you can customize the layout of the final recorded video using [Compositions](/docs/video/tutorials/understanding-video-recordings-and-compositions#working-with-video-compositions). The Composition service takes individual track recordings, formats them visually according to your specifications, and creates an output file in MP4 or WebM format.

You can choose to store Recordings and Compositions in the Twilio Cloud by default, or [set up external AWS S3 storage](/docs/video/tutorials/storing-aws-s3).

Learn more about [recordings and compositions](/docs/video/tutorials/understanding-video-recordings-and-compositions).

### Enhancing video quality

The end user's network and device setup influences the quality of a video call. Twilio Video tools can provide the end user feedback about their connectivity before they join a call, display real-time information and metrics about a call, and capture logs for app monitoring.

See the full list of Twilio Video [diagnostic and troubleshooting tools](#diagnostic-and-troubleshooting-tools) below.

#### Adaptive simulcast

Simulcast is a scalable video technique that helps you determine video quality for each Participant based on their available bandwidth. Adaptive simulcast dynamically enables and disables video quality layers to improve bandwidth and CPU usage. This helps save device resources in cases such as a presentation or grid UI layout, when the application doesn't need a Participant's highest resolution video. Adaptive simulcast ensures that publishers are only encoding the video quality layers needed at a given moment.

Learn more in [Working with VP8 Adaptive Simulcast](/docs/video/tutorials/working-with-vp8-simulcast).

### Virtual backgrounds

You can add virtual backgrounds, background blurring, or other custom video filters in JavaScript applications using the [Twilio Video Processors SDK](/docs/video/video-processors). See a [demo of the Video Processors SDK](https://twilio.github.io/twilio-video-processors.js/examples/virtualbackground/) and a [blog post about how to use the Video Processors to create virtual backgrounds](https://www.twilio.com/blog/change-background-video-calls-twilio-video-processors-library).

### Noise cancellation

Twilio Video Noise Cancellation (powered by Krisp) is an AI-based plugin that filters out background noise in real time. You can host and serve the Krisp audio plugin for JavaScript, iOS, or Android in your application. The plugin runs as part of the audio pipeline between the microphone and audio encoder and removes unwanted sounds during a preprocessing step.

Learn how to [add noise cancellation to your Twilio Video app](/docs/video/noise-cancellation).

## Scaling your Twilio Video app

Twilio Video enforces default concurrency and request quotas to optimize resource usage while enabling application growth. Quotas apply per Account SID and include the following limits:

* Concurrent Rooms quota
* Concurrent Participants quota
* REST API read/write request quotas

To manage quotas and scale your app, consider these best practices:

* Use ad-hoc Rooms to avoid creating unused Rooms.
* Use status callbacks to reduce read requests.
* Implement retries with exponential backoff.
* Request higher quotas by contacting Twilio sales.

Learn more about [quotas and limits](/docs/video/guide-to-scaling-applications) and how to [scale your Twilio Video application](/docs/video/guide-to-scaling-applications).

## Diagnostic and troubleshooting tools

Gain insight into your video applications and provide feedback to end users about their setup and connectivity both before and during video calls. Twilio Video offers the following diagnostic tools:

* [Video Insights](/docs/video/troubleshooting/insights): Analytics and aggregations in the Twilio Console for observing your application, discovering trends, and troubleshooting Rooms and Participants.
* [JavaScript Room Monitor](/docs/video/troubleshooting/javascript-room-monitor): A browser-based tool that displays real-time information and metrics about a Twilio Video Room. It gathers and processes information from the Room object, including information about Participants' bandwidth, packet loss, and jitter, and displays the information in a modal window in the video application.
* [JavaScript Logger](/docs/video/troubleshooting/javascript-logger): Capture logs generated by the Twilio Video JavaScript SDK in real time so that you can monitor your front-end applications and see how they behave in production.
* [JavaScript Video diagnostics application](/docs/video/troubleshooting/pre-call-testing-and-diagnostics#video-diagnostics-application): An open-source ReactJS application that tests participants' device and software setup, connectivity with the Twilio Cloud, and network performance. It uses the RTC Diagnostics SDK and the Preflight API to provide end-users feedback about their network quality and device setup and also includes recommendations for improving their video call quality.
  * [Preflight API](/docs/video/troubleshooting/preflight-api): Functions for testing connectivity to the Twilio Cloud. The API can identify signaling and media connectivity issues and provides a report at the end of the test.
  * [RTC diagnostics SDK](https://github.com/twilio/rtc-diagnostics): Functions to test a Participant's input and output devices, including microphones, speakers, and cameras, as well as functionality to confirm that a Participant meets the network bandwidth requirements to make a voice call or conduct a video call.

## Networking considerations

Twilio Video uses WebRTC to provide real-time video and audio communication in Rooms. Review the [list of ports and protocols](/docs/video/ip-addresses) that Twilio uses during video calls so that you can help end users connect to your application.

Additionally, you can learn more about [locations of Twilio servers and global low latency](/docs/video/tutorials/video-regions-and-global-low-latency). Connecting to Twilio infrastructure that's closest to your end users will help reduce round-trip time and latency on video calls.

For more information, see [Networking considerations for Video applications](/docs/video/networking-considerations).

## Integrate with other Twilio products

You can integrate other Twilio services into your Video application. Consider adding the following services:

* [Voice](/docs/voice): [Add support for Participants to join Video Rooms from cell or landline phones](/docs/video/adding-programmable-voice-participants-video-rooms).
* [Conversations](/docs/conversations-classic): Add text-based chat into your video application.
  * See a blog post tutorial for [adding Conversations into a JavaScript video application](https://www.twilio.com/blog/text-chat-video-calls-twilio-conversations-api).
  * The [JavaScript Quick Deploy application](https://www.twilio.com/blog/open-source-video-chat-app-reactjs-conversations-api) also uses the Conversations API for in-app chat.
* [Sync](/docs/sync): Synchronize state in real time between browsers, mobile devices, and the Twilio cloud.
  * See a blog post tutorial for [creating a shared notepad in a video app with Twilio Sync](https://www.twilio.com/blog/cobrowse-shared-notepad-twilio-sync-programmable-video).
