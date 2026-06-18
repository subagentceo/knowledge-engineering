# Identify transactions that might cause high latencies

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Guides

Send feedback

# Identify transactions that might cause high latencies Stay organized with collections Save and categorize content based on your preferences.

This page describes how to use Lock insights and Transaction insights to identify transactions that lead to high latencies.

**Note:** Time-series graphs on the Lock insights and Transaction insights dashboards display data as average rates per minute.

## Overview

To ensure the consistency of multiple concurrent transactions, Spanner uses locks to control access to the data. Lock contention occurs when many transactions require frequent access to the same lock, leading to high latencies. Without a visual interface, it can be tedious to identify the problematic transactions that lead to a high number of lock contention issues.

Spanner operations acquire locks when the operations are part of a read-write transaction. Read-only transactions don't acquire locks.

Spanner helps you identify transactions that lead to high latencies by guiding you through the following steps:

1.  Check for a spike in latencies using Spanner Monitoring.
2.  Check for lock contention issues using Lock insights.
3.  Identify problematic transactions using Transaction insights.

### Pricing

There is no additional cost for Lock insights or Transaction insights.

### Region configurations

Lock insights and Transaction insights are available in both regional and multi-region configurations.

### Data retention

The maximum data retention for the data that's shown on the Lock insights and Transaction insights dashboards is 30 days. For graphs, data is retrieved from `SPANNER_SYS.*` tables, which have a maximum retention period of 30 days.

For more information about these tables and data retention, see Lock statistics and Transaction statistics.

## Required roles

You need different IAM roles and permissions depending on whether you are an IAM user or a fine-grained access control user.

### Identity and Access Management (IAM) user

To get the permissions that you need to view the Lock and Transaction insights page, ask your administrator to grant you the following IAM roles on the instance:

*   All:
    *   Cloud Spanner Viewer (`roles/spanner.viewer`)
        
    *   Cloud Spanner Database Reader (`roles/spanner.databaseReader`)

The following permissions in the Cloud Spanner Database Reader (`roles/spanner.databaseReader`) role are required to view the Lock and Transaction insights page:

*   `spanner.databases.beginReadOnlyTransaction`
*   `spanner.databases.select`
*   `spanner.sessions.create`

### Fine-grained access control user

If you are a fine-grained access control user, ensure that you:

*   Have the Cloud Spanner Viewer(`roles/spanner.viewer`)
    *   Only have fine-grained access control privileges and are granted the `spanner_sys_reader` system role or one of its member roles.
*   Select the `spanner_sys_reader` or a member roles as your current system role on the database overview page.

**Note:** If you already have an IAM database-level permission such as `spanner.databases.select`, the Google Cloud console assumes you are an IAM user. You cannot select the `spanner_sys_reader` on the database overview page as an IAM user.

For more information, see About fine-grained access control and Fine-grained access control system roles.

## Check for a spike in latencies using Spanner Monitoring

You can use Cloud Monitoring to set alerts for metrics that exceed specified thresholds for all requests.

If you get an alert that indicates a spike in the latencies for an instance, you can confirm it on the Spanner Monitoring dashboard, which shows charts for various important metrics. The **Latency** chart helps you view high latencies at the 50th and 99th percentiles.

To confirm a spike in write latencies at the 99th percentile, follow these steps:

1.  In the Google Cloud console, go to the **Spanner Instances** page.
    
    Go to Spanner instances
    
2.  Click the name of the instance.
    
    The Google Cloud console displays an overview of the instance.
    
3.  Click **Monitoring** on the navigation menu.
    
    The Google Cloud console displays charts of data for the instance.
    
4.  On the **Latency** chart, set **Function** to `Write` and **Percentile** to `99th`.
    
5.  Check the refreshed chart to check if it shows any spikes.
    

![A graph showing write latencies at 99th
percentile](/static/spanner/docs/images/monitoring-latency.png)

If you observe that CPU utilization is not spiking and errors spike in operations per second, it's probable that latency spikes are due to the lock contentions.

## Check for lock contention issues using Lock insights

The Lock insights dashboard helps you view the lock wait time in an instance or a selected database. It can help you confirm if high latencies are due to lock contentions.

### Check for high lock wait time

To check for high lock wait time, follow these steps:

1.  Click **Lock insights** on the navigation menu.
    
    The Google Cloud console displays the **Total lock wait** chart, which shows the lock wait time for each database in the instance, in lock wait seconds per minute.
    
    The data shown is for `1 hour` by default, as the time selector at the upper-right corner of the Lock insights dashboard shows. To see data for a wider range, select another option, such as `1 day`.
    
    For more information, see Working with charts.
    
2.  From the **Databases** selector at the top, select the database that shows the highest lock wait time.
    
    The **Total lock wait** chart refreshes to show data only for the selected database.
    
    Additionally, another chart, **Lock wait per row range**, displays graphs for lock wait time by row ranges.
    
    **Note:** An increase in total lock wait time without corresponding entries in the topN queries table, might be caused by locks from internal Spanner system tables (for example, for session management operations).
    
3.  Click the graph and drag horizontally to expand the hour where a latency spike is visible.
    

![The Lock insights dashboard](/static/spanner/docs/images/lock-insights-graphs.png)

### Analyze the lock wait data

The **Lock Insights** table shows the following columns from the `SPANNER_SYS.LOCK_STATS` system tables:

*   **Row range start key**: The row key where the lock conflict occurred. When the conflict involves a range of rows, the value represents the start key of the range. A plus sign (`+`) signifies a range.
*   **Lock wait**: The total lock wait time visually represented on a horizontal bar. By default, the table uses this column for sorts and shows the row range start key with the highest lock wait time at the top.
*   **Lock wait (seconds)**: The cumulative lock wait time of lock conflicts recorded for all columns in the row key range, in seconds.
*   **Lock wait (%)**: The wait time of the lock conflicts recorded for all columns in the row key range as a percentage of the total lock wait time for all row key ranges in the database.

**Note:** The number of TopN lock ranges are limited to 100.

To correlate the data on the **Lock wait per row range** chart with the data in the table, select a line. The related row appears highlighted. Conversely, select the checkbox for a row in the table to see the related line on the chart.

![The Lock insights table](/static/spanner/docs/images/lock-insights-table.png)

To filter the data in the table, do the following:

1.  Click in the field next to **Filter**.
    
2.  Select a property, select an operator, and specify a value.
    

The table shows data matching the filter.

### View sample lock requests

The **Sample lock requests** panel shows details about sample lock requests from contending transactions.

To view sample lock request information for a row range start key, click the related link in the table.

The table shows the following columns of information:

*   **Sample column name**: The column that encountered the lock conflict on the row key range.
*   **Lock mode**: The requested lock mode.
*   **View transactions**: A link to the **Transaction insights** page, which shows the transactions that might be contending for locks.

![The Lock insights details
page](/static/spanner/docs/images/lock-insights-details.png)

## Identify contending transactions using Transaction insights

The Transaction insights dashboard helps you view the latency in transactions on an instance or a selected database. It can help you identify the transactions that might be leading to high latencies due to lock contentions.

### View the latencies of transactions

To view the latency of transactions, follow these steps:

1.  Click **Transaction insights** on the left navigation.
    
2.  From the **Databases** selector at the top, select the database that shows the highest lock wait time.
    
    Alternatively, in the Lock insights dashboard, click **View transactions** to filter transactions reading or writing to a specific sample column.
    
    The data shown is for `1 hour` by default, as the time selector at the upper-right corner of the Transaction insights dashboard shows.
    

The dashboard shows the following charts:

*   The **Average latency (all transactions)** chart displays the latency for all transactions in the instance.
    
*   The **Average latency (per transaction)** chart displays the latency for each transaction for the selected database.
    

![The Transaction insights
dashboard](/static/spanner/docs/images/txn-insights-graphs.png)

### Analyze the transaction data

You can view and analyze data for each transaction in the table below the charts. The table shows metrics data from the `SPANNER_SYS.TXN_STATS` system tables in the following columns:

*   **Fingerprint**: The hash of the transaction tag, if it exists. Otherwise, the hash is calculated based on the operations involved in the transaction. The value is a link that leads to the Transaction Details page.
*   **Transaction tag**: The optional transaction tag for the transaction. Statistical data for multiple transactions that have the same tag string is grouped in a single row with the `TRANSACTION_TAG` label matching the tag string.
*   **Tables affected**: The tables affected by the transaction.
*   **Table.column Read**: The columns that the transaction read from.
*   **Table.column Written**: The columns that the transaction wrote to.
*   **Avg latency (seconds)**: Average seconds taken to perform the transaction. By default, the table is sorted by this column in descending order.

To correlate the data on the **Average latency (per transaction)** chart with the data in the table, select a line on the chart. The corresponding row in the table appears highlighted.

To filter the data in the table, do the following:

1.  Click next to **Filter**.
    
2.  Select a property, select an operator, and specify a value.
    

The table shows data matching the filter.

**Note:** When you reach the Transaction insights page by clicking the **View transactions** link on the Lock insights page, the table appears with filters already applied.

![The Transaction insights table](/static/spanner/docs/images/txn-insights-table.png)

### View detailed information about a transaction

To view detailed information about a transaction, such as the one showing the highest latency, click the **Fingerprint** link on the respective row in the table.

The **Transaction details** page appears. Besides the details table at the top, it shows the following information:

*   A bar showing numeric values for each of these metrics:
    
    *   **Average bytes**: The average rate of bytes written by the transaction, in bytes per minute.
    *   **Average latency**: The average seconds taken from the first operation of the transaction to commit or abort.
    *   **Average commit latency**: The average seconds taken to perform the commit operation.
    *   **Total attempt count**: The average rate of transaction attempts, in attempts per minute. For more information about intervals, see Transaction statistics.
    *   **Total abort count**: The average rate of transaction attempts that abort, in aborts per minute, including attempts that abort before calling the transaction commit method. For more information about intervals, see Transaction statistics.
*   Charts depicting these values. The **Total attempts and aborts** chart displays the per-minute rate of transaction attempts (in attempts per minute) and aborts (in aborts per minute). To display per-minute transaction attempts and aborts, the Google Cloud console queries the `SPANNER_SYS.TXN_STATS_TOP_*` table that best covers your selected time range (`_MINUTE`, `_10MINUTE`, or `_HOUR`). The Google Cloud console then divides the values in the `ATTEMPT_COUNT` column and the `COMMIT_ABORT_COUNT` column from the chosen table by the interval duration in minutes (1, 10, or 60) to present a per-minute rate. For more information about intervals, see Transaction statistics.
    
    Additionally, the **Average participants** chart shows the average number of participants in each commit attempt.
    

![The Transaction insights details
page](/static/spanner/docs/images/txn-insights-details.png)

Investigate if the transaction shape can be optimized to reduce latencies. Consider applying the recommended practices to reduce lock contention.

## What's Next

*   Spanner latency guide
    
*   Latency metrics
    
*   Lock statistics
    
*   Transaction statistics
    

Send feedback