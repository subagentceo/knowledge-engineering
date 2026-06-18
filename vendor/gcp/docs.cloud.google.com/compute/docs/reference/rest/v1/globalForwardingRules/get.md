# Method: globalForwardingRules.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: globalForwardingRules.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Returns the specified GlobalForwardingRule resource. Gets a list of available forwarding rules by making a `list()` request.

### HTTP request

`GET https://compute.googleapis.com/compute/v1/projects/{project}/global/forwardingRules/{forwardingRule}`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`forwardingRule`

`string`

Name of the ForwardingRule resource to return.

### Request body

The request body must be empty.

### Response body

Represents a Forwarding Rule resource.

Forwarding rule resources in Google Cloud can be either regional or global in scope:

*   Global
*   Regional

A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules can also reference target instances and Cloud VPN Classic gateways (targetVpnGateway).

For more information, read Forwarding rule concepts and Using protocol forwarding.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "region": string,
  "IPAddress": string,
  "IPProtocol": enum,
  "portRange": string,
  "ports": [
    string
  ],
  "target": string,
  "selfLink": string,
  "selfLinkWithId": string,
  "loadBalancingScheme": enum,
  "subnetwork": string,
  "network": string,
  "backendService": string,
  "serviceDirectoryRegistrations": [
    {
      "namespace": string,
      "service": string,
      "serviceDirectoryRegion": string
    }
  ],
  "serviceLabel": string,
  "serviceName": string,
  "networkTier": enum,
  "labels": {
    string: string,
    ...
  },
  "labelFingerprint": string,
  "ipVersion": enum,
  "fingerprint": string,
  "allPorts": boolean,
  "allowGlobalAccess": boolean,
  "metadataFilters": [
    {
      "filterMatchCriteria": enum,
      "filterLabels": [
        {
          "name": string,
          "value": string
        }
      ]
    }
  ],
  "isMirroringCollector": boolean,
  "sourceIpRanges": [
    string
  ],
  "pscConnectionId": string,
  "pscConnectionStatus": enum,
  "baseForwardingRule": string,
  "allowPscGlobalAccess": boolean,
  "noAutomateDnsZone": boolean,
  "ipCollection": string,
  "externalManagedBackendBucketMigrationState": enum,
  "externalManagedBackendBucketMigrationTestingPercentage": number
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#forwardingRule` for forwarding rule resources.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`region`

`string`

Output only. URL of the region where the regional forwarding rule resides. This field is not applicable to global forwarding rules. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`IPAddress`

`string`

IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced `target` or `backendService`. While creating a forwarding rule, specifying an `IPAddress` is required under the following circumstances:

*   When the `target` is set to `targetGrpcProxy` and `validateForProxyless` is set to `true`, the `IPAddress` should be set to `0.0.0.0`.
*   When the `target` is a Private Service Connect Google APIs bundle, you must specify an `IPAddress`.

Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address.

Use one of the following formats to specify an IP address while creating a forwarding rule:

*   IP address number, as in `100.1.2.3`
*   IPv6 address range, as in `2600:1234::/96`
*   Full resource URL, as in `https://www.googleapis.com/compute/v1/projects/projectId/regions/region/addresses/address-name`
*   Partial URL or by name, as in:
    *   `projects/projectId/regions/region/addresses/address-name`
    *   `regions/region/addresses/address-name`
    *   `global/addresses/address-name`
    *   `address-name`

The forwarding rule's `target` or `backendService`, and in most cases, also the `loadBalancingScheme`, determine the type of IP address that you can use. For detailed information, see IP address specifications.

When reading an `IPAddress`, the API always returns the IP address number.

`IPProtocol`

`enum`

The IP protocol to which this rule applies.

For protocol forwarding, valid options are `TCP`, `UDP`, `ESP`, `AH`, `SCTP`, `ICMP` and `L3_DEFAULT`.

The valid IP protocols are different for different load balancing products as described in Load balancing features.

`portRange`

`string`

The `ports`, `portRange`, and `allPorts` fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule.

The `portRange` field has the following limitations:

*   It requires that the forwarding rule `IPProtocol` be TCP, UDP, or SCTP, and
*   It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN.
*   Some products have restrictions on what ports can be used. See port specifications for details.

For external forwarding rules, two or more forwarding rules cannot use the same `[IPAddress, IPProtocol]` pair, and cannot have overlapping `portRange`s.

For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same `[IPAddress, IPProtocol]` pair, and cannot have overlapping `portRange`s.

@pattern: \d+(?:-\d+)?

`ports[]`

`string`

The `ports`, `portRange`, and `allPorts` fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule.

The `ports` field has the following limitations:

*   It requires that the forwarding rule `IPProtocol` be TCP, UDP, or SCTP, and
*   It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding.
*   You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous.

For external forwarding rules, two or more forwarding rules cannot use the same `[IPAddress, IPProtocol]` pair if they share at least one port number.

For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same `[IPAddress, IPProtocol]` pair if they share at least one port number.

@pattern: \d+(?:-\d+)?

`target`

`string`

The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource.

The forwarded traffic must be of a type appropriate to the target object.

*   For load balancers, see the "Target" column in Port specifications.
*   For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle:
    *   `vpc-sc` - APIs that support VPC Service Controls.
    *   `all-apis` - All supported Google APIs.
*   For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`selfLinkWithId`

`string`

Output only. Server-defined URL for this resource with the resource id.

`loadBalancingScheme`

`enum`

Specifies the forwarding rule type.

For more information about forwarding rules, refer to Forwarding rule concepts.

`subnetwork`

`string`

This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6.

If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6.

Available from 2026-03-01..

