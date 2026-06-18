# Method: projects.locations.datasetConfigs.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Reference

Send feedback

# Method: projects.locations.datasetConfigs.get Stay organized with collections Save and categorize content based on your preferences.

Gets the dataset configuration in a given project for a given location.

### HTTP request

`GET https://storageinsights.googleapis.com/v1/{name=projects/*/locations/*/datasetConfigs/*}`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. Name of the resource

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `DatasetConfig`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `name` resource:

*   `storageinsights.datasetConfigs.get`

For more information, see the IAM documentation.

Send feedback