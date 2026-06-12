# Method: backupRuns.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Reference

Send feedback

# Method: backupRuns.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   Examples
*   Try it!

Lists all backup runs associated with the project or a given instance and configuration in the reverse chronological order of the backup initiation time.

### HTTP request

`GET https://sqladmin.googleapis.com/v1/projects/{project}/instances/{instance}/backupRuns`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`project`

`string`

Project ID of the project that contains the instance.

`instance`

`string`

Cloud SQL instance ID, or "-" for all instances. This does not include the project ID.

### Query parameters

 

Parameters

`maxResults`

`integer`

Maximum number of backup runs per response.

`pageToken`

`string`

A previously-returned page token representing part of the larger set of results to view.

### Request body

The request body must be empty.

### Response body

Backup run list results.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "items": [
    {
      object (`BackupRun`)
    }
  ],
  "nextPageToken": string
}

 

Fields

`kind`

`string`

This is always `sql#backupRunsList`.

`items[]`

``object (`BackupRun`)``

A list of backup runs in reverse chronological order of the enqueued time.

`nextPageToken`

`string`

The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/sqlservice.admin`

For more information, see the Authentication Overview.

Send feedback