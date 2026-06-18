# Alerts for contact center metrics in Flex (public beta)

> \[!IMPORTANT]
>
> Alerts is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a SLA.

## Overview

Alerts help supervisors monitor real-time queue metrics for issues in contact center performance and customer experience. From the [**Queues stats monitoring** page](https://flex.twilio.com/queues-stats/), supervisors see highlighted metrics that need attention so they can quickly identify which metrics or queues to prioritize.

As an admin, you can also create [notifications for alerts](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#notifications-for-alerts) to inform supervisors right away when there are issues.

This page explains how admins can configure alerts and notifications.

* [Alert](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#alerts): A condition when a metric has reached the critical or warning threshold that you set. Until the alert is resolved, the affected metric, queue, or channel is highlighted on the queues stats monitoring page.
* [Notification](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#notifications-for-alerts): A message sent to supervisors to let them know about new alerts.

This feature is available for [Flex UI 2.13.0 or later](https://console.twilio.com/us1/develop/flex/settings/ui-versions).

### Supported channels

* Voice
* SMS
* Chat
* Email

## Alerts

Alerts inform supervisors when a metric, queue, or channel on the queues stats monitoring page has reached a critical or warning threshold.

* **Warning**: An issue is developing.
* **Critical**: An issue requires you to take immediate action.

Each alert is for a specific metric, channel (if applicable), and queue.

![Queues stats page showing alerts for customer service and expert services with waiting times and health status.](https://docs-resources.prod.twilio.com/a8b396fdd4afaf6878f1089b6f753fd1552c6d0ae44f254c5e39f7bd1a097cef.png)

For more information on how supervisors experience alerts and notifications in Flex UI, see [Queues stats monitoring](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view#alerts-public-beta).

## Notifications for alerts

When a metric exceeds its threshold, you can notify supervisors with a:

* Flex inbox notification
* Pop-up message in Flex
* Browser push notification
* Email
* Webhook notification (to any endpoint, such as Slack or your own system)

You can choose up to 10 users to send notifications to. To manage the volume and frequency of notifications that users receive, you can also choose when to trigger notifications: instantly or only if an alert stays at a critical or warning level for up to 15 minutes.

### Flex inbox notifications

Supervisors can see all notifications in the **Notifications** panel on the queues stats monitoring page. The notifications icon shows the number of unread messages.

By default, only unread messages and notifications for **Unrecovered** metrics (metrics that are still in the warning or critical stage) are displayed in the inbox. You can filter by **Status** and **Notification** to change this.

For each message, click **View details** to go to the real-time queues stats page.

### Pop-up message in Flex

Supervisors see a pop-up notification in the top right corner of Flex. The message shows the severity of the alert and which queue, metric, and channel are impacted. The message automatically disappears after 8 seconds.

### Browser push notifications

Browser push notifications alert supervisors of an issue when they're working outside of Flex. Supervisors see a browser push notification if they switch to another browser tab or minimize their browser.

​We recommend using Google Chrome as the [supported browser](https://www.twilio.com/docs/flex/developer/ui/requirements#software-requirements). Make sure that browser notifications are also turned on in a user's computer system settings.

If you want browser push notifications to appear when a supervisor is using Flex, set the notification property mode to `always` in your Flex
configuration settings using [REST APIs](/docs/flex/developer/config/flex-configuration-rest-api#update-your-configuration). The default setting for this property is
`whenNotInFocus`.

### Email

To email alert details to supervisors or users, enter up to 10 email addresses separated by commas.

**Note**: Flex doesn't validate email addresses. Make sure you check the email addresses you enter so that users receive notifications.

### Webhook notifications

Webhooks allow you to trigger notification events in your internal systems (such as Slack), send SMS messages, or post to business messaging platforms. When a metric threshold is breached, Twilio sends an HTTP request to the webhook URL you specify in Console or using the API.

* For Slack, see [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks).
* For security, always validate that incoming webhook requests originate from Twilio using [the request signature](/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio).

#### Webhook payload

When a notification event is triggered, the following example payload is sent to the webhook URL:

```json
{
  "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "state": "WARNING",
  "alertId": "2025-09-19:ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:01k5gagzpgfgjrcwe2m2w39y8m",
  "queueSid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channelSid": "",
  "queueName": "Custom Queue",
  "taskChannelName": "",
  "pipelineKey": "activity_stats",
  "createdAt": "2025-09-19T06:27:59Z",
  "thresholdValue": "1",
  "metricValue": "3",
  "metricName": "Offline Agents"
}
```

#### Payload properties

| Parameter         | Description                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `accountSid`      | Unique identifier for the Flex account                                                                         |
| `state`           | Severity of the alert (`CRITICAL`, `WARNING`, or `RESOLVED`)                                                   |
| `alertId`         | Unique identifier for the alert                                                                                |
| `queueSid`        | Unique identifier for the affected queue                                                                       |
| `channelSid`      | Unique identifier for the affected task channel                                                                |
| `queueName`       | Name of the affected queue associated with the `queueSid`                                                      |
| `taskChannelName` | Name of the affected task channel associated with `channelSid`                                                 |
| `pipelineKey`     | Metric time window. Possible values: `tasks_now`, `tasks_thirty_minutes`, `tasks_today`, and `activity_stats`. |
| `createdAt`       | Timestamp when the alert was triggered (YYYY-MM-DDTHH:MM:SSZ in UTC)                                           |
| `thresholdValue`  | Threshold value that was breached                                                                              |
| `metricValue`     | Metric value at the time the alert was triggered                                                               |
| `metricName`      | Name of the metric that triggered the alert                                                                    |

## Enable the alerts feature in Console

Only Flex admins can manage alerts. [Read-only admins](/docs/flex/admin-guide/setup/flex-ui-users/read-only-admin-role) and supervisors cannot enable the alerts feature.

1. From [Twilio Console](https://console.twilio.com/), go to **Flex** > **Performance and reporting** > **Alerts**.
2. Turn on **Enable alerts**.

If you turn off **Enable alerts**, then alerts become inactive in Flex UI, but your alert rules remain in case you want to enable them again.

## Create an alert

You can have up to 100 alerts per Flex account.

### Step 1: Create alert details

1. From  [Twilio Console](https://console.twilio.com/), go to **Flex** > **Performance and reporting** > **Alerts**.
2. Click **Create alert**.
3. Under **Details**, add the following:
   1. **Friendly name**: The alert name. For example, "Critical missed invitations."
   2. **Metric**: The metric to highlight on the queues stats page.
   3. **Channel**: The channel you'll be alerted about.
   4. **Queue**: The queue you'll be alerted about. You can select up to 20 queues.
4. Click **Next**.

### Step 2: Create thresholds

When you create a threshold, you set values for a metric so that an alert is triggered when the metric goes above or below that value.

1. Under **Thresholds**, choose to set a **Warning threshold**, a **Critical threshold**, or both.
   1. Under **Operator**, select **Greater than** or **Less than**.
   2. Under **Value**, enter a numeric value to trigger the alert.
2. Click **Next**.

### Step 3: Create notifications (optional)

We recommend that you create notifications to alert supervisors when they're away from the queues stats monitoring page.

1. Under **Notifications**, turn on **Send notifications**.
   1. Under **Send a notification when this alert reaches**, select **Warning threshold** or **Critical threshold**.
   2. Under **Don't send a notification until this alert has been active for**, set how long the alert should be active for before triggering a notification. **Tip**: If you want to instantly receive a notification, set the value to `0`.
   3. Under **Notification method** > **Show Flex inbox notifications to these users**, select the Flex users who should receive notifications.
      1. Optionally, turn on **Also show [pop-up notifications](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#pop-up-message-in-flex)** and **Also show [browser push notifications](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#browser-push-notifications)**.
   4. Optionally, turn on **Show webhook notifications with this URL** to send notifications to any webhook endpoint.
      1. Enter a webhook URL for where you'd like notifications to be sent. This can be a Slack webhook URL for posting to a Slack channel or any other webhook endpoint that accepts HTTP `POST` requests.
      * For Slack, see [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks). **Tip**: When creating a Slack app, add a name and logo that matches your contact center so supervisors can quickly recognize the notification in Slack.
      * For security, always validate incoming requests to your webhook endpoint using [the request signature from Twilio](/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio).
   5. Optionally, turn on **Send email notifications to these users** and enter up to 10 email addresses separated by commas.
2. Click **Create alert**.

Your new alert is automatically activated and appears on the [**Alerts** page](https://console.twilio.com/us1/develop/flex/manage/alarm-center) in Console. If you set up notifications, a notification icon appears next to the alert name.

## Edit an alert

You can edit all alert settings except **Metric**. If you need to change the metric for an alert, you must [create a new alert](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics#create-an-alert) instead.

1. From the **Alerts** page, in the **Friendly name** column, click an alert.
2. Update your alert settings.
3. Click **Update alert** to apply your changes.

## Delete an alert

1. From the **Alerts** page, click the trash can icon for the alert you want to delete.
2. From the confirmation message, click **Delete alert**.

You can also delete alerts from the **Edit alert** page.

## Configure with the API

You can programatically configure notifications and alert rules using the [Notification configurations resource](/docs/flex/developer/alerts/notifications-api) and the [Insights rules resource](/docs/flex/developer/alerts/alerts-insights-api).
