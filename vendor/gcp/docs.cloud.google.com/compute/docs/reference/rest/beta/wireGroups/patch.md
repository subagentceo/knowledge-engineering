# Method: wireGroups.patch

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: wireGroups.patch Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
    *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Response body
    *   JSON representation
        *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Updates the specified wire group resource with the data included in the request. This method supports PATCH semantics and uses JSON merge patch format and processing rules.

### HTTP request

`PATCH https://compute.googleapis.com/compute/beta/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`crossSiteNetwork`

`string`

`wireGroup`

`string`

Name of the WireGroups resource to patch.

### Query parameters

 

Parameters

`requestId`

`string`

An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed.

For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments.

The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). end_interface: MixerMutationRequestBuilder

`validateOnly`

`boolean`

[Input Only] Validate the new configuration, but don't update it.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "kind": string,
  "selfLink": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "endpoints": {
    string: {
      "interconnects": {
        string: {
          "interconnect": string,
          "vlanTags": [
            integer
          ]
        },
        ...
      }
    },
    ...
  },
  "wireGroupProperties": {
    "type": enum
  },
  "wireProperties": {
    "bandwidthUnmetered": string,
    "bandwidthAllocation": enum,
    "faultResponse": enum
  },
  "adminEnabled": boolean,
  "wires": [
    {
      "label": string,
      "endpoints": [
        {
          "interconnect": string,
          "vlanTag": integer
        }
      ],
      "wireProperties": {
        "bandwidthUnmetered": string,
        "bandwidthAllocation": enum,
        "faultResponse": enum
      },
      "adminEnabled": boolean
    }
  ],
  "topology": {
    "endpoints": [
      {
        "label": string,
        "city": string
      }
    ]
  },
  "reconciling": boolean
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#wireGroups` for wire groups.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource type. The server generates this identifier.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of the wire group.

`endpoints[]`

`map (key: string, value: object)`

A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows:

*   Key: an RFC1035 user-specified label.
*   Value: an `Endpoint` object.

`endpoints[].interconnects[]`

`map (key: string, value: object)`

A map that contains the redundant Interconnect connections. Specify key-value pairs for the map as follows:

*   Key: an RFC1035 user-specified label.
*   Value: an `Interconnect` object.

`endpoints[].interconnects[].interconnect`

`string`

Required. An Interconnect connection. You can specify the connection as a partial or full URL. If the connection is in a different project from the cross-site network, use a format that specifies the project. See the following examples of partial and full URLs:

`global/interconnects/NAME` `projects/PROJECT_ID/global/interconnects/NAME`*   `https://compute.googleapis.com/compute/projects/PROJECT_ID/global/interconnects/NAME`

`endpoints[].interconnects[].vlanTags[]`

`integer`

Required. To configure the wire group for VLAN mode, enter a VLAN tag, which is a number from `2` to `4093`. You can autoallocate a tag by entering `0`. To configure the wire group for port mode, enter `-1`. Review the following guidelines:

*   A VLAN tag must be unique for an Interconnect connection across all attachments and wire groups.
*   Both endpoints of a wire must use the same VLAN tag value.
*   Single wire and redundant type wire groups must have only one VLAN tag.
*   Port mode pseudowires must have a single VLAN tag with a value of `-1` for both endpoints.
*   Box and cross type wire groups must have two VLAN tags. The first is for the same-zone pseudowire, and the second is for the cross-zone pseudowire.

`wireGroupProperties`

`object`

Properties of the wire group.

`wireGroupProperties.type`

`enum`

The type of the wire group, one of the following:

*   WIRE: a single pseudowire over two Interconnect connections with no redundancy.
*   REDUNDANT: two pseudowires over four Interconnect connections, with two connections in one metro and two connections in another metro. Each redundant pair of Interconnect connections spans both edge availability domains of the metro. Each pseudowire connects Interconnect connections in matching edge availability domains of the two metros.
*   BOX_AND_CROSS: four pseudowires over four Interconnect connections, with two connections in one metro and two connections in another metro. Each redundant pair of Interconnect connections spans both edge availability domains of the metro. Two pseudowires connect Interconnect connections in matching edge availability domains of the two metros. Two additional pseudowires connect the non-matching edge availability domains of the two metros.