`network`

`string`

This field is not used for global external load balancing.

For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used.

For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided.

Available from 2026-03-01..

`backendService`

`string`

Identifies the backend service to which the forwarding rule sends traffic. Required for internal and external passthrough Network Load Balancers; must be omitted for all other load balancer types.

`serviceDirectoryRegistrations[]`

`object`

Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource.

`serviceDirectoryRegistrations[].namespace`

`string`

Service Directory namespace to register the forwarding rule under.

`serviceDirectoryRegistrations[].service`

`string`

Service Directory service to register the forwarding rule under.

`serviceDirectoryRegistrations[].serviceDirectoryRegion`

`string`

[Optional] Service Directory region to register this global forwarding rule under. Default to "us-central1". Only used for PSC for Google APIs. All PSC for Google APIs forwarding rules on the same network should use the same Service Directory region.

`serviceLabel`

`string`

An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name.

The label must be 1-63 characters long, and comply with RFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

This field is only used for internal load balancing.

`serviceName`

`string`

Output only. The internal fully qualified service name for this forwarding rule.

This field is only used for internal load balancing.

`networkTier`

`enum`

This signifies the networking tier used for configuring this load balancer and can only take the following values: `PREMIUM`, `STANDARD`.

For regional ForwardingRule, the valid values are `PREMIUM` and `STANDARD`. For GlobalForwardingRule, the valid value is `PREMIUM`.

If this field is not specified, it is assumed to be `PREMIUM`. If `IPAddress` is specified, this value must be equal to the networkTier of the Address.

`labels`

`map (key: string, value: string)`

Labels for this resource. These can only be added or modified by the `setLabels` method. Each label key/value pair must comply with RFC1035. Label values may be empty.

Available from 2026-03-01..

`labelFingerprint`

`string (bytes format)`

A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve a ForwardingRule.

A base64-encoded string.

Available from 2026-03-01..

`ipVersion`

`enum`

The IP Version that will be used by this forwarding rule. Valid options are `IPV4` or `IPV6`.

`fingerprint`

`string (bytes format)`

Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request.

To see the latest fingerprint, make a `get()` request to retrieve a ForwardingRule.

A base64-encoded string.

`allPorts`

`boolean`

The `ports`, `portRange`, and `allPorts` fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule.

The `allPorts` field has the following limitations:

*   It requires that the forwarding rule `IPProtocol` be TCP, UDP, SCTP, or L3_DEFAULT.
*   It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding.
*   Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requires `allPorts` be set to true.

`allowGlobalAccess`

`boolean`

If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created.

`metadataFilters[]`

`object`

Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g. `TargetHttpProxy`, `UrlMap`) referenced by the `ForwardingRule` are not visible to those proxies.

For each `metadataFilter` in this list, if its `filterMatchCriteria` is set to MATCH_ANY, at least one of the `filterLabel`s must match the corresponding label provided in the metadata. If its `filterMatchCriteria` is set to MATCH_ALL, then all of its `filterLabel`s must match with corresponding labels provided in the metadata. If multiple `` metadataFilters `are specified, all of them need to be satisfied in order to be considered a match.` ``

``` `` `metadataFilters` specified here will be applifed before those specified in the `UrlMap` that this `ForwardingRule` references. `` ```

``` `` `metadataFilters` only applies to Loadbalancers that have their `` loadBalancingScheme ``` set to `INTERNAL_SELF_MANAGED`.

`metadataFilters[].filterMatchCriteria`

`enum`

Specifies how individual filter label matches within the list of `filterLabels` and contributes toward the overall `metadataFilter` match.

Supported values are:

*   `MATCH_ANY`: at least one of the `filterLabels` must have a matching label in the provided metadata.
*   `MATCH_ALL`: all `filterLabels` must have matching labels in the provided metadata.

`metadataFilters[].filterLabels[]`

`object`

The list of label value pairs that must match labels in the provided metadata based on `filterMatchCriteria`

This list must not be empty and can have at the most 64 entries.

`metadataFilters[].filterLabels[].name`

`string`

Name of metadata label.

The name can have a maximum length of 1024 characters and must be at least 1 character long.

`metadataFilters[].filterLabels[].value`

`string`

The value of the label must match the specified value.

value can have a maximum length of 1024 characters.

`isMirroringCollector`

`boolean`

Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if a `PacketMirroring` rule applies to them. This can only be set to true for load balancers that have their `loadBalancingScheme` set to `INTERNAL`.

`sourceIpRanges[]`

`string`

If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme is `EXTERNAL`. Each `sourceIpRange` entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24).

`pscConnectionId`

`string (uint64 format)`

Output only. The PSC connection id of the PSC forwarding rule.

`pscConnectionStatus`

`enum`

`baseForwardingRule`

`string`

Output only. The URL for the corresponding base forwarding rule. By base forwarding rule, we mean the forwarding rule that has the same IP address, protocol, and port settings with the current forwarding rule, but without sourceIPRanges specified. Always empty if the current forwarding rule does not have sourceIPRanges specified.

`allowPscGlobalAccess`

`boolean`

This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.

`noAutomateDnsZone`

`boolean`

This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable.

`ipCollection`

`string`

Resource reference of a `PublicDelegatedPrefix`. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode.

Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as in `https://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name` Partial URL, as in:

*   `projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name`
*   `regions/region/publicDelegatedPrefixes/sub-pdp-name`

`externalManagedBackendBucketMigrationState`

`enum`

Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC.

To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage.

Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL.

`externalManagedBackendBucketMigrationTestingPercentage`

`number`

Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer.

The value of this field must be in the range [0, 100].

This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.globalForwardingRules.get`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback