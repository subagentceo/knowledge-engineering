---
title: "Integration Platform"
description: "Learn how to create integrations so that external services can interact with Sentry."
url: https://docs.sentry.io/integrations/integration-platform/
---

# Integration Platform

Sentry’s integration platform provides a way for external services to interact with Sentry using [webhooks](https://docs.sentry.io/integrations/integration-platform/webhooks.md), [UI components](https://docs.sentry.io/integrations/integration-platform/ui-components.md), and the [REST API](https://docs.sentry.io/api.md). Integrations using this platform are first-class actors within Sentry.

## [Example App](https://docs.sentry.io/integrations/integration-platform.md#example-app)

If you're new to the integration platform, it might help to get started with an example project. To help you out, we've built an [example application](https://github.com/getsentry/integration-platform-example), which you can use as a starting point. It demonstrates the different features and data available for your application:

It's a kanban application that uses many of the features available to Sentry integrations and it provides starter code in both Python and TypeScript. It also includes a step-by-step guide to setting up your first integration, as well as documentation and testing advice. Typically, the app should be safely consuming live Sentry data within minutes.

## [Creating an Integration](https://docs.sentry.io/integrations/integration-platform.md#creating-an-integration)

In [sentry.io](https://sentry.io), navigate to **Settings > Developer Settings**. From here, you can choose to create an [internal](https://docs.sentry.io/integrations/integration-platform/internal-integration.md) or [public](https://docs.sentry.io/integrations/integration-platform/public-integration.md) integration. Internal integrations can only be used by your organization, whereas public integrations can be published and are available for all Sentry users.

There are several configuration options for your integration, which are described briefly below. Each section provides links to more detailed information.

## [Webhooks](https://docs.sentry.io/integrations/integration-platform.md#webhooks)

Webhooks allow your service to get requests about specific resources, depending on your selection. For more information, check out the [full Webhooks documentation](https://docs.sentry.io/integrations/integration-platform/webhooks.md).

In order to receive webhook events, you must specify the webhook URL when creating an integration. After you've specified the webhook URL, you'll be able to toggle on "Alert Rule Action" and create issue and metric alerts that send notifications to your integration.

## [UI Components](https://docs.sentry.io/integrations/integration-platform.md#ui-components)

The Sentry integration platform provides the ability to add rich UI components to [sentry.io](https://sentry.io) itself through a simple, declarative syntax. For more information, check out the [full UI Components documentation](https://docs.sentry.io/integrations/integration-platform/ui-components.md).

## [Alerts](https://docs.sentry.io/integrations/integration-platform.md#alerts)

You can make any integration available as an action in [issue alerts](https://docs.sentry.io/integrations/integration-platform/webhooks/issue-alerts.md) and [metric alerts](https://docs.sentry.io/integrations/integration-platform/webhooks/metric-alerts.md) by enabling the "Alert Rule Action" toggle. The integration will then show up as a service in the action section when creating or updating an alert rule. The interactive demo below shows how to set up an integration that can receive Sentry alerts.

For your service to receive webhooks for alert rules, you must have `Send a notification via <your integration>` as an action in the rule. Once that's set up, you'll start receiving webhook requests for triggered alerts. For more information about the request and payload, check out the [full Webhooks documentation](https://docs.sentry.io/integrations/integration-platform/webhooks.md). If you'd like users to provide more app-specific information to handle these webhooks (e.g. assignees, teams, notification channels), consider implementing the [alert rule action UI component](https://docs.sentry.io/integrations/integration-platform/ui-components/alert-rule-action.md).

## [Permissions](https://docs.sentry.io/integrations/integration-platform.md#permissions)

Permissions specify what level of access your service requires of Sentry resources. The scopes are directly applied to any API tokens issued to the application. For public integrations, Sentry will prompt users to approve these permissions upon installation. For more information, check out the [full documentation on Permissions](https://docs.sentry.io/api/permissions.md).

You can't create an integration or change an existing integration to have permissions greater than your own user settings. Permissions are scoped to the organization, so adding scopes for issues and events, projects, or teams will enable access to issues and events, projects, or teams across the organization.

## [Auth Tokens](https://docs.sentry.io/integrations/integration-platform.md#auth-tokens)

Auth tokens are passed using an auth header, and are used to authenticate as a user account with the API. [Public integrations](https://docs.sentry.io/integrations/integration-platform/public-integration.md) require an OAuth flow for tokens. [Internal integrations](https://docs.sentry.io/integrations/integration-platform/internal-integration.md) automatically generate tokens after installation. For more information, check out the [full Authentication documentation](https://docs.sentry.io/api/auth.md).

## [Learn More](https://docs.sentry.io/integrations/integration-platform.md#learn-more)

* #### [Public Integrations](https://docs.sentry.io/integrations/integration-platform/public-integration.md)

  Learn more about public integrations, which are available to all Sentry users.

* #### [Internal Integrations](https://docs.sentry.io/integrations/integration-platform/internal-integration.md)

  Learn more about internal integrations, which are custom-made for your organization.

* #### [Webhooks](https://docs.sentry.io/integrations/integration-platform/webhooks.md)

  Learn more about Sentry's integration platform webhooks and how they allow your service to receive requests about specific resources, such as installation, issues, and alerts.

* #### [UI Components](https://docs.sentry.io/integrations/integration-platform/ui-components.md)

  Learn more about Sentry's integration platform User Interface (UI) components.

## Pages in this section

- [Public Integrations](https://docs.sentry.io/integrations/integration-platform/public-integration.md)
- [Internal Integrations](https://docs.sentry.io/integrations/integration-platform/internal-integration.md)
- [Webhooks](https://docs.sentry.io/integrations/integration-platform/webhooks.md)
- [UI Components](https://docs.sentry.io/integrations/integration-platform/ui-components.md)
