# Method: projects.locations.connections.delete

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Reference

Send feedback

# Method: projects.locations.connections.delete Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Deletes connection and associated credential.

### HTTP request

`DELETE https://bigqueryconnection.googleapis.com/v1beta1/{name=projects/*/locations/*/connections/*}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. Name of the deleted connection, for example: `projects/{projectId}/locations/{locationId}/connections/{connectionId}`

Authorization requires the following IAM permission on the specified resource `name`:

*   `bigquery.connections.delete`

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/bigquery`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback