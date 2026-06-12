# Method: instanceGroupManagers.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: instanceGroupManagers.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
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
                    *   JSON representation
                    *   JSON representation
                    *   JSON representation
                    *   JSON representation
            *   JSON representation
                *   JSON representation
                    *   JSON representation
                    *   JSON representation
                    *   JSON representation
                    *   JSON representation
        *   JSON representation
        *   JSON representation
            *   JSON representation
                *   JSON representation
                *   JSON representation
                *   JSON representation
                *   JSON representation
                *   JSON representation
                *   JSON representation
                *   JSON representation
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

Retrieves a list of managed instance groups that are contained within the specified project and zone.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/zones/{zone}/instanceGroupManagers`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`zone`

`string`

The name of the zone where the managed instance group is located.

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

### Request body

The request body must be empty.

### Response body

Output only. A list of managed instance groups.

If successful, the response body contains data with the following structure:

JSON representation

{
  "id": string,
  "items": [
    {
      "kind": string,
      "id": string,
      "creationTimestamp": string,
      "name": string,
      "description": string,
      "zone": string,
      "region": string,
      "distributionPolicy": {
        "zones": [
          {
            "zone": string
          }
        ],
        "targetShape": enum
      },
      "instanceTemplate": string,
      "versions": [
        {
          "name": string,
          "instanceTemplate": string,
          "targetSize": {
            "fixed": integer,
            "percent": integer,
            "calculated": integer
          }
        }
      ],
      "allInstancesConfig": {
        "properties": {
          "metadata": {
            string: string,
            ...
          },
          "labels": {
            string: string,
            ...
          }
        }
      },
      "instanceGroup": string,
      "targetPools": [
        string
      ],
      "baseInstanceName": string,
      "fingerprint": string,
      "currentActions": {
        "none": integer,
        "creating": integer,
        "creatingWithoutRetries": integer,
        "verifying": integer,
        "recreating": integer,
        "deleting": integer,
        "abandoning": integer,
        "restarting": integer,
        "refreshing": integer,
        "suspending": integer,
        "resuming": integer,
        "stopping": integer,
        "starting": integer,
        "adopting": integer
      },
      "status": {
        "isStable": boolean,
        "allInstancesConfig": {
          "effective": boolean,
          "currentRevision": string
        },
        "versionTarget": {
          "isReached": boolean
        },
        "stateful": {
          "isStateful": boolean,
          "hasStatefulConfig": boolean,
          "perInstanceConfigs": {
            "allEffective": boolean
          }
        },
        "autoscaler": string,
        "bulkInstanceOperation": {
          "inProgress": boolean,
          "lastProgressCheck": {
            "timestamp": string,
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
            }
          }
        },
        "appliedAcceleratorTopologies": [
          {
            "acceleratorTopology": string,
            "state": enum,
            "stateDetails": {
              "timestamp": string,
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
              }
            }
          }
        ],
        "currentInstanceStatuses": {
          "nonExistent": integer,
          "provisioning": integer,
          "staging": integer,
          "running": integer,
          "stopping": integer,
          "stopped": integer,
          "terminated": integer,
          "suspending": integer,
          "suspended": integer,
          "repairing": integer,
          "deprovisioning": integer,
          "pendingStop": integer,
          "pending": integer
        }
      },
      "targetSize": integer,
      "targetSizePolicy": {
        "mode": enum
      },
      "instanceFlexibilityPolicy": {
        "instanceSelections": {
          string: {
            "machineTypes": [
              string
            ],
            "rank": integer,
            "minCpuPlatform": string,
            "disks": [
              {
                "kind": string,
                "type": enum,
                "mode": enum,
                "savedState": enum,
                "source": string,
                "deviceName": string,
                "index": integer,
                "boot": boolean,
                "initializeParams": {
                  "diskName": string,
                  "sourceImage": string,
                  "diskSizeGb": string,
                  "diskType": string,
                  "sourceImageEncryptionKey": {
                    "sha256": string,
                    "kmsKeyServiceAccount": string,

                    
                    "rawKey": string,
                    "rsaEncryptedKey": string,
                    "kmsKeyName": string
                    
                  },
                  "labels": {
                    string: string,
                    ...
                  },
                  "sourceSnapshot": string,
                  "sourceInstantSnapshot": string,
                  "sourceSnapshotEncryptionKey": {
                    "sha256": string,
                    "kmsKeyServiceAccount": string,

                    
                    "rawKey": string,
                    "rsaEncryptedKey": string,
                    "kmsKeyName": string
                    
                  },
                  "description": string,
                  "replicaZones": [
                    string
                  ],
                  "guestOsFeatures": [
                    {
                      "type": enum
                    }
                  ],
                  "resourcePolicies": [
                    string
                  ],
                  "onUpdateAction": enum,
                  "provisionedIops": string,
                  "multiWriter": boolean,
                  "licenses": [
                    string
                  ],
                  "architecture": enum,
                  "resourceManagerTags": {
                    string: string,
                    ...
                  },
                  "provisionedThroughput": string,
                  "enableConfidentialCompute": boolean,
                  "storagePool": string
                },
                "autoDelete": boolean,
                "licenses": [
                  string
                ],
                "interface": enum,
                "guestOsFeatures": [
                  {
                    "type": enum
                  }
                ],
                "diskEncryptionKey": {
                  "rawKey": string,
                  "rsaEncryptedKey": string,
                  "kmsKeyName": string,
                  "sha256": string,
                  "kmsKeyServiceAccount": string
                },
                "diskSizeGb": string,
                "shieldedInstanceInitialState": {
                  "pk": {
                    "content": string,
                    "fileType": enum
                  },
                  "keks": [
                    {
                      "content": string,
                      "fileType": enum
                    }
                  ],
                  "dbs": [
                    {
                      "content": string,
                      "fileType": enum
                    }
                  ],
                  "dbxs": [
                    {
                      "content": string,
                      "fileType": enum
                    }
                  ]
                },
                "forceAttach": boolean,
                "locked": boolean,
                "architecture": enum
              }
            ]
          },
          ...
        },
        "provisioningModelMix": {
          "standardCapacityBase": integer,
          "standardCapacityPercentAboveBase": integer
        }
      },
      "targetStoppedSize": integer,
      "targetSuspendedSize": integer,
      "listManagedInstancesResults": enum,
      "standbyPolicy": {
        "initialDelaySec": integer,
        "mode": enum
      },
      "selfLink": string,
      "autoHealingPolicies": [
        {
          "healthCheck": string,
          "initialDelaySec": integer
        }
      ],
      "updatePolicy": {
        "type": enum,
        "instanceRedistributionType": enum,
        "minimalAction": enum,
        "mostDisruptiveAllowedAction": enum,
        "maxSurge": {
          "fixed": integer,
          "percent": integer,
          "calculated": integer
        },
        "maxUnavailable": {
          "fixed": integer,
          "percent": integer,
          "calculated": integer
        },
        "minReadySec": integer,
        "replacementMethod": enum
      },
      "namedPorts": [
        {
          "name": string,
          "port": integer
        }
      ],
      "serviceAccount": string,
      "failoverAction": enum,
      "statefulPolicy": {
        "preservedState": {
          "disks": {
            string: {
              "autoDelete": enum
            },
            ...
          },
          "internalIPs": {
            string: {
              "autoDelete": enum
            },
            ...
          },
          "externalIPs": {
            string: {
              "autoDelete": enum
            },
            ...
          }
        }
      },
      "instanceLifecyclePolicy": {
        "forceUpdateOnRepair": enum,
        "defaultActionOnFailure": enum,
        "onFailedHealthCheck": enum,
        "onRepair": {
          "allowChangingZone": enum
        }
      },
      "params": {
        "resourceManagerTags": {
          string: string,
          ...
        }
      },
      "satisfiesPzi": boolean,
      "satisfiesPzs": boolean,
      "resourcePolicies": {
        "workloadPolicy": string
      },
      "multiMig": string
    }
  ],
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
  "kind": string
}

 

Fields

`id`

`string`

Output only. Unique identifier for the resource; defined by the server.

`items[]`

`object`

A list of InstanceGroupManager resources.

`items[].kind`

`string`

Output only. The resource type, which is always `compute#instanceGroupManager` for managed instance groups.

