# REST Resource: regionTargetHttpsProxies

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# REST Resource: regionTargetHttpsProxies Stay organized with collections Save and categorize content based on your preferences.

*   Resource: TargetHttpsProxy
    *   JSON representation
*   Methods

## Resource: TargetHttpsProxy

Represents a Target HTTPS Proxy resource.

Google Compute Engine has two Target HTTPS Proxy resources:

*   Global
*   Regional

A target HTTPS proxy is a component of Google Cloud HTTPS load balancers.

*   targetHttpsProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director.
*   regionTargetHttpsProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers.

Forwarding rules reference a target HTTPS proxy, and the target proxy then references a URL map. For more information, read Using Target Proxies and Forwarding rule concepts.

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "selfLink": string,
  "urlMap": string,
  "sslCertificates": [
    string
  ],
  "certificateMap": string,
  "quicOverride": enum,
  "sslPolicy": string,
  "region": string,
  "proxyBind": boolean,
  "httpFilters": [
    string
  ],
  "serverTlsPolicy": string,
  "authentication": string,
  "authorizationPolicy": string,
  "authorization": string,
  "fingerprint": string,
  "httpKeepAliveTimeoutSec": integer,
  "tlsEarlyData": enum
}

 

Fields

`kind`

`string`

Output only. Type of resource. Always `compute#targetHttpsProxy` for target HTTPS proxies.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`urlMap`

`string`

A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map:

*   `https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map`
*   `projects/project/global/urlMaps/url-map`
*   `global/urlMaps/url-map`

`sslCertificates[]`

`string`

URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED.

The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificateMap instead.

Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates.

Certificate Manager Certificates accepted formats are:

*   `//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}`.
*   `https://certificatemanager.googleapis.com/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}`.

`certificateMap`

`string`

URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead.

If set, sslCertificates will be ignored.

Accepted format is `//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}`.

`quicOverride`

`enum`

Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify `NONE`, `ENABLE`, or `DISABLE`.

*   When `quic-override` is set to `NONE`, Google manages whether QUIC is used.
*   When `quic-override` is set to `ENABLE`, the load balancer uses QUIC when possible.
*   When `quic-override` is set to `DISABLE`, the load balancer doesn't use QUIC.
*   If the `quic-override` flag is not specified, `NONE` is implied.

`sslPolicy`

`string`

URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured.

`region`

`string`

Output only. URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies.

`proxyBind`

`boolean`

This field only applies when the forwarding rule that references this target proxy has a `loadBalancingScheme` set to `INTERNAL_SELF_MANAGED`.

When this field is set to `true`, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them.

The default is `false`.

`httpFilters[]`

`string`

URLs to `networkservices.HttpFilter` resources enabled for xDS clients using this configuration. For example, `https://networkservices.googleapis.com/beta/projects/project/locations/location/httpFilters/httpFilter` Only filters that handle outbound connection and stream events may be specified. These filters work in conjunction with a default set of HTTP filters that may already be configured by Traffic Director. Traffic Director will determine the final location of these filters within xDS configuration based on the name of the HTTP filter. If Traffic Director positions multiple filters at the same location, those filters will be in the same order as specified in this list.

`httpFilters` only applies for loadbalancers with `loadBalancingScheme` set to `INTERNAL_SELF_MANAGED`. See `ForwardingRule` for more details.

`serverTlsPolicy`

`string`

Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic.

`serverTlsPolicy` only applies to a global `TargetHttpsProxy` attached to `globalForwardingRules` with the `loadBalancingScheme` set to `INTERNAL_SELF_MANAGED` or `EXTERNAL` or `EXTERNAL_MANAGED` or `INTERNAL_MANAGED`. It also applies to a regional `TargetHttpsProxy` attached to regional `forwardingRules` with the `loadBalancingScheme` set to `EXTERNAL_MANAGED` or `INTERNAL_MANAGED`. For details which `ServerTlsPolicy` resources are accepted with `INTERNAL_SELF_MANAGED` and which with `EXTERNAL`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED` `loadBalancingScheme` consult `ServerTlsPolicy` documentation.

If left blank, communications are not encrypted.

`authentication   **(deprecated)**`

`string`

This item is deprecated!

[Deprecated] Use `serverTlsPolicy` instead.

`authorizationPolicy`

`string`

Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy.

Refer to the `AuthorizationPolicy` resource for additional details.

`authorizationPolicy` only applies to a global `TargetHttpsProxy` attached to `globalForwardingRules` with the `loadBalancingScheme` set to `INTERNAL_SELF_MANAGED`.

Note: This field currently has no impact.

`authorization   **(deprecated)**`

`string`

This item is deprecated!

[Deprecated] Use `authorizationPolicy` instead.

`fingerprint`

`string (bytes format)`

Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a `TargetHttpsProxy`. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error `412 conditionNotMet`. To see the latest fingerprint, make a `get()` request to retrieve the TargetHttpsProxy.

A base64-encoded string.

`httpKeepAliveTimeoutSec`

`integer`

Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used.

For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds.

For classic Application Load Balancers, this option is not supported.

`tlsEarlyData`

`enum`

Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3).

This can improve application performance, especially on networks where interruptions may be common, such as on mobile.

Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included.

Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant.

The default value is DISABLED.

 

## Methods

### delete

Deletes the specified TargetHttpsProxy resource.

### get

Returns the specified TargetHttpsProxy resource in the specified region.

### insert

Creates a TargetHttpsProxy resource in the specified project and region using the data included in the request.

### list

Retrieves the list of TargetHttpsProxy resources available to the specified project in the specified region.

### patch

Patches the specified regional TargetHttpsProxy resource with the data included in the request.

### setSslCertificates

Replaces SslCertificates for TargetHttpsProxy.

### setUrlMap

Changes the URL map for TargetHttpsProxy.

### testIamPermissions

Returns permissions that a caller has on the specified resource.

Send feedback