# Workload Reporting

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

You can use Workload Reporting to get granular information about agent activity in a given day. Workload reporting slices conversations and [agent activity](/docs/taskrouter/api/activity) (agent status data) into 15-minute intervals to attribute the time an agent spent working on a conversation or in a given state. You can also segment Workload data by 30 minutes, 1 hour, and by date.

Workload data is updated after every load and reflects the data from the last finished time period. For example, hourly loads show Workload data for the complete hour that precedes the load. 15-minute loads show Workload data for the last complete 15-minute interval that precedes the load. This means that Workload data is also available for and may reflect conversations and activities that are still in progress.

> \[!NOTE]
>
> Segments in the Conversations data set that are still in progress have **Kind** set to **Conversation in Progress** or **Agent Status in Progress**. By default, Flex Insights excludes Segments that are in progress from workload reporting, as they do not have a final set of attributes and measures.

## Workload Reporting Data

Workload reporting uses data objects from the [Workload data set](/docs/flex/end-user-guide/insights/data-model#workload) and can be categorized into two types of workloads: Conversation Workload and Agent Activity Workload.

### Workload Kind

Workload Kind is the kind of the original segment related to this workload. The following is a list of possible values:

* **Conversation:** This is equivalent to the [Conversation Segment kind](/docs/flex/end-user-guide/insights/segments).
* **Agent Status:** This is equivalent to the [Agent Status Segment kind](/docs/flex/end-user-guide/insights/segments).
* **Deleted Workload:** An invalid workload that could appear if there is an incident or unexpected behavior in Flex. Flex Insights provides visibility into this workload kind for transparency, however we recommend you filter out these deleted workloads from all your metrics and reports.

Queue, Conversation in Progress, Agent Status in Progress, Missed Conversation, and Rejected Conversation Segments do not produce Workload objects.

### Conversation Workload

Conversation Workload allows you to accurately attribute the time agents spent on conversations during the day.

The predefined Conversation Workload measures are as follows:

* **Workload Talk Time:** The time the agent spent in talk time for a given conversation segment during the given 15-minute interval.
* **Workload Wrap Up Time:** The time the agent spent in wrap up time for a given conversation segment during the given 15-minute interval.

Because Conversation Workload data is connected to Conversations data, you can also segment and filter the Conversation Workload by all attributes that are available in the [Conversations data set](/docs/flex/end-user-guide/insights/data-model#conversations). This allows you to flexibly attribute what kind of conversations agents spend their time working on.

> \[!NOTE]
>
> All Conversation Workload data objects have **Kind** set to **Conversation**. This means that the sum of Talk Time and Wrap Up Time in the workload is equal to the Talk Time and Wrap Up time in the conversation that the Workload breaks down. This applies only to completed conversations and not to conversations that are still in progress.

### Agent Activity Workload

The Agent Activity Workload provides you with accurate details on which activities (statuses) that agents were in during the day and how many conversations they were handling during a given time frame. These details enable you to check the following:

* **Schedule Adherence:** Check whether agents are present when they are supposed to be based on their planned shifts.
* **Agent Efficiency:** See how many conversations an agent is handling in parallel to uncover whether you are approaching your targets in a multitasking environment.
* **Idle Time:** See how much time agents spend in an activity (state) that enables them to handle conversations while they are actually not working on any conversation.

The predefined Agent Activity Workload measures are as follows:

* **Activity Time:** The time agent spent in the agent activity (state).
* **Parallel Conversations:** The number of conversations the agent was working on in a given time frame.

### Data Setup

Some measures such as **Idle Time** and **Offline Time** depend on variables that are account specific. The following variables are account specific:

* **Activity - Available:** List of agent statuses that are considered as available (the agent is available to handle conversations). You can use this variable to calculate Idle Time, for example. By default, this variable is set to Available.
* **Activity - Offline** - List of agent statuses that are considered as offline. This variable is used to exclude these activities from reports. By default, this variable is set to Offline.

These preferences can only be changed by Twilio. If you need to customize these preferences, please contact Twilio support.

## Workload Date and Time Dimensions

In most reports, Flex Insights uses the default Date and Time measures. To report on workload-related measures, you can use the (new) **Date - Workload** and **Time - Workload** dimensions.

![Bar chart showing workload activity times: training at 9:05, offline at 10:05, emails at 10:30.](https://docs-resources.prod.twilio.com/f0973a2f4b9120ad6bf094b30c1c391a7760b1adcbc38edfa711b2e792419f91.png)

This chart shows how **Workload Activity Time** is reported using **Date - Workload** and **Time - Workload** dimensions. **Time - Workload** provides a more granular view on the actual agent load over the period of time shown in the chart. The bar chart on the top shows how the **Workload Activity Time** is attributed to time intervals using **Time** dimension. The bar chart underneath shows how **Workload Activity Time** is attributed by using **Time - Workload** dimension. The colors in the bar charts correspond to the colors in the timeline at the bottom.

## Build Workload Reports

In the Report Builder, use **Date - Workload** and **Time - Workload** in the **How** section to segment the workload by the time interval in which agents were handling a conversation or were in a given agent status.

![Report builder with Date - Workload and Time - Workload options highlighted.](https://docs-resources.prod.twilio.com/da38dfb901dd2798d29b92019453b248f9e4439ec03fe8cb3acf1a54ef3de210.png)

## Analyze View

To build Workload reports in Analyze view:

1. Drag and drop the **Date** item to any place in the report.

   ![Attributes panel with 'Date' highlighted for report configuration.](https://docs-resources.prod.twilio.com/054d67432adb10aa615d839016acce23ba734af3fc92f2c7ccff80e391f895ae.png)
2. Click on the **Date** item that you dropped in the report.
3. Click **Date as** to get the list of available date dimensions.
4. Choose **Date - Workload** from the list and select **Apply**.

   ![Dropdown menu showing date options including Date - Workload in a data configuration interface.](https://docs-resources.prod.twilio.com/41d223f11bd13f00b6a44efc2242d900008d2edefdda0e5afd2d08f1fb9b8771.png)

## Workload Reporting Examples

You can use Workload data and custom measures to build a variety of interesting reports. Here are three perspectives on the same agent's morning for inspiration.

### Timeline

![Workload report showing queue, talk, and wrap-up times for two conversations from 8:00 to 9:15.](https://docs-resources.prod.twilio.com/2557e9cce830eb368610f0a2430e18816d008118b507bd8c6ead3318f687afdb.png)

The table above provides the following information:

* The **first and last rows** in the table show the time frame that the workload was segmented by. The time frame is shown in 15-minute intervals.
* **Rows 2 and 3** show two conversations that the same agent handled which span multiple, 15-minute intervals. You can see the different segments of the conversations illustrated by color.
* **Rows 4 and 5** show the sums for Talk Time and Wrap Up Time for each 15-minute interval.
* **Row 6** shows what type of activity (state) the agent was in. **Row 7** breaks down the time spent in each activity during the given interval.
* **Row 8** shows the totals for the parallel conversations that the agent worked on.

### Data in Conversations Data Set

The segments (rows) in the table below are produced from the Conversations data set and are based on the example above (Example 1). The table lists a few attributes and measures that are important for workload reporting. It does not list all available attributes and measures that are available in the Conversations data set. You could use this table to understand your basic data while building custom measures and further reports.

Only Conversation and Agent Activity (status) segments produce workload data objects. Segments of the Kind Queue, Missed Conversation, and Rejected Conversation do not produce workload data objects. The following example demonstrates this by showing Workload data for all segment kinds except for Queue:

![Table showing conversation and agent status with start times and activity durations.](https://docs-resources.prod.twilio.com/299269aae58823f708469b943042f0d2288cc309d0898aea3ad98de53372d329.png)

### Data in Workload Data Set

Each conversation and agent status segment produces one or more items in the Workload data set. Because the Workload data set references the Conversations data set, segmentation by attributes in the Conversation data set is available. Like the Conversations Data table above, consider using a similar table to understand your basic data while building custom measures and further reports.

Conversations in the Workload data set are split by any 15-minute interval boundary while the agent is handling a conversation. Talk Time and Wrap Up Time attributes represent time spent in those parts of the conversation within the given interval.

Agent Activity (status) in the Workload data set is split by any of these events:

* 15-minute time interval boundary
* Change of agent activity
* Start of the handling of a conversation (when a Reservation is accepted by an agent)
* End of the handling of a conversation, including Wrap Up (when a Reservation is completed by an agent)

Agent Activity items have an Activity Time measure that contains time spent in the activity between any of the events above. Parallel Conversations is a measure that contains the number of conversations an agent was handling at that time. This includes all activity from when a Reservation was accepted until the Reservation was completed, including Wrap Up.

All columns in the table below show data produced from the Workload data set. The colors in the table correspond with the Conversation data set in the table above (Example 2).

![Table showing workload data with segments, order, workload kind, activity, date, time, talk time, and wrap up time.](https://docs-resources.prod.twilio.com/db492f64a94b1329b00aec26df6e85a41ebedc226d44eac6bb55ea96d37aa739.png)

## Next Steps

* Learn more about the [Flex Insights Data Model](/docs/flex/end-user-guide/insights/data-model)
* Discover the [structure of Conversations](/docs/flex/end-user-guide/insights/conversation-structure)
* Create, edit, and share your own [dashboards](/docs/flex/end-user-guide/insights/dashboards)
