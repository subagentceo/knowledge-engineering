# Method: licenses.testIamPermissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: licenses.testIamPermissions Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
    *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Returns permissions that a caller has on the specified resource.

**Caution** This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.

### HTTP request

`POST https://compute.googleapis.com/compute/v1/projects/{project}/global/licenses/{resource}/testIamPermissions`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`resource`

`string`

Name or id of the resource for this request.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "permissions": [
    string
  ]
}

 

Fields

`permissions[]`

`string`

The set of permissions to check for the 'resource'. Permissions with wildcards (such as '*' or 'storage.*') are not allowed.

### Response body

If successful, the response body contains data with the following structure:

JSON representation

{
  "permissions": [
    string
  ]
}

 

Fields

`permissions[]`

`string`

A subset of `TestPermissionsRequest.permissions` that the caller is allowed.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.licenses.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback