# Introduction to INFORMATION_SCHEMA

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Reference

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Introduction to INFORMATION_SCHEMA

The BigQuery `INFORMATION_SCHEMA` views are read-only, system-defined views that provide metadata information about your BigQuery objects. The following table lists all `INFORMATION_SCHEMA` views that you can query to retrieve metadata information:

Resource type

INFORMATION_SCHEMA View

Access control

`OBJECT_PRIVILEGESscience`

BI Engine

`BI_CAPACITIES`  
`BI_CAPACITY_CHANGES`

Configurations

`EFFECTIVE_PROJECT_OPTIONS`  
`ORGANIZATION_OPTIONS`  
`ORGANIZATION_OPTIONS_CHANGES`  
`PROJECT_OPTIONS`  
`PROJECT_OPTIONS_CHANGES`  

Datasets

`SCHEMATA   SCHEMATA_LINKS   SCHEMATA_OPTIONS   SHARED_DATASET_USAGE   SCHEMATA_REPLICAS   SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION`

Graphs

`PROPERTY_GRAPHS`  

Jobs

`JOBS_BY_PROJECT†`  
`JOBS_BY_USER`  
`JOBS_BY_FOLDER`  
`JOBS_BY_ORGANIZATION`

Jobs by timeslice

`JOBS_TIMELINE_BY_PROJECT†`  
`JOBS_TIMELINE_BY_USER`  
`JOBS_TIMELINE_BY_FOLDER`  
`JOBS_TIMELINE_BY_ORGANIZATION`

Recommendations and insights

`INSIGHTSscience`  
`RECOMMENDATIONSscience`  
`RECOMMENDATIONS_BY_ORGANIZATIONscience`

Reservations

`ASSIGNMENTS_BY_PROJECT†`  
`ASSIGNMENT_CHANGES_BY_PROJECT†`  
`CAPACITY_COMMITMENTS_BY_PROJECT†`  
`CAPACITY_COMMITMENT_CHANGES_BY_PROJECT†`  
`RESERVATIONS_BY_PROJECT†`  
`RESERVATION_CHANGES_BY_PROJECT†`  
`RESERVATIONS_TIMELINE_BY_PROJECT†`

Routines

`PARAMETERS`  
`ROUTINES`  
`ROUTINE_OPTIONS`

Search indexes

`SEARCH_INDEXES`  
`SEARCH_INDEX_COLUMNS`  
`SEARCH_INDEX_COLUMN_OPTIONSscience`  
`SEARCH_INDEX_OPTIONS`  
`SEARCH_INDEXES_BY_ORGANIZATION`

Sessions

`SESSIONS_BY_PROJECT†`  
`SESSIONS_BY_USER`

Streaming

`STREAMING_TIMELINE_BY_PROJECT†`  
`STREAMING_TIMELINE_BY_FOLDER`  
`STREAMING_TIMELINE_BY_ORGANIZATION`

Tables

`COLUMNS`  
`COLUMN_FIELD_PATHS`  
`CONSTRAINT_COLUMN_USAGE`  
`KEY_COLUMN_USAGE`  
`PARTITIONSscience`  
`TABLES`  
`TABLE_OPTIONS`  
`TABLE_CONSTRAINTS`  
`TABLE_SNAPSHOTS`  
`TABLE_STORAGE_BY_PROJECT†`  
`TABLE_STORAGE_BY_FOLDER`  
`TABLE_STORAGE_BY_ORGANIZATION`  
`TABLE_STORAGE_USAGE_TIMELINEscience`  
`TABLE_STORAGE_USAGE_TIMELINE_BY_FOLDERscience`  
`TABLE_STORAGE_USAGE_TIMELINE_BY_ORGANIZATIONscience`

Vector indexes

`VECTOR_INDEXES`  
`VECTOR_INDEX_COLUMNS`  
`VECTOR_INDEX_OPTIONS`

Views

`VIEWS`  
`MATERIALIZED_VIEWS`

Write API

`WRITE_API_TIMELINE_BY_PROJECT†`  
`WRITE_API_TIMELINE_BY_FOLDER`  
`WRITE_API_TIMELINE_BY_ORGANIZATION`

† For `*BY_PROJECT` views, the `BY_PROJECT` suffix is optional. For example, querying `INFORMATION_SCHEMA.JOBS_BY_PROJECT` and `INFORMATION_SCHEMA.JOBS` return the same results.

**Note:** Not all `INFORMATION_SCHEMA` views are supported for BigQuery Omni system tables. You can view resource metadata with `INFORMATION_SCHEMA` for Amazon S3 and Azure Storage.

## Pricing

For projects that use on-demand pricing, queries against `INFORMATION_SCHEMA` views incur a minimum of 10 MB of data processing charges, even if the bytes processed by the query are less than 10 MB. 10 MB is the minimum billing amount for on-demand queries. For more information, see On-demand pricing.

For projects that use capacity-based pricing, queries against `INFORMATION_SCHEMA` views and tables consume your purchased BigQuery slots. For more information, see capacity-based pricing.

Because `INFORMATION_SCHEMA` queries are not cached, you are charged each time that you run an `INFORMATION_SCHEMA` query, even if the query text is the same each time you run it.

You are not charged storage fees for the `INFORMATION_SCHEMA` views.

## Syntax

An `INFORMATION_SCHEMA` view needs to be qualified with a dataset or region.

**Note:** You must specify a location to query an `INFORMATION_SCHEMA` view. Querying an `INFORMATION_SCHEMA` view fails with the following error if the location of the query execution doesn't match the location of the dataset or regional qualifier used:  

Table myproject: region-us.INFORMATION_SCHEMA.[VIEW] not found in location US

### Dataset qualifier

When present, a dataset qualifier restricts results to the specified dataset. For example:

```
-- Returns metadata for tables in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.TABLES;
```

The following `INFORMATION_SCHEMA` views support dataset qualifiers:

*   `COLUMNS`
*   `COLUMN_FIELD_PATHS`
*   `MATERIALIZED_VIEWS`
*   `PARAMETERS`
*   `PARTITIONS`
*   `ROUTINES`
*   `ROUTINE_OPTIONS`
*   `TABLES`
*   `TABLE_OPTIONS`
*   `VIEWS`

### Region qualifier

Region qualifiers are represented using a `region-REGION` syntax. Any dataset location name can be used for `REGION`. For example, the following region qualifiers are valid:

*   `region-us`
*   `region-asia-east2`
*   `region-europe-north1`

When present, a region qualifier restricts results to the specified location. Region qualifiers aren't hierarchical, which means the EU multi-region does not include `europe-*` regions nor does the US multi-region include the `us-*` regions. For example, the following query returns metadata for all datasets in the `US` multi-region for the project in which the query is executing, but doesn't include datasets in the `us-west1` region:

-- Returns metadata for all datasets in the US multi-region.
SELECT * FROM region-us.INFORMATION_SCHEMA.SCHEMATA;

The following `INFORMATION_SCHEMA` views don't support region qualifiers:

*   `INFORMATION_SCHEMA.PARTITIONS`
*   `INFORMATION_SCHEMA.SEARCH_INDEXES`
*   `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS`
*   `INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS`

If neither a region qualifier nor a dataset qualifier is specified, you will receive an error.

Queries against a region-qualified `INFORMATION_SCHEMA` view run in the region that you specify, which means that you can't write a single query to join data from views in different regions. To combine `INFORMATION_SCHEMA` views from multiple regions, read and combine the query results locally, or copy the resulting tables to a common region.

### Project qualifier

When present, a project qualifier restricts results to the specified project. For example:

```
-- Returns metadata for the specified project and region.
SELECT * FROM myProject.`region-us`.INFORMATION_SCHEMA.TABLES;

-- Returns metadata for the specified project and dataset.
SELECT * FROM myProject.myDataset.INFORMATION_SCHEMA.TABLES;
```

All `INFORMATION_SCHEMA` views support project qualifiers. If a project qualifier is not specified, the view will default to the project in which the query is executing.

Specifying a project qualifier for organization-level views (for example, `STREAMING_TIMELINE_BY_ORGANIZATION`) has no impact on the results.

## Limitations

*   BigQuery `INFORMATION_SCHEMA` queries must be in GoogleSQL syntax. `INFORMATION_SCHEMA` does not support legacy SQL.
*   `INFORMATION_SCHEMA` query results are not cached.
*   `INFORMATION_SCHEMA` views cannot be used in DDL statements.
*   `INFORMATION_SCHEMA` views don't contain information about hidden datasets.
*   `INFORMATION_SCHEMA` queries with region qualifiers might include metadata from resources in that region from deleted datasets that are within your time travel window.
*   When you list resources from an `INFORMATION_SCHEMA` view, the permissions are checked only at the parent level, not at an individual row level. Therefore, any deny policy (preview) that conditionally targets an individual row using tags is ignored.

Send feedback