`items[].id`

`string (uint64 format)`

Output only. A unique identifier for this resource type. The server generates this identifier.

`items[].creationTimestamp`

`string`

Output only. The creation timestamp for this managed instance group in RFC3339 text format.

`items[].name`

`string`

The name of the managed instance group. The name must be 1-63 characters long, and comply with RFC1035.

`items[].description`

`string`

An optional description of this resource.

`items[].zone`

`string`

Output only. The URL of a zone where the managed instance group is located (for zonal resources).

`items[].region`

`string`

Output only. The URL of the region where the managed instance group resides (for regional resources).

`items[].distributionPolicy`

`object`

Policy specifying the intended distribution of managed instances across zones in a regional managed instance group.

`items[].distributionPolicy.zones[]`

`object`

Zones where the regional managed instance group will create and manage its instances. By default, a regional MIG doesn't automatically select an AI zone to create instances, even if an AI zone is available in the specified region. To create instances in an AI zone in the selected region, you must explicitly specify it in the distribution policy together with the other preferred zones.

`items[].distributionPolicy.zones[].zone`

`string`

The URL of the zone. The zone must exist in the region where the managed instance group is located.

`items[].distributionPolicy.targetShape`

`enum`

The distribution shape to which the group converges either proactively or on resize events (depending on the value set in `updatePolicy.instanceRedistributionType`).

`items[].instanceTemplate`

`string`

The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run `recreateInstances`, run `applyUpdatesToInstances`, or set the group's `updatePolicy.type` to `PROACTIVE`.

`items[].versions[]`

`object`

Specifies the instance templates used by this managed instance group to create instances.

Each version is defined by an `instanceTemplate` and a `name`. Every version can appear at most once per instance group. This field overrides the top-level `instanceTemplate` field. Read more about the relationships between these fields. Exactly one `version` must leave the `targetSize` field unset. That version will be applied to all remaining instances. For more information, read about canary updates.

`items[].versions[].name`

`string`

Name of the version. Unique among all versions in the scope of this managed instance group.

`items[].versions[].instanceTemplate`

`string`

The URL of the instance template that is specified for this managed instance group. The group uses this template to create new instances in the managed instance group until the `targetSize` for this version is reached. The templates for existing instances in the group do not change unless you run `recreateInstances`, run `applyUpdatesToInstances`, or set the group's `updatePolicy.type` to `PROACTIVE`; in those cases, existing instances are updated until the `targetSize` for this version is reached.

`items[].versions[].targetSize`

`object`

Specifies the intended number of instances to be created from the `instanceTemplate`. The final number of instances created from the template will be equal to:

*   If expressed as a fixed number, the minimum of either `targetSize.fixed` or `instanceGroupManager.targetSize` is used.
*   if expressed as a `percent`, the `targetSize` would be `(targetSize.percent/100 * InstanceGroupManager.targetSize)` If there is a remainder, the number is rounded.

