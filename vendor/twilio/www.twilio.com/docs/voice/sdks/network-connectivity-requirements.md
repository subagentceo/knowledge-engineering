# Voice SDKs Network Connectivity Requirements

The following article outlines Twilio's Voice SDKs' requirements for network connectivity. It lists the Twilio servers' ports and IP addresses that the SDKs must be able to reach, and the bandwidth required for quality audio. \
Twilio's Voice SDKs assume a well-performing and accessible network; problems with firewall configurations, quality of service implementations, bandwidth allocations, and ISP performance are outside the scope of things Twilio can assist with and we will need to defer to your local IT, ISP, and hardware vendors for assistance.

## Connectivity checklist

1. Choose the edge you will connect to and allow [Media servers](#voice-media-server-connectivity-requirements) and [Signalling servers](#signalling-connectivity-requirements).
2. If you are using Global Low Latency edge, check the [requirements](#global-low-latency-requirements).
3. If you have access to [Private Interconnect](https://www.twilio.com/en-us/interconnect) edges, you will need to allow [these destinations](#private-interconnect-edge-locations).
4. Ensure you meet the [bandwidth requirements](#network-bandwidth-requirements).
5. Check the [recommendations and best practices](#recommendations-and-best-practices).
6. Test your connectivity using this [Network Test Tool](https://networktest.twilio.com/).

## Connectivity overview

Applications using Twilio's Voice SDKs require connectivity to Twilio's infrastructure to be able to place and receive calls. As shown in the diagram below, two types of connections are required: Signalling and Media.

The **signalling** connection is a secure TLS connection that is used for sending and receiving control information to set up calls.

The **media** connection is a secure SRTP (Secure Real-time Transport Protocol) connection that is used to send and receive audio.

![Diagram showing Twilio Voice SDK connections from private networks to edge locations via internet and NAT/firewall.](https://docs-resources.prod.twilio.com/ae3bf0b848253543f2eb210594e39c9af404710259893f82f1e55a02c039d17d.png)

Twilio's Programmable Voice infrastructure is deployed in edges all over the world. By default, the SDKs use Global Low Latency (GLL) to determine the optimal Twilio edge to connect to.

![Twilio Voice SDK Edge Locations.](https://docs-resources.prod.twilio.com/1be3b2c432d1f1500144901d97281c4ee9e7c98deff28a0a60e39233ff69dd7f.png)

## Firewall configuration

In a typical organization network setup, a firewall is used to protect the private network hosts from the Internet. Firewalls are configured with rules to block or allow traffic to and from Internet destinations based on direction, protocol, and IP address.

![Twilio Voice SDK Private Edge Locations.](https://docs-resources.prod.twilio.com/ef39dc3890d8f45b29e7d7669db573c970ac6765e5ce6fa7bb0fbf93a1487ec8.png)

To access Twilio, your firewall should allow **outgoing** TCP and UDP traffic from your applications to Twilio's infrastructure and allow return traffic in response. Twilio will never initiate a connection to the SDK applications. Therefore, the firewall should not allow externally initiated connections back into the network.

In the Connectivity Requirements sections that follow, the required destination IP addresses and ports are listed. Your firewall should be configured to allow connectivity to the **Media Servers** and the **Signalling Gateways** corresponding to the SDK you are using.

## Voice Media Server connectivity requirements

**Public Connections - Global Media IP Range**

The Public Connections Destination IP Ranges and Port Ranges are now identical across all locations:

| **Secure Media (ICE/STUN/SRTP) Edge Locations**                                                                                                                                                                                                                                       | **Protocol** | **Source IP** | **Source Port †** | **Destination IP Ranges** | **Destination Port Range** |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | ----------------- | ------------------------- | -------------------------- |
| sydney (**au1** ) <br /><br /> sao-paulo (**br1** ) <br /><br /> dublin (**ie1** ) <br /><br /> frankfurt (**de1** ) <br /><br /> tokyo (**jp1** ) <br /><br /> singapore (**sg1** ) <br /><br /> ashburn (**us1** ) <br /><br /> umatilla (**us2** ) <br /><br /> roaming (**gll** ) | UDP          | ANY           | ANY               | 168.86.128.0/18           | 10,000 - 60,000            |

† The SDK will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

## Signalling connectivity requirements

Signalling requirements differ between the Voice JavaScript SDK and the Mobile SDKs. This section provides the connectivity requirements for each of these SDKs.

|                                                              |              | **Your Intranet** |                   | **Allowed destinations**                                                                                                                                                                                                                                    |                      |
| ------------------------------------------------------------ | ------------ | ----------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
|                                                              | **Protocol** | **Source IP**     | **Source Port †** | **Destination\***                                                                                                                                                                                                                                           | **Destination Port** |
| **Voice JavaScript SDK**                                     |              |                   |                   |                                                                                                                                                                                                                                                             |                      |
| Secure TLS connection to Twilio signalling Gateway           | TCP          | ANY               | ANY               | `chunderw-gll.twilio.com*`  `chunderw-vpc-gll.twilio.com*` `voice-js.roaming.twilio.com`                                                                                                                                                                    | 443                  |
| Secure TLS Connection to Twilio Regional Signalling gateways | TCP          | ANY               | ANY               | `chunderw-vpc-gll-{region}.twilio.com*` \{Where region is one of: au1, br1, de1, ie1, jp1, sg1, us1, us2} `voice-js.{edge-location}.twilio.com` \{Where edge-location is one of: ashburn, umatilla, sao-paulo, frankfurt, dublin, sydney, singapore, tokyo} | 443                  |
| Secure TLS Insights logging gateway                          | TCP          | ANY               | ANY               | `eventgw.twilio.com`                                                                                                                                                                                                                                        | 443                  |
| **Mobile Voice SDKs**                                        |              |                   |                   |                                                                                                                                                                                                                                                             |                      |
| Secure TLS connection to Twilio GLL Signalling Gateway       | TCP          | ANY               | ANY               | `chunderm.gll.twilio.com`                                                                                                                                                                                                                                   | 443 (10194 §)        |
| Secure TLS Connection to Twilio Regional Signalling Gateways | TCP          | ANY               | ANY               | `chunderm.{region}.gll.twilio.com`  \{Where region is one of: au1, br1, de1, ie1, jp1, sg1, us1, us2}                                                                                                                                                       | 443 (10194 §)        |
| Secure TLS to Insights Gateway                               | TCP          | ANY               | ANY               | `eventgw.twilio.com`                                                                                                                                                                                                                                        | 443                  |
| Secure TLS to Registration Server                            | TCP          | ANY               | ANY               | `ers.twilio.com`                                                                                                                                                                                                                                            | 443                  |

† The client will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

§ Mobile SDKs versions prior to 3.x require port 10194 instead of 443. If still using pre 3.x version, we recommend you upgrade to the latest version

\* Destination names starting with "chunderw" is only used by Voice JavaScript SDK versions older than 2.3.0.

## Private Interconnect edge locations

If you have access to [private Interconnect connections](https://www.twilio.com/en-us/interconnect), you will also be able to use one of the following values:

|                               |              | **Your Intranet** |                   | **Allowed destinations**          |                      |
| ----------------------------- | ------------ | ----------------- | ----------------- | --------------------------------- | -------------------- |
| **Edge Location**             | **Protocol** | **Source IP**     | **Source Port †** | **Destination**                   | **Destination Port** |
| **ashburn-ix** (us1-ix)       | TCP          | ANY               | ANY               | 208.78.112.0/25                   | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **san-jose-ix** (us2-ix)      | TCP          | ANY               | ANY               | 67.213.136.0/25                   | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **london-ix** (ie1-ix)        | TCP          | ANY               | ANY               | 185.187.132.0/25 185.187.133.0/24 | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **frankfurt-ix** (de1-ix)     | TCP          | ANY               | ANY               | 185.194.136.0/25                  | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **singapore-ix** (sg1-ix)\*\* | TCP          | ANY               | ANY               | 103.75.151.0/25                   | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **tokyo-ix** (jp1-ix)\*\*     | TCP          | ANY               | ANY               | 103.144.142.0/25                  | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **sydney-ix** (au1-ix)\*\*    | TCP          | ANY               | ANY               | 103.146.214.0/25                  | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |
| **sao-paulo-ix** (br1-ix)\*\* | TCP          | ANY               | ANY               | 159.183.255.0/25                  | 443                  |
|                               | UDP          | ANY               | ANY               | 168.86.128.0/18                   | 10000-60000          |

† The client will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

\*\* Requires Voice JavaScript SDK version 2.0 or later.

## Network bandwidth requirements

The following table lists the network requirements to deliver reasonable audio quality.

| Bandwidth (Uplink/Downlink) | Opus\*: 40kbps / 40kbps PCMU: 100kbps / 100kbps |
| --------------------------- | ----------------------------------------------- |
| Latency (RTT)               | \< 200ms                                        |
| Jitter                      | \< 30ms                                         |
| Packet Loss                 | \< 3%                                           |

\* Opus codec is available from Voice JavaScript SDK version 1.7 and Mobile Voice SDKs 3.x

The Opus bandwidth requirements listed above are the default settings for Opus. Opus codec supports bandwidth control by allowing you to specify how much bandwidth it should use. See section [recommendations and best practices](#recommendations-and-best-practices) below for how to configure Opus bandwidth requirements.

## Global Low Latency requirements

GLL is an [AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-latency) feature that resolves a hostname to the edge location with the least latency. This removes the need for the application developer to determine where the end user is connecting from or manually choosing which edge to connect to.

However, in order for GLL to give accurate results, the intermediate DNS **must**:

* Support [RFC 7871 - Client Subnet in DNS Queries](https://tools.ietf.org/html/rfc7871).
* Reside in the same edge as the SDK endpoint. For example, a host in the US configured with a VPN to Europe or configured with a DNS server that resides in Europe will result in connecting that host to Twilio edge in Europe

> \[!WARNING]
>
> If the intermediate DNS does not support RFC 7871 and the upstream DNS IP address is an Anycast address, e.g., 8.8.8.8, then there is no guarantee Route53 will accurately determine the best edge to connect to.

### How to determine if GLL will work

To determine if your DNS supports GLL, use the `dig` or `nslookup` utilities as follows:

```bash
dig edns-client-sub.net TXT
```

```bash
nslookup -type=txt edns-client-sub.net
```

A DNS server that supports this RFC will have `ecs` set to `True` and contains an `ecs_payload` object:

```bash
;; ANSWER SECTION:

edns-client-sub.net. 30 IN TXT "{'ecs_payload':{'family':'1','optcode':'0x08','cc':'US','ip':'34.225.44.0','mask':'24','scope':'0'},'ecs':'True','ts':'1588973397.05','recursive':{'cc':'US','srcip':'208.69.32.67','sport':'11807'}}"
```

A server that does not support this RFC will have `ecs` set to `False`:

```bash
;; ANSWER SECTION:

edns-client-sub.net. 0 IN TXT "{'ecs':'False','ts':'1588973475.23','recursive':{'cc':'US','srcip':'76.96.15.65','sport':'54989'}}"
```

## Recommendations and best practices

### Use a specific edge location

If you have a restrictive network and you specify GLL when connecting to Twilio, all media server IP addresses in all edge locations must be allowed. If you are not operating in all edges, we recommend you specify the edge that is closest to your deployment. With this approach, you will only need to allow the Media server addresses for the edge that you specify.

To select the edge, use the following snippet:

## JavaScript

```javascript
const device = new Twilio.Device(token, { edge: 'ashburn'});

//or

const device = new Twilio.Device(token);
device.updateOptions({ edge: 'ashburn' });

// Prior to v2.0, device.setup(token, { edge: 'ashburn' })
// was used. As of v2.0, device.setup() is deprecated.

// Prior to v1.11 the region parameter was used.
// region is now deprecated, use edge
Twilio.Device.setup(token, { region: 'us1'});
```

## Android

```java
// Set the edge
Voice.setEdge("ashburn");

// Then, you can connect or handle the incoming call notification

// Prior to Android SDK 5.3, region was used
// region is deprecated use edge instead
Voice.setRegion("us1");
```

## iOS

```swift
// Set the edge
TwilioVoice.edge = "ashburn"

// Then, you can connect or handle the incoming call notification

// Prior to iOS 5.4, `region` was used
TwilioVoice.region = "us1"

```

See the [iOS API documentation](https://twilio.github.io/twilio-voice-ios/docs/latest/) for more information.

### Use Twilio's Network Traversal Service (NTS) for TURN

> \[!NOTE]
>
> Using TURN incurs extra charges as per NTS pricing. Refer to [Twilio Programmable Voice Pricing](/en-us/voice/pricing/us) for more information.

#### Restrictive Firewalls

For best audio quality, your firewall should allow your local hosts to initiate the connection to Twilio and send UDP (DTLS/SRTP) traffic to the Twilio Media servers.

However, If your network policy prohibits or restricts UDP connectivity to the Twilio media servers, you can utilize Twilio's [Network Traversal Service](/docs/stun-turn) (NTS) to establish media connectivity via TURN over TCP or TLS. Please refer to the NTS [documentation](/docs/stun-turn) for a list of TURN servers and ports that will also need to be allowed.

#### Reducing Latency

When the open‑internet path to the selected Twilio media edge is long, congested, or unpredictable, you can improve performance by utilizing TURN with Twilio NTS. Configure your client to connect to a [TURN server](https://www.twilio.com/docs/stun-turn/regions) that is geographically close to your users. The TURN relay forwards the media to Twilio over its backbone, which can reduce end-to-end latency, jitter, and packet loss.

#### Providing a TURN token to the Voice client

To enable TURN via NTS, have your server request short‑lived TURN credentials (the `ice_servers` array) from Twilio and send them to the browser along with the Twilio Voice access token. The client then initializes the Voice Device with those `iceServers` so it can use TURN when needed. These credentials are ephemeral, so fetch fresh ones whenever you create or reinitialize a Device.

The server then requests short‑lived TURN credentials from NTS and return `ice_servers` to the client:

```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Tokens.json \
-u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

The response includes `ice_servers` (TURN/STUN URIs, username, credential). Return `ice_servers` to your app along with the Twilio Voice access token.

Client—initialize the Voice Device with TURN servers:

```javascript
import { Device } from '@twilio/voice-sdk';

const token = await fetch('/voice-token').then(r => r.text());
const iceServers = await fetch('/turn-ice-servers').then(r => r.json());

const device = new Device(token, options);

// If making outgoing calls
const call = await device.connect({
  rtcConfiguration: { iceServers }
});

// For incoming calls
device.on('incoming', call => {
  call.accept({ rtcConfiguration: { iceServers } });
});
```

### Use the Opus codec to control bandwidth requirements

The Opus codec has many advantages over PCMU and should be used by your applications. Opus is the default codec for Mobile SDKs.

To use Opus in your web application, use the following snippet when either instantiating the `Twilio.Device` or updating the `Twilio.Device`'s options with .`updateOptions(options)`:

```javascript
const device = new Twilio.Device(token, { codecPreferences: ['opus', 'pcmu']});
// or
const device = new Twilio.Device(token);
device.updateOptions({ codecPreferences: ['opus', 'pcmu']});
```

To set a custom bandwidth (16kbps), use the following snippet:

```javascript
const device = new Twilio.Device(token, { codecPreferences: ['opus', 'pcmu'], maxAverageBitrate: 16000} );
// or
const device = new Twilio.Device(token);
device.updateOptions({ codecPreferences: ['opus', 'pcmu'], maxAverageBitrate: 16000});
```

### Use Twilio's Private Interconnect for enhanced security and bandwidth control

Twilio offers several solutions for private and secure connectivity to Twilio. See [The Twilio Interconnect page](https://www.twilio.com/en-us/interconnect) for more details.

## Related topics

Getting started? See all of our [Getting started Guides](/docs/voice/sdks#quickstarts).

Check some more of our [Best Practices](/docs/voice/sdks/javascript/best-practices).

Read more about [Twilio Edge Locations](/docs/voice/sdks/mobile-edge-locations).

Check connectivity to Twilio using this [Network Test Tool](https://networktest.twilio.com/).
