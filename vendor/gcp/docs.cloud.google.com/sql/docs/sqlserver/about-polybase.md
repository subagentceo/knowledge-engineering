# Cloud SQL for SQL Server support for PolyBase overview

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Guides

Send feedback

# Cloud SQL for SQL Server support for PolyBase overview Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

Cloud SQL for SQL Server supports PolyBase.

With PolyBase, your Cloud SQL for SQL Server instance uses Transact-SQL (T-SQL) commands to directly query data stored in external data sources as if the data is stored in local tables. You don't need to install separate client connection software.

PolyBase is supported in all Cloud SQL for SQL Server editions and machine series options.

For more information about PolyBase, see the Microsoft documentation about data virtualization with PolyBase in SQL Server.

## External data sources

PolyBase in Cloud SQL for SQL Server is compatible with the following external data sources:

*   **Cloud Storage**: supported in SQL Server 2022 or later.
*   **Oracle**: supported in SQL Server 2019 and SQL Server 2022 or later.

## Replicas

PolyBase supports external tables on read replicas.

If you want to query external tables on read replicas, then you need to explicitly enable PolyBase capabilities on the read replica.

All external data sources and tables are automatically propagated to the replica.

## Limitations

*   Cloud SQL supports operations to enable and disable PolyBase only. You need to manage SQL Server entities manually, using T-SQL statements.
    
*   Regarding network connection setup, the following limitations apply:
    
    *   If using Cloud Storage as an external data source, then only basic authentication is supported.
    *   Regional Cloud SQL instances configured with both public and private IPs don't support outbound connectivity.
    *   High availability (HA) instances configured with a public IP aren't supported for use with PolyBase.
*   Cloud SQL for SQL Server doesn't support the `allow polybase export` server configuration option. You can't export data from SQL server to another data source using PolyBase.
    
*   The query insights feature doesn't support external table queries.
    
*   Operations to backup and restore database master keys (DMKs) are not supported. You must manually manage passwords used to encrypt DMKs.
    

## What's next

*   Enable and disable PolyBase
*   Configure external data sources for use with PolyBase

Send feedback