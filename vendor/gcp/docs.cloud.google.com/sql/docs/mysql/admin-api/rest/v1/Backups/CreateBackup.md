# Method: Backups.CreateBackup

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   MySQL
*   Reference

Send feedback

# Method: Backups.CreateBackup Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Examples
*   Try it!

Creates a backup for a Cloud SQL instance. This API can be used only to create on-demand backups.

### HTTP request

`POST https://sqladmin.googleapis.com/v1/{parent=projects/*}/backups`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource where this backup is created. Format: projects/{project}

### Request body

The request body contains an instance of `Backup`.

### Response body

If successful, the response body contains a newly created instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/sqlservice.admin`

For more information, see the Authentication Overview.

Send feedback