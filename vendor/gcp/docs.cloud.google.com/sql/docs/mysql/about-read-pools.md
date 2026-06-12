# About read pools

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   MySQL
*   Guides

Send feedback

# About read pools Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

Cloud SQL read pools support load balancing for your large read workloads.

## What are read pools?

A _read pool_ is a collection of read replica instances used to distribute your large read workloads. These workloads can be redirected from the primary instance to the read pool to reduce load on the primary instance.

Each read replica in the read pool is called a _read pool node_.

You can scale your read pool in several ways:

*   **Scale in or out**: scale load balancing capacity horizontally by modifying the number of read pool nodes in the read pool. Each read pool supports between 1 and 20 read pool nodes.
*   **Scale up or down**: scale load balancing capacity vertically by modifying the machine type associated with a read pool node. Once defined, configuration is uniformly applied across each read pool node in the read pool.

When you modify read pool node settings such as storage, connectivity, or database configuration flags, the changes are automatically applied uniformly across each read pool node in the read pool.

### Access a read pool through a single read endpoint

The read pool is accessible through a _single read endpoint_ with an immutable IP address. Connections made through the endpoint are automatically redirected to one of the read pool nodes. When you want the read pool to scale in or scale out, applications that were previously connected to this single read endpoint don't need to be reconfigured, even though you can create new read pool nodes in the read pool or delete previous ones.

Each read pool node also has its own IP address. While not recommended as an efficient approach for accessing your data, you can use these IP addresses to troubleshoot individual read pool node performance.

For more information on how to retrieve the connection information for the read pool or the read pool nodes (either IP addresses or a connection string), see View read pool information.

### Read pool autoscaling

To see how to configure your read pool to automatically resize to adapt to your application's changing workload needs, see Read pool autoscaling.

### Read pool characteristics

The following characteristics apply:

*   A read pool with two or more nodes is covered under the Service Level Agreement (SLA).
*   Read pool nodes of the read pool always reside in the same region, as specified by the user. Google Cloud alternates read pool node residency among all zones in the region.
*   A primary instance can have one or more read pools.
*   The following operations incur sub-second downtime:
    *   Scaling out or in (adding or removing read pool nodes).
    *   Scaling up or down (changing the machine type of the nodes in the pool).
    *   Converting an existing zonal read replica to a read pool.
*   A read pool receives maintenance before its primary instance, similar to read replicas. Like read replicas, read pools receive maintenance during the primary instance's maintenance window.
*   Each read pool node has the same metrics available as a Cloud SQL read replica.
*   When using `gcloud` or the Google Cloud console to describe the details of a project, the read pool name is listed, individual read pool node names are not.

## Limitations

The following limitations apply:

*   Read pools are only available for Cloud SQL Enterprise Plus edition instances on the new network architecture. The primary instance associated with a read pool must also be a Cloud SQL Enterprise Plus edition instance.
*   Traffic is served from read pool nodes based on whether the database is healthy, but regardless of how high replication lag on that read pool node is. Traffic can be served from a lagging read pool node even if another read pool node is available that isn't lagging. A database is considered healthy if the database process is up and can answer queries, but there is no requirement on how fresh the data being served is.
*   No guarantee is made about a single logical session connecting to multiple read pool nodes in the read pool. It's possible for later requests in a session to connect to a read pool node that has a lower replication position (GTID) than the read pool node that served an earlier request, which can cause the state of the database to appear to go back in time.
*   The following types of updates aren't supported:
    *   While read pools still receive Cloud SQL maintenance updates, you can't update your read pool to a new major or minor database version.
    *   Starting or stopping nodes of the read pool.
*   In addition to operations that aren't supported on read replicas, the following operations aren't supported on read pools:
    *   Enable and disable replication
    *   Promote replica
    *   Restart
    *   Import
    *   Export
    *   Failover
    *   Re-encrypt
    *   Clone
*   SSL/TLS certificates with shared CA or customer-managed CA can't be used with a read pool.
*   A read pool can't replicate to another instance, for example, a cascading replica or another read pool.
*   A read pool must replicate directly from a primary instance. It can't be a cascading replica.
*   If you want to convert a regional read replica to a read pool, then you must first convert the regional read replica to a zonal read replica.
*   When creating or scaling a read pool, you must wait for previous create pool, scale in, or scale out operations associated with the read pool to finish. This restriction applies to any other read pool associated with the same primary instance. If you want to scale multiple read pools associated with the same primary instance, then you must wait for scaling operations associated with the first read pool to finish before you start scaling the next read pool. If you issue concurrent requests, then you might receive the following error: `Operation failed because another operation was already in progress.`.
*   Only a zonal replica located in the same region as the primary can be converted for use in a read pool.
*   If your application must connect to a dedicated read replica—for example, because of secondary indexes present on a specific read replica—create a Cloud SQL read replica and use it instead.

## What's next

*   Create and manage read pools
*   Read pool autoscaling

Send feedback