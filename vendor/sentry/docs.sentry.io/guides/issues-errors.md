---
title: "What to Prioritize"
description: "Practical guidance on what errors to catch, how to search issues, and when to set alerts."
url: https://docs.sentry.io/guides/issues-errors/
---

# What to Prioritize

Your Sentry SDK is sending errors to [Sentry Issues](https://docs.sentry.io/product/issues.md) out of the box. Now what? This guide covers the high-value error patterns that help you catch problems before they impact users and fix issues faster.

## [Anatomy of an Error](https://docs.sentry.io/guides/issues-errors.md#anatomy-of-an-error)

Sentry automatically captures unhandled errors. For handled errors, use `captureException()` and add context:

```javascript
try {
  await processOrder(order);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      order_id: order.id,
      payment_method: order.paymentMethod,
    },
    level: "error",
  });
  throw error;
}
```

**Levels:** `fatal`, `error`, `warning`, `info`, `debug`

**Context:** Tags, user info, logs, and session replays help you debug faster. Tags are searchable, so use them for high-cardinality data like IDs, regions, and feature flags.

Every error in Sentry is automatically trace-connected. Click the trace ID to see the full [trace view](https://docs.sentry.io/concepts/key-terms/tracing.md#traces-to-trace-view) and understand what led to the error.

## [Where to Look](https://docs.sentry.io/guides/issues-errors.md#where-to-look)

Start by creating these five [Issue views](https://sentry.io/orgredirect/organizations/:orgslug/issues/) to catch the most critical problems.

**Save these views**: Turn these five searches into saved Issues views by clicking **Save As** after setting each filter.

### [1. Unresolved High-Volume Issues](https://docs.sentry.io/guides/issues-errors.md#1-unresolved-high-volume-issues)

High event counts mean either many users are affected or one user is stuck in a loop. Both need immediate attention.

**[In Issues](https://sentry.io/orgredirect/organizations/:orgslug/issues/):** Search for `is:unresolved` (applied by default) and use the sort dropdown (defaults to "Last Seen") to sort by **Events**

**What to look for:**

* Issues at the top with high event counts (many occurrences in a short time)
* Click into these issues to see the stack trace and how many users are affected

Learn more about [Issue States & Triage](https://docs.sentry.io/product/issues/states-triage.md) to manage and prioritize issues.

**Alert idea:** Trigger when event count spikes in a short time window to catch high-impact bugs and infinite loops.

### [2. New Issues After Deploy](https://docs.sentry.io/guides/issues-errors.md#2-new-issues-after-deploy)

Every deploy introduces risk. New errors that appear right after a release are usually regressions.

**[In Issues](https://sentry.io/orgredirect/organizations/:orgslug/issues/):** Filter by `is:unresolved firstRelease:v1.2.3` to find issues introduced in a specific release. Sort by **Age** to see the newest issues first.

**What to look for:**

* Issues that didn't exist in the previous release
* Errors in code paths you just changed
* New error types (TypeError, ReferenceError) indicating breaking changes

Learn more about [Release Health](https://docs.sentry.io/product/releases/health.md) to track error rates and crash-free sessions per release.

**Alert idea:** Trigger when a new issue is created, filtered to production environment and error/fatal level. This catches regressions immediately after deploy.

### [3. Errors by Environment](https://docs.sentry.io/guides/issues-errors.md#3-errors-by-environment)

Production errors are critical. Staging errors help you catch problems before they reach users. Comparing environments helps you spot configuration issues.

**[In Issues](https://sentry.io/orgredirect/organizations/:orgslug/issues/):** Search for `is:unresolved environment:production` or `environment:staging`

**What to look for:**

* Errors only in production (often config, API keys, or data issues)
* Errors only in staging (caught before deploy, needs fixing)
* Same error in both (systemic code issue)

Learn more about [configuring environments](https://docs.sentry.io/platform-redirect.md?next=%2Fconfiguration%2Fenvironments%2F) to separate production and staging issues.

**Alert idea:** Trigger when a new issue is created, filtered to production environment. These often indicate config drift or environment-specific bugs.

### [4. Errors with High User Impact](https://docs.sentry.io/guides/issues-errors.md#4-errors-with-high-user-impact)

Some errors heavily affect power users. Others affect everyone, but rarely. Prioritize by unique user count, not just event count.

**[In Issues](https://sentry.io/orgredirect/organizations/:orgslug/issues/):** Search for `is:unresolved` and sort by **Users** to see which issues affect the most unique users.

**What to look for:**

* Issues affecting many unique users (e.g., more than 10 users indicates widespread impact)
* Issues affecting VIP or paying users (check user tags)
* Issues blocking core workflows (login, checkout, data access)

When you open an issue, the header shows the total number of unique users affected. For more detail, review the `user` tag distribution to see:

* Unique user identifiers (user ID, email, or IP)
* How many events each user triggered
* Percentage breakdown across users

This tells you if an issue affects many users equally or if one user is stuck in an error loop.

Learn more about [custom tags](https://docs.sentry.io/platform-redirect.md?next=%2Fenriching-events%2Ftags%2F) to mark user tiers, plans, or roles. Then search `is:unresolved user.tier:enterprise` to prioritize high-value users.

**Alert idea:** Trigger when unique user count exceeds a threshold in a time window (e.g., more than 50 users in 1 hour) to catch widespread issues.

### [5. User-Reported Issues](https://docs.sentry.io/guides/issues-errors.md#5-user-reported-issues)

When users report problems, they often see an error. User feedback tells you which errors hurt the experience most, even if event counts are low.

Enable the [User Feedback Widget](https://docs.sentry.io/platforms/javascript/user-feedback.md) to let users report problems directly when errors happen.

**[In Issues](https://sentry.io/orgredirect/organizations/:orgslug/issues/):** Navigate to **User Feedback** in the left sidebar to see reports submitted by users.

**What to look for:**

* User descriptions of what they were doing when the error occurred
* Patterns in feedback about specific workflows or features
* Issues that frustrate users even if they don't generate many events

**Alert idea:** Trigger when a new issue is created, filtered to issue category equals feedback. This ensures you respond quickly when users report problems.

## [Error Handling Strategy](https://docs.sentry.io/guides/issues-errors.md#error-handling-strategy)

### [Capture Context, Not Just Exceptions](https://docs.sentry.io/guides/issues-errors.md#capture-context-not-just-exceptions)

When you catch an error, add tags and context to make debugging instant. Set user info globally so it applies to all events. Enable [Session Replays](https://docs.sentry.io/product/explore/session-replay.md) and [Logs](https://docs.sentry.io/product/explore/logs.md) for even more visibility.

```javascript
// Set user globally (e.g., after login)
Sentry.setUser({ id: user.id, email: user.email });

// Add tags and context per-event
Sentry.captureException(error, {
  tags: {
    order_id: order.id,
    payment_gateway: "stripe",
    region: user.region,
  },
  contexts: {
    order: {
      total: order.total,
      items: order.items.length,
      discount_code: order.discountCode,
    },
  },
});
```

**Search in Sentry:** `order_id:order_123` or `payment_gateway:stripe region:us-west`

### [Ignore Known Noise](https://docs.sentry.io/guides/issues-errors.md#ignore-known-noise)

Some errors aren't actionable. Use [ignoreErrors](https://docs.sentry.io/platform-redirect.md?next=%2Fconfiguration%2Foptions%2F%23ignoreErrors) to filter them out.

```javascript
Sentry.init({
  dsn: "...",
  ignoreErrors: [
    "Non-Error promise rejection captured",
    /^Timeout of \d+ms exceeded$/,
  ],
});
```

You can also use [beforeSend](https://docs.sentry.io/platform-redirect.md?next=%2Fconfiguration%2Ffiltering%2F%23using-before-send) to filter errors dynamically:

```javascript
Sentry.init({
  beforeSend(event, hint) {
    // Ignore errors from browser extensions
    if (
      event.exception?.values?.[0]?.stacktrace?.frames?.some((frame) =>
        frame.filename?.includes("chrome-extension://"),
      )
    ) {
      return null;
    }
    return event;
  },
});
```

## [Quick Reference](https://docs.sentry.io/guides/issues-errors.md#quick-reference)

| View               | Search Query                     | Look For                              |
| ------------------ | -------------------------------- | ------------------------------------- |
| High-volume issues | `is:unresolved` (sort by Events) | High event counts, post-deploy spikes |
| New regressions    | `is:unresolved` (sort by Age)    | Issues that first appeared recently   |
| Environment issues | `environment:production`         | Prod-only config or data issues       |
| High user impact   | `is:unresolved` (sort by Users)  | Issues affecting many users           |

## [Next Steps](https://docs.sentry.io/guides/issues-errors.md#next-steps)

Explore the [Issues product walkthrough guides](https://docs.sentry.io/product/issues.md) to learn more about the Sentry interface and discover additional tips.
