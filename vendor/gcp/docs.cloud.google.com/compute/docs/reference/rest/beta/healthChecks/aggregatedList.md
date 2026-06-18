# Method: healthChecks.aggregatedList

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: healthChecks.aggregatedList Stay organized with collections Save and categorize content based on your preferences.

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

Retrieves the list of all HealthCheck resources, regional and global, available to the specified project.

To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/aggregated/healthChecks`

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

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "items": {
    string: {
      "healthChecks": [
        {
          "kind": string,
          "id": string,
          "creationTimestamp": string,
          "name": string,
          "description": string,
          "checkIntervalSec": integer,
          "timeoutSec": integer,
          "unhealthyThreshold": integer,
          "healthyThreshold": integer,
          "type": enum,
          "tcpHealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "request": string,
            "response": string,
            "proxyHeader": enum
          },
          "sslHealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "request": string,
            "response": string,
            "proxyHeader": enum
          },
          "httpHealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "host": string,
            "requestPath": string,
            "proxyHeader": enum,
            "response": string
          },
          "httpsHealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "host": string,
            "requestPath": string,
            "proxyHeader": enum,
            "response": string
          },
          "http2HealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "host": string,
            "requestPath": string,
            "proxyHeader": enum,
            "response": string
          },
          "grpcHealthCheck": {
            "port": integer,
            "portName": string,
            "portSpecification": enum,
            "grpcServiceName": string
          },
          "grpcTlsHealthCheck": {
            "port": integer,
            "portSpecification": enum,
            "grpcServiceName": string
          },
          "sourceRegions": [
            string
          ],
          "selfLink": string,
          "region": string,
          "logConfig": {
            "enable": boolean
          }
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

A list of HealthChecksScopedList resources.

**Key:** Name of the scope containing this set of HealthChecks.

`items.healthChecks[]`

`object`

A list of HealthChecks contained in this scope.

`items.healthChecks[].kind`

`string`

Output only. Type of the resource.

`items.healthChecks[].id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`items.healthChecks[].creationTimestamp`

`string`

Output only. Creation timestamp in 3339 text format.

`items.healthChecks[].name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. For example, a name that is 1-63 characters long, matches the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`, and otherwise complies with RFC1035. This regular expression describes a name where the first character is a lowercase letter, and all following characters are a dash, lowercase letter, or digit, except the last character, which isn't a dash.

`items.healthChecks[].description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`items.healthChecks[].checkIntervalSec`

`integer`

How often (in seconds) to send a health check. The default value is 5 seconds.

`items.healthChecks[].timeoutSec`

`integer`

How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for `timeoutSec` to have greater value than `checkIntervalSec`.

`items.healthChecks[].unhealthyThreshold`

`integer`

A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2.

`items.healthChecks[].healthyThreshold`

`integer`

A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2.

`items.healthChecks[].type`

`enum`

Specifies the type of the healthCheck, either `TCP`, `SSL`, `HTTP`, `HTTPS`, `HTTP2` or `GRPC`. Exactly one of the protocol-specific health check fields must be specified, which must match `type` field.

`items.healthChecks[].tcpHealthCheck`

`object`

`items.healthChecks[].tcpHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. The default value is `80`. Valid values are `1` through `65535`.

`items.healthChecks[].tcpHealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].tcpHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].tcpHealthCheck.request`

`string`

Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection.

`items.healthChecks[].tcpHealthCheck.response`

`string`

Creates a content-based TCP health check. In addition to establishing a TCP connection, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp

`items.healthChecks[].tcpHealthCheck.proxyHeader`

`enum`

Specifies the type of proxy header to append before sending data to the backend, either `NONE` or `PROXY_V1`. The default is `NONE`.

`items.healthChecks[].sslHealthCheck`

`object`

`items.healthChecks[].sslHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. The default value is `443`. Valid values are `1` through `65535`.

`items.healthChecks[].sslHealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].sslHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].sslHealthCheck.request`

`string`

Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection and SSL handshake.

`items.healthChecks[].sslHealthCheck.response`

`string`

Creates a content-based SSL health check. In addition to establishing a TCP connection and the TLS handshake, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp

`items.healthChecks[].sslHealthCheck.proxyHeader`

`enum`

Specifies the type of proxy header to append before sending data to the backend, either `NONE` or `PROXY_V1`. The default is `NONE`.

`items.healthChecks[].httpHealthCheck`

`object`

`items.healthChecks[].httpHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. The default value is `80`. Valid values are `1` through `65535`.

`items.healthChecks[].httpHealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].httpHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Also supported in legacy HTTP health checks for target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for pass-through load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].httpHealthCheck.host`

`string`

The value of the host header in the HTTP health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest

`items.healthChecks[].httpHealthCheck.requestPath`

`string`

The request path of the HTTP health check request. The default value is `/`. Must comply with RFC3986.

