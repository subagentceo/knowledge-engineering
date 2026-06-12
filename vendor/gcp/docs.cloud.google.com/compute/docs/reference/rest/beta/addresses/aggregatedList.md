# Method: addresses.aggregatedList

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: addresses.aggregatedList Stay organized with collections Save and categorize content based on your preferences.

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

Retrieves an aggregated list of addresses.

To prevent failure, it is recommended that you set the `returnPartialSuccess` parameter to `true`.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/aggregated/addresses`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

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

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "items": {
    string: {
      "addresses": [
        {
          "kind": string,
          "id": string,
          "creationTimestamp": string,
          "name": string,
          "description": string,
          "address": string,
          "prefixLength": integer,
          "status": enum,
          "region": string,
          "selfLink": string,
          "users": [
            string
          ],
          "networkTier": enum,
          "labels": {
            string: string,
            ...
          },
          "labelFingerprint": string,
          "ipVersion": enum,
          "addressType": enum,
          "purpose": enum,
          "subnetwork": string,
          "network": string,
          "ipv6EndpointType": enum,
          "ipCollection": string
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

Output only. Type of resource. Always `compute#addressAggregatedList` for aggregated lists of addresses.

`id`

`string`

Output only. Unique identifier for the resource; defined by the server.

`items`

`map (key: string, value: object)`

A list of AddressesScopedList resources.

**Key:** Output only. Name of the scope containing this set of addresses.

`items.addresses[]`

`object`

Output only. A list of addresses contained in this scope.

`items.addresses[].kind`

`string`

Output only. Type of the resource. Always `compute#address` for addresses.

`items.addresses[].id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`items.addresses[].creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`items.addresses[].name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.

`items.addresses[].description`

`string`

An optional description of this resource. Provide this field when you create the resource.

`items.addresses[].address`

`string`

The static IP address represented by this resource.

`items.addresses[].prefixLength`

`integer`

The prefix length if the resource represents an IP range.

`items.addresses[].status`

`enum`

Output only. The status of the address, which can be one of `RESERVING`, `RESERVED`, or `IN_USE`. An address that is `RESERVING` is currently in the process of being reserved. A `RESERVED` address is currently reserved and available to use. An `IN_USE` address is currently being used by another resource and is not available.

`items.addresses[].region`

`string`

Output only. The URL of the region where a regional address resides. For regional addresses, you must specify the region as a path parameter in the HTTP request URL. **This field is not applicable to global addresses.**

`items.addresses[].selfLink`

`string`

Output only. Server-defined URL for the resource.

`items.addresses[].users[]`

`string`

Output only. The URLs of the resources that are using this address.

`items.addresses[].networkTier`

`enum`

This signifies the networking tier used for configuring this address and can only take the following values: `PREMIUM` or `STANDARD`. Internal IP addresses are always Premium Tier; global external IP addresses are always Premium Tier; regional external IP addresses can be either Standard or Premium Tier.

If this field is not specified, it is assumed to be `PREMIUM`.

`items.addresses[].labels`

`map (key: string, value: string)`

Labels for this resource. These can only be added or modified by the `setLabels` method. Each label key/value pair must comply with RFC1035. Label values may be empty.

`items.addresses[].labelFingerprint`

`string (bytes format)`

A fingerprint for the labels being applied to this Address, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve an Address.

A base64-encoded string.

`items.addresses[].ipVersion`

`enum`

The IP version that will be used by this address. Valid options are `IPV4` or `IPV6`.

`items.addresses[].addressType`

`enum`

The type of address to reserve, either `INTERNAL` or `EXTERNAL`. If unspecified, defaults to `EXTERNAL`.

`items.addresses[].purpose`

`enum`

The purpose of this resource, which can be one of the following values:

*   `GCE_ENDPOINT` for addresses that are used by VM instances, alias IP ranges, load balancers, and similar resources.
*   `DNS_RESOLVER` for a DNS resolver address in a subnetwork for a Cloud DNS inbound forwarder IP addresses (regional internal IP address in a subnet of a VPC network)
*   `VPC_PEERING` for global internal IP addresses used for private services access allocated ranges.
*   `NAT_AUTO` for the regional external IP addresses used by Cloud NAT when allocating addresses using automatic NAT IP address allocation.
*   `IPSEC_INTERCONNECT` for addresses created from a private IP range that are reserved for a VLAN attachment in an _HA VPN over Cloud Interconnect_ configuration. These addresses are regional resources.
*   `SHARED_LOADBALANCER_VIP` for an internal IP address that is assigned to multiple internal forwarding rules.
*   `PRIVATE_SERVICE_CONNECT` for a private network address that is used to configure Private Service Connect. Only global internal addresses can use this purpose.

`items.addresses[].subnetwork`

`string`

The URL of the subnetwork in which to reserve the address. If an IP address is specified, it must be within the subnetwork's IP range. This field can only be used with `INTERNAL` type with a `GCE_ENDPOINT` or `DNS_RESOLVER` purpose.

`items.addresses[].network`

`string`

The URL of the network in which to reserve the address. This field can only be used with `INTERNAL` type with the `VPC_PEERING` purpose.

`items.addresses[].ipv6EndpointType`

`enum`

The endpoint type of this address, which should be `VM` or `NETLB`. This is used for deciding which type of endpoint this address can be used after the external IPv6 address reservation.

`items.addresses[].ipCollection`

`string`

Reference to the source of external IPv4 addresses, like a `PublicDelegatedPrefix` (PDP) for BYOIP. The PDP must support enhanced IPv4 allocations.

Use one of the following formats to specify a PDP when reserving an external IPv4 address using BYOIP.

*   Full resource URL, as in `https://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name`
*   Partial URL, as in
    *   projects/projectId/regions/region/publicDelegatedPrefixes/pdp-name
    *   regions/region/publicDelegatedPrefixes/pdp-name

`items.warning`

`object`

Output only. Informational warning which replaces the list of addresses when the list is empty.

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

*   `compute.addresses.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback