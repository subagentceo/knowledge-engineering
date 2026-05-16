---
title: "Getting Started With Sentry"
description: "Learn about our recommendations for getting the most out of Sentry."
url: https://docs.sentry.io/product/sentry-basics/
---

# Getting Started With Sentry

Sentry is a developer-first error tracking and performance monitoring platform. If you haven't already:

**→ [Sign up for Sentry here](https://sentry.io/signup/)**

## [How to Get the Most Out of Sentry](https://docs.sentry.io/product/sentry-basics.md#how-to-get-the-most-out-of-sentry)

There are three things we recommend you do to get the most out of Sentry:

* **Connect your codebase**, making sure you've also set up [source code management integrations](https://docs.sentry.io/integrations/source-code-mgmt.md) and [source maps](https://docs.sentry.io/product/sentry-basics/integrate-frontend/upload-source-maps.md) (if applicable). This will allow Sentry to link errors and performance issues directly to the problematic line of code via readable stack traces and suspect commits.
* **Set up [alerts](https://docs.sentry.io/product/monitors-and-alerts/alerts.md)** to make sure you know when things you care about are going wrong. You can choose to be alerted via one of our chat integrations like [Slack](https://docs.sentry.io/integrations/notification-incidents/slack.md) or [Discord](https://docs.sentry.io/integrations/notification-incidents/discord.md). Check out our [alert best practices](https://docs.sentry.io/product/monitors-and-alerts/alerts.md#alerts-best-practices) to learn how to only get relevant notifications.
* **Customize [Discover](https://docs.sentry.io/product/explore/discover-queries.md), [Dashboards](https://docs.sentry.io/product/dashboards.md), and [queries](https://docs.sentry.io/product/explore/discover-queries/query-builder.md)** to better control the kinds of insights you get when things are going wrong in your app. Lastly, create [custom tags](https://docs.sentry.io/concepts/search/searchable-properties.md#custom-tags) tailored to your use case for more granular searching and querying.

**Want a TL;DR for getting started? Download our ["Developer Quick Reference Guide"](https://docs.sentry.io/pdfs/developer-quick-reference-guide.pdf)**

## [Tutorials: Distributed Tracing, Frontend and Backend Error Monitoring](https://docs.sentry.io/product/sentry-basics.md#tutorials-distributed-tracing-frontend-and-backend-error-monitoring)

Learn how to set up Sentry by following along with a step-by-step distributed tracing, frontend or backend tutorial.

* #### [Distributed Tracing Tutorial](https://docs.sentry.io/product/sentry-basics/distributed-tracing.md)

  Follow this tutorial to set up Sentry error monitoring and distributed tracing for a sample fullstack JavaScript application. By the end, you'll be able to trigger an error and a trace and see it in Sentry.io.

* #### [Performance Monitoring](https://docs.sentry.io/product/sentry-basics/performance-monitoring.md)

  Understand and monitor how your application performs in production. Track key metrics, analyze bottlenecks, and resolve performance issues with distributed tracing, detailed transaction data, and automated issue detection.

* #### [User Feedback Basics](https://docs.sentry.io/product/sentry-basics/user-feedback-basics.md)

  Learn how to configure and deploy Sentry's User Feedback widget to capture qualitative insights from your users.

* #### [Frontend Error Monitoring Tutorial](https://docs.sentry.io/product/sentry-basics/integrate-frontend.md)

  Follow this tutorial to set up Sentry for a sample React frontend application. By the end, you'll be able to monitor errors and view readable stack traces and suspect commits to help you identify and debug.

* #### [Backend Error Monitoring Tutorial](https://docs.sentry.io/product/sentry-basics/integrate-backend.md)

  Follow this tutorial to set up Sentry to monitor errors for a sample Python backend application. By the end, you'll be able to configure the SDK for your needs and enrich your event data.

## Pages in this section

- [Distributed Tracing Tutorial](https://docs.sentry.io/product/sentry-basics/distributed-tracing.md)
- [Performance Monitoring](https://docs.sentry.io/product/sentry-basics/performance-monitoring.md)
- [User Feedback Basics](https://docs.sentry.io/product/sentry-basics/user-feedback-basics.md)
- [Frontend Error Monitoring Tutorial](https://docs.sentry.io/product/sentry-basics/integrate-frontend.md)
- [Backend Error Monitoring Tutorial](https://docs.sentry.io/product/sentry-basics/integrate-backend.md)
