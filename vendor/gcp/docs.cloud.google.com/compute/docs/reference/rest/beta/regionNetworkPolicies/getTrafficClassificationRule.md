# Method: regionNetworkPolicies.getTrafficClassificationRule

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: regionNetworkPolicies.getTrafficClassificationRule Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Gets a rule of the specified priority.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/getTrafficClassificationRule`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`region`

`string`

Name of the region of this request.

`networkPolicy`

`string`

Name of the network policy to which the queried rule belongs.

### Query parameters

 

Parameters

`priority`

`integer`

The priority of the rule to get from the network policy.

### Request body

The request body must be empty.

### Response body

Represents a traffic classification rule that describes one or more match conditions along with the action to be taken when traffic matches this condition.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "ruleName": string,
  "description": string,
  "priority": integer,
  "match": {
    "srcIpRanges": [
      string
    ],
    "destIpRanges": [
      string
    ],
    "layer4Configs": [
      {
        "ipProtocol": string,
        "ports": [
          string
        ]
      }
    ]
  },
  "action": {
    "type": string,
    "trafficClass": enum,
    "dscpMode": enum,
    "dscpValue": integer
  },
  "ruleTupleCount": integer,
  "targetServiceAccounts": [
    string
  ],
  "targetSecureTags": [
    {
      "name": string,
      "state": enum
    }
  ],
  "disabled": boolean
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#networkPolicyTrafficClassificationRule` for network policy traffic classification rules

`ruleName`

`string`

An optional name for the rule. This field is not a unique identifier and can be updated.

`description`

`string`

An optional description for this resource.

`priority`

`integer`

An integer indicating the priority of a rule in the list. The priority must be a positive value between 1 and 2147482647. The priority values from 2147482648 to 2147483647 (1000) are reserved for system default network policy rules. Rules are evaluated from highest to lowest priority where 1 is the highest priority and 2147483647 is the lowest priority.

`match`

`object`

A match condition that outgoing traffic is evaluated against. If it evaluates to true, the corresponding 'action' is enforced.

`match.srcIpRanges[]`

`string`

CIDR IP address range. Maximum number of source CIDR IP ranges allowed is 5000.

`match.destIpRanges[]`

`string`

CIDR IP address range. Maximum number of destination CIDR IP ranges allowed is 5000.

`match.layer4Configs[]`

`object`

Pairs of IP protocols and ports that the rule should match.

`match.layer4Configs[].ipProtocol`

`string`

The IP protocol to which this rule applies. The protocol type is required when creating a traffic classification rule. This value can either be one of the following well known protocol strings (`tcp`, `udp`, `icmp`, `esp`, `ah`, `ipip`, `sctp`), or the IP protocol number.

`match.layer4Configs[].ports[]`

`string`

An optional list of ports to which this rule applies. This field is only applicable for UDP, TCP or SCTP protocol. Each entry must be either an integer or a range. If not specified, this rule applies to connections through any port.

Example inputs include: `["22"]`, `["80","443"]`, and `["12345-12349"]`.

`action`

`object`

The Action to perform when the client connection triggers the rule.

`action.type`

`string`

Always "apply_traffic_classification" for traffic classification rules.

`action.trafficClass`

`enum`

The traffic class that should be applied to the matching packet.

`action.dscpMode`

`enum`

DSCP mode. When set to `AUTO`, the DSCP value will be picked automatically based on selected `trafficClass`. Otherwise, `dscpValue` needs to be explicitly specified.

`action.dscpValue`

`integer`

Custom DSCP value from 0-63 range.

`ruleTupleCount`

`integer`

Output only. Calculation of the complexity of a single network policy rule.

`targetServiceAccounts[]`

`string`

A list of service accounts indicating the sets of instances that are applied with this rule.

`targetSecureTags[]`

`object`

A list of secure tags that controls which instances the traffic classification rule applies to. If `targetSecureTag` are specified, then the traffic classification rule applies only to instances in the VPC network that have one of those EFFECTIVE secure tags, if all the `targetSecureTag` are in INEFFECTIVE state, then this rule will be ignored. `targetSecureTag` may not be set at the same time as `targetServiceAccounts`. If neither `targetServiceAccounts` nor `targetSecureTag` are specified, the traffic classification rule applies to all instances on the specified network. Maximum number of target label tags allowed is 256.

`targetSecureTags[].name`

`string`

Name of the secure tag, created with TagManager's TagValue API.

`targetSecureTags[].state`

`enum`

Output only. State of the secure tag, either `EFFECTIVE` or `INEFFECTIVE`. A secure tag is `INEFFECTIVE` when it is deleted or its network is deleted.

`disabled`

`boolean`

Denotes whether the network policy rule is disabled. When set to true, the network policy rule is not enforced and traffic behaves as if it did not exist. If this is unspecified, the network policy rule will be enabled.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.regionNetworkPolicies.get`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback