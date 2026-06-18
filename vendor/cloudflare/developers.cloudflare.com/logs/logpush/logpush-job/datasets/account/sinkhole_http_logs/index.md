---
title: Sinkhole HTTP Logs
description: The descriptions below detail the fields available for sinkhole_http_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sinkhole HTTP Logs

The descriptions below detail the fields available for `sinkhole_http_logs`.

## AccountID

Type: `string`

The Account ID.

## Body

Type: `string`

The request body.

## BodyLength

Type: `int`

The length of request body.

## DestAddr

Type: `string`

The destination IP address of the request.

## Headers

Type: `string`

The request headers. If a header has multiple values, the values are comma separated. Each header is separated by the escaped newline character (\\n).

## Host

Type: `string`

The host the request was sent to.

## Method

Type: `string`

The request method.

## Password

Type: `string`

The request password.

## R2Path

Type: `string`

The path to the object within the R2 bucket linked to this sinkhole that stores overflow body and header data. Blank if neither headers nor body was larger than 256 bytes.

## Referrer

Type: `string`

The referrer of the request.

## SinkholeID

Type: `string`

The ID of the Sinkhole that logged the HTTP Request.

## SrcAddr

Type: `string`

The sender's IP address.

## Timestamp

Type: `int or string`

The date and time the sinkhole HTTP request was logged.

## URI

Type: `string`

The request Uniform Resource Identifier.

## URL

Type: `string`

The request Uniform Resource Locator.

## UserAgent

Type: `string`

The request user agent.

## Username

Type: `string`

The request username.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/#page","headline":"Sinkhole HTTP Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for sinkhole_http_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/sinkhole_http_logs/","name":"Sinkhole HTTP Logs"}}]}
```