`wireProperties`

`object`

Properties for all wires in the wire group.

`wireProperties.bandwidthUnmetered`

`string (int64 format)`

The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0.

`wireProperties.bandwidthAllocation`

`enum`

The configuration of the bandwidth allocation, one of the following:

*   ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group.
*   SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group.

`wireProperties.faultResponse`

`enum`

Response when a fault is detected in a pseudowire:

*   NONE: default.
*   DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires.

`adminEnabled`

`boolean`

Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true.

`wires[]`

`object`

Output only. The single/redundant wire(s) managed by the wire group.

`wires[].label`

`string`

Output only. A label that identifies the wire. The format of this label combines the existing labels of the wire group endpoints and Interconnect connections used by this wire in alphabetical order as follows: `ENDPOINT_A+CONNECTION_A1,ENDPOINT_B+CONNECTION_B1`, where:

*   `ENDPOINT_A` and `ENDPOINT_B`: are the labels that you entered as map keys when you specified the wire group endpoint objects.
*   `CONNECTION_A1` and `CONNECTION_B1`: are the labels that you entered as map keys when you specified the wire group Interconnect objects.

`wires[].endpoints[]`

`object`

Output only. Wire endpoints are specific Interconnect connections.

`wires[].endpoints[].interconnect`

`string`

`wires[].endpoints[].vlanTag`

`integer`

`wires[].wireProperties`

`object`

Output only. Properties of the wire.

`wires[].wireProperties.bandwidthUnmetered`

`string (int64 format)`

The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0.

`wires[].wireProperties.bandwidthAllocation`

`enum`

The configuration of the bandwidth allocation, one of the following:

*   ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group.
*   SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group.

`wires[].wireProperties.faultResponse`

`enum`

Response when a fault is detected in a pseudowire:

*   NONE: default.
*   DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires.

`wires[].adminEnabled`

`boolean`

Output only. Indicates whether the wire is enabled. When false, the wire is disabled. When true and when the wire group of the wire is also enabled, the wire is enabled. Defaults to true.

`topology`

`object`

Output only. Topology details for the wire group configuration.

`topology.endpoints[]`

`object`

Output only. Topology details for all endpoints in the wire group.

`topology.endpoints[].label`

`string`

Output only. Endpoint label from the wire group.

`topology.endpoints[].city`

`string`

Output only. The InterconnectLocation.city (metropolitan area designator) that all interconnects are located in.

`reconciling`

`boolean`

Output only. Indicates whether there are wire changes yet to be processed.

### Response body

Represents an Operation resource.

Google Compute Engine has three Operation resources:

*   Global
*   Regional
*   Zonal

You can use an operation resource to manage asynchronous API requests. For more information, read Handling API responses.

Operations can be global, regional or zonal.

*   For global operations, use the `globalOperations` resource.
*   For regional operations, use the `regionOperations` resource.
*   For zonal operations, use the `zoneOperations` resource.

For more information, read Global, Regional, and Zonal Resources.