If unset, this version will update any remaining instances not updated by another `version`. Read Starting a canary update for more information.

`items[].versions[].targetSize.fixed`

`integer`

Specifies a fixed number of VM instances. This must be a positive integer.

`items[].versions[].targetSize.percent`

`integer`

Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify `80` for 80%.

`items[].versions[].targetSize.calculated`

`integer`

Output only. Absolute value of VM instances calculated based on the specific mode.

*   If the value is `fixed`, then the `calculated` value is equal to the `fixed` value.
*   If the value is a `percent`, then the `calculated` value is `percent`/100 * `targetSize`. For example, the `calculated` value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.

`items[].allInstancesConfig`

`object`

Specifies configuration that overrides the instance template configuration for the group.

`items[].allInstancesConfig.properties`

`object`

Properties to set on all instances in the group.

You can add or modify properties using the `instanceGroupManagers.patch` or `regionInstanceGroupManagers.patch`. After setting `allInstancesConfig` on the group, you must update the group's instances to apply the configuration. To apply the configuration, set the group's `updatePolicy.type` field to use proactive updates or use the `applyUpdatesToInstances` method.

`items[].allInstancesConfig.properties.metadata`

`map (key: string, value: string)`

The metadata key-value pairs that you want to patch onto the instance. For more information, see Project and instance metadata.

`items[].allInstancesConfig.properties.labels`

`map (key: string, value: string)`

The label key-value pairs that you want to patch onto the instance.

`items[].instanceGroup`

`string`

Output only. The URL of the Instance Group resource.

`items[].targetPools[]`

`string`

The URLs for all TargetPool resources to which instances in the `instanceGroup` field are added. The target pools automatically apply to all of the instances in the managed instance group.

`items[].baseInstanceName`

`string`

The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format.

When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern [a-z](([-a-z0-9]{0,57})|([-a-z0-9]{0,51}-#{1,10}(\[[0-9]{1,10}\])?))

`items[].fingerprint`

`string (bytes format)`

Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve an InstanceGroupManager.

A base64-encoded string.

`items[].currentActions`

`object`

Output only. The list of instance actions and the number of instances in this managed instance group that are scheduled for each of those actions.

`items[].currentActions.none`

`integer`

Output only. The number of instances in the managed instance group that are running and have no scheduled actions.

`items[].currentActions.creating`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully.

If you have disabled creation retries, this field will not be populated; instead, the `creatingWithoutRetries` field will be populated.

`items[].currentActions.creatingWithoutRetries`

`integer`

Output only. The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's `targetSize` value accordingly.

`items[].currentActions.verifying`

`integer`

Output only. The number of instances in the managed instance group that are being verified. See the `managedInstances[].currentAction` property in the `listManagedInstances` method documentation.

`items[].currentActions.recreating`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template.

`items[].currentActions.deleting`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted.

`items[].currentActions.abandoning`

`integer`

Output only. The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it.

`items[].currentActions.restarting`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted.

`items[].currentActions.refreshing`

`integer`

Output only. The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance.

`items[].currentActions.suspending`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended.

`items[].currentActions.resuming`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed.

`items[].currentActions.stopping`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped.

`items[].currentActions.starting`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be started or are currently being started.

`items[].currentActions.adopting`

`integer`

Output only. The number of instances in the managed instance group that are scheduled to be adopted or are currently being adopted.

`items[].status`

`object`

Output only. The status of this managed instance group.

`items[].status.isStable`

`boolean`

Output only. A bit indicating whether the managed instance group is in a stable state. A stable state means that: none of the instances in the managed instance group is currently undergoing any type of change (for example, creation, restart, or deletion); no future changes are scheduled for instances in the managed instance group; and the managed instance group itself is not being modified.

`items[].status.allInstancesConfig`

`object`

Output only. Status of all-instances configuration on the group.

`items[].status.allInstancesConfig.effective`

`boolean`

Output only. A bit indicating whether this configuration has been applied to all managed instances in the group.

`items[].status.allInstancesConfig.currentRevision`

`string`

Output only. Current all-instances configuration revision. This value is in RFC3339 text format.

`items[].status.versionTarget`

`object`

Output only. A status of consistency of Instances' versions with their target version specified by `version` field on Instance Group Manager.

`items[].status.versionTarget.isReached`

`boolean`

Output only. A bit indicating whether version target has been reached in this managed instance group, i.e. all instances are in their target version. Instances' target version are specified by `version` field on Instance Group Manager.

`items[].status.stateful`

`object`

Output only. Stateful status of the given Instance Group Manager.

`items[].status.stateful.isStateful   **(deprecated)**`

`boolean`

Output only. A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions. This field is deprecated in favor of hasStatefulConfig.

`items[].status.stateful.hasStatefulConfig`

`boolean`

Output only. A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions.

`items[].status.stateful.perInstanceConfigs`

`object`

Output only. Status of per-instance configurations on the instances.

`items[].status.stateful.perInstanceConfigs.allEffective`

`boolean`

Output only. A bit indicating if all of the group's per-instance configurations (listed in the output of a listPerInstanceConfigs API call) have status `EFFECTIVE` or there are no per-instance-configs.

`items[].status.autoscaler`

`string`

Output only. The URL of the Autoscaler that targets this instance group manager.

`items[].status.bulkInstanceOperation`

`object`

Output only. The status of bulk instance operation.

`items[].status.bulkInstanceOperation.inProgress`

`boolean`

Output only. Informs whether bulk instance operation is in progress.

`items[].status.bulkInstanceOperation.lastProgressCheck`

`object`

Output only. Information from the last progress check of bulk instance operation.

`items[].status.bulkInstanceOperation.lastProgressCheck.timestamp`

``string (`Timestamp` format)``

Output only. Timestamp of the last progress check of bulk instance operation. Timestamp is in RFC3339 text format.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`items[].status.bulkInstanceOperation.lastProgressCheck.error`

`object`

Output only. Errors encountered during bulk instance operation.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[]`

`object`

Output only. The array of errors encountered while processing this operation.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].code`

`string`

Output only. The error type identifier for this error.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].location`

`string`

Output only. Indicates the field in the request that caused the error. This property is optional.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].message`

`string`

Output only. An optional, human-readable error message.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[]`

`object`

Output only. An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].errorInfo`

`object`

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].errorInfo.reason`

`string`

The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].errorInfo.domain`

