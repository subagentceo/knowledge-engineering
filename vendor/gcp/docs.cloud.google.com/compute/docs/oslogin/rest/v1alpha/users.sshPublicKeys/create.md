# Method: users.sshPublicKeys.create

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: users.sshPublicKeys.create Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Create an SSH public key

### HTTP request

`POST https://oslogin.googleapis.com/v1alpha/{parent=users/*}/sshPublicKeys`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The unique ID for the user in format `users/{user}`.

### Request body

The request body contains an instance of `SshPublicKey`.

### Response body

If successful, the response body contains a newly created instance of `SshPublicKey`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/compute`

For more information, see the Authentication Overview.

Send feedback