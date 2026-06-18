---
title: Magic Network Monitoring Flow Logs
description: The descriptions below detail the fields available for mnm_flow_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Magic Network Monitoring Flow Logs

The descriptions below detail the fields available for `mnm_flow_logs`.

## AWSVPCFlowJSON

Type: `string`

AWS VPC Flow Logs JSON data. Only set if the flow protocol is AWS\_VPC.

## Bits

Type: `int`

The number of bits transmitted.

## DestinationAS

Type: `int`

The autonomous system number of the destination.

## DestinationAddress

Type: `string`

The destination IP address.

## DestinationPort

Type: `int`

The destination port number.

## DeviceID

Type: `string`

The ID of the network device (such as a router or switch) that originated the flow.

## EgressBits

Type: `int`

The number of egress bits transmitted.

## EgressPackets

Type: `int`

The number of egress packets transmitted.

## Ethertype

Type: `int`

The ethertype of the packet (for example, 2048 for IPv4, 34525 for IPv6).

## FlowProtocol

Type: `string`

The flow protocol (for example, 'AWS\_VPC', 'IPFIX', 'SFLOW\_5', 'NETFLOW\_V9').

## FlowTimestamp

Type: `int or string`

The timestamp of the flow. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## NumFlows

Type: `int`

The number of flows.

## PacketID

Type: `string`

The packet ID.

## Packets

Type: `int`

The number of packets transmitted.

## Protocol

Type: `int`

The protocol number (for example, 6 for TCP, 17 for UDP).

## RuleIDs

Type: `string`

Comma-separated list of Magic Network Monitoring rule IDs associated with the flow, if any.

## SampleRate

Type: `int`

The sample rate of the flow set by the sampler (1, 100, 1000, 1024, 2000 are common).

## SampleRateType

Type: `string`

The type of sample rate (for example, 'flow', 'default', 'propagated').

## SamplerAddress

Type: `string`

The sampler IP address.

## SourceAS

Type: `int`

The autonomous system number of the source.

## SourceAddress

Type: `string`

The source IP address.

## SourcePort

Type: `int`

The source port number.

## TcpFlags

Type: `int`

The TCP flags.

## Timestamp

Type: `int or string`

The date and time of the event. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/mnm_flow_logs/#page","headline":"Magic Network Monitoring Flow Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for mnm_flow_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/mnm_flow_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/mnm_flow_logs/","name":"Magic Network Monitoring Flow Logs"}}]}
```
