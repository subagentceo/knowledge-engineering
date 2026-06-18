# Networking Considerations for Video Applications

In real-time video applications, clients must be able to exchange audio, video, and other media with one another with the lowest possible latency. When clients connect to a video Room, the Twilio Video SDK tries to establish a direct media connection between the client and Twilio's media server (also called a Selective Forwarding Unit, or SFU).

![Clients connect directly to Twilio SFU for media exchange in a video room.](https://docs-resources.prod.twilio.com/d8c4abc5341fa48d286a8e5ad7a3df133fe5cd0cfc8445fae7ab992be18ae548.png)

Firewalls and [Network Address Translation (NAT)](/docs/glossary/what-is-network-address-translation-nat) can impact the quality and performance of your application if they block direct communication of media.

If a direct connection can't be established between a client and Twilio's media servers, Twilio uses a [TURN relay](/docs/stun-turn/faq#faq-what-is-nat) to exchange media. Using TURN adds additional latency to the application, as it adds an extra hop between the client sending the media and the client receiving the media.

![TURN server relays media between Client 1 and Twilio SFU when direct connection is unavailable.](https://docs-resources.prod.twilio.com/dc7e761a497b49a1cecfd54857ded47cfc809b94f61da1d4b6928e27dff43165.png)

Common reasons why a direct connection could fail are firewalls that restrict UDP traffic on Twilio's specified ports or non-BEHAVE-compliant NATs, which can't be traversed using standardized methods.

> \[!NOTE]
>
> A BEHAVE-compliant NAT is one that meets the requirements defined in [RFC4787](https://datatracker.ietf.org/doc/html/rfc4787) and [RFC5382](https://datatracker.ietf.org/doc/html/rfc5382). These RFCs standardize the ways that NAT traversal can happen, so a non BEHAVE-compliant NAT is one that can't be traversed using the formally defined methods. This blocks direct media exchange.

## Protocols and ports used to exchange media

The following protocols and ports are listed in order of preference. Twilio Video uses a fallback hierarchy: it always attempts the lowest-latency connection first and falls back to higher-latency options only when the preferred method is blocked.

> \[!NOTE]
>
> To configure your firewall with IP address ranges, proxy bypass guidance, and troubleshooting, see the [Video Firewall and Network Configuration](/docs/video/ip-addresses) guide.

| Priority       | Protocol                   | Port Range    | Latency impact                            |
| -------------- | -------------------------- | ------------- | ----------------------------------------- |
| 1 (Optimal)    | STUN and UDP/TLS/RTP/SAVPF | 10000 - 60000 | Lowest latency — direct media connection  |
| 2 (Acceptable) | STUN, TURN-UDP             | 3478          | Adds \< 50ms — TURN relay                 |
| 3 (Degraded)   | TURN-TLS                   | 443           | Adds > 50ms — TCP retransmission overhead |

When Participants connect to a Room, Twilio's media server dynamically assigns ports for UDP communication. If direct connectivity checks fail on the assigned ports, then TURN-UDP on port 3478 and TURN-TLS on port 443 are used as fallbacks.

The scenarios below describe situations where a client, Alice, connects to a Room and exchanges media with Twilio's media servers under different network environments.

### 1. UDP traffic allowed on ports 10000 - 60000 (Optimal)

In a non-restrictive network environment or a restricted environment where UDP ports 10000 - 60000 are allowlisted, Alice can establish a direct media connection with the Twilio media server using the specified UDP port range. This provides the lowest latency and best call quality.

![Network flow showing UDP port range 10000-60000 through NAT to SFU.](https://docs-resources.prod.twilio.com/160bdfd4031ddef7831f50703fe2e8315314006483fde4b3092b08ea55ed8e90.png)

### 2. UDP traffic blocked on ports 10000 - 60000 but allowed on port 3478 (Acceptable)

In an environment where only UDP port 3478 is allowed, Alice must relay media through a TURN server in order to connect with the Twilio SFU. This adds marginal latency (\< 50ms) because the TURN server is now relaying media between Alice and the Twilio media server, rather than Alice directly communicating with the media server.

![UDP flow from Alice to SFU via NAT and turn.twilio.com with port 3478 allowed.](https://docs-resources.prod.twilio.com/cc85f933792e0deb76ce62eaa03edc4ad1905c38cc1d7f618b21399938d53e02.png)

### 3. All traffic blocked except TCP port 443 (Degraded — last resort)

In an environment where only TCP/TLS port 443 is allowed, the client must relay through the TURN server in order to connect with the SFU. This adds higher latency (> 50ms) because the TURN server is now relaying media using TCP/TLS between the client and the media server. TCP/TLS adds delivery acknowledgments and retransmission, which can further delay transmission of real-time media. Users may experience degraded audio and video quality in this configuration.

![Network flow from Alice to SFU via TCP port 443 through NAT and Twilio TURN server.](https://docs-resources.prod.twilio.com/1f5e55efb5de84e07a8538404187cd651a3b228bc6d8821cb0d402191200cd89.png)
