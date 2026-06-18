# Method: Backups.DeleteBackup

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   MySQL
*   Reference

Send feedback

# Method: Backups.DeleteBackup Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Examples
*   Try it!

Deletes the backup.

### HTTP request

`DELETE https://sqladmin.googleapis.com/v1/{name=projects/*/backups/*}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The name of the backup to delete. Format: projects/{project}/backups/{backup}

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