# Improve performance with AlloyDB for PostgreSQL

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Guides

Send feedback

# Improve performance with AlloyDB for PostgreSQL Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. You can process personal data for this feature as outlined in the Cloud Data Processing Addendum, subject to the obligations and restrictions described in the agreement under which you access Google Cloud. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

This page describes how to view and implement recommendations about the Cloud SQL Migrate to AlloyDB for PostgreSQL recommender. This recommender helps you detect instances with the following characteristics:

*   The instance is critical.
*   The cache hit rate is low, which can affect performance.

Every day, this recommender proactively analyzes instance metadata and metrics about cache hit rate and provides insights and recommendations to improve your instance performance. You can view these insights and recommendations using the Google Cloud console, gcloud CLI, or the Recommender API.

If your instance is a production instance and its cache hit rate is low, then we recommended that you migrate to AlloyDB for PostgreSQL to improve performance. Recommendations are generated daily.

## Pricing

The recommenders described on this page are all in the standard Recommender pricing tier.

## Before you begin

Before you can view recommendations and insights, do the following:

*   To get the permissions to view and work with insights and recommendations, ensure that you have the required roles.
    
    Tasks
    
    Roles
    
    View recommendations
    
    One of these roles: `recommender.cloudsqlViewer` or `cloudsql.viewer`.
    
    Apply recommendations
    
    One of these roles: `recommender.cloudsqlAdmin`, `cloudsql.editor`, or `cloudsql.admin`.
    
    For more information about roles, see understanding roles and granting Identity and Access Management (IAM) permissions.
*   Enable the Recommender API.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. Learn how to grant roles.
    
    Enable the API
    

### List performance recommendations for migrating to AlloyDB for PostgreSQL

You can list migrate to AlloyDB for PostgreSQL recommendations for improving performance using the Google Cloud console, `gcloud CLI`, or the Recommender API.

### Console

To list upgrade to AlloyDB for PostgreSQL recommendations, follow these steps:

1.  Go to the **Cloud SQL Instances** page.
    
    Go to Cloud SQL Instances
    
2.  In the **Improve instance health by investigating issues and acting on recommendations** banner, click **Expand Details**.
    

Alternatively, follow these steps:

1.  Go to the **Active Assist**.
    
    Go to the Active Assist
    
    For more information, see Getting started with the Active Assist.
    
2.  In the **All recommendations** card, click **Performance**.
    

### gcloud

Run the `gcloud recommender insights list` command as follows:

gcloud recommender recommendations list \
--project=PROJECT_ID \
--location=LOCATION \
--recommender=google.cloudsql.instance.PerformanceRecommender \
--filter=recommenderSubtype=MIGRATE_TO_ALLOYDB

Replace the following:

*   `PROJECT_ID`: Your project ID.
*   `LOCATION`: A region where your instances are located, such as `us-central1`.

### API

Call the `insights.list` method as follows:

GET https://recommender.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/recommenders/google.cloudsql.instance.PerformanceRecommender/recommendations

Replace the following:

*   `PROJECT_ID`: Your project ID.
*   `LOCATION`: A region where your instances are located, such as `us-central1`.

If the recommender detects instances that can be upgraded to AlloyDB for PostgreSQL, then those instances appear in a table. Each row shows the instance name, a brief recommendation, the location, and the last refresh date.

### View insights and detailed recommendations

You can view insights and detailed recommendations about instances that can be upgraded to AlloyDB for PostgreSQL using the Google Cloud console, `gcloud CLI`, or the Recommender API.

### Console

Do one of the following:

*   On the **Performance Recommendations** page, click the **Performance recommendations** card and then click **Migrate to AlloyDB**. The recommendation panel appears, which contains insights and detailed recommendations for the instance.
    
*   On the **Instances** page, click **Migrate to AlloyDB**. The list of instances displays only those instances for which the recommendation applies.
    

### gcloud

Run the `gcloud recommender insights list` command as follows:

gcloud recommender insights list \
--project=PROJECT_ID \
--location=LOCATION \
--insight-type=google.cloudsql.instance.PerformanceInsight
--filter=insightSubtype=READ_HEAVY_WORKLOAD

Replace the following:

*   `PROJECT_ID`: Your project ID.
*   `LOCATION`: A region where your instances are located, such as `us-central1`.

### API

Call the `insights.list` method as follows:

GET https://recommender.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/insightTypes/google.cloudsql.instance.PerformanceInsight/insights

Replace the following:

*   `PROJECT_ID`: Your project ID.
*   `LOCATION`: A region where your instances are located, such as `us-central1`.

A panel appears showing insights about metrics or information that the Insights highlight.

### Apply recommendations

To implement this recommendation, do the following:

*   To upgrade to AlloyDB for PostgreSQL:
    1.  Click **Migrate to AlloyDB** in the **Issues** column. An **Upgrade to AlloyDB** window displays providing a recommendation.
    2.  To proceed with an upgrade, click **Edit** > **Upgrade**.
*   For more information about AlloyDB for PostgreSQL, see the AlloyDB for PostgreSQL documentation.

## What's next

*   Google Cloud recommenders
*   About database observability

Send feedback