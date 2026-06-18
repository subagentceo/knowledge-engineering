---
title: Workers Trace Events
description: The descriptions below detail the fields available for workers_trace_events.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Trace Events

The descriptions below detail the fields available for `workers_trace_events`.

## CPUTimeMs

Type: `int`

The amount of CPU time used by the Worker script, in milliseconds.

## DispatchNamespace

Type: `string`

The Cloudflare Worker dispatch namespace.

## Entrypoint

Type: `string`

The name of the entrypoint class in which the Worker began execution.

## Event

Type: `object`

Details about the source event.

## EventTimestampMs

Type: `int`

The timestamp of when the event was received, in milliseconds.

## EventType

Type: `string`

The event type that triggered the invocation.   
Possible values are _fetch_.

## Exceptions

Type: `array[object]`

List of uncaught exceptions during the invocation.

## Logs

Type: `array[object]`

List of console messages emitted during the invocation.

## Outcome

Type: `string`

The outcome of the Worker script invocation.   
Possible values are _ok_ | _exception_.

## ScriptName

Type: `string`

The Cloudflare Worker script name.

## ScriptTags

Type: `array[string]`

A list of user-defined tags used to categorize the Worker.

## ScriptVersion

Type: `object`

The version of the script that was invoked.

## WallTimeMs

Type: `int`

The elapsed time in milliseconds between the start of a Worker invocation, and when the Workers Runtime determines that no more JavaScript needs to run. Specifically, this measures the wall-clock time that the JavaScript context remained open. For example, when returning a response with a large body, the Workers runtime can, in some cases, determine that no more JavaScript needs to run, and closes the JS context before all the bytes have passed through and been sent. Alternatively, if you use the `waitUntil()` API to perform work without blocking the return of a response, this work may continue executing after the response has been returned, and will be included in `WallTimeMs`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers_trace_events/#page","headline":"Workers Trace Events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for workers_trace_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers_trace_events/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/","name":"Account-scoped datasets"}},{"@type":"ListItem","position":7,"item":{"@id":"/logs/logpush/logpush-job/datasets/account/workers_trace_events/","name":"Workers Trace Events"}}]}
```