Note that completed Operation resources have a limited retention period.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "zone": string,
  "clientOperationId": string,
  "operationType": string,
  "targetLink": string,
  "targetId": string,
  "status": enum,
  "statusMessage": string,
  "user": string,
  "progress": integer,
  "insertTime": string,
  "startTime": string,
  "endTime": string,
  "error": {
    "errors": [
      {
        "code": string,
        "location": string,
        "message": string,
        "errorDetails": [
          {
            "errorInfo": {
              "reason": string,
              "domain": string,
              "metadatas": {
                string: string,
                ...
              }
            },
            "quotaInfo": {
              "metricName": string,
              "limitName": string,
              "dimensions": {
                string: string,
                ...
              },
              "limit": number,
              "futureLimit": number,
              "rolloutStatus": enum
            },
            "help": {
              "links": [
                {
                  "description": string,
                  "url": string
                }
              ]
            },
            "localizedMessage": {
              "locale": string,
              "message": string
            }
          }
        ]
      }
    ]
  },
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
  "httpErrorStatusCode": integer,
  "httpErrorMessage": string,
  "selfLink": string,
  "region": string,
  "description": string,
  "operationGroupId": string,

  // Union field `metadata` can be only one of the following:
  "setCommonInstanceMetadataOperationMetadata": {
    "clientOperationId": string,
    "perLocationOperations": {
      string: {
        "state": enum,
        "error": {
          "code": integer,
          "message": string,
          "details": [
            {
              "@type": string,
              field1: ...,
              ...
            }
          ]
        }
      },
      ...
    }
  },
  "instancesBulkInsertOperationMetadata": {
    "perLocationStatus": {
      string: {
        "status": enum,
        "targetVmCount": integer,
        "createdVmCount": integer,
        "failedToCreateVmCount": integer,
        "deletedVmCount": integer
      },
      ...
    }
  },
  "getVersionOperationMetadata": {
    "inlineSbomInfo": {
      "currentComponentVersions": {
        string: string,
        ...
      },
      "targetComponentVersions": {
        string: string,
        ...
      }
    }
  }
  // End of list of possible types for union field `metadata`.
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#operation` for Operation resources.

`id`

`string (uint64 format)`

Output only. The unique identifier for the operation. This identifier is defined by the server.

`creationTimestamp`

`string`

[Deprecated] This field is deprecated.

`name`

`string`

Output only. Name of the operation.

`zone`

`string`

Output only. The URL of the zone where the operation resides. Only applicable when performing per-zone operations.

`clientOperationId`

`string`

Output only. The value of `requestId` if you provided it in the request. Not present otherwise.

`operationType`

`string`

Output only. The type of operation, such as `insert`, `update`, or `delete`, and so on.

`targetLink`

`string`

Output only. The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from.

`targetId`

`string (uint64 format)`

Output only. The unique target ID, which identifies a specific incarnation of the target resource.

`status`

`enum`

Output only. The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`.

`statusMessage`

`string`

Output only. An optional textual description of the current status of the operation.

`user`

`string`

Output only. User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`.

`progress`

`integer`

Output only. An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses.

`insertTime`

`string`

Output only. The time that this operation was requested. This value is in RFC3339 text format.

`startTime`

`string`

Output only. The time that this operation was started by the server. This value is in RFC3339 text format.

`endTime`

`string`

Output only. The time that this operation was completed. This value is in RFC3339 text format.

`error`

`object`

Output only. If errors are generated during processing of the operation, this field will be populated.

`error.errors[]`

`object`

Output only. The array of errors encountered while processing this operation.

`error.errors[].code`

`string`

Output only. The error type identifier for this error.

`error.errors[].location`

`string`

Output only. Indicates the field in the request that caused the error. This property is optional.

`error.errors[].message`

`string`

Output only. An optional, human-readable error message.

`error.errors[].errorDetails[]`

`object`

Output only. An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.

`error.errors[].errorDetails[].errorInfo`

`object`

`error.errors[].errorDetails[].errorInfo.reason`

`string`

The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE.

`error.errors[].errorDetails[].errorInfo.domain`

`string`

The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com".

`error.errors[].errorDetails[].errorInfo.metadatas`

`map (key: string, value: string)`

Additional structured details about this error.

