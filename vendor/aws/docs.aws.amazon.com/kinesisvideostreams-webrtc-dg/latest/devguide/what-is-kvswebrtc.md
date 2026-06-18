

# What is Amazon Kinesis Video Streams with WebRTC?
<a name="what-is-kvswebrtc"></a>

WebRTC is an open technology specification for enabling real-time communication (RTC) across browsers and mobile applications via simple APIs. It uses peering techniques for real-time data exchange between connected peers and provides low latency media streaming required for human-to-human interaction. The WebRTC specification includes a set of IETF protocols including [Interactive Connectivity Establishment](https://www.ietf.org/rfc/rfc5245.txt), [Traversal Using Relay around NAT (TURN)](https://tools.ietf.org/html/rfc5766), and [Session Traversal Utilities for NAT (STUN)](https://www.ietf.org/rfc/rfc5389.txt) for establishing peer-to-peer connectivity, in addition to protocol specifications for reliable and secure real-time media and data streaming. 

[Amazon Kinesis Video Streams](https://docs.aws.amazon.com//kinesisvideostreams/latest/dg/what-is-kinesis-video.html) provides a standards-compliant WebRTC implementation as a fully managed capability. You can use Amazon Kinesis Video Streams with WebRTC to securely live stream media or perform two-way audio or video interaction between any camera IoT device and WebRTC-compliant mobile or web players. As a fully managed capability, you don't have to build, operate, or scale any WebRTC-related cloud infrastructure, such as signaling or media relay servers to securely stream media across applications and devices.

Using Kinesis Video Streams with WebRTC, you can easily build applications for live peer-to-peer media streaming, or real-time audio or video interactivity between camera IoT devices, web browsers, and mobile devices for a variety of use cases. Such applications can help parents keep an eye on their baby’s room, enable homeowners to use a video doorbell to check who’s at the door, enable owners of camera-enabled robot vacuums to remotely control the robot by viewing the live camera stream on a mobile phone, and so on.

If you're a first-time user of Kinesis Video Streams with WebRTC, we recommend that you read the following sections:
+ [How it works](kvswebrtc-how-it-works.md)
+ [Amazon Kinesis Video Streams with WebRTC SDK in C for embedded devices](kvswebrtc-sdk-c.md)
+ [Amazon Kinesis Video Streams with WebRTC SDK in JavaScript for web applications](kvswebrtc-sdk-js.md)
+ [Amazon Kinesis Video Streams WebRTC SDK for Android](kvswebrtc-sdk-android.md)
+ [Amazon Kinesis Video Streams WebRTC SDK for iOS](kvswebrtc-sdk-ios.md)
+ [Control plane APIs](https://docs.aws.amazon.com//kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Streams.html)
+ [Data plane REST APIs](https://docs.aws.amazon.com//kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Signaling_Channels.html)
+ [Data plane Websocket APIs](https://docs.aws.amazon.com//kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis.html)