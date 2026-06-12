# Method: machineTypes.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: machineTypes.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Retrieves a list of machine types available to the specified project.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/zones/{zone}/machineTypes`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`zone`

`string`

The name of the zone for this request.

### Query parameters

 

Parameters

`maxResults`

`integer (uint32 format)`

The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)

`pageToken`

`string`

Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.

`filter`

`string`

A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request.

If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`.

For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.

The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use:

```
labels.owner:*
```

You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.

To filter on multiple expressions, provide each separate expression within parentheses. For example:

```
(scheduling.automaticRestart = true)
(cpuPlatform = "Intel Skylake")
```

By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example:

```
(cpuPlatform = "Intel Skylake") OR
(cpuPlatform = "Intel Broadwell") AND
(scheduling.automaticRestart = true)
```

If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples:

`fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")`

The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field.

For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.

You cannot combine constraints on multiple fields using regular expressions.

`orderBy`

`string`

Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.

You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.

Currently, only sorting by `name` or `creationTimestamp desc` is supported.

`returnPartialSuccess`

`boolean`

Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.

For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code.

### Request body

The request body must be empty.

### Response body

Contains a list of machine types.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "items": [
    {
      "kind": string,
      "id": string,
      "creationTimestamp": string,
      "name": string,
      "description": string,
      "guestCpus": integer,
      "memoryMb": integer,
      "maximumPersistentDisks": integer,
      "maximumPersistentDisksSizeGb": string,
      "deprecated": {
        "state": enum,
        "replacement": string,
        "deprecated": string,
        "obsolete": string,
        "deleted": string,
        "stateOverride": {
          "locationRolloutPolicies": {
            string: string,
            ...
          },
          "defaultRolloutTime": string
        }
      },
      "zone": string,
      "selfLink": string,
      "isSharedCpu": boolean,
      "accelerators": [
        {
          "guestAcceleratorType": string,
          "guestAcceleratorCount": integer
        }
      ],
      "architecture": enum,
      "bundledLocalSsds": {
        "partitionCount": integer,
        "defaultInterface": string
      }
    }
  ],
  "nextPageToken": string,
  "selfLink": string,
  "warning": {
    "code": enum,
    "message": string,
    "data": [
      {
        "key": string,
        "value": string
      }
    ]
  }
}

 

Fields

`kind`

`string`

Output only. Type of resource. Always `compute#machineTypeList` for lists of machine types.

`id`

`string`

Output only. Unique identifier for the resource; defined by the server.

`items[]`

`object`

A list of MachineType resources.

`items[].kind`

`string`

Output only. The type of the resource. Always `compute#machineType` for machine types.

`items[].id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`items[].creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`items[].name`

`string`

Output only. Name of the resource.

`items[].description`

`string`

Output only. An optional textual description of the resource.

`items[].guestCpus`

`integer`

Output only. The number of virtual CPUs that are available to the instance.

`items[].memoryMb`

`integer`

Output only. The amount of physical memory available to the instance, defined in MB.

`items[].maximumPersistentDisks`

`integer`

Output only. Maximum persistent disks allowed.

`items[].maximumPersistentDisksSizeGb`

`string (int64 format)`

Output only. Maximum total persistent disks size (GB) allowed.

`items[].deprecated`

`object`

Output only. The deprecation status associated with this machine type. Only applicable if the machine type is unavailable.

`items[].deprecated.state`

`enum`

The deprecation state of this resource. This can be `ACTIVE`, `DEPRECATED`, `OBSOLETE`, or `DELETED`. Operations which communicate the end of life date for an image, can use `ACTIVE`. Operations which create a new resource using a `DEPRECATED` resource will return successfully, but with a warning indicating the deprecated resource and recommending its replacement. Operations which use `OBSOLETE` or `DELETED` resources will be rejected and result in an error.

`items[].deprecated.replacement`

`string`

The URL of the suggested replacement for a deprecated resource. The suggested replacement resource must be the same kind of resource as the deprecated resource.

`items[].deprecated.deprecated`

`string`

An optional RFC3339 timestamp on or after which the state of this resource is intended to change to `DEPRECATED`. This is only informational and the status will not change unless the client explicitly changes it.

`items[].deprecated.obsolete`

`string`

An optional RFC3339 timestamp on or after which the state of this resource is intended to change to `OBSOLETE`. This is only informational and the status will not change unless the client explicitly changes it.

`items[].deprecated.deleted`

`string`

An optional RFC3339 timestamp on or after which the state of this resource is intended to change to `DELETED`. This is only informational and the status will not change unless the client explicitly changes it.

`items[].deprecated.stateOverride`

`object`

The rollout policy for this deprecation. This policy is only enforced by image family views. The rollout policy restricts the zones where the associated resource is considered in a deprecated state. When the rollout policy does not include the user specified zone, or if the zone is rolled out, the associated resource is considered in a deprecated state.

The rollout policy for this deprecation is read-only, except for allowlisted users. This field might not be configured. To view the latest non-deprecated image in a specific zone, use the `imageFamilyViews.get` method.

`items[].deprecated.stateOverride.locationRolloutPolicies`

`map (key: string, value: string)`

Location based rollout policies to apply to the resource.

Currently only zone names are supported and must be represented as valid URLs, like: zones/us-central1-a.

The value expects an RFC3339 timestamp on or after which the update is considered rolled out to the specified location.

`items[].deprecated.stateOverride.defaultRolloutTime`

`string`

An optional RFC3339 timestamp on or after which the update is considered rolled out to any zone that is not explicitly stated.

`items[].zone`

`string`

Output only. The name of the zone where the machine type resides, such as us-central1-a.

`items[].selfLink`

`string`

Output only. Server-defined URL for the resource.

`items[].isSharedCpu`

`boolean`

Output only. Whether this machine type has a shared CPU. See Shared-core machine types for more information.

`items[].accelerators[]`

`object`

Output only. A list of accelerator configurations assigned to this machine type.

`items[].accelerators[].guestAcceleratorType`

`string`

The accelerator type resource name, not a full URL, e.g. `nvidia-tesla-t4`.

`items[].accelerators[].guestAcceleratorCount`

`integer`

Number of accelerator cards exposed to the guest.

`items[].architecture`

`enum`

Output only. The architecture of the machine type.

`items[].bundledLocalSsds`

`object`

Output only. The configuration of bundled local SSD for the machine type.

`items[].bundledLocalSsds.partitionCount`

`integer`

The number of partitions.

`items[].bundledLocalSsds.defaultInterface`

`string`

The default disk interface if the interface is not specified.

`nextPageToken`

`string`

Output only. This token allows you to get the next page of results for list requests. If the number of results is larger than `maxResults`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results.

`selfLink`

`string`

Output only. Server-defined URL for this resource.

`warning`

`object`

Output only. Informational warning message.

`warning.code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`warning.message`

`string`

Output only. A human-readable description of the warning code.

`warning.data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`warning.data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`warning.data[].value`

`string`

Output only. A warning data value corresponding to the key.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.machineTypes.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback