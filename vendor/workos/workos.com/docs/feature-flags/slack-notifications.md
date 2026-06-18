# Slack Notifications

## Introduction

Feature flags give teams precise control over feature releases. The WorkOS app for Slack sends real-time notifications throughout your feature flags' lifecycle, from creation and enabling to deletion. This keeps all stakeholders informed about critical changes, such as when a feature flag is enabled for specific customers or organizations.

***

## Configure your Slack connection

To set up Slack notifications, navigate to [*Feature Flags*](https://dashboard.workos.com/environment/flags) and click *Enable Slack notifications*.

![A screenshot showing the WorkOS Dashboard Feature Flags page](https://images.workoscdn.com/images/840a7450-12bf-4d8d-ba12-b30da70912d7.png?auto=format\&fit=clip\&q=50)

Next, click *Connect to Slack* to go to the Slack Installation page.

![A screenshot showing the WorkOS Dashboard Slack notifications dialog when no connection exists](https://images.workoscdn.com/images/7b873377-4847-43ae-a7ba-bf50b25d9f5e.png?auto=format\&fit=clip\&q=50)

Finally, select the channel that you'd like to get your notifications in. By default, notifications are sent for all production environments in your WorkOS account.

![A screenshot showing the Slack installation page](https://images.workoscdn.com/images/83ed7c7f-1e27-4b52-b20e-6439cec854a9.png?auto=format\&fit=clip\&q=50)

***

## Slack notifications

Once your Slack notifications are enabled, you'll start to receive messages in the configured channel for all feature flag events.

### Flag lifecycle events

- A flag is created
- A flag's details are updated (name, description, tags)
- A flag is deleted

![Sample message of a flag created event](https://images.workoscdn.com/images/1bc973f6-f879-4c71-8f0a-fd3eece4f252.png?auto=format\&fit=clip\&q=50)

### Rule updates and targeting changes

- A flag is enabled or disabled
- Targeting is changed between All, Some, or None
- Specific users or organizations are added or removed

![Sample message of a flag enabled for some event](https://images.workoscdn.com/images/9613033e-f313-449d-bbd3-9bcff85af2c2.png?auto=format\&fit=clip\&q=50)

***

## Disconnect an existing connection

To disable notifications or to change your configured Slack channel, you must disconnect the existing connection. To start, navigate to [*Feature Flags*](https://dashboard.workos.com/environment/flags) and click *Connected to Slack*.

![A screenshot showing the WorkOS Dashboard Slack notifications dialog for an existing connection](https://images.workoscdn.com/images/1c2e2fad-af7a-48a4-8b93-75b93653ed2b.png?auto=format\&fit=clip\&q=50)

Next, click *Disconnect* and confirm to disable Slack notifications to the listed channel.
