# Method: projects.instances.performDiskShrink

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Reference

Send feedback

# Method: projects.instances.performDiskShrink Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   PerformDiskShrinkContext
    *   JSON representation
*   Examples
*   Try it!

Perform Disk Shrink on primary instance.

### HTTP request

`POST https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/performDiskShrink`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`project`

`string`

Project ID of the project that contains the instance.

`instance`

`string`

Cloud SQL instance ID. This does not include the project ID.

### Request body

The request body contains an instance of `PerformDiskShrinkContext`.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/sqlservice.admin`

For more information, see the Authentication Overview.

## PerformDiskShrinkContext

Perform disk shrink context.

JSON representation

{
  "targetSizeGb": string
}

 

Fields

`targetSizeGb`

`string (int64 format)`

The target disk shrink size in GigaBytes.

Send feedback