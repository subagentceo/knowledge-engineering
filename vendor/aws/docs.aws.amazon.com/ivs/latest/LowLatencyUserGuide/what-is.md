

# What is Amazon IVS Low-Latency Streaming?
<a name="what-is"></a>

Amazon Interactive Video Service (IVS) is a managed, live-video streaming service that allows you to:
+ Create channels and start streaming in minutes.
+ Build engaging, interactive experiences alongside low-latency live video.
+ Distribute video at scale to a range of devices and platforms.
+ Easily integrate into websites and apps.

Amazon IVS lets you focus on building your own interactive application and audience experience. With Amazon IVS, you don't need to manage infrastructure or develop and configure components of your video workflows, to be secure, reliable, and cost effective.

Amazon IVS supports streaming via several ingest protocols:
+ RTMP (Real-Time Messaging Protocol), an industry standard for transmitting video over a network.
+ RTMPS, the secure version of RTMP, running over TLS.
+ SRT (Secure Reliable Transport), a relatively new, open-source protocol. SRT is designed to improve streaming over unreliable networks and protect against jitter, packet loss, and network bandwidth fluctuations.

In addition to the product documentation here, see [https://ivs.rocks/](https://ivs.rocks/), a dedicated site to browse published content (demos, code samples, blog posts), estimate cost, and experience Amazon IVS through live demos.

## Latency
<a name="what-is-latency"></a>

*Latency* is the delay from when a camera captures a live stream to when the stream appears on a viewer’s screen. Amazon IVS has functionality that can deliver video as follows:
+ Low latency — Amazon IVS channels can deliver video with latency under 5 seconds.
+ Real-time latency — IVS stages can deliver video with latency under 300ms. All participants in the stage experience this enhanced "real-time latency." (Note that if the stage is broadcast to an IVS channel, channel viewers get low latency.)

For a traditional Over-The-Top (OTT) stream, latency may be as high as 30 seconds.

Low latency is a critical component in building good interactive user experiences that enrich the audience experience. It allows the streamer, the brand, and the community to connect with live audiences in a direct and personal way.

Observed latency can vary between users due to:
+ The geographic locations of the streamer and viewers.
+ Network type and speed.
+ Individual components in the streaming chain.
+ Streaming protocols and output formats.

For more information, see [Reducing Latency](https://docs.aws.amazon.com//ivs/latest/LowLatencyUserGuide/streaming-config.html#streaming-config-reducing-latency) in *Amazon IVS Streaming Configuration*.

## Global Solution, Regional Control
<a name="what-is-aws"></a>

### Streaming and Viewing are Global
<a name="global-data-plane"></a>

You can use Amazon IVS to stream to viewers worldwide:
+  When you stream, Amazon IVS automatically ingests video at a location near you. 
+ Viewers can watch your live streams globally via the Amazon IVS content-delivery network.

Another way of saying this is that the "data plane" is global. The data plane refers to streaming/ingesting and viewing.

### Control is Regional
<a name="regional-control-plane"></a>

While the Amazon IVS data plane is global, the "control plane" is regional. The control plane refers to the Amazon IVS console, API, and resources (channels, stream keys, playback key pairs, and recording configurations).

Another way of saying this is that Amazon IVS is a "regional AWS service." That is, Amazon IVS resources in each region are independent of similar resources in other regions. For example, a channel that you create in one region is independent of channels you create in other regions. 

When you use resources (e.g., create a channel), you must specify the region in which it will be created. Subsequently, when you manage resources, you must do so from the same region where they were created. 


| If you use the ... | You specify the region by ... | 
| --- | --- | 
| Amazon IVS console  | Using the Select a Region drop-down in the top right of the navigation bar. | 
| Amazon IVS API | Using the appropriate service endpoint. See the [Amazon IVS Low-Latency Streaming API Reference](https://docs.aws.amazon.com//ivs/latest/LowLatencyAPIReference/Welcome.html).<br />(If you access the API through an SDK, set up the SDK’s `region` parameter. See [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).) | 
| AWS CLI | Either:[See the AWS documentation website for more details](http://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/what-is.html) | 

*Remember, regardless of the region in which a channel was created, you can stream to Amazon IVS from anywhere, and viewers can watch from anywhere.* 

### Your Channel’s Region
<a name="channel-region"></a>

Your channel’s region is part of the ARN (Amazon Resource Name) that is assigned when you create the channel. When you create a channel:
+ The Amazon IVS console shows the ARN in the **General configuration** area of the page. Subsequently, the console always shows your region (location) on the top right.
+ The Amazon IVS API returns the ARN in the channel object’s `arn` field.