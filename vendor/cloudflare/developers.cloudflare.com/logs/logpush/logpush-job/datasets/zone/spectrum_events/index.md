---
title: Spectrum events
description: The descriptions below detail the fields available for spectrum_events.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Spectrum events

The descriptions below detail the fields available for `spectrum_events`.

## Application

Type: `string`

The unique public ID of the application on which the event occurred.

## ClientAsn

Type: `int`

Client AS number.

## ClientBytes

Type: `int`

The number of bytes read from the client by the Spectrum service.

## ClientCountry

Type: `string`

Country of the client IP address.

## ClientIP

Type: `string`

Client IP address.

## ClientMatchedIpFirewall

Type: `string`

Whether the connection matched any IP Firewall rules. UNKNOWN = No match or Firewall not enabled for Spectrum; _UNKNOWN_ | _ALLOW_ | _BLOCK\_ERROR_ | _BLOCK\_IP_ | _BLOCK\_COUNTRY_ | _BLOCK\_ASN_ | _WHITELIST\_IP_ | _WHITELIST\_COUNTRY_ | _WHITELIST\_ASN_.

## ClientPort

Type: `int`

Client port.

## ClientProto

Type: `string`

Transport protocol used by client; _tcp_ | _udp_ | _unix_.

## ClientTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between the client and Spectrum.

## ClientTlsCipher

Type: `string`

The cipher negotiated between the client and Spectrum. An unknown cipher is returned as "UNK."

## ClientTlsClientHelloServerName

Type: `string`

The server name in the Client Hello message from client to Spectrum.

## ClientTlsProtocol

Type: `string`

The TLS version negotiated between the client and Spectrum; _unknown_ | _none_ | _SSLv3_ | _TLSv1_ | _TLSv1.1_ | _TLSv1.2_ | _TLSv1.3_.

## ClientTlsStatus

Type: `string`

Indicates state of TLS session from the client to Spectrum; _UNKNOWN_ | _OK_ | _INTERNAL\_ERROR_ | _INVALID\_CONFIG_ | _INVALID\_SNI_ | _HANDSHAKE\_FAILED_ | _KEYLESS\_RPC_.

## ColoCode

Type: `string`

IATA airport code of the data center that received the request.

## ConnectTimestamp

Type: `int or string`

Timestamp at which both legs of the connection (client/edge, edge/origin or nexthop) were established.

## DisconnectTimestamp

Type: `int or string`

Timestamp at which the connection was closed.

## Event

Type: `string`

_connect_ | _disconnect_ | _clientFiltered_ | _tlsError_ | _resolveOrigin_ | _originError_.

## IpFirewall

Type: `bool`

Whether IP Firewall was enabled at time of connection.

## OriginBytes

Type: `int`

The number of bytes read from the origin by Spectrum.

## OriginIP

Type: `string`

Origin IP address.

## OriginPort

Type: `int`

Origin port.

## OriginProto

Type: `string`

Transport protocol used by origin; _tcp_ | _udp_ | _unix_.

## OriginTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between Spectrum and the origin.

## OriginTlsCipher

Type: `string`

The cipher negotiated between Spectrum and the origin. An unknown cipher is returned as "UNK."

## OriginTlsFingerprint

Type: `string`

SHA256 hash of origin certificate. An unknown SHA256 hash is returned as an empty string.

## OriginTlsMode

Type: `string`

If and how the upstream connection is encrypted; _unknown_ | _off_ | _flexible_ | _full_ | _strict_.

## OriginTlsProtocol

Type: `string`

The TLS version negotiated between Spectrum and the origin; _unknown_ | _none_ | _SSLv3_ | _TLSv1_ | _TLSv1.1_ | _TLSv1.2_ | _TLSv1.3_.

## OriginTlsStatus

Type: `string`

The state of the TLS session from Spectrum to the origin; _UNKNOWN_ | _OK_ | _INTERNAL\_ERROR_ | _INVALID\_CONFIG_ | _INVALID\_SNI_ | _HANDSHAKE\_FAILED_ | _KEYLESS\_RPC_.

## ProxyProtocol

Type: `string`

Which form of proxy protocol is applied to the given connection; _off_ | _v1_ | _v2_ | _simple_.

## Status

Type: `int`

A code indicating reason for connection closure.

## Timestamp

Type: `int or string`

Timestamp at which the event took place.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/#page","headline":"Spectrum events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for spectrum_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/spectrum_events/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/zone/","name":"Zone-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/zone/spectrum_events/","name":"Spectrum events"}}]}
```
