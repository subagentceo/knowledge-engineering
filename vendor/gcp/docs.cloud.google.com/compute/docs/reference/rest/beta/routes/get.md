# Method: routes.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: routes.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Returns the specified Route resource.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/global/routes/{route}`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`route`

`string`

Name of the Route resource to return.

### Request body

The request body must be empty.

### Response body

Represents a Route resource.

A route defines a path from VM instances in the VPC network to a specific destination. This destination can be inside or outside the VPC network. For more information, read the Routes overview.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "network": string,
  "tags": [
    string
  ],
  "destRange": string,
  "priority": integer,
  "nextHopInstance": string,
  "nextHopIp": string,
  "nextHopNetwork": string,
  "nextHopGateway": string,
  "nextHopPeering": string,
  "nextHopIlb": string,
  "warnings": [
    {
      "code": enum,
      "message": string,
      "data": [
        {
          "key": string,
          "value": string
        }
      ]
    }
  ],
  "nextHopVpnTunnel": string,
  "nextHopHub": string,
  "nextHopInterconnectAttachment": string,
  "selfLink": string,
  "routeType": enum,
  "asPaths": [
    {
      "pathSegmentType": enum,
      "asLists": [
        integer
      ]
    }
  ],
  "routeStatus": enum,
  "nextHopOrigin": enum,
  "nextHopMed": integer,
  "nextHopInterRegionCost": integer,
  "params": {
    "resourceManagerTags": {
      string: string,
      ...
    }
  }
}

 

Fields

`kind`

`string`

Output only. Type of this resource. Always `compute#routes` for Route resources.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.

`description`

`string`

An optional description of this resource. Provide this field when you create the resource.

`network`

`string`

Fully-qualified URL of the network that this route applies to.

`tags[]`

`string`

A list of instance tags to which this route applies.

`destRange`

`string`

The destination range of outgoing packets that this route applies to. Both IPv4 and IPv6 are supported. Must specify an IPv4 range (e.g. 192.0.2.0/24) or an IPv6 range in RFC 4291 format (e.g. 2001:db8::/32). IPv6 range will be displayed using RFC 5952 compressed format.

`priority`

`integer (uint32 format)`

The priority of this route. Priority is used to break ties in cases where there is more than one matching route of equal prefix length. In cases where multiple routes have equal prefix length, the one with the lowest-numbered priority value wins. The default value is `1000`. The priority value must be from `0` to `65535`, inclusive.

`nextHopInstance`

`string`

The URL to an instance that should handle matching packets. You can specify this as a full or partial URL. For example:  
`https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/`

`nextHopIp`

`string`

The network IP address of an instance that should handle matching packets. Both IPv6 address and IPv4 addresses are supported. Must specify an IPv4 address in dot-decimal notation (e.g. 192.0.2.99) or an IPv6 address in RFC 4291 format (e.g. 2001:db8::2d9:51:0:0 or 2001:db8:0:0:2d9:51:0:0). IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address.

`nextHopNetwork`

`string`

The URL of the local network if it should handle matching packets.

`nextHopGateway`

`string`

The URL to a gateway that should handle matching packets. You can only specify the internet gateway using a full or partial valid URL:  
`projects/project/global/gateways/default-internet-gateway`

`nextHopPeering`

`string`

Output only. The network peering name that should handle matching packets, which should conform to RFC1035.

`nextHopIlb`

`string`

The URL to a forwarding rule of type `loadBalancingScheme=INTERNAL` that should handle matching packets or the IP address of the forwarding Rule. For example, the following are all valid URLs:

*   `https://www.googleapis.com/compute/v1/projects/project/regions/region/forwardingRules/forwardingRule`
*   `regions/region/forwardingRules/forwardingRule`

If an IP address is provided, must specify an IPv4 address in dot-decimal notation or an IPv6 address in RFC 4291 format. For example, the following are all valid IP addresses:

*   `10.128.0.56`
*   `2001:db8::2d9:51:0:0`
*   `2001:db8:0:0:2d9:51:0:0`

IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address.

`warnings[]`

`object`

Output only. If potential misconfigurations are detected for this route, this field will be populated with warning messages.

`warnings[].code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`warnings[].message`

`string`

Output only. A human-readable description of the warning code.

`warnings[].data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`warnings[].data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`warnings[].data[].value`

`string`

Output only. A warning data value corresponding to the key.

`nextHopVpnTunnel`

`string`

The URL to a VpnTunnel that should handle matching packets.

`nextHopHub`

`string`

Output only. The full resource name of the Network Connectivity Center hub that will handle matching packets.

`nextHopInterconnectAttachment`

`string`

Output only. The URL to an InterconnectAttachment which is the next hop for the route. This field will only be populated for dynamic routes generated by Cloud Router with a linked interconnectAttachment or the static route generated by each L2 Interconnect Attachment.

`selfLink`

`string`

Output only. Server-defined fully-qualified URL for this resource.

`routeType`

`enum`

Output only. The type of this route, which can be one of the following values:

*   'TRANSIT' for a transit route that this router learned from another Cloud Router and will readvertise to one of its BGP peers
*   'SUBNET' for a route from a subnet of the VPC
*   'BGP' for a route learned from a BGP peer of this router
*   'STATIC' for a static route

`asPaths[]`

`object`

Output only. AS path.

`asPaths[].pathSegmentType`

`enum`

Output only. The type of the AS Path, which can be one of the following values:

*   'AS_SET': unordered set of autonomous systems that the route in has traversed
*   'AS_SEQUENCE': ordered set of autonomous systems that the route has traversed
*   'AS_CONFED_SEQUENCE': ordered set of Member Autonomous Systems in the local confederation that the route has traversed
*   'AS_CONFED_SET': unordered set of Member Autonomous Systems in the local confederation that the route has traversed

`asPaths[].asLists[]`

`integer`

Output only. The AS numbers of the AS Path.

`routeStatus`

`enum`

Output only. The status of the route. This status applies to dynamic routes learned by Cloud Routers. It is also applicable to routes undergoing migration.

`nextHopOrigin`

`enum`

Output only. Indicates the origin of the route. Can be `IGP` (Interior Gateway Protocol), `EGP` (Exterior Gateway Protocol), or `INCOMPLETE`.

`nextHopMed`

`integer (uint32 format)`

Output only. Multi-Exit Discriminator, a BGP route metric that indicates the desirability of a particular route in a network.

`nextHopInterRegionCost`

`integer (uint32 format)`

Output only. Internal fixed region-to-region cost that Google Cloud calculates based on factors such as network performance, distance, and available bandwidth between regions.

`params`

`object`

Input only. [Input Only] Additional params passed with the request, but not persisted as part of resource payload.

`params.resourceManagerTags`

`map (key: string, value: string)`

Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: * {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} * {"123/environment" : "production", "345/abc" : "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.routes.get`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback