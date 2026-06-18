---
title: "AI in Sentry"
description: "Learn about Sentry's AI-powered features that help you analyze and debug your code faster."
url: https://docs.sentry.io/product/ai-in-sentry/
---

# AI in Sentry

Sentry leverages artificial intelligence (AI) and machine learning (ML) to enhance your debugging and monitoring experience. Our AI-powered features help you understand issues faster, get automated fixes, and gain deeper insights into your application's behavior.

## [AI-Powered Features](https://docs.sentry.io/product/ai-in-sentry.md#ai-powered-features)

### [Seer](https://docs.sentry.io/product/ai-in-sentry.md#seer)

[Seer](https://docs.sentry.io/product/ai-in-sentry/seer.md) is Sentry's AI debugging agent that helps resolve errors and performance issues in your applications. Seer combines issue detection, analysis, and automated fixing capabilities to streamline your debugging workflow. Seer is an [add-on](https://docs.sentry.io/pricing.md#seer-pricing) to your Sentry subscription.

Use Seer to:

* **[Fix Issues](https://docs.sentry.io/product/ai-in-sentry/seer/autofix.md)**: Use Autofix to find root causes and generate suggested code fixes for errors and performance issues, or hand off to a [coding agent](https://docs.sentry.io/product/ai-in-sentry/seer/autofix.md#handoff-to-claude-code-or-cursor-cloud-agents).
* **[Investigate Problems](https://docs.sentry.io/product/ai-in-sentry/seer.md#seer-agent)**: Ask Seer Agent questions about your application and Seer Agent will do the digging. Walk through complex production problems with Seer Agent reasoning through evidence in real time.
* **[Review Code Changes](https://docs.sentry.io/product/ai-in-sentry/seer/code-review.md)**: Have Seer review your code changes in GitHub or GitLab, catching bugs before merging.

### [Issue Summary](https://docs.sentry.io/product/ai-in-sentry.md#issue-summary)

**Issue summary** provides a quick overview of an issue by highlighting key insights taken from event and issue-level metadata. You'll see a quick overview of what's going wrong, a potential cause, and if relevant, insights from trace-connected issues.

### [Query Assistant](https://docs.sentry.io/product/ai-in-sentry.md#query-assistant)

You can ask Seer to query your traces and spans data via natural language queries and find relevant samples of compute metrics without building the whole query manually. Or, if you want to ask wider questions across all data, ask [Seer Agent](https://docs.sentry.io/product/ai-in-sentry/seer.md#seer-agent).

### [AI Issue Detection](https://docs.sentry.io/product/ai-in-sentry.md#ai-issue-detection)

Sentry can analyze your traces and logs using AI to automatically detect HTTP, database, runtime performance, security, and code health issues that traditional detectors can't catch. [Learn more about AI-detected issues](https://docs.sentry.io/product/issues/issue-details/ai-detected-issues.md).

### [AI Summaries](https://docs.sentry.io/product/ai-in-sentry.md#ai-summaries)

See a summary of [User Feedback](https://docs.sentry.io/product/user-feedback.md) and [Session Replays](https://docs.sentry.io/product/explore/session-replay.md) to identify common issues and patterns.

## [Privacy and security](https://docs.sentry.io/product/ai-in-sentry.md#privacy-and-security)

Sentry includes strong guarantees for privacy and security of your data. At a glance:

* Sentry does not train generative AI models using your data by default and without your permission.
* AI-generated output is shown only to you and other authorized users in your account.

You can get more details at [AI Privacy and Security](https://docs.sentry.io/product/ai-in-sentry/ai-privacy-and-security.md). To learn more about all our data privacy practices go to [the security and legal docs](https://docs.sentry.io/security-legal-pii/security/ai-ml-policy.md#use-of-identifying-data-for-generative-ai-features).

## [Disabling Generative AI Features](https://docs.sentry.io/product/ai-in-sentry.md#disabling-generative-ai-features)

* If you want all generative AI features to be disabled for all users in your organization, you can do so in your organization's settings with the ["Show Generative AI Features" toggle](https://sentry.io/orgredirect/organizations/:orgslug/settings/#hideAiFeatures).

* If you want to use some generative AI features, while disabling others, go to [Seer settings](https://sentry.io/orgredirect/organizations/:orgslug/settings/seer/). For organizations that need to prevent code generation, like creating and pushing PRs, or adding additional context in Alerts, you can find these configurations under [Advanced Settings](https://sentry.io/orgredirect/organizations/:orgslug/settings/seer/advanced/#enableSeerCoding) in Seer settings.

**Note:** Disabling the setting removes the **Create PR** button from the Autofix flow and prevents anyone from enabling **Allow Root Cause Analysis to create PRs by Default**. Sentry will not create PRs or push code to your codebase. This setting does not impact AI chat sessions, where you can potentially prompt our AI chat to emit code snippets and examples, and does not affect workflows involving your own coding agent.

## Pages in this section

- [Seer](https://docs.sentry.io/product/ai-in-sentry/seer.md)
- [AI Privacy Principles](https://docs.sentry.io/product/ai-in-sentry/ai-privacy-and-security.md)
