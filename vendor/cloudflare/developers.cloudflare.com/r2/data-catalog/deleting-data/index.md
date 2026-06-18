---
title: Deleting data
description: How to properly delete data from R2 Data Catalog
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deleting data

Deleting data from R2 Data Catalog or any Apache Iceberg catalog requires that operations are done in a transaction through the catalog itself. Manually deleting metadata or data files directly can lead to data catalog corruption.

## Automatic table maintenance

R2 Data Catalog can automatically manage table maintenance operations such as snapshot expiration and compaction. These continuous operations help keep latency and storage costs down.

* **Snapshot expiration**: Automatically removes old snapshots and the respective unreferenced data files. This reduces both metadata overhead and storage costs.
* **Compaction**: Merges small data files into larger ones. This optimizes read performance and reduces the number of files read during queries.

Without enabling automatic maintenance, you need to manually handle these operations.

Learn more in the [table maintenance](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/) documentation.

## Examples of enabling automatic table maintenance in R2 Data Catalog

Terminal window

```

# Enable automatic snapshot expiration for entire catalog

npx wrangler r2 bucket catalog snapshot-expiration enable my-bucket \

  --older-than-days 30 \

  --retain-last 5


# Enable automatic compaction for entire catalog

npx wrangler r2 bucket catalog compaction enable my-bucket \

  --target-size 256


```

Refer to additional examples in the [manage catalogs](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/) documentation.

## Manually deleting and removing data

You need to manually delete data for:

* Complying with data retention policies such as GDPR or CCPA.
* Selective based deletes using conditional logic.
* Removing stale or unreferenced files that R2 Data Catalog does not manage.

