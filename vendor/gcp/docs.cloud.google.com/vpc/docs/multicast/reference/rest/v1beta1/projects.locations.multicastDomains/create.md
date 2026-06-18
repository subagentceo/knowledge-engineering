# Method: projects.locations.multicastDomains.create

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Networking
*   Virtual Private Cloud
*   Reference

Send feedback

# Method: projects.locations.multicastDomains.create Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body

Creates a new multicast domain in a given project and location.

### HTTP request

`POST https://networkservices.googleapis.com/v1beta1/{parent=projects/*/locations/*}/multicastDomains`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource of the multicast domain. Use the following format: `projects/*/locations/global`.

### Query parameters

 

Parameters

`multicastDomainId`

`string`

Required. A unique name for the multicast domain. The name is restricted to letters, numbers, and hyphen, with the first character a letter, and the last a letter or a number. The name must not exceed 48 characters.

`requestId`

`string`

Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request.

For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments.

The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).

### Request body

The request body contains an instance of `MulticastDomain`.

### Response body

If successful, the response body contains a newly created instance of `Operation`.

Send feedback