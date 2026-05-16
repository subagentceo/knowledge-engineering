# Service Level Preferences

> \[!WARNING]
>
> This feature is in Public Beta and available in [@twilio/flex-ui@1.27.0](/docs/flex/release-notes/ui-release-notes) and later. In order to be able to configure the preferences, the **Real-Time SLA Metrics** features should be enabled in **[Feature Settings](https://flex.twilio.com/admin/)** under the **Beta** tab. Starting in 1.30.2, you can access the Metrics page from the [Flex Admin dashboard](https://flex.twilio.com/admin/) under **Service Levels**.

Users with the `admin` role can use Service Level Preferences (SLPs) to customize how metrics in the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) are calculated. Custom preferences can be set for each queue and each channel in a queue, and this enables you to align metrics calculation to your unique business KPIs.

![Twilio Flex service levels showing global settings and custom queue configurations with reset times.](https://docs-resources.prod.twilio.com/e4552fc03e9aa9120cdc9371540428e1ef66e8d78d68358ef20f14f18f978b05.png)

To access the **Service Levels** page, select **Configure Service Levels** from the Flex **Admin** page.

## Preferences

The following SLPs are available:

* **Daily Metrics Reset** — The time of day and time zone that determine when the metrics in the Today time frame are reset. You can use a geographical time zone that takes local time changes into consideration. For example, Daylight Savings Time. This preference can be set individually for every queue.
* Changes to **Daily Metrics Reset** are not applied until the next time a task is received. Consider creating a test task to ensure that your changes are applied right away.

  > \[!WARNING]
  >
  > When you update `reset_time`, your update might cause Today metrics to show more than 24 hours of data. If the current reset time is 5:00am and you update it to 7:00am, but no tasks come in until 8:00am, the day won't reset at 7:00am because your change didn't take effect. As a result, the Today metrics will show 26 hours of data, from 5:00am through 7:00am the next day.
* **Service Level Threshold** — The time the customer will spend in a queue to be counted as handled within the Service Level Agreement (SLA). All customers that connect to an agent sooner than this threshold are counted as handled within the SLA. All customers that wait longer than this threshold are counted as handled outside the SLA. This preference can be set individually for every queue-channel combination.
* **Short Abandons** — The time the customer will spend in a queue before giving up without impacting the SLA. This preference can be set individually for every queue-channel combination.

> \[!WARNING]
>
> Changes to **Service Level Threshold** and **Short Abandons** SLPs apply to customers that are still waiting in a queue after the change is saved. We recommend to change these preferences before or after a shift. Changes during a shift may reduce the clarity of real-time reporting.

## Global service levels

Global service levels display at the top of the **Service Levels** page. Flex uses global service level preferences for any queue and queue-channel combination that does not have custom preferences set up. All newly created queues and channels use global service levels by default.

We recommend to set your global service level preferences to values that are applicable for most of your queues and channels. You can then use Custom service level preferences to define exceptions.

### Modify global preferences

1. From the **[Service Levels](https://flex.twilio.com/admin/sla-preferences)** page, select **Edit** in the top-right corner:

   ![Twilio Flex global service level settings with daily metrics reset, service level threshold, and short abandons.](https://docs-resources.prod.twilio.com/55bff882827a22376618f08287e9415380dc8af45638239aea4fa96191f2f4c6.png)
2. Implement your changes then select **Save**.
3. Ensure that you understand the changes in reporting, especially if you make the changes during a shift. Click **Confirm**:

   ![Confirmation dialog to change global service level with options to cancel or confirm.](https://docs-resources.prod.twilio.com/d464133a6144a58f76878ea813e29ac1fa51fc721065d9debc3b54f39d09b9db.png)

## Set custom Service Level Preferences

You can set custom SLPs for a specific queue or for any queue-channel combination. Once set, custom SLPs are shown on the **Service Levels** page. Queues and queue-channel combinations that do not have a custom preference are marked **Global**.

1. From the [**Service Levels**](https://flex.twilio.com/admin/sla-preferences) page, select a queue in the table.
2. Click **Set custom time** to customize the **Daily Metrics Reset** for the queue. We recommend setting the time of day to a few hours before the shift starts for this queue. The time zone is typically set to either the agent location or the location of customers you are serving with your contact center.
3. Click **Add custom levels** to customize thresholds for **Service Level Thresholds** and **Short Abandons** in this queue. You can set limits for each channel in the queue. Channels that do not have custom settings use global preferences:

   ![New York queue custom service levels with options to set daily metrics reset and custom channel service levels.](https://docs-resources.prod.twilio.com/2e35ecc2339d0c7fd92b3a9d1363dbe0334c9925fd90c086ad6a6fe8ee3dc02c.png)
4. Click the **Remove** button on any custom preference that you want to remove and use the global setting instead:

   ![New York queue custom service levels with daily metrics reset at 08:00 and thresholds for chat and voice.](https://docs-resources.prod.twilio.com/842876872ebf3aeebbc16ad61fabd708110cd47e29a24e4419f410e326c404ac.png)
5. Click **Save** to apply all changes.
