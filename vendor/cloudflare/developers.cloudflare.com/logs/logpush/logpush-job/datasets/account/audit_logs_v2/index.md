---
title: Audit Logs V2
description: The descriptions below detail the fields available for audit_logs_v2.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit Logs V2

The descriptions below detail the fields available for `audit_logs_v2`.

## AccountID

Type: `string`

The Cloudflare account ID.

## AccountName

Type: `string`

The Cloudflare account name.

## ActionDescription

Type: `string`

Description of action taken.

## ActionResult

Type: `string`

Whether the action was successful.

## ActionTimestamp

Type: `int or string`

When the change happened.

## ActionType

Type: `string`

Type of action taken.

## ActorContext

Type: `string`

Context of the actor.

## ActorEmail

Type: `string`

Email of the actor.

## ActorID

Type: `string`

Unique identifier of the actor in Cloudflare's system.

## ActorIPAddress

Type: `string`

Physical network address of the actor.

## ActorTokenDetails

Type: `object`

Details of how the actor is authenticated.

## ActorType

Type: `string`

Type of user that started the audit trail.

## AuditLogID

Type: `string`

Unique identifier of an audit log.

## Raw

Type: `object`

Raw data.

## ResourceID

Type: `string`

Unique identifier of the resource within Cloudflare's system.

## ResourceProduct

Type: `string`

Resource product.

## ResourceRequest

Type: `object`

Resource request.

## ResourceResponse

Type: `object`

Resource response.

## ResourceScope

Type: `string`

Resource scope.

## ResourceType

Type: `string`

The type of resource that was changed.

## ResourceValue

Type: `object`

Resource value.

## ZoneID

Type: `string`

The Cloudflare zone ID.

## ZoneName

Type: `string`

The Cloudflare zone name.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs_v2/#page","headline":"Audit Logs V2 · Cloudflare Logs docs","description":"The descriptions below detail the fields available for audit_logs_v2.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs_v2/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-08-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/audit_logs_v2/","name":"Audit Logs V2"}}]}
```
