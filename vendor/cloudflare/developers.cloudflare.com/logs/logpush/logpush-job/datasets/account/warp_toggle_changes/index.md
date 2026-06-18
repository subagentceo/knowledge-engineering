---
title: WARP Toggle Changes
description: The descriptions below detail the fields available for warp_toggle_changes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WARP Toggle Changes

The descriptions below detail the fields available for `warp_toggle_changes`.

## AccountID

Type: `string`

The Cloudflare account ID when the toggle happened.

## AccountName

Type: `string`

The account name when the toggle happened.

## DeviceID

Type: `string`

Physical device ID.

## DeviceRegistrationID

Type: `string`

Device registration ID.

## Hostname

Type: `string`

The device hostname.

## SerialNumber

Type: `string`

The device serial number.

## Timestamp

Type: `int or string`

Time the event was ingested.

## Toggled

Type: `bool`

Indicates whether the device was toggled or not.

## UserEmail

Type: `string`

The Access user email.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp_toggle_changes/#page","headline":"WARP Toggle Changes · Cloudflare Logs docs","description":"The descriptions below detail the fields available for warp_toggle_changes.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp_toggle_changes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-03-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/warp_toggle_changes/","name":"WARP Toggle Changes"}}]}
```
