# Time to live (TTL) overview

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Guides

Send feedback

# Time to live (TTL) overview Stay organized with collections Save and categorize content based on your preferences.

Time to live (TTL) lets you set policies to periodically delete data from Spanner tables. Removing unneeded data:

*   Decreases storage and backup costs.
*   Reduces the number of rows the database has to scan for some queries, potentially increasing query performance.
*   Helps to adhere to regulations or industry guidelines that limit the retention time on certain types of data.

TTL is ideal for regular clean-up activities. It runs continuously in the background, periodically deleting eligible data in batches. Data is typically deleted within 72 hours after its expiration date. Each delete requires a primary key replication across the database's replicas that leads to replication costs. For more information, see Data replication pricing. TTL doesn't immediately invalidate data or hide it from queries when it becomes eligible for deletion. TTL also doesn't check data while it is inserted, thus it doesn't block you from inserting a row with an expired timestamp.

TTL is designed to minimize the impact on other database workloads. The TTL sweeper process works in the background at system low priority. It spreads work over time and available instance resources more efficiently than end-user queries and includes retry logic to ensure end-to-end cleanup with minimal processing overhead.

Another background compaction process reclaims storage from deleted rows, typically within seven days.

## How does TTL work?

You can set TTL on Spanner tables by defining a row deletion policy in the database schema. This policy allows Spanner to periodically delete unneeded data. TTL policies have the following characteristics:

*   Each table can have its own policy.
*   Only one TTL policy can be specified per table.
*   You set up TTL differently for GoogleSQL-dialect databases and PostgreSQL-dialect databases.
*   The TTL policy doesn't delete rows that have the timestamp set to `NULL`.
*   Data inserted with expired timestamps is cleaned up when detected in the next TTL deletion cycle.

### TTL with GoogleSQL

Using GoogleSQL, you define a row deletion policy by specifying a _timestamp_ and an _interval_ to determine when a row is eligible for deletion; for example, last update date plus 30 days.

A background system process checks for eligible rows daily. It parallelizes the actual deletes in batches that are executed close to where the data is stored internally. Each batch runs in its own transaction at a consistent timestamp. Thus the rows in a given batch, along with any indexes and interleaved children, are deleted atomically. However, deletes across batches happens in different transactions.

Since this is an asynchronous background process, there is a delay between eligibility and deletion. Typically, the delay is less than 72 hours. As a result, rows might remain in your table for up to three days after their TTL has expired; for example, a table with a row deletion policy that deletes rows older than four days might include rows up to seven days old as well as older, undeletable rows.

For step-by-step instructions on how to create a GoogleSQL row deletion policy, see Create a TTL policy.

### TTL with PostgreSQL

Using PostgreSQL, a database owner can use a `TTL INTERVAL` clause in the `CREATE TABLE` or `ALTER TABLE` statement to define a row deletion policy.

To set a row deletion policy on a PostgreSQL table, the table must have a column with the data type `TIMESTAMPTZ`. The `TTL INTERVAL` clause uses this column to set an interval specification for when a row is eligible for deletion.

The clause must evaluate to a whole number of days. For example, `'3 DAYS'` is allowed, and so is `'4 DAYS 2 MINUTES - 2 MINUTES'`, but `'4 DAYS 3 MINUTES'` is not allowed, and an error is returned. You cannot use negative numbers.

TTL garbage collection deletes eligible rows continuously and in the background. Because this is an asynchronous background process, there is a delay between eligibility and deletion. The table might contain rows that is eligible for TTL deletion but for which TTL has not completed, yet. Typically, the delay is less than 72 hours.

For instructions on how to create a PostgreSQL row deletion policy, see Create a TTL policy.

## Backups and TTL

### Restore a backup

When you restore a database from a backup, any row deletion policies that were configured on the source database are automatically dropped. This prevents Spanner from potentially deleting expired data as soon as the backup has been restored. Hence, you'll need to reconfigure the TTL manually.

### Data consistency

A backup is a consistent snapshot of your data at a particular point in time (`version_time`). The backup can contain rows that might be eligible for TTL deletion but for which TTL has not yet completed. Similarly, Dataflow export jobs read the entire table at a fixed timestamp.

### Auditing

TTL supports auditing its deletions through change streams. Change streams data records that track TTL changes to a database have the `transaction_tag` field set to `RowDeletionPolicy` and the `is_system_transaction` field set to `true`. Change streams readers are then able to filter out all the TTL records, or all the records except for the TTL ones, depending on their use case. See an example of using Beam to filter by transaction tags.

## What's next

*   Learn how to manage data retention with TTL.
*   Learn about TTL metrics and monitoring.

Send feedback