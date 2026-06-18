---
title: Gateway Network
description: The descriptions below detail the fields available for gateway_network.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gateway Network

The descriptions below detail the fields available for `gateway_network`.

## AccountID

Type: `string`

Cloudflare account tag.

## Action

Type: `string`

Action performed by gateway on the session.

## ApplicationIDs

Type: `array[int]`

IDs of the applications that matched the session parameters.

## ApplicationNames

Type: `array[string]`

Names of the applications that matched the session parameters.

## CategoryIDs

Type: `array[int]`

IDs of the categories that matched the session parameters.

## CategoryNames

Type: `array[string]`

Names of the categories that matched the session parameters.

## Datetime

Type: `int or string`

The date and time the corresponding network session was made (for example, '2021-07-27T00:01:07Z').

## DestinationIP

Type: `string`

Destination IP of the network session.

## DestinationIPContinentCode

Type: `string`

Continent code of the destination IP of the network session (for example, 'NA').

## DestinationIPCountryCode

Type: `string`

Country code of the destination IP of the network session (for example, 'US').

## DestinationPort

Type: `int`

Destination port of the network session.

## DetectedProtocol

Type: `string`

Detected traffic protocol of the network session.

## DeviceID

Type: `string`

UUID of the device where the network session originated from.

## DeviceName

Type: `string`

The name of the device where the HTTP request originated from (for example, 'Laptop MB810').

## Email

Type: `string`

Email associated with the user identity where the network session originated from.

## OverrideIP

Type: `string`

Overridden IP of the network session, if any.

## OverridePort

Type: `int`

Overridden port of the network session, if any.

## PolicyID

Type: `string`

Identifier of the policy/rule that was applied, if any.

## PolicyName

Type: `string`

The name of the gateway policy applied to the request, if any.

## ProxyEndpoint

Type: `string`

The proxy endpoint used on this network session, if any.

## RegistrationID

Type: `string`

The UUID of the device registration from which the network session originated.

## SNI

Type: `string`

Content of the SNI for the TLS network session, if any.

## SessionID

Type: `string`

The session identifier of this network session.

## SourceIP

Type: `string`

Source IP of the network session.

## SourceIPContinentCode

Type: `string`

Continent code of the source IP of the network session (for example, 'NA').

## SourceIPCountryCode

Type: `string`

Country code of the source IP of the network session (for example, 'US').

## SourceInternalIP

Type: `string`

Local LAN IP of the device. Only available when connected via a GRE/IPsec tunnel on-ramp.

## SourcePort

Type: `int`

Source port of the network session.

## TenantID

Type: `string`

The tenant ID of the network session, if exists.

## Transport (deprecated)

Type: `string`

Transport protocol used for this session.   
Possible values are _tcp_ | _quic_ | _udp_. Deprecated, please use TransportProtocol instead.

## TransportProtocol

Type: `string`

Transport protocol used for this session.   
Possible values are _tcp_ | _quic_ | _udp_.

## UserID

Type: `string`

User identity where the network session originated from.

## VirtualNetworkID

Type: `string`

The identifier of the virtual network the device was connected to, if any.

## VirtualNetworkName

Type: `string`

The name of the virtual network the device was connected to, if any.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway_network/#page","headline":"Gateway Network · Cloudflare Logs docs","description":"The descriptions below detail the fields available for gateway_network.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway_network/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/gateway_network/","name":"Gateway Network"}}]}
```
