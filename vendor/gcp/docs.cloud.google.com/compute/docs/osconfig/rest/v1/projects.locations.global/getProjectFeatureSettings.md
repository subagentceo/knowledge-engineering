# Method: projects.locations.global.getProjectFeatureSettings

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: projects.locations.global.getProjectFeatureSettings Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   IAM Permissions
*   Try it!

global.getProjectFeatureSettings returns the VM Manager feature settings for a project.

### HTTP request

`GET https://osconfig.googleapis.com/v1/{name=projects/*/locations/global/projectFeatureSettings}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. Name specifies the URL for the ProjectFeatureSettings resource:

`projects/projectId/locations/global/projectFeatureSettings`

.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ProjectFeatureSettings`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `name` resource:

*   `osconfig.projectFeatureSettings.get`

For more information, see the IAM documentation.

Send feedback