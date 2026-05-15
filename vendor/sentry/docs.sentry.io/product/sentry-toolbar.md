---
title: "Sentry Toolbar"
description: "Bring critical Sentry insights and tools directly into your web app for easier troubleshooting with the Sentry Toolbar."
url: https://docs.sentry.io/product/sentry-toolbar/
---

# Sentry Toolbar

The Sentry Toolbar is currently in **beta**. Beta features are still in progress and may have bugs. Please reach out on [GitHub](https://github.com/getsentry/sentry-toolbar/issues) if you have any feedback or concerns.

Developers spend a lot of time troubleshooting their web apps on local, staging, and production environments. The Sentry Toolbar pulls data from [sentry.io](http://sentry.io) and surfaces relevant, actionable issues to you when you have the most context for understanding it: as you browse your own site. The Sentry Toolbar is a floating widget in your web app, offering meaningful Sentry insights for the specific page being viewed through three different **page-aware** panels: Issues, Feedback, and Feature Flags.

## [Issues Panel](https://docs.sentry.io/product/sentry-toolbar.md#issues-panel)

The issues panel shows you your highest priority frontend [issues](https://docs.sentry.io/product/issues.md) for the page you are currently viewing. From the Sentry Toolbar, you can quickly jump into specific issues in Sentry to get more detailed information (examples: Sentry project, issue title, description, and when the issue was first and last seen) and take action (examples: assign to a team member or mark as resolved). With the issues panel, you can browse the pages that are most important to your business and understand the top issues impacting your user base.

## [Feedback Panel](https://docs.sentry.io/product/sentry-toolbar.md#feedback-panel)

The feedback panel shows you the most recent user feedback messages for the page you are on, so you can more easily contextualize it. The feedback often describes suboptimal experiences that are not strictly code-thrown errors, such as misleading UX, broken links, and typos. The feedback panel works by pulling feedback messages from [Sentry’s User Feedback Widget](https://docs.sentry.io/product/user-feedback.md#user-feedback-widget). Just like with the Issues panel, clicking on a particular user feedback will take you to the full detailed User Feedback page within Sentry.

## [Feature Flags Panel](https://docs.sentry.io/product/sentry-toolbar.md#feature-flags-panel)

Feature flags are a powerful tool that allow you to control the visibility of features in your app, enabling you to ship, test, and experiment with confidence. The feature flag panel allows you to quickly view and override feature flags locally. You can override any feature flag to be `true` or `false` for your browser session, so you can verify its behavior and observe the impact it might have on errors. Learn more about how to [configure the feature flag panel](https://docs.sentry.io/product/sentry-toolbar/setup.md#implement-feature-flag-adapter) and [what data Sentry can track](https://docs.sentry.io/product/explore/feature-flags.md) related to your feature flagging system.

## [Login Flow](https://docs.sentry.io/product/sentry-toolbar.md#login-flow)

After setting up the Sentry Toolbar you’ll see a “Login to Sentry” button floating in the center of the page. To access any information from your Sentry organization, you have to click this button and login to Sentry.

After clicking the button, you will see a pop-up window for logging in to Sentry.

If it's your first time [setting up the Sentry Toolbar](https://docs.sentry.io/product/sentry-toolbar/setup.md) , there will be a button with a link to Sentry's Toolbar settings page to configure your domain.

Learn more about setting up the Toolbar, including configuring a feature flag provider and integrating the toolbar in different environments, on the next page.

## Pages in this section

- [Set Up Sentry Toolbar](https://docs.sentry.io/product/sentry-toolbar/setup.md)
- [FAQ](https://docs.sentry.io/product/sentry-toolbar/faq.md)
