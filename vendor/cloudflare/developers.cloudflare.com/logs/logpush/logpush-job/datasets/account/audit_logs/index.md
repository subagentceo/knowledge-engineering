---
title: Audit Logs
description: The descriptions below detail the fields available for audit_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit Logs

The descriptions below detail the fields available for `audit_logs`.

## ActionResult

Type: `bool`

Whether the action was successful.

## ActionType

Type: `string`

Type of action taken.

## ActorEmail

Type: `string`

Email of the actor.

## ActorID

Type: `string`

Unique identifier of the actor in Cloudflare's system.

## ActorIP

Type: `string`

Physical network address of the actor.

## ActorType

Type: `string`

Type of user that started the audit trail.

## ID

Type: `string`

Unique identifier of an audit log.

## Interface

Type: `string`

Entry point or interface of the audit log.

## Metadata

Type: `object`

Additional audit log-specific information. Metadata is organized in key:value pairs. Key and Value formats can vary by ResourceType.

## NewValue

Type: `object`

Contains the new value for the audited item.

## OldValue

Type: `object`

Contains the old value for the audited item.

## OwnerID

Type: `string`

The identifier of the user that was acting or was acted on behalf of. If a user did the action themselves, this value will be the same as the ActorID.

## ResourceID

Type: `string`

Unique identifier of the resource within Cloudflare's system.

## ResourceType

Type: `string`

The type of resource that was changed.

## When

Type: `int or string`

When the change happened.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs/#page","headline":"Audit Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for audit_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-08-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/audit_logs/","name":"Audit Logs"}}]}
```
