---
title: Release notes
description: Track the latest changes, fixes, and new features for Durable Objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/durable-objects/release-notes/index.xml)

## 2026-01-07

**Billing for SQLite Storage**

Storage billing for SQLite-backed Durable Objects will be enabled in January 2026, with a target date of January 7, 2026 (no earlier). For more details, refer to the [Billing for SQLite Storage](https://developers.cloudflare.com/changelog/durable-objects/2026-01-07-durable-objects-sqlite-storage-billing/).

## 2025-10-25

* The maximum WebSocket message size limit has been increased from 1 MiB to 32 MiB.

## 2025-10-16

**Durable Objects can access stored data with UI editor**

Durable Objects stored data can be viewed and written using [Data Studio](https://developers.cloudflare.com/durable-objects/observability/data-studio/) on the Cloudflare dashboard. Only Durable Objects using [SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) can use Data Studio.

## 2025-08-21

**Durable Objects stubs can now be directly constructed by name**

A [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) can now be directly constructed by created directly with [DurableObjectNamespace::getByName](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname).

## 2025-04-07

**Durable Objects on Workers Free plan**

[SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/) are now available on the Workers Free plan with these [limits](https://developers.cloudflare.com/durable-objects/platform/pricing/).

## 2025-04-07

**SQLite in Durable Objects GA**

[SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) and corresponding [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) methods like `sql.exec` have moved from beta to general availability. New Durable Object classes should use wrangler configuration for SQLite storage over key-value storage.

SQLite storage per Durable Object has increased to 10GB for all existing and new objects.

## 2025-02-19

SQLite-backed Durable Objects now support `PRAGMA optimize` command, which can improve database query performance. It is recommended to run this command after a schema change (for example, after creating an index). Refer to [PRAGMA optimize](https://developers.cloudflare.com/d1/sql-api/sql-statements/#pragma-optimize) for more information.

## 2025-02-11

When Durable Objects generate an "internal error" exception in response to certain failures, the exception message may provide a reference ID that customers can include in support communication for easier error identification. For example, an exception with the new message might look like: `internal error; reference = 0123456789abcdefghijklmn`.

## 2024-10-07

**Alarms re-enabled in (beta) SQLite-backed Durable Object classes**

The issue identified with [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) in [beta Durable Object classes with a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend) has been resolved and alarms have been re-enabled.

## 2024-09-27

**Alarms disabled in (beta) SQLite-backed Durable Object classes**

An issue was identified with [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) in [beta Durable Object classes with a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend). Alarms have been temporarily disabled for only SQLite-backed Durable Objects while a fix is implemented. Alarms in Durable Objects with default, key-value storage backend are unaffected and continue to operate.

## 2024-09-26

**(Beta) SQLite storage backend & SQL API available on new Durable Object classes**

The new beta version of Durable Objects is available where each Durable Object has a private, embedded SQLite database. When deploying a new Durable Object class, users can [opt-in to a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend) in order to access new [SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#sql-api) and [point-in-time-recovery API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#pitr-point-in-time-recovery-api), part of Durable Objects Storage API.

You cannot enable a SQLite storage backend on an existing, deployed Durable Object class. Automatic migration of deployed classes from their key-value storage backend to SQLite storage backend will be available in the future.

During the initial beta, Storage API billing is not enabled for Durable Object classes using SQLite storage backend. SQLite-backed Durable Objects will incur [charges for requests and duration](https://developers.cloudflare.com/durable-objects/platform/pricing/#billing-metrics). We plan to enable Storage API billing for Durable Objects using SQLite storage backend in the first half of 2025 after advance notice with the following [pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).

## 2024-09-07

**New error message for overloaded Durable Objects**

Introduced a new overloaded error message for Durable Objects: "Durable Object is overloaded. Too many requests for the same object within a 10 second window."

This error message does not replace other types of overload messages that you may encounter for your Durable Object, and is only returned at more extreme levels of overload.

## 2024-06-24

[Exceptions](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) thrown from Durable Object internal operations and tunneled to the caller may now be populated with a `.retryable: true` property if the exception was likely due to a transient failure, or populated with an `.overloaded: true` property if the exception was due to [overload](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-is-overloaded).

## 2024-04-03

**Durable Objects support for Oceania region**

Durable Objects can reside in Oceania, lowering Durable Objects request latency for eyeball Workers in Oceania locations.

Refer to [Durable Objects](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) to provide location hints to objects.

## 2024-04-01

**Billing reduction for WebSocket messages**

Durable Objects [request billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#billing-metrics) applies a 20:1 ratio for incoming WebSocket messages. For example, 1 million Websocket received messages across connections would be charged as 50,000 Durable Objects requests.

This is a billing-only calculation and does not impact Durable Objects [metrics and analytics](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/).

## 2024-02-15

**Optional \`alarmInfo\` parameter for Durable Object Alarms**

Durable Objects [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) now have a new `alarmInfo` argument that provides more details about an alarm invocation, including the `retryCount` and `isRetry` to signal if the alarm was retried.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/durable-objects/release-notes/#page","headline":"Release notes · Cloudflare Durable Objects docs","description":"Track the latest changes, fixes, and new features for Durable Objects.","url":"https://developers.cloudflare.com/durable-objects/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/release-notes/","name":"Release notes"}}]}
```
