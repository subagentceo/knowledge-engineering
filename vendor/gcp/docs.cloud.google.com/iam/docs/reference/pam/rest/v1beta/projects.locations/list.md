# Method: projects.locations.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Method: projects.locations.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   IAM Permissions
*   Examples
*   Try it!

Lists information about the supported locations for this service. This method can be called in two ways:

*   **List all public locations:** Use the path `GET /v1/locations`.
*   **List project-visible locations:** Use the path `GET /v1/projects/{projectId}/locations`. This may include public locations as well as private or other locations specifically visible to the project.

### HTTP request

`GET https://privilegedaccessmanager.googleapis.com/v1beta/{name=projects/*}/locations`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

The resource that owns the locations collection, if applicable.

### Query parameters

 

Parameters

`filter`

`string`

A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160.

`pageSize`

`integer`

The maximum number of results to return. If not set, the service selects a default.

`pageToken`

`string`

A page token received from the `nextPageToken` field in the response. Send that page token to receive the subsequent page.

`extraLocationTypes[]`

`string`

Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListLocationsResponse`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `name` resource:

*   `privilegedaccessmanager.locations.list`

For more information, see the IAM documentation.

Send feedback