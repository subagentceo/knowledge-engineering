# Disable graceful shutdown in a Compute Engine instance

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Disable graceful shutdown in a Compute Engine instance Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA products and features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

This document explains how to disable graceful shutdown in an existing Compute Engine instance. To learn more about graceful shutdown, including how to skip graceful shutdown for individual stop or delete operations, see Graceful shutdown overview.

If you've enabled graceful shutdown in an instance, then you can disable it to do the following:

*   Speed up stop or delete operations to avoid unnecessary charges.
    
*   Update instance properties that require a restart.
    

## Before you begin

*   If you haven't already, set up authentication. Authentication verifies your identity for access to Google Cloud services and APIs. To run code or samples from a local development environment, you can authenticate to Compute Engine by selecting one of the following options:
    
    Select the tab for how you plan to use the samples on this page:
    
    ### Console
    
    When you use the Google Cloud console to access Google Cloud services and APIs, you don't need to set up authentication.
    
    ### gcloud
    
    1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
        
        gcloud init
        
        If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
        **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
        
    2.  Set a default region and zone.
    
    ### REST
    
    To use the REST API samples on this page in a local development environment, you use the credentials you provide to the gcloud CLI.
    
    Install the Google Cloud CLI.
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
    For more information, see Authenticate for using REST in the Google Cloud authentication documentation.
    

### Required roles

To get the permission that you need to disable graceful shutdown in a compute instance, ask your administrator to grant you the Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) IAM role on your project. For more information about granting roles, see Manage access to projects, folders, and organizations.

This predefined role contains the `compute.instances.update` on the instance permission, which is required to disable graceful shutdown in a compute instance.

You might also be able to get this permission with custom roles or other predefined roles.

## Disable graceful shutdown in an instance

You can disable graceful shutdown in a compute instance without restarting the instance. However, you can't disable graceful shutdown while the instance is in the process of gracefully shutting down (`PENDING_STOP`).

To disable graceful shutdown in an instance, select one of the following options:

### Console

1.  In the Google Cloud console, go to the **VM instances** page.
    
    Go to VM instances
    
2.  In the **Name** column, click the instance name to view its details.
    
    The details page of the instance opens and **Details** tab is selected.
    
3.  Click edit **Edit**.
    
4.  In the **Management** section, clear the **Gracefully shut down the VM** checkbox.
    
5.  Click **Save**.
    

### gcloud

To disable graceful shutdown in an instance, use the `gcloud beta compute instances update` command with the `--no-graceful-shutdown` flag:

```
gcloud beta compute instances update INSTANCE_NAME \
    --no-graceful-shutdown \
    --zone=ZONE
```

Replace the following:

*   `INSTANCE_NAME`: the name of the instance.
    
*   `ZONE`: the zone where the instance is located.
    

### REST

1.  Create an empty JSON file.
    
2.  To view the properties of an existing instance, make a `GET` request to the beta `instances.get` method:
    
    ```
    GET https://compute.googleapis.com/compute/beta/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME
    ```
    
    Replace the following:
    
    *   `PROJECT_ID`: the ID of the project where the instance is located.
        
    *   `ZONE`: the zone where the instance is located.
        
    *   `INSTANCE_NAME`: the name of an existing instance.
        
3.  In the empty JSON file that you created in the previous steps, do the following:
    
    1.  Enter the instance properties from the `GET` request output.
        
    2.  Locate the `gracefulShutdown.enabled` field, and then change its value to `false`:
        
        ```
        {
          ...
          "scheduling": {
            ...
            "gracefulShutdown": {
              "enabled": false
            }
          },
          ...
        }
        ```
        
4.  To update the instance, make a `PUT` request to the beta `instances.update` method. Include the following:
    
    *   In the request URL, include the `mostDisruptiveAllowedAction` query parameter.
        
    *   In the request body, include the instance properties from the JSON file that you created and updated in the previous steps.
        
    
    The `PUT` request to update the instance is similar to the following:
    
    ```
    PUT https://compute.googleapis.com/compute/beta/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME?mostDisruptiveAllowedAction=ALLOWED_ACTION
    
    {
      ...
      "scheduling": {
        ...
        "gracefulShutdown": {
          "enabled": false
        }
      },
      ...
    }
    ```
    
    Replace `ALLOWED_ACTION` with one of the following values:
    
    *   **`NO_EFFECT`**: the request checks if your update request is valid and if the resources are available, but it doesn't update the instance.
        
    *   **`REFRESH`**: if the modified instance properties don't require the instance to restart, then Compute Engine updates the instance.
        

For more information about updating the properties of an instance, see Update instance properties.

## What's next

*   Limit the run time of a VM
    
*   Running shutdown scripts
    

Send feedback