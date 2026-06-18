---
title: IPSec Logs
description: The descriptions below detail the fields available for ipsec_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IPSec Logs

The descriptions below detail the fields available for `ipsec_logs`.

## Level

Type: `string`

The level of the log.

## LocalIP

Type: `string`

The local IP address associated with the log.

## LocalPort

Type: `int`

The local port associated with the log.

## Message

Type: `string`

The log message. IKEv2 ciphersuite is logged here for handshake messages.

## RemoteIP

Type: `string`

The remote IP address associated with the log.

## RemotePort

Type: `int`

The remote port associated with the log.

## Timestamp

Type: `int or string`

Timestamp at which the log occurred.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec_logs/#page","headline":"IPSec Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for ipsec_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-02-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/ipsec_logs/","name":"IPSec Logs"}}]}
```