Keys must match a regular expression of `[a-z][a-zA-Z0-9-_]+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request.

`error.errors[].errorDetails[].quotaInfo`

`object`

`error.errors[].errorDetails[].quotaInfo.metricName`

`string`

The Compute Engine quota metric name.

`error.errors[].errorDetails[].quotaInfo.limitName`

`string`

The name of the quota limit.

`error.errors[].errorDetails[].quotaInfo.dimensions`

`map (key: string, value: string)`

The map holding related quota dimensions.

`error.errors[].errorDetails[].quotaInfo.limit`

`number`

Current effective quota limit. The limit's unit depends on the quota type or metric.

`error.errors[].errorDetails[].quotaInfo.futureLimit`

`number`

Future quota limit being rolled out. The limit's unit depends on the quota type or metric.

`error.errors[].errorDetails[].quotaInfo.rolloutStatus`

`enum`

Rollout status of the future quota limit.

`error.errors[].errorDetails[].help`

`object`

`error.errors[].errorDetails[].help.links[]`

`object`

URL(s) pointing to additional information on handling the current error.

`error.errors[].errorDetails[].help.links[].description`

`string`

Describes what the link offers.

`error.errors[].errorDetails[].help.links[].url`

`string`

The URL of the link.

`error.errors[].errorDetails[].localizedMessage`

`object`

`error.errors[].errorDetails[].localizedMessage.locale`

`string`

The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"

`error.errors[].errorDetails[].localizedMessage.message`

`string`

The localized error message in the above locale.

`warnings[]`

`object`

Output only. If warning messages are generated during processing of the operation, this field will be populated.

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

`httpErrorStatusCode`

`integer`

Output only. If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found.

`httpErrorMessage`

`string`

Output only. If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`region`

`string`

Output only. The URL of the region where the operation resides. Only applicable when performing regional operations.

`description`

`string`

Output only. A textual description of the operation, which is set when the operation is created.

`operationGroupId`

`string`

Output only. An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request.

Union field `metadata`. Output only. Service-specific metadata attached to this operation. `metadata` can be only one of the following:

`setCommonInstanceMetadataOperationMetadata`

`object`

Output only. If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state.

`setCommonInstanceMetadataOperationMetadata.clientOperationId`

`string`

Output only. The client operation id.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[]`

`map (key: string, value: object)`

Output only. Status information per location (location name is key). Example key: zones/us-central1-a

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].state`

`enum`

Output only. Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error`

`object`

Output only. If state is `ABANDONED` or `FAILED`, this field is populated.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.code`

`integer`

The status code, which should be an enum value of `google.rpc.Code`.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.message`

`string`

A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the `google.rpc.Status.details` field, or localized by the client.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.details[]`

`object`

A list of messages that carry the error details. There is a common set of message types for APIs to use.

An object containing fields of an arbitrary type. An additional field `"@type"` contains a URI identifying the type. Example: `{ "id": 1234, "@type": "types.example.com/standard/id" }`.

`instancesBulkInsertOperationMetadata`

`object`

`instancesBulkInsertOperationMetadata.perLocationStatus[]`

`map (key: string, value: object)`

Status information per location (location name is key). Example key: zones/us-central1-a

`instancesBulkInsertOperationMetadata.perLocationStatus[].status`

`enum`

Output only. Creation status of BulkInsert operation - information if the flow is rolling forward or rolling back.

`instancesBulkInsertOperationMetadata.perLocationStatus[].targetVmCount`

`integer`

Output only. Count of VMs originally planned to be created.

`instancesBulkInsertOperationMetadata.perLocationStatus[].createdVmCount`

`integer`

Output only. Count of VMs successfully created so far.

`instancesBulkInsertOperationMetadata.perLocationStatus[].failedToCreateVmCount`

`integer`

Output only. Count of VMs that started creating but encountered an error.

`instancesBulkInsertOperationMetadata.perLocationStatus[].deletedVmCount`

`integer`

Output only. Count of VMs that got deleted during rollback.

`getVersionOperationMetadata`

`object`

`getVersionOperationMetadata.inlineSbomInfo`

`object`

`getVersionOperationMetadata.inlineSbomInfo.currentComponentVersions`

`map (key: string, value: string)`

A mapping of components to their currently-applied versions or other appropriate identifiers.

`getVersionOperationMetadata.inlineSbomInfo.targetComponentVersions`

`map (key: string, value: string)`

A mapping of components to their target versions or other appropriate identifiers.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.interconnects.use`
*   `compute.wireGroups.get`
*   `compute.wireGroups.update`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback