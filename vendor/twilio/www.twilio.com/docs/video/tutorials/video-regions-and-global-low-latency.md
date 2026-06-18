# Video Regions and Global Low Latency

Programmable Video Developers can select the geolocation of the Twilio infrastructure that serves their Rooms. Two mechanisms are available:

* Explicit region selection
* Global Low Latency (GLL)

Understanding these mechanisms is important for creating high quality Real-Time Communication (RTC) applications.

## Geolocation and quality

On the internet, latency and packet loss depend on geolocation. When the connection between a sender and a receiver spans the globe, latency and jitter increase with the distance between the parties. Packet loss is also more likely, due to the number of routers in the connection path. This affects quality in several ways:

* Signaling messages have higher latency, increasing the time for Participant operations like connecting to a Room and sending and receiving the first media samples.
* After joining, publishing and subscribing to new Tracks takes longer.
* Media latency increases and media fidelity decreases.

To minimize these effects, the Twilio infrastructure that serves a Room should be as close as possible to the Room's Participants. This guide provides best practices and recommendations on how to choose regions for your applications.

## Twilio Regions

Programmable Video developers have the following options when working with regions:

| **Region ID** | **Location**                           |
| ------------- | -------------------------------------- |
| `gll`         | Global Low Latency (see section below) |
| `au1`         | Australia                              |
| `br1`         | Brazil                                 |
| `de1`         | Germany                                |
| `ie1`         | Ireland                                |
| `in1`         | India                                  |
| `jp1`         | Japan                                  |
| `sg1`         | Singapore                              |
| `us1`         | US East Coast (Virginia)               |
| `us2`         | US West Coast (Oregon)                 |

![Map showing Twilio Video server regions worldwide with red markers.](https://docs-resources.prod.twilio.com/167e796e47ef45c2585e013cbe64c74f8d8946af8a85603ace0325330d4aa1a1.png)

## Regions and GLL

Twilio Programmable Video regions are architected around two concepts: the Signaling Region and the Media Region.

The Signaling Region:

* Is the ingress/egress point for the Participant's signaling traffic and Twilio's cloud.
* Is a Participant-level property. Each Participant may have a different Signaling Region.
* The Participant's TLS encryption session terminates at the edge Server.

The Media Region:

* Is the location of the Server where media processing takes place.
* Is a Room-level property. All the Participants in a Room share the same Media Region.
* Each Participant's DTLS encryption session terminates at the server.

Unless there are legal or compliance reasons, developers should select the region having less latency with a Participant as the Signaling Region of that Participant.

For the Media Region, we recommend using the region minimizing the average latency to all the Room's Participants. Many times it's not possible to have prior knowledge of a Participant's location. In that case, a simple rule of thumb that typically works is to select the region closest to the first Participant.

Applying these recommendations may be complex and sometimes developers prefer Twilio to select the region on their behalf. This can be achieved using GLL (Global Low Latency).

## Selecting the Signaling Region

Our Video SDKs use `gll` as the default Signaling Region. In that case, Participants will connect to the region having minimum latency to their location. This can be overridden with Signaling Region selection, which is supported in the following SDK versions:

| **Twilio Video SDK** | **Required version** |
| -------------------- | -------------------- |
| Android              | v5.0.0-beta1+        |
| iOS                  | v3.0.0-beta1+        |
| JavaScript           | v2.0.0+              |

The Signaling Region can be specified using the `region` property at connect time. For example, the following snippets illustrate how to connect to `de1`:

### Android (v5.0.0-beta1+)

**Java**

```java
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .region("de1")
    .roomName("my-room")
    .build();

room = Video.connect(context, connectOptions, roomListener);

```

**Kotlin**

```kotlin
val connectOptions = new ConnectOptions.Builder(accessToken)
    .region("de1")
    .roomName("my-room")
    .build()

room = Video.connect(context, connectOptions, roomListener)

```

### iOS (v3.0.0-beta1+)

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    builder.region = "de1"
    builder.roomName = "my-room"
}
self.room = TwilioVideoSDK.connect(with: connectOptions, delegate: self)
```

### JavaScript (v2.0.0+)

```javascript
const { connect } = require('twilio-video');

const room = await connect(token, {
  name: 'my-room',
  region: 'de1'
});
```

## Selecting the Media Region

**Using the Console**

By default, your Twilio Account is configured with `us1` as the Media Region. You can modify the default media region in [Video/Rooms/Settings](https://www.twilio.com/console/video/configure).

**Using the Rooms API**

You can override the default region specified in the Console by using the [Rooms REST API](/docs/video/api/rooms-resource) and setting the `MediaRegion` `POST` parameter to the desired Region ID.

## Understanding GLL: an example

Current Twilio region selection is based on two principles:

* When the Signaling Region is `gll` then the region with minimum latency to the client is selected for signaling traffic.
* When the Media Region is `gll` then the Signaling Region of the first participant connecting to the Room is selected for media traffic. Note, that due to this, in ad-hoc Rooms Media Region can be specified at connect time from the first Participant SDK.

> \[!NOTE]
>
> * We use latency based routing, which is different from location based routing; sometimes the DNS answer may return a server, which is not geographically closest.
> * The returned server may also be affected, if a VPN is being used

Let's use an example to better illustrate how this works. Imagine a Room with the following participants:

* Alice connects first from New York (lowest latency region is `us1`)
* Then Markus connects from Berlin (lowest latency region is `de1`)

The following table shows the actual chosen regions as a function of the specified (at the Console or with the APIs) Signaling and Media Regions:

| **Specified Media Region** | **Specified Signaling Region (Alice)** | **Specified Signaling Region (Markus)** | **Chosen Media Region** | **Chosen Signaling Region (Alice)** | **Chosen Signaling Region (Markus)** |
| -------------------------- | -------------------------------------- | --------------------------------------- | ----------------------- | ----------------------------------- | ------------------------------------ |
| -                          | -                                      | -                                       | `us1`                   | `us1`                               | `de1`                                |
| `gll`                      | -                                      | -                                       | `us1`                   | `us1`                               | `de1`                                |
| `gll`                      | `gll`                                  | `gll`                                   | `us1`                   | `us1`                               | `de1`                                |
| `ie1`                      | -                                      | -                                       | `ie1`                   | `us1`                               | `de1`                                |
| `gll`                      | `ie1`                                  | -                                       | `ie1`                   | `ie1`                               | `de1`                                |
| `gll`                      | `ie1`                                  | `gll`                                   | `ie1`                   | `ie1`                               | `de1`                                |
| `ie1`                      | `au1`                                  | `br1`                                   | `ie1`                   | `au1`                               | `br1`                                |

## Security Considerations

Twilio's Programmable Video SDKs must communicate with Twilio's cloud. Hence, firewalls may need to be configured to allow Twilio's Signaling and Media Servers IPs:

* Developers using explicit regions should allowlist the IP ranges in their selected Media and Signaling regions.
* Developers using `gll` should allowlist the IP ranges in all regions.

The IP ranges and domain names assigned to every region can be found in our [IP Addresses Guide](/docs/video/ip-addresses).
