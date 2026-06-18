# Firewall and Network Configuration

> \[!NOTE]
>
> This guide only covers communication from Twilio's Programmable Video Client SDKs to Twilio's cloud. [Read this for information about securing requests from your server to the Twilio REST API](/docs/usage/security).

Twilio's Programmable Video SDKs must communicate with Twilio's cloud in order to function. This guide provides the IP address ranges, ports, protocols, and network configuration guidance needed to enable Twilio Video traffic through corporate firewalls and proxies. At this time, the Twilio Media Servers only support IPv4 addressing.

If your network uses TLS-inspecting proxies, deep packet inspection, or application-aware firewalls, see [Proxy, inspection, and firewall interference](#proxy-and-firewall-interference) for required configuration. If you're experiencing connectivity issues, see [Troubleshooting connectivity](#troubleshooting).

For deeper technical background on how Twilio Video establishes connections, including direct media vs. TURN relay and NAT traversal, see [Networking Considerations](/docs/video/networking-considerations).

## Quick start: minimum firewall configuration

If you need to get Twilio Video working quickly, allow the following **outbound** traffic from your network. All connections are initiated outbound by the client — return traffic is handled automatically by stateful firewall connection tracking. No inbound firewall rules are required.

| Traffic type       | Protocol               | Destination                                  | Ports           |
| ------------------ | ---------------------- | -------------------------------------------- | --------------- |
| Signaling          | WSS (WebSocket Secure) | global.vss.twilio.com, sdkgw.us1.twilio.com  | 443             |
| STUN               | UDP                    | global.stun.twilio.com                       | 3478            |
| Media direct       | UDP                    | See [media server IP ranges](#media-servers) | 10,000 - 60,000 |
| TURN relay         | UDP                    | global.turn.twilio.com                       | 3478            |
| Media TLS fallback | TURN-TLS               | global.turn.twilio.com                       | 443             |

> \[!NOTE]
>
> Opening UDP ports 10,000 - 60,000 provides the best video call quality with direct media connections. If your security policy doesn't allow this range, opening UDP port 3478 alone enables functional connectivity via TURN relay with slightly higher latency. See [Connection priority and fallback](#connection-priority-and-fallback) for details.

## Connection priority and fallback

Twilio Video attempts to establish media connections in the following order. Each fallback adds latency that can affect call quality.

| Priority       | Protocol | Ports           | Connection type               | Latency impact                                              |
| -------------- | -------- | --------------- | ----------------------------- | ----------------------------------------------------------- |
| 1 (Optimal)    | UDP      | 10,000 - 60,000 | Direct to Twilio media server | Lowest latency                                              |
| 2 (Acceptable) | UDP      | 3478            | TURN relay                    | Adds \< 50ms                                                |
| 3 (Degraded)   | TCP/TLS  | 443             | TURN-TLS relay                | Adds > 50ms; TCP retransmission can cause additional delays |

If your network only allows TCP port 443, Twilio Video still functions, but users may experience degraded audio and video quality due to the overhead of TCP/TLS delivery acknowledgments and packet retransmission.

## Signaling and domain allowlist \[#domain-list]

Twilio Video uses persistent WebSocket Secure (WSS) connections on port 443 for signaling. Your firewall must allow outbound WSS connections to the following hostnames. These hostnames are also the values to use for FQDN-based firewall rules, SNI-based proxy bypass configurations, and SSL inspection exclusion lists.

**Wildcard pattern:** `*.vss.twilio.com`

| Region ID | Location                     | Host Name             | Port and Protocol |
| --------- | ---------------------------- | --------------------- | ----------------- |
| gll       | Global Low Latency (default) | global.vss.twilio.com | 443 WSS           |
| au1       | Australia                    | au1.vss.twilio.com    | 443 WSS           |
| br1       | Brazil                       | br1.vss.twilio.com    | 443 WSS           |
| de1       | Germany                      | de1.vss.twilio.com    | 443 WSS           |
| ie1       | Ireland                      | ie1.vss.twilio.com    | 443 WSS           |
| in1       | India                        | in1.vss.twilio.com    | 443 WSS           |
| jp1       | Japan                        | jp1.vss.twilio.com    | 443 WSS           |
| sg1       | Singapore                    | sg1.vss.twilio.com    | 443 WSS           |
| us1       | US East Coast (Virginia)     | us1.vss.twilio.com    | 443 WSS           |
| us2       | US West Coast (Oregon)       | us2.vss.twilio.com    | 443 WSS           |

**Additional required domains:**

* `sdkgw.us1.twilio.com` (WSS/443)
* `ecs.us1.twilio.com` (HTTPS/443) — only required for pre-2021 SDKs: Android \< 5.9.0, iOS \< 3.5.0, JavaScript SDK \< 2.5.0

**STUN/TURN domains:**

* `*.stun.twilio.com` (UDP/3478)
* `*.turn.twilio.com` (UDP/3478 and TLS/443)

> \[!NOTE]
>
> Media server connections use IP addresses rather than hostnames. FQDN-based filtering applies to signaling and STUN/TURN connections only. For media servers, use the IP-based allowlists in the [media servers](#media-servers) section below.

## Media servers

* All SDK Versions

Ports used: 10,000 - 60,000 UDP/SRTP/SRTCP and TLS/443 and UDP/3478.

| Region ID | Location                 | Server IPv4 Address Range                                                                                                                                                                        |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| au1       | Australia                | 13.210.2.128/27 (13.210.2.128 - 13.210.2.159) 54.252.254.64/26 (54.252.254.64 - 54.252.254.127) 3.25.42.128/25 (3.25.42.128 - 3.25.42.255)                                                       |
| br1       | Brazil                   | 18.231.105.32/27 (18.231.105.32 - 18.231.105.63) 177.71.206.192/26 (177.71.206.192 - 177.71.206.255) 18.230.125.0/25 (18.230.125.0 - 18.230.125.127)                                             |
| de1       | Germany                  | 52.59.186.0/27 (52.59.186.0 - 52.59.186.31) 18.195.48.224/27 (18.195.48.224 - 18.195.48.255) 18.156.18.128/25 (18.156.18.128 - 18.156.18.255)                                                    |
| ie1       | Ireland                  | 52.215.253.0/26 (52.215.253.0 - 52.215.253.63) 54.171.127.192/26 (54.171.127.192 - 54.171.127.255) 52.215.127.0/24 (52.215.127.0 - 52.215.127.255) 3.249.63.128/25 (3.249.63.128 - 3.249.63.255) |
| in1       | India                    | 52.66.193.96/27 (52.66.193.96 - 52.66.193.127) 52.66.194.0/26 (52.66.194.0 - 52.66.194.63) 3.7.35.128/25 (3.7.35.128 - 3.7.35.255)                                                               |
| jp1       | Japan                    | 13.115.244.0/27 (13.115.244.0 - 13.115.244.31) 54.65.63.192/26 (54.65.63.192 - 54.65.63.255) 18.180.220.128/25 (18.180.220.128 - 18.180.220.255)                                                 |
| sg1       | Singapore                | 13.229.255.0/27 (13.229.255.0 - 13.229.255.31) 54.169.127.128/26 (54.169.127.128 - 54.169.127.191) 18.141.157.128/25 (18.141.157.128 - 18.141.157.255)                                           |
| us1       | US East Coast (Virginia) | 34.203.254.0/24 (34.203.254.0 - 34.203.254.255) 54.172.60.0/23 (54.172.60.0 - 54.172.61.255) 34.203.250.0/23 (34.203.250.0 - 34.203.251.255) 3.235.111.128/25 (3.235.111.128 - 3.235.111.255)    |
| us2       | US West Coast (Oregon)   | 34.216.110.128/27 (34.216.110.128 - 34.216.110.159) 54.244.51.0/24 (54.244.51.0 - 54.244.51.255) 44.234.69.0/25 (44.234.69.0 - 44.234.69.127)                                                    |

## Proxy, inspection, and firewall interference \[#proxy-and-firewall-interference]

Corporate firewalls and proxies can interfere with Twilio Video traffic in ways that go beyond simple port blocking. If your network uses any of the following, additional configuration is required.

### TLS/SSL inspection proxies

TLS-inspecting proxies (also called SSL decryption or man-in-the-middle proxies) intercept and re-encrypt TLS traffic. This **will break TURN-TLS connections** on port 443 and can prevent Twilio Video from establishing media connections entirely.

**Required action:** Add all [Twilio Video domains](#domain-list) to your proxy's SSL inspection exclusion list, including `*.vss.twilio.com`, `sdkgw.us1.twilio.com`, `*.turn.twilio.com`, and `*.stun.twilio.com`. If your proxy supports SNI-based bypass rules, configure exclusions for these same patterns.

### Deep packet inspection (DPI)

DPI and protocol analyzers add processing latency that is unacceptable for real-time media. Even when they don't block traffic, they can introduce jitter and packet delays that degrade audio and video quality.

**Required action:** Exclude the Twilio Video IP address ranges and port ranges from DPI inspection policies.

### SIP Application Layer Gateway (ALG)

SIP ALG can be turned on by default on corporate firewalls. It rewrites VoIP-related packet payloads in an attempt to assist NAT traversal. However, SIP ALG can silently corrupt STUN and TURN packets, causing connection failures or one-way audio/video.

**Required action:** Turn off SIP ALG on firewalls and routers in the media path for Twilio Video traffic.

### Next-generation firewall (NGFW) application rules

Application-aware firewalls classify traffic by protocol, not just port number. STUN, TURN, and DTLS traffic may be categorized as "unknown" or "suspicious" and silently dropped, even when the destination port is allowed.

**Required action:** Create explicit application-level allow rules for STUN, TURN, and DTLS protocols on the ports listed in the [connection priority table](#connection-priority-and-fallback).

### WebSocket idle timeouts

Twilio Video uses persistent WebSocket connections for signaling throughout the duration of a video call. Proxies and firewalls with aggressive idle timeout settings (common defaults: 60 - 120 seconds) can terminate these connections mid-call, causing participants to disconnect.

**Recommended action:** Set the WebSocket (WSS) idle timeout on your proxy or firewall to at least 300 seconds (5 minutes) for connections to Twilio Video signaling domains. Video calls can have extended periods of low signaling activity, and shorter timeouts risk dropping the connection.

### Forward proxy configuration

If your network requires all traffic to pass through a forward proxy:

* The proxy must support WebSocket (WSS) pass-through without inspection for signaling traffic
* UDP traffic to Twilio media server IP ranges should bypass the proxy entirely, as most HTTP proxies cannot handle UDP. SOCKS5 proxies can proxy UDP traffic if direct bypass is not possible
* If the proxy doesn't support UDP pass-through, Twilio Video falls back to TURN-TLS on TCP port 443, which adds latency

## VPN split-tunneling \[#vpn-split-tunneling]

If your users connect via VPN, routing real-time video traffic through the VPN tunnel adds latency and can significantly degrade call quality. Configure split tunneling to route Twilio Video traffic directly from the user's local network rather than through the VPN tunnel.

**Traffic to route directly (bypass VPN):**

* UDP ports 10,000 - 60,000, 3478 to the [media server IP ranges](#media-servers)
* TCP/WSS port 443 to Twilio Video [signaling domains](#domain-list)

## Bandwidth requirements

Bandwidth requirements vary based on video resolution, number of participants, and whether screen sharing is active. Downstream bandwidth scales with the number of remote participants sending video.

To review detailed per-resolution bitrate recommendations, see [Minimum bandwidth recommendations](/docs/video/tutorials/developing-high-quality-video-applications#minimum-bandwidth-recommendations).

## Troubleshooting connectivity \[#troubleshooting]

If participants are experiencing connectivity issues with Twilio Video, use the following to diagnose the cause.

| Symptom                                             | Likely cause                                                        | Resolution                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Can't connect to Room at all.                       | Signaling blocked: WSS port 443 to Twilio domains isn't allowed.    | Allow outbound WSS/443 to [signaling domains][domain-list].                          |
| Connection established but no audio or video.       | UDP ports blocked and TURN fallback also blocked.                   | Allow outbound UDP 3478 or TCP 443 to [media server IP ranges][media-servers].       |
| One-way audio or video.                             | SIP ALG corrupting STUN/TURN packets, or asymmetric firewall rules. | Turn off SIP ALG; verify firewall allows return UDP traffic on stateful connections. |
| Audio or video quality is poor (choppy, pixelated). | TLS inspection proxy or DPI adding latency; VPN tunnel overhead.    | Exclude Twilio domains/IPs from inspection; configure [VPN split tunneling][vpn].    |
| Participants disconnect mid-call.                   | WebSocket idle timeout terminating signaling connection.            | Increase WSS idle timeout to at least 300 seconds.                                   |
| Connection works but with noticeable delay.         | Falling back to TURN-TLS (TCP 443) instead of direct UDP.           | Allow outbound UDP 10,000 - 60,000 or UDP 3478 to media server IP ranges.            |

[domain-list]: #domain-list

[media-servers]: #media-servers

[vpn]: #vpn-split-tunneling

To verify network connectivity, run the [Twilio Video Diagnostics App](https://video-diagnostics.twilio.com/) from the affected network. It tests signaling, media, and TURN connectivity and reports which paths are available. To access developer-level diagnostic tools, see [Pre-call Testing and Diagnostics](/docs/video/troubleshooting#tools-for-pre-call-testing-and-diagnostics).
