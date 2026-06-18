---
title: NEL reports
description: The descriptions below detail the fields available for nel_reports.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# NEL reports

The descriptions below detail the fields available for `nel_reports`.

## ClientIPASN

Type: `int`

Client ASN.

## ClientIPASNDescription

Type: `string`

Client ASN description.

## ClientIPCountry

Type: `string`

Client country.

## LastKnownGoodColoCode

Type: `string`

IATA airport code of colo client connected to.

## Phase

Type: `string`

The phase of connection the error occurred in; _dns_ | _connection_ | _application_ | _unknown_.

## Timestamp

Type: `int or string`

Timestamp for error report.

## Type

Type: `string`

The type of error in the phase.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/nel_reports/#page","headline":"NEL reports · Cloudflare Logs docs","description":"The descriptions below detail the fields available for nel_reports.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/nel_reports/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/zone/","name":"Zone-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/zone/nel_reports/","name":"NEL reports"}}]}
```