The following are basic examples using PySpark but similar operations can be performed using other Iceberg-compatible engines. To configure PySpark, refer to our [example](https://developers.cloudflare.com/r2/data-catalog/config-examples/spark-python/) or the official [PySpark documentation ↗](https://spark.apache.org/docs/latest/api/python/getting%5Fstarted/index.html).

### Deleting rows from a table

Python

```

# Creates new snapshots and marks old files for cleanup

spark.sql("""

  DELETE FROM r2dc.namespace.table_name

  WHERE column_name = 'value'

""")


# The following is effectively a TRUNCATE operation

spark.sql("DELETE FROM r2dc.namespace.table_name")


# For large deletes, use partitioned tables and delete entire partitions for faster performance:

spark.sql("""

    DELETE FROM r2dc.namespace.table_name

    WHERE date_partition < '2024-01-01'

""")


```

### Dropping tables and namespaces

Python

```

# Removes table from catalog but keeps data files in R2 storage

spark.sql("DROP TABLE r2dc.namespace.table_name")


# ⚠️  DANGER: Permanently deletes all data files from R2

# This operation cannot be undone

spark.sql("DROP TABLE r2dc.namespace.table_name PURGE")


# Use CASCADE to drop all tables within the namespace

spark.sql("DROP NAMESPACE r2dc.namespace_name CASCADE")


# You will need to PURGE the tables before running CASCADE to permanently delete data files

# This can be done with a loop over all tables in the namespace

tables = spark.sql("SHOW TABLES IN r2dc.namespace_name").collect()

for row in tables:

  table_name = row['tableName']

  spark.sql(f"DROP TABLE r2dc.namespace_name.{table_name} PURGE")

spark.sql("DROP NAMESPACE r2dc.namespace_name CASCADE")


```

Data loss warning

`DROP TABLE ... PURGE` permanently deletes all data files from R2 storage. This operation cannot be undone and bypasses time-travel capabilities.

### Manual maintenance operations

Python

```

# Remove old metadata and data files marked for deletion

# The following retains the last 5 snapshots and deletes files older than Nov 28, 2024

spark.sql("""

  CALL r2dc.system.expire_snapshots(

    table => 'r2dc.namespace_name.table_name',

    older_than => TIMESTAMP '2024-11-28 00:00:00',

     retain_last => 5

  )

""")


# Removes unreferenced data files from R2 storage (orphan files)

spark.sql("""

  CALL r2dc.system.remove_orphan_files(

    table => 'namespace.table_name'

  )

""")


# Rewrite data files with a target file size (e.g., 512 MB)

spark.sql("""

  CALL r2dc.system.rewrite_data_files(

    table => 'r2dc.namespace_name.table_name',

    options => map('target-file-size-bytes', '536870912')

  )

""")


```

## About Apache Iceberg metadata

Apache Iceberg uses a layered metadata structure to manage table data efficiently. Here are the key components and file structure:

* **metadata.json**: Top-level JSON file pointing to the current snapshot
* **snapshot-\***: Immutable table state for a given point in time
* **manifest-list-\*.avro**: An Avro file listing all manifest files for a given snapshot
* **manifest-file-\*.avro**: An Avro file tracking data files and their statistics
* **data-\*.parquet**: Parquet files containing actual table data
* **Note**: Unchanged manifest files are reused across snapshots

Warning

Manually modifying or deleting any of these files directly can lead to data catalog corruption.

* Directorymetadata.json **Metadata File** \- Points to current snapshot  
   * Table Schema  
   * Partition Spec  
   * Sort Order  
   * DirectorySnapshots  
         * Directorysnapshot-3051729675574597004.avro **Snapshot 1** (Historical)  
                  * Directorymanifest-list-abc123.avro **Manifest List**  
                              * Directorymanifest-file-001.avro **Manifest File**  
                                             * data-00001.parquet (10 MB, 50K rows)  
                                             * data-00002.parquet (12 MB, 60K rows)  
                                             * data-00003.parquet (11 MB, 55K rows)  
                              * Directorymanifest-file-002.avro  
                                             * data-00004.parquet (9 MB, 45K rows)  
                                             * data-00005.parquet (10 MB, 50K rows)  
         * Directorysnapshot-3051729675574597005.avro **Snapshot 2** (Current)  
                  * Directorymanifest-list-def456.avro **Manifest List**  
                              * Directorymanifest-file-001.avro _(reused from Snapshot 1)_  
                                             * data-00001.parquet  
                                             * data-00002.parquet  
                                             * data-00003.parquet  
                              * Directorymanifest-file-003.avro _(new)_  
                                             * data-00006.parquet (11 MB, 53K rows)  
                                             * data-00007.parquet (10 MB, 51K rows)  
                                             * data-00008.parquet (12 MB, 58K rows)

### What happens during deletion

Apache Iceberg supports two deletion modes: **Copy-on-Write (COW)** and **Merge-on-Read (MOR)**. Both create a new snapshot and mark old files for cleanup, but handle the deletion differently:

| Aspect                | Copy-on-Write (COW)                      | Merge-on-Read (MOR)                                     |
| --------------------- | ---------------------------------------- | ------------------------------------------------------- |
| **How deletes work**  | Rewrites data files without deleted rows | Creates delete files marking rows to skip               |
| **Query performance** | Fast (no merge needed)                   | Slower (requires read-time merge)                       |
| **Write performance** | Slower (rewrites data files)             | Fast (only writes delete markers)                       |
| **Storage impact**    | Creates new data files immediately       | Accumulates delete files over time                      |
| **Maintenance needs** | Snapshot expiration                      | Snapshot expiration + compaction (rewrite\_data\_files) |
| **Best for**          | Read-heavy workloads                     | Write-heavy workloads with frequent small mutations     |

Important for all deletion modes

* Deleted data is **not immediately removed** from R2 - files are marked for cleanup
* Enable [snapshot expiration](https://developers.cloudflare.com/r2/data-catalog/table-maintenance) in R2 Data Catalog to automatically clean up old snapshots and files

### Common deletion operations

These operations work the same way for both COW and MOR tables:

| Operation             | What it does                    | Data deleted?           | Reversible?                            |
| --------------------- | ------------------------------- | ----------------------- | -------------------------------------- |
| DELETE FROM           | Removes rows matching condition | No (marked for cleanup) | Via time travel[1](#user-content-fn-1) |
| DROP TABLE            | Removes table from catalog      | No                      | Yes (if data files exist)              |
| DROP TABLE ... PURGE  | Removes table and deletes data  | **Yes**                 | **No**                                 |
| expire\_snapshots     | Cleans up old snapshots/files   | **Yes**                 | **No**                                 |
| remove\_orphan\_files | Removes unreferenced files      | **Yes**                 | **No**                                 |

### MOR-specific operations

For Merge-on-Read tables, you may need to manually apply deletes for performance:

| Operation                         | What it does                           | When to use                                              |
| --------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| rewrite\_data\_files (compaction) | Applies deletes and consolidates files | When query performance degrades due to many delete files |

Note

R2 Data Catalog can automate [rewriting data files](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/) for you.

## Related resources

* [Table maintenance](https://developers.cloudflare.com/r2/data-catalog/table-maintenance) \- Learn about automatic maintenance operations
* [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) \- Overview and getting started guide
* [Query data](https://developers.cloudflare.com/r2-sql/query-data) \- Query tables with R2 SQL
* [Apache Iceberg Maintenance ↗](https://iceberg.apache.org/docs/latest/maintenance/) \- Official Iceberg documentation on table maintenance

## Footnotes

1. Time travel available until `expire_snapshots` is called [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/deleting-data/#page","headline":"Deleting data · Cloudflare R2 docs","description":"How to properly delete data from R2 Data Catalog","url":"https://developers.cloudflare.com/r2/data-catalog/deleting-data/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/deleting-data/","name":"Deleting data"}}]}
```