`string`

The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com".

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].errorInfo.metadatas`

`map (key: string, value: string)`

Additional structured details about this error.

Keys must match a regular expression of `[a-z][a-zA-Z0-9-_]+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo`

`object`

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.metricName`

`string`

The Compute Engine quota metric name.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.limitName`

`string`

The name of the quota limit.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.dimensions`

`map (key: string, value: string)`

The map holding related quota dimensions.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.limit`

`number`

Current effective quota limit. The limit's unit depends on the quota type or metric.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.futureLimit`

`number`

Future quota limit being rolled out. The limit's unit depends on the quota type or metric.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].quotaInfo.rolloutStatus`

`enum`

Rollout status of the future quota limit.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].help`

`object`

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].help.links[]`

`object`

URL(s) pointing to additional information on handling the current error.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].help.links[].description`

`string`

Describes what the link offers.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].help.links[].url`

`string`

The URL of the link.

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].localizedMessage`

`object`

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].localizedMessage.locale`

`string`

The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"

`items[].status.bulkInstanceOperation.lastProgressCheck.error.errors[].errorDetails[].localizedMessage.message`

`string`

The localized error message in the above locale.

`items[].status.appliedAcceleratorTopologies[]`

`object`

Output only. The accelerator topology applied to this MIG. Currently only one accelerator topology is supported.

`items[].status.appliedAcceleratorTopologies[].acceleratorTopology`

`string`

Output only. Topology in the format of: "16x16", "4x4x4", etc. The value is the same as configured in the WorkloadPolicy.

`items[].status.appliedAcceleratorTopologies[].state`

`enum`

Output only. The state of the accelerator topology.

`items[].status.appliedAcceleratorTopologies[].stateDetails`

`object`

Output only. The result of the latest accelerator topology state check.

`items[].status.appliedAcceleratorTopologies[].stateDetails.timestamp`

``string (`Timestamp` format)``

Output only. Timestamp is shown only if there is an error. The field has // RFC3339 // text format.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error`

`object`

Output only. Encountered errors.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[]`

`object`

Output only. The array of errors encountered while processing this operation.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].code`

`string`

Output only. The error type identifier for this error.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].location`

`string`

Output only. Indicates the field in the request that caused the error. This property is optional.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].message`

`string`

Output only. An optional, human-readable error message.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[]`

`object`

Output only. An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].errorInfo`

`object`

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].errorInfo.reason`

`string`

The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].errorInfo.domain`

`string`

The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com".

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].errorInfo.metadatas`

`map (key: string, value: string)`

Additional structured details about this error.

Keys must match a regular expression of `[a-z][a-zA-Z0-9-_]+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo`

`object`

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.metricName`

`string`

The Compute Engine quota metric name.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.limitName`

`string`

The name of the quota limit.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.dimensions`

`map (key: string, value: string)`

The map holding related quota dimensions.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.limit`

`number`

Current effective quota limit. The limit's unit depends on the quota type or metric.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.futureLimit`

`number`

Future quota limit being rolled out. The limit's unit depends on the quota type or metric.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].quotaInfo.rolloutStatus`

`enum`

Rollout status of the future quota limit.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].help`

`object`

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].help.links[]`

`object`

URL(s) pointing to additional information on handling the current error.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].help.links[].description`

`string`

Describes what the link offers.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].help.links[].url`

`string`

The URL of the link.

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].localizedMessage`

`object`

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].localizedMessage.locale`

`string`

The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"

`items[].status.appliedAcceleratorTopologies[].stateDetails.error.errors[].errorDetails[].localizedMessage.message`

`string`

The localized error message in the above locale.

`items[].status.currentInstanceStatuses`

`object`

Output only. The list of instance statuses and the number of instances in this managed instance group that have the status. Currently only shown for TPU MIGs

`items[].status.currentInstanceStatuses.nonExistent`

`integer`

Output only. The number of instances that have not been created yet or have been deleted. Includes only instances that would be shown in the listManagedInstances method and not all instances that have been deleted in the lifetime of the MIG. Does not include FlexStart instances that are waiting for the resources availability, they are considered as 'pending'.

`items[].status.currentInstanceStatuses.provisioning`

`integer`

Output only. The number of instances in the managed instance group that have PROVISIONING status.

`items[].status.currentInstanceStatuses.staging`

`integer`

Output only. The number of instances in the managed instance group that have STAGING status.

`items[].status.currentInstanceStatuses.running`

`integer`

Output only. The number of instances in the managed instance group that have RUNNING status.

`items[].status.currentInstanceStatuses.stopping`

`integer`

Output only. The number of instances in the managed instance group that have STOPPING status.

`items[].status.currentInstanceStatuses.stopped`

