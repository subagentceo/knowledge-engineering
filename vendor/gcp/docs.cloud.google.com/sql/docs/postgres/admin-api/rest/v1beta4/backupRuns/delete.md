# Method: backupRuns.delete

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Reference

Send feedback

# Method: backupRuns.delete Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Examples
*   Try it!

Deletes the backup taken by a backup run.

### HTTP request

`DELETE https://sqladmin.googleapis.com/sql/v1beta4/projects/{project}/instances/{instance}/backupRuns/{id}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`project`

`string`

Project ID of the project that contains the instance.

`instance`

`string`

Cloud SQL instance ID. This does not include the project ID.

`id`

`string (int64 format)`

The ID of the backup run to delete. To find a backup run ID, use the list method.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/sqlservice.admin`

For more information, see the Authentication Overview.

Send feedback