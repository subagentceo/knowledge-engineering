---
title: DNS Firewall Logs
description: The descriptions below detail the fields available for dns_firewall_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS Firewall Logs

The descriptions below detail the fields available for `dns_firewall_logs`.

## ClientResponseCode

Type: `int`

Integer value of the response code Cloudflare presents to the client. Response code follows [IANA parameters ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6).

## ClusterID

Type: `string`

The ID of the cluster which handled this request.

## ColoCode

Type: `string`

IATA airport code of the data center that received the request.

## EDNSSubnet

Type: `string`

IPv4 or IPv6 address information corresponding to the [EDNS Client Subnet (ECS)](https://developers.cloudflare.com/glossary/?term=ecs) forwarded by recursive resolvers. Not all resolvers send this information.

## EDNSSubnetLength

Type: `int`

Size of the [EDNS Client Subnet (ECS)](https://developers.cloudflare.com/glossary/?term=ecs) in bits. For example, if the last octet of an IPv4 address is omitted (`192.0.2.x.`), the subnet length will be 24.

## QueryDO

Type: `bool`

Indicates if the client is capable of handling a signed response (DNSSEC answer OK).

## QueryName

Type: `string`

Name of the query that was sent.

## QueryRD

Type: `bool`

Indicates if the client means a recursive query (Recursion Desired).

## QuerySize

Type: `int`

The size of the query sent from the client in bytes.

## QueryTCP

Type: `bool`

Indicates if the query from the client was made via TCP (if false, then UDP).

## QueryType

Type: `int`

Integer value of query type. For more information refer to [Query type ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4).

## ResponseCached

Type: `bool`

Whether the response was cached or not.

## ResponseCachedStale

Type: `bool`

Whether the response was cached stale. In other words, the TTL had expired and the upstream nameserver was not reachable.

## ResponseReason

Type: `string`

Short descriptions with more context around the final DNS Firewall response. Refer to [response reasons](https://developers.cloudflare.com/dns/dns-firewall/analytics/) for more information.

## SourceIP

Type: `string`

IP address of the client (IPv4 or IPv6).

## Timestamp

Type: `int or string`

Timestamp at which the query occurred.

## UpstreamIP

Type: `string`

IP of the upstream nameserver (IPv4 or IPv6).

## UpstreamResponseCode

Type: `int`

Integer value of the response code from the upstream nameserver. Response code follows [IANA parameters ↗](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6)

## UpstreamResponseTimeMs

Type: `int`

Upstream response time in milliseconds.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dns_firewall_logs/#page","headline":"DNS Firewall Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for dns_firewall_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dns_firewall_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/dns_firewall_logs/","name":"DNS Firewall Logs"}}]}
```
