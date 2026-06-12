# Method: regionSslPolicies.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: regionSslPolicies.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Lists all of the ordered rules present in a single specified policy.

### HTTP request

`GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{sslPolicy}`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`region`

`string`

Name of the region scoping this request.

`sslPolicy`

`string`

Name of the SSL policy to update. The name must be 1-63 characters long, and comply with RFC1035.

### Request body

The request body must be empty.

### Response body

Represents an SSL Policy resource.

Use SSL policies to control SSL features, such as versions and cipher suites, that are offered by Application Load Balancers and proxy Network Load Balancers. For more information, read SSL policies overview.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "selfLink": string,
  "name": string,
  "description": string,
  "profile": enum,
  "minTlsVersion": enum,
  "enabledFeatures": [
    string
  ],
  "customFeatures": [
    string
  ],
  "postQuantumKeyExchange": enum,
  "fingerprint": string,
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
  "region": string
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#sslPolicy`for SSL policies.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`name`

`string`

Name of the resource. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`profile`

`enum`

Profile specifies the set of SSL features that can be used by the load balancer when negotiating SSL with clients. This can be one of `COMPATIBLE`, `MODERN`, `RESTRICTED`, `FIPS_202205`, or `CUSTOM`. If using `CUSTOM`, the set of SSL features to enable must be specified in the `customFeatures` field. If using `FIPS_202205`, the `minTlsVersion` field must be set to `TLS_1_2`.

`minTlsVersion`

`enum`

The minimum version of SSL protocol that can be used by the clients to establish a connection with the load balancer. This can be one of `TLS_1_0`, `TLS_1_1`, `TLS_1_2`, `TLS_1_3`. When set to `TLS_1_3`, the profile field must be set to `RESTRICTED`.

`enabledFeatures[]`

`string`

Output only. The list of features enabled in the SSL policy.

`customFeatures[]`

`string`

A list of features enabled when the selected profile is CUSTOM. The method returns the set of features that can be specified in this list. This field must be empty if the profile is not `CUSTOM`.

`postQuantumKeyExchange`

`enum`

One of `DEFAULT`, `ENABLED`, or `DEFERRED`. Controls whether the load balancer negotiates X25519MLKEM768 key exchange when clients advertise support for it. When set to `DEFAULT`, or if no SSL Policy is attached to the target proxy, the load balancer disallows X25519MLKEM768 key exchange before October 2026, and allows it afterward. When set to `ENABLED`, the load balancer allows X25519MLKEM768 key exchange. When set to `DEFERRED`, the load balancer disallows X25519MLKEM768 key exchange until October 2027, and allows it afterward.

`fingerprint`

`string (bytes format)`

Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a `SslPolicy`. An up-to-date fingerprint must be provided in order to update the `SslPolicy`, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve an SslPolicy.

A base64-encoded string.

`warnings[]`

`object`

Output only. If potential misconfigurations are detected for this SSL policy, this field will be populated with warning messages.

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

`region`

`string`

Output only. URL of the region where the regional SSL policy resides. This field is not applicable to global SSL policies.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.regionSslPolicies.get`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback