# Manage materialized view replicas

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Manage materialized view replicas

This document describes how to manage materialized view replicas in BigQuery.

BigQuery management of materialized view replicas includes the following operations:

*   List materialized view replicas
*   Get information about materialized view replicas
*   Delete materialized view replicas

For more information about materialized view replicas, see the following:

*   Materialized view replicas
*   Create materialized view replicas

## Before you begin

Grant Identity and Access Management (IAM) roles that give users the necessary permissions to perform each task in this document. The permissions required to perform a task (if any) are listed in the "Required permissions" section of the task.

## List materialized view replicas

You can list materialized view replicas through the Google Cloud console.

### Required permissions

To list materialized view replicas in a dataset, you need the `bigquery.tables.list` IAM permission.

Each of the following predefined IAM roles includes the permissions that you need in order to list materialized view replicas in a dataset:

*   `roles/bigquery.user`
*   `roles/bigquery.metadataViewer`
*   `roles/bigquery.dataViewer`
*   `roles/bigquery.dataOwner`
*   `roles/bigquery.dataEditor`
*   `roles/bigquery.admin`

For more information on IAM roles and permissions in IAM, see Predefined roles and permissions.

To list the materialized view replicas in a dataset:

1.  In the left pane, click explore **Explorer**:
    
    ![Highlighted button for the Explorer pane.](/static/bigquery/images/explorer-tab.png)
    
    If you don't see the left pane, click last_page **Expand left pane** to open the pane.
    
2.  In the **Explorer** pane, expand your project, click **Datasets**, and then click the dataset.
    
3.  Click **Overview > Tables**. Scroll through the list to see the tables in the dataset. Tables, views, and materialized views are identified by different values in the **Type** column. Materialized view replicas have the same value as materialized views.
    

## Get information about materialized view replicas

You can get information about a materialized view replica by using SQL, the bq command-line tool, or the BigQuery API.

### Required permissions

To query information about a materialized view replica, you need the following Identity and Access Management (IAM) permissions:

*   `bigquery.tables.get`
*   `bigquery.tables.list`
*   `bigquery.routines.get`
*   `bigquery.routines.list`

Each of the following predefined IAM roles includes the preceding permissions:

*   `roles/bigquery.metadataViewer`
*   `roles/bigquery.dataViewer`
*   `roles/bigquery.admin`

For more information about BigQuery permissions, see Access control with IAM.

To get information about a materialized view replica, including the source materialized view:

### SQL

To get information about materialized view replicas, query the `INFORMATION_SCHEMA.TABLES` view:

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to BigQuery
    
2.  In the query editor, enter the following statement:
    
    SELECT * FROM PROJECT_ID.DATASET_ID.INFORMATION_SCHEMA.TABLES
    WHERE table_type = 'MATERIALIZED VIEW';
    
    Replace the following:
    
    *   `PROJECT_ID`: the name of the project that contains the materialized view replicas
    *   `DATASET_ID`: the name of the dataset that contains the materialized view replicas
    
3.  Click play_circle **Run**.
    

For more information about how to run queries, see Run an interactive query.

### bq

Use the `bq show` command:

bq show --project=project_id --format=prettyjson dataset.materialized_view_replica

Replace the following:

*   project_id: the project ID. You only need to include this flag to get information about a materialized view replica in a different project than the default project.
*   dataset: the name of the dataset that contains the materialized view replica.
*   materialized_view_replica: the name of the materialized view replica that you want information about.

Example:

Enter the following command to show information about the materialized view replica `my_mv_replica` in the `report_views` dataset in the `myproject` project.

```
bq show --project=myproject --format=prettyjson report_views.my_mv_replica
```

### API

To get materialized view replica information by using the API, call the `tables.get` method.

## Delete materialized view replicas

You can delete a materialized view replica through the Google Cloud console.

**Caution:** Deleting a materialized view replica can't be undone.

### Required permissions

To delete materialized view replicas, you need the `bigquery.tables.delete` IAM permission.

Each of the following predefined IAM roles includes the permissions that you need in order to delete a materialized view replica:

*   `bigquery.dataEditor`
*   `bigquery.dataOwner`
*   `bigquery.admin`

For more information about BigQuery Identity and Access Management (IAM), see Predefined roles and permissions.

1.  In the left pane, click explore **Explorer**:
    
    ![Highlighted button for the Explorer pane.](/static/bigquery/images/explorer-tab.png)
    
2.  In the **Explorer** pane, expand your project, click **Datasets**, and then click the dataset.
    
3.  Click **Overview > Tables**, and then click the materialized view replica.
    
4.  Click **Delete**.
    
5.  In the **Delete materialized view?** dialog, type `delete` into the field, and then click **Delete**.
    

Send feedback