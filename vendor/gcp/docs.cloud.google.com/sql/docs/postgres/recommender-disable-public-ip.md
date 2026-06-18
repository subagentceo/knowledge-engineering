# Improve instance security by disabling public IP

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Guides

Send feedback

# Improve instance security by disabling public IP Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

This page describes how to view and implement recommendations about disabling public IP access for instances that violate the `constraints/sql.restrictPublicIp` organization policy enforced by your administrator. This policy restricts the configuration of public IP on your instances. The policy violation occurs when public IP access already exists for an instance at the time of enforcement of the constraint. This recommender is called **Disable public IP**.

Every day, this recommender detects the instances that violate the `constraints/sql.restrictPublicIp` organization policy and provides insights and recommendations to improve your instance security. You can view insights and detailed recommendations about these instances by using the Google Cloud console, gcloud CLI, or the Recommender API.

For more information about organization policies, see Cloud SQL organization policies.

## Before you begin

Ensure that you enable the Recommender API.

### Required roles and permissions

To get the permissions to view and work with insights and recommendations, ensure that you have the required Identity and Access Management (IAM) roles.

Tasks

Roles

View recommendations

`recommender.cloudsqlViewer` or `cloudsql.admin`.

Apply recommendations

`cloudsql.editor` or `cloudsql.admin`.

For more information about IAM roles, see IAM basic and predefined roles reference and Manage access to projects, folders, and organizations.

## List the recommendations

To list the recommendations, follow these steps:

### Console

To list recommendations about instance security, follow these steps:

1.  Go to the **Cloud SQL Instances** page.
    
    Go to Cloud SQL Instances
    
2.  View the **Issues** column in the instance table.
    

Alternatively, follow these steps:

1.  Go to the **Active Assist**.
    
    Go to the Active Assist
    
    For more information, see Exploring recommendations.
    
2.  In the **All recommendations** card, click **Security**.
    

### gcloud

Run the `gcloud recommender recommendations list` command as follows:

gcloud recommender recommendations list \
--project=PROJECT_ID \
--location=LOCATION \
--recommender=google.cloudsql.instance.SecurityRecommender \
--filter=recommenderSubtype=DISABLE_PUBLIC_IP_TO_MEET_ORG_POLICY

Replace the following:

*   PROJECT_ID: Your project ID.
*   LOCATION: A region where your instances are located, such as us-central1.

### API

Call the `recommendations.list` method as follows:

GET https://recommender.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/recommenders/google.cloudsql.instance.SecurityRecommender/recommendations?filter=recommenderSubtype=DISABLE_PUBLIC_IP_TO_MEET_ORG_POLICY

Replace the following:

*   PROJECT_ID: Your project ID.
*   LOCATION: A region where your instances are located, such as `us-central1`.

## View insights and detailed recommendations

To view insights and detailed recommendations, follow these steps:

### Console

After listing the recommendations, click a recommendation. The recommendation panel appears, which contains insights and detailed recommendations.

### gcloud

Run the `gcloud recommender insights list` command as follows:

gcloud recommender insights list \
--project=PROJECT_ID \
--location=LOCATION \
--insight-type=google.cloudsql.instance.SecurityInsight \
--filter=insightSubtype=ORG_POLICY_TO_RESTRICT_PUBLIC_IP_VIOLATED

Replace the following:

*   PROJECT_ID: Your project ID.
*   LOCATION : A region where your instances are located, such as `us-central1`.

### API

Call the `insights.list` method as follows:

GET https://recommender.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/insightTypes/google.cloudsql.instance.SecurityInsight/insights?filter=insightSubtype=ORG_POLICY_TO_RESTRICT_PUBLIC_IP_VIOLATED

Replace the following:

*   PROJECT_ID: Your project ID.
*   LOCATION: A region where your instances are located, such as `us-central1`.

## Apply the recommendation

### Console

To implement the recommendation, do the following:

1.  Click **Manage instance IP assignment**.
    
2.  Configure your clients to connect to the instance using private IP.
    
3.  Disable public IP on your instance.
    

### gcloud

To implement the recommendation, do the following:

1.  Configure your clients to connect to the instance using private IP.
    
2.  Disable public IP on your instance.
    

### API

To implement the recommendation, do the following:

1.  Configure your clients to connect to the instance using private IP.
    
2.  Disable public IP on your instance.
    

## What's next

*   Disable public IP
*   Configure private IP
*   Google Cloud recommenders
*   Blog: Maximize your Cloud ROI

Send feedback