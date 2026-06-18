---
title: Zero Trust Network Session Logs
description: Network session logs are generated for all traffic proxied through Cloudflare Gateway across all supported on-ramps, such as the Cloudflare One Client (WARP), proxy endpoints (PAC files), Browser Isolation, and Cloudflare Tunnel.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zero Trust Network Session Logs

Network session logs are generated for all traffic proxied through Cloudflare Gateway across all supported [on-ramps](https://developers.cloudflare.com/cloudflare-one/networks/connectivity-options/), such as the Cloudflare One Client (WARP), proxy endpoints (PAC files), Browser Isolation, and Cloudflare Tunnel.

The descriptions below detail the fields available for `zero_trust_network_sessions`.

## AccountID

Type: `string`

Cloudflare account ID.

## BytesReceived

Type: `int`

The number of bytes sent from the origin to the client during the network session.

## BytesSent

Type: `int`

The number of bytes sent from the client to the origin during the network session.

## ClientTCPHandshakeDurationMs

Type: `int`

Duration of handshaking the TCP connection between the client and Cloudflare in milliseconds.

## ClientTLSCipher

Type: `string`

TLS cipher suite used in the connection between the client and Cloudflare.

## ClientTLSHandshakeDurationMs

Type: `int`

Duration of handshaking the TLS connection between the client and Cloudflare in milliseconds.

## ClientTLSVersion

Type: `string`

TLS protocol version used in the connection between the client and Cloudflare.

## ConnectionCloseReason

Type: `string`

The reason for closing the connection, only applicable for TCP.   
Possible values are _CLIENT\_CLOSED_ | _CLIENT\_IDLE\_TIMEOUT_ | _CLIENT\_TLS\_ERROR_ | _CLIENT\_ERROR_ | _ORIGIN\_CLOSED_ | _ORIGIN\_TLS\_ERROR_ | _ORIGIN\_ERROR_ | _ORIGIN\_UNREACHABLE_ | _ORIGIN\_UNROUTABLE_ | _PROXY\_CONN\_REFUSED_ | _UNKNOWN_ | _MISMATCHED\_IP\_VERSIONS_ | _TOO\_MANY\_ACTIVE\_SESSIONS\_FOR\_ACCOUNT_ | _TOO\_MANY\_ACTIVE\_SESSIONS\_FOR\_USER_ | _TOO\_MANY\_NEW\_SESSIONS\_FOR\_ACCOUNT_ | _TOO\_MANY\_NEW\_SESSIONS\_FOR\_USER_.

## ConnectionReuse

Type: `bool`

Whether the TCP connection was reused for multiple HTTP requests.

## DestinationTunnelID

Type: `string`

Identifier of the Cloudflare One connector to which the network session was routed to, if any, such as Cloudflare Tunnel or WARP device.

## DetectedProtocol

Type: `string`

Detected traffic protocol of the network session.

## DeviceID

Type: `string`

Identifier of the client device which initiated the network session, if applicable, (for example, WARP Device ID).

## DeviceName

Type: `string`

Name of the client device which initiated the network session, if applicable, (for example, WARP Device ID).

## EgressColoName

Type: `string`

The name of the Cloudflare data center from which traffic egressed to the origin.

## EgressIP

Type: `string`

Source IP used when egressing traffic from Cloudflare to the origin.

## EgressPort

Type: `int`

Source port used when egressing traffic from Cloudflare to the origin.

## EgressRuleID

Type: `string`

Identifier of the egress rule that was applied by the Secure Web Gateway, if any.

## EgressRuleName

Type: `string`

The name of the egress rule that was applied by the Secure Web Gateway, if any.

## Email

Type: `string`

Email address associated with the user identity which initiated the network session.

## IngressColoName

Type: `string`

The name of the Cloudflare data center to which traffic ingressed.

## InitialOriginIP

Type: `string`

The IP used to correlate existing FQDN matching policy between Gateway DNS and Gateway proxy.

## Offramp

Type: `string`

The type of destination to which the network session was routed.   
Possible values are _INTERNET_ | _MAGIC_ | _CFD\_TUNNEL_ | _WARP_.

## OriginIP

Type: `string`

The IP of the destination ("origin") for the network session.

## OriginPort

Type: `int`

The port of the destination origin for the network session.

## OriginTLSCertificateIssuer

Type: `string`

The issuer of the origin TLS certificate.

## OriginTLSCertificateValidationResult

Type: `string`

The result of validating the TLS certificate of the origin.   
Possible values are _VALID_ | _EXPIRED_ | _REVOKED_ | _HOSTNAME\_MISMATCH_ | _NONE_ | _UNKNOWN_.

## OriginTLSCipher

Type: `string`

TLS cipher suite used in the connection between Cloudflare and the origin.

## OriginTLSHandshakeDurationMs

Type: `int`

Duration of handshaking the TLS connection between Cloudflare and the origin in milliseconds.

## OriginTLSVersion

Type: `string`

TLS protocol version used in the connection between Cloudflare and the origin.

## Protocol

Type: `string`

Network protocol used for this network session.   
Possible values are _TCP_ | _UDP_ | _ICMP_ | _ICMPV6_.

## RegistrationID

Type: `string`

Identifier of the client registration which initiated the network session, if applicable (for example, WARP Registration ID).

## ResolvedFQDN

Type: `string`

The fully qualified domain name of the destination.

## RuleEvaluationDurationMs

Type: `int`

The duration taken by Secure Web Gateway applying applicable Network, HTTP, and Egress rules to the network session in milliseconds.

## SNI

Type: `string`

The server name indication (SNI) value from the TLS handshake, if applicable.

## SessionEndTime

Type: `int or string`

The network session end timestamp with nanosecond precision.

## SessionID

Type: `string`

The identifier of this network session.

## SessionStartTime

Type: `int or string`

The network session start timestamp with nanosecond precision.

## SourceIP

Type: `string`

Source IP of the network session.

## SourceInternalIP

Type: `string`

Local LAN IP of the device. Only available when connected via a GRE/IPsec tunnel on-ramp.

## SourcePort

Type: `int`

Source port of the network session.

## TenantID

Type: `string`

The tenant ID of the network session, if exists.

## UserID

Type: `string`

User identity where the network session originated from. Only applicable for WARP device clients.

## VirtualNetworkID

Type: `string`

Identifier of the virtual network configured for the client.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero_trust_network_sessions/#page","headline":"Zero Trust Network Session Logs · Cloudflare Logs docs","description":"Network session logs are generated for all traffic proxied through Cloudflare Gateway across all supported on-ramps, such as the Cloudflare One Client (WARP), proxy endpoints (PAC files), Browser Isolation, and Cloudflare Tunnel.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero_trust_network_sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/zero_trust_network_sessions/","name":"Zero Trust Network Session Logs"}}]}
```
