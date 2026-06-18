# Method: projects.locations.datasetConfigs.patch

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Reference

Send feedback

# Method: projects.locations.datasetConfigs.patch Stay organized with collections Save and categorize content based on your preferences.

Updates a dataset configuration in a given project for a given location.

### HTTP request

`PATCH https://storageinsights.googleapis.com/v1/{datasetConfig.name=projects/*/locations/*/datasetConfigs/*}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`datasetConfig.name`

`string`

Identifier. name of resource

### Query parameters

 

Parameters

`updateMask`

``string (`FieldMask` format)``

Required. Field mask is used to specify the fields to be overwritten in the `DatasetConfig` resource by the update. The fields specified in the `updateMask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask then it returns an "Invalid Argument" error.

This is a comma-separated list of fully qualified names of fields. Example: `description, retentionPeriodDays`.

`requestId`

`string`

Optional. A unique identifier for your request. Specify the request ID if you need to retry the request. If you retry the request with the same ID within 60 minutes, the server ignores the request if it has already completed the original request.

For example, if your initial request times out and you retry the request using the same request ID, the server recognizes the original request and does not process the new request.

The request ID must be a valid UUID and cannot be a zero UUID (00000000-0000-0000-0000-000000000000).

### Request body

The request body contains an instance of `DatasetConfig`.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `name` resource:

*   `storageinsights.datasetConfigs.update`

For more information, see the IAM documentation.

Send feedback