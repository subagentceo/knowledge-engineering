# Method: projects.instances.operations.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Reference

Send feedback

# Method: projects.instances.operations.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.

### HTTP request

Choose a location:

global europe-west8 me-central2 us-central1 us-central2 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 us-west8 us-east7

  
`GET https://spanner.googleapis.com/v1/{name=projects/*/instances/*/operations}`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

The name of the operation's parent resource.

### Query parameters

 

Parameters

`filter`

`string`

The standard list filter.

`pageSize`

`integer`

The standard list page size.

`pageToken`

`string`

The standard list page token.

`returnPartialSuccess`

`boolean`

When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the `ListOperationsResponse.unreachable` field.

This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`.

This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListOperationsResponse`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/spanner.admin`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback