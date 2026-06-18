---
title: Device posture results
description: The descriptions below detail the fields available for device_posture_results.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device posture results

The descriptions below detail the fields available for `device_posture_results`.

## ClientVersion

Type: `string`

The Zero Trust client version at the time of upload.

## DeviceID

Type: `string`

The device ID that performed the posture upload.

## DeviceManufacturer

Type: `string`

The manufacturer of the device that the Zero Trust client is running on.

## DeviceModel

Type: `string`

The model of the device that the Zero Trust client is running on.

## DeviceName

Type: `string`

The name of the device that the Zero Trust client is running on.

## DeviceSerialNumber

Type: `string`

The serial number of the device that the Zero Trust client is running on.

## DeviceType

Type: `string`

The Zero Trust client operating system type.

## Email

Type: `string`

The email used to register the device with the Zero Trust client.

## OSVersion

Type: `string`

The operating system version at the time of upload.

## PolicyID

Type: `string`

The posture check ID associated with this device posture result.

## PostureCheckName

Type: `string`

The name of the posture check associated with this device posture result.

## PostureCheckType

Type: `string`

The type of the Zero Trust client check or service provider check.

## PostureEvaluatedResult

Type: `bool`

Whether this posture upload passes the associated posture check, given the requirements posture check at the time of the timestamp.

## PostureExpectedJSON

Type: `object`

JSON object of what the posture check expects from the Zero Trust client.

## PostureReceivedJSON

Type: `object`

JSON object of what the Zero Trust client actually uploads.

## RegistrationID

Type: `string`

The UUID of the device registration associated with this posture result.

## Timestamp

Type: `int or string`

The date and time the corresponding device posture upload was performed (for example, '2021-07-27T00:01:07Z'). To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## UserUID

Type: `string`

The uid of the user who registered the device.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/device_posture_results/#page","headline":"Device posture results · Cloudflare Logs docs","description":"The descriptions below detail the fields available for device_posture_results.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/device_posture_results/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/device_posture_results/","name":"Device posture results"}}]}
```