`integer`

Output only. The number of instances in the managed instance group that have STOPPED status.

`items[].status.currentInstanceStatuses.terminated`

`integer`

Output only. The number of instances in the managed instance group that have TERMINATED status.

`items[].status.currentInstanceStatuses.suspending`

`integer`

Output only. The number of instances in the managed instance group that have SUSPENDING status.

`items[].status.currentInstanceStatuses.suspended`

`integer`

Output only. The number of instances in the managed instance group that have SUSPENDED status.

`items[].status.currentInstanceStatuses.repairing`

`integer`

Output only. The number of instances in the managed instance group that have REPAIRING status.

`items[].status.currentInstanceStatuses.deprovisioning`

`integer`

Output only. The number of instances in the managed instance group that have DEPROVISIONING status.

`items[].status.currentInstanceStatuses.pendingStop`

`integer`

Output only. The number of instances in the managed instance group that have PENDING_STOP status.

`items[].status.currentInstanceStatuses.pending`

`integer`

Output only. The number of instances in the managed instance group that have PENDING status, that is FlexStart instances that are waiting for resources. Instances that do not exist because of the other reasons are counted as 'nonExistent'.

`items[].targetSize`

`integer`

The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number.

`items[].targetSizePolicy`

`object`

The policy that specifies how the MIG creates its VMs to achieve the target size.

`items[].targetSizePolicy.mode`

`enum`

The mode of target size policy based on which the MIG creates its VMs individually or all at once.

`items[].instanceFlexibilityPolicy`

`object`

Instance flexibility allowing MIG to create VMs from multiple types of machines. Instance flexibility configuration on MIG overrides instance template configuration.

`items[].instanceFlexibilityPolicy.instanceSelections[]`

`map (key: string, value: object)`

Named instance selections configuring properties that the group will use when creating new VMs.

`items[].instanceFlexibilityPolicy.instanceSelections[].machineTypes[]`

`string`

Full machine-type names, e.g. "n1-standard-16".

`items[].instanceFlexibilityPolicy.instanceSelections[].rank`

`integer`

Preference of this instance selection. Lower number means higher preference. MIG will first try to create a VM based on the machine-type with lowest rank and fallback to next rank based on availability. Machine types and instance selections with the same rank have the same preference.

`items[].instanceFlexibilityPolicy.instanceSelections[].minCpuPlatform`

`string`

Name of the minimum CPU platform to be used by this instance selection. e.g. 'Intel Ice Lake'.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[]`

`object`

instanceGroupManagers.list of disks to be attached to the instances created from this selection.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].kind`

`string`

Output only. Type of the resource. Always `compute#attachedDisk` for attached disks.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].type`

`enum`

Specifies the type of the disk, either `SCRATCH` or `PERSISTENT`. If not specified, the default is `PERSISTENT`.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].mode`

`enum`

The mode in which to attach this disk, either `READ_WRITE` or `READ_ONLY`. If not specified, the default is to attach the disk in `READ_WRITE` mode.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].savedState`

`enum`

Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to `PRESERVED` if the LocalSSD data has been saved to a persistent location by customer request. (see the discardLocalSsd option on Stop/Suspend). Read-only in the api.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].source`

`string`

Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one of `initializeParams.sourceImage` or `initializeParams.sourceSnapshot` or `disks.source` is required.

If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks.

Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].deviceName`

`string`

Specifies a unique device name of your choice that is reflected into the `/dev/disk/by-id/google-*` tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance.

If not specified, the server chooses a default device name to apply to this disk, in the form `persistent-disk-x`, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].index`

`integer`

Output only. A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].boot`

`boolean`

Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams`

`object`

[Input Only] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance.

This property is mutually exclusive with the `source` property; you can only define one or the other, but not both.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.diskName`

`string`

Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImage`

`string`

The source image to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceImage` or `initializeParams.sourceSnapshot` or `disks.source` is required.

To create a disk with one of the public operating system images, specify the image by its family name. For example, specify `family/debian-9` to use the latest Debian 9 image:

`projects/debian-cloud/global/images/family/debian-9`

Alternatively, use a specific version of a public operating system image:

`projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD`

To create a disk with a custom image that you created, specify the image name in the following format:

`global/images/my-custom-image`

You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with `family/family-name`:

`global/images/family/my-image-family`

If the source image is deleted later, this field will not be set.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.diskSizeGb`

`string (int64 format)`

Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a `sourceImage`, which is required for boot disks, the default size is the size of the `sourceImage`. If you do not specify a `sourceImage`, the default disk size is 500 GB.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.diskType`

`string`

Specifies the disk type to use to create the instance. If not specified, the default is `pd-standard`, specified using the full URL. For example:

`https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/pd-standard`

For a full list of acceptable values, see Persistent disk types. If you specify this field when creating a VM, you can provide either the full or partial URL. For example, the following values are valid:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType`
*   `projects/project/zones/zone/diskTypes/diskType`
*   `zones/zone/diskTypes/diskType`

If you specify this field when creating or updating an instance template or all-instances configuration, specify the type of the disk, not the URL. For example: `pd-standard`.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey`

`object`

The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key.

InstanceTemplate and InstancePropertiesPatch do not store customer-supplied encryption keys, so you cannot create disks for instances in a managed instance group if the source images are encrypted with your own keys.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceImageEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.labels`

`map (key: string, value: string)`

Labels to apply to this disk. These can be later modified by the `disks.setLabels` method. This field is only applicable for persistent disks.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshot`

`string`

The source snapshot to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceSnapshot` or `initializeParams.sourceImage` or `disks.source` is required.

To create a disk with a snapshot that you created, specify the snapshot name in the following format:

`global/snapshots/my-backup`

If the source snapshot is deleted later, this field will not be set.

Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceInstantSnapshot`

`string`

The source instant-snapshot to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceSnapshot` or `initializeParams.sourceInstantSnapshot` `initializeParams.sourceImage` or `disks.source` is required.

To create a disk with a snapshot that you created, specify the snapshot name in the following format:

`us-central1-a/instantSnapshots/my-backup`

If the source instant-snapshot is deleted later, this field will not be set.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey`

`object`

The customer-supplied encryption key of the source snapshot.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.sourceSnapshotEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.description`

`string`

An optional description. Provide this property when creating the disk.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.replicaZones[]`

`string`

Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.guestOsFeatures[]`

`object`

A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.

Guest OS features are applied by merging `initializeParams.guestOsFeatures` and `disks.guestOsFeatures`

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.guestOsFeatures[].type`

`enum`

The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values:

*   `VIRTIO_SCSI_MULTIQUEUE`
*   `WINDOWS`
*   `MULTI_IP_SUBNET`
*   `UEFI_COMPATIBLE`
*   `GVNIC`
*   `SEV_CAPABLE`
*   `SUSPEND_RESUME_COMPATIBLE`
*   `SEV_LIVE_MIGRATABLE_V2`
*   `SEV_SNP_CAPABLE`
*   `TDX_CAPABLE`
*   `IDPF`
*   `SNP_SVSM_CAPABLE`
*   `CCA_CAPABLE`

For more information, see Enabling guest operating system features.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.resourcePolicies[]`

`string`

Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.onUpdateAction`

`enum`

Specifies which action to take on instance update with this disk. Default is to use the existing disk.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.provisionedIops`

`string (int64 format)`

Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see the Extreme persistent disk documentation.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.multiWriter`

`boolean`

Indicates whether or not the disk can be read/write attached to more than one instance.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.licenses[]`

`string`

A list of publicly visible licenses. Reserved for Google's use.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.architecture`

`enum`

The architecture of the attached disk. Valid values are arm64 or x86_64.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.resourceManagerTags`

`map (key: string, value: string)`

Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|projectId}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.provisionedThroughput`

`string (int64 format)`

Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.enableConfidentialCompute`

`boolean`

Whether this disk is using confidential compute mode.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].initializeParams.storagePool`

`string`

The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool`
*   `projects/project/zones/zone/storagePools/storagePool`
*   `zones/zone/storagePools/storagePool`

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].autoDelete`

`boolean`

Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].licenses[]`

`string`

Output only. Any valid publicly visible licenses.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].interface`

`enum`

Specifies the disk interface to use for attaching this disk, which is either `SCSI` or `NVME`. For most machine types, the default is `SCSI`. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, see About persistent disks.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].guestOsFeatures[]`

`object`

A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].guestOsFeatures[].type`

`enum`

The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values:

*   `VIRTIO_SCSI_MULTIQUEUE`
*   `WINDOWS`
*   `MULTI_IP_SUBNET`
*   `UEFI_COMPATIBLE`
*   `GVNIC`
*   `SEV_CAPABLE`
*   `SUSPEND_RESUME_COMPATIBLE`
*   `SEV_LIVE_MIGRATABLE_V2`
*   `SEV_SNP_CAPABLE`
*   `TDX_CAPABLE`
*   `IDPF`
*   `SNP_SVSM_CAPABLE`
*   `CCA_CAPABLE`

For more information, see Enabling guest operating system features.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey`

`object`

Encrypts or decrypts a disk using a customer-supplied encryption key.

If you are creating a new disk, this field encrypts the new disk using an encryption key that you provide. If you are attaching an existing disk that is already encrypted, this field decrypts the disk using the customer-supplied encryption key.

If you encrypt a disk using a customer-supplied key, you must provide the same key again when you attempt to use this resource at a later time. For example, you must provide the key when you create a snapshot or an image from the disk or when you attach the disk to a virtual machine instance.

If you do not provide an encryption key, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the disk later.

Note:

Instance templates do not store customer-supplied encryption keys, so you cannot use your own keys to encrypt disks in a managed instance group.

You cannot create VMs that have disks with customer-supplied keys using the bulk insert method.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].diskSizeGb`

`string (int64 format)`

The size of the disk in GB.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState`

`object`

Output only. shielded vm initial state stored on disk

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.pk`

`object`

The Platform Key (PK).

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.pk.content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.pk.fileType`

`enum`

The file type of source file.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.keks[]`

`object`

