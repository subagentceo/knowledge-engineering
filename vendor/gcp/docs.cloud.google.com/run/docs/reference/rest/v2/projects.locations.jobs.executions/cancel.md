# Method: projects.locations.jobs.executions.cancel

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Reference

Send feedback

# Method: projects.locations.jobs.executions.cancel Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes

Cancels an Execution.

### HTTP request

`POST https://run.googleapis.com/v2/{name}:cancel`

### Path parameters

 

Parameters

`name`

`string`

Required. The name of the Execution to cancel. Format: `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`, where `{project}` can be project id or number. It takes the form `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`.

Authorization requires the following IAM permission on the specified resource `name`:

*   `run.jobs.run`

### Request body

The request body contains data with the following structure:

JSON representation

{
  "validateOnly": boolean,
  "etag": string
}

 

Fields

`validateOnly`

`boolean`

Indicates that the request should be validated without actually cancelling any resources.

`etag`

`string`

A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback