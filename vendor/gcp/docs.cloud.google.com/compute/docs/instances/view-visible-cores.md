# View the number of visible CPU cores

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# View the number of visible CPU cores Stay organized with collections Save and categorize content based on your preferences.

Linux Windows

This document describes how to view the number of visible CPU cores for a virtual machine (VM) instance.

When you view the details of a VM, you can verify if the VM has the default number of visible CPU cores, or if this number has been customized. Reducing the number of visible CPU cores for a VM can help reduce licensing costs without reducing Persistent Disk performance limits. However, reducing the number of visible CPU cores might affect network performance.

**Note:** Reducing the number of visible CPU cores for a VM might impact the performance of the VM. For more information, see Performance considerations.

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

To get the permission that you need to view the details of a VM, ask your administrator to grant you the Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) IAM role on the VM or project. For more information about granting roles, see Manage access to projects, folders, and organizations.

This predefined role contains the `compute.instances.get` permission, which is required to view the details of a VM.

You might also be able to get this permission with custom roles or other predefined roles.

## View the number of visible CPU cores for a VM

To determine if the number of visible CPU cores was customized for a VM, select one of the following options:

### Console

1.  In the Google Cloud console, go to the **VM instances** page.
    
    Go to VM instances
    
2.  In the **Name** column, click the name of the VM.
    
    The details page of the VM opens and the **Details** tab is selected.
    
3.  In the **Machine configuration** section, check the value for **Custom visible cores**. If there is no value displayed, then the VM has the default number of visible CPU cores.
    

### gcloud

To view the details of the VM, use the `gcloud compute instances describe` command.

```
gcloud compute instances describe VM_NAME \
    --zone=ZONE
```

Replace the following:

*   `VM_NAME`: the name of the VM.
    
*   `ZONE`: the zone where the VM is located.
    

If the number of visible CPU cores for the VM was customized, then the output contains the `visibleCoreCount` field as follows:

```
advancedMachineFeatures:
  visibleCoreCount: VISIBLE_CORE_COUNT
...
```

If the output doesn't contain the `visibleCoreCount` field, then the VM has the default number of visible CPU cores.

### REST

To view the details of the VM, make a `GET` request to the `instances.get` method.

```
GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME
```

Replace the following:

*   `PROJECT_ID`: the ID of the project where the VM is located.
    
*   `ZONE`: the zone where the VM is located.
    
*   `VM_NAME`: the name of the VM.
    

If the number of visible CPU cores for the VM was customized, then the output contains the `visibleCoreCount` field as follows:

```
{
  ...
  "advancedMachineFeatures": {
    visibleCoreCount: VISIBLE_CORE_COUNT
  },
  ...
}
```

If the output doesn't contain the `visibleCoreCount` field, then the VM has the default number of visible CPU cores.

## What's next

*   Customize the number of visible cores
*   Set the number of threads per core

Send feedback