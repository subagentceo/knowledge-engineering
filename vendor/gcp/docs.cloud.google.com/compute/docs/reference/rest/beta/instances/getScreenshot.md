# Method: instances.getScreenshot

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: instances.getScreenshot Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Returns the screenshot from the specified instance.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/zones/{zone}/instances/{instance}/screenshot`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`zone`

`string`

The name of the zone for this request.

`instance`

`string`

Name of the instance scoping this request.

### Request body

The request body must be empty.

### Response body

An instance's screenshot.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "contents": string
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#screenshot` for the screenshots.

`contents`

`string`

Output only. The Base64-encoded screenshot data.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.instances.getScreenshot`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback