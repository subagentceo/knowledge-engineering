# REST Resource: globalOrganizationOperations

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# REST Resource: globalOrganizationOperations Stay organized with collections Save and categorize content based on your preferences.

*   Resource: OperationsGetResponse
    *   JSON representation
        *   JSON representation
            *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
            *   JSON representation
                *   JSON representation
        *   JSON representation
*   Methods

## Resource: OperationsGetResponse

JSON representation

{
  "resource": {
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

      // Union field `sbom_result` can be only one of the following:
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
      // End of list of possible types for union field `sbom_result`.
    },
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

              // Union field `details_oneof` can be only one of the following:
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
              // End of list of possible types for union field `details_oneof`.
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
    "operationGroupId": string
  }
}

 

Fields

`resource`

`object`

`resource.setCommonInstanceMetadataOperationMetadata`

`object`

Output only. If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state.

`resource.setCommonInstanceMetadataOperationMetadata.clientOperationId`

`string`

Output only. The client operation id.

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[]`

`map (key: string, value: object)`

Output only. Status information per location (location name is key). Example key: zones/us-central1-a

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[].state`

`enum`

Output only. Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`.

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error`

`object`

Output only. If state is `ABANDONED` or `FAILED`, this field is populated.

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.code`

`integer`

The status code, which should be an enum value of `google.rpc.Code`.

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.message`

`string`

A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the `google.rpc.Status.details` field, or localized by the client.

`resource.setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.details[]`

`object`

A list of messages that carry the error details. There is a common set of message types for APIs to use.

An object containing fields of an arbitrary type. An additional field `"@type"` contains a URI identifying the type. Example: `{ "id": 1234, "@type": "types.example.com/standard/id" }`.

`resource.instancesBulkInsertOperationMetadata`

`object`

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[]`

`map (key: string, value: object)`

Status information per location (location name is key). Example key: zones/us-central1-a

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[].status`

`enum`

Output only. Creation status of BulkInsert operation - information if the flow is rolling forward or rolling back.

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[].targetVmCount`

`integer`

Output only. Count of VMs originally planned to be created.

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[].createdVmCount`

`integer`

Output only. Count of VMs successfully created so far.

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[].failedToCreateVmCount`

`integer`

Output only. Count of VMs that started creating but encountered an error.

`resource.instancesBulkInsertOperationMetadata.perLocationStatus[].deletedVmCount`

`integer`

Output only. Count of VMs that got deleted during rollback.

`resource.getVersionOperationMetadata`

`object`

`resource.getVersionOperationMetadata.inlineSbomInfo`

`object`

`resource.getVersionOperationMetadata.inlineSbomInfo.currentComponentVersions`

`map (key: string, value: string)`

A mapping of components to their currently-applied versions or other appropriate identifiers.

`resource.getVersionOperationMetadata.inlineSbomInfo.targetComponentVersions`

`map (key: string, value: string)`

A mapping of components to their target versions or other appropriate identifiers.

`resource.kind`

`string`

Output only. Type of the resource. Always `compute#operation` for Operation resources.

`resource.id`

`string (uint64 format)`

Output only. The unique identifier for the operation. This identifier is defined by the server.

`resource.creationTimestamp`

`string`

[Deprecated] This field is deprecated.

`resource.name`

`string`

Output only. Name of the operation.

`resource.zone`

`string`

Output only. The URL of the zone where the operation resides. Only applicable when performing per-zone operations.

`resource.clientOperationId`

`string`

Output only. The value of `requestId` if you provided it in the request. Not present otherwise.

`resource.operationType`

`string`

Output only. The type of operation, such as `insert`, `update`, or `delete`, and so on.

`resource.targetLink`

`string`

Output only. The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from.

`resource.targetId`

`string (uint64 format)`

Output only. The unique target ID, which identifies a specific incarnation of the target resource.

`resource.status`

`enum`

Output only. The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`.

`resource.statusMessage`

`string`

Output only. An optional textual description of the current status of the operation.

`resource.user`

`string`

Output only. User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`.

