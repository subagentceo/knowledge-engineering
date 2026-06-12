# Manage context sets in Spanner Studio

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Guides

Send feedback

# Manage context sets in Spanner Studio Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms, and the Additional Terms for Generative AI Preview Products. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

For information about access to this release, see the access request page.

**PostgreSQL interface note:** The examples in this topic are intended for GoogleSQL-dialect databases. This feature doesn't support PostgreSQL interface.

This document describes how to create context sets in Spanner Studio using a context set file. Context set names must be unique within a database.

To learn about context sets, see Context sets overview.

## Before you begin

Complete the following prerequisites before creating an agent.

### Enable required services

Enable the following services for your project:

*   Data Analytics API with Gemini
*   Gemini for Google Cloud API
*   Knowledge Catalog API

### Prepare a Spanner instance

*   Make sure that a Spanner instance is available. For more information, see Create an instance.
*   Ensure that you create a database in your instance where you will create the tables. For more information, see Create a database on the Spanner instance

  
This tutorial requires you to have a database in your Spanner instance. For more information, see Create a database.

### Required roles and permissions

*   Add an IAM user or service account to the cluster. For more information, see Apply IAM roles.
*   Grant the `spanner.databaseReader` and `geminidataanalytics.queryDataUser` roles to the IAM user at the project level. For more information, see Add IAM policy binding for a project.
*   Grant roles and permissions to the IAM user at the project-level for the required databases.

## Create a context set

To create a context set, perform the following steps:

1.  In the Google Cloud console, go to the Spanner page.
    
    Go to Spanner
    
2.  Select an instance from the list, and then select a database.
    
3.  In the navigation menu, click **Spanner Studio**.
    
4.  In the **Explorer pane**, next to **Context sets**, click **View actions**.
    
5.  Click **Create context set**.
    
6.  In **Context set name**, provide a unique context set name. The context set name is case-sensitive and can contain letters, numbers, hyphens, and underscores.
    
7.  Optional. In **Context set description**, add a description for your context set.
    
8.  Click **Create**.
    

**Note:** Creating the first context set in a project can take several minutes.

## Build context sets

After creating a context set, follow the steps in Build contexts using Gemini CLI to create a context set file. You can then edit your context set to upload the context set file.

## Edit a context set

To edit a context set, perform the following steps:

1.  In the Google Cloud console, go to the Spanner page.
    
    Go to Spanner
    
2.  Select an instance from the list, and then select a database.
    
3.  In the navigation menu, click **Spanner Studio**.
    
4.  In the **Explorer pane**, next to **Context sets**, click **View actions**.
    
5.  Click **Edit context set**.
    
6.  Optional: Edit **Context set description**.
    
7.  Click **Browse** in the **Upload context set file** section, and select the context set file.
    
8.  Click **Save**.
    

## Delete a context set

To delete a context set, perform the following steps:

1.  In the Google Cloud console, go to the Spanner page.
    
    Go to Spanner
    
2.  Select an instance from the list, and then select a database.
    
3.  In the navigation menu, click **Spanner Studio**.
    
4.  In the **Explorer pane**, next to **Context sets**, click **View actions**.
    
5.  Click **Delete context set**.
    
6.  In the **Delete context set** confirmation dialog, enter the name of the context set.
    
7.  Click **Confirm** to delete the context set.
    

**Note:** Before you delete a database, you must delete all context sets associated with that database.

## What's next

*   Learn more about context sets.
*   Learn how to test a context set.
*   Learn how to build contexts using Gemini CLI.

Send feedback