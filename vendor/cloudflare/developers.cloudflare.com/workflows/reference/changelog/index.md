---
title: Release notes
description: Latest release notes and changes for Cloudflare Workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/workflows/reference/changelog/index.xml)

## 2026-04-01

**All wrangler workflows commands now support local development**

All `wrangler workflows` commands now accept a `--local` flag to target a Workflow running in a local `wrangler dev` session. You can now manage the full Workflow lifecycle locally, including listing, triggering, deleting Workflows, and managing instances (list, describe, pause, resume, restart, terminate, and send events).

All commands also accept `--port` to target a specific `wrangler dev` session (defaults to `8787`).

More information available in the [changelog](https://developers.cloudflare.com/changelog/post/2026-04-01-wrangler-workflows-local/).

## 2026-03-26

**JavaScript Workflows steps can now return streamed output**

In JavaScript Workflows, `ReadableStream<Uint8Array>` is now a supported serializable return type for `step.do()`, which lets a step persist large binary output without fitting it into the normal 1 MiB non-stream step-result limit.

Streamed outputs still count toward Workflow instance storage limits. For requirements and caveats, refer to the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/#step).

## 2026-03-23

**Workflow instances now support pause(), resume(), restart(), and terminate() methods in local development**

Workflow instance methods `pause()`, `resume()`, `restart()`, and `terminate()` are now available in local development when using `wrangler dev`.

## 2025-09-12

**Test Workflows locally**

Workflows can now be tested with new test APIs available in the "cloudflare:test" module.

More information available in the Vitest integration [docs](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/#workflows).

## 2025-08-22

**Python Workflows is now open beta**

[Python Workflows](https://developers.cloudflare.com/workflows/python/) is now in open beta, and available to any developer a free or paid Workers plan.

More information available in the [changelog](https://developers.cloudflare.com/changelog/2025-08-22-workflows-python-beta/).

## 2025-05-07

**Search for specific Workflows**

With this release, you can search Workflows by name via API.

## 2025-04-29

**Workflow deletion and more**

Workflows can now be deleted (from the Dashboard/UI or via API), and the maximum length limit for event types and instance IDs was increased to 100 characters.

Also, this release fixes a bug where a delay of `0` in step config retries would fail.

## 2025-04-07

**Workflows is now Generally Available**

Workflows is now Generally Available (or "GA").

This release includes the following new features:

* A new `waitForEvent` API that allows a Workflow to wait for an event to occur before continuing execution.
* Increased concurrency: you can run up to 4,500 Workflow instances concurrently — and this will continue to grow.
* Improved observability, including new CPU time metrics that allow you to better understand which Workflow instances are consuming the most resources and/or contributing to your bill.
* Support for vitest for testing Workflows locally and in CI/CD pipelines.

More information available in the [changelog](https://developers.cloudflare.com/changelog/2025-04-07-workflows-ga/).

## 2025-02-25

**Concurrent Workflow instances limits increased**

Workflows now supports up to 4,500 concurrent (running) instances, up from the previous limit of 100.

More information available in the [changelog](https://developers.cloudflare.com/changelog/2025-02-25-workflows-concurrency-increased/).

## 2025-02-11

**Behavior improvements**

Improved Workflows execution that prevents Workflows instances from getting stuck, and allows stuck instances to become unstuck.

Also, improved the reliability of Workflows step retry counts, and improved Instance ID validation.

## 2025-01-23

**Major bugfixes and improvements**

With this release, some bug were fixed:

* `event.timestamp` is now `Date`, fixing a regression.
* Fixed issue where instances without metadata were not terminated as expected.

Also, this release makes Workflows execution more reliable for accounts with high loads.

## 2025-01-09

**Improved Wrangler local dev experience for steps' output, matching production**

Previously, in local dev, the output field would return the list of successful steps outputs in the workflow. This is not expected behavior compared to production workflows (where the output is the actual return of the run function).

This release aligns the local dev output field behavior with the production behavior.

## 2024-12-19

**Better instance control, improved queued logic, and step limit increased**

Workflows can now be terminated and pause instances from a queued state and the ID of an instance is now exposed via the `WorkflowEvent` parameter.

Also, the mechanism to queue instances was improved to force miss-behaved queued instances to be automatically errored.

Workflows now allow you to define up to 1024 steps in a single Workflow definition, up from the previous limit of 512\. This limit will continue to increase during the course of the open beta.

## 2024-12-09

**New queue instances logic**

Introduction of a new mechanism to queue instances, which will prevent instances from getting stuck on queued status forever.

## 2024-11-30

**Step limit increased**

Workflows now allow you to define up to 512 steps in a single Workflow definition, up from the previous limit of 256\. This limit will continue to increase during the course of the open beta.

If you have Workflows that need more steps, we recommend delegating additional work to other Workflows by [triggering a new Workflow](https://developers.cloudflare.com/workflows/build/trigger-workflows/) from within a step and passing any state as [parameters to that Workflow instance](https://developers.cloudflare.com/workflows/build/events-and-parameters/).

## 2024-11-21

**Fixed create instance API in Workers bindings**

You can now call `create()` without any arguments when using the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/#create) for Workflows. Workflows will automatically generate the ID of the Workflow on your behalf.

This addresses a bug that caused calls to `create()` to fail when provided with no arguments.

## 2024-11-20

**Multiple Workflows in local development now supported**

Local development with `wrangler dev` now correctly supports multiple Workflow definitions per script.

There is no change to production Workflows, where multiple Workflow definitions per Worker script was already supported.

## 2024-10-23

**Workflows is now in public beta!**

Workflows, a new product for building reliable, multi-step workflows using Cloudflare Workers, is now in public beta. The public beta is available to any user with a [free or paid Workers plan](https://developers.cloudflare.com/workers/platform/pricing/).

A Workflow allows you to define multiple, independent steps that encapsulate errors, automatically retry, persist state, and can run for seconds, minutes, hours or even days. A Workflow can be useful for post-processing data from R2 buckets before querying it, automating a Workers AI RAG pipeline, or managing user signup flows and lifecycle emails.

You can learn more about Workflows in [our announcement blog](https://blog.cloudflare.com/building-workflows-durable-execution-on-workers/), or start building in our [get started guide](https://developers.cloudflare.com/workflows/get-started/guide/).

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/workflows/reference/changelog/#page","headline":"Release notes · Cloudflare Workflows docs","description":"Latest release notes and changes for Cloudflare Workflows.","url":"https://developers.cloudflare.com/workflows/reference/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/reference/changelog/","name":"Release notes"}}]}
```
