# Method: regionHealthSources.aggregatedList

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: regionHealthSources.aggregatedList Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Retrieves the list of all `HealthSource` resources (all regional) available to the specified project.

To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.

### HTTP request

`GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/healthSources`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Name of the project scoping this request.

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

`includeAllScopes`

`boolean`

Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included.

`serviceProjectNumber`

`string (int64 format)`

The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api.

### Request body

The request body must be empty.

### Response body

Contains a list of HealthSourcesScopedList.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "items": {
    string: {
      "healthSources": [
        {
          "kind": string,
          "id": string,
          "creationTimestamp": string,
          "name": string,
          "description": string,
          "selfLink": string,
          "selfLinkWithId": string,
          "region": string,
          "sourceType": enum,
          "sources": [
            string
          ],
          "healthAggregationPolicy": string,
          "fingerprint": string
        }
      ],
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
    },
    ...
  },
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
  },
  "unreachables": [
    string
  ]
}

 

Fields

`kind`

`string`

Output only. Type of resource.

`id`

`string`

Output only. Unique identifier for the resource; defined by the server.

`items`

`map (key: string, value: object)`

A list of HealthSourcesScopedList resources.

**Key:** Name of the scope containing this set of HealthSources.

`items.healthSources[]`

`object`

A list of `HealthSource`s contained in this scope.

`items.healthSources[].kind`

`string`

Output only. Type of the resource. Always `compute#healthSource` for health sources.

`items.healthSources[].id`

`string (uint64 format)`

Output only. A unique identifier for this resource type. The server generates this identifier.

`items.healthSources[].creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`items.healthSources[].name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`items.healthSources[].description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`items.healthSources[].selfLink`

`string`

Output only. Server-defined URL for the resource.

`items.healthSources[].selfLinkWithId`

`string`

Output only. Server-defined URL with id for the resource.

`items.healthSources[].region`

`string`

Output only. URL of the region where the health source resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`items.healthSources[].sourceType`

`enum`

Specifies the type of the `HealthSource`. The only allowed value is `BACKEND_SERVICE`. Must be specified when the `HealthSource` is created, and cannot be mutated.

`items.healthSources[].sources[]`

`string`

URLs to the source resources. Must be size 1. Must be a `BackendService` if the `sourceType` is `BACKEND_SERVICE`. The `BackendService` must have load balancing scheme `INTERNAL` or `INTERNAL_MANAGED` and must be regional and in the same region as the `HealthSource` (cross-region deployment for `INTERNAL_MANAGED` is not supported). The `BackendService` may use only IGs, MIGs, or NEGs of type `GCE_VM_IP` or `GCE_VM_IP_PORT`. The `BackendService` may not use `haPolicy`. Can be mutated.

`items.healthSources[].healthAggregationPolicy`

`string`

URL to the `HealthAggregationPolicy` resource. Must be set. Must be regional and in the same region as the `HealthSource`. Can be mutated.

`items.healthSources[].fingerprint`

`string (bytes format)`

Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a `HealthSource`. An up-to-date fingerprint must be provided in order to patch the HealthSource; Otherwise, the request will fail with error `412 conditionNotMet`. To see the latest fingerprint, make a `get()` request to retrieve the HealthSource.

A base64-encoded string.

`items.warning`

`object`

Informational warning which replaces the list of health sources when the list is empty.

`items.warning.code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`items.warning.message`

`string`

Output only. A human-readable description of the warning code.

`items.warning.data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`items.warning.data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`items.warning.data[].value`

`string`

Output only. A warning data value corresponding to the key.

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

`unreachables[]`

`string`

Output only. Unreachable resources.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.regionHealthSources.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback