# Method: folders.locations.entitlements.grants.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Method: folders.locations.entitlements.grants.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   IAM Permissions
*   Examples
*   Try it!

Lists grants for a given entitlement.

### HTTP request

`GET https://privilegedaccessmanager.googleapis.com/v1/{parent=folders/*/locations/*/entitlements/*}/grants`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource which owns the grants.

### Query parameters

 

Parameters

`pageSize`

`integer`

Optional. Requested page size. The server may return fewer items than requested. If unspecified, the server picks an appropriate default.

`pageToken`

`string`

Optional. A token identifying a page of results the server should return.

`filter`

`string`

Optional. Filtering results.

`orderBy`

`string`

Optional. Hint for how to order the results

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListGrantsResponse`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `parent` resource:

*   `privilegedaccessmanager.grants.list`

For more information, see the IAM documentation.

Send feedback