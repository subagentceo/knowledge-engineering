# Intelligent Alerts for Twilio Messaging

## Overview

Twilio proactively monitors the health of your messaging traffic by analyzing changes in error code volumes against your most recent SMS traffic. Our systems leverage a mix of rules and machine learning (ML) models to identify patterns in your real-time traffic and automatically configure dynamic thresholds based on your account's historical data and other signals from our messaging ecosystem. If an anomaly is detected, our systems will flag it for processing.

## Why Intelligent Alerts?

Intelligent Alerts take the burden away from having to configure alarms manually and setting thresholds that will give meaningful results. Our models identify anomalies in the volume of each supported error code and dynamically calculate thresholds per mobile network code (MNC) for the sub-account based on historical data.

## How to be notified of Intelligent Alerts

You can find the **Intelligent Alerts** settings by navigating to **Monitor > Insights > Messaging Intelligence > Intelligent Alerts > Manage notifications** in the Twilio Console:

## Console

Navigate to [Monitor > Insights > Messaging Intelligence > Intelligent Alerts](https://1console.twilio.com/us1/monitor/insights/intelligent-alerts) and click **Manage notifications**. From there, you can provide your preferred email addresses for real-time notifications and configure which alert types you want to be notified about.

## Legacy Console

Navigate to [Monitor > Insights > Messaging Intelligence > Intelligent Alerts](https://console.twilio.com/monitor/insights/intelligent-alerts) and click **Manage notifications**. From there, you can provide your preferred email addresses for real-time notifications and configure which alert types you want to be notified about.

For example, you can choose to receive notifications for [Message filtering (`30007`)](/docs/api/errors/30007) while excluding notifications for [Unknown destination handset (`30005`)](/docs/api/errors/30005). Even when email notifications for specific alert types are turned off, all detected alerts remain available for review on the Intelligent Alerts summary pages in Console.

The Intelligent Alerts dashboard displays:

* A summary of detected anomalies across your accounts
* Notification management controls for configuring email preferences
* Alert type toggles for enabling or disabling notifications per error code

## Solutions

### Anomaly detection

Intelligent Alerts provide proactive alerting when abnormal volume increases are detected in the following error codes:

* [Queue overflow (`30001`)](/docs/api/errors/30001)
* [Unknown destination handset (`30005`)](/docs/api/errors/30005)
* [Landline or unreachable carrier (`30006`)](/docs/api/errors/30006)
* [Message filtering (`30007`)](/docs/api/errors/30007)
* [Message delivery unknown error (`30008`)](/docs/api/errors/30008)

### Adaptive Thresholds

Thresholds are dynamically configured based on the most recent account data, ensuring that alerts are relevant and timely.

### Granularity

Monitoring is done at the sub-account level per mobile network code (MNC), providing detailed insights into your messaging traffic.

### Real-time analysis

Traffic is ingested in real-time as it becomes available to Twilio and analyzed in 5-minute intervals.

### Notifications

Alerts are delivered via email to the email addresses you specify. Customers can configure notification preferences by alert type, allowing them to receive emails only for the error codes most relevant to their operations. A one-hour "quiet period" is set up by default for alerts of the same type. Alerts resume if new anomalies are detected after the quiet period expires.

Email notifications also include a feedback mechanism so recipients can provide feedback directly within the email notification experience.

### Review in Twilio Console

An aggregated view of all anomalies detected in your accounts is available on the Intelligent Alerts summary page in the Twilio Console.

## Reviewing Intelligent Alerts

The main Intelligent Alerts page provides an aggregated view of all the Intelligent Alerts identified on your accounts. Global and page filters are incorporated into the page to help narrow down searches and streamline troubleshooting. This page offers links that allow you to configure their notification preferences and drill down into each of the anomalies in the Alert Details page.

The monitoring dashboard includes:

* **Global filters** at the top of the page for narrowing results
* **Summary banner** showing total anomalies and breakdown by Impact Category
* **Event table** listing individual alert details with sortable columns

### Using Global Filters

## Console

In the [Intelligent Alerts summary page](https://1console.twilio.com/us1/monitor/insights/intelligent-alerts), you have two filter options that carry through any current or future tabs in the Intelligence section:

## Legacy Console

In the [Intelligent Alerts summary page](https://console.twilio.com/monitor/insights/intelligent-alerts), you have two filter options that carry through any current or future tabs in the Intelligence section:

* **Time range**: You can choose from a range of predefined time periods. The Intelligent Alerts summary banner and the event table will update based on the user selection.
* **Sub-account**: Provide the sub-account SID or the sub-account name. All the Intelligent Alerts identified for that sub-account will be populated.

### Alert Impact Score and Impact Category

Intelligent Alerts automatically categorize anomaly events within three groups: Urgent, Important, and Warning. We use metrics such as deliverability rate, data sparsity, and traffic volume fluctuations, which are calculated in real-time from your most recent period of observation. Each of these metrics is weighted to calculate an Impact Score ranging from 0 to 1. After comparing them to your historical patterns, we can estimate the impact the anomalous event may have on your traffic.

Based on the calculated Impact Score, we map each anomaly to an Impact Category following this logic:

* **Urgent**: Impact score is > 0.80
* **Important**: Impact score is > 0.40 or \< 0.80
* **Warning**: Impact score is \< 0.40

Some anomalies may not fit into any of these categories as certain error codes we monitor do not appropriately fit into the logic above.

### Understanding the Impact Category section

Immediately after the global filters, you will find a summary section that provides a snapshot of all the alerts identified based on global filters applied. You will find the total number of anomalies for the time range to the far left and a breakdown of each alert into their specific Impact Category next to it. Below each category, you can see the percentage change from the prior period (based on the global time range filter).

### Intelligent Alerts summary table

You are presented with an aggregated view of all of their alerts based on the global filters applied. You can filter the table by event types, error code, or impact. An option to export a CSV file with the current page content is also available.

The summary table displays columns for:

* **Impact level** (Urgent, Important, Warning)
* **Error code** and description
* **Number of errors** detected
* **Date and time** of the anomaly
* **Sub-account** affected

### Intelligent Alerts details page

When selecting one of the alerts in the Summary table, you will be taken to the alert details for that alert. The Alert Details Page breaks down into the following sections:

* **Event Properties**: Specific to each alert.

  * **Impacted account friendly name**: Friendly name configured by the customer for the impacted Account SID.
  * **Impacted account**: The Account SID of the impacted account. Monitoring happens at the sub-account level, and in most cases, sub-account = Account SID unless a Parent Account has no sub-accounts.
  * **Alert ID**: Unique Alert ID given to the anomalous event.
  * **Day of anomaly**: Date in UTC for when the anomaly occurred.
  * **Time of occurrence**: Time window in UTC for when the anomaly occurred. Currently, anomalies are evaluated based on 5-minute evaluation windows.
  * **MCC/MNC**: Mobile Country Codes (MCC) and Mobile Network Codes (MNC).
  * **Carrier Route**: Carrier Name.
  * **Alert threshold**: Dynamic threshold calculated by the Intelligent Alerts platform based on the customer's own historical trends.
  * **Number of errors**: The sum of all of the errors in the 5-minute evaluation window for the impacted error code and carrier combination for which the anomaly was identified.
  * **Number of messages**: The sum of all of the outbound SMS in the 5-minute evaluation window for the impacted carrier route for which the anomaly was identified.
  * **Historical graph**: Shows the historical trends for the impacted Account SID. Note that the historical trend is based on the aggregation key, meaning that trends only look at messages and error codes for the carrier route identified as an anomaly.
  * **Possible causes**: A description of the possible causes for the anomaly.
  * **Possible solutions**: A list of the possible solutions for the anomaly.
  * **Error description**: Includes a high-level description and possible causes and solutions for the error code where the anomaly was identified.

  The Alert Details page displays all of the above properties in a structured layout, with the historical graph showing traffic trends and the possible causes and solutions listed below.

## Availability and pricing

The features currently available in Intelligent Alerts are offered free of charge.

Twilio is also evaluating more advanced and premium Intelligent Alerts capabilities that may unlock monitoring for additional use cases and provide expanded configurability.

If pricing for Intelligent Alerts changes in the future, Twilio will notify customers in advance.

## AI Nutrition Facts for Intelligent Alerts

[Twilio's AI Nutrition Facts](https://nutrition-facts.ai/) provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Intelligent Alerts' AI qualities are outlined in the following Nutrition Facts label. For more information and the glossary regarding the AI Nutrition Facts Label, refer to [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/).

The AI Nutrition Facts label for Intelligent Alerts documents the model's data inputs, processing methods, and output characteristics, providing transparency into how the anomaly detection system operates.

## Next steps and additional resources

Here are some possible next steps and additional resources to help you get started:

* [Twilio Programmable Messaging API Documentation](/docs/messaging/api)
* [Contact Twilio Support](https://help.twilio.com)
