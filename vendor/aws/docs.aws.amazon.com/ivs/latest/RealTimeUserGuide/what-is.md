

# What is Amazon IVS Real-Time Streaming?
<a name="what-is"></a>

Amazon Interactive Video Service (IVS) Real-Time Streaming gives you everything you need to add real-time audio and video to your applications. 

Strengths:
+ Real-time latency — Build applications for latency-sensitive use cases, helping your viewers stay connected and engaged with IVS real-time streaming. Deliver live streams with a latency that can be under 300 milliseconds from host to viewer.
+ High concurrency — Unlock the potential of large-scale interactions with IVS real-time streaming. Accommodate audiences beyond 25,000 viewers and enable up to 12 hosts to take the virtual stage. (For default limits and instructions on requesting an increase, see *Service Quotas* for [real-time streaming](https://docs.aws.amazon.com//ivs/latest/RealTimeUserGuide/service-quotas.html) and [low-latency streaming](https://docs.aws.amazon.com//ivs/latest/LowLatencyUserGuide/service-quotas.html).)
+ Mobile optimized — IVS real-time streaming is optimized for mobile use cases, catering to a diverse range of devices and network capabilities. By integrating the Amazon IVS broadcast SDKs for Android and iOS, your users can engage as hosts or viewers, enjoying high-quality live streams on their mobile devices.

Use cases:
+ Guest spots — Create applications that allow hosts to promote guests "on stage," turning viewers into hosts for real-time interactions.
+ Versus (VS) mode — Produce experiences with side-by-side competitions and let viewers watch hosts compete in real-time.
+ Audio rooms — Invite listeners to join the conversation as guests and foster deeper engagement in your audio rooms.
+ Live video auctions — Turn auctions into interactive video events and maintain their excitement and integrity with real-time latency.

In addition to the product documentation here, see [https://ivs.rocks/](https://ivs.rocks/), a dedicated site to browse published content (demos, code samples, blog posts), estimate cost, and experience Amazon IVS through live demos.

## Global Solution, Regional Control
<a name="what-is-aws"></a>

### Streaming and Viewing are Global
<a name="global-data-plane"></a>

You can use Amazon IVS to stream to viewers worldwide:
+  When you stream, Amazon IVS automatically ingests video at a location near you. 
+ Viewers can watch your live streams globally.

Another way of saying this is that the "data plane" is global. The data plane refers to streaming/ingesting and viewing.

### Control is Regional
<a name="regional-control-plane"></a>

While the Amazon IVS data plane is global, the "control plane" is regional. The control plane refers to the Amazon IVS console, API, and resources (stages).

Another way of saying this is that Amazon IVS is a "regional AWS service." That is, Amazon IVS resources in each region are independent of similar resources in other regions. For example, a stage that you create in one region is independent of stages you create in other regions. 

When you use resources (e.g., create a stage), you must specify the region in which it will be created. Subsequently, when you manage resources, you must do so from the same region where they were created. 


| If you use the ... | You specify the region by ... | 
| --- | --- | 
| Amazon IVS console  | Using the Select a Region drop-down in the top right of the navigation bar. | 
| Amazon IVS API | Using the appropriate service endpoint. See the [Amazon IVS Real-Time Streaming API Reference](https://docs.aws.amazon.com//ivs/latest/RealTimeAPIReference/Welcome.html).<br />(If you access the API through an SDK, set up the SDK’s `region` parameter. See [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).) | 
| AWS CLI | Either:[See the AWS documentation website for more details](http://docs.aws.amazon.com/ivs/latest/RealTimeUserGuide/what-is.html) | 

*Remember, regardless of the region in which a stage was created, you can stream to Amazon IVS from anywhere, and viewers can watch from anywhere.* 