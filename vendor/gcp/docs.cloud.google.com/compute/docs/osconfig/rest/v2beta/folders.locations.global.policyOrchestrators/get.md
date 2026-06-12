# Method: folders.locations.global.policyOrchestrators.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: folders.locations.global.policyOrchestrators.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Retrieves an existing policy orchestrator, parented by a folder.

### HTTP request

`GET https://osconfig.googleapis.com/v2beta/{name=folders/*/locations/global/policyOrchestrators/*}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The resource name.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `PolicyOrchestrator`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback