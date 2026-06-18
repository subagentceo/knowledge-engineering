# Method: regionSnapshotSettings.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: regionSnapshotSettings.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

regionSnapshotSettings.get region snapshot settings.

### HTTP request

`GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshotSettings`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`region`

`string`

Name of the region for this request.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains data with the following structure:

JSON representation

{
  "storageLocation": {
    "policy": enum,
    "locations": {
      string: {
        "name": string
      },
      ...
    }
  },
  "accessLocation": {
    "locations": {
      string: {
        "region": string
      },
      ...
    },
    "policy": enum
  }
}

 

Fields

`storageLocation`

`object`

Policy of which storage location is going to be resolved, and additional data that particularizes how the policy is going to be carried out.

`storageLocation.policy`

`enum`

The chosen location policy.

`storageLocation.locations[]`

`map (key: string, value: object)`

When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified.

`storageLocation.locations[].name`

`string`

Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified.

`accessLocation`

`object`

(Regional snapshots use only)Policy of which location is allowed to access snapshot.

`accessLocation.locations[]`

`map (key: string, value: object)`

List of regions that can restore a regional snapshot from the current region

`accessLocation.locations[].region`

`string`

Accessible region name

`accessLocation.policy`

`enum`

Policy of which location is allowed to access snapshot.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.snapshotSettings.get`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback