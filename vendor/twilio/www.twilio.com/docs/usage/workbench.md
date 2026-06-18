# Twilio Workbench

The Twilio Console includes the Twilio Workbench. This developer hub provides the tools and insights you need most within your workflow. To debug and trace issues across all Twilio products and channels, use the Twilio Workbench.

In the Twilio Console, Workbench includes three primary tabs:

* [**Overview**](#overview-tab): Provides quick access to your Auth token and frequently used Console destinations.
* [**Debugger**](#debugger): Used for investigating errors and warnings.
* [**Alarms**](#alarms): Used for monitoring application health.

> \[!NOTE]
>
> Twilio Workbench appears in the Twilio Console, not the legacy Twilio Console.

## Getting started

Workbench appears as a tab at the bottom of the Twilio Console. To open the Workbench, click the tab from any page in the Twilio Console.

To resize, dock, or minimize the panel, use the controls found in the top-right corner of the Workbench.

You can dock Workbench at the bottom or right side of the Console.
The Workbench tab appears on all Twilio Console pages.

## Overview tab

The **Overview** tab provides immediate access to your account credentials and navigation shortcuts.

### API credentials

This section displays your Account SID and Auth Token. For security, Twilio masks the Auth Token.

* To reveal the token, click the eye icon.
* To copy it to your clipboard, click the copy icon.

### Quick actions

To go to a page while the Workbench remains open, click one of the following quick-action buttons:

* Home
* Messaging
* Buy a Number
* Phone Numbers
* Messaging Logs
* API Keys
* Debugger
* Usage
* Docs

## Debugger

Twilio debugging tools help investigate the interactions between Twilio and your app. When message can't go through, gets delayed, or otherwise behaves unexpectedly, investigate the underlying issues with these tools.

The **Debugger** tab displays the following information.

### Trend chart

The trend chart displays a bar chart of event volume over a set period, which you can adjust. By default, it covers the last 24 hours and breaks down the data into hourly intervals.

### Event list

The Event list displays a list of errors and warnings in your application. These logs help you understand how your app is working and where problems might be.

Workbench displays events in descending chronological order and include the following data points:

* The error code
* An error description, such as `HTTP retrieval failure`
* The time the event happened in your local time

Click an event in the Debugger to view its details in Console. This includes timestamps, your resource SID, and any warnings or errors thrown by Twilio.

The detail view lists possible causes, suggested fixes, and—when applicable—lets you replay the request.

To open the Debugger page in Console, click **Open Debugger**.

## Alarms

To monitor alarms that you've set up in the Twilio Console, use the **Alarms** tab in Workbench. This feature can trigger customized notifications based on spikes in error rates. This provides proactive monitoring of your app.

> \[!NOTE]
>
> Alarms are available only for customers in US1.

### Alarm logs

To view the alarm history in chronological order, click **Alarm logs** in Workbench.

Alarm history doesn't include alarms from subaccounts. Each account has separate alarms.

Click an alarm occurrence to open its alarm history details page, which shows when the alarm was triggered and lists troubleshooting steps.

Email notifications include a link to the alarm history details page, allowing you to access the information directly.

Each alarm displays:

* Status badge (**Active** displays in red, and **Recovered** in green)
* Alarm name
* Product scope and error rate threshold info (for example, "Multiple · threshold 1")
* Timestamp

Clicking an alarm displays alarm details such as when the alarm was triggered, the metrics involved, recovery status, and more. This page also shows related error code details, historical trends, possible causes, and suggested actions.

### Manage alarms

The **Manage alarms** sub-tab displays alarm configurations with summary statistics:

* Total alarms configured
* Total alarms enabled
* Alarm description displaying name, description, product category, and an ON/OFF status

Select an alarm to modify settings, add email notifications, save, or delete the alarm.

## FAQs

### How do I prevent Workbench from blocking my view?

If Workbench blocks your view, minimize the panel. To minimize the panel, use the down-chevron icon or dock the panel.

### Why don't I see my alarms?

You might need to configure alarms for your Twilio account.

### Why don't I see my Debugger events?

Events depend on recent API activity. Without errors, the event list appears empty. Review the time filter on the Debugger chart. It defaults to **Last 24 hours**.