`resource.progress`

`integer`

Output only. An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses.

`resource.insertTime`

`string`

Output only. The time that this operation was requested. This value is in RFC3339 text format.

`resource.startTime`

`string`

Output only. The time that this operation was started by the server. This value is in RFC3339 text format.

`resource.endTime`

`string`

Output only. The time that this operation was completed. This value is in RFC3339 text format.

`resource.error`

`object`

Output only. If errors are generated during processing of the operation, this field will be populated.

`resource.error.errors[]`

`object`

Output only. The array of errors encountered while processing this operation.

`resource.error.errors[].code`

`string`

Output only. The error type identifier for this error.

`resource.error.errors[].location`

`string`

Output only. Indicates the field in the request that caused the error. This property is optional.

`resource.error.errors[].message`

`string`

Output only. An optional, human-readable error message.

`resource.error.errors[].errorDetails[]`

`object`

Output only. An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.

`resource.error.errors[].errorDetails[].errorInfo`

`object`

`resource.error.errors[].errorDetails[].errorInfo.reason`

`string`

The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE.

`resource.error.errors[].errorDetails[].errorInfo.domain`

`string`

The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com".

`resource.error.errors[].errorDetails[].errorInfo.metadatas`

`map (key: string, value: string)`

Additional structured details about this error.

Keys must match a regular expression of `[a-z][a-zA-Z0-9-_]+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request.

`resource.error.errors[].errorDetails[].quotaInfo`

`object`

`resource.error.errors[].errorDetails[].quotaInfo.metricName`

`string`

The Compute Engine quota metric name.

`resource.error.errors[].errorDetails[].quotaInfo.limitName`

`string`

The name of the quota limit.

`resource.error.errors[].errorDetails[].quotaInfo.dimensions`

`map (key: string, value: string)`

The map holding related quota dimensions.

`resource.error.errors[].errorDetails[].quotaInfo.limit`

`number`

Current effective quota limit. The limit's unit depends on the quota type or metric.

`resource.error.errors[].errorDetails[].quotaInfo.futureLimit`

`number`

Future quota limit being rolled out. The limit's unit depends on the quota type or metric.

`resource.error.errors[].errorDetails[].quotaInfo.rolloutStatus`

`enum`

Rollout status of the future quota limit.

`resource.error.errors[].errorDetails[].help`

`object`

`resource.error.errors[].errorDetails[].help.links[]`

`object`

URL(s) pointing to additional information on handling the current error.

`resource.error.errors[].errorDetails[].help.links[].description`

`string`

Describes what the link offers.

`resource.error.errors[].errorDetails[].help.links[].url`

`string`

The URL of the link.

`resource.error.errors[].errorDetails[].localizedMessage`

`object`

`resource.error.errors[].errorDetails[].localizedMessage.locale`

`string`

The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"

`resource.error.errors[].errorDetails[].localizedMessage.message`

`string`

The localized error message in the above locale.

`resource.warnings[]`

`object`

Output only. If warning messages are generated during processing of the operation, this field will be populated.

`resource.warnings[].code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`resource.warnings[].message`

`string`

Output only. A human-readable description of the warning code.

`resource.warnings[].data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`resource.warnings[].data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`resource.warnings[].data[].value`

`string`

Output only. A warning data value corresponding to the key.

`resource.httpErrorStatusCode`

`integer`

Output only. If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found.

`resource.httpErrorMessage`

`string`

Output only. If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`.

`resource.selfLink`

`string`

Output only. Server-defined URL for the resource.

`resource.region`

`string`

Output only. The URL of the region where the operation resides. Only applicable when performing regional operations.

`resource.description`

`string`

Output only. A textual description of the operation, which is set when the operation is created.

`resource.operationGroupId`

`string`

Output only. An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request.

 

## Methods

### delete

Deletes the specified Operations resource.

### get

Retrieves the specified Operations resource.

### list

Retrieves a list of Operation resources contained within the specified organization.

Send feedback