---
title: Changelog
description: Track recent changes, new features, and fixes for Cloudflare Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/queues/platform/changelog/index.xml)

## 2025-04-17

**Improved limits for pull consumers**

[Queues Pull Consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) can now pull and acknowledge up to 5,000 messages per second per queue. Previously, pull consumers were rate limited to 1200 requests / 5 minutes, aggregated across all queues.

Refer to the [documentation on pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to learn how to setup a pull consumer, acknowledge / retry messages, and setup multiple consumers.

## 2025-03-27

**Pause delivery and purge queues**

Queues now supports the ability to pause delivery and/or delete messages from a queue, allowing you to better manage queue backlogs.

Message delivery from a Queue to consumers can be paused / resumed. Queues continue to receive messages while paused.

Queues can be purged to permanently delete all messages currently stored in a Queue. This operation is useful while testing a new application, if a queue producer was misconfigured and is sending bad messages.

Refer to the [documentation on Pause & Purge](https://developers.cloudflare.com/queues/configuration/pause-purge/) to learn how to use both operations.

## 2025-02-14

**Customize message retention period**

You can now customize a queue's message retention period, from a minimum of 60 seconds to a maximum of 14 days. Previously, it was fixed to the default of 4 days.

Refer to the [Queues confiuguration documentation](https://developers.cloudflare.com/queues/configuration/configure-queues/#queue-configuration) to learn more.

## 2024-09-26

**Queues is GA, with higher throughput & consumer concurrency**

Queues is now generally available.

The per-queue message throughput has increased from 400 to 5,000 messages per second. This applies to new and existing queues.

Maximum concurrent consumers has increased from 20 to 250\. This applies to new and existing queues. Queues with no explicit limit will automatically scale to the new maximum. Review the [consumer concurrency documentation](https://developers.cloudflare.com/queues/configuration/consumer-concurrency) to learn more.

## 2024-03-26

**Delay messages published to a queue**

Messages published to a queue and/or marked for retry from a queue consumer can now be explicitly delayed. Delaying messages allows you to defer tasks until later, and/or respond to backpressure when consuming from a queue.

Refer to [Batching and Retries](https://developers.cloudflare.com/queues/configuration/batching-retries/) to learn how to delay messages written to a queue.

## 2024-03-25

**Support for pull-based consumers**

Queues now supports [pull-based consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/). A pull-based consumer allows you to pull from a queue over HTTP from any environment and/or programming language outside of Cloudflare Workers. A pull-based consumer can be useful when your message consumption rate is limited by upstream infrastructure or long-running tasks.

Review the [documentation on pull-based consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to configure HTTP-based pull.

## 2024-03-18

**Default content type now set to JSON**

The default [content type](https://developers.cloudflare.com/queues/configuration/javascript-apis/#queuescontenttype) for messages published to a queue is now `json`, which improves compatibility with the upcoming pull-based queues.

Any Workers created on or after the [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#queues-send-messages-in-json-format) of `2024-03-18`, or that explicitly set the `queues_json_messages` compatibility flag, will use the new default behaviour. Existing Workers with a compatibility date prior will continue to use `v8` as the default content type for published messages.

## 2024-02-24

**Explicit retries no longer impact consumer concurrency/scaling.**

Calling `retry()` or `retryAll()` on a message or message batch will no longer have an impact on how Queues scales [consumer concurrency](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/).

Previously, using [explicit retries](https://developers.cloudflare.com/queues/configuration/batching-retries/#explicit-acknowledgement-and-retries) via `retry()` or `retryAll()` would count as an error and could result in Queues scaling down the number of concurrent consumers.

## 2023-10-07

**More queues per account - up to 10,000**

Developers building on Queues can now create up to 10,000 queues per account, enabling easier per-user, per-job and sharding use-cases.

Refer to [Limits](https://developers.cloudflare.com/queues/platform/limits) to learn more about Queues' current limits.

## 2023-10-05

**Higher consumer concurrency limits**

[Queue consumers](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) can now scale to 20 concurrent invocations (per queue), up from 10\. This allows you to scale out and process higher throughput queues more quickly.

Queues with [no explicit limit specified](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/#limit-concurrency) will automatically scale to the new maximum.

This limit will continue to grow during the Queues beta.

## 2023-03-28

**Consumer concurrency (enabled)**

Queue consumers will now [automatically scale up](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) based on the number of messages being written to the queue. To control or limit concurrency, you can explicitly define a [max\_concurrency](https://developers.cloudflare.com/queues/configuration/configure-queues/#consumer) for your consumer.

## 2023-03-15

**Consumer concurrency (upcoming)**

Queue consumers will soon automatically scale up concurrently as a queues' backlog grows in order to keep overall message processing latency down. Concurrency will be enabled on all existing queues by 2023-03-28.

**To opt-out, or to configure a fixed maximum concurrency**, set `max_concurrency = 1` in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) or via [the queues dashboard](https://dash.cloudflare.com/?to=/:account/queues).

**To opt-in, you do not need to take any action**: your consumer will begin to scale out as needed to keep up with your message backlog. It will scale back down as the backlog shrinks, and/or if a consumer starts to generate a higher rate of errors. To learn more about how consumers scale, refer to the [consumer concurrency](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) documentation.

## 2023-03-02

**Explicit acknowledgement (new feature)**

You can now [acknowledge individual messages with a batch](https://developers.cloudflare.com/queues/configuration/batching-retries/#explicit-acknowledgement-and-retries) by calling `.ack()` on a message.

This allows you to mark a message as delivered as you process it within a batch, and avoids the entire batch from being redelivered if your consumer throws an error during batch processing. This can be particularly useful when you are calling external APIs, writing messages to a database, or otherwise performing non-idempotent actions on individual messages within a batch.

## 2023-03-01

**Higher per-queue throughput**

The per-queue throughput limit has now been [raised to 400 messages per second](https://developers.cloudflare.com/queues/platform/limits/).

## 2022-12-13

**sendBatch support**

The JavaScript API for Queue producers now includes a `sendBatch` method which supports sending up to 100 messages at a time.

## 2022-12-12

**Increased per-account limits**

Queues now allows developers to create up to 100 queues per account, up from the initial beta limit of 10 per account. This limit will continue to increase over time.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/queues/platform/changelog/#page","headline":"Changelog · Cloudflare Queues docs","description":"Track recent changes, new features, and fixes for Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/platform/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/platform/changelog/","name":"Changelog"}}]}
```
