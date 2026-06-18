---
title: SSH Logs
description: The descriptions below detail the fields available for ssh_logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SSH Logs

The descriptions below detail the fields available for `ssh_logs`.

## AccountID

Type: `string`

Cloudflare account ID.

## ClientAddress

Type: `string`

The source address of the SSH command.

## Datetime

Type: `int or string`

The timestamp in UTC of when this message is being sent.

## Error

Type: `string`

An SSH error. Only used if an error has occurred.

## PTY

Type: `string`

This is used by certain programs types to synchronize local and remote SSH terminal state.

## Payload

Type: `string`

The captured request/response data, in asciicast v2 format. This includes the command associated with the 'exec' program type.

## ProgramFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH program termination. This is empty until the program ends.

## ProgramID

Type: `string`

The SSH program ID. A single SSH session can have multiple programs running.

## ProgramStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH program creation.

## ProgramType

Type: `string`

The SSH program being run. The options are 'shell': opens an interactive terminal, 'exec': execute a single specified command, 'x11': is for an interactive graphical environment, 'direct-tcpip': direct tunneling, 'forwarded-tcpip': reverse tunneling.

## ServerAddress

Type: `string`

The destination address for the SSH session.

## SessionFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH session termination. This is empty until the session ends.

## SessionID

Type: `string`

SSH session ID.

## SessionStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH session creation.

## TargetID

Type: `string`

The identifier of the target being accessed.

## UserEmail

Type: `string`

User email address.

## UserID

Type: `string`

Cloudflare user ID.

## Username

Type: `string`

The principal user being accessed on SSH server's machine. This will be empty if an error was thrown when establishing the connection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh_logs/#page","headline":"SSH Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for ssh_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/ssh_logs/","name":"SSH Logs"}}]}
```
