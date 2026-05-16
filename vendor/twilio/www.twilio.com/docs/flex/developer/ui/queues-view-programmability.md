# Real-Time Queues View Programmability

## Overview

You can customize the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) to display the queue statistics that you want to monitor in your contact center.

## View filters

In Flex UI 2.4.0 and later, you can use the **Edit view** option to filter your view to just the queues and metrics that you want to monitor.

The **Edit view** panel opens automatically when you access the **Real-Time Queues View** page for the first time.

Once you've selected your view settings, they're saved in your web browser. Your settings remain saved even if you close the browser, log out, or delete cookies or browser history. However, if you use a different web browser, you must select your settings again in that browser.

### Change your summary metrics cards

In Flex UI 2.5.0 and later, you can choose which summary metrics to highlight in the cards that appear above the table.

On the **Edit view** > **Card** tab, select the cards that you want to see. To avoid horizontal scrolling, select 6 or fewer cards. To change the display order, click the 6-dots icon on the right side of the metric category name and drag it up or down the list.

![Edit view showing card selection with options like Voice, Chat, and Agent Availability.](https://docs-resources.prod.twilio.com/91040cc49838c87d1286ef7f7b9d9f098311f53e0d33b6c36251a84f1a7c696f.png)

View [using RealTimeQueues](#use-the-queuesstatsview-component) to learn more about using the QueuesStatsView component programmatically.

### Filter your queues

To filter your queues, navigate to **Edit view** > **Queues** and select the queues that you want to see on this page. Use the search field to quickly find queues. When you're done, click **Apply** to save your changes.

* Select 20 or fewer queues to avoid performance or latency issues.

  * If you have 20 or fewer queues in your account, they're all selected by default.
  * If you have more than 20 queues, the first 20 are selected automatically.
* Only active queues are shown.

![Queue selection interface with countries and search bar, 16 of 23 queues selected.](https://docs-resources.prod.twilio.com/88ab4561bdef372375c6fc3d4562ea2c1790352e8b1bd63e3ff4afd2e0dc7dce.png)

### Filter your metrics

On the **Edit view** > **Metrics** tab, select the metrics that you want to view and monitor. When you're done, click **Apply** to save your changes.

* Select 8 or fewer metrics. This best practice helps your users avoid horizontal scrolling.
* To see a description of a metric, click the arrow next to the metric name.

  ![Waiting metric highlighted with arrow, showing tasks waiting to be handled.](https://docs-resources.prod.twilio.com/7aee37067788b1233e7f4daf938824ce064c3500ec78f9b794c49520abde81e6.png)
* Change the order in which the metrics display by clicking the 6-dots move icon and dragging it up or down the list. The metrics table automatically updates to match the order of the metrics in the **Edit view** list.
* If you upgraded to Flex UI 2.4.x or later from an earlier version, the new metrics will appear on the dashboard after your Flex account receives at least one call, SMS, or chat task post-upgrade.

## Use the `QueuesStatsView` Component

The Real-Time Queues View is rendered by the `QueuesStatsView` component. This programmable Flex UI component contains the following child components:

* `QueuesStats.AggregatedQueuesDataTiles` (key: `tiles`)
* `QueuesStats.QueuesDataTable` (key: `table`)

### Modify `QueuesStatsView`

You can modify `QueuesStatsView` with the `Content` property:

```javascript
// Add your own component
QueuesStatsView.Content.add(<CustomTiles key="custom-tiles" />, {
  sortOrder: 0,
});
```

## Add individual data tiles

```js title="Add Tiles to Queues View"
import * as Flex from "@twilio/flex-ui";
import { connect } from "react-redux";

// Add the WrappingTasksTile to the view
Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  <WrappingTasksTile key="wrapping-tasks-tile" />,
  { sortOrder: -1 }
);
```

## Remove a tile

You can also use the `QueueStatsView` component to programmatically remove a tile.

To remove a tile:

```js
flex.QueuesStats.AggregatedQueuesDataTiles.defaultProps.dataTileFilter = (
  id
) => {
  if (id === "agents-by-activity-chart-tile") {
    return false; // false means the card will be hidden
  }
  return true; // true means the card will be shown
};
```

The default tiles for this component are `agents-by-activity-chart-tile` and `all`. Note that built in channel-specific tiles use the task channel SID.

## Modify the `QueuesDataTable`

The child component `QueuesStats.QueuesDataTable` lets you add columns in the `QueuesDataTable`. Out of the box, the QueuesDataTable has the following columns:

* **Queues** (key: `friendly-name`)
* **Active** (key: `active-tasks`)
* **Waiting** (key: `waiting-tasks`)
* **Longest** (key: `longest-wait-time`)
* **Agents** (key: `agents`)

To add a column, add a `ColumnDefinition` component to `QueuesStats.QueuesDataTable`. If you want custom formatting on a default column, remove the original column and create a new one.

```js title="Modify QueuesDataTable"
import { ColumnDefinition } from "@twilio/flex-ui";

// Create a new column with custom formatting
Flex.QueuesStats.QueuesDataTable.Content.add(
  <ColumnDefinition
    key="my-waiting-tasks"
    header="Waiting tasks"
    content={(queue: Flex.QueuesStats.WorkerQueue) => {
      // Calculate number of waiting tasks by adding pending and reserved
      const { pending, reserved } = queue.tasks_by_status;
      const waitingTasks = pending + reserved;

      // Set the style to color: red if # of waiting tasks is > 10
      const spanStyle = waitingTasks > 10 ? { color: "red" } : {};

      // Return the element to render
      return <span style={spanStyle}>{waitingTasks}</span>;
    }}
  />,
  { sortOrder: 1 } // Put this after the second column
);
```

## Sort the `QueuesDataTable`

> \[!WARNING]
>
> The `defaultSortColumn` and `sortDirection` properties are only available in
> [@twilio/flex-ui@1.19.0](/docs/flex/release-notes/ui-release-notes) and later.
> Sorting capabilities are only available in
> [@twilio/flex-ui@1.14.0](/docs/flex/release-notes/ui-release-notes) and later.

You can click on the header of a predefined column to sort the QueuesDataTable by those values. By default, the table is sorted by queue name.

To change the column the table is sorted by, set the following property to the key of the column that you want to use:

```javascript
QueuesStats.QueuesDataTable.defaultProps.defaultSortColumn = "column-key";
```

### Sorting with custom columns

When adding a custom column, you can specify the parameter `sortingFn: (a, b) => number`, which works the same way as the `compareFunction` parameter in JavaScript's `Array.sort()`.

The default order of sorting is descending. To change the direction to ascending, use the `sortDirection` property on the `ColumnDefinition` component.

> \[!WARNING]
>
> If you change the order by inverting the value returned from `sortingFn`, the
> visualization in the column header won't display correctly.

In this example, you display a new column with pending tasks and allow sorting by the values in this column:

```javascript
Flex.QueuesStats.QueuesDataTable.Content.add(
  <ColumnDefinition
    key="pending-tasks"
    header="Pending tasks"
    content={(queue: Flex.QueuesStats.WorkerQueue) =>
      queue.tasks_by_status.pending
    }
    sortingFn={(
      a: Flex.QueuesStats.WorkerQueue,
      b: Flex.QueuesStats.WorkerQueue
    ) => a.tasks_by_status.pending - b.tasks_by_status.pending}
    sortDirection="asc"
  />
);
```

## Filter the Real-Time Queues View

> \[!WARNING]
>
> Filtering is only available in
> [@twilio/flex-ui@1.14.0](/docs/flex/release-notes/ui-release-notes) and later.
> Subscription filters are available in
> [@twilio/flex-ui@1.24.0](/docs/flex/release-notes/ui-release-notes) and later.

### Use `setFilter`

Out of the box, all of your queues display in the Flex UI. If you want to hide queues or only show specific queues, you can apply a filter:

```javascript
QueuesStats.setFilter(
  (queue: Flex.QueuesStats.WorkerQueue) =>
    queue.friendly_name !== "Invisible Queue"
);
```

The `setFilter` takes a single parameter, a filter function with a signature of `(queue: WorkerQueue) => boolean`. This function will be evaluated for each queue and added to the view if the return value is `true`.

### Use the `setSubscriptionFilter`

For larger contact centers with a large number of queues, it may be more adequate to use the `setSubscriptionFilter` that is available in [@twilio/flex-ui@1.24.0](/docs/flex/release-notes/ui-release-notes) with the [SLA feature enabled](/docs/flex/developer/ui/queues-view-programmability#add-additional-columns-with-sla-metrics). Unlike `setFilter`, this filter will stop the UI from subscribing to updates from hidden queues, which results in improved performance of the page.

> \[!WARNING]
>
> We recommend to subscribe to 100 or less queues for optimal performance.
> Subscribing to a high number of queues may be demanding on user internet
> connectivity and hardware.

The `setSubscriptionFilter` lets you filter queues only by name or SID:

```javascript
const visibleQueues = ["Everyone", "Sales"];

QueuesStats.setSubscriptionFilter(
  (queue: { friendly_name: string, sid: string }) =>
    visibleQueues.includes(queue.friendly_name)
);
```

> \[!WARNING]
>
> Both filters don't affect the numbers in the global numbers of available
> agents. However, using a filter might cause a discrepancy between the number
> of agents in individual queues in the `QueuesDataTable` and the global number
> of available agents in the **Agents** panel.

## Add additional columns with SLA metrics

> \[!WARNING]
>
> This feature is in Public Beta and available in
> [@twilio/flex-ui@1.27.0](/docs/flex/release-notes/ui-release-notes) and later.

The SLA metrics feature adds the following columns to `Flex.QueuesStats.QueuesDataTable`:

* **SLA 30 min** (key: `sla-30min`)
* **SLA Today** (key: `sla-today`)
* **Handled 30 min** (key: `handled-tasks-30min`)
* **Handled Today** (key: `handled-tasks-today`
* **Abandoned 30 min** (key: `abandoned-tasks-30min`)
* **Abandoned Today** (key: `abandoned-tasks-today`)

SLA metrics are calculated by both the last 30 minute floating window and the current business day.

After the feature is enabled, you can remove any of the default columns listed above or add additional columns with SLA metrics. See the full list of [available metrics](#list-of-sla-metrics).

```js title="Add SLA Columns to QueuesDataTable"
const RenderShortAbandoned30Min = (
  workerQueue: Flex.QueuesStats.WorkerQueue
) => (
  // QueuesDataTableCell component helps us render additional expandable rows with channel specific data
  <Flex.QueuesStats.QueuesDataTableCell
    // Pass the queue data down
    queue={workerQueue}
    // Render the queue level value
    renderQueueData={(queue) => queue.sla_30_min.short_abandoned_tasks_count}
    // Render a value for each active channel in the queue
    renderChannelData={(channel, queue) =>
      channel.sla_30_min.short_abandoned_tasks_count
    }
  />
);

const RenderShortAbandonedToday = (
  workerQueue: Flex.QueuesStats.WorkerQueue
) => (
  <Flex.QueuesStats.QueuesDataTableCell
    queue={workerQueue}
    renderQueueData={(queue) => queue.sla_today.short_abandoned_tasks_count}
    renderChannelData={(channel, queue) =>
      channel.sla_today.short_abandoned_tasks_count
    }
  />
);

Flex.QueuesStats.QueuesDataTable.Content.add(
  <Flex.ColumnDefinition
    key="short-abandoned-30min"
    header="Short Abandoned"
    // Since our columns have the same header, we can set
    // the same headerColSpanKey on both to merge their headers.
    headerColSpanKey="short-abandoned"
    subHeader="30 min"
    content={RenderShortAbandoned30Min}
  />
);

Flex.QueuesStats.QueuesDataTable.Content.add(
  <Flex.ColumnDefinition
    key="short-abandoned-today"
    header="Short Abandoned"
    headerColSpanKey="short-abandoned"
    subHeader="Today"
    content={RenderShortAbandonedToday}
  />
);
```

In this snippet, Flex adds two columns to `QueuesDataTable` that show the number of short abandoned tasks in the last 30 minutes and for the day. You can use the `QueuesDataTableCell` in the content render function to add additional expandable rows of channel-specific data.

### Configure SLA thresholds and business day start times

You can configure the time a new business day starts and all SLA threshold values [in the admin plugin](/docs/flex/end-user-guide/service-level-preferences) or with the Flex Configuration API. There are three levels of SLA configurations:

* `default`
* `queue_configurations`
* `queue_channel_configurations`

Each lower level overrides the one above it. For example, a `queue_configurations` object has priority over the `default` configuration and a `queue_channel_configurations` object has priority over the `default` configuration and matching `queue_configurations` object.

The request body is validated by the Flex Configuration API and must adhere to the following requirements:

* Each request must include the `default` configuration, even if you set `queue_configurations` and/or `queue_channel_configurations` in the same request.
* Each configuration object included in the request must contain all required properties. The required properties for each configuration object type are as follows:

  * `default`

    * `service_level_threshold`
    * `short_abandoned_threshold`
    * `reset_timezone`
    * `reset_time`
  * `queue_configurations`

    * `queue_sid`
    * `reset_timezone`
    * `reset_time`
  * `queue_channel_configurations`

    * `queue_sid`
    * `channel_sid`
    * `service_level_threshold`
    * `short_abandoned_threshold`

After you submit a configuration change, your changes are not applied until the next time a task is received. Consider creating a test task to ensure that your changes are applied right away.

> \[!WARNING]
>
> When you update `reset_time`, your update might cause Today metrics to show
> more than 24 hours of data. If the current reset time is 5:00 AM and you
> update it to 7:00 AM, but no tasks come in until 8:00 AM, the day won't reset
> at 7:00 AM because your change didn't take effect. As a result, the Today
> metrics will show 26 hours of data, from 5:00 AM through 7:00 AM the next day.

```bash title="Configure how SLA metrics are calculated"
# Any change to configuration will take approximately 10 min to reflect.
# New task has to land in the queue or channel with a new configuration in order to see the change.
# For the list of possible timezones see: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

curl -X POST https://flex-api.twilio.com/v1/Configuration \
  -u ACxxx:your_auth_token \
  -H 'Content-Type: application/json' \
  -d '{
      "account_sid": "ACxxx",
      "queue_stats_configuration": {
        "default": {
          "service_level_threshold": "20",
          "short_abandoned_threshold": "5",
          "reset_timezone": "GMT",
          "reset_time": "08:00"
        },
        "queue_configurations": [
          {
            "queue_sid": "WQxxx",
            "reset_timezone": "GMT",
            "reset_time": "08:00"
          }
        ],
        "queue_channel_configurations": [
          {
            "queue_sid": "WQxxx",
            "channel_sid": "TCxxx",
            "service_level_threshold": "20",
            "short_abandoned_threshold": "5"
          }
        ]
      }
  }'
```

### List of SLA metrics

The `WorkerQueue` data object is extended with the `sla_30_min` and `sla_today` keys. These keys are both of the type `WorkerQueueSLA`, which contains all available SLA metrics for queues:

* `total_tasks_count`
* `handled_tasks_count`
* `handled_tasks_within_sl_threshold_count`
* `handled_tasks_within_sl_threshold_percentage`
* `short_abandoned_tasks_count`
* `short_abandoned_tasks_percentage`
* `abandoned_tasks_count`
* `abandoned_tasks_percentage`
* `flow_out_tasks_count`
* `flow_out_tasks_percentage`
* `sla_percentage`

If a queue handles multiple channels, the SLA data is also available per channel. The `channels` key on the `WorkerQueue` contains an array of `WorkerQueueChannel`, which has the following keys:

* `sid`
* `unique_name`
* `friendly_name`
* `sla_30_min` (`WorkerQueueSLA`)
* `sla_today` (`WorkerQueueSLA`)

```javascript
workerQueue.channels[0].sla_30_min.total_tasks_count;
```

## Subheaders and header colspan

> \[!WARNING]
>
> This feature is only available in
> [@twilio/flex-ui@1.20.0](/docs/flex/release-notes/ui-release-notes) and later.

```js title="Add Subheadings to a Column"
Flex.QueuesStats.QueuesDataTable.Content.add(
  <Flex.ColumnDefinition
    key="custom-column-1"
    header="My Column"
    headerColSpanKey="my-column"
    subHeader="Foo"
    content={YourContentRenderer1}
  />
);

Flex.QueuesStats.QueuesDataTable.Content.add(
  <Flex.ColumnDefinition
    key="custom-column-2"
    header="My Column"
    headerColSpanKey="my-column"
    subHeader="Bar"
    content={YourContentRenderer2}
  />
);
```

You can add subheaders to columns using a `subHeader` property on `ColumnDefinition`.

If adjacent columns have the same header and you want to merge these table header cells, set the same `headerColSpanKey` on these columns.

## Display Real-Time Queues view on a monitor

> \[!WARNING]
>
> The full screen view is only available in
> [@twilio/flex-ui@1.14.0](/docs/flex/release-notes/ui-release-notes) and later.

To display queue statistics on a TV or a monitor, use the full screen view by clicking the small button in the bottom-right corner.

The button is hidden by default. To enable the button, set the following property:

```javascript
QueuesStatsView.fullscreen.enabled = true;
```
