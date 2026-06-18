# Method: locations.workforcePools.providers.keys.create

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Method: locations.workforcePools.providers.keys.create Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Examples
*   Try it!

Creates a new `WorkforcePoolProviderKey` in a `WorkforcePoolProvider`.

### HTTP request

`POST https://iam.googleapis.com/v1/{parent=locations/*/workforcePools/*/providers/*}/keys`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The provider to create this key in.

### Query parameters

 

Parameters

`workforcePoolProviderKeyId`

`string`

Required. The ID to use for the key, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters `[a-z0-9-]`.

### Request body

The request body contains an instance of `WorkforcePoolProviderKey`.

### Response body

If successful, the response body contains a newly created instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/iam`

For more information, see the Authentication Overview.

Send feedback