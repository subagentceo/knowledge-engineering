# Promote replicas for regional migration or disaster recovery

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   MySQL
*   Guides

Send feedback

# Promote replicas for regional migration or disaster recovery Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

This page describes how to use and promote cross-region read replicas (replicas created in a different region from that of the primary) for regional migration or disaster recovery.

## Overview

There are two common scenarios for promoting cross-region replicas:

*   Regional migration: Perform a planned migration of a database to a different region.
*   Disaster recovery: Fail over a database to another region in the event that the primary's region becomes unavailable.

Both use cases involve setting up cross-region replication and then promoting the replica. The main difference between them is whether the promotion of the replica is planned (in the case of regional migration) or unplanned (a failover to the replica's region is needed to continue operations because the primary has become unavailable).

**Note:** Promoting a replica is done manually and intentionally. It is not the same as high availability, where a standby instance (which is not a replica) automatically becomes the primary in case of a failure or zonal outage.

## Regional migration

You can use a cross-region replica to migrate your database to another region with minimal downtime. The general idea is to create a replica in another region, wait until replication catches up, promote it, and then direct clients to the newly promoted instance.

The steps involved in promotion are the same as for promoting an in-region replica; follow those instructions to ensure that the newly promoted instance has all of the transactions that were committed to the original primary instance. Once you have promoted the replica and verified that the newly promoted instance is working, update all database clients to connect to the new instance.

## Disaster recovery (DR)

Cross-region replicas can be used as part of a disaster recovery procedure. You can promote a cross-region replica to fail over to another region should the primary instance's region become unavailable for an extended period of time.

For more information about disaster recovery, see About disaster recovery in Cloud SQL.

### Advanced disaster recovery (DR)

If you are using Cloud SQL Enterprise Plus edition, then you can designate a cross-region read replica as a disaster recovery replica (DR replica) for advanced disaster recovery (DR). With advanced DR, you perform a replica failover to replace the primary instance with the designated DR replica. The old primary instance becomes a replica of the promoted DR replica. You can only perform replica failover to the designated DR replica. You can still promote other read replicas without failover.

To return your deployment to the original state after the replica failover with zero data loss, you can perform a switchover. Since the old primary instance is a replica of the new primary instance, you can switch roles again to restore the old primary instance.

For more information, see Advanced disaster recovery (DR).

### Verify failover criteria

Because replication is asynchronous, when a region outage occurs and a failover is attempted, some recent transactions that were committed to the primary may be lost (not replicated to the replica). Whenever a primary instance becomes unavailable, the following steps show (1) how to determine the amount of data, if any, that may have been lost in the cross-region failover and (2) how to ensure that the promoted replica reflects as many recent writes as possible.

First, check the `Replication Lag` value for the replica instance in the monitoring dashboard, which indicates how far, in seconds, the replica is behind its primary. The value of this metric at the time just before the primary became unavailable indicates the window of time during which transactions committed to the primary may have been lost. For example, if the `Replication Lag` showed 5 seconds, then the replica may be missing writes to the primary from the 5 seconds before the primary became unavailable. (The true amount of data lost may be less than this because `Replication Lag` also includes transactions that were successfully received by the replica but simply have not yet been applied.)

Then, connect to the replica instance with a MySQL client by following the instructions in the replication status page (see the **mysql Client** tab). See the instructions pertaining to the `Master_Log_File`, `Read_Master_Log_Pos`, `Relay_Master_Log_File`, and `Exec_Master_Log_Pos` metrics. Verify that the replica has processed all the transactions it has received from the primary. This ensures that when promoted, the replica reflects all transactions that were received before the primary became unavailable.

### Promote a read replica

Once you determine that the failover criteria are met, you can promote one of the replicas to a writeable, standalone instance. Consider the following scenario:

*   Region A (us-central1) has a High Availability primary instance (db-a-0)
*   Region B (us-west1) has a High Availability cross-region replica (db-b-1) of db-a-0
*   Region C (us-east1) has a cross-region replica (db-c-1) of db-a-0

You could choose to promote db-b-1 in Region B to become a standalone writable instance.

See Promoting a replica for detailed instructions.

### Ensure the machine type is appropriate

Ensure that the machine type of the newly promoted instance is appropriate for its workload by monitoring metrics on the instance such as CPU and memory usage. If the newly promoted instance is smaller than its former primary instance, we recommend that you resize the promoted instance to match its former primary so that it can handle the same amount of load.

### Enable high availability for the promoted instance

For a disaster recovery configuration, we recommend that you configure the replica that you intend to promote as a high-availability replica. Alternatively, configure the newly promoted instance as high-availability. If you choose not to configure the read replica with high availability, you can also configure the instance with high availability if and when you promote it.

When promoted, read replicas are automatically configured with backups. Configuring a read replica for high availability is done the same way as for a primary instance. For more information, see configuring the instance for high availability.

### Recreate additional replicas

If you promote a replica to become a primary instance, you need to recreate any other replicas of the former primary instance. For example, consider the configuration referenced earlier and repeated here:

*   Region A (us-central1) has a High Availability primary instance (db-a-0)
*   Region B (us-west1) has a cross-region replica (db-b-1) of db-a-0
*   Region C (us-east1) has a cross-region replica (db-c-1) of db-a-0

If the primary instance (db-a-0) becomes unavailable, you can promote the replica in region B to become the primary. To again have additional replicas in regions A and C, delete the old instances (the former primary instance in A, and the replica in C), and create new read replicas from the new primary instance in B.

**Note:** You need to use different names for the new replicas. The promoted replica retains its original name.

The resulting configuration would be:

*   Region A (us-central1) now has a cross-region replica (db-a-1)
*   Region B (us-west1) now has the primary instance (db-b-1)
*   Region C (us-east1) now has a new cross-region replica (db-c-2)

Send feedback