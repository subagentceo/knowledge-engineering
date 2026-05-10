---
slug: batch-processing
source: https://platform.claude.com/docs/en/build-with-claude/batch-processing.md
local: vendor/anthropics/platform.claude.com/docs/en/build-with-claude/batch-processing.md
drives: batched grading (Phase 11)
---

# batch-processing — extract

## Header tree

- # Batch processing
- # Message Batches API
  - ## How the Message Batches API works
    - ### Batch limitations
    - ### Supported models
    - ### What can be batched
  - ## Pricing
  - ## How to use the Message Batches API
    - ### Prepare and create your batch
    - ### Tracking your batch
    - ### Listing all Message Batches
    - ### Retrieving batch results
    - ### Canceling a Message Batch
    - ### Using prompt caching with Message Batches
    - ### Extended output (beta)
    - ### Best practices for effective batching

## Plan-relevant pull quotes

> The Message Batches API is a powerful, cost-effective way to
> asynchronously process large volumes of [Messages] requests. … most
> batches finishing in less than 1 hour while **reducing costs by 50%**
> and increasing throughput.

> The Batches API offers significant cost savings. **All usage is charged
> at 50% of the standard API prices.**

> The Message Batches API supports prompt caching, allowing you to
> potentially reduce costs and processing time for batch requests. The
> pricing discounts from prompt caching and Message Batches **can stack**,
> providing even greater cost savings when both features are used
> together.

## Why this drives Phase 11

Phase 11's `scripts/grade-phase.ts` collects all prose-only criteria
across all rubrics into one Message Batches submission. The 50% pricing
plus stacking with prompt caching is the cost engine that makes
mechanical rubric grading at PR-merge cadence affordable.