`items.healthChecks[].httpHealthCheck.proxyHeader`

`enum`

Specifies the type of proxy header to append before sending data to the backend, either `NONE` or `PROXY_V1`. The default is `NONE`.

`items.healthChecks[].httpHealthCheck.response`

`string`

Creates a content-based HTTP health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http

`items.healthChecks[].httpsHealthCheck`

`object`

`items.healthChecks[].httpsHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. The default value is `443`. Valid values are `1` through `65535`.

`items.healthChecks[].httpsHealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].httpsHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].httpsHealthCheck.host`

`string`

The value of the host header in the HTTPS health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest

`items.healthChecks[].httpsHealthCheck.requestPath`

`string`

The request path of the HTTPS health check request. The default value is `/`. Must comply with RFC3986.

`items.healthChecks[].httpsHealthCheck.proxyHeader`

`enum`

Specifies the type of proxy header to append before sending data to the backend, either `NONE` or `PROXY_V1`. The default is `NONE`.

`items.healthChecks[].httpsHealthCheck.response`

`string`

Creates a content-based HTTPS health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http

`items.healthChecks[].http2HealthCheck`

`object`

`items.healthChecks[].http2HealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. The default value is `443`. Valid values are `1` through `65535`.

`items.healthChecks[].http2HealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].http2HealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].http2HealthCheck.host`

`string`

The value of the host header in the HTTP/2 health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest

`items.healthChecks[].http2HealthCheck.requestPath`

`string`

The request path of the HTTP/2 health check request. The default value is `/`. Must comply with RFC3986.

`items.healthChecks[].http2HealthCheck.proxyHeader`

`enum`

Specifies the type of proxy header to append before sending data to the backend, either `NONE` or `PROXY_V1`. The default is `NONE`.

`items.healthChecks[].http2HealthCheck.response`

`string`

Creates a content-based HTTP/2 health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http

`items.healthChecks[].grpcHealthCheck`

`object`

`items.healthChecks[].grpcHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. Valid values are `1` through `65535`.

`items.healthChecks[].grpcHealthCheck.portName`

`string`

Not supported.

`items.healthChecks[].grpcHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].grpcHealthCheck.grpcServiceName`

`string`

The gRPC service name for the health check. This field is optional. The value of grpcServiceName has the following meanings by convention:  
- Empty serviceName means the overall status of all services at the backend.  
- Non-empty serviceName means the health of that gRPC service, as defined by the owner of the service.  
The grpcServiceName can only be ASCII.

`items.healthChecks[].grpcTlsHealthCheck`

`object`

`items.healthChecks[].grpcTlsHealthCheck.port`

`integer`

The TCP port number to which the health check prober sends packets. Valid values are `1` through `65535`.

`items.healthChecks[].grpcTlsHealthCheck.portSpecification`

`enum`

Specifies how a port is selected for health checking. Can be one of the following values:  
`USE_FIXED_PORT`: Specifies a port number explicitly using the `port` field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, `GCE_VM_IP` network endpoint groups, `GCE_VM_IP_PORT` network endpoint groups, and instance group backends.  
`USE_NAMED_PORT`: Not supported.  
`USE_SERVING_PORT`: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example, `GCE_VM_IP_PORT` network endpoint groups and instance group backends.  
For `GCE_VM_IP_PORT` network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.

`items.healthChecks[].grpcTlsHealthCheck.grpcServiceName`

`string`

The gRPC service name for the health check. This field is optional. The value of grpcServiceName has the following meanings by convention:  
- Empty serviceName means the overall status of all services at the backend.  
- Non-empty serviceName means the health of that gRPC service, as defined by the owner of the service.  
The grpcServiceName can only be ASCII.

`items.healthChecks[].sourceRegions[]`

`string`

The list of cloud regions from which health checks are performed. If any regions are specified, then exactly 3 regions should be specified. The region names must be valid names of Google Cloud regions. This can only be set for global health check. If this list is non-empty, then there are restrictions on what other health check fields are supported and what other resources can use this health check:

*   SSL, HTTP2, and GRPC protocols are not supported.
*   The TCP `request` field is not supported.
*   The `proxyHeader` field for HTTP, HTTPS, and TCP is not supported.
*   The `checkIntervalSec` field must be at least 30.
*   The health check cannot be used with BackendService nor with managed instance group auto-healing.

`items.healthChecks[].selfLink`

`string`

Output only. Server-defined URL for the resource.

`items.healthChecks[].region`

`string`

Output only. Region where the health check resides. Not applicable to global health checks.

`items.healthChecks[].logConfig`

`object`

Configure logging on this health check.

`items.healthChecks[].logConfig.enable`

`boolean`

Indicates whether or not to export logs. This is false by default, which means no health check logging will be done.

`items.warning`

`object`

Informational warning which replaces the list of backend services when the list is empty.

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

*   `compute.healthChecks.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback