# Legacy Video Room Types

## Introduction

This page contains information about legacy WebRTC Go ("Go"), Peer-to-Peer ("P2P") Video Rooms, Small Group Rooms and audio-only Group Rooms. Twilio customers who used these Room types prior to October 21, 2024, may continue to use them and Twilio will continue to support them. However, customers who weren't using these Room types prior to October 21, 2024 won't have access to them and will only have access to [Group Rooms](/docs/video/tutorials/understanding-video-rooms).

## Go and P2P Rooms

Go and P2P Rooms both use peer-to-peer media exchange; Participants share audio and video data directly between one another without relaying that media through Twilio's cloud. Twilio infrastructure acts as the signaling server and helps each Participant create a direct connection to every other Participant in the Room for sending audio and video data.

Both Go and P2P Rooms have the following characteristics:

* Media (audio and video) is encrypted end-to-end (E2E) using WebRTC security protocols.
* Twilio does not mediate the media exchange, which takes place through direct communication among Participants. The only exception is when the media exchange requires [TURN](https://tools.ietf.org/html/rfc5766). In that case, a TURN server will blindly relay the encrypted media bits to guarantee connectivity. The TURN server cannot decrypt or manipulate the media.
* As Twilio does not intercept the media in these types of Rooms, it is not possible to record or transcode the media or make it interoperate with other RTC services.
* Despite not being in the media path, Twilio manages the signaling path, making it possible for Participants to discover each other and negotiate the communications in agreement with the application and SDK requirements. Hence, signaling connectivity to Twilio's cloud is still necessary.

The following picture illustrates the architecture of a P2P Room with three Participants.

![P2P Room topology with media exchange among three participants using different devices.](https://docs-resources.prod.twilio.com/a85a1580d74e6dd97f325d9d867bfe43f9e1854312c9fb44de09a7421d091ab8.gif)

As seen above, in a P2P Room, a Participant needs to send their audio and video streams once for each other Participant in the Room. As a result, upstream bandwidth (and typically battery consumption) scales as `n-1`, where `n` is the number of Participants. Because of this, P2P Rooms do not scale well with more Participants.

### Go Rooms

Go Rooms are for one-on-one video calls. Participant minutes and TURN server usage is free. Go Rooms use a peer-to-peer topology, but the maximum number of Participants in a Go Room is two. There can be a maximum of 500 concurrent Participants at a time per Account. For example, one Account could host a total of 250 Rooms with two Participants each.

### P2P Rooms

P2P Rooms can have up to 10 Participants. However, for best video quality, we recommend that P2P rooms have no more than three participants in a video call (or four participants with low-quality video). For audio-only calls, P2P rooms can have up to 10 participants.

## Small Group Rooms

Small Group Rooms is an older configuration of Group Rooms that limited the number of participants to a maximum of 4. In all other functional aspects it is identical to Group Rooms. Developers are recommended to use Group Rooms.

## Audio-only Group Rooms

The audio only flag was introduced to Group Rooms to support the live streaming of audio. Given the renewed focus on video use cases this feature is only available to existing customers. For developers who are interested in developing audio only use cases we recommend using the [Twilio Voice SDKs](/docs/voice/sdks)
