# Handle quota errors by calling ML.GENERATE_TEXT iteratively

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Handle quota errors by calling ML.GENERATE_TEXT iteratively

This tutorial shows you how to use the BigQuery `bqutil.procedure.bqml_generate_text` public stored procedure to iterate through calls to the `ML.GENERATE_TEXT` function. Calling the function iteratively lets you address any retryable errors that occur due to exceeding the quotas and limits that apply to the function.

To review the source code for the `bqutil.procedure.bqml_generate_text` stored procedure in GitHub, see `bqml_generate_text.sqlx`. For more information about the stored procedure parameters and usage, see the README file.

This tutorial guides you through the following tasks:

*   Creating a remote model over a `gemini-2.5-flash` model.
*   Iterating through calls to the `ML.GENERATE_TEXT` function, using the remote model and the `bigquery-public-data.bbc_news.fulltext` public data table with the `bqutil.procedure.bqml_generate_text` stored procedure.

## Required permissions

To run this tutorial, you need the following Identity and Access Management (IAM) roles:

*   Create and use BigQuery datasets, connections, and models: BigQuery Admin (`roles/bigquery.admin`).
*   Grant permissions to the connection's service account: Project IAM Admin (`roles/resourcemanager.projectIamAdmin`).

These predefined roles contain the permissions required to perform the tasks in this document. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

*   Create a dataset: `bigquery.datasets.create`
*   Create, delegate, and use a connection: `bigquery.connections.*`
*   Set the default connection: `bigquery.config.*`
*   Set service account permissions: `resourcemanager.projects.getIamPolicy` and `resourcemanager.projects.setIamPolicy`
*   Create a model and run inference:
    *   `bigquery.jobs.create`
    *   `bigquery.models.create`
    *   `bigquery.models.getData`
    *   `bigquery.models.updateData`
    *   `bigquery.models.updateMetadata`

You might also be able to get these permissions with custom roles or other predefined roles.

## Costs

In this document, you use the following billable components of Google Cloud:

*   **BigQuery ML**: You incur costs for the data that you process in BigQuery.
*   **Gemini Enterprise Agent Platform**: You incur costs for calls to the Agent Platform model.

To generate a cost estimate based on your projected usage, use the pricing calculator.

New Google Cloud users might be eligible for a free trial.

For more information about BigQuery pricing, see BigQuery pricing.

For more information about Agent Platform pricing, see Agent Platform pricing.

## Before you begin

1.  In the Google Cloud console, on the project selector page, select or create a Google Cloud project.
    
    **Roles required to select or create a project**
    
    *   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    *   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. Learn how to grant roles.
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    Go to project selector
    
2.  Verify that billing is enabled for your Google Cloud project.
    
3.  Enable the BigQuery, BigQuery Connection, and Agent Platform API APIs.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. Learn how to grant roles.
    
    Enable the APIs
    

## Create a dataset

Create a BigQuery dataset to store your models and sample data:

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to the **BigQuery** page
    
2.  In the **Explorer** pane, click your project name.
    
3.  Click more_vert **View actions > Create dataset**.
    
4.  On the **Create dataset** page, do the following:
    
    1.  For **Dataset ID**, enter `sample`.
        
    2.  For **Location type**, select **Multi-region**, and then select **US (multiple regions in United States)**.
        
    3.  Leave the remaining default settings as they are, and click **Create dataset**.
        

## Create the text generation model

Create a remote model that represents a hosted Agent Platform `gemini-2.5-flash` model:

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to BigQuery
    
2.  In the query editor, run the following statement:
    
    CREATE OR REPLACE MODEL `sample.generate_text`
      REMOTE WITH CONNECTION DEFAULT
      OPTIONS (ENDPOINT = 'gemini-2.5-flash');
    
    The query takes several seconds to complete, after which the `generate_text` model appears in the `sample` dataset in the **Explorer** pane. Because the query uses a `CREATE MODEL` statement to create a model, there are no query results.
    

## Run the stored procedure

Run the `bqutil.procedure.bqml_generate_text` stored procedure, which iterates through calls to the `ML.GENERATE_TEXT` function using the `sample.generate_text` model and the `bigquery-public-data.bbc_news.fulltext` public data table:

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to BigQuery
    
2.  In the query editor, run the following statement:
    
    CALL `bqutil.procedure.bqml_generate_text`(
        "bigquery-public-data.bbc_news.fulltext",   -- source table
        "PROJECT_ID.sample.news_generated_text",  -- destination table
        "PROJECT_ID.sample.generate_text",        -- model
        "body",                                     -- content column
        ["filename"],                               -- key columns
        '{}'                                        -- optional arguments
    );
    
    Replace `PROJECT_ID` with the project ID of the project you are using for this tutorial.
    
    The stored procedure creates a `sample.news_generated_text` table to contain the output of the `ML.GENERATE_TEXT` function.
    
3.  When the query is finished running, confirm that there are no rows in the `sample.news_generated_text` table that contain a retryable error. In the query editor, run the following statement:
    
    SELECT *
    FROM `sample.news_generated_text`
    WHERE ml_generate_text_status LIKE '%A retryable error occurred%';
    
    The query returns the message `No data to display`.
    

## Clean up

**Caution**: Deleting a project has the following effects:

*   **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
*   **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects can help you avoid exceeding project quota limits.

2.  In the Google Cloud console, go to the **Manage resources** page.
    
    Go to Manage resources
    
3.  In the project list, select the project that you want to delete, and then click **Delete**.
4.  In the dialog, type the project ID, and then click **Shut down** to delete the project.

Send feedback