The Key Exchange Key (KEK).

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.keks[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.keks[].fileType`

`enum`

The file type of source file.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbs[]`

`object`

The Key Database (db).

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbs[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbs[].fileType`

`enum`

The file type of source file.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbxs[]`

`object`

The forbidden key database (dbx).

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbxs[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].shieldedInstanceInitialState.dbxs[].fileType`

`enum`

The file type of source file.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].forceAttach`

`boolean`

[Input Only] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].locked`

`boolean`

Output only. Whether to indicate the attached disk is locked. The locked disk is not allowed to be detached from the instance, or to be used as the source of the snapshot creation, and the image creation. The instance with at least one locked attached disk is not allow to be used as source of machine image creation, instant snapshot creation, and not allowed to be deleted with --keep-disk parameter set to true for locked disks.

`items[].instanceFlexibilityPolicy.instanceSelections[].disks[].architecture`

`enum`

Output only. The architecture of the attached disk. Valid values are ARM64 or X86_64.

`items[].instanceFlexibilityPolicy.provisioningModelMix`

`object`

Provisioning model configuration used by this managed instance group to create instances.

`items[].instanceFlexibilityPolicy.provisioningModelMix.standardCapacityBase`

`integer`

The base capacity that will always use Standard VMs to avoid risk of more preemption than the minimum capacity user needs. MIG will create only Standard VMs until it reaches standardCapacityBase and only then will start using standardCapacityPercentAboveBase to mix Spot with Standard VMs.

`items[].instanceFlexibilityPolicy.provisioningModelMix.standardCapacityPercentAboveBase`

`integer`

The percentage of target capacity that should use Standard VM. The remaining percentage will use Spot VMs. The percentage applies only to the capacity above standardCapacityBase.

`items[].targetStoppedSize`

`integer`

The target number of stopped instances for this managed instance group. This number changes when you:

*   Stop instance using the stopInstances method or start instances using the startInstances method.
*   Manually change the `targetStoppedSize` using the update method.

`items[].targetSuspendedSize`

`integer`

The target number of suspended instances for this managed instance group. This number changes when you:

*   Suspend instance using the suspendInstances method or resume instances using the resumeInstances method.
*   Manually change the `targetSuspendedSize` using the update method.

`items[].listManagedInstancesResults`

`enum`

Pagination behavior of the `listManagedInstances` API method for this managed instance group.

`items[].standbyPolicy`

`object`

Standby policy for stopped and suspended instances.

`items[].standbyPolicy.initialDelaySec`

`integer`

Specifies the number of seconds that the MIG should wait to suspend or stop a VM after that VM was created. The initial delay gives the initialization script the time to prepare your VM for a quick scale out. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.

`items[].standbyPolicy.mode`

`enum`

Defines how a MIG resumes or starts VMs from a standby pool when the group scales out. The default mode is `MANUAL`.

`items[].selfLink`

`string`

Output only. The URL for this managed instance group. The server defines this URL.

`items[].autoHealingPolicies[]`

`object`

The autohealing policy for this managed instance group. You can specify only one value.

`items[].autoHealingPolicies[].healthCheck`

`string`

The URL for the health check that signals autohealing.

`items[].autoHealingPolicies[].initialDelaySec`

`integer`

The initial delay is the number of seconds that a new VM takes to initialize and run its startup script. During a VM's initial delay period, the MIG ignores unsuccessful health checks because the VM might be in the startup process. This prevents the MIG from prematurely recreating a VM. If the health check receives a healthy response during the initial delay, it indicates that the startup process is complete and the VM is ready. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.

`items[].updatePolicy`

`object`

The update policy for this managed instance group.

`items[].updatePolicy.type`

`enum`

The type of update process. You can specify either `PROACTIVE` so that the MIG automatically updates VMs to the latest configurations or `OPPORTUNISTIC` so that you can select the VMs that you want to update.

`items[].updatePolicy.instanceRedistributionType`

`enum`

The instance redistribution policy for regional managed instance groups. Valid values are:

*   `PROACTIVE` (default): The group attempts to maintain an even distribution of VM instances across zones in the region.
*   `NONE`: For non-autoscaled groups, proactive redistribution is disabled.

`items[].updatePolicy.minimalAction`

`enum`

Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary.

*   To limit disruption as much as possible, set the minimal action to `REFRESH`. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update.
*   To apply a more disruptive action than is strictly necessary, set the minimal action to `RESTART` or `REPLACE`. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to `RESTART` in order to pick up metadata changes.

`items[].updatePolicy.mostDisruptiveAllowedAction`

`enum`

Most disruptive action that is allowed to be taken on an instance. You can specify either `NONE` to forbid any actions, `REFRESH` to avoid restarting the VM and to limit disruption as much as possible. `RESTART` to allow actions that can be applied without instance replacing or `REPLACE` to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all.

`items[].updatePolicy.maxSurge`

`object`

The maximum number of instances that can be created above the specified `targetSize` during the update process. This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value for `maxSurge` is a fixed value equal to the number of zones in which the managed instance group operates.

At least one of either `maxSurge` or `maxUnavailable` must be greater than 0. Learn more about `maxSurge`.

`items[].updatePolicy.maxSurge.fixed`

`integer`

Specifies a fixed number of VM instances. This must be a positive integer.

`items[].updatePolicy.maxSurge.percent`

`integer`

Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify `80` for 80%.

`items[].updatePolicy.maxSurge.calculated`

`integer`

Output only. Absolute value of VM instances calculated based on the specific mode.

*   If the value is `fixed`, then the `calculated` value is equal to the `fixed` value.
*   If the value is a `percent`, then the `calculated` value is `percent`/100 * `targetSize`. For example, the `calculated` value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.

`items[].updatePolicy.maxUnavailable`

`object`

The maximum number of instances that can be unavailable during the update process. An instance is considered available if all of the following conditions are satisfied:

*   The instance's status is `RUNNING`.
*   If there is a health check on the instance group, the instance's health check status must be `HEALTHY` at least once. If there is no health check on the group, then the instance only needs to have a status of `RUNNING` to be considered available.

This value can be either a fixed number or, if the group has 10 or more instances, a percentage. If you set a percentage, the number of instances is rounded if necessary. The default value for `maxUnavailable` is a fixed value equal to the number of zones in which the managed instance group operates.

At least one of either `maxSurge` or `maxUnavailable` must be greater than 0. Learn more about `maxUnavailable`.

`items[].updatePolicy.maxUnavailable.fixed`

`integer`

Specifies a fixed number of VM instances. This must be a positive integer.

`items[].updatePolicy.maxUnavailable.percent`

`integer`

Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify `80` for 80%.

`items[].updatePolicy.maxUnavailable.calculated`

`integer`

Output only. Absolute value of VM instances calculated based on the specific mode.

*   If the value is `fixed`, then the `calculated` value is equal to the `fixed` value.
*   If the value is a `percent`, then the `calculated` value is `percent`/100 * `targetSize`. For example, the `calculated` value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.

`items[].updatePolicy.minReadySec`

`integer`

Minimum number of seconds to wait for after a newly created instance becomes available. This value must be from range [0, 3600].

`items[].updatePolicy.replacementMethod`

`enum`

What action should be used to replace instances. See minimalAction.REPLACE

`items[].namedPorts[]`

`object`

Output only. Named ports configured on the Instance Groups complementary to this Instance Group Manager.

`items[].namedPorts[].name`

`string`

The name for this named port. The name must be 1-63 characters long, and comply with RFC1035.

`items[].namedPorts[].port`

`integer`

The port number, which can be a value between 1 and 65535.

`items[].serviceAccount`

`string`

The service account to be used as credentials for all operations performed by the managed instance group on instances. The service accounts needs all permissions required to create and delete instances. By default, the service account {projectNumber}@cloudservices.gserviceaccount.com is used.

`items[].failoverAction`

`enum`

The action to perform in case of zone failure. Only one value is supported, `NO_FAILOVER`. The default is `NO_FAILOVER`.

`items[].statefulPolicy`

`object`

Stateful configuration for this Instanced Group Manager

`items[].statefulPolicy.preservedState`

`object`

`items[].statefulPolicy.preservedState.disks[]`

`map (key: string, value: object)`

Disks created on the instances that will be preserved on instance delete, update, etc. This map is keyed with the device names of the disks.

`items[].statefulPolicy.preservedState.disks[].autoDelete`

`enum`

These stateful disks will never be deleted during autohealing, update or VM instance recreate operations. This flag is used to configure if the disk should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Note: disks attached in `READ_ONLY` mode cannot be auto-deleted.

`items[].statefulPolicy.preservedState.internalIPs[]`

`map (key: string, value: object)`

Internal network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.

`items[].statefulPolicy.preservedState.internalIPs[].autoDelete`

`enum`

These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.

`items[].statefulPolicy.preservedState.externalIPs[]`

`map (key: string, value: object)`

External network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.

`items[].statefulPolicy.preservedState.externalIPs[].autoDelete`

`enum`

These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.

`items[].instanceLifecyclePolicy`

`object`

The repair policy for this managed instance group.

`items[].instanceLifecyclePolicy.forceUpdateOnRepair`

`enum`

A bit indicating whether to forcefully apply the group's latest configuration when repairing a VM. Valid options are:

*   NO (default): If configuration updates are available, they are not forcefully applied during repair. Instead, configuration updates are applied according to the group's update policy.
*   YES: If configuration updates are available, they are applied during repair.

`items[].instanceLifecyclePolicy.defaultActionOnFailure`

`enum`

The action that a MIG performs on a failed VM. If the value of the onFailedHealthCheck field is `DEFAULT_ACTION`, then the same action also applies to the VMs on which your application fails a health check. Valid values are - REPAIR (default): MIG automatically repairs a failed VM by recreating it. For more information, see About repairing VMs in a MIG. - DO_NOTHING: MIG does not repair a failed VM.

`items[].instanceLifecyclePolicy.onFailedHealthCheck`

`enum`

The action that a MIG performs on an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are:

*   `DEFAULT_ACTION (default)`: MIG uses the same action configured for instanceLifecyclePolicy.defaultActionOnFailure field.
*   `REPAIR`: MIG automatically repairs an unhealthy VM by recreating it.
*   `DO_NOTHING`: MIG doesn't repair an unhealthy VM.
For more information, see About repairing VMs in a MIG.

`items[].instanceLifecyclePolicy.onRepair`

`object`

Configuration for VM repairs in the MIG.

`items[].instanceLifecyclePolicy.onRepair.allowChangingZone`

`enum`

Specifies whether the MIG can change a VM's zone during a repair. Valid values are:

*   `NO (default)`: MIG cannot change a VM's zone during a repair.
*   `YES`: MIG can select a different zone for the VM during a repair.

`items[].params`

`object`

Input only. Additional params passed with the request, but not persisted as part of resource payload.

`items[].params.resourceManagerTags`

`map (key: string, value: string)`

Input only. Resource manager tags to bind to the managed instance group. The tags are key-value pairs. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/456` or in namespaced format such as `{org_id|projectId}/{tag_key_short_name}` and `{tag_value_short_name}`. For more information, see Manage tags for resources.

`items[].satisfiesPzi`

`boolean`

Output only. Reserved for future use.

`items[].satisfiesPzs`

`boolean`

Output only. Reserved for future use.

`items[].resourcePolicies`

`object`

Resource policies for this managed instance group.

`items[].resourcePolicies.workloadPolicy`

`string`

The URL of the workload policy that is specified for this managed instance group. It can be a full or partial URL. For example, the following are all valid URLs to a workload policy:

*   `https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy`
*   `projects/project/regions/region/resourcePolicies/resourcePolicy`
*   `regions/region/resourcePolicies/resourcePolicy`

`items[].multiMig`

`string`

URL to the multi-MIG that this Managed Instance Group belongs to.

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

`kind`

`string`

Output only. The resource type, which is always compute#instanceGroupManagerList for a list of managed instance groups.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.instanceGroupManagers.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback