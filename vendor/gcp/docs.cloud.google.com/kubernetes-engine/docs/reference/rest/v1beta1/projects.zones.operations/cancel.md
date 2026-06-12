# Method: projects.zones.operations.cancel

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Reference

Send feedback

# Method: projects.zones.operations.cancel Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   Try it!

Cancels the specified operation.

### HTTP request

`POST https://container.googleapis.com/v1beta1/projects/{projectId}/zones/{zone}/operations/{operationId}:cancel`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`projectId   **(deprecated)**`

`string`

Deprecated. The Google Developers Console project ID or project number. This field has been deprecated and replaced by the name field.

`zone   **(deprecated)**`

`string`

Deprecated. The name of the Google Compute Engine zone in which the operation resides. This field has been deprecated and replaced by the name field.

`operationId   **(deprecated)**`

`string`

Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "name": string
}

 

Fields

`name`

`string`

The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/*/locations/*/operations/*`.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/container`

For more information, see the Authentication Overview.

Send feedback